/* ============================================================================
 * BÀI 8 — THỰC HÀNH: SỬ DỤNG CÔNG CỤ TRỰC QUAN TRÌNH BÀY THÔNG TIN TRONG TRAO ĐỔI VÀ HỢP TÁC
 * Tin học 9 — Kết nối tri thức. Chủ đề 4: Ứng dụng tin học.
 * Bám sát SGK trang 30–33 + Kế hoạch bài dạy (2 tiết) của giáo viên.
 * Chỉ sửa file này để đổi nội dung. Engine app.js không cần sửa.
 * ==========================================================================*/

// ---- ĐƯỜNG LIÊN KẾT VIDEO VỀ CHARLES BABBAGE (SGK Hình 8.4) ----
// Thầy/cô dán đường liên kết video đã chọn vào giữa hai dấu "" (ví dụ "https://www.youtube.com/watch?v=...").
// Để trống: HS vẫn thực hành chèn liên kết bằng mục 🔗 Liên kết (tự dán đường liên kết thầy/cô cung cấp).
const VIDEO_URL = "";

// ---- Hình 8.1: bảng tính KinhPhi.xlsx (công thức tự tính như Excel) ----
const KINHPHI = { title: "KinhPhi.xlsx", cols: 5, rows: 6, widths: { A: 0.55, B: 3.1, C: 1.05, D: 1.3, E: 1.2 },
  cells: { A1: "Chi phí nội dung \"Lược sử công cụ tính toán\"",
    A2: "TT", B2: "Nội dung", C2: "Số lượng", D2: "Đơn giá (VND)", E2: "Thành tiền",
    A3: "1", B3: "In ảnh màu kích thước 30 x 45", C3: "8", D3: "8000", E3: "=C3*D3",
    A4: "2", B4: "In nội dung chú thích cho ảnh", C4: "8", D4: "1000", E4: "=C4*D4",
    A5: "3", B5: "Văn phòng phẩm (bút màu, giấy,...)", E5: "50000",
    B6: "Tổng", E6: "=SUM(E3:E5)" },
  bold: ["B6", "E6"], center: ["A2:E2", "B6"], fill: { "A2:E2": "#bfdbfe" }, comma: ["D3:E6"] };
const KINHPHI_FILE = Object.assign({}, KINHPHI, { editable: true });

// ---- Pascaline.png (hình vẽ minh hoạ) & CharlesBabbage.docx (văn bản minh hoạ) ----
const PASCALINE_SVG = `<svg viewBox="0 0 420 200" style="width:100%;max-height:52vh" xmlns="http://www.w3.org/2000/svg">
  <rect x="20" y="40" width="380" height="130" rx="14" fill="#a16207" stroke="#713f12" stroke-width="4"/>
  <rect x="34" y="52" width="352" height="30" rx="6" fill="#fef3c7" stroke="#713f12" stroke-width="2"/>
  ${[0, 1, 2, 3, 4, 5].map((i) => `<rect x="${48 + i * 56}" y="57" width="26" height="20" rx="3" fill="#fff" stroke="#92400e"/><text x="${61 + i * 56}" y="72" font-size="14" text-anchor="middle" font-family="Georgia" fill="#111">${[0, 0, 1, 6, 4, 2][i]}</text>
  <circle cx="${61 + i * 56}" cy="125" r="22" fill="#fde68a" stroke="#713f12" stroke-width="3"/>${Array.from({ length: 10 }, (_, k) => { const t = k * 36 * Math.PI / 180; return `<circle cx="${(61 + i * 56 + 16 * Math.cos(t)).toFixed(1)}" cy="${(125 + 16 * Math.sin(t)).toFixed(1)}" r="2.2" fill="#713f12"/>`; }).join("")}<circle cx="${61 + i * 56}" cy="125" r="4" fill="#713f12"/>`).join("")}
  <text x="210" y="195" font-size="14" text-anchor="middle" fill="#475569" font-family="Segoe UI,Arial">Pascaline.png — hình vẽ minh hoạ máy tính cơ học Pascaline (1642)</text></svg>`;
const BABBAGE_DOC = "TIỂU SỬ NHÀ KHOA HỌC CHARLES BABBAGE\n"
  + "Charles Babbage (1791–1871) là nhà toán học người Anh.\n"
  + "Ông thiết kế Máy vi phân (Difference Engine) để tự động tính các bảng số.\n"
  + "Năm 1833, ông đưa ra dự án Máy phân tích (Analytical Engine) — cỗ máy tính toán tự động đa năng.\n"
  + "Ý tưởng của ông được xem là tiền thân của máy tính hiện đại, vì vậy ông thường được gọi là “cha đẻ của máy tính”.\n"
  + "(Văn bản minh hoạ cho tệp CharlesBabbage.docx)";

// Thư mục dữ liệu của dự án (SGK Hình 8.3: E-TrinhBayThongTin › DuAnTrienLam)
const DU_AN = { path: "E-TrinhBayThongTin › DuAnTrienLam",
  files: [
    { kind: "doc", name: "CharlesBabbage.docx", note: BABBAGE_DOC },
    { kind: "sheet", name: "KinhPhi.xlsx", sheet: KINHPHI_FILE, note: "Hình 8.1 — bảng tính chi phí cho phần nội dung Lược sử công cụ tính toán. Thử sửa Số lượng, Đơn giá: Thành tiền và Tổng tự tính lại." },
    { kind: "img", name: "Pascaline.png", html: PASCALINE_SVG, note: "Máy Pascaline do Blaise Pascal chế tạo năm 1642 — máy tính cơ học đầu tiên." },
  ].concat(VIDEO_URL ? [{ kind: "link", name: "Video về Charles Babbage", url: VIDEO_URL, note: "Đường liên kết đến video về nhà khoa học Charles Babbage trên Internet." }] : []) };

// ---- Hình 8.6: dòng thời gian lược sử công cụ tính toán ----
const TL = [
  ["1642", "Blaise Pascal", "Máy tính cơ học đầu tiên", "#f59e0b", 1],
  ["1833", "Charles Babbage", "Máy tính đa năng", "#22c55e", 0],
  ["1945", "ENIAC", "Máy tính điện tử thế hệ thứ nhất (1945 – 1955)", "#94a3b8", 1],
  ["1959", "IBM 7090", "Máy tính điện tử thế hệ thứ hai (1955 – 1965)", "#4f46e5", 0],
  ["1964", "IBM System/360", "Máy tính điện tử thế hệ thứ ba (1965 – 1974)", "#ef4444", 1],
  ["1973", "Máy vi tính Micral", "Máy tính điện tử thế hệ thứ tư (1974 – 1990)", "#38bdf8", 0],
  ["2007", "iPhone", "Máy tính điện tử thế hệ thứ năm (1990 – ngày nay)", "#d946ef", 1],
];
const tlCard = (t, c) => `<div style="background:#f8fafc;border-radius:10px;overflow:hidden;box-shadow:0 2px 6px rgba(0,0,0,.12);font-size:.82rem;line-height:1.3;text-align:center"><div style="background:${c};color:#fff;font-weight:800;padding:3px 4px;font-size:.9rem">${t[1]}</div><div style="padding:4px 5px;color:#334155">${t[2]}</div></div>`;
const TIMELINE_HTML = `<div style="overflow-x:auto"><div style="min-width:760px;display:grid;grid-template-columns:repeat(7,1fr);gap:6px;position:relative;padding:4px 2px">
  <div style="position:absolute;left:3%;right:1%;top:50%;height:12px;margin-top:-6px;border-radius:6px;background:linear-gradient(90deg,${TL.map((t) => t[3]).join(",")})"></div>
  ${TL.map((t) => `<div style="display:grid;grid-template-rows:1fr 58px 1fr;align-items:center;position:relative">
    <div style="align-self:end">${t[4] ? tlCard(t, t[3]) : ""}</div>
    <div style="justify-self:center;width:54px;height:54px;border-radius:50%;background:#fff;border:6px solid ${t[3]};display:grid;place-items:center;font-weight:800;font-size:.95rem">${t[0]}</div>
    <div style="align-self:start">${t[4] ? "" : tlCard(t, t[3])}</div></div>`).join("")}</div></div>`;

// ---- Mở đầu: cùng một nội dung, hai cách trình bày ----
const COMPARE_HTML = `<div style="display:grid;grid-template-columns:minmax(0,1fr);gap:16px">
  <div style="background:#f8fafc;border:2px solid #cbd5e1;border-radius:16px;padding:14px 18px">
    <div style="font-weight:800;color:#475569;margin-bottom:6px">Ví dụ 1 — Đoạn văn bản dài</div>
    <p style="margin:0;font-size:.95rem;line-height:1.55;color:#334155;text-align:justify">Năm 1642, Blaise Pascal chế tạo máy tính cơ học đầu tiên. Đến năm 1833, Charles Babbage đưa ra dự án máy tính đa năng. Năm 1945, ENIAC ra đời, là máy tính điện tử thế hệ thứ nhất (1945 – 1955). Máy tính điện tử thế hệ thứ hai (1955 – 1965) có IBM 7090 ra đời năm 1959, thế hệ thứ ba (1965 – 1974) có IBM System/360 ra đời năm 1964, thế hệ thứ tư (1974 – 1990) có máy vi tính Micral ra đời năm 1973 và thế hệ thứ năm (1990 – ngày nay) có iPhone ra đời năm 2007.</p></div>
  <div style="background:#fff;border:3px solid #facc15;border-radius:16px;padding:10px 12px;box-shadow:0 6px 16px rgba(202,138,4,.18)">
    <div style="font-weight:800;color:#4338ca;margin-bottom:6px;font-size:1.15rem">Ví dụ 2 — Trang chiếu có sơ đồ dòng thời gian</div>${TIMELINE_HTML}</div></div>`;

