/* ============================================================================
 * BÀI 8a — LÀM VIỆC VỚI DANH SÁCH DẠNG LIỆT KÊ VÀ HÌNH ẢNH TRONG VĂN BẢN  (Tin học 8 — Kết nối tri thức với cuộc sống)
 * Chủ đề 4a: Soạn thảo văn bản và trình chiếu nâng cao.
 * Bám sát SGK trang 36–41 + Kế hoạch bài dạy (2 tiết) của giáo viên.
 * Chỉ sửa file này để đổi nội dung. Engine app.js không cần sửa.
 * GV chọn: theo SGK có HAI kiểu danh sách dạng liệt kê (danh sách đa cấp chỉ là Mở rộng);
 * mô phỏng: danh sách tự đánh số (`listsim`), Wrap Text — lớp của ảnh (`wrapsim`), thiết kế tờ rơi kéo thả (`flyer`).
 * Ảnh nền tờ rơi (assets/nen-to-roi.svg) và ảnh góc (assets/anh-clb.svg) là hình minh hoạ tự vẽ.
 * ==========================================================================*/

const ND = ["Ngôn ngữ lập trình", "Mạng máy tính", "Đồ hoạ máy tính", "Bảng tính điện tử", "Soạn thảo văn bản", "Phần mềm trình chiếu"];
const TWO = (a, b, ca, cb) => `<div style="display:flex;flex-wrap:wrap;gap:14px;justify-content:center;align-items:flex-start">`
  + `<figure style="margin:0;flex:1 1 300px;max-width:460px"><img src="${a}" alt="${ca}" style="width:100%;border-radius:8px"><figcaption class="caption">${ca}</figcaption></figure>`
  + `<figure style="margin:0;flex:1 1 300px;max-width:460px"><img src="${b}" alt="${cb}" style="width:100%;border-radius:8px"><figcaption class="caption">${cb}</figcaption></figure></div>`;
const H82_83 = TWO("assets/sgk/hinh-8a-2.jpg", "assets/sgk/hinh-8a-3.jpg", "Hình 8a.2. Văn bản không sử dụng danh sách dạng liệt kê", "Hình 8a.3. Văn bản sử dụng danh sách dạng liệt kê");
const H85_86 = TWO("assets/sgk/hinh-8a-5.jpg", "assets/sgk/hinh-8a-6.jpg", "Hình 8a.5. Tờ rơi không có hình minh hoạ", "Hình 8a.6. Tờ rơi có hình minh hoạ");
const TO_ROI = [
  { text: "Câu lạc bộ Tin học", size: 1 },
  { text: "TUYỂN", size: 2.3, bold: true },
  { text: "THÀNH VIÊN", size: 1.5, bold: true },
  { text: "Hãy đến với chúng tôi để cùng nhân rộng niềm đam mê Tin học", size: 0.8 },
  { text: "15h ngày ......", size: 1, bold: true },
  { text: "Tại phòng 305", size: 1, bold: true },
  { text: "Nhà A", size: 1, bold: true },
];
const YELLOW = "#ffd400";

