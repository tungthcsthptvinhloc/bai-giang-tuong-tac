/* ============================================================================
 * BÀI 6 — LÀM QUEN VỚI PHẦN MỀM BẢNG TÍNH  (Tin học 7 — Kết nối tri thức với cuộc sống)
 * Chủ đề 4: Ứng dụng tin học. Bám sát SGK trang 28–33 + Kế hoạch bài dạy (2 tiết).
 * Chỉ sửa file này để đổi nội dung. Engine app.js không cần sửa.
 * Dạng mới (engine v5): câu hỏi "sheet" = BẢNG TÍNH MÔ PHỎNG (bấm ô, kéo chọn vùng,
 * bấm tên hàng/cột, gõ địa chỉ) và "sandbox" = bảng tính thử nhập dữ liệu tự do.
 * ==========================================================================*/

// ---- Các lưới bảng tính dùng lại nhiều lần (chép theo hình trong SGK) ----
const SHEET_61 = { // Hình 6.1 — dùng cho bảng tính thử ở HĐ 2.1
  title: "Bảng điểm lớp 7A.xlsx", cols: 8, rows: 11, sheets: ["Sheet1", "Sheet2"],
  widths: { A: 0.7, B: 2.3, C: 1.3, D: 1.1, E: 1.2, F: 1, G: 0.8, H: 0.8 },
  cells: {
    C2: "BẢNG ĐIỂM LỚP 7A", C3: "NĂM HỌC: 2020-2021",
    B5: "Họ tên học sinh", D5: "Ngữ văn", E5: "Ngoại ngữ", F5: "Toán",
    B6: "Bùi Lê Đình Anh", D6: "7", E6: "9", F6: "9",
    B7: "Nguyễn Thị Bình", D7: "8", E7: "7", F7: "9",
    B8: "Nguyễn Đức Hà", D8: "6", E8: "7", F8: "8",
    B9: "Trần Thế Hải", D9: "9", E9: "8", F9: "7",
    B10: "Nguyễn Thị Hiền", D10: "8", E10: "6", F10: "8",
  },
  bold: ["C2", "C3", "B5:F5"],
};
const SHEET_62 = { // Hình 6.2 — ô và địa chỉ ô
  title: "Bảng điểm lớp 7A.xlsx", cols: 7, rows: 11, sheets: ["Sheet1", "Sheet2"],
  widths: { A: 0.7, B: 2.3, C: 1.3, D: 1.1, E: 1.2, F: 1, G: 0.8 },
  cells: {
    C2: "BẢNG ĐIỂM LỚP 7A", C3: "NĂM HỌC: 2020-2021",
    B5: "Tên học sinh", D5: "Ngữ văn", E5: "Ngoại ngữ", F5: "Toán",
    B6: "Bùi Lê Đình Anh", D6: "7", E6: "9", F6: "8",
    B7: "Nguyễn Thị Bình", D7: "6", E7: "7", F7: "6",
    B8: "Nguyễn Đức Hà", D8: "5", E8: "7", F8: "7",
    B9: "Trần Thế Hải", D9: "7", E9: "5", F9: "8",
    B10: "Nguyễn Thị Hiền", D10: "6", E10: "8", F10: "9",
  },
  bold: ["C2", "C3"],
};
const SHEET_63 = { // Hình 6.3 — vùng dữ liệu
  title: "Tin học trẻ.xlsx", cols: 7, rows: 14,
  widths: { A: 0.8, B: 2.2, C: 1.2, D: 1.2, E: 1.2, F: 1, G: 1 },
  cells: {
    B2: "Kết quả thi Tin học trẻ, bảng A, vòng sơ khảo",
    B4: "Số báo danh", C4: "Bài 1", D4: "Bài 2", E4: "Bài 3",
    B5: "A1", C5: "26", D5: "10", E5: "5",
    B6: "A2", C6: "25", D6: "12",
    B7: "A3", C7: "20", D7: "15", E7: "20",
    B8: "A4", C8: "25", D8: "5", E8: "5",
    B9: "A5", C9: "20", D9: "20",
    B10: "A6", C10: "15", D10: "25", E10: "2",
    B11: "A7", C11: "20",
    B12: "A8", C12: "5",
    B13: "A9", C13: "20", D13: "15", E13: "10",
    B14: "A10", C14: "25", D14: "15", E14: "20",
  },
  bold: ["B2", "B4:E4"], size: { B2: 13 },
};
const SHEET_67 = { // Hình 6.7 — bảng khảo sát dự án Trường học xanh
  title: "THXanh.xlsx", cols: 5, rows: 8, sheets: ["1. Khảo sát"],
  widths: { A: 0.9, B: 1.9, C: 2.6, D: 1, E: 1 },
  cells: {
    A1: "DỰ ÁN TRƯỜNG HỌC XANH", A2: "Bảng 1. Khảo sát địa điểm trồng cây",
    A3: "STT", B3: "Địa điểm", C3: "Loại cây",
    A4: "1", B4: "Trước lớp học", C4: "Cây hoa",
    A5: "2", B5: "Sân trường", C5: "Cây hoa, cây bóng mát",
    A6: "3", B6: "Cổng trường", C6: "Cây ăn quả",
    A7: "4", B7: "Đường liên thôn", C7: "Cây hoa, cây bóng mát",
    A8: "5", B8: "Trước nhà dân", C8: "Cây ăn quả",
  },
};

