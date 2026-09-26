/* ============================================================================
 * BÀI 9a — SỬ DỤNG CÔNG CỤ XÁC THỰC DỮ LIỆU  (Tin học 9 — Kết nối tri thức)
 * Chủ đề 4 (lựa chọn a): Sử dụng bảng tính điện tử nâng cao — dự án Quản lí tài chính gia đình.
 * Bám sát SGK trang 34–40 + Kế hoạch bài dạy (2 tiết) của giáo viên.
 * Chỉ sửa file này để đổi nội dung. Engine app.js không cần sửa.
 * Bảng tính mô phỏng có QUY TẮC XÁC THỰC ĐẶT SẴN để HS nhập thử; việc thiết lập Data Validation HS làm trên Excel thật.
 * ==========================================================================*/

// ---- Quy tắc cột Số tiền (Hình 9a.9 – 9a.12) ----
const SO_TIEN_RULE = { type: "whole", op: ">", min: 0,
  input: { title: "Dữ liệu kiểu số", msg: "Giá trị lớn hơn 0" },
  error: { style: "stop", title: "Dữ liệu nhập sai", msg: "Hãy nhập lại dữ liệu kiểu số và lớn hơn 0" } };

// ---- Khoản mục thu, chi (Hình 9a.1) ----
const KHOAN_THU = ["Lương", "Thưởng", "Làm thêm", "Được cho/tặng", "Khác"];
const KHOAN_CHI = ["Ở", "Ăn", "Di chuyển", "Học tập", "Sức khoẻ", "Giải trí", "Quà tặng/Từ thiện", "Tiết kiệm", "Khác"];
const listCells = (col, items) => { const o = {}; items.forEach((t, i) => { o[col + (i + 2)] = t; }); return o; };

// Trang tính Chi tiêu (Hình 9a.2)
const chiSpec = (withRows, rules) => ({ title: "TaiChinhGiaDinh.xlsx", sheets: ["Chi tiêu", "Thu nhập"], cols: 6, rows: 10,
  widths: { A: 1.05, B: 1.45, C: 1.9, D: 1.9, E: 0.3, F: 1.75 },
  cells: Object.assign({ A1: "Chi tiêu", A2: "Ngày", B2: "Khoản chi", C2: "Nội dung", D2: "Số tiền (nghìn đồng)", F1: "Khoản chi" },
    withRows ? { A3: "14/8/23", B3: "Ở", C3: "Tiền điện tháng 8", D3: "800", A4: "15/8/23", B4: "Học tập", C4: "Học phí tháng 8", D4: "2200", A5: "30/8/23", B5: "Ăn", C5: "Tiền ăn tháng 8", D5: "3000" } : {},
    listCells("F", KHOAN_CHI)),
  bold: ["A2:D2", "F1"], center: ["A2:D2", "A3:A10", "F1"], size: { A1: 16 }, fill: { "F2:F10": "#f5b9a1" }, comma: ["D3:D10"],
  validate: rules });
const CHI_LIST_RULE = { "B3:B10": { list: "F2:F10" } };
const CHI_ALL_RULES = { "B3:B10": { list: "F2:F10" }, "D3:D10": SO_TIEN_RULE };
// Trang tính Thu nhập (Hình 9a.6, 9a.13)
const THU_SPEC = { title: "TaiChinhGiaDinh.xlsx", sheets: ["Thu nhập", "Chi tiêu"], cols: 6, rows: 8,
  widths: { A: 1.05, B: 1.45, C: 1.9, D: 1.9, E: 0.3, F: 1.6 },
  cells: Object.assign({ A1: "Thu nhập", A2: "Ngày", B2: "Khoản thu", C2: "Nội dung", D2: "Số tiền (nghìn đồng)", F1: "Khoản thu",
    A3: "13/8/23", B3: "Lương", C3: "Lương tháng 8", D3: "7000" }, listCells("F", KHOAN_THU)),
  bold: ["A2:D2", "F1"], center: ["A2:D2", "A3:A8", "F1"], size: { A1: 16 }, fill: { "F2:F6": "#aab8e0" }, comma: ["D3:D8"],
  validate: { "B3:B8": { list: "F2:F6" }, "D3:D8": SO_TIEN_RULE } };
// Vận dụng: Các khoản chi cho Triển lãm tin học (Hình 9a.15)
const TL_CHI_SPEC = { title: "KinhPhiTrienLam.xlsx", sheets: ["Các khoản thu", "Các khoản chi"], cols: 6, rows: 8,
  widths: { A: 1.05, B: 1.6, C: 1.9, D: 1.9, E: 0.3, F: 1.7 },
  cells: { A1: "Các khoản chi cho Triển lãm tin học", A2: "Ngày", B2: "Khoản chi", C2: "Nội dung", D2: "Số tiền (nghìn đồng)", F1: "Khoản chi", F2: "Văn phòng phẩm", F3: "In tài liệu" },
  bold: ["A2:D2", "F1"], center: ["A2:D2", "A3:A8", "F1"], size: { A1: 15 }, fill: { "F2:F3": "#f5b9a1" }, comma: ["D3:D8"],
  validate: { "B3:B8": { list: "F2:F3" }, "D3:D8": SO_TIEN_RULE } };

// ---- Mở đầu: bảng có dữ liệu nhập sai (ví dụ minh hoạ, tên hư cấu) ----
const LOI_SPEC = { title: "Theo_doi_lop_9A.xlsx", cols: 5, rows: 8, widths: { A: 0.6, B: 1.6, C: 1.6, D: 0.9, E: 1.5 },
  cells: { A1: "BẢNG THEO DÕI NỘP BÀI VÀ ĐĂNG KÍ VỞ — LỚP 9A", A3: "STT", B3: "Họ và tên", C3: "Ngày nộp bài", D3: "Điểm", E3: "Số vở đăng kí",
    A4: "1", B4: "Nguyễn An", C4: "25/09/2025", D4: "8", E4: "5",
    A5: "2", B5: "Trần Bình", C5: "32/09/2025", D5: "9", E5: "3",
    A6: "3", B6: "Lê Chi", C6: "26/09/2025", D6: "11", E6: "4",
    A7: "4", B7: "Phạm Dũng", C7: "26/09/2025", D7: "7", E7: "năm",
    B8: "Điểm TB / Tổng số vở:", D8: "=AVERAGE(D4:D7)", E8: "=SUM(E4:E7)" },
  bold: ["A1", "A3:E3", "B8:E8"], fill: { "A3:E3": "#bfdbfe" }, center: ["A3:E3", "A4:A7", "C4:C7"] };

// ---- Hình 9a.1 vẽ lại ----
const THU_CHI_HTML = `<div style="display:flex;flex-wrap:wrap;gap:16px;justify-content:center">
  ${[["Khoản thu", KHOAN_THU, "#aab8e0", "#1e3a8a"], ["Khoản chi", KHOAN_CHI, "#f5b9a1", "#9a3412"]].map(([t, list, bg, c]) =>
    `<div style="min-width:220px;border:2px solid ${c};border-radius:14px;overflow:hidden;background:#fff"><div style="font-weight:800;text-align:center;padding:8px;color:${c};font-size:1.15rem">${t}</div><div style="background:${bg};padding:8px 16px;font-size:1.1rem;line-height:1.6">${list.join("<br>")}</div></div>`).join("")}
  <div style="min-width:260px;border:2px dashed #0f766e;border-radius:14px;padding:12px 16px;background:#f0fdfa;font-size:1.05rem;line-height:1.55"><b style="color:#0f766e">📋 Cấu trúc bảng tính gợi ý</b><br>Ngày · Khoản thu/chi · Nội dung · Số tiền (nghìn đồng)<br><br><b style="color:#0f766e">🗂️ Tổ chức</b><br>Thu và Chi trên cùng một trang tính hoặc ở hai trang tính (Thu nhập, Chi tiêu); danh sách khoản mục để riêng ở cột F.</div></div>`;

