/* ============================================================================
 * BÀI 2: XỬ LÍ THÔNG TIN — Tin học 6 (Kết nối tri thức với cuộc sống)
 * Chủ đề 1: Máy tính và cộng đồng · SGK tr.8–11 · Giáo án
 *
 * Nội dung bám SGK Tin học 6 (tr.8–11) và Kế hoạch bài dạy của giáo viên.
 * Sơ đồ Hình 1.1 (xử lí thông tin của con người) và Hình 1.2 (của máy tính)
 * được VẼ LẠI bằng SVG cho đẹp trên máy chiếu; ảnh SGK gốc ở assets/sgk/.
 * ==========================================================================*/

/* ---- Sơ đồ SVG: 4 bước xử lí thông tin của con người (vẽ lại Hình 1.1) ---- */
const SVG_4BUOC = `
<svg viewBox="0 0 960 210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Sơ đồ 4 bước xử lí thông tin">
  <defs><marker id="ar" markerWidth="12" markerHeight="12" refX="8" refY="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="#64748b"/></marker></defs>
  ${[
    { x: 10, c: "#3b82f6", ic: "👂", t: "Thu nhận" },
    { x: 250, c: "#f59e0b", ic: "💾", t: "Lưu trữ" },
    { x: 490, c: "#a855f7", ic: "🧠", t: "Xử lí" },
    { x: 730, c: "#10b981", ic: "📢", t: "Truyền" },
  ].map(b => `
    <rect x="${b.x}" y="45" width="220" height="120" rx="20" fill="${b.c}"/>
    <text x="${b.x + 110}" y="105" font-size="46" text-anchor="middle">${b.ic}</text>
    <text x="${b.x + 110}" y="150" font-size="26" font-weight="800" fill="#fff" text-anchor="middle">${b.t}</text>
  `).join("")}
  <line x1="232" y1="105" x2="248" y2="105" stroke="#64748b" stroke-width="4" marker-end="url(#ar)"/>
  <line x1="472" y1="105" x2="488" y2="105" stroke="#64748b" stroke-width="4" marker-end="url(#ar)"/>
  <line x1="712" y1="105" x2="728" y2="105" stroke="#64748b" stroke-width="4" marker-end="url(#ar)"/>
</svg>`;

/* ---- Sơ đồ SVG: mô hình xử lí thông tin trong máy tính (vẽ lại Hình 1.2) ---- */
const SVG_MAYTINH = `
<svg viewBox="0 0 960 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Mô hình xử lí thông tin của máy tính">
  <defs><marker id="ar2" markerWidth="12" markerHeight="12" refX="8" refY="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="#334155"/></marker></defs>
  <rect x="20" y="70" width="240" height="120" rx="18" fill="#ec4899"/>
  <text x="140" y="120" font-size="42" text-anchor="middle">⌨️🖱️</text>
  <text x="140" y="165" font-size="24" font-weight="800" fill="#fff" text-anchor="middle">Thiết bị vào</text>
  <rect x="360" y="70" width="240" height="120" rx="18" fill="#3b82f6"/>
  <text x="480" y="122" font-size="40" font-weight="900" fill="#fff" text-anchor="middle">CPU</text>
  <text x="480" y="165" font-size="24" font-weight="800" fill="#fff" text-anchor="middle">Bộ xử lí</text>
  <rect x="700" y="70" width="240" height="120" rx="18" fill="#10b981"/>
  <text x="820" y="120" font-size="42" text-anchor="middle">🖥️🖨️</text>
  <text x="820" y="165" font-size="24" font-weight="800" fill="#fff" text-anchor="middle">Thiết bị ra</text>
  <rect x="360" y="250" width="240" height="90" rx="18" fill="#f59e0b"/>
  <text x="480" y="292" font-size="30" text-anchor="middle">💽</text>
  <text x="480" y="322" font-size="24" font-weight="800" fill="#fff" text-anchor="middle">Bộ nhớ</text>
  <line x1="262" y1="130" x2="356" y2="130" stroke="#334155" stroke-width="5" marker-end="url(#ar2)"/>
  <line x1="602" y1="130" x2="696" y2="130" stroke="#334155" stroke-width="5" marker-end="url(#ar2)"/>
  <text x="308" y="115" font-size="17" fill="#334155" text-anchor="middle">thu nhận</text>
  <text x="650" y="115" font-size="17" fill="#334155" text-anchor="middle">truyền</text>
  <line x1="455" y1="192" x2="455" y2="248" stroke="#334155" stroke-width="5" marker-end="url(#ar2)"/>
  <line x1="505" y1="248" x2="505" y2="192" stroke="#334155" stroke-width="5" marker-end="url(#ar2)"/>
  <text x="600" y="230" font-size="17" fill="#334155" text-anchor="middle">lưu trữ</text>
</svg>`;

