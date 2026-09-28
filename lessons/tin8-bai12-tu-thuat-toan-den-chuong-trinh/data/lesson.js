/* ============================================================================
 * BÀI 12 — TỪ THUẬT TOÁN ĐẾN CHƯƠNG TRÌNH  (Tin học 8 — Kết nối tri thức với cuộc sống)
 * Chủ đề 5: Giải quyết vấn đề với sự trợ giúp của máy tính.
 * Bám sát SGK trang 73–75 + Kế hoạch bài dạy của giáo viên.
 * Chỉ sửa file này để đổi nội dung. Engine app.js không cần sửa.
 * GV chọn: dạy 2 tiết (giáo án ghi 2 tiết nhưng các hoạt động cộng lại 45 phút → giãn phần thực hành);
 * mô phỏng `turtle` (bọ rùa vẽ hình + sơ đồ khối sáng theo; xe buýt và hòn đá); ghép sơ đồ khối ↔ lệnh, thám tử sửa lỗi,
 * quy luật số cạnh – góc xoay, sắp xếp lệnh Hình 12.4.
 * ==========================================================================*/

// ---------- Khối lệnh Scratch vẽ tĩnh (dùng lớp CSS của engine) ----------
const N = (v) => `<span class="sb-in sb-num">${v}</span>`;
const B = (cat, html, hat) => `<div class="sb sb-${cat}${hat ? " sb-hat" : ""}">${html}</div>`;
const LOOP = (label, inner) => `<div class="sb sb-c sb-control"><div class="sb-row">${label}</div><div class="sb-inner">${inner.join("")}</div><div class="sb-foot">↻</div></div>`;
const STACK = (blocks) => `<div class="sb-stack">${blocks.join("")}</div>`;
const FLAG = B("event", "khi bấm vào <b class='sb-flag'>🏁</b>", true);
const MOVE = (s) => B("motion", "di chuyển " + N(s) + " bước");
const TURN = (d) => B("motion", "xoay ↺ " + N(d) + " độ");
const WAIT = (s) => B("control", "đợi " + N(s) + " giây");
const PEN = (t) => B("pen", "✏️ " + t);
const COLOR = B("pen", `✏️ chọn bút màu <span style="display:inline-block;width:20px;height:20px;border-radius:50%;background:#8e24aa;border:2px solid #fff;vertical-align:middle"></span>`);

// ---------- Hình vẽ kết quả (mô phỏng nhân vật đi theo chương trình, vẽ bằng SVG) ----------
// segs: danh sách [số bước, góc xoay trái]; pen: có vẽ nét hay không
const PATH = (segs, pen) => {
  let x = 0, y = 0, h = 0; const pts = [[0, 0]];
  segs.forEach(([s, d]) => { x += s * Math.cos(h * Math.PI / 180); y -= s * Math.sin(h * Math.PI / 180); pts.push([x, y]); h += d; });
  const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
  const x0 = Math.min(...xs) - 25, y0 = Math.min(...ys) - 25, w = Math.max(...xs) - x0 + 25, hh = Math.max(...ys) - y0 + 25;
  const bug = `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${-h})"><ellipse rx="9" ry="8" fill="#e11d48" stroke="#111"/><circle cx="9" r="4" fill="#111"/><circle cx="-3" cy="-3" r="1.8" fill="#111"/><circle cx="-3" cy="3" r="1.8" fill="#111"/></g>`;
  return `<svg viewBox="${x0.toFixed(1)} ${y0.toFixed(1)} ${Math.max(w, 120).toFixed(1)} ${Math.max(hh, 90).toFixed(1)}" style="width:220px;height:170px;background:#fff;border:2px solid #cbd5e1;border-radius:10px">`
    + (pen ? `<polyline points="${pts.map((p) => p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" ")}" fill="none" stroke="#8e24aa" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>` : "")
    + `<circle cx="0" cy="0" r="3.5" fill="#16a34a"/>${bug}</svg>`;
};
const REP = (n, s, d) => Array.from({ length: n }, () => [s, d]);
const CASE = (prog, pic, note) => `<div style="display:flex;flex-wrap:wrap;gap:16px;justify-content:center;align-items:center">${prog}<figure style="margin:0;text-align:center">${pic}<figcaption class="caption">${note || "Kết quả khi chạy chương trình"}</figcaption></figure></div>`;

// ---------- Sơ đồ khối tĩnh ----------
const FN = (t, s) => `<span class="fc-node fc-${s || "proc"}">${t}</span>`;
const AR = '<span class="fc-arrow">↓</span>';
const FLOW_SQUARE = `<div class="fc-chart">${FN("Bắt đầu", "term")}${AR}${FN("Lần lặp ← 1")}${AR}<div class="tt-loop">${FN("Lần lặp ≤ 4", "cond")}<div class="tt-yes">Đúng ↓ · Sai → Kết thúc</div>${FN("Di chuyển 60 bước")}${AR}${FN("Quay trái 90 độ")}${AR}${FN("Tăng Lần lặp lên 1 đơn vị")}<div class="tt-back">↺ quay lại kiểm tra điều kiện</div></div>${AR}${FN("Kết thúc", "term")}</div>`;
const IMG = (src, cap, w) => `<figure style="margin:0 auto;max-width:${w || 640}px"><img src="${src}" alt="${cap}" style="width:100%;border-radius:8px"><figcaption class="caption">${cap}</figcaption></figure>`;

