/* ============================================================================
 * BÀI 14 — GIẢI QUYẾT VẤN ĐỀ  (Tin học 9 — Kết nối tri thức)
 * Chủ đề 5: Giải quyết vấn đề với sự trợ giúp của máy tính.
 * Bám sát SGK trang 76–78 + Kế hoạch bài dạy (1 tiết) của giáo viên.
 * Chỉ sửa file này để đổi nội dung. Engine app.js không cần sửa.
 * Mê cung robot (activity.maze): "race" — 2 đội điều khiển robot thi thoát mê cung (Mở đầu);
 * "sim" — robot chạy thuật toán bám tường phải/trái từng lần lặp. Bản đồ: # tường · . lối đi · S lối vào · E lối ra.
 * ==========================================================================*/

const ME_CUNG_1 = [
  "#############",
  "#.....#.....E",
  "#.###.#.###.#",
  "#.#...#...#.#",
  "#.#.#####.#.#",
  "#...#...#.#.#",
  "###.#.#.#.#.#",
  "S.....#...#.#",
  "#############",
];
const ME_CUNG_2 = [
  "###############",
  "S...#.........#",
  "###.#.#######.#",
  "#...#.#.....#.#",
  "#.###.#.###.#.#",
  "#.#...#.#...#.#",
  "#.#.###.#.###.#",
  "#...#.....#...E",
  "###############",
];
// Lối ra ở giữa, tường bao quanh lối ra không nối với tường ngoài -> bám tường đi vòng mãi (đánh giá kết quả)
const ME_CUNG_3 = [
  "###########",
  "S.........#",
  "#.###.###.#",
  "#.#.....#.#",
  "#.#.###.#.#",
  "#.#.#E#.#.#",
  "#.#.#.#.#.#",
  "#.#.....#.#",
  "#.#######.#",
  "#.........#",
  "###########",
];
const MAZES = [
  { name: "Mê cung 1", map: ME_CUNG_1 },
  { name: "Mê cung 2", map: ME_CUNG_2 },
  { name: "Mê cung 3 — lối ra ở giữa", map: ME_CUNG_3 },
];

// ---- 5 bước giải quyết vấn đề (vẽ lại) ----
const BUOC = [["1", "Tìm hiểu vấn đề", "xác định những yếu tố đã cho và kết quả cần đạt", "#7c3aed"], ["2", "Phân tích vấn đề", "xem xét từng khía cạnh, đưa ra nhận định để tìm cách giải quyết", "#2563eb"],
  ["3", "Lựa chọn giải pháp", "dựa trên nhận định, tìm kiếm và lựa chọn cách giải quyết", "#0891b2"], ["4", "Thực hiện giải pháp", "triển khai giải pháp đã chọn để đạt mục tiêu", "#16a34a"],
  ["5", "Đánh giá kết quả", "xác định hiệu quả, phát hiện nhược điểm để cải tiến", "#ea580c"]];
const QUY_TRINH_HTML = `<div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:center;align-items:stretch">${BUOC.map(([n, t, d, c], i) =>
  `<div style="flex:1 1 170px;max-width:220px;border:3px solid ${c};border-radius:16px;padding:10px;background:#fff;text-align:center;position:relative">
    <div style="width:38px;height:38px;border-radius:50%;background:${c};color:#fff;font-weight:800;font-size:1.3rem;line-height:38px;margin:0 auto 6px">${n}</div>
    <b style="color:${c}">${t}</b><div style="font-size:.9rem;color:#475569;margin-top:4px">${d}</div></div>${i < 4 ? '<div style="align-self:center;font-size:1.6rem;color:#94a3b8">➜</div>' : ""}`).join("")}</div>`;

// ---- Ba động tác của robot ----
const DONG_TAC_HTML = `<div style="display:flex;flex-wrap:wrap;gap:12px;justify-content:center">
  <div style="flex:1 1 220px;max-width:320px;border:2px solid #7c3aed;border-radius:14px;padding:10px 14px;background:#f5f3ff">📡 <b>1.</b> Phát hiện xung quanh (trái, phải, phía trước) có tường hay không.</div>
  <div style="flex:1 1 220px;max-width:320px;border:2px solid #2563eb;border-radius:14px;padding:10px 14px;background:#eff6ff">🔄 <b>2.</b> Quay trái hoặc quay phải một góc 90°.</div>
  <div style="flex:1 1 220px;max-width:320px;border:2px solid #16a34a;border-radius:14px;padding:10px 14px;background:#f0fdf4">👣 <b>3.</b> Tiến (đi thẳng) một bước về phía trước.</div>
</div>`;

