/* ============================================================================
 * db.js — LỚP DỮ LIỆU dùng chung, hai "động cơ" cùng một API:
 *   • "lan"      : máy chủ lop-hoc/server.js trên máy GV (offline, mạng LAN)
 *   • "firebase" : Firebase Realtime Database + Authentication (online, Cloudflare Pages)
 * Chọn động cơ theo window.LH_CONFIG (file /config.js: máy chủ LAN tự sinh, bản
 * online do tools/build-site.js sinh từ config/online.json).
 *
 * API (mọi đường dẫn dạng "sessions/abc/live"):
 *   DB.ready                         Promise — sẵn sàng
 *   DB.get(path) / set(path,v) / update(path,{"a/b":v}) / remove(path)
 *   DB.claim(path, v) -> true|false  ghi NẾU CHƯA CÓ (giành máy, giành tên HS)
 *   DB.on(path, cb) -> hủy()         cb(giá trị) mỗi khi dữ liệu đổi
 *   DB.onConn(cb)                    cb(true|false) trạng thái kết nối
 *   DB.now()                         giờ máy chủ (ms) — dùng cho đồng hồ đếm ngược
 *   DB.newId()                       id mới
 *   DB.student()   -> Promise<uid>   đăng nhập ẩn danh cho máy HS
 *   DB.teacher.status() -> Promise<{ok, need:"email"|"key"|null, info}>
 *   DB.teacher.login(a, b) / logout()
 * ==========================================================================*/