const LESSON = {
  meta: {
    subject: "Tin học", grade: "9", book: "Kết nối tri thức với cuộc sống",
    title: "Bài 9a: Sử dụng công cụ xác thực dữ liệu", unit: "Chủ đề 4a — Sử dụng bảng tính điện tử nâng cao",
    pages: "34–40", durationMinutes: 90,
  },
  objectives: {
    knowledge: [
      "Sử dụng được công cụ xác thực dữ liệu (Data Validation) của phần mềm bảng tính để giải quyết bài toán quản lí tài chính.",
      "Hiểu khái niệm, vai trò của xác thực dữ liệu; biết dùng xác thực đầu vào để tránh nhập sai dữ liệu, đảm bảo tính chính xác.",
    ],
    competencies: [
      "Tự chủ và tự học; giao tiếp và hợp tác (xây dựng bảng tính quản lí tài chính gia đình theo nhóm); giải quyết vấn đề và sáng tạo.",
      "Năng lực số 1.3.TC2a: thiết kế bảng tính có cấu trúc rõ ràng, quản lí các trang tính Chi tiêu, Thu nhập trong một tệp.",
      "Năng lực số 1.3.TC2b: thiết lập quy tắc xác thực dữ liệu (danh sách chọn, số tiền > 0…); nhận biết, sửa lỗi nhập sai nhờ thông báo.",
      "Năng lực số 5.2.TC2b: khai thác bảng tính để quản lí thông tin thực tế; dữ liệu nhập đúng → kết quả thống kê chính xác.",
      "Năng lực AI 9.C3.1: cải thiện bộ dữ liệu (thêm, xoá, sửa) để nâng cao chất lượng sản phẩm AI.",
    ],
    qualities: ["Chăm chỉ, trung thực, trách nhiệm, cẩn thận khi nhập và kiểm tra dữ liệu."],
  },
  coreKnowledge: [
    "Các khoản mục tài chính gia đình thường phân thành hai loại: Thu và Chi. Bảng tính quản lí tài chính gồm: Ngày, Khoản thu/chi, Nội dung, Số tiền.",
    "Công cụ xác thực dữ liệu (Data Validation) hạn chế kiểu dữ liệu hoặc giá trị dữ liệu nhập vào ô tính, giúp việc nhập dữ liệu chính xác và thoả mãn yêu cầu bài toán.",
    "Lệnh: Data → nhóm Data Tools → Data Validation; chọn kiểu dữ liệu ở ô Allow (thẻ Settings): Any value, Whole number, Decimal, List, Date, Time, Text length, Custom.",
    "Danh sách thả xuống: Allow = List, Source = vùng chứa danh sách (ví dụ $F$2:$F$10).",
    "Số tiền là số nguyên lớn hơn 0: Allow = Whole number, Data = greater than, Minimum = 0; thẻ Input Message: lời nhắc khi chọn ô; thẻ Error Alert: thông báo lỗi khi nhập sai.",
  ],
  keywords: ["Data Validation", "Allow: List", "Source", "Input Message", "Error Alert"],
  settings: { basePoints: 100, useTimer: false, defaultTime: 60, sound: true, streakEnabled: true },

  activities: [
    /* =========================== TIẾT 1 =========================== */
    /* ===================== HĐ1: MỞ ĐẦU (5 phút) ===================== */
    {
      id: "mo-dau", name: "Mở đầu — Thám tử bắt lỗi dữ liệu 🕵️", type: "knowledge",
      goal: "Nhận ra hậu quả của việc nhập sai dữ liệu và nhu cầu kiểm soát dữ liệu đầu vào.",
      time: 300,
      task: "Nhóm 2–3 bạn: tìm các ô nhập sai dữ liệu trong bảng theo dõi của lớp 9A và cho biết hậu quả nếu không phát hiện ra.",
      sheet: LOI_SPEC,
      content: {
        heading: "🕵️ Bảng tính này có gì sai?",
        prompt: "Bảng theo dõi nộp bài và đăng kí vở của lớp 9A (ví dụ minh hoạ). Điểm từ 0 đến 10; ngày theo dạng ngày/tháng/năm; số vở là số nguyên.",
        revealLabel: "💡 Làm thế nào để tránh nhập sai?",
        blocks: [
          { kind: "list", value: ["Điểm 11 vượt quá thang điểm 10 → điểm trung bình D8 = 8.75 bị sai.", "Ngày 32/09/2025 không tồn tại.", "Số vở “năm” là chữ → hàm SUM bỏ qua, tổng số vở E8 = 12 thay vì 17.", "Có một công cụ giúp kiểm soát dữ liệu ngay khi nhập: Data Validation — công cụ xác thực dữ liệu."] },
        ],
      },
      questions: [
        { type: "sheet", question: "Bấm vào ô có điểm không hợp lệ.", answer: "D6",
          explanation: "Ô D6 = 11 vượt quá thang điểm 10.", level: "nhan-biet", activity: "mo-dau" },
        { type: "sheet", question: "Bấm vào ô có ngày tháng không hợp lệ.", answer: "C5",
          explanation: "Ô C5 = 32/09/2025: tháng 9 không có ngày 32.", level: "nhan-biet", activity: "mo-dau" },
        { type: "sheet", question: "Bấm vào ô nhập sai kiểu dữ liệu (cần là số nhưng lại là chữ).", answer: "E7",
          explanation: "Ô E7 = “năm” là dữ liệu văn bản, hàm SUM bỏ qua nên tổng số vở bị thiếu.", level: "thong-hieu", activity: "mo-dau" },
        { question: "Nếu những lỗi này không được phát hiện, điều gì có thể xảy ra?", type: "multiple-choice",
          options: ["Không ảnh hưởng gì vì bảng tính tự sửa", "Kết quả tính toán, thống kê, báo cáo bị sai", "Chỉ làm bảng tính kém đẹp", "Máy tính bị nhiễm virus"],
          answer: 1, explanation: "Dữ liệu sai → điểm trung bình, tổng số vở sai → thống kê, báo cáo nhầm. Cần kiểm soát dữ liệu ngay khi nhập.", level: "thong-hieu", activity: "mo-dau" },
      ],
      remember: ["Dữ liệu nhập đúng → kết quả tính toán, thống kê chính xác. Công cụ xác thực dữ liệu giúp đảm bảo dữ liệu nhập vào đúng yêu cầu."],
    },

    /* ===================== HĐ2.1: CÔNG CỤ XÁC THỰC DỮ LIỆU (10 phút) ===================== */
    {
      id: "thu-chi", name: "Quản lí tài chính gia đình bằng bảng tính 💰", type: "knowledge",
      goal: "Biết các khoản mục thu, chi của gia đình và cấu trúc bảng tính quản lí tài chính.",
      time: 300,
      task: "Hoạt động 1 (SGK tr.34), kĩ thuật khăn trải bàn: mỗi bạn ghi các khoản thu, chi của gia đình; cả nhóm thống nhất cấu trúc bảng tính quản lí tài chính.",
      sgkImage: "assets/sgk/sgk-trang34.jpg",
      content: {
        heading: "💰 Sử dụng bảng tính để quản lí tài chính gia đình",
        prompt: "Ưu điểm nổi bật của phần mềm bảng tính là xử lí dữ liệu tự động: kiểm soát tình hình chi tiêu cụ thể, trực quan, từ đó điều chỉnh chi tiêu phù hợp với thu nhập gia đình và mục tiêu phát triển.",
        revealLabel: "📋 Khoản mục thu, chi (Hình 9a.1) & cấu trúc bảng tính",
        blocks: [{ kind: "html", value: THU_CHI_HTML }],
      },
      questions: [
        { question: "Các khoản mục tài chính của gia đình thường được phân thành hai loại nào?", type: "multiple-choice",
          options: ["Ngày và Tháng", "Thu và Chi", "Tiền mặt và Thẻ", "Lương và Thưởng"],
          answer: 1, explanation: "Các khoản mục thường được phân thành hai loại là Thu và Chi; bảng tính quản lí tài chính gia đình gồm ít nhất hai loại đó.", level: "nhan-biet", activity: "thu-chi" },
        { question: "Bảng tính ghi chi tiêu (Hình 9a.2) gồm những cột nào? (Chọn tất cả đáp án đúng)", type: "multiple-select",
          options: ["Ngày", "Khoản chi", "Nội dung", "Số tiền (nghìn đồng)", "Mật khẩu ngân hàng"],
          answer: [0, 1, 2, 3], explanation: "Ngày · Khoản chi · Nội dung · Số tiền (nghìn đồng). Không lưu thông tin bí mật như mật khẩu vào bảng tính.", level: "nhan-biet", activity: "thu-chi" },
      ],
    },
    {
      id: "phan-loai-thu-chi", name: "Trò chơi: Khoản thu hay khoản chi? 🧺", type: "dragdrop",
      goal: "Phân loại đúng các khoản thu, chi của gia đình.",
      time: 150,
      task: "Xếp mỗi mục vào đúng loại Khoản thu hoặc Khoản chi. Xếp hết rồi bấm Nộp bài.",
      sgkImage: "assets/sgk/hinh-9a-1.jpg",
      groups: ["💵 Khoản thu", "🧾 Khoản chi"],
      items: [
        { text: "Lương tháng 8 của bố mẹ", group: 0 }, { text: "Tiền điện tháng 8", group: 1 },
        { text: "Thưởng cuối năm", group: 0 }, { text: "Học phí tháng 8", group: 1 },
        { text: "Tiền làm thêm cuối tuần", group: 0 }, { text: "Mua thuốc", group: 1 },
        { text: "Được ông bà tặng", group: 0 }, { text: "Tiền xăng xe", group: 1 },
        { text: "Ủng hộ quỹ từ thiện", group: 1 }, { text: "Gửi tiết kiệm", group: 1 },
      ],
      explanation: "Khoản thu: Lương, Thưởng, Làm thêm, Được cho/tặng… Khoản chi: Ở, Ăn, Di chuyển, Học tập, Sức khoẻ, Giải trí, Quà tặng/Từ thiện, Tiết kiệm… (Hình 9a.1).",
    },
    {
      id: "xac-thuc-la-gi", name: "Công cụ xác thực dữ liệu — nhập thử nhé! ✅", type: "knowledge",
      goal: "Hiểu công cụ xác thực dữ liệu hạn chế kiểu, giá trị dữ liệu nhập vào ô tính.",
      time: 420,
      task: "Trên trang tính Chi tiêu mô phỏng (đã đặt sẵn quy tắc như Hình 9a.2, 9a.3): chọn ô B6 bấm ▾ chọn khoản chi; gõ “Mua sắm” vào B7; chọn ô D6 xem lời nhắc rồi gõ thử 500, 0, -200, 1.5, abc. Quan sát rồi trả lời.",
      sgkImage: "assets/sgk/hinh-9a-2.jpg",
      sandbox: Object.assign(chiSpec(true, CHI_ALL_RULES), { intro: "🧪 Cột B: chỉ nhận khoản chi trong danh sách F2:F10 (bấm ▾). Cột D: chỉ nhận số nguyên lớn hơn 0. Nhập sai sẽ có thông báo lỗi — bấm Retry để nhập lại hoặc Cancel để huỷ." }),
      content: {
        heading: "✅ Công cụ xác thực dữ liệu (Data Validation)",
        prompt: "Khi dùng bảng tính quản lí tài chính, dữ liệu Thu và Chi có thể lưu trên cùng một trang tính hoặc hai trang tính khác nhau. Khi cập nhật khoản chi ở cột B, em chỉ cần chọn trong danh sách đã có ở cột F.",
        revealLabel: "💡 Kiến thức (SGK tr.35–36)",
        blocks: [
          { kind: "text", value: "Để hạn chế loại dữ liệu hoặc giá trị của dữ liệu khi nhập vào ô tính, em sử dụng công cụ xác thực dữ liệu (Data Validation)." },
          { kind: "image", value: "assets/sgk/hinh-9a-2.jpg", caption: "Hình 9a.2. Dữ liệu mỗi ô ở cột B được lấy từ danh sách các khoản chi ở cột F" },
          { kind: "image", value: "assets/sgk/hinh-9a-3.jpg", caption: "Hình 9a.3. Dữ liệu nhập vào cột Số tiền phải là dữ liệu kiểu số và có giá trị lớn hơn 0" },
          { kind: "ext", value: "Dữ liệu sạch, đúng kiểu cũng rất quan trọng với trí tuệ nhân tạo: AI học từ dữ liệu, dữ liệu sai sẽ khiến AI đưa ra kết quả sai. Kiểm soát và sửa (thêm, xoá, sửa) dữ liệu giúp nâng cao chất lượng sản phẩm AI." },
        ],
      },
      questions: [
        { question: "Em gõ “Mua sắm” vào ô B7 (cột Khoản chi) rồi nhấn Enter. Điều gì xảy ra?", type: "multiple-choice",
          options: ["Ô nhận “Mua sắm” bình thường", "Danh sách ở cột F tự thêm “Mua sắm”", "Xuất hiện thông báo lỗi vì “Mua sắm” không có trong danh sách khoản chi", "Bảng tính tự đổi thành “Khác”"],
          answer: 2, explanation: "Cột B chỉ nhận dữ liệu thuộc danh sách F2:F10. “Mua sắm” không có trong danh sách nên bị từ chối (có thể chọn “Khác”).", level: "thong-hieu", activity: "xac-thuc-la-gi" },
        { question: "Cột D chỉ nhận số nguyên lớn hơn 0. Giá trị nào dưới đây được chấp nhận?", type: "multiple-choice",
          options: ["-200", "0", "1500", "abc"],
          answer: 2, explanation: "1500 là số nguyên lớn hơn 0. -200 và 0 không lớn hơn 0; “abc” không phải dữ liệu kiểu số.", level: "van-dung", activity: "xac-thuc-la-gi" },
        { question: "Khi chọn ô D6, một khung nhỏ màu vàng hiện “Dữ liệu kiểu số — Giá trị lớn hơn 0”. Khung này có tác dụng gì?", type: "multiple-choice",
          options: ["Nhắc người nhập biết yêu cầu dữ liệu của ô trước khi nhập", "Báo máy tính bị lỗi", "Tự động nhập số tiền", "Xoá dữ liệu trong ô"],
          answer: 0, explanation: "Đây là lời nhắc (Input Message) hiện ra khi chọn ô, giúp người nhập biết yêu cầu để nhập đúng ngay từ đầu.", level: "thong-hieu", activity: "xac-thuc-la-gi" },
      ],
      remember: ["Công cụ xác thực dữ liệu (Data Validation) hạn chế kiểu dữ liệu hoặc giá trị dữ liệu nhập vào ô tính, giúp cho việc nhập dữ liệu được chính xác và thoả mãn những yêu cầu bài toán đặt ra."],
    },
    {
      id: "lenh-data-validation", name: "Lệnh Data Validation và các kiểu dữ liệu cho phép 🧰", type: "knowledge",
      goal: "Biết cách mở hộp thoại Data Validation và ý nghĩa các kiểu dữ liệu trong ô Allow.",
      time: 300,
      task: "Đọc SGK tr.36, quan sát Hình 9a.4, 9a.5 và Bảng 9a.1 rồi trả lời câu hỏi.",
      sgkImage: "assets/sgk/sgk-trang36.jpg",
      content: {
        heading: "🧰 Sử dụng công cụ xác thực dữ liệu",
        revealLabel: "🔍 Cách mở & Bảng 9a.1",
        blocks: [
          { kind: "text", value: "Trong nhóm lệnh Data Tools của dải lệnh Data, chọn Data Validation (Hình 9a.4). Hộp thoại Data Validation xuất hiện. Tại ô Allow trong thẻ Settings, em lựa chọn kiểu dữ liệu hoặc giá trị dữ liệu phù hợp với yêu cầu của từng bài toán (Hình 9a.5)." },
          { kind: "image", value: "assets/sgk/hinh-9a-4.jpg", caption: "Hình 9a.4. Nút lệnh Data Validation trong nhóm lệnh Data Tools" },
          { kind: "image", value: "assets/sgk/hinh-9a-5.jpg", caption: "Hình 9a.5. Lựa chọn kiểu dữ liệu hoặc giá trị dữ liệu" },
          { kind: "image", value: "assets/sgk/bang-9a-1.jpg", caption: "Bảng 9a.1. Các kiểu dữ liệu hoặc giá trị dữ liệu cho phép" },
        ],
      },
      questions: [
        { question: "Để sử dụng công cụ xác thực dữ liệu, em chọn:", type: "multiple-choice", sgkImage: "assets/sgk/hinh-9a-4.jpg",
          options: ["Home/Number/Format Cells", "Data/Data Tools/Data Validation", "Insert/Tables/Table", "Formulas/Function Library/Insert Function"],
          answer: 1, explanation: "Trong nhóm lệnh Data Tools của dải lệnh Data, chọn Data Validation.", level: "nhan-biet", activity: "lenh-data-validation" },
        { question: "Trong hộp thoại Data Validation, kiểu dữ liệu cho phép được chọn ở ô nào?", type: "multiple-choice", sgkImage: "assets/sgk/hinh-9a-5.jpg",
          options: ["Ô Allow trong thẻ Settings", "Ô Title trong thẻ Input Message", "Nút Clear All", "Ô Style trong thẻ Error Alert"],
          answer: 0, explanation: "Tại ô Allow trong thẻ Settings, em chọn kiểu dữ liệu hoặc giá trị dữ liệu (Hình 9a.5).", level: "nhan-biet", activity: "lenh-data-validation" },
      ],
    },
    {
      id: "bang-9a1", name: "Ghép kiểu dữ liệu với ý nghĩa (Bảng 9a.1) 🧩", type: "matching",
      goal: "Nhớ ý nghĩa các kiểu dữ liệu hoặc giá trị dữ liệu cho phép.",
      time: 180,
      task: "Ghép mỗi lựa chọn trong ô Allow với ý nghĩa của nó. Làm hết rồi bấm Nộp bài.",
      sgkImage: "assets/sgk/bang-9a-1.jpg",
      pairs: [
        { left: "Any value", right: "Bất kì giá trị nào" },
        { left: "Whole number", right: "Ô tính chỉ chấp nhận các số nguyên" },
        { left: "Decimal", right: "Ô tính chỉ chấp nhận các số thập phân" },
        { left: "List", right: "Chọn dữ liệu từ danh sách thả xuống" },
        { left: "Date", right: "Ô tính chỉ chấp nhận dữ liệu ngày tháng" },
        { left: "Time", right: "Ô tính chỉ chấp nhận dữ liệu thời gian" },
        { left: "Text length", right: "Hạn chế độ dài của văn bản nhập vào ô tính" },
        { left: "Custom", right: "Cho công thức tuỳ chỉnh" },
      ],
      explanation: "Bảng 9a.1: Any value · Whole number (số nguyên) · Decimal (số thập phân) · List (danh sách) · Date (ngày tháng) · Time (thời gian) · Text length (độ dài văn bản) · Custom (tuỳ chỉnh).",
    },
    {
      id: "chon-kieu", name: "Trò chơi: Cột này chọn Allow gì? 🎯", type: "dragdrop",
      goal: "Chọn đúng kiểu xác thực cho từng yêu cầu dữ liệu thực tế.",
      time: 180,
      task: "Xếp mỗi yêu cầu dữ liệu vào lựa chọn Allow phù hợp. Xếp hết rồi bấm Nộp bài.",
      groups: ["📋 List", "🔢 Whole number", "➗ Decimal", "📅 Date", "🔤 Text length"],
      items: [
        { text: "Khoản thu chọn từ danh sách Lương, Thưởng, Làm thêm…", group: 0 },
        { text: "Giới tính chỉ chọn Nam hoặc Nữ", group: 0 },
        { text: "Số tiền (nghìn đồng) là số nguyên lớn hơn 0", group: 1 },
        { text: "Số học sinh của lớp từ 1 đến 50", group: 1 },
        { text: "Chiều cao (mét), ví dụ 1.62", group: 2 },
        { text: "Điểm trung bình môn từ 0 đến 10, có phần thập phân", group: 2 },
        { text: "Ngày chi tiêu trong tháng 8/2023", group: 3 },
        { text: "Ngày sinh của học sinh", group: 3 },
        { text: "Mã học sinh không quá 8 kí tự", group: 4 },
        { text: "Số điện thoại phụ huynh đúng 10 kí tự", group: 4 },
      ],
      explanation: "Chọn từ danh sách → List · số nguyên → Whole number · số có phần thập phân → Decimal · ngày tháng → Date · giới hạn số kí tự → Text length.",
    },
    {
      id: "cau-hoi-9a6", name: "Câu hỏi SGK: Trang tính Thu nhập cần xác thực gì? ❓", type: "knowledge",
      goal: "Xác định điều kiện xác thực phù hợp cho cột Khoản thu.",
      time: 180,
      task: "Câu hỏi SGK tr.37: quan sát trang tính Thu nhập (Hình 9a.6) và cho biết dữ liệu ở cột B cần được thiết lập để thoả mãn điều kiện xác thực nào.",
      sgkImage: "assets/sgk/hinh-9a-6.jpg",
      sheet: Object.assign({}, THU_SPEC, { validate: undefined }),
      questions: [
        { question: "Dữ liệu ở cột B (Khoản thu) cần được thiết lập điều kiện xác thực nào?", type: "multiple-choice",
          options: ["Allow: Whole number, lớn hơn 0", "Allow: List, Source là danh sách các khoản thu ở cột F", "Allow: Date", "Allow: Any value"],
          answer: 1, explanation: "Dữ liệu cột B phải là một mục trong danh sách các Khoản thu (Lương, Thưởng, Làm thêm, Được cho/tặng, Khác) ở cột F → Allow: List, Source: $F$2:$F$6.", level: "van-dung", activity: "cau-hoi-9a6" },
        { type: "sheet", question: "Kéo chọn vùng dữ liệu em sẽ đưa vào ô Source cho cột Khoản thu.", answer: "F2:F6",
          explanation: "Vùng chứa danh sách các khoản thu là F2:F6 (Source: =$F$2:$F$6).", level: "van-dung", activity: "cau-hoi-9a6" },
      ],
    },

    /* =========================== TIẾT 2 =========================== */
    /* ===================== HĐ2.2: THỰC HÀNH (17 phút + luyện tập) ===================== */
    {
      id: "nv1-cac-buoc", name: "Nhiệm vụ 1 — Sắp xếp các bước tạo danh sách thả xuống 🔢", type: "ordering",
      goal: "Nắm quy trình dùng công cụ xác thực dữ liệu thuộc danh sách cho trước.",
      time: 150,
      task: "Sắp xếp các bước để dữ liệu mỗi ô ở cột B là một mục trong danh sách ở cột F. Xếp xong bấm Nộp bài.",
      sgkImage: "assets/sgk/sgk-trang37.jpg",
      steps: [
        "Tạo trang tính Chi tiêu, nhập danh sách khoản chi ở cột F (F2:F10)",
        "Chọn các ô của cột B cần nhập dữ liệu, ví dụ B3:B10",
        "Chọn Data → Data Tools → Data Validation",
        "Trong thẻ Settings, ở ô Allow chọn List",
        "Ở ô Source chọn vùng F2:F10 rồi chọn OK",
        "Nhập dữ liệu, cột B chọn từ danh sách thả xuống; lưu tệp TaiChinhGiaDinh.xlsx",
      ],
      explanation: "Tạo danh sách → chọn vùng cần xác thực → Data Validation → Allow: List → Source: F2:F10 → OK → nhập dữ liệu, lưu tệp.",
    },
    {
      id: "nv1-thuc-hanh", name: "Thực hành Nhiệm vụ 1: Danh sách khoản chi thả xuống 📋", type: "knowledge",
      goal: "Tạo trang tính Chi tiêu, dùng xác thực dữ liệu kiểu List cho cột Khoản chi.",
      time: 600,
      task: "Trên Excel: tạo bảng tính có trang tính Chi tiêu như Hình 9a.7; dùng Data Validation (List, Source F2:F10) cho B3:B10; nhập dữ liệu như Hình 9a.2; lưu TaiChinhGiaDinh.xlsx. Bảng mô phỏng bên dưới cho em xem trước kết quả sau khi thiết lập.",
      sgkImage: "assets/sgk/hinh-9a-8.jpg",
      sandbox: Object.assign(chiSpec(false, CHI_LIST_RULE), { intro: "🧪 Kết quả sau khi thiết lập: chọn một ô B3 → B10, bấm ▾ để chọn khoản chi; nhập Ngày, Nội dung, Số tiền như Hình 9a.2." }),
      content: {
        heading: "📋 Nhiệm vụ 1: Sử dụng công cụ xác thực dữ liệu cho các khoản chi",
        revealLabel: "📖 Hướng dẫn (SGK tr.37–38)",
        blocks: [
          { kind: "list", value: [
            "a) Khởi động phần mềm bảng tính. Đặt tên trang tính hiện hành là Chi tiêu. Tạo bảng và nhập dữ liệu khoản chi (cột F) như Hình 9a.7.",
            "b) Chọn các ô của cột B (ví dụ B3:B10) → Data Tools/Data Validation → thẻ Settings: Allow chọn List; Source: chọn vùng F2:F10 (ô Source hiện =$F$2:$F$10) → OK.",
            "Nhập dữ liệu cho trang tính, dữ liệu cột B lấy từ danh sách thả xuống (Hình 9a.2). Lưu tệp với tên TaiChinhGiaDinh.xlsx.",
          ] },
          { kind: "image", value: "assets/sgk/hinh-9a-7.jpg", caption: "Hình 9a.7. Trang tính lưu các khoản chi" },
          { kind: "image", value: "assets/sgk/hinh-9a-8.jpg", caption: "Hình 9a.8. Chọn vùng dữ liệu chứa danh sách các khoản chi" },
        ],
      },
      questions: [
        { question: "Nhiệm vụ 1: Trong ô Source (Hình 9a.8) em nhập vùng nào? (gõ địa chỉ vùng)", type: "short", answer: ["F2:F10", "$F$2:$F$10", "=$F$2:$F$10"],
          explanation: "Source là vùng dữ liệu chứa danh sách các khoản chi: F2:F10 (hiển thị =$F$2:$F$10).", level: "nhan-biet", activity: "nv1-thuc-hanh" },
        { question: "Ô B5 có xác thực List. Em gõ đúng chữ “Học tập” (có trong danh sách) thay vì chọn bằng nút ▾. Ô có nhận không?", type: "true-false", answer: true,
          explanation: "Đúng. Dữ liệu hợp lệ vì thuộc danh sách; danh sách thả xuống chỉ giúp nhập nhanh và không sai chính tả.", level: "van-dung", activity: "nv1-thuc-hanh" },
        { question: "Nếu em chỉ chọn B3:B5 khi thiết lập Data Validation, ô B8 sẽ thế nào?", type: "multiple-choice",
          options: ["Cũng có danh sách thả xuống", "Không có xác thực, nhập gì cũng được", "Không nhập được gì", "Tự sao chép dữ liệu từ B5"],
          answer: 1, explanation: "Xác thực chỉ áp dụng cho vùng đã chọn khi thiết lập. Vì vậy cần chọn đủ các ô sẽ nhập dữ liệu (ví dụ B3:B10).", level: "van-dung-cao", activity: "nv1-thuc-hanh" },
      ],
    },
    {
      id: "nv2-thuc-hanh", name: "Thực hành Nhiệm vụ 2: Số tiền phải là số lớn hơn 0 💵", type: "knowledge",
      goal: "Thiết lập xác thực Whole number > 0, lời nhắc (Input Message) và thông báo lỗi (Error Alert) cho cột Số tiền.",
      time: 600,
      task: "Trên Excel: chọn D3:D10 → Data Validation: Settings như Hình 9a.9, Input Message như Hình 9a.10, Error Alert như Hình 9a.11; nhập thêm dữ liệu, thử nhập sai để thấy thông báo Hình 9a.12; lưu tệp. Bảng mô phỏng bên dưới đã đặt sẵn các thiết lập này để em nhập thử.",
      sgkImage: "assets/sgk/hinh-9a-9.jpg",
      sandbox: Object.assign(chiSpec(true, CHI_ALL_RULES), { intro: "🧪 Chọn ô D6: thấy lời nhắc “Dữ liệu kiểu số — Giá trị lớn hơn 0”. Gõ -200 rồi Enter: xuất hiện thông báo “Dữ liệu nhập sai” như Hình 9a.12." }),
      content: {
        heading: "💵 Nhiệm vụ 2: Xác thực cột Số tiền (nghìn đồng)",
        revealLabel: "📖 Hướng dẫn (SGK tr.38–39)",
        blocks: [
          { kind: "list", value: [
            "Chọn trang tính Chi tiêu; chọn vùng nhập liệu của cột Số tiền, ví dụ D3:D10; chọn Data/Data Tools/Data Validation.",
            "Thẻ Settings: Allow: Whole number · Data: greater than · Minimum: 0 (Hình 9a.9).",
            "Thẻ Input Message: Title “Dữ liệu kiểu số”, Input message “Giá trị lớn hơn 0” (Hình 9a.10).",
            "Thẻ Error Alert: Style Stop, Title “Dữ liệu nhập sai”, Error message “Hãy nhập lại dữ liệu kiểu số và lớn hơn 0” (Hình 9a.11).",
            "Nhập thêm dữ liệu vào bảng; nhập sai sẽ xuất hiện thông báo như Hình 9a.12. Lưu tệp.",
          ] },
          { kind: "image", value: "assets/sgk/hinh-9a-9.jpg", caption: "Hình 9a.9. Nhập các yêu cầu xác thực dữ liệu của cột Số tiền" },
          { kind: "image", value: "assets/sgk/hinh-9a-10.jpg", caption: "Hình 9a.10. Nhập nội dung thông báo sẽ hiển thị khi nhập dữ liệu" },
          { kind: "image", value: "assets/sgk/hinh-9a-11.jpg", caption: "Hình 9a.11. Nhập nội dung thông báo lỗi" },
          { kind: "image", value: "assets/sgk/hinh-9a-12.jpg", caption: "Hình 9a.12. Thông báo xuất hiện khi dữ liệu nhập vào ô tính không đúng kiểu hoặc không đúng giá trị cho phép" },
        ],
      },
      questions: [
        { question: "Thẻ Settings cho cột Số tiền (Hình 9a.9) được thiết lập thế nào?", type: "multiple-choice", sgkImage: "assets/sgk/hinh-9a-9.jpg",
          options: ["Allow: List · Source: D3:D10", "Allow: Whole number · Data: greater than · Minimum: 0", "Allow: Decimal · Data: less than · Maximum: 0", "Allow: Text length · Data: equal to · Length: 0"],
          answer: 1, explanation: "Số tiền là số nguyên lớn hơn 0: Whole number, greater than, Minimum 0.", level: "thong-hieu", activity: "nv2-thuc-hanh" },
        { question: "Trong thông báo lỗi kiểu Stop (Hình 9a.12), bấm nút Retry để làm gì?", type: "multiple-choice",
          options: ["Nhập lại dữ liệu vào ô đó", "Chấp nhận dữ liệu sai", "Xoá toàn bộ trang tính", "Tắt công cụ xác thực"],
          answer: 0, explanation: "Retry: quay lại ô để nhập lại dữ liệu đúng. Cancel: huỷ, trả lại giá trị cũ của ô.", level: "thong-hieu", activity: "nv2-thuc-hanh" },
        { question: "Cột Số tiền đặt Whole number > 0. Em gõ 150.5 vào ô D7. Kết quả là:", type: "multiple-choice",
          options: ["Ô nhận 150.5", "Ô tự làm tròn thành 151", "Xuất hiện thông báo “Dữ liệu nhập sai” vì không phải số nguyên", "Ô đổi thành 0"],
          answer: 2, explanation: "Whole number chỉ chấp nhận số nguyên. Muốn nhận cả số thập phân thì chọn Decimal.", level: "van-dung-cao", activity: "nv2-thuc-hanh" },
      ],
      remember: ["Settings: đặt kiểu, giá trị cho phép · Input Message: lời nhắc khi chọn ô · Error Alert: thông báo lỗi khi nhập sai."],
    },
    {
      id: "ba-the", name: "Ghép thẻ của hộp thoại Data Validation 🗂️", type: "matching",
      goal: "Phân biệt chức năng các thẻ và thiết lập trong hộp thoại Data Validation.",
      time: 150,
      task: "Ghép mỗi thiết lập với chức năng của nó. Làm hết rồi bấm Nộp bài.",
      pairs: [
        { left: "Thẻ Settings", right: "Chọn kiểu dữ liệu, giá trị cho phép (Allow, Data, Minimum, Source…)" },
        { left: "Thẻ Input Message", right: "Nội dung nhắc nhở hiện ra khi chọn ô" },
        { left: "Thẻ Error Alert", right: "Nội dung thông báo lỗi khi nhập dữ liệu sai" },
        { left: "Source", right: "Vùng dữ liệu chứa danh sách thả xuống" },
        { left: "Style: Stop", right: "Không cho nhập dữ liệu sai (chỉ Retry hoặc Cancel)" },
        { left: "Clear All", right: "Xoá các thiết lập xác thực của ô đã chọn" },
      ],
      explanation: "Settings — điều kiện · Input Message — lời nhắc · Error Alert — thông báo lỗi · Source — vùng danh sách · Stop — chặn dữ liệu sai · Clear All — xoá thiết lập.",
    },

    /* ===================== HĐ3: LUYỆN TẬP (10 phút) ===================== */
    {
      id: "hop-qua", name: "Luyện tập: Mở quà bí mật 🎁", type: "giftbox",
      goal: "Củng cố kiến thức về công cụ xác thực dữ liệu.",
      time: 360,
      task: "Mỗi nhóm lần lượt chọn một hộp quà và trả lời câu hỏi. Trọng tài công bố, thư kí ghi điểm; trả lời đúng thì mở quà bí mật!",
      intro: "8 hộp quà — chọn hộp → trả lời → đúng thì nhận quà 🎉",
      prizes: ["👏 Một tràng pháo tay của cả lớp", "⭐ Ngôi sao may mắn", "🎁 Quà bí mật từ thầy/cô", "🏅 Danh hiệu “Chuyên gia dữ liệu”", "🌟 Lời khen trước lớp", "🍀 Ngôi sao may mắn", "🏆 Danh hiệu “Kế toán nhí”", "🎁 Quà bí mật từ thầy/cô"],
      questions: [
        { question: "Để quản lí tài chính gia đình một cách thuận tiện và hiệu quả, sử dụng phần mềm nào thích hợp nhất?", type: "multiple-choice",
          options: ["Microsoft Word", "Microsoft Excel", "Microsoft PowerPoint", "Microsoft Access"],
          answer: 1, explanation: "Phần mềm bảng tính (Microsoft Excel) xử lí dữ liệu tự động, thích hợp quản lí thu, chi.", level: "nhan-biet", activity: "hop-qua" },
        { question: "Để hạn chế loại dữ liệu hoặc giá trị dữ liệu khi nhập vào ô tính, cần sử dụng công cụ nào?", type: "multiple-choice",
          options: ["Công cụ xác thực dữ liệu", "Công cụ hỗ trợ tính toán", "Công cụ sắp xếp dữ liệu", "Công cụ lọc dữ liệu"],
          answer: 0, explanation: "Công cụ xác thực dữ liệu (Data Validation).", level: "nhan-biet", activity: "hop-qua" },
        { question: "Để sử dụng công cụ xác thực dữ liệu, chọn:", type: "multiple-choice",
          options: ["Data/Data Tools/Consolidate", "Data/Data Tools/Flash Fill", "Data/Data Tools/Data Validation", "Data/Data Tools/Remove Duplicates"],
          answer: 2, explanation: "Data/Data Tools/Data Validation.", level: "nhan-biet", activity: "hop-qua" },
        { question: "Đâu KHÔNG phải là một lựa chọn trong ô Allow?", type: "multiple-choice",
          options: ["Decimal", "List", "Text length", "Data"],
          answer: 3, explanation: "Các lựa chọn: Any value, Whole number, Decimal, List, Date, Time, Text length, Custom. “Data” không có (dễ nhầm với Date).", level: "thong-hieu", activity: "hop-qua" },
        { question: "Muốn khi chọn ô sẽ hiện dòng nhắc “Giá trị lớn hơn 0”, em nhập nội dung ở thẻ nào?", type: "multiple-choice",
          options: ["Settings", "Error Alert", "Input Message", "Clear All"],
          answer: 2, explanation: "Thẻ Input Message: nội dung thông báo hiển thị khi chọn ô để nhập dữ liệu.", level: "nhan-biet", activity: "hop-qua" },
        { question: "Cột Khoản thu lấy dữ liệu từ danh sách F2:F6. Ở ô Allow em chọn:", type: "multiple-choice",
          options: ["Any value", "List", "Whole number", "Custom"],
          answer: 1, explanation: "Dữ liệu thuộc danh sách cho trước → List, Source = $F$2:$F$6.", level: "thong-hieu", activity: "hop-qua" },
        { question: "Ô có xác thực Whole number, lớn hơn 0. Giá trị nào bị từ chối?", type: "multiple-choice",
          options: ["7000", "1", "250", "-50"],
          answer: 3, explanation: "-50 không lớn hơn 0 nên bị từ chối.", level: "van-dung", activity: "hop-qua" },
        { question: "Vì sao nên dùng danh sách thả xuống cho cột Khoản chi?", type: "multiple-choice",
          options: ["Để bảng tính có nhiều màu", "Nhập nhanh, thống nhất tên khoản mục, tránh sai chính tả → thống kê chính xác", "Để không cần nhập Số tiền", "Để tự động tính tổng chi"],
          answer: 1, explanation: "Tên khoản mục thống nhất giúp tổng hợp, thống kê theo khoản mục chính xác (ví dụ không có cả “Học tập” lẫn “hoc tap”).", level: "van-dung-cao", activity: "hop-qua" },
      ],
    },
    {
      id: "luyen-tap-thuc-hanh", name: "Luyện tập SGK: Trang tính Thu nhập 🧾", type: "knowledge",
      goal: "Tạo trang tính Thu nhập với xác thực List cho Khoản thu và Whole number > 0 cho Số tiền.",
      time: 480,
      task: "Luyện tập 1, 2 (SGK tr.40) trên Excel: mở TaiChinhGiaDinh.xlsx, tạo trang tính Thu nhập như Hình 9a.6; xác thực cột B (List, F2:F6) và cột D (như trang Chi tiêu); nhập thêm ít nhất 3 hàng. Bảng mô phỏng: nhập thử 3 hàng để kiểm tra.",
      sgkImage: "assets/sgk/hinh-9a-13.jpg",
      sandbox: Object.assign({}, THU_SPEC, { intro: "🧪 Nhập thêm ít nhất 3 hàng (Ngày, Khoản thu chọn bằng ▾, Nội dung, Số tiền). Thử nhập sai để kiểm tra các quy tắc xác thực." }),
      questions: [
        { question: "Luyện tập 1b: Để khoản thu ở cột B được lấy từ danh sách ở cột F, em thiết lập:", type: "multiple-choice",
          options: ["Allow: List · Source: =$F$2:$F$6", "Allow: List · Source: =$B$3:$B$6", "Allow: Whole number · Minimum: 0", "Allow: Text length · Maximum: 6"],
          answer: 0, explanation: "Nguồn danh sách là các khoản thu ở F2:F6.", level: "van-dung", activity: "luyen-tap-thuc-hanh" },
        { question: "Luyện tập 2: Hạn chế cột Số tiền của trang Thu nhập “tương tự như yêu cầu của trang tính Chi tiêu” nghĩa là:", type: "multiple-choice",
          options: ["Chỉ nhận chữ", "Chỉ nhận số nguyên lớn hơn 0, có lời nhắc và thông báo lỗi như trang Chi tiêu", "Chỉ nhận số âm", "Chỉ nhận ngày tháng"],
          answer: 1, explanation: "Whole number · greater than · Minimum 0; Input Message và Error Alert giống trang tính Chi tiêu.", level: "thong-hieu", activity: "luyen-tap-thuc-hanh" },
      ],
    },
    {
      id: "tu-kiem-tra", name: "Phiếu tự kiểm tra tệp TaiChinhGiaDinh.xlsx 📋", type: "checklist",
      goal: "Tự đánh giá mức độ hoàn thành sản phẩm thực hành trên Excel.",
      time: 180,
      task: "Nhóm đối chiếu tệp TaiChinhGiaDinh.xlsx trên Excel, tick từng việc vào cột Đã làm hoặc Chưa làm, ghi lỗi thường gặp rồi gửi cho thầy/cô.",
      columns: ["✅ Đã làm", "⏳ Chưa làm"],
      sections: [
        { title: "📋 TRANG TÍNH CHI TIÊU", items: [
          "Đặt tên trang tính Chi tiêu và nhập danh sách khoản chi ở cột F",
          "Cột B có danh sách thả xuống (List, Source F2:F10)",
          "Cột D chỉ nhận số nguyên lớn hơn 0",
          "Có lời nhắc Input Message khi chọn ô cột D",
          "Có thông báo lỗi Error Alert kiểu Stop khi nhập sai",
        ] },
        { title: "🧾 TRANG TÍNH THU NHẬP", items: [
          "Tạo trang tính Thu nhập và nhập danh sách khoản thu ở cột F",
          "Cột B lấy dữ liệu từ danh sách F2:F6",
          "Cột D xác thực giống trang tính Chi tiêu",
          "Nhập thêm ít nhất ba hàng dữ liệu",
          "Lưu tệp TaiChinhGiaDinh.xlsx",
        ] },
      ],
      note: "Nhóm em hay mắc lỗi gì khi thiết lập xác thực dữ liệu? Em đã khắc phục thế nào?",
      modelAnswer: [
        "Lỗi thường gặp: chọn thiếu ô cần xác thực (chỉ B3 thay vì B3:B10); Source chọn cả tiêu đề F1; quên thẻ Input Message / Error Alert; chọn Decimal thay vì Whole number.",
        "Khắc phục: chọn lại vùng, mở Data Validation sửa thiết lập (Clear All để làm lại từ đầu), nhập thử dữ liệu sai để kiểm tra.",
      ],
    },

    /* ===================== HĐ4: VẬN DỤNG (3 phút + ở nhà) ===================== */
    {
      id: "van-dung", name: "Vận dụng: Kinh phí Triển lãm tin học 🏛️", type: "knowledge",
      goal: "Vận dụng xác thực dữ liệu để quản lí thu, chi của dự án Triển lãm tin học.",
      time: 300,
      task: "Tạo tệp KinhPhiTrienLam.xlsx gồm trang tính Các khoản thu (Hình 9a.14) và Các khoản chi (Hình 9a.15), dùng xác thực dữ liệu để nhập chính xác. Nhập thử trên trang Các khoản chi mô phỏng, trả lời câu hỏi; hoàn thiện ở nhà.",
      sgkImage: "assets/sgk/sgk-trang40.jpg",
      sandbox: Object.assign({}, TL_CHI_SPEC, { intro: "🧪 Trang tính Các khoản chi (mô phỏng): cột B chọn từ F2:F3, cột D là số nguyên lớn hơn 0." }),
      content: {
        heading: "🏛️ Quản lí kinh phí Triển lãm tin học",
        revealLabel: "🖼️ Xem Hình 9a.14, 9a.15",
        blocks: [
          { kind: "image", value: "assets/sgk/hinh-9a-14.jpg", caption: "Hình 9a.14. Trang tính lưu các khoản thu" },
          { kind: "image", value: "assets/sgk/hinh-9a-15.jpg", caption: "Hình 9a.15. Trang tính lưu các khoản chi" },
        ],
      },
      questions: [
        { question: "Cột Khoản thu của trang tính Các khoản thu (Hình 9a.14) nên xác thực thế nào?", type: "multiple-choice",
          options: ["Allow: List · Source: =$F$2:$F$3 (Quỹ, Tài trợ)", "Allow: Whole number · Minimum: 0", "Allow: Date", "Không cần xác thực"],
          answer: 0, explanation: "Khoản thu chọn từ danh sách Quỹ, Tài trợ ở F2:F3.", level: "van-dung", activity: "van-dung" },
        { question: "Nhóm thêm khoản chi “Trang trí” vào ô F4, nhưng Source vẫn là $F$2:$F$3. Danh sách thả xuống ở cột B sẽ:", type: "multiple-choice",
          options: ["Tự có thêm “Trang trí”", "Không có “Trang trí”; cần sửa Source thành $F$2:$F$4", "Bị xoá hết", "Báo lỗi ngay lập tức"],
          answer: 1, explanation: "Danh sách chỉ lấy các ô trong vùng Source. Thêm mục mới thì mở lại Data Validation, sửa Source cho đủ vùng.", level: "van-dung-cao", activity: "van-dung" },
      ],
    },
    {
      id: "van-dung-nha", name: "Vận dụng — Thiết kế quy tắc xác thực cho dự án 📝", type: "vandung",
      goal: "Đề xuất quy tắc xác thực phù hợp cho từng cột của bảng tính kinh phí dự án.",
      time: 180,
      task: "Nhóm thảo luận, gửi câu trả lời cho thầy/cô; hoàn thiện tệp KinhPhiTrienLam.xlsx ở nhà, gửi sản phẩm qua mail hoặc nhóm lớp. Tiết sau báo cáo.",
      intro: "Gửi câu trả lời cho thầy/cô rồi bấm để xem hướng chốt.",
      cases: [
        { question: "Liệt kê các cột của hai trang tính Các khoản thu, Các khoản chi và quy tắc xác thực em đặt cho từng cột (Allow, Source/Minimum, lời nhắc, thông báo lỗi).",
          answer: "Ví dụ: Ngày — Date (trong thời gian thực hiện dự án); Khoản thu — List, Source $F$2:$F$3 (Quỹ, Tài trợ); Khoản chi — List, Source $F$2:$F$3 (Văn phòng phẩm, In tài liệu); Nội dung — Text length tối đa 50 kí tự (hoặc Any value); Số tiền — Whole number greater than 0, Input Message “Dữ liệu kiểu số — Giá trị lớn hơn 0”, Error Alert Stop “Dữ liệu nhập sai”." },
        { question: "Vì sao dùng xác thực dữ liệu giúp nhóm quản lí kinh phí dự án chính xác hơn khi nhiều bạn cùng nhập dữ liệu?",
          answer: "Mọi bạn phải nhập theo cùng quy tắc: tên khoản mục thống nhất (chọn từ danh sách), số tiền luôn là số dương, ngày hợp lệ → hạn chế nhập nhầm, sai chính tả, sai kiểu; tổng hợp, thống kê thu chi luôn đúng." },
      ],
    },

    /* ===================== TỔNG KẾT ===================== */
    {
      id: "tong-ket", name: "Tổng kết", type: "summary",
      task: "Cả lớp nhắc lại kiến thức trọng tâm và làm thử thách cuối. Dặn dò: hoàn thiện KinhPhiTrienLam.xlsx; xem trước Bài 10a “Sử dụng hàm COUNTIF”.",
      content: {
        learned: [
          "Tài chính gia đình gồm Khoản thu và Khoản chi; bảng tính: Ngày, Khoản thu/chi, Nội dung, Số tiền.",
          "Data Validation hạn chế kiểu hoặc giá trị dữ liệu nhập vào ô → dữ liệu chính xác.",
          "Data → Data Tools → Data Validation; ô Allow: Any value, Whole number, Decimal, List, Date, Time, Text length, Custom.",
          "Danh sách thả xuống: List + Source (=$F$2:$F$10). Số tiền: Whole number, greater than, Minimum 0.",
          "Input Message: lời nhắc khi chọn ô; Error Alert: thông báo lỗi khi nhập sai.",
        ],
        challenge: [
          { question: "Cột Điểm của một bảng điểm chỉ nhận điểm từ 0 đến 10, có thể có phần thập phân (ví dụ 8.5). Thiết lập phù hợp là:", type: "multiple-choice",
            options: ["Whole number · between · 0 và 10", "Decimal · between · 0 và 10", "List · Source: 0:10", "Text length · less than · 10"],
            answer: 1, explanation: "Điểm có phần thập phân → Decimal; giới hạn từ 0 đến 10 → between, Minimum 0, Maximum 10.", level: "van-dung-cao", activity: "tong-ket" },
          { question: "Muốn khi nhập sai, bảng tính KHÔNG cho giữ lại dữ liệu sai, ở thẻ Error Alert em chọn Style:", type: "multiple-choice",
            options: ["Information", "Warning", "Stop", "Custom"],
            answer: 2, explanation: "Style Stop chặn dữ liệu sai (chỉ có Retry hoặc Cancel). Warning và Information vẫn cho phép giữ dữ liệu nếu người nhập đồng ý.", level: "van-dung", activity: "tong-ket" },
        ],
      },
    },
  ],
};

if (typeof module !== "undefined" && module.exports) module.exports = LESSON;
if (typeof window !== "undefined") window.LESSON = LESSON;
