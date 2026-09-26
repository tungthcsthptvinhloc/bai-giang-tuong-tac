/* ============================================================================
 * BÀI 17 — CHƯƠNG TRÌNH MÁY TÍNH  (Tin học 6 — Kết nối tri thức)
 * Chủ đề 6: Giải quyết vấn đề với sự trợ giúp của máy tính.
 * Bám sát SGK trang 71–74 + Kế hoạch bài dạy của giáo viên. Thời lượng: 2 tiết.
 * Chỉ sửa file này để đổi nội dung. Engine app.js không cần sửa.
 * Có CHẠY THỬ CHƯƠNG TRÌNH SCRATCH (activity.scratch), GHÉP KHỐI LỆNH SCRATCH (ordering + blocks) và nút mở Scratch online (theo lựa chọn của GV).
 * ==========================================================================*/

const SCRATCH_LINKS = [
  { label: "Scratch — trình soạn thảo trực tuyến (scratch.mit.edu)", url: "https://scratch.mit.edu/projects/editor/", note: "(mở tab mới; phòng máy cài Scratch offline thì dùng bản trên máy)" },
];

// ---- Sơ đồ khối rẽ nhánh dạng đủ có Bắt đầu/Kết thúc (SVG tự vẽ) ----
let SVG_N = 0;
const wrapT = (t, n) => { const out = []; String(t).split("\n").forEach((line) => { let cur = ""; line.split(" ").forEach((w) => { if ((cur + " " + w).trim().length > n && cur) { out.push(cur); cur = w; } else cur = (cur + " " + w).trim(); }); if (cur) out.push(cur); }); return out; };
const svgT = (x, y, t, n, size) => { size = size || 14; const L = wrapT(t, n), y0 = y - ((L.length - 1) * (size + 3)) / 2; return `<text x="${x}" y="${y0}" font-size="${size}" text-anchor="middle" dominant-baseline="middle" fill="#1f2937">${L.map((l, i) => `<tspan x="${x}" dy="${i ? size + 3 : 0}">${l}</tspan>`).join("")}</text>`; };
const para = (cx, y, w, h, t, n) => `<polygon points="${cx - w / 2 + 14},${y} ${cx + w / 2},${y} ${cx + w / 2 - 14},${y + h} ${cx - w / 2},${y + h}" fill="#99f6e4"/>${svgT(cx, y + h / 2, t, n)}`;
function ifChartSVG(o) {
  const id = "ah" + (++SVG_N), A = `stroke="#334155" stroke-width="2.4" fill="none" marker-end="url(#${id})"`, L = `stroke="#334155" stroke-width="2.4" fill="none"`;
  return `<svg viewBox="0 0 520 490" style="width:min(520px,100%);height:auto;font-family:Segoe UI,Arial,sans-serif"><defs><marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#334155"/></marker></defs>
    <ellipse cx="260" cy="30" rx="80" ry="20" fill="#fbcfe8"/>${svgT(260, 30, "Bắt đầu", 20)}<line x1="260" y1="50" x2="260" y2="68" ${A}/>
    ${para(260, 70, 300, 60, o.input, 34)}<line x1="260" y1="130" x2="260" y2="148" ${A}/>
    <rect x="160" y="150" width="200" height="40" fill="#fef08a"/>${svgT(260, 170, o.proc, 26)}<line x1="260" y1="190" x2="260" y2="208" ${A}/>
    <polygon points="150,255 260,210 370,255 260,300" fill="#86efac"/>${svgT(260, 255, o.cond, 16)}
    <polyline points="150,255 90,255 90,328" ${A}/><text x="104" y="244" font-size="14" fill="#166534">Đúng</text>
    <polyline points="370,255 430,255 430,328" ${A}/><text x="386" y="244" font-size="14" fill="#991b1b">Sai</text>
    ${para(90, 330, 176, 60, o.yes, 20)}${para(430, 330, 176, 60, o.no, 20)}
    <polyline points="90,390 90,414 430,414 430,390" ${L}/><line x1="260" y1="414" x2="260" y2="438" ${A}/>
    <ellipse cx="260" cy="460" rx="80" ry="20" fill="#fbcfe8"/>${svgT(260, 460, "Kết thúc", 20)}</svg>`;
}
const fc = (nodes) => `<div class="fc-chart">${nodes.map(([sh, t]) => `<span class="fc-node fc-${sh}">${t}</span>`).join('<span class="fc-arrow">↓</span>')}</div>`;

// ---- Chương trình Scratch (vẽ lại từ SGK, chạy thử được) ----
const SC_TONG = { title: "Hình 6.13 — Chương trình Scratch tính tổng hai số a và b", intro: "Bấm 🏁 để chạy. Khi mèo hỏi, nhập số rồi nhấn Enter. Khối đang chạy sáng lên; ô biến a, b, tong hiện giá trị.",
  script: [{ op: "flag", n: 1 }, { op: "say", text: "Cùng làm toán nhé!", secs: 2, n: 2 }, { op: "ask", text: "Nhập số a:", n: 3 }, { op: "set", var: "a", answer: true, n: 4 },
    { op: "ask", text: "Nhập số b:", n: 5 }, { op: "set", var: "b", answer: true, n: 6 }, { op: "set", var: "tong", expr: "a + b", show: "a + b", n: 7 },
    { op: "say", join: ["Tổng a và b là: ", { v: "tong" }], secs: 2, n: 8 }] };
