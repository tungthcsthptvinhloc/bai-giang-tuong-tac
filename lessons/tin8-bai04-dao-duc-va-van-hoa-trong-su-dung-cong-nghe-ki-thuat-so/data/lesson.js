/* ============================================================================
 * BÀI 4 — ĐẠO ĐỨC VÀ VĂN HOÁ TRONG SỬ DỤNG CÔNG NGHỆ KĨ THUẬT SỐ  (Tin học 8 — Kết nối tri thức)
 * Chủ đề 3: Đạo đức, pháp luật và văn hoá trong môi trường số.
 * Bám sát SGK trang 18–20 + Kế hoạch bài dạy (1 tiết) của giáo viên.
 * Chỉ sửa file này để đổi nội dung. Engine app.js không cần sửa.
 * Trò chơi “Thu hoạch trứng gà” dùng type "penguin" (trứng vào giỏ). Tranh Câu 3 do app tự vẽ (assets/lai-xe-dung-dien-thoai.svg).
 * Mọi nhân vật, tin nhắn trong tình huống đều hư cấu.
 * ==========================================================================*/

// ---- Tình huống khởi động (SGK tr.18) ----
const HAI_TH_HTML = `<div style="display:flex;flex-wrap:wrap;gap:14px;max-width:1000px;margin:0 auto;text-align:left">
  <div style="flex:1 1 180px;text-align:center"><img src="assets/ruong-bac-thang.jpg" alt="Bức ảnh ruộng bậc thang Khoa chụp" style="height:150px;border-radius:12px;box-shadow:0 6px 16px rgba(0,0,0,.2)"><div style="font-style:italic;margin-top:4px">📸 Ảnh do Khoa chụp</div></div>
  ${[["Trường hợp 1", "#dc2626", "An <b>không hỏi ý kiến Khoa</b>, tự mình chỉnh sửa bức ảnh và sử dụng làm nền cho ảnh của mình rồi đưa lên trang cá nhân trên mạng xã hội.", "Thật tuyệt khi được đến thăm nơi này."],
    ["Trường hợp 2", "#16a34a", "An <b>xin phép Khoa</b>, chỉnh sửa lại bức ảnh cho đẹp hơn rồi đưa lên trang cá nhân trên mạng xã hội.", "Đất nước ta thật là đẹp (người chụp Lê Khoa)."]].map(([t, c, d, cap]) =>
    `<div style="flex:1 1 280px;background:#fff;border:3px solid ${c};border-radius:16px;padding:10px 14px">
      <div style="font-weight:900;color:${c};font-size:1.15rem">${t}</div><div style="margin:6px 0">${d}</div>
      <div style="background:#f1f5f9;border-radius:10px;padding:6px 10px">💬 Chú thích: <i>“${cap}”</i></div></div>`).join("")}
</div>`;

