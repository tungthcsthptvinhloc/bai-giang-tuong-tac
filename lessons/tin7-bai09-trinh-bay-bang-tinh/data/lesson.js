/* ============================================================================
 * BÀI 9 — TRÌNH BÀY BẢNG TÍNH  (Tin học 7 — Kết nối tri thức)
 * Chủ đề 4: Ứng dụng tin học (dự án Trường học xanh).
 * Bám sát SGK trang 45–50 + Kế hoạch bài dạy (2 tiết) của giáo viên.
 * Chỉ sửa file này để đổi nội dung. Engine app.js không cần sửa.
 * Thao tác định dạng, chèn/xoá/ẩn hàng cột, gộp ô: HS làm trên Excel thật (tệp THXanh.xlsx).
 * ==========================================================================*/

// ---- Bảng kiểu Excel vẽ bằng HTML (để so sánh TRƯỚC / SAU khi định dạng) ----
const TH = "background:#eef1f5;color:#4b5563;font-weight:600;border:1px solid #d5d9e0;padding:3px 6px;font-size:.85rem";
const isNum = (v) => /^[-+]?[\d.,]+%?$/.test(String(v));
const xl = (cols, rows, o) => {
  o = o || {};
  return `<div style="overflow-x:auto"><table style="border-collapse:collapse;font-family:Calibri,'Segoe UI',Arial,sans-serif;font-size:${o.size || "1rem"};background:#fff;min-width:${o.min || 420}px;margin:0 auto">
  <tr><th style="${TH}"></th>${cols.map((c) => `<th style="${TH}">${c}</th>`).join("")}</tr>
  ${rows.map((r, i) => `<tr><th style="${TH}">${(o.start || 1) + i}</th>${r.map((v) => {
    const s = v && typeof v === "object" ? v : { v: v == null ? "" : v };
    const head = (o.head || []).includes(i), bold = head || (o.bold || []).includes(i) || s.b;
    return `<td${s.span ? ` colspan="${s.span}"` : ""}${s.rows ? ` rowspan="${s.rows}"` : ""} style="border:1px solid ${o.grid || "#d5d9e0"};padding:3px 8px;white-space:nowrap;${head ? "background:#fde047;" : ""}${bold ? "font-weight:700;" : ""}${s.c ? "color:" + s.c + ";" : ""}text-align:${s.al || (isNum(s.v) ? "right" : "left")};${s.al === "center" || s.rows ? "vertical-align:middle;" : ""}">${s.v}</td>`;
  }).join("")}</tr>`).join("")}</table></div>`;
};

// ---- Hình 9.1: Bảng 6 — dữ liệu chưa được định dạng ----
const H91_ROWS = [
  ["1", "Cây hoa", "Hoa Mười giờ", 25000, 10, "", 16, "", 16, 14, "", 56, "14", "1400000.00"],
  ["2", "", "Hoa Dạ yến thảo", 45000, "", 12, 12, 11, "", "", "", 35, "11.66666667", "1575000.00"],
  ["3", "", "Hoa Dừa cạn", 15500, 16, "", 12, 10, "", 10, 15, 63, "12.6", "976500.00"],
  ["4", "", "Hoa Cúc vàng", 30500, 14, 20, "", "", 16, 12, 13, 75, "15", "2287500.00"],
  ["5", "", "Hoa Hồng", 54000, "", 15, "", 10, 13, "", 20, 58, "14.5", "3132000.00"],
];
const H91cells = { A1: "DỰ ÁN TRƯỜNG HỌC XANH", A2: "Bảng 6. Dự kiến phân bổ cây dự án Trường học xanh", A3: "STT", B3: "Loại cây", C3: "Tên cây", D3: "Đơn giá",
  E3: "7A", F3: "7B", G3: "7C", H3: "7D", I3: "7E", J3: "7G", K3: "7H", L3: "Tổng số cây", M3: "Trung bình", N3: "Chi phí" };
H91_ROWS.forEach((r, i) => r.forEach((v, k) => { if (v !== "") H91cells["ABCDEFGHIJKLMN"[k] + (i + 4)] = String(v); }));
const H91 = { title: "THXanh.xlsx — Hình 9.1 (chưa định dạng)", cols: 14, rows: 8, widths: { A: 0.55, B: 1.1, C: 1.7, D: 0.95, L: 1.2, M: 1.3, N: 1.35 },
  cells: H91cells, bold: ["A1:A2", "A3:N3", "L4:L8"], color: { A1: "#15803d" }, size: { A1: 13 } };
// Sau khi định dạng: Trung bình 1 chữ số thập phân, Chi phí phân tách hàng nghìn, kẻ khung, tô nền tiêu đề
const fmt1 = (x) => (+x).toFixed(1), fmtM = (x) => (+x).toLocaleString("en-US");
const H91_AFTER = xl("ABCDEFGHIJKLMN".split(""), [
  [{ v: "DỰ ÁN TRƯỜNG HỌC XANH", span: 14, b: 1, c: "#15803d", al: "center" }],
  [{ v: "Bảng 6. Dự kiến phân bổ cây dự án Trường học xanh", span: 14, b: 1, al: "center" }],
  ["STT", "Loại cây", "Tên cây", "Đơn giá", "7A", "7B", "7C", "7D", "7E", "7G", "7H", "Tổng số cây", "Trung bình", "Chi phí"].map((v) => ({ v, al: "center" })),
  ...H91_ROWS.map((r, i) => [{ v: r[0], al: "center" }, ...(i === 0 ? [{ v: "Cây hoa", rows: 5, al: "center" }] : []), r[2], fmtM(r[3]), ...r.slice(4, 11).map((v) => ({ v, al: "center" })), { v: r[11], b: 1, al: "center" }, fmt1(r[12]), fmtM(r[13])]),
], { head: [2], grid: "#64748b", size: ".95rem", min: 900 });

// ---- Hình 9.3 / 9.4: Tỉ lệ = Số cây đã trồng / Số cây dự kiến ----
const TD = [["Hoa Mười giờ", 56, 55], ["Hoa Dạ yến thảo", 35, 42], ["Hoa Dừa cạn", 63, 49], ["Hoa Cúc vàng", 75, 63], ["Hoa Hồng", 58, 70]];
const H93cells = { A1: "DỰ ÁN TRƯỜNG HỌC XANH", A2: "Tiến độ thực hiện dự án", A3: "STT", B3: "Tên cây", C3: "Số cây dự kiến", D3: "Số cây đã trồng", E3: "Tỉ lệ %" };
TD.forEach(([n, a, b], i) => { const r = i + 4; Object.assign(H93cells, { ["A" + r]: String(i + 1), ["B" + r]: n, ["C" + r]: String(a), ["D" + r]: String(b) }); });
const H93_BASE = { title: "THXanh.xlsx — Tiến độ thực hiện dự án", cols: 5, rows: 8, widths: { A: 0.6, B: 1.9, C: 1.4, D: 1.4, E: 1.5 },
  cells: H93cells, bold: ["A1:A2", "A3:E3"], fill: { "A3:E3": "#fde047" }, color: { A1: "#15803d" }, center: ["A3:E3", "A4:A8"] };
const H94_HTML = xl(["A", "B", "C", "D", "E"], [
  [{ v: "DỰ ÁN TRƯỜNG HỌC XANH", span: 5, b: 1, c: "#15803d" }], [{ v: "Tiến độ thực hiện dự án", span: 5, b: 1 }],
  ["STT", "Tên cây", "Số cây dự kiến", "Số cây đã trồng", "Tỉ lệ %"].map((v) => ({ v, al: "center" })),
  ...TD.map(([n, a, b], i) => [{ v: i + 1, al: "center" }, n, a, b, (b / a * 100).toFixed(2) + "%"]),
], { head: [2] });

