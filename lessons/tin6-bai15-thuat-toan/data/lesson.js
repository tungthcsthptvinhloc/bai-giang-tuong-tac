/* ============================================================================
 * BÀI 15 — THUẬT TOÁN  (Tin học 6 — Kết nối tri thức)
 * Chủ đề 6: Giải quyết vấn đề với sự trợ giúp của máy tính.
 * Bám sát SGK trang 63–66 + Kế hoạch bài dạy của giáo viên. Thời lượng: 1 tiết.
 * Chỉ sửa file này để đổi nội dung. Engine app.js không cần sửa.
 * Có trò GHÉP SƠ ĐỒ KHỐI (ordering + flow) và MÁY CHẠY THỬ THUẬT TOÁN (runner) theo lựa chọn của GV.
 * ==========================================================================*/

// ---- Vẽ sơ đồ khối bằng các lớp CSS của engine (fc-node fc-term / fc-io / fc-proc) ----
const fc = (nodes) => `<div class="fc-chart">${nodes.map(([sh, t]) => `<span class="fc-node fc-${sh}">${t}</span>`).join('<span class="fc-arrow">↓</span>')}</div>`;
const QUY_UOC_HTML = `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:10px;align-items:center">
  ${[["term", "Bắt đầu", "Bắt đầu hoặc Kết thúc"], ["io", "Dữ liệu", "Đầu vào hoặc Đầu ra"], ["proc", "Làm việc…", "Bước xử lí"], ["cond", "?", "Bước kiểm tra điều kiện"]]
    .map(([sh, t, m]) => `<div style="display:flex;align-items:center;gap:10px;background:#fff;border:2px solid #bae6fd;border-radius:14px;padding:8px 12px"><span class="fc-node fc-${sh}" style="min-width:110px">${t}</span><b>${m}</b></div>`).join("")}
  <div style="display:flex;align-items:center;gap:10px;background:#fff;border:2px solid #bae6fd;border-radius:14px;padding:8px 12px"><span class="fc-arrow" style="min-width:110px;text-align:center;font-size:2rem">↓</span><b>Chỉ hướng thực hiện tiếp theo</b></div>
</div>`;
const HINH_6_2_HTML = fc([["term", "Bắt đầu"], ["io", "Tờ giấy hình vuông"], ["proc", "Gấp hai đường chéo của hình vuông để tạo nếp gấp, mở tờ giấy ra."], ["proc", "Gấp bốn góc của tờ giấy vào tâm."], ["proc", "Lật mặt bên kia."], ["proc", "Tiếp tục gấp bốn góc vào tâm."], ["proc", "Đặt tờ giấy đã gấp nằm ngang, luồn ngón cái và ngón trỏ của hai tay vào bốn góc ở mặt dưới."], ["proc", "Chỉnh sửa các nếp gấp."], ["io", "Hình trò chơi Đông-Tây-Nam-Bắc"], ["term", "Kết thúc"]]);

// ---- Sáu bước gấp hình (SGK Hình 6.1) ----
const BUOC_GAP = [
  "Gấp hai đường chéo của tờ giấy hình vuông để tạo nếp gấp, mở tờ giấy ra.",
  "Gấp bốn góc của tờ giấy vào tâm.",
  "Lật mặt bên kia.",
  "Tiếp tục gấp bốn góc vào tâm.",
  "Đặt tờ giấy đã gấp nằm ngang, luồn ngón cái và ngón trỏ của hai tay vào bốn góc ở mặt dưới.",
  "Chỉnh sửa các nếp gấp.",
];
const DAU_VAO_RA_HTML = `<div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:12px;font-size:1.1rem">
  <div style="background:#ccfbf1;border:3px solid #14b8a6;border-radius:16px;padding:10px 16px;text-align:center"><div style="font-size:2rem">🟦</div><b>Đầu vào (Input)</b><br>Tờ giấy hình vuông</div>
  <div style="font-size:2rem">➡️</div>
  <div style="background:#fef9c3;border:3px solid #eab308;border-radius:16px;padding:10px 16px;text-align:center"><div style="font-size:2rem">📋</div><b>Thuật toán</b><br>6 bước chỉ dẫn rõ ràng, đúng trình tự</div>
  <div style="font-size:2rem">➡️</div>
  <div style="background:#fce7f3;border:3px solid #ec4899;border-radius:16px;padding:10px 16px;text-align:center"><div style="font-size:2rem">🌸</div><b>Đầu ra (Output)</b><br>Hình trò chơi Đông-Tây-Nam-Bắc</div>
</div>`;
const AI_HTML = `<div style="display:flex;flex-wrap:wrap;gap:12px;justify-content:center">
  <div style="flex:1 1 300px;max-width:470px;background:#f5f3ff;border:2px solid #c4b5fd;border-radius:16px;padding:12px 16px;text-align:left">
    <b style="color:#6d28d9">🤖 “Dạy” cho AI cần hai thành phần chính</b>
    <ul style="margin:6px 0 0 18px;padding:0"><li><b>Dữ liệu</b>: rất nhiều ví dụ để AI học (ảnh, chữ, âm thanh…).</li><li><b>Thuật toán</b>: các bước chỉ dẫn để máy tính học từ dữ liệu và đưa ra kết quả.</li></ul></div>
  <div style="flex:1 1 300px;max-width:470px;background:#fef2f2;border:2px solid #fca5a5;border-radius:16px;padding:12px 16px;text-align:left">
    <b style="color:#b91c1c">💬 Câu lệnh gợi ý (giáo án)</b>
    <ul style="margin:6px 0 0 18px;padding:0"><li>“Hãy kiểm tra giúp em thuật toán sau đã đầy đủ và đúng trình tự chưa: …”</li><li>“Hãy tạo sơ đồ khối cho thuật toán tính điểm trung bình ba môn học.”</li></ul>
    <div style="margin-top:6px">Tự làm trước, dùng AI để kiểm tra; luôn đối chiếu với SGK.</div></div></div>`;

