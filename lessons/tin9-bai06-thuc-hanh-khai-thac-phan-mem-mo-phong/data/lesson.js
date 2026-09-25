/* ============================================================================
 * BÀI 6 — THỰC HÀNH: KHAI THÁC PHẦN MỀM MÔ PHỎNG  (Tin học 9 — Kết nối tri thức)
 * Chủ đề 4: Ứng dụng tin học.
 * Bám sát SGK trang 23–26 + Kế hoạch bài dạy (2 tiết) của giáo viên.
 * Chỉ sửa file này để đổi nội dung. Engine app.js không cần sửa.
 * ==========================================================================*/

// ---- Ngôi sao năm cánh tương tác (Hình 6.6): kéo thanh trượt = kéo điểm P, Q ----
const STAR_HTML = (function () {
  const R = 100, P = (k) => { const t = (-90 + 72 * k) * Math.PI / 180; return [R * Math.cos(t), R * Math.sin(t)]; };
  const V = [0, 1, 2, 3, 4].map(P); // V0 đỉnh trên, V1 phải trên, V2 phải dưới, V3 trái dưới, V4 trái trên
  const cut = (p1, p2, p3, p4) => { const d = (p1[0] - p2[0]) * (p3[1] - p4[1]) - (p1[1] - p2[1]) * (p3[0] - p4[0]); const a = p1[0] * p2[1] - p1[1] * p2[0], b = p3[0] * p4[1] - p3[1] * p4[0]; return [(a * (p3[0] - p4[0]) - (p1[0] - p2[0]) * b) / d, (a * (p3[1] - p4[1]) - (p1[1] - p2[1]) * b) / d]; };
  const A = V[4], D = V[1], B = cut(A, D, V[0], V[3]), C = cut(A, D, V[0], V[2]);
  const f = (p) => p[0].toFixed(1) + "," + p[1].toFixed(1);
  const line = (p, q, col, w) => `<line x1="${p[0].toFixed(1)}" y1="${p[1].toFixed(1)}" x2="${q[0].toFixed(1)}" y2="${q[1].toFixed(1)}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>`;
  const lbl = (p, t, dx, dy) => `<text x="${(p[0] + dx).toFixed(1)}" y="${(p[1] + dy).toFixed(1)}" font-size="14" font-weight="700" fill="#111">${t}</text>`;
  const phi = (1 + Math.sqrt(5)) / 2, AD = 6.59, AC = AD / phi, AB = AC / phi, BC = AB / phi;
  const star = `<polygon points="${[0, 2, 4, 1, 3].map((k) => f(V[k])).join(" ")}" fill="#fef3c7" stroke="#334155" stroke-width="1.6" stroke-linejoin="round"/>`
    + line(A, B, "#2563eb", 4) + line(B, C, "#16a34a", 4) + line(C, D, "#94a3b8", 2)
    + [A, B, C, D].map((p) => `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="3.2" fill="#dc2626"/>`).join("")
    + lbl(A, "A", -16, -6) + lbl(B, "B", -6, -8) + lbl(C, "C", 2, -8) + lbl(D, "D", 6, -6);
  const len = (n, v) => `<div>m <span style="text-decoration:overline">${n}</span> = <b data-l="${v.toFixed(4)}">${v.toFixed(2).replace(".", ",")}</b> cm</div>`;
  const onInput = "var s=this.value/100,r=this.closest('.gstar');r.querySelector('.gs-g').setAttribute('transform','scale('+s+')');r.querySelectorAll('[data-l]').forEach(function(e){e.textContent=(e.getAttribute('data-l')*s).toFixed(2).replace('.',',')});";
  return `<div class="gstar" style="display:grid;grid-template-columns:minmax(220px,1fr) minmax(220px,1.2fr);gap:14px;align-items:center;background:#f8fafc;border:2px solid #c7d2fe;border-radius:16px;padding:12px 16px">
    <div style="font-size:1.15rem;line-height:1.7">${len("AB", AB)}${len("BC", BC)}${len("AC", AC)}${len("AD", AD)}
      <div style="margin-top:8px;padding:8px 10px;background:#eef2ff;border-radius:10px">AB/BC = AC/AB = AD/AC = <b style="color:#b45309">1,61803…</b></div>
      <label style="display:block;margin-top:10px;font-weight:700">P ●<input type="range" min="45" max="130" value="100" style="width:60%;vertical-align:middle;margin:0 8px" oninput="${onInput}">● Q</label>
      <small style="color:#64748b">Kéo thanh trượt (như kéo điểm P, Q) để đổi kích thước ngôi sao — quan sát độ dài và tỉ lệ.</small></div>
    <svg viewBox="-140 -125 280 250" style="width:100%;max-height:330px"><g class="gs-g">${star}</g></svg></div>`;
})();