// ---- Hình 9.12: dữ liệu vừa có số vừa có chữ ----
const H912_ROWS = [
  ["1", "Hoa Mười giờ", "10", "Không", "15", "Không", "10", "14", "???"],
  ["2", "Hoa Dạ yến thảo", "Đang làm", "12", "12", "11", "???", "Không", ""],
  ["3", "Hoa Dừa cạn", "16", "Đang làm", "12", "???", "Không", "10", "???"],
  ["4", "Hoa Cúc vàng", "", "20", "Đang làm", "Không", "Đang làm", "12", "13"],
  ["5", "Hoa Hồng", "Không", "???", "???", "10", "13", "???", "Không"],
];
const H912cells = { A1: "DỰ ÁN TRƯỜNG HỌC XANH", A2: "Tiến độ thực tế các lớp", A3: "STT", B3: "Tên cây", C3: "7A", D3: "7B", E3: "7C", F3: "7D", G3: "7E", H3: "7G", I3: "7H", J3: "Tổng số cây" };
H912_ROWS.forEach((r, i) => r.forEach((v, k) => { if (v !== "") H912cells["ABCDEFGHI"[k] + (i + 4)] = v; }));
const H912_SUMS = {}; [4, 5, 6, 7, 8].forEach((r) => { H912_SUMS["J" + r] = `=SUM(C${r}:I${r})`; });
const H912_COUNTS = {}; "CDEFGHI".split("").forEach((c) => { H912_COUNTS[c + 9] = `=COUNT(${c}4:${c}8)`; });
const H912spec = (extra) => ({ title: "THXanh.xlsx — Tiến độ thực tế các lớp", cols: 10, rows: 9, widths: { A: 0.55, B: 1.8, J: 1.3 },
  cells: Object.assign({}, H912cells, extra), bold: ["A1:A2", "A3:J3", "J4:J8", "C9:I9"], fill: { "A3:J3": "#fde047" }, color: { A1: "#15803d" }, center: ["A3:J9"] });
const omit = (o, keys) => { const r = Object.assign({}, o); keys.forEach((k) => delete r[k]); return r; };
const H912_BASE = H912spec(omit(Object.assign({}, H912_SUMS, H912_COUNTS), ["J5", "H9"]));   // J5, H9 để HS tự nhập
const H912_FULL = H912spec(Object.assign({}, H912_SUMS, H912_COUNTS, { B11: "Gõ thử hàm vào đây:" }));

// ---- Trang tính 5. Tổng kết (Hình 9.13) ----
const T5 = { // STT, Loại cây, Tên cây, Đơn giá, 7A, 7B, 7C, 7D, 7E, 7G, 7H
  4: ["1", "Cây hoa", "Hoa Mười giờ", 25000, 10, "", 16, "", 16, 14, ""], 5: ["2", "", "Hoa Dạ yến thảo", 45000, "", 12, 12, 11, "", "", ""],
  6: ["3", "", "Hoa Dừa cạn", 15500, 16, "", 12, 10, "", 10, 15], 7: ["4", "", "Hoa Cúc vàng", 30500, 14, 20, "", "", 16, 12, 13],
  8: ["5", "", "Hoa Hồng", 54000, "", 15, "", 10, 13, "", 20],
  11: ["6", "Cây ăn quả", "Bưởi", 75000, 9, "", 10, "", 12, 15, 5], 12: ["7", "", "Xoài", 85000, 7, 10, "", 7, 10, "", 2],
  13: ["8", "", "Vú sữa", 45000, "", 5, 12, "", "", 5, ""], 14: ["9", "", "Khế", 34500, "", "", 13, "", "", "", 10],
  15: ["10", "", "Chanh", 25900, 5, 12, "", 10, 7, 6, ""], 16: ["11", "", "Táo", 38500, "", 5, "", 12, "", "", ""],
  19: ["12", "Cây bóng mát", "Bằng lăng", 54600, 5, "", 5, 7, 10, "", 5], 20: ["13", "", "Phượng vĩ", 72500, "", 6, 7, 4, 5, 10, ""],
  21: ["14", "", "Bàng", 80000, 7, 7, 4, 2, "", "", 3], 22: ["15", "", "Sưa đỏ", 120000, "", 8, 5, "", 3, 5, ""],
  23: ["16", "", "Muồng", 65000, 10, "", 8, 11, "", "", 10],
};
const T5cells = { A1: "DỰ ÁN TRƯỜNG HỌC XANH", A2: "Bảng 5. Dự kiến phân bổ cây dự án Trường học xanh", A3: "STT", B3: "Loại cây", C3: "Tên cây", D3: "Đơn giá",
  E3: "7A", F3: "7B", G3: "7C", H3: "7D", I3: "7E", J3: "7G", K3: "7H", L3: "Tổng số cây", M3: "Trung bình", N3: "Chi phí", B25: "Tổng số cây dự kiến theo lớp:" };
Object.entries(T5).forEach(([r, v]) => v.forEach((x, k) => { if (x !== "") T5cells["ABCDEFGHIJK"[k] + r] = String(x); }));
const CLS = "EFGHIJK".split(""), ROWS = [4, 5, 6, 7, 8, 11, 12, 13, 14, 15, 16, 19, 20, 21, 22, 23], TOT = [9, 17, 24, 25];
const F5 = {};
CLS.concat("L").forEach((c) => { F5[c + 9] = `=SUM(${c}4:${c}8)`; F5[c + 17] = `=SUM(${c}11:${c}16)`; F5[c + 24] = `=SUM(${c}19:${c}23)`; F5[c + 25] = `=${c}9+${c}17+${c}24`; });
ROWS.forEach((r) => { F5["L" + r] = `=SUM(E${r}:K${r})`; F5["M" + r] = `=AVERAGE(E${r}:K${r})`; F5["N" + r] = `=D${r}*L${r}`; });
TOT.forEach((r) => { F5["M" + r] = `=AVERAGE(E${r}:K${r})`; });
F5.N9 = "=SUM(N4:N8)"; F5.N17 = "=SUM(N11:N16)"; F5.N24 = "=SUM(N19:N23)"; F5.N25 = "=N9+N17+N24";
const T5spec = (extra, more) => Object.assign({ title: "THXanh.xlsx — 5. Tổng kết", sheets: ["3. Tìm hiểu giống cây", "4. Dự kiến kết quả", "5. Tổng kết"],
  cols: 14, rows: 25, widths: { A: 0.5, B: 1.35, C: 1.55, D: 1, L: 1.25, M: 1.25, N: 1.55 }, cells: Object.assign({}, T5cells, extra),
  bold: ["A1:A2", "A3:N3", "E9:N9", "E17:N17", "E24:N25", "L4:L25", "B25"], fill: { "A3:N3": "#fde047" }, color: { A1: "#15803d" } }, more || {});
// Thực hành: cột Chi phí của nhóm Cây hoa (N4:N9) và ô N25 để trống cho HS nhập
const T5_BASE = T5spec(omit(F5, ["N4", "N5", "N6", "N7", "N8", "N9", "N25"]));
const T5_FULL = T5spec(F5, { comma: ["D4:D25", "N4:N25"] });
const T5_VD2 = T5spec(Object.assign({}, F5, { O3: "Tỉ lệ" }), { cols: 15, widths: { A: 0.5, B: 1.35, C: 1.55, D: 1, L: 1.25, M: 1.25, N: 1.55, O: 1 }, comma: ["D4:D25", "N4:N25"],
  bold: ["A1:A2", "A3:O3", "E9:N9", "E17:N17", "E24:N25", "L4:L25", "B25"], fill: { "A3:O3": "#fde047" } });

