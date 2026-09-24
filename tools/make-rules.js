#!/usr/bin/env node
/* ============================================================================
 * make-rules.js — sinh LUẬT BẢO MẬT Firebase Realtime Database (có email giáo viên
 * lấy từ config/online.json) và CHÉP SẴN VÀO CLIPBOARD.
 *   node tools/make-rules.js
 * Sau đó: Firebase Console → Realtime Database → tab Rules → Ctrl+A → Ctrl+V → Publish.
 * ==========================================================================*/
"use strict";
const fs = require("fs"), path = require("path"), cp = require("child_process");
const { loadOnlineConfig } = require("./online-config");
const ROOT = path.resolve(__dirname, "..");

const cfg = loadOnlineConfig();
const T = `(auth != null && auth.token.email === '${cfg.teacherEmail}')`;
const out = fs.readFileSync(path.join(ROOT, "firebase", "rules.template.json"), "utf8").split("__T__").join(T);
JSON.parse(out); // bảo đảm JSON hợp lệ
const file = path.join(ROOT, "firebase", "database.rules.json");
fs.writeFileSync(file, out);

let copied = false;
try {
  if (process.platform === "win32") cp.execSync("clip", { input: out });
  else if (process.platform === "darwin") cp.execSync("pbcopy", { input: out });
  else cp.execSync("xclip -selection clipboard", { input: out, stdio: ["pipe", "ignore", "ignore"] });
  copied = true;
} catch (e) {}

const url = `https://console.firebase.google.com/project/${cfg.firebase.projectId}/database/${(cfg.firebase.databaseURL.match(/^https:\/\/([^.]+)/) || [])[1] || ""}/rules`;
console.log(`✅ Đã tạo luật bảo mật cho giáo viên: ${cfg.teacherEmail}`);
console.log(`   File: firebase/database.rules.json`);
console.log(copied ? "📋 Nội dung luật ĐÃ ĐƯỢC CHÉP VÀO CLIPBOARD." : "⚠️  Không tự chép được — mở file trên bằng Notepad, Ctrl+A, Ctrl+C.");
console.log(`\nBước tiếp theo:\n  1. Mở: ${url}\n     (hoặc Firebase Console → Build → Realtime Database → tab Rules)\n  2. Bấm vào ô soạn luật → Ctrl+A (chọn hết) → Ctrl+V (dán)\n  3. Bấm Publish.`);
