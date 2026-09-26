/* ============================================================================
 * BÀI 10 — SƠ ĐỒ TƯ DUY  (Tin học 6 — Kết nối tri thức)
 * Chủ đề 5: Ứng dụng tin học.
 * Bám sát SGK trang 42–47 + Kế hoạch bài dạy của giáo viên.
 * Chỉ sửa file này để đổi nội dung. Engine app.js không cần sửa.
 * Sơ đồ tư duy MÔ PHỎNG ngay trong app (thêm nhánh, sửa chữ, gửi GV) + hướng dẫn phần mềm thật MindMaple Lite.
 * ==========================================================================*/

// ---- Phần mềm (đường link do giáo viên ghi trong giáo án) ----
const MM_LINKS = [
  { label: "MindMaple Lite — trang tải phần mềm", url: "https://mindmaple-lite.vi.softonic.com/", note: "(mở tab mới)" },
];

// ---- Hình 5.2 dựng lại bằng sơ đồ tư duy tương tác ----
const HINH_5_2 = { text: "Sơ đồ tư duy", children: [
  { text: "Người sáng tạo", children: [{ text: "Tony Buzan" }, { text: "Quốc tịch Anh" }, { text: "Sinh năm 1942" }] },
  { text: "Lợi ích", children: [{ text: "Nhìn thấy bức tranh tổng thể" }, { text: "Dễ dàng ghi nhớ" }, { text: "Thúc đẩy tư duy" }, { text: "Tăng khả năng sáng tạo" }, { text: "Đơn giản, dễ hiểu" }, { text: "Tiết kiệm thời gian" }] },
  { text: "Làm gì?", children: [{ text: "Ghi nhớ thông tin" }, { text: "Tổ chức thông tin", children: [{ text: "Chủ đề chính" }, { text: "Chủ đề nhánh" }] }] },
  { text: "Thành phần", children: [{ text: "Từ khoá" }, { text: "Hình ảnh" }, { text: "Đường nối" }] },
] };

// ---- Sổ lưu niệm lớp 6A (SGK tr.46): điểm xuất phát cho phần thực hành ----
const SO_LUU_NIEM = { text: "📖 SỔ LƯU NIỆM\nLỚP 6A", children: [
  { text: "👥 Giới thiệu thành viên", children: [{ text: "Họ tên" }, { text: "Ngày sinh" }, { text: "Địa chỉ liên lạc" }, { text: "Ảnh" }, { text: "Sở thích" }] },
  { text: "👩‍🏫 Giáo viên", children: [{ text: "Giáo viên chủ nhiệm" }, { text: "?" }, { text: "?" }] },
  { text: "?", children: [] },
  { text: "🎉 Hoạt động, sự kiện", children: [{ text: "?" }, { text: "?" }, { text: "?" }, { text: "?" }] },
  { text: "✍️ Các bài viết cảm nghĩ", children: [{ text: "Về bạn" }, { text: "Về trường lớp" }, { text: "?" }, { text: "?" }] },
] };

// ---- Vận dụng (SGK tr.47): An toàn thông tin trên Internet ----
const ATTT = { text: "An toàn thông tin\ntrên Internet", children: [
  { text: "🚩 Tác hại, nguy cơ", children: [{ text: "😟 Thông tin cá nhân bị lộ hoặc bị đánh cắp", box: true }, { text: "💻 Máy tính bị nhiễm virus hay mã độc", box: true }, { text: "🦊 Bị lừa đảo, dụ dỗ, đe doạ, bắt nạt trên mạng", box: true }, { text: "?", box: true }, { text: "?", box: true }] },
  { text: "?", children: [{ text: "① Giữ an toàn", children: [{ text: "Bảo mật thông tin cá nhân", box: true }] }, { text: "② Không gặp gỡ", children: [{ text: "?", box: true }] }, { text: "?" }, { text: "?" }, { text: "?" }] },
  { text: "?", children: [{ text: "?", box: true }] },
] };

// ---- Hội thoại mở đầu ----
const TRO_CHUYEN_HTML = `<div style="display:flex;flex-direction:column;gap:10px;max-width:760px;margin:0 auto">
  <div style="text-align:center;font-size:1.1rem;color:#9a3412">⏳ Cỗ máy thời gian đưa An, Minh và Khoa gặp nhau ở tương lai, khi cả ba bạn đã 50 tuổi…</div>
  ${[["👨‍🦳", "Minh", "Ngày xưa lớp mình cũng hăng hái tham gia nhiều hoạt động nhỉ.", "#dbeafe", "flex-start"],
    ["👩‍🦳", "An", "Ừ, vì thế mà chúng mình có rất nhiều kỉ niệm.", "#fce7f3", "flex-end"],
    ["👴", "Khoa", "Này các bạn, nhiều lúc nhớ về những kỉ niệm xưa, khi chúng ta học cùng nhau, tớ lục tìm tư liệu mà chẳng lưu giữ được gì. Giá hồi đó lớp mình làm một cuốn sổ lưu niệm của lớp, ghi lại các hình ảnh, thông tin, kỉ niệm,… thì tốt quá!", "#dcfce7", "flex-start"]]
    .map(([ic, n, t, bg, al]) => `<div style="align-self:${al};max-width:85%;display:flex;gap:10px;align-items:flex-start"><span style="font-size:2.2rem">${ic}</span><div style="background:${bg};border-radius:16px;padding:10px 14px;font-size:1.1rem"><b>${n}:</b> ${t}</div></div>`).join("")}
</div>`;

// ---- Hình 5.1 (văn bản) ----
const HINH_5_1_TEXT = "Tony Buzan (sinh năm 1942 tại Luân Đôn, Anh) là người sáng tạo ra sơ đồ tư duy. Sơ đồ tư duy là một phương pháp ghi nhớ, sắp xếp và lưu trữ thông tin. Thông tin được chia thành các chủ đề chính, chủ đề nhánh có mối quan hệ, liên kết với nhau. Sơ đồ tư duy dùng các từ khoá, hình ảnh để gợi nhớ và các đường nối để biểu diễn thông tin. Mỗi hình ảnh và từ khoá trong sơ đồ tư duy giúp ghi nhớ thông tin, làm nảy sinh những ý tưởng mới, thúc đẩy tư duy và tăng khả năng sáng tạo. Nhờ sơ đồ tư duy, người xem có được cái nhìn tổng thể về vấn đề, nhanh chóng và dễ dàng nắm bắt được thông tin, do đó dễ dàng ghi nhớ và tiết kiệm thời gian.";

