/* ============================================================================
 * BÀI 5 — ỨNG XỬ TRÊN MẠNG  (Tin học 7 — Kết nối tri thức với cuộc sống)
 * Chủ đề 3: Đạo đức, pháp luật và văn hoá trong môi trường số.
 * Bám sát SGK trang 23–27 + Kế hoạch bài dạy (2 tiết) của giáo viên.
 * Chỉ sửa file này để đổi nội dung. Engine app.js không cần sửa.
 * ==========================================================================*/

const LESSON = {
  meta: {
    subject: "Tin học", grade: "7", book: "Kết nối tri thức với cuộc sống",
    title: "Bài 5: Ứng xử trên mạng", unit: "Chủ đề 3 — Đạo đức, pháp luật và văn hoá trong môi trường số",
    pages: "23–27", durationMinutes: 90,
  },
  objectives: {
    knowledge: [
      "Giao tiếp qua mạng đúng quy tắc, bằng ngôn ngữ lịch sự, ứng xử có văn hoá.",
      "Nêu ví dụ truy cập không hợp lệ; biết ứng xử khi gặp thông tin xấu, không phù hợp lứa tuổi.",
      "Biết tác hại của bệnh nghiện Internet và cách phòng tránh.",
      "Biết nhờ người lớn giúp đỡ, tư vấn khi cần thiết.",
    ],
    competencies: [
      "Tự học; giao tiếp – hợp tác; giải quyết vấn đề.",
      "Năng lực số: giao tiếp đúng chuẩn mực (2.5.TC1a/b/c); bảo vệ sức khoẻ số, phòng nghiện (4.3.TC1b).",
    ],
    qualities: ["Nhân ái, chăm chỉ, trung thực, trách nhiệm; ứng xử văn minh trên mạng"],
  },
  coreKnowledge: [
    "Luôn dùng ngôn ngữ lịch sự và ứng xử có văn hoá khi giao tiếp qua mạng.",
    "Nguyên tắc vàng: không nói/làm điều gì qua mạng mà em sẽ không làm khi gặp trực tiếp.",
    "Gặp thông tin xấu: đóng ngay; chỉ vào trang phù hợp lứa tuổi; nhờ người lớn/cài phần mềm chặn.",
    "Bị bắt nạt trên mạng: nhờ bố mẹ, thầy cô, người tư vấn giúp đỡ — không im lặng chịu đựng.",
    "Nghiện Internet hại sức khoẻ, học tập, giao tiếp; phòng tránh: Chia sẻ · Rời xa · Giới hạn · Theo đuổi sở thích lành mạnh.",
  ],
  keywords: ["Ứng xử có văn hoá", "Nên & không nên", "Xử lí thông tin xấu", "Phòng nghiện Internet"],
  settings: { basePoints: 100, useTimer: false, defaultTime: 60, sound: false, streakEnabled: true },

  activities: [
    /* ===================== HĐ1: KHỞI ĐỘNG ===================== */
    {
      id: "khoi-dong", name: "Khởi động — Câu chuyện của A và B", type: "knowledge",
      goal: "Đặt vào tình huống bắt nạt trên mạng; thấy sự cần thiết của ứng xử có văn hoá.",
      time: 240,
      task: "Đọc tình huống. Nhóm thảo luận: việc B làm có đúng không? Nếu em là A, em sẽ làm gì?",
      sgkImage: "assets/sgk/sgk-trang23.jpg",
      content: {
        heading: "😢 Khi một tình bạn bị tổn thương trên mạng",
        blocks: [
          { kind: "text", value: "A và B từng rất thân. Lên lớp 7, hai bạn giận nhau. B dùng Facebook đăng bí mật cá nhân của A, nói xấu A và chia sẻ cho bạn bè, nhận nhiều bình luận. A đề nghị gỡ nhưng B không gỡ — A rất buồn và phải bỏ học." },
          { kind: "html", value: '<div style="background:#fdf2f8;border:2px solid #db2777;border-radius:14px;padding:12px 16px;font-size:17px"><b style="color:#be185d">💬 Thảo luận:</b> Việc B đăng & chia sẻ thông tin cá nhân của A có đúng pháp luật và chuẩn mực ứng xử không? Nếu em là A, em sẽ làm gì?</div>' },
        ],
        revealLabel: "🔍 Gợi ý hướng trả lời",
      },
      questions: [
        {
          question: "Việc B đăng bí mật, nói xấu A và chia sẻ lên mạng là hành vi:",
          type: "multiple-choice",
          options: ["Bình thường, vì đó là quyền của B", "SAI — vi phạm pháp luật và chuẩn mực ứng xử (bắt nạt, xâm phạm quyền riêng tư)", "Đúng, vì A và B đã giận nhau", "Chỉ là trò đùa vô hại"],
          answer: 1, explanation: "Đây là hành vi bắt nạt trên mạng, xâm phạm quyền riêng tư — vi phạm pháp luật và trái chuẩn mực ứng xử. Nếu là A, nên nhờ bố mẹ/thầy cô giúp đỡ.",
          level: "thong-hieu", activity: "khoi-dong",
        },
      ],
    },

    /* ===================== HĐ2.1: GIAO TIẾP CÓ VĂN HOÁ ===================== */
    {
      id: "giao-tiep", name: "Giao tiếp, ứng xử có văn hoá qua mạng", type: "knowledge",
      goal: "Biết các phương thức giao tiếp qua mạng và vì sao dễ thiếu văn minh.",
      time: 300,
      task: "Đọc mục 1 (SGK tr.23). Nhóm: kể các phương thức giao tiếp qua mạng; vì sao có bạn giao tiếp qua mạng thiếu văn minh hơn trực tiếp?",
      sgkImage: "assets/sgk/sgk-trang23.jpg",
      content: {
        heading: "💬 Giao tiếp qua mạng — dao hai lưỡi",
        revealLabel: "🔍 Hiện nội dung",
        blocks: [
          { kind: "list", value: [
            "Phương thức giao tiếp qua mạng: gửi/nhận thư điện tử, nhắn tin, gọi/nói chuyện trực tuyến, bình luận trên diễn đàn, mạng xã hội…",
            "Quan hệ qua mạng có phạm vi rộng, đa dạng và khó kiểm soát hơn đời thực.",
          ] },
          { kind: "html", value:
            '<div style="background:#fff7ed;border:2px solid #f59e0b;border-radius:12px;padding:10px 14px;font-size:15px"><b style="color:#b45309">Vì sao qua mạng dễ thiếu văn minh hơn?</b><ul style="margin:6px 0 0;padding-left:18px"><li>Không nhìn thấy mặt nhau.</li><li>Không lo bị "mang tiếng", dễ giấu mình.</li><li>Có thể dùng tên giả, ảnh giả.</li></ul></div>' },
        ],
      },
      questions: [
        {
          question: "Đâu là một phương thức giao tiếp QUA MẠNG?",
          type: "multiple-choice",
          options: ["Nói chuyện mặt đối mặt ngoài sân trường", "Nhắn tin, bình luận qua mạng xã hội", "Viết thư tay gửi bưu điện", "Ra hiệu bằng tay"],
          answer: 1, explanation: "Nhắn tin, bình luận qua mạng xã hội là giao tiếp qua mạng. Các phương án còn lại là giao tiếp trực tiếp/truyền thống.",
          level: "nhan-biet", activity: "giao-tiep",
        },
      ],
      remember: ["Luôn sử dụng ngôn ngữ lịch sự và ứng xử có văn hoá khi giao tiếp qua mạng."],
    },
    {
      id: "nen-khong-nen", name: "Trò chơi: Nên hay Không nên?", type: "dragdrop",
      goal: "Phân loại hành vi NÊN và KHÔNG NÊN khi giao tiếp qua mạng.",
      time: 300,
      task: "Chọn từng hành vi rồi bấm vào nhóm đúng: 'NÊN' hay 'KHÔNG NÊN' khi giao tiếp qua mạng.",
      sgkImage: "assets/sgk/sgk-trang24.jpg",
      groups: ["NÊN ✅", "KHÔNG NÊN ❌"],
      items: [
        { text: "Tôn trọng mọi người khi giao tiếp", group: 0 },
        { text: "Dùng ngôn ngữ, hình ảnh văn minh, lịch sự", group: 0 },
        { text: "Bảo vệ tài khoản cá nhân của mình", group: 0 },
        { text: "Nhờ bố mẹ, thầy cô giúp khi bị bắt nạt", group: 0 },
        { text: "Tự chủ để dùng mạng hợp lí", group: 0 },
        { text: "Nói bậy, nói xấu, dùng tiếng lóng", group: 1 },
        { text: "Đưa ảnh/thông tin người khác lên mạng khi chưa được phép", group: 1 },
        { text: "Đọc trộm thư điện tử của người khác", group: 1 },
        { text: "Dành quá nhiều thời gian truy cập mạng", group: 1 },
        { text: "Giấu bố mẹ, thầy cô khi bị căng thẳng, sợ hãi trên mạng", group: 1 },
      ],
      explanation: "NÊN: a, c, d, f, i (tôn trọng, lịch sự, bảo vệ tài khoản, nhờ giúp đỡ, tự chủ). KHÔNG NÊN: b, e, g, h, j (nói xấu, đăng TT người khác, đọc trộm thư, sa đà, giấu người lớn khi gặp rắc rối).",
    },
    {
      id: "nguyen-tac", name: "Nguyên tắc vàng & bị bắt nạt", type: "knowledge",
      goal: "Ghi nhớ nguyên tắc ứng xử và cách xử lí khi bị bắt nạt.",
      time: 180,
      task: "Đọc phần chốt (SGK tr.24). Thảo luận: bị bắt nạt trên mạng thì nên làm gì?",
      sgkImage: "assets/sgk/sgk-trang24.jpg",
      content: {
        heading: "🔑 Nguyên tắc vàng khi lên mạng",
        revealLabel: "🔍 Hiện nguyên tắc",
        blocks: [
          { kind: "html", value: '<div style="background:#ecfdf5;border:2px solid #16a34a;border-radius:14px;padding:14px 18px;font-size:18px;text-align:center;font-weight:700;color:#15803d">Không nên có lời nói, cách ứng xử nào qua mạng<br>mà em sẽ KHÔNG thực hiện như vậy khi gặp trực tiếp!</div>' },
          { kind: "text", value: "Khi bị bắt nạt trên mạng: đừng im lặng chịu đựng, cũng đừng trả đũa. Hãy NHỜ bố mẹ, thầy cô, người tư vấn giúp đỡ." },
        ],
      },
      questions: [
        {
          question: "Cách TỐT NHẤT nên làm khi bị ai đó bắt nạt trên mạng là gì?",
          type: "multiple-choice",
          options: ["Nói lời xúc phạm lại người đó", "Cố quên đi và tiếp tục chịu đựng", "Đe doạ lại người bắt nạt mình", "Nhờ bố mẹ, thầy cô giúp đỡ, tư vấn"],
          answer: 3, explanation: "Nên nhờ bố mẹ, thầy cô, người tư vấn giúp đỡ — không im lặng chịu đựng, không trả đũa.",
          level: "van-dung", activity: "nguyen-tac",
        },
      ],
      remember: ["Nguyên tắc vàng: không làm qua mạng điều em không làm khi gặp trực tiếp.", "Bị bắt nạt → nhờ người lớn giúp đỡ."],
    },

    /* ===================== HĐ2.2: THÔNG TIN XẤU ===================== */
    {
      id: "thong-tin-xau", name: "Gặp thông tin xấu thì làm gì?", type: "knowledge",
      goal: "Biết cách ứng xử khi gặp thông tin/nội dung xấu trên mạng.",
      time: 240,
      task: "Đọc mục 2 (SGK tr.24). Nhóm: gặp trang web nội dung bạo lực/không phù hợp lứa tuổi thì em làm gì?",
      sgkImage: "assets/sgk/sgk-trang25.jpg",
      content: {
        heading: "🚫 Tránh xa nội dung xấu",
        revealLabel: "🔍 Hiện cách ứng xử",
        blocks: [
          { kind: "text", value: "Trên mạng có hàng tỉ trang web; nhiều trang chứa nội dung xấu (cờ bạc, chất gây nghiện, kích động bạo lực, không phù hợp lứa tuổi). Cần biết cách tránh." },
          { kind: "list", value: [
            "Chỉ truy cập các trang web có thông tin phù hợp lứa tuổi.",
            "Nhờ người lớn cài phần mềm chặn truy cập trang web xấu.",
            "Hỏi ý kiến người lớn khi cần thiết lúc truy cập mạng.",
            "ĐÓNG NGAY trang có nội dung xấu nếu vô tình truy cập vào.",
          ] },
          { kind: "ext", value: "Tự xây dựng ý thức tốt khi dùng mạng chính là 'công cụ bảo vệ' tốt nhất." },
        ],
      },
      questions: [
        {
          question: "Chọn các cách ứng xử HỢP LÍ khi gặp một trang web có nội dung xấu.",
          type: "multiple-select",
          options: ["Tiếp tục truy cập trang web đó", "Đóng ngay trang web đó", "Đề nghị bố mẹ, thầy cô hoặc người có trách nhiệm ngăn chặn trang web đó", "Gửi trang web đó cho bạn bè xem"],
          answer: [1, 2], explanation: "Hợp lí: đóng ngay (B) và đề nghị người lớn ngăn chặn (C). Không nên tiếp tục xem hay gửi cho bạn bè.",
          level: "van-dung", activity: "thong-tin-xau",
        },
      ],
      remember: ["Gặp nội dung xấu: đóng ngay; chỉ vào trang phù hợp lứa tuổi; nhờ người lớn/cài phần mềm chặn."],
    },

    /* ===================== HĐ2.3: NGHIỆN INTERNET ===================== */
    {
      id: "nghien-tac-hai", name: "Nghiện Internet — biểu hiện & tác hại", type: "knowledge",
      goal: "Nhận biết biểu hiện và tác hại của bệnh nghiện Internet.",
      time: 300,
      task: "Đọc mục 3 (SGK tr.25–26). Nhóm: nêu biểu hiện và tác hại của bệnh nghiện Internet.",
      sgkImage: "assets/sgk/sgk-trang26.jpg",
      content: {
        heading: "🎮 Khi Internet 'nuốt chửng' thời gian",
        revealLabel: "🔍 Hiện biểu hiện & tác hại",
        blocks: [
          { kind: "html", value:
            '<div style="display:flex;gap:14px;flex-wrap:wrap">' +
            '<div style="flex:1;min-width:240px;background:#fef2f2;border:2px solid #dc2626;border-radius:14px;padding:12px"><b style="color:#b91c1c">🔎 Biểu hiện</b><ul style="margin:6px 0 0;padding-left:18px;font-size:14px"><li>Bỏ bê học hành để lên mạng.</li><li>Thức khuya dùng mạng; nói dối về thời gian dùng.</li><li>Cáu gắt khi không được dùng máy.</li><li>Thích lên mạng hơn ở bên gia đình, bạn bè.</li></ul></div>' +
            '<div style="flex:1;min-width:240px;background:#fff7ed;border:2px solid #ea580c;border-radius:14px;padding:12px"><b style="color:#c2410c">⚠️ Tác hại</b><ul style="margin:6px 0 0;padding-left:18px;font-size:14px"><li>Thiếu giao tiếp (chán ăn, sụt cân, mất ngủ).</li><li>Khó tập trung học tập.</li><li>Tăng nguy cơ bắt nạt trên mạng.</li><li>Dễ sa vào trang xấu, nghiện game.</li></ul></div>' +
            '</div>' },
          { kind: "text", value: "👉 Nghiện Internet gây ảnh hưởng xấu tới sức khoẻ thể chất, tinh thần, kết quả học tập và khả năng giao tiếp với mọi người xung quanh." },
        ],
      },
      remember: ["Nghiện Internet hại: sức khoẻ thể chất · tinh thần · học tập · giao tiếp."],
    },
    {
      id: "phong-tranh", name: "Phòng tránh nghiện Internet", type: "knowledge",
      goal: "Nêu 4 cách phòng tránh bệnh nghiện Internet.",
      time: 240,
      task: "Đọc phần lời khuyên (SGK tr.27). Nhóm 'hồi sinh cây': ghi những điều NÊN làm để phòng tránh nghiện Internet.",
      sgkImage: "assets/sgk/sgk-trang27.jpg",
      content: {
        heading: "🌳 4 cách 'hồi sinh cây'",
        revealLabel: "🔍 Hiện 4 cách phòng tránh",
        blocks: [
          { kind: "html", value:
            '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">' +
            [['💗 CHIA SẺ','Tìm người tin tưởng (bố mẹ, thầy cô, anh chị) để tâm sự.'],
             ['🚪 RỜI XA','Đưa máy tính ra khỏi phòng riêng, đặt nơi sinh hoạt chung.'],
             ['⏲️ GIỚI HẠN','Cài phần mềm giới hạn thời gian dùng Internet.'],
             ['🎯 THEO ĐUỔI','Sở thích lành mạnh: đọc sách, chơi thể thao, làm từ thiện.']]
              .map(c=>`<div style="background:#fdf2f8;border:2px solid #db2777;border-radius:12px;padding:10px"><b style="color:#be185d">${c[0]}</b><div style="font-size:14px">${c[1]}</div></div>`).join("") +
            '</div>' },
          { kind: "ext", value: "Góc cha mẹ: cởi mở, hướng dẫn con dùng Internet an toàn, đúng mức thay vì cấm đoán." },
        ],
      },
      remember: [
        "Phòng nghiện: dành thời gian với người thân/bạn bè · hạn chế thiết bị trong phòng riêng · giới hạn thời gian · theo đuổi sở thích lành mạnh.",
      ],
    },
    {
      id: "phan-loai-nghien", name: "Trò chơi: Dấu hiệu nghiện hay dùng lành mạnh?", type: "dragdrop",
      goal: "Phân biệt biểu hiện nghiện và cách dùng Internet lành mạnh.",
      time: 180,
      task: "Chọn từng hành vi rồi bấm vào nhóm đúng.",
      groups: ["Dấu hiệu NGHIỆN ⚠️", "Dùng LÀNH MẠNH ✅"],
      items: [
        { text: "Bỏ bê học hành để lên mạng", group: 0 },
        { text: "Cáu gắt khi không được dùng máy", group: 0 },
        { text: "Thức khuya, nói dối về thời gian dùng mạng", group: 0 },
        { text: "Giới hạn thời gian, học xong mới lên mạng", group: 1 },
        { text: "Cân bằng học – nghỉ – vận động, chơi thể thao", group: 1 },
      ],
      explanation: "Nghiện: bỏ học, cáu gắt, thức khuya, nói dối. Lành mạnh: có giới hạn, cân bằng, ưu tiên học và vận động.",
    },

    /* ===================== HĐ3: LUYỆN TẬP (Giải cứu thú cưng) ===================== */
    {
      id: "luyen-tap", name: "Luyện tập — Giải cứu thú cưng 🐾", type: "quiz",
      goal: "Củng cố toàn bài qua 6 câu.",
      time: 420,
      task: "Chia đội. Mỗi câu đúng = cứu được một thú cưng. Đọc kĩ đề (có câu chọn nhiều đáp án, có câu chọn ý SAI).",
      questions: [
        { question: "Khi giao tiếp qua mạng, những điều nào sau đây NÊN TRÁNH? (chọn tất cả)", type: "multiple-select",
          options: ["Tôn trọng người đang giao tiếp với mình", "Nói bất cứ điều gì xuất hiện trong đầu", "Kết bạn với những người mình không quen biết", "Truy cập bất cứ liên kết nào nhận được"],
          answer: [1, 2, 3], explanation: "Nên tránh: nói thiếu suy nghĩ (B), kết bạn với người lạ (C), bấm mọi liên kết lạ (E). Tôn trọng người khác (A) là điều nên làm.", level: "thong-hieu", activity: "luyen-tap" },
        { question: "Hai hoạt động nào DỄ gây bệnh nghiện Internet nhất? (chọn 2)", type: "multiple-select",
          options: ["Chơi trò chơi trực tuyến", "Đọc tin tức", "Sử dụng mạng xã hội", "Trao đổi qua thư điện tử"],
          answer: [0, 2], explanation: "Chơi game trực tuyến (A) và dùng mạng xã hội (C) dễ gây nghiện nhất.", level: "thong-hieu", activity: "luyen-tap" },
        { question: "Cách ứng xử HỢP LÍ khi truy cập một trang web có nội dung xấu? (chọn tất cả)", type: "multiple-select",
          options: ["Tiếp tục truy cập trang web đó", "Đóng ngay trang web đó", "Đề nghị bố mẹ, thầy cô ngăn chặn trang web đó", "Gửi trang web đó cho bạn bè xem"],
          answer: [1, 2], explanation: "Hợp lí: đóng ngay (B) và nhờ người lớn ngăn chặn (C).", level: "van-dung", activity: "luyen-tap" },
        { question: "Cách TỐT NHẤT khi bị ai đó bắt nạt trên mạng là:", type: "multiple-choice",
          options: ["Nói lời xúc phạm người đó", "Cố quên đi và tiếp tục chịu đựng", "Nhờ bố mẹ, thầy cô giáo giúp đỡ, tư vấn", "Đe doạ người bắt nạt mình"],
          answer: 2, explanation: "Nhờ bố mẹ, thầy cô giúp đỡ, tư vấn — không im lặng, không trả đũa.", level: "van-dung", activity: "luyen-tap" },
        { question: "Để hạn chế nghiện Internet, phương án nào là SAI?", type: "multiple-choice",
          options: ["Thường xuyên rèn luyện thể dục thể thao", "Tham gia hoạt động trải nghiệm ngoài trời", "Dành nhiều thời gian hơn với bạn bè, người thân", "Để thiết bị kết nối Internet trong phòng riêng"],
          answer: 3, explanation: "SAI: để thiết bị Internet trong phòng riêng làm dễ nghiện hơn — nên đặt ở nơi sinh hoạt chung.", hint: "Đâu là điều KHÔNG giúp giảm nghiện?", level: "van-dung", activity: "luyen-tap" },
        { question: "Khi tham gia mạng xã hội, em cần TRÁNH những điều gì? (chọn tất cả)", type: "multiple-select",
          options: ["Cung cấp quá nhiều thông tin cá nhân", "Đăng hình ảnh nhạy cảm, không phù hợp", "Suy nghĩ kĩ trước khi bấm vào liên kết lạ", "Dùng ngôn ngữ lịch sự khi trên mạng"],
          answer: [0, 1], explanation: "Cần tránh: lộ quá nhiều thông tin cá nhân (A), đăng ảnh nhạy cảm (B). C và D là điều NÊN làm.", level: "van-dung-cao", activity: "luyen-tap" },
      ],
    },

    /* ===================== HĐ4: VẬN DỤNG ===================== */
    {
      id: "van-dung", name: "Vận dụng", type: "vandung",
      goal: "Tạo sản phẩm tuyên truyền & giúp bạn tránh nghiện game.",
      time: 240,
      task: "Nhóm thảo luận 2 nhiệm vụ, ghi ra bảng nhóm rồi bấm xem gợi ý.",
      cases: [
        {
          question: "Nhóm em hãy phác ý tưởng một sản phẩm (áp phích / kịch ngắn / sơ đồ tư duy / bài trình chiếu) về chủ đề 'Ứng xử trên mạng'.",
          answer: "Gợi ý: chọn thông điệp ngắn (VD 'Lịch sự trên mạng như ngoài đời'); nội dung gồm: quy tắc nên/không nên, cách xử lí khi gặp thông tin xấu/bị bắt nạt, cách phòng nghiện (Chia sẻ–Rời xa–Giới hạn–Theo đuổi). Trình bày sinh động bằng hình ảnh, biểu tượng.",
        },
        {
          question: "Nếu một người bạn của em có biểu hiện nghiện trò chơi trực tuyến, em sẽ làm gì để giúp bạn?",
          answer: "Gợi ý: nhẹ nhàng chia sẻ, rủ bạn tham gia hoạt động ngoài trời/thể thao/sở thích chung; giúp bạn đặt giới hạn thời gian; động viên bạn học xong mới chơi; khuyến khích bạn tâm sự với bố mẹ/thầy cô. Không chê bai, không xa lánh bạn.",
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
          { question: "Một bạn nhắn tin trêu chọc, dùng lời lẽ xúc phạm em trên nhóm lớp. Em nên?", type: "multiple-choice",
            options: ["Nhắn lại lời lẽ nặng hơn để 'dằn mặt'", "Giữ bình tĩnh, không trả đũa; lưu bằng chứng và nhờ thầy cô/bố mẹ giúp", "Rời lớp học và giấu mọi người", "Rủ bạn khác cùng nói xấu lại"],
            answer: 1, explanation: "Không trả đũa; giữ bình tĩnh, lưu bằng chứng và nhờ người lớn giúp là cách ứng xử văn minh, an toàn.", level: "van-dung-cao", activity: "tong-ket" },
          { question: "Câu nào là NGUYÊN TẮC VÀNG khi ứng xử trên mạng?", type: "multiple-choice",
            options: ["Trên mạng thì nói gì cũng được vì không ai biết mình", "Không nói/làm qua mạng điều mà em sẽ không làm khi gặp trực tiếp", "Cứ chia sẻ mọi thứ cho thật nhiều người", "Ai nói xấu mình thì nói xấu lại"],
            answer: 1, explanation: "Nguyên tắc vàng: hãy ứng xử qua mạng đúng như khi gặp mặt trực tiếp — lịch sự, tôn trọng.", level: "thong-hieu", activity: "tong-ket" },
        ],
      },
    },
  ],
};
if (typeof module !== "undefined" && module.exports) module.exports = LESSON;
if (typeof window !== "undefined") window.LESSON = LESSON;