// ---- Máy chạy thử: tổng hai số (Hình 6.3), trung bình cộng hai số (Hình 6.4), điểm trung bình ba môn ----
const RUN_TONG = { title: "Máy chạy thử — sơ đồ khối Hình 6.3", intro: "Nhập a, b rồi bấm ▶ Chạy từng bước: khối đang chạy sáng lên, xem máy nhận đầu vào, xử lí và đưa ra đầu ra.",
  inputs: [{ name: "a", value: 5 }, { name: "b", value: 7 }],
  steps: [{ shape: "term", text: "Bắt đầu" }, { shape: "io", text: "Giá trị a, giá trị b", input: true }, { shape: "proc", text: "Tổng ← a + b", set: "Tổng", expr: "a + b" }, { shape: "io", text: "Giá trị tổng", output: "Tổng" }, { shape: "term", text: "Kết thúc" }] };
const RUN_TBC = { title: "Máy chạy thử — trung bình cộng của hai số a và b", intro: "Thử với a = 8, b = 6 rồi đổi sang các số khác. Để ý khối nào tạo ra giá trị Tổng, khối nào tạo ra Trung bình cộng.",
  inputs: [{ name: "a", value: 8 }, { name: "b", value: 6 }],
  steps: [{ shape: "term", text: "Bắt đầu" }, { shape: "io", text: "Giá trị a, giá trị b", input: true }, { shape: "proc", text: "Tổng ← a + b", set: "Tổng", expr: "a + b" }, { shape: "proc", text: "Trung bình cộng ← Tổng : 2", set: "Trung bình cộng", expr: "Tổng : 2" }, { shape: "io", text: "Giá trị trung bình cộng của a và b", output: "Trung bình cộng" }, { shape: "term", text: "Kết thúc" }] };
const RUN_DTB = { title: "Máy chạy thử — điểm trung bình ba môn", intro: "Nhập điểm ba môn của một bạn (tên giả định) rồi chạy thử thuật toán nhóm em vừa ghép.",
  inputs: [{ name: "a", label: "a (Toán)", value: 8 }, { name: "b", label: "b (Ngữ văn)", value: 7 }, { name: "c", label: "c (Ngoại ngữ)", value: 9 }],
  steps: [{ shape: "term", text: "Bắt đầu" }, { shape: "io", text: "Nhập giá trị a, giá trị b, giá trị c", input: true }, { shape: "proc", text: "Tổng ← a + b + c", set: "Tổng", expr: "a + b + c" }, { shape: "proc", text: "Trung bình cộng ← Tổng : 3", set: "Trung bình cộng", expr: "Tổng : 3" }, { shape: "io", text: "Thông báo giá trị Trung bình cộng", output: "Trung bình cộng" }, { shape: "term", text: "Kết thúc" }] };

