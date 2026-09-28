/* ============================================================================
 * BÀI 5 — SỬ DỤNG BẢNG TÍNH GIẢI QUYẾT BÀI TOÁN THỰC TẾ  (Tin học 8 — Kết nối tri thức với cuộc sống)
 * Chủ đề 4: Ứng dụng tin học.
 * Bám sát SGK trang 21–26 + Kế hoạch bài dạy (2 tiết) của giáo viên.
 * Chỉ sửa file này để đổi nội dung. Engine app.js không cần sửa.
 * Bảng tính mô phỏng (câu sheet mode "formula", có $ và nút kéo điền ■) theo Hình 5.1, 5.3, 5.7.
 * Trò chơi “Ai lên cao hơn” dùng type "ladder" (Thỏ 🐰 – Rùa 🐢). Đơn giá, số lượng ở Hình 5.7 là số liệu GIẢ ĐỊNH của app.
 * ==========================================================================*/

// ---- Hình 5.1 / 5.3 (SGK tr.21, 23) ----
const PM = [
  ["1", "Quản lí thời gian", "39999", "50000"],
  ["2", "Trò chơi sáng tạo", "109000", "50000"],
  ["3", "Thiết kế đồ hoạ", "211000", "10000"],
  ["4", "Từ điển", "0", "20000"],
  ["5", "Quản lí bán hàng cá nhân", "177000", "5000"],
  ["6", "Sổ sức khoẻ điện tử", "0", "10000000"],
];
const pmCells = (withE) => {
  const c = { A1: "DANH SÁCH PHẦN MỀM ỨNG DỤNG", A3: "TT", B3: "Sản phẩm", C3: "Đơn giá (đồng)", D3: "Số lượt mua", E3: "Doanh thu" };
  PM.forEach(([tt, sp, dg, lm], i) => { const r = 4 + i; c["A" + r] = tt; c["B" + r] = sp; c["C" + r] = dg; c["D" + r] = lm; if (withE) c["E" + r] = "=C" + r + "*D" + r; });
  return c;
};
const SHEET_51 = { title: "DanhSachPhanMem.xlsx", cols: 5, rows: 9, widths: { A: 0.6, B: 2.4, C: 1.4, D: 1.4, E: 1.7 },
  cells: pmCells(false), bold: ["A1", "A3:E3"], center: ["A3:E3"], comma: ["C4:E9"], size: { A1: 15 } };
const SHEET_53 = { title: "DanhSachPhanMem.xlsx", cols: 6, rows: 9, widths: { A: 0.5, B: 2.3, C: 1.3, D: 1.3, E: 1.6, F: 1.7 },
  cells: Object.assign(pmCells(true), { D2: "Tỉ lệ doanh thu của công ti", F2: "70%", F3: "Doanh thu của công ti" }),
  bold: ["A1", "A3:F3", "F2"], center: ["A3:F3"], comma: ["C4:F9"], pct: { F2: 0 }, size: { A1: 15 } };

// ---- Hình 5.7 (SGK tr.26) — đơn giá, số lượng là số liệu GIẢ ĐỊNH ----
const MH = [["1", "Vở 80 trang", "12000", "10"], ["2", "Vở 120 trang", "16000", "10"], ["3", "Bút bi", "5000", "5"],
  ["4", "Bút chì", "4000", "5"], ["5", "Balo", "250000", "1"], ["6", "Cặp sách", "180000", "1"]];
const hmCells = { A1: "Danh sách các mặt hàng được giảm giá", A2: "Tỉ lệ giảm giá", D2: "20%", A4: "TT", B4: "Tên mặt hàng", C4: "Đơn giá", D4: "Đơn giá đã giảm", E4: "Số lượng", F4: "Tổng tiền", E11: "Tổng cộng" };
MH.forEach(([tt, t, g, sl], i) => { const r = 5 + i; hmCells["A" + r] = tt; hmCells["B" + r] = t; hmCells["C" + r] = g; hmCells["E" + r] = sl; });
const SHEET_57 = { title: "GiamGia.xlsx", cols: 6, rows: 11, widths: { A: 0.5, B: 1.8, C: 1.2, D: 1.5, E: 1.1, F: 1.5 },
  cells: hmCells, bold: ["A1", "A2", "A4:F4", "E11"], center: ["A4:F4"], comma: ["C5:D10", "F5:F11"], pct: { D2: 0 }, size: { A1: 14 } };

// ---- So sánh địa chỉ tương đối – tuyệt đối (Hình 5.4) ----
const SO_SANH_HTML = `<div style="display:flex;flex-wrap:wrap;gap:12px;max-width:980px;margin:0 auto;text-align:left">
  <div style="flex:1 1 280px;background:#fff;border:3px solid #2563eb;border-radius:16px;padding:10px 14px">
    <b style="color:#2563eb;font-size:1.15rem">🔄 Địa chỉ tương đối</b> <code style="font-size:1.1rem">E4</code>
    <div>Tự động thay đổi khi sao chép công thức, giữ nguyên vị trí tương đối giữa ô chứa công thức và ô có địa chỉ.</div>
    <div style="margin-top:6px;font-family:Consolas,monospace">E4: =C4*D4 → E5: =C5*D5</div></div>
  <div style="flex:1 1 280px;background:#fff;border:3px solid #dc2626;border-radius:16px;padding:10px 14px">
    <b style="color:#dc2626;font-size:1.15rem">📌 Địa chỉ tuyệt đối</b> <code style="font-size:1.1rem">$F$2</code>
    <div>Không thay đổi khi sao chép; có kí hiệu $ trước tên cột và trước tên hàng (nhấn F4 sau khi nhập địa chỉ).</div>
    <div style="margin-top:6px;font-family:Consolas,monospace">F4: =E4*$F$2 → F5: =E5*$F$2</div></div>
</div>`;

