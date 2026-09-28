/* ============================================================================
 * BÀI 2 — THÔNG TIN TRONG MÔI TRƯỜNG SỐ  (Tin học 8 — Kết nối tri thức với cuộc sống)
 * Chủ đề 2: Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin.
 * Bám sát SGK trang 10–13 + Kế hoạch bài dạy (2 tiết) của giáo viên.
 * Chỉ sửa file này để đổi nội dung. Engine app.js không cần sửa.
 * Mở đầu: hộp thư mô phỏng (activity.mail) — ảnh assets/khai-giang.jpg là ẢNH MINH HOẠ, GV chép đè ảnh thật của trường (giữ tên tệp).
 * Mô phỏng lan truyền ảnh số (activity.spread); tin nhắn tình huống (type "chat"). Mọi nhân vật, tin nhắn, địa chỉ thư đều hư cấu.
 * ==========================================================================*/

// ---- Hộp thư mô phỏng (Mở đầu) ----
const ME = { name: "Nhóm học tập lớp 8A", address: "nhomhoctap.lop8a@gmail.com" };
const INBOX = [
  { from: "Thầy/cô Tin học", addr: "gv.tinhoc.lop8a@gmail.com", subject: "Ảnh lễ khai giảng năm học mới", time: "07:30", star: true,
    body: "Chào các em!\nThầy/cô gửi các em bức ảnh quang cảnh buổi lễ khai giảng năm học mới của trường mình.\nCác em mở ảnh đính kèm, quan sát và cho biết bức ảnh có nội dung gì nhé!\nThầy/cô Tin học",
    files: [{ name: "Anh_le_khai_giang.jpg", src: "assets/khai-giang.jpg" }] },
  { from: "Câu lạc bộ Tin học", addr: "clb.tinhoc.thcs@gmail.com", subject: "Lịch sinh hoạt câu lạc bộ tháng này", time: "Hôm qua",
    body: "Chào các bạn!\nCâu lạc bộ sinh hoạt vào chiều thứ Năm hằng tuần tại phòng máy. Các bạn nhớ tham gia đầy đủ nhé.\nBan chủ nhiệm CLB" },
];

// ---- Hình 2.1 dạng sơ đồ: ảnh in → chụp lại → gửi qua mạng → điện thoại của An ----
const ANH_SO_HTML = `<div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:10px;max-width:900px;margin:0 auto;font-size:1.05rem;text-align:center">
  <div style="background:#fff;border:3px dashed #a8a29e;border-radius:14px;padding:8px 12px"><img src="assets/ruong-bac-thang.jpg" alt="" style="height:90px;border-radius:6px;display:block;margin:0 auto 4px">🖨️ Ảnh in trong tập ảnh cũ</div>
  <div style="font-size:1.8rem;color:#0369a1">➜</div>
  <div style="background:#fff;border:3px solid #0ea5e9;border-radius:14px;padding:8px 12px"><div style="font-size:2.4rem">📱</div>Khoa chụp lại<br><b>→ ảnh số</b></div>
  <div style="font-size:1.8rem;color:#0369a1">➜</div>
  <div style="background:#fff;border:3px solid #0ea5e9;border-radius:14px;padding:8px 12px"><div style="font-size:2.4rem">☁️✉️</div>Gửi qua<br>thư điện tử</div>
  <div style="font-size:1.8rem;color:#0369a1">➜</div>
  <div style="background:#fff;border:3px solid #db2777;border-radius:14px;padding:8px 12px"><div style="font-size:2.4rem">📲</div>An nhận ảnh</div>
</div>`;

// ---- 4 cách xác định thông tin đáng tin cậy (SGK tr.12–13) ----
const BON_CACH_HTML = `<div style="display:flex;flex-wrap:wrap;gap:10px;max-width:1000px;margin:0 auto;text-align:left">
  ${[["🏛️", "Xác định nguồn thông tin", "Thẩm quyền, uy tín của tổ chức/cá nhân cung cấp thông tin. Blog: ai cũng viết được; nhà sản xuất có thể phóng đại sản phẩm của mình.", "#0369a1"],
    ["💬", "Phân biệt ý kiến và sự kiện", "Ý kiến là quan điểm, mang cảm xúc và định kiến cá nhân nên độ tin cậy thấp hơn sự kiện.", "#7c3aed"],
    ["🔎", "Kiểm tra chứng cứ của kết luận", "Kết luận không có chứng cứ, cũng như ý kiến cá nhân, có độ tin cậy rất thấp.", "#db2777"],
    ["🗓️", "Đánh giá tính thời sự", "Thời điểm công bố quyết định thông tin còn ý nghĩa hay đã lỗi thời. Trang web lâu không cập nhật thường có độ tin cậy thấp.", "#059669"]].map(([ic, t, d, c]) =>
    `<div style="flex:1 1 200px;background:#fff;border:3px solid ${c};border-radius:16px;padding:10px 12px"><div style="font-size:1.9rem">${ic}</div><b style="color:${c};font-size:1.1rem">${t}</b><div style="margin-top:4px">${d}</div></div>`).join("")}
</div>`;