const ROADMAP_HTML = `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:12px">
  ${[["🧠", "Nhiệm vụ 1", "Tạo sơ đồ tư duy LuocSu có đính kèm văn bản, hình ảnh, trang tính, đường liên kết video", "#eef2ff", "#6366f1"],
    ["🎤", "Nhiệm vụ 2", "Trưởng nhóm trình bày sơ đồ, cả nhóm trao đổi, bổ sung, phân công", "#fff7ed", "#f97316"],
    ["📽️", "Nhiệm vụ 3", "Tạo bài trình chiếu LuocSuMayTinh có hình ảnh, sơ đồ, video hợp lí", "#f0fdf4", "#16a34a"],
    ["🔧", "Luyện tập", "Trình bày, rà soát và chỉnh sửa bài trình chiếu", "#fdf4ff", "#c026d3"],
    ["🏛️", "Vận dụng", "Bổ sung đặc điểm máy tính từng thế hệ, chia sẻ cho Triển lãm tin học", "#fefce8", "#ca8a04"]]
    .map(([i, t, d, bg, bd]) => `<div style="background:${bg};border:2px solid ${bd};border-radius:16px;padding:12px 14px"><div style="font-size:2rem">${i}</div><b style="font-size:1.12rem;color:${bd}">${t}</b><div style="margin-top:4px;font-size:1rem;line-height:1.4">${d}</div></div>`).join("")}</div>`;

// Thư mục DuAnTrienLam (minh hoạ Hình 8.3)
const FOLDER_HTML = `<div style="border:2px solid #cbd5e1;border-radius:14px;overflow:hidden;background:#fff;max-width:760px">
  <div style="background:#f1f5f9;padding:8px 14px;font-weight:700;color:#334155">📁 E-TrinhBayThongTin › DuAnTrienLam</div>
  ${[["📄", "CharlesBabbage.docx", "Tệp văn bản: tiểu sử nhà khoa học Charles Babbage"], ["📊", "KinhPhi.xlsx", "Tệp bảng tính: tính chi phí triển lãm (Hình 8.1)"], ["🧠", "LuocSu.emm", "Tệp sơ đồ tư duy tạo bằng MindMaple Lite"], ["🖼️", "Pascaline.png", "Tệp hình ảnh: máy tính cơ học Pascaline"], ["🔗", "Đường liên kết", "Video về Charles Babbage trên Internet"]]
    .map(([i, n, d]) => `<div style="display:grid;grid-template-columns:40px minmax(0,1fr);gap:6px;align-items:center;padding:8px 14px;border-top:1px solid #e2e8f0;font-size:1.05rem"><span style="font-size:1.6rem">${i}</span><span><b>${n}</b><br><span style="color:#64748b;font-size:.95rem">${d}</span></span></div>`).join("")}</div>`;

// Kịch bản bài trình chiếu LuocSuMayTinh (SGK Nhiệm vụ 3)
const slideBox = (n, title, body, tag) => `<div><div style="aspect-ratio:16/9;background:#fff;border:3px solid #facc15;border-radius:10px;padding:8px 10px;overflow:hidden;display:flex;flex-direction:column;position:relative">
  <div style="font-weight:800;font-size:.95rem;color:#1e1b4b;line-height:1.2">${title}</div><div style="flex:1;display:flex;align-items:center;justify-content:center;gap:6px;font-size:.8rem;color:#334155">${body}</div>
  <span style="position:absolute;right:0;bottom:0;width:0;height:0;border-left:34px solid transparent;border-bottom:34px solid #facc15"></span></div>
  <div style="font-size:.9rem;margin-top:4px"><b>${n}.</b> ${tag}</div></div>`;
const STORY_HTML = `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px">
  ${slideBox(1, "", `<div style="font-size:1.3rem;font-weight:800;color:#4338ca;text-align:center">Lược sử công cụ tính toán</div>`, "Trang tiêu đề")}
  ${slideBox(2, "", `<div style="font-size:1.1rem;font-weight:700;padding-right:6px;border-right:2px solid #94a3b8">Nội dung</div><ol style="margin:0;padding-left:14px;font-size:.54rem;line-height:1.12;flex:1;min-width:0"><li>Mở đầu</li><li>Dòng thời gian lược sử công cụ tính toán</li><li>Blaise Pascal và máy tính cơ học đầu tiên</li><li>Charles Babbage và máy tính đa năng</li><li>Các thế hệ máy tính điện tử</li></ol>`, "Trang dàn ý (Hình 8.5)")}
  ${slideBox(3, "2. Dòng thời gian lược sử công cụ tính toán", `<div style="display:flex;align-items:center;gap:3px">${TL.map((t) => `<span style="width:22px;height:22px;border-radius:50%;border:3px solid ${t[3]};display:grid;place-items:center;font-size:.45rem;font-weight:800">${t[0]}</span>`).join("")}</div>`, "Sơ đồ dòng thời gian — dùng mẫu có sẵn (Hình 8.6)")}
  ${slideBox(4, "3. Blaise Pascal và máy tính cơ học đầu tiên", `<ul style="margin:0;padding-left:14px;font-size:.7rem"><li>1642</li><li>Pascaline</li><li>Cộng, trừ</li></ul><div style="width:48%">${PASCALINE_SVG.replace(/<text x="210"[\s\S]*?<\/text>/, "")}</div>`, "Chèn hình ảnh máy tính Pascaline")}
  ${slideBox(5, "4. Charles Babbage và máy tính đa năng", `<div style="width:62%;aspect-ratio:16/9;background:#0f172a;border-radius:6px;display:grid;place-items:center;color:#fff;font-size:1.4rem">▶</div>`, "Insert › Video › Insert Video from This Device")}
  ${slideBox(6, "5. Các thế hệ máy tính điện tử", `<div style="display:grid;grid-template-columns:repeat(5,1fr);gap:3px;width:100%">${TL.slice(2).map((t) => `<div style="background:${t[3]};color:#fff;border-radius:4px;padding:3px 1px;text-align:center;font-size:.5rem;font-weight:700">${t[1]}</div>`).join("")}</div>`, "Vận dụng: đặc điểm máy tính từng thế hệ")}</div>`;

// Khung sơ đồ ban đầu của Nhiệm vụ 1 (HS hoàn thiện như Hình 7.1)
const MM_START = { text: "Triển lãm\ntin học", children: [{ text: "Sản phẩm công nghệ số" }, { text: "Lược sử\ncông cụ tính toán" }, { text: "Dự kiến thu chi" }] };
const MM_TOOLS = [
  { label: "MindMaple — phần mềm sơ đồ tư duy (trang chủ)", url: "https://www.mindmaple.com/", note: "(mở tab mới)" },
  { label: "Canva — sơ đồ tư duy trực tuyến", url: "https://www.canva.com/" },
  { label: "Coggle — sơ đồ tư duy trực tuyến", url: "https://coggle.it/", note: "(cần Internet và tài khoản)" },
];
const SLIDE_TOOLS = [
  { label: "PowerPoint trên web", url: "https://www.office.com/launch/powerpoint" },
  { label: "Google Trang trình bày (Slides)", url: "https://docs.google.com/presentation/" },
  { label: "Canva — bài thuyết trình", url: "https://www.canva.com/", note: "(mở tab mới, cần Internet và tài khoản)" },
];
const MM_INTRO = "🧪 Làm ngay trên sơ đồ mô phỏng (máy/điện thoại nào cũng dùng được) hoặc làm trên MindMaple Lite. Bấm 📎 Đính kèm → chọn tệp trong thư mục DuAnTrienLam → 📂 Open. Đường liên kết video: 📎 Đính kèm → 🔗 Liên kết → dán đường liên kết.";

