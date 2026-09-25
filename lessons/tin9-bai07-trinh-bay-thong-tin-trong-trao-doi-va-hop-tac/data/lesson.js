/* ============================================================================
 * BÀI 7 — TRÌNH BÀY THÔNG TIN TRONG TRAO ĐỔI VÀ HỢP TÁC  (Tin học 9 — Kết nối tri thức)
 * Chủ đề 4: Ứng dụng tin học.
 * Bám sát SGK trang 27–29 + Kế hoạch bài dạy (1 tiết) của giáo viên.
 * Chỉ sửa file này để đổi nội dung. Engine app.js không cần sửa.
 * ==========================================================================*/

// ---- Mở đầu: cùng một nội dung, hai cách trình bày (số liệu là VÍ DỤ MINH HOẠ) ----
const VOTES = [["🎮", "Trò chơi lập trình trực quan", 15, "#f97316"], ["⏳", "Lược sử công cụ tính toán", 12, "#0ea5e9"], ["📸", "Bộ ảnh CLB Tin học", 8, "#16a34a"], ["📒", "Sổ lưu niệm của lớp", 5, "#a855f7"]];
const COMPARE_HTML = `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:16px;align-items:stretch">
  <div style="background:#f8fafc;border:2px solid #cbd5e1;border-radius:16px;padding:14px 18px">
    <div style="font-weight:800;color:#475569;margin-bottom:6px">Cách 1 — Văn bản thuần tuý</div>
    <p style="margin:0;font-size:.95rem;line-height:1.55;color:#334155;text-align:justify">Kết quả bình chọn sản phẩm tham gia Triển lãm tin học của lớp 9A như sau: trong tổng số 40 bạn tham gia bình chọn, có 5 bạn chọn sổ lưu niệm của lớp đã làm từ lớp 6, có 8 bạn chọn bộ sưu tập hình ảnh về CLB Tin học được thành lập từ lớp 8, có 15 bạn chọn sản phẩm là một số trò chơi bằng ngôn ngữ lập trình trực quan, còn lại 12 bạn chọn bài trình bày về nội dung Lược sử công cụ tính toán.</p></div>
  <div style="background:#fff;border:2px solid #fdba74;border-radius:16px;overflow:hidden;box-shadow:0 6px 16px rgba(234,88,12,.15)">
    <div style="background:linear-gradient(90deg,#ea580c,#f59e0b);color:#fff;padding:10px 16px;font-weight:800;font-size:1.25rem">🏆 Lớp 9A chọn gì cho Triển lãm tin học?</div>
    <div style="padding:12px 16px">${VOTES.map(([i, t, n, c]) => `<div style="display:grid;grid-template-columns:34px minmax(0,1fr) 2fr 34px;gap:8px;align-items:center;margin:8px 0;font-size:1.05rem"><span style="font-size:1.5rem">${i}</span><span style="font-weight:700">${t}</span><span style="background:#f1f5f9;border-radius:8px;height:22px;overflow:hidden"><i style="display:block;height:100%;width:${n / 15 * 100}%;background:${c};border-radius:8px"></i></span><b>${n}</b></div>`).join("")}
    <div style="text-align:right;color:#64748b;font-size:.9rem">40 bạn bình chọn · ví dụ minh hoạ</div></div></div></div>`;

// ---- Bốn cách sử dụng sơ đồ tư duy / bài trình chiếu (SGK tr.27–28) ----
const WAYS_HTML = `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px">
  ${[["🎤", "Trình bày trực tiếp", "Diễn giải bức tranh toàn cảnh, làm rõ chi tiết, trả lời ngay câu hỏi người nghe — cách dễ nhất để cộng tác.", "#fff7ed", "#f97316"],
    ["👀", "Chia sẻ để các thành viên xem", "Khi không trình bày trực tiếp được. Dùng hình ảnh, biểu đồ, video hợp lí; sơ đồ trình bày trong một trang, đính kèm tệp để trình bày chi tiết.", "#eff6ff", "#0ea5e9"],
    ["✍️", "Chia sẻ để chủ động cập nhật", "Tạo sản phẩm trực tuyến; mỗi thành viên tự chỉnh sửa theo thời gian phù hợp với mình.", "#f0fdf4", "#16a34a"],
    ["⚡", "Cộng tác theo thời gian thực", "Tất cả cùng chỉnh sửa sản phẩm trực tuyến; nên mở một kênh hội thoại 💬 để trao đổi.", "#faf5ff", "#a855f7"]]
    .map(([i, t, d, bg, bd]) => `<div style="background:${bg};border:2px solid ${bd};border-radius:16px;padding:12px 14px"><div style="font-size:2rem">${i}</div><b style="font-size:1.15rem">${t}</b><div style="margin-top:4px;font-size:1rem;line-height:1.45">${d}</div></div>`).join("")}</div>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:12px;margin-top:12px">
    <div style="background:#fefce8;border-left:6px solid #ca8a04;border-radius:12px;padding:10px 14px"><b>🎯 Sử dụng đúng công cụ trực quan</b><br>Đơn giản, rõ ràng; chọn loại minh hoạ truyền tải thông điệp tốt nhất. Ví dụ: tiến trình lịch sử → sơ đồ dòng thời gian.</div>
    <div style="background:#fefce8;border-left:6px solid #ca8a04;border-radius:12px;padding:10px 14px"><b>🔍 Đảm bảo chất lượng dữ liệu</b><br>Xem được từ khoảng cách xa; hình ảnh sắc nét, bố cục hợp lí; dùng màu sắc để tăng sự chú ý.</div></div>`;

// ---- Hai trang chiếu: Slide A (mắc lỗi) và Slide B (đạt yêu cầu) ----
const SLIDES_HTML = `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:16px">
  <div><div style="font-weight:800;margin-bottom:4px">Slide A</div>
    <div style="aspect-ratio:16/9;background:#fff;border:2px solid #cbd5e1;border-radius:12px;padding:10px 12px;overflow:hidden;position:relative">
      <div style="font-size:.7rem;color:#fcd34d;font-weight:700">Lược sử công cụ tính toán</div>
      <p style="font-size:.55rem;line-height:1.3;color:#fde68a;margin:4px 0">Năm 1642 Blaise Pascal chế tạo máy tính cơ học quay tay Pascaline có thể cộng trừ các số bằng các bánh răng, năm 1833 Charles Babbage đưa ra dự án máy tính tự động đa năng Analytical Engine, sau đó là thời kì máy tính điện tử với rất nhiều thế hệ máy tính khác nhau được phát triển và ứng dụng rộng rãi trong đời sống…</p>
      <div style="font-size:3rem;filter:blur(4px);position:absolute;right:14px;bottom:6px">🧮</div>
      <div style="position:absolute;left:12px;bottom:10px;display:flex;gap:2px;align-items:flex-end;height:22px"><i style="width:5px;height:8px;background:#fde68a"></i><i style="width:5px;height:14px;background:#fef3c7"></i><i style="width:5px;height:20px;background:#fde68a"></i></div></div></div>
  <div><div style="font-weight:800;margin-bottom:4px">Slide B</div>
    <div style="aspect-ratio:16/9;background:#fff;border:2px solid #fdba74;border-radius:12px;overflow:hidden;display:flex;flex-direction:column">
      <div style="background:#ea580c;color:#fff;font-weight:800;font-size:1.2rem;padding:6px 12px">⏳ Lược sử công cụ tính toán</div>
      <div style="flex:1;display:flex;align-items:center;justify-content:space-around;padding:6px 10px;font-size:1rem;color:#1f2937">
        <div style="text-align:center"><div style="font-size:2.2rem">⚙️</div><b>1642</b><br>Pascaline</div><div style="font-size:1.6rem;color:#f97316">➜</div>
        <div style="text-align:center"><div style="font-size:2.2rem">🏭</div><b>1833</b><br>Analytical Engine</div><div style="font-size:1.6rem;color:#f97316">➜</div>
        <div style="text-align:center"><div style="font-size:2.2rem">💻</div><b>Máy tính</b><br>điện tử</div></div></div></div></div>`;

