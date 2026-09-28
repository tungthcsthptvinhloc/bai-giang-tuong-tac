/* ============================================================================
 * BÀI 3 — THỰC HÀNH: KHAI THÁC THÔNG TIN SỐ  (Tin học 8 — Kết nối tri thức với cuộc sống)
 * Chủ đề 2: Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin.
 * Bám sát SGK trang 14–17 + Kế hoạch bài dạy (2 tiết) của giáo viên.
 * Chỉ sửa file này để đổi nội dung. Engine app.js không cần sửa.
 * Thực hành tìm kiếm (trình duyệt) và làm bài trình chiếu (PowerPoint) trên MÁY THẬT — app không mô phỏng phần mềm.
 * Kết quả tìm kiếm giả định trong trò chơi đánh giá không ghi địa chỉ web (chỉ các địa chỉ có trong SGK).
 * ==========================================================================*/

// ---- Hội thoại Mở đầu (SGK tr.14) ----
const NV = { Minh: ["#15803d", "🧑"], Khoa: ["#0369a1", "👦"], An: ["#db2777", "👧"] };
const LOI = [
  ["Minh", "Khi bật đèn để căn phòng tràn ngập ánh sáng, khi lái một chiếc ô tô, hay chỉ đơn giản là nấu cơm, mọi người đều đang sử dụng năng lượng."],
  ["Khoa", "Hầu hết năng lượng đến từ nhiên liệu hoá thạch như xăng và than."],
  ["An", "Trái Đất mất hàng triệu năm để tạo ra nhiên liệu hoá thạch. Các bạn có tưởng tượng được, một ngày nào đó, chúng sẽ cạn kiệt và biến mất không. Chúng ta có thể làm gì để tránh thảm hoạ đó?"],
  ["Minh", "Khám phá các nguồn năng lượng khác để thay thế. Đó là những nguồn năng lượng dường như không bao giờ cạn kiệt như nắng, gió, nước và thậm chí là rác thải."],
  ["Khoa", "Điện gió, điện mặt trời và cả thuỷ điện nữa đều có những nhược điểm. Chúng ta cần tìm hiểu thông tin đầy đủ hơn."],
];
const KICH_HTML = `<div style="display:flex;flex-direction:column;gap:10px;max-width:820px;margin:0 auto">${LOI.map(([ai, t], i) => {
  const [c, ic] = NV[ai], phai = i % 2 === 1;
  return `<div style="display:flex;gap:10px;align-items:flex-start;${phai ? "flex-direction:row-reverse" : ""}">
    <div style="flex:0 0 auto;text-align:center;font-weight:800;color:${c}"><div style="font-size:2rem">${ic}</div>${ai}</div>
    <div style="background:#fff;border:3px solid ${c};border-radius:18px;padding:10px 14px;font-size:1.1rem;max-width:80%;text-align:left">${t}</div></div>`; }).join("")}
  <div style="margin-top:6px;padding:10px 14px;border-radius:14px;background:#fefce8;border:3px dashed #ca8a04;font-weight:700;font-size:1.1rem;text-align:center">🎯 Em hãy tạo một bài trình chiếu với chủ đề <span style="color:#db2777">Năng lượng tái tạo</span> để giải quyết những băn khoăn của các bạn. Em có thể khai thác thông tin số để có thêm thông tin cho bài trình chiếu.</div></div>`;

// ---- Bảng 3.1 (SGK tr.15) ----
const BANG_3_1 = [
  ["1", "Khái niệm chung về các nguồn năng lượng", "https://hvacr.vn/diendan/", "Cộng đồng Cơ Điện Lạnh Việt Nam", "2008"],
  ["2", "Năng lượng tái tạo sẽ thống trị công suất điện toàn thế giới", "https://www.evn.com.vn/", "Tập đoàn Điện lực Việt Nam", "2022"],
  ["3", "Quy hoạch điện VIII: Ưu tiên phát triển năng lượng tái tạo", "http://www.erea.gov.vn/vi-VN", "Bộ Công Thương", "2021"],
];
const td = "border:2px solid #22c55e;padding:6px 10px";
const BANG_3_1_HTML = `<div style="overflow-x:auto"><table style="border-collapse:collapse;margin:0 auto;background:#fff;font-size:1.02rem;text-align:left">
  <caption style="font-weight:800;margin-bottom:6px">Bảng 3.1. Kết quả tìm kiếm</caption>
  <tr style="background:#dcfce7">${["STT", "Nội dung", "Địa chỉ trang web", "Nguồn gốc", "Thời gian"].map((h) => `<th style="${td}">${h}</th>`).join("")}</tr>
  ${BANG_3_1.map((r) => `<tr>${r.map((c, i) => `<td style="${td}${i === 2 ? ";font-family:Consolas,monospace;font-size:.92rem" : ""}">${c}</td>`).join("")}</tr>`).join("")}</table></div>`;

// ---- Hình 3.1: kết quả tìm kiếm ở trang …gov.vn (SGK tr.16) ----
const HINH_3_1_HTML = `<div style="max-width:760px;margin:10px auto;background:#fff;border:2px solid #22c55e;border-radius:10px;padding:10px 16px;text-align:left;font-family:Arial,sans-serif">
  <div style="color:#202124;font-size:.92rem">https://moit.gov.vn › phat-trien-ben-vung › quy-hoach-... ▾</div>
  <div style="color:#1a0dab;font-size:1.25rem;margin:2px 0">Quy hoạch điện VIII: Ưu tiên phát triển năng lượng tái tạo</div>
  <div style="color:#4d5156;font-size:.95rem">9 thg 3, 2021 — Quy hoạch điện VIII khuyến khích <b>phát triển</b> mạnh mẽ <b>năng lượng tái tạo</b> (ngoài thuỷ điện), từ khoảng 13% năm 2020 lên tới gần 30% năm 2030 và ...</div></div>
  <div style="text-align:center;font-style:italic;color:#475569">Hình 3.1. Trang web có địa chỉ …gov.vn là trang thông tin của cơ quan chính phủ</div>`;

