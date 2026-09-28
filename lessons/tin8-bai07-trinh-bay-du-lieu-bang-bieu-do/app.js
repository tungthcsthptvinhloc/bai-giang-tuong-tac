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
 *  - window.LessonApp = { go, rerender, resetActivity, classPause } cho máy chủ điều khiển.
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
 *  - Bảng tính mô phỏng TÍNH CÔNG THỨC (=C4*D4, + - * / ^ %, ngoặc, so sánh, SUM/AVERAGE/MAX/MIN/COUNT/COUNTIF/COUNTIFS/SUMIF/IF):
 *    ô hiện kết quả, sửa dữ liệu -> tự cập nhật; Ctrl+C / Ctrl+V (nút 📋 📥) và NÚT KÉO ĐIỀN (ô vuông góc vùng chọn)
 *    sao chép công thức tự dời địa chỉ. Dấu ; cũng được dùng ngăn cách tham số như Excel tiếng Việt.
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
    if (q.type === "short") return shortMatch(q.answer, choice, q.exact);
    if (q.type === "abacus") return choice !== "" && abDigits(choice) === abDigits(q.answer);
    if (q.type === "true-false") return choice === q.answer;
    if (q.type === "multiple-select") return JSON.stringify([...(choice || [])].map(Number).sort()) === JSON.stringify([...(q.answer || [])].sort());
    return choice === q.answer;
  }
  // Dòng nhắc trạng thái khi làm bài theo nhịp GV
  function deferNote(st, done, kind) {
    const t = st === "locked" ? (done ? "⏰ Hết giờ! Nhóm em đã " + (kind !== "whole" ? "trả lời" : "nộp bài") + " — chờ thầy/cô công bố kết quả." : "⏰ Hết giờ! Nhóm em chưa " + (kind !== "whole" ? "trả lời câu này" : "nộp bài") + " — tính là chưa hoàn thành.")
      : kind === "quiz" ? (done ? "✔ Đã ghi nhận. Có thể đổi đáp án đến khi thầy/cô kết thúc." : "👆 Chọn đáp án. Đúng/sai sẽ được công bố khi thầy/cô kết thúc.")
      : kind === "sheet" ? (done ? "✔ Đã ghi nhận lựa chọn. Có thể chọn lại đến khi thầy/cô kết thúc." : "👆 Thực hiện trên bảng tính. Đúng/sai sẽ được công bố khi thầy/cô kết thúc.")
      : kind === "abacus" ? (done ? "✔ Đã ghi nhận. Có thể gẩy lại đến khi thầy/cô kết thúc." : "👆 Gẩy hạt trên bàn tính. Đúng/sai sẽ được công bố khi thầy/cô kết thúc.")
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
  // q.exact (VD gõ công thức bảng tính): chỉ bỏ khoảng trắng, dấu = ở đầu và không phân biệt hoa/thường — GIỮ các kí hiệu $ * + … (PHẢI khớp normExact trong core.js)
  const normExact = (s) => String(s == null ? "" : s).replace(/\s+/g, "").replace(/^=/, "").toUpperCase();
  const shortMatch = (answer, choice, exact) => { const n = exact ? normExact : normShort; return !!n(choice) && (Array.isArray(answer) ? answer : [answer]).some((x) => n(x) === n(choice)); };
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
  //  Hỗ trợ: + - * / ^ %, & (nối chữ), so sánh = <> > < >= <=, TRUE/FALSE, SUM/AVERAGE/MAX/MIN/COUNT/COUNTIF/COUNTIFS/SUMIF/IF (lồng nhau)
  //  FX.evalCell(data, addr) -> số | "" | chữ | TRUE/FALSE | "#LỖI!"…   data = { "C4": "25", "E4": "=C4*D4" }
  //  FX.shift("=C4*D4", 1, 0) -> "=C5*D5" (sao chép công thức: giữ vị trí tương đối)
  //  FX.judge(answer, choice, spec, target) -> { ok, fraction } — chấm câu "gõ công thức" bằng cách thử đổi dữ liệu
  const FX = (function () {
    const colN = (s) => [...String(s).toUpperCase()].reduce((t, ch) => t * 26 + ch.charCodeAt(0) - 64, 0) - 1;
    const colS = (n) => { let s = ""; n++; while (n > 0) { const m = (n - 1) % 26; s = String.fromCharCode(65 + m) + s; n = Math.floor((n - 1) / 26); } return s; };
    const ERR = (e) => { throw { fxErr: e }; };
    const isNum = (s) => /^[-+]?(\d+(\.\d*)?|\.\d+)$/.test(String(s).trim());
    function lex(src) {
      const s = String(src), out = []; let i = 0, m;
      while (i < s.length) {
        const rest = s.slice(i);
        if (/^\s/.test(rest)) { i++; continue; }
        if ((m = /^["“”]([^"“”]*)["“”]/.exec(rest))) { out.push({ t: "str", v: m[1] }); i += m[0].length; continue; } // chữ "Hà Nội"
        if ((m = /^([A-Za-z]{2,})\s*\(/.exec(rest)) && !/^[A-Za-z]{1,3}\d/.test(rest)) { out.push({ t: "fn", v: m[1].toUpperCase() }); i += m[0].length - 1; continue; }
        if ((m = /^\$?([A-Za-z]{1,3}):\$?([A-Za-z]{1,3})(?![\dA-Za-z(])/.exec(rest))) { out.push({ t: "rng", c1: colN(m[1]), r1: 1, c2: colN(m[2]), r2: 1000 }); i += m[0].length; continue; } // cả cột B:B
        if ((m = /^\$?([A-Za-z]{1,3})\$?(\d+)(?::\$?([A-Za-z]{1,3})\$?(\d+))?/.exec(rest))) { out.push(m[3] ? { t: "rng", c1: colN(m[1]), r1: +m[2], c2: colN(m[3]), r2: +m[4] } : { t: "ref", c: colN(m[1]), r: +m[2] }); i += m[0].length; continue; }
        if ((m = /^(\d+(?:\.\d+)?|\.\d+)/.exec(rest))) { out.push({ t: "num", v: parseFloat(m[1]) }); i += m[1].length; continue; }
        if ((m = /^(TRUE|FALSE)(?![A-Za-z\d(])/i.exec(rest))) { out.push({ t: "bool", v: m[1].toUpperCase() === "TRUE" }); i += m[0].length; continue; }
        if ((m = /^(<=|>=|<>|<|>|=)/.exec(rest))) { out.push({ t: "cmp", v: m[1] }); i += m[1].length; continue; } // so sánh: N3>50%
        if ("+-*/^(),;%&".includes(s[i])) { out.push({ t: s[i] === ";" ? "," : s[i] }); i++; continue; }
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
      function cmp() { let a = cat(); while (peek() === "cmp") { const op = tk[p++].v; a = { k: "cmp", op, a, b: cat() }; } return a; }
      function cat() { let a = expr(); while (peek() === "&") { p++; a = { k: "cat", a, b: expr() }; } return a; }
      function prim() { let a = atom(); while (peek() === "%") { p++; a = { k: "pct", a }; } return a; } // 50% = 0.5
      function atom() {
        const x = tk[p];
        if (!x) ERR("#LỖI!");
        if (x.t === "num") { p++; return { k: "num", v: x.v }; }
        if (x.t === "str") { p++; return { k: "str", v: x.v }; }
        if (x.t === "ref") { p++; return { k: "ref", c: x.c, r: x.r }; }
        if (x.t === "bool") { p++; return { k: "bool", v: x.v }; }
        if (x.t === "(") { p++; const e = cmp(); eat(")"); return e; }
        if (x.t === "fn") { p++; eat("("); const args = []; if (peek() !== ")") { do { if (peek() === "rng") { const r = tk[p++]; args.push({ k: "rng", ...r }); } else args.push(cmp()); } while (peek() === "," && ++p); } eat(")"); return { k: "fn", name: x.v, args }; }
        ERR("#LỖI!");
      }
      const e = cmp(); if (p !== tk.length) ERR("#LỖI!"); return e;
    }
    // Điều kiện của COUNTIF: ">100", "Yes", "Y*" (* ? là kí tự đại diện), 30, ô D2… — chữ không phân biệt hoa/thường
    function critFn(cr) {
      if (typeof cr === "number") return (v) => typeof v === "number" && v === cr;
      let s = String(cr), op = "="; const m = /^(<=|>=|<>|<|>|=)/.exec(s); if (m) { op = m[1]; s = s.slice(op.length); }
      const low = (x) => String(x).normalize("NFC").toLowerCase();
      if (s.trim() !== "" && isNum(s)) {
        const k = parseFloat(s);
        if (op === "<>") return (v) => typeof v !== "number" || v !== k;
        return (v) => typeof v === "number" && (op === "=" ? v === k : op === ">" ? v > k : op === "<" ? v < k : op === ">=" ? v >= k : v <= k);
      }
      if (op === "=" || op === "<>") {
        const re = new RegExp("^" + low(s).replace(/~([*?~])|([*?])|[.+^${}()|[\]\\\/-]/g, (x, lit, w) => (lit ? "\\" + lit : w ? (w === "*" ? "[\\s\\S]*" : "[\\s\\S]") : "\\" + x)) + "$");
        const hit = (v) => (s === "" ? v === "" || v == null : typeof v === "string" && v !== "" && re.test(low(v)));
        return op === "=" ? hit : (v) => !hit(v);
      }
      return (v) => { if (typeof v !== "string" || v === "" || v.charAt(0) === "#") return false; const c = low(v).localeCompare(low(s), "vi"); return op === ">" ? c > 0 : op === "<" ? c < 0 : op === ">=" ? c >= 0 : c <= 0; };
    }
    // =COUNTIF(range, criteria) · =COUNTIFS(range1, criteria1, range2, criteria2, …) (mở rộng)
    function countIf(n, get) {
      const a = n.args; if (!a.length || a.length % 2 || (n.name === "COUNTIF" && a.length !== 2)) ERR("#LỖI!");
      let size = null; const tests = [];
      for (let i = 0; i < a.length; i += 2) {
        const R = a[i].k === "rng" ? a[i] : a[i].k === "ref" ? { c1: a[i].c, c2: a[i].c, r1: a[i].r, r2: a[i].r } : ERR("#VALUE!");
        const w = Math.abs(R.c2 - R.c1) + 1, h = Math.abs(R.r2 - R.r1) + 1;
        if (size && (size.w !== w || size.h !== h)) ERR("#VALUE!"); size = { w, h };
        const x = a[i + 1]; let cr;
        if (x.k === "str") cr = x.v;
        else if (x.k === "ref") { cr = get(x.c, x.r); if (cr === "" || cr == null) cr = 0; else if (typeof cr === "string" && cr.charAt(0) === "#") ERR(cr); }
        else if (x.k === "rng") ERR("#VALUE!");
        else cr = evalV(x, get);
        tests.push({ c1: Math.min(R.c1, R.c2), r1: Math.min(R.r1, R.r2), f: critFn(cr) });
      }
      let cnt = 0;
      for (let dr = 0; dr < size.h; dr++) for (let dc = 0; dc < size.w; dc++) if (tests.every((t) => t.f(get(t.c1 + dc, t.r1 + dr)))) cnt++;
      return cnt;
    }
    // =SUMIF(range, criteria, [sum_range]) — sum_range bắt đầu ở ô đầu của vùng và có cùng kích thước với range (như Excel)
    function sumIf(n, get) {
      const a = n.args; if (a.length < 2 || a.length > 3) ERR("#LỖI!");
      const box = (x) => (x.k === "rng" ? { c1: Math.min(x.c1, x.c2), r1: Math.min(x.r1, x.r2), c2: Math.max(x.c1, x.c2), r2: Math.max(x.r1, x.r2) } : x.k === "ref" ? { c1: x.c, r1: x.r, c2: x.c, r2: x.r } : ERR("#VALUE!"));
      const R = box(a[0]), S = a[2] ? box(a[2]) : R, x = a[1]; let cr;
      if (x.k === "str") cr = x.v;
      else if (x.k === "ref") { cr = get(x.c, x.r); if (cr === "" || cr == null) cr = 0; else if (typeof cr === "string" && cr.charAt(0) === "#") ERR(cr); }
      else if (x.k === "rng") ERR("#VALUE!");
      else cr = evalV(x, get);
      const f = critFn(cr); let sum = 0;
      for (let dr = 0; dr <= R.r2 - R.r1; dr++) for (let dc = 0; dc <= R.c2 - R.c1; dc++) {
        if (!f(get(R.c1 + dc, R.r1 + dr))) continue;
        const v = get(S.c1 + dc, S.r1 + dr);
        if (typeof v === "number") sum += v; else if (typeof v === "string" && v.charAt(0) === "#") ERR(v);
      }
      return sum;
    }
    const PCT = /^[-+]?(\d+(\.\d*)?|\.\d+)%$/;
    // Giá trị -> số trong phép toán (chữ số "5", "5%" đổi được như Excel; chữ khác -> #VALUE!)
    function toNum(v) {
      if (typeof v === "number") return v; if (typeof v === "boolean") return v ? 1 : 0; if (v === "" || v == null) return 0;
      const s = String(v).trim(); if (s.charAt(0) === "#") ERR(s);
      if (isNum(s)) return parseFloat(s); if (PCT.test(s)) return parseFloat(s) / 100; ERR("#VALUE!");
    }
    // So sánh như Excel: số < chữ < TRUE/FALSE; chữ không phân biệt hoa/thường; ô trống = 0 hoặc ""
    function cmpV(a, b, op) {
      if (a === "" && typeof b === "number") a = 0; if (b === "" && typeof a === "number") b = 0;
      if (a === "" && typeof b === "boolean") a = false; if (b === "" && typeof a === "boolean") b = false;
      const rk = (v) => (typeof v === "number" ? 0 : typeof v === "string" ? 1 : 2);
      let c = rk(a) - rk(b);
      if (!c) c = typeof a === "number" ? (Math.abs(a - b) <= 1e-12 * Math.max(1, Math.abs(a), Math.abs(b)) ? 0 : a - b)
        : typeof a === "string" ? String(a).normalize("NFC").localeCompare(String(b).normalize("NFC"), "vi", { sensitivity: "accent" }) : (a ? 1 : 0) - (b ? 1 : 0);
      return op === "=" ? c === 0 : op === "<>" ? c !== 0 : op === ">" ? c > 0 : op === "<" ? c < 0 : op === ">=" ? c >= 0 : c <= 0;
    }
    const txtV = (v) => (typeof v === "boolean" ? (v ? "TRUE" : "FALSE") : typeof v === "number" ? String(Math.round(v * 1e9) / 1e9) : String(v == null ? "" : v));
    const valOf = (n, get) => { const v = evalV(n, get); return v === "" && n.k === "ref" ? 0 : v; }; // =A1 (ô trống) -> 0
    function evalV(n, get) {
      if (n.k === "num" || n.k === "str" || n.k === "bool") return n.v;
      if (n.k === "ref") { const v = get(n.c, n.r); if (typeof v === "string" && v.charAt(0) === "#") ERR(v); return v == null ? "" : v; }
      if (n.k === "rng") ERR("#VALUE!");
      if (n.k === "neg") return -toNum(evalV(n.a, get));
      if (n.k === "pct") return toNum(evalV(n.a, get)) / 100;
      if (n.k === "cat") return txtV(valOf(n.a, get)) + txtV(valOf(n.b, get));
      if (n.k === "cmp") return cmpV(evalV(n.a, get), evalV(n.b, get), n.op);
      if (n.k === "bin") {
        const a = toNum(evalV(n.a, get)), b = toNum(evalV(n.b, get));
        if (n.op === "+") return a + b; if (n.op === "-") return a - b; if (n.op === "*") return a * b;
        if (n.op === "/") { if (b === 0) ERR("#DIV/0!"); return a / b; }
        return Math.pow(a, b);
      }
      if (n.k === "fn") {
        // =IF(logical_test, [value_if_true], [value_if_false]) — chỉ tính nhánh được chọn (IF lồng nhau)
        if (n.name === "IF") {
          const a = n.args; if (a.length < 2 || a.length > 3) ERR("#LỖI!");
          const t = evalV(a[0], get); let ok;
          if (typeof t === "boolean") ok = t; else if (typeof t === "number") ok = t !== 0; else if (t === "") ok = false;
          else { const u = String(t).toUpperCase(); if (u !== "TRUE" && u !== "FALSE") ERR("#VALUE!"); ok = u === "TRUE"; }
          return ok ? valOf(a[1], get) : a[2] ? valOf(a[2], get) : false;
        }
        if (n.name === "COUNTIF" || n.name === "COUNTIFS") return countIf(n, get);
        if (n.name === "SUMIF") return sumIf(n, get);
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
    const evalAst = (n, get) => toNum(evalV(n, get)); // giá trị dùng trong phép toán
    // Giá trị hiển thị của 1 ô (tính công thức, phát hiện tham chiếu vòng)
    function evalCell(data, addr, seen) {
      const raw = data[addr]; if (raw == null || raw === "") return "";
      const s = String(raw);
      if (s.charAt(0) !== "=") return isNum(s) ? parseFloat(s) : PCT.test(s.trim()) ? parseFloat(s) / 100 : s; // 5% -> 0.05 như Excel
      seen = seen || {}; if (seen[addr]) return "#VÒNG!";
      seen[addr] = 1;
      try { const ast = parse(s.slice(1)); let v = evalV(ast, (c, r) => evalCell(data, colS(c) + r, seen)); if (v === "" && ast.k === "ref") v = 0; delete seen[addr]; return typeof v === "number" && !isFinite(v) ? "#NUM!" : v; }
      catch (e) { delete seen[addr]; if (e && e.fxErr) return e.fxErr; throw e; }
    }
    const fmt = (v) => (typeof v === "number" || typeof v === "boolean" ? txtV(v) : v);
    // Sao chép công thức: dời các địa chỉ theo (dr hàng, dc cột); địa chỉ có $ giữ nguyên
    function shift(src, dr, dc) {
      let bad = false;
      const out = String(src).split(/(["“”][^"“”]*["“”])/).map((part, i) => (i % 2 ? part : part.replace(/(^|[^A-Za-z$\d])(\$?)([A-Za-z]{1,3})(\$?)(\d+)(?![\d(A-Za-z])/g, (m, pre, dC, col, dR, row) => {
        const c = dC ? colN(col) : colN(col) + dc, r = dR ? +row : +row + dr;
        if (c < 0 || r < 1) { bad = true; return m; }
        return pre + dC + colS(c) + dR + r;
      }))).join(""); // chữ trong ngoặc kép ("HS01", ">100") giữ nguyên
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
      // Lượt thử cuối: ô chữ / ô trống trong lưới cũng thành số (dữ liệu được cập nhật) -> công thức bỏ sót ô sẽ lộ ra
      let maxR = +(spec && spec.rows) || 0, maxC = +(spec && spec.cols) || 0;
      Object.keys(cells).forEach((k) => { const mm = /^([A-Z]+)(\d+)$/.exec(k); if (mm) { maxR = Math.max(maxR, +mm[2]); maxC = Math.max(maxC, colN(mm[1]) + 1); } });
      const blanks = [];
      for (let r = 1; r <= Math.min(maxR, 200); r++) for (let c = 0; c < Math.min(maxC, 60); c++) { const ad = colS(c) + r, v = cells[ad]; if ((v == null || (!isNum(v) && String(v).charAt(0) !== "=")) && !list.some((x) => x.ad === ad)) blanks.push(ad); }
      const trials = [null, 1, 2, 3, 4].map((t) => { const d = Object.assign({}, cells); if (t) vars.forEach((k) => { d[k] = String(rnd()); }); if (t === 4) blanks.forEach((k) => { d[k] = String(rnd()); }); return d; });
      // Câu đếm theo chữ (COUNTIF…): spec.vary = vùng dữ liệu chữ được xáo lại -> công thức chọn sai vùng sẽ lộ ra
      const pool = [], vcells = [];
      [].concat((spec && spec.vary) || []).forEach((ad) => {
        const mm = /^([A-Z]+)(\d+)(?::([A-Z]+)(\d+))?$/.exec(String(ad).toUpperCase().replace(/[$\s]/g, "")); if (!mm) return;
        const a1 = colN(mm[1]), b1 = +mm[2], a2 = mm[3] ? colN(mm[3]) : a1, b2 = mm[4] ? +mm[4] : b1;
        for (let r = Math.min(b1, b2); r <= Math.max(b1, b2); r++) for (let c = Math.min(a1, a2); c <= Math.max(a1, a2); c++) {
          const k = colS(c) + r; if (list.some((x) => x.ad === k)) continue;
          vcells.push(k); if (cells[k] != null && pool.indexOf(cells[k]) < 0) pool.push(cells[k]);
        }
      });
      // spec.tests: bộ dữ liệu thử do GV đặt, VD ngưỡng của IF [{ B2: 10000, B3: 10001 }, …] -> sai điều kiện (> hay >=, sai mốc) sẽ lộ ra
      [].concat((spec && spec.tests) || []).forEach((t) => { const d = Object.assign({}, cells); Object.entries(t || {}).forEach(([k, v]) => { d[String(k).toUpperCase()] = String(v); }); trials.push(d); });
      if (pool.length) [1, 2, 3].forEach(() => { const d = Object.assign({}, cells); vcells.forEach((k) => { d[k] = pool[rnd() % pool.length]; }); trials.push(d); });
      const nt = (v) => String(v).normalize("NFC").trim().replace(/\s+/g, " ").toLowerCase();
      const sameV = (a, b) => (typeof a === "number" && typeof b === "number" ? Math.abs(a - b) <= 1e-9 * Math.max(1, Math.abs(b))
        : typeof a === "string" && typeof b === "string" ? a.charAt(0) !== "#" && b.charAt(0) !== "#" && nt(a) === nt(b) : typeof a === "boolean" && a === b); // IF trả về chữ: so khớp chữ
      let good = 0;
      list.forEach((x, i) => {
        const f = String(got[i] || "").trim(), ref = shift(answer, x.dr, x.dc);
        if (f.charAt(0) !== "=") return;
        const hasRef = (s) => /(^|[^A-Za-z])\$?[A-Za-z]{1,3}\$?\d/.test(s);
        if (!hasRef(f) && hasRef(ref)) return; // gõ thẳng kết quả (=35) -> sai
        const same = trials.every((d) => {
          const ds = Object.assign({}, d), dr = Object.assign({}, d);
          list.forEach((y, j) => { ds[y.ad] = String(got[j] || "").trim(); dr[y.ad] = shift(answer, y.dr, y.dc); });
          const a = evalCell(ds, x.ad), b = evalCell(dr, x.ad);
          return sameV(a, b);
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
      <button class="icon-btn" id="btnPauseClass" title="Tạm dừng cả lớp — che màn hình tất cả máy HS" hidden>⏸️</button>
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
      if (b.kind === "chart") return `<div class="diagram">${chartHTML(b.value)}</div>`;
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
    if (a.html) { const hv = el("div", "kn-blocks"); hv.innerHTML = a.html; cardEl.appendChild(hv); } // hình minh hoạ hiện luôn cho trò chơi (ghép đôi, phân loại…)
    if (a.chart) { const cv = el("div", "kn-blocks"); cv.innerHTML = chartHTML(a.chart); cardEl.appendChild(cv); } // biểu đồ minh hoạ (spec)
    if (a.sandbox) cardEl.appendChild(sandboxBox(a));
    if (a.mindmap) cardEl.appendChild(mindmapBox(a));
    if (a.mail) cardEl.appendChild(mailBox(a));
    if (a.password) cardEl.appendChild(passwordBox(a));
    if (a.runner) cardEl.appendChild(runnerBox(a));
    if (a.search) cardEl.appendChild(a.search.mode === "binary" ? binaryBox(a) : searchBox(a));
    if (a.guess) cardEl.appendChild(guessBox(a));
    if (a.sorter) cardEl.appendChild(sorterBox(a));
    if (a.ifmachine) cardEl.appendChild(ifBox(a));
    if (a.maze) cardEl.appendChild(mazeBox(a));
    if (a.algo) cardEl.appendChild(algoBox(a));
    if (a.scratch) cardEl.appendChild(scratchBox(a));
    if (a.abacus) cardEl.appendChild(abacusBox(a));
    if (a.vonneumann) cardEl.appendChild(vnBox(a));
    if (a.spread) cardEl.appendChild(spreadBox(a));
    if (a.listsim) cardEl.appendChild(listsimBox(a)); // mô phỏng danh sách dạng liệt kê
    if (a.wrapsim) cardEl.appendChild(wrapsimBox(a)); // mô phỏng Wrap Text
    if (a.flyer) cardEl.appendChild(flyerBox(a)); // thiết kế tờ rơi kéo thả
    if (a.hfsim) cardEl.appendChild(hfsimBox(a)); // hộp thoại Header and Footer (PowerPoint)
    if (a.colorsim) cardEl.appendChild(colorsimBox(a)); // phối màu trang chiếu
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
    if (ct.html) { const hv = el("div", "kn-blocks"); hv.innerHTML = ct.html; c.appendChild(hv); } // HTML hiện luôn (hội thoại, sơ đồ mở đầu) — nội dung tin cậy do GV soạn
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
      <p class="prompt">${esc(a.type === "chat" ? q.prompt || "💬 Em sẽ trả lời thế nào?" : q.question)}</p>`;
    card.appendChild(wrap);
    const sb = sgkButton(q.sgkImage); if (sb) card.appendChild(sb);
    if (q.image) { const im = el("div"); im.innerHTML = imageHTML(q.image, q.imageCaption); card.appendChild(im); }
    if (q.chart) { const cv = el("div"); cv.innerHTML = chartHTML(q.chart); card.appendChild(cv); }
    if (q.html) { const hv = el("div", "kn-blocks"); hv.innerHTML = q.html; card.appendChild(hv); } // hình HTML riêng của câu (nội dung tin cậy do GV soạn)
    const answered = { done: false };

    card._key = qKey(a, a._qi); card._a = a;
    if (q.type === "sheet") return sheetQuestionFree(card, a, q, answered);
    if (q.type === "short") return shortQuestionFree(card, a, q, answered);
    if (q.type === "abacus") return abacusQuestionFree(card, a, q, answered);
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
    if (card._a && (card._a.type === "giftbox" || card._a.type === "crossword" || card._a.type === "ladder")) (card._a._res = card._a._res || {})[card._a._qi] = ok;
    if (ok) { let pts = S.basePoints; if (S.streakEnabled) { state.streak++; pts = Math.round(pts * Math.min(2, 1 + (state.streak - 1) * 0.2)); } state.maxStreak = Math.max(state.maxStreak, state.streak); state.score += pts; celebrate(); }
    else { state.streak = 0; card.classList.add("shake"); setTimeout(() => card.classList.remove("shake"), 500); }
    setScore();
    const badge = el("div", "answer-badge " + (ok ? "ok" : "no"), ok ? "✓" : "✗");
    card.appendChild(badge); setTimeout(() => badge.remove(), 900);
    emit("onAttempt", { key: card._key, activityId: card._a ? aid(card._a._parent || card._a) : "", ok, fraction: ok ? 1 : 0, choice });
    answerFeedback(ok, q, card, false);
    sound(ok ? "ok" : "no");
    if (card._penguin) card._penguin(ok); // cập nhật đàn cánh cụt (trò chơi penguin)
    if (card._ladder) card._ladder(ok); // trò chơi 2 đội leo bậc thang
    if (card._cw) card._cw(); // lật hàng ô chữ
    if (card._chat) card._chat(ok, choice); // khung chat: thêm tin nhắn trả lời
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
    head.appendChild(el("p", "prompt", esc(a.type === "chat" ? q.prompt || "💬 Em sẽ trả lời thế nào?" : q.question)));
    card.appendChild(head);
    const sb = sgkButton(q.sgkImage); if (sb) card.appendChild(sb);
    if (q.image) { const im = el("div"); im.innerHTML = imageHTML(q.image, q.imageCaption); card.appendChild(im); }
    if (q.chart) { const cv = el("div"); cv.innerHTML = chartHTML(q.chart); card.appendChild(cv); }
    if (q.html) { const hv = el("div", "kn-blocks"); hv.innerHTML = q.html; card.appendChild(hv); } // hình HTML riêng của câu (nội dung tin cậy do GV soạn)
    if (q.type === "sheet") return sheetQuestionDeferred(card, a, qs, q, key, rec, st);
    if (q.type === "short") return shortQuestionDeferred(card, a, qs, q, key, rec, st);
    if (q.type === "abacus") return abacusQuestionDeferred(card, a, qs, q, key, rec, st);
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
        if (card._chatPick) card._chatPick(choice);
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
  // Vùng thả của phân loại. a.layout "ifchain": groups = [điều kiện 1, kết quả khi đúng, điều kiện 2, kết quả khi đúng, …, kết quả khi mọi điều kiện sai]
  //  -> xếp thành sơ đồ khối IF / IF lồng nhau (Đúng ➜ sang phải, Sai ⬇ xuống điều kiện tiếp theo)
  // a.layout "vonneumann": 4 nhóm [Thiết bị vào, Bộ xử lí, Bộ nhớ, Thiết bị ra] xếp như sơ đồ cấu trúc máy tính · "cols": các nhóm thành hàng cột
  function ddZones(a, make) {
    const groups = a.groups || [];
    if (a.layout === "vonneumann") { // groups: [Thiết bị vào, Bộ xử lí, Bộ nhớ, Thiết bị ra] -> xếp như Hình 1.3 (Tin 8 Bài 1)
      const w = el("div", "vn-sim vn-dd"), core = el("div", "vn-core");
      core.append(make(groups[1], 1), el("div", "vn-bus", "<span>⬇</span><span>⬆</span>"), make(groups[2], 2));
      w.append(make(groups[0], 0), el("div", "vn-arr", "➜"), core, el("div", "vn-arr", "➜"), make(groups[3], 3)); return w;
    }
    if (a.layout === "cols") { const w = el("div", "dd-cols"); groups.forEach((g, gi) => w.appendChild(make(g, gi))); return w; } // nhiều nhóm xếp thành hàng cột (bảng)
    if (a.layout !== "ifchain") { const w = el("div", "two-col"); groups.forEach((g, gi) => w.appendChild(make(g, gi))); return w; }
    const w = el("div", "ifc"), n = groups.length;
    for (let gi = 0; gi + 1 < n; gi += 2) {
      const row = el("div", "ifc-row"), cz = make(groups[gi], gi), rz = make(groups[gi + 1], gi + 1);
      cz.classList.add("ifc-cond"); rz.classList.add("ifc-res");
      row.append(cz, el("span", "ifc-yes", "Đúng ➜"), rz); w.append(row, el("div", "ifc-no", "⬇ Sai"));
    }
    if (n % 2) { const z = make(groups[n - 1], n - 1); z.classList.add("ifc-res", "ifc-else"); w.appendChild(z); }
    return w;
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
        const zones = ddZones(a, (g, gi) => {
          const z = el("div", "dropzone", `<h3>${esc(g)}</h3>`);
          porder.filter((it) => d[it.i] === gi).forEach((it) => { const ok = it.group === gi; z.appendChild(el("div", "chip " + (ok ? "rv-ok" : "rv-no"), `${ok ? "✓" : "✗"} ${esc(it.text)}${ok ? "" : `<small class="rv-fix">→ đúng: ${esc(groups[it.group] || "?")}</small>`}`)); });
          return z;
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
        const zones = ddZones(a, (g, gi) => {
          const z = el("div", "dropzone", `<h3>${esc(g)}</h3>`);
          porder.filter((it) => d[it.i] === gi).forEach((it) => z.appendChild(chip(it)));
          if (en) z.onclick = () => { if (ui.sel != null) { d[ui.sel] = gi; ui.sel = null; redraw(); } };
          return z;
        });
        box.append(pool, zones);
      },
    };
    return ui;
  }
  // Sơ đồ khối: a.flow = ["term","io","proc","cond",…] (cùng thứ tự với steps ĐÚNG) → mỗi bước là một hình khối
  //  term: Bắt đầu/Kết thúc (hình oval) · io: Đầu vào/Đầu ra (hình bình hành) · proc: Bước xử lí (hình chữ nhật) · cond: kiểm tra điều kiện (hình thoi)
  const FC_SHAPES = { term: 1, io: 1, proc: 1, cond: 1 };
  const fcNode = (text, shape) => `<span class="fc-node fc-${FC_SHAPES[shape] ? shape : "proc"}">${esc(text)}</span>`;
  // Khối lệnh Scratch: a.blocks = ["event","looks","sensing","variables","operators","control","motion","sound"] (cùng thứ tự steps ĐÚNG)
  const SB_CATS = { event: 1, looks: 1, sensing: 1, variables: 1, operators: 1, control: 1, motion: 1, sound: 1 };
  const sbNode = (text, cat) => `<span class="sb sb-${SB_CATS[cat] ? cat : "control"}${cat === "event" ? " sb-hat" : ""}">${esc(text)}</span>`;
  const stepHTML = (a, i) => (a.flow ? fcNode((a.steps || [])[i], a.flow[i]) : a.blocks ? sbNode((a.steps || [])[i], a.blocks[i]) : esc((a.steps || [])[i]));
  function orderingUI(a) {
    const steps = a.steps || [];
    return {
      valid: (ch) => !!(ch && toArr(ch.o).length === steps.length),
      init: (ch) => { const o = toArr(ch && ch.o); return o.length === steps.length ? o.map(Number) : shuffle(steps.map((_, i) => i)); },
      complete: () => true,
      score: (d) => ({ good: d.filter((s, pos) => s === pos).length, total: steps.length, choice: { o: d.slice() } }),
      review(d) {
        const box = el("div", "rv-list");
        d.forEach((s, pos) => { const ok = s === pos; box.appendChild(el("div", "rv-row " + (ok ? "ok" : "no"), `<span class="rv-n">${pos + 1}</span><span>${stepHTML(a, s)}${ok ? "" : `<small class="rv-fix">Bước này đúng ra ở vị trí ${s + 1}</small>`}</span>${mark(ok)}`)); });
        return box;
      },
      draw(box, d, en, redraw) {
        box.appendChild(el("p", "subtitle", a.flow ? "Dùng ▲▼ để ghép các hình khối thành sơ đồ khối đúng rồi bấm Nộp bài." : a.blocks ? "Dùng ▲▼ để ghép các khối lệnh thành chương trình Scratch đúng rồi bấm Nộp bài." : "Dùng ▲▼ để sắp đúng thứ tự rồi bấm Nộp bài."));
        const list = el("ul", "order-list" + (a.flow ? " fc-list" : a.blocks ? " sb-list" : ""));
        d.forEach((s, pos) => {
          const li = el("li", null, `<span>${stepHTML(a, s)}</span>`), up = el("button", null, "▲"), dn = el("button", null, "▼");
          up.disabled = !en || pos === 0; dn.disabled = !en || pos === d.length - 1;
          up.onclick = () => { [d[pos - 1], d[pos]] = [d[pos], d[pos - 1]]; redraw(); };
          dn.onclick = () => { [d[pos + 1], d[pos]] = [d[pos], d[pos + 1]]; redraw(); };
          const ctrl = el("span"); ctrl.append(up, dn); li.appendChild(ctrl); list.appendChild(li);
        });
        box.appendChild(list);
      },
    };
  }
  // Đoạn chữ của câu điền khuyết: gộp khoảng trắng, "\n" = xuống dòng
  const fillSegHTML = (seg) => String(seg).split("\n").map((t) => esc(t.replace(/[ \t\r]+/g, " "))).join("<br>");
  const fillSegNodes = (p, seg) => String(seg).split("\n").forEach((t, k) => { if (k) p.appendChild(document.createElement("br")); p.appendChild(document.createTextNode(t.replace(/[ \t\r]+/g, " "))); });
  // Ô trống dạng chọn: a.choices = ["Đúng","Sai"] (dùng chung) hoặc [[…],[…]] (từng ô); không có -> ô gõ chữ
  function blankInput(a, i) {
    const ch = a.choices && (Array.isArray(a.choices[0]) ? a.choices[i] : a.choices);
    if (!ch || !ch.length) return el("input");
    const s = el("select", "fill-sel"); s.innerHTML = '<option value="">— chọn —</option>' + ch.map((o) => `<option>${esc(o)}</option>`).join(""); return s;
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
        p.innerHTML = parts.map((seg, i) => fillSegHTML(seg) + (i < n ? (good(d[i], i) ? `<b class="fill-ok"> ${esc(d[i])} ✓</b>` : `<b class="fill-bad"> ${esc(d[i] || "…")} </b><b class="fill-ans">${esc((a.answers[i] || [""])[0])}</b>`) : "")).join("");
        return p;
      },
      draw(box, d, en, redraw, changed) {
        const p = el("p", "prompt");
        parts.forEach((seg, i) => { fillSegNodes(p, seg); if (i < n) { const inp = blankInput(a, i); inp.value = d[i]; inp.disabled = !en; inp.oninput = inp.onchange = () => { d[i] = inp.value; changed(); }; p.appendChild(inp); } });
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
    const answerHTML = ddZones(a, (g, gi) => el("div", "dropzone", `<h3>${esc(g)}</h3>${all.filter(it => it.group === gi).map(it => `<div class="chip done">${esc(it.text)}</div>`).join("")}`)).outerHTML;
    if (STUDENT) return renderWholeStudent(c, a, key, actStateOf(a), answerHTML, dragdropUI(a, all));
    c.appendChild(el("p", "subtitle", "Chọn một thẻ rồi bấm vào nhóm đúng."));
    const pool = el("div"); const zoneEls = [];
    const wrong = a._wrong || (a._wrong = new Set());
    let sel = null, placed = 0; const items = shuffle(all.slice());
    (a.groups || []).forEach((g, gi) => { const z = el("div", "dropzone"); z.innerHTML = `<h3>${esc(g)}</h3>`; z.onclick = () => { if (!sel) return; const correct = +sel.dataset.g === gi; if (correct) { sel.classList.add("done"); z.appendChild(sel); sel.classList.remove("selected"); sel = null; placed++; celebrate(); if (placed === items.length) finishDD(c, a, wrong, items.length); } else { wrong.add(sel.dataset.i); z.classList.add("shake"); sound("no"); setTimeout(() => z.classList.remove("shake"), 400); } }; zoneEls[gi] = z; });
    const zonesWrap = ddZones(a, (g, gi) => zoneEls[gi]);
    items.forEach((it) => { const ch = el("div", "chip", esc(it.text)); ch.dataset.g = it.group; ch.dataset.i = it.i; ch.onclick = () => { if (ch.classList.contains("done")) return; [...pool.children].forEach(x => x.classList.remove("selected")); ch.classList.add("selected"); sel = ch; }; pool.appendChild(ch); });
    c.append(pool, zonesWrap); view.appendChild(c);
  }
  function finishDD(c, a, wrong, total) { state.score += S.basePoints; setScore(); finishMulti(c, a, wrong, total, "✓ Phân loại xong!"); }

  // ---- ORDERING ----------------------------------------------------------
  function renderOrdering(a) {
    const c = el("div", "card"); activityHead(a, c);
    const key = aid(a) + ":main";
    const answerHTML = a.flow ? `<div class="fc-chart">${(a.steps || []).map((_, i) => stepHTML(a, i)).join('<span class="fc-arrow">↓</span>')}</div>` : a.blocks ? `<div class="sb-stack">${(a.steps || []).map((_, i) => stepHTML(a, i)).join("")}</div>` : `<ol class="lead">${(a.steps || []).map(s => `<li>${esc(s)}</li>`).join("")}</ol>`;
    if (STUDENT) return renderWholeStudent(c, a, key, actStateOf(a), answerHTML, orderingUI(a));
    c.appendChild(el("p", "subtitle", a.flow ? "Dùng ▲▼ để ghép các hình khối thành sơ đồ khối đúng rồi bấm Kiểm tra." : a.blocks ? "Dùng ▲▼ để ghép các khối lệnh thành chương trình Scratch đúng rồi bấm Kiểm tra." : "Dùng ▲▼ để sắp đúng thứ tự rồi bấm Kiểm tra."));
    let order = (a.steps || []).map((s, i) => ({ s, i })); order = shuffle(order.slice());
    const list = el("ul", "order-list" + (a.flow ? " fc-list" : a.blocks ? " sb-list" : ""));
    function draw() { list.innerHTML = ""; order.forEach((o, pos) => { const li = el("li"); li.innerHTML = `<span>${stepHTML(a, o.i)}</span>`; const up = el("button", null, "▲"), dn = el("button", null, "▼"); up.onclick = () => { if (pos > 0) { [order[pos - 1], order[pos]] = [order[pos], order[pos - 1]]; draw(); } }; dn.onclick = () => { if (pos < order.length - 1) { [order[pos + 1], order[pos]] = [order[pos], order[pos + 1]]; draw(); } }; const ctrl = el("span"); ctrl.append(up, dn); li.appendChild(ctrl); list.appendChild(li); }); }
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
    const answerHTML = `<p class="prompt">${parts.map((seg, i) => fillSegHTML(seg) + (i < parts.length - 1 ? `<b class="fill-ans"> ${esc((a.answers[i] || [""])[0])} </b>` : "")).join("")}</p>`;
    if (STUDENT) return renderWholeStudent(c, a, key, actStateOf(a), answerHTML, fillblankUI(a, parts));
    const p = el("p", "prompt");
    const inputs = [];
    parts.forEach((seg, i) => { fillSegNodes(p, seg); if (i < parts.length - 1) { const inp = blankInput(a, i); inputs.push(inp); p.appendChild(inp); } });
    c.appendChild(p);
    const btn = el("button", "btn", "Kiểm tra");
    btn.onclick = () => {
      let good = 0; inputs.forEach((inp, i) => { const accepts = (a.answers[i] || []).map(norm); const g = accepts.includes(norm(inp.value)); inp.style.borderColor = g ? "var(--correct)" : "var(--wrong)"; if (g) good++; });
      const ok = good === inputs.length;
      if (ok) { state.score += S.basePoints; setScore(); btn.disabled = true; celebrate(); } const fb = el("div", "feedback " + (ok ? "ok" : "no")); fb.innerHTML = `${ok ? "🎉 Chính xác!" : "❌ Chưa đúng."}<div class="explain">${esc(a.explanation || "")}</div>`; c.appendChild(fb); sound(ok ? "ok" : "no");
    };
    c.appendChild(wrapEl(btn)); view.appendChild(c);
  }
  const norm = (s) => String(s || "").normalize("NFC").trim().toLowerCase().replace(/\s+/g, " ");

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
    card.appendChild(el("p", "xs-hint", `✍️ Chọn ô <b>${esc(normAddr(q.target).split(":")[0])}</b> (tô vàng) rồi gõ công thức, bắt đầu bằng dấu <b>=</b>, nhấn Enter.` + (targets.length > 1 ? ` Sau đó sao chép công thức: kéo <b>nút điền ■</b> ở góc dưới phải ô đến ${esc(targets[targets.length - 1].ad)} (hoặc <b>Ctrl+C</b> → chọn ${esc(targets[1].ad)}:${esc(targets[targets.length - 1].ad)} → <b>Ctrl+V</b>, nút 📋 / 📥).` : "")));
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
      result(ch) { input.disabled = true; const ok = shortMatch(q.answer, ch, q.exact); input.classList.add(ok ? "ok" : "no"); if (!ok) row.insertAdjacentHTML("beforeend", ` <b class="fill-ans">Đáp án: ${esc(firstOf(q.answer))}</b>`); return ok; },
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
      emit("onAttempt", { key, activityId: aid(a._parent || a), ok: shortMatch(q.answer, ch, q.exact), fraction: shortMatch(q.answer, ch, q.exact) ? 1 : 0, choice: ch });
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
    each(spec.bold, (s) => { s.b = 1; }); each(spec.italic, (s) => { s.i = 1; }); each(spec.wrap, (s) => { s.wr = 1; }); // wrap: ["H1:O2"] -> chữ xuống dòng trong ô (Wrap Text)
    each(spec.comma, (s) => { s.cm = 1; }); // số có dấu phẩy ngăn cách hàng nghìn (8,000) như Excel
    Object.entries(spec.pct || {}).forEach(([ad, v]) => each(ad, (s) => { s.pct = Math.max(0, Math.min(9, +v || 0)); })); // định dạng phần trăm: { "N3:N5": 1 } -> 0.905 hiện 90.5%
    Object.entries(spec.dec || {}).forEach(([ad, v]) => each(ad, (s) => { s.dec = Math.max(0, Math.min(9, +v || 0)); })); // số chữ số thập phân cố định: { "M4:M25": 2 } -> 14.00
    each(spec.center, (s) => { s.al = "center"; }); each(spec.right, (s) => { s.al = "right"; }); each(spec.left, (s) => { s.al = "left"; });
    Object.entries(spec.fill || {}).forEach(([ad, v]) => each(ad, (s) => { s.fill = v; }));
    Object.entries(spec.color || {}).forEach(([ad, v]) => each(ad, (s) => { s.color = v; }));
    Object.entries(spec.size || {}).forEach(([ad, v]) => each(ad, (s) => { s.size = v; }));
    const HID = new Set([].concat(spec.hideCols || []).map((x) => colNum(String(x).toUpperCase()))); // cột ẩn: hideCols: ["A","B"] (công thức vẫn dùng được)
    const W = []; let tw = 0.55; for (let c = 0; c < cols; c++) { W[c] = HID.has(c) ? 0 : +((spec.widths || {})[colName(c)]) || 1; tw += W[c]; }
    const hidS = (c) => (HID.has(c) ? ' style="display:none"' : "");
    const root = el("div", "xsheet" + (editable ? " editable" : "") + (selectable ? " selectable" : ""));
    let body = "";
    for (let r = 1; r <= rows; r++) { body += `<tr><th data-row="${r}">${r}</th>`; for (let c = 0; c < cols; c++) body += `<td data-c="${c}" data-r="${r}"${hidS(c)}></td>`; body += "</tr>"; }
    root.innerHTML = (spec.title ? `<div class="xs-title">📗 ${esc(spec.title)}</div>` : "")
      + `<div class="xs-bar"><div class="xs-name" title="Hộp địa chỉ: địa chỉ ô hiện thời"></div><span class="xs-fx">fx</span><input class="xs-formula" title="Vùng nhập dữ liệu" ${editable ? "" : "readonly tabindex='-1'"}></div>`
      + `<div class="xs-gridwrap"><table class="xs-grid"><colgroup><col style="width:${0.55 / tw * 100}%">${W.map((w, c) => (HID.has(c) ? "" : `<col style="width:${w / tw * 100}%">`)).join("")}</colgroup>`
      + `<thead><tr><th class="xs-corner"></th>${W.map((_, c) => `<th data-col="${c}"${hidS(c)}>${colName(c)}</th>`).join("")}</tr></thead><tbody>${body}</tbody></table></div>`
      + `<div class="xs-foot"><div class="xs-tabs">${(spec.sheets || ["Sheet1"]).map((n, i) => `<span class="xs-tab${i === (+spec.activeSheet || 0) ? " on" : ""}">${esc(n)}</span>`).join("")}</div>`
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
      const pn = +String(v).replace(/,/g, "");
      if (!(editing && editing.ad === ad)) t.textContent = s.pct != null && ty === "num" && !/%$/.test(String(v)) && isFinite(pn) ? (pn * 100).toLocaleString("en-US", { minimumFractionDigits: s.pct, maximumFractionDigits: s.pct }) + "%" : (s.cm || s.dec != null) && ty === "num" && isFinite(+String(v).replace(/,/g, "")) ? (+String(v).replace(/,/g, "")).toLocaleString("en-US", s.dec != null ? { minimumFractionDigits: s.dec, maximumFractionDigits: s.dec, useGrouping: !!s.cm } : { maximumFractionDigits: 9 }) : v || "";
      t.classList.toggle("num", !s.al && (ty === "num" || ty === "date"));
      t.classList.toggle("err", err);
      t.style.textAlign = s.al || ""; t.style.whiteSpace = s.wr ? "normal" : ""; t.style.fontWeight = s.b ? "700" : ""; t.style.fontStyle = s.i ? "italic" : "";
      t.style.backgroundColor = s.fill || ""; t.style.color = s.color || ""; t.style.fontSize = s.size ? (s.size / 11).toFixed(2) + "em" : "";
      t.classList.toggle("clip", c < cols - 1 && !!data[colName(c + 1) + r]); // chữ tràn sang ô trống bên phải như Excel
    }
    const paintAll = () => { for (let r = 1; r <= rows; r++) for (let c = 0; c < cols; c++) paintCell(c, r); };
    let sel = null, locked = false, drag = false, cb = null, editing = null;
    let fxDirty = false, fxOrig = "";

    // ---- XÁC THỰC DỮ LIỆU ĐẶT SẴN (spec.validate) — như Data Validation của Excel ----------------
    //  validate: { "B3:B10": { list: "F2:F10" | ["Ở", "Ăn", …], dropdown?: false },
    //              "D3:D10": { type: "whole"|"decimal"|"date"|"textlen", op: ">"|">="|"<"|"<="|"="|"<>"|"between"|"notbetween", min, max,
    //                          input?: { title, msg }, error?: { style: "stop"|"warning"|"information", title, msg } } }
    //  Ô trống luôn hợp lệ (Ignore blank). Dán (📥) không bị kiểm tra — giống Excel.
    const VRULES = Object.entries(spec.validate || {}).map(([ad, rule]) => ({ R: addrRect(ad, cols, rows), rule })).filter((x) => x.R && x.rule);
    const ruleOf = (c, r) => VRULES.find((x) => c >= x.R.c1 && c <= x.R.c2 && r >= x.R.r1 && r <= x.R.r2) || null;
    const vNorm = (s) => String(s == null ? "" : s).normalize("NFC").trim().toLowerCase();
    function vItems(rule) {
      if (Array.isArray(rule.list)) return rule.list.map(String);
      const R = addrRect(String(rule.list || "").replace(/\$/g, ""), cols, rows), out = []; if (!R) return out;
      for (let r = R.r1; r <= Math.min(R.r2, rows); r++) for (let c = R.c1; c <= Math.min(R.c2, cols - 1); c++) { const ad = colName(c) + r, raw = data[ad]; if (raw == null || raw === "") continue; out.push(String(String(raw).charAt(0) === "=" ? FX.fmt(FX.evalCell(data, ad)) : raw)); }
      return out;
    }
    const vDate = (s) => { const m = /^(\d{1,2})[/-](\d{1,2})[/-](\d{2}|\d{4})$/.exec(String(s).trim()); if (!m) return NaN; const mo = +m[1], d = +m[2], y = m[3].length === 2 ? 2000 + +m[3] : +m[3], t = new Date(y, mo - 1, d); return t.getMonth() === mo - 1 && t.getDate() === d ? t.getTime() : NaN; };
    function vCheck(rule, raw, ad) {
      const s = String(raw == null ? "" : raw).trim(); if (!s) return true;
      let v = s; if (s.charAt(0) === "=") { const tmp = Object.assign({}, data); tmp[ad] = s; v = FX.evalCell(tmp, ad); }
      if (rule.list) return vItems(rule).some((x) => vNorm(x) === vNorm(v));
      let n;
      if (rule.type === "whole" || rule.type === "decimal") { n = typeof v === "number" ? v : FX.isNum(v) ? parseFloat(v) : NaN; if (isNaN(n) || (rule.type === "whole" && !Number.isInteger(n))) return false; }
      else if (rule.type === "date") { n = vDate(v); if (isNaN(n)) return false; }
      else if (rule.type === "textlen") n = String(v).length;
      else return true;
      const cv = (x) => (x == null ? null : rule.type === "date" ? vDate(x) : +x), a = cv(rule.min), b = cv(rule.max);
      const op = rule.op || (a != null && b != null ? "between" : a != null ? ">=" : b != null ? "<=" : "");
      const lim = (x, y) => (x != null ? x : y);
      if (op === ">") return n > a; if (op === ">=") return n >= a; if (op === "<") return n < lim(b, a); if (op === "<=") return n <= lim(b, a);
      if (op === "=") return n === a; if (op === "<>") return n !== a;
      if (op === "between") return n >= a && n <= b; if (op === "notbetween") return n < a || n > b;
      return true;
    }
    const V_OPS = { ">": "lớn hơn", ">=": "lớn hơn hoặc bằng", "<": "nhỏ hơn", "<=": "nhỏ hơn hoặc bằng", "=": "bằng", "<>": "khác", between: "từ", notbetween: "ngoài khoảng" };
    function vDescribe(rule) {
      if (rule.list) return "danh sách (List) " + (Array.isArray(rule.list) ? rule.list.join(", ") : "=" + String(rule.list).replace(/\$/g, "").replace(/([A-Z]+)(\d+)/g, "$$1$$2"));
      const name = { whole: "số nguyên (Whole number)", decimal: "số thập phân (Decimal)", date: "ngày tháng (Date)", textlen: "độ dài văn bản (Text length)" }[rule.type] || rule.type;
      const op = rule.op || (rule.min != null && rule.max != null ? "between" : rule.min != null ? ">=" : rule.max != null ? "<=" : "");
      const lim = op === "<" || op === "<=" ? (rule.max != null ? rule.max : rule.min) : rule.min;
      return name + (op === "between" || op === "notbetween" ? ` ${V_OPS[op]} ${rule.min} đến ${rule.max}` : op ? ` ${V_OPS[op]} ${lim}` : "");
    }
    let vAlerting = false, vOpen = null;
    const vTip = el("div", "xs-vtip"), vDrop = el("button", "xs-vdrop", "▾"), vList = el("div", "xs-vlist");
    vTip.hidden = vDrop.hidden = vList.hidden = true; vDrop.type = "button"; vDrop.title = "Chọn từ danh sách";
    if (VRULES.length) { root.classList.add("has-v"); root.append(vTip, vDrop, vList); }
    function placeV() {
      if (!VRULES.length) return;
      vTip.hidden = vDrop.hidden = true;
      const act = sel && activeOf(sel), vr = act && sel.m === "cells" ? ruleOf(act.c, act.r) : null, ad = act ? colName(act.c) + act.r : "";
      if (vOpen !== ad) { vList.hidden = true; vOpen = null; }
      if (!vr) return;
      const t = td(act.c, act.r), tr = t.getBoundingClientRect(), rr = root.getBoundingClientRect(), x = tr.left - rr.left, y = tr.top - rr.top;
      const sp = el("span", "xs-vinfo", " · ✅ Xác thực: " + esc(vDescribe(vr.rule))); info.appendChild(sp);
      const inp = vr.rule.input;
      if (inp && (inp.title || inp.msg)) { vTip.innerHTML = (inp.title ? `<b>${esc(inp.title)}</b>` : "") + esc(inp.msg || ""); vTip.style.left = (x + tr.width * 0.35) + "px"; vTip.style.top = (y + tr.height + 4) + "px"; vTip.hidden = false; }
      if (vr.rule.list && vr.rule.dropdown !== false && editable && !locked) {
        vDrop.style.left = (x + tr.width) + "px"; vDrop.style.top = y + "px"; vDrop.style.height = tr.height + "px"; vDrop.hidden = false;
        vList.style.left = x + "px"; vList.style.top = (y + tr.height) + "px"; vList.style.minWidth = tr.width + "px";
      }
    }
    vDrop.addEventListener("pointerdown", (e) => e.preventDefault()); // giữ con trỏ ở vùng nhập
    vDrop.onclick = () => {
      if (locked || !sel) return;
      const act = activeOf(sel), ad = colName(act.c) + act.r, vr = ruleOf(act.c, act.r); if (!vr) return;
      if (!vList.hidden) { vList.hidden = true; vOpen = null; return; }
      vList.innerHTML = vItems(vr.rule).map((t2, i) => `<button type="button" data-i="${i}">${esc(t2)}</button>`).join("") || "<i>(danh sách trống)</i>";
      vList.querySelectorAll("button").forEach((b) => {
        b.addEventListener("pointerdown", (e) => e.preventDefault());
        b.onclick = () => { if (!canEdit(ad)) return; setVal(ad, vItems(vr.rule)[+b.dataset.i]); fxDirty = false; vList.hidden = true; vOpen = null; paintAll(); paint(); changed(); focusFx(); };
      });
      vList.hidden = false; vOpen = ad;
    };
    function vAlert(rule, onRetry, onCancel, onAccept) {
      ensureEngineCSS(); vAlerting = true;
      const er = rule.error || {}, st = ["warning", "information"].includes(er.style) ? er.style : "stop";
      const ov = el("div", "xs-valert-ov"), box = el("div", "xs-valert");
      const msg = er.msg || "Giá trị này không khớp với các giới hạn xác thực dữ liệu đã đặt cho ô.";
      const btns = st === "stop" ? [["retry", "Retry"], ["cancel", "Cancel"], ["help", "Help"]] : st === "warning" ? [["yes", "Yes"], ["no", "No"], ["cancel", "Cancel"]] : [["ok", "OK"], ["cancel", "Cancel"]];
      box.innerHTML = `<div class="xs-va-head"><span>${esc(er.title || "Bảng tính")}</span><button type="button" data-a="cancel" title="Đóng">✕</button></div>`
        + `<div class="xs-va-body"><span class="xs-va-ico ${st}">${st === "stop" ? "✖" : st === "warning" ? "!" : "i"}</span><div>${esc(msg).replace(/\n/g, "<br>")}${st === "warning" ? "<br><b>Continue?</b>" : ""}</div></div>`
        + `<div class="xs-va-btns">${btns.map(([a, t2]) => `<button type="button" data-a="${a}">${t2}</button>`).join("")}</div>`
        + `<div class="xs-va-help" hidden>💡 Trên Excel thật, nút Help mở trang trợ giúp. Hãy bấm Retry rồi nhập lại dữ liệu đúng yêu cầu.</div>`;
      ov.appendChild(box); document.body.appendChild(ov); sound("no");
      const done = (fn) => { ov.remove(); document.removeEventListener("keydown", onKey, true); vAlerting = false; if (fn) fn(); };
      const onKey = (e) => { if (e.key === "Escape") { e.preventDefault(); e.stopPropagation(); done(onCancel); } else if (e.key === "Enter") { e.preventDefault(); e.stopPropagation(); done(st === "stop" ? onRetry : onAccept); } };
      document.addEventListener("keydown", onKey, true);
      box.querySelectorAll("[data-a]").forEach((b) => { b.onclick = () => { const a = b.dataset.a; if (a === "help") { box.querySelector(".xs-va-help").hidden = false; return; } done(a === "retry" || a === "no" ? onRetry : a === "yes" || a === "ok" ? onAccept : onCancel); }; });
      setTimeout(() => { const f = box.querySelector(".xs-va-btns button"); if (f) f.focus(); }, 0);
    }
    // Rời ô đang gõ ở vùng nhập dữ liệu: true = hợp lệ, được rời; false = đang hiện thông báo lỗi
    function vGuard(after) {
      if (!VRULES.length || !sel || !fxDirty || vAlerting) return true;
      const act = activeOf(sel), ad = colName(act.c) + act.r, vr = ruleOf(act.c, act.r);
      if (!vr || vCheck(vr.rule, data[ad], ad)) return true;
      const orig = fxOrig, back = () => { sel = { a: act, f: act, m: "cells" }; paint(); };
      vAlert(vr.rule,
        () => { back(); try { fx.focus({ preventScroll: true }); fx.select(); } catch (x) { /* bỏ qua */ } },
        () => { setVal(ad, orig); fxDirty = false; paintAll(); back(); focusFx(); },
        () => { fxDirty = false; changed(); if (after) after(); });
      return false;
    }
    const rectOf = (S) => (S.m === "cols" ? { c1: Math.min(S.a.c, S.f.c), c2: Math.max(S.a.c, S.f.c), r1: 1, r2: rows }
      : S.m === "rows" ? { c1: 0, c2: cols - 1, r1: Math.min(S.a.r, S.f.r), r2: Math.max(S.a.r, S.f.r) }
      : { c1: Math.min(S.a.c, S.f.c), c2: Math.max(S.a.c, S.f.c), r1: Math.min(S.a.r, S.f.r), r2: Math.max(S.a.r, S.f.r) });
    const addrOf = (S) => { const R = rectOf(S); return S.m === "cols" ? colName(R.c1) + ":" + colName(R.c2) : S.m === "rows" ? R.r1 + ":" + R.r2 : normAddr(colName(R.c1) + R.r1 + ":" + colName(R.c2) + R.r2); };
    const activeOf = (S) => (S.m === "cols" ? { c: S.a.c, r: 1 } : S.m === "rows" ? { c: 0, r: S.a.r } : S.a);
    function paint() {
      root.querySelectorAll(".sel,.act,.hsel").forEach((x) => x.classList.remove("sel", "act", "hsel"));
      if (!sel) { nameBox.textContent = ""; if (document.activeElement !== fx) fx.value = ""; info.innerHTML = selectable ? "👆 Bấm vào một ô · kéo chuột để chọn vùng · bấm tên cột / tên hàng để chọn cả cột / hàng." : ""; placeV(); return; }
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
      placeV(); placeFill();
    }
    // ---- NÚT KÉO ĐIỀN (fill handle): kéo ô vuông nhỏ ở góc dưới phải vùng chọn để sao chép như Excel ----
    //  Công thức tự dời địa chỉ (địa chỉ có $ giữ nguyên); 2 số trở lên -> cấp số cộng; "HS01" -> HS02, HS03…
    const gwrap = root.querySelector(".xs-gridwrap"), fillH = el("div", "xs-fillh");
    fillH.title = "Kéo để sao chép sang các ô liền kề (fill handle)"; fillH.hidden = true;
    let filling = null;
    if (editable) { gwrap.appendChild(fillH); if (window.ResizeObserver) new ResizeObserver(() => placeFill()).observe(grid); }
    function placeFill() {
      if (!editable) return;
      fillH.hidden = true;
      if (!sel || sel.m !== "cells" || locked) return;
      const R = rectOf(sel), t = td(R.c2, R.r2); if (!t) return;
      const g = gwrap.getBoundingClientRect(), b = t.getBoundingClientRect(); if (!g.width) return;
      fillH.style.left = Math.min(b.right - g.left, g.width - 7) + "px"; fillH.style.top = Math.min(b.bottom - g.top, g.height - 7) + "px";
      fillH.hidden = false;
    }
    function fillTarget(x, y) {
      const t = hitCell(x, y); if (!t || t.dataset.c == null) return filling.to;
      const c = +t.dataset.c, r = +t.dataset.r, R = filling.R;
      const dv = r > R.r2 ? r - R.r2 : r < R.r1 ? R.r1 - r : 0, dh = c > R.c2 ? c - R.c2 : c < R.c1 ? R.c1 - c : 0;
      if (!dv && !dh) return null;
      if (dv >= dh) return r > R.r2 ? { c1: R.c1, c2: R.c2, r1: R.r1, r2: r } : { c1: R.c1, c2: R.c2, r1: r, r2: R.r2 };
      return c > R.c2 ? { c1: R.c1, c2: c, r1: R.r1, r2: R.r2 } : { c1: c, c2: R.c2, r1: R.r1, r2: R.r2 };
    }
    const rectAddr = (T) => normAddr(colName(T.c1) + T.r1 + ":" + colName(T.c2) + T.r2);
    function fillApply(R, T) {
      const vert = T.r1 !== R.r1 || T.r2 !== R.r2, n = vert ? R.r2 - R.r1 + 1 : R.c2 - R.c1 + 1, mod = (a, m) => ((a % m) + m) % m;
      let hasF = false;
      for (let r = T.r1; r <= T.r2; r++) for (let c = T.c1; c <= T.c2; c++) {
        if (r >= R.r1 && r <= R.r2 && c >= R.c1 && c <= R.c2) continue;
        const k = vert ? r - R.r1 : c - R.c1, line = []; // k: vị trí so với đầu vùng nguồn
        for (let i = 0; i < n; i++) line.push(String(data[vert ? colName(c) + (R.r1 + i) : colName(R.c1 + i) + r] == null ? "" : data[vert ? colName(c) + (R.r1 + i) : colName(R.c1 + i) + r]));
        const si = mod(k, n), src = line[si], sc = vert ? c : R.c1 + si, sr = vert ? R.r1 + si : r;
        let v = src;
        if (src.charAt(0) === "=") { v = FX.shift(src, r - sr, c - sc); hasF = true; }
        else if (n >= 2 && line.every((x) => FX.isNum(x))) { const a0 = parseFloat(line[0]), st = (parseFloat(line[n - 1]) - a0) / (n - 1); v = String(Math.round((a0 + st * k) * 1e9) / 1e9); }
        else if (n === 1) { const m = /^(.*?[^\d/.,:-])(\d+)$/.exec(src); if (m && !FX.isNum(src)) { const x = Math.max(0, +m[2] + k); v = m[1] + String(x).padStart(m[2].length, "0"); } }
        setVal(colName(c) + r, v);
      }
      sel = { a: { c: T.c1, r: T.r1 }, f: { c: T.c2, r: T.r2 }, m: "cells" };
      paintAll(); paint(); changed(); focusFx();
      info.innerHTML = "🔽 Đã điền đến <b>" + rectAddr(T) + "</b>" + (hasF ? " — địa chỉ trong công thức đã tự điều chỉnh (địa chỉ có dấu $ giữ nguyên)." : ".");
    }
    fillH.addEventListener("pointerdown", (e) => {
      if (locked || !sel || sel.m !== "cells" || e.button > 0) return;
      e.preventDefault(); e.stopPropagation();
      if (editing && !commitEdit()) return;
      if (!vGuard()) return;
      filling = { R: rectOf(sel), to: null };
      try { fillH.setPointerCapture(e.pointerId); } catch (x) { /* bỏ qua */ }
    });
    fillH.addEventListener("pointermove", (e) => {
      if (!filling) return;
      const T = fillTarget(e.clientX, e.clientY); filling.to = T;
      root.querySelectorAll(".fillp").forEach((x) => x.classList.remove("fillp"));
      if (T) for (let r = T.r1; r <= T.r2; r++) for (let c = T.c1; c <= T.c2; c++) td(c, r).classList.add("fillp");
      info.innerHTML = T ? "🔽 Thả ra để điền đến <b>" + rectAddr(T) + "</b>" : "🔽 Kéo xuống (hoặc sang ngang) để sao chép…";
    });
    const fillEnd = () => {
      if (!filling) return; const F = filling; filling = null;
      root.querySelectorAll(".fillp").forEach((x) => x.classList.remove("fillp"));
      if (F.to && !locked) fillApply(F.R, F.to); else paint();
    };
    fillH.addEventListener("pointerup", fillEnd); fillH.addEventListener("pointercancel", fillEnd);
    const hitCell = (x, y) => { const t = document.elementFromPoint(x, y); return t && grid.contains(t) ? t.closest("td,th") : null; };
    grid.addEventListener("pointerdown", (e) => {
      if (locked || !selectable || e.button > 0) return;
      const t = e.target.closest("td,th"); if (!t || t.classList.contains("xs-corner")) return;
      if (editing) { if (editing.td === t) return; if (!commitEdit()) { e.preventDefault(); return; } }
      if (!vGuard()) { e.preventDefault(); return; }
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
    function move(dc, dr) { const a0 = activeOf(sel || { a: { c: 0, r: 1 }, m: "cells" }); let c = clamp(a0.c + dc, 0, cols - 1); const r = clamp(a0.r + dr, 1, rows);
      while (HID.has(c) && dc && c > 0 && c < cols - 1) c += dc; if (HID.has(c)) c = a0.c; /* bỏ qua cột ẩn */ sel ={ a: { c, r }, f: { c, r }, m: "cells" }; paint(); }
    function startEdit(initial) {
      if (!editable || locked) return;
      if (!sel) sel = { a: { c: 0, r: 1 }, f: { c: 0, r: 1 }, m: "cells" };
      const act = activeOf(sel); sel = { a: act, f: act, m: "cells" }; paint();
      const t = td(act.c, act.r), ad = colName(act.c) + act.r, inp = el("input", "xs-edit");
      if (!canEdit(ad)) { info.innerHTML = "🔒 Chỉ nhập vào ô được tô vàng."; return; }
      inp.value = initial != null ? initial : data[ad] || ""; t.appendChild(inp); inp.focus();
      editing = { c: act.c, r: act.r, ad, td: t, input: inp };
      inp.onkeydown = (e) => { e.stopPropagation(); if (e.key === "Enter") { e.preventDefault(); if (commitEdit(true)) { move(0, 1); focusFx(); } } else if (e.key === "Escape") cancelEdit(); else if (e.key === "Tab") { e.preventDefault(); if (commitEdit(true)) { move(1, 0); focusFx(); } } };
      inp.oninput = () => { fx.value = inp.value; };
      inp.onblur = () => { if (editing && editing.input === inp) commitEdit(true); };
    }
    function commitEdit(fromBlur) {
      if (!editing) return true; const E = editing, val = E.input.value, vr = ruleOf(E.c, E.r);
      if (vr && !vAlerting && !vCheck(vr.rule, val, E.ad)) { // nhập sai quy tắc xác thực -> thông báo lỗi
        editing = null; E.input.remove(); paintCell(E.c, E.r);
        const back = () => { sel = { a: { c: E.c, r: E.r }, f: { c: E.c, r: E.r }, m: "cells" }; paint(); };
        vAlert(vr.rule, () => { back(); startEdit(val); }, () => { back(); focusFx(); }, () => { setVal(E.ad, val); repaintRow(E.c, E.r); back(); changed(); focusFx(); });
        return false;
      }
      editing = null; setVal(E.ad, val); E.input.remove(); repaintRow(E.c, E.r); paint(); changed(); if (!fromBlur) focusFx(); return true;
    }
    function cancelEdit() { if (!editing) return; const E = editing; editing = null; E.input.remove(); paintCell(E.c, E.r); paint(); focusFx(); }
    function clearSel() { if (!sel || locked) return; const R = rectOf(sel); for (let r = R.r1; r <= R.r2; r++) for (let c = R.c1; c <= R.c2; c++) if (canEdit(colName(c) + r)) delete data[colName(c) + r]; paintAll(); paint(); changed(); }
    // Chọn ô xong -> con trỏ nằm sẵn ở VÙNG NHẬP DỮ LIỆU (ô nhập thật: gõ được bằng bàn phím ảo
    // điện thoại và bộ gõ tiếng Việt); gõ đến đâu ô hiện đến đó, Enter xuống ô dưới. Nháy đúp = sửa trong ô.
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
        if (k === "Enter" || k === "Tab") { e.preventDefault(); const go = () => { if (k === "Enter") move(0, e.shiftKey ? -1 : 1); else move(1, 0); focusFx(); }; if (!vGuard(go)) return; if (fxDirty) changed(); go(); return; }
        if (k === "Escape") { e.preventDefault(); if (sel) { const act = activeOf(sel); setVal(colName(act.c) + act.r, fxOrig); repaintRow(act.c, act.r); } focusFx(); return; }
        if ((k === "Delete" || k === "Backspace") && multi && !fxDirty) { e.preventDefault(); clearSel(); focusFx(); return; }
        if (arrows[k] && (!fxDirty || k === "ArrowUp" || k === "ArrowDown")) {
          e.preventDefault(); if (!vGuard()) return; const [dc, dr] = arrows[k];
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
      fx.addEventListener("blur", () => { if (vAlerting) return; if (fxDirty) { if (!vGuard()) return; fxDirty = false; changed(); } });
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
      lock() { locked = true; drag = false; filling = null; fillH.hidden = true; root.classList.add("locked"); fx.readOnly = true; },
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
  function mmToText(root, lib) {
    const out = [], one = (s) => String(s == null ? "" : s).replace(/\s+/g, " ").trim(), libF = (lib && lib.files) || [];
    const fromLib = (f) => libF.some((g) => g.kind === f.kind && g.name === f.name && (g.url || g.note || "") === (f.url || f.note || "")); // tệp lấy từ thư mục: chỉ ghi tên
    (function walk(n, d) {
      const pad = "  ".repeat(d);
      out.push(pad + (String(n.text).split("\n").map(one).filter(Boolean).join(" / ") || "(trống)"));
      (n.files || []).forEach((f) => { const k = mmKind(f), extra = fromLib(f) ? "" : one(f.url || f.note); out.push(pad + "  📎 " + k[0] + " " + (one(f.name) || k[1]) + (extra ? " — " + extra : "")); });
      (n.children || []).forEach((c) => walk(c, d + 1));
    })(root, 0);
    const t = out.join("\n"); return t.length > 2950 ? t.slice(0, 2950) + "\n…" : t;
  }
  function mmFromText(txt, lib) {
    const root = { text: "", files: [], children: [] }, stack = [], libF = (lib && lib.files) || [];
    String(txt || "").split("\n").filter((s) => s.trim() && s.trim() !== "…").forEach((ln) => {
      const d = Math.floor(ln.match(/^ */)[0].length / 2), s = ln.trim();
      if (!stack.length) { root.text = s.replace(/ \/ /g, "\n"); stack.push(root); return; }
      if (s.indexOf("📎") === 0) {
        let rest = s.replace(/^📎\s*/, ""), kind = "doc";
        Object.keys(MM_KINDS).some((k) => { if (rest.indexOf(MM_KINDS[k][0]) !== 0) return false; kind = k; rest = rest.slice(MM_KINDS[k][0].length).trim(); return true; });
        const cut = rest.indexOf(" — "); let f = { kind, name: cut >= 0 ? rest.slice(0, cut) : rest };
        if (cut >= 0) { const x = rest.slice(cut + 3); if (/^https?:\/\//i.test(x)) f.url = x; else f.note = x; }
        const same = libF.filter((g) => g.kind === f.kind && g.name === f.name)[0]; // tệp lấy từ thư mục dự án: dựng lại đủ nội dung
        if (same) f = Object.assign({}, same);
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
    const lib = opts.library && opts.library.files && opts.library.files.length ? opts.library : null;
    function attachFile(f) {
      (sel.files = sel.files || []).push(f); attachP.hidden = true; paintNode(sel); later(); changed();
      const o = info.get(sel); if (o) { o.el.classList.remove("pop"); void o.el.offsetWidth; o.el.classList.add("pop"); }
    }
    function openAttach() {
      if (!attachP.hidden) { attachP.hidden = true; return; }
      let kind = "img", src = null, pickF = -1;
      attachP.innerHTML = (lib ? `<div class="mm-lib"><div class="mm-lib-path">📁 ${esc(lib.path || "Thư mục dự án")}</div>
        <div class="mm-lib-files">${lib.files.map((f, i) => `<button type="button" data-l="${i}">${mmKind(f)[0]} ${esc(f.name)}</button>`).join("")}</div>
        <div class="mm-aact"><span class="mm-lib-fn">File name: <b>—</b></span><button type="button" class="prim" data-a="open" disabled>📂 Open — đính kèm vào nhánh đang chọn</button></div></div>
        <div class="mm-lib-or">hoặc tự tạo tệp đính kèm:</div>` : "")
        + `<div class="mm-kinds">${Object.keys(MM_KINDS).map((k) => `<button type="button" data-k="${k}">${MM_KINDS[k][0]} ${MM_KINDS[k][1]}</button>`).join("")}</div>
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
        attachFile(f);
      };
      if (lib) {
        const fn = attachP.querySelector(".mm-lib-fn b"), open = attachP.querySelector("[data-a=open]");
        attachP.querySelectorAll(".mm-lib-files button").forEach((b) => {
          b.onclick = () => { pickF = +b.dataset.l; attachP.querySelectorAll(".mm-lib-files button").forEach((x) => x.classList.toggle("on", x === b)); fn.textContent = lib.files[pickF].name; open.disabled = false; };
          b.ondblclick = () => { b.onclick(); open.onclick(); };
        });
        open.onclick = () => { if (pickF >= 0) attachFile(Object.assign({}, lib.files[pickF])); };
      }
      setKind("img"); attachP.hidden = false; if (!lib) nm.focus();
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
      if (!t && ed && STUDENT) { const s = ask("getText", tk); if (s && s.text) t = mmFromText(s.text, spec.library); } // máy khác: dựng lại từ bản đã gửi
      mmMem[key] = mmClone(t && typeof t.text === "string" ? t : spec.root || { text: "Chủ đề" });
    }
    const needEl = spec.need && spec.need.length ? el("div", "mm-need") : null;
    const needPaint = () => { // tiêu chí: các loại tệp cần đính kèm ("video|link" = một trong hai)
      if (!needEl) return; const have = {};
      (function walk(n) { (n.files || []).forEach((f) => { have[f.kind] = 1; }); (n.children || []).forEach(walk); })(mmMem[key]);
      const ok = spec.need.map((k) => String(k).split("|").some((x) => have[x])), done = ok.filter(Boolean).length;
      needEl.innerHTML = `<b>📎 Đã đính kèm ${done}/${ok.length} loại dữ liệu:</b> ` + spec.need.map((k, i) => `<span class="${ok[i] ? "ok" : ""}">${ok[i] ? "✅" : "⬜"} ${String(k).split("|").map((x) => mmKind({ kind: x }).join(" ")).join(" / ")}</span>`).join("")
        + (done === ok.length ? ` <b class="mm-need-all">🎉 Đủ yêu cầu!</b>` : "");
    };
    const save = () => { try { localStorage.setItem(lsKey, JSON.stringify(mmMem[key])); } catch (e) { /* hết chỗ / chế độ riêng tư: vẫn làm tiếp được */ } needPaint(); };
    const box = el("div", "mm-box");
    if (spec.intro) box.appendChild(el("p", "subtitle", esc(spec.intro)));
    box.appendChild(mountMindmap(mmMem[key], { editable: ed, title: spec.title, layout: spec.layout, library: ed ? spec.library : null, onChange: ed ? save : null,
      onReset: ed ? () => { mmMem[key] = mmClone(spec.root || { text: "Chủ đề" }); save(); return mmMem[key]; } : null }).el);
    if (needEl) { box.appendChild(needEl); needPaint(); }
    if (spec.submit && STUDENT) {
      const sent = ask("getText", tk), btn = el("button", "btn", "📨 Gửi sơ đồ cho thầy/cô"), st = el("span", "ta-status", sent ? "✓ Đã gửi — sửa xong có thể gửi lại" : "");
      btn.onclick = () => { emit("onText", { key: tk, activityId: aid(a), text: mmToText(mmMem[key], spec.library) }); st.textContent = "✓ Đã gửi lúc " + new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }) + " — sửa xong có thể gửi lại"; sound("ok"); };
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
    const show = (i) => { [...tabs.children].forEach((b, j) => b.classList.toggle("on", i === j)); stage.innerHTML = ""; stage.appendChild(mountMindmap(mmFromText(list[i].text, a.mindmap.library), { layout: a.mindmap.layout }).el); };
    list.forEach((g, i) => { const b = el("button", null, esc(g.name)); b.type = "button"; b.onclick = () => show(i); tabs.appendChild(b); });
    p.card.append(tabs, stage); show(0);
  }

  // ---- MÁY CHẠY THỬ THUẬT TOÁN (activity.runner) — sơ đồ khối chạy từng bước ---------------------
  //  runner: { title?, intro?, inputs: [{ name: "a", label?, value: 8 }], steps: [
  //    { shape: "term", text: "Bắt đầu" }, { shape: "io", text: "Giá trị a, giá trị b", input: true },
  //    { shape: "proc", text: "Tổng ← a + b", set: "Tổng", expr: "a + b" }, { shape: "io", text: "Giá trị tổng", output: "Tổng" },
  //    { shape: "term", text: "Kết thúc" } ] }
  //  expr: số, tên biến, + - * / : ( ) (":" là chia). Không chấm điểm, không gửi — HS tự thử với đầu vào khác nhau.
  function rnEval(expr, vars) {
    let e = String(expr || "");
    Object.keys(vars).sort((x, y) => y.length - x.length).forEach((k) => { e = e.split(k).join("(" + Number(vars[k]) + ")"); });
    e = e.replace(/:/g, "/").replace(/×/g, "*").replace(/,/g, ".");
    if (!/^[\d\s+\-*/().]+$/.test(e)) return NaN;
    try { return Function("return (" + e + ")")(); } catch (x) { return NaN; }
  }
  const rnFmt = (v) => (typeof v === "number" && isFinite(v) ? String(Math.round(v * 100) / 100).replace(".", ",") : "?");
  function runnerBox(a) {
    const spec = a.runner, steps = spec.steps || [], ins = spec.inputs || [];
    const box = el("div", "rn-box");
    if (spec.title) box.appendChild(el("h3", "rn-title", "⚙️ " + esc(spec.title)));
    if (spec.intro) box.appendChild(el("p", "subtitle", esc(spec.intro)));
    const wrap = el("div", "rn-wrap"), chart = el("div", "fc-chart rn-chart"), side = el("div", "rn-side");
    const nodes = steps.map((st, i) => { if (i) chart.insertAdjacentHTML("beforeend", '<span class="fc-arrow">↓</span>'); const w = el("div", "rn-step"); w.innerHTML = fcNode(st.text, st.shape); chart.appendChild(w); return w; });
    const inBox = el("div", "rn-inputs", "<b>📥 Đầu vào</b>"), fields = {};
    ins.forEach((f) => { const lb = el("label", "rn-in"); lb.appendChild(el("span", null, esc(f.label || f.name) + " =")); const inp = el("input"); inp.type = "number"; inp.step = "any"; inp.value = f.value != null ? f.value : ""; fields[f.name] = inp; lb.appendChild(inp); inBox.appendChild(lb); });
    const mem = el("div", "rn-mem"), out = el("div", "rn-out"), log = el("ol", "rn-log");
    const bNext = el("button", "btn", "▶ Chạy từng bước"), bAll = el("button", "btn ghost", "⏩ Chạy hết"), bReset = el("button", "btn ghost", "🔄 Làm lại");
    const ctr = el("div", "rn-ctrl"); ctr.append(bNext, bAll, bReset);
    side.append(inBox, ctr, mem, out, log); wrap.append(chart, side); box.appendChild(wrap);
    let p = 0, vars = {};
    const paintMem = () => { const ks = Object.keys(vars); mem.innerHTML = "<b>🧠 Bộ nhớ</b>" + (ks.length ? ks.map((k) => `<span class="rn-var"><i>${esc(k)}</i> = <b>${rnFmt(vars[k])}</b></span>`).join("") : ' <span class="rn-empty">(trống)</span>'); };
    const paint = () => { nodes.forEach((n, i) => { n.classList.toggle("on", i === p - 1); n.classList.toggle("done", i < p - 1); }); bNext.disabled = bAll.disabled = p >= steps.length; paintMem(); };
    const say = (t) => { log.appendChild(el("li", null, t)); };
    const step = () => {
      if (p >= steps.length) return; const st = steps[p];
      if (st.input) {
        for (const f of ins) { const v = parseFloat(String(fields[f.name].value).replace(",", ".")); if (!isFinite(v)) { alert("Hãy nhập số cho " + (f.label || f.name) + "."); fields[f.name].focus(); return; } }
        ins.forEach((f) => { vars[f.name] = parseFloat(String(fields[f.name].value).replace(",", ".")); fields[f.name].disabled = true; });
        say("📥 Nhận đầu vào: " + ins.map((f) => esc(f.label || f.name) + " = " + rnFmt(vars[f.name])).join(", "));
      } else if (st.set) { vars[st.set] = rnEval(st.expr, vars); say("⚙️ " + esc(st.text) + " → <b>" + esc(st.set) + " = " + rnFmt(vars[st.set]) + "</b>"); }
      else if (st.output) { const v = vars[st.output]; out.innerHTML = `<b>📤 Đầu ra:</b> ${esc(st.output)} = <span class="rn-val">${rnFmt(v)}</span>`; say("📤 Đưa ra: " + esc(st.output) + " = " + rnFmt(v)); }
      else say((p === 0 ? "🟢 " : "🔴 ") + esc(st.text));
      p++; paint(); if (p >= steps.length) sound("ok");
    };
    bNext.onclick = step;
    bAll.onclick = () => { let guard = 0; while (p < steps.length && guard++ < 200) { const q = p; step(); if (p === q) break; } };
    bReset.onclick = () => { p = 0; vars = {}; log.innerHTML = ""; out.innerHTML = ""; Object.values(fields).forEach((f) => { f.disabled = false; }); paint(); };
    paint();
    return box;
  }

  // ---- MÁY TÌM KIẾM TUẦN TỰ (activity.search) — xét lần lượt từng thẻ, trả lời 2 câu hỏi của sơ đồ khối, tự điền bảng lần lặp ----
  //  search: { title?, intro?, items: ["Nguyễn An", …], details?: ["Số 48 …", …], target: "Thanh Trúc", editTarget?: false,
  //            col?: "Tên khách hàng", q1?: "Có đúng khách hàng cần tìm không?", q2?: "Có đúng là đã hết danh sách không?",
  //            editItems?: true (HS tự gõ danh sách, cách nhau bởi dấu phẩy — dùng cho Vận dụng) }
  //  So khớp không phân biệt hoa/thường, khoảng trắng. Không chấm điểm, không gửi.
  function searchBox(a) {
    const spec = a.search; let items = (spec.items || []).slice(), det = spec.details || [];
    const box = el("div", "sr-box");
    if (spec.title) box.appendChild(el("h3", "sr-title", "🔎 " + esc(spec.title)));
    if (spec.intro) box.appendChild(el("p", "subtitle", esc(spec.intro)));
    const top = el("div", "sr-top"), lb = el("label", "sr-in"), inp = el("input");
    lb.appendChild(el("span", null, "🎯 Cần tìm:")); inp.value = spec.target || ""; if (spec.editTarget === false) inp.readOnly = true; lb.appendChild(inp);
    const bNext = el("button", "btn", "▶ Bước tiếp"), bAll = el("button", "btn ghost", "⏩ Chạy hết"), bReset = el("button", "btn ghost", "🔄 Làm lại");
    let listIn = null;
    if (spec.editItems) {
      const ll = el("label", "sr-in sr-list"); ll.appendChild(el("span", null, "📋 Danh sách:")); listIn = el("input"); listIn.value = items.join(", ");
      listIn.placeholder = "Gõ các phần tử, cách nhau bởi dấu phẩy"; ll.appendChild(listIn); box.appendChild(ll);
    }
    top.append(lb, bNext, bAll, bReset); box.appendChild(top);
    const cards = el("div", "sr-cards"); let cs = [];
    const build = () => { cards.innerHTML = ""; cs = items.map((t, i) => { const c = el("div", "sr-card", `<span class="sr-no">${i + 1}</span>${esc(t)}`); cards.appendChild(c); return c; }); };
    build();
    if (listIn) listIn.oninput = () => { items = listIn.value.split(/[,;]/).map((x) => x.trim()).filter(Boolean); det = []; build(); };
    const msg = el("div", "sr-msg"), tw = el("div", "sr-tablewrap"), tb = el("table", "sr-table");
    tb.innerHTML = `<thead><tr><th>Lần lặp</th><th>${esc(spec.col || "Giá trị đang xét")}</th><th>${esc(spec.q1 || "Có đúng giá trị cần tìm không?")}</th><th>${esc(spec.q2 || "Có đúng là đã hết danh sách không?")}</th><th>Đầu ra</th></tr></thead><tbody></tbody>`;
    tw.appendChild(tb); box.append(cards, msg, tw);
    const body = tb.querySelector("tbody");
    let i = 0, done = false;
    const step = () => {
      if (done) return;
      if (!items.length) { alert("Danh sách đang trống."); return; }
      const want = inp.value.trim();
      if (!want) { alert("Hãy nhập giá trị cần tìm."); inp.focus(); return; }
      inp.disabled = true; if (listIn) listIn.disabled = true;
      const hit = norm(items[i]) === norm(want), last = i === items.length - 1;
      cs.forEach((c) => c.classList.remove("cur")); cs[i].classList.add("cur", hit ? "hit" : "seen");
      const out = hit ? `Tìm thấy ở vị trí số ${i + 1}` + (det[i] ? ` — ${det[i]}` : "") : last ? "Không tìm thấy" : "";
      const tr = el("tr", hit ? "sr-found" : last ? "sr-miss" : "");
      tr.innerHTML = `<td>${i + 1}</td><td>${esc(items[i])}</td><td class="${hit ? "yes" : "no"}">${hit ? "Đúng" : "Sai"}</td><td class="${!hit && last ? "yes" : "no"}">${hit ? "–" : last ? "Đúng" : "Sai"}</td><td>${esc(out)}</td>`;
      body.appendChild(tr);
      msg.innerHTML = hit ? `✅ Lần lặp ${i + 1}: “${esc(items[i])}” đúng là giá trị cần tìm → <b>${esc(out)}</b>. Kết thúc.`
        : last ? `❌ Lần lặp ${i + 1}: “${esc(items[i])}” không phải, và đã hết danh sách → <b>Không tìm thấy “${esc(want)}”</b>. Kết thúc.`
        : `Lần lặp ${i + 1}: “${esc(items[i])}” không phải “${esc(want)}”, chưa hết danh sách → xét phần tử tiếp theo.`;
      if (hit || last) { done = true; sound(hit ? "ok" : "no"); if (hit) celebrate(); } else i++;
      bNext.disabled = bAll.disabled = done;
    };
    bNext.onclick = step;
    bAll.onclick = () => { let g = 0; while (!done && g++ < 500) { const k = i; step(); if (!done && i === k) break; } };
    bReset.onclick = () => { i = 0; done = false; body.innerHTML = ""; msg.innerHTML = ""; inp.disabled = false; if (listIn) listIn.disabled = false; cs.forEach((c) => c.classList.remove("cur", "hit", "seen")); bNext.disabled = bAll.disabled = false; };
    return box;
  }

  // ---- MÁY TÌM KIẾM NHỊ PHÂN (activity.search với mode: "binary") — mũi tên "vị trí giữa", nửa bị loại mờ đi (Hình 15.1 SGK Tin 7) ----
  //  search: { mode: "binary", title?, intro?, items (đã sắp xếp), details?, target, col?, editItems? (kèm nút 🔤 Sắp xếp) }
  //  Vị trí giữa = phần nguyên của (đầu + cuối)/2; mỗi lần bấm = 1 bước lặp (1 lần so sánh). Chữ so theo bảng chữ cái tiếng Việt, số so theo giá trị.
  const viColl = typeof Intl !== "undefined" && Intl.Collator ? new Intl.Collator("vi", { sensitivity: "base", numeric: true }) : null;
  const isNumStr = (x) => /^\s*-?\d+(\.\d+)?\s*$/.test(String(x));
  function cmpVal(x, y) {
    if (isNumStr(x) && isNumStr(y)) return Math.sign(parseFloat(x) - parseFloat(y));
    return viColl ? Math.sign(viColl.compare(String(x).trim(), String(y).trim())) : Math.sign(String(x).trim().localeCompare(String(y).trim()));
  }
  function binaryBox(a) {
    const spec = a.search; let items = (spec.items || []).map(String), det = spec.details || [];
    const box = el("div", "sr-box bn-box");
    if (spec.title) box.appendChild(el("h3", "sr-title", "🔎 " + esc(spec.title)));
    if (spec.intro) box.appendChild(el("p", "subtitle", esc(spec.intro)));
    let listIn = null, bSort = null;
    if (spec.editItems) {
      const ll = el("label", "sr-in sr-list"); ll.appendChild(el("span", null, "📋 Danh sách:")); listIn = el("input"); listIn.value = items.join(", ");
      listIn.placeholder = "Gõ các phần tử, cách nhau bởi dấu phẩy"; bSort = el("button", "btn ghost", "🔤 Sắp xếp"); bSort.type = "button";
      ll.append(listIn, bSort); box.appendChild(ll);
    }
    const top = el("div", "sr-top"), lb = el("label", "sr-in"), inp = el("input");
    lb.appendChild(el("span", null, "🎯 Cần tìm:")); inp.value = spec.target || ""; if (spec.editTarget === false) inp.readOnly = true; lb.appendChild(inp);
    const bNext = el("button", "btn", "▶ Bước tiếp"), bAll = el("button", "btn ghost", "⏩ Chạy hết"), bReset = el("button", "btn ghost", "🔄 Làm lại");
    top.append(lb, bNext, bAll, bReset); box.appendChild(top);
    const warn = el("div", "bn-warn"), cards = el("div", "sr-cards bn-cards"); let cs = [];
    const build = () => { cards.innerHTML = ""; cs = items.map((t, i) => { const c = el("div", "sr-card", '<span class="sr-no">' + (i + 1) + "</span>" + esc(t)); cards.appendChild(c); return c; }); };
    const msg = el("div", "sr-msg"), tw = el("div", "sr-tablewrap"), tb = el("table", "sr-table");
    tb.innerHTML = "<thead><tr><th>Bước lặp</th><th>Vùng tìm kiếm</th><th>Vị trí giữa</th><th>" + esc(spec.col || "Giá trị ở giữa") + "</th><th>So sánh</th><th>Kết quả</th></tr></thead><tbody></tbody>";
    tw.appendChild(tb); box.append(warn, cards, msg, tw);
    const body = tb.querySelector("tbody");
    const sortedOK = () => items.every((x, i) => i === 0 || cmpVal(items[i - 1], x) <= 0);
    const paintWarn = () => { warn.innerHTML = sortedOK() ? "" : "⚠️ Danh sách <b>chưa được sắp xếp</b> — tìm kiếm nhị phân có thể cho kết quả sai. Hãy sắp xếp trước!"; };
    let lo = 0, hi = items.length - 1, k = 0, done = false;
    const reset = () => {
      lo = 0; hi = items.length - 1; k = 0; done = false; body.innerHTML = ""; msg.innerHTML = ""; inp.disabled = false;
      if (listIn) { listIn.disabled = false; bSort.disabled = false; }
      cs.forEach((c) => c.classList.remove("cur", "hit", "out")); bNext.disabled = bAll.disabled = false;
    };
    const step = () => {
      if (done) return;
      if (!items.length) { alert("Danh sách đang trống."); return; }
      const want = inp.value.trim();
      if (!want) { alert("Hãy nhập giá trị cần tìm."); inp.focus(); return; }
      inp.disabled = true; if (listIn) { listIn.disabled = true; bSort.disabled = true; }
      const lo0 = lo, hi0 = hi, mid = Math.floor((lo + hi) / 2), c = cmpVal(want, items[mid]); k++;
      let so, kq, found = false;
      if (c === 0) { so = "Bằng nhau"; kq = "Tìm thấy ở vị trí số " + (mid + 1) + (det[mid] ? " — " + det[mid] : ""); found = true; done = true; }
      else {
        if (c < 0) { so = "“" + want + "” nhỏ hơn (đứng trước)"; hi = mid - 1; } else { so = "“" + want + "” lớn hơn (đứng sau)"; lo = mid + 1; }
        if (lo > hi) { kq = "Vùng tìm kiếm không còn phần tử → Không tìm thấy"; done = true; }
        else kq = (c < 0 ? "Bỏ nửa sau" : "Bỏ nửa trước") + ", tìm tiếp ở vị trí " + (lo + 1) + " → " + (hi + 1);
      }
      cs.forEach((e, i) => {
        e.classList.toggle("cur", i === mid); e.classList.toggle("hit", found && i === mid);
        e.classList.toggle("out", i !== mid && (i < lo || i > hi)); // thẻ giữa vừa so sánh vẫn sáng, bước sau mới mờ
      });
      const tr = el("tr", found ? "sr-found" : done ? "sr-miss" : "");
      tr.innerHTML = "<td>" + k + "</td><td>" + (lo0 + 1) + " → " + (hi0 + 1) + "</td><td>" + (mid + 1) + "</td><td>" + esc(items[mid]) + '</td><td class="' + (found ? "yes" : "no") + '">' + esc(so) + "</td><td>" + esc(kq) + "</td>";
      body.appendChild(tr);
      let m = "Bước " + k + ": vùng tìm kiếm " + (lo0 + 1) + " → " + (hi0 + 1) + ", vị trí giữa = phần nguyên của (" + (lo0 + 1) + " + " + (hi0 + 1) + ")/2 = <b>" + (mid + 1) + "</b> (“" + esc(items[mid]) + "”). " + esc(so) + " → <b>" + esc(kq) + "</b>.";
      if (done) {
        const si = items.findIndex((x) => cmpVal(x, want) === 0), seq = si >= 0 ? si + 1 : items.length;
        m += '<div class="bn-cmp">📊 Tìm kiếm nhị phân: <b>' + k + "</b> bước lặp · Tìm kiếm tuần tự: <b>" + seq + "</b> bước lặp.</div>";
        sound(found ? "ok" : "no"); if (found) celebrate();
      }
      msg.innerHTML = m; bNext.disabled = bAll.disabled = done;
    };
    bNext.onclick = step;
    bAll.onclick = () => { let g = 0; while (!done && g++ < 100) { const kk = k; step(); if (k === kk) break; } };
    bReset.onclick = reset;
    if (listIn) {
      listIn.oninput = () => { items = listIn.value.split(/[,;]/).map((x) => x.trim()).filter(Boolean); det = []; build(); paintWarn(); reset(); };
      bSort.onclick = () => { items.sort(cmpVal); det = []; listIn.value = items.join(", "); build(); paintWarn(); reset(); };
    }
    build(); paintWarn();
    return box;
  }

  // ---- TRÒ CHƠI TÌM SỐ (activity.guess) — thẻ úp theo thứ tự tăng dần, HS (bạn B) chọn thẻ, app (bạn A) trả lời bằng nhau / lớn hơn / bé hơn ----
  //  guess: { title?, intro?, cards: [2, 3, 5, …] (tăng dần), target? } — gợi ý khi thẻ chọn chưa phải thẻ ở giữa vùng tìm kiếm. Không chấm, không gửi.
  function guessBox(a) {
    const spec = a.guess, vals = (spec.cards || []).map(Number), n = vals.length;
    const box = el("div", "sr-box gs-box");
    if (spec.title) box.appendChild(el("h3", "sr-title", "🃏 " + esc(spec.title)));
    if (spec.intro) box.appendChild(el("p", "subtitle", esc(spec.intro)));
    const top = el("div", "sr-top"), lb = el("label", "sr-in"), inp = el("input");
    inp.type = "number"; lb.appendChild(el("span", null, "🎯 Số B cần tìm:")); inp.value = spec.target != null ? spec.target : ""; lb.appendChild(inp);
    const bRand = el("button", "btn ghost", "🎲 Số ngẫu nhiên"), bReset = el("button", "btn ghost", "🔄 Chơi lại");
    top.append(lb, bRand, bReset); box.appendChild(top);
    const cards = el("div", "sr-cards gs-cards"), msg = el("div", "sr-msg"), log = el("ol", "gs-log");
    const cs = vals.map((v, i) => { const c = el("button", "sr-card gs-card", '<span class="sr-no">' + (i + 1) + '</span><span class="gs-face">?</span>'); c.type = "button"; cards.appendChild(c); return c; });
    box.append(cards, msg, log);
    let lo = 0, hi = n - 1, turns = 0, done = false;
    const paint = () => cs.forEach((c, i) => { c.classList.toggle("out", !c.classList.contains("hit") && (i < lo || i > hi)); c.disabled = done || i < lo || i > hi; });
    const reset = () => {
      lo = 0; hi = n - 1; turns = 0; done = false; msg.innerHTML = ""; log.innerHTML = ""; inp.disabled = false;
      cs.forEach((c) => { c.classList.remove("open", "hit", "out"); c.querySelector(".gs-face").textContent = "?"; }); paint();
    };
    cs.forEach((c, i) => { c.onclick = () => {
      if (done || i < lo || i > hi) return;
      const want = parseFloat(String(inp.value).replace(",", "."));
      if (!isFinite(want)) { alert("Bạn B hãy nhập số cần tìm trước."); inp.focus(); return; }
      inp.disabled = true; turns++;
      const v = vals[i], mid = Math.floor((lo + hi) / 2), note = i === mid ? "" : " (Theo tìm kiếm nhị phân, nên chọn thẻ ở giữa — vị trí số " + (mid + 1) + ")";
      c.classList.add("open"); c.querySelector(".gs-face").textContent = v;
      let ans;
      if (v === want) { ans = "Bằng nhau"; c.classList.add("hit"); done = true; }
      else if (want > v) { ans = "Lớn hơn"; lo = i + 1; } else { ans = "Bé hơn"; hi = i - 1; }
      log.appendChild(el("li", null, "Lượt " + turns + ": B chọn thẻ vị trí " + (i + 1) + " → " + v + ". A: “" + ans + "”" + (ans === "Bằng nhau" ? "" : " (số cần tìm " + (ans === "Lớn hơn" ? "lớn hơn " : "bé hơn ") + v + ")") + esc(note)));
      if (done) { msg.innerHTML = "🎉 Tìm thấy số <b>" + want + "</b> ở vị trí số " + (i + 1) + " sau <b>" + turns + "</b> lượt."; sound("ok"); celebrate(); }
      else if (lo > hi) { done = true; msg.innerHTML = "❌ Đã tìm hết dãy số — <b>không có số " + want + "</b> trong các thẻ (" + turns + " lượt)."; sound("no"); }
      else msg.innerHTML = "A trả lời: <b>“" + ans + "”</b> → B tìm tiếp trong các thẻ từ vị trí " + (lo + 1) + " đến " + (hi + 1) + ".";
      paint();
    }; });
    bReset.onclick = reset;
    bRand.onclick = () => { const pool = Math.random() < 0.8 ? vals : [1, 4, 7, 10, 12, 13, 14, 17, 19]; inp.value = pool[Math.floor(Math.random() * pool.length)]; reset(); };
    paint();
    return box;
  }

// ---- MÁY IF TRỰC QUAN (activity.ifmachine) — kéo thanh giá trị, sơ đồ nhánh Đúng/Sai của IF / IF lồng nhau sáng lên ----
  //  ifmachine: { title?, intro?, label, cell: "N3", pct?: true (giá trị tính bằng %), min, max, step, value, unit?, outCell?: "O3",
  //               presets?: [{ label, value }], product?: { label, unit? } (kết quả là tỉ lệ % -> hiện giá trị × tỉ lệ),
  //               modes: [{ name, formula, levels: [{ op?: ">", gt: 80, result: "Nhiều quá" }, …], otherwise: "Ít hơn" }] }
  //  Điều kiện kiểm tra lần lượt từ trên xuống: điều kiện đầu tiên đúng -> trả về kết quả của nó; không điều kiện nào đúng -> otherwise. Không chấm.
  function ifBox(a) {
    const spec = a.ifmachine, modes = spec.modes || [], pct = !!spec.pct;
    let mi = 0, val = +spec.value || 0;
    const box = el("div", "sr-box if-box");
    box.appendChild(el("h3", "sr-title", "🔀 " + esc(spec.title || "Máy IF trực quan")));
    if (spec.intro) box.appendChild(el("p", "subtitle", esc(spec.intro)));
    const seg = el("div", "so-seg if-modes");
    const bs = modes.map((m, i) => { const b = el("button", "btn ghost", esc(m.name || "Chế độ " + (i + 1))); b.type = "button"; b.onclick = () => { mi = i; draw(); }; seg.appendChild(b); return b; });
    if (modes.length > 1) box.appendChild(seg);
    const row = el("div", "if-in"), rng = el("input"), num = el("input");
    rng.type = "range"; num.type = "number";
    [rng, num].forEach((x) => { x.min = spec.min != null ? spec.min : 0; x.max = spec.max != null ? spec.max : 100; x.step = spec.step || 1; });
    row.appendChild(el("span", "if-lab", esc(spec.label || "Giá trị") + (spec.cell ? " (<b>" + esc(spec.cell) + "</b>)" : "") + ":"));
    row.append(rng, num, el("span", "if-unit", esc(pct ? "%" : spec.unit || "")));
    box.appendChild(row);
    if ((spec.presets || []).length) {
      const pr = el("div", "if-presets");
      spec.presets.forEach((p) => { const b = el("button", "btn ghost if-chip", esc(p.label)); b.type = "button"; b.onclick = () => { val = +p.value; draw(); }; pr.appendChild(b); });
      box.appendChild(pr);
    }
    const fxl = el("div", "if-fx"), flow = el("div", "if-flow"), out = el("div", "if-out");
    box.append(fxl, flow, out);
    const nf = (x) => (+x).toLocaleString("en-US", { maximumFractionDigits: 4 });
    const show = (x) => nf(x) + (pct ? "%" : "");
    const test = (lv) => { const op = lv.op || ">", g = +lv.gt; return op === ">" ? val > g : op === ">=" ? val >= g : op === "<" ? val < g : op === "<=" ? val <= g : op === "=" ? val === g : val !== g; };
    const q = (r) => (typeof r === "string" && !/^[-+]?\d+(\.\d+)?%?$/.test(r) ? "“" + esc(r) + "”" : esc(r));
    function draw() {
      const m = modes[mi] || { levels: [] }, lv = m.levels || [];
      bs.forEach((b, i) => b.classList.toggle("on", i === mi));
      rng.value = val; num.value = val;
      fxl.innerHTML = '<span class="xs-fx">fx</span><code>' + esc(m.formula || "") + "</code>";
      let hit = lv.findIndex(test), h = "";
      lv.forEach((l, i) => {
        const st = hit < 0 || i < hit ? "no" : i === hit ? "yes" : "idle";
        h += '<div class="if-row"><div class="if-dia ' + st + '"><span>' + esc(spec.cell || "x") + " " + esc(l.op || ">") + " " + esc(show(l.gt)) + " ?</span></div>"
          + '<div class="if-arr ' + (st === "yes" ? "on" : "") + '">Đúng ➜</div><div class="if-res' + (st === "yes" ? " hit" : "") + '">' + q(l.result) + "</div></div>"
          + '<div class="if-down ' + (st === "no" ? "on" : "") + '">⬇ Sai</div>';
      });
      h += '<div class="if-row"><div class="if-res else' + (hit < 0 ? " hit" : "") + '">' + q(m.otherwise) + "</div></div>";
      flow.innerHTML = h;
      const res = hit < 0 ? m.otherwise : lv[hit].result;
      let o = "<span>" + esc(spec.cell || "x") + " = <b>" + esc(show(val)) + "</b></span> ➜ <span>" + esc(spec.outCell || "Kết quả") + " = <b class='if-big'>" + esc(res) + "</b></span>";
      if (spec.product) { const r = parseFloat(String(res)) / (/%$/.test(String(res)) ? 100 : 1); if (isFinite(r)) o += "<span>" + esc(spec.product.label) + " = " + nf(val) + " × " + esc(res) + " = <b>" + nf(Math.round(val * r * 1e6) / 1e6) + "</b>" + (spec.product.unit ? " " + esc(spec.product.unit) : "") + "</span>"; }
      out.innerHTML = o;
    }
    rng.oninput = () => { val = +rng.value; draw(); };
    num.oninput = () => { const v = parseFloat(String(num.value).replace(",", ".")); if (isFinite(v)) { val = v; rng.value = v; const n0 = num.value; draw(); num.value = n0; } };
    draw();
    return box;
  }

// ---- MÊ CUNG ROBOT (activity.maze) — Tin 9 Bài 14 ----------------------------------------------------
  //  maze: { title?, intro?, mode: "sim" | "race", mazes: [{ name, map: ["#####", "S...E", …], dir?: 1 }], rule?: "right" | "left",
  //          allowRule?: true, teams?: ["Đội 1", "Đội 2"] }   — map: # tường · . lối đi · S lối vào · E lối ra; dir: 0 Bắc 1 Đông 2 Nam 3 Tây
  //  "sim": robot chạy thuật toán bám tường (SGK Hình 14.3a) từng lần lặp; sáng dòng lệnh, báo quy tắc a/b/c, vẽ vệt đường đi,
  //         phát hiện lặp mãi (trạng thái vị trí + hướng lặp lại). "race": mỗi đội bấm ← ↑ → ↓ điều khiển robot tới Lối ra. Không chấm.
  const MZ_DR = [-1, 0, 1, 0], MZ_DC = [0, 1, 0, -1], MZ_ROT = [-90, 0, 90, 180];
  function mazeGrid(map) {
    const H = map.length, W = Math.max(...map.map((r) => r.length));
    const g = el("div", "mz-grid"); g.style.gridTemplateColumns = "repeat(" + W + ",1fr)"; g.style.aspectRatio = W + " / " + H;
    const cells = [];
    for (let r = 0; r < H; r++) for (let c = 0; c < W; c++) {
      const ch = map[r][c] || "#", d = el("div", "mz-c" + (ch === "#" ? " w" : ch === "S" ? " s" : ch === "E" ? " e" : ""));
      if (ch === "S") d.textContent = "Vào"; if (ch === "E") d.textContent = "Ra";
      g.appendChild(d); cells.push(d);
    }
    const bot = el("div", "mz-bot", '<span class="mz-arr">➤</span><span class="mz-face">🤖</span>'); g.appendChild(bot);
    let start = null; map.forEach((row, r) => { const c = row.indexOf("S"); if (c >= 0) start = { r, c }; });
    const wall = (r, c) => r < 0 || c < 0 || r >= H || c >= W || (map[r][c] || "#") === "#";
    const place = (r, c, d) => { bot.style.left = (c / W * 100) + "%"; bot.style.top = (r / H * 100) + "%"; bot.style.width = (100 / W) + "%"; bot.style.height = (100 / H) + "%"; bot.querySelector(".mz-arr").style.transform = "rotate(" + MZ_ROT[d] + "deg)"; };
    const cell = (r, c) => cells[r * W + c];
    return { g, H, W, start, wall, place, cell, isExit: (r, c) => map[r][c] === "E" };
  }
  function mazeBox(a) {
    const spec = a.maze, mazes = spec.mazes || [];
    const box = el("div", "sr-box mz-box");
    box.appendChild(el("h3", "sr-title", (spec.mode === "race" ? "🏁 " : "🤖 ") + esc(spec.title || "Mê cung robot")));
    if (spec.intro) box.appendChild(el("p", "subtitle", esc(spec.intro)));
    return spec.mode === "race" ? mazeRace(a, box, mazes[0] || { map: ["S.E"] }) : mazeSim(a, box, mazes);
  }
  function mazeSim(a, box, mazes) {
    const spec = a.maze; let mi = 0, rule = spec.rule === "left" ? "left" : "right", timer = null;
    const top = el("div", "sr-top");
    const selM = el("div", "so-seg"), selR = el("div", "so-seg");
    const mb = mazes.map((m, i) => { const b = el("button", "btn ghost", esc(m.name || "Mê cung " + (i + 1))); b.type = "button"; b.onclick = () => { mi = i; build(); }; selM.appendChild(b); return b; });
    const rb = [["right", "👉 Bám tường phải (SGK)"], ["left", "👈 Bám tường trái"]].map(([k, t]) => { const b = el("button", "btn ghost", t); b.type = "button"; b.onclick = () => { rule = k; build(); }; selR.appendChild(b); return [k, b]; });
    if (mazes.length > 1) top.appendChild(selM); if (spec.allowRule) top.appendChild(selR);
    box.appendChild(top);
    const ctrl = el("div", "sr-top"), bStep = el("button", "btn", "▶ Bước tiếp"), bRun = el("button", "btn ghost", "⏩ Chạy hết"), bReset = el("button", "btn ghost", "🔄 Làm lại");
    ctrl.append(bStep, bRun, bReset); box.appendChild(ctrl);
    const wrap = el("div", "mz-wrap"), stage = el("div", "mz-stage"), side = el("div", "mz-side");
    wrap.append(stage, side); box.appendChild(wrap);
    const code = el("pre", "mz-code"), sense = el("div", "mz-sense"), msg = el("div", "sr-msg mz-msg"), stat = el("div", "mz-stat");
    side.append(code, sense, msg, stat);
    let G, r, c, d, it, mv, seen, done;
    const P = () => (rule === "right" ? ["phải", "trái"] : ["trái", "phải"]);
    const lines = () => { const [x, y] = P(); return ["lặp lại động tác sau cho đến khi tìm thấy lối ra", "  nếu bên " + x + " không có tường thì", "    quay " + x + " 90°", "    tiến một bước", "  nếu không thì", "    nếu phía trước không có tường thì", "      tiến một bước", "    nếu không thì", "      quay " + y + " 90°"]; };
    const HL = { a: [1, 2, 3], b: [4, 5, 6], c: [4, 7, 8], end: [0] };
    const paintCode = (k) => { code.innerHTML = lines().map((t, i) => '<span class="' + ((HL[k] || []).includes(i) ? "on" : "") + '">' + esc(t) + "</span>").join("\n"); };
    const sideDir = () => (rule === "right" ? (d + 1) % 4 : (d + 3) % 4), otherDir = () => (rule === "right" ? (d + 3) % 4 : (d + 1) % 4);
    const paintSense = () => { const [x] = P(); const sw = G.wall(r + MZ_DR[sideDir()], c + MZ_DC[sideDir()]), fw = G.wall(r + MZ_DR[d], c + MZ_DC[d]); sense.innerHTML = "📡 Bên " + x + ": <b>" + (sw ? "có tường" : "không có tường") + "</b> · Phía trước: <b>" + (fw ? "có tường" : "không có tường") + "</b>"; };
    const paintStat = () => { stat.innerHTML = "🔁 Lần lặp: <b>" + it + "</b> · 👣 Bước tiến: <b>" + mv + "</b>"; };
    function build() {
      stop(); mb.forEach((b, i) => b.classList.toggle("on", i === mi)); rb.forEach(([k, b]) => b.classList.toggle("on", k === rule));
      const m = mazes[mi] || { map: ["S.E"] }; G = mazeGrid(m.map); stage.innerHTML = ""; stage.appendChild(G.g);
      r = G.start.r; c = G.start.c; d = m.dir != null ? m.dir : 1; it = 0; mv = 0; seen = new Set(); done = false;
      G.cell(r, c).classList.add("t1"); G.place(r, c, d); paintCode(""); paintSense(); paintStat();
      msg.innerHTML = "Robot đứng ở Lối vào, quay mặt theo mũi tên ➤. Bấm ▶ Bước tiếp để thực hiện từng lần lặp.";
      bStep.disabled = bRun.disabled = false;
    }
    function trail() { const x = G.cell(r, c); x.classList.add(x.classList.contains("t1") ? "t2" : "t1"); }
    function step() {
      if (done) return false;
      if (G.isExit(r, c)) { done = true; paintCode("end"); msg.innerHTML = "🎉 Robot đã tìm thấy <b>Lối ra</b> sau " + it + " lần lặp, " + mv + " bước tiến."; sound("ok"); celebrate(); bStep.disabled = bRun.disabled = true; return false; }
      const k = r + "," + c + "," + d;
      if (seen.has(k)) { done = true; msg.innerHTML = "⚠️ Robot quay lại đúng vị trí và hướng đã đi qua — thuật toán sẽ <b>lặp mãi, không tìm thấy lối ra</b> ở mê cung này. Cần cải tiến giải pháp!"; sound("no"); bStep.disabled = bRun.disabled = true; return false; }
      seen.add(k); it++;
      const [x, y] = P(); let rk;
      if (!G.wall(r + MZ_DR[sideDir()], c + MZ_DC[sideDir()])) { d = sideDir(); r += MZ_DR[d]; c += MZ_DC[d]; mv++; rk = "a"; msg.innerHTML = "a) Bên " + x + " không có tường → <b>quay " + x + " 90°, tiến một bước</b>."; trail(); }
      else if (!G.wall(r + MZ_DR[d], c + MZ_DC[d])) { r += MZ_DR[d]; c += MZ_DC[d]; mv++; rk = "b"; msg.innerHTML = "b) Bên " + x + " có tường, phía trước không có → <b>tiến một bước</b>."; trail(); }
      else { d = otherDir(); rk = "c"; msg.innerHTML = "c) Bên " + x + " và phía trước đều có tường → <b>quay " + y + " 90°</b>."; }
      G.place(r, c, d); paintCode(rk); paintSense(); paintStat();
      if (G.isExit(r, c)) step();
      return !done;
    }
    function stop() { if (timer) { clearInterval(timer); timer = null; } bRun.textContent = "⏩ Chạy hết"; }
    bStep.onclick = () => { stop(); step(); };
    bRun.onclick = () => { if (timer) return stop(); bRun.textContent = "⏸ Tạm dừng"; timer = setInterval(() => { if (!box.isConnected || !step()) stop(); }, 260); };
    bReset.onclick = build;
    build();
    return box;
  }
  function mazeRace(a, box, m) {
    const teams = (a.maze.teams || ["Đội 1", "Đội 2"]).slice(0, 2);
    let t0 = null, winner = null;
    const wrap = el("div", "mz-race"), reset = el("button", "btn ghost", "🔄 Chơi lại"), banner = el("div", "sr-msg mz-msg");
    const P = teams.map((name, ti) => {
      const col = el("div", "mz-team"); col.appendChild(el("h4", null, (ti ? "🔴 " : "🔵 ") + esc(name)));
      const G = mazeGrid(m.map), stage = el("div", "mz-stage"); stage.appendChild(G.g); col.appendChild(stage);
      const pad = el("div", "mz-pad"), st = el("div", "mz-stat");
      const S = { G, r: G.start.r, c: G.start.c, d: m.dir != null ? m.dir : 1, mv: 0, bump: 0, done: false, st };
      [["↑", 0], ["←", 3], ["↓", 2], ["→", 1]].forEach(([t, d]) => { const b = el("button", "btn mz-k mz-k" + d, t); b.type = "button"; b.onclick = () => move(S, d); pad.appendChild(b); });
      col.append(pad, st); wrap.appendChild(col); return S;
    });
    const show = (S) => { S.st.innerHTML = "👣 Bước: <b>" + S.mv + "</b> · 💥 Chạm tường: <b>" + S.bump + "</b>" + (S.done ? " · ⏱️ <b>" + S.time + " giây</b>" : ""); };
    function move(S, d) {
      if (S.done) return; if (!t0) t0 = Date.now();
      S.d = d; const nr = S.r + MZ_DR[d], nc = S.c + MZ_DC[d];
      if (S.G.wall(nr, nc)) { S.bump++; S.G.g.classList.remove("shake"); void S.G.g.offsetWidth; S.G.g.classList.add("shake"); sound("no"); }
      else { S.r = nr; S.c = nc; S.mv++; const x = S.G.cell(nr, nc); x.classList.add(x.classList.contains("t1") ? "t2" : "t1"); }
      S.G.place(S.r, S.c, S.d);
      if (S.G.isExit(S.r, S.c)) { S.done = true; S.time = Math.round((Date.now() - t0) / 100) / 10; if (!winner) { winner = S; banner.innerHTML = "🏆 <b>" + esc(teams[P.indexOf(S)]) + "</b> thoát khỏi mê cung trước! (" + S.mv + " bước, " + S.time + " giây)"; sound("ok"); celebrate(); } }
      show(S);
    }
    function init() { t0 = null; winner = null; banner.innerHTML = "Hai đội bấm ← ↑ → ↓ đưa robot từ Lối vào tới Lối ra. Đội nào thoát trước thắng!"; P.forEach((S) => { S.r = S.G.start.r; S.c = S.G.start.c; S.d = m.dir != null ? m.dir : 1; S.mv = 0; S.bump = 0; S.done = false; S.G.g.querySelectorAll(".t1,.t2").forEach((x) => x.classList.remove("t1", "t2")); S.G.place(S.r, S.c, S.d); show(S); }); }
    reset.onclick = init;
    const top = el("div", "sr-top"); top.appendChild(reset);
    box.append(top, banner, wrap); init();
    return box;
  }

// ---- MÁY CHẠY THUẬT TOÁN LIỆT KÊ CÁC BƯỚC (activity.algo) — Tin 9 Bài 15 (tính lương, tìm max, số nguyên tố…) ----
  //  algo: { title?, intro?, vars?: ["max","x"] (thứ tự hiện trong bảng), samples?: [{ label, values: { x: [5, 12, 0] } }],
  //    lines: [{ id?, n: "4.1.", text: "Nếu x > max thì", indent?: 1, op, next?: "id" }] }
  //  op: "start" | "end" | "label" (chỉ hiển thị, bỏ qua) | "input" { v, prompt?, int?, min?, max?, list? (nhập dãy), len? } | "swap" { swap: ["a[j]", "a[j-1]"] } | "set" { sets: [["max", "x"], …] }
  //      | "if" { c: "x > max", yes?: "id", no?: "id" } (thiếu yes/no = sang dòng kế) | "output" { e: "max" } hoặc { out: "Không có dữ liệu!" }
  //      (out có thể chèn {tên_biến}); "goto" { next }. Biểu thức: số, biến, + - * / % mod ( ), so sánh = <> < > <= >=, and/or.
  //  Mỗi lần bấm = một bước; bảng biến, nhật kí, đầu ra. Không chấm, không gửi.
  function alEval(expr, vars) {
    let e = " " + String(expr == null ? "" : expr) + " ", bad = false;
    e = e.replace(/≤/g, "<=").replace(/≥/g, ">=").replace(/≠/g, "<>").replace(/×/g, "*").replace(/−/g, "-").replace(/\bmod\b/g, "%").replace(/\band\b/g, "&&").replace(/\bor\b/g, "||");
    e = e.replace(/<>/g, "!=").replace(/([^<>!=])=(?!=)/g, "$1==");
    e = e.replace(/([A-Za-z_][A-Za-z_0-9]*)\s*\[/g, (m, n) => (Array.isArray(vars[n]) ? "__A('" + n + "'," : ((bad = true), m))).replace(/\]/g, ")"); // a[j] -> phần tử thứ j (đánh số từ 1)
    e = e.replace(/(__A\('[A-Za-z_][A-Za-z_0-9]*',)|([A-Za-z_][A-Za-z_0-9]*)/g, (m, keep, w) => (keep || (w in vars && !Array.isArray(vars[w]) ? "__V('" + w + "')" : ((bad = true), m))));
    if (bad) return NaN;
    try { const v = Function("__A", "__V", "return (" + e + ")")((n, i) => { const x = vars[n][i - 1]; if (x === undefined) throw 0; return x; }, (n) => Number(vars[n])); return typeof v === "boolean" ? v : Number(v); } catch (x) { return NaN; }
  }
  // Gán: "max" hoặc phần tử dãy "a[j]"
  function alAssign(target, val, vars) {
    const m = /^\s*([A-Za-z_][A-Za-z_0-9]*)\s*\[(.+)\]\s*$/.exec(target);
    if (!m) { vars[target] = val; return target; }
    const i = alEval(m[2], vars); if (Array.isArray(vars[m[1]]) && i >= 1 && i <= vars[m[1]].length) vars[m[1]][i - 1] = val;
    return m[1];
  }
  const alFmt = (v) => (Array.isArray(v) ? v.map((x) => alFmt(x)).join(", ") : typeof v === "boolean" ? (v ? "Đúng" : "Sai") : typeof v === "number" && isFinite(v) ? (Math.round(v * 1000) / 1000).toLocaleString("en-US", { maximumFractionDigits: 3 }) : "?");
  function algoBox(a) {
    const spec = a.algo, L = spec.lines || [];
    const idx = (id) => L.findIndex((l) => l.id === id);
    const box = el("div", "sr-box al-box");
    box.appendChild(el("h3", "sr-title", "⚙️ " + esc(spec.title || "Máy chạy thuật toán")));
    if (spec.intro) box.appendChild(el("p", "subtitle", esc(spec.intro)));
    const ctrl = el("div", "sr-top"), bStep = el("button", "btn", "▶ Bước tiếp"), bRun = el("button", "btn ghost", "⏩ Chạy hết"), bReset = el("button", "btn ghost", "🔄 Làm lại");
    ctrl.append(bStep, bRun, bReset);
    (spec.samples || []).forEach((sm) => { const b = el("button", "btn ghost al-sample", "📋 " + esc(sm.label)); b.type = "button"; b.onclick = () => { reset(); queue = JSON.parse(JSON.stringify(sm.values || {})); say("📋 Dùng dữ liệu mẫu: " + esc(sm.label)); }; ctrl.appendChild(b); });
    box.appendChild(ctrl);
    const wrap = el("div", "al-wrap"), list = el("div", "al-list"), side = el("div", "al-side");
    const rows = L.map((l) => { const r = el("div", "al-line" + (l.op === "label" ? " lab" : ""), '<span class="al-n">' + esc(l.n || "") + "</span>" + esc(l.text)); r.style.paddingLeft = (10 + 26 * (l.indent || 0)) + "px"; list.appendChild(r); return r; });
    const ask = el("div", "al-ask"), mem = el("div", "al-mem"), out = el("div", "al-out"), log = el("ol", "al-log");
    side.append(ask, mem, out, log); wrap.append(list, side); box.appendChild(wrap);
    let p, vars, steps, done, queue = {}, timer = null, waiting = null, outs;
    const order = () => { const ks = (spec.vars || []).filter((k) => k in vars); Object.keys(vars).forEach((k) => { if (!ks.includes(k)) ks.push(k); }); return ks; };
    const paint = () => {
      rows.forEach((r, i) => { r.classList.toggle("on", i === p && !done); });
      const ks = order(); mem.innerHTML = "<b>🧠 Bảng biến</b>" + (ks.length ? '<table class="al-vars"><tr>' + ks.map((k) => "<th>" + esc(k) + "</th>").join("") + "</tr><tr>" + ks.map((k) => "<td>" + alFmt(vars[k]) + "</td>").join("") + "</tr></table>" : ' <span class="rn-empty">(chưa có biến)</span>');
      out.innerHTML = "<b>📤 Đầu ra</b>" + (outs.length ? outs.map((o) => '<div class="al-o">' + esc(o) + "</div>").join("") : ' <span class="rn-empty">(chưa có)</span>');
      bStep.disabled = bRun.disabled = done; paintAsk();
    };
    function paintAsk() {
      ask.innerHTML = ""; if (!waiting) return;
      const W = waiting, lb = el("label", "sr-in"), inp = el("input"), ok = el("button", "btn", "✔ Nhập");
      lb.appendChild(el("span", null, "⌨️ " + esc(W.prompt || "Nhập " + W.v) + " =")); if (W.list) { inp.placeholder = "VD: 3, 1, 2"; } else { inp.type = "number"; inp.step = "any"; } lb.appendChild(inp);
      const go = () => { const r = alTake(W, inp.value); if (r.err) { alert(r.err); inp.focus(); return; } put(W, r.v); waiting = null; p = nextOf(L[p]); paint(); };
      ok.onclick = go; inp.onkeydown = (e) => { if (e.key === "Enter") { e.preventDefault(); e.stopPropagation(); go(); } };
      ask.append(lb, ok); setTimeout(() => inp.focus(), 0);
    }
    const say = (t) => { log.appendChild(el("li", null, t)); log.scrollTop = log.scrollHeight; };
    // Nhận giá trị nhập: số (int?, min?, max?) hoặc dãy số (list: true, len: "N" = biến lưu số phần tử)
    function alTake(l, raw) {
      if (l.list) { const arr = (Array.isArray(raw) ? raw : String(raw).split(/[,;\s]+/)).filter((t) => String(t).trim() !== "").map((t) => parseFloat(String(t).replace(",", "."))); if (arr.length < 2 || arr.some((x) => !isFinite(x))) return { err: "Hãy nhập ít nhất 2 số, cách nhau bởi dấu phẩy." }; return { v: arr }; }
      const v = parseFloat(String(raw).replace(",", ".")); if (!isFinite(v)) return { err: "Hãy nhập một số." };
      if (l.int && !Number.isInteger(v)) return { err: "Hãy nhập số nguyên." };
      if (l.min != null && v < l.min) return { err: "Hãy nhập số lớn hơn hoặc bằng " + l.min + "." };
      if (l.max != null && v > l.max) return { err: "Hãy nhập số nhỏ hơn hoặc bằng " + l.max + "." };
      return { v };
    }
    function put(l, v) { vars[l.v] = v; if (l.list && l.len) vars[l.len] = v.length; say("⌨️ " + esc(l.n || "") + " Nhập " + esc(l.v) + " = <b>" + alFmt(v) + "</b>" + (l.list && l.len ? " (" + esc(l.len) + " = " + v.length + ")" : "")); }
    const nextOf = (l, jump) => { const t = jump != null ? jump : l.next; const i = t != null ? idx(t) : L.indexOf(l) + 1; return i < 0 ? L.length : i; };
    function reset() { stop(); p = 0; vars = {}; steps = 0; done = false; waiting = null; outs = []; log.innerHTML = ""; paint(); }
    function step() {
      if (done || waiting) return false;
      while (p < L.length && L[p].op === "label") p++;
      if (p >= L.length) { done = true; paint(); return false; }
      const l = L[p], tag = esc(l.n || ""); steps++;
      if (steps > 5000) { done = true; say("⚠️ Quá nhiều bước — dừng lại."); paint(); return false; }
      if (l.op === "input") {
        const q = queue[l.v];
        if (q && q.length) { const r = alTake(l, q.shift()); if (r.err) { waiting = l; paint(); return false; } put(l, r.v); p = nextOf(l); }
        else { waiting = l; paint(); return false; }
      } else if (l.op === "set") {
        const shown = (l.sets || []).map(([v, ex]) => alAssign(v, alEval(ex, vars), vars));
        say("⚙️ " + tag + " " + shown.map((v) => esc(v) + " = <b>" + alFmt(vars[v]) + "</b>").join(" · ")); p = nextOf(l);
      } else if (l.op === "swap") {
        const [x, y] = l.swap || [], vx = alEval(x, vars), vy = alEval(y, vars), n = alAssign(x, vy, vars); alAssign(y, vx, vars);
        say("🔁 " + tag + " Đổi chỗ " + esc(x) + " và " + esc(y) + " → <b>" + esc(n) + " = " + alFmt(vars[n]) + "</b>"); p = nextOf(l);
      } else if (l.op === "if") {
        const r = alEval(l.c, vars), yes = r === true || (typeof r === "number" && r !== 0 && isFinite(r));
        say("❓ " + tag + " " + esc(l.c) + " → <b>" + (yes ? "Đúng" : "Sai") + "</b>"); p = nextOf(l, yes ? l.yes : l.no);
      } else if (l.op === "output") {
        const o = l.out != null ? String(l.out).replace(/\{([A-Za-z_][A-Za-z_0-9]*)\}/g, (m, k) => (k in vars ? alFmt(vars[k]) : m)) : esc(l.e) + " = " + alFmt(alEval(l.e, vars));
        outs.push(o); say("📤 " + tag + " Xuất: <b>" + esc(o) + "</b>"); p = nextOf(l);
      } else if (l.op === "end") { say("🔴 " + tag + " Kết thúc (" + steps + " bước)"); done = true; sound("ok"); }
      else { say((l.op === "start" ? "🟢 " : "➡️ ") + tag + " " + esc(l.text)); p = nextOf(l); }
      paint(); return !done && !waiting;
    }
    function stop() { if (timer) { clearInterval(timer); timer = null; } bRun.textContent = "⏩ Chạy hết"; }
    bStep.onclick = () => { stop(); step(); };
    bRun.onclick = () => { if (timer) return stop(); bRun.textContent = "⏸ Tạm dừng"; timer = setInterval(() => { if (!box.isConnected || !step()) stop(); }, 220); };
    bReset.onclick = () => { queue = {}; reset(); };
    reset();
    return box;
  }

  // ---- BÀN TÍNH ẢO (Tin 8 Bài 1, Hình 1.1) — mỗi cột 2 hạt trên (mỗi hạt = 5) + 5 hạt dưới (mỗi hạt = 1); chỉ hạt gạt sát thanh ngang mới được tính ----
  //  activity.abacus: { title?, intro?, cols: 10, value?: "6302715408", presets?: [{ label, value }], showDigits?: true } — bàn tính thử tự do (không chấm)
  //  Câu hỏi { type: "abacus", question, answer: "1642", cols?: 4, mode?: "set" (HS gẩy hạt) | "read" (bàn tính hiện sẵn số, HS gõ số), showDigits? (hiện số dưới mỗi cột) }
  //  Chấm theo GIÁ TRỊ trên bàn tính (mỗi cột = 5 × hạt trên + hạt dưới) — abDigits PHẢI khớp core.js.
  const abDigits = (s) => String(s == null ? "" : s).replace(/\D/g, "").replace(/^0+/, "") || "0";
  const abFmt = (s) => abDigits(s).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  function mountAbacus(cols, opt) {
    opt = opt || {}; cols = Math.max(1, Math.min(13, cols || 10));
    const U = new Array(cols).fill(0), D = new Array(cols).fill(0);
    const CW = 64, BH = 22, BW = 50, PAD = 16, TOP = BH * 3.2, BAR = 12, BOT = BH * 6.4;
    const W = cols * CW + 2 * PAD, yBar = PAD + TOP, yBot = yBar + BAR + BOT, H = yBot + PAD + (opt.showDigits ? 34 : 0);
    const NS = "http://www.w3.org/2000/svg", mk = (t, at) => { const e = document.createElementNS(NS, t); for (const k in at) e.setAttribute(k, at[k]); return e; };
    const wrap = el("div", "ab-wrap"), svg = mk("svg", { viewBox: `0 0 ${W} ${H}`, class: "ab-svg" });
    wrap.style.maxWidth = Math.max(320, cols * 80) + "px"; // ít cột thì bàn tính nhỏ lại, không tràn màn chiếu
    svg.appendChild(mk("rect", { x: 3, y: 3, width: W - 6, height: yBot + PAD - 6, rx: 12, class: "ab-frame" }));
    svg.appendChild(mk("rect", { x: PAD - 4, y: PAD - 4, width: W - 2 * PAD + 8, height: yBot - PAD + 8, rx: 6, class: "ab-in" }));
    const cx = (c) => PAD + c * CW + CW / 2, beads = [], digits = [];
    for (let c = 0; c < cols; c++) svg.appendChild(mk("line", { x1: cx(c), x2: cx(c), y1: PAD - 4, y2: yBot + 4, class: "ab-rod" }));
    svg.appendChild(mk("rect", { x: PAD - 4, y: yBar, width: W - 2 * PAD + 8, height: BAR, class: "ab-bar" }));
    for (let c = 0; c < cols; c++) {
      [["u", 2], ["d", 5]].forEach(([deck, n]) => {
        for (let j = 0; j < n; j++) {
          const b = mk("ellipse", { cx: 0, cy: 0, rx: BW / 2, ry: BH / 2 - 1.5, class: "ab-bead ab-" + deck });
          b.onclick = () => { if (locked) return; const A = deck === "u" ? U : D; A[c] = j < A[c] ? j : j + 1; paint(); if (api.onChange) api.onChange(); };
          svg.appendChild(b); beads.push({ b, c, j, deck });
        }
      });
      if (opt.showDigits) { const t = mk("text", { x: cx(c), y: yBot + PAD + 24, class: "ab-dig" }); svg.appendChild(t); digits.push(t); }
    }
    let locked = false;
    function paint() {
      beads.forEach(({ b, c, j, deck }) => {
        const on = j < (deck === "u" ? U : D)[c];
        const y = deck === "u" ? (on ? yBar - (j + 0.5) * BH : PAD + (1 - j + 0.5) * BH) : on ? yBar + BAR + (j + 0.5) * BH : yBot - (5 - j - 0.5) * BH;
        b.style.transform = `translate(${cx(c)}px,${y}px)`; b.classList.toggle("on", on);
      });
      digits.forEach((t, c) => { const v = 5 * U[c] + D[c]; t.textContent = v; t.classList.toggle("big", v > 9); });
    }
    const api = {
      el: wrap, onChange: null,
      value() { let s = 0; for (let c = 0; c < cols; c++) s = s * 10 + 5 * U[c] + D[c]; return String(s); },
      set(v) { const d = abDigits(v).padStart(cols, "0").slice(-cols); for (let c = 0; c < cols; c++) { U[c] = +d[c] >= 5 ? 1 : 0; D[c] = +d[c] % 5; } paint(); },
      lock() { locked = true; wrap.classList.add("locked"); },
    };
    wrap.appendChild(svg);
    wrap.appendChild(el("div", "ab-legend", '<span class="ab-k ab-ku"></span> hạt trên = 5 · <span class="ab-k ab-kd"></span> hạt dưới = 1 · chỉ tính hạt gạt sát thanh ngang (màu đậm) · bấm vào hạt để gẩy'));
    paint();
    return api;
  }
  function abacusBox(a) {
    const sp = a.abacus, box = el("div", "sr-box ab-box");
    box.appendChild(el("h3", "sr-title", "🧮 " + esc(sp.title || "Bàn tính ảo")));
    if (sp.intro) box.appendChild(el("p", "subtitle", esc(sp.intro)));
    const ab = mountAbacus(sp.cols || 10, { showDigits: sp.showDigits !== false }), show = el("div", "ab-val");
    const upd = () => { show.innerHTML = "Số trên bàn tính: <b>" + abFmt(ab.value()) + "</b>"; };
    ab.onChange = upd;
    const top = el("div", "sr-top"), clr = el("button", "btn ghost", "🔄 Gạt hết về 0");
    clr.onclick = () => { ab.set("0"); upd(); }; top.appendChild(clr);
    (sp.presets || []).forEach((p) => { const b = el("button", "btn ghost", "📋 " + esc(p.label || abFmt(p.value))); b.onclick = () => { ab.set(p.value); upd(); }; top.appendChild(b); });
    if (sp.value != null) ab.set(sp.value);
    box.append(top, ab.el, show); upd();
    return box;
  }
  function abacusParts(card, q) {
    const read = q.mode === "read", ab = mountAbacus(q.cols || Math.max(4, abDigits(q.answer).length), { showDigits: !!q.showDigits && !read });
    if (read) { ab.set(q.answer); ab.lock(); }
    card.appendChild(ab.el);
    let input = null, row = null;
    if (read) { row = el("div", "xs-answer short-answer", "<label>✍️ Số:</label>"); input = el("input"); input.inputMode = "numeric"; input.placeholder = "Gõ số bàn tính đang biểu diễn…"; input.autocomplete = "off"; row.appendChild(input); card.appendChild(row); }
    return {
      ab, input,
      choice: () => (read ? (/\d/.test(input.value) ? abDigits(input.value) : "") : ab.value()),
      set: (ch) => { if (ch == null) return; if (read) input.value = ch; else ab.set(ch); },
      result(ch) {
        ab.lock(); if (input) input.disabled = true;
        const ok = ch != null && ch !== "" && abDigits(ch) === abDigits(q.answer);
        ab.el.classList.add(ok ? "ab-ok" : "ab-no"); if (input) input.classList.add(ok ? "ok" : "no");
        if (!ok) {
          const t = el("div", "ab-ans", `📖 Đáp án: <b>${abFmt(q.answer)}</b> `);
          if (!read) { const b = el("button", "btn ghost", "👀 Xem cách gẩy đúng"); b.onclick = () => { ab.set(q.answer); b.remove(); }; t.appendChild(b); }
          card.appendChild(t);
        }
        return ok;
      },
    };
  }
  function abacusQuestionFree(card, a, q, answered) {
    const P = abacusParts(card, q), btn = el("button", "btn", "✅ Kiểm tra");
    if (P.input) { btn.disabled = true; P.input.oninput = () => { btn.disabled = answered.done || !P.choice(); }; P.input.onkeydown = (e) => { if (e.key === "Enter" && !btn.disabled) btn.click(); }; }
    btn.onclick = () => { if (answered.done) return; const ch = P.choice(); if (!ch) return; answered.done = true; btn.disabled = true; afterAnswer(P.result(ch), q, card, ch); };
    card.appendChild(wrapEl(btn));
    if (q.hint) card.appendChild(revealBox("💡 Gợi ý", () => el("div", "hint-box", "💡 " + esc(q.hint))));
    card._answered = answered; card._q = q;
    const done = ask("getAttempt", card._key);
    if (done) { answered.done = true; btn.disabled = true; P.set(done.choice); answerFeedback(P.result(done.choice), q, card, true); }
    else if (state.showAnswers) card.appendChild(el("div", "xs-expect", "📖 Đáp án: " + abFmt(q.answer)));
  }
  function abacusQuestionDeferred(card, a, qs, q, key, rec, st) {
    const P = abacusParts(card, q), kind = q.mode === "read" ? "short" : "abacus";
    if (st === "revealed") {
      if (rec && rec.choice != null) { P.set(rec.choice); answerFeedback(P.result(rec.choice), q, card, true); }
      else { P.result(""); const fb = el("div", "feedback no"); fb.innerHTML = `⏳ Nhóm em chưa trả lời câu này.<div class="explain">${esc(q.explanation || "")}</div>`; card.appendChild(fb); quizNav(card, a, qs); }
      return;
    }
    if (rec) P.set(rec.choice);
    let note = deferNote(st, !!rec, kind), last = rec ? rec.choice : null;
    const send = () => {
      const ch = P.choice(); if (!ch || ch === last) return; last = ch;
      const ok = abDigits(ch) === abDigits(q.answer);
      emit("onAttempt", { key, activityId: aid(a._parent || a), ok, fraction: ok ? 1 : 0, choice: ch });
      const n2 = deferNote(st, true, kind); note.replaceWith(n2); note = n2;
      const pill = card.querySelector(".q-pill.cur"); if (pill) pill.classList.add("done");
    };
    if (st === "open") {
      let t = null;
      if (P.input) { P.input.oninput = () => { clearTimeout(t); t = setTimeout(send, 900); }; P.input.onchange = () => { clearTimeout(t); send(); }; P.input.onkeydown = (e) => { if (e.key === "Enter") { clearTimeout(t); send(); } }; }
      else P.ab.onChange = () => { clearTimeout(t); t = setTimeout(send, 600); };
    } else { P.ab.lock(); if (P.input) P.input.disabled = true; }
    card.appendChild(note);
    if (q.hint && st === "open") card.appendChild(revealBox("💡 Gợi ý", () => el("div", "hint-box", "💡 " + esc(q.hint))));
    quizNav(card, a, qs);
  }

  // ---- MÔ PHỎNG KIẾN TRÚC VON NEUMANN — “chương trình được lưu trữ” (Tin 8 Bài 1, Hình 1.3) ----
  //  activity.vonneumann: { title?, intro?, programs: [{ name, inputs: { a: 7, b: 5 }, code: [
  //    { op: "in", v: "a", text: "Nhận số a từ bàn phím" }, { op: "calc", v: "c", e: "a + b", text: "Tính c = a + b" },
  //    { op: "out", e: "c", label: "Tổng", text: "Đưa c ra màn hình" }, { op: "end", text: "Dừng" } ] }] }
  //  💾 Tải chương trình: các lệnh vào bộ nhớ (nằm cùng dữ liệu). Mỗi lần ▶ Bước tiếp = 1 pha: ① NẠP lệnh từ bộ nhớ vào bộ xử lí,
  //  ② THỰC HIỆN lệnh (Thiết bị vào → Bộ nhớ, Bộ nhớ ⇄ Bộ xử lí, Bộ nhớ → Thiết bị ra); xong lệnh này mới nạp lệnh tiếp (tuần tự). Không chấm.
  function vnBox(a) {
    const spec = a.vonneumann, progs = spec.programs || [];
    const box = el("div", "sr-box vn-box");
    box.appendChild(el("h3", "sr-title", "🖥️ " + esc(spec.title || "Máy tính theo kiến trúc Von Neumann")));
    if (spec.intro) box.appendChild(el("p", "subtitle", esc(spec.intro)));
    const top = el("div", "sr-top"), loadBtns = progs.map((p, i) => { const b = el("button", "btn ghost vn-load", "💾 Tải chương trình: " + esc(p.name)); b.onclick = () => load(i); top.appendChild(b); return b; });
    const ctrl = el("div", "sr-top"), bStep = el("button", "btn", "▶ Bước tiếp"), bRun = el("button", "btn ghost", "⏩ Chạy hết"), bReset = el("button", "btn ghost", "🔄 Chạy lại từ đầu");
    ctrl.append(bStep, bRun, bReset);
    const sim = el("div", "vn-sim");
    const dIn = el("div", "vn-dev vn-in", "<h4>⌨️ Thiết bị vào</h4>"), inBox = el("div", "vn-inputs"); dIn.appendChild(inBox);
    const aIn = el("div", "vn-arr", "➜"), aOut = el("div", "vn-arr", "➜");
    const core = el("div", "vn-core"), cpu = el("div", "vn-cpu", "<h4>⚙️ Bộ xử lí</h4>"), ir = el("div", "vn-ir"); cpu.appendChild(ir);
    const bus = el("div", "vn-bus"), down = el("span", "vn-down", "⬇"), up = el("span", "vn-up", "⬆"); bus.append(down, up);
    const mem = el("div", "vn-mem", "<h4>🧠 Bộ nhớ</h4>"), memT = el("div", "vn-cells"); mem.appendChild(memT);
    core.append(cpu, bus, mem);
    const dOut = el("div", "vn-dev vn-out", "<h4>🖥️ Thiết bị ra</h4>"), scr = el("div", "vn-screen"); dOut.appendChild(scr);
    sim.append(dIn, aIn, core, aOut, dOut);
    const msg = el("div", "vn-msg"), log = el("ol", "al-log vn-log");
    box.append(top, ctrl, sim, msg, log);
    let P = null, pc = 0, phase = "fetch", vars = {}, done = false, timer = null, loading = null, inputs = {};
    const vlist = () => { const vs = []; (P ? P.code : []).forEach((l) => { if (l.v && !vs.includes(l.v)) vs.push(l.v); }); return vs; };
    function hl(parts) { [dIn, aIn, cpu, down, up, aOut, dOut].forEach((x) => x.classList.remove("on")); parts.forEach((x) => x.classList.add("on")); }
    function drawMem(shown, hot) {
      memT.innerHTML = "";
      if (!P) { memT.appendChild(el("div", "rn-empty", "(trống — hãy tải một chương trình)")); return; }
      memT.appendChild(el("div", "vn-sec", "📜 Chương trình (các lệnh)"));
      P.code.forEach((l, i) => { if (shown != null && i >= shown) return; memT.appendChild(el("div", "vn-cell lenh" + (hot === "L" + i ? " hot" : "") + (!done && i === pc && shown == null ? " pc" : ""), `<span class="vn-ad">${i + 1}</span>${esc(l.text)}`)); });
      memT.appendChild(el("div", "vn-sec", "📦 Dữ liệu"));
      vlist().forEach((v) => memT.appendChild(el("div", "vn-cell du-lieu" + (hot === "D" + v ? " hot" : ""), `<span class="vn-ad">${esc(v)}</span>${v in vars ? "<b>" + alFmt(vars[v]) + "</b>" : '<span class="rn-empty">…</span>'}`)));
    }
    function drawInputs() {
      inBox.innerHTML = ""; inputs = {};
      const ins = P ? P.code.filter((l) => l.op === "in") : [];
      if (!ins.length) { inBox.appendChild(el("div", "rn-empty", P ? "(chương trình không cần nhập)" : "…")); return; }
      ins.forEach((l) => { const lb = el("label", "rn-in", esc(l.v) + " = "), inp = el("input"); inp.type = "number"; inp.step = "any"; inp.value = (P.inputs || {})[l.v] != null ? P.inputs[l.v] : 1; lb.appendChild(inp); inBox.appendChild(lb); inputs[l.v] = inp; });
    }
    const say = (t) => { msg.innerHTML = t; log.appendChild(el("li", null, t)); log.scrollTop = log.scrollHeight; };
    function stop() { if (timer) { clearInterval(timer); timer = null; } bRun.textContent = "⏩ Chạy hết"; }
    function restart(quiet) {
      stop(); pc = 0; phase = "fetch"; vars = {}; done = false; scr.innerHTML = ""; log.innerHTML = ""; ir.innerHTML = '<span class="rn-empty">(chưa có lệnh)</span>'; hl([]);
      Object.values(inputs).forEach((x) => (x.disabled = false));
      drawMem(); bStep.disabled = bRun.disabled = !P;
      if (!quiet && P) say("🔄 Chạy lại chương trình “" + esc(P.name) + "” từ lệnh 1.");
    }
    function load(i) {
      if (loading) clearInterval(loading); stop();
      P = progs[i]; loadBtns.forEach((b, k) => b.classList.toggle("sel", k === i));
      drawInputs(); restart(true); log.innerHTML = "";
      let k = 0; bStep.disabled = bRun.disabled = true; hl([]); drawMem(0);
      msg.innerHTML = "💾 Đang tải chương trình vào bộ nhớ…";
      loading = setInterval(() => {
        k++; if (!box.isConnected) return clearInterval(loading);
        if (k <= P.code.length) { drawMem(k); return; }
        clearInterval(loading); loading = null; drawMem(); bStep.disabled = bRun.disabled = false;
        say("💾 Đã tải chương trình “" + esc(P.name) + "” vào bộ nhớ: các lệnh được lưu trong bộ nhớ giống như dữ liệu.");
      }, 180);
    }
    function step() {
      if (!P || done || loading) return false;
      const l = P.code[pc];
      if (!l) { done = true; return false; }
      if (phase === "fetch") {
        ir.innerHTML = `<span class="vn-ad">${pc + 1}</span>${esc(l.text)}`;
        hl([up, cpu]); drawMem(null, "L" + pc);
        say(`① Nạp lệnh ${pc + 1} từ bộ nhớ vào bộ xử lí: <b>${esc(l.text)}</b>`);
        phase = "exec"; return true;
      }
      phase = "fetch";
      if (l.op === "in") {
        const inp = inputs[l.v], v = parseFloat(String(inp ? inp.value : "").replace(",", "."));
        if (!isFinite(v)) { phase = "exec"; msg.innerHTML = "⚠️ Hãy nhập một số cho " + esc(l.v) + " ở Thiết bị vào."; if (inp) inp.focus(); return false; }
        vars[l.v] = v; if (inp) inp.disabled = true;
        hl([dIn, aIn, down]); drawMem(null, "D" + l.v);
        say(`② Thực hiện: nhận <b>${esc(l.v)} = ${alFmt(v)}</b> từ thiết bị vào, lưu vào bộ nhớ.`);
      } else if (l.op === "calc") {
        const v = alEval(l.e, vars); vars[l.v] = v;
        hl([up, cpu, down]); drawMem(null, "D" + l.v);
        say(`② Thực hiện: bộ xử lí lấy dữ liệu từ bộ nhớ, tính <b>${esc(l.e)} = ${alFmt(v)}</b>, ghi <b>${esc(l.v)}</b> vào bộ nhớ.`);
      } else if (l.op === "out") {
        const v = alEval(l.e, vars); scr.appendChild(el("div", "vn-line", (l.label ? esc(l.label) + ": " : "") + "<b>" + alFmt(v) + "</b>"));
        hl([up, cpu, aOut, dOut]); drawMem(null);
        say(`② Thực hiện: lấy <b>${esc(l.e)}</b> từ bộ nhớ, đưa ra thiết bị ra.`);
      } else {
        done = true; hl([cpu]); ir.innerHTML += ' <span class="vn-stop">⏹</span>'; drawMem();
        say("⏹ Chương trình kết thúc. Muốn máy làm nhiệm vụ khác, chỉ cần tải chương trình khác vào bộ nhớ.");
        bStep.disabled = bRun.disabled = true; sound("ok"); stop(); return false;
      }
      pc++; drawMem(null, l.op === "in" || l.op === "calc" ? "D" + l.v : null); return true;
    }
    bStep.onclick = () => { stop(); step(); };
    bRun.onclick = () => { if (timer) return stop(); bRun.textContent = "⏸ Tạm dừng"; timer = setInterval(() => { if (!box.isConnected || !step()) stop(); }, 1100); };
    bReset.onclick = () => restart();
    drawInputs(); restart(true); msg.innerHTML = "👆 Chọn một chương trình để tải vào bộ nhớ.";
    return box;
  }

  // ---- MÔ PHỎNG LAN TRUYỀN THÔNG TIN SỐ (activity.spread) — Tin 8 Bài 2: dễ nhân bản, lan truyền nhưng khó xoá bỏ hoàn toàn ----
  //  spread: { title?, intro?, thumb?: "assets/…jpg" (ảnh bản sao) | emoji?: "🏞️", steps: [{ text: "📸 Khoa chụp lại bức ảnh…",
  //    nodes: [{ id, icon: "📱", name: "Điện thoại của Khoa", from?: "id", via?: "thư điện tử", edited?: true, paper?: true (bản in, không phải thông tin số),
  //              lock?: "Máy chủ của dịch vụ thư điện tử — Khoa không có quyền xoá" }] }], end?: "kết luận hiện khi thử xoá" }
  //  ▶ Bước tiếp: thêm thiết bị nhận bản sao (sáng lên); 🗑️ trên từng thiết bị để thử xoá — thiết bị `lock` báo không xoá được.
  //  Bộ đếm "bản sao số đang tồn tại". Không chấm, không gửi.
  function spreadBox(a) {
    const spec = a.spread, steps = spec.steps || [], all = [];
    steps.forEach((s, si) => (s.nodes || []).forEach((n) => all.push(Object.assign({ si }, n))));
    const byId = (id) => all.find((n) => n.id === id);
    const box = el("div", "sr-box sp-box");
    box.appendChild(el("h3", "sr-title", "🌐 " + esc(spec.title || "Mô phỏng lan truyền thông tin số")));
    if (spec.intro) box.appendChild(el("p", "subtitle", esc(spec.intro)));
    const ctrl = el("div", "sr-top"), bStep = el("button", "btn", "▶ Bước tiếp"), bAll = el("button", "btn ghost", "⏩ Hiện hết"), bReset = el("button", "btn ghost", "🔄 Làm lại");
    ctrl.append(bStep, bAll, bReset);
    const stat = el("div", "sp-stat"), msg = el("div", "sp-msg"), grid = el("div", "sp-grid");
    box.append(ctrl, stat, msg, grid);
    let shown = 0, dead = {}, tried = false;
    const thumb = (n) => (spec.thumb ? `<img src="${esc(spec.thumb)}" alt=""${n.edited ? ' class="ed"' : ""}>` : `<span>${esc(spec.emoji || "🖼️")}</span>`) + (n.edited ? '<i class="sp-ed">✨ đã chỉnh sửa</i>' : "");
    function paint(newIds) {
      grid.innerHTML = "";
      const vis = all.filter((n) => n.si < shown), digital = vis.filter((n) => !n.paper), alive = digital.filter((n) => !dead[n.id]);
      vis.forEach((n) => {
        const c = el("div", "sp-node" + (n.paper ? " paper" : "") + (dead[n.id] ? " dead" : "") + (newIds && newIds.includes(n.id) ? " new" : "") + (n.lock ? " locked" : ""));
        const src = n.from && byId(n.from);
        c.innerHTML = `<div class="sp-dev">${esc(n.icon || "💻")}</div><div class="sp-name">${esc(n.name)}</div><div class="sp-copy">${dead[n.id] ? '<span class="sp-x">🗑️ đã xoá</span>' : thumb(n)}</div>`
          + (src ? `<div class="sp-from">⬅ từ ${esc(src.name)}${n.via ? " · " + esc(n.via) : ""}</div>` : n.paper ? '<div class="sp-from">🖨️ ảnh in trên giấy</div>' : "");
        if (!n.paper && !dead[n.id]) {
          const d = el("button", "sp-del", n.lock ? "🔒" : "🗑️"); d.type = "button"; d.title = n.lock ? "Thử xoá" : "Xoá bản sao này";
          d.onclick = () => {
            tried = true;
            if (n.lock) { msg.className = "sp-msg warn"; msg.innerHTML = "🔒 " + esc(n.lock); sound("no"); c.classList.add("shake"); setTimeout(() => c.classList.remove("shake"), 400); }
            else { dead[n.id] = true; const left = digital.filter((x) => !dead[x.id]).length; msg.className = "sp-msg"; msg.innerHTML = `🗑️ Đã xoá bản sao ở <b>${esc(n.name)}</b>` + (left ? ` — nhưng vẫn còn <b>${left}</b> bản sao ở nơi khác!` : "."); }
            paint(); if (tried && spec.end && shown >= steps.length) showEnd();
          };
          c.appendChild(d);
        }
        grid.appendChild(c);
      });
      stat.innerHTML = shown ? `📦 Bản sao số đang tồn tại: <b>${alive.length}</b>${digital.length > alive.length ? ` <small>(đã xoá ${digital.length - alive.length})</small>` : ""}` : "";
      bStep.disabled = bAll.disabled = shown >= steps.length;
    }
    function showEnd() { if (!box.querySelector(".sp-end")) box.appendChild(el("div", "sp-end", "💡 " + esc(spec.end))); }
    function step() { if (shown >= steps.length) return; const s = steps[shown]; shown++; msg.className = "sp-msg"; msg.innerHTML = esc(s.text); paint((s.nodes || []).map((n) => n.id)); if (shown >= steps.length) msg.innerHTML += "<br>👉 Giờ hãy thử bấm 🗑️ / 🔒 để xoá bức ảnh khỏi mọi nơi!"; }
    function reset() { shown = 0; dead = {}; tried = false; const e = box.querySelector(".sp-end"); if (e) e.remove(); msg.className = "sp-msg"; msg.innerHTML = "👆 Bấm ▶ Bước tiếp để xem bức ảnh đi đến đâu."; paint(); }
    bStep.onclick = step;
    bAll.onclick = () => { while (shown < steps.length) step(); };
    bReset.onclick = reset;
    reset();
    return box;
  }

  // ---- MÁY MÔ PHỎNG SẮP XẾP (activity.sorter) — nổi bọt / sắp xếp chọn như SGK Tin 7 Bài 16 ----
  //  sorter: { title?, intro?, algo: "bubble" | "selection", items: [3, 5, 4, 1, 2], editItems?, allowAlgo? (nút đổi thuật toán),
  //            allowDir? (nổi bọt: "Từ cuối dãy (SGK)" | "Từ đầu dãy (mở rộng)"), allowOrder? (tăng / giảm dần), practice? (HS tự quyết định) }
  //  Nổi bọt (SGK): với vị trí i, so sánh cặp kề nhau từ cuối dãy lên i, phần tử sau nhỏ hơn thì đổi chỗ. Chọn (SGK): so sánh phần tử ở
  //  vị trí i với từng phần tử phía sau, nhỏ hơn thì đổi chỗ. Luôn đủ n − 1 vòng lặp; mỗi bước = một lần so sánh. Không chấm, không gửi.
  const SORT_ORD = ["thứ nhất", "thứ hai", "thứ ba", "thứ tư", "thứ năm", "thứ sáu", "thứ bảy", "thứ tám", "thứ chín"];
  function sortSteps(arr0, algo, dir, desc) {
    const a = arr0.slice(), n = a.length, out = [], less = (x, y) => (desc ? cmpVal(x, y) > 0 : cmpVal(x, y) < 0);
    const push = (pass, i, j, swap, fixed) => { if (swap) { const t = a[i]; a[i] = a[j]; a[j] = t; } out.push({ pass, i, j, swap, arr: a.slice(), fixed }); };
    if (algo === "selection") {
      for (let i = 0; i < n - 1; i++) for (let j = i + 1; j < n; j++) push(i + 1, i, j, less(a[j], a[i]), j === n - 1 ? { from: 0, to: i } : null);
    } else if (dir === "front") {
      for (let p = 0; p < n - 1; p++) for (let j = 0; j < n - 1 - p; j++) push(p + 1, j, j + 1, less(a[j + 1], a[j]), j === n - 2 - p ? { from: n - 1 - p, to: n - 1 } : null);
    } else {
      for (let i = 0; i < n - 1; i++) for (let j = n - 1; j > i; j--) push(i + 1, j - 1, j, less(a[j], a[j - 1]), j === i + 1 ? { from: 0, to: i } : null);
    }
    return out;
  }
  function sorterBox(a) {
    const spec = a.sorter; let items = (spec.items || []).map(String), algo = spec.algo === "selection" ? "selection" : "bubble", dir = "back", desc = false;
    const practice = !!spec.practice;
    const box = el("div", "sr-box so-box");
    box.appendChild(el("h3", "sr-title", (practice ? "🙋 " : "🔵 ") + esc(spec.title || "Mô phỏng thuật toán sắp xếp")));
    if (spec.intro) box.appendChild(el("p", "subtitle", esc(spec.intro)));
    const opts = el("div", "sr-top");
    let listIn = null;
    if (spec.editItems) { const ll = el("label", "sr-in sr-list"); ll.appendChild(el("span", null, "📋 Dãy:")); listIn = el("input"); listIn.value = items.join(", "); listIn.placeholder = "Ví dụ: 3, 5, 4, 1, 2"; ll.appendChild(listIn); box.appendChild(ll); }
    const seg = (pairs, get, set) => { const w = el("span", "so-seg"); pairs.forEach(([v, label]) => { const b = el("button", "btn ghost", label); b.type = "button"; b.dataset.v = v; b.onclick = () => { set(v); paintSeg(); reset(); }; w.appendChild(b); }); w._get = get; return w; };
    const segs = [];
    if (spec.allowAlgo) segs.push(seg([["bubble", "🔵 Nổi bọt"], ["selection", "👆 Sắp xếp chọn"]], () => algo, (v) => { algo = v; }));
    let dirSeg = null;
    if (spec.allowDir) { dirSeg = seg([["back", "Từ cuối dãy (SGK)"], ["front", "Từ đầu dãy (mở rộng)"]], () => dir, (v) => { dir = v; }); segs.push(dirSeg); }
    if (spec.allowOrder) segs.push(seg([["asc", "Tăng dần"], ["desc", "Giảm dần"]], () => (desc ? "desc" : "asc"), (v) => { desc = v === "desc"; }));
    segs.forEach((s) => opts.appendChild(s));
    const paintSeg = () => { segs.forEach((s) => s.querySelectorAll("button").forEach((b) => b.classList.toggle("on", b.dataset.v === s._get()))); if (dirSeg) dirSeg.style.display = algo === "bubble" ? "" : "none"; };
    if (segs.length) box.appendChild(opts);
    const ctr = el("div", "sr-top");
    const bA = el("button", "btn", practice ? "🔁 Hoán đổi" : "▶ Bước tiếp"), bB = el("button", practice ? "btn" : "btn ghost", practice ? "➡️ Không hoán đổi" : "⏩ Chạy hết"), bReset = el("button", "btn ghost", "🔄 Làm lại");
    ctr.append(bA, bB, bReset); box.appendChild(ctr);
    const cards = el("div", "so-cards"), msg = el("div", "sr-msg"), stat = el("div", "so-stat"), tw = el("div", "sr-tablewrap"), tb = el("table", "sr-table");
    tb.innerHTML = "<thead><tr><th>Vòng lặp</th><th>So sánh</th><th>Kết quả</th><th>Dãy sau bước</th></tr></thead><tbody></tbody>";
    tw.appendChild(tb); box.append(cards, msg, stat, tw);
    const body = tb.querySelector("tbody");
    let steps = [], k = 0, cur = [], fixed = new Set(), errs = 0;
    const drawCards = (hl, swapped) => {
      cards.innerHTML = "";
      cur.forEach((v, i) => { const c = el("div", "so-card" + (fixed.has(i) ? " done" : "") + (hl && (i === hl[0] || i === hl[1]) ? " cmp" : "") + (swapped && (i === hl[0] || i === hl[1]) ? " swp" : ""), '<span class="sr-no">' + (i + 1) + "</span>" + esc(v)); cards.appendChild(c); });
    };
    const finish = () => { for (let i = 0; i < cur.length; i++) fixed.add(i); drawCards(); msg.innerHTML = "✅ Kết thúc — dãy đã được sắp xếp theo thứ tự " + (desc ? "giảm" : "tăng") + " dần: <b>" + cur.map(esc).join(", ") + "</b>." + (practice ? " Số lần chọn sai: <b>" + errs + "</b>." : ""); bA.disabled = bB.disabled = true; sound("ok"); if (!practice || errs === 0) celebrate(); };
    const reset = () => {
      if (listIn) items = listIn.value.split(/[,;\s]+/).map((x) => x.trim()).filter(Boolean);
      cur = items.slice(); steps = sortSteps(items, algo, dir, desc); k = 0; errs = 0; fixed = new Set(); body.innerHTML = ""; stat.innerHTML = "";
      bA.disabled = bB.disabled = steps.length === 0; if (listIn) listIn.disabled = false;
      if (practice && steps.length) { drawCards([steps[0].i, steps[0].j]); msg.innerHTML = "Vòng lặp " + SORT_ORD[0] + ": so sánh <b>" + esc(cur[steps[0].i]) + "</b> và <b>" + esc(cur[steps[0].j]) + "</b> — có hoán đổi không?"; }
      else { drawCards(); msg.innerHTML = steps.length ? "Bấm ▶ Bước tiếp để bắt đầu." : "Dãy cần ít nhất 2 phần tử."; }
    };
    const apply = () => {
      const s = steps[k], x = cur[s.i], y = cur[s.j], later = algo === "selection" ? y : cur[s.j], earlier = algo === "selection" ? x : cur[s.i];
      const rel = s.swap ? later + (desc ? " > " : " < ") + earlier : later + (cmpVal(later, earlier) === 0 ? " = " : desc ? " < " : " > ") + earlier;
      cur = s.arr.slice(); k++;
      if (s.fixed) for (let i = s.fixed.from; i <= s.fixed.to; i++) fixed.add(i);
      const tr = el("tr", s.swap ? "sr-found" : "");
      tr.innerHTML = "<td>" + SORT_ORD[s.pass - 1] + "</td><td>" + esc(x) + " và " + esc(y) + "</td><td>" + esc(rel) + " → " + (s.swap ? "hoán đổi" : "KHÔNG hoán đổi") + "</td><td><b>" + cur.map(esc).join("  ") + "</b></td>";
      body.appendChild(tr);
      drawCards([s.i, s.j], s.swap);
      let m = "Vòng lặp " + SORT_ORD[s.pass - 1] + ": so sánh " + esc(x) + " và " + esc(y) + " — " + esc(rel) + " ⇒ <b>" + (s.swap ? "hoán đổi" : "KHÔNG hoán đổi") + "</b>.";
      if (s.fixed) m += " Kết thúc vòng lặp " + SORT_ORD[s.pass - 1] + ".";
      if (listIn) listIn.disabled = true;
      if (k >= steps.length) { finish(); return; }
      if (practice) { const n2 = steps[k]; m += '<div class="so-next">Tiếp: so sánh <b>' + esc(cur[n2.i]) + "</b> và <b>" + esc(cur[n2.j]) + "</b> — có hoán đổi không?</div>"; setTimeout(() => drawCards([n2.i, n2.j]), 450); }
      msg.innerHTML = m;
    };
    const answer = (sw) => {
      if (k >= steps.length) return;
      const s = steps[k];
      if (s.swap !== sw) {
        errs++; stat.innerHTML = "❌ Chưa đúng (số lần sai: " + errs + "). " + (algo === "selection" ? "So sánh phần tử phía sau với phần tử ở vị trí đang xét" : "So sánh phần tử đứng sau với phần tử đứng trước") + ": " + (s.swap ? "phần tử đó " + (desc ? "lớn" : "nhỏ") + " hơn nên phải hoán đổi." : "không " + (desc ? "lớn" : "nhỏ") + " hơn nên không hoán đổi.");
        sound("no"); cards.classList.remove("shake"); void cards.offsetWidth; cards.classList.add("shake"); return;
      }
      stat.innerHTML = ""; apply();
    };
    if (practice) { bA.onclick = () => answer(true); bB.onclick = () => answer(false); }
    else { bA.onclick = () => { if (k < steps.length) apply(); }; bB.onclick = () => { let g = 0; while (k < steps.length && g++ < 500) apply(); }; }
    bReset.onclick = reset;
    if (listIn) listIn.onchange = reset;
    paintSeg(); reset();
    return box;
  }

  // ---- CHẠY THỬ CHƯƠNG TRÌNH SCRATCH (activity.scratch) — khối lệnh giống Scratch + sân khấu có chú mèo ----------
  //  scratch: { title?, intro?, sprite?: "🐱", script: [khối…] }   (mỗi khối có thể có n: 1 → hiện ① như SGK)
  //   { op: "flag" } · { op: "say", text | join: ["chuỗi", { v: "tên biến" } | { e: "a - b" }], secs? } · { op: "ask", text }
  //   { op: "set", var, answer: true } (đặt biến là trả lời) · { op: "set", var, expr: "a + b", show?: "a + b" }
  //   { op: "if", cond: "a > b || a == b", show: "a > b hoặc a = b", then: [...], else?: [...] }
  //   { op: "repeat", times: 10, body: [...] } · { op: "move", steps } · { op: "bounce" } · { op: "rotate", text? } · { op: "drum" }
  //  Không chấm điểm, không gửi — HS bấm 🏁 để chạy, nhập câu trả lời khi mèo hỏi, xem khối đang chạy sáng lên.
  const SB_CIRC = "①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳";
  function scCond(expr, vars) {
    let e = String(expr || "");
    Object.keys(vars).sort((x, y) => y.length - x.length).forEach((k) => { e = e.split(k).join("(" + Number(vars[k]) + ")"); });
    if (!/^[\d\s+\-*/().<>=!&|]+$/.test(e)) return false;
    try { return !!Function("return (" + e + ")")(); } catch (x) { return false; }
  }
  function scratchBox(a) {
    const spec = a.scratch, box = el("div", "sc-box");
    if (spec.title) box.appendChild(el("h3", "rn-title", "🐱 " + esc(spec.title)));
    if (spec.intro) box.appendChild(el("p", "subtitle", esc(spec.intro)));
    const wrap = el("div", "sc-wrap"), code = el("div", "sc-code"), right = el("div", "sc-right");
    const stage = el("div", "sc-stage"), sprite = el("div", "sc-sprite", `<span class="sc-cat">${esc(spec.sprite || "🐱")}</span><div class="sc-bubble" hidden></div>`);
    const askRow = el("div", "sc-ask"); askRow.hidden = true;
    const askIn = el("input"); askIn.type = "text"; askIn.placeholder = "Nhập câu trả lời rồi nhấn Enter"; const askOk = el("button", "btn", "✔");
    askRow.append(askIn, askOk); stage.append(sprite, askRow);
    const mon = el("div", "sc-mon"), ctr = el("div", "rn-ctrl"), bGo = el("button", "btn", "🏁 Chạy chương trình"), bStop = el("button", "btn ghost", "⏹ Dừng");
    ctr.append(bGo, bStop); right.append(ctr, stage, mon); wrap.append(code, right); box.appendChild(wrap);
    const bubble = sprite.querySelector(".sc-bubble"), cat = sprite.querySelector(".sc-cat");
    const txt = (t) => `<span class="sb-in">${esc(t)}</span>`, num = (t) => `<span class="sb-in sb-num">${esc(t)}</span>`, rv = (t) => `<span class="sb-rep sb-rv">${esc(t)}</span>`, rop = (t) => `<span class="sb-rep sb-rop">${esc(t)}</span>`, rsen = (t) => `<span class="sb-rep sb-rsen">${esc(t)}</span>`;
    const label = (b) => {
      switch (b.op) {
        case "flag": return "khi nhấn vào <b class='sb-flag'>🏁</b>";
        case "say": return "nói " + (b.join ? rop("nối " + b.join.map((p) => (typeof p === "string" ? "[" + p + "]" : "(" + (p.v || p.e) + ")")).join(" và ")) : txt(b.text)) + (b.secs ? " trong " + num(b.secs) + " giây" : "");
        case "ask": return "hỏi " + txt(b.text) + " và đợi";
        case "set": return "đặt " + `<span class="sb-in sb-dd">${esc(b.var)} ▾</span>` + " là " + (b.answer ? rsen("trả lời") : rop(b.show || b.expr));
        case "repeat": return "lặp lại " + num(b.times) + " lần";
        case "move": return "di chuyển " + num(b.steps) + " bước";
        case "bounce": return "nếu chạm biên, bật lại";
        case "rotate": return "chỉnh kiểu quay thành " + `<span class="sb-in sb-dd">${esc(b.text || "left-right")} ▾</span>`;
        case "drum": return "chơi trống " + `<span class="sb-in sb-dd">1 ▾</span>` + " trong " + num("0.25") + " nhịp";
        default: return esc(b.op);
      }
    };
    const CAT = { flag: "event", say: "looks", ask: "sensing", set: "variables", if: "control", repeat: "control", move: "motion", bounce: "motion", rotate: "motion", drum: "sound" };
    const nTag = (b) => (b.n ? `<i class="sb-n">${SB_CIRC[b.n - 1] || b.n}</i>` : "");
    const draw = (list, host) => list.forEach((b) => {
      if (b.op === "if" || b.op === "repeat") {
        const c = el("div", "sb sb-c sb-control"); b._el = c;
        c.appendChild(el("div", "sb-row", (b.op === "if" ? "nếu " + `<span class="sb-bool">${esc(b.show || b.cond)}</span>` + " thì" : label(b)) + nTag(b)));
        const inner = el("div", "sb-inner"); draw(b.then || b.body || [], inner); c.appendChild(inner);
        if (b.else) { c.appendChild(el("div", "sb-row", "còn không thì")); const i2 = el("div", "sb-inner"); draw(b.else, i2); c.appendChild(i2); }
        c.appendChild(el("div", "sb-foot", b.op === "repeat" ? "↻" : "")); host.appendChild(c);
      } else { const d = el("div", "sb sb-" + CAT[b.op] + (b.op === "flag" ? " sb-hat" : ""), label(b) + nTag(b)); b._el = d; host.appendChild(d); }
    });
    draw(spec.script || [], code);
    let vars = {}, answer = "", x = 0, dir = 1, flip = false, run = 0, askDone = null;
    const paintMon = () => { const ks = Object.keys(vars); mon.innerHTML = ks.length ? ks.map((k) => `<span class="sc-var">${esc(k)} <b>${esc(typeof vars[k] === "number" ? rnFmt(vars[k]) : vars[k])}</b></span>`).join("") : ""; };
    const place = () => { const W = Math.max(0, stage.clientWidth - 60); sprite.style.left = Math.round(W / 2 + x * (W / 480)) + "px"; cat.style.transform = flip && dir < 0 ? "scaleX(-1)" : ""; };
    const say = (t) => { bubble.hidden = !t; bubble.textContent = t || ""; };
    const sleep = (ms, id) => new Promise((ok) => setTimeout(() => ok(id === run), ms));
    const val = (p) => (typeof p === "string" ? p : p.e ? rnFmt(rnEval(p.e, vars)) : typeof vars[p.v] === "number" ? rnFmt(vars[p.v]) : String(vars[p.v] == null ? "" : vars[p.v]));
    async function exec(list, id) {
      for (const b of list) {
        if (id !== run) return false;
        b._el && b._el.classList.add("on");
        if (b.op === "say") { say(b.join ? b.join.map(val).join("") : b.text); if (!(await sleep(b.secs ? Math.min(b.secs, 3) * 1000 : 900, id))) return false; if (b.secs) say(""); }
        else if (b.op === "ask") {
          say(b.text); askRow.hidden = false; askIn.value = ""; askIn.focus();
          answer = await new Promise((ok) => { askDone = ok; }); askRow.hidden = true; say(""); if (id !== run) return false;
        } else if (b.op === "set") { const v = b.answer ? String(answer).trim().replace(",", ".") : null; vars[b.var] = b.answer ? (v !== "" && isFinite(+v) ? +v : String(answer)) : rnEval(b.expr, vars); paintMon(); if (!(await sleep(500, id))) return false; }
        else if (b.op === "if") { if (!(await sleep(500, id))) return false; b._el.classList.remove("on"); if (!(await exec(scCond(b.cond, vars) ? b.then || [] : b.else || [], id))) return false; }
        else if (b.op === "repeat") { for (let k = 0; k < (+b.times || 0); k++) { b._el.classList.add("on"); if (!(await exec(b.body || [], id))) return false; } }
        else if (b.op === "move") { x += (+b.steps || 0) * dir; place(); if (!(await sleep(250, id))) return false; }
        else if (b.op === "bounce") { if (x > 210 || x < -210) { dir = -dir; x = Math.max(-210, Math.min(210, x)); place(); } if (!(await sleep(150, id))) return false; }
        else if (b.op === "rotate") { flip = true; if (!(await sleep(150, id))) return false; }
        else if (b.op === "drum") { stage.classList.add("sc-beat"); if (!(await sleep(200, id))) return false; stage.classList.remove("sc-beat"); }
        else if (!(await sleep(400, id))) return false;
        b._el && b._el.classList.remove("on");
      }
      return true;
    }
    const clearOn = () => code.querySelectorAll(".sb.on").forEach((e) => e.classList.remove("on"));
    const submit = () => { if (askDone) { const f = askDone; askDone = null; f(askIn.value); } };
    askOk.onclick = submit; askIn.onkeydown = (e) => { if (e.key === "Enter") { e.preventDefault(); submit(); } };
    bGo.onclick = async () => { const id = ++run; submit(); clearOn(); vars = {}; answer = ""; x = 0; dir = 1; flip = false; say(""); paintMon(); place(); bGo.disabled = true; const ok = await exec(spec.script || [], id); if (id === run) { bGo.disabled = false; clearOn(); if (ok) sound("ok"); } };
    bStop.onclick = () => { run++; submit(); askRow.hidden = true; say(""); clearOn(); bGo.disabled = false; };
    setTimeout(place, 0); paintMon();
    return box;
  }

  // ---- HỘP THƯ ĐIỆN TỬ MÔ PHỎNG (activity.mail) — giao diện giống Gmail ------------------------
  // mail: { key?, me: { name, address }, login?: true (bắt đầu ở màn đăng nhập), signup?: true (có "Tạo tài khoản"),
  //         inbox: [{ from, addr, subject, body ("{ten}" = tên chủ hộp thư), time, files?: [{ name, src? (ảnh thật: hiện xem trước, bấm để phóng to) }], spam?, trap?: "🎁 Nhận quà ngay", star? }],
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
      ${(m.files || []).length ? `<div class="gm-files">${m.files.map((f) => (f.src ? `<span class="gm-file gm-imgfile" data-src="${esc(f.src)}" title="Bấm để xem ảnh"><img src="${esc(f.src)}" alt=""><span>${fileIco(f.name)} ${esc(f.name)}</span></span>` : `<span class="gm-file">${fileIco(f.name)} ${esc(f.name)}</span>`)).join("")}</div>` : ""}
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
    const det = spec.detect ? el("div", "gm-detect") : null;
    if (det) wrap.appendChild(det);
    function paintDet() { // thám tử: thư lừa đảo (scam) phải được Báo cáo thư rác / xoá; thư thật không bị báo nhầm
      if (!det) return;
      const mine = S2.items.filter((m) => /^i\d+$/.test(m.id)), scams = mine.filter((m) => m.scam), caught = scams.filter((m) => m.box === "spam" || m.box === "trash").length;
      const wrong = mine.filter((m) => !m.scam && !m.spam && m.box === "spam").length, all = caught === scams.length && !wrong;
      det.className = "gm-detect" + (all ? " done" : "");
      det.innerHTML = `🕵️ <b>Thám tử lừa đảo:</b> đã phát hiện <b>${caught}/${scams.length}</b> thư lừa đảo (Báo cáo thư rác hoặc Xoá)`
        + (wrong ? ` · <span class="gm-det-no">⚠️ Báo nhầm ${wrong} thư thật</span>` : "") + (all ? " · 🎉 Xuất sắc — hộp thư đã an toàn!" : "");
      if (all && !S2.detDone) { S2.detDone = true; celebrate(); sound("ok"); }
      if (!all) S2.detDone = false;
    }
    function draw() { box.innerHTML = ""; (S2.view === "login" ? drawLogin : S2.view === "signup" ? drawSignup : drawBox)(); paintDet(); }
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
        d.querySelectorAll(".gm-file").forEach((f) => { f.onclick = () => { if (m.box === "spam" || m.trap) { toast("⛔ Không mở tệp đính kèm từ thư lạ / thư rác!"); sound("no"); } else if (f.dataset.src) openLightbox(f.dataset.src); else toast("(Mô phỏng) Mở tệp " + f.textContent.trim()); }; });
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
.xs-gridwrap{overflow:hidden;touch-action:none;position:relative}
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
.xs-grid td.fillp{outline:2px dashed #6b7280;outline-offset:-3px}
.xs-fillh{position:absolute;width:11px;height:11px;margin:-6px 0 0 -6px;background:var(--xs-green);border:2px solid #fff;box-shadow:0 0 0 1px var(--xs-green);z-index:3;cursor:crosshair;touch-action:none}
.xs-fillh::before{content:"";position:absolute;inset:-11px}
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
.fc-node{display:inline-block;min-width:170px;max-width:100%;padding:9px 22px;font-weight:700;text-align:center;color:#1f2937;line-height:1.3;background:#fef08a;border-radius:4px}
.fc-term{background:#fbcfe8;border-radius:999px}
.fc-io{background:#99f6e4;border-radius:0;clip-path:polygon(9% 0,100% 0,91% 100%,0 100%);padding:9px 38px}
.fc-proc{background:#fef08a}
.fc-cond{background:#86efac;border-radius:0;clip-path:polygon(50% 0,100% 50%,50% 100%,0 50%);padding:22px 44px}
.fc-chart{display:flex;flex-direction:column;align-items:center;gap:2px;margin:10px auto}
.fc-arrow{font-size:1.4rem;font-weight:900;color:#334155;line-height:1}
.order-list.fc-list li{background:transparent;border:none;padding:0 0 0 0;margin:30px 0 0;position:relative;justify-content:center}
.order-list.fc-list li:first-child{margin-top:8px}
.order-list.fc-list li>span:first-child{flex:1;display:flex;justify-content:center}
.order-list.fc-list li+li::before{content:"↓";position:absolute;top:-30px;left:calc(50% - 48px);font-size:1.4rem;font-weight:900;color:#334155}
.order-list.fc-list li>span:last-child{flex:0 0 96px;display:flex;gap:6px}
.rv-row .fc-node{min-width:0}
.sr-box{margin:14px 0;border:3px solid #8b5cf6;border-radius:18px;background:#faf5ff;padding:12px 16px}
.sr-title{margin:0 0 6px;color:#6d28d9}
.sr-top{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin-bottom:12px}
.sr-in{display:flex;gap:8px;align-items:center;font-weight:700}
.sr-in input{font:inherit;padding:6px 10px;border:2px solid #c4b5fd;border-radius:10px;min-width:170px;max-width:60vw}
.sr-list{margin-bottom:10px}.sr-list input{flex:1;min-width:0;max-width:none;width:100%}
.sr-cards{display:flex;flex-wrap:wrap;gap:12px;margin:8px 0 10px}
.sr-card{position:relative;min-width:100px;padding:14px 14px 10px;border-radius:14px;background:#fff;border:3px solid #ddd6fe;text-align:center;font-weight:700;transition:all .25s}
.sr-no{position:absolute;top:-11px;left:-9px;background:#6d28d9;color:#fff;border-radius:999px;width:24px;height:24px;font-size:.8rem;line-height:24px}
.sr-card.seen{background:#f1f5f9;border-color:#cbd5e1;color:#64748b}
.sr-card.hit{background:#dcfce7;border-color:#16a34a;color:#166534}
.sr-card.cur{transform:translateY(-6px);box-shadow:0 8px 18px rgba(109,40,217,.25);border-color:#f59e0b}
.sr-card.cur.hit{border-color:#16a34a}
.sr-msg{min-height:1.6em;font-weight:600;margin:6px 0}
.sr-tablewrap{overflow-x:auto}
.sr-table{border-collapse:collapse;width:100%;background:#fff}
.sr-table th,.sr-table td{border:1px solid #cbd5e1;padding:6px 10px;text-align:center}
.sr-table th{background:#ede9fe}
.sr-table td.yes{color:#16a34a;font-weight:800}
.sr-table td.no{color:#dc2626}
.sr-table tr.sr-found td{background:#f0fdf4}
.sr-table tr.sr-miss td{background:#fef2f2}
.bn-cards{margin-bottom:30px}
.sr-card.out{opacity:.35;background:#f1f5f9;border-color:#e2e8f0}
.bn-box .sr-card.cur::after{content:"▲ vị trí giữa";position:absolute;left:50%;bottom:-22px;transform:translateX(-50%);font-size:.72rem;color:#ea580c;white-space:nowrap;font-weight:800}
.bn-warn{color:#b91c1c;font-weight:700;margin:4px 0}
.bn-cmp{margin-top:6px;padding:6px 10px;border-radius:10px;background:#fff7ed;border:2px dashed #fb923c;display:inline-block}
.gs-card{font:inherit;cursor:pointer;min-width:64px;min-height:64px;background:#6d28d9;color:#fff;border-color:#5b21b6;font-size:1.3rem}
.gs-card.open{background:#fff;color:#1f2937;border-color:#ddd6fe}
.gs-card.hit{background:#dcfce7;color:#166534;border-color:#16a34a}
.gs-card:disabled{cursor:default}
.gs-log{margin:6px 0 0;padding-left:22px;line-height:1.6}
.so-seg{display:inline-flex;gap:4px;flex-wrap:wrap;margin-right:8px}
.so-seg .btn.on{background:var(--primary,#4338ca);color:#fff;border-color:transparent}
.so-cards{display:flex;flex-wrap:wrap;gap:12px;margin:14px 0 8px}
.so-card{position:relative;min-width:62px;height:62px;padding:0 10px;display:flex;align-items:center;justify-content:center;border-radius:50%;background:#e0f2fe;border:3px solid #7dd3fc;font-size:1.5rem;font-weight:800;color:#0c4a6e;transition:all .3s}
.so-card .sr-no{top:-10px;left:-6px}
.so-card.cmp{border-color:#dc2626;background:#fff;box-shadow:0 0 0 4px rgba(220,38,38,.18)}
.so-card.swp{animation:so-swap .45s ease}
.so-card.done{background:#d1d5db;border-color:#9ca3af;color:#374151}
.so-next{margin-top:4px;color:#b45309}
.so-stat{color:#b91c1c;font-weight:700;min-height:1.2em}
.so-cards.shake{animation:so-shake .35s}
@keyframes so-swap{0%{transform:translateY(0)}50%{transform:translateY(-16px) scale(1.12)}100%{transform:none}}
@keyframes so-shake{0%,100%{transform:none}25%{transform:translateX(-8px)}75%{transform:translateX(8px)}}
.al-wrap{display:flex;flex-wrap:wrap;gap:16px;align-items:flex-start}
.al-list{flex:1 1 340px;background:#fff;border:2px solid #e2e8f0;border-radius:14px;padding:8px 0;font:600 1rem/1.5 Consolas,'Courier New',monospace}
.al-line{padding:3px 10px;border-left:5px solid transparent;transition:background .15s}
.al-line.on{background:#fef08a;border-left-color:#eab308}
.al-line.lab{color:#64748b}
.al-n{display:inline-block;min-width:2.6em;color:#7c3aed;font-weight:800}
.al-side{flex:1 1 300px;min-width:260px;display:flex;flex-direction:column;gap:8px}
.al-ask:not(:empty){display:flex;flex-wrap:wrap;gap:8px;align-items:center;padding:8px 10px;border:2px dashed #7c3aed;border-radius:12px;background:#f5f3ff}
.al-ask input{width:120px}
.al-vars{border-collapse:collapse;margin-top:4px;background:#fff}
.al-vars th,.al-vars td{border:1px solid #cbd5e1;padding:4px 10px;text-align:center;font-family:Consolas,monospace}
.al-vars th{background:#ede9fe}
.al-o{font-size:1.2rem;font-weight:800;color:#15803d}
.al-log{max-height:220px;overflow:auto;margin:0;padding-left:26px;line-height:1.55;font-size:.95rem;background:#f8fafc;border-radius:10px}
.al-sample{font-size:.95rem}
.ab-box{border-color:#d97706;background:#fffbeb}.ab-box .sr-title{color:#b45309}
.ab-wrap{margin:8px auto;max-width:860px}
.ab-svg{width:100%;height:auto;display:block;touch-action:manipulation;user-select:none;-webkit-user-select:none}
.ab-frame{fill:#92400e;stroke:#78350f;stroke-width:3}.ab-in{fill:#fef3c7}
.ab-rod{stroke:#a8a29e;stroke-width:4}.ab-bar{fill:#78350f}
.ab-bead{cursor:pointer;stroke-width:2;transition:transform .18s ease,fill .18s}
.ab-u{fill:#fed7aa;stroke:#fdba74}.ab-u.on{fill:#ea580c;stroke:#9a3412}
.ab-d{fill:#bfdbfe;stroke:#93c5fd}.ab-d.on{fill:#2563eb;stroke:#1e3a8a}
.ab-wrap.locked .ab-bead{cursor:default}
.ab-dig{font:800 24px/1 "Segoe UI",Arial,sans-serif;fill:#15803d;text-anchor:middle}.ab-dig.big{fill:#dc2626}
.ab-legend{text-align:center;color:#57534e;font-size:.95rem;margin-top:4px}
.ab-k{display:inline-block;width:22px;height:12px;border-radius:50%;vertical-align:middle}.ab-ku{background:#ea580c}.ab-kd{background:#2563eb}
.ab-val{text-align:center;font-size:1.35rem;margin-top:6px}.ab-val b{color:#b45309;font-size:1.7rem;letter-spacing:1px}
.ab-wrap.ab-ok .ab-frame{stroke:#16a34a;stroke-width:8}.ab-wrap.ab-no .ab-frame{stroke:#dc2626;stroke-width:8}
.ab-ans{margin:8px 0;font-size:1.15rem;display:flex;flex-wrap:wrap;gap:10px;align-items:center}
.vn-box{border-color:#0891b2;background:#ecfeff}.vn-box .sr-title{color:#0e7490}
.vn-load.sel{background:#0891b2;color:#fff;border-color:#0891b2}
.vn-sim{display:grid;grid-template-columns:minmax(150px,1fr) auto minmax(260px,1.7fr) auto minmax(150px,1fr);gap:8px;align-items:center;margin:8px 0}
.vn-sim h4{margin:0 0 6px;font-size:1.05rem}
.vn-dev,.vn-cpu,.vn-mem,.vn-dd .dropzone{background:#fff;border:3px solid #38bdf8;border-radius:12px;padding:8px 10px;transition:box-shadow .2s,border-color .2s}
.vn-core{background:#bae6fd;border:3px solid #0ea5e9;border-radius:14px;padding:10px;display:flex;flex-direction:column;gap:4px}
.vn-bus{display:flex;justify-content:center;gap:34px;font-size:1.5rem;font-weight:900;color:#0284c7;line-height:1}
.vn-arr{font-size:1.9rem;font-weight:900;color:#0284c7;text-align:center}
.vn-sim .on{border-color:#f59e0b;box-shadow:0 0 0 4px #fde68a}
.vn-arr.on,.vn-bus span.on{color:#ea580c;animation:vn-pulse .6s ease infinite alternate;box-shadow:none}
@keyframes vn-pulse{from{transform:scale(1)}to{transform:scale(1.35)}}
.vn-inputs{display:flex;flex-direction:column;gap:6px}.vn-inputs input{width:5em}
.vn-ir{min-height:2.2em;font-weight:700;background:#f0f9ff;border-radius:8px;padding:6px 8px}
.vn-cells{display:flex;flex-direction:column;gap:3px;max-height:320px;overflow:auto}
.vn-sec{font-size:.85rem;font-weight:800;color:#475569;margin-top:4px}
.vn-cell{display:flex;gap:8px;align-items:center;border-radius:6px;padding:3px 8px;font-size:.98rem;transition:background .2s}
.vn-cell.lenh{background:#e0f2fe}.vn-cell.du-lieu{background:#dcfce7}
.vn-cell.pc{outline:2px dashed #0284c7}.vn-cell.hot{background:#fde047;box-shadow:0 0 0 3px #facc15}
.vn-ad{flex:0 0 auto;min-width:1.8em;text-align:center;font-weight:900;color:#0369a1;background:#fff;border-radius:6px;padding:0 4px}
.vn-screen{min-height:4em;background:#0f172a;color:#86efac;border-radius:8px;padding:8px 10px;font:700 1.1rem Consolas,'Courier New',monospace}
.vn-stop{color:#dc2626}
.vn-msg{margin:6px 0;padding:10px 14px;border-radius:12px;background:#fff;border:2px dashed #0891b2;font-size:1.12rem;min-height:1.5em}
.vn-log{max-height:150px}
.vn-dd{margin-top:10px}.vn-dd .dropzone{margin:0;min-height:110px}.vn-dd .vn-core .dropzone{min-height:90px}
.dd-cols{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px}.dd-cols .dropzone{margin:0}
@media (max-width:760px){.vn-sim{grid-template-columns:1fr}.vn-arr{transform:rotate(90deg)}.vn-arr.on{animation:none}}
.icon-btn.lh-paused{background:#d97706;color:#fff;animation:lh-pz 1.2s ease-in-out infinite}
@keyframes lh-pz{50%{box-shadow:0 0 0 6px rgba(217,119,6,.3)}}
.gm-imgfile{flex-direction:column;align-items:flex-start;padding:6px}.gm-imgfile img{display:block;max-width:min(420px,70vw);max-height:260px;border-radius:8px;object-fit:cover}
.sp-box{border-color:#0d9488;background:#f0fdfa}.sp-box .sr-title{color:#0f766e}
.sp-stat{font-size:1.15rem;font-weight:700;color:#0f766e;min-height:1.4em}.sp-stat b{font-size:1.5rem;color:#b91c1c}
.sp-msg{margin:6px 0 10px;padding:9px 13px;border-radius:12px;background:#fff;border:2px dashed #14b8a6;font-size:1.08rem}.sp-msg.warn{border-color:#f59e0b;background:#fffbeb}
.sp-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:12px}
.sp-node{position:relative;background:#fff;border:3px solid #99f6e4;border-radius:16px;padding:10px;text-align:center;transition:opacity .3s,border-color .3s}
.sp-node.new{animation:sp-in .5s ease;border-color:#f59e0b;box-shadow:0 0 0 4px #fde68a}
.sp-node.paper{border-style:dashed;border-color:#d6d3d1;background:#fafaf9}
.sp-node.locked{border-color:#a5b4fc}
.sp-node.dead{opacity:.55;border-color:#e5e7eb}
.sp-node.shake{animation:so-shake .35s}
.sp-dev{font-size:2rem;line-height:1}.sp-name{font-weight:800;margin:4px 0;font-size:1rem}
.sp-copy{min-height:64px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px}
.sp-copy img{width:100%;max-width:120px;height:64px;object-fit:cover;border-radius:8px}.sp-copy img.ed{filter:saturate(1.8) contrast(1.1) hue-rotate(-12deg)}
.sp-copy>span{font-size:2.2rem}.sp-ed{font-size:.8rem;color:#b45309;font-style:normal;font-weight:700}.sp-x{font-size:1rem!important;color:#6b7280}
.sp-from{font-size:.82rem;color:#475569;margin-top:4px}
.sp-del{position:absolute;top:6px;right:6px;border:none;background:#f1f5f9;border-radius:8px;cursor:pointer;font-size:1rem;padding:2px 6px}.sp-del:hover{background:#fee2e2}
.sp-end{margin-top:12px;padding:10px 14px;border-radius:12px;background:#ecfdf5;border:2px solid #10b981;font-weight:700;font-size:1.1rem}
@keyframes sp-in{from{transform:scale(.6);opacity:0}}
.ld-wrap{display:flex;gap:18px;justify-content:center;flex-wrap:wrap;margin:8px 0 12px}
.ld-team{flex:1 1 260px;max-width:440px;border:3px solid #e2e8f0;border-radius:16px;padding:8px 12px;background:#f8fafc;transition:box-shadow .2s,border-color .2s}
.ld-team.turn{border-color:#f59e0b;box-shadow:0 0 0 4px #fde68a}
.ld-head{display:flex;justify-content:space-between;gap:8px;font-weight:800;font-size:1.15rem}
.ld-stair{display:flex;flex-direction:column-reverse;align-items:flex-end;gap:3px;margin-top:6px}
.ld-step{height:32px;border-radius:6px 6px 2px 2px;background:#cbd5e1;display:flex;align-items:center;justify-content:center;font-size:1.5rem;line-height:1;transition:background .3s}
.ld-step.done{background:#86efac}.ld-step.top{background:#fde68a}
.ld-me.hop{display:inline-block;animation:ld-hop .6s ease 2}
@keyframes ld-hop{50%{transform:translateY(-12px) scale(1.15)}}
.ld-turnbar{display:flex;gap:8px;justify-content:center;align-items:center;flex-wrap:wrap;margin:4px 0 8px}
.ld-turnbar .btn.on{background:#f59e0b;color:#fff;border-color:#f59e0b}
.ld-win{margin:4px 0 10px;padding:10px 14px;border-radius:14px;background:#fef3c7;border:3px solid #f59e0b;font-weight:900;font-size:1.25rem;text-align:center}
.ls-win{border:1px solid #cbd5e1;border-radius:12px;overflow:hidden;background:#e2e8f0;max-width:860px;margin:8px auto}
.ls-bar{background:#2b579a;color:#fff;padding:6px 12px;font-size:.95rem;display:flex;justify-content:space-between}.ls-bar span{background:#fff;color:#2b579a;border-radius:6px 6px 0 0;padding:0 10px;font-weight:700}
.ls-rib{display:flex;flex-wrap:wrap;gap:6px;padding:8px;background:#f8fafc;border-bottom:1px solid #cbd5e1;align-items:center}
.ls-b{font:inherit;font-size:.95rem;padding:6px 10px;border:1px solid #cbd5e1;border-radius:8px;background:#fff;cursor:pointer;color:#1e293b}
.ls-b:hover{border-color:#2b579a;background:#eff6ff}.ls-dd{margin-left:-7px;border-radius:0 8px 8px 0;padding:6px 7px}.ls-sep{margin-left:10px}
.ls-lib{background:#fff;border-bottom:1px solid #cbd5e1;padding:8px 10px}.ls-lib-t{font-weight:700;font-size:.9rem;margin-bottom:6px;color:#334155;background:#f1f5f9;padding:2px 6px}
.ls-lib-g{display:flex;flex-wrap:wrap;gap:8px}
.ls-tile{display:flex;flex-direction:column;justify-content:center;gap:3px;width:96px;height:82px;border:1px solid #cbd5e1;border-radius:4px;background:#fff;font:inherit;font-size:.85rem;cursor:pointer;padding:6px 8px;color:#1e293b}
.ls-tile:hover{border-color:#2b579a;background:#eff6ff}.ls-tile.none{align-items:center;font-size:1rem}
.ls-tile span{display:flex;align-items:center;gap:5px}.ls-tile i{flex:1;border-bottom:1.5px solid #64748b}
.ls-page{background:#fff;margin:12px auto;max-width:660px;padding:18px 24px 22px 6px;box-shadow:0 2px 10px rgba(0,0,0,.15);font-family:"Times New Roman",Cambria,serif;font-size:1.2rem;color:#111;text-align:left}
.ls-head{margin:3px 0 3px 30px}.ls-head.c{text-align:center;font-weight:700;margin-left:0}
.ls-row{display:flex;align-items:center;gap:2px;border-radius:3px}.ls-row.sel{background:#d1d5db}.ls-row.l1{padding-left:36px}
.ls-gut{width:28px;align-self:stretch;cursor:pointer;flex:none;border-radius:3px}.ls-gut:hover{background:#c7d2fe}
.ls-mk{display:inline-block;min-width:30px;flex:none;cursor:pointer;border-radius:4px;text-align:center}.ls-mk.bump{animation:lsBump 1.3s}
@keyframes lsBump{0%{background:#fde047;transform:scale(1.5)}100%{background:transparent;transform:none}}
.ls-txt{flex:1;min-width:0;border:0;background:transparent;font:inherit;color:inherit;padding:3px 2px;outline:none}
.ls-txt:focus{background:#f8fafc;box-shadow:inset 0 -2px 0 #2b579a}.ls-ck{flex:none;font-size:1.15rem;margin-left:6px}
.ws-wrap{display:flex;flex-wrap:wrap;gap:18px;justify-content:center;align-items:flex-start;margin-top:6px}
.ws-menu{display:flex;flex-direction:column;gap:6px;min-width:220px}.ws-mt{color:#2b579a;font-size:.95rem}
.ws-opt{font:inherit;text-align:left;padding:9px 12px;border:1px solid #cbd5e1;border-radius:8px;background:#fff;cursor:pointer;color:#1e293b}
.ws-opt:hover{border-color:#2b579a}.ws-opt.on{background:#2b579a;color:#fff;border-color:#2b579a}.ws-reset{margin-top:6px;text-align:center}
.ws-page{position:relative;width:min(330px,82vw);aspect-ratio:1/1.414;background:#fff;box-shadow:0 2px 14px rgba(0,0,0,.2);overflow:hidden;font-family:Arial,sans-serif;font-size:13px;flex:none}
.ws-flow{position:relative;z-index:1;padding:7% 8%;text-align:center;color:#111;line-height:1.25}.ws-flow p{margin:.3em 0}
.ws-img{position:relative;line-height:0;outline:2px solid rgba(43,87,154,.55);touch-action:none;text-align:left}
.ws-img img{width:100%;height:auto;display:block;pointer-events:none;user-select:none}
.ws-img.inline{margin:0 auto .3em 0}.ws-img.square{float:left;margin:0 .8em .4em 0}
.ws-img.abs{position:absolute;cursor:move}.ws-img.behind{z-index:0}.ws-img.front{z-index:2}
.ws-h{position:absolute;right:-8px;bottom:-8px;width:16px;height:16px;background:#fff;border:2px solid #2b579a;cursor:nwse-resize;z-index:5;touch-action:none}
.fl-bar,.fl-tools{display:flex;flex-wrap:wrap;gap:6px;align-items:center;justify-content:center;margin:6px 0}
.fl-lb{font-weight:700;color:#2b579a;font-size:.95rem}.fl-hint{color:#64748b;font-size:.95rem}
.fl-ins{font:inherit;font-size:.92rem;padding:5px 10px;border:1px solid #cbd5e1;border-radius:8px;background:#fff;cursor:pointer;color:#1e293b;display:inline-flex;align-items:center;gap:4px}
.fl-ins:hover{border-color:#2b579a;background:#eff6ff}.fl-ico svg{width:26px;height:26px;display:block}.fl-del{color:#b91c1c}
.fl-sw{width:28px;height:28px;border-radius:50%;border:2px solid #94a3b8;cursor:pointer;padding:0}.fl-sw.on{outline:3px solid #2b579a;outline-offset:2px}
.fl-wrap{display:flex;flex-wrap:wrap;gap:16px;justify-content:center;align-items:flex-start}
.fl-page{position:relative;width:min(360px,86vw);aspect-ratio:1/1.414;overflow:hidden;box-shadow:0 2px 14px rgba(0,0,0,.25);background:#0b1e4d;flex:none;font-family:Arial,sans-serif;user-select:none}
.fl-bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;pointer-events:none}.fl-layer{position:absolute;inset:0}
.fl-el{position:absolute;transform:translate(-50%,-50%);cursor:move;touch-action:none;line-height:1.15;text-align:center;white-space:nowrap}
.fl-el.sel{outline:2px dashed #fff;outline-offset:3px;box-shadow:0 0 0 1px #2b579a}
.fl-shape svg,.fl-pic img{display:block;width:100%;height:auto;pointer-events:none}
.fl-side{min-width:230px;max-width:320px;display:flex;flex-direction:column;gap:6px}.fl-ct{font-weight:800;color:#2b579a}
.fl-ck{background:#fff;border:1px solid #e2e8f0;border-radius:8px;padding:6px 10px;font-size:.95rem}.fl-ck.ok{background:#dcfce7;border-color:#86efac}
.fl-win{background:#fef9c3;border:2px solid #facc15;border-radius:10px;padding:8px 10px;font-weight:700}
.hf-wrap{display:flex;flex-wrap:wrap;gap:16px;justify-content:center;align-items:flex-start;margin-top:6px}
.hf-dlg{width:min(390px,100%);background:#f3f4f6;border:1px solid #9ca3af;box-shadow:0 6px 18px rgba(0,0,0,.2);font-family:"Segoe UI",Arial,sans-serif;font-size:.95rem;color:#111;text-align:left}
.hf-top{display:flex;justify-content:space-between;background:#fff;padding:7px 10px;border-bottom:1px solid #d1d5db}
.hf-tabs{display:flex;gap:2px;padding:6px 8px 0}.hf-tabs button{font:inherit;font-size:.9rem;padding:4px 10px;border:1px solid #cbd5e1;border-bottom:0;background:#e5e7eb;cursor:pointer}.hf-tabs button.on{background:#fff;font-weight:700}
.hf-body{background:#fff;margin:0 8px;border:1px solid #cbd5e1;padding:8px 10px}.hf-grp{color:#475569;font-size:.85rem;margin-bottom:2px}
.hf-row{display:block;margin:4px 0;cursor:pointer}.hf-row input{width:17px;height:17px;accent-color:#2b579a;vertical-align:middle;margin:0 6px 0 0}
.hf-sub{margin-left:24px}.hf-sub.off{opacity:.45}.hf-in{width:100%;box-sizing:border-box;font:inherit;padding:3px 6px;border:1px solid #9ca3af;background:#fff;margin:2px 0 4px}.hf-in:disabled{background:#f1f5f9}
.hf-ro{background:#f8fafc}.hf-nt{margin-top:8px}.hf-note{background:#fef9c3;border:1px solid #fde047;border-radius:6px;padding:6px 8px;margin-bottom:6px;font-size:.9rem}
.hf-btns{display:flex;justify-content:flex-end;gap:8px;padding:8px}.hf-btn{font:inherit;font-size:.9rem;padding:5px 12px;border:1px solid #9ca3af;background:#fff;cursor:pointer}.hf-btn.main{border:2px solid #2b579a}.hf-btn:hover{background:#eff6ff}
.hf-right{flex:1 1 360px;max-width:560px}.hf-hint{font-size:.9rem;color:#475569;margin-bottom:4px}
.hf-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}.hf-cell{text-align:center}.hf-no{font-weight:700;color:#475569}
.hf-sl{position:relative;aspect-ratio:16/9;background:#fff;border:2px solid #cbd5e1;border-radius:4px;cursor:pointer;overflow:hidden;font-family:Arial,sans-serif;text-align:left;display:flex;flex-direction:column;box-shadow:0 2px 6px rgba(0,0,0,.1)}
.hf-sl.sel{border-color:#ea580c;box-shadow:0 0 0 3px rgba(234,88,12,.35)}
.hf-in-sl{flex:1;padding:6% 7% 0;overflow:hidden}.hf-t1{color:#16a34a;font-weight:800;font-size:.95rem;margin-top:14%;text-align:center}.hf-sub1{font-size:.62rem;text-align:center;color:#334155;margin-top:4px}
.hf-t2{color:#16a34a;font-weight:800;font-size:.72rem;text-align:center;margin-bottom:3px}.hf-sl ul{margin:0;padding-left:1.1em;font-size:.44rem;color:#111;line-height:1.3}
.hf-ft{display:flex;justify-content:space-between;gap:4px;padding:0 5% 3%;font-size:.5rem;color:#64748b;font-style:italic;min-height:1.2em}.hf-ft span{flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.hf-ft span:nth-child(2){text-align:center}.hf-ft span:nth-child(3){text-align:right;font-style:normal;font-weight:700}
.cs-wrap{display:flex;flex-wrap:wrap;gap:16px;align-items:flex-start;justify-content:center;margin-top:6px}
.cs-ctl{flex:1 1 330px;max-width:460px;display:flex;flex-direction:column;gap:8px;text-align:left}.cs-row{display:flex;flex-wrap:wrap;gap:5px;align-items:center}
.cs-chip{font:inherit;font-size:.9rem;padding:4px 10px;border:1px solid #cbd5e1;border-radius:999px;background:#fff;cursor:pointer}.cs-chip.on{background:var(--primary,#2563eb);color:#fff;border-color:var(--primary,#2563eb)}
.cs-sw{width:28px;height:28px;border-radius:6px;border:2px solid #94a3b8;cursor:pointer;padding:0}.cs-sw.on{outline:3px solid #0f172a;outline-offset:2px}
.cs-row select{font:inherit;font-size:.95rem;padding:2px 6px}
.cs-right{flex:2 1 480px;max-width:680px}.cs-slide{container-type:inline-size;aspect-ratio:16/9;border:1px solid #94a3b8;box-shadow:0 3px 12px rgba(0,0,0,.18);padding:4% 6%;font-family:Arial,sans-serif;overflow:hidden;text-align:left}
.cs-t{font-weight:800;text-align:center;line-height:1.15;margin-bottom:.3em}.cs-slide ul{margin:0;padding-left:1.2em;line-height:1.3}
.cs-list{display:flex;flex-direction:column;gap:5px;margin-top:8px;text-align:left}.cs-it{border-radius:8px;padding:5px 9px;font-size:.93rem;border:1px solid #e2e8f0;background:#fff}
.cs-it.ok{background:#dcfce7;border-color:#86efac}.cs-it.warn{background:#fef9c3;border-color:#fde047}.cs-it.bad{background:#fee2e2;border-color:#fca5a5}
.chart-fig{margin:6px auto;max-width:640px}.ladder-card .chart-fig{max-width:500px}.chart-svg{display:block;width:100%;height:auto;border-radius:10px}
.chart-row{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}.chart-row>.chart-fig{flex:1 1 460px;max-width:600px;margin:0}
.poll-tabs{display:flex;flex-wrap:wrap;gap:8px;justify-content:center}.poll-tab.on{background:var(--primary,#2563eb);color:#fff;border-color:var(--primary,#2563eb)}
.poll-chart{max-width:640px;width:100%;margin:0 auto}.poll-chips{display:flex;flex-wrap:wrap;gap:6px;justify-content:center}.poll-chip{display:inline-flex;gap:2px;align-items:center;font-size:.9rem}
.poll-box{display:flex;flex-direction:column;gap:8px;max-width:860px;margin:6px auto 0}
.poll-opt{display:flex;align-items:center;gap:10px;text-align:left;font:inherit;font-size:1.15rem;padding:12px 16px;border:3px solid #cbd5e1;border-radius:14px;background:#fff;cursor:pointer}
.poll-opt:hover{border-color:var(--primary,#2563eb)}.poll-opt.sel{border-color:var(--primary,#2563eb);background:var(--primary,#2563eb);color:#fff}
.poll-row{display:flex;align-items:center;gap:10px;font-size:1.15rem}
.poll-lb{flex:0 0 38%;font-weight:700}.poll-bar{flex:1;height:28px;background:#e2e8f0;border-radius:8px;overflow:hidden}
.poll-bar i{display:block;height:100%;background:linear-gradient(90deg,#22c55e,#16a34a);transition:width .4s}
.poll-row.top .poll-bar i{background:linear-gradient(90deg,#f59e0b,#ea580c)}.poll-n{min-width:2em;text-align:right;font-size:1.3rem}
.poll-pm{padding:2px 10px;font-size:.95rem}
@media (max-width:640px){.poll-lb{flex-basis:44%;font-size:1rem}}
.mz-wrap{display:flex;flex-wrap:wrap;gap:16px;align-items:flex-start}
.mz-stage{flex:1 1 360px;max-width:560px;min-width:260px}
.mz-grid{position:relative;display:grid;width:100%;background:#fff;border-radius:8px;overflow:hidden}
.mz-grid.shake{animation:so-shake .3s}
.mz-c{display:flex;align-items:center;justify-content:center;font-size:.62rem;font-weight:800;color:#1d4ed8;min-width:0;transition:background .2s}
.mz-c.w{background:#1f2937}.mz-c.s{background:#dbeafe}.mz-c.e{background:#fecaca;color:#b91c1c}
.mz-c.t1:not(.s):not(.e){background:#fde68a}.mz-c.t2:not(.s):not(.e){background:#fb923c}
.mz-bot{position:absolute;display:flex;align-items:center;justify-content:center;transition:left .22s,top .22s;pointer-events:none}
.mz-face{font-size:min(3.4vw,1.3rem);line-height:1;filter:drop-shadow(0 1px 1px rgba(0,0,0,.4))}
.mz-arr{position:absolute;inset:0;display:flex;align-items:center;justify-content:flex-end;font-size:min(2.6vw,1rem);color:#dc2626;z-index:1;text-shadow:0 0 2px #fff,0 0 3px #fff;transition:transform .2s;transform-origin:center}
.mz-side{flex:1 1 280px;min-width:250px}
.mz-code{margin:0 0 8px;padding:10px 12px;background:#0f172a;color:#cbd5e1;border-radius:12px;font:600 .95rem/1.55 Consolas,'Courier New',monospace;white-space:pre-wrap}
.mz-code span.on{background:#facc15;color:#1f2937;border-radius:4px}
.mz-sense{font-weight:600;margin:4px 0}
.mz-stat{font-weight:600;color:#475569;margin-top:4px}
.mz-race{display:flex;flex-wrap:wrap;gap:18px;justify-content:center}
.mz-team{flex:1 1 320px;max-width:520px;border:3px solid #e2e8f0;border-radius:16px;padding:10px;background:#f8fafc}
.mz-team h4{margin:0 0 8px;font-size:1.15rem}
.mz-team .mz-stage{max-width:none}
.mz-pad{display:grid;grid-template-columns:repeat(3,64px);grid-template-rows:repeat(2,52px);gap:6px;justify-content:center;margin:10px 0 4px}
.mz-k{font-size:1.5rem;padding:0}.mz-k0{grid-column:2;grid-row:1}.mz-k3{grid-column:1;grid-row:2}.mz-k2{grid-column:2;grid-row:2}.mz-k1{grid-column:3;grid-row:2}
.ifc{display:flex;flex-direction:column;align-items:flex-start;margin-top:10px}
.ifc-row{display:flex;align-items:center;gap:12px;flex-wrap:wrap}
.ifc .dropzone{min-width:230px;min-height:96px;margin:0}
.ifc .ifc-cond{border:3px dashed #f59e0b;background:#fffbeb;border-radius:40px}
.ifc .ifc-res{border:3px dashed #14b8a6;background:#f0fdfa}
.ifc-yes{font-weight:800;color:#16a34a;font-size:1.1rem}
.ifc-no{margin:4px 0 4px 96px;font-weight:800;color:#dc2626;font-size:1.1rem}
.ifc .ifc-else{margin-left:40px}
.if-in{display:flex;flex-wrap:wrap;gap:10px;align-items:center;font-weight:700;margin:6px 0}
.if-in input[type=range]{flex:1 1 220px;accent-color:#7c3aed;height:28px}
.if-in input[type=number]{font:inherit;width:120px;padding:6px 10px;border:2px solid #c4b5fd;border-radius:10px}
.if-presets{display:flex;flex-wrap:wrap;gap:8px;margin:4px 0 10px}.if-chip{padding:4px 12px;font-size:.95rem}
.if-fx{display:flex;gap:8px;align-items:center;background:#fff;border:1px solid #cbd5e1;border-radius:8px;padding:6px 10px;margin:6px 0 12px;overflow-x:auto}
.if-fx code{font-family:Consolas,'Courier New',monospace;font-size:1.05rem;white-space:nowrap}
.if-flow{display:flex;flex-direction:column;align-items:flex-start;gap:0}
.if-row{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.if-dia{min-width:200px;min-height:78px;padding:0 36px;display:flex;align-items:center;justify-content:center;clip-path:polygon(50% 0,100% 50%,50% 100%,0 50%);background:#fde68a;font-weight:800;font-family:Consolas,monospace;transition:all .25s}
.if-dia.yes{background:#86efac}.if-dia.no{background:#fecaca}.if-dia.idle{background:#e5e7eb;color:#9ca3af}
.if-arr{font-weight:800;color:#9ca3af}.if-arr.on{color:#16a34a}
.if-down{margin-left:78px;font-weight:800;color:#9ca3af;padding:2px 0}.if-down.on{color:#dc2626}
.if-res{padding:10px 18px;border-radius:12px;border:3px solid #cbd5e1;background:#fff;font-weight:800;min-width:120px;text-align:center;transition:all .25s}
.if-res.else{margin-left:40px}
.if-res.hit{border-color:#16a34a;background:#dcfce7;color:#166534;transform:scale(1.08);box-shadow:0 6px 16px rgba(22,163,74,.25)}
.if-out{display:flex;flex-wrap:wrap;gap:8px 22px;align-items:center;margin-top:14px;padding:10px 14px;border-radius:12px;background:#f5f3ff;border:2px dashed #a78bfa;font-size:1.1rem}
.if-big{font-size:1.5rem;color:#6d28d9}
.fill select.fill-sel{font-size:1.15rem;padding:6px 10px;border:2px solid #c7d2fe;border-radius:10px;background:#fff;margin:2px 4px}
.rn-box{margin:14px 0;border:3px solid #0ea5e9;border-radius:18px;background:#f8fafc;padding:12px 16px}
.rn-title{margin:0 0 6px;color:#0369a1}
.rn-wrap{display:flex;flex-wrap:wrap;gap:18px;align-items:flex-start}
.rn-chart{flex:1 1 300px;margin:0}
.rn-step{border-radius:14px;padding:3px;transition:background .2s}
.rn-step.on{background:#38bdf8;box-shadow:0 0 0 4px #bae6fd}.rn-step.done{opacity:.6}
.rn-side{flex:1 1 280px;display:flex;flex-direction:column;gap:10px;font-size:1.08rem}
.rn-inputs{display:flex;flex-wrap:wrap;gap:10px;align-items:center}.rn-inputs>b{width:100%}
.rn-in{display:flex;gap:6px;align-items:center;font-weight:700}.rn-in input{width:5.5em;font-size:1.15rem;padding:5px 8px;border:2px solid #7dd3fc;border-radius:10px}
.rn-ctrl{display:flex;flex-wrap:wrap;gap:8px}
.rn-mem{background:#fff;border:2px dashed #94a3b8;border-radius:12px;padding:8px 12px;display:flex;flex-wrap:wrap;gap:6px 14px;align-items:center}
.rn-var{background:#e0f2fe;border-radius:8px;padding:2px 10px}.rn-empty{color:#94a3b8}
.rn-out:empty{display:none}.rn-out{background:#dcfce7;border:2px solid #16a34a;border-radius:12px;padding:8px 12px}
.rn-val{font-size:1.5rem;font-weight:900;color:#15803d}
.rn-log{margin:0;padding-left:22px;font-size:1rem;color:#334155}.rn-log:empty{display:none}
.sb{display:inline-flex;align-items:center;flex-wrap:wrap;gap:5px;padding:6px 12px;border-radius:6px;color:#fff;font-weight:700;font-size:1rem;line-height:1.3;text-align:left;box-shadow:inset 0 -3px rgba(0,0,0,.15);position:relative}
.sb-hat{border-radius:22px 22px 6px 6px;padding-top:12px}
.sb-event{background:#ffbf00;color:#3b2a00}.sb-looks{background:#9966ff}.sb-sensing{background:#5cb1d6}.sb-variables{background:#ff8c1a}
.sb-operators{background:#59c059}.sb-control{background:#ffab19;color:#3b2a00}.sb-motion{background:#4c97ff}.sb-sound{background:#0fbd8c}
.sb-in{background:#fff;color:#333;border-radius:4px;padding:1px 7px;font-weight:600}.sb-num{border-radius:999px}.sb-dd{background:rgba(0,0,0,.12);color:#fff}
.sb-rep{border-radius:999px;padding:2px 10px;border:1.5px solid rgba(0,0,0,.12)}.sb-rv{background:#ff8c1a;color:#fff}.sb-rop{background:#59c059;color:#fff}.sb-rsen{background:#5cb1d6;color:#fff}
.sb-bool{background:#59c059;color:#fff;padding:2px 12px;clip-path:polygon(10px 0,calc(100% - 10px) 0,100% 50%,calc(100% - 10px) 100%,10px 100%,0 50%)}
.sb-flag{font-size:1.1rem}.sb-n{font-style:normal;background:#fff;color:#be123c;border-radius:999px;padding:0 5px;font-size:.9rem;margin-left:4px}
.sb-c{display:flex;flex-direction:column;align-items:stretch;padding:0;background:#ffab19}.sb-c>.sb-row{padding:6px 12px}
.sb-inner{margin-left:18px;display:flex;flex-direction:column;align-items:flex-start;gap:2px;background:#fff8ec;padding:4px 0 4px 4px}
.sb-foot{height:16px;padding-left:12px;font-size:.85rem;line-height:16px}
.sb.on,.sb-c.on>.sb-row{box-shadow:0 0 0 4px #fde047,0 0 14px #facc15}
.sb-stack{display:flex;flex-direction:column;align-items:flex-start;gap:2px;margin:8px auto;width:fit-content;max-width:100%}
.order-list.sb-list li{background:transparent;border:none;padding:0;margin:4px 0}.order-list.sb-list li>span:first-child{flex:1}
.order-list.sb-list li>span:last-child{flex:0 0 96px;display:flex;gap:6px}.rv-row .sb{font-size:.95rem}
.sc-box{margin:14px 0;border:3px solid #9966ff;border-radius:18px;background:#faf8ff;padding:12px 16px}
.sc-wrap{display:flex;flex-wrap:wrap;gap:16px;align-items:flex-start}
.sc-code{flex:1 1 320px;display:flex;flex-direction:column;align-items:flex-start;gap:2px;background:#f9f9fb;border:1px solid #e5e7eb;border-radius:12px;padding:10px;overflow-x:auto;max-width:100%}
.sc-right{flex:1 1 280px;display:flex;flex-direction:column;gap:10px}
.sc-stage{position:relative;height:210px;background:linear-gradient(#e0f2fe,#fff 70%);border:2px solid #cbd5e1;border-radius:12px;overflow:hidden;transition:background .1s}
.sc-stage.sc-beat{background:linear-gradient(#fde68a,#fff 70%)}
.sc-sprite{position:absolute;bottom:18px;left:40%;width:60px;text-align:center;transition:left .22s linear}
.sc-cat{display:inline-block;font-size:3.2rem;line-height:1}
.sc-bubble{position:absolute;bottom:72px;left:20px;min-width:120px;max-width:230px;background:#fff;border:2px solid #94a3b8;border-radius:14px;padding:6px 10px;font-size:1rem;font-weight:600;color:#1f2937;text-align:left;white-space:pre-wrap}
.sc-ask{position:absolute;left:8px;right:8px;bottom:6px;display:flex;gap:6px;background:#fff;border:2px solid #5cb1d6;border-radius:12px;padding:5px}
.sc-ask input{flex:1;min-width:0;font-size:1.1rem;border:none;outline:none}.sc-ask .btn{padding:4px 14px}
.sc-mon{display:flex;flex-wrap:wrap;gap:8px}.sc-mon:empty{display:none}
.sc-var{background:#fff;border:2px solid #ff8c1a;border-radius:8px;padding:2px 8px}.sc-var b{background:#ff8c1a;color:#fff;border-radius:6px;padding:0 8px;margin-left:4px}
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
.mm-lib{border:1.5px solid #cbd5e1;border-radius:10px;overflow:hidden;background:#fff}
.mm-lib-path{background:#f1f5f9;padding:6px 10px;font-weight:700;color:#334155;border-bottom:1px solid #e2e8f0}
.mm-lib-files{display:flex;flex-wrap:wrap;gap:6px;padding:8px 10px}
.mm-lib-files button{border:1px solid transparent;background:#fff;border-radius:6px;padding:6px 10px;font-size:1rem;cursor:pointer;color:#1e293b}
.mm-lib-files button:hover{background:#eff6ff;border-color:#bfdbfe}
.mm-lib-files button.on{background:#dbeafe;border-color:#3b82f6;font-weight:700}
.mm-lib .mm-aact{padding:6px 10px;border-top:1px solid #e2e8f0;background:#f8fafc}
.mm-lib-fn{flex:1 1 200px;color:#475569}
.mm-aact button:disabled{opacity:.5;cursor:default}
.mm-lib-or{font-size:.9rem;color:#64748b;font-style:italic}
.mm-need{display:flex;flex-wrap:wrap;gap:6px 12px;align-items:center;margin-top:8px;padding:8px 12px;background:#fff7ed;border:1.5px solid #fdba74;border-radius:12px;font-size:1rem}
.mm-need span{color:#64748b}.mm-need span.ok{color:#15803d;font-weight:700}
.mm-need-all{color:#15803d}
.chat{max-width:560px;margin:12px auto;border:3px solid #1e293b;border-radius:26px;overflow:hidden;background:#e5ddd5;box-shadow:0 10px 26px rgba(15,23,42,.18)}
.chat-top{display:flex;align-items:center;gap:10px;background:#0f766e;color:#fff;padding:10px 14px}
.chat-av{font-size:1.9rem;width:46px;height:46px;border-radius:50%;background:#fff;display:grid;place-items:center;flex:0 0 46px}
.chat-who{flex:1;min-width:0;line-height:1.2}.chat-who b{display:block;font-size:1.1rem}.chat-who small{opacity:.85;font-size:.85rem}
.chat-ico{opacity:.85;letter-spacing:4px}
.chat-log{display:flex;flex-direction:column;gap:6px;padding:12px 12px 16px;max-height:52vh;min-height:180px;overflow-y:auto}
.chat-b{max-width:80%;padding:8px 12px;border-radius:14px;font-size:1.08rem;line-height:1.4;box-shadow:0 1px 2px rgba(0,0,0,.15);white-space:pre-wrap;overflow-wrap:anywhere}
.chat-b.them{align-self:flex-start;background:#fff;border-top-left-radius:4px;color:#111827}
.chat-b.me{align-self:flex-end;background:#dcf8c6;border-top-right-radius:4px;color:#111827}
.chat-b.me.ok{box-shadow:0 0 0 2px #16a34a}.chat-b.me.no{box-shadow:0 0 0 2px #dc2626;background:#fee2e2}
.chat-b.new,.chat-b[style*="animation-delay"]{animation:chatIn .35s ease both}
@keyframes chatIn{from{opacity:0;transform:translateY(8px) scale(.96)}to{opacity:1;transform:none}}
.chat-sep{align-self:center;background:#fef3c7;color:#92400e;font-size:.85rem;font-weight:700;padding:3px 12px;border-radius:999px;margin:6px 0}
.pw{margin:14px 0;border:2px solid #a5b4fc;border-radius:16px;background:#fff;padding:12px 16px;max-width:720px}
.pw-head{font-weight:800;font-size:1.2rem;color:#3730a3}.pw-intro{margin:4px 0}
.pw-warn{margin:6px 0;background:#fef2f2;border:1px solid #fecaca;color:#991b1b;border-radius:10px;padding:6px 10px;font-size:.95rem}
.pw-row{display:flex;gap:8px}.pw-in{flex:1;min-width:0;font:inherit;font-size:1.3rem;padding:8px 12px;border:2px solid #c7d2fe;border-radius:10px;letter-spacing:1px}
.pw-eye{border:2px solid #c7d2fe;background:#eef2ff;border-radius:10px;font-size:1.2rem;padding:0 12px;cursor:pointer}
.pw-bar{height:14px;background:#e5e7eb;border-radius:999px;overflow:hidden;margin:10px 0 4px}.pw-bar i{display:block;height:100%;width:0;border-radius:999px;transition:width .3s,background .3s}
.pw-lv{font-size:1.05rem}.pw-crit{list-style:none;padding:0;margin:8px 0;display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:4px 12px}
.pw-crit li{color:#64748b}.pw-crit li.ok{color:#15803d;font-weight:700}
.pw-w div{color:#b45309;font-size:.98rem}
.pw-ex{display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin-top:8px}.pw-ex span{color:#475569;font-weight:700}
.pw-ex button{border:1px solid #cbd5e1;background:#f8fafc;border-radius:8px;padding:4px 10px;font-family:Consolas,monospace;font-size:1rem;cursor:pointer}
.gm-detect{margin-top:10px;padding:10px 14px;border-radius:12px;background:#fff7ed;border:2px solid #fdba74;font-size:1.05rem}
.gm-detect.done{background:#f0fdf4;border-color:#86efac}.gm-det-no{color:#b91c1c;font-weight:700}
.xsheet.has-v{overflow:visible;position:relative}.xsheet.has-v .xs-title{border-radius:11px 11px 0 0}
.xs-vtip{position:absolute;z-index:6;background:#fffde7;border:1px solid #a3a3a3;box-shadow:2px 2px 6px rgba(0,0,0,.2);padding:4px 9px;font-size:.85rem;color:#333;max-width:230px;pointer-events:none;line-height:1.35}
.xs-vtip b{display:block}.xs-vtip[hidden],.xs-vdrop[hidden],.xs-vlist[hidden]{display:none}
.xs-vdrop{position:absolute;z-index:6;width:24px;border:1px solid #9ca3af;background:#f3f4f6;cursor:pointer;font-size:.85rem;padding:0;color:#111}
.xs-vlist{position:absolute;z-index:7;background:#fff;border:1px solid #6b7280;box-shadow:0 6px 16px rgba(0,0,0,.22);max-height:240px;overflow-y:auto;display:flex;flex-direction:column}
.xs-vlist button{border:0;background:#fff;text-align:left;padding:5px 12px;font:inherit;font-size:1rem;cursor:pointer;color:#111;white-space:nowrap}
.xs-vlist button:hover,.xs-vlist button:focus{background:#2563eb;color:#fff}
.xs-vinfo{color:#15803d}
.xs-valert-ov{position:fixed;inset:0;background:rgba(15,23,42,.25);z-index:300;display:grid;place-items:center;padding:12px}
.xs-valert{background:#fff;border:1px solid #6b7280;box-shadow:0 14px 34px rgba(0,0,0,.35);width:min(460px,94vw);font-family:"Segoe UI",Arial,sans-serif;color:#111;animation:chatIn .18s ease both}
.xs-va-head{display:flex;justify-content:space-between;align-items:center;padding:8px 12px;font-weight:600}
.xs-va-head button{border:0;background:none;font-size:1.1rem;cursor:pointer}
.xs-va-body{display:flex;gap:16px;align-items:center;padding:16px 22px;background:#f3f4f6;font-size:1.05rem}
.xs-va-ico{flex:0 0 42px;height:42px;border-radius:50%;display:grid;place-items:center;color:#fff;font-weight:900;font-size:1.3rem}
.xs-va-ico.stop{background:#dc2626}.xs-va-ico.warning{background:#f59e0b;border-radius:8px}.xs-va-ico.information{background:#2563eb}
.xs-va-btns{display:flex;gap:10px;justify-content:center;padding:8px 12px 16px;background:#f3f4f6}
.xs-va-btns button{min-width:96px;padding:6px 14px;border:1px solid #9ca3af;background:#e5e7eb;cursor:pointer;font:inherit}
.xs-va-btns button:first-child{border:2px solid #2563eb}
.xs-va-help{padding:0 18px 14px;background:#f3f4f6;font-size:.92rem;color:#475569}
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
.ck-target{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin:10px 0;font-size:1.15rem;font-weight:700}
.ck-target input{font-size:1.15rem;padding:6px 12px;border:2px solid #cbd5e1;border-radius:10px;width:min(12em,100%)}
.ck-tgt td small{color:#64748b;font-weight:400}
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

  // ---- BÌNH CHỌN / KHẢO SÁT NHANH (type "poll") — không chấm đúng/sai ----------------
  //  { type: "poll", question: "Bạn muốn tìm hiểu thêm nội dung nào?", options: ["Ngôn ngữ lập trình", …] }
  //  Máy HS: chọn một phương án (đổi được) — gửi qua texts (openQs, khoá aid:poll). Màn chiếu nối tiết học: biểu đồ cột kết quả cả lớp,
  //  tự cập nhật. Mở file trực tiếp (chưa nối lớp): GV bấm +1 / −1 theo số bạn giơ tay.
  // ---- KÉO BẰNG CON TRỎ / NGÓN TAY (dùng chung cho các mô phỏng Word) ----
  function ptrDrag(elm, onStart, onMove, onEnd) {
    elm.addEventListener("pointerdown", (e) => {
      if (e.button > 0) return;
      if (onStart(e) === false) return;
      e.preventDefault(); e.stopPropagation();
      try { elm.setPointerCapture(e.pointerId); } catch (x) {}
      const mv = (ev) => onMove(ev.clientX - e.clientX, ev.clientY - e.clientY, ev);
      const up = (ev) => { elm.removeEventListener("pointermove", mv); elm.removeEventListener("pointerup", up); elm.removeEventListener("pointercancel", up); if (onEnd) onEnd(ev); };
      elm.addEventListener("pointermove", mv); elm.addEventListener("pointerup", up); elm.addEventListener("pointercancel", up);
    });
  }

  // ---- MÔ PHỎNG DANH SÁCH DẠNG LIỆT KÊ (hoạt động `listsim`) — Tin 8 Bài 8a --------------------------------
  //  listsim: { title?, intro?, doc?: "PhieuKhaoSat.docx", head?: ["dòng không thuộc danh sách" | { text, center? }], box?: true (ô ☐ cuối mục),
  //    items: ["mục" | { text, level?: 0|1, kind?: "none"|"bullet"|"num", want?: 0|1 (mức cần đạt) }],
  //    goal?: [{ kind: "num", fmt?: "1." }, { kind: "bullet" }] (yêu cầu cho mức 0, mức 1), success? }
  //  Như Word: bấm lề trái để chọn đoạn (tô xám) → Bullets / Numbering (thư viện 1. 1) a) A. I.); Enter thêm mục (số phía sau tự tăng),
  //  Enter ở mục trống thoát danh sách, Backspace đầu mục bỏ số, Tab / Shift+Tab (⇥ ⇤) đổi mức. Không chấm điểm.
  const LS_NUM = { "1.": (n) => n + ".", "1)": (n) => n + ")", "a)": (n) => String.fromCharCode(96 + ((n - 1) % 26) + 1) + ")", "A.": (n) => String.fromCharCode(64 + ((n - 1) % 26) + 1) + ".", "I.": (n) => lsRoman(n) + "." };
  const LS_BUL = ["•", "✓", "➢", "◆", "❖", "–"];
  function lsRoman(n) { let s = ""; [[10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]].forEach(([v, r]) => { while (n >= v) { s += r; n -= v; } }); return s; }
  function listsimBox(a) {
    ensureEngineCSS();
    const spec = a.listsim, goal = spec.goal ? [].concat(spec.goal) : null;
    const fresh = () => ({ items: (spec.items || []).map((x) => Object.assign({ level: 0, kind: "none", _o: true }, typeof x === "string" ? { text: x } : x)), sel: [], fmt: ["1.", "a)"], bul: ["•", "•"], cur: -1, lib: null, done: false });
    const S = a._ls || (a._ls = fresh());
    const nOrig = (spec.items || []).length;
    const box = el("div", "sr-box ls-box");
    box.appendChild(el("h3", "sr-title", "📝 " + esc(spec.title || "Mô phỏng danh sách dạng liệt kê")));
    if (spec.intro) box.appendChild(el("p", "subtitle", esc(spec.intro)));
    const win = el("div", "ls-win");
    win.innerHTML = `<div class="ls-bar">📄 ${esc(spec.doc || "Văn bản.docx")} — Word <span>Home</span></div>`;
    const rib = el("div", "ls-rib"), libBox = el("div"), page = el("div", "ls-page"), msg = el("div", "sp-msg");
    win.append(rib, libBox, page); box.append(win, msg);
    const say = (t) => { msg.className = "sp-msg"; msg.innerHTML = t; };
    const B = (cls, html, title, fn) => { const b = el("button", "ls-b " + cls, html); b.type = "button"; if (title) b.title = title; b.onclick = fn; rib.appendChild(b); return b; };
    B("", "•☰ Bullets", "Danh sách dấu đầu dòng", () => apply("bullet"));
    B("ls-dd", "▾", "Thư viện dấu đầu dòng", () => { S.lib = S.lib === "bul" ? null : "bul"; paint(); });
    B("", "1☰ Numbering", "Danh sách có thứ tự", () => apply("num"));
    B("ls-dd", "▾", "Numbering Library", () => { S.lib = S.lib === "num" ? null : "num"; paint(); });
    B("", "⇤", "Decrease Indent (Shift+Tab)", () => setLevel(targets(), -1));
    B("", "⇥", "Increase Indent (Tab)", () => setLevel(targets(), 1));
    B("ls-sep", "☑ Chọn tất cả", "Chọn tất cả các mục", () => { S.sel = S.sel.length === S.items.length ? [] : S.items.map((_, i) => i); paint(); });
    B("", "↵ Enter", "Thêm đoạn mới sau dòng đang chọn", () => { const i = S.cur >= 0 && S.cur < S.items.length ? S.cur : S.items.length - 1; enter(i, S.items[i] ? S.items[i].text.length : 0); });
    B("", "🗑 Xoá mục", "Xoá các đoạn đang chọn", () => {
      const t = targets(); if (!t.length) return say("👆 Chọn đoạn cần xoá trước (bấm lề trái của dòng).");
      S.items = S.items.filter((_, i) => !t.includes(i)); S.sel = []; S.cur = -1;
      say("🗑 Đã xoá " + t.length + " đoạn — số thứ tự của các mục còn lại <b>tự động cập nhật</b>."); paint();
    });
    B("", "🔄 Làm lại", "Trở về văn bản ban đầu", () => { Object.assign(S, fresh()); say("🔄 Đã trở về văn bản ban đầu."); paint(); });
    const marker = (i) => {
      const it = S.items[i];
      if (it.kind === "bullet") return S.bul[it.level] || "•";
      if (it.kind !== "num") return "";
      let n = 1;
      for (let j = i - 1; j >= 0; j--) { const p = S.items[j]; if (p.level < it.level) break; if (p.level === it.level && p.kind === "num") n++; }
      return (LS_NUM[S.fmt[it.level]] || LS_NUM["1."])(n);
    };
    const targets = () => (S.sel.length ? S.sel.slice().sort((x, y) => x - y) : S.cur >= 0 && S.cur < S.items.length ? [S.cur] : []);
    function apply(kind, fmt) {
      const t = targets();
      if (!t.length) return say("👆 Hãy <b>chọn các đoạn văn bản</b> trước: bấm vào lề trái của dòng (dòng được tô xám) hoặc bấm ☑ Chọn tất cả.");
      const off = kind !== "none" && !fmt && t.every((i) => S.items[i].kind === kind);
      t.forEach((i) => { const it = S.items[i]; it.kind = off ? "none" : kind; if (!off && fmt && kind !== "none") (kind === "num" ? S.fmt : S.bul)[it.level] = fmt; });
      S.lib = null; S.sel = []; // bỏ chọn để lần chọn tiếp theo bắt đầu lại
      say(off || kind === "none" ? "Đã bỏ danh sách ở các đoạn đã chọn." : kind === "num" ? "1️⃣ Đã tạo <b>danh sách có thứ tự</b> — số thứ tự do phần mềm tự tạo, em không cần gõ! Thử nhấn <b>Enter</b> ở cuối một mục xem sao." : "• Đã tạo <b>danh sách dấu đầu dòng</b> — mỗi đoạn bắt đầu bằng một dấu đầu dòng.");
      paint();
    }
    function setLevel(t, d) {
      if (!t.length) return say("👆 Chọn đoạn cần đổi mức trước (bấm lề trái của dòng).");
      t.forEach((i) => { S.items[i].level = Math.max(0, Math.min(1, S.items[i].level + d)); });
      say(d > 0 ? "⇥ Đã lùi đoạn vào một mức (mục con)." : "⇤ Đã đưa đoạn ra mức ngoài."); paint();
    }
    function enter(i, c) {
      const it = S.items[i];
      if (!it) { S.items.push({ text: "", level: 0, kind: "none" }); return paint(S.items.length - 1, 0); }
      if (!it.text.trim() && it.kind !== "none") { it.kind = "none"; say("↵ Nhấn Enter ở một mục trống: mục đó <b>thoát khỏi danh sách</b> (không còn số / dấu đầu dòng)."); return paint(i, 0); }
      const after = it.text.slice(c); it.text = it.text.slice(0, c);
      S.items.splice(i + 1, 0, { text: after, level: it.level, kind: it.kind }); S.sel = [];
      say(it.kind === "num" ? "↵ Đã thêm một đoạn mới — số thứ tự của các mục phía sau <b>tự động tăng lên</b>!" : it.kind === "bullet" ? "↵ Đã thêm một đoạn mới — dấu đầu dòng <b>tự động xuất hiện</b>." : "↵ Đã thêm một đoạn văn bản mới.");
      paint(i + 1, 0);
    }
    function keys(e, i, inp) {
      const it = S.items[i];
      if (e.key === "Enter") { e.preventDefault(); return enter(i, inp.selectionStart); }
      if (e.key === "Backspace" && inp.selectionStart === 0 && inp.selectionEnd === 0) {
        if (it.kind !== "none") { e.preventDefault(); it.kind = "none"; say("⌫ Đã bỏ số / dấu đầu dòng của đoạn này — các mục khác <b>tự đánh số lại</b>."); return paint(i, 0); }
        if (i > 0) { e.preventDefault(); const p = S.items[i - 1], pos = p.text.length; p.text += it.text; S.items.splice(i, 1); S.sel = []; say("⌫ Đã gộp đoạn với đoạn phía trên — thứ tự tự cập nhật."); return paint(i - 1, pos); }
      }
      if (e.key === "Tab") { e.preventDefault(); S.cur = i; return setLevel([i], e.shiftKey ? -1 : 1); }
      if (e.key === "ArrowUp" && i > 0) { e.preventDefault(); page.querySelectorAll(".ls-txt")[i - 1].focus(); }
      if (e.key === "ArrowDown" && i < S.items.length - 1) { e.preventDefault(); page.querySelectorAll(".ls-txt")[i + 1].focus(); }
      e.stopPropagation(); // phím mũi tên/Space trong ô không chuyển màn bài giảng
    }
    function check() {
      if (!goal) return;
      const orig = S.items.filter((x) => x._o);
      const ok = orig.length === nOrig && orig.every((x) => { const w = x.want || 0, g = goal[w]; return g && x.level === w && x.kind === g.kind && (!g.fmt || S.fmt[w] === g.fmt) && (!g.bul || S.bul[w] === g.bul); });
      if (ok && !S.done) { S.done = true; say("🎉 " + esc(spec.success || "Hoàn thành! Văn bản đã được trình bày bằng danh sách dạng liệt kê.")); sound("ok"); celebrate(); }
      if (!ok) S.done = false;
    }
    function paint(focusI, caret) {
      libBox.innerHTML = "";
      if (S.lib) {
        const lib = el("div", "ls-lib"), isNum = S.lib === "num";
        lib.appendChild(el("div", "ls-lib-t", isNum ? "Numbering Library" : "Bullet Library"));
        const g = el("div", "ls-lib-g");
        ["none"].concat(isNum ? Object.keys(LS_NUM) : LS_BUL).forEach((o) => {
          const t = el("button", "ls-tile" + (o === "none" ? " none" : ""), o === "none" ? "None" : [1, 2, 3].map((n) => `<span>${esc(isNum ? LS_NUM[o](n) : o)}<i></i></span>`).join(""));
          t.type = "button"; t.onclick = () => (o === "none" ? apply("none") : apply(isNum ? "num" : "bullet", o)); g.appendChild(t);
        });
        lib.appendChild(g); libBox.appendChild(lib);
      }
      const old = page._marks || [], marks = S.items.map((_, i) => marker(i));
      page.innerHTML = "";
      (spec.head || []).forEach((h) => page.appendChild(el("p", "ls-head" + (h.center ? " c" : ""), esc(typeof h === "string" ? h : h.text))));
      S.items.forEach((it, i) => {
        const row = el("div", "ls-row" + (S.sel.includes(i) ? " sel" : "") + (it.level ? " l1" : ""));
        const gut = el("span", "ls-gut"); gut.title = "Bấm để chọn / bỏ chọn đoạn này";
        const mk = el("span", "ls-mk" + (marks[i] && old.length && old[i] !== marks[i] ? " bump" : ""), esc(marks[i]));
        const inp = document.createElement("input"); inp.className = "ls-txt"; inp.value = it.text; inp.spellcheck = false;
        inp.oninput = () => { it.text = inp.value; };
        inp.onfocus = () => { S.cur = i; };
        inp.onkeydown = (e) => keys(e, i, inp);
        const toggle = () => { S.sel = S.sel.includes(i) ? S.sel.filter((x) => x !== i) : S.sel.concat(i); paint(); };
        gut.onclick = toggle; mk.onclick = toggle;
        row.append(gut, mk, inp);
        if (spec.box) row.appendChild(el("span", "ls-ck", "☐"));
        page.appendChild(row);
        if (focusI === i) setTimeout(() => { inp.focus(); const c = caret == null ? inp.value.length : caret; try { inp.setSelectionRange(c, c); } catch (x) {} }, 0);
      });
      page._marks = marks;
      check();
    }
    say("👆 Bấm vào <b>lề trái</b> các dòng để chọn đoạn (tô xám) hoặc ☑ Chọn tất cả, rồi chọn <b>Numbering</b> / <b>Bullets</b>. Có thể gõ sửa chữ, nhấn Enter, Tab ngay trong văn bản.");
    paint();
    return box;
  }

  // ---- MÔ PHỎNG WRAP TEXT — LỚP CỦA ẢNH (hoạt động `wrapsim`) — Tin 8 Bài 8a, Hình 8a.9 ------------------------
  //  wrapsim: { title?, intro?, img: "assets/nen.svg", lines: [{ text, size?: em, bold? }], success? }
  //  Chọn In Line with Text / Square / Behind Text / In Front of Text; kéo ô vuông trắng góc dưới bên phải để đổi kích thước, kéo ảnh để
  //  di chuyển (khi ảnh không nằm cùng dòng chữ). Ảnh Behind Text phủ kín trang → chúc mừng. Không chấm điểm.
  function wrapsimBox(a) {
    ensureEngineCSS();
    const spec = a.wrapsim, S = a._ws || (a._ws = { mode: "inline", w: 0.62, x: 0.06, y: 0.04, done: false });
    const box = el("div", "sr-box ws-box");
    box.appendChild(el("h3", "sr-title", "🖼️ " + esc(spec.title || "Mô phỏng Wrap Text — lớp của ảnh")));
    if (spec.intro) box.appendChild(el("p", "subtitle", esc(spec.intro)));
    const wrap = el("div", "ws-wrap"), menu = el("div", "ws-menu"), page = el("div", "ws-page"), msg = el("div", "sp-msg");
    wrap.append(menu, page); box.append(wrap, msg);
    const MODES = [["inline", "In Line with Text"], ["square", "Square"], ["behind", "Behind Text"], ["front", "In Front of Text"]];
    const INFO = {
      inline: "📏 <b>In Line with Text</b>: ảnh nằm cùng dòng với chữ như một kí tự lớn — <b>đẩy nội dung văn bản xuống dưới</b> (Hình 8a.9b).",
      square: "🔲 <b>Square</b>: chữ <b>bao quanh</b> ảnh theo khung hình vuông — hợp với ảnh nhỏ đặt cạnh chữ (VD ảnh ở góc tờ rơi).",
      behind: "⬇️ <b>Behind Text</b>: ảnh ở <b>lớp dưới</b>, chữ ở <b>lớp trên</b> (Hình 8a.9c). Kéo ảnh về góc trên bên trái rồi kéo ô vuông trắng ở góc dưới bên phải để ảnh <b>phủ kín tờ rơi</b>!",
      front: "⬆️ <b>In Front of Text</b>: ảnh ở <b>lớp trên</b> — <b>che mất</b> nội dung văn bản!",
    };
    function paint() {
      menu.innerHTML = '<div class="ws-mt">Format › Arrange › <b>Wrap Text</b> ▾</div>';
      MODES.forEach(([m, lb]) => { const b = el("button", "ws-opt" + (S.mode === m ? " on" : ""), esc(lb)); b.type = "button"; b.onclick = () => { S.mode = m; S.done = false; paint(); }; menu.appendChild(b); });
      const rs = el("button", "ws-opt ws-reset", "🔄 Làm lại"); rs.type = "button"; rs.onclick = () => { Object.assign(S, { mode: "inline", w: 0.62, x: 0.06, y: 0.04, done: false }); paint(); }; menu.appendChild(rs);
      page.innerHTML = "";
      const flow = el("div", "ws-flow");
      (spec.lines || []).forEach((l) => { const p = el("p", "", esc(l.text)); p.style.fontSize = (l.size || 1) + "em"; if (l.bold) p.style.fontWeight = "800"; flow.appendChild(p); });
      const im = el("div", "ws-img" + (S.mode === "behind" || S.mode === "front" ? " abs " + S.mode : " " + S.mode));
      im.innerHTML = `<img src="${esc(spec.img)}" alt="Ảnh nền" draggable="false"><span class="ws-h" title="Kéo để thay đổi kích thước"></span>`;
      im.style.width = S.w * 100 + "%";
      if (S.mode === "behind" || S.mode === "front") { im.style.left = S.x * 100 + "%"; im.style.top = S.y * 100 + "%"; page.append(im, flow); }
      else { flow.insertBefore(im, flow.firstChild); page.appendChild(flow); }
      const h = im.querySelector(".ws-h");
      let w0, x0, y0;
      ptrDrag(h, () => { w0 = S.w; }, (dx) => { S.w = Math.max(0.2, Math.min(1.4, w0 + dx / page.clientWidth)); im.style.width = S.w * 100 + "%"; }, status);
      if (S.mode === "behind" || S.mode === "front")
        ptrDrag(im, (e) => { if (e.target === h) return false; x0 = S.x; y0 = S.y; }, (dx, dy) => {
          S.x = Math.max(-0.5, Math.min(0.9, x0 + dx / page.clientWidth)); S.y = Math.max(-0.5, Math.min(0.9, y0 + dy / page.clientHeight));
          im.style.left = S.x * 100 + "%"; im.style.top = S.y * 100 + "%";
        }, status);
      status();
    }
    function status() {
      let t = INFO[S.mode];
      const im = page.querySelector(".ws-img");
      if (S.mode === "behind" && im) {
        const p = page.getBoundingClientRect(), r = im.getBoundingClientRect();
        const full = p.width && r.left <= p.left + 3 && r.top <= p.top + 3 && r.right >= p.right - 3 && r.bottom >= p.bottom - 3;
        if (full) { t = "🎉 " + esc(spec.success || "Tuyệt vời! Ảnh nền nằm ở lớp dưới và phủ kín tờ rơi, chữ nằm ở lớp trên (Hình 8a.9d)."); if (!S.done) { S.done = true; sound("ok"); celebrate(); } }
      }
      msg.className = "sp-msg"; msg.innerHTML = t;
    }
    paint();
    return box;
  }

  // ---- THIẾT KẾ TỜ RƠI KÉO THẢ (hoạt động `flyer`) — Tin 8 Bài 8a, Hình 8a.6 ------------------------------------
  //  flyer: { title?, intro?, bg: "assets/nen.svg", pic?: "assets/anh.svg", texts: [{ id, text, x, y, size (em theo 1% bề rộng), color, bold? }],
  //    colors?: [...], checks?: [{ label, test: "color", ids, color } | { label, test: "inCircle", ids, circle: [cx, cy, r] (tỉ lệ bề rộng) }
  //      | { label, test: "shapes", shapes: ["curveR", "curveL"], color? } | { label, test: "region", type: "pic", rect: [x1, y1, x2, y2] }], success? }
  //  Insert › Shapes thêm hình đồ hoạ; chọn đối tượng → Shape Fill / Font Color, cỡ, Delete; kéo thả để di chuyển. Không chấm điểm.
  const FL_SHAPES = {
    curveR: { name: "Arrow: Curved Right", w: 0.1, svg: (c) => `<svg viewBox="0 0 60 100"><path d="M54 0 C22 0 0 22 0 52 C0 74 12 90 32 92 L32 100 L60 86 L32 70 L32 80 C16 78 9 66 9 52 C9 28 26 8 54 8 Z" fill="${c}"/></svg>` },
    curveL: { name: "Arrow: Curved Left", w: 0.1, svg: (c) => `<svg viewBox="0 0 60 100"><g transform="translate(60 0) scale(-1 1)"><path d="M54 0 C22 0 0 22 0 52 C0 74 12 90 32 92 L32 100 L60 86 L32 70 L32 80 C16 78 9 66 9 52 C9 28 26 8 54 8 Z" fill="${c}"/></g></svg>` },
    star: { name: "Star: 5 Points", w: 0.14, svg: (c) => `<svg viewBox="0 0 100 95"><polygon points="50,2 61,36 97,36 68,57 79,92 50,70 21,92 32,57 3,36 39,36" fill="${c}"/></svg>` },
    frame: { name: "Rectangle: Rounded Corners", w: 0.6, svg: (c) => `<svg viewBox="0 0 200 70"><rect x="4" y="4" width="192" height="62" rx="14" fill="none" stroke="${c}" stroke-width="6"/></svg>` },
  };
  function flyerBox(a) {
    ensureEngineCSS();
    const spec = a.flyer, COLORS = spec.colors || ["#ffd400", "#ffffff", "#f97316", "#4472c4", "#111111", "#ef4444", "#22c55e"];
    const fresh = () => ({ els: (spec.texts || []).map((t) => Object.assign({ type: "text", s: 4 }, t)), sel: null, n: 0, done: false });
    const S = a._fl || (a._fl = fresh());
    const box = el("div", "sr-box fl-box");
    box.appendChild(el("h3", "sr-title", "🎨 " + esc(spec.title || "Thiết kế tờ rơi")));
    if (spec.intro) box.appendChild(el("p", "subtitle", esc(spec.intro)));
    const bar = el("div", "fl-bar"), tools = el("div", "fl-tools"), wrap = el("div", "fl-wrap"), page = el("div", "fl-page"), side = el("div", "fl-side");
    wrap.append(page, side); box.append(bar, tools, wrap);
    page.innerHTML = `<img class="fl-bg" src="${esc(spec.bg)}" alt="Ảnh nền" draggable="false">`;
    const layer = el("div", "fl-layer"); page.appendChild(layer);
    const setU = () => { if (page.clientWidth) page.style.setProperty("--u", page.clientWidth / 100 + "px"); };
    if (window.ResizeObserver) new ResizeObserver(setU).observe(page); else setTimeout(setU, 50);
    page.addEventListener("pointerdown", (e) => { if (e.target === page || e.target.classList.contains("fl-bg") || e.target === layer) { S.sel = null; paint(); } });
    // Insert › Shapes
    bar.appendChild(el("span", "fl-lb", "Insert › Shapes:"));
    Object.keys(FL_SHAPES).forEach((k) => {
      const b = el("button", "fl-ins", `<span class="fl-ico">${FL_SHAPES[k].svg("#4472c4")}</span>`); b.type = "button"; b.title = FL_SHAPES[k].name;
      b.onclick = () => { const id = "s" + ++S.n; S.els.push({ id, type: "shape", shape: k, x: 0.5, y: 0.5, s: FL_SHAPES[k].w, color: "#4472c4" }); S.sel = id; paint(); };
      bar.appendChild(b);
    });
    if (spec.pic) {
      const b = el("button", "fl-ins fl-pic", "🖼️ Pictures"); b.type = "button"; b.title = "Insert › Pictures";
      b.onclick = () => { const id = "p" + ++S.n; S.els.push({ id, type: "pic", x: 0.5, y: 0.5, s: 0.28 }); S.sel = id; paint(); };
      bar.appendChild(b);
    }
    const rs = el("button", "fl-ins", "🔄 Làm lại"); rs.type = "button"; rs.onclick = () => { Object.assign(S, fresh()); paint(); }; bar.appendChild(rs);
    const cur = () => S.els.find((x) => x.id === S.sel);
    function paintTools() {
      tools.innerHTML = "";
      const e = cur();
      if (!e) { tools.innerHTML = '<span class="fl-hint">👆 Bấm chọn một đối tượng trên tờ rơi để đổi màu, cỡ; kéo thả để di chuyển.</span>'; return; }
      if (e.type !== "pic") {
        tools.appendChild(el("span", "fl-lb", e.type === "text" ? "Font Color:" : "Shape Fill:"));
        COLORS.forEach((c) => { const b = el("button", "fl-sw" + (e.color === c ? " on" : "")); b.type = "button"; b.style.background = c; b.title = c; b.onclick = () => { e.color = c; paint(); }; tools.appendChild(b); });
      }
      const sz = (d) => { if (e.type === "text") e.s = Math.max(2, Math.min(16, e.s + d * 0.6)); else e.s = Math.max(0.05, Math.min(1, e.s + d * 0.03)); paint(); };
      const m = el("button", "fl-ins", "− Nhỏ"), p = el("button", "fl-ins", "+ To"), del = el("button", "fl-ins fl-del", "🗑 Delete");
      m.type = p.type = del.type = "button"; m.onclick = () => sz(-1); p.onclick = () => sz(1);
      del.onclick = () => { S.els = S.els.filter((x) => x !== e); S.sel = null; paint(); };
      tools.append(m, p, del);
    }
    function paint() {
      setU(); layer.innerHTML = "";
      S.els.forEach((e) => {
        const d = el("div", "fl-el fl-" + e.type + (S.sel === e.id ? " sel" : ""));
        d.style.left = e.x * 100 + "%"; d.style.top = e.y * 100 + "%";
        if (e.type === "text") { d.textContent = e.text; d.style.fontSize = "calc(var(--u, 3.4px) * " + e.s + ")"; d.style.color = e.color || "#111"; if (e.bold) d.style.fontWeight = "800"; }
        else if (e.type === "shape") { d.innerHTML = FL_SHAPES[e.shape].svg(e.color); d.style.width = e.s * 100 + "%"; }
        else { d.innerHTML = `<img src="${esc(spec.pic)}" alt="Hình ảnh" draggable="false">`; d.style.width = e.s * 100 + "%"; }
        let x0, y0;
        ptrDrag(d, () => { x0 = e.x; y0 = e.y; if (S.sel !== e.id) { S.sel = e.id; layer.querySelectorAll(".fl-el.sel").forEach((z) => z.classList.remove("sel")); d.classList.add("sel"); paintTools(); } },
          (dx, dy) => { e.x = Math.max(0, Math.min(1, x0 + dx / page.clientWidth)); e.y = Math.max(0, Math.min(1, y0 + dy / page.clientHeight)); d.style.left = e.x * 100 + "%"; d.style.top = e.y * 100 + "%"; },
          () => check());
        layer.appendChild(d);
      });
      paintTools(); check();
    }
    function test(c) {
      const els = S.els, same = (x, y) => String(x || "").toLowerCase() === String(y || "").toLowerCase();
      if (c.test === "color") return c.ids.every((id) => { const e = els.find((x) => x.id === id); return e && same(e.color, c.color); });
      if (c.test === "inCircle") { const r = page.clientHeight / (page.clientWidth || 1); return c.ids.every((id) => { const e = els.find((x) => x.id === id); return e && Math.hypot(e.x - c.circle[0], (e.y - c.circle[1]) * r) <= c.circle[2]; }); }
      if (c.test === "shapes") return c.shapes.every((k) => els.some((e) => e.type === "shape" && e.shape === k && (!c.color || same(e.color, c.color))));
      if (c.test === "region") return els.some((e) => e.type === (c.type || "pic") && e.x >= c.rect[0] && e.y >= c.rect[1] && e.x <= c.rect[2] && e.y <= c.rect[3]);
      return false;
    }
    function check() {
      side.innerHTML = "";
      const cs = spec.checks || [];
      if (!cs.length) return;
      side.appendChild(el("div", "fl-ct", "✅ Tự kiểm tra theo mẫu"));
      const res = cs.map((c) => test(c));
      cs.forEach((c, i) => side.appendChild(el("div", "fl-ck" + (res[i] ? " ok" : ""), (res[i] ? "✅ " : "⬜ ") + esc(c.label))));
      const all = res.every(Boolean);
      if (all) { side.appendChild(el("div", "fl-win", "🎉 " + esc(spec.success || "Tờ rơi đã hoàn chỉnh như mẫu!"))); if (!S.done) { S.done = true; sound("ok"); celebrate(); } }
      else S.done = false;
    }
    paint();
    return box;
  }

  // ---- MÔ PHỎNG HỘP THOẠI HEADER AND FOOTER CỦA POWERPOINT (hoạt động `hfsim`) — Tin 8 Bài 10a, Hình 10a.5 ----------
  //  hfsim: { title?, intro?, slides: [{ title, sub?, bullets?: [...], titleSlide?: true }], footer?: "gợi ý chân trang",
  //    goal?: { date?: true, num?: true, footer?: "CLB Tin học", noTitle?: true }, success? }
  //  Tích Date and time (Update automatically / Fixed), Slide number, Footer, Don't show on title slide → Apply (chỉ trang đang chọn)
  //  hoặc Apply to All (mọi trang); 4 trang chiếu thu nhỏ hiện kết quả ngay (ngày ở trái, chân trang ở giữa, số trang ở phải). Không chấm.
  function hfsimBox(a) {
    ensureEngineCSS();
    const spec = a.hfsim, slides = spec.slides || [];
    const d = new Date(), today = String(d.getDate()).padStart(2, "0") + "/" + String(d.getMonth() + 1).padStart(2, "0") + "/" + d.getFullYear();
    const blank = () => ({ date: false, auto: true, fixed: "", num: false, footer: false, ftext: "" });
    const fresh = () => ({ sel: slides.findIndex((s) => !s.titleSlide) >= 0 ? slides.findIndex((s) => !s.titleSlide) : 0, dlg: Object.assign(blank(), { ftext: spec.footer || "", noTitle: false }), st: slides.map(blank), tab: "slide", done: false });
    const S = a._hf || (a._hf = fresh());
    const box = el("div", "sr-box hf-box");
    box.appendChild(el("h3", "sr-title", "🗂️ " + esc(spec.title || "Mô phỏng hộp thoại Header and Footer")));
    if (spec.intro) box.appendChild(el("p", "subtitle", esc(spec.intro)));
    const wrap = el("div", "hf-wrap"), dlg = el("div", "hf-dlg"), right = el("div", "hf-right"), msg = el("div", "sp-msg");
    wrap.append(dlg, right); box.append(wrap, msg);
    const say = (t) => { msg.className = "sp-msg"; msg.innerHTML = t; };
    function apply(all) {
      const D = S.dlg, idx = all ? slides.map((_, i) => i) : [S.sel];
      idx.forEach((i) => {
        if (D.noTitle && slides[i].titleSlide) { S.st[i] = blank(); return; }
        S.st[i] = { date: D.date, auto: D.auto, fixed: D.fixed, num: D.num, footer: D.footer, ftext: D.ftext };
      });
      say(all ? "✅ <b>Apply to All</b>: đã áp dụng cho <b>tất cả</b> các trang chiếu" + (D.noTitle && slides.some((s) => s.titleSlide) ? " (trừ trang tiêu đề vì đã chọn Don't show on title slide)." : ".")
        : "☝️ <b>Apply</b>: chỉ áp dụng cho <b>trang " + (S.sel + 1) + "</b> đang chọn — các trang khác chưa thay đổi. Muốn áp dụng cho mọi trang, bấm <b>Apply to All</b>.");
      paint(); check();
    }
    function check() {
      const g = spec.goal; if (!g) return;
      const norm = (x) => String(x || "").toLowerCase().replace(/\s+/g, " ").trim();
      const ok = slides.every((s, i) => {
        const t = S.st[i];
        if (s.titleSlide && g.noTitle) return !t.date && !t.num && !t.footer;
        return (!g.date || (t.date && t.auto)) && (!g.num || t.num) && (!g.footer || (t.footer && norm(t.ftext).includes(norm(g.footer))));
      });
      if (ok && !S.done) { S.done = true; say("🎉 " + esc(spec.success || "Hoàn thành! Các trang chiếu đã có ngày, số trang và chân trang; trang tiêu đề không hiện.")); sound("ok"); celebrate(); }
      if (!ok) S.done = false;
    }
    function paint() {
      const D = S.dlg;
      dlg.innerHTML = `<div class="hf-top"><b>Header and Footer</b><span>? ✕</span></div>
        <div class="hf-tabs"><button type="button" data-t="slide" class="${S.tab === "slide" ? "on" : ""}">Slide</button><button type="button" data-t="notes" class="${S.tab === "notes" ? "on" : ""}">Notes and Handouts</button></div>`;
      const body = el("div", "hf-body"); dlg.appendChild(body);
      dlg.querySelectorAll("[data-t]").forEach((b) => (b.onclick = () => { S.tab = b.dataset.t; paint(); }));
      if (S.tab === "notes") {
        body.innerHTML = `<div class="hf-note">📄 Ở chế độ <b>Notes and Handouts</b> (tài liệu in phát cho người nghe) mới có mục <b>Header</b> (đầu trang). Ở chế độ <b>Slide</b> không thêm được đầu trang.</div>
          <label class="hf-row"><input type="checkbox" disabled> Date and time</label><label class="hf-row"><input type="checkbox" checked disabled> <b>Header</b></label>
          <label class="hf-row"><input type="checkbox" disabled> Page number</label><label class="hf-row"><input type="checkbox" disabled> Footer</label>`;
      } else {
        body.innerHTML = `<div class="hf-grp">Include on slide</div>
          <label class="hf-row"><input type="checkbox" data-k="date"${D.date ? " checked" : ""}> <u>D</u>ate and time</label>
          <div class="hf-sub${D.date ? "" : " off"}">
            <label class="hf-row"><input type="radio" name="hfa" data-k="auto1"${D.auto ? " checked" : ""}${D.date ? "" : " disabled"}> <u>U</u>pdate automatically</label>
            <div class="hf-in hf-ro">${today}</div>
            <label class="hf-row"><input type="radio" name="hfa" data-k="auto0"${D.auto ? "" : " checked"}${D.date ? "" : " disabled"}> Fi<u>x</u>ed</label>
            <input class="hf-in" data-k="fixed" value="${esc(D.fixed)}" placeholder="VD: 19/10/2022"${D.date && !D.auto ? "" : " disabled"}>
          </div>
          <label class="hf-row"><input type="checkbox" data-k="num"${D.num ? " checked" : ""}> Slide <u>n</u>umber</label>
          <label class="hf-row"><input type="checkbox" data-k="footer"${D.footer ? " checked" : ""}> <u>F</u>ooter</label>
          <input class="hf-in" data-k="ftext" value="${esc(D.ftext)}" placeholder="Nhập thông tin xuất hiện ở chân trang"${D.footer ? "" : " disabled"}>
          <label class="hf-row hf-nt"><input type="checkbox" data-k="noTitle"${D.noTitle ? " checked" : ""}> Don't show on title <u>s</u>lide</label>`;
        body.querySelectorAll("[data-k]").forEach((inp) => {
          const k = inp.dataset.k;
          if (k === "fixed" || k === "ftext") { inp.oninput = () => { D[k] = inp.value; }; inp.onkeydown = (e) => e.stopPropagation(); return; }
          inp.onchange = () => { if (k === "auto1") D.auto = true; else if (k === "auto0") D.auto = false; else D[k] = inp.checked; paint(); };
        });
      }
      const btns = el("div", "hf-btns");
      [["Apply", () => apply(false)], ["Apply to All", () => apply(true)], ["Cancel", () => { S.dlg = Object.assign(blank(), S.st[S.sel], { noTitle: S.dlg.noTitle }); paint(); say("Đã huỷ các thay đổi chưa áp dụng."); }]].forEach(([t, fn]) => { const b = el("button", "hf-btn" + (t === "Apply to All" ? " main" : ""), t); b.type = "button"; b.onclick = fn; btns.appendChild(b); });
      dlg.appendChild(btns);
      // các trang chiếu thu nhỏ
      right.innerHTML = '<div class="hf-hint">👆 Bấm chọn một trang (để thử <b>Apply</b>)</div>';
      const grid = el("div", "hf-grid"); right.appendChild(grid);
      slides.forEach((s, i) => {
        const t = S.st[i], c = el("div", "hf-sl" + (i === S.sel ? " sel" : "") + (s.titleSlide ? " ttl" : ""));
        c.innerHTML = `<div class="hf-in-sl">${s.titleSlide ? `<div class="hf-t1">${esc(s.title)}</div>${s.sub ? `<div class="hf-sub1">${esc(s.sub)}</div>` : ""}`
          : `<div class="hf-t2">${esc(s.title)}</div><ul>${(s.bullets || []).map((b) => `<li>${esc(b)}</li>`).join("")}</ul>`}</div>
          <div class="hf-ft"><span>${t.date ? esc(t.auto ? today : t.fixed || "") : ""}</span><span>${t.footer ? esc(t.ftext) : ""}</span><span>${t.num ? i + 1 : ""}</span></div>`;
        c.onclick = () => { S.sel = i; paint(); };
        const wr = el("div", "hf-cell"); wr.append(c, el("div", "hf-no", String(i + 1))); grid.appendChild(wr);
      });
    }
    say("✍️ Tích chọn các mục trong hộp thoại, nhập thông tin chân trang, rồi bấm <b>Apply</b> hoặc <b>Apply to All</b> và quan sát các trang chiếu.");
    paint();
    return box;
  }

  // ---- MÔ PHỎNG PHỐI MÀU TRANG CHIẾU (hoạt động `colorsim`) — Tin 8 Bài 10a -----------------------------------------------
  //  colorsim: { title?, intro?, slide: { title, bullets: [...] }, palette?: [{ name, hex }] }
  //  Chọn chủ đề, màu nền, màu tiêu đề, màu chữ, cỡ chữ → app nhận xét: độ tương phản (dễ/khó đọc), nhóm màu nóng/lạnh/trung tính,
  //  hài hoà với chủ đề, số màu, cỡ chữ. Không chấm điểm.
  const CS_PAL = [["Đỏ", "#dc2626"], ["Da cam", "#f97316"], ["Vàng", "#facc15"], ["Nâu", "#92400e"], ["Xanh lục", "#16a34a"], ["Xanh dương", "#1d4ed8"],
    ["Xanh nhạt", "#bae6fd"], ["Tím", "#7c3aed"], ["Trắng", "#ffffff"], ["Be", "#f5f0e1"], ["Xám", "#6b7280"], ["Đen", "#111111"]];
  function csRGB(h) { const x = parseInt(h.slice(1), 16); return [(x >> 16) & 255, (x >> 8) & 255, x & 255]; }
  function csLum(h) { return csRGB(h).map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }).reduce((s, v, i) => s + v * [0.2126, 0.7152, 0.0722][i], 0); }
  function csContrast(a, b) { const x = csLum(a), y = csLum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); }
  function csGroup(h) {
    const [r, g, b] = csRGB(h).map((v) => v / 255), mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2, s = mx === mn ? 0 : (mx - mn) / (1 - Math.abs(2 * l - 1));
    if (s < 0.25 || l > 0.9 || l < 0.1) return "trung tính";
    let hue = mx === r ? ((g - b) / (mx - mn)) % 6 : mx === g ? (b - r) / (mx - mn) + 2 : (r - g) / (mx - mn) + 4; hue = (hue * 60 + 360) % 360;
    return hue < 70 || hue >= 330 ? "nóng" : "lạnh";
  }
  function colorsimBox(a) {
    ensureEngineCSS();
    const spec = a.colorsim, P = spec.palette ? spec.palette.map((p) => [p.name, p.hex]) : CS_PAL;
    const TOP = { le: ["🎉 Lễ hội, giải trí", "nóng"], hoc: ["📚 Giáo dục, học tập", "trung tính"], tri: ["🎨 Nghệ thuật, tri ân", "lạnh"] };
    const S = a._cs || (a._cs = { topic: "hoc", bg: "#ffffff", tc: "#16a34a", bc: "#111111", size: 32, tsize: 54 });
    const box = el("div", "sr-box cs-box");
    box.appendChild(el("h3", "sr-title", "🎨 " + esc(spec.title || "Phối màu trang chiếu")));
    if (spec.intro) box.appendChild(el("p", "subtitle", esc(spec.intro)));
    const wrap = el("div", "cs-wrap"), ctl = el("div", "cs-ctl"), right = el("div", "cs-right");
    wrap.append(ctl, right); box.appendChild(wrap);
    const nameOf = (h) => (P.find((p) => p[1] === h) || ["", h])[0];
    function paint() {
      ctl.innerHTML = "";
      const tp = el("div", "cs-row"); tp.appendChild(el("b", "", "Chủ đề: "));
      Object.keys(TOP).forEach((k) => { const b = el("button", "cs-chip" + (S.topic === k ? " on" : ""), TOP[k][0]); b.type = "button"; b.onclick = () => { S.topic = k; paint(); }; tp.appendChild(b); });
      ctl.appendChild(tp);
      [["bg", "Màu nền"], ["tc", "Màu tiêu đề"], ["bc", "Màu chữ nội dung"]].forEach(([k, lb]) => {
        const r = el("div", "cs-row"); r.appendChild(el("b", "", lb + ": "));
        P.forEach(([n, h]) => { const b = el("button", "cs-sw" + (S[k] === h ? " on" : "")); b.type = "button"; b.style.background = h; b.title = n; b.onclick = () => { S[k] = h; paint(); }; r.appendChild(b); });
        ctl.appendChild(r);
      });
      const sz = el("div", "cs-row");
      sz.innerHTML = `<b>Cỡ chữ tiêu đề: </b><select data-k="tsize">${[24, 28, 32, 40, 44, 54, 60].map((v) => `<option${S.tsize === v ? " selected" : ""}>${v}</option>`).join("")}</select>
        <b style="margin-left:12px">Cỡ chữ nội dung: </b><select data-k="size">${[12, 14, 16, 18, 20, 24, 28, 32, 40].map((v) => `<option${S.size === v ? " selected" : ""}>${v}</option>`).join("")}</select>`;
      sz.querySelectorAll("select").forEach((s) => (s.onchange = () => { S[s.dataset.k] = +s.value; paint(); }));
      ctl.appendChild(sz);
      // trang chiếu
      right.innerHTML = "";
      const sl = el("div", "cs-slide"); sl.style.background = S.bg;
      sl.innerHTML = `<div class="cs-t" style="color:${S.tc};font-size:${S.tsize / 18}em;font-size:${(S.tsize * 100 / 960).toFixed(2)}cqw">${esc(spec.slide.title)}</div><ul style="color:${S.bc};font-size:${S.size / 26}em;font-size:${(S.size * 100 / 960).toFixed(2)}cqw">${spec.slide.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>`;
      right.appendChild(sl);
      // nhận xét
      const out = [], cb = csContrast(S.bc, S.bg), ct = csContrast(S.tc, S.bg);
      const rate = (c) => (c >= 4.5 ? ["ok", "dễ đọc"] : c >= 3 ? ["warn", "hơi khó đọc"] : ["bad", "khó đọc"]);
      const [rb, tb] = [rate(cb), rate(ct)];
      out.push([rb[0], `Chữ nội dung ${esc(nameOf(S.bc))} trên nền ${esc(nameOf(S.bg))}: độ tương phản ${cb.toFixed(1)} — <b>${rb[1]}</b>${rb[0] !== "ok" ? ". Nên chọn màu chữ có độ tương phản cao với màu nền." : "."}`]);
      out.push([tb[0], `Tiêu đề ${esc(nameOf(S.tc))} trên nền: độ tương phản ${ct.toFixed(1)} — <b>${tb[1]}</b>.`]);
      const g = csGroup(S.bg), want = TOP[S.topic][1];
      out.push([g === want ? "ok" : "warn", `Màu nền thuộc nhóm màu <b>${g}</b>. Chủ đề ${esc(TOP[S.topic][0].replace(/^\S+\s/, "").toLowerCase())} gợi ý dùng gam màu <b>${want}</b>${g === want ? " — hài hoà với nội dung." : "."}`]);
      const n = new Set([S.bg, S.tc, S.bc]).size;
      if (n < 3) out.push(["warn", "Có màu bị trùng nhau (chữ trùng màu nền sẽ không nhìn thấy)."]);
      const gs = [csGroup(S.tc), csGroup(S.bc)].filter((x) => x !== "trung tính");
      if (gs.includes("nóng") && gs.includes("lạnh")) out.push(["warn", "Tiêu đề và nội dung dùng màu nóng lẫn màu lạnh — nên kết hợp các màu cùng nhóm với nhau."]);
      out.push([S.size >= 20 ? "ok" : "bad", S.size >= 20 ? `Cỡ chữ nội dung ${S.size} — đủ lớn để cả lớp đọc được.` : `Cỡ chữ nội dung ${S.size} — quá nhỏ, người ngồi xa khó đọc.`]);
      out.push([S.tsize > S.size ? "ok" : "warn", S.tsize > S.size ? "Tiêu đề lớn hơn nội dung — thể hiện rõ mức phân cấp." : "Tiêu đề nên có cỡ chữ lớn hơn nội dung."]);
      const list = el("div", "cs-list");
      out.forEach(([k, t]) => list.appendChild(el("div", "cs-it " + k, (k === "ok" ? "✅ " : k === "warn" ? "⚠️ " : "❌ ") + t)));
      right.appendChild(list);
    }
    paint();
    return box;
  }

  // ---- BIỂU ĐỒ SVG (cột / quạt tròn / đoạn thẳng) — vẽ như Excel, sắc nét trên máy chiếu -----------------------
  //  Dùng ở: content.blocks { kind: "chart", value: spec } · câu hỏi `chart: spec` · hoạt động `chart: spec` · poll `chart: true`.
  //  `chart` nhận 1 spec hoặc mảng spec (xếp cạnh nhau). spec: { type: "column" | "pie" | "line", title?, labels: [...],
  //   values: [...] | series: [{ name, values }], dataLabels?, percent? (quạt tròn: nhãn %), legend?, gridlines? (mặc định có),
  //   yMin?, yMax?, yStep?, yTitle?, xTitle?, color?, colors?, thousands? (3.038), markers? (đoạn thẳng), caption? }
  const CH_COLORS = ["#4472c4", "#ed7d31", "#a5a5a5", "#ffc000", "#5b9bd5", "#70ad47", "#264478", "#9e480e"];
  function chNum(v, s) { const r = Math.round(v * 100) / 100; return s && s.thousands ? String(r).replace(/\B(?=(\d{3})+(?!\d))/g, ".") : String(r); }
  function chPct(vals) { // làm tròn % theo phần dư lớn nhất để tổng đúng 100 (giống số liệu SGK)
    const tot = vals.reduce((s, v) => s + v, 0); if (!tot) return vals.map(() => 0);
    const raw = vals.map((v) => v * 100 / tot), fl = raw.map(Math.floor); let rest = 100 - fl.reduce((s, v) => s + v, 0);
    raw.map((r, i) => [r - fl[i], i]).sort((a, b) => b[0] - a[0]).forEach(([, i]) => { if (rest > 0) { fl[i]++; rest--; } });
    return fl;
  }
  function chWrap(t, max) {
    const w = String(t).split(" "), lines = [""];
    w.forEach((x) => { const cur = lines[lines.length - 1]; if (cur && (cur + " " + x).length > max && lines.length < 3) lines.push(x); else lines[lines.length - 1] = cur ? cur + " " + x : x; });
    return lines;
  }
  function chText(x, y, s, o) {
    o = o || {};
    return `<text x="${x}" y="${y}" font-size="${o.size || 14}" text-anchor="${o.anchor || "middle"}" fill="${o.fill || "#404040"}"${o.bold ? ' font-weight="700"' : ""}${o.halo ? ' stroke="rgba(0,0,0,.35)" stroke-width="3" paint-order="stroke"' : ""}>${esc(s)}</text>`;
  }
  function chartSVG(s) {
    s = s || {};
    const W = 640, H = 400, t = s.type || "column", labels = s.labels || [];
    const series = s.series || [{ name: s.seriesName || s.title || "", values: s.values || [] }];
    const cols = s.colors || (s.color ? [s.color] : CH_COLORS);
    let o = `<svg class="chart-svg" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${esc(s.title || "Biểu đồ")}"><rect x=".5" y=".5" width="${W - 1}" height="${H - 1}" fill="#fff" stroke="#d4d4d8"/>`;
    let top = 18;
    if (s.title) { o += chText(W / 2, 38, s.title, { size: 21, fill: "#404040" }); top = 58; }
    if (t === "pie") {
      const vals = series[0].values.map(Number), tot = vals.reduce((a, b) => a + b, 0), pc = chPct(vals), leg = s.legend !== false;
      const cx = leg ? 225 : W / 2, cy = (top + H) / 2, r = Math.min((H - top) / 2 - 14, leg ? 175 : 200);
      if (!tot) o += chText(cx, cy, "Chưa có dữ liệu", { size: 18, fill: "#94a3b8" });
      let ang = -Math.PI / 2;
      vals.forEach((v, i) => {
        if (!tot || !v) return;
        const a2 = ang + v / tot * Math.PI * 2, c = cols[i % cols.length];
        if (v === tot) o += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${c}" stroke="#fff" stroke-width="2"/>`;
        else {
          const x1 = cx + r * Math.cos(ang), y1 = cy + r * Math.sin(ang), x2 = cx + r * Math.cos(a2), y2 = cy + r * Math.sin(a2);
          o += `<path d="M${cx},${cy} L${x1.toFixed(1)},${y1.toFixed(1)} A${r},${r} 0 ${a2 - ang > Math.PI ? 1 : 0} 1 ${x2.toFixed(1)},${y2.toFixed(1)} Z" fill="${c}" stroke="#fff" stroke-width="2"/>`;
        }
        if (s.dataLabels || s.percent) {
          const m = (ang + a2) / 2, lx = cx + r * 0.66 * Math.cos(m), ly = cy + r * 0.66 * Math.sin(m) + 6;
          o += chText(lx.toFixed(1), ly.toFixed(1), s.percent ? pc[i] + "%" : chNum(v, s), { size: 17, fill: "#fff", bold: true, halo: true });
        }
        ang = a2;
      });
      if (leg) {
        const lh = 30, y0 = cy - (labels.length * lh) / 2 + 10;
        labels.forEach((lb, i) => { o += `<rect x="440" y="${y0 + i * lh - 12}" width="14" height="14" fill="${cols[i % cols.length]}"/>` + chText(462, y0 + i * lh, lb, { size: 15, anchor: "start" }); });
      }
      return o + "</svg>";
    }
    const all = series.reduce((a, se) => a.concat(se.values.map(Number)), []), maxV = Math.max(0, ...all);
    const yMin = s.yMin != null ? s.yMin : 0;
    let step = s.yStep;
    if (!step) { const raw = Math.max(1e-9, (maxV - yMin) / 8), p = Math.pow(10, Math.floor(Math.log10(raw))), m = raw / p; step = (m <= 1 ? 1 : m <= 2 ? 2 : m <= 5 ? 5 : 10) * p; }
    const yMax = s.yMax != null ? s.yMax : Math.max(yMin + step, Math.ceil((maxV - 1e-9) / step) * step);
    const leg = s.legend != null ? s.legend : series.length > 1;
    const L = 70, R = W - (s.xTitle ? 58 : 24), T = top + (s.yTitle ? 22 : 10) + (s.dataLabels ? 10 : 0), B = H - (leg ? 88 : 62);
    const y = (v) => B - (Math.max(yMin, Math.min(yMax, v)) - yMin) / (yMax - yMin) * (B - T);
    if (s.yTitle) o += chText(14, top + 8, s.yTitle, { size: 15, anchor: "start", fill: "#262626", bold: true });
    for (let v = yMin; v <= yMax + 1e-9; v += step) {
      const yy = y(v).toFixed(1);
      if (s.gridlines !== false) o += `<line x1="${L}" y1="${yy}" x2="${R}" y2="${yy}" stroke="#e4e4e7"/>`;
      o += chText(L - 10, +yy + 5, chNum(v, s), { size: 14, anchor: "end", fill: "#595959" });
    }
    o += `<line x1="${L}" y1="${B}" x2="${R}" y2="${B}" stroke="#a1a1aa"/>`;
    if (s.xTitle) o += chText(R + 8, B + 5, s.xTitle, { size: 15, anchor: "start", fill: "#262626", bold: true });
    const n = Math.max(1, labels.length), gw = (R - L) / n, maxCh = Math.max(6, Math.floor(gw / 8.2));
    labels.forEach((lb, i) => chWrap(lb, maxCh).forEach((ln, k) => { o += chText(L + gw * (i + .5), B + 22 + k * 17, ln, { size: 14, fill: "#595959" }); }));
    const k = series.length, bw = Math.min(70, gw * 0.5 / k);
    series.forEach((se, si) => {
      const c = cols[si % cols.length], vals = se.values.map(Number);
      if (t === "line") {
        const pts = vals.map((v, i) => [L + gw * (i + .5), y(v)]);
        o += `<polyline points="${pts.map((p) => p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" ")}" fill="none" stroke="${c}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"/>`;
        pts.forEach((p, i) => {
          if (s.markers) o += `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="5" fill="${c}" stroke="#fff" stroke-width="2"/>`;
          if (s.dataLabels) o += chText(p[0].toFixed(1), (p[1] - 12).toFixed(1), chNum(vals[i], s), { size: 14, fill: "#404040" });
        });
      } else {
        vals.forEach((v, i) => {
          const x = L + gw * (i + .5) - (bw * k) / 2 + bw * si, yy = y(v), h = Math.max(0, B - yy);
          o += `<rect x="${x.toFixed(1)}" y="${yy.toFixed(1)}" width="${bw.toFixed(1)}" height="${h.toFixed(1)}" fill="${c}"/>`;
          if (s.dataLabels) o += chText((x + bw / 2).toFixed(1), (yy - 7).toFixed(1), chNum(v, s), { size: 14, fill: "#404040" });
        });
      }
    });
    if (leg) {
      const items = series.map((se, i) => [se.name || "Chuỗi " + (i + 1), cols[i % cols.length]]), iw = 190, x0 = W / 2 - (items.length * iw) / 2;
      items.forEach(([nm, c], i) => { o += `<rect x="${x0 + i * iw}" y="${H - 30}" width="14" height="14" fill="${c}"/>` + chText(x0 + i * iw + 22, H - 18, nm, { size: 15, anchor: "start" }); });
    }
    return o + "</svg>";
  }
  function chartHTML(spec) {
    const one = (s) => `<figure class="chart-fig">${chartSVG(s)}${s && s.caption ? `<figcaption class="caption">${esc(s.caption)}</figcaption>` : ""}</figure>`;
    return Array.isArray(spec) ? `<div class="chart-row">${spec.map(one).join("")}</div>` : one(spec);
  }

  function renderPoll(a) {
    ensureEngineCSS();
    const c = el("div", "card poll-card"); activityHead(a, c);
    const opts = a.options || [], key = aid(a) + ":poll";
    if (a.question) c.appendChild(el("p", "prompt", esc(a.question)));
    const box = el("div", "poll-box"); c.appendChild(box); view.appendChild(c);
    if (STUDENT) {
      const sent = ask("getText", key); let cur = sent ? sent.text : null;
      const draw = () => {
        box.innerHTML = "";
        opts.forEach((o, i) => {
          const b = el("button", "poll-opt" + (cur === o ? " sel" : ""), '<span class="key">' + (KEYS[i] || i + 1) + "</span> " + esc(o));
          b.onclick = () => { cur = o; emit("onText", { key, activityId: aid(a), text: o }); sound("ok"); draw(); };
          box.appendChild(b);
        });
        box.appendChild(el("p", "ta-status", cur ? "✓ Đã gửi lựa chọn: <b>" + esc(cur) + "</b> — có thể đổi đến khi thầy/cô chuyển hoạt động" : "👆 Chọn một phương án để gửi cho thầy/cô"));
      };
      draw(); return;
    }
    const counts = a._counts || (a._counts = opts.map(() => 0));
    const draw = () => {
      const list = ask("groupTexts", key), live = Array.isArray(list);
      const n = live ? opts.map((o) => list.filter((g) => g.text === o).length) : counts;
      const total = n.reduce((s, x) => s + x, 0), max = Math.max(1, ...n);
      box.innerHTML = "";
      const pv = a.chartView ? a._pv || "bars" : "bars";
      if (a.chartView) { // chartView: true → GV đổi qua lại thanh ngang / biểu đồ cột / biểu đồ hình quạt tròn
        const tabs = el("div", "poll-tabs");
        [["bars", "📊 Thanh ngang"], ["column", "📶 Biểu đồ cột"], ["pie", "🥧 Biểu đồ hình quạt tròn"]].forEach(([v, lb]) => {
          const b = el("button", "btn ghost poll-tab" + (pv === v ? " on" : ""), lb); b.onclick = () => { a._pv = v; draw(); }; tabs.appendChild(b);
        });
        box.appendChild(tabs);
      }
      if (pv !== "bars") {
        const cv = el("div", "poll-chart");
        cv.innerHTML = chartSVG({ type: pv, title: a.chartTitle || "Kết quả bình chọn", labels: opts, values: n, dataLabels: true, percent: pv === "pie" });
        box.appendChild(cv);
        if (!live) {
          const chips = el("div", "poll-chips");
          opts.forEach((o, i) => {
            const sp = el("span", "poll-chip"), minus = el("button", "btn ghost poll-pm", "−"), plus = el("button", "btn ghost poll-pm", "+1 " + esc(o));
            minus.onclick = () => { counts[i] = Math.max(0, counts[i] - 1); draw(); }; plus.onclick = () => { counts[i]++; draw(); };
            sp.append(minus, plus); chips.appendChild(sp);
          });
          box.appendChild(chips);
        }
      }
      if (pv === "bars") opts.forEach((o, i) => {
        const row = el("div", "poll-row" + (total && n[i] === max ? " top" : ""));
        row.innerHTML = '<span class="poll-lb">' + (KEYS[i] || i + 1) + ". " + esc(o) + '</span><span class="poll-bar"><i style="width:' + (n[i] / max * 100) + '%"></i></span><b class="poll-n">' + n[i] + "</b>";
        if (!live) {
          const minus = el("button", "btn ghost poll-pm", "−1"), plus = el("button", "btn ghost poll-pm", "+1");
          minus.onclick = () => { counts[i] = Math.max(0, counts[i] - 1); draw(); }; plus.onclick = () => { counts[i]++; draw(); };
          row.append(minus, plus);
        }
        box.appendChild(row);
      });
      box.appendChild(el("p", "ta-status", live ? "📡 " + total + " lượt đã gửi — kết quả tự cập nhật" : "✋ Chưa nối lớp học: bấm +1 theo số bạn giơ tay (tổng " + total + ")"));
    };
    draw();
    if (Array.isArray(ask("groupTexts", key))) { const t = setInterval(() => { if (!box.isConnected) return clearInterval(t); draw(); }, 2500); }
  }

  // ---- TRÒ CHƠI 2 ĐỘI LEO BẬC THANG (type "ladder") — VD “Ai lên cao hơn” (Thỏ và Rùa) ----------------
  //  teams: [{ name: "Đội Thỏ", icon: "🐰" }, { name: "Đội Rùa", icon: "🐢" }], goalIcon?: "🏆", questions: [… trắc nghiệm như quiz]
  //  Màn chiếu: câu i mặc định là lượt của đội (i % 2); GV bấm đổi đội trước khi trả lời. Đúng → nhân vật của đội lên 1 bậc.
  //  Hết câu → công bố đội lên cao hơn. Máy HS (lớp học): mỗi nhóm trả lời tất cả câu, nhân vật của nhóm leo theo số câu đúng.
  function renderLadder(a) {
    ensureEngineCSS();
    const qs = a.questions || [], T = a.teams && a.teams.length >= 2 ? a.teams.slice(0, 2) : [{ name: "Đội 1", icon: "🐰" }, { name: "Đội 2", icon: "🐢" }];
    a._res = a._res || {}; a._team = a._team || {};
    const teamOf = (i) => (i in a._team ? a._team[i] : i % 2), goal = a.goalIcon || "🏆";
    const c = el("div", "card ladder-card"); activityHead(a, c);
    if (a.intro) c.appendChild(el("p", "subtitle", esc(a.intro)));
    const wrap = el("div", "ld-wrap"); c.appendChild(wrap);
    const solo = STUDENT, N = solo ? qs.length : Math.ceil(qs.length / 2);
    const stepsOf = (t) => {
      if (solo) { const st = actStateOf(a); if (st === "open" || st === "locked") return 0; return qs.filter((q, i) => { const r = ask("getAttempt", qKey(a, i)); return r && judgeLocal(q, r.choice); }).length; }
      return qs.filter((_, i) => teamOf(i) === t && a._res[i] === true).length;
    };
    function paint(hop) {
      wrap.innerHTML = "";
      (solo ? [{ name: "Nhóm em", icon: T[0].icon }] : T).forEach((tm, t) => {
        const k = Math.min(N, stepsOf(t)), box = el("div", "ld-team" + (!solo && teamOf(a._qi || 0) === t && !((a._qi || 0) in a._res) ? " turn" : ""));
        box.appendChild(el("div", "ld-head", "<span>" + esc(tm.icon) + " " + esc(tm.name) + "</span><span>" + k + "/" + N + " bậc</span>"));
        const stair = el("div", "ld-stair");
        for (let j = 0; j <= N; j++) {
          const st = el("div", "ld-step" + (j <= k && j > 0 ? " done" : "") + (j === N ? " top" : ""));
          st.style.width = (28 + 72 * j / Math.max(1, N)) + "%";
          st.innerHTML = j === k ? '<span class="ld-me' + (hop === t ? " hop" : "") + '">' + esc(tm.icon) + "</span>" : j === N ? "<span>" + esc(goal) + "</span>" : "";
          stair.appendChild(st);
        }
        box.appendChild(stair); wrap.appendChild(box);
      });
      if (!solo && qs.length && Object.keys(a._res).length >= qs.length && !c.querySelector(".ld-win")) {
        const s0 = stepsOf(0), s1 = stepsOf(1), w = s0 === s1 ? null : s0 > s1 ? T[0] : T[1];
        const win = el("div", "ld-win", w ? "🏆 " + esc(w.icon) + " " + esc(w.name) + " lên cao hơn — chiến thắng! (" + Math.max(s0, s1) + " : " + Math.min(s0, s1) + ")" : "🤝 Hai đội bằng nhau (" + s0 + " : " + s1 + ") — hoà!");
        c.insertBefore(win, wrap.nextSibling); celebrate(); if (S.sound) { try { fanfare(); } catch (e) {} }
      }
    }
    if (!solo && qs.length && !((a._qi || 0) in a._res)) { // chọn đội trả lời câu này
      const bar = el("div", "ld-turnbar", "<b>Lượt trả lời:</b>");
      T.forEach((tm, t) => { const b = el("button", "btn ghost" + (teamOf(a._qi || 0) === t ? " on" : ""), esc(tm.icon) + " " + esc(tm.name)); b.onclick = () => { a._team[a._qi || 0] = t; render(); }; bar.appendChild(b); });
      c.appendChild(bar);
    }
    view.appendChild(c);
    c._ladder = (ok) => { paint(ok ? (solo ? 0 : teamOf(a._qi)) : null); const tb = c.querySelector(".ld-turnbar"); if (tb) tb.remove(); };
    renderQuizInto(c, a);
    paint(null);
  }

  // ---- TRÒ CHUYỆN TÌNH HUỐNG (type "chat") — khung tin nhắn giống ứng dụng nhắn tin ----------------
  //  chat: { name, avatar?: "🦊", status?: "…" }, intro?,
  //  questions: [{ question: "tin nhắn đến (mỗi dòng 1 bong bóng)", options: ["câu trả lời", …], answer, explanation,
  //               reaction?: "tin đáp lại khi em trả lời an toàn", badReaction?: "tin đáp lại khi chưa an toàn",
  //               chat?: { name, avatar, status } (đổi người nhắn), prompt?: "dòng nhắc" }]
  //  Mỗi câu là câu trắc nghiệm bình thường: chấm điểm, lớp học, theo nhịp GV giống quiz.
  function chatChoiceOf(a, i) {
    if (STUDENT) { const r = ask("getAttempt", qKey(a, i)); return r ? r.choice : null; }
    return a._chosen && i in a._chosen ? a._chosen[i] : null;
  }
  function renderChat(a) {
    ensureEngineCSS();
    const qs = a.questions || [];
    const c = el("div", "card chat-card"); activityHead(a, c);
    if (a.intro) c.appendChild(el("p", "subtitle", esc(a.intro)));
    if (!qs.length) { view.appendChild(c); return renderQuizInto(c, a); }
    if (a._qi == null) { a._qi = 0; while (a._qi < qs.length - 1 && ask("getAttempt", qKey(a, a._qi))) a._qi++; }
    const who = (i) => Object.assign({ name: "Người lạ", avatar: "👤" }, a.chat, qs[i] && qs[i].chat);
    const cur = who(a._qi), st = actStateOf(a), judged = st === "free" || st === "revealed";
    const phone = el("div", "chat");
    phone.innerHTML = `<div class="chat-top"><span class="chat-av">${esc(cur.avatar)}</span><div class="chat-who"><b>${esc(cur.name)}</b>${cur.status ? `<small>${esc(cur.status)}</small>` : ""}</div><span class="chat-ico">📞 ⋮</span></div><div class="chat-log"></div>`;
    const log = phone.querySelector(".chat-log");
    const lines = (t) => String(t == null ? "" : t).split("\n").filter((x) => x.trim());
    const bub = (t, me, extra, delay) => { const b = el("div", "chat-b " + (me ? "me" : "them") + (extra ? " " + extra : ""), esc(t)); if (delay) b.style.animationDelay = delay + "s"; log.appendChild(b); return b; };
    const replyText = (q, ch) => (q.type === "true-false" ? (ch ? "Đúng" : "Sai") : Array.isArray(ch) ? ch.map((k) => (q.options || [])[k]).join(" · ") : (q.options || [])[ch]);
    const answerBubbles = (i, ch, live) => {
      const q = qs[i], ok = judgeLocal(q, ch);
      bub(replyText(q, ch), true, judged ? (ok ? "ok" : "no") : i === a._qi ? "pick" : "", 0);
      if (judged) lines(ok ? q.reaction : q.badReaction).forEach((t, k) => bub(t, false, "", live ? 0.7 + k * 0.6 : 0));
    };
    for (let i = 0; i <= a._qi; i++) {
      if (i && who(i).name !== who(i - 1).name) log.appendChild(el("div", "chat-sep", `Tin nhắn từ ${esc(who(i).avatar)} ${esc(who(i).name)}`));
      lines(qs[i].question).forEach((t, k) => bub(t, false, i === a._qi ? "new" : "", i === a._qi ? k * 0.5 : 0));
      const ch = chatChoiceOf(a, i);
      if (ch != null && (i < a._qi || STUDENT)) answerBubbles(i, ch, false);
    }
    c.appendChild(phone); view.appendChild(c);
    const toEnd = () => { log.scrollTop = log.scrollHeight; };
    toEnd(); setTimeout(toEnd, 1600);
    c._chatPick = (ch) => { log.querySelectorAll(".chat-b.pick").forEach((x) => x.remove()); bub(replyText(qs[a._qi], ch), true, "pick", 0); toEnd(); }; // theo nhịp GV: đổi câu trả lời
    c._chat = (ok, choice) => {
      (a._chosen = a._chosen || {})[a._qi] = choice;
      answerBubbles(a._qi, choice, true); toEnd(); setTimeout(toEnd, 2200);
      if (a._qi >= qs.length - 1) {
        const safe = qs.filter((q, i) => { const ch = chatChoiceOf(a, i); return ch != null && judgeLocal(q, ch); }).length;
        const done = el("div", "feedback ok");
        done.innerHTML = `🛡️ Em đã xử lí an toàn <b>${safe}/${qs.length}</b> tình huống. ` + (safe === qs.length ? esc(a.winText || "Tuyệt vời — em là người dùng Internet thông thái!") : "Cùng xem lại các tình huống chưa an toàn nhé.");
        c.appendChild(done); if (safe === qs.length) celebrate();
      }
    };
    renderQuizInto(c, a);
  }

  // ---- THỬ ĐỘ MẠNH MẬT KHẨU (activity.password) — KHÔNG lưu, KHÔNG gửi đi đâu ----------------
  //  password: true | { intro?, examples?: ["12345678", "Minh2012", …] (nút thử nhanh), minLength?: 8 }
  const PW_COMMON = ["123456", "12345678", "123456789", "password", "matkhau", "qwerty", "abc123", "111111", "000000", "iloveyou", "admin"];
  function pwCheck(p, min) {
    const crit = [
      [`Đủ dài (từ ${min} kí tự trở lên)`, p.length >= min],
      ["Có chữ cái viết hoa (A – Z)", /[A-Z]/.test(p)],
      ["Có chữ cái viết thường (a – z)", /[a-z]/.test(p)],
      ["Có chữ số (0 – 9)", /\d/.test(p)],
      ["Có kí tự đặc biệt (! @ # $ % & * …)", /[^A-Za-z0-9\s]/.test(p)],
    ];
    const low = p.toLowerCase(), warn = [];
    if (PW_COMMON.some((w) => low.includes(w))) warn.push("Chứa dãy quá phổ biến (123456, password, matkhau…) — kẻ xấu thử đầu tiên.");
    if (/(.)\1\1/.test(p)) warn.push("Có kí tự lặp lại liên tiếp (aaa, 111…).");
    if (/(19|20)\d\d/.test(p)) warn.push("Có thể chứa năm sinh — người quen dễ đoán.");
    if (/^\d+$/.test(p)) warn.push("Chỉ toàn chữ số.");
    if (/\s/.test(p)) warn.push("Có dấu cách — nhiều trang web không cho dùng.");
    const n = crit.filter((x) => x[1]).length;
    let lv = !p ? 0 : !crit[0][1] ? 1 : n <= 2 ? 1 : n <= 4 ? 2 : 3;
    if (warn.length && lv > 1) lv--;
    if (lv === 3 && p.length >= 12) lv = 4;
    return { crit, warn, lv };
  }
  function passwordBox(a) {
    ensureEngineCSS();
    const spec = a.password === true ? {} : a.password || {}, min = spec.minLength || 8;
    const LV = [["", "", 0], ["🔴 Yếu", "#dc2626", 25], ["🟠 Trung bình", "#f59e0b", 55], ["🟢 Mạnh", "#16a34a", 85], ["💪 Rất mạnh", "#15803d", 100]];
    const w = el("div", "pw");
    w.innerHTML = `<div class="pw-head">🔐 Thử độ mạnh mật khẩu</div>${spec.intro ? `<p class="pw-intro">${esc(spec.intro)}</p>` : ""}
      <p class="pw-warn">⚠️ Chỉ gõ mật khẩu VÍ DỤ, không gõ mật khẩu thật. App không lưu và không gửi mật khẩu đi đâu.</p>
      <div class="pw-row"><input type="password" class="pw-in" autocomplete="off" autocapitalize="off" spellcheck="false" maxlength="64" placeholder="Gõ thử một mật khẩu…"><button type="button" class="pw-eye" title="Hiện / ẩn mật khẩu">👁️</button></div>
      <div class="pw-bar"><i></i></div><div class="pw-lv"></div><ul class="pw-crit"></ul><div class="pw-w"></div>
      ${(spec.examples || []).length ? `<div class="pw-ex"><span>Thử nhanh:</span>${spec.examples.map((x, i) => `<button type="button" data-i="${i}">${esc(x)}</button>`).join("")}</div>` : ""}`;
    const inp = w.querySelector(".pw-in"), bar = w.querySelector(".pw-bar i"), lvEl = w.querySelector(".pw-lv"), crit = w.querySelector(".pw-crit"), wr = w.querySelector(".pw-w");
    let best = 0;
    const paint = () => {
      const R = pwCheck(inp.value, min), L2 = LV[R.lv];
      bar.style.width = L2[2] + "%"; bar.style.background = L2[1];
      lvEl.innerHTML = inp.value ? `Độ mạnh: <b style="color:${L2[1]}">${L2[0]}</b> · ${inp.value.length} kí tự` : "Gõ thử để xem độ mạnh.";
      crit.innerHTML = R.crit.map(([t, ok]) => `<li class="${ok ? "ok" : ""}">${ok ? "✅" : "⬜"} ${esc(t)}</li>`).join("");
      wr.innerHTML = R.warn.map((t) => `<div>⚠️ ${esc(t)}</div>`).join("");
      if (R.lv >= 3 && best < 3) { celebrate(); sound("ok"); }
      best = inp.value ? Math.max(best, R.lv) : best;
    };
    inp.oninput = paint;
    w.querySelector(".pw-eye").onclick = () => { inp.type = inp.type === "password" ? "text" : "password"; };
    w.querySelectorAll(".pw-ex button").forEach((b) => { b.onclick = () => { inp.value = spec.examples[+b.dataset.i]; inp.type = "text"; paint(); }; });
    paint();
    return w;
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
  // cases: [{ question, answer, answerHtml? (sơ đồ/hình minh hoạ tự soạn, hiện cùng hướng trả lời) }]
  function renderVanDung(a) {
    const c = el("div", "card"); activityHead(a, c);
    c.appendChild(el("p", "subtitle", a.intro || "Thảo luận nhóm, trả lời rồi bấm để xem hướng chốt của giáo viên."));
    (a.cases || []).forEach((cs, i) => {
      const box = el("div", "vd-case");
      box.innerHTML = `<p class="vd-q"><b>Bài ${i + 1}.</b> ${esc(cs.question)}</p>`;
      if (STUDENT) box.appendChild(textAnswerBox(aid(a) + ":t" + i, a));
      if (showModel()) box.appendChild(revealBox("💡 Xem hướng trả lời (GV chốt)", () => el("div", "feedback ok", `<div class="explain">${esc(cs.answer)}</div>${cs.answerHtml ? `<div class="diagram">${cs.answerHtml}</div>` : ""}`)));
      c.appendChild(box);
    });
    view.appendChild(c);
  }

  // ---- PHIẾU TỰ ĐÁNH GIÁ (type "checklist") — tick mỗi mục vào 1 cột ----------------------
  //  columns?: ["✅ Làm được", "⏳ Chưa làm được"], sections: [{ title, items: [...] }], note?: "câu hỏi mở",
  //  modelAnswer?: [..] | "…" (GV bấm mới hiện). Máy HS gửi phiếu cho GV (dạng chữ dễ đọc, texts …/t0);
  //  màn chiếu nối tiết học: "📊 Thống kê cả lớp" từng mục.
  //  target?: "Nhóm em chấm sản phẩm của nhóm" — phiếu CHẤM CHÉO: HS ghi nhóm được chấm (bắt buộc khi gửi);
  //  thống kê có thêm bảng "🎯 Kết quả theo nhóm được chấm" (số phiếu, số mục ở từng cột).
  const ckCols = (a) => a.columns || ["✅ Làm được", "⏳ Chưa làm được"];
  const ckTg = (a) => "🎯 " + a.target + ": ";
  function ckText(a, marks, note, tg) {
    const cols = ckCols(a), out = [];
    if (a.target && tg && tg.trim()) out.push(ckTg(a) + tg.trim().replace(/\s+/g, " "));
    (a.sections || []).forEach((s, si) => { out.push(s.title); cols.forEach((cn, k) => { const its = (s.items || []).filter((_, i) => marks[si + "-" + i] === k); if (its.length) out.push(cn + ": " + its.join("; ")); }); });
    if (note && note.trim()) out.push("💬 " + (a.note || "Ý kiến") + ": " + note.trim().replace(/\s+/g, " "));
    return out.join("\n").slice(0, 2990);
  }
  function ckParse(a, text) {
    const cols = ckCols(a), marks = {}, pre = "💬 " + (a.note || "Ý kiến") + ": "; let si = -1, note = "", target = "";
    String(text || "").split("\n").forEach((ln) => {
      if (a.target && ln.indexOf(ckTg(a)) === 0) { target = ln.slice(ckTg(a).length); return; }
      const s = (a.sections || []).findIndex((x) => x.title === ln.trim()); if (s >= 0) { si = s; return; }
      if (ln.indexOf(pre) === 0) { note = ln.slice(pre.length); return; }
      cols.forEach((cn, k) => { if (si >= 0 && ln.indexOf(cn + ": ") === 0) ln.slice(cn.length + 2).split("; ").forEach((t) => { const i = (a.sections[si].items || []).indexOf(t); if (i >= 0) marks[si + "-" + i] = k; }); });
    });
    return { marks, note, target };
  }
  function renderChecklist(a) {
    ensureEngineCSS();
    const c = el("div", "card"); activityHead(a, c);
    const cols = ckCols(a), key = aid(a) + ":t0";
    if (!a._marks) { const sent = STUDENT && ask("getText", key), p = sent ? ckParse(a, sent.text) : { marks: {}, note: "", target: "" }; a._marks = p.marks; if (drafts[key] == null && p.note) drafts[key] = p.note; if (drafts[key + ":tg"] == null && p.target) drafts[key + ":tg"] = p.target; }
    const marks = a._marks;
    let tgIn = null;
    if (a.target) {
      const row = el("div", "ck-target"); row.appendChild(el("label", null, "🎯 " + esc(a.target) + ":"));
      tgIn = el("input"); tgIn.type = "text"; tgIn.maxLength = 40; tgIn.placeholder = "Ví dụ: Nhóm 3"; tgIn.value = drafts[key + ":tg"] || "";
      tgIn.oninput = () => { drafts[key + ":tg"] = tgIn.value; }; row.appendChild(tgIn); c.appendChild(row);
    }
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
        if (tgIn && !tgIn.value.trim()) { alert("Hãy ghi nhóm được chấm trước khi gửi."); tgIn.focus(); return; }
        if (!Object.keys(marks).length) { alert("Hãy tick ít nhất một mục trước khi gửi."); return; }
        emit("onText", { key, activityId: aid(a), text: ckText(a, marks, ta ? ta.value : "", tgIn ? tgIn.value : "") });
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
    let byTg = "";
    if (a.target) { // chấm chéo: gom phiếu theo nhóm được chấm
      const norm = (t) => String(t || "").trim().replace(/\s+/g, " ").toLowerCase(), g = {};
      parsed.forEach((p, i) => { const k = norm(p.target) || "—"; (g[k] = g[k] || { name: String(p.target || "—").trim() || "—", n: 0, by: [], c: cols.map(() => 0) }); g[k].n++; g[k].by.push(list[i].name); Object.values(p.marks).forEach((m) => { if (g[k].c[m] != null) g[k].c[m]++; }); });
      const rows = Object.values(g).sort((x, y) => x.name.localeCompare(y.name, "vi", { numeric: true }));
      byTg = `<h3>🎯 Kết quả theo nhóm được chấm</h3><table class="ck-table ck-tgt"><thead><tr><th>${esc(a.target)}</th><th>Số phiếu</th>${cols.map((cn) => `<th>${esc(cn)}</th>`).join("")}</tr></thead><tbody>`
        + rows.map((r) => `<tr><td class="ck-item"><b>${esc(r.name)}</b><br><small>chấm bởi: ${esc(r.by.join(", "))}</small></td><td>${r.n}</td>${r.c.map((m) => `<td>${m}</td>`).join("")}</tr>`).join("") + `</tbody></table>`;
    }
    d.innerHTML = `<p class="subtitle">${list.length} nhóm đã gửi phiếu.</p>` + byTg + (a.sections || []).map((s, si) => `<h3>${esc(s.title)}</h3>` + (s.items || []).map((it, i) => `<div class="ck-trow"><span>${esc(it)}</span>${cols.map((cn, k) => { const m = parsed.filter((p) => p.marks[si + "-" + i] === k).length; return `<span class="ck-tb k${k}" title="${esc(cn)}"><i style="width:${m / n * 100}%"></i><b>${m}</b></span>`; }).join("")}</div>`).join("")).join("")
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
    const de = document.documentElement, vw = de.clientWidth || window.innerWidth, vh = de.clientHeight || window.innerHeight; // vùng nhìn thấy (không tính thanh cuộn)
    const scale = rect.w >= rect.h ? vw / rect.w : vh / rect.h; // chiều dài nhất lấp đầy màn hình
    const overlay = el("div", "magnify-overlay");
    const wrap = el("div", "magnify-wrap");
    const app = document.getElementById("app"), ar = app.getBoundingClientRect(), clone = app.cloneNode(true);
    ["#penCanvas", "#confetti", ".controls", ".topbar", "#teacherBar", "#timerPanel", "#lightbox", "#spotlight", "#zoomLayer"].forEach((sel) => { const n = clone.querySelector(sel); if (n) n.style.visibility = "hidden"; });
    // Đặt bản sao đúng chỗ trang đang hiển thị (ar.top âm khi đã cuộn xuống) — trước đây luôn đặt ở đầu trang nên phóng sai vùng
    Object.assign(clone.style, { position: "absolute", top: ar.top + "px", left: ar.left + "px", width: ar.width + "px", minHeight: ar.height + "px", margin: "0" });
    const scrolled = []; [app, ...app.querySelectorAll("*")].forEach((n, i) => { if (n.scrollTop || n.scrollLeft) scrolled.push([i, n.scrollTop, n.scrollLeft]); }); // khung cuộn bên trong (bảng dài, danh sách…)
    wrap.appendChild(clone); overlay.appendChild(wrap);
    const sw = rect.w * scale, sh = rect.h * scale;
    const tx = (vw - sw) / 2 - rect.x * scale, ty = (vh - sh) / 2 - rect.y * scale;
    wrap.style.transformOrigin = "0 0"; wrap.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;
    overlay.appendChild(el("div", "magnify-hint", "Bấm để đóng · Esc"));
    overlay.onclick = () => overlay.remove();
    document.body.appendChild(overlay); focus.magEl = overlay;
    if (scrolled.length) { const all = [clone, ...clone.querySelectorAll("*")]; scrolled.forEach(([i, t, l]) => { const n = all[i]; if (n) { n.scrollTop = t; n.scrollLeft = l; } }); }
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
  function clearActivity(a) { (a.questions || []).concat((a.content && a.content.challenge) || []).forEach((q) => { delete q._store; }); ["_qi", "_ci", "_chal", "_wrong", "_checked", "_home", "_draft", "_rorder", "_porder", "_sandbox", "_box", "_res", "_marks", "_chosen"].forEach((k) => delete a[k]);
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
    // Nút ⏸️ Tạm dừng cả lớp: null = ẩn (chưa nối tiết học) · true = cả lớp đang tạm dừng · false = đang học
    classPause(on) {
      const b = $("#btnPauseClass"); if (!b) return;
      b.hidden = on == null; b.classList.toggle("lh-paused", !!on);
      b.textContent = on ? "▶️" : "⏸️";
      b.title = on ? "Cả lớp đang tạm dừng — bấm để cho HS học tiếp" : "Tạm dừng cả lớp — che màn hình tất cả máy HS";
    },
  };
  $("#btnPauseClass").onclick = () => { const h = HOOK.classPause; if (h && typeof h.toggle === "function") Promise.resolve(h.toggle()).catch((e) => console.warn(e)); };

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
    chat: renderChat,
    intro: renderKnowledge, explore: renderKnowledge, knowledge: renderKnowledge,
    quiz: renderQuiz, matching: renderMatching, dragdrop: renderDragDrop,
    ordering: renderOrdering, fillblank: renderFillBlank, flashcard: renderFlashcard,
    scenario: renderScenario, remember: renderRemember, summary: renderSummary,
    penguin: renderPenguin, ladder: renderLadder, poll: renderPoll, vandung: renderVanDung, giftbox: renderGiftbox, checklist: renderChecklist, crossword: renderCrossword,
  };

  render();
})();