// ---- Hình 7.1: ảnh minh hoạ máy Pascaline + trang tính "Dự kiến thu chi" (ví dụ minh hoạ) ----
const PASCALINE_SVG = `<svg viewBox="0 0 420 200" style="width:100%;max-height:52vh" xmlns="http://www.w3.org/2000/svg">
  <rect x="20" y="40" width="380" height="130" rx="14" fill="#a16207" stroke="#713f12" stroke-width="4"/>
  <rect x="34" y="52" width="352" height="30" rx="6" fill="#fef3c7" stroke="#713f12" stroke-width="2"/>
  ${[0, 1, 2, 3, 4, 5].map((i) => `<rect x="${48 + i * 56}" y="57" width="26" height="20" rx="3" fill="#fff" stroke="#92400e"/><text x="${61 + i * 56}" y="72" font-size="14" text-anchor="middle" font-family="Georgia" fill="#111">${[0, 0, 1, 6, 4, 2][i]}</text>
  <circle cx="${61 + i * 56}" cy="125" r="22" fill="#fde68a" stroke="#713f12" stroke-width="3"/>${Array.from({ length: 10 }, (_, k) => { const t = k * 36 * Math.PI / 180; return `<circle cx="${(61 + i * 56 + 16 * Math.cos(t)).toFixed(1)}" cy="${(125 + 16 * Math.sin(t)).toFixed(1)}" r="2.2" fill="#713f12"/>`; }).join("")}<circle cx="${61 + i * 56}" cy="125" r="4" fill="#713f12"/>`).join("")}
  <text x="210" y="195" font-size="14" text-anchor="middle" fill="#475569" font-family="Segoe UI,Arial">Hình vẽ minh hoạ máy Pascaline — quay các bánh xe số để cộng, trừ</text></svg>`;
const THU_CHI = { title: "Du_kien_thu_chi.xlsx", cols: 3, rows: 9, widths: { A: 2.6, B: 1.2, C: 1.2 },
  cells: { A1: "DỰ KIẾN THU CHI — GIAN TRƯNG BÀY", A3: "Khoản", B3: "Thu (đồng)", C3: "Chi (đồng)",
    A4: "Quỹ lớp hỗ trợ", B4: "500000", A5: "In ảnh, áp phích", C5: "150000", A6: "Làm mô hình Pascaline bằng bìa", C6: "120000",
    A7: "Trang trí gian trưng bày", C7: "180000", A8: "Tổng", B8: "=SUM(B4:B7)", C8: "=SUM(C4:C7)", A9: "Còn lại", B9: "=B8-C8" },
  bold: ["A1", "A3:C3", "A8:C9"], fill: { "A3:C3": "#fed7aa", "A8:C9": "#fef3c7" }, center: ["A3:C3"] };

const MM_7_1 = {
  text: "Triển lãm\ntin học",
  children: [
    { text: "Sản phẩm công nghệ số" },
    { text: "Lược sử\ncông cụ tính toán", children: [
      { text: "Máy tính cơ học", children: [
        { text: "1642\nBlaise Pascal\nMáy tính cơ học quay tay\nPascaline", box: true,
          files: [{ kind: "img", name: "Ảnh Pascaline", html: PASCALINE_SVG, note: "Máy Pascaline do Blaise Pascal chế tạo năm 1642: quay các bánh xe số để thực hiện phép cộng, trừ." }] },
        { text: "1833\nCharles Babbage\nDự án máy tính tự động đa năng\nAnalytical Engine", box: true,
          files: [
            { kind: "link", name: "Video giới thiệu dự án", note: "Liên kết đến một video trên Internet giới thiệu dự án Analytical Engine — bấm vào là mở trình duyệt để xem, sơ đồ không bị nặng thêm." },
            { kind: "doc", name: "Tiểu sử của Babbage", note: "Charles Babbage (1791–1871) là nhà toán học người Anh.\nÔng thiết kế Máy vi phân (Difference Engine) và đưa ra dự án Máy phân tích (Analytical Engine) — một cỗ máy tính toán tự động đa năng.\nÝ tưởng của ông được xem là tiền thân của máy tính hiện đại, vì vậy ông thường được gọi là “cha đẻ của máy tính”.\n(Văn bản minh hoạ cho tệp đính kèm)" },
          ] },
      ] },
      { text: "Máy tính điện tử" },
    ] },
    { text: "Dự kiến thu chi", files: [{ kind: "sheet", name: "Bảng tính dự kiến thu chi", sheet: THU_CHI, note: "Số liệu ví dụ minh hoạ. Trang tính tự tính tổng thu, tổng chi và số tiền còn lại." }] },
  ],
};

// ---- Thực hành (giáo án HĐ2.2): sơ đồ tư duy “Bảo vệ môi trường học đường” ----
const MM_BVMT = { text: "Bảo vệ môi trường\nhọc đường", children: [{ text: "Trồng cây" }, { text: "Phân loại rác" }, { text: "Tiết kiệm điện" }] };
const MM_TRIEN_LAM = { text: "Triển lãm tin học\n(nội dung của nhóm em)", children: [{ text: "Nội dung 1" }, { text: "Nội dung 2" }, { text: "Dự kiến thu chi" }] };
const TOOLS = [
  { label: "Canva — sơ đồ tư duy, bài trình chiếu", url: "https://www.canva.com/" },
  { label: "Coggle — sơ đồ tư duy trực tuyến", url: "https://coggle.it/", note: "(mở tab mới, cần Internet và tài khoản)" },
];