// ---- Hình 3.3: Quy hoạch cơ cấu nguồn điện (SGK tr.16) — biểu đồ cột đôi ----
const CO_CAU = [["Nhiệt điện than", 28, 18], ["Nhiệt điện khí", 19, 24], ["Thuỷ điện", 18, 9], ["Điện gió", 14, 22], ["Điện mặt trời", 13, 20],
  ["Điện sinh khối và năng lượng tái tạo khác", 2, 2], ["Thuỷ điện tích năng", 1, 3], ["Nhập khẩu điện", 5, 2]];
const CO_CAU_HTML = `<div style="max-width:880px;margin:0 auto;background:#fff;border:3px solid #22c55e;border-radius:16px;padding:12px 16px;text-align:left">
  <div style="text-align:center;font-weight:900;color:#15803d;font-size:1.3rem;margin-bottom:6px">QUY HOẠCH CƠ CẤU NGUỒN ĐIỆN</div>
  <div style="display:flex;gap:16px;justify-content:center;margin-bottom:8px;font-weight:700"><span><i style="display:inline-block;width:18px;height:12px;background:#60a5fa;border-radius:3px"></i> Năm 2030</span><span><i style="display:inline-block;width:18px;height:12px;background:#f59e0b;border-radius:3px"></i> Năm 2045</span></div>
  ${CO_CAU.map(([t, a, b]) => `<div style="display:flex;align-items:center;gap:8px;margin:5px 0">
    <div style="flex:0 0 38%;font-weight:600">${t}</div>
    <div style="flex:1;display:flex;flex-direction:column;gap:2px">
      <div style="display:flex;align-items:center;gap:6px"><div style="height:13px;width:${a * 3}%;background:#60a5fa;border-radius:3px"></div><b style="font-size:.9rem">${a}%</b></div>
      <div style="display:flex;align-items:center;gap:6px"><div style="height:13px;width:${b * 3}%;background:#f59e0b;border-radius:3px"></div><b style="font-size:.9rem">${b}%</b></div></div></div>`).join("")}
  <div style="text-align:center;font-style:italic;color:#475569;margin-top:6px">Theo Hình 3.3 — Trang nội dung (SGK tr.16)</div></div>`;