// ---- Sơ đồ chuỗi chuyển hoá năng lượng (Hình 6.4) ----
const ENERGY_HTML = `<div style="display:flex;flex-wrap:wrap;align-items:stretch;gap:10px;font-size:1.05rem">
  <div style="flex:1;min-width:190px;background:#fff7ed;border:2px solid #fb923c;border-radius:14px;padding:10px"><b>① Nguồn năng lượng</b><div style="display:flex;gap:6px;margin-top:6px"><img src="assets/phet/xe-dap.png" height="46"><img src="assets/phet/voi-nuoc.png" height="46"><img src="assets/phet/mat-troi.png" height="46"><img src="assets/phet/am-nuoc.png" height="46"></div><small>Người đạp xe · vòi nước chảy · ánh sáng mặt trời · ấm nước sôi</small></div>
  <div style="align-self:center;font-size:2rem">➜</div>
  <div style="flex:1;min-width:170px;background:#eff6ff;border:2px solid #60a5fa;border-radius:14px;padding:10px"><b>② Chuyển hoá thành điện năng</b><div style="display:flex;gap:6px;margin-top:6px"><img src="assets/phet/pin-mat-troi.png" height="46"></div><small>Máy phát điện · pin mặt trời</small></div>
  <div style="align-self:center;font-size:2rem">➜</div>
  <div style="flex:1;min-width:190px;background:#f0fdf4;border:2px solid #4ade80;border-radius:14px;padding:10px"><b>③ Thiết bị tiêu thụ điện</b><div style="display:flex;gap:6px;margin-top:6px"><img src="assets/phet/bong-den-soi-dot.png" height="46"><img src="assets/phet/quat.png" height="46"></div><small>Bếp điện · bóng đèn sợi đốt · bóng đèn compact · quạt điện</small></div></div>
  <p style="margin:10px 0 0;font-size:1.05rem">Tick <b>Biểu tượng năng lượng</b> để thấy các “khối năng lượng”: <b>C</b> cơ · <b>Đ</b> điện · <b>N</b> nhiệt · <b>Q</b> quang · <b>H</b> hoá.</p>`;

const PHET_ENERGY = "https://phet.colorado.edu/vi/simulations/energy-forms-and-changes";
const PHET_CIRCUIT = "https://phet.colorado.edu/sims/html/circuit-construction-kit-dc-virtual-lab/latest/circuit-construction-kit-dc-virtual-lab_vi.html";
const IMG = (n) => "assets/phet/" + n + ".png";

