/* ============================================================================
 * BÀI 16 — CÁC CẤU TRÚC ĐIỀU KHIỂN  (Tin học 6 — Kết nối tri thức)
 * Chủ đề 6: Giải quyết vấn đề với sự trợ giúp của máy tính.
 * Bám sát SGK trang 67–70 + Kế hoạch bài dạy của giáo viên. Thời lượng: 2 tiết.
 * Chỉ sửa file này để đổi nội dung. Engine app.js không cần sửa.
 * Trò chơi “Đúng hay Sai?” chơi ngay trong app (theo lựa chọn của GV). Các phần giáo án khác SGK: giữ theo giáo án (GV chọn).
 * ==========================================================================*/

// ---- Vẽ sơ đồ khối có rẽ nhánh / lặp (SVG tự vẽ, sắc nét trên máy chiếu) ----
let SVG_N = 0;
const wrapT = (t, n) => { const out = []; let cur = ""; String(t).split(" ").forEach((w) => { if ((cur + " " + w).trim().length > n && cur) { out.push(cur); cur = w; } else cur = (cur + " " + w).trim(); }); if (cur) out.push(cur); return out; };
const svgT = (x, y, t, n, size) => { size = size || 15; const L = wrapT(t, n), y0 = y - ((L.length - 1) * (size + 3)) / 2; return `<text x="${x}" y="${y0}" font-size="${size}" text-anchor="middle" dominant-baseline="middle" fill="#1f2937">${L.map((l, i) => `<tspan x="${x}" dy="${i ? size + 3 : 0}">${l}</tspan>`).join("")}</text>`; };
const svgOpen = (w, h) => { const id = "ah" + (++SVG_N); return [`<svg viewBox="0 0 ${w} ${h}" style="width:min(${w}px,100%);height:auto;font-family:Segoe UI,Arial,sans-serif"><defs><marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#334155"/></marker></defs>`, `stroke="#334155" stroke-width="2.5" fill="none" marker-end="url(#${id})"`, `stroke="#334155" stroke-width="2.5" fill="none"`]; };
const DIA = "#86efac", BOX = "#fef08a";
// Rẽ nhánh dạng thiếu (như Hình 6.7): Đúng → làm "yes"; Sai → đi thẳng xuống
function branchSVG(cond, yes) {
  const [o, A, L] = svgOpen(480, 270);
  return `${o}<line x1="300" y1="0" x2="300" y2="27" ${A}/>
    <polygon points="160,80 300,28 440,80 300,132" fill="${DIA}"/>${svgT(300, 80, cond, 22)}
    <polyline points="160,80 90,80 90,157" ${A}/><text x="118" y="68" font-size="14" fill="#166534">Đúng</text>
    <rect x="10" y="160" width="160" height="52" fill="${BOX}"/>${svgT(90, 186, yes, 18, 14)}
    <polyline points="90,212 90,234 296,234" ${A}/>
    <line x1="300" y1="132" x2="300" y2="266" ${A}/><text x="310" y="152" font-size="14" fill="#991b1b">Sai</text></svg>`;
}
// Cấu trúc lặp (như Hình 6.9): Đúng → làm "body" rồi quay lại kiểm tra; Sai → thoát (có thể có ô "exit")
function loopSVG(cond, body, exit) {
  const [o, A, L] = svgOpen(480, 285);
  return `${o}<line x1="220" y1="0" x2="220" y2="38" ${A}/>
    <polygon points="90,90 220,40 350,90 220,140" fill="${DIA}"/>${svgT(220, 90, cond, 20)}
    <line x1="220" y1="140" x2="220" y2="168" ${A}/><text x="230" y="158" font-size="14" fill="#166534">Đúng</text>
    <rect x="140" y="170" width="160" height="48" fill="${BOX}"/>${svgT(220, 194, body, 18, 14)}
    <polyline points="220,218 220,240 30,240 30,20 214,20" ${A}/>
    <polyline points="350,90 420,90 420,${exit ? 168 : 280}" ${A}/><text x="372" y="80" font-size="14" fill="#991b1b">Sai</text>
    ${exit ? `<rect x="360" y="170" width="118" height="48" fill="${BOX}"/>${svgT(419, 194, exit, 12, 14)}<line x1="420" y1="218" x2="420" y2="280" ${A}/>` : ""}</svg>`;
}
const svgRow = (...items) => `<div style="display:flex;flex-wrap:wrap;gap:18px;justify-content:center;align-items:flex-start">${items.map(([cap, svg]) => `<div style="flex:1 1 300px;max-width:480px;text-align:center"><b>${cap}</b><br>${svg}</div>`).join("")}</div>`;

// ---- Trò chơi “Đúng hay Sai?” (SGK tr.67) ----
const LUAT_CHOI_HTML = `<div style="display:flex;flex-wrap:wrap;gap:12px;justify-content:center">
  <div style="flex:1 1 300px;max-width:520px;background:#fff7ed;border:3px solid #f59e0b;border-radius:18px;padding:12px 16px;text-align:left;font-size:1.05rem">
    <b style="color:#b45309;font-size:1.15rem">🎲 Cách chơi</b><br>
    👫 Mỗi lượt chơi là <b>hai bạn</b>, chọn một chủ đề: <b>🧬 Sinh học</b> hoặc <b>🔢 Toán</b>.<br>
    ⏱️ Trong <b>một phút</b>, với mỗi phiếu:<br>
    ❶ Bạn thứ nhất đọc câu ghi trong phiếu.<br>
    ❷ Bạn thứ hai trả lời: <b>gật đầu</b> 👍 là đồng ý, <b>lắc đầu</b> 👎 là không đồng ý.<br>
    📝 Câu trả lời của mỗi lượt được ghi lại.</div>
  <div style="flex:1 1 240px;max-width:360px;background:#f0fdf4;border:3px solid #16a34a;border-radius:18px;padding:12px 16px;text-align:left;font-size:1.05rem">
    <b style="color:#166534;font-size:1.15rem">🏆 Kết quả</b><br>Kết thúc trò chơi, cả lớp đánh giá kết quả của mỗi lượt. <b>Mỗi câu trả lời đúng được một điểm.</b> Cặp có số điểm cao nhất thắng cuộc.<br><br>💻 Trong app: bạn thứ hai chọn <b>Đúng</b> (gật đầu) hoặc <b>Sai</b> (lắc đầu) — máy ghi lại và chấm điểm.</div></div>`;

