/* ============================================================================
 * BÀI 2: PHẦN MỀM MÁY TÍNH — Tin học 7 (Kết nối tri thức với cuộc sống)
 * Chủ đề 1: Máy tính và cộng đồng · SGK tr.10–12 · Giáo án 2 tiết
 *
 * Nội dung bám SGK Tin học 7 (tr.10–12) và Kế hoạch bài dạy của giáo viên.
 * Bảng 2.1 (phân biệt HĐH & PMƯD), câu hỏi Luyện tập lấy từ SGK + giáo án.
 * Sơ đồ "lớp phần mềm" vẽ lại bằng SVG; ảnh SGK gốc ở assets/sgk/.
 * ==========================================================================*/

/* ---- Sơ đồ SVG: 3 lớp Phần cứng → Hệ điều hành → Phần mềm ứng dụng ---- */
const SVG_LOP = `
<svg viewBox="0 0 820 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Sơ đồ lớp phần mềm">
  <rect x="60" y="20" width="700" height="70" rx="14" fill="#22c55e"/>
  <text x="410" y="52" font-size="24" font-weight="800" fill="#fff" text-anchor="middle">🧑‍💻 NGƯỜI SỬ DỤNG</text>
  <text x="410" y="78" font-size="15" fill="#eafff1" text-anchor="middle">tương tác qua giao diện</text>
  <rect x="60" y="105" width="700" height="70" rx="14" fill="#6366f1"/>
  <text x="410" y="137" font-size="22" font-weight="800" fill="#fff" text-anchor="middle">📱 PHẦN MỀM ỨNG DỤNG</text>
  <text x="410" y="162" font-size="15" fill="#eef0ff" text-anchor="middle">Word · PowerPoint · Scratch · Chrome · Zalo…</text>
  <rect x="60" y="190" width="700" height="70" rx="14" fill="#f97316"/>
  <text x="410" y="222" font-size="22" font-weight="800" fill="#fff" text-anchor="middle">⚙️ HỆ ĐIỀU HÀNH</text>
  <text x="410" y="247" font-size="15" fill="#fff5ec" text-anchor="middle">Windows · macOS · Linux · Android · iOS</text>
  <rect x="60" y="275" width="700" height="18" rx="8" fill="#94a3b8"/>
  <text x="410" y="289" font-size="13" font-weight="800" fill="#fff" text-anchor="middle">🔩 PHẦN CỨNG (bàn phím, chuột, màn hình, CPU…)</text>
</svg>`;