const LESSON = {
  meta: {
    subject: "Tin học", grade: "9", book: "Kết nối tri thức với cuộc sống",
    title: "Bài 7: Trình bày thông tin trong trao đổi và hợp tác", unit: "Chủ đề 4 — Ứng dụng tin học",
    pages: "27–29", durationMinutes: 45,
  },
  objectives: {
    knowledge: [
      "Sử dụng được bài trình chiếu và sơ đồ tư duy trong trao đổi thông tin và hợp tác.",
      "Biết được khả năng đính kèm tệp văn bản, ảnh, video, trang tính vào sơ đồ tư duy.",
      "Biết phối hợp các công cụ trực quan (ảnh, biểu đồ, video, màu sắc, bố cục) để bài trình bày rõ ràng, hấp dẫn.",
    ],
    competencies: [
      "Tự học; giao tiếp và hợp tác (nhóm 3–4 HS); giải quyết vấn đề và sáng tạo.",
      "Năng lực số 2.4.TC2a: chọn và chuyển đổi hình thức trình bày (văn bản, bảng, biểu đồ, hình ảnh) phù hợp mục đích trao đổi.",
      "Năng lực số 3.1.TC2a: dùng phần mềm trình chiếu / sơ đồ tư duy số, chèn nội dung và chia sẻ sản phẩm để hợp tác.",
      "Năng lực số 3.2.TC2a: điều chỉnh màu sắc, bố cục, cỡ chữ; cải thiện sản phẩm theo góp ý.",
      "Năng lực AI 9.A3.1: hợp tác hiệu quả với con người và AI; đánh giá, kiểm chứng nội dung AI gợi ý trước khi dùng.",
    ],
    qualities: ["Chăm chỉ, trách nhiệm khi hợp tác; trung thực (ghi nguồn tư liệu); sáng tạo trong trình bày."],
  },
  coreKnowledge: [
    "Sơ đồ tư duy và bài trình chiếu là công cụ giúp trình bày thông tin hiệu quả trong trao đổi và hợp tác.",
    "Bốn cách sử dụng: trình bày trực tiếp; chia sẻ để các thành viên xem; chia sẻ để các thành viên chủ động cập nhật; chia sẻ để cộng tác theo thời gian thực.",
    "Dùng hình ảnh, biểu đồ, video hợp lí: sử dụng đúng công cụ trực quan và đảm bảo chất lượng dữ liệu (xem được từ xa, sắc nét, bố cục hợp lí, màu sắc làm nổi bật).",
    "Có thể đính kèm tệp văn bản, hình ảnh, video, trang tính vào sơ đồ tư duy giúp trình bày thông tin đầy đủ và hiệu quả.",
  ],
  keywords: ["Sơ đồ tư duy", "Bài trình chiếu", "Cộng tác thời gian thực", "Đính kèm tệp", "Công cụ trực quan"],
  settings: { basePoints: 100, useTimer: false, defaultTime: 60, sound: true, streakEnabled: true },

  activities: [
    /* ===================== HĐ1: MỞ ĐẦU (5 phút) ===================== */
    {
      id: "mo-dau", name: "Mở đầu — Cách trình bày nào dễ hiểu hơn? 🤔", type: "knowledge",
      goal: "Nhận ra thông tin được trình bày rõ ràng, trực quan giúp người khác dễ hiểu và dễ hợp tác hơn.",
      time: 240,
      task: "Suy nghĩ cá nhân 1 phút, rồi thảo luận cặp đôi: “Em thấy cách nào dễ hiểu, dễ nhớ hơn? Vì sao?”",
      sgkImage: "assets/sgk/sgk-trang27.jpg",
      content: {
        heading: "🤔 Cùng một nội dung — hai cách trình bày",
        prompt: "Lớp 9A bình chọn sản phẩm tham gia Triển lãm tin học. Hãy quan sát hai cách trình bày kết quả dưới đây.",
        revealLabel: "👀 Xem hai cách trình bày",
        blocks: [
          { kind: "html", value: COMPARE_HTML },
          { kind: "text", value: "Dự án Triển lãm tin học (SGK tr.27): các bạn lớp 9A tổ chức triển lãm để tổng kết chặng đường học Tin học. Nhóm An, Minh, Khoa chọn trình bày nội dung “Lược sử công cụ tính toán”. Tổ chức triển lãm cần làm việc nhóm — sơ đồ tư duy và bài trình chiếu là những công cụ hỗ trợ cộng tác." },
        ],
      },
      questions: [
        { question: "Nhìn cách 2, sản phẩm nào được lớp 9A bình chọn nhiều nhất?", type: "multiple-choice",
          options: ["Sổ lưu niệm của lớp", "Bộ ảnh CLB Tin học", "Trò chơi lập trình trực quan", "Lược sử công cụ tính toán"],
          answer: 2, explanation: "Thanh dài nhất (15 bạn) là “Trò chơi lập trình trực quan” — nhìn biểu đồ là thấy ngay, không phải đọc hết đoạn văn.",
          level: "nhan-biet", activity: "mo-dau" },
        { question: "Vì sao cách 2 giúp em nắm thông tin nhanh và nhớ lâu hơn?", type: "multiple-choice",
          options: ["Có tiêu đề rõ, biểu đồ so sánh trực quan, biểu tượng, ít chữ", "Vì cách 2 có nhiều chữ hơn", "Vì cách 2 dùng phông chữ nhỏ hơn", "Vì cách 2 không cần đọc gì cả"],
          answer: 0, explanation: "Tiêu đề + biểu đồ + biểu tượng giúp người xem so sánh ngay; cách 1 phải đọc hết và tự nhớ các con số.",
          level: "thong-hieu", activity: "mo-dau" },
      ],
      remember: ["Sử dụng hình ảnh, biểu đồ, sơ đồ hay bài trình chiếu giúp người nghe dễ hiểu và tăng hiệu quả giao tiếp, hợp tác."],
    },

    /* ===================== HĐ2.1: TRÌNH BÀY THÔNG TIN TRONG TRAO ĐỔI VÀ HỢP TÁC (10 phút) ===================== */
    {
      id: "phieu-1", name: "Phiếu học tập 1 — Sơ đồ tư duy, bài trình chiếu trong hợp tác 🤝", type: "knowledge",
      goal: "Nêu được tác dụng và các cách sử dụng sơ đồ tư duy, bài trình chiếu trong trao đổi, hợp tác.",
      time: 300,
      task: "Nhóm 4 HS nghiên cứu SGK trang 27, 28 (5 phút), trả lời các câu hỏi của Phiếu học tập 1.",
      sgkImage: "assets/sgk/sgk-trang28.jpg",
      content: {
        heading: "🤝 Trình bày thông tin trong trao đổi và hợp tác",
        prompt: "Hoạt động 1 (SGK tr.27): Có thể sử dụng sơ đồ tư duy, bài trình chiếu như thế nào cho việc trình bày nội dung “Lược sử công cụ tính toán” trong Triển lãm tin học?",
        revealLabel: "🔍 Bốn cách sử dụng & hai điều cần chú ý (SGK tr.27–28)",
        blocks: [{ kind: "html", value: WAYS_HTML }],
      },
      questions: [
        { question: "Câu 1. Sơ đồ tư duy, bài trình chiếu có tác dụng gì trong việc trình bày thông tin?", type: "multiple-choice",
          options: ["Chỉ dùng để trang trí cho đẹp", "Là công cụ giúp trình bày thông tin hiệu quả, hỗ trợ trao đổi và hợp tác", "Thay thế hoàn toàn việc làm việc nhóm", "Chỉ dùng được khi thuyết trình trực tiếp"],
          answer: 1, explanation: "SGK: Sơ đồ tư duy hay bài trình chiếu đều là những công cụ hiệu quả để trình bày thông tin, hỗ trợ trao đổi và hợp tác.",
          level: "nhan-biet", activity: "phieu-1" },
        { question: "Câu 2. Có thể sử dụng sơ đồ tư duy, bài trình chiếu trong trao đổi và hợp tác theo những cách nào? (Chọn tất cả đáp án đúng)", type: "multiple-select",
          options: ["Trình bày trực tiếp", "Chia sẻ để các thành viên khác xem", "In ra rồi cất đi, không cho ai xem", "Chia sẻ để các thành viên chủ động cập nhật", "Chia sẻ để cộng tác theo thời gian thực"],
          answer: [0, 1, 3, 4], explanation: "SGK nêu 4 cách: trình bày trực tiếp; chia sẻ để xem; chia sẻ để chủ động cập nhật; chia sẻ để cộng tác theo thời gian thực.",
          level: "nhan-biet", activity: "phieu-1" },
        { question: "Câu 3. Nhóm An muốn trình bày tiến trình lịch sử các công cụ tính toán. Công cụ trực quan nào phát huy hiệu quả nhất?", type: "multiple-choice",
          options: ["Biểu đồ hình quạt tròn", "Một đoạn văn thật dài", "Ảnh chân dung các nhà khoa học", "Sơ đồ dòng thời gian"],
          answer: 3, explanation: "Sử dụng đúng công cụ trực quan: trình bày tiến trình lịch sử thì sơ đồ dòng thời gian phát huy hiệu quả (SGK tr.28).",
          hint: "Tiến trình lịch sử = các mốc thời gian nối tiếp nhau.",
          level: "thong-hieu", activity: "phieu-1" },
        { question: "Hình ảnh trong bài trình chiếu chỉ cần đẹp, không cần sắc nét vì người xem có thể lại gần màn hình.", type: "true-false", answer: false,
          explanation: "Sai. Cần đảm bảo chất lượng dữ liệu: công cụ trực quan phải xem được từ khoảng cách xa, hình ảnh sắc nét, bố cục hợp lí.",
          level: "thong-hieu", activity: "phieu-1" },
      ],
      remember: [
        "Dùng bài trình chiếu, sơ đồ tư duy theo 4 cách: trình bày trực tiếp · chia sẻ để xem độc lập · chia sẻ để cập nhật độc lập · chia sẻ để cộng tác theo thời gian thực.",
        "Dùng hình ảnh, biểu đồ, video hợp lí: sử dụng đúng công cụ trực quan · đảm bảo chất lượng dữ liệu.",
      ],
    },
    {
      id: "bon-cach", name: "Trò chơi: Tình huống này là cách nào? 🧩", type: "dragdrop",
      goal: "Phân biệt 4 cách sử dụng sơ đồ tư duy, bài trình chiếu trong trao đổi và hợp tác.",
      time: 180,
      task: "Xếp mỗi tình huống của nhóm An, Minh, Khoa vào đúng cách sử dụng. Xếp hết rồi bấm Nộp bài.",
      groups: ["🎤 Trình bày trực tiếp", "👀 Chia sẻ để xem", "✍️ Chia sẻ để chủ động cập nhật", "⚡ Cộng tác theo thời gian thực"],
      items: [
        { text: "Minh đứng trước lớp thuyết trình bài trình chiếu và trả lời câu hỏi của các bạn", group: 0 },
        { text: "Khoa bị ốm, An gửi đường liên kết để Khoa xem trước bài trình chiếu ở nhà", group: 1 },
        { text: "Cả nhóm cùng mở bài trình chiếu trực tuyến lúc 20 giờ, vừa sửa vừa nhắn tin trao đổi", group: 3 },
        { text: "Mỗi bạn tự vào sơ đồ tư duy trực tuyến bổ sung phần của mình lúc rảnh", group: 2 },
        { text: "Nhóm đăng sơ đồ tư duy (tệp PDF) lên nhóm lớp để các bạn tham khảo", group: 1 },
        { text: "Tại triển lãm, An đứng cạnh màn hình giới thiệu sơ đồ cho khách tham quan", group: 0 },
        { text: "Buổi sáng Minh cập nhật số liệu thu chi, buổi tối Khoa bổ sung hình ảnh vào sơ đồ trực tuyến", group: 2 },
        { text: "Ba bạn cùng lúc chỉnh sửa sơ đồ trực tuyến, thấy ngay thay đổi của nhau", group: 3 },
      ],
      explanation: "Trực tiếp: người trình bày có mặt, giải thích và trả lời ngay. Xem: người khác chỉ xem. Cập nhật: mỗi người tự sửa vào thời gian của mình. Thời gian thực: mọi người cùng sửa một lúc, nên có kênh hội thoại.",
    },
    {
      id: "cong-cu-truc-quan", name: "Ghép nội dung với công cụ trực quan phù hợp 🎯", type: "matching",
      goal: "Sử dụng đúng công cụ trực quan để truyền tải thông điệp.",
      time: 150,
      task: "Ghép mỗi nội dung cần trình bày với công cụ trực quan phù hợp nhất. Làm hết rồi bấm Nộp bài.",
      pairs: [
        { left: "Tiến trình lịch sử các công cụ tính toán", right: "Sơ đồ dòng thời gian" },
        { left: "So sánh số khách tham quan ở mỗi gian trưng bày", right: "Biểu đồ cột" },
        { left: "Tỉ lệ phần trăm các khoản chi của gian trưng bày", right: "Biểu đồ hình quạt tròn" },
        { left: "Hình dáng chiếc máy Pascaline", right: "Hình ảnh" },
        { left: "Cách vận hành máy tính cơ học quay tay", right: "Video" },
        { left: "Ý chính – ý phụ của cả dự án Triển lãm", right: "Sơ đồ tư duy" },
      ],
      explanation: "Chọn loại công cụ minh hoạ truyền tải thông điệp tốt nhất: mốc thời gian → dòng thời gian; so sánh số lượng → biểu đồ cột; tỉ lệ phần trăm → biểu đồ hình quạt tròn; hình dáng → ảnh; chuyển động → video; ý chính – ý phụ → sơ đồ tư duy.",
    },
    {
      id: "chat-luong", name: "Slide nào dễ xem hơn? 🔍", type: "knowledge",
      goal: "Nhận xét được tác động của màu sắc, bố cục, hình ảnh, cỡ chữ đến chất lượng trình bày.",
      time: 150,
      task: "Quan sát hai trang chiếu cùng nội dung, chỉ ra lỗi của Slide A và cách sửa.",
      content: {
        heading: "🔍 Đảm bảo chất lượng dữ liệu",
        prompt: "Hãy tưởng tượng em ngồi cuối phòng triển lãm và nhìn lên màn chiếu.",
        revealLabel: "👀 Xem Slide A và Slide B",
        blocks: [
          { kind: "html", value: SLIDES_HTML },
          { kind: "list", value: ["Cỡ chữ đủ lớn, ít chữ — xem được từ khoảng cách xa.", "Hình ảnh sắc nét, bố cục hợp lí.", "Dùng màu sắc tương phản để tăng sự chú ý và làm nổi bật thông tin."] },
        ],
      },
      questions: [
        { question: "Slide A mắc những lỗi nào về chất lượng dữ liệu? (Chọn tất cả đáp án đúng)", type: "multiple-select",
          options: ["Chữ quá nhỏ, quá nhiều chữ — ngồi xa không đọc được", "Hình ảnh bị mờ, không sắc nét", "Màu chữ vàng nhạt trên nền trắng, khó đọc", "Có dùng hình minh hoạ cho nội dung"],
          answer: [0, 1, 2], explanation: "Slide A: chữ nhỏ và dài, ảnh mờ, màu chữ không tương phản với nền. Dùng hình minh hoạ không phải là lỗi — lỗi là ảnh không sắc nét.",
          level: "thong-hieu", activity: "chat-luong" },
        { question: "Nhóm em muốn dùng màu sắc cho bài trình chiếu. Cách dùng nào hợp lí?", type: "multiple-choice",
          options: ["Tô mỗi chữ một màu khác nhau cho sinh động", "Dùng chữ vàng nhạt trên nền trắng cho nhẹ nhàng", "Dùng màu để làm nổi bật ý chính, tương phản rõ với nền", "Không dùng màu nào để tránh rối mắt"],
          answer: 2, explanation: "Màu sắc giúp tăng sự chú ý và cải thiện khả năng hiển thị thông tin khi làm nổi bật ý chính và tương phản với nền.",
          level: "van-dung", activity: "chat-luong" },
      ],
    },
    {
      id: "phieu-2", name: "Phiếu học tập 2 — Em đã làm được gì? 📋", type: "checklist",
      goal: "Tự đánh giá kĩ năng tạo, chia sẻ sơ đồ tư duy và bài trình chiếu; xác định kiến thức cần bổ sung.",
      time: 240,
      task: "Nhóm 4 HS (4 phút): tick từng việc vào cột Làm được hoặc Chưa làm được, ghi kiến thức nhóm cần bổ sung rồi gửi cho thầy/cô.",
      sgkImage: "assets/sgk/sgk-trang28.jpg",
      columns: ["✅ Làm được", "⏳ Chưa làm được"],
      sections: [
        { title: "🧠 SƠ ĐỒ TƯ DUY", items: ["Tạo sơ đồ tư duy đơn giản trên giấy", "Tạo sơ đồ tư duy bằng phần mềm trên máy tính", "Chia sẻ sơ đồ tư duy cho người khác xem", "Đính kèm tệp (văn bản, ảnh, video, trang tính) vào sơ đồ tư duy", "Chia sẻ để người khác cùng chỉnh sửa sơ đồ tư duy"] },
        { title: "📽️ BÀI TRÌNH CHIẾU", items: ["Tạo bài trình chiếu phục vụ trình bày thông tin", "Tạo bài trình chiếu liên kết với tệp tin hoặc trang web", "Chia sẻ bài trình chiếu cho người khác xem", "Chia sẻ để người khác cùng chỉnh sửa bài trình chiếu"] },
      ],
      note: "Em cần được bổ sung những kiến thức nào về tạo sơ đồ tư duy và bài trình chiếu để trao đổi, hợp tác hiệu quả?",
      modelAnswer: [
        "Sơ đồ tư duy — Làm được: tạo sơ đồ tư duy đơn giản trên giấy và máy tính; chia sẻ cho người khác xem.",
        "Sơ đồ tư duy — Chưa làm được: sơ đồ tư duy có đính kèm tệp tin; chia sẻ cho người khác chỉnh sửa.",
        "Bài trình chiếu — Làm được: tạo bài trình chiếu phục vụ trình bày thông tin; tạo bài trình chiếu liên kết với tệp tin hoặc trang web; chia sẻ cho người khác xem.",
        "Bài trình chiếu — Chưa làm được: chia sẻ cho người khác chỉnh sửa.",
        "➜ Cần bổ sung: cách đính kèm tệp vào sơ đồ tư duy và cách chia sẻ bài để mọi người cùng cộng tác hoàn thành sản phẩm.",
      ],
      remember: ["Để trao đổi, hợp tác hiệu quả, em cần biết thêm cách đính kèm tệp vào sơ đồ tư duy và cách chia sẻ để mọi người cùng cộng tác hoàn thành sản phẩm."],
    },

    /* ===================== HĐ2.2: ĐÍNH KÈM TỆP VÀO SƠ ĐỒ TƯ DUY (20 phút) ===================== */
    {
      id: "hinh-7-1", name: "Khám phá sơ đồ có đính kèm dữ liệu 📎", type: "knowledge",
      goal: "Nhận biết khả năng đính kèm văn bản, hình ảnh, video, trang tính vào sơ đồ tư duy.",
      time: 240,
      task: "Bấm vào từng nút 📎 trên sơ đồ Hình 7.1 để mở tệp đính kèm, rồi chỉ ra các loại dữ liệu được đính kèm.",
      sgkImage: "assets/sgk/hinh-7-1.jpg",
      mindmap: { title: "Hình 7.1 — Ý tưởng Triển lãm tin học của nhóm An, Minh và Khoa", layout: "right", root: MM_7_1,
        intro: "🖱️ Bấm các nút 📎 để mở ảnh, văn bản, liên kết video và trang tính được đính kèm." },
      content: {
        heading: "📎 Sơ đồ tư duy có đính kèm dữ liệu",
        revealLabel: "🔍 Kiến thức (SGK tr.28–29)",
        blocks: [
          { kind: "text", value: "Khi tạo sơ đồ tư duy bằng phần mềm, em có thể đính kèm tệp văn bản, hình ảnh, video và trang tính vào sơ đồ tư duy để minh hoạ chi tiết cho nội dung cần trình bày. Thao tác đính kèm sẽ được hướng dẫn cụ thể trong Bài 8." },
          { kind: "image", value: "assets/sgk/hinh-7-1.jpg", caption: "Hình 7.1. Sơ đồ tư duy trình bày ý tưởng Triển lãm tin học của nhóm An, Minh và Khoa" },
        ],
      },
      questions: [
        { question: "Em hãy chỉ ra các loại dữ liệu được đính kèm vào sơ đồ tư duy ở Hình 7.1. (Chọn tất cả đáp án đúng)", type: "multiple-select",
          options: ["Tệp âm thanh (bản nhạc)", "Hình ảnh", "Liên kết đến video", "Văn bản", "Trang tính"],
          answer: [1, 2, 3, 4], explanation: "Hình 7.1 đính kèm: ảnh Pascaline, liên kết đến video giới thiệu dự án, văn bản tiểu sử của Babbage và bảng tính dự kiến thu chi. Không có tệp âm thanh.",
          level: "nhan-biet", activity: "hinh-7-1" },
        { question: "Nhánh “Dự kiến thu chi” được đính kèm một trang tính. Việc này có lợi gì?", type: "multiple-choice",
          options: ["Để sơ đồ có thêm màu sắc", "Để thay thế toàn bộ sơ đồ tư duy", "Để khách tham quan tự sửa số liệu", "Xem được chi tiết các khoản thu, chi mà sơ đồ vẫn gọn, không bị rối"],
          answer: 3, explanation: "Số liệu chi tiết nằm trong trang tính (có thể tính toán, cập nhật); sơ đồ chỉ giữ ý chính nên vẫn gọn gàng, dễ theo dõi.",
          level: "thong-hieu", activity: "hinh-7-1" },
      ],
      remember: ["Có thể đính kèm tệp văn bản, hình ảnh, video, trang tính vào sơ đồ tư duy giúp trình bày thông tin đầy đủ và hiệu quả."],
    },
    {
      id: "gan-tep", name: "Trò chơi: Đính kèm đúng nhánh 🗂️", type: "dragdrop",
      goal: "Biết chọn nhánh phù hợp để đính kèm tệp minh hoạ.",
      time: 180,
      task: "Nhóm An, Minh, Khoa có 8 tệp. Đính kèm mỗi tệp vào nhánh phù hợp nhất của sơ đồ. Xếp hết rồi bấm Nộp bài.",
      groups: ["⚙️ 1642 — Pascal — Pascaline", "🏭 1833 — Babbage — Analytical Engine", "💻 Máy tính điện tử", "💰 Dự kiến thu chi"],
      items: [
        { text: "🖼️ Ảnh chụp máy Pascaline", group: 0 },
        { text: "📄 Tiểu sử Charles Babbage", group: 1 },
        { text: "🔗 Video giới thiệu Analytical Engine", group: 1 },
        { text: "📊 Bảng tính chi phí in ảnh, trang trí", group: 3 },
        { text: "🖼️ Ảnh máy tính điện tử ENIAC", group: 2 },
        { text: "📄 Tiểu sử Blaise Pascal", group: 0 },
        { text: "📊 Bảng tính quỹ lớp hỗ trợ và số tiền còn lại", group: 3 },
        { text: "🎬 Video về những chiếc máy tính điện tử đầu tiên", group: 2 },
      ],
      explanation: "Mỗi tệp gắn vào nhánh có nội dung liên quan trực tiếp — người xem mở đúng chỗ là thấy chi tiết. ENIAC (1945) là một trong những máy tính điện tử đầu tiên.",
    },
    {
      id: "cac-buoc", name: "Sắp xếp các bước tạo sơ đồ có đính kèm 🪜", type: "ordering",
      goal: "Nắm quy trình tạo sơ đồ tư duy số có đính kèm nội dung.",
      time: 120,
      task: "Sắp xếp các bước theo đúng thứ tự rồi bấm Nộp bài.",
      steps: [
        "Xác định chủ đề trung tâm của sơ đồ",
        "Tạo các nhánh chính",
        "Tạo các nhánh phụ cho từng nhánh chính",
        "Chọn nhánh cần minh hoạ, dùng lệnh Insert / Attach / Link để đính kèm tệp",
        "Lưu và chia sẻ sơ đồ với các bạn trong nhóm",
      ],
      explanation: "Chủ đề → nhánh chính → nhánh phụ → đính kèm tệp vào nhánh → lưu, chia sẻ để cùng trao đổi, hợp tác.",
    },
    {
      id: "thuc-hanh", name: "Thực hành: Sơ đồ “Bảo vệ môi trường học đường” 🌱", type: "knowledge",
      goal: "Tạo sơ đồ tư duy số có đính kèm ít nhất 2 dạng nội dung và chia sẻ với nhóm.",
      time: 720,
      task: "Nhóm 3–4 HS: tạo sơ đồ tư duy chủ đề “Bảo vệ môi trường học đường”, thêm nhánh phụ và đính kèm ít nhất 2 dạng nội dung (văn bản + hình ảnh/video/bảng), rồi gửi cho thầy/cô.",
      links: TOOLS,
      mindmap: { key: "bvmt", editable: true, title: "Sơ đồ tư duy của nhóm em", root: MM_BVMT,
        submit: "Sơ đồ “Bảo vệ môi trường học đường” (Thực hành)",
        intro: "🧪 Làm ngay trên sơ đồ mô phỏng (máy/điện thoại nào cũng dùng được) hoặc làm trên Canva, Coggle rồi chép lại ý chính vào đây." },
      content: {
        heading: "🌱 Thực hành: tạo sơ đồ tư duy có đính kèm nội dung",
        revealLabel: "📌 Gợi ý nội dung & yêu cầu sản phẩm",
        blocks: [
          { kind: "list", value: [
            "Nhánh chính gợi ý: Trồng cây · Phân loại rác · Tiết kiệm điện (có thể thêm: Tiết kiệm nước, Giữ vệ sinh lớp học…).",
            "Mỗi nhánh chính có 2–3 nhánh phụ: việc làm cụ thể, ai thực hiện, khi nào.",
            "Đính kèm ít nhất 2 dạng nội dung: 📄 văn bản mô tả, 🖼️ ảnh minh hoạ, 🎬 video, 📊 bảng dữ liệu nhỏ (vd: số cây mỗi lớp trồng).",
            "Chia sẻ sản phẩm với bạn cùng nhóm; gửi cho thầy/cô để trình bày trước lớp.",
          ] },
        ],
      },
      remember: [
        "Việc đính kèm nội dung đa phương tiện giúp sơ đồ tư duy sinh động và dễ hiểu hơn.",
        "Khi làm việc nhóm, có thể dùng sơ đồ tư duy số để chia sẻ thông tin, tài liệu, video, bảng dữ liệu cho mọi người cùng xem.",
      ],
    },

    /* ===================== HĐ3: LUYỆN TẬP (5 phút) ===================== */
    {
      id: "luyen-tap", name: "Luyện tập: Hoàn thiện sản phẩm theo tiêu chí ✨", type: "knowledge",
      goal: "Hoàn thiện sơ đồ tư duy: bổ sung nội dung, chỉnh bố cục, kiểm tra tệp đính kèm.",
      time: 300,
      task: "Cá nhân / nhóm hoàn thiện sơ đồ đã làm theo 3 tiêu chí, kiểm tra lại các tệp đính kèm rồi gửi bản hoàn thiện cho thầy/cô.",
      links: TOOLS,
      mindmap: { key: "bvmt", editable: true, title: "Sơ đồ tư duy của nhóm em (tiếp tục)", root: MM_BVMT,
        submit: "Sơ đồ “Bảo vệ môi trường học đường” — bản hoàn thiện (Luyện tập)" },
      content: {
        heading: "✨ Tiêu chí một sản phẩm tốt",
        prompt: "Mục tiêu: người xem hiểu thông tin nhanh và cảm thấy hấp dẫn.",
        revealLabel: "📏 Xem 3 tiêu chí đánh giá",
        blocks: [
          { kind: "html", value: `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px;font-size:1.1rem">${[["1️⃣", "Rõ ràng, dễ hiểu", "Ý chính ngắn gọn, nhánh sắp xếp logic: chủ đề → nhánh chính → nhánh phụ."], ["2️⃣", "Có ít nhất 2 loại nội dung đính kèm", "Văn bản + hình ảnh / video / bảng; tệp gắn đúng nhánh và mở được."], ["3️⃣", "Màu sắc hài hoà, bố cục hợp lí", "Mỗi nhánh một màu, chữ đủ lớn, không nhồi quá nhiều chữ."]].map(([n, t, d]) => `<div style="background:#fff7ed;border:2px solid #fdba74;border-radius:14px;padding:12px"><div style="font-size:1.8rem">${n}</div><b>${t}</b><div>${d}</div></div>`).join("")}</div>` },
        ],
      },
    },
    {
      id: "tro-choi", name: "Trò chơi: Dựng gian Triển lãm tin học 🖼️", type: "penguin",
      pet: "📦", homeIcon: "🖼️", enemy: "⏰", saveWord: "sản phẩm được treo lên gian Triển lãm tin học",
      winText: "Gian triển lãm của lớp đã hoàn thiện — xuất sắc!",
      goal: "Củng cố toàn bài: cách sử dụng sơ đồ tư duy, bài trình chiếu, công cụ trực quan và đính kèm tệp.",
      time: 300,
      task: "Trả lời đúng mỗi câu để treo một sản phẩm lên gian Triển lãm trước khi hết giờ!",
      intro: "Mỗi câu trả lời đúng: một sản phẩm 📦 được treo lên gian triển lãm 🖼️.",
      questions: [
        { question: "Công cụ nào trình bày thông tin trực quan dưới dạng chủ đề trung tâm với các nhánh ý chính – ý phụ?", type: "multiple-choice",
          options: ["Sơ đồ tư duy", "Bảng tính", "Thư điện tử", "Trình duyệt web"],
          answer: 0, explanation: "Sơ đồ tư duy thể hiện chủ đề trung tâm và các nhánh ý chính, ý phụ.", level: "nhan-biet", activity: "tro-choi" },
        { question: "Ba bạn ở ba nhà khác nhau muốn cùng sửa bài trình chiếu tối nay và thấy ngay thay đổi của nhau. Nên dùng cách nào?", type: "multiple-choice",
          options: ["Trình bày trực tiếp", "Chia sẻ để cộng tác theo thời gian thực", "Gửi tệp PDF để xem", "In ra giấy rồi chuyền tay"],
          answer: 1, explanation: "Cộng tác theo thời gian thực: mọi thành viên cùng chỉnh sửa sản phẩm trực tuyến.", level: "van-dung", activity: "tro-choi" },
        { question: "Để thuận lợi cho người xem khi chia sẻ sơ đồ tư duy, nên làm gì?", type: "multiple-choice",
          options: ["Viết thật nhiều chữ vào mỗi nhánh", "Chia sơ đồ thành nhiều trang rời", "Trình bày trong một trang, đính kèm tệp để trình bày chi tiết", "Không dùng hình ảnh nào"],
          answer: 2, explanation: "SGK: sơ đồ tư duy nên được trình bày trong một trang và có thể đính kèm tệp văn bản, hình ảnh, video, trang tính để trình bày chi tiết.", level: "thong-hieu", activity: "tro-choi" },
        { question: "Dữ liệu nào KHÔNG được đính kèm trong sơ đồ tư duy ở Hình 7.1?", type: "multiple-choice",
          options: ["Ảnh Pascaline", "Bảng tính dự kiến thu chi", "Văn bản tiểu sử của Babbage", "Tệp âm thanh"],
          answer: 3, explanation: "Hình 7.1 đính kèm ảnh, liên kết video, văn bản và bảng tính — không có tệp âm thanh.", level: "nhan-biet", activity: "tro-choi" },
        { question: "Khi các thành viên cùng hoàn thiện sản phẩm trực tuyến, việc nào rất cần thiết?", type: "multiple-choice",
          options: ["Tắt hết thông báo để tập trung", "Mở một kênh hội thoại để các thành viên trao đổi", "Mỗi người làm một tệp riêng, không báo ai", "Chỉ trưởng nhóm được sửa"],
          answer: 1, explanation: "SGK: việc mở một kênh hội thoại để các thành viên trao đổi trong quá trình hoàn thiện sản phẩm là rất cần thiết.", level: "thong-hieu", activity: "tro-choi" },
        { question: "Muốn khách tham quan thấy máy tính cơ học quay tay hoạt động thế nào, em nên đính kèm gì vào nhánh đó?", type: "multiple-choice",
          options: ["Một trang tính", "Một văn bản dài", "Một video", "Không cần đính kèm"],
          answer: 2, explanation: "Sự vận hành, chuyển động được thể hiện rõ nhất bằng video.", level: "van-dung", activity: "tro-choi" },
        { question: "Cách nào dễ dàng nhất để cộng tác vì em có thể diễn giải bức tranh toàn cảnh và trả lời ngay câu hỏi người nghe?", type: "multiple-choice",
          options: ["Trình bày trực tiếp", "Chia sẻ để xem độc lập", "Chia sẻ để cập nhật độc lập", "Gửi thư điện tử"],
          answer: 0, explanation: "SGK: trình bày trực tiếp là cách dễ dàng nhất để cộng tác.", level: "nhan-biet", activity: "tro-choi" },
        { question: "Khoa dán vào slide một bảng số liệu 20 dòng, chữ cỡ 10 để chiếu ở phòng triển lãm rộng. Lời khuyên tốt nhất là gì?", type: "multiple-choice",
          options: ["Giữ nguyên vì đủ thông tin", "Đổi sang chữ màu vàng nhạt", "Thêm số liệu cho đầy đủ hơn", "Chuyển thành biểu đồ rõ ràng, đính kèm bảng chi tiết cho ai cần xem"],
          answer: 3, explanation: "Đảm bảo chất lượng dữ liệu: xem được từ xa. Biểu đồ truyền tải nhanh; bảng chi tiết để ở tệp đính kèm.", level: "van-dung-cao", activity: "tro-choi" },
      ],
    },

    /* ===================== HĐ4: VẬN DỤNG (5 phút + ở nhà) ===================== */
    {
      id: "van-dung", name: "Luyện tập SGK & Vận dụng 🏡", type: "vandung",
      goal: "Vận dụng sơ đồ tư duy có đính kèm dữ liệu để trình bày, chia sẻ và hợp tác.",
      time: 300,
      task: "2–3 nhóm giới thiệu sản phẩm (1–2 phút/nhóm): ý tưởng, công cụ đã dùng, lí do chọn hình thức. Các câu còn lại thảo luận và gửi cho thầy/cô; Vận dụng làm tiếp ở nhà.",
      sgkImage: "assets/sgk/sgk-trang29.jpg",
      links: TOOLS,
      mindmap: { key: "trien-lam", editable: true, title: "Vận dụng — Triển lãm tin học", root: MM_TRIEN_LAM,
        submit: "Sơ đồ Triển lãm tin học (Vận dụng SGK)",
        intro: "🏡 Vận dụng: sửa chủ đề thành nội dung em muốn trưng bày, thêm nhánh và đính kèm các tệp cần thiết rồi gửi cho thầy/cô." },
      intro: "Thảo luận, gửi câu trả lời cho thầy/cô rồi bấm để xem hướng chốt.",
      cases: [
        { question: "Luyện tập 1 (SGK tr.29): Nhận xét về tính hợp lí và lợi ích của những dữ liệu đính kèm trong sơ đồ tư duy ở Hình 7.1 khi trình bày thông tin trong trao đổi và hợp tác.",
          answer: "Các dữ liệu được đính kèm đúng nhánh có nội dung liên quan nên hợp lí: ảnh Pascaline giúp hình dung chiếc máy; liên kết video giới thiệu dự án Analytical Engine sinh động; văn bản tiểu sử Babbage cung cấp thông tin chi tiết; bảng tính dự kiến thu chi giúp tính toán, cập nhật số liệu. Lợi ích: sơ đồ vẫn gọn trong một trang, ai cần chi tiết thì mở tệp → thông tin đầy đủ, trực quan, các thành viên dễ trao đổi và cùng hoàn thiện." },
        { question: "Luyện tập 2 (SGK tr.29): Nêu những cách mà nhóm An, Minh, Khoa sử dụng sơ đồ tư duy ở Hình 7.1 trong trao đổi và hợp tác để chuẩn bị nội dung Lược sử công cụ tính toán.",
          answer: "Gợi ý: trình bày trực tiếp ý tưởng với cả lớp, thầy/cô; chia sẻ sơ đồ để các thành viên, các nhóm khác xem; chia sẻ để mỗi bạn chủ động cập nhật phần mình phụ trách (tư liệu lịch sử, hình ảnh, video, thu chi); cộng tác theo thời gian thực trên sơ đồ trực tuyến, kèm kênh hội thoại để trao đổi." },
        { question: "Vận dụng (SGK tr.29): Tạo sơ đồ tư duy trình bày nội dung em muốn trưng bày trong Triển lãm tin học (dùng sơ đồ phía trên). Ghi ra những thông tin dạng văn bản, hình ảnh, video, trang tính cần đính kèm, và cho biết em sẽ chia sẻ sơ đồ với nhóm theo cách nào.",
          answer: "Ví dụ chủ đề “Trò chơi lập trình trực quan”: nhánh Giới thiệu (📄 văn bản mô tả trò chơi), Hình ảnh sản phẩm (🖼️ ảnh chụp màn hình), Hướng dẫn chơi (🎬 video quay màn hình), Kết quả bình chọn (📊 trang tính số lượt chơi). Chia sẻ trực tuyến để các bạn cùng cập nhật, hoặc cộng tác theo thời gian thực khi hoàn thiện." },
        { question: "Trao đổi sau phần giới thiệu sản phẩm: Cách trình bày của nhóm nào thu hút nhất? Vì sao? Góp ý một điểm để sản phẩm đó tốt hơn.",
          answer: "Đánh giá theo tiêu chí rõ ràng – sáng tạo – hợp tác: nội dung dễ hiểu, bố cục hợp lí, màu sắc hài hoà, tệp đính kèm đúng nhánh. Mỗi công cụ số giúp trình bày thông tin theo cách khác nhau; kết hợp văn bản, hình ảnh, video, biểu đồ làm thông tin sinh động, dễ hiểu." },
      ],
    },

    /* ===================== TỔNG KẾT ===================== */
    {
      id: "tong-ket", name: "Tổng kết", type: "summary",
      task: "Cả lớp nhắc lại kiến thức trọng tâm và làm thử thách cuối. Dặn dò: lưu sản phẩm, chia sẻ lên lớp học trực tuyến; đọc trước Bài 8.",
      content: {
        learned: [
          "Sơ đồ tư duy và bài trình chiếu là công cụ hiệu quả để trình bày thông tin trong trao đổi và hợp tác.",
          "4 cách: trình bày trực tiếp · chia sẻ để xem · chia sẻ để chủ động cập nhật · chia sẻ để cộng tác theo thời gian thực.",
          "Dùng hình ảnh, biểu đồ, video hợp lí: đúng công cụ trực quan, đảm bảo chất lượng dữ liệu.",
          "Đính kèm tệp văn bản, hình ảnh, video, trang tính vào sơ đồ tư duy giúp trình bày thông tin đầy đủ và hiệu quả.",
        ],
        challenge: [
          { question: "Nhóm An muốn mỗi bạn tự bổ sung phần của mình vào sơ đồ vào những thời gian rảnh khác nhau. Cách sử dụng phù hợp là:", type: "multiple-choice",
            options: ["Trình bày trực tiếp", "Chia sẻ để các thành viên chủ động cập nhật", "Chia sẻ để các thành viên chỉ xem", "Mỗi bạn vẽ một sơ đồ riêng trên giấy"],
            answer: 1, explanation: "Chia sẻ để chủ động cập nhật: mỗi thành viên tự chỉnh sửa theo thời gian phù hợp với mình.",
            level: "van-dung", activity: "tong-ket" },
          { question: "Vì sao đính kèm tệp văn bản, ảnh, video, trang tính giúp sơ đồ tư duy trình bày thông tin hiệu quả hơn?", type: "multiple-choice",
            options: ["Sơ đồ vẫn gọn gàng; ai cần chi tiết thì mở tệp — thông tin vừa đầy đủ vừa trực quan", "Vì sơ đồ sẽ có nhiều chữ hơn", "Vì không cần tạo nhánh nữa", "Vì tệp đính kèm thay thế hoàn toàn người trình bày"],
            answer: 0, explanation: "Đính kèm giữ sơ đồ gọn trong một trang mà vẫn cung cấp đầy đủ chi tiết, giúp trao đổi và hợp tác hiệu quả.",
            level: "van-dung-cao", activity: "tong-ket" },
        ],
      },
    },
  ],
};

if (typeof module !== "undefined" && module.exports) module.exports = LESSON;
if (typeof window !== "undefined") window.LESSON = LESSON;
