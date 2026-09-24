/* ============================================================================
 * QUESTION BANK / LESSON DATA — khuôn mẫu
 * ----------------------------------------------------------------------------
 * Đây là "nguồn sự thật" của bài học, TÁCH khỏi code giao diện.
 * Sao chép file này thành  data/lesson.js  của app rồi điền nội dung thật từ
 * SGK + giáo án. Giáo viên có thể sửa văn bản trong dấu nháy mà không cần biết
 * lập trình.
 *
 * NGUYÊN TẮC:
 *  - Bám SGK + giáo án. Không bịa. Thiếu dữ kiện -> ghi "[CẦN GIÁO VIÊN KIỂM TRA]".
 *  - Sau MỖI câu phải có `explanation` (feedback = học tập).
 *  - Đủ 4 mức: nhan-biet | thong-hieu | van-dung | van-dung-cao.
 *  - Đáp án đúng KHÔNG dồn về một vị trí (chạy scripts/validate-lesson.js để kiểm).
 *  - `activity` của mỗi câu phải khớp `id` của một hoạt động trong `activities`.
 *
 * TRƯỜNG NÂNG CAO (engine v2 — nên dùng):
 *  - activity.task      : câu Nhiệm vụ rõ ràng, hiện khung "🎯 Nhiệm vụ" (BẮT BUỘC nên có).
 *  - activity.time      : số giây cho đồng hồ đếm ngược của hoạt động.
 *  - activity.sgkImage  : "assets/sgk/....jpg" -> nút "🖼️ Xem ảnh SGK".
 *  - content.revealLabel: đổi nhãn nút hiện nội dung kiến thức (mặc định "🔍 Hiện nội dung kiến thức").
 *  - content.blocks[]   : { kind: "text"|"list"|"image"|"svg"|"html"|"ext", value, caption }.
 *                         kind "svg"/"html" để chèn sơ đồ tự vẽ (đẹp trên máy chiếu).
 *  - question.hint      : gợi ý ẩn, hiện khi bấm nút "💡 Gợi ý".
 *  - question.sgkImage  : nút "Xem ảnh SGK" riêng cho câu hỏi.
 *  Gợi ý/đáp án/kiến thức/"Em cần nhớ" MẶC ĐỊNH ẩn, giáo viên bấm mới hiện.
 * ==========================================================================*/

