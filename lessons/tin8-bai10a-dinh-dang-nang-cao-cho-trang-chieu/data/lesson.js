/* ============================================================================
 * BÀI 10a — ĐỊNH DẠNG NÂNG CAO CHO TRANG CHIẾU  (Tin học 8 — Kết nối tri thức với cuộc sống)
 * Chủ đề 4a: Soạn thảo văn bản và trình chiếu nâng cao.
 * Bám sát SGK trang 46–50 + Kế hoạch bài dạy (2 tiết) của giáo viên.
 * Chỉ sửa file này để đổi nội dung. Engine app.js không cần sửa.
 * GV chọn: sửa 2 đáp án trò chơi giáo án (Câu 3 → D, Câu 5 → B); HĐ2.2 theo SGK + kết luận giáo án (nên đánh số, thêm thông tin);
 * mô phỏng hộp thoại Header and Footer (`hfsim`) và phối màu trang chiếu (`colorsim`).
 * ==========================================================================*/

// Trang chiếu mẫu (HTML, tỉ lệ 16:9) cho trò chơi “Thám tử trang chiếu”
const SL = (o) => `<div style="margin:6px auto;max-width:${o.w || 520}px;aspect-ratio:16/9;background:${o.bg || "#fff"};border:1px solid #94a3b8;box-shadow:0 3px 12px rgba(0,0,0,.18);padding:3% 5%;font-family:${o.font || "Arial,sans-serif"};overflow:hidden;text-align:left">`
  + `<div style="text-align:center;font-weight:800;font-size:${o.ts || 1.6}em;color:${o.tc || "#16a34a"};margin-bottom:.3em;line-height:1.15">${o.title}</div>`
  + (o.para ? `<div style="font-size:${o.bs || 0.95}em;color:${o.bc || "#111"};line-height:1.35">${o.para}</div>`
    : `<ul style="margin:0;padding-left:1.2em;line-height:1.35">${o.bullets.map((b, i) => `<li style="font-size:${o.bs || 1}em;color:${[].concat(o.bc || "#111")[i % [].concat(o.bc || "#111").length]};font-family:${[].concat(o.bf || "inherit")[i % [].concat(o.bf || "inherit").length]}">${b}</li>`).join("")}</ul>`)
  + `</div>`;
const MT = ["Truyền cảm hứng, chia sẻ niềm đam mê Tin học.", "Tạo môi trường giao lưu, hợp tác.", "Củng cố, mở rộng kiến thức Tin học.", "Xây dựng ý thức tự giác, nâng cao khả năng tự học; rèn luyện, nâng cao kĩ năng sống.", "Kích thích tính chủ động, sáng tạo."];
const IMG = (src, cap, w) => `<figure style="margin:0 auto;max-width:${w || 640}px"><img src="${src}" alt="${cap}" style="width:100%;border-radius:8px"><figcaption class="caption">${cap}</figcaption></figure>`;

const LESSON = {
  meta: {
    subject: "Tin học", grade: "8", book: "Kết nối tri thức với cuộc sống",
    title: "Bài 10a: Định dạng nâng cao cho trang chiếu", unit: "Chủ đề 4a — Soạn thảo văn bản và trình chiếu nâng cao",
    pages: "46–50", durationMinutes: 90,
  },
  objectives: {
    knowledge: [
      "Chọn đặt được màu sắc, cỡ chữ hài hoà và hợp lí với nội dung.",
      "Thực hiện được thao tác đánh số trang, thêm đầu trang và chân trang cho bài trình chiếu.",
    ],
    competencies: [
      "Tự chủ và tự học; giao tiếp và hợp tác (thảo luận nhóm, thực hành 2 HS/máy, chấm chéo); giải quyết vấn đề và sáng tạo (thiết kế trang chiếu).",
      "Năng lực số 3.1.TC2a: lựa chọn màu sắc, phông chữ, cỡ chữ phù hợp với nội dung từng trang chiếu; dễ đọc, hài hoà.",
      "Năng lực số 3.2.TC2a: căn chỉnh bố cục, sắp xếp nội dung theo mức phân cấp; thêm số trang, đầu trang, chân trang khi cần.",
      "Năng lực AI 8.C3.1: AI có thể hỗ trợ thiết kế bố cục, màu sắc, hình ảnh trình chiếu nhưng người dùng cần tự lựa chọn, kiểm tra.",
    ],
    qualities: ["Chăm chỉ, trách nhiệm; trung thực, tôn trọng bản quyền hình ảnh; có ý thức trình bày khoa học, hài hoà."],
  },
  coreKnowledge: [
    "Văn bản trên trang chiếu ngắn gọn, chỉ nêu ý chính, không nêu chi tiết; không cần viết đầy đủ các thành phần của câu.",
    "Màu nóng (đỏ, da cam, vàng) — ấm áp, phấn chấn; màu lạnh (xanh, tím) — bình tĩnh, lắng dịu; màu trung tính (trắng, đen, be) — lịch sự, nhẹ nhàng.",
    "Màu chủ đạo hài hoà với nội dung; kết hợp các màu cùng nhóm; không dùng quá nhiều màu trên một trang chiếu; màu chữ có độ tương phản cao với màu nền.",
    "Văn bản trên trang chiếu cần được định dạng sao cho màu sắc, cỡ chữ hài hoà, hợp lí với nội dung.",
    "Có thể đánh số trang, thêm đầu trang, chân trang vào các trang chiếu: Insert › nhóm Text › Header & Footer (hoặc Slide Number) → Date and time, Slide number, Footer, Don't show on title slide → Apply to All.",
  ],
  keywords: ["Ngắn gọn, súc tích", "Màu nóng – lạnh – trung tính", "Độ tương phản", "Header & Footer", "Apply to All"],
  settings: { basePoints: 100, useTimer: false, defaultTime: 60, sound: true, streakEnabled: true },

  activities: [
    /* =========================== TIẾT 1 =========================== */
    /* ===================== HĐ1: KHỞI ĐỘNG (5 phút) ===================== */
    {
      id: "mo-dau", name: "Khởi động — Bài trình chiếu cho lễ ra mắt CLB 🎤", type: "knowledge",
      goal: "Nhận ra tầm quan trọng của văn bản, màu sắc, cỡ chữ, bố cục trong bài trình chiếu.",
      time: 300,
      task: "Nhóm thảo luận nhanh: Bạn An được giao nhiệm vụ tạo bài trình chiếu cho lễ ra mắt CLB Tin học. Với mục tiêu ngắn gọn, ấn tượng, sáng tạo,… theo em bạn An cần chú ý đến những điều gì khi tạo bài trình chiếu?",
      sgkImage: "assets/sgk/mo-dau.jpg",
      content: {
        revealLabel: "📌 Giáo viên chốt — những lỗi thường gặp",
        blocks: [
          { kind: "list", value: ["Sử dụng cỡ chữ quá nhỏ.", "Quá nhiều nội dung văn bản trên một trang chiếu.", "Màu nền và màu chữ khó phân biệt.", "Quá nhiều hình ảnh trên một trang chiếu."] },
        ],
      },
      questions: [
        { question: "Bạn An cần chú ý những điều gì khi tạo bài trình chiếu? (Chọn tất cả ý đúng)", type: "multiple-select",
          options: ["Văn bản ngắn gọn, chỉ nêu ý chính", "Màu chữ tương phản rõ với màu nền", "Cỡ chữ đủ lớn, dễ đọc", "Viết thật nhiều chữ cho đầy đủ", "Dùng thật nhiều màu và nhiều phông chữ"],
          answer: [0, 1, 2], explanation: "Trang chiếu cần ngắn gọn, dễ đọc: văn bản súc tích, chữ đủ lớn, màu chữ tương phản với nền, không lạm dụng màu và phông chữ.", level: "thong-hieu", activity: "mo-dau" },
      ],
    },

    /* ===================== HĐ2.1: VĂN BẢN VÀ MÀU SẮC TRÊN TRANG CHIẾU (15 phút) ===================== */
    {
      id: "hd1-van-ban", name: "1. Hoạt động 1: Đặc điểm của văn bản trên trang chiếu 📝", type: "knowledge",
      goal: "So sánh văn bản trong tệp văn bản với văn bản trên trang chiếu.",
      time: 360,
      task: "Nhóm quan sát Hình 10a.1 (tài liệu mô tả dự án), Hình 10a.2 (nội dung trang chiếu) và trả lời: 1) Văn bản ở hình nào chi tiết, đầy đủ hơn? Hình nào ngắn gọn hơn? 2) Văn bản trên trang chiếu có cần viết đầy đủ các thành phần của câu không?",
      sgkImage: "assets/sgk/hoat-dong-1.jpg",
      html: IMG("assets/sgk/hinh-10a-1-2.jpg", "Hình 10a.1. Văn bản trong tệp văn bản · Hình 10a.2. Văn bản trên trang chiếu", 760),
      content: {
        revealLabel: "📖 Văn bản trên trang chiếu (SGK tr.46)",
        blocks: [
          { kind: "text", value: "Khác với văn bản trong tài liệu thông thường, văn bản trên trang chiếu có đặc điểm là ngắn gọn, chỉ nêu ý chính, không nêu chi tiết,… Văn bản trên trang chiếu góp phần quan trọng vào việc tạo ấn tượng, thu hút sự quan tâm, giúp người nghe nhanh chóng tiếp nhận được nội dung tóm tắt của trang chiếu,…" },
        ],
      },
      questions: [
        { question: "1) Văn bản ở hình nào chi tiết, đầy đủ hơn? Hình nào ngắn gọn hơn?", type: "multiple-choice",
          options: ["Hình 10a.2 chi tiết hơn, Hình 10a.1 ngắn gọn hơn", "Hai hình như nhau", "Hình 10a.1 chi tiết, đầy đủ hơn; Hình 10a.2 ngắn gọn hơn", "Không so sánh được"],
          answer: 2, explanation: "Hình 10a.1 (tệp văn bản) viết câu đầy đủ, chi tiết; Hình 10a.2 (trang chiếu) chỉ nêu ý chính.", level: "nhan-biet", activity: "hd1-van-ban" },
        { question: "2) Văn bản trên trang chiếu có cần viết đầy đủ các thành phần của câu không?", type: "multiple-choice",
          options: ["Không cần — chỉ cần nêu ý chính, ngắn gọn", "Có, phải viết đủ chủ ngữ, vị ngữ", "Có, càng dài càng tốt", "Chỉ cần viết tiêu đề, không cần nội dung"],
          answer: 0, explanation: "Văn bản trên trang chiếu ngắn gọn, chỉ nêu ý chính, không cần viết đầy đủ các thành phần của câu.", level: "thong-hieu", activity: "hd1-van-ban" },
      ],
    },
    {
      id: "viet-gon", name: "Thử thách: Viết gọn cho trang chiếu ✂️", type: "quiz",
      goal: "Rút gọn câu văn trong tài liệu thành ý chính để đưa lên trang chiếu.",
      time: 300,
      task: "Mỗi câu dưới đây lấy từ tài liệu (Hình 10a.1). Chọn cách viết phù hợp nhất để đưa lên trang chiếu.",
      questions: [
        { question: "“CLB là nơi truyền cảm hứng và chia sẻ niềm đam mê Tin học giữa các thành viên.”", type: "multiple-choice",
          options: ["CLB là nơi truyền cảm hứng và chia sẻ niềm đam mê Tin học giữa các thành viên của CLB.", "Truyền cảm hứng, chia sẻ niềm đam mê Tin học.", "Tin học.", "Các thành viên CLB sẽ được truyền cảm hứng và được chia sẻ."],
          answer: 1, explanation: "Giữ ý chính, bỏ phần không cần thiết: “Truyền cảm hứng, chia sẻ niềm đam mê Tin học.” (Hình 10a.2).", level: "thong-hieu", activity: "viet-gon" },
        { question: "“CLB phải tạo được môi trường giao lưu, hợp tác giữa các thành viên.”", type: "multiple-choice",
          options: ["Giao lưu.", "CLB phải tạo được môi trường để các thành viên giao lưu và hợp tác với nhau.", "Môi trường.", "Tạo môi trường giao lưu, hợp tác."],
          answer: 3, explanation: "Ngắn gọn nhưng vẫn đủ ý: “Tạo môi trường giao lưu, hợp tác.”", level: "thong-hieu", activity: "viet-gon" },
        { question: "“CLB cần xây dựng và thu thập tài liệu về các nội dung tin học để giúp các thành viên củng cố, mở rộng kiến thức, từng bước hội nhập với xã hội số.”", type: "multiple-choice",
          options: ["Củng cố, mở rộng kiến thức Tin học.", "Tài liệu.", "CLB cần thu thập tài liệu để giúp các thành viên củng cố, mở rộng kiến thức và hội nhập xã hội số.", "Xã hội số."],
          answer: 0, explanation: "Chỉ nêu ý chính: “Củng cố, mở rộng kiến thức Tin học.” Quá ngắn (“Tài liệu.”) thì mất ý; quá dài thì như tài liệu.", level: "van-dung", activity: "viet-gon" },
        { question: "“CLB tổ chức các dự án, các sự kiện mới lạ để kích thích tính chủ động, sáng tạo của các thành viên.”", type: "multiple-choice",
          options: ["Các dự án, các sự kiện mới lạ của CLB dành cho các thành viên.", "Sáng tạo.", "Kích thích tính chủ động, sáng tạo.", "CLB tổ chức dự án."],
          answer: 2, explanation: "Mục tiêu chính là “Kích thích tính chủ động, sáng tạo.” (Hình 10a.2).", level: "van-dung", activity: "viet-gon" },
      ],
    },
    {
      id: "hd1-mau-sac", name: "Màu sắc trên trang chiếu 🎨", type: "knowledge",
      goal: "Nêu được những điểm cần chú ý khi chọn đặt màu sắc trên trang chiếu.",
      time: 480,
      task: "Nhiệm vụ 2 (phiếu học tập số 1): Ngoài những kiến thức cơ bản về màu sắc, cách phối màu,… em cần chú ý những điểm nào khi chọn đặt màu sắc trên trang chiếu?",
      sgkImage: "assets/sgk/sgk-trang47.jpg",
      content: {
        revealLabel: "📖 Chọn đặt màu sắc (SGK tr.46–47)",
        blocks: [
          { kind: "text", value: "Màu sắc đóng vai trò quan trọng trong việc thiết kế một bài trình chiếu. Một bài trình chiếu đẹp, chuyên nghiệp là sự phối hợp hoàn hảo của nội dung, bố cục và màu sắc. Do đó, màu sắc phù hợp sẽ làm cho bài trình chiếu trở nên sinh động, bắt mắt, tác động trực tiếp đến cảm tình của người xem. Trong chương trình Tin học lớp 7 em đã được học cách định dạng phông chữ, cỡ chữ, kiểu chữ,… Để chọn đặt được màu sắc cho bài trình chiếu, em cần chú ý một số điểm sau:" },
          { kind: "list", value: [
            "Các màu nóng như đỏ, da cam, vàng,… mang lại cảm giác ấm áp, giúp người xem phấn chấn, hoạt bát, năng nổ.",
            "Các màu lạnh như xanh, tím,… mang lại cảm giác lạnh, giúp người xem bình tĩnh, hiền hoà, lắng dịu.",
            "Các màu trung tính như trắng, đen, be,… mang lại cảm giác lịch sự, nhẹ nhàng.",
            "Màu sắc chủ đạo nên đặt sao cho hài hoà với nội dung. Ví dụ, bài trình chiếu về chủ đề giải trí, lễ hội,… nên dùng gam màu nóng; chủ đề giáo dục, học tập nên dùng gam màu trung tính; chủ đề về nghệ thuật, hay các bài trình chiếu muốn mang lại ấn tượng mạnh, các bài trình chiếu trong các sự kiện tri ân có thể dùng gam màu lạnh.",
            "Nên kết hợp các màu cùng nhóm với nhau. Ví dụ: màu nóng như đỏ, cam, vàng có thể kết hợp với màu nâu. Màu lạnh như xanh dương, xanh lục có thể đi cùng với màu xám.",
            "Không sử dụng quá nhiều màu trên một trang chiếu (bao gồm cả màu nền, màu chữ,…).",
            "Nên chọn màu văn bản có độ tương phản cao với màu nền.",
          ] },
          { kind: "text", value: "Phần mềm trình chiếu cung cấp các công cụ giúp em chọn đặt được màu sắc, cỡ chữ hài hoà, hợp lí với nội dung. Nhờ các chức năng này, em có thể tạo được các trang chiếu ấn tượng, đem lại hiệu quả cao trong việc truyền đạt nội dung trình chiếu." },
        ],
      },
      remember: [
        "Văn bản trên trang chiếu cần được định dạng sao cho màu sắc, cỡ chữ hài hoà, hợp lí với nội dung.",
        "Văn bản được định dạng phù hợp giúp đem lại hiệu quả cao trong việc truyền đạt nội dung trình chiếu.",
      ],
      questions: [
        { question: "Câu hỏi SGK tr.47 — Em hãy chọn phương án đúng:", type: "multiple-choice",
          sgkImage: "assets/sgk/cau-hoi-tr47.jpg",
          options: ["Văn bản trên trang chiếu cần ngắn gọn, súc tích.", "Văn bản trên trang chiếu càng chi tiết, đầy đủ càng tốt.", "Sử dụng càng nhiều màu sắc cho văn bản trên trang chiếu càng giúp người nghe tập trung.", "Sử dụng nhiều loại phông chữ cho văn bản trên trang chiếu sẽ thu hút được sự chú ý của người nghe."],
          answer: 0, explanation: "A đúng. Không dùng quá nhiều màu, nhiều phông chữ; văn bản chỉ nêu ý chính.", level: "nhan-biet", activity: "hd1-mau-sac" },
        { question: "Trang chiếu nền trắng, em nên chọn màu chữ nào để dễ đọc nhất?", type: "multiple-choice",
          options: ["Vàng nhạt", "Be", "Xám rất nhạt", "Đen hoặc xanh dương đậm"],
          answer: 3, explanation: "Nên chọn màu văn bản có độ tương phản cao với màu nền: chữ đậm màu trên nền sáng.", level: "van-dung", activity: "hd1-mau-sac" },
      ],
    },
    {
      id: "mau-nong-lanh", name: "Trò chơi: Màu nóng – lạnh – trung tính 🌡️", type: "dragdrop",
      goal: "Phân loại màu sắc và chọn gam màu phù hợp với chủ đề bài trình chiếu.",
      time: 300,
      task: "Xếp mỗi màu, mỗi chủ đề bài trình chiếu vào gam màu phù hợp (theo SGK) rồi bấm Nộp bài.",
      layout: "cols",
      groups: ["🔥 Gam màu nóng", "❄️ Gam màu lạnh", "⚪ Gam màu trung tính"],
      items: [
        { text: "Đỏ", group: 0 }, { text: "Da cam", group: 0 }, { text: "Vàng", group: 0 },
        { text: "Chủ đề lễ hội, giải trí", group: 0 },
        { text: "Xanh dương", group: 1 }, { text: "Tím", group: 1 },
        { text: "Sự kiện tri ân, chủ đề nghệ thuật", group: 1 },
        { text: "Trắng", group: 2 }, { text: "Đen", group: 2 }, { text: "Be", group: 2 },
        { text: "Chủ đề giáo dục, học tập", group: 2 },
      ],
      explanation: "Màu nóng (đỏ, da cam, vàng) — lễ hội, giải trí; màu lạnh (xanh, tím) — nghệ thuật, tri ân, muốn gây ấn tượng mạnh; màu trung tính (trắng, đen, be) — giáo dục, học tập.",
    },
    {
      id: "phoi-mau", name: "Mô phỏng: Phối màu trang chiếu 🖌️", type: "knowledge",
      goal: "Thử chọn màu nền, màu chữ, cỡ chữ; nhận xét độ tương phản và sự hài hoà với chủ đề.",
      time: 420,
      task: "Chọn chủ đề, rồi thử các màu nền, màu tiêu đề, màu chữ và cỡ chữ cho trang chiếu “Mục tiêu hoạt động”. Đọc nhận xét bên dưới trang chiếu: phối màu nào dễ đọc và hài hoà nhất?",
      colorsim: {
        title: "Phối màu cho trang chiếu “Mục tiêu hoạt động”",
        slide: { title: "MỤC TIÊU HOẠT ĐỘNG", bullets: MT },
      },
      questions: [
        { question: "Trên nền vàng, chữ màu trắng thì thế nào?", type: "multiple-choice",
          options: ["Rất dễ đọc", "Khó đọc — độ tương phản thấp, nên đổi sang chữ màu đậm (VD đen, nâu)", "Đẹp nhất vì cùng gam màu nóng", "Không ảnh hưởng gì"],
          answer: 1, explanation: "Vàng và trắng đều sáng nên độ tương phản thấp, khó đọc. Nên chọn màu chữ có độ tương phản cao với màu nền.", level: "van-dung", activity: "phoi-mau" },
      ],
    },

    /* ===================== HĐ2.2: SỐ TRANG, ĐẦU TRANG VÀ CHÂN TRANG (5 phút) ===================== */
    {
      id: "hd2-so-trang", name: "2. Hoạt động 2: Các thông tin cần thiết của bài trình chiếu 🔢", type: "knowledge",
      goal: "Biết phần mềm trình chiếu cho phép đánh số trang, thêm đầu trang, chân trang.",
      time: 360,
      task: "Nhóm thảo luận (phiếu học tập số 2): Theo em, các trang chiếu có cần đánh số không? Có cần thêm các thông tin vào đầu trang và chân trang không? Vì sao?",
      sgkImage: "assets/sgk/hoat-dong-2.jpg",
      content: {
        revealLabel: "📖 Số trang, đầu trang và chân trang (SGK tr.47)",
        blocks: [
          { kind: "text", value: "Giống như phần mềm soạn thảo văn bản, phần mềm trình chiếu cũng cho phép em thêm đầu trang, chân trang và đánh số thứ tự cho các trang trong bài trình chiếu. Đó là thông tin xuất hiện ở đầu và cuối của tất cả các trang chiếu. Thông tin này thường bao gồm tên người trình chiếu, tên công ti, tiêu đề bài trình chiếu, số trang hay thời gian trình chiếu,…" },
          { kind: "list", value: ["Các trang chiếu nên được đánh số.", "Cần thêm các thông tin vào đầu trang và chân trang để người xem nắm được đầy đủ thông tin khi theo dõi."] },
        ],
      },
      remember: ["Có thể đánh số trang, thêm đầu trang, chân trang vào các trang chiếu."],
      questions: [
        { question: "Các trang chiếu có cần đánh số không? Vì sao?", type: "multiple-choice",
          options: ["Không cần, vì trang chiếu chỉ để xem", "Chỉ trang đầu tiên cần số", "Nên đánh số — người xem dễ theo dõi, dễ hỏi lại hoặc nhắc đến một trang cụ thể", "Chỉ đánh số khi in ra giấy"],
          answer: 2, explanation: "Các trang chiếu nên được đánh số để người xem theo dõi và trao đổi thuận tiện.", level: "thong-hieu", activity: "hd2-so-trang" },
        { question: "Thông tin ở đầu trang, chân trang của bài trình chiếu thường gồm những gì? (Chọn tất cả ý đúng)", type: "multiple-select",
          options: ["Tên người trình chiếu", "Tiêu đề bài trình chiếu, tên đơn vị", "Số trang", "Thời gian trình chiếu", "Toàn bộ nội dung chi tiết của bài"],
          answer: [0, 1, 2, 3], explanation: "Thông tin này thường bao gồm tên người trình chiếu, tên công ti, tiêu đề bài trình chiếu, số trang hay thời gian trình chiếu,…", level: "nhan-biet", activity: "hd2-so-trang" },
      ],
    },

    /* =========================== TIẾT 2 =========================== */
    /* ===================== HĐ2.3: THỰC HÀNH (50 phút) ===================== */
    {
      id: "thuc-hanh", name: "3. Thực hành: Bài trình chiếu cho Lễ ra mắt CLB Tin học 🖥️", type: "knowledge",
      goal: "Tạo 4 trang chiếu theo mẫu Hình 10a.3; định dạng; đánh số trang, thêm chân trang; áp dụng mẫu; lưu tệp.",
      time: 1800,
      task: "Nhiệm vụ (2 HS/máy): Tạo một bài trình chiếu mới, nhập nội dung cho bốn trang chiếu theo mẫu Hình 10a.3 rồi: định dạng văn bản, đặt màu sắc, cỡ chữ hài hoà và hợp lí với nội dung; đánh số trang, thêm đầu trang và chân trang.",
      sgkImage: "assets/sgk/nhiem-vu.jpg",
      html: IMG("assets/sgk/hinh-10a-3.jpg", "Hình 10a.3. Nội dung các trang chiếu", 700),
      content: {
        revealLabel: "🔢 Hướng dẫn (SGK tr.48–50)",
        blocks: [
          { kind: "text", value: "(Hướng dẫn sử dụng phần mềm trình chiếu Microsoft PowerPoint phiên bản 2016 để minh hoạ.)" },
          { kind: "list", value: [
            "a) Khởi động phần mềm và nhập nội dung: trang chiếu đầu tiên là trang tiêu đề, chọn mẫu Title Slide. Ba trang tiếp theo chọn mẫu Title and Content. Nhập nội dung văn bản theo mẫu ở Hình 10a.3.",
            "b) Định dạng văn bản: Trang 1: dòng tiêu đề đặt phông Arial, cỡ 60, màu vàng, in đậm, căn giữa. Trang 2, 3, 4: tiêu đề trang đặt phông Arial, cỡ 54, màu xanh lá, in đậm, căn giữa; nội dung văn bản đặt phông Arial, cỡ 32, màu đen, chữ thường, căn trái, tạo danh sách dấu đầu dòng. Thay đổi vị trí các hộp văn bản để bố cục cân đối.",
            "c) Đánh số trang, thêm đầu trang và chân trang: chọn Insert, trong nhóm lệnh Text chọn lệnh Header & Footer hoặc Slide Number (Hình 10a.4) để mở cửa sổ Header and Footer và thực hiện các bước như Hình 10a.5.",
          ] },
          { kind: "image", value: "assets/sgk/hinh-10a-4.jpg", caption: "Hình 10a.4. Nhóm lệnh Text" },
          { kind: "image", value: "assets/sgk/hinh-10a-5.jpg", caption: "Hình 10a.5. Các bước đánh số trang và thêm đầu trang, chân trang" },
          { kind: "list", value: [
            "Lưu ý: Em có thể định dạng cho số trang và thông tin trong phần đầu trang, chân trang giống như định dạng văn bản trên trang chiếu.",
            "Phần mềm trình chiếu còn hỗ trợ em in nội dung bài trình chiếu ra giấy (Handouts) để phát cho người nghe; có thể thêm đầu trang, chân trang vào tài liệu in bằng cách chọn Notes and Handouts trong cửa sổ Header and Footer.",
            "Ở chế độ Slide, em không thêm được đầu trang. Chỉ ở chế độ Notes and Handouts phần mềm PowerPoint mới có chức năng thêm đầu trang.",
            "Cách tạo danh sách dấu đầu dòng trong phần mềm trình chiếu tương tự như trong phần mềm soạn thảo văn bản.",
            "d) Hoàn thiện bài trình chiếu và lưu tệp: áp dụng một mẫu định dạng cho bài trình chiếu (ví dụ kết quả như Hình 10a.6); chọn File/Save để lưu tệp với tên LeRaMatCLBTinhoc.pptx.",
          ] },
          { kind: "image", value: "assets/sgk/hinh-10a-6.jpg", caption: "Hình 10a.6. Các trang chiếu kết quả" },
        ],
      },
      questions: [
        { question: "Trang chiếu đầu tiên (trang tiêu đề) chọn mẫu bố cục nào?", type: "multiple-choice",
          options: ["Title and Content", "Blank", "Title Slide", "Two Content"],
          answer: 2, explanation: "Trang tiêu đề: Title Slide; ba trang tiếp theo: Title and Content.", level: "nhan-biet", activity: "thuc-hanh" },
        { question: "Theo hướng dẫn SGK, cỡ chữ nào phù hợp cho nội dung văn bản ở trang 2, 3, 4?", type: "multiple-choice",
          options: ["32 (tiêu đề trang 54)", "12", "60 (bằng tiêu đề)", "8"],
          answer: 0, explanation: "Tiêu đề trang cỡ 54, nội dung cỡ 32 — tiêu đề lớn hơn nội dung, cả hai đủ lớn để dễ đọc.", level: "nhan-biet", activity: "thuc-hanh" },
        { question: "Để mở cửa sổ Header and Footer, em chọn:", type: "multiple-choice",
          options: ["Home › Font", "Insert › nhóm Text › Header & Footer (hoặc Slide Number)", "Design › Themes", "File › Save"],
          answer: 1, explanation: "Insert › nhóm Text › Header & Footer hoặc Slide Number (Hình 10a.4).", level: "nhan-biet", activity: "thuc-hanh" },
        { question: "Bài trình chiếu được lưu với tên nào?", type: "multiple-choice",
          options: ["CLBTinhoc.docx", "LeRaMatCLBTinhoc.pptx", "NoidungTinhoc1.pptx", "PhieuKhaoSat.docx"],
          answer: 1, explanation: "SGK: chọn File/Save để lưu tệp với tên LeRaMatCLBTinhoc.pptx.", level: "nhan-biet", activity: "thuc-hanh" },
      ],
    },
    {
      id: "mo-phong-header-footer", name: "Mô phỏng: Hộp thoại Header and Footer 🗂️", type: "knowledge",
      goal: "Thao tác đánh số trang, thêm ngày, chân trang; phân biệt Apply và Apply to All; ẩn trên trang tiêu đề.",
      time: 480,
      task: "Làm như Hình 10a.5 trên mô phỏng: tích Date and time (Update automatically), Slide number, Footer (nhập “CLB Tin học - Trường THCS...”), Don't show on title slide rồi bấm Apply to All. Thử bấm Apply ở một trang để thấy sự khác nhau.",
      sgkImage: "assets/sgk/hinh-10a-5.jpg",
      hfsim: {
        title: "Đánh số trang, thêm chân trang cho bài “Lễ ra mắt CLB Tin học”",
        footer: "CLB Tin học - Trường THCS...",
        slides: [
          { title: "CHÀO MỪNG CÁC BẠN ĐẾN VỚI CLB TIN HỌC", sub: "Nguyễn Thu An – Lớp 8A – Trường THCS...", titleSlide: true },
          { title: "MỤC TIÊU HOẠT ĐỘNG", bullets: MT },
          { title: "NGUYÊN TẮC HOẠT ĐỘNG", bullets: ["Chất lượng đặt lên hàng đầu.", "Thu hút đông đảo thành viên.", "Thúc đẩy phong trào học tập.", "Nội dung hoạt động đa dạng.", "Kết hợp kiến thức và thực tế.", "Khuyến khích sáng tạo."] },
          { title: "KẾ HOẠCH HOẠT ĐỘNG", bullets: ["Tổ chức các chuyên đề thảo luận về phương pháp học tập.", "Tổ chức các chuyên đề thảo luận về nội dung chuyên sâu.", "Tổ chức tìm hiểu về nghề nghiệp liên quan đến Tin học.", "Tổ chức các sự kiện giao lưu, chia sẻ kinh nghiệm."] },
        ],
        goal: { date: true, num: true, footer: "CLB Tin học", noTitle: true },
        success: "Hoàn thành như Hình 10a.6: trang 2, 3, 4 có ngày tự cập nhật, chân trang “CLB Tin học…” và số trang; trang tiêu đề không hiện.",
      },
      questions: [
        { question: "Nút Apply khác nút Apply to All thế nào?", type: "multiple-choice",
          options: ["Giống hệt nhau", "Apply chỉ áp dụng cho trang chiếu đang chọn; Apply to All áp dụng cho tất cả các trang", "Apply áp dụng cho tất cả; Apply to All chỉ cho trang đầu", "Apply to All để lưu tệp"],
          answer: 1, explanation: "Hình 10a.5: nháy chuột vào Apply to All để áp dụng mẫu cho tất cả các trang.", level: "thong-hieu", activity: "mo-phong-header-footer" },
        { question: "Muốn trang tiêu đề KHÔNG hiện chân trang, số trang, em chọn:", type: "multiple-choice",
          options: ["Update automatically", "Fixed", "Slide number", "Don't show on title slide"],
          answer: 3, explanation: "Don't show on title slide: không thêm chân trang vào trang tiêu đề.", level: "nhan-biet", activity: "mo-phong-header-footer" },
        { question: "Chọn Date and time › Update automatically có tác dụng gì?", type: "multiple-choice",
          options: ["Ngày trình bày tự động cập nhật theo ngày hiện tại", "Ngày luôn giữ cố định", "Xoá ngày khỏi trang chiếu", "Đánh số trang"],
          answer: 0, explanation: "Update automatically: tự động cập nhật ngày trình bày; Fixed: ngày cố định do em nhập.", level: "nhan-biet", activity: "mo-phong-header-footer" },
        { question: "Muốn thêm ĐẦU TRANG cho tài liệu in phát cho người nghe, em chọn thẻ nào trong cửa sổ Header and Footer?", type: "multiple-choice",
          options: ["Slide", "Notes and Handouts", "Preview", "Không thể thêm đầu trang"],
          answer: 1, explanation: "Ở chế độ Slide không thêm được đầu trang; chỉ ở chế độ Notes and Handouts mới có chức năng thêm đầu trang.", level: "thong-hieu", activity: "mo-phong-header-footer" },
      ],
    },
    {
      id: "cac-buoc", name: "Trò chơi: Sắp xếp các bước thực hành 🔢", type: "ordering",
      goal: "Ghi nhớ quy trình tạo bài trình chiếu cho Lễ ra mắt CLB Tin học.",
      time: 180,
      task: "Sắp xếp các bước thực hành theo hướng dẫn SGK cho đúng thứ tự rồi bấm Nộp bài.",
      steps: [
        "Khởi động PowerPoint, trang 1 chọn Title Slide, ba trang sau chọn Title and Content",
        "Nhập nội dung văn bản theo mẫu Hình 10a.3",
        "Định dạng văn bản: phông, cỡ, màu chữ; tạo danh sách dấu đầu dòng; căn chỉnh bố cục",
        "Insert › Header & Footer: Date and time, Slide number, Footer, Don't show on title slide",
        "Bấm Apply to All",
        "Áp dụng một mẫu định dạng, File/Save lưu LeRaMatCLBTinhoc.pptx",
      ],
      explanation: "Nhập nội dung → định dạng → Header & Footer → Apply to All → áp dụng mẫu, lưu tệp.",
    },
    {
      id: "tham-tu-trang-chieu", name: "Thám tử trang chiếu 🕵️", type: "quiz",
      goal: "Phát hiện lỗi trình bày thường gặp trên trang chiếu.",
      time: 360,
      task: "Mỗi trang chiếu dưới đây có một lỗi trình bày. Hãy chỉ ra lỗi đó!",
      questions: [
        { question: "Trang chiếu này có lỗi gì?", type: "multiple-choice",
          html: SL({ bg: "#ffffff", tc: "#fde68a", bc: "#fef3c7", title: "MỤC TIÊU HOẠT ĐỘNG", bullets: MT.slice(0, 3) }),
          options: ["Quá nhiều chữ", "Màu chữ gần giống màu nền — độ tương phản thấp, khó đọc", "Cỡ chữ quá lớn", "Không có lỗi"],
          answer: 1, explanation: "Chữ vàng nhạt trên nền trắng rất khó đọc. Nên chọn màu văn bản có độ tương phản cao với màu nền.", level: "van-dung", activity: "tham-tu-trang-chieu" },
        { question: "Trang chiếu này có lỗi gì?", type: "multiple-choice",
          html: SL({ title: "MỤC TIÊU HOẠT ĐỘNG", bs: 0.72, para: "CLB là nơi truyền cảm hứng và chia sẻ niềm đam mê Tin học giữa các thành viên. CLB phải tạo được môi trường giao lưu, hợp tác giữa các thành viên. CLB cần xây dựng và thu thập tài liệu về các nội dung tin học để giúp các thành viên củng cố, mở rộng kiến thức, từng bước hội nhập với xã hội số. CLB giúp các thành viên xây dựng ý thức tự giác, nâng cao khả năng tự học. Từ đó mỗi thành viên cố gắng rèn luyện, nâng cao kĩ năng sống." }),
          options: ["Màu nền quá tối", "Thiếu tiêu đề", "Quá nhiều chữ, viết câu đầy đủ như tài liệu — cần rút gọn thành ý chính", "Dùng quá nhiều màu"],
          answer: 2, explanation: "Văn bản trên trang chiếu cần ngắn gọn, chỉ nêu ý chính (như Hình 10a.2), không chép nguyên đoạn văn của tài liệu.", level: "van-dung", activity: "tham-tu-trang-chieu" },
        { question: "Trang chiếu này có lỗi gì?", type: "multiple-choice",
          html: SL({ title: "NGUYÊN TẮC HOẠT ĐỘNG", tc: "#7c3aed", bc: ["#dc2626", "#16a34a", "#f97316", "#1d4ed8", "#db2777"], bf: ["Arial", "'Times New Roman'", "'Comic Sans MS'", "Impact", "'Courier New'"], bullets: ["Chất lượng đặt lên hàng đầu.", "Thu hút đông đảo thành viên.", "Thúc đẩy phong trào học tập.", "Nội dung hoạt động đa dạng.", "Khuyến khích sáng tạo."] }),
          options: ["Dùng quá nhiều màu và nhiều phông chữ — rối mắt, không hài hoà", "Chữ quá nhỏ", "Quá ít nội dung", "Không có lỗi"],
          answer: 0, explanation: "Không sử dụng quá nhiều màu trên một trang chiếu; nên thống nhất phông chữ và màu cho các mục cùng mức.", level: "van-dung", activity: "tham-tu-trang-chieu" },
        { question: "Trang chiếu này có lỗi gì?", type: "multiple-choice",
          html: SL({ title: "KẾ HOẠCH HOẠT ĐỘNG", ts: 0.7, bs: 0.55, bullets: ["Tổ chức các chuyên đề thảo luận về phương pháp học tập.", "Tổ chức các chuyên đề thảo luận về nội dung chuyên sâu.", "Tổ chức tìm hiểu về nghề nghiệp liên quan đến Tin học.", "Tổ chức các sự kiện giao lưu, chia sẻ kinh nghiệm."] }),
          options: ["Màu không hài hoà", "Quá nhiều màu", "Nền quá tối", "Cỡ chữ quá nhỏ, tiêu đề không nổi bật — người ngồi xa khó đọc"],
          answer: 3, explanation: "Chữ quá nhỏ khó đọc; tiêu đề nên có cỡ chữ lớn hơn nội dung (SGK: tiêu đề 54, nội dung 32).", level: "van-dung", activity: "tham-tu-trang-chieu" },
      ],
    },

    /* ===================== HĐ3: LUYỆN TẬP (10 phút) ===================== */
    {
      id: "ngoi-sao-may-man", name: "Luyện tập: Trò chơi “Ngôi sao may mắn” ⭐", type: "ladder",
      goal: "Củng cố kiến thức về văn bản, màu sắc, cỡ chữ, đầu trang, chân trang trên trang chiếu.",
      time: 480,
      task: "Hai đội thay phiên trả lời: mỗi câu đúng, ngôi sao của đội leo lên 1 bậc. Đội nào lên cao hơn sẽ mở hộp quà!",
      teams: [{ name: "Đội Ngôi Sao", icon: "⭐" }, { name: "Đội Mặt Trăng", icon: "🌙" }],
      goalIcon: "🎁",
      questions: [
        { question: "Câu 1. Văn bản ở trang chiếu cần:", type: "multiple-choice",
          options: ["chi tiết và đầy đủ.", "trình bày với nhiều phông chữ khác nhau.", "ngắn gọn và súc tích.", "trình bày với nhiều màu chữ khác nhau."], answer: 2, explanation: "Văn bản trên trang chiếu ngắn gọn, súc tích, chỉ nêu ý chính.", level: "nhan-biet", activity: "ngoi-sao-may-man" },
        { question: "Câu 2. Nhóm màu nào có thể giúp người xem phấn chấn, hoạt bát, năng nổ?", type: "multiple-choice",
          options: ["Màu nóng", "Màu lạnh", "Màu trung tính", "Tất cả các màu trên"], answer: 0, explanation: "Các màu nóng như đỏ, da cam, vàng mang lại cảm giác ấm áp, giúp người xem phấn chấn, hoạt bát, năng nổ.", level: "nhan-biet", activity: "ngoi-sao-may-man" },
        { question: "Câu 3 (Luyện tập SGK tr.50). Em hãy chọn phương án SAI:", type: "multiple-choice", sgkImage: "assets/sgk/luyen-tap.jpg",
          options: ["Đầu trang và chân trang có thể được định dạng phông chữ, cỡ chữ, màu chữ khác nhau.", "Có thể bỏ phần đầu trang và chân trang khỏi trang chiếu tiêu đề.", "Có thể tự động cập nhật thời gian vào thông tin ở đầu trang và chân trang.", "Những thông tin lựa chọn và nhập vào cửa sổ Header & Footer được tự động áp dụng cho tất cả các trang chiếu trong bài trình chiếu."],
          answer: 3, explanation: "D sai: phải nháy Apply to All mới áp dụng cho tất cả các trang (Apply chỉ áp dụng cho trang đang chọn). B đúng nhờ ô Don't show on title slide; C đúng nhờ Update automatically; A đúng (định dạng như văn bản trên trang chiếu).", level: "thong-hieu", activity: "ngoi-sao-may-man" },
        { question: "Câu 4. Đặc điểm của văn bản trên trang chiếu là gì?", type: "multiple-choice",
          options: ["Ngắn gọn.", "Chỉ nêu ý chính.", "Màu sắc hài hoà, cỡ chữ cân đối.", "Cả 3 đáp án trên."], answer: 3, explanation: "Văn bản trên trang chiếu ngắn gọn, chỉ nêu ý chính; được định dạng màu sắc, cỡ chữ hài hoà.", level: "thong-hieu", activity: "ngoi-sao-may-man" },
        { question: "Câu 5. Phát biểu nào sau đây SAI về sử dụng cỡ chữ trên trang chiếu?", type: "multiple-choice",
          options: ["Cỡ chữ trên trang chiếu thường từ 20pt trở lên.", "Nên sử dụng cùng cỡ chữ cho tiêu đề và nội dung của bài trình chiếu.", "Sử dụng cỡ chữ thống nhất cho các mục cùng mức phân cấp, mức phân cấp tiếp theo có cỡ chữ nhỏ hơn mức phân cấp trước đó.", "Cùng một cỡ chữ nhưng với phông chữ khác nhau thì kích thước chữ không hoàn toàn như nhau."],
          answer: 1, explanation: "B sai: tiêu đề nên có cỡ chữ lớn hơn nội dung (VD tiêu đề 54, nội dung 32) để thể hiện mức phân cấp.", level: "thong-hieu", activity: "ngoi-sao-may-man" },
        { question: "Câu 6. Em hãy chọn phương án đúng:", type: "multiple-choice",
          options: ["Văn bản trên trang chiếu càng chi tiết, đầy đủ càng tốt.", "Văn bản trên trang chiếu cần ngắn gọn, súc tích.", "Sử dụng càng nhiều màu sắc cho văn bản trên trang chiếu càng giúp người nghe tập trung.", "Sử dụng nhiều loại phông chữ cho văn bản trên trang chiếu sẽ thu hút được sự chú ý của người nghe."], answer: 1, explanation: "Văn bản trên trang chiếu cần ngắn gọn, súc tích.", level: "nhan-biet", activity: "ngoi-sao-may-man" },
      ],
    },

    /* ===================== HĐ4: VẬN DỤNG (5 phút) ===================== */
    {
      id: "van-dung", name: "Vận dụng: Giới thiệu một nội dung Tin học 🎯", type: "knowledge",
      goal: "Tạo bài trình chiếu giới thiệu một nội dung Tin học, định dạng hài hoà, có số trang, đầu trang, chân trang.",
      time: 300,
      task: "Tạo bài trình chiếu giới thiệu một nội dung Tin học em chọn (VD: một ngôn ngữ lập trình, bảng tính điện tử,…) để trình chiếu trong buổi sinh hoạt CLB Tin học: tối thiểu 3 trang chiếu, nội dung theo cấu trúc phân cấp; chọn màu sắc, định dạng văn bản hài hoà, hợp lí; đánh số trang, thêm đầu trang, chân trang. Lưu tệp NoidungTinhoc1.pptx. Hoàn thiện ở nhà, gửi sản phẩm qua thư điện tử hoặc Zalo của thầy/cô.",
      sgkImage: "assets/sgk/van-dung.jpg",
      content: {
        revealLabel: "💡 Tự kiểm tra trước khi nộp",
        blocks: [
          { kind: "list", value: [
            "Văn bản ngắn gọn, chỉ nêu ý chính; tiêu đề lớn hơn nội dung; mục cùng mức có cùng cỡ chữ.",
            "Gam màu hợp với chủ đề; không quá nhiều màu; chữ tương phản rõ với nền.",
            "Có số trang, ngày, chân trang (Apply to All); trang tiêu đề ẩn chân trang nếu muốn.",
            "Hình ảnh (nếu có) phù hợp nội dung, ghi nguồn khi lấy từ Internet. Nếu nhờ AI gợi ý bố cục, màu sắc, em vẫn tự kiểm tra và chỉnh sửa.",
          ] },
        ],
      },
      questions: [
        { question: "Bài trình chiếu giới thiệu ngôn ngữ lập trình cho buổi sinh hoạt CLB (chủ đề học tập) nên chọn gam màu chủ đạo nào theo SGK?", type: "multiple-choice",
          options: ["Gam màu nóng rực rỡ", "Nhiều màu càng tốt", "Gam màu trung tính (trắng, đen, be…) kết hợp màu nhấn", "Chỉ dùng màu đỏ"],
          answer: 2, explanation: "Chủ đề giáo dục, học tập nên dùng gam màu trung tính.", level: "van-dung", activity: "van-dung" },
      ],
    },

    /* ===================== TỔNG KẾT ===================== */
    {
      id: "tong-ket", name: "Tổng kết", type: "summary",
      task: "Cả lớp nhắc lại kiến thức trọng tâm và làm thử thách cuối. Về nhà: hoàn thiện Vận dụng; tìm hiểu trước Bài 11a: Sử dụng bản mẫu tạo bài trình chiếu.",
      content: {
        learned: [
          "Văn bản trên trang chiếu: ngắn gọn, chỉ nêu ý chính.",
          "Màu nóng – lạnh – trung tính; màu hài hoà với nội dung, cùng nhóm, không quá nhiều màu, chữ tương phản với nền.",
          "Màu sắc, cỡ chữ hài hoà, hợp lí giúp truyền đạt nội dung hiệu quả.",
          "Insert › Header & Footer: Date and time, Slide number, Footer, Don't show on title slide → Apply to All.",
        ],
        challenge: [
          { question: "Bài trình chiếu cho “Ngày hội văn hoá đọc” của trường (không khí vui tươi, sôi nổi) nên dùng gam màu nào?", type: "multiple-choice",
            options: ["Gam màu nóng", "Gam màu lạnh", "Chỉ đen trắng", "Mỗi trang một màu khác nhau"],
            answer: 0, explanation: "Chủ đề lễ hội, giải trí nên dùng gam màu nóng, giúp người xem phấn chấn, hoạt bát.", level: "van-dung-cao", activity: "tong-ket" },
          { question: "Bạn Nam đã tích Slide number nhưng chỉ trang 3 có số trang. Nguyên nhân có thể là gì?", type: "multiple-choice",
            options: ["Máy tính bị lỗi", "Bạn đã bấm Apply khi đang chọn trang 3 thay vì Apply to All", "Bạn chưa lưu tệp", "PowerPoint chỉ đánh số được một trang"],
            answer: 1, explanation: "Apply chỉ áp dụng cho trang đang chọn; cần bấm Apply to All để áp dụng cho tất cả các trang.", level: "van-dung-cao", activity: "tong-ket" },
        ],
      },
    },
  ],
};

if (typeof module !== "undefined" && module.exports) module.exports = LESSON;
if (typeof window !== "undefined") window.LESSON = LESSON;