const LESSON = {
  meta: {
    subject: "Tin học", grade: "6", book: "Kết nối tri thức với cuộc sống",
    title: "Bài 15: Thuật toán", unit: "Chủ đề 6 — Giải quyết vấn đề với sự trợ giúp của máy tính",
    pages: "63–66", durationMinutes: 45,
  },
  objectives: {
    knowledge: [
      "Diễn tả được sơ lược khái niệm thuật toán, nêu được một vài ví dụ minh hoạ.",
      "Biết thuật toán có thể được mô tả dưới dạng liệt kê hoặc sơ đồ khối.",
    ],
    competencies: [
      "Tự chủ, tự học; giải quyết vấn đề và sáng tạo; giao tiếp, hợp tác (thảo luận nhóm, trình bày).",
      "Năng lực số 3.4.TC1a: liệt kê đúng, đủ các bước chỉ dẫn; trình bày bằng sơ đồ khối (Bắt đầu/Kết thúc, Xử lí, Đầu vào/Đầu ra, mũi tên); xác định đầu vào, đầu ra; chuyển đổi liệt kê ↔ sơ đồ khối.",
      "Năng lực AI 6.C1.1: giải thích được hai thành phần chính để “dạy” cho AI là Dữ liệu và Thuật toán.",
    ],
    qualities: ["Chăm chỉ, trung thực (ghi chép đúng quá trình), trách nhiệm, nhân ái (hỗ trợ bạn)."],
  },
  coreKnowledge: [
    "Thuật toán là một dãy các chỉ dẫn rõ ràng, có trình tự sao cho khi thực hiện những chỉ dẫn này người ta giải quyết được vấn đề hoặc nhiệm vụ đã cho.",
    "Đầu vào (Input) là dữ liệu ban đầu; đầu ra (Output) là kết quả nhận được sau khi thực hiện các bước của thuật toán.",
    "Trình tự các bước rất quan trọng: bỏ qua một bước hoặc đổi thứ tự thì sẽ không nhận được kết quả đúng.",
    "Mô tả thuật toán: liệt kê các bước bằng ngôn ngữ tự nhiên hoặc dùng sơ đồ khối.",
    "Sơ đồ khối gồm các hình mô tả các bước và đường có mũi tên chỉ hướng thực hiện: oval — Bắt đầu/Kết thúc; hình bình hành — Đầu vào/Đầu ra; hình chữ nhật — Bước xử lí.",
  ],
  keywords: ["Thuật toán", "Đầu vào", "Đầu ra", "Liệt kê", "Sơ đồ khối"],
  settings: { basePoints: 100, useTimer: false, defaultTime: 60, sound: true, streakEnabled: true },

  activities: [
    /* ===================== HĐ1: KHỞI ĐỘNG ===================== */
    {
      id: "khoi-dong", name: "Khởi động — Gấp hình Đông-Tây-Nam-Bắc 🌸", type: "knowledge",
      goal: "Nhận ra mỗi công việc đều cần thực hiện theo các bước có trình tự.",
      time: 180,
      task: "Mỗi nhóm lấy một tờ giấy hình vuông, gấp hình trò chơi Đông-Tây-Nam-Bắc theo hướng dẫn (Hình 6.1). Nhóm nào gấp xong trước, giơ tay!",
      sgkImage: "assets/sgk/hinh-6-1.jpg",
      content: {
        heading: "🌸 Gấp hình trò chơi Đông-Tây-Nam-Bắc",
        html: `<div style="display:flex;justify-content:center"><img src="assets/sgk/hinh-6-1.jpg" alt="Hình 6.1. Minh hoạ cách gấp hình trò chơi Đông-Tây-Nam-Bắc" style="max-width:min(760px,100%);border-radius:14px"></div>`,
      },
      remember: ["Muốn gấp được hình trò chơi, phải làm lần lượt từng bước theo đúng hướng dẫn."],
    },
    {
      id: "sap-xep-gap", name: "Trò chơi: Xếp lại các bước gấp hình 🔢", type: "ordering",
      goal: "Nhớ lại trình tự 6 bước gấp hình.",
      time: 120,
      task: "Các bước gấp hình bị xáo trộn! Sắp xếp lại cho đúng thứ tự rồi bấm Nộp bài.",
      steps: BUOC_GAP,
      explanation: "Gấp hai đường chéo → gấp bốn góc vào tâm → lật mặt → tiếp tục gấp bốn góc vào tâm → luồn ngón tay vào bốn góc → chỉnh sửa nếp gấp.",
    },

    /* ===================== HĐ2.1: THUẬT TOÁN ===================== */
    {
      id: "khai-niem", name: "Hoạt động 1: Khái niệm thuật toán 💡", type: "knowledge",
      goal: "Nêu được khái niệm thuật toán, đầu vào, đầu ra.",
      time: 360,
      task: "Hoạt động 1 (SGK tr.63): nhóm thảo luận — đảo thứ tự bước ❸ và bước ❹ thì có gấp được hình không? Trước khi gấp cần có gì, gấp xong nhận được gì? Vậy thuật toán là gì?",
      sgkImage: "assets/sgk/hoat-dong-1.jpg",
      content: {
        heading: "💡 Thuật toán là gì?",
        html: DAU_VAO_RA_HTML,
        revealLabel: "📌 Khái niệm thuật toán (SGK tr.64)",
        blocks: [
          { kind: "html", value: `<div style="background:#f97316;color:#fff;border-radius:16px;padding:12px 18px;font-size:1.2rem;text-align:left"><b>Thuật toán</b> là một dãy các chỉ dẫn rõ ràng, có trình tự sao cho khi thực hiện những chỉ dẫn này người ta giải quyết được vấn đề hoặc nhiệm vụ đã cho.</div>` },
          { kind: "list", value: [
            "Tờ giấy hình vuông là đầu vào (Input); hình gấp trò chơi Đông-Tây-Nam-Bắc là đầu ra (Output).",
            "Chỉ dẫn ở mỗi bước cần cụ thể, rõ ràng. Trình tự các bước rất quan trọng — làm không đúng trình tự sẽ không nhận được kết quả đúng.",
            "Thuật toán có ở khắp nơi: quy trình chế biến món ăn, cách giải một bài toán, quy trình gấp một chiếc áo,…",
          ] },
        ],
      },
      questions: [
        { question: "Câu 1. Nếu đảo thứ tự của bước ❸ và bước ❹, em có gấp được hình trò chơi Đông-Tây-Nam-Bắc không?", type: "multiple-choice",
          options: ["Có, thứ tự các bước không quan trọng", "Không, vì thay đổi thứ tự các bước thì kết quả sẽ khác", "Có, nếu gấp thật nhanh", "Không, vì thiếu tờ giấy"],
          answer: 1, explanation: "Chỉ khi thực hiện đúng trình tự các bước mới nhận được hình gấp trò chơi. Bỏ qua một bước hoặc đổi thứ tự thì kết quả sẽ khác.", level: "thong-hieu", activity: "khai-niem" },
        { question: "Câu 2. Trước khi gấp em cần có gì, và gấp xong 6 bước em nhận được gì?", type: "multiple-choice",
          options: ["Cần kéo, hồ dán; nhận được tờ giấy vuông", "Cần hình trò chơi; nhận được tờ giấy hình vuông", "Cần tờ giấy hình vuông; nhận được hình trò chơi Đông-Tây-Nam-Bắc", "Cần bút màu; nhận được bức tranh"],
          answer: 2, explanation: "Tờ giấy hình vuông là đầu vào; hình trò chơi Đông-Tây-Nam-Bắc là đầu ra.", level: "nhan-biet", activity: "khai-niem" },
        { question: "Thuật toán là gì? (Câu hỏi 1, SGK tr.64)", type: "multiple-choice",
          options: ["Một dãy các cách giải quyết một nhiệm vụ.", "Một dãy các kết quả nhận được khi giải quyết một nhiệm vụ.", "Một dãy các chỉ dẫn rõ ràng, có trình tự sao cho khi thực hiện những chỉ dẫn này người ta giải quyết được vấn đề hoặc nhiệm vụ đã cho.", "Một dãy các dữ liệu đầu vào để giải quyết một nhiệm vụ."],
          answer: 2, explanation: "Đáp án C — đúng khái niệm thuật toán trong SGK.", level: "nhan-biet", activity: "khai-niem" },
        { question: "Em hãy chọn các câu đúng. (Câu hỏi 2, SGK tr.64)", type: "multiple-select",
          options: ["Thuật toán có đầu ra là kết quả nhận được sau khi thực hiện các bước của thuật toán.", "Thuật toán có đầu vào là các dữ liệu ban đầu.", "Thuật toán có đầu vào là kết quả nhận được sau khi thực hiện các bước của thuật toán.", "Thuật toán có đầu ra là các dữ liệu ban đầu."],
          answer: [0, 1], explanation: "A, B đúng: đầu vào là dữ liệu ban đầu; đầu ra là kết quả nhận được.", level: "thong-hieu", activity: "khai-niem" },
      ],
      remember: ["Thuật toán: dãy chỉ dẫn rõ ràng, có trình tự để giải quyết một nhiệm vụ. Đầu vào: dữ liệu ban đầu. Đầu ra: kết quả nhận được."],
    },
    {
      id: "dau-vao-dau-ra", name: "Trò chơi: Đầu vào hay đầu ra? 🎯", type: "dragdrop",
      goal: "Phân biệt đầu vào và đầu ra của thuật toán.",
      time: 150,
      task: "Xếp mỗi thẻ vào nhóm Đầu vào hoặc Đầu ra của thuật toán tương ứng. Xếp hết rồi bấm Nộp bài.",
      groups: ["📥 Đầu vào (Input)", "📤 Đầu ra (Output)"],
      items: [
        { text: "🌸 Gấp hình: tờ giấy hình vuông", group: 0 },
        { text: "🌸 Gấp hình: hình trò chơi Đông-Tây-Nam-Bắc", group: 1 },
        { text: "➕ Tính trung bình cộng: hai số a, b", group: 0 },
        { text: "➕ Tính trung bình cộng: giá trị trung bình cộng của a và b", group: 1 },
        { text: "🥭 Làm kem: xoài, sữa chua, mật ong", group: 0 },
        { text: "🥭 Làm kem: kem sữa chua xoài", group: 1 },
      ],
      explanation: "Đầu vào là những thứ có trước khi thực hiện thuật toán; đầu ra là kết quả nhận được sau khi thực hiện xong các bước.",
    },

    /* ===================== HĐ2.2: MÔ TẢ THUẬT TOÁN ===================== */
    {
      id: "mo-ta", name: "Hoạt động 2: Mô tả thuật toán 🧭", type: "knowledge",
      goal: "Biết hai cách mô tả thuật toán; nhận biết các hình trong sơ đồ khối.",
      time: 300,
      task: "Hoạt động 2 (SGK tr.64): ngoài cách trình bày thuật toán bằng ngôn ngữ tự nhiên, em còn biết cách nào khác? Cách đó có hiệu quả không? Vì sao? Quan sát sơ đồ khối Hình 6.2.",
      sgkImage: "assets/sgk/hinh-6-2.jpg",
      content: {
        heading: "🧭 Liệt kê các bước và sơ đồ khối",
        prompt: "Hướng dẫn gấp hình ở phần khởi động là mô tả thuật toán ở dạng liệt kê bằng ngôn ngữ tự nhiên. Người ta còn mô tả thuật toán bằng sơ đồ khối.",
        revealLabel: "🧩 Quy ước & sơ đồ khối Hình 6.2",
        blocks: [
          { kind: "html", value: QUY_UOC_HTML },
          { kind: "html", value: HINH_6_2_HTML },
          { kind: "html", value: `<div style="background:#f97316;color:#fff;border-radius:16px;padding:12px 18px;font-size:1.1rem;text-align:left"><b>MÔ TẢ THUẬT TOÁN</b><br>• Liệt kê các bước bằng ngôn ngữ tự nhiên và sử dụng sơ đồ khối là những cách mô tả thuật toán.<br>• Sơ đồ khối của thuật toán là một sơ đồ gồm các hình mô tả các bước và đường có mũi tên để chỉ hướng thực hiện.</div>` },
        ],
      },
      questions: [
        { question: "Có những cách nào để mô tả thuật toán? (Chọn các phương án đúng)", type: "multiple-select",
          options: ["Liệt kê các bước bằng ngôn ngữ tự nhiên", "Vẽ tranh tuỳ ý", "Sử dụng sơ đồ khối", "Hát một bài hát"],
          answer: [0, 2], explanation: "Hai cách mô tả thuật toán trong bài: liệt kê các bước bằng ngôn ngữ tự nhiên và sơ đồ khối.", level: "nhan-biet", activity: "mo-ta" },
        { question: "Câu nào sau đây SAI khi nói về vai trò của mũi tên trong sơ đồ khối của thuật toán? (Câu hỏi 1, SGK tr.65)", type: "multiple-choice",
          options: ["Hướng mũi tên cho thấy hướng đi trong sơ đồ khối.", "Mũi tên được sử dụng để chỉ hướng thực hiện tiếp theo.", "Mũi tên được sử dụng chỉ để kết nối các hình khối trong sơ đồ khối."],
          answer: 2, explanation: "C sai: mũi tên không “chỉ để kết nối” mà còn chỉ hướng thực hiện tiếp theo.", level: "thong-hieu", activity: "mo-ta" },
        { question: "Trong Hình 6.2, “Tờ giấy hình vuông” và “Hình trò chơi Đông-Tây-Nam-Bắc” được vẽ bằng hình bình hành. Vì sao?", type: "multiple-choice", sgkImage: "assets/sgk/hinh-6-2.jpg",
          options: ["Vì đó là bước xử lí", "Vì đó là đầu vào và đầu ra của thuật toán", "Vì đó là bước bắt đầu và kết thúc", "Vì hình bình hành đẹp hơn"],
          answer: 1, explanation: "Hình bình hành: Đầu vào hoặc Đầu ra. Tờ giấy là đầu vào, hình trò chơi là đầu ra.", level: "thong-hieu", activity: "mo-ta" },
      ],
      remember: ["Mô tả thuật toán: liệt kê các bước hoặc sơ đồ khối. Oval: Bắt đầu/Kết thúc · Hình bình hành: Đầu vào/Đầu ra · Hình chữ nhật: Bước xử lí · Mũi tên: hướng thực hiện."],
    },
    {
      id: "ghep-hinh", name: "Ghép hình khối với ý nghĩa 🧩", type: "matching",
      goal: "Nhớ ý nghĩa các hình trong sơ đồ khối (Câu hỏi 2, SGK tr.65).",
      time: 120,
      task: "Ghép mỗi hình với ý nghĩa phù hợp khi nói về sơ đồ khối của thuật toán. Làm hết rồi bấm Nộp bài.",
      html: `<div style="display:flex;flex-wrap:wrap;gap:16px;justify-content:center;align-items:center"><span class="fc-node fc-term" style="min-width:120px">1) oval</span><span class="fc-node fc-io" style="min-width:120px">2) bình hành</span><span class="fc-node fc-proc" style="min-width:120px">3) chữ nhật</span><span class="fc-arrow" style="font-size:2rem">4) ↓</span></div>`,
      pairs: [
        { left: "1) Hình oval (màu hồng)", right: "a) Bắt đầu hoặc Kết thúc" },
        { left: "2) Hình bình hành (màu xanh)", right: "c) Đầu vào hoặc Đầu ra" },
        { left: "3) Hình chữ nhật (màu vàng)", right: "d) Bước xử lí" },
        { left: "4) Mũi tên ↓", right: "b) Chỉ hướng thực hiện tiếp theo" },
      ],
      explanation: "1 – a · 2 – c · 3 – d · 4 – b.",
    },

    /* ===================== HĐ3: LUYỆN TẬP ===================== */
    {
      id: "luyen-tap-1", name: "Luyện tập 1: Tìm đầu vào, đầu ra 🔍", type: "knowledge",
      goal: "Xác định đầu vào, đầu ra của thuật toán.",
      time: 150,
      task: "Luyện tập 1 (SGK tr.66): tìm đầu vào, đầu ra của a) thuật toán tính trung bình cộng của hai số a, b; b) thuật toán tìm ước chung lớn nhất của hai số tự nhiên a và b.",
      sgkImage: "assets/sgk/sgk-trang66.jpg",
      questions: [
        { question: "a) Thuật toán tính trung bình cộng của hai số a, b có:", type: "multiple-choice",
          options: ["Đầu vào: trung bình cộng · Đầu ra: hai số a, b", "Đầu vào: hai số a, b · Đầu ra: trung bình cộng của a và b", "Đầu vào: tổng a + b · Đầu ra: hai số a, b", "Đầu vào: số 2 · Đầu ra: tổng"],
          answer: 1, explanation: "Đầu vào: hai số a, b. Đầu ra: giá trị trung bình cộng của a và b.", level: "thong-hieu", activity: "luyen-tap-1" },
        { question: "b) Thuật toán tìm ước chung lớn nhất của hai số tự nhiên a và b có đầu ra là:", type: "multiple-choice",
          options: ["Ước chung lớn nhất của a và b", "Hai số tự nhiên a và b", "Tất cả các ước của a", "Tổng của a và b"],
          answer: 0, explanation: "Đầu vào: hai số tự nhiên a, b. Đầu ra: ước chung lớn nhất của a và b.", level: "thong-hieu", activity: "luyen-tap-1" },
      ],
    },
    {
      id: "luyen-tap-2", name: "Luyện tập 2: Sơ đồ khối Hình 6.3 ⚙️", type: "knowledge",
      goal: "Đọc sơ đồ khối, xác định thuật toán, đầu vào, đầu ra; mô tả lại dạng liệt kê.",
      time: 240,
      task: "Luyện tập 2 (SGK tr.66): quan sát sơ đồ khối Hình 6.3 — sơ đồ mô tả thuật toán gì? Đầu vào, đầu ra là gì? Mô tả lại dưới dạng liệt kê. Chạy thử trên máy để kiểm tra.",
      sgkImage: "assets/sgk/hinh-6-3.jpg",
      runner: RUN_TONG,
      questions: [
        { question: "Sơ đồ khối Hình 6.3 mô tả thuật toán gì?", type: "multiple-choice",
          options: ["Tính trung bình cộng hai số", "Tính tổng hai số a và b", "Tìm số lớn hơn", "Tính hiệu hai số"],
          answer: 1, explanation: "Bước xử lí Tổng ← a + b, đầu ra là giá trị tổng → thuật toán tính tổng hai số a và b.", level: "thong-hieu", activity: "luyen-tap-2" },
        { question: "Đầu vào và đầu ra của thuật toán Hình 6.3 là:", type: "multiple-choice",
          options: ["Đầu vào: giá trị tổng · Đầu ra: a, b", "Đầu vào: Bắt đầu · Đầu ra: Kết thúc", "Đầu vào: giá trị a, giá trị b · Đầu ra: giá trị tổng", "Đầu vào: a + b · Đầu ra: a"],
          answer: 2, explanation: "Hai hình bình hành: “Giá trị a, giá trị b” (đầu vào) và “Giá trị tổng” (đầu ra).", level: "nhan-biet", activity: "luyen-tap-2" },
        { question: "Mô tả lại thuật toán Hình 6.3 dưới dạng liệt kê, cách nào đúng?", type: "multiple-choice",
          options: ["1. Tính Tổng ← a + b. 2. Nhập a, b. 3. Thông báo giá trị tổng.", "1. Thông báo giá trị tổng. 2. Nhập a, b. 3. Tính tổng.", "1. Nhập a. 2. Thông báo a.", "1. Nhập giá trị a, giá trị b. 2. Tổng ← a + b. 3. Thông báo giá trị tổng."],
          answer: 3, explanation: "Nhập đầu vào → xử lí → đưa ra đầu ra, đúng trình tự mũi tên trong sơ đồ.", level: "van-dung", activity: "luyen-tap-2" },
      ],
    },
    {
      id: "luyen-tap-3", name: "Luyện tập 3: Ghép sơ đồ khối trung bình cộng 🧱", type: "ordering",
      goal: "Sắp xếp các hình trong Hình 6.4 thành sơ đồ khối tính trung bình cộng của hai số.",
      time: 150,
      task: "Luyện tập 3 (SGK tr.66): ghép các hình được đánh số trong Hình 6.4 thành sơ đồ khối của thuật toán tính trung bình cộng của hai số a và b. Ghép xong bấm Nộp bài.",
      sgkImage: "assets/sgk/hinh-6-4.jpg",
      steps: ["❶ Bắt đầu", "❸ Giá trị a, giá trị b", "❷ Tổng ← a + b", "❹ Trung bình cộng ← Tổng : 2", "❻ Giá trị trung bình cộng của a và b", "❺ Kết thúc"],
      flow: ["term", "io", "proc", "proc", "io", "term"],
      explanation: "Thứ tự đúng: 1 → 3 → 2 → 4 → 6 → 5. Phải tính Tổng, rồi tính Trung bình cộng xong mới đưa ra được giá trị trung bình cộng.",
    },
    {
      id: "chay-thu-tbc", name: "Chạy thử thuật toán trung bình cộng ▶️", type: "knowledge",
      goal: "Thấy rõ đầu vào → các bước xử lí → đầu ra; hiểu vì sao trình tự quan trọng.",
      time: 150,
      task: "Chạy thử sơ đồ khối vừa ghép với a = 8, b = 6, sau đó đổi đầu vào khác. Trả lời câu hỏi.",
      runner: RUN_TBC,
      questions: [
        { question: "Với đầu vào a = 8, b = 6, đầu ra của thuật toán là bao nhiêu?", type: "multiple-choice",
          options: ["14", "8", "7", "6"],
          answer: 2, explanation: "Tổng ← 8 + 6 = 14; Trung bình cộng ← 14 : 2 = 7.", level: "van-dung", activity: "chay-thu-tbc" },
        { question: "Nếu đặt khối ❻ “Giá trị trung bình cộng của a và b” lên TRƯỚC khối ❹ “Trung bình cộng ← Tổng : 2” thì sao?", type: "multiple-choice",
          options: ["Kết quả vẫn đúng như cũ", "Máy đưa ra kết quả khi chưa tính trung bình cộng → không nhận được kết quả đúng", "Máy tự sửa lại thứ tự", "Thuật toán chạy nhanh gấp đôi"],
          answer: 1, explanation: "Trình tự các bước rất quan trọng: phải tính xong mới đưa ra được kết quả.", level: "van-dung-cao", activity: "chay-thu-tbc" },
      ],
      remember: ["Đầu vào → các bước xử lí theo đúng trình tự → đầu ra. Đổi thứ tự các bước có thể làm sai kết quả."],
    },

    /* ===================== HĐ4: VẬN DỤNG ===================== */
    {
      id: "van-dung", name: "Vận dụng 1: Thuật toán làm kem sữa chua xoài 🥭", type: "knowledge",
      goal: "Xác định đầu vào, đầu ra của thuật toán trong thực tế; biết hai thành phần “dạy” cho AI.",
      time: 150,
      task: "Vận dụng 1a (SGK tr.66): phần hướng dẫn làm kem sữa chua xoài gồm 7 bước là một thuật toán (Hình 6.5). Xác định đầu vào và đầu ra của thuật toán.",
      sgkImage: "assets/sgk/hinh-6-5.jpg",
      content: {
        heading: "🥭 Công thức làm kem cũng là một thuật toán!",
        html: `<div style="display:flex;justify-content:center"><img src="assets/sgk/hinh-6-5.jpg" alt="Hình 6.5. Công thức làm kem sữa chua xoài" style="max-width:min(380px,100%);border-radius:14px"></div>`,
        revealLabel: "🤖 Mở rộng: thuật toán và AI",
        blocks: [{ kind: "html", value: AI_HTML }],
      },
      questions: [
        { question: "Đầu vào của thuật toán làm kem sữa chua xoài là:", type: "multiple-choice",
          options: ["Kem sữa chua xoài", "Xoài, sữa chua, mật ong (250 g xoài, 100 g sữa chua, 1 thìa cà phê mật ong)", "Ngăn đá tủ lạnh", "7 bước hướng dẫn"],
          answer: 1, explanation: "Đầu vào: xoài, sữa chua, mật ong. Đầu ra: kem sữa chua xoài.", level: "thong-hieu", activity: "van-dung" },
        { question: "Đầu ra của thuật toán làm kem sữa chua xoài là:", type: "multiple-choice",
          options: ["Kem sữa chua xoài", "Xoài", "Hỗn hợp trong tô", "Khuôn làm kem"],
          answer: 0, explanation: "Kết quả nhận được sau khi thực hiện 7 bước là món kem sữa chua xoài.", level: "nhan-biet", activity: "van-dung" },
        { question: "Để “dạy” cho AI, cần hai thành phần chính nào?", type: "multiple-choice",
          options: ["Màn hình và bàn phím", "Dữ liệu và thuật toán", "Internet và loa", "Mật khẩu và tài khoản"],
          answer: 1, explanation: "AI học từ dữ liệu theo các bước chỉ dẫn của thuật toán — dữ liệu và thuật toán là hai thành phần chính.", level: "thong-hieu", activity: "van-dung" },
      ],
    },
    {
      id: "van-dung-kem", name: "Vận dụng 1b: Ghép sơ đồ khối làm kem 🍨", type: "ordering",
      goal: "Thể hiện thuật toán làm kem sữa chua xoài bằng sơ đồ khối.",
      time: 150,
      task: "Vận dụng 1b (SGK tr.66): ghép các hình khối thành sơ đồ khối của thuật toán làm kem sữa chua xoài. Ghép xong bấm Nộp bài.",
      sgkImage: "assets/sgk/hinh-6-5.jpg",
      steps: [
        "Bắt đầu",
        "Lấy 250 g xoài, 100 g sữa chua, 1 thìa cà phê mật ong",
        "Cho xoài vào tô",
        "Nghiền nát xoài",
        "Cho sữa chua và mật ong vào tô",
        "Trộn đều hỗn hợp",
        "Cho hỗn hợp vào khuôn làm kem",
        "Đặt khuôn làm kem vào ngăn đá tủ lạnh trong thời gian ít nhất 4 tiếng",
        "Kem sữa chua xoài",
        "Kết thúc",
      ],
      flow: ["term", "io", "proc", "proc", "proc", "proc", "proc", "proc", "io", "term"],
      explanation: "Bắt đầu → đầu vào (nguyên liệu) → 6 bước xử lí theo đúng thứ tự công thức → đầu ra (kem sữa chua xoài) → Kết thúc.",
    },
    {
      id: "van-dung-dtb", name: "Vận dụng 2: Sơ đồ khối điểm trung bình ba môn 📊", type: "ordering",
      goal: "Mô tả thuật toán tính điểm trung bình ba môn bằng sơ đồ khối.",
      time: 120,
      task: "Vận dụng 2 (SGK tr.66): ghép sơ đồ khối của thuật toán tính điểm trung bình ba môn Toán (a), Ngữ văn (b), Ngoại ngữ (c). Ghép xong bấm Nộp bài.",
      steps: ["Bắt đầu", "Nhập giá trị a, giá trị b, giá trị c", "Tổng ← a + b + c", "Trung bình cộng ← Tổng : 3", "Thông báo giá trị Trung bình cộng", "Kết thúc"],
      flow: ["term", "io", "proc", "proc", "io", "term"],
      explanation: "Nhập ba điểm → tính tổng → chia 3 → thông báo điểm trung bình.",
    },
    {
      id: "van-dung-nhom", name: "Vận dụng 2, 3: Liệt kê & thuật toán trong đời sống ✍️", type: "vandung",
      goal: "Mô tả thuật toán dạng liệt kê; nêu ví dụ thuật toán giải quyết nhiệm vụ thực tế.",
      time: 120,
      task: "Chạy thử thuật toán điểm trung bình, rồi nhóm trả lời 2 câu và gửi cho thầy/cô (có thể hoàn thành ở nhà).",
      intro: "Gửi câu trả lời cho thầy/cô rồi bấm để xem gợi ý.",
      runner: RUN_DTB,
      cases: [
        { question: "Vận dụng 2: Mô tả thuật toán tính điểm trung bình ba môn Toán, Ngữ văn, Ngoại ngữ theo cách liệt kê các bước.",
          answer: "1. Nhập giá trị a, giá trị b, giá trị c. 2. Tổng ← a + b + c. 3. Trung bình cộng ← Tổng : 3. 4. Thông báo giá trị Trung bình cộng." },
        { question: "Vận dụng 3: Nêu một ví dụ về thuật toán giải quyết một nhiệm vụ trong thực tế. Xác định đầu vào, đầu ra và các bước thực hiện.",
          answer: "Ví dụ luộc rau muống — Đầu vào: rau muống, nước. Đầu ra: món rau muống luộc. Các bước: 1. Lấy 2 lít nước vào xoong. 2. Đun sôi nước. 3. Cho rau đã rửa sạch vào nước sôi. 4. Chờ rau sôi khoảng 3 phút thì tắt bếp. 5. Bày rau ra đĩa." },
      ],
    },

    /* ===================== TỔNG KẾT ===================== */
    {
      id: "tong-ket", name: "Tổng kết", type: "summary",
      task: "Cả lớp nhắc lại kiến thức trọng tâm và làm thử thách cuối. Dặn dò: hoàn thành Vận dụng 2, 3; tìm một thuật toán quanh em.",
      content: {
        learned: [
          "Thuật toán là một dãy các chỉ dẫn rõ ràng, có trình tự để giải quyết một vấn đề, nhiệm vụ.",
          "Đầu vào: dữ liệu ban đầu. Đầu ra: kết quả nhận được sau khi thực hiện các bước.",
          "Mô tả thuật toán: liệt kê các bước bằng ngôn ngữ tự nhiên hoặc sơ đồ khối.",
          "Sơ đồ khối: oval (Bắt đầu/Kết thúc), hình bình hành (Đầu vào/Đầu ra), hình chữ nhật (Bước xử lí), mũi tên (hướng thực hiện).",
        ],
        challenge: [
          { question: "Bạn Minh viết hướng dẫn pha nước chanh: “1. Rót nước vào cốc. 2. Cho vài thứ vào. 3. Khuấy.” Hướng dẫn này chưa phải thuật toán tốt vì:", type: "multiple-choice",
            options: ["Có quá ít bước", "Bước 2 không rõ ràng — không biết cho gì, bao nhiêu", "Không vẽ bằng sơ đồ khối", "Không có mũi tên"],
            answer: 1, explanation: "Chỉ dẫn ở mỗi bước cần cụ thể, rõ ràng (ví dụ: vắt nửa quả chanh, cho 2 thìa đường).", level: "van-dung-cao", activity: "tong-ket" },
          { question: "Trong sơ đồ khối, bước “Tổng ← a + b” được vẽ bằng hình nào?", type: "multiple-choice",
            options: ["Hình oval", "Hình bình hành", "Hình chữ nhật", "Mũi tên"],
            answer: 2, explanation: "Tổng ← a + b là bước xử lí → hình chữ nhật.", level: "nhan-biet", activity: "tong-ket" },
        ],
      },
    },
  ],
};

if (typeof module !== "undefined" && module.exports) module.exports = LESSON;
if (typeof window !== "undefined") window.LESSON = LESSON;