const SC_THIEP = { title: "Chương trình Scratch tính toán tiền bán thiệp", intro: "Thử với tiền bán a = 150, tiền mua vật liệu b = 100 (nghìn đồng), rồi thử a = 80, b = 100 và a = b.",
  script: [{ op: "flag" }, { op: "ask", text: "Nhập số tiền bán:" }, { op: "set", var: "a", answer: true }, { op: "ask", text: "Nhập số tiền mua vật liệu:" }, { op: "set", var: "b", answer: true },
    { op: "if", cond: "a > b || a == b", show: "a > b hoặc a = b",
      then: [{ op: "say", join: ["Số tiền lãi là: ", { e: "a - b" }], secs: 10 }], else: [{ op: "say", join: ["Số tiền bị lỗ là: ", { e: "b - a" }], secs: 10 }] }] };
const SC_DTB = { title: "Hình 6.15 — Chương trình Scratch", intro: "Thử với điểm 9, 8, 10 rồi thử 7, 6, 8. So sánh thông báo đầu ra.",
  script: [{ op: "flag" }, { op: "say", text: "Tìm điểm trung bình", secs: 2 }, { op: "ask", text: "Nhập điểm toán:" }, { op: "set", var: "a", answer: true },
    { op: "ask", text: "Nhập điểm văn:" }, { op: "set", var: "b", answer: true }, { op: "ask", text: "Nhập điểm tiếng anh:" }, { op: "set", var: "c", answer: true },
    { op: "set", var: "DTB", expr: "(a + b + c) / 3", show: "(a + b + c) / 3" },
    { op: "if", cond: "DTB > 8", show: "DTB > 8.0", then: [{ op: "say", text: "Bạn được thưởng ngôi sao", secs: 2 }], else: [{ op: "say", text: "Bạn cố gắng lên nhé", secs: 2 }] }] };
const SC_NHAY = { title: "Hình 6.16 — Chương trình Scratch", intro: "Bấm 🏁 và quan sát chú mèo: nói xin chào, rồi lặp lại 10 lần các lệnh bên trong khối lặp.",
  script: [{ op: "flag" }, { op: "say", text: "Xin chào!", secs: 2 }, { op: "repeat", times: 10, body: [{ op: "move", steps: 10 }, { op: "drum" }, { op: "rotate", text: "left-right" }, { op: "bounce" }] }] };
const SC_MAX = { title: "Vận dụng 1 — Tìm số lớn hơn trong hai số (theo giáo án)", intro: "Thử với a = 7, b = 12; a = 15, b = 4; a = b = 5.",
  script: [{ op: "flag" }, { op: "ask", text: "Nhập a" }, { op: "set", var: "a", answer: true }, { op: "ask", text: "Nhập b" }, { op: "set", var: "b", answer: true },
    { op: "if", cond: "a == b", show: "a = b", then: [{ op: "say", text: "Hai số bằng nhau", secs: 2 }],
      else: [{ op: "if", cond: "a > b", show: "a > b", then: [{ op: "say", join: ["Số lớn hơn là ", { v: "a" }], secs: 10 }], else: [{ op: "say", join: ["Số lớn hơn là ", { v: "b" }], secs: 10 }] }] }] };
const SC_TBC3 = { title: "Vận dụng 2 — Trung bình cộng của ba số (theo giáo án)", intro: "Nhập ba số bất kì rồi kiểm tra lại kết quả bằng cách tính nhẩm.",
  script: [{ op: "flag" }, { op: "ask", text: "Nhập số a" }, { op: "set", var: "a", answer: true }, { op: "ask", text: "Nhập số b" }, { op: "set", var: "b", answer: true },
    { op: "ask", text: "Nhập số c" }, { op: "set", var: "c", answer: true }, { op: "set", var: "TBC", expr: "(a + b + c) / 3", show: "(a + b + c) / 3" },
    { op: "say", join: ["Trung bình cộng ba số là ", { v: "TBC" }], secs: 2 }] };

const AI_HTML = `<div style="display:flex;flex-wrap:wrap;gap:12px;justify-content:center">
  <div style="flex:1 1 300px;max-width:480px;background:#fef2f2;border:2px solid #fca5a5;border-radius:16px;padding:12px 16px;text-align:left">
    <b style="color:#b91c1c">🤔 Khi nào KHÔNG nên dùng AI?</b>
    <ul style="margin:6px 0 0 18px;padding:0"><li>Khi có cách khác đơn giản hơn (tự tính nhẩm, tự thử chạy chương trình).</li><li>Khi dùng AI không an toàn (phải đưa lên thông tin cá nhân, bảng điểm có tên các bạn).</li><li>Khi dùng AI khiến em lười suy nghĩ (nhờ AI làm hộ toàn bộ bài thực hành).</li></ul></div>
  <div style="flex:1 1 300px;max-width:480px;background:#f5f3ff;border:2px solid #c4b5fd;border-radius:16px;padding:12px 16px;text-align:left">
    <b style="color:#6d28d9">💬 Câu lệnh gợi ý (giáo án)</b>
    <ul style="margin:6px 0 0 18px;padding:0"><li>“Hãy giải thích chương trình máy tính là gì bằng ngôn ngữ dễ hiểu cho học sinh lớp 6.”</li><li>“Hãy kiểm tra chương trình Scratch sau và chỉ ra lỗi nếu có: [nhập chương trình hoặc chèn hình ảnh].”</li></ul>
    <div style="margin-top:6px">Tự viết và chạy thử trước, dùng AI để kiểm tra, luôn tự quyết định.</div></div></div>`;