const LESSON = {
  meta: {
    subject: "Tin học",
    grade: "6",
    book: "Kết nối tri thức với cuộc sống",
    title: "TÊN BÀI HỌC",
    unit: "Chủ đề / Chương ...",
    pages: "tr. ..–..",
    durationMinutes: 45,
  },

  objectives: {
    knowledge: ["..."],
    competencies: ["..."],
    qualities: ["..."],
  },

  // 3–7 điều học sinh NHẤT ĐỊNH phải nhớ. Đây là đích đến của cả tiết.
  coreKnowledge: [
    "Ý cốt lõi 1 ...",
    "Ý cốt lõi 2 ...",
    "Ý cốt lõi 3 ...",
  ],

  // 3 từ khóa hiển thị ở màn Tổng kết
  keywords: ["...", "...", "..."],

  // Cấu hình trò chơi (có thể chỉnh)
  settings: {
    basePoints: 100,
    useTimer: false,       // GV có thể bật/tắt trong Chế độ giáo viên
    defaultTime: 20,       // giây/câu khi bật giờ
    sound: false,          // mặc định tắt cho lớp học
    streakEnabled: true,
  },

  /* --------------------------------------------------------------------------
   * CÁC HOẠT ĐỘNG — GIỮ ĐÚNG TÊN & THỨ TỰ CỦA GIÁO ÁN.
   * `type` quyết định module nào render (khớp engine trong app-starter):
   *   intro | explore | knowledge | quiz | matching | dragdrop | ordering |
   *   fillblank | flashcard | memory | wheel | wordpuzzle | imagequiz |
   *   scenario | remember | summary
   * ------------------------------------------------------------------------*/
  activities: [
    {
      id: "khoi-dong",
      name: "Khởi động",
      type: "intro",
      goal: "Tạo hứng thú, khơi kiến thức nền, đặt vấn đề.",
      teacherNote: "Cho cả lớp suy nghĩ ~30s rồi gọi HS trả lời trước khi lộ đáp án.",
      content: {
        heading: "...",
        prompt: "Câu hỏi/tình huống mở đầu ...",
        image: null,           // "assets/img/hinh1.png" nếu dùng hình SGK
      },
      // Hoạt động có câu hỏi thì đặt trong `questions` (xem mẫu bên dưới).
      questions: [],
    },

    {
      id: "hd1",
      name: "Hoạt động 1: ...",
      type: "knowledge",       // trình bày + khám phá + chốt
      goal: "...",
      content: {
        heading: "...",
        blocks: [
          { kind: "text", value: "Diễn giải ngắn, ít chữ ..." },
          { kind: "image", value: "assets/img/so-do.png", caption: "..." },
          { kind: "list", value: ["ý 1", "ý 2", "ý 3"] },
        ],
      },
      remember: ["Ý phải nhớ sau HĐ1 ..."],   // -> render màn "Em cần nhớ"
    },

    {
      id: "luyen-tap",
      name: "Luyện tập",
      type: "quiz",            // quiz kiểu Kahoot/Quizizz
      goal: "Củng cố, kiểm tra hiểu.",
      questions: [
        {
          question: "Bạn An cần gửi cùng một thông báo cho 40 phụ huynh. Cách nào phù hợp nhất?",
          type: "multiple-choice",
          options: ["Gọi điện từng người", "Gửi email nhóm", "Viết tay 40 tờ", "Không gửi"],
          answer: 1,           // chỉ số đáp án đúng (0-based)
          explanation: "Chính xác! Email nhóm gửi một lần tới nhiều người, nhanh và tiết kiệm.",
          level: "van-dung",
          activity: "luyen-tap",
          time: 20,            // tùy chọn
        },
        {
          question: "Chọn TẤT CẢ phát biểu đúng về ...",
          type: "multiple-select",
          options: ["A ...", "B ...", "C ...", "D ..."],
          answer: [0, 2],
          explanation: "A và C đúng vì ... ; B sai vì ... ; D sai vì ...",
          level: "thong-hieu",
          activity: "luyen-tap",
        },
        {
          question: "Phát biểu: '...' là Đúng hay Sai?",
          type: "true-false",
          answer: false,
          explanation: "Sai. Hãy nhớ rằng ...",
          level: "nhan-biet",
          activity: "luyen-tap",
        },
      ],
    },

    {
      id: "ghep-doi",
      name: "Trò chơi: Ghép đôi",
      type: "matching",
      goal: "Nối khái niệm với định nghĩa/ví dụ.",
      pairs: [
        { left: "Khái niệm A", right: "Định nghĩa A" },
        { left: "Khái niệm B", right: "Định nghĩa B" },
        { left: "Khái niệm C", right: "Định nghĩa C" },
      ],
      explanation: "Chốt: A ứng với ..., B ứng với ..., C ứng với ...",
    },

    {
      id: "phan-loai",
      name: "Phân loại (Kéo thả)",
      type: "dragdrop",
      goal: "Phân loại đối tượng vào đúng nhóm.",
      groups: ["Nhóm 1", "Nhóm 2"],
      items: [
        { text: "Mục a", group: 0 },
        { text: "Mục b", group: 1 },
        { text: "Mục c", group: 0 },
      ],
      explanation: "Nhóm 1 gồm ... vì ...; Nhóm 2 gồm ... vì ...",
    },

    {
      id: "sap-xep",
      name: "Sắp xếp thứ tự",
      type: "ordering",
      goal: "Nắm đúng thứ tự các bước của quy trình.",
      // Nhập ĐÚNG thứ tự; app sẽ xáo trộn khi hiển thị.
      steps: ["Bước 1 ...", "Bước 2 ...", "Bước 3 ...", "Bước 4 ..."],
      explanation: "Thứ tự đúng vì ...",
    },

    {
      id: "dien-tu",
      name: "Điền từ",
      type: "fillblank",
      goal: "Nhớ từ khóa.",
      // Dùng {{}} đánh dấu chỗ trống, khớp thứ tự với `answers`.
      text: "Thiết bị dùng để nhập dữ liệu gọi là {{}}; để hiển thị gọi là {{}}.",
      answers: [["thiết bị vào", "thiết bị nhập"], ["thiết bị ra"]], // mỗi ô: các cách viết chấp nhận
      explanation: "Thiết bị vào để nhập, thiết bị ra để hiển thị/đưa thông tin ra.",
    },

    {
      id: "flashcard",
      name: "Thẻ ghi nhớ",
      type: "flashcard",
      goal: "Ôn tập thuật ngữ.",
      cards: [
        { front: "Thuật ngữ ...", back: "Nghĩa ngắn gọn ..." },
        { front: "Thuật ngữ ...", back: "Nghĩa ngắn gọn ..." },
      ],
    },

    {
      id: "tinh-huong",
      name: "Vận dụng: Tình huống",
      type: "scenario",
      goal: "Áp dụng kiến thức vào thực tế, thảo luận.",
      scored: false,   // có thể để GV dẫn dắt, không chấm điểm
      content: {
        situation: "Mô tả tình huống thực tế gần gũi với HS ...",
        question: "Theo em nên ...? Vì sao?",
        hints: ["Gợi ý 1 ...", "Gợi ý 2 ..."],
        modelAnswer: "Hướng trả lời tham khảo (GV chốt): ...",
      },
    },

    {
      id: "tong-ket",
      name: "Tổng kết",
      type: "summary",
      goal: "Chốt Core Knowledge, tự đánh giá.",
      content: {
        learned: ["Hôm nay em đã học ...", "..."],   // nếu để trống, app dùng coreKnowledge
        challenge: [
          {
            question: "Câu thử thách tổng hợp ...",
            type: "multiple-choice",
            options: ["...", "...", "...", "..."],
            answer: 2,
            explanation: "... vì ...",
            level: "van-dung-cao",
            activity: "tong-ket",
          },
        ],
      },
    },
  ],
};

// Cho phép dùng cả khi mở trực tiếp bằng <script> lẫn khi import module.
if (typeof module !== "undefined" && module.exports) module.exports = LESSON;
if (typeof window !== "undefined") window.LESSON = LESSON;