const AI_HTML = `<div style="display:flex;flex-wrap:wrap;gap:12px;justify-content:center">
  <div style="flex:1 1 300px;max-width:480px;background:#f5f3ff;border:2px solid #c4b5fd;border-radius:16px;padding:12px 16px;text-align:left">
    <b style="color:#6d28d9">🤖 AI cũng chạy theo thuật toán</b><br>AI hoạt động theo lập trình của con người (thuật toán có tuần tự, rẽ nhánh, lặp…). AI chỉ là <b>công cụ hỗ trợ</b> — <b>con người</b> là người quyết định cuối cùng.</div>
  <div style="flex:1 1 300px;max-width:480px;background:#fef2f2;border:2px solid #fca5a5;border-radius:16px;padding:12px 16px;text-align:left">
    <b style="color:#b91c1c">💬 Câu lệnh gợi ý (giáo án)</b>
    <ul style="margin:6px 0 0 18px;padding:0"><li>“Hãy phân tích bài toán sau và cho biết nên sử dụng cấu trúc tuần tự, rẽ nhánh hay lặp: [nhập bài toán].”</li>
    <li>“Hãy kiểm tra giúp em thuật toán sau đã sử dụng đúng các cấu trúc điều khiển chưa và gợi ý cách sửa nếu cần: [nhập thuật toán].”</li></ul></div></div>`;

