/* ============================================================================
 * BÀI 11 — ĐỊNH DẠNG VĂN BẢN  (Tin học 6 — Kết nối tri thức)
 * Chủ đề 5: Ứng dụng tin học.
 * Bám sát SGK trang 48–52 + Kế hoạch bài dạy của giáo viên.
 * Chỉ sửa file này để đổi nội dung. Engine app.js không cần sửa.
 * Thao tác định dạng HS thực hành trên Microsoft Word thật (theo lựa chọn của GV); app dùng hình minh hoạ, trò chơi, câu hỏi, phiếu tự kiểm tra.
 * ==========================================================================*/

// ---- Hội thoại mở đầu (SGK tr.48) ----
const TRO_CHUYEN_HTML = `<div style="display:flex;flex-direction:column;gap:10px;max-width:780px;margin:0 auto">
  <div style="text-align:center;font-size:1.08rem;color:#1e3a70">📖 Còn một câu hỏi: dùng công cụ gì để làm cuốn sổ lưu niệm?</div>
  ${[["👧", "An", "Nội dung cuốn sổ gồm những bài viết cảm nghĩ, ảnh chụp, danh sách các bạn trong lớp,… Tớ nghĩ mình mua một cuốn sổ để viết và dán ảnh vào đó.", "#fce7f3", "flex-start"],
    ["👦", "Minh", "Thử cân nhắc làm trên máy tính xem sao. Những năm ở Tiểu học, chúng mình đã học sử dụng nhiều phần mềm trên máy tính.", "#dbeafe", "flex-end"],
    ["🧑‍🎓", "Khoa", "Nếu làm trên máy tính, mình có thể gửi cho thầy cô và các bạn xem trước để góp ý, khi cần sửa lại cũng thuận tiện. Hơn nữa, ngoài cuốn sổ lưu niệm in ra cho mỗi bạn, mình vẫn còn tệp lưu trữ trong máy tính để phòng khi cuốn sổ đã in bị hỏng hoặc thất lạc.", "#dcfce7", "flex-start"]]
    .map(([ic, n, t, bg, al]) => `<div style="align-self:${al};max-width:88%;display:flex;gap:10px;align-items:flex-start"><span style="font-size:2.1rem">${ic}</span><div style="background:${bg};border-radius:16px;padding:10px 14px;font-size:1.06rem"><b>${n}:</b> ${t}</div></div>`).join("")}
</div>`;

// ---- Văn bản chưa định dạng và đã định dạng (bài viết của An, SGK Hình 5.8) ----
const DOAN_1 = "Minh và Khoa là hai bạn đầu tiên tớ gặp và làm quen trong ngày đầu đến nhận lớp ở trường Tiểu học.";
const DOAN_2 = "Ngay ở cổng trường tớ nhìn thấy Khoa, ấn tượng đầu tiên về Khoa là cặp kính cận khá dày cậu ấy đeo. Cậu ấy cũng đang ngơ ngác đi tìm lớp giống tớ, nhìn là biết ngay học sinh mới.";
const SO_SANH_HTML = `<div style="display:flex;flex-wrap:wrap;gap:16px;justify-content:center;margin-top:12px">
  <div style="flex:1 1 300px;max-width:430px"><div style="text-align:center;font-weight:800;color:#b91c1c;margin-bottom:6px">📄 Văn bản A</div>
    <div style="background:#fff;border:1px solid #cbd5e1;box-shadow:0 3px 10px rgba(0,0,0,.08);padding:14px 16px;font-family:'Times New Roman',serif;font-size:.98rem;line-height:1.25;text-align:left">Cảm nghĩ về nhóm bạn thân lớp 6A<br>Tớ là An<br>${DOAN_1} ${DOAN_2}</div></div>
  <div style="flex:1 1 300px;max-width:430px"><div style="text-align:center;font-weight:800;color:#15803d;margin-bottom:6px">📄 Văn bản B</div>
    <div style="background:#fff;border:1px solid #cbd5e1;box-shadow:0 3px 10px rgba(0,0,0,.08);padding:14px 22px;font-family:Arial,sans-serif;font-size:.98rem;line-height:1.5">
      <div style="text-align:center;color:#0284c7;font-weight:700">CẢM NGHĨ VỀ NHÓM BẠN THÂN LỚP 6A</div><div style="text-align:center;font-size:2.2rem">👧</div><div style="text-align:center;color:#db2777">Tớ là An</div>
      <p style="text-align:justify;margin:.4em 0">${DOAN_1}</p><p style="text-align:justify;margin:.4em 0">${DOAN_2}</p></div></div>
</div>`;

// ---- Bốn kiểu căn lề đoạn văn ----
const CAN_LE_HTML = `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:12px">
  ${[["left", "Căn thẳng lề trái", "#2563eb"], ["center", "Căn giữa", "#db2777"], ["right", "Căn thẳng lề phải", "#16a34a"], ["justify", "Căn thẳng hai lề", "#ea580c"]].map(([al, t, c]) =>
    `<div style="border:3px solid ${c};border-radius:14px;background:#fff;overflow:hidden"><div style="background:${c};color:#fff;font-weight:800;padding:6px 10px">${t}</div><div style="padding:10px 12px;text-align:${al};font-size:.95rem;line-height:1.45">Ngay ở cổng trường tớ nhìn thấy Khoa, ấn tượng đầu tiên là cặp kính cận khá dày cậu ấy đeo.</div></div>`).join("")}
</div>`;

// ---- Hướng trang và lề trang ----
const page = (w, h, label, sub) => `<div style="text-align:center"><div style="width:${w}px;height:${h}px;background:#fff;border:2px solid #334155;box-shadow:0 4px 12px rgba(0,0,0,.15);position:relative;margin:0 auto">
  <div style="position:absolute;left:18%;right:14%;top:12%;bottom:12%;border:2px dashed #0284c7;display:flex;align-items:center;justify-content:center;color:#64748b;font-size:.85rem">vùng soạn thảo</div>
  <span style="position:absolute;top:1px;left:50%;transform:translateX(-50%);font-size:.7rem;color:#0f766e">Top</span><span style="position:absolute;bottom:1px;left:50%;transform:translateX(-50%);font-size:.7rem;color:#0f766e">Bottom</span>
  <span style="position:absolute;left:2px;top:50%;font-size:.7rem;color:#0f766e;writing-mode:vertical-rl">Left</span><span style="position:absolute;right:2px;top:50%;font-size:.7rem;color:#0f766e;writing-mode:vertical-rl">Right</span></div>
  <div style="font-weight:800;margin-top:8px">${label}</div><div style="color:#475569">${sub}</div></div>`;
