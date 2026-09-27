/* ============================================================================
 * BÀI 1 — LƯỢC SỬ CÔNG CỤ TÍNH TOÁN  (Tin học 8 — Kết nối tri thức với cuộc sống)
 * Chủ đề 1: Máy tính và cộng đồng.
 * Bám sát SGK trang 5–9 + Kế hoạch bài dạy (2 tiết) của giáo viên.
 * Chỉ sửa file này để đổi nội dung. Engine app.js không cần sửa.
 * Bàn tính ảo (activity.abacus, câu "abacus") theo Hình 1.1; sơ đồ Von Neumann (dragdrop layout "vonneumann")
 * và máy mô phỏng "chương trình được lưu trữ" (activity.vonneumann) theo Hình 1.3.
 * ==========================================================================*/

// ---- Mở đầu: câu đố hình ảnh ----
const MO_DAU_HTML = `<div style="display:flex;flex-wrap:wrap;gap:18px;align-items:center;justify-content:center;max-width:980px;margin:0 auto">
  <figure style="margin:0;flex:0 1 380px;text-align:center">
    <img src="assets/ban-tinh.png" alt="Công cụ bí ẩn" style="width:100%;border-radius:16px;box-shadow:0 8px 20px rgba(0,0,0,.18)">
    <figcaption style="font-weight:800;font-size:1.3rem;color:#c2410c;margin-top:6px">❓ Đây là gì?</figcaption>
  </figure>
  <div style="flex:1 1 320px;display:flex;flex-direction:column;gap:10px;font-size:1.15rem">
    <div style="background:#fff;border:3px solid #fdba74;border-radius:16px;padding:10px 14px">✋ Từ thời nguyên thuỷ, loài người đã biết dùng <b>ngón tay, viên sỏi, lá cây…</b> để hỗ trợ việc tính toán.</div>
    <div style="background:#fff;border:3px solid #5eead4;border-radius:16px;padding:10px 14px">🔢 Trong tiếng Anh, từ “chữ số” là <b>digit</b> — bắt nguồn từ chữ Latin <b>digitus</b>. Em đoán xem digitus nghĩa là gì?</div>
    <div style="background:#fff7ed;border:3px dashed #c2410c;border-radius:16px;padding:10px 14px">💭 Theo em, <b>máy tính</b> ngày nay có dùng để tính toán không? Từ công cụ trong hình đến chiếc máy tính, con người đã đi một chặng đường như thế nào?</div>
  </div></div>`;

// ---- Đường thời gian Pascal – Babbage (giáo án, Phiếu học tập 1) ----
const PHT1_HTML = `<div style="max-width:900px;margin:6px auto 0;position:relative;padding:34px 10px 6px">
  <div style="position:absolute;left:10px;right:10px;top:16px;height:6px;background:#c2410c;border-radius:3px"></div>
  <div style="position:absolute;right:2px;top:7px;font-size:1.4rem;color:#c2410c">▶</div>
  <div style="position:absolute;left:12px;top:-6px;font-weight:700;color:#9a3412">Đường thời gian</div>
  <div style="display:flex;justify-content:space-around;gap:10px">
    <div style="background:#0f766e;color:#fff;border-radius:14px;padding:8px 22px;text-align:center;font-weight:800;font-size:1.2rem">🕰️ 1642<br>Blaise Pascal</div>
    <div style="background:#0f766e;color:#fff;border-radius:14px;padding:8px 22px;text-align:center;font-weight:800;font-size:1.2rem">⚙️ 1833<br>Charles Babbage</div>
  </div></div>`;

// ---- Đường thời gian máy tính điện – cơ (đáp án câu 1, HĐ2.2 giáo án) ----
const DIEN_CO_SVG = `<svg viewBox="0 0 1000 250" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:980px;height:auto;font-family:'Segoe UI',Arial,sans-serif">
  <line x1="30" y1="125" x2="965" y2="125" stroke="#0f766e" stroke-width="6"/><polygon points="965,113 990,125 965,137" fill="#0f766e"/>
  ${[[140, "Năm 24 tuổi", "Claude Shannon: dùng rơ le", "tính toán trên các dãy bit", 0],
    [380, "1943", "Howard Aiken (IBM tài trợ)", "chế tạo máy tính ASCC", 1],
    [620, "1944", "Giới thiệu ở ĐH Harvard:", "“Harvard Mark I”", 0],
    [850, "1945", "John Von Neumann: nguyên lí", "“chương trình được lưu trữ”", 1]].map(([x, y, a, b, down]) => `
  <circle cx="${x}" cy="125" r="14" fill="#fff" stroke="#c2410c" stroke-width="6"/>
  <text x="${x}" y="${down ? 172 : 88}" text-anchor="middle" font-size="26" font-weight="800" fill="#c2410c">${y}</text>
  <text x="${x}" y="${down ? 202 : 34}" text-anchor="middle" font-size="19" fill="#3b1d06">${a}</text>
  <text x="${x}" y="${down ? 228 : 60}" text-anchor="middle" font-size="19" fill="#3b1d06">${b}</text>`).join("")}
</svg>`;

// ---- Sơ đồ cấu trúc máy tính (Hình 1.3) ----
const HINH_1_3_SVG = `<svg viewBox="0 0 760 250" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:640px;height:auto;font-family:'Segoe UI',Arial,sans-serif">
  <defs><marker id="vn-ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="#0284c7"/></marker></defs>
  <rect x="260" y="10" width="240" height="230" rx="10" fill="#bae6fd" stroke="#0ea5e9" stroke-width="4"/>
  <rect x="300" y="30" width="160" height="60" rx="8" fill="#fff" stroke="#0ea5e9" stroke-width="3"/><text x="380" y="68" text-anchor="middle" font-size="24" font-weight="700" fill="#0c4a6e">Bộ xử lí</text>
  <rect x="300" y="160" width="160" height="60" rx="8" fill="#fff" stroke="#0ea5e9" stroke-width="3"/><text x="380" y="198" text-anchor="middle" font-size="24" font-weight="700" fill="#0c4a6e">Bộ nhớ</text>
  <line x1="355" y1="92" x2="355" y2="156" stroke="#0284c7" stroke-width="4" marker-end="url(#vn-ah)"/>
  <line x1="405" y1="158" x2="405" y2="94" stroke="#0284c7" stroke-width="4" marker-end="url(#vn-ah)"/>
  <rect x="20" y="95" width="190" height="60" rx="8" fill="#fff" stroke="#0ea5e9" stroke-width="3"/><text x="115" y="133" text-anchor="middle" font-size="23" font-weight="700" fill="#0c4a6e">Thiết bị vào</text>
  <rect x="550" y="95" width="190" height="60" rx="8" fill="#fff" stroke="#0ea5e9" stroke-width="3"/><text x="645" y="133" text-anchor="middle" font-size="23" font-weight="700" fill="#0c4a6e">Thiết bị ra</text>
  <line x1="212" y1="125" x2="255" y2="125" stroke="#0284c7" stroke-width="4" marker-end="url(#vn-ah)"/>
  <line x1="502" y1="125" x2="545" y2="125" stroke="#0284c7" stroke-width="4" marker-end="url(#vn-ah)"/>
</svg>`;

// ---- Năm thế hệ máy tính điện tử (SGK tr.7–8) — thẻ bấm mở từng thế hệ ----
const THE_HE = [
  ["1️⃣", "Thế hệ thứ nhất", "1945 – 1955", "#64748b", "Công nghệ đèn điện tử chân không đầu thế kỉ XX mau chóng thay thế rơ le điện cơ, đánh dấu kỉ nguyên đầu tiên của máy tính điện tử. Mỗi giây, chiếc ENIAC (Hình 1.4) có thể thực hiện 5000 phép tính cộng hoặc 350 phép tính nhân.",
    ["Đèn điện tử chân không", "Bộ nhớ chính: trống từ", "Rất lớn (thường chiếm một căn phòng)", "Máy đọc và tạo thẻ đục lỗ", "Atanasoff-Berry Computer (ABC 1942), ENIAC (1943), EDVAC (1945),…"]],
  ["2️⃣", "Thế hệ thứ hai", "1955 – 1965", "#0ea5e9", "Bóng bán dẫn tạo nên thế hệ máy tính nhỏ hơn, rẻ hơn, tiêu thụ ít điện năng hơn, đáng tin cậy hơn và nhanh hơn hàng chục lần. IBM 7090 tính được 229 000 phép tính mỗi giây. Chiếc máy tính thế hệ thứ hai được đưa vào nước ta năm 1968 là Minsk-22 (Hình 1.5).",
    ["Bóng bán dẫn", "Lõi từ, băng từ", "Lớn (bộ phận xử lí và tính toán lớn như những chiếc tủ)", "Máy đọc và in băng đục lỗ, máy đọc và in băng từ", "IBM 7090 (1959), IBM 7094 (1962), UNIVAC 1107 (1960),…"]],
  ["3️⃣", "Thế hệ thứ ba", "1965 – 1974", "#10b981", "Máy tính dựa trên các mạch tích hợp (IC — Integrated Circuit): giảm kích thước, tăng tốc độ tính toán. IBM System/360 Model 30 thực hiện khoảng 1 triệu lệnh mỗi giây, quản lí được 8 MB bộ nhớ. Chiếc máy tính thế hệ thứ ba được đưa vào nước ta năm 1967 thuộc họ IBM System/360 (Hình 1.6).",
    ["Mạch tích hợp", "Lõi từ lớn, băng từ, đĩa từ", "Lớn (tương đương một chiếc bàn làm việc)", "Được bổ sung bàn phím, màn hình, máy in,…", "IBM System/360 (1964), IBM System/370 (1970), PDP-11 (1970), UNIVAC 1108 (1964),…"]],
  ["4️⃣", "Thế hệ thứ tư", "1974 – 1990", "#f59e0b", "Mạch tích hợp cỡ rất lớn (VLSI — Very Large Scale Integration) tạo nên những bộ xử lí nguyên khối chứa hàng chục nghìn đến hàng triệu linh kiện bán dẫn, gọi là bộ vi xử lí. Máy tính dựa trên công nghệ vi xử lí gọi là máy vi tính. Bộ xử lí 80386 XS (1988) của Intel thực hiện khoảng 5 triệu phép tính mỗi giây, quản lí được 4 GB bộ nhớ. Micral (1973) là một trong những máy vi tính đầu tiên.",
    ["Mạch tích hợp cỡ rất lớn và bộ vi xử lí", "CD, RAM, ROM, USB, SSD,…", "Nhỏ, có thể đặt trên bàn", "Được bổ sung thiết bị trỏ, máy quét,…; Mạng: hai hoặc nhiều máy tính liên kết với nhau", "IBM PC, STAR 1000, APPLE II, Apple Macintosh,…"]],
  ["5️⃣", "Thế hệ thứ năm", "1990 – nay", "#ef4444", "Mạch tích hợp cỡ siêu lớn (ULSI — Ultra Large Scale Integration) tích hợp hàng chục triệu linh kiện bán dẫn; kĩ thuật xử lí song song giúp tăng hiệu suất, giảm chi phí. Máy tính có một số khả năng xử lí thông tin giống con người như cảm nhận, suy luận, tương tác,… được gọi là trí tuệ nhân tạo.",
    ["Mạch tích hợp cỡ siêu lớn", "(Dung lượng lưu trữ lớn)", "Nhỏ, có thể mang theo người (di động)", "Được bổ sung thiết bị nhận dạng tiếng nói, hình ảnh, chuyển động,…", "Điện thoại thông minh, loa thông minh, kính thông minh,…"]],
];
const TH_LABEL = ["⚡ Thành phần điện tử chính", "💾 Bộ nhớ", "📏 Kích thước", "⌨️ Thiết bị vào – ra", "🖥️ Ví dụ"];
const THE_HE_HTML = `<div style="display:flex;flex-direction:column;gap:10px;max-width:1000px;margin:0 auto;text-align:left">${THE_HE.map(([n, t, y, c, intro, f]) =>
  `<details style="border:3px solid ${c};border-radius:16px;background:#fff;overflow:hidden">
    <summary style="cursor:pointer;padding:10px 14px;font-size:1.25rem;font-weight:800;background:${c};color:#fff;list-style:none">${n} ${t} <span style="font-weight:600;opacity:.92">(${y})</span> <span style="float:right;font-size:1rem;opacity:.9">bấm để mở ▾</span></summary>
    <div style="padding:10px 16px;font-size:1.08rem"><p style="margin:0 0 8px">${intro}</p>
    <table style="border-collapse:collapse;width:100%">${f.map((v, i) => `<tr><th style="text-align:left;padding:5px 10px;background:#f8fafc;border:1px solid #e2e8f0;width:34%">${TH_LABEL[i]}</th><td style="padding:5px 10px;border:1px solid #e2e8f0">${v}</td></tr>`).join("")}</table></div>
  </details>`).join("")}</div>`;

