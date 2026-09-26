/* ============================================================================
 * BÀI 13 — THỰC HÀNH: TÌM KIẾM VÀ THAY THẾ  (Tin học 6 — Kết nối tri thức)
 * Chủ đề 5: Ứng dụng tin học.
 * Bám sát SGK trang 58–60 + Kế hoạch bài dạy của giáo viên. Thời lượng: 1 tiết.
 * Chỉ sửa file này để đổi nội dung. Engine app.js không cần sửa.
 * Thao tác Tìm kiếm, Thay thế HS thực hành trên Microsoft Word thật (theo lựa chọn của GV); app dùng hình minh hoạ, trò chơi, câu hỏi, phiếu tự kiểm tra.
 * ==========================================================================*/

// ---- Câu chuyện mở đầu (SGK tr.58) ----
const CAU_CHUYEN_HTML = `<div style="display:flex;flex-wrap:wrap;gap:14px;align-items:center;justify-content:center;max-width:900px;margin:0 auto">
  <div style="font-size:3.2rem;line-height:1">👧🍉🍨</div>
  <div style="flex:1 1 420px;background:#fdf2f8;border:2px solid #f9a8d4;border-radius:18px;padding:12px 18px;font-size:1.08rem;text-align:left">
    <b>An</b> đã học được cách làm <b style="color:#db2777">kem sữa chua dưa hấu</b> rất ngon và mời hai bạn <b>Khoa</b>, <b>Minh</b> cùng thưởng thức. An dùng phần mềm soạn thảo văn bản để lưu lại công thức.<br>
    <b>Minh</b> xin công thức nhưng muốn đổi thành món <b style="color:#ea580c">kem sữa chua xoài</b> 🥭. Em giúp An sửa công thức nhé!</div>
</div>`;

// ---- Công thức làm kem (SGK Hình 5.22), vẽ lại cho rõ trên máy chiếu ----
const congThuc = (qua, mau, danhDau) => {
  const q = (t) => danhDau ? `<mark style="background:${mau};color:#fff;border-radius:4px;padding:0 3px">${t}</mark>` : t;
  const cap = qua.charAt(0).toUpperCase() + qua.slice(1);
  return `<div style="flex:0 1 330px;background:${danhDau ? "#fff" : "#fce7f3"};border:3px solid ${mau};border-radius:22px;padding:12px 20px;font-size:1rem;line-height:1.45;text-align:left">
    <div style="text-align:center;font-weight:800;font-size:1.2rem;color:#db2777">Kem sữa chua ${q(qua)}</div>
    <div style="text-align:center;font-weight:700;color:#16a34a">Nguyên liệu</div>
    ${q(cap)}: 250 g<br>Sữa chua: 100 g<br>Mật ong: 1 thìa cà phê
    <div style="text-align:center;font-weight:700;color:#16a34a">Dụng cụ</div>
    1 tô to<br>4 khuôn làm kem
    <div style="text-align:center;font-weight:700;color:#16a34a">Hướng dẫn</div>
    ❶ Cho ${q(qua)} vào tô.<br>❷ Nghiền nát ${q(qua)}.<br>❸ Cho sữa chua và mật ong vào tô.<br>❹ Trộn đều hỗn hợp.<br>❺ Cho hỗn hợp vào khuôn làm kem.<br>❻ Đặt khuôn kem vào ngăn đá tủ lạnh trong thời gian ít nhất 4 tiếng.<br>❼ Lấy kem ra thưởng thức.</div>`;
};
const CONG_THUC_HTML = `<div style="display:flex;justify-content:center;margin-top:12px">${congThuc("dưa hấu", "#f472b6", false)}</div>`;
const TRUOC_SAU_HTML = `<div style="display:flex;flex-wrap:wrap;gap:14px;justify-content:center;align-items:center">
  ${congThuc("dưa hấu", "#db2777", true)}
  <div style="text-align:center;font-weight:800;color:#9a3412;font-size:1.05rem">🔄 Replace All<br><span style="font-size:2.2rem">➡️</span><br>4 chỗ được thay</div>
  ${congThuc("xoài", "#ea580c", true)}</div>`;

// ---- Sửa bằng tay hay dùng công cụ? ----
const SO_SANH_HTML = `<div style="display:flex;flex-wrap:wrap;gap:14px;justify-content:center">
  <div style="flex:1 1 280px;max-width:420px;border:3px solid #64748b;border-radius:16px;padding:12px 16px;background:#fff;text-align:left">
    <b style="color:#475569;font-size:1.15rem">🐢 Sửa bằng tay</b><br>Tự dò tìm từng chỗ “dưa hấu” → chọn → gõ “xoài”.<br>Văn bản ngắn: làm được. Văn bản dài hàng trăm trang: <b>rất lâu</b> và <b>dễ bỏ sót</b>.</div>
  <div style="flex:1 1 280px;max-width:420px;border:3px solid #ea580c;border-radius:16px;padding:12px 16px;background:#fff7ed;text-align:left">
    <b style="color:#ea580c;font-size:1.15rem">⚡ Công cụ Tìm kiếm và Thay thế</b><br>Máy tìm giúp mọi chỗ “dưa hấu” và thay bằng “xoài”.<br><b>Nhanh chóng</b>, <b>chính xác</b>, tiết kiệm thời gian và <b>không bỏ sót</b> từ nào.</div>
</div>`;

