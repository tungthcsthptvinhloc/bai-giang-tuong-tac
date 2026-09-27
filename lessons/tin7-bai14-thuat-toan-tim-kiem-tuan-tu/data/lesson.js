/* ============================================================================
 * BÀI 14 — THUẬT TOÁN TÌM KIẾM TUẦN TỰ  (Tin học 7 — Kết nối tri thức)
 * Chủ đề 5: Giải quyết vấn đề với sự trợ giúp của máy tính.
 * Bám sát SGK trang 71–73 + Kế hoạch bài dạy (2 tiết) của giáo viên.
 * Chỉ sửa file này để đổi nội dung. Engine app.js không cần sửa.
 * Máy tìm kiếm tuần tự (activity.search): xét lần lượt từng phần tử, tự điền bảng lần lặp.
 * ==========================================================================*/

// ---- Bảng 14.1. Danh sách khách hàng ----
const KH = [["Nguyễn An", "Số 48 đường Trưng Vương"], ["Trần Bình", "Xóm 3, Thư Trai"], ["Hoàng Mai", "Số 3, tổ 7, Phúc Hoà"], ["Thanh Trúc", "Xóm 2, Lục Xuân"], ["Nguyễn Hoà", "Số 69 đường Ngô Quyền"]];
const BANG_14_1 = `<div style="overflow-x:auto"><table style="border-collapse:collapse;margin:0 auto;min-width:420px;background:#fff7e6;font-size:1.05rem">
  <tr style="background:#fcd34d"><th style="border:1px solid #f5c26b;padding:6px 12px">TT</th><th style="border:1px solid #f5c26b;padding:6px 12px;text-align:left">Họ tên</th><th style="border:1px solid #f5c26b;padding:6px 12px;text-align:left">Địa chỉ</th></tr>
  ${KH.map(([n, d], i) => `<tr><td style="border:1px solid #f5c26b;padding:6px 12px;text-align:center;font-weight:700">${i + 1}</td><td style="border:1px solid #f5c26b;padding:6px 12px">${n}</td><td style="border:1px solid #f5c26b;padding:6px 12px">${d}</td></tr>`).join("")}
</table><div style="text-align:center;color:#0f766e;font-style:italic;margin-top:4px">Bảng 14.1. Danh sách khách hàng</div></div>`;
const NUOC = ["Bolivia", "Albania", "Scotland", "Canada", "Vietnam", "Iceland", "Portugal", "Greenland", "Germany"];
const SACH = ["Toán học", "Văn học", "Âm nhạc", "Mỹ thuật", "Tin học", "Vật lý", "Hóa học"];
const SD = ["Đúng", "Sai"];