const LESSON = {
  meta: {
    subject: "Tin học", grade: "8", book: "Kết nối tri thức với cuộc sống",
    title: "Bài 3: Thực hành: Khai thác thông tin số", unit: "Chủ đề 2 — Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin",
    pages: "14–17", durationMinutes: 90,
  },
  objectives: {
    knowledge: [
      "Sử dụng được công cụ tìm kiếm, xử lí và trao đổi thông tin trong môi trường số. Nêu được ví dụ minh hoạ.",
      "Chủ động tìm kiếm được thông tin để thực hiện nhiệm vụ cụ thể.",
      "Đánh giá được lợi ích của thông tin tìm được trong giải quyết vấn đề, nêu được ví dụ minh hoạ.",
    ],
    competencies: [
      "Tự học; giao tiếp và hợp tác (xây dựng dàn ý, làm bài trình chiếu theo nhóm); giải quyết vấn đề và sáng tạo.",
      "Năng lực số 1.2.TC2a: xác định nhu cầu thông tin, dùng máy tìm kiếm với từ khoá phù hợp, chọn nguồn đáng tin cậy.",
      "Năng lực số 1.2.TC2b: ghi chép, tổng hợp thông tin, ghi rõ nguồn; tạo và chia sẻ sản phẩm số an toàn, có trách nhiệm.",
      "Năng lực AI 8.A3.1: phân biệt được vai trò của người dùng và người tạo AI khi tương tác với AI.",
    ],
    qualities: ["Chăm chỉ, trách nhiệm, trung thực: tôn trọng bản quyền, ghi nguồn thông tin, không sao chép sản phẩm của người khác."],
  },
  coreKnowledge: [
    "Khai thác thông tin số theo 3 nhiệm vụ: hình thành ý tưởng và cấu trúc bài trình chiếu → tìm kiếm và đánh giá thông tin → xử lí và trao đổi thông tin.",
    "Bài trình chiếu khoảng 10 trang: trang tiêu đề, trang dàn ý, trang giới thiệu vấn đề, một số trang nội dung, trang kết luận và trang tài liệu tham khảo; mỗi trang không quá 6 mục, mỗi mục không quá 2 dòng.",
    "Tìm kiếm bằng từ khoá phù hợp; ghi chép kết quả tìm kiếm (nội dung, địa chỉ trang web, nguồn gốc, thời gian).",
    "Đánh giá thông tin trước khi sử dụng: thông tin có thực sự phù hợp với nội dung trình bày không? Nguồn tin có đáng tin cậy không?",
    "Chia sẻ bài trình chiếu bằng phương tiện kĩ thuật số (thư điện tử, mạng xã hội, không gian lưu trữ dùng chung,…) theo tiêu chí dễ sử dụng và an toàn dữ liệu.",
  ],
  keywords: ["Từ khoá tìm kiếm", "Nguồn tin", "Đánh giá thông tin", "Tài liệu tham khảo", "Chia sẻ an toàn"],
  settings: { basePoints: 100, useTimer: false, defaultTime: 60, sound: true, streakEnabled: true },

  activities: [
    /* =========================== TIẾT 1 =========================== */
    /* ===================== HĐ1: MỞ ĐẦU (10 phút) ===================== */
    {
      id: "mo-dau", name: "Mở đầu — Băn khoăn về năng lượng ⚡", type: "knowledge",
      goal: "Nhận ra sự cần thiết phải khai thác thông tin trong môi trường số với chủ đề “Năng lượng tái tạo”.",
      time: 600,
      task: "3 bạn đóng vai Minh, Khoa, An đọc đoạn hội thoại (SGK tr.14). Cả lớp lắng nghe và cho biết: hướng giải quyết băn khoăn của các bạn là gì?",
      sgkImage: "assets/sgk/hoi-thoai.jpg",
      html: KICH_HTML,
      questions: [
        { question: "Theo đoạn hội thoại, hầu hết năng lượng hiện nay đến từ đâu?", type: "multiple-choice",
          options: ["Năng lượng gió", "Năng lượng mặt trời", "Nhiên liệu hoá thạch như xăng và than", "Rác thải"],
          answer: 2, explanation: "Khoa: “Hầu hết năng lượng đến từ nhiên liệu hoá thạch như xăng và than.”", level: "nhan-biet", activity: "mo-dau" },
        { question: "Những nguồn năng lượng nào Minh nhắc tới là “dường như không bao giờ cạn kiệt”? (Chọn tất cả ý đúng)", type: "multiple-select",
          options: ["Nắng", "Gió", "Than đá", "Nước", "Rác thải"],
          answer: [0, 1, 3, 4], explanation: "Minh: nắng, gió, nước và thậm chí là rác thải. Than đá là nhiên liệu hoá thạch, có thể cạn kiệt.", level: "nhan-biet", activity: "mo-dau" },
        { question: "Để giải quyết băn khoăn của các bạn (điện gió, điện mặt trời, thuỷ điện đều có nhược điểm), em nên làm gì?", type: "multiple-choice",
          options: ["Đoán theo cảm nhận của mình", "Khai thác thông tin số để tìm hiểu đầy đủ hơn, rồi tạo bài trình chiếu về năng lượng tái tạo", "Chỉ hỏi một người bạn", "Bỏ qua vì không quan trọng"],
          answer: 1, explanation: "Khai thác thông tin số (tìm kiếm, đánh giá, xử lí, trao đổi) để có thêm thông tin cho bài trình chiếu “Năng lượng tái tạo”.", level: "thong-hieu", activity: "mo-dau" },
      ],
    },

    /* ===================== HĐ2.1: NHIỆM VỤ 1 — Ý TƯỞNG VÀ CẤU TRÚC (15 phút) ===================== */
    {
      id: "nv1-y-tuong", name: "Nhiệm vụ 1: Hình thành ý tưởng và cấu trúc bài trình chiếu 💡", type: "knowledge",
      goal: "Xây dựng ý tưởng và cấu trúc bài trình chiếu về chủ đề Năng lượng tái tạo.",
      time: 420,
      task: "Nhóm đọc Nhiệm vụ 1 (SGK tr.14–15): Bước 1 chọn một khía cạnh về năng lượng tái tạo; Bước 2 phát triển ý tưởng thành các câu hỏi; Bước 3 xác định mức độ, yêu cầu của bài trình chiếu.",
      sgkImage: "assets/sgk/nhiem-vu-1.jpg",
      content: {
        heading: "💡 Nhiệm vụ 1. Hình thành ý tưởng và cấu trúc bài trình chiếu",
        revealLabel: "📖 Hướng dẫn 3 bước (SGK tr.14–15)",
        blocks: [
          { kind: "text", value: "Bước 1. Nêu một khía cạnh hay một vấn đề cụ thể về năng lượng tái tạo mà em định trình bày như thuỷ điện, điện gió, điện mặt trời,… hoặc năng lượng tái tạo tại địa phương, nơi em đang sinh sống." },
          { kind: "text", value: "Bước 2. Phát triển ý tưởng thành nội dung cụ thể của bài trình chiếu. Nội dung có thể sắp xếp theo trình tự lôgic và thể hiện dưới dạng những câu hỏi để thuận lợi cho việc tìm tư liệu. Chẳng hạn:" },
          { kind: "list", value: [
            "1) Năng lượng tái tạo là gì?",
            "2) Nguồn năng lượng nào sản xuất ra điện ở nơi em sinh sống? Ưu, nhược điểm của nguồn năng lượng đó là gì?",
            "3) Hãy chọn một nguồn năng lượng thay thế. Ưu, nhược điểm của nguồn năng lượng được chọn là gì?",
            "4) Loại năng lượng nào sẽ thay thế xăng dầu hiện đang được sử dụng cho ô tô, xe máy,…?",
            "5) Nếu được quyết định thiết kế một nhà máy điện, em sẽ chọn cách nào để sản xuất điện? Tại sao cách đó tốt hơn những cách khác?",
          ] },
          { kind: "text", value: "Bước 3. Xác định mức độ, yêu cầu cụ thể với bài trình chiếu. Ví dụ:" },
          { kind: "list", value: [
            "Bài trình chiếu khoảng 10 trang: trang tiêu đề, trang dàn ý, trang giới thiệu vấn đề, một số trang nội dung, trang kết luận và trang tài liệu tham khảo.",
            "Mỗi trang nội dung không quá 6 mục; mỗi mục không quá 2 dòng.",
            "Bài trình chiếu cần có ít nhất 2 hình ảnh minh hoạ cho nội dung trình bày.",
          ] },
        ],
      },
      questions: [
        { question: "Vì sao ở Bước 2 nên thể hiện nội dung bài trình chiếu dưới dạng những câu hỏi?", type: "multiple-choice",
          options: ["Vì như vậy bài trình chiếu dài hơn", "Để thuận lợi cho việc tìm tư liệu", "Vì phần mềm trình chiếu yêu cầu", "Để không cần tìm kiếm thông tin"],
          answer: 1, explanation: "Mỗi câu hỏi định hướng một nội dung cần tìm — thuận lợi cho việc tìm tư liệu (SGK tr.14).", level: "thong-hieu", activity: "nv1-y-tuong" },
        { question: "Theo gợi ý Bước 3, mỗi trang nội dung không quá bao nhiêu mục và mỗi mục không quá bao nhiêu dòng?", type: "multiple-choice",
          options: ["10 mục, 5 dòng", "3 mục, 1 dòng", "8 mục, 3 dòng", "6 mục, 2 dòng"],
          answer: 3, explanation: "Mỗi trang nội dung không quá 6 mục; mỗi mục không quá 2 dòng (SGK tr.15).", level: "nhan-biet", activity: "nv1-y-tuong" },
        { question: "Bài trình chiếu cần có ít nhất bao nhiêu hình ảnh minh hoạ?", type: "multiple-choice",
          options: ["2 hình ảnh", "Không cần hình ảnh", "10 hình ảnh", "Mỗi dòng một hình ảnh"],
          answer: 0, explanation: "Bài trình chiếu cần có ít nhất 2 hình ảnh minh hoạ cho nội dung trình bày (SGK tr.15).", level: "nhan-biet", activity: "nv1-y-tuong" },
      ],
    },
    {
      id: "sap-xep-cau-truc", name: "Trò chơi: Sắp xếp cấu trúc bài trình chiếu 🧩", type: "ordering",
      goal: "Ghi nhớ cấu trúc bài trình chiếu theo gợi ý Bước 3 (SGK tr.15).",
      time: 180,
      task: "Nhóm sắp xếp các trang của bài trình chiếu theo đúng thứ tự rồi bấm Nộp bài.",
      steps: ["🏷️ Trang tiêu đề", "📋 Trang dàn ý", "❓ Trang giới thiệu vấn đề", "📊 Một số trang nội dung", "✅ Trang kết luận", "📚 Trang tài liệu tham khảo"],
      explanation: "Bài trình chiếu khoảng 10 trang: tiêu đề → dàn ý → giới thiệu vấn đề → các trang nội dung → kết luận → tài liệu tham khảo.",
    },
    {
      id: "pht1-dan-y", name: "Phiếu học tập 1: Dàn ý bài trình chiếu của nhóm 📝", type: "vandung",
      goal: "Xây dựng dàn ý bài trình chiếu chủ đề Năng lượng tái tạo.",
      time: 360,
      task: "Nhóm chọn khía cạnh sẽ trình bày, viết dàn ý các trang (Trang 1: Giới thiệu chủ đề … Trang cuối: Tài liệu tham khảo) rồi gửi cho thầy/cô; đại diện nhóm báo cáo.",
      sgkImage: "assets/sgk/hinh-3-2.jpg",
      intro: "Gửi dàn ý cho thầy/cô rồi bấm để xem dàn ý tham khảo.",
      cases: [
        { question: "Khía cạnh nhóm em chọn trình bày và dàn ý các trang của bài trình chiếu chủ đề NĂNG LƯỢNG TÁI TẠO.",
          answer: "Dàn ý tham khảo (Hình 3.2): (1) Giới thiệu chủ đề; (2) Năng lượng tái tạo là gì?; (3) Nguồn năng lượng sản xuất điện tại tỉnh…; (4) Nhà máy điện tương lai; (5) Kết luận; (6) Tài liệu tham khảo." },
      ],
    },

    /* ===================== HĐ2.2: NHIỆM VỤ 2 — TÌM KIẾM VÀ ĐÁNH GIÁ THÔNG TIN ===================== */
    {
      id: "nv2-tim-kiem", name: "Nhiệm vụ 2: Tìm kiếm và đánh giá thông tin 🔍", type: "knowledge",
      goal: "Tìm kiếm, ghi chép kết quả tìm kiếm và đánh giá lợi ích của thông tin tìm được.",
      time: 900,
      task: "Nhóm (2 HS/máy) mở trình duyệt Cốc Cốc hoặc Google Chrome, tìm kiếm với các từ khoá về năng lượng tái tạo; ghi kết quả vào Phiếu học tập 2 theo mẫu Bảng 3.1; đánh giá từng thông tin: có phù hợp nội dung trình bày không, nguồn có đáng tin cậy không.",
      sgkImage: "assets/sgk/nhiem-vu-2.jpg",
      html: BANG_3_1_HTML,
      content: {
        heading: "🔍 Nhiệm vụ 2. Tìm kiếm và đánh giá thông tin",
        revealLabel: "📖 Hướng dẫn 3 bước (SGK tr.15–16)",
        blocks: [
          { kind: "text", value: "Bước 1. Tìm kiếm thông tin. Sử dụng máy tìm kiếm với các từ khoá tìm kiếm như “năng lượng tái tạo”, “năng lượng thay thế”, “ưu, nhược điểm của thuỷ điện”, “ưu, nhược điểm của điện gió”,…" },
          { kind: "text", value: "Bước 2. Ghi chép kết quả tìm kiếm để thuận tiện cho việc đánh giá và tham khảo (Bảng 3.1 là một ví dụ)." },
          { kind: "text", value: "Bước 3. Đánh giá thông tin. Trước khi sử dụng thông tin để minh hoạ cho lập luận của mình, em cần đánh giá lợi ích của thông tin bằng cách trả lời một số câu hỏi như:" },
          { kind: "list", value: [
            "Thông tin có thực sự phù hợp với nội dung trình bày không? Chẳng hạn, kiến thức chung về các nguồn năng lượng sẽ không đáp ứng được yêu cầu dự báo phát triển của các nguồn năng lượng.",
            "Nguồn tin có đáng tin cậy không? Chẳng hạn, với nội dung quy hoạch cơ cấu nguồn điện, thông tin từ cơ quan chính phủ đáng tin cậy hơn thông tin trên các diễn đàn hay trang web của doanh nghiệp.",
          ] },
          { kind: "html", value: HINH_3_1_HTML },
        ],
      },
      questions: [
        { question: "Em cần tìm ưu, nhược điểm của điện gió. Từ khoá nào phù hợp nhất?", type: "multiple-choice",
          options: ["điện", "gió", "ưu, nhược điểm của điện gió", "năng lượng"],
          answer: 2, explanation: "Từ khoá càng cụ thể, sát nội dung cần tìm thì kết quả càng phù hợp — như gợi ý của SGK: “ưu, nhược điểm của điện gió”.", level: "van-dung", activity: "nv2-tim-kiem" },
        { question: "Theo Bảng 3.1, khi ghi chép kết quả tìm kiếm cần ghi những thông tin nào? (Chọn tất cả ý đúng)", type: "multiple-select",
          options: ["Nội dung", "Địa chỉ trang web", "Số lượt thích của bài viết", "Nguồn gốc", "Thời gian"],
          answer: [0, 1, 3, 4], explanation: "Bảng 3.1 gồm: STT, nội dung, địa chỉ trang web, nguồn gốc, thời gian — giúp đánh giá và ghi tài liệu tham khảo.", level: "nhan-biet", activity: "nv2-tim-kiem" },
        { question: "Trang nội dung “Quy hoạch cơ cấu nguồn điện” nên dùng nguồn nào trong Bảng 3.1?", type: "multiple-choice",
          options: ["Diễn đàn Cộng đồng Cơ Điện Lạnh Việt Nam (2008)", "Trang web của doanh nghiệp", "Bộ Công Thương (…gov.vn, 2021)", "Không cần nguồn"],
          answer: 2, explanation: "Với nội dung quy hoạch cơ cấu nguồn điện, thông tin từ cơ quan chính phủ đáng tin cậy hơn thông tin trên các diễn đàn hay trang web của doanh nghiệp (SGK tr.15). Địa chỉ …gov.vn là trang của cơ quan chính phủ (Hình 3.1).", level: "thong-hieu", activity: "nv2-tim-kiem" },
        { question: "Thông tin “Khái niệm chung về các nguồn năng lượng” (diễn đàn, 2008) có dùng được cho trang “Dự báo phát triển các nguồn năng lượng” không?", type: "multiple-choice",
          options: ["Không phù hợp — kiến thức chung không đáp ứng yêu cầu dự báo phát triển, lại đã cũ", "Rất phù hợp vì là khái niệm chung", "Phù hợp vì trang nào cũng dùng được", "Phù hợp vì có địa chỉ trang web"],
          answer: 0, explanation: "Câu hỏi đánh giá thứ nhất: thông tin có thực sự phù hợp với nội dung trình bày không? Kiến thức chung về các nguồn năng lượng không đáp ứng được yêu cầu dự báo (SGK tr.15).", level: "van-dung", activity: "nv2-tim-kiem" },
      ],
      remember: [
        "Trước khi sử dụng thông tin, cần đánh giá lợi ích của thông tin: Thông tin có thực sự phù hợp với nội dung trình bày không? Nguồn tin có đáng tin cậy không?",
      ],
    },
    {
      id: "danh-gia-ket-qua", name: "Trò chơi: Đánh giá kết quả tìm kiếm 🧐", type: "dragdrop",
      goal: "Vận dụng 2 câu hỏi đánh giá (phù hợp? tin cậy?) để chọn thông tin cho bài trình chiếu Năng lượng tái tạo.",
      time: 360,
      task: "Nhóm đọc từng kết quả tìm kiếm (giả định) và xếp vào “Nên dùng” hoặc “Cần cân nhắc” cho bài trình chiếu Năng lượng tái tạo. Xếp hết rồi bấm Nộp bài.",
      groups: ["✅ Nên dùng cho bài trình chiếu", "⚠️ Cần cân nhắc (chưa phù hợp / kém tin cậy)"],
      items: [
        { text: "Trang …gov.vn của Bộ Công Thương (2021): Quy hoạch điện VIII ưu tiên phát triển năng lượng tái tạo", group: 0 },
        { text: "Bài báo chính thống (có tác giả, ngày đăng) về nhà máy điện mặt trời ở tỉnh em", group: 0 },
        { text: "Trang của cơ quan nhà nước về năng lượng giải thích “Năng lượng tái tạo là gì”", group: 0 },
        { text: "Trang chính thức của công ty điện lực tỉnh em giới thiệu các nguồn điện cung cấp cho tỉnh", group: 0 },
        { text: "Bài viết diễn đàn năm 2008 về khái niệm chung các nguồn năng lượng — định dùng cho trang “Dự báo phát triển”", group: 1 },
        { text: "Bài đăng diễn đàn không rõ người viết về quy hoạch cơ cấu nguồn điện", group: 1 },
        { text: "Quảng cáo của cửa hàng bán tấm pin mặt trời: “Lắp là không bao giờ phải trả tiền điện!”", group: 1 },
        { text: "Video ngắn không rõ nguồn, chỉ nêu cảm nghĩ cá nhân về điện gió", group: 1 },
        { text: "Trang web công thức nấu ăn có nhắc tới “bếp năng lượng mặt trời”", group: 1 },
        { text: "Trang web lâu không cập nhật (2010) nói về giá lắp điện mặt trời hiện nay", group: 1 },
      ],
      explanation: "Hai câu hỏi đánh giá (SGK tr.15): Thông tin có thực sự phù hợp với nội dung trình bày không? Nguồn tin có đáng tin cậy không? Nguồn chính thống, đúng chủ đề, còn thời sự → nên dùng; diễn đàn, quảng cáo phóng đại, ý kiến cá nhân, lạc đề, lỗi thời → cần cân nhắc.",
    },
    {
      id: "pht2-ket-qua", name: "Phiếu học tập 2: Kết quả tìm kiếm của nhóm 📋", type: "vandung",
      goal: "Ghi lại từ khoá đã dùng và tổng hợp kết quả tìm kiếm theo mẫu Bảng 3.1; đánh giá lợi ích thông tin.",
      time: 600,
      task: "Nhóm gửi cho thầy/cô: 1) Các từ khoá đã dùng; 2) Bảng kết quả tìm kiếm (STT – Nội dung – Địa chỉ trang web – Nguồn gốc – Thời gian) kèm đánh giá: thông tin có phù hợp không, nguồn có đáng tin cậy không.",
      sgkImage: "assets/sgk/bang-3-1.jpg",
      intro: "Gửi câu trả lời cho thầy/cô rồi bấm để xem gợi ý.",
      cases: [
        { question: "1. Nhóm em đã sử dụng máy tìm kiếm với những từ khoá nào?",
          answer: "Gợi ý (SGK tr.15): “năng lượng tái tạo”, “năng lượng thay thế”, “ưu, nhược điểm của thuỷ điện”, “ưu, nhược điểm của điện gió”, “điện mặt trời tại tỉnh …”, “quy hoạch điện VIII”… Nếu kết quả quá nhiều, thu hẹp từ khoá; quá ít thì mở rộng từ khoá." },
        { question: "2. Tổng hợp kết quả tìm kiếm theo bảng (STT – Nội dung – Địa chỉ trang web – Nguồn gốc – Thời gian) và đánh giá lợi ích của các thông tin đó.",
          answer: "Ví dụ theo Bảng 3.1: (1) Khái niệm chung về các nguồn năng lượng — hvacr.vn/diendan — Cộng đồng Cơ Điện Lạnh Việt Nam — 2008: diễn đàn, đã cũ, chỉ dùng tham khảo khái niệm chung, không dùng cho phần dự báo. (2) Năng lượng tái tạo sẽ thống trị công suất điện toàn thế giới — evn.com.vn — Tập đoàn Điện lực Việt Nam — 2022. (3) Quy hoạch điện VIII: Ưu tiên phát triển năng lượng tái tạo — erea.gov.vn — Bộ Công Thương — 2021: nguồn cơ quan chính phủ, đáng tin cậy cho nội dung quy hoạch cơ cấu nguồn điện. Thông tin phù hợp, tin cậy giúp trả lời các câu hỏi ở Nhiệm vụ 1 (năng lượng tái tạo giúp giảm phát thải khí nhà kính, không cạn kiệt như nhiên liệu hoá thạch…)." },
      ],
    },

    /* =========================== TIẾT 2 =========================== */
    /* ===================== NHIỆM VỤ 3 — XỬ LÍ VÀ TRAO ĐỔI THÔNG TIN ===================== */
    {
      id: "nv3-xu-li", name: "Nhiệm vụ 3: Xử lí và trao đổi thông tin 🖥️", type: "knowledge",
      goal: "Tạo bài trình chiếu theo cấu trúc đã định, biên tập nội dung và chia sẻ trong môi trường số.",
      time: 1200,
      task: "Nhóm (2 HS/máy) mở PowerPoint: tạo các trang theo dàn ý (tham khảo Hình 3.2, 3.3, 3.4), biên tập nội dung (≤ 6 mục/trang, ≤ 2 dòng/mục), dùng phần mềm xử lí ảnh tạo, sửa hình minh hoạ; có trang tài liệu tham khảo ghi rõ nguồn.",
      sgkImage: "assets/sgk/nhiem-vu-3.jpg",
      content: {
        heading: "🖥️ Nhiệm vụ 3. Xử lí và trao đổi thông tin",
        revealLabel: "📖 Hướng dẫn và trang mẫu (SGK tr.16–17)",
        blocks: [
          { kind: "text", value: "Bước 1. Tạo bài trình chiếu: tạo các trang theo cấu trúc đã định; soạn nội dung từng trang sao cho phù hợp với lập luận của cả bài; sử dụng thông tin đã được chọn làm tư liệu tham khảo cho các trang nội dung." },
          { kind: "image", value: "assets/sgk/hinh-3-2.jpg", caption: "Hình 3.2. Trang dàn ý" },
          { kind: "html", value: CO_CAU_HTML },
          { kind: "image", value: "assets/sgk/hinh-3-4.jpg", caption: "Hình 3.4. Trang tài liệu tham khảo" },
          { kind: "text", value: "Bước 2. Biên tập nội dung: mỗi trang không quá 6 mục, mỗi mục không quá 2 dòng; sử dụng phần mềm xử lí hình ảnh để tạo và sửa hình ảnh minh hoạ phù hợp với nội dung." },
          { kind: "text", value: "Bước 3. Chia sẻ bài trình chiếu: lựa chọn phương tiện kĩ thuật số để chia sẻ (thư điện tử, mạng xã hội, không gian lưu trữ dùng chung,…); giải thích phương án lựa chọn theo các tiêu chí: dễ sử dụng và an toàn dữ liệu." },
        ],
      },
      questions: [
        { question: "Theo Hình 3.3, năm 2045 nguồn điện nào chiếm tỉ lệ lớn nhất trong cơ cấu nguồn điện?", type: "multiple-choice",
          options: ["Nhiệt điện than (18%)", "Điện gió (22%)", "Điện mặt trời (20%)", "Nhiệt điện khí (24%)"],
          answer: 3, explanation: "Năm 2045: nhiệt điện khí 24%, điện gió 22%, điện mặt trời 20%, nhiệt điện than 18%.", level: "thong-hieu", activity: "nv3-xu-li" },
        { question: "Theo Hình 3.3, tỉ lệ điện gió và điện mặt trời thay đổi thế nào từ năm 2030 đến năm 2045?", type: "multiple-choice",
          options: ["Cả hai đều giảm", "Cả hai đều tăng (điện gió 14% → 22%, điện mặt trời 13% → 20%)", "Điện gió giảm, điện mặt trời tăng", "Không thay đổi"],
          answer: 1, explanation: "Theo quy hoạch, tỉ lệ năng lượng tái tạo (điện gió, điện mặt trời) tăng, còn nhiệt điện than giảm (28% → 18%).", level: "van-dung", activity: "nv3-xu-li" },
        { question: "Trang tài liệu tham khảo (Hình 3.4) có tác dụng gì?", type: "multiple-choice",
          options: ["Ghi rõ nguồn thông tin đã sử dụng — tôn trọng bản quyền, giúp người xem kiểm chứng", "Làm bài trình chiếu dài thêm", "Để trang trí", "Không có tác dụng"],
          answer: 0, explanation: "Ghi nguồn thể hiện sự tôn trọng bản quyền và giúp người xem đánh giá, kiểm chứng thông tin.", level: "thong-hieu", activity: "nv3-xu-li" },
      ],
    },
    {
      id: "chia-se-an-toan", name: "Chọn cách chia sẻ an toàn 🔐", type: "quiz",
      goal: "Lựa chọn phương tiện kĩ thuật số chia sẻ bài trình chiếu theo tiêu chí dễ sử dụng và an toàn dữ liệu.",
      time: 360,
      task: "Đọc từng tình huống và chọn cách chia sẻ bài trình chiếu phù hợp nhất (dễ sử dụng và an toàn dữ liệu).",
      questions: [
        { question: "Nhóm cần nộp bài trình chiếu cho thầy/cô chấm. Cách nào dễ sử dụng và an toàn?", type: "multiple-choice",
          options: ["Đăng công khai lên mạng xã hội rồi nhắn thầy/cô tự tìm", "Gửi tệp đính kèm qua thư điện tử cho thầy/cô (hoặc gửi vào nhóm học tập của lớp)", "In ra giấy rồi chụp ảnh từng trang", "Nhờ người lạ gửi hộ"],
          answer: 1, explanation: "Thư điện tử gửi đúng người nhận, dễ sử dụng, không công khai sản phẩm cho người không liên quan.", level: "van-dung", activity: "chia-se-an-toan" },
        { question: "Cả nhóm muốn cùng sửa bài trình chiếu khi ở nhà. Nên chọn cách nào?", type: "multiple-choice",
          options: ["Mỗi bạn sửa một bản rồi gộp tay", "Chia sẻ đường liên kết cho “bất kì ai” cũng sửa được", "Không gian lưu trữ dùng chung, chỉ cấp quyền sửa cho các thành viên trong nhóm", "Gửi mật khẩu tài khoản cho cả lớp"],
          answer: 2, explanation: "Không gian lưu trữ dùng chung giúp cùng làm việc dễ dàng; chỉ cấp quyền cho thành viên nhóm để an toàn dữ liệu.", level: "van-dung", activity: "chia-se-an-toan" },
        { question: "Trang cuối bài có ảnh các thành viên kèm số điện thoại, địa chỉ nhà. Trước khi chia sẻ rộng rãi, nhóm nên làm gì?", type: "multiple-choice",
          options: ["Xoá số điện thoại, địa chỉ nhà — không chia sẻ thông tin cá nhân", "Giữ nguyên cho bạn bè dễ liên lạc", "Thêm cả mật khẩu thư điện tử", "Phóng to số điện thoại cho dễ đọc"],
          answer: 0, explanation: "An toàn dữ liệu: không chia sẻ thông tin cá nhân (số điện thoại, địa chỉ…) trong sản phẩm công khai.", level: "van-dung", activity: "chia-se-an-toan" },
        { question: "Tệp bài trình chiếu có nhiều hình ảnh, quá lớn nên không đính kèm thư điện tử được. Cách xử lí phù hợp?", type: "multiple-choice",
          options: ["Bỏ hết hình ảnh", "Gửi từng trang một qua tin nhắn", "Không nộp bài nữa", "Tải lên không gian lưu trữ dùng chung rồi gửi đường liên kết chỉ cho thầy/cô xem"],
          answer: 3, explanation: "Không gian lưu trữ dùng chung phù hợp với tệp lớn; gửi liên kết có giới hạn quyền truy cập để an toàn dữ liệu.", level: "van-dung-cao", activity: "chia-se-an-toan" },
        { question: "Khi đăng bài trình chiếu lên mạng xã hội, em cần ghi rõ nguồn các thông tin, hình ảnh đã sử dụng.", type: "true-false",
          answer: true, explanation: "Đúng — tôn trọng bản quyền và giúp người xem kiểm chứng thông tin.", level: "nhan-biet", activity: "chia-se-an-toan" },
      ],
    },

    /* ===================== HĐ3: LUYỆN TẬP (15 phút) ===================== */
    {
      id: "cham-cheo", name: "Luyện tập: Phiếu chấm chéo bài trình chiếu 🤝", type: "checklist",
      goal: "Hoàn thiện, trình chiếu sản phẩm và chấm chéo theo bảng kiểm.",
      time: 600,
      target: "Nhóm em chấm bài của",
      task: "Các nhóm hoàn thiện rồi trình chiếu bài “Năng lượng tái tạo”. Xem bài của nhóm được thầy/cô phân công, ghi số nhóm được chấm, tick từng tiêu chí rồi gửi cho thầy/cô.",
      columns: ["✅ Đạt", "🔧 Chưa đạt"],
      sections: [
        { title: "📋 BẢNG KIỂM", items: [
          "Bài trình chiếu có trang tiêu đề, một số trang nội dung và trang kết luận",
          "Trang chiếu có sử dụng hình ảnh minh hoạ, có cấu trúc rõ ràng, có tính sáng tạo",
          "Nội dung các trang chiếu tìm kiếm được đánh giá độ tin cậy thông tin, căn cứ địa chỉ trang web, nguồn gốc,…",
          "Thông tin tìm được có giải quyết vấn đề hay trả lời câu hỏi đặt ra",
          "Chia sẻ bài trình chiếu trong môi trường số dễ sử dụng và an toàn dữ liệu",
        ] },
      ],
      note: "Góp ý cho nhóm bạn: một điều em thích nhất và một điều nên sửa",
      modelAnswer: [
        "Góp ý cụ thể, lịch sự: nêu điểm tốt trước, rồi đến điểm nên sửa kèm cách sửa.",
        "Lỗi thường gặp: trang quá nhiều chữ (quá 6 mục, mục dài hơn 2 dòng), thiếu trang tài liệu tham khảo, dùng thông tin từ diễn đàn/quảng cáo mà không đánh giá, lạm dụng hiệu ứng.",
      ],
    },
    {
      id: "luyen-tap-sgk", name: "Luyện tập SGK tr.17 ✔️", type: "quiz",
      goal: "Chọn nguồn thông tin cần tham khảo nhất, đáng tin cậy nhất.",
      time: 180,
      task: "Trả lời 2 câu hỏi Luyện tập (SGK tr.17).",
      sgkImage: "assets/sgk/luyen-tap.jpg",
      questions: [
        { question: "1. Để tìm hiểu về cách sử dụng một chiếc máy ảnh mới, nguồn thông tin nào sau đây cần được tham khảo nhất?", type: "multiple-choice",
          options: ["Hướng dẫn của một người đã từng chụp ảnh.", "Hướng dẫn sử dụng của nhà sản xuất.", "Hướng dẫn của một người giỏi Tin học.", "Câu trả lời trên một số diễn đàn về chụp ảnh."],
          answer: 1, explanation: "Nhà sản xuất hiểu rõ nhất chiếc máy ảnh của mình; hướng dẫn sử dụng chính thức là nguồn cần tham khảo nhất.", level: "thong-hieu", activity: "luyen-tap-sgk" },
        { question: "2. Để tìm hiểu về một đội bóng đá ở châu Phi, nguồn thông tin nào sau đây đáng tin cậy nhất?", type: "multiple-choice",
          options: ["Nguồn tin từ câu lạc bộ người hâm mộ đội bóng đó.", "Nguồn tin từ câu lạc bộ của đội bóng đối thủ.", "Nguồn tin từ Liên đoàn bóng đá châu Phi.", "Nguồn tin từ diễn đàn Bóng đá Việt Nam."],
          answer: 2, explanation: "Liên đoàn bóng đá châu Phi là tổ chức có thẩm quyền, trung lập. Người hâm mộ hay đội đối thủ dễ mang ý kiến, định kiến; diễn đàn ở xa khó kiểm chứng.", level: "thong-hieu", activity: "luyen-tap-sgk" },
      ],
    },

    /* ===================== HĐ4: VẬN DỤNG (5 phút) ===================== */
    {
      id: "van-dung", name: "Vận dụng 🚀", type: "vandung",
      goal: "Tìm kiếm, đánh giá thông tin về chủ đề yêu thích; thực hiện dự án tìm hiểu một chủ đề theo nhóm.",
      time: 300,
      task: "Câu 1 (SGK) làm trên lớp hoặc ở nhà; Câu 2 (dự án nhóm theo giáo án) làm ở nhà, trình bày buổi học sau, gửi sản phẩm qua thư điện tử hoặc Zalo của thầy/cô.",
      sgkImage: "assets/sgk/van-dung.jpg",
      intro: "Gửi câu trả lời cho thầy/cô rồi bấm để xem gợi ý.",
      cases: [
        { question: "1. (SGK) Em hãy tìm thông tin về một đội bóng, một cầu thủ hay một nghệ sĩ mà em hâm mộ. Hãy đánh giá những nguồn thông tin tìm được.",
          answer: "Gợi ý: ghi các nguồn tìm được theo mẫu Bảng 3.1 (nội dung, địa chỉ trang web, nguồn gốc, thời gian). Đánh giá: trang chính thức của đội bóng/liên đoàn/nghệ sĩ và báo chí chính thống đáng tin cậy hơn diễn đàn, trang người hâm mộ, bài đăng không rõ nguồn; thông tin phải còn thời sự và phù hợp điều em cần tìm." },
        { question: "2. (Giáo án) Dự án nhóm: tìm kiếm, tổng hợp và tạo bài trình chiếu về chủ đề được phân công (tự học tiếng Anh, chức năng tìm kiếm nâng cao, phòng chống đuối nước, tác hại của nghiện Internet và cách phòng chống…). Bài gồm: tên chủ đề; tóm tắt thông tin tìm được và độ tin cậy (kèm căn cứ đánh giá); những thông tin phù hợp với chủ đề. Bài trình bày của em có mang lại lợi ích cho các bạn không? Tại sao?",
          answer: "Ví dụ (giáo án) — TÁC HẠI CỦA INTERNET VÀ CÁCH PHÒNG CHỐNG. Tác hại, nguy cơ: thông tin cá nhân bị lộ hoặc đánh cắp; máy tính nhiễm virus, mã độc; bị lừa đảo, dụ dỗ, đe doạ, bắt nạt trên mạng; tiếp nhận thông tin không chính xác; nghiện Internet, nghiện trò chơi trên mạng. Cách phòng chống: giữ thông tin an toàn; không gặp gỡ bạn mới quen trên mạng; không chấp nhận thư, tin nhắn, lời mời vào nhóm từ người lạ; kiểm tra độ tin cậy của thông tin; khi bị bắt nạt, đe doạ, lừa đảo hãy chia sẻ với thầy cô và người lớn trong gia đình." },
      ],
    },

    /* ===================== TỔNG KẾT ===================== */
    {
      id: "tong-ket", name: "Tổng kết", type: "summary",
      task: "Cả lớp nhắc lại quy trình khai thác thông tin số và làm thử thách cuối. Về nhà: hoàn thiện Vận dụng; đọc trước Bài 4: Đạo đức và văn hoá trong sử dụng công nghệ kĩ thuật số.",
      content: {
        learned: [
          "Nhiệm vụ 1: hình thành ý tưởng (dạng câu hỏi) và cấu trúc bài trình chiếu (khoảng 10 trang, ≤ 6 mục/trang, ≤ 2 dòng/mục, ≥ 2 hình ảnh).",
          "Nhiệm vụ 2: tìm kiếm bằng từ khoá phù hợp, ghi chép kết quả (nội dung, địa chỉ, nguồn gốc, thời gian), đánh giá: phù hợp? tin cậy?",
          "Nhiệm vụ 3: tạo bài trình chiếu, biên tập nội dung, ghi tài liệu tham khảo, chia sẻ dễ sử dụng và an toàn dữ liệu.",
        ],
        challenge: [
          { question: "Nhóm Hà tìm được 3 thông tin về “Quy hoạch cơ cấu nguồn điện”: (1) diễn đàn năm 2008; (2) trang web của một doanh nghiệp bán pin mặt trời; (3) trang …gov.vn của Bộ Công Thương. Nên chọn thông tin nào?", type: "multiple-choice",
            options: ["(1) vì có từ lâu", "(2) vì doanh nghiệp hiểu rõ sản phẩm", "(3) vì là nguồn cơ quan chính phủ, phù hợp nội dung quy hoạch", "Chọn cả ba như nhau"],
            answer: 2, explanation: "Với nội dung quy hoạch cơ cấu nguồn điện, thông tin từ cơ quan chính phủ đáng tin cậy hơn diễn đàn hay trang web doanh nghiệp (SGK tr.15).", level: "van-dung", activity: "tong-ket" },
          { question: "Sắp xếp đúng thứ tự 3 nhiệm vụ khai thác thông tin số để làm bài trình chiếu:", type: "multiple-choice",
            options: ["Tìm kiếm và đánh giá → Hình thành ý tưởng, cấu trúc → Xử lí và trao đổi", "Hình thành ý tưởng, cấu trúc → Tìm kiếm và đánh giá → Xử lí và trao đổi", "Xử lí và trao đổi → Tìm kiếm và đánh giá → Hình thành ý tưởng", "Chia sẻ → Tìm kiếm → Hình thành ý tưởng"],
            answer: 1, explanation: "Nhiệm vụ 1: ý tưởng và cấu trúc → Nhiệm vụ 2: tìm kiếm và đánh giá → Nhiệm vụ 3: xử lí và trao đổi thông tin.", level: "thong-hieu", activity: "tong-ket" },
        ],
      },
    },
  ],
};

if (typeof module !== "undefined" && module.exports) module.exports = LESSON;
if (typeof window !== "undefined") window.LESSON = LESSON;
