/* ============================================================================
 * BÀI 13 — BIỂU DIỄN DỮ LIỆU  (Tin học 8 — Kết nối tri thức với cuộc sống)
 * Chủ đề 5: Giải quyết vấn đề với sự trợ giúp của máy tính.
 * Bám sát SGK trang 76–79 + Kế hoạch bài dạy (2 tiết) của giáo viên.
 * Chỉ sửa file này để đổi nội dung. Engine app.js không cần sửa.
 * GV chọn: trò chơi của giáo án (nhiệm vụ 5) tổ chức dạng trắc nghiệm nhanh kiểu Kahoot; mô phỏng bảng tính Hình 13.2 (câu gõ công thức)
 * và chương trình chu vi – diện tích (Luyện tập 2); thêm phân loại kiểu dữ liệu, đoán kết quả và/hoặc/không phải, sắp xếp lệnh Hình 13.4.
 * ==========================================================================*/

// ---------- Khối lệnh, biểu thức Scratch vẽ tĩnh (lớp CSS của engine) ----------
const V = (n) => `<span class="sb-rep sb-rv">${n}</span>`;                      // biến (ô cam)
const T = (t) => `<span class="sb-in">${t}</span>`;                                // ô chữ trắng
const N = (t) => `<span class="sb-in sb-num">${t}</span>`;                         // ô số trắng
const OP = (h) => `<span class="sb-rep sb-rop">${h}</span>`;                       // phép toán số / xâu (ô xanh bo tròn)
const BOOL = (h) => `<span class="sb-bool">${h}</span>`;                           // phép toán lôgic (ô lục giác)
const EXPR = (h) => `<div style="display:flex;justify-content:center;margin:10px 0;font-weight:700;font-size:1.5rem;line-height:1.6"><span class="sb" style="background:transparent;box-shadow:none;color:#333;padding:0">${h}</span></div>`;
const B = (cat, html, n, hat) => `<div class="sb sb-${cat}${hat ? " sb-hat" : ""}">${html}${n ? `<i class="sb-n">${"①②③④⑤⑥⑦⑧"[n - 1]}</i>` : ""}</div>`;
const LOOP = (label, inner, n) => `<div class="sb sb-c sb-control"><div class="sb-row">${label}${n ? `<i class="sb-n">${"①②③④⑤⑥⑦⑧"[n - 1]}</i>` : ""}</div><div class="sb-inner">${inner.join("")}</div><div class="sb-foot">↻</div></div>`;
const STACK = (blocks) => `<div class="sb-stack">${blocks.join("")}</div>`;
const JOIN_N = OP("kết hợp " + T("Đường đi là hình có ") + OP("kết hợp " + V("n") + T(" cạnh bằng nhau")));
// Chương trình Hình 13.4 (đánh số ① … ⑧ như SGK)
const H134 = STACK([
  B("event", "khi bấm vào <b class='sb-flag'>🏁</b>", 0, true),
  B("sensing", "hỏi " + T("Hãy nhập số cạnh:") + " và đợi", 1),
  B("variables", "đặt " + T("n ▾") + " thành " + `<span class="sb-rep sb-rsen">trả lời</span>`, 2),
  B("looks", "nói " + JOIN_N, 3),
  B("pen", "✏️ xoá tất cả"), B("pen", "✏️ đặt bút"), B("pen", `✏️ chọn bút màu <span style="display:inline-block;width:20px;height:20px;border-radius:50%;background:#5b21b6;border:2px solid #fff;vertical-align:middle"></span>`),
  B("variables", "đặt " + T("số bước ▾") + " thành " + OP(N(900) + " / " + V("n")), 4),
  B("variables", "đặt " + T("góc quay ▾") + " thành " + OP(N(360) + " / " + V("n")), 5),
  LOOP("lặp lại " + V("n"), [B("motion", "di chuyển " + V("số bước") + " bước", 7), B("motion", "xoay ↺ " + V("góc quay") + " độ", 8), B("control", "đợi " + N(1) + " giây")], 6),
  B("pen", "✏️ nhấc bút"),
]);
const IMG = (src, cap, w) => `<figure style="margin:0 auto;max-width:${w || 640}px"><img src="${src}" alt="${cap}" style="width:100%;border-radius:8px"><figcaption class="caption">${cap}</figcaption></figure>`;
// Bảng tính Hình 13.2
const SHEET = { title: "HoatDong1.xlsx", cols: 4, rows: 4, cells: { A1: "3", B1: "5" }, center: ["A1:B1"] };

