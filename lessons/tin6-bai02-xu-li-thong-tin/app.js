/* ============================================================================
 * THCS Lesson App — ENGINE v2 (vanilla JS, offline, không phụ thuộc thư viện).
 * Đọc dữ liệu từ window.LESSON (data/lesson.js) và render từng hoạt động.
 *
 * TÍNH NĂNG (v2):
 *  - Nhiệm vụ rõ ràng: mỗi hoạt động có khung "🎯 Nhiệm vụ" hiện sẵn (activity.task).
 *  - Hiện-khi-bấm: gợi ý, đáp án/giải thích và "Em cần nhớ" ẩn, GV bấm mới hiện.
 *  - Đồng hồ đếm ngược từng hoạt động (⏱️): đặt thời gian, hết giờ báo hiệu (GV tự quyết).
 *  - Bút vẽ (✏️): vẽ tay khoanh tròn/gạch chân trên màn hình, nhiều màu + tẩy/xóa.
 *  - Hiệu ứng đúng/sai bắt mắt: pháo giấy + dấu ✓ khi đúng, rung + ✗ khi sai.
 *  - Nút "🖼️ Xem ảnh SGK" (activity.sgkImage / question.sgkImage) mở ảnh gốc.
 *  - Sơ đồ tùy biến: block kind "svg"/"html" trong content.blocks.
 *
 * TÍNH NĂNG (v3) — CHẾ ĐỘ LỚP HỌC (nhiều máy cùng làm, xem thư mục lop-hoc/):
 *  - Nếu trang có window.LESSON_HOOKS (do máy chủ lớp học chèn vào) thì engine
 *    báo mọi lần làm bài (onAttempt), câu trả lời tự luận (onText), chuyển
 *    hoạt động (onNavigate) và KHÓA các câu nhóm đã làm (getAttempt).
 *  - Mở file trực tiếp (không có hooks) thì chạy y như v2.
 *  - window.LessonApp = { go, rerender, resetActivity } cho máy chủ điều khiển.
 *
 * TÍNH NĂNG (v4) — THEO NHỊP GIÁO VIÊN (hook actState(aid)):
 *  - "free"     : HS tự làm, báo đúng/sai ngay, chỉ tính lần đầu (như v3).
 *  - "open"     : HS làm bài nhưng CHƯA biết đúng/sai; trắc nghiệm đổi được đáp án;
 *                 ghép đôi/kéo thả/sắp xếp/điền khuyết làm hết rồi bấm Nộp (nộp lại được).
 *  - "locked"   : hết giờ — khóa, chờ GV công bố.
 *  - "revealed" : GV bấm Kết thúc — hiện đúng/sai của nhóm + đáp án.
 *  - onNavigate gửi kèm qi (câu đang xem trong hoạt động) cho màn trình chiếu.
 *
 * TÍNH NĂNG (v5):
 *  - Máy HS: ghép đôi/phân loại/sắp xếp/điền khuyết LUÔN "làm hết rồi nộp", chấm theo
 *    KẾT QUẢ CUỐI (không còn "đúng ngay lần đầu"). Tự do: nộp 1 lần, xem kết quả ngay.
 *    Theo nhịp: bài làm đủ được TỰ LƯU mỗi lần sửa. Có kết quả -> HS thấy chính bài
 *    của mình với ✓/✗ từng mục + đáp án đúng. Màn trình chiếu 1 máy giữ trò chơi cũ.
 *  - Câu hỏi dạng BẢNG TÍNH MÔ PHỎNG (question.type "sheet"): lưới giống Excel, hộp địa
 *    chỉ, vùng nhập dữ liệu; HS bấm ô / kéo chọn vùng / bấm tên hàng, cột (mode "select")
 *    hoặc gõ địa chỉ vùng được tô (mode "type"). activity.sandbox = bảng tính thử tự do
 *    (gõ dữ liệu, tự căn trái/phải như phần mềm thật, Delete để xóa).
 *  - Trò chơi penguin đổi được nhân vật: activity.pet / homeIcon / saveWord.
 *  - MỘT ĐỒNG HỒ DUY NHẤT: trên trang trình chiếu nối tiết học, ⏱️ điều khiển đồng hồ chung của lớp
 *    (hook timer: state()/act()) — cùng đồng hồ với bảng 📊 và bảng GV; bảng ⏱️ có nút ✕ ẩn.
 *  - Chế độ giáo viên (phím T) nằm góc trái; "Làm lại hoạt động" khi nối tiết học -> xóa kết quả
 *    hoạt động đó của CẢ LỚP (hook classMode()/resetActivity(aid)).
 *  - LessonApp.celebrate() / fanfare() cho màn cổ vũ, bảng vinh danh (student.js).
 *  - Phương án trả lời bằng HÌNH: question.optionImages (options vẫn giữ chữ cho bảng GV/Excel).
 *  - activity.links = [{label,url,note}]: nút mở phần mềm/trang web (tab mới).
 *  - Trò chơi "Hộp quà may mắn" (type "giftbox"): lưới hộp quà, mỗi hộp 1 câu hỏi, đúng thì mở quà.
 *  - Bảng tính mô phỏng TÍNH CÔNG THỨC (=C4*D4, + - * / ^, ngoặc, SUM/AVERAGE/MAX/MIN/COUNT): ô hiện kết quả,
 *    sửa dữ liệu -> tự cập nhật; Ctrl+C / Ctrl+V (nút 📋 📥) sao chép công thức tự dời địa chỉ.
 *    Câu hỏi sheet mode "formula": HS gõ công thức vào ô q.target, chấm bằng cách thử đổi dữ liệu (FX.judge).
 *
 * Component: intro, knowledge/explore, quiz (multiple-choice/multiple-select/
 * true-false/sheet), matching, dragdrop, ordering, fillblank, flashcard, scenario,
 * remember, summary, penguin, vandung. Thêm loại mới -> thêm 1 renderer.
 * ==========================================================================*/
