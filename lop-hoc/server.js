/* ============================================================================
 * MÁY CHỦ LỚP HỌC — CHẾ ĐỘ OFFLINE (mạng LAN phòng máy, không cần Internet).
 *   node server.js [--port 8080] [--open] [--data thư-mục-dữ-liệu]
 *
 *   Học sinh : http://<IP-máy-GV>:8080/         Giáo viên: http://localhost:8080/giao-vien
 *
 * Máy chủ đóng vai một "Realtime Database" nhỏ có CÙNG cấu trúc dữ liệu và CÙNG
 * luật quyền với bản online (Firebase) — xem firebase/rules.template.json. Nhờ vậy
 * giao diện (public/*.js) dùng chung một bộ mã cho cả offline lẫn online.
 *
 *   GET  /db/get?path=…        đọc (theo luật quyền)
 *   POST /db/write {op,path,value}   op = set | update | claim (ghi nếu chưa có)
 *   GET  /db/events            SSE: báo đường dẫn vừa đổi -> trình duyệt tự đọc lại
 *   POST /db/anon              cấp uid cho máy HS · GET /db/whoami · GET /db/time
 * Dữ liệu: data/db/teacher.json, public.json, codes.json (mã vào lớp), sessions/<id>.json
 * ==========================================================================*/
"use strict";
const http = require("http"), fs = require("fs"), path = require("path"), os = require("os"), crypto = require("crypto");
const lib = require("../tools/lessons-lib");

const argv = process.argv.slice(2);
const argVal = (k) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : null; };
const PORT = +(argVal("--port") || process.env.PORT || 8080);
const ROOT = __dirname, PUBLIC_DIR = path.join(ROOT, "public"), DATA_DIR = path.resolve(argVal("--data") || path.join(ROOT, "data"));
const DB_DIR = path.join(DATA_DIR, "db"), SESS_DIR = path.join(DB_DIR, "sessions");
fs.mkdirSync(SESS_DIR, { recursive: true });

const readJSON = (f, d) => { try { return JSON.parse(fs.readFileSync(f, "utf8")); } catch (e) { return d; } };
const writeJSON = (f, o) => { const t = f + ".tmp"; fs.writeFileSync(t, JSON.stringify(o, null, 1)); fs.renameSync(t, f); };
const clone = (v) => (v == null ? null : JSON.parse(JSON.stringify(v)));

// ---- mã giáo viên (mở bảng điều khiển từ máy khác) -------------------------------
const CONFIG_FILE = path.join(DATA_DIR, "config.json");
const config = readJSON(CONFIG_FILE, {});
if (!config.teacherKey) { config.teacherKey = String(crypto.randomInt(100000, 999999)); writeJSON(CONFIG_FILE, config); }

