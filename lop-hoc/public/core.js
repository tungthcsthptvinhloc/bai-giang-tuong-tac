/* ============================================================================
 * core.js — LOGIC DÙNG CHUNG cho mọi màn hình (HS, trình chiếu, bảng GV) và cả
 * hai chế độ triển khai (offline LAN / online Firebase). Chạy được trong trình
 * duyệt (window.LHCore) và Node (require) — Node dùng để dựng danh mục bài giảng.
 *
 * CẤU TRÚC DỮ LIỆU (giống nhau ở LAN và Firebase Realtime Database):
 *   teacher/config                 { machines, phones }
 *   teacher/classes/{cid}          { name, students: { sid: { name, order } } }
 *   teacher/sessions/{sess}        bản sao meta (để liệt kê lịch sử)
 *   public/active                  id tiết đang mở (HS đọc được)
 *   sessions/{sess}/meta           { lessonId, lessonTitle, classId, className, createdAt, status }
 *   sessions/{sess}/roster         { sid: { name, order } }
 *   sessions/{sess}/machines       { mid: { name, order } }
 *   sessions/{sess}/live           { follow, paused, showModel, showScore, teacherIdx, excluded:{aid:true},
 *                                    acts: { aid: { state: open|locked|revealed, endsAt, remaining } } }
 *   sessions/{sess}/groups/{gid}   { uid, machine, members:{sid:true}, createdAt, name?, nav:{idx,at} }
 *   sessions/{sess}/claims         { machines:{mid:gid}, students:{sid:gid} }
 *   sessions/{sess}/answers/{gid}/{aid}/{iid}  { choice, ok, fraction, total, at }
 *   sessions/{sess}/texts/{gid}/{aid}/{iid}    { text, at }
 *   sessions/{sess}/grading/{gid}  { bonus, stars:{aid:{iid:true}} }
 * Khóa câu hỏi trong engine: "aid:iid" (iid = q0 | c0 | main | t0).
 * ==========================================================================*/
