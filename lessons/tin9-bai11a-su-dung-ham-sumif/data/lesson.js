/* ============================================================================
 * BÀI 11a — SỬ DỤNG HÀM SUMIF  (Tin học 9 — Kết nối tri thức)
 * Chủ đề 4 (lựa chọn a): Sử dụng bảng tính điện tử nâng cao — dự án Quản lí tài chính gia đình.
 * Bám sát SGK trang 45–47 + Kế hoạch bài dạy (2 tiết) của giáo viên.
 * Chỉ sửa file này để đổi nội dung. Engine app.js không cần sửa.
 * Bảng tính mô phỏng TÍNH ĐƯỢC HÀM SUMIF; HS gõ công thức, kéo nút điền ■ để sao chép như Excel.
 * sheet.vary = vùng dữ liệu chữ được xáo lại khi chấm (công thức chọn sai vùng sẽ bị phát hiện).
 * ==========================================================================*/

// ---- Khoản mục thu, chi ----
const KHOAN_THU = ["Lương", "Thưởng", "Làm thêm", "Được cho/tặng", "Khác"];
const KHOAN_CHI = ["Ở", "Ăn", "Di chuyển", "Học tập", "Sức khoẻ", "Giải trí", "Quà tặng/Từ thiện", "Tiết kiệm", "Khác"];
const listCells = (col, items, from) => { const o = {}; items.forEach((t, i) => { o[col + (i + (from || 2))] = t; }); return o; };
const rowsOf = (list, from) => { const o = {}; list.forEach((r, i) => { const n = i + from; ["A", "B", "C", "D"].forEach((c, k) => { if (r[k] != null && r[k] !== "") o[c + n] = String(r[k]); }); }); return o; };
const colFormula = (col, n, f) => { const o = {}; for (let i = 0; i < n; i++) o[col + (i + 2)] = f(i + 2); return o; }; // cột công thức đã làm ở bài trước

// Trang tính Chi tiêu (Hình 11a.1, 11a.2) — cột G: Số lần chi (COUNTIF, Bài 10a)
const CHI_ROWS = [
  ["14/8/23", "Ở", "Tiền điện tháng 8", 800], ["14/8/23", "Sức khoẻ", "Mua thuốc", 620], ["15/8/23", "Học tập", "Học phí tháng 8", 2200],
  ["20/8/23", "Quà tặng/Từ thiện", "Quà tặng", 300], ["22/8/23", "Di chuyển", "Gửi xe, xăng xe", 600], ["26/8/23", "Ở", "Tiền nước tháng 8", 120],
  ["26/8/23", "Tiết kiệm", "Tiết kiệm tháng 8", 1000], ["30/8/23", "Ăn", "Tiền ăn tháng 8", 8000],
];
const chiSpec = (extraRows, extraCells, rows) => { const last = 10 + (extraRows || []).length; return { title: "TaiChinhGiaDinh.xlsx", sheets: ["Chi tiêu", "Thu nhập"], cols: 8, rows: rows || last,
  widths: { A: 0.95, B: 1.55, C: 1.6, D: 1.45, E: 0.22, F: 1.55, G: 0.85, H: 1.05 },
  cells: Object.assign({ A1: "Chi tiêu", A2: "Ngày", B2: "Khoản chi", C2: "Nội dung", D2: "Số tiền (nghìn đồng)", F1: "Khoản chi", G1: "Số lần chi", H1: "Tổng tiền" },
    rowsOf(CHI_ROWS.concat(extraRows || []), 3), listCells("F", KHOAN_CHI), colFormula("G", 9, (r) => "=COUNTIF($B$3:$B$" + last + ",F" + r + ")"), extraCells || {}),
  bold: ["A2:D2", "F1:H1"], center: ["A2:D2", "A3:A" + last, "F1:H1"], size: { A1: 16 }, fill: Object.assign({ "F2:F10": "#f5b9a1" }, last > 10 ? { ["A11:D" + last]: "#fef9c3" } : {}),
  comma: ["D3:D" + last, "H2:H12"], vary: "B3:B" + last }; };
const CHI_SPEC = chiSpec();
const H_SGK = [920, 8000, 600, 2200, 620, 0, 300, 1000, 0];                           // cột H trong Hình 11a.1
const CHI_HD1 = Object.assign(chiSpec(), { fill: { "F2:F10": "#f5b9a1", H2: "#ede9fe" } });
Object.assign(CHI_HD1.cells, listCells("H", H_SGK.map(String)));
const THEM_CHI = [["31/8/23", "Sức khoẻ", "Khám răng", 300], ["31/8/23", "Giải trí", "Xem phim", 150], ["31/8/23", "Di chuyển", "Sửa xe đạp", 80]];
const CHI_THEM = chiSpec(THEM_CHI);                                                    // Luyện tập: thêm 3 hàng (tô vàng)

// Trang tính Thu nhập (Hình 11a.3) — cột G: Số lần thu
const THU_ROWS = [
  ["13/8/23", "Lương", "Lương tháng 8", 10000], ["15/8/23", "Làm thêm", "Bán hàng trực tuyến", 1500], ["18/8/23", "Được cho/tặng", "Người thân tặng", 500],
  ["25/8/23", "Thưởng", "Thưởng tháng 8", 3000], ["29/8/23", "Khác", "Tiết kiệm tiền đi lại", 500], ["30/8/23", "Làm thêm", "Làm thêm tháng 8", 2000],
];
const thuSpec = (extraRows, extraCells, rows) => { const last = 8 + (extraRows || []).length; return { title: "TaiChinhGiaDinh.xlsx", sheets: ["Thu nhập", "Chi tiêu"], cols: 8, rows: rows || last,
  widths: { A: 0.95, B: 1.45, C: 1.8, D: 1.45, E: 0.22, F: 1.4, G: 0.8, H: 1.05 },
  cells: Object.assign({ A1: "Thu nhập", A2: "Ngày", B2: "Khoản thu", C2: "Nội dung", D2: "Số tiền (nghìn đồng)", F1: "Khoản thu", G1: "Số lần thu", H1: "Tổng tiền" },
    rowsOf(THU_ROWS.concat(extraRows || []), 3), listCells("F", KHOAN_THU), colFormula("G", 5, (r) => "=COUNTIF($B$3:$B$" + last + ",F" + r + ")"), extraCells || {}),
  bold: ["A2:D2", "F1:H1"], center: ["A2:D2", "A3:A" + last, "F1:H1"], size: { A1: 16 }, fill: Object.assign({ "F2:F6": "#aab8e0" }, last > 8 ? { ["A9:D" + last]: "#fef9c3" } : {}),
  comma: ["D3:D" + last, "H2:H7"], vary: "B3:B" + last }; };
const THU_SPEC = thuSpec();
// Dòng Tổng (giáo án): H2:H6 đã có công thức SUMIF, HS tính tổng ở G7, H7
const THU_TONG = thuSpec(null, Object.assign({ F7: "Tổng" }, colFormula("H", 5, (r) => "=SUMIF($B$3:$B$8,F" + r + ",$D$3:$D$8)")));
Object.assign(THU_TONG, { bold: ["A2:D2", "F1:H1", "F7:H7"], color: { "F7:H7": "#dc2626" } });
const THEM_THU = [["31/8/23", "Thưởng", "Thưởng dự án", 1000], ["31/8/23", "Làm thêm", "Dạy kèm", 800]];
const THU_THEM = thuSpec(THEM_THU);