// ---- Đường thời gian toàn bài (chốt kiến thức) ----
const TIMELINE_SVG = `<svg viewBox="0 0 1200 330" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;font-family:'Segoe UI',Arial,sans-serif">
  <line x1="30" y1="110" x2="1165" y2="110" stroke="#c2410c" stroke-width="6"/><polygon points="1165,98 1190,110 1165,122" fill="#c2410c"/>
  ${[[140, "🧮", "Hơn 2000 năm TCN", "Bàn tính", 0],
    [320, "⚙️", "1642", "Pascal: máy Pascaline", 1],
    [500, "✖️", "Sau Pascal", "Leibniz: thêm nhân, chia", 0],
    [680, "🏗️", "1833", "Dự án máy tính của Babbage", 1],
    [875, "🔌", "1943 – 1944", "ASCC / Harvard Mark I", 0],
    [1045, "🧠", "1945", "Von Neumann:|chương trình được lưu trữ", 1]].map(([x, ic, y, t, down]) => `
  <circle cx="${x}" cy="110" r="24" fill="#fff" stroke="#c2410c" stroke-width="5"/><text x="${x}" y="120" text-anchor="middle" font-size="26">${ic}</text>
  <text x="${x}" y="${down ? 160 : 58}" text-anchor="middle" font-size="22" font-weight="800" fill="#c2410c">${y}</text>
  ${t.split("|").map((ln, k) => `<text x="${x}" y="${(down ? 186 : 82) + k * 21}" text-anchor="middle" font-size="17" fill="#3b1d06">${ln}</text>`).join("")}`).join("")}
  <text x="30" y="222" font-size="18" font-weight="800" fill="#0f766e">Máy tính điện tử — 5 thế hệ:</text>
  ${[["Thế hệ 1 · 1945–1955", "Đèn điện tử chân không", "#64748b"], ["Thế hệ 2 · 1955–1965", "Bóng bán dẫn", "#0ea5e9"], ["Thế hệ 3 · 1965–1974", "Mạch tích hợp (IC)", "#10b981"],
    ["Thế hệ 4 · 1974–1990", "VLSI, bộ vi xử lí", "#f59e0b"], ["Thế hệ 5 · 1990–nay", "ULSI, trí tuệ nhân tạo", "#ef4444"]].map(([a, b, c], i) => `
  <rect x="${30 + i * 230}" y="236" width="224" height="80" rx="12" fill="${c}"/>
  <text x="${142 + i * 230}" y="268" text-anchor="middle" font-size="18" font-weight="800" fill="#fff">${a}</text>
  <text x="${142 + i * 230}" y="296" text-anchor="middle" font-size="17" fill="#fff">${b}</text>`).join("")}
</svg>`;

const GEN = ["1️⃣ Thế hệ thứ nhất (1945 – 1955)", "2️⃣ Thế hệ thứ hai (1955 – 1965)", "3️⃣ Thế hệ thứ ba (1965 – 1974)", "4️⃣ Thế hệ thứ tư (1974 – 1990)", "5️⃣ Thế hệ thứ năm (1990 – nay)"];

