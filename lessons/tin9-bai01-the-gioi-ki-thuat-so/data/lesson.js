/* ============================================================================
 * BÀI 1: THẾ GIỚI KĨ THUẬT SỐ — Tin học 9 (Kết nối tri thức với cuộc sống)
 * Chủ đề 1: Máy tính và cộng đồng · SGK tr.5–8 · Giáo án 2 tiết
 *
 * Nội dung bám SGK Tin học 9 (tr.5–8) và Kế hoạch bài dạy của giáo viên.
 * Câu hỏi Luyện tập lấy từ trò chơi "Thu hoạch trứng gà" trong giáo án
 * (đáp án gốc: 1B, 2C, 3A, 4D, 5A) và bổ sung câu bám SGK.
 * Ảnh SGK gốc lưu ở assets/sgk/ để giáo viên chiếu khi cần (Hình 1.1–1.4).
 * ==========================================================================*/
const LESSON = {
  meta: {
    subject: "Tin học", grade: "9",
    book: "Kết nối tri thức với cuộc sống",
    title: "Bài 1: Thế giới kĩ thuật số",
    unit: "Chủ đề 1: Máy tính và cộng đồng",
    pages: "SGK tr.5–8", durationMinutes: 90,
  },

  objectives: {
    knowledge: [
      "Nhận biết sự có mặt của các thiết bị có gắn bộ xử lí thông tin ở khắp nơi và nêu ví dụ.",
      "Nêu được khả năng của máy tính và một số ứng dụng thực tế trong khoa học kĩ thuật và đời sống.",
      "Giải thích được tác động của công nghệ thông tin lên giáo dục và xã hội qua ví dụ cụ thể.",
    ],
    competencies: ["Tự chủ và tự học", "Giao tiếp và hợp tác", "Giải quyết vấn đề và sáng tạo", "Năng lực số"],
    qualities: ["Chăm chỉ", "Trung thực", "Trách nhiệm"],
  },

  // ĐÍCH ĐẾN — điều học sinh nhất định phải nhớ sau bài học
  coreKnowledge: [
    "Bộ xử lí thông tin có ở nhiều thiết bị quanh ta (không chỉ máy tính), giúp tự động hoá việc xử lí thông tin.",
    "Máy tính có khả năng: tính toán nhanh–chính xác, lưu trữ dung lượng lớn, kết nối toàn cầu tốc độ cao.",
    "Máy tính được ứng dụng trong hầu hết các lĩnh vực của khoa học kĩ thuật và đời sống.",
    "Công nghệ thông tin tác động mạnh mẽ, tích cực lên giáo dục và xã hội; cần dùng đúng cách để tránh tác động tiêu cực.",
  ],
  keywords: ["Bộ xử lí thông tin", "Khả năng máy tính", "Tác động của CNTT"],

  settings: { basePoints: 100, useTimer: false, defaultTime: 20, sound: false, streakEnabled: true },

  activities: [
    /* ------------------------------------------------------------------ */
    {
      id: "mo-dau",
      time: 300,
      task: "Kể tên các thiết bị điện tử có gắn bộ xử lí thông tin có trong gia đình em.",
      sgkImage: "assets/sgk/sgk-trang5.jpg",
      name: "Hoạt động 1: Mở đầu",
      type: "intro",
      goal: "Khơi gợi: bộ xử lí không chỉ có trong máy tính mà ở nhiều thiết bị quanh ta.",
      teacherNote: "Cho 2 HS đóng vai An – Khoa đọc hội thoại, sau đó cả lớp thảo luận cặp đôi kể thiết bị có gắn bộ xử lí trong gia đình.",
      content: {
        heading: "Bộ xử lí — chỉ máy tính mới có?",
        blocks: [
          { kind: "text", value: "🔥 An: Bộ xử lí là thành phần quan trọng của máy tính, thường được gọi là \"bộ não\" của máy tính. Nhưng liệu có phải chỉ máy tính mới có bộ xử lí không?" },
          { kind: "text", value: "💬 Khoa: Bộ xử lí không chỉ có trong máy tính để bàn hay máy tính xách tay, mà nhiều thiết bị điện tử khác cũng cần bộ xử lí để hoạt động — như ti vi kĩ thuật số hay robot lau nhà,…" },
          { kind: "text", value: "🔥 An: Thế thì còn nhiều thiết bị nữa có gắn bộ xử lí ở xung quanh chúng ta!" },
        ],
      },
      questions: [
        {
          question: "Theo em, những thiết bị nào sau đây có gắn bộ xử lí thông tin? (Chọn TẤT CẢ đáp án đúng)",
          type: "multiple-select",
          options: ["Ti vi kĩ thuật số", "Bàn học bằng gỗ", "Đồng hồ thông minh", "Chiếc bút bi thường"],
          answer: [0, 2],
          explanation: "Ti vi kĩ thuật số và đồng hồ thông minh có gắn bộ xử lí để nhận và xử lí thông tin; bàn gỗ và bút bi thì không.",
          level: "nhan-biet", activity: "mo-dau",
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "hd21",
      time: 300,
      task: "Đọc SGK và cho biết: ti vi kĩ thuật số nhận – xử lí – đưa ra thông tin như thế nào?",
      sgkImage: "assets/sgk/sgk-trang5.jpg",
      name: "Hoạt động 2.1: Thế giới kĩ thuật số",
      type: "knowledge",
      goal: "Nhận ra sự phổ biến của thiết bị có gắn bộ xử lí thông tin.",
      teacherNote: "HS đọc Hoạt động 1 SGK 'Tìm hiểu ti vi kĩ thuật số' (Hình 1.1). Chiếu assets/sgk/sgk-trang5.jpg nếu cần.",
      content: {
        heading: "Tìm hiểu ti vi kĩ thuật số (Hình 1.1)",
        blocks: [
          { kind: "text", value: "Hầu hết ti vi hiện nay là ti vi kĩ thuật số. Khi em nhấn nút chuyển kênh trên bộ điều khiển từ xa, ti vi sẽ nhận thông tin, xử lí thông tin đó rồi chuyển sang kênh em yêu cầu." },
          { kind: "list", value: [
            "Đầu vào: tín hiệu lệnh từ bộ điều khiển (ví dụ: lệnh chuyển kênh).",
            "Xử lí: ti vi xử lí tín hiệu nhờ có gắn một bộ xử lí thông tin.",
            "Đầu ra: ti vi chuyển sang kênh mà em yêu cầu.",
          ] },
        ],
      },
      questions: [
        {
          question: "Khi em nhấn nút chuyển kênh trên bộ điều khiển từ xa, thông tin ĐẦU VÀO mà ti vi tiếp nhận là gì?",
          type: "multiple-choice",
          options: ["Hình ảnh của kênh mới", "Tín hiệu lệnh chuyển kênh từ bộ điều khiển", "Âm thanh do loa phát ra", "Nguồn điện cấp cho ti vi"],
          answer: 1,
          explanation: "Đúng rồi! Ti vi nhận tín hiệu lệnh (chuyển kênh) từ bộ điều khiển — đó là thông tin đầu vào để ti vi xử lí.",
          level: "thong-hieu", activity: "hd21",
        },
        {
          question: "Ti vi có thực hiện thao tác XỬ LÍ thông tin không? Vì sao?",
          type: "true-false",
          answer: true,
          explanation: "Có. Để chuyển đúng kênh em yêu cầu, ti vi phải xử lí tín hiệu nhận được — nên ti vi cần được gắn một bộ xử lí thông tin.",
          level: "thong-hieu", activity: "hd21",
        },
      ],
      remember: [
        "Thiết bị được gắn bộ xử lí hiện diện ở khắp nơi quanh ta.",
        "Chúng giúp con người tự động hoá một phần việc xử lí thông tin.",
        "Xuất hiện trong hầu hết các lĩnh vực kinh tế, xã hội và đời sống.",
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "ghep-linh-vuc",
      time: 150,
      task: "Nối mỗi thiết bị (Hình 1.2) với nơi/lĩnh vực thường gặp.",
      sgkImage: "assets/sgk/sgk-trang6.jpg",
      name: "Ghép đôi: Thiết bị có bộ xử lí (Hình 1.2)",
      type: "matching",
      goal: "Nối thiết bị có gắn bộ xử lí với nơi/lĩnh vực thường gặp.",
      teacherNote: "Tương ứng câu hỏi ? trong SGK (Hình 1.2). Có thể chiếu assets/sgk/sgk-trang6.jpg.",
      pairs: [
        { left: "🛫 Bảng điện tử hiển thị chuyến bay", right: "Sân bay" },
        { left: "🏥 Máy chụp cắt lớp", right: "Bệnh viện (y tế)" },
        { left: "🤖 Robot lắp ráp", right: "Nhà máy (sản xuất công nghiệp)" },
        { left: "🚗 Ô tô tự động lái", right: "Giao thông" },
      ],
      explanation: "Thiết bị có gắn bộ xử lí xuất hiện trong mọi lĩnh vực: giao thông, y tế, sản xuất, dịch vụ… — tạo nên thế giới kĩ thuật số.",
    },

    /* ------------------------------------------------------------------ */
    {
      id: "hd22",
      time: 300,
      task: "Đọc SGK và nêu các khả năng của máy tính cùng ví dụ ứng dụng thực tế.",
      sgkImage: "assets/sgk/sgk-trang7.jpg",
      name: "Hoạt động 2.2: Ứng dụng của máy tính",
      type: "knowledge",
      goal: "Nêu khả năng của máy tính và ứng dụng trong KHKT & đời sống.",
      teacherNote: "HS đọc Hoạt động 2 SGK 'Máy tính thật là cần thiết'. Chiếu assets/sgk/sgk-trang7.jpg (Hình 1.3 Hubble, 1.4 ô tô tự lái).",
      content: {
        heading: "Máy tính có những khả năng gì?",
        blocks: [
          { kind: "text", value: "Máy tính là thiết bị điện tử hỗ trợ đắc lực cho con người nhờ ba khả năng nổi bật:" },
          { kind: "list", value: [
            "⚡ Tính toán nhanh, chính xác — thực hiện hàng tỉ phép tính trong một giây, bền bỉ.",
            "💾 Lưu trữ dung lượng lớn — lưu và xử lí nhiều loại dữ liệu (văn bản, hình ảnh, âm thanh, video…), truy xuất nhanh.",
            "🌐 Kết nối toàn cầu tốc độ cao — nối các máy tính thành mạng Internet, truy cập thông tin và dịch vụ.",
          ] },
          { kind: "text", value: "Nhờ đó máy tính được ứng dụng trong khoa học (mô phỏng, dự báo thời tiết), vũ trụ (kính viễn vọng Hubble – Hình 1.3), y tế, giao thông (ô tô tự lái – Hình 1.4), giải trí…" },
        ],
      },
      questions: [
        {
          question: "Đâu KHÔNG phải là một khả năng của máy tính?",
          type: "multiple-choice",
          options: ["Tính toán nhanh, chính xác", "Lưu trữ dung lượng lớn", "Kết nối toàn cầu tốc độ cao", "Tự biết suy nghĩ như con người"],
          answer: 3,
          explanation: "Máy tính tính nhanh, lưu trữ lớn và kết nối toàn cầu — nhưng nó KHÔNG tự suy nghĩ như con người; nó làm việc theo chương trình.",
          level: "thong-hieu", activity: "hd22",
        },
      ],
      remember: [
        "Máy tính: tính toán nhanh–bền bỉ–chính xác; lưu trữ dung lượng lớn; kết nối toàn cầu tốc độ cao.",
        "Máy tính được ứng dụng hiệu quả trong nhiều lĩnh vực của khoa học kĩ thuật và đời sống.",
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "phan-loai-ung-dung",
      time: 180,
      task: "Kéo mỗi ứng dụng của máy tính vào đúng lĩnh vực.",
      name: "Phân loại: Ứng dụng của máy tính",
      type: "dragdrop",
      goal: "Phân loại ứng dụng thực tế của máy tính theo lĩnh vực.",
      teacherNote: "Chọn thẻ rồi bấm vào nhóm đúng. Nội dung lấy từ mục 2b SGK.",
      groups: ["Y tế", "Giao thông", "Nghiên cứu khoa học", "Giải trí"],
      items: [
        { text: "Chẩn đoán bệnh, quản lí dữ liệu bệnh nhân", group: 0 },
        { text: "Điều khiển ô tô tự động lái, đèn tín hiệu", group: 1 },
        { text: "Mô phỏng dòng chảy, dự báo thời tiết", group: 2 },
        { text: "Nghe nhạc, xem phim, chơi trò chơi", group: 3 },
      ],
      explanation: "Máy tính hỗ trợ hầu hết các lĩnh vực: y tế, giao thông, nghiên cứu khoa học, giải trí… nhờ khả năng xử lí và lưu trữ mạnh mẽ.",
    },

    /* ------------------------------------------------------------------ */
    {
      id: "hd23",
      time: 300,
      task: "Nêu ví dụ cho thấy tác động của công nghệ thông tin lên giáo dục và xã hội.",
      sgkImage: "assets/sgk/sgk-trang8.jpg",
      name: "Hoạt động 2.3: Tác động của CNTT",
      type: "knowledge",
      goal: "Giải thích tác động của công nghệ thông tin lên giáo dục và xã hội.",
      teacherNote: "HS đọc Hoạt động 3 SGK. Chiếu assets/sgk/sgk-trang8.jpg.",
      content: {
        heading: "Công nghệ thông tin thay đổi cuộc sống thế nào?",
        blocks: [
          { kind: "text", value: "Về giáo dục: CNTT giúp chia sẻ kiến thức, kĩ năng và cổ vũ thái độ sống tích cực; có thể học và bổ sung hiểu biết ở mọi nơi, mọi lúc qua Internet — nhiều dữ liệu miễn phí." },
          { kind: "text", value: "Về xã hội: CNTT đem đến phương tiện giao tiếp hiệu quả (thư điện tử, tin nhắn, mạng xã hội), giúp con người giảm phụ thuộc vào không gian và thời gian; dễ dàng chuyển giao và tiếp cận thông tin." },
          { kind: "text", value: "⚠️ Lưu ý: dùng CNTT không đúng cách, thiếu trách nhiệm có thể gây tác động tiêu cực (ảnh hưởng xấu tới sức khoẻ thể chất và tinh thần). Cách ta sử dụng sẽ quyết định lợi hay hại." },
        ],
      },
      remember: [
        "CNTT tác động mạnh mẽ, đem lại thay đổi tích cực trong xã hội, trong đó có giáo dục.",
        "Cần sử dụng CNTT đúng cách để tránh những tác động tiêu cực đến cuộc sống.",
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "phan-loai-tac-dong",
      time: 180,
      task: "Phân loại: đâu là tác động tích cực, đâu là điều cần lưu ý của CNTT.",
      name: "Phân loại: Tác động của CNTT",
      type: "dragdrop",
      goal: "Phân biệt tác động tích cực và điều cần lưu ý của CNTT.",
      groups: ["Tác động tích cực", "Cần lưu ý / tiêu cực"],
      items: [
        { text: "Học tập mọi lúc, mọi nơi qua Internet", group: 0 },
        { text: "Giao tiếp không phụ thuộc không gian, thời gian", group: 0 },
        { text: "Dễ dàng chia sẻ và tiếp cận thông tin", group: 0 },
        { text: "Ảnh hưởng xấu tới sức khoẻ nếu dùng thiếu trách nhiệm", group: 1 },
        { text: "Tiếp xúc thông tin xấu, chưa được kiểm chứng", group: 1 },
      ],
      explanation: "CNTT có nhiều tác động tích cực, nhưng nếu dùng sai cách sẽ gây hại — vì vậy cần sử dụng đúng cách và có trách nhiệm.",
    },

    /* ------------------------------------------------------------------ */
    {
      id: "luyen-tap",
      time: 300,
      task: "Trả lời nhanh trò chơi 'Thu hoạch trứng gà' — chia đội thi cho vui!",
      name: "Hoạt động 3: Luyện tập",
      type: "quiz",
      goal: "Củng cố kiến thức qua trò chơi 'Thu hoạch trứng gà' (kiểu Kahoot).",
      teacherNote: "Chia lớp thành các đội; mỗi đội cử đại diện trả lời. Đội đúng nhiều nhất thắng.",
      questions: [
        {
          question: "Trong đô thị, thiết bị nào được gắn bộ xử lí để điều khiển việc lưu thông, giúp các phương tiện di chuyển có trật tự?",
          type: "multiple-choice",
          options: ["Xe ô tô tự lái", "Đèn giao thông", "Camera an ninh", "Biển báo giao thông"],
          answer: 1,
          explanation: "Đèn giao thông có bộ xử lí để tự động điều khiển tín hiệu, giúp các phương tiện lưu thông trật tự.",
          level: "nhan-biet", activity: "luyen-tap",
        },
        {
          question: "Loại đồng hồ nào sau đây được gắn bộ xử lí thông tin?",
          type: "multiple-choice",
          options: ["Đồng hồ quả lắc, chạy bằng dây cót", "Đồng hồ đeo tay không dùng pin", "Đồng hồ thông minh", "Đồng hồ quartz (thạch anh)"],
          answer: 2,
          explanation: "Đồng hồ thông minh có bộ xử lí để thực hiện nhiều chức năng (kết nối, theo dõi sức khoẻ, định vị…) như một máy tính nhỏ.",
          level: "nhan-biet", activity: "luyen-tap",
        },
        {
          question: "Những thiết bị có gắn bộ xử lí như ti vi, máy giặt, lò vi sóng, tủ lạnh, máy rửa bát… thường được sử dụng ở đâu?",
          type: "multiple-choice",
          options: ["Trong gia đình", "Trong công xưởng", "Trong bệnh viện", "Trong trường học"],
          answer: 0,
          explanation: "Đây là các thiết bị điện gia dụng — thường được dùng trong gia đình, được gắn bộ xử lí để có thêm nhiều tính năng.",
          level: "nhan-biet", activity: "luyen-tap",
        },
        {
          question: "Đâu KHÔNG phải là khả năng của máy tính?",
          type: "multiple-choice",
          options: ["Tính toán nhanh", "Lưu trữ dung lượng lớn", "Kết nối toàn cầu", "Biết suy nghĩ"],
          answer: 3,
          explanation: "Máy tính tính nhanh, lưu trữ lớn, kết nối toàn cầu — nhưng KHÔNG tự \"biết suy nghĩ\"; nó hoạt động theo chương trình con người tạo ra.",
          level: "thong-hieu", activity: "luyen-tap",
        },
        {
          question: "Bằng cách nào công nghệ thông tin có tác động mạnh mẽ đối với giáo dục?",
          type: "multiple-choice",
          options: ["Giúp việc chuyển giao và tiếp cận thông tin trở nên dễ dàng", "Động viên mọi người tham gia xã hội học tập", "Hỗ trợ tính toán nhanh, không cần tính nhẩm", "Giúp đánh giá kết quả học tập công bằng hơn"],
          answer: 0,
          explanation: "CNTT tác động lên giáo dục chủ yếu nhờ giúp chuyển giao và tiếp cận thông tin/kiến thức dễ dàng — học mọi lúc, mọi nơi.",
          level: "thong-hieu", activity: "luyen-tap",
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "van-dung",
      time: 300,
      task: "Thảo luận: máy đo huyết áp điện tử và đồng hồ thông minh có bộ xử lí không? Vì sao?",
      name: "Hoạt động 4: Vận dụng",
      type: "scenario",
      goal: "Vận dụng kiến thức để giải thích thiết bị thực tế có bộ xử lí.",
      teacherNote: "Thảo luận nhóm NV1 tại lớp; NV2 (đồng hồ thông minh) giao về nhà. Đáp án gợi ý trong TEACHER_GUIDE.",
      content: {
        situation: "Máy đo huyết áp điện tử tự động: em bấm nút, máy tự bơm hơi, đo và hiện kết quả huyết áp trên màn hình.",
        question: "Theo em, máy đo huyết áp điện tử tự động có phải là thiết bị có bộ xử lí thông tin không? Vì sao?",
        hints: [
          "Quá trình đo diễn ra tự động hay thủ công?",
          "Tín hiệu từ cảm biến áp suất được làm gì để ra kết quả?",
        ],
        modelAnswer: "Có. Máy đo huyết áp điện tử tự động là thiết bị có bộ xử lí thông tin: toàn bộ quá trình đo được thực hiện tự động; tín hiệu từ cảm biến áp suất được xử lí và biến đổi để đưa ra kết quả đo.",
      },
      questions: [
        {
          question: "Vì sao đồng hồ thông minh CẦN có bộ xử lí, còn đồng hồ quả lắc thì không?",
          type: "multiple-choice",
          options: [
            "Vì đồng hồ thông minh có nhiều chức năng (kết nối, theo dõi sức khoẻ, định vị…) cần xử lí thông tin",
            "Vì đồng hồ thông minh to hơn",
            "Vì đồng hồ thông minh đắt tiền hơn",
            "Vì đồng hồ thông minh có dây đeo đẹp hơn",
          ],
          answer: 0,
          explanation: "Đồng hồ thông minh làm được nhiều việc như một máy tính nhỏ (kết nối Bluetooth/4G/wifi, theo dõi sức khoẻ, định vị GPS…) nên cần bộ xử lí để xử lí thông tin.",
          level: "van-dung", activity: "van-dung",
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "tong-ket",
      time: 180,
      task: "Cùng nhắc lại những kiến thức trọng tâm của bài.",
      name: "Tổng kết",
      type: "summary",
      goal: "Chốt kiến thức trọng tâm của bài.",
      content: {
        learned: null, // dùng coreKnowledge
        challenge: [
          {
            question: "Hãy tưởng tượng một ngày tất cả các bộ xử lí biến mất. Điều nào sau đây đúng nhất?",
            type: "multiple-choice",
            options: [
              "Chỉ máy tính để bàn ngừng hoạt động, mọi thứ khác vẫn bình thường",
              "Rất nhiều thiết bị quanh ta (ti vi, máy giặt, ATM, đèn giao thông…) sẽ ngừng hoạt động",
              "Không có gì thay đổi vì bộ xử lí không quan trọng",
              "Chỉ điện thoại thông minh bị ảnh hưởng",
            ],
            answer: 1,
            explanation: "Bộ xử lí có mặt ở rất nhiều thiết bị quanh ta, nên nếu chúng biến mất thì hầu hết thiết bị kĩ thuật số sẽ ngừng hoạt động — cho thấy vai trò quan trọng của bộ xử lí.",
            level: "van-dung-cao", activity: "tong-ket",
          },
        ],
      },
    },
  ],
};
if (typeof module !== "undefined" && module.exports) module.exports = LESSON;
if (typeof window !== "undefined") window.LESSON = LESSON;