// ---- Các bước (SGK Hình 5.23, 5.24) ----
const buoc = (arr, mau) => `<div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:center">${arr.map((t, i) =>
  `<div style="flex:1 1 200px;max-width:280px;background:#fff;border:3px solid ${mau};border-radius:16px;padding:10px 14px;font-size:1.02rem;text-align:left"><div style="width:34px;height:34px;border-radius:50%;background:${mau};color:#fff;font-weight:900;display:flex;align-items:center;justify-content:center;margin-bottom:6px">${i + 1}</div>${t}</div>`).join("")}</div>`;
const BUOC_TIM_HTML = buoc([
  "Nháy chuột vào thẻ <b>Home</b>.",
  "Trong nhóm lệnh <b>Editing</b>, chọn <b>Find</b> 🔍 — ngăn <b>Navigation</b> hiện ra bên trái.",
  "Gõ từ, cụm từ cần tìm rồi nhấn phím <b>Enter</b>.",
], "#0284c7");
const KET_QUA_TIM_HTML = `<div style="display:flex;flex-wrap:wrap;gap:12px;justify-content:center;margin-top:10px">
  <div style="flex:1 1 260px;max-width:400px;background:#e0f2fe;border-radius:14px;padding:10px 14px;text-align:left">🟨 Các từ, cụm từ tìm thấy được <b>đánh dấu</b> trong văn bản.</div>
  <div style="flex:1 1 260px;max-width:400px;background:#e0f2fe;border-radius:14px;padding:10px 14px;text-align:left">🔗 Ngăn Navigation cho biết <b>số kết quả</b> (ví dụ <i>4 matches</i>) và <b>liên kết</b> đến từng chỗ tìm thấy — nháy vào liên kết để đến đúng chỗ đó.</div></div>`;
const BUOC_THAY_HTML = buoc([
  "Trong nhóm lệnh <b>Editing</b> (thẻ Home), chọn <b>Replace</b> — hộp thoại <b>Find and Replace</b> hiện ra.",
  "Ô <b>Find what</b>: gõ từ, cụm từ cần tìm (<i>dưa hấu</i>).",
  "Ô <b>Replace with</b>: gõ từ, cụm từ thay thế (<i>xoài</i>).",
  "Nháy <b>Replace</b> để thay lần lượt từng chỗ, hoặc <b>Replace All</b> để thay tất cả trong toàn bộ văn bản.",
], "#ea580c");
const REPLACE_HTML = `<div style="display:flex;flex-wrap:wrap;gap:12px;justify-content:center;margin-top:10px">
  <div style="flex:1 1 260px;max-width:400px;background:#fff7ed;border:2px solid #fdba74;border-radius:14px;padding:10px 14px;text-align:left"><b>Replace</b> 👆 — thay <b>lần lượt từng</b> từ, cụm từ tìm được (xem từng chỗ rồi mới thay).</div>
  <div style="flex:1 1 260px;max-width:400px;background:#fff7ed;border:2px solid #fdba74;border-radius:14px;padding:10px 14px;text-align:left"><b>Replace All</b> ⚡ — thay <b>tất cả</b> từ, cụm từ tìm được trong <b>toàn bộ</b> văn bản.</div></div>
  <div style="text-align:center;margin-top:8px"><span class="ext-tag">Mở rộng</span> Nút <b>Find Next</b> chuyển sang chỗ tìm thấy tiếp theo mà không thay — dùng để bỏ qua chỗ không cần sửa.</div>`;

// ---- Hỏi AI có trách nhiệm (năng lực AI 6.B2.1, câu lệnh gợi ý trong giáo án) ----
const AI_HTML = `<div style="display:flex;flex-wrap:wrap;gap:12px;justify-content:center">
  <div style="flex:1 1 320px;max-width:520px;background:#f5f3ff;border:2px solid #c4b5fd;border-radius:16px;padding:12px 16px;text-align:left">
    <b style="color:#6d28d9">🤖 Câu lệnh gợi ý khi hỏi AI (ChatGPT, Copilot, Gemini)</b>
    <ul style="margin:6px 0 0 18px;padding:0">
      <li>“Khi nào nên sử dụng Replace và khi nào nên sử dụng Replace All? Hãy lấy ví dụ minh họa.”</li>
      <li>“Hướng dẫn em cách sử dụng Find – Replace để sửa tất cả các lỗi viết tắt trong một văn bản.”</li>
      <li>“Cho em biết những lỗi thường gặp khi sử dụng chức năng Tìm kiếm và Thay thế trong Microsoft Word và cách khắc phục.”</li>
    </ul></div>
  <div style="flex:1 1 280px;max-width:420px;background:#fef2f2;border:2px solid #fca5a5;border-radius:16px;padding:12px 16px;text-align:left">
    <b style="color:#b91c1c">🛡️ Dùng AI có trách nhiệm</b>
    <ul style="margin:6px 0 0 18px;padding:0">
      <li>Tự làm Find – Replace trên Word trước, dùng AI để kiểm tra lại.</li>
      <li>Kiểm chứng điều AI nói, không phụ thuộc hoàn toàn vào AI.</li>
      <li>Không đưa thông tin cá nhân, dữ liệu nhạy cảm của mình và các bạn lên AI.</li>
    </ul></div></div>`;