const LESSON = {
  meta: {
    subject: "Tin học", grade: "8", book: "Kết nối tri thức với cuộc sống",
    title: "Bài 1: Lược sử công cụ tính toán", unit: "Chủ đề 1 — Máy tính và cộng đồng",
    pages: "5–9", durationMinutes: 90,
  },
  objectives: {
    knowledge: [
      "Trình bày được sơ lược lịch sử phát triển của các công cụ tính toán từ thời cổ đại đến máy tính điện tử hiện đại.",
      "Nhận biết được một số cột mốc quan trọng trong quá trình phát triển của máy tính.",
      "Nêu được đặc điểm cơ bản của các thế hệ máy tính điện tử.",
      "Nêu được ví dụ cho thấy sự phát triển máy tính đã đem đến những thay đổi lớn lao cho xã hội loài người.",
    ],
    competencies: [
      "Tự học; giao tiếp và hợp tác (thảo luận nhóm, hoàn thành phiếu học tập, trình bày sản phẩm).",
      "Năng lực số 5.1.TC2a: nhận biết nhu cầu thực tiễn (tính toán nhiều, xử lí thông tin phức tạp, giảm sai sót) dẫn đến việc sáng tạo ra máy tính; nêu ví dụ máy tính giúp học tập, lao động, sản xuất hiệu quả hơn.",
      "Năng lực AI 8.C1.1: trình bày được cách AI thực hiện một số chức năng cơ bản như “đọc”, “nghe”, “nhìn” (liên hệ máy tính thế hệ thứ năm).",
    ],
    qualities: [
      "Chăm chỉ, sáng tạo không ngừng nhằm nâng cao hiệu suất lao động.",
      "Trách nhiệm: liên hệ sự phát triển khoa học – công nghệ thế giới với sự phát triển tin học của đất nước.",
    ],
  },
  coreKnowledge: [
    "Ý tưởng cơ giới hoá việc tính toán đóng vai trò quan trọng trong lịch sử phát triển của máy tính. Năm 1642, nhà bác học Blaise Pascal đã sáng chế ra chiếc máy tính cơ học Pascaline.",
    "Năm 1833, nhà Toán học Charles Babbage đã thiết kế máy tính đa năng, tính toán tự động tương tự như máy tính ngày nay.",
    "Máy tính điện tử ra đời vào những năm 1940. Theo kiến trúc Von Neumann, máy tính gồm bộ xử lí, bộ nhớ, các cổng kết nối với thiết bị vào – ra và đường truyền giữa các bộ phận; chương trình được lưu trữ trong bộ nhớ.",
    "Năm thế hệ của máy tính điện tử được đánh dấu bởi những tiến bộ công nghệ nhằm thu nhỏ các linh kiện điện tử, tích hợp chúng vào những thiết bị nhỏ, có tốc độ xử lí lớn, độ tin cậy cao, có khả năng kết nối toàn cầu, tiêu thụ ít năng lượng và được trang bị nhiều ứng dụng thân thiện với con người.",
    "Thế giới đang biến đổi nhanh chóng và sâu sắc nhờ sự phát triển của công nghệ máy tính.",
  ],
  keywords: ["Pascaline", "Babbage", "Von Neumann", "Thế hệ máy tính", "Bộ vi xử lí"],
  settings: { basePoints: 100, useTimer: false, defaultTime: 60, sound: true, streakEnabled: true },

  activities: [
    /* =========================== TIẾT 1 =========================== */
    /* ===================== HĐ1: MỞ ĐẦU (5 phút) ===================== */
    {
      id: "mo-dau", name: "Mở đầu — Công cụ bí ẩn 🧮", type: "knowledge",
      goal: "Nhận biết nhu cầu tính toán xuất hiện từ rất sớm; công cụ tính toán sớm nhất là bàn tính.",
      time: 300,
      task: "Nhóm quan sát hình, đọc SGK tr.5 (Công cụ tính toán đầu tiên) và thảo luận: Đây là gì? Thường được sử dụng trong lĩnh vực nào?",
      sgkImage: "assets/sgk/sgk-trang5.jpg",
      html: MO_DAU_HTML,
      content: {
        revealLabel: "📖 Công cụ tính toán đầu tiên (SGK tr.5)",
        blocks: [
          { kind: "list", value: [
            "Các phép tính đầu tiên được con người thực hiện bằng cách sử dụng 10 ngón tay.",
            "Hệ thống ghi số thập phân (cách ghi số sử dụng các chữ số từ 0 đến 9) vẫn là cách ghi số phổ biến hơn cả.",
            "Trong tiếng Anh, từ “chữ số” (digit) có nguồn gốc từ chữ digitus (trong tiếng Latin có nghĩa là ngón tay).",
            "Hơn 2000 năm trước Công nguyên, con người đã biết làm các phép tính số học. Một trong những công cụ tính toán sớm nhất là bàn tính (Hình 1.1).",
          ] },
          { kind: "image", value: "assets/sgk/hinh-1-1.jpg", caption: "Hình 1.1. Bàn tính hiển thị số 6 302 715 408" },
        ],
      },
      questions: [
        { question: "Công cụ trong hình là gì?", type: "multiple-choice",
          options: ["Bàn tính", "Máy tính cơ học Pascaline", "Khung dệt vải", "Máy đếm nhịp âm nhạc"],
          answer: 0, explanation: "Đây là bàn tính — một trong những công cụ tính toán sớm nhất của con người (SGK tr.5, Hình 1.1).", level: "nhan-biet", activity: "mo-dau" },
        { question: "Bàn tính thường được sử dụng trong lĩnh vực nào?", type: "multiple-choice",
          options: ["Âm nhạc", "Dệt may", "Toán học — thực hiện các phép tính số học", "Hội hoạ"],
          answer: 2, explanation: "Bàn tính là công cụ giúp con người thực hiện các phép tính số học (lĩnh vực Toán học).", level: "nhan-biet", activity: "mo-dau" },
        { question: "Chữ Latin “digitus” — nguồn gốc của từ “digit” (chữ số) trong tiếng Anh — có nghĩa là gì?", type: "multiple-choice",
          options: ["Hạt bàn tính", "Ngón tay", "Bánh răng", "Viên sỏi"],
          answer: 1, explanation: "Digitus nghĩa là ngón tay — vì các phép tính đầu tiên được con người thực hiện bằng 10 ngón tay.", level: "thong-hieu", activity: "mo-dau" },
      ],
      remember: [
        "Các phép tính đầu tiên được con người thực hiện bằng 10 ngón tay.",
        "Hệ thống ghi số thập phân (dùng các chữ số từ 0 đến 9) vẫn là cách ghi số phổ biến hơn cả.",
        "Một trong những công cụ tính toán sớm nhất là bàn tính.",
      ],
    },
    {
      id: "ban-tinh-ao", name: "Khám phá: Bàn tính hoạt động thế nào? 🔍", type: "knowledge",
      goal: "Quan sát Hình 1.1 để hiểu cách bàn tính biểu diễn số — mỗi cột là một chữ số.",
      time: 240,
      task: "Quan sát Hình 1.1 và bàn tính ảo: mỗi cột là một chữ số. Hạt trên có giá trị 5, hạt dưới có giá trị 1; chỉ tính hạt được gạt sát thanh ngang. Mời một bạn lên gẩy thử rồi đọc số.",
      sgkImage: "assets/sgk/hinh-1-1.jpg",
      abacus: {
        title: "Bàn tính ảo (giống Hình 1.1)", cols: 10, value: "6302715408",
        intro: "Bấm vào một hạt để gạt hạt đó (và các hạt phía trước) sát vào thanh ngang; bấm lần nữa để gạt ra. Số dưới mỗi cột là chữ số của cột đó.",
        presets: [{ label: "Hình 1.1: 6 302 715 408", value: "6302715408" }, { label: "Năm 2026", value: "2026" }],
      },
      content: {
        revealLabel: "🔎 Cách đọc số trên bàn tính (quan sát Hình 1.1)",
        blocks: [
          { kind: "list", value: [
            "Mỗi cột (thanh dọc) biểu diễn một chữ số; các cột xếp từ hàng lớn (bên trái) đến hàng đơn vị (bên phải).",
            "Hạt ở phần trên thanh ngang có giá trị 5, hạt ở phần dưới có giá trị 1.",
            "Chỉ tính những hạt được gạt sát thanh ngang. Ví dụ ở Hình 1.1: cột đầu tiên có 1 hạt trên và 1 hạt dưới sát thanh ngang → 5 + 1 = 6.",
          ] },
          { kind: "ext", value: "Cách đọc số trên được rút ra từ Hình 1.1; SGK không trình bày chi tiết cách dùng bàn tính." },
        ],
      },
    },
    {
      id: "thu-tai-ban-tinh", name: "Trò chơi: Thử tài gẩy bàn tính 🎯", type: "quiz",
      goal: "Đọc và biểu diễn số trên bàn tính; ghi nhớ các mốc năm của bài học.",
      time: 420,
      task: "Nhóm lần lượt đọc số trên bàn tính và gẩy hạt để biểu diễn các mốc năm quan trọng trong lịch sử máy tính.",
      sgkImage: "assets/sgk/hinh-1-1.jpg",
      questions: [
        { question: "Bàn tính đang biểu diễn năm Blaise Pascal sáng chế chiếc máy tính cơ học Pascaline. Đó là năm nào?", type: "abacus", mode: "read",
          answer: "1642", cols: 4, explanation: "Các cột: 1 · 6 (5 + 1) · 4 · 2 → 1642. Năm 1642, Pascal (khi đó chưa đầy 20 tuổi) chế tạo máy Pascaline.", level: "nhan-biet", activity: "thu-tai-ban-tinh" },
        { question: "Gẩy bàn tính để biểu diễn số 1833 — năm bắt đầu dự án máy tính đầy tham vọng của Charles Babbage.", type: "abacus", showDigits: true,
          answer: "1833", cols: 4, explanation: "1 · 8 (một hạt trên = 5, ba hạt dưới = 3) · 3 · 3 → 1833.", level: "thong-hieu", activity: "thu-tai-ban-tinh" },
        { question: "Bàn tính đang biểu diễn số phép tính mỗi giây của chiếc IBM 7090 (máy tính thế hệ thứ hai). Đó là số nào?", type: "abacus", mode: "read",
          answer: "229000", cols: 6, explanation: "Các cột: 2 · 2 · 9 (5 + 4) · 0 · 0 · 0 → 229 000 phép tính mỗi giây (SGK tr.7).", level: "thong-hieu", activity: "thu-tai-ban-tinh" },
        { question: "Không nhìn số dưới cột: gẩy bàn tính để biểu diễn năm 1975 — năm đất nước ta hoàn toàn thống nhất.", type: "abacus",
          answer: "1975", cols: 4, explanation: "1 · 9 (5 + 4) · 7 (5 + 2) · 5 (một hạt trên) → 1975.", level: "van-dung", activity: "thu-tai-ban-tinh" },
        { question: "Trên một cột của bàn tính có 1 hạt trên và 3 hạt dưới được gạt sát thanh ngang. Cột đó biểu diễn chữ số nào?", type: "multiple-choice",
          options: ["4", "3", "13", "8"],
          answer: 3, explanation: "Hạt trên có giá trị 5, mỗi hạt dưới có giá trị 1: 5 + 3 = 8.", level: "thong-hieu", activity: "thu-tai-ban-tinh" },
      ],
    },

    /* ===================== HĐ2.1: MÁY TÍNH CƠ HỌC (20 phút) ===================== */
    {
      id: "hd1-ra-doi", name: "Hoạt động 1: Sự ra đời của máy tính ⚙️", type: "knowledge",
      goal: "Biết sự ra đời của máy tính cơ học (Pascal, Leibniz) và ý tưởng thúc đẩy phát minh ra máy tính.",
      time: 480,
      task: "Nhóm đọc “Những chiếc bánh răng” (SGK tr.5–6), thảo luận và ghi vào bảng nhóm câu trả lời 3 câu hỏi của Hoạt động 1: 1) Tên của một trong những chiếc máy tính đầu tiên là gì? 2) Chiếc máy đó có thể làm được những gì? 3) Ý tưởng nào đã thúc đẩy sự phát minh ra máy tính?",
      sgkImage: "assets/sgk/hoat-dong-1.jpg",
      content: {
        heading: "⚙️ Những chiếc bánh răng",
        image: "assets/sgk/hinh-1-2.jpg", imageCaption: "Hình 1.2. Chiếc máy tính cơ học đầu tiên Pascaline",
        revealLabel: "📖 Những chiếc bánh răng (SGK tr.5–6)",
        blocks: [
          { kind: "text", value: "Hầu hết mọi người nghĩ về máy tính như một thiết bị điện tử, có khả năng xử lí dữ liệu đa dạng với tốc độ cao và có dung lượng lưu trữ lớn. Nhưng những chiếc máy tính đầu tiên lại chạy bằng… bánh răng!" },
          { kind: "list", value: [
            "Ý tưởng cơ giới hoá việc tính toán đóng vai trò quan trọng trong lịch sử phát triển của máy tính.",
            "Năm 1642, nhà bác học người Pháp Blaise Pascal, khi đó chưa đầy 20 tuổi, đã cho ra đời chiếc máy tính cơ học Pascaline (Hình 1.2) để giúp đỡ cha trong việc tính thuế.",
            "Sau Pascal, nhà Toán học người Đức Gottfried Leibniz đã cải tiến và thêm phép tính nhân, chia vào máy tính của Pascal để nó thực hiện được cả bốn phép tính số học.",
          ] },
        ],
      },
      questions: [
        { question: "Câu 1 (HĐ1). Tên của một trong những chiếc máy tính đầu tiên là gì?", type: "multiple-choice",
          options: ["ENIAC", "Harvard Mark I", "Pascaline", "IBM PC"],
          answer: 2, explanation: "Pascaline (1642) của Blaise Pascal là chiếc máy tính cơ học đầu tiên (Hình 1.2).", level: "nhan-biet", activity: "hd1-ra-doi" },
        { question: "Câu 2 (HĐ1). Chiếc máy Pascaline có thể làm được những gì?", type: "multiple-choice",
          options: ["Soạn thảo văn bản và in ấn", "Thực hiện các phép tính số học, giúp cha của Pascal tính thuế", "Lưu trữ và phát nhạc", "Tự động điều khiển các cỗ máy khác"],
          answer: 1, explanation: "Pascaline thực hiện các phép tính số học để giúp cha Pascal tính thuế; sau đó Leibniz thêm phép nhân, chia để máy thực hiện được cả bốn phép tính.", level: "nhan-biet", activity: "hd1-ra-doi" },
        { question: "Câu 3 (HĐ1). Ý tưởng nào đã thúc đẩy sự phát minh ra máy tính?", type: "multiple-choice",
          options: ["Ý tưởng dùng điện để chiếu sáng", "Ý tưởng kết nối mọi người trên thế giới", "Ý tưởng cơ giới hoá việc tính toán", "Ý tưởng thu nhỏ đồng hồ"],
          answer: 2, explanation: "“Ý tưởng cơ giới hoá việc tính toán đóng vai trò quan trọng trong lịch sử phát triển của máy tính” (SGK tr.5).", level: "thong-hieu", activity: "hd1-ra-doi" },
        { question: "Ai đã cải tiến, thêm phép nhân, chia vào máy tính của Pascal để nó thực hiện được cả bốn phép tính số học?", type: "multiple-choice",
          options: ["Gottfried Leibniz", "Charles Babbage", "Howard Aiken", "John Von Neumann"],
          answer: 0, explanation: "Nhà Toán học người Đức Gottfried Leibniz đã cải tiến máy tính của Pascal (SGK tr.6).", level: "nhan-biet", activity: "hd1-ra-doi" },
      ],
    },
    {
      id: "pht1-pascal-babbage", name: "Phiếu học tập số 1: Pascal hay Babbage? 🕰️", type: "dragdrop", layout: "cols",
      goal: "Hoàn thành Phiếu học tập 1 và đường thời gian về máy tính cơ học (năm, tác giả, sản phẩm, chức năng, ý tưởng).",
      time: 420,
      task: "Nhóm hoàn thành Phiếu học tập số 1: xếp mỗi thông tin vào đúng mốc trên đường thời gian (1642 · Blaise Pascal hoặc 1833 · Charles Babbage). Xếp hết rồi bấm Nộp bài.",
      sgkImage: "assets/sgk/sgk-trang6.jpg",
      html: PHT1_HTML,
      groups: ["🕰️ 1642 · Blaise Pascal", "⚙️ 1833 · Charles Babbage"],
      items: [
        { text: "Nhà bác học người Pháp", group: 0 },
        { text: "Sản phẩm: máy tính cơ học Pascaline", group: 0 },
        { text: "Ý tưởng: giúp đỡ cha trong việc tính thuế", group: 0 },
        { text: "Chế tạo máy khi chưa đầy 20 tuổi", group: 0 },
        { text: "Nhà Toán học, nhà phát minh, kĩ sư cơ khí người Anh", group: 1 },
        { text: "Sản phẩm: những cỗ máy thực hiện việc tính toán một cách tự động", group: 1 },
        { text: "Ý tưởng: tránh sai sót của con người trong việc tính toán và sao chép các con số", group: 1 },
        { text: "Dự án không hoàn thành do hạn chế về công nghệ", group: 1 },
        { text: "Được coi là cha đẻ của công nghệ máy tính", group: 1 },
      ],
      explanation: "Phiếu học tập 1 — Pascal: năm 1642, người Pháp, máy tính cơ học Pascaline, giúp cha tính thuế. Babbage: năm 1833, người Anh, cỗ máy tính toán tự động nhằm tránh sai sót của con người; dự án không hoàn thành do hạn chế về công nghệ nhưng ông được coi là cha đẻ của công nghệ máy tính.",
    },
    {
      id: "babbage", name: "Dự án máy tính của Babbage 🏗️", type: "knowledge",
      goal: "Nêu đặc điểm máy tính trong dự án của Babbage; giải thích vì sao dự án không hoàn thành.",
      time: 360,
      task: "Mỗi thành viên trong nhóm trả lời: Nguyên lí thiết kế máy tính của Babbage có giống như máy tính ngày nay không? Tại sao dự án của ông lại không được hoàn thành?",
      sgkImage: "assets/sgk/sgk-trang6.jpg",
      content: {
        heading: "🏗️ Dự án máy tính của Babbage",
        revealLabel: "📖 Dự án máy tính của Babbage (SGK tr.6)",
        blocks: [
          { kind: "text", value: "Năm 1833 đánh dấu dự án đầy tham vọng của nhà Toán học, nhà phát minh, kĩ sư cơ khí người Anh Charles Babbage nhằm thiết kế và chế tạo những cỗ máy thực hiện việc tính toán một cách tự động nhằm tránh những sai sót của con người trong việc tính toán và sao chép các con số." },
          { kind: "text", value: "Nguyên lí thiết kế máy tính của Babbage giống như máy tính ngày nay. Đó là loại máy đa năng, thực hiện tính toán tự động và có những ứng dụng ngoài tính toán thuần tuý. Vì vậy, mặc dù dự án của ông không được hoàn thành do hạn chế về công nghệ, ông vẫn được coi là cha đẻ của công nghệ máy tính." },
        ],
      },
      questions: [
        { question: "Câu hỏi SGK tr.6 — Máy tính trong dự án của Babbage có những đặc điểm gì?", type: "multiple-choice",
          options: ["Máy tính cơ học, thực hiện tự động.", "Máy tính có những ứng dụng ngoài tính toán thuần tuý.", "Có thiết kế giống với máy tính ngày nay.", "Cả ba đặc điểm trên."],
          answer: 3, explanation: "Máy của Babbage là máy đa năng, tính toán tự động, có ứng dụng ngoài tính toán thuần tuý và có nguyên lí thiết kế giống máy tính ngày nay.", level: "thong-hieu", activity: "babbage", sgkImage: "assets/sgk/cau-hoi-tr6.jpg" },
        { question: "Tại sao dự án máy tính của Babbage lại không được hoàn thành?", type: "multiple-choice",
          options: ["Vì ông không muốn tiếp tục", "Vì hạn chế về công nghệ thời bấy giờ", "Vì thời đó không ai cần tính toán", "Vì máy tính điện tử đã ra đời trước đó"],
          answer: 1, explanation: "Dự án không được hoàn thành do hạn chế về công nghệ (SGK tr.6).", level: "nhan-biet", activity: "babbage" },
        { question: "Nguyên lí thiết kế máy tính của Babbage giống máy tính ngày nay ở những điểm nào? (Chọn tất cả ý đúng)", type: "multiple-select",
          options: ["Là loại máy đa năng", "Thực hiện tính toán tự động", "Có những ứng dụng ngoài tính toán thuần tuý", "Chạy bằng đèn điện tử chân không"],
          answer: [0, 1, 2], explanation: "Máy của Babbage là máy đa năng, thực hiện tính toán tự động và có ứng dụng ngoài tính toán thuần tuý. Đèn điện tử chân không chỉ xuất hiện ở máy tính điện tử thế hệ thứ nhất (1945 – 1955).", level: "thong-hieu", activity: "babbage" },
      ],
      remember: [
        "Ý tưởng cơ giới hoá việc tính toán đóng vai trò quan trọng trong lịch sử phát triển của máy tính. Năm 1642, nhà bác học Blaise Pascal đã sáng chế ra chiếc máy tính cơ học Pascaline.",
        "Năm 1833, nhà Toán học Charles Babbage đã thiết kế máy tính đa năng, tính toán tự động tương tự như máy tính ngày nay.",
      ],
    },

    /* ===================== HĐ2.2: MÁY TÍNH ĐIỆN TỬ (25 phút) ===================== */
    {
      id: "dien-co-von-neumann", name: "Máy tính điện – cơ và kiến trúc Von Neumann 🔌", type: "knowledge",
      goal: "Biết sự ra đời của máy tính điện – cơ; nêu các thành phần của máy tính theo kiến trúc Von Neumann.",
      time: 600,
      task: "Nhóm đọc SGK tr.6–7 và ghi vào bảng nhóm: 1) Vẽ đường thời gian mô tả lịch sử ra đời của máy tính điện – cơ. 2) Máy tính cấu tạo dựa theo kiến trúc Von Neumann gồm những thành phần nào? Vẽ lại sơ đồ cấu trúc máy tính.",
      sgkImage: "assets/sgk/sgk-trang6.jpg",
      content: {
        heading: "🔌 Máy tính điện – cơ và kiến trúc Von Neumann",
        revealLabel: "📖 Đáp án: đường thời gian và sơ đồ cấu trúc máy tính (SGK tr.6–7)",
        blocks: [
          { kind: "svg", value: DIEN_CO_SVG },
          { kind: "list", value: [
            "Năm 24 tuổi, Claude Shannon chỉ ra rằng có thể sử dụng các rơ le để thực hiện các thao tác tính toán trên các dãy bit — nền tảng cho việc thiết kế các máy tính kĩ thuật số hiện đại. Máy tính thời kì đầu dựa trên rơ le gọi là máy tính điện – cơ.",
            "Năm 1943, được IBM tài trợ, Howard Aiken chế tạo máy tính điều khiển tuần tự tự động ASCC (Automatic Sequence Controlled Calculator): phép cộng mất gần một giây, phép nhân mất khoảng 6 giây. Máy được giới thiệu ở Đại học Harvard năm 1944 nên còn gọi là Harvard Mark I.",
            "Năm 1945, John Von Neumann trình bày nguyên lí “chương trình được lưu trữ”: 1) các lệnh của chương trình được lưu trữ trong bộ nhớ giống như dữ liệu; 2) để thực hiện nhiệm vụ nào, chỉ cần tải chương trình tương ứng vào bộ nhớ; 3) chương trình được nạp từ bộ nhớ vào bộ xử lí từng lệnh một và thực hiện xong mới nạp lệnh tiếp theo (tuần tự).",
            "Kiến trúc Von Neumann gồm: bộ xử lí, bộ nhớ, các cổng kết nối với thiết bị vào – ra và đường truyền giữa các bộ phận đó (Hình 1.3).",
          ] },
          { kind: "svg", value: HINH_1_3_SVG },
        ],
      },
      questions: [
        { question: "Claude Shannon chỉ ra rằng có thể sử dụng thiết bị nào để thực hiện các thao tác tính toán trên các dãy bit?", type: "multiple-choice",
          options: ["Rơ le", "Bánh răng", "Đèn điện tử chân không", "Bộ vi xử lí"],
          answer: 0, explanation: "Shannon chỉ ra có thể dùng các rơ le; máy tính dựa trên rơ le gọi là máy tính điện – cơ.", level: "nhan-biet", activity: "dien-co-von-neumann" },
        { question: "Máy tính ASCC (Harvard Mark I) do Howard Aiken chế tạo thực hiện một phép tính nhân mất khoảng bao lâu?", type: "multiple-choice",
          options: ["Gần một giây", "Khoảng một phút", "Khoảng 6 giây", "Một phần nghìn giây"],
          answer: 2, explanation: "ASCC thực hiện phép cộng mất gần một giây và phép nhân mất khoảng 6 giây (SGK tr.6).", level: "nhan-biet", activity: "dien-co-von-neumann" },
        { question: "Vì sao máy tính ASCC còn được biết tới với cái tên Harvard Mark I?", type: "multiple-choice",
          options: ["Vì do sinh viên Harvard chế tạo", "Vì là máy tính đầu tiên của IBM", "Vì có chữ Mark trên vỏ máy", "Vì được giới thiệu ở Đại học Harvard vào năm 1944"],
          answer: 3, explanation: "Máy tính này được giới thiệu ở Đại học Harvard vào năm 1944 nên còn được biết tới với cái tên Harvard Mark I.", level: "nhan-biet", activity: "dien-co-von-neumann" },
        { question: "Theo nguyên lí “chương trình được lưu trữ” của Von Neumann, những phát biểu nào đúng? (Chọn tất cả ý đúng)", type: "multiple-select",
          options: ["Các lệnh của chương trình được lưu trữ trong bộ nhớ giống như dữ liệu", "Để thực hiện nhiệm vụ nào, chỉ cần tải chương trình tương ứng vào bộ nhớ", "Bộ xử lí thực hiện tất cả các lệnh cùng một lúc", "Chương trình được nạp vào bộ xử lí từng lệnh một, thực hiện xong mới nạp lệnh tiếp theo"],
          answer: [0, 1, 3], explanation: "Ba ý của nguyên lí Von Neumann (SGK tr.6). Các lệnh được thực hiện tuần tự, không phải tất cả cùng lúc.", level: "thong-hieu", activity: "dien-co-von-neumann" },
      ],
      remember: [
        "Máy tính cấu tạo dựa theo kiến trúc Von Neumann gồm: bộ xử lí, bộ nhớ, các cổng kết nối với thiết bị vào – ra và đường truyền giữa các bộ phận đó.",
      ],
    },
    {
      id: "so-do-von-neumann", name: "Trò chơi: Ghép sơ đồ cấu trúc máy tính 🧩", type: "dragdrop", layout: "vonneumann",
      goal: "Ghi nhớ sơ đồ cấu trúc máy tính (Hình 1.3) và chức năng mỗi bộ phận.",
      time: 300,
      task: "Xếp tên bộ phận và thiết bị ví dụ vào đúng ô trong sơ đồ cấu trúc máy tính (mỗi ô ghi sẵn nhiệm vụ). Xếp hết rồi bấm Nộp bài.",
      sgkImage: "assets/sgk/hinh-1-3.jpg",
      groups: ["① Nhận dữ liệu từ bên ngoài", "② Nạp và thực hiện từng lệnh", "③ Lưu trữ lệnh của chương trình và dữ liệu", "④ Đưa kết quả ra bên ngoài"],
      items: [
        { text: "Thiết bị vào", group: 0 }, { text: "Bàn phím", group: 0 }, { text: "Máy quét", group: 0 },
        { text: "Bộ xử lí", group: 1 }, { text: "Bộ vi xử lí", group: 1 },
        { text: "Bộ nhớ", group: 2 }, { text: "RAM", group: 2 },
        { text: "Thiết bị ra", group: 3 }, { text: "Màn hình", group: 3 }, { text: "Máy in", group: 3 },
      ],
      explanation: "Hình 1.3: Thiết bị vào → (Bộ xử lí ⇄ Bộ nhớ) → Thiết bị ra. Bộ nhớ lưu các lệnh của chương trình và dữ liệu; bộ xử lí nạp từng lệnh từ bộ nhớ và thực hiện.",
    },
    {
      id: "chuong-trinh-luu-tru", name: "Máy tính chạy chương trình như thế nào? 🖥️", type: "knowledge",
      goal: "Hiểu nguyên lí “chương trình được lưu trữ”: lệnh nằm trong bộ nhớ, nạp và thực hiện tuần tự từng lệnh.",
      time: 420,
      task: "Tải chương trình “Tính tổng hai số” vào bộ nhớ rồi bấm ▶ Bước tiếp từng bước. Quan sát: lệnh nằm ở đâu? Bộ xử lí làm gì trước khi thực hiện một lệnh? Sau đó tải chương trình “Tính diện tích hình chữ nhật” — máy có phải thay đổi bộ phận nào không?",
      sgkImage: "assets/sgk/hinh-1-3.jpg",
      vonneumann: {
        title: "Mô phỏng máy tính theo kiến trúc Von Neumann",
        intro: "Mỗi lần bấm ▶ Bước tiếp là một pha: ① nạp lệnh từ bộ nhớ vào bộ xử lí, ② thực hiện lệnh. Có thể sửa số ở Thiết bị vào trước khi chạy.",
        programs: [
          { name: "Tính tổng hai số", inputs: { a: 7, b: 5 }, code: [
            { op: "in", v: "a", text: "Nhận số a từ bàn phím, lưu vào bộ nhớ" },
            { op: "in", v: "b", text: "Nhận số b từ bàn phím, lưu vào bộ nhớ" },
            { op: "calc", v: "t", e: "a + b", text: "Tính t = a + b, lưu t vào bộ nhớ" },
            { op: "out", e: "t", label: "Tổng", text: "Đưa t ra màn hình" },
            { op: "end", text: "Dừng chương trình" } ] },
          { name: "Tính diện tích hình chữ nhật", inputs: { d: 8, r: 5 }, code: [
            { op: "in", v: "d", text: "Nhận chiều dài d từ bàn phím, lưu vào bộ nhớ" },
            { op: "in", v: "r", text: "Nhận chiều rộng r từ bàn phím, lưu vào bộ nhớ" },
            { op: "calc", v: "s", e: "d * r", text: "Tính s = d × r, lưu s vào bộ nhớ" },
            { op: "out", e: "s", label: "Diện tích", text: "Đưa s ra màn hình" },
            { op: "end", text: "Dừng chương trình" } ] },
        ],
      },
      questions: [
        { question: "Trong mô phỏng, các lệnh của chương trình được lưu ở đâu?", type: "multiple-choice",
          options: ["Ở thiết bị vào", "Ở thiết bị ra", "Trong bộ nhớ, giống như dữ liệu", "Trên màn hình"],
          answer: 2, explanation: "Nguyên lí 1: các lệnh của chương trình được lưu trữ trong bộ nhớ giống như dữ liệu.", level: "nhan-biet", activity: "chuong-trinh-luu-tru" },
        { question: "Trước khi thực hiện một lệnh, bộ xử lí phải làm gì?", type: "multiple-choice",
          options: ["Nạp lệnh đó từ bộ nhớ vào bộ xử lí", "Nạp tất cả các lệnh cùng một lúc", "Xoá toàn bộ bộ nhớ", "Chờ thiết bị ra hoạt động"],
          answer: 0, explanation: "Nguyên lí 3: chương trình được nạp từ bộ nhớ vào bộ xử lí từng lệnh một và thực hiện xong mới nạp lệnh tiếp theo (tuần tự).", level: "thong-hieu", activity: "chuong-trinh-luu-tru" },
        { question: "Muốn máy tính chuyển từ tính tổng sang tính diện tích hình chữ nhật, theo nguyên lí Von Neumann ta cần làm gì?", type: "multiple-choice",
          options: ["Chế tạo lại bộ xử lí", "Thay bộ nhớ mới", "Thay bàn phím khác", "Tải chương trình tính diện tích vào bộ nhớ"],
          answer: 3, explanation: "Nguyên lí 2: để thực hiện nhiệm vụ nào, chỉ cần tải chương trình tương ứng vào bộ nhớ — không cần thay đổi phần cứng.", level: "van-dung", activity: "chuong-trinh-luu-tru" },
      ],
    },
    {
      id: "the-he-may-tinh", name: "Năm thế hệ máy tính điện tử 🚀", type: "knowledge",
      goal: "Nêu được đặc điểm cơ bản của năm thế hệ máy tính điện tử; phân biệt máy vi tính và máy tính cá nhân.",
      time: 720,
      task: "Nhóm nghiên cứu mục 2 SGK tr.7–8 (khoảng 12 phút), ghi vào Phiếu học tập số 2: thời gian, thành phần điện tử chính, bộ nhớ, kích thước, thiết bị vào – ra, ví dụ của từng thế hệ; phân biệt máy vi tính và máy tính cá nhân.",
      sgkImage: "assets/sgk/sgk-trang7.jpg",
      content: {
        heading: "🚀 Năm thế hệ máy tính điện tử",
        prompt: "Trải qua nhiều giai đoạn, dựa trên những tiến bộ về công nghệ, máy tính điện tử có thể được phân chia thành năm thế hệ.",
        revealLabel: "📖 Đặc điểm từng thế hệ (bấm vào từng thế hệ để mở)",
        blocks: [
          { kind: "html", value: THE_HE_HTML },
          { kind: "html", value: `<div style="display:flex;flex-wrap:wrap;gap:12px;justify-content:center;margin-top:10px">
            <figure style="margin:0;flex:0 1 300px"><img class="lesson-img" src="assets/sgk/hinh-1-4.jpg" alt="ENIAC"></figure>
            <figure style="margin:0;flex:0 1 240px"><img class="lesson-img" src="assets/sgk/hinh-1-5.jpg" alt="Minsk-22"></figure>
            <figure style="margin:0;flex:0 1 240px"><img class="lesson-img" src="assets/sgk/hinh-1-6.jpg" alt="IBM System/360"></figure></div>` },
          { kind: "list", value: [
            "Máy vi tính: máy tính dựa trên công nghệ vi xử lí — bộ xử lí là mạch tích hợp cỡ rất lớn, chứa hàng chục nghìn đến hàng triệu linh kiện bán dẫn (bộ vi xử lí) (SGK tr.8).",
            "Máy tính cá nhân: cách gọi máy vi tính được cải tiến theo hướng giảm kích thước và giá thành sản xuất để có thể được sở hữu bởi mỗi cá nhân (theo giáo án).",
          ] },
        ],
      },
      questions: [
        { question: "Câu hỏi SGK tr.8 — Bộ vi xử lí là linh kiện máy tính dựa trên công nghệ nào?", type: "multiple-choice",
          options: ["Đèn điện tử chân không.", "Linh kiện bán dẫn đơn giản.", "Mạch tích hợp hàng chục, hàng trăm linh kiện bán dẫn.", "Mạch tích hợp cỡ lớn, gồm hàng chục nghìn đến hàng triệu linh kiện bán dẫn."],
          answer: 3, explanation: "Mạch tích hợp cỡ rất lớn (VLSI) tạo nên những bộ xử lí nguyên khối chứa hàng chục nghìn đến hàng triệu linh kiện bán dẫn, gọi là bộ vi xử lí.", level: "thong-hieu", activity: "the-he-may-tinh", sgkImage: "assets/sgk/cau-hoi-tr8.jpg" },
        { question: "Chiếc máy tính thế hệ thứ hai được đưa vào nước ta năm 1968 là:", type: "multiple-choice",
          options: ["Minsk-22", "IBM 7090", "ENIAC", "IBM PC"],
          answer: 0, explanation: "Minsk-22 (Hình 1.5), sản xuất tại Belarus khoảng năm 1965, được đưa vào nước ta năm 1968.", level: "nhan-biet", activity: "the-he-may-tinh" },
        { question: "Máy tính thế hệ nào có một số khả năng xử lí thông tin giống con người như cảm nhận, suy luận, tương tác (trí tuệ nhân tạo)?", type: "multiple-choice",
          options: ["Thế hệ thứ nhất", "Thế hệ thứ hai", "Thế hệ thứ năm", "Thế hệ thứ tư"],
          answer: 2, explanation: "Nhờ mạch tích hợp cỡ siêu lớn và kĩ thuật xử lí song song, máy tính thế hệ thứ năm có khả năng cảm nhận, suy luận, tương tác… gọi là trí tuệ nhân tạo.", level: "nhan-biet", activity: "the-he-may-tinh" },
        { question: "Chiếc loa thông minh nghe và hiểu câu lệnh “Mở bài hát…” bằng giọng nói. Đây là đặc điểm của máy tính thế hệ nào?", type: "multiple-choice",
          options: ["Thế hệ thứ năm — thiết bị vào – ra được bổ sung thiết bị nhận dạng tiếng nói, hình ảnh, chuyển động", "Thế hệ thứ ba — được bổ sung bàn phím, màn hình", "Thế hệ thứ tư — được bổ sung thiết bị trỏ, máy quét", "Thế hệ thứ hai — dùng máy đọc băng từ"],
          answer: 0, explanation: "Máy tính thế hệ thứ năm được bổ sung thiết bị nhận dạng tiếng nói, hình ảnh, chuyển động — AI có thể “nghe”, “nhìn”, “đọc”. Loa thông minh là ví dụ SGK nêu.", level: "van-dung", activity: "the-he-may-tinh" },
      ],
      remember: [
        "Máy tính điện tử ra đời vào những năm 1940. Năm thế hệ của máy tính điện tử được đánh dấu bởi những tiến bộ công nghệ nhằm thu nhỏ các linh kiện điện tử, tích hợp chúng vào những thiết bị nhỏ, có tốc độ xử lí lớn, độ tin cậy cao, có khả năng kết nối toàn cầu, tiêu thụ ít năng lượng và được trang bị nhiều ứng dụng thân thiện với con người.",
      ],
    },
    {
      id: "pht2-cong-nghe", name: "Phiếu học tập số 2 (phần 1): Công nghệ · Bộ nhớ · Kích thước 🗂️", type: "dragdrop", layout: "cols",
      goal: "Phân biệt các thế hệ máy tính theo thành phần điện tử chính, bộ nhớ, kích thước.",
      time: 480,
      task: "Nhóm xếp mỗi đặc điểm vào đúng thế hệ máy tính điện tử (theo SGK tr.7–8). Xếp hết rồi bấm Nộp bài.",
      sgkImage: "assets/sgk/sgk-trang8.jpg",
      groups: GEN,
      items: [
        { text: "⚡ Đèn điện tử chân không", group: 0 }, { text: "💾 Bộ nhớ chính: trống từ", group: 0 }, { text: "📏 Rất lớn, thường chiếm một căn phòng", group: 0 },
        { text: "⚡ Bóng bán dẫn", group: 1 }, { text: "💾 Lõi từ, băng từ", group: 1 }, { text: "📏 Bộ phận xử lí lớn như những chiếc tủ", group: 1 },
        { text: "⚡ Mạch tích hợp (IC)", group: 2 }, { text: "💾 Lõi từ lớn, băng từ, đĩa từ", group: 2 }, { text: "📏 Tương đương một chiếc bàn làm việc", group: 2 },
        { text: "⚡ Mạch tích hợp cỡ rất lớn (VLSI) và bộ vi xử lí", group: 3 }, { text: "💾 CD, RAM, ROM, USB, SSD", group: 3 }, { text: "📏 Nhỏ, có thể đặt trên bàn", group: 3 },
        { text: "⚡ Mạch tích hợp cỡ siêu lớn (ULSI)", group: 4 }, { text: "📏 Nhỏ, mang theo người, dung lượng lưu trữ lớn", group: 4 },
      ],
      explanation: "Thành phần điện tử chính: đèn điện tử chân không → bóng bán dẫn → mạch tích hợp → VLSI và bộ vi xử lí → ULSI. Kích thước ngày càng nhỏ: một căn phòng → chiếc tủ → bàn làm việc → đặt trên bàn → mang theo người.",
    },
    {
      id: "pht2-vao-ra", name: "Phiếu học tập số 2 (phần 2): Thiết bị vào – ra · Ví dụ 🗂️", type: "dragdrop", layout: "cols",
      goal: "Nhận biết thiết bị vào – ra và máy tính tiêu biểu của từng thế hệ.",
      time: 420,
      task: "Nhóm xếp thiết bị vào – ra và ví dụ máy tính vào đúng thế hệ (theo SGK tr.7–8). Xếp hết rồi bấm Nộp bài.",
      sgkImage: "assets/sgk/sgk-trang7.jpg",
      groups: GEN,
      items: [
        { text: "⌨️ Máy đọc và tạo thẻ đục lỗ", group: 0 }, { text: "🖥️ ENIAC, EDVAC", group: 0 },
        { text: "⌨️ Máy đọc và in băng đục lỗ, máy đọc và in băng từ", group: 1 }, { text: "🖥️ IBM 7090, UNIVAC 1107, Minsk-22", group: 1 },
        { text: "⌨️ Được bổ sung bàn phím, màn hình, máy in", group: 2 }, { text: "🖥️ IBM System/360, PDP-11", group: 2 },
        { text: "⌨️ Được bổ sung thiết bị trỏ, máy quét", group: 3 }, { text: "🖥️ IBM PC, Apple II, Micral", group: 3 },
        { text: "⌨️ Được bổ sung thiết bị nhận dạng tiếng nói, hình ảnh, chuyển động", group: 4 }, { text: "🖥️ Điện thoại thông minh, loa thông minh, kính thông minh", group: 4 },
      ],
      explanation: "Thiết bị vào – ra ngày càng thân thiện: thẻ đục lỗ → băng đục lỗ, băng từ → bàn phím, màn hình, máy in → thiết bị trỏ, máy quét → nhận dạng tiếng nói, hình ảnh, chuyển động.",
    },
    {
      id: "duong-thoi-gian", name: "Trò chơi: Sắp xếp đường thời gian ⏳", type: "ordering",
      goal: "Hệ thống các cột mốc trong lịch sử phát triển công cụ tính toán.",
      time: 300,
      task: "Nhóm sắp xếp các cột mốc theo đúng thứ tự thời gian, từ xa xưa nhất đến gần đây nhất. Xếp xong bấm Nộp bài.",
      steps: [
        "🧮 Bàn tính — một trong những công cụ tính toán sớm nhất",
        "⚙️ Blaise Pascal sáng chế máy tính cơ học Pascaline",
        "✖️ Leibniz thêm phép nhân, chia vào máy tính của Pascal",
        "🏗️ Charles Babbage bắt đầu dự án máy tính tính toán tự động",
        "🔌 Howard Aiken chế tạo máy tính điện – cơ ASCC (Harvard Mark I)",
        "🧠 Von Neumann trình bày nguyên lí “chương trình được lưu trữ”",
        "💡 Micral — một trong những máy vi tính đầu tiên",
        "📱 Điện thoại thông minh, loa thông minh (máy tính thế hệ thứ năm)",
      ],
      explanation: "Hơn 2000 năm TCN: bàn tính → 1642: Pascaline → sau Pascal: Leibniz → 1833: Babbage → 1943–1944: ASCC / Harvard Mark I → 1945: Von Neumann → 1973: Micral → 1990 – nay: thế hệ thứ năm.",
    },
    {
      id: "chot-lich-su", name: "Giáo viên chốt: Đường thời gian lịch sử máy tính 📌", type: "knowledge",
      goal: "Hệ thống toàn bộ lịch sử phát triển công cụ tính toán trên một đường thời gian.",
      time: 180,
      task: "Cả lớp quan sát đường thời gian, nhắc lại mỗi cột mốc gắn với ai, năm nào, công nghệ gì.",
      content: {
        heading: "📌 Từ bàn tính đến máy tính thông minh",
        revealLabel: "⏳ Hiện đường thời gian",
        blocks: [{ kind: "svg", value: TIMELINE_SVG }],
      },
      remember: [
        "Năm 1642, Pascal sáng chế máy tính cơ học Pascaline; năm 1833, Babbage thiết kế máy tính đa năng, tính toán tự động.",
        "Năm 1945, Von Neumann trình bày nguyên lí “chương trình được lưu trữ”; máy tính gồm bộ xử lí, bộ nhớ, các cổng kết nối với thiết bị vào – ra và đường truyền.",
        "Năm thế hệ máy tính điện tử: đèn điện tử chân không → bóng bán dẫn → mạch tích hợp → VLSI, bộ vi xử lí → ULSI, trí tuệ nhân tạo.",
      ],
    },

    /* =========================== TIẾT 2 =========================== */
    /* ===================== HĐ2.3: MÁY TÍNH THAY ĐỔI THẾ GIỚI NHƯ THẾ NÀO (23 phút) ===================== */
    {
      id: "hd2-su-thay-doi", name: "Hoạt động 2: Sự thay đổi 🌏", type: "vandung",
      goal: "Nêu ví dụ cho thấy máy tính làm thay đổi sâu sắc cuộc sống của con người.",
      time: 300,
      task: "Nhóm thảo luận, ghi vào bảng nhóm và gửi cho thầy/cô ba ví dụ; đại diện nhóm trình bày.",
      sgkImage: "assets/sgk/hoat-dong-2.jpg",
      intro: "Gửi câu trả lời cho thầy/cô rồi bấm để xem gợi ý.",
      cases: [
        { question: "Em hãy lấy ba ví dụ cho thấy máy tính làm thay đổi sâu sắc cuộc sống của con người.",
          answer: "Gợi ý (giáo án): 1) Máy tính giúp con người giao tiếp, kết nối với nhau dù ở bất cứ đâu trên thế giới. 2) Máy tính giúp con người cập nhật tin tức, những kiến thức trong học tập. 3) Máy tính giúp con người làm việc và học tập từ xa, mua bán hàng hoá trực tuyến." },
      ],
    },
    {
      id: "thay-doi-the-gioi", name: "Máy tính thay đổi thế giới như thế nào? 🌐", type: "knowledge",
      goal: "Xác định các lĩnh vực chịu ảnh hưởng của máy tính và biểu hiện trong từng lĩnh vực.",
      time: 480,
      task: "Nhóm 4 bạn đọc mục 3 SGK tr.9 và trả lời: Máy tính đã ảnh hưởng đến những lĩnh vực nào trong cuộc sống của con người? Biểu hiện trong lĩnh vực đó?",
      sgkImage: "assets/sgk/sgk-trang9.jpg",
      content: {
        heading: "🌐 Máy tính thay đổi thế giới như thế nào?",
        prompt: "Máy tính tiếp nhận mệnh lệnh của con người để hoạt động bền bỉ, xử lí dữ liệu chính xác, với dung lượng lớn, tốc độ cao. Hơn thế, bằng cách rút ra những quy luật trong quá trình hoạt động, tạo ra những mệnh lệnh máy tính mới, máy tính có thể tự thay đổi, trở nên thông minh hơn.",
        revealLabel: "📖 Các lĩnh vực chịu ảnh hưởng (SGK tr.9)",
        blocks: [
          { kind: "list", value: [
            "🏥 Y tế: thiết bị nhỏ gọn như đồng hồ thông minh theo dõi sức khoẻ thường xuyên, phát hiện kịp thời hiện tượng bất thường của cơ thể và tự động thông báo đến người thân, cơ sở y tế hay dịch vụ cấp cứu.",
            "🎓 Giáo dục: Internet là kho thông tin khổng lồ giúp con người học mọi nơi, mọi lúc; giáo viên hỗ trợ học sinh từ xa; nhà khoa học, chuyên gia, nhà giáo dục phổ biến kiến thức, kĩ năng hiệu quả.",
            "💰 Kinh tế: giao dịch tăng lên nhanh chóng trong môi trường kĩ thuật số; người tiêu dùng và nhà cung ứng đa dạng hoá hình thức giao dịch; nền kinh tế năng động hơn, phát triển hơn.",
            "🛡️ Quốc phòng: thiết bị bay thông minh hỗ trợ quan sát vùng trời, vùng biển, lãnh thổ; khí tài tự động cao, nhanh, chính xác giúp quân đội bảo vệ Tổ quốc.",
            "🚨 An toàn xã hội: camera an ninh nơi công cộng phát hiện hiện tượng vi phạm pháp luật, giúp người dân và cơ quan chức năng kịp thời xử lí, giữ gìn cuộc sống bình yên.",
            "Con người cũng dần thay đổi hành vi để thích nghi với môi trường mới — tạo nên những chuyển biến mạnh mẽ trong mọi lĩnh vực: nghiên cứu khoa học, giáo dục, y tế, quản lí xã hội, phát triển kinh tế,…",
          ] },
        ],
      },
      questions: [
        { question: "Theo SGK, bằng cách nào máy tính có thể tự thay đổi, trở nên thông minh hơn?", type: "multiple-choice",
          options: ["Tăng kích thước và trọng lượng", "Rút ra những quy luật trong quá trình hoạt động, tạo ra những mệnh lệnh máy tính mới", "Dùng nhiều điện năng hơn", "Chờ con người điều khiển từng bước"],
          answer: 1, explanation: "“Bằng cách rút ra những quy luật trong quá trình hoạt động, tạo ra những mệnh lệnh máy tính mới, máy tính có thể tự thay đổi, trở nên thông minh hơn” (SGK tr.9).", level: "thong-hieu", activity: "thay-doi-the-gioi" },
      ],
      remember: ["Thế giới đang biến đổi nhanh chóng và sâu sắc nhờ sự phát triển của công nghệ máy tính."],
    },
    {
      id: "ghep-linh-vuc", name: "Trò chơi: Ghép lĩnh vực – ứng dụng 🧲", type: "dragdrop", layout: "cols",
      goal: "Nhận ra tác động của máy tính trong 5 lĩnh vực: y tế, giáo dục, kinh tế, quốc phòng, an toàn xã hội.",
      time: 360,
      task: "Nhóm xếp mỗi ứng dụng của máy tính vào đúng lĩnh vực (theo SGK tr.9). Xếp hết rồi bấm Nộp bài.",
      sgkImage: "assets/sgk/sgk-trang9.jpg",
      groups: ["🏥 Y tế", "🎓 Giáo dục", "💰 Kinh tế", "🛡️ Quốc phòng", "🚨 An toàn xã hội"],
      items: [
        { text: "Đồng hồ thông minh theo dõi sức khoẻ thường xuyên", group: 0 },
        { text: "Tự động báo cho người thân, dịch vụ cấp cứu khi cơ thể có dấu hiệu bất thường", group: 0 },
        { text: "Học mọi nơi, mọi lúc nhờ kho thông tin Internet", group: 1 },
        { text: "Giáo viên hỗ trợ học sinh từ xa", group: 1 },
        { text: "Giao dịch tăng nhanh trong môi trường kĩ thuật số", group: 2 },
        { text: "Người tiêu dùng và nhà cung ứng đa dạng hoá hình thức giao dịch", group: 2 },
        { text: "Thiết bị bay thông minh quan sát vùng trời, vùng biển, lãnh thổ", group: 3 },
        { text: "Khí tài tự động cao, nhanh và chính xác", group: 3 },
        { text: "Camera an ninh nơi công cộng phát hiện vi phạm pháp luật", group: 4 },
        { text: "Giúp cơ quan chức năng kịp thời xử lí, giữ gìn cuộc sống bình yên", group: 4 },
      ],
      explanation: "SGK tr.9: máy tính đã thay đổi sâu sắc các lĩnh vực y tế, giáo dục, kinh tế, quốc phòng và an toàn xã hội.",
    },

    /* ===================== HĐ3: LUYỆN TẬP (12 phút) ===================== */
    {
      id: "ngoi-sao", name: "Luyện tập — Trò chơi “Ngôi sao may mắn” ⭐", type: "giftbox", boxIcon: "⭐",
      goal: "Củng cố kiến thức về lịch sử công cụ tính toán, máy tính cơ học và máy tính điện tử.",
      time: 480,
      task: "Mỗi đội 6 thành viên; bầu trọng tài nêu câu hỏi, chấm điểm và thư kí ghi điểm. Các đội lần lượt chọn ngôi sao và trả lời. Đội trả lời đúng nhiều nhất thắng và được mở hộp quà bí mật!",
      intro: "6 ngôi sao may mắn — chọn sao, trả lời đúng để ghi điểm cho đội ⭐",
      prizes: ["⭐ Ngôi sao may mắn", "👏 Một tràng pháo tay", "🎁 Quà bí mật từ thầy/cô", "🏅 Danh hiệu “Nhà sử học máy tính”", "🌟 Lời khen trước lớp", "🎉 Cộng điểm cho đội"],
      questions: [
        { question: "Câu 1. Máy tính trong dự án của Babbage có những đặc điểm gì?", type: "multiple-choice",
          options: ["Máy tính cơ học, thực hiện tự động.", "Máy tính có những ứng dụng ngoài tính toán thuần tuý.", "Có thiết kế giống với máy tính ngày nay.", "Cả ba đặc điểm trên."],
          answer: 3, explanation: "Máy của Babbage đa năng, tính toán tự động, có ứng dụng ngoài tính toán thuần tuý, thiết kế giống máy tính ngày nay.", level: "thong-hieu", activity: "ngoi-sao" },
        { question: "Câu 2. Bộ vi xử lí là linh kiện máy tính dựa trên công nghệ nào?", type: "multiple-choice",
          options: ["Đèn điện tử chân không.", "Linh kiện bán dẫn đơn giản.", "Mạch tích hợp hàng chục, hàng trăm linh kiện bán dẫn.", "Mạch tích hợp cỡ lớn, gồm hàng chục nghìn đến hàng triệu linh kiện bán dẫn."],
          answer: 3, explanation: "Bộ vi xử lí là mạch tích hợp cỡ rất lớn (VLSI), chứa hàng chục nghìn đến hàng triệu linh kiện bán dẫn.", level: "nhan-biet", activity: "ngoi-sao" },
        { question: "Câu 3. Đâu là ví dụ về máy tính ở thế hệ thứ ba?", type: "multiple-choice",
          options: ["IBM System/360", "IBM Simon", "IBM PC", "IBM 7090"],
          answer: 0, explanation: "IBM System/360 (1964) thuộc thế hệ thứ ba; IBM 7090 thuộc thế hệ thứ hai; IBM PC thuộc thế hệ thứ tư.", level: "nhan-biet", activity: "ngoi-sao" },
        { question: "Câu 4. Thành phần điện tử chính của máy tính từ thế hệ thứ ba đến thế hệ thứ năm là:", type: "multiple-choice",
          options: ["trống từ", "mạch tích hợp", "lõi từ", "băng từ"],
          answer: 1, explanation: "Thế hệ thứ ba: mạch tích hợp; thứ tư: mạch tích hợp cỡ rất lớn; thứ năm: mạch tích hợp cỡ siêu lớn.", level: "thong-hieu", activity: "ngoi-sao" },
        { question: "Câu 5. Đâu KHÔNG phải là tác động của máy tính đến lĩnh vực giáo dục?", type: "multiple-choice",
          options: ["Giúp con người tìm hiểu kiến thức, thông tin.", "Giúp giáo viên hỗ trợ học sinh từ xa.", "Giúp con người giải trí, xem phim, nghe nhạc.", "Giúp dạy và học trực tuyến trong giai đoạn dịch bệnh."],
          answer: 2, explanation: "Giải trí, xem phim, nghe nhạc không phải là tác động đến lĩnh vực giáo dục. Ba phương án còn lại đều là tác động của máy tính đến giáo dục.", level: "thong-hieu", activity: "ngoi-sao" },
        { question: "Câu 6. Phát biểu nào dưới đây SAI?", type: "multiple-choice",
          options: ["Những máy tính thế hệ thứ năm sử dụng công nghệ tích hợp mật độ siêu cao.", "Các máy tính thế hệ thứ tư sử dụng công nghệ tích hợp mật độ rất cao.", "Các máy tính thế hệ thứ ba sử dụng bóng bán dẫn.", "Những máy tính thế hệ thứ nhất sử dụng công nghệ đèn điện tử chân không."],
          answer: 2, explanation: "Máy tính thế hệ thứ ba dùng mạch tích hợp; bóng bán dẫn là thành phần chính của thế hệ thứ hai.", level: "thong-hieu", activity: "ngoi-sao" },
      ],
    },
    {
      id: "luyen-tap", name: "Luyện tập SGK tr.9 ✍️", type: "vandung",
      goal: "Liên hệ sự khác biệt trong học tập nhờ công nghệ số; nêu ứng dụng thông minh; khái quát lịch sử máy tính.",
      time: 420,
      task: "Nhóm thảo luận, gửi câu trả lời cho thầy/cô; đại diện nhóm trình bày, các nhóm nhận xét, chấm điểm chéo.",
      sgkImage: "assets/sgk/luyen-tap-van-dung.jpg",
      intro: "Gửi câu trả lời cho thầy/cô rồi bấm để xem gợi ý.",
      cases: [
        { question: "1. Em hãy nêu một ví dụ cho thấy sự khác nhau rõ ràng trong hoạt động học tập khi chưa có và khi có các thiết bị công nghệ số hiện nay.",
          answer: "Gợi ý (giáo án): Khi có thiết bị công nghệ số — nguồn thông tin dồi dào hơn, được chia sẻ rộng rãi nhờ Internet, dễ tiếp cận hơn, chất lượng cao hơn; có thể dạy và học trực tuyến, từ xa; thảo luận nhóm và trao đổi bài tập trực tuyến. Ví dụ: trước đây muốn tra một kiến thức phải đến thư viện tìm sách; nay có thể tra cứu ngay trên Internet, học qua video bài giảng." },
        { question: "2. Em hãy nêu ví dụ về một ứng dụng mà em cho là thông minh của những máy tính thế hệ mới.",
          answer: "Gợi ý (giáo án): phần mềm chỉ đường Google Maps; phần mềm học trực tuyến Google Meet, Zoom, Microsoft Teams; phần mềm quản lí lớp học Schoology, Moodle,…; phần mềm lưu trữ, chia sẻ thông tin Google Drive, OneDrive,…; phần mềm trình chiếu PowerPoint." },
        { question: "3. Em hãy nêu sơ lược lịch sử phát triển của máy tính. Theo em, điều gì giúp máy tính trở nên gọn nhẹ hơn, nhanh hơn, thông minh hơn?",
          answer: "Gợi ý: bàn tính → máy tính cơ học Pascaline (1642) → dự án của Babbage (1833) → máy tính điện – cơ ASCC/Harvard Mark I (1943–1944) → nguyên lí Von Neumann (1945) → năm thế hệ máy tính điện tử. Máy tính gọn nhẹ hơn, nhanh hơn, thông minh hơn là nhờ sự phát triển của công nghệ (đèn điện tử chân không → bóng bán dẫn → mạch tích hợp → VLSI → ULSI) và sự phát triển của phần cứng tạo điều kiện phát triển trí tuệ nhân tạo (giáo án)." },
      ],
    },

    /* ===================== HĐ4: VẬN DỤNG (5 phút) ===================== */
    {
      id: "van-dung", name: "Vận dụng 🚀", type: "vandung",
      goal: "Vận dụng kiến thức lịch sử máy tính vào thực tiễn Việt Nam; dự báo ứng dụng của máy tính trong tương lai.",
      time: 300,
      task: "Nhóm thảo luận (SGK tr.9), gửi câu trả lời cho thầy/cô; đại diện nhóm trình bày. Có thể hoàn thành tiếp ở nhà.",
      sgkImage: "assets/sgk/luyen-tap-van-dung.jpg",
      intro: "Gửi câu trả lời cho thầy/cô rồi bấm để xem gợi ý.",
      cases: [
        { question: "1. Em hãy cho biết vào thời điểm đất nước ta hoàn toàn thống nhất, năm 1975, những thế hệ máy tính điện tử nào đã xuất hiện ở nước ta.",
          answer: "Theo SGK: máy tính thế hệ thứ ba thuộc họ IBM System/360 được đưa vào nước ta năm 1967; máy tính thế hệ thứ hai Minsk-22 được đưa vào nước ta năm 1968. Vậy năm 1975 đã có máy tính thế hệ thứ hai và thế hệ thứ ba. Ý nghĩa: dù kinh tế còn nhiều khó khăn, nước ta đã sớm tiếp cận máy tính điện tử. Trách nhiệm: mỗi người cần phát huy điều kiện hiện có, phát huy bản thân để thích nghi với sự thay đổi và góp phần vào sự phát triển của đất nước." },
        { question: "2. Em hãy đưa ra một dự báo về ứng dụng của máy tính trong tương lai. Hãy giải thích cơ sở của dự báo đó.",
          answer: "Gợi ý: máy tính điều khiển robot tự động thu gom, phân loại và xử lí rác thải. Cơ sở: Trái Đất ngày càng ô nhiễm, hiệu ứng nhà kính tăng cao; máy tính thế hệ mới đã có khả năng nhận dạng hình ảnh, chuyển động và trí tuệ nhân tạo nên có thể nhận biết, phân loại rác, giúp môi trường trong lành hơn." },
        { question: "3. Những máy tính em đang sử dụng thuộc thế hệ nào?",
          answer: "Gợi ý (giáo án): máy tính xách tay, máy tính bảng, điện thoại thông minh em đang dùng là máy tính thế hệ thứ năm (mạch tích hợp cỡ siêu lớn, nhỏ gọn, có thể nhận dạng tiếng nói, hình ảnh)." },
      ],
    },

    /* ===================== TỔNG KẾT ===================== */
    {
      id: "tong-ket", name: "Tổng kết", type: "summary",
      task: "Cả lớp nhắc lại kiến thức trọng tâm và làm thử thách cuối. Về nhà: ôn bài, tìm thêm ví dụ; xem trước Bài 2: Thông tin trong môi trường số.",
      content: {
        learned: [
          "Bàn tính là một trong những công cụ tính toán sớm nhất; ý tưởng cơ giới hoá việc tính toán dẫn tới máy tính cơ học Pascaline (Pascal, 1642).",
          "Babbage (1833) thiết kế máy tính đa năng, tính toán tự động — ông được coi là cha đẻ của công nghệ máy tính.",
          "Máy tính điện tử ra đời vào những năm 1940; kiến trúc Von Neumann: bộ xử lí, bộ nhớ, cổng kết nối vào – ra, đường truyền; chương trình được lưu trữ.",
          "Năm thế hệ: đèn điện tử chân không → bóng bán dẫn → mạch tích hợp → VLSI, bộ vi xử lí → ULSI, trí tuệ nhân tạo.",
          "Thế giới đang biến đổi nhanh chóng và sâu sắc nhờ sự phát triển của công nghệ máy tính.",
        ],
        challenge: [
          { question: "Bạn Minh nói: “Máy tính có thể làm nhiều việc khác nhau mà không cần thay bộ phận nào, chỉ cần cài chương trình khác.” Điều này dựa trên nguyên lí nào?", type: "multiple-choice",
            options: ["Nguyên lí cơ giới hoá việc tính toán của Pascal", "Nguyên lí “chương trình được lưu trữ” của Von Neumann", "Nguyên lí rơ le của Shannon", "Nguyên lí thu nhỏ linh kiện của thế hệ thứ năm"],
            answer: 1, explanation: "Theo Von Neumann: để thực hiện nhiệm vụ nào, chỉ cần tải chương trình tương ứng vào bộ nhớ.", level: "van-dung", activity: "tong-ket" },
          { question: "Sắp xếp theo thứ tự thời gian thành phần điện tử chính của máy tính điện tử, đâu là thứ tự đúng?", type: "multiple-choice",
            options: ["Bóng bán dẫn → đèn điện tử chân không → mạch tích hợp → VLSI → ULSI", "Đèn điện tử chân không → mạch tích hợp → bóng bán dẫn → ULSI → VLSI", "Mạch tích hợp → bóng bán dẫn → đèn điện tử chân không → VLSI → ULSI", "Đèn điện tử chân không → bóng bán dẫn → mạch tích hợp → VLSI → ULSI"],
            answer: 3, explanation: "Thế hệ 1: đèn điện tử chân không; 2: bóng bán dẫn; 3: mạch tích hợp; 4: VLSI và bộ vi xử lí; 5: ULSI.", level: "van-dung-cao", activity: "tong-ket" },
        ],
      },
    },
  ],
};

if (typeof module !== "undefined" && module.exports) module.exports = LESSON;
if (typeof window !== "undefined") window.LESSON = LESSON;
