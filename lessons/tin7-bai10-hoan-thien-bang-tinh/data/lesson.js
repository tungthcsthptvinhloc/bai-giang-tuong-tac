/* ============================================================================
 * BÀI 10 — HOÀN THIỆN BẢNG TÍNH  (Tin học 7 — Kết nối tri thức)
 * Chủ đề 4: Ứng dụng tin học (dự án Trường học xanh).
 * Bám sát SGK trang 51–54 + Kế hoạch bài dạy (2 tiết) của giáo viên.
 * Chỉ sửa file này để đổi nội dung. Engine app.js không cần sửa.
 * Thao tác với trang tính, kẻ viền, in: HS làm trên Excel thật (tệp THXanh.xlsx) — app không mô phỏng.
 * ==========================================================================*/

// ---- Bảng 2 (Hình 10.1): trên màn hình / khi in ra / sau khi kẻ viền ----
const B2_ROWS = [["STT", "Loại cây", "Vị trí", "Số lượng"], [1, "Cây hoa", 25, 10], [2, "Cây ăn quả", 20, 5], [3, "Cây bóng mát", 50, 3]];
const HD = "background:#eef1f5;color:#4b5563;font-weight:600;border:1px solid #d5d9e0;padding:2px 8px;font-size:.8rem";
const bang2 = (mode) => {
  const screen = mode === "screen", line = mode === "border" ? "1px solid #111" : screen ? "1px solid #d5d9e0" : "none";
  const cell = (v, i, j) => `<td style="border:${line};padding:4px 12px;white-space:nowrap;text-align:${typeof v === "number" ? "right" : "left"}">${v}</td>`;
  const tbl = `<table style="border-collapse:collapse;font-family:Calibri,'Segoe UI',Arial,sans-serif;font-size:1.05rem;background:#fff;${mode === "border" ? "border:2.5px solid #111;" : ""}">
    ${screen ? `<tr><th style="${HD}"></th>${"ABCD".split("").map((c) => `<th style="${HD}">${c}</th>`).join("")}</tr>` : ""}
    <tr>${screen ? `<th style="${HD}">1</th>` : ""}<td colspan="4" style="border:${screen ? line : "none"};border-bottom:${line};padding:4px 12px;white-space:nowrap">Bảng 2. Dự kiến số lượng cây cần trồng</td></tr>
    ${B2_ROWS.map((r, i) => `<tr>${screen ? `<th style="${HD}">${i + 2}</th>` : ""}${r.map((v, j) => cell(v, i, j)).join("")}</tr>`).join("")}</table>`;
  return screen ? `<div style="display:inline-block;border:1px solid #cbd5e1;border-radius:8px;overflow:hidden">${tbl}</div>`
    : `<div style="display:inline-block;background:#fff;padding:16px 20px;box-shadow:0 4px 16px rgba(0,0,0,.18);border-radius:4px">${tbl}</div>`;
};
const cap = (t, c) => `<div style="margin-top:8px;font-weight:700;color:${c || "#0e7490"}">${t}</div>`;
const B2_COMPARE = `<div style="display:flex;flex-wrap:wrap;gap:28px;justify-content:center;align-items:flex-start;text-align:center">
  <div>${bang2("screen")}${cap("🖥️ Trên màn hình (Hình 10.1a)")}</div>
  <div>${bang2("print")}${cap("🖨️ Khi in ra giấy (Hình 10.1b)", "#e11d74")}</div></div>`;
const B2_FIXED = `<div style="text-align:center">${bang2("border")}${cap("✅ Đã kẻ đường viền ô + khung bao quanh → bản in rõ ràng", "#16a34a")}</div>`;

// ---- 4 kiểu kẻ khung (trang Border — Presets) ----
const preset = (outer, inner, n, label) => {
  const R = 3, C = 3, ln = "1.5px solid #111";
  let h = `<table style="border-collapse:collapse;background:#fff;font-family:Calibri,Arial,sans-serif;font-size:1rem">`;
  for (let r = 0; r < R; r++) {
    h += "<tr>";
    for (let c = 0; c < C; c++) {
      const e = (edge, isOuter) => (isOuter ? (outer ? "2.5px solid #111" : "none") : inner ? ln : "none");
      h += `<td style="width:52px;height:30px;text-align:center;border-top:${e(0, r === 0)};border-bottom:${e(0, r === R - 1)};border-left:${e(0, c === 0)};border-right:${e(0, c === C - 1)}">${r === 0 ? ["STT", "Tên", "Số"][c] : [r, r === 1 ? "An" : "Bình", r * 5][c]}</td>`;
    }
    h += "</tr>";
  }
  return `<div style="text-align:center"><div style="display:inline-block;background:#fff;padding:12px;box-shadow:0 3px 10px rgba(0,0,0,.15);border-radius:4px">${h}</table></div><div style="margin-top:6px;font-weight:800;font-size:1.15rem">${n}</div>${label ? `<div style="color:#4a5f66">${label}</div>` : ""}</div>`;
};
const PRESETS = (withLabel) => `<div style="display:flex;flex-wrap:wrap;gap:26px;justify-content:center">
  ${preset(false, false, "①", withLabel && "None")}${preset(true, false, "②", withLabel && "Outline")}${preset(false, true, "③", withLabel && "Inside")}${preset(true, true, "④", withLabel && "Outline + Inside")}</div>
  <p style="text-align:center;color:#4a5f66;margin:.6rem 0 0">(Các bảng như khi đã in ra giấy)</p>`;