const LESSON = {
  meta: {
    subject: "Tin học", grade: "6",
    book: "Kết nối tri thức với cuộc sống",
    title: "Bài 2: Xử lí thông tin",
    unit: "Chủ đề 1: Máy tính và cộng đồng",
    pages: "SGK tr.8–11", durationMinutes: 45,
  },

  objectives: {
    knowledge: [
      "Nêu được các hoạt động cơ bản trong xử lí thông tin.",
      "Giải thích được máy tính là công cụ hiệu quả để xử lí thông tin; nêu ví dụ minh hoạ.",
    ],
    competencies: ["Tự chủ và tự học", "Giao tiếp và hợp tác", "Giải quyết vấn đề và sáng tạo", "Năng lực số"],
    qualities: ["Nhân ái", "Chăm chỉ", "Trung thực", "Trách nhiệm"],
  },

  coreKnowledge: [
    "Quá trình xử lí thông tin gồm 4 bước: Thu nhận → Lưu trữ → Xử lí → Truyền thông tin.",
    "Máy tính có đủ 4 thành phần: Thiết bị vào (thu nhận), Bộ nhớ (lưu trữ), Bộ xử lí/CPU (xử lí), Thiết bị ra (truyền, chia sẻ).",
    "Máy tính xử lí thông tin hiệu quả: nhanh, chính xác, xử lí nhiều dạng thông tin, lưu trữ dung lượng lớn và bền bỉ.",
  ],
  keywords: ["Xử lí thông tin", "4 bước", "Máy tính"],

  settings: { basePoints: 100, useTimer: false, defaultTime: 180, sound: false, streakEnabled: true },

  activities: [
    /* ------------------------------------------------------------------ */
    {
      id: "mo-dau",
      name: "Hoạt động 1: Mở đầu",
      type: "intro",
      time: 300,
      task: "Quan sát tình huống cầu thủ đá phạt đền và cho biết: trong khoảnh khắc đó, bộ não của cầu thủ đã LÀM những gì?",
      sgkImage: "assets/sgk/sgk-trang8.jpg",
      goal: "Nhận ra bộ não thực hiện một loạt hoạt động xử lí thông tin.",
      teacherNote: "Cho HS thảo luận nhóm quanh tình huống quả phạt đền trước khi hiện nội dung.",
      content: {
        heading: "⚽ Cú sút phạt đền tài tình",
        revealLabel: "🔍 Hiện tình huống (bấm khi HS đã thảo luận)",
        blocks: [
          { kind: "text", value: "Minh nhớ mãi một quả phạt đền. Khi thực hiện, mắt cầu thủ liên tục quan sát thủ môn và đoán xem góc nào của khung thành là sơ hở nhất. Sải bước, tạo đà, anh khéo léo chiến thắng thủ môn bằng một cú sút mạnh vào góc cao khung thành." },
          { kind: "list", value: [
            "👀 Mắt theo dõi vị trí thủ môn → thông tin chuyển lên não.",
            "🧠 Não phân tích, đánh giá, suy luận → thành ý định: sút vào góc cao.",
            "🦵 Ý định được thực hiện bằng cú sút thành công.",
          ] },
        ],
      },
      questions: [
        {
          question: "Bộ não của cầu thủ nhận được thông tin (vị trí thủ môn, quả bóng) chủ yếu từ giác quan nào?",
          type: "multiple-choice",
          options: ["Khứu giác (mũi)", "Thị giác (mắt)", "Vị giác (lưỡi)", "Xúc giác (da)"],
          answer: 1,
          hint: "Cầu thủ 'liên tục quan sát' thủ môn — dùng bộ phận nào để quan sát?",
          explanation: "Chính xác! Cầu thủ dùng THỊ GIÁC (mắt) để quan sát thủ môn, quả bóng và khoảng cách tới khung thành.",
          level: "nhan-biet", activity: "mo-dau",
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "hd21",
      name: "Hoạt động 2.1: Xử lí thông tin",
      type: "knowledge",
      time: 300,
      task: "Đọc SGK và cho biết: Quá trình xử lí thông tin của con người gồm những BƯỚC nào? Nêu ý nghĩa mỗi bước.",
      sgkImage: "assets/sgk/sgk-trang9.jpg",
      goal: "Trình bày được 4 bước xử lí thông tin.",
      content: {
        heading: "🧠 Bốn bước xử lí thông tin của con người",
        revealLabel: "🔍 Hiện 4 bước (bấm sau khi HS trả lời)",
        blocks: [
          { kind: "svg", value: SVG_4BUOC },
          { kind: "list", value: [
            "👂 Thu nhận thông tin: nhờ các giác quan, con người nhận thông tin từ thế giới bên ngoài (âm thanh, hình ảnh, màu sắc, mùi vị…).",
            "💾 Lưu trữ thông tin: bộ não ghi nhớ; con người còn lưu trữ bằng cách ghi chép.",
            "🧠 Xử lí thông tin: bộ não so sánh, phân tích, suy luận… biến thông tin ban đầu thành thông tin mới (kết luận, quyết định).",
            "📢 Truyền thông tin: thông tin được chuyển thành hành vi hoặc chia sẻ với người khác.",
          ] },
        ],
      },
      remember: [
        "Quá trình xử lí thông tin gồm 4 bước: Thu nhận → Lưu trữ → Xử lí → Truyền thông tin.",
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "sap-xep",
      name: "Trò chơi: Sắp đúng 4 bước",
      type: "ordering",
      time: 120,
      task: "Kéo các thẻ về đúng THỨ TỰ của quá trình xử lí thông tin.",
      goal: "Ghi nhớ đúng trình tự 4 bước.",
      steps: ["Thu nhận thông tin", "Lưu trữ thông tin", "Xử lí thông tin", "Truyền thông tin"],
      explanation: "Trình tự đúng: Thu nhận → Lưu trữ → Xử lí → Truyền thông tin.",
    },

    /* ------------------------------------------------------------------ */
    {
      id: "phan-loai-hd",
      name: "Phân loại hoạt động xử lí thông tin",
      type: "dragdrop",
      time: 180,
      task: "Mỗi việc dưới đây thuộc hoạt động nào của quá trình xử lí thông tin? Kéo thẻ vào đúng nhóm.",
      goal: "Phân biệt được 4 hoạt động qua ví dụ đời sống (câu hỏi SGK tr.9 & luyện tập).",
      groups: ["Thu nhận", "Lưu trữ", "Xử lí", "Truyền"],
      items: [
        { text: "Nghe chương trình ca nhạc trên đài", group: 0 },
        { text: "Chép bài trên bảng vào vở", group: 1 },
        { text: "Thực hiện một phép tính nhẩm", group: 2 },
        { text: "Thuyết trình chủ đề tình bạn trước lớp", group: 3 },
      ],
      explanation: "Nghe nhạc = thu nhận; chép bài = lưu trữ; tính nhẩm = xử lí; thuyết trình = truyền thông tin.",
    },

    /* ------------------------------------------------------------------ */
    {
      id: "hd22",
      name: "Hoạt động 2.2: Xử lí thông tin trong máy tính",
      type: "knowledge",
      time: 300,
      task: "Đọc SGK và cho biết: Máy tính gồm những THÀNH PHẦN nào? Mỗi thành phần có chức năng gì trong quá trình xử lí thông tin?",
      sgkImage: "assets/sgk/sgk-trang10.jpg",
      goal: "Nêu được 4 thành phần của máy tính và chức năng.",
      content: {
        heading: "💻 Máy tính xử lí thông tin như thế nào?",
        revealLabel: "🔍 Hiện mô hình & 4 thành phần",
        blocks: [
          { kind: "svg", value: SVG_MAYTINH },
          { kind: "list", value: [
            "⌨️ Thiết bị vào (bàn phím, chuột, máy quét…): thu nhận thông tin.",
            "🔵 Bộ xử lí (CPU): xử lí thông tin bằng cách thực hiện chương trình do con người viết.",
            "💽 Bộ nhớ (USB, thẻ nhớ, đĩa cứng…): lưu trữ thông tin.",
            "🖥️ Thiết bị ra (màn hình, máy in…): truyền, chia sẻ thông tin.",
          ] },
        ],
      },
      remember: [
        "Máy tính có đủ 4 thành phần: Thiết bị vào (thu nhận), Bộ nhớ (lưu trữ), Bộ xử lí/CPU (xử lí), Thiết bị ra (truyền, chia sẻ).",
        "Máy tính xử lí thông tin hiệu quả: nhanh, chính xác, xử lí nhiều dạng thông tin, lưu trữ lớn và bền bỉ.",
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "ghep-thanh-phan",
      name: "Ghép đôi: Thành phần ↔ Chức năng",
      type: "matching",
      time: 150,
      task: "Nối mỗi thành phần của máy tính với đúng chức năng của nó.",
      goal: "Củng cố chức năng 4 thành phần máy tính.",
      pairs: [
        { left: "⌨️ Thiết bị vào (bàn phím, chuột)", right: "Thu nhận thông tin" },
        { left: "🔵 Bộ xử lí (CPU)", right: "Xử lí thông tin" },
        { left: "💽 Bộ nhớ (USB, thẻ nhớ)", right: "Lưu trữ thông tin" },
        { left: "🖥️ Thiết bị ra (màn hình, máy in)", right: "Truyền, chia sẻ thông tin" },
      ],
      explanation: "Thiết bị vào ↔ thu nhận; CPU ↔ xử lí; Bộ nhớ ↔ lưu trữ; Thiết bị ra ↔ truyền/chia sẻ.",
    },

    /* ------------------------------------------------------------------ */
    {
      id: "luyen-tap",
      name: "Hoạt động 3: Luyện tập",
      type: "quiz",
      time: 300,
      task: "Trả lời nhanh các câu hỏi để củng cố kiến thức. Chia đội thi cho vui nhé!",
      sgkImage: "assets/sgk/sgk-trang11.jpg",
      goal: "Củng cố toàn bài.",
      questions: [
        {
          question: "Máy tính gồm mấy thành phần để có thể thực hiện các hoạt động xử lí thông tin?",
          type: "multiple-choice",
          options: ["3", "4", "5", "6"],
          answer: 1,
          hint: "Thu nhận – lưu trữ – xử lí – truyền, mỗi việc do một thành phần đảm nhận.",
          explanation: "Máy tính có 4 thành phần: thiết bị vào, bộ nhớ, bộ xử lí (CPU) và thiết bị ra.",
          level: "nhan-biet", activity: "luyen-tap",
        },
        {
          question: "Chức năng của BỘ NHỚ máy tính là gì?",
          type: "multiple-choice",
          options: ["Thu nhận thông tin", "Hiển thị thông tin", "Lưu trữ thông tin", "Xử lí thông tin"],
          answer: 2,
          hint: "USB, thẻ nhớ, đĩa cứng dùng để làm gì?",
          explanation: "Bộ nhớ (USB, thẻ nhớ, đĩa cứng…) dùng để LƯU TRỮ thông tin.",
          level: "thong-hieu", activity: "luyen-tap",
        },
        {
          question: "Bộ nhớ của máy tính có được coi là VẬT MANG TIN không?",
          type: "true-false",
          answer: true,
          hint: "Vật mang tin là phương tiện lưu trữ và truyền tải thông tin.",
          explanation: "Đúng. Bộ nhớ lưu trữ dữ liệu nên nó là một vật mang tin; vật mang tin xuất hiện ở hoạt động lưu trữ.",
          level: "van-dung", activity: "luyen-tap",
        },
        {
          question: "'Quan sát đường đi của một chiếc tàu biển' thuộc hoạt động nào?",
          type: "multiple-choice",
          options: ["Thu nhận thông tin", "Lưu trữ thông tin", "Xử lí thông tin", "Truyền thông tin"],
          answer: 0,
          hint: "Quan sát bằng mắt để nhận thông tin.",
          explanation: "Quan sát (bằng mắt) là hoạt động THU NHẬN thông tin.",
          level: "van-dung", activity: "luyen-tap",
        },
        {
          question: "'Chuyển thể một bài văn xuôi thành văn vần' thuộc hoạt động nào?",
          type: "multiple-choice",
          options: ["Thu nhận", "Truyền", "Lưu trữ", "Xử lí thông tin"],
          answer: 3,
          hint: "Em phải suy nghĩ, biến đổi nội dung cũ thành dạng mới.",
          explanation: "Biến đổi bài văn xuôi thành văn vần đòi hỏi suy nghĩ, sáng tạo → đó là XỬ LÍ thông tin.",
          level: "van-dung-cao", activity: "luyen-tap",
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "van-dung",
      name: "Hoạt động 4: Vận dụng",
      type: "scenario",
      time: 300,
      task: "Vận dụng 4 bước xử lí thông tin vào một tình huống thực tế của em.",
      goal: "Áp dụng quy trình xử lí thông tin vào đời sống.",
      content: {
        situation: "Giả sử lớp em chuẩn bị một chuyến đi chơi xa. Để lên kế hoạch, em phải tìm hiểu địa điểm, thời tiết, phương tiện, đồ dùng…",
        question: "Hãy chỉ ra các hoạt động xử lí thông tin (thu nhận – lưu trữ – xử lí – truyền) khi em lên kế hoạch cho chuyến đi.",
        hints: [
          "Thu nhận: tìm thông tin về địa điểm, thời tiết (trên Internet, hỏi người khác).",
          "Lưu trữ: ghi chép lại kế hoạch, lưu vào điện thoại/máy tính.",
          "Xử lí: chọn phương án phù hợp (đi ngày nào, mang gì).",
          "Truyền: chia sẻ kế hoạch cho các bạn trong nhóm.",
        ],
        modelAnswer: "Thu nhận: tra cứu địa điểm & thời tiết, hỏi thầy cô/bố mẹ. Lưu trữ: ghi kế hoạch vào vở/điện thoại. Xử lí: cân nhắc chọn thời gian, phương tiện, đồ mang theo. Truyền: gửi kế hoạch cho cả nhóm cùng thực hiện.",
      },
      questions: [
        {
          question: "Vì sao nói máy tính giúp con người xử lí thông tin HIỆU QUẢ?",
          type: "multiple-select",
          options: ["Tính toán nhanh, chính xác", "Lưu trữ dung lượng lớn", "Tự quyết định thay con người mọi việc", "Hoạt động bền bỉ, xử lí nhiều dạng thông tin"],
          answer: [0, 1, 3],
          hint: "Máy tính hỗ trợ con người, chứ không thay con người quyết định mọi thứ.",
          explanation: "Máy tính nhanh, chính xác, lưu trữ lớn, bền bỉ. Nó KHÔNG tự quyết định thay con người mọi việc — nó chạy chương trình do con người viết.",
          level: "van-dung-cao", activity: "van-dung",
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "tong-ket",
      name: "Tổng kết",
      type: "summary",
      time: 180,
      task: "Cùng nhắc lại những điều quan trọng nhất của bài học hôm nay.",
      goal: "Chốt kiến thức trọng tâm.",
      content: {
        learned: null,
        challenge: [
          {
            question: "Khi em gõ một bài văn trên máy tính rồi in ra giấy, thứ tự các thành phần tham gia là?",
            type: "multiple-choice",
            options: [
              "Thiết bị ra → CPU → Thiết bị vào",
              "Thiết bị vào (bàn phím) → CPU xử lí, Bộ nhớ lưu → Thiết bị ra (máy in)",
              "Bộ nhớ → Thiết bị vào → CPU",
              "CPU → Thiết bị vào → Bộ nhớ",
            ],
            answer: 1,
            hint: "Bắt đầu từ nơi em nhập chữ, kết thúc ở nơi đưa kết quả ra ngoài.",
            explanation: "Bàn phím (thiết bị vào) nhận chữ → CPU xử lí và Bộ nhớ lưu → máy in (thiết bị ra) đưa kết quả ra giấy.",
            level: "van-dung-cao", activity: "tong-ket",
          },
        ],
      },
    },
  ],
};
if (typeof module !== "undefined" && module.exports) module.exports = LESSON;
if (typeof window !== "undefined") window.LESSON = LESSON;