// Bảng 11a.1 — hai lưới ví dụ
const MINI1 = { title: "ViDu_SUMIF_1.xlsx", cols: 4, rows: 5, widths: { A: 0.9, B: 0.5, C: 1.7, D: 1 },
  cells: { A1: "5", A2: "3", A3: "7", A4: "8", A5: "2", C1: "Tổng các số >5" }, fill: { "A1:A5": "#dbeafe" } };
const MINI2 = { title: "ViDu_SUMIF_2.xlsx", cols: 4, rows: 5, widths: { A: 1.1, B: 1.1, C: 2.1, D: 1.1 },
  cells: { A1: "Người chi", B1: "Số tiền", A2: "Khoa", B2: "500000", A3: "Minh", B3: "450000", A4: "Khoa", B4: "250000", A5: "Minh", B5: "80200", C1: "Tổng tiền Khoa đã chi", C2: "Tổng tiền Minh đã chi" },
  bold: ["A1:B1"], fill: { "A2:A5": "#dbeafe", "B2:B5": "#ede9fe" }, comma: ["B2:B5", "D1:D2"], vary: "A2:A5" };

// Vận dụng: KinhPhiTrienLam.xlsx (dữ liệu minh hoạ như Bài 10a)
const TL_THU = [["Quỹ", "Quỹ lớp", 500], ["Tài trợ", "Hội cha mẹ học sinh", 600], ["Tài trợ", "Cựu học sinh", 600], ["Quỹ", "Quỹ Đoàn", 400], ["Tài trợ", "Nhà sách", 740],
  ["Tài trợ", "Câu lạc bộ Tin học", 400], ["Tài trợ", "Phụ huynh", 500], ["Quỹ", "Quỹ khối 9", 960], ["Quỹ", "Quỹ lớp", 500]];
const TL_CHI = [["Văn phòng phẩm", "Giấy A0, bút dạ", 90], ["In tài liệu", "In áp phích", 75], ["In tài liệu", "In tờ rơi", 72], ["In tài liệu", "In phiếu khảo sát", 42],
  ["Văn phòng phẩm", "Băng dính, kéo", 53], ["In tài liệu", "In thẻ tên", 60], ["Văn phòng phẩm", "Bìa màu", 60], ["In tài liệu", "In giấy mời", 70],
  ["In tài liệu", "In bảng tên gian", 67], ["Văn phòng phẩm", "Ghim, kẹp", 70], ["Văn phòng phẩm", "Giấy màu", 57]];
const tlSpec = (kind, list) => { const last = list.length + 2, thu = kind === "thu"; return { title: "KinhPhiTrienLam.xlsx", sheets: thu ? ["Các khoản thu", "Các khoản chi"] : ["Các khoản chi", "Các khoản thu"], cols: 8, rows: last,
  widths: { A: 0.95, B: 1.55, C: 1.75, D: 1.4, E: 0.22, F: 1.55, G: 0.85, H: 1.05 },
  cells: Object.assign({ A1: thu ? "Các khoản thu của Triển lãm tin học" : "Các khoản chi của Triển lãm tin học", A2: "Ngày", B2: thu ? "Khoản thu" : "Khoản chi", C2: "Nội dung", D2: "Số tiền (nghìn đồng)",
    F1: thu ? "Khoản thu" : "Khoản chi", G1: thu ? "Số lần thu" : "Số lần chi", H1: "Tổng tiền" },
    thu ? { F2: "Quỹ", F3: "Tài trợ" } : { F2: "Văn phòng phẩm", F3: "In tài liệu" }, colFormula("G", 2, (r) => "=COUNTIF($B$3:$B$" + last + ",F" + r + ")"),
    rowsOf(list.map((r, i) => [(i + 2) + "/11/23", r[0], r[1], r[2]]), 3)),
  bold: ["A2:D2", "F1:H1"], center: ["A2:D2", "A3:A" + last, "F1:H1"], size: { A1: 14 }, fill: { "F2:F3": thu ? "#aab8e0" : "#f5b9a1" }, comma: ["D3:D" + last, "H2:H3"], vary: "B3:B" + last }; };
const TL_THU_SPEC = tlSpec("thu", TL_THU), TL_CHI_SPEC = tlSpec("chi", TL_CHI);

// Tổng kết: thử thách SUMIF dạng không có sum_range
const CHI_THU_THACH = chiSpec(null, { F12: "Tổng các khoản > 1000:" }, 12);

// ---- Cú pháp SUMIF (vẽ lại) ----
const CU_PHAP_HTML = `<div style="text-align:center;margin:6px 0 14px">
  <div style="display:inline-block;font-family:Consolas,'Courier New',monospace;font-size:1.75rem;font-weight:800;background:#fff;border:3px solid #6d28d9;border-radius:16px;padding:10px 20px">
    <span style="color:#6d28d9">=SUMIF(</span><span style="background:#dbeafe;color:#1d4ed8;padding:0 10px;border-radius:10px">range</span><span style="color:#6d28d9">, </span><span style="background:#ffedd5;color:#c2410c;padding:0 10px;border-radius:10px">criteria</span><span style="color:#6d28d9">, </span><span style="background:#ede9fe;color:#6d28d9;padding:0 10px;border-radius:10px;border:2px dashed #8b5cf6">[sum_range]</span><span style="color:#6d28d9">)</span></div></div>
<div style="display:flex;flex-wrap:wrap;gap:12px;justify-content:center">
  <div style="flex:1 1 230px;max-width:340px;border:2px solid #1d4ed8;border-radius:14px;padding:10px 14px;background:#eff6ff"><b style="color:#1d4ed8;font-size:1.1rem">range</b> — phạm vi chứa các giá trị cần kiểm tra, hoặc tính tổng các giá trị nếu không có sum_range.<br><span style="color:#475569">Ví dụ: <code>$B$3:$B$10</code></span></div>
  <div style="flex:1 1 230px;max-width:340px;border:2px solid #c2410c;border-radius:14px;padding:10px 14px;background:#fff7ed"><b style="color:#c2410c;font-size:1.1rem">criteria</b> — điều kiện kiểm tra.<br><span style="color:#475569">Ví dụ: <code>"Ở"</code> · <code>F2</code> · <code>"&gt;5"</code></span></div>
  <div style="flex:1 1 230px;max-width:340px;border:2px dashed #6d28d9;border-radius:14px;padding:10px 14px;background:#f5f3ff"><b style="color:#6d28d9;font-size:1.1rem">sum_range</b> (tuỳ chọn) — phạm vi chứa các giá trị cần tính tổng; bỏ qua thì tính tổng các ô trong range thoả mãn điều kiện.<br><span style="color:#475569">Ví dụ: <code>$D$3:$D$10</code></span></div>
</div>`;
// Minh hoạ: SUMIF kiểm tra cột B, cộng cột D ở cùng hàng
const CONG_HTML = `<div style="display:flex;flex-wrap:wrap;gap:18px;align-items:center;justify-content:center">
  <div style="border:2px solid #6d28d9;border-radius:12px;overflow:hidden;min-width:260px;background:#fff">
    <div style="display:flex;background:#ede9fe;font-weight:800"><span style="flex:1;padding:4px 10px">range B3:B10</span><span style="width:110px;padding:4px 10px;text-align:right">sum_range D</span></div>
    ${CHI_ROWS.map((r) => `<div style="display:flex;border-top:1px solid #e2e8f0;${r[1] === "Ở" ? "background:#bbf7d0;font-weight:800" : "color:#94a3b8"}"><span style="flex:1;padding:3px 10px">${r[1]}${r[1] === "Ở" ? " ✔" : ""}</span><span style="width:110px;padding:3px 10px;text-align:right">${r[3].toLocaleString("en-US")}</span></div>`).join("")}
  </div>
  <div style="font-size:2.4rem">➜</div>
  <div style="text-align:center"><div style="border:2px solid #c2410c;border-radius:12px;padding:8px 16px;background:#fff7ed;font-weight:800">criteria: “Ở”</div>
    <div style="margin-top:10px;font-size:1.25rem">800 + 120 = <b style="font-size:2rem;color:#6d28d9">920</b></div>
    <div style="font-family:Consolas,monospace;margin-top:6px">=SUMIF(B3:B10,"Ở",D3:D10)</div></div>
