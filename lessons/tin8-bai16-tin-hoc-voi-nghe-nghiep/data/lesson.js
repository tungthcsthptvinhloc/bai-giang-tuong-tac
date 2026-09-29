/* ============================================================================
 * BÀI 16 — TIN HỌC VỚI NGHỀ NGHIỆP  (Tin học 8 — Kết nối tri thức với cuộc sống)
 * Chủ đề 6: Hướng nghiệp với tin học.
 * Bám sát SGK trang 91–94 + Kế hoạch bài dạy (1 tiết) của giáo viên.
 * Chỉ sửa file này để đổi nội dung. Engine app.js không cần sửa.
 * GV chọn: trò chơi "Giải cứu thú cưng" trên màn chiếu (mỗi câu đúng một thú cưng về nhà); mở đầu dạng khung trò chuyện + bình chọn;
 * không thêm Luyện tập 1 (phỏng vấn); thêm: ghép ứng dụng vào nghề (Hình 16.1), phân loại nghề, định kiến hay sự thật, lật thẻ nhân vật – sự kiện.
 * ==========================================================================*/

const IMG = (src, cap, w) => `<figure style="margin:0 auto;max-width:${w || 640}px"><img src="${src}" alt="${cap}" style="width:100%;border-radius:8px"><figcaption class="caption">${cap}</figcaption></figure>`;
const NGHE = ["Lập trình viên / phát triển phần mềm 💻", "Thiết kế đồ hoạ 🎨", "Bác sĩ 🏥", "Giáo viên 👩‍🏫", "Kiến trúc sư 🏗️", "Nghề khác ✨"];