const LESSON = {
  meta: {
    subject: "Tin học", grade: "8", book: "Kết nối tri thức với cuộc sống",
    title: "Bài 12: Từ thuật toán đến chương trình", unit: "Chủ đề 5 — Giải quyết vấn đề với sự trợ giúp của máy tính",
    pages: "73–75", durationMinutes: 90,
  },
  objectives: {
    knowledge: [
      "Mô tả được kịch bản đơn giản dưới dạng thuật toán và tạo được một chương trình đơn giản.",
      "Hiểu được chương trình là dãy các lệnh điều khiển máy tính thực hiện một thuật toán.",
      "Nhận biết cấu trúc tuần tự và cấu trúc lặp trong thuật toán; chạy thử, kiểm tra và sửa lỗi đơn giản.",
    ],
    competencies: [
      "Tự chủ và tự học; giao tiếp và hợp tác (trò chơi hướng dẫn vẽ hình, thảo luận phiếu học tập, thực hành 2 HS/máy); giải quyết vấn đề và sáng tạo (điều chỉnh số bước, góc xoay, số lần lặp để vẽ hình mới).",
      "Năng lực số 3.4.TC2a: mô tả kịch bản thành các bước rõ ràng, nhận ra bước lặp, sắp xếp đúng thứ tự.",
      "Năng lực số 5.3.TC2a: chuyển thuật toán thành chương trình Scratch; điều chỉnh tham số; chạy thử, phát hiện và sửa lỗi.",
      "Năng lực AI 8.D1.1: có thể nhờ AI giải thích, kiểm tra thuật toán nhưng phải tự phân tích, chạy thử và kiểm chứng.",
    ],
    qualities: ["Chăm chỉ, kiên trì sửa lỗi chương trình; trung thực, không sao chép chương trình của người khác; trách nhiệm khi làm việc nhóm."],
  },
  coreKnowledge: [
    "Để nhân vật đi theo hình tam giác đều: lặp lại 3 lần việc di chuyển một số bước bằng độ dài cạnh (VD 60 bước) và quay trái 120 độ.",
    "Thuật toán vẽ tam giác đều dùng cấu trúc tuần tự và cấu trúc lặp; số lần lặp bằng số cạnh.",
    "Mỗi bước của thuật toán (mô tả bằng sơ đồ khối) được thực hiện bằng lệnh tương ứng của ngôn ngữ lập trình Scratch.",
    "Chương trình là dãy các lệnh điều khiển máy tính thực hiện một thuật toán.",
    "Nhóm lệnh Bút vẽ (xoá tất cả, đặt bút, chọn bút màu, nhấc bút) giúp nhân vật vừa di chuyển vừa vẽ; đổi hình vẽ thì đổi số lần lặp và góc xoay.",
  ],
  keywords: ["Thuật toán", "Chương trình", "Cấu trúc lặp", "Sơ đồ khối", "Scratch"],
  settings: { basePoints: 100, useTimer: false, defaultTime: 60, sound: true, streakEnabled: true },

  activities: [
    /* =========================== TIẾT 1 =========================== */
    /* ===================== HĐ1: MỞ ĐẦU ===================== */
    {
      id: "mo-dau", name: "Mở đầu — Trò chơi “Hướng dẫn vẽ hình” ✏️", type: "knowledge",
      goal: "Nhận ra để vẽ đúng hình cần các bước hướng dẫn rõ ràng, đúng thứ tự — máy tính cũng cần các lệnh cụ thể.",
      time: 300,
      task: "Chia lớp thành 2 đội, mỗi đội 1 cặp chơi (1 bạn bấm giờ). Một bạn bốc phiếu hình (tam giác đều hoặc hình vuông), bạn còn lại quay mặt lên bảng để vẽ. Người bốc phiếu KHÔNG được nói tên hình, chỉ dùng lời hướng dẫn từng bước (đi thẳng, quay, lặp lại…) để bạn vẽ đúng hình. Đội vẽ đúng hình sẽ chiến thắng!",
      sgkImage: "assets/sgk/mo-dau.jpg",
      content: {
        revealLabel: "📌 Giáo viên chốt",
        blocks: [
          { kind: "list", value: [
            "Muốn bạn vẽ đúng, lời hướng dẫn phải là các bước rõ ràng, theo đúng thứ tự: đi thẳng một đoạn → quay một góc → lặp lại.",
            "Sai thứ tự hoặc sai góc quay → hình vẽ sai.",
            "Máy tính cũng vậy: cần một thuật toán (các bước) và một chương trình (các lệnh) để điều khiển nhân vật.",
          ] },
          { kind: "image", value: "assets/sgk/hinh-12-1.jpg", caption: "Hình 12.1. Nhân vật di chuyển" },
        ],
      },
      questions: [
        { question: "Bằng ngôn ngữ lập trình trực quan, bạn Khoa muốn tạo chương trình điều khiển nhân vật di chuyển theo đường đi là các hình như tam giác đều, vuông,… Theo em, bạn Khoa cần thực hiện những công việc gì? (Chọn tất cả ý đúng)", type: "multiple-select",
          options: ["Mô tả các bước nhân vật cần làm (thuật toán)", "Ghép các lệnh Scratch tương ứng với từng bước (chương trình)", "Chạy thử chương trình, kiểm tra và sửa lỗi", "Vẽ sẵn hình tam giác lên sân khấu bằng tay"],
          answer: [0, 1, 2], explanation: "Cần xây dựng thuật toán → viết chương trình theo thuật toán → chạy thử, kiểm tra. Vẽ tay không phải là điều khiển nhân vật.", level: "thong-hieu", activity: "mo-dau" },
      ],
    },

    /* ===================== HĐ2.1: TỪ THUẬT TOÁN ĐẾN CHƯƠNG TRÌNH ===================== */
    {
      id: "hd1-thuat-toan", name: "1. Hoạt động 1: Mô tả kịch bản dưới dạng thuật toán 🧭", type: "knowledge",
      goal: "Xác định góc quay, các bước, cấu trúc điều khiển và hoạt động lặp của thuật toán đi theo tam giác đều.",
      time: 600,
      task: "Phiếu bài tập số 1 (nhóm): Với trường hợp nhân vật di chuyển theo đường đi là một tam giác đều, hãy: 1) Xác định góc quay của nhân vật khi đi hết một cạnh. 2) Liệt kê lần lượt các bước của thuật toán (bằng ngôn ngữ tự nhiên). 3) Cấu trúc điều khiển nào được sử dụng? 4) Hoạt động lặp là gì, được thực hiện mấy lần?",
      sgkImage: "assets/sgk/hoat-dong-1.jpg",
      content: {
        revealLabel: "📖 Từ thuật toán đến chương trình (SGK tr.73–74)",
        blocks: [
          { kind: "text", value: "Tam giác đều là hình có ba cạnh bằng nhau, ba góc bằng nhau và bằng 60 độ. Để di chuyển theo một hình tam giác đều, nhân vật cần lặp lại ba lần việc thực hiện hai hành động sau đây:" },
          { kind: "list", value: ["Di chuyển về phía trước một số bước bằng độ dài cạnh tam giác. Ví dụ, di chuyển 60 bước.", "Quay trái 120 độ."] },
          { kind: "image", value: "assets/sgk/hinh-12-2.jpg", caption: "Hình 12.2. Đường đi của nhân vật" },
          { kind: "text", value: "Thuật toán sử dụng cấu trúc tuần tự và cấu trúc lặp, trong đó số bước lặp bằng 3 (bằng số cạnh của tam giác đều). Khi thực hiện đủ ba lần thì vòng lặp kết thúc." },
          { kind: "text", value: "Để mô tả thuật toán, ngoài cách liệt kê các bước bằng ngôn ngữ tự nhiên hoặc dùng sơ đồ khối, chúng ta có thể viết chương trình để máy tính “hiểu” và thực hiện được thuật toán. Để điều khiển nhân vật thực hiện thuật toán mô tả bằng sơ đồ khối ở Hình 12.3a, em viết chương trình Scratch như Hình 12.3b, trong đó mỗi bước của thuật toán đã được thực hiện bằng lệnh tương ứng của ngôn ngữ lập trình Scratch." },
          { kind: "image", value: "assets/sgk/hinh-12-3.jpg", caption: "Hình 12.3. Sơ đồ khối và chương trình thực hiện thuật toán" },
        ],
      },
      remember: ["Chương trình là dãy các lệnh điều khiển máy tính thực hiện một thuật toán."],
      questions: [
        { question: "Câu 1. Khi đi hết một cạnh của tam giác đều, nhân vật cần quay trái bao nhiêu độ?", type: "multiple-choice",
          options: ["60 độ", "90 độ", "120 độ", "180 độ"],
          answer: 2, explanation: "Góc của tam giác đều là 60 độ nên nhân vật phải quay 180 − 60 = 120 độ (Hình 12.2).", level: "thong-hieu", activity: "hd1-thuat-toan" },
        { question: "Câu 2. Các bước của thuật toán điều khiển nhân vật đi theo tam giác đều (ngôn ngữ tự nhiên) là:", type: "multiple-choice",
          options: ["Quay trái 120 độ một lần rồi di chuyển 180 bước", "Lặp lại 3 lần: di chuyển 60 bước, quay trái 120 độ", "Lặp lại 3 lần: di chuyển 60 bước, quay trái 60 độ", "Di chuyển 60 bước, quay trái 120 độ (chỉ một lần)"],
          answer: 1, explanation: "Nhân vật lặp lại 3 lần hai hành động: di chuyển 60 bước (độ dài cạnh) và quay trái 120 độ.", level: "thong-hieu", activity: "hd1-thuat-toan" },
        { question: "Câu 3. Thuật toán sử dụng những cấu trúc điều khiển nào?", type: "multiple-choice",
          options: ["Chỉ cấu trúc tuần tự", "Cấu trúc rẽ nhánh và cấu trúc lặp", "Chỉ cấu trúc rẽ nhánh", "Cấu trúc tuần tự và cấu trúc lặp"],
          answer: 3, explanation: "Các lệnh trong mỗi lần lặp thực hiện tuần tự; hai hành động được lặp lại 3 lần.", level: "nhan-biet", activity: "hd1-thuat-toan" },
        { question: "Câu 4. Hoạt động lặp được thực hiện mấy lần?", type: "multiple-choice",
          options: ["3 lần — bằng số cạnh tam giác đều", "2 lần", "4 lần", "120 lần"],
          answer: 0, explanation: "Số bước lặp bằng 3 (bằng số cạnh của tam giác đều). Khi thực hiện đủ ba lần thì vòng lặp kết thúc.", level: "nhan-biet", activity: "hd1-thuat-toan" },
        { question: "Chương trình là gì?", type: "multiple-choice",
          options: ["Là hình vẽ trên sân khấu", "Là sơ đồ khối của bài toán", "Là nhân vật trong Scratch", "Là dãy các lệnh điều khiển máy tính thực hiện một thuật toán"],
          answer: 3, explanation: "Chương trình là dãy các lệnh điều khiển máy tính thực hiện một thuật toán.", level: "nhan-biet", activity: "hd1-thuat-toan" },
      ],
    },
    {
      id: "ghep-so-do-lenh", name: "Câu 5: Ghép bước thuật toán ↔ lệnh Scratch 🔗", type: "matching",
      goal: "Nhận ra mỗi bước của thuật toán được thực hiện bằng lệnh tương ứng của Scratch (mũi tên nét đứt Hình 12.3).",
      time: 180,
      task: "Phiếu bài tập số 1 — Câu 5: Ghép mỗi bước trong sơ đồ khối (Hình 12.3a) với lệnh Scratch tương ứng (Hình 12.3b). Làm hết rồi bấm Nộp bài.",
      sgkImage: "assets/sgk/hinh-12-3.jpg",
      pairs: [
        { left: "Bắt đầu", right: "khi bấm vào 🏁" },
        { left: "Lần lặp ← 1 · Lần lặp ≤ 3 · Tăng Lần lặp lên 1 đơn vị", right: "lặp lại 3" },
        { left: "Di chuyển 60 bước", right: "di chuyển 60 bước" },
        { left: "Quay trái 120 độ", right: "xoay ↺ 120 độ" },
      ],
      explanation: "Hình 12.3: khung nét đứt (khởi tạo, kiểm tra, tăng Lần lặp) ↔ lệnh lặp lại 3; Di chuyển 60 bước ↔ di chuyển 60 bước; Quay trái 120 độ ↔ xoay ↺ 120 độ.",
    },
    {
      id: "mo-phong-so-do", name: "Mô phỏng: Sơ đồ khối chạy cùng chương trình 🐞", type: "knowledge",
      goal: "Thấy từng bước của sơ đồ khối và lệnh Scratch tương ứng được thực hiện; biến Lần lặp tăng dần.",
      time: 240,
      task: "Bấm 🏁 Chạy (chọn tốc độ 🐢 Chậm) và quan sát: lệnh Scratch nào sáng lên thì khối nào trong sơ đồ sáng theo? Biến Lần lặp thay đổi thế nào? Khi Lần lặp bằng 4 thì chuyện gì xảy ra?",
      turtle: {
        title: "Chương trình Hình 12.3 — nhân vật đi theo tam giác đều",
        intro: "Chương trình Hình 12.3 chỉ điều khiển nhân vật di chuyển (chưa vẽ). Theo dõi lệnh sáng lên ở cả hai bên.",
        flow: true, start: { x: -30, y: -40, dir: 90 },
        script: [{ op: "flag" }, { op: "repeat", times: 3, body: [{ op: "move", steps: 60 }, { op: "turn", deg: 120 }] }],
      },
      questions: [
        { question: "Khi biến Lần lặp tăng lên 4 thì điều gì xảy ra?", type: "multiple-choice",
          options: ["Nhân vật đi thêm cạnh thứ tư", "Điều kiện Lần lặp ≤ 3 sai → vòng lặp kết thúc", "Chương trình báo lỗi", "Lần lặp quay về 1 và lặp lại mãi"],
          answer: 1, explanation: "4 ≤ 3 là sai nên thoát khỏi vòng lặp và đi đến Kết thúc — đúng 3 lần lặp.", level: "thong-hieu", activity: "mo-phong-so-do" },
      ],
    },
    {
      id: "cau-hoi-doi-1-giay", name: "Câu hỏi: Thêm lệnh đợi 1 giây ⏸️", type: "knowledge",
      goal: "Bổ sung một bước vào sơ đồ khối và đặt lệnh tương ứng đúng vị trí trong chương trình.",
      time: 240,
      task: "Cá nhân: Bạn An muốn bổ sung lệnh đợi 1 giây để điều khiển nhân vật dừng lại 1 giây sau khi đi hết mỗi cạnh của tam giác. Em hãy bổ sung lệnh này vào sơ đồ khối mô tả thuật toán và nêu vị trí đặt câu lệnh trong chương trình Scratch tương ứng ở Hình 12.3.",
      sgkImage: "assets/sgk/cau-hoi.jpg",
      html: CASE(STACK([FLAG, LOOP("lặp lại " + N(3), [MOVE(60), TURN(120)])]), IMG("assets/sgk/hinh-12-3.jpg", "Hình 12.3a. Sơ đồ khối", 360), "Sơ đồ khối Hình 12.3a"),
      content: {
        revealLabel: "✅ Gợi ý đáp án",
        blocks: [
          { kind: "list", value: [
            "Sơ đồ khối: thêm khối “Đợi 1 giây” bên trong vòng lặp, sau khối “Di chuyển 60 bước” (trước “Tăng Lần lặp lên 1 đơn vị”).",
            "Chương trình: kéo lệnh đợi 1 giây (nhóm Điều khiển) đặt bên trong khối lặp lại 3, sau lệnh di chuyển 60 bước. Hình 12.4 đặt sau lệnh xoay — cũng ở trong vòng lặp nên nhân vật vẫn dừng 1 giây sau mỗi cạnh.",
          ] },
          { kind: "html", value: STACK([FLAG, LOOP("lặp lại " + N(3), [MOVE(60), WAIT(1), TURN(120)])]) },
        ],
      },
      questions: [
        { question: "Đặt lệnh đợi 1 giây ở đâu để nhân vật dừng lại 1 giây sau khi đi hết MỖI cạnh?", type: "multiple-choice",
          options: ["Ngay dưới khối khi bấm vào 🏁, trước khối lặp lại", "Sau khối lặp lại 3 (cuối chương trình)", "Bên trong khối lặp lại 3, sau lệnh di chuyển 60 bước", "Không cần đặt, Scratch tự dừng"],
          answer: 2, explanation: "Lệnh phải ở trong vòng lặp để được thực hiện sau mỗi cạnh. Đặt ngoài vòng lặp thì chỉ dừng một lần.", level: "van-dung", activity: "cau-hoi-doi-1-giay" },
        { question: "Lệnh đợi 1 giây nằm trong nhóm lệnh nào của Scratch?", type: "multiple-choice",
          options: ["Điều khiển", "Chuyển động", "Bút vẽ", "Sự kiện"],
          answer: 0, explanation: "SGK: nháy chuột vào nhóm lệnh Điều khiển, kéo thả lệnh đợi 1 giây.", level: "nhan-biet", activity: "cau-hoi-doi-1-giay" },
      ],
    },

    /* ===================== HĐ2.2: THỰC HÀNH — NHIỆM VỤ 1 ===================== */
    {
      id: "thuc-hanh-1", name: "2. Thực hành — Nhiệm vụ 1: Nhân vật đi theo tam giác đều 💻", type: "knowledge",
      goal: "Tạo chương trình Scratch điều khiển nhân vật di chuyển theo đường đi là một tam giác đều.",
      time: 1200,
      task: "2 HS/máy: Tạo chương trình điều khiển nhân vật di chuyển theo đường đi là một tam giác đều như minh hoạ trong Hình 12.3. Làm theo 4 bước hướng dẫn, chạy thử và kiểm tra kết quả.",
      sgkImage: "assets/sgk/nhiem-vu-1.jpg",
      content: {
        revealLabel: "🔢 Hướng dẫn (SGK tr.74–75, Scratch 3.0 giao diện tiếng Việt)",
        blocks: [
          { kind: "list", value: [
            "Bước 1. Khởi động phần mềm Scratch, chọn chế độ hiển thị tiếng Việt.",
            "Bước 2. Xoá nhân vật chú Mèo, thêm nhân vật chú Bọ rùa.",
            "Bước 3. Kéo thả các lệnh để được chương trình như minh hoạ trong Hình 12.3.",
            "Bước 4. Nháy chuột vào nút 🏁 để chạy chương trình và xem kết quả.",
          ] },
          { kind: "html", value: STACK([FLAG, LOOP("lặp lại " + N(3), [MOVE(60), TURN(120)])]) },
        ],
      },
      questions: [
        { question: "Trong Scratch 3.0, để chọn chế độ hiển thị tiếng Việt em làm thế nào?", type: "multiple-choice",
          options: ["Nháy chuột vào biểu tượng quả địa cầu 🌐 trên thanh menu, chọn Tiếng Việt", "Chọn nhóm lệnh Chuyển động", "Nháy chuột vào nút 🏁", "Xoá nhân vật chú Mèo"],
          answer: 0, explanation: "Biểu tượng quả địa cầu trên thanh menu dùng để chọn ngôn ngữ hiển thị.", level: "nhan-biet", activity: "thuc-hanh-1" },
        { question: "Để tạo chương trình Hình 12.3, các lệnh được lấy từ những nhóm lệnh nào?", type: "multiple-choice",
          options: ["Âm thanh, Hiển thị", "Sự kiện (khi bấm vào 🏁), Điều khiển (lặp lại), Chuyển động (di chuyển, xoay)", "Cảm biến, Các biến", "Bút vẽ, Âm thanh"],
          answer: 1, explanation: "Khi bấm vào 🏁 thuộc nhóm Sự kiện; lặp lại thuộc Điều khiển; di chuyển, xoay thuộc Chuyển động.", level: "thong-hieu", activity: "thuc-hanh-1" },
        { question: "Chạy chương trình Hình 12.3, em thấy gì trên sân khấu?", type: "multiple-choice",
          options: ["Bọ rùa vẽ ra một tam giác đều màu tím", "Bọ rùa đứng yên", "Bọ rùa vẽ một hình vuông", "Bọ rùa di chuyển theo đường đi tam giác đều nhưng không để lại nét vẽ"],
          answer: 3, explanation: "Chương trình Hình 12.3 chưa có lệnh của nhóm Bút vẽ nên nhân vật chỉ di chuyển, chưa vẽ — Nhiệm vụ 2 sẽ thêm các lệnh vẽ.", level: "thong-hieu", activity: "thuc-hanh-1" },
      ],
    },

    /* =========================== TIẾT 2 =========================== */
    {
      id: "thuc-hanh-2", name: "Nhiệm vụ 2: Vừa di chuyển, vừa vẽ tam giác đều 🎨", type: "knowledge",
      goal: "Thêm các lệnh nhóm Bút vẽ và lệnh đợi để nhân vật vừa di chuyển vừa vẽ tam giác đều; lưu tệp VeHinh.sb3.",
      time: 900,
      task: "2 HS/máy: Thêm một số lệnh để nhân vật vừa di chuyển, vừa vẽ tam giác đều như Hình 12.4. Chạy thử rồi lưu tệp với tên VeHinh.sb3.",
      sgkImage: "assets/sgk/huong-dan.jpg",
      html: IMG("assets/sgk/hinh-12-4.jpg", "Hình 12.4. Chương trình vẽ hình tam giác đều", 240),
      content: {
        revealLabel: "🔢 Hướng dẫn Nhiệm vụ 2 (SGK tr.75)",
        blocks: [
          { kind: "list", value: [
            "Bước 1. Nháy chuột vào nhóm lệnh Bút vẽ, kéo thả các lệnh của nhóm này vào chương trình như minh hoạ trong Hình 12.4.",
            "Bước 2. Nháy chuột vào nhóm lệnh Điều khiển, kéo thả lệnh đợi 1 giây vào chương trình như minh hoạ trong Hình 12.4.",
            "Bước 3. Nháy chuột vào nút 🏁 để chạy chương trình và xem kết quả.",
            "Bước 4. Lưu tệp với tên VeHinh.sb3 và thoát khỏi chương trình.",
            "Lưu ý: nếu chưa thấy nhóm Bút vẽ, bấm nút “Thêm tiện ích mở rộng” ở góc dưới bên trái màn hình Scratch rồi chọn Bút vẽ.",
          ] },
        ],
      },
      questions: [
        { question: "Lệnh ✏️ đặt bút có tác dụng gì?", type: "multiple-choice",
          options: ["Xoá hết hình đã vẽ", "Dừng chương trình", "Đổi màu nhân vật", "Khi nhân vật di chuyển sẽ để lại nét vẽ"],
          answer: 3, explanation: "Sau lệnh đặt bút, nhân vật di chuyển đến đâu sẽ vẽ nét đến đó; lệnh nhấc bút để thôi vẽ.", level: "nhan-biet", activity: "thuc-hanh-2" },
        { question: "Vì sao chương trình Hình 12.4 đặt lệnh ✏️ xoá tất cả ở đầu chương trình?", type: "multiple-choice",
          options: ["Để xoá nhân vật Bọ rùa", "Để xoá các lệnh trong chương trình", "Để xoá các nét vẽ cũ trên sân khấu trước khi vẽ lại", "Để lưu tệp"],
          answer: 2, explanation: "Mỗi lần chạy, xoá tất cả giúp sân khấu sạch nét vẽ cũ rồi mới vẽ hình mới.", level: "thong-hieu", activity: "thuc-hanh-2" },
        { question: "Chương trình được lưu với tên tệp nào?", type: "multiple-choice",
          options: ["VeHinh.sb3", "VeHinh.pptx", "TamGiac.docx", "VeHinh.xlsx"],
          answer: 0, explanation: "SGK: lưu tệp với tên VeHinh.sb3 (tệp dự án Scratch 3 có phần mở rộng .sb3).", level: "nhan-biet", activity: "thuc-hanh-2" },
      ],
    },
    {
      id: "bo-rua-ve-hinh", name: "Mô phỏng: Bọ rùa vẽ hình 🐞✏️", type: "knowledge",
      goal: "Chạy chương trình Hình 12.4, thay đổi số lần lặp, số bước, góc xoay để vẽ tam giác đều, hình vuông, lục giác đều.",
      time: 480,
      task: "Bấm 🏁 Chạy để bọ rùa vẽ tam giác đều. Sau đó sửa các ô số trên khối lệnh (số lần lặp, số bước, góc xoay) để hoàn thành thử thách: vẽ hình vuông, lục giác đều. Theo dõi sơ đồ khối sáng theo từng lệnh.",
      turtle: {
        title: "Chương trình vẽ hình (Hình 12.4) — sửa số rồi chạy thử",
        flow: true, goals: [3, 4, 6], start: { x: -30, y: -70, dir: 90 },
        script: [
          { op: "flag" }, { op: "clear" }, { op: "pendown" }, { op: "color", c: "#8e24aa", name: "tím" },
          { op: "repeat", times: 3, edit: true, body: [{ op: "move", steps: 60, edit: true }, { op: "turn", deg: 120, edit: true }, { op: "wait", secs: 1, edit: true }] },
          { op: "penup" },
        ],
      },
      questions: [
        { question: "Muốn bọ rùa vẽ hình vuông, em sửa chương trình thế nào?", type: "multiple-choice",
          options: ["lặp lại 4, xoay 90 độ", "lặp lại 4, xoay 120 độ", "lặp lại 3, xoay 90 độ", "lặp lại 90, xoay 4 độ"],
          answer: 0, explanation: "Hình vuông có 4 cạnh, mỗi góc 90 độ nên lặp lại 4 lần, mỗi lần quay 90 độ.", level: "van-dung", activity: "bo-rua-ve-hinh" },
      ],
    },
    {
      id: "sap-xep-lenh", name: "Trò chơi: Sắp xếp các lệnh chương trình Hình 12.4 🧩", type: "ordering",
      goal: "Ghi nhớ trình tự các lệnh của chương trình vẽ tam giác đều.",
      time: 180,
      task: "Sắp xếp các khối lệnh theo đúng thứ tự trong chương trình Hình 12.4 (các lệnh bên trong khối lặp lại xếp ngay sau lệnh lặp lại 3) rồi bấm Nộp bài.",
      steps: ["khi bấm vào 🏁", "✏️ xoá tất cả", "✏️ đặt bút", "✏️ chọn bút màu tím", "lặp lại 3", "di chuyển 60 bước", "xoay ↺ 120 độ", "đợi 1 giây", "✏️ nhấc bút"],
      blocks: ["event", "pen", "pen", "pen", "control", "motion", "motion", "control", "pen"],
      explanation: "Hình 12.4: khi bấm vào 🏁 → xoá tất cả → đặt bút → chọn bút màu → lặp lại 3 (di chuyển 60 bước, xoay ↺ 120 độ, đợi 1 giây) → nhấc bút.",
    },
    {
      id: "tham-tu-loi", name: "Thám tử sửa lỗi chương trình 🕵️", type: "quiz",
      goal: "Chạy thử, quan sát kết quả, phát hiện và sửa lỗi đơn giản (sai góc, sai số lần lặp, thiếu lệnh, sai vị trí lệnh).",
      time: 360,
      task: "Mỗi chương trình dưới đây muốn vẽ tam giác đều nhưng có lỗi. Quan sát chương trình và kết quả, tìm lỗi cần sửa!",
      questions: [
        { question: "Chương trình vẽ ra hình như bên phải. Lỗi ở đâu?", type: "multiple-choice",
          html: CASE(STACK([FLAG, PEN("đặt bút"), LOOP("lặp lại " + N(3), [MOVE(60), TURN(90)])]), PATH(REP(3, 60, 90), true)),
          options: ["Số lần lặp sai", "Thiếu lệnh đặt bút", "Góc xoay sai — tam giác đều phải xoay 120 độ", "Số bước quá nhỏ"],
          answer: 2, explanation: "Xoay 90 độ ba lần thì hình không khép kín. Tam giác đều phải quay 120 độ sau mỗi cạnh.", level: "van-dung", activity: "tham-tu-loi" },
        { question: "Chương trình vẽ ra hình như bên phải. Lỗi ở đâu?", type: "multiple-choice",
          html: CASE(STACK([FLAG, PEN("đặt bút"), LOOP("lặp lại " + N(2), [MOVE(60), TURN(120)])]), PATH(REP(2, 60, 120), true)),
          options: ["Số lần lặp sai — phải lặp lại 3 lần", "Góc xoay sai", "Thiếu lệnh xoá tất cả", "Không có lỗi"],
          answer: 0, explanation: "Lặp 2 lần chỉ vẽ được 2 cạnh. Số lần lặp phải bằng số cạnh của tam giác đều là 3.", level: "van-dung", activity: "tham-tu-loi" },
        { question: "Bọ rùa đi hết đường tam giác nhưng sân khấu không có nét vẽ nào. Lỗi ở đâu?", type: "multiple-choice",
          html: CASE(STACK([FLAG, B("pen", "✏️ xoá tất cả"), LOOP("lặp lại " + N(3), [MOVE(60), TURN(120)])]), PATH(REP(3, 60, 120), false), "Không có nét vẽ"),
          options: ["Góc xoay sai", "Thiếu lệnh ✏️ đặt bút trước khi di chuyển", "Số lần lặp sai", "Thiếu lệnh đợi 1 giây"],
          answer: 1, explanation: "Phải đặt bút thì nhân vật di chuyển mới để lại nét vẽ.", level: "van-dung", activity: "tham-tu-loi" },
        { question: "Chương trình vẽ ra một đường thẳng như bên phải. Lỗi ở đâu?", type: "multiple-choice",
          html: CASE(STACK([FLAG, PEN("đặt bút"), LOOP("lặp lại " + N(3), [MOVE(60)]), TURN(120)]), PATH([[60, 0], [60, 0], [60, 120]], true)),
          options: ["Số bước sai", "Thiếu lệnh nhấc bút", "Số lần lặp sai", "Lệnh xoay đặt ngoài khối lặp lại — phải đặt bên trong, sau lệnh di chuyển"],
          answer: 3, explanation: "Lệnh xoay nằm ngoài vòng lặp nên nhân vật đi thẳng 3 × 60 bước rồi mới xoay một lần.", level: "van-dung-cao", activity: "tham-tu-loi" },
      ],
    },
    {
      id: "quy-luat-goc", name: "Quy luật số cạnh – số lần lặp – góc xoay 📐", type: "fillblank",
      goal: "Nhận ra mối liên hệ giữa số cạnh, số lần lặp và góc xoay khi vẽ đa giác đều.",
      time: 240,
      task: "Chọn số thích hợp để hoàn thành bảng (có thể thử lại bằng mô phỏng Bọ rùa vẽ hình). Làm hết rồi bấm Nộp bài.",
      text: "Tam giác đều: lặp lại {{}} lần, mỗi lần xoay {{}} độ\nHình vuông: lặp lại {{}} lần, mỗi lần xoay {{}} độ\nLục giác đều: lặp lại {{}} lần, mỗi lần xoay {{}} độ",
      answers: [["3"], ["120"], ["4"], ["90"], ["6"], ["60"]],
      choices: [["3", "4", "6"], ["60", "90", "120"], ["3", "4", "6"], ["60", "90", "120"], ["3", "4", "6"], ["60", "90", "120"]],
      explanation: "Số lần lặp = số cạnh. Mở rộng: sau khi đi hết các cạnh, nhân vật quay đủ một vòng 360 độ nên góc xoay = 360 : số cạnh (360 : 3 = 120; 360 : 4 = 90; 360 : 6 = 60).",
    },

    /* ===================== HĐ3: LUYỆN TẬP ===================== */
    {
      id: "luyen-tap-1", name: "Luyện tập 1: Sơ đồ khối đường đi hình vuông 🟪", type: "fillblank",
      goal: "Mô tả thuật toán đi theo hình vuông bằng sơ đồ khối.",
      time: 240,
      task: "Luyện tập 1: Chọn nội dung thích hợp để hoàn thành sơ đồ khối mô tả thuật toán khi đường đi của nhân vật là hình vuông. Làm hết rồi bấm Nộp bài.",
      sgkImage: "assets/sgk/luyen-tap.jpg",
      text: "Bắt đầu → Lần lặp ← 1\nKiểm tra điều kiện: Lần lặp ≤ {{}}   (Sai → {{}})\nĐúng → Di chuyển 60 bước → Quay trái {{}} độ → Tăng Lần lặp lên {{}} đơn vị → quay lại kiểm tra điều kiện",
      answers: [["4"], ["Kết thúc"], ["90"], ["1"]],
      choices: [["3", "4", "90"], ["Kết thúc", "Di chuyển 60 bước", "Bắt đầu"], ["60", "90", "120"], ["1", "4", "90"]],
      explanation: "Hình vuông: lặp 4 lần (Lần lặp ≤ 4), mỗi lần di chuyển rồi quay trái 90 độ, tăng Lần lặp lên 1; khi Lần lặp = 5 thì điều kiện sai → Kết thúc.",
    },
    {
      id: "luyen-tap-2", name: "Luyện tập 2: Nâng cấp VeHinh.sb3 — nhân vật mới vẽ hình vuông 🦋", type: "knowledge",
      goal: "Thêm nhân vật mới và lập trình để khi nháy chuột vào nhân vật này thì chương trình vẽ hình vuông.",
      time: 480,
      task: "2 HS/máy: Nâng cấp chương trình VeHinh.sb3 bằng cách bổ sung một nhân vật mới (VD bươm bướm) và lập trình để khi nháy chuột vào nhân vật này thì chương trình thực hiện thuật toán vẽ hình vuông. Chạy thử rồi lưu lại.",
      sgkImage: "assets/sgk/luyen-tap.jpg",
      content: {
        revealLabel: "✅ Sơ đồ khối và chương trình gợi ý",
        blocks: [
          { kind: "html", value: `<div style="display:flex;flex-wrap:wrap;gap:24px;justify-content:center;align-items:flex-start">${FLOW_SQUARE}${STACK([B("event", "khi bấm vào nhân vật này", true), PEN("xoá tất cả"), PEN("đặt bút"), COLOR, LOOP("lặp lại " + N(4), [MOVE(60), TURN(90), WAIT(1)]), PEN("nhấc bút")])}</div>` },
          { kind: "text", value: "Chọn nhân vật mới rồi dùng lệnh “khi bấm vào nhân vật này” (nhóm Sự kiện) thay cho “khi bấm vào 🏁”; lặp lại 4 lần, xoay 90 độ. Sơ đồ khối bên trái là đáp án Luyện tập 1 (có thể thêm khối Đợi 1 giây như chương trình)." },
        ],
      },
      questions: [
        { question: "Muốn chương trình chạy khi nháy chuột vào nhân vật mới, em dùng lệnh sự kiện nào?", type: "multiple-choice",
          options: ["khi bấm vào 🏁", "khi bấm vào nhân vật này", "đợi 1 giây", "lặp lại 4"],
          answer: 1, explanation: "Lệnh “khi bấm vào nhân vật này” (nhóm Sự kiện) chạy các lệnh bên dưới khi em nháy chuột vào nhân vật đó.", level: "van-dung", activity: "luyen-tap-2" },
      ],
    },
    {
      id: "luyen-tap-3", name: "Luyện tập 3a: Xe dừng lại trước hòn đá 🚌", type: "fillblank",
      goal: "Hoàn thành sơ đồ khối của kịch bản có cấu trúc lặp với điều kiện.",
      time: 240,
      task: "Bạn Khoa viết kịch bản: Khi xe cách hòn đá nhỏ hơn 120 bước, xe sẽ dừng lại (Hình 12.5). Ghép mỗi lệnh “Di chuyển 5 bước”, “Cách hòn đá < 120 bước?” với ô số 1 và 2 trong sơ đồ khối Hình 12.6. Làm hết rồi bấm Nộp bài.",
      sgkImage: "assets/sgk/hinh-12-6.jpg",
      html: `<div style="display:flex;flex-wrap:wrap;gap:16px;justify-content:center;align-items:center">${IMG("assets/sgk/hinh-12-5.jpg", "Hình 12.5", 240)}${IMG("assets/sgk/hinh-12-6.jpg", "Hình 12.6. Sơ đồ khối mô tả kịch bản", 260)}</div>`,
      text: "Ô số 1 (khối hình thoi): {{}}\nÔ số 2 (khối hình chữ nhật): {{}}",
      answers: [["Cách hòn đá < 120 bước?"], ["Di chuyển 5 bước"]],
      choices: [["Cách hòn đá < 120 bước?", "Di chuyển 5 bước"], ["Cách hòn đá < 120 bước?", "Di chuyển 5 bước"]],
      explanation: "Ô 1 là điều kiện (hình thoi): Cách hòn đá < 120 bước? — Sai thì thực hiện ô 2 (Di chuyển 5 bước) rồi quay lại kiểm tra; Đúng thì Kết thúc (xe dừng lại).",
    },
    {
      id: "xe-buyt-mo-phong", name: "Luyện tập 3b: Chương trình xe buýt 🚌", type: "knowledge",
      goal: "Chạy thử chương trình Scratch thực hiện thuật toán Hình 12.6 (lặp lại cho đến khi).",
      time: 360,
      task: "Chạy chương trình gợi ý cho Luyện tập 3b. Quan sát khoảng cách đến hòn đá giảm dần; xe dừng khi nào? Thử đổi số 120 thành 200 hoặc đổi 5 bước thành 20 bước rồi chạy lại. Sau đó viết chương trình trên Scratch thật (nhân vật Bus, Rocks).",
      turtle: {
        title: "Xe dừng lại khi cách hòn đá nhỏ hơn 120 bước",
        sprite: "bus", flow: true, start: { x: -169, y: -122, dir: 90 }, rock: { x: 170, y: -122, name: "Rocks", label: "hòn đá" },
        script: [{ op: "flag" }, { op: "goto", x: -169, y: -122 }, { op: "until", lt: 120, edit: true, body: [{ op: "move", steps: 5, edit: true }] }],
      },
      questions: [
        { question: "Lệnh Scratch nào thực hiện được “lặp lại việc di chuyển 5 bước cho đến khi cách hòn đá nhỏ hơn 120 bước”?", type: "multiple-choice",
          options: ["lặp lại 120", "lặp lại mãi mãi", "lặp lại cho đến khi ⟨khoảng cách đến Rocks < 120⟩", "đợi 120 giây"],
          answer: 2, explanation: "Không biết trước số lần lặp nên dùng lặp lại cho đến khi với điều kiện khoảng cách đến Rocks < 120 (nhóm Cảm biến, Các phép toán).", level: "van-dung", activity: "xe-buyt-mo-phong" },
        { question: "Vì sao chương trình có lệnh “đi tới điểm x: -169 y: -122” ở đầu?", type: "multiple-choice",
          options: ["Để xe về vị trí xuất phát mỗi lần chạy lại", "Để xe dừng lại", "Để đo khoảng cách", "Để vẽ đường đi"],
          answer: 0, explanation: "Mỗi lần bấm 🏁, xe được đưa về điểm xuất phát rồi mới chạy — kết quả chạy lại giống nhau.", level: "thong-hieu", activity: "xe-buyt-mo-phong" },
      ],
    },

    /* ===================== HĐ4: VẬN DỤNG ===================== */
    {
      id: "van-dung", name: "Vận dụng: Đổi tam giác thành hình khác 🔷", type: "knowledge",
      goal: "Nhận ra khi đổi hình vẽ thì cần thay đổi số lần lặp và góc xoay trong chương trình.",
      time: 300,
      task: "Trong bài học, đường đi của nhân vật là hình tam giác đều. Đường đi đó có thể là hình vuông, lục giác đều,… Khi đó các con số nào trong chương trình ở Hình 12.3 cần phải thay đổi? Thử lại bằng mô phỏng Bọ rùa vẽ hình; hoàn thiện trên máy ở nhà và báo cáo ở tiết sau.",
      sgkImage: "assets/sgk/van-dung.jpg",
      html: STACK([FLAG, LOOP("lặp lại " + N("3 ?"), [MOVE(60), TURN("120 ?")])]),
      content: {
        revealLabel: "✅ Gợi ý đáp án",
        blocks: [
          { kind: "list", value: [
            "Cần thay đổi số lần lặp (bằng số cạnh) và góc xoay.",
            "Hình vuông: lặp lại 4, xoay 90 độ. Lục giác đều: lặp lại 6, xoay 60 độ.",
            "Số bước (60) là độ dài cạnh — đổi hay không tuỳ em muốn hình to hay nhỏ.",
          ] },
        ],
      },
      questions: [
        { question: "Đổi đường đi từ tam giác đều sang lục giác đều, những con số nào trong chương trình Hình 12.3 bắt buộc phải thay đổi? (Chọn tất cả ý đúng)", type: "multiple-select",
          options: ["Số lần lặp (3)", "Góc xoay (120)", "Số bước di chuyển (60)", "Không cần thay đổi gì"],
          answer: [0, 1], explanation: "Lục giác đều: lặp lại 6 lần, xoay 60 độ. Số bước chỉ quyết định độ dài cạnh.", level: "van-dung", activity: "van-dung" },
      ],
    },

    /* ===================== TỔNG KẾT ===================== */
    {
      id: "tong-ket", name: "Tổng kết", type: "summary",
      task: "Cả lớp nhắc lại kiến thức trọng tâm và làm thử thách cuối. Về nhà: xem lại nội dung đã học, thực hành lại trên máy các chương trình đã làm; đọc và chuẩn bị trước Bài 13: Biểu diễn dữ liệu.",
      content: {
        learned: [
          "Mô tả kịch bản dưới dạng thuật toán: tam giác đều = lặp lại 3 lần (di chuyển 60 bước, quay trái 120 độ).",
          "Thuật toán dùng cấu trúc tuần tự và cấu trúc lặp; mỗi bước được thực hiện bằng một lệnh Scratch tương ứng.",
          "Chương trình là dãy các lệnh điều khiển máy tính thực hiện một thuật toán.",
          "Nhóm Bút vẽ giúp nhân vật vừa di chuyển vừa vẽ; đổi hình thì đổi số lần lặp và góc xoay.",
        ],
        challenge: [
          { question: "Chương trình “lặp lại 5: di chuyển 60 bước, xoay ↺ 72 độ” sẽ vẽ hình gì?", type: "multiple-choice",
            options: ["Tam giác đều", "Ngũ giác đều", "Hình vuông", "Hình tròn"],
            answer: 1, explanation: "Lặp 5 lần, mỗi lần xoay 72 độ (5 × 72 = 360) → ngũ giác đều.", level: "van-dung-cao", activity: "tong-ket" },
          { question: "Sắp xếp đúng quy trình giải quyết bài toán vẽ hình bằng máy tính:", type: "multiple-choice",
            options: ["Viết chương trình → chạy thử → xác định thuật toán", "Chạy thử → viết chương trình → xác định thuật toán", "Xác định thuật toán (các bước) → viết chương trình theo thuật toán → chạy thử, kiểm tra, sửa lỗi", "Chỉ cần chạy thử nhiều lần"],
            answer: 2, explanation: "Từ thuật toán đến chương trình: mô tả các bước, chuyển thành lệnh, rồi chạy thử để kiểm tra và sửa lỗi.", level: "van-dung-cao", activity: "tong-ket" },
        ],
      },
    },
  ],
};

if (typeof module !== "undefined" && module.exports) module.exports = LESSON;
if (typeof window !== "undefined") window.LESSON = LESSON;