const LESSON = {
  meta: {
    subject: "Tin học", grade: "6", book: "Kết nối tri thức với cuộc sống",
    title: "Bài 13: Thực hành: Tìm kiếm và thay thế", unit: "Chủ đề 5 — Ứng dụng tin học",
    pages: "58–60", durationMinutes: 45,
  },
  objectives: {
    knowledge: [
      "Trình bày được tác dụng của công cụ tìm kiếm, thay thế trong phần mềm soạn thảo văn bản.",
      "Sử dụng được công cụ tìm kiếm và thay thế của phần mềm soạn thảo văn bản.",
    ],
    competencies: [
      "Tự chủ, tự học; giao tiếp, hợp tác; giải quyết vấn đề, sáng tạo (chọn cách chỉnh sửa hợp lí, nhanh, hiệu quả).",
      "Năng lực số 3.1.TC1a: sử dụng thành thạo Find, Replace, Replace All để chỉnh sửa từ, cụm từ trong văn bản.",
      "Năng lực số 5.2.TC1a, 5.2.TC1b: xác định thông tin cần thay đổi; chọn chức năng Find – Replace thay vì sửa thủ công.",
      "Năng lực AI 6.B2.1: nêu được một số câu hỏi cơ bản để kiểm tra tính an toàn và minh bạch của ứng dụng AI.",
    ],
    qualities: ["Chăm chỉ, trung thực (báo cáo đúng kết quả thực hành), nhân ái (hỗ trợ bạn), trách nhiệm."],
  },
  coreKnowledge: [
    "Công cụ Tìm kiếm và Thay thế giúp tìm kiếm, thay thế từ hoặc cụm từ theo yêu cầu một cách nhanh chóng và chính xác, không bỏ sót — rất cần với văn bản dài.",
    "Tìm kiếm: thẻ Home → nhóm Editing → Find → gõ từ, cụm từ cần tìm rồi nhấn Enter. Các chỗ tìm thấy được đánh dấu; ngăn Navigation có liên kết đến từng chỗ.",
    "Thay thế: Home → Editing → Replace → gõ từ cần tìm vào Find what, từ thay thế vào Replace with → Replace (thay lần lượt từng chỗ) hoặc Replace All (thay tất cả).",
    "Dùng Tìm kiếm và Thay thế để rà soát lỗi chính tả, thay từ viết tắt,… giúp văn bản hoàn chỉnh hơn.",
  ],
  keywords: ["Find", "Replace", "Replace All", "Editing", "Navigation"],
  settings: { basePoints: 100, useTimer: false, defaultTime: 60, sound: true, streakEnabled: true },

  activities: [
    /* ===================== HĐ1: MỞ ĐẦU ===================== */
    {
      id: "mo-dau", name: "Mở đầu — Kem dưa hấu hay kem xoài? 🍉🥭", type: "knowledge",
      goal: "Xác định nhu cầu chỉnh sửa: đổi công thức kem sữa chua dưa hấu thành kem sữa chua xoài.",
      time: 180,
      task: "Đọc câu chuyện của An và công thức làm kem (Hình 5.22). Trả lời: cần sửa những chỗ nào để có công thức kem sữa chua xoài?",
      sgkImage: "assets/sgk/sgk-trang58.jpg",
      content: {
        heading: "🍨 Giúp An sửa công thức làm kem",
        html: CAU_CHUYEN_HTML + CONG_THUC_HTML,
      },
      questions: [
        { question: "Trong công thức (Hình 5.22), cụm từ “dưa hấu” xuất hiện ở mấy chỗ?", type: "multiple-choice",
          options: ["2 chỗ", "3 chỗ", "4 chỗ", "5 chỗ"],
          answer: 2, explanation: "4 chỗ: tên món “Kem sữa chua dưa hấu”, “Dưa hấu: 250 g”, “Cho dưa hấu vào tô”, “Nghiền nát dưa hấu”.", level: "nhan-biet", activity: "mo-dau" },
        { question: "Để có công thức kem sữa chua xoài, phần nào của công thức KHÔNG cần sửa?", type: "multiple-choice",
          options: ["Tên món", "Nguyên liệu dưa hấu", "Bước “Nghiền nát dưa hấu”", "Dụng cụ: 1 tô to, 4 khuôn làm kem"],
          answer: 3, explanation: "Chỉ cần đổi các chỗ có chữ “dưa hấu” thành “xoài”; dụng cụ và các bước còn lại giữ nguyên.", level: "thong-hieu", activity: "mo-dau" },
      ],
      remember: ["Muốn đổi thông tin trong văn bản, trước hết phải xác định đúng từ, cụm từ cần thay đổi (ở đây là “dưa hấu” → “xoài”)."],
    },

    /* ===================== HĐ2.1: TẠI SAO PHẢI TÌM KIẾM VÀ THAY THẾ VĂN BẢN? ===================== */
    {
      id: "doi-cong-thuc", name: "Hoạt động 1: Đổi công thức làm kem 🔄", type: "knowledge",
      goal: "Hiểu vì sao cần công cụ tìm kiếm và thay thế thay cho việc sửa bằng tay.",
      time: 300,
      task: "Hoạt động 1 (SGK tr.58): nhóm thảo luận 3 câu hỏi — đổi công thức thế nào? thao tác trong phần mềm soạn thảo ra sao? có cách nào sửa nhanh hơn không?",
      sgkImage: "assets/sgk/hoat-dong-1.jpg",
      content: {
        heading: "🤔 Tại sao phải tìm kiếm và thay thế văn bản?",
        prompt: "Với văn bản ngắn, tìm và sửa từng chữ khá dễ. Nhưng với văn bản dài hàng trăm trang thì sao?",
        revealLabel: "📌 Sửa bằng tay hay dùng công cụ?",
        blocks: [
          { kind: "html", value: SO_SANH_HTML },
          { kind: "text", value: "Các phần mềm soạn thảo văn bản có công cụ Tìm kiếm và Thay thế. Ví dụ: cần thay “dưa hấu” bằng “xoài” trong công thức làm kem, dùng công cụ Tìm kiếm và Thay thế thì tất cả các từ “dưa hấu” xuất hiện trong văn bản sẽ được thay bằng từ “xoài”." },
          { kind: "image", value: "assets/sgk/khung-tim-kiem-thay-the.jpg", caption: "Ghi nhớ (SGK tr.59)" },
        ],
      },
      questions: [
        { question: "Câu 1. Từ công thức làm kem sữa chua dưa hấu, muốn thành công thức làm kem sữa chua xoài em làm thế nào?", type: "multiple-choice",
          options: ["Viết lại toàn bộ công thức từ đầu", "Thay tất cả các cụm từ “dưa hấu” bằng “xoài”", "Chỉ sửa tên món ở dòng đầu", "Xoá phần Hướng dẫn"],
          answer: 1, explanation: "Chỉ cần thay mọi chỗ có “dưa hấu” bằng “xoài” (4 chỗ), phần còn lại giữ nguyên.", level: "nhan-biet", activity: "doi-cong-thuc" },
        { question: "Câu 2. Nếu sửa bằng tay trong phần mềm soạn thảo, em thực hiện những thao tác nào?", type: "multiple-choice",
          options: ["Nhấn Enter nhiều lần", "Chọn cả văn bản rồi nhấn Delete", "Dò tìm từng chỗ có “dưa hấu”, chọn cụm từ đó rồi gõ “xoài” thay vào — lần lượt cả 4 chỗ", "Đổi phông chữ cho cụm từ “dưa hấu”"],
          answer: 2, explanation: "Sửa thủ công: tự dò từng chỗ, chọn (bôi đen) “dưa hấu” rồi gõ “xoài”. Làm được nhưng mất công, dễ bỏ sót nếu văn bản dài.", level: "thong-hieu", activity: "doi-cong-thuc" },
        { question: "Câu 3. Cách nào giúp chỉnh sửa tệp văn bản nhanh hơn?", type: "multiple-choice",
          options: ["Dùng công cụ Tìm kiếm và Thay thế của phần mềm soạn thảo văn bản", "In văn bản ra rồi sửa bằng bút", "Đọc to cho bạn gõ lại", "Gõ lại cả tệp văn bản mới"],
          answer: 0, explanation: "Công cụ Tìm kiếm và Thay thế tìm ra mọi chỗ “dưa hấu” và thay bằng “xoài” rất nhanh, chính xác, không bỏ sót.", level: "thong-hieu", activity: "doi-cong-thuc" },
        { question: "Với văn bản dài hàng trăm trang, tự dò tìm và sửa bằng tay vừa lâu vừa dễ bỏ sót.", type: "true-false", answer: true,
          explanation: "Đúng. Vì vậy cần công cụ Tìm kiếm và Thay thế: nhanh chóng, chính xác, không bỏ sót từ nào.", level: "thong-hieu", activity: "doi-cong-thuc" },
      ],
      remember: ["Công cụ Tìm kiếm và Thay thế giúp tìm kiếm, thay thế từ hoặc cụm từ theo yêu cầu một cách nhanh chóng và chính xác."],
    },
    {
      id: "tim-hay-thay", name: "Trò chơi: Tìm kiếm hay Thay thế? 🎯", type: "dragdrop",
      goal: "Phân biệt khi nào chỉ cần tìm kiếm, khi nào cần thay thế.",
      time: 150,
      task: "Xếp mỗi tình huống vào công cụ phù hợp. Xếp hết rồi bấm Nộp bài.",
      groups: ["🔍 Tìm kiếm (Find)", "🔄 Thay thế (Replace)"],
      items: [
        { text: "Tìm đoạn viết về nhóm bạn thân trong tệp nhiều trang để đọc lại", group: 0 },
        { text: "Xem các chỗ có nhắc đến tên bạn Khoa trong bài viết", group: 0 },
        { text: "Đếm xem cụm từ “sổ lưu niệm” xuất hiện bao nhiêu lần", group: 0 },
        { text: "Đổi “dưa hấu” thành “xoài” trong công thức làm kem", group: 1 },
        { text: "Sửa mọi chữ viết tắt “ko” thành “không”", group: 1 },
        { text: "Đổi tên nhóm từ “Sao Mai” thành “Ban Mai” trong cả tệp", group: 1 },
      ],
      explanation: "Chỉ cần xem, đọc lại, đếm → Tìm kiếm (Find). Cần đổi chữ này thành chữ khác → Thay thế (Replace).",
    },

    /* ===================== HĐ2.2: THỰC HÀNH — a) TÌM KIẾM ===================== */
    {
      id: "tim-kiem", name: "a) Tìm kiếm 🔍", type: "knowledge",
      goal: "Biết ba bước tìm kiếm và đọc kết quả trong ngăn Navigation.",
      time: 300,
      task: "Nhiệm vụ 1: nhóm quan sát Hình 5.23 — để tìm kiếm cụm từ “dưa hấu” em thực hiện như thế nào? Kết quả tìm kiếm hiện ra ở đâu?",
      sgkImage: "assets/sgk/hinh-5-23.jpg",
      content: {
        heading: "🔍 Tìm kiếm — 3 bước",
        revealLabel: "👀 Các bước tìm kiếm & Hình 5.23",
        blocks: [
          { kind: "html", value: BUOC_TIM_HTML },
          { kind: "image", value: "assets/sgk/hinh-5-23.jpg", caption: "Hình 5.23. Tìm kiếm" },
          { kind: "html", value: KET_QUA_TIM_HTML },
        ],
      },
      questions: [
        { question: "Lệnh Find nằm ở đâu trong Microsoft Word?", type: "multiple-choice",
          options: ["Thẻ Insert, nhóm Tables", "Thẻ Page Layout, nhóm Page Setup", "Thẻ File, lệnh Print", "Thẻ Home, nhóm lệnh Editing"],
          answer: 3, explanation: "① Nháy thẻ Home ② trong nhóm lệnh Editing chọn Find.", level: "nhan-biet", activity: "tim-kiem" },
        { question: "Gõ cụm từ cần tìm vào ô trong ngăn Navigation xong, em nhấn phím nào?", type: "multiple-choice",
          options: ["Enter", "Delete", "Tab", "Esc"],
          answer: 0, explanation: "③ Gõ từ, cụm từ cần tìm rồi nhấn phím Enter.", level: "nhan-biet", activity: "tim-kiem" },
        { question: "Trong Hình 5.23, ngăn Navigation ghi “4 matches”. Điều đó có nghĩa là gì?", type: "multiple-choice", sgkImage: "assets/sgk/hinh-5-23.jpg",
          options: ["Văn bản có 4 trang", "Tìm thấy 4 chỗ có cụm từ “dưa hấu”", "Đã thay thế 4 chỗ", "Có 4 lỗi chính tả"],
          answer: 1, explanation: "4 matches = tìm thấy 4 kết quả khớp với cụm từ cần tìm. Tìm kiếm không làm thay đổi văn bản.", level: "thong-hieu", activity: "tim-kiem" },
        { question: "Sau khi tìm kiếm, em thấy những gì? (Chọn các phương án đúng)", type: "multiple-select", sgkImage: "assets/sgk/hinh-5-23.jpg",
          options: ["Các từ, cụm từ tìm thấy được đánh dấu trong văn bản", "Các chỗ tìm thấy tự động đổi thành “xoài”", "Liên kết đến các từ, cụm từ tìm thấy trong ngăn Navigation", "Số kết quả tìm thấy"],
          answer: [0, 2, 3], explanation: "Tìm kiếm chỉ đánh dấu và liệt kê các chỗ tìm thấy (kèm số kết quả), không sửa văn bản.", level: "thong-hieu", activity: "tim-kiem" },
      ],
      remember: ["Tìm kiếm: Home → Editing → Find → gõ từ, cụm từ cần tìm → Enter. Các chỗ tìm thấy được đánh dấu, có liên kết trong ngăn Navigation."],
    },

    /* ===================== HĐ2.2: THỰC HÀNH — b) THAY THẾ ===================== */
    {
      id: "thay-the", name: "b) Thay thế 🔄", type: "knowledge",
      goal: "Biết bốn bước thay thế và phân biệt Replace với Replace All.",
      time: 300,
      task: "Nhiệm vụ 2: nhóm quan sát Hình 5.24 — để thay “dưa hấu” bằng “xoài” em thực hiện như thế nào? Nút Replace và Replace All khác nhau ra sao?",
      sgkImage: "assets/sgk/hinh-5-24.jpg",
      content: {
        heading: "🔄 Thay thế — 4 bước",
        revealLabel: "👀 Các bước thay thế & Hình 5.24",
        blocks: [
          { kind: "html", value: BUOC_THAY_HTML },
          { kind: "image", value: "assets/sgk/hinh-5-24.jpg", caption: "Hình 5.24. Tìm kiếm và thay thế" },
          { kind: "html", value: REPLACE_HTML },
        ],
      },
      questions: [
        { question: "Để mở hộp thoại Find and Replace, trong nhóm lệnh Editing em chọn:", type: "multiple-choice",
          options: ["Find", "Select", "Replace", "Paste"],
          answer: 2, explanation: "① Trong nhóm lệnh Editing, chọn Replace.", level: "nhan-biet", activity: "thay-the" },
        { question: "Muốn thay “dưa hấu” bằng “xoài”, em gõ vào hai ô như thế nào?", type: "multiple-choice", sgkImage: "assets/sgk/hinh-5-24.jpg",
          options: ["Find what: dưa hấu · Replace with: xoài", "Find what: xoài · Replace with: dưa hấu", "Find what: kem · Replace with: xoài", "Cả hai ô đều gõ: xoài"],
          answer: 0, explanation: "② Find what: từ cần tìm (dưa hấu). ③ Replace with: từ thay thế (xoài).", level: "thong-hieu", activity: "thay-the" },
        { question: "Muốn thay cùng lúc tất cả các chỗ “dưa hấu” trong toàn bộ văn bản, em nháy nút:", type: "multiple-choice",
          options: ["Replace", "Find Next", "Cancel", "Replace All"],
          answer: 3, explanation: "④b Replace All: thay thế tất cả các từ, cụm từ tìm kiếm được trong toàn bộ văn bản.", level: "nhan-biet", activity: "thay-the" },
        { question: "Bạn Minh muốn xem từng chỗ tìm được rồi mới thay, lần lượt từng chỗ một. Minh nên nháy nút nào?", type: "multiple-choice",
          options: ["Cancel", "Replace", "Replace All", "More >>"],
          answer: 1, explanation: "④a Replace: thay thế lần lượt từng từ hoặc cụm từ tìm kiếm được.", level: "van-dung", activity: "thay-the" },
      ],
      remember: ["Thay thế: Home → Editing → Replace → Find what (từ cần tìm) → Replace with (từ thay thế) → Replace (từng chỗ) hoặc Replace All (tất cả)."],
    },
    {
      id: "ghep-nut", name: "Ghép nút lệnh với tác dụng 🧩", type: "matching",
      goal: "Nhớ tác dụng của các ô, nút trong công cụ Tìm kiếm và Thay thế.",
      time: 150,
      task: "Ghép mỗi lệnh, ô, nút với tác dụng của nó. Làm hết rồi bấm Nộp bài.",
      sgkImage: "assets/sgk/hinh-5-24.jpg",
      pairs: [
        { left: "Find", right: "Mở ngăn Navigation để tìm kiếm từ, cụm từ" },
        { left: "Find what", right: "Ô gõ từ, cụm từ cần tìm" },
        { left: "Replace with", right: "Ô gõ từ, cụm từ thay thế" },
        { left: "Replace", right: "Thay lần lượt từng từ, cụm từ tìm được" },
        { left: "Replace All", right: "Thay tất cả từ, cụm từ tìm được trong toàn bộ văn bản" },
      ],
      explanation: "Find: tìm kiếm · Find what: từ cần tìm · Replace with: từ thay thế · Replace: thay từng chỗ · Replace All: thay tất cả (Hình 5.23, 5.24).",
    },

    /* ===================== HĐ2.2: THỰC HÀNH TRÊN WORD ===================== */
    {
      id: "thuc-hanh", name: "Thực hành: Từ kem dưa hấu thành kem xoài 🍨", type: "knowledge",
      goal: "Nhập, định dạng công thức, tìm kiếm và thay thế trên Word; lưu hai tệp theo yêu cầu.",
      time: 600,
      task: "Trên Microsoft Word: nhập và định dạng công thức như Hình 5.22, lưu kemsuachua-duahau.docx. Tìm kiếm “dưa hấu”, thay bằng “xoài” rồi lưu với tên kemsuachua-xoai.docx. Trả lời câu hỏi để kiểm tra lại thao tác.",
      sgkImage: "assets/sgk/sgk-trang59.jpg",
      content: {
        heading: "🍨 Thực hành trên Microsoft Word",
        revealLabel: "📖 Nhiệm vụ & hướng dẫn (SGK tr.59–60)",
        blocks: [
          { kind: "list", value: [
            "① Khởi động Microsoft Word, nhập nội dung công thức làm kem sữa chua dưa hấu.",
            "② Định dạng để có kết quả như Hình 5.22 (xem lại phần thực hành của Bài 11) → lưu tệp với tên kemsuachua-duahau.docx.",
            "③ Tìm kiếm cụm từ “dưa hấu”: Home → Editing → Find → gõ “dưa hấu” → Enter. Đếm số kết quả.",
            "④ Thay thế: Home → Editing → Replace → Find what: dưa hấu · Replace with: xoài → Replace All.",
            "⑤ Kiểm tra lại văn bản rồi lưu tệp với tên kemsuachua-xoai.docx.",
          ] },
          { kind: "image", value: "assets/sgk/hinh-5-22.jpg", caption: "Hình 5.22. Công thức làm kem sữa chua dưa hấu" },
          { kind: "html", value: TRUOC_SAU_HTML },
        ],
      },
      questions: [
        { question: "Sau khi nhập và định dạng công thức, em lưu tệp với tên nào?", type: "multiple-choice",
          options: ["kemsuachua-xoai.docx", "CamNghiVeBan.docx", "kemsuachua-duahau.docx", "congthuc.xlsx"],
          answer: 2, explanation: "Công thức ban đầu (dưa hấu) lưu là kemsuachua-duahau.docx.", level: "nhan-biet", activity: "thuc-hanh" },
        { question: "Nháy Replace All để thay “dưa hấu” bằng “xoài” trong công thức Hình 5.22. Có bao nhiêu chỗ được thay?", type: "multiple-choice",
          options: ["1 chỗ", "4 chỗ", "7 chỗ", "Không chỗ nào"],
          answer: 1, explanation: "Replace All thay tất cả 4 chỗ tìm thấy: tên món, nguyên liệu, bước ❶ và bước ❷.", level: "thong-hieu", activity: "thuc-hanh" },
        { question: "Vì sao sau khi thay thế, em lưu với tên mới kemsuachua-xoai.docx mà không lưu đè lên tệp cũ?", type: "multiple-choice",
          options: ["Để tệp chạy nhanh hơn", "Vì Word không cho lưu đè", "Để xoá công thức dưa hấu", "Để giữ lại cả công thức kem dưa hấu lẫn kem xoài"],
          answer: 3, explanation: "Lưu tên mới (File → Save As) giúp giữ cả hai tệp: kemsuachua-duahau.docx và kemsuachua-xoai.docx.", level: "van-dung", activity: "thuc-hanh" },
      ],
      remember: ["Quy trình: nhập, định dạng → lưu tệp → Find để kiểm tra → Replace/Replace All để thay → kiểm tra lại → lưu tệp mới."],
    },
    {
      id: "tu-kiem-tra", name: "Phiếu tự kiểm tra tệp kemsuachua-xoai.docx 📋", type: "checklist",
      goal: "Tự đánh giá sản phẩm thực hành trên Word.",
      time: 150,
      task: "Đối chiếu tệp trên Word, tick từng việc vào cột Đã làm hoặc Chưa làm, ghi khó khăn gặp phải rồi gửi cho thầy/cô.",
      columns: ["✅ Đã làm", "⏳ Chưa làm"],
      sections: [
        { title: "✍️ NHẬP & ĐỊNH DẠNG", items: [
          "Nhập đủ nội dung công thức làm kem sữa chua dưa hấu",
          "Định dạng giống Hình 5.22 (tiêu đề, các mục căn giữa, màu chữ)",
          "Lưu tệp kemsuachua-duahau.docx",
        ] },
        { title: "🔍 TÌM KIẾM & 🔄 THAY THẾ", items: [
          "Tìm kiếm được cụm từ “dưa hấu”, thấy 4 kết quả được đánh dấu",
          "Thay “dưa hấu” bằng “xoài” bằng hộp thoại Find and Replace",
          "Kiểm tra lại: không còn chữ “dưa hấu” trong công thức",
          "Lưu tệp với tên kemsuachua-xoai.docx",
        ] },
      ],
      note: "Em gặp khó khăn gì khi tìm kiếm, thay thế? Em đã khắc phục thế nào?",
      modelAnswer: [
        "Khó khăn thường gặp: gõ sai cụm từ cần tìm (thiếu dấu, thừa dấu cách) nên không tìm thấy; gõ nhầm hai ô Find what và Replace with; quên lưu tệp mới mà lưu đè tệp cũ.",
        "Khắc phục: gõ đúng chính tả cụm từ; kiểm tra hai ô trước khi nháy Replace All; dùng Find kiểm tra lại sau khi thay; lưu với tên mới kemsuachua-xoai.docx.",
      ],
    },

    /* ===================== HĐ3: LUYỆN TẬP ===================== */
    {
      id: "luyen-tap-1", name: "Luyện tập 1: Tìm “nhóm bạn thân” 👭", type: "knowledge",
      goal: "Biết cách xem lần lượt các kết quả tìm kiếm.",
      time: 180,
      task: "Luyện tập 1 (SGK tr.60): tệp bài viết cảm nghĩ của An có nhiều trang. An tìm kiếm cụm từ “nhóm bạn thân”. An phải làm gì để xem lần lượt các kết quả tìm thấy?",
      sgkImage: "assets/sgk/sgk-trang60.jpg",
      questions: [
        { question: "An phải thực hiện thao tác gì để xem lần lượt các kết quả tìm thấy?", type: "multiple-choice", sgkImage: "assets/sgk/hinh-5-23.jpg",
          options: ["Nháy Replace All", "Cuộn đọc lại từng trang từ đầu", "Nháy chuột vào từng liên kết đến cụm từ “nhóm bạn thân” trong ngăn Navigation", "Gõ lại cụm từ nhiều lần"],
          answer: 2, explanation: "Ngăn Navigation liệt kê các liên kết đến từng chỗ tìm thấy (chú thích bên trái Hình 5.23). Nháy vào từng liên kết để đến đúng chỗ đó.", level: "van-dung", activity: "luyen-tap-1" },
        { question: "Khi An tìm kiếm cụm từ “nhóm bạn thân”, nội dung bài viết bị thay đổi.", type: "true-false", answer: false,
          explanation: "Sai. Tìm kiếm chỉ đánh dấu và liệt kê các chỗ tìm thấy; muốn đổi chữ phải dùng Thay thế (Replace).", level: "thong-hieu", activity: "luyen-tap-1" },
      ],
    },
    {
      id: "luyen-tap-2", name: "Luyện tập 2: Sắp xếp các bước thay thế 🔢", type: "ordering",
      goal: "Nắm đúng trình tự thao tác thay thế từ, cụm từ.",
      time: 150,
      task: "Luyện tập 2 (SGK tr.60): sắp xếp các bước theo thứ tự đúng để thay thế một từ hoặc cụm từ trong phần mềm soạn thảo văn bản. Xếp xong bấm Nộp bài.",
      sgkImage: "assets/sgk/sgk-trang60.jpg",
      steps: [
        "b) Nháy chuột vào thẻ Home.",
        "c) Trong nhóm lệnh Editing, chọn Replace.",
        "d) Gõ từ, cụm từ cần tìm.",
        "a) Gõ từ, cụm từ cần thay thế.",
        "e) Nháy chuột vào nút Replace để thay thế lần lượt từng từ hoặc cụm từ.",
      ],
      explanation: "Thứ tự đúng: b → c → d → a → e.",
    },

    /* ===================== HĐ4: VẬN DỤNG ===================== */
    {
      id: "van-dung", name: "Vận dụng: Rà soát sổ lưu niệm 📖", type: "knowledge",
      goal: "Dùng Tìm kiếm và Thay thế để sửa lỗi chính tả, từ viết tắt; biết dùng AI an toàn.",
      time: 180,
      task: "Vận dụng (SGK tr.60): chọn cách dùng Tìm kiếm và Thay thế để sửa lỗi chính tả, từ viết tắt trong các tệp sổ lưu niệm. Thảo luận cách hỏi AI an toàn.",
      sgkImage: "assets/sgk/sgk-trang60.jpg",
      content: {
        heading: "📖 Cho các tệp sổ lưu niệm hoàn chỉnh hơn",
        prompt: "Công cụ Tìm kiếm và Thay thế còn giúp rà soát, sửa lỗi chính tả, thay thế các từ viết tắt,…",
        revealLabel: "🤖 Hỏi AI có trách nhiệm",
        blocks: [{ kind: "html", value: AI_HTML }],
      },
      questions: [
        { question: "Bạn Lan gõ nhầm “sổ lưu niêm” ở nhiều chỗ, đúng ra là “sổ lưu niệm”. Lan gõ vào hộp thoại Find and Replace thế nào?", type: "multiple-choice",
          options: ["Find what: sổ lưu niệm · Replace with: sổ lưu niêm", "Find what: sổ lưu niêm · Replace with: sổ lưu niệm", "Find what: sổ · Replace with: sổ lưu niệm", "Chỉ gõ “sổ lưu niệm” vào Find what"],
          answer: 1, explanation: "Find what: cụm từ viết sai (cần tìm). Replace with: cụm từ viết đúng (thay thế).", level: "van-dung", activity: "van-dung" },
        { question: "Bạn Nam viết tắt “k” thay cho “không”. Nếu nháy Replace All để thay “k” bằng “không”, điều gì có thể xảy ra?", type: "multiple-choice",
          options: ["Chỉ những chữ “k” viết tắt được sửa, rất an toàn", "Word báo lỗi và không thay gì", "Chữ k trong các từ khác như “kem”, “Khoa”, “kính” cũng bị thay → văn bản sai; nên dùng Replace để xem và thay từng chỗ", "Văn bản bị xoá hết"],
          answer: 2, explanation: "Replace All thay mọi chỗ có chữ “k”, kể cả chữ k nằm trong từ khác. Với từ, kí tự ngắn nên dùng Replace để kiểm tra từng chỗ trước khi thay.", level: "van-dung-cao", activity: "van-dung" },
        { question: "Trước khi dán bài viết sổ lưu niệm vào một công cụ AI để nhờ kiểm tra chính tả, em nên tự hỏi những câu nào? (Chọn các phương án đúng)", type: "multiple-select",
          options: ["Bài viết có chứa thông tin cá nhân (địa chỉ, số điện thoại) của mình và các bạn không?", "Công cụ AI này có lưu lại hay chia sẻ nội dung em nhập không?", "Ai tạo ra công cụ AI này, thầy cô và gia đình có cho phép em dùng không?", "Công cụ AI này có màu giao diện đẹp không?"],
          answer: [0, 1, 2], explanation: "Đây là các câu hỏi kiểm tra tính an toàn, minh bạch của ứng dụng AI. Màu giao diện không liên quan đến an toàn.", level: "van-dung", activity: "van-dung" },
      ],
      remember: ["Tìm kiếm và Thay thế giúp sửa lỗi chính tả, từ viết tắt nhanh, không bỏ sót. Từ ngắn dễ nằm trong từ khác → nên Replace từng chỗ để kiểm tra."],
    },
    {
      id: "van-dung-nhom", name: "Vận dụng: Kế hoạch rà soát của nhóm ✍️", type: "vandung",
      goal: "Lập kế hoạch dùng Tìm kiếm và Thay thế hoàn thiện các tệp sổ lưu niệm.",
      time: 120,
      task: "Nhóm xem lại các tệp văn bản đã tạo cho sổ lưu niệm, ghi các lỗi cần sửa và cách sửa rồi gửi cho thầy/cô. Hoàn thiện trên Word (có thể ở nhà).",
      intro: "Gửi câu trả lời cho thầy/cô rồi bấm để xem gợi ý.",
      cases: [
        { question: "Nhóm em sẽ rà soát tệp nào? Ghi 2–3 lỗi chính tả hoặc từ viết tắt cần sửa theo dạng: Find what → Replace with.",
          answer: "Ví dụ: tệp CamNghiVeBan.docx — “ko” → “không”; “lớp 6a” → “lớp 6A”; “lưu niêm” → “lưu niệm”." },
        { question: "Với mỗi lỗi, nhóm em dùng Replace hay Replace All? Vì sao?",
          answer: "Cụm từ dài, chắc chắn chỉ xuất hiện ở chỗ sai (như “lưu niêm”) → Replace All cho nhanh. Từ ngắn dễ nằm trong từ khác (như “ko”, “k”) → Replace từng chỗ để kiểm tra, tránh sửa nhầm. Sửa xong dùng Find kiểm tra lại." },
      ],
    },

    /* ===================== TỔNG KẾT ===================== */
    {
      id: "tong-ket", name: "Tổng kết", type: "summary",
      task: "Cả lớp nhắc lại kiến thức trọng tâm và làm thử thách cuối. Dặn dò: rà soát, sửa lỗi các tệp sổ lưu niệm bằng Tìm kiếm và Thay thế.",
      content: {
        learned: [
          "Công cụ Tìm kiếm và Thay thế giúp tìm, thay từ hoặc cụm từ nhanh chóng, chính xác, không bỏ sót.",
          "Tìm kiếm: Home → Editing → Find → gõ từ cần tìm → Enter; xem kết quả trong ngăn Navigation.",
          "Thay thế: Home → Editing → Replace → Find what, Replace with → Replace (từng chỗ) / Replace All (tất cả).",
          "Dùng Tìm kiếm và Thay thế để rà soát lỗi chính tả, từ viết tắt.",
        ],
        challenge: [
          { question: "Lớp 6A đổi tên cô giáo chủ nhiệm trong bản tin 20 trang từ “cô Hoa” thành “cô Mai”. Cách nào nhanh và không bỏ sót?", type: "multiple-choice",
            options: ["Đọc từng trang và sửa bằng tay", "Replace: Find what “cô Hoa”, Replace with “cô Mai” → Replace All", "Find “cô Mai” rồi nhấn Enter", "Gõ lại bản tin"],
            answer: 1, explanation: "Cụm từ “cô Hoa” rõ ràng → Replace All thay tất cả trong toàn bộ văn bản, nhanh và không bỏ sót.", level: "van-dung-cao", activity: "tong-ket" },
          { question: "Công cụ nào chỉ đánh dấu các chỗ tìm thấy mà KHÔNG làm thay đổi văn bản?", type: "multiple-choice",
            options: ["Replace All", "Replace", "Find", "Cut"],
            answer: 2, explanation: "Find chỉ tìm và đánh dấu; Replace, Replace All mới thay đổi nội dung.", level: "thong-hieu", activity: "tong-ket" },
        ],
      },
    },
  ],
};

if (typeof module !== "undefined" && module.exports) module.exports = LESSON;
if (typeof window !== "undefined") window.LESSON = LESSON;
