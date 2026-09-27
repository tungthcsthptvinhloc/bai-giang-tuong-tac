/* ============================================================================
 * BÀI 13a — HOÀN THIỆN BẢNG TÍNH QUẢN LÍ TÀI CHÍNH GIA ĐÌNH  (Tin học 9 — Kết nối tri thức)
 * Chủ đề 4 (lựa chọn a): Sử dụng bảng tính điện tử nâng cao — dự án Quản lí tài chính gia đình.
 * Bám sát SGK trang 52–54 + Kế hoạch bài dạy (2 tiết) của giáo viên.
 * Chỉ sửa file này để đổi nội dung. Engine app.js không cần sửa.
 * Theo lựa chọn của GV: KHÔNG mô phỏng bảng tính nhiều trang — dùng trắc nghiệm + ảnh SGK;
 * có "Thí nghiệm cập nhật tự động" (HTML tự viết, oninput nội tuyến) để thấy trang Tổng hợp tự đổi.
 * ==========================================================================*/

// ---- Dữ liệu Hình 13a.1 (Thu nhập, cột D) và Hình 13a.2 (Chi tiêu, cột D) ----
const THU = [["Lương tháng 8", 10000], ["Bán hàng trực tuyến", 1500], ["Người thân tặng", 500], ["Thưởng tháng 8", 3000], ["Tiết kiệm tiền đi lại", 500], ["Làm thêm tháng 8", 2000]];
const CHI = [["Tiền điện tháng 8", 800], ["Mua thuốc", 620], ["Học phí tháng 8", 2200], ["Quà tặng", 300], ["Gửi xe, xăng xe", 600], ["Tiền nước tháng 8", 120], ["Tiết kiệm tháng 8", 1000], ["Tiền ăn tháng 8", 8000]];
const f = (x) => x.toLocaleString("en-US");

// ---- Thí nghiệm cập nhật tự động: sửa số ở Thu nhập / Chi tiêu -> Tổng hợp (B14, B15, B16) và biểu đồ tự đổi ----
const CALC = "var b=this;var s=function(k){var t=0;b.querySelectorAll('input[data-k='+k+']').forEach(function(i){t+=parseFloat(i.value)||0});return t};"
  + "var T=s('t'),C=s('c'),N=T-C,f=function(x){return x.toLocaleString('en-US')};"
  + "['.tn-h7','.tn-b14'].forEach(function(q){b.querySelector(q).textContent=f(T)});['.tn-h11','.tn-b15'].forEach(function(q){b.querySelector(q).textContent=f(C)});"
  + "b.querySelector('.tn-b16').textContent=f(N);var m=Math.max(T,C,1);"
  + "b.querySelector('.tn-bt').style.height=Math.max(0,T/m*150)+'px';b.querySelector('.tn-bc').style.height=Math.max(0,C/m*150)+'px';"
  + "b.querySelector('.tn-vt').textContent=f(T);b.querySelector('.tn-vc').textContent=f(C);"
  + "b.querySelector('.tn-msg').textContent=N<0?'⚠️ Chi tiêu nhiều hơn thu nhập — cần báo động để cả nhà thực hiện tiết kiệm!':'✅ Thu nhập lớn hơn chi tiêu, gia đình còn dư '+f(N)+' nghìn đồng.';";
const RESET = "var b=this.closest('.tn-lab');b.querySelectorAll('input[data-v]').forEach(function(i){i.value=i.getAttribute('data-v')});b.oninput();";
const cell = "border:1px solid #cbd5e1;padding:3px 8px";
const inRow = (k) => ([t, v]) => `<tr><td style="${cell}">${t}</td><td style="${cell};text-align:right"><input data-k="${k}" data-v="${v}" value="${v}" type="number" min="0" step="10" style="width:96px;font:inherit;text-align:right;border:2px solid #bfdbfe;border-radius:8px;padding:2px 6px"></td></tr>`;
const card = (title, color, body) => `<div style="flex:1 1 260px;max-width:380px;background:#fff;border:3px solid ${color};border-radius:16px;padding:10px 12px">`
  + `<div style="font-weight:800;color:${color};margin-bottom:6px">📄 Trang tính ${title}</div>${body}</div>`;
const TN_LAB = `<div class="tn-lab" oninput="${CALC}" style="display:flex;flex-wrap:wrap;gap:14px;justify-content:center;align-items:flex-start;margin:6px 0">
  ${card("Thu nhập", "#1d4ed8", `<table style="border-collapse:collapse;width:100%;font-size:.95rem"><tr style="background:#dbeafe"><th style="${cell}">Nội dung</th><th style="${cell}">Số tiền (nghìn đồng)</th></tr>${THU.map(inRow("t")).join("")}
    <tr style="font-weight:800"><td style="${cell}">Tổng (ô H7)</td><td style="${cell};text-align:right;color:#dc2626" class="tn-h7">17,500</td></tr></table>`)}
  ${card("Chi tiêu", "#ea580c", `<table style="border-collapse:collapse;width:100%;font-size:.95rem"><tr style="background:#ffedd5"><th style="${cell}">Nội dung</th><th style="${cell}">Số tiền (nghìn đồng)</th></tr>${CHI.map(inRow("c")).join("")}
    <tr style="font-weight:800"><td style="${cell}">Tổng (ô H11)</td><td style="${cell};text-align:right;color:#dc2626" class="tn-h11">13,640</td></tr></table>`)}
  ${card("Tổng hợp", "#16a34a", `<div style="font-size:1.25rem;font-weight:700;margin-bottom:6px">Cân đối thu chi</div>
    <div style="display:flex;justify-content:center;align-items:flex-end;gap:36px;height:185px;border-bottom:2px solid #94a3b8;padding-top:10px">
      <div style="text-align:center"><div class="tn-vt" style="font-size:.85rem;font-weight:700">17,500</div><div class="tn-bt" style="width:54px;height:150px;background:#1e40af;transition:height .35s"></div></div>
      <div style="text-align:center"><div class="tn-vc" style="font-size:.85rem;font-weight:700">13,640</div><div class="tn-bc" style="width:54px;height:117px;background:#1e40af;transition:height .35s"></div></div></div>
    <div style="display:flex;justify-content:center;gap:36px;font-size:.9rem;margin:2px 0 8px"><span style="width:70px;text-align:center">Thu nhập</span><span style="width:70px;text-align:center">Chi tiêu</span></div>
    <table style="border-collapse:collapse;width:100%;font-size:.95rem"><tr style="background:#d1d5db"><th style="${cell}">Nội dung</th><th style="${cell}">Số tiền (nghìn đồng)</th></tr>
    <tr><td style="${cell}">Thu nhập <small style="color:#64748b">B14 ='Thu nhập'!H7</small></td><td style="${cell};text-align:right" class="tn-b14">17,500</td></tr>
    <tr><td style="${cell}">Chi tiêu <small style="color:#64748b">B15 ='Chi tiêu'!H11</small></td><td style="${cell};text-align:right" class="tn-b15">13,640</td></tr>
    <tr style="color:#dc2626;font-weight:800"><td style="${cell}">Giá trị NET <small>B16 =B14-B15</small></td><td style="${cell};text-align:right" class="tn-b16">3,860</td></tr></table>
    <div class="tn-msg" style="margin-top:8px;font-weight:700">✅ Thu nhập lớn hơn chi tiêu, gia đình còn dư 3,860 nghìn đồng.</div>
    <button type="button" onclick="${RESET}" style="margin-top:8px;font:inherit;padding:4px 12px;border-radius:10px;border:2px solid #16a34a;background:#f0fdf4;cursor:pointer">↺ Số liệu gốc (SGK)</button>`)}
</div>`;

