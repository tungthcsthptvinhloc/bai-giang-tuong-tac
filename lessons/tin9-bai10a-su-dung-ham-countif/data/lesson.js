/* ============================================================================
 * BÀI 10a — SỬ DỤNG HÀM COUNTIF  (Tin học 9 — Kết nối tri thức)
 * Chủ đề 4 (lựa chọn a): Sử dụng bảng tính điện tử nâng cao — dự án Quản lí tài chính gia đình.
 * Bám sát SGK trang 41–44 + Kế hoạch bài dạy (2 tiết) của giáo viên.
 * Chỉ sửa file này để đổi nội dung. Engine app.js không cần sửa.
 * Bảng tính mô phỏng TÍNH ĐƯỢC HÀM COUNTIF; HS gõ công thức, kéo nút điền ■ để sao chép như Excel.
 * sheet.vary = vùng dữ liệu chữ được xáo lại khi chấm (công thức chọn sai vùng sẽ bị phát hiện).
 * ==========================================================================*/

// ---- Khoản mục thu, chi ----
const KHOAN_THU = ["Lương", "Thưởng", "Làm thêm", "Được cho/tặng", "Khác"];
const KHOAN_CHI = ["Ở", "Ăn", "Di chuyển", "Học tập", "Sức khoẻ", "Giải trí", "Quà tặng/Từ thiện", "Tiết kiệm", "Khác"];
const listCells = (col, items, from) => { const o = {}; items.forEach((t, i) => { o[col + (i + (from || 2))] = t; }); return o; };
const rowsOf = (list, from) => { const o = {}; list.forEach((r, i) => { const n = i + from; ["A", "B", "C", "D"].forEach((c, k) => { if (r[k] != null && r[k] !== "") o[c + n] = String(r[k]); }); }); return o; };

// Trang tính Chi tiêu (Hình 10a.1)
const CHI_ROWS = [
  ["14/8/23", "Ở", "Tiền điện tháng 8", 800], ["14/8/23", "Sức khoẻ", "Mua thuốc", 620], ["15/8/23", "Học tập", "Học phí tháng 8", 2200],
  ["20/8/23", "Quà tặng/Từ thiện", "Quà tặng", 300], ["22/8/23", "Di chuyển", "Gửi xe, xăng xe", 600], ["26/8/23", "Ở", "Tiền nước tháng 8", 120],
  ["26/8/23", "Tiết kiệm", "Tiết kiệm tháng 8", 1000], ["30/8/23", "Ăn", "Tiền ăn tháng 8", 8000],
];
const chiSpec = (extraRows, extraCells, rows) => ({ title: "TaiChinhGiaDinh.xlsx", sheets: ["Chi tiêu", "Thu nhập"], cols: 7, rows: rows || 10 + (extraRows || []).length,
  widths: { A: 0.95, B: 1.55, C: 1.6, D: 1.5, E: 0.25, F: 1.55, G: 1.05 },
  cells: Object.assign({ A1: "Chi tiêu", A2: "Ngày", B2: "Khoản chi", C2: "Nội dung", D2: "Số tiền (nghìn đồng)", F1: "Khoản chi", G1: "Số lần chi" },
    rowsOf(CHI_ROWS.concat(extraRows || []), 3), listCells("F", KHOAN_CHI), extraCells || {}),
  bold: ["A2:D2", "F1:G1"], center: ["A2:D2", "A3:A" + (10 + (extraRows || []).length), "F1:G1"], size: { A1: 16 }, fill: Object.assign({ "F2:F10": "#f5b9a1" }, (extraRows || []).length ? { ["A11:D" + (10 + extraRows.length)]: "#fef9c3" } : {}),
  comma: ["D3:D" + (10 + (extraRows || []).length)], vary: "B3:B" + (10 + (extraRows || []).length) });
const CHI_SPEC = chiSpec();
const CHI_HOI = chiSpec(null, listCells("G", KHOAN_CHI.map(() => "?")));        // Hình 10a.1 (cột G còn dấu ?)
const THEM_CHI = [["31/8/23", "Sức khoẻ", "Khám răng", 300], ["31/8/23", "Giải trí", "Xem phim", 150], ["31/8/23", "Di chuyển", "Sửa xe đạp", 80]];
const CHI_THEM = chiSpec(THEM_CHI);                                               // Luyện tập 1: thêm 3 hàng (tô vàng)

// Trang tính Thu nhập (Hình 10a.3)
const THU_ROWS = [
  ["13/8/23", "Lương", "Lương tháng 8", 10000], ["15/8/23", "Làm thêm", "Bán hàng trực tuyến", 1500], ["18/8/23", "Được cho/tặng", "Người thân tặng", 500],
  ["25/8/23", "Thưởng", "Thưởng tháng 8", 3000], ["29/8/23", "Khác", "Tiết kiệm tiền đi lại", 500], ["30/8/23", "Làm thêm", "Làm thêm tháng 8", 2000],
];
const THU_SPEC = { title: "TaiChinhGiaDinh.xlsx", sheets: ["Thu nhập", "Chi tiêu"], cols: 7, rows: 8,
  widths: { A: 0.95, B: 1.45, C: 1.8, D: 1.5, E: 0.25, F: 1.4, G: 1.05 },
  cells: Object.assign({ A1: "Thu nhập", A2: "Ngày", B2: "Khoản thu", C2: "Nội dung", D2: "Số tiền (nghìn đồng)", F1: "Khoản thu", G1: "Số lần thu" }, rowsOf(THU_ROWS, 3), listCells("F", KHOAN_THU)),
  bold: ["A2:D2", "F1:G1"], center: ["A2:D2", "A3:A8", "F1:G1"], size: { A1: 16 }, fill: { "F2:F6": "#aab8e0" }, comma: ["D3:D8"], vary: "B3:B8" };

// Bảng 10a.1 — lưới nhỏ để thử các ví dụ (vùng A1:A4, ô điều kiện D2)
const MINI_SPEC = { title: "ViDu_COUNTIF.xlsx", cols: 6, rows: 5, widths: { A: 1.1, B: 0.35, C: 0.35, D: 1.1, E: 1.9, F: 1.1 },
  cells: { A1: "150", A2: "Yes", A3: "Yellow", A4: "Yes", D1: "Ô mẫu D2", D2: "Yellow", E1: "Yêu cầu đếm", F1: "Kết quả",
    E2: "Số lớn hơn 100", E3: "Chữ Yes", E4: "Bắt đầu bằng Y", E5: "Giống ô D2" },
  bold: ["D1", "E1:F1"], fill: { "A1:A4": "#dbeafe", D2: "#ffedd5" }, center: ["D1:D2", "E1:F1"], vary: ["A1:A4", "D2"] };

// Bảng điểm lớp 9A (giáo án: BangDiem_HS.xlsx; tên học sinh hư cấu)
const HS = [
  ["Nguyễn Minh An", 8.5, "Nam"], ["Trần Thu Hà", 9.1, "Nữ"], ["Lê Quốc Bảo", 6.8, "Nam"], ["Phạm Ngọc Diệp", 7.9, "Nữ"], ["Hoàng Gia Huy", 4.6, "Nam"],
  ["Vũ Khánh Linh", 8, "Nữ"], ["Đặng Tuấn Kiệt", 5.5, "Nam"], ["Bùi Phương Mai", 7.2, "Nữ"], ["Đỗ Đức Nam", 3.9, "Nam"], ["Ngô Bảo Ngọc", 8.8, "Nữ"],
  ["Dương Minh Quân", 6.5, "Nam"], ["Lý Thanh Tâm", 9.4, "Nữ"], ["Phan Hữu Thắng", 4.8, "Nam"], ["Mai Anh Thư", 7.6, "Nữ"], ["Trịnh Hoàng Việt", 8.2, "Nam"],
];
const hsCells = () => { const o = { A1: "Họ và tên", B1: "Điểm TB", C1: "Giới tính" }; HS.forEach((h, i) => { o["A" + (i + 2)] = h[0]; o["B" + (i + 2)] = String(h[1]); o["C" + (i + 2)] = h[2]; }); return o; };
const BD_MO_DAU = { title: "BangDiem_HS.xlsx", sheets: ["Lớp 9A"], cols: 3, rows: 16, widths: { A: 2.2, B: 1, C: 1 },
  cells: hsCells(), bold: ["A1:C1"], fill: { "A1:C1": "#bbf7d0" }, center: ["A1:C1", "B2:C16"] };
