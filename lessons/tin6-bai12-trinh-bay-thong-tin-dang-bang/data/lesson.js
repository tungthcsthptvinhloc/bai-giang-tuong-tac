/* ============================================================================
 * BÀI 12 — TRÌNH BÀY THÔNG TIN Ở DẠNG BẢNG  (Tin học 6 — Kết nối tri thức)
 * Chủ đề 5: Ứng dụng tin học.
 * Bám sát SGK trang 53–57 + Kế hoạch bài dạy của giáo viên.
 * Chỉ sửa file này để đổi nội dung. Engine app.js không cần sửa.
 * Thao tác tạo, chỉnh sửa bảng HS thực hành trên Microsoft Word thật; app dùng hình minh hoạ, trò chơi, câu hỏi, phiếu tự kiểm tra.
 * ==========================================================================*/

// ---- Hội thoại mở đầu (SGK tr.53) ----
const TRO_CHUYEN_HTML = `<div style="display:flex;flex-direction:column;gap:10px;max-width:780px;margin:0 auto">
  <div style="text-align:center;font-size:1.08rem;color:#166534">📖 Cuốn sổ lưu niệm cần bổ sung danh sách gồm ảnh và thông tin ngắn về các bạn trong lớp…</div>
  ${[["👧", "An", "Tớ đã mất khá nhiều thời gian để soạn thảo danh sách trên mấy trang văn bản. Các bạn xem thế đã được chưa?", "#fce7f3", "flex-start"],
    ["👦", "Minh", "Tớ có tham khảo cách trình bày của một số cuốn sổ lưu niệm. Họ để danh sách vào một bảng, nhìn rất đầy đủ mà cô đọng.", "#dbeafe", "flex-end"],
    ["🧑‍🎓", "Khoa", "Nhưng bảng vừa chứa hình ảnh, vừa chứa chữ có được không? Có lẽ chúng ta phải nhờ thầy cô hướng dẫn thêm.", "#dcfce7", "flex-start"]]
    .map(([ic, n, t, bg, al]) => `<div style="align-self:${al};max-width:88%;display:flex;gap:10px;align-items:flex-start"><span style="font-size:2.1rem">${ic}</span><div style="background:${bg};border-radius:16px;padding:10px 14px;font-size:1.06rem"><b>${n}:</b> ${t}</div></div>`).join("")}
</div>`;

// ---- Bảng kết quả khảo sát (SGK tr.54) ----
const KHAO_SAT = [["Kéo co", 19, 16], ["Ném bóng trúng đích", 12, 15], ["Lò cò tiếp sức", 16, 18], ["Trốn tìm", 8, 10]];
const th = (t) => `<th style="background:#86efac;border:2px solid #166534;padding:6px 10px">${t}</th>`, td = (t, al) => `<td style="border:2px solid #166534;padding:5px 10px;text-align:${al || "center"}">${t}</td>`;
const BANG_KHAO_SAT = (withTotal) => `<table style="border-collapse:collapse;margin:8px auto;font-size:1.08rem;background:#fff">
  <tr>${th("STT")}${th("Tên trò chơi")}${th("Số bạn<br>nam thích")}${th("Số bạn<br>nữ thích")}${withTotal ? th("Tổng số") : ""}</tr>
  ${KHAO_SAT.map((r, i) => `<tr>${td(i + 1)}${td(r[0], "left")}${td(r[1])}${td(r[2])}${withTotal ? td(withTotal === "?" ? "?" : r[1] + r[2]) : ""}</tr>`).join("")}</table>`;
const PHIEU_HTML = `<div style="display:flex;flex-wrap:wrap;gap:16px;justify-content:center;align-items:center">
  ${BANG_KHAO_SAT(false)}
  <div style="background:#fed7aa;border-radius:18px;padding:12px 18px;font-size:1rem;line-height:1.55;min-width:250px">Họ tên: Nguyễn Thu An<br><span style="margin-left:90px">Nam ☐ &nbsp;Nữ ☑</span><br>Chọn những trò chơi tập thể mà bạn thích:<br>1. Kéo co ☑<br>2. Ném bóng trúng đích ☐<br>3. Lò cò tiếp sức ☑<br>4. Trốn tìm ☑</div>
</div>`;

// ---- Danh sách dạng liệt kê và dạng bảng ----
const DS = [["Thu An", "18/05"], ["Lê Bình", "22/04"], ["Lê Khoa", "22/06"], ["Ngọc Lan", "15/07"], ["Thái Minh", "18/05"], ["Thủy Nguyên", "22/04"], ["Thu Phong", "18/05"], ["Lê Phương", "22/04"]];
const SO_SANH_HTML = `<div style="display:flex;flex-wrap:wrap;gap:16px;justify-content:center;margin-top:12px">
  <div style="flex:1 1 280px;max-width:380px"><div style="text-align:center;font-weight:800;color:#b91c1c;margin-bottom:6px">📄 Danh sách A — liệt kê</div>
    <div style="background:#fff;border:1px solid #cbd5e1;box-shadow:0 3px 10px rgba(0,0,0,.08);padding:12px 16px;font-size:.98rem;line-height:1.35">${DS.map((d, i) => `${i + 1}. ${d[0]}, sinh ngày ${d[1]}`).join("<br>")}<br>…</div></div>
  <div style="flex:1 1 280px;max-width:380px"><div style="text-align:center;font-weight:800;color:#15803d;margin-bottom:6px">📋 Danh sách B — dạng bảng</div>
    <table style="border-collapse:collapse;background:#fff;margin:0 auto;font-size:.95rem">${[0, 2, 4, 6].map((k) => `<tr>${[DS[k], DS[k + 1]].map((d) => `<td style="border:2px solid #16a34a;padding:6px 10px;text-align:center"><div style="font-size:1.6rem">🙂</div>${d[0]}<br><small>${d[1]}</small></td>`).join("")}</tr>`).join("")}</table></div>
</div>`;

