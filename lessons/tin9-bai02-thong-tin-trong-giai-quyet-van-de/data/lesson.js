/* ============================================================================
 * BÀI 2: THÔNG TIN TRONG GIẢI QUYẾT VẤN ĐỀ — Tin học 9 (KNTT)
 * Chủ đề 2: Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin · SGK tr.9–11
 *
 * Nội dung bám SGK Tin học 9 (tr.9–11) và Kế hoạch bài dạy của giáo viên.
 * Sơ đồ Hình 2.2 (tiêu chí chất lượng thông tin) vẽ lại bằng SVG; ảnh SGK ở assets/sgk/.
 * ==========================================================================*/

/* ---- Sơ đồ SVG: 4 tiêu chí đánh giá chất lượng thông tin (vẽ lại Hình 2.2) ---- */
const SVG_TIEUCHI = `
<svg viewBox="0 0 860 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Sơ đồ tiêu chí chất lượng thông tin">
  <rect x="30" y="140" width="230" height="82" rx="16" fill="#f59e0b"/>
  <text x="145" y="175" font-size="22" font-weight="800" fill="#fff" text-anchor="middle">CHẤT LƯỢNG</text>
  <text x="145" y="203" font-size="22" font-weight="800" fill="#fff" text-anchor="middle">THÔNG TIN</text>
  ${[
    { y: 20, t: "🆕 Tính mới" },
    { y: 110, t: "🎯 Tính chính xác" },
    { y: 200, t: "🧩 Tính đầy đủ" },
    { y: 290, t: "🔗 Tính sử dụng được" },
  ].map(b => `
    <path d="M260 181 C 380 181, 400 ${b.y + 27}, 520 ${b.y + 27}" stroke="#94a3b8" stroke-width="3" fill="none"/>
    <rect x="520" y="${b.y}" width="310" height="54" rx="14" fill="#10b981"/>
    <text x="675" y="${b.y + 34}" font-size="21" font-weight="800" fill="#fff" text-anchor="middle">${b.t}</text>
  `).join("")}
</svg>`;

