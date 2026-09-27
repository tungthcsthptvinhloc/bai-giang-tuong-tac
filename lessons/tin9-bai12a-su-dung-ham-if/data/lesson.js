/* ============================================================================
 * BÀI 12a — SỬ DỤNG HÀM IF  (Tin học 9 — Kết nối tri thức)
 * Chủ đề 4 (lựa chọn a): Sử dụng bảng tính điện tử nâng cao — dự án Quản lí tài chính gia đình.
 * Bám sát SGK trang 48–51 + Kế hoạch bài dạy (2 tiết) của giáo viên.
 * Chỉ sửa file này để đổi nội dung. Engine app.js không cần sửa.
 * Bảng tính mô phỏng TÍNH ĐƯỢC HÀM IF, IF lồng nhau, so sánh (> < >= <= = <>) và số phần trăm (50%).
 * sheet.tests = bộ dữ liệu thử khi chấm công thức (đặt đúng mốc 50%, 80%… để phát hiện sai > / >= hoặc sai mốc).
 * sheet.hideCols ẩn cột A:E (vùng dữ liệu chi tiêu gốc) để bảng giống Hình 12a.2, 12a.3.
 * ==========================================================================*/

// ---- Bảng tổng hợp các khoản chi (Hình 12a.2) ----
const KHOAN = ["Ở", "Ăn", "Di chuyển", "Học tập", "Sức khoẻ", "Giải trí", "Quà tặng/Từ thiện", "Tiết kiệm", "Khác"];
const SO_LAN = [2, 1, 1, 1, 1, 0, 1, 1, 0];
const TONG = [920, 8000, 600, 2200, 620, 0, 300, 1000, 0];
const MUC = ["A", "A", "A", "A", "A", "B", "B", "C", "B"];
const MUC_TEN = ["Nhu cầu thiết yếu", "Mong muốn cá nhân", "Tiết kiệm"];
const listCells = (col, items, from) => { const o = {}; items.forEach((t, i) => { o[col + (i + (from || 2))] = String(t); }); return o; };
const F_M = (r) => "=SUMIF($I$2:$I$10,K" + r + ",$H$2:$H$10)";
const F_N = (r) => "=M" + r + "/$H$11*100%";
const F_O2 = ['=IF(N3>50%,"Nhiều hơn","Ít hơn")', '=IF(N4>30%,"Nhiều hơn","Ít hơn")', '=IF(N5>20%,"Nhiều hơn","Ít hơn")'];
const F_O3 = ['=IF(N3>80%,"Nhiều quá",IF(N3>50%,"Nhiều hơn","Ít hơn"))', '=IF(N4>40%,"Nhiều quá",IF(N4>30%,"Nhiều hơn","Ít hơn"))', '=IF(N5>20%,"Nhiều hơn",IF(N5>10%,"Ít hơn","Ít quá"))'];
// Dữ liệu thử khi chấm công thức IF: đặt tỉ lệ đúng bằng / vừa vượt các mốc 50%, 30%, 20%, 80%, 40%, 10%
const TESTS_O = [{ N3: 0.5, N4: 0.3, N5: 0.2 }, { N3: 0.5001, N4: 0.3001, N5: 0.2001 }, { N3: 0.8, N4: 0.4, N5: 0.1 },
  { N3: 0.8001, N4: 0.4001, N5: 0.1001 }, { N3: 0.05, N4: 0.05, N5: 0.05 }, { N3: 0.95, N4: 0.95, N5: 0.95 }];
// o: { I (có cột Mục chi, mặc định có), M, N (đã có công thức), O: { O3: "=IF…" }, head: "Tổng tiền" | "Tổng chi" }
function thSpec(o) {
  o = o || {};
  const cells = Object.assign({ F1: "Khoản chi", G1: "Số lần chi", H1: "Tổng tiền (nghìn đồng)", F11: "Tổng", G11: "=SUM(G2:G10)", H11: "=SUM(H2:H10)",
    K1: "Tổng hợp mục chi", K2: "Mục chi", L2: "Nội dung", M2: (o.head || "Tổng tiền") + " (nghìn đồng)", N2: "Tỉ lệ", O2: "Trạng thái" },
    listCells("F", KHOAN), listCells("G", SO_LAN), listCells("H", TONG), listCells("K", ["A", "B", "C"], 3), listCells("L", MUC_TEN, 3));
  if (o.I !== false) Object.assign(cells, { I1: "Mục chi" }, listCells("I", MUC));
  [3, 4, 5].forEach((r) => { if (o.M) cells["M" + r] = F_M(r); if (o.N) cells["N" + r] = F_N(r); });
  Object.assign(cells, o.O || {});
  return { title: "TaiChinhGiaDinh.xlsx", sheets: ["Chi tiêu", "Thu nhập"], cols: 15, rows: 11, hideCols: ["A", "B", "C", "D", "E"],
    widths: { F: 1.7, G: 0.9, H: 1.15, I: 0.7, J: 0.25, K: 0.72, L: 1.7, M: 1.15, N: 0.8, O: 1.1 },
    cells, wrap: ["H1", "I1", "K2", "M2"], bold: ["F1:I1", "F11:H11", "K1", "K2:O2"], center: ["F1:I1", "I2:I10", "K2:O2", "K3:K5"],
    fill: { "F2:F10": "#f5b9a1", "K2:O2": "#fde68a" }, color: { "G11:H11": "#dc2626" }, comma: ["H2:H11", "M3:M5"], pct: { "N3:N5": 1 },
    vary: "I2:I10", tests: TESTS_O };
}
const TH_HINH_12A_3 = thSpec({ M: true, N: true, O: { O3: F_O2[0], O4: F_O2[1], O5: F_O2[2] } });

// ---- Luyện tập: Hình 12a.7 — tỉ lệ và tiền thưởng của các đại lí ----
const TESTS_LT = [{ B2: 10000, B3: 10001, B4: 15000, B5: 15001 }, { B2: 20000, B3: 20001, B4: 9999, B5: 0 }, { B2: 25000, B3: 12000, B4: 16000, B5: 5000 }];
const ltSpec = (extra) => ({ title: "Bảng tính tỉ lệ và tiền thưởng", cols: 4, rows: 5, widths: { A: 0.8, B: 1.35, C: 1.1, D: 1.35 },
  cells: Object.assign({ A1: "Đại lí", B1: "Doanh thu (nghìn đồng)", C1: "Tỉ lệ thưởng", D1: "Số tiền (nghìn đồng)", A2: "A", A3: "B", A4: "C", A5: "D", B2: "6000", B3: "10000", B4: "12000", B5: "18000" }, extra || {}),
  wrap: ["A1:D1"], bold: ["A1:D1"], center: ["A1:D1"], comma: ["B2:B5", "D2:D5"], pct: { "C2:C5": 0 }, tests: TESTS_LT });
const col4 = (col, f) => { const o = {}; [2, 3, 4, 5].forEach((r) => { o[col + r] = f(r); }); return o; };
const LT_A = ltSpec(), LT_B = ltSpec(col4("C", (r) => "=IF(B" + r + ">10000,5%,0%)"));
const LT_C = ltSpec(col4("D", (r) => "=B" + r + "*C" + r));

// ---- Tổng kết: xếp loại Đạt / Chưa đạt (ví dụ trong giáo án) ----
const DIEM = { title: "KetQuaHocTap.xlsx", cols: 3, rows: 5, widths: { A: 1.5, B: 0.9, C: 1.1 },
  cells: { A1: "Họ tên", B1: "Điểm TB", C1: "Kết quả", A2: "Minh An", B2: "7.5", A3: "Bảo Châu", B3: "4.8", A4: "Gia Huy", B4: "5", A5: "Khánh Linh", B5: "9.2" },
  bold: ["A1:C1"], center: ["A1:C1"], fill: { "A1:C1": "#ccfbf1" }, tests: [{ B2: 5, B3: 4.99, B4: 5.01, B5: 0 }] };