// ---- Các thành phần của bảng ----
const THANH_PHAN_HTML = `<div style="display:flex;flex-wrap:wrap;gap:20px;justify-content:center;align-items:center">
  <table style="border-collapse:collapse;background:#fff;font-size:1rem">
    <tr>${["STT", "Tên trò chơi", "Nam", "Nữ"].map((t) => `<th style="border:2px solid #334155;background:#fde68a;padding:6px 12px">${t}</th>`).join("")}</tr>
    ${KHAO_SAT.slice(0, 3).map((r, i) => `<tr style="${i === 1 ? "background:#bfdbfe" : ""}">${[i + 1, r[0], r[1], r[2]].map((t, k) => `<td style="border:2px solid #334155;padding:5px 12px;${k === 2 ? "box-shadow:inset 0 0 0 999px rgba(134,239,172,.55);" : ""}${i === 2 && k === 3 ? "outline:4px solid #dc2626;outline-offset:-4px;" : ""}">${t}</td>`).join("")}</tr>`).join("")}
  </table>
  <div style="font-size:1.05rem;line-height:1.8"><span style="background:#fde68a;padding:2px 8px;border-radius:6px">Hàng tiêu đề</span> — ghi tên thông tin của mỗi cột<br><span style="background:#bfdbfe;padding:2px 8px;border-radius:6px">Hàng</span> — các ô nằm ngang<br><span style="background:#bbf7d0;padding:2px 8px;border-radius:6px">Cột</span> — các ô nằm dọc<br><span style="outline:3px solid #dc2626;padding:2px 8px;border-radius:6px">Ô</span> — giao của một hàng và một cột, chứa dữ liệu</div>