const LESSON = {
  meta: {
    subject: "Tin học", grade: "8", book: "Kết nối tri thức với cuộc sống",
    title: "Bài 4: Đạo đức và văn hoá trong sử dụng công nghệ kĩ thuật số", unit: "Chủ đề 3 — Đạo đức, pháp luật và văn hoá trong môi trường số",
    pages: "18–20", durationMinutes: 45,
  },
  objectives: {
    knowledge: [
      "Nhận biết và giải thích được một số biểu hiện vi phạm đạo đức và pháp luật, biểu hiện thiếu văn hoá khi sử dụng công nghệ kĩ thuật số.",
      "Bảo đảm được các sản phẩm số do bản thân tạo ra thể hiện được đạo đức, tính văn hoá và không vi phạm pháp luật.",
    ],
    competencies: [
      "Tự học; giao tiếp và hợp tác (thảo luận tình huống); giải quyết vấn đề và sáng tạo (tạo sản phẩm số tuyên truyền).",
      "Năng lực số 2.5.TC2a: nhận diện hành vi đúng – sai khi sử dụng công nghệ số, phân tích hậu quả của vi phạm.",
      "Năng lực số 2.5.TC2b: giao tiếp lịch sự, tôn trọng người khác, không lan truyền nội dung tiêu cực.",
      "Năng lực số 3.3.TC2a: không sao chép, sử dụng sản phẩm số của người khác khi chưa được phép; biết trích dẫn nguồn.",
      "Năng lực AI 8.B1.1: nêu một số rủi ro khi sử dụng AI như nhận dạng cảm xúc sai, xâm phạm quyền riêng tư.",
    ],
    qualities: ["Trách nhiệm, trung thực, chăm chỉ, nhân ái: tôn trọng bản quyền, quyền riêng tư; ứng xử văn minh trong môi trường số."],
  },
  coreKnowledge: [
    "Một số biểu hiện vi phạm đạo đức, pháp luật hay thiếu văn hoá: quay phim trong rạp; chụp ảnh ở nơi không cho phép; ghi âm trái phép; tải tệp có bản quyền chưa được phép; sao chép thông tin coi là của mình; dùng phần mềm bẻ khoá; phát trực tiếp, chia sẻ bạo lực học đường; đưa thông tin cá nhân người khác lên mạng chưa được phép; tham gia, chia sẻ, quảng cáo trang web cổ vũ bạo lực, đánh bạc.",
    "Ba điều lưu ý để tránh vi phạm: tìm hiểu thông tin, trang bị kiến thức cần thiết; chỉ sử dụng sản phẩm số khi có sự cho phép của tác giả hoặc có bản quyền sử dụng; hầu hết thông tin trên Internet là có bản quyền.",
    "Khi tạo sản phẩm số: luôn trung thực (không dùng thông tin giả, không sao chép, chỉnh sửa thông tin của người khác rồi coi là của mình); nên dùng thông tin do mình tự tạo, không dùng thông tin có bản quyền nếu chưa mua hoặc chưa xin phép; nội dung, hình thức không vi phạm chuẩn mực đạo đức, văn hoá.",
    "Cần bảo đảm tính văn hoá, thể hiện được đạo đức và tuân thủ pháp luật khi tạo ra các sản phẩm số, giúp tránh lan truyền thông tin sai trái, góp phần tạo ra một xã hội số lành mạnh và hợp pháp.",
  ],
  keywords: ["Đạo đức", "Văn hoá", "Pháp luật", "Bản quyền", "Sản phẩm số"],
  settings: { basePoints: 100, useTimer: false, defaultTime: 60, sound: true, streakEnabled: true },

  activities: [
    /* ===================== HĐ1: MỞ ĐẦU (3 phút) ===================== */
    {
      id: "mo-dau", name: "Mở đầu — An nên làm theo cách nào? 🤔", type: "knowledge",
      goal: "Phân biệt hành vi đúng – sai khi sử dụng hình ảnh của người khác trên mạng xã hội.",
      time: 180,
      task: "Mỗi bạn đọc 2 trường hợp (SGK tr.18), suy nghĩ độc lập: Theo em, An nên làm theo cách nào? Vì sao?",
      sgkImage: "assets/sgk/mo-dau.jpg",
      html: HAI_TH_HTML,
      questions: [
        { question: "Theo em, An nên làm theo cách nào?", type: "multiple-choice",
          options: ["Trường hợp 1", "Trường hợp 2", "Cả hai đều được", "Không cách nào đúng"],
          answer: 1, explanation: "Trường hợp 2: An xin phép Khoa và ghi rõ người chụp là Lê Khoa — tôn trọng tác giả, trung thực.", level: "nhan-biet", activity: "mo-dau" },
        { question: "Vì sao cách làm ở Trường hợp 1 là chưa đúng?", type: "multiple-choice",
          options: ["Vì An không xin phép Khoa, không ghi tác giả, lại viết chú thích làm người xem hiểu nhầm là An đã đến nơi đó — không trung thực", "Vì bức ảnh không đẹp", "Vì An không chỉnh sửa ảnh", "Vì An đăng lên mạng xã hội vào buổi tối"],
          answer: 0, explanation: "Không hỏi ý kiến Khoa mà chỉnh sửa ảnh, chú thích gây hiểu nhầm, không ghi tác giả là việc không trung thực — dù không vi phạm pháp luật nhưng vi phạm đạo đức (SGK tr.20).", level: "thong-hieu", activity: "mo-dau" },
      ],
    },
    {
      id: "chu-thich-anh", name: "Trò chơi: Chọn chú thích ảnh trung thực 🖼️", type: "quiz",
      goal: "Viết chú thích trung thực, ghi rõ tác giả, không gây hiểu nhầm khi đăng ảnh.",
      time: 240,
      task: "Đọc từng tình huống và chọn chú thích trung thực, đúng mực nhất cho bức ảnh.",
      questions: [
        { question: "An đã xin phép Khoa dùng bức ảnh ruộng bậc thang Khoa chụp. Chú thích nào phù hợp nhất?", type: "multiple-choice",
          image: "assets/ruong-bac-thang.jpg", imageCaption: "Ảnh do Khoa chụp",
          options: ["“Thật tuyệt khi được đến thăm nơi này.”", "“Ảnh mình chụp trong chuyến đi hôm qua.”", "Không cần chú thích gì", "“Đất nước ta thật là đẹp (người chụp: Lê Khoa).”"],
          answer: 3, explanation: "Ghi rõ tác giả bức ảnh, không làm người xem hiểu nhầm An đã đến nơi đó.", level: "nhan-biet", activity: "chu-thich-anh" },
        { question: "Minh dùng một bức ảnh vịnh Hạ Long trên trang web của một nhiếp ảnh gia — trang cho phép sử dụng với điều kiện ghi nguồn — để làm bài trình chiếu. Chú thích nào đúng?", type: "multiple-choice",
          options: ["“Vịnh Hạ Long (ảnh: tên nhiếp ảnh gia, nguồn: trang web của tác giả)”", "“Vịnh Hạ Long — ảnh: Minh”", "Không ghi gì vì ảnh trên mạng ai cũng dùng được", "“Ảnh sưu tầm”"],
          answer: 0, explanation: "Chỉ sử dụng sản phẩm số khi có sự cho phép và ghi rõ tác giả, nguồn. Hầu hết thông tin trên Internet là có bản quyền.", level: "thong-hieu", activity: "chu-thich-anh" },
        { question: "Lan tự chụp ảnh hoa sen ở hồ gần nhà rồi chỉnh màu cho đẹp hơn. Chú thích nào trung thực?", type: "multiple-choice",
          options: ["“Cánh đồng sen nổi tiếng nhất cả nước”", "“Hoa sen ở hồ gần nhà em (ảnh em chụp, có chỉnh màu)”", "“Ảnh do nhiếp ảnh gia nổi tiếng chụp”", "“Hoa sen mọc tự nhiên màu này, không hề chỉnh sửa”"],
          answer: 1, explanation: "Nêu đúng địa điểm, tác giả và việc đã chỉnh sửa — không làm người xem hiểu sai.", level: "van-dung", activity: "chu-thich-anh" },
        { question: "Hùng dùng phần mềm ghép ảnh mình đứng trước một công trình nổi tiếng ở nước ngoài, dù chưa từng đi. Hùng nên chú thích thế nào khi đăng?", type: "multiple-choice",
          options: ["“Chuyến du lịch nước ngoài tuyệt vời của tôi!”", "Không chú thích để mọi người tự đoán", "“Ảnh ghép cho vui — mình chưa từng đến đây đâu nhé!”", "“Check-in sáng nay!”"],
          answer: 2, explanation: "Thông tin số dễ chỉnh sửa; cần trung thực, không tạo thông tin giả làm người khác hiểu nhầm.", level: "van-dung", activity: "chu-thich-anh" },
      ],
    },

    /* ===================== HĐ2.1: BIỂU HIỆN VI PHẠM (15 phút) ===================== */
    {
      id: "hd1-bieu-hien", name: "Hoạt động 1: Biểu hiện nào là vi phạm? ⚠️", type: "knowledge",
      goal: "Nhiệm vụ 1–2: nêu một vài biểu hiện vi phạm đạo đức, pháp luật, thiếu văn hoá khi sử dụng công nghệ kĩ thuật số.",
      time: 480,
      task: "Nhóm thảo luận (SGK tr.18), ghi vào phiếu học tập một vài biểu hiện vi phạm đạo đức và pháp luật hay thiếu văn hoá khi sử dụng công nghệ kĩ thuật số; sau đó trả lời câu hỏi SGK tr.19.",
      sgkImage: "assets/sgk/hoat-dong-1.jpg",
      content: {
        heading: "⚠️ 1. Biểu hiện vi phạm khi sử dụng công nghệ kĩ thuật số",
        revealLabel: "📖 Một số biểu hiện vi phạm (SGK tr.18–19)",
        blocks: [
          { kind: "text", value: "Công nghệ kĩ thuật số mang đến cho em rất nhiều lợi ích nhưng cũng tiềm ẩn những vấn nạn nhất định. Đó là những biểu hiện thiếu văn hoá, vi phạm đạo đức hoặc thậm chí vi phạm pháp luật của người sử dụng hay người tạo ra những nội dung số, như:" },
          { kind: "list", value: [
            "🎬 Quay phim trong rạp chiếu phim.",
            "📷 Chụp ảnh ở nơi không cho phép (Hình 4.1).",
            "🎙️ Ghi âm trái phép các cuộc nói chuyện.",
            "🎵 Tải về máy tính cá nhân các tệp bài hát, video có bản quyền để sử dụng mà chưa được phép.",
            "📋 Sao chép thông tin từ một trang web và coi đó là của mình.",
            "🔓 Sử dụng phần mềm bẻ khoá.",
            "📡 Phát trực tiếp (livestream) hoặc chia sẻ các vụ bạo lực học đường. Đưa lên mạng thông tin cá nhân của người khác mà chưa được phép.",
            "🎰 Tham gia, chia sẻ, quảng cáo cho các trang web cổ vũ bạo lực, đánh bạc,…",
          ] },
          { kind: "html", value: `<div style="display:flex;flex-wrap:wrap;gap:12px;justify-content:center"><figure style="margin:0;flex:0 1 300px"><img class="lesson-img" src="assets/sgk/hinh-4-1.jpg" alt="Hình 4.1"></figure><figure style="margin:0;flex:0 1 300px"><img class="lesson-img" src="assets/sgk/hinh-4-2.jpg" alt="Hình 4.2"></figure></div>` },
          { kind: "text", value: "Em cần tìm hiểu thông tin, trang bị cho mình những hiểu biết, những kiến thức pháp luật (Hình 4.2) để có nhận thức đúng đắn và bảo đảm rằng mình sử dụng công nghệ kĩ thuật số có trách nhiệm, tránh vi phạm pháp luật và các chuẩn mực về văn hoá, đạo đức của xã hội." },
        ],
      },
      questions: [
        { question: "Câu hỏi SGK tr.19 — Hành động nào sau đây KHÔNG vi phạm đạo đức và pháp luật?", type: "multiple-choice",
          options: ["Đăng tải thông tin sai sự thật lên mạng.", "Cố ý nghe, ghi âm trái phép các cuộc nói chuyện.", "Tặng đĩa nhạc có bản quyền em đã mua cho người khác.", "Tải một bài trình chiếu của người khác từ Internet và sử dụng như là của mình tạo ra."],
          answer: 2, explanation: "Đĩa nhạc có bản quyền em đã mua là của em, em có thể tặng người khác. Các hành động còn lại là vi phạm.", level: "thong-hieu", activity: "hd1-bieu-hien", sgkImage: "assets/sgk/cau-hoi-tr19.jpg" },
        { question: "Những hành động nào là biểu hiện vi phạm khi sử dụng công nghệ kĩ thuật số? (Chọn tất cả ý đúng)", type: "multiple-select",
          options: ["Quay phim trong rạp chiếu phim", "Sử dụng phần mềm bẻ khoá", "Dùng máy tính tra cứu tài liệu học tập", "Đưa thông tin cá nhân của người khác lên mạng khi chưa được phép"],
          answer: [0, 1, 3], explanation: "Quay phim trong rạp, dùng phần mềm bẻ khoá, đưa thông tin cá nhân người khác lên mạng khi chưa được phép đều là vi phạm (SGK tr.18). Tra cứu tài liệu học tập là việc làm đúng.", level: "nhan-biet", activity: "hd1-bieu-hien" },
      ],
      remember: [
        "Tìm hiểu thông tin, trang bị cho mình những kiến thức cần thiết.",
        "Chỉ sử dụng những sản phẩm số khi có sự cho phép của tác giả hoặc có bản quyền sử dụng.",
        "Hầu hết thông tin trên Internet là có bản quyền.",
      ],
    },
    {
      id: "tu-nhin-lai", name: "Câu hỏi SGK tr.19: Em đã từng mắc phải? 💭", type: "vandung",
      goal: "Tự nhìn nhận hành động chưa đúng của bản thân và cách phòng tránh, từ bỏ.",
      time: 240,
      task: "Mỗi bạn suy nghĩ, viết ngắn gọn rồi gửi cho thầy/cô (có thể không ghi tên cụ thể người liên quan).",
      intro: "Gửi câu trả lời cho thầy/cô rồi bấm để xem gợi ý.",
      cases: [
        { question: "Nêu một vài hành động chưa đúng của em khi sử dụng công nghệ kĩ thuật số mà em đã mắc phải. Nêu cách em sẽ phòng tránh hoặc từ bỏ vi phạm.",
          answer: "Gợi ý (giáo án): Em đã từng chia sẻ video bạo lực học đường trên mạng cho các bạn. Sau khi được cô tổng phụ trách nhắc nhở, em biết hành động của mình là sai nên đã xoá chia sẻ và không lặp lại nữa. Cách phòng tránh: tìm hiểu quy định, suy nghĩ trước khi chia sẻ, chỉ dùng sản phẩm số khi được phép, ghi rõ nguồn." },
      ],
    },
    {
      id: "mxh-ung-xu", name: "Mạng xã hội mô phỏng: Ứng xử văn minh 💬", type: "chat",
      goal: "Lựa chọn cách bình luận, chia sẻ, sử dụng sản phẩm số phù hợp với đạo đức, văn hoá và pháp luật.",
      time: 360,
      task: "Đọc từng tin nhắn trong nhóm lớp và chọn cách trả lời, ứng xử văn minh nhất. Trả lời hết các tin nhắn.",
      intro: "📱 Mô phỏng nhóm nhắn tin của lớp — các nhân vật, tin nhắn đều hư cấu.",
      chat: { name: "Nhóm lớp 8A", avatar: "👥", status: "42 thành viên" },
      winText: "Tuyệt vời — em là một công dân số văn minh!",
      questions: [
        { question: "Mọi người ơi, tớ quay được clip mấy bạn đánh nhau sau giờ học nè 😆 Share cho cả trường xem đi!", type: "multiple-choice", chat: { name: "Tú", avatar: "🧑", status: "Bạn cùng lớp" },
          options: ["Không chia sẻ; khuyên Tú gỡ clip và báo cho thầy/cô để giúp đỡ các bạn", "Chia sẻ ngay cho vui", "Bình luận chê bai các bạn trong clip", "Tải clip về máy để xem lại"],
          answer: 0, reaction: "Ừ nhỉ, tớ gỡ ngay rồi, để tớ báo cô chủ nhiệm 😔", badReaction: "Clip lan khắp nơi, các bạn trong clip buồn lắm… 😢",
          explanation: "Phát trực tiếp hoặc chia sẻ các vụ bạo lực học đường là vi phạm (SGK tr.18); cổ suý bạo lực, có thể vi phạm pháp luật.", level: "van-dung", activity: "mxh-ung-xu" },
        { question: "Mai vừa đăng ảnh bức tranh bạn tự vẽ: “Tranh đầu tiên của mình, mọi người góp ý nhé!” 🎨 Em bình luận thế nào?", type: "multiple-choice", chat: { name: "Mai", avatar: "👧", status: "Bạn cùng lớp" },
          options: ["“Xấu quá, vẽ lại đi!”", "“Màu sắc tươi quá, tớ thích! Nếu phần nền đậm thêm chút thì bức tranh còn nổi hơn nữa đấy 😊”", "Chia sẻ ảnh sang nhóm khác để mọi người cùng chê", "Thả biểu tượng cười nhạo"],
          answer: 1, reaction: "Cảm ơn cậu nhiều, tớ sẽ thử tô đậm nền 🥰", badReaction: "Mai buồn và xoá bức tranh rồi… 😞",
          explanation: "Chỉ dùng ngôn ngữ lịch sự, góp ý tích cực, tôn trọng người khác (SGK tr.20).", level: "van-dung", activity: "mxh-ung-xu" },
        { question: "Có ai có link xem miễn phí bộ phim mới chiếu rạp không? Trang lậu cũng được 😅", type: "multiple-choice", chat: { name: "Long", avatar: "🧒", status: "Bạn cùng lớp" },
          options: ["Không gửi; xem phim ở rạp hoặc trên ứng dụng có bản quyền để tôn trọng tác giả", "Gửi ngay link trang web phim lậu", "Quay lén phim ở rạp rồi gửi cho Long", "Tải phim lậu về rồi bán lại"],
          answer: 0, reaction: "Ừ, để tớ đợi phim lên ứng dụng có bản quyền vậy 👍", badReaction: "Ơ, trang lậu toàn quảng cáo cờ bạc với virus… 😱",
          explanation: "Chia sẻ, sử dụng phim không có bản quyền, quay phim trong rạp là vi phạm (SGK tr.18, 20).", level: "van-dung", activity: "mxh-ung-xu" },
        { question: "Cậu gửi tớ bài trình chiếu “Năng lượng tái tạo” của cậu đi, tớ đổi tên thành của tớ rồi nộp cho cô 😜", type: "multiple-choice", chat: { name: "Hải", avatar: "👦", status: "Bạn cùng lớp" },
          options: ["Gửi luôn cho bạn đổi tên", "Gửi rồi dặn bạn đừng nói với ai", "Bán bài cho bạn", "Từ chối nộp hộ; có thể cùng bạn trao đổi cách làm để bạn tự làm bài của mình"],
          answer: 3, reaction: "Ừ, tớ tự làm vậy, cậu chỉ tớ cách tìm tư liệu nhé 😅", badReaction: "Cô phát hiện hai bài giống hệt nhau… 😬",
          explanation: "Sao chép sản phẩm của người khác rồi coi là của mình là không trung thực, vi phạm đạo đức (SGK tr.18, 20).", level: "van-dung", activity: "mxh-ung-xu" },
        { question: "Tớ định đăng ảnh cả lớp lên trang cá nhân, kèm tên, số điện thoại và địa chỉ nhà từng bạn cho “đầy đủ” 📋", type: "multiple-choice", chat: { name: "Ngọc", avatar: "👩", status: "Bạn cùng lớp" },
          options: ["Không đăng thông tin cá nhân; hỏi ý kiến các bạn trước khi đăng ảnh", "Ý hay đấy, đăng luôn đi", "Đăng thêm cả ngày sinh của từng bạn", "Chỉ đăng số điện thoại thôi"],
          answer: 0, reaction: "Ừ, tớ chỉ đăng ảnh khi cả lớp đồng ý, không ghi thông tin cá nhân 👍", badReaction: "Người lạ bắt đầu nhắn tin cho các bạn trong lớp… 😰",
          explanation: "Không tiết lộ thông tin cá nhân của người khác; đưa thông tin cá nhân người khác lên mạng khi chưa được phép là vi phạm (SGK tr.18, 20).", level: "van-dung", activity: "mxh-ung-xu" },
        { question: "Người lạ nhắn: “Vào nhóm cá cược bóng đá với anh đi, thắng to đảm bảo!” 🎰", type: "multiple-choice", chat: { name: "Người lạ", avatar: "👤", status: "Không có trong danh bạ" },
          options: ["Tham gia thử một lần", "Từ chối, chặn tài khoản và báo cho bố mẹ, thầy cô", "Mời thêm bạn bè cùng tham gia", "Chia sẻ đường liên kết vào nhóm lớp"],
          answer: 1, reaction: "(Tài khoản đã bị chặn) ✅", badReaction: "Nhóm cá cược lừa mất tiền của nhiều bạn… 😞",
          explanation: "Tham gia, chia sẻ, quảng cáo cho trang web cổ vũ đánh bạc là vi phạm pháp luật (SGK tr.18, 20).", level: "van-dung", activity: "mxh-ung-xu" },
      ],
    },

    /* ===================== HĐ2.2: TUÂN THỦ QUY ĐỊNH KHI TẠO SẢN PHẨM SỐ (15 phút) ===================== */
    {
      id: "hd22-san-pham-so", name: "Tuân thủ quy định khi tạo ra sản phẩm số 🎨", type: "knowledge",
      goal: "Nhiệm vụ 1–2: nêu sản phẩm số em có thể tạo ra và những điều cần chú ý để sản phẩm thể hiện đạo đức, văn hoá, không vi phạm pháp luật.",
      time: 480,
      task: "Nhóm đọc mục 2 (SGK tr.19–20), ghi vào bảng nhóm: 1) Em có thể tạo ra những sản phẩm số gì để đáp ứng nhu cầu học tập hay sở thích? 2) Để thực hiện đúng quy định về đạo đức, pháp luật và văn hoá, em cần trang bị những kiến thức gì?",
      sgkImage: "assets/sgk/sgk-trang20.jpg",
      content: {
        heading: "🎨 2. Tuân thủ quy định về đạo đức, văn hoá và pháp luật khi tạo ra sản phẩm số",
        image: "assets/sgk/hinh-4-3.jpg", imageCaption: "Hình 4.3. Các sản phẩm số được tạo bởi học sinh",
        revealLabel: "📖 Những điều cần chú ý (SGK tr.20)",
        blocks: [
          { kind: "text", value: "Nhờ công nghệ kĩ thuật số và các thiết bị điện tử thông minh, việc tạo ra các sản phẩm số rất dễ dàng và nhanh chóng. Tuy nhiên, em cần phải bảo đảm được sản phẩm số do bản thân tạo ra thể hiện được đạo đức, tính văn hoá và không vi phạm pháp luật. Em cần trang bị cho mình những kiến thức cần thiết và chú ý một số điều sau:" },
          { kind: "list", value: [
            "✅ Luôn trung thực trong quá trình tạo ra sản phẩm số: không sử dụng thông tin giả, thông tin không đáng tin cậy; không sao chép, chỉnh sửa thông tin của người khác rồi coi là của mình. (Nếu An làm theo trường hợp 1 thì đó là việc không trung thực — không vi phạm pháp luật nhưng vi phạm đạo đức.)",
            "📸 Nên sử dụng thông tin do mình tự tạo (tự quay video, chụp ảnh, viết nội dung,…), không sử dụng các thông tin có bản quyền nếu chưa mua hoặc chưa xin phép.",
            "🗣️ Nội dung và hình thức của sản phẩm tạo ra không được vi phạm các quy định, chuẩn mực về đạo đức, văn hoá trong xã hội nói chung. Ví dụ: chỉ dùng ngôn ngữ lịch sự, không dùng các hình ảnh giật gân, không tiết lộ thông tin cá nhân của người khác,…",
          ] },
        ],
      },
      questions: [
        { question: "Theo Hình 4.3, đâu KHÔNG phải là một sản phẩm số học sinh có thể tạo ra?", type: "multiple-choice",
          options: ["Vlog (video blog)", "Tệp ghi âm giọng hát", "Trò chơi điện tử tự thiết kế", "Bức tranh vẽ bằng bút sáp trên giấy"],
          answer: 3, explanation: "Tranh vẽ trên giấy không phải sản phẩm số (trừ khi được số hoá). Vlog, tệp ghi âm, trò chơi điện tử tự thiết kế đều là sản phẩm số (Hình 4.3).", level: "nhan-biet", activity: "hd22-san-pham-so" },
        { question: "Khi làm video giới thiệu trường, việc nào nên làm?", type: "multiple-choice",
          options: ["Lấy nhạc có bản quyền trên mạng khi chưa xin phép", "Tự quay video, tự chụp ảnh; ghi nguồn nếu dùng tư liệu được phép sử dụng", "Dùng hình ảnh giật gân để nhiều người xem", "Quay cận mặt và đọc tên, địa chỉ từng bạn"],
          answer: 1, explanation: "Nên sử dụng thông tin do mình tự tạo; không dùng thông tin có bản quyền nếu chưa mua hoặc chưa xin phép; không dùng hình ảnh giật gân, không tiết lộ thông tin cá nhân (SGK tr.20).", level: "van-dung", activity: "hd22-san-pham-so" },
      ],
      remember: [
        "Cần bảo đảm tính văn hoá, thể hiện được đạo đức và tuân thủ pháp luật khi tạo ra các sản phẩm số, giúp tránh được việc lan truyền thông tin sai trái, đồng thời góp phần tạo ra một xã hội số lành mạnh và hợp pháp.",
      ],
    },
    {
      id: "canh-bao-loi-khuyen", name: "Câu hỏi SGK tr.20: Cảnh báo và lời khuyên 📣", type: "vandung",
      goal: "Nhiệm vụ 3: đưa ra cảnh báo và lời khuyên cho bạn trong các tình huống.",
      time: 300,
      task: "Nhóm thảo luận, gửi câu trả lời cho thầy/cô; đại diện nhóm trình bày.",
      sgkImage: "assets/sgk/cau-hoi-tr20.jpg",
      intro: "Gửi câu trả lời cho thầy/cô rồi bấm để xem gợi ý.",
      cases: [
        { question: "a) Bạn em quay video các bạn trong lớp có hành vi bạo lực và đăng lên mạng xã hội.",
          answer: "Gợi ý (giáo án): Em sẽ khuyên bạn gỡ ngay video xuống. Hành động này cổ suý cho hành vi bạo lực, gây hoang mang dư luận, ảnh hưởng đến giới trẻ, nặng hơn có thể vi phạm pháp luật. Nên báo cho thầy cô để giúp đỡ các bạn." },
        { question: "b) Một người bạn sử dụng ảnh em chụp để tham gia một cuộc thi ảnh nhưng chưa có sự đồng ý của em.",
          answer: "Gợi ý (giáo án): Em góp ý với bạn: sử dụng ảnh mình chụp mà chưa được cho phép là vi phạm bản quyền, vi phạm đạo đức. Nếu cứ tiếp diễn, lâu dần sẽ ảnh hưởng đến nhân phẩm của bạn — bạn sẽ thành người không trung thực. Bạn cần xin phép và ghi tên tác giả, hoặc tự chụp ảnh để dự thi." },
      ],
    },

    /* ===================== HĐ3: LUYỆN TẬP (7 phút) ===================== */
    {
      id: "trung-ga", name: "Luyện tập — Trò chơi “Thu hoạch trứng gà” 🥚", type: "penguin",
      pet: "🥚", homeIcon: "🧺", enemy: "🦊", saveWord: "một quả trứng vào giỏ bác nông dân",
      winText: "Giỏ trứng đầy ắp — bác nông dân cảm ơn các em!",
      goal: "Củng cố biểu hiện vi phạm đạo đức, pháp luật, thiếu văn hoá và bản quyền khi sử dụng công nghệ kĩ thuật số.",
      time: 420,
      task: "Chia lớp thành hai đội, các đội lần lượt trả lời để giúp bác nông dân thu hoạch trứng. Trả lời đúng: trứng vào giỏ 🧺; sai thì cáo 🦊 tới gần!",
      intro: "Mỗi câu đúng: một quả trứng 🥚 vào giỏ 🧺. Sai thì cáo 🦊 rình tới!",
      questions: [
        { question: "Câu 1. Hành vi thiếu văn hoá, vi phạm đạo đức là", type: "multiple-choice",
          options: ["những hành vi phù hợp với truyền thống tốt đẹp của cộng đồng", "những hành vi không phù hợp với truyền thống tốt đẹp, lợi ích chung của cộng đồng hay xã hội", "những hành vi phù hợp với lợi ích chung của cộng đồng", "những hành vi phù hợp với truyền thống tốt đẹp, lợi ích chung của cộng đồng, xã hội"],
          answer: 1, explanation: "Hành vi thiếu văn hoá, vi phạm đạo đức là hành vi không phù hợp với truyền thống tốt đẹp, lợi ích chung của cộng đồng, xã hội.", level: "nhan-biet", activity: "trung-ga" },
        { question: "Câu 2. Hành động nào sau đây không vi phạm đạo đức và pháp luật?", type: "multiple-choice",
          options: ["Đăng tải thông tin sai sự thật lên mạng", "Cố ý nghe, ghi âm trái phép các cuộc nói chuyện", "Tặng đĩa nhạc có bản quyền em đã mua cho người khác", "Tải một bài trình chiếu của người khác từ Internet và sử dụng như là của mình"],
          answer: 2, explanation: "Đĩa nhạc có bản quyền em đã mua có thể tặng cho người khác.", level: "nhan-biet", activity: "trung-ga" },
        { question: "Câu 3. Bức tranh dưới đây thể hiện hành vi nào được pháp luật nghiêm cấm?", type: "multiple-choice",
          image: "assets/lai-xe-dung-dien-thoai.svg", imageCaption: "Người lái ô tô đang dùng tay cầm điện thoại khi xe chạy (tranh minh hoạ)",
          options: ["Người lái xe ô tô đang chạy trên đường không được dùng tai nghe", "Người điều khiển ô tô đang chạy trên đường được dùng tay sử dụng điện thoại", "Người điều khiển ô tô đang chạy trên đường được phép quay phim, chụp ảnh", "Người điều khiển ô tô đang chạy trên đường không được dùng tay sử dụng điện thoại di động"],
          answer: 3, explanation: "Người điều khiển ô tô đang chạy trên đường không được dùng tay sử dụng điện thoại di động — vừa nguy hiểm vừa vi phạm pháp luật giao thông.", level: "thong-hieu", activity: "trung-ga" },
        { question: "Câu 4. Hành vi nào dưới đây vi phạm đạo đức và pháp luật?", type: "multiple-choice",
          options: ["Không sử dụng tai nghe, điện thoại di động khi đang lái xe", "Tự ý sử dụng điện thoại thông minh để làm bài tập trên lớp", "Không thu âm, chụp ảnh, quay phim tại những nơi có biển báo cấm các hành vi trên", "Không tham gia, chia sẻ, quảng cáo cho các trang web cổ vũ bạo lực, đánh bạc,…"],
          answer: 1, explanation: "Tự ý dùng điện thoại thông minh để làm bài tập trên lớp (khi chưa được phép) là vi phạm nội quy, thiếu trung thực. Ba phương án còn lại đều là hành vi đúng (có chữ “Không…”).", level: "thong-hieu", activity: "trung-ga" },
        { question: "Câu 5. Biểu hiện nào dưới đây không thể hiện thiếu văn hoá, vi phạm đạo đức khi sử dụng thiết bị công nghệ kĩ thuật số?", type: "multiple-choice",
          options: ["Không sử dụng điện thoại thông minh để hỏi đáp án trong giờ kiểm tra", "Sử dụng điện thoại khi đang gặp gỡ người khác", "Chụp ảnh khi chưa được sự đồng ý", "Lén thu âm cuộc nói chuyện"],
          answer: 0, explanation: "Không dùng điện thoại để hỏi đáp án trong giờ kiểm tra là trung thực, đúng mực.", level: "thong-hieu", activity: "trung-ga" },
        { question: "Câu 6. Việc nào dưới đây nên làm khi sử dụng công nghệ số?", type: "multiple-choice",
          options: ["Nhìn trộm bạn đang nhập mật khẩu tài khoản mạng xã hội để biết mật khẩu đăng nhập của bạn", "Trêu đùa bằng cách lấy một ảnh của bạn, cắt ghép với những ảnh khác để gây cười rồi gửi cho một số bạn", "Sử dụng các thông tin do mình tự tạo (tự quay video, chụp ảnh, viết nội dung,…)", "Ghi âm cuộc tranh cãi của một nhóm bạn và đưa lên mạng xã hội"],
          answer: 2, explanation: "Nên sử dụng thông tin do mình tự tạo (SGK tr.20).", level: "nhan-biet", activity: "trung-ga" },
        { question: "Câu 7. Tình huống nào dưới đây không vi phạm bản quyền?", type: "multiple-choice",
          options: ["Bình lấy sơ đồ tóm tắt bài học trên mạng, tự ghi tên mình là tác giả rồi gửi cho các bạn trong lớp tham khảo", "Phong mua vé vào rạp xem phim, dùng điện thoại phát trực tiếp (livestream) bộ phim cho bạn bè, người thân xem cùng", "Lan mua lại cuốn sách Tin học mới xuất bản từ bạn Hùng, Lan cho Hoa mượn để đọc", "Hùng mua thẻ nhớ USB chứa các bài hát người bán sưu tầm từ Internet mà không có thoả thuận gì với tác giả hay ca sĩ biểu diễn"],
          answer: 2, explanation: "Cho bạn mượn cuốn sách mình đã mua không vi phạm bản quyền. Các tình huống còn lại đều vi phạm.", level: "van-dung", activity: "trung-ga" },
        { question: "Câu 8. Vân mua cuốn sách các bài văn hay, dùng điện thoại chụp một bài văn gửi cho Long. Long dùng Word gõ lại, chỉnh sửa, cắt xén bài văn này và nộp cho cô giáo để chấm điểm. Tình huống trên thể hiện điều gì?", type: "multiple-choice",
          options: ["Chỉ vi phạm pháp luật", "Vi phạm pháp luật, không vi phạm bản quyền", "Vi phạm bản quyền và đạo đức", "Vi phạm đạo đức, không vi phạm quyền tác giả"],
          answer: 2, explanation: "Sao chép, cắt xén tác phẩm có bản quyền rồi nộp như bài của mình: vi phạm bản quyền và vi phạm đạo đức (không trung thực).", level: "van-dung-cao", activity: "trung-ga" },
      ],
    },
    {
      id: "luyen-tap-sgk", name: "Luyện tập SGK tr.20: Vi phạm hay không? ⚖️", type: "dragdrop",
      goal: "Xác định hành động vi phạm hay không vi phạm đạo đức, pháp luật và văn hoá khi sử dụng công nghệ kĩ thuật số.",
      time: 240,
      task: "Xếp mỗi hành động a) – f) (SGK tr.20) vào đúng nhóm. Xếp hết rồi bấm Nộp bài.",
      sgkImage: "assets/sgk/luyen-tap.jpg",
      groups: ["🚫 Vi phạm", "✅ Không vi phạm"],
      items: [
        { text: "a) Chia sẻ thông tin mua bán động vật hoang dã quý hiếm", group: 0 },
        { text: "b) Tạo một trang cá nhân để chia sẻ những kinh nghiệm học tập của mình", group: 1 },
        { text: "c) Quay và lan truyền video bạo lực học đường", group: 0 },
        { text: "d) Sáng tác một bài thơ về lớp và gửi bạn bè cùng đọc", group: 1 },
        { text: "e) Tham gia cá cược bóng đá qua Internet", group: 0 },
        { text: "f) Chia sẻ địa chỉ một website có chứa các bộ phim không có bản quyền sử dụng", group: 0 },
      ],
      explanation: "Vi phạm: a (mua bán động vật hoang dã quý hiếm là vi phạm pháp luật), c (bạo lực học đường), e (đánh bạc), f (vi phạm bản quyền). Không vi phạm: b, d (sản phẩm số tự tạo, nội dung tích cực).",
    },
    {
      id: "ai-rui-ro", name: "Mở rộng: Đúng hay sai? Rủi ro khi dùng AI 🤖", type: "quiz",
      goal: "Năng lực AI 8.B1.1: nêu một số rủi ro khi sử dụng AI như nhận dạng cảm xúc sai, xâm phạm quyền riêng tư.",
      time: 240,
      task: "Nội dung Mở rộng (không có trong SGK): đọc từng nhận định về AI và chọn Đúng hoặc Sai.",
      questions: [
        { question: "Ứng dụng AI nhận dạng cảm xúc qua khuôn mặt có thể nhận dạng sai, ví dụ người đang tập trung suy nghĩ lại bị cho là đang buồn.", type: "true-false",
          answer: true, explanation: "Đúng — AI có thể nhận dạng cảm xúc sai; không nên dựa hoàn toàn vào kết quả đó để đánh giá người khác.", level: "thong-hieu", activity: "ai-rui-ro" },
        { question: "Kết quả do AI đưa ra luôn chính xác nên không cần kiểm tra lại.", type: "true-false",
          answer: false, explanation: "Sai — AI có thể sai; cần kiểm chứng với nguồn đáng tin cậy và không phụ thuộc hoàn toàn vào AI.", level: "nhan-biet", activity: "ai-rui-ro" },
        { question: "Đưa ảnh, thông tin cá nhân của bạn khác vào ứng dụng AI khi chưa được bạn cho phép có thể xâm phạm quyền riêng tư.", type: "true-false",
          answer: true, explanation: "Đúng — ứng dụng AI có thể lưu trữ, phân tích dữ liệu được đưa vào; cần tôn trọng quyền riêng tư của người khác.", level: "thong-hieu", activity: "ai-rui-ro" },
        { question: "Dùng AI ghép khuôn mặt bạn cùng lớp vào ảnh, video để trêu đùa là việc làm bình thường, không ảnh hưởng gì.", type: "true-false",
          answer: false, explanation: "Sai — cắt ghép ảnh của người khác để trêu đùa là vi phạm đạo đức, có thể xúc phạm danh dự và vi phạm pháp luật.", level: "van-dung", activity: "ai-rui-ro" },
      ],
    },

    /* ===================== HĐ4: VẬN DỤNG (5 phút) ===================== */
    {
      id: "van-dung", name: "Vận dụng: Sản phẩm số hướng dẫn dùng công nghệ đúng 🚀", type: "vandung",
      goal: "Tạo một sản phẩm số sáng tạo, thể hiện đạo đức, tính văn hoá và không vi phạm pháp luật.",
      time: 300,
      task: "Nhóm lên ý tưởng trên lớp, hoàn thiện sản phẩm ở nhà (poster, slide, video ngắn, thông điệp số…) và gửi qua thư điện tử hoặc Zalo của thầy/cô; báo cáo ở tiết sau. Trước khi gửi, tự kiểm tra bằng phiếu ở màn tiếp theo.",
      sgkImage: "assets/sgk/van-dung.jpg",
      intro: "Gửi ý tưởng sản phẩm cho thầy/cô rồi bấm để xem gợi ý.",
      cases: [
        { question: "Em hãy tạo một sản phẩm số theo cách sáng tạo để hướng dẫn các bạn hiểu đúng về việc sử dụng công nghệ kĩ thuật số. Nêu tên sản phẩm, hình thức (poster, video, slide…), thông điệp chính và những tư liệu sẽ dùng.",
          answer: "Gợi ý: Poster “5 KHÔNG khi dùng mạng xã hội” (không quay, chia sẻ bạo lực; không đăng thông tin cá nhân của người khác; không sao chép bài của người khác; không dùng phim, nhạc lậu; không bình luận thiếu văn hoá) kèm thông điệp “Sống văn minh — cả khi online”. Dùng hình tự vẽ, tự chụp; nếu dùng tư liệu trên mạng phải được phép và ghi rõ nguồn; ngôn ngữ lịch sự, tích cực, phù hợp lứa tuổi." },
      ],
    },
    {
      id: "tu-kiem-tra", name: "Phiếu tự kiểm tra sản phẩm số ✅", type: "checklist",
      goal: "Tự đánh giá sản phẩm số của nhóm trước khi chia sẻ.",
      time: 180,
      task: "Nhóm tick từng tiêu chí cho sản phẩm số của mình rồi gửi cho thầy/cô.",
      columns: ["✅ Đã bảo đảm", "🔧 Cần sửa"],
      sections: [
        { title: "🤝 TRUNG THỰC — BẢN QUYỀN", items: [
          "Không dùng thông tin giả, thông tin không đáng tin cậy",
          "Không sao chép, chỉnh sửa sản phẩm của người khác rồi coi là của mình",
          "Ưu tiên nội dung do nhóm tự tạo (tự chụp, tự quay, tự viết)",
          "Tư liệu của người khác: đã xin phép hoặc được phép sử dụng, có ghi rõ nguồn, tác giả",
        ] },
        { title: "🎨 VĂN HOÁ — PHÁP LUẬT", items: [
          "Dùng ngôn ngữ lịch sự, tích cực",
          "Không dùng hình ảnh giật gân, phản cảm",
          "Không tiết lộ thông tin cá nhân của người khác",
          "Thông điệp giúp các bạn sử dụng công nghệ kĩ thuật số đúng đắn",
        ] },
      ],
      note: "Điều nhóm em sẽ sửa lại trước khi chia sẻ sản phẩm",
      modelAnswer: [
        "Kiểm tra lại từng hình ảnh, đoạn nhạc: nếu không phải nhóm tự tạo thì cần được phép và ghi nguồn.",
        "Đọc lại toàn bộ câu chữ để bảo đảm lịch sự, không gây hiểu nhầm, không có thông tin cá nhân.",
      ],
    },

    /* ===================== TỔNG KẾT ===================== */
    {
      id: "tong-ket", name: "Tổng kết", type: "summary",
      task: "Cả lớp nhắc lại kiến thức trọng tâm và làm thử thách cuối. Về nhà: hoàn thiện sản phẩm Vận dụng; xem trước Bài 5: Sử dụng bảng tính giải quyết bài toán thực tế.",
      content: {
        learned: [
          "Nhận biết biểu hiện vi phạm đạo đức, pháp luật, thiếu văn hoá: quay phim trong rạp, ghi âm trái phép, dùng phần mềm bẻ khoá, chia sẻ bạo lực học đường, sao chép coi là của mình…",
          "Ba điều lưu ý: tìm hiểu, trang bị kiến thức; chỉ dùng sản phẩm số khi được phép hoặc có bản quyền; hầu hết thông tin trên Internet là có bản quyền.",
          "Khi tạo sản phẩm số: trung thực; ưu tiên thông tin tự tạo; nội dung, hình thức đúng chuẩn mực đạo đức, văn hoá, pháp luật.",
        ],
        challenge: [
          { question: "Nga chụp ảnh buổi biểu diễn văn nghệ của lớp, bạn Khánh lấy ảnh đó đăng lên trang cá nhân với chú thích “Ảnh mình chụp” mà không hỏi Nga. Nhận định nào đúng?", type: "multiple-choice",
            options: ["Khánh làm đúng vì ảnh chụp các bạn trong lớp", "Khánh không trung thực, vi phạm đạo đức và quyền tác giả của Nga; Khánh cần xin phép và ghi tên người chụp", "Chỉ Nga có lỗi vì đã chụp ảnh", "Không ai vi phạm vì ảnh đăng trên mạng xã hội"],
            answer: 1, explanation: "Sử dụng sản phẩm số của người khác khi chưa được phép và nhận là của mình là không trung thực, vi phạm đạo đức và quyền tác giả.", level: "van-dung-cao", activity: "tong-ket" },
          { question: "Việc làm nào góp phần tạo ra một xã hội số lành mạnh và hợp pháp?", type: "multiple-choice",
            options: ["Chia sẻ tin giật gân chưa kiểm chứng", "Tải phim lậu cho bạn bè xem", "Livestream các vụ ẩu đả", "Tạo sản phẩm số trung thực, ghi rõ nguồn, dùng ngôn ngữ lịch sự"],
            answer: 3, explanation: "Bảo đảm tính văn hoá, đạo đức và tuân thủ pháp luật khi tạo sản phẩm số giúp tránh lan truyền thông tin sai trái, tạo xã hội số lành mạnh.", level: "thong-hieu", activity: "tong-ket" },
        ],
      },
    },
  ],
};

if (typeof module !== "undefined" && module.exports) module.exports = LESSON;
if (typeof window !== "undefined") window.LESSON = LESSON;
