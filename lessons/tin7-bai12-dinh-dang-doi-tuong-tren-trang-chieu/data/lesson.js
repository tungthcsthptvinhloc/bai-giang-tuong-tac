/* ============================================================================
 * BÀI 12 — ĐỊNH DẠNG ĐỐI TƯỢNG TRÊN TRANG CHIẾU  (Tin học 7 — Kết nối tri thức)
 * Chủ đề 4: Ứng dụng tin học (dự án Trường học xanh).
 * Bám sát SGK trang 61–67 + Kế hoạch bài dạy (2 tiết) của giáo viên.
 * Chỉ sửa file này để đổi nội dung. Engine app.js không cần sửa.
 * Thao tác sao chép, định dạng, mẫu định dạng, chèn/định dạng hình ảnh: HS làm trên PowerPoint thật — app không mô phỏng.
 * ==========================================================================*/

// ---- Nút mở phần mềm trình chiếu trực tuyến (mở tab mới) ----
const SLIDE_TOOLS = [
  { label: "PowerPoint trên web", url: "https://www.office.com/launch/powerpoint" },
  { label: "Google Trang trình bày (Slides)", url: "https://docs.google.com/presentation/" },
  { label: "Canva — bài thuyết trình", url: "https://www.canva.com/", note: "(mở tab mới, cần Internet và tài khoản)" },
];

// ---- Trang chiếu vẽ bằng HTML ----
const slideBox = (inner, w, bg) => `<div style="width:${w || 380}px;max-width:100%;min-height:${Math.round((w || 380) * 9 / 16)}px;background:${bg || "#fff"};border:1px solid #cbd5e1;box-shadow:0 4px 14px rgba(0,0,0,.14);border-radius:6px;padding:14px 18px;box-sizing:border-box;color:#1f2937;overflow:hidden;position:relative">${inner}</div>`;
const capt = (t, c) => `<div style="margin-top:6px;font-weight:700;color:${c || "#15803d"};text-align:center">${t}</div>`;
const pair = (a, b) => `<div style="display:flex;flex-wrap:wrap;gap:24px;justify-content:center;align-items:flex-start">${a}${b}</div>`;
const TNR = "font-family:'Times New Roman',Times,serif;";
const PHOTO = "background:radial-gradient(ellipse at 50% 0%,#fde68a 0%,#a3a35a 28%,#3f6212 60%,#1a2e05 100%)"; // "ảnh" bãi cỏ ban mai

// Hình 12.3 (vừa dán) và Hình 12.5 (sau khi định dạng, biên tập)
const S123 = slideBox(`<div style="${TNR}font-size:.78rem;line-height:1.32;text-align:justify">
  <div style="font-size:1.25rem;font-weight:700">1. Ý TƯỞNG</div>
  <div style="text-align:center">XÂY DỰNG NGÔI TRƯỜNG XANH - SẠCH - ĐẸP</div>
  <p style="margin:.3rem 0">Cây xanh là người bạn gắn bó, giúp duy trì cuộc sống của chúng ta. Cây xanh góp phần làm tăng vẻ đẹp cho môi trường, giúp môi trường trong lành. Mỗi người đều có thể góp phần làm cho cuộc sống trở nên tốt đẹp hơn bằng việc nâng cao ý thức bảo vệ môi trường và chung tay trồng thêm nhiều cây xanh.</p>
  <p style="margin:.3rem 0">Với ý nghĩa đó, chi đội 7A đề xuất và mong muốn thực hiện dự án <b>Trường học xanh</b> với mục tiêu để trường có thêm nhiều cây xanh.</p></div>`);
const S125 = slideBox(`<div style="${TNR}font-size:.8rem;line-height:1.45">
  <div style="text-align:center;font-size:1.35rem;font-weight:700">1. Ý TƯỞNG</div>
  <div style="text-align:center;color:#16a34a;font-weight:700;margin-bottom:8px">XÂY DỰNG NGÔI TRƯỜNG XANH - SẠCH - ĐẸP</div>
  ${["Cây xanh là người bạn gắn bó, giúp duy trì cuộc sống của chúng ta.", "Cây xanh giúp môi trường trong lành, xanh, sạch, đẹp.", "Cần nâng cao ý thức bảo vệ môi trường và chung tay trồng thêm nhiều cây xanh."].map((t) => `<div style="margin:4px 0"><span style="color:#16a34a">▪</span> ${t}</div>`).join("")}
  <div style="margin-top:4px">Chi đội 7A đề xuất và mong muốn thực hiện dự án <b>Trường học xanh</b>.</div></div>`);
const H123_125 = pair(`<div>${S123}${capt("Hình 12.3. Vừa sao chép vào (chưa biên tập)", "#db2777")}</div>`, `<div>${S125}${capt("Hình 12.5. Sau khi định dạng, biên tập")}</div>`);

// Trang tiêu đề: không có ảnh / có ảnh minh hoạ (Hình 12.10)
const TITLE_TXT = (light) => `<div style="position:relative;z-index:2;font-family:'Segoe UI',Arial,sans-serif;color:${light ? "#fff" : "#111"};${light ? "text-shadow:0 2px 6px rgba(0,0,0,.6);" : ""}">
  <div style="text-align:center;font-weight:800;margin-top:14px">DỰ ÁN</div><div style="text-align:center;font-weight:900;font-size:1.45rem">TRƯỜNG HỌC XANH</div>
  <div style="font-size:.85rem;margin-top:12px;line-height:1.35">Chi đội 7A<br>Trường THCS …<br>Ngày …</div></div>`;
const S_PLAIN = slideBox(TITLE_TXT(false));
const S_PHOTO = `<div style="width:380px;max-width:100%;background:#5b9e46;padding:14px;border-radius:6px;box-shadow:0 4px 14px rgba(0,0,0,.14);box-sizing:border-box">${slideBox(TITLE_TXT(true) + `<div style="position:absolute;right:14px;bottom:8px;font-size:2.4rem;z-index:1">🌱🌿</div>`, 352, "transparent").replace("background:transparent", PHOTO).replace("border:1px solid #cbd5e1", "border:4px solid #fff")}</div>`;
const ANH_SO_SANH = pair(`<div>${S_PLAIN}${capt("Trang ①: chỉ có chữ", "#64748b")}</div>`, `<div>${S_PHOTO}${capt("Trang ②: có ảnh minh hoạ (Hình 12.10)")}</div>`);

// Thay đổi lớp hình ảnh (Hình 12.7, 12.8)
const LAYER = (above) => slideBox(`${TITLE_TXT(false).replace("position:relative;z-index:2", `position:relative;z-index:${above ? 1 : 3}`)}
  <div style="position:absolute;left:30%;top:18%;width:48%;height:66%;${PHOTO};z-index:2;border:1px dashed #64748b"></div>`, 340);
const H127_128 = pair(`<div>${LAYER(true)}${capt("Hình 12.7. Hình ảnh che nội dung văn bản", "#db2777")}</div>`, `<div>${LAYER(false)}${capt("Hình 12.8. Sau khi Send Backward")}</div>`);