const TRANG_HTML = `<div style="display:flex;flex-wrap:wrap;gap:28px;justify-content:center;align-items:flex-end">
  ${page(150, 212, "Portrait", "Trang đứng")}${page(212, 150, "Landscape", "Trang ngang")}
  <div style="max-width:300px;border:2px solid #2b579a;border-radius:14px;padding:12px 14px;background:#eff6ff;font-size:1.02rem;line-height:1.55">
    <b>Page Layout → Page Setup</b><br>🔄 <b>Orientation</b>: hướng trang<br>📐 <b>Margins</b>: lề trái (Left), lề phải (Right), lề trên (Top), lề dưới (Bottom)<br>📄 <b>Size</b>: khổ giấy — phổ biến là <b>A4</b></div>
</div>`;

const LESSON = {
  meta: {
    subject: "Tin học", grade: "6", book: "Kết nối tri thức với cuộc sống",
    title: "Bài 11: Định dạng văn bản", unit: "Chủ đề 5 — Ứng dụng tin học",
    pages: "48–52", durationMinutes: 90,
  },
  objectives: {
    knowledge: [
      "Nêu được các chức năng đặc trưng của những phần mềm soạn thảo văn bản.",
      "Trình bày được tác dụng của công cụ căn lề, định dạng văn bản.",
      "Thực hiện được việc định dạng văn bản, trình bày trang văn bản và in.",
    ],
    competencies: [
      "Tự chủ, tự học; giao tiếp, hợp tác; giải quyết vấn đề, sáng tạo (lựa chọn cách trình bày văn bản phù hợp mục đích).",
      "Năng lực số 3.1.TC1a: căn lề, thụt lề, giãn dòng; thiết lập hướng trang, lề trang, khổ giấy; xem trước khi in và in văn bản.",
      "Năng lực số 5.2.TC1a, 5.2.TC1b: xác định yêu cầu trình bày theo mục đích văn bản; chọn đúng thẻ lệnh Home, Page Layout, File – Print.",
      "Năng lực AI 6.B1.1: nhận biết mặt tích cực và hạn chế của một số tính năng AI (ví dụ gợi ý chính tả có thể sai ngữ cảnh).",
    ],
    qualities: ["Nhân ái, chăm chỉ, trung thực, trách nhiệm, kỉ luật khi sử dụng máy tính, phần mềm và thiết bị in."],
  },
  coreKnowledge: [
    "Chức năng cơ bản của phần mềm soạn thảo văn bản: tạo và định dạng văn bản; biên tập, chỉnh sửa; lưu trữ; in văn bản. Chức năng nâng cao: theo dõi thay đổi, lưu trữ đám mây, cộng tác trực tuyến.",
    "Đoạn là phần văn bản được phân cách bởi dấu ngắt đoạn (nhấn Enter). Lệnh định dạng đoạn ở thẻ Home, nhóm Paragraph: căn thẳng lề trái, căn giữa, căn thẳng lề phải, căn thẳng hai lề; tăng, giảm mức thụt lề trái; khoảng cách giữa các dòng, giữa các đoạn.",
    "Định dạng trang ở thẻ Page Layout, nhóm Page Setup: hướng trang (Orientation: Portrait – đứng, Landscape – ngang); lề trang (Margins: Left, Right, Top, Bottom); khổ giấy (Size, phổ biến A4).",
    "In văn bản: thẻ File → Print — chọn máy in, nhập trang cần in, xem trước khi in rồi nháy Print.",
  ],
  keywords: ["Căn lề đoạn", "Paragraph", "Orientation", "Margins", "File → Print"],
  settings: { basePoints: 100, useTimer: false, defaultTime: 60, sound: true, streakEnabled: true },

  activities: [
    /* =========================== TIẾT 1 =========================== */
    /* ===================== HĐ1: KHỞI ĐỘNG ===================== */
    {
      id: "mo-dau", name: "Khởi động — Làm sổ lưu niệm bằng gì? 🤔", type: "knowledge",
      goal: "Nhận ra lợi ích của việc làm văn bản trên máy tính và vai trò của định dạng văn bản.",
      time: 300,
      task: "Đọc cuộc trò chuyện của An, Minh, Khoa. Quan sát hai văn bản A, B và trả lời câu hỏi.",
      sgkImage: "assets/sgk/sgk-trang48.jpg",
      content: {
        heading: "🤔 Viết tay hay làm trên máy tính?",
        html: TRO_CHUYEN_HTML + SO_SANH_HTML,
      },
      questions: [
        { question: "Theo Khoa, làm cuốn sổ lưu niệm trên máy tính có những lợi ích gì? (Chọn các phương án đúng)", type: "multiple-select",
          options: ["Gửi cho thầy cô và các bạn xem trước để góp ý", "Khi cần sửa lại cũng thuận tiện", "Không cần viết nội dung nữa", "Còn tệp lưu trữ phòng khi sổ in bị hỏng, thất lạc"],
          answer: [0, 1, 3], explanation: "Làm trên máy tính dễ góp ý, dễ sửa và có tệp lưu trữ dự phòng. Nội dung thì vẫn phải do các bạn viết.", level: "thong-hieu", activity: "mo-dau" },
        { question: "Văn bản nào dễ đọc, đẹp và rõ ràng hơn?", type: "multiple-choice",
          options: ["Văn bản A", "Văn bản B", "Hai văn bản như nhau", "Không văn bản nào"],
          answer: 1, explanation: "Văn bản B đã được định dạng: tiêu đề, ảnh, tên được căn giữa; các đoạn căn thẳng hai lề, có khoảng cách giữa các đoạn → dễ đọc, dễ nhớ.", level: "nhan-biet", activity: "mo-dau" },
      ],
      remember: ["Để văn bản đẹp, dễ đọc, dễ nhớ, ngoài định dạng kí tự còn cần định dạng đoạn và định dạng trang văn bản."],
    },

    /* ===================== HĐ2.1: PHẦN MỀM SOẠN THẢO VĂN BẢN ===================== */
    {
      id: "phan-mem-soan-thao", name: "Hoạt động 1: Phần mềm soạn thảo văn bản 💻", type: "knowledge",
      goal: "Nêu được các chức năng đặc trưng của phần mềm soạn thảo văn bản.",
      time: 420,
      task: "Hoạt động 1 (SGK tr.48): dựa vào sơ đồ tư duy Sổ lưu niệm (Bài 10), nhóm chọn phần mềm cần dùng để tạo nội dung cuốn sổ và nêu các chức năng phần mềm đó cần có.",
      sgkImage: "assets/sgk/hoat-dong-1.jpg",
      content: {
        heading: "💻 Phần mềm soạn thảo văn bản",
        prompt: "Phần mềm soạn thảo văn bản có thể được cài đặt trên máy tính hoặc chạy trực tuyến trên Internet,… Có nhiều loại phần mềm soạn thảo văn bản khác nhau (ví dụ Microsoft Word).",
        revealLabel: "📌 Các chức năng của phần mềm soạn thảo",
        blocks: [
          { kind: "html", value: `<div style="display:flex;flex-wrap:wrap;gap:14px;justify-content:center">
            <div style="flex:1 1 260px;max-width:400px;border:3px solid #2b579a;border-radius:16px;padding:12px 16px;background:#fff"><b style="color:#2b579a;font-size:1.15rem">⭐ Chức năng cơ bản</b><br>✍️ Tạo và định dạng văn bản<br>✏️ Biên tập, chỉnh sửa nội dung<br>💾 Lưu trữ văn bản<br>🖨️ In văn bản</div>
            <div style="flex:1 1 260px;max-width:400px;border:3px solid #db2777;border-radius:16px;padding:12px 16px;background:#fff"><b style="color:#db2777;font-size:1.15rem">🚀 Chức năng nâng cao</b><br>🔎 Xem lại và theo dõi sự thay đổi của tài liệu<br>☁️ Lưu trữ nhờ công nghệ đám mây, đồng bộ giữa máy tính, điện thoại, máy tính bảng<br>🤝 Cộng tác với người khác trên cùng một tài liệu mọi lúc mọi nơi</div></div>` },
          { kind: "text", value: "Với những chức năng này, chúng ta có thể dùng phần mềm soạn thảo văn bản để tạo ra các tài liệu khác nhau như cuốn sách, bài viết, báo cáo, bản tin, tờ rơi,…" },
        ],
      },
      questions: [
        { question: "Để tạo nội dung bài viết cảm nghĩ cho cuốn sổ lưu niệm, em cần dùng phần mềm nào là chính?", type: "multiple-choice",
          options: ["Phần mềm sơ đồ tư duy", "Phần mềm soạn thảo văn bản (Microsoft Word)", "Phần mềm bảng tính", "Trò chơi trên máy tính"],
          answer: 1, explanation: "Bài viết cảm nghĩ, danh sách các bạn, lời giới thiệu… được tạo bằng phần mềm soạn thảo văn bản như Microsoft Word.", level: "nhan-biet", activity: "phan-mem-soan-thao" },
        { question: "Các chức năng cơ bản mà mọi phần mềm soạn thảo văn bản đều có là: (Chọn các phương án đúng)", type: "multiple-select",
          options: ["Tạo và định dạng văn bản", "Biên tập, chỉnh sửa nội dung", "Tính tổng các số tự động", "Lưu trữ văn bản", "In văn bản"],
          answer: [0, 1, 3, 4], explanation: "Bốn chức năng cơ bản: tạo và định dạng; biên tập, chỉnh sửa; lưu trữ; in văn bản.", level: "nhan-biet", activity: "phan-mem-soan-thao" },
        { question: "Câu hỏi SGK tr.48: Em sẽ dùng những chức năng nào để tạo nội dung cho cuốn sổ lưu niệm? (Chọn các phương án phù hợp)", type: "multiple-select",
          options: ["Nhập bài viết, chèn ảnh và định dạng cho đẹp", "Chỉnh sửa lại khi các bạn góp ý", "Lưu tệp để dùng lại, phòng khi sổ in bị hỏng", "In cuốn sổ cho mỗi bạn"],
          answer: [0, 1, 2, 3], explanation: "Làm sổ lưu niệm cần đủ các chức năng: tạo và định dạng, chỉnh sửa, lưu trữ và in. Có thể dùng thêm lưu trữ đám mây, cộng tác để cả lớp cùng làm.", level: "van-dung", activity: "phan-mem-soan-thao" },
      ],
      remember: ["Phần mềm soạn thảo văn bản: tạo và định dạng văn bản · biên tập, chỉnh sửa · lưu trữ · in văn bản."],
    },
    {
      id: "co-ban-nang-cao", name: "Trò chơi: Chức năng cơ bản hay nâng cao? 🎯", type: "dragdrop",
      goal: "Phân biệt chức năng cơ bản và chức năng nâng cao của phần mềm soạn thảo văn bản.",
      time: 150,
      task: "Xếp mỗi chức năng vào đúng nhóm. Xếp hết rồi bấm Nộp bài.",
      groups: ["⭐ Chức năng cơ bản", "🚀 Chức năng nâng cao"],
      items: [
        { text: "Tạo và định dạng văn bản", group: 0 },
        { text: "Biên tập, chỉnh sửa nội dung", group: 0 },
        { text: "Lưu trữ văn bản", group: 0 },
        { text: "In văn bản", group: 0 },
        { text: "Xem lại và theo dõi sự thay đổi của tài liệu", group: 1 },
        { text: "Lưu trên đám mây, đồng bộ với điện thoại, máy tính bảng", group: 1 },
        { text: "Cộng tác với người khác trên cùng một tài liệu mọi lúc mọi nơi", group: 1 },
      ],
      explanation: "Cơ bản: tạo và định dạng, chỉnh sửa, lưu trữ, in. Nâng cao: theo dõi thay đổi, lưu trữ đám mây, làm việc cộng tác.",
    },

    /* ===================== HĐ2.2: ĐỊNH DẠNG VĂN BẢN VÀ IN ===================== */
    {
      id: "dinh-dang-doan", name: "a) Định dạng đoạn văn bản 📝", type: "knowledge",
      goal: "Biết các lệnh định dạng đoạn và tác dụng của chúng.",
      time: 480,
      task: "Nhóm quan sát Hình 5.4, 5.5: trong nhóm lệnh Paragraph có những công cụ nào để định dạng đoạn văn bản? Chúng được dùng ở đâu trong bài viết của An?",
      sgkImage: "assets/sgk/hinh-5-4.jpg",
      content: {
        heading: "📝 Định dạng đoạn văn bản",
        prompt: "Đoạn là phần văn bản thường được phân cách bởi dấu ngắt đoạn — xuất hiện khi nhấn phím Enter. Định dạng đoạn giúp thay đổi cách trình bày của đoạn: tăng, giảm lề; căn chỉnh lề; khoảng cách giữa các dòng… Các lệnh nằm trong thẻ Home, nhóm lệnh Paragraph.",
        revealLabel: "🖼️ Hình 5.4, 5.5 & bốn kiểu căn lề",
        blocks: [
          { kind: "image", value: "assets/sgk/hinh-5-4.jpg", caption: "Hình 5.4. Các lệnh định dạng đoạn văn bản" },
          { kind: "html", value: CAN_LE_HTML },
          { kind: "image", value: "assets/sgk/hinh-5-5.jpg", caption: "Hình 5.5. Đoạn văn bản sau khi được định dạng" },
        ],
      },
      questions: [
        { question: "Trong phần mềm soạn thảo văn bản, dấu ngắt đoạn xuất hiện khi em nhấn phím nào?", type: "multiple-choice",
          options: ["Phím Space (cách)", "Phím Shift", "Phím Enter", "Phím Tab"],
          answer: 2, explanation: "Nhấn Enter → dấu ngắt đoạn → bắt đầu đoạn mới.", level: "nhan-biet", activity: "dinh-dang-doan" },
        { question: "Các lệnh định dạng đoạn văn bản nằm ở đâu?", type: "multiple-choice",
          options: ["Thẻ Home, nhóm lệnh Paragraph", "Thẻ Page Layout, nhóm lệnh Page Setup", "Thẻ File, lệnh Print", "Thẻ Insert, lệnh Picture"],
          answer: 0, explanation: "Định dạng đoạn: thẻ Home → nhóm Paragraph.", level: "nhan-biet", activity: "dinh-dang-doan" },
        { question: "Trong Hình 5.5, tiêu đề “CẢM NGHĨ VỀ NHÓM BẠN THÂN LỚP 6A”, hình ảnh và dòng “Tớ là An” được định dạng thế nào?", type: "multiple-choice", sgkImage: "assets/sgk/hinh-5-5.jpg",
          options: ["Căn thẳng lề trái", "Căn thẳng lề phải", "Căn thẳng hai lề", "Căn giữa"],
          answer: 3, explanation: "Tiêu đề, hình ảnh và giới thiệu tên được căn giữa; các đoạn văn còn lại căn thẳng hai lề.", level: "thong-hieu", activity: "dinh-dang-doan" },
        { question: "Các đoạn văn trong Hình 5.5 có cả mép trái và mép phải đều thẳng hàng. Đó là kiểu căn lề nào?", type: "multiple-choice", sgkImage: "assets/sgk/hinh-5-5.jpg",
          options: ["Căn thẳng hai lề", "Căn giữa", "Căn thẳng lề phải", "Tăng mức thụt lề trái"],
          answer: 0, explanation: "Căn thẳng hai lề (căn đều): các dòng thẳng cả mép trái lẫn mép phải.", level: "thong-hieu", activity: "dinh-dang-doan" },
      ],
      remember: ["Định dạng đoạn (Home → Paragraph): căn thẳng lề trái, căn giữa, căn thẳng lề phải, căn thẳng hai lề; tăng/giảm mức thụt lề trái; khoảng cách giữa các dòng, giữa các đoạn."],
    },
    {
      id: "ghep-lenh-doan", name: "Ghép lệnh định dạng đoạn với tác dụng 🧩", type: "matching",
      goal: "Nhớ tác dụng của các lệnh trong nhóm Paragraph.",
      time: 180,
      task: "Ghép mỗi lệnh định dạng đoạn với tác dụng của nó. Làm hết rồi bấm Nộp bài.",
      sgkImage: "assets/sgk/hinh-5-4.jpg",
      pairs: [
        { left: "Căn thẳng lề trái", right: "Các dòng thẳng hàng ở mép trái" },
        { left: "Căn giữa", right: "Các dòng nằm giữa hai lề, cân đối hai bên" },
        { left: "Căn thẳng lề phải", right: "Các dòng thẳng hàng ở mép phải" },
        { left: "Căn thẳng hai lề", right: "Các dòng thẳng cả mép trái và mép phải" },
        { left: "Tăng mức thụt lề trái", right: "Cả đoạn lùi vào trong so với lề trái" },
        { left: "Khoảng cách dòng, đoạn", right: "Thay đổi độ giãn giữa các dòng trong đoạn, giữa các đoạn" },
      ],
      explanation: "Căn trái, căn giữa, căn phải, căn thẳng hai lề; tăng/giảm mức thụt lề trái; khoảng cách giữa các dòng, giữa các đoạn (Hình 5.4).",
    },
    {
      id: "dinh-dang-trang", name: "b) Định dạng trang văn bản 📄", type: "knowledge",
      goal: "Biết cách chọn hướng trang, đặt lề trang và chọn khổ giấy.",
      time: 420,
      task: "Nhóm thảo luận: để định dạng trang văn bản em thực hiện như thế nào? Quan sát Hình 5.6 và nhận xét về cách trình bày trang văn bản.",
      sgkImage: "assets/sgk/hinh-5-6.jpg",
      content: {
        heading: "📄 Định dạng trang văn bản",
        prompt: "Mỗi cuốn sách có hình dạng và kích thước khác nhau phụ thuộc vào việc định dạng trang văn bản. Để văn bản đẹp và có bố cục hài hoà, em cần định dạng trang — các lệnh nằm trong thẻ Page Layout, nhóm lệnh Page Setup.",
        revealLabel: "📐 Hướng trang, lề trang, khổ giấy & Hình 5.6",
        blocks: [
          { kind: "html", value: TRANG_HTML },
          { kind: "image", value: "assets/sgk/hinh-5-6.jpg", caption: "Hình 5.6. Trình bày trang văn bản" },
          { kind: "list", value: ["Hình 5.6: hướng trang đứng, khổ giấy A4; bốn lề trang (trên, dưới, trái, phải) để trống vừa phải → trang cân đối, dễ đọc, không bị mất chữ khi in.", "Đặt lề chi tiết: Margins → Custom Margins → nhập Top, Bottom, Left, Right → OK (giáo án)."] },
        ],
      },
      questions: [
        { question: "Các lệnh định dạng trang văn bản nằm ở đâu?", type: "multiple-choice",
          options: ["Thẻ Home, nhóm Paragraph", "Thẻ Insert, nhóm Pictures", "Thẻ File, lệnh Save", "Thẻ Page Layout, nhóm Page Setup"],
          answer: 3, explanation: "Định dạng trang: thẻ Page Layout → nhóm Page Setup (Orientation, Margins, Size).", level: "nhan-biet", activity: "dinh-dang-trang" },
        { question: "Hướng trang Landscape là:", type: "multiple-choice",
          options: ["Trang đứng", "Trang ngang", "Khổ giấy A4", "Lề trang"],
          answer: 1, explanation: "Portrait: trang đứng · Landscape: trang ngang.", level: "nhan-biet", activity: "dinh-dang-trang" },
        { question: "Một trang văn bản có những lề trang nào? (Chọn các phương án đúng)", type: "multiple-select",
          options: ["Lề trái (Left)", "Lề phải (Right)", "Lề giữa (Center)", "Lề trên (Top)", "Lề dưới (Bottom)"],
          answer: [0, 1, 3, 4], explanation: "Bốn lề trang: trái, phải, trên, dưới. Không có “lề giữa”.", level: "thong-hieu", activity: "dinh-dang-trang" },
        { question: "Khổ giấy phổ biến nhất khi soạn thảo, in văn bản ở trường là:", type: "multiple-choice",
          options: ["A4", "A0", "Giấy khổ lớn A1", "Giấy vở ô li"],
          answer: 0, explanation: "Lựa chọn khổ giấy (Size): khổ giấy phổ biến là A4.", level: "nhan-biet", activity: "dinh-dang-trang" },
      ],
      remember: ["Định dạng trang (Page Layout → Page Setup): Orientation (Portrait đứng / Landscape ngang) · Margins (Left, Right, Top, Bottom) · Size (thường A4)."],
    },
    {
      id: "in-van-ban", name: "c) In văn bản 🖨️", type: "knowledge",
      goal: "Biết cách xem trước khi in và in văn bản.",
      time: 360,
      task: "Nhóm quan sát Hình 5.7: để in văn bản em làm thế nào? Cần điều kiện gì để in được văn bản?",
      sgkImage: "assets/sgk/hinh-5-7.jpg",
      content: {
        heading: "🖨️ In văn bản",
        prompt: "Sau khi hoàn thành việc tạo văn bản, em có thể in văn bản ra giấy. Trong thẻ File, em chọn lệnh Print.",
        revealLabel: "🖼️ Hình 5.7. Các lệnh để in văn bản",
        blocks: [
          { kind: "image", value: "assets/sgk/hinh-5-7.jpg", caption: "Hình 5.7. Các lệnh để in văn bản" },
          { kind: "list", value: ["Chọn máy in · Nhập trang cần in (Pages) · Xem trước khi in ở khung bên phải · Nháy nút Print để in.", "Điều kiện: máy tính phải kết nối với máy in và máy in phải được cài đặt sẵn trong máy tính (giáo án)."] },
        ],
      },
      questions: [
        { question: "Để in văn bản, em chọn:", type: "multiple-choice",
          options: ["Thẻ Home → Paragraph", "Thẻ File → Print", "Thẻ Page Layout → Margins", "Thẻ Insert → Picture"],
          answer: 1, explanation: "In văn bản: thẻ File → lệnh Print.", level: "nhan-biet", activity: "in-van-ban" },
        { question: "Vì sao nên xem trước khi in?", type: "multiple-choice",
          options: ["Để máy in chạy nhanh hơn", "Để kiểm tra bố cục, căn lề, lề trang và sửa trước khi in, tránh tốn giấy", "Để tự động sửa lỗi chính tả", "Để lưu tệp văn bản"],
          answer: 1, explanation: "Xem trước giúp phát hiện lỗi trình bày và điều chỉnh trước khi in → tiết kiệm giấy, mực.", level: "thong-hieu", activity: "in-van-ban" },
        { question: "Văn bản có 2 trang, em chỉ muốn in trang 2. Em làm thế nào trong cửa sổ Print?", type: "multiple-choice",
          options: ["Nhập số 2 vào ô Pages (trang cần in)", "Nhập số 2 vào ô Copies", "Chọn Portrait Orientation", "Nháy ngay nút Print"],
          answer: 0, explanation: "Ô Pages: nhập trang cần in. Ô Copies là số bản in.", level: "van-dung", activity: "in-van-ban" },
        { question: "Điều kiện để in được văn bản là gì?", type: "multiple-choice",
          options: ["Văn bản phải có ảnh", "Máy tính phải kết nối Internet", "Máy tính kết nối với máy in và máy in được cài đặt sẵn trong máy tính", "Văn bản phải là trang ngang"],
          answer: 2, explanation: "Cần có máy in kết nối với máy tính và được cài đặt sẵn.", level: "thong-hieu", activity: "in-van-ban" },
      ],
      remember: ["In văn bản: File → Print → chọn máy in, nhập trang cần in, xem trước khi in → nháy Print."],
    },

    /* =========================== TIẾT 2 =========================== */
    /* ===================== HĐ2.3: THỰC HÀNH ĐỊNH DẠNG VĂN BẢN ===================== */
    {
      id: "cac-buoc-thuc-hanh", name: "Nhiệm vụ thực hành — Sắp xếp công việc 🔢", type: "ordering",
      goal: "Nắm trình tự công việc khi soạn bài viết cảm nghĩ cho cuốn sổ lưu niệm.",
      time: 150,
      task: "Sắp xếp các công việc cần làm để soạn bài viết cảm nghĩ trên phần mềm soạn thảo văn bản (SGK tr.51). Xếp xong bấm Nộp bài.",
      sgkImage: "assets/sgk/sgk-trang51.jpg",
      steps: [
        "Khởi động phần mềm, nhập nội dung văn bản và chèn hình ảnh",
        "Căn lề các đoạn văn bản",
        "Chọn hướng trang, chọn lề trang",
        "Xem trang in để điều chỉnh lại việc căn lề đoạn và lề trang (nếu cần)",
        "Lưu tệp văn bản với tên CamNghiVeBan.docx",
      ],
      explanation: "Nhập nội dung, chèn ảnh → căn lề đoạn → hướng trang, lề trang → xem trang in, điều chỉnh → lưu tệp.",
    },
    {
      id: "thuc-hanh", name: "Thực hành: Bài viết cảm nghĩ của em ✍️", type: "knowledge",
      goal: "Soạn và định dạng bài viết cảm nghĩ trên Microsoft Word, lưu CamNghiVeBan.docx.",
      time: 1200,
      task: "Trên Microsoft Word: tham khảo bài viết của An (Hình 5.8), soạn bài viết cảm nghĩ của em (một trang trong sổ lưu niệm): nhập nội dung, chèn ảnh; căn giữa tiêu đề, ảnh, tên; căn thẳng hai lề các đoạn; hướng trang đứng, lề Normal; xem trang in; lưu CamNghiVeBan.docx. Trả lời câu hỏi để kiểm tra lại thao tác.",
      sgkImage: "assets/sgk/hinh-5-8.jpg",
      content: {
        heading: "✍️ Thực hành trên Microsoft Word",
        revealLabel: "📖 Hướng dẫn a) – d) (SGK tr.51–52)",
        blocks: [
          { kind: "image", value: "assets/sgk/hinh-5-8.jpg", caption: "Hình 5.8. Bài viết của bạn An" },
          { kind: "list", value: [
            "a) Nháy đúp biểu tượng Word trên màn hình nền → nhập nội dung → Insert/Picture để mở hộp thoại Insert Picture và chèn ảnh.",
            "b) Chọn dòng tiêu đề, hình ảnh và dòng “Tớ là An” → thẻ Home → nút căn giữa. Làm tương tự để căn thẳng hai lề cho các đoạn văn.",
            "c) Hướng trang: Page Layout → Page Setup → Orientation → Portrait. Lề trang: Page Layout → Page Setup → Margins → Normal.",
            "d) Chọn File/Save, lưu tệp với tên CamNghiVeBan.docx.",
          ] },
          { kind: "image", value: "assets/sgk/can-giua-truoc-sau.jpg", caption: "Trước và sau khi căn giữa tiêu đề, hình ảnh, dòng “Tớ là An”" },
          { kind: "image", value: "assets/sgk/hinh-5-9.jpg", caption: "Hình 5.9. Cách thay đổi hướng trang" },
          { kind: "image", value: "assets/sgk/hinh-5-10.jpg", caption: "Hình 5.10. Cách thay đổi lề trang" },
        ],
      },
      questions: [
        { question: "Để chèn ảnh vào bài viết, em chọn:", type: "multiple-choice",
          options: ["Home/Paragraph", "Page Layout/Margins", "Insert/Picture", "File/Print"],
          answer: 2, explanation: "Insert/Picture mở hộp thoại Insert Picture để chọn ảnh và chèn.", level: "nhan-biet", activity: "thuc-hanh" },
        { question: "Muốn tiêu đề nằm cân đối ở giữa trang, em chọn tiêu đề rồi:", type: "multiple-choice",
          options: ["Nháy nút căn giữa ở thẻ Home", "Nháy Orientation → Landscape", "Nhấn phím Enter nhiều lần", "Nháy Margins → Narrow"],
          answer: 0, explanation: "Chọn dòng tiêu đề → Home → nút căn giữa.", level: "thong-hieu", activity: "thuc-hanh" },
        { question: "Các bước chọn hướng trang đứng cho bài viết là:", type: "multiple-choice", sgkImage: "assets/sgk/hinh-5-9.jpg",
          options: ["Home → Paragraph → căn giữa", "File → Print → Portrait", "Insert → Picture → Portrait", "Page Layout → Page Setup → Orientation → Portrait"],
          answer: 3, explanation: "① Page Layout ② Page Setup ③ Orientation → Portrait (Hình 5.9).", level: "thong-hieu", activity: "thuc-hanh" },
        { question: "Muốn đặt mẫu lề trang Normal, em nháy chuột chọn lệnh nào trong nhóm Page Setup?", type: "multiple-choice", sgkImage: "assets/sgk/hinh-5-10.jpg",
          options: ["Size", "Margins", "Columns", "Orientation"],
          answer: 1, explanation: "Page Layout → Page Setup → Margins → Normal (Hình 5.10).", level: "nhan-biet", activity: "thuc-hanh" },
      ],
      remember: ["Chèn ảnh: Insert/Picture · Căn lề đoạn: Home · Hướng trang, lề trang: Page Layout → Page Setup · Lưu: File/Save."],
    },
    {
      id: "tu-kiem-tra", name: "Phiếu tự kiểm tra bài viết CamNghiVeBan.docx 📋", type: "checklist",
      goal: "Tự đánh giá sản phẩm thực hành trên Word.",
      time: 180,
      task: "Đối chiếu bài viết trên Word, tick từng việc vào cột Đã làm hoặc Chưa làm, ghi lỗi thường gặp rồi gửi cho thầy/cô.",
      columns: ["✅ Đã làm", "⏳ Chưa làm"],
      sections: [
        { title: "✍️ NỘI DUNG", items: [
          "Nhập đủ tiêu đề, lời giới thiệu và các đoạn cảm nghĩ",
          "Chèn được hình ảnh minh hoạ",
        ] },
        { title: "📝 ĐỊNH DẠNG ĐOẠN", items: [
          "Tiêu đề, hình ảnh, dòng giới thiệu được căn giữa",
          "Các đoạn văn căn thẳng hai lề",
          "Khoảng cách giữa các đoạn hợp lí, dễ đọc",
        ] },
        { title: "📄 TRANG & LƯU TỆP", items: [
          "Hướng trang đứng (Portrait), lề trang Normal, khổ A4",
          "Đã xem trang in (File → Print) và chỉnh lại nếu cần",
          "Lưu tệp với tên CamNghiVeBan.docx",
        ] },
      ],
      note: "Em hay gặp lỗi gì khi định dạng văn bản? Em đã khắc phục thế nào?",
      modelAnswer: [
        "Lỗi thường gặp: quên chọn (bôi đen) đoạn trước khi căn lề; căn giữa cả đoạn văn dài; nhấn Enter cuối mỗi dòng làm vỡ đoạn; ảnh chưa căn giữa; quên lưu hoặc lưu sai tên.",
        "Khắc phục: chọn đúng đoạn rồi mới căn lề; chỉ nhấn Enter khi hết đoạn; xem trang in để kiểm tra trước khi lưu, in.",
      ],
    },

    /* ===================== HĐ3: LUYỆN TẬP ===================== */
    {
      id: "phieu-hoc-tap", name: "Luyện tập — Phiếu học tập 📝", type: "knowledge",
      goal: "Củng cố kiến thức về định dạng đoạn, định dạng trang và phần mềm soạn thảo.",
      time: 360,
      task: "Làm phiếu học tập tổng hợp (Câu 1 và Câu 3): chọn đáp án đúng; chọn Đúng hoặc Sai cho mỗi phát biểu.",
      questions: [
        { question: "Câu 1. Để đặt hướng cho trang văn bản, trên thẻ Page Layout vào nhóm lệnh Page Setup sử dụng lệnh:", type: "multiple-choice",
          options: ["Orientation", "Size", "Margins", "Columns"],
          answer: 0, explanation: "Orientation: hướng trang. Size: khổ giấy. Margins: lề trang.", level: "nhan-biet", activity: "phieu-hoc-tap" },
        { question: "Câu 3a. Phần mềm soạn thảo văn bản chỉ có thể cài đặt được trên máy tính.", type: "true-false", answer: false,
          explanation: "Sai. Phần mềm soạn thảo có thể cài trên máy tính hoặc chạy trực tuyến trên Internet, dùng được cả trên điện thoại, máy tính bảng.", level: "thong-hieu", activity: "phieu-hoc-tap" },
        { question: "Câu 3b. Có nhiều loại phần mềm soạn thảo văn bản khác nhau.", type: "true-false", answer: true,
          explanation: "Đúng. Có nhiều loại phần mềm soạn thảo văn bản; chúng đều có các chức năng cơ bản giống nhau.", level: "nhan-biet", activity: "phieu-hoc-tap" },
        { question: "Câu 3c. Em có thể làm việc cộng tác với người khác trên cùng một văn bản ở bất cứ đâu.", type: "true-false", answer: true,
          explanation: "Đúng. Đây là chức năng nâng cao: cộng tác với người khác trên cùng một tài liệu mọi lúc mọi nơi.", level: "thong-hieu", activity: "phieu-hoc-tap" },
        { question: "Câu 3d. Em không thể chỉnh sửa lại văn bản sau khi đã lưu.", type: "true-false", answer: false,
          explanation: "Sai. Mở lại tệp là có thể biên tập, chỉnh sửa rồi lưu lại.", level: "nhan-biet", activity: "phieu-hoc-tap" },
      ],
    },
    {
      id: "dien-tu", name: "Câu 2: Điền từ vào chỗ trống ✍️", type: "fillblank",
      goal: "Ghi nhớ các khái niệm hướng trang, lề trang, lề đoạn.",
      time: 180,
      task: "Điền từ thích hợp vào chỗ trống. Chọn trong các từ: tất cả · bốn · ngang · lề dưới · lề trang (có từ không dùng đến). Điền xong bấm Kiểm tra.",
      text: "a) Ta có thể chọn hướng trang đứng hoặc hướng trang {{}} cho một trang văn bản.\nb) Một trang văn bản gồm có: lề trên, {{}}, lề trái, lề phải.\nc) Lề của đoạn văn bản được tính từ {{}} đến mép (trái hoặc phải) của đoạn văn bản.",
      answers: [["ngang"], ["lề dưới", "le duoi"], ["lề trang", "le trang"]],
      explanation: "a) ngang · b) lề dưới · c) lề trang. (Hai từ “bốn”, “tất cả” là từ gây nhiễu.)",
    },
    {
      id: "chon-huong-trang", name: "Luyện tập 1: Chọn hướng trang phù hợp 🔄", type: "dragdrop",
      goal: "Chọn hướng trang phù hợp với mục đích của văn bản.",
      time: 180,
      task: "Luyện tập 1 (SGK tr.52): xếp mỗi văn bản vào hướng trang phù hợp. Xếp hết rồi bấm Nộp bài.",
      sgkImage: "assets/sgk/sgk-trang52.jpg",
      groups: ["📄 Hướng trang đứng", "🔄 Đứng hoặc ngang đều được"],
      items: [
        { text: "a) Đơn xin nghỉ học", group: 0 },
        { text: "b) Báo cáo tổng kết năm học của lớp", group: 0 },
        { text: "c) Sổ lưu niệm của lớp", group: 1 },
        { text: "d) Sách ảnh chứa ảnh phong cảnh", group: 1 },
      ],
      explanation: "a, b: văn bản hành chính, báo cáo → hướng đứng. c, d: tuỳ cách trình bày có thể đứng hoặc ngang (sách ảnh phong cảnh thường hợp trang ngang vì ảnh phong cảnh thường rộng hơn cao).",
    },
    {
      id: "luyen-tap-sgk", name: "Luyện tập 2, 3: Bài thơ lục bát & Đơn xin nghỉ học 📜", type: "knowledge",
      goal: "Chọn kiểu căn lề phù hợp cho bài thơ; trình bày hợp lí đơn xin nghỉ học.",
      time: 480,
      task: "Luyện tập 2, 3 (SGK tr.52): chọn kiểu căn lề cho bài thơ lục bát; soạn Đơn xin nghỉ học trên Word và định dạng hợp lí. Trả lời câu hỏi trước khi soạn.",
      sgkImage: "assets/sgk/sgk-trang52.jpg",
      content: {
        heading: "📜 Căn lề thế nào cho đẹp?",
        html: `<div style="display:flex;flex-wrap:wrap;gap:18px;justify-content:center">
          <div style="background:#fff;border:1px solid #cbd5e1;box-shadow:0 3px 10px rgba(0,0,0,.08);padding:14px 26px;text-align:center;font-family:'Times New Roman',serif;font-size:1.1rem;line-height:1.6;min-width:280px"><b>Ca dao</b><br>Công cha như núi Thái Sơn<br>Nghĩa mẹ như nước trong nguồn chảy ra<br>Một lòng thờ mẹ kính cha<br>Cho tròn chữ hiếu mới là đạo con</div>
          <div style="background:#fff;border:1px solid #cbd5e1;box-shadow:0 3px 10px rgba(0,0,0,.08);padding:14px 20px;font-family:'Times New Roman',serif;font-size:.95rem;line-height:1.45;min-width:300px;max-width:420px">
            <div style="text-align:center;font-weight:700">CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM</div><div style="text-align:center;font-weight:700;text-decoration:underline">Độc lập – Tự do – Hạnh phúc</div>
            <div style="text-align:center;font-weight:700;margin:8px 0">ĐƠN XIN NGHỈ HỌC</div><div>Kính gửi: Cô giáo chủ nhiệm lớp 6A</div>
            <div style="text-align:justify">Em tên là …, học sinh lớp 6A. Em xin phép cô cho em nghỉ học ngày … vì … . Em sẽ chép bài và làm bài tập đầy đủ.</div>
            <div style="text-align:right;margin-top:6px">…, ngày … tháng … năm …<br>Người viết đơn</div></div></div>`,
      },
      questions: [
        { question: "Luyện tập 2: Em chọn loại căn lề nào khi trình bày bài thơ lục bát? Vì sao?", type: "multiple-choice",
          options: ["Căn thẳng lề phải — cho khác lạ", "Căn thẳng hai lề — cho các dòng dài bằng nhau", "Căn giữa — vì câu 6 chữ và câu 8 chữ dài ngắn khác nhau, căn giữa giúp bài thơ cân đối, đẹp mắt", "Không cần căn lề"],
          answer: 2, explanation: "Các dòng thơ lục bát dài ngắn xen kẽ (6 chữ – 8 chữ). Căn giữa làm bài thơ cân đối, hài hoà giữa trang.", level: "van-dung", activity: "luyen-tap-sgk" },
        { question: "Luyện tập 3: Trong đơn xin nghỉ học, dòng “ĐƠN XIN NGHỈ HỌC” nên căn thế nào?", type: "multiple-choice",
          options: ["Căn thẳng lề trái", "Căn giữa", "Căn thẳng lề phải", "Căn thẳng hai lề"],
          answer: 1, explanation: "Quốc hiệu, tiêu ngữ và tên đơn thường được căn giữa cho nổi bật, cân đối.", level: "van-dung", activity: "luyen-tap-sgk" },
        { question: "Phần “…, ngày … tháng … năm …” và “Người viết đơn” ở cuối đơn thường được căn thế nào?", type: "multiple-choice",
          options: ["Căn thẳng lề phải (hoặc lệch về bên phải)", "Căn thẳng lề trái", "Căn thẳng hai lề", "Căn giữa trang"],
          answer: 0, explanation: "Ngày tháng và chữ kí người viết đơn thường đặt lệch về bên phải trang.", level: "van-dung", activity: "luyen-tap-sgk" },
        { question: "Khi soạn đơn, công cụ kiểm tra chính tả tự động gạch đỏ tên của bạn “Vừ A Dính” và gợi ý sửa thành một từ khác. Em nên làm gì?", type: "multiple-choice",
          options: ["Chấp nhận ngay gợi ý sửa", "Xoá tên đi", "Kiểm tra lại: tên riêng viết đúng thì giữ nguyên, bỏ qua gợi ý", "Tắt máy tính"],
          answer: 2, explanation: "Công cụ gợi ý chính tả rất có ích nhưng có thể sai ngữ cảnh (tên riêng, từ địa phương…). Em cần tự kiểm tra, không làm theo máy một cách máy móc.", level: "van-dung-cao", activity: "luyen-tap-sgk" },
      ],
    },

    /* ===================== HĐ4: VẬN DỤNG ===================== */
    {
      id: "van-dung", name: "Vận dụng: Thêm trang cho cuốn sổ lưu niệm 📖", type: "vandung",
      goal: "Soạn thảo, định dạng thêm nội dung cho cuốn sổ lưu niệm của lớp.",
      time: 240,
      task: "Vận dụng (SGK tr.52): nhóm soạn thêm nội dung cho sổ lưu niệm (bài viết cảm nghĩ, giới thiệu hoạt động, sự kiện…), chèn hình ảnh minh hoạ, căn lề và định dạng trang hợp lí, lưu tệp. Gửi kế hoạch của nhóm cho thầy/cô; hoàn thiện trên Word (có thể ở nhà).",
      intro: "Gửi câu trả lời cho thầy/cô rồi bấm để xem gợi ý.",
      cases: [
        { question: "Nhóm em sẽ soạn thêm trang nội dung gì cho cuốn sổ lưu niệm? Trang đó có những phần nào và chèn hình ảnh gì?",
          answer: "Ví dụ: trang “Hội khoẻ Phù Đổng của lớp 6A” gồm tiêu đề, ảnh cả lớp cổ vũ, đoạn giới thiệu các môn thi, đoạn cảm nghĩ về thành tích của lớp." },
        { question: "Em sẽ căn lề đoạn và định dạng trang cho trang đó như thế nào? Vì sao?",
          answer: "Tiêu đề, hình ảnh căn giữa; các đoạn văn căn thẳng hai lề; hướng trang đứng (hoặc ngang nếu nhiều ảnh phong cảnh), khổ A4; lề gợi ý (giáo án): trên 2,0 cm, dưới 2,0 cm, trái 2,5 cm, phải 2,0 cm; xem trang in trước khi lưu và in." },
      ],
    },

    /* ===================== TỔNG KẾT ===================== */
    {
      id: "tong-ket", name: "Tổng kết", type: "summary",
      task: "Cả lớp nhắc lại kiến thức trọng tâm và làm thử thách cuối. Dặn dò: hoàn thiện trang sổ lưu niệm của nhóm trên Word.",
      content: {
        learned: [
          "Phần mềm soạn thảo: tạo và định dạng, chỉnh sửa, lưu trữ, in văn bản.",
          "Định dạng đoạn (Home → Paragraph): căn trái, căn giữa, căn phải, căn thẳng hai lề; thụt lề; khoảng cách dòng, đoạn.",
          "Định dạng trang (Page Layout → Page Setup): Orientation, Margins, Size (A4).",
          "In văn bản: File → Print — xem trước khi in, chọn máy in, trang cần in.",
        ],
        challenge: [
          { question: "Bạn Nam soạn tờ rơi “Hội chợ sách lớp 6A” gồm tiêu đề lớn, nhiều ảnh bìa sách xếp thành hàng dài. Cách trình bày nào hợp lí nhất?", type: "multiple-choice",
            options: ["Căn thẳng lề phải toàn bộ, trang đứng", "Tiêu đề căn giữa, trang ngang (Landscape) để xếp được hàng ảnh dài", "Không cần định dạng", "Căn thẳng hai lề cho tiêu đề, lề trang thật rộng"],
            answer: 1, explanation: "Tiêu đề căn giữa cho nổi bật; nhiều ảnh xếp theo hàng ngang → chọn hướng trang ngang.", level: "van-dung-cao", activity: "tong-ket" },
          { question: "Lệnh nào KHÔNG thuộc nhóm Page Setup?", type: "multiple-choice",
            options: ["Orientation", "Margins", "Size", "Căn giữa"],
            answer: 3, explanation: "Căn giữa là lệnh định dạng đoạn trong thẻ Home, nhóm Paragraph.", level: "thong-hieu", activity: "tong-ket" },
        ],
      },
    },
  ],
};

if (typeof module !== "undefined" && module.exports) module.exports = LESSON;
if (typeof window !== "undefined") window.LESSON = LESSON;
