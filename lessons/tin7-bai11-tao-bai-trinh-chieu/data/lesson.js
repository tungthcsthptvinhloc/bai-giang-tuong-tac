/* ============================================================================
 * BÀI 11 — TẠO BÀI TRÌNH CHIẾU  (Tin học 7 — Kết nối tri thức)
 * Chủ đề 4: Ứng dụng tin học (dự án Trường học xanh).
 * Bám sát SGK trang 55–60 + Kế hoạch bài dạy (2 tiết) của giáo viên.
 * Chỉ sửa file này để đổi nội dung. Engine app.js không cần sửa.
 * Thao tác tạo trang chiếu, phân cấp, kí hiệu đầu dòng: HS làm trên PowerPoint thật — app không mô phỏng.
 * ==========================================================================*/

// ---- Nút mở phần mềm trình chiếu trực tuyến (mở tab mới) ----
const SLIDE_TOOLS = [
  { label: "PowerPoint trên web", url: "https://www.office.com/launch/powerpoint" },
  { label: "Google Trang trình bày (Slides)", url: "https://docs.google.com/presentation/" },
  { label: "Canva — bài thuyết trình", url: "https://www.canva.com/", note: "(mở tab mới, cần Internet và tài khoản)" },
];

// ---- Trang chiếu vẽ bằng HTML ----
const slideBox = (inner, w) => `<div style="width:${w || 360}px;max-width:100%;min-height:${Math.round((w || 360) * 9 / 16)}px;background:#fff;border:1px solid #cbd5e1;box-shadow:0 4px 14px rgba(0,0,0,.14);border-radius:6px;padding:14px 18px;box-sizing:border-box;font-family:Calibri,'Segoe UI',Arial,sans-serif;color:#1f2937;overflow:hidden">${inner}</div>`;
const capt = (t) => `<div style="margin-top:6px;font-weight:700;color:#0369a1;text-align:center">${t}</div>`;
const TITLE_SLIDE = slideBox(`<div style="height:100%;display:flex;flex-direction:column;justify-content:center;padding-left:18%">
  <div style="font-size:1rem;letter-spacing:.05em">DỰ ÁN</div><div style="font-size:1.6rem;font-weight:900">TRƯỜNG HỌC XANH</div>
  <div style="font-size:.85rem;margin-top:10px;line-height:1.35">Chi đội 7A<br>Trường THCS …<br>Ngày …</div></div>`);
const FLAT = ["Ý tưởng", "Vai trò của cây xanh", "Đề xuất dự án", "Kế hoạch", "Khảo sát", "Thực hiện", "Phân công", "Thời gian", "Kết quả dự kiến", "Kết luận"];
const LV = [1, 2, 2, 1, 2, 2, 3, 3, 2, 1];
const outline = (levels, marks) => FLAT.map((t, i) => {
  const l = levels ? levels[i] : 1, m = marks ? marks[l - 1] : { s: "•", c: "#1f2937" };
  return `<div style="padding-left:${(l - 1) * 20}px;font-size:${[1, .84, .72][l - 1]}rem;line-height:1.3"><span style="color:${m.c};margin-right:5px">${m.s}</span>${t}</div>`;
}).join("");
const CONTENT_SLIDE = (levels, marks, w) => slideBox(`<div style="text-align:center;font-size:1.35rem;margin-bottom:4px">Nội dung trình bày</div>${outline(levels, marks)}`, w);
const MARKS_119 = [{ s: "■", c: "#dc2626" }, { s: "➢", c: "#ea580c" }, { s: "✓", c: "#1f2937" }];
const H117_118 = `<div style="display:flex;flex-wrap:wrap;gap:24px;justify-content:center">
  <div>${CONTENT_SLIDE(null)}${capt("Hình 11.7. Khi chưa phân cấp")}</div>
  <div>${CONTENT_SLIDE(LV)}${capt("Hình 11.8. Sau khi phân cấp")}</div></div>`;
const H113_114 = `<div style="display:flex;flex-wrap:wrap;gap:24px;justify-content:center">
  <div>${TITLE_SLIDE}${capt("Trang tiêu đề (Title Slide)")}</div>
  <div>${CONTENT_SLIDE(null)}${capt("Trang nội dung (Title and Content)")}</div></div>`;
const H119 = `<div style="display:flex;justify-content:center"><div>${CONTENT_SLIDE(LV, MARKS_119, 420)}${capt("Hình 11.9. Sau khi đổi hình dạng, màu sắc kí hiệu đầu dòng")}</div></div>`;

// ---- Hoạt động 3: hai cách trình bày ----
const col = (title, rows) => `<div style="flex:1 1 280px;background:#fff;border:2px solid #0369a1;border-radius:14px;padding:12px 18px">
  <div style="text-align:center;font-weight:800;font-size:1.2rem;color:#0369a1;margin-bottom:6px">${title}</div>
  ${rows.map(([t, l]) => `<div style="padding-left:${l * 22}px;line-height:1.45">${t}</div>`).join("")}</div>`;
const HAI_CACH = `<div style="display:flex;flex-wrap:wrap;gap:18px">
  ${col("Cách 1", [["Dự án Trường học xanh", 0], ...["Ý tưởng", "Vai trò của cây xanh", "Đề xuất dự án", "Kế hoạch", "Khảo sát thực tế", "Thực hiện", "Phân công trồng và chăm sóc cây", "Thời gian", "Kết quả dự kiến", "Kết luận"].map((t) => ["- " + t, 0])])}
  ${col("Cách 2", [["Dự án Trường học xanh", 0], ["1. Ý tưởng", 0], ["- Vai trò của cây xanh", 1], ["- Đề xuất dự án", 1], ["2. Kế hoạch", 0], ["2.1. Khảo sát thực tế", 0.5], ["2.2. Thực hiện", 0.5], ["- Phân công trồng và chăm sóc cây", 1], ["- Thời gian", 1], ["2.3. Kết quả dự kiến", 0.5], ["3. Kết luận", 0]])}</div>`;

// ---- Hội thoại mở đầu (SGK tr.55) ----
const say = (who, face, text, right) => `<div style="display:flex;gap:10px;align-items:flex-start;margin:8px 0;${right ? "flex-direction:row-reverse;text-align:right" : ""}">
  <div style="font-size:2rem;line-height:1">${face}</div><div style="background:${right ? "#fce7f3" : "#e0f2fe"};border-radius:14px;padding:8px 14px;max-width:80%"><b>${who}:</b> ${text}</div></div>`;
const HOI_THOAI = `<div style="max-width:820px;margin:0 auto">
  <p style="margin:.2rem 0 .4rem;color:#4a5f66">Giờ ra chơi, các bạn An, Minh và Khoa trao đổi về dự án <b>Trường học xanh</b> mà các bạn đang thực hiện.</p>
  ${say("An", "👧", "Việc khảo sát, thu thập thông tin và tính toán cho dự án đã xong. Bây giờ nhóm mình cần làm một bài báo cáo kết quả.")}
  ${say("Minh", "👦", "Nhóm mình nên sử dụng phần mềm trình chiếu để tạo bài báo cáo.", true)}
  ${say("Khoa", "🧑", "Bài trình chiếu báo cáo cần có trang tiêu đề, mỗi trang nội dung nên có tiêu đề trang để giúp người nghe nhanh chóng hiểu được chủ đề và nội dung trình bày.")}
  ${say("Minh", "👦", "Sử dụng cấu trúc phân cấp sẽ làm cho bố cục của bài báo cáo được mạch lạc, rõ ràng.", true)}
  ${say("An", "👧", "Hay quá! Chúng ta phân công nhau làm từng phần việc nhé.")}</div>`;

