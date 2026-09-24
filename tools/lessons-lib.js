/* ============================================================================
 * lessons-lib.js — tiện ích Node dùng chung cho máy chủ LAN và các script tools/:
 * quét thư mục lessons/, đọc data/lesson.js, kiểm tra tương thích chế độ lớp học,
 * dựng danh mục lessons/index.json, chèn script lớp học vào trang bài giảng.
 * ==========================================================================*/
"use strict";
const fs = require("fs"), path = require("path"), vm = require("vm");
const core = require("../lop-hoc/public/core.js");

const ROOT = path.resolve(__dirname, "..");
const LESSONS_DIR = path.join(ROOT, "lessons");
const ENGINE_SRC = path.join(ROOT, ".claude", "skills", "thcs-lesson-app", "assets", "app-starter", "app.js");

function listLessonDirs(dir = LESSONS_DIR) {
  try { return fs.readdirSync(dir, { withFileTypes: true }).filter((d) => d.isDirectory() && !d.name.startsWith(".") && fs.existsSync(path.join(dir, d.name, "data", "lesson.js"))).map((d) => d.name).sort(); }
  catch (e) { return []; }
}
function loadLessonFile(file) {
  const box = { module: { exports: {} }, window: {} };
  vm.runInNewContext(fs.readFileSync(file, "utf8"), box, { filename: file, timeout: 2000 });
  const L = box.module.exports && box.module.exports.activities ? box.module.exports : box.window.LESSON;
  if (!L || !Array.isArray(L.activities)) throw new Error("không tìm thấy LESSON.activities");
  return L;
}
// Lỗi làm hỏng chế độ lớp học (khóa kết quả theo id hoạt động; Firebase cấm . # $ [ ] /)
function checkLesson(L) {
  const errors = [], seen = new Set();
  L.activities.forEach((a, i) => {
    if (!a.id) errors.push(`Hoạt động ${i + 1} ("${a.name || "?"}") thiếu id`);
    else {
      if (seen.has(a.id)) errors.push(`id "${a.id}" bị trùng`);
      if (/[.#$\[\]\/:]/.test(a.id)) errors.push(`id "${a.id}" chứa ký tự không hợp lệ (. # $ [ ] / :)`);
      seen.add(a.id);
    }
  });
  if (!(L.meta && L.meta.title)) errors.push("thiếu meta.title");
  return errors;
}
function lessonInfo(id, L) {
  const { items, openQs } = core.lessonItems(L), m = L.meta || {};
  return { id, title: m.title || id, grade: String(m.grade || ((id.match(/^tin(\d+)/) || [])[1]) || ""), subject: m.subject || "", unit: m.unit || "", activities: L.activities.length, items: items.length, open: openQs.length };
}
// Dựng danh mục; lỗi từng bài được trả về (bài lỗi vẫn bị loại khỏi danh mục)
function buildManifest(dir = LESSONS_DIR) {
  const lessons = [], problems = [];
  for (const id of listLessonDirs(dir)) {
    try { const L = loadLessonFile(path.join(dir, id, "data", "lesson.js")); const errs = checkLesson(L); if (errs.length) problems.push({ id, errors: errs }); else lessons.push(lessonInfo(id, L)); }
    catch (e) { problems.push({ id, errors: ["không đọc được data/lesson.js: " + e.message] }); }
  }
  return { manifest: { generatedAt: new Date().toISOString(), lessons }, problems };
}
// Chèn script lớp học vào index.html của bài (không sửa file gốc)
const INJECT = `  <script src="/config.js"></script>\n  <script src="/static/db.js"></script>\n  <script src="/static/core.js"></script>\n  <link rel="stylesheet" href="/static/student.css">\n  <script src="/static/student.js"></script>\n</head>`;
const injectLesson = (html) => (html.includes("/static/student.js") ? html : html.replace(/<\/head>/i, INJECT));

module.exports = { ROOT, LESSONS_DIR, ENGINE_SRC, listLessonDirs, loadLessonFile, checkLesson, lessonInfo, buildManifest, injectLesson };