// ---- Bảng 13a.1 (vẽ lại) ----
const td = "border:2px solid #38bdf8;padding:6px 10px";
const BANG_13A_1 = `<div style="overflow-x:auto"><table style="border-collapse:collapse;margin:0 auto;background:#fff;font-size:1.05rem">
  <tr style="background:#bae6fd"><th style="${td}">Vị trí</th><th style="${td}">Công thức</th><th style="${td}">Ý nghĩa</th></tr>
  <tr><td style="${td};text-align:center;font-weight:700">B14</td><td style="${td};font-family:Consolas,monospace;font-weight:700;white-space:nowrap">='Thu nhập'!H7</td><td style="${td}">Lấy giá trị của ô H7 trong trang tính Thu nhập đưa vào ô B14 trong trang tính Tổng hợp để tổng số tiền thu nhập trong trang tính Tổng hợp được cập nhật tự động từ trang tính Thu nhập.</td></tr>
  <tr><td style="${td};text-align:center;font-weight:700">B15</td><td style="${td};font-family:Consolas,monospace;font-weight:700;white-space:nowrap">='Chi tiêu'!H11</td><td style="${td}">Lấy giá trị của ô H11 trong trang tính Chi tiêu đưa vào ô B15 trong trang tính Tổng hợp để tổng số tiền chi tiêu trong trang tính Tổng hợp được cập nhật tự động từ trang tính Chi tiêu.</td></tr>
</table><div style="text-align:center;color:#1e40af;font-style:italic;margin-top:4px">Bảng 13a.1. Công thức lấy tổng tiền thu nhập và chi tiêu từ các trang tính tương ứng đưa vào trang tính Tổng hợp</div></div>`;
// ---- Ba thành phần của địa chỉ ô ở trang tính khác (Hình 13a.4 vẽ lại, có đáp án) ----
const BA_THANH_PHAN = `<div style="text-align:center;font-family:Consolas,'Courier New',monospace;font-size:2rem;font-weight:800;margin:6px 0">
  =<span style="background:#dbeafe;color:#1d4ed8;padding:0 8px;border-radius:10px">'Thu nhập'</span><span style="background:#fef3c7;color:#b45309;padding:0 8px;border-radius:10px">!</span><span style="background:#dcfce7;color:#15803d;padding:0 8px;border-radius:10px">H7</span></div>
<div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:center">
  <div style="border:2px solid #1d4ed8;border-radius:12px;padding:6px 14px;background:#eff6ff"><b>(1) Tên trang tính</b> — có dấu cách thì đặt trong cặp dấu nháy đơn ' '</div>
  <div style="border:2px solid #b45309;border-radius:12px;padding:6px 14px;background:#fffbeb"><b>(2) Dấu chấm than</b> — ngăn cách tên trang tính và địa chỉ ô</div>
  <div style="border:2px solid #15803d;border-radius:12px;padding:6px 14px;background:#f0fdf4"><b>(3) Địa chỉ ô</b> — ô cần lấy giá trị</div>
</div>`;