const LESSON = {
  meta: {
    subject: "Tin học", grade: "6", book: "Kết nối tri thức với cuộc sống",
    title: "Bài 17: Chương trình máy tính", unit: "Chủ đề 6 — Giải quyết vấn đề với sự trợ giúp của máy tính",
    pages: "71–74", durationMinutes: 90,
  },
  objectives: {
    knowledge: [
      "Biết được chương trình là mô tả một thuật toán để máy tính “hiểu” và thực hiện được.",
      "Liệt kê, viết và thực hiện được các chỉ dẫn (câu lệnh) trong chương trình Scratch; chạy thử, phát hiện và sửa lỗi chương trình.",
    ],
    competencies: [
      "Tự chủ và tự học; giải quyết vấn đề và sáng tạo; giao tiếp và hợp tác trong nhóm.",
      "Năng lực số 3.4.TC1a: liệt kê các bước chỉ dẫn, xác định đầu vào – đầu ra; chuyển thuật toán thành chương trình Scratch; chạy thử, phát hiện và sửa lỗi.",
      "Năng lực AI 6.D2.2: trình bày được một số tình huống không nên sử dụng AI.",
    ],
    qualities: ["Chăm chỉ, trách nhiệm khi viết và chạy chương trình; trung thực khi báo cáo kết quả và quá trình sửa lỗi; hợp tác, hỗ trợ bạn."],
  },
  coreKnowledge: [
    "Máy tính không hiểu được chỉ dẫn bằng ngôn ngữ tự nhiên hay sơ đồ khối — cần dùng ngôn ngữ lập trình (Scratch, Python, C, Java,…).",
    "Chương trình là tập hợp các lệnh viết bằng ngôn ngữ lập trình, chỉ dẫn theo từng bước của thuật toán để máy tính thực hiện.",
    "Máy tính thực hiện công việc theo chương trình. Chương trình là mô tả thuật toán để máy tính “hiểu” và thực hiện được.",
    "Chương trình dựa trên các dữ liệu đầu vào, tiến hành các bước xử lí để trả lại kết quả đầu ra.",
  ],
  keywords: ["Chương trình", "Ngôn ngữ lập trình", "Scratch", "Đầu vào", "Đầu ra"],
  settings: { basePoints: 100, useTimer: false, defaultTime: 60, sound: true, streakEnabled: true },

  activities: [
    /* =========================== TIẾT 1 =========================== */
    /* ===================== HĐ1: KHỞI ĐỘNG ===================== */
    {
      id: "khoi-dong", name: "Trò chơi: Làm theo chỉ dẫn 🎨", type: "knowledge",
      goal: "Nhận ra chỉ dẫn phải rõ ràng, đúng trình tự thì người thực hiện mới làm đúng.",
      time: 300,
      task: "Chơi theo cặp: một bạn (như Khoa) có bức tranh đơn giản, lần lượt đưa ra chỉ dẫn; bạn kia (như An) không nhìn tranh, vẽ lại theo chỉ dẫn. Vẽ xong, so sánh hai bức tranh.",
      sgkImage: "assets/sgk/sgk-trang71.jpg",
      content: {
        heading: "🎨 Làm theo chỉ dẫn",
        html: `<div style="display:flex;flex-wrap:wrap;gap:14px;align-items:center;justify-content:center">
          <img src="assets/sgk/tro-choi.jpg" alt="An và Khoa chơi trò Làm theo chỉ dẫn" style="max-width:min(360px,100%);border-radius:14px">
          <div style="flex:1 1 300px;max-width:480px;background:#fff7ed;border:2px solid #fdba74;border-radius:16px;padding:12px 16px;text-align:left;font-size:1.05rem">
            🧑‍🎓 <b>Khoa</b> chuẩn bị một bức tranh đơn giản vẽ đồ vật, không cho An biết nội dung bức tranh.<br>
            👧 <b>An</b> không được nhìn bức tranh. Khoa lần lượt đưa ra chỉ dẫn để An vẽ lại.<br>
            🔍 Vẽ xong, hai bạn so sánh: chỉ dẫn của Khoa có rõ ràng không? An có thực hiện đúng theo chỉ dẫn không?</div></div>`,
      },
      questions: [
        { question: "Để An vẽ lại đúng bức tranh, các chỉ dẫn của Khoa cần như thế nào?", type: "multiple-choice",
          options: ["Càng ngắn càng tốt, An tự đoán phần còn lại", "Rõ ràng, cụ thể, đưa ra theo đúng trình tự", "Nói thật nhanh", "Cho An xem bức tranh"],
          answer: 1, explanation: "Chỉ dẫn rõ ràng, dễ hiểu, đúng trình tự thì người thực hiện mới làm đúng.", level: "thong-hieu", activity: "khoi-dong" },
        { question: "Chỉ dẫn nào rõ ràng hơn để vẽ bông hoa?", type: "multiple-choice",
          options: ["“Vẽ một cái gì đó đẹp ở giữa.”", "“Vẽ bông hoa như ngoài vườn.”", "“Vẽ một hình tròn nhỏ ở giữa tờ giấy, rồi vẽ 5 cánh hoa hình giọt nước xung quanh hình tròn.”", "“Vẽ hoa đi.”"],
          answer: 2, explanation: "Chỉ dẫn cụ thể về hình dạng, số lượng, vị trí thì người vẽ mới làm đúng.", level: "van-dung", activity: "khoi-dong" },
      ],
      remember: ["Người thực hiện chỉ làm đúng khi chỉ dẫn rõ ràng, dễ hiểu và đúng trình tự."],
    },

    /* ===================== HĐ2.1: CHƯƠNG TRÌNH MÁY TÍNH ===================== */
    {
      id: "chuong-trinh", name: "Hoạt động 1: Thực hiện thuật toán 💻", type: "knowledge",
      goal: "Hiểu vì sao cần ngôn ngữ lập trình; nêu được khái niệm chương trình.",
      time: 420,
      task: "Hoạt động 1 (SGK tr.71): An cần hiểu và thực hiện được chỉ dẫn của Khoa — đó là thực hiện thuật toán được liệt kê bằng ngôn ngữ tự nhiên. Nếu thuật toán được chuyển giao cho máy tính thực hiện thì làm thế nào để máy tính hiểu và thực hiện được?",
      sgkImage: "assets/sgk/hoat-dong-1.jpg",
      content: {
        heading: "💻 Chương trình máy tính",
        revealLabel: "📖 Ngôn ngữ lập trình & chương trình (SGK tr.71–72)",
        blocks: [
          { kind: "html", value: `<div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:10px;font-size:1.05rem">
            <div style="background:#fff;border:3px solid #64748b;border-radius:16px;padding:10px 14px;text-align:center">🗣️ Ngôn ngữ tự nhiên<br>📐 Sơ đồ khối<br><b style="color:#b91c1c">Máy tính không hiểu ❌</b></div>
            <div style="font-size:2rem">➡️</div>
            <div style="background:#f5f3ff;border:3px solid #7c3aed;border-radius:16px;padding:10px 14px;text-align:center">🧩 <b>Ngôn ngữ lập trình</b><br>Scratch, Python, C, Java,…</div>
            <div style="font-size:2rem">➡️</div>
            <div style="background:#dcfce7;border:3px solid #16a34a;border-radius:16px;padding:10px 14px;text-align:center">📜 <b>Chương trình</b><br>Máy tính “hiểu” và thực hiện ✅</div></div>` },
          { kind: "list", value: [
            "Muốn máy tính giúp giải quyết công việc thì ta phải chỉ dẫn cho máy tính cách thực hiện. Máy tính không thể hiểu được những chỉ dẫn bằng ngôn ngữ tự nhiên hay sơ đồ khối.",
            "Ngôn ngữ lập trình là ngôn ngữ được dùng để tạo ra chương trình chỉ dẫn cho máy tính hiểu cách thực hiện công việc.",
            "Chương trình là tập hợp các lệnh viết bằng ngôn ngữ lập trình nào đó, chỉ dẫn theo từng bước của thuật toán để máy tính thực hiện.",
            "Chương trình máy tính dựa trên các dữ liệu đầu vào, tiến hành các bước xử lí để trả lại kết quả đầu ra.",
          ] },
        ],
      },
      questions: [
        { question: "Để máy tính hiểu và thực hiện được thuật toán, cần làm gì?", type: "multiple-choice",
          options: ["Nói thuật toán thật to trước máy tính", "Vẽ sơ đồ khối lên giấy", "Viết thuật toán thành chương trình bằng ngôn ngữ lập trình", "Không cần làm gì, máy tính tự hiểu"],
          answer: 2, explanation: "Máy tính không hiểu ngôn ngữ tự nhiên hay sơ đồ khối; cần dùng ngôn ngữ lập trình để viết chương trình.", level: "thong-hieu", activity: "chuong-trinh" },
        { question: "Chương trình là gì?", type: "multiple-choice",
          options: ["Tập hợp các lệnh viết bằng ngôn ngữ lập trình, chỉ dẫn theo từng bước của thuật toán để máy tính thực hiện", "Một bức tranh vẽ trên máy tính", "Một sơ đồ khối có nhiều hình", "Một đoạn văn bằng tiếng Việt"],
          answer: 0, explanation: "Chương trình là một cách mô tả khác của thuật toán để máy tính có thể “hiểu” và thực hiện được.", level: "nhan-biet", activity: "chuong-trinh" },
        { question: "Đâu là các ngôn ngữ lập trình? (Chọn các phương án đúng)", type: "multiple-select",
          options: ["Scratch", "Python", "Microsoft Word", "Java", "C"],
          answer: [0, 1, 3, 4], explanation: "Scratch, Python, C, Java là ngôn ngữ lập trình. Microsoft Word là phần mềm soạn thảo văn bản.", level: "nhan-biet", activity: "chuong-trinh" },
      ],
      remember: ["Chương trình: tập hợp các lệnh viết bằng ngôn ngữ lập trình, chỉ dẫn từng bước của thuật toán để máy tính thực hiện."],
    },
    {
      id: "chay-thu-tong", name: "Chạy thử chương trình tính tổng 🧮", type: "knowledge",
      goal: "Quan sát chương trình Scratch thực hiện thuật toán: nhập đầu vào → xử lí → thông báo đầu ra.",
      time: 360,
      task: "Chạy thử chương trình Hình 6.13 với vài cặp số a, b. Theo dõi khối lệnh đang chạy và trả lời câu hỏi.",
      sgkImage: "assets/sgk/hinh-6-13.jpg",
      links: SCRATCH_LINKS,
      scratch: SC_TONG,
      questions: [
        { question: "Nhập a = 5, b = 7. Chú mèo nói gì ở cuối chương trình?", type: "multiple-choice",
          options: ["Cùng làm toán nhé!", "Tổng a và b là: 12", "Nhập số a:", "Tổng a và b là: 57"],
          answer: 1, explanation: "Lệnh ⑦ tính tong = 5 + 7 = 12, lệnh ⑧ thông báo “Tổng a và b là: 12”.", level: "van-dung", activity: "chay-thu-tong" },
        { question: "Trong chương trình Hình 6.13, lệnh nào lưu số người dùng nhập vào biến a?", type: "multiple-choice", sgkImage: "assets/sgk/hinh-6-13.jpg",
          options: ["Lệnh ③ hỏi [Nhập số a:] và đợi", "Lệnh ② nói", "Lệnh ④ đặt a là (trả lời)", "Lệnh ⑦ đặt tong là (a + b)"],
          answer: 2, explanation: "Lệnh ③ hỏi và đợi người dùng nhập; lệnh ④ đặt biến a bằng câu trả lời vừa nhập.", level: "thong-hieu", activity: "chay-thu-tong" },
      ],
    },
    {
      id: "doi-chieu", name: "Câu hỏi tr.72: Thuật toán ↔ chương trình 🔗", type: "matching",
      goal: "Đối chiếu các bước của thuật toán bằng ngôn ngữ tự nhiên với câu lệnh Scratch (Hình 6.13).",
      time: 240,
      task: "Dựa vào Hình 6.13, ghép mỗi công việc với mô tả bằng ngôn ngữ tự nhiên và số thứ tự câu lệnh Scratch tương ứng. Làm hết rồi bấm Nộp bài.",
      sgkImage: "assets/sgk/hinh-6-13.jpg",
      pairs: [
        { left: "Nhập dữ liệu đầu vào", right: "Nhập hai số a và b — lệnh ③ ④ ⑤ ⑥" },
        { left: "Xử lí", right: "tong = a + b — lệnh ⑦" },
        { left: "Thông báo đầu ra", right: "Thông báo giá trị của tong (Tổng a và b là:) — lệnh ⑧" },
      ],
      explanation: "Nhập: lệnh 3, 4, 5, 6 · Xử lí: lệnh 7 · Thông báo đầu ra: lệnh 8 (lệnh 1 bắt đầu chương trình, lệnh 2 nói lời chào).",
    },
    {
      id: "ghep-tong", name: "Ghép khối lệnh: chương trình tính tổng 🧩", type: "ordering",
      goal: "Sắp xếp các khối lệnh Scratch thành chương trình tính tổng hai số đúng trình tự.",
      time: 180,
      task: "Ghép các khối lệnh thành chương trình tính tổng hai số a và b (nhập a trước, b sau). Ghép xong bấm Nộp bài.",
      steps: ["khi nhấn vào 🏁", "nói [Cùng làm toán nhé!] trong 2 giây", "hỏi [Nhập số a:] và đợi", "đặt a là (trả lời)", "hỏi [Nhập số b:] và đợi", "đặt b là (trả lời)", "đặt tong là (a + b)", "nói (nối [Tổng a và b là:] và (tong)) trong 2 giây"],
      blocks: ["event", "looks", "sensing", "variables", "sensing", "variables", "variables", "looks"],
      explanation: "Bắt đầu → chào → nhập a (hỏi, đặt) → nhập b (hỏi, đặt) → tính tong → thông báo tong. Phải nhập xong mới tính, tính xong mới thông báo.",
    },

    /* =========================== TIẾT 2 =========================== */
    /* ===================== HĐ2.2: THỰC HÀNH TẠO CHƯƠNG TRÌNH ===================== */
    {
      id: "thuc-hanh-thiep", name: "Thực hành: Tiền bán thiệp chúc mừng 💌", type: "knowledge",
      goal: "Xác định đầu vào, đầu ra; mô tả thuật toán bằng sơ đồ khối; tạo chương trình Scratch tính tiền lãi hoặc tiền lỗ.",
      time: 900,
      task: "Nhiệm vụ (SGK tr.72): An, Minh, Khoa bán thiệp lấy tiền mua sách tặng các bạn vùng khó khăn. a là số tiền bán được, b là số tiền mua vật liệu. Tính tiền lãi hoặc tiền lỗ: xác định đầu vào, đầu ra; vẽ sơ đồ khối; tạo chương trình Scratch và chạy thử.",
      sgkImage: "assets/sgk/hinh-6-14.jpg",
      links: SCRATCH_LINKS,
      scratch: SC_THIEP,
      content: {
        heading: "💌 Tính tiền lãi hoặc tiền lỗ",
        prompt: "Nếu số tiền bán được lớn hơn hoặc bằng tiền mua vật liệu thì tiền lãi = a − b, còn không thì tiền bị lỗ = b − a (tiền mua vật liệu bằng tiền bán được thì coi như tiền lãi bằng 0).",
        revealLabel: "📖 Hướng dẫn a) b) c) (SGK tr.73)",
        blocks: [
          { kind: "list", value: ["a) Đầu vào: hai số a, b. Đầu ra: số tiền lãi hoặc số tiền bị lỗ."] },
          { kind: "image", value: "assets/sgk/hinh-6-14.jpg", caption: "b) Hình 6.14. Sơ đồ khối mô tả thuật toán tính toán tiền bán thiệp chúc mừng" },
          { kind: "image", value: "assets/sgk/bang-thiep.jpg", caption: "c) Sơ đồ khối và chương trình Scratch tương ứng" },
        ],
      },
      questions: [
        { question: "Đầu vào và đầu ra của bài toán là:", type: "multiple-choice",
          options: ["Đầu vào: tiền lãi · Đầu ra: hai số a, b", "Đầu vào: hai số a, b · Đầu ra: số tiền lãi hoặc số tiền bị lỗ", "Đầu vào: tấm thiệp · Đầu ra: sách", "Đầu vào: a · Đầu ra: b"],
          answer: 1, explanation: "Đầu vào: a (tiền bán), b (tiền mua vật liệu). Đầu ra: số tiền lãi hoặc số tiền bị lỗ.", level: "nhan-biet", activity: "thuc-hanh-thiep" },
        { question: "Bán được 150 nghìn đồng, mua vật liệu hết 100 nghìn đồng. Chương trình thông báo gì?", type: "multiple-choice",
          options: ["Số tiền bị lỗ là: 50", "Số tiền lãi là: 250", "Số tiền lãi là: 50", "Số tiền bị lỗ là: -50"],
          answer: 2, explanation: "a ≥ b (150 ≥ 100) → nhánh Đúng: tiền lãi = a − b = 50.", level: "van-dung", activity: "thuc-hanh-thiep" },
        { question: "Trong Scratch, điều kiện a ≥ b được viết bằng khối nào?", type: "multiple-choice", sgkImage: "assets/sgk/bang-thiep.jpg",
          options: ["(a) > (b)", "(a) = (b)", "(a) < (b) hoặc (a) = (b)", "(a) > (b) hoặc (a) = (b)"],
          answer: 3, explanation: "a ≥ b nghĩa là a lớn hơn b hoặc a bằng b → nếu (a > b) hoặc (a = b) thì…", level: "thong-hieu", activity: "thuc-hanh-thiep" },
      ],
      remember: ["Từ sơ đồ khối → chương trình: mỗi khối (nhập, xử lí, điều kiện, thông báo) tương ứng với một hoặc vài câu lệnh Scratch."],
    },
    {
      id: "ghep-thiep", name: "Ghép khối lệnh: chương trình tiền bán thiệp 🧩", type: "ordering",
      goal: "Chuyển sơ đồ khối Hình 6.14 thành chương trình Scratch đúng trình tự.",
      time: 180,
      task: "Ghép các khối lệnh thành chương trình Scratch tính toán tiền bán thiệp (nhập tiền bán trước, tiền mua vật liệu sau). Ghép xong bấm Nộp bài.",
      steps: ["khi nhấn vào 🏁", "hỏi [Nhập số tiền bán:] và đợi", "đặt a là (trả lời)", "hỏi [Nhập số tiền mua vật liệu:] và đợi", "đặt b là (trả lời)", "nếu (a > b hoặc a = b) thì nói (Số tiền lãi là: a − b) còn không thì nói (Số tiền bị lỗ là: b − a)"],
      blocks: ["event", "sensing", "variables", "sensing", "variables", "control"],
      explanation: "Bắt đầu → nhập a → nhập b → khối nếu … thì … còn không thì … (rẽ nhánh dạng đủ) để thông báo tiền lãi hoặc tiền lỗ.",
    },
    {
      id: "tu-kiem-tra", name: "Phiếu tự kiểm tra chương trình Scratch 📋", type: "checklist",
      goal: "Tự kiểm tra chương trình tiền bán thiệp đã tạo trên Scratch.",
      time: 150,
      task: "Chạy thử chương trình của nhóm trên Scratch, tick từng việc rồi gửi phiếu cho thầy/cô.",
      columns: ["✅ Làm được", "⏳ Chưa làm được"],
      sections: [
        { title: "🧩 TẠO CHƯƠNG TRÌNH", items: ["Có khối khi nhấn vào 🏁 ở đầu chương trình", "Nhập được a và b bằng khối hỏi và đợi, đặt … là (trả lời)", "Dùng khối nếu … thì … còn không thì … với điều kiện a > b hoặc a = b"] },
        { title: "▶️ CHẠY THỬ & SỬA LỖI", items: ["Thử a > b: chương trình thông báo đúng tiền lãi", "Thử a < b: chương trình thông báo đúng tiền lỗ", "Thử a = b: chương trình thông báo tiền lãi bằng 0"] },
      ],
      note: "Nhóm em đã gặp lỗi gì khi chạy thử và sửa thế nào?",
      modelAnswer: ["Lỗi thường gặp: quên khối đặt … là (trả lời) nên biến a, b không có giá trị; viết a − b ở cả hai nhánh; chỉ dùng a > b nên khi a = b lại báo lỗ; sai thứ tự (tính trước khi nhập).", "Cách sửa: thêm khối đặt biến, sửa điều kiện thành a > b hoặc a = b, sắp xếp lại khối lệnh rồi chạy thử lại với nhiều bộ dữ liệu."],
    },

    /* ===================== HĐ3: LUYỆN TẬP ===================== */
    {
      id: "luyen-tap-1-2", name: "Luyện tập 1, 2: Chương trình Hình 6.15 ⭐", type: "knowledge",
      goal: "Nhận biết đặc điểm của chương trình; đọc chương trình Scratch, xác định thuật toán, đầu vào, đầu ra.",
      time: 480,
      task: "Luyện tập 1: tìm câu sai. Luyện tập 2 (Hình 6.15): chương trình thực hiện thuật toán nào? Đầu vào, đầu ra? Cho ví dụ dữ liệu vào và kết quả ra (chạy thử). Trình bày thuật toán bằng sơ đồ khối.",
      sgkImage: "assets/sgk/hinh-6-15.jpg",
      scratch: SC_DTB,
      content: {
        heading: "⭐ Ai được thưởng ngôi sao?",
        revealLabel: "📐 d) Sơ đồ khối của thuật toán",
        blocks: [{ kind: "html", value: `<div style="text-align:center">${ifChartSVG({ input: "Nhập điểm Toán (a)\nNhập điểm Văn (b)\nNhập điểm Tiếng Anh (c)", proc: "ĐTB ← (a + b + c) / 3", cond: "ĐTB > 8", yes: "Thông báo bạn được thưởng ngôi sao", no: "Thông báo bạn cố gắng lên nhé" })}</div>` }],
      },
      questions: [
        { question: "Luyện tập 1. Tìm câu SAI.", type: "multiple-choice",
          options: ["a) Chương trình máy tính là một dãy các lệnh mà máy tính có thể hiểu và thực hiện được.", "b) Chương trình máy tính được viết bằng ngôn ngữ lập trình.", "c) Máy tính có thể thực hiện các lệnh trong chương trình theo trình tự tuỳ ý."],
          answer: 2, explanation: "c sai: máy tính thực hiện các lệnh theo đúng trình tự trong chương trình.", level: "thong-hieu", activity: "luyen-tap-1-2" },
        { question: "2a) Chương trình Hình 6.15 thực hiện thuật toán nào?", type: "multiple-choice", sgkImage: "assets/sgk/hinh-6-15.jpg",
          options: ["Tính tổng hai số", "Tính điểm trung bình ba môn Toán, Văn, Tiếng Anh để xét xem học sinh được thưởng ngôi sao hay cần cố gắng hơn", "Tìm số lớn hơn trong hai số", "Đếm số học sinh"],
          answer: 1, explanation: "Tính ĐTB = (a + b + c) / 3 rồi so sánh với 8.0 để thông báo.", level: "thong-hieu", activity: "luyen-tap-1-2" },
        { question: "2b) Đầu vào, đầu ra của thuật toán là:", type: "multiple-choice",
          options: ["Đầu vào: ba số a, b, c (điểm Toán, Văn, Tiếng Anh) · Đầu ra: thông báo “Bạn được thưởng ngôi sao” hoặc “Bạn cố gắng lên nhé”", "Đầu vào: ngôi sao · Đầu ra: điểm", "Đầu vào: 8.0 · Đầu ra: a, b, c", "Đầu vào: ĐTB · Đầu ra: a"],
          answer: 0, explanation: "Dữ liệu vào là ba điểm; kết quả ra là một trong hai thông báo.", level: "nhan-biet", activity: "luyen-tap-1-2" },
        { question: "2c) Nhập điểm 7, 6, 8. Chương trình thông báo gì?", type: "multiple-choice",
          options: ["Bạn được thưởng ngôi sao", "Tìm điểm trung bình", "Bạn cố gắng lên nhé", "Không thông báo gì"],
          answer: 2, explanation: "ĐTB = (7 + 6 + 8) / 3 = 7, không lớn hơn 8.0 → “Bạn cố gắng lên nhé”. Với 9, 8, 10: ĐTB = 9 → được thưởng ngôi sao.", level: "van-dung", activity: "luyen-tap-1-2" },
      ],
    },
    {
      id: "luyen-tap-3", name: "Luyện tập 3: Chú mèo đánh trống 🥁", type: "knowledge",
      goal: "Đọc chương trình, nhận ra các cấu trúc tuần tự, rẽ nhánh, lặp trong chương trình Scratch.",
      time: 360,
      task: "Luyện tập 3 (Hình 6.16): chạy thử chương trình. a) Chương trình thực hiện công việc gì? b) Có dùng cấu trúc tuần tự, rẽ nhánh, lặp không? Lệnh nào thể hiện? c) Tạo chương trình trên Scratch.",
      sgkImage: "assets/sgk/hinh-6-16.jpg",
      links: SCRATCH_LINKS,
      scratch: SC_NHAY,
      questions: [
        { question: "a) Chương trình Hình 6.16 thực hiện công việc gì?", type: "multiple-choice",
          options: ["Nhân vật nói “Xin chào!” trong 2 giây, sau đó lặp lại 10 lần: di chuyển 10 bước, chơi trống, nếu chạm biên thì bật lại", "Tính tổng hai số", "Nhân vật đứng yên và hát", "Nhân vật hỏi tên người dùng"],
          answer: 0, explanation: "Nói xin chào, rồi lặp 10 lần di chuyển kèm tiếng trống, chạm biên thì quay lại.", level: "thong-hieu", activity: "luyen-tap-3" },
        { question: "b) Lệnh nào thể hiện cấu trúc lặp?", type: "multiple-choice",
          options: ["nói [Xin chào!] trong 2 giây", "lặp lại 10 lần", "di chuyển 10 bước", "khi nhấn vào 🏁"],
          answer: 1, explanation: "“lặp lại 10 lần” thực hiện lặp các lệnh bên trong 10 lần.", level: "nhan-biet", activity: "luyen-tap-3" },
        { question: "Lệnh nào thể hiện cấu trúc rẽ nhánh?", type: "multiple-choice",
          options: ["chơi trống 1 trong 0.25 nhịp", "chỉnh kiểu quay thành left-right", "nếu chạm biên, bật lại", "lặp lại 10 lần"],
          answer: 2, explanation: "“nếu chạm biên, bật lại”: chỉ khi chạm biên (điều kiện đúng) nhân vật mới bật lại.", level: "thong-hieu", activity: "luyen-tap-3" },
        { question: "Cấu trúc tuần tự thể hiện ở đâu?", type: "multiple-choice",
          options: ["Nhân vật nói “Xin chào!” xong rồi mới thực hiện khối lặp", "Chỉ ở lệnh chơi trống", "Không có cấu trúc tuần tự", "Chỉ ở lệnh nếu chạm biên, bật lại"],
          answer: 0, explanation: "Các lệnh được thực hiện lần lượt: nói xin chào rồi mới đến khối lặp.", level: "van-dung", activity: "luyen-tap-3" },
      ],
    },

    /* ===================== HĐ4: VẬN DỤNG ===================== */
    {
      id: "van-dung", name: "Vận dụng 1: Tìm số lớn hơn 🔍", type: "knowledge",
      goal: "Chạy thử chương trình tìm số lớn hơn trong hai số; biết khi nào không nên dùng AI.",
      time: 300,
      task: "Vận dụng 1 (SGK tr.74): vẽ sơ đồ khối tìm số lớn hơn trong hai số a và b, rồi viết chương trình Scratch. Chạy thử chương trình mẫu (theo giáo án) và trả lời câu hỏi.",
      sgkImage: "assets/sgk/sgk-trang74.jpg",
      links: SCRATCH_LINKS,
      scratch: SC_MAX,
      content: {
        heading: "🔍 Số nào lớn hơn?",
        revealLabel: "🤔 Khi nào không nên dùng AI?",
        blocks: [{ kind: "html", value: AI_HTML }],
      },
      questions: [
        { question: "Nhập a = 7, b = 12. Chương trình thông báo gì?", type: "multiple-choice",
          options: ["Số lớn hơn là 7", "Hai số bằng nhau", "Số lớn hơn là 12", "Số lớn hơn là 19"],
          answer: 2, explanation: "a ≠ b và a > b sai → nhánh còn không thì: “Số lớn hơn là 12”.", level: "van-dung", activity: "van-dung" },
        { question: "Chương trình dùng hai khối “nếu … thì … còn không thì …” lồng nhau. Vì sao cần kiểm tra a = b trước?", type: "multiple-choice",
          options: ["Để chương trình dài hơn", "Để thông báo “Hai số bằng nhau” khi a = b, không nói sai là b lớn hơn", "Vì Scratch bắt buộc", "Không cần thiết"],
          answer: 1, explanation: "Nếu chỉ so sánh a > b thì khi a = b chương trình sẽ báo “Số lớn hơn là b” — chưa chính xác.", level: "van-dung-cao", activity: "van-dung" },
        { question: "Tình huống nào KHÔNG nên dùng AI? (Chọn các phương án đúng)", type: "multiple-select",
          options: ["Nhờ AI làm hộ toàn bộ chương trình Scratch bài thực hành để nộp", "Hỏi AI 7 và 12 số nào lớn hơn", "Gửi ảnh bảng điểm có tên các bạn cho AI để tính điểm trung bình", "Tự viết chương trình, chạy thử rồi nhờ AI giải thích một khối lệnh em chưa hiểu"],
          answer: [0, 1, 2], explanation: "Không nên dùng AI khi khiến em lười suy nghĩ, khi có cách khác đơn giản hơn, hoặc khi không an toàn (lộ thông tin cá nhân). Hỏi AI giải thích sau khi đã tự làm là cách dùng hợp lí.", level: "van-dung", activity: "van-dung" },
      ],
    },
    {
      id: "van-dung-nhom", name: "Vận dụng 1, 2: Sản phẩm của nhóm ✍️", type: "vandung",
      goal: "Vẽ sơ đồ khối và viết chương trình Scratch cho bài toán thực tế.",
      time: 240,
      task: "Chạy thử chương trình trung bình cộng ba số, rồi nhóm trả lời hai câu và gửi cho thầy/cô. Thực hành trên Scratch (có thể ở nhà).",
      intro: "Gửi câu trả lời cho thầy/cô rồi bấm để xem gợi ý.",
      links: SCRATCH_LINKS,
      scratch: SC_TBC3,
      cases: [
        { question: "Vận dụng 1: Vẽ sơ đồ khối mô tả thuật toán tìm số lớn hơn trong hai số a và b. Từ sơ đồ khối, nêu các khối lệnh Scratch em dùng.",
          answer: "Theo giáo án: Nhập a, b → kiểm tra a = b: đúng thì thông báo “Hai số bằng nhau”; sai thì kiểm tra a > b: đúng thông báo số lớn hơn là a, sai thông báo số lớn hơn là b. Scratch: khi nhấn vào 🏁; hỏi … và đợi, đặt a/b là (trả lời); hai khối nếu … thì … còn không thì … lồng nhau; nói (nối …).",
          answerHtml: `<div style="text-align:center"><img src="assets/sgk/ga-van-dung-1.png" alt="Sơ đồ khối tìm số lớn hơn (giáo án)" style="max-width:min(360px,100%);background:#fff;border-radius:10px"></div>` },
        { question: "Vận dụng 2: Viết chương trình Scratch thực hiện thuật toán tính trung bình cộng của ba số. Nêu đầu vào, đầu ra và các khối lệnh.",
          answer: "Đầu vào: ba số a, b, c. Đầu ra: giá trị trung bình cộng. Chương trình: khi nhấn vào 🏁 → hỏi và đặt a, b, c → đặt TBC là ((a + b + c) / 3) → nói (nối [Trung bình cộng ba số là] và (TBC)).",
          answerHtml: fc([["term", "Bắt đầu"], ["io", "Nhập ba số a, b, c"], ["proc", "TBC ← (a + b + c) / 3"], ["io", "Thông báo giá trị TBC"], ["term", "Kết thúc"]]) },
      ],
    },

    /* ===================== TỔNG KẾT ===================== */
    {
      id: "tong-ket", name: "Tổng kết", type: "summary",
      task: "Cả lớp nhắc lại kiến thức trọng tâm và làm thử thách cuối. Dặn dò: hoàn thành chương trình Vận dụng 1, 2 trên Scratch.",
      content: {
        learned: [
          "Máy tính không hiểu ngôn ngữ tự nhiên hay sơ đồ khối — cần ngôn ngữ lập trình (Scratch, Python, C, Java,…).",
          "Chương trình là tập hợp các lệnh viết bằng ngôn ngữ lập trình, mô tả thuật toán để máy tính “hiểu” và thực hiện được.",
          "Chương trình dựa trên dữ liệu đầu vào, tiến hành các bước xử lí để trả lại kết quả đầu ra.",
          "Viết chương trình → chạy thử → phát hiện lỗi → sửa lỗi → chạy lại.",
        ],
        challenge: [
          { question: "Minh viết chương trình tính tổng nhưng đặt khối “đặt tong là (a + b)” lên TRƯỚC các khối hỏi và nhập a, b. Khi chạy, chương trình sẽ:", type: "multiple-choice",
            options: ["Vẫn thông báo đúng tổng", "Tính tổng khi a, b chưa có giá trị nên thông báo sai kết quả", "Tự sắp xếp lại các khối", "Không chạy được khối nào"],
            answer: 1, explanation: "Máy tính thực hiện các lệnh theo đúng trình tự: phải nhập xong mới tính được. Cần sắp xếp lại rồi chạy thử.", level: "van-dung-cao", activity: "tong-ket" },
          { question: "Khối lệnh “hỏi [Nhập số a:] và đợi” thuộc phần nào của chương trình?", type: "multiple-choice",
            options: ["Nhập dữ liệu đầu vào", "Xử lí", "Thông báo đầu ra", "Kết thúc chương trình"],
            answer: 0, explanation: "Khối hỏi và đợi dùng để nhận dữ liệu đầu vào từ người dùng.", level: "nhan-biet", activity: "tong-ket" },
        ],
      },
    },
  ],
};

if (typeof module !== "undefined" && module.exports) module.exports = LESSON;
if (typeof window !== "undefined") window.LESSON = LESSON;
