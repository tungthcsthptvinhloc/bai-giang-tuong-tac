/* ============================================================================
 * BÀI 14 — THỰC HÀNH TỔNG HỢP: HOÀN THIỆN SỔ LƯU NIỆM  (Tin học 6 — Kết nối tri thức)
 * Chủ đề 5: Ứng dụng tin học.
 * Bám sát SGK trang 61–62 + Kế hoạch bài dạy của giáo viên. Thời lượng: 2 tiết.
 * Chỉ sửa file này để đổi nội dung. Engine app.js không cần sửa.
 * Thao tác Text from File, Cover Page,… HS làm trên Microsoft Word thật; app có sơ đồ tư duy rà soát nội dung,
 * phiếu tự kiểm tra, phiếu chấm chéo giữa các nhóm (theo lựa chọn của GV), câu hỏi, trò chơi.
 * ==========================================================================*/

// ---- Kết quả của các bài trong Chủ đề 5 (nguyên liệu cho cuốn sổ) ----
const HANH_TRINH_HTML = `<div style="display:flex;flex-wrap:wrap;gap:12px;justify-content:center;align-items:stretch">
  ${[["🧠", "Bài 10", "Sơ đồ tư duy nội dung cuốn sổ", "SoLuuNiem.emm", "#a855f7"],
    ["✍️", "Bài 11", "Bài viết cảm nghĩ, định dạng đẹp", "CamNghiVeBan.docx", "#2563eb"],
    ["📋", "Bài 12", "Danh sách lớp dạng bảng", "bảng có ảnh, họ tên, ngày sinh", "#16a34a"],
    ["🔍", "Bài 13", "Tìm kiếm và Thay thế để rà soát", "sửa lỗi chính tả, từ viết tắt", "#ea580c"]]
    .map(([ic, b, t, f, c]) => `<div style="flex:1 1 190px;max-width:240px;background:#fff;border:3px solid ${c};border-radius:18px;padding:10px 14px;text-align:center"><div style="font-size:2.2rem">${ic}</div><b style="color:${c}">${b}</b><div>${t}</div><div style="color:#64748b;font-size:.92rem">${f}</div></div>`).join("")}
  <div style="flex:1 1 190px;max-width:240px;background:linear-gradient(135deg,#ccfbf1,#ffedd5);border:3px dashed #0d9488;border-radius:18px;padding:10px 14px;text-align:center"><div style="font-size:2.2rem">📖</div><b style="color:#115e59">Bài 14</b><div>Hoàn thiện cuốn sổ lưu niệm của lớp</div><div style="color:#64748b;font-size:.92rem">Soluuniem.docx</div></div>
</div>`;

// ---- Bốn bước hoàn thiện sổ lưu niệm (SGK tr.61–62) ----
const BON_BUOC_HTML = `<div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:center">
  ${[["📥", "Bước 1", "Tập hợp các nội dung đã có vào tệp Soluuniem.docx"], ["➕", "Bước 2", "Bổ sung thêm nội dung, định dạng cho đẹp"], ["🎨", "Bước 3", "Tạo trang bìa cho cuốn sổ"], ["👀", "Bước 4", "Xem lại nội dung, chia sẻ với cả lớp"]]
    .map(([ic, b, t], i) => `<div style="flex:1 1 190px;max-width:250px;background:#fff;border:3px solid ${["#0d9488", "#0284c7", "#ea580c", "#db2777"][i]};border-radius:18px;padding:10px 14px;text-align:left"><div style="font-size:1.9rem">${ic}</div><b>${b}</b><br>${t}</div>`).join("")}
</div>`;

// ---- Tưởng tượng họp lớp khi 50 tuổi (SGK Bước 4) ----
const HOP_LOP_HTML = `<div style="display:flex;flex-wrap:wrap;gap:14px;align-items:center;justify-content:center;max-width:900px;margin:0 auto">
  <div style="font-size:3rem;line-height:1.1;text-align:center">👨‍🦳👩‍🦳🧓<br>📖</div>
  <div style="flex:1 1 420px;background:#fff7ed;border:2px solid #fdba74;border-radius:18px;padding:12px 18px;font-size:1.08rem;text-align:left">
    ⏳ Hãy tưởng tượng các em đã là người lớn. Cả lớp gặp lại nhau trong một lần họp lớp khi đã <b>50 tuổi</b>. Cùng xem lại cuốn sổ lưu niệm và nghĩ về câu hỏi:
    <div style="margin-top:8px;font-size:1.2rem;font-weight:800;color:#c2410c;text-align:center">“Tại sao chúng ta lại đưa nội dung này vào sổ?”</div></div>
