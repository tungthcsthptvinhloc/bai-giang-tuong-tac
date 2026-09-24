/* ============================================================================
 * BÀI 4 — MẠNG XÃ HỘI VÀ MỘT SỐ KÊNH TRAO ĐỔI THÔNG TIN TRÊN INTERNET
 * (Tin học 7 — Kết nối tri thức với cuộc sống)
 * Chủ đề 2: Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin.
 * Bám sát SGK trang 18–22 + Kế hoạch bài dạy (2 tiết) của giáo viên.
 * Chỉ sửa file này để đổi nội dung. Engine app.js không cần sửa.
 * ==========================================================================*/

/* Dòng thời gian cách con người trao đổi thông tin */
function commHistorySVG() {
  const items = [["🕊️", "Chim bồ câu"], ["✉️", "Thư bưu điện"], ["📞", "Điện báo, điện thoại"], ["🌐", "Internet & mạng xã hội"]];
  const w = 250, gap = 20, total = items.length * w + (items.length - 1) * gap;
  let g = `<line x1="40" y1="70" x2="${total - 40}" y2="70" stroke="#e9d5ff" stroke-width="6"/>`;
  items.forEach((it, i) => {
    const cx = i * (w + gap) + w / 2;
    const last = i === items.length - 1;
    g += `<circle cx="${cx}" cy="70" r="30" fill="${last ? "#c026d3" : "#fff"}" stroke="#c026d3" stroke-width="3"/>` +
      `<text x="${cx}" y="82" text-anchor="middle" font-size="30">${it[0]}</text>` +
      `<text x="${cx}" y="130" text-anchor="middle" font-size="18" font-weight="${last ? 800 : 600}" fill="${last ? "#a21caf" : "#7a5b86"}">${it[1]}</text>`;
    if (i < items.length - 1) g += `<text x="${cx + w / 2 + gap / 2}" y="78" text-anchor="middle" font-size="22" fill="#c026d3">→</text>`;
  });
  return `<svg viewBox="0 0 ${total} 150" width="100%" style="max-height:26vh" xmlns="http://www.w3.org/2000/svg" role="img">${g}</svg>`;
}