// Trang chiếu mắc lỗi trình bày (bắt lỗi)
const S_LOI = slideBox(`<div style="line-height:1.25">
  <div style="font-family:'Comic Sans MS',cursive;color:#facc15;font-size:1.1rem;text-align:center">kết quả dự kiến của dự án trường học xanh</div>
  ${[["Brush Script MT,cursive", "#ef4444"], ["Courier New,monospace", "#a855f7"], ["Impact,sans-serif", "#22d3ee"], ["Georgia,serif", "#f97316"]].map(([f, c], i) => `<div style="font-family:${f};color:${c};font-size:.68rem">Dòng ${i + 1}: Lớp 7A trồng 83 cây, lớp 7B trồng 100 cây, lớp 7C trồng 104 cây, lớp 7D trồng 84 cây, lớp 7E trồng 92 cây…</div>`).join("")}
  ${Array.from({ length: 7 }, (_, i) => `<div style="font-family:Arial;font-size:.62rem;color:#94a3b8">Dòng ${i + 5}: tổng chi phí mua cây hoa, cây ăn quả, cây bóng mát được tính như sau…</div>`).join("")}</div>`, 420);

// ---- Hội thoại mở đầu (SGK tr.61) ----
const say = (who, face, text, right) => `<div style="display:flex;gap:10px;align-items:flex-start;margin:8px 0;${right ? "flex-direction:row-reverse;text-align:right" : ""}">
  <div style="font-size:2rem;line-height:1">${face}</div><div style="background:${right ? "#fce7f3" : "#dcfce7"};border-radius:14px;padding:8px 14px;max-width:80%"><b>${who}:</b> ${text}</div></div>`;
const HOI_THOAI = `<div style="max-width:820px;margin:0 auto">
  <p style="margin:.2rem 0 .4rem;color:#4a5f66">Hôm nay, các bạn An, Minh và Khoa tiếp tục bàn về cách trình bày báo cáo dự án <b>Trường học xanh</b>.</p>
  ${say("An", "👧", "Chúng ta có thể sao chép dữ liệu về ý tưởng dự án đã có sẵn từ tệp Truonghocxanh.docx, sao chép các kết quả tính toán từ các trang tính trong tệp THXanh.xlsx. Còn hình thức thì nên trình bày sao cho thật ấn tượng.")}
  ${say("Minh", "👦", "Minh hoạ bằng hình ảnh là một lựa chọn tốt. Hình ảnh có tính trực quan và rất thuyết phục.", true)}
  ${say("Khoa", "🧑", "Bài trình bày sẽ hiệu quả hơn nếu sử dụng định dạng văn bản và ảnh minh hoạ một cách hợp lí.")}</div>`;