// ---- Mô phỏng thanh trang tính (Hình 10.2) ----
const TABS = (names, on) => `<div style="display:inline-flex;align-items:stretch;border:1px solid #cbd5e1;background:#f1f5f9;border-radius:6px;overflow:hidden;font-family:'Segoe UI',Arial,sans-serif">
  ${names.map((n, i) => `<span style="padding:8px 18px;border-right:1px solid #cbd5e1;${i === on ? "background:#fff;font-weight:800;color:#15803d;border-bottom:3px solid #15803d" : "color:#334155"}">${n}</span>`).join("")}
  <span style="padding:6px 14px;font-size:1.3rem;color:#334155" title="Tạo trang tính mới">⊕</span></div>`;

// ---- Bảng 2 trên bảng tính mô phỏng ----
const B2S = { title: "Bảng 2.xlsx", cols: 5, rows: 6, widths: { A: 0.7, B: 1.6, C: 0.9, D: 1.1, E: 0.8 },
  cells: { A1: "Bảng 2. Dự kiến số lượng cây cần trồng", A2: "STT", B2: "Loại cây", C2: "Vị trí", D2: "Số lượng",
    A3: "1", B3: "Cây hoa", C3: "25", D3: "10", A4: "2", B4: "Cây ăn quả", C4: "20", D4: "5", A5: "3", B5: "Cây bóng mát", C5: "50", D5: "3" } };

// ---- Trang tính 6. Hoàn thiện (Hình 10.6) — dữ liệu sao chép từ trang tính 5. Tổng kết ----
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
const HEAD = ["STT", "Loại cây", "Tên cây", "Đơn giá", "7A", "7B", "7C", "7D", "7E", "7G", "7H", "Tổng số cây", "Trung bình", "Chi phí"];
const T6cells = { A1: "DỰ ÁN TRƯỜNG HỌC XANH", A2: "Bảng 6. Dự kiến phân bổ và chi phí dự án Trường học xanh", B25: "Tổng số cây tính theo lớp:" };
HEAD.forEach((h, k) => { T6cells["ABCDEFGHIJKLMN"[k] + 3] = h; });
Object.entries(T5).forEach(([r, v]) => v.forEach((x, k) => { if (x !== "") T6cells["ABCDEFGHIJK"[k] + r] = String(x); }));
const CLS = "EFGHIJK".split(""), ROWS = [4, 5, 6, 7, 8, 11, 12, 13, 14, 15, 16, 19, 20, 21, 22, 23], TOT = [9, 17, 24, 25];
const F6 = {};
CLS.concat("L").forEach((c) => { F6[c + 9] = `=SUM(${c}4:${c}8)`; F6[c + 17] = `=SUM(${c}11:${c}16)`; F6[c + 24] = `=SUM(${c}19:${c}23)`; F6[c + 25] = `=${c}9+${c}17+${c}24`; });
ROWS.forEach((r) => { F6["L" + r] = `=SUM(E${r}:K${r})`; F6["M" + r] = `=AVERAGE(E${r}:K${r})`; F6["N" + r] = `=D${r}*L${r}`; });
TOT.forEach((r) => { F6["M" + r] = `=AVERAGE(E${r}:K${r})`; });
F6.N9 = "=SUM(N4:N8)"; F6.N17 = "=SUM(N11:N16)"; F6.N24 = "=SUM(N19:N23)"; F6.N25 = "=N9+N17+N24";
const T6spec = (more) => Object.assign({ title: "THXanh.xlsx — 6. Hoàn thiện", sheets: ["4. Dự kiến kết quả", "5. Tổng kết", "6. Hoàn thiện"], activeSheet: 2,
  cols: 14, rows: 25, widths: { A: 0.5, B: 1.35, C: 1.55, D: 1, L: 1.25, M: 1.25, N: 1.55 }, cells: Object.assign({}, T6cells, F6),
  bold: ["A1:A2", "A3:N3", "E9:N9", "E17:N17", "E24:N25", "L4:L25", "B25"], color: { A1: "#15803d" } }, more || {});
const T6_BASE = T6spec();   // vừa sao chép sang, chưa định dạng
const GRP = { "B4:C8": "#2e8b47", "B11:C16": "#f28a2e", "B19:C23": "#62ad4f" };
const T6_FULL = T6spec({ dec: { "M4:M25": 2 }, comma: ["N4:N25"], fill: Object.assign({ "A3:N3": "#fde047" }, GRP),
  color: { A1: "#15803d", "B4:C23": "#ffffff" }, center: ["A3:N3", "A4:B23", "E4:K25"] });

// Hình 10.6 vẽ bằng HTML (gộp ô, tô nền, kẻ viền + khung)
const num = (v) => (v === "" || v == null ? null : +v);
const VAL = {};
ROWS.forEach((r) => { const xs = T5[r].slice(4).map(num).filter((x) => x != null); VAL[r] = { cls: T5[r].slice(4), L: xs.reduce((a, b) => a + b, 0), cnt: xs.length }; VAL[r].M = VAL[r].L / VAL[r].cnt; VAL[r].N = T5[r][3] * VAL[r].L; });
const grpSum = (rs) => { const cls = CLS.map((_, k) => rs.reduce((a, r) => a + (num(T5[r][4 + k]) || 0), 0)); const L = cls.reduce((a, b) => a + b, 0); return { cls, L, M: L / 7, N: rs.reduce((a, r) => a + VAL[r].N, 0) }; };
const G = { 9: grpSum([4, 5, 6, 7, 8]), 17: grpSum([11, 12, 13, 14, 15, 16]), 24: grpSum([19, 20, 21, 22, 23]) };
G[25] = { cls: CLS.map((_, k) => G[9].cls[k] + G[17].cls[k] + G[24].cls[k]), L: G[9].L + G[17].L + G[24].L, N: G[9].N + G[17].N + G[24].N }; G[25].M = G[25].L / 7;
const f2 = (x) => x.toFixed(2), fm = (x) => Math.round(x).toLocaleString("en-US");
const H106 = (() => {
  const b = "border:1px solid #111;padding:2px 7px;white-space:nowrap;";
  const td = (v, s) => `<td style="${b}${s || ""}">${v == null ? "" : v}</td>`;
  const grpCell = { 4: ["Cây hoa", 5, "#2e8b47"], 11: ["Cây ăn quả", 6, "#f28a2e"], 19: ["Cây bóng mát", 5, "#62ad4f"] };
  const bgOf = (r) => (r <= 8 ? "#2e8b47" : r <= 16 ? "#f28a2e" : "#62ad4f");
  let h = `<div style="overflow-x:auto"><table style="border-collapse:collapse;font-family:Calibri,'Segoe UI',Arial,sans-serif;font-size:.9rem;background:#fff;margin:0 auto;border:2.5px solid #111">`;
  h += `<tr><td colspan="14" style="padding:3px 7px;font-weight:800;color:#15803d;font-size:1.05rem;border:none;background:#fff">DỰ ÁN TRƯỜNG HỌC XANH</td></tr>`;
  h += `<tr><td colspan="14" style="padding:3px 7px;font-weight:700;border:none;border-bottom:1px solid #111">Bảng 6. Dự kiến phân bổ và chi phí dự án Trường học xanh</td></tr>`;
  h += `<tr>${HEAD.map((x) => td(x, "background:#fde047;font-weight:700;text-align:center")).join("")}</tr>`;
  for (let r = 4; r <= 25; r++) {
    h += "<tr>";
    if (VAL[r]) {
      const row = T5[r];
      h += td(row[0], "text-align:center");
      if (grpCell[r]) h += `<td rowspan="${grpCell[r][1]}" style="${b}background:${grpCell[r][2]};color:#fff;font-weight:700;text-align:center;vertical-align:middle">${grpCell[r][0]}</td>`;
      h += td(row[2], `background:${bgOf(r)};color:#fff`) + td(row[3], "text-align:right");
      h += VAL[r].cls.map((x) => td(x, "text-align:center")).join("") + td(VAL[r].L, "text-align:right;font-weight:700") + td(f2(VAL[r].M), "text-align:right") + td(fm(VAL[r].N), "text-align:right");
    } else if (G[r]) {
      h += td("") + (r === 25 ? `<td colspan="3" style="${b}font-weight:700">Tổng số cây tính theo lớp:</td>` : td("") + td("") + td(""));
      h += G[r].cls.map((x) => td(x, "text-align:center;font-weight:700")).join("") + td(G[r].L, "text-align:right;font-weight:700") + td(f2(G[r].M), "text-align:right;font-weight:700") + td(fm(G[r].N), "text-align:right;font-weight:700");
    } else h += Array.from({ length: 14 }, () => td("&nbsp;")).join("");
    h += "</tr>";
  }
  return h + "</table></div>";
})();

// ---- Vận dụng: trang tính Điểm thi khảo sát (theo hình mẫu trong giáo án) ----
const DKS_ROWS = [["1", "Nguyễn Tùng Lâm", 7, 8, 9], ["2", "Phạm Thu Trang", 8, 8, 8], ["3", "Trần Quỳnh Mai", 8, 7, 8], ["4", "Lê Thanh Tùng", 7, 8, 7], ["5", "Trịnh Tuấn Minh", 7, 7, 7]];
const DKScells = { A1: "ĐIỂM THI KHẢO SÁT", A2: "STT", B2: "Họ và tên", C2: "Toán", D2: "Ngữ văn", E2: "Tiếng Anh", F2: "Điểm trung bình" };
DKS_ROWS.forEach((r, i) => r.forEach((v, k) => { DKScells["ABCDE"[k] + (i + 3)] = String(v); }));
const DKS = { title: "Diem_KS.xlsx — Điểm thi khảo sát", sheets: ["Điểm thi khảo sát"], cols: 7, rows: 8, widths: { A: 0.6, B: 2, C: 0.9, D: 1.05, E: 1.1, F: 1.7, G: 0.6 },
  cells: DKScells, bold: ["A1", "A2:F2"], fill: { "A2:F2": "#fde047" }, center: ["A2:F2", "A3:A7"], dec: { "F3:F7": 2 } };