</div>`;

const LESSON = {
  meta: {
    subject: "Tin học", grade: "6", book: "Kết nối tri thức với cuộc sống",
    title: "Bài 12: Trình bày thông tin ở dạng bảng", unit: "Chủ đề 5 — Ứng dụng tin học",
    pages: "53–57", durationMinutes: 90,
  },
  objectives: {
    knowledge: [
      "Biết được ưu điểm của việc trình bày thông tin ở dạng bảng.",
      "Trình bày được thông tin ở dạng bảng bằng phần mềm soạn thảo văn bản: tạo bảng, nhập dữ liệu, chỉnh sửa, định dạng bảng.",
    ],
    competencies: [
      "Tự chủ và tự học; giao tiếp và hợp tác (thảo luận nhóm, phiếu học tập); giải quyết vấn đề và sáng tạo (dùng bảng tổ chức, sắp xếp thông tin).",
      "Năng lực số 3.1.TC1a: tạo nội dung số có cấu trúc dạng bảng — xác định số hàng, số cột, nhập dữ liệu đúng ô, hoàn thiện bảng.",
      "Năng lực số 5.2.TC1a, 5.2.TC1b: nhận biết khi nào cần trình bày dạng bảng; chọn phần mềm soạn thảo phù hợp để tạo bảng.",
      "Năng lực AI 6.D1.1: trình bày ý kiến cá nhân về việc nên hay không nên sử dụng AI trong một số tình huống cụ thể.",
    ],
    qualities: ["Chăm chỉ, trung thực, trách nhiệm, nhân ái khi thực hành nhóm."],
  },
  coreKnowledge: [
    "Bảng giúp trình bày thông tin một cách cô đọng; thường dùng để ghi lại dữ liệu thống kê, điều tra, khảo sát. Từ bảng dữ liệu dễ dàng tìm kiếm, so sánh, tổng hợp thông tin.",
    "Bảng gồm các hàng, các cột; giao của hàng và cột là ô. Ô có thể chứa văn bản, hình ảnh…",
    "Tạo bảng: thẻ Insert → nhóm Tables → Table → kéo thả chuột chọn số cột, số hàng (tối đa 10 cột, 8 hàng); nhiều hơn thì Insert/Table/Insert Table, nhập Number of columns, Number of rows.",
    "Chỉnh sửa bảng: Table Tools → thẻ Layout — Delete (xoá bảng, hàng, cột), Rows & Columns (chèn hàng, cột), Merge (gộp, tách ô, tách bảng), Cell Size (kích thước ô), Alignment (căn lề, hướng văn bản trong ô).",
  ],
  keywords: ["Hàng, cột, ô", "Insert → Table", "Merge Cells", "Delete Rows", "Insert Right"],
  settings: { basePoints: 100, useTimer: false, defaultTime: 60, sound: true, streakEnabled: true },

  activities: [
    /* =========================== TIẾT 1 =========================== */
    /* ===================== HĐ1: MỞ ĐẦU ===================== */
    {
      id: "mo-dau", name: "Mở đầu — Danh sách lớp trình bày sao cho đẹp? 🤔", type: "knowledge",
      goal: "Hiểu lí do nên dùng bảng để trình bày thông tin nhiều hàng, nhiều cột.",
      time: 300,
      task: "Đọc cuộc trò chuyện của An, Minh, Khoa. So sánh danh sách A (liệt kê) và danh sách B (dạng bảng) rồi trả lời câu hỏi.",
      sgkImage: "assets/sgk/sgk-trang53.jpg",
      content: { heading: "🤔 Liệt kê hay dùng bảng?", html: TRO_CHUYEN_HTML + SO_SANH_HTML },
      questions: [
        { question: "Muốn tìm nhanh ngày sinh của bạn Lê Phương, danh sách nào giúp em nhìn nhanh hơn, gọn hơn?", type: "multiple-choice",
          options: ["Danh sách A — liệt kê", "Danh sách B — dạng bảng", "Hai danh sách như nhau", "Không danh sách nào"],
          answer: 1, explanation: "Dạng bảng sắp xếp thông tin theo hàng, cột nên gọn, cô đọng, dễ tìm kiếm và so sánh.", level: "thong-hieu", activity: "mo-dau" },
        { question: "Theo em, ô của bảng có thể chứa cả hình ảnh và chữ như Khoa băn khoăn không?", type: "true-false", answer: true,
          explanation: "Có. Ô của bảng có thể chứa tất cả các loại dữ liệu như văn bản, hình ảnh,… (SGK tr.54).", level: "nhan-biet", activity: "mo-dau" },
      ],
    },
    {
      id: "hd1-danh-sach", name: "Hoạt động 1: Danh sách học sinh 👩‍🎓", type: "knowledge",
      goal: "Nhận xét hai cách trình bày danh sách học sinh trong sổ lưu niệm.",
      time: 300,
      task: "Hoạt động 1 (SGK tr.53): quan sát Hình 5.11 — trang bên trái dùng bảng, trang bên phải liệt kê lần lượt. Nhóm nhận xét hai cách trình bày và chọn cách cho sổ lưu niệm của lớp em.",
      sgkImage: "assets/sgk/hinh-5-11.jpg",
      content: {
        heading: "👩‍🎓 Hai cách trình bày danh sách",
        revealLabel: "🖼️ Xem Hình 5.11",
        blocks: [{ kind: "image", value: "assets/sgk/hinh-5-11.jpg", caption: "Hình 5.11. Danh sách lớp" }],
      },
      questions: [
        { question: "1. Nhận xét nào đúng về hai cách trình bày trong Hình 5.11?", type: "multiple-choice",
          options: ["Trang liệt kê gọn hơn, chứa được nhiều bạn hơn", "Trang dùng bảng gọn, cô đọng, một trang chứa được cả thầy chủ nhiệm và 16 bạn; trang liệt kê chỉ được vài bạn, tốn nhiều trang", "Hai cách như nhau", "Bảng không chứa được ảnh"],
          answer: 1, explanation: "Trang bên trái (bảng) chứa thầy chủ nhiệm và 16 học sinh gọn trong một trang; trang bên phải liệt kê chỉ được thầy và 4 bạn.", level: "thong-hieu", activity: "hd1-danh-sach" },
        { question: "2. Em sẽ chọn cách nào để trình bày danh sách học sinh trong sổ lưu niệm của lớp em? Vì sao?", type: "multiple-choice",
          options: ["Liệt kê, vì dài hơn thì đẹp hơn", "Dùng bảng, vì đầy đủ mà cô đọng, dễ tìm, tiết kiệm trang", "Không cần danh sách", "Viết tay rồi dán vào"],
          answer: 1, explanation: "Bảng trình bày đầy đủ thông tin (ảnh, họ tên, ngày sinh) mà vẫn cô đọng, dễ tìm kiếm, so sánh.", level: "van-dung", activity: "hd1-danh-sach" },
      ],
    },

    /* ===================== HĐ2.1: TRÌNH BÀY THÔNG TIN Ở DẠNG BẢNG ===================== */
    {
      id: "hd2-bang", name: "Hoạt động 2: Bảng kết quả khảo sát 📊", type: "knowledge",
      goal: "Đọc thông tin từ bảng; nhận ra ưu điểm của bảng khi tìm kiếm, so sánh.",
      time: 480,
      task: "Hoạt động 2 (SGK tr.54): dựa vào bảng thống kê kết quả khảo sát trò chơi tập thể, nhóm trả lời các câu hỏi.",
      sgkImage: "assets/sgk/bang-khao-sat.jpg",
      content: {
        heading: "📊 Kết quả khảo sát trò chơi tập thể yêu thích",
        html: PHIEU_HTML,
        revealLabel: "📌 Chốt kiến thức",
        blocks: [{ kind: "text", value: "Chúng ta có thể sử dụng bảng để trình bày thông tin một cách cô đọng. Bảng cũng thường được sử dụng để ghi lại dữ liệu của công việc thống kê, điều tra, khảo sát,… Từ bảng dữ liệu, em có thể dễ dàng tìm kiếm, so sánh, tổng hợp được thông tin." }],
      },
      questions: [
        { question: "1. Bảng trên gồm mấy cột, mấy hàng?", type: "multiple-choice",
          options: ["4 cột, 4 hàng", "5 cột, 4 hàng", "4 cột, 5 hàng", "5 cột, 5 hàng"],
          answer: 2, explanation: "4 cột (STT, Tên trò chơi, Số bạn nam thích, Số bạn nữ thích) và 5 hàng (1 hàng tiêu đề + 4 trò chơi).", level: "nhan-biet", activity: "hd2-bang" },
        { question: "2. Trò chơi nào được nhiều bạn nam yêu thích nhất?", type: "multiple-choice",
          options: ["Lò cò tiếp sức", "Kéo co", "Ném bóng trúng đích", "Trốn tìm"],
          answer: 1, explanation: "Cột Số bạn nam thích: Kéo co 19 — lớn nhất.", level: "nhan-biet", activity: "hd2-bang" },
        { question: "2. Trò chơi nào được nhiều bạn nữ yêu thích nhất?", type: "multiple-choice",
          options: ["Kéo co", "Ném bóng trúng đích", "Trốn tìm", "Lò cò tiếp sức"],
          answer: 3, explanation: "Cột Số bạn nữ thích: Lò cò tiếp sức 18 — lớn nhất.", level: "nhan-biet", activity: "hd2-bang" },
        { question: "2. Trò chơi nào được học sinh cả lớp yêu thích nhất?", type: "multiple-choice",
          options: ["Kéo co", "Lò cò tiếp sức", "Ném bóng trúng đích", "Trốn tìm"],
          answer: 0, explanation: "Cộng nam + nữ: Kéo co 19 + 16 = 35 · Lò cò tiếp sức 16 + 18 = 34 · Ném bóng 12 + 15 = 27 · Trốn tìm 8 + 10 = 18 → Kéo co.", level: "van-dung", activity: "hd2-bang" },
        { question: "3. Nếu không dùng bảng biểu diễn thì việc so sánh và tìm kiếm có dễ không?", type: "multiple-choice",
          options: ["Dễ hơn nhiều", "Không dễ — rất khó tìm kiếm, so sánh, tổng hợp thông tin", "Như nhau", "Không thể so sánh được"],
          answer: 1, explanation: "Nếu viết thành đoạn văn dài, em phải đọc hết mới tìm được số liệu. Bảng giúp tìm kiếm, so sánh, tổng hợp nhanh.", level: "thong-hieu", activity: "hd2-bang" },
      ],
      remember: ["Bảng trình bày thông tin cô đọng; thường dùng ghi dữ liệu thống kê, điều tra, khảo sát. Từ bảng dữ liệu dễ dàng tìm kiếm, so sánh, tổng hợp thông tin."],
    },
    {
      id: "thanh-phan-bang", name: "Các thành phần của bảng 🧩", type: "matching",
      goal: "Nhận biết hàng, cột, ô và hàng tiêu đề của bảng.",
      time: 180,
      task: "Quan sát bảng minh hoạ (hàng tiêu đề vàng, một hàng xanh dương, một cột xanh lá, một ô viền đỏ), ghép mỗi thành phần của bảng với mô tả đúng. Làm hết rồi bấm Nộp bài.",
      pairs: [
        { left: "Hàng", right: "Gồm các ô nằm ngang trên cùng một dòng" },
        { left: "Cột", right: "Gồm các ô nằm dọc từ trên xuống dưới" },
        { left: "Ô", right: "Giao của một hàng và một cột, nơi nhập dữ liệu" },
        { left: "Hàng tiêu đề", right: "Hàng đầu tiên, ghi tên thông tin của mỗi cột" },
      ],
      explanation: "Bảng gồm các hàng (ngang) và các cột (dọc); giao của hàng và cột là ô; hàng đầu thường là hàng tiêu đề.",
      html: THANH_PHAN_HTML,
    },

    /* ===================== HĐ2.2: TẠO BẢNG ===================== */
    {
      id: "tao-bang", name: "Tạo bảng trong phần mềm soạn thảo 🛠️", type: "knowledge",
      goal: "Biết các bước tạo bảng, nhập dữ liệu và di chuyển trong bảng.",
      time: 480,
      task: "Nhóm quan sát Hình 5.12, 5.13, 5.14: nêu các bước tạo bảng. Nếu bảng cần nhiều hơn 10 cột, 8 hàng thì em làm thế nào?",
      sgkImage: "assets/sgk/hinh-5-12-13.jpg",
      content: {
        heading: "🛠️ Tạo bảng",
        prompt: "Trong phần mềm soạn thảo văn bản, các lệnh tạo bảng nằm trong nhóm lệnh Tables của thẻ Insert.",
        revealLabel: "📖 Các bước tạo bảng (SGK tr.54–55)",
        blocks: [
          { kind: "image", value: "assets/sgk/hinh-5-12-13.jpg", caption: "Hình 5.12. Tạo bảng · Hình 5.13. Chọn số cột, hàng của bảng" },
          { kind: "list", value: ["Chọn thẻ Insert → Table → kéo thả chuột chọn số hàng, số cột. Bảng mới được chèn vào vị trí con trỏ soạn thảo.", "Đưa dữ liệu vào bảng: đặt con trỏ vào ô và nhập. Ô có thể chứa văn bản, hình ảnh,…", "Di chuyển con trỏ: dùng các phím mũi tên ↑ ↓ → ← hoặc dùng chuột.", "Căn chỉnh lề dữ liệu trong ô tương tự như căn lề văn bản.", "Lưu ý: cách trên chỉ tạo được bảng tối đa 10 cột, 8 hàng. Muốn nhiều hơn: Insert/Table/Insert Table → nhập Number of columns (số cột), Number of rows (số hàng) → OK."] },
          { kind: "image", value: "assets/sgk/hinh-5-14.jpg", caption: "Hình 5.14. Nhập số cột, hàng" },
        ],
      },
      questions: [
        { question: "Các lệnh tạo bảng nằm ở đâu?", type: "multiple-choice",
          options: ["Thẻ Home, nhóm Paragraph", "Thẻ Insert, nhóm Tables", "Thẻ Page Layout, nhóm Page Setup", "Thẻ File, lệnh Print"],
          answer: 1, explanation: "Tạo bảng: thẻ Insert → nhóm Tables → Table.", level: "nhan-biet", activity: "tao-bang" },
        { question: "Trong Hình 5.13, dòng chữ “4x8 Table” cho biết bảng sẽ có:", type: "multiple-choice", sgkImage: "assets/sgk/hinh-5-12-13.jpg",
          options: ["4 cột, 8 hàng", "8 cột, 4 hàng", "4 cột, 4 hàng", "8 cột, 8 hàng"],
          answer: 0, explanation: "Số đứng trước là số cột (columns), số đứng sau là số hàng (rows): 4 cột, 8 hàng.", level: "thong-hieu", activity: "tao-bang" },
        { question: "Em cần tạo bảng danh sách lớp có 4 cột và 36 hàng. Em làm thế nào?", type: "multiple-choice",
          options: ["Kéo thả chuột chọn 4 cột, 36 hàng trên lưới", "Chọn Insert/Table/Insert Table, nhập 4 cột, 36 hàng", "Tạo 36 bảng nhỏ", "Không tạo được"],
          answer: 1, explanation: "Lưới kéo thả chỉ tối đa 10 cột, 8 hàng. Bảng lớn hơn → hộp thoại Insert Table.", level: "van-dung", activity: "tao-bang" },
        { question: "Để di chuyển con trỏ soạn thảo sang ô bên phải trong bảng, em có thể:", type: "multiple-choice",
          options: ["Nhấn phím mũi tên →", "Nhấn phím Delete", "Chọn File/Save", "Nháy thẻ Insert"],
          answer: 0, explanation: "Dùng các phím mũi tên ↑ ↓ → ← hoặc dùng chuột để di chuyển con trỏ giữa các ô.", level: "nhan-biet", activity: "tao-bang" },
      ],
      remember: ["Tạo bảng: Insert → Table → kéo thả chọn số cột, số hàng (tối đa 10 cột, 8 hàng); bảng lớn hơn: Insert/Table/Insert Table."],
    },
    {
      id: "sap-xep-tao-bang", name: "Câu hỏi SGK: Sắp xếp các bước tạo bảng 🔢", type: "ordering",
      goal: "Nắm thứ tự thao tác tạo bảng.",
      time: 120,
      task: "Câu hỏi 1 (SGK tr.55): sắp xếp lại thứ tự các bước để được thao tác tạo bảng đúng. Xếp xong bấm Nộp bài.",
      sgkImage: "assets/sgk/cau-hoi-tr55.jpg",
      steps: [
        "c) Chọn Insert",
        "a) Chọn mũi tên nhỏ bên dưới Table",
        "b) Di chuyển chuột để chọn số hàng, số cột",
      ],
      explanation: "Thứ tự đúng: c → a → b.",
    },
    {
      id: "cau-hoi-tr55", name: "Câu hỏi SGK: Insert Table & xoá hàng ✅", type: "knowledge",
      goal: "Củng cố cách tạo bảng bằng hộp thoại và lệnh xoá hàng.",
      time: 180,
      task: "Trả lời câu hỏi 2 (SGK tr.55) và câu hỏi về lệnh xoá hàng.",
      sgkImage: "assets/sgk/cau-hoi-tr55.jpg",
      questions: [
        { question: "2. Bạn An nhập Number of columns: 4, Number of rows: 35 để tạo bảng. Bảng được tạo sẽ có:", type: "multiple-choice", sgkImage: "assets/sgk/cau-hoi-tr55.jpg",
          options: ["4 cột, 35 hàng", "35 cột, 35 hàng", "35 cột, 4 hàng", "4 cột, 4 hàng"],
          answer: 0, explanation: "Number of columns = số cột = 4; Number of rows = số hàng = 35.", level: "thong-hieu", activity: "cau-hoi-tr55" },
        { question: "Muốn xoá một số hàng trong bảng, sau khi chọn các hàng cần xoá, em thực hiện lệnh nào?", type: "multiple-choice", sgkImage: "assets/sgk/cau-hoi-xoa-hang.jpg",
          options: ["Delete Cells", "Delete Columns", "Delete Rows", "Delete Table"],
          answer: 2, explanation: "Delete Rows: xoá hàng. Delete Columns: xoá cột. Delete Table: xoá cả bảng. Delete Cells: xoá ô.", level: "thong-hieu", activity: "cau-hoi-tr55" },
      ],
    },

    /* =========================== TIẾT 2 =========================== */
    /* ===================== HĐ2.3: ĐỊNH DẠNG BẢNG ===================== */
    {
      id: "dinh-dang-bang", name: "Định dạng bảng — thẻ Layout 🎨", type: "knowledge",
      goal: "Biết các nhóm lệnh chỉnh sửa bảng trong thẻ Layout.",
      time: 360,
      task: "Nhóm quan sát Hình 5.16: nêu cách định dạng, chỉnh sửa bảng.",
      sgkImage: "assets/sgk/hinh-5-16.jpg",
      content: {
        heading: "🎨 Chỉnh sửa bảng",
        prompt: "Khi em đặt con trỏ soạn thảo trong bảng, nhóm thẻ Table Tools sẽ xuất hiện giúp em định dạng bảng. Để chỉnh sửa bảng, em chọn thẻ Layout.",
        revealLabel: "🖼️ Hình 5.16. Chỉnh sửa bảng",
        blocks: [
          { kind: "image", value: "assets/sgk/hinh-5-16.jpg", caption: "Hình 5.16. Chỉnh sửa bảng" },
          { kind: "list", value: ["Delete: xoá bảng, xoá hàng, cột.", "Rows & Columns (Insert Above, Insert Below, Insert Left, Insert Right): chèn thêm hàng, cột.", "Merge (Merge Cells, Split Cells, Split Table): gộp, tách ô, tách bảng.", "Cell Size: điều chỉnh kích thước ô.", "Alignment: căn chỉnh lề, hướng của văn bản trong ô."] },
        ],
      },
      questions: [
        { question: "Nhóm thẻ Table Tools xuất hiện khi nào?", type: "multiple-choice",
          options: ["Khi mở phần mềm", "Khi đặt con trỏ soạn thảo trong bảng", "Khi lưu tệp", "Khi in văn bản"],
          answer: 1, explanation: "Đặt con trỏ trong bảng → Table Tools xuất hiện; chọn thẻ Layout để chỉnh sửa bảng.", level: "nhan-biet", activity: "dinh-dang-bang" },
        { question: "Em muốn chèn thêm một hàng ngay phía dưới hàng đang chọn. Em dùng lệnh:", type: "multiple-choice",
          options: ["Insert Above", "Insert Left", "Insert Right", "Insert Below"],
          answer: 3, explanation: "Insert Below: chèn hàng bên dưới · Insert Above: bên trên · Insert Left/Right: chèn cột bên trái/phải.", level: "thong-hieu", activity: "dinh-dang-bang" },
      ],
    },
    {
      id: "ghep-nhom-lenh", name: "Ghép nhóm lệnh với tác dụng 🧩", type: "matching",
      goal: "Nhớ tác dụng các nhóm lệnh trong thẻ Layout.",
      time: 180,
      task: "Ghép mỗi lệnh / nhóm lệnh trong thẻ Layout với tác dụng của nó. Làm hết rồi bấm Nộp bài.",
      sgkImage: "assets/sgk/hinh-5-16.jpg",
      pairs: [
        { left: "Delete", right: "Xoá bảng, xoá hàng, cột" },
        { left: "Rows & Columns", right: "Chèn thêm hàng, cột" },
        { left: "Merge", right: "Gộp, tách ô, tách bảng" },
        { left: "Cell Size", right: "Điều chỉnh kích thước ô" },
        { left: "Alignment", right: "Căn chỉnh lề, hướng của văn bản trong ô" },
      ],
      explanation: "Hình 5.16: Delete · Rows & Columns · Merge · Cell Size · Alignment.",
    },

    /* ===================== HĐ2.4: THỰC HÀNH TẠO BẢNG ===================== */
    {
      id: "cac-buoc-thuc-hanh", name: "Nhiệm vụ thực hành — Sắp xếp các bước 🔢", type: "ordering",
      goal: "Nắm trình tự tạo bảng danh sách thành viên như Hình 5.11.",
      time: 150,
      task: "Sắp xếp các bước tạo bảng danh sách thành viên của lớp như minh hoạ Hình 5.11 (SGK tr.56–57). Xếp xong bấm Nộp bài.",
      sgkImage: "assets/sgk/sgk-trang56.jpg",
      steps: [
        "Tạo bảng 4 cột, 4 hàng (Insert → Table)",
        "Kéo thả chuột chọn bốn ô ở góc trên bên trái",
        "Chọn thẻ Layout, trong nhóm Merge chọn Merge Cells để gộp thành một ô to",
        "Kéo đường biên để chỉnh độ rộng cột, độ cao hàng",
        "Nhập ảnh, họ tên, ngày sinh của giáo viên chủ nhiệm và các bạn",
        "Chèn thêm hàng, cột để bảng chứa đủ các thành viên trong lớp",
      ],
      explanation: "Tạo bảng → chọn 4 ô → Merge Cells → chỉnh kích thước → nhập thông tin → chèn thêm hàng, cột.",
    },
    {
      id: "thuc-hanh", name: "Thực hành: Bảng danh sách thành viên lớp em 📋", type: "knowledge",
      goal: "Tạo, chỉnh sửa, định dạng bảng danh sách thành viên lớp trên Microsoft Word.",
      time: 1200,
      task: "Trên Microsoft Word: tạo bảng danh sách thành viên của lớp như Hình 5.11 — ảnh, họ tên, ngày sinh của giáo viên chủ nhiệm và từng bạn; gộp ô cho thầy/cô chủ nhiệm; chỉnh kích thước ô; chèn thêm hàng, cột cho đủ thành viên. Trả lời câu hỏi để kiểm tra lại thao tác.",
      sgkImage: "assets/sgk/hinh-bang-lop.jpg",
      content: {
        heading: "📋 Thực hành tạo bảng",
        revealLabel: "📖 Hướng dẫn a), b), c) (SGK tr.56–57)",
        blocks: [
          { kind: "list", value: ["a) Tạo bảng: bảng ở Hình 5.11 gồm 4 cột và 4 hàng (có thể ước tính số cột, số hàng theo số thành viên của lớp, hoặc tạo hai bảng: giáo viên và học sinh).", "b) Chỉnh sửa bảng: kéo thả chọn bốn ô → Table Tools → Layout → Merge → Merge Cells. Chỉnh độ rộng cột, độ cao hàng: đưa con trỏ chuột vào đường biên đến khi thành mũi tên hai chiều rồi kéo thả.", "c) Nhập thông tin: ảnh, họ tên, ngày sinh; có thể bổ sung địa chỉ, sở thích…; chèn thêm hàng, cột để có đủ thành viên."] },
          { kind: "image", value: "assets/sgk/hinh-5-17.jpg", caption: "Hình 5.17. Kết quả sau khi tạo bảng" },
          { kind: "image", value: "assets/sgk/hinh-5-18-20.jpg", caption: "Hình 5.18. Chọn ô · Hình 5.19. Chọn lệnh gộp ô · Hình 5.20. Kết quả gộp ô" },
          { kind: "image", value: "assets/sgk/hinh-5-21.jpg", caption: "Hình 5.21. Thay đổi kích cỡ cột và hàng" },
          { kind: "image", value: "assets/sgk/hinh-bang-lop.jpg", caption: "Bảng sau khi nhập thông tin" },
        ],
      },
      questions: [
        { question: "Phần thông tin của thầy giáo chủ nhiệm được trình bày trong một ô to, gộp từ 4 ô nhỏ. Em dùng lệnh nào?", type: "multiple-choice", sgkImage: "assets/sgk/hinh-5-18-20.jpg",
          options: ["Split Cells", "Merge Cells", "Delete Cells", "Insert Above"],
          answer: 1, explanation: "Chọn 4 ô → Layout → nhóm Merge → Merge Cells (gộp ô). Split Cells là tách ô.", level: "thong-hieu", activity: "thuc-hanh" },
        { question: "Muốn cột rộng hơn, em đưa con trỏ chuột vào đường biên của cột cho đến khi:", type: "multiple-choice", sgkImage: "assets/sgk/hinh-5-21.jpg",
          options: ["Con trỏ chuyển thành mũi tên hai chiều rồi kéo thả chuột", "Con trỏ biến mất", "Hiện hộp thoại Insert Table", "Bảng tự đổi màu"],
          answer: 0, explanation: "Con trỏ chuột thành dạng mũi tên hai chiều → kéo thả để chỉnh độ rộng cột hay độ cao hàng.", level: "thong-hieu", activity: "thuc-hanh" },
        { question: "Lớp em có 32 bạn, bảng hiện có ít hàng. Để bảng chứa đủ các thành viên, em làm gì?", type: "multiple-choice",
          options: ["Xoá bảng tạo lại từ đầu", "Chèn thêm hàng (Insert Above/Below) hoặc cột (Insert Left/Right)", "Gộp tất cả các ô", "Thu nhỏ chữ"],
          answer: 1, explanation: "Dùng nhóm lệnh Rows & Columns trong thẻ Layout để chèn thêm hàng, cột.", level: "van-dung", activity: "thuc-hanh" },
      ],
      remember: ["Gộp ô: chọn các ô → Layout → Merge Cells · Chỉnh kích thước: kéo đường biên cột/hàng · Chèn hàng, cột: Rows & Columns."],
    },
    {
      id: "tu-kiem-tra", name: "Phiếu tự kiểm tra bảng danh sách lớp 📋", type: "checklist",
      goal: "Tự đánh giá sản phẩm thực hành trên Word.",
      time: 180,
      task: "Đối chiếu bảng danh sách thành viên trên Word, tick từng việc vào cột Đã làm hoặc Chưa làm, ghi lỗi thường gặp rồi gửi cho thầy/cô.",
      columns: ["✅ Đã làm", "⏳ Chưa làm"],
      sections: [
        { title: "🛠️ TẠO BẢNG", items: [
          "Tạo được bảng với số cột, số hàng phù hợp",
          "Gộp 4 ô thành một ô to cho giáo viên chủ nhiệm (Merge Cells)",
        ] },
        { title: "📝 NHẬP THÔNG TIN", items: [
          "Mỗi ô có ảnh, họ tên, ngày sinh",
          "Chèn thêm hàng, cột cho đủ các thành viên",
        ] },
        { title: "🎨 ĐỊNH DẠNG", items: [
          "Chỉnh độ rộng cột, độ cao hàng hợp lí",
          "Căn giữa dữ liệu trong ô",
          "Lưu tệp văn bản",
        ] },
      ],
      note: "Em gặp khó khăn gì khi tạo, chỉnh sửa bảng? Em đã khắc phục thế nào?",
      modelAnswer: [
        "Khó khăn thường gặp: nhầm số cột với số hàng; chọn chưa đủ ô trước khi gộp; ảnh quá to làm vỡ bảng; nhầm Delete Rows với Delete Columns.",
        "Khắc phục: nhớ “cột trước, hàng sau” (4x8 = 4 cột, 8 hàng); chọn đủ ô rồi mới Merge Cells; thu nhỏ ảnh trước khi chèn; đọc kĩ tên lệnh trước khi nháy.",
      ],
    },

    /* ===================== HĐ3: LUYỆN TẬP ===================== */
    {
      id: "luyen-tap-1", name: "Luyện tập 1: Thêm cột Tổng số ➕", type: "knowledge",
      goal: "Chèn cột và điền số liệu cho bảng kết quả khảo sát.",
      time: 300,
      task: "Luyện tập 1 (SGK tr.57): soạn thảo bảng kết quả khảo sát trên Word; chèn cột Tổng số (số bạn nam + số bạn nữ cùng thích trò chơi) vào vị trí hợp lí và điền số liệu.",
      sgkImage: "assets/sgk/bang-khao-sat.jpg",
      content: { heading: "➕ Bảng khảo sát có thêm cột Tổng số", html: BANG_KHAO_SAT("?") },
      questions: [
        { question: "Em nên chèn cột Tổng số vào vị trí nào của bảng?", type: "multiple-choice",
          options: ["Trước cột STT", "Giữa cột STT và cột Tên trò chơi", "Sau cột Số bạn nữ thích (cuối bảng)", "Không cần chèn"],
          answer: 2, explanation: "Tổng số = nam + nữ nên đặt ngay sau hai cột này, ở cuối bảng: chọn cột Số bạn nữ thích → Insert Right.", level: "van-dung", activity: "luyen-tap-1" },
        { question: "Lệnh nào chèn một cột mới vào bên phải cột đang chọn?", type: "multiple-choice",
          options: ["Insert Left", "Insert Below", "Insert Right", "Merge Cells"],
          answer: 2, explanation: "Insert Right: chèn cột bên phải · Insert Left: chèn cột bên trái.", level: "nhan-biet", activity: "luyen-tap-1" },
      ],
    },
    {
      id: "tong-so", name: "Điền số liệu cột Tổng số 🔢", type: "fillblank",
      goal: "Tính và điền số liệu cho cột Tổng số.",
      time: 180,
      task: "Tính Tổng số = Số bạn nam thích + Số bạn nữ thích cho từng trò chơi rồi điền vào chỗ trống. Điền xong bấm Kiểm tra.",
      text: "Kéo co: 19 + 16 = {{}}\nNém bóng trúng đích: 12 + 15 = {{}}\nLò cò tiếp sức: 16 + 18 = {{}}\nTrốn tìm: 8 + 10 = {{}}",
      answers: [["35"], ["27"], ["34"], ["18"]],
      explanation: "Cột Tổng số: 35 · 27 · 34 · 18 — Kéo co được cả lớp yêu thích nhất.",
    },
    {
      id: "luyen-tap-2", name: "Luyện tập 2: Bản tin “Phong trào đọc sách” 📚", type: "knowledge",
      goal: "Trình bày cô đọng nội dung bản tin bằng bảng; bổ sung hàng dữ liệu.",
      time: 300,
      task: "Luyện tập 2 (SGK tr.57): đọc bản tin, xác định bảng cần những cột nào; bổ sung thông tin năm 2016 vào bảng. Tạo bảng trên Word.",
      sgkImage: "assets/sgk/ban-tin.jpg",
      content: {
        heading: "📚 Bản tin “Phong trào đọc sách”",
        prompt: "Trong những năm gần đây, số học sinh khối 6 của nhà trường yêu thích đọc sách đã tăng lên rõ rệt. Kết quả khảo sát của năm 2017 cho thấy, số học sinh yêu thích đọc sách là 230 em, chiếm 52% tổng số học sinh của khối. Số liệu này của các năm 2018 và 2019 lần lượt là 256 em (chiếm 64%) và 345 em (chiếm 78%). Phong trào đọc sách đang ngày càng được nhiều học sinh tích cực hưởng ứng.",
        revealLabel: "📋 Gợi ý bảng",
        blocks: [{ kind: "html", value: `<table style="border-collapse:collapse;margin:0 auto;background:#fff;font-size:1.05rem"><tr>${["Năm", "Số học sinh yêu thích đọc sách", "Tỉ lệ so với tổng số học sinh khối 6"].map(th).join("")}</tr>${[["2016", 175, "45%"], ["2017", 230, "52%"], ["2018", 256, "64%"], ["2019", 345, "78%"]].map((r, i) => `<tr style="${i ? "" : "background:#fef9c3"}">${r.map((t) => td(t)).join("")}</tr>`).join("")}</table><p style="text-align:center;color:#475569">Hàng năm 2016 (tô vàng) được bổ sung ở câu b.</p>` }],
      },
      questions: [
        { question: "a) Bảng trình bày cô đọng bản tin nên có những cột nào?", type: "multiple-choice",
          options: ["Năm · Số học sinh yêu thích đọc sách · Tỉ lệ (%)", "Họ tên · Ngày sinh · Ảnh", "Tên sách · Tác giả", "STT · Tên trò chơi"],
          answer: 0, explanation: "Mỗi năm có hai số liệu: số học sinh yêu thích đọc sách và tỉ lệ so với tổng số học sinh khối → 3 cột.", level: "van-dung", activity: "luyen-tap-2" },
        { question: "b) Bổ sung năm 2016 (175 em, 45%) sao cho các năm vẫn theo thứ tự tăng dần. Em chọn hàng năm 2017 rồi dùng lệnh:", type: "multiple-choice",
          options: ["Insert Below", "Insert Above", "Insert Right", "Delete Rows"],
          answer: 1, explanation: "Năm 2016 đứng trước 2017 → chèn hàng phía trên hàng 2017 (Insert Above).", level: "van-dung-cao", activity: "luyen-tap-2" },
      ],
    },

    /* ===================== HĐ4: VẬN DỤNG ===================== */
    {
      id: "van-dung", name: "Vận dụng: Trình bày dưới dạng bảng 🗓️", type: "vandung",
      goal: "Vận dụng bảng để trình bày thông tin trong học tập, đời sống; nêu ý kiến về việc dùng AI.",
      time: 300,
      task: "Vận dụng (SGK tr.57): nhóm thảo luận, gửi câu trả lời cho thầy/cô; tạo các bảng trên Word (có thể làm ở nhà).",
      intro: "Gửi câu trả lời cho thầy/cô rồi bấm để xem gợi ý.",
      cases: [
        { question: "1. Thời khoá biểu của lớp và thời gian biểu các ngày trong tuần của em: mỗi bảng cần bao nhiêu cột, bao nhiêu hàng? Hàng, cột tiêu đề ghi gì?",
          answer: "Ví dụ thời khoá biểu: cột đầu ghi Tiết (1–5), các cột tiếp theo là Thứ Hai → Thứ Bảy (7 cột); hàng tiêu đề + 5 tiết buổi sáng (6 hàng), có thể thêm hàng buổi chiều. Thời gian biểu: cột Thời gian, các cột Thứ Hai → Chủ nhật; mỗi hàng một khung giờ (thức dậy, đi học, học bài, thể thao…)." },
        { question: "2. Phần nội dung nào của cuốn sổ lưu niệm nên được trình bày ở dạng bảng thì hợp lí hơn? Vì sao?",
          answer: "Ví dụ: danh sách thành viên (ảnh, họ tên, ngày sinh, sở thích), danh sách giáo viên bộ môn, lịch các hoạt động – sự kiện của lớp, thành tích thi đua theo tháng… vì có nhiều mục cùng loại thông tin, dạng bảng giúp cô đọng, dễ tìm, dễ so sánh." },
        { question: "3. Bạn Nam định nhờ một công cụ AI tự tạo hộ bảng danh sách lớp và điền luôn ngày sinh, địa chỉ của các bạn. Theo em, có nên làm như vậy không? Vì sao?",
          answer: "Không nên nhờ AI điền thông tin của các bạn: AI không biết thông tin thật (dễ bịa sai), và nhập họ tên, địa chỉ, ngày sinh của bạn bè vào công cụ AI là để lộ thông tin cá nhân. Có thể nhờ AI gợi ý cách thiết kế bảng (nên có những cột nào), còn dữ liệu thì tự thu thập, kiểm tra và nhập." },
      ],
    },

    /* ===================== TỔNG KẾT ===================== */
    {
      id: "tong-ket", name: "Tổng kết", type: "summary",
      task: "Cả lớp nhắc lại kiến thức trọng tâm và làm thử thách cuối. Dặn dò: hoàn thiện bảng thời khoá biểu, thời gian biểu trên Word.",
      content: {
        learned: [
          "Bảng trình bày thông tin cô đọng, dễ tìm kiếm, so sánh, tổng hợp.",
          "Bảng gồm hàng, cột, ô; ô chứa được văn bản, hình ảnh.",
          "Tạo bảng: Insert → Table (tối đa 10 × 8) hoặc Insert Table (nhập số cột, số hàng).",
          "Chỉnh sửa bảng: Layout — Delete, Rows & Columns, Merge, Cell Size, Alignment.",
        ],
        challenge: [
          { question: "Bảng có 5 cột, 6 hàng. Em chèn thêm 1 cột rồi xoá 2 hàng. Bảng còn lại:", type: "multiple-choice",
            options: ["6 cột, 4 hàng", "5 cột, 4 hàng", "6 cột, 8 hàng", "4 cột, 6 hàng"],
            answer: 0, explanation: "Cột: 5 + 1 = 6 · Hàng: 6 − 2 = 4.", level: "van-dung-cao", activity: "tong-ket" },
          { question: "Muốn tách một ô thành nhiều ô nhỏ, em dùng lệnh nào trong nhóm Merge?", type: "multiple-choice",
            options: ["Merge Cells", "Delete Cells", "Split Cells", "Insert Below"],
            answer: 2, explanation: "Split Cells: tách ô · Merge Cells: gộp ô · Split Table: tách bảng.", level: "thong-hieu", activity: "tong-ket" },
        ],
      },
    },
  ],
};

if (typeof module !== "undefined" && module.exports) module.exports = LESSON;
if (typeof window !== "undefined") window.LESSON = LESSON;
