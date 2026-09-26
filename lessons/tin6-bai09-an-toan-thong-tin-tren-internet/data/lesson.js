/* ============================================================================
 * BÀI 9 — AN TOÀN THÔNG TIN TRÊN INTERNET  (Tin học 6 — Kết nối tri thức)
 * Chủ đề 4: Đạo đức, pháp luật và văn hoá trong môi trường số.
 * Bám sát SGK trang 37–41 + Kế hoạch bài dạy (2 tiết) của giáo viên.
 * Chỉ sửa file này để đổi nội dung. Engine app.js không cần sửa.
 * Mọi tên người, địa chỉ thư, tin nhắn, đường liên kết trong bài đều là HƯ CẤU để minh hoạ.
 * ==========================================================================*/

// ---- Mở đầu: câu chuyện của Minh và An (SGK tr.37) ----
const STORY = [
  ["Minh", "😟", "Bạn biết không, tối qua tớ làm hỏng máy tính rồi. Tớ lo là các tệp ảnh chụp hôm đi dã ngoại trong máy bị mất."],
  ["An", "🙂", "Bạn đã làm gì để xảy ra sự cố này?"],
  ["Minh", "😟", "Tớ tải một phần mềm trò chơi trên mạng và cài đặt, máy tính khởi động lại rồi bị treo luôn."],
  ["An", "🙂", "Máy tính của bạn có cài phần mềm chống virus không?"],
  ["Minh", "😟", "Có! Nhưng vì háo hức muốn chơi nên tớ đã bỏ qua cảnh báo khi cài đặt."],
  ["An", "🙂", "Vấn đề là ở chỗ ấy đấy! Máy tính nhà bạn có thể đã bị nhiễm virus hoặc mã độc rồi. Bạn nên nói với bố mẹ nhờ chuyên gia máy tính kiểm tra xem sao."],
];
const STORY_HTML = `<div style="max-width:820px;margin:0 auto">
  <p style="margin:0 0 10px;font-style:italic;color:#475569">Một buổi sáng, Minh đến lớp với vẻ mặt buồn thiu tìm An để nói chuyện.</p>
  ${STORY.map(([n, i, t]) => { const L = n === "Minh"; return `<div style="display:flex;gap:10px;align-items:flex-start;margin:8px 0;${L ? "" : "flex-direction:row-reverse"}">
    <div style="flex:0 0 54px;text-align:center"><div style="font-size:2rem;line-height:1">${i}</div><b style="font-size:.9rem;color:${L ? "#0e7490" : "#c2410c"}">${n}</b></div>
    <div style="background:${L ? "#ecfeff" : "#fff7ed"};border:2px solid ${L ? "#67e8f9" : "#fdba74"};border-radius:16px;padding:8px 14px;font-size:1.1rem;line-height:1.45;max-width:78%">${t}</div></div>`; }).join("")}</div>`;

// ---- 5 tác hại, nguy cơ (SGK tr.37–38) ----
const RISKS = [
  ["🕵️", "Thông tin cá nhân bị lộ hoặc bị đánh cắp", "Kẻ xấu dùng thông tin để bôi nhọ danh dự, dụ dỗ, lừa đảo, tống tiền, khống chế người dùng.", "#fee2e2", "#ef4444"],
  ["🦠", "Máy tính bị nhiễm virus hay mã độc", "Dữ liệu trên máy tính bị mất hoặc bị sai lệch.", "#fef3c7", "#f59e0b"],
  ["🎣", "Bị lừa đảo, dụ dỗ, đe doạ, bắt nạt trên mạng", "Bị dụ dỗ tiếp xúc nội dung không lành mạnh, bị đe doạ khiến sợ hãi, ảnh hưởng sức khoẻ và tâm lí.", "#ede9fe", "#8b5cf6"],
  ["❓", "Tiếp nhận thông tin không chính xác", "Nhiều thông tin không được kiểm duyệt; có kẻ đưa tài liệu bạo lực, khuyến khích hoạt động bất hợp pháp.", "#e0f2fe", "#0ea5e9"],
  ["🎮", "Nghiện Internet, nghiện trò chơi trên mạng", "Ảnh hưởng tâm lí, sức khoẻ, hành vi: căng thẳng, lo lắng, trầm cảm, bỏ bê học tập…", "#dcfce7", "#22c55e"],
];
const RISKS_HTML = `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px">${RISKS.map(([i, t, d, bg, bd]) =>
  `<div style="background:${bg};border:2px solid ${bd};border-radius:16px;padding:12px 14px"><div style="font-size:2.2rem">${i}</div><b style="font-size:1.12rem">${t}</b><div style="margin-top:4px;font-size:1rem;line-height:1.4">${d}</div></div>`).join("")}</div>`;

// ---- 5 quy tắc an toàn (SGK tr.39) ----
const RULES = [
  ["🔒", "GIỮ AN TOÀN", "Bảo mật thông tin cá nhân và gia đình, không tiết lộ thông tin cá nhân trên mạng xã hội và cho người lạ.", "#fce7f3", "#db2777"],
  ["🚷", "KHÔNG GẶP GỠ", "Không được một mình gặp gỡ người mà bạn chỉ quen biết qua mạng vì có thể bị nguy hiểm nếu gặp phải kẻ xấu. Đi cùng người lớn trong gia đình bạn nếu muốn gặp.", "#ede9fe", "#7c3aed"],
  ["✋", "ĐỪNG CHẤP NHẬN", "Chỉ mở thư điện tử và tin nhắn từ người mà bạn biết. Từ chối các lời mời vào hội nhóm trên mạng mà mình không biết. Cảnh giác với virus và tin nhắn rác.", "#e0f2fe", "#0284c7"],
  ["🔍", "KIỂM TRA ĐỘ TIN CẬY", "Chỉ nên tìm kiếm thông tin từ các nguồn có sự kiểm duyệt hoặc các tổ chức, công ti có nguồn gốc và uy tín. Kiểm tra độ tin cậy của thông tin qua sự trợ giúp của người lớn trong gia đình hoặc thầy cô giáo.", "#fee2e2", "#dc2626"],
  ["🗣️", "HÃY NÓI RA", "Khi gặp phải tình huống bị bắt nạt, đe doạ, lừa đảo hoặc dụ dỗ trên mạng, hãy chia sẻ với người tin cậy như thầy cô giáo, người lớn trong gia đình.", "#dcfce7", "#16a34a"],
];
const RULES_HTML = `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:12px">${RULES.map(([i, t, d, bg, bd]) =>
  `<div style="background:${bg};border:3px solid ${bd};border-radius:18px;padding:12px 14px;text-align:center"><div style="font-size:2.4rem">${i}</div><b style="font-size:1.15rem;color:${bd}">${t}</b><div style="margin-top:6px;font-size:1rem;line-height:1.4;text-align:left">${d}</div></div>`).join("")}</div>`;
const POEM_HTML = `<div style="max-width:640px;margin:14px auto 0;background:linear-gradient(135deg,#fb923c,#f97316);color:#fff;border-radius:18px;padding:14px 20px;text-align:center;font-size:1.25rem;line-height:1.7;box-shadow:0 8px 20px rgba(234,88,12,.25)">
  Thông tin phải giữ <b style="color:#1e3a8a">AN TOÀN</b>.<br>Chớ nên <b style="color:#1e3a8a">GẶP GỠ</b> bạn vừa mới quen.<br>Không <b style="color:#1e3a8a">CHẤP NHẬN</b>, chớ có quên.<br>Tăng độ <b style="color:#1e3a8a">TIN CẬY</b>, điều nên giữ gìn.<br><b style="color:#1e3a8a">NÓI RA</b> với người bạn tin.<br>Năm <b style="color:#1e3a8a">quy tắc</b> đó nên in vào lòng.</div>`;

// ---- Biện pháp bảo vệ thông tin, tài khoản cá nhân và chia sẻ thông tin an toàn (SGK tr.41) ----
const MEASURES_HTML = `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:10px">${[
  ["🛡️", "Cài đặt và cập nhật phần mềm chống virus."], ["🔑", "Đặt mật khẩu mạnh. Bảo vệ mật khẩu."], ["🚪", "Đăng xuất các tài khoản khi đã dùng xong."],
  ["📶", "Tránh dùng mạng công cộng."], ["🔗", "Không truy cập vào các liên kết lạ; không mở thư điện tử và tệp đính kèm gửi từ những người không quen; không kết bạn và nhắn tin cho người lạ."],
  ["🤐", "Không chia sẻ thông tin cá nhân và những thông tin chưa được kiểm chứng trên Internet; không lan truyền tin giả làm tổn thương người khác."],
].map(([i, t]) => `<div style="display:flex;gap:10px;align-items:flex-start;background:#fff7ed;border:2px solid #fdba74;border-radius:14px;padding:10px 12px;font-size:1.05rem;line-height:1.4"><span style="font-size:1.8rem">${i}</span><span>${t}</span></div>`).join("")}</div>`;

