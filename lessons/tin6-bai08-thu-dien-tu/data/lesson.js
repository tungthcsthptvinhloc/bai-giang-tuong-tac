/* ============================================================================
 * BÀI 8 — THƯ ĐIỆN TỬ  (Tin học 6 — Kết nối tri thức)
 * Chủ đề 3: Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin.
 * Bám sát SGK trang 32–36 + Kế hoạch bài dạy (2 tiết) của giáo viên.
 * Chỉ sửa file này để đổi nội dung. Engine app.js không cần sửa.
 * ==========================================================================*/

// ---- Hình 3.9: các thành phần của địa chỉ thư điện tử ----
const ADDR_HTML = `<div style="text-align:center;padding:10px 6px">
  <div style="font-size:clamp(1.6rem,4.6vw,3rem);font-weight:800;letter-spacing:1px;display:inline-flex;flex-wrap:wrap;justify-content:center;gap:4px">
    <span style="background:#e0f2fe;color:#0369a1;border-bottom:5px solid #0ea5e9;border-radius:10px;padding:2px 10px">haiha1704200</span>
    <span style="background:#f1f5f9;color:#111;border-bottom:5px solid #111;border-radius:10px;padding:2px 10px">@</span>
    <span style="background:#fce7f3;color:#be185d;border-bottom:5px solid #db2777;border-radius:10px;padding:2px 10px">gmail.com</span></div>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px;margin-top:14px;font-size:1.05rem;text-align:left">
    <div style="border:2px solid #0ea5e9;border-radius:14px;padding:10px"><b style="color:#0369a1">👤 Tên đăng nhập</b><br>Do người sử dụng tự chọn khi đăng kí tài khoản thư điện tử.</div>
    <div style="border:2px solid #111;border-radius:14px;padding:10px"><b>@ Kí tự bắt buộc</b><br>Ngăn cách tên đăng nhập và địa chỉ máy chủ (đọc là “a còng”).</div>
    <div style="border:2px solid #db2777;border-radius:14px;padding:10px"><b style="color:#be185d">🖥️ Địa chỉ máy chủ thư điện tử</b><br>Do nhà cung cấp dịch vụ quy định.</div></div>
  <div style="margin-top:12px;display:inline-block;background:#fef9c3;border:2px dashed #ca8a04;border-radius:12px;padding:8px 14px;font-size:1.1rem">📌 Mỗi địa chỉ thư điện tử là <b>duy nhất trên toàn cầu</b>. Mật khẩu do người sử dụng tự chọn khi đăng kí.</div></div>`;

// ---- So sánh thư truyền thống và thư điện tử (theo SGK + dự kiến sản phẩm của giáo án) ----
const COMPARE_HTML = `<table style="width:100%;border-collapse:collapse;font-size:1.05rem;background:#fff;border-radius:14px;overflow:hidden">
  <tr style="background:#ffedd5"><th style="padding:8px;text-align:left">Tiêu chí</th><th style="padding:8px">📮 Thư truyền thống</th><th style="padding:8px">📧 Thư điện tử</th></tr>
  ${[["Thời gian gửi – nhận", "Lâu (vài ngày)", "Nhanh, kịp thời"], ["Chi phí", "Tem, phí gửi — khá cao", "Thấp, nhiều dịch vụ miễn phí"], ["Gửi cho nhiều người", "Mỗi bức thư đến một người nhận", "Gửi cùng lúc cho nhiều người"], ["Gửi kèm", "Hạn chế", "Gửi kèm tệp văn bản, âm thanh, hình ảnh…"], ["Lưu trữ, tìm kiếm", "Khó, dễ thất lạc", "Dễ dàng"], ["Điều kiện sử dụng", "Không cần thiết bị điện tử, mạng", "Phải có thiết bị điện tử kết nối mạng"], ["Rủi ro", "Chuyển nhầm, thất lạc", "Virus, thư rác, thư lừa đảo giả mạo"]]
    .map(([a, b, c], i) => `<tr style="background:${i % 2 ? "#fff7ed" : "#fff"}"><td style="padding:8px;font-weight:700">${a}</td><td style="padding:8px;text-align:center">${b}</td><td style="padding:8px;text-align:center">${c}</td></tr>`).join("")}</table>`;

// ---- Ba lá thư mắc lỗi (Luyện tập — giáo án) ----
const MAIL_CARD = (tag, to, subject, body, files) => `<div style="border:2px solid #cbd5e1;border-radius:14px;overflow:hidden;background:#fff">
  <div style="background:#f2f6fc;padding:6px 12px;font-weight:800">Thư ${tag}</div>
  <div style="padding:6px 12px;border-bottom:1px solid #eef2f7"><span style="color:#5f6368">Người nhận</span> ${to}</div>
  <div style="padding:6px 12px;border-bottom:1px solid #eef2f7"><span style="color:#5f6368">Chủ đề</span> ${subject || '<i style="color:#b91c1c">(trống)</i>'}</div>
  <div style="padding:8px 12px;white-space:pre-wrap;font-size:1rem">${body}</div>
  <div style="padding:6px 12px;color:#5f6368;font-size:.95rem">📎 Tệp đính kèm: ${files || "(không có)"}</div></div>`;
const LOI_HTML = `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:12px">
  ${MAIL_CARD("A", "thuyk39@yahoo.com", "", "Chào Thuỳ!\nTớ chia sẻ với bạn cách học thuộc từ mới: mỗi ngày học 5 từ và viết lại 3 lần.\nBạn thân: Hà")}
  ${MAIL_CARD("B", "nam.lop6a@gmail.com", "Gửi bài tập Tin học", "Chào Nam!\nTớ gửi kèm theo thư này bài tập Tin học của nhóm mình nhé.\nHà", "")}
  ${MAIL_CARD("C", "minhtuan@gmail.com", "Chia sẻ kinh nghiệm học tập", "Ê Tuấn, sao mày học dốt thế? Học như tao nè, đọc kĩ SGK là xong.", "")}</div>`;