const LESSON = {
  meta: {
    subject: "Tin học", grade: "9", book: "Kết nối tri thức với cuộc sống",
    title: "Bài 6: Thực hành — Khai thác phần mềm mô phỏng", unit: "Chủ đề 4 — Ứng dụng tin học",
    pages: "23–26", durationMinutes: 90,
  },
  objectives: {
    knowledge: [
      "Nêu được những kiến thức đã thu nhận từ việc khai thác một vài phần mềm mô phỏng.",
      "Hiểu nguyên tắc hoạt động cơ bản của mô phỏng bằng máy tính: dữ liệu đầu vào → xử lí → kết quả.",
      "Nhận biết sự mô phỏng thế giới thực nhờ máy tính giúp con người khám phá tri thức và giải quyết vấn đề.",
    ],
    competencies: [
      "Tự chủ, tự học; giao tiếp và hợp tác (nhóm 2 HS/1 máy); giải quyết vấn đề và sáng tạo.",
      "Năng lực số 5.3.TC2a/b: thao tác với PhET, Geometer's Sketchpad; thay đổi tham số, đo đạc, ghi nhận kết quả.",
      "Năng lực số 5.1.TC2a: hiểu mô phỏng là biểu diễn thế giới thực bằng mô hình số; mô phỏng an toàn, tiết kiệm.",
      "Năng lực AI 9.D2.3: dùng AI hỗ trợ tổng hợp kiến thức, luôn kiểm chứng với kết quả mô phỏng và SGK.",
    ],
    qualities: ["Chăm chỉ, trung thực (báo cáo đúng kết quả), trách nhiệm (bảo quản thiết bị, hợp tác)."],
  },
  coreKnowledge: [
    "Phần mềm mô phỏng tái hiện hiện tượng thực tế trên máy tính: thay đổi dữ liệu/tham số → quan sát kết quả → khám phá tri thức một cách an toàn, tiết kiệm.",
    "Năng lượng có nhiều dạng (cơ, nhiệt, điện, quang, hoá) và chuyển hoá qua lại: pin mặt trời biến quang năng thành điện năng; máy phát điện biến cơ năng thành điện năng.",
    "Đo cường độ dòng điện bằng ampe kế, mắc NỐI TIẾP với đoạn mạch cần đo; không mắc trực tiếp vào hai cực nguồn điện.",
    "Trong ngôi sao năm cánh đều: AB/BC = AC/AB = AD/AC = (1 + √5)/2 ≈ 1,618 — tỉ lệ vàng, không đổi khi thay đổi kích thước ngôi sao.",
  ],
  keywords: ["Mô phỏng", "Chuyển hoá năng lượng", "Ampe kế mắc nối tiếp", "Tỉ lệ vàng ≈ 1,618"],
  settings: { basePoints: 100, useTimer: false, defaultTime: 60, sound: true, streakEnabled: true },

  activities: [
    /* ===================== HĐ1: MỞ ĐẦU (6 phút) ===================== */
    {
      id: "khoi-dong", name: "Mở đầu — Ôn nhanh phần mềm mô phỏng 🚀", type: "knowledge",
      goal: "Hệ thống lại kiến thức về phần mềm mô phỏng; tạo hứng thú cho giờ thực hành.",
      time: 180,
      task: "Mỗi nhóm trả lời nhanh 5 câu hỏi ôn tập về phần mềm mô phỏng (3 phút).",
      sgkImage: "assets/sgk/sgk-trang23.jpg",
      content: {
        heading: "🚀 Khởi động: phần mềm mô phỏng",
        prompt: "Phần mềm mô phỏng giúp em quan sát, thử nghiệm và rút ra kết luận mà không cần làm thí nghiệm thật. Cùng ôn lại nhé!",
        revealLabel: "🔍 Phần mềm mô phỏng là gì? (SGK tr.23)",
        blocks: [
          { kind: "text", value: "Phần mềm mô phỏng trình bày các hiện tượng khoa học bằng hình ảnh động hay ba chiều, giúp em cảm nhận sự vận động của các đối tượng. Tương tác với phần mềm mô phỏng dạng thí nghiệm ảo, em bổ sung kiến thức khoa học, toán học, học cách giải quyết vấn đề và có thể phát hiện điều mới mẻ." },
        ],
      },
      questions: [
        { question: "Trong việc pha màu, việc bổ sung nhiều màu có thể dẫn đến tình trạng nào?", type: "multiple-choice",
          options: ["Màu sắc rực rỡ", "Hỗn hợp màu đồng nhất", "Hỗn hợp màu xỉn đục", "Màu sắc pha trộn độc đáo"],
          answer: 2, explanation: "Pha trộn quá nhiều màu thường cho hỗn hợp xỉn đục — phần mềm mô phỏng pha màu giúp thấy điều này mà không tốn màu thật.",
          level: "thong-hieu", activity: "khoi-dong" },
        { question: "Phần mềm mô phỏng pha màu có thể giúp người dùng tìm hiểu về gì?", type: "multiple-choice",
          options: ["Lịch sử", "Màu sắc", "Âm nhạc", "Thể thao"],
          answer: 1, explanation: "Mô phỏng pha màu giúp tìm hiểu về màu sắc và cách pha trộn màu.",
          level: "nhan-biet", activity: "khoi-dong" },
        { question: "So với cách thông thường, phần mềm mô phỏng pha màu giúp người dùng hiểu và tập pha trộn màu như thế nào?", type: "multiple-choice",
          options: ["Hiệu quả hơn và tiết kiệm thời gian", "Phức tạp hơn và tốn kém", "Không khả thi với người mới học", "Cần sự hỗ trợ từ chuyên gia"],
          answer: 0, explanation: "Mô phỏng cho thử nhiều lần nhanh chóng, không tốn vật liệu → hiệu quả, tiết kiệm thời gian.",
          level: "thong-hieu", activity: "khoi-dong" },
        { question: "Lợi ích nào sau đây KHÔNG phải là lợi ích của phần mềm mô phỏng?", type: "multiple-choice",
          options: ["Tăng cường sự nguy hiểm cho con người", "Hạn chế những tình huống có thể làm hỏng thiết bị", "Giảm chi phí", "Giúp người sử dụng tìm hiểu và làm quen với đối tượng hoạt động"],
          answer: 0, explanation: "Mô phỏng giúp GIẢM nguy hiểm, giảm chi phí, tránh hỏng thiết bị — không làm tăng nguy hiểm.",
          level: "thong-hieu", activity: "khoi-dong" },
        { question: "Mục đích chính của việc sử dụng phần mềm mô phỏng là gì?", type: "multiple-choice",
          options: ["Mô phỏng quá trình sản xuất", "Tạo ra các bức tranh sống động", "Tạo điều kiện cho việc tương tác và tìm hiểu về một đối tượng", "Phát triển các ứng dụng di động"],
          answer: 2, explanation: "Phần mềm mô phỏng tạo điều kiện để tương tác, tìm hiểu và khám phá một đối tượng/hiện tượng.",
          level: "nhan-biet", activity: "khoi-dong" },
      ],
    },

    /* ===================== HĐ3.1.1: NHIỆM VỤ 1 — CHUYỂN HOÁ NĂNG LƯỢNG (20 phút) ===================== */
    {
      id: "nv1-chuyen-hoa", name: "Nhiệm vụ 1: Chuyển hoá năng lượng ⚡", type: "knowledge",
      goal: "Dùng mô phỏng PhET quan sát quá trình năng lượng chuyển hoá từ dạng này sang dạng khác.",
      time: 600,
      task: "Nhóm 2 HS/1 máy (10 phút): mở mô phỏng “Năng lượng: các dạng và sự chuyển hoá”, lần lượt thay đổi nguồn năng lượng, thiết bị chuyển hoá và thiết bị tiêu thụ điện; tick “Biểu tượng năng lượng” để quan sát.",
      sgkImage: "assets/sgk/sgk-trang23.jpg",
      links: [{ label: "Mở mô phỏng PhET: Năng lượng — các dạng và sự chuyển hoá", url: PHET_ENERGY, note: "(mở tab mới, cần Internet)" }],
      content: {
        heading: "⚡ Năng lượng: các dạng và sự chuyển hoá",
        image: "assets/sgk/hinh-6-4.jpg", imageCaption: "Hình 6.4. Mô phỏng một số dạng năng lượng và sự chuyển hoá năng lượng",
        revealLabel: "🔍 Hướng dẫn các bước (SGK tr.23–24)",
        blocks: [
          { kind: "list", value: [
            "Mở trình duyệt → https://phet.colorado.edu/ → cuối trang chọn ngôn ngữ Tiếng Việt.",
            "Chọn CÁC MÔ PHỎNG → Hoá học → “Năng lượng: các dạng và sự chuyển hoá” → nháy nút ▶ để mở cửa sổ tương tác.",
            "Thay đổi nguồn năng lượng: người đạp xe, ánh sáng mặt trời, vòi nước chảy, ấm nước sôi.",
            "Thay đổi thiết bị chuyển hoá năng lượng thành điện năng: pin mặt trời, máy phát điện.",
            "Thay đổi thiết bị tiêu thụ điện: bếp điện, bóng đèn sợi đốt, bóng đèn compact, quạt điện.",
          ] },
          { kind: "image", value: "assets/sgk/hinh-6-1-6-3.jpg", caption: "Hình 6.1–6.3. Chọn Tiếng Việt, lĩnh vực Hoá học và nội dung mô phỏng" },
          { kind: "html", value: ENERGY_HTML },
        ],
      },
      questions: [
        { question: "Tấm pin mặt trời chuyển hoá dạng năng lượng nào thành điện năng?", type: "multiple-choice",
          options: ["Nhiệt năng", "Cơ năng", "Hoá năng", "Quang năng (năng lượng ánh sáng)"],
          answer: 3, explanation: "Pin mặt trời thu ánh sáng mặt trời (quang năng) và chuyển thành điện năng.",
          level: "nhan-biet", activity: "nv1-chuyen-hoa" },
        { question: "Trong mô phỏng, em chọn nguồn Vòi nước chảy, thiết bị Máy phát điện và thiết bị tiêu thụ Quạt điện. Chuỗi chuyển hoá năng lượng chính nào đúng?", type: "multiple-choice",
          options: ["Cơ năng → Điện năng → Cơ năng", "Nhiệt năng → Điện năng → Quang năng", "Quang năng → Điện năng → Cơ năng", "Điện năng → Cơ năng → Nhiệt năng"],
          answer: 0, explanation: "Dòng nước chảy (cơ năng) làm quay máy phát → điện năng → quạt quay (cơ năng).",
          hint: "Máy phát điện cần được làm quay; quạt điện thì quay cánh.",
          level: "van-dung", activity: "nv1-chuyen-hoa" },
      ],
    },
    {
      id: "nv1-phan-loai", name: "Trò chơi: Xếp đúng vị trí trong mô phỏng 🧩", type: "dragdrop",
      goal: "Nhận biết vai trò các thành phần trong mô phỏng chuyển hoá năng lượng.",
      time: 180,
      task: "Xếp mỗi thẻ vào đúng nhóm như trên thanh công cụ của mô phỏng (Hình 6.4). Xếp hết rồi bấm Nộp bài.",
      sgkImage: "assets/sgk/hinh-6-4.jpg",
      groups: ["① Nguồn năng lượng", "② Chuyển hoá thành điện năng", "③ Tiêu thụ điện"],
      items: [
        { text: "🚴 Người đạp xe", group: 0 },
        { text: "💡 Bóng đèn sợi đốt", group: 2 },
        { text: "☀️ Ánh sáng mặt trời", group: 0 },
        { text: "⚙️ Máy phát điện", group: 1 },
        { text: "🌀 Quạt điện", group: 2 },
        { text: "🚰 Vòi nước chảy", group: 0 },
        { text: "🔲 Pin mặt trời", group: 1 },
        { text: "♨️ Bếp điện", group: 2 },
        { text: "🫖 Ấm nước sôi", group: 0 },
        { text: "💡 Bóng đèn compact", group: 2 },
      ],
      explanation: "Nguồn: người đạp xe, ánh sáng mặt trời, vòi nước chảy, ấm nước sôi. Chuyển hoá thành điện năng: pin mặt trời, máy phát điện. Tiêu thụ điện: bếp điện, bóng đèn sợi đốt, bóng đèn compact, quạt điện.",
    },
    {
      id: "nv1-thiet-bi", name: "Ghép thiết bị — sự chuyển hoá năng lượng 🔄", type: "matching",
      goal: "Nêu được quá trình chuyển hoá năng lượng trong các thiết bị của mô phỏng.",
      time: 180,
      task: "Ghép mỗi thiết bị với quá trình chuyển hoá năng lượng chính của nó. Làm hết rồi bấm Nộp bài.",
      pairs: [
        { left: "Pin mặt trời", right: "Quang năng → Điện năng" },
        { left: "Máy phát điện", right: "Cơ năng → Điện năng" },
        { left: "Bếp điện", right: "Điện năng → Nhiệt năng" },
        { left: "Quạt điện", right: "Điện năng → Cơ năng" },
        { left: "Bóng đèn", right: "Điện năng → Quang năng (và nhiệt năng)" },
      ],
      explanation: "Mỗi thiết bị biến đổi một dạng năng lượng thành dạng khác — đó là sự chuyển hoá năng lượng.",
    },
    {
      id: "nv1-thao-luan", name: "Nêu kiến thức thu nhận được (Nhiệm vụ 1) 💬", type: "vandung",
      goal: "Kể tên các dạng năng lượng và nêu ví dụ chuyển hoá năng lượng.",
      time: 120,
      task: "Thảo luận nhóm đôi (2 phút), gửi câu trả lời cho thầy/cô.",
      intro: "Trả lời 2 câu hỏi ở mục c) SGK tr.24, rồi bấm để xem hướng chốt.",
      cases: [
        { question: "Em quan sát được những dạng năng lượng nào?",
          answer: "Các dạng năng lượng: cơ năng, điện năng, nhiệt năng, quang năng, hoá năng (xem bảng “Biểu tượng năng lượng”). Các nguồn năng lượng: người đạp xe, ánh sáng mặt trời, vòi nước chảy, ấm nước sôi." },
        { question: "Nêu một tình huống năng lượng được chuyển hoá từ dạng này sang dạng khác.",
          answer: "Ví dụ: tấm pin mặt trời thu ánh sáng mặt trời (quang năng) chuyển thành điện năng làm sáng bóng đèn. Hoặc: người đạp xe làm quay máy phát điện (cơ năng → điện năng) để đun nước (điện năng → nhiệt năng)." },
      ],
      remember: ["Có nhiều dạng năng lượng (cơ, nhiệt, quang, điện, hoá…); chúng chuyển hoá qua lại lẫn nhau.", "Ví dụ: năng lượng mặt trời → điện năng (qua pin mặt trời)."],
    },

    /* ===================== HĐ3.1.2: NHIỆM VỤ 2 — ĐO CƯỜNG ĐỘ DÒNG ĐIỆN (20 phút) ===================== */
    {
      id: "nv2-do-dong-dien", name: "Nhiệm vụ 2: Đo cường độ dòng điện 🔌", type: "knowledge",
      goal: "Dùng phòng thí nghiệm ảo lắp mạch điện một chiều và đo cường độ dòng điện qua bóng đèn.",
      time: 600,
      task: "Nhóm 2 HS/1 máy (10 phút): mở “Bộ lắp ráp mạch điện: DC — Phòng thí nghiệm ảo”, kéo Pin, Đèn tròn, Ampe kế, Công tắc, Dây nối vào vùng hiển thị, lắp mạch và đọc số chỉ ampe kế.",
      sgkImage: "assets/sgk/sgk-trang24.jpg",
      links: [{ label: "Mở PhET: Bộ lắp ráp mạch điện DC — Phòng thí nghiệm ảo", url: PHET_CIRCUIT, note: "(mở tab mới, cần Internet)" }],
      content: {
        heading: "🔌 Đo cường độ dòng điện qua bóng đèn",
        image: "assets/sgk/hinh-6-5.jpg", imageCaption: "Hình 6.5. Lắp ampe kế đúng cách, không để xảy ra sự cố",
        revealLabel: "🔍 Hướng dẫn & lưu ý (SGK tr.24–25)",
        blocks: [
          { kind: "list", value: [
            "Tương tự Nhiệm vụ 1: CÁC MÔ PHỎNG → Vật lý → “Bộ lắp ráp mạch điện: DC — Phòng thí nghiệm ảo”.",
            "Kéo các biểu tượng Pin, Đèn tròn, Ampe kế, Công tắc và Dây nối, thả vào vùng hiển thị.",
            "Kết nối các thành phần thành mạch điện kín (Hình 6.5a).",
            "Lưu ý: ampe kế cần mắc NỐI TIẾP với đoạn mạch cần đo và KHÔNG mắc trực tiếp vào hai cực của nguồn điện (Hình 6.5b — gây sự cố).",
          ] },
          { kind: "html", value: '<div style="background:#fef2f2;border-left:6px solid #dc2626;border-radius:10px;padding:10px 14px;font-size:1.15rem">🔥 Ở Hình 6.5b ampe kế mắc thẳng vào hai cực pin → dòng điện cực lớn (89 983 A) → pin bốc cháy. Trên phần mềm mô phỏng, sự cố này <b>không gây nguy hiểm thật</b> — đó là một lợi ích của mô phỏng.</div>' },
        ],
      },
      questions: [
        { question: "Em cần dùng thiết bị nào để đo cường độ dòng điện trên mạch điện?", type: "multiple-choice",
          options: ["Vôn kế", "Ampe kế", "Nhiệt kế", "Công tắc"],
          answer: 1, explanation: "Ampe kế là dụng cụ đo cường độ dòng điện (đơn vị ampe, A).",
          level: "nhan-biet", activity: "nv2-do-dong-dien" },
        { question: "Ampe kế được mắc như thế nào với đoạn mạch cần đo?", type: "multiple-choice",
          options: ["Mắc song song với đoạn mạch", "Mắc trực tiếp vào hai cực của nguồn điện", "Không cần nối vào mạch", "Mắc nối tiếp với đoạn mạch"],
          answer: 3, explanation: "Ampe kế mắc NỐI TIẾP để dòng điện cần đo chạy qua nó.",
          level: "nhan-biet", activity: "nv2-do-dong-dien" },
        { question: "Mắc ampe kế trực tiếp vào hai cực của pin (như Hình 6.5b) là cách đo an toàn.", type: "true-false", answer: false,
          explanation: "Sai. Ampe kế có điện trở rất nhỏ, mắc thẳng vào hai cực nguồn gây đoản mạch — dòng điện cực lớn, có thể gây cháy.",
          level: "thong-hieu", activity: "nv2-do-dong-dien" },
        { question: "Giữ nguyên bóng đèn, thay pin có hiệu điện thế lớn hơn thì số chỉ ampe kế tăng lên.", type: "true-false", answer: true,
          explanation: "Đúng. Cường độ dòng điện tăng khi hiệu điện thế tăng, và giảm khi điện trở tăng (GV chốt).",
          level: "van-dung", activity: "nv2-do-dong-dien" },
      ],
      remember: ["Đo cường độ dòng điện bằng ampe kế, mắc NỐI TIẾP với đoạn mạch cần đo.", "Không mắc ampe kế trực tiếp vào hai cực nguồn điện."],
    },
    {
      id: "nv2-cac-buoc", name: "Sắp xếp các bước lắp mạch đo dòng điện 🪜", type: "ordering",
      goal: "Nắm quy trình lắp mạch và đo cường độ dòng điện trên phòng thí nghiệm ảo.",
      time: 150,
      task: "Sắp xếp các bước theo đúng thứ tự rồi bấm Nộp bài.",
      steps: [
        "Mở PhET → CÁC MÔ PHỎNG → Vật lý → Bộ lắp ráp mạch điện: DC — Phòng thí nghiệm ảo",
        "Kéo Pin, Đèn tròn, Ampe kế, Công tắc, Dây nối thả vào vùng hiển thị",
        "Nối các thành phần thành mạch kín, ampe kế mắc nối tiếp với bóng đèn",
        "Đóng công tắc cho dòng điện chạy trong mạch",
        "Đọc số chỉ cường độ dòng điện trên ampe kế và ghi kết quả",
      ],
      explanation: "Mở phần mềm → lấy linh kiện → lắp mạch (ampe kế nối tiếp) → đóng công tắc → đọc số chỉ.",
    },

    /* ===================== HĐ3.1.3: NHIỆM VỤ 3 — TỈ LỆ VÀNG (15 phút) ===================== */
    {
      id: "nv3-ti-le-vang", name: "Nhiệm vụ 3: Tỉ lệ vàng trong ngôi sao năm cánh ⭐", type: "knowledge",
      goal: "Dùng công cụ đo, tính của phần mềm hình học khám phá tỉ lệ vàng trong ngôi sao năm cánh.",
      time: 600,
      task: "Nhóm 2 HS/1 máy (10 phút): mở tệp TyLeVang.gsp trong Geometer's Sketchpad, đo AB, BC, AC, AD; tính các tỉ lệ; kéo P hoặc Q để đổi kích thước và quan sát.",
      sgkImage: "assets/sgk/sgk-trang25.jpg",
      content: {
        heading: "⭐ Tỉ lệ vàng trong ngôi sao năm cánh",
        image: "assets/sgk/hinh-6-6.jpg", imageCaption: "Hình 6.6. Đo độ dài các đoạn thẳng của ngôi sao năm cánh",
        revealLabel: "▶ Khám phá ngay: ngôi sao tương tác + kiến thức",
        blocks: [
          { kind: "html", value: STAR_HTML },
          { kind: "list", value: [
            "Đo độ dài: dùng công cụ chọn đối tượng chọn đoạn AB → Measure/Length. Làm tương tự với BC, AC, AD.",
            "Tính tỉ lệ: Alt + = hoặc Number/Calculate… (Measure/Calculate… với bản 4.x), nhập mAB/mBC.",
            "Kéo P hoặc Q: độ dài các đoạn thay đổi nhưng tỉ lệ giữa chúng KHÔNG đổi, luôn ≈ 1,62.",
          ] },
          { kind: "html", value: '<div style="text-align:center;font-size:1.6rem;background:#fffbeb;border:2px solid #f59e0b;border-radius:14px;padding:10px">AB/BC = AC/AB = AD/AC = (1 + √5)/2 ≈ <b>1,618034</b> — <b>tỉ lệ vàng</b></div>' },
          { kind: "image", value: "assets/sgk/hinh-6-8.jpg", caption: "Hình 6.8. Ngôi sao năm cánh và hình chữ nhật tỉ lệ vàng" },
          { kind: "text", value: "Hình chữ nhật có tỉ lệ hai cạnh là tỉ lệ vàng: cắt bỏ một hình vuông, phần còn lại vẫn là hình chữ nhật tỉ lệ vàng — gọi là hình chữ nhật tỉ lệ vàng." },
        ],
      },
      questions: [
        { question: "Đo được AB = 2,52 cm và BC = 1,56 cm. Tỉ lệ AB/BC xấp xỉ bằng bao nhiêu?", type: "multiple-choice",
          options: ["4,08", "0,62", "2,52", "1,62"],
          answer: 3, explanation: "2,52 : 1,56 ≈ 1,62 — xấp xỉ tỉ lệ vàng (1 + √5)/2 ≈ 1,618.",
          sgkImage: "assets/sgk/hinh-6-7.jpg",
          level: "thong-hieu", activity: "nv3-ti-le-vang" },
        { question: "Kéo điểm P để ngôi sao to gấp đôi. Khi đó tỉ lệ AB/BC sẽ:", type: "multiple-choice",
          options: ["Tăng gấp đôi", "Giảm một nửa", "Không đổi, vẫn ≈ 1,62", "Bằng 1"],
          answer: 2, explanation: "Độ dài các đoạn cùng thay đổi theo một tỉ lệ nên thương AB/BC không đổi — luôn là tỉ lệ vàng.",
          level: "van-dung", activity: "nv3-ti-le-vang" },
        { question: "Cắt bỏ một hình vuông khỏi một hình chữ nhật tỉ lệ vàng, phần còn lại là:", type: "multiple-choice",
          options: ["Một hình vuông", "Một hình chữ nhật tỉ lệ vàng", "Một hình tam giác", "Một hình chữ nhật bất kì"],
          answer: 1, explanation: "Đó là tính chất đặc biệt của hình chữ nhật tỉ lệ vàng (Hình 6.8b).",
          level: "thong-hieu", activity: "nv3-ti-le-vang" },
      ],
      remember: ["Ngôi sao năm cánh đều: AB/BC = AC/AB = AD/AC = (1 + √5)/2 ≈ 1,618 — tỉ lệ vàng.", "Mô phỏng hình học cho phép đo, tính và kiểm chứng nhanh trên nhiều kích thước khác nhau."],
    },
    {
      id: "nv3-cac-buoc", name: "Sắp xếp thao tác trong Geometer's Sketchpad 🪜", type: "ordering",
      goal: "Nắm quy trình đo và tính tỉ lệ trong phần mềm mô phỏng hình học.",
      time: 150,
      task: "Sắp xếp các thao tác khám phá tỉ lệ vàng theo đúng thứ tự rồi bấm Nộp bài.",
      steps: [
        "Mở tệp TyLeVang.gsp (File/Open hoặc Ctrl + O)",
        "Dùng công cụ chọn, chọn đoạn AB rồi chọn Measure/Length",
        "Đo tương tự độ dài các đoạn BC, AC, AD",
        "Mở công cụ tính (Alt + = hoặc Number/Calculate…), nhập mAB/mBC",
        "Kéo điểm P hoặc Q để đổi kích thước ngôi sao, quan sát các tỉ lệ",
      ],
      explanation: "Mở tệp → đo từng đoạn → tính tỉ lệ → thay đổi kích thước để kiểm chứng tỉ lệ không đổi.",
    },

    /* ===================== HĐ3.2: TRÒ CHƠI “HỘP QUÀ MAY MẮN” (15 phút) ===================== */
    {
      id: "hop-qua", name: "Trò chơi: Hộp quà may mắn 🎁", type: "giftbox",
      goal: "Củng cố kiến thức về chuyển hoá năng lượng, đo cường độ dòng điện và tỉ lệ vàng.",
      time: 300,
      task: "Mỗi đội lần lượt chọn một hộp quà, trả lời câu hỏi trong 10 giây. Trả lời đúng thì hộp quà mở ra!",
      intro: "9 hộp quà = 3 gói câu hỏi. Chọn hộp → trả lời → đúng thì nhận quà 🎉",
      groups: [{ name: "Gói 1", from: 0, to: 2 }, { name: "Gói 2", from: 3, to: 5 }, { name: "Gói 3", from: 6, to: 8 }],
      prizes: ["👏 Một tràng pháo tay của cả lớp", "⭐ Ngôi sao may mắn", "🎁 Quà bí mật từ thầy/cô", "🏅 Danh hiệu “Nhà khoa học nhí”", "🌟 Lời khen trước lớp", "🎉 Tràng pháo tay thật lớn", "🏆 Danh hiệu “Đội mô phỏng xuất sắc”", "🍀 Ngôi sao may mắn", "🎁 Quà bí mật từ thầy/cô"],
      questions: [
        { question: "Để thay đổi nguồn năng lượng “người đạp xe” thành “ánh sáng mặt trời”, em chọn biểu tượng nào?", type: "multiple-choice",
          image: IMG("man-hinh-phet"), imageCaption: "Mô phỏng đang dùng nguồn: người đạp xe",
          options: ["Xe đạp", "Vòi nước chảy", "Ánh sáng mặt trời", "Ấm nước sôi"],
          optionImages: [IMG("xe-dap"), IMG("voi-nuoc"), IMG("mat-troi"), IMG("am-nuoc")],
          answer: 2, explanation: "Biểu tượng mặt trời là nguồn năng lượng ánh sáng mặt trời.", level: "nhan-biet", activity: "hop-qua" },
        { question: "Để thay thiết bị chuyển hoá năng lượng thành điện năng từ “máy phát điện” sang “pin mặt trời”, em chọn biểu tượng nào?", type: "multiple-choice",
          image: IMG("man-hinh-phet"), imageCaption: "Mô phỏng đang dùng máy phát điện",
          options: ["Xe đạp", "Pin mặt trời", "Ánh sáng mặt trời", "Ấm nước sôi"],
          optionImages: [IMG("xe-dap"), IMG("pin-mat-troi"), IMG("mat-troi"), IMG("am-nuoc")],
          answer: 1, explanation: "Biểu tượng tấm pin là pin mặt trời — thiết bị chuyển quang năng thành điện năng.", level: "nhan-biet", activity: "hop-qua" },
        { question: "Khi đo cường độ dòng điện trong mạch, ampe kế thường được nối như thế nào?", type: "multiple-choice",
          options: ["Nối tiếp", "Nối song song", "Nối ngược", "Nối tiếp theo"],
          answer: 0, explanation: "Ampe kế mắc nối tiếp với đoạn mạch cần đo.", level: "nhan-biet", activity: "hop-qua" },
        { question: "Để thay đổi nguồn năng lượng “người đạp xe” thành “vòi nước chảy”, em chọn biểu tượng nào?", type: "multiple-choice",
          image: IMG("man-hinh-phet"), imageCaption: "Mô phỏng đang dùng nguồn: người đạp xe",
          options: ["Xe đạp", "Vòi nước chảy", "Ánh sáng mặt trời", "Ấm nước sôi"],
          optionImages: [IMG("xe-dap"), IMG("voi-nuoc"), IMG("mat-troi"), IMG("am-nuoc")],
          answer: 1, explanation: "Biểu tượng vòi nước là nguồn năng lượng từ dòng nước chảy.", level: "nhan-biet", activity: "hop-qua" },
        { question: "Để đo cường độ dòng điện trên mạch điện, thiết bị nào thường được sử dụng?", type: "multiple-choice",
          options: ["Ampe kế", "Đồng hồ đo áp suất", "Vôn kế", "Máy đo nhiệt độ"],
          answer: 0, explanation: "Ampe kế đo cường độ dòng điện; vôn kế đo hiệu điện thế.", level: "nhan-biet", activity: "hop-qua" },
        { question: "Để đo độ dài đoạn thẳng AB trong hình ngôi sao năm cánh bằng Geometer's Sketchpad, em dùng lệnh nào?", type: "multiple-choice",
          options: ["Measure/Length", "Measure/Area", "Transform/Length", "Construct/Length"],
          answer: 0, explanation: "Chọn đoạn AB rồi chọn Measure/Length để đo độ dài.", level: "nhan-biet", activity: "hop-qua" },
        { question: "Để thay đổi nguồn năng lượng “người đạp xe” thành “ấm nước sôi”, em chọn biểu tượng nào?", type: "multiple-choice",
          image: IMG("man-hinh-phet"), imageCaption: "Mô phỏng đang dùng nguồn: người đạp xe",
          options: ["Xe đạp", "Vòi nước chảy", "Ánh sáng mặt trời", "Ấm nước sôi"],
          optionImages: [IMG("xe-dap"), IMG("voi-nuoc"), IMG("mat-troi"), IMG("am-nuoc")],
          answer: 3, explanation: "Biểu tượng ấm nước là nguồn năng lượng từ ấm nước sôi (hơi nước).", level: "nhan-biet", activity: "hop-qua" },
        { question: "Để thay thiết bị tiêu thụ điện từ “bếp điện đun nước” sang “bóng đèn sợi đốt”, em chọn biểu tượng nào?", type: "multiple-choice",
          image: IMG("man-hinh-phet"), imageCaption: "Mô phỏng đang dùng bếp điện đun nước",
          options: ["Bóng đèn sợi đốt", "Pin mặt trời", "Ánh sáng mặt trời", "Quạt điện"],
          optionImages: [IMG("bong-den-soi-dot"), IMG("pin-mat-troi"), IMG("mat-troi"), IMG("quat")],
          answer: 0, explanation: "Biểu tượng bóng đèn là bóng đèn sợi đốt — thiết bị tiêu thụ điện.", level: "thong-hieu", activity: "hop-qua" },
        { question: "Làm thế nào để mở công cụ tính trong phần mềm Geometer's Sketchpad?", type: "multiple-choice",
          options: ["Nháy chuột phải và chọn “Edit/Calculate”", "Sử dụng tổ hợp phím Alt + =", "Nhấn phím Enter", "Sử dụng tổ hợp phím Ctrl + ="],
          answer: 1, explanation: "Gõ Alt + = hoặc chọn Number/Calculate… (Measure/Calculate… với bản 4.x).", level: "nhan-biet", activity: "hop-qua" },
      ],
    },

    /* ===================== HĐ4: VẬN DỤNG (4 phút + ở nhà) ===================== */
    {
      id: "van-dung", name: "Vận dụng 🏡", type: "vandung",
      goal: "Vận dụng phần mềm mô phỏng để giải quyết nhiệm vụ học tập.",
      time: 300,
      task: "Làm Bài 1 trên lớp (5 phút); Bài 2 làm ở nhà, nộp Padlet. Bài 3, 4 (SGK tr.26) thầy/cô chọn giao thêm.",
      sgkImage: "assets/sgk/sgk-trang26.jpg",
      links: [{ label: "Mở PhET: Bộ lắp ráp mạch điện DC — Phòng thí nghiệm ảo", url: PHET_CIRCUIT }],
      intro: "Thảo luận, gửi câu trả lời cho thầy/cô rồi bấm để xem hướng chốt.",
      cases: [
        { question: "Bài 1 (giáo án): Dùng phần mềm thí nghiệm ảo lắp mạch điện một chiều, đo cường độ dòng điện đi qua một bóng đèn. Mô tả cách lắp và ghi số chỉ ampe kế nhóm em đo được.",
          answer: "Lắp mạch kín gồm pin – dây nối – bóng đèn – ampe kế, ampe kế mắc NỐI TIẾP với bóng đèn (không mắc vào hai cực pin). Đèn sáng, ampe kế hiển thị cường độ dòng điện, ví dụ 0,90 A." },
        { question: "Bài 2 (giáo án, làm ở nhà): Dùng Geometer's Sketchpad vẽ tam giác vuông, tìm trung điểm các cạnh và đo độ dài các cạnh. Nộp sản phẩm lên Padlet; ghi lại số đo nhóm em được.",
          answer: "Vẽ tam giác vuông ABC (vuông tại B), dựng trung điểm các cạnh, chọn từng cạnh → Measure/Length. Ví dụ: AB = 4,55 cm, BC = 5,64 cm, CA = 7,24 cm. [CẦN GIÁO VIÊN KIỂM TRA: lệnh dựng trung điểm theo phiên bản phần mềm của phòng máy]" },
        { question: "Bài 3 (Luyện tập SGK tr.26): Nêu giải pháp đo điện áp giữa hai đầu một điện trở bằng phần mềm mô phỏng.",
          answer: "Lắp mạch có nguồn, công tắc, điện trở; dùng VÔN KẾ đặt hai đầu que đo vào hai đầu điện trở (mắc song song với điện trở), đóng công tắc và đọc số chỉ vôn kế." },
        { question: "Bài 4 (Vận dụng SGK tr.26): Lắp mạch gồm nguồn điện, công tắc, điện trở, ampe kế, vôn kế. Thay đổi trị số các linh kiện, em rút ra quy luật gì giữa điện trở, cường độ dòng điện qua nó và điện áp giữa hai đầu điện trở?",
          answer: "Giữ nguyên điện trở, tăng điện áp thì cường độ dòng điện tăng (tỉ lệ thuận). Giữ nguyên điện áp, tăng điện trở thì cường độ dòng điện giảm. (Mở rộng: I = U/R — định luật Ôm, học ở môn Khoa học tự nhiên.)" },
      ],
    },

    /* ===================== TỔNG KẾT ===================== */
    {
      id: "tong-ket", name: "Tổng kết", type: "summary",
      task: "Cả lớp nhắc lại kiến thức thu nhận được và làm thử thách cuối.",
      content: {
        learned: [
          "Mô phỏng chuyển hoá năng lượng: nguồn → thiết bị chuyển hoá thành điện năng → thiết bị tiêu thụ; năng lượng chuyển hoá qua lại giữa các dạng.",
          "Đo cường độ dòng điện bằng ampe kế mắc nối tiếp; mắc sai chỉ “cháy” trên màn hình — mô phỏng giúp thực hành an toàn.",
          "Ngôi sao năm cánh đều chứa tỉ lệ vàng ≈ 1,618, không đổi khi thay đổi kích thước.",
          "Mô phỏng thế giới thực trên máy tính giúp con người khám phá tri thức và giải quyết vấn đề.",
        ],
        challenge: [
          { question: "Vì sao nên thử lắp mạch điện trên phần mềm mô phỏng trước khi lắp mạch thật?", type: "multiple-choice",
            options: ["Vì mạch điện thật không đo được dòng điện", "Vì không cần hiểu kiến thức vẫn lắp được", "Vì an toàn, không làm hỏng thiết bị và tiết kiệm chi phí", "Vì phần mềm luôn chính xác hơn mọi thí nghiệm thật"],
            answer: 2, explanation: "Mô phỏng cho phép thử và sai an toàn, không tốn linh kiện, rồi mới lắp thật.",
            level: "thong-hieu", activity: "tong-ket" },
          { question: "Một nhóm mắc ampe kế SONG SONG với bóng đèn. Trong mô phỏng, điều gì có thể xảy ra?", type: "multiple-choice",
            options: ["Đèn sáng hơn và ampe kế đo đúng", "Dòng điện rất lớn chạy qua ampe kế, có thể gây sự cố (cháy nguồn)", "Ampe kế chỉ 0 A và mạch an toàn", "Không có gì thay đổi"],
            answer: 1, explanation: "Ampe kế có điện trở rất nhỏ; mắc song song với đèn làm đoản mạch đèn → dòng điện rất lớn, như sự cố ở Hình 6.5b.",
            level: "van-dung-cao", activity: "tong-ket" },
        ],
      },
    },
  ],
};

if (typeof module !== "undefined" && module.exports) module.exports = LESSON;
if (typeof window !== "undefined") window.LESSON = LESSON;