// ---- kho dữ liệu dạng cây -----------------------------------------------------------
const tree = { teacher: readJSON(path.join(DB_DIR, "teacher.json"), null), public: readJSON(path.join(DB_DIR, "public.json"), {}), codes: readJSON(path.join(DB_DIR, "codes.json"), {}), sessions: {} };
for (const f of fs.readdirSync(SESS_DIR).filter((f) => f.endsWith(".json"))) { const s = readJSON(path.join(SESS_DIR, f), null); if (s) tree.sessions[f.slice(0, -5)] = s; }
if (!tree.teacher) { // lần đầu: chuyển danh sách lớp từ bản cũ (data/classes.json) nếu có
  tree.teacher = { config: { machines: 30, phones: 0 }, classes: {} };
  const old = readJSON(path.join(DATA_DIR, "classes.json"), null);
  (old && old.classes || []).forEach((c) => { const st = {}; (c.students || []).forEach((s, i) => { st[s.id] = { name: s.name, order: i + 1 }; }); tree.teacher.classes[c.id] = { name: c.name, students: st }; });
  writeJSON(path.join(DB_DIR, "teacher.json"), tree.teacher);
}
// Chuyển các tiết học của phiên bản cũ (data/sessions/*.json) sang cấu trúc mới; giữ bản gốc ở data/sessions-v1-backup
(function migrateV1() {
  const oldDir = path.join(DATA_DIR, "sessions");
  if (!fs.existsSync(oldDir)) return;
  let n = 0;
  for (const f of fs.readdirSync(oldDir).filter((x) => x.endsWith(".json"))) {
    const o = readJSON(path.join(oldDir, f), null); if (!o || !o.id || tree.sessions[o.id]) continue;
    const roster = {}; (o.students || []).forEach((s, i) => { roster[s.id] = { name: s.name, order: i + 1 }; });
    const groups = {}, claims = { students: {} }, answers = {}, texts = {}, grading = {};
    Object.values(o.groups || {}).forEach((g) => {
      const mem = {}; (g.members || []).forEach((sid) => { mem[sid] = true; claims.students[sid] = g.id; });
      groups[g.id] = { uid: "legacy", name: g.name, members: mem, createdAt: g.createdAt || o.createdAt };
      if (g.bonus) grading[g.id] = { bonus: g.bonus };
    });
    for (const [gid, at] of Object.entries(o.attempts || {})) for (const [k, r] of Object.entries(at || {})) { const i = k.lastIndexOf(":"); ((answers[gid] = answers[gid] || {})[k.slice(0, i)] = answers[gid][k.slice(0, i)] || {})[k.slice(i + 1)] = r; }
    for (const [gid, tx] of Object.entries(o.texts || {})) for (const [k, t] of Object.entries(tx || {})) { const i = k.lastIndexOf(":"); ((texts[gid] = texts[gid] || {})[k.slice(0, i)] = texts[gid][k.slice(0, i)] || {})[k.slice(i + 1)] = { text: t.text, at: t.at }; }
    const meta = { lessonId: o.lessonId, lessonTitle: o.lessonTitle, classId: o.classId, className: o.className, createdAt: o.createdAt, status: "ended" };
    const excluded = {}; (o.settings && o.settings.excluded || []).forEach((a) => { excluded[a] = true; });
    tree.sessions[o.id] = { meta, roster, machines: {}, live: { excluded }, groups, claims, answers, texts, grading };
    (tree.teacher.sessions = tree.teacher.sessions || {})[o.id] = meta;
    writeJSON(path.join(SESS_DIR, o.id + ".json"), tree.sessions[o.id]); n++;
  }
  writeJSON(path.join(DB_DIR, "teacher.json"), tree.teacher);
  const bak = path.join(DATA_DIR, "sessions-v1-backup");
  try { fs.renameSync(oldDir, bak); } catch (e) {}
  for (const f of ["state.json", "classes.json"]) try { fs.renameSync(path.join(DATA_DIR, f), path.join(bak, f)); } catch (e) {}
  if (n) console.log(`ℹ️  Đã chuyển ${n} tiết học của phiên bản cũ sang dữ liệu mới (bản gốc: data/sessions-v1-backup).`);
})();
const SEG = /^[^.#$\[\]\/]{1,200}$/;
const segs = (p) => { const s = String(p || "").split("/").filter(Boolean); if (!s.every((x) => SEG.test(x))) throw Object.assign(new Error("Đường dẫn không hợp lệ"), { code: 400 }); return s; };
function getAt(sg) { let n = tree; for (const k of sg) { if (n == null || typeof n !== "object") return null; n = n[k]; } return n === undefined ? null : n; }
function normalize(v) { // giống Firebase: bỏ null, object rỗng = không có
  if (v == null) return null;
  if (Array.isArray(v)) { const a = v.map(normalize); return a.some((x) => x != null) ? a : null; }
  if (typeof v === "object") { const o = {}; for (const [k, x] of Object.entries(v)) { const y = normalize(x); if (y != null) o[k] = y; } return Object.keys(o).length ? o : null; }
  return v;
}
function setAt(sg, val) {
  val = normalize(clone(val));
  if (!sg.length) throw new Error("Không ghi đè gốc");
  const stack = [tree]; let n = tree;
  for (let i = 0; i < sg.length - 1; i++) {
    if (n[sg[i]] == null || typeof n[sg[i]] !== "object") { if (val == null) return; n[sg[i]] = {}; }
    n = n[sg[i]]; stack.push(n);
  }
  if (val == null) delete n[sg[sg.length - 1]]; else n[sg[sg.length - 1]] = val;
  for (let i = sg.length - 1; i >= 1; i--) { const parent = stack[i - 1], k = sg[i - 1]; if (i - 1 === 0 && ["teacher", "public", "codes", "sessions"].includes(k)) break; if (parent[k] && typeof parent[k] === "object" && !Object.keys(parent[k]).length) delete parent[k]; else break; }
  markDirty(sg);
}
// giá trị tại base sau khi ghi v vào base/rel
function simulate(baseVal, rel, v) {
  if (!rel.length) return normalize(clone(v));
  const o = clone(baseVal) || {}; let n = o;
  for (let i = 0; i < rel.length - 1; i++) { if (n[rel[i]] == null || typeof n[rel[i]] !== "object") n[rel[i]] = {}; n = n[rel[i]]; }
  n[rel[rel.length - 1]] = v; return normalize(o);
}

// ---- lưu đĩa theo phân vùng -------------------------------------------------------------
const dirty = new Set(); let saveT = null;
function markDirty(sg) {
  if (sg[0] === "sessions") { if (sg[1]) dirty.add("s:" + sg[1]); else Object.keys(tree.sessions || {}).forEach((k) => dirty.add("s:" + k)); }
  else dirty.add(sg[0]);
  clearTimeout(saveT); saveT = setTimeout(flush, 300);
}
function flush() {
  for (const d of dirty) {
    if (d === "teacher") writeJSON(path.join(DB_DIR, "teacher.json"), tree.teacher || {});
    else if (d === "public") writeJSON(path.join(DB_DIR, "public.json"), tree.public || {});
    else if (d === "codes") writeJSON(path.join(DB_DIR, "codes.json"), tree.codes || {});
    else if (d.startsWith("s:")) { const id = d.slice(2), f = path.join(SESS_DIR, id + ".json"); if ((tree.sessions || {})[id]) writeJSON(f, tree.sessions[id]); else try { fs.unlinkSync(f); } catch (e) {} }
  }
  dirty.clear();
}

// ---- LUẬT QUYỀN (giống firebase/rules.template.json) ------------------------------------
function canRead(sg, a) {
  if (a.teacher) return true;
  if (!a.uid) return false;
  if (sg[0] === "codes") return sg.length === 2; // HS đọc được đúng 1 mã đã biết, không liệt kê được
  if (sg[0] !== "sessions" || sg.length < 3) return false;
  const s = sg[1], c = sg[2];
  if (["meta", "roster", "machines", "live", "claims"].includes(c)) return true;
  if (sg.length >= 4 && ["groups", "answers", "texts", "grading"].includes(c)) return getAt(["sessions", s, "groups", sg[3], "uid"]) === a.uid;
  return false;
}
function canWrite(sg, newVal, a) {
  if (a.teacher) return true;
  if (!a.uid || sg[0] !== "sessions" || sg.length < 4) return false;
  const s = sg[1], c = sg[2];
  if (getAt(["sessions", s, "meta", "status"]) !== "open") return false;
  const owner = (g) => !!g && getAt(["sessions", s, "groups", g, "uid"]) === a.uid;
  if (c === "claims") {
    if (sg.length !== 5) return false;
    const old = getAt(sg);
    if (old == null && newVal != null) return owner(newVal);
    if (old != null && newVal == null) return owner(old);
    return false;
  }
  if (c === "groups") {
    const oldG = getAt(sg.slice(0, 4)), newG = simulate(oldG, sg.slice(4), newVal);
    if (!oldG) return !!newG && newG.uid === a.uid;
    return oldG.uid === a.uid && (!newG || newG.uid === a.uid);
  }
  if (c === "answers") {
    if (sg.length !== 6 || !owner(sg[3]) || newVal == null) return false;
    const live = getAt(["sessions", s, "live"]) || {};
    if (!live.follow) return getAt(sg) == null; // tự làm: chỉ tính lần đầu
    const act = (live.acts || {})[sg[4]] || {};  // theo nhịp: đổi được tới khi kết thúc / hết giờ
    return (!act.state || act.state === "open") && (!act.endsAt || act.free === true || Date.now() < act.endsAt + 3000);
  }
  if (c === "texts") return sg.length === 6 && owner(sg[3]) && (newVal == null || String(newVal.text || "").length <= 3000);
  return false;
}

// ---- SSE: báo đường dẫn thay đổi -------------------------------------------------------------
const clients = new Set(); let pending = new Set(), pendT = null;
function changed(p) { pending.add(p); if (!pendT) pendT = setTimeout(() => { const paths = [...pending]; pending = new Set(); pendT = null; for (const c of clients) sse(c, "change", { paths }); }, 60); }
const sse = (res, ev, d) => { try { res.write(`event: ${ev}\ndata: ${JSON.stringify(d)}\n\n`); } catch (e) {} };
setInterval(() => { for (const c of clients) { try { c.write(": ping\n\n"); } catch (e) {} } }, 20000);

// ---- HTTP -----------------------------------------------------------------------------------------
const MIME = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".json": "application/json; charset=utf-8", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".gif": "image/gif", ".svg": "image/svg+xml", ".webp": "image/webp", ".ico": "image/x-icon", ".mp3": "audio/mpeg", ".mp4": "video/mp4", ".webm": "video/webm", ".pdf": "application/pdf", ".woff2": "font/woff2", ".txt": "text/plain; charset=utf-8" };
function send(res, code, body, type, extra) { res.writeHead(code, { "Content-Type": type || "application/json; charset=utf-8", "Cache-Control": "no-store", ...(extra || {}) }); res.end(typeof body === "string" || Buffer.isBuffer(body) ? body : JSON.stringify(body)); }
function readBody(req) {
  return new Promise((ok, fail) => { let n = 0; const ch = []; req.on("data", (d) => { n += d.length; if (n > 2e6) { fail(new Error("too big")); req.destroy(); } else ch.push(d); }); req.on("end", () => { try { ok(ch.length ? JSON.parse(Buffer.concat(ch).toString("utf8")) : {}); } catch (e) { fail(e); } }); req.on("error", fail); });
}
function serveFile(res, base, rel, transform) {
  let file; try { file = path.resolve(base, "." + path.sep + decodeURIComponent(rel)); } catch (e) { return send(res, 400, "Bad request", "text/plain"); }
  if (!file.startsWith(base + path.sep)) return send(res, 403, "Forbidden", "text/plain");
  fs.stat(file, (err, st) => {
    if (err || !st.isFile()) return send(res, 404, "Không tìm thấy", "text/plain; charset=utf-8");
    const type = MIME[path.extname(file).toLowerCase()] || "application/octet-stream";
    if (transform) return fs.readFile(file, "utf8", (e, t) => (e ? send(res, 500, "Lỗi đọc file", "text/plain; charset=utf-8") : send(res, 200, transform(t), type)));
    res.writeHead(200, { "Content-Type": type, "Content-Length": st.size, "Cache-Control": /^image|^audio|^video|font/.test(type) ? "max-age=3600" : "no-store" });
    fs.createReadStream(file).pipe(res);
  });
}
const isLoopback = (req) => /^(::1|127\.|::ffff:127\.)/.test(req.socket.remoteAddress || "");
function authOf(req) {
  const uid = String(req.headers["x-uid"] || "");
  return { teacher: isLoopback(req) || req.headers["x-teacher-key"] === config.teacherKey, uid: /^u[a-z0-9]{10,30}$/.test(uid) ? uid : null };
}
function lanAddresses() {
  const out = [];
  for (const [name, list] of Object.entries(os.networkInterfaces())) for (const a of list || []) if (a.family === "IPv4" && !a.internal) out.push({ name, ip: a.address });
  const rank = (ip) => (ip.startsWith("192.168.") ? 0 : ip.startsWith("10.") ? 1 : /^172\.(1[6-9]|2\d|3[01])\./.test(ip) ? 2 : ip.startsWith("169.254.") ? 9 : 5);
  return out.sort((a, b) => rank(a.ip) - rank(b.ip)).map((a) => ({ ...a, url: `http://${a.ip}${PORT === 80 ? "" : ":" + PORT}/` }));
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://x"), p = url.pathname;
  try {
    // ---- trang & file tĩnh ----
    if (p === "/" || p === "/index.html") return serveFile(res, PUBLIC_DIR, "join.html");
    if (p === "/giao-vien" || p === "/giao-vien/" || p === "/giao-vien.html") return serveFile(res, PUBLIC_DIR, "teacher.html");
    if (p === "/config.js") return send(res, 200, `window.LH_CONFIG = { mode: "lan" };`, MIME[".js"]);
    if (p.startsWith("/static/")) return serveFile(res, PUBLIC_DIR, p.slice(8));
    if (p === "/lessons/index.json") { const { manifest, problems } = lib.buildManifest(); if (problems.length) console.warn("⚠️  Bài lỗi (không hiện trong danh mục):", problems.map((x) => x.id + ": " + x.errors.join("; ")).join(" | ")); return send(res, 200, manifest); }
    if (p.startsWith("/lessons/")) {
      const m = p.match(/^\/lessons\/([\w.-]+)(\/.*)?$/);
      if (!m) return send(res, 404, "Không tìm thấy", "text/plain; charset=utf-8");
      if (!m[2]) return send(res, 302, "", "text/plain", { Location: `/lessons/${m[1]}/${url.search}` });
      const rest = m[2] === "/" ? "/index.html" : m[2];
      return serveFile(res, path.join(lib.LESSONS_DIR, m[1]), rest.slice(1), rest === "/index.html" ? lib.injectLesson : null);
    }
    if (p === "/favicon.ico") return send(res, 204, "");

    // ---- cơ sở dữ liệu ----
    const a = authOf(req);
    if (p === "/db/time") return send(res, 200, { now: Date.now() });
    if (p === "/db/anon" && req.method === "POST") return send(res, 200, { uid: "u" + crypto.randomBytes(8).toString("hex") });
    if (p === "/db/whoami") return send(res, 200, a.teacher ? { teacher: true, key: config.teacherKey, urls: lanAddresses(), port: PORT } : { teacher: false });
    if (p === "/db/events") {
      res.writeHead(200, { "Content-Type": "text/event-stream; charset=utf-8", "Cache-Control": "no-store", Connection: "keep-alive" });
      res.write("retry: 3000\n\n"); sse(res, "hello", { now: Date.now() }); clients.add(res);
      req.on("close", () => clients.delete(res)); return;
    }
    if (p === "/db/get") {
      const sg = segs(url.searchParams.get("path"));
      if (!canRead(sg, a)) return send(res, 403, { error: "Không có quyền đọc" });
      return send(res, 200, { value: sg.length ? getAt(sg) : tree });
    }
    if (p === "/db/write" && req.method === "POST") {
      const b = await readBody(req), sg = segs(b.path);
      if (b.op === "claim") {
        const cur = getAt(sg);
        if (cur != null) return send(res, 200, { committed: false, value: cur });
        if (!canWrite(sg, b.value, a)) return send(res, 403, { error: "Không có quyền ghi" });
        setAt(sg, b.value); changed(sg.join("/")); return send(res, 200, { committed: true });
      }
      const ops = b.op === "update" ? Object.entries(b.value || {}).map(([k, v]) => [sg.concat(segs(k)), v]) : [[sg, b.value]];
      for (const [s2, v] of ops) if (!canWrite(s2, v, a)) return send(res, 403, { error: "Không có quyền ghi: " + s2.join("/") });
      for (const [s2, v] of ops) { setAt(s2, v); changed(s2.join("/")); }
      return send(res, 200, { ok: true });
    }
    return send(res, 404, "Không tìm thấy", "text/plain; charset=utf-8");
  } catch (e) {
    if (e.code !== 400) console.error(e);
    if (!res.headersSent) send(res, e.code === 400 ? 400 : 500, { error: e.message });
  }
});

