/* ============================================================================
 * BÀI 5 — TÌM HIỂU PHẦN MỀM MÔ PHỎNG  (Tin học 9 — KNTT)
 * Chủ đề 4: Ứng dụng tin học.
 * Bám sát SGK trang 20–22 + Kế hoạch bài dạy (1 tiết) của giáo viên.
 * Chỉ sửa file này để đổi nội dung. Engine app.js không cần sửa.
 * ==========================================================================*/

/* Sơ đồ trộn màu trừ (CMY): 3 vòng tròn Cyan/Magenta/Yellow chồng nhau */
function cmyMixSVG() {
  return `<svg viewBox="0 0 360 330" width="100%" style="max-height:44vh" xmlns="http://www.w3.org/2000/svg" role="img">
    <g style="mix-blend-mode:multiply">
      <circle cx="180" cy="110" r="95" fill="#22d3ee"/>
      <circle cx="130" cy="200" r="95" fill="#ec4899"/>
      <circle cx="230" cy="200" r="95" fill="#fde047"/>
    </g>
    <text x="180" y="40" text-anchor="middle" font-size="16" font-weight="800" fill="#0e7490">Cyan (xanh lơ)</text>
    <text x="70" y="300" text-anchor="middle" font-size="16" font-weight="800" fill="#be185d">Magenta</text>
    <text x="295" y="300" text-anchor="middle" font-size="16" font-weight="800" fill="#a16207">Yellow</text>
    <text x="128" y="165" text-anchor="middle" font-size="13" font-weight="800" fill="#fff">LAM</text>
    <text x="232" y="165" text-anchor="middle" font-size="13" font-weight="800" fill="#fff">LỤC</text>
    <text x="180" y="230" text-anchor="middle" font-size="13" font-weight="800" fill="#fff">ĐỎ</text>
  </svg>`;
}