// ---- Hộp thư "Thám tử lừa đảo" (mô phỏng — mọi tên, địa chỉ đều hư cấu) ----
const ME = { name: "Trần Minh", address: "minh.hs6a@gmail.com" };
const INBOX = [
  { from: "Cô giáo chủ nhiệm 6A", addr: "gvcn.lop6a@gmail.com", subject: "Lịch kiểm tra giữa học kì I", time: "07:30",
    body: "Chào các em!\nCô gửi các em lịch kiểm tra giữa học kì I. Các em xem kĩ và ôn tập chu đáo nhé.\nCô Hạnh", files: [{ name: "Lich_kiem_tra_giua_ki.docx" }] },
  { from: "Ban Quản Trị Hộp Thư", addr: "baomat-hopthu@gmaill-hotro.xyz", subject: "CẢNH BÁO: Tài khoản của bạn sẽ bị KHOÁ sau 24 giờ!!!", time: "07:02", scam: true,
    body: "Hệ thống phát hiện tài khoản của bạn có dấu hiệu bất thường.\nĐể tránh bị KHOÁ VĨNH VIỄN, hãy nháy vào nút bên dưới và nhập TÊN ĐĂNG NHẬP, MẬT KHẨU để xác minh ngay trong 24 giờ!", trap: "🔐 Xác minh tài khoản ngay" },
  { from: "An", addr: "an.hs6a@gmail.com", subject: "Ảnh dã ngoại của lớp mình nè", time: "Hôm qua",
    body: "Chào {ten}!\nTớ gửi cậu mấy tấm ảnh hôm đi dã ngoại. Máy cậu sửa xong chưa? Nhớ nhờ bố mẹ cài lại phần mềm chống virus nhé!\nAn", files: [{ name: "Anh_da_ngoai_6A.jpg" }] },
  { from: "Quà Tặng Học Sinh", addr: "qua-tang@hocsinh-mayman.xyz", subject: "🎁 Chúc mừng! Em đã trúng 1 máy tính bảng MIỄN PHÍ", time: "Hôm qua", scam: true,
    body: "CHÚC MỪNG EM!!! Em là học sinh may mắn thứ 1.000.000.\nHãy nháy vào nút bên dưới, điền họ tên, ĐỊA CHỈ NHÀ, SỐ ĐIỆN THOẠI của bố mẹ để nhận quà. Chỉ còn 10 phút!", trap: "🎁 Nhận quà ngay" },
  { from: "Câu lạc bộ Tin học", addr: "clbtinhoc.thcs@gmail.com", subject: "Thông báo sinh hoạt câu lạc bộ", time: "Thứ Hai",
    body: "Chào các bạn!\nBuổi sinh hoạt tuần này của CLB Tin học diễn ra lúc 15 giờ thứ Tư tại phòng máy. Chủ đề: Sử dụng Internet an toàn.\nBan chủ nhiệm CLB" },
  { from: "Kim Cương Free", addr: "napthe-free@kimcuong-vip.top", subject: "Nhận ngay 99.999 kim cương trò chơi miễn phí!!!", time: "Thứ Hai", scam: true,
    body: "Tải công cụ đính kèm về máy và chạy để nhận kim cương miễn phí.\nNhớ TẮT phần mềm chống virus trước khi chạy nhé!", files: [{ name: "hack_kim_cuong.exe" }], trap: "💎 Tải công cụ nhận kim cương" },
  { from: "Lan Nguyễn", addr: "lan.nguyen.6a@gmial.com", subject: "Giúp tớ với, gấp lắm!!!", time: "Chủ Nhật", scam: true,
    body: "{ten} ơi, tớ Lan đây. Tớ đang cần gấp, cậu gửi cho tớ mã số gồm 6 chữ số vừa được gửi vào điện thoại của cậu nhé.\nĐừng kể với ai nha, cảm ơn cậu nhiều!" },
  { from: "Thư viện trường", addr: "thuvien.thcs@gmail.com", subject: "Nhắc trả sách", time: "Chủ Nhật",
    body: "Chào em!\nEm đã mượn cuốn “Em yêu khoa học” được 2 tuần. Em nhớ trả sách cho thư viện trước thứ Sáu nhé.\nThư viện trường" },
];