const BD_SPEC = { title: "BangDiem_HS.xlsx", sheets: ["Lớp 9A"], cols: 3, rows: 21, widths: { A: 2.6, B: 1, C: 1 },
  cells: Object.assign(hsCells(), { A18: "Số HS giỏi (điểm ≥ 8)", A19: "Số HS yếu (điểm < 5)", A20: "Số HS nữ", A21: "Số HS loại Khá (Mở rộng)" }),
  bold: ["A1:C1", "A18:A21"], fill: { "A1:C1": "#bbf7d0", "A18:B20": "#fef3c7", "A21:B21": "#ede9fe" }, center: ["A1:C1", "B2:C16"], vary: "C2:C16" };

// Luyện tập 2: Khảo sát chọn trường THPT (Hình 10a.6)
const KS_TRUONG = ["A", "B", "C", "D", "A", "C", "B", "D", "C", "A"];
const KS_SPEC = { title: "KhaoSat_TruongTHPT.xlsx", cols: 5, rows: 13, widths: { A: 1.2, B: 1.3, C: 0.5, D: 1.3, E: 1.2 },
  cells: Object.assign({ A1: "Khảo sát chọn trường THPT", A3: "Mã số HS", B3: "Tên trường", D3: "Thống kê", D4: "Tên trường", E4: "Số lượng", D5: "A", D6: "B", D7: "C", D8: "D" },
    ...KS_TRUONG.map((t, i) => ({ ["A" + (i + 4)]: "HS" + String(i + 1).padStart(2, "0"), ["B" + (i + 4)]: t }))),
  bold: ["A1", "D3"], fill: { "A3:B3": "#bfdbfe", "D4:E4": "#bfdbfe" }, center: ["A3:B13", "D3:E8"], vary: "B4:B13" };

// Vận dụng: KinhPhiTrienLam.xlsx (Bài 9a) — dữ liệu minh hoạ theo giáo án
const TL_THU = [["Quỹ", "Quỹ lớp", 500], ["Tài trợ", "Hội cha mẹ học sinh", 600], ["Tài trợ", "Cựu học sinh", 600], ["Quỹ", "Quỹ Đoàn", 400], ["Tài trợ", "Nhà sách", 740],
  ["Tài trợ", "Câu lạc bộ Tin học", 400], ["Tài trợ", "Phụ huynh", 500], ["Quỹ", "Quỹ khối 9", 960], ["Quỹ", "Quỹ lớp", 500]];
const TL_CHI = [["Văn phòng phẩm", "Giấy A0, bút dạ", 90], ["In tài liệu", "In áp phích", 75], ["In tài liệu", "In tờ rơi", 72], ["In tài liệu", "In phiếu khảo sát", 42],
  ["Văn phòng phẩm", "Băng dính, kéo", 53], ["In tài liệu", "In thẻ tên", 60], ["Văn phòng phẩm", "Bìa màu", 60], ["In tài liệu", "In giấy mời", 70],
  ["In tài liệu", "In bảng tên gian", 67], ["Văn phòng phẩm", "Ghim, kẹp", 70], ["Văn phòng phẩm", "Giấy màu", 57]];
const tlSpec = (kind, list) => ({ title: "KinhPhiTrienLam.xlsx", sheets: kind === "thu" ? ["Các khoản thu", "Các khoản chi"] : ["Các khoản chi", "Các khoản thu"], cols: 7, rows: list.length + 2,
  widths: { A: 0.95, B: 1.55, C: 1.75, D: 1.45, E: 0.25, F: 1.55, G: 1.05 },
  cells: Object.assign({ A1: kind === "thu" ? "Các khoản thu của Triển lãm tin học" : "Các khoản chi của Triển lãm tin học", A2: "Ngày", B2: kind === "thu" ? "Khoản thu" : "Khoản chi", C2: "Nội dung", D2: "Số tiền (nghìn đồng)",
    F1: kind === "thu" ? "Khoản thu" : "Khoản chi", G1: kind === "thu" ? "Số lần thu" : "Số lần chi" },
    kind === "thu" ? { F2: "Quỹ", F3: "Tài trợ" } : { F2: "Văn phòng phẩm", F3: "In tài liệu" },
    rowsOf(list.map((r, i) => [(i + 2) + "/11/23", r[0], r[1], r[2]]), 3)),
  bold: ["A2:D2", "F1:G1"], center: ["A2:D2", "A3:A" + (list.length + 2), "F1:G1"], size: { A1: 14 }, fill: { "F2:F3": kind === "thu" ? "#aab8e0" : "#f5b9a1" }, comma: ["D3:D" + (list.length + 2)], vary: "B3:B" + (list.length + 2) });
const TL_THU_SPEC = tlSpec("thu", TL_THU), TL_CHI_SPEC = tlSpec("chi", TL_CHI);

// Tổng kết: thử thách đếm theo điều kiện số
const CHI_THU_THACH = chiSpec(null, { F12: "Số khoản chi > 500:" }, 12);

// ---- Cú pháp COUNTIF (vẽ lại) ----
const CU_PHAP_HTML = `<div style="text-align:center;margin:6px 0 14px">
  <div style="display:inline-block;font-family:Consolas,'Courier New',monospace;font-size:2rem;font-weight:800;background:#fff;border:3px solid #15803d;border-radius:16px;padding:10px 22px">
    <span style="color:#15803d">=COUNTIF(</span><span style="background:#dbeafe;color:#1d4ed8;padding:0 12px;border-radius:10px">range</span><span style="color:#15803d">, </span><span style="background:#ffedd5;color:#c2410c;padding:0 12px;border-radius:10px">criteria</span><span style="color:#15803d">)</span></div></div>
<div style="display:flex;flex-wrap:wrap;gap:14px;justify-content:center">
  <div style="flex:1 1 260px;max-width:420px;border:2px solid #1d4ed8;border-radius:14px;padding:10px 14px;background:#eff6ff"><b style="color:#1d4ed8;font-size:1.15rem">range</b> — phạm vi chứa các ô tính cần kiểm tra để đếm.<br><span style="color:#475569">Ví dụ: <code>$B$3:$B$10</code> (cột Khoản chi)</span></div>
  <div style="flex:1 1 260px;max-width:420px;border:2px solid #c2410c;border-radius:14px;padding:10px 14px;background:#fff7ed"><b style="color:#c2410c;font-size:1.15rem">criteria</b> — điều kiện kiểm tra các ô tính trong phạm vi range.<br><span style="color:#475569">Ví dụ: <code>"&gt;100"</code> · <code>"Yes"</code> · <code>"Y*"</code> · <code>F2</code></span></div>
</div>`;
// Minh hoạ: COUNTIF "lướt" qua vùng B3:B10 và đếm các ô giống F2
const DEM_HTML = `<div style="display:flex;flex-wrap:wrap;gap:18px;align-items:center;justify-content:center">
  <div style="border:2px solid #1d4ed8;border-radius:12px;overflow:hidden;min-width:210px;background:#fff">
    <div style="background:#dbeafe;font-weight:800;text-align:center;padding:4px">range: B3:B10</div>
    ${CHI_ROWS.map((r) => `<div style="padding:3px 12px;border-top:1px solid #e2e8f0;${r[1] === "Ở" ? "background:#bbf7d0;font-weight:800" : ""}">${r[1]}${r[1] === "Ở" ? " ✔" : ""}</div>`).join("")}
  </div>
  <div style="font-size:2.4rem">➜</div>
  <div style="text-align:center"><div style="border:2px solid #c2410c;border-radius:12px;padding:8px 16px;background:#fff7ed;font-weight:800">criteria: F2 = “Ở”</div>
    <div style="margin-top:10px;font-size:1.25rem">Đếm được <b style="font-size:2rem;color:#15803d">2</b> ô</div>
    <div style="font-family:Consolas,monospace;margin-top:6px">=COUNTIF($B$3:$B$10,F2) → 2</div></div>