const LESSON = {
  meta: {
    subject: "Tin học", grade: "8", book: "Kết nối tri thức với cuộc sống",
    title: "Bài 8a: Làm việc với danh sách dạng liệt kê và hình ảnh trong văn bản", unit: "Chủ đề 4a — Soạn thảo văn bản và trình chiếu nâng cao",
    pages: "36–41", durationMinutes: 90,
  },
  objectives: {
    knowledge: [
      "Thực hiện được các thao tác: tạo danh sách dạng liệt kê; chèn thêm, xoá bỏ, co dãn hình ảnh; vẽ hình đồ hoạ trong văn bản,…",
      "Tạo được sản phẩm là văn bản có tính thẩm mĩ phục vụ nhu cầu thực tế (phiếu khảo sát, tờ rơi).",
    ],
    competencies: [
      "Tự chủ và tự học; giao tiếp và hợp tác (thực hành 2 HS/máy, chấm chéo sản phẩm); giải quyết vấn đề và sáng tạo (thiết kế tờ rơi).",
      "Năng lực số 3.1.TC2a: trình bày nội dung bằng danh sách dấu đầu dòng / có thứ tự; chèn, di chuyển, thay đổi kích thước hình ảnh.",
      "Năng lực số 3.2.TC2a: chỉnh sửa, tinh chỉnh nội dung số (đổi kiểu danh sách, căn chỉnh văn bản – hình ảnh, xoá / thay ảnh).",
      "Năng lực số 5.2.TC2b: tạo văn bản hoàn chỉnh có danh sách và hình ảnh minh hoạ, đúng mục đích sử dụng.",
      "Năng lực AI 8.C2.1: AI có thể hỗ trợ tạo, sắp xếp nội dung văn bản, hình ảnh nhưng cần được con người kiểm tra; tôn trọng bản quyền hình ảnh.",
    ],
    qualities: ["Chăm chỉ, trách nhiệm; trung thực (tự làm sản phẩm, ghi nguồn hình ảnh); có ý thức trình bày văn bản khoa học, thẩm mĩ."],
  },
  coreKnowledge: [
    "Phần mềm soạn thảo văn bản cung cấp hai kiểu danh sách dạng liệt kê: danh sách dấu đầu dòng và danh sách có thứ tự.",
    "Dấu đầu dòng và thứ tự trong danh sách dạng liệt kê được tự động tạo và cập nhật mỗi khi thêm hoặc bớt đoạn văn bản.",
    "Danh sách dạng liệt kê giúp trình bày văn bản rõ ràng và có tính thẩm mĩ.",
    "Phần mềm soạn thảo văn bản cung cấp nhiều công cụ nâng cao để làm việc với hình ảnh (chèn, xoá, thay đổi kích thước, vị trí, lớp) và vẽ hình đồ hoạ.",
    "Tạo danh sách có thứ tự: chọn các đoạn văn bản → Home → Numbering. Ảnh nền: Insert/Picture → Format › Arrange › Wrap Text › Behind Text → kéo góc ảnh cho phủ kín. Hình đồ hoạ: Insert › Shapes; đổi màu: Format › Shape Fill.",
  ],
  keywords: ["Danh sách dấu đầu dòng", "Danh sách có thứ tự", "Wrap Text", "Behind Text", "Shapes"],
  settings: { basePoints: 100, useTimer: false, defaultTime: 60, sound: true, streakEnabled: true },

  activities: [
    /* =========================== TIẾT 1 =========================== */
    /* ===================== HĐ1: MỞ ĐẦU (5 phút) ===================== */
    {
      id: "mo-dau", name: "Mở đầu — Phiếu khảo sát của bạn An 📋", type: "knowledge",
      goal: "Tạo hứng thú; nhận ra nhu cầu đánh số thứ tự tự động cho danh sách.",
      time: 300,
      task: "Theo cặp đôi: Bạn An có cần nhập từng số thứ tự của danh sách trong Phiếu khảo sát không? Với danh sách có hàng trăm mục thì làm thế nào để tiết kiệm thời gian và không bị nhầm thứ tự các mục?",
      sgkImage: "assets/sgk/mo-dau.jpg",
      content: {
        heading: "📋 Phiếu khảo sát của bạn An",
        prompt: "Bạn An được giao nhiệm vụ thiết kế Phiếu khảo sát để sử dụng cho dự án Thành lập CLB Tin học theo mẫu như Hình 8a.1. Trong Phiếu khảo sát có một danh sách các nội dung của môn Tin học.",
        image: "assets/sgk/hinh-8a-1.jpg", imageCaption: "Hình 8a.1. Phiếu khảo sát",
      },
      questions: [
        { question: "Bạn An có cần gõ từng số thứ tự 1, 2, 3,… cho danh sách các nội dung Tin học không?", type: "multiple-choice",
          options: ["Có, phải gõ từng số rồi mới gõ nội dung", "Không — dùng danh sách có thứ tự, phần mềm tự tạo số thứ tự", "Không cần đánh số thứ tự cho danh sách", "Chỉ cần gõ số 1, các số sau tự hiện khi in"],
          answer: 1, explanation: "Phần mềm soạn thảo tạo được danh sách có thứ tự: số thứ tự tự động tạo ra, em không phải gõ.", level: "thong-hieu", activity: "mo-dau" },
        { question: "Với danh sách hàng trăm mục, vì sao nên dùng danh sách có thứ tự của phần mềm thay vì tự gõ số?", type: "multiple-choice",
          options: ["Vì chữ số gõ tay không in được", "Vì phần mềm cấm gõ chữ số", "Vì danh sách đẹp hơn nhưng vẫn phải sửa số bằng tay", "Vì tiết kiệm thời gian và khi thêm, bớt mục, số thứ tự tự cập nhật — không bị nhầm"],
          answer: 3, explanation: "Thứ tự trong danh sách có thứ tự được tạo và cập nhật tự động khi em thêm hoặc bớt các đoạn văn bản.", level: "van-dung", activity: "mo-dau" },
      ],
    },

    /* ===================== HĐ2.1: DANH SÁCH DẠNG LIỆT KÊ (10 phút) ===================== */
    {
      id: "hd1-danh-sach", name: "1. Hoạt động 1: Tác dụng của danh sách dạng liệt kê 📑", type: "knowledge",
      goal: "Nhận xét hai cách trình bày; nêu hai kiểu danh sách dạng liệt kê và tác dụng.",
      time: 480,
      task: "Cặp đôi quan sát Hình 8a.2, Hình 8a.3 và trả lời: Văn bản ở hình nào sử dụng danh sách dạng liệt kê? Có mấy kiểu danh sách dạng liệt kê? Cách trình bày nào khoa học, dễ hiểu hơn? Làm cách nào tạo ra được văn bản như vậy?",
      sgkImage: "assets/sgk/hoat-dong-1.jpg",
      html: H82_83,
      content: {
        revealLabel: "📖 Danh sách dạng liệt kê (SGK tr.37)",
        blocks: [
          { kind: "text", value: "Phần mềm soạn thảo văn bản cung cấp hai kiểu danh sách dạng liệt kê là: danh sách dấu đầu dòng và danh sách có thứ tự. Phiếu khảo sát ở Hình 8a.1 là một ví dụ về danh sách có thứ tự. Nội dung văn bản trong Hình 8a.3 là một ví dụ về danh sách có thứ tự kết hợp với danh sách dấu đầu dòng." },
          { kind: "text", value: "Mỗi đơn vị trong danh sách dạng liệt kê là một đoạn văn bản, phân tách nhau bởi một kí tự đặc biệt, được tạo ra khi người sử dụng nhấn phím Enter. Trong danh sách dấu đầu dòng, mỗi đoạn văn bản bắt đầu bằng một dấu đầu dòng. Các dấu đầu dòng được tự động tạo ra mỗi khi em thêm đoạn văn bản mới. Trong danh sách có thứ tự, mỗi đoạn văn bản bắt đầu bằng một số hoặc chữ cái và dấu phân tách (thường là dấu chấm hoặc dấu ngoặc đơn). Thứ tự trong danh sách có thứ tự được tạo và cập nhật tự động khi em thêm hoặc bớt các đoạn văn bản trong danh sách." },
          { kind: "text", value: "Sử dụng danh sách dạng liệt kê giúp cho văn bản trở nên rõ ràng, có tính thẩm mĩ hơn. Nếu được sử dụng đúng cách, các dấu đầu dòng và thứ tự có tác dụng như một điểm truy cập cho người đọc, một hình thức nhấn mạnh hoặc một cách để biểu thị tầm quan trọng của nội dung đoạn văn bản. Danh sách dạng liệt kê chia nhỏ các đoạn văn bản dài, giúp người đọc có khả năng tham khảo thông tin nhanh chóng, dễ dàng." },
          { kind: "ext", value: "Word còn có lệnh Multilevel List (danh sách đa cấp) để trình bày danh sách nhiều mức như đề cương. Ở mức độ lớp 8, em có thể tạo danh sách hai mức như Hình 8a.3 bằng cách kết hợp danh sách có thứ tự với danh sách dấu đầu dòng (nhấn Tab để lùi mục con vào một mức)." },
        ],
      },
      remember: [
        "Phần mềm soạn thảo văn bản cung cấp hai kiểu danh sách dạng liệt kê: danh sách dấu đầu dòng, danh sách có thứ tự.",
        "Dấu đầu dòng và thứ tự trong danh sách dạng liệt kê được tự động tạo và cập nhật mỗi khi thêm hoặc bớt đoạn văn bản.",
        "Danh sách dạng liệt kê giúp trình bày văn bản rõ ràng và có tính thẩm mĩ.",
      ],
      questions: [
        { question: "Văn bản ở hình nào sử dụng danh sách dạng liệt kê?", type: "multiple-choice",
          options: ["Hình 8a.2", "Cả hai hình", "Hình 8a.3", "Không hình nào"],
          answer: 2, explanation: "Hình 8a.3 dùng danh sách có thứ tự 1), 2), 3), 4) kết hợp danh sách dấu đầu dòng •.", level: "nhan-biet", activity: "hd1-danh-sach" },
        { question: "Phần mềm soạn thảo văn bản cung cấp mấy kiểu danh sách dạng liệt kê? Đó là những kiểu nào?", type: "multiple-choice",
          options: ["Hai kiểu: danh sách dấu đầu dòng và danh sách có thứ tự", "Một kiểu: danh sách có thứ tự", "Ba kiểu: gạch chân, in đậm, in nghiêng", "Hai kiểu: danh sách chữ và danh sách hình"],
          answer: 0, explanation: "SGK: hai kiểu danh sách dạng liệt kê là danh sách dấu đầu dòng và danh sách có thứ tự.", level: "nhan-biet", activity: "hd1-danh-sach" },
        { question: "Vì sao cách trình bày ở Hình 8a.3 khoa học, dễ hiểu hơn Hình 8a.2?", type: "multiple-choice",
          options: ["Vì dùng nhiều chữ hơn", "Vì chia nhỏ nội dung thành từng mục, có thứ tự và dấu đầu dòng — dễ theo dõi, tra cứu nhanh", "Vì có màu nền", "Vì không có dấu chấm câu"],
          answer: 1, explanation: "Danh sách dạng liệt kê chia nhỏ đoạn văn bản dài, giúp người đọc tham khảo thông tin nhanh chóng, dễ dàng.", level: "thong-hieu", activity: "hd1-danh-sach" },
      ],
    },
    {
      id: "cau-hoi-danh-sach", name: "Câu hỏi SGK tr.37–38 ❓", type: "quiz",
      goal: "Củng cố đặc điểm danh sách dạng liệt kê; dự đoán kết quả khi nhấn Enter trong danh sách có thứ tự.",
      time: 300,
      task: "Trả lời hai câu hỏi trong SGK trang 37–38.",
      questions: [
        { question: "Câu 1 — Em hãy chọn những phương án SAI trong các phương án sau:", type: "multiple-select",
          sgkImage: "assets/sgk/cau-hoi-1.jpg",
          options: ["Phần mềm soạn thảo văn bản cung cấp hai kiểu danh sách dạng liệt kê.", "Danh sách dạng liệt kê không tự động cập nhật khi thêm hoặc bớt đoạn văn.", "Chỉ có thể sử dụng một kiểu danh sách dạng liệt kê cho một văn bản.", "Có thể sử dụng kết hợp danh sách dấu đầu dòng và danh sách có thứ tự."],
          answer: [1, 2], explanation: "B sai: danh sách tự động cập nhật khi thêm/bớt đoạn. C sai: có thể kết hợp nhiều kiểu (như Hình 8a.3). A, D đúng.", level: "thong-hieu", activity: "cau-hoi-danh-sach" },
        { question: "Câu 2 — Với danh sách có thứ tự ở Hình 8a.4a, nếu đặt con trỏ soạn thảo ở cuối dòng thứ hai rồi nhấn Enter để thêm một đoạn văn bản mới thì em thu được kết quả như Hình 8a.4b hay Hình 8a.4c?", type: "multiple-choice",
          image: "assets/sgk/cau-hoi-2.jpg", imageCaption: "Hình 8a.4. Danh sách có thứ tự",
          options: ["Hình 8a.4b — xuất hiện mục 3 mới (trống), các mục phía sau tự đánh số lại 4, 5", "Hình 8a.4c — dòng mới không có số, các mục giữ nguyên số", "Danh sách mất hết số thứ tự", "Mục mới được thêm vào cuối danh sách với số 5"],
          answer: 0, explanation: "Enter tạo một đoạn mới trong danh sách, đoạn mới được đánh số 3 và thứ tự các mục sau tự động cập nhật (Hình 8a.4b). Em có thể thử ngay ở màn mô phỏng tiếp theo!", level: "van-dung", activity: "cau-hoi-danh-sach" },
      ],
    },
    {
      id: "mo-phong-danh-sach", name: "Mô phỏng: Danh sách tự đánh số ✨", type: "knowledge",
      goal: "Tạo danh sách có thứ tự cho Phiếu khảo sát; thấy thứ tự tự cập nhật khi thêm, bớt đoạn.",
      time: 480,
      task: "Chọn 6 dòng nội dung Tin học (bấm lề trái từng dòng hoặc ☑ Chọn tất cả) rồi chọn Numbering › kiểu 1. như Hình 8a.8. Sau đó thử: đặt con trỏ cuối dòng 2 nhấn Enter (Câu 2), xoá một mục, đổi sang Bullets — quan sát số thứ tự.",
      sgkImage: "assets/sgk/hinh-8a-8.jpg",
      listsim: {
        title: "Tạo danh sách có thứ tự cho Phiếu khảo sát",
        doc: "PhieuKhaoSat.docx", box: true,
        head: [{ text: "PHIẾU KHẢO SÁT", center: true }, "Họ và tên: ........................................", "Lớp: ...............................................", "Bạn mong muốn tìm hiểu thêm nội dung nào của môn Tin học? (Chọn một nội dung)"],
        items: ND,
        goal: [{ kind: "num", fmt: "1." }],
        success: "Hoàn thành! Danh sách nội dung Tin học đã được đánh số 1. 2. 3.… tự động như Hình 8a.8.",
      },
      questions: [
        { question: "Trong danh sách đã đánh số 1–6, em đặt con trỏ cuối dòng “2. Mạng máy tính” rồi nhấn Enter. Mục “Đồ hoạ máy tính” lúc này mang số mấy?", type: "multiple-choice",
          options: ["3", "4", "2", "Không có số"],
          answer: 1, explanation: "Đoạn mới trống thành mục 3, Đồ hoạ máy tính tự đổi thành 4 — thứ tự tự cập nhật.", level: "van-dung", activity: "mo-phong-danh-sach" },
        { question: "Em xoá mục “1. Ngôn ngữ lập trình” khỏi danh sách 1–6. Số thứ tự của các mục còn lại thế nào?", type: "multiple-choice",
          options: ["Giữ nguyên 2, 3, 4, 5, 6", "Mất hết số thứ tự", "Tự động đánh lại 1, 2, 3, 4, 5", "Phải gõ lại bằng tay"],
          answer: 2, explanation: "Thứ tự trong danh sách được cập nhật tự động khi thêm hoặc bớt đoạn văn bản.", level: "thong-hieu", activity: "mo-phong-danh-sach" },
      ],
    },
    {
      id: "dau-dong-hay-thu-tu", name: "Trò chơi: Dấu đầu dòng hay có thứ tự? 🧩", type: "dragdrop",
      goal: "Chọn kiểu danh sách dạng liệt kê phù hợp với nội dung.",
      time: 300,
      task: "Xếp mỗi nội dung vào kiểu danh sách phù hợp nhất rồi bấm Nộp bài.",
      groups: ["• Danh sách dấu đầu dòng (các ý ngang hàng, thứ tự không quan trọng)", "1. Danh sách có thứ tự (cần theo trình tự, cần đếm hoặc gọi tên mục theo số)"],
      items: [
        { text: "Những đồ dùng cần mang theo khi đi dã ngoại", group: 0 },
        { text: "Các lợi ích của việc đọc sách", group: 0 },
        { text: "Các món ăn sáng yêu thích của lớp", group: 0 },
        { text: "Các môn thể thao trường tổ chức trong hội khoẻ", group: 0 },
        { text: "Các bước nấu cơm bằng nồi cơm điện", group: 1 },
        { text: "Các bước tạo danh sách có thứ tự trong Word", group: 1 },
        { text: "Thứ tự các tiết mục trong chương trình văn nghệ", group: 1 },
        { text: "Danh sách lựa chọn trong phiếu khảo sát cần đánh số để thống kê", group: 1 },
      ],
      explanation: "Các ý ngang hàng, không cần thứ tự → dấu đầu dòng. Các bước theo trình tự, hoặc mục cần đánh số để đếm, gọi tên (“chọn mục 3”) → danh sách có thứ tự.",
    },

    /* ===================== HĐ2.2: HÌNH ẢNH MINH HOẠ VÀ HÌNH ĐỒ HOẠ (10 phút) ===================== */
    {
      id: "hd2-hinh-anh", name: "2. Hoạt động 2: Hiệu quả của hình ảnh minh hoạ 🖼️", type: "knowledge",
      goal: "So sánh tờ rơi có và không có hình minh hoạ; biết phần mềm soạn thảo có công cụ xử lí hình ảnh, vẽ hình đồ hoạ.",
      time: 480,
      task: "Nhóm quan sát Hình 8a.5, Hình 8a.6 và trả lời: a) Tờ rơi Hình 8a.5 gồm những thông tin dạng nào? b) Tờ rơi Hình 8a.6 gồm những thông tin dạng nào? c) Em ấn tượng với tờ rơi nào hơn? Vì sao? d) Dùng phần mềm soạn thảo văn bản có tạo ra sản phẩm như Hình 8a.6 được không?",
      sgkImage: "assets/sgk/hoat-dong-2.jpg",
      html: H85_86,
      content: {
        revealLabel: "📖 Làm việc với hình ảnh minh hoạ và vẽ hình đồ hoạ (SGK tr.38)",
        blocks: [
          { kind: "text", value: "Bên cạnh các công cụ xử lí văn bản, phần mềm soạn thảo còn cung cấp các công cụ xử lí hình ảnh, giúp em nâng cao hiệu quả sử dụng hình ảnh. Em có thể: chèn thêm, xoá bỏ hình ảnh; thay đổi kích thước, vị trí hình ảnh;… Bên cạnh đó, phần mềm soạn thảo văn bản còn cung cấp một thư viện đa dạng các mẫu hình đồ hoạ, các chức năng để vẽ hình đồ hoạ trong văn bản." },
          { kind: "text", value: "Với các công cụ mà phần mềm soạn thảo văn bản cung cấp, em có thể tạo được các sản phẩm là văn bản có tính thẩm mĩ phục vụ nhu cầu thực tế." },
        ],
      },
      remember: [
        "Phần mềm soạn thảo văn bản cung cấp nhiều công cụ nâng cao để làm việc với hình ảnh và hình đồ hoạ.",
        "Sử dụng các chức năng nâng cao em có thể tạo được các sản phẩm có tính thẩm mĩ phục vụ nhu cầu thực tế.",
      ],
      questions: [
        { question: "a) Tờ rơi Hình 8a.5 gồm những thông tin dạng nào?", type: "multiple-select",
          options: ["Văn bản (tên CLB, nội dung tuyển thành viên, khẩu hiệu, thời gian, địa điểm)", "Hình ảnh", "Hình đồ hoạ (mũi tên)", "Video"],
          answer: [0], explanation: "Hình 8a.5 chỉ có thông tin dạng văn bản.", level: "nhan-biet", activity: "hd2-hinh-anh" },
        { question: "b) Tờ rơi Hình 8a.6 gồm những thông tin dạng nào?", type: "multiple-select",
          options: ["Văn bản", "Hình ảnh (ảnh nền, ảnh ở góc trên bên phải)", "Hình đồ hoạ (hai mũi tên cong)", "Âm thanh"],
          answer: [0, 1, 2], explanation: "Hình 8a.6 có văn bản, hình ảnh minh hoạ và hình đồ hoạ (SGK tr.41: tờ rơi có hai đối tượng đồ hoạ là hai mũi tên cong).", level: "thong-hieu", activity: "hd2-hinh-anh" },
        { question: "d) Dùng phần mềm soạn thảo văn bản có tạo ra được sản phẩm như Hình 8a.6 không?", type: "multiple-choice",
          options: ["Không, phải dùng phần mềm chỉnh sửa ảnh chuyên dụng", "Chỉ tạo được phần chữ", "Có — phần mềm soạn thảo có công cụ chèn, xử lí hình ảnh và vẽ hình đồ hoạ", "Chỉ khi có Internet"],
          answer: 2, explanation: "Phần mềm soạn thảo cung cấp công cụ xử lí hình ảnh và vẽ hình đồ hoạ để tạo sản phẩm có tính thẩm mĩ.", level: "thong-hieu", activity: "hd2-hinh-anh" },
        { question: "Câu hỏi SGK tr.39 — Em hãy chọn phương án SAI trong các phương án sau:", type: "multiple-choice",
          sgkImage: "assets/sgk/cau-hoi-tr39.jpg",
          options: ["Có thể chèn hình ảnh vào văn bản để minh hoạ cho nội dung.", "Có thể vẽ hình đồ hoạ trong phần mềm soạn thảo văn bản.", "Có thể chèn thêm, xoá bỏ, thay đổi kích thước của hình ảnh và hình đồ hoạ trong văn bản.", "Không thể vẽ hình đồ hoạ trong phần mềm soạn thảo văn bản."],
          answer: 3, explanation: "D sai: phần mềm soạn thảo có thư viện mẫu hình đồ hoạ và chức năng vẽ hình đồ hoạ (Insert › Shapes).", level: "nhan-biet", activity: "hd2-hinh-anh" },
      ],
    },
    {
      id: "nhan-dien-nut-lenh", name: "Thử tài: Nhận diện nút lệnh Word 🔍", type: "ladder",
      goal: "Nhận biết vị trí, chức năng các lệnh dùng trong bài.",
      time: 360,
      task: "Hai đội thay phiên trả lời: mỗi câu đúng, nhân vật của đội leo lên 1 bậc. Đội nào lên cao hơn sẽ chiến thắng!",
      teams: [{ name: "Đội Cú mèo", icon: "🦉" }, { name: "Đội Cá heo", icon: "🐬" }],
      goalIcon: "🏆",
      questions: [
        { question: "Muốn tạo danh sách có thứ tự, trong thẻ Home em chọn lệnh nào?", type: "multiple-choice", image: "assets/sgk/hinh-8a-7.jpg", imageCaption: "Hình 8a.7. Các bước tạo danh sách có thứ tự",
          options: ["Bullets", "Numbering", "Font Color", "Paste"], answer: 1, explanation: "Home › Numbering (nháy tam giác nhỏ bên cạnh để mở Numbering Library).", level: "nhan-biet", activity: "nhan-dien-nut-lenh" },
        { question: "Lệnh Bullets dùng để tạo:", type: "multiple-choice",
          options: ["Danh sách dấu đầu dòng", "Danh sách có thứ tự", "Bảng", "Hình đồ hoạ"], answer: 0, explanation: "Bullets: danh sách dấu đầu dòng; Numbering: danh sách có thứ tự.", level: "nhan-biet", activity: "nhan-dien-nut-lenh" },
        { question: "Để nhập kí hiệu ☐ vào Phiếu khảo sát, em chọn:", type: "multiple-choice",
          options: ["Home › Bullets", "Insert › Picture", "Insert › Symbol", "File › Save"], answer: 2, explanation: "SGK lưu ý: chọn Insert/Symbol để nhập kí hiệu ☐.", level: "nhan-biet", activity: "nhan-dien-nut-lenh" },
        { question: "Để chèn ảnh nền vào tờ rơi, em chọn:", type: "multiple-choice",
          options: ["Home › Numbering", "Insert › Shapes", "Format › Shape Fill", "Insert › Picture"], answer: 3, explanation: "Nháy chuột vào đầu đoạn văn bản, chọn Insert/Picture, chọn tệp ảnh nền.", level: "nhan-biet", activity: "nhan-dien-nut-lenh" },
        { question: "Để ảnh nằm ở lớp dưới, văn bản nằm ở lớp trên, em chọn Format › Arrange › Wrap Text ›", type: "multiple-choice",
          options: ["In Front of Text", "Behind Text", "Square", "In Line with Text"], answer: 1, explanation: "Behind Text: ảnh nằm ở lớp dưới, văn bản nằm ở lớp trên.", level: "thong-hieu", activity: "nhan-dien-nut-lenh" },
        { question: "Để vẽ mũi tên cong, em chọn Insert › Shapes rồi chọn mẫu trong nhóm:", type: "multiple-choice", image: "assets/sgk/hinh-8a-10-11.jpg", imageCaption: "Hình 8a.10, 8a.11",
          options: ["Block Arrows", "Lines", "Flowchart", "Stars and Banners"], answer: 0, explanation: "Mẫu Arrow: Curved Right nằm trong nhóm Block Arrows (Hình 8a.11).", level: "nhan-biet", activity: "nhan-dien-nut-lenh" },
        { question: "Để đổi màu hình đồ hoạ sang màu vàng, em chọn Format › nhóm Shape Styles ›", type: "multiple-choice",
          options: ["Shape Outline", "Shape Effects", "Shape Fill", "Font Color"], answer: 2, explanation: "Shape Fill: màu tô bên trong hình đồ hoạ.", level: "thong-hieu", activity: "nhan-dien-nut-lenh" },
        { question: "Để xoá một hình ảnh hay hình đồ hoạ không phù hợp, em chọn nó rồi:", type: "multiple-choice",
          options: ["Nhấn phím Enter", "Nhấn phím Tab", "Chọn Wrap Text", "Nhấn phím Delete"], answer: 3, explanation: "Nháy chuột chọn hình ảnh, hình đồ hoạ rồi nhấn phím Delete.", level: "nhan-biet", activity: "nhan-dien-nut-lenh" },
      ],
    },

    /* ===================== HĐ2.3: THỰC HÀNH (15 phút) ===================== */
    {
      id: "th-nhiem-vu-1", name: "3. Thực hành — Nhiệm vụ 1: Phiếu khảo sát 📝", type: "knowledge",
      goal: "Tạo Phiếu khảo sát theo mẫu Hình 8a.1 bằng Word; lưu tệp PhieuKhaoSat.docx.",
      time: 900,
      task: "Thực hành trên Word (2 HS/máy): tạo Phiếu khảo sát theo mẫu Hình 8a.1 — nhập nội dung, tạo danh sách có thứ tự, lưu tệp PhieuKhaoSat.docx.",
      sgkImage: "assets/sgk/nhiem-vu-1.jpg",
      content: {
        heading: "📝 Nhiệm vụ 1: Tạo Phiếu khảo sát",
        revealLabel: "🔢 Hướng dẫn (SGK tr.39–40)",
        blocks: [
          { kind: "text", value: "(Hướng dẫn sử dụng phần mềm soạn thảo văn bản Microsoft Word phiên bản 2016 để minh hoạ.)" },
          { kind: "list", value: [
            "a) Khởi động phần mềm và nhập nội dung: nháy đúp chuột vào biểu tượng phần mềm trên màn hình nền; nhập nội dung văn bản theo mẫu ở Hình 8a.1. Lưu ý: em chọn Insert/Symbol để nhập kí hiệu ☐.",
            "b) Tạo danh sách có thứ tự: chọn các đoạn văn bản muốn tạo danh sách có thứ tự; thực hiện các bước như Hình 8a.7: 1. Chọn Home → 2. Nháy chuột vào hình tam giác nhỏ bên cạnh lệnh Numbering → 3. Chọn kiểu danh sách có thứ tự.",
            "c) Lưu tệp: chọn File/Save để lưu tệp văn bản với tên PhieuKhaoSat.docx.",
          ] },
          { kind: "image", value: "assets/sgk/hinh-8a-7.jpg", caption: "Hình 8a.7. Các bước tạo danh sách có thứ tự" },
          { kind: "image", value: "assets/sgk/hinh-8a-8.jpg", caption: "Hình 8a.8. Kết quả các bước tạo danh sách có thứ tự" },
        ],
      },
      questions: [
        { question: "Trước khi chọn lệnh Numbering, em cần làm gì?", type: "multiple-choice",
          options: ["Lưu tệp", "Chọn các đoạn văn bản muốn tạo danh sách có thứ tự", "Chèn ảnh nền", "Gõ số 1, 2, 3 vào đầu mỗi dòng"],
          answer: 1, explanation: "Chọn (bôi đen) các đoạn văn bản cần tạo danh sách, sau đó Home › Numbering (Hình 8a.8).", level: "nhan-biet", activity: "th-nhiem-vu-1" },
        { question: "Tệp Phiếu khảo sát được lưu với tên nào?", type: "multiple-choice",
          options: ["TuyenThanhVien.docx", "CLBTinhoc.docx", "PhieuKhaoSat.docx", "KhaoSat.xlsx"],
          answer: 2, explanation: "SGK: chọn File/Save để lưu tệp văn bản với tên PhieuKhaoSat.docx.", level: "nhan-biet", activity: "th-nhiem-vu-1" },
      ],
    },
    {
      id: "cac-buoc-danh-sach", name: "Trò chơi: Sắp xếp các bước tạo Phiếu khảo sát 🔢", type: "ordering",
      goal: "Ghi nhớ quy trình tạo danh sách có thứ tự.",
      time: 180,
      task: "Sắp xếp các bước tạo Phiếu khảo sát có danh sách có thứ tự cho đúng thứ tự rồi bấm Nộp bài.",
      steps: [
        "Nhập nội dung văn bản theo mẫu Hình 8a.1 (Insert/Symbol để nhập ☐)",
        "Chọn các đoạn văn bản muốn tạo danh sách có thứ tự",
        "Chọn thẻ Home",
        "Nháy tam giác nhỏ bên cạnh lệnh Numbering",
        "Chọn kiểu danh sách có thứ tự 1. 2. 3.",
        "Chọn File/Save, lưu tệp với tên PhieuKhaoSat.docx",
      ],
      explanation: "Nhập nội dung → chọn đoạn → Home → Numbering ▾ → chọn kiểu → lưu tệp.",
    },

    /* =========================== TIẾT 2 =========================== */
    {
      id: "th-nhiem-vu-2", name: "Nhiệm vụ 2: Tờ rơi tuyển thành viên — ảnh nền 🖼️", type: "knowledge",
      goal: "Chèn ảnh nền, thay đổi lớp (Behind Text) và kích thước ảnh (Hình 8a.9).",
      time: 600,
      task: "Thử trên mô phỏng: đổi Wrap Text và quan sát ảnh đẩy chữ, che chữ hay nằm dưới chữ; chọn Behind Text rồi kéo góc ảnh cho phủ kín tờ rơi. Sau đó thực hiện trên Word: nhập nội dung như Hình 8a.5, chèn ảnh nền.",
      sgkImage: "assets/sgk/nhiem-vu-2.jpg",
      wrapsim: {
        title: "Wrap Text — đặt ảnh nền cho tờ rơi",
        intro: "Ảnh vừa chèn đang ở chế độ In Line with Text (Hình 8a.9b). Hãy chọn các kiểu Wrap Text để so sánh.",
        img: "assets/nen-to-roi.svg",
        lines: TO_ROI,
        success: "Tuyệt vời! Ảnh nền nằm ở lớp dưới và phủ kín tờ rơi, văn bản nằm ở lớp trên — giống Hình 8a.9d.",
      },
      content: {
        revealLabel: "🔢 Hướng dẫn (SGK tr.40)",
        blocks: [
          { kind: "list", value: [
            "Quan sát tờ rơi mẫu em thấy có các đối tượng: ảnh nền, văn bản, hình đồ hoạ,… Các đối tượng văn bản, hình đồ hoạ nằm bên trên ảnh nền (ảnh nền nằm ở lớp dưới, văn bản và hình đồ hoạ nằm ở lớp trên).",
            "a) Khởi động phần mềm và nhập nội dung văn bản theo mẫu như Hình 8a.5.",
            "b) Nháy chuột vào đầu đoạn văn bản để đặt vị trí chèn ảnh, chọn Insert/Picture, chọn tệp ảnh nền rồi chọn OK để chèn ảnh.",
            "Hình ảnh được chèn vào văn bản (ảnh có thể che mất nội dung văn bản hoặc đẩy nội dung văn bản xuống dưới — Hình 8a.9b). Vì ảnh nền cần nằm dưới văn bản, em nháy chuột chọn ảnh, chọn Format. Trong nhóm lệnh Arrange, nháy chuột vào mũi tên bên cạnh lệnh Wrap Text rồi chọn Behind Text để ảnh nằm ở lớp dưới, văn bản nằm ở lớp trên (Hình 8a.9c).",
            "Thay đổi vị trí và kích thước ảnh để ảnh phủ hết nền của tờ rơi: di chuyển chuột vào hình vuông nhỏ màu trắng nằm ở góc dưới bên phải của ảnh rồi kéo thả chuột (Hình 8a.9d).",
          ] },
          { kind: "image", value: "assets/sgk/hinh-8a-9.jpg", caption: "Hình 8a.9. Các bước chèn, thay đổi lớp và kích thước ảnh" },
        ],
      },
      questions: [
        { question: "Sau khi chèn, ảnh đẩy nội dung văn bản xuống dưới (Hình 8a.9b). Để ảnh nằm ở lớp dưới, văn bản ở lớp trên, em chọn:", type: "multiple-choice",
          options: ["Wrap Text › In Front of Text", "Wrap Text › Square", "Wrap Text › Behind Text", "Home › Numbering"],
          answer: 2, explanation: "Format › Arrange › Wrap Text › Behind Text: ảnh ở lớp dưới, chữ ở lớp trên.", level: "thong-hieu", activity: "th-nhiem-vu-2" },
        { question: "Nếu chọn In Front of Text cho ảnh nền, điều gì xảy ra?", type: "multiple-choice",
          options: ["Ảnh nằm ở lớp trên, che mất nội dung văn bản", "Ảnh tự thu nhỏ lại", "Chữ bao quanh ảnh", "Ảnh bị xoá"],
          answer: 0, explanation: "In Front of Text đặt ảnh ở lớp trên văn bản nên che mất chữ — không phù hợp cho ảnh nền.", level: "van-dung", activity: "th-nhiem-vu-2" },
        { question: "Để thay đổi kích thước ảnh cho phủ kín tờ rơi, em làm thế nào?", type: "multiple-choice",
          options: ["Nhấn phím Enter nhiều lần", "Kéo thả hình vuông nhỏ màu trắng ở góc dưới bên phải của ảnh", "Chọn Home › Bullets", "Nhấn phím Delete"],
          answer: 1, explanation: "Kéo các nút (hình vuông nhỏ) ở góc ảnh để co dãn ảnh.", level: "nhan-biet", activity: "th-nhiem-vu-2" },
      ],
    },
    {
      id: "th-hinh-do-hoa", name: "Nhiệm vụ 2 (tiếp): Hình đồ hoạ và hoàn thiện tờ rơi 🎨", type: "knowledge",
      goal: "Vẽ, đổi màu hình đồ hoạ; chỉnh sửa vị trí, màu sắc đối tượng; chèn ảnh góc (Square); lưu TuyenThanhVien.docx.",
      time: 900,
      task: "Hoàn thiện tờ rơi trên mô phỏng theo mẫu Hình 8a.6 (làm đủ 4 tiêu chí bên phải), rồi thực hiện trên Word và lưu tệp TuyenThanhVien.docx.",
      sgkImage: "assets/sgk/them-hinh-do-hoa.jpg",
      flyer: {
        title: "Hoàn thiện tờ rơi “Tuyển thành viên”",
        intro: "Kéo thả để di chuyển; bấm chọn đối tượng rồi chọn màu, cỡ; Insert › Shapes để vẽ mũi tên cong, Pictures để chèn ảnh góc.",
        bg: "assets/nen-to-roi.svg", pic: "assets/anh-clb.svg",
        texts: [
          { id: "clb", text: "Câu lạc bộ Tin học", x: 0.5, y: 0.06, s: 4.2, color: "#111111" },
          { id: "tuyen", text: "TUYỂN", x: 0.5, y: 0.14, s: 10, color: "#111111", bold: true },
          { id: "tv", text: "THÀNH VIÊN", x: 0.5, y: 0.22, s: 6.2, color: "#111111", bold: true },
          { id: "kh1", text: "Hãy đến với chúng tôi để cùng", x: 0.5, y: 0.3, s: 3.4, color: "#111111" },
          { id: "kh2", text: "nhân rộng niềm đam mê Tin học", x: 0.5, y: 0.335, s: 3.4, color: "#111111" },
          { id: "gio", text: "15h ngày ......", x: 0.5, y: 0.41, s: 4.4, color: "#111111", bold: true },
          { id: "phong", text: "Tại phòng 305", x: 0.5, y: 0.455, s: 4.4, color: "#111111", bold: true },
          { id: "nha", text: "Nhà A", x: 0.5, y: 0.5, s: 4.4, color: "#111111", bold: true },
        ],
        checks: [
          { label: "Dòng chữ “TUYỂN THÀNH VIÊN” đổi sang màu vàng", test: "color", ids: ["tuyen", "tv"], color: YELLOW },
          { label: "“TUYỂN THÀNH VIÊN” nằm trong hình cầu", test: "inCircle", ids: ["tuyen", "tv"], circle: [0.5, 0.388, 0.25] },
          { label: "Có hai mũi tên cong (Curved Right, Curved Left) màu vàng", test: "shapes", shapes: ["curveR", "curveL"], color: YELLOW },
          { label: "Có hình ảnh ở góc trên bên phải", test: "region", type: "pic", rect: [0.62, 0, 1, 0.22] },
        ],
        success: "Tờ rơi đã hoàn chỉnh như mẫu Hình 8a.6! Nhớ lưu tệp TuyenThanhVien.docx khi làm trên Word.",
      },
      content: {
        revealLabel: "🔢 Hướng dẫn (SGK tr.41)",
        blocks: [
          { kind: "list", value: [
            "c) Thêm, thay đổi màu các đối tượng hình đồ hoạ: trong tờ rơi có hai đối tượng đồ hoạ là hai mũi tên cong. Để vẽ mũi tên thứ nhất: 1. Chọn Insert → 2. Nháy chuột vào mũi tên bên dưới lệnh Shapes → 3. Chọn mẫu trong nhóm Block Arrows (Arrow: Curved Right) rồi kéo thả chuột để tạo hình mũi tên trên tờ rơi. Thực hiện tương tự với mẫu Arrow: Curved Left để vẽ thêm hình mũi tên ở bên phải.",
            "Để đổi màu cho đối tượng đồ hoạ, em chọn đối tượng, chọn Format, trong nhóm lệnh Shape Styles, nháy chuột vào mũi tên bên cạnh lệnh Shape Fill. Chọn màu vàng.",
            "Lưu ý: Nếu muốn thay đổi hình ảnh làm nền cho tờ rơi hay mẫu hình đồ hoạ khác, em nháy chuột chọn hình ảnh, hình đồ hoạ rồi nhấn phím Delete. Tiếp theo, thực hiện lại các bước để chèn thêm hình ảnh, hình đồ hoạ mới.",
            "d) Chỉnh sửa vị trí và màu sắc các đối tượng: chỉnh sửa vị trí dòng chữ “TUYỂN THÀNH VIÊN” vào đúng hình cầu trên hình nền, đổi màu chữ đen thành vàng. Chỉnh sửa màu sắc và vị trí các đối tượng văn bản khác sao cho đúng theo mẫu. Chèn thêm hình ảnh vào góc trên bên phải để hoàn thiện tờ rơi; để đặt được hình ảnh vào đúng vị trí, sau khi chèn em chọn Format/Arrange/Wrap Text rồi chọn Square.",
            "e) Lưu tệp: chọn File/Save để lưu tệp văn bản với tên TuyenThanhVien.docx.",
          ] },
          { kind: "image", value: "assets/sgk/hinh-8a-10-11.jpg", caption: "Hình 8a.10. Các bước vẽ hình đồ hoạ · Hình 8a.11. Nhóm Block Arrows" },
        ],
      },
      questions: [
        { question: "Mẫu mũi tên cong Arrow: Curved Right nằm ở đâu?", type: "multiple-choice",
          options: ["Insert › Pictures", "Home › Numbering", "Insert › Shapes › nhóm Block Arrows", "Format › Wrap Text"],
          answer: 2, explanation: "Insert › Shapes (nháy mũi tên bên dưới lệnh) › Block Arrows › Arrow: Curved Right (Hình 8a.10, 8a.11).", level: "nhan-biet", activity: "th-hinh-do-hoa" },
        { question: "Sau khi chèn ảnh vào góc trên bên phải tờ rơi, để đặt ảnh vào đúng vị trí, SGK hướng dẫn chọn Format/Arrange/Wrap Text ›", type: "multiple-choice",
          options: ["Square", "Behind Text", "In Line with Text", "Top and Bottom"],
          answer: 0, explanation: "SGK: chọn Square để đặt được hình ảnh vào đúng vị trí ở góc trên bên phải.", level: "thong-hieu", activity: "th-hinh-do-hoa" },
        { question: "Tờ rơi được lưu với tên tệp nào?", type: "multiple-choice",
          options: ["PhieuKhaoSat.docx", "CLBTinhoc.docx", "ToRoi.pptx", "TuyenThanhVien.docx"],
          answer: 3, explanation: "SGK: chọn File/Save để lưu tệp văn bản với tên TuyenThanhVien.docx.", level: "nhan-biet", activity: "th-hinh-do-hoa" },
      ],
    },
    {
      id: "cac-buoc-to-roi", name: "Trò chơi: Sắp xếp các bước làm tờ rơi 🔢", type: "ordering",
      goal: "Ghi nhớ quy trình chèn ảnh nền và hình đồ hoạ.",
      time: 180,
      task: "Sắp xếp các bước làm tờ rơi tuyển thành viên cho đúng thứ tự rồi bấm Nộp bài.",
      steps: [
        "Nhập nội dung văn bản theo mẫu Hình 8a.5",
        "Insert/Picture — chèn tệp ảnh nền",
        "Format › Arrange › Wrap Text › Behind Text",
        "Kéo hình vuông nhỏ ở góc dưới bên phải để ảnh phủ kín tờ rơi",
        "Insert › Shapes › Block Arrows — vẽ hai mũi tên cong, Shape Fill màu vàng",
        "Chỉnh vị trí, màu chữ theo mẫu; File/Save lưu TuyenThanhVien.docx",
      ],
      explanation: "Nhập nội dung → chèn ảnh → Behind Text → co dãn ảnh → vẽ, tô màu hình đồ hoạ → chỉnh sửa và lưu tệp.",
    },

    /* ===================== HĐ3: LUYỆN TẬP (45 phút) ===================== */
    {
      id: "luyen-tap", name: "Luyện tập: Các công việc của dự án CLB Tin học 🗂️", type: "knowledge",
      goal: "Tạo danh sách có thứ tự kết hợp danh sách dấu đầu dòng theo mẫu Hình 8a.3; lưu CLBTinhoc.docx.",
      time: 900,
      task: "Trên mô phỏng (rồi trên Word): trình bày văn bản giống Hình 8a.3 — 4 nhóm công việc đánh số 1) 2) 3) 4), các công việc con lùi vào một mức (Tab) và có dấu đầu dòng •. Lưu tệp CLBTinhoc.docx.",
      sgkImage: "assets/sgk/luyen-tap.jpg",
      listsim: {
        title: "Trình bày các công việc của dự án như Hình 8a.3",
        intro: "Gợi ý: ☑ Chọn tất cả → Numbering ▾ chọn 1) → chọn các công việc con → ⇥ (Tab) → Bullets •.",
        doc: "CLBTinhoc.docx",
        head: ["Các công việc cần làm cho dự án Thành lập CLB Tin học"],
        items: [
          { text: "Khảo sát", want: 0 }, { text: "Tạo Phiếu khảo sát.", want: 1 }, { text: "Phát Phiếu khảo sát.", want: 1 }, { text: "Thu Phiếu khảo sát.", want: 1 },
          { text: "Xử lí dữ liệu", want: 0 }, { text: "Nhập dữ liệu vào phần mềm bảng tính.", want: 1 }, { text: "Lọc, sắp xếp dữ liệu, tạo biểu đồ.", want: 1 }, { text: "Từ kết quả xử lí đưa ra kết luận.", want: 1 },
          { text: "Quảng cáo và tuyển thành viên", want: 0 }, { text: "Tạo tờ rơi quảng cáo và tuyển thành viên.", want: 1 }, { text: "Phát tờ rơi đến học sinh trong trường.", want: 1 },
          { text: "Tổ chức buổi ra mắt CLB Tin học.", want: 0 }, { text: "Tạo bài trình chiếu.", want: 1 }, { text: "Tạo tài liệu CLB.", want: 1 },
        ],
        goal: [{ kind: "num", fmt: "1)" }, { kind: "bullet", bul: "•" }],
        success: "Hoàn thành! Văn bản đã giống Hình 8a.3: danh sách có thứ tự 1) 2) 3) 4) kết hợp danh sách dấu đầu dòng.",
      },
      html: `<figure style="margin:0 auto;max-width:420px"><img src="assets/sgk/hinh-8a-3.jpg" alt="Hình 8a.3" style="width:100%;border-radius:8px"><figcaption class="caption">Mẫu: Hình 8a.3</figcaption></figure>`,
      questions: [
        { question: "Văn bản Hình 8a.3 sử dụng những kiểu danh sách nào?", type: "multiple-choice",
          options: ["Chỉ danh sách dấu đầu dòng", "Danh sách có thứ tự kết hợp với danh sách dấu đầu dòng", "Chỉ danh sách có thứ tự", "Không dùng danh sách"],
          answer: 1, explanation: "Các nhóm công việc đánh số 1), 2), 3), 4); các công việc con dùng dấu đầu dòng •.", level: "thong-hieu", activity: "luyen-tap" },
        { question: "Trong danh sách 1)–4), em chèn thêm nhóm công việc “Tuyển chọn ban chủ nhiệm CLB” ngay sau nhóm 2). Nhóm “Tổ chức buổi ra mắt CLB Tin học” sẽ mang số nào?", type: "multiple-choice",
          options: ["4)", "3)", "6)", "5)"],
          answer: 3, explanation: "Nhóm mới thành 3), “Quảng cáo và tuyển thành viên” thành 4), “Tổ chức buổi ra mắt” thành 5) — thứ tự tự cập nhật.", level: "van-dung-cao", activity: "luyen-tap" },
      ],
    },
    {
      id: "cham-cheo-to-roi", name: "Phiếu chấm chéo tờ rơi 🤝", type: "checklist",
      goal: "Nhận xét, đánh giá và góp ý sản phẩm tờ rơi của nhóm bạn.",
      time: 600,
      target: "Nhóm em chấm tờ rơi của",
      task: "Xem tờ rơi TuyenThanhVien.docx của nhóm được thầy/cô phân công, ghi số nhóm được chấm, tick từng tiêu chí rồi gửi cho thầy/cô.",
      columns: ["✅ Đạt", "🔧 Chưa đạt"],
      sections: [
        { title: "📋 BẢNG KIỂM", items: [
          "Đủ thông tin: tên CLB, TUYỂN THÀNH VIÊN, khẩu hiệu, thời gian, địa điểm",
          "Ảnh nền nằm ở lớp dưới (Behind Text), phủ kín tờ rơi, chữ vẫn đọc rõ",
          "Có hình đồ hoạ (mũi tên cong) được tô màu phù hợp",
          "Có hình ảnh ở góc trên bên phải, đặt đúng vị trí (Square)",
          "Bố cục cân đối, màu chữ nổi bật trên nền, có tính thẩm mĩ",
          "Lưu đúng tên tệp TuyenThanhVien.docx",
        ] },
      ],
      note: "Góp ý cho nhóm bạn: một điều em thích nhất và một điều nên sửa",
      modelAnswer: [
        "Góp ý cụ thể, lịch sự: nêu điểm tốt trước, rồi đến điểm nên sửa kèm cách sửa.",
        "Lỗi thường gặp: ảnh nền chưa chọn Behind Text nên đẩy chữ xuống hoặc che chữ; ảnh chưa phủ kín trang; chữ màu đen khó đọc trên nền tối; ảnh góc chưa chọn Square nên lệch vị trí; ảnh bị kéo méo.",
      ],
    },

    /* ===================== HĐ4: VẬN DỤNG (5 phút) ===================== */
    {
      id: "van-dung", name: "Vận dụng: Mẫu danh sách của riêng em & tờ rơi CLB 🎯", type: "knowledge",
      goal: "Tạo mẫu dấu đầu dòng, mẫu thứ tự mới; thiết kế tờ rơi cho một CLB của trường.",
      time: 300,
      task: "1) Tìm hiểu cách tạo ba mẫu dấu đầu dòng, mẫu thứ tự mới theo ý thích. 2) Tạo tờ rơi quảng cáo cho CLB Tiếng Anh (hoặc CLB Rubik, CLB bóng rổ,… của trường) có hình ảnh minh hoạ, hình đồ hoạ và các mẫu ở Câu 1. Hoàn thiện ở nhà, gửi sản phẩm qua thư điện tử hoặc Zalo của thầy/cô.",
      sgkImage: "assets/sgk/van-dung.jpg",
      content: {
        revealLabel: "💡 Gợi ý",
        blocks: [
          { kind: "list", value: [
            "Mẫu dấu đầu dòng mới: Home › nháy tam giác nhỏ bên cạnh Bullets › Define New Bullet… › chọn Symbol (kí hiệu) hoặc Picture (hình ảnh) › OK. Ví dụ: ✓ Mẫu 1 · ✧ Mẫu 2 · ➢ Mẫu 3.",
            "Mẫu thứ tự mới: Home › nháy tam giác nhỏ bên cạnh Numbering › Define New Number Format… › chọn kiểu số (Number style), sửa định dạng (Number format), VD “Bước 1:”, “Câu a.” › OK.",
            "Tờ rơi: dùng hình ảnh em tự chụp, tự vẽ hoặc ảnh từ nguồn cho phép sử dụng miễn phí; ghi nguồn nếu cần. Nếu nhờ AI gợi ý nội dung, bố cục thì em vẫn phải tự kiểm tra, chỉnh sửa.",
          ] },
        ],
      },
      questions: [
        { question: "Để tạo một mẫu dấu đầu dòng mới (VD ✓), em chọn Home › Bullets ▾ ›", type: "multiple-choice",
          options: ["Change List Level", "Define New Number Format…", "Define New Bullet…", "Set Numbering Value…"],
          answer: 2, explanation: "Define New Bullet… cho phép chọn kí hiệu (Symbol) hoặc hình ảnh (Picture) làm dấu đầu dòng.", level: "van-dung", activity: "van-dung" },
      ],
    },

    /* ===================== TỔNG KẾT ===================== */
    {
      id: "tong-ket", name: "Tổng kết", type: "summary",
      task: "Cả lớp nhắc lại kiến thức trọng tâm và làm thử thách cuối. Về nhà: hoàn thiện Vận dụng; ôn tập từ đầu năm học chuẩn bị ôn tập học kì I.",
      content: {
        learned: [
          "Hai kiểu danh sách dạng liệt kê: danh sách dấu đầu dòng (Bullets) và danh sách có thứ tự (Numbering) — dấu và số tự động tạo, tự cập nhật.",
          "Tạo danh sách: chọn các đoạn văn bản → Home → Bullets / Numbering ▾ → chọn kiểu.",
          "Ảnh nền: Insert/Picture → Format › Arrange › Wrap Text › Behind Text → kéo góc ảnh cho phủ kín.",
          "Hình đồ hoạ: Insert › Shapes; đổi màu: Format › Shape Styles › Shape Fill; xoá: chọn rồi nhấn Delete.",
        ],
        challenge: [
          { question: "Bạn Lan chèn ảnh nền nhưng ảnh che mất toàn bộ chữ trên tờ rơi. Bạn đã chọn kiểu Wrap Text nào và cần đổi sang kiểu nào?", type: "multiple-choice",
            options: ["Đang Square, đổi sang In Line with Text", "Đang In Front of Text, đổi sang Behind Text", "Đang Behind Text, đổi sang In Front of Text", "Không liên quan đến Wrap Text"],
            answer: 1, explanation: "In Front of Text đặt ảnh ở lớp trên nên che chữ; Behind Text đưa ảnh xuống lớp dưới.", level: "van-dung-cao", activity: "tong-ket" },
          { question: "Hướng dẫn nấu một món ăn gồm 7 bước. Em nên trình bày các bước bằng:", type: "multiple-choice",
            options: ["Danh sách có thứ tự", "Danh sách dấu đầu dòng", "Một đoạn văn dài", "Hình đồ hoạ mũi tên"],
            answer: 0, explanation: "Các bước cần làm theo trình tự → danh sách có thứ tự; khi thêm/bớt bước, số tự cập nhật.", level: "van-dung", activity: "tong-ket" },
        ],
      },
    },
  ],
};

if (typeof module !== "undefined" && module.exports) module.exports = LESSON;
if (typeof window !== "undefined") window.LESSON = LESSON;