// ---- Các bước tạo sơ đồ tư duy (SGK tr.44) ----
const CACH_TAO_HTML = `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px">
  ${[["1️⃣", "Viết chủ đề chính ở giữa tờ giấy, bao quanh bằng hình chữ nhật, elip…", "#f97316"], ["2️⃣", "Từ chủ đề chính, vẽ các chủ đề nhánh", "#0ea5e9"], ["3️⃣", "Phát triển thông tin chi tiết cho mỗi chủ đề nhánh — dùng từ khoá hoặc hình ảnh", "#16a34a"], ["4️⃣", "Tạo thêm nhánh con khi bổ sung thông tin — sơ đồ mở rộng về mọi phía", "#a855f7"]]
    .map(([i, t, c]) => `<div style="border:3px solid ${c};border-radius:16px;padding:12px 14px;background:#fff;font-size:1.1rem"><div style="font-size:1.8rem">${i}</div>${t}</div>`).join("")}
</div>
<div style="margin:12px auto 0;max-width:520px;background:#fef08a;border-radius:6px;padding:10px 16px;transform:rotate(-1.5deg);box-shadow:0 4px 10px rgba(0,0,0,.15);font-size:1.1rem">📌 Nên sử dụng màu sắc khi tạo sơ đồ tư duy vì màu sắc có tác dụng kích thích não bộ.</div>`;