const LESSON = {
  meta: {
    subject: "Tin học", grade: "7",
    book: "Kết nối tri thức với cuộc sống",
    title: "Bài 2: Phần mềm máy tính",
    unit: "Chủ đề 1: Máy tính và cộng đồng",
    pages: "SGK tr.10–12", durationMinutes: 90,
  },

  objectives: {
    knowledge: [
      "Giải thích được sơ lược chức năng điều khiển và quản lí của hệ điều hành.",
      "Phân biệt được hệ điều hành với phần mềm ứng dụng.",
      "Nêu được tên một số phần mềm ứng dụng đã sử dụng.",
      "Giải thích được phần mở rộng của tên tệp, cho biết tệp thuộc loại gì và nêu ví dụ.",
    ],
    competencies: ["Tự chủ và tự học", "Giao tiếp và hợp tác", "Giải quyết vấn đề và sáng tạo", "Năng lực số"],
    qualities: ["Chăm chỉ", "Trung thực", "Nhân ái", "Trách nhiệm"],
  },

  coreKnowledge: [
    "Hệ điều hành là phần mềm hệ thống quản lí và điều khiển hoạt động chung của máy tính, quản lí dữ liệu, cung cấp giao diện người–máy và môi trường chạy phần mềm ứng dụng; phải được cài đầu tiên.",
    "Phần mềm ứng dụng là chương trình giúp người dùng thực hiện công việc cụ thể, xử lí loại dữ liệu cụ thể; chạy trong môi trường hệ điều hành.",
    "Loại tệp được nhận biết nhờ phần mở rộng (các kí tự sau dấu chấm cuối cùng), cho biết phần mềm nào có thể mở tệp đó.",
  ],
  keywords: ["Hệ điều hành", "Phần mềm ứng dụng", "Phần mở rộng"],

  // ÂM THANH BẬT SẴN cho bài này (chuông vui khi đúng, tiếng trầm khi sai) — có nút 🔊 để tắt nhanh.
  settings: { basePoints: 100, useTimer: false, defaultTime: 180, sound: true, streakEnabled: true },

  activities: [
    /* ------------------------------------------------------------------ */
    {
      id: "khoi-dong",
      name: "Hoạt động 1: Khởi động",
      type: "intro",
      time: 360,
      task: "Thảo luận cặp đôi: Hệ điều hành là phần cứng hay phần mềm? Được cài khi nào? Không có nó thì các phần mềm khác chạy được không?",
      goal: "Nhận ra máy tính cần phần mềm — trước hết là hệ điều hành — để hoạt động.",
      content: {
        heading: "🖥️ Máy tính vừa lắp xong đã chạy được chưa?",
        revealLabel: "🔍 Hiện gợi ý trả lời",
        blocks: [
          { kind: "text", value: "Sau khi lắp bàn phím, chuột, màn hình… vào thân máy, máy tính VẪN CHƯA hoạt động được. Máy tính còn cần phần mềm để hoạt động." },
          { kind: "list", value: [
            "Hệ điều hành KHÔNG phải thiết bị gắn vào máy — nó là PHẦN MỀM.",
            "Hệ điều hành là phần mềm được cài ĐẦU TIÊN trên máy tính.",
            "Các phần mềm khác chỉ chạy được SAU KHI máy đã có ít nhất một hệ điều hành.",
          ] },
        ],
      },
      questions: [
        {
          question: "Không có hệ điều hành thì các phần mềm khác trên máy tính có hoạt động được không?",
          type: "true-false",
          answer: false,
          hint: "Hệ điều hành tạo môi trường cho các phần mềm khác chạy.",
          explanation: "Không. Nếu chưa có hệ điều hành, máy tính chỉ là 'khối kim loại' — các phần mềm ứng dụng không thể chạy.",
          level: "nhan-biet", activity: "khoi-dong",
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "hd21",
      name: "Hoạt động 2.1: Hệ điều hành",
      type: "knowledge",
      time: 420,
      task: "Đọc SGK và cho biết: Hệ điều hành là gì? Có những chức năng cơ bản nào? Kể tên vài hệ điều hành.",
      sgkImage: "assets/sgk/sgk-trang10.jpg",
      goal: "Hiểu khái niệm, chức năng và ví dụ hệ điều hành.",
      content: {
        heading: "⚙️ Hệ điều hành — 'nhạc trưởng' của máy tính",
        revealLabel: "🔍 Hiện sơ đồ & chức năng",
        blocks: [
          { kind: "svg", value: SVG_LOP },
          { kind: "list", value: [
            "Quản lí các thiết bị và dữ liệu của máy tính, điều khiển chúng phối hợp nhịp nhàng.",
            "Cung cấp và quản lí môi trường trao đổi thông tin (giao diện) giữa người dùng và máy tính.",
            "Cung cấp, quản lí môi trường cho phép người dùng chạy các phần mềm ứng dụng.",
          ] },
          { kind: "text", value: "Ví dụ hệ điều hành: máy tính — Windows, macOS, Linux; điện thoại/máy tính bảng — Android, iOS." },
        ],
      },
      remember: [
        "Hệ điều hành là phần mềm hệ thống quản lí & điều khiển hoạt động chung của máy tính, quản lí dữ liệu, cung cấp giao diện và môi trường chạy phần mềm ứng dụng.",
        "HĐH cho máy tính: Windows, macOS, Linux. HĐH cho điện thoại/máy tính bảng: iOS, Android.",
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "ai-nhanh-hon",
      name: "Trò chơi: Ai nhanh hơn?",
      type: "quiz",
      time: 180,
      task: "Trả lời nhanh 2 câu về hệ điều hành (trò chơi 'Ai nhanh hơn' trong giáo án).",
      goal: "Củng cố khái niệm hệ điều hành.",
      questions: [
        {
          question: "Phần mềm nào sau đây KHÔNG phải là một hệ điều hành?",
          type: "multiple-choice",
          options: ["Windows 7", "Windows 10", "Windows Explorer", "Windows Phone"],
          answer: 2,
          hint: "Có một phần mềm dùng để quản lí tệp/thư mục, không phải để điều hành cả máy.",
          explanation: "Windows Explorer là phần mềm quản lí tệp/thư mục — KHÔNG phải hệ điều hành. Windows 7, 10, Phone đều là HĐH.",
          level: "thong-hieu", activity: "ai-nhanh-hon",
        },
        {
          question: "Chức năng nào sau đây KHÔNG phải của hệ điều hành?",
          type: "multiple-choice",
          options: ["Quản lí các tệp dữ liệu trên đĩa", "Tạo và chỉnh sửa nội dung một tệp hình ảnh", "Điều khiển các thiết bị vào – ra", "Quản lí giao diện giữa người sử dụng và máy tính"],
          answer: 1,
          hint: "Việc 'tạo và chỉnh sửa ảnh' do phần mềm nào làm?",
          explanation: "Tạo/chỉnh sửa ảnh là việc của PHẦN MỀM ỨNG DỤNG (Paint, Photoshop…), không phải chức năng của hệ điều hành.",
          level: "thong-hieu", activity: "ai-nhanh-hon",
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "phan-loai-hdh",
      name: "Phân loại: Hệ điều hành hay Phần mềm ứng dụng?",
      type: "dragdrop",
      time: 180,
      task: "Kéo mỗi phần mềm vào đúng nhóm: Hệ điều hành hay Phần mềm ứng dụng?",
      goal: "Phân biệt HĐH và PMƯD qua ví dụ quen thuộc.",
      groups: ["Hệ điều hành", "Phần mềm ứng dụng"],
      items: [
        { text: "Windows", group: 0 },
        { text: "Android", group: 0 },
        { text: "Linux", group: 0 },
        { text: "Microsoft Word", group: 1 },
        { text: "Google Chrome", group: 1 },
        { text: "Zalo", group: 1 },
      ],
      explanation: "Windows, Android, Linux là hệ điều hành; Word, Chrome, Zalo là phần mềm ứng dụng (chạy trên nền hệ điều hành).",
    },

    /* ------------------------------------------------------------------ */
    {
      id: "hd22",
      name: "Hoạt động 2.2: Phần mềm ứng dụng",
      type: "knowledge",
      time: 300,
      task: "Đọc SGK và cho biết: Phần mềm ứng dụng dùng để làm gì? Vì sao mỗi tệp có 'phần mở rộng'?",
      sgkImage: "assets/sgk/sgk-trang11.jpg",
      goal: "Hiểu phần mềm ứng dụng và phần mở rộng của tệp.",
      content: {
        heading: "📱 Phần mềm ứng dụng & phần mở rộng của tệp",
        revealLabel: "🔍 Hiện nội dung kiến thức",
        blocks: [
          { kind: "text", value: "Phần mềm ứng dụng giúp con người thực hiện những công việc cụ thể (soạn thảo văn bản, vẽ sơ đồ tư duy, lập trình Scratch, duyệt web…). Có phần mềm chạy trực tuyến, có phần mềm phải cài đặt." },
          { kind: "text", value: "Mỗi phần mềm xử lí một số loại dữ liệu với định dạng tệp riêng, nhận ra nhờ PHẦN MỞ RỘNG — gồm các kí tự sau dấu chấm cuối cùng trong tên tệp." },
          { kind: "text", value: "Ví dụ: tệp \"TapLamVan.doc\" — phần mở rộng \".doc\" cho hệ điều hành biết đây là tệp văn bản, mở/chỉnh sửa được bằng Microsoft Word." },
        ],
      },
      remember: [
        "Phần mềm ứng dụng: chương trình cho phép người dùng thực hiện công việc cụ thể và xử lí loại dữ liệu cụ thể.",
        "Loại tệp nhận biết nhờ phần mở rộng (kí tự sau dấu chấm cuối), cho biết phần mềm nào mở được nó.",
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "ghep-tep",
      name: "Ghép đôi: Loại tệp ↔ Phần mở rộng",
      type: "matching",
      time: 240,
      task: "Nối mỗi loại tệp với phần mở rộng phù hợp (Hoạt động 2 SGK).",
      sgkImage: "assets/sgk/sgk-trang11.jpg",
      goal: "Nhận biết loại tệp qua phần mở rộng.",
      pairs: [
        { left: "📄 Tài liệu Word", right: ".doc, .docx" },
        { left: "🐱 Chương trình Scratch", right: ".sb, .sb2, .sb3" },
        { left: "🖼️ Hình ảnh", right: ".jpg, .png, .bmp" },
        { left: "⚙️ Ứng dụng", right: ".exe, .com, .bat, .msi" },
        { left: "🌐 Trang web", right: ".htm, .html" },
        { left: "📊 Bài trình bày PowerPoint", right: ".ppt, .pptx" },
      ],
      explanation: "Đáp án SGK: 1-f (.doc/.docx) · 2-c (.sb…) · 3-a (.jpg…) · 4-b (.exe…) · 5-e (.htm/.html) · 6-d (.ppt/.pptx).",
    },

    /* ------------------------------------------------------------------ */
    {
      id: "luyen-tap",
      name: "Hoạt động 3: Luyện tập",
      type: "quiz",
      time: 360,
      task: "Trả lời nhanh các câu hỏi để củng cố. Chia đội thi cho sôi động!",
      sgkImage: "assets/sgk/sgk-trang12.jpg",
      goal: "Củng cố toàn bài.",
      questions: [
        {
          question: "Đâu là PHẦN MỀM ỨNG DỤNG?",
          type: "multiple-choice",
          options: ["Linux", "Windows 8", "Gmail", "iOS"],
          answer: 2,
          hint: "Ba phương án còn lại là hệ điều hành.",
          explanation: "Gmail là phần mềm ứng dụng (dịch vụ thư điện tử). Linux, Windows 8, iOS đều là hệ điều hành.",
          level: "thong-hieu", activity: "luyen-tap",
        },
        {
          question: "Chọn TẤT CẢ loại tệp có thể mở được bằng Windows Media Player.",
          type: "multiple-select",
          options: [".mp3", ".jpg", ".avi", ".txt"],
          answer: [0, 2],
          hint: "Windows Media Player để nghe nhạc, xem phim.",
          explanation: ".mp3 (nhạc) và .avi (phim) mở được bằng Windows Media Player; .jpg là ảnh, .txt là văn bản.",
          level: "van-dung", activity: "luyen-tap",
        },
        {
          question: "Hệ điều hành thuộc loại phần mềm nào?",
          type: "multiple-choice",
          options: ["Phần mềm tiện ích", "Phần mềm ứng dụng", "Phần mềm hệ thống", "Phần mềm công cụ"],
          answer: 2,
          hint: "Nó quản lí & điều khiển hoạt động chung của máy tính.",
          explanation: "Hệ điều hành là PHẦN MỀM HỆ THỐNG — quản lí và điều khiển hoạt động chung của máy tính.",
          level: "thong-hieu", activity: "luyen-tap",
        },
        {
          question: "Máy tính chỉ hoạt động sau khi cài tối thiểu mấy hệ điều hành?",
          type: "multiple-choice",
          options: ["Không cần hệ điều hành", "1 hệ điều hành", "2 hệ điều hành", "3 hệ điều hành"],
          answer: 1,
          hint: "Chỉ cần ít nhất một cái để máy chạy được.",
          explanation: "Máy tính cần cài ít nhất 1 hệ điều hành thì mới hoạt động và chạy được các phần mềm khác.",
          level: "nhan-biet", activity: "luyen-tap",
        },
        {
          question: "Phát biểu nào sau đây là SAI?",
          type: "multiple-choice",
          options: [
            "Người dùng xử lí những yêu cầu cụ thể bằng phần mềm ứng dụng",
            "Để máy tính hoạt động được phải có phần mềm ứng dụng",
            "Để phần mềm ứng dụng chạy được trên máy tính phải có hệ điều hành",
            "Để máy tính hoạt động được phải có hệ điều hành",
          ],
          answer: 1,
          hint: "Máy tính cần cái gì trước tiên để hoạt động?",
          explanation: "SAI: máy tính hoạt động cần HỆ ĐIỀU HÀNH, không nhất thiết phải có phần mềm ứng dụng.",
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
      task: "Giải thích một tình huống thực tế khi cài đặt phần mềm.",
      goal: "Vận dụng: phần mềm ứng dụng phụ thuộc hệ điều hành.",
      content: {
        situation: "Em muốn tải phần mềm Scratch về cài lên máy tính. Trang tải cho chọn nhiều phiên bản khác nhau (cho Windows, macOS, Linux…).",
        question: "Vì sao khi tải Scratch để cài đặt, em cần chọn đúng phiên bản phù hợp với hệ điều hành trên máy tính của mình?",
        hints: [
          "Phần mềm ứng dụng chạy trong môi trường nào?",
          "Nếu chọn sai phiên bản (ví dụ bản cho macOS mà máy chạy Windows) thì sao?",
        ],
        modelAnswer: "Vì phần mềm ứng dụng chạy TRONG môi trường hệ điều hành và phụ thuộc vào nó. Phải chọn phiên bản Scratch phù hợp với hệ điều hành (Windows/macOS/Linux) thì mới cài và chạy được; chọn sai thì phần mềm không hoạt động.",
      },
      questions: [
        {
          question: "Điều nào đúng về quan hệ giữa phần mềm ứng dụng và hệ điều hành?",
          type: "multiple-choice",
          options: [
            "Phần mềm ứng dụng chạy trong môi trường hệ điều hành và phải phù hợp với hệ điều hành",
            "Phần mềm ứng dụng chạy độc lập, không cần hệ điều hành",
            "Hệ điều hành chạy bên trong phần mềm ứng dụng",
            "Phần mềm ứng dụng nào cũng chạy trên mọi hệ điều hành",
          ],
          answer: 0,
          hint: "Nhớ lại thứ tự các lớp: phần cứng → hệ điều hành → phần mềm ứng dụng.",
          explanation: "Phần mềm ứng dụng chạy trên nền hệ điều hành và phải được chọn phù hợp với hệ điều hành đang dùng.",
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
            question: "Bạn Lan muốn mở tệp 'BaoCao.pptx'. Tệp này là loại gì và nên mở bằng phần mềm nào?",
            type: "multiple-choice",
            options: [
              "Tệp hình ảnh — mở bằng Paint",
              "Bài trình bày — mở bằng Microsoft PowerPoint",
              "Tệp âm thanh — mở bằng Windows Media Player",
              "Trang web — mở bằng trình duyệt",
            ],
            answer: 1,
            hint: "Nhìn vào phần mở rộng .pptx.",
            explanation: "Phần mở rộng .pptx cho biết đây là BÀI TRÌNH BÀY, mở/chỉnh sửa bằng Microsoft PowerPoint.",
            level: "van-dung-cao", activity: "tong-ket",
          },
        ],
      },
    },
  ],
};
if (typeof module !== "undefined" && module.exports) module.exports = LESSON;
if (typeof window !== "undefined") window.LESSON = LESSON;
