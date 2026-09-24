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
  }
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