const LESSON = {
  meta: {
    subject: "Tin học", grade: "8", book: "Kết nối tri thức với cuộc sống",
    title: "Bài 2: Thông tin trong môi trường số", unit: "Chủ đề 2 — Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin",
    pages: "10–13", durationMinutes: 90,
  },
  objectives: {
    knowledge: [
      "Nêu được các đặc điểm của thông tin số: đa dạng, được thu thập ngày càng nhanh và nhiều, được lưu trữ với dung lượng khổng lồ bởi nhiều tổ chức và cá nhân, có tính bản quyền, có độ tin cậy rất khác nhau, có các công cụ tìm kiếm, chuyển đổi, truyền và xử lí hiệu quả.",
      "Trình bày được tầm quan trọng của việc biết khai thác các nguồn thông tin đáng tin cậy, nêu được ví dụ minh hoạ.",
    ],
    competencies: [
      "Tự học; giao tiếp và hợp tác (thảo luận nhóm); giải quyết vấn đề và sáng tạo (phân tích tình huống thông tin thật – giả).",
      "Năng lực số 1.2.TC2a: nhận biết thông tin thật – giả qua nguồn, nội dung, hình ảnh, thời gian đăng; phân biệt ý kiến và sự kiện.",
      "Năng lực số 1.2.TC2b: dùng máy tìm kiếm với từ khoá phù hợp, ưu tiên nguồn rõ ràng, tìm kiếm an toàn.",
      "Năng lực số 1.1.TC2b: hiểu vai trò của dữ liệu; sử dụng dữ liệu đúng mục đích, tôn trọng quyền riêng tư và bản quyền.",
      "Năng lực AI 8.A2.1: nhận biết và giải thích rằng hệ thống AI có thể thu thập, phân tích dữ liệu cá nhân người dùng.",
    ],
    qualities: ["Chăm chỉ, trung thực, trách nhiệm trong khai thác và sử dụng thông tin số."],
  },
  coreKnowledge: [
    "Thông tin được mã hoá thành dãy bit, được chuyển vào máy tính, điện thoại thông minh, máy tính bảng,… để có thể lan truyền, trao đổi trong môi trường kĩ thuật số gọi là thông tin số.",
    "Thông tin số dễ dàng được nhân bản và lan truyền nhưng khó bị xoá bỏ hoàn toàn; có thể được truy cập từ xa nếu người quản lí thông tin đó cho phép.",
    "Thông tin số đa dạng, được thu thập nhanh, được lưu trữ với dung lượng rất lớn bởi nhiều tổ chức và cá nhân; có nhiều công cụ hỗ trợ tìm kiếm, truy cập, lưu trữ, xử lí và chia sẻ; quyền tác giả được pháp luật bảo hộ; có mức độ tin cậy khác nhau; cần được quản lí, khai thác an toàn và có trách nhiệm.",
    "Thông tin đáng tin cậy giúp em đưa ra kết luận đúng, quyết định hành động đúng và giải quyết được các vấn đề đặt ra.",
    "Một số cách xác định thông tin có đáng tin cậy hay không: kiểm tra nguồn thông tin; phân biệt ý kiến với sự kiện; kiểm tra chứng cứ của kết luận; đánh giá tính thời sự của thông tin.",
  ],
  keywords: ["Thông tin số", "Nhân bản, lan truyền", "Bản quyền", "Độ tin cậy", "Tin giả"],
  settings: { basePoints: 100, useTimer: false, defaultTime: 60, sound: true, streakEnabled: true },

  activities: [
    /* =========================== TIẾT 1 =========================== */
    /* ===================== HĐ1: MỞ ĐẦU (5 phút) ===================== */
    {
      id: "mo-dau", name: "Mở đầu — Thư từ thầy/cô 📬", type: "knowledge",
      goal: "Tạo hứng thú; HS tiếp nhận và khai thác một thông tin số (ảnh gửi qua thư điện tử).",
      time: 300,
      task: "Nhóm 6 bạn mở hộp thư, mở thư “Ảnh lễ khai giảng năm học mới”, bấm vào ảnh đính kèm để xem. Thảo luận, thống nhất trên giấy A4: bức ảnh có nội dung gì?",
      mail: { key: "gmail-tin8-bai2", me: ME, inbox: INBOX,
        intro: "🧪 Hộp thư mô phỏng — bấm vào thư của thầy/cô, rồi bấm vào ảnh đính kèm để phóng to." },
      questions: [
        { question: "Bức ảnh thầy/cô gửi qua thư điện tử có nội dung gì?", type: "multiple-choice",
          options: ["Một trận thi đấu bóng đá", "Một buổi học trong phòng máy", "Cảnh ruộng bậc thang", "Quang cảnh buổi lễ khai giảng năm học mới"],
          answer: 3, explanation: "Ảnh chụp quang cảnh buổi lễ khai giảng năm học mới: băng rôn, cờ Tổ quốc, học sinh xếp hàng.", level: "nhan-biet", activity: "mo-dau" },
        { question: "Các em xem được bức ảnh mà không cần thầy/cô trao tận tay tấm ảnh giấy. Đó là nhờ đâu?", type: "multiple-choice",
          options: ["Ảnh đã được số hoá và gửi qua thư điện tử (Internet)", "Ảnh được in ra rồi phát cho từng bạn", "Thầy/cô chiếu ảnh bằng đèn pin", "Ảnh được gửi qua đường bưu điện"],
          answer: 0, explanation: "Ảnh là thông tin số: được gửi qua thư điện tử, người nhận truy cập từ xa bằng máy tính, điện thoại có kết nối Internet.", level: "thong-hieu", activity: "mo-dau" },
      ],
    },

    /* ===================== HĐ2.1: THÔNG TIN TRONG MÔI TRƯỜNG SỐ (30 phút) ===================== */
    {
      id: "hd1-anh-in-anh-so", name: "Hoạt động 1: Ảnh in và ảnh số 📸", type: "knowledge",
      goal: "Nhiệm vụ 1 (Phiếu học tập số 1): nhận ra ảnh số được gửi đi mà người gửi không mất ảnh gốc, có thể lưu trên nhiều thiết bị.",
      time: 420,
      task: "Nhóm đọc tình huống Hoạt động 1 (SGK tr.10), thảo luận và ghi vào Phiếu học tập số 1: 1) An có thể nhận được ảnh bằng cách nào? 2) Sau khi An nhận được ảnh, Khoa có bị mất bức ảnh gốc không? 3) An có thể lưu trữ ảnh vào những thiết bị nào?",
      sgkImage: "assets/sgk/hoat-dong-1.jpg",
      html: ANH_SO_HTML,
      content: {
        heading: "📸 Ảnh in và ảnh số",
        prompt: "Trong tập ảnh cũ, Khoa thấy bức ảnh ruộng bậc thang. Để chia sẻ ảnh với An mà không cần phải đến nhà bạn, Khoa đã dùng điện thoại thông minh chụp lại bức ảnh và gửi cho An qua thư điện tử.",
      },
      questions: [
        { question: "Câu 1. An có thể nhận được ảnh bằng những cách nào? (Chọn tất cả ý đúng)", type: "multiple-select",
          options: ["Mở hộp thư điện tử của mình để nhận ảnh", "Nhận qua ứng dụng nhắn tin, mạng xã hội (Zalo, Facebook…)", "Nhận qua Bluetooth khi ở gần Khoa", "Bắt buộc phải đến nhà Khoa lấy bức ảnh giấy"],
          answer: [0, 1, 2], explanation: "Ảnh số có thể được truy cập từ xa qua hộp thư điện tử, ứng dụng nhắn tin, mạng xã hội, hoặc truyền qua Bluetooth — không cần nhận trực tiếp như ảnh in trên giấy.", level: "nhan-biet", activity: "hd1-anh-in-anh-so" },
        { question: "Câu 2. Sau khi An nhận được ảnh, Khoa có bị mất bức ảnh gốc không?", type: "multiple-choice",
          options: ["Có — ảnh chuyển hẳn sang máy của An", "Chỉ mất ảnh số, vẫn còn ảnh giấy", "Không — Khoa vẫn còn cả ảnh in và ảnh số", "Mất cả ảnh in lẫn ảnh số"],
          answer: 2, explanation: "Bức ảnh số được tạo ra không tốn vật liệu và khi Khoa gửi cho An, Khoa không bị mất đi bức ảnh đó (SGK tr.10).", level: "nhan-biet", activity: "hd1-anh-in-anh-so" },
        { question: "Câu 3. An có thể lưu trữ ảnh vào những thiết bị nào? (Chọn tất cả ý đúng)", type: "multiple-select",
          options: ["Điện thoại thông minh", "Ổ đĩa của máy tính", "USB", "Một tờ giấy trắng"],
          answer: [0, 1, 2], explanation: "An có thể lưu ảnh về máy tính, điện thoại, USB… rồi chỉnh sửa và tiếp tục chia sẻ cho người khác (SGK tr.11).", level: "thong-hieu", activity: "hd1-anh-in-anh-so" },
      ],
    },
    {
      id: "thong-tin-so-la-gi", name: "Thông tin số là gì? 🔢", type: "knowledge",
      goal: "Nhiệm vụ 2: nêu được thông tin số là gì và đặc điểm chính của thông tin số.",
      time: 360,
      task: "Nhóm đọc mục a) Thông tin số (SGK tr.10–11) và trả lời: 1) Thông tin số là gì? 2) Nêu những đặc điểm của thông tin số.",
      sgkImage: "assets/sgk/sgk-trang11.jpg",
      content: {
        heading: "🔢 a) Thông tin số",
        revealLabel: "📖 Thông tin số (SGK tr.10–11)",
        blocks: [
          { kind: "text", value: "Bằng thao tác chụp lại bức ảnh, Khoa đã tạo ra một bức ảnh số. Khác với bức ảnh trên giấy, bức ảnh số được tạo ra không tốn vật liệu và khi Khoa gửi cho An, Khoa không bị mất đi bức ảnh đó." },
          { kind: "text", value: "Thông tin được mã hoá thành dãy bit, được chuyển vào máy tính, điện thoại thông minh, máy tính bảng,… để có thể lan truyền, trao đổi trong môi trường kĩ thuật số còn được gọi ngắn gọn là thông tin số." },
          { kind: "list", value: [
            "Thông tin số có thể được truy cập từ xa thông qua kết nối Internet: An vào hộp thư điện tử để nhận ảnh mà không cần nhận trực tiếp từ Khoa; An lưu ảnh về máy tính hoặc điện thoại, chỉnh sửa rồi tiếp tục chia sẻ.",
            "Thông tin số dễ dàng được nhân bản và chia sẻ; còn có thể lan truyền tự động do nhiều thiết bị được đồng bộ với nhau — em khó biết thiết bị nào đã nhận được thông tin hoặc thông tin sẽ lan rộng đến mức nào. Thông tin số khó bị xoá bỏ hoàn toàn.",
          ] },
        ],
      },
      questions: [
        { question: "Thông tin số là gì?", type: "multiple-choice",
          options: ["Thông tin chỉ gồm các con số", "Thông tin được in trên giấy rồi chụp ảnh lại", "Thông tin được mã hoá thành dãy bit, chuyển vào máy tính, điện thoại, máy tính bảng… để lan truyền, trao đổi trong môi trường kĩ thuật số", "Thông tin do máy tính tự nghĩ ra"],
          answer: 2, explanation: "Định nghĩa SGK tr.10: thông tin được mã hoá thành dãy bit… để có thể lan truyền, trao đổi trong môi trường kĩ thuật số.", level: "nhan-biet", activity: "thong-tin-so-la-gi" },
        { question: "Theo SGK, thông tin số có những đặc điểm chính nào? (Chọn tất cả ý đúng)", type: "multiple-select",
          options: ["Dễ dàng được nhân bản và lan truyền", "Khó bị xoá bỏ hoàn toàn", "Chỉ xem được khi cầm trực tiếp trên tay", "Có thể được truy cập từ xa nếu người quản lí thông tin đó cho phép"],
          answer: [0, 1, 3], explanation: "Hai đặc điểm chính (SGK tr.11): dễ nhân bản, lan truyền nhưng khó xoá bỏ hoàn toàn; có thể truy cập từ xa nếu người quản lí thông tin cho phép.", level: "thong-hieu", activity: "thong-tin-so-la-gi" },
        { question: "Bạn Hà lỡ gửi một bức ảnh lên nhóm lớp rồi xoá ngay sau 1 phút. Nhận định nào đúng?", type: "multiple-choice",
          options: ["Xoá rồi thì chắc chắn không còn ai có bức ảnh", "Có thể đã có bạn lưu về hoặc thiết bị đồng bộ tự động — thông tin số khó bị xoá bỏ hoàn toàn", "Bức ảnh tự biến mất khỏi mọi máy tính trên thế giới", "Chỉ cần tắt điện thoại là bức ảnh bị xoá"],
          answer: 1, explanation: "Thông tin số dễ nhân bản, lan truyền (kể cả tự động do đồng bộ) nên khó biết đã lan đến đâu và khó bị xoá bỏ hoàn toàn — hãy suy nghĩ kĩ trước khi chia sẻ.", level: "van-dung", activity: "thong-tin-so-la-gi" },
      ],
      remember: [
        "Thông tin số dễ dàng được nhân bản và lan truyền nhưng khó bị xoá bỏ hoàn toàn.",
        "Thông tin số có thể được truy cập từ xa nếu người quản lí thông tin đó cho phép.",
      ],
    },
    {
      id: "mo-phong-lan-truyen", name: "Mô phỏng: Bức ảnh số đi đến đâu? 🌐", type: "knowledge",
      goal: "Trải nghiệm đặc điểm “dễ nhân bản, lan truyền nhưng khó xoá bỏ hoàn toàn” của thông tin số.",
      time: 300,
      task: "Bấm ▶ Bước tiếp để theo dõi bức ảnh ruộng bậc thang đi đến những đâu và đếm số bản sao. Cuối cùng, thử giúp Khoa xoá bức ảnh khỏi mọi nơi — có làm được không? Vì sao?",
      spread: {
        title: "Hành trình của bức ảnh ruộng bậc thang", thumb: "assets/ruong-bac-thang.jpg",
        intro: "Tình huống theo SGK tr.10–11. Mỗi ô là một nơi đang giữ một bản sao của bức ảnh số.",
        steps: [
          { text: "📸 Khoa dùng điện thoại chụp lại bức ảnh in trong tập ảnh cũ → tạo ra một bức ảnh số.", nodes: [
            { id: "giay", icon: "📔", name: "Tập ảnh cũ của Khoa", paper: true },
            { id: "dtKhoa", icon: "📱", name: "Điện thoại của Khoa", from: "giay", via: "chụp lại" } ] },
          { text: "✉️ Khoa gửi ảnh cho An qua thư điện tử — máy chủ của dịch vụ thư điện tử lưu lại bức ảnh.", nodes: [
            { id: "mayChuThu", icon: "🗄️", name: "Máy chủ dịch vụ thư điện tử", from: "dtKhoa", via: "thư điện tử", lock: "Bản sao trên máy chủ của dịch vụ thư điện tử do nhà cung cấp dịch vụ quản lí — Khoa không tự xoá được." } ] },
          { text: "📥 An vào hộp thư, lưu ảnh về máy tính. Điện thoại của An đồng bộ với máy tính nên cũng tự động có ảnh.", nodes: [
            { id: "mtAn", icon: "💻", name: "Máy tính của An", from: "mayChuThu", via: "tải về", lock: "Đây là máy tính của An — Khoa không có quyền xoá ảnh trên máy của bạn." },
            { id: "dtAn", icon: "📲", name: "Điện thoại của An", from: "mtAn", via: "đồng bộ tự động", lock: "Ảnh tự đồng bộ sang điện thoại của An — Khoa không có quyền xoá." } ] },
          { text: "🎨 An chỉnh sửa ảnh, dùng làm nền cho ảnh của mình rồi đưa lên trang cá nhân trên mạng xã hội.", nodes: [
            { id: "mxh", icon: "🌐", name: "Máy chủ mạng xã hội", from: "dtAn", via: "đăng trang cá nhân", edited: true, lock: "Ảnh do An đăng, được mạng xã hội lưu trữ — Khoa không xoá được." } ] },
          { text: "👀 Bạn bè của An xem bài đăng; bạn Minh tải ảnh về, bạn Lan chia sẻ tiếp cho người khác…", nodes: [
            { id: "minh", icon: "📱", name: "Điện thoại của bạn Minh", from: "mxh", via: "tải về", edited: true, lock: "Ảnh đã nằm trên máy của bạn Minh — Khoa không kiểm soát được." },
            { id: "lan", icon: "💻", name: "Máy tính của bạn Lan", from: "mxh", via: "chia sẻ", edited: true, lock: "Bạn Lan đã chia sẻ tiếp — Khoa không biết ảnh còn lan đến đâu." },
            { id: "banLan", icon: "📱", name: "Bạn của bạn Lan", from: "lan", via: "chia sẻ tiếp", edited: true, lock: "Khoa thậm chí không biết người này là ai!" } ] },
        ],
        end: "Khoa chỉ xoá được bản sao trên thiết bị của mình. Thông tin số dễ dàng được nhân bản và lan truyền nhưng khó bị xoá bỏ hoàn toàn → cần suy nghĩ kĩ trước khi chia sẻ.",
      },
    },
    {
      id: "hd2-thong-tin-so", name: "Hoạt động 2: Thông tin số 📲", type: "knowledge",
      goal: "Nhiệm vụ 3 (Phiếu học tập số 2): thông tin số được ứng dụng lưu trữ, cho phép một số người tiếp cận và dễ chỉnh sửa, chia sẻ tiếp.",
      time: 420,
      task: "Nhóm đọc tình huống Hoạt động 2 (SGK tr.11), thảo luận và ghi vào Phiếu học tập số 2: 1) Máy chủ của dịch vụ thư điện tử có lưu trữ bức ảnh Khoa gửi không? 2) Những ai có thể xem được bức ảnh An đưa lên mạng xã hội? 3) An có thể gửi ảnh sau khi chỉnh sửa cho Khoa hoặc các bạn khác được không?",
      sgkImage: "assets/sgk/hoat-dong-2.jpg",
      content: {
        heading: "📲 Hoạt động 2: Thông tin số",
        prompt: "Khoa gửi cho An bức ảnh ruộng bậc thang qua thư điện tử. Nhận được, An chỉnh sửa lại ảnh cho đẹp hơn và sử dụng nó làm nền cho ảnh của mình rồi đưa lên trang cá nhân trên mạng xã hội.",
        image: "assets/sgk/hinh-2-2.jpg", imageCaption: "Hình 2.2. Bức ảnh được sử dụng làm nền",
      },
      questions: [
        { question: "Câu 1. Máy chủ của dịch vụ thư điện tử có lưu trữ bức ảnh Khoa gửi không?", type: "multiple-choice",
          options: ["Có — ứng dụng thư điện tử lưu trữ lại bức ảnh", "Không — ảnh chỉ đi thẳng từ điện thoại Khoa sang An", "Chỉ lưu trong 1 giây rồi tự xoá", "Chỉ lưu nếu An trả lời thư"],
          answer: 0, explanation: "Khi bức ảnh được chia sẻ qua một ứng dụng như thư điện tử, mạng xã hội, nó sẽ được ứng dụng đó lưu trữ lại (SGK tr.11).", level: "nhan-biet", activity: "hd2-thong-tin-so" },
        { question: "Câu 2. Những ai có thể xem được bức ảnh An đưa lên mạng xã hội?", type: "multiple-choice",
          options: ["Chỉ riêng An", "Chỉ riêng Khoa", "Những người được An cho phép xem theo cài đặt của trang cá nhân (ví dụ bạn bè của An)", "Không ai xem được"],
          answer: 2, explanation: "Mạng xã hội lưu trữ bức ảnh và cho phép một số người được tiếp cận (tuỳ quyền An cài đặt: bạn bè, hoặc mọi người nếu để công khai) và họ có thể tiếp tục chia sẻ.", level: "thong-hieu", activity: "hd2-thong-tin-so" },
        { question: "Câu 3. An có thể gửi ảnh sau khi chỉnh sửa cho Khoa hoặc các bạn khác được không?", type: "multiple-choice",
          options: ["Không, ảnh đã chỉnh sửa không gửi được", "Chỉ gửi được cho Khoa", "Chỉ gửi được nếu in ra giấy", "Được — thông tin số dễ dàng được chỉnh sửa và tiếp tục chia sẻ"],
          answer: 3, explanation: "Thông tin số dễ dàng được chỉnh sửa và lại tiếp tục được lan truyền trên mạng (SGK tr.11).", level: "nhan-biet", activity: "hd2-thong-tin-so" },
      ],
    },
    {
      id: "thong-tin-so-xa-hoi", name: "Thông tin số trong xã hội 🏙️", type: "knowledge",
      goal: "Nhiệm vụ 4: nêu được đặc điểm của thông tin số trong xã hội; trả lời câu hỏi SGK tr.12.",
      time: 480,
      task: "Nhóm đọc mục b) Thông tin số trong xã hội (SGK tr.11–12): 1) Thông tin số trong xã hội có những đặc điểm gì? 2) Trả lời câu hỏi ghép đúng ở SGK tr.12.",
      sgkImage: "assets/sgk/sgk-trang12.jpg",
      content: {
        heading: "🏙️ b) Thông tin số trong xã hội",
        revealLabel: "📖 Thông tin số trong xã hội (SGK tr.11)",
        blocks: [
          { kind: "text", value: "Khi bức ảnh đã được chia sẻ qua một ứng dụng, ví dụ thư điện tử, mạng xã hội, nó sẽ được ứng dụng đó lưu trữ lại và cho phép một số người được tiếp cận hay tiếp tục chia sẻ. Thông tin số có thể được lưu trữ với dung lượng rất lớn bởi nhiều cá nhân, tổ chức và được cấp quyền truy cập khác nhau." },
          { kind: "text", value: "Không phải mọi thông tin trên mạng đều chân thực. An có thể lấy bức ảnh ruộng bậc thang được chụp ở Lào Cai làm nền cho ảnh của mình, nhưng không có nghĩa là An đã tới Lào Cai. Thông tin số dễ dàng được chỉnh sửa và lại tiếp tục được lan truyền trên mạng. Thông tin số có độ tin cậy rất khác nhau, phụ thuộc vào nguồn gốc và mục tiêu thông tin." },
        ],
      },
      questions: [
        { question: "Câu hỏi SGK tr.12 — Em hãy chọn phương án ghép đúng: Thông tin số được nhiều tổ chức và cá nhân lưu trữ với dung lượng rất lớn,", type: "multiple-choice",
          options: ["được truy cập tự do và có độ tin cậy khác nhau.", "được bảo hộ quyền tác giả và không đáng tin cậy.", "được bảo hộ quyền tác giả và có độ tin cậy khác nhau.", "được bảo hộ quyền tác giả và rất đáng tin cậy."],
          answer: 2, explanation: "Quyền tác giả của thông tin số được pháp luật bảo hộ và thông tin số có mức độ tin cậy khác nhau (SGK tr.12). Không phải được truy cập tự do (A), cũng không phải lúc nào cũng không đáng tin (B) hay rất đáng tin (D).", level: "thong-hieu", activity: "thong-tin-so-xa-hoi", sgkImage: "assets/sgk/cau-hoi-tr12.jpg" },
        { question: "Trên mạng xã hội, An đăng ảnh mình đứng trước ruộng bậc thang Lào Cai (ảnh ghép nền). Kết luận nào đúng?", type: "multiple-choice",
          options: ["Chắc chắn An đã tới Lào Cai", "Ảnh trên mạng xã hội luôn là ảnh thật", "Ảnh đẹp nên chắc chắn đáng tin cậy", "Chưa thể kết luận An đã tới Lào Cai — thông tin số dễ được chỉnh sửa"],
          answer: 3, explanation: "An lấy ảnh Lào Cai làm nền không có nghĩa An đã tới Lào Cai. Thông tin số dễ chỉnh sửa, có độ tin cậy khác nhau, phụ thuộc vào nguồn gốc và mục tiêu thông tin.", level: "van-dung", activity: "thong-tin-so-xa-hoi" },
        { question: "Quyền tác giả của thông tin số (bài viết, ảnh, video…) được pháp luật bảo hộ.", type: "true-false",
          answer: true, explanation: "Đúng — SGK tr.12: quyền tác giả của thông tin số được pháp luật bảo hộ. Muốn dùng ảnh, bài viết của người khác cần xin phép, ghi rõ nguồn.", level: "nhan-biet", activity: "thong-tin-so-xa-hoi" },
        { question: "Vì thông tin số dễ sao chép nên ai cũng được tự do lấy ảnh của người khác để bán.", type: "true-false",
          answer: false, explanation: "Sai — dễ sao chép không có nghĩa là được tự do sử dụng. Thông tin số có bản quyền và cần được khai thác an toàn, có trách nhiệm.", level: "thong-hieu", activity: "thong-tin-so-xa-hoi" },
      ],
      remember: [
        "Thông tin số đa dạng, được thu thập nhanh, được lưu trữ với dung lượng rất lớn bởi nhiều tổ chức và cá nhân.",
        "Có nhiều công cụ hỗ trợ tìm kiếm, truy cập, lưu trữ, xử lí và chia sẻ thông tin số.",
        "Quyền tác giả của thông tin số được pháp luật bảo hộ.",
        "Thông tin số có mức độ tin cậy khác nhau.",
        "Thông tin số cần được quản lí, khai thác an toàn và có trách nhiệm.",
      ],
    },

    /* =========================== TIẾT 2 =========================== */
    /* ===================== HĐ2.2: THÔNG TIN ĐÁNG TIN CẬY (30 phút) ===================== */
    {
      id: "hd3-tin-gia", name: "Hoạt động 3: Tin giả 📰", type: "vandung",
      goal: "Nhiệm vụ 1: kể một tin giả, nêu tác hại và cách nhận biết.",
      time: 480,
      task: "Nhóm quan sát Hình 2.3, thảo luận, ghi bảng nhóm rồi gửi câu trả lời cho thầy/cô; đại diện nhóm trình bày.",
      sgkImage: "assets/sgk/hoat-dong-3.jpg",
      html: `<div style="text-align:center"><img class="lesson-img" src="assets/sgk/hinh-2-3.jpg" alt="Hình 2.3. Tin giả" style="max-width:420px"></div>`,
      intro: "Gửi câu trả lời cho thầy/cô rồi bấm để xem gợi ý.",
      cases: [
        { question: "1. Em hãy kể lại một nội dung trên mạng mà em biết đó là tin giả.",
          answer: "Gợi ý: tin đồn lan truyền năm 2020 khi dịch Covid-19 bùng phát — “Cách nhanh nhất để biết mình KHÔNG mắc Covid-19 là nín thở trong 10 giây mà không ho hay khó chịu” (giáo án). Hoặc các tin nhắn “chia sẻ gấp” không rõ nguồn, ảnh ghép được chỉnh sửa…" },
        { question: "2. Tin giả đó gây ra tác hại gì nếu người đọc tin vào điều đó?",
          answer: "Gợi ý: nhiều người tin là thật và làm theo, chủ quan không đi xét nghiệm nên dịch bệnh dễ lây lan trong cộng đồng. Tin giả gây hoang mang dư luận, dẫn tới quyết định sai lầm; người đăng tải, chia sẻ tin giả, tin sai sự thật có thể bị xử lí theo quy định của pháp luật." },
        { question: "3. Làm thế nào để em biết đó là tin giả?",
          answer: "Gợi ý: xác định nguồn thông tin (cơ quan y tế, báo chí chính thống hay tài khoản ẩn danh?); kiểm tra chứng cứ của kết luận (cách xác định nhiễm bệnh là xét nghiệm, không phải nín thở); phân biệt ý kiến với sự kiện; đánh giá tính thời sự; đối chiếu nhiều nguồn tin." },
      ],
    },
    {
      id: "thong-tin-dang-tin-cay", name: "Thông tin đáng tin cậy ✅", type: "knowledge",
      goal: "Nhiệm vụ 2: nêu được thế nào là thông tin không đáng tin cậy, tầm quan trọng của thông tin đáng tin cậy và 4 cách xác định.",
      time: 600,
      task: "Nhóm đọc mục 2 (SGK tr.12–13) và trả lời: 1) Như thế nào là thông tin đáng tin cậy? 2) Tại sao thông tin đáng tin cậy lại quan trọng? 3) Làm sao em xác định được thông tin đáng tin cậy hay không?",
      sgkImage: "assets/sgk/sgk-trang12.jpg",
      content: {
        heading: "✅ Thông tin đáng tin cậy",
        revealLabel: "📖 Thông tin đáng tin cậy (SGK tr.12–13)",
        blocks: [
          { kind: "text", value: "Không phải mọi thông tin chúng ta nghe thấy, xem được hay đọc được đều là sự thật. Internet là một kho thông tin khổng lồ. Tuy nhiên, nhiều thông tin trên Internet có thể không đáng tin cậy. Thông tin không đáng tin cậy có thể là:" },
          { kind: "list", value: ["Thông tin không trung thực, mang tính chất lừa dối.", "Thông tin đồn thổi, dẫn em đến kết luận thiếu căn cứ.", "Thông tin thiếu kiểm chứng dẫn em đến quyết định sai lầm."] },
          { kind: "text", value: "Thông tin không đáng tin cậy có giá trị sử dụng thấp, thậm chí không sử dụng được. Việc xác định thông tin đáng tin cậy và biết khai thác nguồn thông tin đáng tin cậy rất quan trọng vì điều đó giúp em đưa ra những quyết định đúng đắn. Chẳng hạn, nếu không biết khai thác nguồn thông tin đáng tin cậy mà tin vào những quảng cáo quá mức, em có thể tiêu tiền một cách lãng phí." },
          { kind: "html", value: BON_CACH_HTML },
        ],
      },
      questions: [
        { question: "Thông tin không đáng tin cậy có thể là những loại nào? (Chọn tất cả ý đúng)", type: "multiple-select",
          options: ["Thông tin không trung thực, mang tính chất lừa dối", "Thông tin đồn thổi, dẫn đến kết luận thiếu căn cứ", "Thông tin do cơ quan có thẩm quyền công bố chính thức", "Thông tin thiếu kiểm chứng dẫn đến quyết định sai lầm"],
          answer: [0, 1, 3], explanation: "SGK tr.12 nêu 3 loại: không trung thực, lừa dối; đồn thổi, thiếu căn cứ; thiếu kiểm chứng. Thông tin chính thức của cơ quan có thẩm quyền thường có độ tin cậy cao.", level: "nhan-biet", activity: "thong-tin-dang-tin-cay" },
        { question: "Vì sao việc xác định thông tin đáng tin cậy lại quan trọng?", type: "multiple-choice",
          options: ["Vì giúp em đưa ra kết luận đúng, quyết định hành động đúng và giải quyết được vấn đề đặt ra", "Vì thông tin đáng tin cậy luôn ngắn gọn hơn", "Vì thông tin đáng tin cậy luôn có nhiều lượt thích", "Vì như vậy em không cần học nữa"],
          answer: 0, explanation: "Thông tin đáng tin cậy giúp em đưa ra kết luận đúng, quyết định hành động đúng và giải quyết được các vấn đề đặt ra (SGK tr.13).", level: "thong-hieu", activity: "thong-tin-dang-tin-cay" },
        { question: "Theo SGK, cách nào dưới đây giúp xác định thông tin có đáng tin cậy hay không? (Chọn tất cả ý đúng)", type: "multiple-select",
          options: ["Xác định nguồn thông tin", "Phân biệt ý kiến và sự kiện", "Đếm xem bài đăng có bao nhiêu lượt thích", "Kiểm tra chứng cứ của kết luận", "Đánh giá tính thời sự của thông tin"],
          answer: [0, 1, 3, 4], explanation: "4 cách trong SGK: kiểm tra nguồn thông tin; phân biệt ý kiến với sự kiện; kiểm tra chứng cứ của kết luận; đánh giá tính thời sự. Nhiều lượt thích không chứng minh thông tin là đúng.", level: "thong-hieu", activity: "thong-tin-dang-tin-cay" },
        { question: "Em đọc một trang web hướng dẫn thủ tục tuyển sinh, nhưng trang này cập nhật lần cuối cách đây 6 năm. Em nên làm gì?", type: "multiple-choice",
          options: ["Tin ngay vì đó là trang web", "Đánh giá tính thời sự: thông tin có thể đã lỗi thời, cần tìm nguồn chính thức mới nhất", "Chia sẻ cho cả lớp", "Bỏ qua việc tuyển sinh"],
          answer: 1, explanation: "Nội dung những trang web đã lâu không được cập nhật thường có độ tin cậy thấp (SGK tr.13) — cần tìm thông tin mới từ nguồn chính thức.", level: "van-dung", activity: "thong-tin-dang-tin-cay" },
      ],
      remember: [
        "Thông tin đáng tin cậy giúp em đưa ra kết luận đúng, quyết định hành động đúng và giải quyết được các vấn đề đặt ra.",
        "Một số cách xác định thông tin có đáng tin cậy hay không: kiểm tra nguồn thông tin; phân biệt ý kiến với sự kiện; kiểm tra chứng cứ của kết luận; đánh giá tính thời sự của thông tin.",
      ],
    },
    {
      id: "y-kien-su-kien", name: "Thám tử: Ý kiến hay sự kiện? 🕵️", type: "dragdrop",
      goal: "Phân biệt ý kiến (quan điểm cá nhân) với sự kiện (có thể kiểm chứng).",
      time: 360,
      task: "Nhóm xếp mỗi phát biểu vào “Ý kiến” hoặc “Sự kiện”. Xếp hết rồi bấm Nộp bài.",
      groups: ["💬 Ý kiến (quan điểm cá nhân)", "📌 Sự kiện (kiểm chứng được)"],
      items: [
        { text: "“Tôi nghĩ đây là bộ phim hoạt hình hay nhất mọi thời đại.”", group: 0 },
        { text: "“Tôi tin rằng việc đó đã xảy ra!”", group: 0 },
        { text: "“Phở là món ăn ngon nhất thế giới.”", group: 0 },
        { text: "“Chắc chắn đội bóng lớp mình sẽ vô địch năm nay.”", group: 0 },
        { text: "“Chiếc điện thoại này đẹp hơn hẳn mọi chiếc khác.”", group: 0 },
        { text: "“Tin học là môn học thú vị nhất.”", group: 0 },
        { text: "Năm 1642, Blaise Pascal chế tạo máy tính cơ học Pascaline.", group: 1 },
        { text: "Ở áp suất khí quyển tiêu chuẩn, nước sôi ở 100 °C.", group: 1 },
        { text: "Theo sổ điểm danh, lớp 8A có 38 học sinh.", group: 1 },
        { text: "Theo biên bản trận đấu, trận bóng tối qua kết thúc với tỉ số 2 – 1.", group: 1 },
        { text: "Theo lịch của nhà trường, lễ khai giảng tổ chức ngày 5 tháng 9.", group: 1 },
        { text: "Bức ảnh ruộng bậc thang trong Hình 2.1 được Khoa gửi qua thư điện tử.", group: 1 },
      ],
      explanation: "Ý kiến là quan điểm, mang cảm xúc và định kiến cá nhân, không phải sự kiện; độ tin cậy thấp hơn sự kiện (SGK tr.13). Sự kiện có thể kiểm chứng bằng chứng cứ, nguồn rõ ràng.",
    },

    /* ===================== HĐ3: LUYỆN TẬP (15 phút) ===================== */
    {
      id: "tin-nhan-tinh-huong", name: "Luyện tập: Tin thật hay tin giả? 💬", type: "chat",
      goal: "Vận dụng 4 cách xác định thông tin đáng tin cậy để xử lí các tin nhắn, bài đăng trên mạng.",
      time: 420,
      task: "Đọc từng tin nhắn/bài đăng trong nhóm lớp và chọn cách xử lí đúng nhất. Trả lời hết các tin nhắn.",
      intro: "📱 Mô phỏng nhóm nhắn tin của lớp — các nhân vật, tin nhắn đều hư cấu.",
      chat: { name: "Nhóm lớp 8A", avatar: "👥", status: "42 thành viên" },
      winText: "Tuyệt vời — em đã là một “thám tử tin giả” thực thụ!",
      questions: [
        { question: "⚠️ CHIA SẺ GẤP! Uống nước chanh nóng mỗi sáng sẽ chữa khỏi mọi loại bệnh, bác sĩ giấu kín bí mật này!!!", type: "multiple-choice", chat: { name: "Tin Nong 24h", avatar: "📢", status: "Tài khoản không rõ danh tính" },
          options: ["Chia sẻ ngay cho gia đình", "Không chia sẻ; kiểm tra nguồn và chứng cứ — tìm thông tin từ cơ quan y tế, báo chí chính thống", "Tin ngay vì có chữ “bác sĩ”", "Bấm thích rồi chia sẻ vào mọi nhóm"],
          answer: 1, reaction: "Tớ cũng thấy lạ, may mà cậu nhắc 👍", badReaction: "Hả, mọi người đang hoảng lên vì tin này đấy 😟",
          explanation: "Nguồn không rõ ràng, kết luận “chữa khỏi mọi loại bệnh” không có chứng cứ → không đáng tin cậy. Kiểm tra nguồn và chứng cứ, không lan truyền tin chưa kiểm chứng.",
          level: "van-dung", activity: "tin-nhan-tinh-huong" },
        { question: "Bạn Tuấn: Trường mình được nghỉ học cả tuần sau đấy! Tớ nghe anh họ của bạn cùng xóm kể 😆", type: "multiple-choice", chat: { name: "Tuấn", avatar: "🧑", status: "Bạn cùng lớp" },
          options: ["Nghỉ ở nhà luôn, không cần hỏi ai", "Chia sẻ lên mạng xã hội cho cả trường biết", "Kiểm tra thông báo chính thức của nhà trường hoặc hỏi thầy/cô chủ nhiệm", "Tin ngay vì bạn Tuấn nói"],
          answer: 2, reaction: "Ừ nhỉ, để tớ hỏi cô chủ nhiệm xem 😅", badReaction: "Ơ, hình như tin đồn thôi, cả lớp vẫn phải đi học 😬",
          explanation: "Đây là thông tin đồn thổi (nghe kể lại qua nhiều người) → dễ dẫn tới kết luận thiếu căn cứ. Hãy xác định nguồn: thông báo chính thức của trường, thầy/cô.",
          level: "van-dung", activity: "tin-nhan-tinh-huong" },
        { question: "Bạn Lan gửi ảnh: “Tuyết rơi trắng xoá giữa trung tâm thành phố mình sáng nay!!!” ❄️ (ảnh không ghi nguồn, không có báo nào đưa tin)", type: "multiple-choice", chat: { name: "Lan", avatar: "👧", status: "Bạn cùng lớp" },
          options: ["Ảnh có thể đã được chỉnh sửa, ghép — cần kiểm tra nguồn gốc ảnh và đối chiếu tin tức chính thống", "Ảnh thì không thể là giả", "Tin ngay vì ảnh rất đẹp", "Gửi ngay cho mọi người xem"],
          answer: 0, reaction: "Tớ tra lại rồi, ảnh này ghép từ nước ngoài đấy 😅", badReaction: "Hoá ra ảnh ghép, nhiều bạn tin thật rồi 😓",
          explanation: "Thông tin số dễ dàng được chỉnh sửa (SGK tr.11). Ảnh không rõ nguồn, không có bằng chứng từ nguồn chính thống → cần kiểm chứng.",
          level: "van-dung", activity: "tin-nhan-tinh-huong" },
        { question: "Bạn Minh gửi đường link: “Lịch thi vào lớp 10 năm nay nè!” (bài viết đăng từ 6 năm trước)", type: "multiple-choice", chat: { name: "Minh", avatar: "🧑‍🎓", status: "Bạn cùng lớp" },
          options: ["Dùng lịch này để ôn thi", "Đánh giá tính thời sự: bài đã cũ, cần xem thông báo mới nhất của cơ quan quản lí giáo dục", "Lịch thi năm nào cũng giống nhau", "Không cần quan tâm"],
          answer: 1, reaction: "Ừ nhỉ, bài cũ quá, để tớ tìm thông báo mới 👍", badReaction: "Ôi, lịch này là của mấy năm trước rồi 😱",
          explanation: "Thời điểm công bố thông tin quyết định thông tin còn ý nghĩa hay đã lỗi thời (SGK tr.13).",
          level: "van-dung", activity: "tin-nhan-tinh-huong" },
        { question: "Quảng cáo: “Kem X trắng da sau 3 ngày, hiệu quả 100%, tốt hơn mọi sản phẩm khác!” — do chính hãng sản xuất kem X đăng", type: "multiple-choice", chat: { name: "Quảng cáo được tài trợ", avatar: "🛍️", status: "Được tài trợ" },
          options: ["Mua ngay vì hãng nói hiệu quả 100%", "Tin vì quảng cáo nào cũng đúng", "Chia sẻ cho người thân mua", "Nhà sản xuất có thể phóng đại lợi ích sản phẩm — cần tham khảo nguồn độc lập, đáng tin cậy trước khi mua"],
          answer: 3, reaction: "Chuẩn! Không nên tiêu tiền lãng phí 💡", badReaction: "Mua rồi mới thấy không như quảng cáo 😞",
          explanation: "Các nhà sản xuất có thể phóng đại lợi ích sản phẩm, hạ thấp đối thủ (SGK tr.12). Tin vào quảng cáo quá mức có thể tiêu tiền lãng phí.",
          level: "van-dung", activity: "tin-nhan-tinh-huong" },
        { question: "Bạn Hùng: “Tớ tin chắc chắn bạn Nam lấy bút của tớ!” (Hùng không nhìn thấy, cũng không có ai làm chứng)", type: "multiple-choice", chat: { name: "Hùng", avatar: "🧒", status: "Bạn cùng lớp" },
          options: ["Đây là ý kiến, chưa có chứng cứ — chưa thể kết luận Nam lấy bút", "Chắc chắn Nam đã lấy vì Hùng nói “chắc chắn”", "Đăng lên nhóm lớp để mọi người biết", "Nhắn tin trách Nam ngay"],
          answer: 0, reaction: "Ừ, để tớ tìm kĩ lại cặp đã 😅", badReaction: "Hoá ra bút rơi dưới gầm bàn, Nam buồn lắm 😢",
          explanation: "“Tôi tin rằng…” là ý kiến, không phải sự kiện; kết luận không có chứng cứ có độ tin cậy rất thấp (SGK tr.13).",
          level: "van-dung-cao", activity: "tin-nhan-tinh-huong" },
      ],
    },
    {
      id: "xep-hang-nguon-tin", name: "Trò chơi: Xếp hạng nguồn tin 🏅", type: "dragdrop",
      goal: "Nhận biết nguồn thông tin có độ tin cậy cao và nguồn cần kiểm chứng thêm.",
      time: 300,
      task: "Nhóm xếp mỗi nguồn tin vào đúng nhóm. Xếp hết rồi bấm Nộp bài.",
      groups: ["✅ Nguồn có độ tin cậy cao", "⚠️ Cần kiểm chứng thêm"],
      items: [
        { text: "Cổng thông tin điện tử của Chính phủ", group: 0 },
        { text: "Trang web chính thức của Bộ Giáo dục và Đào tạo", group: 0 },
        { text: "Báo chí chính thống (có cơ quan chủ quản, tác giả, ngày đăng)", group: 0 },
        { text: "Sách giáo khoa", group: 0 },
        { text: "Trang web chính thức của trường em", group: 0 },
        { text: "Bản tin dự báo thời tiết của cơ quan khí tượng thuỷ văn", group: 0 },
        { text: "Blog cá nhân (ai cũng có thể viết)", group: 1 },
        { text: "Quảng cáo của nhà sản xuất về sản phẩm của chính họ", group: 1 },
        { text: "Trang web đã lâu không được cập nhật", group: 1 },
        { text: "Bài đăng ẩn danh trên mạng xã hội", group: 1 },
        { text: "Tin nhắn chuyển tiếp “hãy chia sẻ gấp”", group: 1 },
        { text: "Lời nhận xét cá nhân về một bộ phim", group: 1 },
      ],
      explanation: "Thẩm quyền và uy tín của tổ chức hay cá nhân cung cấp thông tin ảnh hưởng đến độ tin cậy. Blog, quảng cáo, trang lâu không cập nhật, ý kiến cá nhân, tin không rõ nguồn cần được kiểm chứng (SGK tr.12–13).",
    },
    {
      id: "luyen-tap", name: "Luyện tập SGK tr.13 ✍️", type: "vandung",
      goal: "Kể tên ứng dụng thu thập thông tin người dùng, dạng thông tin thu thập; đánh giá độ tin cậy thông tin từ các ứng dụng.",
      time: 480,
      task: "Nhóm thảo luận, gửi câu trả lời cho thầy/cô; đại diện nhóm trình bày.",
      sgkImage: "assets/sgk/luyen-tap-van-dung.jpg",
      intro: "Gửi câu trả lời cho thầy/cô rồi bấm để xem gợi ý.",
      cases: [
        { question: "1. Em hãy kể tên ba ứng dụng thu thập nhiều thông tin từ người sử dụng và trả lời: a) Tổ chức, cá nhân nào sở hữu các ứng dụng đó? b) Mỗi ứng dụng thu thập dạng thông tin nào?",
          answer: "Gợi ý: a) TikTok — công ty ByteDance; AccuWeather (dự báo thời tiết) — công ty AccuWeather (Mỹ); PUBG Mobile (trò chơi) — các công ty trò chơi Krafton (Hàn Quốc) và Tencent. b) Các ứng dụng có thể thu thập: thông tin tài khoản (tên, email, số điện thoại), video, hình ảnh người dùng đăng tải, vị trí (ứng dụng thời tiết cần vị trí để dự báo), thói quen sử dụng (xem gì, bao lâu), thông tin thiết bị. Nhiều ứng dụng dùng hệ thống AI để phân tích dữ liệu này nhằm gợi ý nội dung, quảng cáo → em cần đọc kĩ quyền ứng dụng yêu cầu và bảo vệ dữ liệu cá nhân." },
        { question: "2. Em hãy đánh giá độ tin cậy của thông tin được cung cấp từ ba ứng dụng ở Câu 1.",
          answer: "Gợi ý: TikTok — video ngắn do người dùng tự tạo, có độ tin cậy rất khác nhau, nhiều nội dung là ý kiến cá nhân hoặc chưa kiểm chứng → cần kiểm tra nguồn. AccuWeather — thông tin do tổ chức chuyên về dự báo thời tiết cung cấp, độ tin cậy khá cao nhưng dự báo vẫn có thể sai lệch → nên đối chiếu bản tin của cơ quan khí tượng. PUBG Mobile — trò chơi giải trí, nội dung là hư cấu, không dùng làm nguồn kiến thức." },
      ],
    },

    /* ===================== HĐ4: VẬN DỤNG (10 phút) ===================== */
    {
      id: "van-dung", name: "Vận dụng 🚀", type: "vandung",
      goal: "Tìm kiếm thông tin trên Internet, phân tích độ tin cậy nguồn tin; nhận diện tin đồn và tác hại.",
      time: 600,
      task: "Nhóm thảo luận (SGK tr.13), gửi câu trả lời cho thầy/cô. Các nhóm hoàn thành bài giới thiệu ở nhà và trình bày trong buổi học sau (nộp qua thư điện tử hoặc Zalo của thầy/cô).",
      sgkImage: "assets/sgk/luyen-tap-van-dung.jpg",
      intro: "Gửi câu trả lời cho thầy/cô rồi bấm để xem gợi ý.",
      cases: [
        { question: "1. Em hãy tìm kiếm trên Internet thông tin về một đội bóng, một cầu thủ hoặc một nhân vật mà em yêu thích.",
          answer: "Gợi ý các bước (giáo án): khởi động trình duyệt web (Google Chrome, Cốc Cốc…) → gõ tên đội bóng/cầu thủ/nhân vật vào ô tìm kiếm → nhấn Enter → nháy chuột vào các trang web để tìm hiểu nội dung. Chọn từ khoá phù hợp, ưu tiên trang có nguồn rõ ràng (trang chính thức, báo chí chính thống), tránh nháy vào quảng cáo, đường link lạ." },
        { question: "2. Em hãy phân tích mức độ tin cậy của nguồn tin tìm được ở Câu 1 và trình bày một bài giới thiệu về đội bóng, cầu thủ hoặc nhân vật đó.",
          answer: "Gợi ý: phân tích theo 4 cách — nguồn (trang chính thức/báo chí hay blog, diễn đàn?), ý kiến hay sự kiện, có chứng cứ không, thông tin còn mới không. Ví dụ bài giới thiệu (giáo án): Nữ hoàng Elsa là nhân vật hư cấu trong phim hoạt hình “Nữ hoàng băng giá” (2013) của hãng Walt Disney, được xây dựng dựa trên ý tưởng từ truyện cổ tích “Bà chúa Tuyết” của nhà văn Đan Mạch Hans Christian Andersen. Elsa là công chúa, rồi trở thành nữ hoàng của vương quốc hư cấu Arendelle, có em gái là Anna và có khả năng tạo ra, điều khiển băng giá." },
        { question: "3. Em hãy kể một ví dụ về tin đồn (trong cuộc sống hoặc trên mạng) và cho biết: a) Tin đồn đó xuất hiện từ sự việc nào? b) Tác hại của tin đồn đó là gì?",
          answer: "Gợi ý (giáo án): Tin đồn “Nín thở 10 giây mà không ho, không khó chịu là không mắc Covid-19”. a) Xuất hiện năm 2020 khi dịch Covid-19 bùng phát. b) Tác hại: nhiều người tin và làm theo, chủ quan không đi xét nghiệm (cách xác định nhiễm bệnh là xét nghiệm) → nguy cơ lây nhiễm trong cộng đồng." },
      ],
    },

    /* ===================== TỔNG KẾT ===================== */
    {
      id: "tong-ket", name: "Tổng kết", type: "summary",
      task: "Cả lớp nhắc lại kiến thức trọng tâm và làm thử thách cuối. Về nhà: ôn đặc điểm thông tin số, cách xác định thông tin đáng tin cậy; tìm hiểu trước Bài 3: Thực hành khai thác thông tin số.",
      content: {
        learned: [
          "Thông tin số: thông tin được mã hoá thành dãy bit để lan truyền, trao đổi trong môi trường kĩ thuật số.",
          "Thông tin số dễ nhân bản, lan truyền nhưng khó xoá bỏ hoàn toàn; truy cập từ xa được nếu người quản lí cho phép.",
          "Thông tin số đa dạng, thu thập nhanh, lưu trữ rất lớn; nhiều công cụ hỗ trợ; có bản quyền; độ tin cậy khác nhau; cần khai thác an toàn, có trách nhiệm.",
          "Thông tin đáng tin cậy giúp kết luận đúng, quyết định đúng, giải quyết được vấn đề.",
          "4 cách xác định: kiểm tra nguồn; phân biệt ý kiến với sự kiện; kiểm tra chứng cứ; đánh giá tính thời sự.",
        ],
        challenge: [
          { question: "Bạn Ngân thấy bài đăng: “Theo một người bạn của tôi, ngày mai sẽ có mưa đá rất to” (đăng 2 năm trước, không có nguồn). Bài đăng này KHÔNG đạt những tiêu chí nào?", type: "multiple-choice",
            options: ["Chỉ không đạt tiêu chí nguồn thông tin", "Không rõ nguồn, không có chứng cứ và đã lỗi thời", "Đạt mọi tiêu chí vì có ghi “theo một người bạn”", "Chỉ không đạt tiêu chí thời sự"],
            answer: 1, explanation: "Nguồn không rõ (lời kể lại), không có chứng cứ, đăng từ 2 năm trước nên đã lỗi thời → độ tin cậy rất thấp.", level: "van-dung-cao", activity: "tong-ket" },
          { question: "Vì sao trước khi đăng ảnh cá nhân lên mạng xã hội em cần suy nghĩ kĩ?", type: "multiple-choice",
            options: ["Vì ảnh sẽ bị mờ đi", "Vì mạng xã hội sẽ xoá ảnh sau 1 ngày", "Vì ảnh số dễ bị sao chép, lan truyền và khó xoá bỏ hoàn toàn", "Vì không ai xem được ảnh"],
            answer: 2, explanation: "Thông tin số dễ dàng được nhân bản, lan truyền nhưng khó bị xoá bỏ hoàn toàn.", level: "van-dung", activity: "tong-ket" },
        ],
      },
    },
  ],
};

if (typeof module !== "undefined" && module.exports) module.exports = LESSON;
if (typeof window !== "undefined") window.LESSON = LESSON;