const LESSON = {
  meta: {
    subject: "Tin học", grade: "6", book: "Kết nối tri thức với cuộc sống",
    title: "Bài 10: Sơ đồ tư duy", unit: "Chủ đề 5 — Ứng dụng tin học",
    pages: "42–47", durationMinutes: 90,
  },
  objectives: {
    knowledge: [
      "Sắp xếp được một cách lôgic và trình bày được dưới dạng sơ đồ tư duy các ý tưởng, khái niệm.",
      "Giải thích được lợi ích của sơ đồ tư duy, nêu được nhu cầu sử dụng phần mềm sơ đồ tư duy trong học tập và trao đổi thông tin.",
      "Tạo được sơ đồ tư duy đơn giản bằng phần mềm.",
    ],
    competencies: [
      "Tự chủ, tự học; giao tiếp, hợp tác (làm việc nhóm tạo và phân tích sơ đồ tư duy); giải quyết vấn đề, sáng tạo.",
      "Năng lực số 3.1.TC1a: dùng phần mềm sơ đồ tư duy tạo chủ đề trung tâm, nhánh chính – nhánh phụ; thêm, sửa, xoá nội dung; lưu sản phẩm.",
      "Năng lực số 5.2.TC1a: nhận biết khi nào nên dùng sơ đồ tư duy; xác định nội dung chính – phụ trước khi vẽ.",
      "Năng lực AI 6.C1.2: mô tả ví dụ cơ bản về các bước hoạt động chính của công cụ AI (nhận câu lệnh → xử lí → đưa ra gợi ý); dùng AI có trách nhiệm.",
    ],
    qualities: ["Nhân ái, chăm chỉ, trung thực, trách nhiệm, kỉ luật khi sử dụng thiết bị và phần mềm."],
  },
  coreKnowledge: [
    "Sơ đồ tư duy là phương pháp trình bày thông tin một cách trực quan bằng cách sử dụng văn bản, hình ảnh và các đường nối.",
    "Sơ đồ tư duy tận dụng tối đa khả năng ghi nhận hình ảnh của bộ não, giúp dễ dàng ghi nhớ chi tiết, tổng hợp hay phân tích vấn đề; nhìn thấy bức tranh tổng thể, sáng tạo hơn.",
    "Thành phần: chủ đề chính, chủ đề nhánh (nhánh con) — dùng từ khoá, hình ảnh, đường nối, màu sắc.",
    "Các bước tạo: viết chủ đề chính ở giữa → vẽ các chủ đề nhánh → phát triển chi tiết cho mỗi nhánh → thêm nhánh con khi bổ sung (mở rộng mọi phía).",
    "Phần mềm sơ đồ tư duy (MindMaple Lite, FreeMind…) giúp tạo sơ đồ dễ dàng, nhanh chóng; dễ sửa chữa, điều chỉnh; nhanh chóng chia sẻ và trao đổi.",
  ],
  keywords: ["Chủ đề chính", "Chủ đề nhánh", "Từ khoá", "Hình ảnh & màu sắc", "MindMaple Lite"],
  settings: { basePoints: 100, useTimer: false, defaultTime: 60, sound: true, streakEnabled: true },

  activities: [
    /* =========================== TIẾT 1 =========================== */
    /* ===================== HĐ1: MỞ ĐẦU ===================== */
    {
      id: "mo-dau", name: "Mở đầu — Cỗ máy thời gian ⏳", type: "knowledge",
      goal: "Gợi nhu cầu ghi lại, sắp xếp thông tin về lớp học — ý tưởng làm sổ lưu niệm.",
      time: 240,
      task: "Đọc câu chuyện của An, Minh và Khoa. Chọn những thông tin nên có trong cuốn sổ lưu niệm của lớp.",
      sgkImage: "assets/sgk/sgk-trang42.jpg",
      content: {
        heading: "⏳ Gặp lại nhau khi 50 tuổi",
        html: TRO_CHUYEN_HTML,
      },
      questions: [
        { question: "Cuốn sổ lưu niệm của lớp nên có những thông tin nào? (Chọn các phương án đúng)", type: "multiple-select",
          options: ["Ảnh và họ tên các bạn trong lớp", "Các bài viết cảm nghĩ về bạn, về trường lớp", "Mật khẩu tài khoản mạng xã hội của các bạn", "Các hoạt động, sự kiện của lớp", "Thông tin về thầy cô giáo"],
          answer: [0, 1, 3, 4], explanation: "Sổ lưu niệm ghi lại hình ảnh, thông tin, kỉ niệm của lớp. Không bao giờ ghi mật khẩu — nhớ quy tắc Giữ an toàn (Bài 9)!", level: "thong-hieu", activity: "mo-dau" },
      ],
      remember: ["Có rất nhiều thông tin về lớp cần ghi lại. Làm sao sắp xếp chúng thật gọn gàng, dễ nhớ? — Hãy dùng sơ đồ tư duy!"],
    },
    {
      id: "hd1-so-luu-niem", name: "Hoạt động 1: Sổ lưu niệm của lớp 📖", type: "vandung",
      goal: "Tưởng tượng và nêu những thông tin sổ lưu niệm của lớp nên có.",
      time: 300,
      task: "Hoạt động 1 (SGK tr.42): nhóm thảo luận, thống nhất kết quả trên phiếu học tập rồi gửi câu trả lời cho thầy/cô.",
      sgkImage: "assets/sgk/hoat-dong-1.jpg",
      intro: "Gửi câu trả lời cho thầy/cô rồi bấm để xem gợi ý.",
      cases: [
        { question: "Hãy tưởng tượng khi 50 tuổi, em tìm thấy cuốn sổ lưu niệm đã cũ của lớp mình. Hãy viết ra ba điều mà cuốn sổ làm em thích thú, một điều làm em hạnh phúc và một điều gợi lại cho em kỉ niệm buồn.",
          answer: "Gợi ý: Thích thú — ảnh cả lớp đi dã ngoại, những lời chúc ngộ nghĩnh của các bạn, bức vẽ chân dung thầy cô; Hạnh phúc — lớp đạt giải văn nghệ, cả lớp cùng nhau cố gắng; Buồn — ngày chia tay một bạn chuyển trường. (Mỗi bạn có câu trả lời riêng.)" },
        { question: "Theo em, sổ lưu niệm sẽ gồm những thông tin gì?",
          answer: "Giới thiệu thành viên (họ tên, ngày sinh, địa chỉ liên lạc, ảnh, sở thích); giáo viên (giáo viên chủ nhiệm, giáo viên bộ môn); các hoạt động, sự kiện của lớp; các bài viết cảm nghĩ (về bạn, về trường lớp)…" },
      ],
    },

    /* ===================== HĐ2.1: SƠ ĐỒ TƯ DUY ===================== */
    {
      id: "gioi-thieu", name: "Sơ đồ tư duy là gì? (Hình 5.1) 🧠", type: "knowledge",
      goal: "Đọc hiểu đoạn giới thiệu về sơ đồ tư duy và tìm các ý chính.",
      time: 300,
      task: "Nhóm đọc đoạn giới thiệu (Hình 5.1), gạch chân các từ khoá quan trọng và trả lời câu hỏi.",
      sgkImage: "assets/sgk/hinh-5-1.jpg",
      content: {
        heading: "🧠 Giới thiệu sơ đồ tư duy",
        prompt: HINH_5_1_TEXT,
        revealLabel: "🖼️ Xem Hình 5.1 trong SGK",
        blocks: [{ kind: "image", value: "assets/sgk/hinh-5-1.jpg", caption: "Hình 5.1. Giới thiệu sơ đồ tư duy" }],
      },
      questions: [
        { question: "Ai là người sáng tạo ra sơ đồ tư duy?", type: "multiple-choice",
          options: ["Bill Gates", "Thomas Edison", "Isaac Newton", "Tony Buzan"],
          answer: 3, explanation: "Tony Buzan (sinh năm 1942 tại Luân Đôn, Anh) là người sáng tạo ra sơ đồ tư duy.", level: "nhan-biet", activity: "gioi-thieu" },
        { question: "Sơ đồ tư duy dùng những gì để biểu diễn thông tin? (Chọn các phương án đúng)", type: "multiple-select",
          options: ["Từ khoá", "Những đoạn văn thật dài", "Hình ảnh", "Các đường nối"],
          answer: [0, 2, 3], explanation: "Sơ đồ tư duy dùng các từ khoá, hình ảnh để gợi nhớ và các đường nối để biểu diễn thông tin — không viết đoạn văn dài.", level: "nhan-biet", activity: "gioi-thieu" },
      ],
    },
    {
      id: "xay-so-do", name: "Trò chơi: Xếp ý vào nhánh sơ đồ 🌿", type: "dragdrop",
      goal: "Biểu diễn nội dung đoạn văn Hình 5.1 thành các nhánh của sơ đồ tư duy.",
      time: 300,
      task: "Nhóm xếp mỗi ý (lấy từ đoạn văn Hình 5.1) vào đúng chủ đề nhánh của sơ đồ tư duy “Sơ đồ tư duy”. Xếp hết rồi bấm Nộp bài.",
      sgkImage: "assets/sgk/hinh-5-1.jpg",
      groups: ["👤 Người sáng tạo", "🧩 Thành phần", "⭐ Lợi ích", "🛠️ Làm gì?"],
      items: [
        { text: "Tony Buzan", group: 0 },
        { text: "Quốc tịch Anh", group: 0 },
        { text: "Sinh năm 1942", group: 0 },
        { text: "Từ khoá", group: 1 },
        { text: "Hình ảnh", group: 1 },
        { text: "Đường nối", group: 1 },
        { text: "Nhìn thấy bức tranh tổng thể", group: 2 },
        { text: "Dễ dàng ghi nhớ", group: 2 },
        { text: "Tăng khả năng sáng tạo", group: 2 },
        { text: "Tiết kiệm thời gian", group: 2 },
        { text: "Ghi nhớ thông tin", group: 3 },
        { text: "Tổ chức thông tin", group: 3 },
      ],
      explanation: "Người sáng tạo: Tony Buzan, quốc tịch Anh, sinh năm 1942 · Thành phần: từ khoá, hình ảnh, đường nối · Lợi ích: nhìn thấy bức tranh tổng thể, dễ ghi nhớ, tăng khả năng sáng tạo, tiết kiệm thời gian… · Làm gì: ghi nhớ thông tin, tổ chức thông tin (Hình 5.2).",
    },
    {
      id: "hd2-quan-sat", name: "Hoạt động 2: Quan sát sơ đồ tư duy (Hình 5.2) 👀", type: "knowledge",
      goal: "Nhận biết chủ đề chính, chủ đề nhánh, ý chi tiết và lợi ích của sơ đồ tư duy.",
      time: 420,
      task: "Hoạt động 2 (SGK tr.43): quan sát sơ đồ tư duy Hình 5.2 (dựng lại bên dưới) và trả lời 4 câu hỏi.",
      sgkImage: "assets/sgk/hinh-5-2.jpg",
      mindmap: { title: "Hình 5.2. Sơ đồ tư duy", root: HINH_5_2, intro: "So sánh với đoạn văn Hình 5.1 — cách nào dễ nhìn, dễ nhớ hơn?" },
      content: {
        heading: "👀 Văn bản hay sơ đồ tư duy?",
        revealLabel: "📌 Chốt kiến thức",
        blocks: [
          { kind: "list", value: ["Sơ đồ tư duy là phương pháp trình bày thông tin một cách trực quan bằng cách sử dụng văn bản, hình ảnh và các đường nối.", "Sơ đồ tư duy tận dụng tối đa khả năng ghi nhận hình ảnh của bộ não, giúp chúng ta dễ dàng ghi nhớ chi tiết, tổng hợp hay phân tích vấn đề."] },
          { kind: "text", value: "🤖 Mở rộng: có thể hỏi AI “Nêu các thành phần của một sơ đồ tư duy và giải thích chức năng của từng thành phần” — nhưng hãy tự quan sát, tự làm trước rồi mới dùng AI để đối chiếu." },
        ],
      },
      questions: [
        { question: "1. Cách biểu diễn nào dễ hiểu, dễ nhớ và thú vị hơn?", type: "multiple-choice",
          options: ["Sơ đồ tư duy (Hình 5.2)", "Đoạn văn bản (Hình 5.1)", "Hai cách như nhau", "Không cách nào dễ nhớ"],
          answer: 0, explanation: "Sơ đồ tư duy dùng từ khoá ngắn, hình ảnh, đường nối và màu sắc nên dễ nhìn, dễ nhớ, thú vị hơn văn bản dài.", level: "thong-hieu", activity: "hd2-quan-sat" },
        { question: "2. Sử dụng sơ đồ tư duy có lợi ích gì? (Chọn các phương án đúng)", type: "multiple-select",
          options: ["Nhìn thấy bức tranh tổng thể", "Dễ dàng ghi nhớ", "Máy tính chạy nhanh hơn", "Thúc đẩy tư duy, tăng khả năng sáng tạo", "Tiết kiệm thời gian"],
          answer: [0, 1, 3, 4], explanation: "Nhánh “Lợi ích”: nhìn thấy bức tranh tổng thể, dễ dàng ghi nhớ, thúc đẩy tư duy, tăng khả năng sáng tạo, đơn giản, dễ hiểu, tiết kiệm thời gian.", level: "nhan-biet", activity: "hd2-quan-sat" },
        { question: "3. Tên chủ đề chính của sơ đồ Hình 5.2 là gì?", type: "multiple-choice",
          options: ["Tony Buzan", "Lợi ích", "Sơ đồ tư duy", "Thành phần"],
          answer: 2, explanation: "Chủ đề chính nằm ở giữa, được bao quanh bằng hình elip: “Sơ đồ tư duy”.", level: "nhan-biet", activity: "hd2-quan-sat" },
        { question: "3. Đâu là các chủ đề nhánh (triển khai trực tiếp từ chủ đề chính)? (Chọn các phương án đúng)", type: "multiple-select",
          options: ["Người sáng tạo", "Lợi ích", "Từ khoá", "Làm gì?", "Thành phần"],
          answer: [0, 1, 3, 4], explanation: "Bốn chủ đề nhánh: Người sáng tạo, Lợi ích, Làm gì?, Thành phần. “Từ khoá” là ý chi tiết của nhánh Thành phần.", level: "thong-hieu", activity: "hd2-quan-sat" },
        { question: "4. Các ý chi tiết của chủ đề nhánh “Thành phần” là gì?", type: "multiple-choice",
          options: ["Ghi nhớ thông tin, tổ chức thông tin", "Tony Buzan, quốc tịch Anh, sinh năm 1942", "Từ khoá, hình ảnh, đường nối", "Chủ đề chính, chủ đề nhánh"],
          answer: 2, explanation: "Nhánh Thành phần gồm: Từ khoá, Hình ảnh, Đường nối.", level: "nhan-biet", activity: "hd2-quan-sat" },
      ],
      remember: ["Sơ đồ tư duy là phương pháp trình bày thông tin một cách trực quan bằng cách sử dụng văn bản, hình ảnh và các đường nối.", "Sơ đồ tư duy tận dụng tối đa khả năng ghi nhận hình ảnh của bộ não, giúp dễ dàng ghi nhớ chi tiết, tổng hợp hay phân tích vấn đề."],
    },
    {
      id: "cau-hoi-tr43", name: "Câu hỏi SGK: Chọn các phương án đúng ✅", type: "knowledge",
      goal: "Củng cố khái niệm và lợi ích của sơ đồ tư duy.",
      time: 180,
      task: "Câu hỏi SGK tr.43: chọn TẤT CẢ các phương án đúng cho mỗi câu.",
      sgkImage: "assets/sgk/cau-hoi-tr43.jpg",
      questions: [
        { question: "1. Sơ đồ tư duy giúp chúng ta: (Chọn các phương án đúng)", type: "multiple-select",
          options: ["Ghi nhớ tốt hơn", "Giải các bài toán", "Sáng tạo hơn", "Nhìn thấy bức tranh tổng thể"],
          answer: [0, 2, 3], explanation: "Sơ đồ tư duy giúp ghi nhớ tốt hơn, sáng tạo hơn, nhìn thấy bức tranh tổng thể. Nó không tự giải các bài toán.", level: "thong-hieu", activity: "cau-hoi-tr43" },
        { question: "2. Sơ đồ tư duy là: (Chọn các phương án đúng)", type: "multiple-select",
          options: ["Một công cụ tổ chức thông tin phù hợp với quá trình tư duy", "Một phương pháp chuyển tải thông tin", "Một cách ghi chép sáng tạo", "Một công cụ soạn thảo văn bản"],
          answer: [0, 1, 2], explanation: "Sơ đồ tư duy là công cụ tổ chức thông tin phù hợp với quá trình tư duy, là phương pháp chuyển tải thông tin và là cách ghi chép sáng tạo. Nó không phải công cụ soạn thảo văn bản.", level: "thong-hieu", activity: "cau-hoi-tr43" },
      ],
    },

    /* ===================== HĐ2.2: CÁCH TẠO SƠ ĐỒ TƯ DUY ===================== */
    {
      id: "cach-tao", name: "Cách tạo sơ đồ tư duy 🖍️", type: "ordering",
      goal: "Nắm các bước tạo sơ đồ tư duy (vẽ tay hoặc bằng phần mềm).",
      time: 180,
      task: "Đọc mục 2 (SGK tr.44). Sắp xếp các bước tạo sơ đồ tư duy theo đúng thứ tự. Xếp xong bấm Nộp bài.",
      sgkImage: "assets/sgk/cach-tao.jpg",
      steps: [
        "Viết chủ đề chính ở giữa tờ giấy, dùng hình chữ nhật, elip… bao xung quanh",
        "Từ chủ đề chính, vẽ các chủ đề nhánh",
        "Phát triển thông tin chi tiết cho mỗi chủ đề nhánh bằng từ khoá hoặc hình ảnh",
        "Tạo thêm nhánh con khi bổ sung thông tin (sơ đồ mở rộng về mọi phía)",
      ],
      explanation: "Chủ đề chính ở giữa → các chủ đề nhánh → chi tiết cho mỗi nhánh (từ khoá, hình ảnh) → thêm nhánh con khi cần. Nên dùng màu sắc vì màu sắc kích thích não bộ.",
    },
    {
      id: "hd3-noi-dung", name: "Hoạt động 3: Nội dung cuốn sổ lưu niệm 📝", type: "knowledge",
      goal: "Tạo sơ đồ tư duy trên giấy về nội dung sổ lưu niệm; nhận ra hạn chế của vẽ thủ công.",
      time: 600,
      task: "Hoạt động 3 (SGK tr.44): nhóm thảo luận nội dung cuốn sổ lưu niệm của lớp, vẽ sơ đồ tư duy trên giấy A4/giấy khổ lớn theo gợi ý Hình 5.3 (có màu sắc, hình ảnh); sau đó trả lời câu hỏi.",
      sgkImage: "assets/sgk/hinh-5-3.jpg",
      content: {
        heading: "📝 Vẽ sơ đồ tư duy trên giấy",
        revealLabel: "🖼️ Các bước & gợi ý Hình 5.3",
        blocks: [
          { kind: "html", value: CACH_TAO_HTML },
          { kind: "image", value: "assets/sgk/hinh-5-3.jpg", caption: "Hình 5.3. Sơ đồ tư duy ghi lại các nội dung có trong cuốn sổ lưu niệm lớp 6A" },
        ],
      },
      questions: [
        { question: "Trong Hình 5.3, chủ đề chính là gì?", type: "multiple-choice",
          options: ["Sổ lưu niệm lớp 6A", "Giáo viên", "Giới thiệu thành viên", "Về bạn"],
          answer: 0, explanation: "Chủ đề chính ở giữa (hình cuốn sổ): Sổ lưu niệm lớp 6A.", level: "nhan-biet", activity: "hd3-noi-dung" },
        { question: "Nhánh “Giới thiệu thành viên” trong Hình 5.3 có những ý chi tiết nào? (Chọn các phương án đúng)", type: "multiple-select",
          options: ["Họ tên", "Ngày sinh", "Giáo viên chủ nhiệm", "Ảnh", "Sở thích"],
          answer: [0, 1, 3, 4], explanation: "Giới thiệu thành viên: Họ tên, Ngày sinh, Địa chỉ liên lạc, Ảnh, Sở thích. “Giáo viên chủ nhiệm” thuộc nhánh Giáo viên.", level: "thong-hieu", activity: "hd3-noi-dung" },
        { question: "Theo em, vẽ sơ đồ tư duy thủ công trên giấy có hạn chế gì? (Chọn các phương án đúng)", type: "multiple-select",
          options: ["Khó sửa chữa, sắp xếp lại, thêm bớt nội dung", "Khó chia sẻ cho nhiều người ở các nơi khác nhau", "Phải vẽ lại khi muốn thay đổi bố cục", "Không thể dùng màu sắc"],
          answer: [0, 1, 2], explanation: "Vẽ trên giấy khó sửa, khó thêm bớt, khó chia sẻ, muốn đổi bố cục phải vẽ lại. Vẽ tay vẫn dùng được bút màu.", level: "thong-hieu", activity: "hd3-noi-dung" },
        { question: "Câu hỏi SGK tr.45: Ưu điểm của việc tạo sơ đồ tư duy thủ công trên giấy là gì?", type: "multiple-choice", sgkImage: "assets/sgk/cau-hoi-tr45.jpg",
          options: ["Dễ sắp xếp, bố trí, thay đổi, thêm bớt nội dung", "Sản phẩm tạo ra dễ dàng sử dụng cho các mục đích khác nhau như: đưa vào bài trình chiếu, gửi cho bạn qua thư điện tử,…", "Sản phẩm tạo ra nhanh chóng, dễ dàng chia sẻ cho nhiều người ở các địa điểm khác nhau", "Có thể thực hiện ở bất cứ đâu, chỉ cần giấy và bút. Thể hiện được phong cách riêng của người tạo"],
          answer: 3, explanation: "Vẽ tay chỉ cần giấy, bút, làm được ở bất cứ đâu và thể hiện phong cách riêng. Các phương án A, B, C là ưu điểm của phần mềm máy tính.", level: "thong-hieu", activity: "hd3-noi-dung" },
      ],
    },
    {
      id: "giay-hay-may", name: "Trò chơi: Vẽ trên giấy hay dùng phần mềm? 🎯", type: "dragdrop",
      goal: "Phân biệt ưu điểm của vẽ sơ đồ tư duy trên giấy và bằng phần mềm máy tính.",
      time: 180,
      task: "Xếp mỗi ưu điểm vào đúng cách tạo sơ đồ tư duy. Xếp hết rồi bấm Nộp bài.",
      groups: ["✏️ Vẽ trên giấy", "💻 Dùng phần mềm máy tính"],
      items: [
        { text: "Chỉ cần giấy và bút", group: 0 },
        { text: "Làm được ở bất cứ đâu, kể cả khi không có máy tính", group: 0 },
        { text: "Thể hiện phong cách riêng qua nét vẽ tay", group: 0 },
        { text: "Dễ sửa chữa, thêm bớt, sắp xếp lại nhánh", group: 1 },
        { text: "Nhanh chóng chia sẻ qua Internet cho thầy cô, bạn bè", group: 1 },
        { text: "Đưa được vào bài trình chiếu, gửi qua thư điện tử", group: 1 },
        { text: "Tạo sơ đồ dễ dàng, nhanh chóng, chính xác", group: 1 },
      ],
      explanation: "Giấy: chỉ cần giấy bút, làm ở bất cứ đâu, thể hiện phong cách riêng. Phần mềm: dễ dàng, nhanh chóng; dễ sửa chữa, điều chỉnh; nhanh chóng chia sẻ, trao đổi.",
    },

    /* =========================== TIẾT 2 =========================== */
    /* ===================== HĐ2.3: THỰC HÀNH TẠO SƠ ĐỒ TƯ DUY BẰNG PHẦN MỀM ===================== */
    {
      id: "phan-mem", name: "Phần mềm sơ đồ tư duy — MindMaple Lite 💻", type: "knowledge",
      goal: "Biết một số phần mềm sơ đồ tư duy; khởi động và làm quen giao diện MindMaple Lite.",
      time: 360,
      task: "Nhóm thảo luận: nêu cách khởi động phần mềm sơ đồ tư duy và giải thích màn hình làm việc (SGK tr.45–46).",
      sgkImage: "assets/sgk/giao-dien-mindmaple.jpg",
      links: MM_LINKS,
      content: {
        heading: "💻 Tạo sơ đồ tư duy bằng phần mềm máy tính",
        prompt: "Có thể tạo sơ đồ tư duy bằng công cụ chèn hình khối, sơ đồ trong phần mềm soạn thảo văn bản, công cụ vẽ hình trong phần mềm xử lí ảnh… Tuy nhiên có nhiều phần mềm chuyên dùng: MindMaple Lite, FreeMind, iMindMap, MindMaple, Mind Manager…",
        revealLabel: "🖼️ Giao diện & tạo sơ đồ mới",
        blocks: [
          { kind: "image", value: "assets/sgk/giao-dien-mindmaple.jpg", caption: "Giao diện phần mềm MindMaple Lite sau khi khởi động" },
          { kind: "image", value: "assets/sgk/tao-moi-mindmaple.jpg", caption: "Tạo sơ đồ mới: ① File → ② New → ③ Chọn một mẫu → ④ Create" },
          { kind: "list", value: ["Khởi động: nháy đúp chuột vào biểu tượng phần mềm trên màn hình nền.", "Sơ đồ mới có chủ đề chính là khung Central Topic — nháy chuột vào khung để nhập tên chủ đề chính.", "Tạo chủ đề nhánh: chọn chủ đề chính → Insert/Subtopic → nháy vào nhánh mới để nhập tên.", "Chú ý: tạo chủ đề nhánh cho chủ đề nào thì nháy chuột chọn chủ đề đó trước khi tạo."] },
        ],
      },
      questions: [
        { question: "Phần mềm nào dưới đây là phần mềm chuyên dùng để tạo sơ đồ tư duy?", type: "multiple-choice",
          options: ["Microsoft Excel", "Paint", "Máy tính cầm tay", "MindMaple Lite"],
          answer: 3, explanation: "MindMaple Lite, FreeMind, iMindMap, Mind Manager… là các phần mềm chuyên dùng tạo sơ đồ tư duy.", level: "nhan-biet", activity: "phan-mem" },
        { question: "Để khởi động phần mềm sơ đồ tư duy, em làm thế nào?", type: "multiple-choice",
          options: ["Nháy đúp chuột vào biểu tượng phần mềm trên màn hình nền", "Tắt máy tính rồi bật lại", "Nháy chuột phải vào thùng rác", "Mở trình duyệt web"],
          answer: 0, explanation: "Nháy đúp chuột vào biểu tượng phần mềm sơ đồ tư duy trên màn hình nền.", level: "nhan-biet", activity: "phan-mem" },
        { question: "Em muốn thêm nhánh con cho chủ đề nhánh “Giáo viên”. Trước khi chọn Insert/Subtopic, em cần:", type: "multiple-choice",
          options: ["Chọn chủ đề chính", "Nháy chuột chọn chủ đề “Giáo viên”", "Lưu tệp", "Chọn File/New"],
          answer: 1, explanation: "Tạo chủ đề nhánh cho chủ đề nào thì nháy chuột chọn chủ đề đó trước khi tạo.", level: "van-dung", activity: "phan-mem" },
      ],
    },
    {
      id: "cac-buoc-phan-mem", name: "Sắp xếp các bước trên phần mềm 🔢", type: "ordering",
      goal: "Nắm quy trình tạo và lưu sơ đồ tư duy bằng MindMaple Lite.",
      time: 180,
      task: "Sắp xếp các thao tác tạo sơ đồ tư duy “SỔ LƯU NIỆM LỚP 6A” trên MindMaple Lite theo đúng thứ tự. Xếp xong bấm Nộp bài.",
      sgkImage: "assets/sgk/tao-moi-mindmaple.jpg",
      steps: [
        "Nháy chuột vào File, chọn New",
        "Chọn một mẫu rồi nháy chuột vào Create",
        "Nháy chuột vào khung Central Topic, nhập tên chủ đề chính SỔ LƯU NIỆM LỚP 6A",
        "Chọn chủ đề chính, chọn Insert/Subtopic để tạo chủ đề nhánh",
        "Nháy chuột vào chủ đề nhánh vừa tạo để nhập tên (Giới thiệu thành viên…)",
        "Chọn File/Save, lưu tệp với tên SoLuuNiem.emm",
      ],
      explanation: "File → New → chọn mẫu → Create → nhập chủ đề chính → Insert/Subtopic tạo nhánh → nhập tên nhánh → File/Save lưu SoLuuNiem.emm.",
    },
    {
      id: "thuc-hanh", name: "Thực hành: Sơ đồ tư duy Sổ lưu niệm lớp em 🧠", type: "knowledge",
      goal: "Tạo sơ đồ tư duy ghi lại nội dung cuốn sổ lưu niệm của lớp bằng phần mềm.",
      time: 900,
      task: "Nhóm tạo sơ đồ tư duy “Sổ lưu niệm lớp em” từ kết quả Hoạt động 3: thay các dấu ? bằng nội dung của nhóm, thêm nhánh nếu cần. Làm trên sơ đồ mô phỏng bên dưới rồi gửi cho thầy/cô; phòng máy có MindMaple Lite thì làm trên phần mềm và lưu SoLuuNiem.emm.",
      sgkImage: "assets/sgk/so-luu-niem-mau.jpg",
      links: MM_LINKS,
      mindmap: { key: "soluuniem", editable: true, title: "SoLuuNiem.emm — sơ đồ tư duy của nhóm em", root: SO_LUU_NIEM,
        submit: "Sơ đồ tư duy Sổ lưu niệm lớp (Thực hành)", intro: "Bấm chọn một nhánh rồi gõ nội dung ở ô ✏️. Nhánh “?” là chỗ nhóm em tự điền. Đổi tên lớp 6A thành lớp của em nhé!" },
      content: {
        heading: "🧠 Thực hành trên phần mềm",
        revealLabel: "📖 Hướng dẫn b), c), d) (SGK tr.46–47)",
        blocks: [
          { kind: "list", value: ["b) Tạo sơ đồ tư duy: File → New → chọn mẫu → Create; nháy vào khung Central Topic nhập SỔ LƯU NIỆM LỚP 6A.", "c) Tạo các chủ đề nhánh: chọn chủ đề chính → Insert/Subtopic → nháy vào nhánh mới nhập tên; làm tương tự cho các nhánh khác.", "d) Ghi lại kết quả: hoàn thành sơ đồ, chọn File/Save và lưu với tên SoLuuNiem.emm."] },
          { kind: "image", value: "assets/sgk/so-luu-niem-mau.jpg", caption: "Sơ đồ tư duy mẫu (SGK tr.46)" },
        ],
      },
      remember: ["Phần mềm máy tính giúp tạo sơ đồ tư duy dễ dàng, nhanh chóng; dễ sửa chữa và điều chỉnh; nhanh chóng chia sẻ và trao đổi."],
    },

    /* ===================== HĐ3: LUYỆN TẬP ===================== */
    {
      id: "nhan-dien", name: "Luyện tập: Sơ đồ tư duy đúng hay sai? 🔍", type: "knowledge",
      goal: "Nhận diện cách tạo sơ đồ tư duy đúng – sai.",
      time: 240,
      task: "Nhóm đọc từng nhận định về cách tạo sơ đồ tư duy và chọn Đúng hoặc Sai.",
      questions: [
        { question: "Chủ đề chính nên đặt ở góc trên bên trái tờ giấy.", type: "true-false", answer: false,
          explanation: "Chủ đề chính viết ở giữa tờ giấy để các nhánh có thể mở rộng về mọi phía.", level: "nhan-biet", activity: "nhan-dien" },
        { question: "Mỗi nhánh nên dùng từ khoá ngắn gọn thay vì viết cả câu dài.", type: "true-false", answer: true,
          explanation: "Từ khoá và hình ảnh giúp gợi nhớ nhanh; câu dài làm sơ đồ rối, khó nhớ.", level: "thong-hieu", activity: "nhan-dien" },
        { question: "Sơ đồ tư duy chỉ được mở rộng về một phía.", type: "true-false", answer: false,
          explanation: "Sơ đồ tư duy có thể mở rộng về mọi phía khi bổ sung thông tin.", level: "nhan-biet", activity: "nhan-dien" },
        { question: "Nên sử dụng màu sắc khi tạo sơ đồ tư duy.", type: "true-false", answer: true,
          explanation: "Màu sắc có tác dụng kích thích não bộ, giúp phân biệt các nhánh.", level: "nhan-biet", activity: "nhan-dien" },
        { question: "Trong sơ đồ Sổ lưu niệm, “Ngày sinh” nên là nhánh con của “Giáo viên chủ nhiệm”.", type: "true-false", answer: false,
          explanation: "“Ngày sinh” là ý chi tiết của nhánh “Giới thiệu thành viên”. Sắp xếp ý đúng nhánh thì sơ đồ mới lôgic.", level: "van-dung", activity: "nhan-dien" },
        { question: "Muốn có sơ đồ thật đẹp, em nên nhờ AI vẽ hộ toàn bộ rồi nộp luôn.", type: "true-false", answer: false,
          explanation: "Hãy tự xây dựng sơ đồ theo ý hiểu trước, rồi mới dùng AI để đối chiếu, bổ sung; không sao chép hoàn toàn và không nhập thông tin cá nhân vào công cụ AI.", level: "van-dung", activity: "nhan-dien" },
      ],
    },
    {
      id: "luyen-tap", name: "Luyện tập SGK: Hoàn thiện sơ đồ Sổ lưu niệm 🎨", type: "knowledge",
      goal: "Bổ sung nhánh, trang trí sơ đồ và chia sẻ để cả lớp thống nhất nội dung.",
      time: 600,
      task: "Luyện tập (SGK tr.47): a) bổ sung các nhánh nội dung (nếu cần); b) chỉnh màu sắc, kiểu đường nối, thêm hình ảnh, biểu tượng (trên sơ đồ mô phỏng: thêm biểu tượng cảm xúc vào đầu nhánh, ví dụ 🎂 📷 🏆); c) gửi sơ đồ cho thầy/cô để cả lớp trao đổi, thống nhất nội dung.",
      sgkImage: "assets/sgk/sgk-trang47.jpg",
      links: MM_LINKS,
      mindmap: { key: "soluuniem", editable: true, title: "SoLuuNiem.emm — bản hoàn thiện", root: SO_LUU_NIEM,
        submit: "Sơ đồ tư duy Sổ lưu niệm lớp — bản hoàn thiện (Luyện tập)" },
      content: {
        heading: "🎨 Sơ đồ đẹp hơn, đầy đủ hơn",
        revealLabel: "💡 Gợi ý",
        blocks: [
          { kind: "list", value: ["Hoạt động, sự kiện: 🎤 Văn nghệ 20/11 · ⚽ Hội khoẻ Phù Đổng · 🚌 Dã ngoại · 🎂 Sinh nhật các bạn.", "Nhánh còn trống “?” có thể là: 🏆 Thành tích của lớp, 📷 Album ảnh, 💌 Lời chúc…", "Trên phần mềm MindMaple Lite: chọn nhánh → thẻ Format để đổi màu, kiểu đường nối; Insert → Picture/Icon để thêm hình ảnh, biểu tượng."] },
        ],
      },
    },

    /* ===================== HĐ4: VẬN DỤNG ===================== */
    {
      id: "ai-goi-y", name: "Mở rộng: Công cụ AI gợi ý sơ đồ thế nào? 🤖", type: "ordering",
      goal: "Mô tả các bước hoạt động chính khi dùng công cụ AI gợi ý sơ đồ tư duy.",
      time: 150,
      task: "Sắp xếp các bước khi em nhờ công cụ AI (ChatGPT, Copilot, Gemini…) gợi ý các nhánh cho sơ đồ tư duy. Xếp xong bấm Nộp bài.",
      steps: [
        "Em tự vẽ sơ đồ theo ý hiểu của mình trước",
        "Em nhập câu lệnh, ví dụ: “Gợi ý các nhánh chính và nhánh phụ cho sơ đồ tư duy về chủ đề Sổ lưu niệm lớp”",
        "Công cụ AI phân tích câu lệnh và tạo ra gợi ý",
        "Em đọc, kiểm tra, chọn lọc gợi ý phù hợp để bổ sung vào sơ đồ của mình",
      ],
      explanation: "Công cụ AI nhận câu lệnh → phân tích, xử lí → đưa ra gợi ý. Em tự làm trước, kiểm chứng và chọn lọc; không nhập thông tin cá nhân vào công cụ AI.",
    },
    {
      id: "van-dung", name: "Vận dụng: Sơ đồ tư duy An toàn thông tin trên Internet 🛡️", type: "knowledge",
      goal: "Dùng sơ đồ tư duy tóm tắt nội dung Bài 9. An toàn thông tin trên Internet.",
      time: 600,
      task: "Vận dụng (SGK tr.47): hoàn thành sơ đồ tư duy tóm tắt Bài 9 — thay các dấu ? bằng nội dung đã học, rồi gửi cho thầy/cô.",
      sgkImage: "assets/sgk/van-dung-attt.jpg",
      mindmap: { key: "attt", editable: true, layout: "right", title: "Sơ đồ tư duy — An toàn thông tin trên Internet", root: ATTT,
        submit: "Sơ đồ tư duy An toàn thông tin trên Internet (Vận dụng)" },
      content: {
        heading: "🛡️ Tóm tắt Bài 9 bằng sơ đồ tư duy",
        revealLabel: "💡 Gợi ý đáp án",
        blocks: [
          { kind: "list", value: ["Tác hại, nguy cơ (thêm 2 ý): Tiếp nhận thông tin không chính xác · Nghiện Internet, nghiện trò chơi trên mạng.", "Nhánh màu xanh: Quy tắc an toàn khi sử dụng Internet — ① Giữ an toàn: bảo mật thông tin cá nhân · ② Không gặp gỡ: người chỉ quen qua mạng · ③ Đừng chấp nhận · ④ Kiểm tra độ tin cậy · ⑤ Hãy nói ra.", "Nhánh màu vàng (gợi ý): Bảo vệ thông tin, tài khoản — đặt mật khẩu mạnh, đăng xuất khi dùng xong, cài phần mềm chống virus…"] },
          { kind: "image", value: "assets/sgk/van-dung-attt.jpg", caption: "Sơ đồ gợi ý trong SGK tr.47" },
        ],
      },
    },
    {
      id: "van-dung-nha", name: "Ở nhà: Sơ đồ tư duy chủ đề tự chọn 🏠", type: "vandung",
      goal: "Vận dụng sơ đồ tư duy cho một chủ đề thực tế trong học tập hoặc đời sống.",
      time: 180,
      task: "Chọn một chủ đề (bản thân, lớp học, môn học, sự kiện, kế hoạch tuần…), gửi dàn ý sơ đồ cho thầy/cô; về nhà vẽ trên giấy hoặc bằng MindMaple Lite, tiết sau trình bày trước lớp.",
      intro: "Gửi câu trả lời cho thầy/cô rồi bấm để xem ví dụ.",
      cases: [
        { question: "Em chọn chủ đề gì? Viết chủ đề chính và 3–4 chủ đề nhánh của sơ đồ tư duy.",
          answer: "Ví dụ: Chủ đề chính “Kế hoạch tuần của em” → nhánh: Học tập (bài tập Toán, ôn Tiếng Anh) · Thể thao (đá bóng thứ Bảy) · Việc nhà (quét nhà, tưới cây) · Giải trí (đọc truyện, xem phim cùng gia đình)." },
        { question: "Em có thể dùng sơ đồ tư duy để ghi nhớ nội dung môn học nào? Vì sao?",
          answer: "Ví dụ: Lịch sử và Địa lí — tóm tắt các sự kiện, nhân vật; Ngữ văn — dàn ý bài văn; Toán — hệ thống công thức. Sơ đồ tư duy giúp nhìn thấy bức tranh tổng thể, ghi nhớ nhanh hơn, lâu hơn và dễ nhớ lại khi cần." },
      ],
    },

    /* ===================== TỔNG KẾT ===================== */
    {
      id: "tong-ket", name: "Tổng kết", type: "summary",
      task: "Cả lớp nhắc lại kiến thức trọng tâm và làm thử thách cuối. Dặn dò: hoàn thiện sơ đồ tư duy chủ đề tự chọn.",
      content: {
        learned: [
          "Sơ đồ tư duy trình bày thông tin trực quan bằng văn bản, hình ảnh và các đường nối.",
          "Lợi ích: ghi nhớ tốt hơn, sáng tạo hơn, nhìn thấy bức tranh tổng thể, tiết kiệm thời gian.",
          "Các bước: chủ đề chính ở giữa → chủ đề nhánh → chi tiết (từ khoá, hình ảnh) → nhánh con; dùng màu sắc.",
          "Phần mềm (MindMaple Lite…): dễ tạo, dễ sửa, dễ chia sẻ; lưu tệp .emm.",
        ],
        challenge: [
          { question: "Bạn Lan muốn ôn tập bài Lịch sử có nhiều sự kiện, nhân vật. Cách ghi chép nào giúp Lan dễ nhìn tổng thể và ghi nhớ nhanh nhất?", type: "multiple-choice",
            options: ["Chép lại nguyên văn cả bài", "Vẽ sơ đồ tư duy với các nhánh sự kiện, nhân vật, dùng từ khoá và màu sắc", "Chỉ đọc đi đọc lại nhiều lần", "Chụp ảnh bài học rồi cất đi"],
            answer: 1, explanation: "Sơ đồ tư duy tổ chức thông tin thành các nhánh, dùng từ khoá, màu sắc giúp nhìn tổng thể và ghi nhớ nhanh.", level: "van-dung-cao", activity: "tong-ket" },
          { question: "Trên phần mềm MindMaple Lite, muốn thêm nhánh cho chủ đề nào, em làm thế nào?", type: "multiple-choice",
            options: ["Chọn File/Save", "Chọn File/New", "Nháy đúp vào biểu tượng phần mềm", "Nháy chuột chọn chủ đề đó rồi chọn Insert/Subtopic"],
            answer: 3, explanation: "Chọn chủ đề cần thêm nhánh trước → Insert/Subtopic → nhập tên nhánh mới.", level: "van-dung", activity: "tong-ket" },
        ],
      },
    },
  ],
};

if (typeof module !== "undefined" && module.exports) module.exports = LESSON;
if (typeof window !== "undefined") window.LESSON = LESSON;
