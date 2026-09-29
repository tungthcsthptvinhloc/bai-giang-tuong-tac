/* ============================================================================
 * BÀI 14 — CẤU TRÚC ĐIỀU KHIỂN  (Tin học 8 — Kết nối tri thức với cuộc sống)
 * Chủ đề 5: Giải quyết vấn đề với sự trợ giúp của máy tính.
 * Bám sát SGK trang 80–85 + Kế hoạch bài dạy (2 tiết) của giáo viên.
 * Chỉ sửa file này để đổi nội dung. Engine app.js không cần sửa.
 * GV chọn: đáp án Luyện tập theo SGK (1-d, 2-a, 3-b, 4-c); trò chơi mở đầu dùng bảng tìm chữ tự tạo, từ khoá "khuyết / đầy đủ" (SGK Tin 8);
 * mô phỏng: trò chơi Đoán số (sơ đồ khối sáng theo), ba dạng lặp, giải phương trình ax + b = 0, tìm UCLN chạy từng bước;
 * thêm: phân loại tình huống, sắp xếp thuật toán Hình 14.1a, lắp chương trình Đoán số, thám tử sửa lỗi.
 * ==========================================================================*/

// ---------- Khối lệnh Scratch vẽ tĩnh (lớp CSS của engine) ----------
const V = (n) => `<span class="sb-rep sb-rv">${n}</span>`;                      // biến (ô cam)
const SEN = (n) => `<span class="sb-rep sb-rsen">${n}</span>`;                   // trả lời (nhóm Cảm biến)
const T = (t) => `<span class="sb-in">${t}</span>`;                                // ô chữ trắng
const N = (t) => `<span class="sb-in sb-num">${t}</span>`;                         // ô số trắng
const DD = (t) => `<span class="sb-in sb-dd">${t} ▾</span>`;                       // ô chọn
const OP = (h) => `<span class="sb-rep sb-rop">${h}</span>`;                       // phép toán
const BOOL = (h) => `<span class="sb-bool">${h}</span>`;                           // biểu thức lôgic (lục giác)
const B = (cat, html, hat) => `<div class="sb sb-${cat}${hat ? " sb-hat" : ""}">${html}</div>`;
const CB = (head, inner, elseInner, foot) => `<div class="sb sb-c sb-control"><div class="sb-row">${head}</div><div class="sb-inner" style="min-height:24px">${(inner || []).join("")}</div>${elseInner ? `<div class="sb-row">nếu không thì</div><div class="sb-inner" style="min-height:24px">${elseInner.join("")}</div>` : ""}<div class="sb-foot">${foot == null ? "" : foot}</div></div>`;
const STACK = (blocks) => `<div class="sb-stack">${blocks.join("")}</div>`;
const ROW = (items) => `<div style="display:flex;flex-wrap:wrap;gap:18px;justify-content:center;align-items:flex-start">${items.join("")}</div>`;
const FIG = (html, cap) => `<figure style="margin:0;display:flex;flex-direction:column;align-items:center;gap:6px">${html}<figcaption class="caption">${cap}</figcaption></figure>`;
const IMG = (src, cap, w) => `<figure style="margin:0 auto;max-width:${w || 640}px"><img src="${src}" alt="${cap}" style="width:100%;border-radius:8px"><figcaption class="caption">${cap}</figcaption></figure>`;

const FLAG = B("event", "khi bấm vào <b class='sb-flag'>🏁</b>", true);
const STOP = B("control", "dừng lại " + DD("tất cả"));
const RAND = B("variables", "đặt " + DD("số bí mật") + " thành " + OP("lấy ngẫu nhiên từ " + N(1) + " đến " + N(100)));
const ASK = (t) => B("sensing", "hỏi " + T(t) + " và đợi");
const SAY = (h, s) => B("looks", "nói " + h + (s ? " trong " + N(s) + " giây" : ""));
const EQ = BOOL(SEN("trả lời") + " = " + V("số bí mật"));
const LT = BOOL(SEN("trả lời") + " &lt; " + V("số bí mật"));
const BRANCH = CB("nếu " + LT + " thì", [ASK("Quá thấp!")], [ASK("Quá cao!")]);
// Hình 14.1b — cấu trúc tuần tự
const H141 = STACK([FLAG, RAND, ASK("Hãy cho biết bạn đoán số nào."), SAY(V("số bí mật"), 2), SAY(SEN("trả lời"), 2), STOP]);
// Hình 14.3 — rẽ nhánh khuyết, đầy đủ, đoạn chương trình so sánh
const H143A = CB("nếu " + BOOL("&nbsp; &nbsp; &nbsp;") + " thì", []);
const H143B = CB("nếu " + BOOL("&nbsp; &nbsp; &nbsp;") + " thì", [], []);
const H143C = CB("nếu " + EQ + " thì", [SAY(T("HOAN HÔ!"))], [CB("nếu " + LT + " thì", [SAY(T("Quá thấp!"))], [SAY(T("Quá cao!"))])]);
// Hình 14.4 — ba khối lệnh lặp
const H144B = CB("lặp lại " + N(10), [], null, "↻");
const H144C = CB("liên tục", [], null, "↻");
const H144D = CB("lặp lại cho đến khi " + EQ, [], null, "↻");
// Hình 14.7 — chương trình hoàn chỉnh
const H147 = STACK([FLAG, RAND, ASK("Hãy cho biết bạn đoán số nào."), CB("lặp lại cho đến khi " + EQ, [BRANCH], null, "↻"), SAY(T("HOAN HÔ!"), 2), STOP]);
// Bảng 14.1 — bốn đoạn lệnh vẽ hình
const PEN = (n, d) => STACK([B("pen", "✏️ đặt bút"), CB("lặp lại " + N(n), [B("motion", "di chuyển " + N(100) + " bước"), B("motion", "xoay ↻ " + N(d) + " độ")], null, "↻")]);
const B141 = ROW([FIG(PEN(4, 90), "a"), FIG(PEN(5, 72), "b"), FIG(PEN(6, 60), "c"), FIG(PEN(3, 120), "d")]);
// Thám tử: các chương trình có lỗi
const BUG = (inner, first) => STACK([FLAG, first || RAND, ASK("Hãy cho biết bạn đoán số nào."), inner, SAY(T("HOAN HÔ!"), 2), STOP]);
const BUG1 = BUG(CB("lặp lại cho đến khi " + LT, [BRANCH], null, "↻"));
const BUG2 = BUG(CB("lặp lại cho đến khi " + EQ, [CB("nếu " + LT + " thì", [ASK("Quá cao!")], [ASK("Quá thấp!")])], null, "↻"));
const BUG3 = BUG(CB("lặp lại cho đến khi " + EQ, [BRANCH], null, "↻"), B("variables", "đặt " + DD("số bí mật") + " thành " + N(0)));
const BUG4 = BUG(CB("lặp lại cho đến khi " + EQ, [CB("nếu " + LT + " thì", [SAY(T("Quá thấp!"), 2)], [SAY(T("Quá cao!"), 2)])], null, "↻"));
// Chương trình Đoán số chạy được (Hình 14.7)
const DOAN_SO = [
  { op: "flag" },
  { op: "set", var: "số bí mật", random: [1, 100] },
  { op: "ask", text: "Hãy cho biết bạn đoán số nào." },
  { op: "until", cond: "trả lời == số bí mật", show: "trả lời = số bí mật", boolHTML: SEN("trả lời") + " = " + V("số bí mật"), ft: "trả lời = số bí mật?", body: [
    { op: "if", cond: "trả lời < số bí mật", show: "trả lời < số bí mật", boolHTML: SEN("trả lời") + " &lt; " + V("số bí mật"), ft: "trả lời < số bí mật?",
      then: [{ op: "ask", text: "Quá thấp!", ft: "“Quá thấp” · trả lời ← Máy hỏi lại" }],
      else: [{ op: "ask", text: "Quá cao!", ft: "“Quá cao” · trả lời ← Máy hỏi lại" }] },
  ] },
  { op: "say", text: "HOAN HÔ!", secs: 2 },
  { op: "stop" },
];