const LESSON = {
  meta: {
    subject: "Tin học", grade: "7", book: "Kết nối tri thức với cuộc sống",
    title: "Bài 12: Định dạng đối tượng trên trang chiếu", unit: "Chủ đề 4 — Ứng dụng tin học",
    pages: "61–67", durationMinutes: 90,
  },
  objectives: {
    knowledge: [
      "Sao chép được dữ liệu từ tệp văn bản sang trang trình chiếu.",
      "Đưa được hình ảnh minh hoạ vào bài trình chiếu; nêu được vai trò của hình ảnh minh hoạ.",
      "Biết sử dụng các định dạng cho văn bản, ảnh minh hoạ một cách hợp lí; áp dụng mẫu định dạng (theme).",
      "Biết lựa chọn hình ảnh phù hợp, tôn trọng bản quyền khi tạo sản phẩm số.",
    ],
    competencies: [
      "Tự chủ, tự học; giao tiếp và hợp tác (nhóm bàn); giải quyết vấn đề và sáng tạo.",
      "Năng lực số 3.2.TC1a: tinh chỉnh văn bản (phông, cỡ, kiểu, màu, căn lề, giãn dòng), làm nổi bật thông tin; tích hợp, định dạng hình ảnh; áp dụng mẫu định dạng.",
      "Năng lực số 3.3.TC1a: chọn hình ảnh hợp lệ (tự chụp, kho ảnh miễn phí, GV cung cấp), không dùng ảnh có watermark, không rõ nguồn gốc.",
    ],
    qualities: ["Chăm chỉ, trách nhiệm, trung thực, tôn trọng bản quyền."],
  },
  coreKnowledge: [
    "Hình ảnh minh hoạ làm bài trình chiếu trực quan, ấn tượng, hấp dẫn; chọn hình phù hợp nội dung, có tính thẩm mĩ; kích thước, vị trí hợp lí; lưu ý bản quyền.",
    "Định dạng văn bản trong phần mềm trình chiếu tương tự phần mềm soạn thảo; chọn phông, cỡ, kiểu, màu chữ, nền thống nhất, phù hợp để làm nổi bật thông điệp chính.",
    "Phông đơn giản (Arial, Calibri, Tahoma…); tiêu đề cỡ 40–50, chữ đậm; văn bản cỡ từ 18; màu chữ tương phản nền; mỗi trang 5–7 dòng, tập trung một ý chính, nội dung cô đọng.",
    "Sao chép: Copy (Ctrl+C) → Paste (Ctrl+V). Mẫu định dạng: Design → Themes (More, Variants; Ctrl chọn nhiều trang; Ctrl+Z khôi phục).",
    "Chèn ảnh: Insert/Pictures → chọn tệp → Insert. Định dạng ảnh: Format/Arrange/Send Backward (Bring Forward), kéo thả đổi vị trí, kéo nút góc đổi kích thước giữ tỉ lệ, Format/Picture Styles/Picture Border.",
  ],
  keywords: ["Ảnh minh hoạ", "5–7 dòng", "Copy / Paste", "Themes", "Send Backward"],
  settings: { basePoints: 100, useTimer: false, defaultTime: 60, sound: true, streakEnabled: true },

  activities: [
    /* =========================== TIẾT 1 =========================== */
    /* ===================== HĐ1: MỞ ĐẦU (5 phút) ===================== */
    {
      id: "khoi-dong", name: "Mở đầu — Đóng vai An, Minh, Khoa 🎭", type: "knowledge",
      goal: "Tạo hứng thú; nhận ra nhu cầu sao chép dữ liệu, dùng ảnh minh hoạ và định dạng hợp lí.",
      time: 300,
      task: "Ba bạn lên đóng vai An, Minh, Khoa đọc đoạn hội thoại (SGK tr.61). Cả lớp quan sát, nhận xét và trả lời câu hỏi: “Làm thế nào để bài trình chiếu trông đẹp và logic hơn?”",
      sgkImage: "assets/sgk/sgk-trang61.jpg",
      html: HOI_THOAI,
      questions: [
        { question: "Theo bạn An, dữ liệu cho bài trình chiếu có thể sao chép từ những tệp nào?", type: "multiple-choice",
          options: ["Truonghocxanh.docx và THXanh.xlsx", "Chỉ gõ lại từ bàn phím", "Chỉ từ Internet", "Baitaptinhoc7.pptx"],
          answer: 0, explanation: "Ý tưởng dự án có trong tệp văn bản Truonghocxanh.docx, kết quả tính toán có trong tệp bảng tính THXanh.xlsx.", level: "nhan-biet", activity: "khoi-dong" },
        { question: "Vì sao bạn Minh cho rằng minh hoạ bằng hình ảnh là lựa chọn tốt?", type: "multiple-choice",
          options: ["Vì hình ảnh làm tệp nặng hơn", "Vì không cần viết chữ nữa", "Vì hình ảnh có tính trực quan và rất thuyết phục", "Vì phần mềm bắt buộc"],
          answer: 2, explanation: "Hình ảnh có tính trực quan và rất thuyết phục (SGK tr.61).", level: "nhan-biet", activity: "khoi-dong" },
      ],
    },

    /* ===================== HĐ2.1: ẢNH MINH HOẠ (7 phút) ===================== */
    {
      id: "anh-minh-hoa", name: "Ảnh minh hoạ 🖼️", type: "knowledge",
      goal: "Nêu được vai trò của ảnh minh hoạ và cách lựa chọn hình ảnh.",
      time: 420,
      task: "Nhiệm vụ 1 — nhóm 3 phút: thảo luận Hoạt động 1 (SGK tr.61), so sánh hai trang ① và ②. Nhiệm vụ 2 — cá nhân: chọn phát biểu đúng, sai.",
      sgkImage: "assets/sgk/sgk-trang61.jpg",
      html: ANH_SO_SANH,
      content: {
        heading: "🖼️ Ảnh minh hoạ",
        prompt: "Hoạt động 1: 1. Theo em có nên sử dụng hình ảnh để minh hoạ cho bài trình chiếu không? Vì sao? 2. Em sẽ chọn hình ảnh gì để thêm vào bài trình chiếu báo cáo dự án?",
        revealLabel: "💡 Vai trò và cách chọn ảnh minh hoạ (SGK tr.61)",
        blocks: [
          { kind: "list", value: [
            "Hình ảnh là dạng thông tin trực quan và dễ gây ấn tượng nhất. Sử dụng hình ảnh minh hoạ giúp bài trình chiếu hấp dẫn và sinh động, thu hút sự chú ý của người nghe.",
            "Khi lựa chọn hình ảnh nên căn cứ vào hai yếu tố quan trọng: phù hợp với nội dung; có tính thẩm mĩ.",
            "Sẽ ấn tượng hơn nếu các hình ảnh trong trang chiếu có kích thước và vị trí hợp lí, kết hợp với nội dung thành một tổng thể hài hoà.",
            "Nên chọn lọc hình ảnh đưa vào bài và lưu ý đến bản quyền của hình ảnh.",
          ] },
        ],
      },
      questions: [
        { question: "a) Hình ảnh minh hoạ làm cho bài trình chiếu ấn tượng hơn.", type: "true-false", answer: true,
          explanation: "Đúng.", level: "nhan-biet", activity: "anh-minh-hoa" },
        { question: "b) Nên chọn hình ảnh phù hợp với chủ đề của bài trình chiếu.", type: "true-false", answer: true,
          explanation: "Đúng.", level: "nhan-biet", activity: "anh-minh-hoa" },
        { question: "c) Màu sắc, hoạ tiết trên hình ảnh không cần trùng khớp với chủ đề.", type: "true-false", answer: false,
          explanation: "Sai. Hình ảnh cần phù hợp với nội dung, chủ đề của bài trình chiếu.", level: "thong-hieu", activity: "anh-minh-hoa" },
        { question: "d) Hình ảnh minh hoạ cần có tính thẩm mĩ.", type: "true-false", answer: true,
          explanation: "Đúng.", level: "nhan-biet", activity: "anh-minh-hoa" },
        { question: "Hoạt động 1, câu 2: Trang “Kết quả dự kiến” của bài báo cáo dự án Trường học xanh nên chèn hình ảnh nào?", type: "multiple-choice",
          options: ["Ảnh một chiếc siêu xe", "Ảnh hoạt hình không liên quan", "Ảnh món ăn yêu thích", "Ảnh các bạn trồng, chăm sóc cây trong sân trường"],
          answer: 3, explanation: "Hình ảnh phải phù hợp với nội dung trang: dự án Trường học xanh → ảnh cây xanh, các bạn trồng cây, sân trường xanh.", level: "van-dung", activity: "anh-minh-hoa" },
        { question: "Nguồn hình ảnh nào nên dùng để tôn trọng bản quyền?", type: "multiple-choice",
          options: ["Ảnh có watermark (dấu bản quyền) của trang web khác", "Ảnh tự chụp, ảnh thầy cô cung cấp hoặc ảnh ở kho ảnh miễn phí", "Ảnh bất kì tìm được trên mạng, không cần biết nguồn", "Ảnh đã xoá logo bản quyền"],
          answer: 1, explanation: "Nên chọn lọc hình ảnh và lưu ý bản quyền: dùng ảnh tự chụp, ảnh được cung cấp hoặc có giấy phép rõ ràng; không dùng ảnh có watermark, không rõ nguồn.", level: "van-dung", activity: "anh-minh-hoa" },
      ],
      remember: [
        "Hình ảnh thường được dùng để minh hoạ cho nội dung bài trình chiếu, nhờ đó bài trình chiếu trở nên trực quan, ấn tượng và hấp dẫn hơn.",
        "Nên lựa chọn hình ảnh phù hợp với nội dung bài trình chiếu và có tính thẩm mĩ.",
        "Kích thước hình ảnh và vị trí đặt trên trang chiếu cần hợp lí.",
      ],
    },

    /* ===================== HĐ2.2: ĐỊNH DẠNG VĂN BẢN (13 phút) ===================== */
    {
      id: "dinh-dang-van-ban", name: "Định dạng văn bản 🔤", type: "knowledge",
      goal: "Biết cách định dạng văn bản hợp lí trên trang chiếu.",
      time: 480,
      task: "Nhóm 3 phút: thảo luận Hoạt động 2 (SGK tr.62) — quan sát trang chiếu “mắc lỗi” bên dưới, tìm các lỗi trình bày rồi trả lời câu hỏi.",
      sgkImage: "assets/sgk/sgk-trang62.jpg",
      html: `<div style="display:flex;justify-content:center"><div>${S_LOI}${capt("🔎 Trang chiếu này mắc những lỗi gì?", "#db2777")}</div></div>`,
      content: {
        heading: "🔤 Định dạng văn bản",
        prompt: "Hoạt động 2: 1. Sau khi tạo văn bản cho một bài trình chiếu, em thường định dạng văn bản như thế nào? Cần làm gì để nhấn mạnh nội dung trên một trang? 2. Có nên viết nhiều chữ, dùng nhiều màu trên một trang không? Vì sao?",
        revealLabel: "💡 Để bài trình bày hiệu quả, chuyên nghiệp (SGK tr.62)",
        blocks: [
          { kind: "text", value: "Các phần mềm trình chiếu đều có các công cụ định dạng văn bản: phông chữ, cỡ chữ, kiểu chữ, màu chữ, căn lề,… Cách sử dụng tương tự như của phần mềm soạn thảo văn bản mà em đã học ở lớp 6." },
          { kind: "list", value: [
            "Phông chữ: nên chọn phông đơn giản, dễ đọc (ví dụ: Arial, Calibri, Tahoma,…); không nên sử dụng quá nhiều phông chữ trên một trang.",
            "Cỡ chữ: tiêu đề nên dùng cỡ từ 40 đến 50, văn bản nên dùng cỡ từ 18 trở lên, tuỳ phông chữ.",
            "Kiểu chữ: tiêu đề nên chọn kiểu chữ đậm, nội dung chọn kiểu chữ thường.",
            "Màu chữ: cần tương phản với màu nền của trang, không sử dụng quá nhiều màu chữ.",
            "Số lượng chữ trên trang: không dùng quá nhiều chữ trên một trang. Mỗi trang chỉ nên có khoảng 5 đến 7 dòng.",
            "Nội dung trong mỗi trang chiếu chỉ nên tập trung vào một ý chính. Văn bản cần cô đọng, chọn lọc từ ngữ. Thông điệp chính hay những điều quan trọng nên được làm nổi bật và nhấn mạnh bằng cách dùng kiểu chữ đậm, màu,…",
            "Màu nền và định dạng văn bản cần thống nhất. Không nên dùng nhiều màu, nhiều phông chữ trên một trang.",
          ] },
        ],
      },
      questions: [
        { question: "Trang chiếu “mắc lỗi” ở trên có những lỗi nào? (Chọn tất cả đáp án đúng)", type: "multiple-select",
          options: ["Quá nhiều dòng chữ (11 dòng)", "Dùng quá nhiều phông chữ, nhiều màu chữ", "Chữ vàng trên nền trắng, khó đọc", "Có tiêu đề ở trên đầu trang"],
          answer: [0, 1, 2], explanation: "Mỗi trang chỉ nên 5–7 dòng; không dùng nhiều phông, nhiều màu; màu chữ phải tương phản với nền. Có tiêu đề trang là đúng.", level: "van-dung", activity: "dinh-dang-van-ban" },
        { question: "Cỡ chữ phù hợp cho tiêu đề trang chiếu là:", type: "multiple-choice",
          options: ["10 – 12", "18 – 20", "40 – 50", "80 – 100"],
          answer: 2, explanation: "Tiêu đề nên dùng cỡ từ 40 đến 50; văn bản nên dùng cỡ từ 18 trở lên.", level: "nhan-biet", activity: "dinh-dang-van-ban" },
        { question: "Phông chữ nào nên dùng cho trang chiếu?", type: "multiple-choice",
          options: ["Arial, Calibri, Tahoma — đơn giản, dễ đọc", "Nhiều phông trang trí khác nhau trên cùng một trang", "Phông chữ viết tay uốn lượn", "Phông nào lạ nhất"],
          answer: 0, explanation: "Nên chọn phông đơn giản, dễ đọc; không dùng quá nhiều phông chữ trên một trang.", level: "nhan-biet", activity: "dinh-dang-van-ban" },
        { question: "Mỗi trang chiếu chỉ nên có khoảng bao nhiêu dòng?", type: "multiple-choice",
          options: ["1 – 2 dòng", "15 – 20 dòng", "Càng nhiều càng tốt", "5 – 7 dòng"],
          answer: 3, explanation: "Không dùng quá nhiều chữ trên một trang. Mỗi trang chỉ nên có khoảng 5 đến 7 dòng.", level: "nhan-biet", activity: "dinh-dang-van-ban" },
        { question: "Hoạt động 2, câu 1: Muốn nhấn mạnh thông điệp chính trên một trang, em nên:", type: "multiple-choice",
          options: ["Viết thêm thật nhiều chữ", "Làm nổi bật bằng chữ đậm, màu nhấn", "Đổi sang phông khác cho từng từ", "Giảm cỡ chữ xuống 10"],
          answer: 1, explanation: "Thông điệp chính hay những điều quan trọng nên được làm nổi bật và nhấn mạnh bằng cách dùng kiểu chữ đậm, màu,…", level: "thong-hieu", activity: "dinh-dang-van-ban" },
      ],
      remember: [
        "Định dạng văn bản trong phần mềm trình chiếu tương tự như trong phần mềm soạn thảo.",
        "Nên chọn phông chữ, cỡ chữ, kiểu chữ, màu chữ, nền,… thống nhất và phù hợp, để làm nổi bật thông điệp chính của trang.",
        "Nội dung trình bày nên cô đọng. Mỗi trang chiếu chỉ nên tập trung vào một ý chính.",
      ],
    },
    {
      id: "ghep-a-b", name: "Ghép cột A với cột B 🧩", type: "matching",
      goal: "Củng cố các lưu ý khi định dạng văn bản (câu hỏi SGK tr.63).",
      time: 150,
      task: "Ghép mỗi nội dung ở cột A với một nội dung phù hợp ở cột B. Làm hết rồi bấm Nộp bài.",
      sgkImage: "assets/sgk/sgk-trang63.jpg",
      pairs: [
        { left: "1) Định dạng văn bản trong trang chiếu", right: "d) tương tự như định dạng trong soạn thảo văn bản." },
        { left: "2) Định dạng làm nổi bật", right: "a) nội dung chính của trang chiếu." },
        { left: "3) Nội dung trên mỗi trang chiếu", right: "b) cô đọng." },
        { left: "4) Không nên dùng quá nhiều phông chữ", right: "c) cho văn bản trên một trang chiếu." },
      ],
      explanation: "1 – d; 2 – a; 3 – b; 4 – c.",
    },
    {
      id: "nen-khong-nen", name: "Trò chơi: Nên hay Không nên? 👍👎", type: "dragdrop",
      goal: "Phân biệt cách trình bày trang chiếu hợp lí và chưa hợp lí.",
      time: 150,
      task: "Xếp mỗi cách làm vào nhóm Nên hoặc Không nên. Xếp hết rồi bấm Nộp bài.",
      groups: ["👍 Nên", "👎 Không nên"],
      items: [
        { text: "Dùng phông Arial hoặc Calibri dễ đọc", group: 0 },
        { text: "Mỗi trang khoảng 5 đến 7 dòng", group: 0 },
        { text: "Tiêu đề cỡ 40 đến 50, chữ đậm", group: 0 },
        { text: "Chữ màu tối trên nền sáng (tương phản)", group: 0 },
        { text: "Dùng 4 phông chữ khác nhau trên một trang", group: 1 },
        { text: "Dán nguyên đoạn văn dài 15 dòng lên trang", group: 1 },
        { text: "Chữ vàng nhạt trên nền trắng", group: 1 },
        { text: "Chèn ảnh có watermark, không rõ nguồn", group: 1 },
      ],
      explanation: "Nên: phông đơn giản, 5–7 dòng, tiêu đề đậm cỡ lớn, màu tương phản · Không nên: nhiều phông, nhiều chữ, màu khó đọc, ảnh vi phạm bản quyền.",
    },

    /* =========================== TIẾT 2 =========================== */
    /* ===================== HĐ2.3.1: HƯỚNG DẪN THỰC HÀNH (20 phút) ===================== */
    {
      id: "sao-chep", name: "a) Sao chép dữ liệu từ tệp văn bản sang tệp trình chiếu 📋", type: "ordering",
      goal: "Nắm trình tự sao chép dữ liệu từ Truonghocxanh.docx sang Truonghocxanh.pptx.",
      time: 180,
      task: "Nhóm bàn: sắp xếp các bước rồi bấm Nộp bài; sau đó sao chép Mục 1 “Ý tưởng” từ tệp văn bản sang trang chiếu trên máy.",
      sgkImage: "assets/sgk/hinh-12-2.jpg",
      steps: [
        "Mở tệp văn bản Truonghocxanh.docx",
        "Chọn phần dữ liệu cần sao chép, thực hiện lệnh Copy (Ctrl+C)",
        "Mở tệp trình chiếu Truonghocxanh.pptx",
        "Đặt con trỏ tại vị trí cần sao chép đến, thực hiện lệnh Paste (Ctrl+V)",
      ],
      explanation: "Mở tệp văn bản → chọn, Copy → mở tệp trình chiếu → đặt con trỏ, Paste. Thông tin về dự án thống nhất, chính xác và tiết kiệm thời gian soạn thảo.",
    },
    {
      id: "dinh-dang-bien-tap", name: "b) Định dạng, biên tập văn bản — c) Áp dụng mẫu định dạng 🎨", type: "knowledge",
      goal: "Dùng công cụ định dạng trên thẻ Home, biên tập nội dung cô đọng; áp dụng mẫu định dạng (theme).",
      time: 480,
      task: "Nhóm bàn: so sánh trang vừa dán (Hình 12.3) với trang đã biên tập (Hình 12.5); trên máy, định dạng, biên tập trang Ý tưởng rồi chọn mẫu định dạng trong thẻ Design.",
      sgkImage: "assets/sgk/hinh-12-4.jpg",
      html: H123_125,
      content: {
        heading: "🎨 Định dạng, biên tập văn bản và mẫu định dạng",
        revealLabel: "📖 Hướng dẫn (SGK tr.63–65)",
        blocks: [
          { kind: "image", value: "assets/sgk/hinh-12-1.jpg", caption: "Hình 12.1. Lệnh Copy và Paste trong thẻ Home" },
          { kind: "text", value: "b) Các công cụ định dạng văn bản nằm trong thẻ Home: nhóm Font — thay đổi phông, cỡ, kiểu, màu sắc cho chữ; nhóm Paragraph — căn lề, giãn dòng. Sử dụng các công cụ định dạng văn bản, thêm kí hiệu đầu dòng,… đồng thời biên tập lại nội dung, chọn lọc từ ngữ, làm nổi bật ý chính,… để nội dung ngắn gọn, cô đọng." },
          { kind: "image", value: "assets/sgk/hinh-12-4.jpg", caption: "Hình 12.4. Các lệnh định dạng văn bản trên thẻ Home" },
          { kind: "text", value: "c) Phần mềm trình chiếu cung cấp nhiều mẫu định dạng (theme) đã được thiết kế sẵn, hiển thị trực quan trong nhóm Themes của thẻ Design. Di chuyển con trỏ chuột trên một mẫu: tên mẫu xuất hiện và kết quả áp dụng được thể hiện ngay trên màn hình. Các bước: 1. chọn các trang cần áp dụng mẫu · 2. nháy chuột chọn Design · 3. nháy chuột vào mẫu muốn áp dụng." },
          { kind: "image", value: "assets/sgk/hinh-12-6.jpg", caption: "Hình 12.6. Cách áp dụng mẫu định dạng" },
          { kind: "list", value: [
            "Nhấn giữ phím Ctrl để chọn đồng thời nhiều trang.",
            "Nếu không chọn trang thì mẫu sẽ được áp dụng cho tất cả các trang trong bài.",
            "Nháy chuột vào nút More trong nhóm Themes để xem thêm mẫu định dạng.",
            "Nháy chuột vào nút More trong nhóm Variants để thay đổi màu sắc, phông chữ, hiệu ứng, nền cho mẫu đã chọn.",
            "Nháy chuột vào nút Undo (hoặc nhấn Ctrl+Z) để khôi phục lại mẫu trước đó.",
          ] },
        ],
      },
      questions: [
        { question: "Từ Hình 12.3 sang Hình 12.5, bạn đã biên tập trang chiếu như thế nào?", type: "multiple-choice",
          options: ["Xoá hết nội dung, chỉ giữ tiêu đề", "Tách đoạn văn dài thành các ý ngắn có kí hiệu đầu dòng, chọn lọc từ ngữ, làm nổi bật tiêu đề phụ bằng màu", "Chỉ đổi phông chữ", "Thêm nhiều đoạn văn cho đầy trang"],
          answer: 1, explanation: "Biên tập lại nội dung, chọn lọc từ ngữ, thêm kí hiệu đầu dòng, làm nổi bật ý chính… để nội dung ngắn gọn, cô đọng.", level: "thong-hieu", activity: "dinh-dang-bien-tap" },
        { question: "Muốn căn giữa hoặc giãn dòng cho đoạn văn trên trang chiếu, em dùng nhóm lệnh nào trên thẻ Home?", type: "multiple-choice", sgkImage: "assets/sgk/hinh-12-4.jpg",
          options: ["Font", "Clipboard", "Paragraph", "Slides"],
          answer: 2, explanation: "Nhóm Font: phông, cỡ, kiểu, màu chữ · Nhóm Paragraph: căn lề, giãn dòng.", level: "nhan-biet", activity: "dinh-dang-bien-tap" },
        { question: "Các mẫu định dạng (theme) nằm ở nhóm Themes của thẻ nào?", type: "multiple-choice",
          options: ["Design", "Home", "Insert", "Slide Show"],
          answer: 0, explanation: "Các mẫu định dạng được hiển thị trực quan trong nhóm Themes của thẻ Design.", level: "nhan-biet", activity: "dinh-dang-bien-tap" },
        { question: "Em muốn áp dụng một mẫu cho trang 3 và trang 4 (không phải cả bài). Em làm thế nào?", type: "multiple-choice", sgkImage: "assets/sgk/hinh-12-6.jpg",
          options: ["Không chọn trang nào rồi nháy vào mẫu", "Chọn trang 3, nhấn Delete", "Nháy vào nút Undo", "Nhấn giữ Ctrl, chọn trang 3 và trang 4, rồi nháy vào mẫu trong thẻ Design"],
          answer: 3, explanation: "Nhấn giữ Ctrl để chọn đồng thời nhiều trang. Nếu không chọn trang thì mẫu được áp dụng cho tất cả các trang.", level: "van-dung", activity: "dinh-dang-bien-tap" },
        { question: "Lỡ chọn một mẫu không đẹp, muốn khôi phục lại mẫu trước đó, em nhấn:", type: "multiple-choice",
          options: ["Ctrl+C", "Ctrl+Z (Undo)", "Ctrl+V", "Ctrl+S"],
          answer: 1, explanation: "Nháy nút Undo (hoặc Ctrl+Z) để khôi phục lại mẫu trước đó.", level: "thong-hieu", activity: "dinh-dang-bien-tap" },
      ],
    },

    {
      id: "hinh-anh", name: "d) Chèn hình ảnh — e) Định dạng hình ảnh 🌄", type: "knowledge",
      goal: "Chèn hình ảnh vào trang chiếu; thay đổi lớp, vị trí, kích thước, thêm đường viền.",
      time: 480,
      task: "Nhóm bàn: nhắc lại thao tác chèn ảnh vào tệp văn bản; chèn một ảnh vào trang tiêu đề, đưa ảnh xuống dưới văn bản, chỉnh vị trí, kích thước, thêm viền (Hình 12.7 → 12.10); trả lời câu hỏi.",
      sgkImage: "assets/sgk/hinh-12-9.jpg",
      links: SLIDE_TOOLS,
      html: H127_128,
      content: {
        heading: "🌄 Chèn và định dạng hình ảnh",
        revealLabel: "📖 Hướng dẫn (SGK tr.65–67)",
        blocks: [
          { kind: "text", value: "d) Chèn hình ảnh vào trang chiếu (tương tự chèn hình ảnh vào tệp văn bản): Bước 1. Chọn trang chiếu cần chèn hình ảnh · Bước 2. Chọn Insert/Pictures để mở hộp thoại Insert Picture · Bước 3. Chọn tệp ảnh, nháy chuột chọn nút Insert. Lưu ý: có thể chèn hình ảnh bằng lệnh Copy và Paste." },
          { kind: "text", value: "e) Sau khi chèn, em có thể: thay đổi vị trí và kích thước, thêm đường viền tạo khung, thay đổi lớp, cắt hình, quay hình,…" },
          { kind: "list", value: [
            "Thay đổi lớp: chọn hình ảnh → Format/Arrange/Send Backward (muốn đưa hình ảnh lên lại lớp trên thì chọn Bring Forward).",
            "Thay đổi vị trí: dùng chuột chọn hình ảnh, kéo thả đến vị trí mới.",
            "Thay đổi kích thước: kéo thả nút ở cạnh trên/dưới (chiều dọc), cạnh trái/phải (chiều ngang), nút ở góc theo đường chéo (giữ nguyên tỉ lệ).",
            "Thêm đường viền: chọn hình ảnh → Format/Picture Styles/Picture Border rồi chọn màu, kiểu đường viền.",
            "Có thể đặt nền màu xanh cho trang chiếu, đổi màu cho văn bản để được kết quả như Hình 12.10.",
          ] },
          { kind: "image", value: "assets/sgk/hinh-12-9.jpg", caption: "Hình 12.9. Cách thay đổi kích thước hình ảnh" },
          { kind: "image", value: "assets/sgk/hinh-12-10.jpg", caption: "Hình 12.10. Trang chiếu kết quả" },
        ],
      },
      questions: [
        { question: "Lệnh để mở hộp thoại chèn ảnh từ tệp trên máy tính là:", type: "multiple-choice",
          options: ["Home/Paste", "Design/Themes", "Insert/Pictures", "Format/Picture Border"],
          answer: 2, explanation: "Chọn Insert/Pictures để mở hộp thoại Insert Picture, chọn tệp ảnh rồi nháy Insert.", level: "nhan-biet", activity: "hinh-anh" },
        { question: "Ảnh đang che mất tiêu đề (Hình 12.7). Muốn ảnh nằm bên dưới văn bản, em chọn:", type: "multiple-choice", sgkImage: "assets/sgk/hinh-12-7-8.jpg",
          options: ["Format/Arrange/Send Backward", "Format/Arrange/Bring Forward", "Insert/Pictures", "Design/Variants"],
          answer: 0, explanation: "Send Backward đưa hình ảnh xuống lớp dưới, không che văn bản (Hình 12.8). Bring Forward đưa lên lớp trên.", level: "thong-hieu", activity: "hinh-anh" },
        { question: "Muốn phóng to ảnh mà không làm méo hình, em kéo thả nút nào?", type: "multiple-choice", sgkImage: "assets/sgk/hinh-12-9.jpg",
          options: ["Nút ở giữa cạnh trên", "Nút ở giữa cạnh trái", "Nút ở giữa cạnh phải", "Nút ở góc ảnh, theo đường chéo"],
          answer: 3, explanation: "Kéo thả nút ở góc theo đường chéo để thay đổi kích thước giữ nguyên tỉ lệ. Kéo nút ở cạnh chỉ đổi một chiều nên dễ làm méo hình.", level: "van-dung", activity: "hinh-anh" },
        { question: "Để thêm khung viền trắng quanh ảnh như Hình 12.10, em dùng:", type: "multiple-choice", sgkImage: "assets/sgk/hinh-12-10.jpg",
          options: ["Home/Font", "Format/Picture Styles/Picture Border", "Insert/Pictures", "Design/Themes"],
          answer: 1, explanation: "Chọn hình ảnh → Format/Picture Styles/Picture Border, chọn màu, kiểu đường viền.", level: "nhan-biet", activity: "hinh-anh" },
        { question: "Có thể chèn hình ảnh vào trang chiếu bằng cách sử dụng lệnh Copy và Paste.", type: "true-false", answer: true,
          explanation: "Đúng (lưu ý SGK tr.65).", level: "nhan-biet", activity: "hinh-anh" },
      ],
    },
    {
      id: "ghep-lenh", name: "Trò chơi: Lệnh nào làm việc gì? 🧩", type: "matching",
      goal: "Ghi nhớ các lệnh dùng trong thực hành.",
      time: 150,
      task: "Ghép mỗi lệnh (phím) với tác dụng của nó. Làm hết rồi bấm Nộp bài.",
      pairs: [
        { left: "Copy (Ctrl+C)", right: "Sao chép phần dữ liệu đã chọn" },
        { left: "Paste (Ctrl+V)", right: "Dán dữ liệu vào vị trí con trỏ" },
        { left: "Design → Themes", right: "Áp dụng mẫu định dạng cho trang chiếu" },
        { left: "Insert/Pictures", right: "Chèn hình ảnh từ tệp" },
        { left: "Send Backward", right: "Đưa hình ảnh xuống dưới văn bản" },
        { left: "Picture Border", right: "Thêm đường viền cho hình ảnh" },
        { left: "Undo (Ctrl+Z)", right: "Khôi phục lại thao tác trước đó" },
      ],
      explanation: "Copy/Paste: sao chép · Themes: mẫu định dạng · Insert/Pictures: chèn ảnh · Send Backward: đổi lớp · Picture Border: viền · Undo: khôi phục.",
    },

    /* ===================== HĐ2.3.2: THỰC HÀNH (22 phút) ===================== */
    {
      id: "thuc-hanh", name: "Thực hành: Hoàn thiện bài trình chiếu Trường học xanh 🌳", type: "checklist",
      goal: "Sao chép dữ liệu, áp dụng mẫu định dạng, định dạng văn bản, chèn và định dạng hình ảnh cho Truonghocxanh.pptx.",
      time: 1320,
      task: "Thực hành trên máy (22 phút): mở Truonghocxanh.docx, sao chép nội dung vào các trang tương ứng của Truonghocxanh.pptx; áp dụng mẫu định dạng, định dạng văn bản; chèn và định dạng hình ảnh. Làm xong, tick từng việc rồi gửi cho thầy/cô.",
      sgkImage: "assets/sgk/hinh-12-10.jpg",
      links: SLIDE_TOOLS,
      columns: ["✅ Đã làm", "⏳ Chưa làm"],
      sections: [
        { title: "📋 SAO CHÉP VÀ BIÊN TẬP", items: [
          "Sao chép nội dung từ Truonghocxanh.docx vào các trang tương ứng",
          "Biên tập nội dung ngắn gọn, mỗi trang khoảng 5 đến 7 dòng",
        ] },
        { title: "🎨 ĐỊNH DẠNG VĂN BẢN VÀ MẪU", items: [
          "Chọn phông dễ đọc, tiêu đề chữ đậm cỡ lớn",
          "Màu chữ tương phản với nền, làm nổi bật ý chính",
          "Áp dụng mẫu định dạng (theme) phù hợp",
        ] },
        { title: "🌄 HÌNH ẢNH", items: [
          "Chèn hình ảnh phù hợp nội dung, rõ nguồn",
          "Ảnh không che văn bản (Send Backward nếu cần)",
          "Kích thước, vị trí hợp lí, có đường viền",
          "Lưu lại tệp Truonghocxanh.pptx",
        ] },
      ],
      note: "Nhóm em gặp khó khăn ở bước nào? Em đã khắc phục như thế nào?",
      modelAnswer: [
        "Sản phẩm đạt: nội dung biên tập ngắn gọn, súc tích; mẫu định dạng phù hợp; hình ảnh minh hoạ phù hợp, được định dạng; văn bản được định dạng thống nhất.",
        "Khó khăn thường gặp: dán cả đoạn văn dài không biên tập; ảnh che chữ; kéo nút cạnh làm méo ảnh; dùng ảnh có watermark.",
      ],
    },

    /* ===================== HĐ3: LUYỆN TẬP (10 phút) ===================== */
    {
      id: "luyen-tap", name: "Luyện tập 📝", type: "knowledge",
      goal: "Bổ sung ảnh vào trang Ý tưởng; đưa kết quả tính toán vào bài trình chiếu; định dạng, chọn mẫu cho các trang.",
      time: 600,
      task: "Nhóm làm trên máy 3 bài Luyện tập (SGK tr.67), rồi trả lời các câu hỏi.",
      sgkImage: "assets/sgk/sgk-trang67.jpg",
      content: {
        heading: "📝 Luyện tập (SGK tr.67)",
        revealLabel: "📋 Ba bài luyện tập trên máy",
        blocks: [
          { kind: "list", value: [
            "1. Bổ sung thêm một hình ảnh vào trang trình bày ý tưởng (Hình 12.5) rồi định dạng hình ảnh đó sao cho hợp lí.",
            "2. Bổ sung kết quả tính toán của dự án Trường học xanh đã làm trong phần mềm bảng tính vào bài trình chiếu (có thể ở trang Dự kiến kết quả).",
            "3. Định dạng văn bản, biên tập nội dung cho các trang chiếu của tệp Truonghocxanh.pptx. Chọn mẫu định dạng phù hợp cho các trang chiếu.",
          ] },
          { kind: "text", value: "Gợi ý kết quả tính toán (THXanh.xlsx, Bài 10): tổng số cây 623 (cây hoa 287, cây ăn quả 189, cây bóng mát 147); tổng chi phí 30,692,200 đồng." },
        ],
      },
      questions: [
        { question: "Luyện tập 1: Thêm ảnh cây xanh vào trang Ý tưởng (Hình 12.5). Cách đặt ảnh nào hợp lí nhất?", type: "multiple-choice",
          options: ["Ảnh to phủ kín cả trang, che các dòng chữ", "Ảnh rất nhỏ ở góc, không nhìn rõ", "Ảnh vừa phải, đặt cạnh các ý, không che chữ, có viền", "Chèn 5 ảnh khác nhau chồng lên nhau"],
          answer: 2, explanation: "Kích thước và vị trí hình ảnh cần hợp lí, kết hợp với nội dung thành một tổng thể hài hoà.", level: "van-dung", activity: "luyen-tap" },
        { question: "Luyện tập 2: Cách nhanh và chính xác nhất để đưa kết quả tính toán từ THXanh.xlsx vào trang Dự kiến kết quả là:", type: "multiple-choice",
          options: ["Chọn vùng dữ liệu trong bảng tính, Copy rồi Paste vào trang chiếu", "Gõ lại từng số từ bàn phím", "Chụp màn hình bằng điện thoại", "Đọc to cho bạn ghi"],
          answer: 0, explanation: "Sao chép dữ liệu giúp thông tin thống nhất, chính xác và tiết kiệm thời gian (như sao chép từ tệp văn bản).", level: "van-dung", activity: "luyen-tap" },
        { question: "Trên trang Dự kiến kết quả, con số nào nên được làm nổi bật (chữ đậm, màu nhấn) để người nghe dễ nhớ?", type: "multiple-choice",
          options: ["Số thứ tự của từng loại cây", "Đơn giá của từng cây", "Số trang chiếu", "Tổng số cây (623) và tổng chi phí (30,692,200 đồng)"],
          answer: 3, explanation: "Thông điệp chính hay những điều quan trọng nên được làm nổi bật bằng chữ đậm, màu,…", level: "van-dung-cao", activity: "luyen-tap" },
        { question: "Luyện tập 3: Để các trang chiếu có màu nền, phông chữ thống nhất nhanh chóng, em nên:", type: "multiple-choice",
          options: ["Tô màu từng trang một bằng tay, mỗi trang một màu", "Áp dụng một mẫu định dạng (theme) cho các trang", "Dùng nhiều phông chữ cho sinh động", "Không định dạng gì"],
          answer: 1, explanation: "Mẫu định dạng giúp tạo bài trình chiếu hấp dẫn, chuyên nghiệp, thống nhất, tiết kiệm thời gian.", level: "thong-hieu", activity: "luyen-tap" },
      ],
    },
    {
      id: "tro-choi", name: "Trò chơi: Vườn ảnh Trường học xanh 🌻", type: "penguin",
      pet: "🌼", homeIcon: "🖼️", enemy: "🐛", saveWord: "bông hoa vào khung ảnh",
      winText: "Khung ảnh rực rỡ sắc hoa — trang chiếu của em thật ấn tượng!",
      goal: "Củng cố toàn bài: ảnh minh hoạ, định dạng văn bản, mẫu định dạng, định dạng hình ảnh.",
      time: 240,
      task: "Trả lời đúng mỗi câu để một bông hoa 🌼 vào khung ảnh trước khi sâu 🐛 bò tới!",
      intro: "Mỗi câu đúng: một bông hoa 🌼 vào khung ảnh 🖼️. Sai thì sâu 🐛 bò tới!",
      questions: [
        { question: "Hai yếu tố quan trọng khi chọn hình ảnh minh hoạ là:", type: "multiple-choice",
          options: ["Phù hợp với nội dung và có tính thẩm mĩ", "Ảnh càng to càng tốt", "Ảnh càng nhiều màu càng tốt", "Ảnh lạ, không liên quan"],
          answer: 0, explanation: "Khi lựa chọn hình ảnh nên căn cứ vào: phù hợp với nội dung; có tính thẩm mĩ.", level: "nhan-biet", activity: "tro-choi" },
        { question: "Văn bản trên trang chiếu nên dùng cỡ chữ:", type: "multiple-choice",
          options: ["Từ 8 trở xuống", "Từ 18 trở lên", "Đúng bằng 12", "Từ 100 trở lên"],
          answer: 1, explanation: "Văn bản nên dùng cỡ từ 18 trở lên, tuỳ phông chữ.", level: "nhan-biet", activity: "tro-choi" },
        { question: "Tổ hợp phím của lệnh Paste là:", type: "multiple-choice",
          options: ["Ctrl+C", "Ctrl+Z", "Ctrl+V", "Ctrl+P"],
          answer: 2, explanation: "Copy: Ctrl+C · Paste: Ctrl+V · Undo: Ctrl+Z.", level: "nhan-biet", activity: "tro-choi" },
        { question: "Nếu KHÔNG chọn trang nào rồi nháy vào một mẫu trong Themes thì:", type: "multiple-choice",
          options: ["Không có gì thay đổi", "Chỉ trang đầu thay đổi", "Bài bị xoá", "Mẫu được áp dụng cho tất cả các trang"],
          answer: 3, explanation: "Nếu không chọn trang thì mẫu sẽ được áp dụng cho tất cả các trang trong bài.", level: "thong-hieu", activity: "tro-choi" },
        { question: "Nhóm Variants trong thẻ Design dùng để:", type: "multiple-choice",
          options: ["Chèn hình ảnh", "Thay đổi màu sắc, phông chữ, hiệu ứng, nền cho mẫu đã chọn", "Sao chép trang", "In bài trình chiếu"],
          answer: 1, explanation: "Nháy nút More trong nhóm Variants để thay đổi màu sắc, phông chữ, hiệu ứng, nền cho mẫu đã chọn.", level: "thong-hieu", activity: "tro-choi" },
        { question: "Đã Send Backward nhưng muốn đưa ảnh lên lại lớp trên, em chọn:", type: "multiple-choice",
          options: ["Bring Forward", "Picture Border", "Insert/Pictures", "Paste"],
          answer: 0, explanation: "Muốn đưa hình ảnh lên lại lớp trên thì chọn Bring Forward.", level: "thong-hieu", activity: "tro-choi" },
        { question: "Bạn Lan dán nguyên đoạn văn 12 dòng lên một trang chiếu. Em góp ý thế nào?", type: "multiple-choice",
          options: ["Giảm cỡ chữ xuống 10 cho vừa trang", "Đổi mỗi dòng một màu", "Biên tập lại thành vài ý ngắn gọn (5–7 dòng), làm nổi bật ý chính", "Thêm 12 dòng nữa"],
          answer: 2, explanation: "Nội dung cần cô đọng, chọn lọc từ ngữ; mỗi trang chỉ nên có khoảng 5 đến 7 dòng, tập trung vào một ý chính.", level: "van-dung-cao", activity: "tro-choi" },
        { question: "Kéo nút ở giữa cạnh trái của ảnh sang trái sẽ:", type: "multiple-choice",
          options: ["Thay đổi kích thước chiều dọc", "Thay đổi kích thước chiều ngang của ảnh", "Xoay ảnh", "Xoá ảnh"],
          answer: 1, explanation: "Kéo nút ở cạnh trái/phải để thay đổi kích thước chiều ngang (Hình 12.9).", level: "van-dung", activity: "tro-choi" },
      ],
    },

    /* ===================== HĐ4: VẬN DỤNG (10 phút) ===================== */
    {
      id: "van-dung", name: "Vận dụng — Hoàn thiện Baitaptinhoc7.pptx 💡", type: "vandung",
      goal: "Bổ sung nội dung, tạo cấu trúc phân cấp, chèn hình ảnh, chọn mẫu và định dạng cho bài trình chiếu dự án của em.",
      time: 600,
      task: "Vận dụng (SGK tr.67): mở tệp Baitaptinhoc7.pptx đã tạo ở Bài 11, bổ sung thông tin (sao chép từ tệp văn bản hoặc nhập mới từ bàn phím); tạo cấu trúc phân cấp, chèn hình ảnh, chọn mẫu định dạng, định dạng văn bản, hình ảnh. Gửi thầy/cô câu trả lời.",
      intro: "Gửi câu trả lời cho thầy/cô.",
      sgkImage: "assets/sgk/sgk-trang67.jpg",
      cases: [
        { question: "Em đã bổ sung những nội dung nào vào bài trình chiếu? Nội dung lấy từ đâu (sao chép từ tệp văn bản hay nhập mới)?",
          answer: "Ví dụ: bổ sung trang Mục tiêu, Cách làm, Tác dụng của dự án; phần mô tả dự án sao chép từ tệp văn bản đã soạn rồi biên tập ngắn gọn, phần kết luận nhập mới từ bàn phím." },
        { question: "Em chọn mẫu định dạng và hình ảnh nào? Hình ảnh lấy từ nguồn nào, em đã định dạng hình ảnh ra sao?",
          answer: "Ví dụ: chọn mẫu màu xanh lá hợp chủ đề môi trường; ảnh tự chụp góc thư viện hoặc ảnh do thầy cô cung cấp (rõ nguồn, không có watermark); đưa ảnh xuống dưới văn bản, kéo nút góc để chỉnh kích thước giữ tỉ lệ, thêm viền trắng." },
      ],
    },

    /* ===================== TỔNG KẾT ===================== */
    {
      id: "tong-ket", name: "Tổng kết", type: "summary",
      task: "Cả lớp nhắc lại kiến thức trọng tâm và làm thử thách cuối. Dặn dò: hoàn thiện Truonghocxanh.pptx và Baitaptinhoc7.pptx.",
      content: {
        learned: [
          "Ảnh minh hoạ: trực quan, ấn tượng; chọn ảnh phù hợp nội dung, có thẩm mĩ, rõ bản quyền; kích thước, vị trí hợp lí.",
          "Định dạng văn bản như trong soạn thảo; phông dễ đọc, tiêu đề 40–50 chữ đậm, văn bản từ 18, màu tương phản nền, 5–7 dòng/trang, một ý chính.",
          "Copy (Ctrl+C) – Paste (Ctrl+V); mẫu định dạng: Design → Themes, Variants; Undo (Ctrl+Z).",
          "Insert/Pictures; Send Backward / Bring Forward; kéo nút góc giữ tỉ lệ; Picture Border.",
        ],
        challenge: [
          { question: "Sau khi chèn ảnh vào trang tiêu đề, ảnh che mất chữ “TRƯỜNG HỌC XANH” và bị méo. Cách sửa đúng là:", type: "multiple-choice",
            options: ["Xoá ảnh, không dùng ảnh nữa", "Send Backward để ảnh xuống dưới chữ; kéo nút góc để chỉnh kích thước giữ tỉ lệ", "Bring Forward để ảnh lên trên cùng", "Kéo nút cạnh trên xuống thật thấp"],
            answer: 1, explanation: "Send Backward đưa ảnh xuống dưới văn bản; kéo nút góc theo đường chéo để thay đổi kích thước giữ nguyên tỉ lệ.",
            level: "van-dung-cao", activity: "tong-ket" },
          { question: "Vì sao nên sao chép ý tưởng dự án từ Truonghocxanh.docx thay vì gõ lại?", type: "multiple-choice",
            options: ["Vì phần mềm trình chiếu không gõ được chữ", "Vì sao chép làm tệp đẹp hơn", "Vì thông tin thống nhất, chính xác và tiết kiệm thời gian soạn thảo", "Vì bắt buộc phải có tệp văn bản"],
            answer: 2, explanation: "Sử dụng nội dung đã lưu trong tệp văn bản giúp thông tin về dự án thống nhất, chính xác và tiết kiệm được thời gian soạn thảo.",
            level: "thong-hieu", activity: "tong-ket" },
        ],
      },
    },
  ],
};

if (typeof module !== "undefined" && module.exports) module.exports = LESSON;
if (typeof window !== "undefined") window.LESSON = LESSON;