</div>`;

// ---- Hỏi AI có trách nhiệm (năng lực AI 6.A3.4; câu lệnh gợi ý trích giáo án) ----
const AI_HTML = `<div style="display:flex;flex-wrap:wrap;gap:12px;justify-content:center">
  <div style="flex:1 1 320px;max-width:540px;background:#f5f3ff;border:2px solid #c4b5fd;border-radius:16px;padding:12px 16px;text-align:left">
    <b style="color:#6d28d9">🤖 Câu lệnh gợi ý (ChatGPT, Gemini, Copilot)</b>
    <ul style="margin:6px 0 0 18px;padding:0">
      <li>“Hãy gợi ý 5 tiêu đề sáng tạo cho sổ lưu niệm của lớp 6.”</li>
      <li>“Hãy viết một lời chúc ngắn gửi tới thầy cô và các bạn trong sổ lưu niệm.”</li>
      <li>“Hãy gợi ý bố cục trang bìa đẹp, phù hợp với học sinh lớp 6.”</li>
      <li>“Đề xuất các mục cần có trong một cuốn sổ lưu niệm cuối năm học.”</li>
    </ul></div>
  <div style="flex:1 1 280px;max-width:440px;background:#fef2f2;border:2px solid #fca5a5;border-radius:16px;padding:12px 16px;text-align:left">
    <b style="color:#b91c1c">🛡️ Dùng AI an toàn, có trách nhiệm</b>
    <ul style="margin:6px 0 0 18px;padding:0">
      <li>Chọn lọc, sửa lại gợi ý của AI bằng lời của nhóm — không phụ thuộc hoàn toàn.</li>
      <li>Kiểm chứng thông tin; tôn trọng bản quyền hình ảnh, nội dung.</li>
      <li>Không nhập họ tên, ảnh, ngày sinh, địa chỉ của các bạn vào AI — dữ liệu cá nhân là tài sản riêng.</li>
    </ul></div></div>`;

// ---- Sơ đồ tư duy rà soát nội dung (dựa trên sơ đồ Sổ lưu niệm của Bài 10) ----
const RA_SOAT = { text: "📖 SỔ LƯU NIỆM\nLỚP 6A", children: [
  { text: "👥 Giới thiệu thành viên", children: [{ text: "Họ tên" }, { text: "Ngày sinh" }, { text: "Ảnh" }, { text: "Sở thích" }] },
  { text: "📋 Danh sách lớp (bảng)", children: [] },
  { text: "👩‍🏫 Thầy cô giáo", children: [{ text: "Giáo viên chủ nhiệm" }, { text: "?" }] },
  { text: "🎉 Hoạt động của lớp", children: [{ text: "Thể thao" }, { text: "Văn hoá" }, { text: "Văn nghệ" }, { text: "Tham quan" }] },
  { text: "✍️ Bài viết cảm nghĩ", children: [{ text: "Về bạn" }, { text: "Về trường lớp" }, { text: "?" }] },
  { text: "?", children: [] },
] };
const MM_LINKS = [
  { label: "MindMaple Lite — trang tải phần mềm", url: "https://mindmaple-lite.vi.softonic.com/", note: "(mở tab mới)" },
];

const LESSON = {
  meta: {
    subject: "Tin học", grade: "6", book: "Kết nối tri thức với cuộc sống",
    title: "Bài 14: Thực hành tổng hợp: Hoàn thiện sổ lưu niệm", unit: "Chủ đề 5 — Ứng dụng tin học",
    pages: "61–62", durationMinutes: 90,
  },
  objectives: {
    knowledge: [
      "Biết cách tổng hợp, sắp xếp các nội dung đã có thành một sản phẩm hoàn chỉnh (cuốn sổ lưu niệm của lớp).",
      "Biết tạo, bổ sung, chỉnh sửa nội dung số phục vụ thực tiễn; thể hiện bản thân qua sản phẩm số.",
    ],
    competencies: [
      "Tự chủ, tự học; giao tiếp, hợp tác (phân công, thống nhất bố cục trong nhóm); giải quyết vấn đề, sáng tạo (thiết kế trang, bố cục).",
      "Năng lực số 3.1.TC1a, 3.1.TC1b: tạo mới, bổ sung, chỉnh sửa nội dung số; thể hiện dấu ấn cá nhân, tập thể qua sản phẩm.",
      "Năng lực số 5.2.TC1a, 5.2.TC1b: xác định mục đích, nội dung cần có của sổ lưu niệm; chọn và dùng phần mềm soạn thảo phù hợp.",
      "Năng lực AI 6.A3.4: hiểu dữ liệu cá nhân là tài sản riêng, bảo vệ quyền này giúp con người an toàn, được tôn trọng trong môi trường số.",
    ],
    qualities: ["Nhân ái (hỗ trợ bạn), chăm chỉ, trung thực (không sao chép tuỳ tiện), trách nhiệm (đúng tiến độ)."],
  },
  coreKnowledge: [
    "Hoàn thiện sổ lưu niệm theo 4 bước: tập hợp nội dung đã có → bổ sung nội dung → tạo trang bìa → xem lại nội dung.",
    "Tập hợp nội dung vào một tệp (Soluuniem.docx): thẻ Insert → nhóm Text → Object ▾ → Text from File…",
    "Bổ sung nội dung và định dạng: định dạng chữ, căn lề đoạn, hướng trang, lề trang, hình ảnh, bảng (nếu cần), Tìm kiếm và Thay thế để chỉnh sửa.",
    "Tạo trang bìa: thẻ Insert → nhóm Pages → Cover Page → chọn mẫu → sửa nội dung và thay hình.",
    "Dữ liệu cá nhân (ảnh, ngày sinh, địa chỉ…) là tài sản riêng: hỏi ý kiến trước khi dùng, không chia sẻ công khai.",
  ],
  keywords: ["Soluuniem.docx", "Text from File", "Cover Page", "Định dạng", "Dữ liệu cá nhân"],
  settings: { basePoints: 100, useTimer: false, defaultTime: 60, sound: true, streakEnabled: true },

  activities: [
    /* =========================== TIẾT 1 =========================== */
    /* ===================== HĐ1: MỞ ĐẦU ===================== */
    {
      id: "mo-dau", name: "Mở đầu — Em còn nhớ cách định dạng văn bản? 🎨", type: "knowledge",
      goal: "Nhớ lại các thao tác định dạng đoạn, định dạng trang để chuẩn bị hoàn thiện sổ lưu niệm.",
      time: 300,
      task: "Nhóm thảo luận câu hỏi khởi động: Em hãy nêu cách định dạng văn bản (định dạng đoạn và định dạng trang)? Trả lời các câu hỏi bên dưới.",
      sgkImage: "assets/sgk/hinh-5-27.jpg",
      content: {
        heading: "📖 Sắp hoàn thành cuốn sổ lưu niệm lớp mình!",
        html: HANH_TRINH_HTML,
        revealLabel: "📌 Định dạng văn bản (giáo viên chốt)",
        blocks: [
          { kind: "list", value: [
            "Định dạng đoạn (Home → Paragraph): căn thẳng lề trái, căn giữa, căn thẳng lề phải, căn thẳng hai lề; giảm (tăng) mức thụt lề trái; khoảng cách giữa các dòng trong đoạn, giữa các đoạn.",
            "Định dạng trang (Page Layout → Page Setup): Orientation — Portrait (trang đứng), Landscape (trang ngang); Margins → Custom Margins — Top, Bottom, Left, Right → OK; Size — chọn khổ giấy A4.",
          ] },
          { kind: "image", value: "assets/sgk/hinh-5-4.jpg", caption: "Các lệnh định dạng đoạn văn bản (Bài 11)" },
          { kind: "image", value: "assets/sgk/kho-giay-size.png", caption: "Lệnh Size — chọn khổ giấy A4 (giáo án)" },
        ],
      },
      questions: [
        { question: "Các lệnh căn lề, thụt lề, khoảng cách dòng nằm ở đâu?", type: "multiple-choice",
          options: ["Thẻ Insert, nhóm Pages", "Thẻ Home, nhóm Paragraph", "Thẻ Page Layout, nhóm Page Setup", "Thẻ File, lệnh Print"],
          answer: 1, explanation: "Định dạng đoạn: thẻ Home → nhóm Paragraph.", level: "nhan-biet", activity: "mo-dau" },
        { question: "Muốn đặt lề trên 2 cm, lề trái 2,5 cm cho trang văn bản, em chọn:", type: "multiple-choice",
          options: ["Page Layout → Orientation → Landscape", "Home → căn thẳng hai lề", "Page Layout → Margins → Custom Margins, nhập Top, Left rồi OK", "Page Layout → Size → A4"],
          answer: 2, explanation: "Margins → Custom Margins: Top (lề trên), Bottom (lề dưới), Left (lề trái), Right (lề phải) → OK.", level: "thong-hieu", activity: "mo-dau" },
        { question: "Hướng trang Portrait là:", type: "multiple-choice",
          options: ["Trang đứng", "Trang ngang", "Khổ giấy A4", "Lề trang"],
          answer: 0, explanation: "Portrait: trang đứng · Landscape: trang nằm ngang.", level: "nhan-biet", activity: "mo-dau" },
      ],
      remember: ["Định dạng đoạn: Home → Paragraph. Định dạng trang: Page Layout → Page Setup (Orientation, Margins, Size)."],
    },
    {
      id: "on-tap-lenh", name: "Trò chơi: Ghép lệnh định dạng 🧩", type: "matching",
      goal: "Ôn lại tác dụng các lệnh định dạng sẽ dùng khi hoàn thiện sổ lưu niệm.",
      time: 180,
      task: "Ghép mỗi lệnh với tác dụng của nó. Làm hết rồi bấm Nộp bài.",
      pairs: [
        { left: "Căn giữa", right: "Tiêu đề, hình ảnh nằm cân đối giữa trang" },
        { left: "Căn thẳng hai lề", right: "Đoạn văn thẳng cả mép trái và mép phải" },
        { left: "Orientation", right: "Chọn hướng trang đứng hoặc ngang" },
        { left: "Margins", right: "Đặt lề trên, dưới, trái, phải của trang" },
        { left: "Size", right: "Chọn khổ giấy (thường là A4)" },
        { left: "Replace", right: "Thay từ, cụm từ này bằng từ, cụm từ khác" },
      ],
      explanation: "Căn giữa, căn thẳng hai lề (Home → Paragraph); Orientation, Margins, Size (Page Layout → Page Setup); Replace (Home → Editing).",
    },

    /* ===================== HĐ2: THỰC HÀNH — HOÀN THIỆN SỔ LƯU NIỆM ===================== */
    {
      id: "nhiem-vu", name: "Nhiệm vụ: Hoàn thiện sổ lưu niệm của lớp 📖", type: "knowledge",
      goal: "Nắm nhiệm vụ và 4 bước hoàn thiện cuốn sổ lưu niệm.",
      time: 240,
      task: "Đọc Nhiệm vụ (SGK tr.61): từ các kết quả thực hành trong Chủ đề 5, các nhóm (từ 3 – 5 em) tập hợp và bổ sung thêm nội dung để hoàn thiện cuốn sổ lưu niệm của lớp. Nhóm phân công việc cho từng bạn.",
      sgkImage: "assets/sgk/sgk-trang61.jpg",
      content: {
        heading: "🎯 Bốn bước hoàn thiện sổ lưu niệm",
        html: BON_BUOC_HTML,
      },
      questions: [
        { question: "Theo SGK, mỗi nhóm thực hiện nhiệm vụ gồm bao nhiêu em?", type: "multiple-choice",
          options: ["1 – 2 em", "Từ 3 – 5 em", "Từ 6 – 8 em", "Cả lớp một nhóm"],
          answer: 1, explanation: "Các nhóm từ 3 – 5 em cùng tập hợp và bổ sung nội dung.", level: "nhan-biet", activity: "nhiem-vu" },
        { question: "Các nội dung đã có được tập hợp vào một tệp văn bản có tên là gì?", type: "multiple-choice",
          options: ["CamNghiVeBan.docx", "SoLuuNiem.emm", "kemsuachua-xoai.docx", "Soluuniem.docx"],
          answer: 3, explanation: "Bước 1: tập hợp các nội dung vào một tệp văn bản có tên Soluuniem.docx.", level: "nhan-biet", activity: "nhiem-vu" },
      ],
    },
    {
      id: "buoc-1", name: "Bước 1. Tập hợp các nội dung đã có 📥", type: "knowledge",
      goal: "Biết dùng Text from File để gộp nội dung các tệp vào một tệp.",
      time: 300,
      task: "Quan sát Hình 5.25: để đưa nội dung tệp CamNghiVeBan.docx vào tệp Soluuniem.docx mà không phải gõ lại, em thực hiện thế nào?",
      sgkImage: "assets/sgk/hinh-5-25.jpg",
      content: {
        heading: "📥 Tập hợp nội dung vào một tệp",
        prompt: "Trong các bài học trước, các em đã tạo các tệp văn bản chứa nội dung cuốn sổ lưu niệm như: bài viết cảm nghĩ, danh sách thành viên,… Hãy khởi tạo tệp văn bản mới Soluuniem.docx và tập hợp các nội dung đó vào.",
        revealLabel: "👀 Các bước & Hình 5.25",
        blocks: [
          { kind: "list", value: [
            "① Nháy chuột vào thẻ Insert.",
            "② Trong nhóm lệnh Text, chọn Object ▾ (nháy mũi tên bên cạnh).",
            "③ Chọn Text from File… → hộp thoại Insert File hiện ra: chọn tệp cần đưa vào rồi nháy Insert.",
          ] },
          { kind: "image", value: "assets/sgk/hinh-5-25.jpg", caption: "Hình 5.25. Tập hợp nội dung vào một tệp" },
          { kind: "text", value: "Nội dung tệp được chèn vào đúng chỗ con trỏ soạn thảo đang đứng. Lặp lại với từng tệp (bài viết cảm nghĩ, danh sách lớp…) theo thứ tự nhóm đã thống nhất." },
        ],
      },
      questions: [
        { question: "Lệnh Text from File nằm ở đâu?", type: "multiple-choice",
          options: ["Thẻ Insert → nhóm Text → Object ▾", "Thẻ Home → nhóm Editing", "Thẻ Page Layout → nhóm Page Setup", "Thẻ Insert → nhóm Pages"],
          answer: 0, explanation: "① Insert ② nhóm Text, chọn Object ▾ ③ Text from File…", level: "nhan-biet", activity: "buoc-1" },
        { question: "Dùng Text from File có lợi gì so với mở từng tệp rồi gõ lại nội dung?", type: "multiple-choice",
          options: ["Tự động tạo trang bìa", "Tự sửa hết lỗi chính tả", "Đưa cả nội dung tệp vào nhanh, không phải gõ lại, không sót chữ", "Làm cho tệp nhẹ hơn"],
          answer: 2, explanation: "Text from File chèn toàn bộ nội dung một tệp có sẵn vào tệp đang soạn — nhanh, chính xác.", level: "thong-hieu", activity: "buoc-1" },
        { question: "Nhóm Lan muốn bài viết cảm nghĩ nằm sau danh sách lớp trong tệp Soluuniem.docx. Trước khi chọn Text from File, Lan cần:", type: "multiple-choice",
          options: ["Đóng tệp Soluuniem.docx", "Đặt con trỏ soạn thảo ở cuối phần danh sách lớp", "Chọn Cover Page", "Đổi hướng trang ngang"],
          answer: 1, explanation: "Nội dung tệp được chèn tại vị trí con trỏ soạn thảo, nên phải đặt con trỏ đúng chỗ trước.", level: "van-dung", activity: "buoc-1" },
      ],
      remember: ["Tập hợp nội dung: Insert → Text → Object ▾ → Text from File… → chọn tệp → Insert (chèn tại vị trí con trỏ)."],
    },
    {
      id: "ra-soat-so-do", name: "Bước 2. Rà soát nội dung bằng sơ đồ tư duy 🧠", type: "knowledge",
      goal: "Dùng sơ đồ tư duy (Bài 10) để kiểm tra nội dung còn thiếu và phân công thu thập thông tin.",
      time: 420,
      task: "Xem lại sơ đồ tư duy nội dung cuốn sổ lưu niệm (Bài 10): thêm ✅ vào đầu nhánh đã có trong Soluuniem.docx, ⏳ vào nhánh còn thiếu và ghi tên bạn phụ trách (ví dụ “⏳ Văn nghệ — Lan”). Bổ sung nhánh mới nếu cần rồi gửi sơ đồ cho thầy/cô.",
      sgkImage: "assets/sgk/sgk-trang61.jpg",
      links: MM_LINKS,
      mindmap: { key: "rasoat", editable: true, title: "Rà soát nội dung Sổ lưu niệm — nhóm em", root: RA_SOAT,
        submit: "Sơ đồ rà soát nội dung Sổ lưu niệm (Bước 2)",
        intro: "Bấm chọn một nhánh rồi sửa chữ ở ô ✏️: thêm ✅ (đã có) hoặc ⏳ (còn thiếu) và tên bạn phụ trách. Nhánh “?” là chỗ nhóm em tự điền." },
      questions: [
        { question: "SGK nhắc cần đặc biệt bổ sung những thông tin nào? (Chọn các phương án đúng)", type: "multiple-select",
          options: ["Thông tin về các thầy cô giáo", "Các hoạt động lớp đã thực hiện: thể thao, văn hoá, văn nghệ, tham quan,…", "Công thức làm kem sữa chua", "Mật khẩu tài khoản của các bạn"],
          answer: [0, 1], explanation: "Bước 2: phân công thu thập thông tin, hình ảnh bổ sung, đặc biệt về thầy cô giáo và các hoạt động của lớp.", level: "thong-hieu", activity: "ra-soat-so-do" },
      ],
      remember: ["Sơ đồ tư duy giúp nhìn nhanh nội dung đã có, còn thiếu để phân công các bạn thu thập thông tin, hình ảnh."],
    },
    {
      id: "buoc-2", name: "Bước 2. Bổ sung thêm nội dung ➕", type: "knowledge",
      goal: "Biết các thao tác định dạng cần dùng khi soạn thảo nội dung bổ sung.",
      time: 300,
      task: "Nhóm soạn thảo các nội dung bổ sung. Chú ý các thao tác định dạng để văn bản có bố cục hợp lí, đẹp mắt. Trả lời câu hỏi để chọn cách trình bày phù hợp.",
      sgkImage: "assets/sgk/sgk-trang61.jpg",
      content: {
        heading: "➕ Soạn thảo và định dạng nội dung bổ sung",
        revealLabel: "📌 Các thao tác định dạng (SGK tr.61)",
        blocks: [
          { kind: "html", value: `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:10px">${[["🔤", "Định dạng chữ (màu sắc, cỡ chữ,…)"], ["📝", "Căn chỉnh lề đoạn văn bản"], ["📄", "Định dạng hướng trang, lề trang"], ["🖼️", "Bổ sung hình ảnh"], ["📋", "Chèn bảng (nếu cần)"], ["🔍", "Tìm kiếm và Thay thế để chỉnh sửa (nếu cần)"]].map(([i, t]) => `<div style="background:#fff;border:2px solid #5eead4;border-radius:14px;padding:10px 14px;text-align:left;font-size:1.05rem"><span style="font-size:1.6rem">${i}</span> ${t}</div>`).join("")}</div>` },
        ],
      },
      questions: [
        { question: "Nhóm Minh muốn chèn bảng danh sách thành viên câu lạc bộ bóng đá của lớp. Em chọn lệnh nào?", type: "multiple-choice",
          options: ["Insert → Table", "Home → Replace", "Page Layout → Size", "Insert → Cover Page"],
          answer: 0, explanation: "Chèn bảng: thẻ Insert → Table (Bài 12).", level: "thong-hieu", activity: "buoc-2" },
        { question: "Trang “Album ảnh chuyến tham quan” có nhiều ảnh phong cảnh xếp thành hàng ngang. Nên chọn hướng trang nào?", type: "multiple-choice",
          options: ["Trang đứng (Portrait)", "Không cần chọn", "Khổ giấy A5", "Trang ngang (Landscape)"],
          answer: 3, explanation: "Nhiều ảnh phong cảnh xếp hàng ngang → trang ngang giúp bố cục hợp lí.", level: "van-dung", activity: "buoc-2" },
        { question: "Sau khi gộp các tệp, nhóm thấy tên bạn “Văn Ang” bị gõ sai ở nhiều trang, đúng ra là “Văn An”. Cách sửa nhanh, không bỏ sót là:", type: "multiple-choice",
          options: ["Đọc lại từng trang và sửa tay", "Xoá hết rồi gõ lại", "Replace: Find what “Văn Ang”, Replace with “Văn An” → Replace All", "Chọn Cover Page"],
          answer: 2, explanation: "Dùng Tìm kiếm và Thay thế (Bài 13) để sửa đồng loạt, nhanh và không bỏ sót.", level: "van-dung", activity: "buoc-2" },
      ],
      remember: ["Nội dung bổ sung cần định dạng: chữ, lề đoạn, hướng trang, lề trang, hình ảnh, bảng; sửa lỗi bằng Tìm kiếm và Thay thế."],
    },
    {
      id: "du-lieu-ca-nhan", name: "Trò chơi: Bảo vệ dữ liệu cá nhân của bạn 🛡️", type: "dragdrop",
      goal: "Hiểu dữ liệu cá nhân là tài sản riêng; biết tôn trọng thông tin của các bạn khi làm sổ lưu niệm (6.A3.4).",
      time: 150,
      task: "Sổ lưu niệm có ảnh, ngày sinh, sở thích… của các bạn. Xếp mỗi việc làm vào nhóm Nên làm hoặc Không nên làm. Xếp hết rồi bấm Nộp bài.",
      groups: ["✅ Nên làm", "⛔ Không nên làm"],
      items: [
        { text: "Hỏi ý kiến bạn trước khi đưa ảnh, ngày sinh của bạn vào sổ", group: 0 },
        { text: "Chỉ chia sẻ tệp sổ lưu niệm với các bạn trong lớp và thầy cô", group: 0 },
        { text: "Dùng ảnh do lớp tự chụp hoặc ảnh được phép sử dụng", group: 0 },
        { text: "Đăng cả cuốn sổ có địa chỉ, số điện thoại các bạn lên mạng xã hội công khai", group: 1 },
        { text: "Dán ảnh bạn kèm lời chê bai, trêu chọc", group: 1 },
        { text: "Nhập họ tên, ngày sinh, địa chỉ của cả lớp vào công cụ AI mà không hỏi ý kiến", group: 1 },
      ],
      explanation: "Dữ liệu cá nhân là tài sản riêng của mỗi người. Hỏi ý kiến, chia sẻ đúng phạm vi và tôn trọng bạn giúp mọi người an toàn, được tôn trọng trong môi trường số.",
    },
    {
      id: "thuc-hanh-1", name: "Thực hành Bước 1, 2 trên Word 💻", type: "knowledge",
      goal: "Tập hợp các tệp đã có vào Soluuniem.docx và soạn thảo nội dung bổ sung.",
      time: 900,
      task: "Trên Microsoft Word (2 HS/máy): tạo tệp mới, dùng Text from File tập hợp các tệp đã có; soạn thảo nội dung bổ sung theo phân công trong sơ đồ rà soát; định dạng; lưu tệp Soluuniem.docx.",
      sgkImage: "assets/sgk/sgk-trang61.jpg",
      content: {
        heading: "💻 Thực hành trên Microsoft Word",
        revealLabel: "📖 Việc cần làm & gợi ý dùng AI",
        blocks: [
          { kind: "list", value: [
            "① Khởi động Word, tạo tệp mới, lưu với tên Soluuniem.docx.",
            "② Insert → Text → Object ▾ → Text from File…: lần lượt đưa vào bài viết cảm nghĩ, danh sách lớp,…",
            "③ Soạn thảo nội dung bổ sung: thầy cô giáo, hoạt động thể thao, văn hoá, văn nghệ, tham quan,…",
            "④ Định dạng chữ, lề đoạn, hướng trang, lề trang; chèn ảnh, bảng (nếu cần).",
            "⑤ Nhấn Ctrl+S (hoặc File → Save) thường xuyên để không mất bài.",
          ] },
          { kind: "html", value: AI_HTML },
        ],
      },
      questions: [
        { question: "AI gợi ý cho nhóm một lời giới thiệu cho sổ lưu niệm. Nhóm nên làm gì?", type: "multiple-choice",
          options: ["Chép nguyên văn vào sổ", "Đọc, chọn lọc, sửa lại bằng lời của nhóm cho đúng với kỉ niệm của lớp", "Nhờ AI viết cả cuốn sổ", "Không bao giờ đọc gợi ý của AI"],
          answer: 1, explanation: "Gợi ý của AI chỉ để tham khảo; sản phẩm cần thể hiện suy nghĩ, kỉ niệm riêng của lớp — không sao chép máy móc.", level: "van-dung", activity: "thuc-hanh-1" },
      ],
    },

    /* =========================== TIẾT 2 =========================== */
    {
      id: "buoc-3", name: "Bước 3. Tạo trang bìa cho cuốn sổ 🎨", type: "knowledge",
      goal: "Biết dùng Cover Page để tạo trang bìa rồi sửa nội dung, thay hình.",
      time: 300,
      task: "Quan sát Hình 5.26: để tạo trang bìa cho cuốn sổ lưu niệm em thực hiện những bước nào? Sau khi chọn mẫu cần làm gì?",
      sgkImage: "assets/sgk/hinh-5-26.jpg",
      content: {
        heading: "🎨 Tạo trang bìa",
        revealLabel: "👀 Các bước & Hình 5.26",
        blocks: [
          { kind: "list", value: [
            "① Nháy chuột vào thẻ Insert.",
            "② Trong nhóm lệnh Pages, chọn Cover Page.",
            "③ Chọn một mẫu trang bìa.",
            "④ Sửa lại nội dung (năm học, tên sổ “Sổ lưu niệm lớp 6A”…) và thay hình trang bìa.",
          ] },
          { kind: "image", value: "assets/sgk/hinh-5-26.jpg", caption: "Hình 5.26. Tạo trang bìa" },
        ],
      },
      questions: [
        { question: "Lệnh Cover Page nằm ở đâu?", type: "multiple-choice",
          options: ["Thẻ Home, nhóm Paragraph", "Thẻ Page Layout, nhóm Page Setup", "Thẻ Insert, nhóm Pages", "Thẻ Insert, nhóm Text"],
          answer: 2, explanation: "① Insert ② nhóm Pages → Cover Page.", level: "nhan-biet", activity: "buoc-3" },
        { question: "Chọn xong mẫu trang bìa, trên trang bìa còn chữ mẫu [Type the document title] và ảnh đoàn tàu. Em làm gì?", type: "multiple-choice", sgkImage: "assets/sgk/hinh-5-26.jpg",
          options: ["Giữ nguyên cho nhanh", "Xoá trang bìa", "Chọn mẫu khác liên tục", "Gõ tên sổ (ví dụ Sổ lưu niệm lớp 6A), năm học và thay bằng ảnh của lớp"],
          answer: 3, explanation: "④ Sửa lại nội dung và thay hình trang bìa cho đúng với cuốn sổ của lớp.", level: "thong-hieu", activity: "buoc-3" },
      ],
      remember: ["Trang bìa: Insert → Pages → Cover Page → chọn mẫu → sửa nội dung, thay hình."],
    },
    {
      id: "sap-xep-trang-bia", name: "Sắp xếp các bước tạo trang bìa 🔢", type: "ordering",
      goal: "Nhớ đúng trình tự tạo trang bìa.",
      time: 150,
      task: "Sắp xếp các bước tạo trang bìa theo thứ tự đúng (Hình 5.26). Xếp xong bấm Nộp bài.",
      sgkImage: "assets/sgk/hinh-5-26.jpg",
      steps: [
        "Nháy chuột vào thẻ Insert",
        "Trong nhóm lệnh Pages, chọn Cover Page",
        "Chọn một mẫu trang bìa",
        "Sửa lại nội dung và thay hình trang bìa",
      ],
      explanation: "Insert → Pages/Cover Page → chọn mẫu → sửa nội dung, thay hình.",
    },
    {
      id: "thuc-hanh-2", name: "Thực hành Bước 3 & hoàn thiện sản phẩm 💻", type: "knowledge",
      goal: "Tạo trang bìa, sắp xếp và hoàn thiện cuốn sổ lưu niệm trên Word.",
      time: 780,
      task: "Trên Microsoft Word: mở Soluuniem.docx, tạo trang bìa bằng Cover Page (sửa tên sổ, năm học, thay ảnh lớp); sắp xếp lại các phần cho hợp lí; rà soát chính tả bằng Tìm kiếm và Thay thế; lưu tệp.",
      sgkImage: "assets/sgk/sgk-trang62.jpg",
      content: {
        heading: "💻 Hoàn thiện cuốn sổ trên Word",
        html: `<div style="display:flex;justify-content:center"><img src="assets/sgk/hinh-5-27.jpg" alt="Hình 5.27. Cuốn sổ lưu niệm" style="max-width:min(420px,100%);border-radius:14px;box-shadow:0 4px 14px rgba(0,0,0,.12)"></div>`,
        revealLabel: "📖 Gợi ý thứ tự các phần trong cuốn sổ",
        blocks: [
          { kind: "list", value: [
            "Trang bìa → lời giới thiệu → danh sách, giới thiệu thành viên → thầy cô giáo → hoạt động của lớp → bài viết cảm nghĩ → lời chúc.",
            "Thứ tự trên chỉ là gợi ý — nhóm thống nhất bố cục theo ý tưởng riêng, thể hiện dấu ấn của lớp mình.",
          ] },
        ],
      },
      questions: [
        { question: "Chèn ảnh cả lớp vào trang bìa nhưng ảnh quá to, tràn sang trang sau. Em làm gì?", type: "multiple-choice",
          options: ["Chọn ảnh, kéo nút ở góc ảnh để thu nhỏ", "Xoá hết chữ trên trang", "Đổi khổ giấy A3", "Nhấn Enter nhiều lần"],
          answer: 0, explanation: "Chọn ảnh rồi kéo nút ở góc để thay đổi kích thước, giữ đúng tỉ lệ ảnh.", level: "van-dung", activity: "thuc-hanh-2" },
        { question: "Sau khi gộp nhiều tệp, các trang có phông chữ, cỡ chữ khác nhau trông lộn xộn. Nên làm gì?", type: "multiple-choice",
          options: ["Để nguyên vì không quan trọng", "Chọn các phần đó và định dạng lại cho thống nhất phông chữ, cỡ chữ", "Tạo thêm trang bìa", "Đổi sang trang ngang"],
          answer: 1, explanation: "Cuốn sổ cần trình bày thống nhất, hài hoà: định dạng lại phông, cỡ chữ cho các phần tương ứng.", level: "van-dung", activity: "thuc-hanh-2" },
      ],
    },
    {
      id: "tu-kiem-tra", name: "Phiếu tự kiểm tra Soluuniem.docx 📋", type: "checklist",
      goal: "Nhóm tự đánh giá mức độ hoàn thành 4 bước.",
      time: 150,
      task: "Đối chiếu tệp Soluuniem.docx, tick từng việc vào cột Đã làm hoặc Chưa làm, ghi khó khăn gặp phải rồi gửi cho thầy/cô.",
      columns: ["✅ Đã làm", "⏳ Chưa làm"],
      sections: [
        { title: "📥 BƯỚC 1 – 2: TẬP HỢP & BỔ SUNG", items: [
          "Tập hợp được các tệp đã có vào Soluuniem.docx (Text from File)",
          "Bổ sung thông tin về thầy cô giáo",
          "Bổ sung các hoạt động của lớp (thể thao, văn hoá, văn nghệ, tham quan…)",
          "Định dạng chữ, lề đoạn, hướng trang, lề trang hợp lí",
          "Có hình ảnh, có bảng (nếu cần)",
        ] },
        { title: "🎨 BƯỚC 3 – 4: TRANG BÌA & XEM LẠI", items: [
          "Tạo trang bìa bằng Cover Page, sửa tên sổ và thay ảnh",
          "Rà soát lỗi chính tả, từ viết tắt bằng Tìm kiếm và Thay thế",
          "Đã hỏi ý kiến các bạn trước khi đưa ảnh, thông tin cá nhân vào sổ",
          "Lưu tệp Soluuniem.docx",
        ] },
      ],
      note: "Nhóm em gặp khó khăn gì? Đã khắc phục thế nào?",
      modelAnswer: [
        "Lỗi thường gặp: chèn tệp sai vị trí vì quên đặt con trỏ; phông chữ, cỡ chữ không thống nhất; ảnh quá to tràn trang; quên sửa chữ mẫu trên trang bìa; quên lưu tệp.",
        "Khắc phục: đặt con trỏ đúng chỗ trước khi chèn; định dạng lại thống nhất; thu nhỏ ảnh; sửa hết chữ mẫu; lưu tệp thường xuyên (Ctrl+S).",
      ],
    },
    {
      id: "buoc-4", name: "Bước 4. Xem lại nội dung 👀", type: "knowledge",
      goal: "Nhìn lại cuốn sổ với ý nghĩa lưu giữ kỉ niệm; chia sẻ sản phẩm với cả lớp.",
      time: 240,
      task: "Tưởng tượng cả lớp họp lớp khi 50 tuổi, cùng xem lại cuốn sổ và trả lời: “Tại sao chúng ta lại đưa nội dung này vào sổ?”. Các nhóm chia sẻ sản phẩm với cả lớp.",
      sgkImage: "assets/sgk/sgk-trang62.jpg",
      content: {
        heading: "👀 Cuốn sổ sau 40 năm nữa…",
        html: HOP_LOP_HTML,
      },
      questions: [
        { question: "Mục đích chính của cuốn sổ lưu niệm lớp là gì?", type: "multiple-choice",
          options: ["Để nộp lấy điểm cao nhất", "Để thi xem nhóm nào in nhiều trang nhất", "Lưu giữ kỉ niệm học tập, sinh hoạt của lớp để sau này xem lại", "Để luyện gõ phím nhanh"],
          answer: 2, explanation: "Sổ lưu niệm lưu giữ kỉ niệm về bạn bè, thầy cô, hoạt động của lớp — nhiều năm sau xem lại vẫn thấy ý nghĩa.", level: "thong-hieu", activity: "buoc-4" },
        { question: "Khi xem lại sổ, nhóm thấy một trang chỉ có ảnh mạng không liên quan đến lớp. Theo em nên làm gì?", type: "multiple-choice",
          options: ["Thay bằng ảnh, nội dung về kỉ niệm thật của lớp", "Giữ nguyên cho đủ trang", "Thêm nhiều ảnh mạng nữa", "Xoá trang bìa"],
          answer: 0, explanation: "Nội dung đưa vào sổ cần có ý nghĩa với lớp — trả lời được câu hỏi “Tại sao đưa nội dung này vào sổ?”.", level: "van-dung-cao", activity: "buoc-4" },
      ],
      remember: ["Mỗi nội dung trong sổ cần trả lời được câu hỏi “Tại sao đưa nội dung này vào sổ?” — lưu giữ kỉ niệm có ý nghĩa của lớp."],
    },
    {
      id: "cham-cheo", name: "Chấm chéo sản phẩm giữa các nhóm 🤝", type: "checklist",
      goal: "Nhận xét, đánh giá sản phẩm của nhóm bạn theo tiêu chí; góp ý để cuốn sổ chung của lớp đầy đủ, đẹp nhất.",
      time: 300,
      task: "Xem sản phẩm nhóm được phân công, ghi số nhóm được chấm, tick từng tiêu chí Đạt hoặc Cần cải thiện, ghi góp ý rồi gửi cho thầy/cô.",
      target: "Nhóm em chấm sản phẩm của",
      columns: ["✅ Đạt", "🔧 Cần cải thiện"],
      sections: [
        { title: "📚 NỘI DUNG", items: [
          "Có trang bìa với tên sổ, tên lớp, hình ảnh",
          "Có giới thiệu thành viên hoặc danh sách lớp",
          "Có thông tin về thầy cô giáo",
          "Có các hoạt động của lớp (thể thao, văn nghệ, tham quan…)",
          "Có bài viết cảm nghĩ, lời chúc",
        ] },
        { title: "🎨 TRÌNH BÀY", items: [
          "Chữ rõ ràng, màu sắc và cỡ chữ hài hoà, thống nhất",
          "Căn lề đoạn, hướng trang, lề trang hợp lí",
          "Hình ảnh rõ nét, đúng chủ đề, vừa trang",
          "Không còn lỗi chính tả, từ viết tắt",
        ] },
      ],
      note: "Góp ý cho nhóm bạn: một điều em thích nhất và một điều nên sửa",
      modelAnswer: [
        "Góp ý cụ thể, lịch sự, tôn trọng sản phẩm của bạn: nêu điểm tốt trước, rồi đến điểm nên sửa kèm cách sửa.",
        "Ví dụ: “Trang bìa rất đẹp, ảnh cả lớp rõ nét. Nên bổ sung trang về thầy cô và sửa phông chữ các trang cho thống nhất.”",
      ],
    },

    /* ===================== HĐ3: LUYỆN TẬP ===================== */
    {
      id: "luyen-tap", name: "Luyện tập: Lỗi thường gặp & cách khắc phục 🛠️", type: "knowledge",
      goal: "Nhận ra lỗi thường gặp khi hoàn thiện sổ lưu niệm và cách khắc phục để tiếp tục hoàn thiện sản phẩm.",
      time: 300,
      task: "Nhóm đọc từng tình huống, chọn cách khắc phục đúng; sau đó tiếp tục sửa sản phẩm trên Word theo góp ý của nhóm bạn và thầy/cô.",
      questions: [
        { question: "Nhóm Hà chèn bài viết cảm nghĩ bằng Text from File nhưng nội dung lại nằm giữa bảng danh sách lớp. Nguyên nhân là gì?", type: "multiple-choice",
          options: ["Tệp bài viết bị hỏng", "Con trỏ soạn thảo đang đặt trong bảng khi chèn", "Chưa tạo trang bìa", "Máy tính chưa kết nối Internet"],
          answer: 1, explanation: "Text from File chèn nội dung tại vị trí con trỏ. Cần đặt con trỏ ở ngoài, sau bảng rồi mới chèn.", level: "van-dung", activity: "luyen-tap" },
        { question: "Trang bìa đã có, nhưng vẫn còn dòng chữ mẫu tiếng Anh của Word. Đây là lỗi quên bước nào?", type: "multiple-choice",
          options: ["Bước 1: tập hợp nội dung", "Bước 2: bổ sung nội dung", "Sửa lại nội dung và thay hình trang bìa (Bước 3)", "Lưu tệp"],
          answer: 2, explanation: "Bước 3 ④: sau khi chọn mẫu phải sửa lại nội dung và thay hình trang bìa.", level: "thong-hieu", activity: "luyen-tap" },
        { question: "Trong phòng máy, sắp hết giờ mà nhóm chưa lưu tệp. Việc cần làm ngay là:", type: "multiple-choice",
          options: ["Tắt máy luôn", "Tạo thêm trang bìa mới", "Đóng Word và chọn Don't Save", "Nhấn Ctrl+S (File → Save) để lưu Soluuniem.docx"],
          answer: 3, explanation: "Lưu tệp để không mất sản phẩm; nên lưu thường xuyên trong khi làm.", level: "nhan-biet", activity: "luyen-tap" },
        { question: "Cuốn sổ lưu niệm của lớp có thể thể hiện dấu ấn riêng của nhóm qua cách chọn nội dung, bố cục trang bìa và lời văn của chính các bạn.", type: "true-false", answer: true,
          explanation: "Đúng. Sản phẩm không sao chép máy móc mà thể hiện ý tưởng, cá tính của nhóm và của lớp.", level: "thong-hieu", activity: "luyen-tap" },
      ],
    },

    /* ===================== HĐ4: VẬN DỤNG ===================== */
    {
      id: "van-dung", name: "Vận dụng: Rà soát lỗi chính tả trong sổ lưu niệm 🔍", type: "knowledge",
      goal: "Dùng Tìm kiếm và Thay thế để sửa lỗi chính tả, từ viết tắt, giúp các tệp sổ lưu niệm hoàn chỉnh hơn.",
      time: 180,
      task: "Xem lại các tệp văn bản của cuốn sổ lưu niệm để rà soát lỗi chính tả. Chọn cách dùng Tìm kiếm và Thay thế phù hợp cho từng tình huống.",
      questions: [
        { question: "Trong sổ, bạn Nam viết tắt “GVCN” ở nhiều chỗ. Để thay bằng “giáo viên chủ nhiệm”, Nam gõ vào hộp thoại Find and Replace thế nào?", type: "multiple-choice",
          options: ["Find what: giáo viên chủ nhiệm · Replace with: GVCN", "Find what: GVCN · Replace with: giáo viên chủ nhiệm", "Find what: GV · Replace with: giáo viên", "Chỉ gõ GVCN vào ô Replace with"],
          answer: 1, explanation: "Find what: từ cần tìm (GVCN). Replace with: từ thay thế (giáo viên chủ nhiệm).", level: "van-dung", activity: "van-dung" },
        { question: "Vì sao không nên Replace All chữ “k” thành “không”?", type: "multiple-choice",
          options: ["Vì chữ k còn nằm trong nhiều từ khác (kem, kỉ niệm, Khoa…) nên sẽ bị sửa nhầm", "Vì Word không có nút Replace All", "Vì Replace All chỉ thay được 1 chỗ", "Vì chữ “không” quá dài"],
          answer: 0, explanation: "Từ, kí tự ngắn dễ nằm trong từ khác → dùng Replace để xem và thay từng chỗ.", level: "van-dung-cao", activity: "van-dung" },
      ],
      remember: ["Tìm kiếm và Thay thế giúp rà soát, sửa lỗi chính tả, thay từ viết tắt để các tệp văn bản hoàn chỉnh hơn."],
    },
    {
      id: "van-dung-nhom", name: "Vận dụng: Cuốn sổ của lớp em ✍️", type: "vandung",
      goal: "Giải thích ý nghĩa nội dung đưa vào sổ; lập kế hoạch hoàn thiện sản phẩm ở nhà.",
      time: 180,
      task: "Nhóm trả lời các câu hỏi và gửi cho thầy/cô. Tiếp tục hoàn thiện cuốn sổ lưu niệm ở nhà (có thể).",
      intro: "Gửi câu trả lời cho thầy/cô rồi bấm để xem gợi ý.",
      cases: [
        { question: "Bước 4: Chọn một nội dung trong cuốn sổ của nhóm em và trả lời: “Tại sao chúng ta lại đưa nội dung này vào sổ?”",
          answer: "Ví dụ: đưa trang “Hội khoẻ Phù Đổng” vào sổ vì đó là lần cả lớp cùng cổ vũ, đoàn kết giành giải; 40 năm sau xem lại vẫn nhớ tình bạn, nhớ thầy cô." },
        { question: "Ở nhà, nhóm em sẽ hoàn thiện thêm những gì (nội dung, hình ảnh, lỗi chính tả cần sửa bằng Tìm kiếm và Thay thế)? Ai phụ trách?",
          answer: "Ví dụ: Lan bổ sung ảnh buổi tham quan; Minh viết lời chúc gửi thầy cô; Khoa dùng Replace sửa “GVCN” → “giáo viên chủ nhiệm”, kiểm tra lại chính tả; cả nhóm hỏi ý kiến các bạn trước khi đưa ảnh vào sổ." },
      ],
    },

    /* ===================== TỔNG KẾT ===================== */
    {
      id: "tong-ket", name: "Tổng kết", type: "summary",
      task: "Cả lớp nhắc lại 4 bước hoàn thiện sổ lưu niệm và làm thử thách cuối. Dặn dò: hoàn thiện Soluuniem.docx; khi tắt máy kiểm tra thiết bị, giữ vệ sinh, an toàn điện trong phòng Tin học.",
      content: {
        learned: [
          "Bước 1 — Tập hợp nội dung vào Soluuniem.docx: Insert → Text → Object ▾ → Text from File…",
          "Bước 2 — Bổ sung nội dung (thầy cô, hoạt động của lớp…) và định dạng: chữ, lề đoạn, hướng trang, lề trang, ảnh, bảng, Tìm kiếm và Thay thế.",
          "Bước 3 — Tạo trang bìa: Insert → Pages → Cover Page → chọn mẫu → sửa nội dung, thay hình.",
          "Bước 4 — Xem lại nội dung: “Tại sao chúng ta lại đưa nội dung này vào sổ?”; chia sẻ, góp ý giữa các nhóm.",
          "Dữ liệu cá nhân là tài sản riêng — hỏi ý kiến bạn, chia sẻ đúng phạm vi.",
        ],
        challenge: [
          { question: "Nhóm có 3 tệp: DanhSachLop.docx, CamNghiVeBan.docx, HoatDong.docx. Muốn có một cuốn sổ hoàn chỉnh có trang bìa, thứ tự làm hợp lí nhất là:", type: "multiple-choice",
            options: ["Tạo trang bìa → xoá các tệp cũ", "Tạo tệp Soluuniem.docx → Text from File lần lượt 3 tệp → bổ sung, định dạng → Cover Page → xem lại", "Gõ lại cả 3 tệp vào tệp mới", "In 3 tệp rồi đóng thành sổ"],
            answer: 1, explanation: "Đúng 4 bước: tập hợp (Text from File) → bổ sung, định dạng → trang bìa (Cover Page) → xem lại.", level: "van-dung-cao", activity: "tong-ket" },
          { question: "Lệnh nào dùng để tạo trang bìa?", type: "multiple-choice",
            options: ["Text from File", "Replace All", "Orientation", "Cover Page"],
            answer: 3, explanation: "Insert → Pages → Cover Page.", level: "nhan-biet", activity: "tong-ket" },
        ],
      },
    },
  ],
};

if (typeof module !== "undefined" && module.exports) module.exports = LESSON;
if (typeof window !== "undefined") window.LESSON = LESSON;