const LESSON = {
  meta: {
    subject: "Tin học", grade: "8", book: "Kết nối tri thức với cuộc sống",
    title: "Bài 14: Cấu trúc điều khiển", unit: "Chủ đề 5 — Giải quyết vấn đề với sự trợ giúp của máy tính",
    pages: "80–85", durationMinutes: 90,
  },
  objectives: {
    knowledge: [
      "Thể hiện được cấu trúc tuần tự, rẽ nhánh và lặp ở chương trình trong môi trường lập trình trực quan.",
      "Mô tả được thuật toán của một trò chơi (Đoán số) có sử dụng các cấu trúc điều khiển.",
      "Phân biệt rẽ nhánh dạng khuyết và dạng đầy đủ; nhận biết ba dạng lặp trong Scratch.",
    ],
    competencies: [
      "Tự chủ và tự học; giao tiếp và hợp tác (nhóm, cặp đôi, 2 HS/máy); giải quyết vấn đề và sáng tạo (lập trình trò chơi Đoán số, giải phương trình, tìm UCLN).",
      "Năng lực số 3.4.TC2a: nhận biết, phân biệt ba cấu trúc điều khiển; mô tả kịch bản trò chơi dưới dạng thuật toán. 5.1.TC2a: lắp ghép đúng khối lệnh Scratch, chạy thử, sửa lỗi.",
      "Năng lực AI 8.D1.2: nhận biết AI cũng xử lý thông tin và ra quyết định dựa trên điều kiện; nếu nhờ AI gợi ý thì phải tự chạy thử, kiểm chứng.",
    ],
    qualities: ["Chăm chỉ, kiên trì chạy thử và sửa lỗi; trung thực, tự xây dựng chương trình; hợp tác, hỗ trợ bạn khi thực hành."],
  },
  coreKnowledge: [
    "Ba cấu trúc điều khiển cơ bản: tuần tự, rẽ nhánh, lặp.",
    "Cấu trúc tuần tự được thể hiện bằng cách lắp ghép các khối lệnh theo trình tự của các hoạt động, từ trên xuống dưới.",
    "Cấu trúc rẽ nhánh có hai dạng: dạng khuyết (nếu … thì) và dạng đầy đủ (nếu … thì … nếu không thì).",
    "Cấu trúc lặp có ba dạng: lặp với số lần định trước, lặp vô hạn và lặp có điều kiện kết thúc (lặp lại cho đến khi).",
    "Trò chơi Đoán số kết hợp cả ba cấu trúc: tuần tự (các bước), rẽ nhánh (so sánh để thông báo), lặp (đoán lại cho đến khi đúng).",
  ],
  keywords: ["Tuần tự", "Rẽ nhánh (khuyết / đầy đủ)", "Lặp (định trước / vô hạn / có điều kiện)"],
  settings: { basePoints: 100, useTimer: false, defaultTime: 60, sound: true, streakEnabled: true },

  activities: [
    /* =========================== TIẾT 1 =========================== */
    /* ===================== HĐ1: MỞ ĐẦU (5 phút) ===================== */
    {
      id: "mo-dau", name: "Mở đầu — Trò chơi “Nhanh mắt, nhanh tay” 🔎", type: "knowledge",
      goal: "Nhắc lại ba cấu trúc điều khiển đã học ở lớp 6, 7; tạo hứng thú vào bài.",
      time: 300,
      task: "8 nhóm, tối đa 3 phút: tìm trong bảng chữ các từ khoá trả lời 3 câu hỏi. Câu 1: Nêu các cấu trúc điều khiển em đã học ở Tin học lớp 6 và lớp 7. Câu 2: Cấu trúc tuần tự là cấu trúc xác định … các bước được thực hiện. Câu 3: Cấu trúc rẽ nhánh có hai loại là … và … Mỗi từ khoá tìm được, nhóm nhận 1 thẻ biểu dương.",
      sgkImage: "assets/sgk/mo-dau.jpg",
      wordsearch: {
        title: "Nhanh mắt, nhanh tay",
        intro: "Từ khoá viết HOA, không dấu; nằm theo hàng ngang, cột dọc hoặc đường chéo.",
        grid: ["BKOSXGMVQC", "QITUANTUXS", "RMBOCGVIYE", "EKDAYDUOBT", "NSQLMXCIPH", "HOYGAVBKSU", "ACMXIPQOGT", "NBSIOKVMXU", "HGQCVSBIOM", "SXOKHUYETQ"],
        words: [
          { w: "TUANTU", label: "tuần tự", group: "Câu 1" }, { w: "RENHANH", label: "rẽ nhánh", group: "Câu 1" }, { w: "LAP", label: "lặp", group: "Câu 1" },
          { w: "THUTU", label: "thứ tự", group: "Câu 2" },
          { w: "KHUYET", label: "khuyết", group: "Câu 3" }, { w: "DAYDU", label: "đầy đủ", group: "Câu 3" },
        ],
      },
      content: {
        revealLabel: "📌 Giáo viên chốt",
        blocks: [
          { kind: "list", value: [
            "Câu 1: tuần tự, rẽ nhánh, lặp.",
            "Câu 2: thứ tự (cấu trúc tuần tự xác định thứ tự các bước được thực hiện).",
            "Câu 3: dạng khuyết và dạng đầy đủ (Tin học 6 gọi là dạng thiếu và dạng đủ).",
            "Trong Scratch, các cấu trúc này được thể hiện bằng những khối lệnh nào? Cùng khám phá qua trò chơi Đoán số!",
          ] },
        ],
      },
      questions: [
        { question: "Câu 1. Những cấu trúc điều khiển nào em đã học ở Tin học lớp 6 và lớp 7? (Chọn tất cả ý đúng)", type: "multiple-select",
          options: ["Cấu trúc tuần tự", "Cấu trúc bảng", "Cấu trúc rẽ nhánh", "Cấu trúc lặp"],
          answer: [0, 2, 3], explanation: "Ba cấu trúc điều khiển cơ bản là tuần tự, rẽ nhánh và lặp.", level: "nhan-biet", activity: "mo-dau" },
        { question: "Câu 2. Cấu trúc tuần tự là cấu trúc xác định … các bước được thực hiện.", type: "multiple-choice",
          options: ["số lần", "thứ tự", "điều kiện", "kết quả"],
          answer: 1, explanation: "Cấu trúc tuần tự xác định thứ tự các bước được thực hiện.", level: "nhan-biet", activity: "mo-dau" },
        { question: "Câu 3. Cấu trúc rẽ nhánh có hai dạng là:", type: "multiple-choice",
          options: ["dạng ngắn và dạng dài", "dạng đơn và dạng kép", "dạng trong và dạng ngoài", "dạng khuyết và dạng đầy đủ"],
          answer: 3, explanation: "Cấu trúc rẽ nhánh có hai dạng: dạng khuyết và dạng đầy đủ (Tin học 6 gọi là dạng thiếu và dạng đủ).", level: "nhan-biet", activity: "mo-dau" },
      ],
    },

    /* ===================== HĐ2.1: CẤU TRÚC ĐIỀU KHIỂN CƠ BẢN (30 phút) ===================== */
    {
      id: "hd1-doan-so", name: "1. Hoạt động 1: Trò chơi Đoán số 🎲", type: "knowledge",
      goal: "Chơi thử trò chơi Đoán số, quan sát kịch bản để mô tả thành thuật toán.",
      time: 300,
      task: "Nhóm: Máy tính đã lấy ngẫu nhiên một số bí mật từ 1 đến 100. Em được đoán nhiều lần cho đến khi đúng; mỗi lần đoán sai, máy cho biết số em đoán nhỏ hơn hay lớn hơn số bí mật. Hãy chơi thử rồi mô tả kịch bản của trò chơi dưới dạng một thuật toán.",
      sgkImage: "assets/sgk/hoat-dong-1.jpg",
      scratch: {
        title: "Chơi thử: Đoán số bí mật",
        intro: "Bấm 🏁, nhập số em đoán vào ô ở dưới sân khấu rồi nhấn Enter. Cố gắng đoán đúng với ít lần nhất!",
        play: true, answer: "trả lời", hide: ["số bí mật"], count: "Số lần đoán",
        script: DOAN_SO,
      },
      questions: [
        { question: "Mỗi lần em đoán sai, máy tính làm gì?", type: "multiple-choice",
          options: ["Kết thúc trò chơi", "Cho biết số em đoán nhỏ hơn hay lớn hơn số bí mật, rồi hỏi lại", "Đổi sang số bí mật khác", "Cho biết luôn số bí mật"],
          answer: 1, explanation: "Máy so sánh số em đoán với số bí mật, thông báo Quá thấp / Quá cao và hỏi lại.", level: "nhan-biet", activity: "hd1-doan-so" },
        { question: "Chiến lược nào giúp đoán đúng nhanh nhất?", type: "multiple-choice",
          options: ["Đoán lần lượt 1, 2, 3, …", "Luôn đoán 100", "Đoán số ở giữa khoảng còn lại, rồi thu hẹp một nửa sau mỗi lần", "Đoán ngẫu nhiên"],
          answer: 2, explanation: "Đoán số ở giữa khoảng (VD 50, rồi 25 hoặc 75…) loại được một nửa số khả năng sau mỗi lần — không quá 7 lần là đoán đúng. (Mở rộng)", level: "van-dung", activity: "hd1-doan-so" },
      ],
    },
    {
      id: "sap-xep-thuat-toan", name: "Nhiệm vụ 1: Sắp xếp thuật toán Hình 14.1a 🧩", type: "ordering",
      goal: "Mô tả thuật toán đọc và hiển thị dữ liệu bằng cấu trúc tuần tự (liệt kê các bước).",
      time: 180,
      task: "Nhóm: Sắp xếp các bước của thuật toán đọc và hiển thị dữ liệu (Hình 14.1a) theo đúng thứ tự rồi bấm Kiểm tra.",
      sgkImage: "assets/sgk/hinh-14-1.jpg",
      steps: [
        "Bắt đầu.",
        "Gán cho số bí mật một giá trị ngẫu nhiên trong khoảng từ 1 đến 100.",
        "Hỏi và nhận giá trị từ bàn phím, lưu vào biến trả lời.",
        "Hiển thị số bí mật trong 2 giây.",
        "Hiển thị trả lời trong 2 giây.",
        "Kết thúc.",
      ],
      explanation: "Hình 14.1a: Bắt đầu → gán số bí mật ngẫu nhiên → hỏi, lưu vào trả lời → hiển thị số bí mật → hiển thị trả lời → Kết thúc. Các bước thực hiện lần lượt từ trên xuống dưới — cấu trúc tuần tự.",
    },
    {
      id: "tuan-tu", name: "a) Cấu trúc tuần tự ⬇️", type: "knowledge",
      goal: "Biết hai biến của trò chơi; thể hiện cấu trúc tuần tự bằng cách lắp ghép khối lệnh từ trên xuống dưới (Hình 14.1b).",
      time: 420,
      task: "Nhóm (3 phút) — Nhiệm vụ 2: đọc SGK tr.80–81 và trả lời: Câu 1. Trò chơi cần sử dụng các biến số nào? Câu 2. Giá trị khởi đầu các biến là bao nhiêu? Câu 3. Thực hành tạo biến và chương trình như Hình 14.1b (chạy thử bên dưới). Câu 4. Trong ngôn ngữ lập trình trực quan, cấu trúc tuần tự được thể hiện như thế nào?",
      sgkImage: "assets/sgk/tuan-tu.jpg",
      scratch: {
        title: "Chạy thử chương trình Hình 14.1b",
        intro: "Nhập một số bất kì khi mèo hỏi. Quan sát: các khối lệnh sáng lần lượt từ trên xuống dưới, mỗi khối chạy đúng một lần.",
        answer: "trả lời", flow: true,
        script: [
          { op: "flag" },
          { op: "set", var: "số bí mật", random: [1, 100] },
          { op: "ask", text: "Hãy cho biết bạn đoán số nào." },
          { op: "say", v: "số bí mật", secs: 2, ft: "Hiển thị số bí mật trong 2 giây" },
          { op: "say", v: "trả lời", html: SEN("trả lời"), secs: 2, ft: "Hiển thị trả lời trong 2 giây" },
          { op: "stop" },
        ],
      },
      content: {
        revealLabel: "📖 Cấu trúc tuần tự (SGK tr.80–81)",
        blocks: [
          { kind: "text", value: "Trò chơi chỉ cần hai biến số: số thứ nhất do máy tính lấy ngẫu nhiên, đặt tên là số bí mật; số thứ hai do người chơi đoán và nhập vào máy tính là trả lời (biến này có sẵn trong Scratch, nhóm Cảm biến)." },
          { kind: "html", value: ROW([IMG("assets/sgk/hinh-14-1.jpg", "Hình 14.1. Thuật toán sử dụng cấu trúc tuần tự", 560)]) },
          { kind: "text", value: "Trong ngôn ngữ lập trình trực quan, cấu trúc tuần tự được thể hiện bằng cách lắp ghép các khối lệnh thành phần theo đúng trình tự của các hoạt động, từ trên xuống dưới, như Hình 14.1b." },
        ],
      },
      remember: ["Cấu trúc tuần tự được thể hiện bằng cách lắp ghép các khối lệnh theo trình tự của các hoạt động, từ trên xuống dưới."],
      questions: [
        { question: "Câu 1. Trò chơi Đoán số cần sử dụng những biến nào?", type: "multiple-choice",
          options: ["số bí mật và trả lời", "chỉ số bí mật", "số lần đoán và điểm", "a và b"],
          answer: 0, explanation: "Hai biến: số bí mật (máy lấy ngẫu nhiên) và trả lời (người chơi nhập vào).", level: "nhan-biet", activity: "tuan-tu" },
        { question: "Câu 2. Giá trị khởi đầu của biến số bí mật là gì?", type: "multiple-choice",
          options: ["Luôn bằng 0", "Luôn bằng 100", "Số người chơi nhập vào", "Một giá trị ngẫu nhiên trong khoảng từ 1 đến 100"],
          answer: 3, explanation: "Lệnh đặt số bí mật thành (lấy ngẫu nhiên từ 1 đến 100).", level: "nhan-biet", activity: "tuan-tu" },
        { question: "Câu 3. Biến trả lời có sẵn trong nhóm lệnh nào của Scratch?", type: "multiple-choice",
          options: ["Các biến số", "Cảm biến", "Hiển thị", "Điều khiển"],
          answer: 1, explanation: "Lệnh hỏi … và đợi và biến trả lời thuộc nhóm Cảm biến.", level: "nhan-biet", activity: "tuan-tu" },
        { question: "Câu 4. Trong ngôn ngữ lập trình trực quan, cấu trúc tuần tự được thể hiện như thế nào?", type: "multiple-choice",
          options: ["Đặt các khối lệnh vào trong khối lặp", "Dùng khối lệnh nếu … thì", "Lắp ghép các khối lệnh theo trình tự của các hoạt động, từ trên xuống dưới", "Xếp các khối lệnh rời nhau trên vùng kịch bản"],
          answer: 2, explanation: "Các khối lệnh được lắp ghép theo đúng trình tự, từ trên xuống dưới.", level: "thong-hieu", activity: "tuan-tu" },
      ],
    },
    {
      id: "re-nhanh", name: "b) Cấu trúc rẽ nhánh 🔀", type: "knowledge",
      goal: "Mô tả thuật toán so sánh hai giá trị bằng cấu trúc rẽ nhánh; phân biệt rẽ nhánh dạng khuyết và dạng đầy đủ.",
      time: 480,
      task: "Nhóm (3 phút) — Nhiệm vụ 3 (Phiếu bài tập số 3): Câu 1. Câu trả lời của người chơi được chia làm bao nhiêu trường hợp, hoạt động tiếp theo sau từng trường hợp là gì? Câu 2. Cấu trúc rẽ nhánh trong ngôn ngữ lập trình trực quan chia làm mấy loại, đó là những loại nào? Chạy thử đoạn chương trình Hình 14.3c bên dưới với số nhỏ, số lớn.",
      sgkImage: "assets/sgk/re-nhanh.jpg",
      scratch: {
        title: "Chạy thử đoạn chương trình so sánh (Hình 14.3c)",
        intro: "Mỗi lần chạy chỉ đoán một lần. Xem sơ đồ khối: chương trình rẽ vào nhánh Đúng hay Sai ở mỗi lần kiểm tra?",
        answer: "trả lời", flow: true, hide: ["số bí mật"],
        script: [
          { op: "flag" },
          { op: "set", var: "số bí mật", random: [1, 100] },
          { op: "ask", text: "Hãy cho biết bạn đoán số nào." },
          { op: "if", cond: "trả lời == số bí mật", show: "trả lời = số bí mật", boolHTML: SEN("trả lời") + " = " + V("số bí mật"), ft: "trả lời = số bí mật?",
            then: [{ op: "say", text: "HOAN HÔ!", secs: 2 }],
            else: [{ op: "if", cond: "trả lời < số bí mật", show: "trả lời < số bí mật", boolHTML: SEN("trả lời") + " &lt; " + V("số bí mật"), ft: "trả lời < số bí mật?",
              then: [{ op: "say", text: "Quá thấp!", secs: 2 }], else: [{ op: "say", text: "Quá cao!", secs: 2 }] }] },
        ],
      },
      content: {
        revealLabel: "📖 Cấu trúc rẽ nhánh (SGK tr.81)",
        blocks: [
          { kind: "list", value: [
            "Nếu trả lời bằng số bí mật thì thông báo: “HOAN HÔ!”.",
            "Nếu trả lời nhỏ hơn số bí mật thì thông báo: “Quá thấp”.",
            "Nếu trả lời lớn hơn số bí mật thì thông báo: “Quá cao”.",
          ] },
          { kind: "text", value: "Ba trường hợp “bằng”, “nhỏ hơn” và “lớn hơn” loại trừ lẫn nhau nên không cần kiểm tra cả ba trường hợp mà chỉ cần kiểm tra hai lần." },
          { kind: "html", value: IMG("assets/sgk/hinh-14-2.jpg", "Hình 14.2. Thuật toán sử dụng cấu trúc rẽ nhánh", 620) },
          { kind: "text", value: "Trong ngôn ngữ lập trình trực quan, cấu trúc rẽ nhánh được thể hiện bằng khối lệnh chứa một điều kiện hay một biểu thức lôgic. Tuỳ điều kiện nhận giá trị đúng hay sai, chương trình sẽ định hướng đến khối lệnh tiếp theo để máy tính thực hiện." },
          { kind: "html", value: ROW([FIG(H143A, "a) Rẽ nhánh khuyết"), FIG(H143B, "b) Rẽ nhánh đầy đủ"), FIG(H143C, "c) So sánh và trả lời")]) },
        ],
      },
      remember: ["Cấu trúc rẽ nhánh có hai dạng: dạng khuyết (nếu … thì) và dạng đầy đủ (nếu … thì … nếu không thì)."],
      questions: [
        { question: "Câu 1. Câu trả lời của người chơi được chia làm bao nhiêu trường hợp?", type: "multiple-choice",
          options: ["2 trường hợp", "4 trường hợp", "3 trường hợp: bằng, nhỏ hơn, lớn hơn số bí mật", "1 trường hợp"],
          answer: 2, explanation: "Bằng → “HOAN HÔ!”; nhỏ hơn → “Quá thấp”; lớn hơn → “Quá cao”.", level: "nhan-biet", activity: "re-nhanh" },
        { question: "Vì sao chương trình chỉ cần kiểm tra hai lần mà vẫn phân biệt đủ ba trường hợp?", type: "multiple-choice",
          options: ["Vì ba trường hợp loại trừ lẫn nhau: không bằng, không nhỏ hơn thì chắc chắn lớn hơn", "Vì máy tính chỉ so sánh được hai lần", "Vì trường hợp bằng không bao giờ xảy ra", "Vì Scratch không có phép so sánh lớn hơn"],
          answer: 0, explanation: "Đã loại “bằng” và “nhỏ hơn” thì chỉ còn “lớn hơn” — không cần kiểm tra lần thứ ba.", level: "thong-hieu", activity: "re-nhanh" },
        { question: "Câu 2. Khối lệnh “nếu … thì … nếu không thì …” là cấu trúc rẽ nhánh dạng nào?", type: "multiple-choice",
          options: ["Dạng khuyết", "Dạng đầy đủ", "Cấu trúc lặp", "Cấu trúc tuần tự"],
          answer: 1, explanation: "Có cả nhánh “thì” và nhánh “nếu không thì” → rẽ nhánh dạng đầy đủ (Hình 14.3b). Chỉ có “nếu … thì” là dạng khuyết (Hình 14.3a).", level: "thong-hieu", activity: "re-nhanh" },
        { question: "Người chơi nhập 30, số bí mật là 45. Đoạn chương trình Hình 14.3c thông báo gì?", type: "multiple-choice", html: H143C,
          options: ["HOAN HÔ!", "Quá cao!", "Không thông báo gì", "Quá thấp!"],
          answer: 3, explanation: "30 = 45 sai → sang nhánh nếu không thì; 30 < 45 đúng → nói “Quá thấp!”.", level: "van-dung", activity: "re-nhanh" },
      ],
    },
    {
      id: "lap", name: "c) Cấu trúc lặp 🔁", type: "knowledge",
      goal: "Xác định hoạt động lặp và điều kiện kết thúc trong trò chơi; nhận biết ba khối lệnh lặp của Scratch.",
      time: 480,
      task: "Nhóm (3 phút) — Nhiệm vụ 4 (Phiếu bài tập số 4): Câu 1. Trong trò chơi Đoán số, hoạt động được lặp đi lặp lại là gì? Điều kiện kết thúc hoạt động lặp là gì? Câu 2. Cấu trúc lặp trong ngôn ngữ lập trình trực quan được thể hiện như thế nào? Chạy thử ba dạng lặp bên dưới.",
      sgkImage: "assets/sgk/lap.jpg",
      scratch: [
        { tab: "🔢 Lặp 10 lần", title: "Lặp với số lần định trước (Hình 14.4b)", intro: "Mèo đi 10 bước nhỏ. Biến số lần tăng sau mỗi vòng — đủ 10 lần thì ra khỏi vòng lặp.", flow: true,
          script: [{ op: "flag" }, { op: "set", var: "số lần", expr: "0", show: "0" }, { op: "repeat", times: 10, body: [{ op: "set", var: "số lần", expr: "số lần + 1", show: "số lần + 1" }, { op: "move", steps: 18 }] }, { op: "say", text: "Xong 10 lần!", secs: 2 }] },
        { tab: "♾️ Liên tục", title: "Lặp vô hạn (Hình 14.4c)", intro: "Mèo chạy qua lại mãi mãi — chỉ dừng khi em bấm ⏹ Dừng.", flow: true,
          script: [{ op: "flag" }, { op: "rotate" }, { op: "forever", body: [{ op: "move", steps: 30 }, { op: "bounce" }] }] },
        { tab: "🎯 Lặp cho đến khi", title: "Lặp có điều kiện kết thúc (Hình 14.4d)", intro: "Mèo nghĩ một số từ 1 đến 10. Vòng lặp chỉ kết thúc khi điều kiện trả lời = số bí mật đúng.", flow: true, answer: "trả lời", hide: ["số bí mật"], count: "Số lần đoán",
          script: [{ op: "flag" }, { op: "set", var: "số bí mật", random: [1, 10] }, { op: "ask", text: "Tớ nghĩ một số từ 1 đến 10. Bạn đoán số nào?" },
            { op: "until", cond: "trả lời == số bí mật", show: "trả lời = số bí mật", boolHTML: SEN("trả lời") + " = " + V("số bí mật"), ft: "trả lời = số bí mật?", body: [{ op: "ask", text: "Chưa đúng! Đoán lại nhé:", ft: "trả lời ← Máy hỏi lại" }] },
            { op: "say", text: "HOAN HÔ!", secs: 2 }] },
      ],
      content: {
        revealLabel: "📖 Cấu trúc lặp (SGK tr.82)",
        blocks: [
          { kind: "text", value: "Trong trò chơi, việc đoán số được lặp lại cho đến khi đoán đúng số bí mật. Việc lặp lại chỉ thực hiện khi người chơi đoán sai; người chơi đoán đúng là điều kiện kết thúc vòng lặp." },
          { kind: "html", value: IMG("assets/sgk/hinh-14-4.jpg", "Hình 14.4. Cấu trúc lặp", 640) },
          { kind: "html", value: ROW([FIG(H144B, "b) Lặp 10 lần"), FIG(H144C, "c) Lặp vô hạn"), FIG(H144D, "d) Lặp cho đến khi trả lời = số bí mật")]) },
        ],
      },
      remember: [
        "Cấu trúc tuần tự được thể hiện bằng cách lắp ghép các khối lệnh theo trình tự của các hoạt động, từ trên xuống dưới.",
        "Cấu trúc rẽ nhánh có hai dạng: dạng khuyết và dạng đầy đủ.",
        "Cấu trúc lặp có ba dạng: lặp với số lần định trước, lặp vô hạn và lặp có điều kiện kết thúc.",
      ],
      questions: [
        { question: "Câu 1. Trong trò chơi Đoán số, hoạt động nào được lặp lại và khi nào vòng lặp kết thúc?", type: "multiple-choice",
          options: ["Lặp lại việc lấy số bí mật; kết thúc sau 10 lần", "Lặp lại việc đoán số (so sánh, máy hỏi lại); kết thúc khi đoán đúng số bí mật", "Lặp lại việc nói HOAN HÔ!; không bao giờ kết thúc", "Không có hoạt động lặp"],
          answer: 1, explanation: "Hoạt động lặp: đoán số (so sánh, nhận xét, máy hỏi lại). Điều kiện kết thúc: trả lời = số bí mật.", level: "thong-hieu", activity: "lap" },
        { question: "Câu 2. Scratch có mấy khối lệnh lặp, đó là những khối nào?", type: "multiple-choice",
          options: ["Một khối: lặp lại 10", "Hai khối: lặp lại, liên tục", "Bốn khối: lặp lại, liên tục, nếu … thì, đợi", "Ba khối: lặp với số lần định trước, lặp vô hạn (liên tục), lặp có điều kiện kết thúc (lặp lại cho đến khi)"],
          answer: 3, explanation: "Hình 14.4b, c, d: lặp lại 10 · liên tục · lặp lại cho đến khi.", level: "nhan-biet", activity: "lap" },
        { question: "Câu hỏi SGK tr.82: Cấu trúc lặp nào sau đây KHÔNG được cho trước trong các nhóm lệnh của Scratch?", type: "multiple-choice",
          options: ["Lặp một khối lệnh với số lần định trước.", "Lặp một khối lệnh vô hạn lần.", "Lặp với điều kiện được kiểm tra trước khi thực hiện khối lệnh.", "Lặp với điều kiện được kiểm tra sau khi thực hiện khối lệnh."],
          answer: 3, explanation: "Scratch có lặp lại n (A), liên tục (B), lặp lại cho đến khi — kiểm tra điều kiện trước khi thực hiện khối lệnh (C). Không có khối lặp kiểm tra điều kiện sau (D).", level: "van-dung-cao", activity: "lap" },
      ],
    },
    {
      id: "phan-loai", name: "Trò chơi: Tình huống này dùng cấu trúc nào? 🗂️", type: "dragdrop",
      goal: "Liên hệ ba cấu trúc điều khiển với tình huống quen thuộc trong học tập và đời sống.",
      time: 180,
      task: "Kéo mỗi tình huống vào cột cấu trúc điều khiển thể hiện rõ nhất trong tình huống đó rồi bấm Kiểm tra.",
      groups: ["Tuần tự ⬇️", "Rẽ nhánh 🔀", "Lặp 🔁"],
      items: [
        { text: "Buổi sáng: thức dậy → đánh răng → rửa mặt → ăn sáng", group: 0 },
        { text: "Nhập hai số, tính tổng rồi hiển thị kết quả", group: 0 },
        { text: "Pha mì: bóc gói → cho mì vào bát → đổ nước sôi → đậy nắp", group: 0 },
        { text: "Nếu trời mưa thì mang áo mưa", group: 1 },
        { text: "Nếu điểm từ 5 trở lên thì Đạt, nếu không thì Chưa đạt", group: 1 },
        { text: "Gặp đèn đỏ thì dừng lại", group: 1 },
        { text: "Chạy 5 vòng quanh sân trường", group: 2 },
        { text: "Đoán số cho đến khi đúng số bí mật", group: 2 },
        { text: "Đèn trang trí nhấp nháy liên tục", group: 2 },
      ],
      explanation: "Tuần tự: các bước làm lần lượt. Rẽ nhánh: chọn việc làm tuỳ điều kiện đúng/sai. Lặp: một việc được làm lại nhiều lần (định trước, vô hạn hoặc đến khi điều kiện đúng).",
    },

    /* =========================== TIẾT 2 =========================== */
    /* ===================== HĐ2.2: THỰC HÀNH (45 phút) ===================== */
    {
      id: "thuc-hanh", name: "2. Thực hành: Xây dựng trò chơi Đoán số 🎮", type: "knowledge",
      goal: "Dùng cấu trúc tuần tự, rẽ nhánh và lặp để lập trình trò chơi Đoán số hoàn chỉnh (Hình 14.7).",
      time: 1800,
      task: "2 HS/máy: Khởi động Scratch, lập chương trình trò chơi Đoán số theo 5 bước (SGK tr.83–84). Trước khi làm, chạy thử chương trình mẫu bên dưới, đối sánh sơ đồ khối với chương trình. Làm xong, các nhóm chấm chéo theo phân công của thầy/cô.",
      sgkImage: "assets/sgk/thuc-hanh-1.jpg",
      scratch: {
        title: "Chương trình hoàn chỉnh (Hình 14.7)",
        intro: "Bấm 🏁 rồi đoán. Ô sáng trên sơ đồ khối cho biết máy đang ở bước nào. Bật 👣 Từng bước để xem chậm từng lệnh.",
        answer: "trả lời", flow: true, hide: ["số bí mật"], count: "Số lần đoán",
        script: DOAN_SO,
      },
      content: {
        revealLabel: "🔢 Hướng dẫn 5 bước (SGK tr.83–84)",
        blocks: [
          { kind: "list", value: [
            "Bước 1. Tạo các biến: tạo biến số bí mật (tạo mới hoặc đổi tên biến có sẵn “my variable”); biến trả lời đã có sẵn trong nhóm lệnh Cảm biến.",
            "Bước 2. Tạo khung chương trình gồm 6 khối lệnh lắp ghép theo cấu trúc tuần tự, từ trên xuống dưới (Hình 14.5).",
            "Bước 3. Tạo các biểu thức: “lấy ngẫu nhiên từ 1 đến 100”; phép so sánh “=” với các biến để có biểu thức lôgic “trả lời = số bí mật”; lắp vào khung chương trình (Hình 14.6a).",
            "Bước 4. Tạo khối lệnh rẽ nhánh với điều kiện “trả lời < số bí mật”; chọn từ nhóm Cảm biến các khối lệnh “hỏi” và lắp vào vị trí phù hợp (Hình 14.6b).",
            "Bước 5. Lắp khối lệnh rẽ nhánh vào khung chương trình để được chương trình hoàn chỉnh; đối sánh với sơ đồ thuật toán ở Hình 14.7.",
          ] },
          { kind: "html", value: IMG("assets/sgk/thuc-hanh-1.jpg", "Bước 1, 2 — Hình 14.5. Khung chương trình", 620) },
          { kind: "html", value: IMG("assets/sgk/thuc-hanh-2.jpg", "Bước 3 — Hình 14.6. Tạo các biểu thức trong khối lệnh", 620) },
          { kind: "html", value: IMG("assets/sgk/thuc-hanh-3.jpg", "Bước 4, 5 — Hình 14.7. Chương trình hoàn chỉnh", 620) },
          { kind: "html", value: H147 },
        ],
      },
      questions: [
        { question: "Bước 2: khung chương trình (Hình 14.5) được lắp theo cấu trúc nào?", type: "multiple-choice",
          options: ["Cấu trúc tuần tự, từ trên xuống dưới", "Cấu trúc rẽ nhánh", "Cấu trúc lặp vô hạn", "Không theo cấu trúc nào"],
          answer: 0, explanation: "6 khối lệnh lắp ghép với nhau theo cấu trúc tuần tự, từ trên xuống dưới.", level: "nhan-biet", activity: "thuc-hanh" },
        { question: "Khối “lặp lại cho đến khi (trả lời = số bí mật)” dừng lặp khi nào?", type: "multiple-choice",
          options: ["Sau 10 lần đoán", "Khi người chơi đoán sai", "Khi người chơi đoán đúng số bí mật", "Không bao giờ dừng"],
          answer: 2, explanation: "Điều kiện trả lời = số bí mật đúng thì ra khỏi vòng lặp, chương trình nói “HOAN HÔ!”.", level: "thong-hieu", activity: "thuc-hanh" },
        { question: "Trong chương trình hoàn chỉnh, khối rẽ nhánh (nếu trả lời < số bí mật thì … nếu không thì …) được đặt ở đâu?", type: "multiple-choice",
          options: ["Trước lệnh đặt số bí mật", "Sau lệnh dừng lại tất cả", "Ngay dưới lệnh khi bấm vào 🏁", "Bên trong khối lặp lại cho đến khi"],
          answer: 3, explanation: "Mỗi lần đoán sai, máy so sánh và hỏi lại nên khối rẽ nhánh nằm bên trong vòng lặp.", level: "thong-hieu", activity: "thuc-hanh" },
        { question: "Số bí mật là 64. Người chơi lần lượt nhập 50, 75, 64. Máy lần lượt phản hồi gì?", type: "multiple-choice",
          options: ["Quá cao!, Quá thấp!, HOAN HÔ!", "Quá thấp!, Quá cao!, HOAN HÔ!", "Quá thấp!, Quá thấp!, HOAN HÔ!", "HOAN HÔ!, Quá cao!, Quá thấp!"],
          answer: 1, explanation: "50 < 64 → Quá thấp!; 75 > 64 → Quá cao!; 64 = 64 → thoát vòng lặp, HOAN HÔ!", level: "van-dung", activity: "thuc-hanh" },
      ],
    },
    {
      id: "lap-chuong-trinh", name: "Trò chơi: Lắp chương trình Đoán số 🧱", type: "ordering",
      goal: "Ghi nhớ cấu trúc chương trình hoàn chỉnh: tuần tự → lặp → rẽ nhánh bên trong vòng lặp.",
      time: 240,
      task: "Sắp xếp các khối lệnh thành chương trình Đoán số hoàn chỉnh (Hình 14.7). Khối thụt vào nằm bên trong khối phía trên nó. Bấm Kiểm tra.",
      steps: [
        "khi bấm vào 🏁",
        "đặt số bí mật thành (lấy ngẫu nhiên từ 1 đến 100)",
        "hỏi (Hãy cho biết bạn đoán số nào.) và đợi",
        "lặp lại cho đến khi ‹trả lời = số bí mật›",
        "nếu ‹trả lời < số bí mật› thì",
        "hỏi (Quá thấp!) và đợi",
        "nếu không thì",
        "hỏi (Quá cao!) và đợi",
        "nói (HOAN HÔ!) trong 2 giây",
        "dừng lại tất cả",
      ],
      blocks: ["event", "variables", "sensing", "control", "control", "sensing", "control", "sensing", "looks", "control"],
      indent: [0, 0, 0, 0, 1, 2, 1, 2, 0, 0],
      explanation: "Lấy số bí mật → hỏi lần đầu → lặp cho đến khi đoán đúng: nếu nhỏ hơn thì hỏi “Quá thấp!”, nếu không thì hỏi “Quá cao!” → nói HOAN HÔ! → dừng lại tất cả.",
    },
    {
      id: "tham-tu", name: "Thám tử sửa lỗi chương trình 🕵️", type: "quiz",
      goal: "Chạy thử, phát hiện và sửa lỗi lôgic đơn giản trong chương trình Đoán số.",
      time: 300,
      task: "Mỗi chương trình dưới đây có đúng một lỗi. Quan sát, đoán hiện tượng khi chạy và chỉ ra cách sửa.",
      questions: [
        { question: "Lỗi 1: Người chơi đoán số nhỏ hơn số bí mật thì chương trình đã nói HOAN HÔ! Cần sửa gì?", type: "multiple-choice", html: BUG1,
          options: ["Đổi “Quá thấp!” thành “Quá cao!”", "Bỏ lệnh dừng lại tất cả", "Sửa điều kiện lặp thành trả lời = số bí mật", "Đổi 100 thành 10"],
          answer: 2, explanation: "Điều kiện kết thúc vòng lặp phải là đoán đúng: trả lời = số bí mật, không phải trả lời < số bí mật.", level: "van-dung", activity: "tham-tu" },
        { question: "Lỗi 2: Số bí mật là 40, đoán 20 thì máy lại báo “Quá cao!”. Lỗi ở đâu?", type: "multiple-choice", html: BUG2,
          options: ["Hai thông báo trong khối rẽ nhánh bị đảo ngược", "Điều kiện lặp sai", "Thiếu lệnh hỏi lần đầu", "Số bí mật không ngẫu nhiên"],
          answer: 0, explanation: "trả lời < số bí mật đúng thì phải hỏi “Quá thấp!”, nhánh nếu không thì mới là “Quá cao!”.", level: "van-dung", activity: "tham-tu" },
        { question: "Lỗi 3: Chơi nhiều lần, lần nào số bí mật cũng giống nhau và không nằm trong khoảng 1 đến 100. Vì sao?", type: "multiple-choice", html: BUG3,
          options: ["Vì thiếu khối rẽ nhánh", "Vì lệnh đặt số bí mật thành 0 chưa lắp biểu thức lấy ngẫu nhiên từ 1 đến 100", "Vì điều kiện lặp sai", "Vì dùng lệnh hỏi thay cho lệnh nói"],
          answer: 1, explanation: "Khung chương trình (Hình 14.5) đặt số bí mật thành 0; Bước 3 phải lắp biểu thức lấy ngẫu nhiên từ 1 đến 100 vào.", level: "thong-hieu", activity: "tham-tu" },
        { question: "Lỗi 4: Đoán sai một lần thì mèo cứ nói “Quá thấp!” (hoặc “Quá cao!”) mãi, không cho đoán lại. Cần sửa gì?", type: "multiple-choice", html: BUG4,
          options: ["Thay lặp lại cho đến khi bằng lặp lại 10", "Bỏ khối rẽ nhánh", "Đổi thứ tự hai lệnh đầu", "Thay lệnh nói … trong 2 giây bằng lệnh hỏi … và đợi để người chơi nhập lại"],
          answer: 3, explanation: "Lệnh nói không nhận câu trả lời mới nên trả lời không đổi, điều kiện lặp không bao giờ đúng → lặp mãi. Phải dùng hỏi … và đợi.", level: "van-dung-cao", activity: "tham-tu" },
      ],
    },

    /* ===================== HĐ3: LUYỆN TẬP (5 phút) ===================== */
    {
      id: "luyen-tap", name: "Luyện tập: Ai nhanh hơn? ⚡ (Bảng 14.1)", type: "matching",
      goal: "Nhận ra cấu trúc lặp với số lần định trước; liên hệ số lần lặp, góc xoay với hình vẽ được.",
      time: 180,
      task: "Cặp đôi, thi ai nhanh hơn: ghép mỗi kết quả với đoạn lệnh vẽ ra kết quả đó trong Bảng 14.1. Làm hết rồi bấm Nộp bài.",
      sgkImage: "assets/sgk/luyen-tap.jpg",
      html: B141,
      pairs: [
        { left: "1) Hình ba cạnh", right: "Đoạn lệnh d" },
        { left: "2) Hình bốn cạnh", right: "Đoạn lệnh a" },
        { left: "3) Hình năm cạnh", right: "Đoạn lệnh b" },
        { left: "4) Hình sáu cạnh", right: "Đoạn lệnh c" },
      ],
      explanation: "Số lần lặp = số cạnh, số lần lặp × góc xoay = 360°: 1-d (3 × 120°), 2-a (4 × 90°), 3-b (5 × 72°), 4-c (6 × 60°).",
    },
    {
      id: "kiem-chung", name: "Kiểm chứng: Bọ rùa vẽ hình Bảng 14.1 🐞", type: "knowledge",
      goal: "Chạy thử để kiểm chứng kết quả ghép đôi.",
      time: 180,
      task: "Sửa số lần lặp và góc xoay trên khối lệnh theo từng đoạn lệnh a, b, c, d rồi bấm 🏁 Chạy để kiểm chứng kết quả em đã ghép.",
      turtle: {
        title: "Kiểm chứng Bảng 14.1",
        intro: "Mỗi đoạn lệnh: di chuyển 100 bước, xoay ↻. Vẽ đủ 4 hình để hoàn thành thử thách.",
        sprite: "bug", start: { x: -50, y: 90, dir: 90 }, goals: [3, 4, 5, 6], flow: true,
        script: [
          { op: "flag" }, { op: "clear" }, { op: "goto", x: -50, y: 90 }, { op: "pendown" },
          { op: "repeat", times: 4, edit: true, body: [{ op: "move", steps: 100 }, { op: "turn", deg: 90, right: true, edit: true }] },
          { op: "penup" },
        ],
      },
      questions: [
        { question: "Muốn vẽ hình tám cạnh đều với cách làm như Bảng 14.1, số lần lặp và góc xoay là bao nhiêu?", type: "multiple-choice",
          options: ["8 lần, 360 độ", "8 lần, 90 độ", "8 lần, 45 độ", "4 lần, 45 độ"],
          answer: 2, explanation: "Lặp 8 lần, mỗi lần xoay 360° : 8 = 45°.", level: "van-dung-cao", activity: "kiem-chung" },
      ],
    },

    /* ===================== HĐ4: VẬN DỤNG (5 phút, hoàn thiện ở nhà) ===================== */
    {
      id: "van-dung-1", name: "Vận dụng 1 (Trạm 1, 3): Giải phương trình ax + b = 0 📐", type: "matching",
      goal: "Ghép các khối lệnh a, b, c, d vào vị trí 1, 2, 3, 4 (Hình 14.8) để được chương trình giải phương trình ax + b = 0.",
      time: 300,
      task: "Trạm 1, 3: Ghép các khối lệnh a, b, c, d vào các vị trí 1, 2, 3, 4 ở Hình 14.8 để được chương trình giải phương trình ax + b = 0 với a, b nhập từ bàn phím. Được dùng máy tính để kiểm tra kết quả.",
      sgkImage: "assets/sgk/van-dung-1.jpg",
      html: IMG("assets/sgk/van-dung-1.jpg", "Hình 14.8. Các khối lệnh", 680),
      pairs: [
        { left: "Vị trí 1", right: "Khối b — hỏi, đặt a và b thành trả lời" },
        { left: "Vị trí 2", right: "Khối d — nếu a = 0 thì … nếu không thì …" },
        { left: "Vị trí 3", right: "Khối c — nếu b = 0 thì vô số nghiệm, nếu không thì vô nghiệm" },
        { left: "Vị trí 4", right: "Khối a — nói nghiệm -b/a" },
      ],
      explanation: "1 - b, 2 - d, 3 - c, 4 - a: nhập a, b → nếu a = 0 thì (nếu b = 0 thì vô số nghiệm, nếu không thì vô nghiệm), nếu không thì nói nghiệm -b/a.",
    },
    {
      id: "van-dung-1-chay", name: "Chạy thử: Chương trình giải phương trình ax + b = 0 ▶️", type: "knowledge",
      goal: "Kiểm tra chương trình với các bộ giá trị a, b khác nhau; quan sát chương trình rẽ vào nhánh nào.",
      time: 240,
      task: "Chạy chương trình với các bộ (a, b): (2, 4), (0, 0), (0, 5). Quan sát khối lệnh và sơ đồ khối sáng lên ở nhánh nào.",
      scratch: {
        title: "Giải phương trình ax + b = 0",
        intro: "Nhập hệ số a rồi hệ số b khi mèo hỏi. Chương trình ghép chữ để nói nghiệm dưới dạng -b/a (giống SGK).",
        flow: true,
        script: [
          { op: "flag" },
          { op: "ask", text: "Hệ số a:" }, { op: "set", var: "a", answer: true },
          { op: "ask", text: "Hệ số b:" }, { op: "set", var: "b", answer: true },
          { op: "if", cond: "a == 0", show: "a = 0", boolHTML: V("a") + " = " + N(0), ft: "a = 0?",
            then: [{ op: "if", cond: "b == 0", show: "b = 0", boolHTML: V("b") + " = " + N(0), ft: "b = 0?",
              then: [{ op: "say", text: "Phương trình có vô số nghiệm!", secs: 5, ft: "“Vô số nghiệm”" }],
              else: [{ op: "say", text: "Phương trình vô nghiệm!", secs: 5, ft: "“Vô nghiệm”" }] }],
            else: [{ op: "say", join: ["Nghiệm của phương trình là: -", { v: "b" }, "/", { v: "a" }], secs: 5,
              html: OP("kết hợp " + OP("kết hợp " + T("Nghiệm của phương trình là: -") + " " + V("b")) + " " + OP("kết hợp " + T("/") + " " + V("a"))), ft: "Hiển thị nghiệm -b/a" }] },
          { op: "stop" },
        ],
      },
      questions: [
        { question: "Nhập a = 0, b = 0. Chương trình nói gì?", type: "multiple-choice",
          options: ["Phương trình vô nghiệm!", "Nghiệm của phương trình là: -0/0", "Phương trình có vô số nghiệm!", "Không nói gì"],
          answer: 2, explanation: "a = 0 đúng → vào nhánh thì; b = 0 đúng → “Phương trình có vô số nghiệm!”.", level: "van-dung", activity: "van-dung-1-chay" },
        { question: "Nhập a = 2, b = 4. Chương trình đi vào nhánh nào và nói gì?", type: "multiple-choice",
          options: ["Nhánh nếu không thì của khối a = 0; nói “Nghiệm của phương trình là: -4/2” (tức x = -2)", "Nhánh thì của khối a = 0; nói “Phương trình vô nghiệm!”", "Không vào nhánh nào", "Nhánh thì của khối b = 0"],
          answer: 0, explanation: "a = 0 sai → nhánh nếu không thì → nói nghiệm -b/a = -4/2 = -2.", level: "van-dung", activity: "van-dung-1-chay" },
      ],
    },
    {
      id: "van-dung-2", name: "Vận dụng 2 (Trạm 2, 4): Chương trình tìm ước chung lớn nhất 🔢", type: "ordering",
      goal: "Ghép các khối lệnh Scratch (Hình 14.10) thành chương trình tìm UCLN theo sơ đồ khối Hình 14.9.",
      time: 300,
      task: "Trạm 2, 4: Dựa vào sơ đồ khối Hình 14.9, sắp xếp các khối lệnh của Hình 14.10 thành chương trình tính ước chung lớn nhất của hai số nguyên không âm. Khối thụt vào nằm bên trong khối phía trên nó. Bấm Kiểm tra.",
      sgkImage: "assets/sgk/van-dung-2.jpg",
      html: IMG("assets/sgk/van-dung-2.jpg", "Hình 14.9. Sơ đồ khối · Hình 14.10. Các khối lệnh", 680),
      steps: [
        "7) khi bấm vào 🏁",
        "5) hỏi (a =) và đợi · đặt a thành (trả lời)",
        "6) hỏi (b =) và đợi · đặt b thành (trả lời)",
        "3) lặp lại cho đến khi ‹(a * b) = 0›",
        "9) nếu ‹a > b› thì",
        "1) đặt a thành (a chia lấy dư b)",
        "9) … nếu không thì",
        "2) đặt b thành (b chia lấy dư a)",
        "4) nói (a + b) trong 5 giây",
        "8) dừng lại tất cả",
      ],
      blocks: ["event", "sensing", "sensing", "control", "control", "variables", "control", "variables", "looks", "control"],
      indent: [0, 0, 0, 0, 1, 2, 1, 2, 0, 0],
      explanation: "7 → 5 → 6 → 3 (lặp đến khi a * b = 0) chứa 9 (nếu a > b thì 1, nếu không thì 2) → 4 (nói a + b) → 8. Khi một số bằng 0, số còn lại chính là UCLN nên a + b là kết quả.",
    },
    {
      id: "van-dung-2-chay", name: "Chạy từng bước: Tìm UCLN 👣", type: "knowledge",
      goal: "Theo dõi giá trị a, b sau mỗi vòng lặp để hiểu thuật toán tìm UCLN.",
      time: 240,
      task: "Bật 👣 Từng bước, chạy với a = 12, b = 18 rồi a = 20, b = 8. Sau mỗi lần kiểm tra điều kiện, ghi lại giá trị a, b trong bảng.",
      scratch: {
        title: "Tìm ước chung lớn nhất của hai số",
        intro: "Bảng bên dưới tự ghi giá trị a, b mỗi lần kiểm tra điều kiện a * b = 0.",
        flow: true, step: true, trace: ["a", "b"],
        script: [
          { op: "flag" },
          { op: "ask", text: "a =" }, { op: "set", var: "a", answer: true, ft: "Nhập a" },
          { op: "ask", text: "b =" }, { op: "set", var: "b", answer: true, ft: "Nhập b" },
          { op: "until", cond: "a * b == 0", show: "a * b = 0", boolHTML: OP(V("a") + " * " + V("b")) + " = " + N(0), ft: "a * b = 0?", body: [
            { op: "if", cond: "a > b", show: "a > b", boolHTML: V("a") + " &gt; " + V("b"), ft: "a > b?",
              then: [{ op: "set", var: "a", expr: "a % b", show: "a chia lấy dư b", ft: "a ← số dư (a : b)" }],
              else: [{ op: "set", var: "b", expr: "b % a", show: "b chia lấy dư a", ft: "b ← số dư (b : a)" }] },
          ] },
          { op: "say", join: [{ e: "a + b" }], secs: 5, html: OP(V("a") + " + " + V("b")), ft: "Xuất a + b" },
          { op: "stop" },
        ],
      },
      questions: [
        { question: "Với a = 12, b = 18, chương trình nói kết quả bao nhiêu?", type: "multiple-choice",
          options: ["6", "12", "30", "0"],
          answer: 0, explanation: "12 > 18 sai → b = 18 chia lấy dư 12 = 6; 12 > 6 → a = 12 chia lấy dư 6 = 0; a * b = 0 → nói 0 + 6 = 6.", level: "van-dung", activity: "van-dung-2-chay" },
        { question: "Vì sao khi dừng lặp, chương trình nói a + b mà không nói a hay b?", type: "multiple-choice",
          options: ["Vì UCLN luôn là tổng hai số", "Vì Scratch không nói được một biến", "Vì a + b luôn lớn hơn a và b", "Vì khi a * b = 0 thì một số bằng 0, số còn lại là UCLN; không biết trước số nào bằng 0 nên cộng lại"],
          answer: 3, explanation: "Vòng lặp dừng khi một trong hai số bằng 0; số còn lại chính là UCLN, a + b cho đúng số đó.", level: "van-dung-cao", activity: "van-dung-2-chay" },
      ],
    },

    /* ===================== TỔNG KẾT ===================== */
    {
      id: "tong-ket", name: "Tổng kết", type: "summary",
      task: "Cả lớp nhắc lại kiến thức trọng tâm và làm thử thách cuối. Về nhà: học và thực hành lại Bài 14; hoàn thiện Vận dụng, gửi sản phẩm qua thư điện tử hoặc Zalo của thầy/cô; chuẩn bị trước Bài 15.",
      content: {
        learned: [
          "Ba cấu trúc điều khiển cơ bản: tuần tự, rẽ nhánh, lặp.",
          "Tuần tự: lắp ghép các khối lệnh theo trình tự hoạt động, từ trên xuống dưới.",
          "Rẽ nhánh: dạng khuyết (nếu … thì) và dạng đầy đủ (nếu … thì … nếu không thì).",
          "Lặp: lặp với số lần định trước (lặp lại n), lặp vô hạn (liên tục), lặp có điều kiện kết thúc (lặp lại cho đến khi).",
          "Trò chơi Đoán số kết hợp cả ba cấu trúc điều khiển.",
        ],
        challenge: [
          { question: "Chương trình cần hỏi mật khẩu cho đến khi người dùng nhập đúng. Nên dùng khối lệnh nào?", type: "multiple-choice",
            options: ["lặp lại 10", "liên tục", "lặp lại cho đến khi ‹trả lời = mật khẩu›", "nếu … thì"],
            answer: 2, explanation: "Số lần hỏi không biết trước, dừng khi nhập đúng → lặp có điều kiện kết thúc.", level: "van-dung-cao", activity: "tong-ket" },
          { question: "Trong trò chơi Đoán số, cấu trúc nào quyết định máy nói “Quá thấp!” hay “Quá cao!”?", type: "multiple-choice",
            options: ["Cấu trúc rẽ nhánh dạng đầy đủ", "Cấu trúc tuần tự", "Cấu trúc lặp vô hạn", "Cấu trúc rẽ nhánh dạng khuyết"],
            answer: 0, explanation: "Khối nếu ‹trả lời < số bí mật› thì … nếu không thì … — rẽ nhánh dạng đầy đủ.", level: "thong-hieu", activity: "tong-ket" },
        ],
      },
    },
  ],
};

if (typeof module !== "undefined" && module.exports) module.exports = LESSON;
if (typeof window !== "undefined") window.LESSON = LESSON;