const LESSON = {
  meta: {
    subject: "Tin học", grade: "9",
    book: "Kết nối tri thức với cuộc sống",
    title: "Bài 2: Thông tin trong giải quyết vấn đề",
    unit: "Chủ đề 2: Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin",
    pages: "SGK tr.9–11", durationMinutes: 45,
  },

  objectives: {
    knowledge: [
      "Giải thích được sự cần thiết phải quan tâm đến chất lượng thông tin khi tìm kiếm, tiếp nhận và trao đổi thông tin; nêu ví dụ.",
      "Giải thích được tính mới, tính chính xác, tính đầy đủ, tính sử dụng được của thông tin; nêu ví dụ.",
    ],
    competencies: ["Tự chủ và tự học", "Giao tiếp và hợp tác", "Giải quyết vấn đề và sáng tạo", "Năng lực số"],
    qualities: ["Chăm chỉ", "Trung thực", "Trách nhiệm"],
  },

  coreKnowledge: [
    "Thông tin là cơ sở để đưa ra quyết định; cần quan tâm đến chất lượng thông tin khi tìm kiếm, tiếp nhận, trao đổi và sử dụng để đưa ra quyết định đúng đắn.",
    "Chất lượng thông tin là yếu tố quan trọng, quyết định hiệu quả của việc giải quyết vấn đề.",
    "Chất lượng thông tin được đánh giá qua 4 tiêu chí: tính mới, tính chính xác, tính đầy đủ, tính sử dụng được.",
  ],
  keywords: ["Chất lượng thông tin", "4 tiêu chí", "Nguồn tin cậy"],

  settings: { basePoints: 100, useTimer: false, defaultTime: 180, sound: true, streakEnabled: true },

  activities: [
    /* ------------------------------------------------------------------ */
    {
      id: "mo-dau",
      name: "Hoạt động 1: Mở đầu",
      type: "intro",
      time: 300,
      task: "Đọc hội thoại Minh – An về việc chọn trường THPT, thảo luận: An nên làm gì để chọn trường phù hợp?",
      sgkImage: "assets/sgk/sgk-trang9.jpg",
      goal: "Thấy được vai trò của thông tin chất lượng khi giải quyết một vấn đề thực tế.",
      content: {
        heading: "🎓 An chọn trường THPT nào?",
        revealLabel: "🔍 Hiện tình huống (Hoạt động 1: Chọn trường)",
        blocks: [
          { kind: "text", value: "Minh tìm được một trang web giới thiệu một trường THPT với nhiều lời giới thiệu ấn tượng và gửi cho An. Thấy hấp dẫn, An quyết định luôn chọn trường đó làm nguyện vọng DUY NHẤT — mà không kiểm tra thêm." },
          { kind: "text", value: "❓ Việc An tin tưởng và dùng thông tin CHƯA kiểm chứng để chọn trường có thể dẫn đến vấn đề gì?" },
        ],
      },
      questions: [
        {
          question: "Việc An vội tin thông tin quảng cáo và chỉ đăng kí MỘT nguyện vọng có thể dẫn đến điều gì?",
          type: "multiple-choice",
          options: [
            "Quyết định có thể sai và làm giảm cơ hội trúng tuyển",
            "Chắc chắn chọn được trường tốt nhất",
            "Không ảnh hưởng gì vì thông tin trên mạng luôn đúng",
            "Giúp An tiết kiệm thời gian mà vẫn an toàn",
          ],
          answer: 0,
          hint: "Thông tin quảng cáo đã được kiểm chứng chưa? Chỉ 1 nguyện vọng thì sao?",
          explanation: "Thông tin chưa kiểm chứng có thể khiến quyết định sai; chỉ một nguyện vọng làm giảm cơ hội lựa chọn nếu không trúng tuyển.",
          level: "thong-hieu", activity: "mo-dau",
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "hd21",
      name: "Hoạt động 2.1: Vai trò của chất lượng thông tin",
      type: "knowledge",
      time: 300,
      task: "Đọc SGK và cho biết: Vì sao khi giải quyết vấn đề cần quan tâm đến CHẤT LƯỢNG thông tin, không chỉ số lượng?",
      sgkImage: "assets/sgk/sgk-trang10.jpg",
      goal: "Giải thích sự cần thiết quan tâm chất lượng thông tin.",
      content: {
        heading: "💡 Vì sao phải quan tâm chất lượng thông tin?",
        revealLabel: "🔍 Hiện nội dung kiến thức",
        blocks: [
          { kind: "text", value: "An ra quyết định mà không kiểm tra thông tin có chính xác, đầy đủ và phù hợp không → quyết định có thể sai." },
          { kind: "text", value: "Để quyết định đúng, cần dùng thông tin chất lượng từ nguồn ĐÁNG TIN CẬY: trang web của Sở Giáo dục và Đào tạo, ý kiến của giáo viên chủ nhiệm, hay người thân có kinh nghiệm." },
          { kind: "text", value: "Internet là kho thông tin khổng lồ, nhưng KHÔNG phải thông tin nào cũng dùng được. Không phải số lượng bản tin, mà chính CHẤT LƯỢNG mới làm thông tin trở nên hữu ích." },
        ],
      },
      questions: [
        {
          question: "Khi thấy một KOL (người có ảnh hưởng) quảng cáo sản phẩm trên mạng, em nên ứng xử thế nào?",
          type: "multiple-choice",
          options: [
            "Chia sẻ ngay với người thân vì KOL là nguồn tin đáng tin cậy",
            "Mua dùng ngay vì KOL đảm bảo sản phẩm đã kiểm định",
            "Cân nhắc, đánh giá chất lượng thông tin trước khi sử dụng sản phẩm",
            "Tin tuyệt đối vì KOL nổi tiếng thì không thể sai",
          ],
          answer: 2,
          hint: "KOL cũng là một nguồn tin — có nên tin ngay không?",
          explanation: "Nên CÂN NHẮC, đánh giá chất lượng thông tin trước khi sử dụng — KOL quảng cáo không đồng nghĩa sản phẩm tốt hay thông tin đáng tin.",
          level: "van-dung", activity: "hd21",
        },
      ],
      remember: [
        "Thông tin là cơ sở để đưa ra các quyết định.",
        "Cần quan tâm đến chất lượng thông tin khi tìm kiếm, tiếp nhận, trao đổi và sử dụng để đưa ra quyết định đúng đắn.",
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "hd22",
      name: "Hoạt động 2.2: Chất lượng thông tin",
      type: "knowledge",
      time: 360,
      task: "Đọc SGK và cho biết: Đánh giá CHẤT LƯỢNG thông tin dựa vào những tiêu chí nào? Nêu ý nghĩa mỗi tiêu chí.",
      sgkImage: "assets/sgk/sgk-trang11.jpg",
      goal: "Giải thích 4 tiêu chí đánh giá chất lượng thông tin.",
      content: {
        heading: "📊 Bốn tiêu chí đánh giá chất lượng thông tin",
        revealLabel: "🔍 Hiện sơ đồ & 4 tiêu chí",
        blocks: [
          { kind: "svg", value: SVG_TIEUCHI },
          { kind: "list", value: [
            "🆕 Tính mới (cập nhật): thông tin có bị lỗi thời không? Cần thông tin cập nhật gần nhất; lỗi thời → chọn nhầm hoặc bỏ lỡ cơ hội.",
            "🎯 Tính chính xác: nội dung có đúng, cụ thể, có cách xác minh không? Sai (sai điểm chuẩn, sai tên/địa chỉ) → nhầm lẫn, bỏ qua trường tiềm năng.",
            "🧩 Tính đầy đủ: có bao quát nhiều khía cạnh, cho cái nhìn tổng thể không? Thiếu (học phí, môi trường, uy tín) → không toàn diện.",
            "🔗 Tính sử dụng được (liên quan, phù hợp): thông tin có liên quan đến vấn đề đang giải quyết không? Không liên quan → vô ích.",
          ] },
        ],
      },
      remember: [
        "Chất lượng thông tin là yếu tố quan trọng, quyết định hiệu quả của việc giải quyết vấn đề.",
        "Đánh giá qua 4 tiêu chí: tính mới · tính chính xác · tính đầy đủ · tính sử dụng được.",
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "ghep-tieu-chi",
      name: "Ghép đôi: Tiêu chí ↔ Câu hỏi kiểm tra",
      type: "matching",
      time: 180,
      task: "Nối mỗi tiêu chí chất lượng thông tin với câu hỏi giúp em kiểm tra nó.",
      goal: "Hiểu bản chất từng tiêu chí.",
      pairs: [
        { left: "🆕 Tính mới", right: "Thông tin có bị lỗi thời không? Đã cập nhật gần nhất chưa?" },
        { left: "🎯 Tính chính xác", right: "Nội dung có đúng, có cách xác minh được không?" },
        { left: "🧩 Tính đầy đủ", right: "Có bao quát nhiều khía cạnh, cho cái nhìn tổng thể không?" },
        { left: "🔗 Tính sử dụng được", right: "Thông tin có liên quan, phù hợp với vấn đề không?" },
      ],
      explanation: "Mỗi tiêu chí ứng với một câu hỏi kiểm tra: mới ↔ lỗi thời? · chính xác ↔ đúng/xác minh? · đầy đủ ↔ tổng thể? · sử dụng được ↔ liên quan?",
    },

    /* ------------------------------------------------------------------ */
    {
      id: "phan-loai-vi-pham",
      name: "Phân loại: Vi phạm tiêu chí nào?",
      type: "dragdrop",
      time: 240,
      task: "Mỗi tình huống dưới đây vi phạm tiêu chí chất lượng thông tin nào? Kéo vào đúng nhóm.",
      goal: "Vận dụng 4 tiêu chí vào tình huống.",
      groups: ["Tính mới", "Tính chính xác", "Tính đầy đủ", "Tính sử dụng được"],
      items: [
        { text: "Số điện thoại trên web đã đổi nhưng chưa được cập nhật", group: 0 },
        { text: "Bài viết ghi SAI điểm chuẩn tuyển sinh của trường", group: 1 },
        { text: "Thiếu thông tin về học phí và cơ sở vật chất của trường", group: 2 },
        { text: "Thông tin về du học khi mục tiêu là chọn trường THPT công lập", group: 3 },
      ],
      explanation: "Lỗi thời → thiếu tính mới; sai nội dung → thiếu tính chính xác; thiếu khía cạnh → thiếu tính đầy đủ; không liên quan → không sử dụng được.",
    },

    /* ------------------------------------------------------------------ */
    {
      id: "luyen-tap",
      name: "Hoạt động 3: Luyện tập",
      type: "quiz",
      time: 360,
      task: "Trả lời nhanh các câu hỏi để củng cố. Chia đội thi cho sôi động!",
      goal: "Củng cố toàn bài.",
      questions: [
        {
          question: "Chọn TẤT CẢ các nguồn thông tin ĐÁNG TIN CẬY để giúp em chọn trường THPT.",
          type: "multiple-select",
          options: [
            "Trang web của Sở Giáo dục và Đào tạo",
            "Một bình luận ẩn danh trên mạng xã hội",
            "Ý kiến của giáo viên chủ nhiệm",
            "Người thân có kinh nghiệm",
          ],
          answer: [0, 2, 3],
          hint: "Nguồn nào có thể kiểm chứng, có trách nhiệm?",
          explanation: "Trang Sở GD&ĐT, GVCN và người thân có kinh nghiệm là nguồn đáng tin; bình luận ẩn danh chưa kiểm chứng thì không.",
          level: "nhan-biet", activity: "luyen-tap",
        },
        {
          question: "An không để ý đến THỜI GIAN đăng kí nguyện vọng xét tuyển. Sơ suất này vi phạm tiêu chí nào?",
          type: "multiple-choice",
          options: ["Tính chính xác", "Tính mới (tính cập nhật)", "Tính đầy đủ", "Tính sử dụng được"],
          answer: 1,
          hint: "'Thời gian' liên quan đến việc cập nhật kịp thời.",
          explanation: "Không cập nhật đúng thời hạn là thiếu TÍNH MỚI — có thể khiến An bỏ lỡ thời gian đăng kí.",
          level: "van-dung", activity: "luyen-tap",
        },
        {
          question: "Một thông tin RẤT NHIỀU nhưng toàn nội dung không liên quan đến vấn đề em cần giải quyết. Thông tin đó thiếu tiêu chí nào?",
          type: "multiple-choice",
          options: ["Tính sử dụng được", "Tính mới", "Tính chính xác", "Tính đầy đủ"],
          answer: 0,
          hint: "'Không liên quan' đến vấn đề nghĩa là sao?",
          explanation: "Thông tin không liên quan đến vấn đề thì thiếu TÍNH SỬ DỤNG ĐƯỢC — dù nhiều vẫn vô ích.",
          level: "van-dung", activity: "luyen-tap",
        },
        {
          question: "Điều nào sau đây ĐÚNG về chất lượng thông tin?",
          type: "multiple-choice",
          options: [
            "Số lượng bản tin càng nhiều thì thông tin càng hữu ích",
            "Thông tin nào trên Internet cũng có thể dùng để giải quyết vấn đề",
            "Chất lượng thông tin quyết định hiệu quả giải quyết vấn đề",
            "Chỉ cần thông tin mới là đủ, không cần chính xác",
          ],
          answer: 2,
          hint: "Số lượng hay chất lượng làm thông tin hữu ích?",
          explanation: "Chính CHẤT LƯỢNG thông tin (chứ không phải số lượng) quyết định hiệu quả giải quyết vấn đề.",
          level: "thong-hieu", activity: "luyen-tap",
        },
        {
          question: "Trước khi dùng một thông tin quan trọng để ra quyết định, việc nên làm nhất là gì?",
          type: "multiple-choice",
          options: [
            "Dùng ngay cho nhanh nếu thấy hợp ý mình",
            "Kiểm chứng, đánh giá chất lượng và đối chiếu nguồn đáng tin cậy",
            "Chia sẻ cho nhiều người rồi mới dùng",
            "Chỉ tin nếu có nhiều lượt thích",
          ],
          answer: 1,
          hint: "Nhớ bài học của An.",
          explanation: "Cần kiểm chứng và đánh giá chất lượng, đối chiếu với nguồn đáng tin cậy trước khi dùng để ra quyết định.",
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
      task: "Đánh giá chất lượng thông tin mà mỗi bạn thu nhận (theo 4 tiêu chí).",
      goal: "Vận dụng 4 tiêu chí vào tình huống thực tế.",
      content: {
        situation: "Để chuẩn bị tham quan một nông trại, An gọi số điện thoại ghi trên trang web của nông trại nhưng KHÔNG liên lạc được. Minh nghĩ đầu số có thể đã đổi mà web chưa cập nhật, nên tìm số mới trên website của nhà cung cấp dịch vụ viễn thông — và liên hệ thành công.",
        question: "Hãy nhận xét chất lượng thông tin (theo 4 tiêu chí) mà mỗi bạn thu nhận được.",
        hints: [
          "Số điện thoại cũ trên web nông trại thiếu tiêu chí nào?",
          "Thông tin Minh tìm được có 'mới', 'chính xác', 'sử dụng được' không?",
        ],
        modelAnswer: "Số điện thoại An dùng (trên web nông trại) đã lỗi thời → THIẾU TÍNH MỚI, nên không dùng được. Minh tìm số cập nhật từ nhà cung cấp viễn thông → thông tin có tính mới, chính xác và sử dụng được, nên liên hệ thành công.",
      },
      questions: [
        {
          question: "Số điện thoại cũ (đã đổi) trên trang web của nông trại chủ yếu thiếu tiêu chí nào?",
          type: "multiple-choice",
          options: ["Tính đầy đủ", "Tính sử dụng được", "Tính mới (tính cập nhật)", "Tính chính xác về chính tả"],
          answer: 2,
          hint: "Số đã đổi mà web chưa cập nhật.",
          explanation: "Đầu số đã đổi mà web chưa cập nhật → thông tin lỗi thời, thiếu TÍNH MỚI nên không liên lạc được.",
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
            question: "Em tìm được một bài viết về trường THPT: đăng năm nay, có trích nguồn Sở GD&ĐT, nêu đủ học phí – điểm chuẩn – cơ sở vật chất, đúng trường em quan tâm. Bài viết này đạt mấy tiêu chí chất lượng?",
            type: "multiple-choice",
            options: ["Chỉ 1 tiêu chí", "2 tiêu chí", "3 tiêu chí", "Cả 4 tiêu chí"],
            answer: 3,
            hint: "Mới (đăng năm nay) · chính xác (nguồn Sở) · đầy đủ (đủ mục) · sử dụng được (đúng trường quan tâm).",
            explanation: "Đủ cả 4: mới (đăng năm nay), chính xác (có nguồn Sở GD&ĐT), đầy đủ (học phí–điểm–CSVC), sử dụng được (đúng trường quan tâm) → thông tin chất lượng cao.",
            level: "van-dung-cao", activity: "tong-ket",
          },
        ],
      },
    },
  ],
};
if (typeof module !== "undefined" && module.exports) module.exports = LESSON;
if (typeof window !== "undefined") window.LESSON = LESSON;