// ---- Hai chức năng cơ bản ----
const HAI_CHUC_NANG = `<div style="display:flex;flex-wrap:wrap;gap:16px;justify-content:center;align-items:center;text-align:center">
  <div style="background:#e0f2fe;border:3px solid #0369a1;border-radius:18px;padding:14px 20px;min-width:220px"><div style="font-size:2.4rem">📝</div><b>Tạo bài trình chiếu</b><div style="color:#4a5f66">soạn thảo, chỉnh sửa, định dạng · lưu thành tệp · nhiều trang chiếu (slide)</div></div>
  <div style="font-size:2rem;color:#f43f5e">➜</div>
  <div style="background:#fce7f3;border:3px solid #f43f5e;border-radius:18px;padding:14px 20px;min-width:220px"><div style="font-size:2.4rem">📽️</div><b>Trình chiếu</b><div style="color:#4a5f66">lên màn hình hoặc màn chiếu rộng bằng máy chiếu</div></div></div>`;

const LESSON = {
  meta: {
    subject: "Tin học", grade: "7", book: "Kết nối tri thức với cuộc sống",
    title: "Bài 11: Tạo bài trình chiếu", unit: "Chủ đề 4 — Ứng dụng tin học",
    pages: "55–60", durationMinutes: 90,
  },
  objectives: {
    knowledge: [
      "Nêu được một số chức năng cơ bản của phần mềm trình chiếu.",
      "Hiểu vai trò của trang tiêu đề và các trang nội dung; biết các mẫu bố trí (layout).",
      "Nhận biết và sử dụng được cấu trúc phân cấp để trình bày thông tin rõ ràng.",
      "Tạo được một bài báo cáo có tiêu đề, cấu trúc phân cấp.",
    ],
    competencies: [
      "Tự chủ, tự học; giao tiếp và hợp tác (nhóm 3 HS, cặp đôi); giải quyết vấn đề và sáng tạo.",
      "Năng lực số 3.1.TC1a: tạo tệp trình chiếu, thêm trang chiếu với bố cục phù hợp, nhập văn bản, lưu tệp .pptx.",
      "Năng lực số 3.1.TC1b: sắp xếp thông tin khoa học (tiêu đề – nội dung – minh hoạ), thể hiện ý tưởng cá nhân, đảm bảo thẩm mĩ, nhất quán.",
      "Năng lực AI 7.B3.1: thể hiện thái độ, cam kết sử dụng AI có trách nhiệm trong sản phẩm học tập.",
    ],
    qualities: ["Chăm chỉ, trách nhiệm, trung thực (dùng thông tin, hình ảnh đúng nguồn), nhân ái."],
  },
  coreKnowledge: [
    "Phần mềm trình chiếu có hai chức năng cơ bản: tạo bài trình chiếu và trình chiếu nó; có các hiệu ứng làm nội dung sinh động, hấp dẫn.",
    "Bài trình chiếu gồm nhiều trang chiếu (slide) được đánh số thứ tự: trang đầu tiên là trang tiêu đề, tiếp theo là các trang nội dung.",
    "Tiêu đề trang làm nổi bật nội dung cần trình bày và được đặt trên đầu các trang nội dung. Phần mềm có sẵn các mẫu bố trí (layout).",
    "Cấu trúc phân cấp (danh sách kí hiệu đầu dòng nhiều cấp) giúp nội dung có bố cục mạch lạc, dễ hiểu, truyền tải thông tin và quản lí nội dung tốt hơn.",
    "Tăng bậc: Increase List Level (phím Tab); giảm bậc: Decrease List Level (Shift+Tab). Đổi kí hiệu: Home → Bullets / Numbering → Bullets and Numbering…",
  ],
  keywords: ["Trang tiêu đề", "Tiêu đề trang", "Layout", "Cấu trúc phân cấp", "Tab / Shift+Tab"],
  settings: { basePoints: 100, useTimer: false, defaultTime: 60, sound: true, streakEnabled: true },

  activities: [
    /* =========================== TIẾT 1 =========================== */
    /* ===================== HĐ1: MỞ ĐẦU (5 phút) ===================== */
    {
      id: "duoi-hinh", name: "Mở đầu — Đuổi hình bắt chữ 🎯", type: "knowledge",
      goal: "Tạo hứng thú; gợi các từ khoá của bài: máy chiếu, trang chiếu, thuyết trình, tiêu đề, hiệu ứng, phân cấp.",
      time: 300,
      task: "Nhìn hình, đoán từ và gõ đáp án — mỗi câu 30 giây (thầy/cô bấm ⏱️). Chơi xong, suy nghĩ: “Em có muốn tự tạo một trò chơi tương tự không? Cần biết kiến thức gì, dùng phần mềm nào?”",
      sgkImage: "assets/sgk/sgk-trang55.jpg",
      content: {
        heading: "🎯 Đuổi hình bắt chữ",
        prompt: "Mỗi hình gợi ý một từ khoá của bài học hôm nay. Ô vuông cho biết số chữ cái của từng từ.",
        revealLabel: "💬 Hội thoại của An, Minh, Khoa (SGK tr.55)",
        blocks: [{ kind: "html", value: HOI_THOAI }],
      },
      questions: [
        { question: "Hình 1: Đây là thiết bị gì?", type: "short", image: "assets/game/may-chieu.svg", answer: ["máy chiếu", "projector"],
          hint: "Chữ cái đầu: M — thiết bị chiếu hình lên màn rộng.", explanation: "MÁY CHIẾU (projector): chiếu nội dung các trang chiếu lên màn chiếu rộng.", level: "nhan-biet", activity: "duoi-hinh" },
        { question: "Hình 2: Mỗi tấm được đánh số 1, 2, 3 gọi là gì?", type: "short", image: "assets/game/trang-chieu.svg", answer: ["trang chiếu", "slide"],
          hint: "Chữ cái đầu: T — tiếng Anh là slide.", explanation: "TRANG CHIẾU (slide): bài trình chiếu gồm một hay nhiều trang chiếu được đánh số thứ tự.", level: "nhan-biet", activity: "duoi-hinh" },
        { question: "Hình 3: Bạn đang cầm micro nói trước mọi người. Bạn ấy đang làm gì?", type: "short", image: "assets/game/thuyet-trinh.svg", answer: ["thuyết trình", "trình bày"],
          hint: "Chữ cái đầu: T — trình bày trước lớp, trước hội nghị.", explanation: "THUYẾT TRÌNH: trình bày thông tin trước người nghe, thường dùng bài trình chiếu hỗ trợ.", level: "nhan-biet", activity: "duoi-hinh" },
        { question: "Hình 4: Dòng chữ to, nổi bật nhất ở trên đầu trang gọi là gì?", type: "short", image: "assets/game/tieu-de.svg", answer: ["tiêu đề", "title"],
          hint: "Chữ cái đầu: T — tiếng Anh là title.", explanation: "TIÊU ĐỀ: cho biết chủ đề, nội dung chính của bài hay của trang.", level: "nhan-biet", activity: "duoi-hinh" },
        { question: "Hình 5: Những thứ lấp lánh, chuyển động làm bài trình chiếu sinh động gọi là gì?", type: "short", image: "assets/game/hieu-ung.svg", answer: ["hiệu ứng"],
          hint: "Chữ cái đầu: H — hiệu ứng động, hiệu ứng chuyển trang.", explanation: "HIỆU ỨNG: làm cho nội dung trình bày thêm sinh động và hấp dẫn.", level: "thong-hieu", activity: "duoi-hinh" },
        { question: "Hình 6: Các dòng xếp thành nhiều bậc như bậc thang — ý lớn, ý nhỏ, ý nhỏ hơn. Đó là cấu trúc gì?", type: "short", image: "assets/game/phan-cap.svg", answer: ["phân cấp", "cấu trúc phân cấp"],
          hint: "Chữ cái đầu: P — danh sách nhiều cấp.", explanation: "PHÂN CẤP: cấu trúc gồm danh sách nhiều cấp, giúp nội dung mạch lạc, dễ hiểu.", level: "thong-hieu", activity: "duoi-hinh" },
        { question: "Muốn tự tạo một trò chơi “Đuổi hình bắt chữ” với nhiều trang hình ảnh, chữ và hiệu ứng để chiếu cho cả lớp, em dùng phần mềm nào?", type: "multiple-choice",
          options: ["Phần mềm bảng tính", "Phần mềm soạn thảo văn bản", "Phần mềm trình chiếu", "Phần mềm sơ đồ tư duy"],
          answer: 2, explanation: "Phần mềm trình chiếu cho phép trình bày văn bản, hình ảnh, âm thanh, video dưới hình thức trình chiếu một cách hấp dẫn, có hiệu ứng.", level: "thong-hieu", activity: "duoi-hinh" },
      ],
    },

    /* ===================== HĐ2.1: CHỨC NĂNG CƠ BẢN (10 phút) ===================== */
    {
      id: "chuc-nang", name: "Một số chức năng cơ bản của phần mềm trình chiếu 📽️", type: "knowledge",
      goal: "Nêu được hai chức năng cơ bản và ứng dụng của phần mềm trình chiếu.",
      time: 600,
      task: "Nhóm 3 HS/máy: tìm và mở phần mềm trình chiếu, nêu các chức năng trong giao diện mà em biết. Thảo luận Hoạt động 1 (SGK tr.55) rồi trả lời câu hỏi.",
      sgkImage: "assets/sgk/sgk-trang55.jpg",
      links: SLIDE_TOOLS,
      content: {
        heading: "📽️ Phần mềm trình chiếu",
        prompt: "Hoạt động 1: 1. Em đã biết gì về phần mềm trình chiếu? 2. Khi tạo một bài trình bày gồm văn bản, hình ảnh và nhiều đối tượng khác, em chọn phần mềm soạn thảo văn bản hay phần mềm trình chiếu? Vì sao?",
        revealLabel: "🔍 Chức năng cơ bản (SGK tr.55–56)",
        blocks: [
          { kind: "text", value: "Phần mềm trình chiếu là phần mềm được thiết kế để cho phép người sử dụng trình bày thông tin như văn bản, hình ảnh, âm thanh và video dưới hình thức trình chiếu một cách hấp dẫn và hiệu quả." },
          { kind: "html", value: HAI_CHUC_NANG },
          { kind: "list", value: [
            "Tạo bài trình chiếu lưu trên máy tính dưới dạng tệp tin: soạn thảo, chỉnh sửa, định dạng văn bản. Mỗi bài trình chiếu gồm một hay nhiều trang chiếu (slide) được đánh số thứ tự; thông tin trên mỗi trang có thể là văn bản, âm thanh, hình ảnh, biểu đồ hay video.",
            "Trình chiếu nội dung các trang chiếu lên màn hình hoặc màn chiếu rộng bằng máy chiếu (projector).",
            "Có các hiệu ứng động, hiệu ứng chuyển trang làm cho nội dung trình bày thêm sinh động và hấp dẫn.",
            "Thường dùng để tạo bài trình chiếu phục vụ hội thảo, hội nghị, dạy học, quảng cáo, tạo các phần mềm giải trí như album với các hiệu ứng hoạt hình (ảnh, ca nhạc…).",
          ] },
        ],
      },
      questions: [
        { question: "Hoạt động 1, câu 2: Bài trình bày gồm văn bản, hình ảnh và nhiều đối tượng khác để chiếu trước lớp — em chọn phần mềm nào? Vì sao?", type: "multiple-choice",
          options: ["Soạn thảo văn bản, vì gõ chữ nhanh hơn", "Trình chiếu, vì trình bày văn bản, hình ảnh, âm thanh, video theo từng trang chiếu, có hiệu ứng, chiếu lên màn hình hấp dẫn", "Bảng tính, vì có nhiều ô", "Phần mềm nào cũng như nhau"],
          answer: 1, explanation: "Phần mềm trình chiếu được thiết kế để trình bày thông tin dưới hình thức trình chiếu một cách hấp dẫn và hiệu quả.", level: "thong-hieu", activity: "chuc-nang" },
        { question: "a) Phần mềm trình chiếu thường được sử dụng để tạo bài trình chiếu phục vụ hội nghị, dạy học, quảng cáo,…", type: "true-false", answer: true,
          explanation: "Đúng.", level: "nhan-biet", activity: "chuc-nang" },
        { question: "b) Phần mềm trình chiếu có chức năng tạo bài trình chiếu và lưu dưới dạng tệp.", type: "true-false", answer: true,
          explanation: "Đúng. Bài trình chiếu được lưu trên máy tính dưới dạng tệp tin (ví dụ .pptx).", level: "nhan-biet", activity: "chuc-nang" },
        { question: "c) Có thể nhập và xử lí văn bản, hình ảnh trên các trang chiếu.", type: "true-false", answer: true,
          explanation: "Đúng. Chức năng tạo bài trình chiếu gồm soạn thảo, chỉnh sửa, định dạng văn bản; thông tin trên trang có thể là văn bản, hình ảnh…", level: "nhan-biet", activity: "chuc-nang" },
        { question: "d) Chức năng chính của phần mềm trình chiếu là tính toán tự động.", type: "true-false", answer: false,
          explanation: "Sai. Tính toán tự động là chức năng của phần mềm bảng tính. Phần mềm trình chiếu có hai chức năng cơ bản: tạo bài trình chiếu và trình chiếu nó.", level: "thong-hieu", activity: "chuc-nang" },
        { question: "Hai chức năng cơ bản của phần mềm trình chiếu là:", type: "multiple-choice",
          options: ["Tính toán và vẽ biểu đồ", "Soạn thư và gửi thư", "Tìm kiếm và thay thế", "Tạo bài trình chiếu và trình chiếu nó"],
          answer: 3, explanation: "Phần mềm trình chiếu có hai chức năng cơ bản là tạo bài trình chiếu và trình chiếu nó.", level: "nhan-biet", activity: "chuc-nang" },
      ],
      remember: [
        "Phần mềm trình chiếu có hai chức năng cơ bản là tạo bài trình chiếu và trình chiếu nó.",
        "Phần mềm trình chiếu có các hiệu ứng làm cho nội dung trình bày thêm sinh động và hấp dẫn.",
        "Phần mềm trình chiếu thường được sử dụng để tạo bài trình chiếu phục vụ hội thảo, hội nghị, dạy học, quảng cáo,…",
      ],
    },
    {
      id: "chon-phan-mem", name: "Trò chơi: Chọn đúng phần mềm 🧰", type: "dragdrop",
      goal: "Phân biệt công việc phù hợp với phần mềm trình chiếu, soạn thảo văn bản, bảng tính.",
      time: 150,
      task: "Xếp mỗi công việc vào phần mềm phù hợp nhất. Xếp hết rồi bấm Nộp bài.",
      groups: ["📽️ Phần mềm trình chiếu", "📝 Phần mềm soạn thảo văn bản", "📊 Phần mềm bảng tính"],
      items: [
        { text: "Báo cáo kết quả dự án Trường học xanh trước lớp", group: 0 },
        { text: "Làm album ảnh chuyến tham quan có nhạc và hiệu ứng", group: 0 },
        { text: "Bài giảng chiếu trên máy chiếu trong giờ học", group: 0 },
        { text: "Viết đơn xin nghỉ học gửi cô chủ nhiệm", group: 1 },
        { text: "Làm sổ lưu niệm nhiều trang in ra giấy", group: 1 },
        { text: "Tính tổng chi phí mua cây của dự án", group: 2 },
        { text: "Lập bảng điểm và tính điểm trung bình", group: 2 },
      ],
      explanation: "Trình chiếu: trình bày trước người nghe, có hiệu ứng · Soạn thảo văn bản: văn bản, tài liệu in · Bảng tính: tính toán, xử lí số liệu.",
    },

    /* ===================== HĐ2.2: TIÊU ĐỀ CỦA BÀI TRÌNH CHIẾU (13 phút) ===================== */
    {
      id: "tieu-de", name: "Tiêu đề của bài trình chiếu 🏷️", type: "knowledge",
      goal: "Hiểu vai trò trang tiêu đề, tiêu đề trang; biết mẫu bố trí (layout).",
      time: 600,
      task: "Nhóm 3 HS (7 phút): quan sát hai trang chiếu mẫu, hỏi – đáp nhau về tiêu đề, bố cục; thảo luận Hoạt động 2 (SGK tr.56) rồi trả lời câu hỏi.",
      sgkImage: "assets/sgk/sgk-trang56.jpg",
      html: H113_114,
      content: {
        heading: "🏷️ Tiêu đề của bài trình chiếu",
        prompt: "Hoạt động 2: 1. Khi tạo bài trình chiếu, em thường trình bày các trang như thế nào? 2. Theo em, tiêu đề của bài trình chiếu nên đặt ở trang nào? Muốn làm nổi bật nội dung của mỗi trang thì cần làm như thế nào?",
        revealLabel: "🔍 Trang tiêu đề, trang nội dung, mẫu bố trí (SGK tr.56)",
        blocks: [
          { kind: "list", value: [
            "Một bài trình chiếu thường có nhiều trang được đánh số thứ tự. Trang đầu tiên là trang tiêu đề, còn lại là các trang nội dung. Nội dung trên các trang thường được bố trí thống nhất theo cùng một mẫu.",
            "Trang tiêu đề (Title Slide) cho biết chủ đề của bài trình chiếu; còn có thêm thông tin như tên tác giả, ngày trình bày, địa điểm trình bày,… Trang này được ví như cổng vào bài trình chiếu, thu hút sự chú ý của người nghe ngay từ đầu.",
            "Trang nội dung thường có tiêu đề trang và nội dung (Title and Content). Tiêu đề trang được viết dưới dạng văn bản ở trên đầu mỗi trang, là thành phần làm nổi bật nội dung cần trình bày.",
            "Mẫu bố trí nội dung trang trình chiếu (layout): các phần mềm có sẵn các mẫu bố trí nội dung. Người sử dụng có thể dùng các mẫu này hoặc thay đổi bố trí cho phù hợp, cũng có thể tự tạo mẫu bố trí cho trang chiếu.",
          ] },
          { kind: "image", value: "assets/sgk/hinh-11-3-4.jpg", caption: "Hình 11.3. Ví dụ trang tiêu đề · Hình 11.4. Ví dụ trang nội dung" },
        ],
      },
      questions: [
        { question: "Tiêu đề của bài trình chiếu (chủ đề của cả bài) nên đặt ở trang nào?", type: "multiple-choice",
          options: ["Trang đầu tiên — trang tiêu đề", "Trang cuối cùng", "Trang ở giữa bài", "Trang nào cũng được"],
          answer: 0, explanation: "Trang đầu tiên là trang tiêu đề, cho biết chủ đề của bài trình chiếu.", level: "nhan-biet", activity: "tieu-de" },
        { question: "Muốn làm nổi bật nội dung của mỗi trang nội dung, em cần:", type: "multiple-choice",
          options: ["Viết thật nhiều chữ", "Đặt tiêu đề trang ở trên đầu trang", "Dùng thật nhiều màu", "Bỏ trống trang"],
          answer: 1, explanation: "Tiêu đề trang làm nổi bật nội dung cần trình bày và được đặt trên đầu các trang nội dung.", level: "thong-hieu", activity: "tieu-de" },
        { question: "Ngoài chủ đề, trang tiêu đề (Hình 11.3) còn có thể có những thông tin nào?", type: "multiple-choice", sgkImage: "assets/sgk/hinh-11-3-4.jpg",
          options: ["Bảng số liệu chi tiết của dự án", "Toàn bộ kết luận của bài", "Tên tác giả (người thực hiện), ngày, địa điểm trình bày", "Danh sách tất cả các trang"],
          answer: 2, explanation: "Trang tiêu đề còn có thêm thông tin như tên tác giả, ngày trình bày, địa điểm trình bày,… (ví dụ: Chi đội 7A, Trường THCS …, Ngày …).", level: "thong-hieu", activity: "tieu-de" },
        { question: "Phát biểu nào sau đây KHÔNG đúng? (SGK tr.57)", type: "multiple-choice",
          options: ["Trang tiêu đề là trang đầu tiên và cho biết chủ đề của bài trình chiếu.", "Các trang nội dung của bài trình chiếu thường có tiêu đề trang.", "Tiêu đề trang giúp làm nổi bật nội dung cần trình bày của trang.", "Các phần mềm trình chiếu không có sẵn các mẫu bố trí."],
          answer: 3, explanation: "D sai: các phần mềm trình chiếu có sẵn các mẫu bố trí nội dung trang chiếu để thuận tiện cho người sử dụng.", level: "thong-hieu", activity: "tieu-de" },
        { question: "Người sử dụng có thể dùng mẫu bố trí có sẵn, thay đổi bố trí hoặc tự tạo mẫu bố trí cho trang chiếu.", type: "true-false", answer: true,
          explanation: "Đúng (SGK tr.56).", level: "nhan-biet", activity: "tieu-de" },
      ],
      remember: [
        "Bài trình chiếu thường có trang đầu tiên là trang tiêu đề cho biết chủ đề của bài trình bày, tiếp theo là các trang nội dung.",
        "Tiêu đề trang làm nổi bật nội dung cần trình bày trong trang và được đặt trên đầu các trang nội dung.",
        "Các phần mềm trình chiếu có sẵn các mẫu bố trí nội dung trang chiếu để thuận tiện cho người sử dụng.",
      ],
    },
    {
      id: "ghep-thuat-ngu", name: "Trò chơi: Ghép thuật ngữ 🧩", type: "matching",
      goal: "Ghi nhớ các thuật ngữ về cấu trúc bài trình chiếu.",
      time: 150,
      task: "Ghép mỗi thuật ngữ với ý nghĩa đúng. Làm hết rồi bấm Nộp bài.",
      pairs: [
        { left: "Slide", right: "Trang chiếu, được đánh số thứ tự" },
        { left: "Title Slide", right: "Trang tiêu đề: chủ đề, tác giả, ngày trình bày" },
        { left: "Title and Content", right: "Trang nội dung: có tiêu đề trang và nội dung" },
        { left: "Tiêu đề trang", right: "Làm nổi bật nội dung, đặt trên đầu trang" },
        { left: "Layout", right: "Mẫu bố trí nội dung trang chiếu" },
      ],
      explanation: "Slide: trang chiếu · Title Slide: trang tiêu đề · Title and Content: trang nội dung · Layout: mẫu bố trí.",
    },

    /* ===================== HĐ2.3: CẤU TRÚC PHÂN CẤP (10 phút) ===================== */
    {
      id: "phan-cap", name: "Cấu trúc phân cấp 🗂️", type: "knowledge",
      goal: "Hiểu cấu trúc phân cấp và tác dụng của nó.",
      time: 600,
      task: "Cặp đôi 5 phút — Hoạt động 3 (SGK tr.57): quan sát hai cách trình bày dự án Trường học xanh, cho biết cách nào dễ hiểu hơn; trả lời các câu hỏi.",
      sgkImage: "assets/sgk/hd3-hai-cach.jpg",
      html: HAI_CACH,
      content: {
        heading: "🗂️ Cấu trúc phân cấp",
        revealLabel: "💡 Cấu trúc phân cấp là gì? (SGK tr.57)",
        blocks: [
          { kind: "text", value: "Trong Hoạt động 3, Cách 2 là hình thức trình bày theo cấu trúc phân cấp. Đây là một cấu trúc gồm danh sách nhiều cấp rất phổ biến trong soạn thảo văn bản, tạo các bài trình chiếu,… Cấu trúc phân cấp giúp truyền tải thông tin một cách mạch lạc, dễ hiểu và dễ quản lí. Người xem dễ dàng hiểu được bố cục của nội dung cần trình bày." },
          { kind: "html", value: H117_118 },
        ],
      },
      questions: [
        { question: "Hoạt động 3: Cách trình bày nào dễ hiểu hơn?", type: "multiple-choice",
          options: ["Cách 1 — các dòng ngang cấp nhau", "Cách 2 — chia thành ý lớn, ý nhỏ theo nhiều cấp", "Hai cách như nhau", "Không cách nào dễ hiểu"],
          answer: 1, explanation: "Cách 2 trình bày theo cấu trúc phân cấp: người xem dễ dàng hiểu được bố cục của nội dung.", level: "nhan-biet", activity: "phan-cap" },
        { question: "Ở Cách 2, mục “2.1. Khảo sát thực tế” là ý nhỏ của mục nào?", type: "multiple-choice",
          options: ["1. Ý tưởng", "3. Kết luận", "2. Kế hoạch", "Vai trò của cây xanh"],
          answer: 2, explanation: "2.1, 2.2, 2.3 đều là các ý nhỏ thuộc mục 2. Kế hoạch.", level: "thong-hieu", activity: "phan-cap" },
        { question: "Ở Cách 2, dòng “Thời gian” nằm ở cấp thứ mấy (tính “1., 2., 3.” là cấp 1)?", type: "multiple-choice",
          options: ["Cấp 3 (2. Kế hoạch → 2.2. Thực hiện → Thời gian)", "Cấp 1", "Cấp 2", "Không thuộc cấp nào"],
          answer: 0, explanation: "Thời gian là ý nhỏ của 2.2. Thực hiện, mà 2.2 lại là ý nhỏ của 2. Kế hoạch → cấp 3.", level: "van-dung", activity: "phan-cap" },
        { question: "Câu nào sau đây SAI khi nói về cấu trúc phân cấp? (SGK tr.57)", type: "multiple-choice",
          options: ["Là cấu trúc gồm danh sách nhiều cấp.", "Giúp làm cho nội dung cần trình bày có bố cục mạch lạc, dễ hiểu.", "Cấu trúc này gồm một chuỗi các dấu đầu dòng ngang cấp nhau.", "Cấu trúc này được sử dụng nhiều trong soạn thảo văn bản, tạo bài trình chiếu."],
          answer: 2, explanation: "C sai: các dấu đầu dòng ngang cấp nhau là Cách 1 — không phải cấu trúc phân cấp. Cấu trúc phân cấp gồm danh sách nhiều cấp.", level: "thong-hieu", activity: "phan-cap" },
        { question: "Cấu trúc phân cấp còn được gọi là:", type: "multiple-choice",
          options: ["Danh sách kí hiệu đầu dòng nhiều cấp", "Bảng tính nhiều trang", "Trang tiêu đề", "Hiệu ứng chuyển trang"],
          answer: 0, explanation: "Cấu trúc phân cấp (hay danh sách kí hiệu đầu dòng nhiều cấp).", level: "nhan-biet", activity: "phan-cap" },
      ],
      remember: ["Cấu trúc phân cấp (hay danh sách kí hiệu đầu dòng nhiều cấp) thường được dùng trong soạn thảo văn bản, tạo bài trình chiếu,… Đây là một công cụ giúp làm cho nội dung trình bày có bố cục mạch lạc, dễ hiểu, giúp truyền tải thông tin và quản lí nội dung tốt hơn."],
    },

    /* =========================== TIẾT 2 =========================== */
    /* ===================== HĐ2.4: THỰC HÀNH (32 phút) ===================== */
    {
      id: "thuc-hanh-buoc", name: "Thực hành — Sắp xếp các bước tạo bài trình chiếu 🔢", type: "ordering",
      goal: "Nắm trình tự các bước thực hành trong SGK.",
      time: 150,
      task: "Sắp xếp các bước tạo bài trình chiếu Truonghocxanh.pptx theo đúng thứ tự SGK rồi bấm Nộp bài.",
      sgkImage: "assets/sgk/sgk-trang58.jpg",
      steps: [
        "Khởi động PowerPoint — trang đầu tiên là trang tiêu đề",
        "Nhập chủ đề và phụ đề cho trang tiêu đề",
        "Nháy New Slide tạo trang mới, chọn Layout cho trang",
        "Nhập tiêu đề trang và nội dung của trang",
        "Chọn các dòng cần tăng cấp, nhấn Tab để tạo cấu trúc phân cấp",
        "Đổi màu sắc, kí hiệu đầu dòng bằng Bullets and Numbering",
        "Lưu bài trình chiếu với tên Truonghocxanh.pptx",
      ],
      explanation: "a) Tạo bài trình chiếu (trang tiêu đề → trang nội dung) → b) Tạo cấu trúc phân cấp, đổi kí hiệu đầu dòng → c) Lưu bài trình chiếu.",
    },
    {
      id: "thuc-hanh", name: "Thực hành: Tạo bài trình chiếu có tiêu đề, cấu trúc phân cấp 🌳", type: "knowledge",
      goal: "Tạo bài trình chiếu báo cáo dự án Trường học xanh có trang tiêu đề, trang nội dung có tiêu đề trang, cấu trúc phân cấp.",
      time: 1500,
      task: "Nhóm 2 HS/máy — làm trên PowerPoint (hoặc phần mềm trình chiếu trực tuyến) theo SGK tr.58–60 (Hình 11.1, 11.2, 11.6, 11.8): trang tiêu đề, các trang nội dung có tiêu đề trang, cấu trúc phân cấp; lưu tệp Truonghocxanh.pptx.",
      sgkImage: "assets/sgk/hinh-11-2.jpg",
      links: SLIDE_TOOLS,
      html: H119,
      content: {
        heading: "🌳 Bài trình chiếu Truonghocxanh.pptx",
        revealLabel: "📖 Hướng dẫn trên PowerPoint (SGK tr.58–60)",
        blocks: [
          { kind: "text", value: "a) Tạo bài trình chiếu — Bước 1: Khởi động PowerPoint; phần mềm tự động tạo một bài trình chiếu mới, trang đầu tiên là trang tiêu đề: 1. nhập chủ đề, tên bài trình chiếu · 2. nhập phụ đề: tên người thực hiện, thời gian,…" },
          { kind: "image", value: "assets/sgk/hinh-11-1.jpg", caption: "Hình 11.1. Trang tiêu đề" },
          { kind: "text", value: "Bước 2: Tạo các trang nội dung: 1. nháy chuột vào New Slide để tạo trang mới · 2. nháy chuột vào Layout để chọn mẫu bố trí cho trang · 3. nhập tiêu đề của trang · 4. nhập nội dung của trang." },
          { kind: "image", value: "assets/sgk/hinh-11-2.jpg", caption: "Hình 11.2. Trang nội dung" },
          { kind: "text", value: "b) Tạo cấu trúc phân cấp — Bước 1: đặt con trỏ soạn thảo ở đầu dòng cần tạo cấu trúc phân cấp (nếu cần tạo cấu trúc giống nhau cho nhiều dòng thì chọn đồng thời các dòng đó). Bước 2: chọn lệnh Increase List Level (hoặc nhấn phím Tab) để tăng bậc phân cấp; chọn Decrease List Level (hoặc Shift+Tab) để giảm bậc. Dòng được tăng cấp tự động dịch sang phải một khoảng và giảm cỡ chữ; dòng được giảm cấp dịch sang trái và tăng cỡ chữ." },
          { kind: "image", value: "assets/sgk/hinh-11-5-6.jpg", caption: "Hình 11.5. Chọn các dòng cần tăng cấp · Hình 11.6. Kết quả sau khi nhấn phím Tab" },
          { kind: "text", value: "Thay đổi màu sắc, kí hiệu đầu dòng — Bước 1: đặt con trỏ ở đầu dòng (hoặc chọn nhiều dòng). Bước 2: chọn Home, nháy mũi tên bên phải lệnh Bullets hoặc Numbering, chọn Bullets and Numbering…: chọn Bulleted để thay đổi kí hiệu, Numbered để đánh số thứ tự, Color để đổi màu kí hiệu." },
          { kind: "image", value: "assets/sgk/hinh-11-9.jpg", caption: "Hình 11.9. Trang chiếu sau khi thay đổi hình dạng và màu sắc của các kí hiệu đầu dòng" },
          { kind: "text", value: "c) Lưu bài trình chiếu với tên Truonghocxanh.pptx." },
        ],
      },
      questions: [
        { question: "Để tạo thêm một trang chiếu mới, em nháy chuột vào lệnh nào?", type: "multiple-choice", sgkImage: "assets/sgk/hinh-11-2.jpg",
          options: ["Layout", "New Slide", "Paste", "Slide Show"],
          answer: 1, explanation: "Nháy chuột vào New Slide để tạo trang mới; nháy Layout để chọn mẫu bố trí cho trang.", level: "nhan-biet", activity: "thuc-hanh" },
        { question: "Chọn dòng “Vai trò của cây xanh” rồi nhấn phím Tab. Kết quả là:", type: "multiple-choice",
          options: ["Dòng bị xoá", "Dòng dịch sang trái, chữ to hơn", "Dòng được tăng bậc: dịch sang phải một khoảng, cỡ chữ nhỏ hơn", "Tạo trang chiếu mới"],
          answer: 2, explanation: "Tab = Increase List Level: dòng được tăng cấp tự động dịch sang phải một khoảng và giảm cỡ chữ (Hình 11.6).", level: "thong-hieu", activity: "thuc-hanh" },
        { question: "Muốn đưa dòng “Kế hoạch” đang ở cấp 2 trở về cấp 1, em nhấn:", type: "multiple-choice",
          options: ["Shift+Tab (Decrease List Level)", "Tab", "Enter", "Ctrl+S"],
          answer: 0, explanation: "Decrease List Level (Shift+Tab) giảm bậc phân cấp: dòng dịch sang trái và tăng cỡ chữ.", level: "van-dung", activity: "thuc-hanh" },
        { question: "Muốn hai dòng “Vai trò của cây xanh” và “Đề xuất dự án” cùng tăng một cấp, cách nhanh nhất là:", type: "multiple-choice", sgkImage: "assets/sgk/hinh-11-5-6.jpg",
          options: ["Gõ lại hai dòng", "Tạo trang mới", "Nhấn Tab hai lần ở dòng đầu", "Chọn đồng thời hai dòng rồi nhấn Tab"],
          answer: 3, explanation: "Nếu cần tạo cấu trúc phân cấp giống nhau cho nhiều dòng, chọn đồng thời các dòng đó rồi nhấn Tab (Hình 11.5, 11.6).", level: "van-dung", activity: "thuc-hanh" },
        { question: "Trong hộp thoại Bullets and Numbering, muốn chuyển kí hiệu đầu dòng thành số thứ tự 1, 2, 3, em chọn:", type: "multiple-choice",
          options: ["Bulleted", "Color", "Numbered", "Layout"],
          answer: 2, explanation: "Bulleted: thay đổi kí hiệu · Numbered: đánh số thứ tự · Color: đổi màu cho kí hiệu.", level: "nhan-biet", activity: "thuc-hanh" },
        { question: "Trong Hình 11.9, dòng “Phân công” và “Thời gian” (kí hiệu ✓) ở cấp thứ mấy?", type: "multiple-choice", sgkImage: "assets/sgk/hinh-11-9.jpg",
          options: ["Cấp 1", "Cấp 3", "Cấp 2", "Không phân cấp"],
          answer: 1, explanation: "Kế hoạch (cấp 1, ■) → Thực hiện (cấp 2, ➢) → Phân công, Thời gian (cấp 3, ✓).", level: "van-dung", activity: "thuc-hanh" },
      ],
    },
    {
      id: "ghep-lenh", name: "Trò chơi: Lệnh nào làm việc gì? 🧩", type: "matching",
      goal: "Ghi nhớ các lệnh dùng khi tạo bài trình chiếu.",
      time: 150,
      task: "Ghép mỗi lệnh (phím) với tác dụng của nó. Làm hết rồi bấm Nộp bài.",
      pairs: [
        { left: "New Slide", right: "Tạo trang chiếu mới" },
        { left: "Layout", right: "Chọn mẫu bố trí cho trang" },
        { left: "Increase List Level (Tab)", right: "Tăng bậc phân cấp" },
        { left: "Decrease List Level (Shift+Tab)", right: "Giảm bậc phân cấp" },
        { left: "Bullets", right: "Thay đổi kí hiệu đầu dòng" },
        { left: "Numbering", right: "Chuyển kí hiệu đầu dòng thành số thứ tự" },
      ],
      explanation: "New Slide: trang mới · Layout: mẫu bố trí · Tab / Shift+Tab: tăng / giảm bậc · Bullets: kí hiệu · Numbering: số thứ tự.",
    },
    {
      id: "cham-cheo", name: "Phiếu chấm chéo bài trình chiếu 🤝", type: "checklist",
      goal: "Nhận xét, đánh giá chéo sản phẩm Truonghocxanh.pptx theo tiêu chí.",
      time: 300,
      target: "Nhóm em chấm bài của",
      task: "Xem bài trình chiếu của nhóm được thầy/cô phân công, ghi số nhóm được chấm, tick từng tiêu chí Đạt hoặc Cần cải thiện, ghi góp ý rồi gửi cho thầy/cô.",
      sgkImage: "assets/sgk/hinh-11-9.jpg",
      columns: ["✅ Đạt", "🔧 Cần cải thiện"],
      sections: [
        { title: "🏷️ TIÊU ĐỀ", items: [
          "Có trang tiêu đề ghi chủ đề của bài",
          "Trang tiêu đề có phụ đề: người thực hiện, thời gian",
          "Các trang nội dung đều có tiêu đề trang",
        ] },
        { title: "🗂️ CẤU TRÚC PHÂN CẤP", items: [
          "Nội dung chia thành ý lớn, ý nhỏ (ít nhất 2 cấp)",
          "Các ý cùng cấp thẳng hàng, đúng mục",
          "Kí hiệu đầu dòng rõ ràng, màu sắc hài hoà",
        ] },
        { title: "🎨 TRÌNH BÀY", items: [
          "Chữ dễ đọc, không quá nhiều chữ trên một trang",
          "Lưu đúng tên Truonghocxanh.pptx",
        ] },
      ],
      note: "Góp ý cho nhóm bạn: một điều em thích nhất và một điều nên sửa",
      modelAnswer: [
        "Góp ý cụ thể, lịch sự: nêu điểm tốt trước, rồi đến điểm nên sửa kèm cách sửa.",
        "Lỗi thường gặp: trang nội dung thiếu tiêu đề trang, các dòng ngang cấp nhau (chưa nhấn Tab), quá nhiều chữ, lưu tên mặc định Presentation1.",
      ],
    },

    /* ===================== HĐ3: LUYỆN TẬP (15 phút) ===================== */
    {
      id: "luyen-tap", name: "Luyện tập 📝", type: "knowledge",
      goal: "Nêu ưu điểm của cấu trúc phân cấp; tạo trang chiếu công việc trong ngày có phân cấp.",
      time: 600,
      task: "Luyện tập (SGK tr.60) trong 4 phút: trả lời câu 1; câu 2 — tạo trên PowerPoint trang chiếu ghi các công việc cần làm trong ngày, dùng cấu trúc phân cấp. Quan sát trang mẫu và trả lời câu hỏi.",
      sgkImage: "assets/sgk/mau-cong-viec-trong-ngay.png",
      content: {
        heading: "📝 Luyện tập",
        image: "assets/sgk/mau-cong-viec-trong-ngay.png",
        imageCaption: "Trang chiếu mẫu: Công việc cần làm trong ngày",
      },
      questions: [
        { question: "Câu 1: Ưu điểm của việc sử dụng cấu trúc phân cấp trong bài trình chiếu là gì? (Chọn tất cả đáp án đúng)", type: "multiple-select",
          options: ["Giúp nội dung trình bày có bố cục mạch lạc, dễ hiểu", "Làm bài trình chiếu tự động có hiệu ứng", "Giúp truyền tải thông tin và quản lí nội dung tốt hơn", "Làm các dòng ngang cấp nhau cho đều"],
          answer: [0, 2], explanation: "Cấu trúc phân cấp giúp nội dung có bố cục mạch lạc, dễ hiểu; giúp truyền tải thông tin và quản lí nội dung tốt hơn.", level: "thong-hieu", activity: "luyen-tap" },
        { question: "Câu 2 (trang mẫu): dòng “Nấu cơm” là ý nhỏ của mục nào?", type: "multiple-choice",
          options: ["1. Buổi sáng", "3. Buổi chiều", "4. Buổi tối", "2. Buổi trưa"],
          answer: 3, explanation: "Nấu cơm nằm ngay dưới 2. Buổi trưa, được tăng một cấp.", level: "thong-hieu", activity: "luyen-tap" },
        { question: "Ở trang mẫu, các dòng “1. Buổi sáng… 4. Buổi tối” dùng số thứ tự, còn các việc cụ thể dùng kí hiệu “•”. Muốn đánh số 1, 2, 3, 4 cho các buổi, em dùng lệnh:", type: "multiple-choice",
          options: ["Numbering", "Bullets", "New Slide", "Layout"],
          answer: 0, explanation: "Numbering chuyển kí hiệu đầu dòng thành số thứ tự.", level: "van-dung", activity: "luyen-tap" },
        { question: "Em gõ xong các dòng công việc (tất cả ngang cấp). Để các việc nằm dưới đúng buổi của nó, em chọn các dòng công việc rồi:", type: "multiple-choice",
          options: ["Nhấn Shift+Tab", "Nhấn Tab", "Nhấn Delete", "Chọn New Slide"],
          answer: 1, explanation: "Nhấn Tab (Increase List Level) để tăng bậc các dòng công việc thành ý nhỏ của từng buổi.", level: "van-dung", activity: "luyen-tap" },
      ],
    },
    {
      id: "tro-choi", name: "Trò chơi: Lên sân khấu thuyết trình 🎤", type: "penguin",
      pet: "🎤", homeIcon: "🏆", enemy: "😴", saveWord: "khán giả chăm chú lắng nghe",
      winText: "Cả hội trường vỗ tay — em đã sẵn sàng thuyết trình với bài trình chiếu thật mạch lạc!",
      goal: "Củng cố toàn bài: chức năng, tiêu đề, cấu trúc phân cấp, các lệnh thực hành.",
      time: 240,
      task: "Trả lời đúng mỗi câu để giữ khán giả chăm chú — đừng để cơn buồn ngủ 😴 kéo đến!",
      intro: "Mỗi câu đúng: một micro 🎤 lên sân khấu 🏆. Sai thì khán giả buồn ngủ 😴!",
      questions: [
        { question: "Mỗi trang của bài trình chiếu được gọi là:", type: "multiple-choice",
          options: ["Trang tính", "Trang chiếu (slide)", "Trang văn bản", "Trang web"],
          answer: 1, explanation: "Mỗi bài trình chiếu gồm một hay nhiều trang chiếu (slide) được đánh số thứ tự.", level: "nhan-biet", activity: "tro-choi" },
        { question: "Trang đầu tiên của bài trình chiếu thường là:", type: "multiple-choice",
          options: ["Trang kết luận", "Trang nội dung", "Trang tiêu đề", "Trang trống"],
          answer: 2, explanation: "Trang đầu tiên là trang tiêu đề, cho biết chủ đề của bài trình chiếu.", level: "nhan-biet", activity: "tro-choi" },
        { question: "Việc nào KHÔNG phải chức năng của phần mềm trình chiếu?", type: "multiple-choice",
          options: ["Tạo bài trình chiếu", "Trình chiếu lên màn hình", "Tạo hiệu ứng động", "Tính tổng chi phí tự động bằng hàm SUM"],
          answer: 3, explanation: "Tính toán bằng hàm là chức năng của phần mềm bảng tính.", level: "thong-hieu", activity: "tro-choi" },
        { question: "Nút Layout dùng để:", type: "multiple-choice",
          options: ["Chọn mẫu bố trí cho trang", "Lưu tệp", "Xoá trang chiếu", "Trình chiếu"],
          answer: 0, explanation: "Nháy chuột vào Layout để chọn mẫu bố trí cho trang.", level: "nhan-biet", activity: "tro-choi" },
        { question: "Phím tắt để tăng bậc phân cấp của dòng đang chọn là:", type: "multiple-choice",
          options: ["Shift+Tab", "Enter", "Tab", "Ctrl+Z"],
          answer: 2, explanation: "Tab = Increase List Level; Shift+Tab = Decrease List Level.", level: "nhan-biet", activity: "tro-choi" },
        { question: "Một trang nội dung có 10 dòng ngang cấp, không có tiêu đề trang. Nên sửa thế nào?", type: "multiple-choice",
          options: ["Thêm tiêu đề trang và phân cấp các ý lớn, ý nhỏ", "Tô màu thật nhiều", "Xoá bớt 5 dòng bất kì", "Chuyển thành trang tiêu đề"],
          answer: 0, explanation: "Tiêu đề trang làm nổi bật nội dung; cấu trúc phân cấp giúp bố cục mạch lạc, dễ hiểu.", level: "van-dung", activity: "tro-choi" },
        { question: "Tiêu đề trang được đặt ở đâu trên các trang nội dung?", type: "multiple-choice",
          options: ["Cuối trang", "Trên đầu trang", "Giữa trang", "Ở trang cuối cùng"],
          answer: 1, explanation: "Tiêu đề trang được đặt trên đầu các trang nội dung.", level: "nhan-biet", activity: "tro-choi" },
        { question: "Dòng được giảm cấp (Shift+Tab) sẽ:", type: "multiple-choice",
          options: ["Dịch sang phải, cỡ chữ nhỏ hơn", "Bị xoá", "Dịch sang trái một khoảng, cỡ chữ lớn hơn", "Chuyển sang trang mới"],
          answer: 2, explanation: "Các dòng được giảm cấp tự động dịch chuyển sang trái một khoảng và tăng cỡ chữ.", level: "thong-hieu", activity: "tro-choi" },
      ],
    },

    /* ===================== HĐ4: VẬN DỤNG (5 phút) ===================== */
    {
      id: "van-dung", name: "Vận dụng — Đề xuất một dự án thiết thực 💡", type: "vandung",
      goal: "Đề xuất dự án, lập dàn ý phân cấp và tạo bài trình chiếu thuyết phục mọi người cùng thực hiện.",
      time: 300,
      task: "Vận dụng (SGK tr.60): đề xuất một dự án thiết thực với điều kiện hiện tại (ví dụ: làm sạch đẹp cảnh quan ngôi nhà, trang trí thư viện trường, tái chế rác thải…). Gửi thầy/cô tên dự án và dàn ý phân cấp; về nhà tạo bài trình chiếu Baitaptinhoc7.pptx.",
      intro: "Gửi câu trả lời cho thầy/cô. Dàn ý: mỗi ý một dòng, ý nhỏ thì thêm dấu cách ở đầu dòng.",
      sgkImage: "assets/sgk/sgk-trang60.jpg",
      cases: [
        { question: "Em đề xuất dự án gì? Vì sao dự án đó thiết thực với điều kiện hiện tại?",
          answer: "Ví dụ: Dự án “Góc đọc sách xanh” trang trí thư viện trường — thư viện còn ít bạn đến đọc, có thể tận dụng chai lọ tái chế trồng cây, làm kệ sách, treo tranh do các bạn vẽ; chi phí thấp, cả lớp cùng làm được." },
        { question: "Lập dàn ý phân cấp cho bài trình chiếu: trang tiêu đề (tên dự án, người thực hiện, ngày) và các trang nội dung có tiêu đề trang (mục tiêu, cách làm, tác dụng, hiệu ứng…).",
          answer: "Ví dụ: Trang 1 (tiêu đề): DỰ ÁN GÓC ĐỌC SÁCH XANH — Nhóm 3, lớp 7A — Ngày … · Trang 2 “Nội dung trình bày”: 1. Mục tiêu (– Thu hút bạn đọc – Tạo không gian xanh) · 2. Cách làm (2.1. Khảo sát thư viện · 2.2. Thực hiện: – Phân công – Thời gian · 2.3. Kinh phí dự kiến) · 3. Tác dụng · 4. Kết luận. Lưu tệp Baitaptinhoc7.pptx." },
      ],
    },

    /* ===================== TỔNG KẾT ===================== */
    {
      id: "tong-ket", name: "Tổng kết", type: "summary",
      task: "Cả lớp nhắc lại kiến thức trọng tâm và làm thử thách cuối. Dặn dò: hoàn thành Baitaptinhoc7.pptx; tìm hiểu trước Bài 12 “Định dạng đối tượng trên trang chiếu”.",
      content: {
        learned: [
          "Phần mềm trình chiếu: hai chức năng cơ bản là tạo bài trình chiếu và trình chiếu nó; có hiệu ứng làm nội dung sinh động.",
          "Trang đầu tiên là trang tiêu đề (chủ đề, tác giả, ngày…); các trang nội dung có tiêu đề trang đặt trên đầu trang; có sẵn các mẫu bố trí (layout).",
          "Cấu trúc phân cấp (danh sách kí hiệu đầu dòng nhiều cấp): bố cục mạch lạc, dễ hiểu, dễ quản lí.",
          "New Slide · Layout · Tab / Shift+Tab (tăng / giảm bậc) · Bullets and Numbering · lưu tệp .pptx.",
        ],
        challenge: [
          { question: "Bạn Khoa gõ trang “Nội dung trình bày” gồm 10 dòng ngang cấp (Hình 11.7). Để có trang như Hình 11.8, bạn cần:", type: "multiple-choice",
            options: ["Tạo 10 trang chiếu, mỗi trang một dòng", "Chọn các dòng ý nhỏ, nhấn Tab (các ý nhỏ hơn nữa nhấn Tab thêm lần nữa)", "Xoá bớt các dòng ý nhỏ", "Đổi màu chữ các dòng ý nhỏ"],
            answer: 1, explanation: "Nhấn Tab (Increase List Level) để tăng bậc: Vai trò, Đề xuất, Khảo sát, Thực hiện, Kết quả dự kiến lên cấp 2; Phân công, Thời gian lên cấp 3.",
            level: "van-dung-cao", activity: "tong-ket" },
          { question: "Vì sao bài báo cáo dự án nên có trang tiêu đề?", type: "multiple-choice",
            options: ["Để bài dài hơn", "Vì phần mềm bắt buộc phải có", "Để cho biết chủ đề, người thực hiện — như cổng vào, thu hút người nghe ngay từ đầu", "Để thay thế các trang nội dung"],
            answer: 2, explanation: "Trang tiêu đề được ví như cổng vào bài trình chiếu, thu hút sự chú ý của người nghe ngay từ đầu.",
            level: "thong-hieu", activity: "tong-ket" },
        ],
      },
    },
  ],
};

if (typeof module !== "undefined" && module.exports) module.exports = LESSON;
if (typeof window !== "undefined") window.LESSON = LESSON;