const LESSON = {
  meta: {
    subject: "Tin học", grade: "9", book: "Kết nối tri thức với cuộc sống",
    title: "Bài 13a: Hoàn thiện bảng tính quản lí tài chính gia đình", unit: "Chủ đề 4a — Sử dụng bảng tính điện tử nâng cao",
    pages: "52–54", durationMinutes: 90,
  },
  objectives: {
    knowledge: [
      "Tạo được trang tính tổng hợp thông tin thu, chi gia đình.",
      "Hoàn thiện bảng tính quản lí tài chính gia đình: tổ chức dữ liệu hợp lí, cập nhật khi dữ liệu thay đổi, trình bày trực quan (bảng – biểu đồ).",
    ],
    competencies: [
      "Tự chủ – tự học; giao tiếp – hợp tác; giải quyết vấn đề – sáng tạo (phân tích thu – chi, xử lí lỗi, hoàn thiện sản phẩm số).",
      "Năng lực số 1.3.TC2a, 1.3.TC2b: tổ chức dữ liệu thành các trang Thu nhập – Chi tiêu – Tổng hợp; cập nhật, chỉnh sửa dữ liệu và công thức khi có thay đổi.",
      "Năng lực số 5.2.TC2b, 5.3.TC2a: dùng SUM, công thức tham chiếu giữa các trang tính để so sánh thu – chi; trình bày kết quả bằng bảng và biểu đồ.",
      "Năng lực AI 9.D2.2: mô tả được một số đặc điểm cơ bản của một trải nghiệm người dùng (UX) tốt.",
    ],
    qualities: ["Chăm chỉ, trung thực (báo cáo đúng kết quả tính toán), trách nhiệm khi nhập – chỉnh sửa dữ liệu tài chính."],
  },
  coreKnowledge: [
    "Trang tính Tổng hợp lấy dữ liệu từ hai trang tính Thu nhập và Chi tiêu để cân đối thu, chi.",
    "Tham chiếu ô ở trang tính khác: ='Thu nhập'!H7 — gồm tên trang tính, dấu chấm than, địa chỉ ô.",
    "B14 ='Thu nhập'!H7, B15 ='Chi tiêu'!H11: dữ liệu được cập nhật tự động khi hai trang tính nguồn thay đổi.",
    "Giá trị NET = thu − chi (B16 =B14-B15); NET nhỏ cho thấy gia đình đang chi tiêu nhiều, cần tiết kiệm.",
    "Biểu đồ cột (Clustered Column) từ vùng A13:B15 giúp so sánh thu, chi trực quan; dữ liệu được lưu trữ, cập nhật, hiển thị trực quan giúp kiểm soát chi tiêu hiệu quả.",
  ],
  keywords: ["Trang tính Tổng hợp", "Tham chiếu trang tính", "Dấu chấm than", "Giá trị NET", "Biểu đồ cột"],
  settings: { basePoints: 100, useTimer: false, defaultTime: 60, sound: true, streakEnabled: true },

  activities: [
    /* =========================== TIẾT 1 =========================== */
    /* ===================== HĐ1: MỞ ĐẦU (10 phút) ===================== */
    {
      id: "mo-dau", name: "Mở đầu — Chi tiêu hợp lí cho một gia đình 🏠", type: "knowledge",
      goal: "Thấy tầm quan trọng của việc cân đối thu, chi; nhận ra bảng tính cần thêm thông tin tổng hợp.",
      time: 600,
      task: "Xem video thầy/cô chiếu “Bài toán chi tiêu hợp lí với một gia đình nhỏ mua chung cư trả góp”. Thảo luận cặp đôi: việc cân đối thu, chi có quan trọng không? Để kiểm soát chi tiêu hiệu quả, ta có thể làm gì?",
      sgkImage: "assets/sgk/sgk-trang52.jpg",
      content: {
        heading: "🏠 Cân đối thu, chi — kiểm soát chi tiêu gia đình",
        prompt: "Dự án sử dụng bảng tính điện tử quản lí tài chính gia đình đã hoàn thành các trang tính Thu nhập và Chi tiêu. Theo em, để cân đối thu, chi, giúp kiểm soát chi tiêu gia đình hiệu quả, bảng tính cần bổ sung thông tin gì?",
      },
      questions: [
        { question: "Việc cân đối thu, chi giúp kiểm soát chi tiêu gia đình là rất quan trọng.", type: "true-false", answer: true,
          explanation: "Cân đối thu, chi giúp gia đình không chi vượt thu, có tiền tiết kiệm và kịp thời điều chỉnh các khoản chi.", level: "nhan-biet", activity: "mo-dau" },
        { question: "Để cân đối thu, chi, kiểm soát chi tiêu gia đình hiệu quả, ta có thể làm gì? (Chọn tất cả đáp án đúng)", type: "multiple-select",
          options: ["Ghi chép đầy đủ các khoản thu, chi", "Chi tiêu theo sở thích, không cần ghi chép", "So sánh tổng thu với tổng chi để kịp thời điều chỉnh", "Chia tiền theo quy tắc, ví dụ 50-30-20"],
          answer: [0, 2, 3], explanation: "Ghi chép, tổng hợp, so sánh thu – chi và chi tiêu theo quy tắc giúp kiểm soát tài chính.", level: "thong-hieu", activity: "mo-dau" },
        { question: "Bảng tính đã có trang Thu nhập và Chi tiêu. Để cân đối thu, chi, bảng tính nên bổ sung:", type: "multiple-choice",
          options: ["Thêm một trang tính ghi lại danh sách khoản chi", "Một trang tính tổng hợp tổng thu, tổng chi, chênh lệch thu – chi và biểu đồ so sánh", "Xoá bớt các khoản chi nhỏ", "Đổi màu chữ các ô số tiền"],
          answer: 1, explanation: "Bài học hôm nay: tạo trang tính Tổng hợp để cân đối thu, chi.", level: "van-dung", activity: "mo-dau" },
      ],
    },

    /* ===================== HĐ2.1: TRANG TÍNH TỔNG HỢP (25 phút) ===================== */
    {
      id: "hd1-tong-hop", name: "Hoạt động 1: Tổng hợp dữ liệu tài chính gia đình 📊", type: "knowledge",
      goal: "Chỉ ra mối liên hệ dữ liệu giữa trang Tổng hợp với trang Thu nhập, Chi tiêu; nêu công thức ở B14, B15.",
      time: 600,
      task: "Hoạt động 1 (SGK tr.52), cặp đôi: quan sát Hình 13a.1, 13a.2 (tổng thu ở ô H7, tổng chi ở ô H11) và trang tính Tổng hợp ở Hình 13a.3. 1) Chỉ ra mối liên hệ về dữ liệu. 2) Công thức ở ô B14 và B15 là gì?",
      sgkImage: "assets/sgk/hoat-dong-1.jpg",
      content: {
        heading: "📊 Ba trang tính của bảng tính TaiChinhGiaDinh.xlsx",
        revealLabel: "🖼️ Hình 13a.1, 13a.2, 13a.3",
        blocks: [
          { kind: "image", value: "assets/sgk/hinh-13a-1.jpg", caption: "Hình 13a.1. Trang tính Thu nhập — tổng thu ở ô H7" },
          { kind: "image", value: "assets/sgk/hinh-13a-2.jpg", caption: "Hình 13a.2. Trang tính Chi tiêu — tổng chi ở ô H11" },
          { kind: "image", value: "assets/sgk/hinh-13a-3.jpg", caption: "Hình 13a.3. Trang tính Tổng hợp" },
        ],
      },
      questions: [
        { question: "Câu 1: Mối liên hệ về dữ liệu của trang tính Tổng hợp với hai trang tính Thu nhập và Chi tiêu là:", type: "multiple-choice", sgkImage: "assets/sgk/hinh-13a-3.jpg",
          options: ["Không liên quan, trang Tổng hợp nhập số liệu mới", "Trang Thu nhập lấy dữ liệu từ trang Tổng hợp", "Số tiền thu nhập (17,500) và chi tiêu (13,640) ở trang Tổng hợp được lấy từ ô H7 trang Thu nhập và ô H11 trang Chi tiêu", "Trang Tổng hợp chỉ lấy dữ liệu từ trang Chi tiêu"],
          answer: 2, explanation: "Dữ liệu trang tính Tổng hợp được lấy từ hai trang tính Thu nhập (H7 = 17,500) và Chi tiêu (H11 = 13,640).", level: "thong-hieu", activity: "hd1-tong-hop" },
        { question: "Câu 2: Công thức để tính tổng thu nhập ở ô B14 của trang Tổng hợp là:", type: "multiple-choice",
          options: ["=H7", "='Thu nhập'!H7", "='Chi tiêu'!H11", "=SUM(H2:H6)"],
          answer: 1, explanation: "B14 ='Thu nhập'!H7 — lấy giá trị ô H7 của trang tính Thu nhập. Chỉ gõ =H7 thì lấy ô H7 của chính trang Tổng hợp.", level: "van-dung", activity: "hd1-tong-hop" },
        { question: "Câu 2: Công thức để tính tổng số tiền chi tiêu ở ô B15 là:", type: "multiple-choice",
          options: ["='Chi tiêu'!H11", "='Thu nhập'!H11", "=B14-H11", "='Chi tiêu'!H7"],
          answer: 0, explanation: "B15 ='Chi tiêu'!H11 — tổng chi tiêu ở ô H11 của trang tính Chi tiêu.", level: "van-dung", activity: "hd1-tong-hop" },
      ],
    },
    {
      id: "tham-chieu", name: "Công thức tham chiếu giữa các trang tính 🔗", type: "knowledge",
      goal: "Hiểu Bảng 13a.1; biết ba thành phần của địa chỉ ô ở trang tính khác.",
      time: 420,
      task: "Đọc SGK tr.53 và Bảng 13a.1. Nhóm trả lời câu hỏi 2 (SGK tr.53): nếu công thức tham chiếu đến địa chỉ ô ở một trang tính khác thì địa chỉ ô đó gồm những thành phần gì?",
      sgkImage: "assets/sgk/bang-13a-1.jpg",
      content: {
        heading: "🔗 Lấy dữ liệu từ trang tính khác",
        prompt: "Từ hai nguồn dữ liệu trong hai trang tính Thu nhập và Chi tiêu, em có thể tổng hợp thông tin một cách trực quan để kịp thời điều chỉnh các khoản thu, chi.",
        revealLabel: "📋 Bảng 13a.1 & ba thành phần",
        blocks: [
          { kind: "html", value: BANG_13A_1 },
          { kind: "html", value: BA_THANH_PHAN },
          { kind: "text", value: "🤖 Mở rộng — hỏi AI: “Hãy giải thích cú pháp của công thức tham chiếu giữa các trang tính trong Excel.” Luôn kiểm chứng bằng cách nhập thử trên bảng tính." },
        ],
      },
      questions: [
        { question: "Câu hỏi 2 (SGK tr.53): Địa chỉ ô ở một trang tính khác gồm những thành phần nào? (Chọn tất cả đáp án đúng)", type: "multiple-select",
          options: ["Tên trang tính", "Tên tệp bảng tính", "Dấu chấm than (!)", "Địa chỉ ô"],
          answer: [0, 2, 3], explanation: "Địa chỉ ô ở trang tính khác = Tên trang tính + Dấu chấm than + Địa chỉ ô, ví dụ 'Thu nhập'!H7.", level: "nhan-biet", activity: "tham-chieu" },
        { question: "Khi sửa số tiền trong trang tính Thu nhập, ô B14 ('Thu nhập'!H7) của trang Tổng hợp sẽ:", type: "multiple-choice",
          options: ["Giữ nguyên số cũ", "Báo lỗi", "Được cập nhật tự động", "Phải gõ lại công thức"],
          answer: 2, explanation: "Công thức tham chiếu giúp tổng số tiền thu nhập trong trang Tổng hợp được cập nhật tự động từ trang Thu nhập.", level: "thong-hieu", activity: "tham-chieu" },
        { question: "Nếu xoá trang tính Thu nhập khỏi bảng tính, ô B14 (='Thu nhập'!H7) của trang Tổng hợp sẽ hiện:", type: "multiple-choice",
          options: ["17,500", "0", "Ô trống", "#REF! — lỗi tham chiếu vì trang tính được tham chiếu không còn"],
          answer: 3, explanation: "Trang tính nguồn bị xoá → công thức thành ='#REF!'!H7 và hiện lỗi #REF!. Không xoá trang tính đang được tham chiếu.", level: "van-dung-cao", activity: "tham-chieu" },
      ],
      remember: ["Tham chiếu ô ở trang tính khác: ='Thu nhập'!H7 — gồm tên trang tính, dấu chấm than, địa chỉ ô. Dữ liệu được cập nhật tự động từ trang tính nguồn."],
    },
    {
      id: "ghep-hinh-13a-4", name: "Câu hỏi 1 (SGK tr.53): Ghép thành phần công thức Hình 13a.4 🧩", type: "matching",
      goal: "Nhận biết tên trang tính, dấu chấm than, địa chỉ ô trong công thức tham chiếu.",
      time: 150,
      task: "Hình 13a.4 là công thức ='Thu nhập'!H7. Ghép mỗi vị trí (1), (2), (3) với cụm từ Địa chỉ ô, Tên trang tính, Dấu chấm than sao cho phù hợp. Làm hết rồi bấm Nộp bài.",
      sgkImage: "assets/sgk/hinh-13a-4.jpg",
      html: `<div style="text-align:center"><img src="assets/sgk/hinh-13a-4.jpg" alt="Hình 13a.4" style="max-width:360px;width:100%;border-radius:12px"></div>`,
      pairs: [
        { left: "(1) 'Thu nhập'", right: "Tên trang tính" },
        { left: "(2) !", right: "Dấu chấm than" },
        { left: "(3) H7", right: "Địa chỉ ô" },
      ],
      explanation: "(1) Tên trang tính · (2) Dấu chấm than · (3) Địa chỉ ô.",
    },
    {
      id: "gia-tri-net", name: "Giá trị NET và biểu đồ cân đối thu chi 💹", type: "knowledge",
      goal: "Hiểu Giá trị NET, ý nghĩa của biểu đồ trong trang Tổng hợp.",
      time: 300,
      task: "Đọc SGK tr.53: Giá trị NET là gì? Giá trị NET nhỏ cho biết điều gì? Vì sao nên bổ sung biểu đồ?",
      sgkImage: "assets/sgk/hinh-13a-3.jpg",
      content: {
        heading: "💹 Giá trị NET = Thu − Chi",
        revealLabel: "📖 Giá trị NET & biểu đồ (SGK tr.53)",
        blocks: [
          { kind: "list", value: [
            "Trong trang tính Tổng hợp, Giá trị NET là số tiền chênh lệch giữa thu và chi: B16 =B14-B15 = 17,500 − 13,640 = 3,860.",
            "Giá trị NET nhỏ sẽ cho thấy gia đình đang chi tiêu nhiều, cần được báo động để tất cả các thành viên thực hiện tiết kiệm.",
            "Biểu đồ hiển thị số liệu thu và chi một cách trực quan, dễ so sánh, giúp việc quản lí tài chính gia đình dễ dàng và hiệu quả.",
          ] },
          { kind: "image", value: "assets/sgk/em-can-nho.jpg", caption: "Em cần nhớ (SGK tr.53)" },
        ],
      },
      questions: [
        { question: "Giá trị NET trong trang tính Tổng hợp (Hình 13a.3) bằng bao nhiêu?", type: "multiple-choice",
          options: ["31,140", "13,640", "3,860", "17,500"],
          answer: 2, explanation: "NET = Thu nhập − Chi tiêu = 17,500 − 13,640 = 3,860 (nghìn đồng).", level: "van-dung", activity: "gia-tri-net" },
        { question: "Công thức tại ô B16 (Giá trị NET) là:", type: "multiple-choice",
          options: ["=B15-B14", "=B14-B15", "=B14+B15", "=SUM(B14:B15)"],
          answer: 1, explanation: "NET = thu − chi → =B14-B15. Viết =B15-B14 sẽ ra số âm −3,860.", level: "thong-hieu", activity: "gia-tri-net" },
        { question: "Giá trị NET nhỏ (gần 0) cho thấy điều gì?", type: "multiple-choice",
          options: ["Gia đình đang chi tiêu nhiều, cần báo động để các thành viên thực hiện tiết kiệm", "Gia đình có rất nhiều tiền tiết kiệm", "Bảng tính bị lỗi công thức", "Thu nhập tăng lên"],
          answer: 0, explanation: "SGK: Giá trị NET nhỏ cho thấy gia đình đang chi tiêu nhiều, cần được báo động để tất cả các thành viên thực hiện tiết kiệm.", level: "thong-hieu", activity: "gia-tri-net" },
      ],
      remember: ["Khi sử dụng bảng tính điện tử quản lí tài chính gia đình, dữ liệu thu, chi được lưu trữ, cập nhật và hiển thị trực quan, sinh động, dễ so sánh,… giúp các gia đình kiểm soát chi tiêu hiệu quả."],
    },
    {
      id: "thi-nghiem", name: "Thí nghiệm: Trang Tổng hợp tự cập nhật ⚡", type: "knowledge",
      goal: "Quan sát dữ liệu ở trang Tổng hợp và biểu đồ tự cập nhật khi dữ liệu thu, chi thay đổi.",
      time: 360,
      task: "Sửa số tiền ở trang Thu nhập hoặc Chi tiêu (ví dụ tăng Tiền ăn tháng 8 lên 12,000). Quan sát ô H7, H11, các ô B14, B15, Giá trị NET và biểu đồ ở trang Tổng hợp; rồi trả lời câu hỏi.",
      html: TN_LAB,
      questions: [
        { question: "Tăng Tiền ăn tháng 8 từ 8,000 lên 12,000 (các số khác giữ nguyên). Giá trị NET mới là:", type: "multiple-choice",
          options: ["3,860", "−140", "7,860", "17,640"],
          answer: 1, explanation: "Chi tiêu = 13,640 + 4,000 = 17,640 → NET = 17,500 − 17,640 = −140: chi nhiều hơn thu, cần báo động tiết kiệm.", level: "van-dung", activity: "thi-nghiem" },
        { question: "Khi sửa số liệu ở trang Chi tiêu, em có phải sửa lại công thức ở ô B15 của trang Tổng hợp không?", type: "multiple-choice",
          options: ["Có, phải gõ lại số mới", "Có, phải đổi thành ='Chi tiêu'!H12", "Không, B15 tự cập nhật vì lấy giá trị từ ô H11 của trang Chi tiêu", "Không, vì B15 không liên quan đến trang Chi tiêu"],
          answer: 2, explanation: "Công thức tham chiếu ='Chi tiêu'!H11 tự lấy giá trị mới nhất của ô H11.", level: "thong-hieu", activity: "thi-nghiem" },
        { question: "Trên biểu đồ, cột Chi tiêu cao hơn cột Thu nhập cho biết:", type: "multiple-choice",
          options: ["Gia đình đang tiết kiệm tốt", "Giá trị NET âm — chi tiêu vượt thu nhập", "Biểu đồ vẽ sai", "Thu nhập tăng"],
          answer: 1, explanation: "Biểu đồ giúp so sánh trực quan: chi > thu → NET âm → cần điều chỉnh chi tiêu.", level: "van-dung", activity: "thi-nghiem" },
      ],
    },
    {
      id: "san-loi", name: "Trò chơi: Thám tử săn lỗi công thức 🔍", type: "giftbox", boxIcon: "🔍",
      goal: "Phát hiện và sửa các lỗi thường gặp khi tham chiếu giữa các trang tính, tính tổng và Giá trị NET.",
      time: 360,
      task: "Mỗi hộp chứa một công thức có lỗi. Chọn hộp, tìm ra lỗi sai. Tìm đúng thì mở hộp!",
      intro: "6 hộp bí ẩn — mỗi hộp một công thức lỗi. Thám tử nào tinh mắt nhất? 🔍",
      prizes: ["🕵️ Thám tử tài ba", "⭐ Ngôi sao tinh mắt", "👏 Một tràng pháo tay", "🏅 Huy hiệu “Không bỏ sót lỗi”", "🌟 Lời khen trước lớp", "🎁 Quà bí mật từ thầy/cô"],
      questions: [
        { question: "Hộp 1 — ô B14 nhập: =Thu nhập!H7. Lỗi ở đâu?", type: "multiple-choice",
          options: ["Sai địa chỉ ô", "Thiếu dấu chấm than", "Tên trang tính có dấu cách nhưng thiếu cặp dấu nháy đơn: ='Thu nhập'!H7", "Không có lỗi"],
          answer: 2, explanation: "Tên trang tính có dấu cách (Thu nhập) phải đặt trong cặp dấu nháy đơn: ='Thu nhập'!H7.", level: "thong-hieu", activity: "san-loi" },
        { question: "Hộp 2 — ô B14 nhập: ='Thu nhập'H7. Lỗi ở đâu?", type: "multiple-choice",
          options: ["Thiếu dấu chấm than giữa tên trang tính và địa chỉ ô", "Thừa dấu nháy đơn", "Sai tên trang tính", "Phải dùng hàm SUM"],
          answer: 0, explanation: "Đúng là ='Thu nhập'!H7 — dấu ! ngăn cách tên trang tính và địa chỉ ô.", level: "thong-hieu", activity: "san-loi" },
        { question: "Hộp 3 — ô B14 nhập: ='Thu nhập'!H11 và hiện 0. Lỗi ở đâu?", type: "multiple-choice",
          options: ["Thiếu dấu nháy đơn", "Sai địa chỉ ô: tổng thu nhập nằm ở ô H7 của trang Thu nhập", "Sai tên trang tính", "Trang Thu nhập bị xoá"],
          answer: 1, explanation: "Ô H11 của trang Thu nhập trống nên B14 = 0. Tổng thu ở H7 (còn H11 là tổng chi của trang Chi tiêu).", level: "van-dung", activity: "san-loi" },
        { question: "Hộp 4 — ô B15 nhập: ='Chi tieu'!H11. Lỗi ở đâu?", type: "multiple-choice",
          options: ["Thiếu dấu chấm than", "Sai địa chỉ ô", "Không có lỗi", "Tên trang tính viết không đúng (trang tên là Chi tiêu, có dấu)"],
          answer: 3, explanation: "Tên trang tính trong công thức phải viết đúng như tên trên thanh trang tính: 'Chi tiêu'.", level: "thong-hieu", activity: "san-loi" },
        { question: "Hộp 5 — ô B16 nhập: =B15-B14 và hiện −3,860. Lỗi ở đâu?", type: "multiple-choice",
          options: ["Đảo thứ tự: Giá trị NET = thu − chi, phải là =B14-B15", "Phải dùng =SUM(B14:B15)", "Thiếu tên trang tính", "Không có lỗi"],
          answer: 0, explanation: "NET = Thu nhập − Chi tiêu = B14 − B15 = 3,860.", level: "van-dung", activity: "san-loi" },
        { question: "Hộp 6 — ô H7 của trang Thu nhập nhập: =SUM(H2:H7). Lỗi ở đâu?", type: "multiple-choice",
          options: ["Thiếu dấu $", "Phải dùng hàm COUNTIF", "Vùng cộng chứa chính ô H7 (tham chiếu vòng); đúng là =SUM(H2:H6)", "Không có lỗi"],
          answer: 2, explanation: "Công thức ở H7 không được cộng cả ô H7 — Excel cảnh báo tham chiếu vòng. SGK: =SUM(H2:H6).", level: "van-dung-cao", activity: "san-loi" },
      ],
    },

    /* =========================== TIẾT 2 =========================== */
    /* ===================== HĐ2.2: THỰC HÀNH ===================== */
    {
      id: "thuc-hanh-a", name: "Thực hành a) Tính tổng số tiền trang Thu nhập và Chi tiêu ➕", type: "knowledge",
      goal: "Tính đúng tổng thu nhập (H7) và tổng chi tiêu (H11).",
      time: 480,
      task: "Nhiệm vụ (SGK tr.53): mở TaiChinhGiaDinh.xlsx. Trang Thu nhập: tại H7 nhập =SUM(H2:H6). Trang Chi tiêu: tại H11 nhập =SUM(H2:H10). Lưu tệp. Trả lời câu hỏi trên app.",
      sgkImage: "assets/sgk/hinh-13a-1.jpg",
      content: {
        heading: "➕ Tổng thu nhập và tổng chi tiêu",
        revealLabel: "🖼️ Hình 13a.1 & 13a.2",
        blocks: [
          { kind: "image", value: "assets/sgk/hinh-13a-1.jpg", caption: "Hình 13a.1. Trang tính Thu nhập — H7 =SUM(H2:H6)" },
          { kind: "image", value: "assets/sgk/hinh-13a-2.jpg", caption: "Hình 13a.2. Trang tính Chi tiêu — H11 =SUM(H2:H10)" },
        ],
      },
      questions: [
        { question: "Tại ô H7 của trang Thu nhập, công thức tính tổng số tiền thu nhập là:", type: "multiple-choice", sgkImage: "assets/sgk/hinh-13a-1.jpg",
          options: ["=SUM(H2:H6)", "=SUM(D3:D8)+H7", "=SUM(G2:G6)", "=COUNTIF(H2:H6)"],
          answer: 0, explanation: "H7 =SUM(H2:H6) = 10,000 + 3,000 + 3,500 + 500 + 500 = 17,500.", level: "nhan-biet", activity: "thuc-hanh-a" },
        { question: "Tại ô H11 của trang Chi tiêu, công thức tính tổng số tiền đã chi tiêu là:", type: "multiple-choice", sgkImage: "assets/sgk/hinh-13a-2.jpg",
          options: ["=SUM(G2:G10)", "=SUM(H2:H11)", "=SUM(H2:H10)", "=H2+H10"],
          answer: 2, explanation: "H11 =SUM(H2:H10) = 13,640 (9 khoản chi ở hàng 2 đến 10).", level: "nhan-biet", activity: "thuc-hanh-a" },
        { question: "Ô G7 của trang Thu nhập hiện 6. Con số này cho biết gì?", type: "multiple-choice",
          options: ["Tổng thu nhập là 6 triệu", "Có 6 khoản mục thu", "Tổng số lần thu trong tháng là 6", "Tháng 6"],
          answer: 2, explanation: "Cột G là Số lần thu (COUNTIF, Bài 10a); tổng G2:G6 = 6 lần thu — khớp 6 hàng dữ liệu ở A3:D8.", level: "thong-hieu", activity: "thuc-hanh-a" },
      ],
    },
    {
      id: "thuc-hanh-b", name: "Thực hành b) Tạo trang tính Tổng hợp 📑", type: "knowledge",
      goal: "Tạo trang tính Tổng hợp với bảng dữ liệu A13:B16 và công thức tham chiếu.",
      time: 600,
      task: "Tạo trang tính mới tên Tổng hợp; tại A1 nhập tiêu đề Cân đối thu chi; tạo bảng dữ liệu trong vùng A13:B16 (B14, B15 theo Bảng 13a.1; B16 =B14-B15). Lưu tệp. Trả lời câu hỏi trên app.",
      sgkImage: "assets/sgk/hinh-13a-3.jpg",
      questions: [
        { question: "Ô A1 của trang tính Tổng hợp được nhập tiêu đề là:", type: "multiple-choice",
          options: ["Tổng hợp", "Thu nhập", "Giá trị NET", "Cân đối thu chi"],
          answer: 3, explanation: "Tại ô A1, nhập tiêu đề bảng tính là Cân đối thu chi (tên trang tính là Tổng hợp).", level: "nhan-biet", activity: "thuc-hanh-b" },
        { question: "Sắp xếp đúng nội dung các ô trong bảng A13:B16:", type: "multiple-choice",
          options: ["A13 Nội dung, B13 Số tiền (nghìn đồng); A14 Thu nhập; A15 Chi tiêu; A16 Giá trị NET", "A13 Thu nhập; A14 Chi tiêu; A15 Giá trị NET; A16 Nội dung", "A13 Giá trị NET; A14 Thu nhập; A15 Chi tiêu; A16 Tổng", "A13 Chi tiêu; A14 Thu nhập; A15 Nội dung; A16 Giá trị NET"],
          answer: 0, explanation: "Hàng 13 là tiêu đề (Nội dung, Số tiền); hàng 14 Thu nhập, 15 Chi tiêu, 16 Giá trị NET (Hình 13a.3).", level: "thong-hieu", activity: "thuc-hanh-b" },
        { question: "Vì sao ở B14 nên dùng ='Thu nhập'!H7 mà KHÔNG gõ trực tiếp số 17500?", type: "multiple-choice",
          options: ["Vì gõ số nhanh hơn", "Vì công thức tham chiếu tự cập nhật khi dữ liệu thu nhập thay đổi; gõ số thì phải sửa tay mỗi lần", "Vì Excel không cho gõ số vào B14", "Vì 17500 là số sai"],
          answer: 1, explanation: "Tham chiếu giữa các trang tính giúp trang Tổng hợp luôn chính xác khi dữ liệu nguồn thay đổi.", level: "van-dung", activity: "thuc-hanh-b" },
      ],
    },
    {
      id: "bieu-do", name: "Thực hành b) Tạo biểu đồ cột Thu nhập – Chi tiêu 📶", type: "knowledge",
      goal: "Biết chọn vùng dữ liệu, dạng biểu đồ và vị trí đặt biểu đồ trong trang Tổng hợp.",
      time: 420,
      task: "Quan sát Hình 13a.5: chọn vùng A13:B15, dải lệnh Insert → nhóm Charts → Clustered Column; đặt biểu đồ vào vùng A2:B12, chỉnh sửa như Hình 13a.3. Thực hiện trên Excel rồi trả lời câu hỏi.",
      sgkImage: "assets/sgk/hinh-13a-5.jpg",
      content: {
        heading: "📶 Biểu đồ cột Cân đối thu chi",
        revealLabel: "🖼️ Hình 13a.5",
        blocks: [
          { kind: "image", value: "assets/sgk/hinh-13a-5.jpg", caption: "Hình 13a.5. Thao tác chèn biểu đồ tổng số tiền thu nhập và chi tiêu vào trang tính Tổng hợp" },
        ],
      },
      questions: [
        { question: "Vùng dữ liệu chọn để tạo biểu đồ là:", type: "multiple-choice",
          options: ["A13:B16", "A2:B12", "A13:B15", "B14:B16"],
          answer: 2, explanation: "Chọn A13:B15 (tiêu đề, Thu nhập, Chi tiêu). Không chọn hàng 16 vì biểu đồ chỉ so sánh thu và chi.", level: "nhan-biet", activity: "bieu-do" },
        { question: "Dạng biểu đồ được chọn trong nhóm lệnh Charts của dải lệnh Insert là:", type: "multiple-choice",
          options: ["Pie (biểu đồ tròn)", "Clustered Column (cột nhóm)", "Line (đường)", "3-D Bar"],
          answer: 1, explanation: "SGK chọn Clustered Column (2-D Column) để so sánh hai giá trị thu và chi.", level: "nhan-biet", activity: "bieu-do" },
        { question: "Biểu đồ được đặt vào vị trí nào của trang Tổng hợp?", type: "multiple-choice",
          options: ["A13:B16", "D1:H10", "A1", "A2:B12"],
          answer: 3, explanation: "Đặt biểu đồ vào vùng A2:B12 — phía trên bảng dữ liệu (Hình 13a.3).", level: "thong-hieu", activity: "bieu-do" },
      ],
    },
    {
      id: "cac-buoc-bieu-do", name: "Sắp xếp các bước tạo biểu đồ 🔢", type: "ordering",
      goal: "Nắm quy trình tạo biểu đồ cột trong trang Tổng hợp.",
      time: 150,
      task: "Sắp xếp các bước tạo biểu đồ cột hiển thị trực quan giá trị thu và chi (SGK tr.54) rồi bấm Nộp bài.",
      sgkImage: "assets/sgk/sgk-trang54.jpg",
      steps: [
        "Chọn vùng dữ liệu tạo biểu đồ A13:B15",
        "Trong dải lệnh Insert, chọn nhóm lệnh Charts",
        "Chọn dạng biểu đồ Clustered Column",
        "Đặt biểu đồ vào vị trí A2:B12",
        "Chỉnh sửa thông tin hiển thị trên biểu đồ như Hình 13a.3",
        "Lưu tệp",
      ],
      explanation: "Chọn vùng A13:B15 → Insert → Charts → Clustered Column → đặt vào A2:B12 → chỉnh sửa → lưu tệp.",
    },

    /* ===================== HĐ3: LUYỆN TẬP (10 phút) ===================== */
    {
      id: "luyen-tap", name: "Luyện tập — Trò chơi “Chăm sóc cây xanh” 🌳", type: "penguin",
      pet: "🌱", homeIcon: "🌳", enemy: "🐛", saveWord: "cây non lớn thành cây xanh",
      winText: "Cả vườn cây đã xanh tốt — các đội ôn tập thật xuất sắc!",
      goal: "Củng cố các công cụ, hàm đã học trong dự án quản lí tài chính gia đình.",
      time: 600,
      task: "Lớp chia 4 đội, giơ cờ giấy giành quyền trả lời (mỗi câu không quá 2 đội trả lời). Đội trả lời đúng được tăng thêm cây xanh. Hết câu hỏi, đội nhiều cây nhất thắng!",
      intro: "Mỗi câu đúng: một cây non 🌱 lớn thành cây xanh 🌳. Sai thì sâu 🐛 bò tới!",
      questions: [
        { question: "Câu 1. Để hạn chế loại dữ liệu hoặc giá trị của dữ liệu khi nhập vào ô tính, em sử dụng công cụ xác thực dữ liệu nào sau đây?", type: "multiple-choice",
          options: ["Data > Advanced", "Data > Data Validation", "Data > Validation", "Data > Flash Fill"],
          answer: 1, explanation: "Công cụ xác thực dữ liệu: Data > Data Validation (Bài 9a).", level: "nhan-biet", activity: "luyen-tap" },
        { question: "Câu 2. Nếu muốn đếm số lượng ô trong phạm vi A1:A10 có giá trị lớn hơn 50, em sẽ sử dụng cú pháp nào?", type: "multiple-choice",
          options: ["COUNTIF(A1:A10, \">50\")", "COUNTIF(A1:A10, \"<50\")", "COUNTIF(A1:A10, \"=50\")", "COUNTIF(A1:A10, \">=50\")"],
          answer: 0, explanation: "“Lớn hơn 50” là \">50\".", level: "thong-hieu", activity: "luyen-tap" },
        { question: "Câu 3. Hàm COUNTIF được sử dụng để làm gì?", type: "multiple-choice",
          options: ["Tính tổng các giá trị trong một dãy số", "Đếm tổng số dòng trong một phạm vi", "Đếm số lượng các ô thoả mãn một điều kiện cụ thể", "Hiển thị số trung bình của một dãy số"],
          answer: 2, explanation: "COUNTIF đếm số ô thoả mãn một điều kiện (Bài 10a).", level: "nhan-biet", activity: "luyen-tap" },
        { question: "Câu 4. Nếu tính tổng các ô trong phạm vi B1:B10 thoả mãn điều kiện “bắt đầu bằng A”, em sẽ sử dụng cú pháp nào?", type: "multiple-choice",
          options: ["=SUMIF(B1:B10, \"*A\")", "=SUMIF(B1:B10, \"*A*\")", "=SUMIF(B1:B10, \"=A\")", "=SUMIF(B1:B10, \"A*\")"],
          answer: 3, explanation: "Kí tự đại diện * thay cho dãy kí tự bất kì: \"A*\" là bắt đầu bằng A.", level: "van-dung", activity: "luyen-tap" },
        { question: "Câu 5. Trong hàm SUMIF, tham số range đại diện cho điều gì?", type: "multiple-choice",
          options: ["Phạm vi dữ liệu cần tính tổng", "Điều kiện cần kiểm tra", "Kết quả tổng cộng", "Dãy số cần sắp xếp"],
          answer: 0, explanation: "range là phạm vi dữ liệu mà hàm SUMIF xét; khi không có sum_range, các ô thoả mãn điều kiện trong range được cộng lại.", level: "thong-hieu", activity: "luyen-tap" },
        { question: "Câu 6. Trong hàm IF, nếu em muốn kiểm tra điều kiện “A không bằng B”, em sẽ sử dụng dấu gì?", type: "multiple-choice",
          options: ["=", "<>", "<", ">"],
          answer: 1, explanation: "<> là “khác” (không bằng), ví dụ =IF(A1<>B1,\"Khác\",\"Bằng\").", level: "thong-hieu", activity: "luyen-tap" },
        { question: "Câu 7. Hàm IF không thể sử dụng với kiểu dữ liệu nào sau đây?", type: "multiple-choice",
          options: ["Số", "Văn bản", "Ngày tháng", "Hình ảnh"],
          answer: 3, explanation: "Hàm IF so sánh, trả về dữ liệu số, văn bản, ngày tháng; không xử lí hình ảnh.", level: "thong-hieu", activity: "luyen-tap" },
      ],
    },

    /* ===================== HĐ4: VẬN DỤNG (10 phút) ===================== */
    {
      id: "van-dung", name: "Vận dụng: Bổ sung dữ liệu, cập nhật trang Tổng hợp 🔄", type: "knowledge",
      goal: "Chỉnh sửa trang Thu nhập, Chi tiêu khi bổ sung dữ liệu; cập nhật chính xác trang Tổng hợp.",
      time: 480,
      task: "Cặp đôi (SGK tr.54): bổ sung một số dòng dữ liệu thu, chi vào cả hai trang tính Thu nhập và Chi tiêu, sửa lại các công thức cho đúng với vùng dữ liệu mới; quan sát dữ liệu được cập nhật tự động vào trang Tổng hợp.",
      sgkImage: "assets/sgk/luyen-tap.jpg",
      content: {
        heading: "🔄 Ví dụ bổ sung dữ liệu",
        prompt: "Thu nhập thêm 2 dòng (hàng 9, 10): Thưởng — Thưởng dự án 1,000; Làm thêm — Dạy kèm 800. Chi tiêu thêm 3 dòng (hàng 11, 12, 13): Sức khoẻ — Khám răng 300; Giải trí — Xem phim 150; Di chuyển — Sửa xe đạp 80.",
      },
      questions: [
        { question: "Trang Thu nhập thêm 2 dòng dữ liệu ở hàng 9, 10. Công thức SUMIF ở H2:H6 (Bài 11a) cần sửa thế nào?", type: "multiple-choice", sgkImage: "assets/sgk/hinh-13a-1.jpg",
          options: ["Không cần sửa", "Chỉ sửa ô H7", "Sửa cả range và sum_range đến hàng 10: =SUMIF($B$3:$B$10,F2,$D$3:$D$10)", "Xoá cột H và nhập lại số"],
          answer: 2, explanation: "Vùng dữ liệu mới đến hàng 10 → sửa $B$3:$B$8, $D$3:$D$8 thành $B$3:$B$10, $D$3:$D$10 rồi sao chép xuống H6. H7 =SUM(H2:H6) giữ nguyên.", level: "van-dung", activity: "van-dung" },
        { question: "Sau khi bổ sung dữ liệu và sửa công thức, ô B14 (Thu nhập) ở trang Tổng hợp hiện:", type: "multiple-choice",
          options: ["17,500", "19,300", "18,500", "1,800"],
          answer: 1, explanation: "17,500 + 1,000 + 800 = 19,300 — B14 ='Thu nhập'!H7 tự cập nhật, không cần sửa.", level: "van-dung", activity: "van-dung" },
        { question: "Chi tiêu thêm 300 + 150 + 80 = 530. Giá trị NET mới ở ô B16 là:", type: "multiple-choice",
          options: ["3,860", "4,330", "5,130", "3,330"],
          answer: 2, explanation: "Thu 19,300 − Chi (13,640 + 530 = 14,170) = 5,130 (nghìn đồng).", level: "van-dung-cao", activity: "van-dung" },
        { question: "Khi bổ sung dữ liệu, các công thức ở trang Tổng hợp (B14, B15, B16):", type: "multiple-choice",
          options: ["Phải gõ lại toàn bộ", "Chỉ B16 phải sửa", "Không cần sửa — tự cập nhật từ H7, H11 của hai trang nguồn", "Phải đổi sang địa chỉ tuyệt đối"],
          answer: 2, explanation: "Chỉ cần sửa công thức ở hai trang nguồn cho đúng vùng dữ liệu mới; trang Tổng hợp tự cập nhật.", level: "thong-hieu", activity: "van-dung" },
      ],
    },
    {
      id: "van-dung-nha", name: "Vận dụng — Đánh giá tình hình tài chính gia đình 📝", type: "vandung",
      goal: "Từ Giá trị NET, đánh giá tình hình tài chính và đề xuất điều chỉnh chi tiêu.",
      time: 240,
      task: "Nhóm thảo luận, gửi câu trả lời cho thầy/cô. Hoàn thiện tệp TaiChinhGiaDinh.xlsx (3 trang Thu nhập – Chi tiêu – Tổng hợp) và báo cáo ở tiết sau.",
      intro: "Gửi câu trả lời cho thầy/cô rồi bấm để xem hướng chốt.",
      cases: [
        { question: "Từ Giá trị NET trên trang tính Tổng hợp, em hãy đánh giá tình hình tài chính hiện tại của gia đình và đề xuất những điều chỉnh chi tiêu sao cho phù hợp.",
          answer: "Ví dụ: NET = 3,860 > 0 → thu lớn hơn chi, gia đình có dư. Tuy nhiên chi cho Nhu cầu thiết yếu rất cao (Ăn 8,000; Bài 12a: 90.5%), tiết kiệm mới 1,000 (7.3%). Đề xuất: giảm hợp lí tiền ăn, điện nước; chuyển một phần NET vào tiết kiệm; theo dõi trang Tổng hợp hằng tháng, khi NET nhỏ thì báo động cả nhà tiết kiệm." },
      ],
    },

    /* ===================== TỔNG KẾT ===================== */
    {
      id: "tong-ket", name: "Tổng kết", type: "summary",
      task: "Cả lớp nhắc lại kiến thức trọng tâm và làm thử thách cuối. Dặn dò: hoàn thiện bảng tính quản lí tài chính gia đình, nộp sản phẩm cho thầy/cô.",
      content: {
        learned: [
          "Trang tính Tổng hợp lấy dữ liệu từ trang Thu nhập, Chi tiêu để cân đối thu, chi.",
          "Tham chiếu ô ở trang tính khác: tên trang tính + dấu chấm than + địa chỉ ô: ='Thu nhập'!H7.",
          "Giá trị NET = thu − chi (=B14-B15); NET nhỏ → cần tiết kiệm.",
          "Biểu đồ cột từ vùng A13:B15 giúp so sánh thu, chi trực quan.",
          "Dữ liệu nguồn thay đổi → trang Tổng hợp tự cập nhật.",
        ],
        challenge: [
          { question: "Trang tính tên Kinh phí có tổng thu ở ô C20. Công thức lấy giá trị này sang trang khác là:", type: "multiple-choice",
            options: ["=Kinh phí!C20", "='Kinh phí'!C20", "='Kinh phí'C20", "=C20!'Kinh phí'"],
            answer: 1, explanation: "Tên trang tính có dấu cách đặt trong dấu nháy đơn, tiếp theo là dấu ! và địa chỉ ô.", level: "van-dung", activity: "tong-ket" },
          { question: "Tổng thu 20,000; tổng chi 21,500. Giá trị NET và nhận xét đúng là:", type: "multiple-choice",
            options: ["1,500 — gia đình dư tiền", "41,500 — chi tiêu hợp lí", "−1,500 — chi vượt thu, cần điều chỉnh chi tiêu", "0 — cân bằng"],
            answer: 2, explanation: "NET = 20,000 − 21,500 = −1,500 < 0: chi nhiều hơn thu, cả nhà cần tiết kiệm.", level: "van-dung-cao", activity: "tong-ket" },
        ],
      },
    },
  ],
};

if (typeof module !== "undefined" && module.exports) module.exports = LESSON;
if (typeof window !== "undefined") window.LESSON = LESSON;