const LESSON = {
  meta: {
    subject: "Tin học", grade: "8", book: "Kết nối tri thức với cuộc sống",
    title: "Bài 5: Sử dụng bảng tính giải quyết bài toán thực tế", unit: "Chủ đề 4 — Ứng dụng tin học",
    pages: "21–26", durationMinutes: 90,
  },
  objectives: {
    knowledge: [
      "Giải thích được sự thay đổi địa chỉ tương đối trong công thức khi sao chép công thức.",
      "Giải thích được sự khác nhau giữa địa chỉ tương đối và địa chỉ tuyệt đối của một ô tính.",
      "Sử dụng được phần mềm bảng tính trợ giúp giải quyết bài toán thực tế.",
      "Sao chép được dữ liệu từ các tệp văn bản, trang trình chiếu sang trang tính.",
    ],
    competencies: [
      "Tự học; giao tiếp và hợp tác (khăn trải bàn, thực hành theo cặp); giải quyết vấn đề và sáng tạo (bài toán doanh thu, giảm giá).",
      "Năng lực số 1.3.TC2a: tạo bảng tính có cấu trúc hợp lí, lưu trữ dữ liệu gọn gàng.",
      "Năng lực số 5.2.TC2b: tính toán tự động bằng công thức, sao chép công thức để xử lí nhanh nhiều dữ liệu.",
      "Năng lực số 5.3.TC2a: vận dụng bảng tính giải quyết bài toán thực tế (doanh thu, tổng hợp số liệu).",
      "Năng lực AI 8.B2.1: nêu được hành vi tự giác trong việc bảo vệ dữ liệu cá nhân trong các dự án học tập.",
    ],
    qualities: ["Chăm chỉ, trách nhiệm, trung thực (nhập dữ liệu chính xác, báo cáo đúng kết quả), nhân ái (hỗ trợ bạn khi thực hành)."],
  },
  coreKnowledge: [
    "Địa chỉ tương đối tự động thay đổi khi sao chép công thức nhưng vẫn giữ nguyên vị trí tương đối giữa ô chứa công thức và ô có địa chỉ trong công thức.",
    "Địa chỉ tuyệt đối không thay đổi khi sao chép công thức; có kí hiệu $ trước tên cột và trước tên hàng (VD $F$2). Nhập $ từ bàn phím hoặc nhấn phím F4 sau khi nhập địa chỉ tương đối.",
    "Chọn đúng loại địa chỉ: giá trị thay đổi theo từng dòng dùng địa chỉ tương đối; giá trị cố định (tỉ lệ) dùng địa chỉ tuyệt đối — VD Doanh thu của công ti =E4*$F$2.",
    "Có thể sao chép bảng dữ liệu từ phần mềm soạn thảo văn bản, trình chiếu sang bảng tính (Copy – Paste) để tính toán nhanh chóng, hiệu quả.",
  ],
  keywords: ["Địa chỉ tương đối", "Địa chỉ tuyệt đối", "Kí hiệu $", "Phím F4", "Sao chép công thức"],
  settings: { basePoints: 100, useTimer: false, defaultTime: 60, sound: true, streakEnabled: true },

  activities: [
    /* =========================== TIẾT 1 =========================== */
    /* ===================== HĐ1: MỞ ĐẦU (5 phút) ===================== */
    {
      id: "mo-dau", name: "Mở đầu — Bảng tính của Khoa 💼", type: "knowledge",
      goal: "Nhận ra bảng tính cần bổ sung dữ liệu Doanh thu; tạo tâm thế vào bài.",
      time: 300,
      task: "Nhóm quan sát Hình 5.1, đọc tình huống (SGK tr.21) và thảo luận: Theo em, bảng tính bạn Khoa tạo ra có cần bổ sung thông tin gì không?",
      sgkImage: "assets/sgk/mo-dau.jpg",
      content: {
        heading: "💼 Bố giao việc cho Khoa",
        prompt: "Bố của Khoa là giám đốc một công ti sản xuất phần mềm. Kì nghỉ hè, bố giao cho Khoa tính toán doanh thu một số phần mềm mà công ti sản xuất. Những phần mềm này được đưa lên các chợ ứng dụng trên mạng; người sử dụng có thể phải trả phí hoặc được miễn phí.",
        image: "assets/sgk/hinh-5-1.jpg", imageCaption: "Hình 5.1. Danh sách phần mềm của công ti",
      },
      questions: [
        { question: "Bảng tính bạn Khoa tạo ra ở Hình 5.1 cần bổ sung thông tin gì?", type: "multiple-choice",
          options: ["Các giá trị cho cột Doanh thu của các phần mềm", "Tên của bố Khoa", "Màu nền cho tiêu đề", "Không cần bổ sung gì"],
          answer: 0, explanation: "Cột Doanh thu (cột E) còn trống — cần tính Doanh thu = Đơn giá × Số lượt mua cho từng phần mềm.", level: "nhan-biet", activity: "mo-dau" },
        { question: "Phần mềm “Từ điển” có đơn giá 0 đồng. Điều đó có nghĩa là gì?", type: "multiple-choice",
          options: ["Phần mềm bị lỗi", "Chưa nhập đơn giá", "Phần mềm miễn phí nên doanh thu bằng 0", "Phần mềm bán rất đắt"],
          answer: 2, explanation: "Đơn giá bằng 0 là phần mềm miễn phí (SGK tr.22) → Doanh thu = 0 × số lượt mua = 0.", level: "thong-hieu", activity: "mo-dau" },
      ],
    },

    /* ===================== HĐ2.1: ĐỊA CHỈ TƯƠNG ĐỐI (10 phút) ===================== */
    {
      id: "hd1-tuong-doi", name: "Hoạt động 1: Tính doanh thu phần mềm — Địa chỉ tương đối 🔄", type: "knowledge",
      goal: "Viết công thức tính Doanh thu; giải thích sự thay đổi địa chỉ tương đối khi sao chép công thức.",
      time: 600,
      task: "Trên bảng tính (Hình 5.1): 1) Gõ công thức tính Doanh thu của phần mềm Quản lí thời gian vào ô E4. 2) Dùng nút kéo điền ■ (hoặc Ctrl+C, Ctrl+V) sao chép xuống E5:E9. Quan sát địa chỉ ô trong công thức thay đổi như thế nào.",
      sgkImage: "assets/sgk/hoat-dong-1.jpg",
      sheet: SHEET_51,
      content: {
        heading: "🔄 1. Địa chỉ tương đối",
        revealLabel: "📖 Kiến thức (SGK tr.22)",
        blocks: [
          { kind: "text", value: "Một trong những ưu điểm nổi bật của chương trình bảng tính là tính toán tự động nhờ tính toán theo địa chỉ ô. Chương trình bảng tính sử dụng ba loại địa chỉ ô là địa chỉ tương đối, địa chỉ tuyệt đối và địa chỉ hỗn hợp. Bài học này tìm hiểu địa chỉ tương đối và địa chỉ tuyệt đối." },
          { kind: "text", value: "Doanh thu = Đơn giá × Số lượt mua. Công thức tại ô E4 là =C4*D4. Khi sao chép công thức này đến ô E5 thì các địa chỉ ô trong công thức tự động thay đổi, công thức tại E5 là =C5*D5. Các địa chỉ C4, D4, C5, D5 đều là địa chỉ tương đối. Khi nhập địa chỉ ô bằng thao tác nháy chuột vào ô thì chương trình bảng tính mặc định lấy địa chỉ đó là địa chỉ tương đối." },
          { kind: "image", value: "assets/sgk/hinh-5-2.jpg", caption: "Hình 5.2. Địa chỉ trong công thức tại ô E4 là địa chỉ tương đối" },
        ],
      },
      questions: [
        { question: "Câu 1 (HĐ1). Gõ công thức tính Doanh thu của phần mềm Quản lí thời gian vào ô E4 (Doanh thu = Đơn giá × Số lượt mua).", type: "sheet", mode: "formula", target: "E4", answer: "=C4*D4",
          explanation: "E4: =C4*D4 → 39,999 × 50,000 = 1,999,950,000.", hint: "Đơn giá ở ô C4, Số lượt mua ở ô D4; công thức bắt đầu bằng dấu =.", level: "nhan-biet", activity: "hd1-tuong-doi" },
        { question: "Câu 2 (HĐ1). Tính Doanh thu cho các phần mềm còn lại (E5:E9) mà KHÔNG gõ lại công thức: nhập =C4*D4 vào E4 rồi kéo nút điền ■ xuống E9.", type: "sheet", mode: "formula", target: "E4:E9", answer: "=C4*D4",
          explanation: "Sao chép công thức: E5 =C5*D5, E6 =C6*D6, … E9 =C9*D9 — địa chỉ tương đối tự thay đổi theo từng dòng.", hint: "Chọn E4, kéo ô vuông nhỏ ■ ở góc dưới phải xuống E9 (hoặc Ctrl+C ở E4 → chọn E5:E9 → Ctrl+V).", level: "thong-hieu", activity: "hd1-tuong-doi" },
        { question: "Khi sao chép công thức =C4*D4 từ ô E4 xuống ô E5, địa chỉ ô trong công thức thay đổi thế nào?", type: "multiple-choice",
          options: ["Thay đổi theo dòng: =C5*D5 (giữ nguyên vị trí tương đối)", "Không thay đổi: vẫn là =C4*D4", "Đổi cột: =D4*E4", "Báo lỗi"],
          answer: 0, explanation: "Địa chỉ tương đối tự động thay đổi khi sao chép công thức nhưng vẫn giữ nguyên vị trí tương đối giữa ô chứa công thức và ô có địa chỉ trong công thức.", level: "thong-hieu", activity: "hd1-tuong-doi" },
        { question: "Câu hỏi SGK tr.22 — Sao chép công thức từ ô E4 đến các ô E6, E7, E8, E9 (Hình 5.2). Công thức trong ô E8 là:", type: "multiple-choice",
          options: ["=C4*D4", "=C8*D4", "=E8*D8", "=C8*D8"],
          answer: 3, explanation: "E6 =C6*D6, E7 =C7*D7, E8 =C8*D8, E9 =C9*D9 — mỗi công thức lấy Đơn giá và Số lượt mua ở cùng dòng.", level: "thong-hieu", activity: "hd1-tuong-doi", sgkImage: "assets/sgk/cau-hoi-tr22.jpg" },
      ],
      remember: ["Địa chỉ tương đối tự động thay đổi khi sao chép công thức nhưng vẫn giữ nguyên vị trí tương đối giữa ô chứa công thức và ô có địa chỉ trong công thức."],
    },

    /* ===================== HĐ2.2: ĐỊA CHỈ TUYỆT ĐỐI (10 phút) ===================== */
    {
      id: "hd2-thu-sai", name: "Hoạt động 2: Thử nghiệm — sao chép =E4*F2 có đúng không? 🧪", type: "knowledge",
      goal: "Phát hiện: dùng địa chỉ tương đối cho ô chứa tỉ lệ thì sao chép công thức sẽ sai.",
      time: 300,
      task: "Trên bảng tính thử (Hình 5.3): gõ =E4*F2 vào ô F4 rồi kéo nút điền ■ xuống F5. Bấm vào F5 xem công thức và kết quả — có đúng yêu cầu không? Vì sao?",
      sgkImage: "assets/sgk/hoat-dong-2.jpg",
      sandbox: Object.assign({}, SHEET_53, { intro: "🧪 Bảng tính thử (Hình 5.3): tỉ lệ doanh thu của công ti lưu ở ô F2 (70%). Thử gõ =E4*F2 vào F4 rồi kéo xuống F5." }),
      content: {
        heading: "🧪 Doanh thu của công ti = Doanh thu × Tỉ lệ (ô F2)",
        prompt: "Doanh thu là số tiền thu được của đơn vị quản lí chợ ứng dụng khi người sử dụng trả tiền mua phần mềm. Công ti của bố Khoa được trả 70% số tiền này và gọi là Doanh thu của công ti. Tỉ lệ 70% lưu ở ô F2.",
        revealLabel: "💡 Vì sao sao chép =E4*F2 xuống F5 bị sai?",
        blocks: [
          { kind: "text", value: "Sao chép =E4*F2 từ F4 xuống F5 được =E5*F3: địa chỉ F2 (tương đối) cũng bị dời xuống thành F3 — ô tiêu đề “Doanh thu của công ti”, không phải tỉ lệ 70% → kết quả sai (báo lỗi). Giá trị Doanh thu thay đổi theo từng phần mềm, còn Tỉ lệ luôn cố định là 70% → ô F2 cần một loại địa chỉ KHÔNG thay đổi khi sao chép." },
        ],
      },
      questions: [
        { question: "Câu 2 (HĐ2). Nếu ô F4 có công thức =E4*F2, sao chép từ F4 vào ô F5 thì công thức nhận được tại F5 là gì, có đúng yêu cầu không?", type: "multiple-choice",
          options: ["=E5*F2 — đúng yêu cầu", "=E4*F2 — đúng yêu cầu", "=E5*F3 — không đúng, vì F3 không chứa tỉ lệ 70%", "=E5*F5 — đúng yêu cầu"],
          answer: 2, explanation: "Địa chỉ tương đối F2 bị dời thành F3 (ô tiêu đề), nên F5 tính sai. Cần giữ cố định ô F2.", level: "thong-hieu", activity: "hd2-thu-sai" },
      ],
    },
    {
      id: "hd2-tuyet-doi", name: "Địa chỉ tuyệt đối — kí hiệu $ 📌", type: "knowledge",
      goal: "Biết địa chỉ tuyệt đối; lập công thức =E4*$F$2 và sao chép cho kết quả đúng.",
      time: 600,
      task: "Đọc mục 2 (SGK tr.23), rồi trên bảng tính: gõ công thức tính Doanh thu của công ti vào F4 (dùng địa chỉ tuyệt đối cho ô F2) và kéo nút điền ■ xuống F9. Trả lời câu hỏi SGK tr.24.",
      sgkImage: "assets/sgk/sgk-trang23.jpg",
      sheet: SHEET_53,
      content: {
        heading: "📌 2. Địa chỉ tuyệt đối",
        revealLabel: "📖 Kiến thức (SGK tr.23)",
        blocks: [
          { kind: "text", value: "Trong chương trình bảng tính, một địa chỉ ô trong công thức không thay đổi khi sao chép công thức thì địa chỉ đó là địa chỉ tuyệt đối. Phần mềm bảng tính quy định địa chỉ tuyệt đối có kí hiệu $ trước tên cột và trước tên hàng. Ví dụ, $F$2 là địa chỉ tuyệt đối. Sau khi nhập địa chỉ tương đối, em nhấn phím F4 để chuyển địa chỉ tương đối thành địa chỉ tuyệt đối." },
          { kind: "html", value: SO_SANH_HTML },
          { kind: "image", value: "assets/sgk/hinh-5-4.jpg", caption: "Hình 5.4. Công thức tại ô F4 và F5" },
          { kind: "text", value: "Địa chỉ ô chứa giá trị Doanh thu là địa chỉ tương đối, địa chỉ ô F2 chứa Tỉ lệ là địa chỉ tuyệt đối. Công thức đúng tại ô F4 là =E4*$F$2. Khi đó, sao chép công thức từ ô F4 đến các ô còn lại sẽ trả lại kết quả chính xác." },
        ],
      },
      questions: [
        { question: "Câu 1 (HĐ2). Gõ công thức tính Doanh thu của công ti cho phần mềm Quản lí thời gian vào ô F4 (Doanh thu × Tỉ lệ ở ô F2 — dùng địa chỉ tuyệt đối) rồi kéo nút điền ■ xuống F9.", type: "sheet", mode: "formula", target: "F4:F9", answer: "=E4*$F$2",
          explanation: "F4: =E4*$F$2; sao chép xuống: F5 =E5*$F$2, … F9 =E9*$F$2 — E thay đổi theo dòng, $F$2 giữ nguyên.", hint: "Trên bảng mô phỏng gõ trực tiếp kí hiệu $ để được $F$2 (trên Excel có thể nhấn phím F4), sau đó kéo nút điền ■ xuống F9.", level: "van-dung", activity: "hd2-tuyet-doi" },
        { question: "Câu hỏi SGK tr.24 — 1. Trong Hình 5.3, công thức tại ô F5 là =E5*$F$2. Sao chép công thức này đến ô F6, kết quả sao chép là:", type: "multiple-choice",
          options: ["=E6*F3", "=E6*$F$2", "=$E$6*F3", "=$E$6*$F$2"],
          answer: 1, explanation: "E5 (tương đối) thành E6; $F$2 (tuyệt đối) giữ nguyên → =E6*$F$2.", level: "thong-hieu", activity: "hd2-tuyet-doi", sgkImage: "assets/sgk/cau-hoi-tr24.jpg" },
        { question: "Câu hỏi SGK tr.24 — 2. Cách nhập kí hiệu $ cho địa chỉ tuyệt đối là:", type: "multiple-choice",
          options: ["Gõ kí hiệu $ từ bàn phím khi nhập địa chỉ ô.", "Sau khi nhập địa chỉ tương đối, nhấn phím F4 để chuyển thành địa chỉ tuyệt đối.", "Sau khi nhập địa chỉ tương đối, nhấn phím F2 để chuyển thành địa chỉ tuyệt đối.", "Thực hiện được theo cả hai cách A và B."],
          answer: 3, explanation: "Có thể gõ $ từ bàn phím hoặc nhấn phím F4 sau khi nhập địa chỉ tương đối. Phím F2 dùng để sửa nội dung ô, không chuyển thành địa chỉ tuyệt đối.", level: "nhan-biet", activity: "hd2-tuyet-doi" },
      ],
      remember: [
        "Địa chỉ tuyệt đối không thay đổi khi sao chép công thức.",
        "Địa chỉ tuyệt đối có kí hiệu $ trước tên cột và trước tên hàng.",
      ],
    },
    {
      id: "phan-loai-dia-chi", name: "Trò chơi: Tương đối hay tuyệt đối? 🧩", type: "dragdrop",
      goal: "Nhận biết địa chỉ tương đối và địa chỉ tuyệt đối.",
      time: 180,
      task: "Xếp mỗi địa chỉ ô vào đúng loại. Xếp hết rồi bấm Nộp bài.",
      groups: ["🔄 Địa chỉ tương đối", "📌 Địa chỉ tuyệt đối"],
      items: [
        { text: "E4", group: 0 }, { text: "C5", group: 0 }, { text: "B6", group: 0 }, { text: "D10", group: 0 }, { text: "AA3", group: 0 },
        { text: "$F$2", group: 1 }, { text: "$A$1", group: 1 }, { text: "$E$6", group: 1 }, { text: "$C$10", group: 1 }, { text: "$AB$7", group: 1 },
      ],
      explanation: "Địa chỉ tuyệt đối có kí hiệu $ trước tên cột VÀ trước tên hàng; địa chỉ không có $ là địa chỉ tương đối.",
    },
    {
      id: "doan-cong-thuc", name: "Trò chơi: Đoán công thức sau khi sao chép 🔮", type: "quiz",
      goal: "Vận dụng quy tắc thay đổi địa chỉ tương đối, giữ nguyên địa chỉ tuyệt đối khi sao chép công thức.",
      time: 360,
      task: "Đọc công thức và ô đích, gõ công thức nhận được sau khi sao chép (VD: =C7*D7) rồi nhấn Enter.",
      questions: [
        { question: "Ô E4 chứa =C4*D4. Sao chép sang ô E7, công thức tại E7 là?", type: "short", exact: true, answer: "=C7*D7", placeholder: "Gõ công thức, VD: =A1*B1",
          explanation: "Dời xuống 3 dòng: C4 → C7, D4 → D7.", level: "thong-hieu", activity: "doan-cong-thuc" },
        { question: "Ô F4 chứa =E4*$F$2. Sao chép sang ô F8, công thức tại F8 là?", type: "short", exact: true, answer: "=E8*$F$2", placeholder: "Gõ công thức, VD: =A1*$B$1",
          explanation: "E4 (tương đối) → E8; $F$2 (tuyệt đối) giữ nguyên.", level: "thong-hieu", activity: "doan-cong-thuc" },
        { question: "Ô C1 chứa =A1*B1. Sao chép sang ô D1 (sang phải 1 cột), công thức tại D1 là?", type: "short", exact: true, answer: "=B1*C1", placeholder: "Gõ công thức",
          explanation: "Dời sang phải 1 cột: A → B, B → C; hàng giữ nguyên.", level: "van-dung", activity: "doan-cong-thuc" },
        { question: "Ô D2 chứa =B2-C2. Sao chép sang ô D10, công thức tại D10 là?", type: "short", exact: true, answer: "=B10-C10", placeholder: "Gõ công thức",
          explanation: "Dời xuống 8 dòng: B2 → B10, C2 → C10.", level: "thong-hieu", activity: "doan-cong-thuc" },
        { question: "Ô B5 chứa =A5+$A$1. Sao chép sang ô C6, công thức tại C6 là?", type: "short", exact: true, answer: "=B6+$A$1", placeholder: "Gõ công thức",
          explanation: "Dời sang phải 1 cột và xuống 1 dòng: A5 → B6; $A$1 giữ nguyên.", level: "van-dung-cao", activity: "doan-cong-thuc" },
        { question: "Ô E3 chứa =$B$1*C3. Sao chép sang ô F3, công thức tại F3 là?", type: "short", exact: true, answer: "=$B$1*D3", placeholder: "Gõ công thức",
          explanation: "$B$1 giữ nguyên; C3 dời sang phải 1 cột thành D3.", level: "van-dung", activity: "doan-cong-thuc" },
      ],
    },

    /* ===================== HĐ2.3: THỰC HÀNH — BÀI TOÁN THỰC TẾ (25 phút) ===================== */
    {
      id: "thuc-hanh-3", name: "Thực hành 3: Giải quyết bài toán doanh thu trên Excel 💻", type: "ordering",
      goal: "Nắm các bước thực hành tạo bảng tính, lập công thức địa chỉ tương đối, tuyệt đối (SGK tr.24–25).",
      time: 1200,
      task: "Thực hành trên Microsoft Excel (2 HS/máy): tạo bảng tính như Hình 5.1, tính Doanh thu và Doanh thu của công ti (Hình 5.5), lưu tệp. Trước khi làm, sắp xếp các bước dưới đây theo đúng thứ tự.",
      sgkImage: "assets/sgk/thuc-hanh-3.jpg",
      html: `<div style="text-align:center"><img class="lesson-img" src="assets/sgk/hinh-5-5.jpg" alt="Hình 5.5" style="max-width:820px"><div class="caption">Hình 5.5. Công thức tính Doanh thu của công ti cho phần mềm Quản lí thời gian</div></div>`,
      steps: [
        "Khởi động phần mềm bảng tính, nhập dữ liệu và định dạng như Hình 5.1, lưu tệp",
        "Tại ô E4, nhập công thức =C4*D4",
        "Sao chép công thức tại ô E4 cho các ô từ E5 đến E9, lưu tệp",
        "Tại ô D2 nhập “Tỉ lệ doanh thu của công ti”, tại ô F2 nhập 70%; tại ô F3 nhập tiêu đề “Doanh thu của công ti”",
        "Tại ô F4, nhập công thức =E4*$F$2 (gõ $ hoặc nhấn phím F4)",
        "Sao chép công thức tại ô F4 đến các ô từ F5 đến F9, lưu tệp",
      ],
      explanation: "a) Tạo bảng dữ liệu → b) Tính Doanh thu (E4 =C4*D4, sao chép E5:E9) → c) Tính Doanh thu của công ti (F2 = 70%, F4 =E4*$F$2, sao chép F5:F9) → lưu tệp.",
    },

    /* =========================== TIẾT 2 =========================== */
    /* ===================== HĐ2.4: THỰC HÀNH — SAO CHÉP DỮ LIỆU (25 phút) ===================== */
    {
      id: "thuc-hanh-4", name: "Thực hành 4: Sao chép dữ liệu từ văn bản, trình chiếu sang trang tính 📋", type: "knowledge",
      goal: "Sao chép bảng dữ liệu từ Word hoặc PowerPoint sang Excel; lưu tệp Khaosat.xlsx.",
      time: 1200,
      task: "Thực hành (2 HS/máy): mở tệp văn bản hoặc trình chiếu có Bảng 5.1, sao chép bảng sang phần mềm bảng tính, lưu với tên Khaosat.xlsx.",
      sgkImage: "assets/sgk/thuc-hanh-4.jpg",
      content: {
        heading: "📋 Sao chép dữ liệu sang trang tính",
        prompt: "Trong thực tế, nhiều bảng dữ liệu được tạo trong phần mềm soạn thảo văn bản hoặc trình chiếu. Khi cần tính toán, em sao chép bảng sang phần mềm bảng tính để công việc được giải quyết nhanh chóng và hiệu quả.",
        image: "assets/sgk/bang-5-1.jpg", imageCaption: "Bảng 5.1. Số liệu thống kê lựa chọn nghề nghiệp của học sinh",
        revealLabel: "🔢 Hướng dẫn (SGK tr.25)",
        blocks: [
          { kind: "list", value: [
            "1. Trong phần mềm soạn thảo văn bản hoặc trình chiếu, chọn các hàng, cột của bảng.",
            "2. Trong thẻ Home, chọn lệnh Copy trong nhóm lệnh Clipboard hoặc nhấn tổ hợp phím Ctrl + C.",
            "3. Trong phần mềm bảng tính, mở bảng tính mới, chọn ô ở góc trên cùng bên trái của vùng muốn dán dữ liệu và chọn lệnh Paste.",
            "4. Đóng tệp văn bản hoặc tệp trình chiếu.",
            "5. Lưu tệp bảng tính với tên Khaosat.xlsx.",
          ] },
        ],
      },
      questions: [
        { question: "Sau khi sao chép bảng trong Word, em chọn ô nào trong trang tính để dán?", type: "multiple-choice",
          options: ["Ô bất kì ở giữa bảng", "Ô ở góc dưới cùng bên phải của vùng muốn dán", "Ô ở góc trên cùng bên trái của vùng muốn dán dữ liệu", "Không cần chọn ô"],
          answer: 2, explanation: "Chọn ô ở góc trên cùng bên trái của vùng muốn dán dữ liệu rồi chọn Paste (SGK tr.25).", level: "nhan-biet", activity: "thuc-hanh-4" },
        { question: "Tổ hợp phím nào dùng để sao chép (Copy) bảng đã chọn?", type: "multiple-choice",
          options: ["Ctrl + C", "Ctrl + V", "Ctrl + S", "Ctrl + X"],
          answer: 0, explanation: "Ctrl + C: sao chép; Ctrl + V: dán; Ctrl + S: lưu tệp.", level: "nhan-biet", activity: "thuc-hanh-4" },
        { question: "Vì sao nên sao chép Bảng 5.1 sang phần mềm bảng tính?", type: "multiple-choice",
          options: ["Để bảng đẹp hơn", "Để xoá bảng trong Word", "Vì Word không lưu được bảng", "Để tính toán trên bảng dữ liệu (VD tổng số HS) nhanh chóng, hiệu quả"],
          answer: 3, explanation: "Phần mềm bảng tính giúp tính toán tự động trên bảng dữ liệu, nhanh chóng và hiệu quả.", level: "thong-hieu", activity: "thuc-hanh-4" },
      ],
    },

    /* ===================== HĐ3: LUYỆN TẬP (10 phút) ===================== */
    {
      id: "ai-len-cao-hon", name: "Luyện tập — Trò chơi “Ai lên cao hơn” 🐰🐢", type: "ladder",
      teams: [{ name: "Đội Thỏ", icon: "🐰" }, { name: "Đội Rùa", icon: "🐢" }], goalIcon: "🏆",
      goal: "Củng cố địa chỉ tương đối, tuyệt đối và sao chép công thức.",
      time: 480,
      task: "Chia lớp thành 2 đội. Các đội lần lượt trả lời; trả lời đúng thì nhân vật của đội lên 1 bậc thang. Hết câu hỏi, đội lên cao hơn chiến thắng! (GV có thể bấm đổi đội trả lời trước mỗi câu.)",
      intro: "🐰 Thỏ và 🐢 Rùa thi leo bậc thang — mỗi câu đúng lên 1 bậc!",
      questions: [
        { question: "Câu 1. Phần mềm nào được sử dụng để minh hoạ các nội dung về phần mềm bảng tính (SGK)?", type: "multiple-choice",
          options: ["Word", "PowerPoint", "Excel", "Paint"],
          answer: 2, explanation: "SGK dùng Microsoft Excel phiên bản 2016 để minh hoạ.", level: "nhan-biet", activity: "ai-len-cao-hon" },
        { question: "Câu 2. “Khi thực hiện sao chép công thức, địa chỉ ô tính sẽ ..(1).. để đảm bảo vị trí tương đối giữa ô tính chứa công thức và các ô tính trong công thức là ..(2)..”. Cụm từ thích hợp cho (1) và (2) lần lượt là:", type: "multiple-choice",
          options: ["không thay đổi – thay đổi", "thay đổi – không thay đổi", "không thay đổi – không thay đổi", "thay đổi – thay đổi"],
          answer: 1, explanation: "Địa chỉ tương đối THAY ĐỔI khi sao chép nhưng vị trí tương đối KHÔNG THAY ĐỔI.", level: "thong-hieu", activity: "ai-len-cao-hon" },
        { question: "Câu 3. Công thức tại ô E4 là =C4+D4, khi sao chép đến ô E5 sẽ thành:", type: "multiple-choice",
          options: ["=C4+D4", "=C4+D5", "=C5+D5", "=C5+D4"],
          answer: 2, explanation: "Dời xuống 1 dòng: C4 → C5, D4 → D5.", level: "thong-hieu", activity: "ai-len-cao-hon" },
        { question: "Câu 4. Công thức tại ô E4 là =C4+D4, khi sao chép đến ô E5, địa chỉ cột của các ô tính trong công thức là cột:", type: "multiple-choice",
          options: ["C, D", "E", "C", "D"],
          answer: 0, explanation: "Sao chép theo cột (xuống dưới) thì cột giữ nguyên: vẫn là cột C và D (=C5+D5).", level: "thong-hieu", activity: "ai-len-cao-hon" },
        { question: "Câu 5. Công thức tại E4 là =C4+D4, sao chép đến E5 thì công thức tại E5 là =C5+D5. Các địa chỉ C4, D4, C5, D5 trong các công thức trên đều là:", type: "multiple-choice",
          options: ["địa chỉ tuyệt đối", "địa chỉ tương đối", "địa chỉ hỗn hợp", "địa chỉ công thức"],
          answer: 1, explanation: "Các địa chỉ tự thay đổi khi sao chép → địa chỉ tương đối.", level: "nhan-biet", activity: "ai-len-cao-hon" },
        { question: "Câu 6. Trong Excel, để địa chỉ cột (hoặc hàng) của ô tính không thay đổi khi sao chép công thức, ta thêm dấu nào vào trước tên cột (hoặc tên hàng)?", type: "multiple-choice",
          options: ["*", "‘", "“", "$"],
          answer: 3, explanation: "Kí hiệu $ trước tên cột/tên hàng giữ cố định cột/hàng đó khi sao chép.", level: "nhan-biet", activity: "ai-len-cao-hon" },
        { question: "Câu 7 (Mở rộng). Phát biểu nào dưới đây là đúng?", type: "multiple-choice",
          options: ["Địa chỉ tương đối: dạng địa chỉ chỉ có tên hàng hoặc tên cột thay đổi khi sao chép công thức sang nơi khác", "Địa chỉ hỗn hợp: dạng địa chỉ chỉ có tên hàng hoặc tên cột thay đổi khi sao chép công thức sang nơi khác", "Địa chỉ tuyệt đối: dạng địa chỉ có cả tên hàng và tên cột bị thay đổi khi sao chép công thức sang nơi khác", "Địa chỉ tuyệt đối: dạng địa chỉ chỉ có thể thay đổi cả tên hàng và tên cột khi sao chép công thức sang nơi khác"],
          answer: 1, explanation: "Mở rộng: địa chỉ hỗn hợp (VD C$4, $C4) chỉ có tên hàng hoặc tên cột thay đổi. Địa chỉ tương đối thay đổi cả hai; địa chỉ tuyệt đối không thay đổi.", level: "van-dung", activity: "ai-len-cao-hon" },
        { question: "Câu 8 (Mở rộng). Địa chỉ ô tính C$4 có đặc điểm:", type: "multiple-choice",
          options: ["có thể thay đổi (cả tên cột và tên hàng đều có thể thay đổi)", "chỉ cột luôn được giữ nguyên, địa chỉ hàng có thể thay đổi", "không thay đổi (cả tên cột và tên hàng luôn được giữ nguyên)", "địa chỉ cột có thể thay đổi, địa chỉ hàng luôn được giữ nguyên"],
          answer: 3, explanation: "Mở rộng: $ đứng trước số hàng 4 → hàng 4 giữ nguyên; cột C không có $ nên có thể thay đổi.", level: "van-dung-cao", activity: "ai-len-cao-hon" },
      ],
    },
    {
      id: "luyen-tap-1", name: "Luyện tập 1 (SGK tr.26) ✔️", type: "quiz",
      goal: "Xác định công thức sau khi sao chép sang ô khác cả hàng lẫn cột.",
      time: 180,
      task: "Quan sát Hình 5.6 và chọn phương án đúng.",
      sgkImage: "assets/sgk/luyen-tap.jpg",
      questions: [
        { question: "Công thức tại ô C1 (Hình 5.6) là =A1*B1. Sao chép công thức trong ô C1 vào ô E2 thì công thức tại ô E2 sau khi sao chép là:", type: "multiple-choice",
          image: "assets/sgk/hinh-5-6.jpg", imageCaption: "Hình 5.6. Sao chép công thức vào ô E2",
          options: ["=C1*D2", "=C2*D1", "=C2*D2", "=B2*C2"],
          answer: 2, explanation: "Từ C1 đến E2: sang phải 2 cột, xuống 1 hàng → A1 thành C2, B1 thành D2 → =C2*D2.", level: "van-dung", activity: "luyen-tap-1" },
      ],
    },
    {
      id: "luyen-tap-2", name: "Luyện tập 2 (SGK tr.26): Mua đồ dùng học tập giảm giá 🛍️", type: "knowledge",
      goal: "Lập công thức tính đơn giá đã giảm, tổng tiền mỗi mặt hàng và tổng tiền phải trả.",
      time: 600,
      task: "Trên bảng tính (Hình 5.7, đơn giá và số lượng là số liệu giả định): c) tính Đơn giá đã giảm D5:D10 (tỉ lệ giảm ở ô D2); e) tính Tổng tiền F5:F10 = Số lượng × Đơn giá đã giảm; f) tại ô F11 tính tổng tiền phải trả cho tất cả các mặt hàng. Về nhà làm lại trên Excel với đơn giá, số lượng em tự tìm hiểu.",
      sgkImage: "assets/sgk/hinh-5-7.jpg",
      sheet: SHEET_57,
      questions: [
        { question: "c) Nhập công thức cho các ô D5:D10 tính đơn giá mỗi mặt hàng sau khi được giảm (tỉ lệ giảm lưu ở ô D2). Nhập ở D5 rồi kéo nút điền ■ xuống D10.", type: "sheet", mode: "formula", target: "D5:D10", answer: "=C5*(1-$D$2)",
          explanation: "Đơn giá đã giảm = Đơn giá × (1 − Tỉ lệ giảm) → D5 =C5*(1-$D$2) (hoặc =C5-C5*$D$2). $D$2 giữ cố định khi sao chép.", hint: "Tỉ lệ giảm ở ô D2 cần địa chỉ tuyệt đối: $D$2.", level: "van-dung", activity: "luyen-tap-2" },
        { question: "e) Tính Tổng tiền cho các ô F5:F10 (Tổng tiền = Số lượng × Đơn giá đã giảm). Nhập ở F5 rồi kéo xuống F10.", type: "sheet", mode: "formula", target: "F5:F10", answer: "=E5*D5",
          explanation: "F5 =E5*D5, sao chép xuống F6:F10 — cả hai địa chỉ đều thay đổi theo dòng nên dùng địa chỉ tương đối.", level: "van-dung", activity: "luyen-tap-2" },
        { question: "f) Tại ô F11, nhập công thức tính Tổng tiền phải trả cho tất cả các mặt hàng.", type: "sheet", mode: "formula", target: "F11", answer: "=SUM(F5:F10)",
          explanation: "=SUM(F5:F10) cộng tổng tiền 6 mặt hàng.", hint: "Dùng hàm SUM với vùng F5:F10.", level: "van-dung", activity: "luyen-tap-2" },
      ],
    },

    /* ===================== HĐ4: VẬN DỤNG (5 phút) ===================== */
    {
      id: "van-dung", name: "Vận dụng: Doanh thu 5 phần mềm em quan tâm 🚀", type: "vandung",
      goal: "Thu thập dữ liệu thực tế, lập bảng tính và công thức Doanh thu, Doanh thu của công ti (75%).",
      time: 300,
      task: "Nhóm thực hành (có thể hoàn thiện ở nhà), gửi sản phẩm qua thư điện tử hoặc Zalo của thầy/cô; báo cáo ở tiết sau.",
      sgkImage: "assets/sgk/van-dung.jpg",
      intro: "Gửi mô tả bảng tính và công thức cho thầy/cô rồi bấm để xem gợi ý.",
      cases: [
        { question: "Truy cập một số chợ ứng dụng để tìm thông tin về năm phần mềm ứng dụng em quan tâm (đơn giá, số lượt mua,…), tạo bảng tính theo mẫu Hình 5.5, lập công thức tính Doanh thu và Doanh thu của công ti sản xuất phần mềm (giả sử công ti nhận được 75% Doanh thu). Nêu tên 5 phần mềm và các công thức em đã dùng.",
          answer: "Gợi ý (giáo án): Chợ ứng dụng như Google Play, App Store, Microsoft Store… Bảng gồm TT, Sản phẩm, Đơn giá, Số lượt mua, Doanh thu, Doanh thu của công ti; ô F2 ghi 75%. Công thức: E4 =C4*D4 (sao chép xuống); F4 =E4*$F$2 (sao chép xuống). Lưu ý: chỉ ghi thông tin công khai của phần mềm, không đưa thông tin cá nhân của mình vào bảng tính chia sẻ (8.B2.1)." },
      ],
    },

    /* ===================== TỔNG KẾT ===================== */
    {
      id: "tong-ket", name: "Tổng kết", type: "summary",
      task: "Cả lớp nhắc lại kiến thức trọng tâm và làm thử thách cuối. Về nhà: hoàn thiện Vận dụng; xem trước Bài 6: Sắp xếp và lọc dữ liệu.",
      content: {
        learned: [
          "Địa chỉ tương đối (E4) tự thay đổi khi sao chép, giữ nguyên vị trí tương đối.",
          "Địa chỉ tuyệt đối ($F$2) không thay đổi khi sao chép; gõ $ hoặc nhấn phím F4.",
          "Giá trị thay đổi theo dòng → địa chỉ tương đối; giá trị cố định (tỉ lệ) → địa chỉ tuyệt đối.",
          "Sao chép bảng từ Word, PowerPoint sang bảng tính bằng Copy – Paste để tính toán nhanh.",
        ],
        challenge: [
          { question: "Cửa hàng lưu tỉ giá quy đổi ở ô B1. Ô C4 tính tiền quy đổi của mặt hàng ở dòng 4 (số tiền ở ô B4). Công thức nào ở C4 khi sao chép xuống C5:C20 vẫn cho kết quả đúng?", type: "multiple-choice",
            options: ["=B4*B1", "=$B$4*B1", "=B4*$B$1", "=$B$4*$B$1"],
            answer: 2, explanation: "Số tiền thay đổi theo dòng → B4 tương đối; tỉ giá cố định → $B$1 tuyệt đối.", level: "van-dung-cao", activity: "tong-ket" },
          { question: "Ô F4 chứa =E4*$F$2. Sao chép sang ô F9, công thức tại F9 là:", type: "multiple-choice",
            options: ["=E9*$F$2", "=E9*$F$7", "=E4*$F$2", "=E9*F7"],
            answer: 0, explanation: "E4 → E9 (tương đối); $F$2 giữ nguyên (tuyệt đối).", level: "thong-hieu", activity: "tong-ket" },
        ],
      },
    },
  ],
};

if (typeof module !== "undefined" && module.exports) module.exports = LESSON;
if (typeof window !== "undefined") window.LESSON = LESSON;