// ---- Hình 12a.1: quy tắc 50-30-20 (vẽ lại) ----
const QUY_TAC_HTML = `<div style="display:flex;flex-wrap:wrap;gap:18px;align-items:center;justify-content:center">
  <svg viewBox="0 0 260 260" width="250" height="250" role="img" aria-label="Biểu đồ quy tắc 50-30-20">
    <path d="M130,130 L130,10 A120,120 0 0,1 130,250 Z" fill="#2f5bb7"/>
    <path d="M130,130 L130,250 A120,120 0 0,1 15.9,92.9 Z" fill="#ea6a1f"/>
    <path d="M130,130 L15.9,92.9 A120,120 0 0,1 130,10 Z" fill="#9ca3af"/>
    <g fill="#fff" font-weight="700" font-size="15" text-anchor="middle" font-family="Segoe UI,Arial">
      <text x="192" y="122">Nhu cầu</text><text x="192" y="140">thiết yếu</text><text x="192" y="160" font-size="20">50%</text>
      <text x="72" y="165">Mong muốn</text><text x="72" y="183">cá nhân</text><text x="72" y="203" font-size="20">30%</text>
      <text x="88" y="68">Tiết kiệm</text><text x="88" y="90" font-size="20">20%</text>
    </g>
  </svg>
  <div style="display:flex;flex-direction:column;gap:10px;min-width:260px;max-width:460px">
    <div style="border-left:8px solid #2f5bb7;background:#eff6ff;border-radius:12px;padding:8px 14px"><b>50% — Nhu cầu thiết yếu</b><br>ăn, ở, sức khoẻ, …</div>
    <div style="border-left:8px solid #ea6a1f;background:#fff7ed;border-radius:12px;padding:8px 14px"><b>30% — Mong muốn cá nhân</b><br>giải trí, thời trang, …</div>
    <div style="border-left:8px solid #9ca3af;background:#f3f4f6;border-radius:12px;padding:8px 14px"><b>20% — Tiết kiệm</b></div>
  </div>
</div>`;

// ---- Cú pháp hàm IF (vẽ lại) ----
const CU_PHAP_HTML = `<div style="text-align:center;margin:6px 0 14px">
  <div style="display:inline-block;font-family:Consolas,'Courier New',monospace;font-size:1.6rem;font-weight:800;background:#fff;border:3px solid #0f766e;border-radius:16px;padding:10px 18px">
    <span style="color:#0f766e">=IF(</span><span style="background:#fef3c7;color:#b45309;padding:0 8px;border-radius:10px">logical_test</span><span style="color:#0f766e">, </span><span style="background:#dcfce7;color:#15803d;padding:0 8px;border-radius:10px">[value_if_true]</span><span style="color:#0f766e">, </span><span style="background:#fee2e2;color:#b91c1c;padding:0 8px;border-radius:10px">[value_if_false]</span><span style="color:#0f766e">)</span></div></div>
<div style="display:flex;flex-wrap:wrap;gap:12px;justify-content:center">
  <div style="flex:1 1 220px;max-width:330px;border:2px solid #b45309;border-radius:14px;padding:10px 14px;background:#fffbeb"><b style="color:#b45309;font-size:1.1rem">logical_test</b> — điều kiện kiểm tra.<br><span style="color:#475569">Ví dụ: <code>N3&gt;50%</code></span></div>
  <div style="flex:1 1 220px;max-width:330px;border:2px solid #15803d;border-radius:14px;padding:10px 14px;background:#f0fdf4"><b style="color:#15803d;font-size:1.1rem">value_if_true</b> — giá trị trả về nếu điều kiện là đúng.<br><span style="color:#475569">Ví dụ: <code>"Nhiều hơn"</code></span></div>
  <div style="flex:1 1 220px;max-width:330px;border:2px solid #b91c1c;border-radius:14px;padding:10px 14px;background:#fef2f2"><b style="color:#b91c1c;font-size:1.1rem">value_if_false</b> — giá trị trả về nếu điều kiện là sai.<br><span style="color:#475569">Ví dụ: <code>"Ít hơn"</code></span></div>
</div>
<div style="text-align:center;margin-top:14px;font-family:Consolas,monospace;font-size:1.35rem;font-weight:800">
  =IF(<span style="background:#fef3c7;color:#b45309;padding:0 6px;border-radius:8px">N3&gt;50%</span>,<span style="background:#dcfce7;color:#15803d;padding:0 6px;border-radius:8px">"Nhiều hơn"</span>,<span style="background:#fee2e2;color:#b91c1c;padding:0 6px;border-radius:8px">"Ít hơn"</span>)</div>
<div style="text-align:center;color:#475569;margin-top:4px">Nếu tỉ lệ chi lớn hơn 50% thì nhận xét “Nhiều hơn”, còn không thì nhận xét “Ít hơn”.</div>`;

// ---- IF lồng nhau (vẽ lại) ----
const LONG_NHAU_HTML = `<div style="text-align:center;font-family:Consolas,'Courier New',monospace;font-size:1.3rem;font-weight:800;line-height:2.1">
  =IF(<span style="background:#fef3c7;color:#b45309;padding:0 6px;border-radius:8px">N3&gt;80%</span>,<span style="background:#dcfce7;color:#15803d;padding:0 6px;border-radius:8px">"Nhiều quá"</span>,<span style="border:3px dashed #b91c1c;border-radius:12px;padding:2px 8px;background:#fff">IF(<span style="background:#fef3c7;color:#b45309;padding:0 6px;border-radius:8px">N3&gt;50%</span>,<span style="background:#dcfce7;color:#15803d;padding:0 6px;border-radius:8px">"Nhiều hơn"</span>,<span style="background:#fee2e2;color:#b91c1c;padding:0 6px;border-radius:8px">"Ít hơn"</span>)</span>)
</div>
<div style="text-align:center;color:#b91c1c;font-weight:700">↑ Hàm IF thứ hai (khung đỏ) là value_if_false của hàm IF thứ nhất</div>
<div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin-top:12px">
  <div style="border:2px solid #15803d;border-radius:12px;padding:6px 14px;background:#f0fdf4">tỉ lệ &gt; 80% → <b>Nhiều quá</b></div>
  <div style="border:2px solid #15803d;border-radius:12px;padding:6px 14px;background:#f0fdf4">50% &lt; tỉ lệ ≤ 80% → <b>Nhiều hơn</b></div>
  <div style="border:2px solid #b91c1c;border-radius:12px;padding:6px 14px;background:#fef2f2">tỉ lệ ≤ 50% → <b>Ít hơn</b></div>
</div>`;

const NI = ["Nhiều hơn", "Ít hơn"], PT = ["50%", "30%", "20%"];