// ---- Hộp thư mô phỏng (dùng chung cho các hoạt động thực hành) ----
const INBOX = [
  { from: "Thanh Nam Phạm", addr: "thanhnam.pham@gmail.com", subject: "Phiếu học tập", time: "07:45", star: true,
    body: "Chào {ten}!\nMình gửi bạn phiếu học tập Tin học tuần này. Bạn làm xong thì nộp cho cô trước thứ Sáu nhé.\nNam", files: [{ name: "Phieu_hoc_tap_Tin6.docx" }] },
  { from: "Nguyễn Thị Thuỳ", addr: "thuyk39@yahoo.com", subject: "Thư hỏi thăm bạn", time: "06:30",
    body: "{ten} thân mến!\nTớ đã quen với trường mới rồi, các bạn ở đây rất vui vẻ. Tớ vẫn nhớ lớp mình lắm.\nKhi nào rảnh cậu viết thư kể cho tớ nghe chuyện lớp mình nhé!\nBạn thân: Thuỳ" },
  { from: "Cô giáo chủ nhiệm 6A", addr: "gvcn.lop6a@gmail.com", subject: "Ảnh tập thể lớp 6A ngày khai trường", time: "Hôm qua",
    body: "Chào các em!\nCô gửi các em ảnh tập thể lớp ngày khai trường để làm kỉ niệm.\nChúc các em một năm học thật vui!", files: [{ name: "Anh_tap_the_6A.jpg" }] },
  { from: "Ban Tổ Chức Trúng Thưởng", addr: "trungthuong.usa@gmaill.com", subject: "Bạn đã trúng một chuyến đi miễn phí đến Mĩ!!!", time: "Hôm qua",
    body: "CHÚC MỪNG!!! Bạn là người may mắn trúng chuyến du lịch Mĩ miễn phí.\nHãy nháy vào nút bên dưới và nhập tên đăng nhập, MẬT KHẨU hộp thư để xác nhận trong 24 giờ, nếu không phần thưởng sẽ bị huỷ!", trap: "✈️ Xác nhận nhận thưởng ngay" },
  { from: "Khuyen Mai Sieu Hot", addr: "qua-tang-free@khuyenmai-hot.xyz", subject: "Quà tặng miễn phí, hãy nháy chuột nhanh", time: "Thứ Hai", spam: true,
    body: "Quà tặng miễn phí đang chờ bạn! Chỉ cần nháy chuột thật nhanh để nhận ngay điện thoại mới.", trap: "🎁 NHẬN QUÀ NGAY", files: [{ name: "qua_tang.exe" }] },
  { from: "Câu lạc bộ Tin học", addr: "clbtinhoc.thcs@gmail.com", subject: "Danh sách học sinh tham gia thi học sinh giỏi môn Tin học", time: "Thứ Hai",
    body: "Chào các bạn!\nCLB gửi danh sách học sinh tham gia thi học sinh giỏi môn Tin học. Các bạn có tên nhớ đến phòng máy lúc 15 giờ thứ Tư nhé.\nBan chủ nhiệm CLB" },
];
const ME = { name: "Hà Hoàng Hải", address: "haiha1704200@gmail.com" };
const FILES = ["Anh_tap_the_6A.jpg", "Thiep_chuc_mung.png", "Anh_gia_dinh.jpg", "Bai_tap_Tin_hoc.docx", "Kinh_nghiem_hoc_tap.docx"];
const GMAIL = "https://mail.google.com/";

