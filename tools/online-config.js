/* ============================================================================
 * online-config.js — đọc config/online.json cho make-rules.js và build-site.js.
 * Dễ tính: chấp nhận cả JSON chuẩn lẫn đoạn dán nguyên từ Firebase Console
 * (apiKey: "..." không có ngoặc kép, dấu phẩy cuối, "const firebaseConfig = {...};").
 * Lỗi được báo bằng tiếng Việt kèm số dòng.
 * ==========================================================================*/
"use strict";
const fs = require("fs"), path = require("path"), vm = require("vm");
const ROOT = path.resolve(__dirname, "..");
const FILE = path.join(ROOT, "config", "online.json");
const REQUIRED = ["apiKey", "authDomain", "databaseURL", "projectId", "appId"];

function fail(msg) { console.error("❌ " + msg); process.exit(1); }

function parseLenient(text) {
  text = text.replace(/^﻿/, "");
  try { return JSON.parse(text); } catch (e) { /* thử kiểu JavaScript bên dưới */ }
  const body = text.replace(/^\s*(const|let|var)\s+\w+\s*=\s*/, "").replace(/;\s*$/, "");
  try {
    const v = vm.runInNewContext("(" + body + "\n)", {}, { timeout: 1000 });
    if (v && typeof v === "object") return JSON.parse(JSON.stringify(v));
  } catch (e) {
    const m = /<anonymous>:(\d+)|evalmachine\.<anonymous>:(\d+)/.exec(e.stack || "");
    throw new Error(`File config/online.json viết sai cú pháp${m ? " (khoảng dòng " + (m[1] || m[2]) + ")" : ""}: ${e.message}.\n   Mẹo: mỗi mục dạng "tên": "giá trị", các mục cách nhau bằng dấu phẩy, mở/đóng bằng { }.`);
  }
  throw new Error("File config/online.json không đọc được.");
}

// Trả về { teacherEmail, firebase: {...} }; tự nhận cả khi dán nguyên firebaseConfig (không có khối "firebase")
function loadOnlineConfig() {
  if (!fs.existsSync(FILE)) fail("Chưa có config/online.json — chép config/online.example.json thành config/online.json rồi điền (HUONG-DAN-TRIEN-KHAI.md, mục 2.4).");
  let cfg;
  try { cfg = parseLenient(fs.readFileSync(FILE, "utf8")); } catch (e) { fail(e.message); }
  if (!cfg.firebase && cfg.apiKey) cfg = { teacherEmail: cfg.teacherEmail, firebase: cfg };
  const fb = cfg.firebase || {};
  const missing = REQUIRED.filter((k) => !fb[k] || /^DIEN_|DIEN_ten/.test(String(fb[k])));
  if (missing.length) fail("config/online.json còn thiếu hoặc chưa điền: " + missing.map((k) => "firebase." + k).join(", ") + (missing.includes("databaseURL") ? "\n   (databaseURL lấy ở Firebase → Realtime Database, dòng địa chỉ đầu trang)" : ""));
  const email = String(cfg.teacherEmail || "").trim().toLowerCase();
  if (!/^[^@\s'"]+@[^@\s'"]+\.[^@\s'"]+$/.test(email) || /^dien_/.test(email)) fail('Chưa điền đúng "teacherEmail" (email tài khoản giáo viên đã tạo ở Firebase → Authentication → Users).');
  if (!/^https:\/\/.+(firebaseio\.com|firebasedatabase\.app)\/?$/.test(fb.databaseURL)) fail('"databaseURL" không đúng dạng https://...firebasedatabase.app — lấy ở Firebase → Realtime Database.');
  return { ...cfg, teacherEmail: email, firebase: fb };
}

module.exports = { loadOnlineConfig, parseLenient, FILE };
