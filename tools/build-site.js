#!/usr/bin/env node
/* ============================================================================
 * build-site.js — DỰNG BẢN ONLINE vào thư mục dist/ (Cloudflare Pages chạy lệnh này).
 *   node tools/build-site.js
 *
 *   dist/index.html        trang HS vào lớp        dist/giao-vien.html  bảng GV
 *   dist/static/*          mã dùng chung (lop-hoc/public)
 *   dist/lessons/*         bài giảng (đã chèn script lớp học) + index.json
 *   dist/config.js         cấu hình Firebase (từ config/online.json)
 * Cloudflare Pages: Build command = node tools/build-site.js · Output = dist
 * ==========================================================================*/
"use strict";
const fs = require("fs"), path = require("path");
const lib = require("./lessons-lib");
const ROOT = lib.ROOT, DIST = path.join(ROOT, "dist"), PUB = path.join(ROOT, "lop-hoc", "public");

const cfg = require("./online-config").loadOnlineConfig(); // báo lỗi tiếng Việt & dừng nếu cấu hình sai

const { manifest, problems } = lib.buildManifest();
problems.forEach((p) => console.warn(`⚠️  Bỏ qua bài lỗi ${p.id}: ${p.errors.join("; ")}`));

fs.rmSync(DIST, { recursive: true, force: true });
function copyDir(src, dst, filter) {
  fs.mkdirSync(dst, { recursive: true });
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, e.name), d = path.join(dst, e.name);
    if (filter && !filter(s, e)) continue;
    if (e.isDirectory()) copyDir(s, d, filter); else fs.copyFileSync(s, d);
  }
}
copyDir(PUB, path.join(DIST, "static"));
fs.copyFileSync(path.join(PUB, "join.html"), path.join(DIST, "index.html"));
fs.copyFileSync(path.join(PUB, "teacher.html"), path.join(DIST, "giao-vien.html"));
const ok = new Set(manifest.lessons.map((l) => l.id));
for (const id of ok) {
  copyDir(path.join(lib.LESSONS_DIR, id), path.join(DIST, "lessons", id), (s, e) => !e.name.startsWith(".") && !(e.isFile() && /\.md$/i.test(e.name)));
  const idx = path.join(DIST, "lessons", id, "index.html");
  if (fs.existsSync(idx)) fs.writeFileSync(idx, lib.injectLesson(fs.readFileSync(idx, "utf8")));
}
fs.writeFileSync(path.join(DIST, "lessons", "index.json"), JSON.stringify(manifest));
const pub = { mode: "firebase", teacherEmail: cfg.teacherEmail, firebase: cfg.firebase, firebaseSdk: cfg.firebaseSdk || "10.12.2" };
fs.writeFileSync(path.join(DIST, "config.js"), `window.LH_CONFIG = ${JSON.stringify(pub, null, 1)};\n`);
fs.writeFileSync(path.join(DIST, "_headers"), "/*\n  Cache-Control: no-cache\n/lessons/*/assets/*\n  Cache-Control: public, max-age=86400\n");
console.log(`✅ Đã dựng dist/ — ${ok.size} bài giảng, Firebase project: ${cfg.firebase.projectId}`);