const LESSON = {
  meta: {
    subject: "Tin học", grade: "7", book: "Kết nối tri thức với cuộc sống",
    title: "Bài 14: Thuật toán tìm kiếm tuần tự", unit: "Chủ đề 5 — Giải quyết vấn đề với sự trợ giúp của máy tính",
    pages: "71–73", durationMinutes: 90,
  },
  objectives: {
    knowledge: [
      "Giải thích được thuật toán tìm kiếm tuần tự.",
      "Xác định được dữ liệu vào (Input), dữ liệu ra (Output) của bài toán tìm kiếm; hoạt động lặp và điều kiện dừng.",
      "Mô tả được thuật toán tìm kiếm tuần tự bằng ngôn ngữ tự nhiên, sơ đồ khối, bảng mô phỏng.",
      "Biểu diễn và mô phỏng được hoạt động của thuật toán tìm kiếm tuần tự trên một bộ dữ liệu vào có kích thước nhỏ.",
    ],
    competencies: [
      "Tự chủ, tự học; giao tiếp và hợp tác (nhóm 4, cặp đôi, trò chơi Tiếp sức); giải quyết vấn đề và sáng tạo.",
      "Năng lực số 3.4.TC1a: xác định đầu vào, đầu ra; liệt kê đúng thứ tự các bước tìm kiếm tuần tự (bắt đầu từ phần tử đầu tiên, so sánh, lặp lại, dừng).",
      "Năng lực số 5.3.TC1b: mô phỏng quá trình tìm kiếm trên bộ dữ liệu nhỏ bằng bảng, sơ đồ khối, công cụ học tập; xác định số lần lặp, điều kiện dừng, vị trí tìm thấy.",
      "Năng lực AI 7.C5.1: nêu được ví dụ về quá trình huấn luyện AI một cách đơn giản.",
    ],
    qualities: ["Chăm chỉ, trung thực, trách nhiệm, nhân ái."],
  },
  coreKnowledge: [
    "Thuật toán tìm kiếm tuần tự thực hiện tìm lần lượt từ đầu đến cuối danh sách, chừng nào chưa tìm thấy và chưa tìm hết thì còn tìm tiếp.",
    "Tìm kiếm tuần tự dùng cấu trúc lặp; hai điều kiện kiểm tra để dừng: đúng giá trị cần tìm chưa? đã hết danh sách chưa?",
    "Tìm thấy → trả lời “Tìm thấy” và chỉ ra vị trí; tìm hết danh sách mà không thấy → trả lời “Không tìm thấy”.",
    "Mô tả bằng ngôn ngữ tự nhiên: 5 bước (xét vị trí đầu tiên → so sánh → kiểm tra hết danh sách → tìm thấy → không tìm thấy).",
  ],
  keywords: ["Tìm kiếm tuần tự", "Lần lượt", "Cấu trúc lặp", "Điều kiện dừng", "Tìm thấy / Không tìm thấy"],
  settings: { basePoints: 100, useTimer: false, defaultTime: 60, sound: true, streakEnabled: true },

  activities: [
    /* =========================== TIẾT 1 =========================== */
    /* ===================== HĐ1: MỞ ĐẦU (10 phút) ===================== */
    {
      id: "khoi-dong", name: "Mở đầu — Giúp mẹ An tìm địa chỉ 🌱", type: "knowledge",
      goal: "Nhận biết tình huống thực tiễn cần tìm kiếm dữ liệu trong danh sách.",
      time: 600,
      task: "Nhóm 4 bạn hoàn thành Phiếu bài tập số 1: tìm địa chỉ khách hàng Thanh Trúc trong Bảng 14.1; em đã tìm bằng cách nào? Nêu ví dụ về hoạt động tìm kiếm trong cuộc sống hằng ngày.",
      sgkImage: "assets/sgk/sgk-trang71.jpg",
      html: BANG_14_1,
      content: {
        heading: "🌱 Giúp mẹ An tìm địa chỉ",
        prompt: "Gia đình bạn An bán giống cây trồng. Hôm nay có một khách hàng gọi điện đến mua cây giống và nhờ mẹ An chở cây giống đến nhà. Thông tin khách hàng được mẹ An ghi trong cuốn sổ lưu danh sách khách hàng gồm họ tên, địa chỉ, số điện thoại. Em hãy cùng An giúp mẹ tìm địa chỉ từ danh sách khách hàng để chuyển cây giống nhé.",
      },
      questions: [
        { question: "Câu 1: Địa chỉ của khách hàng Thanh Trúc là gì?", type: "multiple-choice",
          options: ["Số 48 đường Trưng Vương", "Xóm 3, Thư Trai", "Xóm 2, Lục Xuân", "Số 69 đường Ngô Quyền"],
          answer: 2, explanation: "Thanh Trúc ở dòng số 4 của Bảng 14.1: Xóm 2, Lục Xuân.", level: "nhan-biet", activity: "khoi-dong" },
        { question: "Câu 2: Em đã tìm khách hàng Thanh Trúc trong danh sách bằng cách nào?", type: "multiple-choice",
          options: ["Đoán bừa một dòng", "Tìm lần lượt từ đầu danh sách, xem từng họ tên cho đến khi thấy Thanh Trúc", "Chỉ xem dòng cuối cùng", "Sắp xếp lại danh sách rồi mới tìm"],
          answer: 1, explanation: "Tìm lần lượt từ đầu đến cuối danh sách, chừng nào chưa tìm thấy và chưa tìm hết thì còn tìm tiếp.", level: "thong-hieu", activity: "khoi-dong" },
        { question: "Câu 3: Hoạt động nào sau đây là hoạt động tìm kiếm trong cuộc sống? (Chọn tất cả đáp án đúng)", type: "multiple-select",
          options: ["Tìm sách Tin học 7 trong danh mục sách giáo khoa", "Tưới cây cho mẹ", "Tìm các bạn sinh vào tháng 6 trong danh sách lớp", "Tìm số điện thoại của bạn trong danh bạ"],
          answer: [0, 2, 3], explanation: "Tìm sách, tìm học sinh, tìm số điện thoại đều là tìm dữ liệu trong một danh sách. Tưới cây không phải hoạt động tìm kiếm.", level: "thong-hieu", activity: "khoi-dong" },
      ],
    },

    /* ===================== HĐ2.1: THUẬT TOÁN TÌM KIẾM TUẦN TỰ (25 phút) ===================== */
    {
      id: "tim-kiem-tuan-tu", name: "Thuật toán tìm kiếm tuần tự 🔎", type: "knowledge",
      goal: "Xác định input, output, cấu trúc lặp, điều kiện dừng; giải thích thuật toán tìm kiếm tuần tự.",
      time: 900,
      task: "Nhóm đọc SGK tr.71, trả lời Phiếu bài tập số 2: input, output của bài toán; cấu trúc điều khiển được dùng; hoạt động lặp; điều kiện dừng vòng lặp.",
      sgkImage: "assets/sgk/sgk-trang71.jpg",
      content: {
        heading: "🔎 Thuật toán tìm kiếm tuần tự",
        revealLabel: "🔍 Tìm kiếm tuần tự (SGK tr.71)",
        blocks: [
          { kind: "text", value: "Trong cuộc sống, chúng ta thường xuyên phải tìm kiếm dữ liệu để biết về đối tượng trong hàng chục, hàng trăm, hàng nghìn, thậm chí hàng triệu nội dung liên quan đến nó. Thuật toán tìm kiếm giúp chúng ta tìm được dữ liệu cần thiết để có được thông tin ta cần một cách hiệu quả." },
          { kind: "text", value: "An thực hiện tìm kiếm lần lượt từ đầu đến cuối danh sách khách hàng. Cách tìm kiếm này gọi là tìm kiếm tuần tự. Với mỗi họ tên khách hàng trong danh sách, An kiểm tra xem có đúng họ tên khách hàng mà mẹ yêu cầu không, nếu đúng thì ghi ra địa chỉ và kết thúc công việc, còn không thì chuyển đến họ tên khách hàng tiếp theo. Nếu tìm hết danh sách mà vẫn không thấy thì thông báo là không tìm thấy và kết thúc." },
          { kind: "list", value: [
            "Như vậy, chừng nào chưa tìm thấy và chưa tìm hết thì còn tìm tiếp. Đây chính là cấu trúc lặp.",
            "Điều kiện thứ nhất: kiểm tra họ tên khách hàng có đúng là họ tên cần tìm không.",
            "Điều kiện thứ hai: kiểm tra đã hết danh sách chưa.",
          ] },
          { kind: "image", value: "assets/sgk/hinh-14-1.jpg", caption: "Hình 14.1. Sơ đồ khối mô tả thuật toán tìm kiếm tuần tự địa chỉ khách hàng" },
        ],
      },
      questions: [
        { question: "Phiếu 2, câu 1: Input (dữ liệu vào) của bài toán tìm khách hàng trong tình huống khởi động là:", type: "multiple-choice",
          options: ["Địa chỉ của khách hàng cần tìm", "Danh sách khách hàng", "Số lần lặp", "Cây giống cần chở"],
          answer: 1, explanation: "Input: danh sách khách hàng (mẹ An đưa cho An tìm).", level: "nhan-biet", activity: "tim-kiem-tuan-tu" },
        { question: "Phiếu 2, câu 1: Output (dữ liệu ra) của bài toán là:", type: "multiple-choice",
          options: ["Danh sách khách hàng", "Số điện thoại của mẹ An", "Tên các loại cây giống", "Địa chỉ của khách hàng cần tìm"],
          answer: 3, explanation: "Output: địa chỉ của khách hàng cần tìm.", level: "nhan-biet", activity: "tim-kiem-tuan-tu" },
        { question: "Phiếu 2, câu 2: Cấu trúc điều khiển nào được sử dụng trong bài toán?", type: "multiple-choice",
          options: ["Cấu trúc lặp", "Chỉ có cấu trúc tuần tự", "Không dùng cấu trúc nào", "Chỉ có cấu trúc rẽ nhánh"],
          answer: 0, explanation: "Chừng nào chưa tìm thấy và chưa tìm hết thì còn tìm tiếp — đây chính là cấu trúc lặp.", level: "thong-hieu", activity: "tim-kiem-tuan-tu" },
        { question: "Phiếu 2, câu 3: Hoạt động được lặp lại trong bài toán là:", type: "multiple-choice",
          options: ["Chở cây giống đến nhà khách", "Gọi điện cho khách hàng", "Xem họ tên khách hàng trong danh sách và so sánh với họ tên cần tìm", "Ghi thêm khách hàng mới"],
          answer: 2, explanation: "Hoạt động lặp: tìm (xem, so sánh) tên khách hàng trong danh sách, hết người này đến người tiếp theo.", level: "thong-hieu", activity: "tim-kiem-tuan-tu" },
        { question: "Phiếu 2, câu 4: Điều kiện cần kiểm tra để dừng vòng lặp là gì? (Chọn tất cả đáp án đúng)", type: "multiple-select",
          options: ["Họ tên khách hàng có đúng là họ tên cần tìm không", "Khách hàng ở gần hay xa", "Đã hết danh sách chưa", "Danh sách có bao nhiêu trang"],
          answer: [0, 2], explanation: "Hai điều kiện: kiểm tra đúng họ tên cần tìm chưa; kiểm tra đã hết danh sách chưa.", level: "van-dung", activity: "tim-kiem-tuan-tu" },
      ],
      remember: ["Thuật toán tìm kiếm tuần tự thực hiện tìm lần lượt từ đầu đến cuối danh sách, chừng nào chưa tìm thấy và chưa tìm hết thì còn tìm tiếp."],
    },
    {
      id: "so-do-khoi", name: "Ghép sơ đồ khối Hình 14.1 🧩", type: "ordering",
      goal: "Nắm thứ tự các khối trên nhánh chính của sơ đồ khối tìm kiếm tuần tự.",
      time: 180,
      task: "Sắp xếp các khối trên nhánh chính của sơ đồ khối (từ Bắt đầu đến bước quay lại vòng lặp) rồi bấm Nộp bài.",
      sgkImage: "assets/sgk/hinh-14-1.jpg",
      steps: [
        "Bắt đầu",
        "Danh sách khách hàng, Họ tên khách hàng yêu cầu",
        "Xem họ tên khách hàng đầu tiên",
        "Có đúng họ tên khách hàng cần tìm không?",
        "Có đúng là đã hết danh sách không?",
        "Xem họ tên khách hàng tiếp theo",
      ],
      flow: ["term", "io", "proc", "cond", "cond", "proc"],
      explanation: "Nhánh chính: Bắt đầu → nhập danh sách, họ tên cần tìm → xem khách hàng đầu tiên → hỏi “đúng họ tên cần tìm?” (Đúng → ghi ra địa chỉ, kết thúc) → Sai: hỏi “đã hết danh sách?” (Đúng → không tìm thấy, kết thúc) → Sai: xem khách hàng tiếp theo, quay lại câu hỏi thứ nhất.",
    },

    /* ===================== HĐ2.2: MÔ TẢ THUẬT TOÁN (25 phút) ===================== */
    {
      id: "bang-14-2", name: "Hoạt động 1 — Điền bảng tìm “Thanh Trúc” 📝", type: "fillblank",
      goal: "Mô phỏng thuật toán tìm kiếm tuần tự bằng bảng (Bảng 14.2).",
      time: 420,
      task: "Nhóm 4: quan sát sơ đồ khối Hình 14.1 và Bảng 14.1, chọn Đúng/Sai cho từng lần lặp để tìm địa chỉ khách hàng “Thanh Trúc” (lần lặp 1 là ví dụ). Làm hết rồi bấm Nộp bài.",
      sgkImage: "assets/sgk/bang-14-1-2.jpg",
      html: BANG_14_1,
      text: "Lần lặp 1 · Nguyễn An → Có đúng khách hàng cần tìm? Sai · Đã hết danh sách? Sai\nLần lặp 2 · Trần Bình → Có đúng khách hàng cần tìm? {{}} · Đã hết danh sách? {{}}\nLần lặp 3 · Hoàng Mai → Có đúng khách hàng cần tìm? {{}} · Đã hết danh sách? {{}}\nLần lặp 4 · Thanh Trúc → Có đúng khách hàng cần tìm? {{}} → Đầu ra: {{}}",
      answers: [["Sai"], ["Sai"], ["Sai"], ["Sai"], ["Đúng"], ["Xóm 2, Lục Xuân"]],
      choices: [SD, SD, SD, SD, SD, ["Số 48 đường Trưng Vương", "Xóm 2, Lục Xuân", "Số 69 đường Ngô Quyền", "Không tìm thấy"]],
      explanation: "Lần lặp 2, 3: Sai – Sai (chưa đúng tên, chưa hết danh sách). Lần lặp 4: Thanh Trúc — Đúng → ghi ra địa chỉ Xóm 2, Lục Xuân và kết thúc. Thuật toán lặp 4 lần.",
    },
    {
      id: "may-tim-kiem", name: "Máy tìm kiếm tuần tự 🤖", type: "knowledge",
      goal: "Quan sát máy thực hiện từng bước tìm kiếm tuần tự, đối chiếu với bảng vừa điền.",
      time: 420,
      task: "Bấm ▶ Bước tiếp để máy xét lần lượt từng khách hàng và tự điền bảng lần lặp; đối chiếu với bảng nhóm em vừa điền. Thử đổi tên cần tìm thành một người không có trong danh sách (ví dụ “Lê Minh”) rồi trả lời câu hỏi.",
      sgkImage: "assets/sgk/hinh-14-1.jpg",
      search: { title: "Tìm địa chỉ khách hàng", items: KH.map((k) => k[0]), details: KH.map((k) => k[1]), target: "Thanh Trúc",
        col: "Tên khách hàng", q1: "Có đúng khách hàng cần tìm không?", q2: "Có đúng là đã hết danh sách không?" },
      questions: [
        { question: "Tìm địa chỉ khách hàng “Thanh Trúc”, thuật toán thực hiện bao nhiêu lần lặp?", type: "multiple-choice",
          options: ["1 lần", "5 lần", "3 lần", "4 lần"],
          answer: 3, explanation: "Lần lặp 1, 2, 3 đều Sai; lần lặp 4 gặp Thanh Trúc → dừng. Số lần lặp: 4.", level: "thong-hieu", activity: "may-tim-kiem" },
        { question: "Tìm “Lê Minh” (không có trong danh sách): thuật toán dừng ở lần lặp thứ mấy và đầu ra là gì?", type: "multiple-choice",
          options: ["Lần lặp 1 — Không tìm thấy", "Lần lặp 5 — Không tìm thấy", "Lần lặp 4 — Xóm 2, Lục Xuân", "Không bao giờ dừng"],
          answer: 1, explanation: "Xét hết 5 khách hàng đều Sai; ở lần lặp 5 đã hết danh sách (Đúng) → trả lời “Không tìm thấy” và kết thúc.", level: "van-dung", activity: "may-tim-kiem" },
        { question: "Tìm “Nguyễn An” thì thuật toán dừng ngay ở lần lặp 1.", type: "true-false", answer: true,
          explanation: "Đúng. Nguyễn An là khách hàng đầu tiên nên câu hỏi thứ nhất trả lời Đúng ngay lần lặp 1.", level: "van-dung", activity: "may-tim-kiem" },
      ],
    },
    {
      id: "nam-buoc", name: "Sắp xếp 5 bước mô tả thuật toán 🔢", type: "ordering",
      goal: "Mô tả thuật toán tìm kiếm tuần tự bằng ngôn ngữ tự nhiên.",
      time: 180,
      task: "Sắp xếp 5 bước mô tả thuật toán tìm kiếm tuần tự bằng ngôn ngữ tự nhiên (SGK tr.73) rồi bấm Nộp bài.",
      sgkImage: "assets/sgk/sgk-trang73.jpg",
      steps: [
        "Xét vị trí đầu tiên của danh sách",
        "Nếu giá trị của phần tử ở vị trí đang xét bằng giá trị cần tìm thì chuyển sang Bước 4, nếu không thì chuyển đến vị trí tiếp theo",
        "Kiểm tra đã hết danh sách chưa. Nếu đã hết thì chuyển sang Bước 5, nếu chưa thì lặp lại từ Bước 2",
        "Trả lời “Tìm thấy” và chỉ ra vị trí phần tử tìm được; Kết thúc",
        "Trả lời “Không tìm thấy”; Kết thúc",
      ],
      explanation: "Bước 1 xét vị trí đầu → Bước 2 so sánh → Bước 3 kiểm tra hết danh sách (lặp lại Bước 2) → Bước 4 tìm thấy → Bước 5 không tìm thấy.",
    },
    {
      id: "cau-hoi-sgk", name: "Câu hỏi củng cố (SGK tr.73) ❓", type: "knowledge",
      goal: "Củng cố: thuật toán tìm kiếm tuần tự làm gì và làm như thế nào.",
      time: 240,
      task: "Cá nhân đọc và trả lời nhanh hai câu hỏi SGK tr.73.",
      sgkImage: "assets/sgk/sgk-trang73.jpg",
      content: {
        heading: "❓ Câu hỏi củng cố",
        revealLabel: "📖 Mô tả thuật toán bằng ngôn ngữ tự nhiên (SGK tr.73)",
        blocks: [
          { kind: "list", value: [
            "Bước 1. Xét vị trí đầu tiên của danh sách.",
            "Bước 2. Nếu giá trị của phần tử ở vị trí đang xét bằng giá trị cần tìm thì chuyển sang Bước 4, nếu không thì chuyển đến vị trí tiếp theo.",
            "Bước 3. Kiểm tra đã hết danh sách chưa. Nếu đã hết danh sách thì chuyển sang Bước 5, nếu chưa thì lặp lại từ Bước 2.",
            "Bước 4. Trả lời “Tìm thấy” và chỉ ra vị trí phần tử tìm được; Kết thúc.",
            "Bước 5. Trả lời “không tìm thấy”; Kết thúc.",
          ] },
        ],
      },
      questions: [
        { question: "1. Thuật toán tìm kiếm tuần tự thực hiện công việc gì?", type: "multiple-choice",
          options: ["Lưu trữ dữ liệu.", "Sắp xếp dữ liệu theo chiều tăng dần.", "Xử lí dữ liệu.", "Tìm kiếm dữ liệu cho trước trong một danh sách đã cho."],
          answer: 3, explanation: "Thuật toán tìm kiếm tuần tự tìm một dữ liệu cho trước trong một danh sách đã cho.", level: "nhan-biet", activity: "cau-hoi-sgk" },
        { question: "2. Thuật toán tìm kiếm tuần tự thực hiện công việc như thế nào?", type: "multiple-choice",
          options: ["Sắp xếp lại dữ liệu theo thứ tự của bảng chữ cái.", "Xem xét mục dữ liệu đầu tiên, sau đó xem xét lần lượt từng mục dữ liệu tiếp theo cho đến khi tìm thấy mục dữ liệu được yêu cầu hoặc đến khi hết danh sách.", "Chia nhỏ dữ liệu thành từng phần để tìm kiếm.", "Bắt đầu tìm từ vị trí bất kì của danh sách."],
          answer: 1, explanation: "Tìm kiếm tuần tự xét lần lượt từ mục đầu tiên đến khi tìm thấy hoặc hết danh sách.", level: "thong-hieu", activity: "cau-hoi-sgk" },
      ],
      remember: ["Thuật toán tìm kiếm tuần tự thực hiện tìm lần lượt từ đầu đến cuối danh sách, chừng nào chưa tìm thấy và chưa tìm hết thì còn tìm tiếp."],
    },

    /* =========================== TIẾT 2 =========================== */
    /* ===================== HĐ3: LUYỆN TẬP (15 phút) ===================== */
    {
      id: "tiep-suc", name: "Luyện tập — Trò chơi Tiếp sức: tìm “Iceland” 🏃", type: "fillblank",
      goal: "Mô phỏng thuật toán tìm kiếm tuần tự bằng bảng (Bảng 14.3).",
      time: 480,
      task: "Trò chơi Tiếp sức (2 đội, mỗi đội 7 bạn): mỗi bạn hoàn thành một lần lặp trên bảng rồi chuyền phấn cho bạn tiếp theo. Trên máy: chọn Đúng/Sai cho từng lần lặp tìm tên nước “Iceland” (lần lặp 1 là ví dụ), rồi bấm Nộp bài.",
      sgkImage: "assets/sgk/bang-14-3.jpg",
      html: `<p style="text-align:center;font-size:1.15rem;margin:.2rem 0">Danh sách: ${NUOC.map((n, i) => `<b style="color:#db2777">${n}</b>${i < NUOC.length - 1 ? ", " : ""}`).join("")}</p>`,
      text: "Lần lặp 1 · Bolivia → Đúng tên nước cần tìm? Sai · Đã hết danh sách? Sai\nLần lặp 2 · Albania → Đúng tên nước cần tìm? {{}} · Đã hết danh sách? {{}}\nLần lặp 3 · Scotland → Đúng tên nước cần tìm? {{}} · Đã hết danh sách? {{}}\nLần lặp 4 · Canada → Đúng tên nước cần tìm? {{}} · Đã hết danh sách? {{}}\nLần lặp 5 · Vietnam → Đúng tên nước cần tìm? {{}} · Đã hết danh sách? {{}}\nLần lặp 6 · Iceland → Đúng tên nước cần tìm? {{}} → Đầu ra: {{}}",
      answers: [["Sai"], ["Sai"], ["Sai"], ["Sai"], ["Sai"], ["Sai"], ["Sai"], ["Sai"], ["Đúng"], ["Tìm thấy ở vị trí số 6"]],
      choices: [SD, SD, SD, SD, SD, SD, SD, SD, SD, ["Tìm thấy ở vị trí số 5", "Tìm thấy ở vị trí số 6", "Tìm thấy ở vị trí số 9", "Không tìm thấy"]],
      explanation: "Lần lặp 2 → 5: Sai – Sai. Lần lặp 6: Iceland — Đúng → Tìm thấy ở vị trí số 6; kết thúc (không xét Portugal, Greenland, Germany).",
    },
    {
      id: "kiem-tra-tiep-suc", name: "Máy tìm kiếm: kiểm tra kết quả Tiếp sức 🤖", type: "knowledge",
      goal: "Kiểm tra bảng Tiếp sức; mô phỏng với giá trị khác, kể cả giá trị không có trong danh sách.",
      time: 300,
      task: "Chạy máy tìm “Iceland” để đối chiếu với kết quả của hai đội. Thử tìm “Germany” và một nước không có trong danh sách (ví dụ “Japan”) rồi trả lời câu hỏi.",
      sgkImage: "assets/sgk/bang-14-3.jpg",
      search: { title: "Tìm tên nước", items: NUOC, target: "Iceland", col: "Tên nước", q1: "Có đúng tên nước cần tìm không?", q2: "Có đúng là đã hết danh sách không?" },
      questions: [
        { question: "Tìm “Germany” trong danh sách trên cần bao nhiêu lần lặp?", type: "multiple-choice",
          options: ["9 lần", "1 lần", "6 lần", "8 lần"],
          answer: 0, explanation: "Germany ở vị trí cuối cùng (số 9) → phải xét cả 9 tên nước.", level: "van-dung", activity: "kiem-tra-tiep-suc" },
        { question: "Tìm “Japan” (không có trong danh sách), đầu ra của thuật toán là:", type: "multiple-choice",
          options: ["Tìm thấy ở vị trí số 1", "Tìm thấy ở vị trí số 9", "Không tìm thấy (sau 9 lần lặp)", "Thuật toán lặp mãi không dừng"],
          answer: 2, explanation: "Xét hết 9 tên nước đều Sai, lần lặp 9 đã hết danh sách → “Không tìm thấy”; kết thúc.", level: "van-dung", activity: "kiem-tra-tiep-suc" },
        { question: "Với tìm kiếm tuần tự, phần tử cần tìm càng ở gần cuối danh sách thì càng cần nhiều lần lặp.", type: "true-false", answer: true,
          explanation: "Đúng. Thuật toán xét lần lượt từ đầu nên phần tử ở vị trí thứ k cần k lần lặp.", level: "van-dung-cao", activity: "kiem-tra-tiep-suc" },
      ],
    },
    {
      id: "tro-choi", name: "Trò chơi: Thám tử tìm kiếm 🕵️", type: "penguin",
      pet: "🔍", homeIcon: "🏆", enemy: "🌀", saveWord: "manh mối được tìm thấy",
      winText: "Thám tử đã tìm ra mọi manh mối — em nắm chắc thuật toán tìm kiếm tuần tự!",
      goal: "Củng cố toàn bài.",
      time: 240,
      task: "Trả lời đúng mỗi câu để thám tử tìm thêm một manh mối 🔍 trước khi vòng xoáy 🌀 cuốn mất!",
      intro: "Mỗi câu đúng: một manh mối 🔍 về đích 🏆. Sai thì vòng xoáy 🌀 tới gần!",
      questions: [
        { question: "Tìm kiếm tuần tự bắt đầu xét từ đâu?", type: "multiple-choice",
          options: ["Vị trí đầu tiên của danh sách", "Vị trí cuối cùng", "Vị trí giữa", "Vị trí bất kì"],
          answer: 0, explanation: "Bước 1: xét vị trí đầu tiên của danh sách.", level: "nhan-biet", activity: "tro-choi" },
        { question: "Thuật toán tìm kiếm tuần tự dừng lại khi:", type: "multiple-choice",
          options: ["Đã xét được 3 phần tử", "Tìm thấy giá trị cần tìm hoặc đã hết danh sách", "Gặp phần tử có chữ cái A", "Người dùng đoán được kết quả"],
          answer: 1, explanation: "Chừng nào chưa tìm thấy và chưa tìm hết thì còn tìm tiếp.", level: "nhan-biet", activity: "tro-choi" },
        { question: "Danh sách: 7, 3, 9, 5, 2. Tìm số 5 bằng tìm kiếm tuần tự, cần bao nhiêu lần lặp?", type: "multiple-choice",
          options: ["1", "5", "4", "2"],
          answer: 2, explanation: "7 (Sai), 3 (Sai), 9 (Sai), 5 (Đúng) → 4 lần lặp.", level: "van-dung", activity: "tro-choi" },
        { question: "Danh sách: 7, 3, 9, 5, 2. Tìm số 8, đầu ra là:", type: "multiple-choice",
          options: ["Tìm thấy ở vị trí số 3", "Tìm thấy ở vị trí số 5", "Không tìm thấy", "8"],
          answer: 2, explanation: "Không có số 8; xét hết 5 số → “Không tìm thấy”.", level: "van-dung", activity: "tro-choi" },
        { question: "Trong sơ đồ khối Hình 14.1, nếu “Có đúng họ tên khách hàng cần tìm không?” trả lời Đúng thì:", type: "multiple-choice",
          options: ["Xem khách hàng tiếp theo", "Ghi ra địa chỉ của khách hàng rồi kết thúc", "Hỏi đã hết danh sách chưa", "Quay lại Bắt đầu"],
          answer: 1, explanation: "Nhánh Đúng: ghi ra địa chỉ của khách hàng → Kết thúc.", level: "thong-hieu", activity: "tro-choi" },
        { question: "Nếu chưa tìm thấy và chưa hết danh sách thì thuật toán:", type: "multiple-choice",
          options: ["Kết thúc ngay", "Trả lời Không tìm thấy", "Xét phần tử ở vị trí tiếp theo", "Bắt đầu lại từ đầu"],
          answer: 2, explanation: "Chưa tìm thấy và chưa tìm hết thì còn tìm tiếp: chuyển đến vị trí tiếp theo.", level: "thong-hieu", activity: "tro-choi" },
        { question: "Vì sao tìm kiếm tuần tự cần kiểm tra “đã hết danh sách chưa”?", type: "multiple-choice",
          options: ["Để thuật toán chạy nhanh hơn", "Để sắp xếp danh sách", "Để đếm số phần tử", "Để thuật toán dừng khi giá trị cần tìm không có trong danh sách"],
          answer: 3, explanation: "Nếu không có điều kiện này, khi không có giá trị cần tìm, thuật toán sẽ không biết lúc nào dừng.", level: "van-dung-cao", activity: "tro-choi" },
        { question: "Tìm kiếm tuần tự sử dụng cấu trúc điều khiển nào?", type: "multiple-choice",
          options: ["Cấu trúc lặp (có kết hợp kiểm tra điều kiện)", "Chỉ cấu trúc tuần tự", "Không có cấu trúc", "Chỉ vẽ hình"],
          answer: 0, explanation: "Chừng nào chưa tìm thấy và chưa tìm hết thì còn tìm tiếp — cấu trúc lặp.", level: "thong-hieu", activity: "tro-choi" },
      ],
    },

    /* ===================== HĐ4: VẬN DỤNG (15 phút) ===================== */
    {
      id: "tu-sach", name: "Vận dụng — Tìm sách trong tủ sách lớp 📚", type: "knowledge",
      goal: "Vận dụng tìm kiếm tuần tự để tìm một cuốn sách trong danh sách tự lập.",
      time: 480,
      task: "Lập danh sách các cuốn sách trong tủ sách của lớp em rồi lập bảng mô phỏng tìm một cuốn sách. Trên máy: gõ danh sách sách (cách nhau bởi dấu phẩy) và tên sách cần tìm, bấm ▶ Bước tiếp để kiểm tra bảng của em.",
      sgkImage: "assets/sgk/sgk-trang73.jpg",
      search: { title: "Tìm sách trong tủ sách lớp", items: SACH, target: "Hóa học", editItems: true, col: "Tên sách", q1: "Có đúng tên sách cần tìm không?", q2: "Có đúng là đã hết danh sách không?" },
      questions: [
        { question: "Tủ sách: Toán học, Văn học, Âm nhạc, Mỹ thuật, Tin học, Vật lý, Hóa học. Tìm “Hóa học” cần bao nhiêu lần lặp?", type: "multiple-choice",
          options: ["1 lần", "7 lần", "5 lần", "6 lần"],
          answer: 1, explanation: "Hóa học ở vị trí số 7 (cuối danh sách) → 7 lần lặp; lần lặp 7 trả lời Đúng.", level: "van-dung", activity: "tu-sach" },
        { question: "Muốn tìm “Hóa học” nhanh hơn bằng tìm kiếm tuần tự, em có thể sắp xếp tủ sách thế nào?", type: "multiple-choice",
          options: ["Để “Hóa học” cuối cùng", "Bỏ bớt sách", "Đặt những cuốn hay cần tìm ở đầu danh sách", "Không thể nhanh hơn"],
          answer: 2, explanation: "Tìm kiếm tuần tự xét từ đầu, nên cuốn ở vị trí đầu được tìm thấy sau ít lần lặp hơn.", level: "van-dung-cao", activity: "tu-sach" },
      ],
    },
    {
      id: "van-dung", name: "Vận dụng — Danh sách sách của em 💡", type: "vandung",
      goal: "Lập danh sách sách của em, dùng thuật toán tìm kiếm tuần tự để tìm một cuốn sách.",
      time: 300,
      task: "Vận dụng (SGK tr.73): lập danh sách những cuốn sách mà em có, sau đó dùng thuật toán tìm kiếm tuần tự để tìm một cuốn sách trong danh sách đó. Gửi cho thầy/cô.",
      intro: "Gửi câu trả lời cho thầy/cô.",
      sgkImage: "assets/sgk/sgk-trang73.jpg",
      cases: [
        { question: "Viết danh sách những cuốn sách em có (theo thứ tự trên giá sách) và tên cuốn sách em cần tìm.",
          answer: "Ví dụ: Dế Mèn phiêu lưu kí, Tin học 7, Truyện cổ tích Việt Nam, Toán 7, Từ điển Anh – Việt. Cần tìm: Toán 7." },
        { question: "Mô phỏng các lần lặp tìm cuốn sách đó (mỗi lần lặp: tên sách — đúng sách cần tìm? — đã hết danh sách?) và ghi đầu ra.",
          answer: "Ví dụ: Lần 1: Dế Mèn phiêu lưu kí — Sai — Sai · Lần 2: Tin học 7 — Sai — Sai · Lần 3: Truyện cổ tích Việt Nam — Sai — Sai · Lần 4: Toán 7 — Đúng → Tìm thấy ở vị trí số 4; kết thúc." },
      ],
    },

    /* ===================== TỔNG KẾT ===================== */
    {
      id: "tong-ket", name: "Tổng kết", type: "summary",
      task: "Cả lớp nhắc lại kiến thức trọng tâm và làm thử thách cuối. Dặn dò: đọc trước Bài 15.",
      content: {
        learned: [
          "Tìm kiếm tuần tự: tìm lần lượt từ đầu đến cuối danh sách, chừng nào chưa tìm thấy và chưa tìm hết thì còn tìm tiếp.",
          "Dùng cấu trúc lặp với hai điều kiện dừng: đúng giá trị cần tìm? đã hết danh sách?",
          "Tìm thấy → chỉ ra vị trí; hết danh sách mà không thấy → “Không tìm thấy”.",
          "Mô tả thuật toán bằng ngôn ngữ tự nhiên (5 bước), sơ đồ khối, bảng mô phỏng các lần lặp.",
        ],
        challenge: [
          { question: "Danh sách điểm: 8, 6, 9, 6, 10. Dùng tìm kiếm tuần tự tìm điểm 6, thuật toán trả lời:", type: "multiple-choice",
            options: ["Tìm thấy ở vị trí số 2", "Tìm thấy ở vị trí số 4", "Tìm thấy ở vị trí số 2 và số 4", "Không tìm thấy"],
            answer: 0, explanation: "Thuật toán dừng ngay khi tìm thấy lần đầu: lần lặp 2 gặp số 6 → Tìm thấy ở vị trí số 2; kết thúc.",
            level: "van-dung-cao", activity: "tong-ket" },
          { question: "Danh sách có 20 phần tử và không chứa giá trị cần tìm. Thuật toán tìm kiếm tuần tự thực hiện bao nhiêu lần lặp?", type: "multiple-choice",
            options: ["1", "10", "21", "20"],
            answer: 3, explanation: "Phải xét hết 20 phần tử; ở lần lặp 20 đã hết danh sách → “Không tìm thấy”.",
            level: "van-dung", activity: "tong-ket" },
        ],
      },
    },
  ],
};

if (typeof module !== "undefined" && module.exports) module.exports = LESSON;
if (typeof window !== "undefined") window.LESSON = LESSON;