const LESSON = {
  meta: {
    subject: "Tin học", grade: "7", book: "Kết nối tri thức với cuộc sống",
    title: "Bài 6: Làm quen với phần mềm bảng tính", unit: "Chủ đề 4 — Ứng dụng tin học",
    pages: "28–33", durationMinutes: 90,
  },
  objectives: {
    knowledge: [
      "Biết khái niệm phần mềm bảng tính; nêu được một số chức năng cơ bản của phần mềm bảng tính.",
      "Nhận biết giao diện: thẻ và nhóm lệnh, hộp địa chỉ, vùng nhập dữ liệu, trang tính, hàng, cột, ô, ô hiện thời.",
      "Xác định được địa chỉ ô, địa chỉ vùng; thực hiện chọn ô, hàng, cột, vùng.",
      "Nhập, chỉnh sửa và định dạng dữ liệu đơn giản: phông chữ, màu nền, căn chỉnh dữ liệu trong ô, thay đổi độ rộng cột.",
    ],
    competencies: [
      "Tự chủ, tự học; giao tiếp và hợp tác (thảo luận nhóm, phân công nhiệm vụ).",
      "Năng lực số 3.1.TC1a: nhận biết biểu tượng, khởi động phần mềm bảng tính, tạo bảng tính mới, lưu tệp theo tên yêu cầu.",
      "Năng lực số 3.1.TC1b: nhập dữ liệu văn bản, số, ngày tháng; hai cách nhập; chỉnh sửa; nhận biết sự tự căn chỉnh dữ liệu.",
      "Năng lực AI 7.C4.1: dùng AI hỗ trợ tìm hiểu, luôn đối chiếu với SGK; sử dụng AI an toàn, có trách nhiệm.",
    ],
    qualities: ["Chăm chỉ; trách nhiệm — tuân thủ nội quy phòng máy, an toàn điện khi dùng thiết bị."],
  },
  coreKnowledge: [
    "Phần mềm bảng tính giúp lưu và trình bày thông tin dạng bảng, tính toán, vẽ biểu đồ; dữ liệu gốc thay đổi thì kết quả tính tự cập nhật.",
    "Giao diện gồm: thẻ và nhóm lệnh, hộp địa chỉ, vùng nhập dữ liệu, trang tính (lưới hàng 1, 2, 3… và cột A, B, C…); ô hiện thời luôn có khung viền đậm.",
    "Địa chỉ ô = tên cột + tên hàng (VD: B6). Địa chỉ vùng = ô góc trên bên trái : ô góc dưới bên phải (VD: B4:E11). Vùng luôn là hình chữ nhật.",
    "Nhập dữ liệu: nháy chuột vào ô rồi gõ (hoặc gõ ở vùng nhập dữ liệu), nhấn Enter để kết thúc. Văn bản tự căn trái; số, ngày tháng tự căn phải.",
    "Định dạng: chọn vùng → dùng lệnh trong nhóm Font (phông, cỡ, kiểu chữ, màu chữ, màu nền) và Alignment (căn lề) của thẻ Home.",
  ],
  keywords: ["Phần mềm bảng tính", "Ô & địa chỉ ô", "Vùng dữ liệu", "Nhập – sửa – định dạng"],
  settings: { basePoints: 100, useTimer: false, defaultTime: 60, sound: true, streakEnabled: true },

  activities: [
    /* ===================== HĐ1: MỞ ĐẦU (5 phút) ===================== */
    {
      id: "khoi-dong", name: "Mở đầu — Dự án Trường học xanh 🌳", type: "knowledge",
      goal: "Giới thiệu dự án Trường học xanh; thấy nhu cầu thu thập, tính toán nhiều dữ liệu → cần phần mềm bảng tính.",
      time: 300,
      task: "Nhóm trình bày nhanh kết quả đã chuẩn bị ở nhà (4 câu hỏi dự án), rồi chọn phần mềm phù hợp nhất để thu thập và tính toán dữ liệu cho dự án.",
      sgkImage: "assets/sgk/sgk-trang28.jpg",
      content: {
        heading: "🌳 Dự án “Trường học xanh”",
        prompt: "Khối 7 trồng cây phủ xanh nhà trường. Nhóm em cần khảo sát và trả lời:",
        blocks: [
          { kind: "html", value:
            '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:12px;font-size:1.15rem">'
            + '<div style="background:#ecfdf5;border:2px solid #34d399;border-radius:14px;padding:12px 14px">📍 <b>Những vị trí nào</b> trong trường có thể trồng thêm cây?</div>'
            + '<div style="background:#fefce8;border:2px solid #facc15;border-radius:14px;padding:12px 14px">🌸 <b>Loại cây nào</b> phù hợp cho mỗi vị trí?</div>'
            + '<div style="background:#eff6ff;border:2px solid #60a5fa;border-radius:14px;padding:12px 14px">🧰 <b>Những công việc gì</b> cần được thực hiện?</div>'
            + '<div style="background:#fdf2f8;border:2px solid #f472b6;border-radius:14px;padding:12px 14px">💻 Cần thu thập, tính toán <b>rất nhiều dữ liệu</b> — nên dùng <b>phần mềm nào</b>?</div></div>' },
          { kind: "html", value:
            '<table style="width:100%;border-collapse:collapse;font-size:1.05rem;margin-top:12px"><thead><tr style="background:#217346;color:#fff"><th style="padding:6px;border:1px solid #cbd5e1">Ai thực hiện</th><th style="padding:6px;border:1px solid #cbd5e1">Vị trí trồng cây</th><th style="padding:6px;border:1px solid #cbd5e1">Loại cây phù hợp</th><th style="padding:6px;border:1px solid #cbd5e1">Công việc cần làm</th></tr></thead>'
            + '<tbody><tr><td style="padding:6px;border:1px solid #cbd5e1">Khối lớp 7</td><td style="padding:6px;border:1px solid #cbd5e1">Trước mỗi lớp học; sân trường, cổng trường; công trình măng non; vườn hoa</td><td style="padding:6px;border:1px solid #cbd5e1">Cây hoa, cây bóng mát, cây ăn quả</td><td style="padding:6px;border:1px solid #cbd5e1">Kinh phí (vận động GV, cha mẹ HS); địa điểm mua cây (nhờ bố mẹ, GV gợi ý, tìm trên Internet)…</td></tr></tbody></table>'
            + '<p style="font-size:1.15rem;margin:10px 0 0">➡️ Thu thập và tính toán rất nhiều dữ liệu → nên dùng <b>phần mềm bảng tính</b>.</p>' },
        ],
        revealLabel: "🔍 Gợi ý sản phẩm dự kiến",
      },
      questions: [
        { question: "Để thu thập và tính toán rất nhiều dữ liệu cho dự án Trường học xanh, nên dùng phần mềm nào?", type: "multiple-choice",
          options: ["Phần mềm soạn thảo văn bản", "Phần mềm trình chiếu", "Phần mềm bảng tính", "Phần mềm vẽ tranh"],
          answer: 2, explanation: "Phần mềm bảng tính trình bày dữ liệu dạng bảng và tính toán nhanh, tự cập nhật khi dữ liệu thay đổi — phù hợp để thu thập, tính toán nhiều dữ liệu.",
          level: "thong-hieu", activity: "khoi-dong" },
      ],
    },

    /* ===================== HĐ2.1: GIAO DIỆN PHẦN MỀM BẢNG TÍNH (15 phút) ===================== */
    {
      id: "giao-dien", name: "2.1 Giao diện phần mềm bảng tính", type: "knowledge",
      goal: "Nêu khái niệm phần mềm bảng tính; nhận diện các vùng chính của giao diện và chức năng.",
      time: 300,
      task: "Nhóm quan sát giao diện Excel / Google Sheets / LibreOffice Calc và BẢNG TÍNH THỬ bên dưới: bấm vào vài ô, xem Hộp địa chỉ và Vùng nhập dữ liệu thay đổi thế nào. Hoàn thành phiếu học tập số 1 (5 phút).",
      sgkImage: "assets/sgk/sgk-trang29.jpg",
      sandbox: Object.assign({}, SHEET_61, { intro: "🧪 Bảng tính thử (giống Hình 6.1): bấm vào một ô → nhìn Hộp địa chỉ và Vùng nhập dữ liệu. Có thể gõ thử dữ liệu, Enter để kết thúc." }),
      content: {
        heading: "🖥️ Giao diện phần mềm bảng tính",
        prompt: "Các phần mềm bảng tính (Excel, Google Sheets, LibreOffice Calc…) có giao diện giống nhau ở những điểm nào?",
        revealLabel: "🔍 Hiện kiến thức: khái niệm & giao diện",
        blocks: [
          { kind: "html", value: '<div style="background:#fff7ed;border-left:6px solid #f59e0b;border-radius:10px;padding:12px 16px;font-size:1.25rem"><b>Phần mềm bảng tính</b> giúp lưu lại và trình bày thông tin dưới dạng bảng, thực hiện các tính toán (từ đơn giản đến phức tạp) cũng như xây dựng các biểu đồ biểu diễn trực quan các số liệu trong bảng. Khi dữ liệu gốc thay đổi, kết quả tính toán <b>tự động cập nhật</b>.</div>' },
          { kind: "image", value: "assets/sgk/hinh-6-1.jpg", caption: "Hình 6.1. Giao diện phần mềm bảng tính" },
          { kind: "list", value: [
            "Thẻ và nhóm lệnh: chứa các lệnh và biểu tượng lệnh.",
            "Hộp địa chỉ: hiển thị địa chỉ của ô hiện thời.",
            "Vùng nhập dữ liệu: nơi nhập trực tiếp dữ liệu vào bảng tính.",
            "Trang tính (Sheet1, Sheet2…): lưới gồm các hàng (1, 2, 3…) và cột (A, B, C…); tên trang tính nằm phía dưới cửa sổ.",
            "Giao của một hàng và một cột là một ô tính. Ô hiện thời là ô đang được chọn, luôn có khung viền đậm.",
          ] },
        ],
      },
      questions: [
        { question: "Phần mềm bảng tính có những chức năng chính nào? (chọn TẤT CẢ ý đúng)", type: "multiple-select",
          options: ["Lưu và trình bày thông tin dưới dạng bảng", "Thực hiện tính toán: tính tổng, trung bình cộng, giá trị lớn nhất, nhỏ nhất…", "Chỉnh sửa ảnh và cắt ghép video", "Vẽ biểu đồ minh hoạ các số liệu"],
          answer: [0, 1, 3], explanation: "Phần mềm bảng tính: trình bày dữ liệu dạng bảng, tính toán, vẽ biểu đồ. Chỉnh sửa ảnh/video là việc của phần mềm khác.",
          level: "nhan-biet", activity: "giao-dien" },
      ],
      remember: ["Phần mềm bảng tính: lưu & trình bày dữ liệu dạng bảng, tính toán, vẽ biểu đồ.", "Hộp địa chỉ cho biết địa chỉ ô hiện thời; vùng nhập dữ liệu để nhập/sửa dữ liệu của ô."],
    },
    {
      id: "ghep-giao-dien", name: "Trò chơi: Ghép tên — chức năng 🧩", type: "matching",
      goal: "Củng cố tên và chức năng các thành phần của giao diện (phiếu học tập số 1, câu 2).",
      time: 240,
      task: "Ghép mỗi thành phần của giao diện bảng tính (bên trái) với chức năng đúng của nó (bên phải). Làm hết rồi bấm Nộp bài.",
      sgkImage: "assets/sgk/hinh-6-1.jpg",
      pairs: [
        { left: "Thẻ và nhóm lệnh", right: "Chứa các lệnh và biểu tượng lệnh" },
        { left: "Hộp địa chỉ", right: "Hiển thị địa chỉ của ô hiện thời" },
        { left: "Vùng nhập dữ liệu", right: "Nơi nhập, sửa trực tiếp dữ liệu của ô" },
        { left: "Hàng ghi tên cột", right: "Chứa tên các cột: A, B, C…" },
        { left: "Cột ghi tên hàng", right: "Chứa tên các hàng: 1, 2, 3…" },
        { left: "Ô hiện thời", right: "Ô đang được chọn, có khung viền đậm" },
        { left: "Sheet1, Sheet2", right: "Tên các trang tính của bảng tính" },
      ],
      explanation: "Nhớ Hình 6.1: hộp địa chỉ nằm bên trái vùng nhập dữ liệu; tên cột ở hàng trên cùng, tên hàng ở cột bên trái; tên trang tính ở dưới cùng.",
    },
    {
      id: "hoi-nhanh", name: "Câu hỏi nhanh — Giơ thẻ A, B, C, D 🅰️", type: "quiz",
      goal: "Kiểm tra nhanh nhận biết ô, tên hàng, tên cột (câu hỏi SGK tr.29).",
      time: 120,
      task: "Mỗi nhóm chọn đáp án đúng cho từng câu (tương đương giơ thẻ A, B, C, D).",
      sgkImage: "assets/sgk/sgk-trang29.jpg",
      questions: [
        { question: "Vị trí giao của một hàng và một cột được gọi là gì?", type: "multiple-choice",
          options: ["Ô", "Trang tính", "Hộp địa chỉ", "Bảng tính"],
          answer: 0, explanation: "Giao của một hàng và một cột trên trang tính tạo thành một ô tính (gọi tắt là ô).",
          level: "nhan-biet", activity: "hoi-nhanh" },
        { question: "Phát biểu nào dưới đây đúng?", type: "multiple-choice",
          options: ["Các hàng của trang tính được đặt tên theo các chữ cái: A, B, C…", "Các hàng của trang tính được đặt tên theo các số: 1, 2, 3…", "Các cột của trang tính được đặt tên theo các số: 1, 2, 3…", "Các hàng và cột trong trang tính không có tên"],
          answer: 1, explanation: "Hàng được đặt tên bằng số 1, 2, 3… (từ trên xuống); cột được đặt tên bằng chữ cái A, B, C… (từ trái sang phải).",
          level: "nhan-biet", activity: "hoi-nhanh" },
      ],
    },

    /* ===================== HĐ2.2: Ô VÀ VÙNG TRÊN TRANG TÍNH (13 phút) ===================== */
    {
      id: "dia-chi-o", name: "2.2 Ô và địa chỉ ô", type: "knowledge",
      goal: "Xác định địa chỉ ô theo quy tắc tên cột + tên hàng.",
      time: 240,
      task: "Trong Hình 6.2, ô ghi tên học sinh “Bùi Lê Đình Anh” được xác định như thế nào? Thực hiện trên BẢNG TÍNH MÔ PHỎNG: bấm đúng ô theo yêu cầu.",
      sgkImage: "assets/sgk/hinh-6-2.jpg",
      sheet: SHEET_62,
      content: {
        heading: "📍 Ô và địa chỉ ô",
        revealLabel: "🔍 Hiện quy tắc địa chỉ ô",
        blocks: [
          { kind: "html", value: '<div style="display:flex;gap:18px;align-items:center;flex-wrap:wrap;font-size:1.3rem"><div style="font-size:3.4rem;font-weight:900;border:4px solid #e11d48;border-radius:14px;padding:4px 22px;color:#111">B6</div><div>⬅️ <b>B</b> = tên <b>cột</b><br>⬅️ <b>6</b> = tên <b>hàng</b></div></div>'
            + '<div style="margin-top:12px;background:#fff7ed;border-left:6px solid #f59e0b;border-radius:10px;padding:10px 16px;font-size:1.3rem"><b>&lt;địa chỉ ô&gt; = &lt;tên cột&gt;&lt;tên hàng&gt;</b> &nbsp;— ví dụ A1, B3, C10…</div>' },
        ],
      },
      questions: [
        { question: "Bấm vào ô ghi tên học sinh “Bùi Lê Đình Anh”.", type: "sheet", answer: "B6",
          explanation: "Ô nằm ở cột B và hàng 6 nên có địa chỉ B6 — tên cột viết trước, tên hàng viết sau.",
          level: "nhan-biet", activity: "dia-chi-o" },
        { question: "Bấm vào ô chứa điểm Toán của bạn Trần Thế Hải.", type: "sheet", answer: "F9",
          explanation: "Điểm Toán nằm ở cột F; bạn Trần Thế Hải ở hàng 9 → ô F9 (điểm 8).",
          level: "thong-hieu", activity: "dia-chi-o" },
        { question: "Địa chỉ của một ô được viết theo quy tắc nào?", type: "multiple-choice",
          options: ["Tên hàng rồi đến tên cột, VD: 6B", "Tên cột, dấu hai chấm, tên hàng, VD: B:6", "Tên cột rồi đến tên hàng, VD: B6", "Số thứ tự của ô tính từ đầu trang tính"],
          answer: 2, explanation: "Địa chỉ ô = tên cột ghép với tên hàng, ví dụ B6.",
          level: "nhan-biet", activity: "dia-chi-o" },
      ],
      remember: ["<địa chỉ ô> = <tên cột><tên hàng>, ví dụ B6: cột B, hàng 6."],
    },
    {
      id: "vung-du-lieu", name: "2.2 Vùng dữ liệu & thao tác chọn 🖱️", type: "knowledge",
      goal: "Xác định địa chỉ vùng; thực hiện chọn ô, hàng, cột, vùng trên trang tính.",
      time: 360,
      task: "Theo cặp: đọc SGK, quan sát Hình 6.3 rồi thực hiện trên BẢNG TÍNH MÔ PHỎNG: gõ địa chỉ vùng đang tô màu, chọn hàng, cột, vùng theo yêu cầu.",
      sgkImage: "assets/sgk/hinh-6-3.jpg",
      sheet: SHEET_63,
      content: {
        heading: "🟩 Vùng dữ liệu",
        revealLabel: "🔍 Hiện kiến thức: vùng & cách chọn",
        blocks: [
          { kind: "html", value: '<div style="background:#fff7ed;border-left:6px solid #f59e0b;border-radius:10px;padding:10px 16px;font-size:1.25rem">Nhiều ô liền kề tạo thành <b>hình chữ nhật</b> gọi là <b>vùng dữ liệu</b> (vùng).<br><b>&lt;địa chỉ vùng&gt; = &lt;ô góc trên bên trái&gt; : &lt;ô góc dưới bên phải&gt;</b> — VD: <b>B4:E11</b></div>' },
          { kind: "list", value: [
            "Chọn một ô: nháy chuột vào ô cần chọn.",
            "Chọn một hàng: nháy chuột vào tên hàng.",
            "Chọn một cột: nháy chuột vào tên cột.",
            "Chọn một vùng: kéo thả chuột từ một ô góc đến ô góc đối diện. Ô chọn đầu tiên là ô hiện thời.",
          ] },
        ],
      },
      questions: [
        { question: "Vùng đang được tô màu (giống Hình 6.3) có địa chỉ là gì? Gõ địa chỉ vào ô trả lời.", type: "sheet", mode: "type", highlight: "B4:E11", answer: "B4:E11",
          explanation: "Ô góc trên bên trái là B4, ô góc dưới bên phải là E11 → địa chỉ vùng B4:E11.",
          level: "thong-hieu", activity: "vung-du-lieu" },
        { question: "Kéo thả chuột để chọn vùng D7:F9.", type: "sheet", answer: "D7:F9",
          explanation: "Kéo từ ô D7 (góc trên trái) đến ô F9 (góc dưới phải). Vùng D7:F9 gồm 3 cột × 3 hàng = 9 ô.",
          level: "nhan-biet", activity: "vung-du-lieu" },
        { question: "Chọn cả hàng 6.", type: "sheet", answer: "6",
          explanation: "Nháy chuột vào tên hàng 6 (ở cột ghi tên hàng bên trái) để chọn cả hàng.",
          level: "nhan-biet", activity: "vung-du-lieu" },
        { question: "Chọn cả cột D (cột điểm Bài 2).", type: "sheet", answer: "D",
          explanation: "Nháy chuột vào tên cột D (ở hàng ghi tên cột phía trên) để chọn cả cột.",
          level: "nhan-biet", activity: "vung-du-lieu" },
        { question: "Chọn vùng chứa điểm cả 3 bài của các thí sinh từ A5 đến A8.", type: "sheet", answer: "C9:E12",
          explanation: "Thí sinh A5 đến A8 nằm ở hàng 9 đến 12; điểm 3 bài ở cột C đến E → vùng C9:E12.",
          level: "van-dung", activity: "vung-du-lieu" },
      ],
      remember: ["<địa chỉ vùng> = <ô góc trên bên trái>:<ô góc dưới bên phải>, VD B4:E11.", "Vùng luôn là hình chữ nhật; chọn vùng bằng cách kéo thả chuột."],
    },
    {
      id: "thu-thach-vung", name: "Thử thách: Ô và vùng 🧠", type: "quiz",
      goal: "Hiểu sâu khái niệm vùng (câu hỏi SGK tr.31).",
      time: 180,
      task: "Theo cặp (2 phút): trả lời 3 câu hỏi về ô và vùng, sau đó chọn vùng A5:B10 trên bảng tính để kiểm tra số ô.",
      sgkImage: "assets/sgk/sgk-trang31.jpg",
      questions: [
        { question: "Một ô có thể coi là một vùng được không?", type: "true-false", answer: true,
          explanation: "Được. Vùng là các ô liền kề tạo thành hình chữ nhật — một ô cũng là hình chữ nhật (1 hàng × 1 cột).",
          level: "thong-hieu", activity: "thu-thach-vung" },
        { question: "Vùng A5:B10 có bao nhiêu ô?", type: "multiple-choice",
          options: ["6 ô", "16 ô", "10 ô", "12 ô"],
          answer: 3, explanation: "A5:B10 gồm 2 cột (A, B) × 6 hàng (5 → 10) = 12 ô.",
          level: "van-dung", activity: "thu-thach-vung" },
        { question: "Có thể chọn một vùng có hình tam giác trên trang tính.", type: "true-false", answer: false,
          explanation: "Không thể. Vùng dữ liệu luôn là hình chữ nhật.",
          level: "thong-hieu", activity: "thu-thach-vung" },
        { question: "Kiểm chứng: kéo chọn vùng A5:B10 trên bảng tính.", type: "sheet", answer: "A5:B10", sheet: { cols: 6, rows: 12 },
          explanation: "Vùng A5:B10: từ ô A5 kéo đến ô B10 — đếm được 2 cột × 6 hàng = 12 ô.",
          level: "nhan-biet", activity: "thu-thach-vung" },
      ],
    },

    /* ===================== HĐ2.3: NHẬP, CHỈNH SỬA, ĐỊNH DẠNG (12 phút) ===================== */
    {
      id: "nhap-du-lieu", name: "2.3 Nhập và chỉnh sửa dữ liệu ⌨️", type: "knowledge",
      goal: "Biết 2 cách nhập dữ liệu, 2 cách chỉnh sửa; nhận biết sự tự căn chỉnh dữ liệu.",
      time: 300,
      task: "Nhóm nhập vào BẢNG TÍNH THỬ các dữ liệu như Hình 6.5 (tên, ngày sinh 9/23/2010, tổ 3, điểm 8.5…) rồi quan sát: dữ liệu nào tự căn trái, dữ liệu nào tự căn phải? Trả lời phiếu học tập số 2 (câu 1, 2).",
      sgkImage: "assets/sgk/sgk-trang31.jpg",
      sandbox: {
        title: "Nhập thử dữ liệu (Hình 6.5)", cols: 4, rows: 9, widths: { A: 0.6, B: 1.8, C: 2.2, D: 1 },
        cells: { B3: "Họ và tên", B4: "Ngày sinh", B5: "Tổ", B6: "Điểm Toán", B7: "Điểm Ngữ văn", B8: "Địa chỉ" },
        intro: "🧪 Chọn ô ở cột C rồi gõ (hoặc gõ ở vùng nhập dữ liệu), nhấn Enter để kết thúc. Thử: Nguyễn Việt Hương · 9/23/2010 · 3 · 8.5 · 7 · Hoàn Kiếm. Muốn sửa: nháy đúp vào ô.",
      },
      content: {
        heading: "⌨️ Nhập và chỉnh sửa dữ liệu",
        revealLabel: "🔍 Hiện kiến thức: nhập & sửa dữ liệu",
        blocks: [
          { kind: "image", value: "assets/sgk/hinh-6-4.jpg", caption: "Hình 6.4. Cách nhập dữ liệu" },
          { kind: "list", value: [
            "Cách 1: Nháy chuột vào ô muốn nhập → gõ dữ liệu → nhấn Enter.",
            "Cách 2: Nháy chuột vào ô → nháy chuột vào vùng nhập dữ liệu → gõ dữ liệu → nhấn Enter.",
            "Dữ liệu văn bản tự động căn trái; dữ liệu số, ngày tháng… tự động căn phải.",
            "Sửa dữ liệu: nháy đúp chuột vào ô cần sửa, HOẶC nháy chuột vào ô rồi sửa ở vùng nhập dữ liệu; nhấn Enter để kết thúc.",
            "Nếu chọn một vùng rồi nhập dữ liệu, dữ liệu được nhập vào ô hiện thời (ô được chọn đầu tiên).",
          ] },
          { kind: "image", value: "assets/sgk/hinh-6-5.jpg", caption: "Hình 6.5. Hiển thị dữ liệu" },
        ],
      },
      questions: [
        { question: "Sau khi gõ xong dữ liệu vào ô, em nhấn phím nào để kết thúc việc nhập?", type: "multiple-choice",
          options: ["Esc", "Delete", "Shift", "Enter"],
          answer: 3, explanation: "Nhập xong nhấn phím Enter để kết thúc (Esc sẽ huỷ nội dung đang gõ).",
          level: "nhan-biet", activity: "nhap-du-lieu" },
        { question: "Em kéo chuột chọn vùng từ ô B2 đến ô D5 rồi gõ chữ “Lớp 7A”. Dữ liệu được nhập vào ô nào?", type: "multiple-choice",
          options: ["Tất cả các ô trong vùng B2:D5", "Ô B2 — ô hiện thời", "Ô D5 — ô cuối vùng", "Không nhập được vì đang chọn vùng"],
          answer: 1, explanation: "Dữ liệu được nhập vào ô hiện thời — ô được chọn đầu tiên khi kéo chuột (ở đây là B2).",
          level: "van-dung", activity: "nhap-du-lieu" },
        { question: "Cách nào KHÔNG dùng để chỉnh sửa dữ liệu trong một ô?", type: "multiple-choice",
          options: ["Nháy chuột vào hộp địa chỉ rồi sửa nội dung", "Nháy đúp chuột vào ô rồi sửa", "Nháy chuột vào ô, sửa ở vùng nhập dữ liệu", "Nháy chuột vào ô rồi gõ nội dung mới để thay thế"],
          answer: 0, explanation: "Hộp địa chỉ chỉ hiển thị địa chỉ ô hiện thời, không dùng để sửa nội dung ô. Hai cách sửa trong SGK: nháy đúp vào ô, hoặc sửa ở vùng nhập dữ liệu.",
          level: "thong-hieu", activity: "nhap-du-lieu" },
      ],
      remember: ["2 cách nhập: gõ trực tiếp vào ô, hoặc gõ ở vùng nhập dữ liệu — Enter để kết thúc.", "Văn bản tự căn trái; số, ngày tháng tự căn phải."],
    },
    {
      id: "phan-loai-can-le", name: "Trò chơi: Tự căn trái hay căn phải? ↔️", type: "dragdrop",
      goal: "Nhận biết phần mềm tự nhận dạng kiểu dữ liệu và căn chỉnh tương ứng.",
      time: 180,
      task: "Xếp mỗi dữ liệu vào đúng nhóm: khi nhập vào ô tính, dữ liệu sẽ TỰ căn trái hay căn phải? Xếp hết rồi bấm Nộp bài.",
      sgkImage: "assets/sgk/hinh-6-5.jpg",
      groups: ["⬅️ Tự căn TRÁI (văn bản)", "➡️ Tự căn PHẢI (số, ngày tháng)"],
      items: [
        { text: "Nguyễn Việt Hương", group: 0 },
        { text: "8.5", group: 1 },
        { text: "Hoàn Kiếm", group: 0 },
        { text: "9/23/2010", group: 1 },
        { text: "Tổ 3", group: 0 },
        { text: "2021", group: 1 },
        { text: "Lớp 7A", group: 0 },
        { text: "3", group: 1 },
      ],
      explanation: "Chữ (kể cả “Tổ 3”, “Lớp 7A” vì có chữ) là văn bản → căn trái. Số (3, 8.5, 2021) và ngày tháng kiểu tháng/ngày/năm (9/23/2010) → căn phải.",
    },
    {
      id: "dinh-dang", name: "2.3 Định dạng dữ liệu 🎨", type: "knowledge",
      goal: "Biết dùng các lệnh định dạng trong nhóm Font và Alignment của thẻ Home.",
      time: 240,
      task: "So sánh trang tính Hình 6.5 và Hình 6.8: bảng đã được định dạng những gì? Tìm hiểu các nút lệnh ở Hình 6.6 để hoàn thành phiếu học tập số 2 (câu 3, 4).",
      sgkImage: "assets/sgk/sgk-trang32.jpg",
      content: {
        heading: "🎨 Định dạng dữ liệu trong trang tính",
        image: "assets/sgk/hinh-6-6.jpg", imageCaption: "Hình 6.6. Các lệnh định dạng dữ liệu (thẻ Home)",
        revealLabel: "🔍 Hiện các bước định dạng",
        blocks: [
          { kind: "list", value: [
            "Bước 1: Chọn vùng dữ liệu cần định dạng.",
            "Bước 2: Dùng các lệnh trong nhóm Font (phông chữ, cỡ chữ, đậm – nghiêng – gạch chân, màu chữ, màu nền ô) và nhóm Alignment (căn trái – giữa – phải; căn trên – giữa – dưới) của thẻ Home.",
            "Thay đổi độ rộng cột: đưa con trỏ vào vạch giữa hai tên cột, khi con trỏ thành ↔ thì kéo thả chuột. Độ cao hàng: làm tương tự ở vạch giữa hai tên hàng.",
          ] },
          { kind: "image", value: "assets/sgk/hinh-6-8.jpg", caption: "Hình 6.8. Bảng dữ liệu sau khi định dạng" },
        ],
      },
      questions: [
        { question: "Để tô nền màu vàng cho hàng tiêu đề của bảng, em dùng lệnh nào?", type: "multiple-choice",
          options: ["Màu chữ (chữ A gạch đỏ)", "Chữ đậm (B)", "Cỡ chữ", "Màu nền ô (thùng sơn)"],
          answer: 3, explanation: "Lệnh Màu nền ô (biểu tượng thùng sơn) trong nhóm Font dùng để tô màu nền cho ô.",
          level: "thong-hieu", activity: "dinh-dang" },
        { question: "Muốn định dạng một vùng dữ liệu, việc ĐẦU TIÊN em cần làm là:", type: "multiple-choice",
          options: ["Chọn vùng dữ liệu cần định dạng", "Lưu tệp bảng tính", "Nháy đúp vào tên trang tính", "Nhấn phím Enter"],
          answer: 0, explanation: "Luôn chọn vùng dữ liệu trước (Bước 1), rồi mới dùng lệnh định dạng (Bước 2).",
          level: "nhan-biet", activity: "dinh-dang" },
      ],
    },
    {
      id: "nut-lenh", name: "Trò chơi: Nút lệnh nào? 🔘", type: "matching",
      goal: "Nhận biết chức năng các nút lệnh định dạng ở Hình 6.6.",
      time: 180,
      task: "Ghép mỗi nút lệnh (bên trái) với chức năng của nó (bên phải). Làm hết rồi bấm Nộp bài.",
      sgkImage: "assets/sgk/hinh-6-6.jpg",
      pairs: [
        { left: "𝐁", right: "Chữ đậm" },
        { left: "𝐼", right: "Chữ nghiêng" },
        { left: "U̲", right: "Gạch chân" },
        { left: "🪣 Thùng sơn", right: "Màu nền ô" },
        { left: "A (gạch đỏ)", right: "Màu chữ" },
        { left: "Arial ▾", right: "Phông chữ" },
        { left: "11 ▾", right: "Cỡ chữ" },
      ],
      explanation: "Các lệnh này nằm trong nhóm Font của thẻ Home (Hình 6.6).",
    },

    /* ===================== HĐ2.4: THỰC HÀNH (30 phút) ===================== */
    {
      id: "khoi-dong-thuc-hanh", name: "Thực hành — Khởi động nhanh ⚡", type: "quiz",
      goal: "Ôn thao tác xoá dữ liệu vùng và các cách nhập dữ liệu trước khi thực hành (Luyện tập SGK tr.33).",
      time: 180,
      task: "Theo cặp (3 phút): trả lời 2 câu hỏi; thử chọn một vùng trên BẢNG TÍNH THỬ rồi nhấn Delete (hoặc nút 🧽) để xoá nhanh.",
      sgkImage: "assets/sgk/sgk-trang33.jpg",
      sandbox: Object.assign({}, SHEET_67, { title: "Thử xoá nhanh dữ liệu", intro: "🧪 Kéo chọn một vùng (VD: B4:C8) rồi nhấn phím Delete hoặc bấm 🧽 Xóa vùng chọn." }),
      questions: [
        { question: "Muốn xoá nhanh dữ liệu trong một vùng, em làm thế nào?", type: "multiple-choice",
          options: ["Nháy đúp vào từng ô rồi xoá từng kí tự", "Chọn vùng đó rồi nhấn phím Delete", "Chọn vùng đó rồi nhấn phím Enter", "Đóng phần mềm và không lưu"],
          answer: 1, explanation: "Chọn vùng dữ liệu rồi nhấn phím Delete để xoá toàn bộ dữ liệu trong vùng.",
          level: "thong-hieu", activity: "khoi-dong-thuc-hanh" },
        { question: "Có bao nhiêu cách nhập dữ liệu vào ô tính (theo SGK)?", type: "multiple-choice",
          options: ["1 cách", "3 cách", "2 cách", "4 cách"],
          answer: 2, explanation: "2 cách: gõ trực tiếp vào ô hiện thời; hoặc nháy vào vùng nhập dữ liệu rồi gõ. Nhập xong nhấn Enter.",
          level: "nhan-biet", activity: "khoi-dong-thuc-hanh" },
      ],
    },
    {
      id: "cac-buoc-thuc-hanh", name: "Sắp xếp các bước thực hành 🪜", type: "ordering",
      goal: "Nắm quy trình tạo, nhập, định dạng và lưu bảng tính khảo sát.",
      time: 150,
      task: "Sắp xếp các bước thực hành “Nhập thông tin khảo sát dự án Trường học xanh” theo đúng thứ tự rồi bấm Nộp bài.",
      sgkImage: "assets/sgk/sgk-trang32.jpg",
      steps: [
        "Mở Excel (nháy đúp biểu tượng trên màn hình), chọn Blank workbook",
        "Nhập dữ liệu khảo sát: tiêu đề ở A1, A2; các cột STT, Địa điểm, Loại cây",
        "Chỉnh độ rộng cột, định dạng tiêu đề, căn giữa cột STT, tô nền hàng tiêu đề",
        "Nháy đúp tên trang tính Sheet1, đổi tên thành “1. Khảo sát”",
        "Lưu bảng tính với tên THXanh.xlsx (File/Save hoặc Ctrl+S)",
      ],
      explanation: "Mở phần mềm → nhập dữ liệu → chỉnh sửa, định dạng → đổi tên trang tính → lưu tệp.",
    },
    {
      id: "thuc-hanh", name: "Thực hành: Khảo sát dự án Trường học xanh 🌱", type: "knowledge",
      goal: "Tạo, nhập, định dạng và lưu bảng tính THXanh.xlsx.",
      time: 900,
      task: "Trên máy tính (Excel): nhập bảng như Hình 6.7 → chỉnh sửa, định dạng như Hình 6.8 → đổi tên trang tính thành “1. Khảo sát” → lưu tệp THXanh.xlsx (10 phút). Dùng điện thoại thì nhập thử trên BẢNG TÍNH THỬ. Sau đó trả lời 2 câu kiểm tra.",
      sgkImage: "assets/sgk/sgk-trang32.jpg",
      sheet: SHEET_67,
      sandbox: { title: "THXanh.xlsx — nhập thử", cols: 5, rows: 8, sheets: ["Sheet1"], widths: { A: 0.9, B: 1.9, C: 2.6, D: 1, E: 1 }, intro: "🧪 Nhập thử bảng Hình 6.7 (bắt đầu ở ô A1). Nháy đúp tên trang tính “Sheet1” để đổi tên thành “1. Khảo sát”." },
      content: {
        heading: "🌱 Nhập thông tin khảo sát dự án Trường học xanh",
        image: "assets/sgk/hinh-6-7.jpg", imageCaption: "Hình 6.7. Bảng dữ liệu cần nhập",
        revealLabel: "🔍 Hiện hướng dẫn các bước & mẫu định dạng",
        blocks: [
          { kind: "list", value: [
            "Bước 1: Mở Microsoft Excel, chọn Blank workbook.",
            "Bước 2: Nhập A1: DỰ ÁN TRƯỜNG HỌC XANH; A2: Bảng 1. Khảo sát địa điểm trồng cây; hàng 3: STT, Địa điểm, Loại cây; rồi 5 dòng dữ liệu.",
            "Bước 3: Chỉnh độ rộng các cột; tiêu đề A1 in đậm, màu xanh lá, cỡ chữ lớn; cột STT căn giữa; hàng tiêu đề (hàng 3) tô nền vàng, căn giữa.",
            "Bước 4: Nháy đúp tên trang tính Sheet1 → nhập “1. Khảo sát”.",
            "Bước 5: Lưu với tên THXanh.xlsx (File/Save hoặc Ctrl+S).",
          ] },
          { kind: "image", value: "assets/sgk/hinh-6-8.jpg", caption: "Hình 6.8. Bảng dữ liệu sau khi hoàn thành" },
        ],
      },
      questions: [
        { question: "Hàng tiêu đề của bảng (STT, Địa điểm, Loại cây) là hàng nào? Bấm chọn CẢ HÀNG đó để tô nền vàng.", type: "sheet", answer: "3",
          explanation: "Hàng tiêu đề là hàng 3 — nháy vào tên hàng 3 để chọn cả hàng, rồi dùng lệnh Màu nền ô.",
          level: "thong-hieu", activity: "thuc-hanh" },
        { question: "Chọn vùng dữ liệu của cột STT (từ ô tiêu đề đến số 5) để căn giữa.", type: "sheet", answer: "A3:A8",
          explanation: "Cột STT nằm ở cột A, từ ô tiêu đề A3 đến ô A8 → vùng A3:A8.",
          level: "van-dung", activity: "thuc-hanh" },
      ],
    },

    /* ===================== HĐ3: LUYỆN TẬP (4 phút) ===================== */
    {
      id: "luyen-tap", name: "Luyện tập — Cừu vui vẻ và Sói xám", type: "penguin",
      pet: "🐑", homeIcon: "🏡", enemy: "🐺", saveWord: "chú cừu thoát khỏi Sói xám",
      winText: "Cả đàn cừu về nhà an toàn — Sói xám đành ôm bụng đói!",
      intro: "Mùa hè sôi động! Mỗi câu trả lời đúng giúp một chú cừu chạy về nhà an toàn trước Sói xám.",
      goal: "Ôn luyện, khắc sâu kiến thức về phần mềm bảng tính qua trò chơi.",
      time: 240,
      task: "Mỗi nhóm suy nghĩ và trả lời lần lượt 6 câu hỏi. Trả lời đúng để cứu các chú cừu!",
      questions: [
        { question: "Phần mềm bảng tính có chức năng chính là gì? Chọn phương án đúng nhất.", type: "multiple-choice",
          options: ["Quản trị dữ liệu", "Soạn thảo văn bản và quản trị dữ liệu", "Nhập và xử lí dữ liệu dưới dạng bảng", "Nhập và tính toán giống như máy tính cầm tay Casio"],
          answer: 2, explanation: "Phần mềm bảng tính dùng để nhập và xử lí (tính toán, trình bày, vẽ biểu đồ) dữ liệu dưới dạng bảng.",
          level: "nhan-biet", activity: "luyen-tap" },
        { question: "Vùng dữ liệu trên bảng tính có hình gì?", type: "multiple-choice",
          options: ["Hình tam giác", "Hình chữ nhật", "Hình tròn", "Có thể là hình bất kì"],
          answer: 1, explanation: "Nhiều ô liền kề tạo thành hình chữ nhật mới là một vùng.",
          level: "nhan-biet", activity: "luyen-tap" },
        { question: "Thế nào là ô dữ liệu trên bảng tính?", type: "multiple-choice",
          options: ["Là giao của một hàng và một cột", "Là một vùng trên bảng tính", "Là giao của nhiều hàng và nhiều cột"],
          answer: 0, explanation: "Ô tính là giao của một hàng và một cột.",
          level: "nhan-biet", activity: "luyen-tap" },
        { question: "Một vùng dữ liệu gồm m hàng và n cột sẽ có bao nhiêu ô dữ liệu?", type: "multiple-choice",
          options: ["m + n", "2(m + n)", "m × n", "2(m × n)"],
          answer: 2, explanation: "Mỗi hàng có n ô, có m hàng → m × n ô. VD: vùng A5:B10 có 6 hàng × 2 cột = 12 ô.",
          level: "van-dung-cao", activity: "luyen-tap" },
        { question: "Khi nhập số vào ô tính thì dữ liệu được tự động:", type: "multiple-choice",
          options: ["Căn trái", "Căn giữa", "Căn đều hai bên", "Căn phải"],
          answer: 3, explanation: "Dữ liệu số (và ngày tháng) tự động căn phải.",
          level: "nhan-biet", activity: "luyen-tap" },
        { question: "Khi nhập văn bản vào ô tính thì dữ liệu được tự động:", type: "multiple-choice",
          options: ["Căn trái", "Căn phải", "Căn giữa", "Căn đều hai bên"],
          answer: 0, explanation: "Dữ liệu văn bản tự động căn trái.",
          level: "nhan-biet", activity: "luyen-tap" },
      ],
    },

    /* ===================== HĐ4: VẬN DỤNG (10 phút + ở nhà) ===================== */
    {
      id: "van-dung", name: "Vận dụng 🏡", type: "vandung",
      goal: "Hiểu cách phần mềm nhận biết dữ liệu ngày tháng; vận dụng nhập, định dạng bảng tính cho dự án.",
      time: 600,
      task: "Thử gõ 2 ngày tháng vào BẢNG TÍNH THỬ để trả lời Bài 1. Bài 2 làm ở nhà trên Excel, nộp lên Padlet/Azota theo hạn thầy/cô giao.",
      sgkImage: "assets/sgk/sgk-trang33.jpg",
      sandbox: {
        title: "Thử nghiệm ngày tháng", cols: 3, rows: 4, widths: { A: 3.2, B: 1.8, C: 1.2 },
        cells: { A1: "Kiểu nhập", B1: "Gõ vào đây", A2: "Kiểu Anh – Mỹ (tháng/ngày/năm)", A3: "Kiểu Việt Nam (ngày/tháng/năm)" },
        bold: ["A1:B1"], fill: { "A1:B1": "#fde68a" },
        intro: "🧪 Gõ 12/15/2020 vào ô B2 và 15/12/2020 vào ô B3 (Enter để kết thúc). Ô nào tự căn phải, ô nào tự căn trái?",
      },
      intro: "Thảo luận nhóm, gửi câu trả lời cho thầy/cô rồi bấm để xem hướng chốt.",
      cases: [
        { question: "Vì sao khi nhập 12/15/2020 thì phần mềm tự động căn phải, nhưng nếu nhập 15/12/2020 thì phần mềm tự động căn trái?",
          answer: "Phần mềm (định dạng Anh – Mỹ) hiểu ngày tháng theo kiểu tháng/ngày/năm. 12/15/2020 là ngày 15 tháng 12 năm 2020 → là dữ liệu ngày tháng nên căn phải. 15/12/2020 sẽ là “tháng 15” — không có tháng 15 nên phần mềm coi là văn bản → căn trái." },
        { question: "Tìm một số loại cây có thể mua và trồng cho dự án Trường học xanh. Tạo bảng tính tên “Danh sách các loại cây” gồm 3 cột: STT, Loại cây (Cây hoa, Cây ăn quả, Cây bóng mát), Tên cây. Nhập dữ liệu rồi chỉnh sửa, định dạng. (Ghi tóm tắt vài loại cây nhóm em chọn.)",
          answer: "Bảng có đủ 3 cột STT – Loại cây – Tên cây, từ 5 loại cây trở lên (VD: Cây hoa: hoa hồng, hoa mười giờ; Cây ăn quả: xoài, ổi; Cây bóng mát: bằng lăng, phượng…). Định dạng tốt: ít nhất 4 định dạng — phông chữ, kiểu chữ, màu chữ, căn lề, độ rộng hàng/cột phù hợp nội dung." },
      ],
    },

    /* ===================== TỔNG KẾT ===================== */
    {
      id: "tong-ket", name: "Tổng kết", type: "summary",
      task: "Cả lớp nhắc lại kiến thức cần nhớ và làm thử thách cuối.",
      content: {
        learned: [
          "Phần mềm bảng tính: lưu & trình bày dữ liệu dạng bảng, tính toán, vẽ biểu đồ; kết quả tự cập nhật.",
          "Giao diện: thẻ & nhóm lệnh, hộp địa chỉ, vùng nhập dữ liệu, trang tính gồm hàng – cột – ô; ô hiện thời có viền đậm.",
          "Địa chỉ ô = cột + hàng (B6); địa chỉ vùng = ô trên trái : ô dưới phải (B4:E11).",
          "Nhập: gõ vào ô hoặc vùng nhập dữ liệu, Enter kết thúc; văn bản căn trái, số và ngày tháng căn phải.",
          "Định dạng: chọn vùng → lệnh nhóm Font và Alignment của thẻ Home.",
        ],
        challenge: [
          { question: "Ô hiện thời là B2. Em kéo chọn đến ô D6. Vùng được chọn có địa chỉ và số ô là:", type: "multiple-choice",
            options: ["B2:D6 — 12 ô", "B2:D6 — 15 ô", "B6:D2 — 15 ô", "B2:D6 — 8 ô"],
            answer: 1, explanation: "Ô trên trái B2, ô dưới phải D6 → B2:D6; gồm 3 cột (B, C, D) × 5 hàng (2 → 6) = 15 ô.",
            level: "van-dung-cao", activity: "tong-ket" },
          { question: "Chọn vùng gồm 3 hàng và 2 cột, có ô góc trên bên trái là B2.", type: "sheet", answer: "B2:C4", sheet: { cols: 6, rows: 8 },
            explanation: "Từ B2: 2 cột là B, C; 3 hàng là 2, 3, 4 → vùng B2:C4 (6 ô).",
            level: "van-dung-cao", activity: "tong-ket" },
        ],
      },
    },
  ],
};

if (typeof window !== "undefined") window.LESSON = LESSON;
if (typeof module !== "undefined") module.exports = LESSON;
