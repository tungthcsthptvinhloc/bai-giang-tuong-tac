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
    const vary = [].concat(((q.sheet || activity.sheet || {}).vary) || []);
    if (vary.some((x) => !/^\$?[A-Za-z]{1,3}\$?\d+(:\$?[A-Za-z]{1,3}\$?\d+)?$/.test(String(x).replace(/\s/g, ""))))
      err(`${where}: \`sheet.vary\` phải là địa chỉ ô/vùng dữ liệu chữ được xáo khi chấm (VD "B3:B10").`);
    if (/COUNTIFS?\s*\(/i.test(String(q.answer || "")) && !vary.length)
      warn(`${where}: công thức COUNTIF/SUMIF — nên đặt \`sheet.vary\` (vùng dữ liệu chữ) để chấm chặt hơn khi HS chọn sai vùng.`);
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
      (m.inbox || []).forEach((x, i) => { if (!x.from || !x.subject) err(`${where}: thư ${i + 1} thiếu \`from\` hoặc \`subject\`.`); if (x.addr && !RE.test(x.addr)) err(`${where}: thư ${i + 1} có \`addr\` không hợp lệ.`); if (x.scam && x.spam) warn(`${where}: thư ${i + 1} vừa \`scam\` vừa \`spam\` — thư lừa đảo nên nằm ở Hộp thư đến để HS tự phát hiện.`); });
      if (m.detect && !(m.inbox || []).some((x) => x.scam)) err(`${where}: có \`detect\` nhưng không thư nào \`scam: true\`.`);
      if (m.detect && !(m.inbox || []).some((x) => !x.scam && !x.spam)) warn(`${where}: nên có cả thư thật (không scam) để HS phân biệt.`);
    }
    if (a.type === "chat") {
      const where = `HĐ "${a.id}" (chat)`;
      if (!a.chat || !a.chat.name) err(`${where}: cần \`chat: { name, avatar?, status? }\`.`);
      (a.questions || []).forEach((q, i) => { if (!["multiple-choice", "true-false", "multiple-select"].includes(q.type)) err(`${where}: câu ${i + 1} phải là multiple-choice / true-false / multiple-select.`); });
      if (!(a.questions || []).length) err(`${where}: chưa có câu hỏi (tin nhắn).`);
    }
    [a.sheet, a.sandbox].concat((a.questions || []).map((q) => q.sheet)).filter((sp) => sp && sp.validate).forEach((sp) => {
      Object.entries(sp.validate).forEach(([ad, rule]) => {
        const where = `HĐ "${a.id}" validate "${ad}"`;
        if (!/^\$?[A-Z]{1,3}\$?\d+(:\$?[A-Z]{1,3}\$?\d+)?$/i.test(ad)) err(`${where}: địa chỉ vùng không hợp lệ.`);
        if (!rule || (!rule.list && !["whole", "decimal", "date", "textlen"].includes(rule.type))) err(`${where}: cần \`list\` hoặc \`type\` (whole/decimal/date/textlen).`);
        if (rule && rule.op && !([">", ">=", "<", "<=", "=", "<>", "between", "notbetween"].includes(rule.op))) err(`${where}: op "${rule.op}" không hợp lệ.`);
        if (rule && rule.error && rule.error.style && !["stop", "warning", "information"].includes(rule.error.style)) err(`${where}: error.style chỉ nhận stop/warning/information.`);
      });
    });
    if (a.password && typeof a.password === "object" && a.password.examples && !Array.isArray(a.password.examples)) err(`HĐ "${a.id}" password: \`examples\` phải là mảng.`);
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
  const SHAPES = ["term", "io", "proc", "cond"];
  (L.activities || []).forEach((a) => {
    if (a.flow) { // ordering dạng sơ đồ khối
      const where = `HĐ "${a.id}" flow`;
      if (a.type !== "ordering") err(`${where}: \`flow\` chỉ dùng cho type "ordering".`);
      else if (!Array.isArray(a.flow) || a.flow.length !== (a.steps || []).length) err(`${where}: cần mảng cùng độ dài với \`steps\`.`);
      else a.flow.forEach((sh, i) => { if (!SHAPES.includes(sh)) err(`${where}: bước ${i + 1} có hình "${sh}" không hợp lệ (${SHAPES.join(", ")}).`); });
    }
    if (a.blocks) { // ordering dạng khối lệnh Scratch
      const where = `HĐ "${a.id}" blocks`, CATS = ["event", "looks", "sensing", "variables", "operators", "control", "motion", "sound"];
      if (a.type !== "ordering") err(`${where}: \`blocks\` chỉ dùng cho type "ordering".`);
      else if (!Array.isArray(a.blocks) || a.blocks.length !== (a.steps || []).length) err(`${where}: cần mảng cùng độ dài với \`steps\`.`);
      else a.blocks.forEach((c, i) => { if (!CATS.includes(c)) err(`${where}: khối ${i + 1} có nhóm "${c}" không hợp lệ (${CATS.join(", ")}).`); });
    }
    if (a.scratch) { // chạy thử chương trình Scratch
      const where = `HĐ "${a.id}" scratch`, OPS = ["flag", "say", "ask", "set", "if", "repeat", "move", "bounce", "rotate", "drum"];
      if (!Array.isArray(a.scratch.script) || !a.scratch.script.length) err(`${where}: cần \`script: [khối…]\`.`);
      else (function walk(list) { list.forEach((b) => {
        if (!OPS.includes(b.op)) err(`${where}: khối "${b.op}" không hợp lệ (${OPS.join(", ")}).`);
        if (b.op === "set" && !b.var) err(`${where}: khối set thiếu \`var\`.`);
        if (b.op === "set" && !b.answer && typeof b.expr !== "string") err(`${where}: khối set "${b.var}" cần \`answer: true\` hoặc \`expr\`.`);
        if (b.op === "if") { if (typeof b.cond !== "string") err(`${where}: khối if thiếu \`cond\`.`); walk(b.then || []); walk(b.else || []); }
        if (b.op === "repeat") walk(b.body || []);
      }); })(a.scratch.script);
    }
    if (a.runner) { // máy chạy thử thuật toán
      const r = a.runner, where = `HĐ "${a.id}" runner`, names = (r.inputs || []).map((f) => f.name);
      if (!Array.isArray(r.steps) || r.steps.length < 3) err(`${where}: cần \`steps\` (ít nhất Bắt đầu, một bước, Kết thúc).`);
      else r.steps.forEach((st, i) => {
        if (!SHAPES.includes(st.shape)) err(`${where}: bước ${i + 1} có hình "${st.shape}" không hợp lệ.`);
        if (st.set) { if (typeof st.expr !== "string") err(`${where}: bước ${i + 1} có \`set\` nhưng thiếu \`expr\`.`); names.push(st.set); }
        if (st.output && !names.includes(st.output)) err(`${where}: bước ${i + 1} đưa ra "${st.output}" chưa được tính/nhập trước đó.`);
      });
      if (r.steps && r.steps.some((st) => st.input) && !names.length) err(`${where}: có bước nhập nhưng thiếu \`inputs\`.`);
    }
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
      if (m.library) {
        if (!Array.isArray(m.library.files) || !m.library.files.length) err(`${where}: library cần \`files: [{ kind, name, ... }]\`.`);
        else m.library.files.forEach((f, i) => {
          if (!MM_KINDS.includes(f.kind)) err(`${where}: library tệp ${i + 1} có kind "${f.kind}" (chỉ nhận ${MM_KINDS.join("/")}).`);
          if (!f.name || / — |\n/.test(f.name)) err(`${where}: library tệp ${i + 1} cần \`name\` một dòng, không chứa " — ".`);
        });
        if (!m.editable) warn(`${where}: library chỉ dùng được khi \`editable\`.`);
      }
      (m.need || []).forEach((k) => { if (!String(k).split("|").every((x) => MM_KINDS.includes(x))) err(`${where}: need "${k}" không hợp lệ (dùng ${MM_KINDS.join("/")}, nối bằng "|").`); });
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
      if (a.target != null && (typeof a.target !== "string" || !a.target.trim() || /\n/.test(a.target))) err(`${where}: \`target\` (phiếu chấm chéo) phải là một dòng chữ, ví dụ "Nhóm em chấm sản phẩm của".`);
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
