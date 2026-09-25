/* ============================================================================
 * core.js — LOGIC DÙNG CHUNG cho mọi màn hình (HS, trình chiếu, bảng GV) và cả
 * hai chế độ triển khai (offline LAN / online Firebase). Chạy được trong trình
 * duyệt (window.LHCore) và Node (require) — Node dùng để dựng danh mục bài giảng.
 *
 * CẤU TRÚC DỮ LIỆU (giống nhau ở LAN và Firebase Realtime Database):
 *   teacher/config                 { machines, phones }
 *   teacher/classes/{cid}          { name, students: { sid: { name, order } } }
 *   teacher/sessions/{sess}        bản sao meta (để liệt kê lịch sử)
 *   public/active                  id tiết đang mở (chỉ GV/màn trình chiếu đọc)
 *   codes/{mã 4 số}                { s: id tiết, at }  (HS nhập mã -> tìm tiết; không liệt kê được)
 *   sessions/{sess}/meta           { lessonId, lessonTitle, classId, className, createdAt, status, code }
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
      if (!NOT_QUIZ.includes(a.type)) (a.questions || []).forEach((q, qi) => items.push({ ...base, iid: "q" + qi, key: keyOf(aid, "q" + qi), label: q.question, q: q.type === "sheet" && !q.sheet && a.sheet ? Object.assign({}, q, { sheet: a.sheet }) : q, type: q.type }));
      if (WHOLE.includes(a.type)) items.push({ ...base, iid: "main", key: keyOf(aid, "main"), label: a.task || a.name, kind: a.type, type: a.type, act: a });
      if (a.type === "summary" && a.content && a.content.challenge) a.content.challenge.forEach((q, qi) => items.push({ ...base, iid: "c" + qi, key: keyOf(aid, "c" + qi), label: q.question, q, type: q.type }));
      if (a.type === "vandung") (a.cases || []).forEach((cs, i) => openQs.push({ ...base, iid: "t" + i, key: keyOf(aid, "t" + i), label: cs.question }));
      if (a.type === "scenario" && a.content && a.content.question) openQs.push({ ...base, iid: "t0", key: keyOf(aid, "t0"), label: a.content.question });
      if (a.type === "checklist") openQs.push({ ...base, iid: "t0", key: keyOf(aid, "t0"), label: "📋 Phiếu tự đánh giá (tick Làm được / Chưa làm được)" });
      if (a.mail && a.mail.submit) openQs.push({ ...base, iid: "mail", key: keyOf(aid, "mail"), label: "📧 " + a.mail.submit });
      if (a.mindmap && a.mindmap.submit) openQs.push({ ...base, iid: "mm", key: keyOf(aid, "mm"), label: "🧠 " + a.mindmap.submit });
    });
    return { items, openQs };
  }
  // ---- địa chỉ ô / vùng (câu hỏi bảng tính mô phỏng) — PHẢI khớp normAddr trong app.js ----
  const colName = (n) => { let s = ""; n++; while (n > 0) { const m = (n - 1) % 26; s = String.fromCharCode(65 + m) + s; n = Math.floor((n - 1) / 26); } return s; };
  const colNum = (s) => [...s].reduce((t, ch) => t * 26 + ch.charCodeAt(0) - 64, 0) - 1;
  function normAddr(s) {
    s = String(s == null ? "" : s).toUpperCase().replace(/[\s$]/g, "");
    let m;
    if (/^[A-Z]{1,3}$/.test(s)) return s + ":" + s;
    if (/^\d+$/.test(s)) return +s + ":" + +s;
    if ((m = s.match(/^([A-Z]{1,3})(\d+)$/))) return m[1] + +m[2];
    if ((m = s.match(/^([A-Z]{1,3})(\d+):([A-Z]{1,3})(\d+)$/))) {
      const c1 = Math.min(colNum(m[1]), colNum(m[3])), c2 = Math.max(colNum(m[1]), colNum(m[3])), r1 = Math.min(+m[2], +m[4]), r2 = Math.max(+m[2], +m[4]);
      return c1 === c2 && r1 === r2 ? colName(c1) + r1 : colName(c1) + r1 + ":" + colName(c2) + r2;
    }
    if ((m = s.match(/^([A-Z]{1,3}):([A-Z]{1,3})$/))) { const a = [colNum(m[1]), colNum(m[2])].sort((x, y) => x - y); return colName(a[0]) + ":" + colName(a[1]); }
    if ((m = s.match(/^(\d+):(\d+)$/))) { const a = [+m[1], +m[2]].sort((x, y) => x - y); return a[0] + ":" + a[1]; }
    return s;
  }
  // Thống kê địa chỉ HS chọn (câu bảng tính) -> [{label, n, right}] — vài lựa chọn nhiều nhất + "Khác"; luôn có dòng đáp án đúng
  // Câu trả lời ngắn (type "short"): bỏ dấu, hoa/thường, khoảng trắng — PHẢI khớp normShort trong app.js
  const normShort = (s) => String(s == null ? "" : s).normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[đĐ]/g, "D").toUpperCase().replace(/[^A-Z0-9]/g, "");
  function choiceDist(choices, answer, top, rightFn, normFn) {
    const nf = normFn || normAddr;
    const cnt = new Map(); (choices || []).forEach((c) => { const k = nf(c); if (k) cnt.set(k, (cnt.get(k) || 0) + 1); });
    const right = rightFn || ((k) => addrMatch(answer, k)), ans = nf(Array.isArray(answer) ? answer[0] : answer);
    let list = [...cnt.entries()].sort((a, b) => b[1] - a[1]);
    const keep = list.slice(0, top || 4), rest = list.slice(top || 4);
    if (!keep.some(([k]) => right(k))) { const i = rest.findIndex(([k]) => right(k)); keep.push(i >= 0 ? rest.splice(i, 1)[0] : [ans, 0]); }
    const out = keep.map(([k, n]) => ({ label: k, n, right: right(k) }));
    const other = rest.reduce((t, [, n]) => t + n, 0); if (other) out.push({ label: "Khác", n: other, right: false });
    return out;
  }
  const addrMatch = (answer, choice) => choice != null && choice !== "" && (Array.isArray(answer) ? answer : [answer]).some((x) => normAddr(x) === normAddr(choice));
  // ===== FORMULA LIB — CÔNG THỨC BẢNG TÍNH (giữ GIỐNG HỆT trong app.js và lop-hoc/public/core.js) =====
  //  FX.evalCell(data, addr) -> số | "" | chữ | "#LỖI!"…   data = { "C4": "25", "E4": "=C4*D4" }
  //  FX.shift("=C4*D4", 1, 0) -> "=C5*D5" (sao chép công thức: giữ vị trí tương đối)
  //  FX.judge(answer, choice, spec, target) -> { ok, fraction } — chấm câu "gõ công thức" bằng cách thử đổi dữ liệu
  const FX = (function () {
    const colN = (s) => [...String(s).toUpperCase()].reduce((t, ch) => t * 26 + ch.charCodeAt(0) - 64, 0) - 1;
    const colS = (n) => { let s = ""; n++; while (n > 0) { const m = (n - 1) % 26; s = String.fromCharCode(65 + m) + s; n = Math.floor((n - 1) / 26); } return s; };
    const ERR = (e) => { throw { fxErr: e }; };
    function lex(src) {
      const s = String(src), out = []; let i = 0, m;
      while (i < s.length) {
        const rest = s.slice(i);
        if (/^\s/.test(rest)) { i++; continue; }
        if ((m = /^["“”]([^"“”]*)["“”]/.exec(rest))) { out.push({ t: "str", v: m[1] }); i += m[0].length; continue; } // chữ "Hà Nội"
        if ((m = /^([A-Za-z]{2,})\s*\(/.exec(rest)) && !/^[A-Za-z]{1,3}\d/.test(rest)) { out.push({ t: "fn", v: m[1].toUpperCase() }); i += m[0].length - 1; continue; }
        if ((m = /^\$?([A-Za-z]{1,3})\$?(\d+)(?::\$?([A-Za-z]{1,3})\$?(\d+))?/.exec(rest))) { out.push(m[3] ? { t: "rng", c1: colN(m[1]), r1: +m[2], c2: colN(m[3]), r2: +m[4] } : { t: "ref", c: colN(m[1]), r: +m[2] }); i += m[0].length; continue; }
        if ((m = /^(\d+(?:\.\d+)?|\.\d+)/.exec(rest))) { out.push({ t: "num", v: parseFloat(m[1]) }); i += m[1].length; continue; }
        if ("+-*/^(),;".includes(s[i])) { out.push({ t: s[i] === ";" ? "," : s[i] }); i++; continue; }
        ERR("#LỖI!");
      }
      return out;
    }
    function parse(src) {
      const tk = lex(src); let p = 0;
      const peek = () => tk[p] && tk[p].t, eat = (t) => { if (peek() !== t) ERR("#LỖI!"); return tk[p++]; };
      function expr() { let a = term(); while (peek() === "+" || peek() === "-") { const op = tk[p++].t; a = { k: "bin", op, a, b: term() }; } return a; }
      function term() { let a = power(); while (peek() === "*" || peek() === "/") { const op = tk[p++].t; a = { k: "bin", op, a, b: power() }; } return a; }
      function power() { let a = unary(); while (peek() === "^") { p++; a = { k: "bin", op: "^", a, b: unary() }; } return a; }
      function unary() { if (peek() === "-") { p++; return { k: "neg", a: unary() }; } if (peek() === "+") { p++; return unary(); } return prim(); }
      function prim() {
        const x = tk[p];
        if (!x) ERR("#LỖI!");
        if (x.t === "num") { p++; return { k: "num", v: x.v }; }
        if (x.t === "str") { p++; return { k: "str", v: x.v }; }
        if (x.t === "ref") { p++; return { k: "ref", c: x.c, r: x.r }; }
        if (x.t === "(") { p++; const e = expr(); eat(")"); return e; }
        if (x.t === "fn") { p++; eat("("); const args = []; if (peek() !== ")") { do { if (peek() === "rng") { const r = tk[p++]; args.push({ k: "rng", ...r }); } else args.push(expr()); } while (peek() === "," && ++p); } eat(")"); return { k: "fn", name: x.v, args }; }
        ERR("#LỖI!");
      }
      const e = expr(); if (p !== tk.length) ERR("#LỖI!"); return e;
    }
    function evalAst(n, get) {
      if (n.k === "num") return n.v;
      if (n.k === "str") ERR("#VALUE!"); // chữ trong phép toán
      if (n.k === "ref") { const v = get(n.c, n.r); if (v === "" || v == null) return 0; if (typeof v === "number") return v; if (String(v).charAt(0) === "#") ERR(v); ERR("#VALUE!"); }
      if (n.k === "neg") return -evalAst(n.a, get);
      if (n.k === "bin") {
        const a = evalAst(n.a, get), b = evalAst(n.b, get);
        if (n.op === "+") return a + b; if (n.op === "-") return a - b; if (n.op === "*") return a * b;
        if (n.op === "/") { if (b === 0) ERR("#DIV/0!"); return a / b; }
        return Math.pow(a, b);
      }
      if (n.k === "fn") {
        const nums = [];
        n.args.forEach((x) => {
          if (x.k === "rng") { for (let r = Math.min(x.r1, x.r2); r <= Math.max(x.r1, x.r2); r++) for (let c = Math.min(x.c1, x.c2); c <= Math.max(x.c1, x.c2); c++) { const v = get(c, r); if (typeof v === "number") nums.push(v); else if (typeof v === "string" && v.charAt(0) === "#") ERR(v); } }
          else if (x.k !== "str") nums.push(evalAst(x, get)); // theo SGK: hàm bỏ qua dữ liệu chữ (Excel thật: chữ gõ trực tiếp -> #VALUE!)
        });
        const sum = nums.reduce((t, v) => t + v, 0);
        if (n.name === "SUM") return sum;
        if (n.name === "AVERAGE") { if (!nums.length) ERR("#DIV/0!"); return sum / nums.length; }
        if (n.name === "MAX") return nums.length ? Math.max(...nums) : 0;
        if (n.name === "MIN") return nums.length ? Math.min(...nums) : 0;
        if (n.name === "COUNT") return nums.length;
        ERR("#NAME?");
      }
      ERR("#LỖI!");
    }
    const isNum = (s) => /^[-+]?(\d+(\.\d*)?|\.\d+)$/.test(String(s).trim());
    // Giá trị hiển thị của 1 ô (tính công thức, phát hiện tham chiếu vòng)
    function evalCell(data, addr, seen) {
      const raw = data[addr]; if (raw == null || raw === "") return "";
      const s = String(raw);
      if (s.charAt(0) !== "=") return isNum(s) ? parseFloat(s) : s;
      seen = seen || {}; if (seen[addr]) return "#VÒNG!";
      seen[addr] = 1;
      try { const v = evalAst(parse(s.slice(1)), (c, r) => evalCell(data, colS(c) + r, seen)); delete seen[addr]; return isFinite(v) ? v : "#NUM!"; }
      catch (e) { delete seen[addr]; if (e && e.fxErr) return e.fxErr; throw e; }
    }
    const fmt = (v) => (typeof v === "number" ? String(Math.round(v * 1e9) / 1e9) : v);
    // Sao chép công thức: dời các địa chỉ theo (dr hàng, dc cột); địa chỉ có $ giữ nguyên
    function shift(src, dr, dc) {
      let bad = false;
      const out = String(src).replace(/(^|[^A-Za-z$\d])(\$?)([A-Za-z]{1,3})(\$?)(\d+)(?![\d(A-Za-z])/g, (m, pre, dC, col, dR, row) => {
        const c = dC ? colN(col) : colN(col) + dc, r = dR ? +row : +row + dr;
        if (c < 0 || r < 1) { bad = true; return m; }
        return pre + dC + colS(c) + dR + r;
      });
      return bad ? "#REF!" : out;
    }
    // Chấm "gõ công thức": đúng nếu cho CÙNG kết quả với đáp án trên dữ liệu gốc và khi thử đổi các ô số
    function judge(answer, choice, spec, target) {
      const cells = {}; Object.entries((spec && spec.cells) || {}).forEach(([k, v]) => { cells[String(k).toUpperCase()] = String(v); });
      const m = /^([A-Z]+)(\d+)(?::([A-Z]+)(\d+))?$/.exec(String(target || "").toUpperCase().replace(/\s/g, ""));
      if (!m) return { ok: false, fraction: 0 };
      const c1 = colN(m[1]), r1 = +m[2], c2 = m[3] ? colN(m[3]) : c1, r2 = m[4] ? +m[4] : r1, list = [];
      for (let r = r1; r <= r2; r++) for (let c = c1; c <= c2; c++) list.push({ ad: colS(c) + r, dr: r - r1, dc: c - c1 });
      const got = String(choice == null ? "" : choice).split("|");
      const vars = Object.keys(cells).filter((k) => isNum(cells[k]) && !list.some((x) => x.ad === k));
      let seed = 7; const rnd = () => { seed = (seed * 16807) % 2147483647; return 2 + (seed % 96); };
      const trials = [null, 1, 2, 3].map((t) => { const d = Object.assign({}, cells); if (t) vars.forEach((k) => { d[k] = String(rnd()); }); return d; });
      let good = 0;
      list.forEach((x, i) => {
        const f = String(got[i] || "").trim(), ref = shift(answer, x.dr, x.dc);
        if (f.charAt(0) !== "=") return;
        const same = trials.every((d) => {
          const ds = Object.assign({}, d), dr = Object.assign({}, d);
          list.forEach((y, j) => { ds[y.ad] = String(got[j] || "").trim(); dr[y.ad] = shift(answer, y.dr, y.dc); });
          const a = evalCell(ds, x.ad), b = evalCell(dr, x.ad);
          return typeof a === "number" && typeof b === "number" && Math.abs(a - b) <= 1e-9 * Math.max(1, Math.abs(b));
        });
        if (same) good++;
      });
      return { ok: list.length > 0 && good === list.length, fraction: list.length ? good / list.length : 0 };
    }
    return { colN, colS, parse, evalCell, fmt, shift, judge, isNum };
  })();
  // ===== HẾT FORMULA LIB =====

  // Chấm 1 câu: trắc nghiệm chấm lại từ LỰA CHỌN (không tin "ok" do máy HS gửi)
  function judgeQuestion(q, choice) {
    if (choice == null) return false;
    if (q.type === "sheet") return q.mode === "formula" ? FX.judge(q.answer, choice, q.sheet || {}, q.target).ok : addrMatch(q.answer, choice);
    if (q.type === "short") return !!normShort(choice) && (Array.isArray(q.answer) ? q.answer : [q.answer]).some((x) => normShort(x) === normShort(choice));
    if (q.type === "true-false") return choice === q.answer;
    if (q.type === "multiple-select") { const c = Array.isArray(choice) ? choice : Object.values(choice); return JSON.stringify(c.map(Number).sort()) === JSON.stringify([...(q.answer || [])].sort()); }
    return typeof choice !== "boolean" && choice !== "" && Number(choice) === q.answer;
  }
  function judge(it, rec) {
    if (!rec) return null;
    if (it.q) { const ok = judgeQuestion(it.q, rec.choice); return { ok, fraction: ok ? 1 : 0 }; }
    const w = it.act && judgeWhole(it.act, rec.choice);
    return w || { ok: !!rec.ok, fraction: clamp01(rec.fraction) }; // bản ghi kiểu cũ: tin kết quả máy HS gửi
  }
  // Chấm lại bài ghép đôi / phân loại / sắp xếp / điền khuyết từ BÀI LÀM (kết quả cuối)
  //   choice: {m:[phải của từng trái]} | {g:[nhóm của từng thẻ]} | {o:[thứ tự bước]} | {v:[chữ điền]}
  const toArr = (x) => { if (Array.isArray(x)) return x; if (!x || typeof x !== "object") return null; const out = []; Object.keys(x).forEach((k) => { if (/^\d+$/.test(k)) out[+k] = x[k]; }); return out; };
  const normFill = (s) => String(s == null ? "" : s).trim().toLowerCase().replace(/\s+/g, " ");
  function judgeWhole(a, ch) {
    if (!ch || typeof ch !== "object" || Array.isArray(ch)) return null;
    let good = 0, total = 0, arr;
    if (a.type === "matching" && (arr = toArr(ch.m))) { total = (a.pairs || []).length; for (let i = 0; i < total; i++) if (arr[i] != null && +arr[i] === i) good++; }
    else if (a.type === "dragdrop" && (arr = toArr(ch.g))) { const its = a.items || []; total = its.length; its.forEach((it, i) => { if (arr[i] != null && +arr[i] === it.group) good++; }); }
    else if (a.type === "ordering" && (arr = toArr(ch.o))) { total = (a.steps || []).length; for (let p = 0; p < total; p++) if (arr[p] != null && +arr[p] === p) good++; }
    else if (a.type === "fillblank" && (arr = toArr(ch.v))) { total = String(a.text || "").split("{{}}").length - 1; for (let i = 0; i < total; i++) if ((a.answers && a.answers[i] || []).map(normFill).includes(normFill(arr[i]))) good++; }
    else return null;
    return { ok: total > 0 && good === total, fraction: total ? good / total : 0 };
  }
  // Trạng thái 1 hoạt động: free (HS tự làm, báo đúng/sai ngay) | open | locked | revealed
  function actState(live, aid, now) {
    if (!live || !live.follow) return "free";
    const s = (live.acts || {})[aid] || {};
    if (s.state === "revealed") return "revealed";
    if (s.state === "locked") return "locked";
    if (s.endsAt && !s.free && (now || Date.now()) >= s.endsAt) return "locked"; // đồng hồ bấm lúc HS tự làm: chỉ báo, không khóa
    return "open";
  }
  // ĐỒNG HỒ CHUNG của 1 hoạt động — một đồng hồ duy nhất cho ⏱️ trên bài giảng, bảng 📊 và bảng GV.
  //   action: start | pause | add (sec có thể âm) | reset (về sec giây, dừng) | end (công bố) | reopen
  //   HS tự làm (chưa theo nhịp): đồng hồ gắn cờ free — hiện trên máy HS, hết giờ chỉ báo, KHÔNG khóa.
  function actControl(DB, sessId, live, aid, action, sec) {
    const p = `sessions/${sessId}/live/acts/${aid}`, cur = ((live || {}).acts || {})[aid] || {}, now = DB.now();
    const tag = (o) => (live && live.follow ? o : Object.assign(o, { free: true }));
    const running = !!cur.endsAt && cur.endsAt > now;
    const left = running ? Math.ceil((cur.endsAt - now) / 1000) : Math.max(5, +cur.remaining || +sec || 60);
    if (action === "start") return DB.set(p, tag({ state: "open", endsAt: now + left * 1000, remaining: left }));
    if (action === "pause") return DB.set(p, tag({ state: "open", remaining: left }));
    if (action === "add") return running ? DB.set(p + "/endsAt", Math.max(now + 5000, cur.endsAt + sec * 1000)) : DB.set(p, tag({ state: "open", remaining: Math.max(5, left + sec) }));
    if (action === "reset") return DB.set(p, cur.state === "revealed" ? { state: "revealed", remaining: Math.max(5, +sec || 60) } : tag({ state: "open", remaining: Math.max(5, +sec || 60) }));
    if (action === "end") return DB.set(p, { state: "revealed", remaining: cur.remaining || null });
    if (action === "reopen") return DB.set(p, { state: "open", remaining: +sec || +cur.remaining || 60 });
    return Promise.resolve();
  }
  // Bật theo nhịp: đồng hồ đang chạy lúc tự làm trở thành đồng hồ theo nhịp; đồng hồ đã hết giờ bị xóa (khỏi khóa oan)
  function followFixups(live, now) {
    const up = {};
    Object.entries((live && live.acts) || {}).forEach(([aid, s]) => { if (s && s.free) up[`acts/${aid}`] = s.endsAt && s.endsAt <= now ? null : Object.assign({}, s, { free: null }); });
    return up;
  }
  // Thông tin đồng hồ: { st, running, left(giây), hasTimer, over (hết giờ lúc HS tự làm) }
  function actClock(live, aid, now) {
    const cur = ((live || {}).acts || {})[aid] || {}, st = actState(live, aid, now);
    const ticking = !!cur.endsAt && st !== "revealed" && st !== "locked";
    const left = ticking ? Math.max(0, (cur.endsAt - now) / 1000) : (+cur.remaining || 0);
    return { st, running: ticking && left > 0, left, over: ticking && left <= 0, hasTimer: !!(cur.endsAt || cur.remaining) };
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
    FX, lessonItems, judgeQuestion, judge, judgeWhole, normAddr, addrMatch, normShort, choiceDist, actState, actControl, followFixups, actClock, answerOf, scoreGroup, groupName, sortedEntries, memberNames, machineList,
    parseClassBook, classesSheet, sessionWorkbook, loadLesson, loadManifest };
});