(function () {
  "use strict";
  const CFG = window.LH_CONFIG || { mode: "lan" };
  const LS = { get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }, del(k) { try { localStorage.removeItem(k); } catch (e) {} } };
  const clean = (p) => String(p || "").replace(/^\/+|\/+$/g, "");
  const DB = { mode: CFG.mode === "firebase" ? "firebase" : "lan", config: CFG };
  window.DB = DB;
  const connCbs = new Set(); let connected = false;
  const setConn = (v) => { if (v !== connected) { connected = v; connCbs.forEach((cb) => cb(v)); } };
  DB.onConn = (cb) => { connCbs.add(cb); cb(connected); return () => connCbs.delete(cb); };

  // =============================== FIREBASE ===============================
  if (DB.mode === "firebase") {
    const V = CFG.firebaseSdk || "10.12.2";
    const load = (src) => new Promise((ok, fail) => { const s = document.createElement("script"); s.src = src; s.onload = ok; s.onerror = () => fail(new Error("Không tải được " + src + " — kiểm tra Internet.")); document.head.appendChild(s); });
    let fdb, fauth, offset = 0;
    DB.ready = load(`https://www.gstatic.com/firebasejs/${V}/firebase-app-compat.js`)
      .then(() => Promise.all([load(`https://www.gstatic.com/firebasejs/${V}/firebase-auth-compat.js`), load(`https://www.gstatic.com/firebasejs/${V}/firebase-database-compat.js`)]))
      .then(() => {
        firebase.initializeApp(CFG.firebase);
        fauth = firebase.auth(); fdb = firebase.database();
        fdb.ref(".info/serverTimeOffset").on("value", (s) => { offset = s.val() || 0; });
        fdb.ref(".info/connected").on("value", (s) => setConn(!!s.val()));
        return new Promise((ok) => { const off = fauth.onAuthStateChanged(() => { off(); ok(); }); });
      });
    const ref = (p) => fdb.ref(clean(p) || undefined);
    DB.now = () => Date.now() + offset;
    DB.newId = () => fdb ? fdb.ref().push().key : Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
    DB.get = (p) => DB.ready.then(() => ref(p).get()).then((s) => s.val());
    DB.set = (p, v) => DB.ready.then(() => ref(p).set(v === undefined ? null : v));
    DB.update = (p, obj) => DB.ready.then(() => ref(p).update(obj));
    DB.remove = (p) => DB.ready.then(() => ref(p).remove());
    DB.claim = (p, v) => DB.ready.then(() => ref(p).transaction((cur) => (cur === null ? v : undefined), undefined, false)).then((r) => r.committed && r.snapshot.val() === v);
    DB.on = (p, cb) => {
      let r = null, fn = null, dead = false;
      DB.ready.then(() => { if (dead) return; r = ref(p); fn = r.on("value", (s) => cb(s.val()), (e) => cb(null, e)); });
      return () => { dead = true; if (r) r.off("value", fn); };
    };
    const isTeacher = (u) => !!u && !u.isAnonymous && String(u.email || "").toLowerCase() === String(CFG.teacherEmail || "").toLowerCase();
    DB.student = () => DB.ready.then(() => fauth.currentUser ? fauth.currentUser.uid : fauth.signInAnonymously().then((c) => c.user.uid));
    DB.teacher = {
      status: () => DB.ready.then(() => { const u = fauth.currentUser; return isTeacher(u) ? { ok: true, info: { email: u.email } } : { ok: false, need: "email", info: { email: u && !u.isAnonymous ? u.email : null } }; }),
      login: (email, pass) => DB.ready.then(() => fauth.signInWithEmailAndPassword(String(email).trim(), pass)).then((c) => { if (!isTeacher(c.user)) { fauth.signOut(); throw new Error("Tài khoản này không phải tài khoản giáo viên đã cấu hình."); } return true; })
        .catch((e) => {
          const c = e.code || e.message || "";
          if (/wrong-password|invalid-credential|user-not-found|invalid-login/.test(c)) throw new Error("Sai email hoặc mật khẩu.");
          if (/api-key|invalid-api-key|configuration-not-found/.test(c)) throw new Error("Cấu hình Firebase chưa đúng (apiKey / bật Email-Password). Kiểm tra config/online.json và mục 3 trong HUONG-DAN-TRIEN-KHAI.md.");
          if (/operation-not-allowed/.test(c)) throw new Error("Chưa bật đăng nhập Email/Password trong Firebase Authentication.");
          if (/network/.test(c)) throw new Error("Không có Internet hoặc không kết nối được Firebase.");
          throw new Error(e.message || String(e));
        }),
      logout: () => DB.ready.then(() => fauth.signOut()),
    };
    return;
  }

  // =============================== LAN ===============================
  let offset = 0, es = null;
  const subs = new Set();
  const headers = () => { const h = { "Content-Type": "application/json" }; const u = LS.get("lh_uid"), k = LS.get("lh_teacher_key"); if (u) h["X-UID"] = u; if (k) h["X-Teacher-Key"] = k; return h; };
  function req(url, body) {
    return fetch(url, body ? { method: "POST", headers: headers(), body: JSON.stringify(body) } : { headers: headers(), cache: "no-store" })
      .then((r) => r.json().catch(() => ({})).then((j) => { if (!r.ok) throw Object.assign(new Error(j.error || "Lỗi " + r.status), { status: r.status, code: r.status === 403 ? "PERMISSION_DENIED" : "NET" }); return j; }));
  }
  const related = (a, b) => a === b || a.startsWith(b + "/") || b.startsWith(a + "/") || !a || !b;
  function fetchSub(s) { req("/db/get?path=" + encodeURIComponent(s.path)).then((r) => { if (!s.dead) s.cb(r.value == null ? null : r.value); }).catch((e) => { if (!s.dead && e.status === 403) s.cb(null, e); }); }
  function stream() {
    if (es) return;
    es = new EventSource("/db/events");
    es.addEventListener("hello", (e) => { const d = JSON.parse(e.data); offset = d.now - Date.now(); setConn(true); subs.forEach(fetchSub); });
    es.addEventListener("change", (e) => {
      const paths = JSON.parse(e.data).paths || [];
      subs.forEach((s) => { if (paths.some((p) => related(p, s.path))) { clearTimeout(s.t); s.t = setTimeout(() => fetchSub(s), 80); } });
    });
    es.onerror = () => setConn(false);
  }
  DB.ready = req("/db/time").then((r) => { offset = r.now - Date.now(); setConn(true); }).catch(() => {});
  DB.now = () => Date.now() + offset;
  DB.newId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  DB.get = (p) => req("/db/get?path=" + encodeURIComponent(clean(p))).then((r) => (r.value == null ? null : r.value));
  const write = (op, p, value) => req("/db/write", { op, path: clean(p), value: value === undefined ? null : value });
  DB.set = (p, v) => write("set", p, v).then(() => {});
  DB.update = (p, obj) => write("update", p, obj).then(() => {});
  DB.remove = (p) => write("set", p, null).then(() => {});
  DB.claim = (p, v) => write("claim", p, v).then((r) => !!r.committed);
  DB.on = (p, cb) => { const s = { path: clean(p), cb, dead: false }; subs.add(s); stream(); fetchSub(s); return () => { s.dead = true; subs.delete(s); }; };
  DB.student = () => { const u = LS.get("lh_uid"); if (u) return Promise.resolve(u); return req("/db/anon", {}).then((r) => { LS.set("lh_uid", r.uid); return r.uid; }); };
  DB.teacher = {
    status: () => req("/db/whoami").then((r) => ({ ok: !!r.teacher, need: r.teacher ? null : "key", info: r })),
    login: (key) => { LS.set("lh_teacher_key", String(key || "").trim()); return DB.teacher.status().then((s) => { if (!s.ok) { LS.del("lh_teacher_key"); throw new Error("Sai mã giáo viên."); } return true; }); },
    logout: () => { LS.del("lh_teacher_key"); return Promise.resolve(); },
  };
})();
