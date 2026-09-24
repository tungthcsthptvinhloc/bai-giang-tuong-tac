#!/usr/bin/env node
/* ============================================================================
 * update-lessons.js — ĐƯA BÀI GIẢNG MỚI VÀO HỆ THỐNG CHUNG (chạy sau khi tạo/sửa bài).
 *   node tools/update-lessons.js [--check]
 *
 *  1. Đồng bộ engine: chép app.js mới nhất (skill thcs-lesson-app) vào MỌI bài.
 *  2. Kiểm tra từng bài có dùng được ở chế độ lớp học (id hoạt động, meta…).
 *  3. Ghi danh mục lessons/index.json (bảng điều khiển GV đọc danh mục này).
 *  4. Báo các thay đổi chưa đẩy lên GitHub (việc push do giáo viên xác nhận).
 *  --check : chỉ kiểm tra, không ghi gì.
 * Bản OFFLINE (máy chủ LAN) thấy bài mới ngay; bản ONLINE cần push lên GitHub.
 * ==========================================================================*/
"use strict";
const fs = require("fs"), path = require("path"), cp = require("child_process");
const lib = require("./lessons-lib");
const CHECK = process.argv.includes("--check");

let synced = 0;
const engine = fs.existsSync(lib.ENGINE_SRC) ? fs.readFileSync(lib.ENGINE_SRC) : null;
if (!engine) console.warn("⚠️  Không thấy engine mẫu: " + lib.ENGINE_SRC);
for (const id of lib.listLessonDirs()) {
  const f = path.join(lib.LESSONS_DIR, id, "app.js");
  if (engine && (!fs.existsSync(f) || !fs.readFileSync(f).equals(engine))) { synced++; if (!CHECK) fs.writeFileSync(f, engine); console.log(`  ${CHECK ? "cần cập nhật" : "đã cập nhật"} engine: ${id}`); }
}
const { manifest, problems } = lib.buildManifest();
for (const p of problems) console.error(`❌ ${p.id}:\n   - ` + p.errors.join("\n   - "));
if (!CHECK) fs.writeFileSync(path.join(lib.LESSONS_DIR, "index.json"), JSON.stringify(manifest, null, 1));
console.log(`\n✅ Danh mục: ${manifest.lessons.length} bài` + (synced ? ` · engine ${CHECK ? "lệch" : "đồng bộ"} ${synced} bài` : "") + (problems.length ? ` · ❌ ${problems.length} bài lỗi (bị loại khỏi danh mục)` : ""));
manifest.lessons.forEach((l) => console.log(`   • ${l.id.padEnd(46)} ${l.title}  (${l.items} bài chấm, ${l.open} tự luận)`));
try {
  const st = cp.execSync("git status --porcelain -- lessons .claude/skills", { cwd: lib.ROOT, stdio: ["ignore", "pipe", "ignore"] }).toString().trim();
  if (st) console.log(`\n📤 Có ${st.split("\n").length} thay đổi chưa đẩy lên GitHub. Bản online chỉ cập nhật sau khi commit + push:\n   git add -A && git commit -m "Cập nhật bài giảng" && git push`);
  else console.log("\n📤 Không có thay đổi nào cần đẩy lên GitHub.");
} catch (e) { console.log("\nℹ️  Thư mục chưa là kho git — bản online: xem HUONG-DAN-TRIEN-KHAI.md mục GitHub."); }
process.exit(problems.length ? 1 : 0);