const LESSON = {
  meta: {
    subject: "Tin học", grade: "6", book: "Kết nối tri thức với cuộc sống",
    title: "Bài 8: Thư điện tử", unit: "Chủ đề 3 — Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin",
    pages: "32–36", durationMinutes: 90,
  },
  objectives: {
    knowledge: [
      "Biết thư điện tử là gì; biết ưu điểm và nhược điểm cơ bản của dịch vụ thư điện tử so với các phương thức liên lạc khác.",
      "Biết tài khoản thư điện tử, hộp thư điện tử, các thành phần của địa chỉ thư điện tử.",
      "Biết cách đăng kí tài khoản thư điện tử; thực hiện được việc đăng nhập, soạn, gửi, đăng xuất hộp thư điện tử.",
    ],
    competencies: [
      "Tự chủ và tự học; giao tiếp và hợp tác (trao đổi qua thư điện tử); giải quyết vấn đề và sáng tạo.",
      "Năng lực số 2.1.TC1a/b: soạn, gửi, nhận, trả lời thư đúng quy trình; chọn thư điện tử cho tình huống phù hợp.",
      "Năng lực số 2.2.TC1a/b: gửi thư kèm tệp; không chia sẻ mật khẩu, thông tin cá nhân; nhận biết thư rác, thư lừa đảo; đăng xuất khi dùng máy chung.",
      "Năng lực số 2.4.TC1a: trao đổi bài tập, phản hồi ý kiến với bạn và giáo viên qua thư điện tử.",
      "Năng lực AI 6.A3.1: dùng AI hỗ trợ tìm hiểu, kiểm tra chính tả thư; luôn kiểm chứng và không đưa mật khẩu cho AI.",
    ],
    qualities: ["Chăm chỉ; trách nhiệm (dùng thư điện tử an toàn, đúng mục đích); trung thực; nhân ái (ngôn ngữ lịch sự, văn minh)."],
  },
  coreKnowledge: [
    "Thư điện tử là thư được gửi và nhận bằng phương tiện điện tử. Dịch vụ thư điện tử cung cấp các chức năng soạn, gửi, nhận, chuyển tiếp, lưu trữ và quản lí thư điện tử.",
    "Khi đăng kí tài khoản thư điện tử, người sử dụng có một hộp thư điện tử cùng địa chỉ thư và mật khẩu.",
    "Địa chỉ thư điện tử có dạng <tên đăng nhập>@<địa chỉ máy chủ thư điện tử>; mỗi địa chỉ là duy nhất trên toàn cầu.",
    "Ưu điểm: chi phí thấp, tiết kiệm thời gian, thuận tiện. Nhược điểm: phải có phương tiện điện tử kết nối mạng, có thể gặp nguy cơ, phiền toái (virus, thư rác, thư lừa đảo).",
    "Thực hành: đăng nhập → xem, soạn thư (người nhận, chủ đề, nội dung, tệp đính kèm) → Gửi → Đăng xuất khi không dùng hộp thư.",
  ],
  keywords: ["Thư điện tử (email)", "Tài khoản – Hộp thư", "tên đăng nhập@máy chủ", "Thư rác", "Đăng xuất"],
  settings: { basePoints: 100, useTimer: false, defaultTime: 60, sound: true, streakEnabled: true },

  activities: [
    /* ===================== HĐ1: MỞ ĐẦU (5 phút) ===================== */
    {
      id: "mo-dau", name: "Mở đầu — Ba hình ảnh cho em biết điều gì? 🕊️📮💻", type: "knowledge",
      goal: "Nhận biết các phương thức gửi thư từ xưa đến nay; thấy nhu cầu tìm hiểu thư điện tử.",
      time: 240,
      task: "Nhóm quan sát 3 hình ảnh, trả lời: Có các phương thức liên lạc nào? Ngày nay phương thức nào phổ biến nhất?",
      sgkImage: "assets/sgk/sgk-trang32.jpg",
      content: {
        heading: "🕊️📮💻 Ba hình ảnh sau cho em biết điều gì?",
        image: "assets/sgk/ba-hinh-anh.jpg", imageCaption: "Hình 1 · Hình 2 · Hình 3 (SGK tr.32)",
        revealLabel: "🔍 Các phương thức gửi thư từ xưa đến nay",
        blocks: [
          { kind: "list", value: ["Hình 1: Dùng chim bồ câu đưa thư.", "Hình 2: Thả thư vào hộp thư bên đường hoặc ở bưu điện (thư bưu điện).", "Hình 3: Dùng máy tính có kết nối mạng để gửi thư — thư điện tử."] },
          { kind: "text", value: "Dùng máy tính có kết nối mạng để gửi thư (thư điện tử) là phương thức liên lạc qua thư phổ biến nhất hiện nay." },
        ],
      },
      questions: [
        { question: "Ngày nay, phương thức gửi thư nào phổ biến nhất?", type: "multiple-choice",
          options: ["Dùng chim bồ câu đưa thư", "Thả thư vào hộp thư bưu điện", "Nhờ người quen mang thư đến tận nhà", "Dùng máy tính (điện thoại) có kết nối mạng để gửi thư điện tử"],
          answer: 3, explanation: "Thư điện tử — gửi bằng máy tính, điện thoại có kết nối mạng — là phương thức phổ biến nhất hiện nay.",
          level: "nhan-biet", activity: "mo-dau" },
      ],
    },
    {
      id: "xua-nay", name: "Trò chơi: Gửi thư từ xưa đến nay ⏳", type: "ordering",
      goal: "Sắp xếp các phương thức gửi thư theo thời gian.",
      time: 90,
      task: "Sắp xếp các phương thức gửi thư từ xưa đến nay rồi bấm Nộp bài.",
      steps: ["🕊️ Dùng chim bồ câu đưa thư", "📮 Gửi thư qua bưu điện", "📧 Gửi thư điện tử bằng máy tính có kết nối mạng"],
      explanation: "Chim bồ câu đưa thư → thư bưu điện → thư điện tử (email).",
    },

    /* ===================== HĐ2.1: THƯ ĐIỆN TỬ. TÀI KHOẢN THƯ ĐIỆN TỬ (25 phút) ===================== */
    {
      id: "thu-buu-dien", name: "Nhiệm vụ 1: Gửi một bức thư qua bưu điện 📮", type: "knowledge",
      goal: "Nêu được những gì cần chuẩn bị và cách gửi thư qua bưu điện; nhận ra hạn chế về thời gian, bảo mật.",
      time: 240,
      task: "Thảo luận nhóm (Hoạt động 1 — SGK tr.32): Để gửi một bức thư qua bưu điện đến tay người nhận cần những gì, thực hiện như thế nào? Gửi như vậy có nhanh, có bảo mật không?",
      sgkImage: "assets/sgk/sgk-trang32.jpg",
      content: {
        heading: "📮 Gửi thư qua đường bưu điện",
        revealLabel: "🔍 Dự kiến câu trả lời",
        blocks: [
          { kind: "list", value: ["Chuẩn bị: lá thư, bì thư, tem, phí gửi.", "Cách gửi: viết thư → bỏ vào bì thư, ghi địa chỉ người nhận → dán tem → mang ra bưu điện, trả phí gửi → bưu điện chuyển thư bằng xe máy, ô tô, máy bay… đến người nhận.", "Hạn chế: thời gian lâu, có thể bị thất lạc thư."] },
        ],
      },
      questions: [
        { question: "Để gửi một bức thư qua bưu điện, em cần chuẩn bị những gì? (Chọn tất cả đáp án đúng)", type: "multiple-select",
          options: ["Lá thư", "Máy tính có kết nối Internet", "Bì thư có ghi địa chỉ người nhận", "Tem và phí gửi"],
          answer: [0, 2, 3], explanation: "Thư bưu điện cần lá thư, bì thư ghi địa chỉ người nhận, tem và phí gửi — không cần máy tính.",
          level: "nhan-biet", activity: "thu-buu-dien" },
        { question: "Gửi thư qua bưu điện luôn đến rất nhanh và không bao giờ bị thất lạc.", type: "true-false", answer: false,
          explanation: "Sai. Thư bưu điện mất nhiều thời gian (vài ngày) và có thể bị chuyển nhầm, thất lạc.",
          level: "thong-hieu", activity: "thu-buu-dien" },
      ],
    },
    {
      id: "thu-dien-tu", name: "Nhiệm vụ 2: Thư điện tử & địa chỉ thư điện tử 📧", type: "knowledge",
      goal: "Nêu được thư điện tử, dịch vụ thư điện tử, tài khoản; phân tích các thành phần của địa chỉ thư điện tử.",
      time: 360,
      task: "Nhóm đọc SGK tr.32–33: Thư điện tử là gì? Dịch vụ thư điện tử là gì? Xem Hình 3.9, phân tích các thành phần của địa chỉ thư.",
      sgkImage: "assets/sgk/sgk-trang33.jpg",
      content: {
        heading: "📧 Thư điện tử. Tài khoản thư điện tử",
        revealLabel: "🔍 Kiến thức (SGK tr.32–33)",
        blocks: [
          { kind: "list", value: [
            "Thư điện tử (email hay e-mail) là thư được gửi và nhận bằng phương tiện điện tử — một trong những hình thức trao đổi thông tin được rất nhiều người sử dụng.",
            "Dịch vụ thư điện tử cung cấp các chức năng soạn thảo, gửi, nhận, chuyển tiếp, lưu trữ và quản lí thư điện tử cho người sử dụng.",
            "Người sử dụng đăng kí với nhà cung cấp dịch vụ để mở tài khoản thư điện tử (trả phí hoặc miễn phí — ví dụ: Google, Yahoo, Microsoft…).",
            "Có tài khoản → được cấp một hộp thư điện tử trên máy chủ, cùng tên đăng nhập và mật khẩu; hộp thư gắn với một địa chỉ thư điện tử.",
          ] },
          { kind: "html", value: ADDR_HTML },
          { kind: "image", value: "assets/sgk/hinh-3-9.jpg", caption: "Hình 3.9. Các thành phần của địa chỉ thư điện tử" },
        ],
      },
      questions: [
        { question: "Thư điện tử là gì?", type: "multiple-choice",
          options: ["Thư viết tay được gửi qua bưu điện", "Thư được gửi và nhận bằng phương tiện điện tử", "Tin nhắn trên mạng xã hội", "Thư do chim bồ câu mang đi"],
          answer: 1, explanation: "Thư điện tử (email) là thư được gửi và nhận bằng phương tiện điện tử.",
          level: "nhan-biet", activity: "thu-dien-tu" },
        { question: "Dịch vụ thư điện tử là gì?", type: "multiple-choice",
          options: ["Dịch vụ bán máy tính và điện thoại", "Dịch vụ chuyển phát thư bằng xe máy", "Dịch vụ cung cấp các chức năng soạn thảo, gửi, nhận, chuyển tiếp, lưu trữ và quản lí thư điện tử", "Dịch vụ tìm kiếm thông tin trên Internet"],
          answer: 2, explanation: "Dịch vụ thư điện tử cung cấp các chức năng soạn thảo, gửi, nhận, chuyển tiếp, lưu trữ và quản lí thư điện tử cho người sử dụng.",
          level: "nhan-biet", activity: "thu-dien-tu" },
        { question: "Địa chỉ thư điện tử nào sau đây KHÔNG đúng? (Câu hỏi SGK tr.33)", type: "multiple-choice",
          options: ["khoa123@gmail.com", "minhtuan.gmail.com", "nmha@hnmu.edu.vn", "thuyk39@yahoo.com"],
          answer: 1, explanation: "minhtuan.gmail.com sai vì thiếu kí tự bắt buộc @ (dấu chấm không thay được @).",
          level: "thong-hieu", activity: "thu-dien-tu" },
        { question: "Trong địa chỉ haiha1704200@gmail.com, phần do NHÀ CUNG CẤP DỊCH VỤ quy định là:", type: "multiple-choice",
          options: ["gmail.com", "haiha1704200", "@", "Cả địa chỉ"],
          answer: 0, explanation: "Địa chỉ máy chủ thư điện tử (gmail.com) do nhà cung cấp dịch vụ quy định; tên đăng nhập do người dùng tự chọn.",
          level: "thong-hieu", activity: "thu-dien-tu" },
      ],
      remember: [
        "Thư điện tử là thư được gửi và nhận bằng phương tiện điện tử.",
        "Khi đăng kí tài khoản thư điện tử, người sử dụng có một hộp thư điện tử cùng địa chỉ thư và mật khẩu.",
        "Địa chỉ thư điện tử có dạng: <tên đăng nhập>@<địa chỉ máy chủ thư điện tử>.",
        "Dịch vụ thư điện tử cung cấp các chức năng để soạn, gửi, nhận, chuyển tiếp, lưu trữ và quản lí thư điện tử.",
      ],
    },
    {
      id: "thanh-phan", name: "Ghép thành phần của tài khoản thư 🧩", type: "matching",
      goal: "Biết ai quy định từng thành phần của địa chỉ, tài khoản thư điện tử.",
      time: 120,
      task: "Ghép mỗi thành phần với ý đúng về nó. Làm hết rồi bấm Nộp bài.",
      pairs: [
        { left: "Tên đăng nhập", right: "Do người sử dụng tự chọn khi đăng kí" },
        { left: "Địa chỉ máy chủ thư điện tử", right: "Do nhà cung cấp dịch vụ quy định" },
        { left: "Kí tự @", right: "Kí tự bắt buộc, ngăn cách hai phần của địa chỉ" },
        { left: "Mật khẩu", right: "Người dùng tự đặt khi đăng kí, phải giữ bí mật" },
      ],
      explanation: "Địa chỉ = <tên đăng nhập>@<địa chỉ máy chủ thư điện tử>; mật khẩu do người dùng tự chọn và phải giữ bí mật.",
    },
    {
      id: "dia-chi-dung-sai", name: "Trò chơi: Địa chỉ thư đúng hay sai? ✅❌", type: "dragdrop",
      goal: "Nhận biết địa chỉ thư điện tử hợp lệ.",
      time: 150,
      task: "Xếp mỗi địa chỉ vào đúng nhóm. Xếp hết rồi bấm Nộp bài.",
      groups: ["✅ Địa chỉ thư điện tử đúng", "❌ Không phải địa chỉ thư điện tử đúng"],
      items: [
        { text: "khoa123@gmail.com", group: 0 },
        { text: "minhtuan.gmail.com", group: 1 },
        { text: "nmha@hnmu.edu.vn", group: 0 },
        { text: "www.nxbgd.vn", group: 1 },
        { text: "thu_hoai.432@yahoo.com", group: 0 },
        { text: "Hoangth&hotmail.coim", group: 1 },
        { text: "thuyk39@yahoo.com", group: 0 },
        { text: "Hoa675439@gf@gmail.com", group: 1 },
      ],
      explanation: "Địa chỉ đúng có đúng MỘT kí tự @ ở giữa: <tên đăng nhập>@<địa chỉ máy chủ>. www.nxbgd.vn là địa chỉ trang web; & không thay được @; hai dấu @ là sai.",
    },

    /* ===================== HĐ2.2: ƯU ĐIỂM VÀ NHƯỢC ĐIỂM (15 phút) ===================== */
    {
      id: "uu-nhuoc", name: "Trò chơi tiếp sức: Ưu điểm hay nhược điểm? ⚖️", type: "dragdrop",
      goal: "Nêu được ưu điểm và nhược điểm của dịch vụ thư điện tử so với các phương thức liên lạc khác.",
      time: 180,
      task: "Đọc mục 2 SGK (2 phút). Hai đội thi xếp nhanh, đúng các thẻ vào Ưu điểm / Nhược điểm của dịch vụ thư điện tử (3 phút).",
      sgkImage: "assets/sgk/sgk-trang33.jpg",
      groups: ["👍 Ưu điểm", "👎 Nhược điểm"],
      items: [
        { text: "⚡ Thời gian gửi và nhận nhanh, kịp thời", group: 0 },
        { text: "🌐 Phải kết nối mạng mới sử dụng được", group: 1 },
        { text: "👥 Có thể gửi thư cùng lúc cho nhiều người", group: 0 },
        { text: "🦠 Có thể kèm theo virus máy tính", group: 1 },
        { text: "📎 Gửi kèm được tệp văn bản, âm thanh, hình ảnh…", group: 0 },
        { text: "🗑️ Có thể bị làm phiền với các thư rác", group: 1 },
        { text: "🔎 Lưu trữ và tìm kiếm thư đã gửi, đã nhận dễ dàng", group: 0 },
        { text: "🎣 Có thể bị lừa đảo bởi các thư giả mạo", group: 1 },
        { text: "💰 Chi phí thấp, có nhiều dịch vụ thư điện tử miễn phí", group: 0 },
      ],
      explanation: "Ưu điểm: chi phí thấp, tiết kiệm thời gian, thuận tiện. Nhược điểm: phải dùng phương tiện điện tử kết nối mạng, có thể gặp một số nguy cơ, phiền toái.",
      remember: ["Ưu điểm của dịch vụ thư điện tử: chi phí thấp, tiết kiệm thời gian, thuận tiện…", "Nhược điểm: phải sử dụng phương tiện điện tử kết nối mạng, có thể gặp một số nguy cơ, phiền toái."],
    },
    {
      id: "so-sanh", name: "Thư truyền thống và thư điện tử 📮↔📧", type: "knowledge",
      goal: "So sánh thư truyền thống với thư điện tử; thấy thư điện tử khắc phục hạn chế của thư truyền thống.",
      time: 240,
      task: "Nhóm đôi trả lời câu hỏi SGK tr.34: Nêu ưu điểm và hạn chế của dịch vụ thư truyền thống. Các điểm đó đã thay đổi thế nào khi dùng thư điện tử?",
      sgkImage: "assets/sgk/sgk-trang34.jpg",
      content: {
        heading: "📮↔📧 So sánh hai dịch vụ thư",
        revealLabel: "📊 Xem bảng so sánh",
        blocks: [
          { kind: "html", value: COMPARE_HTML },
          { kind: "text", value: "Thư điện tử ra đời giúp khắc phục nhiều hạn chế của thư truyền thống: số thư gửi qua bưu điện giảm nhiều, chi phí vận chuyển cũng giảm đáng kể. Lưu ý: không sử dụng thư điện tử vào mục đích không lành mạnh, vi phạm pháp luật." },
        ],
      },
      questions: [
        { question: "Ưu điểm nào sau đây là của thư TRUYỀN THỐNG (thư bưu điện)?", type: "multiple-choice",
          options: ["Gửi cùng lúc cho nhiều người", "Không cần thiết bị điện tử và kết nối mạng", "Chi phí thấp, miễn phí", "Nhận được ngay sau vài giây"],
          answer: 1, explanation: "Thư truyền thống được chuyển bằng máy bay, tàu, xe, người… tới mọi nơi mà không cần thiết bị điện tử, kết nối mạng.",
          level: "thong-hieu", activity: "so-sanh" },
        { question: "Lớp em cần gửi thông báo họp phụ huynh cho 40 gia đình ngay trong tối nay. Cách nào phù hợp nhất?", type: "multiple-choice",
          options: ["Viết 40 bức thư gửi bưu điện", "Nhờ chim bồ câu đưa thư", "Gửi một thư điện tử cùng lúc tới 40 địa chỉ", "Gọi điện cho từng gia đình vào tuần sau"],
          answer: 2, explanation: "Thư điện tử gửi cùng lúc cho nhiều người, nhanh và chi phí thấp — thư truyền thống chỉ gửi được đến một người nhận mỗi bức.",
          level: "van-dung", activity: "so-sanh" },
      ],
    },

    /* ===================== HĐ2.3: THỰC HÀNH (25 phút) ===================== */
    {
      id: "tao-tai-khoan", name: "Thực hành a) Tạo tài khoản thư điện tử 🆕", type: "knowledge",
      goal: "Biết các bước đăng kí tài khoản thư điện tử.",
      time: 360,
      task: "Trên hộp thư mô phỏng: bấm “Tạo tài khoản”, điền họ tên, tên người dùng, mật khẩu (mô phỏng — không dùng mật khẩu thật) cho đến khi thấy “Chào mừng bạn!”.",
      sgkImage: "assets/sgk/hinh-3-10.jpg",
      links: [{ label: "Mở Gmail thật (mail.google.com)", url: GMAIL, note: "(tab mới — chỉ dùng khi có tài khoản và được phụ huynh đồng ý)" }],
      mail: { key: "gmail", me: ME, login: true, signup: true, inbox: INBOX, files: FILES,
        intro: "🧪 Hộp thư mô phỏng giống Gmail. Thư gửi trong mô phỏng không đi ra Internet." },
      content: {
        heading: "🆕 Tạo tài khoản thư điện tử",
        revealLabel: "🪜 Các bước (SGK tr.34)",
        blocks: [
          { kind: "list", value: ["1. Truy cập trang mail.google.com.", "2. Nháy chuột vào nút Tạo tài khoản.", "3. Nhập đầy đủ thông tin vào các dòng trên cửa sổ theo hướng dẫn.", "4. Nháy chuột vào nút Tiếp theo.", "5. Xác nhận số điện thoại (nếu có).", "6. Thực hiện theo hướng dẫn.", "7. Cuối cùng xuất hiện thông báo Chào mừng bạn!"] },
          { kind: "text", value: "Lưu ý: Theo quy định của Google, trẻ vị thành niên cần có sự đồng ý, trợ giúp và quản lí của phụ huynh nếu muốn đăng kí tài khoản thư điện tử. Em cần ghi nhớ tên đăng nhập và mật khẩu truy cập." },
          { kind: "image", value: "assets/sgk/hinh-3-10.jpg", caption: "Hình 3.10. Tạo tài khoản" },
        ],
      },
      questions: [
        { question: "Khi tạo tài khoản thư điện tử, thông tin nào em PHẢI ghi nhớ để đăng nhập về sau?", type: "multiple-choice",
          options: ["Màu nền của trang web", "Tên đăng nhập và mật khẩu", "Giờ tạo tài khoản", "Tên máy tính đang dùng"],
          answer: 1, explanation: "Em cần ghi nhớ tên đăng nhập và mật khẩu truy cập (SGK tr.34).", level: "nhan-biet", activity: "tao-tai-khoan" },
        { question: "Mật khẩu nào sau đây AN TOÀN hơn theo gợi ý của Google (8 kí tự trở lên, kết hợp chữ cái, chữ số và biểu tượng)?", type: "multiple-choice",
          options: ["12345678", "haha", "Meo#Con2024", "matkhau"],
          answer: 2, explanation: "Meo#Con2024 dài hơn 8 kí tự, có chữ hoa, chữ thường, chữ số và biểu tượng — khó đoán hơn.", level: "van-dung", activity: "tao-tai-khoan" },
      ],
    },
    {
      id: "dang-nhap", name: "Thực hành b) Đăng nhập, xem thư, đăng xuất 🔐", type: "knowledge",
      goal: "Thực hiện được đăng nhập hộp thư, mở thư và đăng xuất.",
      time: 360,
      task: "Trên hộp thư mô phỏng: đăng nhập → mở thư “Phiếu học tập” của Thanh Nam Phạm → gắn dấu sao ⭐ một thư → đăng xuất (bấm vào biểu tượng tên ở góc phải).",
      sgkImage: "assets/sgk/hinh-3-12.jpg",
      mail: { key: "gmail", me: ME, login: true, signup: true, inbox: INBOX, files: FILES },
      content: {
        heading: "🔐 Đăng nhập hộp thư, xem nội dung thư, đăng xuất",
        revealLabel: "🪜 Các bước (SGK tr.34–35)",
        blocks: [
          { kind: "list", value: ["1. Truy cập trang mail.google.com.", "2. Đăng nhập vào hộp thư: chọn tên đăng nhập → nhập mật khẩu → nháy Tiếp theo (hoặc nhấn Enter).", "3. Hộp thư mở ra với danh sách các thư trong Hộp thư đến.", "4. Nháy chuột vào Tên người gửi hoặc Tiêu đề thư để mở thư.", "5. Nháy chuột vào nút Đăng xuất để ra khỏi hộp thư điện tử."] },
          { kind: "image", value: "assets/sgk/hinh-3-11.jpg", caption: "Hình 3.11. Đăng nhập hộp thư" },
          { kind: "image", value: "assets/sgk/hinh-3-12.jpg", caption: "Hình 3.12. Xem nội dung thư, đăng xuất" },
        ],
      },
      questions: [
        { question: "Để mở một bức thư trong Hộp thư đến, em nháy chuột vào đâu?", type: "multiple-choice",
          options: ["Nút Soạn thư", "Biểu tượng tên ở góc phải", "Tên người gửi hoặc tiêu đề thư", "Ô Tìm kiếm trong thư"],
          answer: 2, explanation: "Nháy chuột vào tên người gửi hoặc tiêu đề thư để mở thư (Hình 3.12).", level: "nhan-biet", activity: "dang-nhap" },
        { question: "Em dùng máy tính ở phòng máy của trường để xem thư. Xem xong em nên làm gì?", type: "multiple-choice",
          options: ["Tắt màn hình là đủ", "Nháy vào biểu tượng tên rồi chọn Đăng xuất", "Để nguyên cho bạn sau dùng tiếp", "Ghi mật khẩu lên bàn phím để lần sau nhớ"],
          answer: 1, explanation: "Đăng xuất khi không dùng hộp thư để tránh bị người khác sử dụng.", level: "van-dung", activity: "dang-nhap" },
      ],
      remember: ["Đăng xuất khi không dùng hộp thư điện tử để tránh bị người khác sử dụng."],
    },
    {
      id: "cac-buoc-soan", name: "Sắp xếp các bước soạn thư mới và gửi 🪜", type: "ordering",
      goal: "Nắm quy trình soạn và gửi thư (Hình 3.13).",
      time: 120,
      task: "Sắp xếp các bước soạn thư mới và gửi theo đúng thứ tự rồi bấm Nộp bài.",
      steps: ["Nháy chuột vào Soạn thư", "Nhập địa chỉ hộp thư người nhận", "Nhập tiêu đề thư (Chủ đề)", "Nhập nội dung thư", "Gửi kèm tệp (nếu có) bằng nút 📎", "Nháy chuột vào nút Gửi"],
      explanation: "Soạn thư → người nhận → chủ đề → nội dung → đính kèm (nếu có) → Gửi (Hình 3.13).",
    },
    {
      id: "soan-thu", name: "Thực hành c) Soạn thư mới và gửi ✉️", type: "knowledge",
      goal: "Soạn và gửi được thư điện tử đúng quy trình.",
      time: 480,
      task: "Viết thư trả lời bạn Thuỳ (thuyk39@yahoo.com), chủ đề “Thư hỏi thăm bạn”: có lời chào, nội dung, kí tên. Bấm Gửi — thư được chuyển tới thầy/cô.",
      sgkImage: "assets/sgk/hinh-3-13.jpg",
      mail: { key: "gmail", me: ME, login: true, signup: true, inbox: INBOX, files: FILES,
        check: { to: "thuyk39@yahoo.com" }, submit: "Thư hỏi thăm bạn Thuỳ (Thực hành c)" },
      content: {
        heading: "✉️ Soạn thư mới và gửi",
        revealLabel: "🖼️ Hình 3.13 — Soạn thư mới và gửi",
        blocks: [{ kind: "image", value: "assets/sgk/hinh-3-13.jpg", caption: "Hình 3.13. Soạn thư mới và gửi" }],
      },
      remember: ["Soạn thư: Soạn thư → Người nhận → Chủ đề → Nội dung → (📎 Gửi kèm tệp) → Gửi."],
    },

    /* ===================== HĐ3: LUYỆN TẬP (15 phút) ===================== */
    {
      id: "tim-loi", name: "Luyện tập: Bắt lỗi lá thư 🔍", type: "knowledge",
      goal: "Phát hiện và sửa lỗi thường gặp khi gửi thư: thiếu tiêu đề, quên đính kèm, ngôn ngữ thiếu lịch sự.",
      time: 240,
      task: "Đọc 3 lá thư A, B, C của bạn Hà gửi đi. Mỗi thư mắc lỗi gì? Sửa thế nào?",
      content: {
        heading: "🔍 Mỗi lá thư mắc lỗi gì?",
        revealLabel: "📨 Xem 3 lá thư",
        blocks: [{ kind: "html", value: LOI_HTML }],
      },
      questions: [
        { question: "Thư A mắc lỗi gì?", type: "multiple-choice",
          options: ["Sai địa chỉ người nhận", "Không có tiêu đề (Chủ đề)", "Ngôn ngữ thiếu lịch sự", "Quên đính kèm tệp"],
          answer: 1, explanation: "Ô Chủ đề của thư A đang trống. Thư cần tiêu đề ngắn gọn, nói rõ nội dung, vd: “Chia sẻ kinh nghiệm học tập”.", level: "thong-hieu", activity: "tim-loi" },
        { question: "Thư B mắc lỗi gì?", type: "multiple-choice",
          options: ["Không có lời chào", "Không có tiêu đề", "Nói “gửi kèm theo thư” nhưng quên đính kèm tệp", "Sai địa chỉ người nhận"],
          answer: 2, explanation: "Thư B nhắc tới bài tập gửi kèm nhưng mục Tệp đính kèm trống — trước khi gửi phải kiểm tra lại tệp đính kèm.", level: "thong-hieu", activity: "tim-loi" },
        { question: "Thư C mắc lỗi gì?", type: "multiple-choice",
          options: ["Dùng ngôn ngữ thiếu lịch sự, xúc phạm người nhận", "Không có tiêu đề", "Quên đính kèm tệp", "Địa chỉ người nhận thiếu @"],
          answer: 0, explanation: "Thư C xưng hô “mày – tao”, chê bạn “học dốt”. Cần dùng lời lẽ lịch sự, văn minh: lời chào, xưng hô đúng mực, cảm ơn cuối thư.", level: "van-dung", activity: "tim-loi" },
      ],
      remember: ["Thư cần có tiêu đề, lời chào, nội dung ngắn gọn, cảm ơn / kí tên cuối thư.", "Kiểm tra kĩ người nhận và tệp đính kèm trước khi gửi.", "Không chia sẻ thông tin cá nhân, mật khẩu qua thư điện tử."],
    },
    {
      id: "tro-choi", name: "Trò chơi: Thư về đúng hộp 📬", type: "penguin",
      pet: "✉️", homeIcon: "📬", enemy: "👾", saveWord: "lá thư về đúng hộp thư",
      winText: "Tất cả thư đã đến nơi an toàn — không để virus 👾 chen vào!",
      goal: "Củng cố kiến thức: Luyện tập SGK tr.36 và các câu ôn tập.",
      time: 300,
      task: "Trả lời đúng mỗi câu để đưa một lá thư về đúng hộp thư!",
      intro: "Mỗi câu đúng: một lá thư ✉️ về hộp thư 📬. Sai thì virus 👾 lao tới!",
      questions: [
        { question: "Thư điện tử có hạn chế nào dưới đây so với các hình thức gửi thư khác? (Luyện tập 1)", type: "multiple-choice",
          options: ["Không đồng thời gửi được cho nhiều người", "Thời gian gửi thư lâu", "Phải phòng tránh virus, thư rác", "Chi phí thấp"],
          answer: 2, explanation: "Thư điện tử có thể kèm virus, thư rác nên phải phòng tránh. Gửi cho nhiều người, nhanh, chi phí thấp là ưu điểm.", level: "thong-hieu", activity: "tro-choi" },
        { question: "Một người có thể mở được nhiều tài khoản thư điện tử. (Luyện tập 2)", type: "true-false", answer: true,
          explanation: "Đúng. Một người có thể mở nhiều tài khoản thư điện tử với các tên khác nhau; mỗi hộp thư có một địa chỉ riêng, không trùng với địa chỉ khác.", level: "thong-hieu", activity: "tro-choi" },
        { question: "Khi tạo tài khoản thư điện tử, em KHÔNG cần khai báo gì? (Luyện tập 3)", type: "multiple-choice",
          options: ["Họ và tên", "Ngày sinh", "Địa chỉ nhà", "Hộp thư của phụ huynh"],
          answer: 2, explanation: "Khi tạo tài khoản không cần khai báo địa chỉ nhà. Họ tên, ngày sinh cần khai báo; với học sinh, hộp thư của phụ huynh giúp phụ huynh đồng ý, quản lí.", level: "van-dung", activity: "tro-choi" },
        { question: "Địa chỉ nào sau đây là địa chỉ thư điện tử?", type: "multiple-choice",
          options: ["www.nxbgd.vn", "thu_hoai.432@yahoo.com", "Hoangth&hotmail.coim", "Hoa675439@gf@gmail.com"],
          answer: 1, explanation: "thu_hoai.432@yahoo.com có đúng dạng <tên đăng nhập>@<địa chỉ máy chủ>.", level: "nhan-biet", activity: "tro-choi" },
        { question: "Mỗi địa chỉ thư điện tử là duy nhất trên toàn cầu.", type: "true-false", answer: true,
          explanation: "Đúng. Không có hai hộp thư trùng địa chỉ — vì vậy thư đến đúng người nhận.", level: "nhan-biet", activity: "tro-choi" },
        { question: "Bạn lạ gửi thư xin mật khẩu hộp thư của em để “tặng quà”. Em làm gì?", type: "multiple-choice",
          options: ["Gửi mật khẩu vì được tặng quà", "Không trả lời, báo cáo thư rác và báo cho thầy cô, bố mẹ", "Gửi mật khẩu của bạn khác", "Chuyển tiếp thư cho cả lớp để cùng nhận quà"],
          answer: 1, explanation: "Không bao giờ cung cấp mật khẩu qua thư. Đó là thư lừa đảo — hãy báo cáo thư rác, xoá thư và báo người lớn.", level: "van-dung", activity: "tro-choi" },
        { question: "Muốn gửi ảnh tập thể lớp cho bạn qua thư điện tử, em dùng nút nào khi soạn thư?", type: "multiple-choice",
          options: ["📎 Đính kèm tệp", "🗑️ Huỷ bỏ thư nháp", "⭐ Gắn dấu sao", "Đăng xuất"],
          answer: 0, explanation: "Nháy nút 📎 (Đính kèm) để gửi kèm tệp ảnh, văn bản… theo thư.", level: "nhan-biet", activity: "tro-choi" },
        { question: "Thư có tiêu đề “Cơ hội đầu tư kiếm được nhiều tiền hơn” từ một người lạ, kèm tệp “qua_tang.exe”. Việc làm nào AN TOÀN nhất?", type: "multiple-choice",
          options: ["Mở tệp xem có gì bên trong", "Trả lời hỏi người gửi là ai", "Nháy vào liên kết trong thư", "Không mở tệp, báo cáo thư rác rồi xoá thư"],
          answer: 3, explanation: "Thư lạ, hứa hẹn kiếm tiền, kèm tệp chạy (.exe) rất có thể là thư rác chứa virus: không mở, báo cáo thư rác và xoá.", level: "van-dung-cao", activity: "tro-choi" },
      ],
    },

    /* ===================== HĐ4: VẬN DỤNG ===================== */
    {
      id: "thu-rac", name: "Vận dụng 1: Thư nào có thể là thư rác? 🗑️", type: "dragdrop",
      goal: "Nhận biết thư rác qua tiêu đề thư.",
      time: 150,
      task: "Xếp mỗi tiêu đề thư (SGK tr.36) vào nhóm phù hợp. Xếp hết rồi bấm Nộp bài.",
      sgkImage: "assets/sgk/sgk-trang36.jpg",
      groups: ["🗑️ Có thể là thư rác", "📩 Thư bình thường"],
      items: [
        { text: "A. Cơ hội đầu tư kiếm được nhiều tiền hơn.", group: 0 },
        { text: "B. Danh sách học sinh tham gia thi học sinh giỏi môn Tin học.", group: 1 },
        { text: "C. Quà tặng miễn phí, hãy nháy chuột nhanh.", group: 0 },
        { text: "D. Bạn đã trúng một chuyến đi miễn phí đến Mĩ.", group: 0 },
        { text: "E. Ảnh tập thể lớp 6A ngày khai trường.", group: 1 },
        { text: "F. Khuyến mãi, ưu đãi giá rẻ cho bạn.", group: 0 },
      ],
      explanation: "Thư rác thường hứa hẹn tiền bạc, quà tặng, trúng thưởng, khuyến mãi, thúc giục “nháy chuột nhanh”: A, C, D, F. Thư B, E có nội dung học tập, sinh hoạt lớp rõ ràng.",
      remember: ["Thư rác, thư lừa đảo: hứa hẹn quà, tiền, trúng thưởng, giục nháy liên kết hoặc đòi mật khẩu → không mở tệp, không nháy liên kết, báo cáo thư rác."],
    },
    {
      id: "van-dung-2", name: "Vận dụng 2: Gửi thư kèm ảnh cho bạn, người thân 💌", type: "knowledge",
      goal: "Soạn và gửi thư điện tử có đính kèm tệp, đúng quy tắc, lịch sự.",
      time: 480,
      task: "Soạn một thư có gửi kèm ảnh (hoặc tệp văn bản, thiệp chúc mừng…) cho bạn hoặc người thân: có người nhận, chủ đề, lời chào, nội dung, kí tên, tệp đính kèm. Bấm Gửi — thầy/cô nhận được để chấm.",
      sgkImage: "assets/sgk/sgk-trang36.jpg",
      mail: { key: "gmail", me: ME, login: true, signup: true, inbox: INBOX, files: FILES,
        check: { attach: true }, submit: "Thư có gửi kèm ảnh/tệp (Vận dụng 2)" },
      content: {
        heading: "💌 Thư gửi kèm ảnh",
        revealLabel: "📋 Biểu điểm (giáo án)",
        blocks: [
          { kind: "html", value: `<table style="width:100%;border-collapse:collapse;font-size:1.05rem;background:#fff">${[["Đăng nhập, soạn thư mới", 1], ["Chủ đề", 1], ["Nội dung gõ đúng chính tả, rõ ràng, lời lẽ lịch sự, văn minh", 3], ["Kèm tệp (ảnh, văn bản…)", 2], ["Thẩm mỹ", 1], ["Địa chỉ hộp thư người nhận", 1], ["Gửi thư thành công", 1]].map(([t, d], i) => `<tr style="background:${i % 2 ? "#fff7ed" : "#fff"}"><td style="padding:7px 10px">${t}</td><td style="padding:7px 10px;text-align:center;font-weight:800">${d} điểm</td></tr>`).join("")}<tr style="background:#ffedd5"><td style="padding:7px 10px;font-weight:800">Tổng</td><td style="padding:7px 10px;text-align:center;font-weight:900">10 điểm</td></tr></table>` },
          { kind: "text", value: "Gợi ý tình huống học tập: gửi bài tập cho cô; thông báo nhóm học online; gửi thư cảm ơn thầy cô. Về nhà: gửi một thư cảm ơn hoặc trao đổi học tập với bạn cùng nhóm." },
        ],
      },
    },
    {
      id: "thao-luan", name: "Thảo luận & mở rộng 💬", type: "vandung",
      goal: "Vận dụng hiểu biết về thư điện tử vào tình huống thực tế.",
      time: 240,
      task: "Thảo luận nhóm đôi, gửi câu trả lời cho thầy/cô.",
      intro: "Thảo luận, gửi câu trả lời rồi bấm để xem hướng chốt.",
      cases: [
        { question: "(SGK tr.34) Nêu các ưu điểm và hạn chế của dịch vụ thư truyền thống. Các điểm đó đã thay đổi thế nào khi ta sử dụng dịch vụ thư điện tử?",
          answer: "Ưu điểm thư truyền thống: chuyển thư bằng máy bay, tàu, xe, người… tới mọi nơi, không cần thiết bị điện tử, kết nối mạng. Hạn chế: chi phí cao, thời gian chuyển thư dài, số lượng thư gửi và nhận bị hạn chế, có thể chuyển nhầm hoặc thất lạc. Thư điện tử khắc phục nhiều hạn chế đó: nhanh, chi phí thấp, gửi cùng lúc cho nhiều người, dễ lưu trữ; số thư qua bưu điện và chi phí vận chuyển giảm đáng kể." },
        { question: "Cho một ví dụ cho thấy dịch vụ thư điện tử có ưu điểm hơn thư truyền thống.",
          answer: "Ví dụ: soạn một bức thư có thể gửi cùng lúc cho nhiều người bằng thư điện tử; còn thư truyền thống mỗi bức chỉ gửi được đến một địa chỉ người nhận." },
        { question: "Chọn một tình huống học tập em cần gửi thư điện tử (gửi bài tập cho cô, thông báo nhóm học online, cảm ơn thầy cô…). Viết tiêu đề thư và 2–3 câu nội dung lịch sự.",
          answer: "Ví dụ — Tiêu đề: “Nộp bài tập Tin học tuần 8 — Nhóm 3”. Nội dung: “Em chào cô ạ! Nhóm em xin gửi cô bài tập Tin học tuần 8 trong tệp đính kèm. Em cảm ơn cô ạ! — Nhóm 3, lớp 6A”. Nhớ: có lời chào, xưng hô lịch sự, nội dung ngắn gọn, cảm ơn và kí tên." },
      ],
    },

    /* ===================== HĐ5: TRÒ CHƠI GIẢI Ô CHỮ ===================== */
    {
      id: "o-chu", name: "Trò chơi: Giải ô chữ 🔠", type: "crossword",
      goal: "Tổng hợp toàn bộ kiến thức của bài qua các từ khoá.",
      time: 420,
      task: "Chọn hàng ngang, gõ đáp án (tiếng Việt không dấu cũng được). Từ các chữ ở cột xanh, tìm từ khoá hàng dọc!",
      sgkImage: "assets/sgk/o-chu.jpg",
      intro: "Bấm số thứ tự để chọn hàng. Các chữ gợi ý có sẵn như trong SGK tr.36.",
      questions: [
        { type: "short", question: "Hàng 1 (8 chữ cái): Để có hộp thư điện tử người sử dụng cần đăng kí (?) thư điện tử với nhà cung cấp dịch vụ thư điện tử.", answer: ["TAIKHOAN", "tài khoản"], key: 0, show: [3], explanation: "TÀI KHOẢN — đăng kí tài khoản thư điện tử với nhà cung cấp dịch vụ.", level: "nhan-biet", activity: "o-chu" },
        { type: "short", question: "Hàng 2 (7 chữ cái): Để bảo mật cho tài khoản thư thì người sử dụng cần đặt (?).", answer: ["MATKHAU", "mật khẩu"], key: 4, show: [0], explanation: "MẬT KHẨU — do người sử dụng tự chọn và giữ bí mật.", level: "nhan-biet", activity: "o-chu" },
        { type: "short", question: "Hàng 3 (9 chữ cái): Khi gửi thư, ta cần ghi rõ địa chỉ của (?).", answer: ["NGUOINHAN", "người nhận"], key: 2, show: [2], explanation: "NGƯỜI NHẬN — ghi đúng địa chỉ người nhận thì thư mới đến đúng nơi.", level: "nhan-biet", activity: "o-chu" },
        { type: "short", question: "Hàng 4 (8 chữ cái): Muốn vào hộp thư thì người sử dụng cần (?).", answer: ["DANGNHAP", "đăng nhập"], key: 0, show: [1], explanation: "ĐĂNG NHẬP — bằng tên đăng nhập và mật khẩu.", level: "nhan-biet", activity: "o-chu" },
        { type: "short", question: "Hàng 5 (6 chữ cái): Mỗi hộp thư điện tử được gắn với một (?).", answer: ["DIACHI", "địa chỉ"], key: 1, show: [0], explanation: "ĐỊA CHỈ — mỗi hộp thư gắn với một địa chỉ thư điện tử duy nhất.", level: "nhan-biet", activity: "o-chu" },
        { type: "short", question: "Hàng 6 (3 chữ cái): Nháy nút 📎 (Đính kèm) nếu có gửi kèm (?).", answer: ["TEP", "tệp"], key: 1, show: [2], explanation: "TỆP — nháy nút 📎 để gửi kèm tệp.", level: "nhan-biet", activity: "o-chu" },
        { type: "short", question: "Hàng 7 (8 chữ cái): Nháy nút (?) để ra khỏi hộp thư điện tử.", answer: ["DANGXUAT", "đăng xuất"], key: 2, show: [7], explanation: "ĐĂNG XUẤT — để ra khỏi hộp thư, tránh người khác sử dụng.", level: "nhan-biet", activity: "o-chu" },
        { type: "short", question: "Hàng 8 (6 chữ cái): Sau khi tạo tài khoản, người sử dụng sẽ có một (?).", answer: ["HOPTHU", "hộp thư"], key: 3, show: [0], explanation: "HỘP THƯ — hộp thư điện tử trên máy chủ thư điện tử.", level: "nhan-biet", activity: "o-chu" },
        { type: "short", question: "Hàng 9 (3 chữ cái): Nháy nút (?) để thư được chuyển đi.", answer: ["GUI", "gửi"], key: 1, show: [0], explanation: "GỬI — nháy nút Gửi để thư được chuyển đi.", level: "nhan-biet", activity: "o-chu" },
        { type: "short", keyword: true, question: "🔑 Từ khoá hàng dọc (cột màu xanh, 9 chữ cái) là gì?", answer: ["THUDIENTU", "thư điện tử"], hint: "Ghép chữ ở cột xanh của 9 hàng ngang từ trên xuống.", explanation: "Từ khoá: THƯ ĐIỆN TỬ — chủ đề của bài học hôm nay!", level: "thong-hieu", activity: "o-chu" },
      ],
    },

    /* ===================== TỔNG KẾT ===================== */
    {
      id: "tong-ket", name: "Tổng kết", type: "summary",
      task: "Cả lớp nhắc lại kiến thức trọng tâm, làm thử thách cuối. Về nhà: gửi một thư cảm ơn hoặc trao đổi học tập với bạn cùng nhóm; chuẩn bị Bài 9: An toàn thông tin trên Internet.",
      content: {
        learned: [
          "Thư điện tử là thư được gửi và nhận bằng phương tiện điện tử; dịch vụ thư điện tử giúp soạn, gửi, nhận, chuyển tiếp, lưu trữ, quản lí thư.",
          "Có tài khoản → có hộp thư, địa chỉ thư và mật khẩu. Địa chỉ: <tên đăng nhập>@<địa chỉ máy chủ thư điện tử>, duy nhất trên toàn cầu.",
          "Ưu điểm: nhanh, rẻ, gửi nhiều người, gửi kèm tệp, dễ lưu trữ. Nhược điểm: cần kết nối mạng; virus, thư rác, thư lừa đảo.",
          "Thực hành: đăng nhập → đọc / soạn thư (người nhận, chủ đề, nội dung, tệp) → Gửi → Đăng xuất.",
        ],
        challenge: [
          { question: "Bạn Minh gõ địa chỉ người nhận là “thuyk39yahoo.com”. Điều gì sẽ xảy ra khi bấm Gửi?", type: "multiple-choice",
            options: ["Thư vẫn đến tay Thuỳ bình thường", "Hộp thư báo lỗi không nhận ra địa chỉ vì thiếu kí tự @", "Thư được gửi cho tất cả mọi người", "Thư tự thêm dấu @ rồi gửi đi"],
            answer: 1, explanation: "Địa chỉ thiếu kí tự bắt buộc @ nên không hợp lệ — thư không gửi được. Hãy kiểm tra kĩ địa chỉ người nhận.", level: "van-dung", activity: "tong-ket" },
          { question: "Vì sao cần đăng xuất khi không dùng hộp thư, nhất là trên máy tính dùng chung?", type: "multiple-choice",
            options: ["Để máy tính chạy nhanh hơn", "Để thư được gửi đi nhanh hơn", "Để tránh người khác vào đọc, gửi thư bằng tài khoản của em", "Để xoá hết thư trong hộp thư"],
            answer: 2, explanation: "Đăng xuất giúp bảo vệ tài khoản: người dùng sau không thể đọc thư hay mạo danh em để gửi thư.", level: "van-dung-cao", activity: "tong-ket" },
        ],
      },
    },
  ],
};

if (typeof module !== "undefined" && module.exports) module.exports = LESSON;
if (typeof window !== "undefined") window.LESSON = LESSON;
