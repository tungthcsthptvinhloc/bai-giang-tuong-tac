/* ============================================================================
 * BÀI 8 — CÔNG CỤ HỖ TRỢ TÍNH TOÁN  (Tin học 7 — Kết nối tri thức)
 * Chủ đề 4: Ứng dụng tin học. Dự án Trường học xanh.
 * Bám sát SGK trang 39–44 + Kế hoạch bài dạy (2 tiết) của giáo viên.
 * Chỉ sửa file này để đổi nội dung. Engine app.js không cần sửa.
 * ==========================================================================*/

const withCells = (base, extra) => Object.assign({}, base, { cells: Object.assign({}, base.cells, extra) });

// ---- Hình 8.1 — Hàm SUM / Hình 8.2 — Hàm AVERAGE ----
const H81 = { title: "Hình 8.1 — Hàm SUM", cols: 5, rows: 7, widths: { A: 1.2, E: 1.5 },
  cells: { A2: "Số cây hoa đã trồng của tổ 3", B4: "Hoa hồng", C4: "Hoa lan", D4: "Hoa cúc", A5: "Bình", B5: "2", C5: "5", D5: "3", E5: "Tổng số cây hoa",
    A6: "Hòa", B6: "1", C6: "2", D6: "4", E6: "=SUM(B5:D7)", A7: "Hương", B7: "3", C7: "1", D7: "3" },
  bold: ["A2", "A4:E4", "E5"], fill: { E6: "#fce7f3" } };
const H82 = { title: "Hình 8.2 — Hàm AVERAGE", cols: 5, rows: 7, widths: { A: 1, E: 1.8 },
  cells: { A2: "Khối lượng công việc của các lớp (m2)", A4: "Lớp", B4: "Ngày 1", C4: "Ngày 2", A5: "7A", B5: "7", C5: "5", E5: "Khối lượng trung bình",
    A6: "7B", B6: "3", C6: "5", E6: "=AVERAGE(B5:C7)", A7: "7C", B7: "4", C7: "6" },
  bold: ["A2", "A4:C4", "E5"], fill: { E6: "#fce7f3" } };

// ---- Hình 8.3 — Dự kiến phân bổ cây hoa cho các lớp (C=7A … I=7H) ----
const HOA = { 4: ["1", "Hoa Mười giờ", 10, "", 16, "", 16, 14, ""], 5: ["2", "Hoa Dạ yến thảo", "", 12, 12, 11, "", "", ""], 6: ["3", "Hoa Dừa cạn", 16, "", 12, 10, "", 10, 15],
  7: ["4", "Hoa Cúc vàng", 14, 20, "", "", 16, 12, 13], 8: ["5", "Hoa Hồng", "", 15, "", 10, 13, "", 20] };
const H83cells = { A1: "Dự kiến phân bổ cây hoa cho các lớp", A3: "STT", B3: "Tên cây", C3: "7A", D3: "7B", E3: "7C", F3: "7D", G3: "7E", H3: "7G", I3: "7H" };
Object.entries(HOA).forEach(([r, v]) => v.forEach((x, k) => { if (x !== "") H83cells["ABCDEFGHI"[k] + r] = String(x); }));
const H83 = { title: "Hình 8.3 — Dự kiến phân bổ cây hoa", cols: 9, rows: 9, widths: { A: 0.6, B: 2 }, cells: H83cells,
  bold: ["A1", "A3:I3"], fill: { "A3:I3": "#fde047" }, center: ["A4:A8"] };
// Hình 8.5: thêm câu hỏi ở cột J, kết quả ở cột K
const H85 = { title: "Hình 8.5 — Các yêu cầu cần tính toán", cols: 11, rows: 8, widths: { A: 0.55, B: 1.9, J: 5.4, K: 1.1 },
  cells: Object.assign({}, H83cells, { J4: "Trung bình mỗi lớp sẽ trồng bao nhiêu cây?", J5: "Số cây hoa Dừa cạn lớn nhất một lớp sẽ trồng là bao nhiêu?", J6: "Số cây hoa Mười giờ ít nhất một lớp sẽ trồng là bao nhiêu?", J7: "Bao nhiêu lớp sẽ trồng hoa Hồng?", J8: "Lớp 7B sẽ trồng bao nhiêu loại hoa?", K3: "Kết quả" }),
  bold: ["A1", "A3:K3"], fill: { "A3:I3": "#fde047", "K3:K8": "#fce7f3" }, center: ["A4:A8"] };

// ---- Hình 8.6 / 8.7 — Trang tính 4. Dự kiến kết quả (đã chèn sẵn các hàng trống 9, 10, 17, 18, 24) ----
const T4 = {
  4: ["1", "Cây hoa", "Hoa Mười giờ", 10, "", 16, "", 16, 14, ""], 5: ["2", "", "Hoa Dạ yến thảo", "", 12, 12, 11, "", "", ""], 6: ["3", "", "Hoa Dừa cạn", 16, "", 12, 10, "", 10, 15],
  7: ["4", "", "Hoa Cúc vàng", 14, 20, "", "", 16, 12, 13], 8: ["5", "", "Hoa Hồng", "", 15, "", 10, 13, "", 20],
  11: ["6", "Cây ăn quả", "Bưởi", 9, "", 10, "", 12, 15, 5], 12: ["7", "", "Xoài", 7, 10, "", 7, 10, "", 2], 13: ["8", "", "Vú sữa", "", 5, 12, "", "", 5, ""],
  14: ["9", "", "Khế", "", "", 13, "", "", "", 10], 15: ["10", "", "Chanh", 5, 12, "", 10, 7, 6, ""], 16: ["11", "", "Táo", "", 5, "", 12, "", "", ""],
  19: ["12", "Cây bóng mát", "Bằng lăng", 5, "", 5, 7, 10, "", 5], 20: ["13", "", "Phượng vĩ", "", 6, 7, 4, 5, 10, ""], 21: ["14", "", "Bàng", 7, 7, 4, 2, "", "", 3],
  22: ["15", "", "Sưa đỏ", "", 8, 5, "", 3, 5, ""], 23: ["16", "", "Muồng", 10, "", 8, 11, "", "", 10],
};
const T4cells = { A2: "Bảng 4. Dự kiến phân bổ cây cho các lớp", A3: "STT", B3: "Loại cây", C3: "Tên cây", D3: "7A", E3: "7B", F3: "7C", G3: "7D", H3: "7E", I3: "7G", J3: "7H", K3: "Tổng số cây", L3: "Trung bình", B25: "Tổng số cây dự kiến theo lớp:" };
Object.entries(T4).forEach(([r, v]) => v.forEach((x, k) => { if (x !== "") T4cells["ABCDEFGHIJ"[k] + r] = String(x); }));
const T4base = { title: "THXanh.xlsx — 4. Dự kiến kết quả", sheets: ["3. Tìm hiểu giống cây", "4. Dự kiến kết quả"], cols: 12, rows: 27,
  widths: { A: 0.55, B: 1.5, C: 1.95, K: 1.4, L: 1.4 }, cells: T4cells,
  bold: ["A2", "A3:L3", "D9:L9", "D17:L17", "D24:L25", "K4:K25", "B25"], fill: { "A3:L3": "#fde047" } };