const LESSON = {
  meta: {
    subject: "Tin học", grade: "7", book: "Kết nối tri thức với cuộc sống",
    title: "Bài 9: Trình bày bảng tính", unit: "Chủ đề 4 — Ứng dụng tin học",
    pages: "45–50", durationMinutes: 90,
  },
  objectives: {
    knowledge: [
      "Biết và thực hiện được một số chức năng định dạng dữ liệu số và trình bày bảng tính.",
      "Áp dụng được một số hàm tính toán dữ liệu như SUM, COUNT, AVERAGE, MIN, MAX vào dự án Trường học xanh.",
    ],
    competencies: [
      "Tự chủ, tự học; giao tiếp và hợp tác (nhóm 3–4 HS); giải quyết vấn đề và sáng tạo.",
      "Năng lực số 3.1.TC1a: kẻ khung, định dạng tiêu đề, trình bày bảng tính gọn gàng, khoa học, không làm thay đổi nội dung dữ liệu.",
      "Năng lực số 3.2.TC1a: lựa chọn kiểu hiển thị dữ liệu phù hợp (số, phần trăm, ngày tháng), màu nền, căn lề; làm nổi bật thông tin quan trọng.",
      "Năng lực AI 7.C4.1: phân tích vấn đề đạo đức từ dữ liệu huấn luyện AI; đánh giá, kiểm chứng gợi ý của AI khi trình bày bảng tính.",
    ],
    qualities: ["Nhân ái, chăm chỉ, trung thực, trách nhiệm khi thực hành nhóm."],
  },
  coreKnowledge: [
    "Định dạng dữ liệu số (Home → mũi tên nhóm Number → Format Cells): số chữ số thập phân (Decimal places), dấu “,” phân tách hàng nghìn, hàng triệu (Use 1000 Separator).",
    "Định dạng kiểu phần trăm (Percentage) và ngày tháng kiểu Việt Nam (Date, Locale Vietnamese, dd/mm/yyyy). Dữ liệu ngày tháng cộng được với số nguyên (số ngày) và trừ được cho nhau. Định dạng chỉ thay đổi cách hiển thị, không thay đổi dữ liệu.",
    "Trình bày bảng tính: chọn hàng/cột, nháy nút phải chuột → Delete (xoá), Insert (chèn: hàng mới ở trên, cột mới ở bên trái), Hide (ẩn), Unhide (hiện lại).",
    "Gộp ô: đánh dấu vùng → Home/Alignment/Merge & Center. Ô gộp có địa chỉ là ô đầu tiên bên trái, giữ dữ liệu ô đó; dữ liệu các ô khác bị xoá.",
    "Các hàm SUM, AVERAGE, COUNT, MIN, MAX chỉ tính trên các ô chứa dữ liệu số, bỏ qua ô chứa văn bản hoặc ô trống.",
  ],
  keywords: ["Format Cells", "Percentage", "Merge & Center", "Insert / Delete / Hide", "Hàm bỏ qua văn bản"],
  settings: { basePoints: 100, useTimer: false, defaultTime: 60, sound: true, streakEnabled: true },

  activities: [
    /* =========================== TIẾT 1 =========================== */
    /* ===================== HĐ1: KHỞI ĐỘNG (5 phút) ===================== */
    {
      id: "mo-dau", name: "Khởi động — Bảng tính này cần “trang điểm” không? 🤔", type: "knowledge",
      goal: "Nhận xét cách trình bày một bảng tính; nhận ra nhu cầu định dạng, trình bày bảng tính.",
      time: 300,
      task: "Quan sát bảng tính của dự án Trường học xanh (Hình 9.1), thảo luận: “Có cần chỉnh sửa, định dạng hay trình bày dữ liệu cho đẹp hơn không?”",
      sgkImage: "assets/sgk/hinh-9-1.jpg",
      sheet: H91,
      content: {
        heading: "🤔 Bảng tính này cần “trang điểm” không?",
        prompt: "Quan sát một phần bảng tính của dự án Trường học xanh, em có nhận xét gì?",
        revealLabel: "✨ Xem bảng tính SAU khi định dạng, trình bày",
        blocks: [
          { kind: "html", value: H91_AFTER },
          { kind: "list", value: ["Trung bình: làm tròn còn 1 chữ số thập phân → dễ đọc, dễ so sánh.", "Chi phí: dùng dấu “,” phân tách hàng nghìn, hàng triệu, bỏ phần .00 → hợp với số tiền.", "Gộp ô tiêu đề, gộp ô “Cây hoa”, kẻ khung, tô nền hàng tiêu đề cột → rõ ràng, đẹp mắt."] },
        ],
      },
      questions: [
        { type: "sheet", question: "Bấm vào ô có con số khó đọc nhất trong bảng.", answer: "M5",
          explanation: "Ô M5 = 11.66666667 có quá nhiều chữ số thập phân, khó đọc và khó so sánh với các ô khác trong cột Trung bình.", level: "nhan-biet", activity: "mo-dau" },
        { question: "Bảng tính ở Hình 9.1 cần chỉnh sửa những gì? (Chọn tất cả đáp án đúng)", type: "multiple-select",
          options: ["Làm tròn số thập phân ở cột Trung bình", "Phân tách hàng nghìn, hàng triệu ở cột Chi phí", "Xoá bớt các lớp cho bảng gọn", "Kẻ khung, làm nổi bật hàng tiêu đề", "Sửa lại số liệu cho tròn đẹp"],
          answer: [0, 1, 3], explanation: "Chỉ cần thay đổi cách hiển thị và trình bày (định dạng số, kẻ khung, tô nền…). Không được xoá hay sửa số liệu vì sẽ làm sai dữ liệu của dự án.",
          level: "thong-hieu", activity: "mo-dau" },
      ],
      remember: ["Định dạng dữ liệu và trình bày bảng tính giúp bảng tính dễ đọc, dễ so sánh, đẹp mắt — không làm thay đổi dữ liệu."],
    },

    /* ===================== HĐ2.1: ĐỊNH DẠNG DỮ LIỆU SỐ (15 phút) ===================== */
    {
      id: "dinh-dang-so", name: "Định dạng dữ liệu số — cửa sổ Format Cells 🔢", type: "knowledge",
      goal: "Biết cách định dạng số chữ số thập phân và dấu phân tách hàng nghìn.",
      time: 300,
      task: "Hoạt động 1 (SGK tr.45): nhóm thảo luận 2 câu hỏi về cột Trung bình và cột Chi phí, rồi trả lời các câu hỏi.",
      sgkImage: "assets/sgk/hinh-9-2.jpg",
      content: {
        heading: "🔢 Định dạng dữ liệu số",
        prompt: "Dữ liệu số trong bảng tính là các số nguyên hoặc số thập phân. Phần mềm bảng tính cho phép thiết lập cách thể hiện các số này.",
        revealLabel: "🔍 Cách làm (SGK tr.45–46)",
        blocks: [
          { kind: "list", value: [
            "Chọn vùng dữ liệu → chọn Home, nháy chuột vào mũi tên bên cạnh nhóm lệnh Number để mở cửa sổ Format Cells.",
            "Trong thẻ Number: chọn Number → 1. Decimal places: chọn số chữ số thập phân → 2. Use 1000 Separator (,): dùng dấu “,” ngăn cách hàng nghìn, hàng triệu… → 3. Nháy OK.",
          ] },
          { kind: "image", value: "assets/sgk/hinh-9-2.jpg", caption: "Hình 9.2. Cửa sổ Format Cells" },
        ],
      },
      questions: [
        { question: "Hoạt động 1, câu 1: Cột Trung bình (14; 11.66666667; 12.6; 15; 14.5) cần điều chỉnh gì để dễ đọc, dễ so sánh hơn?", type: "multiple-choice",
          options: ["Xoá cột Trung bình", "Định dạng cùng một số chữ số thập phân (ví dụ 1 chữ số: 14.0; 11.7; 12.6…)", "Đổi thành chữ in đậm", "Gõ lại bằng tay các số cho tròn"],
          answer: 1, explanation: "Định dạng số chữ số thập phân thống nhất: số gọn, thẳng cột, dễ so sánh. Không gõ lại bằng tay vì giá trị tính toán phải giữ nguyên.",
          level: "thong-hieu", activity: "dinh-dang-so" },
        { question: "Hoạt động 1, câu 2: Dữ liệu cột Chi phí (1400000.00; 976500.00…) nên trình bày lại thế nào cho phù hợp với số tiền?", type: "multiple-choice",
          options: ["Phân tách hàng nghìn, hàng triệu bằng dấu “,”, không cần phần thập phân: 1,400,000", "Để nguyên 1400000.00", "Viết thành chữ: một triệu bốn trăm nghìn", "Thêm 4 chữ số thập phân cho chính xác"],
          answer: 0, explanation: "Số tiền đồng không có phần lẻ; dùng dấu phân tách hàng nghìn giúp đọc nhanh: 1,400,000.",
          level: "thong-hieu", activity: "dinh-dang-so" },
        { question: "Trong cửa sổ Format Cells (Hình 9.2), mục nào dùng để chọn số chữ số thập phân?", type: "multiple-choice", sgkImage: "assets/sgk/hinh-9-2.jpg",
          options: ["Use 1000 Separator (,)", "Negative numbers", "Decimal places", "Category"],
          answer: 2, explanation: "Decimal places: số chữ số thập phân. Use 1000 Separator (,): dấu ngăn cách hàng nghìn.", level: "nhan-biet", activity: "dinh-dang-so" },
        { question: "Ô M5 chứa 11.66666667, được định dạng hiển thị 1 chữ số thập phân thành 11.7. Giá trị thật lưu trong ô cũng bị đổi thành 11.7.", type: "true-false", answer: false,
          explanation: "Sai. Định dạng chỉ thay đổi cách hiển thị; giá trị trong ô vẫn là 11.66666667 và vẫn dùng đầy đủ khi tính toán.", level: "van-dung", activity: "dinh-dang-so" },
      ],
    },
    {
      id: "phan-tram", name: "Định dạng dữ liệu kiểu phần trăm % 📈", type: "knowledge",
      goal: "Biết định dạng dữ liệu tỉ lệ thành số phần trăm.",
      time: 240,
      task: "Nhập công thức tính tỉ lệ = Số cây đã trồng / Số cây dự kiến (Hình 9.3), rồi dự đoán kết quả sau khi định dạng Percentage.",
      sgkImage: "assets/sgk/hinh-9-3.jpg",
      sheet: H93_BASE,
      content: {
        heading: "📈 Định dạng dữ liệu kiểu phần trăm",
        prompt: "Tỉ lệ giữa hai giá trị a/b mô tả thành số phần trăm là (a/b) × 100(%). Phần mềm bảng tính có lệnh để hiển thị tỉ lệ dưới dạng phần trăm.",
        revealLabel: "🔍 Cách làm & kết quả (Hình 9.4)",
        blocks: [
          { kind: "text", value: "Đánh dấu vùng dữ liệu → trong cửa sổ Format Cells chọn Number, chọn kiểu Percentage → nháy OK." },
          { kind: "html", value: H94_HTML },
          { kind: "image", value: "assets/sgk/hinh-9-4.jpg", caption: "Hình 9.4. Sau khi định dạng kiểu dữ liệu phần trăm (percentage)" },
        ],
      },
      questions: [
        { question: "Nhập công thức vào ô E4 tính tỉ lệ Số cây đã trồng / Số cây dự kiến của Hoa Mười giờ, rồi sao chép xuống E5:E8.", type: "sheet", mode: "formula", target: "E4:E8", answer: "=D4/C4",
          explanation: "E4 = D4/C4 → 0.982142857…; sao chép xuống: E5 = D5/C5… (Hình 9.3).", level: "van-dung", activity: "phan-tram" },
        { question: "Ô E4 = 0.982142857. Sau khi định dạng Percentage với 2 chữ số thập phân, ô hiển thị là:", type: "multiple-choice",
          options: ["0.98%", "98.21%", "9821%", "0.982142857%"],
          answer: 1, explanation: "0.982142857 × 100 = 98.2142857… → hiển thị 98.21% (Hình 9.4).", level: "thong-hieu", activity: "phan-tram" },
        { question: "Hoa Dạ yến thảo có tỉ lệ 120.00%. Điều đó cho biết gì?", type: "multiple-choice",
          options: ["Số cây đã trồng ít hơn dự kiến", "Số cây đã trồng bằng dự kiến", "Số cây đã trồng vượt dự kiến (42 so với 35)", "Bảng tính bị lỗi"],
          answer: 2, explanation: "42/35 = 1.2 = 120%: đã trồng vượt 20% so với dự kiến.", level: "van-dung", activity: "phan-tram" },
      ],
    },
    {
      id: "ngay-thang", name: "Định dạng dữ liệu ngày tháng 📅", type: "knowledge",
      goal: "Biết định dạng ngày tháng kiểu Việt Nam; biết phép cộng, trừ với dữ liệu ngày tháng.",
      time: 240,
      task: "Đọc SGK tr.46–47, quan sát Hình 9.5, 9.6 và trả lời câu hỏi.",
      sgkImage: "assets/sgk/hinh-9-5.jpg",
      content: {
        heading: "📅 Định dạng dữ liệu ngày tháng",
        prompt: "Phần mềm bảng tính cho phép nhập ngày tháng theo khuôn dạng mm/dd/yyyy (tháng/ngày/năm), các số cách nhau bởi dấu “/” hoặc “–”.",
        revealLabel: "🔍 Cách làm (Hình 9.5) & phép cộng, trừ (Hình 9.6)",
        blocks: [
          { kind: "list", value: [
            "Đánh dấu vùng dữ liệu → Format Cells: 1. chọn Number → 2. chọn Date → 3. Locale (location): chọn Vietnamese → 4. chọn kiểu ngày/tháng/năm → 5. nháy OK.",
            "Lưu ý: việc chỉnh sửa chỉ thay đổi cách hiển thị; việc nhập dữ liệu vẫn cần tuân theo thứ tự mặc định của phần mềm.",
            "Dữ liệu ngày tháng có thể cộng với số nguyên (mỗi số nguyên là một ngày) và trừ hai dữ liệu ngày tháng cho nhau.",
          ] },
          { kind: "image", value: "assets/sgk/hinh-9-5.jpg", caption: "Hình 9.5. Cách thiết lập hiển thị ngày tháng của Việt Nam" },
          { kind: "image", value: "assets/sgk/hinh-9-6.jpg", caption: "Hình 9.6. Dữ liệu ngày tháng với các phép toán cộng, trừ" },
        ],
      },
      questions: [
        { question: "Theo khuôn dạng mặc định mm/dd/yyyy, muốn nhập ngày 15 tháng 3 năm 2021, em gõ:", type: "multiple-choice",
          options: ["15/3/2021", "3/15/2021", "2021/15/3", "15-2021-3"],
          answer: 1, explanation: "Mặc định nhập tháng trước, ngày sau, rồi đến năm: 3/15/2021.", level: "thong-hieu", activity: "ngay-thang" },
        { question: "Hình 9.6 (hiển thị kiểu Việt Nam): ô A2 là 3/1/2020, ô B2 là 30. Công thức =A2+B2 cho kết quả:", type: "multiple-choice", sgkImage: "assets/sgk/hinh-9-6.jpg",
          options: ["33/1/2020", "3/31/2020", "2/2/2020", "30"],
          answer: 2, explanation: "Ngày 3/1/2020 + 30 ngày = ngày 2/2/2020 (mỗi số nguyên được tính là một ngày).", level: "van-dung", activity: "ngay-thang" },
        { question: "Kết quả của phép trừ ngày 31/3/2021 − 15/3/2021 là:", type: "short", answer: ["16", "16 ngày"],
          explanation: "31/3/2021 − 15/3/2021 = 16 ngày (Hình 9.6).", level: "van-dung", activity: "ngay-thang" },
        { question: "Sau khi định dạng ngày tháng kiểu Việt Nam, em có thể nhập dữ liệu theo thứ tự ngày/tháng/năm.", type: "true-false", answer: false,
          explanation: "Sai. Định dạng chỉ thay đổi cách hiển thị; việc nhập dữ liệu vẫn tuân theo thứ tự mặc định của phần mềm (tháng/ngày/năm).", level: "thong-hieu", activity: "ngay-thang" },
      ],
      remember: ["Có thể định dạng dữ liệu số: số chữ số thập phân, phân tách hàng nghìn, hàng triệu…; định dạng kiểu phần trăm và ngày tháng của Việt Nam (dd/mm/yyyy)."],
    },
    {
      id: "ghep-dinh-dang", name: "Chọn kiểu định dạng phù hợp 🎯", type: "matching",
      goal: "Lựa chọn kiểu hiển thị phù hợp với từng loại dữ liệu.",
      time: 150,
      task: "Ghép mỗi dữ liệu với kiểu định dạng phù hợp nhất. Làm hết rồi bấm Nộp bài.",
      pairs: [
        { left: "Trung bình số cây: 11.66666667", right: "Number — 1 chữ số thập phân" },
        { left: "Chi phí: 1400000.00", right: "Number — 0 chữ số thập phân, Use 1000 Separator (,)" },
        { left: "Tỉ lệ đã trồng: 0.982142857", right: "Percentage" },
        { left: "Ngày trồng cây: 3/15/2023", right: "Date — Locale Vietnamese (dd/mm/yyyy)" },
      ],
      explanation: "Số đo lường → số chữ số thập phân phù hợp · Số tiền → phân tách hàng nghìn · Tỉ lệ → phần trăm · Ngày → kiểu ngày Việt Nam.",
    },

    /* ===================== HĐ2.2: TRÌNH BÀY BẢNG TÍNH (10 phút) ===================== */
    {
      id: "trinh-bay", name: "Trình bày bảng tính — chèn, xoá, ẩn, hiện hàng và cột 🧱", type: "knowledge",
      goal: "Biết các lệnh chèn, xoá, ẩn, hiện hàng và cột.",
      time: 300,
      task: "Hoạt động 2 (SGK tr.47): nhóm thảo luận 2 câu hỏi; đọc SGK tr.48 về các lệnh với hàng, cột rồi trả lời câu hỏi.",
      sgkImage: "assets/sgk/sgk-trang48.jpg",
      content: {
        heading: "🧱 Các lệnh chèn, xoá, ẩn, hiện hàng và cột",
        revealLabel: "🔍 Cách làm (SGK tr.48)",
        blocks: [
          { kind: "list", value: [
            "Xoá hàng, cột: nháy chuột vào tên cột/hàng để chọn → nháy nút phải chuột vào chỗ chọn → Delete. Có thể chọn nhiều hàng (cột) để xoá đồng thời.",
            "Chèn hàng, cột mới: chọn hàng (dưới hàng muốn chèn) hoặc cột (bên phải cột muốn chèn) → nháy nút phải chuột → Insert. Hàng mới chèn vào bên trên hàng em chọn, cột mới chèn vào bên trái cột em chọn.",
            "Ẩn hàng, cột: chọn hàng/cột → nháy nút phải chuột → Hide. Hiện lại: chọn các hàng, cột xung quanh vị trí bị ẩn → nháy nút phải chuột → Unhide.",
          ] },
          { kind: "image", value: "assets/sgk/hinh-9-7.jpg", caption: "Hình 9.7. Ẩn hàng và cột" },
        ],
      },
      questions: [
        { question: "Hoạt động 2, câu 2: Các lệnh trình bày bảng tính hay định dạng dữ liệu có làm thay đổi dữ liệu trên bảng tính không?", type: "multiple-choice",
          options: ["Có, dữ liệu bị làm tròn luôn", "Không, chỉ thay đổi cách hiển thị, trình bày", "Có, dữ liệu bị xoá hết", "Chỉ thay đổi dữ liệu văn bản"],
          answer: 1, explanation: "Định dạng dữ liệu và trình bày bảng tính giúp bảng tính gọn gàng, dễ hiểu, bắt mắt hơn nhưng không làm thay đổi dữ liệu.", level: "thong-hieu", activity: "trinh-bay" },
        { question: "Quan sát tên cột và hàng ở Hình 9.7. Những gì đang bị ẩn?", type: "multiple-choice", sgkImage: "assets/sgk/hinh-9-7.jpg",
          options: ["Cột B và hàng 3", "Cột D và các hàng từ 4 đến 8", "Cột E, F, G", "Không có gì bị ẩn"],
          answer: 1, explanation: "Tên cột nhảy từ C sang E → cột D bị ẩn; tên hàng nhảy từ 3 sang 9 → các hàng 4 đến 8 bị ẩn.", level: "van-dung", activity: "trinh-bay" },
        { question: "Muốn chèn một hàng trống vào giữa hàng 5 và hàng 6, em chọn hàng nào rồi nháy nút phải chuột, chọn Insert?", type: "multiple-choice",
          options: ["Hàng 5", "Hàng 6", "Hàng 4", "Hàng 7"],
          answer: 1, explanation: "Hàng mới được chèn vào bên trên hàng em chọn → chọn hàng 6.", level: "van-dung", activity: "trinh-bay" },
        { question: "Cột D đang bị ẩn. Để hiện lại cột D, em làm thế nào?", type: "multiple-choice",
          options: ["Chọn cột C và cột E, nháy nút phải chuột, chọn Unhide", "Chọn cột C, chọn Delete", "Chọn cột E, chọn Insert", "Gõ lại toàn bộ dữ liệu cột D"],
          answer: 0, explanation: "Chọn các cột xung quanh vị trí bị ẩn (C và E), nháy nút phải chuột và chọn Unhide.", level: "thong-hieu", activity: "trinh-bay" },
      ],
    },
    {
      id: "chon-lenh", name: "Trò chơi: Dùng lệnh nào? 🧩", type: "matching",
      goal: "Chọn đúng lệnh định dạng, trình bày cho từng yêu cầu.",
      time: 150,
      task: "Ghép mỗi việc cần làm với lệnh phù hợp. Làm hết rồi bấm Nộp bài.",
      pairs: [
        { left: "Bỏ hẳn cột 7H khỏi bảng", right: "Delete" },
        { left: "Thêm cột Đơn giá vào bên trái cột 7A", right: "Insert" },
        { left: "Tạm giấu các cột lớp cho bảng gọn, dễ quan sát", right: "Hide" },
        { left: "Hiển thị lại các cột đã giấu", right: "Unhide" },
        { left: "Gộp các ô A1:N1 làm tiêu đề ở giữa bảng", right: "Merge & Center" },
        { left: "Hiển thị chi phí có dấu phân tách hàng nghìn", right: "Format Cells" },
      ],
      explanation: "Delete: xoá · Insert: chèn · Hide: ẩn · Unhide: hiện lại · Merge & Center: gộp ô và căn giữa · Format Cells: định dạng dữ liệu.",
    },
    {
      id: "gop-o", name: "Gộp các ô của một vùng dữ liệu 🔗", type: "knowledge",
      goal: "Biết cách gộp ô và hiểu điều xảy ra với dữ liệu khi gộp.",
      time: 300,
      task: "Đọc SGK tr.48, quan sát Hình 9.8 → 9.11. Trên Excel (trang tính 4): chèn 1 hàng trống giữa hàng 5, 6; xoá hàng 7; ẩn cột D đến J; nhập “Hoa” vào B8 rồi gộp B4:B8. Trả lời các câu hỏi.",
      sgkImage: "assets/sgk/hinh-9-8-9.jpg",
      content: {
        heading: "🔗 Lệnh gộp các ô của một vùng dữ liệu",
        revealLabel: "🔍 Cách làm & lưu ý (SGK tr.48)",
        blocks: [
          { kind: "text", value: "Đánh dấu vùng dữ liệu (các ô muốn gộp) → chọn Home/Alignment/Merge & Center." },
          { kind: "image", value: "assets/sgk/hinh-9-8-9.jpg", caption: "Hình 9.8. Trước khi gộp ô · Hình 9.9. Sau khi gộp ô" },
          { kind: "text", value: "Lưu ý: Sau khi gộp, ô kết quả sẽ có địa chỉ là ô đầu tiên bên trái của vùng đã gộp và lưu kết quả của ô này. Dữ liệu trong các ô khác sẽ bị xoá khi gộp." },
          { kind: "image", value: "assets/sgk/hinh-9-10-11.jpg", caption: "Hình 9.10. Chọn các ô của vùng dữ liệu A2:B3 · Hình 9.11. Sau khi gộp, ô đã gộp có địa chỉ là A2" },
          { kind: "ext", value: "Muốn huỷ gộp: chọn ô đã gộp, nháy lại nút Merge & Center (hoặc chọn Unmerge Cells). Dữ liệu các ô khác đã bị xoá không tự khôi phục." },
        ],
      },
      questions: [
        { question: "Gộp vùng A2:B3 (Hình 9.10). Ô đã gộp có địa chỉ là gì? (gõ địa chỉ ô)", type: "short", answer: ["A2"],
          explanation: "Ô kết quả có địa chỉ là ô đầu tiên bên trái của vùng đã gộp: A2 (Hình 9.11).", level: "thong-hieu", activity: "gop-o" },
        { question: "Ô B4 chứa “Cây hoa”, ô B8 chứa “Hoa”. Em gộp vùng B4:B8. Điều gì xảy ra?", type: "multiple-choice",
          options: ["Ô gộp hiển thị “Cây hoa Hoa”", "Ô gộp giữ “Cây hoa”; chữ “Hoa” ở B8 bị xoá", "Ô gộp giữ “Hoa”; “Cây hoa” bị xoá", "Không gộp được"],
          answer: 1, explanation: "Ô gộp giữ dữ liệu của ô đầu tiên bên trái (B4); dữ liệu trong các ô khác (B8) bị xoá khi gộp.", level: "van-dung", activity: "gop-o" },
        { question: "Lệnh gộp các ô của một vùng dữ liệu là:", type: "multiple-choice",
          options: ["Home/Number/Format Cells", "Chuột phải/Insert", "Home/Alignment/Merge & Center", "Chuột phải/Hide"],
          answer: 2, explanation: "Đánh dấu vùng dữ liệu, chọn Home/Alignment/Merge & Center.", level: "nhan-biet", activity: "gop-o" },
      ],
      remember: ["Gộp ô: đánh dấu vùng → Home/Alignment/Merge & Center. Ô gộp có địa chỉ ô đầu tiên bên trái, dữ liệu các ô khác bị xoá."],
    },

    /* =========================== TIẾT 2 =========================== */
    /* ===================== HĐ2.3: TÍNH CHẤT CỦA CÁC HÀM (10 phút) ===================== */
    {
      id: "tinh-chat-ham", name: "Tính chất của các hàm trên bảng tính 🧮", type: "knowledge",
      goal: "Hiểu: các hàm SUM, AVERAGE, COUNT, MIN, MAX chỉ tính trên ô chứa số, bỏ qua ô văn bản, ô trống.",
      time: 600,
      task: "Hoạt động 3 (SGK tr.49): nhập công thức tại J5 và H9 ở bảng tiến độ thực tế (Hình 9.12); kiểm tra kết quả có luôn đúng không; tính các hàm trong câu hỏi SGK.",
      sgkImage: "assets/sgk/hinh-9-12.jpg",
      sheet: H912_BASE,
      sandbox: Object.assign({}, H912_FULL, { intro: "🧪 Gõ thử vào ô trống (ví dụ B12): =COUNT(C6:I6) · =AVERAGE(C7:I7) · =MAX(C4:I8) · =SUM(C4:I8) — rồi thử sửa “???” thành một số để xem kết quả tự cập nhật!" }),
      content: {
        heading: "🧮 Tính chất của các hàm trên bảng tính",
        prompt: "Bảng ghi số liệu cụ thể, hoặc ghi “Không” nếu lớp không có cây này, “Đang làm” nếu chưa có số liệu, “???” nếu chưa biết thông tin. Cột cuối tính Tổng số cây theo từng loại, hàng cuối đếm số loại cây đã trồng của mỗi lớp. Các kết quả có luôn đúng không? Vì sao?",
        revealLabel: "💡 Tính chất đặc biệt của hàm (SGK tr.49)",
        blocks: [
          { kind: "text", value: "Các hàm tính toán của bảng tính điện tử như SUM, AVERAGE, COUNT, MIN, MAX sẽ chỉ tính toán trên các ô chứa dữ liệu số và bỏ qua các ô chứa dữ liệu dạng văn bản hoặc ô trống. Tính chất đặc biệt này giúp cho bảng dữ liệu theo dõi quá trình thực hiện dự án như Hình 9.12 sẽ luôn cho kết quả đúng." },
        ],
      },
      questions: [
        { question: "Nhập hàm vào ô J5 để tính tổng số cây Hoa Dạ yến thảo đã trồng của các lớp.", type: "sheet", mode: "formula", target: "J5", answer: "=SUM(C5:I5)",
          explanation: "J5 = SUM(C5:I5) = 12 + 12 + 11 = 35. Các ô “Đang làm”, “???”, “Không” và ô trống được bỏ qua.", level: "van-dung", activity: "tinh-chat-ham" },
        { question: "Nhập hàm vào ô H9 để đếm số loại cây lớp 7G đã trồng (đã có số liệu).", type: "sheet", mode: "formula", target: "H9", answer: "=COUNT(H4:H8)",
          explanation: "H9 = COUNT(H4:H8) = 3 (các ô 14, 10, 12). COUNT chỉ đếm các ô chứa số.", level: "van-dung", activity: "tinh-chat-ham" },
        { question: "Hoạt động 3: Các kết quả của bảng dữ liệu Hình 9.12 có luôn đúng không? Vì sao?", type: "multiple-choice",
          options: ["Không, vì trong bảng có chữ nên hàm báo lỗi", "Có, vì các hàm chỉ tính trên các ô chứa số, bỏ qua ô chứa văn bản hoặc ô trống", "Không, vì phải xoá hết chữ thì hàm mới tính được", "Có, vì hàm tự đổi chữ thành số 0 rồi đếm luôn"],
          answer: 1, explanation: "Hàm bỏ qua văn bản và ô trống nên khi lớp cập nhật số liệu, kết quả tự động đúng.", level: "thong-hieu", activity: "tinh-chat-ham" },
        { question: "Câu hỏi SGK tr.49 — a) =COUNT(C6:I6) cho kết quả bao nhiêu?", type: "short", answer: ["3"],
          explanation: "Hàng 6 có các số 16, 12, 10 → COUNT = 3 (bỏ qua “Đang làm”, “???”, “Không”).", level: "van-dung", activity: "tinh-chat-ham" },
        { question: "Câu hỏi SGK tr.49 — b) =AVERAGE(C7:I7) cho kết quả bao nhiêu?", type: "short", answer: ["15"],
          explanation: "Hàng 7 có các số 20, 12, 13 → AVERAGE = (20 + 12 + 13) : 3 = 15.", level: "van-dung", activity: "tinh-chat-ham" },
        { question: "Câu hỏi SGK tr.49 — c) =MAX(C4:I8) cho kết quả bao nhiêu?", type: "short", answer: ["20"],
          explanation: "Số lớn nhất trong vùng C4:I8 là 20 (ô D7).", level: "van-dung", activity: "tinh-chat-ham" },
        { question: "Câu hỏi SGK tr.49 — d) =SUM(C4:I8) cho kết quả bao nhiêu?", type: "short", answer: ["190"],
          explanation: "SUM(C4:I8) = 49 + 35 + 38 + 45 + 23 = 190 (tổng các số trong vùng).", level: "van-dung-cao", activity: "tinh-chat-ham" },
      ],
      remember: ["Các hàm SUM, AVERAGE, COUNT, MIN, MAX chỉ tính toán trên các ô chứa dữ liệu số, bỏ qua các ô chứa dữ liệu văn bản hoặc ô trống."],
    },

    /* ===================== HĐ2.4: THỰC HÀNH (30 phút) ===================== */
    {
      id: "cac-buoc-thuc-hanh", name: "Thực hành — Sắp xếp các bước hoàn thiện Trang tính 5 🔢", type: "ordering",
      goal: "Nắm trình tự các bước thực hành trong SGK.",
      time: 120,
      task: "Sắp xếp các bước hoàn thiện dữ liệu dự án Trường học xanh theo đúng thứ tự SGK rồi bấm Nộp bài.",
      sgkImage: "assets/sgk/sgk-trang49.jpg",
      steps: [
        "Mở tệp THXanh.xlsx, tạo trang tính mới đặt tên 5. Tổng kết",
        "Sao chép toàn bộ dữ liệu trang tính 4. Dự kiến kết quả sang trang 5. Tổng kết, sửa tên bảng tại ô A2",
        "Chèn cột Đơn giá bên trái cột 7A, sao chép đơn giá từ trang tính 3. Tìm hiểu giống cây",
        "Tạo cột Chi phí, nhập công thức Chi phí = Đơn giá × Tổng số cây",
        "Định dạng dữ liệu cho trang tính như Hình 9.13 và lưu lại kết quả",
      ],
      explanation: "a) Tạo trang tính mới → b) Nhập, sao chép dữ liệu → c) Chèn cột Đơn giá, tạo cột Chi phí và công thức → d) Định dạng, lưu kết quả.",
    },
    {
      id: "thuc-hanh", name: "Thực hành: Hoàn thiện dữ liệu dự án Trường học xanh 🌳", type: "knowledge",
      goal: "Thiết lập công thức tính chi phí mỗi loại cây, toàn bộ dự án; định dạng, trình bày Trang tính 5.",
      time: 1500,
      task: "Làm trên Excel với tệp THXanh.xlsx theo 4 bước SGK (a–d). Máy/điện thoại không có Excel: làm các câu nhập công thức trên bảng tính mô phỏng (đã chèn sẵn cột Đơn giá).",
      sgkImage: "assets/sgk/hinh-9-13.jpg",
      sheet: T5_BASE,
      content: {
        heading: "🌳 Trang tính 5. Tổng kết",
        revealLabel: "📖 Hướng dẫn trên Excel (SGK tr.49–50)",
        blocks: [
          { kind: "list", value: [
            "a) Mở tệp THXanh.xlsx; tạo thêm một trang tính mới đặt tên 5. Tổng kết.",
            "b) Mở trang tính 4. Dự kiến kết quả, sao chép toàn bộ dữ liệu sang trang tính 5. Tổng kết; sửa tên bảng tại ô A2: Bảng 5. Dự kiến phân bổ cây dự án Trường học xanh.",
            "c) Chọn cột D (cột của lớp 7A), nháy nút phải chuột, chọn Insert để chèn thêm cột; đặt tiêu đề Đơn giá. Sao chép đơn giá từ trang tính 3. Tìm hiểu giống cây vào đúng các ô tương ứng (trang 5 có các hàng trống giữa các loại cây). Tạo cột Chi phí bên phải cột Trung bình (cột N), nhập công thức Chi phí = Đơn giá × Tổng số cây. Tính tổng chi phí tại N9, N17, N24, N25 (nhập trực tiếp hoặc sao chép công thức từ E9, E17, E24, E25).",
            "d) Định dạng dữ liệu cho trang tính, có thể theo mẫu Hình 9.13 (Trung bình, Chi phí, gộp ô tiêu đề, kẻ khung, tô nền…). Lưu lại kết quả.",
          ] },
          { kind: "image", value: "assets/sgk/hinh-9-13.jpg", caption: "Hình 9.13. Trang tính 5. Tổng kết" },
        ],
      },
      questions: [
        { question: "Nhập công thức vào ô N4 tính Chi phí = Đơn giá × Tổng số cây của Hoa Mười giờ, rồi sao chép xuống N5:N8.", type: "sheet", mode: "formula", target: "N4:N8", answer: "=D4*L4",
          explanation: "N4 = D4*L4 = 25000 × 56 = 1400000; sao chép xuống: N5 = D5*L5…", level: "van-dung", activity: "thuc-hanh" },
        { question: "Nhập công thức vào ô N9 tính tổng chi phí của nhóm Cây hoa.", type: "sheet", mode: "formula", target: "N9", answer: "=SUM(N4:N8)",
          explanation: "N9 = SUM(N4:N8) = 9371000 (có thể sao chép công thức từ ô E9 sang N9).", level: "van-dung", activity: "thuc-hanh" },
        { question: "Nhập công thức vào ô N25 tính chi phí của toàn bộ dự án.", type: "sheet", mode: "formula", target: "N25", answer: "=N9+N17+N24",
          explanation: "N25 = N9 + N17 + N24 = 30692200 (sao chép công thức từ ô E25 sang N25 cũng được).", level: "van-dung-cao", activity: "thuc-hanh" },
        { question: "Chi phí của toàn bộ dự án (ô N25) là 30692200. Sau khi định dạng Number, 0 chữ số thập phân, Use 1000 Separator, ô hiển thị:", type: "multiple-choice",
          options: ["30692200.00", "30,692,200", "30.692", "3.0692200"],
          answer: 1, explanation: "Dấu “,” phân tách hàng nghìn, hàng triệu: 30,692,200 — dễ đọc hơn nhiều.", level: "thong-hieu", activity: "thuc-hanh" },
      ],
    },

    {
      id: "tu-kiem-tra", name: "Phiếu tự kiểm tra sản phẩm Trang tính 5 📋", type: "checklist",
      goal: "Tự đánh giá mức độ hoàn thành Trang tính 5. Tổng kết trên Excel.",
      time: 180,
      task: "Nhóm đối chiếu Trang tính 5 trên Excel với Hình 9.13, tick từng việc vào cột Đã làm hoặc Chưa làm, ghi khó khăn (nếu có) rồi gửi cho thầy/cô.",
      sgkImage: "assets/sgk/hinh-9-13.jpg",
      columns: ["✅ Đã làm", "⏳ Chưa làm"],
      sections: [
        { title: "🧮 DỮ LIỆU VÀ CÔNG THỨC", items: [
          "Tạo trang tính 5. Tổng kết và sao chép dữ liệu từ trang tính 4",
          "Sửa tên bảng tại ô A2 thành Bảng 5",
          "Chèn cột Đơn giá và sao chép đúng đơn giá từng loại cây",
          "Tạo cột Chi phí với công thức Đơn giá × Tổng số cây",
          "Tính tổng chi phí tại N9, N17, N24, N25",
        ] },
        { title: "🎨 ĐỊNH DẠNG VÀ TRÌNH BÀY", items: [
          "Định dạng số chữ số thập phân cho cột Trung bình",
          "Định dạng cột Chi phí có dấu phân tách hàng nghìn",
          "Gộp ô tiêu đề và gộp ô tên loại cây",
          "Kẻ khung, tô nền hàng tiêu đề, in đậm các hàng tổng",
          "Lưu lại tệp THXanh.xlsx",
        ] },
      ],
      note: "Nhóm em gặp khó khăn ở bước nào? Em đã khắc phục như thế nào?",
      modelAnswer: [
        "Kết quả đúng: N9 = 9,371,000 · N17 = 10,359,000 · N24 = 10,962,200 · N25 = 30,692,200; L25 = 623; M25 = 89.",
        "Khó khăn thường gặp: sao chép đơn giá lệch hàng (trang 5 có các hàng trống giữa các loại cây); quên dấu = khi nhập công thức; gộp ô làm mất dữ liệu ô khác.",
      ],
    },

    /* ===================== HĐ3: LUYỆN TẬP (5 phút) ===================== */
    {
      id: "luyen-tap", name: "Luyện tập 📝", type: "knowledge",
      goal: "Củng cố: sao chép công thức giữa các trang tính; điều kiện gộp ô.",
      time: 300,
      task: "Nhóm thảo luận 2 câu Luyện tập (SGK tr.50), rồi làm thêm các câu củng cố.",
      sgkImage: "assets/sgk/sgk-trang50.jpg",
      questions: [
        { question: "Luyện tập 1: Có thể sao chép công thức từ trang tính này sang trang tính khác được không?", type: "true-false", answer: true,
          explanation: "Đúng. Có thể sao chép công thức từ trang tính này sang trang tính khác (như thực hành: sao chép dữ liệu, công thức trang 4 sang trang 5).", level: "nhan-biet", activity: "luyen-tap" },
        { question: "Luyện tập 2: Phần mềm bảng tính điện tử có thể gộp các ô trong một vùng không là hình chữ nhật không?", type: "multiple-choice",
          options: ["Có, gộp được mọi hình dạng", "Không, chỉ gộp được các ô của một vùng hình chữ nhật", "Chỉ gộp được các ô trên cùng một cột", "Chỉ gộp được 2 ô"],
          answer: 1, explanation: "Vùng dữ liệu luôn là hình chữ nhật (ví dụ A2:B3, B4:B8), nên chỉ gộp được các ô của một vùng hình chữ nhật.", level: "thong-hieu", activity: "luyen-tap" },
        { question: "Muốn cột Tỉ lệ hiển thị 98.21% thay vì 0.982142857, em chọn trong Format Cells:", type: "multiple-choice",
          options: ["Date", "Percentage", "Text", "Currency"],
          answer: 1, explanation: "Kiểu Percentage hiển thị tỉ lệ dưới dạng số phần trăm.", level: "nhan-biet", activity: "luyen-tap" },
      ],
    },
    {
      id: "tro-choi", name: "Trò chơi: Gieo mầm Trường học xanh 🌱", type: "penguin",
      pet: "🌱", homeIcon: "🌳", enemy: "🐛", saveWord: "mầm cây lớn thành cây xanh",
      winText: "Cả vườn trường đã xanh tươi — em trình bày bảng tính rất giỏi!",
      goal: "Củng cố toàn bài: định dạng dữ liệu, trình bày bảng tính, tính chất của hàm.",
      time: 300,
      task: "Trả lời đúng mỗi câu để một mầm cây lớn thành cây xanh trước khi sâu 🐛 kịp ăn lá!",
      intro: "Mỗi câu đúng: một mầm 🌱 lớn thành cây 🌳. Sai thì sâu 🐛 bò tới!",
      questions: [
        { question: "Để mở cửa sổ Format Cells, em chọn Home rồi nháy chuột vào mũi tên bên cạnh nhóm lệnh nào?", type: "multiple-choice",
          options: ["Font", "Number", "Styles", "Editing"],
          answer: 1, explanation: "Nháy vào mũi tên bên cạnh nhóm lệnh Number để mở cửa sổ Format Cells.", level: "nhan-biet", activity: "tro-choi" },
        { question: "Em chọn hàng 9 rồi nháy nút phải chuột, chọn Insert. Hàng mới được chèn vào đâu?", type: "multiple-choice",
          options: ["Bên dưới hàng 9", "Bên trên hàng 9", "Cuối trang tính", "Đầu trang tính"],
          answer: 1, explanation: "Hàng mới được chèn vào bên trên hàng em chọn.", level: "thong-hieu", activity: "tro-choi" },
        { question: "Em chọn cột D rồi chọn Insert. Cột mới được chèn vào đâu?", type: "multiple-choice",
          options: ["Bên phải cột D", "Cuối bảng", "Bên trái cột D", "Thay thế cột D"],
          answer: 2, explanation: "Cột mới được chèn vào bên trái cột em chọn.", level: "thong-hieu", activity: "tro-choi" },
        { question: "Vùng A1:B1 có A1 = “Tiêu đề”, B1 = “Bảng 5”. Gộp vùng A1:B1, ô gộp hiển thị:", type: "multiple-choice",
          options: ["Tiêu đề", "Bảng 5", "Tiêu đề Bảng 5", "Trống"],
          answer: 0, explanation: "Ô gộp giữ dữ liệu ô đầu tiên bên trái (A1); dữ liệu B1 bị xoá.", level: "van-dung", activity: "tro-choi" },
        { question: "Vùng C1:C4 chứa 10, “Không”, 20 và một ô trống. =AVERAGE(C1:C4) bằng:", type: "multiple-choice",
          options: ["7.5", "10", "30", "15"],
          answer: 3, explanation: "AVERAGE chỉ tính các ô chứa số: (10 + 20) : 2 = 15.", level: "van-dung", activity: "tro-choi" },
        { question: "Vùng D1:D5 chứa 5, “???”, 8, “Đang làm”, 0. =COUNT(D1:D5) bằng:", type: "multiple-choice",
          options: ["5", "2", "3", "13"],
          answer: 2, explanation: "COUNT đếm các ô chứa số: 5, 8, 0 → 3 (số 0 vẫn là số).", level: "van-dung-cao", activity: "tro-choi" },
        { question: "Mục Use 1000 Separator (,) trong Format Cells dùng để:", type: "multiple-choice",
          options: ["Dùng dấu “,” ngăn cách hàng nghìn, hàng triệu", "Làm tròn số đến hàng nghìn", "Nhân số với 1000", "Chia số cho 1000"],
          answer: 0, explanation: "Use 1000 Separator (,): dùng dấu “,” ngăn cách hàng nghìn, hàng triệu…", level: "nhan-biet", activity: "tro-choi" },
        { question: "Muốn tạm giấu các cột lớp 7A đến 7H cho bảng gọn khi trình chiếu, em dùng lệnh:", type: "multiple-choice",
          options: ["Delete", "Merge & Center", "Hide", "Insert"],
          answer: 2, explanation: "Hide làm ẩn hàng, cột; khi cần có thể Unhide để hiện lại — dữ liệu không mất.", level: "thong-hieu", activity: "tro-choi" },
      ],
    },

    /* ===================== HĐ4: VẬN DỤNG (15 phút) ===================== */
    {
      id: "van-dung", name: "Vận dụng — Đọc và tính trên Bảng 5 📊", type: "knowledge",
      goal: "Khai thác Bảng 5 (Hình 9.13); tính tỉ lệ phần trăm so với chỉ tiêu và định dạng phần trăm.",
      time: 900,
      task: "Vận dụng 1, 2 (SGK tr.50): quan sát Bảng 5 trên bảng tính mô phỏng và trả lời; tính tỉ lệ phần trăm từng loại cây hoa so với chỉ tiêu 50 cây, rồi định dạng Percentage trên Excel.",
      sgkImage: "assets/sgk/hinh-9-13.jpg",
      sheet: T5_VD2,
      questions: [
        { type: "sheet", question: "Vận dụng 1a: Bấm vào ô cho biết tổng số cây của toàn bộ khối 7 sẽ trồng.", answer: "L25",
          explanation: "Ô L25: tổng số cây dự kiến của cả khối 7 là 623 cây.", level: "nhan-biet", activity: "van-dung" },
        { question: "Vận dụng 1a: Tổng số cây của toàn bộ khối 7 sẽ trồng là bao nhiêu?", type: "short", answer: ["623", "623 cây"],
          explanation: "L25 = 623 cây.", level: "nhan-biet", activity: "van-dung" },
        { question: "Vận dụng 1b: Trung bình mỗi lớp sẽ trồng bao nhiêu cây?", type: "multiple-choice",
          options: ["41 cây", "89 cây", "623 cây", "104 cây"],
          answer: 1, explanation: "M25 = AVERAGE(E25:K25) = 623 : 7 = 89 cây.", level: "thong-hieu", activity: "van-dung" },
        { question: "Vận dụng 2: Chỉ tiêu mỗi loại cây hoa là 50 cây. Nhập công thức vào ô O4 tính tỉ lệ số cây Hoa Mười giờ được phân bổ so với chỉ tiêu, rồi sao chép xuống O5:O8.", type: "sheet", mode: "formula", target: "O4:O8", answer: "=L4/50",
          explanation: "O4 = L4/50 = 56/50 = 1.12; sao chép xuống O5 = L5/50… Sau đó định dạng Percentage: 112%, 70%, 126%, 150%, 116%.", level: "van-dung", activity: "van-dung" },
        { question: "Sau khi định dạng Percentage (0 chữ số thập phân), tỉ lệ của Hoa Cúc vàng (75 cây) so với chỉ tiêu 50 là:", type: "multiple-choice",
          options: ["75%", "1.5%", "150%", "12%"],
          answer: 2, explanation: "75/50 = 1.5 → 150%.", level: "van-dung", activity: "van-dung" },
        { question: "Loại cây hoa nào được phân bổ CHƯA đạt chỉ tiêu 50 cây?", type: "multiple-choice",
          options: ["Hoa Mười giờ (112%)", "Hoa Dạ yến thảo (70%)", "Hoa Dừa cạn (126%)", "Hoa Hồng (116%)"],
          answer: 1, explanation: "Hoa Dạ yến thảo: 35/50 = 70% < 100% → chưa đạt chỉ tiêu. Các loại hoa khác đều vượt chỉ tiêu.", level: "van-dung-cao", activity: "van-dung" },
      ],
      remember: ["Dùng công thức, hàm để tính và định dạng phù hợp (phần trăm, phân tách hàng nghìn) giúp khai thác dữ liệu dự án nhanh và rõ ràng."],
    },

    /* ===================== TỔNG KẾT ===================== */
    {
      id: "tong-ket", name: "Tổng kết", type: "summary",
      task: "Cả lớp nhắc lại kiến thức trọng tâm và làm thử thách cuối. Dặn dò: lưu tệp THXanh.xlsx; đọc trước Bài 10 “Hoàn thiện bảng tính”.",
      content: {
        learned: [
          "Format Cells (Home → mũi tên nhóm Number): số chữ số thập phân, dấu phân tách hàng nghìn, kiểu Percentage, kiểu Date của Việt Nam.",
          "Định dạng chỉ thay đổi cách hiển thị, không thay đổi dữ liệu; ngày tháng cộng được với số ngày, trừ được cho nhau.",
          "Chuột phải vào tên hàng/cột: Insert, Delete, Hide, Unhide.",
          "Merge & Center: gộp vùng hình chữ nhật; ô gộp giữ dữ liệu và địa chỉ ô đầu tiên bên trái.",
          "Các hàm SUM, AVERAGE, COUNT, MIN, MAX bỏ qua ô chứa văn bản và ô trống.",
        ],
        challenge: [
          { question: "Lớp 7E cập nhật ô “Đang làm” ở Hình 9.12 thành số 9. Kết quả tổng số cây ở cột J của hàng đó sẽ:", type: "multiple-choice",
            options: ["Không đổi vì hàm đã tính xong", "Báo lỗi vì trước đó là chữ", "Tự động tăng thêm 9", "Phải xoá công thức nhập lại"],
            answer: 2, explanation: "Hàm bỏ qua văn bản; khi ô có số, hàm tự tính lại — kết quả luôn đúng theo dữ liệu mới.",
            level: "van-dung-cao", activity: "tong-ket" },
          { question: "Việc nào KHÔNG phải là định dạng hay trình bày bảng tính?", type: "multiple-choice",
            options: ["Gộp ô tiêu đề", "Đổi 0.98 thành hiển thị 98%", "Ẩn các cột lớp", "Sửa số cây của lớp 7A từ 10 thành 12"],
            answer: 3, explanation: "Sửa số liệu là thay đổi dữ liệu. Định dạng, trình bày chỉ thay đổi cách hiển thị.",
            level: "thong-hieu", activity: "tong-ket" },
        ],
      },
    },
  ],
};

if (typeof module !== "undefined" && module.exports) module.exports = LESSON;
if (typeof window !== "undefined") window.LESSON = LESSON;
