/* ============================================================================
 * DỮ LIỆU BÀI HỌC MẪU (DEMO) cho scaffold — KHÔNG phải nội dung SGK thật.
 * Mục đích: để mở index.html là chạy được ngay, minh họa mọi loại module.
 * Khi tạo bài thật: THAY TOÀN BỘ nội dung dưới đây bằng dữ liệu trích từ
 * SGK + giáo án (xem templates/question-bank.js). Đây chỉ là ví dụ kỹ thuật.
 * ==========================================================================*/
const LESSON = {
  meta: { subject: "Tin học", grade: "6", book: "Kết nối tri thức với cuộc sống", title: "(DEMO) An toàn khi dùng Internet", unit: "Chủ đề mẫu", pages: "—", durationMinutes: 45 },
  objectives: {
    knowledge: ["Nhận biết một số nguy cơ khi dùng Internet", "Biết cách bảo vệ thông tin cá nhân"],
    competencies: ["Sử dụng và quản lí công cụ số an toàn"],
    qualities: ["Trách nhiệm khi tham gia môi trường số"],
  },
  coreKnowledge: [
    "Không chia sẻ mật khẩu và thông tin cá nhân cho người lạ.",
    "Cẩn thận với đường liên kết và tệp tin không rõ nguồn gốc.",
    "Ứng xử văn minh, tôn trọng người khác khi trên mạng.",
  ],
  keywords: ["Mật khẩu", "Thông tin cá nhân", "Ứng xử văn minh"],
  settings: { basePoints: 100, useTimer: false, defaultTime: 20, sound: false, streakEnabled: true },

  activities: [
    {
      id: "khoi-dong", name: "Khởi động", type: "intro",
      goal: "Tạo hứng thú, khơi kiến thức nền.",
      content: { heading: "Em dùng Internet để làm gì?", prompt: "Hãy kể 3 việc em thường làm trên Internet. Theo em, việc nào có thể gặp rủi ro?" },
      questions: [
        { question: "Đâu là thông tin KHÔNG nên chia sẻ công khai trên mạng?", type: "multiple-choice",
          options: ["Món ăn em thích", "Bộ phim vừa xem", "Mật khẩu tài khoản", "Màu sắc yêu thích"],
          answer: 2, explanation: "Chính xác! Mật khẩu là thông tin bí mật, lộ ra sẽ mất an toàn tài khoản.",
          level: "nhan-biet", activity: "khoi-dong" },
      ],
    },
    {
      id: "hd1", name: "Hoạt động 1: Nhận diện nguy cơ", type: "knowledge",
      goal: "Khám phá các nguy cơ thường gặp và rút ra cách phòng tránh.",
      content: { heading: "Những nguy cơ thường gặp", blocks: [
        { kind: "text", value: "Khi dùng Internet, em có thể gặp: lừa đảo, virus, tin giả, bị làm phiền." },
        { kind: "list", value: ["Đường liên kết lạ có thể chứa virus.", "Người lạ có thể giả danh để lấy thông tin.", "Tin giả lan truyền rất nhanh."] },
      ] },
      remember: ["Cẩn thận với liên kết và tệp lạ.", "Không tin ngay mọi thông tin trên mạng."],
    },
    {
      id: "luyen-tap", name: "Luyện tập", type: "quiz",
      goal: "Củng cố kiến thức an toàn.",
      questions: [
        { question: "Một người lạ nhắn tin xin số điện thoại và địa chỉ nhà của em. Em nên làm gì?", type: "multiple-choice",
          options: ["Gửi ngay cho họ", "Gửi địa chỉ nhưng giấu số điện thoại", "Hỏi xin quà trước", "Không cung cấp và báo người lớn"],
          answer: 3, explanation: "Chính xác! Không cung cấp thông tin cá nhân cho người lạ và nên báo cho người lớn tin cậy.",
          level: "van-dung", activity: "luyen-tap" },
        { question: "Chọn TẤT CẢ hành vi ứng xử văn minh trên mạng.", type: "multiple-select",
          options: ["Tôn trọng ý kiến khác", "Bình luận xúc phạm người khác", "Xin phép khi dùng ảnh của bạn", "Chia sẻ tin chưa kiểm chứng"],
          answer: [0, 2], explanation: "Tôn trọng và xin phép là văn minh; xúc phạm và chia sẻ tin sai thì không.",
          level: "thong-hieu", activity: "luyen-tap" },
        { question: "Nhận được email báo 'trúng thưởng, bấm vào link để nhận'. Đây thường là dấu hiệu lừa đảo.", type: "true-false",
          answer: true, explanation: "Đúng. Các email trúng thưởng bất ngờ, giục bấm link thường là lừa đảo.",
          level: "thong-hieu", activity: "luyen-tap" },
      ],
    },
    {
      id: "ghep-doi", name: "Trò chơi: Ghép đôi", type: "matching",
      goal: "Nối tình huống với cách xử lí.",
      pairs: [
        { left: "Quên đăng xuất ở máy công cộng", right: "Đăng xuất và đổi mật khẩu" },
        { left: "Thấy tin giật gân chưa rõ nguồn", right: "Kiểm chứng trước khi tin/chia sẻ" },
        { left: "Bạn bị nói xấu trên mạng", right: "Không hùa theo, báo người lớn" },
      ],
      explanation: "Mỗi nguy cơ có cách xử lí phù hợp: bảo vệ tài khoản, kiểm chứng thông tin, ứng xử tử tế.",
    },
    {
      id: "sap-xep", name: "Sắp xếp: Tạo mật khẩu mạnh", type: "ordering",
      goal: "Nắm các bước tạo mật khẩu an toàn.",
      steps: ["Dùng đủ dài (8 kí tự trở lên)", "Kết hợp chữ hoa, chữ thường, số, kí hiệu", "Không dùng thông tin dễ đoán (ngày sinh, tên)", "Không dùng lại cho nhiều tài khoản"],
      explanation: "Mật khẩu mạnh phải đủ dài, đa dạng kí tự, khó đoán và không dùng lại.",
    },
    {
      id: "flashcard", name: "Thẻ ghi nhớ", type: "flashcard",
      goal: "Ôn thuật ngữ.",
      cards: [
        { front: "Mật khẩu mạnh là gì?", back: "Dài, kết hợp nhiều loại kí tự, khó đoán, không dùng lại." },
        { front: "Tin giả (fake news)", back: "Thông tin sai sự thật, cần kiểm chứng trước khi tin/chia sẻ." },
      ],
    },
    {
      id: "van-dung", name: "Vận dụng: Tình huống", type: "scenario",
      goal: "Áp dụng vào thực tế.",
      content: {
        situation: "Bạn của em gửi một liên kết lạ kèm lời nhắn: 'Vào đây nhận thẻ game miễn phí nhé!'.",
        question: "Theo em nên làm gì? Vì sao?",
        hints: ["Liên kết lạ có an toàn không?", "Nên hỏi lại bạn hoặc người lớn."],
        modelAnswer: "Không vội bấm vào liên kết lạ; hỏi lại bạn xem có đúng bạn gửi không, hoặc hỏi người lớn. Nhiều liên kết 'miễn phí' là bẫy lừa đảo/virus.",
      },
      questions: [
        { question: "Cách xử lí an toàn nhất với liên kết lạ là?", type: "multiple-choice",
          options: ["Kiểm tra/hỏi lại trước khi bấm", "Bấm ngay cho nhanh", "Gửi tiếp cho bạn khác", "Tắt máy tính"],
          answer: 0, explanation: "Chính xác! Luôn kiểm tra nguồn gốc trước khi bấm vào liên kết lạ.",
          level: "van-dung-cao", activity: "van-dung" },
      ],
    },
    {
      id: "tong-ket", name: "Tổng kết", type: "summary",
      goal: "Chốt kiến thức trọng tâm.",
      content: {
        learned: null,
        challenge: [
          { question: "Điều quan trọng nhất để giữ an toàn tài khoản là?", type: "multiple-choice",
            options: ["Đặt ảnh đại diện đẹp", "Bảo mật mật khẩu, không chia sẻ", "Có nhiều bạn bè", "Đăng nhiều bài"],
            answer: 1, explanation: "Bảo mật mật khẩu là yếu tố then chốt để giữ an toàn tài khoản.",
            level: "van-dung", activity: "tong-ket" },
        ],
      },
    },
  ],
};
if (typeof module !== "undefined" && module.exports) module.exports = LESSON;
if (typeof window !== "undefined") window.LESSON = LESSON;