server.on("error", (e) => {
  if (e.code === "EADDRINUSE") console.error(`\n❌ Cổng ${PORT} đang bận (có thể máy chủ đã chạy rồi). Đóng cửa sổ cũ hoặc chạy: node server.js --port 8081\n`);
  else console.error(e);
  process.exit(1);
});
server.listen(PORT, "0.0.0.0", () => {
  const urls = lanAddresses(), { manifest, problems } = lib.buildManifest(), act = tree.public && tree.public.active && tree.sessions[tree.public.active];
  console.log("\n==============================================================");
  console.log("  🏫  LỚP HỌC TƯƠNG TÁC — CHẾ ĐỘ OFFLINE (mạng LAN)");
  console.log("==============================================================");
  console.log(`  Giáo viên mở : http://localhost:${PORT}/giao-vien`);
  console.log("  Học sinh vào : " + (urls.length ? urls.map((u) => u.url).join("   hoặc   ") : "(máy chưa kết nối mạng LAN)"));
  console.log(`  Mã giáo viên : ${config.teacherKey}  (khi mở bảng điều khiển từ máy/điện thoại khác)`);
  console.log(`  Bài giảng    : ${manifest.lessons.length} bài` + (problems.length ? `  ⚠️ ${problems.length} bài lỗi: ${problems.map((x) => x.id).join(", ")}` : ""));
  if (act) console.log(`  Đang tiếp tục tiết: ${act.meta.className} — ${act.meta.lessonTitle}` + (act.meta.code ? `  ·  Mã vào lớp: ${act.meta.code}` : ""));
  console.log("  (Giữ cửa sổ này mở trong suốt tiết học. Đóng cửa sổ = tắt máy chủ.)\n");
  if (argv.includes("--open") && process.platform === "win32") require("child_process").exec(`start "" "http://localhost:${PORT}/giao-vien"`);
});
function shutdown() { clearTimeout(saveT); flush(); process.exit(0); }
process.on("SIGINT", shutdown); process.on("SIGTERM", shutdown); process.on("SIGHUP", shutdown);