// Công thức tổng (dùng để dựng sẵn cho các câu sau)
const COLS = "DEFGHIJ".split("");
const SUMS = {}; COLS.forEach((c) => { SUMS[c + 9] = `=SUM(${c}4:${c}8)`; SUMS[c + 17] = `=SUM(${c}11:${c}16)`; SUMS[c + 24] = `=SUM(${c}19:${c}23)`; });
const TOTAL = {}; COLS.forEach((c) => { TOTAL[c + 25] = `=${c}9+${c}17+${c}24`; });
const KL = {}; [4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 19, 20, 21, 22, 23, 24, 25].forEach((r) => { KL["K" + r] = `=SUM(D${r}:J${r})`; KL["L" + r] = `=AVERAGE(D${r}:J${r})`; });
const T4_FULL = withCells(T4base, Object.assign({}, SUMS, TOTAL, KL, { C26: "Lớn nhất:", C27: "Trung bình:" }));

// ---- Bảng 8.2 — Cú pháp một số hàm ----
const BANG82_HTML = `<table style="width:100%;border-collapse:collapse;font-size:1.05rem;background:#fff">
  <tr style="background:#ccfbf1"><th style="padding:8px">Tên hàm</th><th style="padding:8px">Cách viết</th><th style="padding:8px;text-align:left">Ý nghĩa</th><th style="padding:8px">Ví dụ</th></tr>
  ${[["SUM", "SUM(v1,v2,…)", "Tính <b>tổng</b> các giá trị số có trong các ô, vùng hoặc số có trong danh sách v1, v2,…", "SUM(C3:E5)<br>SUM(D4:H4,15,K10)"],
    ["AVERAGE", "AVERAGE(v1,v2,…)", "Tính <b>trung bình cộng</b> các giá trị số có trong các ô, vùng hoặc số có trong danh sách", "AVERAGE(B2:E6)<br>AVERAGE(10,12,1)"],
    ["MIN", "MIN(v1,v2,…)", "Tìm <b>giá trị nhỏ nhất</b> trong các giá trị số có trong các ô, vùng hoặc danh sách", "MIN(A1:B10)<br>MIN(C2,B3,10)"],
    ["MAX", "MAX(v1,v2,…)", "Tìm <b>giá trị lớn nhất</b> trong các giá trị số có trong các ô, vùng hoặc danh sách", "MAX(B1:E1)<br>MAX(2,A1:B5)"],
    ["COUNT", "COUNT(v1,v2,…)", "<b>Đếm</b> số các giá trị là số có trong các ô, vùng hoặc số có trong danh sách", "COUNT(B3:E10)<br>COUNT(1,2)"]]
    .map(([n, w, y, v], i) => `<tr style="background:${i % 2 ? "#f0fdfa" : "#fff"}"><td style="padding:8px;font-weight:900;color:#be185d;text-align:center">${n}</td><td style="padding:8px;font-family:Consolas,monospace;text-align:center">${w}</td><td style="padding:8px">${y}</td><td style="padding:8px;font-family:Consolas,monospace;text-align:center">${v}</td></tr>`).join("")}</table>
  <p style="margin:10px 0 0;font-size:1.05rem">⚠️ <b>Lưu ý:</b> các hàm chỉ xử lí các ô có dữ liệu số, <b>bỏ qua ô chứa văn bản hoặc ô trống</b>. Dấu chấm “.” ngăn cách phần nguyên và phần thập phân; dấu phẩy “,” ngăn cách hàng nghìn, hàng triệu.</p>`;

// ---- Cấu trúc một hàm ----
const ANATOMY_HTML = `<div style="text-align:center;padding:6px">
  <div style="display:inline-flex;flex-wrap:wrap;gap:4px;font-family:Consolas,monospace;font-size:clamp(1.6rem,4.6vw,3rem);font-weight:900">
    <span style="background:#e2e8f0;border-radius:10px;padding:2px 12px">=</span><span style="background:#fce7f3;color:#be185d;border-radius:10px;padding:2px 12px">SUM</span><span style="background:#f1f5f9;border-radius:10px;padding:2px 8px">(</span><span style="background:#ccfbf1;color:#0f766e;border-radius:10px;padding:2px 12px">B5:D7</span><span style="background:#f1f5f9;border-radius:10px;padding:2px 8px">)</span></div>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:10px;margin-top:12px;font-size:1.05rem;text-align:left">
    <div style="border:2px solid #94a3b8;border-radius:12px;padding:8px">✏️ <b>Dấu =</b> — bắt đầu công thức</div>
    <div style="border:2px solid #db2777;border-radius:12px;padding:8px">🏷️ <b>Tên hàm</b> — SUM (ý nghĩa: tính tổng)</div>
    <div style="border:2px solid #0d9488;border-radius:12px;padding:8px">📦 <b>Tham số</b> — trong cặp ngoặc tròn: số, địa chỉ ô, vùng; cách nhau bởi “,” hoặc “;”</div></div>
  <div style="margin-top:12px;display:inline-block;background:#fef9c3;border:2px dashed #ca8a04;border-radius:12px;padding:8px 16px;font-size:1.2rem;font-family:Consolas,monospace"><b>= &lt;tên hàm&gt;(&lt;các tham số&gt;)</b></div></div>`;

// ---- Vận dụng: chi tiêu gia đình (số liệu VÍ DỤ) ----
const CHI_TIEU = { title: "Chi_tieu_thang.xlsx (số liệu ví dụ)", cols: 3, rows: 16, widths: { A: 0.5, B: 2.2, C: 1.4 },
  cells: { A1: "CHI TIÊU GIA ĐÌNH TRONG MỘT THÁNG (30 ngày)", A3: "STT", B3: "Khoản chi", C3: "Số tiền (đồng)",
    A4: "1", B4: "Tiền ăn", C4: "4500000", A5: "2", B5: "Tiền điện", C5: "450000", A6: "3", B6: "Tiền nước", C6: "120000", A7: "4", B7: "Tiền học", C7: "800000",
    A8: "5", B8: "Internet", C8: "220000", A9: "6", B9: "Xăng xe", C9: "300000", A10: "7", B10: "Quần áo", C10: "500000", A11: "8", B11: "Chi khác", C11: "250000",
    B12: "Tổng chi tiêu", B13: "Khoản chi nhiều nhất", B14: "Khoản chi ít nhất", B15: "Số khoản đã chi", B16: "Trung bình mỗi ngày" },
  bold: ["A1", "A3:C3", "B12:B16"], fill: { "A3:C3": "#fde047", "C12:C16": "#fce7f3" }, center: ["A4:A11"] };

const LESSON = {
  meta: {
    subject: "Tin học", grade: "7", book: "Kết nối tri thức với cuộc sống",
    title: "Bài 8: Công cụ hỗ trợ tính toán", unit: "Chủ đề 4 — Ứng dụng tin học",
    pages: "39–44", durationMinutes: 90,
  },
  objectives: {
    knowledge: ["Thực hiện được một số phép toán thông dụng, sử dụng được một số hàm đơn giản như MAX, MIN, SUM, AVERAGE, COUNT."],
    competencies: [
      "Tự chủ, tự học; giao tiếp và hợp tác trong nhóm; giải quyết vấn đề và sáng tạo (bài toán thực tế Trường học xanh, chi tiêu gia đình).",
      "Năng lực số 3.1.TC1a: nhập đúng cú pháp hàm; dùng đúng địa chỉ ô, vùng làm tham số; nhận ra tính toán tự động; phát hiện và sửa lỗi công thức (sai tên hàm, thiếu ngoặc, sai vùng dữ liệu).",
      "Năng lực AI 7.C4.1: dùng AI hỏi cú pháp, kiểm tra lỗi công thức nhưng luôn kiểm chứng kết quả; hiểu AI có thể sai khi dữ liệu huấn luyện thiếu đa dạng.",
    ],
    qualities: ["Nhân ái, chăm chỉ, trách nhiệm (an toàn điện khi dùng thiết bị; bảo vệ thông tin của bạn bè, thầy cô)."],
  },
  coreKnowledge: [
    "Hàm là công thức (hoặc kết hợp nhiều công thức) được định nghĩa từ trước. Mỗi hàm được xác định bởi tên hàm, ý nghĩa và các tham số.",
    "Cú pháp: =<tên hàm>(<các tham số>). Tham số có thể là số, địa chỉ ô, địa chỉ vùng, cách nhau bởi dấu “,” hoặc “;”. Tên hàm viết hoa hay thường đều được.",
    "Nhập hàm giống nhập công thức; có thể dùng chuột chọn ô, vùng làm tham số. Cần nhập chính xác tên hàm và tham số.",
    "SUM: tính tổng · AVERAGE: trung bình cộng · MAX: giá trị lớn nhất · MIN: giá trị nhỏ nhất · COUNT: đếm số giá trị là số.",
    "Các hàm chỉ xử lí ô có dữ liệu số, bỏ qua ô chứa văn bản hoặc ô trống; kết quả tự cập nhật khi dữ liệu thay đổi.",
  ],
  keywords: ["Hàm", "=<tên hàm>(<các tham số>)", "SUM · AVERAGE", "MAX · MIN", "COUNT"],
  settings: { basePoints: 100, useTimer: false, defaultTime: 60, sound: true, streakEnabled: true },

  activities: [
    /* ===================== HĐ1: MỞ ĐẦU (5 phút) ===================== */
    {
      id: "mo-dau", name: "Mở đầu — Ai nhanh hơn: em hay máy tính? ⚡", type: "knowledge",
      goal: "Liên hệ các công thức quen thuộc với hàm trong bảng tính; thấy hàm giúp tính nhanh, chính xác.",
      time: 300,
      task: "Nêu một vài công thức tính toán quen thuộc trong môn Toán, Khoa học tự nhiên. Rồi thi tính nhanh tổng số cây hoa trong Hình 8.3!",
      sgkImage: "assets/sgk/sgk-trang39.jpg",
      content: {
        heading: "⚡ Ai nhanh hơn: em hay máy tính?",
        prompt: "Trong bài trước em đã biết tính toán theo công thức. Phần mềm bảng tính còn có các HÀM giúp tính toán — dự án Trường học xanh có cần dùng các hàm này không?",
        image: "assets/sgk/hinh-8-3.jpg", imageCaption: "Hình 8.3. Dự kiến phân bổ cây hoa cho các lớp",
        revealLabel: "🔍 Công thức quen thuộc & hàm là gì?",
        blocks: [
          { kind: "list", value: ["Diện tích hình chữ nhật: S = a × b", "Chu vi hình chữ nhật: P = (a + b) × 2", "Quãng đường: s = v × t", "Trung bình cộng = Tổng các số : Số các số hạng"] },
          { kind: "text", value: "Các công thức trên đều là quy ước được định nghĩa từ trước để tính toán cho một mục đích nhất định. Trong phần mềm bảng tính, HÀM là công thức (hoặc kết hợp nhiều công thức) được định nghĩa từ trước, dùng để tính toán với các giá trị dữ liệu cụ thể — ví dụ hàm tính tổng, hàm đếm, hàm tính trung bình…" },
        ],
      },
      questions: [
        { question: "Thử thách tính nhẩm: Tổng số cây hoa của tất cả các lớp trong Hình 8.3 là bao nhiêu? (Máy tính chỉ cần gõ =SUM(C4:I8))", type: "multiple-choice",
          options: ["267", "277", "287", "297"],
          answer: 2, explanation: "Tổng là 287 cây. Với hàm =SUM(C4:I8), phần mềm tính ngay lập tức và chính xác — kể cả khi dữ liệu thay đổi!",
          level: "van-dung", activity: "mo-dau" },
        { question: "Trong phần mềm bảng tính, hàm là gì?", type: "multiple-choice",
          options: ["Một ô tính có tô màu", "Công thức (hoặc kết hợp nhiều công thức) được định nghĩa từ trước", "Tên của một trang tính", "Một kiểu dữ liệu văn bản"],
          answer: 1, explanation: "Hàm là công thức (hoặc kết hợp nhiều công thức) được định nghĩa từ trước, dùng để tính toán với các giá trị dữ liệu cụ thể.",
          level: "nhan-biet", activity: "mo-dau" },
      ],
    },

    /* ===================== HĐ2.1: HÀM TRONG BẢNG TÍNH (10 phút) ===================== */
    {
      id: "ham-trong-bang-tinh", name: "1. Hàm trong bảng tính (Phiếu học tập 1) 🔎", type: "knowledge",
      goal: "Nhận biết tên hàm, ý nghĩa và tham số của hàm; cú pháp chung của hàm.",
      time: 480,
      task: "Nhóm 3–4 HS: bấm vào ô E6 ở hai bảng tính (Hình 8.1, 8.2), quan sát công thức trong vùng nhập dữ liệu và trả lời: tên hàm, ý nghĩa, số tham số và tham số của hàm.",
      sgkImage: "assets/sgk/hinh-8-1-8-2.jpg",
      sandbox: Object.assign({}, H82, { intro: "🧪 Hình 8.2: bấm ô E6 để xem công thức =AVERAGE(B5:C7). Thử sửa số ở cột B, C — kết quả tự tính lại!" }),
      sheet: H81,
      content: {
        heading: "🔎 Hàm trong bảng tính",
        revealLabel: "📌 Mỗi hàm được xác định bởi… (SGK tr.40)",
        blocks: [
          { kind: "html", value: ANATOMY_HTML },
          { kind: "list", value: ["Tên của hàm (ví dụ SUM).", "Ý nghĩa của hàm (ví dụ tính tổng).", "Các tham số của hàm: dãy gồm các số, địa chỉ ô, địa chỉ vùng dữ liệu, viết cách nhau bởi dấu “,” hoặc “;”."] },
          { kind: "image", value: "assets/sgk/hinh-8-1-8-2.jpg", caption: "Hình 8.1. Hàm SUM · Hình 8.2. Hàm AVERAGE" },
        ],
      },
      questions: [
        { question: "Hình 8.1: bấm chọn (kéo chuột) đúng VÙNG DỮ LIỆU là tham số của hàm ở ô E6.", type: "sheet", answer: "B5:D7",
          explanation: "Ô E6 chứa =SUM(B5:D7): tham số là vùng B5:D7 — số cây hoa của Bình, Hòa, Hương. Tổng = 24.",
          hint: "Bấm ô E6 để đọc công thức trong vùng nhập dữ liệu (fx).", level: "nhan-biet", activity: "ham-trong-bang-tinh" },
        { question: "Trong công thức =SUM(B5:D7), tên hàm và ý nghĩa của hàm là:", type: "multiple-choice",
          options: ["B5:D7 — tính trung bình", "SUM — tính tổng", "SUM — tìm giá trị lớn nhất", "E6 — tính tổng"],
          answer: 1, explanation: "Tên hàm là SUM, ý nghĩa: tính tổng các giá trị số trong vùng B5:D7.", level: "nhan-biet", activity: "ham-trong-bang-tinh" },
        { question: "Hình 8.2: bấm chọn vùng dữ liệu là tham số của hàm =AVERAGE(B5:C7).", type: "sheet", answer: "B5:C7", sheet: H82,
          explanation: "AVERAGE(B5:C7) tính trung bình cộng 6 giá trị trong vùng B5:C7: (7+5+3+5+4+6) : 6 = 5.", level: "nhan-biet", activity: "ham-trong-bang-tinh" },
        { question: "Hàm =AVERAGE(B5:C7) có bao nhiêu tham số và ý nghĩa là gì?", type: "multiple-choice",
          options: ["2 tham số B5 và C7 — tính tổng", "6 tham số — đếm số ô", "1 tham số là vùng B5:C7 — tính trung bình cộng", "Không có tham số — tính trung bình"],
          answer: 2, explanation: "Hàm có 1 tham số là vùng dữ liệu B5:C7; AVERAGE tính trung bình cộng các giá trị số trong vùng.", level: "thong-hieu", activity: "ham-trong-bang-tinh" },
      ],
      remember: ["Mỗi hàm được xác định bởi: tên hàm, ý nghĩa của hàm và các tham số.", "Cách sử dụng hàm: =<tên hàm>(<các tham số>)."],
    },
    {
      id: "thanh-phan-ham", name: "Ghép các thành phần của hàm 🧩", type: "matching",
      goal: "Nhận diện đúng các thành phần trong cú pháp hàm.",
      time: 120,
      task: "Ghép mỗi phần của công thức =SUM(D4:H4,15,K10) với vai trò của nó. Làm hết rồi bấm Nộp bài.",
      pairs: [
        { left: "=", right: "Dấu bắt đầu mọi công thức, hàm" },
        { left: "SUM", right: "Tên hàm (tính tổng)" },
        { left: "D4:H4", right: "Tham số là địa chỉ vùng dữ liệu" },
        { left: "K10", right: "Tham số là địa chỉ ô" },
        { left: "15", right: "Tham số là một số" },
        { left: ",", right: "Dấu ngăn cách các tham số" },
      ],
      explanation: "=SUM(D4:H4,15,K10): dấu = mở đầu, tên hàm SUM, trong ngoặc là 3 tham số (vùng D4:H4, số 15, ô K10) cách nhau bởi dấu phẩy.",
    },

    /* ===================== HĐ2.2: NHẬP HÀM (10 phút) ===================== */
    {
      id: "nhap-ham", name: "Nhập hàm (Phiếu học tập 2) ⌨️", type: "knowledge",
      goal: "Nhập được hàm theo cú pháp; biết dùng chuột chọn vùng tham số; sao chép hàm.",
      time: 480,
      task: "Nhập hàm tại ô C9 để tính tổng số cây hoa lớp 7A, rồi sao chép sang D9:I9 cho các lớp khác. Trả lời: nhập hàm có giống nhập công thức không?",
      sgkImage: "assets/sgk/hinh-8-4.jpg",
      sheet: H83,
      content: {
        heading: "⌨️ Nhập hàm",
        prompt: "Hoạt động 2: Theo em, nhập hàm vào bảng tính có giống như nhập dữ liệu thông thường không?",
        revealLabel: "🪜 Các bước nhập hàm (SGK tr.40)",
        blocks: [
          { kind: "list", value: ["Bước 1. Nháy chuột vào ô C9 (hoặc vùng nhập dữ liệu) để nhập hàm.", "Bước 2. Nhập =SUM( , sau đó dùng chuột đánh dấu vùng dữ liệu cần tính tổng (C4:C8), gõ dấu đóng ngoặc “)” để đóng hàm.", "Nhấn Enter để kết thúc — kết quả hiện ngay trên ô C9.", "Tương tự cho D9 đến I9 — có thể sao chép công thức từ ô C9 sang các ô D9 đến I9."] },
          { kind: "image", value: "assets/sgk/hinh-8-4.jpg", caption: "Hình 8.4. Vị trí nhập hàm" },
        ],
      },
      questions: [
        { question: "Nhập hàm vào ô C9 để tính tổng số cây hoa lớp 7A sẽ trồng.", type: "sheet", mode: "formula", target: "C9", answer: "=SUM(C4:C8)",
          explanation: "C9 = SUM(C4:C8) = 10 + 16 + 14 = 40 (ô trống được bỏ qua).",
          hint: "Gõ =SUM( rồi kéo chọn C4:C8 (hoặc gõ C4:C8), gõ ) và Enter.", level: "van-dung", activity: "nhap-ham" },
        { question: "Sao chép hàm ở ô C9 sang các ô D9 đến I9 để tính tổng cho các lớp 7B … 7H (nhập C9 rồi 📋 Sao chép, chọn D9:I9, 📥 Dán).", type: "sheet", mode: "formula", target: "C9:I9", answer: "=SUM(C4:C8)",
          explanation: "Sau khi sao chép: D9 = SUM(D4:D8) = 47, E9 = SUM(E4:E8) = 40, …, I9 = SUM(I4:I8) = 48 — địa chỉ vùng tự dời theo cột.",
          hint: "Chọn C9 → Ctrl+C (📋) → kéo chọn D9:I9 → Ctrl+V (📥).", level: "van-dung", activity: "nhap-ham" },
        { question: "Cách nhập hàm vào ô tính:", type: "multiple-choice",
          options: ["Giống nhập văn bản, không cần dấu =", "Giống nhập công thức: bắt đầu bằng dấu =, rồi tên hàm và các tham số trong ngoặc", "Chỉ nhập được bằng chuột, không gõ được", "Phải viết tên hàm bằng chữ in hoa"],
          answer: 1, explanation: "Cách nhập hàm tương tự nhập công thức: =<tên hàm>(<các tham số>). Tên hàm viết hoa hay thường đều được.", level: "nhan-biet", activity: "nhap-ham" },
        { question: "Các tham số của hàm có thể là địa chỉ ô hoặc địa chỉ vùng dữ liệu.", type: "true-false", answer: true,
          explanation: "Đúng. Tham số có thể là số, địa chỉ ô, địa chỉ vùng; khi nhập có thể dùng chuột chọn ô hoặc vùng.", level: "nhan-biet", activity: "nhap-ham" },
        { question: "Gõ =sum(c4:c8) (chữ thường) thì phần mềm bảng tính vẫn hiểu và tính đúng.", type: "true-false", answer: true,
          explanation: "Đúng. Tên hàm có thể dùng chữ in hoa hoặc in thường.", level: "thong-hieu", activity: "nhap-ham" },
      ],
      remember: ["Cách nhập hàm tương tự như cách nhập công thức. Cú pháp: =<tên hàm>(<các tham số>).", "Cần nhập chính xác tên hàm và các tham số; có thể dùng chuột chọn các ô hoặc vùng làm tham số."],
    },
    {
      id: "cac-buoc-nhap-ham", name: "Sắp xếp các bước nhập hàm 🪜", type: "ordering",
      goal: "Nắm quy trình nhập hàm.",
      time: 90,
      task: "Sắp xếp các bước nhập hàm =SUM(C4:C8) vào ô C9 rồi bấm Nộp bài.",
      steps: ["Nháy chuột vào ô C9", "Gõ =SUM(", "Dùng chuột đánh dấu vùng C4:C8", "Gõ dấu đóng ngoặc )", "Nhấn Enter — kết quả hiện ở ô C9"],
      explanation: "Chọn ô → gõ =tên hàm( → chọn vùng tham số → đóng ngoặc → Enter.",
    },
    {
      id: "bat-loi-ham", name: "Thám tử bắt lỗi hàm 🕵️", type: "matching",
      goal: "Phát hiện lỗi cú pháp thường gặp khi nhập hàm.",
      time: 150,
      task: "Mỗi công thức sau muốn tính tổng số cây hoa lớp 7A (vùng C4:C8) nhưng bị lỗi. Ghép công thức với lỗi của nó. Có thể gõ thử vào bảng tính bên dưới!",
      sandbox: { title: "Gõ thử hàm", cols: 3, rows: 7, widths: { A: 1.9, B: 1.2, C: 1 }, cells: { A1: "Dữ liệu 7A:", B1: "10", A2: "", B2: "", A3: "", B3: "16", B4: "14", A6: "Gõ thử hàm vào B6:" }, bold: ["A1", "A6"],
        intro: "🧪 Gõ vào B6: =SUMM(B1:B4) · =SUM(B1:B4 · SUM(B1:B4) · =sum(B1:B4) — xem kết quả!" },
      pairs: [
        { left: "SUM(C4:C8)", right: "Thiếu dấu = → máy coi là văn bản" },
        { left: "=SUMM(C4:C8)", right: "Sai tên hàm → báo lỗi #NAME?" },
        { left: "=SUM(C4:C8", right: "Thiếu dấu ngoặc đóng" },
        { left: "=SUM(D4:D8)", right: "Chọn sai vùng dữ liệu (cột của lớp 7B)" },
      ],
      explanation: "Lỗi hay gặp: thiếu dấu =, sai tên hàm, thiếu ngoặc, chọn sai vùng dữ liệu. Hãy kiểm tra kĩ trước khi nhấn Enter.",
    },

    /* ===================== HĐ2.3: MỘT SỐ HÀM TÍNH TOÁN ĐƠN GIẢN (20 phút) ===================== */
    {
      id: "ham-don-gian", name: "2. Một số hàm tính toán đơn giản 🧮", type: "knowledge",
      goal: "Sử dụng các hàm SUM, AVERAGE, MAX, MIN, COUNT để trả lời các câu hỏi thực tế.",
      time: 720,
      task: "Nhóm 3–4 HS: một số nhóm tính bằng tay, một số nhóm nhập hàm vào cột K (K4 đến K8) để trả lời 5 câu hỏi ở cột J — rồi so sánh kết quả.",
      sgkImage: "assets/sgk/hinh-8-5-bang-8-1.jpg",
      sheet: H85,
      content: {
        heading: "🧮 Hoạt động 3: Làm quen với một số hàm tính toán đơn giản",
        prompt: "Dự án Trường học xanh cần tính toán những gì? Các yêu cầu đó có thể diễn tả bằng các hàm như thế nào?",
        revealLabel: "📋 Bảng 8.2. Cú pháp một số hàm",
        blocks: [
          { kind: "html", value: BANG82_HTML },
          { kind: "image", value: "assets/sgk/hinh-8-5-bang-8-1.jpg", caption: "Hình 8.5 và Bảng 8.1. Các yêu cầu cần tính toán, các công thức cần nhập" },
        ],
      },
      questions: [
        { question: "K4: Trung bình mỗi lớp sẽ trồng bao nhiêu cây? Nhập hàm vào ô K4.", type: "sheet", mode: "formula", target: "K4", answer: "=AVERAGE(C4:I8)",
          explanation: "=AVERAGE(C4:I8) = 287 : 21 ≈ 13.6667 (hàm bỏ qua các ô trống).", hint: "Trung bình cộng → AVERAGE; vùng dữ liệu C4:I8.", level: "van-dung", activity: "ham-don-gian" },
        { question: "K5: Số cây hoa Dừa cạn lớn nhất một lớp sẽ trồng là bao nhiêu? Nhập hàm vào ô K5.", type: "sheet", mode: "formula", target: "K5", answer: "=MAX(C6:I6)",
          explanation: "Hoa Dừa cạn ở hàng 6 → =MAX(C6:I6) = 16.", hint: "Lớn nhất → MAX; hàng của Hoa Dừa cạn.", level: "van-dung", activity: "ham-don-gian" },
        { question: "K6: Số cây hoa Mười giờ ít nhất một lớp sẽ trồng là bao nhiêu? Nhập hàm vào ô K6.", type: "sheet", mode: "formula", target: "K6", answer: "=MIN(C4:I4)",
          explanation: "Hoa Mười giờ ở hàng 4 → =MIN(C4:I4) = 10 (ô trống không được tính là 0).", level: "van-dung", activity: "ham-don-gian" },
        { question: "K7: Bao nhiêu lớp sẽ trồng hoa Hồng? Nhập hàm vào ô K7.", type: "sheet", mode: "formula", target: "K7", answer: "=COUNT(C8:I8)",
          explanation: "Đếm số ô có số ở hàng Hoa Hồng → =COUNT(C8:I8) = 4 lớp.", hint: "Đếm → COUNT.", level: "van-dung", activity: "ham-don-gian" },
        { question: "K8: Lớp 7B sẽ trồng bao nhiêu loại hoa? Nhập hàm vào ô K8.", type: "sheet", mode: "formula", target: "K8", answer: "=COUNT(D4:D8)",
          explanation: "Lớp 7B là cột D → =COUNT(D4:D8) = 3 loại hoa.", level: "van-dung-cao", activity: "ham-don-gian" },
      ],
      remember: ["SUM: tính tổng · AVERAGE: trung bình cộng · MAX: lớn nhất · MIN: nhỏ nhất · COUNT: đếm các giá trị số.", "Các hàm chỉ xử lí ô có dữ liệu số, bỏ qua ô chứa văn bản hoặc ô trống."],
    },
    {
      id: "chon-ham", name: "Trò chơi: Chọn đúng hàm 🎯", type: "matching",
      goal: "Chọn hàm phù hợp với yêu cầu tính toán.",
      time: 120,
      task: "Ghép mỗi yêu cầu của dự án Trường học xanh với hàm phù hợp. Làm hết rồi bấm Nộp bài.",
      pairs: [
        { left: "Tổng số cây cả khối 7 sẽ trồng", right: "SUM" },
        { left: "Số cây trung bình mỗi lớp trồng", right: "AVERAGE" },
        { left: "Lớp trồng nhiều cây nhất được bao nhiêu cây", right: "MAX" },
        { left: "Loại cây được trồng ít nhất là bao nhiêu cây", right: "MIN" },
        { left: "Có bao nhiêu lớp trồng cây Bưởi", right: "COUNT" },
      ],
      explanation: "Tổng → SUM; trung bình → AVERAGE; lớn nhất → MAX; nhỏ nhất → MIN; đếm số ô có số → COUNT.",
    },
    {
      id: "ket-qua-ham", name: "Hàm cho kết quả như thế nào? 🤔", type: "knowledge",
      goal: "Hiểu hàm chỉ xử lí dữ liệu số, bỏ qua văn bản.",
      time: 240,
      task: "Trả lời câu hỏi SGK tr.42: mỗi hàm sau cho kết quả như thế nào? Có thể gõ thử vào bảng tính bên dưới.",
      sgkImage: "assets/sgk/bang-8-2.jpg",
      sandbox: { title: "Gõ thử hàm", cols: 2, rows: 5, widths: { A: 1.6, B: 2.6 }, cells: { A1: "Gõ thử vào cột B:", A2: "a)", A3: "b)", A4: "c)" }, bold: ["A1"],
        intro: "🧪 Gõ =SUM(1,3,\"Hà Nội\",\"Zero\",5) vào B2, =MIN(3,5,\"One\",1) vào B3, =COUNT(1,3,5,7) vào B4." },
      content: {
        heading: "🤔 Mỗi hàm sau cho kết quả như thế nào?",
        prompt: "a) SUM(1,3,“Hà Nội”,“Zero”,5)   b) MIN(3,5,“One”,1)   c) COUNT(1,3,5,7)",
        revealLabel: "🔍 Mở rộng: trên Excel thật thì sao?",
        blocks: [
          { kind: "ext", value: "Theo lưu ý của SGK, hàm bỏ qua dữ liệu văn bản nên a) = 9, b) = 1. Trên Microsoft Excel, Google Sheets thật: nếu chữ nằm TRONG Ô thì hàm bỏ qua (đúng như SGK); nhưng nếu gõ chữ TRỰC TIẾP làm tham số như “Hà Nội”, “One” thì SUM và MIN báo lỗi #VALUE!. COUNT(1,3,5,7) = 4 ở mọi phần mềm." },
        ],
      },
      questions: [
        { question: "a) SUM(1,3,“Hà Nội”,“Zero”,5) cho kết quả (theo SGK):", type: "multiple-choice",
          options: ["9", "5", "Hà Nội", "0"],
          answer: 0, explanation: "Hàm bỏ qua dữ liệu văn bản “Hà Nội”, “Zero”: 1 + 3 + 5 = 9. (Mở rộng: Excel thật báo #VALUE! khi gõ chữ trực tiếp làm tham số.)", level: "thong-hieu", activity: "ket-qua-ham" },
        { question: "b) MIN(3,5,“One”,1) cho kết quả (theo SGK):", type: "multiple-choice",
          options: ["3", "One", "1", "5"],
          answer: 2, explanation: "Bỏ qua “One”, giá trị nhỏ nhất trong 3, 5, 1 là 1. (Mở rộng: Excel thật báo #VALUE! khi gõ chữ trực tiếp làm tham số.)", level: "thong-hieu", activity: "ket-qua-ham" },
        { question: "c) COUNT(1,3,5,7) cho kết quả:", type: "multiple-choice",
          options: ["16", "7", "1", "4"],
          answer: 3, explanation: "COUNT đếm số các giá trị là số: 1, 3, 5, 7 → 4.", level: "thong-hieu", activity: "ket-qua-ham" },
        { question: "Vùng A1:A5 có các ô: 8, (ô trống), “bảy”, 6, 10. Hàm =AVERAGE(A1:A5) cho kết quả:", type: "multiple-choice",
          options: ["4.8", "6", "8", "Báo lỗi"],
          answer: 2, explanation: "AVERAGE bỏ qua ô trống và ô chữ “bảy”: (8 + 6 + 10) : 3 = 8.", level: "van-dung-cao", activity: "ket-qua-ham" },
      ],
    },

    /* ===================== HĐ2.4: THỰC HÀNH (25 phút) ===================== */
    {
      id: "thuc-hanh", name: "3. Thực hành: Tính toán trên dữ liệu trồng cây thực tế 🌳", type: "knowledge",
      goal: "Hoàn thiện Trang tính 4 — Dự kiến phân bổ cây cho các lớp bằng hàm SUM, AVERAGE và sao chép công thức.",
      time: 1500,
      task: "Thực hành trên Excel với tệp THXanh.xlsx theo 5 bước SGK. Máy/điện thoại không có Excel: làm trên bảng tính mô phỏng (đã chèn sẵn các hàng trống) — lần lượt từng câu.",
      sgkImage: "assets/sgk/hinh-8-6.jpg",
      sheet: T4base,
      content: {
        heading: "🌳 Trang tính 4. Dự kiến kết quả",
        revealLabel: "🪜 Hướng dẫn trên Excel (SGK tr.42–44)",
        blocks: [
          { kind: "list", value: [
            "a) Mở tệp THXanh.xlsx; tạo trang tính mới đặt tên 4. Dự kiến kết quả.",
            "b) Nhập tại A2: Bảng 4. Dự kiến phân bổ cây cho các lớp. Sao chép vùng A3:C19 của trang 3. Tìm hiểu giống cây sang A3; nhập dữ liệu như Hình 8.6.",
            "c) Chèn 2 hàng trống trên hàng 9 (chọn hàng 9 → nháy phải → Insert, làm 2 lần) và trên hàng có STT 12. Tại D9 nhập =SUM(D4:D8), sao chép sang E9…J9. Làm tương tự cho cây ăn quả, cây bóng mát.",
            "d) Tại D25 nhập =D9+D17+D24, sao chép sang E25…J25. Thêm cột Tổng số cây, Trung bình: K4 =SUM(D4:J4), L4 =AVERAGE(D4:J4), sao chép xuống đến hàng 25, xoá K10, K18, L10, L18.",
            "e) Định dạng: tiêu đề bảng in đậm; hàng 3 in đậm, nền vàng; các ô tổng hợp in đậm. Lưu lại kết quả.",
          ] },
          { kind: "image", value: "assets/sgk/hinh-8-6.jpg", caption: "Hình 8.6. Trang tính 4" },
          { kind: "image", value: "assets/sgk/hinh-8-7.jpg", caption: "Hình 8.7. Kết quả trang tính 4" },
        ],
      },
      questions: [
        { question: "c) Nhập =SUM(D4:D8) vào ô D9 để tính số cây hoa của lớp 7A, rồi sao chép sang E9:J9.", type: "sheet", mode: "formula", target: "D9:J9", answer: "=SUM(D4:D8)",
          explanation: "D9 = 40, E9 = 47, F9 = 40, G9 = 31, H9 = 45, I9 = 36, J9 = 48.", hint: "Nhập D9 → 📋 Sao chép → chọn E9:J9 → 📥 Dán.", level: "van-dung", activity: "thuc-hanh" },
        { question: "c) Tính tổng số cây ăn quả của mỗi lớp tại hàng 17 (D17:J17).", type: "sheet", mode: "formula", target: "D17:J17", answer: "=SUM(D11:D16)", sheet: withCells(T4base, SUMS),
          explanation: "D17 = SUM(D11:D16) = 21; sao chép sang E17…J17: 32, 35, 29, 29, 26, 17.", level: "van-dung", activity: "thuc-hanh" },
        { question: "c) Tính tổng số cây bóng mát của mỗi lớp tại hàng 24 (D24:J24).", type: "sheet", mode: "formula", target: "D24:J24", answer: "=SUM(D19:D23)", sheet: withCells(T4base, SUMS),
          explanation: "D24 = SUM(D19:D23) = 22; …; J24 = 18.", level: "van-dung", activity: "thuc-hanh" },
        { question: "d) Tại D25 nhập =D9+D17+D24 (tổng số cây của lớp 7A), rồi sao chép sang E25:J25.", type: "sheet", mode: "formula", target: "D25:J25", answer: "=D9+D17+D24", sheet: withCells(T4base, SUMS),
          explanation: "D25 = 40 + 21 + 22 = 83; các lớp khác: 100, 104, 84, 92, 77, 83. (Cũng có thể dùng =SUM(D9,D17,D24).)", level: "van-dung", activity: "thuc-hanh" },
        { question: "d) Tại K4 nhập =SUM(D4:J4) (tổng số cây Hoa Mười giờ), rồi sao chép xuống K5:K9.", type: "sheet", mode: "formula", target: "K4:K9", answer: "=SUM(D4:J4)", sheet: withCells(T4base, Object.assign({}, SUMS, TOTAL)),
          explanation: "K4 = 56, K5 = 35, K6 = 63, K7 = 75, K8 = 58, K9 = 287.", level: "van-dung", activity: "thuc-hanh" },
        { question: "d) Tại L4 nhập =AVERAGE(D4:J4) (số cây Hoa Mười giờ trung bình mỗi lớp), rồi sao chép xuống L5:L9.", type: "sheet", mode: "formula", target: "L4:L9", answer: "=AVERAGE(D4:J4)", sheet: withCells(T4base, Object.assign({}, SUMS, TOTAL)),
          explanation: "L4 = 14; L5 ≈ 11.67; L6 = 12.6; L7 = 15; L8 = 14.5; L9 = 41. AVERAGE bỏ qua ô trống nên chia cho số lớp có trồng.", level: "van-dung-cao", activity: "thuc-hanh" },
      ],
      remember: ["Dùng hàm SUM, AVERAGE và sao chép công thức giúp tính nhanh cả bảng; sửa dữ liệu thì kết quả tự cập nhật."],
    },

    /* ===================== HĐ3: LUYỆN TẬP (10 phút) ===================== */
    {
      id: "luyen-tap", name: "Luyện tập 🏋️", type: "knowledge",
      goal: "Nhận ra có nhiều công thức cho cùng kết quả; dùng MAX, AVERAGE với nhiều vùng tham số.",
      time: 600,
      task: "Trả lời Luyện tập 1, 2 (SGK tr.44) rồi thực hành Luyện tập 3 trên Trang tính 4 (hàng 26: lớn nhất, hàng 27: trung bình).",
      sgkImage: "assets/sgk/sgk-trang44.jpg",
      sheet: T4_FULL,
      questions: [
        { question: "Luyện tập 1: Tại ô K9 (đang là =SUM(D9:J9)) có thể dùng công thức nào khác cho cùng kết quả? (Chọn tất cả đáp án đúng)", type: "multiple-select",
          options: ["=SUM(K4:K8)", "=K4+K5+K6+K7+K8", "=SUM(K4:K9)", "=SUM(D4:J8)"],
          answer: [0, 1, 3], explanation: "K9 là tổng tất cả cây hoa: =SUM(K4:K8), =K4+…+K8 hay =SUM(D4:J8) đều cho 287. =SUM(K4:K9) chứa chính ô K9 → lỗi tham chiếu vòng. Có nhiều công thức cho cùng một kết quả!",
          level: "van-dung", activity: "luyen-tap" },
        { question: "Luyện tập 2: Các công thức =SUM(C3:K3); =C3+SUM(D3:J3)+K3; =SUM(C3:G3)+SUM(H3:K3) có cho kết quả giống nhau không?", type: "multiple-choice",
          options: ["Khác nhau cả ba", "Chỉ công thức a) và b) giống nhau", "Giống nhau — đều là tổng các ô từ C3 đến K3", "Chỉ công thức c) đúng"],
          answer: 2, explanation: "Cả ba đều cộng đủ các ô C3, D3, …, K3 (chỉ cách chia nhóm khác nhau) → kết quả giống nhau.",
          level: "thong-hieu", activity: "luyen-tap" },
        { question: "Luyện tập 3a: Tại D26 nhập hàm tìm số cây lớn nhất sẽ được trồng của lớp 7A (chỉ xét các hàng cây, không lấy hàng tổng 9, 17, 24), rồi sao chép sang E26:J26.", type: "sheet", mode: "formula", target: "D26:J26", answer: "=MAX(D4:D8,D11:D16,D19:D23)",
          explanation: "D26 = MAX(D4:D8;D11:D16;D19:D23) = 16. Nếu viết =MAX(D4:D23) sẽ lấy nhầm hàng tổng (40) → sai!",
          hint: "Hàm có thể có nhiều tham số vùng, cách nhau bởi “;” hoặc “,”.", level: "van-dung-cao", activity: "luyen-tap" },
        { question: "Luyện tập 3b: Tại D27 nhập hàm tính số cây trung bình sẽ được trồng của lớp 7A (các hàng cây), rồi sao chép sang E27:J27.", type: "sheet", mode: "formula", target: "D27:J27", answer: "=AVERAGE(D4:D8,D11:D16,D19:D23)",
          explanation: "D27 = AVERAGE(D4:D8;D11:D16;D19:D23) ≈ 9.22. Tránh =AVERAGE(D4:D23) vì sẽ tính cả các hàng tổng.", level: "van-dung-cao", activity: "luyen-tap" },
      ],
    },
    {
      id: "tro-choi", name: "Trò chơi: Ong chăm chỉ về vườn hoa 🐝", type: "penguin",
      pet: "🐝", homeIcon: "🌻", enemy: "🌧️", saveWord: "chú ong về với vườn hoa Trường học xanh",
      winText: "Cả đàn ong đã về vườn hoa — lớp mình xuất sắc!",
      goal: "Ôn tập nhanh cú pháp và ý nghĩa các hàm.",
      time: 300,
      task: "Trả lời đúng để đưa từng chú ong về vườn hoa trước khi cơn mưa ập đến!",
      intro: "Mỗi câu đúng: một chú ong 🐝 bay về vườn hoa 🌻!",
      questions: [
        { question: "Hàm nào dùng để tính trung bình cộng?", type: "multiple-choice", options: ["SUM", "AVERAGE", "COUNT", "MAX"], answer: 1,
          explanation: "AVERAGE tính trung bình cộng các giá trị số.", level: "nhan-biet", activity: "tro-choi" },
        { question: "Công thức nào viết ĐÚNG cú pháp hàm?", type: "multiple-choice", options: ["SUM=(A1:A5)", "=SUM A1:A5", "=SUM(A1:A5)", "=(A1:A5)SUM"], answer: 2,
          explanation: "Cú pháp: =<tên hàm>(<các tham số>) → =SUM(A1:A5).", level: "nhan-biet", activity: "tro-choi" },
        { question: "Các ô B1:B4 chứa 5, 8, (trống), 2. Hàm =COUNT(B1:B4) cho kết quả:", type: "multiple-choice", options: ["3", "4", "15", "2"], answer: 0,
          explanation: "COUNT chỉ đếm các ô có số: 5, 8, 2 → 3.", level: "thong-hieu", activity: "tro-choi" },
        { question: "Muốn tìm lớp trồng NHIỀU cây nhất trong hàng 25 (D25:J25), em nhập:", type: "multiple-choice", options: ["=MIN(D25:J25)", "=COUNT(D25:J25)", "=SUM(D25:J25)", "=MAX(D25:J25)"], answer: 3,
          explanation: "Lớn nhất → MAX: =MAX(D25:J25) = 104 (lớp 7C).", level: "van-dung", activity: "tro-choi" },
        { question: "Gõ =SUMM(C4:C8) thì bảng tính báo lỗi vì:", type: "multiple-choice", options: ["Thiếu dấu =", "Sai tên hàm", "Thiếu tham số", "Chữ in hoa"], answer: 1,
          explanation: "Không có hàm tên SUMM — phần mềm báo lỗi #NAME? (sai tên hàm).", level: "thong-hieu", activity: "tro-choi" },
        { question: "=AVERAGE(10,12,1) cho kết quả là:", type: "multiple-choice", options: ["23", "7.6667", "12", "3"], answer: 1,
          explanation: "(10 + 12 + 1) : 3 = 23 : 3 ≈ 7.6667.", level: "van-dung", activity: "tro-choi" },
        { question: "Các tham số của hàm được viết cách nhau bởi dấu “,” hoặc dấu “;”.", type: "true-false", answer: true,
          explanation: "Đúng — ví dụ SUM(D4:H4,15,K10) hoặc SUM(D4:H4;15;K10).", level: "nhan-biet", activity: "tro-choi" },
        { question: "Ô D9 chứa =SUM(D4:D8) = 40. Em sửa ô D4 từ 10 thành 20. Ô D9 sẽ:", type: "multiple-choice", options: ["Vẫn là 40", "Báo lỗi", "Tự động thành 50", "Thành 20"], answer: 2,
          explanation: "Hàm dùng địa chỉ ô nên tự động tính lại: 40 − 10 + 20 = 50.", level: "van-dung-cao", activity: "tro-choi" },
      ],
    },

    /* ===================== HĐ4: VẬN DỤNG (10 phút) ===================== */
    {
      id: "van-dung", name: "Vận dụng: Chi tiêu gia đình 💰", type: "knowledge",
      goal: "Dùng hàm để trả lời các câu hỏi về chi tiêu gia đình.",
      time: 480,
      task: "Luyện trên bảng chi tiêu VÍ DỤ: nhập hàm vào C12 đến C16 để trả lời 4 câu hỏi của SGK. Về nhà làm với số liệu thật của gia đình em.",
      sgkImage: "assets/sgk/sgk-trang44.jpg",
      sheet: CHI_TIEU,
      questions: [
        { question: "a) Tổng số tiền chi tiêu một tháng là bao nhiêu? Nhập hàm vào ô C12.", type: "sheet", mode: "formula", target: "C12", answer: "=SUM(C4:C11)",
          explanation: "=SUM(C4:C11) = 7 140 000 đồng.", level: "van-dung", activity: "van-dung" },
        { question: "b) Khoản chi nhiều nhất là bao nhiêu? Nhập hàm vào ô C13.", type: "sheet", mode: "formula", target: "C13", answer: "=MAX(C4:C11)",
          explanation: "=MAX(C4:C11) = 4 500 000 đồng (tiền ăn).", level: "van-dung", activity: "van-dung" },
        { question: "b) Khoản chi ít nhất là bao nhiêu? Nhập hàm vào ô C14.", type: "sheet", mode: "formula", target: "C14", answer: "=MIN(C4:C11)",
          explanation: "=MIN(C4:C11) = 120 000 đồng (tiền nước).", level: "van-dung", activity: "van-dung" },
        { question: "c) Có bao nhiêu khoản đã chi? Nhập hàm vào ô C15.", type: "sheet", mode: "formula", target: "C15", answer: "=COUNT(C4:C11)",
          explanation: "=COUNT(C4:C11) = 8 khoản.", level: "van-dung", activity: "van-dung" },
        { question: "d) Trung bình mỗi ngày chi bao nhiêu tiền (tháng có 30 ngày)? Nhập công thức vào ô C16.", type: "sheet", mode: "formula", target: "C16", answer: "=SUM(C4:C11)/30",
          explanation: "Tổng chi : 30 ngày = 7 140 000 : 30 = 238 000 đồng/ngày (có thể viết =C12/30). Lưu ý: AVERAGE(C4:C11) là trung bình mỗi KHOẢN chi, không phải mỗi ngày!",
          hint: "Lấy tổng chi tiêu chia cho số ngày trong tháng.", level: "van-dung-cao", activity: "van-dung" },
      ],
    },
    {
      id: "van-dung-nha", name: "Vận dụng ở nhà 🏡", type: "vandung",
      goal: "Tạo bảng tính chi tiêu thật của gia đình, dùng hàm để tính và chia sẻ với bố mẹ.",
      time: 180,
      task: "Về nhà: cùng bố mẹ ghi các khoản chi tiêu một tháng vào bảng tính, dùng hàm để tính. Không cần gửi số tiền cụ thể — chỉ gửi các hàm em đã dùng và điều em rút ra.",
      intro: "Gửi câu trả lời cho thầy/cô (không ghi số tiền thật của gia đình).",
      cases: [
        { question: "Em đã dùng những hàm nào (viết đúng cú pháp) để trả lời 4 câu hỏi: tổng chi tiêu, khoản nhiều nhất / ít nhất, số khoản đã chi, trung bình mỗi ngày?",
          answer: "Ví dụ, dữ liệu số tiền ở C4:C11: a) =SUM(C4:C11); b) =MAX(C4:C11) và =MIN(C4:C11); c) =COUNT(C4:C11); d) =SUM(C4:C11)/30 (hoặc chia cho số ngày của tháng)." },
        { question: "Sau khi tính, em và bố mẹ rút ra điều gì để cân đối chi tiêu gia đình hợp lí hơn?",
          answer: "Gợi ý: nhận ra khoản chi lớn nhất để cân nhắc tiết kiệm; tiết kiệm điện, nước; theo dõi chi tiêu hằng tháng bằng bảng tính để so sánh và điều chỉnh. (Thông tin chi tiêu là riêng tư của gia đình — chỉ chia sẻ với người thân.)" },
      ],
    },

    /* ===================== TỔNG KẾT ===================== */
    {
      id: "tong-ket", name: "Tổng kết", type: "summary",
      task: "Cả lớp nhắc lại kiến thức trọng tâm, làm thử thách cuối. Chuẩn bị Bài 9: Trình bày bảng tính.",
      content: {
        learned: [
          "Hàm là công thức định nghĩa sẵn; xác định bởi tên hàm, ý nghĩa, các tham số.",
          "Cú pháp =<tên hàm>(<các tham số>); tham số là số, ô, vùng, cách nhau bởi “,” hoặc “;”; nhập giống công thức, có thể chọn vùng bằng chuột.",
          "SUM tổng · AVERAGE trung bình · MAX lớn nhất · MIN nhỏ nhất · COUNT đếm số — chỉ xử lí dữ liệu số.",
          "Dùng hàm + sao chép công thức giúp tính toán nhanh, chính xác, tự cập nhật khi dữ liệu đổi.",
        ],
        challenge: [
          { question: "Hàng 25 (D25:J25) là tổng số cây của 7 lớp. Công thức nào tính số cây TRUNG BÌNH mỗi lớp trồng?", type: "multiple-choice",
            options: ["=SUM(D25:J25)/25", "=AVERAGE(D25:J25)", "=MAX(D25:J25)", "=COUNT(D25:J25)"],
            answer: 1, explanation: "=AVERAGE(D25:J25) = 623 : 7 = 89 cây (đúng như ô L25 ở Hình 8.7).", level: "van-dung", activity: "tong-ket" },
          { question: "Bạn Lan gõ =MAX(D4:D23) để tìm số cây lớn nhất lớp 7A trồng một loại cây, nhưng được 40 thay vì 16. Vì sao?", type: "multiple-choice",
            options: ["Vì hàm MAX bị hỏng", "Vì vùng D4:D23 chứa cả các hàng tổng (D9 = 40), cần chọn đúng các vùng dữ liệu cây", "Vì phải viết chữ thường", "Vì thiếu dấu ngoặc"],
            answer: 1, explanation: "Chọn sai vùng dữ liệu: D4:D23 gồm cả ô tổng D9, D17. Dùng =MAX(D4:D8;D11:D16;D19:D23).", level: "van-dung-cao", activity: "tong-ket" },
        ],
      },
    },
  ],
};

if (typeof module !== "undefined" && module.exports) module.exports = LESSON;
if (typeof window !== "undefined") window.LESSON = LESSON;