const PT = ["phải", "trái"];

const LESSON = {
  meta: {
    subject: "Tin học", grade: "9", book: "Kết nối tri thức với cuộc sống",
    title: "Bài 14: Giải quyết vấn đề", unit: "Chủ đề 5 — Giải quyết vấn đề với sự trợ giúp của máy tính",
    pages: "76–78", durationMinutes: 45,
  },
  objectives: {
    knowledge: [
      "Trình bày được quá trình giải quyết vấn đề và mô tả được giải pháp dưới dạng thuật toán (bằng phương pháp liệt kê các bước hoặc bằng sơ đồ khối).",
    ],
    competencies: [
      "Tự chủ và tự học; giao tiếp và hợp tác (hoạt động nhóm, phiếu bài tập); giải quyết vấn đề và sáng tạo.",
      "Năng lực số 5.1.TC2a: phân tích tình huống vận hành (robot không thoát được mê cung, chương trình Scratch không chạy đúng) để xác định nguyên nhân sự cố.",
      "Năng lực số 5.1.TC2b: đề xuất, lựa chọn giải pháp phù hợp (điều chỉnh thuật toán khi robot đi sai hướng, sửa khối lệnh Scratch) và đánh giá hiệu quả.",
      "Năng lực AI 9.D1.1: xác định được một vấn đề thực tế có thể giải quyết bằng AI và lập được kế hoạch sơ bộ.",
    ],
    qualities: ["Chăm chỉ, trung thực trong báo cáo và đánh giá, trách nhiệm với nhiệm vụ học tập."],
  },
  coreKnowledge: [
    "Giải quyết vấn đề là quá trình, thường được thực hiện qua các bước: 1) Tìm hiểu vấn đề; 2) Phân tích vấn đề; 3) Lựa chọn giải pháp; 4) Thực hiện giải pháp; 5) Đánh giá kết quả.",
    "Thuật toán bám tường (bên phải): robot di chuyển sao cho bức tường luôn ở bên phải, ưu tiên theo thứ tự rẽ phải → đi thẳng → quay trái.",
    "Nếu bên phải không có tường thì quay phải 90° và tiến một bước; nếu không thì: phía trước không có tường thì tiến một bước, còn không thì quay trái 90°. Lặp lại cho đến khi tìm thấy lối ra.",
    "Phương pháp giải quyết vấn đề (hay giải pháp) có thể được mô tả dưới dạng thuật toán bằng phương pháp liệt kê các bước hoặc bằng sơ đồ khối.",
  ],
  keywords: ["Giải quyết vấn đề", "5 bước", "Thuật toán bám tường", "Liệt kê các bước", "Sơ đồ khối"],
  settings: { basePoints: 100, useTimer: false, defaultTime: 60, sound: true, streakEnabled: true },

  activities: [
    /* ===================== HĐ1: MỞ ĐẦU (3 phút) ===================== */
    {
      id: "mo-dau", name: "Mở đầu — Thi thoát khỏi mê cung 🏁", type: "knowledge",
      goal: "Tạo hứng thú; nhận ra vấn đề: tìm đường thoát khỏi mê cung khi không có sơ đồ.",
      time: 180,
      task: "Chia lớp thành 2 nhóm, mỗi nhóm cử một cặp lên điều khiển robot bằng các nút ← ↑ → ↓ để thoát khỏi mê cung. Nhóm nào thoát trước thì chiến thắng!",
      sgkImage: "assets/sgk/sgk-trang76.jpg",
      content: {
        heading: "🏁 Ai thoát khỏi mê cung trước?",
        prompt: "Minh: Tớ đã từng vào mê cung trong một khu vui chơi. Tớ phải tìm đường thoát khỏi mê cung mà không được dùng sơ đồ. — Khoa: Thật là một trò chơi thú vị. — Minh: Bạn có biết cách tìm đường thoát khỏi mê cung không?",
      },
      maze: { mode: "race", title: "Thi thoát khỏi mê cung", teams: ["Nhóm 1", "Nhóm 2"], mazes: [{ name: "Mê cung thi đấu", map: ME_CUNG_2 }] },
    },

    /* ===================== HĐ2.1: GIẢI QUYẾT VẤN ĐỀ (10 phút) ===================== */
    {
      id: "hd1-me-cung", name: "Hoạt động 1: Tìm đường thoát khỏi mê cung 🤖", type: "knowledge",
      goal: "Quan sát cách robot di chuyển trong mê cung (Hình 14.1); giải thích vì sao cách đó dẫn tới Lối ra.",
      time: 300,
      task: "Phiếu bài tập số 1 (nhóm): quan sát Hình 14.1 — Câu 2: Robot di chuyển trong mê cung theo cách nào? Câu 3: Tại sao cách di chuyển đó dẫn robot tới Lối ra?",
      sgkImage: "assets/sgk/hoat-dong-1.jpg",
      content: {
        heading: "🤖 Robot thoát khỏi mê cung",
        prompt: "Mê cung được dùng để chỉ những công trình gồm nhiều hành lang, lối đi, được tạo thành từ những bức tường. Một robot xuất phát từ Lối vào, tìm đường tới Lối ra như Hình 14.1.",
        revealLabel: "🖼️ Hình 14.1",
        blocks: [{ kind: "image", value: "assets/sgk/hinh-14-1.jpg", caption: "Hình 14.1. Robot thoát khỏi mê cung" }],
      },
      questions: [
        { question: "Câu 2: Robot di chuyển trong mê cung theo cách nào?", type: "multiple-choice", sgkImage: "assets/sgk/hinh-14-1.jpg",
          options: ["Đi ngẫu nhiên, gặp tường thì dừng lại", "Di chuyển sao cho bức tường luôn ở bên phải nó", "Luôn đi thẳng, gặp tường thì quay lại Lối vào", "Đi theo sơ đồ mê cung có sẵn"],
          answer: 1, explanation: "Trong Hoạt động 1, robot đã di chuyển sao cho bức tường luôn ở bên phải nó.", level: "nhan-biet", activity: "hd1-me-cung" },
        { question: "Câu 3: Tại sao cách di chuyển đó dẫn robot tới Lối ra?", type: "multiple-choice",
          options: ["Vì robot biết trước vị trí Lối ra", "Vì Lối ra luôn ở bên phải", "Vì robot được bức tường dẫn qua mọi vị trí của mê cung cho đến khi tìm thấy Lối ra", "Vì robot đi nhanh"],
          answer: 2, explanation: "Bằng cách di chuyển bám theo bức tường, robot sẽ được bức tường dẫn qua mọi vị trí của mê cung cho đến khi tìm thấy Lối ra.", level: "thong-hieu", activity: "hd1-me-cung" },
        { question: "Vì sao robot phải tự quyết định hướng đi ở mỗi vị trí?", type: "multiple-choice",
          options: ["Vì không có bản đồ và không được hỏi đường, robot chỉ dựa vào vị trí của bức tường", "Vì robot có bản đồ nhưng không muốn dùng", "Vì mê cung không có tường", "Vì Lối ra thay đổi liên tục"],
          answer: 0, explanation: "Vì không có bản đồ và không được hỏi đường nên robot chỉ được dựa vào vị trí của bức tường để quyết định.", level: "thong-hieu", activity: "hd1-me-cung" },
      ],
    },
    {
      id: "quy-trinh", name: "Quá trình giải quyết vấn đề — 5 bước 🧭", type: "knowledge",
      goal: "Trình bày được 5 bước của quá trình giải quyết vấn đề qua ví dụ robot thoát mê cung.",
      time: 300,
      task: "Phiếu bài tập số 1, Câu 1: đọc SGK tr.76–77, xác định vấn đề, phân tích vấn đề, lựa chọn giải pháp, thực hiện giải pháp và đánh giá kết quả để tìm Lối ra cho robot.",
      sgkImage: "assets/sgk/hinh-14-2.jpg",
      content: {
        heading: "🧭 Tìm Lối ra trong mê cung là một vấn đề",
        revealLabel: "📖 5 bước & Hình 14.2",
        blocks: [
          { kind: "html", value: QUY_TRINH_HTML },
          { kind: "image", value: "assets/sgk/hinh-14-2.jpg", caption: "Hình 14.2. Ba tình huống lựa chọn của robot" },
          { kind: "list", value: ["a) Nếu phía phải không có tường (có đường đi phía bên phải) thì rẽ phải.", "b) Nếu phía phải có tường mà phía trước không có (đi thẳng được) thì đi thẳng.", "c) Nếu cả phía phải và phía trước đều có tường thì quay sang trái để chọn lại hướng."] },
        ],
      },
      questions: [
        { question: "Bước “Phân tích vấn đề” trong bài toán mê cung là:", type: "multiple-choice",
          options: ["Robot di chuyển theo cách đã chọn", "Chia quyết định của robot thành ba trường hợp: rẽ phải, đi thẳng và rẽ trái", "Thử thuật toán với nhiều mê cung khác nhau", "Xác định Lối vào của mê cung"],
          answer: 1, explanation: "Phân tích vấn đề là phân chia vấn đề thành những vấn đề nhỏ hơn: quyết định của robot chia thành ba trường hợp rẽ phải, đi thẳng, rẽ trái.", level: "thong-hieu", activity: "quy-trinh" },
        { question: "Robot đang có tường ở bên phải và phía trước. Theo Hình 14.2, robot sẽ:", type: "multiple-choice",
          options: ["Rẽ phải", "Đi thẳng", "Dừng lại", "Quay sang trái để chọn lại hướng"],
          answer: 3, explanation: "Tình huống c): cả phía phải và phía trước đều có tường thì quay sang trái.", level: "van-dung", activity: "quy-trinh" },
        { question: "Thực hiện thuật toán bám tường với nhiều mê cung có đặc điểm khác nhau để cải tiến là bước nào?", type: "multiple-choice",
          options: ["Đánh giá kết quả", "Tìm hiểu vấn đề", "Lựa chọn giải pháp", "Phân tích vấn đề"],
          answer: 0, explanation: "Đánh giá kết quả: xem xét hiệu quả đạt được để cải tiến hoặc phát hiện giải pháp mới.", level: "thong-hieu", activity: "quy-trinh" },
      ],
      remember: ["Giải quyết vấn đề là quá trình, thường được thực hiện qua các bước: 1) Tìm hiểu vấn đề; 2) Phân tích vấn đề; 3) Lựa chọn giải pháp; 4) Thực hiện giải pháp; 5) Đánh giá kết quả."],
    },
    {
      id: "ghep-buoc-me-cung", name: "Ghép mỗi bước với việc làm trong bài toán mê cung 🧩", type: "matching",
      goal: "Vận dụng 5 bước giải quyết vấn đề vào tình huống robot thoát mê cung.",
      time: 180,
      task: "Ghép mỗi bước giải quyết vấn đề với việc làm tương ứng khi tìm Lối ra cho robot. Làm hết rồi bấm Nộp bài.",
      pairs: [
        { left: "1) Tìm hiểu vấn đề", right: "Tìm Lối ra khi không có sơ đồ, không có người hỏi đường; tại mỗi vị trí phải chọn một hướng đi" },
        { left: "2) Phân tích vấn đề", right: "Chia quyết định thành ba trường hợp: rẽ phải, đi thẳng, rẽ trái — dựa vào vị trí bức tường" },
        { left: "3) Lựa chọn giải pháp", right: "Di chuyển sao cho bức tường luôn ở bên phải, ưu tiên từ phải sang trái" },
        { left: "4) Thực hiện giải pháp", right: "Robot di chuyển theo cách đã chọn như thực hiện một thuật toán" },
        { left: "5) Đánh giá kết quả", right: "Thử với nhiều mê cung có đặc điểm khác nhau để cải tiến" },
      ],
      explanation: "Tìm hiểu → Phân tích → Lựa chọn giải pháp → Thực hiện → Đánh giá kết quả (SGK tr.76–77).",
    },
    {
      id: "chon-truong", name: "Câu hỏi SGK: Các bước giải quyết vấn đề chọn trường 🏫", type: "dragdrop",
      goal: "Vận dụng quá trình 5 bước vào vấn đề thực tế: chọn trường sau khi tốt nghiệp THCS.",
      time: 180,
      task: "Cá nhân: xếp mỗi việc làm khi chọn trường để tiếp tục học tập sau khi tốt nghiệp THCS vào đúng bước giải quyết vấn đề. Xếp hết rồi bấm Nộp bài.",
      sgkImage: "assets/sgk/sgk-trang77.jpg",
      groups: ["1) Tìm hiểu vấn đề", "2) Phân tích vấn đề", "3) Lựa chọn giải pháp", "4) Thực hiện giải pháp", "5) Đánh giá kết quả"],
      items: [
        { text: "Xác định sở thích, năng lực, kết quả học tập của em", group: 0 },
        { text: "Tìm hiểu các trường: THPT, giáo dục nghề nghiệp…; ngành học, điểm chuẩn, khoảng cách", group: 1 },
        { text: "So sánh ưu, nhược điểm của từng trường với điều kiện bản thân, gia đình", group: 1 },
        { text: "Chọn trường phù hợp nhất và sắp xếp thứ tự nguyện vọng", group: 2 },
        { text: "Nộp hồ sơ đăng kí, ôn tập và dự tuyển", group: 3 },
        { text: "Xem kết quả tuyển sinh; điều chỉnh kế hoạch nếu chưa đạt", group: 4 },
      ],
      explanation: "Ví dụ gợi ý — mỗi em có thể có cách làm riêng, nhưng vẫn đi qua đủ 5 bước: tìm hiểu → phân tích → lựa chọn → thực hiện → đánh giá.",
    },

    /* ===================== HĐ2.2: MÔ TẢ GIẢI PHÁP DƯỚI DẠNG THUẬT TOÁN (20 phút) ===================== */
    {
      id: "bam-tuong", name: "Hoạt động 2: Thuật toán bám tường 🧱", type: "knowledge",
      goal: "Mô tả thuật toán xác định hướng di chuyển của robot bằng liệt kê các bước và sơ đồ khối.",
      time: 480,
      task: "Phiếu bài tập số 2 (nhóm): robot chỉ thực hiện được 3 động tác dưới đây. Đưa ra giải pháp để robot biết phải đi theo hướng nào mà không bị nhầm lẫn; mô tả thuật toán bằng liệt kê các bước và sơ đồ khối.",
      sgkImage: "assets/sgk/hinh-14-3.jpg",
      html: DONG_TAC_HTML,
      content: {
        heading: "🧱 Thuật toán bám tường (bên phải)",
        prompt: "Robot là một máy tính. Giải pháp thoát khỏi mê cung cần phải được mô tả một cách rõ ràng sao cho tại mỗi bước đi của nó, robot biết được phải đi theo hướng nào mà không bị nhầm lẫn.",
        revealLabel: "📖 Hình 14.3 — liệt kê các bước & sơ đồ khối",
        blocks: [
          { kind: "image", value: "assets/sgk/hinh-14-3a.jpg", caption: "Hình 14.3a. Liệt kê các bước" },
          { kind: "image", value: "assets/sgk/hinh-14-3b.jpg", caption: "Hình 14.3b. Sơ đồ khối" },
        ],
      },
      questions: [
        { question: "Phiếu 2, câu 2: Thuật toán nào được sử dụng để giúp robot thoát khỏi mê cung?", type: "multiple-choice",
          options: ["Thuật toán tìm kiếm nhị phân", "Thuật toán sắp xếp nổi bọt", "Thuật toán bám tường", "Thuật toán tìm kiếm tuần tự"],
          answer: 2, explanation: "Thuật toán bám tường là một trong những giải pháp thoát khỏi mê cung.", level: "nhan-biet", activity: "bam-tuong" },
        { question: "Phiếu 2, câu 3: Trong thuật toán bám tường (bên phải), robot ưu tiên chọn hướng đi theo thứ tự nào?", type: "multiple-choice",
          options: ["Trái → thẳng → phải", "Phải → thẳng → trái", "Thẳng → phải → trái", "Chọn ngẫu nhiên"],
          answer: 1, explanation: "Robot ưu tiên đi con đường phía tay phải; nếu không có đường nó mới lần lượt chọn lối đi thẳng hoặc quay sang trái.", level: "thong-hieu", activity: "bam-tuong" },
        { question: "Trong liệt kê các bước (Hình 14.3a), khi bên phải không có tường, robot thực hiện:", type: "multiple-choice",
          options: ["Quay phải 90°, tiến một bước", "Tiến một bước", "Quay trái 90°", "Dừng lại"],
          answer: 0, explanation: "nếu bên phải không có tường thì quay phải 90°, tiến một bước.", level: "nhan-biet", activity: "bam-tuong" },
        { question: "Trong sơ đồ khối (Hình 14.3b), khối “Đến đích?” trả lời “đúng” thì:", type: "multiple-choice",
          options: ["Robot quay phải 90°", "Quay lại kiểm tra tường bên phải", "Robot tiến một bước", "Thuật toán kết thúc"],
          answer: 3, explanation: "Đến đích (tìm thấy lối ra) → kết thúc vòng lặp. Nếu sai thì kiểm tra tường bên phải.", level: "thong-hieu", activity: "bam-tuong" },
      ],
      remember: ["Phương pháp giải quyết vấn đề (hay giải pháp) có thể được mô tả dưới dạng thuật toán bằng phương pháp liệt kê các bước hoặc bằng sơ đồ khối."],
    },
    {
      id: "ghep-so-do", name: "Ghép sơ đồ khối thuật toán bám tường 🧩", type: "dragdrop", layout: "ifchain",
      goal: "Nắm thứ tự kiểm tra điều kiện và hành động trong thuật toán bám tường bên phải.",
      time: 180,
      task: "Xếp các điều kiện và động tác vào đúng ô của sơ đồ khối xác định hướng di chuyển của robot (bám tường bên phải). Xếp hết rồi bấm Nộp bài.",
      groups: ["◇ Điều kiện kiểm tra thứ nhất", "Động tác (điều kiện 1 đúng)", "◇ Điều kiện kiểm tra thứ hai", "Động tác (điều kiện 2 đúng)", "Động tác (cả hai điều kiện sai)"],
      items: [
        { text: "Bên phải không có tường?", group: 0 }, { text: "Quay phải 90°, tiến một bước", group: 1 },
        { text: "Phía trước không có tường?", group: 2 }, { text: "Tiến một bước", group: 3 }, { text: "Quay trái 90°", group: 4 },
      ],
      explanation: "Kiểm tra bên phải trước: không có tường → quay phải 90°, tiến một bước; có tường → kiểm tra phía trước: không có tường → tiến một bước; có tường → quay trái 90°. Lặp lại cho đến khi tìm thấy lối ra.",
    },
    {
      id: "may-bam-tuong", name: "Máy mô phỏng robot bám tường 🤖", type: "knowledge",
      goal: "Quan sát robot thực hiện thuật toán bám tường từng lần lặp; đánh giá kết quả với các mê cung khác nhau.",
      time: 360,
      task: "Bấm ▶ Bước tiếp để robot thực hiện từng lần lặp (dòng lệnh đang chạy sáng lên), hoặc ⏩ Chạy hết. Thử cả 3 mê cung rồi trả lời câu hỏi.",
      maze: { mode: "sim", title: "Robot bám tường", intro: "Robot chỉ biết: phát hiện tường (trái, phải, phía trước), quay 90°, tiến một bước. Ô vàng/cam là vệt đường đã đi (cam: đi qua từ 2 lần).", rule: "right", allowRule: true, mazes: MAZES },
      questions: [
        { question: "Mê cung 1, bám tường phải: robot tới Lối ra sau bao nhiêu bước tiến?", type: "multiple-choice",
          options: ["44", "38", "46", "30"],
          answer: 1, explanation: "38 bước tiến (44 lần lặp — có những lần lặp chỉ quay trái 90° mà không tiến).", level: "van-dung", activity: "may-bam-tuong" },
        { question: "Vì sao số lần lặp nhiều hơn số bước tiến?", type: "multiple-choice",
          options: ["Vì máy đếm sai", "Vì có những lần lặp robot chỉ quay trái 90° (bên phải và phía trước đều có tường)", "Vì robot lùi lại", "Vì robot dừng nghỉ"],
          answer: 1, explanation: "Tình huống c): quay trái 90° để chọn lại hướng — không tiến bước nào.", level: "thong-hieu", activity: "may-bam-tuong" },
        { question: "Mê cung 3 (lối ra ở giữa): robot bám tường có tìm thấy Lối ra không?", type: "multiple-choice",
          options: ["Có, rất nhanh", "Có, sau đúng 38 bước", "Không — robot đi vòng theo tường ngoài, quay lại chỗ cũ và sẽ lặp mãi", "Robot báo lỗi và dừng ngay"],
          answer: 2, explanation: "Bức tường quanh lối ra không nối với tường ngoài nên bám tường không dẫn tới lối ra. Đánh giá kết quả giúp phát hiện nhược điểm để cải tiến giải pháp.", level: "van-dung-cao", activity: "may-bam-tuong" },
      ],
    },
    {
      id: "chon-truong-thuat-toan", name: "Câu hỏi SGK: Giải pháp chọn trường dưới dạng thuật toán ✍️", type: "vandung",
      goal: "Mô tả một giải pháp thực tế dưới dạng liệt kê các bước hoặc sơ đồ khối.",
      time: 180,
      task: "Cá nhân: mô tả giải pháp chọn trường sau khi tốt nghiệp THCS dưới dạng liệt kê các bước (hoặc sơ đồ khối). Gửi câu trả lời cho thầy/cô.",
      intro: "Gửi câu trả lời cho thầy/cô rồi bấm để xem gợi ý.",
      cases: [
        { question: "Em hãy mô tả giải pháp chọn trường sau khi tốt nghiệp THCS dưới dạng liệt kê các bước.",
          answer: "Gợi ý: Bước 1: Xác định sở thích, năng lực, kết quả học tập. Bước 2: Lập danh sách các trường (THPT, giáo dục nghề nghiệp…). Bước 3: Lặp lại với từng trường trong danh sách: nếu điểm chuẩn phù hợp năng lực và ngành học phù hợp sở thích thì ghi vào danh sách nguyện vọng. Bước 4: Sắp xếp nguyện vọng, chọn trường phù hợp nhất. Bước 5: Đăng kí, ôn tập, dự tuyển. Bước 6: Xem kết quả; nếu chưa đạt thì chọn nguyện vọng tiếp theo." },
      ],
    },

    /* ===================== HĐ3: LUYỆN TẬP (10 phút) ===================== */
    {
      id: "luyen-tap", name: "Luyện tập: Thuật toán bám tường bên trái 👈", type: "fillblank",
      goal: "Mô tả thuật toán bám tường bên trái bằng liệt kê các bước.",
      time: 300,
      task: "Luyện tập SGK tr.78 (nhóm): chọn từ thích hợp để hoàn thành thuật toán bám tường bên TRÁI. Làm hết rồi bấm Nộp bài.",
      sgkImage: "assets/sgk/sgk-trang78.jpg",
      text: "lặp lại động tác sau cho đến khi tìm thấy lối ra\n• nếu bên {{}} không có tường thì: quay {{}} 90°, tiến một bước\n• nếu không thì: nếu phía trước không có tường thì {{}}\n   nếu không thì quay {{}} 90°",
      answers: [["trái"], ["trái"], ["tiến một bước"], ["phải"]],
      choices: [PT, PT, ["tiến một bước", "quay trái 90°", "quay phải 90°"], PT],
      explanation: "Bám tường trái: ưu tiên trái → thẳng → phải. Nếu bên trái không có tường thì quay trái 90°, tiến một bước; nếu không thì phía trước không có tường thì tiến một bước, còn không thì quay phải 90°.",
    },
    {
      id: "luyen-tap-kiem-tra", name: "Luyện tập: Kiểm tra thuật toán bám tường trái 🔍", type: "knowledge",
      goal: "Kiểm chứng thuật toán bám tường trái bằng sơ đồ khối và máy mô phỏng.",
      time: 300,
      task: "Chạy máy mô phỏng ở chế độ 👈 Bám tường trái với Mê cung 1, 2; so sánh với bám tường phải. Bấm để xem sơ đồ khối bám tường trái rồi trả lời câu hỏi.",
      maze: { mode: "sim", title: "Robot bám tường trái", rule: "left", allowRule: true, mazes: MAZES },
      content: {
        heading: "👈 Sơ đồ khối thuật toán bám tường bên trái",
        revealLabel: "🧭 Sơ đồ khối (giáo án)",
        blocks: [{ kind: "image", value: "assets/sgk/so-do-bam-tuong-trai.png", caption: "Sơ đồ khối thuật toán bám tường bên trái" }],
      },
      questions: [
        { question: "Thuật toán bám tường trái khác bám tường phải ở điểm nào?", type: "multiple-choice",
          options: ["Không cần kiểm tra phía trước", "Không cần vòng lặp", "Đổi vai trò trái và phải: ưu tiên rẽ trái, bế tắc thì quay phải 90°", "Robot đi lùi"],
          answer: 2, explanation: "Chỉ đổi phía bám tường: kiểm tra bên trái trước; cả trái và trước đều có tường thì quay phải 90°.", level: "thong-hieu", activity: "luyen-tap-kiem-tra" },
        { question: "Ở Mê cung 2, bám tường trái tới Lối ra với ít bước tiến hơn bám tường phải.", type: "true-false", answer: true,
          explanation: "Mê cung 2: bám tường trái 36 bước tiến, bám tường phải 40 bước tiến. Ở Mê cung 1 thì ngược lại (trái 46, phải 38) — không có cách nào luôn nhanh hơn.", level: "van-dung", activity: "luyen-tap-kiem-tra" },
      ],
    },

    /* ===================== HĐ4: VẬN DỤNG (2 phút + ở nhà) ===================== */
    {
      id: "van-dung", name: "Vận dụng: Lập trình Scratch mô phỏng thuật toán bám tường 🐱", type: "knowledge",
      goal: "Liên hệ thuật toán bám tường với chương trình Scratch; tự lập trình ở nhà.",
      time: 120,
      task: "Vận dụng SGK tr.78: lập chương trình Scratch mô phỏng thuật toán bám tường. Nếu không đủ thời gian, hoàn thiện ở nhà và gửi sản phẩm qua mail hoặc Zalo của thầy/cô; tiết sau báo cáo.",
      content: {
        heading: "🐱 Chương trình Scratch mô phỏng bám tường",
        prompt: "Gợi ý: robot có cảm biến màu ở bên phải (xanh lá) và phía trước (hồng); tường màu đen, lối ra màu đỏ.",
        revealLabel: "🧩 Chương trình Scratch mẫu (giáo án)",
        blocks: [{ kind: "image", value: "assets/sgk/scratch-mau.png", caption: "Chương trình Scratch mẫu trong giáo án" }],
      },
      questions: [
        { question: "Trong chương trình mẫu, khối “lặp lại cho đến khi đang chạm màu đỏ” tương ứng với câu lệnh nào của thuật toán?", type: "multiple-choice",
          options: ["nếu phía trước không có tường thì tiến một bước", "lặp lại động tác sau cho đến khi tìm thấy lối ra", "quay trái 90°", "tiến một bước"],
          answer: 1, explanation: "Màu đỏ là lối ra: lặp lại cho đến khi chạm màu đỏ = lặp lại cho đến khi tìm thấy lối ra.", level: "thong-hieu", activity: "van-dung" },
        { question: "Khối “nếu không phải màu (xanh lá) đang chạm màu (đen) thì xoay ↻ 90 độ, di chuyển 12 bước” tương ứng với:", type: "multiple-choice",
          options: ["nếu bên phải không có tường thì quay phải 90°, tiến một bước", "nếu phía trước không có tường thì tiến một bước", "nếu không thì quay trái 90°", "lặp lại cho đến khi tìm thấy lối ra"],
          answer: 0, explanation: "Cảm biến xanh lá ở bên phải không chạm tường đen → bên phải không có tường → quay phải 90° rồi tiến.", level: "van-dung", activity: "van-dung" },
      ],
    },

    /* ===================== TỔNG KẾT ===================== */
    {
      id: "tong-ket", name: "Tổng kết", type: "summary",
      task: "Cả lớp nhắc lại kiến thức trọng tâm và làm thử thách cuối. Dặn dò: hoàn thiện chương trình Scratch mô phỏng thuật toán bám tường.",
      content: {
        learned: [
          "Giải quyết vấn đề qua 5 bước: tìm hiểu → phân tích → lựa chọn giải pháp → thực hiện → đánh giá kết quả.",
          "Thuật toán bám tường (bên phải): ưu tiên rẽ phải → đi thẳng → quay trái; lặp lại cho đến khi tìm thấy lối ra.",
          "Bám tường trái: đổi vai trò trái và phải.",
          "Giải pháp được mô tả dưới dạng thuật toán bằng liệt kê các bước hoặc sơ đồ khối.",
          "Đánh giá kết quả giúp phát hiện nhược điểm (VD: lối ra ở giữa mê cung) để cải tiến.",
        ],
        challenge: [
          { question: "Robot bám tường phải: bên phải có tường, phía trước không có tường. Robot sẽ:", type: "multiple-choice",
            options: ["Quay phải 90°", "Tiến một bước", "Quay trái 90°", "Dừng lại"],
            answer: 1, explanation: "Tình huống b): phía phải có tường mà phía trước không có thì đi thẳng (tiến một bước).", level: "van-dung", activity: "tong-ket" },
          { question: "Sắp xếp đúng thứ tự các bước giải quyết vấn đề:", type: "multiple-choice",
            options: ["Phân tích → Tìm hiểu → Thực hiện → Lựa chọn → Đánh giá", "Tìm hiểu → Lựa chọn → Phân tích → Đánh giá → Thực hiện", "Tìm hiểu → Phân tích → Lựa chọn giải pháp → Thực hiện → Đánh giá kết quả", "Lựa chọn → Thực hiện → Tìm hiểu → Phân tích → Đánh giá"],
            answer: 2, explanation: "1) Tìm hiểu vấn đề; 2) Phân tích vấn đề; 3) Lựa chọn giải pháp; 4) Thực hiện giải pháp; 5) Đánh giá kết quả.", level: "nhan-biet", activity: "tong-ket" },
        ],
      },
    },
  ],
};

if (typeof module !== "undefined" && module.exports) module.exports = LESSON;
if (typeof window !== "undefined") window.LESSON = LESSON;