const LESSON = {
  meta: {
    subject: "Tin học", grade: "9", book: "Kết nối tri thức với cuộc sống",
    title: "Bài 12a: Sử dụng hàm IF", unit: "Chủ đề 4a — Sử dụng bảng tính điện tử nâng cao",
    pages: "48–51", durationMinutes: 90,
  },
  objectives: {
    knowledge: [
      "Biết dùng công thức điều kiện để tự động phân loại hoặc tính kết quả trên bảng tính.",
      "Biết ứng dụng hàm IF (và IF lồng nhau) để giải quyết các bài toán quen thuộc như thu – chi, điểm số, phân loại dữ liệu.",
    ],
    competencies: [
      "Tự chủ – tự học; giao tiếp – hợp tác; giải quyết vấn đề và sáng tạo (vận dụng IF, IF lồng nhau vào tình huống mới).",
      "Năng lực số 5.2.TC2b: thiết lập và sử dụng công thức điều kiện để tự động phân loại dữ liệu hoặc tính kết quả; xây dựng điều kiện logic, sao chép công thức, kiểm tra kết quả.",
      "Năng lực số 5.3.TC2a: vận dụng IF, IF lồng nhau kết hợp SUMIF, tính tỉ lệ, phép nhân để tạo sản phẩm bảng tính hoàn chỉnh.",
      "Năng lực AI 9.D2.1: trình bày được ví dụ về một kịch bản hội thoại cho một tình huống cụ thể ứng dụng AI.",
    ],
    qualities: ["Chăm chỉ, trung thực (báo cáo đúng kết quả, không sửa dữ liệu sai lệch), trách nhiệm."],
  },
  coreKnowledge: [
    "Hàm IF kiểm tra điều kiện và trả về một giá trị khi điều kiện đó đúng và một giá trị khác nếu điều kiện đó sai.",
    "Công thức: =IF(logical_test,[value_if_true],[value_if_false]) — logical_test: điều kiện kiểm tra; value_if_true: giá trị trả về nếu điều kiện là đúng; value_if_false: giá trị trả về nếu điều kiện là sai.",
    "Ví dụ: =IF(N3>50%,\"Nhiều hơn\",\"Ít hơn\") — nhận xét mục Nhu cầu thiết yếu theo quy tắc 50-30-20.",
    "Tiêu chí kiểm tra nhiều mức → dùng các hàm IF lồng nhau: =IF(N3>80%,\"Nhiều quá\",IF(N3>50%,\"Nhiều hơn\",\"Ít hơn\")).",
    "Kết hợp IF với SUMIF, công thức tỉ lệ (=M3/$H$11*100%) và phép nhân để hoàn thiện bảng tính quản lí tài chính.",
  ],
  keywords: ["Hàm IF", "logical_test", "value_if_true", "value_if_false", "IF lồng nhau"],
  settings: { basePoints: 100, useTimer: false, defaultTime: 60, sound: true, streakEnabled: true },

  activities: [
    /* =========================== TIẾT 1 =========================== */
    /* ===================== HĐ1: MỞ ĐẦU (5 phút) ===================== */
    {
      id: "mo-dau", name: "Mở đầu — Hộp quà may mắn 🎁", type: "giftbox",
      goal: "Ôn lại SUMIF, COUNTIF và ý nghĩa của điều kiện; nhận ra nhu cầu tự động đưa ra nhận xét theo điều kiện.",
      time: 300,
      task: "Cá nhân chọn hộp quà và trả lời câu hỏi ôn tập về hàm SUMIF, COUNTIF. Trả lời đúng thì mở quà!",
      intro: "6 hộp quà — chọn hộp → trả lời → đúng thì nhận quà 🎉",
      prizes: ["👏 Một tràng pháo tay", "⭐ Ngôi sao may mắn", "🎁 Quà bí mật từ thầy/cô", "🏅 Danh hiệu “Chuyên gia bảng tính”", "🌟 Lời khen trước lớp", "🍀 Ngôi sao may mắn"],
      questions: [
        { question: "Câu 1. Trong bảng tính điện tử, hàm SUMIF tính tổng giá trị của những ô thoả mãn mấy điều kiện?", type: "multiple-choice",
          options: ["1", "2", "3", "4"],
          answer: 0, explanation: "SUMIF tính tổng giá trị của những ô thoả mãn một điều kiện (tham số criteria).", level: "nhan-biet", activity: "mo-dau" },
        { question: "Câu 2. Trong bảng tính điện tử, hàm nào sau đây cho phép tính tổng các giá trị kiểu số thoả mãn một điều kiện cho trước?", type: "multiple-choice",
          options: ["COUNTIF", "SUM", "COUNT", "SUMIF"],
          answer: 3, explanation: "SUMIF tính tổng theo điều kiện; COUNTIF chỉ đếm; SUM, COUNT không có điều kiện.", level: "nhan-biet", activity: "mo-dau" },
        { question: "Câu 3. Muốn tính tổng của vùng E2:E8 với điều kiện “Tin học 9” trong vùng dữ liệu A2:A8, ta dùng công thức nào?", type: "multiple-choice",
          options: ["=SUMIF(A2:A8,\"Tin học 9\")", "=SUMIF(A2:E8,\"Tin học 9\",E2:E8)", "=SUMIF(A2:A8,\"Tin học 9\",E2:E8)", "=SUMIF(E2:E8,\"Tin học 9\",A2:A8)"],
          answer: 2, explanation: "range là vùng kiểm tra A2:A8, criteria \"Tin học 9\", sum_range là vùng cần cộng E2:E8.", level: "thong-hieu", activity: "mo-dau" },
        { question: "Câu 4. Muốn tính tổng các giá trị trong phạm vi A1:A5 có giá trị lớn hơn 7, em dùng công thức nào?", type: "multiple-choice",
          options: ["=SUMIF(A1:A5,\"=7\")", "=SUMIF(A1:A5,\"<7\")", "=SUMIF(A1:A5,\">7\")", "=SUMIF(A1:A5,\">=7\")"],
          answer: 2, explanation: "“Lớn hơn 7” là \">7\" (không lấy 7). Không có sum_range → cộng chính các ô của A1:A5.", level: "thong-hieu", activity: "mo-dau" },
        { question: "Câu 5. COUNTIF và SUMIF giống nhau ở điểm nào?", type: "multiple-choice",
          options: ["Đều có tham số điều kiện kiểm tra (criteria)", "Đều đếm số ô", "Đều tính tổng", "Đều không cần vùng dữ liệu"],
          answer: 0, explanation: "Cả hai đều kiểm tra điều kiện criteria; COUNTIF đếm, SUMIF tính tổng.", level: "thong-hieu", activity: "mo-dau" },
        { question: "Câu 6. Gia đình chi 90.5% cho Nhu cầu thiết yếu, quy tắc tài chính khuyên 50%. Muốn bảng tính TỰ ĐỘNG ghi nhận xét “Nhiều hơn” hay “Ít hơn”, em cần:", type: "multiple-choice",
          options: ["Hàm COUNTIF", "Một hàm kiểm tra điều kiện rồi trả về giá trị tương ứng", "Hàm SUMIF", "Hàm SUM"],
          answer: 1, explanation: "COUNTIF đếm, SUMIF cộng — không ghi được nhận xét. Bài này học hàm điều kiện IF: kiểm tra điều kiện rồi trả về giá trị tương ứng.", level: "van-dung", activity: "mo-dau" },
      ],
    },

    /* ===================== HĐ2.1: HÀM IF (20 phút) ===================== */
    {
      id: "quy-tac-50-30-20", name: "Quy tắc quản lí tài chính 50-30-20 🥧", type: "knowledge",
      goal: "Biết quy tắc 50-30-20 để đánh giá việc chi tiêu đã cân đối, hợp lí hay chưa.",
      time: 240,
      task: "Đọc phần mở đầu SGK tr.48 và quan sát Hình 12a.1: quy tắc 50-30-20 khuyên chia số tiền như thế nào?",
      sgkImage: "assets/sgk/hinh-12a-1.jpg",
      content: {
        heading: "🥧 Chi tiêu thế nào là cân đối?",
        prompt: "Dựa trên số liệu tổng hợp bằng COUNTIF, SUMIF, để biết việc chi tiêu đã cân đối, hợp lí hay chưa, em có thể sử dụng một số quy tắc quản lí tài chính, ví dụ quy tắc 50-30-20.",
        revealLabel: "🥧 Hình 12a.1 — Quy tắc 50-30-20",
        blocks: [
          { kind: "html", value: QUY_TAC_HTML },
          { kind: "text", value: "Quy tắc 50-30-20 khuyên dành 50% số tiền cho nhu cầu thiết yếu (ăn, ở, sức khoẻ,…), 30% cho mong muốn cá nhân (giải trí, thời trang,…) và 20% cho tiết kiệm. Tỉ lệ 50-30-20 có thể linh hoạt điều chỉnh cho phù hợp tình hình thực tiễn." },
        ],
      },
      questions: [
        { question: "Theo quy tắc 50-30-20, phần nào được khuyên dành 30% số tiền?", type: "multiple-choice",
          options: ["Nhu cầu thiết yếu", "Mong muốn cá nhân (giải trí, thời trang,…)", "Tiết kiệm", "Tiền ăn"],
          answer: 1, explanation: "50% nhu cầu thiết yếu · 30% mong muốn cá nhân · 20% tiết kiệm.", level: "nhan-biet", activity: "quy-tac-50-30-20" },
        { question: "Một gia đình có thu nhập 20 triệu đồng/tháng. Theo quy tắc 50-30-20, nên dành bao nhiêu cho tiết kiệm?", type: "multiple-choice",
          options: ["2 triệu đồng", "6 triệu đồng", "4 triệu đồng", "10 triệu đồng"],
          answer: 2, explanation: "20% × 20 triệu = 4 triệu đồng.", level: "van-dung", activity: "quy-tac-50-30-20" },
        { question: "Tỉ lệ 50-30-20 có thể linh hoạt điều chỉnh cho phù hợp tình hình thực tiễn.", type: "true-false", answer: true,
          explanation: "SGK: “Dĩ nhiên tỉ lệ 50-30-20 có thể linh hoạt điều chỉnh sao cho phù hợp tình hình thực tiễn.”", level: "thong-hieu", activity: "quy-tac-50-30-20" },
      ],
    },
    {
      id: "phan-loai-muc-chi", name: "Hoạt động 1: Xếp khoản chi vào mục chi A, B, C 🗂️", type: "dragdrop",
      goal: "Bổ sung dữ liệu Mục chi cho bảng tổng hợp khoản chi (cột I, Hình 12a.2).",
      time: 180,
      task: "Nhóm 3–4 bạn đọc Hoạt động 1 (SGK tr.48): mục A là Nhu cầu thiết yếu, B là Mong muốn cá nhân, C là Tiết kiệm. Xếp mỗi khoản chi vào đúng mục như cột I trong Hình 12a.2, rồi bấm Nộp bài.",
      sgkImage: "assets/sgk/hinh-12a-2.jpg",
      groups: ["A — Nhu cầu thiết yếu", "B — Mong muốn cá nhân", "C — Tiết kiệm"],
      items: [
        { text: "Ở", group: 0 }, { text: "Ăn", group: 0 }, { text: "Di chuyển", group: 0 }, { text: "Học tập", group: 0 }, { text: "Sức khoẻ", group: 0 },
        { text: "Giải trí", group: 1 }, { text: "Quà tặng/Từ thiện", group: 1 }, { text: "Khác", group: 1 }, { text: "Tiết kiệm", group: 2 },
      ],
      explanation: "Hình 12a.2: Ở, Ăn, Di chuyển, Học tập, Sức khoẻ → A; Giải trí, Quà tặng/Từ thiện, Khác → B; Tiết kiệm → C.",
    },
    {
      id: "hd1-cot-m", name: "Hoạt động 1 — Câu 1: Công thức cột M (Tổng tiền) ➕", type: "knowledge",
      goal: "Nêu và nhập công thức SUMIF tính tổng tiền của mỗi mục chi.",
      time: 420,
      task: "HĐ1 câu 1 (nhóm): dựa vào dữ liệu Hình 12a.2, nêu công thức ở các ô của cột M trong Hình 12a.3. Một bạn lên nhập công thức M3 trên bảng mô phỏng rồi sao chép sang M4, M5.",
      sgkImage: "assets/sgk/hoat-dong-1.jpg",
      sheet: thSpec(),
      questions: [
        { question: "Công thức tại ô M3 tính tổng tiền của mục chi A (Nhu cầu thiết yếu) là:", type: "multiple-choice",
          options: ["=SUM(H2:H10)", "=COUNTIF($I$2:$I$10,K3)", "=SUMIF($I$2:$I$10,K3,$H$2:$H$10)", "=SUMIF($H$2:$H$10,K3,$I$2:$I$10)"],
          answer: 2, explanation: "range là cột Mục chi $I$2:$I$10, điều kiện là ô K3 (A), sum_range là cột Tổng tiền $H$2:$H$10.", level: "thong-hieu", activity: "hd1-cot-m" },
        { question: "Tại ô M3 nhập công thức tính tổng tiền của mục chi A (dùng ô K3 làm điều kiện), rồi sao chép sang M4, M5.", type: "sheet", mode: "formula", target: "M3:M5", answer: F_M(3),
          explanation: "=SUMIF($I$2:$I$10,K3,$H$2:$H$10) → A: 12,340 · B: 300 · C: 1,000 (như Hình 12a.3).",
          hint: "Giống Bài 11a: range $I$2:$I$10, criteria K3, sum_range $H$2:$H$10. Nhập M3 rồi kéo nút điền ■ xuống M5.", level: "van-dung", activity: "hd1-cot-m" },
      ],
    },
    {
      id: "hd1-cot-n", name: "Hoạt động 1 — Câu 1, 2: Tỉ lệ (cột N) và quy tắc nhận xét 📊", type: "knowledge",
      goal: "Tính tỉ lệ chi của mỗi mục so với tổng tiền; viết quy tắc đưa ra nhận xét theo quy tắc 50-30-20.",
      time: 420,
      task: "Tỉ lệ ở cột N là tổng tiền của mỗi mục chi so với tổng tiền của tất cả các khoản (ô H11). Nhập công thức ở N3, sao chép sang N4, N5; sau đó viết quy tắc để đưa ra nhận xét ở cột O (HĐ1 câu 2).",
      sgkImage: "assets/sgk/hinh-12a-3.jpg",
      sheet: thSpec({ M: true }),
      questions: [
        { question: "Tại ô N3 nhập công thức tính tỉ lệ chi của mục A so với tổng tiền ở ô H11, rồi sao chép sang N4, N5.", type: "sheet", mode: "formula", target: "N3:N5", answer: F_N(3),
          explanation: "=M3/$H$11*100% → 90.5% · 2.2% · 7.3%. $H$11 là địa chỉ tuyệt đối để khi sao chép vẫn chia cho tổng tiền.",
          hint: "Lấy M3 chia cho tổng tiền ở H11 (thêm $ để sao chép), nhân 100%.", level: "van-dung", activity: "hd1-cot-n" },
        { question: "Vì sao công thức ở N3 dùng $H$11 mà không dùng H11?", type: "multiple-choice",
          options: ["Để công thức ngắn hơn", "Để khi sao chép sang N4, N5 vẫn chia cho tổng tiền ở ô H11", "Vì H11 chứa chữ", "Vì hàm IF bắt buộc có dấu $"],
          answer: 1, explanation: "Nếu dùng H11, sao chép xuống N4 thành =M4/H12*100% — ô H12 trống nên báo lỗi #DIV/0!.", level: "thong-hieu", activity: "hd1-cot-n" },
        { question: "HĐ1 câu 2: Quy tắc nào dùng để đưa ra nhận xét ở cột O (Hình 12a.3) theo quy tắc 50-30-20?", type: "multiple-choice",
          options: ["Nếu tổng tiền của mục lớn hơn 1,000 thì “Nhiều hơn”, còn không thì “Ít hơn”", "Mục nào có tỉ lệ lớn nhất thì “Nhiều hơn”, các mục khác “Ít hơn”", "Nếu số lần chi lớn hơn 1 thì “Nhiều hơn”, còn không thì “Ít hơn”", "Nếu tỉ lệ chi của mục lớn hơn tỉ lệ theo quy tắc (A: 50%, B: 30%, C: 20%) thì “Nhiều hơn”, còn không thì “Ít hơn”"],
          answer: 3, explanation: "Ví dụ mục Nhu cầu thiết yếu: Nếu tỉ lệ chi lớn hơn 50% thì nhận xét là “Nhiều hơn”, còn không thì nhận xét là “Ít hơn”.", level: "van-dung", activity: "hd1-cot-n" },
      ],
    },
    {
      id: "so-sanh-ti-le", name: "So sánh tỉ lệ thực tế với quy tắc 50-30-20 ⚖️", type: "fillblank",
      goal: "Nhận xét dữ liệu tỉ lệ ở cột N (Hình 12a.3) so với Hình 12a.1.",
      time: 180,
      task: "Nhóm so sánh tỉ lệ ở cột N (Hình 12a.3) với tỉ lệ trong Hình 12a.1: chọn tỉ lệ theo quy tắc và nhận xét cho từng mục chi. Làm hết rồi bấm Nộp bài.",
      sgkImage: "assets/sgk/hinh-12a-3.jpg",
      text: "Nhu cầu thiết yếu: thực tế 90.5% — quy tắc {{}} → {{}}\nMong muốn cá nhân: thực tế 2.2% — quy tắc {{}} → {{}}\nTiết kiệm: thực tế 7.3% — quy tắc {{}} → {{}}",
      answers: [["50%"], ["Nhiều hơn"], ["30%"], ["Ít hơn"], ["20%"], ["Ít hơn"]],
      choices: [PT, NI, PT, NI, PT, NI],
      explanation: "90.5% > 50% → Nhiều hơn · 2.2% < 30% → Ít hơn · 7.3% < 20% → Ít hơn. Để bảng tính TỰ ĐIỀN nhận xét vào cột O, ta dùng hàm điều kiện IF.",
    },
    {
      id: "ham-if", name: "Hàm IF — công thức chung ✨", type: "knowledge",
      goal: "Hiểu công thức chung, ý nghĩa các tham số của hàm IF; nhập công thức IF ở ô O3.",
      time: 480,
      task: "Nhóm đọc SGK tr.49: công thức chung của hàm IF. Cho biết ý nghĩa các tham số trong =IF(N3>50%,\"Nhiều hơn\",\"Ít hơn\"), rồi nhập công thức này vào ô O3 trên bảng mô phỏng.",
      sgkImage: "assets/sgk/sgk-trang49.jpg",
      sheet: thSpec({ M: true, N: true }),
      content: {
        heading: "✨ Hàm điều kiện IF",
        revealLabel: "📖 Công thức chung của hàm IF",
        blocks: [
          { kind: "html", value: CU_PHAP_HTML },
          { kind: "text", value: "🤖 Mở rộng — hỏi AI: “Hãy cho biết cú pháp của hàm IF và giải thích ý nghĩa của từng tham số.” Luôn kiểm chứng câu trả lời của AI bằng cách nhập thử công thức trên bảng tính." },
        ],
      },
      questions: [
        { question: "Trong công thức =IF(N3>50%,\"Nhiều hơn\",\"Ít hơn\"), N3>50% là:", type: "multiple-choice",
          options: ["logical_test — điều kiện kiểm tra", "value_if_true — giá trị trả về nếu điều kiện đúng", "value_if_false — giá trị trả về nếu điều kiện sai", "Địa chỉ ô chứa kết quả"],
          answer: 0, explanation: "N3>50%: điều kiện kiểm tra · \"Nhiều hơn\": giá trị trả về nếu đúng · \"Ít hơn\": giá trị trả về nếu sai.", level: "nhan-biet", activity: "ham-if" },
        { question: "Tại ô O3 nhập công thức nhận xét mục Nhu cầu thiết yếu: nếu tỉ lệ chi (N3) lớn hơn 50% thì “Nhiều hơn”, còn không thì “Ít hơn”.", type: "sheet", mode: "formula", target: "O3", answer: F_O2[0],
          explanation: "=IF(N3>50%,\"Nhiều hơn\",\"Ít hơn\") → 90.5% > 50% nên O3 hiện “Nhiều hơn”. Chữ trả về phải đặt trong dấu ngoặc kép.",
          hint: "=IF( điều kiện , \"giá trị nếu đúng\" , \"giá trị nếu sai\" )", level: "van-dung", activity: "ham-if" },
        { question: "Nếu tỉ lệ ở N3 đúng bằng 50% thì công thức =IF(N3>50%,\"Nhiều hơn\",\"Ít hơn\") cho kết quả gì?", type: "multiple-choice",
          options: ["Nhiều hơn", "Báo lỗi", "Ô trống", "Ít hơn"],
          answer: 3, explanation: "50% > 50% là SAI (không lớn hơn) → trả về value_if_false: “Ít hơn”.", level: "van-dung", activity: "ham-if" },
      ],
      remember: [
        "Hàm IF kiểm tra điều kiện và trả về một giá trị khi điều kiện đó đúng và một giá trị khác nếu điều kiện đó sai.",
        "Công thức: =IF(logical_test,[value_if_true],[value_if_false]) — logical_test: điều kiện kiểm tra; value_if_true: giá trị trả về nếu điều kiện là đúng; value_if_false: giá trị trả về nếu điều kiện là sai.",
      ],
    },
    {
      id: "tham-so-if", name: "Ghép tham số hàm IF với ý nghĩa 🧩", type: "matching",
      goal: "Nhớ ý nghĩa ba tham số và kết quả của hàm IF.",
      time: 180,
      task: "Ghép mỗi tham số / công thức ở cột trái với ý nghĩa hoặc kết quả đúng ở cột phải. Làm hết rồi bấm Nộp bài.",
      sgkImage: "assets/sgk/em-can-nho.jpg",
      pairs: [
        { left: "logical_test", right: "Điều kiện kiểm tra" },
        { left: "value_if_true", right: "Giá trị trả về nếu điều kiện là đúng" },
        { left: "value_if_false", right: "Giá trị trả về nếu điều kiện là sai" },
        { left: "=IF(N3>50%,\"Nhiều hơn\",\"Ít hơn\") với N3 = 90.5%", right: "Nhiều hơn" },
        { left: "=IF(N4>30%,\"Nhiều hơn\",\"Ít hơn\") với N4 = 2.2%", right: "Ít hơn" },
      ],
      explanation: "90.5% > 50% đúng → “Nhiều hơn”; 2.2% > 30% sai → “Ít hơn”.",
    },
    {
      id: "may-if", name: "Máy IF trực quan 🔀", type: "knowledge",
      goal: "Quan sát hàm IF và IF lồng nhau kiểm tra điều kiện, chọn nhánh Đúng/Sai và trả về kết quả.",
      time: 300,
      task: "Kéo thanh (hoặc gõ) tỉ lệ ở ô N3; quan sát nhánh Đúng/Sai sáng lên và kết quả ở ô O3. Thử các mốc 50%, 50.1%, 80% ở cả hai chế độ rồi trả lời câu hỏi.",
      ifmachine: {
        title: "Máy IF — nhận xét mục Nhu cầu thiết yếu", intro: "Kéo thanh hoặc gõ tỉ lệ chi ở ô N3. Điều kiện được kiểm tra từ trên xuống: gặp điều kiện Đúng thì trả về kết quả của nó.",
        label: "Tỉ lệ chi Nhu cầu thiết yếu", cell: "N3", outCell: "O3", pct: true, min: 0, max: 100, step: 0.1, value: 90.5,
        presets: [{ label: "90.5% (Hình 12a.3)", value: 90.5 }, { label: "50%", value: 50 }, { label: "50.1%", value: 50.1 }, { label: "80%", value: 80 }, { label: "35%", value: 35 }],
        modes: [
          { name: "IF — 2 mức", formula: F_O2[0], levels: [{ gt: 50, result: "Nhiều hơn" }], otherwise: "Ít hơn" },
          { name: "IF lồng nhau — 3 mức", formula: F_O3[0], levels: [{ gt: 80, result: "Nhiều quá" }, { gt: 50, result: "Nhiều hơn" }], otherwise: "Ít hơn" },
        ],
      },
      questions: [
        { question: "Chế độ IF lồng nhau — 3 mức: tỉ lệ N3 = 80% thì O3 hiện gì?", type: "multiple-choice",
          options: ["Nhiều hơn", "Nhiều quá", "Ít hơn", "Báo lỗi"],
          answer: 0, explanation: "80% > 80% sai → xét tiếp 80% > 50% đúng → “Nhiều hơn”.", level: "van-dung", activity: "may-if" },
        { question: "Chế độ IF lồng nhau — 3 mức: tỉ lệ N3 = 35% thì cả hai điều kiện đều sai, O3 hiện “Ít hơn”.", type: "true-false", answer: true,
          explanation: "35% > 80% sai, 35% > 50% sai → trả về giá trị cuối cùng “Ít hơn”.", level: "thong-hieu", activity: "may-if" },
      ],
    },
    {
      id: "if-long-nhau", name: "IF lồng nhau — nhận xét nhiều mức 🔁", type: "knowledge",
      goal: "Hiểu cách dùng các hàm IF lồng nhau khi tiêu chí kiểm tra có nhiều mức.",
      time: 360,
      task: "Đọc SGK tr.49, quan sát Hình 12a.4: mục Nhu cầu thiết yếu được nhận xét theo hai mức (80%, 50%). Hàm IF thứ hai được đặt ở vị trí nào trong hàm IF thứ nhất? Vì sao phải kiểm tra 80% trước?",
      sgkImage: "assets/sgk/hinh-12a-4.jpg",
      content: {
        heading: "🔁 Nhận xét chi tiết hơn: Nhiều quá — Nhiều hơn — Ít hơn",
        prompt: "Nếu tỉ lệ chi lớn hơn 80% thì nhận xét “Nhiều quá”, nếu tỉ lệ chi lớn hơn 50% thì nhận xét “Nhiều hơn”, còn không thì nhận xét là “Ít hơn”.",
        revealLabel: "🔁 Hai hàm IF lồng nhau (Hình 12a.4)",
        blocks: [
          { kind: "html", value: LONG_NHAU_HTML },
          { kind: "image", value: "assets/sgk/hinh-12a-4.jpg", caption: "Hình 12a.4. Sử dụng hai hàm IF lồng nhau" },
        ],
      },
      questions: [
        { question: "Trong =IF(N3>80%,\"Nhiều quá\",IF(N3>50%,\"Nhiều hơn\",\"Ít hơn\")), hàm IF thứ hai là tham số nào của hàm IF thứ nhất?", type: "multiple-choice",
          options: ["logical_test", "value_if_true", "value_if_false", "Không thuộc tham số nào"],
          answer: 2, explanation: "Khi N3>80% sai, hàm IF thứ nhất trả về value_if_false — chính là hàm IF thứ hai, kiểm tra tiếp N3>50%.", level: "thong-hieu", activity: "if-long-nhau" },
        { question: "Bạn Lan viết =IF(N3>50%,\"Nhiều hơn\",IF(N3>80%,\"Nhiều quá\",\"Ít hơn\")). Với N3 = 90.5%, kết quả là gì?", type: "multiple-choice",
          options: ["Nhiều quá", "Ít hơn", "Nhiều hơn — sai ý muốn, vì điều kiện >50% đúng trước nên không bao giờ xét đến >80%", "Báo lỗi"],
          answer: 2, explanation: "Điều kiện được kiểm tra từ ngoài vào trong. 90.5% > 50% đúng ngay → “Nhiều hơn”. Phải kiểm tra mốc lớn (80%) trước.", level: "van-dung-cao", activity: "if-long-nhau" },
        { question: "Tỉ lệ N3 = 65%. Công thức =IF(N3>80%,\"Nhiều quá\",IF(N3>50%,\"Nhiều hơn\",\"Ít hơn\")) cho kết quả:", type: "multiple-choice",
          options: ["Nhiều quá", "Nhiều hơn", "Ít hơn", "65%"],
          answer: 1, explanation: "65% > 80% sai → IF thứ hai: 65% > 50% đúng → “Nhiều hơn”.", level: "van-dung", activity: "if-long-nhau" },
      ],
      remember: ["Trường hợp tiêu chí kiểm tra cần thoả mãn nhiều mức, em sử dụng các hàm IF lồng nhau: =IF(N3>80%,\"Nhiều quá\",IF(N3>50%,\"Nhiều hơn\",\"Ít hơn\"))."],
    },
    {
      id: "so-do-if", name: "Ghép sơ đồ IF lồng nhau 🧩", type: "dragdrop", layout: "ifchain",
      goal: "Hiểu thứ tự kiểm tra điều kiện của hai hàm IF lồng nhau.",
      time: 180,
      task: "Xếp các điều kiện và kết quả vào đúng ô của sơ đồ khối biểu diễn =IF(N3>80%,\"Nhiều quá\",IF(N3>50%,\"Nhiều hơn\",\"Ít hơn\")). Xếp hết rồi bấm Nộp bài.",
      sgkImage: "assets/sgk/hinh-12a-4.jpg",
      groups: ["◇ Điều kiện kiểm tra thứ nhất", "Trả về (điều kiện 1 đúng)", "◇ Điều kiện kiểm tra thứ hai", "Trả về (điều kiện 2 đúng)", "Trả về (cả hai điều kiện sai)"],
      items: [
        { text: "N3>80%", group: 0 }, { text: "“Nhiều quá”", group: 1 }, { text: "N3>50%", group: 2 }, { text: "“Nhiều hơn”", group: 3 }, { text: "“Ít hơn”", group: 4 },
      ],
      explanation: "Kiểm tra N3>80% trước: đúng → “Nhiều quá”; sai → kiểm tra N3>50%: đúng → “Nhiều hơn”; sai → “Ít hơn”.",
    },
    {
      id: "doan-ket-qua", name: "Trò chơi: Đoán kết quả hàm IF 🐝", type: "penguin",
      pet: "🐝", homeIcon: "🌻", enemy: "🐻", saveWord: "chú ong về với vườn hoa",
      winText: "Cả đàn ong đã về vườn hoa — em đoán kết quả hàm IF thật chuẩn!",
      goal: "Củng cố cách hàm IF, IF lồng nhau kiểm tra điều kiện và trả về kết quả.",
      time: 300,
      task: "Đọc công thức và giá trị của ô, đoán nhanh kết quả hàm IF. Mỗi câu đúng một chú ong 🐝 về vườn hoa 🌻 trước khi chú gấu 🐻 tới!",
      intro: "Mỗi câu đúng: một chú ong 🐝 về vườn hoa 🌻. Sai thì chú gấu 🐻 tới gần!",
      questions: [
        { question: "=IF(N3>50%,\"Nhiều hơn\",\"Ít hơn\") với N3 = 90.5%", type: "multiple-choice",
          options: ["Ít hơn", "Nhiều hơn", "90.5%", "Nhiều quá"],
          answer: 1, explanation: "90.5% > 50% đúng → “Nhiều hơn”.", level: "nhan-biet", activity: "doan-ket-qua" },
        { question: "=IF(N5>20%,\"Nhiều hơn\",\"Ít hơn\") với N5 = 20%", type: "multiple-choice",
          options: ["Nhiều hơn", "Báo lỗi", "Ít hơn", "20%"],
          answer: 2, explanation: "20% > 20% sai → “Ít hơn”.", level: "thong-hieu", activity: "doan-ket-qua" },
        { question: "=IF(B2>=5,\"Đạt\",\"Chưa đạt\") với B2 = 5", type: "multiple-choice",
          options: ["Đạt", "Chưa đạt", "5", "Báo lỗi"],
          answer: 0, explanation: ">= là lớn hơn hoặc bằng: 5 >= 5 đúng → “Đạt”.", level: "thong-hieu", activity: "doan-ket-qua" },
        { question: "=IF(N3>80%,\"Nhiều quá\",IF(N3>50%,\"Nhiều hơn\",\"Ít hơn\")) với N3 = 85%", type: "multiple-choice",
          options: ["Nhiều hơn", "Ít hơn", "85%", "Nhiều quá"],
          answer: 3, explanation: "85% > 80% đúng ngay → “Nhiều quá”.", level: "van-dung", activity: "doan-ket-qua" },
        { question: "=IF(N3>80%,\"Nhiều quá\",IF(N3>50%,\"Nhiều hơn\",\"Ít hơn\")) với N3 = 50%", type: "multiple-choice",
          options: ["Nhiều hơn", "Ít hơn", "Nhiều quá", "Báo lỗi"],
          answer: 1, explanation: "50% > 80% sai; 50% > 50% sai → “Ít hơn”.", level: "van-dung", activity: "doan-ket-qua" },
        { question: "=IF(B2>10000,5%,0%) với B2 = 10,000", type: "multiple-choice",
          options: ["5%", "10000", "0%", "Báo lỗi"],
          answer: 2, explanation: "10,000 > 10000 sai (không lớn hơn) → 0%.", level: "van-dung", activity: "doan-ket-qua" },
        { question: "=IF(B2>20000,6%,IF(B2>15000,4%,IF(B2>10000,2%,0%))) với B2 = 18,000", type: "multiple-choice",
          options: ["6%", "4%", "2%", "0%"],
          answer: 1, explanation: "18,000 > 20000 sai → 18,000 > 15000 đúng → 4%.", level: "van-dung-cao", activity: "doan-ket-qua" },
        { question: "=IF(N4>30%,\"Nhiều hơn\",\"Ít hơn\") với N4 = 2.2%", type: "multiple-choice",
          options: ["Ít hơn", "Nhiều hơn", "Nhiều quá", "2.2%"],
          answer: 0, explanation: "2.2% > 30% sai → “Ít hơn”.", level: "nhan-biet", activity: "doan-ket-qua" },
      ],
    },

    /* =========================== TIẾT 2 =========================== */
    /* ===================== HĐ2.2: THỰC HÀNH SỬ DỤNG HÀM IF (50 phút) ===================== */
    {
      id: "cac-buoc", name: "Nhiệm vụ thực hành — Sắp xếp các bước 🔢", type: "ordering",
      goal: "Nắm quy trình bổ sung cột Mục chi và tạo bảng tổng hợp mục chi.",
      time: 180,
      task: "Nhiệm vụ (SGK tr.50): bổ sung cột Mục chi cho bảng tổng hợp khoản chi và tạo bảng tổng hợp các mục chi. Sắp xếp các bước theo hướng dẫn a), b), c) rồi bấm Nộp bài.",
      sgkImage: "assets/sgk/sgk-trang50.jpg",
      steps: [
        "Mở bảng tính TaiChinhGiaDinh.xlsx, chọn trang tính Chi tiêu",
        "Tại cột I, bổ sung tiêu đề Mục chi và nhập dữ liệu (Hình 12a.2)",
        "Trong vùng K1:O5, tạo bảng dữ liệu tổng hợp mục chi (Hình 12a.5)",
        "Tại ô M3 nhập =SUMIF($I$2:$I$10,K3,$H$2:$H$10), sao chép sang M4, M5",
        "Tại ô N3 nhập =M3/$H$11*100%, sao chép sang N4, N5",
        "Tại các ô O3, O4, O5 nhập công thức IF để điền nhận xét",
        "Lưu bảng tính",
      ],
      explanation: "a) Tạo bảng dữ liệu (cột I, vùng K1:O5) → b) Tính Tổng chi (SUMIF) và Tỉ lệ → c) Điền nhận xét bằng hàm IF → Lưu bảng tính.",
    },
    {
      id: "thuc-hanh-ab", name: "Thực hành a), b) Tạo bảng, tính Tổng chi và Tỉ lệ 🧾", type: "knowledge",
      goal: "Tạo bảng tổng hợp mục chi; tính Tổng chi bằng SUMIF và Tỉ lệ của mỗi mục chi.",
      time: 900,
      task: "Trên Excel: mở TaiChinhGiaDinh.xlsx, trang Chi tiêu; bổ sung cột Mục chi (I), tạo bảng K1:O5 (Hình 12a.5); tại M3 nhập =SUMIF($I$2:$I$10,K3,$H$2:$H$10), N3 nhập =M3/$H$11*100%, sao chép xuống; lưu bảng tính. Làm thử trên bảng mô phỏng rồi trả lời câu hỏi.",
      sgkImage: "assets/sgk/hinh-12a-6.jpg",
      sandbox: Object.assign(thSpec({ head: "Tổng chi" }), { intro: "🧪 Bảng tính thử (Hình 12a.5, 12a.6): nhập công thức vào M3, N3 rồi kéo nút điền ■ xuống hàng 5." }),
      questions: [
        { question: "Sau khi nhập công thức ở M3 và sao chép, các ô M3, M4, M5 lần lượt bằng:", type: "multiple-choice",
          options: ["920 · 8,000 · 600", "12,340 · 300 · 1,000", "13,640 · 0 · 0", "5 · 3 · 1"],
          answer: 1, explanation: "A = 920 + 8,000 + 600 + 2,200 + 620 = 12,340; B = 0 + 300 + 0 = 300; C = 1,000.", level: "van-dung", activity: "thuc-hanh-ab" },
        { question: "Bạn Nam nhập ô N3 là =M3/H11*100% rồi sao chép xuống N4. Ô N4 hiển thị gì?", type: "multiple-choice",
          options: ["2.2%", "90.5%", "#DIV/0! vì N4 thành =M4/H12*100%, ô H12 trống", "0%"],
          answer: 2, explanation: "Không có $, H11 bị dời thành H12 (ô trống = 0) → chia cho 0 → #DIV/0!. Cần viết $H$11.", level: "van-dung-cao", activity: "thuc-hanh-ab" },
        { question: "Tổng ba tỉ lệ N3 + N4 + N5 bằng bao nhiêu?", type: "multiple-choice",
          options: ["100%, vì mỗi khoản chi thuộc đúng một mục chi", "50%", "90.5%", "Không tính được"],
          answer: 0, explanation: "12,340 + 300 + 1,000 = 13,640 = H11 → 90.5% + 2.2% + 7.3% = 100%. Đây là cách kiểm tra kết quả.", level: "van-dung", activity: "thuc-hanh-ab" },
        { question: "Ô N3 hiển thị 90.5% (định dạng phần trăm). Khi so sánh trong hàm IF, điều kiện N3>50% là:", type: "multiple-choice",
          options: ["Sai, vì 90.5 < 50%", "Báo lỗi vì N3 có kí hiệu %", "Không so sánh được", "Đúng, vì giá trị trong ô (khoảng 0.905) lớn hơn 50% (= 0.5)"],
          answer: 3, explanation: "50% = 0.5; giá trị thật trong ô N3 = 12,340 / 13,640 ≈ 0.905 → N3>50% đúng.", level: "thong-hieu", activity: "thuc-hanh-ab" },
      ],
    },
    {
      id: "thuc-hanh-c", name: "Câu hỏi SGK & Thực hành c) Điền nhận xét cột Trạng thái 💬", type: "knowledge",
      goal: "Dùng hàm IF điền nhận xét vào cột Trạng thái của từng mục chi.",
      time: 600,
      task: "Câu hỏi SGK tr.49 và thực hành c): ô O3 đã có =IF(N3>50%,\"Nhiều hơn\",\"Ít hơn\"). Viết công thức trong các ô O4 và O5 để nhận xét tình trạng của mục Mong muốn cá nhân và Tiết kiệm dựa trên quy tắc 50-30-20; lưu bảng tính.",
      sgkImage: "assets/sgk/cau-hoi-tr49.jpg",
      questions: [
        { question: "Tại ô O4 nhập công thức nhận xét mục Mong muốn cá nhân (quy tắc 30%).", type: "sheet", mode: "formula", target: "O4", answer: F_O2[1],
          sheet: thSpec({ M: true, N: true, head: "Tổng chi", O: { O3: F_O2[0] } }),
          explanation: "=IF(N4>30%,\"Nhiều hơn\",\"Ít hơn\") → 2.2% > 30% sai → “Ít hơn”.", hint: "Giống O3, nhưng xét ô N4 và mốc 30%.", level: "van-dung", activity: "thuc-hanh-c" },
        { question: "Tại ô O5 nhập công thức nhận xét mục Tiết kiệm (quy tắc 20%).", type: "sheet", mode: "formula", target: "O5", answer: F_O2[2],
          sheet: thSpec({ M: true, N: true, head: "Tổng chi", O: { O3: F_O2[0], O4: F_O2[1] } }),
          explanation: "=IF(N5>20%,\"Nhiều hơn\",\"Ít hơn\") → 7.3% > 20% sai → “Ít hơn”.", hint: "Xét ô N5 và mốc 20%.", level: "van-dung", activity: "thuc-hanh-c" },
        { question: "Vì sao KHÔNG thể sao chép công thức ở O3 xuống O4, O5 như cột M, N?", type: "multiple-choice",
          options: ["Vì hàm IF không sao chép được", "Vì mỗi mục chi có mốc so sánh khác nhau (50%, 30%, 20%)", "Vì cột O chứa chữ", "Vì O4, O5 đã có dữ liệu"],
          answer: 1, explanation: "Sao chép O3 xuống O4 được =IF(N4>50%,…) — sai mốc. Mục B so với 30%, mục C so với 20%.", level: "van-dung-cao", activity: "thuc-hanh-c" },
        { question: "Theo bảng tổng hợp (Hình 12a.3), nhận xét nào đúng về chi tiêu của gia đình?", type: "multiple-choice",
          options: ["Chi tiêu đã cân đối theo quy tắc 50-30-20", "Chi quá nhiều cho mong muốn cá nhân", "Tiết kiệm nhiều hơn quy tắc", "Chi cho nhu cầu thiết yếu nhiều hơn quy tắc, tiết kiệm ít hơn quy tắc"],
          answer: 3, explanation: "Nhu cầu thiết yếu 90.5% (Nhiều hơn 50%), Tiết kiệm 7.3% (Ít hơn 20%) → chưa cân đối.", level: "van-dung", activity: "thuc-hanh-c" },
      ],
      remember: ["O3: =IF(N3>50%,\"Nhiều hơn\",\"Ít hơn\") · O4: =IF(N4>30%,\"Nhiều hơn\",\"Ít hơn\") · O5: =IF(N5>20%,\"Nhiều hơn\",\"Ít hơn\")."],
    },

    /* ===================== HĐ3: LUYỆN TẬP (10 phút) ===================== */
    {
      id: "luyen-tap", name: "Luyện tập: Tỉ lệ và tiền thưởng của các đại lí 💰", type: "knowledge",
      goal: "Vận dụng IF, IF lồng nhau và phép nhân để tính tỉ lệ thưởng, số tiền thưởng.",
      time: 720,
      task: "Luyện tập SGK tr.51: tạo bảng như Hình 12a.7 trên Excel và thực hiện a) tính tỉ lệ thưởng (cột C); b) tính số tiền thưởng (cột D); c) chỉnh sửa công thức câu a) theo quy tắc thưởng mới. Doanh thu tính bằng nghìn đồng: 10 triệu = 10000.",
      sgkImage: "assets/sgk/luyen-tap.jpg",
      ifmachine: {
        title: "Máy IF — tỉ lệ thưởng của đại lí", intro: "Kéo thanh hoặc gõ doanh thu (nghìn đồng); chọn quy tắc câu a) hoặc câu c).",
        label: "Doanh thu", cell: "B2", outCell: "C2", unit: "nghìn đồng", min: 0, max: 25000, step: 500, value: 12000,
        presets: [{ label: "A: 6,000", value: 6000 }, { label: "B: 10,000", value: 10000 }, { label: "C: 12,000", value: 12000 }, { label: "D: 18,000", value: 18000 }],
        product: { label: "Số tiền D2", unit: "nghìn đồng" },
        modes: [
          { name: "a) Quy tắc ban đầu", formula: "=IF(B2>10000,5%,0%)", levels: [{ gt: 10000, result: "5%" }], otherwise: "0%" },
          { name: "c) Quy tắc mới", formula: "=IF(B2>20000,6%,IF(B2>15000,4%,IF(B2>10000,2%,0%)))", levels: [{ gt: 20000, result: "6%" }, { gt: 15000, result: "4%" }, { gt: 10000, result: "2%" }], otherwise: "0%" },
        ],
      },
      questions: [
        { question: "a) Tại ô C2 nhập công thức tính tỉ lệ thưởng: doanh thu trên 10 triệu (10000 nghìn đồng) thì 5%, còn không thì 0%. Sao chép sang C3:C5.", type: "sheet", mode: "formula", target: "C2:C5", answer: "=IF(B2>10000,5%,0%)", sheet: LT_A,
          explanation: "=IF(B2>10000,5%,0%) → A 0% · B 0% (10,000 không lớn hơn 10000) · C 5% · D 5%. Viết 5%, 0% là SỐ, không đặt trong ngoặc kép để còn nhân ở cột D.",
          hint: "Điều kiện B2>10000 (doanh thu tính bằng nghìn đồng).", level: "van-dung", activity: "luyen-tap" },
        { question: "b) Tại ô D2 nhập công thức tính số tiền thưởng (Số tiền = Doanh thu × Tỉ lệ). Sao chép sang D3:D5.", type: "sheet", mode: "formula", target: "D2:D5", answer: "=B2*C2", sheet: LT_B,
          explanation: "=B2*C2 → A 0 · B 0 · C 600 · D 900 (nghìn đồng).", level: "van-dung", activity: "luyen-tap" },
        { question: "c) Sửa công thức ở ô C2 theo quy tắc mới: trên 20 triệu 6%, trên 15 triệu 4%, trên 10 triệu 2%, còn không 0%. Sao chép sang C3:C5.", type: "sheet", mode: "formula", target: "C2:C5", answer: "=IF(B2>20000,6%,IF(B2>15000,4%,IF(B2>10000,2%,0%)))", sheet: LT_C,
          explanation: "=IF(B2>20000,6%,IF(B2>15000,4%,IF(B2>10000,2%,0%))) → A 0% · B 0% · C 2% · D 4%; số tiền: 0 · 0 · 240 · 720.",
          hint: "Ba hàm IF lồng nhau, kiểm tra mốc lớn nhất (20000) trước.", level: "van-dung-cao", activity: "luyen-tap" },
        { question: "Theo quy tắc mới (câu c), đại lí D (doanh thu 18,000) nhận được bao nhiêu tiền thưởng?", type: "multiple-choice",
          options: ["900 nghìn đồng", "1,080 nghìn đồng", "360 nghìn đồng", "720 nghìn đồng"],
          answer: 3, explanation: "18,000 > 15000 → 4%; 18,000 × 4% = 720 nghìn đồng (theo quy tắc cũ là 900).", level: "van-dung", activity: "luyen-tap" },
        { question: "Một bạn viết =IF(B2>10000,\"5%\",\"0%\"). Vì sao cách viết này không nên dùng?", type: "multiple-choice",
          options: ["Vì hàm IF không trả về được phần trăm", "Vì \"5%\" trong ngoặc kép là dữ liệu chữ, không phải số — dễ sai khi tính toán tiếp ở cột D", "Vì thiếu dấu $", "Vì phải viết 5 thay cho 5%"],
          answer: 1, explanation: "Giá trị trả về là số thì viết trực tiếp 5%, 0%; chỉ đặt trong ngoặc kép khi trả về chữ như \"Nhiều hơn\".", level: "thong-hieu", activity: "luyen-tap" },
      ],
    },

    /* ===================== HĐ4: VẬN DỤNG (5 phút + ở nhà) ===================== */
    {
      id: "van-dung", name: "Vận dụng: Nhận xét chi tiết hơn bằng IF lồng nhau 🎯", type: "knowledge",
      goal: "Vận dụng IF lồng nhau để nhận xét chi tiết tình trạng các mục chi.",
      time: 480,
      task: "Vận dụng SGK tr.51: 1) sửa công thức ô O3 để nhận xét theo hai mức 80%, 50%; 2) dùng IF lồng nhau ở O4, O5 (mốc do app gợi ý — Mở rộng). Làm thử trên bảng mô phỏng, hoàn thiện trên Excel ở nhà và nộp trước buổi học sau.",
      sgkImage: "assets/sgk/van-dung.jpg",
      questions: [
        { question: "Vận dụng 1: tại ô O3 nhập công thức: tỉ lệ lớn hơn 80% thì “Nhiều quá”, lớn hơn 50% thì “Nhiều hơn”, còn không thì “Ít hơn”.", type: "sheet", mode: "formula", target: "O3", answer: F_O3[0],
          sheet: thSpec({ M: true, N: true, O: { O4: F_O2[1], O5: F_O2[2] } }),
          explanation: "=IF(N3>80%,\"Nhiều quá\",IF(N3>50%,\"Nhiều hơn\",\"Ít hơn\")) → 90.5% → “Nhiều quá” (như Hình 12a.4).", hint: "Kiểm tra N3>80% trước; value_if_false là một hàm IF nữa.", level: "van-dung", activity: "van-dung" },
        { question: "Vận dụng 2 (Mở rộng — mốc do app gợi ý): tại ô O4, Mong muốn cá nhân lớn hơn 40% thì “Nhiều quá”, lớn hơn 30% thì “Nhiều hơn”, còn không thì “Ít hơn”.", type: "sheet", mode: "formula", target: "O4", answer: F_O3[1],
          sheet: thSpec({ M: true, N: true, O: { O3: F_O3[0], O5: F_O2[2] } }),
          explanation: "=IF(N4>40%,\"Nhiều quá\",IF(N4>30%,\"Nhiều hơn\",\"Ít hơn\")) → 2.2% → “Ít hơn”.", level: "van-dung", activity: "van-dung" },
        { question: "Vận dụng 2 (Mở rộng — mốc do app gợi ý): tại ô O5, Tiết kiệm lớn hơn 20% thì “Nhiều hơn”, lớn hơn 10% thì “Ít hơn”, còn không thì “Ít quá”.", type: "sheet", mode: "formula", target: "O5", answer: F_O3[2],
          sheet: thSpec({ M: true, N: true, O: { O3: F_O3[0], O4: F_O3[1] } }),
          explanation: "=IF(N5>20%,\"Nhiều hơn\",IF(N5>10%,\"Ít hơn\",\"Ít quá\")) → 7.3% → “Ít quá”: gia đình cần tăng tiết kiệm.", level: "van-dung-cao", activity: "van-dung" },
      ],
    },
    {
      id: "van-dung-nha", name: "Vận dụng — Cân đối chi tiêu & IF trong cuộc sống 📝", type: "vandung",
      goal: "Liên hệ quy tắc 50-30-20 và hàm IF với bài toán thực tế.",
      time: 180,
      task: "Nhóm thảo luận, gửi câu trả lời cho thầy/cô; hoàn thiện tệp TaiChinhGiaDinh.xlsx ở nhà, gửi sản phẩm qua mail hoặc Zalo của thầy/cô. Xem trước Bài 13a “Hoàn thiện bảng tính quản lí tài chính gia đình”.",
      intro: "Gửi câu trả lời cho thầy/cô rồi bấm để xem hướng chốt.",
      cases: [
        { question: "Dựa trên quy tắc 50-30-20 và bảng Tổng hợp mục chi (A 90.5%, B 2.2%, C 7.3%), em hãy đề xuất cách điều chỉnh để các mục chi được cân đối và tài chính gia đình được kiểm soát hiệu quả.",
          answer: "Mục Nhu cầu thiết yếu đang chiếm quá nhiều (90.5%) → rà soát khoản Ăn (8,000), tiền điện nước… để tiết giảm hợp lí; tăng Tiết kiệm lên gần 20%; dành một phần hợp lí cho mong muốn cá nhân. Sau khi điều chỉnh, cột Trạng thái (hàm IF) tự cập nhật để theo dõi." },
        { question: "Nêu một tình huống thực tế khác có thể dùng hàm IF (hoặc IF lồng nhau). Viết công thức minh hoạ.",
          answer: "Ví dụ: xếp kết quả học tập =IF(B2>=5,\"Đạt\",\"Chưa đạt\"); xếp mức =IF(B2>=8,\"Tốt\",IF(B2>=6.5,\"Khá\",IF(B2>=5,\"Đạt\",\"Chưa đạt\"))); kiểm tra khoản chi vượt hạn mức =IF(D2>E2,\"Vượt mức\",\"Trong mức\")." },
      ],
    },

    /* ===================== TỔNG KẾT ===================== */
    {
      id: "tong-ket", name: "Tổng kết", type: "summary",
      task: "Cả lớp nhắc lại kiến thức trọng tâm và làm thử thách cuối. Dặn dò: hoàn thiện TaiChinhGiaDinh.xlsx; xem trước Bài 13a.",
      content: {
        learned: [
          "Hàm IF kiểm tra điều kiện, trả về một giá trị khi điều kiện đúng và một giá trị khác khi điều kiện sai.",
          "Công thức: =IF(logical_test,[value_if_true],[value_if_false]).",
          "Nhận xét nhiều mức → dùng các hàm IF lồng nhau, kiểm tra mốc lớn trước.",
          "Trả về chữ thì đặt trong ngoặc kép (\"Nhiều hơn\"); trả về số thì viết trực tiếp (5%).",
          "Kết hợp IF với SUMIF, tỉ lệ =M3/$H$11*100% để hoàn thiện bảng quản lí tài chính.",
        ],
        challenge: [
          { question: "C2: xếp kết quả — điểm TB từ 5 trở lên thì “Đạt”, còn không thì “Chưa đạt”. Sao chép sang C3:C5.", type: "sheet", mode: "formula", target: "C2:C5", answer: '=IF(B2>=5,"Đạt","Chưa đạt")', sheet: DIEM,
            explanation: "=IF(B2>=5,\"Đạt\",\"Chưa đạt\") → Đạt · Chưa đạt · Đạt (5 >= 5) · Đạt. “Từ 5 trở lên” là >=5.", level: "van-dung", activity: "tong-ket" },
          { question: "Công thức nào nhận xét “Nhiều quá” khi tỉ lệ lớn hơn 80%, “Nhiều hơn” khi lớn hơn 50%, còn lại “Ít hơn”?", type: "multiple-choice",
            options: ["=IF(N3>50%,\"Nhiều hơn\",IF(N3>80%,\"Nhiều quá\",\"Ít hơn\"))", "=IF(N3>80%,\"Nhiều quá\",IF(N3>50%,\"Nhiều hơn\",\"Ít hơn\"))", "=IF(N3>80%,\"Nhiều quá\",\"Nhiều hơn\",\"Ít hơn\")", "=IF(N3>80%,IF(N3>50%,\"Nhiều hơn\"),\"Ít hơn\")"],
            answer: 1, explanation: "Kiểm tra mốc 80% trước, IF thứ hai là value_if_false của IF thứ nhất (Hình 12a.4).", level: "van-dung-cao", activity: "tong-ket" },
        ],
      },
    },
  ],
};

if (typeof module !== "undefined" && module.exports) module.exports = LESSON;
if (typeof window !== "undefined") window.LESSON = LESSON;
