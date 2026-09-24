/* ============================================================================
 * BÀI 1: THÔNG TIN VÀ DỮ LIỆU — Tin học 6 (Kết nối tri thức với cuộc sống)
 * Chủ đề 1: Máy tính và cộng đồng · SGK tr.5–7 · Giáo án
 *
 * Nội dung bám SGK Tin học 6 (tr.5–7) và Kế hoạch bài dạy của giáo viên.
 * Ví dụ, định nghĩa, Bảng 1.1 (lượng mưa) lấy nguyên văn từ SGK.
 * Ảnh SGK gốc lưu ở assets/sgk/ để giáo viên chiếu khi cần.
 * ==========================================================================*/
const LESSON = {
  meta: {
    subject: "Tin học", grade: "6",
    book: "Kết nối tri thức với cuộc sống",
    title: "Bài 1: Thông tin và dữ liệu",
    unit: "Chủ đề 1: Máy tính và cộng đồng",
    pages: "SGK tr.5–7", durationMinutes: 45,
  },

  objectives: {
    knowledge: [
      "Nhận biết được sự khác nhau giữa thông tin và dữ liệu.",
      "Phân biệt được thông tin và vật mang tin.",
      "Nêu được ví dụ minh hoạ mối quan hệ giữa thông tin và dữ liệu.",
      "Nêu được ví dụ minh hoạ tầm quan trọng của thông tin.",
    ],
    competencies: ["Tự chủ và tự học", "Giao tiếp và hợp tác", "Giải quyết vấn đề và sáng tạo", "Năng lực số"],
    qualities: ["Nhân ái", "Chăm chỉ", "Trung thực", "Trách nhiệm"],
  },

  // ĐÍCH ĐẾN — điều học sinh nhất định phải nhớ (nguyên văn SGK, hộp "Em cần nhớ")
  coreKnowledge: [
    "Thông tin là những gì đem lại hiểu biết cho con người về thế giới xung quanh và về chính bản thân mình.",
    "Thông tin được ghi lên vật mang tin trở thành dữ liệu. Dữ liệu thể hiện dưới dạng con số, văn bản, hình ảnh và âm thanh.",
    "Vật mang tin là phương tiện dùng để lưu trữ và truyền tải thông tin (giấy viết, đĩa CD, thẻ nhớ,…).",
    "Thông tin đem lại hiểu biết; mọi hoạt động của con người đều cần đến thông tin. Thông tin đúng giúp lựa chọn tốt và đạt hiệu quả.",
  ],
  keywords: ["Thông tin", "Dữ liệu", "Vật mang tin"],

  settings: { basePoints: 100, useTimer: false, defaultTime: 20, sound: false, streakEnabled: true },

  activities: [
    /* ------------------------------------------------------------------ */
    {
      id: "mo-dau",
      time: 300,
      task: "Kể những gì em nhìn thấy, nghe thấy quanh mình; bộ phận nào thu nhận và xử lí?",
      name: "Hoạt động 1: Mở đầu",
      type: "intro",
      goal: "Nhận ra: quanh ta có rất nhiều thứ được giác quan thu nhận và não xử lí.",
      teacherNote: "Cho HS thảo luận nhóm: 'Hằng ngày em nhìn/nghe thấy những gì quanh mình?' rồi chốt bằng câu hỏi.",
      content: {
        heading: "🌤️ Mỗi ngày, em thấy gì quanh mình?",
        blocks: [
          { kind: "text", value: "Trong cuộc sống hằng ngày, em nhìn thấy những con số, dòng chữ, hình ảnh trong sách; em nghe tiếng chim hót, tiếng xe cộ trên đường…" },
          { kind: "text", value: "Tất cả những thứ đó được các giác quan của em thu nhận và bộ não xử lí để trở thành hiểu biết về thế giới xung quanh." },
        ],
      },
      questions: [
        {
          question: "Khi em NHÌN thấy và NGHE thấy mọi thứ quanh mình, bộ phận nào thu nhận và xử lí để em có hiểu biết?",
          type: "multiple-choice",
          options: ["Các giác quan thu nhận và bộ não xử lí", "Chỉ có đôi mắt", "Chỉ có đôi tai", "Chiếc điện thoại"],
          answer: 0,
          explanation: "Đúng rồi! Các giác quan (mắt, tai, mũi, lưỡi, da) thu nhận, còn bộ não xử lí để cho ta hiểu biết.",
          level: "nhan-biet", activity: "mo-dau",
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "hd21",
      time: 300,
      task: "Phân biệt thông tin – dữ liệu – vật mang tin qua ví dụ bạn Minh qua đường.",
      sgkImage: "assets/sgk/sgk-trang5.jpg",
      name: "Hoạt động 2.1: Thông tin và dữ liệu",
      type: "knowledge",
      goal: "Phân biệt thông tin – dữ liệu – vật mang tin qua ví dụ SGK.",
      teacherNote: "Đọc Hoạt động 1 SGK 'Thấy gì? Biết gì?' (Minh qua đường). Chiếu assets/sgk/sgk-trang5.jpg.",
      content: {
        heading: "🚦 Bạn Minh qua đường",
        blocks: [
          { kind: "text", value: "\"Trên đường từ nhà đến trường, Minh phải đi qua nhiều ngã tư đông đúc. Minh chú ý quan sát đèn giao thông. Khi thấy đèn màu xanh theo hướng của mình và các xe chiều đèn đỏ đã dừng lại, Minh biết có thể qua đường an toàn.\"" },
          { kind: "list", value: [
            "👀 Những gì Minh THẤY (đèn xanh, xe dừng) → là DỮ LIỆU.",
            "💡 Điều Minh BIẾT (có thể qua đường an toàn) → là THÔNG TIN.",
            "🚦 Đèn giao thông (nơi Minh nhận dữ liệu) → là VẬT MANG TIN.",
          ] },
        ],
      },
      questions: [
        {
          question: "Bạn An xem dự báo thời tiết trên ti vi và thấy các con số, hình ảnh, âm thanh. Những thứ An THẤY và NGHE đó là gì?",
          type: "multiple-choice",
          options: ["Thông tin", "Dữ liệu", "Vật mang tin", "Không là gì cả"],
          answer: 1,
          explanation: "Các con số, văn bản, hình ảnh, âm thanh mà An thu nhận là DỮ LIỆU. Điều An hiểu ra ('hôm nay trời nắng') mới là thông tin.",
          level: "thong-hieu", activity: "hd21",
        },
        {
          question: 'Trên bảng ở bến đò ghi: "Đảo Cò, xuồng máy, 40 000đ, 35 phút". Tấm bảng đó đóng vai trò gì?',
          type: "multiple-choice",
          options: ["Là thông tin", "Là dữ liệu", "Là vật mang tin", "Là bộ não"],
          answer: 2,
          explanation: "Những số và chữ trên bảng là dữ liệu; còn TẤM BẢNG dùng để ghi và truyền tải chúng chính là VẬT MANG TIN.",
          level: "thong-hieu", activity: "hd21",
        },
      ],
      remember: [
        "Thông tin: những gì đem lại hiểu biết cho con người.",
        "Dữ liệu: con số, văn bản, hình ảnh, âm thanh (ghi trên vật mang tin).",
        "Vật mang tin: phương tiện lưu trữ & truyền tải thông tin (giấy, đĩa CD, thẻ nhớ…).",
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "ghep-khai-niem",
      time: 150,
      task: "Nối mỗi khái niệm ở cột A với ý nghĩa đúng ở cột B.",
      sgkImage: "assets/sgk/sgk-trang6.jpg",
      name: "Ghép đôi: Khái niệm (cột A–B)",
      type: "matching",
      goal: "Nối đúng khái niệm với ý nghĩa (câu hỏi 1 SGK tr.6).",
      teacherNote: "Đáp án SGK: 1–b, 2–a, 3–c.",
      pairs: [
        { left: "Thông tin", right: "Những gì đem lại hiểu biết cho con người về thế giới" },
        { left: "Dữ liệu", right: "Các số, văn bản, hình ảnh, âm thanh,…" },
        { left: "Vật mang tin", right: "Vật chứa dữ liệu" },
      ],
      explanation: "Thông tin ↔ hiểu biết; Dữ liệu ↔ các số/văn bản/hình ảnh/âm thanh; Vật mang tin ↔ vật chứa dữ liệu.",
    },

    /* ------------------------------------------------------------------ */
    {
      id: "phan-loai-tt-dl",
      time: 150,
      task: "Kéo mỗi thẻ vào đúng nhóm: Dữ liệu hay Thông tin?",
      sgkImage: "assets/sgk/sgk-trang6.jpg",
      name: "Phân loại: Thông tin hay Dữ liệu?",
      type: "dragdrop",
      goal: "Phân biệt thông tin và dữ liệu (câu hỏi 2 SGK tr.6).",
      teacherNote: "Chọn thẻ rồi bấm nhóm đúng. Một câu có ý nghĩa → thông tin; số/chữ rời rạc → dữ liệu.",
      groups: ["Dữ liệu", "Thông tin"],
      items: [
        { text: "16:00", group: 0 },
        { text: "0123456789", group: 0 },
        { text: "Hãy gọi cho tôi lúc 16 giờ theo số điện thoại 0123456789!", group: 1 },
      ],
      explanation: '"16:00" và "0123456789" là dữ liệu rời rạc. Khi ghép thành câu có ý nghĩa "Hãy gọi cho tôi lúc 16 giờ…" thì trở thành thông tin.',
    },

    /* ------------------------------------------------------------------ */
    {
      id: "phan-loai-3-nhom",
      time: 180,
      task: "Phân 5 thẻ vào 3 nhóm: Dữ liệu – Thông tin – Vật mang tin.",
      name: "Trò chơi: Thông tin – Dữ liệu – Vật mang tin",
      type: "dragdrop",
      goal: "Củng cố phân biệt 3 khái niệm bằng ví dụ Minh qua đường.",
      groups: ["Dữ liệu", "Thông tin", "Vật mang tin"],
      items: [
        { text: "Đèn xanh bật, các xe đã dừng lại", group: 0 },
        { text: "Minh biết có thể qua đường an toàn", group: 1 },
        { text: "Đèn giao thông", group: 2 },
        { text: '"Hôm nay trời nắng"', group: 1 },
        { text: "Bản tin dự báo thời tiết trên ti vi", group: 2 },
      ],
      explanation: "Dữ liệu là thứ ta thu nhận; thông tin là hiểu biết rút ra; vật mang tin là nơi chứa/truyền dữ liệu.",
    },

    /* ------------------------------------------------------------------ */
    {
      id: "hd22",
      time: 300,
      task: "Nêu ví dụ cho thấy thông tin quan trọng và có thể làm thay đổi hành động của con người.",
      sgkImage: "assets/sgk/sgk-trang6.jpg",
      name: "Hoạt động 2.2: Tầm quan trọng của thông tin",
      type: "knowledge",
      goal: "Hiểu thông tin đem lại hiểu biết và có thể thay đổi hành động của con người.",
      teacherNote: "Đọc mục 2 SGK 'Hỏi để có thông tin'. Chiếu assets/sgk/sgk-trang6.jpg, trang7.jpg.",
      content: {
        heading: "💡 Vì sao thông tin lại quan trọng?",
        blocks: [
          { kind: "text", value: "Bài học lịch sử về Chiến dịch Điện Biên Phủ cho em biết địa điểm, thời gian, diễn biến trận đánh… Nhờ đó em hiểu về truyền thống chống giặc ngoại xâm của dân tộc. → Thông tin đem lại hiểu biết cho con người." },
          { kind: "text", value: "Chuẩn bị sang nhà bạn học nhóm, An nghe mẹ nói \"Trời sắp mưa đấy nhé\". An liền quay vào nhà cầm theo chiếc ô. → Thông tin có khả năng làm thay đổi hành động của con người." },
        ],
      },
      questions: [
        {
          question: 'An nghe mẹ nói "Trời sắp mưa" nên quay vào cầm chiếc ô. Ví dụ này cho thấy điều gì về thông tin?',
          type: "multiple-choice",
          options: [
            "Thông tin không có tác dụng gì",
            "Chỉ người lớn mới cần thông tin",
            "Thông tin chỉ là những con số",
            "Thông tin có khả năng làm thay đổi hành động của con người",
          ],
          answer: 3,
          explanation: "Chính xác! Nhờ thông tin 'trời sắp mưa', An đã hành động khác đi (cầm ô) — thông tin có thể thay đổi hành động của con người.",
          level: "thong-hieu", activity: "hd22",
        },
      ],
      remember: [
        "Thông tin đem lại hiểu biết cho con người; mọi hoạt động đều cần đến thông tin.",
        "Thông tin ĐÚNG giúp con người lựa chọn tốt và hoạt động đạt hiệu quả.",
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "luyen-tap",
      time: 300,
      task: "Xem Bảng 1.1 (lượng mưa) và trả lời các câu hỏi a, b, c, d.",
      sgkImage: "assets/sgk/sgk-trang7.jpg",
      name: "Hoạt động 3: Luyện tập (Bảng 1.1)",
      type: "quiz",
      goal: "Vận dụng phân biệt thông tin – dữ liệu qua bảng lượng mưa.",
      teacherNote: "Chiếu Bảng 1.1 (assets/sgk/sgk-trang7.jpg): lượng mưa TB hàng tháng (mm) của Hà Nội, Huế, Đà Nẵng. Tháng 6: HN 200,7 · Huế 134,2 · ĐN 92,2.",
      content: {
        heading: "📊 Bảng 1.1 — Lượng mưa trung bình hàng tháng (mm)",
        blocks: [
          { kind: "text", value: "Tháng 6 — Hà Nội: 200,7 · Huế: 134,2 · Đà Nẵng: 92,2. (Huế ít mưa nhất vào tháng 3: 34,1 mm.) Chiếu bảng đầy đủ ở assets/sgk/sgk-trang7.jpg." },
        ],
      },
      questions: [
        {
          question: "a) Các con số về lượng mưa trong Bảng 1.1 là thông tin hay dữ liệu?",
          type: "multiple-choice",
          options: ["Dữ liệu", "Thông tin", "Vật mang tin", "Cả ba"],
          answer: 0,
          explanation: "Các con số 'trần trụi' trong bảng là DỮ LIỆU. Chúng chỉ trở thành thông tin khi ta xử lí, so sánh để rút ra ý nghĩa.",
          level: "thong-hieu", activity: "luyen-tap",
        },
        {
          question: 'b) Phát biểu "Tháng 6, Đà Nẵng ít mưa nhất so với Hà Nội và Huế" là thông tin hay dữ liệu?',
          type: "multiple-choice",
          options: ["Dữ liệu", "Thông tin", "Vật mang tin", "Không xác định"],
          answer: 1,
          explanation: "Đây là THÔNG TIN — một hiểu biết rút ra sau khi so sánh các con số (92,2 < 134,2 < 200,7).",
          level: "van-dung", activity: "luyen-tap",
        },
        {
          question: 'c) Trả lời câu hỏi "Huế ít mưa nhất vào tháng nào?" (đáp: tháng 3). Câu trả lời đó là thông tin hay dữ liệu?',
          type: "true-false",
          answer: true,
          explanation: "Đúng — đó là THÔNG TIN, vì là hiểu biết có ý nghĩa rút ra từ dữ liệu trong bảng (Huế tháng 3 chỉ 34,1 mm).",
          level: "van-dung", activity: "luyen-tap",
        },
        {
          question: "d) Biết 'Huế ít mưa nhất vào tháng 3' có giúp em chọn thời gian, địa điểm đi du lịch không?",
          type: "multiple-choice",
          options: [
            "Không, con số không liên quan gì",
            "Chỉ giúp làm bài tập, không dùng thực tế",
            "Có — biết tháng ít mưa giúp chọn thời điểm đi du lịch phù hợp",
            "Không thể biết được",
          ],
          answer: 2,
          explanation: "Có! Thông tin đúng (tháng ít mưa) giúp em đưa ra lựa chọn tốt hơn — đây chính là tầm quan trọng của thông tin.",
          level: "van-dung-cao", activity: "luyen-tap",
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "van-dung",
      time: 300,
      task: "Nêu ví dụ thông tin giúp em chọn trang phục, đi đường an toàn; kể một vật mang tin cho học tập.",
      name: "Hoạt động 4: Vận dụng",
      type: "scenario",
      goal: "Liên hệ thông tin & vật mang tin với đời sống của em.",
      teacherNote: "Thảo luận nhóm; có thể giao câu 2 về nhà. Đáp án gợi ý trong TEACHER_GUIDE.",
      content: {
        situation: "Thông tin ở quanh ta mỗi ngày và giúp ta quyết định: mặc gì cho hợp thời tiết, đi đường sao cho an toàn, học bằng những phương tiện nào…",
        question: "Em hãy nêu ví dụ cho thấy thông tin giúp em: (a) chọn trang phục phù hợp; (b) đảm bảo an toàn khi tham gia giao thông. Và (c) kể một vật mang tin giúp ích cho việc học.",
        hints: [
          "Trang phục: xem dự báo thời tiết nắng/mưa/lạnh rồi chọn đồ phù hợp.",
          "Giao thông: quan sát đèn tín hiệu, biển báo để đi an toàn.",
          "Vật mang tin học tập: SGK, sách bài tập, từ điển, USB, đĩa CD/DVD…",
        ],
        modelAnswer: "a) Biết trời lạnh → mặc áo ấm; trời nắng → mang mũ, ô. b) Thấy đèn đỏ thì dừng, đèn xanh mới đi; tuân theo biển báo → an toàn. c) Vật mang tin giúp học: SGK, sách bài tập, từ điển bách khoa, đĩa CD/DVD, USB…",
      },
      questions: [
        {
          question: "Đâu là một VẬT MANG TIN giúp ích cho việc học tập của em?",
          type: "multiple-choice",
          options: ["Cảm giác buồn ngủ", "Cơn mưa ngoài trời", "Tiếng ồn trong lớp", "Quyển sách giáo khoa"],
          answer: 3,
          explanation: "Sách giáo khoa là vật mang tin: nó lưu trữ và truyền tải kiến thức (thông tin) cho em.",
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
            question: "Cùng một dữ liệu (bản tin thời tiết), vì sao người lớn hiểu được 'hôm nay trời nắng' còn em bé 5 tuổi thì không?",
            type: "multiple-choice",
            options: [
              "Vì thông tin mà dữ liệu đem lại phụ thuộc vào người tiếp nhận",
              "Vì em bé không có mắt",
              "Vì bản tin bị sai",
              "Vì ti vi hỏng",
            ],
            answer: 0,
            explanation: "Cùng dữ liệu nhưng em bé chưa đọc được nên không rút ra thông tin. Sự hiểu biết mà thông tin đem lại phụ thuộc vào người tiếp nhận.",
            level: "van-dung-cao", activity: "tong-ket",
          },
        ],
      },
    },
  ],
};
if (typeof module !== "undefined" && module.exports) module.exports = LESSON;
if (typeof window !== "undefined") window.LESSON = LESSON;