const LESSON = {
  meta: {
    subject: "Tin học", grade: "8", book: "Kết nối tri thức với cuộc sống",
    title: "Bài 16: Tin học với nghề nghiệp", unit: "Chủ đề 6 — Hướng nghiệp với tin học",
    pages: "91–94", durationMinutes: 45,
  },
  objectives: {
    knowledge: [
      "Nêu được một số nghề nghiệp mà ứng dụng tin học sẽ làm tăng hiệu quả công việc.",
      "Nêu được tên một số nghề thuộc lĩnh vực tin học và một số nghề liên quan đến ứng dụng tin học.",
      "Nhận thức và trình bày được vấn đề bình đẳng giới trong việc sử dụng máy tính và trong ứng dụng tin học, nêu được ví dụ minh hoạ.",
    ],
    competencies: [
      "Tự chủ và tự học; giao tiếp và hợp tác (nhóm, cặp đôi, nhóm bàn); giải quyết vấn đề và sáng tạo.",
      "Năng lực số 5.4.TC2a, 2.3.TC2b: kể tên nghề có ứng dụng tin học, phân tích lợi ích; nhận thức bình đẳng giới trong học tập, sử dụng máy tính và nghề nghiệp CNTT.",
      "Năng lực AI: kiểm chứng thông tin AI cung cấp bằng nguồn đáng tin cậy, không tiếp nhận hoặc lan truyền định kiến giới.",
    ],
    qualities: ["Tôn trọng, bình đẳng với mọi người; có ý thức tìm hiểu nghề nghiệp, định hướng tương lai."],
  },
  coreKnowledge: [
    "Ứng dụng tin học phù hợp trong các ngành nghề sẽ giúp tăng hiệu quả công việc.",
    "Tin học giúp: tăng tốc độ xử lí, tiết kiệm thời gian; liên lạc, trao đổi thông tin dễ dàng; hỗ trợ làm việc nhóm, mở rộng phạm vi làm việc; nâng cao tay nghề, bổ sung kiến thức, hỗ trợ thông tin.",
    "Một số nghề thuộc lĩnh vực tin học và liên quan đến ứng dụng tin học ra đời và phát triển để đáp ứng yêu cầu cuộc sống và công việc.",
    "Nghề nghiệp trong lĩnh vực tin học, cũng như cơ hội ứng dụng tin học để nâng cao hiệu quả công việc của các nghề nghiệp khác, là bình đẳng cho tất cả mọi người.",
  ],
  keywords: ["Hiệu quả công việc", "Nghề tin học", "Bình đẳng giới"],
  settings: { basePoints: 100, useTimer: false, defaultTime: 60, sound: true, streakEnabled: true },

  activities: [
    /* ===================== HĐ1: MỞ ĐẦU (5 phút) ===================== */
    {
      id: "mo-dau", name: "Mở đầu — An, Minh, Khoa trò chuyện 💬", type: "chat",
      goal: "Nhận ra tin học được ứng dụng trong nhiều nghề, giúp tăng hiệu quả công việc.",
      time: 240,
      task: "Ba bạn HS đóng vai An, Khoa, Minh đọc lời thoại (SGK tr.91). Cả lớp trả lời câu hỏi sau mỗi tin nhắn. Còn ý kiến của em thì sao?",
      intro: "📱 Nhóm trò chuyện của ba bạn An, Minh, Khoa (nhân vật trong SGK).",
      sgkImage: "assets/sgk/mo-dau.jpg",
      chat: { name: "Nhóm Hướng nghiệp 8", avatar: "👥", status: "An, Minh, Khoa" },
      winText: "Tin học có mặt trong rất nhiều nghề — cùng tìm hiểu nhé!",
      questions: [
        { question: "Tớ được nghe mẹ kể nhiều về nghề kế toán của mẹ. Ứng dụng tin học giúp mẹ làm việc hiệu quả hơn nhiều, như việc theo dõi các giao dịch tài chính, tạo ra các báo cáo tổng hợp phức tạp.", type: "multiple-choice",
          chat: { name: "An", avatar: "🔥", status: "Đang tìm hiểu nghề kế toán" }, prompt: "Tin học giúp nghề kế toán thế nào?",
          options: ["Không giúp được gì", "Theo dõi giao dịch tài chính, tạo báo cáo tổng hợp nhanh hơn", "Chỉ để nghe nhạc khi làm việc", "Thay kế toán quyết định mọi việc"],
          answer: 1, reaction: "Đúng rồi! Mẹ tớ bảo việc tính toán mất hàng giờ giờ chỉ còn vài phút 😄",
          explanation: "Phần mềm giúp kế toán theo dõi giao dịch, tạo báo cáo tổng hợp phức tạp nhanh và chính xác hơn.", level: "nhan-biet", activity: "mo-dau" },
        { question: "Tớ nghĩ chắc chắn ứng dụng tin học giúp tăng hiệu quả công việc cho nghề giáo viên. Thầy cô có thể dạy học trực tuyến và nhất là tớ thấy những tiết học trên lớp có ứng dụng tin học thì lôi cuốn và dễ hiểu hơn nhiều.", type: "multiple-choice",
          chat: { name: "Khoa", avatar: "📘", status: "Đang tìm hiểu nghề giáo viên" }, prompt: "Ví dụ nào cho thấy tin học giúp nghề giáo viên?",
          options: ["Dạy học trực tuyến, bài giảng điện tử, trò chơi học tập trên máy chiếu", "Chỉ dùng phấn và bảng đen", "Không dùng máy tính trong trường học", "Giáo viên không cần chuẩn bị bài"],
          answer: 0, reaction: "Như tiết học hôm nay của chúng mình đó 😎",
          explanation: "Bài giảng điện tử, lớp học trực tuyến, trò chơi học tập giúp tiết học lôi cuốn, dễ hiểu hơn.", level: "nhan-biet", activity: "mo-dau" },
        { question: "Tớ thì tìm hiểu về nghề hoạ sĩ. Bây giờ các bức tranh không chỉ được tạo ra bằng bút lông và màu nước nữa mà còn được tạo ra trên máy tính. Sau này tớ muốn trở thành nhà thiết kế đồ hoạ máy tính.", type: "multiple-choice",
          chat: { name: "Minh", avatar: "🎨", status: "Mơ ước làm nhà thiết kế đồ hoạ" }, prompt: "Nghề Minh mơ ước là nghề gì?",
          options: ["Kế toán", "Kiến trúc sư", "Nhà thiết kế đồ hoạ máy tính", "Giáo viên"],
          answer: 2, reaction: "Cậu có muốn cùng tớ tìm hiểu thêm về nghề của tương lai không? 🎨",
          explanation: "Minh muốn trở thành nhà thiết kế đồ hoạ máy tính — nghề vẽ, thiết kế trên máy tính.", level: "nhan-biet", activity: "mo-dau" },
      ],
    },
    {
      id: "nghe-quan-tam", name: "Bình chọn: Em quan tâm nghề nào? 🗳️", type: "poll",
      goal: "Tạo hứng thú, kết nối bài học với mơ ước nghề nghiệp của HS.",
      time: 120,
      task: "Mỗi bạn (hoặc mỗi nhóm) chọn MỘT nghề em quan tâm nhất. Sau đó nêu một ví dụ tin học được ứng dụng trong nghề đó. Không có đáp án đúng/sai.",
      question: "Em quan tâm nghề nào nhất? (Chọn một)",
      options: NGHE,
      chartView: true, chartTitle: "Nghề các bạn lớp mình quan tâm",
    },

    /* ===================== HĐ2.1: TIN HỌC GIÚP NÂNG CAO HIỆU QUẢ CÔNG VIỆC (14 phút) ===================== */
    {
      id: "hd1-ung-dung", name: "1. Hoạt động 1: Ứng dụng tin học trong nghề nghiệp 💼", type: "knowledge",
      goal: "Kể tên nghề có ứng dụng tin học; phân tích lợi ích giúp tăng hiệu quả công việc.",
      time: 360,
      task: "Nhóm: Lựa chọn một vài nghề nghiệp mà các em biết để thảo luận và chỉ ra những ví dụ tin học được ứng dụng trong các nghề nghiệp đó. Phân tích vai trò của ứng dụng tin học trong việc nâng cao hiệu quả công việc đó.",
      sgkImage: "assets/sgk/hoat-dong-1.jpg",
      content: {
        revealLabel: "📖 Tin học giúp nâng cao hiệu quả công việc (SGK tr.91–92)",
        blocks: [
          { kind: "text", value: "Cùng với sự phát triển của công nghệ thông tin, tin học ngày càng được ứng dụng rộng rãi trong mọi ngành nghề khác nhau. Theo các chuyên gia, việc ứng dụng tin học sẽ mang lại lợi ích cho hầu hết ngành nghề nhờ tăng hiệu quả công việc:" },
          { kind: "list", value: [
            "⚡ Tăng tốc độ xử lí, tiết kiệm thời gian: với nghề kế toán, những yêu cầu mất hàng giờ tính toán thủ công có thể thực hiện trong vài phút; thanh toán, chuyển tiền gần như ngay lập tức qua mạng.",
            "📨 Liên lạc và trao đổi thông tin dễ dàng: tài liệu, tin nhắn công việc được gửi ngay lập tức đến đồng nghiệp, khách hàng trên toàn thế giới.",
            "🤝 Hỗ trợ làm việc nhóm, mở rộng phạm vi làm việc: lập trình viên làm việc xuyên biên giới; họp từ xa, làm việc trên cùng một tài liệu chia sẻ dựa trên công nghệ đám mây.",
            "🎓 Nâng cao tay nghề, bổ sung kiến thức, hỗ trợ thông tin: lái xe taxi dùng ứng dụng đặt xe, bản đồ, thông báo tình trạng giao thông để nhận khách, tìm đường, tránh tắc.",
          ] },
          { kind: "text", value: "Sự phát triển của tin học cũng tạo ra những nghề nghiệp đa dạng của lĩnh vực này như: phát triển phần mềm, lập trình ứng dụng điện thoại, quản trị mạng, phát triển và thiết kế website,… Bên cạnh đó, một số nghề liên quan đến ứng dụng tin học cũng rất phát triển như: bán hàng online, streamer (phát sóng trực tiếp cho người xem thông qua một nền tảng online), vlogger (tạo dựng nội dung trên nền tảng video và đăng trên các mạng xã hội)." },
          { kind: "html", value: IMG("assets/sgk/hinh-16-1.jpg", "Hình 16.1. Ví dụ về ứng dụng tin học trong một số nghề nghiệp", 680) },
        ],
      },
      remember: [
        "Ứng dụng tin học phù hợp trong các ngành nghề sẽ giúp tăng hiệu quả công việc.",
        "Một số nghề thuộc lĩnh vực tin học và liên quan đến ứng dụng tin học ra đời và phát triển để đáp ứng yêu cầu cuộc sống và công việc.",
      ],
      questions: [
        { question: "Lái xe taxi dùng ứng dụng bản đồ, thông báo tình trạng giao thông để tránh đường tắc. Đây là lợi ích nào của tin học?", type: "multiple-choice",
          options: ["Hỗ trợ làm việc nhóm", "Nâng cao tay nghề, bổ sung kiến thức, hỗ trợ thông tin cho người lao động", "Không có lợi ích gì", "Thay thế hoàn toàn người lái xe"],
          answer: 1, explanation: "SGK: ứng dụng đặt xe, bản đồ, thông báo giao thông hỗ trợ thông tin, giúp lái xe dễ nhận khách, tìm đường, tiết kiệm thời gian, nhiên liệu.", level: "thong-hieu", activity: "hd1-ung-dung" },
        { question: "Các lập trình viên ở nhiều nước cùng sửa một tài liệu chia sẻ trên “đám mây” và họp trực tuyến. Đây là lợi ích nào?", type: "multiple-choice",
          options: ["Hỗ trợ làm việc nhóm và mở rộng phạm vi làm việc", "Tăng tốc độ xử lí", "Chỉ giúp giải trí", "Giảm chất lượng công việc"],
          answer: 0, explanation: "Công cụ giao tiếp trực tuyến, công nghệ đám mây giúp làm việc nhóm xuyên biên giới.", level: "thong-hieu", activity: "hd1-ung-dung" },
        { question: "Nghề nào dưới đây được SGK nêu là nghề thuộc lĩnh vực tin học?", type: "multiple-choice",
          options: ["Quản trị mạng", "Bán hàng online", "Vlogger", "Streamer"],
          answer: 0, explanation: "Quản trị mạng thuộc lĩnh vực tin học; bán hàng online, streamer, vlogger là các nghề liên quan đến ứng dụng tin học.", level: "nhan-biet", activity: "hd1-ung-dung" },
      ],
    },
    {
      id: "ghep-hinh-16-1", name: "Trò chơi: Ghép ứng dụng vào nghề (Hình 16.1) 🧲", type: "dragdrop",
      goal: "Liên hệ ứng dụng tin học cụ thể với từng nghề.",
      time: 240,
      task: "Kéo mỗi ứng dụng tin học vào đúng nghề nghiệp (theo Hình 16.1) rồi bấm Kiểm tra.",
      groups: ["Bác sĩ 🏥", "Nhà báo 📰", "Quản lí du lịch 🧳", "Nhân viên văn phòng 🗂️", "Kiến trúc sư 🏗️", "Kĩ sư nông nghiệp 🌾"],
      items: [
        { text: "Hồ sơ sức khoẻ điện tử", group: 0 },
        { text: "Khám bệnh từ xa", group: 0 },
        { text: "Đăng bài nhanh chóng trên báo điện tử", group: 1 },
        { text: "Chỉnh sửa ảnh, video dễ dàng", group: 1 },
        { text: "Quảng cáo sản phẩm du lịch", group: 2 },
        { text: "Đặt chỗ khách sạn trên website", group: 2 },
        { text: "Phần mềm soạn thảo văn bản", group: 3 },
        { text: "Phần mềm lưu trữ hồ sơ", group: 3 },
        { text: "Phần mềm thiết kế bản vẽ", group: 4 },
        { text: "In 3D tạo mẫu", group: 4 },
        { text: "Tự động điều tiết nước tưới", group: 5 },
        { text: "Internet vạn vật (IoT) trong nghiên cứu tiến bộ nông nghiệp", group: 5 },
      ],
      explanation: "Hình 16.1: mỗi nghề đều có những ứng dụng tin học giúp tăng chất lượng, hiệu quả công việc.",
    },
    {
      id: "cau-hoi-tr93", name: "Câu hỏi SGK tr.93: Nghề nào — ứng dụng nào? 🔗", type: "matching",
      goal: "Chứng minh ứng dụng tin học có thể tăng hiệu quả công việc.",
      time: 240,
      task: "Cặp đôi — Phiếu học tập câu 1: Ghép mỗi ứng dụng ở cột B với một nghề phù hợp nhất ở cột A. Làm hết rồi bấm Nộp bài.",
      sgkImage: "assets/sgk/cau-hoi-tr93.jpg",
      pairs: [
        { left: "1) Bác sĩ", right: "d) Theo dõi sức khoẻ, quá trình điều trị của bệnh nhân qua hồ sơ sức khoẻ điện tử" },
        { left: "2) Giáo viên", right: "e) Tạo khoá học trực tuyến để học sinh có thể học bất cứ lúc nào, ở bất cứ đâu" },
        { left: "3) Kiến trúc sư", right: "a) Tạo bản vẽ 3D để khách hàng hình dung rõ về căn nhà định xây dựng" },
        { left: "4) Kế toán", right: "c) Tạo một báo cáo tài chính bằng phần mềm bảng tính" },
        { left: "5) Nhà báo", right: "b) Nhận hình ảnh tức thì từ sân vận động do đồng nghiệp chụp để biên tập thành bài báo" },
      ],
      explanation: "1-d, 2-e, 3-a, 4-c, 5-b.",
    },
    {
      id: "cau-hoi-2-tr93", name: "Câu hỏi SGK tr.93 (câu 2): Thầy cô dùng tin học giúp em học thế nào? ✍️", type: "vandung",
      goal: "Liên hệ ứng dụng tin học trong dạy học với bản thân.",
      time: 180,
      task: "Cặp đôi — Phiếu học tập câu 2: Kể ra những ứng dụng tin học mà các thầy cô giáo đã sử dụng để giúp các em nâng cao hiệu quả của việc học tập. Gửi câu trả lời cho thầy/cô.",
      intro: "Gửi câu trả lời rồi bấm để xem gợi ý.",
      cases: [
        { question: "Em hãy kể ra những ứng dụng tin học mà các thầy cô giáo đã sử dụng để giúp các em nâng cao hiệu quả của việc học tập.",
          answer: "Gợi ý (giáo án): tạo bài giảng điện tử, thiết kế các lớp học online, tính điểm môn học… Có thể kể thêm: trò chơi học tập, phiếu học tập trực tuyến, giao và nộp bài qua mạng." },
      ],
    },
    {
      id: "phan-loai-nghe", name: "Trò chơi: Nghề tin học hay nghề liên quan đến ứng dụng tin học? 🗂️", type: "dragdrop",
      goal: "Nêu tên một số nghề thuộc lĩnh vực tin học và một số nghề liên quan đến ứng dụng tin học.",
      time: 180,
      task: "Kéo mỗi nghề vào đúng cột theo SGK tr.92 rồi bấm Kiểm tra.",
      groups: ["Nghề thuộc lĩnh vực tin học 💻", "Nghề liên quan đến ứng dụng tin học 📱"],
      items: [
        { text: "Phát triển phần mềm", group: 0 },
        { text: "Lập trình ứng dụng điện thoại", group: 0 },
        { text: "Quản trị mạng", group: 0 },
        { text: "Phát triển và thiết kế website", group: 0 },
        { text: "Bán hàng online", group: 1 },
        { text: "Streamer (phát sóng trực tiếp qua nền tảng online)", group: 1 },
        { text: "Vlogger (tạo nội dung video, đăng trên mạng xã hội)", group: 1 },
      ],
      explanation: "SGK tr.92: nghề thuộc lĩnh vực tin học — phát triển phần mềm, lập trình ứng dụng điện thoại, quản trị mạng, phát triển và thiết kế website,…; nghề liên quan đến ứng dụng tin học — bán hàng online, streamer, vlogger.",
    },

    /* ===================== HĐ2.2: BÌNH ĐẲNG GIỚI (18 phút) ===================== */
    {
      id: "hd2-binh-dang", name: "2. Hoạt động 2: Bình đẳng giới trong lĩnh vực tin học ⚖️", type: "knowledge",
      goal: "Nhận thức việc sử dụng máy tính, ứng dụng tin học và nghề nghiệp tin học là bình đẳng cho mọi người.",
      time: 480,
      task: "Nhóm bàn: 1) Nếu có bạn nào đó nói với em “Nghề nghiệp trong lĩnh vực tin học chỉ nên dành cho nam giới”, em sẽ trả lời bạn như thế nào? Tại sao? 2) Em biết những ngành nghề nào thuộc lĩnh vực tin học đang có nhiều phụ nữ làm việc?",
      sgkImage: "assets/sgk/hoat-dong-2.jpg",
      content: {
        revealLabel: "📖 Bình đẳng giới trong sử dụng máy tính và ứng dụng tin học (SGK tr.93–94)",
        blocks: [
          { kind: "text", value: "Tin học đang thúc đẩy sự phát triển của mọi ngành nghề, thu hút một số lượng lớn lao động của xã hội tham gia. Trong thực tế, nhiều số liệu nghiên cứu cho thấy tỉ lệ nữ giới làm việc trong các ngành nghề tin học so với nam giới còn khá thấp, mặc dù môi trường, điều kiện công việc vẫn phù hợp cho phụ nữ phát huy khả năng về sức khoẻ, trí tuệ, phẩm chất của mình trong lĩnh vực này." },
          { kind: "text", value: "Chính vì vậy, nhiều tổ chức trên thế giới cũng đang tích cực tổ chức nhiều hoạt động thúc đẩy phụ nữ và trẻ em gái tham gia nhiều hơn vào lĩnh vực tin học:" },
          { kind: "list", value: [
            "Ngày Quốc tế trẻ em gái với công nghệ thông tin (International Girls in ICT Day) được tổ chức hằng năm bởi Liên minh Viễn thông Quốc tế của Liên Hợp Quốc (ITU), nhằm tuyên truyền và nhấn mạnh sự cần thiết phải thúc đẩy các cơ hội nghề nghiệp công nghệ cho phụ nữ và trẻ em gái.",
            "DigiGirlZ là chiến dịch toàn cầu do tập đoàn Microsoft khởi xướng nhằm truyền cảm hứng cho các học sinh nữ Trung học cơ sở và Trung học phổ thông theo đuổi các ngành nghề khoa học – công nghệ, trong đó có lĩnh vực tin học.",
            "Người được coi là lập trình viên đầu tiên trên thế giới là một phụ nữ — bà Ada Lovelace (người Anh, sinh năm 1815).",
          ] },
          { kind: "html", value: IMG("assets/sgk/hinh-16-2.jpg", "Hình 16.2. Chủ đề Ngày Quốc tế trẻ em gái với công nghệ thông tin năm 2021 là “Internet tốt hơn cho trẻ em”", 440) },
          { kind: "text", value: "Gợi ý câu 2 [GV chốt theo ý kiến các nhóm]: phụ nữ có thể làm việc và thành công ở mọi nghề trong lĩnh vực tin học, VD lập trình viên, thiết kế đồ hoạ, thiết kế website, kiểm thử phần mềm, giáo viên Tin học,…" },
        ],
      },
      remember: ["Nghề nghiệp trong lĩnh vực tin học, cũng như cơ hội ứng dụng tin học để nâng cao hiệu quả công việc của các nghề nghiệp khác, là bình đẳng cho tất cả mọi người."],
      questions: [
        { question: "Câu 1. Một bạn nói: “Nghề nghiệp trong lĩnh vực tin học chỉ nên dành cho nam giới”. Em trả lời thế nào?", type: "multiple-choice",
          options: ["Đồng ý, vì con gái không cần máy tính", "Không đồng ý: nghề tin học bình đẳng cho mọi người; người được coi là lập trình viên đầu tiên là một phụ nữ (Ada Lovelace)", "Đồng ý, vì chỉ nam giới mới học được lập trình", "Không có ý kiến"],
          answer: 1, explanation: "Nghề nghiệp trong lĩnh vực tin học là bình đẳng cho tất cả mọi người; môi trường, điều kiện công việc phù hợp cho phụ nữ phát huy khả năng.", level: "van-dung", activity: "hd2-binh-dang" },
        { question: "Ngày Quốc tế trẻ em gái với công nghệ thông tin được tổ chức hằng năm bởi tổ chức nào?", type: "multiple-choice",
          options: ["Tập đoàn Microsoft", "Bộ Giáo dục và Đào tạo", "Một trường học", "Liên minh Viễn thông Quốc tế của Liên Hợp Quốc (ITU)"],
          answer: 3, explanation: "International Girls in ICT Day do ITU (Liên Hợp Quốc) tổ chức hằng năm. DigiGirlZ mới là chiến dịch do Microsoft khởi xướng.", level: "nhan-biet", activity: "hd2-binh-dang" },
        { question: "Câu hỏi SGK tr.94: Phương án nào dưới đây KHÔNG ĐÚNG khi nói về việc sử dụng máy tính và ứng dụng tin học?", type: "multiple-choice",
          options: ["Giúp việc thông tin liên lạc giữa mọi người hiệu quả hơn.", "Mọi người được tham gia vào môi trường học tập tốt hơn.", "Phụ nữ và trẻ em gái không cần đến máy tính vì không giúp ích nhiều cho họ.", "Mọi người đều có cơ hội học hỏi kiến thức để giúp nâng cao chất lượng cuộc sống và chăm sóc sức khoẻ tốt hơn."],
          answer: 2, explanation: "Máy tính và ứng dụng tin học giúp ích cho tất cả mọi người, không phân biệt giới tính.", level: "thong-hieu", activity: "hd2-binh-dang" },
      ],
    },
    {
      id: "the-nhan-vat", name: "Lật thẻ: Nhân vật và sự kiện 🃏", type: "flashcard",
      goal: "Ghi nhớ các nhân vật, sự kiện thúc đẩy bình đẳng giới trong tin học (theo SGK).",
      time: 150,
      task: "Đọc mặt trước, đoán rồi bấm vào thẻ để lật xem mặt sau.",
      cards: [
        { front: "👩‍💻 Ai được coi là lập trình viên đầu tiên trên thế giới?", back: "Bà Ada Lovelace — người Anh, sinh năm 1815." },
        { front: "🌍 International Girls in ICT Day là gì?", back: "Ngày Quốc tế trẻ em gái với công nghệ thông tin, tổ chức hằng năm bởi Liên minh Viễn thông Quốc tế của Liên Hợp Quốc (ITU)." },
        { front: "🎯 Mục đích của Ngày Quốc tế trẻ em gái với CNTT?", back: "Tuyên truyền, nhấn mạnh sự cần thiết phải thúc đẩy các cơ hội nghề nghiệp công nghệ cho phụ nữ và trẻ em gái." },
        { front: "🌐 Chủ đề Ngày Quốc tế trẻ em gái với CNTT năm 2021?", back: "“Internet tốt hơn cho trẻ em” (Better Internet for Kids) — Hình 16.2." },
        { front: "💡 DigiGirlZ là gì?", back: "Chiến dịch toàn cầu do tập đoàn Microsoft khởi xướng, truyền cảm hứng cho học sinh nữ THCS, THPT theo đuổi các ngành nghề khoa học – công nghệ, trong đó có tin học." },
      ],
    },
    {
      id: "dinh-kien", name: "Định kiến hay sự thật? 🔎", type: "quiz",
      goal: "Nhận diện và bác bỏ định kiến giới trong tin học.",
      time: 180,
      task: "Chọn Đúng (sự thật) hoặc Sai (định kiến) cho mỗi nhận định.",
      questions: [
        { question: "Người được coi là lập trình viên đầu tiên trên thế giới là một phụ nữ.", type: "true-false", answer: true,
          explanation: "Bà Ada Lovelace (người Anh, sinh năm 1815).", level: "nhan-biet", activity: "dinh-kien" },
        { question: "Con gái không hợp với máy tính và lập trình.", type: "true-false", answer: false,
          explanation: "Đây là định kiến. Môi trường, điều kiện công việc tin học phù hợp cho phụ nữ phát huy khả năng về sức khoẻ, trí tuệ, phẩm chất.", level: "thong-hieu", activity: "dinh-kien" },
        { question: "Tỉ lệ nữ giới làm việc trong các ngành nghề tin học so với nam giới hiện còn khá thấp.", type: "true-false", answer: true,
          explanation: "SGK: nhiều số liệu nghiên cứu cho thấy tỉ lệ này còn khá thấp — vì vậy cần thúc đẩy bình đẳng giới.", level: "nhan-biet", activity: "dinh-kien" },
        { question: "Chỉ nam giới mới cần ứng dụng tin học để nâng cao hiệu quả công việc.", type: "true-false", answer: false,
          explanation: "Cơ hội ứng dụng tin học để nâng cao hiệu quả công việc là bình đẳng cho tất cả mọi người.", level: "thong-hieu", activity: "dinh-kien" },
        { question: "Bạn nữ trong lớp cũng có thể trở thành lập trình viên, quản trị mạng hay nhà thiết kế website.", type: "true-false", answer: true,
          explanation: "Nghề nghiệp trong lĩnh vực tin học là bình đẳng cho tất cả mọi người.", level: "van-dung", activity: "dinh-kien" },
      ],
    },

    /* ===================== HĐ3: LUYỆN TẬP (5 phút) ===================== */
    {
      id: "luyen-tap", name: "Luyện tập — Trò chơi “Giải cứu thú cưng” 🐾", type: "penguin",
      pets: ["🐶", "🐱", "🐰", "🐹"], homeIcon: "🏡", enemy: "🌪️", saveWord: "thú cưng về nhà an toàn",
      winText: "Tất cả thú cưng đã được giải cứu — cả lớp thật tuyệt vời!",
      goal: "Củng cố vai trò của tin học trong nghề nghiệp và bình đẳng giới.",
      time: 300,
      task: "Lớp chia 4 đội, cử trọng tài đọc câu hỏi và thư kí ghi điểm. Mỗi câu trả lời đúng giải cứu được một chú thú cưng. Đội giải cứu được nhiều thú cưng nhất sẽ giành chiến thắng!",
      intro: "Cơn lốc 🌪️ đang tới! Mỗi câu trả lời đúng đưa một chú thú cưng về nhà 🏡.",
      questions: [
        { question: "Câu 1. Ứng dụng tin học có vai trò gì để giúp tăng hiệu quả công việc? (Chọn tất cả ý đúng)", type: "multiple-select",
          options: ["Tăng tốc độ xử lí, tiết kiệm thời gian của người lao động.", "Giúp liên lạc, trao đổi thông tin dễ dàng.", "Hỗ trợ làm việc nhóm, mở rộng phạm vi làm việc.", "Không tạo ra nhiều cơ hội việc trong lĩnh vực tin học."],
          answer: [0, 1, 2], explanation: "A, B, C là các vai trò của ứng dụng tin học. D sai: tin học tạo ra nhiều nghề nghiệp mới.", level: "nhan-biet", activity: "luyen-tap" },
        { question: "Câu 2. Những nghề nghiệp nào sau đây không liên quan đến ứng dụng tin học trong công việc?", type: "multiple-choice",
          options: ["Nhân viên ngân hàng.", "Lập trình viên.", "Bác sĩ.", "Người bán hàng rong."],
          answer: 3, explanation: "Nhân viên ngân hàng, lập trình viên, bác sĩ đều dùng tin học trong công việc; người bán hàng rong (theo giáo án) là nghề không liên quan đến ứng dụng tin học.", level: "thong-hieu", activity: "luyen-tap" },
        { question: "Câu 3. Câu nào dưới đây là đúng khi nói về bình đẳng giới trong sử dụng máy tính và ứng dụng tin học?", type: "multiple-choice",
          options: ["Chỉ có nam giới mới tham gia vào các công việc có liên quan đến ứng dụng tin học.", "Chỉ có phụ nữ mới sử dụng máy tính và ứng dụng tin học trong công việc.", "Việc sử dụng máy tính và ứng dụng tin học trong công việc, cũng như cơ hội việc làm là bình đẳng với tất cả mọi người."],
          answer: 2, explanation: "Sử dụng máy tính, ứng dụng tin học và cơ hội việc làm là bình đẳng với tất cả mọi người.", level: "nhan-biet", activity: "luyen-tap" },
        { question: "Câu 4 (Luyện tập 2, SGK tr.94). Bất bình đẳng giới trong sử dụng máy tính và ứng dụng tin học có thể dẫn tới hậu quả gì?", type: "multiple-choice",
          options: ["Phụ nữ và trẻ em gái không có cơ hội phát triển nghề nghiệp trong lĩnh vực công nghệ.", "Phụ nữ và trẻ em gái không có cơ hội sử dụng công nghệ để nâng cao hiệu quả công việc và chất lượng cuộc sống.", "Phụ nữ và trẻ em gái không theo kịp sự phát triển của xã hội.", "Cả ba hậu quả trên."],
          answer: 3, explanation: "Cả ba hậu quả A, B, C đều có thể xảy ra.", level: "thong-hieu", activity: "luyen-tap" },
      ],
    },

    /* ===================== HĐ4: VẬN DỤNG (5 phút, làm ở nhà) ===================== */
    {
      id: "van-dung", name: "Vận dụng: Thuyết trình và hành động vì bình đẳng giới 🎤", type: "vandung",
      goal: "Tìm hiểu ứng dụng tin học trong nghề nghiệp tại Việt Nam; đề xuất việc làm thúc đẩy bình đẳng giới.",
      time: 300,
      task: "Nhóm, làm ở nhà: chuẩn bị bài thuyết trình và câu trả lời, báo cáo đầu giờ tiết sau. Có thể gửi câu trả lời cho thầy/cô ngay trên app.",
      intro: "Gửi câu trả lời rồi bấm để xem gợi ý.",
      sgkImage: "assets/sgk/van-dung.jpg",
      cases: [
        { question: "1. Em hãy đề xuất với thầy cô giáo và các bạn tổ chức một cuộc thi thuyết trình về ứng dụng tin học trong các nghề nghiệp tại Việt Nam. Em hãy tìm hiểu và tạo ra bài thuyết trình của mình nhé. Hãy chia sẻ với bạn bè về bài thuyết trình của em.",
          answer: "Gợi ý: chọn 1–2 nghề (VD bác sĩ, nông dân, giáo viên…); nêu ứng dụng tin học cụ thể và lợi ích (nhanh hơn, chính xác hơn, kết nối rộng hơn…); dùng phần mềm trình chiếu với bố cục rõ ràng, hình ảnh minh hoạ, ghi nguồn thông tin." },
        { question: "2. Trong vai trò một học sinh lớp 8, em có thể làm gì để thúc đẩy bình đẳng giới ở lứa tuổi của em, ở khía cạnh sử dụng máy tính và ứng dụng tin học trong học tập?",
          answer: "Gợi ý (giáo án): cùng chia sẻ những ứng dụng bổ ích để hỗ trợ trong học tập; tuyên truyền lợi ích của việc bình đẳng trong tin học. Có thể thêm: khuyến khích các bạn nữ tham gia câu lạc bộ Tin học, chia đều lượt dùng máy khi thực hành, không nói lời định kiến giới." },
      ],
    },

    /* ===================== TỔNG KẾT ===================== */
    {
      id: "tong-ket", name: "Tổng kết", type: "summary",
      task: "Cả lớp nhắc lại kiến thức trọng tâm và làm thử thách cuối. Về nhà: hoàn thiện Vận dụng; chuẩn bị tiết ôn tập học kì II.",
      content: {
        learned: [
          "Ứng dụng tin học giúp tăng hiệu quả công việc trong hầu hết ngành nghề: tăng tốc độ xử lí, liên lạc dễ dàng, hỗ trợ làm việc nhóm, nâng cao tay nghề.",
          "Nghề thuộc lĩnh vực tin học: phát triển phần mềm, lập trình ứng dụng điện thoại, quản trị mạng, thiết kế website,… Nghề liên quan đến ứng dụng tin học: bán hàng online, streamer, vlogger,…",
          "Nghề nghiệp trong lĩnh vực tin học và cơ hội ứng dụng tin học là bình đẳng cho tất cả mọi người.",
        ],
        challenge: [
          { question: "Kĩ sư nông nghiệp lắp cảm biến để hệ thống tự động điều tiết nước tưới theo độ ẩm đất. Lợi ích chính là gì?", type: "multiple-choice",
            options: ["Tiết kiệm thời gian, nước và tăng hiệu quả công việc", "Làm cây chậm lớn", "Không cần kĩ sư nữa", "Chỉ để trang trí"],
            answer: 0, explanation: "Tự động điều tiết nước tưới (IoT) giúp tưới đúng lúc, đúng lượng — tăng hiệu quả công việc (Hình 16.1).", level: "van-dung-cao", activity: "tong-ket" },
          { question: "Lớp em chọn đội tuyển Tin học. Cách làm nào thể hiện bình đẳng giới?", type: "multiple-choice",
            options: ["Chỉ chọn các bạn nam", "Chỉ chọn các bạn nữ", "Chọn theo năng lực và sự yêu thích, mọi bạn nam và nữ đều có cơ hội như nhau", "Bốc thăm, không cần thi"],
            answer: 2, explanation: "Cơ hội học tập, tham gia lĩnh vực tin học là bình đẳng cho tất cả mọi người.", level: "van-dung", activity: "tong-ket" },
        ],
      },
    },
  ],
};

if (typeof module !== "undefined" && module.exports) module.exports = LESSON;
if (typeof window !== "undefined") window.LESSON = LESSON;