const LESSON = {
  meta: {
    subject: "Tin học", grade: "8", book: "Kết nối tri thức với cuộc sống",
    title: "Bài 13: Biểu diễn dữ liệu", unit: "Chủ đề 5 — Giải quyết vấn đề với sự trợ giúp của máy tính",
    pages: "76–79", durationMinutes: 90,
  },
  objectives: {
    knowledge: [
      "Nêu được khái niệm hằng, biến, kiểu dữ liệu, biểu thức.",
      "Sử dụng được các khái niệm này ở các chương trình đơn giản trong môi trường lập trình trực quan.",
    ],
    competencies: [
      "Tự chủ và tự học; giao tiếp và hợp tác (cặp đôi, nhóm bàn, 2 HS/máy); giải quyết vấn đề và sáng tạo (tổng quát hoá bài toán bằng biến).",
      "Năng lực số 3.4.TC2a: nhận biết, phân loại kiểu dữ liệu; phân biệt hằng, biến, biểu thức; dùng biến để tổng quát hoá bài toán.",
      "Năng lực AI: có thể nhờ AI giải thích khái niệm, kiểm tra chương trình nhưng phải tự chạy thử, kiểm chứng.",
    ],
    qualities: ["Chăm chỉ, kiên trì chạy thử và sửa chương trình; trung thực, không sao chép chương trình của người khác."],
  },
  coreKnowledge: [
    "Mỗi kiểu dữ liệu là một tập hợp các giá trị mà một biến thuộc kiểu đó có thể nhận; mỗi kiểu dữ liệu được trang bị một số phép toán.",
    "Ba kiểu dữ liệu phổ biến trong ngôn ngữ lập trình trực quan: kiểu số (số nguyên, số thập phân), kiểu xâu kí tự, kiểu lôgic (true, false).",
    "Phép toán: số — cộng, trừ, nhân, chia, chia lấy dư, làm tròn; xâu — kết hợp; lôgic — so sánh (=, <, >), và, hoặc, không phải.",
    "Biến dùng để lưu trữ giá trị có thể thay đổi trong quá trình thực hiện chương trình, được nhận biết qua tên và thuộc một kiểu dữ liệu nhất định.",
    "Hằng là giá trị không đổi trong quá trình thực hiện chương trình. Biểu thức là sự kết hợp của biến, hằng, dấu ngoặc, phép toán và các hàm để trả lại giá trị thuộc một kiểu dữ liệu nhất định.",
  ],
  keywords: ["Kiểu dữ liệu", "Số – Xâu kí tự – Lôgic", "Biến", "Hằng", "Biểu thức"],
  settings: { basePoints: 100, useTimer: false, defaultTime: 60, sound: true, streakEnabled: true },

  activities: [
    /* =========================== TIẾT 1 =========================== */
    /* ===================== HĐ1: MỞ ĐẦU (5 phút) ===================== */
    {
      id: "mo-dau", name: "Mở đầu — Kiểu dữ liệu trong bảng tính 📊", type: "knowledge",
      goal: "Nhắc lại các kiểu dữ liệu đã học trong phần mềm bảng tính (Tin học 7).",
      time: 300,
      task: "Trong chương trình Tin học lớp 7, em đã được học về các kiểu dữ liệu trong phần mềm bảng tính. Em hãy cho biết đó là những kiểu dữ liệu nào?",
      sgkImage: "assets/sgk/mo-dau.jpg",
      content: {
        revealLabel: "📌 Giáo viên chốt",
        blocks: [
          { kind: "list", value: [
            "Bảng tính có dữ liệu kiểu văn bản, số, ngày tháng; ô tính còn có thể chứa công thức (bắt đầu bằng dấu “=”, sau đó là biểu thức).",
            "Với ngôn ngữ lập trình, dữ liệu được phân thành những kiểu nào? Cùng khám phá qua bài học hôm nay!",
          ] },
        ],
      },
      questions: [
        { question: "Những kiểu dữ liệu nào em đã học trong phần mềm bảng tính? (Chọn tất cả ý đúng)", type: "multiple-select",
          options: ["Số", "Văn bản", "Ngày tháng", "Âm thanh"],
          answer: [0, 1, 2], explanation: "Bảng tính có dữ liệu kiểu số, văn bản, ngày tháng (ô tính còn có thể chứa công thức). Âm thanh không phải kiểu dữ liệu của ô tính.", level: "nhan-biet", activity: "mo-dau" },
      ],
    },

    /* ===================== HĐ2.1: KIỂU DỮ LIỆU (10 phút) ===================== */
    {
      id: "hd1-kieu-du-lieu", name: "1. Hoạt động 1: Kiểu dữ liệu 🔢🔤✅", type: "knowledge",
      goal: "Ghép dữ liệu với kiểu dữ liệu; nhập công thức Hình 13.2 và quan sát kết quả ở C1, C2, C3.",
      time: 480,
      task: "Cặp đôi (5 phút): 1) Ghép mỗi dòng ở cột Dữ liệu với một dòng phù hợp ở cột Kiểu dữ liệu trong Hình 13.1. 2) Nhập dữ liệu và công thức theo mẫu trong Hình 13.2 vào bảng tính bên dưới và cho biết kết quả hiển thị ở các ô C1, C2, C3.",
      sgkImage: "assets/sgk/hoat-dong-1.jpg",
      html: IMG("assets/sgk/hinh-13-1-2.jpg", "Hình 13.1. Dữ liệu và kiểu dữ liệu · Hình 13.2. Các phép toán", 620),
      sheet: SHEET,
      questions: [
        { question: "Hình 13.1: Dữ liệu “Tin học” thuộc kiểu dữ liệu nào?", type: "multiple-choice",
          options: ["Số", "Văn bản", "Ngày tháng", "Lôgic"],
          answer: 1, explanation: "Tin học là dữ liệu thuộc kiểu văn bản.", level: "nhan-biet", activity: "hd1-kieu-du-lieu" },
        { question: "Hình 13.1: Dữ liệu 3.141592 thuộc kiểu dữ liệu nào?", type: "multiple-choice",
          options: ["Số", "Văn bản", "Lôgic", "Ngày tháng"],
          answer: 0, explanation: "3.141592 là dữ liệu thuộc kiểu số.", level: "nhan-biet", activity: "hd1-kieu-du-lieu" },
        { question: "Nhập vào ô C1 công thức theo mẫu Hình 13.2 (cộng A1 và B1).", type: "sheet", mode: "formula", target: "C1", answer: "=A1+B1",
          explanation: "=A1+B1 cộng số 3 và số 5, cho kết quả 8 là một giá trị số.", level: "nhan-biet", activity: "hd1-kieu-du-lieu" },
        { question: "Nhập vào ô C2 công thức theo mẫu Hình 13.2 (ghép A1 và B1 bằng dấu &).", type: "sheet", mode: "formula", target: "C2", answer: "=A1&B1",
          explanation: "=A1&B1 ghép kí tự 3 và kí tự 5, cho kết quả là xâu kí tự 35.", level: "thong-hieu", activity: "hd1-kieu-du-lieu" },
        { question: "Nhập vào ô C3 công thức theo mẫu Hình 13.2 (kiểm tra A1 có nhỏ hơn B1 không).", type: "sheet", mode: "formula", target: "C3", answer: "=A1<B1",
          explanation: "=A1<B1 kiểm tra số 3 có nhỏ hơn số 5 hay không, cho kết quả TRUE (đúng) là giá trị thuộc kiểu lôgic.", level: "thong-hieu", activity: "hd1-kieu-du-lieu" },
      ],
    },
    {
      id: "kieu-du-lieu-scratch", name: "Phiếu học tập: Kiểu dữ liệu trong Scratch 📋", type: "knowledge",
      goal: "Gọi tên kiểu dữ liệu ở C1, C2, C3; biết mỗi kiểu dữ liệu gồm tập hợp giá trị và phép toán; ba kiểu dữ liệu của Scratch.",
      time: 480,
      task: "Cá nhân: Nghiên cứu phần đọc – hiểu SGK tr.76–77 và trả lời Phiếu học tập: 1) Gọi tên kiểu dữ liệu ở C1, C2, C3. 2) Mỗi kiểu dữ liệu bao gồm những gì? 3) Scratch có những kiểu dữ liệu cơ bản nào? 4) Lấy ví dụ dữ liệu kiểu số, xâu kí tự, lôgic.",
      sgkImage: "assets/sgk/kien-thuc-1.jpg",
      html: IMG("assets/sgk/hinh-13-3.jpg", "Hình 13.3. Kết quả các phép toán", 260),
      content: {
        revealLabel: "📖 Kiểu dữ liệu (SGK tr.76–77)",
        blocks: [
          { kind: "list", value: [
            "Ô C1 thực hiện phép cộng số 3 và số 5, cho kết quả 8 là một giá trị số.",
            "Ô C2 thực hiện phép ghép kí tự 3 và kí tự 5, cho kết quả là xâu kí tự 35.",
            "Ô C3 kiểm tra xem số 3 có nhỏ hơn số 5 hay không, cho kết quả TRUE (đúng) là giá trị thuộc kiểu lôgic.",
          ] },
          { kind: "text", value: "Trong các ngôn ngữ lập trình, dữ liệu được phân loại thành những kiểu khác nhau để có thể lưu trữ và áp dụng những phép toán phù hợp. Số được phân loại thành kiểu số nguyên hoặc số thực, văn bản được phân loại thành kiểu kí tự hoặc xâu kí tự, các điều kiện hay các phép so sánh được phân loại thành kiểu lôgic,… Mỗi kiểu dữ liệu bao gồm một tập hợp giá trị và một số phép toán trên những giá trị đó. Ngôn ngữ lập trình Scratch có ba kiểu dữ liệu là kiểu số, kiểu xâu kí tự và kiểu lôgic." },
          { kind: "image", value: "assets/sgk/bang-13-1.jpg", caption: "Bảng 13.1. Tập hợp giá trị của các kiểu dữ liệu trong ngôn ngữ lập trình Scratch" },
          { kind: "image", value: "assets/sgk/bang-13-2.jpg", caption: "Bảng 13.2. Các phép toán cơ bản trong ngôn ngữ lập trình Scratch" },
        ],
      },
      remember: [
        "Mỗi kiểu dữ liệu là một tập hợp các giá trị mà một biến thuộc kiểu đó có thể nhận. Mỗi kiểu dữ liệu được trang bị một số phép toán.",
        "Ba kiểu dữ liệu phổ biến trong ngôn ngữ lập trình trực quan là: kiểu số, kiểu xâu kí tự, kiểu lôgic.",
      ],
      questions: [
        { question: "Câu 1. Kết quả ở các ô C1 (8), C2 (35), C3 (TRUE) lần lượt thuộc kiểu dữ liệu nào?", type: "multiple-choice",
          options: ["Số – Số – Lôgic", "Xâu kí tự – Số – Lôgic", "Số – Xâu kí tự – Lôgic", "Số – Xâu kí tự – Số"],
          answer: 2, explanation: "C1 = 8 là số; C2 = 35 là xâu kí tự được ghép từ kí tự 3 và 5; C3 = TRUE là giá trị lôgic.", level: "thong-hieu", activity: "kieu-du-lieu-scratch" },
        { question: "Câu 2. Mỗi kiểu dữ liệu bao gồm những gì?", type: "multiple-choice",
          options: ["Chỉ gồm các con số", "Một tập hợp giá trị và một số phép toán trên những giá trị đó", "Chỉ gồm các phép so sánh", "Tên biến và tên nhân vật"],
          answer: 1, explanation: "Mỗi kiểu dữ liệu bao gồm một tập hợp giá trị và một số phép toán trên những giá trị đó.", level: "nhan-biet", activity: "kieu-du-lieu-scratch" },
        { question: "Câu 3. Ngôn ngữ lập trình Scratch có những kiểu dữ liệu cơ bản nào?", type: "multiple-choice",
          options: ["Số, ngày tháng, công thức", "Văn bản, hình ảnh, âm thanh", "Số nguyên, phân số, hỗn số", "Kiểu số, kiểu xâu kí tự, kiểu lôgic"],
          answer: 3, explanation: "Scratch có ba kiểu dữ liệu: số, xâu kí tự và lôgic (Bảng 13.1).", level: "nhan-biet", activity: "kieu-du-lieu-scratch" },
        { question: "Câu 4. Kiểu lôgic trong Scratch có tập hợp giá trị là gì?", type: "multiple-choice",
          options: ["Hai giá trị true (đúng) và false (sai)", "Mọi số nguyên", "Các kí tự @, #, $", "Các xâu “Đúng”, “Sai”, “Có thể”"],
          answer: 0, explanation: "Bảng 13.1: kiểu lôgic có hai giá trị true (đúng) và false (sai).", level: "nhan-biet", activity: "kieu-du-lieu-scratch" },
      ],
    },
    {
      id: "phan-loai-kieu", name: "Trò chơi: Phân loại kiểu dữ liệu 🧺", type: "dragdrop",
      goal: "Phân loại giá trị và kết quả phép toán theo ba kiểu dữ liệu của Scratch.",
      time: 240,
      task: "Xếp mỗi giá trị (hoặc kết quả của phép toán) vào đúng kiểu dữ liệu trong Scratch rồi bấm Nộp bài.",
      layout: "cols",
      groups: ["🔢 Số", "🔤 Xâu kí tự", "✅ Lôgic"],
      items: [
        { text: "15", group: 0 }, { text: "3.141592", group: 0 }, { text: "Kết quả của (13 chia lấy dư 4)", group: 0 },
        { text: "@", group: 1 }, { text: "Computer", group: 1 }, { text: "Kết quả của (kết hợp “táo” “chuối”)", group: 1 },
        { text: "true", group: 2 }, { text: "false", group: 2 }, { text: "Kết quả của (70 > 50)", group: 2 },
      ],
      explanation: "Số: số nguyên, số thập phân, kết quả chia lấy dư. Xâu kí tự: kí tự, xâu kí tự, kết quả phép kết hợp. Lôgic: true, false, kết quả phép so sánh.",
    },
    {
      id: "doan-ket-qua", name: "Đoán nhanh kết quả phép toán 🔮", type: "quiz",
      goal: "Vận dụng các phép toán cơ bản của Scratch (Bảng 13.2) để dự đoán kết quả.",
      time: 360,
      task: "Quan sát từng phép toán Scratch và dự đoán kết quả trả lại.",
      questions: [
        { question: "Phép toán này trả lại kết quả nào?", type: "multiple-choice", html: EXPR(OP(N(17) + " chia lấy dư " + N(5))),
          options: ["3", "2", "3.4", "12"],
          answer: 1, explanation: "17 = 5 × 3 + 2 nên 17 chia lấy dư 5 bằng 2 (kiểu số).", level: "thong-hieu", activity: "doan-ket-qua" },
        { question: "Phép toán này trả lại kết quả nào?", type: "multiple-choice", html: EXPR(BOOL(BOOL(N(70) + " > " + N(50)) + " và " + BOOL(N(80) + " < " + N(50)))),
          options: ["true", "70", "false", "50"],
          answer: 2, explanation: "Phép và chỉ đúng khi hai biểu thức thành phần đều đúng; (80 < 50) sai nên kết quả là false.", level: "thong-hieu", activity: "doan-ket-qua" },
        { question: "Phép toán này trả lại kết quả nào?", type: "multiple-choice", html: EXPR(BOOL(BOOL(N(50) + " = " + N(50)) + " hoặc " + BOOL(N(30) + " > " + N(50)))),
          options: ["true", "false", "50", "30"],
          answer: 0, explanation: "Phép hoặc chỉ sai khi hai biểu thức thành phần đều sai; (50 = 50) đúng nên kết quả là true.", level: "thong-hieu", activity: "doan-ket-qua" },
        { question: "Phép toán này trả lại kết quả nào?", type: "multiple-choice", html: EXPR(BOOL("không phải " + BOOL(N(50) + " = " + N(50)))),
          options: ["true", "50", "không xác định", "false"],
          answer: 3, explanation: "(50 = 50) đúng nên “không phải” cho kết quả false.", level: "thong-hieu", activity: "doan-ket-qua" },
        { question: "Phép toán này trả lại kết quả nào?", type: "multiple-choice", html: EXPR(OP("làm tròn " + N("3.6"))),
          options: ["3", "4", "3.6", "true"],
          answer: 1, explanation: "Làm tròn 3.6 được 4 (kiểu số).", level: "nhan-biet", activity: "doan-ket-qua" },
        { question: "Phép toán này trả lại kết quả nào?", type: "multiple-choice", html: EXPR(BOOL(BOOL(N(10) + " > " + N(3)) + " và " + BOOL("không phải " + BOOL(N(2) + " = " + N(5))))),
          options: ["false", "10", "true", "5"],
          answer: 2, explanation: "(10 > 3) đúng; (2 = 5) sai nên “không phải (2 = 5)” đúng. Hai thành phần đều đúng → và cho kết quả true.", level: "van-dung-cao", activity: "doan-ket-qua" },
      ],
    },

    /* ===================== HĐ2.2: HẰNG, BIẾN, BIỂU THỨC (20 phút) ===================== */
    {
      id: "hd2-hang-bien", name: "2. Hoạt động 2: Hằng, biến, biểu thức 📦", type: "knowledge",
      goal: "Hiểu vai trò của biến trong việc tổng quát hoá bài toán; nêu khái niệm hằng, biến, biểu thức.",
      time: 480,
      task: "Nhóm bàn (3 phút): Trong Bài 12, em đã tạo chương trình để chú Bọ rùa di chuyển theo đường đi là một tam giác đều. Làm thế nào để tổng quát bài toán với đường đi của nhân vật là một hình đa giác đều có số cạnh bất kì được nhập vào từ bàn phím? Sau đó đọc SGK tr.78: nêu hiểu biết của em về biến, hằng và biểu thức.",
      sgkImage: "assets/sgk/hoat-dong-2.jpg",
      content: {
        revealLabel: "📖 Hằng, biến, biểu thức (SGK tr.78)",
        blocks: [
          { kind: "text", value: "Trong lập trình, biến được dùng để lưu trữ giá trị có thể thay đổi trong khi thực hiện chương trình. Biến được nhận biết qua tên của nó. Ví dụ: số cạnh của hình mà nhân vật di chuyển trong bài toán tổng quát ở Hoạt động 2 là một biến, nó được đặt tên n và lưu trữ một giá trị số, chẳng hạn số 6." },
          { kind: "text", value: "Hằng là giá trị không đổi trong quá trình thực hiện chương trình. Chẳng hạn, 3.14 là hằng kiểu số (hằng số); “Xin chào!” là hằng kiểu xâu kí tự; true là hằng kiểu lôgic;… Mỗi hằng thuộc một kiểu dữ liệu nhất định." },
          { kind: "text", value: "Biểu thức là sự kết hợp của biến, hằng, dấu ngoặc, phép toán và các hàm để trả lại giá trị thuộc một kiểu dữ liệu nhất định. Chẳng hạn, chu vi của đường tròn bán kính r có thể được tính gần đúng bằng biểu thức kiểu số:" },
          { kind: "html", value: EXPR(OP(N(2) + " * " + N("3.14") + " * " + V("r"))) },
        ],
      },
      remember: [
        "Biến được dùng để lưu trữ giá trị có thể thay đổi trong quá trình thực hiện chương trình. Biến được nhận biết qua tên của nó và thuộc một kiểu dữ liệu nhất định.",
        "Hằng là giá trị không đổi trong quá trình thực hiện chương trình. Mỗi hằng thuộc một kiểu dữ liệu nhất định (hằng kiểu số, hằng kiểu xâu kí tự, hằng kiểu lôgic,…).",
        "Biểu thức là sự kết hợp của biến, hằng, dấu ngoặc, phép toán và các hàm để trả lại giá trị thuộc một kiểu dữ liệu nhất định.",
      ],
      questions: [
        { question: "Hoạt động 2: Để tổng quát bài toán vẽ đa giác đều có số cạnh bất kì nhập từ bàn phím, ta làm thế nào?", type: "multiple-choice",
          options: ["Viết riêng một chương trình cho mỗi hình", "Dùng một biến (VD n) lưu số cạnh, giá trị của n được nhập từ bàn phím", "Luôn lặp lại 3 lần", "Chỉ đổi màu bút"],
          answer: 1, explanation: "Số cạnh thay đổi theo mỗi lần nhập nên dùng biến n để lưu số cạnh; số lần lặp, số bước, góc quay tính theo n.", level: "van-dung", activity: "hd2-hang-bien" },
        { question: "Trong biểu thức (2 * 3.14 * r), đâu là biến?", type: "multiple-choice",
          options: ["2", "3.14", "Dấu *", "r"],
          answer: 3, explanation: "r là biến (lưu bán kính, có thể thay đổi); 2 và 3.14 là hằng số; * là phép toán.", level: "nhan-biet", activity: "hd2-hang-bien" },
        { question: "“Xin chào!” trong chương trình là gì?", type: "multiple-choice",
          options: ["Hằng kiểu xâu kí tự", "Biến kiểu số", "Hằng kiểu lôgic", "Biểu thức kiểu số"],
          answer: 0, explanation: "“Xin chào!” là giá trị không đổi thuộc kiểu xâu kí tự — hằng kiểu xâu kí tự.", level: "nhan-biet", activity: "hd2-hang-bien" },
      ],
    },
    {
      id: "trac-nghiem-nhanh", name: "Trò chơi: Trắc nghiệm nhanh ⚡", type: "quiz",
      goal: "Củng cố kiểu dữ liệu kết quả của phép toán; nhận biết hằng, biến, biểu thức trong chương trình Hình 13.4.",
      time: 420,
      task: "Cả lớp trả lời nhanh trên máy (hoặc giơ tay). Câu 1: ghép mỗi phép toán với kiểu dữ liệu kết quả (câu hỏi SGK tr.77). Câu 2–5: quan sát chương trình Hình 13.4 — chỉ ra hằng, biến, biểu thức và kiểu dữ liệu (câu hỏi SGK tr.78).",
      sgkImage: "assets/sgk/cau-hoi-tr77.jpg",
      questions: [
        { question: "Câu 1a. Phép toán này trả lại giá trị thuộc kiểu dữ liệu nào?", type: "multiple-choice", html: EXPR(OP("kết hợp " + T("Diện tích hình tròn là:") + " " + V("s"))),
          options: ["Số", "Xâu kí tự", "Lôgic"],
          answer: 1, explanation: "Phép kết hợp nối các xâu kí tự tạo ra xâu kí tự mới.", level: "thong-hieu", activity: "trac-nghiem-nhanh" },
        { question: "Câu 1b. Phép toán này trả lại giá trị thuộc kiểu dữ liệu nào?", type: "multiple-choice", html: EXPR(BOOL(OP(V("n") + " chia lấy dư " + N(2)) + " = " + N(0))),
          options: ["Số", "Xâu kí tự", "Lôgic"],
          answer: 2, explanation: "Phép so sánh bằng (=) trả lại true hoặc false — kiểu lôgic.", level: "thong-hieu", activity: "trac-nghiem-nhanh" },
        { question: "Câu 1c. Phép toán này trả lại giá trị thuộc kiểu dữ liệu nào?", type: "multiple-choice", html: EXPR(OP("làm tròn " + OP(N("3.141592") + " * " + V("r") + " * " + V("r")))),
          options: ["Số", "Xâu kí tự", "Lôgic"],
          answer: 0, explanation: "Làm tròn một số cho kết quả là số.", level: "thong-hieu", activity: "trac-nghiem-nhanh" },
        { question: "Câu 2. Trong chương trình Hình 13.4, các số 900, 360, 1 là hằng, biến hay biểu thức?", type: "multiple-choice", html: H134,
          options: ["Biến", "Biểu thức", "Hằng"],
          answer: 2, explanation: "900, 360, 1 là các giá trị không đổi khi chương trình chạy — đó là hằng (kiểu số).", level: "nhan-biet", activity: "trac-nghiem-nhanh" },
        { question: "Câu 3. Chọn đáp án là biến trong chương trình Hình 13.4:", type: "multiple-choice", html: H134,
          options: ["n, số bước, góc quay", "(900 / n), (360 / n)", "Cả hai đáp án A và B"],
          answer: 0, explanation: "n, số bước, góc quay là các biến; (900 / n), (360 / n) là biểu thức.", level: "thong-hieu", activity: "trac-nghiem-nhanh" },
        { question: "Câu 4. Biểu thức ở lệnh ③ trả lại giá trị thuộc kiểu dữ liệu nào?", type: "multiple-choice", html: EXPR(JOIN_N),
          options: ["Số", "Xâu kí tự", "Lôgic"],
          answer: 1, explanation: "Phép kết hợp trả lại xâu kí tự, VD “Đường đi là hình có 6 cạnh bằng nhau”.", level: "thong-hieu", activity: "trac-nghiem-nhanh" },
        { question: "Câu 5. Các biểu thức (900 / n), (360 / n) trả lại giá trị thuộc kiểu dữ liệu nào?", type: "multiple-choice", html: EXPR(OP(N(900) + " / " + V("n")) + " &nbsp; " + OP(N(360) + " / " + V("n"))),
          options: ["Số", "Xâu kí tự", "Lôgic"],
          answer: 0, explanation: "Phép chia hai số cho kết quả kiểu số.", level: "thong-hieu", activity: "trac-nghiem-nhanh" },
      ],
    },

    /* =========================== TIẾT 2 =========================== */
    /* ===================== HĐ2.3: THỰC HÀNH (40 phút) ===================== */
    {
      id: "thuc-hanh", name: "3. Thực hành: Đường đi có số cạnh nhập từ bàn phím 🐞", type: "knowledge",
      goal: "Sử dụng hằng, biến, biểu thức để nâng cấp chương trình VeHinh.sb3 thành DuongDi.sb3 như Hình 13.4.",
      time: 1800,
      task: "2 HS/máy: Mở tệp VeHinh.sb3 đã lưu ở Bài 12, bổ sung câu lệnh để được chương trình nâng cấp điều khiển nhân vật di chuyển theo hình có số cạnh nhập vào từ bàn phím như Hình 13.4. Chạy thử với n = 3, 4, 5, 6.",
      sgkImage: "assets/sgk/nhiem-vu.jpg",
      html: IMG("assets/sgk/hinh-13-4.jpg", "Hình 13.4. Chương trình điều khiển nhân vật di chuyển theo hình có số cạnh được nhập vào từ bàn phím", 480),
      content: {
        revealLabel: "🔢 Hướng dẫn (SGK tr.78–79)",
        blocks: [
          { kind: "list", value: [
            "Bước 1. Mở tệp chương trình VeHinh.sb3 trong Scratch, chọn chế độ hiển thị tiếng Việt. Lưu tệp với tên mới là DuongDi.sb3.",
            "Bước 2. Nháy chuột vào nhóm lệnh Các biến số, tạo các biến số n, số bước, góc quay.",
            "Bước 3. Nháy chuột vào nhóm lệnh Cảm biến, Các biến số, Hiển thị và hoàn thành lệnh 1, 2, 3 của chương trình.",
            "Bước 4. Nháy chuột vào nhóm lệnh Các phép toán để tạo hai biểu thức (900 / n) và (360 / n).",
            "Bước 5. Nháy chuột vào nhóm lệnh Các biến số, kéo thả và hoàn thành hai câu lệnh 4, 5.",
            "Bước 6. Nháy chuột vào nhóm lệnh Các biến số, kéo thả các biến vào vị trí tương ứng trong các câu lệnh 6, 7, 8.",
            "Bước 7. Nháy chuột vào nút 🏁 để chạy chương trình và xem kết quả.",
          ] },
          { kind: "html", value: H134 },
        ],
      },
      questions: [
        { question: "Chương trình nâng cấp được lưu với tên tệp mới nào?", type: "multiple-choice",
          options: ["VeHinh.sb3", "DuongDi.sb3", "TamGiac.sb3", "DuongDi.pptx"],
          answer: 1, explanation: "Bước 1: lưu tệp với tên mới là DuongDi.sb3.", level: "nhan-biet", activity: "thuc-hanh" },
        { question: "Lệnh “hỏi Hãy nhập số cạnh: và đợi” nằm trong nhóm lệnh nào?", type: "multiple-choice",
          options: ["Chuyển động", "Hiển thị", "Cảm biến", "Bút vẽ"],
          answer: 2, explanation: "Lệnh hỏi … và đợi và giá trị trả lời thuộc nhóm Cảm biến.", level: "nhan-biet", activity: "thuc-hanh" },
        { question: "Chạy chương trình và nhập n = 6. Biến số bước và góc quay nhận giá trị nào?", type: "multiple-choice",
          options: ["số bước = 150, góc quay = 60", "số bước = 900, góc quay = 360", "số bước = 6, góc quay = 6", "số bước = 60, góc quay = 150"],
          answer: 0, explanation: "số bước = 900 / 6 = 150; góc quay = 360 / 6 = 60. Nhân vật đi theo lục giác đều.", level: "van-dung", activity: "thuc-hanh" },
        { question: "Nhập n = 4 thì nhân vật nói gì?", type: "multiple-choice",
          options: ["Hãy nhập số cạnh:", "4", "Đường đi là hình có n cạnh bằng nhau", "Đường đi là hình có 4 cạnh bằng nhau"],
          answer: 3, explanation: "Lệnh ③ kết hợp xâu “Đường đi là hình có ”, giá trị của biến n và xâu “ cạnh bằng nhau”.", level: "thong-hieu", activity: "thuc-hanh" },
      ],
    },
    {
      id: "sap-xep-lenh", name: "Trò chơi: Sắp xếp lệnh chương trình Hình 13.4 🧩", type: "ordering",
      goal: "Ghi nhớ trình tự: nhập dữ liệu → gán biến → tính biểu thức → lặp.",
      time: 180,
      task: "Sắp xếp các lệnh chính của chương trình Hình 13.4 cho đúng thứ tự (đã lược bớt các lệnh Bút vẽ và đợi; đặt số bước trước, góc quay sau; lệnh di chuyển và xoay xếp ngay sau lặp lại) rồi bấm Nộp bài.",
      steps: ["khi bấm vào 🏁", "hỏi (Hãy nhập số cạnh:) và đợi", "đặt n thành (trả lời)", "nói (kết hợp Đường đi là hình có … n … cạnh bằng nhau)", "đặt số bước thành (900 / n)", "đặt góc quay thành (360 / n)", "lặp lại (n)", "di chuyển (số bước) bước", "xoay ↺ (góc quay) độ"],
      blocks: ["event", "sensing", "variables", "looks", "variables", "variables", "control", "motion", "motion"],
      explanation: "Hỏi và nhận số cạnh → lưu vào n → nói thông báo → tính số bước, góc quay → lặp lại n lần: di chuyển, xoay.",
    },

    /* ===================== HĐ3: LUYỆN TẬP (10 phút) ===================== */
    {
      id: "luyen-tap-1", name: "Luyện tập 1: Giá trị và kiểu dữ liệu của biểu thức (r = 5) 🧮", type: "quiz",
      goal: "Tính giá trị trả lại và xác định kiểu dữ liệu của biểu thức khi r = 5.",
      time: 300,
      task: "Cá nhân: Giả sử r là biến lưu giá trị của bán kính hình tròn. Cho biết giá trị trả lại của các biểu thức sau và kiểu dữ liệu của chúng trong Scratch với trường hợp r = 5.",
      sgkImage: "assets/sgk/luyen-tap.jpg",
      questions: [
        { question: "a) Với r = 5, biểu thức này trả lại gì?", type: "multiple-choice", html: EXPR(BOOL(V("r") + " > " + N(0))),
          options: ["5 — kiểu số", "false — kiểu lôgic", "true — kiểu lôgic", "r > 0 — kiểu xâu kí tự"],
          answer: 2, explanation: "5 > 0 đúng nên trả lại true, thuộc kiểu lôgic.", level: "van-dung", activity: "luyen-tap-1" },
        { question: "b) Với r = 5, biểu thức này trả lại gì?", type: "multiple-choice", html: EXPR(OP(N(2) + " * " + N("3.14") + " * " + V("r"))),
          options: ["31.4 — kiểu số", "10 — kiểu số", "31.4 — kiểu xâu kí tự", "true — kiểu lôgic"],
          answer: 0, explanation: "2 × 3.14 × 5 = 31.4, kiểu số.", level: "van-dung", activity: "luyen-tap-1" },
        { question: "c) Với r = 5, biểu thức này trả lại giá trị thuộc kiểu dữ liệu nào?", type: "multiple-choice", html: EXPR(OP("kết hợp " + T("Chu vi đường tròn là") + " " + OP(N(2) + " * " + N("3.14") + " * " + V("r")))),
          options: ["Số", "Lôgic", "Không có kiểu dữ liệu", "Xâu kí tự — “Chu vi đường tròn là” ghép với 31.4"],
          answer: 3, explanation: "Phép kết hợp ghép xâu “Chu vi đường tròn là” với 31.4, trả lại một xâu kí tự.", level: "van-dung", activity: "luyen-tap-1" },
      ],
    },
    {
      id: "luyen-tap-2", name: "Luyện tập 2: Chu vi đường tròn, diện tích hình tròn ⭕", type: "knowledge",
      goal: "Viết chương trình tính chu vi, diện tích với bán kính nhập từ bàn phím, thông báo kết quả.",
      time: 480,
      task: "Cặp đôi trên máy: Dùng ngôn ngữ lập trình trực quan viết chương trình tính chu vi đường tròn, diện tích hình tròn với giá trị bán kính được nhập vào từ bàn phím, thông báo kết quả ra màn hình. Trước khi làm, bấm 🏁 chạy thử chương trình mẫu bên dưới với r = 5 và r = 10.",
      sgkImage: "assets/sgk/luyen-tap.jpg",
      scratch: {
        title: "Chương trình mẫu: chu vi và diện tích",
        intro: "Chú mèo hỏi bán kính, tính chu vi, diện tích rồi nói kết quả (chữ số thập phân hiện dấu phẩy).",
        script: [
          { op: "flag" },
          { op: "ask", text: "Hãy nhập bán kính:" },
          { op: "set", var: "r", answer: true },
          { op: "set", var: "chu vi", expr: "2 * 3.14 * r", show: "2 * 3.14 * r" },
          { op: "set", var: "diện tích", expr: "3.14 * r * r", show: "3.14 * r * r" },
          { op: "say", join: ["Chu vi đường tròn là ", { v: "chu vi" }], secs: 2 },
          { op: "say", join: ["Diện tích hình tròn là ", { v: "diện tích" }], secs: 2 },
        ],
      },
      questions: [
        { question: "Trong chương trình mẫu, đâu là các biến?", type: "multiple-choice",
          options: ["2 và 3.14", "“Chu vi đường tròn là ”", "r, chu vi, diện tích", "hỏi và đợi"],
          answer: 2, explanation: "r, chu vi, diện tích là biến; 2, 3.14 là hằng số; “Chu vi đường tròn là ” là hằng xâu kí tự.", level: "thong-hieu", activity: "luyen-tap-2" },
        { question: "Với r = 10, chương trình nói diện tích hình tròn là bao nhiêu?", type: "multiple-choice",
          options: ["62.8", "314", "31.4", "100"],
          answer: 1, explanation: "3.14 × 10 × 10 = 314.", level: "van-dung", activity: "luyen-tap-2" },
      ],
    },

    /* ===================== HĐ4: VẬN DỤNG (5 phút) ===================== */
    {
      id: "van-dung", name: "Vận dụng: Chương trình Scratch cho môn học của em 🎯", type: "knowledge",
      goal: "Viết chương trình Scratch giải một bài toán môn học, có dùng hằng, biến, biểu thức.",
      time: 300,
      task: "Em hãy viết chương trình Scratch của riêng mình để giải quyết một bài toán cụ thể trong một môn học như Khoa học tự nhiên, Toán,… trong đó có sử dụng hằng, biến và biểu thức để thực hiện thuật toán. Hoàn thiện ở nhà, gửi sản phẩm qua thư điện tử hoặc Zalo của thầy/cô.",
      sgkImage: "assets/sgk/van-dung.jpg",
      content: {
        revealLabel: "💡 Gợi ý bài toán (theo giáo án)",
        blocks: [
          { kind: "list", value: [
            "Tính một trong các giá trị vận tốc, quãng đường, thời gian khi biết hai giá trị còn lại.",
            "Giải phương trình bậc nhất ax + b = 0 với a, b nhập vào từ bàn phím.",
            "Tìm ước chung lớn nhất của hai số nguyên a, b nhập vào từ bàn phím.",
          ] },
          { kind: "text", value: "Tự kiểm tra: chương trình có biến (nhập từ bàn phím), hằng, biểu thức; thông báo kết quả rõ ràng; đã chạy thử với vài bộ dữ liệu khác nhau. Nếu nhờ AI gợi ý, em vẫn tự viết, chạy thử và kiểm chứng kết quả." },
        ],
      },
      questions: [
        { question: "Chương trình tính quãng đường s = v × t (v, t nhập từ bàn phím). Nhận định nào đúng?", type: "multiple-choice",
          options: ["v, t, s là hằng", "v, t, s là biến; (v * t) là biểu thức kiểu số", "(v * t) là biểu thức kiểu xâu kí tự", "Không cần biến"],
          answer: 1, explanation: "v, t nhập từ bàn phím và s thay đổi theo — đều là biến; v * t là biểu thức trả lại giá trị kiểu số.", level: "van-dung", activity: "van-dung" },
      ],
    },

    /* ===================== TỔNG KẾT ===================== */
    {
      id: "tong-ket", name: "Tổng kết", type: "summary",
      task: "Cả lớp nhắc lại kiến thức trọng tâm và làm thử thách cuối. Về nhà: hoàn thiện Vận dụng; đọc, tìm hiểu và chuẩn bị trước Bài 14: Cấu trúc điều khiển.",
      content: {
        learned: [
          "Ba kiểu dữ liệu của Scratch: số, xâu kí tự, lôgic; mỗi kiểu có tập hợp giá trị và các phép toán riêng.",
          "Biến lưu giá trị có thể thay đổi, nhận biết qua tên; hằng là giá trị không đổi.",
          "Biểu thức kết hợp biến, hằng, dấu ngoặc, phép toán, hàm để trả lại giá trị thuộc một kiểu dữ liệu.",
          "Dùng biến n nhập từ bàn phím để tổng quát hoá bài toán vẽ đa giác đều.",
        ],
        challenge: [
          { question: "Biểu thức nào trả lại giá trị kiểu lôgic?", type: "multiple-choice",
            options: ["(n chia lấy dư 2)", "(kết hợp “Lớp” “8A”)", "(làm tròn 2.5)", "((n chia lấy dư 2) = 0)"],
            answer: 3, explanation: "Phép so sánh bằng (=) trả lại true/false — kiểu lôgic. Ba biểu thức còn lại trả lại số hoặc xâu kí tự.", level: "van-dung-cao", activity: "tong-ket" },
          { question: "Chạy chương trình Hình 13.4 và nhập n = 5. Nhân vật đi theo hình gì, mỗi lần xoay bao nhiêu độ?", type: "multiple-choice",
            options: ["Ngũ giác đều, xoay 72 độ", "Hình vuông, xoay 90 độ", "Ngũ giác đều, xoay 180 độ", "Lục giác đều, xoay 60 độ"],
            answer: 0, explanation: "Lặp lại 5 lần, góc quay = 360 / 5 = 72 độ → ngũ giác đều (số bước = 900 / 5 = 180).", level: "van-dung-cao", activity: "tong-ket" },
        ],
      },
    },
  ],
};

if (typeof module !== "undefined" && module.exports) module.exports = LESSON;
if (typeof window !== "undefined") window.LESSON = LESSON;