(function () {
  "use strict";
  const L = window.LESSON;
  if (!L) { document.body.innerHTML = "<p style='padding:40px'>Không tìm thấy dữ liệu bài học (data/lesson.js).</p>"; return; }

  const S = Object.assign({ basePoints: 100, useTimer: false, defaultTime: 60, sound: false, streakEnabled: true }, L.settings || {});
  const state = { view: "home", idx: 0, score: 0, streak: 0, maxStreak: 0, teacher: false, showAnswers: false };
  const timer = { total: 0, remaining: 0, running: false, tick: null };
  const pen = { mode: null, drawing: false, last: null, ctx: null };
  const $ = (sel, root = document) => root.querySelector(sel);
  const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
  const esc = (s) => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const KEYS = ["A", "B", "C", "D", "E", "F"];

  // ---- hooks chế độ lớp học (không có -> mọi hàm là no-op) ---------------
  const HOOK = window.LESSON_HOOKS || {};
  const STUDENT = HOOK.role === "student";
  function emit(name, data) { try { if (typeof HOOK[name] === "function") HOOK[name](data); } catch (e) { console.warn(e); } }
  function ask(name, arg) { try { return typeof HOOK[name] === "function" ? HOOK[name](arg) : null; } catch (e) { return null; } }
  const canNav = () => ask("canNavigate") !== false;
  const aid = (a) => a.id || ("a" + L.activities.indexOf(a));
  const qKey = (a, qi) => (a._keyBase || aid(a) + ":q") + qi;
  const drafts = {}; // nháp câu tự luận, giữ lại khi render lại
  // Trạng thái hoạt động do GV điều khiển (chỉ máy HS; trình chiếu/mở file luôn "free")
  const actStateOf = (a) => (STUDENT ? ask("actState", aid(a._parent || a)) || "free" : "free");
  function judgeLocal(q, choice) {
    if (choice == null) return false;
    if (q.type === "sheet") return q.mode === "formula" ? FX.judge(q.answer, choice, q.sheet || {}, q.target).ok : addrMatch(q.answer, choice);
    if (q.type === "short") return shortMatch(q.answer, choice);
    if (q.type === "true-false") return choice === q.answer;
    if (q.type === "multiple-select") return JSON.stringify([...(choice || [])].map(Number).sort()) === JSON.stringify([...(q.answer || [])].sort());
    return choice === q.answer;
  }
  // Dòng nhắc trạng thái khi làm bài theo nhịp GV
  function deferNote(st, done, kind) {
    const t = st === "locked" ? (done ? "⏰ Hết giờ! Nhóm em đã " + (kind !== "whole" ? "trả lời" : "nộp bài") + " — chờ thầy/cô công bố kết quả." : "⏰ Hết giờ! Nhóm em chưa " + (kind !== "whole" ? "trả lời câu này" : "nộp bài") + " — tính là chưa hoàn thành.")
      : kind === "quiz" ? (done ? "✔ Đã ghi nhận. Có thể đổi đáp án đến khi thầy/cô kết thúc." : "👆 Chọn đáp án. Đúng/sai sẽ được công bố khi thầy/cô kết thúc.")
      : kind === "sheet" ? (done ? "✔ Đã ghi nhận lựa chọn. Có thể chọn lại đến khi thầy/cô kết thúc." : "👆 Thực hiện trên bảng tính. Đúng/sai sẽ được công bố khi thầy/cô kết thúc.")
      : kind === "short" ? (done ? "✔ Đã ghi nhận câu trả lời. Có thể sửa đến khi thầy/cô kết thúc." : "✍️ Gõ câu trả lời rồi nhấn Enter. Đúng/sai sẽ được công bố khi thầy/cô kết thúc.")
      : (done ? "✔ Đã nộp. Có thể sửa và nộp lại đến khi thầy/cô kết thúc." : "📝 Làm xong toàn bộ rồi bấm Nộp bài. Kết quả công bố khi thầy/cô kết thúc.");
    return el("div", "defer-note " + st, t);
  }

  // ---- địa chỉ ô/vùng (bảng tính mô phỏng) ---------------------------------
  const colName = (n) => { let s = ""; n++; while (n > 0) { const m = (n - 1) % 26; s = String.fromCharCode(65 + m) + s; n = Math.floor((n - 1) / 26); } return s; };
  const colNum = (s) => [...s].reduce((t, ch) => t * 26 + ch.charCodeAt(0) - 64, 0) - 1;
  // Chuẩn hoá địa chỉ: "b6" -> "B6", "E11:B4" -> "B4:E11", "D" -> "D:D" (cả cột), "6" -> "6:6" (cả hàng)
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
  const addrMatch = (answer, choice) => choice != null && choice !== "" && (Array.isArray(answer) ? answer : [answer]).some((x) => normAddr(x) === normAddr(choice));
  // Câu trả lời ngắn (type "short"): so khớp không phân biệt hoa/thường, dấu tiếng Việt, khoảng trắng — PHẢI khớp normShort trong core.js
  const normShort = (s) => String(s == null ? "" : s).normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[đĐ]/g, "D").toUpperCase().replace(/[^A-Z0-9]/g, "");
  const shortMatch = (answer, choice) => !!normShort(choice) && (Array.isArray(answer) ? answer : [answer]).some((x) => normShort(x) === normShort(choice));
  const firstOf = (x) => (Array.isArray(x) ? x[0] : x);
  // Địa chỉ -> hình chữ nhật {c1,r1,c2,r2} (0-based cột, 1-based hàng) trên lưới cols x rows
  function addrRect(addr, cols, rows) {
    const s = normAddr(addr); let m;
    if ((m = s.match(/^([A-Z]+)(\d+)$/))) return { c1: colNum(m[1]), r1: +m[2], c2: colNum(m[1]), r2: +m[2] };
    if ((m = s.match(/^([A-Z]+)(\d+):([A-Z]+)(\d+)$/))) return { c1: colNum(m[1]), r1: +m[2], c2: colNum(m[3]), r2: +m[4] };
    if ((m = s.match(/^([A-Z]+):([A-Z]+)$/))) return { c1: colNum(m[1]), r1: 1, c2: colNum(m[2]), r2: rows, cols: true };
    if ((m = s.match(/^(\d+):(\d+)$/))) return { c1: 0, r1: +m[1], c2: cols - 1, r2: +m[2], rows: true };
    return null;
  }

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
        if (x.t === "ref") { p++; return { k: "ref", c: x.c, r: x.r }; }
        if (x.t === "(") { p++; const e = expr(); eat(")"); return e; }
        if (x.t === "fn") { p++; eat("("); const args = []; if (peek() !== ")") { do { if (peek() === "rng") { const r = tk[p++]; args.push({ k: "rng", ...r }); } else args.push(expr()); } while (peek() === "," && ++p); } eat(")"); return { k: "fn", name: x.v, args }; }
        ERR("#LỖI!");
      }
      const e = expr(); if (p !== tk.length) ERR("#LỖI!"); return e;
    }
    function evalAst(n, get) {
      if (n.k === "num") return n.v;
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
          else nums.push(evalAst(x, get));
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

  // ---- shell -------------------------------------------------------------
  const root = document.getElementById("app");
  root.innerHTML = `
    <div class="topbar">
      <div class="act-name" id="actName">${esc(L.meta && L.meta.title || "Bài học")}</div>
      <div class="spacer"></div>
      <div class="timer-chip" id="timerChip" hidden><span id="timerText">0:00</span></div>
      <div class="progress"><i id="progFill"></i></div>
      <div class="progress-label" id="progLabel"></div>
    </div>
    <div class="stage"><div id="view"></div></div>
    <div class="controls">
      <button class="btn ghost" id="btnPrev" title="Quay lại (←)">← Quay lại</button>
      <div class="score">⭐ <span id="score">0</span> <span class="streak" id="streak"></span></div>
      <div class="spacer"></div>
      <button class="icon-btn" id="btnSound" title="Bật/tắt âm thanh">🔊</button>
      <button class="icon-btn" id="btnTimer" title="Đồng hồ đếm giờ">⏱️</button>
      <button class="icon-btn" id="btnPen" title="Bút vẽ (P) — bấm lại để thoát">✏️</button>
      <button class="icon-btn" id="btnHighlight" title="Bút dạ quang (H) — bấm lại để thoát">🖍️</button>
      <button class="icon-btn" id="btnEraser" title="Cục tẩy — xóa nét đã vẽ">🧽</button>
      <button class="icon-btn" id="btnPenClear" title="Xóa hết nét vẽ">🗑️</button>
      <button class="icon-btn" id="btnSpotlight" title="Đèn pin — rọi sáng 1 vùng (lăn chuột để đổi cỡ)">🔦</button>
      <button class="icon-btn" id="btnZoomRect" title="Khung phóng to — kéo chọn vùng để phóng to lên">🔲</button>
      <button class="icon-btn" id="btnFull" title="Toàn màn hình (F)">⛶</button>
      <button class="btn" id="btnNext" title="Tiếp tục (→ / Space)">Tiếp tục →</button>
    </div>

    <!-- Bảng đồng hồ -->
    <div class="timer-panel" id="timerPanel" hidden>
      <div class="timer-head"><strong>⏱️ Đồng hồ hoạt động</strong><button class="timer-close" id="timerClose" title="Ẩn bảng đồng hồ (đồng hồ vẫn chạy)">✕</button></div>
      <div class="timer-mode" id="timerMode" hidden></div>
      <div class="timer-big" id="timerBig">1:00</div>
      <div class="timer-row">
        <button data-d="-30">−30s</button><button data-d="-15">−15s</button>
        <button data-d="15">+15s</button><button data-d="30">+30s</button><button data-d="60">+1p</button>
      </div>
      <div class="timer-row">
        <button class="prim" id="timerStart">▶ Bắt đầu</button>
        <button id="timerPause">⏸ Tạm dừng</button>
        <button id="timerReset">↺ Đặt lại</button>
      </div>
      <div class="timer-row" id="timerFollowRow" hidden>
        <button class="end" id="timerEnd">🏁 Kết thúc &amp; công bố</button>
        <button id="timerReopen" hidden>↺ Mở lại cho làm tiếp</button>
      </div>
      <span class="hint" id="timerHint">Hết giờ sẽ báo hiệu; giáo viên chủ động bấm tiếp.</span>
    </div>

    <!-- Lớp vẽ (bút / bút dạ quang / tẩy) — điều khiển bằng các icon trên thanh dưới -->
    <canvas class="pen-canvas" id="penCanvas" hidden></canvas>

    <!-- Đèn pin (spotlight): phủ tối, chừa 1 vòng sáng theo con trỏ -->
    <div class="spotlight" id="spotlight" hidden></div>

    <!-- Lớp kéo chọn vùng để phóng to -->
    <div class="zoom-layer" id="zoomLayer" hidden></div>

    <!-- Chế độ giáo viên -->
    <div class="teacher-bar" id="teacherBar">
      <strong>👩‍🏫 Chế độ giáo viên</strong>
      <button id="tShowAns">Hiện/ẩn đáp án</button>
      <button id="tReset">Làm lại hoạt động</button>
      <button id="tResetScore">Đặt lại điểm</button>
      <select id="tJump"></select>
      <span class="hint">Phím T bật/tắt bảng này</span>
    </div>

    <!-- Hộp xem ảnh SGK (có thể phóng to: lăn chuột / nút +− / kéo để di chuyển) -->
    <div class="lightbox" id="lightbox" hidden>
      <div class="lb-inner">
        <button class="lb-close" id="lbClose">✖</button>
        <div class="lb-imgwrap" id="lbWrap"><img id="lbImg" alt="Ảnh SGK"></div>
        <div class="lb-tools">
          <button id="lbZoomOut" title="Thu nhỏ">➖</button>
          <button id="lbZoomReset" title="Về cỡ ban đầu">⟳</button>
          <button id="lbZoomIn" title="Phóng to">➕</button>
        </div>
      </div>
    </div>
    <div class="confetti" id="confetti"></div>`;

  const view = $("#view");
  L.activities.forEach((a) => (a.questions || []).forEach((q) => { if (q.type === "sheet" && !q.sheet && a.sheet) q.sheet = a.sheet; }));
  ensureEngineCSS(); // CSS thành phần của engine (bài cũ không cần sửa styles/app.css)
  function setScore() { $("#score").textContent = state.score; $("#streak").textContent = (S.streakEnabled && state.streak > 1) ? "🔥 x" + state.streak : ""; }
  function setProgress() {
    const total = L.activities.length;
    const cur = state.view === "home" ? 0 : state.idx + 1;
    $("#progFill").style.width = (cur / total * 100) + "%";
    $("#progLabel").textContent = state.view === "home" ? "" : `${cur}/${total}`;
    $("#actName").textContent = state.view === "home" ? (L.meta && L.meta.title || "Bài học") : L.activities[state.idx].name;
  }

  // ---- navigation --------------------------------------------------------
  // Các hàm điều hướng do NGƯỜI DÙNG bấm: bị chặn khi GV bật "HS theo nhịp GV".
  function goHome() { state.view = "home"; render(); }
  function start() { if (!canNav()) return; state.view = "activity"; state.idx = 0; render(); }
  function next() {
    if (!canNav()) return;
    if (state.view === "home") return start();
    if (state.idx < L.activities.length - 1) { state.idx++; render(); }
  }
  function prev() {
    if (!canNav() || state.view === "home") return;
    if (state.idx > 0) { state.idx--; render(); } else goHome();
  }
  function jump(i) { if (!canNav()) return; state.view = "activity"; state.idx = i; render(); }

  function render() {
    clearPenCanvas();
    const mag = document.querySelector(".magnify-overlay"); if (mag) mag.remove();
    view.innerHTML = "";
    setProgress(); setScore();
    resetTimerForActivity();
    if (state.view === "home") { renderHome(); emit("onNavigate", { idx: -1, qi: 0 }); return; }
    const a = L.activities[state.idx];
    // Nhiệm vụ + nút ảnh SGK (chung cho mọi loại)
    (RENDERERS[a.type] || renderKnowledge)(a);
    emit("onNavigate", { idx: state.idx, qi: (a._chal ? a._chal._qi : a._qi) || 0 });
  }

  // ---- home --------------------------------------------------------------
  function renderHome() {
    const c = el("div", "card home");
    const m = L.meta || {};
    c.innerHTML = `
      <div class="home-badge">📘</div>
      <h1 class="title">${esc(m.title || "Bài học")}</h1>
      <p class="meta">${esc(m.subject || "")} · Lớp ${esc(m.grade || "")} · ${esc(m.book || "")}</p>
      ${L.coreKnowledge && L.coreKnowledge.length ? `<p class="lead">Hôm nay chúng ta cùng khám phá và ghi nhớ ${L.coreKnowledge.length} điều quan trọng nhé! 🚀</p>` : ""}
      <p><button class="btn big" id="btnStart">Bắt đầu tiết học →</button></p>`;
    const menu = el("div", "menu");
    L.activities.forEach((a, i) => { const b = el("button", null, `<span class="mn">${i + 1}</span> ${esc(a.name)}`); b.onclick = () => jump(i); menu.appendChild(b); });
    c.appendChild(menu);
    view.appendChild(c);
    $("#btnStart").onclick = start;
  }

  // ---- các khối dùng chung ----------------------------------------------
  function taskBanner(a) {
    if (!a.task) return null;
    return el("div", "task-banner", `<span class="tb-ico">🎯</span><div><strong>Nhiệm vụ</strong><div>${esc(a.task)}</div></div>`);
  }
  // activity.links = [{ label, url, note }] — nút mở phần mềm/trang web ở tab mới
  function linksBox(links) {
    ensureEngineCSS(); const box = el("div", "act-links");
    links.forEach((l) => { const x = el("a", "btn act-link", "🔗 " + esc(l.label || l.url)); x.href = l.url; x.target = "_blank"; x.rel = "noopener"; box.appendChild(x); if (l.note) box.appendChild(el("span", "act-link-note", esc(l.note))); });
    return box;
  }
  function sgkButton(src) {
    if (!src) return null;
    const b = el("button", "btn ghost sgk-btn", "🖼️ Xem ảnh SGK");
    b.onclick = () => openLightbox(src);
    return b;
  }
  // Nút hiện-khi-bấm: trả về 1 phần tử; bấm sẽ thay bằng nội dung.
  function revealBox(label, buildContent, cls) {
    const wrap = el("div", "reveal " + (cls || ""));
    const btn = el("button", "reveal-btn", label);
    btn.onclick = () => {
      const content = buildContent();
      wrap.innerHTML = "";
      wrap.appendChild(content);
      wrap.classList.add("open");
    };
    wrap.appendChild(btn);
    return wrap;
  }
  function imageHTML(src, caption) { return src ? `<img class="lesson-img" src="${esc(src)}" alt="${esc(caption || "")}"><div class="caption">${esc(caption || "")}</div>` : ""; }
  function blocksHTML(blocks) {
    return (blocks || []).map((b) => {
      if (b.kind === "text") return `<p class="lead">${esc(b.value)}</p>`;
      if (b.kind === "image") return imageHTML(b.value, b.caption);
      if (b.kind === "list") return "<ul class='lead'>" + b.value.map((x) => `<li>${esc(x)}</li>`).join("") + "</ul>";
      if (b.kind === "ext") return `<p><span class="ext-tag">Mở rộng</span> ${esc(b.value)}</p>`;
      if (b.kind === "svg" || b.kind === "html") return `<div class="diagram">${b.value}</div>`; // nội dung tin cậy (tự soạn)
      return "";
    }).join("");
  }
  function activityHead(a, cardEl) {
    if (a.content && a.content.heading) cardEl.appendChild(el("h1", "title", esc(a.content.heading)));
    else cardEl.appendChild(el("h1", "title", esc(a.name)));
    const tb = taskBanner(a); if (tb) cardEl.appendChild(tb);
    const sb = sgkButton(a.sgkImage); if (sb) cardEl.appendChild(sb);
    if (a.links && a.links.length) cardEl.appendChild(linksBox(a.links));
    if (a.sandbox) cardEl.appendChild(sandboxBox(a));
    if (a.mindmap) cardEl.appendChild(mindmapBox(a));
    if (a.mail) cardEl.appendChild(mailBox(a));
  }
  function appendRemember(items, cardOrView) {
    // "Em cần nhớ" — ẩn, bấm mới hiện
    const box = revealBox("📌 Em cần nhớ (bấm để hiện)", () => {
      const b = el("div", "remember");
      b.innerHTML = `<h2>💡 Em cần nhớ</h2><ol>${items.map((t) => `<li>${esc(t)}</li>`).join("")}</ol>`;
      return b;
    }, "remember-reveal");
    (cardOrView || view).appendChild(box);
  }

  // ---- intro / explore / knowledge --------------------------------------
  function renderKnowledge(a) {
    const c = el("div", "card");
    activityHead(a, c);
    const ct = a.content || {};
    if (ct.prompt) c.appendChild(el("p", "prompt", esc(ct.prompt)));
    if (ct.image) { const im = el("div"); im.innerHTML = imageHTML(ct.image, ct.imageCaption); c.appendChild(im); } // ảnh minh hoạ hiển thị trực tiếp
    // Nội dung kiến thức: ẩn, bấm mới hiện (nếu có blocks)
    if (ct.blocks && ct.blocks.length) {
      c.appendChild(revealBox(ct.revealLabel || "🔍 Hiện nội dung kiến thức", () => {
        const d = el("div", "kn-blocks"); d.innerHTML = blocksHTML(ct.blocks); return d;
      }));
    }
    view.appendChild(c);
    if (a.questions && a.questions.length) renderQuizInto(c, a);
    if (a.remember && a.remember.length) appendRemember(a.remember);
  }

  // ---- QUIZ --------------------------------------------------------------
  function renderQuiz(a) { const c = el("div", "card"); activityHead(a, c); view.appendChild(c); renderQuizInto(c, a); }
  function renderQuizInto(card, a) {
    const qs = a.questions || [];
    if (a._qi == null) { // chế độ lớp học: mở lại -> nhảy tới câu đầu tiên nhóm chưa làm
      a._qi = 0;
      while (a._qi < qs.length - 1 && ask("getAttempt", qKey(a, a._qi))) a._qi++;
    }
    if (!qs.length) { card.innerHTML += "<p class='lead'>[CẦN GIÁO VIÊN KIỂM TRA] Chưa có câu hỏi.</p>"; return; }
    const st = actStateOf(a);
    if (st !== "free") return renderQuizDeferred(card, a, qs, st);
    const q = qs[a._qi];
    const wrap = el("div");
    wrap.innerHTML = `<p class="subtitle">Câu ${a._qi + 1}/${qs.length} · ${levelLabel(q.level)}</p>
      <p class="prompt">${esc(q.question)}</p>`;
    card.appendChild(wrap);
    const sb = sgkButton(q.sgkImage); if (sb) card.appendChild(sb);
    if (q.image) { const im = el("div"); im.innerHTML = imageHTML(q.image, q.imageCaption); card.appendChild(im); }
    const answered = { done: false };

    card._key = qKey(a, a._qi); card._a = a;
    if (q.type === "sheet") return sheetQuestionFree(card, a, q, answered);
    if (q.type === "short") return shortQuestionFree(card, a, q, answered);
    if (q.type === "true-false") {
      const opts = el("div", "options");
      [["Đúng", true], ["Sai", false]].forEach(([label, val], i) => {
        const b = el("button", "opt", `<span class="key">${KEYS[i]}</span> ${label}`);
        b.onclick = () => judgeTF(b, opts, val, q, a, card, answered);
        b.dataset.k = i; b.dataset.v = val ? "1" : "0"; opts.appendChild(b);
      });
      card.appendChild(opts); card._opts = opts;
    } else {
      const isMulti = q.type === "multiple-select";
      const opts = el("div", "options");
      (q.options || []).forEach((o, i) => {
        const b = el("button", "opt" + (q.optionImages ? " opt-img" : ""), `<span class="key">${KEYS[i]}</span> ${optLabel(q, i)}`);
        b.dataset.k = i;
        b.onclick = () => isMulti ? toggleMulti(b) : judgeMC(i, opts, q, a, card, answered);
        opts.appendChild(b);
      });
      card.appendChild(opts); card._opts = opts;
      if (isMulti) {
        const submit = el("button", "btn ms-submit", "Kiểm tra");
        submit.onclick = () => judgeMS(opts, q, a, card, answered, submit);
        card.appendChild(wrapEl(submit));
      }
    }
    // Gợi ý: ẩn, bấm mới hiện
    if (q.hint) card.appendChild(revealBox("💡 Gợi ý", () => el("div", "hint-box", "💡 " + esc(q.hint))));
    card._answered = answered; card._q = q;
    // Chế độ lớp học: câu nhóm đã làm -> hiện lại kết quả cũ, không cho làm lại
    const done = ask("getAttempt", card._key);
    if (done) { answered.done = true; paintChoice(card._opts, q, done.choice); answerFeedback(done.ok, q, card, true); }
    else if (state.showAnswers) revealAnswer(card._opts, q);
  }
  // Phương án bằng HÌNH (q.optionImages): HS chỉ thấy hình; chữ trong q.options dùng cho bảng GV / Excel
  function optLabel(q, i) { const im = q.optionImages && q.optionImages[i]; return im ? `<img class="opt-pic" src="${esc(im)}" alt="">` : esc((q.options || [])[i]); }
  function wrapEl(child) { const p = el("p"); p.appendChild(child); return p; }
  function toggleMulti(b) { if (!b.classList.contains("locked")) b.classList.toggle("selected"); }

  // Tô màu đúng/sai theo lựa chọn (dùng chung cho lúc chấm và lúc hiện lại bài đã làm)
  function paintChoice(opts, q, choice) {
    const kids = [...opts.children];
    if (q.type === "true-false") {
      kids.forEach((b) => { const v = b.dataset.v === "1"; if (v === q.answer) b.classList.add("correct"); else b.classList.add(v === choice ? "wrong" : "dim"); b.onclick = null; });
    } else if (q.type === "multiple-select") {
      const correct = q.answer || [], chosen = choice || [];
      kids.forEach((b, k) => { if (chosen.includes(k)) b.classList.add("selected"); if (correct.includes(k)) b.classList.add("correct"); else if (chosen.includes(k)) b.classList.add("wrong"); b.classList.add("locked"); });
      const sub = opts.parentNode && opts.parentNode.querySelector(".ms-submit"); if (sub) sub.disabled = true;
    } else {
      kids.forEach((b, k) => { if (k === q.answer) b.classList.add("correct"); else if (k === choice) b.classList.add("wrong"); else b.classList.add("dim"); b.onclick = null; });
    }
  }
  function judgeMC(i, opts, q, a, card, answered) {
    if (answered.done) return; answered.done = true;
    paintChoice(opts, q, i);
    afterAnswer(i === q.answer, q, card, i);
  }
  function judgeTF(btn, opts, val, q, a, card, answered) {
    if (answered.done) return; answered.done = true;
    paintChoice(opts, q, val);
    afterAnswer(val === q.answer, q, card, val);
  }
  function judgeMS(opts, q, a, card, answered, submit) {
    if (answered.done) return; answered.done = true;
    const chosen = [...opts.children].filter((b) => b.classList.contains("selected")).map((b) => +b.dataset.k).sort();
    const correct = [...(q.answer || [])].sort();
    const ok = JSON.stringify(chosen) === JSON.stringify(correct);
    paintChoice(opts, q, chosen);
    submit.disabled = true;
    afterAnswer(ok, q, card, chosen);
  }

  function afterAnswer(ok, q, card, choice) {
    if (card._a && (card._a.type === "giftbox" || card._a.type === "crossword")) (card._a._res = card._a._res || {})[card._a._qi] = ok;
    if (ok) { let pts = S.basePoints; if (S.streakEnabled) { state.streak++; pts = Math.round(pts * Math.min(2, 1 + (state.streak - 1) * 0.2)); } state.maxStreak = Math.max(state.maxStreak, state.streak); state.score += pts; celebrate(); }
    else { state.streak = 0; card.classList.add("shake"); setTimeout(() => card.classList.remove("shake"), 500); }
    setScore();
    const badge = el("div", "answer-badge " + (ok ? "ok" : "no"), ok ? "✓" : "✗");
    card.appendChild(badge); setTimeout(() => badge.remove(), 900);
    emit("onAttempt", { key: card._key, activityId: card._a ? aid(card._a._parent || card._a) : "", ok, fraction: ok ? 1 : 0, choice });
    answerFeedback(ok, q, card, false);
    sound(ok ? "ok" : "no");
    if (card._penguin) card._penguin(ok); // cập nhật đàn cánh cụt (trò chơi penguin)
    if (card._cw) card._cw(); // lật hàng ô chữ
  }
  function answerFeedback(ok, q, card, replay) {
    const fb = el("div", "feedback " + (ok ? "ok" : "no"));
    const head = replay ? (ok ? "✅ Nhóm em đã trả lời ĐÚNG câu này." : "❌ Nhóm em đã trả lời CHƯA ĐÚNG câu này.") : (ok ? "🎉 Chính xác!" : "❌ Chưa chính xác!");
    fb.innerHTML = `${head}<div class="explain">${esc(q.explanation || "")}</div>`;
    card.appendChild(fb);
    const a2 = card._a;
    if (a2 && a2.type === "giftbox") { giftAfter(a2, card, ok, replay); return; }
    if (a2 && a2.questions && a2._qi < a2.questions.length - 1) {
      const nb = el("button", "btn", "Câu tiếp theo →");
      nb.onclick = () => { a2._qi++; render(); };
      card.appendChild(wrapEl(nb));
    }
  }
  // ---- QUIZ theo nhịp GV: chọn/đổi đáp án, chưa báo đúng sai; GV kết thúc mới hiện --
  function renderQuizDeferred(card, a, qs, st) {
    const q = qs[a._qi], key = qKey(a, a._qi), rec = ask("getAttempt", key);
    card._key = key; card._a = a;
    const head = el("div");
    head.innerHTML = `<p class="subtitle">Câu ${a._qi + 1}/${qs.length} · ${levelLabel(q.level)}</p>`;
    if (qs.length > 1) { // chấm tròn chuyển câu (xanh = đã trả lời)
      const pills = el("div", "q-pills");
      qs.forEach((_, k) => { const b = el("button", "q-pill" + (k === a._qi ? " cur" : "") + (ask("getAttempt", qKey(a, k)) ? " done" : ""), String(k + 1)); b.onclick = () => { a._qi = k; render(); }; pills.appendChild(b); });
      head.appendChild(pills);
    }
    head.appendChild(el("p", "prompt", esc(q.question)));
    card.appendChild(head);
    const sb = sgkButton(q.sgkImage); if (sb) card.appendChild(sb);
    if (q.image) { const im = el("div"); im.innerHTML = imageHTML(q.image, q.imageCaption); card.appendChild(im); }
    if (q.type === "sheet") return sheetQuestionDeferred(card, a, qs, q, key, rec, st);
    if (q.type === "short") return shortQuestionDeferred(card, a, qs, q, key, rec, st);
    const opts = el("div", "options");
    const list = q.type === "true-false" ? [["Đúng", true], ["Sai", false]] : (q.options || []).map((o, i) => [optLabel(q, i), i]);
    list.forEach(([label, val], i) => { const b = el("button", "opt" + (q.optionImages ? " opt-img" : ""), `<span class="key">${KEYS[i]}</span> ${label}`); b.dataset.k = i; if (q.type === "true-false") b.dataset.v = val ? "1" : "0"; opts.appendChild(b); });
    card.appendChild(opts); card._opts = opts;
    if (st === "revealed") {
      if (rec && rec.choice != null) { paintChoice(opts, q, rec.choice); answerFeedback(judgeLocal(q, rec.choice), q, card, true); }
      else { markCorrect(opts, q); [...opts.children].forEach((b) => { b.onclick = null; if (!b.classList.contains("correct")) b.classList.add("dim"); }); const fb = el("div", "feedback no"); fb.innerHTML = `⏳ Nhóm em chưa trả lời câu này.<div class="explain">${esc(q.explanation || "")}</div>`; card.appendChild(fb); quizNav(card, a, qs); }
      return;
    }
    const kids = [...opts.children];
    const showSel = (choice) => kids.forEach((b, k) => { const v = q.type === "true-false" ? b.dataset.v === "1" : k; b.classList.toggle("selected", Array.isArray(choice) ? choice.includes(v) : choice === v); });
    if (rec) showSel(rec.choice);
    let note = deferNote(st, !!rec, "quiz");
    if (st === "open") kids.forEach((b, k) => {
      b.onclick = () => {
        let choice;
        if (q.type === "multiple-select") { b.classList.toggle("selected"); choice = kids.filter((x) => x.classList.contains("selected")).map((x) => +x.dataset.k); }
        else choice = q.type === "true-false" ? b.dataset.v === "1" : k;
        showSel(choice);
        const ok = judgeLocal(q, choice);
        emit("onAttempt", { key, activityId: aid(a._parent || a), ok, fraction: ok ? 1 : 0, choice });
        const n2 = deferNote(st, true, "quiz"); note.replaceWith(n2); note = n2;
        const pill = card.querySelector(".q-pill.cur"); if (pill) pill.classList.add("done");
      };
    });
    else kids.forEach((b) => b.classList.add("locked"));
    card.appendChild(note);
    if (q.hint && st === "open") card.appendChild(revealBox("💡 Gợi ý", () => el("div", "hint-box", "💡 " + esc(q.hint))));
    quizNav(card, a, qs);
  }
  function markCorrect(opts, q) {
    [...opts.children].forEach((b, k) => { const right = q.type === "true-false" ? (b.dataset.v === "1") === q.answer : q.type === "multiple-select" ? (q.answer || []).includes(k) : k === q.answer; if (right) b.classList.add("correct"); });
  }
  function quizNav(card, a, qs) {
    if (qs.length < 2) return;
    const row = el("p", "q-nav");
    const pv = el("button", "btn ghost", "← Câu trước"), nx = el("button", "btn", "Câu tiếp theo →");
    pv.disabled = a._qi <= 0; nx.disabled = a._qi >= qs.length - 1;
    pv.onclick = () => { a._qi--; render(); }; nx.onclick = () => { a._qi++; render(); };
    row.append(pv, nx); card.appendChild(row);
  }
  function revealAnswer(opts, q) {
    if (!opts) return;
    if (q.type === "multiple-choice") opts.children[q.answer] && opts.children[q.answer].classList.add("correct");
    if (q.type === "multiple-select") (q.answer || []).forEach((k) => opts.children[k] && opts.children[k].classList.add("correct"));
  }
  function levelLabel(l) { return ({ "nhan-biet": "Nhận biết", "thong-hieu": "Thông hiểu", "van-dung": "Vận dụng", "van-dung-cao": "Vận dụng cao" }[l]) || ""; }

  // ---- MATCHING ----------------------------------------------------------
  function renderMatching(a) {
    const c = el("div", "card"); activityHead(a, c);
    const key = aid(a) + ":main";
    const pairs = (a.pairs || []).map((p, i) => ({ ...p, i }));
    const answerHTML = `<div class="two-col"><div>${pairs.map(p => `<div class="chip done">${esc(p.left)}</div>`).join("")}</div><div>${pairs.map(p => `<div class="chip done">${esc(p.right)}</div>`).join("")}</div></div>`;
    if (STUDENT) return renderWholeStudent(c, a, key, actStateOf(a), answerHTML, matchingUI(a, pairs));
    // Màn trình chiếu / mở file: trò chơi báo đúng sai từng cặp (không ghi điểm lớp học)
    c.appendChild(el("p", "subtitle", a.intro || "Chọn một ô bên trái rồi chọn ô tương ứng bên phải."));
    if (a.image) { const im = el("div"); im.innerHTML = imageHTML(a.image, a.imageCaption); c.appendChild(im); }
    const rights = shuffle(pairs.slice());
    const grid = el("div", "two-col"); const left = el("div"); const right = el("div");
    const wrong = a._wrong || (a._wrong = new Set()); // các cặp đã ghép sai ít nhất 1 lần
    let sel = null, matched = 0;
    pairs.forEach((p) => { const ch = el("div", "chip", esc(p.left)); ch.dataset.i = p.i; ch.onclick = () => { if (ch.classList.contains("done")) return; [...left.children].forEach(x => x.classList.remove("selected")); ch.classList.add("selected"); sel = ch; }; left.appendChild(ch); });
    rights.forEach((p) => { const ch = el("div", "chip", esc(p.right)); ch.dataset.i = p.i; ch.onclick = () => { if (!sel || ch.classList.contains("done")) return; if (sel.dataset.i === ch.dataset.i) { ch.classList.add("done"); sel.classList.add("done"); sel.classList.remove("selected"); sel = null; matched++; celebrate(); if (matched === pairs.length) { state.score += S.basePoints; setScore(); finishMulti(c, a, wrong, pairs.length, "✓ Hoàn thành!"); } } else { wrong.add(sel.dataset.i); ch.classList.add("shake"); sound("no"); setTimeout(() => ch.classList.remove("shake"), 400); } }; right.appendChild(ch); });
    grid.append(left, right); c.appendChild(grid); view.appendChild(c);
  }
  function showDone(c, a, msg) { const fb = el("div", "feedback ok"); fb.innerHTML = `${msg}<div class="explain">${esc(a.explanation || "")}</div>${a.doneImage ? imageHTML(a.doneImage, a.doneCaption) : ""}`; c.appendChild(fb); sound("ok"); }
  // Trò chơi trên màn trình chiếu: báo số mục làm đúng ngay lần đầu (chỉ để cả lớp nhận xét)
  function finishMulti(c, a, wrong, total, msg) {
    const good = total - wrong.size;
    showDone(c, a, msg + (wrong.size ? ` (đúng ngay lần đầu ${good}/${total})` : ""));
  }
  // Bản ghi kiểu cũ (trước v5) không có bài làm chi tiết: chỉ hiện kết quả + đáp án
  function showLocked(c, a, rec, answerHTML, deferred) {
    c.appendChild(el("div", "locked-answer", answerHTML));
    const fb = el("div", "feedback " + (rec && rec.ok ? "ok" : "no")), ex = `<div class="explain">${esc(a.explanation || "")}</div>`;
    if (!rec) fb.innerHTML = `⏳ Nhóm em chưa nộp bài này — tính là chưa hoàn thành.${ex}`;
    else { const n = rec.total || 0, good = Math.round((rec.fraction || 0) * n); fb.innerHTML = `${rec.ok ? "✅" : "📝"} Nhóm em ${deferred ? "đã nộp" : "đã làm"} bài này${n ? ` — đúng ${good}/${n}` : ""}.${ex}`; }
    c.appendChild(fb); view.appendChild(c);
  }

  // ---- MÁY HỌC SINH: LÀM HẾT RỒI NỘP (mọi chế độ), chấm theo KẾT QUẢ CUỐI -----------
  //  free   : làm xong bấm "Nộp bài & xem kết quả" (chỉ tính lần nộp đầu) -> xem lại bài ngay.
  //  open   : theo nhịp GV — bài làm đủ được TỰ LƯU sau mỗi lần sửa (không lo quên nộp lại).
  //  locked : hết giờ, khóa.   revealed : GV công bố -> xem lại bài của nhóm (✓/✗ từng mục).
  // ui = { init(choice)->nháp, draw(box,nháp,bậtTắt,vẽLại,đổi), complete(nháp),
  //        score(nháp)->{good,total,choice}, valid(choice), review(nháp)->phần tử }
  function renderWholeStudent(c, a, key, st, answerHTML, ui) {
    const rec = ask("getAttempt", key);
    if (st === "revealed" || (st === "free" && rec)) return showReview(c, a, rec, answerHTML, ui);
    if (!a._draft) a._draft = ui.init(rec && rec.choice);
    const draft = a._draft, box = el("div"), enabled = st === "open" || st === "free", follow = st !== "free";
    let note = follow ? deferNote(st, !!rec, "whole") : el("div", "defer-note", "📝 Làm xong toàn bộ rồi bấm Nộp bài — chỉ tính lần nộp đầu tiên, nộp xong xem kết quả ngay.");
    const setNote = (html, cls) => { const n2 = el("div", "defer-note " + (cls || st), html); note.replaceWith(n2); note = n2; };
    const btn = el("button", "btn", follow ? (rec ? "📤 Nộp lại" : "📤 Nộp bài") : "✅ Nộp bài & xem kết quả");
    let saveT = null, saved = !!rec;
    const submit = (auto) => {
      clearTimeout(saveT);
      const r = ui.score(draft);
      emit("onAttempt", { key, activityId: aid(a), ok: r.good === r.total, fraction: r.total ? r.good / r.total : 0, total: r.total, choice: r.choice });
      if (!follow) { if (r.good === r.total) celebrate(); sound(r.good === r.total ? "ok" : "no"); return render(); }
      saved = true; btn.textContent = "📤 Nộp lại";
      setNote(`✔ Đã ${auto ? "tự lưu" : "nộp"} lúc ${new Date().toLocaleTimeString("vi-VN")}. Có thể sửa đến khi thầy/cô kết thúc — mỗi lần sửa đều được tự lưu.`);
      if (!auto) sound("ok");
    };
    const refresh = () => { btn.disabled = !enabled || !ui.complete(draft); };
    const userChanged = () => { // HS vừa thao tác
      refresh(); if (!follow || !enabled) return;
      clearTimeout(saveT);
      if (ui.complete(draft)) saveT = setTimeout(() => submit(true), 700);
      else if (saved) setNote("⚠️ Còn mục chưa làm — bài đã lưu là bản làm đủ gần nhất. Làm đủ sẽ tự lưu lại.", "locked");
    };
    const redraw = () => { box.innerHTML = ""; ui.draw(box, draft, enabled, () => { redraw(); userChanged(); }, userChanged); refresh(); };
    btn.onclick = () => { if (!follow && !confirm("Nộp bài? Chỉ tính lần nộp đầu tiên.")) return; submit(false); };
    c.appendChild(box); redraw(); c.appendChild(note);
    if (enabled) c.appendChild(wrapEl(btn));
    view.appendChild(c);
  }
  // Xem lại bài của nhóm: từng mục ✓/✗ (mục sai có ghi đáp án đúng) + nút xem cả đáp án
  function showReview(c, a, rec, answerHTML, ui) {
    const ex = a.explanation ? `<div class="explain">${esc(a.explanation)}</div>` : "";
    if (!rec) {
      const fb = el("div", "feedback no"); fb.innerHTML = `⏳ Nhóm em chưa nộp bài này — tính là chưa hoàn thành.${ex}`;
      c.append(fb, el("p", "subtitle", "📖 Đáp án đúng:"), el("div", "locked-answer", answerHTML)); view.appendChild(c); return;
    }
    if (!ui.valid(rec.choice)) return showLocked(c, a, rec, answerHTML, true);
    const d = ui.init(rec.choice), r = ui.score(d), all = r.good === r.total;
    c.appendChild(el("p", "subtitle", "📋 Bài làm của nhóm em:"));
    c.appendChild(ui.review(d));
    const fb = el("div", "feedback " + (all ? "ok" : "no"));
    fb.innerHTML = `${all ? "🎉 Chính xác hoàn toàn!" : "📝 Nhóm em làm đúng"} <b>${r.good}/${r.total}</b> mục.${ex}`;
    c.appendChild(fb);
    if (!all) c.appendChild(revealBox("📖 Xem toàn bộ đáp án đúng", () => el("div", "locked-answer", answerHTML)));
    view.appendChild(c);
  }
  const PAIR_COLORS = ["#7c3aed", "#0ea5e9", "#f97316", "#16a34a", "#e11d48", "#ca8a04", "#0891b2", "#9333ea"];
  const badge = (i) => `<span class="pair-badge" style="background:${PAIR_COLORS[i % PAIR_COLORS.length]}">${i + 1}</span>`;
  const mark = (ok) => `<b class="rv-mark ${ok ? "ok" : "no"}">${ok ? "✓" : "✗"}</b>`;
  function matchingUI(a, pairs) {
    const rorder = a._rorder || (a._rorder = shuffle(pairs.slice()));
    const ui = {
      sel: null,
      valid: (ch) => !!(ch && ch.m),
      init: (ch) => { const d = {}; toArr(ch && ch.m).forEach((r, l) => { if (r != null && +r >= 0) d[l] = +r; }); return d; },
      complete: (d) => pairs.every((p) => d[p.i] != null),
      score: (d) => ({ good: pairs.filter((p) => d[p.i] === p.i).length, total: pairs.length, choice: { m: pairs.map((p) => (d[p.i] == null ? -1 : d[p.i])) } }),
      review(d) {
        const box = el("div", "rv-list");
        pairs.forEach((p) => { const r = d[p.i], ok = r === p.i; box.appendChild(el("div", "rv-row " + (ok ? "ok" : "no"), `<span class="rv-l">${esc(p.left)}</span><span class="rv-arrow">⟶</span><span>${r != null && pairs[r] ? esc(pairs[r].right) : "<i>(chưa ghép)</i>"}${ok ? "" : `<small class="rv-fix">Đúng: ${esc(p.right)}</small>`}</span>${mark(ok)}`)); });
        return box;
      },
      draw(box, d, en, redraw) {
        box.appendChild(el("p", "subtitle", "Bấm 1 ô bên trái rồi bấm ô tương ứng bên phải (cùng số = một cặp). Bấm lại ô bên phải để bỏ ghép."));
        const grid = el("div", "two-col"), Lc = el("div"), Rc = el("div");
        pairs.forEach((p) => { const has = d[p.i] != null; const ch = el("div", "chip" + (ui.sel === p.i ? " selected" : "") + (has ? " paired" : ""), (has ? badge(p.i) : "") + esc(p.left)); if (en) ch.onclick = () => { ui.sel = p.i; box.innerHTML = ""; ui.draw(box, d, en, redraw); }; Lc.appendChild(ch); });
        rorder.forEach((p) => {
          const owner = Object.keys(d).find((k) => d[k] === p.i);
          const ch = el("div", "chip" + (owner != null ? " paired" : ""), (owner != null ? badge(+owner) : "") + esc(p.right));
          if (en) ch.onclick = () => {
            if (ui.sel == null) { if (owner != null) { delete d[owner]; redraw(); } return; }
            Object.keys(d).forEach((k) => { if (d[k] === p.i) delete d[k]; });
            d[ui.sel] = p.i; ui.sel = null; redraw();
          };
          Rc.appendChild(ch);
        });
        grid.append(Lc, Rc); box.appendChild(grid);
      },
    };
    return ui;
  }
  function dragdropUI(a, all) {
    const porder = a._porder || (a._porder = shuffle(all.slice()));
    const groups = a.groups || [];
    const ui = {
      sel: null,
      valid: (ch) => !!(ch && ch.g),
      init: (ch) => { const g = toArr(ch && ch.g); return all.map((it) => (g[it.i] == null ? -1 : +g[it.i])); },
      complete: (d) => d.every((g) => g >= 0),
      score: (d) => ({ good: all.filter((it) => d[it.i] === it.group).length, total: all.length, choice: { g: d.slice() } }),
      review(d) {
        const zones = el("div", "two-col");
        groups.forEach((g, gi) => {
          const z = el("div", "dropzone", `<h3>${esc(g)}</h3>`);
          porder.filter((it) => d[it.i] === gi).forEach((it) => { const ok = it.group === gi; z.appendChild(el("div", "chip " + (ok ? "rv-ok" : "rv-no"), `${ok ? "✓" : "✗"} ${esc(it.text)}${ok ? "" : `<small class="rv-fix">→ đúng: ${esc(groups[it.group] || "?")}</small>`}`)); });
          zones.appendChild(z);
        });
        const miss = porder.filter((it) => !(d[it.i] >= 0));
        if (!miss.length) return zones;
        const w = el("div"); w.appendChild(el("div", "dropzone pool", `<h3>Chưa xếp</h3>${miss.map((it) => `<div class="chip rv-no">✗ ${esc(it.text)}<small class="rv-fix">→ đúng: ${esc(groups[it.group] || "?")}</small></div>`).join("")}`)); w.appendChild(zones); return w;
      },
      draw(box, d, en, redraw) {
        box.appendChild(el("p", "subtitle", "Bấm chọn một thẻ rồi bấm vào nhóm. Bấm \"Thẻ chưa xếp\" để đưa thẻ về lại."));
        const again = () => { box.innerHTML = ""; ui.draw(box, d, en, redraw); };
        const chip = (it) => { const ch = el("div", "chip" + (ui.sel === it.i ? " selected" : ""), esc(it.text)); if (en) ch.onclick = (e) => { e.stopPropagation(); ui.sel = it.i; again(); }; return ch; };
        const pool = el("div", "dropzone pool", "<h3>🗂️ Thẻ chưa xếp</h3>");
        porder.filter((it) => d[it.i] < 0).forEach((it) => pool.appendChild(chip(it)));
        if (en) pool.onclick = () => { if (ui.sel != null) { d[ui.sel] = -1; ui.sel = null; redraw(); } };
        const zones = el("div", "two-col");
        groups.forEach((g, gi) => {
          const z = el("div", "dropzone", `<h3>${esc(g)}</h3>`);
          porder.filter((it) => d[it.i] === gi).forEach((it) => z.appendChild(chip(it)));
          if (en) z.onclick = () => { if (ui.sel != null) { d[ui.sel] = gi; ui.sel = null; redraw(); } };
          zones.appendChild(z);
        });
        box.append(pool, zones);
      },
    };
    return ui;
  }
  function orderingUI(a) {
    const steps = a.steps || [];
    return {
      valid: (ch) => !!(ch && toArr(ch.o).length === steps.length),
      init: (ch) => { const o = toArr(ch && ch.o); return o.length === steps.length ? o.map(Number) : shuffle(steps.map((_, i) => i)); },
      complete: () => true,
      score: (d) => ({ good: d.filter((s, pos) => s === pos).length, total: steps.length, choice: { o: d.slice() } }),
      review(d) {
        const box = el("div", "rv-list");
        d.forEach((s, pos) => { const ok = s === pos; box.appendChild(el("div", "rv-row " + (ok ? "ok" : "no"), `<span class="rv-n">${pos + 1}</span><span>${esc(steps[s])}${ok ? "" : `<small class="rv-fix">Bước này đúng ra ở vị trí ${s + 1}</small>`}</span>${mark(ok)}`)); });
        return box;
      },
      draw(box, d, en, redraw) {
        box.appendChild(el("p", "subtitle", "Dùng ▲▼ để sắp đúng thứ tự rồi bấm Nộp bài."));
        const list = el("ul", "order-list");
        d.forEach((s, pos) => {
          const li = el("li", null, `<span>${esc(steps[s])}</span>`), up = el("button", null, "▲"), dn = el("button", null, "▼");
          up.disabled = !en || pos === 0; dn.disabled = !en || pos === d.length - 1;
          up.onclick = () => { [d[pos - 1], d[pos]] = [d[pos], d[pos - 1]]; redraw(); };
          dn.onclick = () => { [d[pos + 1], d[pos]] = [d[pos], d[pos + 1]]; redraw(); };
          const ctrl = el("span"); ctrl.append(up, dn); li.appendChild(ctrl); list.appendChild(li);
        });
        box.appendChild(list);
      },
    };
  }
  function fillblankUI(a, parts) {
    const n = parts.length - 1, good = (v, i) => (a.answers[i] || []).map(norm).includes(norm(v));
    return {
      valid: (ch) => !!(ch && ch.v),
      init: (ch) => { const v = toArr(ch && ch.v); return Array.from({ length: n }, (_, i) => v[i] || ""); },
      complete: (d) => d.every((v) => String(v).trim()),
      score: (d) => ({ good: d.filter(good).length, total: n, choice: { v: d.slice() } }),
      review(d) {
        const p = el("p", "prompt");
        p.innerHTML = parts.map((seg, i) => esc(seg.replace(/\s+/g, " ")) + (i < n ? (good(d[i], i) ? `<b class="fill-ok"> ${esc(d[i])} ✓</b>` : `<b class="fill-bad"> ${esc(d[i] || "…")} </b><b class="fill-ans">${esc((a.answers[i] || [""])[0])}</b>`) : "")).join("");
        return p;
      },
      draw(box, d, en, redraw, changed) {
        const p = el("p", "prompt");
        parts.forEach((seg, i) => { p.appendChild(document.createTextNode(seg.replace(/\s+/g, " "))); if (i < n) { const inp = el("input"); inp.value = d[i]; inp.disabled = !en; inp.oninput = () => { d[i] = inp.value; changed(); }; p.appendChild(inp); } });
        box.appendChild(p);
      },
    };
  }
  // Firebase có thể trả mảng dưới dạng object {0:..,1:..}
  function toArr(x) { if (Array.isArray(x)) return x; if (!x || typeof x !== "object") return []; const out = []; Object.keys(x).forEach((k) => { if (/^\d+$/.test(k)) out[+k] = x[k]; }); return out; }

  // ---- DRAG & DROP (phân loại) ------------------------------------------
  function renderDragDrop(a) {
    const c = el("div", "card"); activityHead(a, c);
    const key = aid(a) + ":main";
    const all = (a.items || []).map((it, i) => ({ ...it, i }));
    const answerHTML = `<div class="two-col">${(a.groups || []).map((g, gi) => `<div class="dropzone"><h3>${esc(g)}</h3>${all.filter(it => it.group === gi).map(it => `<div class="chip done">${esc(it.text)}</div>`).join("")}</div>`).join("")}</div>`;
    if (STUDENT) return renderWholeStudent(c, a, key, actStateOf(a), answerHTML, dragdropUI(a, all));
    c.appendChild(el("p", "subtitle", "Chọn một thẻ rồi bấm vào nhóm đúng."));
    const pool = el("div"); const zonesWrap = el("div", "two-col");
    const wrong = a._wrong || (a._wrong = new Set());
    let sel = null, placed = 0; const items = shuffle(all.slice());
    (a.groups || []).forEach((g, gi) => { const z = el("div", "dropzone"); z.innerHTML = `<h3>${esc(g)}</h3>`; z.onclick = () => { if (!sel) return; const correct = +sel.dataset.g === gi; if (correct) { sel.classList.add("done"); z.appendChild(sel); sel.classList.remove("selected"); sel = null; placed++; celebrate(); if (placed === items.length) finishDD(c, a, wrong, items.length); } else { wrong.add(sel.dataset.i); z.classList.add("shake"); sound("no"); setTimeout(() => z.classList.remove("shake"), 400); } }; zonesWrap.appendChild(z); });
    items.forEach((it) => { const ch = el("div", "chip", esc(it.text)); ch.dataset.g = it.group; ch.dataset.i = it.i; ch.onclick = () => { if (ch.classList.contains("done")) return; [...pool.children].forEach(x => x.classList.remove("selected")); ch.classList.add("selected"); sel = ch; }; pool.appendChild(ch); });
    c.append(pool, zonesWrap); view.appendChild(c);
  }
  function finishDD(c, a, wrong, total) { state.score += S.basePoints; setScore(); finishMulti(c, a, wrong, total, "✓ Phân loại xong!"); }

  // ---- ORDERING ----------------------------------------------------------
  function renderOrdering(a) {
    const c = el("div", "card"); activityHead(a, c);
    const key = aid(a) + ":main";
    const answerHTML = `<ol class="lead">${(a.steps || []).map(s => `<li>${esc(s)}</li>`).join("")}</ol>`;
    if (STUDENT) return renderWholeStudent(c, a, key, actStateOf(a), answerHTML, orderingUI(a));
    c.appendChild(el("p", "subtitle", "Dùng ▲▼ để sắp đúng thứ tự rồi bấm Kiểm tra."));
    let order = (a.steps || []).map((s, i) => ({ s, i })); order = shuffle(order.slice());
    const list = el("ul", "order-list");
    function draw() { list.innerHTML = ""; order.forEach((o, pos) => { const li = el("li"); li.innerHTML = `<span>${esc(o.s)}</span>`; const up = el("button", null, "▲"), dn = el("button", null, "▼"); up.onclick = () => { if (pos > 0) { [order[pos - 1], order[pos]] = [order[pos], order[pos - 1]]; draw(); } }; dn.onclick = () => { if (pos < order.length - 1) { [order[pos + 1], order[pos]] = [order[pos], order[pos + 1]]; draw(); } }; const ctrl = el("span"); ctrl.append(up, dn); li.appendChild(ctrl); list.appendChild(li); }); }
    draw(); c.appendChild(list);
    const btn = el("button", "btn", "Kiểm tra");
    btn.onclick = () => {
      const ok = order.every((o, i) => o.i === i);
      if (ok) { state.score += S.basePoints; setScore(); btn.disabled = true; celebrate(); } else c.classList.add("shake"), setTimeout(() => c.classList.remove("shake"), 500); const fb = el("div", "feedback " + (ok ? "ok" : "no")); fb.innerHTML = `${ok ? "🎉 Đúng thứ tự!" : "❌ Chưa đúng, thử lại nhé."}<div class="explain">${esc(a.explanation || "")}</div>`; c.appendChild(fb); sound(ok ? "ok" : "no");
    };
    c.appendChild(wrapEl(btn)); view.appendChild(c);
  }

  // ---- FILL BLANK --------------------------------------------------------
  function renderFillBlank(a) {
    const c = el("div", "card fill"); activityHead(a, c);
    const key = aid(a) + ":main";
    const parts = (a.text || "").split("{{}}");
    const answerHTML = `<p class="prompt">${parts.map((seg, i) => esc(seg.replace(/\s+/g, " ")) + (i < parts.length - 1 ? `<b class="fill-ans"> ${esc((a.answers[i] || [""])[0])} </b>` : "")).join("")}</p>`;
    if (STUDENT) return renderWholeStudent(c, a, key, actStateOf(a), answerHTML, fillblankUI(a, parts));
    const p = el("p", "prompt");
    const inputs = [];
    parts.forEach((seg, i) => { p.appendChild(document.createTextNode(seg.replace(/\s+/g, " "))); if (i < parts.length - 1) { const inp = el("input"); inputs.push(inp); p.appendChild(inp); } });
    c.appendChild(p);
    const btn = el("button", "btn", "Kiểm tra");
    btn.onclick = () => {
      let good = 0; inputs.forEach((inp, i) => { const accepts = (a.answers[i] || []).map(norm); const g = accepts.includes(norm(inp.value)); inp.style.borderColor = g ? "var(--correct)" : "var(--wrong)"; if (g) good++; });
      const ok = good === inputs.length;
      if (ok) { state.score += S.basePoints; setScore(); btn.disabled = true; celebrate(); } const fb = el("div", "feedback " + (ok ? "ok" : "no")); fb.innerHTML = `${ok ? "🎉 Chính xác!" : "❌ Chưa đúng."}<div class="explain">${esc(a.explanation || "")}</div>`; c.appendChild(fb); sound(ok ? "ok" : "no");
    };
    c.appendChild(wrapEl(btn)); view.appendChild(c);
  }
  const norm = (s) => String(s || "").trim().toLowerCase().replace(/\s+/g, " ");

  // ---- CÂU HỎI BẢNG TÍNH MÔ PHỎNG (question.type = "sheet") ---------------------
  //  mode "select" (mặc định): HS bấm ô / kéo chọn vùng / bấm tên cột, hàng -> lựa chọn = địa chỉ.
  //  mode "type": vùng q.highlight được tô sẵn trên lưới, HS gõ địa chỉ của vùng đó.
  //  answer: "B6" | "B4:E11" | "D" (cả cột) | "6" (cả hàng) | mảng nhiều đáp án chấp nhận.
  // mode "formula": HS GÕ CÔNG THỨC vào ô q.target ("E4" hoặc vùng "E4:E6" — nhập ô đầu rồi sao chép xuống);
  //   answer: công thức đúng cho ô đầu ("=C4*D4"); chấm bằng cách thử đổi dữ liệu (=D4*C4 đúng, =25*10 sai).
  function formulaParts(card, a, q) {
    const spec = q.sheet || a.sheet || {}, R = addrRect(q.target, 26, 60), targets = [];
    for (let r = R.r1; r <= R.r2; r++) for (let c = R.c1; c <= R.c2; c++) targets.push({ ad: colName(c) + r, dr: r - R.r1, dc: c - R.c1 });
    const store = q._store || (q._store = {});
    const P = { input: null, onChange: null };
    const sh = mountSheet(spec, { editable: true, only: targets.map((t) => t.ad), store, onChange: () => { if (P.onChange) P.onChange(); } });
    sh.mark(q.target, "m-target");
    card.appendChild(sh.el);
    card.appendChild(el("p", "xs-hint", `✍️ Chọn ô <b>${esc(normAddr(q.target).split(":")[0])}</b> (tô vàng) rồi gõ công thức, bắt đầu bằng dấu <b>=</b>, nhấn Enter.` + (targets.length > 1 ? ` Sau đó sao chép công thức (<b>Ctrl+C</b> → chọn ${esc(targets[1].ad)}:${esc(targets[targets.length - 1].ad)} → <b>Ctrl+V</b>, hoặc nút 📋 / 📥).` : "")));
    Object.assign(P, {
      sh,
      choice: () => { const v = targets.map((t) => String(store[t.ad] || "").trim()); return v.every((x) => x) ? v.join("|") : ""; },
      set: (ch) => { if (ch == null) return; String(ch).split("|").forEach((fm, i) => { if (targets[i]) store[targets[i].ad] = fm; }); sh.repaint(); },
      result(ch) {
        sh.lock(); const ok = judgeLocal(q, ch);
        sh.mark(q.target, ok ? "m-ok" : "m-no");
        if (!ok) card.appendChild(el("div", "xs-expect", "📖 Đáp án: " + targets.map((t) => `<b>${t.ad}</b>: ${esc(FX.shift(q.answer, t.dr, t.dc))}`).join(" · ")));
        return ok;
      },
    });
    return P;
  }
  function sheetParts(card, a, q) {
    if (q.mode === "formula") return formulaParts(card, a, q);
    const typeMode = q.mode === "type";
    const sh = mountSheet(q.sheet || a.sheet || {}, { select: !typeMode, highlight: typeMode ? q.highlight : null });
    card.appendChild(sh.el);
    let input = null;
    if (typeMode) { const row = el("div", "xs-answer", "<label>✍️ Địa chỉ:</label>"); input = el("input"); input.placeholder = "VD: A1:C5"; input.autocomplete = "off"; input.spellcheck = false; row.appendChild(input); card.appendChild(row); }
    const firstAns = Array.isArray(q.answer) ? q.answer[0] : q.answer;
    return {
      sh, input,
      choice: () => (typeMode ? input.value.trim().toUpperCase() : sh.selection()),
      set: (ch) => { if (ch == null) return; if (typeMode) input.value = ch; else sh.select(ch); },
      result(ch) { // khóa lưới; tô lựa chọn (xanh đúng / đỏ sai) và vùng đáp án đúng
        sh.lock(); if (input) input.disabled = true;
        const ok = judgeLocal(q, ch);
        if (!typeMode && ch) sh.mark(ch, ok ? "m-ok" : "m-no");
        if (!ok && !typeMode) sh.mark(firstAns, "m-ans");
        if (input) { input.classList.add(ok ? "ok" : "no"); if (!ok) input.insertAdjacentHTML("afterend", ` <b class="fill-ans">Đáp án: ${esc(normAddr(firstAns))}</b>`); }
        return ok;
      },
    };
  }
  function sheetQuestionFree(card, a, q, answered) {
    const P = sheetParts(card, a, q), showCh = !q.mode || q.mode === "select";
    const btn = el("button", "btn", "✅ Kiểm tra"); btn.disabled = true;
    const upd = () => { const ch = P.choice(); btn.disabled = answered.done || !ch; btn.textContent = ch && showCh ? "✅ Kiểm tra: " + ch : "✅ Kiểm tra"; };
    if (q.mode === "formula") P.onChange = upd; else P.sh.onSelect(upd);
    if (P.input) { P.input.oninput = upd; P.input.onkeydown = (e) => { if (e.key === "Enter" && !btn.disabled) btn.click(); }; }
    btn.onclick = () => { if (answered.done) return; const ch = P.choice(); if (!ch) return; answered.done = true; btn.disabled = true; afterAnswer(P.result(ch), q, card, ch); };
    card.appendChild(wrapEl(btn));
    if (q.hint) card.appendChild(revealBox("💡 Gợi ý", () => el("div", "hint-box", "💡 " + esc(q.hint))));
    card._answered = answered; card._q = q;
    const done = ask("getAttempt", card._key);
    if (done) { answered.done = true; btn.disabled = true; P.set(done.choice); answerFeedback(P.result(done.choice), q, card, true); }
    else if (state.showAnswers && q.mode !== "formula") P.sh.mark(Array.isArray(q.answer) ? q.answer[0] : q.answer, "m-ans");
    else if (state.showAnswers) card.appendChild(el("div", "xs-expect", "📖 Đáp án (ô đầu): " + esc(q.answer)));
    upd();
  }
  function sheetQuestionDeferred(card, a, qs, q, key, rec, st) {
    const P = sheetParts(card, a, q);
    if (st === "revealed") {
      if (rec && rec.choice != null) { P.set(rec.choice); answerFeedback(P.result(rec.choice), q, card, true); }
      else { P.result(null); const fb = el("div", "feedback no"); fb.innerHTML = `⏳ Nhóm em chưa trả lời câu này.<div class="explain">${esc(q.explanation || "")}</div>`; card.appendChild(fb); quizNav(card, a, qs); }
      return;
    }
    if (rec) P.set(rec.choice);
    let note = deferNote(st, !!rec, "sheet");
    const send = (ch) => {
      if (!ch) return;
      const ok = judgeLocal(q, ch);
      emit("onAttempt", { key, activityId: aid(a._parent || a), ok, fraction: ok ? 1 : 0, choice: ch });
      const n2 = deferNote(st, true, "sheet"); note.replaceWith(n2); note = n2;
      const pill = card.querySelector(".q-pill.cur"); if (pill) pill.classList.add("done");
    };
    if (st === "open") {
      if (q.mode === "formula") { let t = null; P.onChange = () => { clearTimeout(t); t = setTimeout(() => send(P.choice()), 600); }; } // gõ xong công thức là ghi nhận
      else P.sh.onSelect(send); // mỗi lần chọn xong là ghi nhận (chọn lại được đến khi GV kết thúc)
      if (P.input) { let t = null; P.input.oninput = () => { clearTimeout(t); t = setTimeout(() => send(P.choice()), 700); }; P.input.onchange = () => { clearTimeout(t); send(P.choice()); }; }
    } else { P.sh.lock(); if (P.input) P.input.disabled = true; }
    card.appendChild(note);
    if (q.hint && st === "open") card.appendChild(revealBox("💡 Gợi ý", () => el("div", "hint-box", "💡 " + esc(q.hint))));
    quizNav(card, a, qs);
  }
  // ---- CÂU TRẢ LỜI NGẮN (question.type = "short"): HS gõ một từ / cụm từ; answer: "TAIKHOAN" | ["…", "…"] ----
  function shortParts(card, q) {
    const row = el("div", "xs-answer short-answer", "<label>✍️ Trả lời:</label>"), input = el("input");
    input.placeholder = q.placeholder || "Gõ câu trả lời…"; input.autocomplete = "off"; input.spellcheck = false; row.appendChild(input); card.appendChild(row);
    return {
      input, choice: () => input.value.trim(), set: (ch) => { if (ch != null) input.value = ch; },
      result(ch) { input.disabled = true; const ok = shortMatch(q.answer, ch); input.classList.add(ok ? "ok" : "no"); if (!ok) row.insertAdjacentHTML("beforeend", ` <b class="fill-ans">Đáp án: ${esc(firstOf(q.answer))}</b>`); return ok; },
    };
  }
  function shortQuestionFree(card, a, q, answered) {
    const P = shortParts(card, q), btn = el("button", "btn", "✅ Kiểm tra"); btn.disabled = true;
    P.input.oninput = () => { btn.disabled = answered.done || !P.choice(); };
    P.input.onkeydown = (e) => { if (e.key === "Enter" && !e.isComposing && !btn.disabled) btn.click(); };
    btn.onclick = () => { if (answered.done || !P.choice()) return; answered.done = true; btn.disabled = true; const ch = P.choice(); afterAnswer(P.result(ch), q, card, ch); };
    card.appendChild(wrapEl(btn));
    if (q.hint) card.appendChild(revealBox("💡 Gợi ý", () => el("div", "hint-box", "💡 " + esc(q.hint))));
    card._answered = answered; card._q = q;
    const done = ask("getAttempt", card._key);
    if (done) { answered.done = true; btn.disabled = true; P.set(done.choice); answerFeedback(P.result(done.choice), q, card, true); }
    else if (state.showAnswers) card.appendChild(el("div", "xs-expect", "📖 Đáp án: " + esc(firstOf(q.answer))));
  }
  function shortQuestionDeferred(card, a, qs, q, key, rec, st) {
    const P = shortParts(card, q);
    if (st === "revealed") {
      if (rec && rec.choice != null) { P.set(rec.choice); answerFeedback(P.result(rec.choice), q, card, true); }
      else { P.result(""); const fb = el("div", "feedback no"); fb.innerHTML = `⏳ Nhóm em chưa trả lời câu này.<div class="explain">${esc(q.explanation || "")}</div>`; card.appendChild(fb); quizNav(card, a, qs); }
      return;
    }
    if (rec) P.set(rec.choice);
    let note = deferNote(st, !!rec, "short"), last = rec ? rec.choice : null;
    const send = () => {
      const ch = P.choice(); if (!ch || ch === last) return; last = ch;
      emit("onAttempt", { key, activityId: aid(a._parent || a), ok: shortMatch(q.answer, ch), fraction: shortMatch(q.answer, ch) ? 1 : 0, choice: ch });
      const n2 = deferNote(st, true, "short"); note.replaceWith(n2); note = n2;
      const pill = card.querySelector(".q-pill.cur"); if (pill) pill.classList.add("done");
      if (card._cw) card._cw();
    };
    if (st === "open") { let t = null; P.input.oninput = () => { clearTimeout(t); t = setTimeout(send, 900); }; P.input.onchange = () => { clearTimeout(t); send(); }; P.input.onkeydown = (e) => { if (e.key === "Enter" && !e.isComposing) { clearTimeout(t); send(); } }; }
    else P.input.disabled = true;
    card.appendChild(note);
    if (q.hint && st === "open") card.appendChild(revealBox("💡 Gợi ý", () => el("div", "hint-box", "💡 " + esc(q.hint))));
    quizNav(card, a, qs);
  }

  // ---- TRÒ CHƠI Ô CHỮ (type "crossword") — mỗi hàng ngang là 1 câu "short"; câu có keyword: true là từ khoá hàng dọc ----
  //  questions: [{ type: "short", question, answer: "TAIKHOAN", key: 0 (vị trí chữ nằm ở cột từ khoá), show: [3] (chữ gợi ý hiện sẵn) }, …,
  //              { type: "short", keyword: true, question: "Từ khoá hàng dọc là gì?", answer: "THUDIENTU" }]
  //  Màn chiếu: bấm số hàng để chọn câu; trả lời đúng thì hàng lật chữ; chế độ GV "Hiện đáp án" lật cả ô chữ.
  function cwState(a, i) { // null | "sent" (theo nhịp, chưa công bố) | true | false
    const q = a.questions[i];
    if (STUDENT) { const r = ask("getAttempt", qKey(a, i)); if (!r) return null; const st = actStateOf(a); return st === "open" || st === "locked" ? "sent" : judgeLocal(q, r.choice); }
    return a._res && i in a._res ? a._res[i] : null;
  }
  function renderCrossword(a) {
    ensureEngineCSS();
    const qs = a.questions || [], rows = qs.map((q, i) => ({ q, i })).filter((x) => !x.q.keyword), kwI = qs.findIndex((q) => q.keyword);
    const c = el("div", "card cw-card"); activityHead(a, c);
    if (a.intro) c.appendChild(el("p", "subtitle", esc(a.intro)));
    const grid = el("div", "cw-grid"); c.appendChild(grid);
    const maxK = Math.max(0, ...rows.map((r) => r.q.key || 0));
    const W = Math.max(1, ...rows.map((r) => maxK - (r.q.key || 0) + normShort(firstOf(r.q.answer)).length));
    const draw = () => {
      const all = state.showAnswers || (STUDENT && actStateOf(a) === "revealed"), kw = kwI >= 0 ? cwState(a, kwI) : null, kwOpen = kw === true || all;
      grid.style.setProperty("--cw-cols", W);
      grid.innerHTML = rows.map(({ q, i }, n) => {
        const word = normShort(firstOf(q.answer)), off = maxK - (q.key || 0), s = cwState(a, i);
        let h = `<button type="button" class="cw-num${i === a._qi ? " cur" : ""}${s === "sent" ? " sent" : s === true ? " ok" : s === false ? " no" : ""}" data-i="${i}" title="Câu ${n + 1}">${n + 1}</button><div class="cw-row">`;
        for (let k = 0; k < W; k++) {
          const j = k - off;
          if (j < 0 || j >= word.length) { h += `<span class="cw-gap"></span>`; continue; }
          const isKey = j === (q.key || 0), given = (q.show || []).includes(j), solved = s === true || given || (isKey && kw === true);
          h += `<span class="cw-cell${isKey ? " key" : ""}${!solved && all ? " rev" : ""}${s === true ? " ok" : ""}">${solved || all ? word[j] : ""}</span>`;
        }
        return h + `</div>`;
      }).join("") + (kwI >= 0 ? `<button type="button" class="cw-kw${kw === true ? " ok" : ""}${a._qi === kwI ? " cur" : ""}" data-i="${kwI}">🔑 Từ khoá hàng dọc: <b>${kwOpen ? esc(firstOf(qs[kwI].answer)) : rows.map(() => "?").join(" ")}</b></button>` : "");
      grid.querySelectorAll("[data-i]").forEach((b) => { b.onclick = () => { a._qi = +b.dataset.i; render(); }; });
    };
    c._cw = draw; view.appendChild(c);
    renderQuizInto(c, a); draw(); // vẽ sau khi biết câu hiện tại (a._qi)
  }

  // Bảng tính thử tự do (activity.sandbox): gõ dữ liệu, xem tự căn trái/phải, Delete để xóa
  function sandboxBox(a) {
    const spec = a.sandbox, box = el("div", "sandbox");
    box.appendChild(el("p", "subtitle", spec.intro || "🧪 Thử ngay: chọn ô rồi gõ (hoặc nháy đúp) để nhập, Enter để kết thúc; chọn vùng rồi nhấn Delete để xóa."));
    box.appendChild(mountSheet(spec, { editable: true, store: a._sandbox || (a._sandbox = {}) }).el);
    return box;
  }

  // ---- BẢNG TÍNH MÔ PHỎNG (giao diện giống Excel) --------------------------------
  // spec: { title, cols, rows, cells:{"B2":"Nội dung"}, widths:{B:3} (tỉ lệ), bold/italic/center/right/left:[địa chỉ…],
  //         fill:{"A3:C3":"#fde047"}, color:{"A1":"#16a34a"}, size:{"A1":16} (cỡ chữ), sheets:["Sheet1","Sheet2"], editable }
  // opts: { select, editable, highlight, store }  ->  { el, selection(), select(addr), lock(), mark(addr, cls), onSelect(fn) }
  function cellType(v) {
    const s = String(v == null ? "" : v).trim();
    if (!s) return "";
    if (/^[-+]?(\d{1,3}(,\d{3})+|\d+)(\.\d+)?%?$/.test(s)) return "num";
    const m = s.match(/^(\d{1,2})\/(\d{1,2})(?:\/(\d{2}|\d{4}))?$/); // kiểu Anh–Mỹ: tháng/ngày/năm
    if (m) { const mo = +m[1], d = +m[2], y = m[3] ? +m[3] : 2024, feb = y % 4 === 0 && (y % 100 !== 0 || y % 400 === 0) ? 29 : 28; if (mo >= 1 && mo <= 12 && d >= 1 && d <= [31, feb, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][mo - 1]) return "date"; }
    return "text";
  }
  function mountSheet(spec, opts) {
    ensureEngineCSS(); spec = spec || {}; opts = opts || {};
    const cols = Math.max(1, Math.min(26, spec.cols || 8)), rows = Math.max(1, Math.min(60, spec.rows || 12));
    const editable = !!(opts.editable || spec.editable), selectable = editable || !!opts.select;
    const only = opts.only ? new Set(opts.only) : null, canEdit = (ad) => !only || only.has(ad); // câu gõ công thức: chỉ sửa ô đích
    const changed = () => { if (opts.onChange) opts.onChange(); };
    const clamp = (x, lo, hi) => Math.max(lo, Math.min(hi, x));
    const data = opts.store || {};
    if (!data.__init) { Object.entries(spec.cells || {}).forEach(([k, v]) => { if (v != null && v !== "") data[normAddr(k)] = String(v); }); Object.defineProperty(data, "__init", { value: true }); }
    const style = {};
    const each = (list, fn) => (Array.isArray(list) ? list : list ? [list] : []).forEach((ad) => { const R = addrRect(ad, cols, rows); if (!R) return; for (let r = R.r1; r <= Math.min(R.r2, rows); r++) for (let c = R.c1; c <= Math.min(R.c2, cols - 1); c++) fn(style[colName(c) + r] = style[colName(c) + r] || {}); });
    each(spec.bold, (s) => { s.b = 1; }); each(spec.italic, (s) => { s.i = 1; });
    each(spec.center, (s) => { s.al = "center"; }); each(spec.right, (s) => { s.al = "right"; }); each(spec.left, (s) => { s.al = "left"; });
    Object.entries(spec.fill || {}).forEach(([ad, v]) => each(ad, (s) => { s.fill = v; }));
    Object.entries(spec.color || {}).forEach(([ad, v]) => each(ad, (s) => { s.color = v; }));
    Object.entries(spec.size || {}).forEach(([ad, v]) => each(ad, (s) => { s.size = v; }));
    const W = []; let tw = 0.55; for (let c = 0; c < cols; c++) { W[c] = +((spec.widths || {})[colName(c)]) || 1; tw += W[c]; }
    const root = el("div", "xsheet" + (editable ? " editable" : "") + (selectable ? " selectable" : ""));
    let body = "";
    for (let r = 1; r <= rows; r++) { body += `<tr><th data-row="${r}">${r}</th>`; for (let c = 0; c < cols; c++) body += `<td data-c="${c}" data-r="${r}"></td>`; body += "</tr>"; }
    root.innerHTML = (spec.title ? `<div class="xs-title">📗 ${esc(spec.title)}</div>` : "")
      + `<div class="xs-bar"><div class="xs-name" title="Hộp địa chỉ: địa chỉ ô hiện thời"></div><span class="xs-fx">fx</span><input class="xs-formula" title="Vùng nhập dữ liệu" ${editable ? "" : "readonly tabindex='-1'"}></div>`
      + `<div class="xs-gridwrap"><table class="xs-grid"><colgroup><col style="width:${0.55 / tw * 100}%">${W.map((w) => `<col style="width:${w / tw * 100}%">`).join("")}</colgroup>`
      + `<thead><tr><th class="xs-corner"></th>${W.map((_, c) => `<th data-col="${c}">${colName(c)}</th>`).join("")}</tr></thead><tbody>${body}</tbody></table></div>`
      + `<div class="xs-foot"><div class="xs-tabs">${(spec.sheets || ["Sheet1"]).map((n, i) => `<span class="xs-tab${i ? "" : " on"}">${esc(n)}</span>`).join("")}</div>`
      + (editable ? `<button type="button" class="xs-tool" data-tool="edit">✏️ Nhập vào ô</button><button type="button" class="xs-tool" data-tool="copy">📋 Sao chép</button><button type="button" class="xs-tool" data-tool="paste">📥 Dán</button><button type="button" class="xs-tool" data-tool="del">🧽 Xóa vùng chọn</button>` : "") + `</div><div class="xs-selinfo"></div>`;
    const grid = root.querySelector(".xs-grid"), nameBox = root.querySelector(".xs-name"), fx = root.querySelector(".xs-formula"), info = root.querySelector(".xs-selinfo");
    const tds = {}, hcol = [], hrow = [];
    grid.querySelectorAll("td").forEach((t) => { tds[colName(+t.dataset.c) + t.dataset.r] = t; });
    grid.querySelectorAll("th[data-col]").forEach((t) => { hcol[+t.dataset.col] = t; });
    grid.querySelectorAll("th[data-row]").forEach((t) => { hrow[+t.dataset.row] = t; });
    const td = (c, r) => tds[colName(c) + r];
    function paintCell(c, r) {
      const t = td(c, r); if (!t) return;
      const ad = colName(c) + r, raw = data[ad], s = style[ad] || {};
      const v = String(raw == null ? "" : raw).charAt(0) === "=" ? String(FX.fmt(FX.evalCell(data, ad))) : raw; // công thức -> hiện KẾT QUẢ
      const ty = cellType(v), err = String(v || "").charAt(0) === "#";
      if (!(editing && editing.ad === ad)) t.textContent = v || "";
      t.classList.toggle("num", !s.al && (ty === "num" || ty === "date"));
      t.classList.toggle("err", err);
      t.style.textAlign = s.al || ""; t.style.fontWeight = s.b ? "700" : ""; t.style.fontStyle = s.i ? "italic" : "";
      t.style.backgroundColor = s.fill || ""; t.style.color = s.color || ""; t.style.fontSize = s.size ? (s.size / 11).toFixed(2) + "em" : "";
      t.classList.toggle("clip", c < cols - 1 && !!data[colName(c + 1) + r]); // chữ tràn sang ô trống bên phải như Excel
    }
    const paintAll = () => { for (let r = 1; r <= rows; r++) for (let c = 0; c < cols; c++) paintCell(c, r); };
    let sel = null, locked = false, drag = false, cb = null, editing = null;
    const rectOf = (S) => (S.m === "cols" ? { c1: Math.min(S.a.c, S.f.c), c2: Math.max(S.a.c, S.f.c), r1: 1, r2: rows }
      : S.m === "rows" ? { c1: 0, c2: cols - 1, r1: Math.min(S.a.r, S.f.r), r2: Math.max(S.a.r, S.f.r) }
      : { c1: Math.min(S.a.c, S.f.c), c2: Math.max(S.a.c, S.f.c), r1: Math.min(S.a.r, S.f.r), r2: Math.max(S.a.r, S.f.r) });
    const addrOf = (S) => { const R = rectOf(S); return S.m === "cols" ? colName(R.c1) + ":" + colName(R.c2) : S.m === "rows" ? R.r1 + ":" + R.r2 : normAddr(colName(R.c1) + R.r1 + ":" + colName(R.c2) + R.r2); };
    const activeOf = (S) => (S.m === "cols" ? { c: S.a.c, r: 1 } : S.m === "rows" ? { c: 0, r: S.a.r } : S.a);
    function paint() {
      root.querySelectorAll(".sel,.act,.hsel").forEach((x) => x.classList.remove("sel", "act", "hsel"));
      if (!sel) { nameBox.textContent = ""; if (document.activeElement !== fx) fx.value = ""; info.innerHTML = selectable ? "👆 Bấm vào một ô · kéo chuột để chọn vùng · bấm tên cột / tên hàng để chọn cả cột / hàng." : ""; return; }
      const R = rectOf(sel), act = activeOf(sel), multi = R.c1 !== R.c2 || R.r1 !== R.r2, aAddr = colName(act.c) + act.r;
      if (multi) for (let r = R.r1; r <= R.r2; r++) for (let c = R.c1; c <= R.c2; c++) td(c, r).classList.add("sel");
      td(act.c, act.r).classList.add("act");
      for (let c = R.c1; c <= R.c2; c++) hcol[c].classList.add("hsel");
      for (let r = R.r1; r <= R.r2; r++) hrow[r].classList.add("hsel");
      nameBox.textContent = aAddr;
      if (document.activeElement !== fx) fx.value = data[aAddr] || "";
      info.innerHTML = sel.m === "cols" ? `Đang chọn: <b>cột ${R.c1 === R.c2 ? colName(R.c1) : colName(R.c1) + " → " + colName(R.c2)}</b>`
        : sel.m === "rows" ? `Đang chọn: <b>hàng ${R.r1 === R.r2 ? R.r1 : R.r1 + " → " + R.r2}</b>`
        : multi ? `Vùng đang chọn: <b>${addrOf(sel)}</b> · ô hiện thời: <b>${aAddr}</b>` : `Ô đang chọn: <b>${aAddr}</b>`;
    }
    const hitCell = (x, y) => { const t = document.elementFromPoint(x, y); return t && grid.contains(t) ? t.closest("td,th") : null; };
    grid.addEventListener("pointerdown", (e) => {
      if (locked || !selectable || e.button > 0) return;
      const t = e.target.closest("td,th"); if (!t || t.classList.contains("xs-corner")) return;
      if (editing) { if (editing.td === t) return; commitEdit(); }
      e.preventDefault();
      const ext = e.shiftKey && sel;
      if (t.dataset.col != null) { const c = +t.dataset.col; sel = ext && sel.m === "cols" ? { ...sel, f: { c, r: 1 } } : { a: { c, r: 1 }, f: { c, r: 1 }, m: "cols" }; }
      else if (t.dataset.row != null) { const r = +t.dataset.row; sel = ext && sel.m === "rows" ? { ...sel, f: { c: 0, r } } : { a: { c: 0, r }, f: { c: 0, r }, m: "rows" }; }
      else { const c = +t.dataset.c, r = +t.dataset.r; sel = ext && sel.m === "cells" ? { ...sel, f: { c, r } } : { a: { c, r }, f: { c, r }, m: "cells" }; }
      drag = true; try { grid.setPointerCapture(e.pointerId); } catch (x) { /* bỏ qua */ }
      paint();
    });
    grid.addEventListener("pointermove", (e) => {
      if (!drag || !sel) return;
      const t = hitCell(e.clientX, e.clientY); if (!t) return;
      const c = t.dataset.col != null ? +t.dataset.col : t.dataset.c != null ? +t.dataset.c : null;
      const r = t.dataset.row != null ? +t.dataset.row : t.dataset.r != null ? +t.dataset.r : null;
      if (sel.m === "cols") { if (c != null && c !== sel.f.c) { sel.f = { c, r: 1 }; paint(); } }
      else if (sel.m === "rows") { if (r != null && r !== sel.f.r) { sel.f = { c: 0, r }; paint(); } }
      else if (t.dataset.c != null && (c !== sel.f.c || r !== sel.f.r)) { sel.f = { c, r }; paint(); }
    });
    const up = () => { if (!drag) return; drag = false; if (editable) focusFx(); if (cb && sel) cb(addrOf(sel)); };
    grid.addEventListener("pointerup", up); grid.addEventListener("pointercancel", up);

    // ---- nhập / sửa / xóa dữ liệu (bảng tính thử) ----
    const setVal = (ad, v) => { if (!canEdit(ad)) return; v = String(v == null ? "" : v); if (v.trim() === "") delete data[ad]; else data[ad] = v; };
    const repaintRow = () => paintAll(); // công thức phụ thuộc ô khác -> vẽ lại cả bảng (tính toán tự động)
    // ---- sao chép / dán (công thức tự dời địa chỉ, giữ vị trí tương đối) ----
    let clip = null;
    function copySel() {
      if (!sel || sel.m !== "cells") return;
      const R = rectOf(sel); clip = Object.assign({ v: [] }, R);
      root.querySelectorAll(".copied").forEach((x) => x.classList.remove("copied"));
      for (let r = R.r1; r <= R.r2; r++) for (let c = R.c1; c <= R.c2; c++) { clip.v.push({ dr: r - R.r1, dc: c - R.c1, raw: data[colName(c) + r] }); td(c, r).classList.add("copied"); }
      info.innerHTML = "📋 Đã sao chép <b>" + addrOf(sel) + "</b> — chọn ô / vùng đích rồi nhấn <b>Ctrl+V</b> (hoặc 📥 Dán).";
    }
    function pasteSel() {
      if (!clip || !sel || locked || sel.m !== "cells") return;
      const R = rectOf(sel), single = clip.v.length === 1, list = [];
      if (single) { for (let r = R.r1; r <= R.r2; r++) for (let c = R.c1; c <= R.c2; c++) list.push({ c, r, x: clip.v[0] }); }
      else clip.v.forEach((x) => list.push({ c: R.c1 + x.dc, r: R.r1 + x.dr, x }));
      list.forEach(({ c, r, x }) => {
        if (c >= cols || r > rows) return;
        let v = x.raw == null ? "" : String(x.raw);
        if (v.charAt(0) === "=") v = FX.shift(v, r - (clip.r1 + x.dr), c - (clip.c1 + x.dc));
        setVal(colName(c) + r, v);
      });
      paintAll(); paint(); changed();
      info.innerHTML = "📥 Đã dán vào <b>" + addrOf(sel) + "</b>" + (clip.v.some((x) => String(x.raw || "").charAt(0) === "=") ? " — địa chỉ trong công thức đã tự điều chỉnh." : ".");
    }
    function move(dc, dr) { const a0 = activeOf(sel || { a: { c: 0, r: 1 }, m: "cells" }); const c = clamp(a0.c + dc, 0, cols - 1), r = clamp(a0.r + dr, 1, rows); sel = { a: { c, r }, f: { c, r }, m: "cells" }; paint(); }
    function startEdit(initial) {
      if (!editable || locked) return;
      if (!sel) sel = { a: { c: 0, r: 1 }, f: { c: 0, r: 1 }, m: "cells" };
      const act = activeOf(sel); sel = { a: act, f: act, m: "cells" }; paint();
      const t = td(act.c, act.r), ad = colName(act.c) + act.r, inp = el("input", "xs-edit");
      if (!canEdit(ad)) { info.innerHTML = "🔒 Chỉ nhập vào ô được tô vàng."; return; }
      inp.value = initial != null ? initial : data[ad] || ""; t.appendChild(inp); inp.focus();
      editing = { c: act.c, r: act.r, ad, td: t, input: inp };
      inp.onkeydown = (e) => { e.stopPropagation(); if (e.key === "Enter") { e.preventDefault(); commitEdit(true); move(0, 1); focusFx(); } else if (e.key === "Escape") cancelEdit(); else if (e.key === "Tab") { e.preventDefault(); commitEdit(true); move(1, 0); focusFx(); } };
      inp.oninput = () => { fx.value = inp.value; };
      inp.onblur = () => { if (editing && editing.input === inp) commitEdit(true); };
    }
    function commitEdit(fromBlur) { if (!editing) return; const E = editing; editing = null; setVal(E.ad, E.input.value); E.input.remove(); repaintRow(E.c, E.r); paint(); changed(); if (!fromBlur) focusFx(); }
    function cancelEdit() { if (!editing) return; const E = editing; editing = null; E.input.remove(); paintCell(E.c, E.r); paint(); focusFx(); }
    function clearSel() { if (!sel || locked) return; const R = rectOf(sel); for (let r = R.r1; r <= R.r2; r++) for (let c = R.c1; c <= R.c2; c++) if (canEdit(colName(c) + r)) delete data[colName(c) + r]; paintAll(); paint(); changed(); }
    // Chọn ô xong -> con trỏ nằm sẵn ở VÙNG NHẬP DỮ LIỆU (ô nhập thật: gõ được bằng bàn phím ảo
    // điện thoại và bộ gõ tiếng Việt); gõ đến đâu ô hiện đến đó, Enter xuống ô dưới. Nháy đúp = sửa trong ô.
    let fxDirty = false, fxOrig = "";
    function focusFx() {
      if (!editable || locked || !sel) return;
      const act = activeOf(sel); fxOrig = data[colName(act.c) + act.r] || ""; fx.value = fxOrig; fxDirty = false; fx.readOnly = !canEdit(colName(act.c) + act.r);
      try { fx.focus({ preventScroll: true }); fx.select(); } catch (x) { /* bỏ qua */ }
    }
    if (editable) {
      root.tabIndex = 0;
      root.addEventListener("keydown", (e) => { // khi khung bảng tính (không phải ô nhập) đang được chọn
        if (locked || editing || e.target !== root) return;
        const k = e.key;
        if ((e.ctrlKey || e.metaKey) && /^[cv]$/i.test(k)) { e.preventDefault(); e.stopPropagation(); if (k.toLowerCase() === "c") copySel(); else pasteSel(); return; }
        if (k === "Delete" || k === "Backspace") { e.preventDefault(); e.stopPropagation(); clearSel(); return; }
        if (k === "Enter" || k === "F2" || /^Arrow/.test(k)) { e.preventDefault(); e.stopPropagation(); if (!sel) move(0, 0); focusFx(); }
      });
      grid.addEventListener("dblclick", (e) => { if (e.target.closest("td")) startEdit(); });
      fx.addEventListener("keydown", (e) => {
        e.stopPropagation(); if (locked) return;
        const k = e.key, arrows = { ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0] };
        const multi = sel && (() => { const R = rectOf(sel); return R.c1 !== R.c2 || R.r1 !== R.r2; })();
        if ((e.ctrlKey || e.metaKey) && /^[cv]$/i.test(k) && !fxDirty) { if (k.toLowerCase() === "c") copySel(); else { e.preventDefault(); pasteSel(); focusFx(); } return; }
        if (k === "Escape" && clip && !fxDirty) { clip = null; root.querySelectorAll(".copied").forEach((x) => x.classList.remove("copied")); }
        if (k === "Enter" || k === "Tab") { e.preventDefault(); if (fxDirty) changed(); if (k === "Enter") move(0, e.shiftKey ? -1 : 1); else move(1, 0); focusFx(); return; }
        if (k === "Escape") { e.preventDefault(); if (sel) { const act = activeOf(sel); setVal(colName(act.c) + act.r, fxOrig); repaintRow(act.c, act.r); } focusFx(); return; }
        if ((k === "Delete" || k === "Backspace") && multi && !fxDirty) { e.preventDefault(); clearSel(); focusFx(); return; }
        if (arrows[k] && (!fxDirty || k === "ArrowUp" || k === "ArrowDown")) {
          e.preventDefault(); const [dc, dr] = arrows[k];
          if (e.shiftKey && sel && sel.m === "cells") { sel.f = { c: clamp(sel.f.c + dc, 0, cols - 1), r: clamp(sel.f.r + dr, 1, rows) }; paint(); }
          else { move(dc, dr); focusFx(); }
        }
      });
      fx.addEventListener("focus", () => { if (!sel) { move(0, 0); focusFx(); } });
      fx.addEventListener("input", () => { if (!sel || locked || fx.readOnly) return; fxDirty = true; const act = activeOf(sel); if (multi1()) { sel = { a: act, f: act, m: "cells" }; paint(); } setVal(colName(act.c) + act.r, fx.value); repaintRow(act.c, act.r); });
      const multi1 = () => { const R = rectOf(sel); return R.c1 !== R.c2 || R.r1 !== R.r2; };
      root.querySelector('[data-tool="edit"]').onclick = () => startEdit();
      root.querySelector('[data-tool="del"]').onclick = () => { clearSel(); focusFx(); };
      root.querySelector('[data-tool="copy"]').onclick = () => { copySel(); };
      root.querySelector('[data-tool="paste"]').onclick = () => { pasteSel(); focusFx(); };
      fx.addEventListener("blur", () => { if (fxDirty) { fxDirty = false; changed(); } });
      root.querySelectorAll(".xs-tab").forEach((tab) => { tab.ondblclick = () => { // nháy đúp tên trang tính để đổi tên
        if (locked) return; tab.contentEditable = "true"; tab.focus(); document.getSelection().selectAllChildren(tab);
        tab.onkeydown = (e) => { e.stopPropagation(); if (e.key === "Enter") { e.preventDefault(); tab.blur(); } };
        tab.onblur = () => { tab.contentEditable = "false"; if (!tab.textContent.trim()) tab.textContent = "Sheet1"; };
      }; });
    }
    paintAll(); paint();
    const api = {
      el: root,
      selection: () => (sel ? addrOf(sel) : null),
      select(ad) {
        const R = addrRect(ad, cols, rows); if (!R) return;
        sel = R.cols ? { a: { c: R.c1, r: 1 }, f: { c: R.c2, r: 1 }, m: "cols" } : R.rows ? { a: { c: 0, r: R.r1 }, f: { c: 0, r: R.r2 }, m: "rows" }
          : { a: { c: clamp(R.c1, 0, cols - 1), r: clamp(R.r1, 1, rows) }, f: { c: clamp(R.c2, 0, cols - 1), r: clamp(R.r2, 1, rows) }, m: "cells" };
        paint();
      },
      lock() { locked = true; drag = false; root.classList.add("locked"); fx.readOnly = true; },
      repaint() { paintAll(); paint(); },
      mark(ad, cls) { const R = addrRect(ad, cols, rows); if (!R) return; for (let r = R.r1; r <= Math.min(R.r2, rows); r++) for (let c = R.c1; c <= Math.min(R.c2, cols - 1); c++) td(c, r).classList.add(cls); },
      onSelect(fn) { cb = fn; },
    };
    if (opts.highlight) api.mark(opts.highlight, "m-hl");
    return api;
  }

  // ---- SƠ ĐỒ TƯ DUY MÔ PHỎNG (activity.mindmap) ------------------------------------------
  // mindmap: { root: { text, box?, files?: [{ kind, name, note?, url?, src?, html?, sheet? }], children: [...] },
  //            title?, intro?, layout?: "both" (mặc định, nhánh 2 bên) | "right", editable?, key? (dùng chung giữa
  //            các hoạt động), submit? (nhãn câu gửi GV) }.  kind: doc 📄 · img 🖼️ · video 🎬 · sheet 📊 · link 🔗
  //  editable: thêm/xóa nhánh, sửa chữ, đính kèm tệp (ảnh chọn từ máy được); tự lưu trên máy (localStorage).
  //  submit: máy HS có nút gửi sơ đồ (dạng dàn ý) cho GV; màn chiếu nối tiết học có nút xem lại sơ đồ từng nhóm.
  const MM_KINDS = { doc: ["📄", "Văn bản"], img: ["🖼️", "Hình ảnh"], video: ["🎬", "Video"], sheet: ["📊", "Trang tính"], link: ["🔗", "Liên kết"] };
  const MM_COLORS = ["#f97316", "#0ea5e9", "#16a34a", "#a855f7", "#e11d48", "#ca8a04", "#0891b2", "#db2777"];
  const mmMem = {}; // sơ đồ đang làm theo key (giữ khi chuyển màn)
  const mmKind = (f) => MM_KINDS[f && f.kind] || MM_KINDS.doc;
  function mmClone(n) { n = n || {}; return { text: String(n.text == null ? "" : n.text), box: !!n.box, files: (n.files || []).map((f) => Object.assign({}, f)), children: (n.children || []).map(mmClone) }; }
  // Sơ đồ -> dàn ý chữ (GV đọc được ở bảng Tự luận; màn chiếu dựng lại được sơ đồ)
  function mmToText(root) {
    const out = [], one = (s) => String(s == null ? "" : s).replace(/\s+/g, " ").trim();
    (function walk(n, d) {
      const pad = "  ".repeat(d);
      out.push(pad + (String(n.text).split("\n").map(one).filter(Boolean).join(" / ") || "(trống)"));
      (n.files || []).forEach((f) => { const k = mmKind(f), extra = one(f.url || f.note); out.push(pad + "  📎 " + k[0] + " " + (one(f.name) || k[1]) + (extra ? " — " + extra : "")); });
      (n.children || []).forEach((c) => walk(c, d + 1));
    })(root, 0);
    const t = out.join("\n"); return t.length > 2950 ? t.slice(0, 2950) + "\n…" : t;
  }
  function mmFromText(txt) {
    const root = { text: "", files: [], children: [] }, stack = [];
    String(txt || "").split("\n").filter((s) => s.trim() && s.trim() !== "…").forEach((ln) => {
      const d = Math.floor(ln.match(/^ */)[0].length / 2), s = ln.trim();
      if (!stack.length) { root.text = s.replace(/ \/ /g, "\n"); stack.push(root); return; }
      if (s.indexOf("📎") === 0) {
        let rest = s.replace(/^📎\s*/, ""), kind = "doc";
        Object.keys(MM_KINDS).some((k) => { if (rest.indexOf(MM_KINDS[k][0]) !== 0) return false; kind = k; rest = rest.slice(MM_KINDS[k][0].length).trim(); return true; });
        const cut = rest.indexOf(" — "), f = { kind, name: cut >= 0 ? rest.slice(0, cut) : rest };
        if (cut >= 0) { const x = rest.slice(cut + 3); if (/^https?:\/\//i.test(x)) f.url = x; else f.note = x; }
        (stack[Math.max(0, Math.min(d - 1, stack.length - 1))]).files.push(f); return;
      }
      const node = { text: s.replace(/ \/ /g, "\n"), files: [], children: [] }, dd = Math.max(1, Math.min(d, stack.length));
      stack[dd - 1].children.push(node); stack.length = dd; stack.push(node);
    });
    return root;
  }
  // Hộp nổi dùng chung (xem tệp đính kèm, sơ đồ các nhóm): Esc / nút ✖ / bấm nền để đóng
  function popup(headHTML, wide) {
    ensureEngineCSS();
    const ov = el("div", "mm-pop"), card = el("div", "mm-pop-card" + (wide ? " wide" : ""));
    card.innerHTML = `<div class="mm-pop-head"><span>${headHTML}</span><button type="button" class="mm-pop-x" title="Đóng (Esc)">✖</button></div>`;
    const onKey = (e) => { if (e.key === "Escape") { e.stopPropagation(); e.preventDefault(); close(); } };
    const close = () => { ov.remove(); document.removeEventListener("keydown", onKey, true); };
    ov.onclick = (e) => { if (e.target === ov) close(); };
    card.querySelector(".mm-pop-x").onclick = close;
    ov.appendChild(card); document.body.appendChild(ov); document.addEventListener("keydown", onKey, true);
    return { card, close };
  }
  function mmPreview(f, onRemove) {
    const k = mmKind(f), p = popup(`📎 ${k[0]} <b>${k[1]}</b> — ${esc(f.name || "")}`), body = el("div", "mm-pop-body");
    if (f.html) body.innerHTML = `<div class="diagram">${f.html}</div>`; // nội dung tin cậy (GV soạn trong data)
    else if (f.kind === "img") body.innerHTML = f.src ? `<img src="${esc(f.src)}" alt="">` : `<div class="mm-ph">🖼️</div>`;
    else if (f.kind === "video") body.innerHTML = `<div class="mm-video"><span>▶</span></div>`;
    else if (f.kind === "doc") body.innerHTML = `<div class="mm-doc">${esc(f.note || "(Tệp văn bản)")}</div>`;
    else if (f.kind === "link") body.innerHTML = `<div class="mm-ph">🌐</div>`;
    if (f.kind === "sheet") { if (f.sheet) body.appendChild(mountSheet(f.sheet, {}).el); else if (!f.html) body.innerHTML = `<div class="mm-ph">📊</div>`; }
    if (f.note && f.kind !== "doc") body.appendChild(el("p", "mm-note", esc(f.note)));
    if (f.url) { const x = el("a", "btn act-link", (f.kind === "video" ? "▶ Mở video" : "🔗 Mở liên kết") + " (tab mới)"); x.href = f.url; x.target = "_blank"; x.rel = "noopener"; body.appendChild(wrapEl(x)); }
    p.card.appendChild(body);
    if (onRemove) { const rm = el("button", "btn ghost", "🗑️ Gỡ tệp đính kèm này"); rm.onclick = () => { p.close(); onRemove(); }; p.card.appendChild(wrapEl(rm)); }
  }
  // Thu nhỏ ảnh chọn từ máy (lưu gọn trong localStorage)
  function mmShrink(file, cb) {
    const rd = new FileReader();
    rd.onload = () => { const im = new Image(); im.onload = () => { const s = Math.min(1, 560 / Math.max(im.width, im.height)), cv = document.createElement("canvas"); cv.width = Math.round(im.width * s); cv.height = Math.round(im.height * s); cv.getContext("2d").drawImage(im, 0, 0, cv.width, cv.height); cb(cv.toDataURL("image/jpeg", 0.8)); }; im.src = rd.result; };
    rd.readAsDataURL(file);
  }
  function mountMindmap(tree, opts) {
    ensureEngineCSS(); opts = opts || {};
    const ed = !!opts.editable, both = opts.layout !== "right", HG = 46, VG = 14;
    const box = el("div", "mm" + (ed ? " editable" : ""));
    box.innerHTML = (opts.title ? `<div class="mm-title">🧠 ${esc(opts.title)}</div>` : "")
      + (ed ? `<div class="mm-bar"><label class="mm-tx">✏️<input class="mm-input" placeholder="Gõ nội dung nhánh đang chọn…" maxlength="120"></label>
        <div class="mm-tools"><button type="button" data-t="child" title="Tab">➕ Nhánh con</button><button type="button" data-t="sib" title="Enter">➕ Nhánh cùng cấp</button><button type="button" data-t="attach">📎 Đính kèm</button><button type="button" data-t="del">🗑️ Xóa nhánh</button>${opts.onReset ? `<button type="button" data-t="reset">🔄 Làm lại</button>` : ""}</div>
        <div class="mm-attach" hidden></div></div>` : "")
      + `<div class="mm-wrap"><div class="mm-canvas"><svg class="mm-lines" xmlns="http://www.w3.org/2000/svg"></svg></div></div>`
      + (ed ? `<div class="mm-hint">Bấm chọn một nhánh rồi gõ nội dung ở ô ✏️ · <b>Tab</b>: thêm nhánh con · <b>Enter</b>: thêm nhánh cùng cấp · bấm 📎 trên nhánh để xem tệp đính kèm.</div>` : "");
    const wrap = box.querySelector(".mm-wrap"), canvas = box.querySelector(".mm-canvas"), svg = box.querySelector(".mm-lines");
    const input = box.querySelector(".mm-input"), attachP = box.querySelector(".mm-attach");
    const info = new Map(); // node -> { el, depth, color, parent, side, x, y, w, h }
    let sel = ed ? tree : null, W = 0, H = 0, dirty = true, raf = 0;
    const changed = () => { if (opts.onChange) opts.onChange(tree); };
    const oneLine = (s) => String(s).replace(/\s*\n\s*/g, " "); // ô ✏️ một dòng: xuống dòng -> dấu cách
    const later = () => { dirty = true; cancelAnimationFrame(raf); raf = requestAnimationFrame(layout); };
    const nodeHTML = (n) => `<div class="mm-t">${n.text.trim() ? esc(n.text).replace(/\n/g, "<br>") : "<i>(nhánh trống)</i>"}</div>`
      + (n.files && n.files.length ? `<div class="mm-files">${n.files.map((f, i) => `<button type="button" class="mm-file" data-f="${i}" title="Xem tệp đính kèm">📎${mmKind(f)[0]} ${esc(f.name || mmKind(f)[1])}</button>`).join("")}</div>` : "");
    function paintNode(n) {
      const o = info.get(n); if (!o) return;
      o.el.innerHTML = nodeHTML(n);
      o.el.querySelectorAll(".mm-file").forEach((b) => { b.onclick = (ev) => { ev.stopPropagation(); const i = +b.dataset.f; mmPreview(n.files[i], ed ? () => { n.files.splice(i, 1); changed(); paintNode(n); later(); } : null); }; });
    }
    function build() {
      canvas.querySelectorAll(".mm-node").forEach((x) => x.remove()); info.clear();
      (function walk(n, d, parent, color, side) {
        const e = el("div", "mm-node d" + Math.min(d, 3) + (n.box ? " box" : "") + (n === sel ? " sel" : ""));
        if (color) e.style.setProperty("--c", color);
        if (ed) e.onclick = () => select(n);
        canvas.appendChild(e); info.set(n, { el: e, depth: d, color, parent, side }); paintNode(n);
        const ks = n.children || [];
        ks.forEach((c, i) => walk(c, d + 1, n, d === 0 ? MM_COLORS[i % MM_COLORS.length] : color, d === 0 ? (both && ks.length >= 3 && i >= Math.ceil(ks.length / 2) ? -1 : 1) : side));
      })(tree, 0, null, null, 1);
      later();
    }
    function layout() {
      if (!box.isConnected || !wrap.clientWidth) return; // chưa gắn vào trang: ResizeObserver sẽ gọi lại
      if (dirty) {
        dirty = false; canvas.style.width = "6000px"; canvas.style.transform = "none";
        info.forEach((o) => { o.w = o.el.offsetWidth; o.h = o.el.offsetHeight; });
        const sub = new Map();
        const size = (n) => { const ks = n.children || [], h = info.get(n).h; const s = ks.length ? Math.max(h, ks.reduce((t, c) => t + size(c), 0) + VG * (ks.length - 1)) : h; sub.set(n, s); return s; };
        const place = (n, x, cy, dir) => {
          const o = info.get(n); o.x = dir > 0 ? x : x - o.w; o.y = cy - o.h / 2;
          const ks = n.children || []; let y = cy - (ks.reduce((t, c) => t + sub.get(c), 0) + VG * (ks.length - 1)) / 2;
          ks.forEach((c) => { place(c, dir > 0 ? o.x + o.w + HG : o.x - HG, y + sub.get(c) / 2, dir); y += sub.get(c) + VG; });
        };
        const r = info.get(tree), kids = tree.children || []; kids.forEach(size);
        r.x = -r.w / 2; r.y = -r.h / 2;
        [1, -1].forEach((dir) => {
          const arr = kids.filter((c) => info.get(c).side === dir); let y = -(arr.reduce((t, c) => t + sub.get(c), 0) + VG * Math.max(0, arr.length - 1)) / 2;
          arr.forEach((c) => { place(c, dir > 0 ? r.w / 2 + HG : -r.w / 2 - HG, y + sub.get(c) / 2, dir); y += sub.get(c) + VG; });
        });
        let x1 = Infinity, y1 = Infinity, x2 = -Infinity, y2 = -Infinity;
        info.forEach((o) => { x1 = Math.min(x1, o.x); y1 = Math.min(y1, o.y); x2 = Math.max(x2, o.x + o.w); y2 = Math.max(y2, o.y + o.h); });
        const P = 14; W = Math.ceil(x2 - x1 + 2 * P); H = Math.ceil(y2 - y1 + 2 * P);
        let paths = "";
        info.forEach((o) => {
          o.el.style.left = (o.x - x1 + P) + "px"; o.el.style.top = (o.y - y1 + P) + "px";
          if (!o.parent) return;
          const p = info.get(o.parent), ax = (o.side > 0 ? p.x + p.w : p.x) - x1 + P, ay = p.y + p.h / 2 - y1 + P, bx = (o.side > 0 ? o.x : o.x + o.w) - x1 + P, by = o.y + o.h / 2 - y1 + P, m = (bx - ax) / 2;
          paths += `<path d="M${ax.toFixed(1)} ${ay.toFixed(1)} C${(ax + m).toFixed(1)} ${ay.toFixed(1)} ${(bx - m).toFixed(1)} ${by.toFixed(1)} ${bx.toFixed(1)} ${by.toFixed(1)}" stroke="${o.color || "#f97316"}" stroke-width="${o.depth === 1 ? 6 : o.depth === 2 ? 4 : 2.5}" fill="none" stroke-linecap="round"/>`;
        });
        svg.setAttribute("width", W); svg.setAttribute("height", H); svg.innerHTML = paths;
      }
      const s = Math.max(0.55, Math.min(1, (wrap.clientWidth - 2) / W)); // quá rộng (điện thoại) -> kéo ngang để xem
      canvas.style.width = W + "px"; canvas.style.height = H + "px"; canvas.style.transform = `scale(${s})`;
      wrap.style.height = Math.ceil(H * s) + "px"; wrap.classList.toggle("scroll", W * s > wrap.clientWidth + 2);
    }
    if (window.ResizeObserver) { let seen = false; const ro = new ResizeObserver(() => { if (box.isConnected) { seen = true; layout(); } else if (seen) ro.disconnect(); }); ro.observe(wrap); }
    else window.addEventListener("resize", () => layout());
    function select(n) {
      sel = n; info.forEach((o, k) => o.el.classList.toggle("sel", k === n));
      input.value = oneLine(n.text); attachP.hidden = true;
      if (window.matchMedia && matchMedia("(pointer:fine)").matches) input.focus();
    }
    if (ed) {
      input.value = oneLine(tree.text);
      input.oninput = () => { if (!sel) return; sel.text = input.value; paintNode(sel); later(); changed(); };
      const add = (kind) => {
        const n = { text: "", files: [], children: [] };
        if (kind === "sib" && sel !== tree) { const p = info.get(sel).parent; p.children.splice(p.children.indexOf(sel) + 1, 0, n); }
        else { sel.children = sel.children || []; sel.children.push(n); }
        sel = n; build(); select(n); input.focus(); changed();
      };
      input.onkeydown = (e) => {
        if (e.key === "Enter" && !e.isComposing) { e.preventDefault(); add("sib"); }
        else if (e.key === "Tab") { e.preventDefault(); add("child"); }
      };
      box.querySelectorAll(".mm-tools button").forEach((b) => { b.onclick = () => {
        const t = b.dataset.t;
        if (t === "child" || t === "sib") return add(t);
        if (t === "attach") return openAttach();
        if (t === "reset") { if (!confirm("Xóa sơ đồ đang làm và làm lại từ đầu?")) return; tree = opts.onReset(); sel = tree; input.value = oneLine(tree.text); attachP.hidden = true; return build(); }
        if (t === "del") {
          if (sel === tree) { alert("Không xóa được chủ đề trung tâm — hãy sửa chữ của nó."); return; }
          if (((sel.children || []).length || (sel.files || []).length) && !confirm("Xóa nhánh này cùng các nhánh con và tệp đính kèm?")) return;
          const p = info.get(sel).parent; p.children.splice(p.children.indexOf(sel), 1); sel = p; build(); select(p); changed();
        }
      }; });
    }
    const PH = { doc: "Nội dung văn bản (tóm tắt ngắn)", img: "Mô tả ảnh (không bắt buộc)", video: "Nội dung / nguồn video", sheet: "Trang tính chứa gì? (vd: số cây mỗi lớp trồng)", link: "Địa chỉ trang web: https://…" };
    function openAttach() {
      if (!attachP.hidden) { attachP.hidden = true; return; }
      let kind = "img", src = null;
      attachP.innerHTML = `<div class="mm-kinds">${Object.keys(MM_KINDS).map((k) => `<button type="button" data-k="${k}">${MM_KINDS[k][0]} ${MM_KINDS[k][1]}</button>`).join("")}</div>
        <div class="mm-afields"><input class="mm-aname" placeholder="Tên tệp / tiêu đề (vd: Ảnh vườn trường)" maxlength="60"><input class="mm-anote" maxlength="200"><label class="mm-pick">📁 Chọn ảnh từ máy<input type="file" accept="image/*" hidden></label></div>
        <div class="mm-aact"><button type="button" class="prim" data-a="ok">✅ Đính kèm vào nhánh đang chọn</button><button type="button" data-a="no">Hủy</button><span class="mm-apic"></span></div>`;
      const nm = attachP.querySelector(".mm-aname"), nt = attachP.querySelector(".mm-anote"), pick = attachP.querySelector(".mm-pick"), pic = attachP.querySelector(".mm-apic");
      const setKind = (k) => { kind = k; attachP.querySelectorAll(".mm-kinds button").forEach((b) => b.classList.toggle("on", b.dataset.k === k)); nt.placeholder = PH[k]; pick.hidden = k !== "img"; if (k !== "img") { src = null; pic.innerHTML = ""; } };
      attachP.querySelectorAll(".mm-kinds button").forEach((b) => { b.onclick = () => setKind(b.dataset.k); });
      pick.querySelector("input").onchange = (e) => { const file = e.target.files && e.target.files[0]; if (!file) return; if (!nm.value.trim()) nm.value = file.name.replace(/\.[^.]+$/, ""); mmShrink(file, (u) => { src = u; pic.innerHTML = `<img src="${u}" alt="">`; }); };
      attachP.querySelector("[data-a=no]").onclick = () => { attachP.hidden = true; };
      attachP.querySelector("[data-a=ok]").onclick = () => {
        const f = { kind, name: nm.value.trim() || MM_KINDS[kind][1] }, v = nt.value.trim();
        if (v) { if (kind === "link" && /^https?:\/\//i.test(v)) f.url = v; else f.note = v; }
        if (src) f.src = src;
        (sel.files = sel.files || []).push(f); attachP.hidden = true; paintNode(sel); later(); changed();
        const o = info.get(sel); if (o) { o.el.classList.remove("pop"); void o.el.offsetWidth; o.el.classList.add("pop"); }
      };
      setKind("img"); attachP.hidden = false; nm.focus();
    }
    build();
    return { el: box, relayout: later };
  }
  function mindmapBox(a) {
    const spec = a.mindmap, key = spec.key || aid(a), ed = !!spec.editable, tk = aid(a) + ":mm";
    const lsKey = "lh_mm:" + ((L.meta && L.meta.title) || "") + ":" + key;
    if (!mmMem[key]) {
      let t = null;
      if (ed) { try { t = JSON.parse(localStorage.getItem(lsKey) || "null"); } catch (e) { t = null; } }
      if (!t && ed && STUDENT) { const s = ask("getText", tk); if (s && s.text) t = mmFromText(s.text); } // máy khác: dựng lại từ bản đã gửi
      mmMem[key] = mmClone(t && typeof t.text === "string" ? t : spec.root || { text: "Chủ đề" });
    }
    const save = () => { try { localStorage.setItem(lsKey, JSON.stringify(mmMem[key])); } catch (e) { /* hết chỗ / chế độ riêng tư: vẫn làm tiếp được */ } };
    const box = el("div", "mm-box");
    if (spec.intro) box.appendChild(el("p", "subtitle", esc(spec.intro)));
    box.appendChild(mountMindmap(mmMem[key], { editable: ed, title: spec.title, layout: spec.layout, onChange: ed ? save : null,
      onReset: ed ? () => { mmMem[key] = mmClone(spec.root || { text: "Chủ đề" }); save(); return mmMem[key]; } : null }).el);
    if (spec.submit && STUDENT) {
      const sent = ask("getText", tk), btn = el("button", "btn", "📨 Gửi sơ đồ cho thầy/cô"), st = el("span", "ta-status", sent ? "✓ Đã gửi — sửa xong có thể gửi lại" : "");
      btn.onclick = () => { emit("onText", { key: tk, activityId: aid(a), text: mmToText(mmMem[key]) }); st.textContent = "✓ Đã gửi lúc " + new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }) + " — sửa xong có thể gửi lại"; sound("ok"); };
      const row = el("div", "ta-row"); row.append(btn, st); box.appendChild(row);
    }
    if (spec.submit && !STUDENT && ask("groupTexts", tk)) { const b = el("button", "btn ghost", "📥 Xem sơ đồ các nhóm đã gửi"); b.onclick = () => mmGallery(a, tk); box.appendChild(wrapEl(b)); }
    return box;
  }
  // Màn chiếu (nối tiết học): xem lại sơ đồ từng nhóm để nhóm lên trình bày
  function mmGallery(a, tk) {
    const list = ask("groupTexts", tk) || [], p = popup(`📥 Sơ đồ tư duy các nhóm đã gửi (${list.length})`, true);
    if (!list.length) { p.card.appendChild(el("p", "subtitle", "Chưa có nhóm nào gửi sơ đồ.")); return; }
    const tabs = el("div", "mm-gtabs"), stage = el("div");
    const show = (i) => { [...tabs.children].forEach((b, j) => b.classList.toggle("on", i === j)); stage.innerHTML = ""; stage.appendChild(mountMindmap(mmFromText(list[i].text), { layout: a.mindmap.layout }).el); };
    list.forEach((g, i) => { const b = el("button", null, esc(g.name)); b.type = "button"; b.onclick = () => show(i); tabs.appendChild(b); });
    p.card.append(tabs, stage); show(0);
  }

  // ---- HỘP THƯ ĐIỆN TỬ MÔ PHỎNG (activity.mail) — giao diện giống Gmail ------------------------
  // mail: { key?, me: { name, address }, login?: true (bắt đầu ở màn đăng nhập), signup?: true (có "Tạo tài khoản"),
  //         inbox: [{ from, addr, subject, body ("{ten}" = tên chủ hộp thư), time, files?: [{ name }], spam?, trap?: "🎁 Nhận quà ngay", star? }],
  //         files?: ["Anh_lop_6A.jpg", …] (tệp có sẵn để đính kèm), compose?: { to, subject, body } (điền sẵn),
  //         check?: { attach: true, to: "địa chỉ bắt buộc" } (tiêu chí tự kiểm tra khi gửi), submit?: "nhãn gửi GV", intro? }
  //  Máy HS + submit: thư gửi đi được chuyển cho GV (texts …/mail); màn chiếu nối tiết học xem lại thư từng nhóm.
  //  Đây là MÔ PHỎNG: không gửi thư thật, không lưu mật khẩu.
  const EMAIL_RE = /^[A-Za-z0-9](?:[A-Za-z0-9._%+-]{0,62}[A-Za-z0-9])?@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;
  const mailMem = {};
  const mailTime = () => new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
  const fileIco = (n) => (/\.(jpe?g|png|gif|bmp|webp)$/i.test(n) ? "🖼️" : /\.(docx?|odt|txt|pdf)$/i.test(n) ? "📄" : /\.(xlsx?|csv)$/i.test(n) ? "📊" : /\.(mp4|avi|mov)$/i.test(n) ? "🎬" : /\.(mp3|wav)$/i.test(n) ? "🎵" : "📎");
  function mailChecks(m, spec) {
    const list = String(m.to || "").split(/[,;]/).map((s) => s.trim()).filter(Boolean), ck = spec.check || {};
    const body = String(m.body || "").split(/\n-{3,}/)[0].trim(); // bỏ phần thư cũ được trích khi Trả lời / Chuyển tiếp
    const lines = body.split("\n").map((s) => s.trim()).filter(Boolean), first = lines[0] || "", last = lines[lines.length - 1] || "";
    const out = [
      ["Địa chỉ người nhận đúng dạng <tên đăng nhập>@<địa chỉ máy chủ>", list.length > 0 && list.every((x) => EMAIL_RE.test(x))],
      ["Có chủ đề (tiêu đề) thư", !!String(m.subject || "").trim()],
      ["Có lời chào ở đầu thư", /(chào|kính gửi|thân gửi|thân mến|thưa|gửi )/i.test(first)],
      ["Nội dung rõ ràng (từ 2 câu trở lên)", body.length >= 40],
      ["Có kí tên cuối thư", lines.length >= 3 && last.length <= 40 && !/[?]$/.test(last)],
    ];
    if (ck.to) out.unshift([`Gửi đúng người nhận: ${ck.to}`, list.some((x) => x.toLowerCase() === String(ck.to).toLowerCase())]);
    if (ck.attach) out.push(["Có tệp đính kèm", (m.files || []).length > 0]);
    return out;
  }
  function mailToText(m) {
    return [`Người gửi: ${m.fromName} <${m.from}>`, `Người nhận: ${m.to}`, `Chủ đề: ${m.subject || "(không có chủ đề)"}`, `Tệp đính kèm: ${(m.files || []).map((f) => f.name).join(", ") || "(không có)"}`, "────────", m.body || ""].join("\n").slice(0, 2990);
  }
  function mailFromText(t) {
    const [head, ...rest] = String(t || "").split("\n────────\n"), m = { body: rest.join("\n────────\n") }, get = (lb) => ((head.split("\n").find((l) => l.indexOf(lb + ": ") === 0) || "").slice(lb.length + 2));
    const fr = get("Người gửi").match(/^(.*) <(.*)>$/) || [null, get("Người gửi"), ""];
    m.fromName = fr[1]; m.from = fr[2]; m.to = get("Người nhận"); m.subject = get("Chủ đề").replace("(không có chủ đề)", "");
    m.files = get("Tệp đính kèm").split(", ").filter((x) => x && x !== "(không có)").map((name) => ({ name }));
    return m;
  }
  function mailReadHTML(m, checks) {
    return `<div class="gm-read"><h2>${esc(m.subject || "(không có chủ đề)")}</h2>
      <div class="gm-meta"><span class="gm-av">${esc((m.fromName || "?").trim().split(/\s+/).pop().charAt(0).toUpperCase())}</span><div><b>${esc(m.fromName || "")}</b> <small>&lt;${esc(m.from || "")}&gt;</small><br><small>tới ${esc(m.to || "tôi")}${m.time ? " · " + esc(m.time) : ""}</small></div></div>
      <div class="gm-bodytext">${esc(m.body || "")}</div>
      ${(m.files || []).length ? `<div class="gm-files">${m.files.map((f) => `<span class="gm-file">${fileIco(f.name)} ${esc(f.name)}</span>`).join("")}</div>` : ""}
      ${checks ? `<div class="gm-checks"><b>📋 Tự kiểm tra thư:</b>${checks.map(([t, ok]) => `<div class="${ok ? "ok" : "no"}">${ok ? "✅" : "❌"} ${esc(t)}</div>`).join("")}</div>` : ""}</div>`;
  }
  function mailBox(a) {
    ensureEngineCSS();
    const spec = a.mail, key = spec.key || aid(a), tk = aid(a) + ":mail", lsKey = "lh_mail:" + ((L.meta && L.meta.title) || "") + ":" + key;
    if (!mailMem[key]) {
      let saved = null; try { saved = JSON.parse(localStorage.getItem(lsKey) || "null"); } catch (e) { saved = null; }
      // Thư mẫu luôn lấy từ data (GV sửa là thấy ngay); chỉ giữ trạng thái đã đọc / sao / thư mục và thư HS tự tạo
      const old = {}; ((saved && saved.items) || []).forEach((m) => { old[m.id] = m; });
      const inbox = (spec.inbox || []).map((m, i) => { const o = old["i" + i] || {}; return Object.assign({}, m, { id: "i" + i, read: !!o.read, star: o.star != null ? o.star : !!m.star, box: o.box || (m.spam ? "spam" : "inbox") }); });
      const mine = ((saved && saved.items) || []).filter((m) => !/^i\d+$/.test(m.id));
      mailMem[key] = Object.assign({ logged: !spec.login, me: Object.assign({}, spec.me || { name: "Học sinh", address: "hocsinh@gmail.com" }), folder: "inbox", open: null, q: "",
        compose: null, lastCheck: null, pass: null, view: "login" }, saved || {}, { folder: "inbox", q: "", items: mine.filter((m) => m.box !== "sent" && m.box !== "draft" && m.box !== "trash").concat(inbox, mine.filter((m) => m.box === "sent" || m.box === "draft" || m.box === "trash")) });
      mailMem[key].open = null; mailMem[key].compose = null; mailMem[key].view = mailMem[key].logged ? "box" : "login";
    }
    const S2 = mailMem[key];
    const save = () => { try { const { pass, compose, open, ...keep } = S2; localStorage.setItem(lsKey, JSON.stringify(keep)); } catch (e) {} };
    const wrap = el("div", "gm-wrap");
    if (spec.intro) wrap.appendChild(el("p", "subtitle", esc(spec.intro)));
    const box = el("div", "gm"); wrap.appendChild(box);
    const toast = (t) => { const x = el("div", "gm-toast", esc(t)); box.appendChild(x); setTimeout(() => x.remove(), 2600); };
    const initial = () => (S2.me.name || "?").trim().split(/\s+/).pop().charAt(0).toUpperCase();
    const bodyOf = (m) => String(m.body || "").replace(/\{ten\}/g, (S2.me.name || "bạn").trim().split(/\s+/).pop()); // {ten} = tên chủ hộp thư
    function draw() { box.innerHTML = ""; (S2.view === "login" ? drawLogin : S2.view === "signup" ? drawSignup : drawBox)(); }
    // ---- Đăng nhập (2 bước như Google) ----
    function drawLogin(step) {
      const card = el("div", "gm-auth");
      const two = step === 2;
      card.innerHTML = `<div class="gm-glogo"><b style="color:#4285f4">G</b><b style="color:#ea4335">o</b><b style="color:#fbbc05">o</b><b style="color:#4285f4">g</b><b style="color:#34a853">l</b><b style="color:#ea4335">e</b></div>
        <h3>${two ? esc(S2.me.name) : "Đăng nhập"}</h3>${two ? `<div class="gm-chip">👤 ${esc(S2.me.address)}</div>` : `<p>Tiếp tục tới Gmail (mô phỏng)</p>`}
        <label class="gm-field"><span>${two ? "Nhập mật khẩu của bạn" : "Email hoặc tên đăng nhập"}</span><input ${two ? 'type="password"' : 'type="text"'} autocomplete="off" spellcheck="false"></label>
        ${two ? `<label class="gm-show"><input type="checkbox"> Hiện mật khẩu</label>` : ""}<div class="gm-err"></div>
        <div class="gm-authrow">${two ? `<a href="#" class="gm-link" data-a="forgot">Bạn quên mật khẩu?</a>` : spec.signup ? `<a href="#" class="gm-link" data-a="signup">Tạo tài khoản</a>` : "<span></span>"}<button type="button" class="gm-blue">Tiếp theo</button></div>
        <p class="gm-warn">⚠️ Đây là mô phỏng — KHÔNG nhập mật khẩu thật của em.</p>`;
      box.appendChild(card);
      const inp = card.querySelector(".gm-field input"), err = card.querySelector(".gm-err");
      const sh = card.querySelector(".gm-show input"); if (sh) sh.onchange = () => { inp.type = sh.checked ? "text" : "password"; };
      card.querySelectorAll(".gm-link").forEach((l) => { l.onclick = (e) => { e.preventDefault(); if (l.dataset.a === "signup") { S2.view = "signup"; draw(); } else err.textContent = "💡 Trên Gmail thật, em bấm vào đây để lấy lại mật khẩu qua số điện thoại / email khôi phục."; }; });
      const go = () => {
        const v = inp.value.trim();
        if (!two) {
          const want = S2.me.address.toLowerCase(), user = want.split("@")[0];
          if (!v) { err.textContent = "Nhập email hoặc tên đăng nhập."; return; }
          if (v.toLowerCase() !== want && v.toLowerCase() !== user) { err.textContent = `Không tìm thấy Tài khoản Google của bạn. (Tài khoản mô phỏng: ${S2.me.address})`; return; }
          box.innerHTML = ""; drawLogin(2); return;
        }
        if (v.length < 8 || (S2.pass && v !== S2.pass)) { err.textContent = "Sai mật khẩu. Hãy thử lại" + (S2.pass ? "." : " (mật khẩu mô phỏng: 8 kí tự trở lên)."); return; }
        S2.logged = true; S2.view = "box"; S2.folder = "inbox"; save(); draw(); toast("Đăng nhập thành công 👋");
      };
      card.querySelector(".gm-blue").onclick = go;
      inp.onkeydown = (e) => { if (e.key === "Enter" && !e.isComposing) go(); };
      setTimeout(() => { if (window.matchMedia && matchMedia("(pointer:fine)").matches) inp.focus(); }, 30);
    }
    // ---- Tạo tài khoản (Hình 3.10) ----
    function drawSignup() {
      const card = el("div", "gm-auth wide");
      card.innerHTML = `<div class="gm-glogo"><b style="color:#4285f4">G</b><b style="color:#ea4335">o</b><b style="color:#fbbc05">o</b><b style="color:#4285f4">g</b><b style="color:#34a853">l</b><b style="color:#ea4335">e</b></div><h3>Tạo Tài khoản Google</h3>
        <div class="gm-grid2"><label class="gm-field"><span>Họ</span><input data-f="ho"></label><label class="gm-field"><span>Tên</span><input data-f="ten"></label></div>
        <label class="gm-field"><span>Tên người dùng</span><div class="gm-suffix"><input data-f="user" autocomplete="off" spellcheck="false"><em>@gmail.com</em></div></label>
        <small class="gm-help">Bạn có thể sử dụng chữ cái, số và dấu chấm (6–30 kí tự).</small>
        <div class="gm-grid2"><label class="gm-field"><span>Mật khẩu</span><input type="password" data-f="p1"></label><label class="gm-field"><span>Xác nhận</span><input type="password" data-f="p2"></label></div>
        <small class="gm-help">Sử dụng 8 kí tự trở lên và kết hợp chữ cái, chữ số và biểu tượng.</small><div class="gm-err"></div>
        <div class="gm-authrow"><a href="#" class="gm-link">Đăng nhập</a><button type="button" class="gm-blue">Tiếp theo</button></div>
        <p class="gm-warn">⚠️ Mô phỏng: không nhập mật khẩu thật. Trên Google thật, trẻ vị thành niên cần phụ huynh đồng ý, trợ giúp và quản lí.</p>`;
      box.appendChild(card);
      const f = (n) => card.querySelector(`[data-f=${n}]`), err = card.querySelector(".gm-err");
      card.querySelector(".gm-link").onclick = (e) => { e.preventDefault(); S2.view = "login"; draw(); };
      card.querySelector(".gm-blue").onclick = () => {
        const ho = f("ho").value.trim(), ten = f("ten").value.trim(), user = f("user").value.trim().toLowerCase(), p1 = f("p1").value, p2 = f("p2").value;
        const bad = !ho || !ten ? "Hãy nhập đầy đủ họ và tên." : !/^[a-z0-9.]{6,30}$/.test(user) ? "Tên người dùng phải dài 6–30 kí tự, chỉ gồm chữ cái (không dấu), số và dấu chấm." : /^\.|\.$|\.\./.test(user) ? "Tên người dùng không được bắt đầu/kết thúc bằng dấu chấm hoặc có 2 dấu chấm liền nhau."
          : p1.length < 8 || !/[A-Za-z]/.test(p1) || !/\d/.test(p1) || !/[^A-Za-z0-9]/.test(p1) ? "Mật khẩu cần 8 kí tự trở lên, có chữ cái, chữ số và biểu tượng (VD: # @ !)." : p1 !== p2 ? "Mật khẩu xác nhận không khớp." : "";
        if (bad) { err.textContent = bad; return; }
        S2.me = { name: ho + " " + ten, address: user + "@gmail.com" }; S2.pass = p1; S2.logged = true; S2.view = "box"; S2.folder = "inbox";
        S2.items.unshift({ id: "w" + Date.now(), from: "Google", addr: "no-reply@accounts.google.com", subject: "Chào mừng bạn!", body: `Xin chào ${ho} ${ten},\n\nTài khoản ${user}@gmail.com của bạn đã được tạo (mô phỏng).\nHãy ghi nhớ tên đăng nhập và mật khẩu, không chia sẻ cho người khác.`, time: mailTime(), read: false, box: "inbox" });
        save(); draw(); toast("🎉 Chào mừng bạn! Tài khoản đã được tạo (mô phỏng).");
      };
    }
    // ---- Hộp thư ----
    function drawBox() {
      const FOLD = [["inbox", "📥", "Hộp thư đến"], ["star", "⭐", "Có gắn dấu sao"], ["sent", "📤", "Đã gửi"], ["draft", "📝", "Thư nháp"], ["spam", "🚫", "Thư rác"], ["trash", "🗑️", "Thùng rác"]];
      const inF = (m, f) => (f === "star" ? m.star && m.box !== "trash" : m.box === f);
      const unread = S2.items.filter((m) => m.box === "inbox" && !m.read).length;
      box.innerHTML = `<div class="gm-top"><span class="gm-logo"><b>M</b> Gmail</span><input class="gm-search" placeholder="🔍 Tìm kiếm trong thư" value="${esc(S2.q || "")}"><button type="button" class="gm-avatar" title="${esc(S2.me.name)}">${esc(initial())}</button></div>
        <div class="gm-body"><nav class="gm-nav"><button type="button" class="gm-compose">✏️ Soạn thư</button>${FOLD.map(([f, i, t]) => `<button type="button" class="gm-f${S2.folder === f ? " on" : ""}" data-f="${f}">${i} ${t}${f === "inbox" && unread ? ` <b>${unread}</b>` : f === "draft" && S2.items.some((m) => m.box === "draft") ? ` <b>${S2.items.filter((m) => m.box === "draft").length}</b>` : ""}</button>`).join("")}</nav><main class="gm-main"></main></div>`;
      const main = box.querySelector(".gm-main");
      box.querySelectorAll(".gm-f").forEach((b) => { b.onclick = () => { S2.folder = b.dataset.f; S2.open = null; draw(); }; });
      box.querySelector(".gm-compose").onclick = () => openCompose({});
      const se = box.querySelector(".gm-search"); se.oninput = () => { S2.q = se.value; S2.open = null; paintMain(); };
      box.querySelector(".gm-avatar").onclick = (e) => {
        e.stopPropagation(); const old = box.querySelector(".gm-menu"); if (old) { old.remove(); return; }
        const mnu = el("div", "gm-menu", `<div class="gm-av big">${esc(initial())}</div><b>${esc(S2.me.name)}</b><small>${esc(S2.me.address)}</small><button type="button" class="gm-ghost">Quản lý Tài khoản Google của bạn</button><button type="button" class="gm-out">Đăng xuất</button>`);
        mnu.querySelector(".gm-ghost").onclick = () => toast("(Mô phỏng) Nơi đổi mật khẩu, thông tin cá nhân của tài khoản.");
        mnu.querySelector(".gm-out").onclick = () => { S2.logged = false; S2.view = "login"; S2.open = null; S2.compose = null; save(); draw(); toast("✅ Đã đăng xuất — hộp thư an toàn khi dùng máy chung."); };
        box.appendChild(mnu);
      };
      function paintMain() {
        main.innerHTML = "";
        if (S2.open) return paintRead(S2.items.find((m) => m.id === S2.open));
        const q = normShort(S2.q), list = S2.items.filter((m) => inF(m, S2.folder) && (!q || normShort([m.from, m.subject, m.body, m.to].join(" ")).includes(q)));
        if (!list.length) { main.innerHTML = `<p class="gm-empty">${S2.q ? "Không tìm thấy thư phù hợp." : "Không có thư nào trong mục này."}</p>`; return; }
        list.forEach((m) => {
          const r = el("div", "gm-row" + (m.read || m.box === "sent" ? "" : " unread"));
          r.innerHTML = `<button type="button" class="gm-star${m.star ? " on" : ""}" title="Gắn dấu sao">${m.star ? "★" : "☆"}</button><span class="gm-from">${esc(m.box === "sent" || m.box === "draft" ? "Tới: " + (m.to || "(chưa có)") : m.from)}</span><span class="gm-subj"><b>${esc(m.subject || "(không có chủ đề)")}</b> — ${esc(bodyOf(m).replace(/\s+/g, " ").slice(0, 70))}</span>${(m.files || []).length ? "<span>📎</span>" : ""}<span class="gm-time">${esc(m.time || "")}</span>`;
          r.querySelector(".gm-star").onclick = (e) => { e.stopPropagation(); m.star = !m.star; save(); paintMain(); };
          r.onclick = () => { if (m.box === "draft") return openCompose(m, true); m.read = true; S2.open = m.id; save(); draw(); };
          main.appendChild(r);
        });
      }
      function paintRead(m) {
        if (!m) { S2.open = null; return paintMain(); }
        const bar = el("div", "gm-actions");
        const acts = [["back", "← Quay lại"], ["reply", "↩️ Trả lời"], ["fwd", "➡️ Chuyển tiếp"], m.box === "spam" ? ["notspam", "✅ Không phải thư rác"] : ["spam", "🚫 Báo cáo thư rác"], m.box === "trash" ? ["restore", "↩️ Khôi phục"] : ["del", "🗑️ Xóa"]];
        acts.forEach(([k, t]) => { const b = el("button", null, t); b.type = "button"; b.onclick = () => act(k, m); bar.appendChild(b); });
        main.appendChild(bar);
        if (m.box === "spam") main.appendChild(el("div", "gm-alert", "⚠️ Thư này nằm trong mục Thư rác: có thể là thư quảng cáo, lừa đảo hoặc chứa virus. Không nháy vào liên kết lạ, không mở tệp đính kèm, không cung cấp mật khẩu."));
        const d = el("div"); d.innerHTML = mailReadHTML({ fromName: m.box === "sent" ? S2.me.name : m.from, from: m.box === "sent" ? S2.me.address : m.addr, to: m.box === "sent" ? m.to : S2.me.address, subject: m.subject, body: bodyOf(m), files: m.files, time: m.time }, m.box === "sent" && m.checks ? m.checks : null);
        main.appendChild(d);
        if (m.trap) { const t = el("button", "gm-trap", esc(m.trap)); t.type = "button"; t.onclick = () => { const p = popup("⚠️ <b>Cẩn thận — thư lừa đảo!</b>"); p.card.appendChild(el("div", "mm-doc", "Đây là liên kết giả mạo (mô phỏng). Trên thực tế, nháy vào có thể:\n• đưa em tới trang web lấy cắp mật khẩu, thông tin cá nhân;\n• tải về virus làm hỏng máy tính.\n\n👉 Không nháy liên kết lạ, hãy Báo cáo thư rác và xoá thư.")); sound("no"); }; main.appendChild(wrapEl(t)); }
        d.querySelectorAll(".gm-file").forEach((f) => { f.onclick = () => { if (m.box === "spam" || m.trap) { toast("⛔ Không mở tệp đính kèm từ thư lạ / thư rác!"); sound("no"); } else toast("(Mô phỏng) Mở tệp " + f.textContent.trim()); }; });
      }
      function act(k, m) {
        if (k === "back") { S2.open = null; return draw(); }
        if (k === "reply") return openCompose({ to: m.box === "sent" ? m.to : m.addr, subject: /^re:/i.test(m.subject || "") ? m.subject : "Re: " + (m.subject || ""), body: `\n\n--- Vào lúc ${m.time || ""}, ${m.box === "sent" ? S2.me.name : m.from} đã viết:\n> ${bodyOf(m).split("\n").join("\n> ")}` });
        if (k === "fwd") return openCompose({ to: "", subject: "Fwd: " + (m.subject || ""), body: `\n\n---------- Thư đã chuyển tiếp ----------\nTừ: ${m.box === "sent" ? S2.me.name : m.from}\nChủ đề: ${m.subject || ""}\n\n${bodyOf(m)}`, files: (m.files || []).slice() });
        if (k === "spam") { m.box = "spam"; toast("🚫 Đã chuyển vào Thư rác."); }
        if (k === "notspam") { m.box = "inbox"; toast("✅ Đã chuyển về Hộp thư đến."); }
        if (k === "del") { m.box = "trash"; toast("🗑️ Đã chuyển vào Thùng rác."); }
        if (k === "restore") { m.box = /^s/.test(m.id) ? "sent" : "inbox"; toast("↩️ Đã khôi phục thư."); }
        S2.open = null; save(); draw();
      }
      paintMain();
      if (S2.compose) drawCompose();
    }
    // ---- Soạn thư ----
    function openCompose(pre, isDraft) {
      S2.compose = { id: isDraft ? pre.id : null, to: pre.to || "", subject: pre.subject || "", body: pre.body || "", files: (pre.files || []).slice() };
      if (isDraft) S2.items = S2.items.filter((m) => m.id !== pre.id);
      draw();
    }
    function drawCompose() {
      const C2 = S2.compose, pane = el("div", "gm-compose-pane");
      pane.innerHTML = `<div class="gm-ch"><span>Thư mới</span><button type="button" class="gm-x" title="Lưu nháp và đóng">✕</button></div>
        <label class="gm-cf"><span>Người nhận</span><input data-f="to" autocomplete="off" spellcheck="false" placeholder="vd: thuyk39@yahoo.com"><em>Cc Bcc</em></label>
        <label class="gm-cf"><span>Chủ đề</span><input data-f="subject" autocomplete="off"></label>
        <textarea data-f="body" placeholder="Nội dung thư…"></textarea><div class="gm-att"></div><div class="gm-picker" hidden></div>
        <div class="gm-cbar"><button type="button" class="gm-send">Gửi</button><button type="button" class="gm-tool" data-t="attach" title="Đính kèm tệp">📎</button><span class="gm-cnote"></span><button type="button" class="gm-tool" data-t="discard" title="Huỷ bỏ thư nháp">🗑️</button></div>`;
      box.appendChild(pane);
      const f = (n) => pane.querySelector(`[data-f=${n}]`), note = pane.querySelector(".gm-cnote");
      ["to", "subject", "body"].forEach((n) => { f(n).value = C2[n]; f(n).oninput = () => { C2[n] = f(n).value; }; });
      const att = pane.querySelector(".gm-att"), picker = pane.querySelector(".gm-picker");
      const paintAtt = () => { att.innerHTML = C2.files.map((x, i) => `<span class="gm-file">${fileIco(x.name)} ${esc(x.name)} <button type="button" data-i="${i}" title="Bỏ tệp">✕</button></span>`).join(""); att.querySelectorAll("button").forEach((b) => { b.onclick = () => { C2.files.splice(+b.dataset.i, 1); paintAtt(); }; }); };
      paintAtt();
      pane.querySelector(".gm-x").onclick = () => { if (C2.to || C2.subject || C2.body.trim()) { S2.items.unshift({ id: "d" + Date.now(), box: "draft", to: C2.to, subject: C2.subject, body: C2.body, files: C2.files, time: mailTime(), read: true }); toast("📝 Đã lưu vào Thư nháp."); } S2.compose = null; save(); draw(); };
      pane.querySelector("[data-t=discard]").onclick = () => { S2.compose = null; draw(); toast("🗑️ Đã huỷ thư nháp."); };
      pane.querySelector("[data-t=attach]").onclick = () => {
        if (!picker.hidden) { picker.hidden = true; return; }
        picker.innerHTML = `<b>📁 Chọn tệp trên máy (mô phỏng):</b>${(spec.files || []).map((n) => `<button type="button" data-n="${esc(n)}">${fileIco(n)} ${esc(n)}</button>`).join("")}<label class="gm-real">💻 Tệp khác…<input type="file" hidden></label>`;
        picker.querySelectorAll("[data-n]").forEach((b) => { b.onclick = () => { C2.files.push({ name: b.dataset.n }); picker.hidden = true; paintAtt(); }; });
        picker.querySelector("input").onchange = (e) => { const fl = e.target.files && e.target.files[0]; if (fl) { C2.files.push({ name: fl.name }); picker.hidden = true; paintAtt(); } };
        picker.hidden = false;
      };
      pane.querySelector(".gm-send").onclick = () => {
        const list = C2.to.split(/[,;]/).map((s) => s.trim()).filter(Boolean);
        if (!list.length) { note.textContent = "⚠️ Hãy nhập ít nhất một người nhận."; f("to").focus(); return; }
        const badA = list.find((x) => !EMAIL_RE.test(x));
        if (badA) { note.textContent = `⚠️ Không nhận ra địa chỉ “${badA}”. Địa chỉ đúng có dạng <tên đăng nhập>@<địa chỉ máy chủ>.`; f("to").focus(); sound("no"); return; }
        if (!C2.subject.trim() && !confirm("Gửi thư này mà không có chủ đề?")) return;
        if (!C2.files.length && /(đính kèm|gửi kèm|kèm theo|tệp|ảnh)/i.test(C2.body) && !confirm("Có vẻ em nhắc tới tệp/ảnh đính kèm nhưng chưa đính kèm tệp nào. Vẫn gửi?")) return;
        const m = { id: "s" + Date.now(), box: "sent", to: list.join(", "), subject: C2.subject.trim(), body: C2.body, files: C2.files.slice(), time: mailTime(), read: true };
        m.checks = mailChecks(m, spec); S2.items.unshift(m); S2.compose = null; S2.folder = "sent"; S2.open = m.id; S2.lastCheck = m.checks; save();
        if (STUDENT && spec.submit) emit("onText", { key: tk, activityId: aid(a), text: mailToText({ fromName: S2.me.name, from: S2.me.address, to: m.to, subject: m.subject, files: m.files, body: m.body }) });
        draw(); toast(STUDENT && spec.submit ? "📨 Đã gửi thư (thầy/cô đã nhận được bản sao)." : "📨 Đã gửi thư."); sound("ok");
        if (m.checks.every((x) => x[1])) celebrate();
      };
      setTimeout(() => { if (window.matchMedia && matchMedia("(pointer:fine)").matches) (C2.to ? f("body") : f("to")).focus(); }, 30);
    }
    box.onclick = (e) => { const mn = box.querySelector(".gm-menu"); if (mn && !mn.contains(e.target) && !e.target.closest(".gm-avatar")) mn.remove(); };
    draw();
    if (spec.submit && STUDENT && ask("getText", tk)) wrap.appendChild(el("p", "ta-status", "✓ Thầy/cô đã nhận thư nhóm em gửi. Gửi thư mới sẽ thay bản trước."));
    if (spec.submit && !STUDENT && ask("groupTexts", tk)) { const b = el("button", "btn ghost", "📥 Xem thư các nhóm đã gửi"); b.onclick = () => mailGallery(a, tk); wrap.appendChild(wrapEl(b)); }
    return wrap;
  }
  function mailGallery(a, tk) {
    const list = ask("groupTexts", tk) || [], p = popup(`📥 Thư các nhóm đã gửi (${list.length})`, true);
    if (!list.length) { p.card.appendChild(el("p", "subtitle", "Chưa có nhóm nào gửi thư.")); return; }
    const tabs = el("div", "mm-gtabs"), stage = el("div", "gm-gallery");
    const show = (i) => { [...tabs.children].forEach((b, j) => b.classList.toggle("on", i === j)); const m = mailFromText(list[i].text); stage.innerHTML = mailReadHTML(Object.assign(m, { time: list[i].at ? new Date(list[i].at).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }) : "" }), mailChecks(m, a.mail)); };
    list.forEach((g, i) => { const b = el("button", null, esc(g.name)); b.type = "button"; b.onclick = () => show(i); tabs.appendChild(b); });
    p.card.append(tabs, stage); show(0);
  }

  // ---- CSS cho các thành phần của engine (tự chèn — bài cũ không cần sửa styles/app.css) ----
  function ensureEngineCSS() {
    if (document.getElementById("engineV5css")) return;
    const st = document.createElement("style"); st.id = "engineV5css";
    st.textContent = `
.xsheet{--xs-line:#d5d9e0;--xs-head:#eef1f5;--xs-green:#217346;margin:14px 0;border:1px solid #c5cad3;border-radius:12px;overflow:hidden;background:#fff;color:#1f2937;font-family:Calibri,"Segoe UI",Arial,sans-serif;user-select:none;-webkit-user-select:none;max-width:100%;box-shadow:0 4px 14px rgba(20,33,61,.08)}
.xsheet:focus{outline:3px solid #86efac;outline-offset:2px}
.xs-title{background:var(--xs-green);color:#fff;padding:5px 14px;font-size:.9rem;font-weight:700}
.xs-bar{display:flex;align-items:center;gap:8px;padding:7px 10px;background:#f8f9fb;border-bottom:1px solid #d9dde5}
.xs-name{min-width:86px;min-height:1.9em;padding:3px 10px;border:1.5px solid #b9bfca;background:#fff;font-weight:800;font-size:1.15rem;border-radius:4px;color:#111}
.xs-fx{color:#6b7280;font-style:italic;font-weight:700;font-family:Georgia,serif}
.xs-formula{flex:1;min-width:0;font:inherit;font-size:1.1rem;padding:4px 10px;border:1.5px solid #b9bfca;border-radius:4px;background:#fff;color:#111}
.xs-formula[readonly]{background:#fafafa}
.xs-gridwrap{overflow:hidden;touch-action:none}
.xs-grid{border-collapse:collapse;table-layout:fixed;width:100%;font-size:clamp(12px,1.55vw,19px)}
.xs-grid th{background:var(--xs-head);color:#4b5563;font-weight:600;border:1px solid var(--xs-line);height:1.95em;font-size:.86em;padding:0;overflow:hidden}
.xsheet.selectable .xs-grid th{cursor:pointer}
.xsheet.selectable .xs-grid th[data-col]{cursor:s-resize}
.xsheet.selectable .xs-grid th[data-row]{cursor:e-resize}
.xs-grid th.hsel{background:#cfe6d7;color:#0f5132;box-shadow:inset 0 -3px 0 var(--xs-green)}
.xs-grid th[data-row].hsel{box-shadow:inset -3px 0 0 var(--xs-green)}
.xs-grid td{border:1px solid var(--xs-line);height:1.95em;padding:0 6px;white-space:nowrap;overflow:visible;position:relative;text-align:left;line-height:1.2}
.xsheet.selectable .xs-grid td{cursor:cell}
.xs-grid td.clip{overflow:hidden}
.xs-grid td.num{text-align:right}
.xs-grid td.sel{box-shadow:inset 0 0 0 9999px rgba(33,115,70,.16)}
.xs-grid td.act{outline:3px solid var(--xs-green);outline-offset:-3px;z-index:1}
.xs-grid td.m-hl{box-shadow:inset 0 0 0 9999px rgba(55,65,81,.30)}
.xs-grid td.m-ans{box-shadow:inset 0 0 0 9999px rgba(22,163,74,.28)}
.xs-grid td.m-ok{box-shadow:inset 0 0 0 9999px rgba(22,163,74,.34)}
.xs-grid td.m-no{box-shadow:inset 0 0 0 9999px rgba(220,38,38,.25)}
.xs-grid td.m-target{box-shadow:inset 0 0 0 9999px rgba(250,204,21,.35)}
.xs-grid td.copied{outline:2.5px dashed var(--xs-green);outline-offset:-4px}
.xs-grid td.err{text-align:center;color:#b91c1c;font-weight:700}
.xs-hint{font-size:1.1rem;margin:6px 0;color:#334155}
.xs-expect{margin:10px 0;padding:10px 14px;border-radius:12px;background:#f0fdf4;border:2px solid #86efac;font-size:1.15rem}
.xs-grid td.m-no.m-ans{box-shadow:inset 0 0 0 9999px rgba(202,138,4,.32)}
.xsheet.locked .xs-grid td,.xsheet.locked .xs-grid th{cursor:default}
.xs-edit{position:absolute;inset:0;width:100%;height:100%;border:none;outline:3px solid var(--xs-green);outline-offset:-3px;font:inherit;padding:0 6px;background:#fff;z-index:3;box-sizing:border-box}
.xs-foot{display:flex;align-items:center;gap:6px;flex-wrap:wrap;background:#f1f3f6;border-top:1px solid #d9dde5;padding:0 8px}
.xs-tabs{display:flex;gap:2px;flex:1}
.xs-tab{padding:5px 16px;font-size:.9rem;color:#555;border-bottom:3px solid transparent}
.xs-tab.on{background:#fff;color:var(--xs-green);font-weight:700;border-bottom-color:var(--xs-green)}
.xs-tab[contenteditable=true]{outline:2px solid var(--xs-green);user-select:text;-webkit-user-select:text}
.xs-tool{border:1px solid #cbd5e1;background:#fff;border-radius:8px;padding:4px 10px;margin:4px 0;font-size:.9rem;font-weight:700;color:#334155}
.xs-selinfo{padding:7px 12px;font-size:1rem;color:#334155;background:#fafbfc;border-top:1px solid #e5e7eb;min-height:1.6em}
.xs-selinfo b{color:var(--xs-green)}
.xs-answer{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin:10px 0;font-size:1.3rem;font-weight:700}
.xs-answer input{font:inherit;font-size:1.4rem;width:9em;padding:8px 14px;border:3px solid #cbd5e1;border-radius:12px;text-transform:uppercase;letter-spacing:1px}
.xs-answer input.ok{border-color:var(--correct,#16a34a);background:#f0fdf4}
.xs-answer input.no{border-color:var(--wrong,#dc2626);background:#fef2f2}
.sandbox{background:#f6fbf7;border:2px dashed #86efac;border-radius:16px;padding:10px 16px;margin:14px 0}
.sandbox .subtitle{margin:4px 0}
.rv-list{margin:8px 0}
.rv-row{display:flex;gap:12px;align-items:center;padding:10px 16px;border-radius:12px;margin:8px 0;font-size:1.2rem;background:#f8fafc;border:2px solid #e2e8f0}
.rv-row.ok{border-color:#86efac;background:#f0fdf4}.rv-row.no{border-color:#fca5a5;background:#fef2f2}
.rv-l{font-weight:700}.rv-arrow{color:#94a3b8}
.rv-n{min-width:32px;height:32px;border-radius:50%;display:grid;place-items:center;background:#e2e8f0;font-weight:800}
.rv-mark{margin-left:auto;font-size:1.4rem}.rv-mark.ok{color:var(--correct,#16a34a)}.rv-mark.no{color:var(--wrong,#dc2626)}
.rv-fix{display:block;font-size:.85em;font-weight:600;color:var(--correct,#16a34a)}
.chip.rv-ok{border-color:var(--correct,#16a34a);background:#f0fdf4}.chip.rv-no{border-color:var(--wrong,#dc2626);background:#fef2f2}
.fill-ok{color:var(--correct,#16a34a)}.fill-bad{color:var(--wrong,#dc2626);text-decoration:line-through}
.teacher-bar{right:auto;left:20px}
.timer-panel{top:84px;bottom:auto;z-index:75;width:300px}
.timer-head{display:flex;align-items:center;justify-content:space-between;gap:8px}
.timer-close{border:none;background:#eef2f7;color:#334155;border-radius:10px;width:34px;height:34px;font-size:1.05rem;font-weight:900;cursor:pointer}
.timer-close:hover{background:#fee2e2;color:#b91c1c}
.timer-mode{font-size:.85rem;background:#eef6ff;color:#1e3a8a;border-radius:10px;padding:6px 10px;line-height:1.35}
.timer-panel button:disabled{opacity:.45;cursor:not-allowed}
.timer-panel button.end{background:#16a34a;color:#fff;border-color:#16a34a;font-weight:800}
.opt.opt-img{flex-direction:column;align-items:center;justify-content:center;gap:6px}
.opt-pic{max-height:110px;max-width:100%;border-radius:10px;background:#fff;padding:4px}
.act-links{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin:10px 0}
.act-link{text-decoration:none;display:inline-flex;align-items:center;gap:6px}
.act-link-note{color:var(--muted,#667);font-size:.95rem}
.gift-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:16px;margin:16px 0}
.gift-box{position:relative;min-height:140px;border:none;border-radius:20px;background:linear-gradient(145deg,#f472b6,#a855f7);color:#fff;font-weight:900;box-shadow:0 8px 20px rgba(168,85,247,.35);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;transition:transform .15s;cursor:pointer;padding:10px}
.gift-box:hover{transform:translateY(-4px) rotate(-2deg)}
.gift-box .gb-ico{font-size:3.2rem;line-height:1}
.gift-box .gb-num{font-size:1.8rem}
.gift-box small{font-weight:700;opacity:.9}
.gift-box.sent{background:linear-gradient(145deg,#60a5fa,#6366f1)}
.gift-box.win{background:linear-gradient(145deg,#facc15,#f59e0b);color:#422006;animation:lhGiftPop .5s ease}
.gift-box.lose{background:linear-gradient(145deg,#cbd5e1,#94a3b8);color:#1e293b}
.gift-box .gb-prize{font-size:1rem;text-align:center}
.gift-which{font-size:1.4rem;font-weight:900;color:var(--primary-dark,#333);margin:6px 0}
.gift-open{margin:16px 0;padding:18px;border-radius:18px;text-align:center;font-size:1.3rem;font-weight:800}
.gift-open.win{background:linear-gradient(135deg,#fef9c3,#fde68a);color:#713f12;animation:lhGiftPop .6s ease}
.gift-open.lose{background:#f1f5f9;color:#334155}
.gift-open .go-ico{font-size:3rem}.gift-open .go-prize{font-size:1.7rem;margin-top:6px}
@keyframes lhGiftPop{0%{transform:scale(.6);opacity:0}70%{transform:scale(1.06)}100%{transform:scale(1);opacity:1}}
.penguin-enemy{display:inline-block;transition:transform .3s}.penguin-enemy.howl{animation:shake .5s}
.mm-box{margin:14px 0}
.mm{border:2px solid #ddd6fe;border-radius:16px;background:#fffdf7;overflow:hidden;box-shadow:0 4px 14px rgba(20,33,61,.08);color:#1f2937}
.mm-title{background:#7c3aed;color:#fff;padding:5px 14px;font-weight:700;font-size:.95rem}
.mm-bar{display:flex;flex-wrap:wrap;gap:8px;align-items:center;padding:8px 10px;background:#f5f3ff;border-bottom:1px solid #e9e5fb}
.mm-tx{display:flex;align-items:center;gap:6px;flex:1 1 260px;font-weight:700}
.mm-input{flex:1;min-width:0;font:inherit;font-size:1.1rem;padding:6px 10px;border:2px solid #c4b5fd;border-radius:10px;background:#fff}
.mm-tools,.mm-kinds,.mm-afields,.mm-aact{display:flex;flex-wrap:wrap;gap:6px;align-items:center}
.mm-tools button,.mm-kinds button,.mm-aact button{border:1px solid #cbd5e1;background:#fff;border-radius:10px;padding:6px 10px;font-size:.95rem;font-weight:700;color:#334155;cursor:pointer}
.mm-tools button:hover,.mm-kinds button:hover{background:#ede9fe}
.mm-kinds button.on{background:#7c3aed;color:#fff;border-color:#7c3aed}
.mm-attach{flex-basis:100%;background:#fff;border:2px dashed #c4b5fd;border-radius:12px;padding:8px 10px;display:flex;flex-direction:column;gap:8px}
.mm-attach[hidden]{display:none}
.mm-afields input{flex:1 1 200px;min-width:0;font:inherit;font-size:1rem;padding:6px 10px;border:1.5px solid #cbd5e1;border-radius:8px}
.mm-pick{border:1px solid #cbd5e1;border-radius:8px;padding:6px 10px;cursor:pointer;font-weight:700;background:#f8fafc}
.mm-pick[hidden]{display:none}
.mm-aact .prim{background:#16a34a;color:#fff;border-color:#16a34a}
.mm-apic img{height:44px;border-radius:6px;vertical-align:middle}
.mm-wrap{position:relative;overflow:hidden;min-height:60px}
.mm-wrap.scroll{overflow-x:auto}
.mm-canvas{position:absolute;left:0;top:0;transform-origin:0 0}
.mm-lines{position:absolute;left:0;top:0;overflow:visible;pointer-events:none}
.mm-node{position:absolute;left:0;top:0;max-width:250px;padding:7px 14px;border-radius:14px;border:2.5px solid var(--c,#f97316);background:#fff;color:#1f2937;font-size:1.05rem;line-height:1.3;text-align:center;box-shadow:0 2px 6px rgba(0,0,0,.08);overflow-wrap:break-word}
.mm-node.d0{max-width:290px;padding:12px 20px;font-size:1.35rem;font-weight:800;background:#fde047;border:3px solid #ca8a04;color:#1e293b}
.mm-node.d1{font-weight:700;background:color-mix(in srgb,var(--c,#f97316) 20%,#fff)}
.mm-node.box{background:#f1f5f9;border:2px solid #94a3b8;font-weight:500;font-size:.98rem}
.mm.editable .mm-node{cursor:pointer}
.mm-node.sel{outline:4px solid #7c3aed;outline-offset:3px}
.mm-node.pop{animation:lhGiftPop .5s ease}
.mm-files{display:flex;flex-direction:column;gap:4px;margin-top:6px}
.mm-file{border:1.5px dashed #94a3b8;background:#fff;border-radius:8px;padding:3px 8px;font-size:.85rem;font-weight:700;color:#334155;cursor:pointer;text-align:left;font-family:inherit}
.mm-file:hover{background:#fef9c3;border-color:#ca8a04}
.mm-hint{font-size:.9rem;color:#475569;padding:6px 12px;background:#faf5ff;border-top:1px solid #ede9fe}
.mm-pop{position:fixed;inset:0;z-index:130;background:rgba(15,23,42,.6);display:flex;align-items:center;justify-content:center;padding:16px}
.mm-pop-card{background:#fff;color:#1f2937;border-radius:18px;width:min(760px,96vw);max-height:92vh;overflow:auto;padding:14px 18px;box-shadow:0 20px 50px rgba(0,0,0,.35);animation:lhGiftPop .3s ease}
.mm-pop-card.wide{width:96vw}
.mm-pop-head{display:flex;align-items:center;justify-content:space-between;gap:10px;font-size:1.2rem;margin-bottom:10px}
.mm-pop-x{border:none;background:#eef2f7;border-radius:10px;width:38px;height:38px;font-size:1.1rem;cursor:pointer;flex:none}
.mm-pop-body img{max-width:100%;max-height:62vh;display:block;margin:0 auto;border-radius:12px}
.mm-ph{font-size:5rem;text-align:center;background:#f1f5f9;border-radius:14px;padding:20px}
.mm-video{aspect-ratio:16/9;max-height:50vh;margin:0 auto;background:#0f172a;border-radius:14px;display:grid;place-items:center;color:#fff;font-size:4rem}
.mm-doc{white-space:pre-wrap;background:#fffef5;border:1px solid #e5e7eb;border-left:6px solid #0ea5e9;border-radius:10px;padding:14px 18px;font-size:1.12rem;line-height:1.55}
.mm-note{font-size:1.1rem;color:#334155}
.mm-gtabs{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:8px}
.mm-gtabs button{border:1px solid #cbd5e1;background:#fff;border-radius:999px;padding:6px 14px;font-weight:700;cursor:pointer;font-size:1rem}
.mm-gtabs button.on{background:#7c3aed;color:#fff;border-color:#7c3aed}
.ck-table{width:100%;border-collapse:separate;border-spacing:0;margin:12px 0;font-size:1.12rem;border:2px solid #e2e8f0;border-radius:14px;overflow:hidden;background:#fff}
.ck-table th{background:#eef2ff;color:#1e3a8a;padding:8px 10px;text-align:center}
.ck-table th:first-child{text-align:left}
.ck-table td{padding:6px 10px;border-top:1px solid #e2e8f0;text-align:center;width:130px}
.ck-table td.ck-item{text-align:left;width:auto}
.ck-btn{width:52px;height:40px;border-radius:10px;border:2.5px solid #cbd5e1;background:#fff;font-size:1.3rem;font-weight:900;cursor:pointer;color:#fff}
.ck-btn.k0.on{background:#16a34a;border-color:#16a34a}.ck-btn.k1.on{background:#f59e0b;border-color:#f59e0b}
.ck-tally h3{margin:12px 0 6px}
.ck-trow{display:grid;grid-template-columns:minmax(0,2fr) 1fr 1fr;gap:10px;align-items:center;margin:6px 0;font-size:1.05rem}
.ck-tb{position:relative;height:28px;background:#f1f5f9;border-radius:8px;overflow:hidden}
.ck-tb i{position:absolute;left:0;top:0;bottom:0}
.ck-tb.k0 i,.ck-lg.k0{background:#86efac}.ck-tb.k1 i,.ck-lg.k1{background:#fcd34d}
.ck-tb b{position:relative;padding-left:8px;line-height:28px}
.ck-legend{display:flex;gap:12px;flex-wrap:wrap}.ck-lg{padding:2px 10px;border-radius:8px}
.short-answer input{text-transform:none;letter-spacing:.5px;width:min(16em,100%)}
.cw-grid{display:grid;grid-template-columns:auto 1fr;gap:6px 10px;align-items:center;margin:14px 0;padding:14px;background:#fffbeb;border:2px solid #fcd34d;border-radius:18px;overflow-x:auto}
.cw-row{display:grid;grid-template-columns:repeat(var(--cw-cols),minmax(26px,46px));gap:4px}
.cw-num{width:40px;height:40px;border-radius:50%;border:2px solid #f59e0b;background:#fff;font-weight:900;font-size:1.05rem;color:#92400e;cursor:pointer}
.cw-num.cur{background:#f59e0b;color:#fff}.cw-num.ok{background:#16a34a;border-color:#16a34a;color:#fff}.cw-num.no{background:#fee2e2;border-color:#dc2626;color:#b91c1c}.cw-num.sent{background:#dbeafe;border-color:#3b82f6;color:#1d4ed8}
.cw-cell{aspect-ratio:1;display:grid;place-items:center;background:#fdba74;border:2px solid #f97316;border-radius:6px;font-weight:900;font-size:clamp(14px,2.2vw,26px);color:#1f2937}
.cw-cell.key{background:#86efac;border-color:#16a34a}.cw-cell.ok{animation:lhGiftPop .5s ease}.cw-cell.rev{color:#64748b}
.cw-gap{aspect-ratio:1}
.cw-kw{grid-column:1/-1;margin-top:8px;padding:10px 14px;border-radius:14px;border:2px dashed #16a34a;background:#f0fdf4;font-size:1.2rem;text-align:left;cursor:pointer}
.cw-kw b{letter-spacing:3px;color:#15803d}.cw-kw.ok{background:#16a34a;color:#fff}.cw-kw.ok b{color:#fff}.cw-kw.cur{outline:3px solid #f59e0b}
.gm-wrap{margin:14px 0}
.gm{position:relative;border:1px solid #dadce0;border-radius:16px;background:#fff;color:#202124;overflow:hidden;font-family:Roboto,"Segoe UI",Arial,sans-serif;min-height:420px;box-shadow:0 4px 14px rgba(20,33,61,.08)}
.gm-top{display:flex;align-items:center;gap:12px;padding:10px 14px;border-bottom:1px solid #eceff1;background:#f8fafd}
.gm-logo{font-size:1.3rem;color:#5f6368;white-space:nowrap}.gm-logo b{color:#ea4335;font-size:1.5rem;font-family:Georgia,serif}
.gm-search{flex:1;min-width:0;border:none;background:#eaf1fb;border-radius:24px;padding:9px 16px;font:inherit;font-size:1rem}
.gm-avatar,.gm-av{width:40px;height:40px;border-radius:50%;background:#1a73e8;color:#fff;font-weight:700;font-size:1.1rem;border:none;display:inline-grid;place-items:center;flex:none;cursor:pointer}
.gm-av.big{width:64px;height:64px;font-size:1.8rem;margin:0 auto 6px}
.gm-body{display:grid;grid-template-columns:210px minmax(0,1fr);min-height:360px}
.gm-nav{display:flex;flex-direction:column;gap:2px;padding:10px 8px;border-right:1px solid #eceff1}
.gm-compose{border:none;background:#c2e7ff;border-radius:16px;padding:14px 18px;font-weight:700;font-size:1rem;margin-bottom:8px;text-align:left;cursor:pointer;box-shadow:0 1px 3px rgba(0,0,0,.15)}
.gm-f{border:none;background:none;text-align:left;padding:8px 14px;border-radius:0 18px 18px 0;font-size:.98rem;color:#202124;cursor:pointer;display:flex;gap:6px;align-items:center}
.gm-f b{margin-left:auto;font-size:.85rem}.gm-f.on{background:#d3e3fd;font-weight:700}.gm-f:hover{background:#eceff1}
.gm-main{min-width:0;padding:4px 0}
.gm-row{display:flex;align-items:center;gap:10px;padding:10px 14px;border-bottom:1px solid #f1f3f4;cursor:pointer;font-size:.98rem;background:#f6f8fc}
.gm-row.unread{background:#fff;font-weight:700}.gm-row:hover{box-shadow:inset 0 -1px 0 #dadce0,0 1px 3px rgba(60,64,67,.2)}
.gm-star{border:none;background:none;font-size:1.25rem;color:#9aa0a6;cursor:pointer;padding:0}.gm-star.on{color:#f4b400}
.gm-from{flex:0 0 150px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.gm-subj{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#5f6368;font-weight:400}.gm-subj b{color:#202124}
.gm-row:not(.unread) .gm-subj b{font-weight:500}
.gm-time{font-size:.85rem;color:#5f6368;white-space:nowrap}
.gm-empty{padding:30px;text-align:center;color:#5f6368}
.gm-actions{display:flex;flex-wrap:wrap;gap:6px;padding:8px 12px;border-bottom:1px solid #eceff1}
.gm-actions button{border:1px solid #dadce0;background:#fff;border-radius:18px;padding:6px 12px;font-size:.92rem;cursor:pointer}
.gm-actions button:hover{background:#f1f3f4}
.gm-read{padding:12px 18px}.gm-read h2{margin:4px 0 10px;font-size:1.35rem;font-weight:500}
.gm-meta{display:flex;gap:10px;align-items:center;margin-bottom:12px}.gm-meta small{color:#5f6368}
.gm-bodytext{white-space:pre-wrap;font-size:1.08rem;line-height:1.55}
.gm-files{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}
.gm-file{display:inline-flex;align-items:center;gap:6px;border:1px solid #dadce0;border-radius:10px;padding:6px 10px;background:#f8fafd;font-size:.92rem;cursor:pointer}
.gm-file button{border:none;background:none;cursor:pointer;color:#5f6368}
.gm-checks{margin-top:14px;padding:10px 14px;border-radius:12px;background:#f8fafc;border:1px solid #e2e8f0;font-size:1rem}
.gm-checks .ok{color:#15803d}.gm-checks .no{color:#b91c1c}
.gm-alert{margin:10px 14px 0;padding:10px 14px;border-radius:10px;background:#fef3c7;border:1px solid #f59e0b;font-size:.98rem}
.gm-trap{border:none;background:linear-gradient(90deg,#f43f5e,#f59e0b);color:#fff;font-weight:900;font-size:1.15rem;padding:12px 22px;border-radius:12px;margin:0 18px;cursor:pointer}
.gm-menu{position:absolute;right:12px;top:58px;z-index:5;width:280px;background:#e9eef6;border-radius:24px;padding:16px;display:flex;flex-direction:column;align-items:center;gap:6px;box-shadow:0 8px 24px rgba(0,0,0,.2);text-align:center}
.gm-menu small{color:#444}.gm-ghost{border:1px solid #747775;background:none;border-radius:18px;padding:6px 14px;cursor:pointer;margin:4px 0}
.gm-out{border:none;background:#fff;border-radius:18px;padding:10px 22px;font-weight:700;cursor:pointer;width:100%;font-size:1rem}.gm-out:hover{background:#fee2e2}
.gm-compose-pane{position:absolute;right:14px;bottom:0;z-index:6;width:min(560px,calc(100% - 20px));background:#fff;border-radius:12px 12px 0 0;box-shadow:0 8px 30px rgba(0,0,0,.3);display:flex;flex-direction:column}
.gm-ch{display:flex;justify-content:space-between;align-items:center;background:#f2f6fc;padding:8px 14px;border-radius:12px 12px 0 0;font-weight:600}
.gm-x{border:none;background:none;font-size:1.1rem;cursor:pointer}
.gm-cf{display:flex;align-items:center;gap:8px;padding:4px 14px;border-bottom:1px solid #f1f3f4}.gm-cf span{color:#5f6368;font-size:.95rem;white-space:nowrap}.gm-cf em{color:#5f6368;font-style:normal;font-size:.9rem}
.gm-cf input{flex:1;min-width:0;border:none;font:inherit;font-size:1.02rem;padding:8px 0;outline:none}
.gm-compose-pane textarea{border:none;resize:vertical;min-height:150px;padding:10px 14px;font:inherit;font-size:1.05rem;outline:none}
.gm-att{display:flex;flex-wrap:wrap;gap:6px;padding:0 14px}
.gm-picker{margin:6px 14px;padding:10px;border:1px dashed #1a73e8;border-radius:10px;display:flex;flex-wrap:wrap;gap:6px;align-items:center}
.gm-picker button,.gm-real{border:1px solid #dadce0;background:#fff;border-radius:8px;padding:5px 10px;cursor:pointer;font-size:.92rem}
.gm-cbar{display:flex;align-items:center;gap:8px;padding:10px 14px}
.gm-send,.gm-blue{border:none;background:#0b57d0;color:#fff;border-radius:20px;padding:9px 24px;font-weight:700;font-size:1rem;cursor:pointer}
.gm-tool{border:none;background:none;font-size:1.3rem;cursor:pointer}.gm-cnote{flex:1;color:#b91c1c;font-size:.92rem}
.gm-auth{max-width:420px;margin:28px auto;padding:26px 30px;border:1px solid #dadce0;border-radius:18px;background:#fff}
.gm-auth.wide{max-width:560px}.gm-auth h3{font-size:1.5rem;font-weight:400;margin:8px 0}.gm-auth p{margin:4px 0 12px;color:#444}
.gm-glogo{font-size:1.6rem;font-family:"Product Sans",Arial,sans-serif}
.gm-chip{display:inline-block;border:1px solid #dadce0;border-radius:16px;padding:4px 12px;font-size:.92rem;margin-bottom:10px}
.gm-field{display:flex;flex-direction:column;gap:4px;margin:10px 0}.gm-field span{font-size:.88rem;color:#444}
.gm-field input{font:inherit;font-size:1.05rem;padding:10px 12px;border:1.5px solid #747775;border-radius:6px;width:100%;box-sizing:border-box}
.gm-field input:focus{outline:2px solid #0b57d0;border-color:#0b57d0}
.gm-suffix{display:flex;align-items:center;gap:6px}.gm-suffix em{font-style:normal;color:#444}
.gm-grid2{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.gm-help{color:#5f6368;font-size:.85rem}.gm-show{font-size:.95rem}
.gm-err{color:#b3261e;font-size:.95rem;min-height:1.2em;margin:6px 0}
.gm-authrow{display:flex;justify-content:space-between;align-items:center;margin-top:10px}
.gm-link{color:#0b57d0;font-weight:600;text-decoration:none}
.gm-warn{font-size:.85rem;color:#92400e!important;background:#fffbeb;border-radius:8px;padding:6px 10px;margin-top:14px!important}
.gm-toast{position:absolute;left:14px;bottom:14px;z-index:7;background:#323232;color:#fff;border-radius:6px;padding:10px 16px;font-size:.95rem;animation:lhGiftPop .3s ease}
.gm-gallery{border:1px solid #dadce0;border-radius:14px}
@media (max-width:640px){.teacher-bar{left:8px}.timer-panel{top:70px;left:8px;right:8px;width:auto}.xs-name{min-width:64px;font-size:1rem}.xs-grid{font-size:12px}.rv-row{font-size:1rem}.ck-table{font-size:.95rem}.ck-table td{width:64px}.ck-btn{width:42px}.mm-pop-card{padding:10px 12px}
.gm-body{grid-template-columns:1fr}.gm-nav{flex-direction:row;overflow-x:auto;border-right:none;border-bottom:1px solid #eceff1}.gm-f,.gm-compose{white-space:nowrap;border-radius:16px;margin:0}
.gm-from{flex-basis:90px}.gm-logo{font-size:1rem}.gm-grid2{grid-template-columns:1fr}.gm-auth{margin:12px;padding:18px}.gm-compose-pane{right:0;width:100%}
.cw-num{width:32px;height:32px}.cw-grid{padding:8px;gap:4px 6px}}`;
    document.head.appendChild(st);
  }

  // ---- FLASHCARD ---------------------------------------------------------
  function renderFlashcard(a) {
    a._ci = a._ci || 0; const cards = a.cards || [];
    const c = el("div", "card"); activityHead(a, c);
    c.appendChild(el("p", "subtitle", `Thẻ ${a._ci + 1}/${cards.length} — bấm để lật.`));
    const card = cards[a._ci] || { front: "", back: "" };
    const fc = el("div", "flashcard"); fc.innerHTML = `<div class="inner"><div class="face front">${esc(card.front)}</div><div class="face back">${esc(card.back)}</div></div>`;
    fc.onclick = () => fc.classList.toggle("flipped"); c.appendChild(fc);
    const nb = el("button", "btn", "Thẻ tiếp theo →"); nb.disabled = a._ci >= cards.length - 1; nb.onclick = () => { a._ci++; render(); };
    c.appendChild(wrapEl(nb)); view.appendChild(c);
  }

  // ---- SCENARIO (tình huống / vận dụng) ---------------------------------
  function renderScenario(a) {
    const c = el("div", "card"); activityHead(a, c); const ct = a.content || {};
    if (ct.situation) c.appendChild(el("p", "lead", esc(ct.situation)));
    if (ct.question) c.appendChild(el("p", "prompt", esc(ct.question)));
    if (ct.hints && ct.hints.length) c.appendChild(revealBox("💡 Gợi ý", () => { const b = el("div", "hint-box"); b.innerHTML = "<ul class='lead'>" + ct.hints.map(x => `<li>${esc(x)}</li>`).join("") + "</ul>"; return b; }));
    if (ct.question && STUDENT) c.appendChild(textAnswerBox(aid(a) + ":t0", a));
    if (ct.modelAnswer && showModel()) c.appendChild(revealBox("✅ Xem hướng trả lời (GV chốt)", () => el("div", "feedback ok", `<div class="explain">${esc(ct.modelAnswer)}</div>`)));
    view.appendChild(c);
    if (a.questions && a.questions.length) renderQuizInto(c, a);
  }
  // Học sinh chỉ thấy "hướng trả lời" khi giáo viên cho phép trên bảng điều khiển
  function showModel() { return !STUDENT || ask("showModel") === true; }
  // Ô trả lời tự luận của nhóm (chế độ lớp học) — gửi lại được, bản sau thay bản trước
  function textAnswerBox(key, a) {
    const box = el("div", "text-answer");
    const sent = ask("getText", key);
    const ta = el("textarea"); ta.rows = 3; ta.placeholder = "Nhập câu trả lời của nhóm em…";
    ta.value = drafts[key] != null ? drafts[key] : (sent && sent.text) || "";
    ta.oninput = () => { drafts[key] = ta.value; };
    const btn = el("button", "btn", "📨 Gửi câu trả lời");
    const st = el("span", "ta-status", sent ? "✓ Đã gửi" : "");
    btn.onclick = () => {
      const text = ta.value.trim(); if (!text) { ta.focus(); return; }
      emit("onText", { key, activityId: aid(a), text });
      st.textContent = "✓ Đã gửi lúc " + new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
      sound("ok");
    };
    const row = el("div", "ta-row"); row.append(btn, st);
    box.append(ta, row);
    return box;
  }

  // ---- REMEMBER (độc lập) -----------------------------------------------
  function renderRemember(a) { const c = el("div", "card"); activityHead(a, c); appendRemember(a.items || (a.content && a.content.items) || a.remember || [], c); view.appendChild(c); }

  // ---- PENGUIN GAME ("Cánh cụt về nhà") — quiz + đàn cánh cụt về nhà -----
  function renderPenguin(a) {
    const qs = a.questions || []; a._home = a._home || 0;
    const pst = actStateOf(a);
    if (STUDENT) a._home = pst === "open" || pst === "locked" ? 0 : qs.filter((q, i) => { const r = ask("getAttempt", qKey(a, i)); return r && judgeLocal(q, r.choice); }).length;
    // Nhân vật đổi được: pet (đang chờ), homeIcon (đã an toàn), enemy (kẻ đuổi theo), saveWord (câu chúc)
    const pet = a.pet || "🐧", homeI = a.homeIcon || "🏠", word = a.saveWord || "chú cánh cụt về nhà";
    const c = el("div", "card penguin-card");
    c.innerHTML = `<h1 class="title">${pet} ${esc(a.name)}</h1><p class="subtitle">${esc(a.intro || "Mỗi câu trả lời đúng giúp " + word + "!")}</p>`;
    const tb = taskBanner(a); if (tb) c.appendChild(tb);
    const row = el("div", "penguin-row"); let enemyEl = null;
    if (a.enemy) { ensureEngineCSS(); enemyEl = el("span", "penguin-enemy", a.enemy); row.appendChild(enemyEl); }
    const pets = [];
    for (let i = 0; i < qs.length; i++) { const k = el("span", "penguin" + (i < a._home ? " home" : ""), i < a._home ? homeI : pet); pets.push(k); row.appendChild(k); }
    c.appendChild(row); view.appendChild(c);
    c._penguin = (ok) => {
      if (ok) a._home = Math.min(qs.length, a._home + 1);
      else if (enemyEl) { enemyEl.classList.remove("howl"); void enemyEl.offsetWidth; enemyEl.classList.add("howl"); }
      pets.forEach((k, i) => { const done = i < a._home; k.textContent = done ? homeI : pet; k.classList.toggle("home", done); });
      if (a._qi >= qs.length - 1) {
        const done = el("div", "feedback ok");
        done.innerHTML = `🎉 Đã giúp <b>${a._home}/${qs.length}</b> ${esc(word)}! ` + (a._home === qs.length ? esc(a.winText || "Tất cả đều an toàn — xuất sắc!") : "Cùng ôn lại các câu chưa đúng nhé.");
        c.appendChild(done); if (a._home === qs.length) celebrate();
      }
    };
    renderQuizInto(c, a);
  }

  // ---- HỘP QUÀ MAY MẮN (type "giftbox") — lưới hộp quà, mỗi hộp 1 câu hỏi; đúng thì mở quà ----
  //   questions: [...] (mọi kiểu câu hỏi), prizes: ["👏 Tràng pháo tay", ...], boxIcon?: "🎁", groups?: [{ name, from, to }]
  function giftState(a, i) { // null (chưa mở) | "sent" (đã trả lời, chờ công bố) | true/false
    const q = (a.questions || [])[i];
    if (STUDENT) { const r = ask("getAttempt", qKey(a, i)); if (!r) return null; const st = actStateOf(a); return st === "open" || st === "locked" ? "sent" : judgeLocal(q, r.choice); }
    return a._res && i in a._res ? a._res[i] : null;
  }
  const prizeOf = (a, i) => ((a.prizes || [])[i]) || "🎉 Món quà bí mật";
  function renderGiftbox(a) {
    ensureEngineCSS();
    const qs = a.questions || [];
    if (a._box && a._qi != null) { // đang mở 1 hộp
      const c = el("div", "card"); activityHead(a, c);
      const back = el("button", "btn ghost gift-back", "← Về các hộp quà"); back.onclick = () => { a._box = false; render(); }; c.appendChild(wrapEl(back));
      c.appendChild(el("p", "gift-which", `${a.boxIcon || "🎁"} Hộp quà số ${a._qi + 1}`));
      view.appendChild(c); renderQuizInto(c, a); return;
    }
    const c = el("div", "card gift-card"); activityHead(a, c);
    if (a.intro) c.appendChild(el("p", "subtitle", esc(a.intro)));
    const grid = el("div", "gift-grid");
    qs.forEach((q, i) => {
      const s = giftState(a, i), g = (a.groups || []).find((x) => i >= x.from && i <= x.to);
      const b = el("button", "gift-box" + (s === true ? " win" : s === false ? " lose" : s === "sent" ? " sent" : ""));
      b.innerHTML = s === true ? `<span class="gb-ico">🎉</span><span class="gb-prize">${esc(prizeOf(a, i))}</span>`
        : s === false ? `<span class="gb-ico">💨</span><span class="gb-prize">Hộp số ${i + 1} — chưa mở được</span>`
        : `<span class="gb-ico">${s === "sent" ? "📨" : a.boxIcon || "🎁"}</span><span class="gb-num">${i + 1}</span>${g ? `<small>${esc(g.name)}</small>` : ""}${s === "sent" ? "<small>đã trả lời</small>" : ""}`;
      b.onclick = () => { a._qi = i; a._box = true; render(); };
      grid.appendChild(b);
    });
    c.appendChild(grid);
    const won = qs.filter((_, i) => giftState(a, i) === true).length;
    if (won) c.appendChild(el("p", "badge", `🎁 Đã mở được ${won}/${qs.length} hộp quà`));
    view.appendChild(c);
  }
  function giftAfter(a, card, ok, replay) {
    const deferred = STUDENT && ["open", "locked"].includes(actStateOf(a));
    if (!deferred) {
      const box = el("div", "gift-open " + (ok ? "win" : "lose"));
      box.innerHTML = ok ? `<div class="go-ico">🎁➡️🎉</div><div class="go-prize">${esc(prizeOf(a, a._qi))}</div>` : `<div class="go-ico">📦💨</div><div>Hộp quà chưa mở được — cố gắng ở hộp sau nhé!</div>`;
      card.appendChild(box);
      if (ok && !replay) celebrate();
    }
    const nb = el("button", "btn", "🎁 Chọn hộp quà khác"); nb.onclick = () => { a._box = false; render(); };
    card.appendChild(wrapEl(nb));
  }

  // ---- VẬN DỤNG (nhiều tình huống, bấm lộ đáp án GV chốt) ----------------
  function renderVanDung(a) {
    const c = el("div", "card"); activityHead(a, c);
    c.appendChild(el("p", "subtitle", a.intro || "Thảo luận nhóm, trả lời rồi bấm để xem hướng chốt của giáo viên."));
    (a.cases || []).forEach((cs, i) => {
      const box = el("div", "vd-case");
      box.innerHTML = `<p class="vd-q"><b>Bài ${i + 1}.</b> ${esc(cs.question)}</p>`;
      if (STUDENT) box.appendChild(textAnswerBox(aid(a) + ":t" + i, a));
      if (showModel()) box.appendChild(revealBox("💡 Xem hướng trả lời (GV chốt)", () => el("div", "feedback ok", `<div class="explain">${esc(cs.answer)}</div>`)));
      c.appendChild(box);
    });
    view.appendChild(c);
  }

  // ---- PHIẾU TỰ ĐÁNH GIÁ (type "checklist") — tick mỗi mục vào 1 cột ----------------------
  //  columns?: ["✅ Làm được", "⏳ Chưa làm được"], sections: [{ title, items: [...] }], note?: "câu hỏi mở",
  //  modelAnswer?: [..] | "…" (GV bấm mới hiện). Máy HS gửi phiếu cho GV (dạng chữ dễ đọc, texts …/t0);
  //  màn chiếu nối tiết học: "📊 Thống kê cả lớp" từng mục.
  const ckCols = (a) => a.columns || ["✅ Làm được", "⏳ Chưa làm được"];
  function ckText(a, marks, note) {
    const cols = ckCols(a), out = [];
    (a.sections || []).forEach((s, si) => { out.push(s.title); cols.forEach((cn, k) => { const its = (s.items || []).filter((_, i) => marks[si + "-" + i] === k); if (its.length) out.push(cn + ": " + its.join("; ")); }); });
    if (note && note.trim()) out.push("💬 " + (a.note || "Ý kiến") + ": " + note.trim().replace(/\s+/g, " "));
    return out.join("\n").slice(0, 2990);
  }
  function ckParse(a, text) {
    const cols = ckCols(a), marks = {}, pre = "💬 " + (a.note || "Ý kiến") + ": "; let si = -1, note = "";
    String(text || "").split("\n").forEach((ln) => {
      const s = (a.sections || []).findIndex((x) => x.title === ln.trim()); if (s >= 0) { si = s; return; }
      if (ln.indexOf(pre) === 0) { note = ln.slice(pre.length); return; }
      cols.forEach((cn, k) => { if (si >= 0 && ln.indexOf(cn + ": ") === 0) ln.slice(cn.length + 2).split("; ").forEach((t) => { const i = (a.sections[si].items || []).indexOf(t); if (i >= 0) marks[si + "-" + i] = k; }); });
    });
    return { marks, note };
  }
  function renderChecklist(a) {
    ensureEngineCSS();
    const c = el("div", "card"); activityHead(a, c);
    const cols = ckCols(a), key = aid(a) + ":t0";
    if (!a._marks) { const sent = STUDENT && ask("getText", key), p = sent ? ckParse(a, sent.text) : { marks: {}, note: "" }; a._marks = p.marks; if (drafts[key] == null && p.note) drafts[key] = p.note; }
    const marks = a._marks;
    (a.sections || []).forEach((s, si) => {
      const t = el("table", "ck-table"), tb = el("tbody");
      t.innerHTML = `<thead><tr><th>${esc(s.title)}</th>${cols.map((cn) => `<th>${esc(cn)}</th>`).join("")}</tr></thead>`;
      (s.items || []).forEach((it, i) => {
        const tr = el("tr"), id = si + "-" + i; tr.appendChild(el("td", "ck-item", esc(it)));
        const paint = () => tr.querySelectorAll(".ck-btn").forEach((x, k) => { x.classList.toggle("on", marks[id] === k); x.textContent = marks[id] === k ? "✔" : ""; });
        cols.forEach((cn, k) => { const td = el("td"), b = el("button", "ck-btn k" + k); b.type = "button"; b.title = cn; b.onclick = () => { if (marks[id] === k) delete marks[id]; else marks[id] = k; paint(); }; td.appendChild(b); tr.appendChild(td); });
        tb.appendChild(tr); paint();
      });
      t.appendChild(tb); c.appendChild(t);
    });
    let ta = null;
    if (a.note) { c.appendChild(el("p", "vd-q", "💬 " + esc(a.note))); ta = el("textarea"); ta.rows = 2; ta.placeholder = "Ghi ý kiến của nhóm em…"; ta.value = drafts[key] || ""; ta.oninput = () => { drafts[key] = ta.value; }; c.appendChild(ta); }
    if (STUDENT) {
      const sent = ask("getText", key), btn = el("button", "btn", "📨 Gửi phiếu cho thầy/cô"), st = el("span", "ta-status", sent ? "✓ Đã gửi" : "");
      btn.onclick = () => {
        if (!Object.keys(marks).length) { alert("Hãy tick ít nhất một mục trước khi gửi."); return; }
        emit("onText", { key, activityId: aid(a), text: ckText(a, marks, ta ? ta.value : "") });
        st.textContent = "✓ Đã gửi lúc " + new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }); sound("ok");
      };
      const row = el("div", "ta-row"); row.append(btn, st); c.appendChild(row);
    } else if (ask("groupTexts", key)) c.appendChild(revealBox("📊 Thống kê phiếu của cả lớp", () => ckTally(a, key)));
    if (a.modelAnswer && showModel()) c.appendChild(revealBox(a.modelLabel || "📋 Xem dự kiến sản phẩm (GV chốt)", () => { const d = el("div", "feedback ok"); d.innerHTML = Array.isArray(a.modelAnswer) ? `<ul class="lead">${a.modelAnswer.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>` : `<div class="explain">${esc(a.modelAnswer)}</div>`; return d; }));
    view.appendChild(c);
    if (a.remember && a.remember.length) appendRemember(a.remember);
  }
  function ckTally(a, key) {
    const list = ask("groupTexts", key) || [], cols = ckCols(a), parsed = list.map((g) => ckParse(a, g.text)), n = Math.max(1, list.length);
    const d = el("div", "ck-tally");
    d.innerHTML = `<p class="subtitle">${list.length} nhóm đã gửi phiếu.</p>` + (a.sections || []).map((s, si) => `<h3>${esc(s.title)}</h3>` + (s.items || []).map((it, i) => `<div class="ck-trow"><span>${esc(it)}</span>${cols.map((cn, k) => { const m = parsed.filter((p) => p.marks[si + "-" + i] === k).length; return `<span class="ck-tb k${k}" title="${esc(cn)}"><i style="width:${m / n * 100}%"></i><b>${m}</b></span>`; }).join("")}</div>`).join("")).join("")
      + `<p class="ck-legend">${cols.map((cn, k) => `<span class="ck-lg k${k}">${esc(cn)}</span>`).join("")}</p>`
      + (parsed.some((p) => p.note) ? `<h3>💬 ${esc(a.note || "Ý kiến")}</h3><ul class="lead">${list.map((g, i) => (parsed[i].note ? `<li><b>${esc(g.name)}:</b> ${esc(parsed[i].note)}</li>` : "")).join("")}</ul>` : "");
    const rb = el("button", "btn ghost", "🔄 Cập nhật"); rb.onclick = () => d.replaceWith(ckTally(a, key)); d.appendChild(wrapEl(rb));
    return d;
  }

  // ---- SUMMARY -----------------------------------------------------------
  function renderSummary(a) {
    const c = el("div", "card summary"); const ct = a.content || {};
    const learned = (ct.learned && ct.learned.length) ? ct.learned : (L.coreKnowledge || []);
    const kws = L.keywords || [];
    c.innerHTML = `<h1 class="title">🎉 Tổng kết</h1>`;
    const tb = taskBanner(a); if (tb) c.appendChild(tb);
    c.appendChild(revealBox("📚 Hôm nay em đã học (bấm để hiện)", () => { const d = el("div"); d.innerHTML = `<ul class="lead">${learned.map(x => `<li>${esc(x)}</li>`).join("")}</ul>`; return d; }));
    if (kws.length) c.insertAdjacentHTML("beforeend", `<h2>🔑 Từ khóa cần nhớ</h2><div class="keywords">${kws.map(k => `<span>${esc(k)}</span>`).join("")}</div>`);
    c.appendChild(el("p", "badge", ask("scoreText") || `⭐ Điểm của lớp: ${state.score} · 🔥 Streak cao nhất: ${state.maxStreak}`));
    view.appendChild(c);
    if (ct.challenge && ct.challenge.length) { a._chal = a._chal || { questions: ct.challenge, _keyBase: aid(a) + ":c", _parent: a }; const cc = el("div", "card"); cc.innerHTML = "<h2>🏆 Thử thách cuối</h2>"; view.appendChild(cc); renderQuizInto(cc, a._chal); }
  }

  // ---- confetti / effects ------------------------------------------------
  function celebrate() {
    const box = $("#confetti"); const colors = ["#ef4444", "#f59e0b", "#10b981", "#3b82f6", "#ec4899", "#a855f7"];
    for (let i = 0; i < 32; i++) {
      const p = el("i"); p.style.left = (40 + Math.random() * 20) + "%"; p.style.background = colors[i % colors.length];
      p.style.setProperty("--dx", (Math.random() * 240 - 120) + "px");
      p.style.setProperty("--dy", (-120 - Math.random() * 220) + "px");
      p.style.animationDelay = (Math.random() * 0.1) + "s";
      box.appendChild(p); setTimeout(() => p.remove(), 1200);
    }
  }

  // ---- lightbox (ảnh SGK) — có phóng to + kéo di chuyển ------------------
  const lbImg = $("#lbImg"), lbWrap = $("#lbWrap");
  const lbz = { scale: 1, x: 0, y: 0, drag: false, sx: 0, sy: 0, px: 0, py: 0 };
  function lbApply() { lbImg.style.transform = `translate(${lbz.x}px, ${lbz.y}px) scale(${lbz.scale})`; lbImg.style.cursor = lbz.scale > 1 ? "grab" : "zoom-in"; }
  function lbReset() { lbz.scale = 1; lbz.x = 0; lbz.y = 0; lbApply(); }
  function lbZoom(factor, cx, cy) {
    const ns = Math.min(6, Math.max(1, lbz.scale * factor));
    if (cx != null) { const r = lbWrap.getBoundingClientRect(); const ox = cx - r.left - lbz.x, oy = cy - r.top - lbz.y; const k = ns / lbz.scale; lbz.x -= ox * (k - 1); lbz.y -= oy * (k - 1); }
    lbz.scale = ns; if (ns === 1) { lbz.x = 0; lbz.y = 0; } lbApply();
  }
  function openLightbox(src) { lbImg.src = src; $("#lightbox").hidden = false; lbReset(); }
  $("#lbClose").onclick = () => { $("#lightbox").hidden = true; };
  $("#lightbox").onclick = (e) => { if (e.target.id === "lightbox") $("#lightbox").hidden = true; };
  $("#lbZoomIn").onclick = () => lbZoom(1.3);
  $("#lbZoomOut").onclick = () => lbZoom(1 / 1.3);
  $("#lbZoomReset").onclick = lbReset;
  lbWrap.addEventListener("wheel", (e) => { e.preventDefault(); lbZoom(e.deltaY < 0 ? 1.15 : 1 / 1.15, e.clientX, e.clientY); }, { passive: false });
  lbImg.addEventListener("dblclick", (e) => lbZoom(lbz.scale > 1 ? 0.001 : 2, e.clientX, e.clientY));
  lbWrap.addEventListener("mousedown", (e) => { if (lbz.scale <= 1) return; lbz.drag = true; lbz.sx = e.clientX; lbz.sy = e.clientY; lbz.px = lbz.x; lbz.py = lbz.y; lbImg.style.cursor = "grabbing"; e.preventDefault(); });
  window.addEventListener("mousemove", (e) => { if (!lbz.drag) return; lbz.x = lbz.px + (e.clientX - lbz.sx); lbz.y = lbz.py + (e.clientY - lbz.sy); lbApply(); });
  window.addEventListener("mouseup", () => { if (lbz.drag) { lbz.drag = false; lbApply(); } });

  // ---- ĐÈN PIN (spotlight) & KHUNG PHÓNG TO -----------------------------
  // Hai công cụ "tập trung": loại trừ lẫn nhau và loại trừ với bút vẽ.
  const focus = { tool: null, spotR: 150, spotX: window.innerWidth / 2, spotY: window.innerHeight / 2 };
  const spotEl = $("#spotlight"), zoomLayer = $("#zoomLayer");
  function paintSpot() { spotEl.style.background = `radial-gradient(circle ${focus.spotR}px at ${focus.spotX}px ${focus.spotY}px, rgba(0,0,0,0) 0, rgba(0,0,0,0) ${focus.spotR}px, rgba(0,0,0,.82) ${focus.spotR + 34}px)`; }
  function setFocusTool(tool) {
    focus.tool = (focus.tool === tool) ? null : tool;
    if (focus.tool) setPenMode(null, true); // tắt bút khi bật công cụ tập trung
    spotEl.hidden = focus.tool !== "spotlight";
    zoomLayer.hidden = focus.tool !== "zoomRect";
    $("#btnSpotlight").classList.toggle("on", focus.tool === "spotlight");
    $("#btnZoomRect").classList.toggle("on", focus.tool === "zoomRect");
    if (focus.tool === "spotlight") paintSpot();
  }
  window.addEventListener("mousemove", (e) => { if (focus.tool === "spotlight") { focus.spotX = e.clientX; focus.spotY = e.clientY; paintSpot(); } });
  window.addEventListener("wheel", (e) => { if (focus.tool === "spotlight") { e.preventDefault(); focus.spotR = Math.min(500, Math.max(60, focus.spotR + (e.deltaY < 0 ? 22 : -22))); paintSpot(); } }, { passive: false });
  $("#btnSpotlight").onclick = () => setFocusTool("spotlight");
  $("#btnZoomRect").onclick = () => setFocusTool("zoomRect");

  // Kéo chọn 1 vùng -> phóng to vùng đó lấp đầy màn hình (theo chiều dài nhất)
  let selRect = null, selStart = null;
  function zlPos(e) { const t = e.touches ? e.touches[0] : e; return { x: t.clientX, y: t.clientY }; }
  function zlDown(e) { selStart = zlPos(e); selRect = el("div", "sel-rect"); document.body.appendChild(selRect); e.preventDefault(); }
  function zlMove(e) {
    if (!selStart || !selRect) return; e.preventDefault(); const p = zlPos(e);
    const x = Math.min(p.x, selStart.x), y = Math.min(p.y, selStart.y), w = Math.abs(p.x - selStart.x), h = Math.abs(p.y - selStart.y);
    Object.assign(selRect.style, { left: x + "px", top: y + "px", width: w + "px", height: h + "px" });
  }
  function zlUp(e) {
    if (!selStart || !selRect) return; const p = zlPos(e);
    const x = Math.min(p.x, selStart.x), y = Math.min(p.y, selStart.y), w = Math.abs(p.x - selStart.x), h = Math.abs(p.y - selStart.y);
    selRect.remove(); selRect = null; selStart = null;
    if (w > 30 && h > 30) openMagnify({ x, y, w, h });
  }
  zoomLayer.addEventListener("mousedown", zlDown); zoomLayer.addEventListener("mousemove", zlMove); window.addEventListener("mouseup", (e) => { if (selStart) zlUp(e); });
  zoomLayer.addEventListener("touchstart", zlDown, { passive: false }); zoomLayer.addEventListener("touchmove", zlMove, { passive: false }); zoomLayer.addEventListener("touchend", zlUp);

  function openMagnify(rect) {
    const vw = window.innerWidth, vh = window.innerHeight;
    const scale = rect.w >= rect.h ? vw / rect.w : vh / rect.h; // chiều dài nhất lấp đầy màn hình
    const overlay = el("div", "magnify-overlay");
    const wrap = el("div", "magnify-wrap");
    const clone = document.getElementById("app").cloneNode(true);
    ["#penCanvas", "#confetti", ".controls", ".topbar", "#teacherBar", "#timerPanel", "#lightbox", "#spotlight", "#zoomLayer"].forEach((sel) => { const n = clone.querySelector(sel); if (n) n.style.visibility = "hidden"; });
    Object.assign(clone.style, { position: "absolute", top: "0", left: "0", width: vw + "px", minHeight: vh + "px", margin: "0" });
    wrap.appendChild(clone); overlay.appendChild(wrap);
    const sw = rect.w * scale, sh = rect.h * scale;
    const tx = (vw - sw) / 2 - rect.x * scale, ty = (vh - sh) / 2 - rect.y * scale;
    wrap.style.transformOrigin = "0 0"; wrap.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;
    overlay.appendChild(el("div", "magnify-hint", "Bấm để đóng · Esc"));
    overlay.onclick = () => overlay.remove();
    document.body.appendChild(overlay); focus.magEl = overlay;
  }

  // ---- utils -------------------------------------------------------------
  function shuffle(arr) { for (let i = arr.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [arr[i], arr[j]] = [arr[j], arr[i]]; } return arr; }
  function beep(freq, ms, vol) { try { const ctx = new (window.AudioContext || window.webkitAudioContext)(); const o = ctx.createOscillator(); const g = ctx.createGain(); o.connect(g); g.connect(ctx.destination); o.frequency.value = freq; g.gain.value = vol || 0.06; o.start(); setTimeout(() => { o.stop(); ctx.close(); }, ms); } catch (e) {} }
  // Chuông vui khi ĐÚNG (chuỗi nốt đi lên) / tiếng trầm nhẹ khi SAI.
  function tone(ctx, freq, start, dur, type, vol) {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type || "sine"; o.frequency.value = freq; o.connect(g); g.connect(ctx.destination);
    const t0 = ctx.currentTime + start;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(vol || 0.15, t0 + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.start(t0); o.stop(t0 + dur + 0.03);
  }
  function chime() { try { const ctx = new (window.AudioContext || window.webkitAudioContext)(); [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => tone(ctx, f, i * 0.09, 0.20, "sine", 0.16)); setTimeout(() => ctx.close(), 900); } catch (e) {} }
  function buzz() { try { const ctx = new (window.AudioContext || window.webkitAudioContext)(); tone(ctx, 196, 0, 0.18, "triangle", 0.14); tone(ctx, 146.83, 0.14, 0.26, "triangle", 0.14); setTimeout(() => ctx.close(), 800); } catch (e) {} }
  // Kèn chiến thắng + tiếng vỗ tay (tạo bằng Web Audio, không cần file)
  function fanfare() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      [[523.25, 0], [659.25, 0.14], [783.99, 0.28], [1046.5, 0.42]].forEach(([f, t]) => tone(ctx, f, t, 0.22, "triangle", 0.18));
      [523.25, 659.25, 783.99, 1046.5].forEach((f) => tone(ctx, f, 0.62, 0.9, "triangle", 0.1));
      const len = ctx.sampleRate * 2.2, buf = ctx.createBuffer(1, len, ctx.sampleRate), d = buf.getChannelData(0);
      for (let i = 0; i < len; i++) { const t = i / ctx.sampleRate, clap = (Math.sin(t * 90) > 0.2 ? 1 : 0.25) * Math.random(); d[i] = (Math.random() * 2 - 1) * clap * Math.max(0, 1 - t / 2.2) * 0.35; }
      const src = ctx.createBufferSource(), g = ctx.createGain(), bp = ctx.createBiquadFilter(); bp.type = "bandpass"; bp.frequency.value = 1800; bp.Q.value = 0.7;
      src.buffer = buf; src.connect(bp); bp.connect(g); g.connect(ctx.destination); g.gain.value = 0.9; src.start(ctx.currentTime + 0.5);
      setTimeout(() => ctx.close(), 3200);
    } catch (e) { /* không có âm thanh */ }
  }
  function sound(kind) { if (!S.sound) return; kind === "ok" ? chime() : buzz(); }

  // ---- TIMER -------------------------------------------------------------
  function fmt(s) { const m = Math.floor(s / 60); return m + ":" + String(s % 60).padStart(2, "0"); }
  function resetTimerForActivity() {
    stopTimer();
    const a = state.view === "activity" ? L.activities[state.idx] : null;
    timer.total = timer.remaining = (a && a.time) || S.defaultTime || 60;
    updateTimerUI(); $("#timerChip").hidden = true; $("#app").classList.remove("time-up");
    lastShared = null; syncShared();
  }
  function updateTimerUI() { $("#timerBig").textContent = fmt(timer.remaining); $("#timerText").textContent = fmt(timer.remaining); }
  function startTimer() {
    if (timer.running || timer.remaining <= 0) return;
    timer.running = true; $("#timerChip").hidden = false; $("#app").classList.remove("time-up");
    timer.tick = setInterval(() => {
      timer.remaining--; updateTimerUI();
      if (timer.remaining <= 0) { stopTimer(); timeUp(); }
    }, 1000);
  }
  function stopTimer() { if (timer.tick) clearInterval(timer.tick); timer.tick = null; timer.running = false; }
  function timeUp() { $("#app").classList.add("time-up"); beep(660, 200); setTimeout(() => beep(520, 260), 240); const chip = $("#timerChip"); chip.classList.add("blink"); setTimeout(() => chip.classList.remove("blink"), 4000); }
  function addTime(d) { timer.remaining = Math.max(0, timer.remaining + d); timer.total = Math.max(timer.total, timer.remaining); updateTimerUI(); $("#app").classList.remove("time-up"); }
  // ĐỒNG HỒ CHUNG (v5): trang trình chiếu đang nối với tiết học -> hook timer (student.js) trả về đồng hồ
  // của lớp; ⏱️ điều khiển đúng đồng hồ đó (cùng bảng 📊 và bảng GV). Mở file trực tiếp -> đồng hồ riêng như cũ.
  const sharedT = () => { const t = HOOK.timer; if (!t || typeof t.state !== "function") return null; try { return t.state(); } catch (e) { return null; } };
  const tAct = (action, sec) => Promise.resolve(HOOK.timer.act(action, sec)).catch((e) => alert("⚠️ " + (e.message || e)));
  let lastShared = null;
  function syncShared() {
    const k = sharedT(), follow = !!(k && k.follow);
    $("#timerMode").hidden = !k; $("#timerFollowRow").hidden = !(k && follow && k.hasItems);
    if (!k) { if (lastShared) updateTimerUI(); lastShared = null; $("#timerHint").textContent = "Hết giờ sẽ báo hiệu; giáo viên chủ động bấm tiếp."; ["#timerStart", "#timerPause", "#timerReset"].forEach((s) => { $(s).disabled = false; }); return; }
    stopTimer(); $("#timerChip").hidden = true; // chữ đồng hồ trên thanh tiêu đề do student.js vẽ (.lh-clock)
    $("#timerMode").innerHTML = "🔗 <b>Đồng hồ chung của lớp</b> — hiện trên máy HS, bảng 📊 và bảng điều khiển.";
    $("#timerHint").textContent = follow ? "Theo nhịp GV: hết giờ máy HS bị khóa; bấm 🏁 để công bố đúng/sai." : "HS tự làm: đồng hồ hiện trên máy HS, hết giờ chỉ báo (không khóa).";
    const a = state.view === "activity" ? L.activities[state.idx] : null;
    $("#timerBig").textContent = k.st === "revealed" ? "🏁" : (k.st === "locked" || k.over) ? "0:00" : fmt(Math.ceil(k.hasTimer ? k.left : (a && a.time) || S.defaultTime || 60));
    $("#timerStart").disabled = k.running || k.st === "revealed" || k.st === "locked" || k.over;
    $("#timerPause").disabled = !k.running;
    $("#timerEnd").hidden = k.st === "revealed"; $("#timerReopen").hidden = k.st !== "revealed";
    if (lastShared && lastShared.running && !k.running && (k.over || k.st === "locked")) timeUp();
    lastShared = k;
  }
  if (HOOK.timer) setInterval(syncShared, 500);
  const curTime = () => { const a = state.view === "activity" ? L.activities[state.idx] : null; return (a && a.time) || S.defaultTime || 60; };
  $("#btnTimer").onclick = () => { const p = $("#timerPanel"); p.hidden = !p.hidden; if (!p.hidden) syncShared(); };
  $("#timerClose").onclick = () => { $("#timerPanel").hidden = true; };
  $("#timerStart").onclick = () => (sharedT() ? tAct("start", curTime()) : startTimer());
  $("#timerPause").onclick = () => (sharedT() ? tAct("pause") : stopTimer());
  $("#timerReset").onclick = () => { if (sharedT()) return tAct("reset", curTime()); stopTimer(); timer.remaining = timer.total; updateTimerUI(); $("#timerChip").hidden = true; $("#app").classList.remove("time-up"); };
  $("#timerEnd").onclick = () => tAct("end");
  $("#timerReopen").onclick = () => tAct("reopen", curTime());
  [...document.querySelectorAll("#timerPanel [data-d]")].forEach(b => b.onclick = () => (sharedT() ? tAct("add", +b.dataset.d) : addTime(+b.dataset.d)));

  // ---- BÚT VẼ / BÚT DẠ QUANG / TẨY --------------------------------------
  // pen.mode: null | "pen" | "highlight" | "eraser". Điều khiển bằng icon trên
  // thanh dưới (luôn bấm được vì thanh nằm TRÊN lớp canvas). Chọn lại cùng công
  // cụ = thoát chế độ vẽ. Canvas chỉ phủ vùng nội dung nên vẫn bấm được nút.
  const canvas = $("#penCanvas");
  const TOOL = {
    pen: { color: "#ef4444", width: 4, comp: "source-over", btn: "btnPen" },
    highlight: { color: "rgba(250,204,21,0.22)", width: 24, comp: "source-over", btn: "btnHighlight" },
    eraser: { color: "#000", width: 34, comp: "destination-out", btn: "btnEraser" },
  };
  function sizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; pen.ctx = canvas.getContext("2d"); }
  function clearPenCanvas() { if (pen.ctx) pen.ctx.clearRect(0, 0, canvas.width, canvas.height); }
  function setPenMode(mode, fromFocus) {
    pen.mode = (pen.mode === mode) ? null : mode; // bấm lại công cụ đang chọn -> thoát
    canvas.hidden = !pen.mode;
    ["btnPen", "btnHighlight", "btnEraser"].forEach(id => $("#" + id).classList.toggle("on", pen.mode && TOOL[pen.mode].btn === id));
    if (pen.mode && !fromFocus && typeof focus !== "undefined" && focus.tool) setFocusTool(focus.tool); // bật bút -> tắt công cụ tập trung
    if (pen.mode && (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight)) sizeCanvas();
  }
  function penPos(e) { const t = e.touches ? e.touches[0] : e; return { x: t.clientX, y: t.clientY }; }
  function penDown(e) { if (!pen.mode) return; pen.drawing = true; pen.last = penPos(e); e.preventDefault(); }
  function penMove(e) {
    if (!pen.mode || !pen.drawing) return; e.preventDefault();
    const p = penPos(e), ctx = pen.ctx, t = TOOL[pen.mode];
    ctx.lineJoin = ctx.lineCap = "round";
    ctx.globalCompositeOperation = t.comp; ctx.strokeStyle = t.color; ctx.lineWidth = t.width;
    ctx.beginPath(); ctx.moveTo(pen.last.x, pen.last.y); ctx.lineTo(p.x, p.y); ctx.stroke(); pen.last = p;
  }
  function penUp() { pen.drawing = false; }
  canvas.addEventListener("mousedown", penDown); canvas.addEventListener("mousemove", penMove); window.addEventListener("mouseup", penUp);
  canvas.addEventListener("touchstart", penDown, { passive: false }); canvas.addEventListener("touchmove", penMove, { passive: false }); canvas.addEventListener("touchend", penUp);
  window.addEventListener("resize", () => { if (pen.mode) sizeCanvas(); });
  $("#btnPen").onclick = () => setPenMode("pen");
  $("#btnHighlight").onclick = () => setPenMode("highlight");
  $("#btnEraser").onclick = () => setPenMode("eraser");
  $("#btnPenClear").onclick = clearPenCanvas; // xóa hết nét, giữ nguyên công cụ đang chọn

  // ---- teacher mode ------------------------------------------------------
  const tbar = $("#teacherBar");
  const jump$ = $("#tJump");
  jump$.innerHTML = "<option>— Nhảy tới hoạt động —</option>" + L.activities.map((a, i) => `<option value="${i}">${i + 1}. ${esc(a.name)}</option>`).join("");
  jump$.onchange = () => { if (jump$.value !== "") jump(+jump$.value); };
  $("#tShowAns").onclick = () => { state.showAnswers = !state.showAnswers; render(); };
  function clearActivity(a) { (a.questions || []).concat((a.content && a.content.challenge) || []).forEach((q) => { delete q._store; }); ["_qi", "_ci", "_chal", "_wrong", "_checked", "_home", "_draft", "_rorder", "_porder", "_sandbox", "_box", "_res", "_marks"].forEach((k) => delete a[k]);
    if (a.mail && !STUDENT) { const k = a.mail.key || aid(a); delete mailMem[k]; try { localStorage.removeItem("lh_mail:" + ((L.meta && L.meta.title) || "") + ":" + k); } catch (e) {} }
    if (a.mindmap && a.mindmap.editable && !STUDENT) { const k = a.mindmap.key || aid(a); delete mmMem[k]; try { localStorage.removeItem("lh_mm:" + ((L.meta && L.meta.title) || "") + ":" + k); } catch (e) {} }
  }
  // Làm lại hoạt động: đang nối tiết học -> xóa kết quả hoạt động này của CẢ LỚP (máy HS tự mở lại để làm)
  $("#tReset").onclick = async () => {
    const a = state.view === "activity" ? L.activities[state.idx] : null; if (!a) return;
    if (ask("classMode")) {
      if (!confirm(`Cho CẢ LỚP làm lại hoạt động “${a.name}”?
Kết quả hoạt động này của tất cả các nhóm sẽ bị xóa; máy học sinh tự mở lại để làm.`)) return;
      try { await HOOK.resetActivity(aid(a)); } catch (e) { alert("⚠️ " + (e.message || e)); return; }
    }
    clearActivity(a); render();
  };
  $("#tResetScore").onclick = () => { state.score = 0; state.streak = 0; state.maxStreak = 0; setScore(); };
  function toggleTeacher() { if (STUDENT) return; state.teacher = !state.teacher; tbar.classList.toggle("show", state.teacher); }

  // API cho máy chủ lớp học (student.js) điều khiển — không bị chặn bởi canNav
  window.LessonApp = {
    go(i) { if (i < 0 || i >= L.activities.length) state.view = "home"; else { state.view = "activity"; state.idx = i; } render(); },
    rerender: () => render(),
    resetActivity(id) { L.activities.forEach((a) => { if (!id || aid(a) === id) clearActivity(a); }); render(); },
    current: () => (state.view === "home" ? -1 : state.idx),
    celebrate, // pháo giấy (dùng cho màn cổ vũ / vinh danh của lớp học)
    fanfare: () => { if (S.sound) fanfare(); }, // kèn chiến thắng + vỗ tay (theo nút 🔊)
  };

  // ---- controls & keyboard ----------------------------------------------
  $("#btnNext").onclick = next; $("#btnPrev").onclick = prev;
  $("#btnFull").onclick = toggleFull;
  function updateSoundBtn() { const b = $("#btnSound"); b.textContent = S.sound ? "🔊" : "🔇"; b.classList.toggle("on", S.sound); }
  $("#btnSound").onclick = () => { S.sound = !S.sound; updateSoundBtn(); if (S.sound) chime(); };
  updateSoundBtn();
  function toggleFull() { if (!document.fullscreenElement) document.documentElement.requestFullscreen && document.documentElement.requestFullscreen(); else document.exitFullscreen && document.exitFullscreen(); }

  document.addEventListener("keydown", (e) => {
    const typing = /input|textarea|select/i.test(e.target.tagName);
    if (typing && e.key !== "Escape") return;
    switch (e.key) {
      case "ArrowRight": case " ": e.preventDefault(); next(); break;
      case "ArrowLeft": prev(); break;
      case "f": case "F": toggleFull(); break;
      case "t": case "T": toggleTeacher(); break;
      case "p": case "P": setPenMode("pen"); break;
      case "h": case "H": setPenMode("highlight"); break;
      case "1": case "2": case "3": case "4": {
        if (pen.mode) break;
        const opts = view.querySelector(".options"); if (opts) { const b = opts.children[+e.key - 1]; b && b.click(); }
        break;
      }
      case "Enter": { const b = view.querySelector(".card .btn:not(:disabled)"); if (b) b.click(); break; }
      case "Escape": { const m = $(".magnify-overlay"); if (m) { m.remove(); e.stopPropagation(); } else if (!$("#lightbox").hidden) { $("#lightbox").hidden = true; } else if (!$("#timerPanel").hidden) { $("#timerPanel").hidden = true; } break; }
    }
  });

  // ---- renderer registry -------------------------------------------------
  const RENDERERS = {
    intro: renderKnowledge, explore: renderKnowledge, knowledge: renderKnowledge,
    quiz: renderQuiz, matching: renderMatching, dragdrop: renderDragDrop,
    ordering: renderOrdering, fillblank: renderFillBlank, flashcard: renderFlashcard,
    scenario: renderScenario, remember: renderRemember, summary: renderSummary,
    penguin: renderPenguin, vandung: renderVanDung, giftbox: renderGiftbox, checklist: renderChecklist, crossword: renderCrossword,
  };

  render();
})();