const LESSON = {
  meta: {
    subject: "Tin học", grade: "9", book: "Kết nối tri thức với cuộc sống",
    title: "Bài 5: Tìm hiểu phần mềm mô phỏng", unit: "Chủ đề 4 — Ứng dụng tin học",
    pages: "20–22", durationMinutes: 45,
  },
  objectives: {
    knowledge: [
      "Nêu được ví dụ phần mềm mô phỏng.",
      "Nhận ra được ích lợi của phần mềm mô phỏng.",
    ],
    competencies: [
      "Tự chủ – tự học; giao tiếp – hợp tác; giải quyết vấn đề.",
      "Năng lực số: kể tên & xác định ứng dụng phần mềm mô phỏng (5.2.TC2b); thao tác & quan sát (5.3.TC2a); nêu lợi ích (5.3.TC2b).",
    ],
    qualities: ["Chăm chỉ, trung thực, trách nhiệm khi thực hành mô phỏng"],
  },
  coreKnowledge: [
    "Phần mềm mô phỏng thể hiện trực quan sự vận động của một đối tượng, cho phép người dùng tương tác và tìm hiểu cách thức hoạt động của đối tượng đó.",
    "Ví dụ: Trycolors (pha màu), PhET/Crocodile Physics (vật lí), Crocodile Chemistry (hoá), GeoGebra (toán/hình), Flowgorithm (thuật toán)…",
    "Lợi ích: hỗ trợ nghiên cứu đối tượng toàn diện, sinh động, an toàn, chi phí thấp hơn nghiên cứu trực tiếp.",
    "Mô phỏng giúp luyện tập nhiều tình huống và tránh làm hỏng thiết bị / gây nguy hiểm.",
    "Nên dùng phần mềm mô phỏng chất lượng cao và không vi phạm bản quyền.",
  ],
  keywords: ["Phần mềm mô phỏng", "Trycolors · PhET · GeoGebra", "Trực quan – an toàn – tiết kiệm", "Hệ màu CMYK"],
  settings: { basePoints: 100, useTimer: false, defaultTime: 60, sound: false, streakEnabled: true },

  activities: [
    /* ===================== HĐ1: MỞ ĐẦU ===================== */
    {
      id: "khoi-dong", name: "Khởi động — Nỗi khổ pha màu", type: "intro",
      goal: "Tạo nhu cầu dùng phần mềm mô phỏng trước khi thực hành thật.",
      time: 180,
      task: "Đọc hội thoại Minh – An (SGK tr.20). Nhóm: vì sao nên dùng phần mềm mô phỏng trước khi pha màu thật?",
      sgkImage: "assets/sgk/sgk-trang20.jpg",
      content: {
        heading: "🎨 Pha mãi không ra màu cánh sen!",
        prompt: "Minh pha màu nhiều lần mà chưa ra màu cánh sen ưng ý; trộn nhiều đến mức màu xỉn đục, bỏ đi. An mách: hãy dùng phần mềm mô phỏng để tập pha màu trước!",
        blocks: [
          { kind: "text", value: "👉 Pha màu thật rất tốn màu vẽ và thời gian; trộn sai là hỏng cả hỗn hợp. Phần mềm mô phỏng giúp thử pha thoải mái mà không tốn gì." },
        ],
        revealLabel: "🔍 Gợi ý",
      },
      questions: [
        {
          question: "Vì sao An khuyên Minh dùng phần mềm mô phỏng TRƯỚC khi pha màu thật?",
          type: "multiple-choice",
          options: ["Để pha thử thoải mái, tiết kiệm màu vẽ và thời gian, xem trước kết quả", "Vì phần mềm pha ra màu thật để vẽ", "Vì máy tính đẹp hơn giấy vẽ", "Vì không cần học pha màu nữa"],
          answer: 0, explanation: "Mô phỏng cho phép thử pha nhiều lần, xem trước màu kết quả mà không tốn màu vẽ hay thời gian.",
          level: "thong-hieu", activity: "khoi-dong",
        },
      ],
    },

    /* ===================== HĐ2.1: PHẦN MỀM MÔ PHỎNG ===================== */
    {
      id: "pha-mau", name: "Phần mềm mô phỏng là gì?", type: "knowledge",
      goal: "Hiểu khái niệm phần mềm mô phỏng qua ví dụ pha màu.",
      time: 300,
      task: "Đọc mục 1 (SGK tr.20–21). Nhóm: phần mềm mô phỏng pha màu cho làm gì? Phát biểu khái niệm phần mềm mô phỏng.",
      sgkImage: "assets/sgk/sgk-trang20.jpg",
      content: {
        heading: "🖥️ Mô phỏng — thử nghiệm trên màn hình",
        revealLabel: "🔍 Hiện khái niệm & ví dụ pha màu",
        blocks: [
          { kind: "text", value: "Phần mềm mô phỏng pha màu (VD trycolors.com) cho phép chọn màu, tăng/giảm tỉ lệ các màu và nhìn thấy MÀU KẾT QUẢ ngay trên màn hình — thử pha bao nhiêu lần cũng được." },
          { kind: "html", value: '<div style="background:#ecfeff;border:2px solid #0e7490;border-radius:14px;padding:14px 18px;font-size:18px;text-align:center;font-weight:700;color:#155e75">Phần mềm mô phỏng thể hiện TRỰC QUAN sự vận động của một đối tượng,<br>cho phép người dùng TƯƠNG TÁC và tìm hiểu cách thức hoạt động của đối tượng đó.</div>' },
        ],
      },
      questions: [
        {
          question: "Phần mềm mô phỏng là gì?",
          type: "multiple-choice",
          options: ["Phần mềm chỉ để chơi trò chơi", "Phần mềm thể hiện trực quan sự vận động của đối tượng, cho phép tương tác & tìm hiểu cách hoạt động", "Một trang mạng xã hội", "Phần mềm diệt virus"],
          answer: 1, explanation: "Chính xác! Đó là định nghĩa phần mềm mô phỏng.",
          level: "nhan-biet", activity: "pha-mau",
        },
      ],
      remember: [
        "Phần mềm mô phỏng: thể hiện trực quan, cho tương tác để tìm hiểu cách hoạt động của đối tượng.",
      ],
    },
    {
      id: "phan-mem-linh-vuc", name: "Trò chơi: Phần mềm ↔ Lĩnh vực", type: "matching",
      goal: "Nhận diện một số phần mềm mô phỏng và lĩnh vực ứng dụng.",
      time: 180,
      task: "Nối mỗi phần mềm mô phỏng với lĩnh vực/môn học nó phục vụ.",
      sgkImage: "assets/sgk/sgk-trang21.jpg",
      pairs: [
        { left: "Trycolors.com", right: "Mô phỏng pha màu" },
        { left: "PhET / Crocodile Physics", right: "Thí nghiệm Vật lí (mạch điện…)" },
        { left: "Crocodile Chemistry / ChemLab", right: "Thí nghiệm Hoá học" },
        { left: "GeoGebra / Sketchpad", right: "Vẽ hình & giải Toán" },
        { left: "Flowgorithm", right: "Chạy thử thuật toán (sơ đồ khối)" },
      ],
      explanation: "Mỗi lĩnh vực có phần mềm mô phỏng riêng: Vật lí, Hoá học, Toán, Tin học, mĩ thuật (pha màu)…",
    },

    /* ===================== HĐ2.2: LỢI ÍCH ===================== */
    {
      id: "loi-ich", name: "Lợi ích của phần mềm mô phỏng", type: "knowledge",
      goal: "Nêu các lợi ích chính của phần mềm mô phỏng.",
      time: 240,
      task: "Đọc mục 2 (SGK tr.21–22). Nhóm 'khăn trải bàn': liệt kê lợi ích của phần mềm mô phỏng.",
      sgkImage: "assets/sgk/sgk-trang22.jpg",
      content: {
        heading: "✨ Vì sao nên dùng mô phỏng?",
        revealLabel: "🔍 Hiện các lợi ích",
        blocks: [
          { kind: "html", value:
            '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">' +
            [['👀 Trực quan, sinh động','Học lí thuyết bằng cách tương tác, dễ hiểu hơn.'],['💰 Chi phí thấp','Làm quen, nghiên cứu đối tượng mà tốn ít vật liệu, thời gian.'],['🔁 Luyện tập nhiều lần','Tạo nhiều tình huống để luyện tập/nghiên cứu đầy đủ.'],['🛡️ An toàn','Tránh làm hỏng thiết bị hoặc gây nguy hiểm cho con người.']]
              .map(c=>`<div style="background:#ecfeff;border:2px solid #0e7490;border-radius:12px;padding:10px"><b style="color:#155e75">${c[0]}</b><div style="font-size:14px">${c[1]}</div></div>`).join("") +
            '</div>' },
          { kind: "text", value: "👉 Lợi ích của phần mềm mô phỏng là hỗ trợ nghiên cứu đối tượng một cách TOÀN DIỆN, SINH ĐỘNG và AN TOÀN với chi phí thấp hơn nghiên cứu trực tiếp trong thực tế." },
          { kind: "ext", value: "⚠️ Các phần mềm mô phỏng có chất lượng khác nhau — nên dùng phần mềm chất lượng cao và không vi phạm bản quyền." },
        ],
      },
      remember: [
        "Lợi ích: trực quan – sinh động – an toàn – chi phí thấp; luyện tập nhiều tình huống, tránh hỏng thiết bị/nguy hiểm.",
      ],
    },
    {
      id: "khi-nao-mo-phong", name: "Trò chơi: Khi nào nên dùng mô phỏng?", type: "dragdrop",
      goal: "Nhận ra tình huống nên ưu tiên phần mềm mô phỏng.",
      time: 180,
      task: "Chọn từng tình huống rồi bấm: 'Nên ưu tiên MÔ PHỎNG' hay 'Làm trực tiếp cũng ổn'.",
      groups: ["Nên ưu tiên MÔ PHỎNG 🖥️", "Làm trực tiếp cũng ổn 🙂"],
      items: [
        { text: "Thí nghiệm hoá học nguy hiểm, dễ cháy nổ", group: 0 },
        { text: "Thử pha thật nhiều tỉ lệ màu khác nhau", group: 0 },
        { text: "Quan sát chuyển động phân tử (khó thấy thật)", group: 0 },
        { text: "Lắp mạch điện có thể gây chập, hỏng linh kiện", group: 0 },
        { text: "Gấp một chiếc thuyền giấy đơn giản", group: 1 },
      ],
      explanation: "Ưu tiên mô phỏng khi việc thật nguy hiểm, tốn kém, khó quan sát hoặc cần thử nhiều lần. Việc đơn giản, an toàn thì làm trực tiếp.",
    },

    /* ===================== HỆ MÀU CMYK ===================== */
    {
      id: "cmyk", name: "Khám phá hệ màu CMYK", type: "knowledge",
      goal: "Dùng ý tưởng mô phỏng pha màu để hiểu trộn màu CMY.",
      time: 240,
      task: "Quan sát sơ đồ trộn màu. Nhóm: Cyan + Yellow = ? Cyan + Magenta = ? Magenta + Yellow = ?",
      sgkImage: "assets/sgk/sgk-trang22.jpg",
      content: {
        heading: "🌈 Trộn 3 màu cơ bản CMY",
        revealLabel: "🔍 Xem sơ đồ trộn màu",
        blocks: [
          { kind: "svg", value: cmyMixSVG() },
          { kind: "html", value:
            '<div style="font-size:18px;text-align:center;line-height:2">' +
            '🔵 Cyan + 🟡 Yellow = <b style="color:#16a34a">LỤC (Green)</b><br>' +
            '🔵 Cyan + 🟣 Magenta = <b style="color:#2563eb">LAM (Blue)</b><br>' +
            '🟣 Magenta + 🟡 Yellow = <b style="color:#dc2626">ĐỎ (Red)</b></div>' },
          { kind: "text", value: "Phần mềm mô phỏng pha màu (trycolors.com) giúp em tự kiểm chứng các kết quả này ngay trên màn hình mà không cần màu vẽ thật." },
        ],
      },
      remember: ["CMY trộn ra RGB: Cyan+Yellow=Lục · Cyan+Magenta=Lam · Magenta+Yellow=Đỏ."],
    },

    /* ===================== HĐ3: LUYỆN TẬP (Tiếp sức) ===================== */
    {
      id: "luyen-tap", name: "Luyện tập — Tiếp sức", type: "quiz",
      goal: "Củng cố khái niệm, ví dụ, lợi ích và hệ màu.",
      time: 300,
      task: "Chia đội trả lời tiếp sức. Chọn đáp án đúng cho mỗi câu.",
      questions: [
        { question: "Phần mềm GeoGebra thường được dùng để mô phỏng hoạt động nào?", type: "multiple-choice",
          options: ["Vẽ hình học và giải Toán", "Pha màu", "Thí nghiệm hoá học", "Lái xe"],
          answer: 0, explanation: "GeoGebra mô phỏng vẽ hình và hỗ trợ giải Toán.", level: "nhan-biet", activity: "luyen-tap" },
        { question: "Đâu là LỢI ÍCH của phần mềm mô phỏng?", type: "multiple-select",
          options: ["Trực quan, sinh động", "An toàn, tránh nguy hiểm", "Luôn cho kết quả giống hệt thực tế 100%", "Tiết kiệm thời gian & chi phí"],
          answer: [0, 1, 3], explanation: "Mô phỏng trực quan, an toàn, tiết kiệm. Nhưng nó KHÔNG phải thực tế 100% — chỉ là mô phỏng gần đúng.", level: "thong-hieu", activity: "luyen-tap" },
        { question: "Trường hợp nào NÊN ưu tiên dùng phần mềm mô phỏng nhất?", type: "multiple-choice",
          options: ["Gấp thuyền giấy", "Thí nghiệm hoá chất dễ cháy nổ, nguy hiểm", "Tô màu bằng bút chì màu", "Đá bóng ngoài sân"],
          answer: 1, explanation: "Thí nghiệm nguy hiểm nên mô phỏng để bảo đảm an toàn.", level: "van-dung", activity: "luyen-tap" },
        { question: "Trong hệ màu CMYK, Magenta + Yellow tạo ra màu gì?", type: "multiple-choice",
          options: ["Màu lục (Green)", "Màu lam (Blue)", "Màu đỏ (Red)", "Màu đen (Black)"],
          answer: 2, explanation: "Magenta + Yellow = Đỏ (Red).", hint: "Xem lại sơ đồ trộn màu CMY.", level: "van-dung", activity: "luyen-tap" },
        { question: "Khi chọn phần mềm mô phỏng để dùng, em cần lưu ý điều gì?", type: "multiple-choice",
          options: ["Chọn phần mềm bất kì, càng lạ càng tốt", "Dùng phần mềm chất lượng cao và không vi phạm bản quyền", "Chỉ cần miễn phí là được", "Không cần quan tâm nguồn gốc"],
          answer: 1, explanation: "Nên dùng phần mềm chất lượng cao, hợp pháp (không vi phạm bản quyền).", level: "van-dung-cao", activity: "luyen-tap" },
      ],
    },

    /* ===================== HĐ4: VẬN DỤNG ===================== */
    {
      id: "van-dung", name: "Vận dụng", type: "vandung",
      goal: "Áp dụng: giới thiệu một phần mềm mô phỏng & hệ màu CMYK.",
      time: 240,
      task: "Nhóm thảo luận 2 nhiệm vụ, ghi ra bảng nhóm rồi bấm xem gợi ý.",
      cases: [
        {
          question: "Hãy chọn một phần mềm mô phỏng hỗ trợ học tập và cho biết: (a) nó mô phỏng hoạt động nào? (b) giúp em làm gì? (c) có lợi ích gì?",
          answer: "Ví dụ GeoGebra: (a) mô phỏng vẽ hình học và giải toán; (b) giúp vẽ hình chính xác, quan sát trực quan bài toán; (c) tiết kiệm thời gian, giúp GV dễ dạy – HS dễ hiểu, tạo hứng thú. (HS có thể chọn PhET, Trycolors, Crocodile Chemistry… và trình bày tương tự.)",
        },
        {
          question: "Dùng phần mềm mô phỏng pha màu tìm hiểu hệ CMYK: Cyan+Yellow = ? · Cyan+Magenta = ? · Magenta+Yellow = ?",
          answer: "Cyan + Yellow = LỤC (Green); Cyan + Magenta = LAM (Blue); Magenta + Yellow = ĐỎ (Red). Như vậy Red, Green, Blue đều được tạo ra bằng cách trộn hai trong ba màu cơ bản CMY.",
        },
      ],
    },

    /* ===================== TỔNG KẾT ===================== */
    {
      id: "tong-ket", name: "Tổng kết", type: "summary",
      goal: "Chốt kiến thức trọng tâm.",
      task: "Nhắc lại 5 điều cốt lõi; làm 2 thử thách cuối.",
      content: {
        learned: null,
        challenge: [
          { question: "Ý nào KHÔNG phải lợi ích của phần mềm mô phỏng?", type: "multiple-choice",
            options: ["Trực quan, sinh động", "An toàn với người dùng", "Thay thế hoàn toàn mọi thí nghiệm thực tế, kết quả y hệt 100%", "Tiết kiệm chi phí, thời gian"],
            answer: 2, explanation: "Mô phỏng không thay thế 100% thực tế — nó là công cụ hỗ trợ trực quan, an toàn, tiết kiệm.", level: "thong-hieu", activity: "tong-ket" },
          { question: "Lớp em cần khảo sát nhiều phương án đèn giao thông để giảm ùn tắc trước cổng trường. Cách làm khả thi & an toàn nhất là?", type: "multiple-choice",
            options: ["Tự ra đường thử đổi đèn thật", "Dùng phần mềm mô phỏng giao thông để thử các phương án rồi chọn phương án tốt", "Không làm gì cả", "Chặn đường để thử"],
            answer: 1, explanation: "Dùng phần mềm mô phỏng giao thông (VD traffic-simulation.de) để thử nhiều phương án an toàn, không ảnh hưởng thực tế.", level: "van-dung-cao", activity: "tong-ket" },
        ],
      },
    },
  ],
};
if (typeof module !== "undefined" && module.exports) module.exports = LESSON;
if (typeof window !== "undefined") window.LESSON = LESSON;