const LESSON = {
  meta: {
    subject: "Tin học", grade: "7", book: "Kết nối tri thức với cuộc sống",
    title: "Bài 10: Hoàn thiện bảng tính", unit: "Chủ đề 4 — Ứng dụng tin học",
    pages: "51–54", durationMinutes: 90,
  },
  objectives: {
    knowledge: [
      "Thực hiện được các thao tác hoàn thiện bảng tính: định dạng dữ liệu, căn lề, điều chỉnh độ rộng cột, chiều cao hàng, kẻ đường viền và khung dữ liệu.",
      "Thực hiện được các thao tác với trang tính: tạo mới, chèn, sao chép, đổi tên, di chuyển và xoá trang tính.",
      "Thực hiện được lệnh in dữ liệu trong bảng tính và biết lựa chọn vùng dữ liệu cần in.",
      "Vận dụng được bảng tính điện tử để giải quyết một số công việc đơn giản trong học tập và thực tiễn.",
    ],
    competencies: [
      "Tự chủ, tự học; giao tiếp và hợp tác (cặp đôi, nhóm 4–6 HS); giải quyết vấn đề và sáng tạo.",
      "Năng lực số 3.1.TC1a: hoàn thiện bảng tính (định dạng, căn lề, kẻ viền, kích thước cột/hàng, trang tính); chọn vùng in, thiết lập thông số in.",
      "Năng lực số 3.2.TC1a: nhận biết lỗi trình bày (thiếu đường viền, cột hẹp, căn lề chưa hợp lí…) và chỉnh sửa; kiểm tra bảng trước khi in.",
      "Năng lực số 5.3.TC1a: vận dụng bảng tính giải quyết tình huống thực tế (thống kê, báo cáo, bảng điểm).",
      "Năng lực AI 7.C4.1: phân tích vấn đề đạo đức từ dữ liệu huấn luyện AI; kiểm chứng, không phụ thuộc hoàn toàn vào gợi ý của AI.",
    ],
    qualities: ["Chăm chỉ, trung thực, trách nhiệm, nhân ái khi thực hành nhóm."],
  },
  coreKnowledge: [
    "Đường lưới trên màn hình mặc định KHÔNG được in ra giấy → trước khi in cần kẻ đường viền ô và khung bao quanh vùng dữ liệu.",
    "Thao tác với trang tính: ⊕ tạo mới · chuột phải → Delete (xoá) · chuột phải → Insert/Worksheet → OK (chèn trước) · nháy đúp tên → nhập → Enter (đổi tên) · kéo thả tên (đổi thứ tự) · chuột phải → Move or Copy… → chọn vị trí → Create a copy → OK (sao chép).",
    "Kẻ viền: chọn vùng → Format Cells → trang Border → chọn kiểu, màu đường kẻ → None (không kẻ) / Outline (khung ngoài) / Inside (đường viền ô) → OK.",
    "In: B1 đánh dấu vùng muốn in → B2 File/Print, nhập thông số (số bản, máy in, vùng in, trang, hướng giấy, khổ giấy) → B3 nháy nút Print.",
    "Bảng tính có 3 lựa chọn in: vùng đang chọn, trang tính hiện thời, toàn bộ bảng tính.",
  ],
  keywords: ["Border (Outline / Inside)", "Move or Copy", "File/Print", "Print Selection", "Trang tính"],
  settings: { basePoints: 100, useTimer: false, defaultTime: 60, sound: true, streakEnabled: true },

  activities: [
    /* =========================== TIẾT 1 =========================== */
    /* ===================== HĐ1: KHỞI ĐỘNG (5 phút) ===================== */
    {
      id: "khoi-dong", name: "Khởi động — Sắp trình bày trước lớp rồi! 🎤", type: "scenario",
      goal: "Nhận biết nhu cầu hoàn thiện bảng tính trước khi trình bày, in ấn.",
      time: 300,
      task: "Nhóm 4–6 bạn thảo luận 3 phút, ghi lên giấy A4 (hoặc gửi trên máy): “Em hãy nêu những công việc cần làm để hoàn thiện bảng dữ liệu của dự án Trường học xanh?”",
      sgkImage: "assets/sgk/sgk-trang51.jpg",
      content: {
        situation: "Công việc thu thập dữ liệu, tính toán dữ liệu cho dự án Trường học xanh đã hoàn thành. Việc tiếp theo là trình bày, hoàn thiện bảng tính để có thể trình bày trước lớp.",
        question: "Em hãy nêu những công việc cần làm để hoàn thiện bảng dữ liệu của dự án Trường học xanh?",
        hints: [
          "Các số trong cột Trung bình, Chi phí đã dễ đọc chưa?",
          "Khi in bảng ra giấy, các đường kẻ ô có hiện ra không?",
        ],
        modelAnswer: "Những công việc cần làm để hoàn thiện bảng dữ liệu của dự án Trường học xanh là: định dạng dữ liệu và trình bày trang tính, kẻ đường viền, kẻ khung.",
      },
      questions: [
        { question: "Việc nào cần làm để hoàn thiện bảng dữ liệu dự án trước khi trình bày, in ấn? (Chọn tất cả đáp án đúng)", type: "multiple-select",
          options: ["Sửa lại số cây của các lớp cho tròn, đẹp", "Định dạng dữ liệu và trình bày trang tính", "Kẻ đường viền ô, kẻ khung cho vùng dữ liệu", "Xoá trang tính 5. Tổng kết cho gọn tệp"],
          answer: [1, 2], explanation: "Hoàn thiện bảng tính = định dạng dữ liệu, trình bày trang tính, kẻ đường viền, kẻ khung. Không sửa số liệu (sai dữ liệu dự án) và không xoá trang tính đang dùng.",
          level: "nhan-biet", activity: "khoi-dong" },
      ],
    },

    /* ===================== HĐ2.1.1: VÌ SAO IN RA KHÔNG CÓ ĐƯỜNG KẺ? (10 phút) ===================== */
    {
      id: "duong-ke", name: "Tại sao in ra giấy lại không thấy các đường kẻ? 🖨️", type: "knowledge",
      goal: "Giải thích vì sao bản in không có đường kẻ; biết cần kẻ đường viền ô, khung trước khi in.",
      time: 600,
      task: "Hoạt động 1 (SGK tr.51) — cặp đôi 5 phút: tạo Bảng 2 trên Excel, in ra giấy (hoặc xem trước khi in bằng File/Print), so sánh với màn hình và trả lời 2 câu hỏi.",
      sgkImage: "assets/sgk/hinh-10-1.jpg",
      html: B2_COMPARE,
      sheet: B2S,
      content: {
        heading: "🖨️ Tại sao khi in dữ liệu ra giấy lại không nhìn thấy các đường kẻ?",
        prompt: "Bạn An in dữ liệu trong Bảng 2 ra giấy nhưng kết quả nhận được là bảng dữ liệu không có các đường kẻ giống như bạn nhìn thấy trên màn hình máy tính. Em có biết lí do tại sao không?",
        revealLabel: "💡 Lí do & cách khắc phục (SGK tr.52)",
        blocks: [
          { kind: "text", value: "Trên màn hình máy tính em nhìn thấy mỗi trang tính là một lưới các ô, nhưng mặc định khi in dữ liệu thì các đường lưới không được in ra. Vì vậy, trước khi in dữ liệu của bảng tính em cần kẻ đường viền ô và khung bao quanh vùng dữ liệu nếu cần." },
          { kind: "html", value: B2_FIXED },
          { kind: "ext", value: "Excel còn có tuỳ chọn in cả đường lưới: Page Layout → nhóm Sheet Options → Gridlines → đánh dấu Print. Tuy vậy, kẻ đường viền ô và khung giúp em chủ động chọn vùng, kiểu và màu đường kẻ." },
        ],
      },
      questions: [
        { question: "Câu 1: Khi in Bảng 2 ra giấy, kết quả nhận được có giống như trên màn hình máy tính không?", type: "multiple-choice",
          options: ["Giống hệt, có đủ các đường kẻ ô", "Bị mất dữ liệu ở cột Số lượng", "Không giống: bảng in ra không có các đường kẻ", "Bị mất dòng tiêu đề Bảng 2"],
          answer: 2, explanation: "Bảng in ra vẫn đủ dữ liệu nhưng không có các đường kẻ như nhìn thấy trên màn hình (Hình 10.1b).", level: "nhan-biet", activity: "duong-ke" },
        { question: "Câu 2: Vì sao in Bảng 2 ra giấy lại không giống như trên màn hình máy tính?", type: "multiple-choice",
          options: ["Vì máy in hết mực", "Vì chưa lưu tệp trước khi in", "Vì bảng có quá ít dữ liệu", "Vì các đường lưới trên màn hình chỉ để hiển thị, mặc định không được in ra"],
          answer: 3, explanation: "Mặc định trên màn hình các ô đều có đường lưới, nhưng sẽ không có khi in ra giấy.", level: "thong-hieu", activity: "duong-ke" },
        { question: "Muốn bảng in ra có đường kẻ rõ ràng, trước khi in em cần kẻ đường viền ô và khung bao quanh vùng dữ liệu.", type: "true-false", answer: true,
          explanation: "Đúng. Đường viền ô và khung do em kẻ sẽ được in ra giấy.", level: "thong-hieu", activity: "duong-ke" },
        { type: "sheet", question: "Kéo chọn vùng dữ liệu cần kẻ đường viền ô và khung của Bảng 2: từ hàng tiêu đề cột (STT, Loại cây…) đến hết dữ liệu.", answer: "A2:D5",
          explanation: "Vùng A2:D5 gồm hàng tiêu đề cột và 3 hàng dữ liệu. Phải chọn vùng trước rồi mới kẻ viền.", level: "van-dung", activity: "duong-ke" },
      ],
      remember: ["Mặc định các đường lưới trên màn hình không được in ra giấy. Trước khi in cần kẻ đường viền ô và khung bao quanh vùng dữ liệu."],
    },

    /* ===================== HĐ2.1.2: CÁC THAO TÁC VỚI TRANG TÍNH (10 phút) ===================== */
    {
      id: "trang-tinh", name: "Các thao tác với trang tính 📑", type: "knowledge",
      goal: "Biết tạo mới, xoá, chèn, đổi tên, đổi thứ tự, sao chép trang tính.",
      time: 420,
      task: "Cặp đôi 5 phút: đọc SGK tr.51–52, nêu và thực hiện trên Excel 5 thao tác — tạo trang tính mới, chèn trang tính mới trước trang tính A, đổi tên, thay đổi thứ tự, sao chép một trang tính sang vị trí mới.",
      sgkImage: "assets/sgk/sgk-trang51.jpg",
      html: `<div style="text-align:center">${TABS(["Dữ liệu 1", "Sheet2"], 0)}<div style="margin-top:6px;color:#4a5f66">Danh sách các trang tính ở phía dưới bảng tính — nút ⊕ để tạo trang tính mới (Hình 10.2)</div></div>`,
      content: {
        heading: "📑 Các thao tác với trang tính",
        prompt: "Mỗi bảng tính bao gồm nhiều trang tính. Vị trí phía dưới của bảng tính là nơi hiện danh sách các trang tính.",
        revealLabel: "🔍 Cách làm (SGK tr.51–52)",
        blocks: [
          { kind: "list", value: [
            "Tạo trang tính mới: nháy chuột vào nút ⊕ ở cuối danh sách trang tính (Hình 10.2).",
            "Xoá một trang tính: nháy nút phải chuột vào tên trang tính rồi chọn Delete.",
            "Chèn trang tính mới trước trang tính A: nháy nút phải chuột vào tên trang tính A, chọn Insert/Worksheet rồi chọn OK.",
            "Đổi tên trang tính: nháy đúp chuột vào tên trang tính, nhập tên mới, nhấn phím Enter.",
            "Thay đổi thứ tự các trang tính: nháy chuột vào tên trang tính, kéo thả chuột sang trái, phải để di chuyển trang tính đến vị trí mong muốn.",
            "Sao chép một trang tính sang vị trí mới: nháy nút phải chuột vào tên trang tính, chọn lệnh Move or Copy… → 1. chọn vị trí muốn sao chép đến → 2. nháy chuột vào ô Create a copy → 3. chọn OK (Hình 10.3).",
          ] },
          { kind: "image", value: "assets/sgk/hinh-10-2.jpg", caption: "Hình 10.2. Tạo trang tính mới" },
          { kind: "image", value: "assets/sgk/hinh-10-3.jpg", caption: "Hình 10.3. Cửa sổ Move or Copy" },
        ],
      },
      questions: [
        { question: "Câu 1: Để tạo trang tính mới, em nháy chuột vào đâu?", type: "multiple-choice", sgkImage: "assets/sgk/hinh-10-2.jpg",
          options: ["Nút ⊕ ở cuối danh sách trang tính", "Ô A1 của trang tính", "Nút Print", "Tên trang tính rồi nhấn phím Delete"],
          answer: 0, explanation: "Nháy chuột vào nút ⊕ ở cuối danh sách trang tính để tạo trang tính mới (Hình 10.2).", level: "nhan-biet", activity: "trang-tinh" },
        { question: "Câu 2: Muốn chèn một trang tính mới vào trước trang tính “Dữ liệu 1”, em làm thế nào?", type: "multiple-choice",
          options: ["Nháy đúp chuột vào tên trang tính “Dữ liệu 1”", "Nháy nút phải chuột vào tên “Dữ liệu 1”, chọn Delete", "Kéo thả trang tính “Dữ liệu 1” sang phải", "Nháy nút phải chuột vào tên “Dữ liệu 1”, chọn Insert/Worksheet rồi chọn OK"],
          answer: 3, explanation: "Chèn trang tính mới trước trang tính A: nháy nút phải chuột vào tên trang tính A, chọn Insert/Worksheet rồi chọn OK.", level: "thong-hieu", activity: "trang-tinh" },
        { question: "Câu 3: Thao tác đổi tên trang tính là:", type: "multiple-choice",
          options: ["Nháy nút phải chuột vào tên trang tính, chọn Delete", "Nháy đúp chuột vào tên trang tính, nhập tên mới, nhấn phím Enter", "Nháy chuột vào nút ⊕", "Kéo thả tên trang tính sang trái"],
          answer: 1, explanation: "Nháy đúp chuột vào tên trang tính, nhập tên mới, nhấn phím Enter.", level: "nhan-biet", activity: "trang-tinh" },
        { question: "Câu 4: Muốn đưa trang tính “6. Hoàn thiện” lên đứng đầu danh sách, cách nhanh nhất là:", type: "multiple-choice",
          options: ["Nháy chuột vào tên trang tính, kéo thả sang trái đến vị trí đầu tiên", "Xoá hết các trang tính khác", "Đổi tên thành “1. Hoàn thiện”", "Tạo trang tính mới rồi gõ lại dữ liệu"],
          answer: 0, explanation: "Thay đổi thứ tự: nháy chuột vào tên trang tính, kéo thả sang trái, phải đến vị trí mong muốn.", level: "van-dung", activity: "trang-tinh" },
        { question: "Câu 5: Trong cửa sổ Move or Copy, em chọn vị trí rồi nhấn OK nhưng QUÊN nháy vào ô Create a copy. Kết quả là:", type: "multiple-choice", sgkImage: "assets/sgk/hinh-10-3.jpg",
          options: ["Trang tính được sao chép sang vị trí mới", "Trang tính bị xoá", "Trang tính chỉ được di chuyển đến vị trí mới, không có bản sao", "Không có gì thay đổi"],
          answer: 2, explanation: "Muốn sao chép phải nháy chuột vào ô Create a copy (bước 2, Hình 10.3). Không đánh dấu ô này thì lệnh Move or Copy chỉ di chuyển trang tính.", level: "van-dung-cao", activity: "trang-tinh" },
        { question: "Trong cửa sổ Move or Copy, chọn (move to end) nghĩa là sao chép trang tính đến:", type: "multiple-choice",
          options: ["Vị trí đầu tiên", "Vị trí trang tính cuối cùng", "Một tệp bảng tính khác", "Trước trang tính đang chọn"],
          answer: 1, explanation: "Nếu chọn move to end thì sao chép đến trang tính cuối cùng (Hình 10.3).", level: "thong-hieu", activity: "trang-tinh" },
      ],
      remember: ["⊕: tạo mới · Chuột phải → Delete: xoá · Chuột phải → Insert/Worksheet → OK: chèn trước · Nháy đúp tên: đổi tên · Kéo thả tên: đổi thứ tự · Chuột phải → Move or Copy… + Create a copy: sao chép."],
    },
    {
      id: "ghep-trang-tinh", name: "Trò chơi: Ghép thao tác với trang tính 🧩", type: "matching",
      goal: "Ghi nhớ cách thực hiện từng thao tác với trang tính.",
      time: 150,
      task: "Ghép mỗi thao tác với cách thực hiện đúng. Làm hết rồi bấm Nộp bài.",
      pairs: [
        { left: "Tạo trang tính mới", right: "Nháy chuột vào nút ⊕" },
        { left: "Xoá một trang tính", right: "Chuột phải vào tên trang tính → Delete" },
        { left: "Chèn trang tính mới trước trang tính A", right: "Chuột phải vào tên trang tính A → Insert/Worksheet → OK" },
        { left: "Đổi tên trang tính", right: "Nháy đúp vào tên, nhập tên mới, nhấn Enter" },
        { left: "Thay đổi thứ tự các trang tính", right: "Kéo thả tên trang tính sang trái, phải" },
        { left: "Sao chép trang tính sang vị trí mới", right: "Chuột phải → Move or Copy… → Create a copy → OK" },
      ],
      explanation: "Nhớ: nút ⊕ · Delete · Insert/Worksheet · nháy đúp · kéo thả · Move or Copy + Create a copy.",
    },
    {
      id: "sao-chep-trang", name: "Sắp xếp các bước sao chép trang tính 🔢", type: "ordering",
      goal: "Nắm đúng trình tự sao chép một trang tính sang vị trí mới.",
      time: 120,
      task: "Sắp xếp các bước sao chép trang tính “5. Tổng kết” thành một trang mới ở cuối danh sách rồi bấm Nộp bài.",
      sgkImage: "assets/sgk/hinh-10-3.jpg",
      steps: [
        "Nháy nút phải chuột vào tên trang tính 5. Tổng kết",
        "Chọn lệnh Move or Copy…",
        "Trong Before sheet, chọn (move to end)",
        "Nháy chuột vào ô Create a copy",
        "Chọn OK",
      ],
      explanation: "Chuột phải vào tên trang tính → Move or Copy… → 1. chọn vị trí → 2. Create a copy → 3. OK.",
    },

    /* ===================== HĐ2.1.3: KẺ ĐƯỜNG VIỀN Ô VÀ KHUNG (10 phút) ===================== */
    {
      id: "vien-khung", name: "Kẻ đường viền ô và khung bao quanh vùng dữ liệu 🖍️", type: "knowledge",
      goal: "Biết các bước kẻ đường viền ô, kẻ khung; phân biệt None, Outline, Inside.",
      time: 420,
      task: "Cá nhân: đọc SGK tr.52, quan sát Hình 10.4; kẻ đường viền ô và khung cho Bảng 2 trên Excel; quan sát 4 bảng ①②③④ và trả lời câu hỏi.",
      sgkImage: "assets/sgk/hinh-10-4.jpg",
      html: PRESETS(false),
      content: {
        heading: "🖍️ Kẻ đường viền ô và khung bao quanh vùng dữ liệu",
        revealLabel: "🔍 Các bước kẻ viền (SGK tr.52)",
        blocks: [
          { kind: "list", value: [
            "B1. Chọn vùng dữ liệu muốn kẻ đường viền ô, kẻ khung.",
            "B2. Mở cửa sổ Format Cells.",
            "B3. Trong cửa sổ Format Cells chọn trang Border.",
            "B4. Thiết lập: chọn kiểu đường kẻ (Style), chọn màu (Color); chọn None: không kẻ khung · Outline: kẻ khung bên ngoài · Inside: kẻ đường viền ô. Có thể nháy chuột vào từng đường viền ô và khung để kẻ.",
            "B5. Chọn OK để thực hiện lệnh.",
          ] },
          { kind: "image", value: "assets/sgk/hinh-10-4.jpg", caption: "Hình 10.4. Cửa sổ Format Cells" },
          { kind: "html", value: PRESETS(true) },
        ],
      },
      questions: [
        { question: "Trong cửa sổ Format Cells, trang (thẻ) nào dùng để kẻ đường viền ô và khung?", type: "multiple-choice", sgkImage: "assets/sgk/hinh-10-4.jpg",
          options: ["Number", "Border", "Alignment", "Fill"],
          answer: 1, explanation: "Trang Border dùng để thiết lập các thông số kẻ đường viền, kẻ khung.", level: "nhan-biet", activity: "vien-khung" },
        { question: "Nút Outline trong mục Presets dùng để:", type: "multiple-choice",
          options: ["Không kẻ khung", "Kẻ đường viền các ô bên trong", "Chọn màu đường kẻ", "Kẻ khung bên ngoài vùng dữ liệu"],
          answer: 3, explanation: "None: không kẻ khung · Outline: kẻ khung bên ngoài · Inside: kẻ đường viền ô.", level: "nhan-biet", activity: "vien-khung" },
        { question: "Bảng ③ (chỉ có các đường kẻ giữa các ô, không có khung ngoài) được kẻ bằng nút nào?", type: "multiple-choice",
          options: ["None", "Outline", "Inside", "Automatic"],
          answer: 2, explanation: "Inside kẻ các đường viền ô bên trong vùng dữ liệu, không kẻ khung bên ngoài.", level: "thong-hieu", activity: "vien-khung" },
        { question: "Muốn bảng in ra có cả đường viền ô lẫn khung bao ngoài như bảng ④, em chọn:", type: "multiple-choice",
          options: ["Cả Outline và Inside", "Chỉ Outline", "Chỉ None", "Chỉ Inside"],
          answer: 0, explanation: "Outline kẻ khung bên ngoài, Inside kẻ đường viền ô — chọn cả hai để có bảng ④.", level: "van-dung", activity: "vien-khung" },
        { question: "Mục Color trong trang Border dùng để chọn màu sắc cho đường kẻ.", type: "true-false", answer: true,
          explanation: "Đúng. Style: chọn kiểu đường kẻ · Color: chọn màu sắc cho đường kẻ (Hình 10.4).", level: "nhan-biet", activity: "vien-khung" },
      ],
      remember: ["Người sử dụng có thể thực hiện các thao tác đa dạng trên trang tính của bảng tính: đổi tên, tạo mới, chèn, sao chép, di chuyển hoặc xoá một trang tính. Nên kẻ khung các vùng dữ liệu trước khi tiến hành in hoặc trình bày dữ liệu."],
    },
    {
      id: "cac-buoc-vien", name: "Sắp xếp các bước kẻ đường viền, kẻ khung 🔢", type: "ordering",
      goal: "Nắm trình tự 5 bước kẻ đường viền ô và khung.",
      time: 120,
      task: "Sắp xếp các bước kẻ đường viền ô và khung cho Bảng 2 theo đúng thứ tự rồi bấm Nộp bài.",
      sgkImage: "assets/sgk/hinh-10-4.jpg",
      steps: [
        "Chọn vùng dữ liệu A2:D5 muốn kẻ đường viền",
        "Mở cửa sổ Format Cells",
        "Chọn trang Border",
        "Chọn kiểu đường kẻ, màu đường kẻ, rồi chọn Outline và Inside",
        "Chọn OK",
      ],
      explanation: "Chọn vùng → Format Cells → Border → kiểu, màu, Outline/Inside → OK.",
    },

    /* =========================== TIẾT 2 =========================== */
    /* ===================== HĐ2.2: IN DỮ LIỆU (10 phút) ===================== */
    {
      id: "in-du-lieu", name: "In dữ liệu trong bảng tính 🖨️", type: "knowledge",
      goal: "Biết các bước in một trang tính và lựa chọn vùng dữ liệu cần in.",
      time: 420,
      task: "Hoạt động 2 (SGK tr.53): quan sát Hình 10.5, nêu và thực hiện các bước in một trang tính.",
      sgkImage: "assets/sgk/hinh-10-5.jpg",
      content: {
        heading: "🖨️ In dữ liệu trong bảng tính",
        prompt: "Có thể in trang tính hiện thời, hoặc toàn bộ bảng tính, hoặc có thể chỉ in vùng dữ liệu đang chọn, phần mềm sẽ tự động tính toán để in.",
        revealLabel: "🔍 Các bước in (SGK tr.53)",
        blocks: [
          { kind: "list", value: [
            "Bước 1. Đánh dấu vùng dữ liệu muốn in.",
            "Bước 2. Thực hiện lệnh File/Print. Xuất hiện hộp thoại Print — nhập các thông số in: số bản in, máy in, vùng in, số trang, hướng giấy, kích thước giấy…",
            "Bước 3. Sau khi nhập các thông số in, nháy chuột lên nút lệnh Print để tiến hành in.",
          ] },
          { kind: "image", value: "assets/sgk/hinh-10-5.jpg", caption: "Hình 10.5. Nhập các thông số để in và xem kết quả trước khi in" },
          { kind: "text", value: "Lưu ý: trước khi in cần xác định rõ cần in gì. Chỉ in một vùng dữ liệu thì phải đánh dấu vùng đó trước khi in; nếu không đánh dấu vùng nào thì in trang tính hiện thời hoặc cả bảng tính (toàn bộ tệp dữ liệu)." },
        ],
      },
      questions: [
        { question: "Em chỉ muốn in bảng điểm ở vùng A1:F7 của trang tính. Việc đầu tiên em cần làm là:", type: "multiple-choice",
          options: ["Nháy ngay nút Print", "Đánh dấu vùng A1:F7", "Đổi tên trang tính", "Xoá các trang tính khác"],
          answer: 1, explanation: "Bước 1: đánh dấu vùng dữ liệu muốn in, rồi mới File/Print.", level: "thong-hieu", activity: "in-du-lieu" },
        { question: "Lệnh để mở hộp thoại in là:", type: "multiple-choice",
          options: ["Home/Print", "Insert/Print", "File/Print", "View/Print"],
          answer: 2, explanation: "Bước 2: thực hiện lệnh File/Print để mở hộp thoại Print.", level: "nhan-biet", activity: "in-du-lieu" },
        { question: "Ô Copies trong hộp thoại Print đang là 2. Điều đó có nghĩa là:", type: "multiple-choice", sgkImage: "assets/sgk/hinh-10-5.jpg",
          options: ["In 2 bản", "In trang số 2", "In 2 trang tính", "In trên 2 mặt giấy"],
          answer: 0, explanation: "Copies: chọn số bản in.", level: "nhan-biet", activity: "in-du-lieu" },
        { question: "Bảng dự án Trường học xanh có 14 cột, in thẳng đứng bị tràn sang trang khác. Em nên đổi hướng giấy sang:", type: "multiple-choice",
          options: ["Nằm ngang (Landscape)", "Thẳng đứng (Portrait)", "Khổ giấy nhỏ hơn", "In 2 bản"],
          answer: 0, explanation: "Bảng nhiều cột nên chọn hướng giấy nằm ngang (Landscape) để vừa một trang.", level: "van-dung", activity: "in-du-lieu" },
        { question: "Không đánh dấu vùng nào, muốn in tất cả các trang tính trong tệp, ở mục chọn vùng in em chọn:", type: "multiple-choice", sgkImage: "assets/sgk/hinh-10-5.jpg",
          options: ["Print Selection (vùng được chọn)", "Print Active Sheets (trang tính hiện thời)", "Print One Sided", "Print Entire Workbook (toàn bộ bảng tính)"],
          answer: 3, explanation: "Chọn vùng in: vùng được chọn (Print Selection), trang tính hiện thời (Print Active Sheets) hay toàn bộ bảng tính (Print Entire Workbook).", level: "van-dung", activity: "in-du-lieu" },
      ],
      remember: ["Các bước in: B1. Đánh dấu vùng dữ liệu muốn in → B2. File/Print, nhập các thông số in → B3. Nháy nút Print."],
    },
    {
      id: "hop-thoai-in", name: "Trò chơi: Giải mã hộp thoại Print 🔎", type: "matching",
      goal: "Nhận biết các thông số trong hộp thoại Print.",
      time: 180,
      task: "Quan sát Hình 10.5, ghép mỗi việc cần làm với mục tương ứng trong hộp thoại Print. Làm hết rồi bấm Nộp bài.",
      sgkImage: "assets/sgk/hinh-10-5.jpg",
      pairs: [
        { left: "Chọn số bản in", right: "Copies" },
        { left: "Chọn máy in kết nối với máy tính", right: "Printer (tên máy in … Ready)" },
        { left: "Chọn vùng in", right: "Print Selection / Active Sheets / Entire Workbook" },
        { left: "Chọn số lượng trang in, từ trang … đến trang …", right: "Pages … to …" },
        { left: "Chọn hướng giấy: nằm ngang hay thẳng đứng", right: "Portrait / Landscape Orientation" },
        { left: "Chọn kích thước giấy in", right: "A4 — 21 cm x 29.7 cm" },
      ],
      explanation: "Copies: số bản · Printer: máy in · Settings: vùng in · Pages: trang · Orientation: hướng giấy · A4: kích thước giấy.",
    },

    /* ===================== HĐ2.3: THỰC HÀNH (30 phút) ===================== */
    {
      id: "thuc-hanh-buoc", name: "Thực hành — Sắp xếp các bước hoàn thiện dự án 🔢", type: "ordering",
      goal: "Nắm trình tự các bước thực hành trong SGK.",
      time: 150,
      task: "Sắp xếp các bước trình bày hoàn chỉnh dữ liệu dự án Trường học xanh theo đúng thứ tự SGK rồi bấm Nộp bài.",
      sgkImage: "assets/sgk/sgk-trang53.jpg",
      steps: [
        "Mở tệp bảng tính THXanh.xlsx",
        "Tạo trang tính mới có tên là 6. Hoàn thiện",
        "Sao chép nội dung trang tính 5. Tổng kết vào trang tính 6. Hoàn thiện, sửa tên các dòng đầu",
        "Định dạng cột Trung bình, Chi phí; gộp ô, căn giữa, tô màu nền theo từng loại cây",
        "Đánh dấu vùng A3:N25, kẻ đường viền ô và kẻ khung",
        "Căn chỉnh lại các cột, hàng rồi lưu tệp",
      ],
      explanation: "a) Tạo trang tính mới → b) Định dạng dữ liệu, trình bày → c) Kẻ đường viền, kẻ khung, căn chỉnh → lưu tệp.",
    },
    {
      id: "thuc-hanh", name: "Thực hành: Trình bày hoàn chỉnh dữ liệu dự án Trường học xanh 🌳", type: "knowledge",
      goal: "Tạo trang tính mới, định dạng, gộp ô, tô màu, kẻ viền và khung cho dữ liệu dự án.",
      time: 1500,
      task: "Cặp đôi 25 phút: làm trên Excel với tệp THXanh.xlsx theo hướng dẫn a), b), c) (SGK tr.53–54). Trên máy/điện thoại: làm các câu chọn vùng trên bảng tính mô phỏng trang 6. Hoàn thiện (vừa sao chép, chưa định dạng).",
      sgkImage: "assets/sgk/hinh-10-6.jpg",
      sheet: T6_BASE,
      content: {
        heading: "🌳 Trang tính 6. Hoàn thiện",
        revealLabel: "📖 Hướng dẫn trên Excel & sản phẩm mẫu (SGK tr.53–54)",
        blocks: [
          { kind: "list", value: [
            "a) Tạo trang tính mới: mở tệp THXanh.xlsx · tạo trang tính mới có tên 6. Hoàn thiện · chọn trang tính 5. Tổng kết và sao chép nội dung vào trang tính 6. Hoàn thiện · sửa tên các dòng đầu như Hình 10.6.",
            "b) Định dạng dữ liệu và trình bày: cột Trung bình — số có hai chữ số thập phân · cột Chi phí — số không có chữ số thập phân, phân tách hàng nghìn, hàng triệu · gộp các ô cùng nhóm ở cột Loại cây (cột B) · căn giữa ô đã gộp theo cả chiều dọc và chiều ngang · tô màu nền theo từng loại cây.",
            "c) Kẻ đường viền, kẻ khung: đánh dấu toàn bộ vùng dữ liệu chính A3:N25 · kẻ đường viền cho các ô và kẻ khung cho vùng dữ liệu · căn chỉnh một lần nữa các cột và hàng cho thích hợp · lưu tệp.",
          ] },
          { kind: "html", value: H106 },
          { kind: "image", value: "assets/sgk/hinh-10-6.jpg", caption: "Hình 10.6. Hoàn thiện dữ liệu dự án Trường học xanh" },
        ],
      },
      questions: [
        { type: "sheet", question: "Bước b): Kéo chọn các ô ở cột Loại cây cần gộp lại cho nhóm Cây ăn quả.", answer: "B11:B16",
          explanation: "Nhóm Cây ăn quả ở các hàng 11 đến 16 (Bưởi → Táo) → gộp vùng B11:B16 rồi căn giữa theo cả chiều dọc và chiều ngang.", level: "van-dung", activity: "thuc-hanh" },
        { type: "sheet", question: "Kéo chọn các ô ở cột Loại cây cần gộp lại cho nhóm Cây bóng mát.", answer: "B19:B23",
          explanation: "Nhóm Cây bóng mát ở các hàng 19 đến 23 (Bằng lăng → Muồng) → gộp vùng B19:B23.", level: "van-dung", activity: "thuc-hanh" },
        { question: "Ô M5 (Trung bình của Hoa Dạ yến thảo) đang là 11.66666667. Sau khi định dạng số có hai chữ số thập phân, ô hiển thị:", type: "multiple-choice",
          options: ["11.66", "11.7", "11.67", "12.00"],
          answer: 2, explanation: "Làm tròn đến 2 chữ số thập phân: 11.67 (Hình 10.6). Giá trị trong ô vẫn giữ nguyên.", level: "thong-hieu", activity: "thuc-hanh" },
        { question: "Ô N6 (Chi phí Hoa Dừa cạn) = 976500. Định dạng số không có chữ số thập phân, phân tách hàng nghìn, ô hiển thị:", type: "multiple-choice",
          options: ["976,500", "976500.00", "976.5", "976,500.00"],
          answer: 0, explanation: "0 chữ số thập phân + dấu “,” phân tách hàng nghìn → 976,500.", level: "thong-hieu", activity: "thuc-hanh" },
        { type: "sheet", question: "Bước c): Kéo chọn toàn bộ vùng dữ liệu chính của trang tính để kẻ đường viền và khung (từ hàng tiêu đề cột STT đến hàng Tổng số cây tính theo lớp).", answer: "A3:N25",
          explanation: "Vùng dữ liệu chính là A3:N25 (SGK tr.54). Chọn vùng xong → Format Cells → Border → Outline + Inside → OK.", level: "van-dung", activity: "thuc-hanh" },
        { question: "Tô màu nền cho các ô dữ liệu theo từng loại cây nhằm mục đích gì?", type: "multiple-choice",
          options: ["Để bảng in ra có đường kẻ", "Để tính tổng chi phí nhanh hơn", "Để thay đổi dữ liệu trong ô", "Để phân biệt các nhóm cây, bảng dễ quan sát hơn"],
          answer: 3, explanation: "Màu nền giúp phân biệt nhóm cây hoa, cây ăn quả, cây bóng mát — bảng rõ ràng, dễ quan sát. Màu nền không thay thế được đường viền khi in.", level: "thong-hieu", activity: "thuc-hanh" },
      ],
    },
    {
      id: "tu-kiem-tra", name: "Phiếu tự kiểm tra trang tính 6. Hoàn thiện 📋", type: "checklist",
      goal: "Tự đánh giá mức độ hoàn thành sản phẩm thực hành trên Excel.",
      time: 180,
      task: "Cặp đôi đối chiếu trang tính 6. Hoàn thiện trên Excel với Hình 10.6, tick từng việc vào cột Đã làm hoặc Chưa làm, ghi khó khăn (nếu có) rồi gửi cho thầy/cô.",
      sgkImage: "assets/sgk/hinh-10-6.jpg",
      columns: ["✅ Đã làm", "⏳ Chưa làm"],
      sections: [
        { title: "📑 TRANG TÍNH", items: [
          "Tạo trang tính mới tên 6. Hoàn thiện",
          "Sao chép nội dung trang tính 5. Tổng kết sang",
          "Sửa tên các dòng đầu như Hình 10.6",
        ] },
        { title: "🎨 ĐỊNH DẠNG VÀ TRÌNH BÀY", items: [
          "Cột Trung bình có hai chữ số thập phân",
          "Cột Chi phí không có chữ số thập phân, có dấu phân tách hàng nghìn",
          "Gộp ô cột Loại cây theo từng nhóm, căn giữa hai chiều",
          "Tô màu nền theo từng loại cây",
        ] },
        { title: "🖍️ ĐƯỜNG VIỀN VÀ KHUNG", items: [
          "Kẻ đường viền ô và khung cho vùng A3:N25",
          "Căn chỉnh độ rộng cột, chiều cao hàng cho thích hợp",
          "Lưu tệp THXanh.xlsx",
        ] },
      ],
      note: "Cặp em gặp khó khăn ở bước nào? Em đã khắc phục như thế nào?",
      modelAnswer: [
        "Kết quả đúng như Hình 10.6: M5 = 11.67 · N9 = 9,371,000 · N17 = 10,359,000 · N24 = 10,962,200 · N25 = 30,692,200.",
        "Khó khăn thường gặp: cột quá hẹp hiện ##### (kéo rộng cột), quên chọn vùng trước khi kẻ viền, chỉ chọn Outline nên thiếu đường viền ô bên trong.",
      ],
    },

    /* ===================== HĐ3: LUYỆN TẬP (5 phút) ===================== */
    {
      id: "luyen-tap", name: "Luyện tập 📝", type: "knowledge",
      goal: "So sánh lệnh in bảng tính với lệnh in văn bản; in bảng rút gọn bằng cách ẩn cột.",
      time: 300,
      task: "Luyện tập (SGK tr.54) trong 4 phút: trả lời câu 1; thực hiện câu 2 trên Excel và trên bảng tính mô phỏng.",
      sgkImage: "assets/sgk/sgk-trang54.jpg",
      sheet: T6_FULL,
      questions: [
        { question: "Luyện tập 1: Quan sát lệnh in một trang tính và so sánh với lệnh in văn bản đã học ở lớp 6. Điểm khác nhau giữa hai lệnh in này là gì?", type: "multiple-choice",
          options: ["Bảng tính không chọn được máy in", "Văn bản không chọn được số bản in", "Bảng tính: chọn 1 trong 3 — vùng đang đánh dấu, trang tính hiện thời hoặc toàn bộ bảng tính; văn bản: chọn các trang cần in", "Không có điểm nào khác nhau"],
          answer: 2, explanation: "Với phần mềm bảng tính người dùng cần chọn 1 trong 3 lựa chọn: in vùng đang được đánh dấu, in trang tính hiện thời, in toàn bộ bảng tính. Với phần mềm soạn thảo văn bản, vùng cần chọn in là các trang cần in.",
          level: "thong-hieu", activity: "luyen-tap" },
        { type: "sheet", question: "Luyện tập 2: Kéo chọn tất cả các cột ứng với các lớp từ 7A đến 7H (kéo trên tên cột) để ẩn đi.", answer: "E:K",
          explanation: "Các lớp 7A → 7H nằm ở cột E đến cột K. Chọn cột E:K → nháy nút phải chuột → Hide.", level: "van-dung", activity: "luyen-tap" },
        { question: "Sau khi ẩn các cột 7A → 7H, em đánh dấu bảng rút gọn rồi chọn File/Print. Để chỉ in vùng vừa chọn, ở mục chọn vùng in em chọn:", type: "multiple-choice",
          options: ["Print Entire Workbook", "Print Selection", "Print Active Sheets", "Portrait Orientation"],
          answer: 1, explanation: "Chọn vùng cần in → File → Print → chọn Print Selection để in vùng được chọn.", level: "van-dung", activity: "luyen-tap" },
        { question: "Các cột đã ẩn (Hide) sẽ không xuất hiện trên bản in.", type: "true-false", answer: true,
          explanation: "Đúng. Cột bị ẩn không được in ra, nhờ vậy em in được bảng rút gọn. Dữ liệu vẫn còn, chọn Unhide để hiện lại.", level: "thong-hieu", activity: "luyen-tap" },
      ],
    },
    {
      id: "tro-choi", name: "Trò chơi: Trồng hoa Trường học xanh 🌻", type: "penguin",
      pet: "🌻", homeIcon: "🏫", enemy: "🐌", saveWord: "bông hoa về vườn trường",
      winText: "Vườn trường rực rỡ sắc hoa — bảng tính của em đã sẵn sàng để in!",
      goal: "Củng cố toàn bài: trang tính, đường viền, khung, in dữ liệu.",
      time: 240,
      task: "Trả lời đúng mỗi câu để một bông hoa 🌻 về vườn trường trước khi ốc sên 🐌 bò tới!",
      intro: "Mỗi câu đúng: một bông hoa 🌻 về vườn trường 🏫. Sai thì ốc sên 🐌 bò tới!",
      questions: [
        { question: "Các đường lưới nhìn thấy trên màn hình bảng tính, khi in ra giấy (mặc định) sẽ:", type: "multiple-choice",
          options: ["Được in đậm hơn", "Không được in ra", "Được in màu xanh", "Chỉ in khung ngoài"],
          answer: 1, explanation: "Mặc định các đường lưới không được in ra.", level: "nhan-biet", activity: "tro-choi" },
        { question: "Nháy đúp chuột vào tên trang tính để:", type: "multiple-choice",
          options: ["Xoá trang tính", "Sao chép trang tính", "Tạo trang tính mới", "Đổi tên trang tính"],
          answer: 3, explanation: "Nháy đúp chuột vào tên trang tính, nhập tên mới, nhấn Enter để đổi tên.", level: "nhan-biet", activity: "tro-choi" },
        { question: "Nháy nút phải chuột vào tên trang tính rồi chọn Delete để:", type: "multiple-choice",
          options: ["Xoá trang tính", "Đổi tên trang tính", "Ẩn trang tính", "In trang tính"],
          answer: 0, explanation: "Delete: xoá một trang tính.", level: "nhan-biet", activity: "tro-choi" },
        { question: "Chọn Inside (không chọn Outline) thì bảng in ra có:", type: "multiple-choice",
          options: ["Chỉ có khung bên ngoài", "Không có đường kẻ nào", "Các đường viền ô bên trong, không có khung ngoài", "Cả khung ngoài và đường viền ô"],
          answer: 2, explanation: "Inside chỉ kẻ đường viền các ô bên trong; muốn có khung ngoài phải chọn thêm Outline.", level: "thong-hieu", activity: "tro-choi" },
        { question: "Bước đầu tiên khi muốn in một vùng dữ liệu là:", type: "multiple-choice",
          options: ["Chọn File/Print", "Nháy nút Print", "Chọn khổ giấy A4", "Đánh dấu vùng dữ liệu muốn in"],
          answer: 3, explanation: "B1: đánh dấu vùng dữ liệu muốn in → B2: File/Print → B3: Print.", level: "thong-hieu", activity: "tro-choi" },
        { question: "Muốn có thêm một bản sao của trang tính “5. Tổng kết” đặt ở cuối danh sách, em dùng lệnh:", type: "multiple-choice",
          options: ["Insert/Worksheet", "Delete", "Move or Copy… và đánh dấu Create a copy", "Nháy nút ⊕"],
          answer: 2, explanation: "Move or Copy… → chọn (move to end) → Create a copy → OK.", level: "van-dung", activity: "tro-choi" },
        { question: "Không đánh dấu vùng nào, chọn Print Active Sheets thì phần mềm in:", type: "multiple-choice",
          options: ["Toàn bộ các trang tính", "Trang tính hiện thời", "Chỉ ô A1", "Không in gì"],
          answer: 1, explanation: "Print Active Sheets: in trang tính hiện thời.", level: "van-dung", activity: "tro-choi" },
        { question: "Bạn Minh tô màu nền rất đẹp cho bảng nhưng không kẻ viền. Khi in ra giấy, bảng sẽ:", type: "multiple-choice",
          options: ["Có đủ đường kẻ vì đã tô màu", "Có màu nền nhưng không có đường kẻ ô", "Mất hết màu nền", "Bị báo lỗi, không in được"],
          answer: 1, explanation: "Màu nền vẫn được in, nhưng đường lưới không được in — cần kẻ đường viền ô và khung.", level: "van-dung-cao", activity: "tro-choi" },
      ],
    },

    /* ===================== HĐ4: VẬN DỤNG (8 phút) ===================== */
    {
      id: "van-dung", name: "Vận dụng — Giúp cô giáo tạo trang tính Điểm thi khảo sát 📊", type: "knowledge",
      goal: "Tạo trang tính, dùng hàm/công thức tính điểm trung bình, trình bày và kẻ khung.",
      time: 480,
      task: "Cặp đôi 8 phút (SGK tr.54): tạo trang tính Điểm thi khảo sát có các cột Họ và tên, Toán, Ngữ văn, Tiếng Anh, Điểm trung bình; dùng hàm hay công thức để tính; trình bày, kẻ khung và lưu tệp Diem_KS.xlsx. Trên máy/điện thoại: làm các câu trên bảng tính mô phỏng.",
      sgkImage: "assets/sgk/mau-diem-khao-sat.png",
      sheet: DKS,
      content: {
        heading: "📊 Trang tính Điểm thi khảo sát",
        revealLabel: "🖼️ Hình mẫu & các bước thực hành",
        blocks: [
          { kind: "image", value: "assets/sgk/mau-diem-khao-sat.png", caption: "Hình mẫu trang tính Điểm thi khảo sát" },
          { kind: "list", value: [
            "Khởi động chương trình bảng tính, nhập dữ liệu theo yêu cầu.",
            "Nhập hàm hoặc công thức tính Điểm trung bình tại ô F3: =AVERAGE(C3:E3) hoặc =(C3+D3+E3)/3, rồi sao chép xuống F4:F7.",
            "Định dạng cột Điểm trung bình có hai chữ số thập phân; in đậm, tô nền hàng tiêu đề; kẻ khung cho vùng dữ liệu.",
            "Lưu bảng tính với tên Diem_KS.xlsx.",
          ] },
        ],
      },
      questions: [
        { type: "sheet", mode: "formula", target: "F3:F7", answer: "=AVERAGE(C3:E3)",
          question: "Nhập hàm hoặc công thức vào ô F3 tính Điểm trung bình của Nguyễn Tùng Lâm, rồi sao chép xuống F4:F7.",
          explanation: "F3 = AVERAGE(C3:E3) = (7 + 8 + 9) : 3 = 8.00 (hoặc =(C3+D3+E3)/3). Sao chép xuống: F4 = AVERAGE(C4:E4)…", level: "van-dung", activity: "van-dung" },
        { question: "Vì sao KHÔNG dùng =SUM(C3,D3,E3) để tính Điểm trung bình?", type: "multiple-choice",
          options: ["Vì SUM chỉ dùng cho vùng dữ liệu", "Vì SUM không tính được số lẻ", "Vì SUM báo lỗi khi có 3 tham số", "Vì SUM cho ra tổng điểm (24), chưa chia cho 3 môn"],
          answer: 3, explanation: "SUM tính tổng: 7 + 8 + 9 = 24. Điểm trung bình phải là 24 : 3 = 8 → dùng AVERAGE hoặc (C3+D3+E3)/3.", level: "van-dung-cao", activity: "van-dung" },
        { question: "Trần Quỳnh Mai có điểm 8, 7, 8. Sau khi định dạng hai chữ số thập phân, ô Điểm trung bình hiển thị:", type: "multiple-choice",
          options: ["7.67", "7.6", "7.66", "8.00"],
          answer: 0, explanation: "(8 + 7 + 8) : 3 = 7.666… → hiển thị 7.67.", level: "van-dung", activity: "van-dung" },
        { type: "sheet", question: "Kéo chọn vùng dữ liệu cần kẻ đường viền ô và khung (từ hàng tiêu đề STT đến hết danh sách).", answer: "A2:F7",
          explanation: "Vùng A2:F7 gồm hàng tiêu đề và 5 học sinh → Format Cells → Border → Outline + Inside → OK.", level: "van-dung", activity: "van-dung" },
      ],
      remember: ["Hoàn thiện một trang tính: nhập dữ liệu → dùng hàm/công thức → định dạng, trình bày → kẻ đường viền, khung → lưu tệp (và in khi cần)."],
    },

    /* ===================== TỔNG KẾT ===================== */
    {
      id: "tong-ket", name: "Tổng kết", type: "summary",
      task: "Cả lớp nhắc lại kiến thức trọng tâm và làm thử thách cuối. Dặn dò: lưu tệp THXanh.xlsx, Diem_KS.xlsx; đọc trước Bài 11 “Tạo bài trình chiếu”.",
      content: {
        learned: [
          "Đường lưới trên màn hình mặc định không được in → kẻ đường viền ô và khung trước khi in.",
          "Thao tác với trang tính: ⊕ tạo mới · Delete · Insert/Worksheet · nháy đúp đổi tên · kéo thả đổi thứ tự · Move or Copy + Create a copy.",
          "Kẻ viền: chọn vùng → Format Cells → Border → None / Outline / Inside → OK.",
          "In: đánh dấu vùng → File/Print, nhập thông số → Print; chọn in vùng chọn, trang tính hiện thời hoặc toàn bộ bảng tính.",
        ],
        challenge: [
          { question: "Bạn Lan cần nộp cô giáo bản in CHỈ gồm bảng điểm ở vùng A1:F7 của trang tính, có đủ đường kẻ. Cách làm đúng là:", type: "multiple-choice",
            options: ["File/Print → Print Entire Workbook → Print", "Kẻ viền (Outline + Inside) cho A2:F7 → đánh dấu A1:F7 → File/Print → Print Selection → Print", "Tô màu nền A1:F7 → File/Print → Print", "Đổi tên trang tính → File/Print → Print"],
            answer: 1, explanation: "Phải kẻ viền để bản in có đường kẻ, rồi đánh dấu vùng cần in và chọn Print Selection để chỉ in vùng đó.",
            level: "van-dung-cao", activity: "tong-ket" },
          { question: "Việc nào KHÔNG thuộc thao tác với trang tính?", type: "multiple-choice",
            options: ["Đổi tên trang tính", "Sao chép trang tính", "Kẻ khung cho vùng dữ liệu", "Chèn trang tính mới"],
            answer: 2, explanation: "Kẻ khung là thao tác trình bày vùng dữ liệu (Format Cells → Border), không phải thao tác với trang tính.",
            level: "thong-hieu", activity: "tong-ket" },
        ],
      },
    },
  ],
};

if (typeof module !== "undefined" && module.exports) module.exports = LESSON;
if (typeof window !== "undefined") window.LESSON = LESSON;
