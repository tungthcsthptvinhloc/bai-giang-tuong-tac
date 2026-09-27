/* ============================================================================
 * BÀI 15 — THUẬT TOÁN TÌM KIẾM NHỊ PHÂN  (Tin học 7 — Kết nối tri thức)
 * Chủ đề 5: Giải quyết vấn đề với sự trợ giúp của máy tính.
 * Bám sát SGK trang 74–77 + Kế hoạch bài dạy (2 tiết) của giáo viên.
 * Chỉ sửa file này để đổi nội dung. Engine app.js không cần sửa.
 * Máy tìm kiếm nhị phân (search.mode "binary") · Trò chơi tìm số thẻ úp (guess).
 * Vị trí giữa = phần nguyên của (vị trí đầu + vị trí cuối)/2; số bước lặp = số lần so sánh (như SGK).
 * ==========================================================================*/

// ---- Hình 15.1. Danh sách khách hàng (đã sắp xếp theo tên) ----
const KH = [["Nguyễn", "An", "Số 48 đường Trưng Vương"], ["Trần", "Bình", "Xóm 3, Thư Trai"], ["Nguyễn", "Hoà", "69 Ngô Quyền"], ["Kiều Thị", "Liên", "75 Lê Văn Tám"],
  ["Hoàng", "Mai", "Số 3, tổ 7, Phúc Hoà"], ["Ngô Hoàng", "Phương", "Xóm 6, Lục Xuân"], ["Ngô Hà", "Trang", "Phương Độ, Phúc Thọ"], ["Thanh", "Trúc", "Xóm 2, Lục Xuân"], ["Trần Thanh", "Tước", "48 Hoàng Hoa Thám"]];
const TD = "border:1px solid #475569;padding:5px 12px";
const HINH_15_1 = `<div style="overflow-x:auto"><table style="border-collapse:collapse;margin:0 auto;min-width:460px;background:#fff;font-size:1.02rem">
  <tr><th colspan="4" style="${TD};background:#c7d7f5">DANH SÁCH KHÁCH HÀNG</th></tr>
  <tr style="background:#dbe6fa">${["TT", "Họ đệm", "Tên", "Địa chỉ"].map((h) => `<th style="${TD}">${h}</th>`).join("")}</tr>
  ${KH.map(([h, t, d], i) => `<tr><td style="${TD};text-align:center">${i + 1}</td><td style="${TD}">${h}</td><td style="${TD};font-weight:700;color:#4338ca">${t}</td><td style="${TD}">${d}</td></tr>`).join("")}
</table><div style="text-align:center;color:#0f766e;font-style:italic;margin-top:4px">Hình 15.1. Danh sách khách hàng</div></div>`;
const TEN = KH.map((k) => k[1]);
const NUOC = ["Bolivia", "Albania", "Scotland", "Canada", "Vietnam", "Iceland", "Portugal", "Greenland", "Germany"];
const NUOC_SX = ["Albania", "Bolivia", "Canada", "Germany", "Greenland", "Iceland", "Portugal", "Scotland", "Vietnam"];
const SS = ["Bằng nhau", "Nhỏ hơn", "Lớn hơn"];