(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.LHCore = api;
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";
  const NOT_QUIZ = ["matching", "dragdrop", "ordering", "fillblank", "flashcard", "remember", "summary", "vandung"];
  const WHOLE = ["matching", "dragdrop", "ordering", "fillblank"];
  const clamp01 = (x) => Math.max(0, Math.min(1, +x || 0));
  const round1 = (x) => Math.round(x * 10) / 10;
  const esc = (s) => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const norm = (s) => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").toLowerCase().replace(/\s+/g, " ").trim();
  const fmt1 = (x) => (Math.round((+x || 0) * 10) / 10).toLocaleString("vi-VN");
  const pad2 = (n) => String(n).padStart(2, "0");
  const fmtDate = (t) => { const d = new Date(t); return `${pad2(d.getDate())}/${pad2(d.getMonth() + 1)}/${d.getFullYear()}`; };
  const fmtTime = (t) => { const d = new Date(t); return `${pad2(d.getHours())}:${pad2(d.getMinutes())}`; };
  const fmtClock = (sec) => { sec = Math.max(0, Math.ceil(sec)); return Math.floor(sec / 60) + ":" + pad2(sec % 60); };
  function rid(n) { const a = "abcdefghijkmnpqrstuvwxyz23456789"; let s = ""; for (let i = 0; i < (n || 8); i++) s += a[Math.floor(Math.random() * a.length)]; return s; }
  const splitKey = (key) => { const i = String(key).lastIndexOf(":"); return [key.slice(0, i), key.slice(i + 1)]; };
  const keyOf = (aid, iid) => aid + ":" + iid;

  // ---- mục chấm điểm của 1 bài (PHẢI khớp cách engine app.js đặt khóa) ----------
  function lessonItems(L) {
    const items = [], openQs = [];
    (L.activities || []).forEach((a, idx) => {
      const aid = a.id || "a" + idx, base = { aid, activityIdx: idx, activityName: a.name || aid };
      if (!NOT_QUIZ.includes(a.type)) (a.questions || []).forEach((q, qi) => items.push({ ...base, iid: "q" + qi, key: keyOf(aid, "q" + qi), label: q.question, q, type: q.type }));
      if (WHOLE.includes(a.type)) items.push({ ...base, iid: "main", key: keyOf(aid, "main"), label: a.task || a.name, kind: a.type, type: a.type });
      if (a.type === "summary" && a.content && a.content.challenge) a.content.challenge.forEach((q, qi) => items.push({ ...base, iid: "c" + qi, key: keyOf(aid, "c" + qi), label: q.question, q, type: q.type }));
      if (a.type === "vandung") (a.cases || []).forEach((cs, i) => openQs.push({ ...base, iid: "t" + i, key: keyOf(aid, "t" + i), label: cs.question }));
      if (a.type === "scenario" && a.content && a.content.question) openQs.push({ ...base, iid: "t0", key: keyOf(aid, "t0"), label: a.content.question });
    });
    return { items, openQs };
  }
  // Chấm 1 câu: trắc nghiệm chấm lại từ LỰA CHỌN (không tin "ok" do máy HS gửi)
  function judgeQuestion(q, choice) {
    if (choice == null) return false;
    if (q.type === "true-false") return choice === q.answer;
    if (q.type === "multiple-select") { const c = Array.isArray(choice) ? choice : Object.values(choice); return JSON.stringify(c.map(Number).sort()) === JSON.stringify([...(q.answer || [])].sort()); }
    return typeof choice !== "boolean" && choice !== "" && Number(choice) === q.answer;
  }
  function judge(it, rec) {
    if (!rec) return null;
    if (it.q) { const ok = judgeQuestion(it.q, rec.choice); return { ok, fraction: ok ? 1 : 0 }; }
    return { ok: !!rec.ok, fraction: clamp01(rec.fraction) };
  }
  // Trạng thái 1 hoạt động: free (HS tự làm, báo đúng/sai ngay) | open | locked | revealed
  function actState(live, aid, now) {
    if (!live || !live.follow) return "free";
    const s = (live.acts || {})[aid] || {};
    if (s.state === "revealed") return "revealed";
    if (s.state === "locked") return "locked";
    if (s.endsAt && (now || Date.now()) >= s.endsAt) return "locked";
    return "open";
  }
  // Điều khiển 1 hoạt động khi HS theo nhịp GV (dùng chung: màn trình chiếu + bảng GV)
  //   action: start | pause | add | end | reopen      (add: sec có thể âm)
  function actControl(DB, sessId, live, aid, action, sec) {
    const p = `sessions/${sessId}/live/acts/${aid}`, cur = ((live || {}).acts || {})[aid] || {}, now = DB.now();
    const running = !!cur.endsAt && cur.endsAt > now;
    const left = running ? Math.ceil((cur.endsAt - now) / 1000) : Math.max(5, +cur.remaining || +sec || 60);
    if (action === "start") return DB.set(p, { state: "open", endsAt: now + left * 1000, remaining: left });
    if (action === "pause") return DB.set(p, { state: "open", remaining: left });
    if (action === "add") return running ? DB.set(p + "/endsAt", Math.max(now + 5000, cur.endsAt + sec * 1000)) : DB.set(p, { state: "open", remaining: Math.max(5, left + sec) });
    if (action === "end") return DB.set(p, { state: "revealed", remaining: cur.remaining || null });
    if (action === "reopen") return DB.set(p, { state: "open", remaining: +sec || +cur.remaining || 60 });
    return Promise.resolve();
  }
  // Thông tin đồng hồ của hoạt động: { st, running, left(giây), hasTimer }
  function actClock(live, aid, now) {
    const cur = ((live || {}).acts || {})[aid] || {}, st = actState(live, aid, now);
    const running = st === "open" && !!cur.endsAt;
    return { st, running, left: running ? Math.max(0, (cur.endsAt - now) / 1000) : (+cur.remaining || 0), hasTimer: !!(cur.endsAt || cur.remaining) };
  }
  const answerOf = (sess, gid, it) => (((sess.answers || {})[gid] || {})[it.aid] || {})[it.iid] || null;
  // Điểm 1 nhóm. opts.hideOpen: HS xem điểm -> chưa tính các hoạt động đang làm theo nhịp (chưa công bố)
  function scoreGroup(sess, gid, info, opts) {
    const live = sess.live || {}, excluded = live.excluded || {}, now = opts && opts.now;
    const inc = info.items.filter((it) => !excluded[it.aid]);
    let earned = 0, done = 0, correct = 0;
    for (const it of inc) {
      const rec = answerOf(sess, gid, it); if (!rec) continue;
      done++;
      if (opts && opts.hideOpen) { const st = actState(live, it.aid, now); if (st === "open" || st === "locked") continue; }
      const j = judge(it, rec); earned += j.fraction; if (j.ok) correct++;
    }
    const bonus = +(((sess.grading || {})[gid] || {}).bonus) || 0, total = inc.length, base = total ? earned / total * 10 : 0;
    return { done, total, correct, earned: round1(earned), base: round1(base), bonus, score: round1(Math.min(10, Math.max(0, base + bonus))) };
  }
  function groupName(sess, gid) { const g = (sess.groups || {})[gid] || {}; return g.name || (((sess.machines || {})[g.machine] || {}).name) || "Nhóm"; }
  const sortedEntries = (obj) => Object.entries(obj || {}).sort((a, b) => ((a[1] || {}).order || 0) - ((b[1] || {}).order || 0));
  const memberNames = (sess, g) => sortedEntries(sess.roster).filter(([sid]) => g && g.members && g.members[sid]).map(([, s]) => s.name);

  function machineList(n, phones) {
    const m = {};
    for (let i = 1; i <= (+n || 0); i++) m["m" + pad2(i)] = { name: "Máy " + pad2(i), order: i };
    for (let i = 1; i <= (+phones || 0); i++) m["p" + pad2(i)] = { name: "Điện thoại " + pad2(i), order: 1000 + i };
    return m;
  }

  // ---- danh sách lớp <-> Excel ------------------------------------------------------
  const H_NAME = ["ho va ten", "ho ten", "ho va ten hoc sinh", "ten hoc sinh", "hoc sinh", "ho va ten hs", "hoten"];
  const H_FIRST = ["ho dem", "ho va dem", "ho va ten dem", "ho", "ho lot"];
  const H_LAST = ["ten"], H_CLASS = ["lop", "ten lop", "lop hoc"], H_STT = ["stt", "tt", "so tt"];
  // sheets: [{ name, rows: [[ô,...]] }] -> [{ className, names: [...] }]
  function parseClassBook(sheets) {
    const out = new Map();
    const add = (cls, name) => { cls = String(cls || "").trim(); name = String(name || "").replace(/\s+/g, " ").trim(); if (!cls || !name) return; if (!out.has(cls)) out.set(cls, []); out.get(cls).push(name); };
    for (const sh of sheets) {
      const rows = sh.rows || []; let hr = -1, col = {};
      for (let r = 0; r < Math.min(20, rows.length) && hr < 0; r++) {
        const h = (rows[r] || []).map(norm), c = {};
        h.forEach((v, i) => { if (H_NAME.includes(v) && c.name == null) c.name = i; if (H_FIRST.includes(v) && c.first == null) c.first = i; if (H_LAST.includes(v) && c.last == null) c.last = i; if (H_CLASS.includes(v) && c.cls == null) c.cls = i; if (H_STT.includes(v)) c.stt = i; });
        if (c.name != null || (c.first != null && c.last != null) || (c.last != null && c.name == null)) { hr = r; col = c; }
      }
      if (hr < 0) { // không có tiêu đề: lấy ô chữ đầu tiên mỗi dòng, tên lớp = tên sheet
        rows.forEach((row) => { const cell = (row || []).find((x) => /\p{L}/u.test(String(x || ""))); if (cell) add(sh.name, cell); });
        continue;
      }
      let lastCls = sh.name;
      for (let r = hr + 1; r < rows.length; r++) {
        const row = rows[r] || [];
        let name = col.name != null ? row[col.name] : [col.first != null ? row[col.first] : "", row[col.last]].filter(Boolean).join(" ");
        if (!name || !/\p{L}/u.test(String(name))) continue;
        let cls = col.cls != null ? String(row[col.cls] || "").trim() : "";
        if (col.cls != null) { if (cls) lastCls = cls; else cls = lastCls; } else cls = sh.name;
        add(cls, name);
      }
    }
    return [...out.entries()].map(([className, names]) => ({ className, names }));
  }
  function classesSheet(classes) {
    const rows = [[{ v: "DANH SÁCH HỌC SINH", s: "title" }], [{ v: "Mỗi dòng 1 học sinh. Cột \"Lớp\" dùng để tự nhóm lớp. Có thể thêm lớp/học sinh rồi nhập lại vào hệ thống. (Cũng nhận file mỗi lớp 1 sheet: tên sheet = tên lớp.)", s: "sub" }],
      ["Lớp", "STT", "Họ và tên"].map((v) => ({ v, s: "head" }))];
    const list = sortedEntries(classes).length ? Object.values(classes || {}).sort((a, b) => String(a.name).localeCompare(String(b.name), "vi", { numeric: true })) : [];
    if (!list.length) [["6A1", "Nguyễn Văn An"], ["6A1", "Trần Thị Bình"], ["6A2", "Lê Minh Châu"]].forEach(([c, n], i) => rows.push([{ v: c, s: "cell" }, { v: i + 1, s: "center" }, { v: n, s: "cell" }]));
    list.forEach((c) => sortedEntries(c.students).forEach(([, s], i) => rows.push([{ v: c.name, s: "cell" }, { v: i + 1, s: "center" }, { v: s.name, s: "cell" }])));
    return { name: "Danh sách lớp", cols: [12, 7, 34], rows, merges: ["A1:C1", "A2:C2"], freezeRow: 3 };
  }

  // ---- bảng điểm Excel của 1 tiết ------------------------------------------------------
  function sessionWorkbook(sess, L) {
    const info = L ? lessonItems(L) : { items: [], openQs: [] }, items = info.items;
    const meta = sess.meta || {}, live = sess.live || {}, excluded = live.excluded || {};
    const inc = items.filter((it) => !excluded[it.aid]);
    const groups = Object.entries(sess.groups || {}).sort((a, b) => (a[1].createdAt || 0) - (b[1].createdAt || 0)).map(([id, g]) => ({ id, ...g, name: groupName(sess, id) }));
    const score = new Map(groups.map((g) => [g.id, scoreGroup(sess, g.id, info)]));
    const roster = sortedEntries(sess.roster);
    const H = (v) => ({ v, s: "head" }), C = (v) => ({ v, s: "cell" }), W = (v) => ({ v, s: "wrap" });
    const claim = (sid) => ((sess.claims || {}).students || {})[sid];
    const nameOf = (sid) => ((sess.roster || {})[sid] || {}).name || "?";
    const info1 = `Lớp: ${meta.className}   ·   ${meta.lessonTitle}   ·   Ngày: ${fmtDate(meta.createdAt || Date.now())}`;

    const r1 = [[{ v: "BẢNG ĐIỂM TIẾT HỌC TƯƠNG TÁC", s: "title" }], [{ v: info1, s: "sub" }],
      [{ v: `Điểm = (tổng điểm các bài ÷ ${inc.length} bài tính điểm) × 10 + điểm thưởng; cả nhóm nhận chung một điểm.`, s: "sub" }],
      ["STT", "Họ và tên", "Máy / Nhóm", "Các bạn cùng nhóm", "Bài đã làm", "Đúng hoàn toàn", "Điểm thưởng", "ĐIỂM (thang 10)", "Ghi chú"].map(H)];
    roster.forEach(([sid, st], i) => {
      const gid = claim(sid), g = gid && groups.find((x) => x.id === gid), sc = g && score.get(g.id);
      if (!g) return r1.push([{ v: i + 1, s: "center" }, C(st.name), C(""), C(""), C(""), C(""), C(""), { v: "", s: "num1b" }, C("Không tham gia")]);
      r1.push([{ v: i + 1, s: "center" }, C(st.name), C(g.name), W(Object.keys(g.members || {}).filter((x) => x !== sid).map(nameOf).join(", ")),
        { v: `${sc.done}/${sc.total}`, s: "center" }, { v: sc.correct, s: "center" }, { v: sc.bonus || "", s: "num1" }, { v: sc.score, s: "num1b" }, C(sc.done < sc.total ? "Chưa làm hết" : "")]);
    });
    const acts = (L ? L.activities : []).map((a, i) => ({ id: a.id || "a" + i, name: a.name })).filter((a) => items.some((it) => it.aid === a.id));
    const r2 = [[{ v: "KẾT QUẢ THEO NHÓM VÀ HOẠT ĐỘNG", s: "title" }], [{ v: info1, s: "sub" }], [],
      ["Máy / Nhóm", "Thành viên", ...acts.map((a) => a.name + (excluded[a.id] ? " (không tính)" : "")), "Bài đã làm", "Điểm thưởng", "ĐIỂM"].map(H)];
    groups.forEach((g) => {
      const sc = score.get(g.id);
      r2.push([C(g.name), W(memberNames(sess, g).join(", ")), ...acts.map((a) => {
        const its = items.filter((it) => it.aid === a.id), d = its.filter((it) => answerOf(sess, g.id, it));
        return d.length ? { v: its.reduce((t, it) => { const j = judge(it, answerOf(sess, g.id, it)); return t + (j ? j.fraction : 0); }, 0) / its.length, s: "pct" } : C("—");
      }), { v: `${sc.done}/${sc.total}`, s: "center" }, { v: sc.bonus || "", s: "num1" }, { v: sc.score, s: "num1b" }]);
    });
    const r3 = [[{ v: "CHI TIẾT TỪNG CÂU / BÀI TẬP", s: "title" }], [{ v: info1 + "   ·   Ô trống = chưa làm; 100% = đúng hoàn toàn", s: "sub" }], [],
      ["STT", "Hoạt động", "Câu hỏi / Bài tập", "Số nhóm đã làm", "Tỉ lệ đạt TB", ...groups.map((g) => g.name)].map(H)];
    items.forEach((it, i) => {
      const js = groups.map((g) => judge(it, answerOf(sess, g.id, it))), d = js.filter(Boolean);
      r3.push([{ v: i + 1, s: "center" }, W(it.activityName + (excluded[it.aid] ? " (không tính)" : "")), W(it.label), { v: d.length, s: "center" },
        d.length ? { v: d.reduce((t, j) => t + j.fraction, 0) / d.length, s: "pct" } : C(""), ...js.map((j) => j ? { v: j.fraction, s: "pct" } : C(""))]);
    });
    const r4 = [[{ v: "CÂU TRẢ LỜI TỰ LUẬN / VẬN DỤNG", s: "title" }], [{ v: info1, s: "sub" }], [],
      ["Máy / Nhóm", "Thành viên", "Câu hỏi", "Câu trả lời của nhóm", "Gửi lúc", "GV đánh dấu"].map(H)];
    info.openQs.forEach((o) => groups.forEach((g) => {
      const t = (((sess.texts || {})[g.id] || {})[o.aid] || {})[o.iid]; if (!t) return;
      const star = ((((sess.grading || {})[g.id] || {}).stars || {})[o.aid] || {})[o.iid];
      r4.push([C(g.name), W(memberNames(sess, g).join(", ")), W(o.label), W(t.text), { v: fmtTime(t.at), s: "center" }, { v: star ? "⭐" : "", s: "center" }]);
    }));
    if (r4.length === 4) r4.push([C("(Chưa có câu trả lời tự luận nào)")]);
    const d = new Date(meta.createdAt || Date.now());
    const filename = `BangDiem_${meta.className}_${String(meta.lessonTitle || "").split(":")[0]}_${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}.xlsx`.replace(/[\\/:*?"<>|]/g, "-");
    return {
      filename,
      sheets: [
        { name: "Bảng điểm", cols: [6, 28, 14, 38, 11, 11, 10, 12, 16], rows: r1, merges: ["A1:I1", "A2:I2", "A3:I3"], freezeRow: 4 },
        { name: "Theo nhóm", cols: [14, 34, ...acts.map(() => 14), 11, 10, 9], rows: r2, merges: ["A1:F1", "A2:F2"], freezeRow: 4 },
        { name: "Chi tiết từng câu", cols: [6, 26, 50, 10, 10, ...groups.map(() => 11)], rows: r3, merges: ["A1:E1", "A2:H2"], freezeRow: 4 },
        { name: "Tự luận", cols: [14, 30, 45, 60, 9, 10], rows: r4, merges: ["A1:F1", "A2:F2"], freezeRow: 4 },
      ],
    };
  }

  // ---- nạp bài giảng trong trình duyệt ---------------------------------------------------
  const lessonCache = {};
  function loadLesson(id) {
    if (!lessonCache[id]) lessonCache[id] = fetch("/lessons/" + encodeURIComponent(id) + "/data/lesson.js", { cache: "no-store" })
      .then((r) => { if (!r.ok) throw new Error("Không tải được bài " + id); return r.text(); })
      .then((code) => { const mod = { exports: {} }, win = {}; const L = new Function("window", "module", code + "\n;return (typeof LESSON !== 'undefined') ? LESSON : (module.exports.activities ? module.exports : window.LESSON);")(win, mod); return L; })
      .catch((e) => { delete lessonCache[id]; throw e; });
    return lessonCache[id];
  }
  function loadManifest() { return fetch("/lessons/index.json", { cache: "no-store" }).then((r) => r.json()).then((m) => m.lessons || []); }

  return { NOT_QUIZ, WHOLE, clamp01, round1, esc, norm, fmt1, pad2, fmtDate, fmtTime, fmtClock, rid, splitKey, keyOf,
    lessonItems, judgeQuestion, judge, actState, actControl, actClock, answerOf, scoreGroup, groupName, sortedEntries, memberNames, machineList,
    parseClassBook, classesSheet, sessionWorkbook, loadLesson, loadManifest };
});