const LESSON = {
  meta: {
    subject: "Tin học", grade: "7", book: "Kết nối tri thức với cuộc sống",
    title: "Bài 4: Mạng xã hội và một số kênh trao đổi thông tin trên Internet",
    unit: "Chủ đề 2 — Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin",
    pages: "18–22", durationMinutes: 90,
  },
  objectives: {
    knowledge: [
      "Nêu được tên một kênh trao đổi thông tin thông dụng trên Internet và loại thông tin trao đổi.",
      "Nêu được chức năng cơ bản của mạng xã hội; nhận biết một số website là mạng xã hội.",
      "Sử dụng được một số chức năng cơ bản của mạng xã hội để giao lưu, chia sẻ thông tin.",
      "Nêu được ví dụ về hậu quả của việc dùng thông tin vào mục đích sai trái.",
    ],
    competencies: [
      "Tự học; giao tiếp – hợp tác; giải quyết vấn đề (phân biệt mặt tốt/xấu của MXH).",
      "Năng lực số: chọn kênh trao đổi phù hợp, chia sẻ an toàn (2.2.TC1a); ghi nguồn, chia sẻ đúng đối tượng (2.2.TC1b).",
    ],
    qualities: ["Nhân ái, chăm chỉ, trung thực, trách nhiệm khi tham gia môi trường mạng"],
  },
  coreKnowledge: [
    "Kênh trao đổi thông tin thông dụng trên Internet: thư điện tử, diễn đàn, mạng xã hội.",
    "Mạng xã hội là một cộng đồng trực tuyến để mọi người tương tác; thường tổ chức dưới dạng website.",
    "Mỗi mạng xã hội thường có mục đích riêng: giao lưu, chia sẻ ảnh/video, thảo luận…",
    "Mạng xã hội có tính HAI MẶT (tốt & xấu); cần tuân thủ quy định (thường ≥13 tuổi), dùng an toàn, có trách nhiệm.",
    "Dùng thông tin vào mục đích sai trái có thể gây hậu quả nặng và bị xử lí theo pháp luật.",
  ],
  keywords: ["Kênh trao đổi thông tin", "Mạng xã hội", "Tính hai mặt", "Dùng mạng an toàn"],
  settings: { basePoints: 100, useTimer: false, defaultTime: 60, sound: false, streakEnabled: true },

  activities: [
    /* ===================== HĐ1: MỞ ĐẦU ===================== */
    {
      id: "khoi-dong", name: "Khởi động — Con người trao đổi thông tin", type: "intro",
      goal: "Thấy sự phát triển của cách trao đổi thông tin; dẫn tới mạng xã hội.",
      time: 180,
      task: "Đọc đoạn mở đầu (SGK tr.18). Cá nhân trả lời: em biết được điều gì? Kênh nào đang dùng nhiều nhất?",
      sgkImage: "assets/sgk/sgk-trang18.jpg",
      content: {
        heading: "💬 Từ chim bồ câu đến mạng xã hội",
        prompt: "Xưa nay con người trao đổi thông tin bằng nhiều cách. Internet ra đời tạo ra nhiều kênh nhanh, tiện — nổi bật là mạng xã hội.",
        blocks: [
          { kind: "svg", value: commHistorySVG() },
          { kind: "text", value: "👉 Giao lưu xã hội tăng nhanh khi có Internet. Kênh trao đổi được dùng nhiều nhất hiện nay là mạng xã hội." },
        ],
        revealLabel: "🔍 Xem dòng thời gian",
      },
      questions: [
        {
          question: "Ở lớp 6, em đã dùng Internet để nhận và gửi thông tin bằng cách nào?",
          type: "multiple-choice",
          options: ["Gửi thư điện tử (email)", "Gửi chim bồ câu", "Gửi điện báo", "Không dùng cách nào"],
          answer: 0, explanation: "Ở lớp 6 em đã học dùng thư điện tử (email) để nhận và gửi thông tin.",
          level: "nhan-biet", activity: "khoi-dong",
        },
      ],
    },

    /* ===================== HĐ2.1: KÊNH TRAO ĐỔI & MXH ===================== */
    {
      id: "kenh-trao-doi", name: "Các kênh trao đổi thông tin trên Internet", type: "knowledge",
      goal: "Kể tên các kênh thông dụng và các dạng thông tin.",
      time: 240,
      task: "Đọc mục 1a (SGK tr.18). Nhóm: kể các kênh trao đổi thông tin phổ biến và các dạng thông tin trên Internet.",
      sgkImage: "assets/sgk/sgk-trang18.jpg",
      content: {
        heading: "📡 Ba kênh thông dụng",
        revealLabel: "🔍 Hiện các kênh & dạng thông tin",
        blocks: [
          { kind: "html", value:
            '<div style="display:flex;gap:12px;flex-wrap:wrap;justify-content:center">' +
            [['✉️','Thư điện tử','gửi/nhận thư, tệp'],['💬','Diễn đàn (Forum)','thảo luận theo chủ đề'],['🌐','Mạng xã hội','kết nối, chia sẻ, tương tác']]
              .map(c=>`<div style="background:#fdf4ff;border:2px solid #c026d3;border-radius:14px;padding:14px 18px;text-align:center;min-width:170px"><div style="font-size:34px">${c[0]}</div><div style="font-weight:800;color:#a21caf">${c[1]}</div><div style="font-size:14px;color:#7a5b86">${c[2]}</div></div>`).join("") +
            '</div>' },
          { kind: "text", value: "Thông tin trên Internet được liên tục cập nhật và tồn tại ở nhiều dạng: văn bản, hình ảnh, âm thanh, video, phần mềm…" },
        ],
      },
      remember: ["Thư điện tử, diễn đàn, mạng xã hội là những kênh trao đổi thông tin thông dụng trên Internet."],
    },
    {
      id: "mxh-la-gi", name: "Mạng xã hội là gì?", type: "knowledge",
      goal: "Nêu khái niệm và đặc điểm của mạng xã hội.",
      time: 240,
      task: "Đọc mục 1b (SGK tr.19). Nhóm: mạng xã hội là gì? Nó thường được tổ chức dưới dạng gì?",
      sgkImage: "assets/sgk/sgk-trang19.jpg",
      content: {
        heading: "🌐 Mạng xã hội — cộng đồng trực tuyến",
        revealLabel: "🔍 Hiện khái niệm",
        blocks: [
          { kind: "text", value: "Mạng xã hội là một CỘNG ĐỒNG TRỰC TUYẾN để mọi người tương tác với nhau. Cách tổ chức phổ biến là dưới dạng các WEBSITE." },
          { kind: "list", value: [
            "Cách tương tác: nhắn tin riêng, nhận xét trên trang bạn bè, đăng ảnh/video, thảo luận học tập, chơi game trực tuyến…",
            "Mỗi mạng xã hội thường có MỤC ĐÍCH riêng (giao lưu, chia sẻ ảnh, chia sẻ video, thảo luận…).",
          ] },
        ],
      },
      remember: [
        "Mạng xã hội = cộng đồng trực tuyến để mọi người tương tác; thường là website.",
        "Mỗi mạng xã hội thường có một mục đích nhất định.",
      ],
    },
    {
      id: "phan-loai-mxh", name: "Trò chơi: Mạng xã hội ↔ Mục đích", type: "matching",
      goal: "Nhận biết một số website là mạng xã hội và mục đích của chúng (Bảng 4.1).",
      time: 180,
      task: "Nối mỗi mạng xã hội / nền tảng với mục đích chính của nó.",
      sgkImage: "assets/sgk/sgk-trang19.jpg",
      pairs: [
        { left: "Facebook, Zalo", right: "Giao lưu, kết nối bạn bè" },
        { left: "YouTube", right: "Chia sẻ, xem video" },
        { left: "Instagram", right: "Chia sẻ ảnh" },
        { left: "Diễn đàn học tập (Forum)", right: "Thảo luận, chia sẻ kiến thức" },
      ],
      explanation: "Mỗi mạng xã hội có thế mạnh riêng — chọn nền tảng phù hợp với mục đích của mình.",
    },

    /* Tính hai mặt */
    {
      id: "hai-mat", name: "Tính hai mặt của mạng xã hội", type: "knowledge",
      goal: "Phân biệt mặt tích cực và tiêu cực của mạng xã hội.",
      time: 240,
      task: "Đọc SGK tr.19. Nhóm hoàn thành bảng: hoạt động nào trên MXH là TÍCH CỰC, hoạt động nào TIÊU CỰC?",
      sgkImage: "assets/sgk/sgk-trang19.jpg",
      content: {
        heading: "⚖️ Tốt và xấu — cân nhắc khi dùng",
        revealLabel: "🔍 Hiện hai mặt",
        blocks: [
          { kind: "html", value:
            '<div style="display:flex;gap:14px;flex-wrap:wrap">' +
            '<div style="flex:1;min-width:240px;background:#ecfdf5;border:2px solid #16a34a;border-radius:14px;padding:12px"><b style="color:#15803d">✅ Tích cực</b><ul style="margin:6px 0 0;padding-left:18px;font-size:15px"><li>Kết nối, giao lưu, chia sẻ, thảo luận.</li><li>Cung cấp tin tức, kiến thức nhiều lĩnh vực.</li><li>Học hỏi kĩ năng, bày tỏ quan điểm.</li></ul></div>' +
            '<div style="flex:1;min-width:240px;background:#fef2f2;border:2px solid #dc2626;border-radius:14px;padding:12px"><b style="color:#b91c1c">❌ Tiêu cực</b><ul style="margin:6px 0 0;padding-left:18px;font-size:15px"><li>Chia sẻ thông tin sai sự thật.</li><li>Nguy cơ lộ thông tin cá nhân.</li><li>Dễ bị lừa đảo, đe doạ, bắt nạt.</li></ul></div>' +
            '</div>' },
          { kind: "ext", value: "Nhiều mạng xã hội quy định độ tuổi tối thiểu, phổ biến là từ 13 tuổi trở lên." },
        ],
      },
      remember: ["Mạng xã hội có tính HAI MẶT; cần cân nhắc, tìm hiểu kĩ và dùng có trách nhiệm."],
    },
    {
      id: "game-hai-mat", name: "Trò chơi: Tích cực hay Tiêu cực?", type: "dragdrop",
      goal: "Phân loại hoạt động trên mạng xã hội.",
      time: 180,
      task: "Chọn từng hoạt động rồi bấm vào nhóm đúng: 'Tích cực' hay 'Tiêu cực'.",
      groups: ["Tích cực ✅", "Tiêu cực ❌"],
      items: [
        { text: "Học hỏi kiến thức, kĩ năng", group: 0 },
        { text: "Kết nối, chia sẻ với bạn bè", group: 0 },
        { text: "Cập nhật tin tức hữu ích", group: 0 },
        { text: "Đăng tin giả, chưa kiểm chứng", group: 1 },
        { text: "Bình luận xấu, bắt nạt người khác", group: 1 },
        { text: "Chia sẻ thông tin cá nhân nhạy cảm", group: 1 },
      ],
      explanation: "Cùng một mạng xã hội có thể dùng cho việc tốt hoặc việc xấu — tuỳ ý thức người dùng.",
    },

    /* Quiz nhanh (trò chơi Mùa hè sôi động) */
    {
      id: "quiz-nhanh", name: "Ai nhanh hơn — Hiểu về mạng xã hội", type: "quiz",
      goal: "Củng cố nhận thức về mạng xã hội qua 5 câu.",
      time: 300,
      task: "Suy nghĩ nhanh, chọn đáp án đúng cho mỗi câu.",
      questions: [
        { question: "KHÔNG nên dùng mạng xã hội cho mục đích nào sau đây?", type: "multiple-choice",
          options: ["Bình luận xấu về người khác", "Giao lưu với bạn bè", "Học hỏi kiến thức", "Chia sẻ hình ảnh phù hợp của mình"],
          answer: 0, explanation: "Bình luận xấu về người khác là hành vi tiêu cực, thiếu văn hoá — không nên làm.", level: "thong-hieu", activity: "quiz-nhanh" },
        { question: "\"Đưa thông tin sai sự thật lên mạng, dùng thông tin vào mục đích sai trái là hành vi bị nghiêm cấm và có thể bị phạt theo pháp luật.\" Điều đó là:", type: "true-false",
          answer: true, explanation: "Đúng. Đây là hành vi bị pháp luật nghiêm cấm và có thể bị xử phạt.", level: "nhan-biet", activity: "quiz-nhanh" },
        { question: "Chọn câu SAI. Nhược điểm của mạng xã hội là:", type: "multiple-choice",
          options: ["Lan truyền thông tin nhanh chóng, rộng khắp", "Có thể bị dùng để lấy cắp dữ liệu", "Ảnh hưởng sức khoẻ thể chất & tinh thần người dùng", "Là môi trường cho việc bắt nạt, đe doạ trực tuyến"],
          answer: 0, explanation: "\"Lan truyền thông tin nhanh, rộng khắp\" là ƯU điểm, không phải nhược điểm → đây là câu SAI khi xếp vào nhược điểm.", hint: "Lan truyền nhanh có phải điều xấu không?", level: "van-dung", activity: "quiz-nhanh" },
        { question: "Mục đích của mạng xã hội là:", type: "multiple-choice",
          options: ["Chia sẻ, học tập", "Chia sẻ, học tập, tương tác", "Chia sẻ, học tập, tiếp thị", "Chia sẻ, học tập, tương tác, tiếp thị"],
          answer: 3, explanation: "Mạng xã hội phục vụ nhiều mục đích: chia sẻ, học tập, tương tác và cả tiếp thị (quảng bá).", level: "thong-hieu", activity: "quiz-nhanh" },
        { question: "Chọn câu SAI. Ưu điểm của mạng xã hội là:", type: "multiple-choice",
          options: ["Giúp kết nối với người thân, bạn bè", "Hỗ trợ giảng dạy và học tập", "Tăng khả năng giao tiếp TRỰC TIẾP", "Cung cấp & cập nhật thông tin nhanh, hiệu quả"],
          answer: 2, explanation: "Mạng xã hội tăng giao tiếp TRỰC TUYẾN, thậm chí làm giảm giao tiếp trực tiếp → câu C là SAI khi xếp vào ưu điểm.", level: "van-dung", activity: "quiz-nhanh" },
      ],
    },

    /* ===================== HĐ2.2: THỰC HÀNH ===================== */
    {
      id: "thuc-hanh", name: "Thực hành: Dùng mạng xã hội (Facebook)", type: "knowledge",
      goal: "Biết các thao tác cơ bản: tạo tài khoản, chia sẻ nội dung, kết bạn.",
      time: 360,
      task: "Đọc mục 2 (SGK tr.20–22). HS thực hành trên máy: tạo tài khoản, chia sẻ nội dung, kết nối với 1 bạn cùng lớp.",
      sgkImage: "assets/sgk/sgk-trang20.jpg",
      content: {
        heading: "🖱️ Ba việc cơ bản trên Facebook",
        revealLabel: "🔍 Hiện các bước thao tác",
        blocks: [
          { kind: "html", value:
            '<div style="font-size:16px">' +
            '<b style="color:#a21caf">a) Tạo tài khoản:</b> truy cập <span style="font-family:Consolas,monospace">facebook.com</span> → chọn Tiếng Việt → <b>Tạo tài khoản mới</b> → nhập thông tin → <b>Đăng ký</b>. (Yêu cầu ≥ 13 tuổi.)<br>' +
            '<b style="color:#a21caf">b) Chia sẻ nội dung:</b> đăng nhập → nháy vào <b>hộp trạng thái</b> để nhập nội dung, hoặc thêm <b>Ảnh/Video</b> → nháy <b>Đăng/Post</b>.<br>' +
            '<b style="color:#a21caf">c) Kết nối bạn:</b> tìm trang Facebook của bạn → mở trang → nháy <b>Thêm bạn bè</b> để gửi yêu cầu kết bạn.</div>' },
          { kind: "text", value: "Khi kết bạn được chấp nhận, hai tài khoản theo dõi nhau và có thể tương tác." },
          { kind: "ext", value: "⚠️ Nhớ ĐĂNG XUẤT khi không dùng để tránh người khác sử dụng tài khoản của em." },
        ],
      },
      remember: [
        "3 việc cơ bản: tạo tài khoản (≥13 tuổi) · chia sẻ nội dung (Đăng/Post) · kết bạn (Thêm bạn bè).",
        "Luôn đăng xuất khi dùng máy chung; không chia sẻ thông tin cá nhân nhạy cảm.",
      ],
    },
    {
      id: "sap-xep-tao-tk", name: "Sắp xếp: Các bước tạo tài khoản", type: "ordering",
      goal: "Nắm đúng trình tự tạo tài khoản Facebook.",
      time: 150,
      task: "Dùng ▲▼ sắp đúng thứ tự các bước tạo tài khoản, rồi bấm Kiểm tra.",
      steps: [
        "Truy cập trang facebook.com",
        "Chọn ngôn ngữ Tiếng Việt",
        "Nháy 'Tạo tài khoản mới'",
        "Nhập đầy đủ thông tin",
        "Nháy nút 'Đăng ký'",
      ],
      explanation: "Trình tự: truy cập → chọn Tiếng Việt → Tạo tài khoản mới → nhập thông tin → Đăng ký.",
    },

    /* ===================== HĐ3: LUYỆN TẬP ===================== */
    {
      id: "luyen-tap", name: "Luyện tập", type: "quiz",
      goal: "Củng cố khái niệm và cách dùng mạng xã hội an toàn.",
      time: 300,
      task: "Thảo luận cặp đôi, chọn đáp án đúng.",
      sgkImage: "assets/sgk/sgk-trang22.jpg",
      questions: [
        { question: "Đâu là BA kênh trao đổi thông tin thông dụng trên Internet?", type: "multiple-choice",
          options: ["Thư điện tử, diễn đàn, mạng xã hội", "Bút, vở, bảng", "Chim bồ câu, thư tay, điện báo", "Loa, đài, tivi"],
          answer: 0, explanation: "Ba kênh thông dụng trên Internet: thư điện tử, diễn đàn, mạng xã hội.", level: "nhan-biet", activity: "luyen-tap" },
        { question: "Mạng xã hội giúp mọi người tương tác với nhau mà không cần gặp mặt.", type: "true-false",
          answer: true, explanation: "Đúng. Mạng xã hội là cộng đồng trực tuyến, mọi người tương tác từ xa.", level: "thong-hieu", activity: "luyen-tap" },
        { question: "TẤT CẢ các website đều là mạng xã hội.", type: "true-false",
          answer: false, explanation: "Sai. Chỉ những website tổ chức thành cộng đồng để tương tác mới là mạng xã hội.", level: "thong-hieu", activity: "luyen-tap" },
        { question: "Bất cứ tuổi nào cũng có thể tham gia mạng xã hội.", type: "true-false",
          answer: false, explanation: "Sai. Nhiều mạng xã hội quy định độ tuổi tối thiểu (phổ biến từ 13 tuổi trở lên).", level: "thong-hieu", activity: "luyen-tap" },
        { question: "Người xấu có thể đưa tin giả lên mạng. Vì vậy em nên?", type: "multiple-choice",
          options: ["Tin và chia sẻ mọi thứ cho nhanh", "Cảnh giác, kiểm chứng; thận trọng khi trò chuyện với người lạ", "Kết bạn với tất cả người lạ", "Đăng hết thông tin cá nhân để nổi tiếng"],
          answer: 1, explanation: "Cần cảnh giác, kiểm chứng thông tin và thận trọng với người lạ trên mạng.", level: "van-dung", activity: "luyen-tap" },
      ],
    },

    /* ===================== HĐ4: VẬN DỤNG ===================== */
    {
      id: "van-dung", name: "Vận dụng", type: "vandung",
      goal: "Giới thiệu một MXH & nêu hậu quả của việc dùng thông tin sai trái.",
      time: 300,
      task: "Nhóm thảo luận 2 nhiệm vụ, ghi ra bảng nhóm rồi bấm xem gợi ý.",
      cases: [
        {
          question: "Hãy tìm hiểu kĩ một mạng xã hội em quan tâm (VD: Zalo) và giới thiệu: chức năng chính, đối tượng phù hợp, cách tham gia, lưu ý khi tham gia.",
          answer: "Ví dụ Zalo — Chức năng chính: nhắn tin & gọi điện miễn phí trên điện thoại và máy tính. Đối tượng: mọi lứa tuổi phù hợp. Cách tham gia: tạo tài khoản Zalo, đăng nhập bằng điện thoại/máy tính. Lưu ý: bảo vệ thông tin cá nhân; nếu muốn ngừng dùng thì xoá tài khoản (sẽ mất hết tin nhắn, bạn bè). (HS có thể chọn mạng xã hội khác và trình bày tương tự.)",
        },
        {
          question: "Nêu một ví dụ cụ thể về hậu quả của việc dùng thông tin vào mục đích sai trái.",
          answer: "Ví dụ: đưa thông tin sai lệch về phòng chống dịch COVID-19 khiến người dân hiểu sai chủ trương, giảm đồng thuận xã hội, gây khó khăn cho công tác chống dịch — người đăng có thể bị xử phạt. (SGK còn nêu: học sinh bị kỉ luật vì đăng tin sai chưa kiểm chứng; bị đình chỉ thi & công an điều tra vì chụp và chia sẻ đề thi lên mạng.)",
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
          {
            question: "Bạn em muốn đăng bài nói xấu một bạn khác trong lớp lên mạng xã hội. Em nên khuyên bạn thế nào?",
            type: "multiple-choice",
            options: ["Ủng hộ, cùng đăng cho vui", "Khuyên đừng làm: đăng nội dung xúc phạm người khác là sai, có thể bị xử lí và gây hậu quả", "Kệ bạn, không liên quan", "Bảo bạn đăng ẩn danh cho an toàn"],
            answer: 1, explanation: "Đăng nội dung xúc phạm/bôi nhọ người khác là hành vi sai trái, có thể gây hậu quả và bị xử lí — nên khuyên bạn dừng lại.",
            level: "van-dung-cao", activity: "tong-ket",
          },
          {
            question: "Khi dùng máy tính chung ở phòng thực hành để vào mạng xã hội, việc quan trọng cần làm sau khi dùng xong là:",
            type: "multiple-choice",
            options: ["Tắt màn hình là đủ", "Đăng xuất khỏi tài khoản", "Đổi ảnh đại diện", "Kết bạn thật nhiều"],
            answer: 1, explanation: "Phải ĐĂNG XUẤT để người dùng sau không truy cập được tài khoản của em.",
            level: "thong-hieu", activity: "tong-ket",
          },
        ],
      },
    },
  ],
};
if (typeof module !== "undefined" && module.exports) module.exports = LESSON;
if (typeof window !== "undefined") window.LESSON = LESSON;