const LESSON = {
  meta: {
    subject: "Tin học", grade: "6", book: "Kết nối tri thức với cuộc sống",
    title: "Bài 16: Các cấu trúc điều khiển", unit: "Chủ đề 6 — Giải quyết vấn đề với sự trợ giúp của máy tính",
    pages: "67–70", durationMinutes: 90,
  },
  objectives: {
    knowledge: [
      "Biết các cấu trúc: tuần tự, rẽ nhánh và lặp.",
      "Mô tả được thuật toán đơn giản có các cấu trúc tuần tự, rẽ nhánh và lặp dưới dạng liệt kê hoặc sơ đồ khối.",
    ],
    competencies: [
      "Tự chủ và tự học; giải quyết vấn đề và sáng tạo; giao tiếp và hợp tác (thảo luận, phản biện khi xây dựng thuật toán).",
      "Năng lực số 3.4.TC1a: liệt kê, biểu diễn các chỉ dẫn bằng danh sách bước và sơ đồ khối với cấu trúc tuần tự, rẽ nhánh, lặp.",
      "Năng lực số 5.1.TC1a, 5.1.TC1b: nhận biết lỗi (sai thứ tự, thiếu điều kiện, lặp chưa dừng) và đề xuất cách sửa.",
      "Năng lực AI 6.A2.1: AI hoạt động theo lập trình của con người, chỉ là công cụ hỗ trợ; con người quyết định cuối cùng.",
    ],
    qualities: ["Chăm chỉ, trung thực (báo cáo đúng lỗi và cách sửa), trách nhiệm, nhân ái (tôn trọng ý kiến bạn)."],
  },
  coreKnowledge: [
    "Cấu trúc tuần tự thực hiện lần lượt các lệnh theo trình tự từ bắt đầu đến kết thúc.",
    "Cấu trúc rẽ nhánh dạng thiếu: nếu Điều kiện đúng thì thực hiện Lệnh. Dạng đủ: nếu Điều kiện đúng thì thực hiện Lệnh 1, nếu sai thì thực hiện Lệnh 2. Hình thoi mô tả điều kiện.",
    "Cấu trúc lặp dùng để mô tả các bước của thuật toán được thực hiện lặp lại nhiều lần; bao giờ cũng có bước kiểm tra điều kiện kết thúc quá trình lặp.",
    "Ba cấu trúc tuần tự, rẽ nhánh và lặp là đủ để mô tả mọi thuật toán.",
  ],
  keywords: ["Tuần tự", "Rẽ nhánh", "Dạng thiếu", "Dạng đủ", "Lặp"],
  settings: { basePoints: 100, useTimer: false, defaultTime: 60, sound: true, streakEnabled: true },

  activities: [
    /* =========================== TIẾT 1 =========================== */
    /* ===================== HĐ1: MỞ ĐẦU — TRÒ CHƠI ĐÚNG HAY SAI ===================== */
    {
      id: "khoi-dong", name: "Trò chơi: Đúng hay Sai? 🎲", type: "knowledge",
      goal: "Tạo hứng thú; trải nghiệm một hoạt động có các bước tuần tự, có kiểm tra đúng/sai và được lặp lại.",
      time: 120,
      task: "Chọn 4 bạn chơi, chia thành 2 cặp. Mỗi cặp chọn một chủ đề (Sinh học hoặc Toán), chơi trong một phút theo luật bên dưới.",
      sgkImage: "assets/sgk/tro-choi.jpg",
      content: { heading: "🎲 Trò chơi: Đúng hay Sai?", html: LUAT_CHOI_HTML },
    },
    {
      id: "phieu-sinh-hoc", name: "Lượt chơi 🧬 Sinh học", type: "knowledge",
      goal: "Cặp chơi thứ nhất trả lời các phiếu chủ đề Sinh học trong một phút.",
      time: 60,
      task: "Bạn thứ nhất đọc to câu trong phiếu, bạn thứ hai gật đầu (Đúng) hoặc lắc đầu (Sai) rồi bấm chọn. Hết một phút thì dừng.",
      questions: [
        { question: "🧬 Voi thuộc loài ăn thịt.", type: "true-false", answer: false, explanation: "Sai. Voi là động vật ăn thực vật (cỏ, lá, cành cây…).", level: "nhan-biet", activity: "phieu-sinh-hoc" },
        { question: "🧬 Cây xanh cần ánh sáng để quang hợp.", type: "true-false", answer: true, explanation: "Đúng. Cây xanh dùng năng lượng ánh sáng để quang hợp.", level: "nhan-biet", activity: "phieu-sinh-hoc" },
        { question: "🧬 Cá voi là một loài cá.", type: "true-false", answer: false, explanation: "Sai. Cá voi là động vật có vú: thở bằng phổi, đẻ con và nuôi con bằng sữa.", level: "thong-hieu", activity: "phieu-sinh-hoc" },
        { question: "🧬 Ếch là động vật lưỡng cư.", type: "true-false", answer: true, explanation: "Đúng. Ếch sống được cả ở nước và trên cạn — thuộc nhóm lưỡng cư.", level: "nhan-biet", activity: "phieu-sinh-hoc" },
        { question: "🧬 Dơi là một loài chim.", type: "true-false", answer: false, explanation: "Sai. Dơi là động vật có vú biết bay.", level: "thong-hieu", activity: "phieu-sinh-hoc" },
        { question: "🧬 Tim người có 4 ngăn.", type: "true-false", answer: true, explanation: "Đúng. Tim người có 2 tâm nhĩ và 2 tâm thất.", level: "nhan-biet", activity: "phieu-sinh-hoc" },
      ],
    },
    {
      id: "phieu-toan", name: "Lượt chơi 🔢 Toán", type: "knowledge",
      goal: "Cặp chơi thứ hai trả lời các phiếu chủ đề Toán trong một phút.",
      time: 60,
      task: "Bạn thứ nhất đọc to câu trong phiếu, bạn thứ hai gật đầu (Đúng) hoặc lắc đầu (Sai) rồi bấm chọn. Hết một phút thì dừng.",
      questions: [
        { question: "🔢 Số 1 là số nguyên tố.", type: "true-false", answer: false, explanation: "Sai. Số nguyên tố là số tự nhiên lớn hơn 1, chỉ có hai ước là 1 và chính nó.", level: "nhan-biet", activity: "phieu-toan" },
        { question: "🔢 Số 2 là số nguyên tố chẵn duy nhất.", type: "true-false", answer: true, explanation: "Đúng. Mọi số chẵn khác 2 đều chia hết cho 2 nên có nhiều hơn hai ước.", level: "thong-hieu", activity: "phieu-toan" },
        { question: "🔢 Số 15 chia hết cho 2.", type: "true-false", answer: false, explanation: "Sai. 15 có chữ số tận cùng là 5 (số lẻ) nên không chia hết cho 2.", level: "nhan-biet", activity: "phieu-toan" },
        { question: "🔢 Hình vuông có 4 trục đối xứng.", type: "true-false", answer: true, explanation: "Đúng. 2 đường chéo và 2 đường nối trung điểm các cặp cạnh đối.", level: "thong-hieu", activity: "phieu-toan" },
        { question: "🔢 −5 lớn hơn −3.", type: "true-false", answer: false, explanation: "Sai. Trên trục số, −5 nằm bên trái −3 nên −5 < −3.", level: "thong-hieu", activity: "phieu-toan" },
        { question: "🔢 Ước chung lớn nhất của 12 và 18 là 6.", type: "true-false", answer: true, explanation: "Đúng. Ước chung của 12 và 18 là 1, 2, 3, 6 — lớn nhất là 6.", level: "van-dung", activity: "phieu-toan" },
      ],
    },

    /* ===================== HĐ2.1: CẤU TRÚC TUẦN TỰ, RẼ NHÁNH ===================== */
    {
      id: "danh-gia-ket-qua", name: "Hoạt động 1: Đánh giá kết quả chơi 📝", type: "knowledge",
      goal: "Nhận ra các bước đánh giá điểm là tuần tự và có bước kiểm tra điều kiện (rẽ nhánh).",
      time: 420,
      task: "Hoạt động 1 (SGK tr.67): làm việc nhóm — 1. Điều kiện để cặp chơi được cộng một điểm là gì? 2. Việc đánh giá điểm gồm những bước nào? Viết các bước đó ra giấy.",
      sgkImage: "assets/sgk/sgk-trang67.jpg",
      content: {
        heading: "📝 Đánh giá kết quả chơi",
        revealLabel: "📖 Cấu trúc tuần tự & cấu trúc rẽ nhánh (SGK tr.67–68)",
        blocks: [
          { kind: "text", value: "Các bước của thuật toán gấp hình trò chơi Đông-Tây-Nam-Bắc ở Bài 15 được thực hiện lần lượt từng bước theo chiều đi từ bắt đầu đến kết thúc là cấu trúc tuần tự (Hình 6.6)." },
          { kind: "image", value: "assets/sgk/hinh-6-6.jpg", caption: "Hình 6.6. Sơ đồ khối mô tả cấu trúc tuần tự" },
          { kind: "text", value: "Khi đánh giá kết quả của một cặp, với mỗi phiếu, nếu bạn thứ hai trả lời đúng thì được cộng một điểm. Tuỳ vào kết quả kiểm tra là đúng hay sai mà bước xử lí tiếp theo sẽ rẽ theo “nhánh” tương ứng — đó là cấu trúc rẽ nhánh (hay cấu trúc lựa chọn). Hình thoi được dùng để mô tả điều kiện." },
          { kind: "image", value: "assets/sgk/hinh-6-7.jpg", caption: "Hình 6.7. Sơ đồ khối mô tả cấu trúc rẽ nhánh dạng thiếu" },
        ],
      },
      questions: [
        { question: "1. Trong trò chơi, điều kiện để cặp chơi được cộng một điểm là gì?", type: "multiple-choice",
          options: ["Bạn thứ nhất đọc to câu trong phiếu", "Bạn thứ hai trả lời đúng", "Cặp chơi chọn chủ đề Toán", "Cặp chơi bốc được nhiều phiếu"],
          answer: 1, explanation: "Với mỗi phiếu, nếu bạn thứ hai trả lời đúng thì cặp chơi được cộng một điểm.", level: "nhan-biet", activity: "danh-gia-ket-qua" },
        { question: "2. Các bước đánh giá điểm cho một phiếu, thứ tự nào hợp lí?", type: "multiple-choice",
          options: ["Cộng 1 điểm → đọc câu trả lời → kiểm tra đúng hay sai", "Kiểm tra câu trả lời đúng hay sai → đọc câu trả lời → cộng điểm", "Đọc câu trả lời đã ghi → kiểm tra đúng hay sai → nếu đúng thì cộng 1 điểm", "Luôn cộng 1 điểm cho mỗi phiếu"],
          answer: 2, explanation: "Các bước lần lượt (tuần tự), trong đó có bước kiểm tra điều kiện: đúng thì cộng điểm — đó là rẽ nhánh.", level: "thong-hieu", activity: "danh-gia-ket-qua" },
        { question: "Trong sơ đồ khối, hình nào được dùng để mô tả điều kiện trong cấu trúc rẽ nhánh?", type: "multiple-choice", sgkImage: "assets/sgk/hinh-6-7.jpg",
          options: ["Hình chữ nhật", "Hình oval", "Hình thoi", "Hình bình hành"],
          answer: 2, explanation: "Hình thoi được dùng để mô tả điều kiện trong cấu trúc rẽ nhánh.", level: "nhan-biet", activity: "danh-gia-ket-qua" },
      ],
      remember: ["Cấu trúc tuần tự: thực hiện lần lượt từng bước từ bắt đầu đến kết thúc. Cấu trúc rẽ nhánh: tuỳ kết quả kiểm tra điều kiện đúng hay sai mà rẽ theo nhánh tương ứng."],
    },
    {
      id: "re-nhanh-thieu-du", name: "Rẽ nhánh dạng thiếu và dạng đủ 🔀", type: "knowledge",
      goal: "Phân biệt cấu trúc tuần tự, rẽ nhánh dạng thiếu, rẽ nhánh dạng đủ qua sơ đồ khối.",
      time: 480,
      task: "Nhóm thảo luận: 1. Cấu trúc tuần tự, rẽ nhánh là gì? 2. Nêu sơ đồ cấu trúc tuần tự, rẽ nhánh dạng thiếu và dạng đủ. Giải thích.",
      sgkImage: "assets/sgk/tom-tat-re-nhanh.jpg",
      content: {
        heading: "🔀 Dạng thiếu hay dạng đủ?",
        prompt: "Quyết định của bạn thứ hai: nếu câu khẳng định đúng thì gật đầu, còn không thì lắc đầu. Cả hai trường hợp đúng hay sai đều có hành động tương ứng.",
        revealLabel: "📌 Kết luận (giáo án) & tóm tắt SGK tr.68",
        blocks: [
          { kind: "image", value: "assets/sgk/hinh-6-8.jpg", caption: "Hình 6.8. Sơ đồ khối mô tả cấu trúc rẽ nhánh dạng đủ" },
          { kind: "list", value: [
            "Cấu trúc tuần tự: thực hiện từ bước đầu tiên đến bước cuối cùng (kết thúc) theo thứ tự. Thực hiện từ lệnh 1 đến lệnh 3 theo thứ tự.",
            "Cấu trúc rẽ nhánh: kiểm tra điều kiện đúng hay sai. Nếu đúng sẽ thực hiện tiếp, nếu sai sẽ dừng thuật toán.",
            "Rẽ nhánh dạng thiếu: nếu câu lệnh thực hiện đúng sẽ thực hiện tiếp, nếu câu lệnh thực hiện sai sẽ dừng lại.",
            "Rẽ nhánh dạng đủ: nếu câu lệnh thực hiện đúng sẽ thực hiện câu lệnh 1, nếu câu lệnh thực hiện sai sẽ thực hiện câu lệnh 2.",
          ] },
          { kind: "image", value: "assets/sgk/tom-tat-re-nhanh.jpg", caption: "Tóm tắt SGK tr.68: cấu trúc tuần tự, rẽ nhánh dạng thiếu, rẽ nhánh dạng đủ" },
        ],
      },
      questions: [
        { question: "Hình 6.7 chỉ thực hiện một công việc (cộng điểm) sau khi kiểm tra điều kiện. Đó là cấu trúc nào?", type: "multiple-choice", sgkImage: "assets/sgk/hinh-6-7.jpg",
          options: ["Cấu trúc tuần tự", "Cấu trúc rẽ nhánh dạng thiếu", "Cấu trúc rẽ nhánh dạng đủ", "Cấu trúc lặp"],
          answer: 1, explanation: "Chỉ có một công việc gắn với nhánh Đúng → rẽ nhánh dạng thiếu.", level: "thong-hieu", activity: "re-nhanh-thieu-du" },
        { question: "Hình 6.8: nếu câu khẳng định đúng thì gật đầu, sai thì lắc đầu. Đó là cấu trúc nào?", type: "multiple-choice", sgkImage: "assets/sgk/hinh-6-8.jpg",
          options: ["Cấu trúc rẽ nhánh dạng đủ", "Cấu trúc rẽ nhánh dạng thiếu", "Cấu trúc tuần tự", "Cấu trúc lặp"],
          answer: 0, explanation: "Cả hai trường hợp đúng và sai đều có hành động tương ứng → rẽ nhánh dạng đủ.", level: "thong-hieu", activity: "re-nhanh-thieu-du" },
        { question: "Cấu trúc tuần tự thực hiện các lệnh như thế nào?", type: "multiple-choice",
          options: ["Chỉ thực hiện lệnh cuối cùng", "Thực hiện lần lượt các lệnh theo trình tự từ bắt đầu đến kết thúc", "Chọn ngẫu nhiên một lệnh", "Lặp lại mãi một lệnh"],
          answer: 1, explanation: "Cấu trúc tuần tự thực hiện lần lượt các lệnh theo trình tự từ bắt đầu đến kết thúc.", level: "nhan-biet", activity: "re-nhanh-thieu-du" },
        { question: "Trong cấu trúc rẽ nhánh dạng đủ, khi Điều kiện đúng thì thực hiện lệnh nào?", type: "multiple-choice", sgkImage: "assets/sgk/tom-tat-re-nhanh.jpg",
          options: ["Lệnh 2", "Cả Lệnh 1 và Lệnh 2", "Không thực hiện lệnh nào", "Lệnh 1"],
          answer: 3, explanation: "Dạng đủ: nếu Điều kiện đúng thì thực hiện Lệnh 1, nếu sai thì thực hiện Lệnh 2.", level: "nhan-biet", activity: "re-nhanh-thieu-du" },
      ],
      remember: ["Tuần tự: lần lượt Lệnh 1 → Lệnh 2 → Lệnh 3. Rẽ nhánh dạng thiếu: nếu Điều kiện đúng thì thực hiện Lệnh. Dạng đủ: đúng thì Lệnh 1, sai thì Lệnh 2."],
    },
    {
      id: "cau-hoi-tr68", name: "Câu hỏi SGK tr.68 ❓", type: "knowledge",
      goal: "Nhận ra cấu trúc tuần tự, rẽ nhánh trong câu nói, công việc hằng ngày.",
      time: 360,
      task: "Trả lời câu hỏi SGK tr.68: 1. Kể hai công việc được thực hiện tuần tự theo các bước. 2. Câu “Nếu trời mưa thì em không đi đá bóng” có chứa cấu trúc nào? Mô tả bằng sơ đồ khối.",
      sgkImage: "assets/sgk/sgk-trang68.jpg",
      content: {
        heading: "❓ Cấu trúc nào trong đời sống?",
        revealLabel: "🔀 Sơ đồ khối: “Nếu trời mưa thì em không đi đá bóng”",
        blocks: [{ kind: "html", value: `<div style="text-align:center">${branchSVG("Trời mưa?", "Em không đi đá bóng")}</div>` }],
      },
      questions: [
        { question: "Công việc nào dưới đây được thực hiện tuần tự theo các bước?", type: "multiple-choice",
          options: ["Đánh răng: lấy bàn chải → bôi kem → chải răng → súc miệng", "Nếu trời lạnh thì mặc áo ấm", "Ném bóng cho đến khi trúng đích", "Nếu đói thì ăn, không thì học bài"],
          answer: 0, explanation: "Đánh răng gồm các bước lần lượt từ đầu đến cuối — cấu trúc tuần tự.", level: "thong-hieu", activity: "cau-hoi-tr68" },
        { question: "Câu “Nếu trời mưa thì em không đi đá bóng” có chứa cấu trúc nào?", type: "multiple-choice",
          options: ["Cấu trúc tuần tự", "Cấu trúc lặp", "Cấu trúc rẽ nhánh dạng thiếu", "Cấu trúc rẽ nhánh dạng đủ"],
          answer: 2, explanation: "Có điều kiện “trời mưa” và chỉ có một việc khi điều kiện đúng (không đi đá bóng) → rẽ nhánh dạng thiếu.", level: "van-dung", activity: "cau-hoi-tr68" },
        { question: "Trong sơ đồ khối của câu trên, hình thoi ghi điều kiện gì?", type: "multiple-choice",
          options: ["Đi đá bóng", "Trời mưa?", "Em không đi đá bóng", "Kết thúc"],
          answer: 1, explanation: "Điều kiện cần kiểm tra là “Trời mưa?”; nhánh Đúng: em không đi đá bóng.", level: "van-dung", activity: "cau-hoi-tr68" },
      ],
    },

    /* =========================== TIẾT 2 =========================== */
    /* ===================== HĐ2.2: CẤU TRÚC LẶP ===================== */
    {
      id: "cau-truc-lap", name: "Hoạt động 2: Cấu trúc lặp 🔁", type: "knowledge",
      goal: "Nhận biết cấu trúc lặp và điều kiện kết thúc lặp.",
      time: 420,
      task: "Hoạt động 2 (SGK tr.69): 1. Trong trò chơi ở phần khởi động, hoạt động nào được lặp lại? 2. Điều kiện để dừng trò chơi là gì?",
      sgkImage: "assets/sgk/hinh-6-9.jpg",
      content: {
        heading: "🔁 Cấu trúc lặp",
        prompt: "Mỗi lần bạn thứ nhất đọc câu khẳng định trong phiếu, bạn thứ hai phải trả lời xem câu đó đúng hay sai. Hoạt động đọc phiếu và trả lời được lặp lại cho đến khi hết thời gian quy định.",
        revealLabel: "📌 Hình 6.9 & kết luận",
        blocks: [
          { kind: "html", value: `<div style="text-align:center">${loopSVG("Còn thời gian?", "Đọc phiếu và trả lời")}</div>` },
          { kind: "list", value: [
            "Cấu trúc lặp dùng để mô tả các bước của thuật toán được thực hiện lặp lại nhiều lần.",
            "Trong cấu trúc lặp, bao giờ cũng có bước kiểm tra điều kiện kết thúc quá trình lặp. Nếu điều kiện đúng thực hiện câu lệnh, nếu điều kiện sai kết thúc câu lệnh (lặp).",
            "Ba cấu trúc tuần tự, rẽ nhánh và lặp là đủ để mô tả mọi thuật toán.",
          ] },
          { kind: "image", value: "assets/sgk/tom-tat-lap.jpg", caption: "Tóm tắt SGK tr.69: cấu trúc lặp" },
        ],
      },
      questions: [
        { question: "1. Trong trò chơi, hoạt động nào được lặp lại?", type: "multiple-choice",
          options: ["Chọn 4 bạn chơi", "Đọc phiếu và trả lời", "Chọn chủ đề", "Công bố cặp thắng cuộc"],
          answer: 1, explanation: "Hoạt động đọc phiếu và trả lời được lặp lại nhiều lần.", level: "nhan-biet", activity: "cau-truc-lap" },
        { question: "2. Điều kiện để dừng trò chơi là gì?", type: "multiple-choice",
          options: ["Trả lời sai một câu", "Hết thời gian quy định (một phút)", "Đọc xong một phiếu", "Bạn thứ hai lắc đầu"],
          answer: 1, explanation: "Tại mỗi bước lặp, kiểm tra “còn thời gian” hay không: còn thì lặp tiếp, hết thì kết thúc.", level: "thong-hieu", activity: "cau-truc-lap" },
        { question: "Trong cấu trúc lặp, bao giờ cũng có bước nào?", type: "multiple-choice",
          options: ["Bước nhập dữ liệu", "Bước in kết quả", "Bước kiểm tra điều kiện kết thúc quá trình lặp", "Bước gật đầu"],
          answer: 2, explanation: "Trong cấu trúc lặp, bao giờ cũng có bước kiểm tra điều kiện kết thúc quá trình lặp.", level: "nhan-biet", activity: "cau-truc-lap" },
        { question: "Kể hai công việc trong cuộc sống gồm các bước được lặp lại nhiều lần. Cặp nào đúng?", type: "multiple-choice",
          options: ["Nhảy dây đến khi đủ 50 lần; tưới từng cây cho đến khi hết hàng cây", "Nếu mưa thì mang ô; nếu nắng thì đội mũ", "Mở cửa rồi bật đèn", "Đánh răng một lần; ăn sáng một lần"],
          answer: 0, explanation: "Nhảy dây, tưới cây: một việc được làm lặp lại cho đến khi điều kiện kết thúc (đủ số lần, hết cây).", level: "van-dung", activity: "cau-truc-lap" },
      ],
      remember: ["Cấu trúc lặp: lặp lại các bước nhiều lần; luôn có bước kiểm tra điều kiện kết thúc lặp. Ba cấu trúc tuần tự, rẽ nhánh, lặp đủ để mô tả mọi thuật toán."],
    },
    {
      id: "meo-cham-bien", name: "Chú mèo của bạn Khoa 🐱", type: "knowledge",
      goal: "Hoàn thành sơ đồ khối có cấu trúc lặp (Hình 6.10).",
      time: 360,
      task: "Câu hỏi 2 (SGK tr.69): Khoa muốn chú mèo di chuyển 10 bước một liên tục cho đến khi chạm biên thì dừng lại. a) Điều kiện để chú mèo dừng lại là gì? b) Điền các bước vào sơ đồ khối Hình 6.10.",
      sgkImage: "assets/sgk/hinh-6-10.jpg",
      content: {
        heading: "🐱 Chú mèo chạy đến biên",
        html: `<div style="display:flex;justify-content:center"><img src="assets/sgk/hinh-6-10.jpg" alt="Hình 6.10. Sơ đồ khối chưa hoàn thành" style="max-width:min(520px,100%);border-radius:14px"></div>`,
        revealLabel: "✅ Sơ đồ khối hoàn chỉnh",
        blocks: [{ kind: "html", value: `<div style="text-align:center">${loopSVG("Chưa chạm biên?", "Di chuyển 10 bước", "Dừng lại")}</div>` }],
      },
      questions: [
        { question: "a) Điều kiện để chú mèo dừng lại là gì?", type: "multiple-choice",
          options: ["Di chuyển được 10 bước", "Chú mèo chạm biên", "Chú mèo kêu meo meo", "Hết 1 phút"],
          answer: 1, explanation: "Chú mèo di chuyển liên tục cho đến khi chạm biên thì dừng lại.", level: "nhan-biet", activity: "meo-cham-bien" },
        { question: "b) Trong hình thoi của Hình 6.10 em điền bước nào?", type: "multiple-choice", sgkImage: "assets/sgk/hinh-6-10.jpg",
          options: ["Di chuyển 10 bước", "Dừng lại", "Chưa chạm biên?", "Đúng"],
          answer: 2, explanation: "Hình thoi là điều kiện kiểm tra: “Chưa chạm biên?”.", level: "thong-hieu", activity: "meo-cham-bien" },
        { question: "Nhánh Đúng (đi xuống rồi quay lại) của hình thoi dẫn tới ô nào?", type: "multiple-choice", sgkImage: "assets/sgk/hinh-6-10.jpg",
          options: ["Di chuyển 10 bước", "Dừng lại", "Chưa chạm biên?", "Kết thúc chương trình"],
          answer: 0, explanation: "Chưa chạm biên (Đúng) → di chuyển 10 bước rồi quay lại kiểm tra.", level: "thong-hieu", activity: "meo-cham-bien" },
        { question: "Nhánh Sai của hình thoi dẫn tới ô nào?", type: "multiple-choice", sgkImage: "assets/sgk/hinh-6-10.jpg",
          options: ["Di chuyển 10 bước", "Chưa chạm biên?", "Quay lại đầu", "Dừng lại"],
          answer: 3, explanation: "Không còn “chưa chạm biên” nghĩa là đã chạm biên (Sai) → dừng lại.", level: "van-dung", activity: "meo-cham-bien" },
      ],
    },

    /* ===================== HĐ3: LUYỆN TẬP ===================== */
    {
      id: "luyen-tap-1", name: "Luyện tập 1: An toàn trên mạng bằng rẽ nhánh 🛡️", type: "knowledge",
      goal: "Trình bày câu có điều kiện dưới dạng sơ đồ khối cấu trúc rẽ nhánh.",
      time: 360,
      task: "Luyện tập 1 (SGK tr.70): trình bày các câu a), b), c) dưới dạng sơ đồ khối cấu trúc rẽ nhánh. Xác định điều kiện và việc cần làm của mỗi câu.",
      sgkImage: "assets/sgk/sgk-trang70.jpg",
      content: {
        heading: "🛡️ Nếu … thì …",
        revealLabel: "✅ Sơ đồ khối câu a), b), c)",
        blocks: [{ kind: "html", value: svgRow(
          ["a)", branchSVG("Có kẻ trên mạng đe doạ?", "Em nói cho cha mẹ biết")],
          ["b)", branchSVG("Nhận thư có tệp đính kèm từ địa chỉ không quen biết?", "Em không mở tệp đính kèm")],
          ["c)", branchSVG("Có tin nhắn từ người lạ yêu cầu gửi thông tin cá nhân?", "Em không gửi")]) }],
      },
      questions: [
        { question: "a) “Nếu có kẻ trên mạng đe doạ thì em cần nói cho cha mẹ biết.” Trong sơ đồ khối, hình thoi và ô ở nhánh Đúng ghi gì?", type: "multiple-choice",
          options: ["Hình thoi: Em nói cho cha mẹ biết · Nhánh Đúng: Có kẻ đe doạ?", "Hình thoi: Có kẻ trên mạng đe doạ? · Nhánh Đúng: Em nói cho cha mẹ biết", "Hình thoi: Cha mẹ? · Nhánh Đúng: Kết thúc", "Không cần hình thoi"],
          answer: 1, explanation: "Điều kiện đặt trong hình thoi; việc cần làm khi điều kiện đúng đặt trong hình chữ nhật ở nhánh Đúng.", level: "van-dung", activity: "luyen-tap-1" },
        { question: "Ba câu a), b), c) đều là cấu trúc rẽ nhánh dạng nào?", type: "multiple-choice",
          options: ["Dạng đủ", "Dạng thiếu", "Cấu trúc lặp", "Cấu trúc tuần tự"],
          answer: 1, explanation: "Mỗi câu chỉ có một việc làm khi điều kiện đúng → rẽ nhánh dạng thiếu.", level: "thong-hieu", activity: "luyen-tap-1" },
      ],
    },
    {
      id: "luyen-tap-2-3", name: "Luyện tập 2, 3: Lặp hay rẽ nhánh? 🎯", type: "knowledge",
      goal: "Nhận ra câu có cấu trúc lặp; phân biệt sơ đồ lặp và rẽ nhánh (Hình 6.11).",
      time: 360,
      task: "Luyện tập 2, 3 (SGK tr.70): câu nào có thể biểu diễn bằng sơ đồ khối có cấu trúc lặp? Quan sát Hình 6.11a, 6.11b: mỗi sơ đồ mô tả cấu trúc nào?",
      sgkImage: "assets/sgk/hinh-6-11.jpg",
      content: {
        heading: "🎯 Lặp hay rẽ nhánh?",
        revealLabel: "✅ Sơ đồ khối câu b) Luyện tập 2",
        blocks: [{ kind: "html", value: `<div style="text-align:center">${loopSVG("Chưa làm hết bài tập?", "Làm bài tập")}</div>` }],
      },
      questions: [
        { question: "Luyện tập 2: Câu nào có thể biểu diễn bằng sơ đồ khối có cấu trúc lặp?", type: "multiple-choice",
          options: ["a) Nếu sáng mai trời mưa, em sẽ mang theo áo mưa.", "b) Nếu vẫn chưa làm hết bài tập, em phải làm bài tập đến khi nào hết.", "c) Nếu được nghỉ ba ngày vào dịp Tết Dương lịch thì gia đình em sẽ đi du lịch, còn không sẽ có kế hoạch khác.", "Cả ba câu"],
          answer: 1, explanation: "Câu b: làm bài tập lặp lại đến khi hết. Câu a, c là cấu trúc rẽ nhánh.", level: "thong-hieu", activity: "luyen-tap-2-3" },
        { question: "Câu c) “…thì gia đình em sẽ đi du lịch, còn không sẽ có kế hoạch khác” là cấu trúc nào?", type: "multiple-choice",
          options: ["Rẽ nhánh dạng đủ", "Rẽ nhánh dạng thiếu", "Lặp", "Tuần tự"],
          answer: 0, explanation: "Có việc làm cho cả hai trường hợp đúng (đi du lịch) và sai (kế hoạch khác) → dạng đủ.", level: "van-dung", activity: "luyen-tap-2-3" },
        { question: "Luyện tập 3: Hình 6.11a mô tả cấu trúc nào?", type: "multiple-choice", sgkImage: "assets/sgk/hinh-6-11.jpg",
          options: ["Cấu trúc rẽ nhánh — ném bóng một lần", "Cấu trúc tuần tự", "Cấu trúc lặp — ném bóng cho đến khi trúng đích thì dừng lại", "Không mô tả cấu trúc nào"],
          answer: 2, explanation: "Hình 6.11a có mũi tên quay lại: việc lặp lại là ném bóng vào đích, điều kiện dừng là trúng đích.", level: "thong-hieu", activity: "luyen-tap-2-3" },
        { question: "Hình 6.11b mô tả cấu trúc nào?", type: "multiple-choice", sgkImage: "assets/sgk/hinh-6-11.jpg",
          options: ["Cấu trúc lặp", "Cấu trúc rẽ nhánh — nếu chưa trúng đích thì ném bóng, ném bóng chỉ diễn ra một lần", "Cấu trúc tuần tự", "Cấu trúc lặp vô hạn"],
          answer: 1, explanation: "Không có mũi tên quay lại kiểm tra điều kiện → rẽ nhánh (dạng thiếu), hành động ném bóng chỉ diễn ra một lần.", level: "van-dung-cao", activity: "luyen-tap-2-3" },
      ],
    },
    {
      id: "phan-loai-cau-truc", name: "Trò chơi: Tuần tự, rẽ nhánh hay lặp? 🧩", type: "dragdrop",
      goal: "Phân loại tình huống theo cấu trúc điều khiển.",
      time: 180,
      task: "Xếp mỗi tình huống vào cấu trúc phù hợp. Xếp hết rồi bấm Nộp bài.",
      groups: ["➡️ Tuần tự", "🔀 Rẽ nhánh", "🔁 Lặp"],
      items: [
        { text: "Rửa tay: làm ướt tay → xoa xà phòng → rửa sạch → lau khô", group: 0 },
        { text: "Gấp hình trò chơi Đông-Tây-Nam-Bắc theo 6 bước", group: 0 },
        { text: "Nếu trời mưa thì em không đi đá bóng", group: 1 },
        { text: "Nếu trả lời đúng thì cộng 1 điểm", group: 1 },
        { text: "Chạy quanh sân cho đến khi đủ 3 vòng", group: 2 },
        { text: "Còn thời gian thì đọc phiếu và trả lời", group: 2 },
      ],
      explanation: "Tuần tự: lần lượt các bước. Rẽ nhánh: có điều kiện chọn nhánh, việc làm một lần. Lặp: việc làm lặp lại đến khi điều kiện kết thúc.",
    },

    /* ===================== HĐ4: VẬN DỤNG ===================== */
    {
      id: "van-dung-1", name: "Vận dụng 1: Ý kiến của bạn An 📚", type: "knowledge",
      goal: "Đọc và nhận xét sơ đồ khối rẽ nhánh, lặp (Hình 6.12); hiểu AI chạy theo lập trình của con người.",
      time: 300,
      task: "Vận dụng 1 (SGK tr.70): An cho rằng Hình 6.12a: chưa hiểu bài thì đọc lại sách một lần rồi làm bài tập; Hình 6.12b: chưa hiểu bài thì đọc lại sách và làm bài tập nhiều lần. Em có đồng ý không? Sửa thế nào?",
      sgkImage: "assets/sgk/hinh-6-12.jpg",
      content: {
        heading: "📚 Đọc lại sách mấy lần?",
        html: `<div style="display:flex;justify-content:center"><img src="assets/sgk/hinh-6-12.jpg" alt="Hình 6.12a và 6.12b" style="max-width:min(560px,100%);border-radius:14px"></div>`,
        revealLabel: "🤖 AI cũng chạy theo thuật toán",
        blocks: [{ kind: "html", value: AI_HTML }],
      },
      questions: [
        { question: "Nhận xét của An về Hình 6.12a (chưa hiểu bài thì đọc lại sách một lần rồi làm bài tập) là:", type: "multiple-choice", sgkImage: "assets/sgk/hinh-6-12.jpg",
          options: ["Đúng — Hình 6.12a là rẽ nhánh, đọc lại sách chỉ thực hiện một lần", "Sai — Hình 6.12a là cấu trúc lặp", "Sai — Hình 6.12a không có làm bài tập", "Sai — Hình 6.12a là tuần tự"],
          answer: 0, explanation: "Hình 6.12a không có mũi tên quay lại → rẽ nhánh, đọc lại sách một lần rồi làm bài tập.", level: "thong-hieu", activity: "van-dung-1" },
        { question: "Nhận xét của An về Hình 6.12b nên sửa thế nào?", type: "multiple-choice", sgkImage: "assets/sgk/hinh-6-12.jpg",
          options: ["Giữ nguyên: đọc lại sách và làm bài tập đều lặp nhiều lần", "Hình 6.12b không lặp gì cả", "Chỉ việc đọc lại sách được lặp nhiều lần cho đến khi hiểu bài; làm bài tập chỉ thực hiện một lần sau khi đã hiểu bài", "Chỉ làm bài tập được lặp nhiều lần"],
          answer: 2, explanation: "Mũi tên quay lại chỉ bao quanh “Đọc lại sách”. Làm bài tập nằm ở nhánh Sai (đã hiểu bài) nên chỉ thực hiện một lần.", level: "van-dung-cao", activity: "van-dung-1" },
        { question: "Phát biểu nào đúng về AI?", type: "multiple-choice",
          options: ["AI tự quyết định thay con người mọi việc", "AI hoạt động theo lập trình của con người, là công cụ hỗ trợ; con người là người quyết định cuối cùng", "AI không cần thuật toán", "Kết quả AI đưa ra luôn đúng"],
          answer: 1, explanation: "AI chạy theo thuật toán do con người lập trình; người dùng cần kiểm chứng và tự quyết định.", level: "thong-hieu", activity: "van-dung-1" },
      ],
    },
    {
      id: "van-dung-nhom", name: "Vận dụng 2, 3: Tính điểm & điểm danh ✍️", type: "vandung",
      goal: "Chỉ ra công việc được lặp lại; mô tả thuật toán kết hợp tuần tự, rẽ nhánh và lặp bằng sơ đồ khối.",
      time: 240,
      task: "Nhóm trả lời hai câu, vẽ sơ đồ khối vào vở và gửi câu trả lời cho thầy/cô (có thể hoàn thành ở nhà).",
      intro: "Gửi câu trả lời cho thầy/cô rồi bấm để xem gợi ý.",
      cases: [
        { question: "Vận dụng 2: Trong trò chơi khởi động, việc tính điểm cho mỗi cặp chơi là một hoạt động lặp. Hãy chỉ rõ công việc được lặp lại và vẽ sơ đồ khối cấu trúc lặp của hoạt động này.",
          answer: "Công việc đánh giá từng phiếu mà nhóm đã thực hiện trong thời gian một phút là công việc được lặp lại. Công việc này sẽ dừng lại khi hết số phiếu mà nhóm đã trả lời trong lượt chơi của mình.",
          answerHtml: `<div style="text-align:center">${loopSVG("Còn phiếu trả lời?", "Thực hiện việc đánh giá điểm")}</div>` },
        { question: "Vận dụng 3: Cô giáo điểm danh bằng cách gọi tên từng bạn trong danh sách lớp. Nếu bạn nào trả lời có thì cô gọi tên bạn tiếp theo, còn không thì cô đánh dấu vắng mặt và gọi tên bạn tiếp theo. Việc điểm danh có thể mô tả bằng những cấu trúc nào? Vẽ sơ đồ khối.",
          answer: "Với mỗi học sinh, cô giáo gọi tên. Nếu học sinh trả lời “Có” thì cô giáo gọi tên bạn tiếp theo, còn không thì cô đánh dấu vắng mặt và gọi tên bạn tiếp theo. Hoạt động điểm danh này được lặp đi lặp lại và chỉ kết thúc khi điểm danh hết danh sách học sinh. Việc điểm danh của cô giáo có thể được mô tả bằng cấu trúc tuần tự, rẽ nhánh và lặp.",
          answerHtml: `<div style="text-align:center"><img src="assets/sgk/ga-van-dung-3.png" alt="Sơ đồ khối điểm danh (giáo án)" style="max-width:min(300px,100%);background:#fff;border-radius:10px"></div>` },
      ],
    },

    /* ===================== TỔNG KẾT ===================== */
    {
      id: "tong-ket", name: "Tổng kết", type: "summary",
      task: "Cả lớp nhắc lại ba cấu trúc điều khiển và làm thử thách cuối. Dặn dò: hoàn thành Vận dụng 2, 3 vào vở.",
      content: {
        learned: [
          "Cấu trúc tuần tự: thực hiện lần lượt các lệnh từ bắt đầu đến kết thúc.",
          "Cấu trúc rẽ nhánh (hình thoi là điều kiện): dạng thiếu — đúng thì thực hiện Lệnh; dạng đủ — đúng thì Lệnh 1, sai thì Lệnh 2.",
          "Cấu trúc lặp: lặp lại các bước nhiều lần, luôn có bước kiểm tra điều kiện kết thúc lặp.",
          "Ba cấu trúc tuần tự, rẽ nhánh và lặp là đủ để mô tả mọi thuật toán.",
        ],
        challenge: [
          { question: "Bạn Minh viết sơ đồ khối “Còn bài tập? — Đúng → Làm bài tập” nhưng quên mũi tên quay lại kiểm tra điều kiện. Khi đó thuật toán:", type: "multiple-choice",
            options: ["Vẫn làm hết mọi bài tập", "Chỉ làm bài tập một lần — trở thành rẽ nhánh, không còn là lặp", "Không làm bài tập nào", "Lặp mãi không dừng"],
            answer: 1, explanation: "Không có mũi tên quay lại thì không lặp: đó là cấu trúc rẽ nhánh, việc làm chỉ thực hiện một lần.", level: "van-dung-cao", activity: "tong-ket" },
          { question: "“Nếu điểm kiểm tra từ 5 trở lên thì Đạt, còn không thì Chưa đạt” là cấu trúc nào?", type: "multiple-choice",
            options: ["Tuần tự", "Lặp", "Rẽ nhánh dạng thiếu", "Rẽ nhánh dạng đủ"],
            answer: 3, explanation: "Có việc cho cả trường hợp đúng (Đạt) và sai (Chưa đạt) → rẽ nhánh dạng đủ.", level: "van-dung", activity: "tong-ket" },
        ],
      },
    },
  ],
};

if (typeof module !== "undefined" && module.exports) module.exports = LESSON;
if (typeof window !== "undefined") window.LESSON = LESSON;
