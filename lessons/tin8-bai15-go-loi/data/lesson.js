/* ============================================================================
 * BÀI 15 — GỠ LỖI  (Tin học 8 — Kết nối tri thức với cuộc sống)
 * Chủ đề 5: Giải quyết vấn đề với sự trợ giúp của máy tính.
 * Bám sát SGK trang 86–90 + Kế hoạch bài dạy (1 tiết) của giáo viên.
 * Chỉ sửa file này để đổi nội dung. Engine app.js không cần sửa.
 * GV chọn: ô chữ mở đầu sửa lời Câu 5 (đáp án Input, giữ từ khoá GỠ LỖI); Luyện tập theo SGK (cách khác sửa lỗi Hình 15.1);
 * mô phỏng: gỡ lỗi Hình 15.1, thực hành Hình 15.4, chẵn lẻ Hình 15.3, máy đoán số (Vận dụng);
 * thêm: phân loại lỗi, sắp xếp các bước gỡ lỗi, thám tử tìm lệnh gây lỗi, đúng hay sai.
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
const IMG = (src, cap, w) => `<figure style="margin:0 auto;max-width:${w || 640}px"><img src="${src}" alt="${cap}" style="width:100%;border-radius:8px"><figcaption class="caption">${cap}</figcaption></figure>`;
const FC = (nodes) => `<div class="fc-chart">${nodes.map(([t, s]) => `<span class="fc-node fc-${s}">${t}</span>`).join('<span class="fc-arrow">↓</span>')}</div>`;

const FLAG = B("event", "khi bấm vào <b class='sb-flag'>🏁</b>", true);
const STOP = B("control", "dừng lại " + DD("tất cả"));
const ASK = (t) => B("sensing", "hỏi " + T(t) + " và đợi");
const SAY = (h, s) => B("looks", "nói " + h + (s ? " trong " + N(s) + " giây" : ""));
const SETV = (v, h) => B("variables", "đặt " + DD(v) + " thành " + h);
const CHG = (v, n) => B("variables", "thay đổi " + DD(v) + " một lượng " + N(n));
const EQ = SEN("trả lời") + " = " + V("số bí mật");
const LT = SEN("trả lời") + " &lt; " + V("số bí mật");

// Thám tử: bốn chương trình có lỗi
const BUG_VUONG = STACK([FLAG, B("pen", "✏️ đặt bút"), CB("lặp lại " + N(4), [B("motion", "di chuyển " + N(100) + " bước"), B("motion", "xoay ↻ " + N(60) + " độ")], null, "↻")]);
const BUG_TONG = STACK([FLAG, ASK("a ="), SETV("a", SEN("trả lời")), ASK("b ="), SETV("b", SEN("trả lời")), SAY(OP("kết hợp " + V("a") + " " + V("b")), 2)]);
const BUG_DEM = STACK([FLAG, SETV("đếm", N(10)), CB("lặp lại cho đến khi " + BOOL(V("đếm") + " &lt; " + N(1)), [SAY(V("đếm"), 1), CHG("đếm", 1)], null, "↻"), SAY(T("Hết giờ!"), 2)]);
const BUG_DIEM = STACK([FLAG, ASK("Điểm của em:"), SETV("điểm", SEN("trả lời")), CB("nếu " + BOOL(V("điểm") + " &gt; " + N(5)) + " thì", [SAY(T("Đạt"), 2)], [SAY(T("Chưa đạt"), 2)])]);

// ---------- Chương trình chạy được ----------
const ASK_OP = (text, n) => ({ op: "ask", text, n });
const HINH_15_1 = (variant) => {
  const fix4a = variant === "sgk", fixInit = variant === "c1", move9 = variant === "c2";
  const inc = { op: "change", var: "số lần đoán", by: 1 };
  return [
    { op: "flag", n: 1 },
    { op: "set", var: "số lần đoán", expr: fixInit ? "1" : "0", show: fixInit ? "1" : "0", n: 2, ft: "số lần đoán ← " + (fixInit ? 1 : 0) },
    { op: "set", var: "số bí mật", random: [1, 100], n: 3 },
    ASK_OP("Hãy cho biết bạn đoán số nào.", 4),
    ...(fix4a ? [Object.assign({}, inc, { ft: "(4a) số lần đoán ← số lần đoán + 1" })] : []),
    { op: "until", cond: "trả lời == số bí mật", show: "trả lời = số bí mật", boolHTML: EQ, ft: "trả lời = số bí mật?", n: 5, body: [
      ...(move9 ? [Object.assign({ n: 9 }, inc)] : []),
      { op: "if", cond: "trả lời < số bí mật", show: "trả lời < số bí mật", boolHTML: LT, ft: "trả lời < số bí mật?", n: 6,
        then: [{ op: "ask", text: "Quá thấp!", n: 7, ft: "“Quá thấp” · Máy hỏi lại" }], else: [{ op: "ask", text: "Quá cao!", n: 8, ft: "“Quá cao” · Máy hỏi lại" }] },
      ...(move9 ? [] : [Object.assign({ n: 9 }, inc)]),
    ] },
    { op: "say", text: "HOAN HÔ!", secs: 2, n: 10 },
    { op: "say", join: ["Số lần đoán: ", { v: "số lần đoán" }], html: OP("kết hợp " + T("Số lần đoán:") + " " + V("số lần đoán")), secs: 5, n: 11, ft: "Hiển thị số lần đoán" },
    { op: "stop", n: 12 },
  ];
};
const HINH_15_4 = (fixed) => [
  { op: "flag", n: 1 },
  { op: "set", var: "số lần đoán", expr: "0", show: "0", n: 2 },
  { op: "set", var: "số bí mật", random: [1, 100], n: 3 },
  ASK_OP("Hãy cho biết bạn đoán số nào.", 4),
  { op: "change", var: "số lần đoán", by: 1, n: 5 },
  { op: "until", n: 6, cond: fixed ? "trả lời == số bí mật || số lần đoán > 6" : "trả lời == số bí mật || số lần đoán > 7",
    show: fixed ? "trả lời = số bí mật hoặc số lần đoán > 6" : "trả lời = số bí mật hoặc số lần đoán > 7",
    boolHTML: BOOL(EQ) + " hoặc " + BOOL(V("số lần đoán") + " &gt; " + N(fixed ? 6 : 7)), ft: "Đoán đúng hoặc số lần đoán > " + (fixed ? 6 : 7) + "?", body: [
      { op: "if", cond: "trả lời < số bí mật", show: "trả lời < số bí mật", boolHTML: LT, ft: "trả lời < số bí mật?", n: 7,
        then: [{ op: "ask", text: "Quá thấp!", n: 8, ft: "“Quá thấp” · Máy hỏi lại" }], else: [{ op: "ask", text: "Quá cao!", n: 9, ft: "“Quá cao” · Máy hỏi lại" }] },
      { op: "change", var: "số lần đoán", by: 1, n: 10 },
    ] },
  fixed
    ? { op: "if", n: 11, cond: "trả lời == số bí mật", show: "trả lời = số bí mật", boolHTML: EQ, ft: "trả lời = số bí mật?",
      then: [{ op: "say", text: "HOAN HÔ!", secs: 2, n: 13 }, { op: "say", join: ["Số lần đoán: ", { v: "số lần đoán" }], html: OP("kết hợp " + T("Số lần đoán:") + " " + V("số lần đoán")), secs: 5, n: 14, ft: "Hiển thị “Số lần đoán:” và số lần đoán" }],
      else: [{ op: "say", text: "Bạn đã thua!", secs: 5, n: 12 }] }
    : { op: "if", n: 11, cond: "số lần đoán > 7", show: "số lần đoán > 7", boolHTML: V("số lần đoán") + " &gt; " + N(7), ft: "số lần đoán > 7?",
      then: [{ op: "say", text: "Bạn đã thua!", secs: 5, n: 12 }],
      else: [{ op: "say", text: "HOAN HÔ!", secs: 2, n: 13 }, { op: "say", join: [{ e: "số lần đoán" }], html: OP(T("Số lần đoán:") + " + " + V("số lần đoán")), secs: 5, n: 14, ft: "Hiển thị “Số lần đoán:” + số lần đoán" }] },
  { op: "stop", n: 15 },
];
const HINH_15_3 = (fixed) => [
  { op: "flag" },
  { op: "ask", text: "n =" },
  ...(fixed ? [{ op: "set", var: "n", answer: true }] : []),
  { op: "if", cond: "n % 2 == 0", show: "n chia lấy dư 2 = 0", boolHTML: OP(V("n") + " chia lấy dư " + N(2)) + " = " + N(0), ft: "n chia lấy dư 2 = 0?",
    then: [{ op: "say", join: [{ v: "n" }, fixed ? " là số CHẴN!" : " là số LẺ!"], html: OP("kết hợp " + V("n") + " " + T(fixed ? "là số CHẴN!" : "là số LẺ!")), secs: 5, ft: fixed ? "n là số CHẴN" : "n là số LẺ" }],
    else: [{ op: "say", join: [{ v: "n" }, fixed ? " là số LẺ!" : " là số CHẴN!"], html: OP("kết hợp " + V("n") + " " + T(fixed ? "là số LẺ!" : "là số CHẴN!")), secs: 5, ft: fixed ? "n là số LẺ" : "n là số CHẴN" }] },
  { op: "stop" },
];

const LESSON = {
  meta: {
    subject: "Tin học", grade: "8", book: "Kết nối tri thức với cuộc sống",
    title: "Bài 15: Gỡ lỗi", unit: "Chủ đề 5 — Giải quyết vấn đề với sự trợ giúp của máy tính",
    pages: "86–90", durationMinutes: 45,
  },
  objectives: {
    knowledge: ["Chạy thử, tìm lỗi và sửa được lỗi cho chương trình."],
    competencies: [
      "Tự chủ và tự học; giao tiếp và hợp tác (nhóm 6 bạn, nhóm đôi trên máy); giải quyết vấn đề và sáng tạo (tìm cách sửa lỗi khác nhau).",
      "Năng lực số 5.1.TC2a, 5.1.TC2b, 5.3.TC2a: chạy thử chương trình, theo dõi biến, xác định lệnh gây lỗi, sửa lỗi để chương trình đúng kịch bản.",
      "Năng lực AI: có thể nhờ AI gợi ý tìm lỗi nhưng phải tự chạy thử, kiểm chứng và tự hoàn thiện chương trình.",
    ],
    qualities: ["Chăm chỉ, kiên trì chạy thử và sửa lỗi; trung thực khi báo cáo kết quả; hỗ trợ bạn khi thực hành."],
  },
  coreKnowledge: [
    "Cần phải chạy thử chương trình (kiểm thử) để phát hiện và loại bỏ lỗi.",
    "Lỗi cú pháp là lỗi viết câu lệnh sai quy tắc, làm cho chương trình không hoạt động.",
    "Lỗi lôgic là lỗi câu lệnh, tuy được viết đúng quy tắc nhưng thực hiện sai so với kịch bản.",
    "Phát hiện lỗi lôgic: tập trung vào những khối lệnh trực tiếp gây ra lỗi và những khối lệnh liên quan lôgic đến nó theo các cấu trúc điều khiển.",
    "Phát hiện lỗi lôgic: chạy chương trình từng bước, theo dõi sự thay đổi của các biến, các giá trị đầu ra và so sánh với các giá trị tính được theo cách thủ công.",
  ],
  keywords: ["Kiểm thử", "Lỗi cú pháp – Lỗi lôgic", "Gỡ lỗi"],
  settings: { basePoints: 100, useTimer: false, defaultTime: 60, sound: true, streakEnabled: true },

  activities: [
    /* ===================== HĐ1: MỞ ĐẦU (5 phút) ===================== */
    {
      id: "mo-dau", name: "Mở đầu — Trò chơi Ô chữ 🔠", type: "crossword",
      goal: "Củng cố kiến thức đã học; tìm từ khoá dẫn vào bài mới.",
      time: 300,
      task: "Cá nhân: chọn một hàng ngang bất kì (1–5) và trả lời câu hỏi. Mỗi câu trả lời đúng lật một hàng, hiện một chữ cái của từ khoá. Có thể đoán từ khoá hàng dọc bất cứ lúc nào — bạn đoán đúng từ khoá là người chiến thắng!",
      intro: "Bấm số thứ tự để chọn hàng ngang. Ô tô đậm là chữ cái của từ khoá.",
      questions: [
        { question: "Câu 1. Các phép toán và (and), hoặc (or), không phải (not) thuộc kiểu dữ liệu nào?", type: "multiple-choice", word: "LOGIC", key: 2,
          options: ["Số", "Xâu kí tự", "Lôgic", "Kí tự"],
          answer: 2, explanation: "Và, hoặc, không phải là các phép toán của kiểu lôgic (Bài 13).", level: "nhan-biet", activity: "mo-dau" },
        { question: "Câu 2. Thuật toán ở hình bên được biểu diễn bằng cách nào?", type: "multiple-choice", word: "SODOKHOI", key: 1,
          html: FC([["Bắt đầu", "term"], ["Nhập a, b", "io"], ["Tổng ← a + b", "proc"], ["Giá trị tổng của a và b", "io"], ["Kết thúc", "term"]]),
          options: ["Liệt kê", "Sơ đồ khối", "Hỗn hợp", "Sắp xếp"],
          answer: 1, explanation: "Thuật toán được biểu diễn bằng các hình khối nối với nhau bằng mũi tên — sơ đồ khối.", level: "nhan-biet", activity: "mo-dau" },
        { question: "Câu 3. Thuật toán ở hình bên thuộc cấu trúc nào?", type: "multiple-choice", word: "LAP", key: 0,
          html: `<div class="tt-loop" style="width:fit-content;margin:8px auto">${FC([["Chưa trúng đích?", "cond"]])}<div class="tt-yes">Đúng ↓ · Sai → ra khỏi vòng lặp</div>${FC([["Ném bóng vào đích", "proc"]])}<div class="tt-back">↺ quay lại kiểm tra điều kiện</div></div>`,
          options: ["Cấu trúc rẽ nhánh dạng thiếu", "Cấu trúc rẽ nhánh dạng đủ", "Cấu trúc lặp", "Cấu trúc tuần tự"],
          answer: 2, explanation: "Việc ném bóng được lặp lại khi chưa trúng đích — cấu trúc lặp.", level: "thong-hieu", activity: "mo-dau" },
        { question: "Câu 4. “Thuật toán tìm số lớn hơn trong hai số a, b”. Đầu ra là:", type: "multiple-choice", word: "SOLONHON", key: 1,
          options: ["Hai số a, b", "Số lớn hơn", "Số bé hơn", "Số bằng nhau"],
          answer: 1, explanation: "Đầu vào là hai số a, b; đầu ra là số lớn hơn.", level: "nhan-biet", activity: "mo-dau" },
        { question: "Câu 5. Khi xác định bài toán, thông tin đã cho (dữ liệu đầu vào) được gọi là gì?", type: "multiple-choice", word: "INPUT", key: 0,
          options: ["Input", "Output", "Chương trình", "Thuật toán"],
          answer: 0, explanation: "Xác định bài toán là xác định đầu vào (Input — thông tin đã cho) và đầu ra (Output — thông tin cần tìm).", level: "nhan-biet", activity: "mo-dau" },
        { question: "🔑 Từ khoá hàng dọc gồm 5 chữ cái là gì?", type: "short", keyword: true, answer: ["GỠ LỖI", "GO LOI", "GOLOI"],
          explanation: "GỠ LỖI — nội dung của bài học hôm nay.", level: "van-dung", activity: "mo-dau" },
      ],
    },

    /* ===================== HĐ2.1: KIỂM THỬ VÀ PHÂN LOẠI LỖI (7 phút) ===================== */
    {
      id: "kiem-thu", name: "1. Kiểm thử — Hoạt động 1, 2: Đếm số lần đoán 🧪", type: "knowledge",
      goal: "Chạy thử chương trình Hình 15.1 để phát hiện tình huống chạy không đúng kịch bản.",
      time: 300,
      task: "Nhóm 6 bạn (3 phút) — Phiếu học tập số 1: Chạy thử chương trình Hình 15.1 (đoán 2–3 lần rồi mới đoán đúng). So sánh số lần đoán máy thông báo với số lần em đã đoán thật. Chương trình không hoạt động được hay có hoạt động nhưng không đúng kịch bản?",
      sgkImage: "assets/sgk/hoat-dong-1.jpg",
      scratch: {
        title: "Kiểm thử chương trình Hình 15.1",
        intro: "Mẹo kiểm thử: bấm 👁 để hiện số bí mật (như đánh dấu ☑ cạnh biến trong Scratch) rồi cố ý đoán sai vài lần trước khi đoán đúng.",
        answer: "trả lời", hide: ["số bí mật"], count: "Số lần em đã đoán thật",
        script: HINH_15_1("bug"),
      },
      content: {
        revealLabel: "📖 a) Kiểm thử (SGK tr.86)",
        blocks: [
          { kind: "text", value: "Theo kịch bản, trò chơi sẽ thông báo số lần đoán khi người chơi đoán đúng số bí mật. Tuy nhiên, khi chạy thử chương trình, em sẽ thấy số lần đoán mà máy tính hiển thị luôn kém số lần thực tế mà người chơi đã đoán một đơn vị." },
          { kind: "text", value: "Việc chạy thử chương trình để kiểm tra (còn gọi là kiểm thử) nhằm phát hiện những tình huống bất thường (được gọi là lỗi) khi thực hiện chương trình. Các lỗi cần được loại bỏ trước khi chương trình được coi là sản phẩm hoàn chỉnh và có thể chia sẻ với người khác." },
          { kind: "html", value: IMG("assets/sgk/hinh-15-1.jpg", "Hình 15.1. Chương trình mới được tạo", 420) },
        ],
      },
      questions: [
        { question: "Em đoán 3 lần mới đúng. Chương trình Hình 15.1 thông báo “Số lần đoán” là bao nhiêu?", type: "multiple-choice",
          options: ["3", "4", "0", "2"],
          answer: 3, explanation: "Số lần đoán máy hiển thị luôn kém số lần thực tế một đơn vị: đoán 3 lần → máy nói 2.", level: "van-dung", activity: "kiem-thu" },
        { question: "Câu 1 (Hoạt động 2). Chương trình Hình 15.1 không hoạt động được hay có hoạt động nhưng thực hiện không đúng kịch bản?", type: "multiple-choice",
          options: ["Không hoạt động được", "Có hoạt động nhưng thực hiện không đúng kịch bản", "Hoạt động đúng hoàn toàn", "Chỉ chạy được khi đoán đúng ngay lần đầu"],
          answer: 1, explanation: "Máy vẫn hỏi và trả lời theo các khối lệnh (chương trình hoạt động), nhưng số lần đoán hiển thị không đúng với số lần thực tế — sai kịch bản.", level: "thong-hieu", activity: "kiem-thu" },
        { question: "Câu 2. Mục đích của việc chạy thử chương trình (kiểm thử) là gì?", type: "multiple-choice",
          options: ["Làm cho chương trình chạy nhanh hơn", "Để chương trình đẹp hơn", "Để máy tính tự sửa lỗi", "Phát hiện những tình huống bất thường (lỗi) để loại bỏ trước khi chia sẻ chương trình"],
          answer: 3, explanation: "Kiểm thử nhằm phát hiện lỗi; lỗi cần được loại bỏ trước khi chương trình được coi là sản phẩm hoàn chỉnh.", level: "nhan-biet", activity: "kiem-thu" },
      ],
    },
    {
      id: "phan-loai-loi", name: "b) Phân loại lỗi: lỗi cú pháp và lỗi lôgic 🐞", type: "knowledge",
      goal: "Phân biệt lỗi cú pháp và lỗi lôgic.",
      time: 240,
      task: "Nhóm (tiếp Phiếu học tập số 1) — Câu 3: Có mấy loại lỗi thường gặp? Các loại lỗi xảy ra khi nào? Sau đó trả lời câu hỏi SGK tr.87.",
      sgkImage: "assets/sgk/phan-loai.jpg",
      content: {
        revealLabel: "📖 Phân loại lỗi (SGK tr.87)",
        blocks: [
          { kind: "text", value: "Khi chạy thử, em nhận ra rằng chương trình vẫn hoạt động vì máy tính vẫn hỏi và trả lời theo sự điều khiển của các khối lệnh. Tuy nhiên nó thực hiện không đúng kịch bản vì số lần đoán được hiển thị không đúng với số lần thực tế mà người chơi đã đoán." },
          { kind: "list", value: [
            "Lỗi cú pháp xảy ra khi lệnh viết sai so với quy tắc của ngôn ngữ lập trình, làm cho chương trình không hoạt động.",
            "Lỗi lôgic (hay lỗi ngữ nghĩa) xảy ra khi các câu lệnh trong chương trình tuy được viết đúng cú pháp nhưng thực hiện không đúng kịch bản, như trong chương trình của trò chơi Đoán số.",
          ] },
        ],
      },
      remember: [
        "Cần phải chạy thử chương trình để phát hiện và loại bỏ lỗi.",
        "Có hai loại lỗi: lỗi cú pháp và lỗi lôgic.",
        "Lỗi cú pháp là lỗi viết câu lệnh sai quy tắc, làm cho chương trình không hoạt động.",
        "Lỗi lôgic là lỗi câu lệnh, tuy được viết đúng quy tắc nhưng thực hiện sai so với kịch bản.",
      ],
      questions: [
        { question: "Câu 3. Lỗi trong chương trình Hình 15.1 (số lần đoán hiển thị kém thực tế một đơn vị) thuộc loại lỗi nào?", type: "multiple-choice",
          options: ["Lỗi lôgic", "Lỗi cú pháp", "Lỗi của máy tính", "Không phải lỗi"],
          answer: 0, explanation: "Các lệnh viết đúng quy tắc, chương trình vẫn chạy nhưng sai kịch bản — lỗi lôgic.", level: "thong-hieu", activity: "phan-loai-loi" },
        { question: "Lỗi cú pháp xảy ra khi nào?", type: "multiple-choice",
          options: ["Khi chương trình chạy nhưng cho kết quả sai", "Khi người chơi nhập sai số", "Khi máy tính bị hỏng", "Khi lệnh viết sai so với quy tắc của ngôn ngữ lập trình, làm chương trình không hoạt động"],
          answer: 3, explanation: "Lỗi cú pháp: viết sai quy tắc của ngôn ngữ lập trình → chương trình không hoạt động.", level: "nhan-biet", activity: "phan-loai-loi" },
        { question: "Câu hỏi SGK tr.87: Chọn phát biểu đúng nhất về hoạt động gỡ lỗi.", type: "multiple-choice",
          options: ["Gỡ lỗi là phát hiện và loại bỏ lỗi. Trong lập trình, không nhất thiết phải gỡ lỗi.", "Gỡ lỗi là chạy thử chương trình để phát hiện lỗi. Trong lập trình, không nhất thiết phải gỡ lỗi.", "Gỡ lỗi là chạy thử chương trình để phát hiện lỗi. Gỡ lỗi là một phần quan trọng của lập trình.", "Gỡ lỗi là phát hiện và loại bỏ lỗi. Gỡ lỗi là một phần quan trọng của lập trình."],
          answer: 3, explanation: "Gỡ lỗi gồm cả phát hiện và loại bỏ lỗi (không chỉ chạy thử để phát hiện), và là một phần quan trọng của lập trình.", level: "thong-hieu", activity: "phan-loai-loi" },
      ],
    },
    {
      id: "phan-loai-tinh-huong", name: "Trò chơi: Lỗi cú pháp hay lỗi lôgic? 🗂️", type: "dragdrop",
      goal: "Nhận biết loại lỗi qua biểu hiện khi chạy chương trình.",
      time: 180,
      task: "Kéo mỗi tình huống vào đúng cột loại lỗi rồi bấm Kiểm tra.",
      groups: ["Lỗi cú pháp ⛔", "Lỗi lôgic 🤔"],
      items: [
        { text: "Viết câu lệnh sai quy tắc của ngôn ngữ lập trình", group: 0 },
        { text: "Chương trình báo lỗi và không chạy được", group: 0 },
        { text: "Gõ sai tên lệnh, VD prnit thay cho print (ngôn ngữ lập trình dạng văn bản)", group: 0 },
        { text: "Thiếu dấu đóng ngoặc trong câu lệnh (ngôn ngữ lập trình dạng văn bản)", group: 0 },
        { text: "Số lần đoán hiển thị luôn kém thực tế 1 đơn vị", group: 1 },
        { text: "Nhập 6 mà chương trình nói “6 là số LẺ!”", group: 1 },
        { text: "Đã đoán sai 7 lần mà vẫn được đoán tiếp", group: 1 },
        { text: "Vẽ hình vuông nhưng hình không khép kín", group: 1 },
      ],
      explanation: "Lỗi cú pháp làm chương trình không chạy được (sai quy tắc viết lệnh). Lỗi lôgic: chương trình vẫn chạy nhưng làm sai kịch bản. Ngôn ngữ lập trình trực quan như Scratch hạn chế những tình huống xảy ra lỗi cú pháp.",
    },

    /* ===================== HĐ2.2: PHÁT HIỆN VÀ SỬA LỖI LÔGIC (8 phút) ===================== */
    {
      id: "phat-hien-loi", name: "2. Hoạt động 3: Phát hiện lỗi và sửa lỗi lôgic 🔍", type: "knowledge",
      goal: "Dùng hai cách phát hiện lỗi lôgic; sửa lỗi đếm số lần đoán.",
      time: 480,
      task: "Nhóm — Phiếu học tập số 2: 1) Theo kịch bản, biến số lần đoán sẽ thay đổi trong tình huống nào? 2) Những khối lệnh nào làm thay đổi biến số lần đoán? 3) Có điều gì khác nhau giữa kịch bản và những khối lệnh tương ứng? Bật 👣 Từng bước (giống chèn lệnh “đợi … giây”) để theo dõi biến số lần đoán.",
      sgkImage: "assets/sgk/hoat-dong-3.jpg",
      scratch: [
        { tab: "❌ Hình 15.1 (có lỗi)", title: "Chạy từng bước, theo dõi biến số lần đoán", intro: "Nhập ngay số bí mật (bấm 👁 để xem) trong lần đoán đầu tiên: lẽ ra số lần đoán là 1 nhưng vẫn là 0.",
          answer: "trả lời", hide: ["số bí mật"], count: "Số lần em đã đoán thật", flow: true, step: true, script: HINH_15_1("bug") },
        { tab: "✅ Đã sửa (thêm lệnh 4a)", title: "Sửa lỗi: thêm lệnh (4a) “thay đổi số lần đoán một lượng 1” sau lệnh (4)", intro: "Chạy lại và so sánh số lần đoán máy thông báo với số lần em đoán thật.",
          answer: "trả lời", hide: ["số bí mật"], count: "Số lần em đã đoán thật", flow: true, script: HINH_15_1("sgk") },
      ],
      content: {
        revealLabel: "📖 Phát hiện và sửa lỗi lôgic (SGK tr.88)",
        blocks: [
          { kind: "text", value: "Cách thứ nhất: Dựa vào phân tích lôgic để tìm lỗi. Các khối lệnh liên quan đến biến số lần đoán là khởi tạo giá trị (2), thay đổi giá trị (9) và hiển thị giá trị (11). Theo kịch bản, số lần đoán cần phải tăng 1 đơn vị mỗi khi người chơi nhập một giá trị số (đoán) — ở các câu lệnh (4), (7) và (8). Mặc dù (9) tăng giá trị của số lần đoán sau khi (7) hoặc (8) được thực hiện, nhưng không có lệnh nào như thế sau khối lệnh (4) cả." },
          { kind: "text", value: "Cách thứ hai: Chạy thử với dữ liệu mẫu để dò lỗi. Cho hiện giá trị các biến số bí mật và số lần đoán bằng cách đánh dấu ☑ bên cạnh các biến đó trong nhóm “Các biến số”. Nhập số bí mật ngay trong lần đoán đầu tiên: lẽ ra số lần đoán cần nhận giá trị 1 thì nó vẫn chỉ mang giá trị 0. Chương trình có thể chạy theo từng bước bằng cách chèn lệnh “đợi … giây” vào những vị trí cần quan sát dữ liệu." },
          { kind: "html", value: IMG("assets/sgk/hinh-15-2.jpg", "Hình 15.2. Công cụ phát hiện lỗi lôgic", 420) },
          { kind: "text", value: "Sửa lỗi: tăng giá trị số lần đoán lên 1 đơn vị sau lần đoán đầu tiên bằng cách bổ sung lệnh (4a) “thay đổi số lần đoán một lượng 1” giống như lệnh (9) vào sau lệnh (4)." },
        ],
      },
      remember: [
        "Phát hiện lỗi lôgic: tập trung vào những khối lệnh trực tiếp gây ra lỗi và những khối lệnh liên quan lôgic đến nó theo các cấu trúc điều khiển.",
        "Phát hiện lỗi lôgic: chạy chương trình từng bước, kết hợp theo dõi sự thay đổi của các biến, các giá trị đầu ra và so sánh với các giá trị tính được theo cách thủ công.",
      ],
      questions: [
        { question: "Câu 1. Theo kịch bản, biến số lần đoán thay đổi trong tình huống nào?", type: "multiple-choice",
          options: ["Khi máy lấy số bí mật", "Chỉ khi người chơi đoán đúng", "Khi chương trình dừng lại", "Tăng 1 đơn vị mỗi khi người chơi nhập một giá trị số (đoán)"],
          answer: 3, explanation: "Mỗi lần người chơi nhập một số (đoán), số lần đoán phải tăng 1 đơn vị.", level: "thong-hieu", activity: "phat-hien-loi" },
        { question: "Câu 2. Người chơi nhập giá trị (đoán) ở những lệnh nào của Hình 15.1?", type: "multiple-choice",
          options: ["(4), (7) và (8)", "(2), (9) và (11)", "(5) và (6)", "(10) và (11)"],
          answer: 0, explanation: "Các lệnh hỏi … và đợi (4), (7), (8) nhận giá trị người chơi đoán. (2), (9), (11) là các lệnh khởi tạo, thay đổi, hiển thị số lần đoán.", level: "thong-hieu", activity: "phat-hien-loi" },
        { question: "Câu 3. Điều gì khác nhau giữa kịch bản và các khối lệnh?", type: "multiple-choice",
          options: ["Lệnh (9) tăng số lần đoán 2 đơn vị", "Lệnh (9) tăng số lần đoán sau (7) hoặc (8), nhưng không có lệnh tăng số lần đoán sau lệnh (4)", "Lệnh (2) đặt số lần đoán thành 100", "Lệnh (11) không hiển thị số lần đoán"],
          answer: 1, explanation: "Lần đoán đầu tiên ở lệnh (4) không được đếm → số lần đoán luôn kém thực tế 1 đơn vị.", level: "van-dung", activity: "phat-hien-loi" },
      ],
    },
    {
      id: "sap-xep-buoc", name: "Trò chơi: Sắp xếp các bước gỡ lỗi 🧩", type: "ordering",
      goal: "Ghi nhớ quy trình gỡ lỗi.",
      time: 150,
      task: "Sắp xếp các bước gỡ lỗi cho một chương trình theo đúng thứ tự rồi bấm Kiểm tra.",
      steps: [
        "Chạy thử chương trình với dữ liệu mẫu (kiểm thử)",
        "Phát hiện tình huống chương trình chạy không đúng kịch bản",
        "Tìm các khối lệnh liên quan, xác định lệnh gây ra lỗi",
        "Sửa lỗi (thêm, bớt hoặc chỉnh sửa khối lệnh)",
        "Chạy thử lại để kiểm tra lỗi đã được loại bỏ",
      ],
      explanation: "Kiểm thử → phát hiện lỗi → xác định vị trí lỗi → sửa lỗi → chạy thử lại. Sửa xong phải chạy thử lại vì có thể còn lỗi khác.",
    },
    {
      id: "chan-le", name: "Câu hỏi SGK tr.89: Gỡ lỗi chương trình chẵn – lẻ (Hình 15.3) 🔢", type: "knowledge",
      goal: "Kiểm thử và gỡ lỗi chương trình xác định một số là chẵn hay lẻ.",
      time: 300,
      task: "Cặp đôi: Chạy thử chương trình Hình 15.3 với n = 6 rồi n = 7. Chương trình chạy có đúng không? Tìm các lệnh gây lỗi và cách sửa, sau đó chạy bản đã sửa để kiểm tra.",
      sgkImage: "assets/sgk/hinh-15-3.jpg",
      scratch: [
        { tab: "❌ Hình 15.3", title: "Chương trình xác định một số là chẵn hay lẻ", intro: "Biến n mới tạo có giá trị 0.", vars: { n: 0 }, flow: true, script: HINH_15_3(false) },
        { tab: "✅ Đã sửa", title: "Sau khi gỡ lỗi", intro: "Thêm lệnh đặt n thành trả lời; đổi chỗ hai thông báo.", vars: { n: 0 }, flow: true, script: HINH_15_3(true) },
      ],
      questions: [
        { question: "Chạy chương trình Hình 15.3, nhập n = 7. Mèo nói gì?", type: "multiple-choice",
          options: ["7 là số LẺ!", "7 là số CHẴN!", "0 là số LẺ!", "Không nói gì"],
          answer: 2, explanation: "Chương trình không gán trả lời cho n nên n vẫn là 0; 0 chia lấy dư 2 bằng 0 → nhánh “thì” → “0 là số LẺ!”. Đã có lỗi!", level: "van-dung", activity: "chan-le" },
        { question: "Chương trình Hình 15.3 có những lỗi nào?", type: "multiple-choice",
          options: ["Chỉ sai lệnh dừng lại tất cả", "Chưa gán giá trị trả lời cho n; hai thông báo “là số LẺ!” và “là số CHẴN!” bị đổi chỗ", "Phải dùng lệnh lặp thay cho nếu … thì", "Chỉ cần đổi 2 thành 3"],
          answer: 1, explanation: "Thêm lệnh “đặt n thành trả lời” sau lệnh hỏi; n chia lấy dư 2 = 0 thì n là số CHẴN, nếu không thì là số LẺ.", level: "van-dung-cao", activity: "chan-le" },
      ],
    },

    /* ===================== HĐ2.3: THỰC HÀNH GỠ LỖI (14 phút) ===================== */
    {
      id: "thuc-hanh", name: "3. Thực hành: Gỡ lỗi trò chơi Đoán số tối đa 7 lần 🛠️", type: "knowledge",
      goal: "Kiểm thử, phát hiện và sửa các lỗi của chương trình Hình 15.4.",
      time: 840,
      task: "Nhóm đôi trên máy: Giả sử trong trò chơi Đoán số, không ai được đoán quá 7 lần. Hãy gỡ lỗi chương trình Hình 15.4 (đã bổ sung chức năng thông báo người chơi thua cuộc nếu vẫn đoán sai ở lần thứ 7). Bước 1: chạy thử với hai tình huống — đoán đúng sau không quá 7 lần; cố ý đoán sai 7 lần. Bước 2: phát hiện lỗi. Sau đó sửa lỗi và chạy lại.",
      sgkImage: "assets/sgk/thuc-hanh.jpg",
      scratch: [
        { tab: "❌ Hình 15.4 (cần gỡ lỗi)", title: "Chương trình cần được gỡ lỗi", intro: "Thử 1: đoán đúng (bấm 👁 xem số bí mật) — máy nói gì sau HOAN HÔ!? Thử 2: cố ý đoán sai 7 lần — máy có báo thua ngay không?",
          answer: "trả lời", hide: ["số bí mật"], count: "Số lần em đã đoán thật", flow: true, script: HINH_15_4(false) },
        { tab: "✅ Sau khi sửa (Hình 15.5)", title: "Chương trình sau khi gỡ lỗi", intro: "Điều kiện (6): số lần đoán > 6; điều kiện (11): trả lời = số bí mật; lệnh (14) dùng kết hợp.",
          answer: "trả lời", hide: ["số bí mật"], count: "Số lần em đã đoán thật", flow: true, script: HINH_15_4(true) },
      ],
      content: {
        revealLabel: "💡 Gợi ý phát hiện lỗi và sửa lỗi (SGK tr.90)",
        blocks: [
          { kind: "list", value: [
            "Tình huống thứ nhất: lỗi xảy ra ở câu lệnh hiển thị (14). Phép toán ghép nối các chữ là “kết hợp…” chứ không phải dấu “+”.",
            "Tình huống thứ hai: lỗi xảy ra ở biểu thức điều kiện. Vì mỗi người không đoán quá 7 lần, nên vòng lặp (6) – (10) sẽ kết thúc khi số lần đoán bằng 7.",
            "Ngoài ra, sau 7 lần đoán, vẫn có thể xảy ra cả hai khả năng đoán đúng hoặc đoán sai. Vì vậy, số lần đoán không cho biết kết quả đoán đúng hay sai.",
          ] },
          { kind: "html", value: IMG("assets/sgk/sua-loi-th.jpg", "Sửa lỗi: điều kiện (6), điều kiện (11) và Hình 15.5. Các lệnh (11) đến (14) sau khi sửa", 620) },
        ],
      },
      questions: [
        { question: "Tình huống 1: đoán đúng sau không quá 7 lần. Lệnh (14) hiển thị gì, vì sao?", type: "multiple-choice",
          options: ["Chỉ hiện số lần đoán, không có cụm từ “Số lần đoán:” vì dấu “+” là phép cộng số, không ghép nối chữ", "Hiện đầy đủ “Số lần đoán: 3”", "Không hiện gì vì lệnh (14) bị bỏ qua", "Hiện “Bạn đã thua!”"],
          answer: 0, explanation: "Phép toán ghép nối các chữ là “kết hợp”, không phải dấu “+”. Sửa lệnh (14) thành kết hợp (Số lần đoán:) (số lần đoán).", level: "thong-hieu", activity: "thuc-hanh" },
        { question: "Tình huống 2: đoán sai lần thứ 7, chương trình vẫn cho đoán thêm một lần nữa. Điều kiện (6) cần đổi thành gì?", type: "multiple-choice",
          options: ["trả lời = số bí mật hoặc số lần đoán > 8", "trả lời = số bí mật và số lần đoán > 7", "số lần đoán > 7", "trả lời = số bí mật hoặc số lần đoán > 6 (hoặc số lần đoán = 7)"],
          answer: 3, explanation: "Sau lần đoán thứ 7, số lần đoán = 7 — vòng lặp phải kết thúc, nên điều kiện là số lần đoán > 6 hoặc số lần đoán = 7.", level: "van-dung", activity: "thuc-hanh" },
        { question: "Vì sao điều kiện rẽ nhánh ở lệnh (11) phải sửa thành “trả lời = số bí mật”?", type: "multiple-choice",
          options: ["Vì Scratch không có phép so sánh >", "Vì sau 7 lần đoán vẫn có thể đoán đúng hoặc sai, số lần đoán không cho biết kết quả đúng hay sai", "Vì số lần đoán luôn bằng 0", "Vì lệnh (11) nằm trong vòng lặp"],
          answer: 1, explanation: "Người chơi có thể đoán đúng đúng ở lần thứ 7; chỉ so sánh trả lời với số bí mật mới biết thắng hay thua.", level: "van-dung-cao", activity: "thuc-hanh" },
      ],
    },
    {
      id: "tham-tu", name: "Thám tử tìm lệnh gây lỗi 🕵️", type: "quiz",
      goal: "Luyện kĩ năng đọc chương trình, phát hiện và sửa lỗi lôgic.",
      time: 300,
      task: "Mỗi chương trình dưới đây có một lỗi lôgic. Đọc kịch bản, tìm lệnh gây lỗi và chọn cách sửa đúng.",
      questions: [
        { question: "Kịch bản: vẽ hình vuông cạnh 100 bước. Chạy thử thấy hình không khép kín. Sửa thế nào?", type: "multiple-choice", html: BUG_VUONG,
          options: ["Đổi lặp lại 4 thành lặp lại 6", "Đổi di chuyển 100 thành 90 bước", "Đổi xoay 60 độ thành xoay 90 độ", "Bỏ lệnh đặt bút"],
          answer: 2, explanation: "Hình vuông: 4 lần × 90° = 360°. Xoay 60° thì hình không khép kín.", level: "van-dung", activity: "tham-tu" },
        { question: "Kịch bản: nhập a, b rồi nói tổng a + b. Nhập 3 và 5 thì mèo nói “35”. Lỗi ở đâu?", type: "multiple-choice", html: BUG_TONG,
          options: ["Dùng phép “kết hợp” (ghép chữ) thay cho phép cộng “+”", "Thiếu lệnh hỏi a", "Phải nói trong 5 giây", "Biến a, b bị đặt nhầm tên"],
          answer: 0, explanation: "Kết hợp ghép 3 và 5 thành xâu “35”. Cần dùng phép cộng (a + b) để được 8.", level: "thong-hieu", activity: "tham-tu" },
        { question: "Kịch bản: đếm ngược 10, 9, …, 1 rồi nói “Hết giờ!”. Chạy thử thấy mèo đếm 10, 11, 12, … mãi không dừng. Sửa thế nào?", type: "multiple-choice", html: BUG_DEM,
          options: ["Đổi 10 thành 0", "Đổi lượng thay đổi 1 thành -1", "Đổi điều kiện thành đếm > 1", "Bỏ lệnh nói đếm"],
          answer: 1, explanation: "Mỗi vòng đếm phải giảm 1 (thay đổi một lượng -1) thì mới có lúc đếm < 1 để kết thúc vòng lặp.", level: "van-dung-cao", activity: "tham-tu" },
        { question: "Kịch bản: điểm từ 5 trở lên là Đạt. Nhập 5 thì mèo nói “Chưa đạt”. Sửa điều kiện thế nào?", type: "multiple-choice", html: BUG_DIEM,
          options: ["điểm < 5", "điểm = 10", "điểm > 6", "điểm > 4 (hoặc: điểm > 5 hoặc điểm = 5)"],
          answer: 3, explanation: "5 > 5 sai nên 5 điểm rơi vào nhánh “Chưa đạt”. Với điểm số nguyên, dùng điểm > 4 hoặc (điểm > 5) hoặc (điểm = 5).", level: "van-dung", activity: "tham-tu" },
      ],
    },
    {
      id: "dung-sai", name: "Đúng hay sai? ✅❌", type: "quiz",
      goal: "Củng cố nhanh các ý về kiểm thử và gỡ lỗi.",
      time: 180,
      task: "Chọn Đúng hoặc Sai cho mỗi nhận định.",
      questions: [
        { question: "Chương trình Scratch chạy được, không báo lỗi thì chắc chắn không còn lỗi nào.", type: "true-false", answer: false,
          explanation: "Chương trình vẫn có thể có lỗi lôgic: chạy được nhưng làm sai kịch bản (như Hình 15.1).", level: "thong-hieu", activity: "dung-sai" },
        { question: "Với lỗi lôgic, việc xác định lệnh nào gây ra lỗi không phải lúc nào cũng đơn giản.", type: "true-false", answer: true,
          explanation: "SGK: lỗi cú pháp dễ phát hiện và sửa; lỗi lôgic khó xác định hơn.", level: "nhan-biet", activity: "dung-sai" },
        { question: "Có thể chèn lệnh “đợi … giây” vào những vị trí cần quan sát dữ liệu để chạy chương trình theo từng bước.", type: "true-false", answer: true,
          explanation: "Hình 15.2b: lệnh đợi giúp dừng tạm thời để theo dõi giá trị biến.", level: "nhan-biet", activity: "dung-sai" },
        { question: "Sau khi sửa lỗi thì không cần chạy thử lại chương trình.", type: "true-false", answer: false,
          explanation: "Phải chạy thử lại để chắc lỗi đã được loại bỏ và không phát sinh lỗi mới.", level: "thong-hieu", activity: "dung-sai" },
      ],
    },

    /* ===================== HĐ3: LUYỆN TẬP (8 phút) ===================== */
    {
      id: "luyen-tap", name: "Luyện tập: Một cách khác sửa lỗi Hình 15.1 🔁", type: "knowledge",
      goal: "Tìm cách sửa lỗi khác với cách bổ sung lệnh (4a); kiểm thử để chứng minh cách sửa đúng.",
      time: 480,
      task: "Nhóm đôi: Em hãy chọn một cách khác với cách đã nêu trong phần b) Sửa lỗi của mục 2 để sửa lỗi của chương trình Hình 15.1. Chạy thử hai cách dưới đây — cách nào sửa được lỗi, cách nào vẫn còn lỗi?",
      sgkImage: "assets/sgk/luyen-tap.jpg",
      scratch: [
        { tab: "🅰️ Cách 1", title: "Cách 1: sửa lệnh (2) — đặt số lần đoán thành 1", intro: "Lần đoán đầu tiên ở lệnh (4) được tính ngay từ đầu.",
          answer: "trả lời", hide: ["số bí mật"], count: "Số lần em đã đoán thật", flow: true, script: HINH_15_1("c1") },
        { tab: "🅱️ Cách 2", title: "Cách 2: chuyển lệnh (9) lên đầu vòng lặp", intro: "Tăng số lần đoán trước khi so sánh và hỏi lại.",
          answer: "trả lời", hide: ["số bí mật"], count: "Số lần em đã đoán thật", flow: true, script: HINH_15_1("c2") },
      ],
      questions: [
        { question: "Chạy thử: đoán 3 lần mới đúng. Cách nào thông báo đúng “Số lần đoán: 3”?", type: "multiple-choice",
          options: ["Cả hai cách", "Chỉ cách 2", "Chỉ cách 1", "Không cách nào"],
          answer: 2, explanation: "Cách 1: bắt đầu từ 1 (đã tính lần đoán ở lệnh (4)), mỗi lần hỏi lại tăng 1 → 3. Cách 2 vẫn chỉ tăng 2 lần (mỗi vòng lặp một lần) → 2.", level: "van-dung", activity: "luyen-tap" },
        { question: "Vì sao cách 2 vẫn còn lỗi?", type: "multiple-choice",
          options: ["Vì số lần tăng vẫn bằng số vòng lặp, mà lần đoán đầu tiên ở lệnh (4) nằm ngoài vòng lặp nên vẫn không được đếm", "Vì lệnh thay đổi phải đặt ngoài chương trình", "Vì Scratch không cho đặt lệnh trong vòng lặp", "Vì số bí mật thay đổi"],
          answer: 0, explanation: "Đổi vị trí lệnh (9) trong vòng lặp không làm thay đổi số lần tăng. Kiểm thử giúp phát hiện cách sửa chưa đúng.", level: "van-dung-cao", activity: "luyen-tap" },
      ],
    },

    /* ===================== HĐ4: VẬN DỤNG (3 phút, làm ở nhà) ===================== */
    {
      id: "van-dung", name: "Vận dụng: Đổi vai — máy tính đoán số của em 🤖", type: "knowledge",
      goal: "Viết chương trình để máy tìm ra số em chọn sau càng ít bước càng tốt; chạy thử, phát hiện và sửa lỗi.",
      time: 180,
      task: "Đổi vai trò máy tính và người chơi trong trò chơi Đoán số. Em chọn một số nguyên trong khoảng từ 1 đến 120 và viết số đó ra giấy. Máy tính sẽ hiển thị một số mà em phải trả lời bằng các phím “d”, “c” hoặc “t” tương ứng với tình huống số máy tính hiển thị đúng, cao hơn hay thấp hơn số em đã chọn. Hãy viết chương trình để sau một số bước, càng ít càng tốt, máy tính tìm ra số em đã chọn. Chạy thử, phát hiện và sửa các lỗi của chương trình đó. Hoàn thiện ở nhà, gửi sản phẩm qua Zalo hoặc thư điện tử của thầy/cô.",
      sgkImage: "assets/sgk/van-dung.jpg",
      scratch: {
        title: "Chương trình tham khảo (Mở rộng): máy đoán số em nghĩ",
        intro: "Nghĩ một số từ 1 đến 120. Máy luôn đoán số ở giữa khoảng còn lại nên không quá 7 lần là tìm ra. Thử trả lời sai (nhầm c với t) để xem chương trình phát hiện lỗi thế nào.",
        answer: "trả lời", vars: { "trả lời": "" }, flow: true,
        script: [
          { op: "flag" },
          { op: "say", text: "Em hãy nghĩ một số từ 1 đến 120 và viết ra giấy nhé!", secs: 3 },
          { op: "set", var: "thấp", expr: "1", show: "1" },
          { op: "set", var: "cao", expr: "120", show: "120" },
          { op: "set", var: "số lần", expr: "0", show: "0" },
          { op: "until", cond: "trả lời == 'd'", show: "trả lời = d", boolHTML: SEN("trả lời") + " = " + T("d"), ft: "trả lời = d?", body: [
            { op: "set", var: "đoán", expr: "round((thấp + cao) / 2)", show: "làm tròn ((thấp + cao) / 2)", ft: "đoán ← làm tròn ((thấp + cao) : 2)" },
            { op: "change", var: "số lần", by: 1 },
            { op: "ask", join: ["Số của em là ", { v: "đoán" }, "? Gõ d (đúng), c (cao hơn), t (thấp hơn)"], html: OP("kết hợp " + T("Số của em là") + " " + V("đoán")), ft: "Hỏi: số của em là đoán?" },
            { op: "if", cond: "trả lời == 'c'", show: "trả lời = c", boolHTML: SEN("trả lời") + " = " + T("c"), ft: "trả lời = c?", then: [{ op: "set", var: "cao", expr: "đoán - 1", show: "đoán - 1" }] },
            { op: "if", cond: "trả lời == 't'", show: "trả lời = t", boolHTML: SEN("trả lời") + " = " + T("t"), ft: "trả lời = t?", then: [{ op: "set", var: "thấp", expr: "đoán + 1", show: "đoán + 1" }] },
            { op: "if", cond: "thấp > cao", show: "thấp > cao", boolHTML: V("thấp") + " &gt; " + V("cao"), ft: "thấp > cao?", then: [
              { op: "say", text: "Hình như em đã trả lời nhầm! Hãy kiểm tra lại số đã viết ra giấy.", secs: 3 }, { op: "stop" }] },
          ] },
          { op: "say", join: ["Máy đã tìm ra số của em sau ", { v: "số lần" }, " lần đoán!"], html: OP("kết hợp " + T("Máy đã tìm ra số của em sau") + " " + V("số lần")), secs: 3 },
          { op: "stop" },
        ],
      },
      questions: [
        { question: "Em chọn số 90. Máy đoán 61, em trả lời gì?", type: "multiple-choice",
          options: ["d", "c", "t", "90"],
          answer: 2, explanation: "61 thấp hơn 90 → trả lời t (thấp hơn). Máy sẽ đoán trong khoảng 62 đến 120.", level: "van-dung", activity: "van-dung" },
        { question: "Vì sao máy nên đoán số ở giữa khoảng còn lại?", type: "multiple-choice",
          options: ["Để mỗi lần đoán loại được khoảng một nửa số khả năng, nên chỉ cần ít lần đoán (không quá 7 lần với 120 số)", "Vì Scratch chỉ lấy được số ở giữa", "Để máy đoán ngẫu nhiên", "Vì người chơi luôn chọn số ở giữa"],
          answer: 0, explanation: "Mỗi lần đoán số ở giữa, khoảng tìm kiếm giảm một nửa: 120 → 60 → 30 → 15 → 8 → 4 → 2 → 1. (Mở rộng)", level: "van-dung-cao", activity: "van-dung" },
      ],
    },

    /* ===================== TỔNG KẾT ===================== */
    {
      id: "tong-ket", name: "Tổng kết", type: "summary",
      task: "Cả lớp nhắc lại kiến thức trọng tâm và làm thử thách cuối. Về nhà: ôn lại bài; hoàn thiện Vận dụng; tìm hiểu trước Bài 16: Tin học và nghề nghiệp (SGK tr.91).",
      content: {
        learned: [
          "Kiểm thử là chạy thử chương trình để phát hiện lỗi; lỗi cần được loại bỏ trước khi chia sẻ chương trình.",
          "Hai loại lỗi: lỗi cú pháp (sai quy tắc, chương trình không chạy) và lỗi lôgic (chạy được nhưng sai kịch bản).",
          "Hai cách phát hiện lỗi lôgic: phân tích các khối lệnh liên quan; chạy từng bước, theo dõi biến và so sánh với tính tay.",
          "Sửa lỗi xong phải chạy thử lại.",
        ],
        challenge: [
          { question: "Chương trình tính diện tích hình chữ nhật: nhập dài 4, rộng 3 thì nói 14. Đây là loại lỗi gì và nên kiểm tra lệnh nào?", type: "multiple-choice",
            options: ["Lỗi cú pháp; kiểm tra lệnh khi bấm vào 🏁", "Lỗi lôgic; kiểm tra biểu thức tính diện tích (có thể đã tính (dài + rộng) × 2 thay cho dài × rộng)", "Không có lỗi", "Lỗi lôgic; kiểm tra lệnh hỏi"],
            answer: 1, explanation: "Chương trình vẫn chạy nhưng kết quả sai (14 là chu vi) → lỗi lôgic ở biểu thức tính. Đúng là 4 × 3 = 12.", level: "van-dung-cao", activity: "tong-ket" },
          { question: "Cách nào giúp phát hiện lỗi lôgic hiệu quả?", type: "multiple-choice",
            options: ["Xoá hết chương trình rồi viết lại", "Chỉ chạy thử một lần với một số bất kì", "Đổi màu các khối lệnh", "Chạy từng bước, hiện giá trị các biến và so sánh với giá trị tính tay"],
            answer: 3, explanation: "Theo dõi sự thay đổi của biến khi chạy từng bước, so sánh với giá trị tính theo cách thủ công để tìm lệnh gây lỗi.", level: "thong-hieu", activity: "tong-ket" },
        ],
      },
    },
  ],
};

if (typeof module !== "undefined" && module.exports) module.exports = LESSON;
if (typeof window !== "undefined") window.LESSON = LESSON;
