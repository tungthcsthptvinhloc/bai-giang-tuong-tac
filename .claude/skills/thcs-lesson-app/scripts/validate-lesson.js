#!/usr/bin/env node
/* ============================================================================
 * validate-lesson.js — Kiểm tra dữ liệu bài học trước khi bàn giao.
 *
 * Cách dùng:
 *   node validate-lesson.js <đường-dẫn>/data/lesson.js
 *
 * Bắt các lỗi thường gặp làm hỏng tiết học:
 *   - Thiếu meta / mục tiêu / coreKnowledge / keywords.
 *   - Câu hỏi thiếu đáp án, thiếu giải thích (feedback), thiếu/ sai `level`.
 *   - Chỉ số `answer` nằm ngoài `options`.
 *   - Đáp án đúng dồn về MỘT vị trí (mất tính ngẫu nhiên).
 *   - Không phủ đủ 4 mức độ nhận thức.
 *   - `activity` của câu hỏi không khớp id hoạt động nào.
 *   - Còn dấu "[CẦN GIÁO VIÊN KIỂM TRA]" (cảnh báo, không phải lỗi).
 *
 * Thoát mã 1 nếu có LỖI (errors); cảnh báo (warnings) không làm fail.
 * ==========================================================================*/

"use strict";
const path = require("path");

const LEVELS = ["nhan-biet", "thong-hieu", "van-dung", "van-dung-cao"];
const errors = [];
const warnings = [];
const err = (m) => errors.push(m);
const warn = (m) => warnings.push(m);

function loadLesson(file) {
  const abs = path.resolve(process.cwd(), file);
  let mod;
  try {
    mod = require(abs);
  } catch (e) {
    // Nếu file chỉ gán window.LESSON và không export, thử đọc thô.
    err(`Không require được file: ${e.message}`);
    return null;
  }
  const lesson = mod && mod.activities ? mod : mod && mod.LESSON ? mod.LESSON : mod;
  if (!lesson || typeof lesson !== "object") {
    err("Không tìm thấy object bài học (cần module.exports = LESSON).");
    return null;
  }
  return lesson;
}

function checkMeta(L) {
  if (!L.meta || !L.meta.title || L.meta.title === "TÊN BÀI HỌC")
    err("meta.title trống hoặc còn là placeholder.");
  if (!L.objectives) warn("Thiếu `objectives` (mục tiêu).");
  if (!Array.isArray(L.coreKnowledge) || L.coreKnowledge.length < 3)
    err("`coreKnowledge` phải có ít nhất 3 ý (kiến thức trọng tâm).");
  else if (L.coreKnowledge.length > 7)
    warn("`coreKnowledge` > 7 ý — cân nhắc rút gọn cho học sinh dễ nhớ.");
  if (!Array.isArray(L.keywords) || L.keywords.length < 1)
    warn("Thiếu `keywords` cho màn Tổng kết.");
}

function collectQuestions(L) {
  const out = [];
  const ids = new Set((L.activities || []).map((a) => a.id));
  (L.activities || []).forEach((a) => {
    const qs = [];
    if (Array.isArray(a.questions)) qs.push(...a.questions);
    if (a.content && Array.isArray(a.content.challenge)) qs.push(...a.content.challenge);
    qs.forEach((q) => out.push({ q, activity: a }));
  });
  return { questions: out, ids };
}