</div>`;

const LESSON = {
  meta: {
    subject: "Tin học", grade: "9", book: "Kết nối tri thức với cuộc sống",
    title: "Bài 10a: Sử dụng hàm COUNTIF", unit: "Chủ đề 4a — Sử dụng bảng tính điện tử nâng cao",
    pages: "41–44", durationMinutes: 90,
  },
  objectives: {
    knowledge: [
      "Hiểu cấu trúc và ý nghĩa của hàm COUNTIF trong phần mềm bảng tính.",
      "Sử dụng được hàm đếm theo điều kiện COUNTIF để đếm số ô trong vùng dữ liệu thoả mãn điều kiện, giải quyết bài toán thực tế về quản lí tài chính, thống kê kết quả học tập, khảo sát.",
    ],
    competencies: [
      "Tự chủ và tự học; giao tiếp và hợp tác (thảo luận, chia sẻ kết quả thống kê); giải quyết vấn đề và sáng tạo.",
      "Năng lực số 5.2.TC2b: xác định vùng dữ liệu và tiêu chí thống kê; dùng COUNTIF đếm theo giá trị số, văn bản hoặc biểu thức logic; kiểm tra lại kết quả.",
      "Năng lực số 5.3.TC2a: trình bày kết quả thống kê rõ ràng (đặt nhãn, định dạng); giải thích ý nghĩa số liệu trong ngữ cảnh thực tế.",
      "Năng lực AI 9.C3.2: nêu và giải thích một số cách thu thập dữ liệu (bảng hỏi, cảm biến…); dùng AI có trách nhiệm, kiểm chứng kết quả trên bảng tính.",
    ],
    qualities: ["Chăm chỉ, trung thực, trách nhiệm; cẩn thận kiểm tra cú pháp, phạm vi và điều kiện trong công thức."],
  },
  coreKnowledge: [
    "Hàm COUNTIF đếm số ô tính trong vùng dữ liệu (range) thoả mãn điều kiện (criteria).",
    "Công thức: =COUNTIF(range, criteria) — range: phạm vi chứa các ô tính cần kiểm tra để đếm; criteria: điều kiện kiểm tra các ô tính trong phạm vi range.",
    "Điều kiện có thể là số, chữ hoặc biểu thức so sánh đặt trong dấu ngoặc kép (\">100\", \"Yes\", \"Y*\"), hoặc là địa chỉ ô chứa điều kiện (D2, F2).",
    "Dùng địa chỉ tuyệt đối cho vùng range ($B$3:$B$10) để khi sao chép công thức, vùng kiểm tra không thay đổi; phần criteria (F2) là địa chỉ tương đối nên tự đổi thành F3, F4…",
    "Khi bổ sung dữ liệu, cần điều chỉnh vùng range trong công thức cho bao gồm các hàng mới.",
  ],
  keywords: ["COUNTIF", "range", "criteria", "$B$3:$B$10", "Sao chép công thức"],
  settings: { basePoints: 100, useTimer: false, defaultTime: 60, sound: true, streakEnabled: true },

  activities: [
    /* =========================== TIẾT 1 =========================== */
    /* ===================== HĐ1: MỞ ĐẦU (5 phút) ===================== */
    {
      id: "mo-dau", name: "Mở đầu — Đếm nhanh, đếm đúng! ⚡", type: "knowledge",
      goal: "Nhận ra nhu cầu thống kê dữ liệu có điều kiện và công cụ số phù hợp (hàm COUNTIF).",
      time: 300,
      task: "Nhóm đôi: quan sát bảng điểm lớp 9A, cho biết có bao nhiêu bạn đạt điểm TB từ 8 trở lên và nêu ý tưởng để máy tính tự đếm giúp.",
      sandbox: Object.assign({}, BD_MO_DAU, { intro: "📊 Bảng điểm lớp 9A (ví dụ minh hoạ, tên học sinh hư cấu)." }),
      content: {
        heading: "⚡ Bao nhiêu bạn đạt điểm TB từ 8 trở lên?",
        prompt: "Đếm thủ công 15 bạn thì được — nhưng nếu là 500 học sinh của cả khối, hay hàng trăm khoản chi tiêu của gia đình cả năm thì sao?",
        revealLabel: "💡 Máy tính đếm giúp ta thế nào?",
        blocks: [
          { kind: "text", value: "Bảng tính có hàm đếm theo điều kiện COUNTIF: chỉ cần cho biết vùng cần kiểm tra và điều kiện, máy tính đếm nhanh, chính xác; dữ liệu thay đổi thì kết quả tự cập nhật." },
          { kind: "list", value: ["Với dự án Quản lí tài chính gia đình, COUNTIF trả lời được: Mỗi khoản chi đã được chi bao nhiêu lần? Mỗi khoản thu đã được thu bao nhiêu lần?", "Các bài tiếp theo trả lời tiếp: tổng tiền của từng khoản thu, chi; thu nhập và chi tiêu đã cân đối chưa?"] },
        ],
      },
      questions: [
        { question: "Đếm thủ công: có bao nhiêu bạn lớp 9A đạt điểm TB từ 8 trở lên?", type: "short", answer: ["6", "sáu", "6 bạn"],
          explanation: "Các bạn đạt ≥ 8: An 8.5, Hà 9.1, Linh 8, Ngọc 8.8, Tâm 9.4, Việt 8.2 → 6 bạn (điểm 8 cũng tính vì “từ 8 trở lên”).", level: "nhan-biet", activity: "mo-dau" },
        { question: "Nếu bảng có 500 học sinh, cách nào nhanh và chính xác nhất để biết số bạn đạt điểm TB từ 8 trở lên?", type: "multiple-choice",
          options: ["Đếm lần lượt từng dòng rồi ghi ra giấy", "Dùng máy tính cầm tay cộng dần", "Dùng hàm đếm theo điều kiện của bảng tính", "Hỏi từng bạn trong khối"],
          answer: 2, explanation: "Hàm đếm theo điều kiện (COUNTIF) giúp máy tính tự đếm các ô thoả mãn điều kiện, nhanh, chính xác và tự cập nhật khi dữ liệu thay đổi.", level: "thong-hieu", activity: "mo-dau" },
      ],
      remember: ["Hàm COUNTIF giúp đếm số ô thoả mãn điều kiện — một kĩ năng số quan trọng trong xử lí dữ liệu."],
    },

    /* ===================== HĐ2.1: HÀM COUNTIF (20 phút) ===================== */
    {
      id: "hd1-khoan-chi", name: "Hoạt động 1: Các khoản chi được tổng hợp thế nào? 🧾", type: "knowledge",
      goal: "Tìm ý tưởng công thức đếm số lần chi của mỗi khoản chi.",
      time: 360,
      task: "Hoạt động 1 (SGK tr.41), kĩ thuật khăn trải bàn: mỗi bạn ghi ý tưởng công thức tại các ô G2, G3, …, G10 để biết số lần chi của mỗi khoản; nhóm thống nhất và trình bày vào bảng nhóm.",
      sgkImage: "assets/sgk/hinh-10a-1.jpg",
      sheet: CHI_HOI,
      sandbox: Object.assign({}, CHI_HOI, { intro: "📊 Trang tính Chi tiêu (Hình 10a.1)." }),
      content: {
        heading: "🧾 Mỗi khoản chi đã được chi bao nhiêu lần?",
        prompt: "Dữ liệu chi tiêu đã cập nhật trong vùng A3:D10. Cột F là danh sách khoản chi, cột G cần cho biết số lần chi của mỗi khoản.",
        revealLabel: "💡 Ý tưởng",
        blocks: [
          { kind: "text", value: "Tại ô G2, dùng hàm để đếm số ô tính trong vùng B3:B10 chứa khoản chi ghi ở ô F2, rồi sao chép công thức đến ô G10. Hàm đó là COUNTIF — hàm đếm theo điều kiện." },
          { kind: "html", value: DEM_HTML },
        ],
      },
      questions: [
        { type: "sheet", question: "Kéo chọn vùng dữ liệu cần kiểm tra để đếm số lần chi của mỗi khoản.", answer: "B3:B10",
          explanation: "Tên khoản chi của mỗi lần chi nằm ở cột Khoản chi, vùng B3:B10.", level: "nhan-biet", activity: "hd1-khoan-chi" },
        { question: "Đếm thủ công: khoản Ở đã được chi bao nhiêu lần?", type: "short", answer: ["2", "hai", "2 lần"],
          explanation: "Khoản Ở xuất hiện ở B3 (Tiền điện tháng 8) và B8 (Tiền nước tháng 8) → 2 lần.", level: "nhan-biet", activity: "hd1-khoan-chi" },
        { question: "Có thể dùng hàm COUNT (đã học ở lớp 7) để đếm số lần chi khoản Ở không?", type: "multiple-choice",
          options: ["Có, COUNT đếm mọi ô trong vùng", "Không, COUNT chỉ đếm các ô chứa số và không có điều kiện", "Có, chỉ cần viết =COUNT(Ở)", "Không, vì bảng tính không đếm được chữ"],
          answer: 1, explanation: "COUNT chỉ đếm các ô chứa dữ liệu số, không kiểm tra được điều kiện “ô chứa chữ Ở”. Cần hàm đếm theo điều kiện COUNTIF.", level: "thong-hieu", activity: "hd1-khoan-chi" },
        { question: "Ý tưởng nào đúng cho công thức ở ô G2?", type: "multiple-choice",
          options: ["Cộng các số tiền trong vùng D3:D10", "Đếm số ô trong vùng B3:B10 có nội dung giống ô F2, rồi sao chép xuống G10", "Đếm số ô trong vùng F2:F10", "Gõ trực tiếp số 2 vào ô G2"],
          answer: 1, explanation: "Đếm các ô trong vùng Khoản chi (B3:B10) giống tên khoản ở F2; sao chép xuống thì mỗi hàng đếm cho khoản của hàng đó. Gõ trực tiếp số sẽ không tự cập nhật khi dữ liệu thay đổi.", level: "thong-hieu", activity: "hd1-khoan-chi" },
      ],
    },
    {
      id: "ham-countif", name: "Hàm COUNTIF — cú pháp & ví dụ (Bảng 10a.1) 🔢", type: "knowledge",
      goal: "Hiểu cú pháp, ý nghĩa tham số của hàm COUNTIF và các dạng điều kiện.",
      time: 600,
      task: "Đọc mục 1 (SGK tr.42), quan sát Bảng 10a.1. Trên lưới ví dụ, gõ công thức COUNTIF vào các ô tô vàng ở cột F để kiểm chứng từng ví dụ.",
      sgkImage: "assets/sgk/bang-10a-1.jpg",
      sheet: MINI_SPEC,
      sandbox: Object.assign({}, MINI_SPEC, { intro: "🧪 Bảng tính thử: gõ công thức vào cột F để kiểm chứng các ví dụ." }),
      content: {
        heading: "🔢 Hàm đếm theo điều kiện COUNTIF",
        revealLabel: "📖 Cú pháp & Bảng 10a.1",
        blocks: [
          { kind: "html", value: CU_PHAP_HTML },
          { kind: "image", value: "assets/sgk/bang-10a-1.jpg", caption: "Bảng 10a.1. Một số ví dụ sử dụng hàm COUNTIF" },
          { kind: "list", value: ["Điều kiện là số, chữ hoặc biểu thức so sánh (>, <, >=, <=, <>) phải đặt trong dấu ngoặc kép: \">100\", \"Yes\".", "Dấu * thay cho một dãy kí tự bất kì: \"Y*\" = bắt đầu bằng chữ Y.", "Điều kiện là địa chỉ ô (D2) thì không cần ngoặc kép — hàm lấy giá trị trong ô đó.", "Mở rộng: COUNTIF không phân biệt chữ hoa, chữ thường (Yes và yes đều được đếm). Excel đặt vùng miền Việt Nam dùng dấu ; thay cho dấu , — bảng mô phỏng nhận cả hai."] },
          { kind: "text", value: "🤖 Mở rộng — hỏi AI thông minh: “Hãy giải thích sự khác nhau giữa range và criteria trong hàm COUNTIF”, “Hãy tìm lỗi trong công thức =COUNTIF(B2:B20,>=8)”. Luôn kiểm chứng câu trả lời của AI bằng cách thực hành trực tiếp trên bảng tính." },
        ],
      },
      questions: [
        { question: "Công thức chung của hàm COUNTIF là:", type: "multiple-choice",
          options: ["=COUNTIF(criteria, range)", "=COUNTIF(range, criteria)", "=COUNT(range, criteria)", "=COUNTIF(range; sum)"],
          answer: 1, explanation: "=COUNTIF(range, criteria): tham số thứ nhất là vùng cần kiểm tra, tham số thứ hai là điều kiện.", level: "nhan-biet", activity: "ham-countif" },
        { question: "Trong công thức =COUNTIF(A1:A4,\">100\"), phần \">100\" là:", type: "multiple-choice",
          options: ["range — phạm vi chứa các ô cần kiểm tra", "Kết quả của hàm", "criteria — điều kiện kiểm tra các ô trong range", "Tên trang tính"],
          answer: 2, explanation: "\">100\" là criteria (điều kiện); A1:A4 là range (phạm vi kiểm tra).", level: "nhan-biet", activity: "ham-countif" },
        { question: "F2: Đếm số ô trong vùng A1:A4 chứa giá trị số lớn hơn 100.", type: "sheet", mode: "formula", target: "F2", answer: '=COUNTIF(A1:A4,">100")',
          explanation: "=COUNTIF(A1:A4,\">100\") = 1 (chỉ ô A1 = 150). Điều kiện so sánh đặt trong dấu ngoặc kép.", hint: "Gõ =COUNTIF(A1:A4,\">100\") rồi Enter.", level: "thong-hieu", activity: "ham-countif" },
        { question: "F3: Đếm số ô trong vùng A1:A4 chứa từ Yes.", type: "sheet", mode: "formula", target: "F3", answer: '=COUNTIF(A1:A4,"Yes")',
          explanation: "=COUNTIF(A1:A4,\"Yes\") = 2 (ô A2 và A4).", level: "thong-hieu", activity: "ham-countif" },
        { question: "Dự đoán: kết quả của =COUNTIF(A1:A4,\"Y*\") (ô F4) là bao nhiêu? Gõ thử vào ô F4 của bảng tính thử phía trên để kiểm tra.", type: "multiple-choice",
          options: ["1", "2", "3", "4"],
          answer: 2, explanation: "\"Y*\" đếm các ô bắt đầu bằng chữ Y: Yes, Yellow, Yes → 3. Ô A1 = 150 không bắt đầu bằng Y.", level: "van-dung", activity: "ham-countif" },
        { question: "F5: Đếm số ô trong vùng A1:A4 chứa giá trị giống như ô D2.", type: "sheet", mode: "formula", target: "F5", answer: "=COUNTIF(A1:A4,D2)",
          explanation: "=COUNTIF(A1:A4,D2) = 1 (D2 = Yellow). Dùng địa chỉ ô D2 làm điều kiện: đổi nội dung D2 thì kết quả tự thay đổi (gõ thẳng \"Yellow\" thì không).", hint: "Điều kiện là địa chỉ ô → không cần dấu ngoặc kép.", level: "van-dung", activity: "ham-countif" },
      ],
      remember: ["Hàm COUNTIF đếm số ô tính trong vùng dữ liệu (range) thoả mãn điều kiện (criteria).", "Công thức: =COUNTIF(range, criteria) — range: phạm vi chứa các ô tính cần kiểm tra để đếm; criteria: điều kiện kiểm tra các ô tính trong phạm vi range."],
    },
    {
      id: "bang-10a1", name: "Ghép yêu cầu với công thức 🧩", type: "matching",
      goal: "Củng cố cách viết điều kiện trong hàm COUNTIF.",
      time: 180,
      task: "Ghép mỗi yêu cầu tính toán với công thức đúng. Làm hết rồi bấm Nộp bài.",
      sgkImage: "assets/sgk/bang-10a-1.jpg",
      pairs: [
        { left: "Đếm số ô trong vùng A1:A4 chứa giá trị số lớn hơn 100", right: '=COUNTIF(A1:A4,">100")' },
        { left: "Đếm số ô trong vùng A1:A4 chứa từ Yes", right: '=COUNTIF(A1:A4,"Yes")' },
        { left: "Đếm số ô trong vùng A1:A4 chứa xâu kí tự bắt đầu bằng chữ cái Y", right: '=COUNTIF(A1:A4,"Y*")' },
        { left: "Đếm số ô trong vùng A1:A4 chứa giá trị giống như ô D2", right: "=COUNTIF(A1:A4,D2)" },
        { left: "Đếm số ô trong vùng A1:A4 chứa giá trị số nhỏ hơn 50", right: '=COUNTIF(A1:A4,"<50")' },
      ],
      explanation: "Bảng 10a.1: \">100\" (số lớn hơn 100) · \"Yes\" (đúng từ Yes) · \"Y*\" (bắt đầu bằng Y) · D2 (giống giá trị ô D2); tương tự \"<50\" là số nhỏ hơn 50.",
    },
    {
      id: "cau-hoi-tr43", name: "Câu hỏi SGK: Sao chép công thức — có $ và không có $ 🔒", type: "knowledge",
      goal: "Hiểu vì sao vùng range cần địa chỉ tuyệt đối khi sao chép công thức COUNTIF.",
      time: 480,
      task: "Câu hỏi SGK tr.43: làm thí nghiệm trên trang tính Chi tiêu mô phỏng — Thử 1 không có $, Thử 2 có $ — rồi trả lời câu a, b.",
      sgkImage: "assets/sgk/cau-hoi-tr43.jpg",
      sandbox: Object.assign({}, CHI_SPEC, { intro: "🧪 Thử 1: gõ =COUNTIF(B3:B10,F2) vào G2, kéo nút điền ■ xuống G10, bấm G5 xem công thức. Thử 2: sửa G2 thành =COUNTIF($B$3:$B$10,F2), kéo lại xuống G10 và so sánh." }),
      content: {
        heading: "🔒 Vì sao là $B$3:$B$10?",
        revealLabel: "🖼️ Hình 10a.2 & giải thích",
        blocks: [
          { kind: "image", value: "assets/sgk/hinh-10a-2.jpg", caption: "Hình 10a.2. Công thức tính số lần chi của mỗi khoản chi" },
          { kind: "list", value: ["Công thức ở G2 lúc đầu có thể là =COUNTIF($B$3:$B$10,\"Ở\"). Vì tên khoản chi đã lưu ở ô F2 nên sửa thành =COUNTIF($B$3:$B$10,F2).", "a) Sao chép sang G3, …, G10: range $B$3:$B$10 giữ nguyên, criteria đổi lần lượt thành F3, …, F10.", "b) Bỏ dấu $: range cũng bị dời theo (G3 → B4:B11, G5 → B6:B13…) nên phạm vi kiểm tra bị sai → kết quả không còn đúng."] },
        ],
      },
      questions: [
        { question: "a) Sao chép =COUNTIF($B$3:$B$10,F2) từ G2 sang các ô G3, …, G10, công thức thay đổi thế nào?", type: "multiple-choice",
          options: ["Không thay đổi gì", "Phần range giữ nguyên $B$3:$B$10, phần criteria đổi lần lượt thành F3, …, F10", "Phần range dời xuống, phần criteria giữ nguyên F2", "Cả range và criteria đều dời xuống"],
          answer: 1, explanation: "Địa chỉ có $ (tuyệt đối) giữ nguyên; F2 là địa chỉ tương đối nên dời theo hàng: F3, F4, …, F10.", level: "thong-hieu", activity: "cau-hoi-tr43" },
        { question: "Thử 1: sao chép =COUNTIF(B3:B10,F2) (không có $) từ G2 xuống. Ô G5 (khoản Học tập) cho kết quả bao nhiêu?", type: "multiple-choice",
          options: ["0", "1", "2", "Báo lỗi #REF!"],
          answer: 0, explanation: "G5 trở thành =COUNTIF(B6:B13,F5): vùng B6:B13 không còn ô B5 “Học tập” nên kết quả là 0 — sai (đúng phải là 1).", level: "van-dung", activity: "cau-hoi-tr43" },
        { question: "b) Nếu bỏ các dấu $ (=COUNTIF(B3:B10,F2)) rồi sao chép sang G3 … G10, kết quả có đúng không? Tại sao?", type: "multiple-choice",
          options: ["Đúng, vì chỉ cần đúng ở ô G2", "Không đúng, vì phần range cũng bị dời theo nên phạm vi kiểm tra bị sai", "Không đúng, vì hàm COUNTIF không sao chép được", "Đúng, vì bảng tính tự sửa lại vùng"],
          answer: 1, explanation: "Không có $, range dời theo hàng (B4:B11, B5:B12, …) → bỏ sót các ô đầu, kiểm tra cả ô trống → kết quả sai.", level: "van-dung", activity: "cau-hoi-tr43" },
      ],
      remember: ["COUNTIF giúp đếm số ô trong vùng thoả mãn điều kiện; điều kiện có thể là số, chữ hoặc biểu thức so sánh.", "Vùng range dùng địa chỉ tuyệt đối ($B$3:$B$10) để giữ nguyên khi sao chép; criteria (F2) tương đối để tự đổi theo từng hàng."],
    },

    /* ===================== HĐ2.2: THỰC HÀNH SỬ DỤNG HÀM COUNTIF (50 phút) ===================== */
    {
      id: "cac-buoc", name: "Nhiệm vụ — Sắp xếp các bước thực hành 🔢", type: "ordering",
      goal: "Nắm quy trình tính số lần chi của mỗi khoản chi bằng COUNTIF.",
      time: 150,
      task: "Sắp xếp các bước tính số lần chi của mỗi khoản chi trong trang tính Chi tiêu (SGK tr.43). Xếp xong bấm Nộp bài.",
      sgkImage: "assets/sgk/sgk-trang43.jpg",
      steps: [
        "Mở tệp bảng tính TaiChinhGiaDinh.xlsx, chọn trang tính Chi tiêu",
        "Nhập dữ liệu cho trang tính tương tự như Hình 10a.1",
        "Tại ô G2, nhập công thức =COUNTIF($B$3:$B$10,F2)",
        "Sao chép công thức trong ô G2 sang các ô từ G3 đến G10",
        "Lưu bảng tính",
      ],
      explanation: "Mở tệp, chọn trang Chi tiêu → nhập dữ liệu → nhập công thức ở G2 → sao chép sang G3:G10 → lưu.",
    },
    {
      id: "thuc-hanh-chi", name: "Thực hành a) Số lần chi của mỗi khoản chi 🧾", type: "knowledge",
      goal: "Dùng COUNTIF tính số lần chi của mỗi khoản chi trong trang tính Chi tiêu.",
      time: 600,
      task: "Trên Excel: mở TaiChinhGiaDinh.xlsx, trang tính Chi tiêu; tại G2 nhập =COUNTIF($B$3:$B$10,F2), sao chép sang G3:G10, lưu tệp. Làm trước trên bảng mô phỏng và trả lời câu hỏi.",
      sgkImage: "assets/sgk/hinh-10a-2.jpg",
      sheet: CHI_SPEC,
      questions: [
        { question: "Tại ô G2 nhập công thức tính số lần chi của khoản Ở (dùng ô F2 làm điều kiện), rồi sao chép sang G3:G10.", type: "sheet", mode: "formula", target: "G2:G10", answer: "=COUNTIF($B$3:$B$10,F2)",
          explanation: "G2 = COUNTIF($B$3:$B$10,F2) = 2; sao chép xuống: Ăn 1, Di chuyển 1, Học tập 1, Sức khoẻ 1, Giải trí 0, Quà tặng/Từ thiện 1, Tiết kiệm 1, Khác 0 (Hình 10a.2).",
          hint: "Nhớ dấu $ cho vùng B3:B10. Nhập G2 rồi kéo nút điền ■ xuống G10.", level: "van-dung", activity: "thuc-hanh-chi" },
        { question: "Trong tháng 8, khoản chi nào được chi nhiều lần nhất?", type: "multiple-choice",
          options: ["Ăn", "Học tập", "Ở", "Tiết kiệm"],
          answer: 2, explanation: "G2 (Ở) = 2 là lớn nhất: tiền điện và tiền nước tháng 8.", level: "thong-hieu", activity: "thuc-hanh-chi" },
        { question: "Ô G7 (Giải trí) và G10 (Khác) bằng 0 có nghĩa là gì?", type: "multiple-choice",
          options: ["Công thức bị sai", "Trong tháng 8, gia đình chưa chi lần nào cho hai khoản này", "Hai khoản này chi nhiều nhất", "Bảng tính chưa tính xong"],
          answer: 1, explanation: "COUNTIF trả về 0 khi không có ô nào trong vùng B3:B10 thoả mãn điều kiện.", level: "thong-hieu", activity: "thuc-hanh-chi" },
      ],
      remember: ["Mỗi khoản chi đã được chi bao nhiêu lần: =COUNTIF($B$3:$B$10,F2) rồi sao chép sang G3:G10."],
    },

    /* =========================== TIẾT 2 =========================== */
    {
      id: "thuc-hanh-thu", name: "Thực hành b) Số lần thu của mỗi khoản thu 💵", type: "knowledge",
      goal: "Dùng COUNTIF tính số lần thu của mỗi khoản thu trong trang tính Thu nhập.",
      time: 480,
      task: "Trên Excel: chọn trang tính Thu nhập, nhập dữ liệu như Hình 10a.3; tại G2 nhập =COUNTIF($B$3:$B$8,F2), sao chép sang G3:G6 (Hình 10a.4, 10a.5); lưu tệp. Làm trước trên bảng mô phỏng.",
      sgkImage: "assets/sgk/hinh-10a-4.jpg",
      sheet: THU_SPEC,
      content: {
        heading: "💵 Tính số lần thu của mỗi khoản thu",
        revealLabel: "🖼️ Hình 10a.3 – 10a.5",
        blocks: [
          { kind: "image", value: "assets/sgk/hinh-10a-3.jpg", caption: "Hình 10a.3. Bảng dữ liệu về các khoản thu" },
          { kind: "image", value: "assets/sgk/hinh-10a-4.jpg", caption: "Hình 10a.4. Nhập công thức tại ô G2" },
          { kind: "image", value: "assets/sgk/hinh-10a-5.jpg", caption: "Hình 10a.5. Sao chép công thức trong ô G2 sang các ô từ G3 đến G6" },
        ],
      },
      questions: [
        { question: "Tại ô G2 nhập công thức tính số lần thu của khoản Lương, rồi sao chép sang G3:G6.", type: "sheet", mode: "formula", target: "G2:G6", answer: "=COUNTIF($B$3:$B$8,F2)",
          explanation: "G2 = COUNTIF($B$3:$B$8,F2): Lương 1, Thưởng 1, Làm thêm 2, Được cho/tặng 1, Khác 1 (Hình 10a.5).",
          hint: "Dữ liệu thu nằm ở B3:B8 → range $B$3:$B$8.", level: "van-dung", activity: "thuc-hanh-thu" },
        { question: "Sau khi sao chép, công thức ở ô G6 là:", type: "multiple-choice",
          options: ["=COUNTIF($B$3:$B$8,F2)", "=COUNTIF($B$7:$B$12,F6)", "=COUNTIF($B$3:$B$8,F6)", "=COUNTIF(B7:B12,F6)"],
          answer: 2, explanation: "Range có $ giữ nguyên $B$3:$B$8; criteria dời 4 hàng: F2 → F6.", level: "thong-hieu", activity: "thuc-hanh-thu" },
        { question: "Khoản thu nào có số lần thu nhiều nhất?", type: "multiple-choice",
          options: ["Lương", "Làm thêm", "Thưởng", "Được cho/tặng"],
          answer: 1, explanation: "Làm thêm có 2 lần: bán hàng trực tuyến (15/8) và làm thêm tháng 8 (30/8).", level: "thong-hieu", activity: "thuc-hanh-thu" },
      ],
    },
    {
      id: "thuc-hanh-bang-diem", name: "Thực hành: Thống kê bảng điểm lớp 9A 🎓", type: "knowledge",
      goal: "Vận dụng COUNTIF với điều kiện số và điều kiện chữ; trình bày kết quả thống kê rõ ràng.",
      time: 720,
      task: "Mở BangDiem_HS.xlsx: dùng COUNTIF tính số HS có điểm ≥ 8, điểm < 5 và số HS nữ; đặt kết quả ở cuối bảng có nhãn, kẻ viền, chữ đậm; kiểm chứng bằng đếm thủ công; lưu ThucHanh_COUNTIF_Hoten.xlsx.",
      sheet: BD_SPEC,
      questions: [
        { question: "B18 — Số HS giỏi: đếm số HS có điểm TB từ 8 trở lên (vùng B2:B16).", type: "sheet", mode: "formula", target: "B18", answer: '=COUNTIF(B2:B16,">=8")',
          explanation: "=COUNTIF(B2:B16,\">=8\") = 6. “Từ 8 trở lên” dùng >= (điểm 8 cũng được đếm).", hint: "Điều kiện so sánh đặt trong ngoặc kép: \">=8\".", level: "van-dung", activity: "thuc-hanh-bang-diem" },
        { question: "B19 — Số HS yếu: đếm số HS có điểm TB dưới 5.", type: "sheet", mode: "formula", target: "B19", answer: '=COUNTIF(B2:B16,"<5")',
          explanation: "=COUNTIF(B2:B16,\"<5\") = 3 (4.6; 3.9; 4.8).", level: "van-dung", activity: "thuc-hanh-bang-diem" },
        { question: "B20 — Số HS nữ (vùng C2:C16).", type: "sheet", mode: "formula", target: "B20", answer: '=COUNTIF(C2:C16,"Nữ")',
          explanation: "=COUNTIF(C2:C16,\"Nữ\") = 7. Điều kiện là chữ đặt trong ngoặc kép.", level: "van-dung", activity: "thuc-hanh-bang-diem" },
        { question: "Một bạn hỏi AI và nhận được công thức =COUNTIF(B2:B16,>=8). Em nhận xét thế nào?", type: "multiple-choice",
          options: ["Đúng, dùng được ngay", "Sai: điều kiện >=8 phải đặt trong dấu ngoặc kép: \">=8\"", "Sai: phải đổi thành =COUNT(B2:B16)", "Sai: vùng phải là C2:C16"],
          answer: 1, explanation: "Điều kiện so sánh phải là \">=8\". Kết quả AI cần được kiểm chứng bằng cách nhập thử trên bảng tính.", level: "van-dung", activity: "thuc-hanh-bang-diem" },
        { question: "Mở rộng — B21: đếm số HS loại Khá (6.5 ≤ điểm < 8).", type: "sheet", mode: "formula", target: "B21", answer: '=COUNTIF(B2:B16,">=6.5")-COUNTIF(B2:B16,">=8")',
          explanation: "Số HS có điểm ≥ 6.5 trừ số HS có điểm ≥ 8: 11 − 6 = 5. Cũng có thể dùng hàm nhiều điều kiện =COUNTIFS(B2:B16,\">=6.5\",B2:B16,\"<8\").",
          hint: "Lấy (số HS ≥ 6.5) trừ (số HS ≥ 8).", level: "van-dung-cao", activity: "thuc-hanh-bang-diem" },
      ],
      remember: ["Điều kiện số: \">=8\", \"<5\"; điều kiện chữ: \"Nữ\" — đều đặt trong dấu ngoặc kép.", "Kết quả thống kê nên có nhãn rõ ràng, định dạng nổi bật và được kiểm chứng lại."],
    },

    /* ===================== HĐ3: LUYỆN TẬP (10 phút + thực hành) ===================== */
    {
      id: "hop-qua", name: "Luyện tập: Mở quà bí mật 🎁", type: "giftbox",
      goal: "Củng cố kiến thức và kĩ năng sử dụng hàm COUNTIF.",
      time: 360,
      task: "Mỗi nhóm lần lượt chọn một hộp quà và trả lời câu hỏi. Trọng tài nêu câu hỏi và công bố, thư kí ghi điểm; trả lời đúng thì mở quà bí mật!",
      intro: "8 hộp quà — chọn hộp → trả lời → đúng thì nhận quà 🎉",
      prizes: ["👏 Một tràng pháo tay của cả lớp", "⭐ Ngôi sao may mắn", "🎁 Quà bí mật từ thầy/cô", "🏅 Danh hiệu “Vua đếm số”", "🌟 Lời khen trước lớp", "🍀 Ngôi sao may mắn", "🏆 Danh hiệu “Kế toán nhí”", "🎁 Quà bí mật từ thầy/cô"],
      questions: [
        { question: "Trong Excel, cấu trúc hàm COUNTIF nào đúng?", type: "multiple-choice",
          options: ["=COUNTIF(criteria, range)", "COUNTIF(range, criteria)", "COUNTIF(criteria, range)", "=COUNTIF(range, criteria)"],
          answer: 3, explanation: "Công thức bắt đầu bằng dấu =, tham số thứ nhất là range, thứ hai là criteria: =COUNTIF(range, criteria).", level: "nhan-biet", activity: "hop-qua" },
        { question: "Hàm COUNTIF được sử dụng để:", type: "multiple-choice",
          options: ["Xác thực dữ liệu", "Hỗ trợ tính toán", "Sắp xếp dữ liệu", "Đếm số ô tính trong vùng dữ liệu thoả mãn điều kiện"],
          answer: 3, explanation: "COUNTIF là hàm đếm theo điều kiện.", level: "nhan-biet", activity: "hop-qua" },
        { question: "Các ô A1 = 30, A2 = 30, A3 = \"AQ\", A4 = 2. Kết quả của =COUNTIF(A1:A4,\"30\") là:", type: "multiple-choice",
          options: ["3", "1", "2", "4"],
          answer: 2, explanation: "Có 2 ô bằng 30 (A1, A2) → 2.", level: "thong-hieu", activity: "hop-qua" },
        { question: "Các ô A1 = 30, A2 = 30, A3 = \"AQ\", A4 = 2. Kết quả của =COUNTIF(A1:A4,\"<30\") là:", type: "multiple-choice",
          options: ["3", "1", "2", "4"],
          answer: 1, explanation: "Chỉ ô A4 = 2 nhỏ hơn 30. Ô A3 chứa chữ nên không được so sánh số → 1.", level: "van-dung", activity: "hop-qua" },
        { question: "Công thức =COUNTIF(B3:B10,\"Ở\") cho biết điều gì?", type: "multiple-choice",
          options: ["Số ô trong vùng B3:B10 chứa chữ Ở", "Tổng số tiền chi cho khoản Ở", "Vị trí ô chứa chữ Ở", "Số ô trống trong vùng B3:B10"],
          answer: 0, explanation: "COUNTIF đếm số ô thoả mãn điều kiện, không tính tổng tiền (tính tổng theo điều kiện là hàm SUMIF — Bài 11a).", level: "thong-hieu", activity: "hop-qua" },
        { question: "Vì sao ở ô G2 nên viết =COUNTIF($B$3:$B$10,F2) thay vì =COUNTIF(B3:B10,F2)?", type: "multiple-choice",
          options: ["Để công thức ngắn hơn", "Để vùng kiểm tra giữ nguyên khi sao chép sang G3:G10", "Để đếm được số tiền", "Vì Excel bắt buộc có dấu $"],
          answer: 1, explanation: "Dấu $ cố định vùng range khi sao chép; criteria F2 vẫn dời thành F3, F4…", level: "thong-hieu", activity: "hop-qua" },
        { question: "Các ô A1:A4 = Yes, No, Yellow, yes. Kết quả của =COUNTIF(A1:A4,\"Y*\") là:", type: "multiple-choice",
          options: ["3", "2", "1", "4"],
          answer: 0, explanation: "\"Y*\" = bắt đầu bằng chữ Y; COUNTIF không phân biệt chữ hoa, thường → Yes, Yellow, yes: 3 ô.", level: "van-dung-cao", activity: "hop-qua" },
        { question: "Để đếm số khoản chi có số tiền lớn hơn 500 (nghìn đồng) trong vùng D3:D10, công thức đúng là:", type: "multiple-choice",
          options: ["=COUNTIF(D3:D10,>500)", "=COUNTIF(D3:D10,\">500\")", "=COUNTIF(\">500\",D3:D10)", "=COUNT(D3:D10,\">500\")"],
          answer: 1, explanation: "Range là D3:D10, điều kiện \">500\" đặt trong ngoặc kép.", level: "van-dung", activity: "hop-qua" },
      ],
    },
    {
      id: "luyen-tap-1", name: "Luyện tập 1: Bổ sung dữ liệu, điều chỉnh công thức ➕", type: "knowledge",
      goal: "Biết điều chỉnh vùng range khi bổ sung dữ liệu để kết quả tổng hợp chính xác.",
      time: 420,
      task: "Luyện tập 1 (SGK tr.44): bổ sung thêm dòng dữ liệu vào cả hai trang tính Chi tiêu và Thu nhập trên Excel, điều chỉnh công thức COUNTIF ở cột G. Bảng mô phỏng đã thêm 3 khoản chi mới (tô vàng).",
      sgkImage: "assets/sgk/sgk-trang44.jpg",
      sheet: CHI_THEM,
      questions: [
        { question: "Nếu vẫn giữ công thức cũ =COUNTIF($B$3:$B$10,F2), ô G7 (Giải trí) cho kết quả bao nhiêu?", type: "multiple-choice",
          options: ["0 — sai, vì vùng cũ không có hàng mới", "1 — đúng", "2", "Báo lỗi"],
          answer: 0, explanation: "Khoản Giải trí mới ở hàng 12, nằm ngoài vùng $B$3:$B$10 → vẫn 0 (đúng phải là 1).", level: "thong-hieu", activity: "luyen-tap-1" },
        { question: "Điều chỉnh công thức ở G2 cho đủ các hàng mới, rồi sao chép sang G3:G10.", type: "sheet", mode: "formula", target: "G2:G10", answer: "=COUNTIF($B$3:$B$13,F2)",
          explanation: "=COUNTIF($B$3:$B$13,F2): Ở 2, Ăn 1, Di chuyển 2, Học tập 1, Sức khoẻ 2, Giải trí 1, Quà tặng/Từ thiện 1, Tiết kiệm 1, Khác 0.",
          hint: "Dữ liệu giờ kéo dài đến hàng 13 → range $B$3:$B$13.", level: "van-dung", activity: "luyen-tap-1" },
        { question: "Mở rộng: để lần sau nhập thêm dữ liệu mà không phải sửa công thức, em có thể:", type: "multiple-choice",
          options: ["Chọn vùng range rộng hơn phần dữ liệu, ví dụ $B$3:$B$100 (ô trống không được đếm)", "Xoá dấu $ trong công thức", "Gõ trực tiếp kết quả vào cột G", "Chuyển sang dùng hàm SUM"],
          answer: 0, explanation: "Vùng rộng sẵn bao gồm cả các hàng sẽ nhập sau; ô trống không thoả điều kiện nên không ảnh hưởng kết quả. Excel cũng cho dùng cả cột, ví dụ =COUNTIF($B:$B,F2) — ô tiêu đề “Khoản chi” không trùng tên khoản nào nên không bị đếm.", level: "van-dung-cao", activity: "luyen-tap-1" },
      ],
    },
    {
      id: "luyen-tap-2", name: "Luyện tập 2: Khảo sát chọn trường THPT 🏫", type: "knowledge",
      goal: "Thu thập dữ liệu khảo sát và dùng COUNTIF tổng hợp kết quả.",
      time: 480,
      task: "Luyện tập 2 (SGK tr.44): khảo sát việc chọn trường THPT của các bạn trong lớp, nhập vào bảng tính và dùng COUNTIF tổng hợp như Hình 10a.6. Làm trước trên bảng mô phỏng.",
      sgkImage: "assets/sgk/hinh-10a-6.jpg",
      sheet: KS_SPEC,
      questions: [
        { question: "Tại E5 nhập công thức đếm số bạn chọn trường A, rồi sao chép sang E6:E8.", type: "sheet", mode: "formula", target: "E5:E8", answer: "=COUNTIF($B$4:$B$13,D5)",
          explanation: "E5 = COUNTIF($B$4:$B$13,D5): A 3, B 2, C 3, D 2 (tổng 10 = số bạn được khảo sát).",
          hint: "range: cột Tên trường $B$4:$B$13; criteria: ô D5.", level: "van-dung", activity: "luyen-tap-2" },
        { question: "Theo kết quả khảo sát, trường nào được chọn nhiều nhất?", type: "multiple-choice",
          options: ["Trường A và trường C", "Trường B", "Trường D", "Trường B và trường D"],
          answer: 0, explanation: "A và C cùng có 3 bạn chọn.", level: "thong-hieu", activity: "luyen-tap-2" },
        { question: "Cách thu thập dữ liệu khảo sát nào nhanh, chính xác và đưa được ngay vào bảng tính?", type: "multiple-choice",
          options: ["Hỏi miệng từng bạn rồi nhớ lại", "Dùng bảng hỏi trực tuyến (ví dụ Google Forms) gửi cả lớp, kết quả xuất ra bảng tính", "Dùng cảm biến nhiệt độ", "Đoán theo sở thích của lớp năm trước"],
          answer: 1, explanation: "Bảng hỏi (phiếu khảo sát, biểu mẫu trực tuyến) là cách thu thập dữ liệu phù hợp với khảo sát ý kiến; cảm biến dùng thu dữ liệu đo đạc (nhiệt độ, ánh sáng…).", level: "van-dung", activity: "luyen-tap-2" },
        { question: "Tổng các ô E5:E8 bằng 10. Vì sao nên kiểm tra con số này?", type: "multiple-choice",
          options: ["Để biết điểm trung bình của lớp", "Vì tổng phải bằng số bạn được khảo sát — nếu khác là công thức hoặc dữ liệu có sai sót", "Vì COUNTIF luôn cho tổng bằng 10", "Không cần kiểm tra"],
          answer: 1, explanation: "Mỗi bạn chọn đúng một trường nên tổng số lượng = số bạn được khảo sát. Đây là cách kiểm chứng kết quả thống kê.", level: "van-dung-cao", activity: "luyen-tap-2" },
      ],
    },
    {
      id: "tu-kiem-tra", name: "Phiếu tự kiểm tra sản phẩm thực hành 📋", type: "checklist",
      goal: "Tự đánh giá mức độ hoàn thành sản phẩm thực hành trên Excel.",
      time: 180,
      task: "Nhóm đối chiếu các tệp thực hành trên Excel, tick từng việc vào cột Đã làm hoặc Chưa làm, ghi lỗi thường gặp rồi gửi cho thầy/cô.",
      columns: ["✅ Đã làm", "⏳ Chưa làm"],
      sections: [
        { title: "🧾 TaiChinhGiaDinh.xlsx", items: [
          "Trang Chi tiêu: G2 = COUNTIF($B$3:$B$10,F2), sao chép đến G10",
          "Trang Thu nhập: G2 = COUNTIF($B$3:$B$8,F2), sao chép đến G6",
          "Bổ sung dòng dữ liệu thu, chi và điều chỉnh vùng range cho đúng",
          "Lưu tệp",
        ] },
        { title: "🎓 ThucHanh_COUNTIF_Hoten.xlsx", items: [
          "Có số HS điểm ≥ 8, điểm < 5, số HS nữ ở cuối bảng",
          "Có nhãn rõ ràng, kẻ viền, chữ đậm cho dòng kết quả",
          "Đã kiểm chứng kết quả bằng đếm thủ công",
        ] },
        { title: "🏫 Khảo sát chọn trường THPT", items: [
          "Nhập dữ liệu khảo sát của lớp vào bảng tính",
          "Bảng Thống kê dùng COUNTIF, tổng bằng số bạn được khảo sát",
        ] },
      ],
      note: "Nhóm em hay mắc lỗi gì khi dùng hàm COUNTIF? Em đã khắc phục thế nào?",
      modelAnswer: [
        "Lỗi thường gặp: quên dấu $ ở vùng range nên sao chép bị sai; điều kiện so sánh không đặt trong ngoặc kép (>=8); chọn sai cột; đảo thứ tự range và criteria; thêm dữ liệu nhưng không mở rộng vùng range.",
        "Khắc phục: bấm vào ô kiểm tra công thức trên thanh công thức, sửa lại vùng/điều kiện; đối chiếu với đếm thủ công; kiểm tra tổng số lần bằng số dòng dữ liệu.",
      ],
    },

    /* ===================== HĐ4: VẬN DỤNG (5 phút + ở nhà) ===================== */
    {
      id: "van-dung", name: "Vận dụng: Kinh phí Triển lãm tin học 🏛️", type: "knowledge",
      goal: "Vận dụng COUNTIF tính số lần thu, chi của dự án Triển lãm tin học.",
      time: 300,
      task: "Mở KinhPhiTrienLam.xlsx (Vận dụng Bài 9a), dùng COUNTIF tính số lần thu của mỗi khoản thu và số lần chi của mỗi khoản chi; lưu tệp. Làm trước trên bảng mô phỏng (dữ liệu minh hoạ), hoàn thiện ở nhà.",
      sgkImage: "assets/sgk/sgk-trang44.jpg",
      questions: [
        { question: "Trang Các khoản thu: tại G2 nhập công thức đếm số lần thu khoản Quỹ, rồi sao chép sang G3.", type: "sheet", mode: "formula", target: "G2:G3", answer: "=COUNTIF($B$3:$B$11,F2)", sheet: TL_THU_SPEC,
          explanation: "=COUNTIF($B$3:$B$11,F2): Quỹ 4 lần, Tài trợ 5 lần.", level: "van-dung", activity: "van-dung" },
        { question: "Trang Các khoản chi: tại G2 nhập công thức đếm số lần chi khoản Văn phòng phẩm, rồi sao chép sang G3.", type: "sheet", mode: "formula", target: "G2:G3", answer: "=COUNTIF($B$3:$B$13,F2)", sheet: TL_CHI_SPEC,
          explanation: "=COUNTIF($B$3:$B$13,F2): Văn phòng phẩm 5 lần, In tài liệu 6 lần.", level: "van-dung", activity: "van-dung" },
        { question: "Tổng số lần chi (G2 + G3) phải bằng bao nhiêu để chắc chắn công thức đúng?", type: "multiple-choice",
          options: ["2", "11 — bằng số hàng dữ liệu chi", "13", "Không xác định được"],
          answer: 1, explanation: "Có 11 hàng chi (B3:B13), mỗi hàng thuộc đúng một khoản → 5 + 6 = 11.", level: "van-dung-cao", activity: "van-dung" },
      ],
    },
    {
      id: "van-dung-nha", name: "Vận dụng — COUNTIF trong cuộc sống 📝", type: "vandung",
      goal: "Liên hệ COUNTIF với các bài toán thống kê thực tế; dùng AI có trách nhiệm.",
      time: 180,
      task: "Nhóm thảo luận, gửi câu trả lời cho thầy/cô; hoàn thiện KinhPhiTrienLam.xlsx ở nhà, gửi sản phẩm qua mail hoặc Zalo của thầy/cô. Tiết sau báo cáo.",
      intro: "Gửi câu trả lời cho thầy/cô rồi bấm để xem hướng chốt.",
      cases: [
        { question: "Nêu 2 tình huống thực tế khác có thể dùng hàm COUNTIF (học tập, thư viện, điểm danh…). Viết công thức minh hoạ cho một tình huống.",
          answer: "Ví dụ: đếm số bạn vắng học trong sổ điểm danh =COUNTIF(C2:C40,\"Vắng\"); đếm số sách thể loại Khoa học trong thư viện =COUNTIF(B2:B200,\"Khoa học\"); đếm số bài kiểm tra đạt từ 5 trở lên =COUNTIF(D2:D40,\">=5\")." },
        { question: "Khi nhờ AI viết công thức COUNTIF, em cần làm gì để chắc chắn công thức đúng?",
          answer: "Nêu rõ vùng dữ liệu và điều kiện trong câu lệnh; kiểm tra cú pháp (range trước, criteria sau, điều kiện so sánh trong ngoặc kép, dấu $ khi cần sao chép); nhập thử trên bảng tính và đối chiếu với đếm thủ công. Không dùng ngay kết quả AI khi chưa kiểm chứng." },
      ],
    },

    /* ===================== TỔNG KẾT ===================== */
    {
      id: "tong-ket", name: "Tổng kết", type: "summary",
      task: "Cả lớp nhắc lại kiến thức trọng tâm và làm thử thách cuối. Dặn dò: hoàn thiện KinhPhiTrienLam.xlsx; xem trước Bài 11a “Sử dụng hàm SUMIF”.",
      content: {
        learned: [
          "Hàm COUNTIF đếm số ô tính trong vùng dữ liệu (range) thoả mãn điều kiện (criteria).",
          "Công thức: =COUNTIF(range, criteria).",
          "Điều kiện: \">100\", \"Yes\", \"Y*\" (đặt trong ngoặc kép) hoặc địa chỉ ô (F2).",
          "Vùng range dùng địa chỉ tuyệt đối ($B$3:$B$10) để sao chép công thức cho đúng.",
          "Thêm dữ liệu → điều chỉnh vùng range; kiểm chứng kết quả thống kê.",
        ],
        challenge: [
          { question: "G12: đếm số khoản chi có số tiền lớn hơn 500 (nghìn đồng).", type: "sheet", mode: "formula", target: "G12", answer: '=COUNTIF(D3:D10,">500")', sheet: CHI_THU_THACH,
            explanation: "=COUNTIF(D3:D10,\">500\") = 6 (800, 620, 2 200, 600, 1 000, 8 000).", level: "van-dung-cao", activity: "tong-ket" },
          { question: "Công thức nào đếm số học sinh nam trong vùng Giới tính C2:C16?", type: "multiple-choice",
            options: ["=COUNTIF(C2:C16,Nam)", "=COUNT(C2:C16,\"Nam\")", "=COUNTIF(\"Nam\",C2:C16)", "=COUNTIF(C2:C16,\"Nam\")"],
            answer: 3, explanation: "Range C2:C16 đứng trước, điều kiện chữ \"Nam\" đặt trong ngoặc kép.", level: "van-dung", activity: "tong-ket" },
        ],
      },
    },
  ],
};

if (typeof module !== "undefined" && module.exports) module.exports = LESSON;
if (typeof window !== "undefined") window.LESSON = LESSON;