</div>`;

const LESSON = {
  meta: {
    subject: "Tin học", grade: "9", book: "Kết nối tri thức với cuộc sống",
    title: "Bài 11a: Sử dụng hàm SUMIF", unit: "Chủ đề 4a — Sử dụng bảng tính điện tử nâng cao",
    pages: "45–47", durationMinutes: 90,
  },
  objectives: {
    knowledge: [
      "Biết sử dụng hàm tính tổng theo điều kiện SUMIF để giải quyết bài toán quản lí tài chính gia đình.",
      "Biết dùng hàm SUMIF để cộng các dữ liệu phù hợp với yêu cầu; biết sắp xếp, lưu trữ dữ liệu trong bảng tính để dễ tổng hợp, kiểm tra.",
    ],
    competencies: [
      "Tự chủ và tự học; giao tiếp và hợp tác; giải quyết vấn đề và sáng tạo (lựa chọn hàm, tổ chức dữ liệu, tổng hợp thông tin).",
      "Năng lực số 5.2.TC2b: xác định bài toán tính tổng theo điều kiện; nhập đúng cú pháp SUMIF, chọn đúng range, criteria, sum_range; dùng địa chỉ tuyệt đối khi sao chép.",
      "Năng lực số 1.3.TC2a: sắp xếp dữ liệu đúng cấu trúc hàng – cột, tiêu đề rõ ràng; lưu trữ tệp đúng quy ước; điều chỉnh công thức khi bổ sung dữ liệu.",
      "Năng lực AI 9.A2.2: giải thích vấn đề “thiên vị”, “thành kiến” mà AI có thể gây ra do dữ liệu đầu vào không cân bằng.",
    ],
    qualities: ["Chăm chỉ, trung thực, trách nhiệm khi làm việc với dữ liệu cá nhân và dữ liệu gia đình."],
  },
  coreKnowledge: [
    "Hàm SUMIF tính tổng giá trị của những ô thoả mãn một điều kiện nào đó.",
    "Công thức: =SUMIF(range, criteria, [sum_range]) — range: phạm vi chứa các giá trị cần kiểm tra (hoặc tính tổng nếu không có sum_range); criteria: điều kiện kiểm tra; sum_range (tuỳ chọn): phạm vi chứa các giá trị cần tính tổng.",
    "Hai dạng: =SUMIF(range, criteria) cộng chính các ô của range thoả mãn điều kiện; =SUMIF(range, criteria, sum_range) cộng các ô tương ứng trong sum_range.",
    "Tổng tiền mỗi khoản chi: =SUMIF($B$3:$B$10,F2,$D$3:$D$10) — điều kiện là ô F2, các vùng dùng địa chỉ tuyệt đối để sao chép đúng.",
    "Bổ sung dữ liệu → điều chỉnh cả range và sum_range; dữ liệu phải nhập thống nhất (đúng tên khoản mục) để tổng hợp chính xác.",
  ],
  keywords: ["SUMIF", "range", "criteria", "sum_range", "Địa chỉ tuyệt đối"],
  settings: { basePoints: 100, useTimer: false, defaultTime: 60, sound: true, streakEnabled: true },

  activities: [
    /* =========================== TIẾT 1 =========================== */
    /* ===================== HĐ1: MỞ ĐẦU (5 phút) ===================== */
    {
      id: "mo-dau", name: "Mở đầu — Hộp quà may mắn 🎁", type: "giftbox",
      goal: "Ôn lại các hàm đã học (COUNTIF, SUM…) và nhận ra nhu cầu tính tổng theo điều kiện.",
      time: 300,
      task: "Cá nhân chọn hộp quà và trả lời câu hỏi ôn tập về bảng tính. Trả lời đúng thì mở quà!",
      intro: "6 hộp quà — chọn hộp → trả lời → đúng thì nhận quà 🎉",
      prizes: ["👏 Một tràng pháo tay", "⭐ Ngôi sao may mắn", "🎁 Quà bí mật từ thầy/cô", "🏅 Danh hiệu “Thủ quỹ nhí”", "🌟 Lời khen trước lớp", "🍀 Ngôi sao may mắn"],
      questions: [
        { question: "Trong các phương án sau đây, phương án nào là KHÔNG đúng?", type: "multiple-choice",
          options: ["Trong hộp thoại Data Validation, có thể thiết lập thông báo lỗi khi nhập dữ liệu không thoả mãn điều kiện.", "Nút lệnh Data Validation thuộc dải lệnh Formulas.", "Các giá trị số nên được xác thực khi nhập vào bảng tính để tránh lỗi khi tính toán.", "Tính năng Data Validation cho phép thiết lập chế độ nhập dữ liệu từ danh sách thả xuống."],
          answer: 1, explanation: "Nút lệnh Data Validation thuộc nhóm Data Tools của dải lệnh Data, không phải Formulas.", level: "nhan-biet", activity: "mo-dau" },
        { question: "Hàm COUNTIF đếm số ô tính trong vùng dữ liệu thoả mãn mấy điều kiện?", type: "multiple-choice",
          options: ["1", "2", "3", "4"],
          answer: 0, explanation: "COUNTIF có một tham số criteria — một điều kiện.", level: "nhan-biet", activity: "mo-dau" },
        { question: "Trong bảng tính điện tử, công thức hàm COUNTIF nào đúng?", type: "multiple-choice",
          options: ["COUNTIF(criteria,range)", "COUNTIF(criteria,range,[count_range])", "COUNTIF(range, criteria)", "COUNTIF(range, criteria, [count_range])"],
          answer: 2, explanation: "COUNTIF(range, criteria): vùng kiểm tra trước, điều kiện sau.", level: "nhan-biet", activity: "mo-dau" },
        { question: "Hàm COUNTIF được sử dụng để:", type: "multiple-choice",
          options: ["Tính toán dữ liệu cho bảng", "Thống kê cho một bảng dữ liệu", "So sánh dữ liệu trong bảng", "Thống kê có điều kiện cho một bảng dữ liệu"],
          answer: 3, explanation: "COUNTIF đếm theo điều kiện — thống kê có điều kiện.", level: "thong-hieu", activity: "mo-dau" },
        { question: "Công thức =SUM(D3:D10) trong trang tính Chi tiêu cho biết:", type: "multiple-choice",
          options: ["Số lần chi của khoản Ở", "Tổng số tiền của tất cả các lần chi", "Tổng số tiền của khoản Ở", "Số khoản chi lớn nhất"],
          answer: 1, explanation: "SUM cộng tất cả các số trong vùng D3:D10, không phân biệt khoản chi.", level: "thong-hieu", activity: "mo-dau" },
        { question: "Muốn biết tổng số tiền đã chi cho khoản Ở, dùng COUNTIF có được không?", type: "multiple-choice",
          options: ["Được, COUNTIF cộng các số tiền", "Không, COUNTIF chỉ đếm số ô; cần hàm tính tổng theo điều kiện", "Được, chỉ cần thêm dấu $", "Không, bảng tính không làm được việc này"],
          answer: 1, explanation: "COUNTIF cho biết số lần (2 lần), không cộng tiền. Bài này học hàm tính tổng theo điều kiện SUMIF.", level: "van-dung", activity: "mo-dau" },
      ],
    },

    /* ===================== HĐ2.1: HÀM SUMIF (15 phút) ===================== */
    {
      id: "hd1-tong-tien", name: "Hoạt động 1: Tổng hợp chi tiêu theo từng khoản 💰", type: "knowledge",
      goal: "Nhận biết bài toán tính tổng theo điều kiện: tổng tiền của từng khoản chi.",
      time: 360,
      task: "Hoạt động 1 (SGK tr.45), nhóm 3–4 bạn: quan sát trang tính Chi tiêu đã thêm cột Tổng tiền — con số 920 ở ô H2 mang ý nghĩa gì? Công thức ở H2 liên quan đến những dữ liệu nào trong vùng A3:D10?",
      sgkImage: "assets/sgk/hinh-11a-1.jpg",
      sheet: CHI_HD1,
      sandbox: Object.assign({}, CHI_HD1, { intro: "📊 Trang tính Chi tiêu đã bổ sung cột Tổng tiền (Hình 11a.1)." }),
      content: {
        heading: "💰 Con số 920 ở ô H2 từ đâu mà có?",
        revealLabel: "💡 Giải mã con số 920",
        blocks: [
          { kind: "html", value: CONG_HTML },
          { kind: "list", value: ["920 là tổng số tiền của khoản chi Ở (2 lần chi): cộng D3 (800) và D8 (120) — hai hàng có Khoản chi là Ở (B3, B8).", "Công thức H2 kiểm tra cột Khoản chi (B3:B10) và cộng các số tiền tương ứng ở cột Số tiền (D3:D10): =SUMIF(B3:B10,\"Ở\",D3:D10).", "Để tính tổng số tiền theo từng khoản mục, em sử dụng hàm tính tổng theo điều kiện SUMIF."] },
        ],
      },
      questions: [
        { question: "Con số 920 ở ô H2 mang ý nghĩa gì?", type: "multiple-choice",
          options: ["Số lần chi của khoản Ở", "Tổng số tiền của tất cả các khoản chi", "Tổng số tiền đã chi cho khoản Ở", "Số tiền lớn nhất đã chi"],
          answer: 2, explanation: "H2 nằm ở hàng khoản Ở, cột Tổng tiền → tổng số tiền của khoản chi Ở = 920 (nghìn đồng).", level: "thong-hieu", activity: "hd1-tong-tien" },
        { type: "sheet", question: "920 = 800 + 120. Ô D3 chứa 800; bấm vào ô chứa 120 cũng thuộc khoản Ở.", answer: "D8",
          explanation: "Hàng 8: 26/8/23 — Ở — Tiền nước tháng 8 — 120.", level: "nhan-biet", activity: "hd1-tong-tien" },
        { question: "Công thức ở ô H2 liên quan đến những dữ liệu nào trong vùng A3:D10?", type: "multiple-choice",
          options: ["Chỉ cột Ngày (A3:A10)", "Cột Khoản chi (B3:B10) để kiểm tra điều kiện và cột Số tiền (D3:D10) để tính tổng", "Chỉ cột Nội dung (C3:C10)", "Cột Ngày và cột Nội dung"],
          answer: 1, explanation: "Kiểm tra ô nào ở B3:B10 là “Ở”, rồi cộng số tiền ở cùng hàng trong D3:D10.", level: "thong-hieu", activity: "hd1-tong-tien" },
      ],
    },
    {
      id: "ham-sumif", name: "Hàm SUMIF — cú pháp & hai dạng sử dụng (Bảng 11a.1) ➕", type: "knowledge",
      goal: "Hiểu cú pháp, ý nghĩa các tham số và hai dạng sử dụng của hàm SUMIF.",
      time: 540,
      task: "Đọc mục 1 (SGK tr.45–46), quan sát Bảng 11a.1; cho biết ý nghĩa các tham số trong =SUMIF(B3:B10,\"Ở\",D3:D10). Gõ thử hai ví dụ của Bảng 11a.1 vào ô tô vàng.",
      sgkImage: "assets/sgk/bang-11a-1.jpg",
      sandbox: Object.assign({}, MINI2, { intro: "🧪 Bảng tính thử (ví dụ 2 của Bảng 11a.1): gõ công thức vào D1, D2 để kiểm chứng." }),
      content: {
        heading: "➕ Hàm tính tổng theo điều kiện SUMIF",
        revealLabel: "📖 Cú pháp & Bảng 11a.1",
        blocks: [
          { kind: "html", value: CU_PHAP_HTML },
          { kind: "image", value: "assets/sgk/bang-11a-1.jpg", caption: "Bảng 11a.1. Ví dụ sử dụng hàm SUMIF" },
          { kind: "list", value: ["Dạng 1 — có sum_range: =SUMIF(A2:A5,\"Khoa\",B2:B5) kiểm tra A2:A5, cộng các ô tương ứng ở B2:B5.", "Dạng 2 — không có sum_range: =SUMIF(A1:A5,\">5\") cộng chính các ô trong A1:A5 lớn hơn 5.", "Điều kiện viết giống COUNTIF: \">5\", \"Khoa\" (trong ngoặc kép) hoặc địa chỉ ô (F2)."] },
          { kind: "text", value: "🤖 Mở rộng — hỏi AI thông minh: “Hãy giải thích sự khác nhau giữa range, criteria và sum_range trong hàm SUMIF”. Luôn kiểm chứng câu trả lời bằng cách nhập thử trên bảng tính." },
        ],
      },
      questions: [
        { question: "Công thức chung của hàm SUMIF là:", type: "multiple-choice",
          options: ["=SUMIF(criteria, range, [sum_range])", "=SUMIF(range, [sum_range], criteria)", "=SUMIF(range, criteria, [sum_range])", "=SUM(range, criteria)"],
          answer: 2, explanation: "=SUMIF(range, criteria, [sum_range]); dấu [ ] cho biết sum_range là tham số tuỳ chọn.", level: "nhan-biet", activity: "ham-sumif" },
        { question: "Trong công thức =SUMIF(B3:B10,\"Ở\",D3:D10), vùng D3:D10 là:", type: "multiple-choice",
          options: ["range — phạm vi chứa các giá trị cần kiểm tra", "criteria — điều kiện kiểm tra", "sum_range — phạm vi chứa các giá trị cần tính tổng", "Vùng chứa kết quả"],
          answer: 2, explanation: "B3:B10 là range (kiểm tra), \"Ở\" là criteria, D3:D10 là sum_range (cộng các số tiền).", level: "thong-hieu", activity: "ham-sumif" },
        { question: "Dạng 2 — D1: tính tổng các giá trị lớn hơn 5 trong vùng A1:A5.", type: "sheet", mode: "formula", target: "D1", answer: '=SUMIF(A1:A5,">5")', sheet: MINI1,
          explanation: "=SUMIF(A1:A5,\">5\") = 7 + 8 = 15 (số 5 không lớn hơn 5). Không có sum_range → cộng chính các ô của range.", hint: "Chỉ cần 2 tham số: range và criteria.", level: "van-dung", activity: "ham-sumif" },
        { question: "Dạng 1 — D1: tính tổng tiền mà Khoa đã chi.", type: "sheet", mode: "formula", target: "D1", answer: '=SUMIF(A2:A5,"Khoa",B2:B5)', sheet: MINI2,
          explanation: "=SUMIF(A2:A5,\"Khoa\",B2:B5) = 500,000 + 250,000 = 750,000.", hint: "range: cột Người chi A2:A5; criteria: \"Khoa\"; sum_range: cột Số tiền B2:B5.", level: "van-dung", activity: "ham-sumif" },
        { question: "Dự đoán: =SUMIF(A2:A5,\"Minh\",B2:B5) (tổng tiền Minh đã chi) bằng bao nhiêu? Gõ thử vào ô D2 của bảng tính thử phía trên để kiểm tra.", type: "multiple-choice",
          options: ["450,000", "530,200", "80,200", "1,280,200"],
          answer: 1, explanation: "Minh ở A3 và A5 → 450,000 + 80,200 = 530,200.", level: "van-dung", activity: "ham-sumif" },
      ],
      remember: ["Hàm SUMIF tính tổng giá trị của những ô thoả mãn một điều kiện nào đó.", "Công thức: =SUMIF(range, criteria, [sum_range]) — sum_range bị bỏ qua thì tính tổng các ô trong range thoả mãn điều kiện."],
    },
    {
      id: "tham-so", name: "Ghép tham số, ví dụ với ý nghĩa 🧩", type: "matching",
      goal: "Nhớ ý nghĩa ba tham số và hai dạng sử dụng hàm SUMIF.",
      time: 180,
      task: "Ghép mỗi tham số / công thức với ý nghĩa đúng. Làm hết rồi bấm Nộp bài.",
      sgkImage: "assets/sgk/bang-11a-1.jpg",
      pairs: [
        { left: "range", right: "Phạm vi chứa các giá trị cần kiểm tra (hoặc tính tổng nếu không có sum_range)" },
        { left: "criteria", right: "Điều kiện kiểm tra" },
        { left: "sum_range (tuỳ chọn)", right: "Phạm vi chứa các giá trị cần tính tổng" },
        { left: '=SUMIF(A1:A5,">5")', right: "Tổng các giá trị lớn hơn 5 trong chính vùng A1:A5" },
        { left: '=SUMIF(A2:A5,"Khoa",B2:B5)', right: "Tổng các giá trị trong B2:B5 ứng với các ô trong A2:A5 có giá trị là Khoa" },
      ],
      explanation: "range: kiểm tra · criteria: điều kiện · sum_range: vùng cộng. Không có sum_range thì cộng chính các ô của range.",
    },
    {
      id: "countif-hay-sumif", name: "Trò chơi: COUNTIF hay SUMIF? 🎯", type: "dragdrop",
      goal: "Phân biệt bài toán đếm theo điều kiện và tính tổng theo điều kiện.",
      time: 180,
      task: "Xếp mỗi câu hỏi vào hàm phù hợp để trả lời. Xếp hết rồi bấm Nộp bài.",
      groups: ["🔢 COUNTIF — đếm", "➕ SUMIF — tính tổng"],
      items: [
        { text: "Khoản Ở đã được chi bao nhiêu lần?", group: 0 },
        { text: "Tổng số tiền đã chi cho khoản Ăn là bao nhiêu?", group: 1 },
        { text: "Có bao nhiêu bạn đạt điểm từ 8 trở lên?", group: 0 },
        { text: "Tổng thu nhập từ Làm thêm trong tháng 8?", group: 1 },
        { text: "Có bao nhiêu khoản chi trên 500 nghìn đồng?", group: 0 },
        { text: "Tổng tiền các khoản chi trên 500 nghìn đồng?", group: 1 },
        { text: "Có bao nhiêu bạn chọn trường A?", group: 0 },
        { text: "Tổng số tiền nhóm đã chi cho In tài liệu?", group: 1 },
      ],
      explanation: "Hỏi “bao nhiêu lần / bao nhiêu bạn / bao nhiêu khoản” → đếm (COUNTIF). Hỏi “tổng số tiền / tổng thu nhập” → tính tổng (SUMIF).",
    },
    {
      id: "dia-chi-tuyet-doi", name: "Từ \"Ở\" đến F2 và địa chỉ tuyệt đối 🔒", type: "knowledge",
      goal: "Hiểu vì sao điều kiện dùng ô F2 và các vùng dùng địa chỉ tuyệt đối để sao chép công thức.",
      time: 420,
      task: "Làm thí nghiệm trên trang tính Chi tiêu mô phỏng: Thử 1 công thức không có $, Thử 2 có $ — kéo nút điền ■ từ H2 xuống H10 và so sánh kết quả.",
      sgkImage: "assets/sgk/hinh-11a-2.jpg",
      sandbox: Object.assign({}, CHI_SPEC, { intro: "🧪 Thử 1: gõ =SUMIF(B3:B10,F2,D3:D10) vào H2, kéo ■ xuống H10, bấm H5 xem công thức. Thử 2: sửa H2 thành =SUMIF($B$3:$B$10,F2,$D$3:$D$10), kéo lại và so sánh." }),
      content: {
        heading: "🔒 Công thức sao chép được cho mọi khoản chi",
        revealLabel: "🖼️ Hình 11a.2 & giải thích",
        blocks: [
          { kind: "image", value: "assets/sgk/hinh-11a-2.jpg", caption: "Hình 11a.2. Công thức tính tổng số tiền của khoản chi Ở" },
          { kind: "list", value: ["Tên khoản chi Ở đã lưu ở ô F2 → điều kiện kiểm tra đổi thành F2 (sao chép xuống thành F3, F4…).", "Các vùng trong công thức phải là địa chỉ tuyệt đối: =SUMIF($B$3:$B$10,F2,$D$3:$D$10).", "Không có $: range và sum_range bị dời theo (H5 → B6:B13, D6:D13) nên bỏ sót dữ liệu → kết quả sai."] },
        ],
      },
      questions: [
        { question: "Vì sao nên thay điều kiện \"Ở\" bằng ô F2?", type: "multiple-choice",
          options: ["Vì công thức sẽ ngắn hơn", "Vì tên khoản chi Ở đã lưu ở ô F2; sao chép xuống điều kiện tự đổi thành F3, F4… cho từng khoản", "Vì hàm SUMIF không nhận chữ trong ngoặc kép", "Vì ô F2 chứa số tiền"],
          answer: 1, explanation: "Dùng địa chỉ ô làm điều kiện để một công thức sao chép được cho mọi khoản chi.", level: "thong-hieu", activity: "dia-chi-tuyet-doi" },
        { question: "Thử 1: sao chép =SUMIF(B3:B10,F2,D3:D10) (không có $) từ H2 xuống. Ô H5 (Học tập) cho kết quả bao nhiêu?", type: "multiple-choice",
          options: ["2,200", "0", "920", "Báo lỗi"],
          answer: 1, explanation: "H5 trở thành =SUMIF(B6:B13,F5,D6:D13): vùng không còn hàng 5 (Học tập, 2,200) → 0 — sai.", level: "van-dung", activity: "dia-chi-tuyet-doi" },
        { question: "Công thức đúng ở ô H5 sau khi sao chép từ H2 là:", type: "multiple-choice",
          options: ["=SUMIF($B$3:$B$10,F2,$D$3:$D$10)", "=SUMIF($B$6:$B$13,F5,$D$6:$D$13)", "=SUMIF($B$3:$B$10,F5,$D$3:$D$10)", "=SUMIF(B3:B10,F5,D3:D10)"],
          answer: 2, explanation: "Địa chỉ tuyệt đối giữ nguyên; F2 (tương đối) dời 3 hàng thành F5.", level: "van-dung", activity: "dia-chi-tuyet-doi" },
      ],
      remember: ["Tổng tiền mỗi khoản chi: =SUMIF($B$3:$B$10,F2,$D$3:$D$10) — điều kiện là ô F2, các vùng dùng địa chỉ tuyệt đối."],
    },

    /* =========================== TIẾT 2 =========================== */
    /* ===================== HĐ2.2: THỰC HÀNH SỬ DỤNG HÀM SUMIF (55 phút) ===================== */
    {
      id: "cac-buoc", name: "Nhiệm vụ — Sắp xếp các bước thực hành 🔢", type: "ordering",
      goal: "Nắm quy trình tính tổng số tiền của mỗi khoản chi bằng SUMIF.",
      time: 150,
      task: "Sắp xếp các bước tính tổng số tiền của mỗi khoản chi trong trang tính Chi tiêu (SGK tr.47). Xếp xong bấm Nộp bài.",
      sgkImage: "assets/sgk/sgk-trang47.jpg",
      steps: [
        "Mở tệp bảng tính TaiChinhGiaDinh.xlsx, chọn trang tính Chi tiêu",
        "Tại ô H2, nhập công thức =SUMIF($B$3:$B$10,F2,$D$3:$D$10)",
        "Sao chép công thức trong ô H2 sang các ô từ H3 đến H10",
        "Kiểm tra kết quả",
        "Lưu tệp",
      ],
      explanation: "Mở tệp, chọn trang Chi tiêu → nhập công thức ở H2 → sao chép sang H3:H10 → kiểm tra → lưu.",
    },
    {
      id: "thuc-hanh-chi", name: "Thực hành a) Tổng tiền của mỗi khoản chi 🧾", type: "knowledge",
      goal: "Dùng SUMIF tính tổng số tiền của mỗi khoản chi trong trang tính Chi tiêu.",
      time: 600,
      task: "Trên Excel: mở TaiChinhGiaDinh.xlsx, trang Chi tiêu; tại H2 nhập =SUMIF($B$3:$B$10,F2,$D$3:$D$10), sao chép sang H3:H10, lưu tệp. Làm trước trên bảng mô phỏng và trả lời câu hỏi.",
      sgkImage: "assets/sgk/hinh-11a-2.jpg",
      sheet: CHI_SPEC,
      questions: [
        { question: "Tại ô H2 nhập công thức tính tổng số tiền của khoản Ở (dùng ô F2 làm điều kiện), rồi sao chép sang H3:H10.", type: "sheet", mode: "formula", target: "H2:H10", answer: "=SUMIF($B$3:$B$10,F2,$D$3:$D$10)",
          explanation: "H2:H10 = 920 · 8,000 · 600 · 2,200 · 620 · 0 · 300 · 1,000 · 0 (như Hình 11a.1).",
          hint: "range $B$3:$B$10, criteria F2, sum_range $D$3:$D$10. Nhập H2 rồi kéo nút điền ■ xuống H10.", level: "van-dung", activity: "thuc-hanh-chi" },
        { question: "Khoản chi nào tốn nhiều tiền nhất trong tháng 8?", type: "multiple-choice",
          options: ["Học tập", "Ở", "Ăn", "Tiết kiệm"],
          answer: 2, explanation: "Ăn: 8,000 nghìn đồng — lớn nhất (Học tập 2,200; Tiết kiệm 1,000; Ở 920).", level: "thong-hieu", activity: "thuc-hanh-chi" },
        { question: "Để kiểm tra, tổng các ô H2:H10 phải bằng:", type: "multiple-choice",
          options: ["Tổng số lần chi G2:G10", "Tổng số tiền D3:D10 (13,640)", "Số tiền lớn nhất trong cột D", "920"],
          answer: 1, explanation: "Mỗi lần chi thuộc đúng một khoản → tổng theo khoản = tổng tất cả: 13,640 nghìn đồng.", level: "van-dung-cao", activity: "thuc-hanh-chi" },
        { question: "Một hàng ghi khoản chi là “Ăn uống” thay vì “Ăn” (tên trong cột F). Tổng tiền khoản Ăn ở cột H sẽ:", type: "multiple-choice",
          options: ["Vẫn đúng vì SUMIF tự hiểu", "Bị thiếu số tiền của hàng đó vì không khớp điều kiện “Ăn”", "Báo lỗi #VALUE!", "Bị nhân đôi"],
          answer: 1, explanation: "Điều kiện phải khớp đúng tên. Dữ liệu cần nhập thống nhất (dùng danh sách thả xuống — Bài 9a) để tổng hợp chính xác.", level: "van-dung", activity: "thuc-hanh-chi" },
      ],
      remember: ["Tổng tiền mỗi khoản chi: =SUMIF($B$3:$B$10,F2,$D$3:$D$10) rồi sao chép sang H3:H10.", "Dữ liệu phải đúng cột, đúng tên khoản mục thì SUMIF mới tổng hợp chính xác."],
    },
    {
      id: "thuc-hanh-thu", name: "Câu hỏi SGK & Thực hành b) Tổng tiền của mỗi khoản thu 💵", type: "knowledge",
      goal: "Xác định công thức ở H2 của trang Thu nhập; dùng SUMIF tính tổng tiền mỗi khoản thu.",
      time: 540,
      task: "Câu hỏi SGK tr.47 và thực hành b): trên Excel chọn trang Thu nhập (Hình 11a.3), tại H2 nhập =SUMIF($B$3:$B$8,F2,$D$3:$D$8), sao chép sang H3:H6; thêm dòng Tổng để kiểm tra; lưu tệp.",
      sgkImage: "assets/sgk/cau-hoi-tr47.jpg",
      sheet: THU_SPEC,
      questions: [
        { question: "Câu hỏi SGK: công thức cần nhập vào ô H2 của trang Thu nhập là:", type: "multiple-choice", sgkImage: "assets/sgk/hinh-11a-3.jpg",
          options: ["=SUMIF($B$3:$B$10,F2,$D$3:$D$10)", "=SUMIF($B$3:$B$8,F2,$D$3:$D$8)", "=COUNTIF($B$3:$B$8,F2)", "=SUMIF($D$3:$D$8,F2,$B$3:$B$8)"],
          answer: 1, explanation: "Dữ liệu thu ở hàng 3 đến 8: range $B$3:$B$8, criteria F2 (Lương), sum_range $D$3:$D$8.", level: "van-dung", activity: "thuc-hanh-thu" },
        { question: "Giá trị của ô H2 có ý nghĩa gì?", type: "multiple-choice",
          options: ["Số lần nhận Lương", "Tổng số tiền thu được từ khoản Lương (10,000 nghìn đồng)", "Tổng thu nhập của gia đình", "Số tiền lớn nhất"],
          answer: 1, explanation: "H2 = tổng tiền thu từ Lương = 10,000 nghìn đồng.", level: "thong-hieu", activity: "thuc-hanh-thu" },
        { question: "Tại H2 nhập công thức tính tổng tiền khoản thu Lương, rồi sao chép sang H3:H6.", type: "sheet", mode: "formula", target: "H2:H6", answer: "=SUMIF($B$3:$B$8,F2,$D$3:$D$8)",
          explanation: "Lương 10,000 · Thưởng 3,000 · Làm thêm 3,500 · Được cho/tặng 500 · Khác 500.", level: "van-dung", activity: "thuc-hanh-thu" },
        { question: "Kiểm tra (giáo án): tại H7 (dòng Tổng) nhập công thức tính tổng thu nhập từ các ô H2:H6.", type: "sheet", mode: "formula", target: "H7", answer: "=SUM(H2:H6)", sheet: THU_TONG,
          explanation: "=SUM(H2:H6) = 17,500 — bằng tổng cột Số tiền =SUM(D3:D8), chứng tỏ các công thức SUMIF đúng.", level: "van-dung", activity: "thuc-hanh-thu" },
      ],
    },

    /* ===================== HĐ3: LUYỆN TẬP (10 phút) ===================== */
    {
      id: "luyen-tap", name: "Luyện tập: Bổ sung dữ liệu, điều chỉnh công thức ➕", type: "knowledge",
      goal: "Điều chỉnh range và sum_range khi bổ sung dữ liệu để tổng tiền chính xác.",
      time: 540,
      task: "Luyện tập SGK tr.47: bổ sung thêm dòng dữ liệu vào cuối cả hai trang Thu nhập và Chi tiêu trên Excel, điều chỉnh công thức SUMIF ở cột H. Bảng mô phỏng đã thêm các dòng mới (tô vàng).",
      sgkImage: "assets/sgk/sgk-trang47.jpg",
      questions: [
        { question: "Chi tiêu: điều chỉnh công thức ở H2 cho đủ các hàng mới, rồi sao chép sang H3:H10.", type: "sheet", mode: "formula", target: "H2:H10", answer: "=SUMIF($B$3:$B$13,F2,$D$3:$D$13)", sheet: CHI_THEM,
          explanation: "=SUMIF($B$3:$B$13,F2,$D$3:$D$13): Ở 920 · Ăn 8,000 · Di chuyển 680 · Học tập 2,200 · Sức khoẻ 920 · Giải trí 150 · Quà tặng/Từ thiện 300 · Tiết kiệm 1,000 · Khác 0.",
          hint: "Sửa cả range và sum_range đến hàng 13.", level: "van-dung", activity: "luyen-tap" },
        { question: "Chi tiêu: trước khi sửa, công thức cũ =SUMIF($B$3:$B$10,F2,$D$3:$D$10), cho ô H7 (Giải trí) kết quả bao nhiêu?", type: "multiple-choice",
          options: ["0 — sai, vì vùng cũ không có hàng mới", "150 — đúng", "300", "Báo lỗi"],
          answer: 0, explanation: "Khoản Giải trí mới ở hàng 12, ngoài vùng cũ → 0 (đúng phải là 150).", level: "thong-hieu", activity: "luyen-tap" },
        { question: "Thu nhập (thêm 2 hàng): điều chỉnh công thức ở H2, rồi sao chép sang H3:H6.", type: "sheet", mode: "formula", target: "H2:H6", answer: "=SUMIF($B$3:$B$10,F2,$D$3:$D$10)", sheet: THU_THEM,
          explanation: "=SUMIF($B$3:$B$10,F2,$D$3:$D$10): Lương 10,000 · Thưởng 4,000 · Làm thêm 4,300 · Được cho/tặng 500 · Khác 500.", level: "van-dung", activity: "luyen-tap" },
        { question: "Một bạn nhờ AI nhận xét chi tiêu nhưng chỉ nhập dữ liệu của tuần có sinh nhật bà (nhiều khoản Quà tặng). AI kết luận “gia đình chi quá nhiều cho quà tặng”. Vì sao kết luận này đáng nghi?", type: "multiple-choice",
          options: ["Vì AI luôn trả lời sai", "Vì dữ liệu đầu vào không cân bằng, không đại diện cho cả tháng nên kết quả bị thiên lệch", "Vì bảng tính không có hàm SUMIF", "Vì quà tặng không phải khoản chi"],
          answer: 1, explanation: "AI chỉ dựa trên dữ liệu được cung cấp. Dữ liệu lệch (chỉ một tuần đặc biệt) dẫn đến kết luận thiên vị. Cần dữ liệu đầy đủ, cân bằng và tự kiểm chứng.", level: "van-dung-cao", activity: "luyen-tap" },
      ],
    },
    {
      id: "tu-kiem-tra", name: "Phiếu tự kiểm tra tệp TaiChinhGiaDinh.xlsx 📋", type: "checklist",
      goal: "Tự đánh giá mức độ hoàn thành sản phẩm thực hành trên Excel.",
      time: 180,
      task: "Đối chiếu tệp TaiChinhGiaDinh.xlsx trên Excel, tick từng việc vào cột Đã làm hoặc Chưa làm, ghi lỗi thường gặp rồi gửi cho thầy/cô.",
      columns: ["✅ Đã làm", "⏳ Chưa làm"],
      sections: [
        { title: "🧾 TRANG TÍNH CHI TIÊU", items: [
          "Thêm cột Tổng tiền (nghìn đồng) ở cột H",
          "H2 = SUMIF($B$3:$B$10,F2,$D$3:$D$10), sao chép đến H10",
          "Tổng cột H bằng tổng cột Số tiền",
        ] },
        { title: "💵 TRANG TÍNH THU NHẬP", items: [
          "H2 = SUMIF($B$3:$B$8,F2,$D$3:$D$8), sao chép đến H6",
          "Có dòng Tổng để kiểm tra kết quả",
        ] },
        { title: "➕ LUYỆN TẬP", items: [
          "Bổ sung dòng dữ liệu vào cuối cả hai trang tính",
          "Điều chỉnh cả range và sum_range trong công thức",
          "Lưu tệp đúng tên, đúng vị trí",
        ] },
      ],
      note: "Em hay mắc lỗi gì khi dùng hàm SUMIF? Em đã khắc phục thế nào?",
      modelAnswer: [
        "Lỗi thường gặp: quên dấu $ nên sao chép bị sai; đảo vị trí range và sum_range; chọn sum_range lệch hàng với range; thêm dữ liệu nhưng chỉ sửa range, quên sum_range; tên khoản mục gõ không thống nhất.",
        "Khắc phục: bấm vào ô kiểm tra công thức, sửa vùng; so sánh tổng cột H với tổng cột Số tiền; dùng danh sách thả xuống để nhập tên khoản mục.",
      ],
    },

    /* ===================== HĐ4: VẬN DỤNG (5 phút + ở nhà) ===================== */
    {
      id: "van-dung", name: "Vận dụng: Kinh phí Triển lãm tin học 🏛️", type: "knowledge",
      goal: "Vận dụng SUMIF tính tổng các khoản thu, chi của dự án Triển lãm tin học.",
      time: 360,
      task: "Mở KinhPhiTrienLam.xlsx (Vận dụng Bài 10a), dùng SUMIF tính tổng tiền của mỗi khoản thu, khoản chi; lưu tệp. Làm trước trên bảng mô phỏng (dữ liệu minh hoạ), hoàn thiện ở nhà và nộp trước buổi học sau.",
      sgkImage: "assets/sgk/sgk-trang47.jpg",
      questions: [
        { question: "Trang Các khoản thu: tại H2 nhập công thức tính tổng tiền khoản Quỹ, rồi sao chép sang H3.", type: "sheet", mode: "formula", target: "H2:H3", answer: "=SUMIF($B$3:$B$11,F2,$D$3:$D$11)", sheet: TL_THU_SPEC,
          explanation: "Quỹ 2,360 · Tài trợ 2,840 (nghìn đồng) → tổng thu 5,200.", level: "van-dung", activity: "van-dung" },
        { question: "Trang Các khoản chi: tại H2 nhập công thức tính tổng tiền khoản Văn phòng phẩm, rồi sao chép sang H3.", type: "sheet", mode: "formula", target: "H2:H3", answer: "=SUMIF($B$3:$B$13,F2,$D$3:$D$13)", sheet: TL_CHI_SPEC,
          explanation: "Văn phòng phẩm 330 · In tài liệu 386 (nghìn đồng) → tổng chi 716.", level: "van-dung", activity: "van-dung" },
        { question: "Theo kết quả trên, kinh phí dự án còn lại (tổng thu − tổng chi) là bao nhiêu nghìn đồng?", type: "multiple-choice",
          options: ["716", "5,200", "4,484", "5,916"],
          answer: 2, explanation: "(2,360 + 2,840) − (330 + 386) = 5,200 − 716 = 4,484 nghìn đồng.", level: "van-dung-cao", activity: "van-dung" },
      ],
    },
    {
      id: "van-dung-nha", name: "Vận dụng — SUMIF trong cuộc sống 📝", type: "vandung",
      goal: "Liên hệ SUMIF với bài toán thực tế; tổ chức dữ liệu khoa học để tổng hợp chính xác.",
      time: 180,
      task: "Nhóm thảo luận, gửi câu trả lời cho thầy/cô; hoàn thiện KinhPhiTrienLam.xlsx ở nhà, gửi sản phẩm qua mail hoặc Zalo của thầy/cô. Tiết sau báo cáo.",
      intro: "Gửi câu trả lời cho thầy/cô rồi bấm để xem hướng chốt.",
      cases: [
        { question: "Nêu 2 tình huống thực tế khác có thể dùng hàm SUMIF. Viết công thức minh hoạ cho một tình huống.",
          answer: "Ví dụ: tổng tiền quỹ lớp đã chi cho Văn nghệ =SUMIF(B2:B30,\"Văn nghệ\",C2:C30); tổng số sách mỗi lớp quyên góp =SUMIF(A2:A50,\"9A\",C2:C50); tổng số điện gia đình dùng trong các tháng trên 200 kWh =SUMIF(B2:B13,\">200\")." },
        { question: "Vì sao cần sắp xếp, nhập dữ liệu thống nhất (đúng cột, đúng tên khoản mục) trước khi dùng SUMIF?",
          answer: "SUMIF so khớp điều kiện với từng ô và cộng ô tương ứng ở cùng hàng. Dữ liệu sai cột, lệch hàng hoặc tên khoản mục không thống nhất (Ăn / Ăn uống / an) sẽ bị bỏ sót → tổng sai. Nên dùng danh sách thả xuống (Data Validation), tiêu đề cột rõ ràng và kiểm tra tổng." },
      ],
    },

    /* ===================== TỔNG KẾT ===================== */
    {
      id: "tong-ket", name: "Tổng kết", type: "summary",
      task: "Cả lớp nhắc lại kiến thức trọng tâm và làm thử thách cuối. Dặn dò: hoàn thiện KinhPhiTrienLam.xlsx; xem trước Bài 12a “Sử dụng hàm IF”.",
      content: {
        learned: [
          "Hàm SUMIF tính tổng giá trị của những ô thoả mãn một điều kiện.",
          "Công thức: =SUMIF(range, criteria, [sum_range]).",
          "Không có sum_range → cộng chính các ô của range thoả mãn điều kiện.",
          "Tổng tiền mỗi khoản: =SUMIF($B$3:$B$10,F2,$D$3:$D$10), sao chép xuống.",
          "Thêm dữ liệu → sửa cả range và sum_range; dữ liệu nhập thống nhất.",
        ],
        challenge: [
          { question: "G12: tính tổng tiền của các lần chi có số tiền lớn hơn 1000 (nghìn đồng).", type: "sheet", mode: "formula", target: "G12", answer: '=SUMIF(D3:D10,">1000")', sheet: CHI_THU_THACH,
            explanation: "=SUMIF(D3:D10,\">1000\") = 2,200 + 8,000 = 10,200 (1,000 không lớn hơn 1000). Dạng không có sum_range.", level: "van-dung-cao", activity: "tong-ket" },
          { question: "Công thức nào tính tổng tiền đã chi cho khoản Ăn?", type: "multiple-choice",
            options: ["=COUNTIF(B3:B10,\"Ăn\")", "=SUMIF(D3:D10,\"Ăn\",B3:B10)", "=SUMIF(B3:B10,\"Ăn\",D3:D10)", "=SUM(B3:B10,\"Ăn\")"],
            answer: 2, explanation: "range là cột Khoản chi B3:B10, điều kiện \"Ăn\", sum_range là cột Số tiền D3:D10.", level: "van-dung", activity: "tong-ket" },
        ],
      },
    },
  ],
};

if (typeof module !== "undefined" && module.exports) module.exports = LESSON;
if (typeof window !== "undefined") window.LESSON = LESSON;