function checkQuestion({ q, activity }, ids, answerPositions, levelCount) {
  const where = `HĐ "${activity.id}", câu "${(q.question || "").slice(0, 40)}..."`;

  if (!q.question) err(`${where}: thiếu nội dung câu hỏi.`);
  if (!q.type) err(`${where}: thiếu \`type\`.`);
  if (!q.explanation || !String(q.explanation).trim())
    err(`${where}: thiếu \`explanation\` (feedback bắt buộc sau mỗi câu).`);

  if (q.level && !LEVELS.includes(q.level))
    err(`${where}: \`level\` không hợp lệ ("${q.level}"). Dùng: ${LEVELS.join(" | ")}.`);
  else if (!q.level) warn(`${where}: thiếu \`level\` (mức độ nhận thức).`);
  else levelCount[q.level] = (levelCount[q.level] || 0) + 1;

  if (q.activity && !ids.has(q.activity))
    err(`${where}: \`activity\` = "${q.activity}" không khớp id hoạt động nào.`);

  // Kiểm tra đáp án theo type
  if (q.type === "multiple-choice") {
    if (!Array.isArray(q.options) || q.options.length < 2)
      err(`${where}: cần >= 2 \`options\`.`);
    if (typeof q.answer !== "number" || q.answer < 0 || (q.options && q.answer >= q.options.length))
      err(`${where}: \`answer\` (số) nằm ngoài phạm vi \`options\`.`);
    else answerPositions[q.answer] = (answerPositions[q.answer] || 0) + 1;
  } else if (q.type === "multiple-select") {
    if (!Array.isArray(q.answer) || q.answer.length < 1)
      err(`${where}: multiple-select cần \`answer\` là mảng chỉ số.`);
  } else if (q.type === "true-false") {
    if (typeof q.answer !== "boolean")
      err(`${where}: true-false cần \`answer\` là true/false.`);
  } else if (q.type === "sheet" && q.mode === "formula") {
    // Gõ công thức: answer = công thức cho ô đầu của target ("=C4*D4"); target = "E4" hoặc "E4:E6"
    if (!/^=/.test(String(q.answer || ""))) err(`${where}: sheet mode "formula" cần \`answer\` là công thức bắt đầu bằng "=".`);
    if (!/^[A-Za-z]{1,3}\d+(:[A-Za-z]{1,3}\d+)?$/.test(String(q.target || "").replace(/\s/g, ""))) err(`${where}: sheet mode "formula" cần \`target\` là ô/vùng HS nhập công thức (VD "E4" hoặc "E4:E6").`);
    if (!q.sheet && !activity.sheet) err(`${where}: thiếu lưới \`sheet\` (đặt ở hoạt động hoặc ở câu hỏi).`);
  } else if (q.type === "sheet") {
    // Bảng tính mô phỏng: answer = địa chỉ ô "B6" | vùng "B4:E11" | cột "D" | hàng "6" (hoặc mảng)
    const ans = Array.isArray(q.answer) ? q.answer : [q.answer];
    const ADDR = /^([A-Z]{1,3}\d+(:[A-Z]{1,3}\d+)?|[A-Z]{1,3}:[A-Z]{1,3}|\d+:\d+)$/;
    const normA = (s) => { s = String(s == null ? "" : s).toUpperCase().replace(/[\s$]/g, ""); return /^[A-Z]{1,3}$/.test(s) ? s + ":" + s : /^\d+$/.test(s) ? s + ":" + s : s; };
    if (!ans.length || ans.some((x) => !ADDR.test(normA(x))))
      err(`${where}: sheet cần \`answer\` là địa chỉ hợp lệ (VD "B6", "B4:E11", "D" = cả cột, "6" = cả hàng).`);
    if (!q.sheet && !activity.sheet) err(`${where}: thiếu lưới \`sheet\` (đặt ở hoạt động hoặc ở câu hỏi).`);
    if (q.mode === "type" && !q.highlight) err(`${where}: mode "type" cần \`highlight\` (vùng được tô để HS gõ địa chỉ).`);
  } else if (q.type === "short") {
    const ans = Array.isArray(q.answer) ? q.answer : [q.answer];
    if (!ans.length || ans.some((x) => !normShort(x))) err(`${where}: short cần \`answer\` là chữ (hoặc mảng các cách viết được chấp nhận).`);
  }
}

// Ô chữ (type "crossword"): chữ ở cột từ khoá của các hàng ghép lại phải đúng bằng từ khoá
const normShort = (s) => String(s == null ? "" : s).normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[đĐ]/g, "D").toUpperCase().replace(/[^A-Z0-9]/g, "");
function checkCrosswordsMail(L) {
  (L.activities || []).forEach((a) => {
    if (a.type === "crossword") {
      const where = `HĐ "${a.id}" (crossword)`, qs = a.questions || [], rows = qs.filter((q) => !q.keyword), kw = qs.find((q) => q.keyword);
      if (qs.some((q) => q.type !== "short")) err(`${where}: mọi câu phải là \`type: "short"\`.`);
      let letters = "";
      rows.forEach((q, i) => {
        const w = normShort(Array.isArray(q.answer) ? q.answer[0] : q.answer), k = q.key || 0;
        if (k < 0 || k >= w.length) err(`${where}: hàng ${i + 1} có \`key\` = ${k} nằm ngoài từ "${w}".`); else letters += w[k];
        (q.show || []).forEach((j) => { if (j < 0 || j >= w.length) err(`${where}: hàng ${i + 1} có \`show\` ${j} nằm ngoài từ "${w}".`); });
      });
      if (kw) { const kwW = normShort(Array.isArray(kw.answer) ? kw.answer[0] : kw.answer); if (kwW !== letters) err(`${where}: từ khoá "${kwW}" không khớp các chữ ở cột từ khoá "${letters}".`); }
      else warn(`${where}: không có câu \`keyword: true\` (từ khoá hàng dọc).`);
    }
    if (a.mail) {
      const where = `HĐ "${a.id}" mail`, m = a.mail, RE = /^[^@\s]+@[^@\s]+\.[A-Za-z]{2,}$/;
      if (!m.me || !RE.test(m.me.address || "")) err(`${where}: cần \`me: { name, address }\` với địa chỉ hợp lệ.`);
      (m.inbox || []).forEach((x, i) => { if (!x.from || !x.subject) err(`${where}: thư ${i + 1} thiếu \`from\` hoặc \`subject\`.`); if (x.addr && !RE.test(x.addr)) err(`${where}: thư ${i + 1} có \`addr\` không hợp lệ.`); });
    }
  });
}