const LESSON = {
  meta: {
    subject: "Tin học", grade: "6", book: "Kết nối tri thức với cuộc sống",
    title: "Bài 9: An toàn thông tin trên Internet", unit: "Chủ đề 4 — Đạo đức, pháp luật và văn hoá trong môi trường số",
    pages: "37–41", durationMinutes: 90,
  },
  objectives: {
    knowledge: [
      "Biết một số tác hại và nguy cơ khi sử dụng Internet. Nêu và thực hiện được một số biện pháp phòng ngừa.",
      "Trình bày được tầm quan trọng của sự an toàn và hợp pháp của thông tin cá nhân và tập thể.",
      "Bảo vệ được thông tin và tài khoản cá nhân với sự hỗ trợ của người lớn.",
      "Nêu được một vài cách thông dụng để chia sẻ thông tin của bản thân và tập thể sao cho an toàn và hợp pháp.",
      "Nhận diện được một số thông điệp lừa đảo hoặc mang nội dung xấu.",
    ],
    competencies: [
      "Tự chủ, tự học; giao tiếp và hợp tác (thảo luận nhóm); giải quyết vấn đề và sáng tạo (xử lí tình huống khi gặp nguy cơ trên mạng).",
      "Năng lực số 4.1.TC1a–d: nhận biết nguy cơ cho thiết bị số, rủi ro trên Internet; lựa chọn biện pháp bảo vệ; cân nhắc trước khi chia sẻ.",
      "Năng lực số 4.2.TC1a: giải thích vì sao cần bảo vệ dữ liệu cá nhân; đặt mật khẩu mạnh, không công khai thông tin cá nhân.",
      "Năng lực số 2.6.TC1b: hiểu danh tiếng trực tuyến; không lan truyền thông tin sai sự thật, gây tổn thương người khác.",
      "Năng lực AI 6.A3.3: dữ liệu cá nhân là tài sản của mỗi người; không nhập thông tin cá nhân, mật khẩu vào công cụ AI.",
    ],
    qualities: ["Thận trọng, trung thực, trách nhiệm, nhân ái (không chia sẻ nội dung gây tổn thương bạn bè), kỉ luật khi sử dụng Internet."],
  },
  coreKnowledge: [
    "5 tác hại, nguy cơ: thông tin cá nhân bị lộ, bị đánh cắp · máy tính nhiễm virus, mã độc · bị lừa đảo, dụ dỗ, đe doạ, bắt nạt · tiếp nhận thông tin không chính xác · nghiện Internet, trò chơi trên mạng.",
    "5 quy tắc an toàn: Giữ an toàn · Không gặp gỡ · Đừng chấp nhận · Kiểm tra độ tin cậy · Hãy nói ra.",
    "Bảo vệ thông tin, tài khoản: cài và cập nhật phần mềm chống virus · đặt mật khẩu mạnh, bảo vệ mật khẩu · đăng xuất khi dùng xong · tránh mạng công cộng · không truy cập liên kết lạ, không mở thư, tệp đính kèm từ người lạ.",
    "Nhận diện lừa đảo: thư điện tử, tin nhắn giả mạo, lời mời kết bạn, mời vào câu lạc bộ… dụ em chia sẻ thông tin cá nhân, đánh cắp tài khoản và mật khẩu.",
    "Chia sẻ an toàn: thông tin cá nhân chỉ chia sẻ cho người mình biết rõ và tin tưởng ở thế giới thực khi cần thiết; không chia sẻ thông tin chưa kiểm chứng, không lan truyền tin giả làm tổn thương người khác.",
  ],
  keywords: ["Mật khẩu mạnh", "Đăng xuất", "Lừa đảo", "Năm quy tắc an toàn", "Hãy nói ra"],
  settings: { basePoints: 100, useTimer: false, defaultTime: 60, sound: true, streakEnabled: true },

  activities: [
    /* =========================== TIẾT 1 =========================== */
    /* ===================== HĐ1: MỞ ĐẦU ===================== */
    {
      id: "mo-dau", name: "Mở đầu — Chuyện của bạn Minh 😟", type: "knowledge",
      goal: "Nhận biết sự cần thiết của việc bảo vệ thông tin trong máy tính.",
      time: 300,
      task: "Đọc câu chuyện của Minh và An, thảo luận nhóm rồi trả lời phiếu học tập.",
      sgkImage: "assets/sgk/cau-chuyen-minh.jpg",
      content: {
        heading: "😟 Chuyện của bạn Minh",
        prompt: "Một buổi sáng, Minh đến lớp với vẻ mặt buồn thiu tìm An để nói chuyện. Chuyện gì đã xảy ra với máy tính của Minh?",
        revealLabel: "📖 Đọc câu chuyện",
        blocks: [{ kind: "html", value: STORY_HTML }],
      },
      questions: [
        { question: "Bạn Minh đã gặp rắc rối gì?", type: "multiple-choice",
          options: ["Quên mật khẩu hộp thư điện tử", "Máy tính bị treo, có thể mất các tệp ảnh dã ngoại", "Bị bạn trên mạng lừa lấy tiền", "Máy tính bị hỏng màn hình do rơi"],
          answer: 1, explanation: "Sau khi cài phần mềm trò chơi tải trên mạng, máy tính của Minh khởi động lại rồi bị treo; Minh lo các tệp ảnh dã ngoại bị mất — dữ liệu bị mất do máy nhiễm virus.",
          level: "nhan-biet", activity: "mo-dau" },
        { question: "Những việc làm nào của Minh đã dẫn đến sự cố? (Chọn tất cả đáp án đúng)", type: "multiple-select",
          options: ["Tải một phần mềm trò chơi trên mạng về cài đặt", "Cài phần mềm chống virus cho máy tính", "Bỏ qua cảnh báo khi cài đặt vì háo hức muốn chơi", "Kể chuyện với bạn An"],
          answer: [0, 2], explanation: "Tải phần mềm không rõ nguồn gốc và bỏ qua cảnh báo của phần mềm chống virus khiến máy có thể bị nhiễm virus, mã độc.",
          level: "thong-hieu", activity: "mo-dau" },
        { question: "An khuyên Minh nên làm gì?", type: "multiple-choice",
          options: ["Tự tháo máy tính ra sửa", "Tải thêm một phần mềm khác trên mạng để sửa", "Giấu bố mẹ để khỏi bị mắng", "Nói với bố mẹ nhờ chuyên gia máy tính kiểm tra"],
          answer: 3, explanation: "Khi gặp sự cố, hãy nói với người lớn và nhờ chuyên gia máy tính kiểm tra — không tự ý xử lí.",
          level: "nhan-biet", activity: "mo-dau" },
      ],
      remember: ["Không tự ý tải, cài đặt phần mềm không rõ nguồn gốc; không bỏ qua cảnh báo của phần mềm chống virus.", "Gặp sự cố, hãy nói với bố mẹ, thầy cô."],
    },

    /* ===================== HĐ2.1: TÁC HẠI VÀ NGUY CƠ ===================== */
    {
      id: "tac-hai", name: "Tác hại và nguy cơ khi sử dụng Internet ⚠️", type: "knowledge",
      goal: "Nêu được một số tác hại và nguy cơ khi sử dụng Internet.",
      time: 420,
      task: "Hoạt động 1 (SGK tr.37): thảo luận nhóm “Tác hại và nguy cơ khi dùng Internet”, ghi vào bảng nhóm rồi trả lời câu hỏi.",
      sgkImage: "assets/sgk/sgk-trang38.jpg",
      content: {
        heading: "⚠️ Tác hại và nguy cơ khi sử dụng Internet",
        prompt: "Internet là công cụ tuyệt vời và hữu ích khi chúng ta biết cách sử dụng, nhưng cũng có thể có một số tác hại và nguy cơ. Nhóm em nêu được những tác hại, nguy cơ nào?",
        revealLabel: "🔍 Xem 5 tác hại, nguy cơ (SGK tr.37–38)",
        blocks: [{ kind: "html", value: RISKS_HTML }, { kind: "image", value: "assets/sgk/tac-hai-nguy-co.jpg", caption: "Tác hại, nguy cơ khi dùng Internet (SGK tr.38)" }],
      },
      questions: [
        { question: "Câu hỏi SGK tr.38 — Em hãy tìm phương án SAI. Khi dùng Internet có thể:", type: "multiple-choice",
          options: ["Bị lôi kéo vào các hoạt động không lành mạnh", "Máy tính bị nhiễm virus hoặc mã độc", "Tin tưởng mọi nguồn thông tin trên mạng", "Bị lừa đảo hoặc lợi dụng"],
          answer: 2, explanation: "A, B, D là những nguy cơ có thể gặp. “Tin tưởng mọi nguồn thông tin trên mạng” là sai: thông tin trên mạng có nhiều thông tin không được kiểm duyệt nên không chính xác.",
          level: "thong-hieu", activity: "tac-hai" },
        { question: "Câu hỏi SGK tr.38 — Việc làm nào được khuyến khích khi sử dụng các dịch vụ trên Internet?", type: "multiple-choice",
          options: ["Mở thư điện tử do người lạ gửi", "Tải các phần mềm miễn phí trên Internet không có kiểm duyệt", "Liên tục vào các trang xã hội để cập nhật thông tin", "Vào trang web tìm kiếm để tìm tư liệu làm bài tập về nhà"],
          answer: 3, explanation: "Tìm tư liệu học tập là việc làm hữu ích. Mở thư người lạ, tải phần mềm không kiểm duyệt dễ nhiễm virus; vào mạng xã hội liên tục dễ dẫn đến nghiện.",
          level: "thong-hieu", activity: "tac-hai" },
        { question: "Kẻ xấu lấy được họ tên, ảnh, địa chỉ nhà của em trên mạng. Chúng có thể dùng những thông tin đó để làm gì?", type: "multiple-choice",
          options: ["Bôi nhọ danh dự, dụ dỗ, lừa đảo, tống tiền em", "Giúp em học tốt hơn", "Gửi quà tặng miễn phí cho em", "Không làm được gì cả"],
          answer: 0, explanation: "SGK: kẻ xấu có thể dùng thông tin cá nhân bị lộ để bôi nhọ danh dự, để dụ dỗ, lừa đảo, tống tiền, khống chế chính bản thân người sử dụng.",
          level: "van-dung", activity: "tac-hai" },
      ],
      remember: ["Tác hại, nguy cơ khi dùng Internet: thông tin cá nhân bị lộ hoặc bị đánh cắp · máy tính bị nhiễm virus hay mã độc · bị lừa đảo, dụ dỗ, đe doạ, bắt nạt trên mạng · tiếp nhận thông tin không chính xác · nghiện Internet, nghiện trò chơi trên mạng."],
    },
    {
      id: "nhan-dien-nguy-co", name: "Trò chơi: Đây là nguy cơ nào? 🧩", type: "dragdrop",
      goal: "Nhận diện đúng các tác hại, nguy cơ qua tình huống thực tế.",
      time: 240,
      task: "Xếp mỗi tình huống vào đúng tác hại, nguy cơ. Xếp hết rồi bấm Nộp bài.",
      groups: ["🕵️ Lộ, bị đánh cắp thông tin cá nhân", "🦠 Nhiễm virus, mã độc", "🎣 Lừa đảo, dụ dỗ, đe doạ, bắt nạt", "❓ Thông tin không chính xác", "🎮 Nghiện Internet, trò chơi"],
      items: [
        { text: "Nhập mật khẩu vào một trang web lạ, sau đó tài khoản bị người khác chiếm mất", group: 0 },
        { text: "Mở tệp đính kèm trong thư lạ, máy tính chạy chậm và mất nhiều tệp", group: 1 },
        { text: "Người lạ doạ tung ảnh của em nếu em không gửi tiền", group: 2 },
        { text: "Đọc tin “uống nước lá cây chữa khỏi mọi bệnh” trên mạng và tin ngay", group: 3 },
        { text: "Chơi trò chơi trực tuyến đến khuya, bỏ bê bài tập", group: 4 },
        { text: "Đăng ảnh kèm địa chỉ nhà công khai, người lạ dùng để làm quen", group: 0 },
        { text: "Cài trò chơi tải từ trang web lạ, máy khởi động lại rồi bị treo", group: 1 },
        { text: "Bị rủ rê vào nhóm trên mạng xem nội dung bạo lực", group: 2 },
        { text: "Một tin đồn chưa được kiểm duyệt về người nổi tiếng lan khắp mạng", group: 3 },
        { text: "Lướt mạng xã hội cả ngày, cảm thấy căng thẳng, lo lắng", group: 4 },
      ],
      explanation: "Mỗi tình huống ứng với một trong 5 tác hại, nguy cơ trong SGK. Nhận ra nguy cơ là bước đầu tiên để phòng tránh.",
    },

    /* ===================== HĐ2.2: QUY TẮC AN TOÀN ===================== */
    {
      id: "quy-tac", name: "Năm quy tắc an toàn khi sử dụng Internet 🛡️", type: "knowledge",
      goal: "Biết và vận dụng 5 quy tắc an toàn khi sử dụng Internet.",
      time: 420,
      task: "Hoạt động 2 (SGK tr.38): thảo luận nhóm “Em cần làm gì để phòng tránh những nguy cơ và tác hại khi sử dụng Internet?”, rồi trả lời câu hỏi.",
      sgkImage: "assets/sgk/sgk-trang39.jpg",
      content: {
        heading: "🛡️ Một số quy tắc an toàn khi sử dụng Internet",
        prompt: "Em đã từng sử dụng Internet chưa? Em đã bao giờ gặp phải một trong những nguy cơ trên chưa? Nếu gặp phải, em sẽ làm gì?",
        revealLabel: "🛡️ Xem 5 quy tắc an toàn (SGK tr.39)",
        blocks: [{ kind: "html", value: RULES_HTML }, { kind: "html", value: POEM_HTML }],
      },
      questions: [
        { question: "Theo quy tắc “Không gặp gỡ”, nếu thật sự muốn gặp một người chỉ quen qua mạng, em cần làm gì?", type: "multiple-choice",
          options: ["Đi một mình cho nhanh", "Rủ thêm một bạn cùng lớp đi cùng", "Đi cùng người lớn trong gia đình", "Hẹn gặp buổi tối cho kín đáo"],
          answer: 2, explanation: "Không được một mình gặp gỡ người chỉ quen biết qua mạng vì có thể gặp phải kẻ xấu; đi cùng người lớn trong gia đình nếu muốn gặp.",
          level: "thong-hieu", activity: "quy-tac" },
        { question: "Quy tắc “Kiểm tra độ tin cậy” khuyên em tìm thông tin ở đâu?", type: "multiple-choice",
          options: ["Nguồn có sự kiểm duyệt, tổ chức, công ti có nguồn gốc và uy tín", "Bất kì trang nào có nhiều lượt thích", "Tin nhắn do người lạ gửi", "Nhóm trò chuyện có nhiều thành viên"],
          answer: 0, explanation: "Chỉ nên tìm kiếm thông tin từ các nguồn có sự kiểm duyệt hoặc tổ chức, công ti có nguồn gốc, uy tín; kiểm tra độ tin cậy với sự trợ giúp của người lớn, thầy cô.",
          level: "nhan-biet", activity: "quy-tac" },
        { question: "Khi bị bắt nạt, đe doạ, lừa đảo hoặc dụ dỗ trên mạng, quy tắc “Hãy nói ra” khuyên em làm gì?", type: "multiple-choice",
          options: ["Giữ kín, tự giải quyết một mình", "Chia sẻ với người tin cậy như thầy cô giáo, người lớn trong gia đình", "Nhắn tin cãi nhau với kẻ xấu", "Kể với người lạ trên mạng"],
          answer: 1, explanation: "Hãy nói ra: chia sẻ với người tin cậy như thầy cô giáo, người lớn trong gia đình để được giúp đỡ.",
          level: "nhan-biet", activity: "quy-tac" },
      ],
      remember: ["Thông tin phải giữ AN TOÀN · Chớ nên GẶP GỠ bạn vừa mới quen · Không CHẤP NHẬN, chớ có quên · Tăng độ TIN CẬY, điều nên giữ gìn · NÓI RA với người bạn tin."],
    },
    {
      id: "ghep-quy-tac", name: "Ghép tình huống với quy tắc 🎯", type: "matching",
      goal: "Nhận biết quy tắc an toàn được thực hiện trong mỗi tình huống.",
      time: 150,
      task: "Mỗi việc làm dưới đây thực hiện quy tắc an toàn nào? Ghép cho đúng rồi bấm Nộp bài.",
      sgkImage: "assets/sgk/nam-quy-tac.jpg",
      pairs: [
        { left: "Không đăng số điện thoại, địa chỉ nhà lên mạng xã hội", right: "🔒 Giữ an toàn" },
        { left: "Bạn quen qua mạng rủ đi chơi, em từ chối và kể với bố mẹ", right: "🚷 Không gặp gỡ" },
        { left: "Từ chối lời mời vào một hội nhóm lạ trên mạng", right: "✋ Đừng chấp nhận" },
        { left: "Đọc một tin lạ trên mạng, em hỏi thầy cô và tìm trên trang web chính thống", right: "🔍 Kiểm tra độ tin cậy" },
        { left: "Bị trêu chọc, đe doạ trên mạng, em kể ngay với thầy cô", right: "🗣️ Hãy nói ra" },
      ],
      explanation: "Giữ an toàn: bảo mật thông tin · Không gặp gỡ: người chỉ quen qua mạng · Đừng chấp nhận: thư, tin nhắn, lời mời lạ · Kiểm tra độ tin cậy: nguồn thông tin · Hãy nói ra: chia sẻ với người tin cậy.",
    },
    {
      id: "tho-quy-tac", name: "Điền vào bài thơ Năm quy tắc ✍️", type: "fillblank",
      goal: "Ghi nhớ 5 quy tắc an toàn qua bài thơ.",
      time: 150,
      task: "Điền từ còn thiếu vào bài thơ (gợi ý: AN TOÀN · GẶP GỠ · CHẤP NHẬN · TIN CẬY · NÓI RA). Điền xong bấm Kiểm tra.",
      sgkImage: "assets/sgk/bai-tho-quy-tac.jpg",
      text: "Thông tin phải giữ {{}}. / Chớ nên {{}} bạn vừa mới quen. / Không {{}}, chớ có quên. / Tăng độ {{}}, điều nên giữ gìn. / {{}} với người bạn tin. / Năm quy tắc đó nên in vào lòng.",
      answers: [["an toàn", "an toan"], ["gặp gỡ", "gap go"], ["chấp nhận", "chap nhan"], ["tin cậy", "tin cay"], ["nói ra", "noi ra"]],
      explanation: "Thông tin phải giữ AN TOÀN. Chớ nên GẶP GỠ bạn vừa mới quen. Không CHẤP NHẬN, chớ có quên. Tăng độ TIN CẬY, điều nên giữ gìn. NÓI RA với người bạn tin.",
    },
    {
      id: "quy-tac-thao-luan", name: "Thảo luận: Giữ bí mật thông tin cá nhân 💬", type: "vandung",
      goal: "Đề xuất giải pháp giữ bí mật thông tin cá nhân; nêu quy tắc quan trọng nhất và lí do.",
      time: 300,
      task: "Nhóm thảo luận, gửi câu trả lời cho thầy/cô; đại diện nhóm báo cáo, các nhóm nhận xét chéo.",
      intro: "Gửi câu trả lời cho thầy/cô rồi bấm để xem hướng chốt.",
      cases: [
        { question: "Hoạt động 2 (SGK tr.38): Em đã từng sử dụng Internet chưa? Em đã bao giờ gặp phải một trong những nguy cơ trên chưa? Nếu gặp phải, em sẽ làm gì?",
          answer: "HS trả lời theo trải nghiệm của mình. Hướng xử lí chung: dừng lại, không làm theo yêu cầu lạ, không cung cấp thông tin cá nhân, chặn tài khoản kẻ xấu và kể ngay với bố mẹ, thầy cô." },
        { question: "Câu hỏi SGK tr.39: Em có thể đưa ra một số giải pháp để giữ bí mật thông tin cá nhân không?",
          answer: "Không đăng số điện thoại, địa chỉ nhà, trường lớp, ảnh riêng tư lên mạng; đặt mật khẩu mạnh và không cho ai biết; đăng xuất khi dùng xong, nhất là máy dùng chung; không trả lời tin nhắn hỏi thông tin cá nhân của người lạ; chỉ kết bạn với người mình biết rõ." },
        { question: "Câu hỏi SGK tr.39: Trong 5 quy tắc trên, em thấy quy tắc nào quan trọng nhất? Tại sao?",
          answer: "Không có đáp án duy nhất — quan trọng là nêu được lí do. Ví dụ: “Giữ an toàn” vì lộ thông tin cá nhân là nguồn gốc của nhiều nguy cơ khác; hoặc “Hãy nói ra” vì khi gặp nguy hiểm, người lớn sẽ giúp em kịp thời. Cả 5 quy tắc đều cần ghi nhớ và thực hiện." },
      ],
    },

    /* =========================== TIẾT 2 =========================== */
    /* ===================== HĐ2.3: AN TOÀN THÔNG TIN ===================== */
    {
      id: "bao-ve-tai-khoan", name: "An toàn thông tin — Bảo vệ thông tin cá nhân 🔐", type: "knowledge",
      goal: "Trình bày được tầm quan trọng của an toàn thông tin cá nhân; nêu được các biện pháp bảo vệ thông tin, tài khoản.",
      time: 420,
      task: "Hoạt động 3 (SGK tr.39): thảo luận 3 câu hỏi về bạn Minh quên đăng xuất, thư lạ gây tò mò và cách bảo vệ tài khoản thư điện tử.",
      sgkImage: "assets/sgk/sgk-trang40.jpg",
      content: {
        heading: "🔐 An toàn thông tin",
        prompt: "Sau giờ thực hành ở phòng máy, bạn Minh quên đăng xuất tài khoản thư điện tử của mình và một ai đó đã dùng tài khoản thư điện tử của Minh để gửi nội dung không hay cho những người khác.",
        revealLabel: "🔍 Xem kiến thức (SGK tr.40–41)",
        blocks: [
          { kind: "list", value: [
            "Tầm quan trọng của sự an toàn và hợp pháp của thông tin cá nhân và tập thể: cá nhân, tập thể có thể bị lợi dụng hoặc gặp nguy hiểm nếu thông tin rơi vào tay kẻ xấu. Thông tin cá nhân, tập thể được pháp luật bảo vệ; nếu cần thiết em có thể yêu cầu pháp luật can thiệp.",
            "Bảo vệ thông tin và tài khoản cá nhân với sự giúp đỡ của người lớn: đăng xuất tài khoản khi dùng xong; đặt mật khẩu mạnh; bảo vệ mật khẩu khi nhập; nhờ người lớn cài chương trình diệt virus; tránh dùng mạng công cộng; không truy cập liên kết lạ, không mở thư và tệp đính kèm từ người không quen, không kết bạn và nhắn tin cho người lạ, không tham gia câu lạc bộ chưa rõ nguồn gốc trên mạng.",
            "Nhận diện thông điệp lừa đảo hoặc mang nội dung xấu: kẻ lừa đảo thường dùng thư điện tử, tin nhắn giả mạo, yêu cầu kết bạn hoặc mời tham gia các câu lạc bộ… để dụ dỗ em chia sẻ thông tin cá nhân, đánh cắp tài khoản và mật khẩu.",
          ] },
          { kind: "image", value: "assets/sgk/bien-phap-bao-ve.jpg", caption: "Một số biện pháp bảo vệ thông tin, tài khoản cá nhân và chia sẻ thông tin an toàn (SGK tr.41)" },
        ],
      },
      questions: [
        { question: "Hoạt động 3, câu 1: Minh quên đăng xuất và ai đó đã dùng tài khoản của Minh gửi nội dung không hay cho người khác. Điều gì có thể xảy ra với Minh?", type: "multiple-choice",
          options: ["Không có gì xảy ra vì Minh không gửi", "Mọi người hiểu lầm Minh gửi, Minh bị mất uy tín, thư từ và thông tin trong hộp thư có thể bị lợi dụng", "Hộp thư của Minh tự động bị xoá", "Minh được cộng thêm dung lượng hộp thư"],
          answer: 1, explanation: "Tài khoản cá nhân của Minh đã bị người khác sử dụng với mục đích xấu: người nhận nghĩ Minh gửi nên Minh bị ảnh hưởng danh dự; thông tin trong hộp thư cũng có thể bị lợi dụng.",
          level: "thong-hieu", activity: "bao-ve-tai-khoan" },
        { question: "Hoạt động 3, câu 2: Em thấy một thư điện tử có chủ đề gây tò mò “Xem ngay ảnh bí mật của bạn!!!” gửi từ một người không quen biết. Em sẽ làm gì?", type: "multiple-choice",
          options: ["Mở thư và nháy vào đường liên kết để xem", "Chuyển tiếp cho các bạn cùng xem", "Không mở thư, không nháy liên kết; báo cáo thư rác hoặc xoá và hỏi người lớn", "Trả lời thư để hỏi người gửi là ai"],
          answer: 2, explanation: "Không truy cập vào liên kết lạ; không mở thư điện tử và tệp đính kèm gửi từ những người không quen. Hỏi ý kiến người lớn khi nghi ngờ.",
          level: "van-dung", activity: "bao-ve-tai-khoan" },
        { question: "Hoạt động 3, câu 3: Những cách nào giúp bảo vệ tài khoản thư điện tử? (Chọn tất cả đáp án đúng)", type: "multiple-select",
          options: ["Đặt mật khẩu mạnh và giữ bí mật mật khẩu", "Đăng xuất khi dùng xong, nhất là ở máy dùng chung", "Dùng mật khẩu là ngày sinh cho dễ nhớ", "Không nhập mật khẩu vào đường liên kết lạ trong thư", "Cho bạn thân biết mật khẩu để giữ hộ"],
          answer: [0, 1, 3], explanation: "Đặt mật khẩu mạnh, bảo vệ mật khẩu, đăng xuất khi dùng xong, không nhập mật khẩu vào trang lạ. Ngày sinh dễ bị đoán; không cho ai biết mật khẩu.",
          level: "thong-hieu", activity: "bao-ve-tai-khoan" },
        { question: "Câu hỏi SGK tr.41 — Lời khuyên nào SAI khi em muốn bảo vệ máy tính của mình?", type: "multiple-choice",
          options: ["Đừng bao giờ mở thư điện tử và mở tệp đính kèm thư từ những người không quen biết", "Luôn nhớ đăng xuất khi sử dụng xong máy tính, thư điện tử", "Chẳng cần làm gì vì máy tính đã được cài đặt sẵn các thiết bị bảo vệ từ nhà sản xuất", "Nên cài đặt phần mềm bảo vệ máy tính khỏi virus và thường xuyên cập nhật phần mềm bảo vệ"],
          answer: 2, explanation: "Lời khuyên C sai: cần chủ động bảo vệ — cài đặt và thường xuyên cập nhật phần mềm chống virus, đăng xuất, không mở thư lạ.",
          level: "thong-hieu", activity: "bao-ve-tai-khoan" },
      ],
      remember: ["Cài đặt và cập nhật phần mềm chống virus · Đặt mật khẩu mạnh, bảo vệ mật khẩu · Đăng xuất các tài khoản khi đã dùng xong · Tránh dùng mạng công cộng · Không truy cập liên kết lạ, không mở thư và tệp đính kèm từ người không quen."],
    },
    {
      id: "mat-khau", name: "Phòng thí nghiệm mật khẩu 🔑", type: "knowledge",
      goal: "Biết đặc điểm của mật khẩu mạnh và cách bảo vệ mật khẩu.",
      time: 300,
      task: "Gõ thử các mật khẩu VÍ DỤ vào ô bên dưới, quan sát độ mạnh, rồi trả lời câu hỏi. Không gõ mật khẩu thật của em!",
      sgkImage: "assets/sgk/sgk-trang40.jpg",
      password: { intro: "SGK: mật khẩu mạnh là mật khẩu đủ dài, gồm chữ cái viết hoa và viết thường, chữ số, kí tự đặc biệt — khó bị chương trình máy tính phát hiện hay bị người khác đoán biết.",
        examples: ["12345678", "minh2012", "matkhau123", "Minh2012", "Tr@ng-Tin6#Xanh"], minLength: 8 },
      content: {
        heading: "🔑 Mật khẩu mạnh",
        revealLabel: "💡 Mẹo tạo mật khẩu mạnh mà dễ nhớ",
        blocks: [
          { kind: "list", value: [
            "Nghĩ một câu dễ nhớ, lấy chữ cái đầu mỗi tiếng, thêm chữ số và kí tự đặc biệt. Ví dụ: “Em thích học Tin lớp 6A!” → Ethht-L6A! (chỉ là ví dụ, đừng dùng mật khẩu này).",
            "Mỗi tài khoản quan trọng nên có mật khẩu riêng.",
            "Nhờ bố mẹ hỗ trợ khi tạo và cất giữ mật khẩu; không cho người khác biết mật khẩu.",
          ] },
          { kind: "ext", value: "Nhiều dịch vụ còn có xác thực hai bước: sau khi nhập mật khẩu phải nhập thêm mã gửi về điện thoại. Mã này tuyệt đối không cho ai biết." },
        ],
      },
      questions: [
        { question: "Mật khẩu nào dưới đây mạnh nhất?", type: "multiple-choice",
          options: ["12345678", "minh2012", "Tr@ng-Tin6#Xanh", "matkhau"],
          answer: 2, explanation: "Tr@ng-Tin6#Xanh đủ dài, có chữ hoa, chữ thường, chữ số và kí tự đặc biệt. Các mật khẩu còn lại ngắn hoặc là dãy phổ biến, tên + năm sinh — dễ bị đoán.",
          level: "thong-hieu", activity: "mat-khau" },
        { question: "Theo SGK, một mật khẩu mạnh cần có những đặc điểm nào? (Chọn tất cả đáp án đúng)", type: "multiple-select",
          options: ["Đủ dài", "Có chữ cái viết hoa và viết thường", "Chỉ gồm tên và ngày sinh cho dễ nhớ", "Có chữ số", "Có kí tự đặc biệt"],
          answer: [0, 1, 3, 4], explanation: "Mật khẩu mạnh: đủ dài, gồm chữ cái viết hoa và viết thường, chữ số, kí tự đặc biệt.",
          level: "nhan-biet", activity: "mat-khau" },
        { question: "Có thể cho bạn thân biết mật khẩu tài khoản của mình vì bạn thân rất đáng tin.", type: "true-false", answer: false,
          explanation: "Sai. Mật khẩu phải được bảo vệ, không cho người khác biết. Nếu ai đó biết mật khẩu, tài khoản có thể bị dùng vào việc xấu (dù vô tình).",
          level: "thong-hieu", activity: "mat-khau" },
        { question: "Ở phòng máy đông người, khi đăng nhập hộp thư, em nên làm gì?", type: "multiple-choice",
          options: ["Đọc to mật khẩu cho bạn bên cạnh gõ giúp", "Che khi nhập mật khẩu để người khác không nhìn thấy và đăng xuất khi dùng xong", "Chọn “Ghi nhớ mật khẩu” để lần sau khỏi nhập", "Viết mật khẩu lên giấy dán cạnh màn hình"],
          answer: 1, explanation: "Bảo vệ mật khẩu khi nhập, tránh bị người khác nhìn thấy hoặc đánh cắp; đăng xuất các tài khoản khi đã dùng xong.",
          level: "van-dung", activity: "mat-khau" },
      ],
      remember: ["Đặt mật khẩu mạnh (đủ dài, chữ hoa, chữ thường, chữ số, kí tự đặc biệt) và bảo vệ mật khẩu — không cho ai biết."],
    },
    {
      id: "tham-tu-lua-dao", name: "Thám tử lừa đảo: Hộp thư của Minh 🕵️", type: "knowledge",
      goal: "Nhận diện được một số thông điệp lừa đảo hoặc mang nội dung xấu.",
      time: 480,
      task: "Mở từng thư trong hộp thư mô phỏng của Minh. Thư nào là lừa đảo thì bấm 🚫 Báo cáo thư rác. Tìm đủ các thư lừa đảo rồi trả lời câu hỏi.",
      mail: { key: "tham-tu", me: ME, inbox: INBOX, detect: true,
        intro: "🕵️ Hộp thư mô phỏng (mọi tên, địa chỉ đều hư cấu). Không nháy vào các nút lạ trong thư — nếu lỡ nháy, app chỉ hiện cảnh báo." },
      content: {
        heading: "🕵️ Nhận diện thông điệp lừa đảo",
        revealLabel: "🔎 Các dấu hiệu của thư, tin nhắn lừa đảo",
        blocks: [
          { kind: "list", value: [
            "Báo trúng thưởng, tặng quà bất ngờ, “miễn phí”, “chỉ còn 10 phút”.",
            "Đòi tên đăng nhập, mật khẩu, mã số gửi về điện thoại, địa chỉ nhà, số điện thoại.",
            "Đe doạ khoá tài khoản, hối thúc làm ngay.",
            "Địa chỉ người gửi lạ hoặc giả mạo, viết sai (gmaill, gmial…); đường liên kết lạ.",
            "Tệp đính kèm lạ (nhất là tệp .exe), bảo em tắt phần mềm chống virus.",
            "Dặn em giữ bí mật, “đừng kể với ai”.",
          ] },
        ],
      },
      questions: [
        { question: "Thư “Lan Nguyễn” gửi từ địa chỉ lan.nguyen.6a@gmial.com xin “mã số gồm 6 chữ số vừa gửi vào điện thoại”. Dấu hiệu nào cho thấy đây là thư lừa đảo? (Chọn tất cả đáp án đúng)", type: "multiple-select",
          options: ["Địa chỉ viết sai “gmial” — có thể là tài khoản giả mạo", "Xin mã số gửi về điện thoại (mã xác thực)", "Dặn “đừng kể với ai”", "Có lời chào ở đầu thư"],
          answer: [0, 1, 2], explanation: "Địa chỉ giả mạo, đòi mã xác thực và dặn giữ bí mật là dấu hiệu lừa đảo. Lời chào đầu thư không phải dấu hiệu — thư lừa đảo cũng có thể chào rất thân thiện.",
          level: "van-dung", activity: "tham-tu-lua-dao" },
        { question: "Thư “Kim Cương Free” gửi kèm tệp hack_kim_cuong.exe và dặn tắt phần mềm chống virus trước khi chạy. Nếu làm theo, điều gì dễ xảy ra nhất?", type: "multiple-choice",
          options: ["Nhận được kim cương thật", "Máy tính bị nhiễm virus, mã độc; tài khoản trò chơi bị đánh cắp", "Máy tính chạy nhanh hơn", "Không có gì xảy ra"],
          answer: 1, explanation: "Tệp chạy lạ (.exe) từ người không quen có thể chứa virus, mã độc. Không mở tệp đính kèm từ người lạ, không bao giờ tắt phần mềm chống virus theo lời người lạ.",
          level: "van-dung", activity: "tham-tu-lua-dao" },
        { question: "Thư “Cô giáo chủ nhiệm 6A” gửi lịch kiểm tra từ địa chỉ quen thuộc là thư lừa đảo vì có tệp đính kèm.", type: "true-false", answer: false,
          explanation: "Sai. Có tệp đính kèm chưa chắc là lừa đảo. Thư từ người em biết, nội dung bình thường, không đòi thông tin cá nhân là thư thật. Khi nghi ngờ, hỏi lại trực tiếp người gửi.",
          level: "thong-hieu", activity: "tham-tu-lua-dao" },
      ],
      remember: ["Kẻ lừa đảo dùng thư điện tử, tin nhắn giả mạo, yêu cầu kết bạn, mời vào câu lạc bộ… để dụ em chia sẻ thông tin cá nhân, đánh cắp tài khoản và mật khẩu."],
    },

    /* ===================== HĐ2.4: CHIA SẺ THÔNG TIN AN TOÀN ===================== */
    {
      id: "chia-se", name: "Chia sẻ thông tin an toàn 🤝", type: "knowledge",
      goal: "Nêu được cách chia sẻ thông tin của bản thân và tập thể an toàn, hợp pháp.",
      time: 360,
      task: "Hoạt động 4 (SGK tr.40): thảo luận 2 tình huống rồi trả lời câu hỏi.",
      sgkImage: "assets/sgk/sgk-trang40.jpg",
      content: {
        heading: "🤝 Chia sẻ thông tin an toàn",
        revealLabel: "🔍 Xem kiến thức (SGK tr.40)",
        blocks: [
          { kind: "list", value: [
            "Thông tin cá nhân chỉ nên chia sẻ cho người mình biết rõ và tin tưởng ở thế giới thực trong các trường hợp cần thiết. Internet có tính ẩn danh: không ai biết được thực chất người đứng sau một tài khoản trên mạng là ai.",
            "Ngay cả khi nhận được tin nhắn hỏi thông tin cá nhân từ tài khoản của người mình tin tưởng, cũng cần xác nhận lại bằng cách gọi điện thoại hoặc gặp trực tiếp, không nên chia sẻ ngay. Nên chặn tài khoản của kẻ xấu và thông báo với bố mẹ hoặc thầy cô giáo.",
            "Thông tin trên mạng đến từ nhiều nguồn khác nhau, không có ai kiểm chứng. Cần tiếp nhận thông tin có chọn lọc; chỉ nên chia sẻ thông tin từ các cơ quan, tổ chức chính thống; không chia sẻ và lan truyền tin giả làm tổn thương đến người khác.",
          ] },
        ],
      },
      questions: [
        { question: "Hoạt động 4, câu 1: Một bạn quen trên mạng xin số điện thoại và địa chỉ của em để gặp nhau nói chuyện. Em có nên cho không?", type: "multiple-choice",
          options: ["Có, vì bạn ấy nói chuyện rất thân thiện", "Chỉ cho số điện thoại, không cho địa chỉ", "Có, nếu bạn ấy gửi ảnh của mình trước", "Không, vì không biết thực chất người đứng sau tài khoản đó là ai"],
          answer: 3, explanation: "Thông tin cá nhân chỉ chia sẻ cho người mình biết rõ, tin tưởng ở thế giới thực. Người quen qua mạng có thể là kẻ xấu giả danh; ảnh cũng có thể là ảnh giả.",
          level: "van-dung", activity: "chia-se" },
        { question: "Hoạt động 4, câu 2: Em được một bạn gửi qua mạng một số thông tin không tốt về một bạn khác cùng lớp. Em có nên đăng lên mạng để mọi người cùng biết không?", type: "multiple-choice",
          options: ["Không đăng; thông tin chưa kiểm chứng và có thể làm tổn thương bạn", "Có, để mọi người biết sự thật", "Đăng nhưng giấu tên người gửi", "Chỉ gửi cho vài bạn thân"],
          answer: 0, explanation: "Không chia sẻ thông tin chưa được kiểm chứng; không lan truyền tin giả làm tổn thương người khác. Nếu thấy bạn bị nói xấu, bắt nạt, hãy báo thầy cô.",
          level: "van-dung", activity: "chia-se" },
        { question: "Thông tin trên mạng đều đã được kiểm chứng nên em có thể chia sẻ ngay cho mọi người.", type: "true-false", answer: false,
          explanation: "Sai. Thông tin trên mạng đến từ nhiều nguồn khác nhau, không có ai kiểm chứng. Chỉ nên chia sẻ thông tin từ các cơ quan, tổ chức chính thống.",
          level: "nhan-biet", activity: "chia-se" },
      ],
      remember: [
        "Thông tin cá nhân chỉ nên chia sẻ cho người mình biết rõ và tin tưởng ở thế giới thực trong các trường hợp cần thiết.",
        "Thông tin trên mạng không có ai kiểm chứng: tiếp nhận có chọn lọc, không lan truyền tin giả làm tổn thương người khác.",
      ],
    },
    {
      id: "tro-chuyen", name: "Tin nhắn tình huống: Em trả lời thế nào? 💬", type: "chat",
      goal: "Vận dụng quy tắc an toàn và cách chia sẻ thông tin an toàn để ứng xử với tin nhắn trên mạng.",
      time: 420,
      task: "Đọc từng tin nhắn đến và chọn cách trả lời an toàn nhất. Trả lời hết các tin nhắn.",
      intro: "📱 Mô phỏng ứng dụng nhắn tin — các nhân vật và tin nhắn đều hư cấu.",
      chat: { name: "Mây Xinh", avatar: "🐱", status: "Bạn mới quen trong trò chơi trực tuyến · chưa từng gặp" },
      winText: "Tuyệt vời — em đã ứng xử an toàn với mọi tin nhắn!",
      questions: [
        { question: "Chào cậu! Tớ là Mây, học lớp 6 ở trường bên cạnh 😊\nChơi trò chơi cùng cậu vui ghê!\nCho tớ xin số điện thoại với địa chỉ nhà cậu nhé, tớ muốn gửi quà 🎁", type: "multiple-choice",
          options: ["Ok, số mình là 09…, nhà mình ở số 12 đường…", "Cảm ơn cậu, nhưng mình không cho người quen qua mạng số điện thoại và địa chỉ đâu", "Mình gửi số điện thoại của bố mẹ cho cậu nhé", "Cậu gửi ảnh của cậu trước rồi mình cho"],
          answer: 1, reaction: "Ơ, cho đi mà, tớ là bạn tốt thật đấy 🥺", badReaction: "Tuyệt! Tớ biết nhà cậu rồi nhé 😏",
          explanation: "Giữ an toàn: không tiết lộ thông tin cá nhân (của em và gia đình) cho người lạ. Không ai biết thực chất người đứng sau tài khoản trên mạng là ai.",
          level: "van-dung", activity: "tro-chuyen" },
        { question: "Vậy cuối tuần mình gặp nhau ở công viên đi!\nĐừng nói với bố mẹ nhé, bí mật của hai đứa mình thôi 🤫", type: "multiple-choice",
          options: ["Mình không đi gặp người chỉ quen qua mạng đâu. Mình sẽ kể với bố mẹ", "Ừ, mình sẽ đi một mình, không nói với ai", "Để mình rủ thêm mấy bạn cùng lớp đi cùng", "Cậu gửi địa chỉ đi, mình tự đến"],
          answer: 0, reaction: "Thôi… vậy thôi 😶\n(Tài khoản này vừa rời khỏi cuộc trò chuyện)", badReaction: "Hihi, nhớ đến một mình nhé 😈",
          explanation: "Không gặp gỡ: không một mình gặp người chỉ quen qua mạng; muốn gặp phải có người lớn trong gia đình đi cùng. Lời dặn “đừng nói với bố mẹ” là dấu hiệu nguy hiểm → Hãy nói ra.",
          level: "van-dung", activity: "tro-chuyen" },
        { question: "Bạn được mời vào nhóm “Hội Săn Quà Miễn Phí” 🎁\nThành viên mới nhận ngay thẻ nạp 500.000 đồng 💸\nChỉ cần gửi tên đăng nhập và mật khẩu tài khoản trò chơi để kích hoạt 👇", type: "multiple-choice",
          chat: { name: "Hội Săn Quà Miễn Phí", avatar: "🎁", status: "Nhóm 2.345 thành viên · em chưa tham gia" },
          options: ["Tham gia ngay và gửi mật khẩu", "Tham gia nhóm nhưng không gửi mật khẩu", "Chia sẻ lời mời cho cả lớp cùng nhận quà", "Từ chối lời mời, chặn nhóm, không gửi bất kì thông tin nào"],
          answer: 3, reaction: "(Em đã chặn nhóm này ✅)", badReaction: "Kích hoạt thành công! Tài khoản của bạn đã thuộc về chúng tôi 😈",
          explanation: "Đừng chấp nhận: từ chối lời mời vào hội nhóm trên mạng mà mình không biết. Không bao giờ gửi mật khẩu cho bất kì ai.",
          level: "van-dung", activity: "tro-chuyen" },
        { question: "Cậu ơi, tớ Lan đây 😭\nĐiện thoại tớ hỏng rồi, cậu mua giúp tớ thẻ nạp 200.000 đồng rồi gửi mã thẻ qua đây nhé, mai tớ trả!", type: "multiple-choice",
          chat: { name: "Lan (bạn cùng lớp)", avatar: "👧", status: "Đang hoạt động" },
          options: ["Gửi ngay vì Lan là bạn thân", "Gửi một nửa thôi cho chắc", "Gọi điện thoại hoặc gặp trực tiếp Lan để hỏi lại có đúng Lan nhắn không", "Hỏi mật khẩu tài khoản của Lan để kiểm tra"],
          answer: 2, reaction: "(Lan gọi điện: “Tớ có nhắn gì đâu! Chắc tài khoản của tớ bị người khác lấy mất rồi!”)", badReaction: "Cảm ơn nha 😁 (Hôm sau Lan thật bảo không hề nhắn tin này…)",
          explanation: "SGK: ngay cả khi nhận tin nhắn từ tài khoản của người mình tin tưởng, cũng cần xác nhận lại bằng cách gọi điện thoại hoặc gặp trực tiếp — tài khoản có thể đã bị kẻ xấu chiếm.",
          level: "van-dung-cao", activity: "tro-chuyen" },
        { question: "Hùng: Ê mọi người, tớ vừa nhận được mấy thông tin không hay về bạn Tuấn lớp mình này 😂\nAi đăng lên mạng cho cả trường biết đi!", type: "multiple-choice",
          chat: { name: "Nhóm lớp 6A", avatar: "👥", status: "32 thành viên" },
          options: ["Đăng lên mạng ngay cho vui", "Không đăng, không chia sẻ; khuyên các bạn dừng lại và báo thầy cô nếu cần", "Thả tim và chia sẻ tiếp", "Sửa thêm cho hấp dẫn rồi đăng"],
          answer: 1, reaction: "Hùng: Ừ nhỉ… tớ xoá tin này đây. Xin lỗi Tuấn nhé!", badReaction: "(Tin lan khắp trường, Tuấn rất buồn và xấu hổ 😢)",
          explanation: "Không chia sẻ thông tin chưa được kiểm chứng; không lan truyền tin giả làm tổn thương người khác. Tôn trọng danh dự, hình ảnh của bạn bè.",
          level: "van-dung", activity: "tro-chuyen" },
        { question: "Tớ có ảnh của cậu đấy 😈\nNếu không gửi cho tớ 100.000 đồng thì tớ sẽ đăng lên mạng cho cả trường xem!", type: "multiple-choice",
          chat: { name: "Người lạ ẩn danh", avatar: "👤", status: "Tài khoản không có ảnh, mới tạo hôm qua" },
          options: ["Không trả lời, chặn tài khoản và báo ngay cho bố mẹ, thầy cô", "Sợ quá, gửi tiền ngay và không kể với ai", "Nhắn lại chửi mắng kẻ đó", "Xoá hết tài khoản rồi im lặng, không kể với ai"],
          answer: 0, reaction: "(Bố mẹ và thầy cô đã biết chuyện và giúp em xử lí ✅)", badReaction: "Gửi thêm 200.000 đồng nữa nếu không muốn bị đăng ảnh 😈",
          explanation: "Hãy nói ra: khi bị đe doạ, bắt nạt trên mạng, hãy chia sẻ với người tin cậy. Nên chặn tài khoản của kẻ xấu và thông báo với bố mẹ hoặc thầy cô giáo (SGK tr.40).",
          level: "van-dung-cao", activity: "tro-chuyen" },
        { question: "[THÔNG BÁO] Bạn đã trúng thưởng 1 điện thoại thông minh!\nNháy vào đường liên kết sau để nhận quà: http://nhan-qua-ngay.vd/trung-thuong", type: "multiple-choice",
          chat: { name: "Số lạ", avatar: "📩", status: "Không có trong danh bạ" },
          options: ["Nháy vào liên kết ngay kẻo hết quà", "Gửi liên kết cho bạn bè cùng nhận", "Nhắn lại hỏi quà có thật không", "Không nháy vào liên kết lạ, xoá tin nhắn và kể với người lớn"],
          answer: 3, reaction: "(Em đã xoá tin nhắn lừa đảo ✅)", badReaction: "(Trang web giả hiện ra, đòi nhập tài khoản và mật khẩu…)",
          explanation: "Không truy cập vào các liên kết lạ. Tin báo trúng thưởng bất ngờ từ số lạ là dấu hiệu lừa đảo thường gặp.",
          level: "van-dung", activity: "tro-chuyen" },
      ],
    },

    /* ===================== HĐ3: LUYỆN TẬP ===================== */
    {
      id: "luyen-tap", name: "Luyện tập 📝", type: "knowledge",
      goal: "Vận dụng kiến thức đã học để làm bài tập Luyện tập SGK.",
      time: 300,
      task: "Nhóm thảo luận, làm 2 bài Luyện tập (SGK tr.41), đại diện nhóm báo cáo, các nhóm chấm chéo.",
      sgkImage: "assets/sgk/sgk-trang41.jpg",
      questions: [
        { question: "Luyện tập 1: Khi sử dụng Internet, những việc làm nào sau đây có thể khiến em gặp nguy cơ bị hại? (Chọn tất cả đáp án đúng)", type: "multiple-select",
          options: ["Tải phần mềm, tệp miễn phí trên Internet", "Mở liên kết được cung cấp trong thư điện tử không biết rõ nguồn gốc", "Định kì thay đổi mật khẩu của tài khoản cá nhân trên mạng xã hội và thư điện tử", "Khi có kẻ đe doạ mình trên mạng không cho bố mẹ hoặc thầy cô giáo biết", "Làm theo các lời khuyên và bài hướng dẫn sử dụng thuốc trên mạng"],
          answer: [0, 1, 3, 4], explanation: "A: phần mềm, tệp miễn phí từ nguồn không kiểm duyệt có thể chứa virus (như chuyện của Minh) — chỉ tải từ nguồn tin cậy, hỏi người lớn trước. B: liên kết lạ. D: không “nói ra” thì không được giúp đỡ. E: thông tin không chính xác, nguy hiểm cho sức khoẻ. C là việc làm tốt giúp bảo vệ tài khoản.",
          hint: "Việc nào giúp tài khoản an toàn hơn? Những việc còn lại đều có thể gây hại.",
          level: "van-dung", activity: "luyen-tap" },
        { question: "Luyện tập 2: Theo em, những tình huống nào sau đây là rủi ro khi sử dụng Internet? (Chọn tất cả đáp án đúng)", type: "multiple-select",
          options: ["Máy tính bị hỏng do nhiễm virus hoặc mã độc", "Thông tin cá nhân hoặc tập thể bị đánh cắp", "Tài khoản ngân hàng bị mất tiền", "Bị bạn quen trên mạng lừa đảo", "Nghiện mạng xã hội, nghiện trò chơi trên mạng", "Hoàn thành chương trình học ngoại ngữ trực tuyến"],
          answer: [0, 1, 2, 3, 4], explanation: "A, B, C, D, E đều là rủi ro khi sử dụng Internet. F là lợi ích của Internet.",
          level: "thong-hieu", activity: "luyen-tap" },
      ],
    },
    {
      id: "tro-choi", name: "Trò chơi: Giải cứu thỏ con khỏi virus 🐰", type: "penguin",
      pet: "🐰", homeIcon: "🏡", enemy: "👾", saveWord: "chú thỏ con về nhà an toàn",
      winText: "Cả đàn thỏ đã về nhà an toàn — em là hiệp sĩ an toàn mạng!",
      goal: "Củng cố toàn bài: nguy cơ, quy tắc an toàn, bảo vệ thông tin, chia sẻ an toàn.",
      time: 300,
      task: "Trả lời đúng mỗi câu để đưa một chú thỏ về nhà trước khi con virus đuổi kịp!",
      intro: "Mỗi câu đúng: một chú thỏ 🐰 về nhà 🏡. Sai thì con virus 👾 đuổi theo!",
      questions: [
        { question: "Việc nào giúp bảo vệ tài khoản khi dùng máy tính chung ở phòng máy?", type: "multiple-choice",
          options: ["Đăng xuất tài khoản khi dùng xong", "Chọn ghi nhớ mật khẩu", "Để máy mở cho bạn sau dùng tiếp", "Dán mật khẩu cạnh màn hình"],
          answer: 0, explanation: "Đăng xuất các tài khoản khi đã dùng xong.", level: "nhan-biet", activity: "tro-choi" },
        { question: "Quy tắc nào nhắc em chỉ mở thư, tin nhắn từ người mình biết và từ chối lời mời vào hội nhóm lạ?", type: "multiple-choice",
          options: ["Giữ an toàn", "Đừng chấp nhận", "Kiểm tra độ tin cậy", "Hãy nói ra"],
          answer: 1, explanation: "Đừng chấp nhận: chỉ mở thư, tin nhắn từ người mình biết; từ chối lời mời vào hội nhóm lạ; cảnh giác với virus và tin nhắn rác.", level: "nhan-biet", activity: "tro-choi" },
        { question: "Mật khẩu nào mạnh hơn cả?", type: "multiple-choice",
          options: ["abc123", "Hoa2013", "hoa#2013", "H0a-Mai#Lop6"],
          answer: 3, explanation: "H0a-Mai#Lop6 đủ dài, có chữ hoa, chữ thường, chữ số và kí tự đặc biệt.", level: "thong-hieu", activity: "tro-choi" },
        { question: "Nghiện trò chơi trên mạng có thể dẫn đến điều gì?", type: "multiple-choice",
          options: ["Học tốt hơn", "Căng thẳng, lo lắng, bỏ bê việc học tập", "Sức khoẻ tốt lên", "Có nhiều bạn thân ngoài đời hơn"],
          answer: 1, explanation: "Nghiện Internet, trò chơi trên mạng ảnh hưởng xấu đến tâm lí, sức khoẻ và hành vi: căng thẳng, lo lắng, trầm cảm, bỏ bê học tập.", level: "nhan-biet", activity: "tro-choi" },
        { question: "Em nên tìm thông tin về cách phòng bệnh ở đâu?", type: "multiple-choice",
          options: ["Một bài đăng lạ có nhiều lượt chia sẻ", "Tin nhắn người lạ gửi", "Trang web của cơ quan y tế chính thống, hỏi thêm người lớn", "Nhóm trò chuyện trên mạng"],
          answer: 2, explanation: "Kiểm tra độ tin cậy: tìm thông tin từ nguồn có kiểm duyệt, tổ chức uy tín; nhờ người lớn, thầy cô trợ giúp.", level: "van-dung", activity: "tro-choi" },
        { question: "Vì sao nên tránh dùng mạng công cộng (Wi-Fi nơi công cộng) để đăng nhập tài khoản?", type: "multiple-choice",
          options: ["Vì mạng công cộng thường bảo mật không tốt", "Vì mạng công cộng luôn rất chậm", "Vì mạng công cộng không vào được Internet", "Vì mạng công cộng tốn nhiều tiền"],
          answer: 0, explanation: "SGK: tránh dùng mạng công cộng vì các mạng này thường bảo mật không tốt.", level: "thong-hieu", activity: "tro-choi" },
        { question: "Thông tin cá nhân chỉ nên chia sẻ cho ai?", type: "multiple-choice",
          options: ["Bất kì ai hỏi", "Bạn mới quen trên mạng", "Người nổi tiếng trên mạng", "Người mình biết rõ và tin tưởng ở thế giới thực, khi cần thiết"],
          answer: 3, explanation: "Thông tin cá nhân chỉ nên chia sẻ cho người mình biết rõ và tin tưởng ở thế giới thực trong các trường hợp cần thiết.", level: "nhan-biet", activity: "tro-choi" },
        { question: "Bạn em đang bị trêu chọc, bắt nạt trong một nhóm trên mạng. Em nên làm gì?", type: "multiple-choice",
          options: ["Tham gia trêu cùng cho vui", "Im lặng coi như không biết", "Không hùa theo, động viên bạn và báo thầy cô, bố mẹ", "Chụp màn hình gửi cho cả trường"],
          answer: 2, explanation: "Không lan truyền nội dung gây tổn thương; giúp bạn “nói ra” với người tin cậy để được hỗ trợ.", level: "van-dung-cao", activity: "tro-choi" },
      ],
    },

    /* ===================== HĐ4: VẬN DỤNG ===================== */
    {
      id: "van-dung", name: "Vận dụng — Em là hiệp sĩ an toàn mạng 🦸", type: "vandung",
      goal: "Vận dụng kiến thức vào tình huống thực tế: nhận diện lừa đảo, giúp người thân, bảo vệ tài khoản.",
      time: 360,
      task: "Nhóm thảo luận 3 câu Vận dụng (SGK tr.41), gửi câu trả lời cho thầy/cô; hoàn thiện ở nhà cùng bố mẹ.",
      sgkImage: "assets/sgk/sgk-trang41.jpg",
      intro: "Thảo luận, gửi câu trả lời cho thầy/cô rồi bấm để xem hướng chốt.",
      cases: [
        { question: "Vận dụng 1: Em hãy đưa ra một số cách nhận diện những trò lừa đảo trên Internet.",
          answer: "Dấu hiệu thường gặp: báo trúng thưởng, tặng quà bất ngờ, “miễn phí”; đòi mật khẩu, mã số gửi về điện thoại, thông tin cá nhân, tiền, thẻ nạp; hối thúc, đe doạ khoá tài khoản; địa chỉ, tài khoản lạ hoặc giả mạo (viết sai tên); đường liên kết, tệp đính kèm lạ; người lạ làm quen, rủ gặp mặt, dặn giữ bí mật với bố mẹ." },
        { question: "Vận dụng 2: Em sẽ làm gì khi phát hiện bạn bè hoặc người thân có nguy cơ bị hại khi truy cập mạng?",
          answer: "Nhắc nhở, khuyên bạn/người thân dừng lại (không nháy liên kết, không gửi thông tin, không đi gặp người lạ); giải thích nguy cơ; báo ngay cho bố mẹ, thầy cô hoặc người lớn tin cậy; giúp chặn, báo cáo tài khoản kẻ xấu; không hùa theo, không lan truyền nội dung gây hại." },
        { question: "Vận dụng 3: Em nên làm gì để bảo vệ thông tin và tài khoản cá nhân?",
          answer: "Cài đặt và cập nhật phần mềm chống virus; đặt mật khẩu mạnh, bảo vệ mật khẩu; đăng xuất các tài khoản khi dùng xong; tránh dùng mạng công cộng; không truy cập liên kết lạ, không mở thư và tệp đính kèm từ người không quen, không kết bạn và nhắn tin cho người lạ; không chia sẻ thông tin cá nhân và thông tin chưa kiểm chứng; nhờ người lớn hỗ trợ." },
      ],
    },

    /* ===================== TỔNG KẾT ===================== */
    {
      id: "tong-ket", name: "Tổng kết", type: "summary",
      task: "Cả lớp đọc lại bài thơ 5 quy tắc và làm thử thách cuối. Dặn dò: về nhà chia sẻ 5 quy tắc với bố mẹ (Góc cha mẹ: hãy làm bạn với con trong thế giới thông tin trên mạng Internet).",
      content: {
        learned: [
          "5 tác hại, nguy cơ: lộ thông tin cá nhân · virus, mã độc · lừa đảo, dụ dỗ, đe doạ, bắt nạt · thông tin không chính xác · nghiện Internet, trò chơi.",
          "5 quy tắc an toàn: Giữ an toàn · Không gặp gỡ · Đừng chấp nhận · Kiểm tra độ tin cậy · Hãy nói ra.",
          "Bảo vệ thông tin, tài khoản: phần mềm chống virus, mật khẩu mạnh, đăng xuất, tránh mạng công cộng, không mở liên kết, thư, tệp lạ.",
          "Nhận diện lừa đảo: trúng thưởng, đòi mật khẩu, mã số, thông tin cá nhân, hối thúc, địa chỉ giả mạo.",
          "Chia sẻ an toàn: chỉ với người biết rõ, tin tưởng ở thế giới thực; không lan truyền tin chưa kiểm chứng.",
        ],
        challenge: [
          { question: "Em nhận được tin nhắn từ tài khoản của anh họ: “Em gửi anh mã số vừa gửi về điện thoại của em nhé, anh cần gấp”. Em nên làm gì?", type: "multiple-choice",
            options: ["Gửi ngay vì là anh họ", "Gọi điện thoại cho anh họ để hỏi lại, không gửi mã số", "Gửi mã số rồi mới hỏi lại", "Đăng tin nhắn lên mạng hỏi mọi người"],
            answer: 1, explanation: "Cần xác nhận lại bằng cách gọi điện thoại hoặc gặp trực tiếp; tài khoản của người thân có thể đã bị kẻ xấu chiếm. Mã số gửi về điện thoại tuyệt đối không cho ai.",
            level: "van-dung-cao", activity: "tong-ket" },
          { question: "Việc làm nào thể hiện đúng quy tắc “Giữ an toàn”?", type: "multiple-choice",
            options: ["Đăng ảnh thẻ học sinh có ghi tên trường, lớp lên mạng", "Khoe địa chỉ nhà mới trên mạng xã hội", "Không tiết lộ thông tin cá nhân và gia đình trên mạng xã hội, cho người lạ", "Cho người lạ biết số điện thoại của bố mẹ"],
            answer: 2, explanation: "Giữ an toàn: bảo mật thông tin cá nhân và gia đình, không tiết lộ thông tin cá nhân trên mạng xã hội và cho người lạ.",
            level: "thong-hieu", activity: "tong-ket" },
        ],
      },
    },
  ],
};

if (typeof module !== "undefined" && module.exports) module.exports = LESSON;
if (typeof window !== "undefined") window.LESSON = LESSON;