const LESSON = {
  meta: {
    subject: "Tin học", grade: "7", book: "Kết nối tri thức với cuộc sống",
    title: "Bài 15: Thuật toán tìm kiếm nhị phân", unit: "Chủ đề 5 — Giải quyết vấn đề với sự trợ giúp của máy tính",
    pages: "74–77", durationMinutes: 90,
  },
  objectives: {
    knowledge: [
      "Giải thích được thuật toán tìm kiếm nhị phân.",
      "Biểu diễn và mô phỏng được hoạt động của thuật toán tìm kiếm nhị phân trên một bộ dữ liệu vào có kích thước nhỏ.",
      "Giải thích được mối liên quan giữa sắp xếp và tìm kiếm, nêu được ví dụ minh hoạ.",
    ],
    competencies: [
      "Tự chủ, tự học; giao tiếp và hợp tác (nhóm, cặp đôi, trò chơi); giải quyết vấn đề và sáng tạo.",
      "Năng lực số 3.4.TC1a: trình bày đúng các bước tìm kiếm nhị phân, điều kiện áp dụng (danh sách đã sắp xếp); mô phỏng bằng bảng, thẻ số, công cụ trực quan.",
      "Năng lực số 5.3.TC1b: so sánh, đánh giá tìm kiếm nhị phân với tìm kiếm tuần tự qua số bước lặp; lựa chọn thuật toán phù hợp.",
    ],
    qualities: ["Chăm chỉ, trung thực, trách nhiệm, nhân ái."],
  },
  coreKnowledge: [
    "Tìm kiếm nhị phân thực hiện trên danh sách đã được sắp xếp theo thứ tự từ nhỏ đến lớn. Bắt đầu từ vị trí ở giữa danh sách.",
    "Tại mỗi bước lặp, so sánh giá trị cần tìm với giá trị ở vị trí giữa: bằng thì dừng lại; nhỏ hơn thì tìm trong nửa trước; lớn hơn thì tìm trong nửa sau.",
    "Chừng nào chưa tìm thấy và vùng tìm kiếm còn phần tử thì còn tìm tiếp.",
    "Vị trí giữa của vùng tìm kiếm = phần nguyên của (vị trí đầu + vị trí cuối)/2. So sánh kí tự: kí tự đứng trước là “nhỏ hơn” kí tự đứng sau trong bảng chữ cái.",
    "Sắp xếp giúp cho việc tìm kiếm được thực hiện nhanh hơn.",
  ],
  keywords: ["Tìm kiếm nhị phân", "Vị trí giữa", "Vùng tìm kiếm", "Đã sắp xếp", "Nhanh hơn"],
  settings: { basePoints: 100, useTimer: false, defaultTime: 60, sound: true, streakEnabled: true },

  activities: [
    /* =========================== TIẾT 1 =========================== */
    /* ===================== HĐ1: MỞ ĐẦU (5 phút) ===================== */
    {
      id: "khoi-dong", name: "Mở đầu — Hàng trăm khách hàng, tìm sao cho nhanh? 🤔", type: "knowledge",
      goal: "Nhận ra nhu cầu tìm kiếm hiệu quả hơn tìm kiếm tuần tự khi danh sách lớn.",
      time: 300,
      task: "Chia lớp thành 2 nhóm (3 phút): mỗi nhóm đưa ra một phương án giúp An tìm khách hàng nhanh hơn; nhóm kia phản biện ưu, nhược điểm của phương án đó.",
      sgkImage: "assets/sgk/sgk-trang74.jpg",
      content: {
        heading: "🤔 Hàng trăm khách hàng, tìm sao cho nhanh?",
        prompt: "Việc kinh doanh mở rộng, số lượng khách hàng của cửa hàng bán giống cây trồng nhà An lên đến hàng trăm người. Việc tìm kiếm tên khách hàng trong danh sách thật khó khăn. Em có gợi ý gì cho bạn An để việc tìm kiếm được dễ dàng hơn không?",
      },
      questions: [
        { question: "Danh sách có hàng trăm khách hàng. Nhược điểm của tìm kiếm tuần tự là gì?", type: "multiple-choice",
          options: ["Không bao giờ tìm thấy", "Nếu tên cần tìm ở cuối danh sách thì phải xét gần hết danh sách, mất nhiều thời gian", "Phải sắp xếp danh sách trước", "Chỉ tìm được số, không tìm được tên"],
          answer: 1, explanation: "Tìm kiếm tuần tự xét lần lượt từng phần tử từ đầu danh sách nên với danh sách lớn có thể mất rất nhiều bước.", level: "thong-hieu", activity: "khoi-dong" },
        { question: "Gợi ý nào giúp An tìm khách hàng nhanh hơn?", type: "multiple-choice",
          options: ["Viết danh sách bằng chữ to hơn", "Tìm từ cuối danh sách lên", "Sắp xếp danh sách theo thứ tự chữ cái của tên rồi mới tìm", "Chia danh sách cho nhiều người giữ"],
          answer: 2, explanation: "Khi danh sách đã được sắp xếp, có thể tìm nhanh hơn bằng cách so sánh với vị trí ở giữa — đó là tìm kiếm nhị phân.", level: "van-dung", activity: "khoi-dong" },
      ],
    },

    /* ===================== HĐ2.1: THUẬT TOÁN TÌM KIẾM NHỊ PHÂN (39 phút) ===================== */
    {
      id: "nhi-phan", name: "Thuật toán tìm kiếm nhị phân ✂️", type: "knowledge",
      goal: "Hiểu giải pháp của An: danh sách đã sắp xếp, so sánh với vị trí giữa, thu hẹp một nửa.",
      time: 480,
      task: "Nhiệm vụ 1 — nhóm đọc SGK tr.74 và trả lời: Giải pháp của An là gì? Hoạt động nào được lặp lại? Giải pháp đó có nhanh hơn tìm kiếm tuần tự không, vì sao?",
      sgkImage: "assets/sgk/sgk-trang74.jpg",
      html: HINH_15_1,
      content: {
        heading: "✂️ Thuật toán tìm kiếm nhị phân",
        revealLabel: "🔍 Giải pháp của An (SGK tr.74)",
        blocks: [
          { kind: "text", value: "Khi danh sách khách hàng ngày càng nhiều, để thuận lợi cho việc tìm kiếm, An đã giúp mẹ soạn thảo danh sách khách hàng trên máy tính với tên khách hàng được sắp xếp theo thứ tự chữ cái (Hình 15.1)." },
          { kind: "text", value: "Khi danh sách đã được sắp xếp, An không cần tìm từ đầu mà so sánh ngay giá trị cần tìm với giá trị của vị trí ở giữa danh sách. Nếu giá trị cần tìm bằng giá trị ở giữa thì tìm thấy và dừng lại, nếu lớn hơn thì chỉ cần tìm ở nửa sau của danh sách, nếu nhỏ hơn thì tìm ở nửa đầu của danh sách. Lặp lại quá trình đó cho đến khi tìm thấy hoặc hết danh sách. Như vậy, tại mỗi bước lặp, thuật toán tìm kiếm thu hẹp danh sách tìm kiếm chỉ còn một nửa. Do đó thuật toán này có tên là tìm kiếm nhị phân (chia đôi)." },
        ],
      },
      questions: [
        { question: "Câu 1: Giải pháp của An là gì?", type: "multiple-choice",
          options: ["Tìm lần lượt từ đầu đến cuối danh sách", "Sắp xếp danh sách theo thứ tự chữ cái, so sánh giá trị cần tìm với giá trị ở giữa rồi chỉ tìm tiếp ở một nửa", "Tìm ngẫu nhiên một vị trí", "Nhờ mẹ đọc to danh sách"],
          answer: 1, explanation: "An sắp xếp danh sách theo thứ tự chữ cái, so sánh với vị trí ở giữa: bằng thì dừng, lớn hơn tìm nửa sau, nhỏ hơn tìm nửa đầu.", level: "nhan-biet", activity: "nhi-phan" },
        { question: "Câu 2: Hoạt động được lặp lại trong giải pháp của An là:", type: "multiple-choice",
          options: ["So sánh giá trị cần tìm với giá trị ở vị trí giữa vùng tìm kiếm và thu hẹp vùng tìm kiếm còn một nửa", "Sắp xếp lại danh sách", "Xem lần lượt từng khách hàng", "Ghi thêm khách hàng mới"],
          answer: 0, explanation: "Tại mỗi bước lặp: so sánh với vị trí giữa, rồi thu hẹp danh sách tìm kiếm chỉ còn một nửa.", level: "thong-hieu", activity: "nhi-phan" },
        { question: "Câu 3: Giải pháp của An nhanh hơn tìm kiếm tuần tự vì:", type: "multiple-choice",
          options: ["Máy tính chạy nhanh hơn", "Tên khách hàng ngắn hơn", "Danh sách có ít người hơn", "Sau mỗi bước lặp, vùng tìm kiếm chỉ còn một nửa"],
          answer: 3, explanation: "Mỗi bước lặp loại bỏ một nửa danh sách nên số bước lặp ít hơn nhiều so với xét lần lượt từng phần tử.", level: "thong-hieu", activity: "nhi-phan" },
      ],
    },
    {
      id: "may-nhi-phan", name: "Máy tìm kiếm nhị phân: tìm “Trúc” 🤖", type: "knowledge",
      goal: "Quan sát từng bước tìm kiếm nhị phân; so sánh số bước lặp với tìm kiếm tuần tự.",
      time: 600,
      task: "Nhiệm vụ 2 — Hoạt động 1 (SGK tr.75): bấm ▶ Bước tiếp để xem các bước An tìm “Trúc”. Thảo luận Phiếu học tập số 1: tìm kiếm tuần tự cần bao nhiêu bước lặp? Trước khi tìm kiếm nhị phân, danh sách cần thoả mãn điều kiện gì?",
      sgkImage: "assets/sgk/cac-buoc-truc.jpg",
      search: { mode: "binary", title: "Tìm khách hàng theo tên (Hình 15.1)", items: TEN, details: KH.map((k) => k[2]), target: "Trúc", col: "Tên ở vị trí giữa" },
      questions: [
        { question: "Phiếu 1, câu 1: Tìm kiếm tuần tự phải thực hiện bao nhiêu bước lặp để tìm được khách hàng tên “Trúc” trong Hình 15.1?", type: "multiple-choice",
          options: ["3", "9", "8", "5"],
          answer: 2, explanation: "Trúc ở vị trí số 8 → tìm kiếm tuần tự cần 8 bước lặp, trong khi tìm kiếm nhị phân chỉ cần 3 bước lặp (vị trí 5 → 7 → 8).", level: "thong-hieu", activity: "may-nhi-phan" },
        { question: "Ở bước 1, vì sao bỏ đi nửa đầu danh sách (An → Mai)?", type: "multiple-choice",
          options: ["Vì “T” đứng sau “M” trong bảng chữ cái nên “Trúc” lớn hơn “Mai”", "Vì nửa đầu có ít tên hơn", "Vì “Trúc” ngắn hơn “Mai”", "Vì Mai ở vị trí số 5"],
          answer: 0, explanation: "So sánh “Trúc” và “Mai”: “T” đứng sau “M” nên “Trúc” lớn hơn → chỉ tìm ở nửa sau.", level: "thong-hieu", activity: "may-nhi-phan" },
        { question: "Phiếu 1, câu 2: Trước khi thực hiện tìm kiếm nhị phân, danh sách khách hàng cần thoả mãn điều kiện gì?", type: "multiple-choice",
          options: ["Có ít hơn 10 người", "Đã được sắp xếp theo thứ tự", "Có số điện thoại", "Tên không trùng nhau"],
          answer: 1, explanation: "Danh sách cần được sắp xếp. Nếu không, thuật toán không thể thu hẹp phạm vi tìm kiếm vì giá trị cần tìm có thể ở vị trí bất kì.", level: "nhan-biet", activity: "may-nhi-phan" },
        { question: "Nếu danh sách chưa được sắp xếp, thuật toán tìm kiếm nhị phân vẫn luôn cho kết quả đúng.", type: "true-false", answer: false,
          explanation: "Sai. Không sắp xếp thì không biết giá trị cần tìm nằm ở nửa nào, việc bỏ đi một nửa có thể bỏ mất giá trị cần tìm.", level: "van-dung", activity: "may-nhi-phan" },
      ],
    },
    {
      id: "vung-tim-kiem", name: "Vùng tìm kiếm và vị trí giữa 📏", type: "knowledge",
      goal: "Mô tả thuật toán bằng ngôn ngữ tự nhiên; xác định vị trí giữa, điều kiện dừng.",
      time: 540,
      task: "Nhiệm vụ 3 — Phiếu học tập số 2: đọc SGK tr.76, quan sát Hình 15.2; cho biết vị trí giữa được xác định như thế nào, điều kiện dừng là gì; trả lời các câu hỏi.",
      sgkImage: "assets/sgk/mo-ta-5-buoc.jpg",
      content: {
        heading: "📏 Vùng tìm kiếm và vị trí giữa",
        prompt: "Giả sử danh sách (dãy) đã được sắp xếp theo thứ tự từ nhỏ đến lớn. Vùng tìm kiếm là đoạn danh sách mà thuật toán tìm kiếm trên đó. Ban đầu, vùng tìm kiếm là toàn bộ danh sách.",
        revealLabel: "📖 Mô tả thuật toán bằng ngôn ngữ tự nhiên (SGK tr.76)",
        blocks: [
          { kind: "list", value: [
            "Bước 1. Nếu vùng tìm kiếm không có phần tử nào thì kết luận không tìm thấy và thuật toán kết thúc.",
            "Bước 2. Xác định vị trí giữa của vùng tìm kiếm. Vị trí này chia vùng tìm kiếm thành hai nửa: nửa trước và nửa sau vị trí giữa.",
            "Bước 3. Nếu giá trị cần tìm bằng giá trị của vị trí giữa thì kết luận “giá trị cần tìm xuất hiện tại vị trí giữa” và kết thúc.",
            "Bước 4. Nếu giá trị cần tìm nhỏ hơn giá trị của vị trí giữa thì vùng tìm kiếm mới được thu hẹp lại, chỉ còn nửa trước của dãy. Ngược lại (nếu giá trị cần tìm lớn hơn giá trị của vị trí giữa) vùng tìm kiếm mới được thu hẹp lại, chỉ còn nửa sau của dãy.",
            "Bước 5. Lặp lại từ Bước 1 đến Bước 4 cho đến khi tìm thấy giá trị cần tìm (Bước 3) hoặc vùng tìm kiếm không còn phần tử nào (Bước 1).",
          ] },
          { kind: "text", value: "Vị trí giữa của vùng tìm kiếm bằng phần nguyên của (vị trí đầu + vị trí cuối)/2. Lưu ý: “nửa trước” và “nửa sau” không gồm phần tử giữa. Trong trường hợp so sánh kí tự thì kí tự đứng trước là “nhỏ hơn” kí tự đứng sau trong bảng chữ cái." },
          { kind: "image", value: "assets/sgk/hinh-15-2.jpg", caption: "Hình 15.2. Vùng tìm kiếm" },
        ],
      },
      questions: [
        { question: "Phiếu 2, câu 1: Vị trí giữa của vùng tìm kiếm được xác định như thế nào?", type: "multiple-choice",
          options: ["Luôn là vị trí số 5", "Vị trí cuối chia 2", "Phần nguyên của (vị trí đầu + vị trí cuối)/2", "Vị trí đầu cộng 1"],
          answer: 2, explanation: "Vị trí giữa = phần nguyên của (vị trí đầu + vị trí cuối)/2.", level: "nhan-biet", activity: "vung-tim-kiem" },
        { question: "Vùng tìm kiếm từ vị trí 6 đến vị trí 9. Vị trí giữa là:", type: "multiple-choice",
          options: ["7", "8", "7,5", "6"],
          answer: 0, explanation: "(6 + 9)/2 = 7,5 → phần nguyên là 7 (đúng như bước 2 tìm “Trúc”: vị trí 7 — Trang).", level: "van-dung", activity: "vung-tim-kiem" },
        { question: "Phiếu 2, câu 2: Thuật toán tìm kiếm nhị phân dừng lại khi nào? (Chọn tất cả đáp án đúng)", type: "multiple-select",
          options: ["Giá trị cần tìm bằng giá trị ở vị trí giữa", "Đã xét 3 bước lặp", "Vùng tìm kiếm không còn phần tử nào", "Giá trị ở giữa là chữ cái A"],
          answer: [0, 2], explanation: "Dừng khi tìm thấy (Bước 3) hoặc vùng tìm kiếm không còn phần tử nào — kết luận không tìm thấy (Bước 1).", level: "thong-hieu", activity: "vung-tim-kiem" },
        { question: "Phiếu 2, câu 3 (Bước 4): Giá trị cần tìm NHỎ HƠN giá trị ở vị trí giữa thì vùng tìm kiếm mới là:", type: "multiple-choice",
          options: ["Nửa sau của dãy", "Toàn bộ dãy", "Chỉ phần tử giữa", "Nửa trước của dãy"],
          answer: 3, explanation: "Nhỏ hơn → chỉ còn nửa trước; lớn hơn → chỉ còn nửa sau (không gồm phần tử giữa).", level: "thong-hieu", activity: "vung-tim-kiem" },
        { question: "“Nửa trước” và “nửa sau” của vùng tìm kiếm không gồm phần tử ở vị trí giữa.", type: "true-false", answer: true,
          explanation: "Đúng (Lưu ý SGK tr.76): phần tử giữa đã được so sánh nên không cần xét lại.", level: "nhan-biet", activity: "vung-tim-kiem" },
      ],
      remember: [
        "Thuật toán tìm kiếm nhị phân thực hiện trên danh sách đã được sắp xếp theo thứ tự từ nhỏ đến lớn. Bắt đầu từ vị trí ở giữa danh sách.",
        "Tại mỗi bước lặp, so sánh giá trị cần tìm với giá trị của vị trí giữa danh sách, nếu bằng thì dừng lại, nếu nhỏ hơn thì tìm trong nửa trước của danh sách, nếu lớn hơn thì tìm trong nửa sau của danh sách.",
        "Chừng nào chưa tìm thấy và vùng tìm kiếm còn phần tử thì còn tìm tiếp.",
      ],
    },
    {
      id: "nam-buoc", name: "Sắp xếp 5 bước mô tả thuật toán 🔢", type: "ordering",
      goal: "Nắm thứ tự 5 bước mô tả thuật toán tìm kiếm nhị phân.",
      time: 180,
      task: "Sắp xếp 5 bước mô tả thuật toán tìm kiếm nhị phân bằng ngôn ngữ tự nhiên (SGK tr.76) rồi bấm Nộp bài.",
      sgkImage: "assets/sgk/mo-ta-5-buoc.jpg",
      steps: [
        "Nếu vùng tìm kiếm không có phần tử nào thì kết luận không tìm thấy, kết thúc",
        "Xác định vị trí giữa của vùng tìm kiếm",
        "Nếu giá trị cần tìm bằng giá trị của vị trí giữa thì kết luận tìm thấy tại vị trí giữa, kết thúc",
        "Nếu nhỏ hơn thì vùng tìm kiếm mới là nửa trước, ngược lại là nửa sau",
        "Lặp lại từ Bước 1 đến Bước 4",
      ],
      explanation: "Bước 1 kiểm tra vùng rỗng → Bước 2 vị trí giữa → Bước 3 so sánh bằng → Bước 4 thu hẹp một nửa → Bước 5 lặp lại.",
    },
    {
      id: "tim-hoa", name: "Nhiệm vụ 4 — Tìm khách hàng tên “Hoà” 📝", type: "fillblank",
      goal: "Viết các bước lặp tìm kiếm nhị phân (câu hỏi SGK tr.76).",
      time: 420,
      task: "Cặp đôi: chọn đáp án cho từng ô để hoàn thành các bước lặp tìm khách hàng tên “Hoà” trong Hình 15.1 (vị trí giữa = phần nguyên của (đầu + cuối)/2). Làm hết rồi bấm Nộp bài.",
      sgkImage: "assets/sgk/hinh-15-1.jpg",
      html: `<p style="text-align:center;font-size:1.1rem;margin:.2rem 0">${TEN.map((t, i) => `<span style="display:inline-block;border:2px solid #c7d2fe;border-radius:8px;padding:2px 8px;margin:2px"><sup>${i + 1}</sup> ${t}</span>`).join("")}</p>`,
      text: "Bước 1 · Vùng tìm kiếm 1 → 9 · Vị trí giữa: {{}} (Mai) · “Hoà” so với “Mai”: {{}} → vùng tìm kiếm mới: {{}}\nBước 2 · Vị trí giữa: {{}} ({{}}) · “Hoà” so với giá trị ở giữa: {{}} → vùng tìm kiếm mới: {{}}\nBước 3 · Vị trí giữa: {{}} (Hoà) · So sánh: {{}} → Kết quả: {{}}",
      answers: [["5"], ["Nhỏ hơn"], ["1 → 4"], ["2"], ["Bình"], ["Lớn hơn"], ["3 → 4"], ["3"], ["Bằng nhau"], ["Tìm thấy ở vị trí số 3"]],
      choices: [["4", "5", "6"], SS, ["1 → 4", "6 → 9", "1 → 5"], ["2", "3"], ["Bình", "Hoà", "Liên"], SS, ["3 → 4", "1 → 2", "1 → 1"], ["3", "4"], SS, ["Tìm thấy ở vị trí số 3", "Tìm thấy ở vị trí số 2", "Không tìm thấy"]],
      explanation: "Bước 1: vị trí 5 (Mai), “H” đứng trước “M” → nhỏ hơn → vùng 1 → 4. Bước 2: phần nguyên của (1 + 4)/2 = 2 (Bình), “H” đứng sau “B” → lớn hơn → vùng 3 → 4. Bước 3: phần nguyên của (3 + 4)/2 = 3 (Hoà) → bằng nhau → tìm thấy ở vị trí số 3 sau 3 bước lặp.",
    },

    /* =========================== TIẾT 2 =========================== */
    /* ===================== HĐ2.2: SẮP XẾP VÀ TÌM KIẾM (30 phút) ===================== */
    {
      id: "sap-xep-tim-kiem", name: "Sắp xếp và tìm kiếm ⚖️", type: "knowledge",
      goal: "So sánh số bước lặp của hai thuật toán; hiểu vai trò của sắp xếp đối với tìm kiếm.",
      time: 540,
      task: "Nhiệm vụ 1, 2 — Phiếu học tập số 3: đọc SGK tr.76–77. Dùng máy tìm “Trúc” và tìm một tên KHÔNG có trong danh sách (ví dụ “Vân”); so sánh số bước lặp của tìm kiếm tuần tự và nhị phân. Sắp xếp và tìm kiếm có mối liên hệ như thế nào?",
      sgkImage: "assets/sgk/sgk-trang77.jpg",
      search: { mode: "binary", title: "So sánh hai thuật toán (Hình 15.1)", items: TEN, target: "Vân", col: "Tên ở vị trí giữa" },
      content: {
        heading: "⚖️ Sắp xếp và tìm kiếm",
        revealLabel: "📖 Sắp xếp và tìm kiếm (SGK tr.76–77)",
        blocks: [
          { kind: "list", value: [
            "Trong ví dụ ở mục 1, khách hàng tên “Trúc” được tìm thấy sau 3 bước lặp theo thuật toán tìm kiếm nhị phân, trong khi thuật toán tìm kiếm tuần tự phải thực hiện 8 bước lặp.",
            "Khách hàng không có trong danh sách: tìm kiếm tuần tự cần 9 bước lặp để xét hết danh sách và kết luận “Không tìm thấy”, trong khi tìm kiếm nhị phân chỉ mất 4 bước lặp.",
            "Thuật toán tìm kiếm nhị phân tìm kiếm nhanh hơn vì trước khi tìm, danh sách đã được sắp xếp. Nhờ đó, tại mỗi bước lặp, thuật toán thu hẹp được phạm vi tìm kiếm chỉ còn một nửa.",
          ] },
        ],
      },
      questions: [
        { question: "Tìm tên “Vân” (không có trong danh sách 9 khách hàng): tìm kiếm tuần tự và tìm kiếm nhị phân lần lượt cần bao nhiêu bước lặp?", type: "multiple-choice",
          options: ["9 và 9", "9 và 4", "4 và 9", "8 và 3"],
          answer: 1, explanation: "Tuần tự phải xét hết 9 tên; nhị phân: vị trí 5 → 7 → 8 → 9 rồi vùng tìm kiếm không còn phần tử → 4 bước lặp.", level: "van-dung", activity: "sap-xep-tim-kiem" },
        { question: "Vì sao tìm kiếm nhị phân nhanh hơn tìm kiếm tuần tự?", type: "multiple-choice",
          options: ["Vì danh sách đã được sắp xếp nên mỗi bước lặp thu hẹp phạm vi tìm kiếm còn một nửa", "Vì so sánh chữ nhanh hơn so sánh số", "Vì luôn tìm thấy ở bước 1", "Vì không cần so sánh"],
          answer: 0, explanation: "Nhờ danh sách đã sắp xếp, mỗi bước lặp loại được một nửa vùng tìm kiếm.", level: "thong-hieu", activity: "sap-xep-tim-kiem" },
        { question: "Sắp xếp giúp cho việc tìm kiếm được thực hiện nhanh hơn.", type: "true-false", answer: true,
          explanation: "Đúng — đây là mối liên quan giữa sắp xếp và tìm kiếm (SGK tr.77).", level: "nhan-biet", activity: "sap-xep-tim-kiem" },
      ],
      remember: ["Sắp xếp giúp cho việc tìm kiếm được thực hiện nhanh hơn."],
    },
    {
      id: "tro-choi-tim-so", name: "Hoạt động 2 — Trò chơi tìm số 🃏", type: "knowledge",
      goal: "Trải nghiệm tìm kiếm nhị phân qua trò chơi thẻ số.",
      time: 540,
      task: "Nhiệm vụ 3 — Hoạt động 2 (SGK tr.77): chơi theo cặp A–B với 10 thẻ úp theo thứ tự từ bé đến lớn. Trên máy: bạn B nhập số cần tìm rồi chọn thẻ ở vị trí giữa; máy (bạn A) trả lời “bằng nhau”, “lớn hơn” hoặc “bé hơn”. Đổi vai sau mỗi lượt.",
      sgkImage: "assets/sgk/sgk-trang77.jpg",
      guess: { title: "10 tấm thẻ của bạn A", intro: "Các thẻ đã được úp theo thứ tự từ bé đến lớn. Chọn thẻ ở vị trí giữa vùng còn lại!", cards: [2, 3, 5, 6, 8, 9, 11, 15, 16, 18], target: 15 },
      content: {
        heading: "🃏 Trò chơi tìm số",
        revealLabel: "📋 Chuẩn bị và cách chơi (SGK tr.77)",
        blocks: [
          { kind: "text", value: "Chuẩn bị: hai bạn chơi A, B và 10 tấm thẻ ghi 10 số khác nhau (các số đều nhỏ hơn 20). Ví dụ: 2, 3, 5, 6, 8, 9, 11, 15, 16, 18. A giữ 10 tấm thẻ, B là người tìm kiếm." },
          { kind: "list", value: [
            "Bước 1. A úp lần lượt 10 chiếc thẻ lên bàn theo thứ tự các số từ bé đến lớn.",
            "Bước 2. B cho A biết con số mình cần tìm.",
            "Bước 3. B chọn tấm thẻ ở vị trí giữa.",
            "Bước 4. A hé mở tấm thẻ và trả lời B bằng một trong ba cụm từ: “bằng nhau”, “lớn hơn” hoặc “bé hơn” tuỳ thuộc vào kết quả so sánh số B cần tìm với số ở vị trí giữa của dãy.",
            "Bước 5. Tuỳ vào câu trả lời của A mà B chọn nửa dãy tiếp theo để tìm kiếm.",
            "Bước 6. Lặp lại các bước 3, 4, 5 cho đến khi B tìm thấy số cần tìm hoặc đã tìm hết dãy số.",
            "Bước 7. Hoán đổi vị trí của A và B trong lượt chơi tiếp theo.",
          ] },
        ],
      },
      questions: [
        { question: "Với 10 thẻ (vị trí 1 → 10), thẻ ở vị trí giữa đầu tiên B cần chọn là thẻ ở vị trí số:", type: "multiple-choice",
          options: ["5", "6", "1", "10"],
          answer: 0, explanation: "Phần nguyên của (1 + 10)/2 = 5 → thẻ thứ 5 (số 8).", level: "van-dung", activity: "tro-choi-tim-so" },
        { question: "B cần tìm số 15. Theo tìm kiếm nhị phân, B tìm thấy sau bao nhiêu lượt?", type: "multiple-choice",
          options: ["1 lượt", "8 lượt", "2 lượt", "4 lượt"],
          answer: 2, explanation: "Lượt 1: thẻ 5 là 8, A nói “lớn hơn” → vùng 6 → 10. Lượt 2: thẻ 8 là 15 → “bằng nhau”.", level: "van-dung", activity: "tro-choi-tim-so" },
        { question: "B cần tìm số 7 (không có trong các thẻ). Sau bao nhiêu lượt B biết chắc là không có số này?", type: "multiple-choice",
          options: ["1 lượt", "2 lượt", "10 lượt", "4 lượt"],
          answer: 3, explanation: "Thẻ 5 (8): bé hơn → vùng 1 → 4; thẻ 2 (3): lớn hơn → vùng 3 → 4; thẻ 3 (5): lớn hơn → vùng 4 → 4; thẻ 4 (6): lớn hơn → vùng không còn thẻ nào → 4 lượt.", level: "van-dung-cao", activity: "tro-choi-tim-so" },
      ],
    },
    {
      id: "vi-du-thuc-te", name: "Ví dụ thực tế: sắp xếp và tìm kiếm 📚", type: "knowledge",
      goal: "Nêu ví dụ thực tế cho thấy mối liên quan giữa sắp xếp và tìm kiếm.",
      time: 240,
      task: "Nhiệm vụ 4 — cá nhân: nêu ví dụ trong thực tế cho thấy mối liên quan giữa sắp xếp và tìm kiếm (câu hỏi SGK tr.77).",
      sgkImage: "assets/sgk/sgk-trang77.jpg",
      questions: [
        { question: "Ví dụ nào cho thấy sắp xếp giúp tìm kiếm nhanh hơn? (Chọn tất cả đáp án đúng)", type: "multiple-select",
          options: ["Thư viện xếp sách theo chủ đề và tên sách", "Từ điển xếp các từ theo thứ tự bảng chữ cái", "Để đồ dùng lung tung trong cặp sách", "Siêu thị xếp hàng hoá theo từng loại, từng khu"],
          answer: [0, 1, 3], explanation: "Sách, từ, hàng hoá được sắp xếp giúp tìm nhanh. Đồ dùng để lung tung thì phải lục tìm lần lượt.", level: "van-dung", activity: "vi-du-thuc-te" },
        { question: "Danh bạ điện thoại xếp theo tên từ A đến Z. Tìm tên “Minh” nhanh nhất bằng cách nào?", type: "multiple-choice",
          options: ["Đọc từ tên đầu tiên", "Mở khoảng giữa danh bạ, so sánh rồi chỉ tìm tiếp ở nửa phù hợp", "Đọc từ tên cuối cùng", "Chọn ngẫu nhiên"],
          answer: 1, explanation: "Danh bạ đã sắp xếp nên có thể áp dụng cách chia đôi như tìm kiếm nhị phân.", level: "van-dung", activity: "vi-du-thuc-te" },
      ],
    },

    /* ===================== HĐ3: LUYỆN TẬP (8 phút) ===================== */
    {
      id: "o-cua-bi-mat", name: "Luyện tập — Trò chơi Ô cửa bí mật 🚪", type: "giftbox", boxIcon: "🚪",
      goal: "Củng cố: điều kiện áp dụng, số bước, đầu ra của thuật toán tìm kiếm nhị phân.",
      time: 480,
      task: "Các đội lần lượt chọn một ô cửa và trả lời câu hỏi. Trả lời đúng thì mở được ô cửa bí mật!",
      intro: "6 ô cửa — chọn ô cửa → trả lời → đúng thì nhận quà 🎉",
      prizes: ["👏 Một tràng pháo tay của cả lớp", "⭐ Ngôi sao may mắn", "🎁 Quà bí mật từ thầy/cô", "🏅 Danh hiệu “Thám tử nhị phân”", "🌟 Lời khen trước lớp", "🏆 Cộng điểm cho đội"],
      questions: [
        { question: "Câu 1: Thuật toán tìm kiếm nhị phân được sử dụng trong trường hợp nào?", type: "multiple-choice",
          options: ["Tìm một phần tử trong danh sách bất kỳ", "Tìm một phần tử trong danh sách đã sắp xếp"],
          answer: 1, explanation: "Tìm kiếm nhị phân thực hiện trên danh sách đã được sắp xếp.", level: "nhan-biet", activity: "o-cua-bi-mat" },
        { question: "Câu 2: Điều gì xảy ra khi thuật toán tìm kiếm nhị phân không tìm thấy giá trị cần tìm trong danh sách?", type: "multiple-choice",
          options: ["Tiếp tục tìm kiếm và không bao giờ kết thúc", "Thông báo “Tìm thấy” và tìm tiếp xem còn phần tử nào khác nữa không", "Thông báo “Tìm thấy” và kết thúc", "Thông báo “Không tìm thấy” và kết thúc"],
          answer: 3, explanation: "Vùng tìm kiếm không còn phần tử nào → kết luận không tìm thấy và kết thúc.", level: "nhan-biet", activity: "o-cua-bi-mat" },
        { question: "Câu 3: Chọn câu diễn đạt đúng hoạt động của thuật toán tìm kiếm nhị phân.", type: "multiple-choice",
          options: ["Tìm trên danh sách đã sắp xếp, bắt đầu từ đầu danh sách, chừng nào chưa tìm thấy và chưa tìm hết thì còn tìm tiếp", "Tìm trên danh sách đã sắp xếp, bắt đầu từ giữa danh sách, chừng nào chưa tìm thấy và chưa tìm hết thì còn tìm tiếp", "Tìm trên danh sách bất kì, bắt đầu từ giữa danh sách, chừng nào chưa tìm thấy và chưa tìm hết thì còn tìm tiếp", "Tìm trên danh sách bất kì, bắt đầu từ đầu danh sách, chừng nào chưa tìm thấy và chưa tìm hết thì còn tìm tiếp"],
          answer: 1, explanation: "Danh sách đã sắp xếp, bắt đầu từ vị trí giữa, chừng nào chưa tìm thấy và vùng tìm kiếm còn phần tử thì còn tìm tiếp.", level: "thong-hieu", activity: "o-cua-bi-mat" },
        { question: "Câu 4: Thuật toán tìm kiếm nhị phân cần bao nhiêu bước để tìm thấy “Mai” trong danh sách [“Hoa”, “Lan”, “Ly”, “Mai”, “Phong”, “Vi”]?", type: "multiple-choice",
          options: ["1", "2", "3", "4"],
          answer: 2, explanation: "Vị trí 3 (Ly): Mai lớn hơn → vùng 4 → 6; vị trí 5 (Phong): Mai nhỏ hơn → vùng 4 → 4; vị trí 4 (Mai) → tìm thấy sau 3 bước.", level: "van-dung", activity: "o-cua-bi-mat" },
        { question: "Câu 5: Thuật toán tìm kiếm nhị phân cần thực hiện bao nhiêu bước lặp để thông báo không tìm thấy số 15 trong danh sách [3, 5, 7, 11, 12, 25]?", type: "multiple-choice",
          options: ["3", "4", "5", "6"],
          answer: 0, explanation: "Vị trí 3 (7): lớn hơn → vùng 4 → 6; vị trí 5 (12): lớn hơn → vùng 6 → 6; vị trí 6 (25): nhỏ hơn → vùng không còn phần tử → Không tìm thấy sau 3 bước lặp (3 lần so sánh, cách đếm như SGK).", level: "van-dung-cao", activity: "o-cua-bi-mat" },
        { question: "Câu 6: Thực hiện thuật toán tìm kiếm nhị phân để tìm số 10 trong danh sách [2, 4, 6, 8, 10, 12]. Đầu ra của thuật toán là:", type: "multiple-choice",
          options: ["Thông báo “không tìm thấy”", "Thông báo “tìm thấy”", "Thông báo “tìm thấy”, giá trị cần tìm tại vị trí thứ 5 của danh sách", "Thông báo “tìm thấy”, giá trị cần tìm tại vị trí thứ 6 của danh sách"],
          answer: 2, explanation: "Vị trí 3 (6): lớn hơn → vùng 4 → 6; vị trí 5 (10): bằng nhau → tìm thấy tại vị trí thứ 5.", level: "van-dung", activity: "o-cua-bi-mat" },
      ],
    },
    {
      id: "lt-sap-xep", name: "Luyện tập SGK 1a — Sắp xếp tên các nước 🔤", type: "ordering",
      goal: "Sắp xếp danh sách theo thứ tự bảng chữ cái trước khi tìm kiếm nhị phân.",
      time: 180,
      task: "Luyện tập 1a (SGK tr.77, làm thêm hoặc ở nhà): sắp xếp danh sách tên các nước theo thứ tự trong bảng chữ cái rồi bấm Nộp bài.",
      sgkImage: "assets/sgk/sgk-trang77.jpg",
      steps: NUOC_SX,
      explanation: "Albania, Bolivia, Canada, Germany, Greenland, Iceland, Portugal, Scotland, Vietnam (Germany trước Greenland vì “e” đứng trước “r”).",
    },
    {
      id: "lt-iceland", name: "Luyện tập SGK 1b — Tìm “Iceland” bằng tìm kiếm nhị phân 📝", type: "fillblank",
      goal: "Liệt kê các bước lặp tìm kiếm nhị phân trên danh sách đã sắp xếp.",
      time: 300,
      task: "Luyện tập 1b: chọn đáp án cho từng ô để liệt kê các bước lặp tìm “Iceland” trong danh sách đã sắp xếp. Làm hết rồi bấm Nộp bài.",
      sgkImage: "assets/sgk/sgk-trang77.jpg",
      html: `<p style="text-align:center;font-size:1.1rem;margin:.2rem 0">${NUOC_SX.map((t, i) => `<span style="display:inline-block;border:2px solid #c7d2fe;border-radius:8px;padding:2px 8px;margin:2px"><sup>${i + 1}</sup> ${t}</span>`).join("")}</p>`,
      text: "Bước 1 · Vùng tìm kiếm 1 → 9 · Vị trí giữa: 5 ({{}}) · “Iceland” so với giá trị ở giữa: {{}} → vùng tìm kiếm mới: {{}}\nBước 2 · Vị trí giữa: {{}} ({{}}) · “Iceland” so với giá trị ở giữa: {{}} → vùng tìm kiếm mới: {{}}\nBước 3 · Vị trí giữa: 6 (Iceland) · So sánh: {{}} → Kết quả: {{}}",
      answers: [["Greenland"], ["Lớn hơn"], ["6 → 9"], ["7"], ["Portugal"], ["Nhỏ hơn"], ["6 → 6"], ["Bằng nhau"], ["Tìm thấy ở vị trí số 6"]],
      choices: [["Germany", "Greenland", "Iceland"], SS, ["6 → 9", "1 → 4", "5 → 9"], ["7", "8"], ["Portugal", "Scotland", "Iceland"], SS, ["6 → 6", "6 → 7", "8 → 9"], SS, ["Tìm thấy ở vị trí số 6", "Tìm thấy ở vị trí số 7", "Không tìm thấy"]],
      explanation: "Bước 1: vị trí 5 (Greenland), “I” đứng sau “G” → lớn hơn → vùng 6 → 9. Bước 2: phần nguyên của (6 + 9)/2 = 7 (Portugal), “I” đứng trước “P” → nhỏ hơn → vùng 6 → 6. Bước 3: vị trí 6 (Iceland) → bằng nhau → tìm thấy sau 3 bước lặp.",
    },
    {
      id: "lt-may", name: "Luyện tập SGK 1c, 2 — Máy kiểm tra và so sánh 🤖", type: "knowledge",
      goal: "Kiểm tra kết quả luyện tập; so sánh với tìm kiếm tuần tự (Bài 14); tự tạo bài toán tìm kiếm.",
      time: 300,
      task: "Bấm 🔤 Sắp xếp để sắp xếp danh sách tên nước, rồi tìm “Iceland” và kiểm tra bảng em vừa làm. Luyện tập 2: gõ danh sách của em (ví dụ tên các bạn trong tổ), sắp xếp và tìm một tên.",
      sgkImage: "assets/sgk/sgk-trang77.jpg",
      search: { mode: "binary", title: "Tìm tên nước", items: NUOC, target: "Iceland", editItems: true, col: "Tên nước ở giữa" },
      questions: [
        { question: "Luyện tập 1c: Tìm “Iceland” — tìm kiếm nhị phân (danh sách đã sắp xếp) cần 3 bước lặp; tìm kiếm tuần tự ở Luyện tập Bài 14 (danh sách chưa sắp xếp) cần bao nhiêu bước lặp?", type: "multiple-choice",
          options: ["3", "9", "5", "6"],
          answer: 3, explanation: "Ở Bài 14, Iceland ở vị trí số 6 của danh sách chưa sắp xếp → 6 bước lặp; nhị phân chỉ 3 bước lặp.", level: "van-dung", activity: "lt-may" },
        { question: "Với danh sách tên nước CHƯA sắp xếp, máy hiện cảnh báo. Vì sao phải sắp xếp trước khi tìm kiếm nhị phân?", type: "multiple-choice",
          options: ["Để danh sách đẹp hơn", "Để biết nên bỏ nửa nào — nếu chưa sắp xếp, giá trị cần tìm có thể nằm ở nửa bị bỏ đi", "Để có nhiều bước lặp hơn", "Vì máy tính không đọc được danh sách chưa sắp xếp"],
          answer: 1, explanation: "Tìm kiếm nhị phân chỉ đúng khi danh sách đã sắp xếp: so sánh với vị trí giữa mới biết giá trị cần tìm nằm ở nửa nào.", level: "van-dung-cao", activity: "lt-may" },
      ],
    },
    {
      id: "tro-choi", name: "Trò chơi: Chia đôi thần tốc ⚡", type: "penguin",
      pet: "🎯", homeIcon: "🏁", enemy: "🐢", saveWord: "mũi tên trúng đích",
      winText: "Chia đôi thần tốc — em đã làm chủ thuật toán tìm kiếm nhị phân!",
      goal: "Củng cố toàn bài.",
      time: 240,
      task: "Trả lời đúng mỗi câu để một mũi tên 🎯 về đích trước khi chú rùa 🐢 “tìm tuần tự” đuổi kịp!",
      intro: "Mỗi câu đúng: một mũi tên 🎯 về đích 🏁. Sai thì chú rùa 🐢 tiến lên!",
      questions: [
        { question: "Tìm kiếm nhị phân bắt đầu so sánh ở vị trí nào?", type: "multiple-choice",
          options: ["Vị trí đầu tiên", "Vị trí ở giữa danh sách", "Vị trí cuối cùng", "Vị trí bất kì"],
          answer: 1, explanation: "Bắt đầu từ vị trí ở giữa danh sách.", level: "nhan-biet", activity: "tro-choi" },
        { question: "Sau mỗi bước lặp (chưa tìm thấy), vùng tìm kiếm còn lại khoảng:", type: "multiple-choice",
          options: ["Một nửa", "Bớt đi 1 phần tử", "Không đổi", "Gấp đôi"],
          answer: 0, explanation: "Mỗi bước lặp thu hẹp vùng tìm kiếm chỉ còn một nửa.", level: "nhan-biet", activity: "tro-choi" },
        { question: "Vùng tìm kiếm từ vị trí 1 đến vị trí 8. Vị trí giữa là:", type: "multiple-choice",
          options: ["5", "4,5", "4", "8"],
          answer: 2, explanation: "Phần nguyên của (1 + 8)/2 = 4,5 → 4.", level: "van-dung", activity: "tro-choi" },
        { question: "Dãy [4, 9, 13, 20, 27, 31, 40]. Tìm số 31: vị trí giữa ở bước 1 và bước 2 lần lượt là:", type: "multiple-choice",
          options: ["4 và 2", "4 và 5", "3 và 6", "4 và 6"],
          answer: 3, explanation: "Bước 1: phần nguyên của (1 + 7)/2 = 4 (số 20), 31 lớn hơn → vùng 5 → 7; bước 2: phần nguyên của (5 + 7)/2 = 6 (số 31) → tìm thấy.", level: "van-dung", activity: "tro-choi" },
        { question: "So sánh “Lan” và “Minh” theo bảng chữ cái:", type: "multiple-choice",
          options: ["“Lan” nhỏ hơn “Minh” vì “L” đứng trước “M”", "“Lan” lớn hơn “Minh”", "Bằng nhau", "Không so sánh được"],
          answer: 0, explanation: "Kí tự đứng trước là “nhỏ hơn” kí tự đứng sau trong bảng chữ cái.", level: "thong-hieu", activity: "tro-choi" },
        { question: "Danh sách nào KHÔNG áp dụng trực tiếp được tìm kiếm nhị phân?", type: "multiple-choice",
          options: ["Từ điển Anh – Việt", "Danh sách học sinh xếp theo tên từ A đến Z", "Danh sách số điểm ghi theo thứ tự các bạn nộp bài (lộn xộn)", "Dãy số 1, 3, 5, 7, 9"],
          answer: 2, explanation: "Danh sách chưa được sắp xếp thì không áp dụng được tìm kiếm nhị phân.", level: "thong-hieu", activity: "tro-choi" },
        { question: "Danh sách 9 phần tử đã sắp xếp, giá trị cần tìm ở vị trí cuối cùng. Tìm kiếm nhị phân cần bao nhiêu bước lặp?", type: "multiple-choice",
          options: ["9", "1", "4", "2"],
          answer: 2, explanation: "Vị trí 5 → 7 → 8 → 9: 4 bước lặp (tuần tự cần 9 bước lặp).", level: "van-dung-cao", activity: "tro-choi" },
        { question: "Mối liên quan giữa sắp xếp và tìm kiếm là:", type: "multiple-choice",
          options: ["Sắp xếp làm tìm kiếm chậm hơn", "Hai việc không liên quan", "Tìm kiếm giúp sắp xếp nhanh hơn", "Sắp xếp giúp cho việc tìm kiếm được thực hiện nhanh hơn"],
          answer: 3, explanation: "Sắp xếp giúp cho việc tìm kiếm được thực hiện nhanh hơn.", level: "nhan-biet", activity: "tro-choi" },
      ],
    },

    /* ===================== HĐ4: VẬN DỤNG (7 phút) ===================== */
    {
      id: "van-dung", name: "Vận dụng — Tra từ điển và tìm sách yêu thích 💡", type: "vandung",
      goal: "Vận dụng tìm kiếm nhị phân vào tình huống thực tế.",
      time: 420,
      task: "Bài 1 (SGK tr.77): em tìm một từ tiếng Anh trong quyển từ điển theo cách nào, vì sao? Bài 2: tìm trên Internet danh sách khoảng 10 cuốn sách em yêu thích kèm đơn giá, sắp xếp theo tên rồi dùng tìm kiếm nhị phân tìm cuốn em thích nhất và cho biết đơn giá. Gửi thầy/cô câu trả lời.",
      intro: "Gửi câu trả lời cho thầy/cô.",
      sgkImage: "assets/sgk/sgk-trang77.jpg",
      search: { mode: "binary", title: "Thử tìm sách trong danh sách của em", items: ["Dế Mèn phiêu lưu kí", "Hoàng tử bé", "Không gia đình", "Totto-chan bên cửa sổ", "Tôi thấy hoa vàng trên cỏ xanh"], target: "Không gia đình", editItems: true, col: "Tên sách ở giữa", intro: "Gõ danh sách sách của em (cách nhau bởi dấu phẩy), bấm 🔤 Sắp xếp rồi tìm cuốn em thích nhất." },
      cases: [
        { question: "Bài 1: Em tìm một từ tiếng Anh trong quyển từ điển theo cách nào? Tại sao em lại dùng cách đó?",
          answer: "Mở khoảng giữa quyển từ điển, so sánh từ ở trang đó với từ cần tìm: nếu từ cần tìm đứng trước thì tìm tiếp ở nửa trước, đứng sau thì tìm ở nửa sau; lặp lại đến khi tìm thấy. Dùng cách này vì các từ trong từ điển đã được sắp xếp theo thứ tự bảng chữ cái nên chia đôi sẽ nhanh hơn nhiều so với đọc lần lượt từng từ." },
        { question: "Bài 2: Viết danh sách sách đã sắp xếp theo tên, các bước lặp tìm kiếm nhị phân cuốn sách em thích nhất và đơn giá của cuốn sách đó.",
          answer: "Các bước: lập danh sách khoảng 10 cuốn sách và đơn giá → sắp xếp tên sách theo thứ tự bảng chữ cái → chọn cuốn thích nhất → liệt kê các bước lặp (vùng tìm kiếm, vị trí giữa, so sánh) đến khi tìm thấy → ghi ra đơn giá của cuốn sách tìm được." },
      ],
    },

    /* ===================== TỔNG KẾT ===================== */
    {
      id: "tong-ket", name: "Tổng kết", type: "summary",
      task: "Cả lớp nhắc lại kiến thức trọng tâm và làm thử thách cuối. Dặn dò: học bài, làm bài tập 1, 2 SGK tr.77; đọc trước Bài 16 “Thuật toán sắp xếp”.",
      content: {
        learned: [
          "Tìm kiếm nhị phân thực hiện trên danh sách đã sắp xếp, bắt đầu từ vị trí ở giữa.",
          "Mỗi bước lặp: so sánh với giá trị ở vị trí giữa — bằng thì dừng, nhỏ hơn tìm nửa trước, lớn hơn tìm nửa sau.",
          "Vị trí giữa = phần nguyên của (vị trí đầu + vị trí cuối)/2; vùng tìm kiếm không còn phần tử → không tìm thấy.",
          "Sắp xếp giúp cho việc tìm kiếm được thực hiện nhanh hơn.",
        ],
        challenge: [
          { question: "Dãy [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]. Tìm số 23 bằng tìm kiếm nhị phân: các vị trí giữa lần lượt được xét là:", type: "multiple-choice",
            options: ["5 → 8 → 6", "5 → 7 → 6", "1 → 2 → … → 6", "6"],
            answer: 0, explanation: "Vùng 1 → 10: vị trí 5 (16), 23 lớn hơn → vùng 6 → 10; vị trí 8 (56), 23 nhỏ hơn → vùng 6 → 7; vị trí 6 (23) → tìm thấy.",
            level: "van-dung-cao", activity: "tong-ket" },
          { question: "Vì sao không thể dùng tìm kiếm nhị phân để tìm tên trong danh sách khách hàng ghi theo thứ tự ngày mua hàng?", type: "multiple-choice",
            options: ["Vì danh sách quá dài", "Vì tên có dấu tiếng Việt", "Vì danh sách chưa được sắp xếp theo tên", "Vì có số điện thoại"],
            answer: 2, explanation: "Tìm kiếm nhị phân chỉ thực hiện được trên danh sách đã được sắp xếp theo giá trị cần tìm (ở đây là tên).",
            level: "thong-hieu", activity: "tong-ket" },
        ],
      },
    },
  ],
};

if (typeof module !== "undefined" && module.exports) module.exports = LESSON;
if (typeof window !== "undefined") window.LESSON = LESSON;