const LESSON = {
  meta: {
    subject: "Tin học", grade: "9", book: "Kết nối tri thức với cuộc sống",
    title: "Bài 8: Thực hành: Sử dụng công cụ trực quan trình bày thông tin trong trao đổi và hợp tác", unit: "Chủ đề 4 — Ứng dụng tin học",
    pages: "30–33", durationMinutes: 90,
  },
  objectives: {
    knowledge: [
      "Sử dụng được hình ảnh, biểu đồ, video một cách hợp lí.",
      "Tạo được sơ đồ tư duy có đính kèm văn bản, hình ảnh, video và trang tính.",
      "Tạo được bài trình chiếu có sử dụng hình ảnh, biểu đồ và video hợp lí.",
    ],
    competencies: [
      "Tự chủ và tự học; giao tiếp và hợp tác (làm việc nhóm, chia sẻ sản phẩm qua công cụ số); giải quyết vấn đề và sáng tạo.",
      "Năng lực số 2.4.TC2a: làm việc nhóm và cùng chỉnh sửa sản phẩm số.",
      "Năng lực số 2.2.TC2a: trao đổi, phản hồi qua các công cụ trực tuyến (Padlet, Google Drive, Google Meet…).",
      "Năng lực số 3.1.TC2a: tạo, sắp xếp và chỉnh sửa nội dung trình bày bằng phần mềm (MindMaple, PowerPoint, Canva, Google Slides…).",
      "Năng lực số 3.2.TC2a: thêm hình, biểu đồ, âm thanh, video để bài trình bày sinh động, trực quan.",
      "Năng lực AI 9.C2.1: đề xuất ý tưởng mới, sáng tạo bằng AI; đánh giá, kiểm chứng nội dung AI gợi ý trước khi đưa vào sản phẩm.",
    ],
    qualities: ["Chăm chỉ, trách nhiệm khi thực hành nhóm; trung thực, tôn trọng sản phẩm của người khác; biết lắng nghe, hỗ trợ bạn."],
  },
  coreKnowledge: [
    "Đính kèm tệp vào sơ đồ tư duy (MindMaple Lite): chọn nhánh → Insert/Attachment/Attachment → chọn tệp → Open; biểu tượng tệp đính kèm xuất hiện ở nhánh.",
    "Đính kèm đường liên kết: chọn nhánh → Insert/Hyperlink → dán đường liên kết vào ô Link to: → OK.",
    "Trình bày sơ đồ tư duy trước nhóm để trao đổi, bổ sung nội dung và phân công công việc.",
    "Bài trình chiếu sử dụng hình ảnh, sơ đồ, video hợp lí: đúng nội dung, đúng công cụ trực quan (tiến trình lịch sử → sơ đồ dòng thời gian); chèn video: Insert → Video → Insert Video from This Device.",
    "Rà soát, chỉnh sửa sản phẩm theo kết quả thảo luận và chia sẻ để cùng hoàn chỉnh.",
  ],
  keywords: ["Đính kèm tệp", "Hyperlink", "Sơ đồ dòng thời gian", "Chèn video", "Rà soát, chỉnh sửa"],
  settings: { basePoints: 100, useTimer: false, defaultTime: 60, sound: true, streakEnabled: true },

  activities: [
    /* =========================== TIẾT 1 =========================== */
    /* ===================== HĐ1: MỞ ĐẦU (5 phút) ===================== */
    {
      id: "mo-dau", name: "Mở đầu — Cách trình bày nào thu hút hơn? 🤔", type: "knowledge",
      goal: "Nhận ra lợi ích của việc trình bày thông tin bằng công cụ trực quan; nắm các nhiệm vụ thực hành của bài.",
      time: 300,
      task: "Thảo luận nhóm đôi: “Theo em, cách trình bày nào dễ hiểu và thu hút hơn? Vì sao?”",
      sgkImage: "assets/sgk/sgk-trang30.jpg",
      content: {
        heading: "🤔 Cùng một nội dung — hai cách trình bày",
        prompt: "Nội dung “Lược sử công cụ tính toán” của nhóm An, Minh, Khoa được trình bày theo hai cách. Hãy quan sát và so sánh.",
        revealLabel: "👀 Xem hai ví dụ",
        blocks: [
          { kind: "html", value: COMPARE_HTML },
          { kind: "text", value: "Bài 8 — Thực hành: Sử dụng công cụ trực quan trình bày thông tin trong trao đổi và hợp tác. Hôm nay, các em sẽ tạo sơ đồ tư duy có dữ liệu đính kèm và bài trình chiếu có hình ảnh, sơ đồ, video để chia sẻ thông tin hiệu quả hơn." },
          { kind: "html", value: ROADMAP_HTML },
        ],
      },
      questions: [
        { question: "Nhìn ví dụ 2, máy tính điện tử thế hệ thứ nhất là máy nào, ra đời năm nào?", type: "multiple-choice",
          options: ["IBM 7090 — năm 1959", "Máy vi tính Micral — năm 1973", "ENIAC — năm 1945", "Pascaline — năm 1642"],
          answer: 2, explanation: "Trên sơ đồ dòng thời gian, mốc 1945 gắn với ENIAC — máy tính điện tử thế hệ thứ nhất (1945 – 1955). Nhìn là thấy ngay, không phải đọc hết đoạn văn.",
          level: "nhan-biet", activity: "mo-dau" },
        { question: "Vì sao ví dụ 2 dễ hiểu và thu hút hơn ví dụ 1?", type: "multiple-choice",
          options: ["Vì ví dụ 2 có nhiều chữ hơn", "Các mốc xếp theo thứ tự trên một trục, có màu sắc, ít chữ — nhìn là thấy tiến trình", "Vì ví dụ 2 dùng phông chữ nhỏ hơn", "Vì ví dụ 2 bỏ bớt nội dung quan trọng"],
          answer: 1, explanation: "Sơ đồ dòng thời gian là công cụ trực quan phù hợp để trình bày tiến trình lịch sử: người xem nắm ý nhanh, dễ nhớ, tăng hiệu quả trao đổi và hợp tác.",
          level: "thong-hieu", activity: "mo-dau" },
        { question: "Trong bài thực hành hôm nay, nhóm em sẽ tạo ra những sản phẩm nào? (Chọn tất cả đáp án đúng)", type: "multiple-select",
          options: ["Sơ đồ tư duy LuocSu có đính kèm dữ liệu", "Một bức thư điện tử gửi thầy/cô", "Bài trình chiếu LuocSuMayTinh có hình ảnh, sơ đồ, video", "Một trang web bán hàng"],
          answer: [0, 2], explanation: "Nhiệm vụ 1 tạo sơ đồ tư duy LuocSu.emm có đính kèm dữ liệu; Nhiệm vụ 3 tạo bài trình chiếu LuocSuMayTinh.",
          level: "nhan-biet", activity: "mo-dau" },
      ],
      remember: ["Trình bày thông tin trực quan giúp người nghe dễ nắm ý, tạo hứng thú và tăng hiệu quả hợp tác."],
    },

    /* ===================== HĐ3.1: NHIỆM VỤ 1 — SƠ ĐỒ TƯ DUY CÓ ĐÍNH KÈM DỮ LIỆU (20 phút) ===================== */
    {
      id: "nv1-du-lieu", name: "Nhiệm vụ 1 — Dữ liệu đính kèm của dự án 📁", type: "knowledge",
      goal: "Nhận biết các tệp dữ liệu cần đính kèm và nội dung của từng tệp (Hình 8.1).",
      time: 240,
      task: "Quan sát thư mục DuAnTrienLam và bảng tính KinhPhi.xlsx (Hình 8.1), trả lời các câu hỏi.",
      sgkImage: "assets/sgk/hinh-8-1.jpg",
      sheet: KINHPHI,
      content: {
        heading: "📁 Nhiệm vụ 1: Sử dụng phần mềm tạo sơ đồ tư duy có đính kèm dữ liệu",
        prompt: "Yêu cầu (SGK tr.30): Sử dụng phần mềm tạo sơ đồ tư duy như Hình 7.1 với dữ liệu đính kèm đã chuẩn bị hoặc được cung cấp.",
        revealLabel: "📁 Xem các tệp dữ liệu đã chuẩn bị",
        blocks: [
          { kind: "html", value: FOLDER_HTML },
          { kind: "image", value: "assets/sgk/hinh-7-1.jpg", caption: "Hình 7.1. Sơ đồ tư duy trình bày ý tưởng Triển lãm tin học của nhóm An, Minh và Khoa (sản phẩm cần tạo)" },
        ],
      },
      questions: [
        { type: "sheet", question: "Trên bảng tính KinhPhi.xlsx (Hình 8.1), bấm vào ô chứa tổng chi phí của phần nội dung Lược sử công cụ tính toán.", answer: "E6",
          explanation: "Ô E6 chứa tổng chi phí 122,000 đồng (công thức =SUM(E3:E5)).", level: "nhan-biet", activity: "nv1-du-lieu" },
        { question: "Ô E3 được tính bằng công thức =C3*D3. Nếu số lượng ảnh in màu (ô C3) đổi từ 8 thành 10, tổng chi phí ở ô E6 là bao nhiêu?", type: "multiple-choice",
          options: ["122,000", "130,000", "140,000", "138,000"],
          answer: 3, explanation: "E3 = 10 × 8,000 = 80,000; E6 = 80,000 + 8,000 + 50,000 = 138,000. Bảng tính tự tính lại khi dữ liệu thay đổi.",
          hint: "Tính lại E3 trước, rồi cộng với E4 và E5.", level: "van-dung", activity: "nv1-du-lieu" },
        { question: "Vì sao nhóm nên đính kèm tệp KinhPhi.xlsx vào nhánh “Dự kiến thu chi” thay vì gõ hết các con số lên sơ đồ?", type: "multiple-choice",
          options: ["Sơ đồ vẫn gọn trong một trang; ai cần xem chi tiết thì mở tệp, số liệu tự tính lại khi cập nhật", "Vì sơ đồ tư duy không được chứa chữ số", "Vì tệp đính kèm làm sơ đồ có nhiều màu hơn", "Vì như vậy không ai sửa được số liệu"],
          answer: 0, explanation: "Đính kèm trang tính giữ sơ đồ gọn, rõ ràng mà vẫn cung cấp đầy đủ số liệu chi tiết, dễ cập nhật khi các thành viên cùng hợp tác.",
          level: "thong-hieu", activity: "nv1-du-lieu" },
      ],
    },
    {
      id: "nv1-ghep-tep", name: "Ghép tệp với nội dung của tệp 🧩", type: "matching",
      goal: "Nhận biết loại tệp qua tên và phần mở rộng.",
      time: 150,
      task: "Ghép mỗi tệp trong dự án Triển lãm tin học với nội dung của nó. Làm hết rồi bấm Nộp bài.",
      sgkImage: "assets/sgk/hinh-8-3.jpg",
      pairs: [
        { left: "KinhPhi.xlsx", right: "Bảng tính chi phí cho phần nội dung Lược sử công cụ tính toán" },
        { left: "Pascaline.png", right: "Hình ảnh minh hoạ máy tính cơ học Pascaline" },
        { left: "CharlesBabbage.docx", right: "Văn bản tiểu sử nhà khoa học Charles Babbage" },
        { left: "https://www.youtube.com/…", right: "Đường liên kết đến video trên Internet" },
        { left: "LuocSu.emm", right: "Tệp sơ đồ tư duy tạo bằng MindMaple Lite" },
        { left: "LuocSuMayTinh.pptx", right: "Bài trình chiếu Lược sử công cụ tính toán" },
      ],
      explanation: "Phần mở rộng cho biết loại tệp: .xlsx bảng tính · .png hình ảnh · .docx văn bản · .emm sơ đồ tư duy MindMaple · .pptx bài trình chiếu PowerPoint; địa chỉ bắt đầu bằng https:// là đường liên kết trên Internet.",
    },
    {
      id: "nv1-thao-tac", name: "Thao tác đính kèm trong MindMaple Lite 🖱️", type: "knowledge",
      goal: "Biết các lệnh đính kèm tệp và đường liên kết vào sơ đồ tư duy (Hình 8.2, 8.3, 8.4).",
      time: 300,
      task: "Đọc hướng dẫn SGK tr.30–31, quan sát Hình 8.2, 8.3, 8.4 rồi trả lời các câu hỏi.",
      sgkImage: "assets/sgk/sgk-trang31.jpg",
      content: {
        heading: "🖱️ Hướng dẫn: tạo sơ đồ, đính kèm tệp, đính kèm đường liên kết",
        revealLabel: "📖 Xem hướng dẫn (SGK tr.30–31)",
        blocks: [
          { kind: "list", value: [
            "a) Tạo sơ đồ tư duy: khởi động MindMaple Lite → tạo sơ đồ mới với chủ đề chính và các chủ đề nhánh như Hình 7.1 → lưu tệp với tên LuocSu.emm.",
            "b) Đính kèm tệp: chọn nhánh cần đính kèm → chọn Insert/Attachment/Attachment (Hình 8.2) → chọn tệp trong hộp thoại mở tệp (Hình 8.3) → nháy chuột chọn Open. Biểu tượng tệp đính kèm xuất hiện ở nhánh. Làm tương tự với các tệp văn bản, hình ảnh, bảng tính.",
            "c) Đính kèm đường liên kết: chọn nhánh → chọn Insert/Hyperlink → sao chép đường liên kết đến video vào ô Link to: (Hình 8.4) → chọn OK.",
          ] },
          { kind: "image", value: "assets/sgk/hinh-8-2.jpg", caption: "Hình 8.2. Đính kèm tệp vào sơ đồ tư duy" },
          { kind: "image", value: "assets/sgk/hinh-8-3.jpg", caption: "Hình 8.3. Chọn tệp từ thư mục lưu trữ để chèn vào sơ đồ tư duy" },
          { kind: "image", value: "assets/sgk/hinh-8-4.jpg", caption: "Hình 8.4. Chèn đường liên kết đến video trên Internet" },
        ],
      },
      questions: [
        { question: "Hình 8.2: Sau khi chọn nhánh cần đính kèm tệp, em chọn lệnh nào?", type: "multiple-choice", sgkImage: "assets/sgk/hinh-8-2.jpg",
          options: ["Insert/Hyperlink", "Insert/Attachment/Attachment", "Insert/Picture", "File/Save As"],
          answer: 1, explanation: "Đính kèm tệp: chọn Insert/Attachment/Attachment như minh hoạ trong Hình 8.2.", level: "nhan-biet", activity: "nv1-thao-tac" },
        { question: "Hình 8.3: Trong hộp thoại mở tệp, sau khi chọn tệp Pascaline.png, em nháy chuột vào nút nào?", type: "multiple-choice", sgkImage: "assets/sgk/hinh-8-3.jpg",
          options: ["Cancel", "New folder", "Organize", "Open"],
          answer: 3, explanation: "Chọn tệp cần chèn rồi nháy chuột chọn Open; biểu tượng tệp đính kèm xuất hiện ở nhánh của sơ đồ.", level: "nhan-biet", activity: "nv1-thao-tac" },
        { question: "Hình 8.4: Để chèn đường liên kết đến video, em dán đường liên kết vào ô nào của hộp thoại Hyperlink?", type: "multiple-choice", sgkImage: "assets/sgk/hinh-8-4.jpg",
          options: ["Link to:", "Topic / Label:", "Relative", "Defaults..."],
          answer: 0, explanation: "Sao chép đường liên kết đến video vào ô Link to: rồi chọn OK.", level: "nhan-biet", activity: "nv1-thao-tac" },
        { question: "Muốn chèn đường liên kết đến video trên Internet, em dùng lệnh Insert/Attachment/Attachment.", type: "true-false", answer: false,
          explanation: "Sai. Đường liên kết dùng lệnh Insert/Hyperlink; Insert/Attachment/Attachment dùng cho tệp đã lưu trong máy (văn bản, hình ảnh, bảng tính…).", level: "thong-hieu", activity: "nv1-thao-tac" },
        { question: "Đính kèm thành công tệp CharlesBabbage.docx vào nhánh “1833 Charles Babbage”. Trên nhánh đó sẽ xuất hiện gì?", type: "multiple-choice",
          options: ["Toàn bộ nội dung văn bản hiện ra trên nhánh", "Nhánh bị xoá khỏi sơ đồ", "Biểu tượng tệp đính kèm", "Một nhánh con mới tên CharlesBabbage"],
          answer: 2, explanation: "Biểu tượng tệp đính kèm xuất hiện ở nhánh (như Hình 7.1); nháy vào biểu tượng để mở tệp — sơ đồ vẫn gọn.", level: "thong-hieu", activity: "nv1-thao-tac" },
      ],
      remember: [
        "Đính kèm tệp: chọn nhánh → Insert/Attachment/Attachment → chọn tệp → Open.",
        "Đính kèm đường liên kết: chọn nhánh → Insert/Hyperlink → dán vào ô Link to: → OK.",
      ],
    },
    {
      id: "nv1-lenh", name: "Trò chơi: Dùng lệnh nào? 📎🔗", type: "dragdrop",
      goal: "Phân biệt khi nào dùng Insert/Attachment, khi nào dùng Insert/Hyperlink.",
      time: 150,
      task: "Xếp mỗi việc cần làm vào đúng lệnh của MindMaple Lite. Xếp hết rồi bấm Nộp bài.",
      groups: ["📎 Insert / Attachment / Attachment", "🔗 Insert / Hyperlink"],
      items: [
        { text: "Đính kèm tệp KinhPhi.xlsx vào nhánh Dự kiến thu chi", group: 0 },
        { text: "Gắn video về Charles Babbage trên YouTube", group: 1 },
        { text: "Đính kèm ảnh Pascaline.png vào nhánh 1642", group: 0 },
        { text: "Gắn trang web của một bảo tàng máy tính trên Internet", group: 1 },
        { text: "Đính kèm văn bản CharlesBabbage.docx", group: 0 },
        { text: "Gắn bài trình chiếu trực tuyến (Google Slides) của nhóm", group: 1 },
        { text: "Đính kèm tệp video Babbage.mp4 đã lưu trong máy", group: 0 },
        { text: "Đính kèm tệp ghi âm lời thuyết minh đã lưu trong máy", group: 0 },
      ],
      explanation: "Tệp đã lưu trong máy (văn bản, ảnh, bảng tính, video, âm thanh) → Insert/Attachment/Attachment. Tài nguyên trên Internet (video YouTube, trang web, sản phẩm trực tuyến) → Insert/Hyperlink.",
    },
    {
      id: "nv1-cac-buoc", name: "Sắp xếp các bước đính kèm tệp 🔢", type: "ordering",
      goal: "Nắm đúng quy trình đính kèm tệp vào sơ đồ tư duy.",
      time: 120,
      task: "Sắp xếp các bước đính kèm tệp Pascaline.png vào nhánh “1642 Blaise Pascal” theo đúng thứ tự rồi bấm Nộp bài.",
      sgkImage: "assets/sgk/sgk-trang31.jpg",
      steps: [
        "Chọn nhánh của sơ đồ tư duy cần đính kèm tệp",
        "Chọn Insert/Attachment/Attachment",
        "Trong hộp thoại mở tệp, chọn tệp Pascaline.png",
        "Nháy chuột chọn Open",
        "Biểu tượng tệp đính kèm xuất hiện ở nhánh của sơ đồ",
      ],
      explanation: "Chọn nhánh → Insert/Attachment/Attachment → chọn tệp → Open → biểu tượng tệp đính kèm xuất hiện ở nhánh (SGK tr.30–31).",
    },
    {
      id: "nv1-thuc-hanh", name: "Thực hành Nhiệm vụ 1: Sơ đồ LuocSu có đính kèm dữ liệu 🧠", type: "knowledge",
      goal: "Tạo sơ đồ tư duy như Hình 7.1 có đính kèm văn bản, hình ảnh, trang tính và đường liên kết video.",
      time: 1200,
      task: "Nhóm: (a) hoàn thiện sơ đồ như Hình 7.1; (b) đính kèm CharlesBabbage.docx, Pascaline.png, KinhPhi.xlsx vào đúng nhánh; (c) đính kèm đường liên kết video về Charles Babbage; lưu LuocSu.emm rồi gửi sơ đồ cho thầy/cô.",
      sgkImage: "assets/sgk/hinh-7-1.jpg",
      links: MM_TOOLS,
      mindmap: { key: "luocsu", editable: true, layout: "right", title: "LuocSu.emm — sơ đồ tư duy của nhóm em", root: MM_START,
        library: DU_AN, need: ["doc", "img", "sheet", "video|link"],
        submit: "Sơ đồ tư duy LuocSu (Nhiệm vụ 1)", intro: MM_INTRO },
      content: {
        heading: "🧠 Thực hành Nhiệm vụ 1",
        revealLabel: "📌 Gợi ý các nhánh như Hình 7.1",
        blocks: [
          { kind: "list", value: [
            "Nhánh “Lược sử công cụ tính toán” → nhánh con “Máy tính cơ học” và “Máy tính điện tử”.",
            "“Máy tính cơ học” → hai nhánh: “1642 Blaise Pascal Máy tính cơ học quay tay Pascaline” và “1833 Charles Babbage Dự án máy tính tự động đa năng Analytical Engine”.",
            "Đính kèm: 🖼️ Pascaline.png → nhánh 1642 · 📄 CharlesBabbage.docx và 🔗 đường liên kết video → nhánh 1833 · 📊 KinhPhi.xlsx → nhánh Dự kiến thu chi.",
            "Tiêu chí (giáo án): đính kèm được ít nhất 4 loại dữ liệu — văn bản, hình ảnh, video hoặc liên kết video, trang tính.",
          ] },
          { kind: "image", value: "assets/sgk/hinh-7-1.jpg", caption: "Hình 7.1 — sản phẩm mẫu" },
        ],
      },
      remember: ["Khi trình bày bằng sơ đồ tư duy, chúng ta dễ hệ thống thông tin, chia sẻ và hợp tác hiệu quả."],
    },

    /* ===================== HĐ3.2: NHIỆM VỤ 2 — TRÌNH BÀY SƠ ĐỒ TƯ DUY (15 phút) ===================== */
    {
      id: "nv2-trinh-bay", name: "Nhiệm vụ 2 — Trình bày sơ đồ tư duy 🎤", type: "knowledge",
      goal: "Trình bày sơ đồ tư duy trước nhóm để các thành viên trao đổi, bổ sung nội dung.",
      time: 600,
      task: "Chọn một cách sử dụng sơ đồ tư duy (Bài 7). Trưởng nhóm trình bày nội dung chuẩn bị về Lược sử công cụ tính toán; cả nhóm trao đổi, bổ sung vào sơ đồ rồi gửi lại cho thầy/cô.",
      sgkImage: "assets/sgk/sgk-trang32.jpg",
      mindmap: { key: "luocsu", editable: true, layout: "right", title: "LuocSu.emm — bổ sung sau khi trao đổi", root: MM_START,
        library: DU_AN, submit: "Sơ đồ tư duy LuocSu — bản bổ sung sau thảo luận (Nhiệm vụ 2)" },
      content: {
        heading: "🎤 Nhiệm vụ 2: Trình bày sơ đồ tư duy",
        prompt: "Yêu cầu (SGK tr.32): Trình bày sơ đồ tư duy trước nhóm để các thành viên trao đổi, bổ sung nội dung cho sơ đồ tư duy.",
        revealLabel: "💡 Bốn cách sử dụng & gợi ý cho trưởng nhóm",
        blocks: [
          { kind: "html", value: `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px">${[["🎤", "Trình bày trực tiếp", "#f97316"], ["👀", "Chia sẻ để các thành viên xem", "#0ea5e9"], ["✍️", "Chia sẻ để chủ động cập nhật", "#16a34a"], ["⚡", "Cộng tác theo thời gian thực", "#a855f7"]].map(([i, t, c]) => `<div style="border:2px solid ${c};border-radius:14px;padding:10px 12px;font-size:1.05rem"><span style="font-size:1.6rem">${i}</span> <b>${t}</b></div>`).join("")}</div>` },
          { kind: "list", value: [
            "Trưởng nhóm: giới thiệu chủ đề trung tâm → lần lượt từng nhánh → mở tệp đính kèm để minh hoạ (ảnh Pascaline, tiểu sử Babbage, bảng kinh phí, video).",
            "Các thành viên: lắng nghe, đặt câu hỏi, đề xuất nội dung cần bổ sung.",
            "Cả nhóm: bổ sung vào sơ đồ, phân công công việc để tiếp tục hoàn thành những nội dung cần chuẩn bị.",
          ] },
        ],
      },
      questions: [
        { question: "Trưởng nhóm mở sơ đồ trên màn hình, giới thiệu từng nhánh và trả lời ngay câu hỏi của các bạn. Đây là cách sử dụng sơ đồ tư duy nào?", type: "multiple-choice",
          options: ["Chia sẻ để các thành viên xem", "Trình bày trực tiếp", "Chia sẻ để chủ động cập nhật", "Cộng tác theo thời gian thực"],
          answer: 1, explanation: "Trình bày trực tiếp: người trình bày có mặt, diễn giải và trả lời ngay câu hỏi — cách dễ dàng nhất để cộng tác.", level: "nhan-biet", activity: "nv2-trinh-bay" },
        { question: "Khi trình bày đến nhánh “1642 Blaise Pascal”, trưởng nhóm nên làm gì để nội dung sinh động, dễ hiểu?", type: "multiple-choice",
          options: ["Đọc thật nhanh để tiết kiệm thời gian", "Bỏ qua nhánh này", "Đọc to toàn bộ tệp văn bản", "Mở ảnh Pascaline đính kèm cho cả nhóm cùng xem"],
          answer: 3, explanation: "Dùng dữ liệu đã đính kèm (ảnh, video, trang tính) để minh hoạ giúp phần trình bày sinh động, dễ hiểu.", level: "van-dung", activity: "nv2-trinh-bay" },
        { question: "Sau buổi trao đổi, nhóm muốn mỗi bạn về nhà tự bổ sung phần mình phụ trách vào sơ đồ trực tuyến vào thời gian rảnh của mình. Nhóm nên chọn cách nào?", type: "multiple-choice",
          options: ["Chia sẻ để các thành viên chủ động cập nhật", "Trình bày trực tiếp", "In sơ đồ ra giấy", "Chia sẻ để các thành viên chỉ xem"],
          answer: 0, explanation: "Chia sẻ để chủ động cập nhật: mỗi thành viên tự chỉnh sửa sản phẩm trực tuyến theo thời gian phù hợp với mình.", level: "van-dung", activity: "nv2-trinh-bay" },
        { question: "Theo hướng dẫn SGK, trong Nhiệm vụ 2 nhóm cần làm những việc nào? (Chọn tất cả đáp án đúng)", type: "multiple-select",
          options: ["Một thành viên đóng vai trò trưởng nhóm trình bày nội dung đã chuẩn bị", "Trao đổi, thảo luận để bổ sung thêm nội dung cần chuẩn bị", "Xoá sơ đồ để làm lại từ đầu", "Phân công công việc để các thành viên tiếp tục hoàn thành nội dung"],
          answer: [0, 1, 3], explanation: "SGK: chọn trưởng nhóm trình bày → trao đổi, thảo luận bổ sung nội dung → phân công công việc.", level: "thong-hieu", activity: "nv2-trinh-bay" },
      ],
      remember: [
        "Sơ đồ tư duy giúp trình bày ý tưởng ngắn gọn, dễ hiểu.",
        "Kết hợp hình ảnh và liên kết giúp nội dung sinh động, chuyên nghiệp.",
      ],
    },
    {
      id: "nv2-phan-cong", name: "Nhiệm vụ 2 — Trao đổi, bổ sung và phân công 🤝", type: "vandung",
      goal: "Thống nhất cách trình bày, nội dung bổ sung và phân công công việc trong nhóm.",
      time: 300,
      task: "Nhóm thảo luận, gửi câu trả lời cho thầy/cô; đại diện 1–2 nhóm chia sẻ trước lớp.",
      intro: "Gửi câu trả lời cho thầy/cô rồi bấm để xem hướng chốt.",
      cases: [
        { question: "Nhóm em chọn cách nào (trong 4 cách ở Bài 7) để trình bày sơ đồ tư duy? Ai là trưởng nhóm trình bày? Vì sao chọn cách đó?",
          answer: "Ví dụ: chọn cách trình bày trực tiếp — trưởng nhóm là bạn nắm nội dung tốt nhất, trình bày ngay tại lớp nên có thể diễn giải bức tranh toàn cảnh, mở tệp đính kèm minh hoạ và trả lời ngay câu hỏi của các bạn." },
        { question: "Sau khi trao đổi, nhóm em bổ sung thêm những nội dung nào cho phần Lược sử công cụ tính toán?",
          answer: "Gợi ý: các thế hệ máy tính điện tử (ENIAC, IBM 7090, IBM System/360, máy vi tính Micral, iPhone — Hình 8.6); ảnh máy ENIAC; tiểu sử Blaise Pascal; video về máy Pascaline; bổ sung khoản chi vào KinhPhi.xlsx…" },
        { question: "Ghi bảng phân công: tên từng thành viên và phần việc phụ trách để hoàn thành những nội dung cần chuẩn bị.",
          answer: "Ví dụ: An — tìm ảnh, tư liệu về Blaise Pascal; Minh — chọn video, tiểu sử Charles Babbage; Khoa — tư liệu các thế hệ máy tính điện tử, cập nhật bảng kinh phí; cả nhóm — tạo bài trình chiếu LuocSuMayTinh (Nhiệm vụ 3)." },
      ],
    },

    /* =========================== TIẾT 2 =========================== */
    /* ===================== HĐ3.3: NHIỆM VỤ 3 — BÀI TRÌNH CHIẾU (25 phút) ===================== */
    {
      id: "nv3-dan-y", name: "Nhiệm vụ 3 — Trang dàn ý của bài trình chiếu 📑", type: "ordering",
      goal: "Xây dựng trang dàn ý hợp lí cho bài trình chiếu Lược sử công cụ tính toán (Hình 8.5).",
      time: 150,
      task: "Sắp xếp các mục của trang dàn ý theo trình tự hợp lí như Hình 8.5 rồi bấm Nộp bài.",
      sgkImage: "assets/sgk/hinh-8-5.jpg",
      steps: [
        "Mở đầu",
        "Dòng thời gian lược sử công cụ tính toán",
        "Blaise Pascal và máy tính cơ học đầu tiên",
        "Charles Babbage và máy tính đa năng",
        "Các thế hệ máy tính điện tử",
      ],
      explanation: "Hình 8.5: Mở đầu → Dòng thời gian (bức tranh toàn cảnh) → Blaise Pascal (1642) → Charles Babbage (1833) → Các thế hệ máy tính điện tử (từ 1945). Dàn ý đi từ tổng quát đến chi tiết, theo thứ tự thời gian.",
    },
    {
      id: "nv3-dong-thoi-gian", name: "Ghép mốc trên sơ đồ dòng thời gian ⏳", type: "matching",
      goal: "Nắm nội dung sơ đồ dòng thời gian Lược sử công cụ tính toán (Hình 8.6).",
      time: 180,
      task: "Ghép mỗi mốc năm với nhân vật / chiếc máy và thế hệ tương ứng trên Hình 8.6. Làm hết rồi bấm Nộp bài.",
      sgkImage: "assets/sgk/hinh-8-6.jpg",
      pairs: [
        { left: "1642", right: "Blaise Pascal — máy tính cơ học đầu tiên" },
        { left: "1833", right: "Charles Babbage — máy tính đa năng" },
        { left: "1945", right: "ENIAC — máy tính điện tử thế hệ thứ nhất" },
        { left: "1959", right: "IBM 7090 — máy tính điện tử thế hệ thứ hai" },
        { left: "1964", right: "IBM System/360 — máy tính điện tử thế hệ thứ ba" },
        { left: "1973", right: "Máy vi tính Micral — máy tính điện tử thế hệ thứ tư" },
        { left: "2007", right: "iPhone — máy tính điện tử thế hệ thứ năm" },
      ],
      explanation: "Hình 8.6: 1642 Pascal · 1833 Babbage · 1945 ENIAC (thế hệ 1: 1945–1955) · 1959 IBM 7090 (thế hệ 2: 1955–1965) · 1964 IBM System/360 (thế hệ 3: 1965–1974) · 1973 Micral (thế hệ 4: 1974–1990) · 2007 iPhone (thế hệ 5: 1990–nay).",
    },
    {
      id: "nv3-chon-truc-quan", name: "Chọn công cụ trực quan hợp lí cho từng trang chiếu 🎯", type: "matching",
      goal: "Sử dụng hình ảnh, sơ đồ, biểu đồ, video hợp lí với nội dung trang chiếu.",
      time: 150,
      task: "Ghép mỗi trang chiếu của bài LuocSuMayTinh với công cụ trực quan phù hợp nhất. Làm hết rồi bấm Nộp bài.",
      pairs: [
        { left: "Trang tiêu đề", right: "Tiêu đề lớn “Lược sử công cụ tính toán”, ít chữ" },
        { left: "Trang dàn ý", right: "Danh sách 5 mục đánh số như Hình 8.5" },
        { left: "Trang dòng thời gian", right: "Sơ đồ dòng thời gian (dùng mẫu có sẵn)" },
        { left: "Trang Blaise Pascal", right: "Hình ảnh máy tính Pascaline" },
        { left: "Trang Charles Babbage", right: "Video minh hoạ đã chuẩn bị" },
        { left: "Trang chi phí triển lãm (từ KinhPhi.xlsx)", right: "Biểu đồ so sánh các khoản chi" },
      ],
      explanation: "Sử dụng đúng công cụ trực quan: tiến trình lịch sử → sơ đồ dòng thời gian; hình dáng chiếc máy → hình ảnh; câu chuyện, hoạt động → video; so sánh số liệu → biểu đồ; dàn ý → danh sách ngắn gọn.",
    },
    {
      id: "nv3-trinh-chieu", name: "Thực hành Nhiệm vụ 3: Bài trình chiếu LuocSuMayTinh 📽️", type: "knowledge",
      goal: "Tạo bài trình chiếu có sử dụng hình ảnh, sơ đồ, video hợp lí.",
      time: 1200,
      task: "Nhóm dùng phần mềm trình chiếu tạo bài LuocSuMayTinh theo 5 bước SGK: trang tiêu đề, trang dàn ý, sơ đồ dòng thời gian, trang Blaise Pascal có ảnh Pascaline, trang Charles Babbage có video; lưu với tên LuocSuMayTinh.",
      sgkImage: "assets/sgk/sgk-trang33.jpg",
      links: SLIDE_TOOLS,
      content: {
        heading: "📽️ Nhiệm vụ 3: Tạo bài trình chiếu có sử dụng hình ảnh, sơ đồ, video hợp lí",
        prompt: "Yêu cầu (SGK tr.32): Tạo bài trình chiếu chủ đề Lược sử công cụ tính toán có sử dụng hình ảnh, sơ đồ, video hợp lí.",
        revealLabel: "🎬 Xem kịch bản bài trình chiếu & các bước",
        blocks: [
          { kind: "html", value: STORY_HTML },
          { kind: "list", value: [
            "Khởi động phần mềm trình chiếu → tạo trang tiêu đề, nhập tiêu đề Lược sử công cụ tính toán.",
            "Tạo trang dàn ý, nhập nội dung theo mẫu ở Hình 8.5.",
            "Sử dụng mẫu có sẵn (tìm trên Internet hoặc giáo viên cung cấp) để tạo sơ đồ dòng thời gian tương tự Hình 8.6.",
            "Tạo trang chiếu về Blaise Pascal và máy tính cơ học đầu tiên, chèn hình ảnh minh hoạ máy tính Pascaline.",
            "Tạo trang chiếu về Charles Babbage và máy tính đa năng: chọn Insert, chọn Video/Insert Video from This Device để chèn video minh hoạ đã chuẩn bị.",
            "Lưu bài trình chiếu với tên LuocSuMayTinh.",
          ] },
          { kind: "image", value: "assets/sgk/hinh-8-5.jpg", caption: "Hình 8.5. Nội dung trang dàn ý" },
          { kind: "image", value: "assets/sgk/hinh-8-6.jpg", caption: "Hình 8.6. Sơ đồ dòng thời gian Lược sử công cụ tính toán" },
        ],
      },
      questions: [
        { question: "Để chèn video minh hoạ đã chuẩn bị (lưu trong máy) vào trang chiếu về Charles Babbage, em chọn:", type: "multiple-choice",
          options: ["Design → Themes", "Insert → Pictures", "Insert → Video → Insert Video from This Device", "Slide Show → From Beginning"],
          answer: 2, explanation: "SGK: nháy chuột chọn Insert, chọn Video/Insert Video from This Device để chèn video đã chuẩn bị vào trang chiếu.", level: "nhan-biet", activity: "nv3-trinh-chieu" },
        { question: "Để tạo sơ đồ dòng thời gian như Hình 8.6 nhanh và đẹp, SGK hướng dẫn cách nào?", type: "multiple-choice",
          options: ["Sử dụng mẫu có sẵn (tìm trên Internet hoặc giáo viên cung cấp)", "Gõ một đoạn văn dài liệt kê các năm", "Chụp ảnh trang SGK rồi dán vào", "Không cần sơ đồ, chỉ cần ảnh"],
          answer: 0, explanation: "Dùng mẫu sơ đồ dòng thời gian có sẵn rồi thay nội dung — nhanh, đẹp và đúng công cụ trực quan cho tiến trình lịch sử.", level: "thong-hieu", activity: "nv3-trinh-chieu" },
        { question: "Video chèn vào bài trình chiếu càng dài càng tốt và nên chèn nhiều video trên cùng một trang chiếu.", type: "true-false", answer: false,
          explanation: "Sai. Sử dụng video hợp lí: ngắn gọn, đúng nội dung trang chiếu; quá nhiều video làm rối và mất thời gian trình bày.", level: "thong-hieu", activity: "nv3-trinh-chieu" },
        { question: "Trang chiếu “Blaise Pascal và máy tính cơ học đầu tiên” nào dưới đây sử dụng hình ảnh hợp lí nhất?", type: "multiple-choice",
          options: ["10 ảnh nhỏ đủ loại máy tính xếp kín trang", "Ảnh Pascaline mờ, phóng to che mất chữ", "Ảnh Pascaline sắc nét đặt cạnh 3–4 ý ngắn gọn", "Chỉ có một đoạn văn dài, không có ảnh"],
          answer: 2, explanation: "Hình ảnh hợp lí: đúng nội dung, sắc nét, bố cục cân đối với vài ý chính ngắn gọn — người xem nhìn từ xa vẫn rõ.", level: "van-dung", activity: "nv3-trinh-chieu" },
        { question: "Bài trình chiếu ở Nhiệm vụ 3 được lưu với tên nào?", type: "multiple-choice",
          options: ["LuocSu.emm", "LuocSuMayTinh", "KinhPhi", "TrienLam"],
          answer: 1, explanation: "SGK: lưu bài trình chiếu với tên là LuocSuMayTinh (LuocSu.emm là tệp sơ đồ tư duy ở Nhiệm vụ 1).", level: "nhan-biet", activity: "nv3-trinh-chieu" },
      ],
      remember: [
        "Khi trình bày bằng slide, cần chú ý ngắn gọn – trực quan – hài hoà.",
        "Việc chèn hình, biểu đồ, video giúp nội dung dễ hiểu, thu hút.",
      ],
    },

    /* ===================== HĐ3.4: LUYỆN TẬP (15 phút) ===================== */
    {
      id: "luyen-tap", name: "Luyện tập — Rà soát bài trình chiếu LuocSuMayTinh 🔧", type: "checklist",
      goal: "Trình bày, rà soát nội dung bài trình chiếu theo yêu cầu Nhiệm vụ 3 và chỉnh sửa theo kết quả thảo luận.",
      time: 900,
      task: "(a) Trưởng nhóm trình bày bài trình chiếu trước tập thể theo một cách ở Bài 7; (b) cả nhóm rà soát từng tiêu chí, tick Đạt / Cần chỉnh sửa, ghi điểm cần sửa rồi gửi cho thầy/cô; (c) chỉnh sửa bài trình chiếu.",
      sgkImage: "assets/sgk/sgk-trang33.jpg",
      links: SLIDE_TOOLS,
      columns: ["✅ Đạt", "🔧 Cần chỉnh sửa"],
      sections: [
        { title: "📑 NỘI DUNG THEO YÊU CẦU NHIỆM VỤ 3", items: [
          "Trang tiêu đề ghi “Lược sử công cụ tính toán”",
          "Trang dàn ý có đủ 5 mục như Hình 8.5",
          "Có sơ đồ dòng thời gian lược sử công cụ tính toán",
          "Trang Blaise Pascal có hình ảnh máy tính Pascaline",
          "Trang Charles Babbage có video minh hoạ",
          "Bài trình chiếu được lưu với tên LuocSuMayTinh",
        ] },
        { title: "🎨 SỬ DỤNG CÔNG CỤ TRỰC QUAN HỢP LÍ", items: [
          "Chữ đủ lớn, ít chữ, ngồi cuối lớp vẫn đọc rõ",
          "Hình ảnh sắc nét, đúng nội dung trang chiếu",
          "Video ngắn gọn, phát được, đúng nội dung",
          "Màu chữ tương phản với nền, bố cục cân đối",
        ] },
      ],
      note: "Nhóm đã chọn cách nào ở Bài 7 để trưởng nhóm trình bày trước tập thể? Sau thảo luận, nhóm cần chỉnh sửa những điểm nào?",
      modelAnswer: [
        "Cách trình bày: trình bày trực tiếp trước lớp (hoặc chia sẻ để các nhóm khác xem trước).",
        "Nội dung: đủ các trang theo Nhiệm vụ 3 (tiêu đề, dàn ý, dòng thời gian, Pascal có ảnh, Babbage có video), lưu đúng tên LuocSuMayTinh.",
        "Điểm thường cần sửa: chữ nhỏ hoặc quá nhiều chữ; ảnh mờ; video dài hoặc không phát được; màu chữ khó đọc trên nền.",
        "➜ Luyện tập chỉnh sửa giúp sản phẩm hoàn thiện hơn; làm việc nhóm qua công cụ số giúp tăng hiệu quả hợp tác.",
      ],
      remember: ["Luyện tập chỉnh sửa giúp sản phẩm hoàn thiện hơn.", "Làm việc nhóm qua công cụ số giúp tăng hiệu quả hợp tác."],
    },
    {
      id: "tro-choi", name: "Trò chơi: Đưa robot về Bảo tàng máy tính 🤖", type: "penguin",
      pet: "🤖", homeIcon: "🏛️", enemy: "🐛", saveWord: "chú robot về Bảo tàng máy tính",
      winText: "Cả đội robot đã về Bảo tàng máy tính — Triển lãm tin học sẵn sàng!",
      goal: "Củng cố toàn bài: đính kèm tệp, đường liên kết, trình bày sơ đồ tư duy, bài trình chiếu hợp lí.",
      time: 300,
      task: "Trả lời đúng mỗi câu để đưa một chú robot về Bảo tàng máy tính trước khi con bọ lỗi đuổi kịp!",
      intro: "Mỗi câu đúng: một chú robot 🤖 về Bảo tàng máy tính 🏛️. Sai thì con bọ lỗi 🐛 đuổi theo!",
      questions: [
        { question: "Muốn đính kèm tệp KinhPhi.xlsx vào nhánh “Dự kiến thu chi” trong MindMaple Lite, sau khi chọn nhánh em chọn:", type: "multiple-choice",
          options: ["Insert/Attachment/Attachment", "Insert/Hyperlink", "Home/Topic", "File/Print"],
          answer: 0, explanation: "Đính kèm tệp: Insert/Attachment/Attachment → chọn tệp → Open.", level: "nhan-biet", activity: "tro-choi" },
        { question: "Đường liên kết đến video trên Internet được dán vào ô nào của hộp thoại Hyperlink?", type: "multiple-choice",
          options: ["Topic / Label:", "Link to:", "File name:", "Search"],
          answer: 1, explanation: "Sao chép đường liên kết vào ô Link to: rồi chọn OK.", level: "nhan-biet", activity: "tro-choi" },
        { question: "Tệp sơ đồ tư duy ở Nhiệm vụ 1 được lưu với tên nào?", type: "multiple-choice",
          options: ["LuocSuMayTinh", "KinhPhi.xlsx", "LuocSu.emm", "Pascaline.png"],
          answer: 2, explanation: "SGK: lưu tệp với tên LuocSu.emm (.emm là tệp của MindMaple).", level: "nhan-biet", activity: "tro-choi" },
        { question: "Theo Hình 8.6, máy tính cơ học đầu tiên của Blaise Pascal ra đời năm nào?", type: "multiple-choice",
          options: ["1833", "1945", "1973", "1642"],
          answer: 3, explanation: "Mốc 1642: Blaise Pascal — máy tính cơ học đầu tiên.", level: "nhan-biet", activity: "tro-choi" },
        { question: "Nội dung nào phù hợp nhất để trình bày bằng sơ đồ dòng thời gian?", type: "multiple-choice",
          options: ["Các mốc lịch sử của công cụ tính toán", "Tỉ lệ phần trăm các khoản chi", "Hình dáng máy Pascaline", "Tiểu sử một nhà khoa học"],
          answer: 0, explanation: "Tiến trình lịch sử (các mốc nối tiếp nhau) → sơ đồ dòng thời gian.", level: "thong-hieu", activity: "tro-choi" },
        { question: "Khi trưởng nhóm trình bày sơ đồ tư duy (Nhiệm vụ 2), các thành viên còn lại nên làm gì?", type: "multiple-choice",
          options: ["Làm việc riêng chờ đến lượt", "Lắng nghe, trao đổi, bổ sung nội dung và nhận phân công", "Sửa sơ đồ khi trưởng nhóm đang trình bày mà không báo", "Chỉ cần vỗ tay"],
          answer: 1, explanation: "Nhiệm vụ 2: trao đổi, thảo luận để bổ sung nội dung và phân công công việc cho các thành viên.", level: "thong-hieu", activity: "tro-choi" },
        { question: "Nhóm có tệp Babbage.mp4 lưu trong máy và một video trên YouTube. Cách gắn cả hai vào nhánh “1833 Charles Babbage” đúng là:", type: "multiple-choice",
          options: ["Cả hai dùng Insert/Hyperlink", "Cả hai dùng Insert/Attachment", "Chép nội dung video thành văn bản", "Tệp .mp4 dùng Insert/Attachment, video YouTube dùng Insert/Hyperlink"],
          answer: 3, explanation: "Tệp trong máy → Attachment; tài nguyên trên Internet → Hyperlink.", level: "van-dung-cao", activity: "tro-choi" },
        { question: "Máy tính điện tử thế hệ thứ nhất được nêu trong Hình 8.6 là:", type: "multiple-choice",
          options: ["IBM System/360", "ENIAC", "iPhone", "Máy vi tính Micral"],
          answer: 1, explanation: "ENIAC (1945) — máy tính điện tử thế hệ thứ nhất (1945 – 1955).", level: "nhan-biet", activity: "tro-choi" },
      ],
    },

    /* ===================== HĐ4: VẬN DỤNG (10 phút) ===================== */
    {
      id: "van-dung-the-he", name: "Chuẩn bị Vận dụng: Ôn các thế hệ máy tính điện tử 💻", type: "matching",
      goal: "Nhớ lại đặc điểm (linh kiện chính) của máy tính từng thế hệ để bổ sung vào bài trình chiếu.",
      time: 150,
      task: "Ôn lại kiến thức Tin học 8: ghép mỗi thế hệ máy tính điện tử với linh kiện chính của nó. Làm hết rồi bấm Nộp bài.",
      sgkImage: "assets/sgk/hinh-8-6.jpg",
      pairs: [
        { left: "Thế hệ thứ nhất (1945 – 1955) · ENIAC", right: "Đèn điện tử chân không" },
        { left: "Thế hệ thứ hai (1955 – 1965) · IBM 7090", right: "Bóng bán dẫn (transistor)" },
        { left: "Thế hệ thứ ba (1965 – 1974) · IBM System/360", right: "Mạch tích hợp (IC)" },
        { left: "Thế hệ thứ tư (1974 – 1990) · Micral", right: "Mạch tích hợp cỡ rất lớn (VLSI), bộ vi xử lí" },
        { left: "Thế hệ thứ năm (1990 – nay) · iPhone", right: "Bộ xử lí nhiều lõi, xử lí song song, trí tuệ nhân tạo" },
      ],
      explanation: "Máy tính điện tử phát triển theo linh kiện chính: đèn điện tử chân không → bóng bán dẫn → mạch tích hợp → mạch tích hợp cỡ rất lớn, bộ vi xử lí → bộ xử lí nhiều lõi, trí tuệ nhân tạo. Máy ngày càng nhỏ gọn, nhanh và rẻ hơn.",
    },
    {
      id: "van-dung", name: "Vận dụng — Hoàn chỉnh sản phẩm cho Triển lãm tin học 🏛️", type: "vandung",
      goal: "Bổ sung nội dung bằng công cụ trực quan hợp lí và chia sẻ để cùng hoàn chỉnh sản phẩm.",
      time: 600,
      task: "Nhóm thảo luận, gửi câu trả lời cho thầy/cô; hoàn thiện bài trình chiếu ở nhà và chia sẻ lên lớp học trực tuyến.",
      sgkImage: "assets/sgk/sgk-trang33.jpg",
      links: SLIDE_TOOLS,
      intro: "Thảo luận, gửi câu trả lời cho thầy/cô rồi bấm để xem hướng chốt.",
      cases: [
        { question: "Vận dụng (SGK tr.33): Bổ sung vào bài trình chiếu LuocSuMayTinh nội dung về đặc điểm của máy tính từng thế hệ. Nhóm em dùng công cụ trực quan nào cho phần này? Vì sao?",
          answer: "Gợi ý: một bảng so sánh 5 thế hệ (thời gian, linh kiện chính, máy tiêu biểu) kèm ảnh nhỏ của máy tiêu biểu; hoặc mỗi thế hệ một trang có ảnh sắc nét và 2–3 ý ngắn; có thể nối tiếp sơ đồ dòng thời gian. Lí do: dễ so sánh, ít chữ, trực quan, xem được từ xa." },
        { question: "Nhóm phân công bạn nào chia sẻ bài trình chiếu, và chia sẻ theo cách nào (Bài 7) để các bạn cùng hoàn chỉnh sản phẩm cho Triển lãm tin học?",
          answer: "Ví dụ: Minh tải bài lên OneDrive/Google Drive, chia sẻ quyền chỉnh sửa để các bạn chủ động cập nhật phần mình phụ trách hoặc cộng tác theo thời gian thực; mở kênh hội thoại (nhóm Zalo lớp) để trao đổi trong quá trình hoàn thiện." },
        { question: "Mở rộng (theo giáo án): Chọn một chủ đề gần gũi — giới thiệu câu lạc bộ của lớp, kế hoạch học tập tuần, “An toàn thông tin trên mạng” hoặc “Bảo vệ môi trường học đường”. Nêu dàn ý sản phẩm số (sơ đồ tư duy hoặc bài trình chiếu) em sẽ làm và công cụ trực quan em dùng.",
          answer: "Ví dụ “An toàn thông tin trên mạng”: trang tiêu đề → dàn ý → biểu đồ số vụ lừa đảo trực tuyến (ví dụ minh hoạ) → hình ảnh dấu hiệu tin nhắn lừa đảo → video ngắn hướng dẫn đặt mật khẩu mạnh → lời khuyên. Đăng sản phẩm lên Padlet/Google Drive lớp và góp ý ít nhất 1 sản phẩm của bạn." },
      ],
    },

    /* ===================== TỔNG KẾT ===================== */
    {
      id: "tong-ket", name: "Tổng kết", type: "summary",
      task: "Cả lớp nhắc lại kiến thức trọng tâm và làm thử thách cuối. Dặn dò: hoàn thiện sản phẩm, đăng lên lớp học trực tuyến để thầy/cô đánh giá.",
      content: {
        learned: [
          "Đính kèm tệp văn bản, hình ảnh, trang tính vào sơ đồ tư duy: chọn nhánh → Insert/Attachment/Attachment → chọn tệp → Open.",
          "Đính kèm đường liên kết video: chọn nhánh → Insert/Hyperlink → dán vào ô Link to: → OK.",
          "Trình bày sơ đồ tư duy trước nhóm để trao đổi, bổ sung nội dung, phân công công việc.",
          "Bài trình chiếu dùng hình ảnh, sơ đồ dòng thời gian, video hợp lí; chèn video: Insert → Video → Insert Video from This Device.",
          "Rà soát, chỉnh sửa sản phẩm theo góp ý và chia sẻ để cùng hoàn chỉnh.",
        ],
        challenge: [
          { question: "Sau khi trình bày, bạn góp ý: “Chữ trên trang dòng thời gian quá nhỏ, ngồi cuối lớp không đọc được”. Nhóm nên làm gì?", type: "multiple-choice",
            options: ["Giữ nguyên vì đã đủ nội dung", "Thêm nhiều chữ để giải thích rõ hơn", "Đổi chữ sang màu nhạt cho đẹp", "Tăng cỡ chữ, rút gọn nội dung — chỉnh sửa theo góp ý"],
            answer: 3, explanation: "Đảm bảo chất lượng dữ liệu: xem được từ khoảng cách xa. Luyện tập chỉnh sửa theo góp ý giúp sản phẩm hoàn thiện hơn.",
            level: "van-dung", activity: "tong-ket" },
          { question: "Vì sao nhóm An đính kèm tệp CharlesBabbage.docx và đường liên kết video vào nhánh “1833 Charles Babbage” mà không chép toàn bộ nội dung lên sơ đồ?", type: "multiple-choice",
            options: ["Sơ đồ vẫn gọn gàng trong một trang; ai cần chi tiết thì mở tệp, xem video — thông tin vừa đầy đủ vừa trực quan", "Vì sơ đồ tư duy không cho gõ chữ", "Vì tệp đính kèm thay thế người trình bày", "Vì như vậy sơ đồ có nhiều nhánh hơn"],
            answer: 0, explanation: "Đính kèm dữ liệu giúp sơ đồ gọn, dễ theo dõi mà vẫn cung cấp chi tiết khi cần — hỗ trợ trao đổi và hợp tác hiệu quả.",
            level: "van-dung-cao", activity: "tong-ket" },
        ],
      },
    },
  ],
};

if (typeof module !== "undefined" && module.exports) module.exports = LESSON;
if (typeof window !== "undefined") window.LESSON = LESSON;