function checkAnswerDistribution(answerPositions) {
  const total = Object.values(answerPositions).reduce((a, b) => a + b, 0);
  if (total < 4) return; // quá ít câu multiple-choice để kết luận
  const maxPos = Math.max(...Object.values(answerPositions));
  if (maxPos / total > 0.6)
    err(
      `Đáp án đúng dồn về một vị trí (${maxPos}/${total} câu). Hãy trộn lại vị trí A/B/C/D.`
    );
}

function checkLevelCoverage(levelCount) {
  const missing = LEVELS.filter((l) => !levelCount[l]);
  if (missing.length)
    warn(`Chưa phủ đủ 4 mức độ. Thiếu: ${missing.join(", ")}.`);
}

// Sơ đồ tư duy mô phỏng (activity.mindmap) + phiếu tự đánh giá (type "checklist")
const MM_KINDS = ["doc", "img", "video", "sheet", "link"];
function checkMindmapsChecklists(L) {
  (L.activities || []).forEach((a) => {
    if (a.mindmap) {
      const m = a.mindmap, where = `HĐ "${a.id}" mindmap`;
      if (!m.root || typeof m.root.text !== "string") err(`${where}: cần \`root: { text, children: [...] }\`.`);
      else (function walk(n, path) {
        if (typeof n.text !== "string") err(`${where}: nhánh ${path} thiếu \`text\`.`);
        (n.files || []).forEach((f, i) => { if (!MM_KINDS.includes(f.kind)) err(`${where}: nhánh ${path} tệp ${i + 1} có kind "${f.kind}" (chỉ nhận ${MM_KINDS.join("/")}).`); if (!f.name) warn(`${where}: nhánh ${path} tệp ${i + 1} thiếu \`name\`.`); });
        (n.children || []).forEach((c, i) => walk(c, path + "." + (i + 1)));
      })(m.root, "gốc");
      if (m.layout && !["both", "right"].includes(m.layout)) err(`${where}: layout chỉ nhận "both" hoặc "right".`);
      if (m.submit && !m.editable) warn(`${where}: có \`submit\` nhưng không \`editable\` — HS không sửa được sơ đồ trước khi gửi.`);
    }
    if (a.type === "checklist") {
      const where = `HĐ "${a.id}" (checklist)`;
      if (!Array.isArray(a.sections) || !a.sections.length) err(`${where}: cần \`sections: [{ title, items: [...] }]\`.`);
      else a.sections.forEach((s, i) => {
        if (!s.title) err(`${where}: mục ${i + 1} thiếu \`title\`.`);
        if (!Array.isArray(s.items) || !s.items.length) err(`${where}: mục ${i + 1} thiếu \`items\`.`);
        else s.items.forEach((t) => { if (/;\s/.test(t) || /\n/.test(t)) err(`${where}: "${t}" không được chứa "; " hay xuống dòng (dùng để gửi phiếu).`); });
      });
      if (a.columns && a.columns.length !== 2) warn(`${where}: nên có đúng 2 cột (Làm được / Chưa làm được).`);
    }
  });
}

function checkPlaceholders(L) {
  const json = JSON.stringify(L);
  if (json.includes("[CẦN GIÁO VIÊN KIỂM TRA]"))
    warn('Còn dấu "[CẦN GIÁO VIÊN KIỂM TRA]" — nhắc giáo viên đối chiếu SGK.');
  if (/\.\.\.|placeholder|TÊN BÀI HỌC/.test(json))
    warn("Còn nội dung mẫu/placeholder chưa điền (…, TÊN BÀI HỌC, ...).");
}

function main() {
  const file = process.argv[2];
  if (!file) {
    console.error("Cách dùng: node validate-lesson.js <path>/data/lesson.js");
    process.exit(2);
  }
  const L = loadLesson(file);
  if (!L) return finish();

  checkMeta(L);
  if (!Array.isArray(L.activities) || L.activities.length === 0) {
    err("Thiếu `activities` (danh sách hoạt động).");
    return finish();
  }

  const { questions, ids } = collectQuestions(L);
  const answerPositions = {};
  const levelCount = {};
  questions.forEach((item) => checkQuestion(item, ids, answerPositions, levelCount));
  checkAnswerDistribution(answerPositions);
  checkLevelCoverage(levelCount);
  checkMindmapsChecklists(L);
  checkCrosswordsMail(L);
  checkPlaceholders(L);

  console.log(`\nĐã kiểm tra: ${L.activities.length} hoạt động, ${questions.length} câu hỏi.`);
  finish();
}

function finish() {
  if (warnings.length) {
    console.log(`\n⚠️  CẢNH BÁO (${warnings.length}):`);
    warnings.forEach((w) => console.log("  - " + w));
  }
  if (errors.length) {
    console.log(`\n❌ LỖI (${errors.length}):`);
    errors.forEach((e) => console.log("  - " + e));
    console.log("\nKẾT QUẢ: FAIL — sửa các lỗi trên trước khi bàn giao.\n");
    process.exit(1);
  }
  console.log("\n✅ KẾT QUẢ: PASS — dữ liệu bài học hợp lệ.\n");
  process.exit(0);
}

main();
