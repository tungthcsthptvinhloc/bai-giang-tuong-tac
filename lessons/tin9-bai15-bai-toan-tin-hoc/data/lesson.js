/* ============================================================================
 * BÀI 15 — BÀI TOÁN TIN HỌC  (Tin học 9 — Kết nối tri thức)
 * Chủ đề 5: Giải quyết vấn đề với sự trợ giúp của máy tính.
 * Bám sát SGK trang 79–82 + Kế hoạch bài dạy (2 tiết) của giáo viên.
 * Chỉ sửa file này để đổi nội dung. Engine app.js không cần sửa.
 * Máy chạy thuật toán (activity.algo): liệt kê các bước, nhập dữ liệu, rẽ nhánh, lặp (nhảy bước), bảng biến.
 * ==========================================================================*/

// ---- Máy chạy thuật toán tính lương (theo sơ đồ khối Hình 15.3) ----
const ALGO_LUONG = {
  title: "Máy chạy thuật toán tính lương", intro: "Bấm ▶ Bước tiếp; khi máy hỏi thì nhập mức lương theo giờ (nghìn đồng) và số giờ làm việc trong tuần. Thử số giờ ngoài 1–60 để thấy máy yêu cầu nhập lại.",
  vars: ["muc_luong", "tgian_laodong", "tgian_dmuc", "tgian_vuot", "luong_dmuc", "luong_vuot", "tien_luong"],
  samples: [
    { label: "30 nghìn/giờ, 45 giờ", values: { muc_luong: [30], tgian_laodong: [45] } },
    { label: "30 nghìn/giờ, 38 giờ", values: { muc_luong: [30], tgian_laodong: [38] } },
    { label: "20 nghìn/giờ, nhập 70 rồi 60 giờ", values: { muc_luong: [20], tgian_laodong: [70, 60] } },
  ],
  lines: [
    { n: "1.", text: "Bắt đầu", op: "start" },
    { n: "2.", text: "Nhập muc_luong", op: "input", v: "muc_luong", prompt: "Nhập muc_luong (nghìn đồng/giờ)", min: 0 },
    { id: "L3", n: "3.", text: "Nhập tgian_laodong", op: "input", v: "tgian_laodong", prompt: "Nhập tgian_laodong (giờ)" },
    { n: "4.", text: "Nếu 1 ≤ tgian_laodong ≤ 60 sai thì quay lại bước 3", op: "if", c: "1 <= tgian_laodong and tgian_laodong <= 60", no: "L3" },
    { n: "5.", text: "Nếu tgian_laodong > 40 thì", op: "if", c: "tgian_laodong > 40", no: "L5b" },
    { n: "", indent: 1, text: "tgian_dmuc ← 40;  tgian_vuot ← tgian_laodong − 40", op: "set", sets: [["tgian_dmuc", "40"], ["tgian_vuot", "tgian_laodong - 40"]], next: "L6" },
    { n: "", text: "ngược lại", op: "label" },
    { id: "L5b", n: "", indent: 1, text: "tgian_dmuc ← tgian_laodong;  tgian_vuot ← 0", op: "set", sets: [["tgian_dmuc", "tgian_laodong"], ["tgian_vuot", "0"]] },
    { id: "L6", n: "6.", text: "luong_dmuc ← tgian_dmuc * muc_luong", op: "set", sets: [["luong_dmuc", "tgian_dmuc * muc_luong"]] },
    { n: "", indent: 1, text: "luong_vuot ← tgian_vuot * muc_luong * 1,5", op: "set", sets: [["luong_vuot", "tgian_vuot * muc_luong * 1.5"]] },
    { n: "", indent: 1, text: "tien_luong ← luong_dmuc + luong_vuot", op: "set", sets: [["tien_luong", "luong_dmuc + luong_vuot"]] },
    { n: "7.", text: "Xuất tien_luong", op: "output", out: "tien_luong = {tien_luong} (nghìn đồng)" },
    { n: "8.", text: "Kết thúc", op: "end" },
  ],
};

// ---- Máy chạy thuật toán tìm số lớn nhất (Hình 15.4a) ----
const ALGO_MAX = {
  title: "Máy chạy thuật toán tìm số lớn nhất", intro: "Bấm ▶ Bước tiếp; mỗi lần máy hỏi thì nhập một số nguyên dương, nhập 0 để kết thúc. Hoặc chọn một bộ dữ liệu mẫu rồi bấm ⏩ Chạy hết.",
  vars: ["x", "max"],
  samples: [
    { label: "5, 12, 7, 0", values: { x: [5, 12, 7, 0] } },
    { label: "Chỉ nhập 0", values: { x: [0] } },
    { label: "−3, 8, 2, 0", values: { x: [-3, 8, 2, 0] } },
  ],
  lines: [
    { n: "1.", text: "Bắt đầu", op: "start" },
    { n: "2.", text: "max ← 0", op: "set", sets: [["max", "0"]] },
    { n: "3.", text: "Nhập x", op: "input", v: "x", int: true },
    { id: "L4", n: "4.", text: "Lặp cho đến khi x = 0", op: "if", c: "x = 0", yes: "L5" },
    { n: "4.1.", indent: 1, text: "Nếu x > max thì", op: "if", c: "x > max", no: "L42" },
    { n: "", indent: 2, text: "max ← x", op: "set", sets: [["max", "x"]] },
    { id: "L42", n: "4.2.", indent: 1, text: "Nhập x", op: "input", v: "x", int: true, next: "L4" },
    { id: "L5", n: "5.", text: "Nếu max = 0 thì", op: "if", c: "max = 0", no: "L5b" },
    { n: "", indent: 2, text: "xuất “Không có dữ liệu”", op: "output", out: "Không có dữ liệu!", next: "L6" },
    { n: "", indent: 1, text: "ngược lại", op: "label" },
    { id: "L5b", n: "", indent: 2, text: "xuất max", op: "output", e: "max" },
    { id: "L6", n: "6.", text: "Kết thúc", op: "end" },
  ],
};

// ---- Máy kiểm tra số nguyên tố (theo sơ đồ khối trong giáo án, các bước b.1–b.7) ----
const ALGO_SNT = {
  title: "Máy kiểm tra số nguyên tố", intro: "Nhập một số nguyên dương N; quan sát máy thử từng giá trị i (bắt đầu từ 2) cho đến khi gặp ước của N.",
  vars: ["N", "i"],
  samples: [{ label: "N = 7", values: { N: [7] } }, { label: "N = 9", values: { N: [9] } }, { label: "N = 1", values: { N: [1] } }, { label: "N = 2", values: { N: [2] } }],
  lines: [
    { n: "", text: "Bắt đầu", op: "start" },
    { n: "b.1", text: "Nhập N", op: "input", v: "N", int: true, min: 1, prompt: "Nhập N (số nguyên dương)" },
    { n: "b.2", text: "Nếu N = 1 thì thông báo N không là SNT", op: "if", c: "N = 1", yes: "KHONG" },
    { n: "b.3", text: "Nếu N < 4 thì thông báo N là SNT", op: "if", c: "N < 4", yes: "LA" },
    { n: "b.4", text: "i ← 2", op: "set", sets: [["i", "2"]] },
    { id: "B5", n: "b.5", text: "Nếu i là ước của N (N mod i = 0) thì chuyển đến b.7", op: "if", c: "N mod i = 0", yes: "B7" },
    { n: "b.6", text: "i ← i + 1, quay lại b.5", op: "set", sets: [["i", "i + 1"]], next: "B5" },
    { id: "B7", n: "b.7", text: "Nếu i = N thì N là SNT, ngược lại N không là SNT", op: "if", c: "i = N", yes: "LA", no: "KHONG" },
    { id: "LA", n: "", indent: 1, text: "Thông báo N là số nguyên tố", op: "output", out: "{N} là số nguyên tố", next: "HET" },
    { id: "KHONG", n: "", indent: 1, text: "Thông báo N không là số nguyên tố", op: "output", out: "{N} không là số nguyên tố" },
    { id: "HET", n: "", text: "Kết thúc", op: "end" },
  ],
};

// ---- Máy chạy thuật toán sắp xếp nổi bọt (so sánh từ cuối dãy như SGK Tin 7 Bài 16) ----
const ALGO_NOI_BOT = {
  title: "Máy chạy thuật toán sắp xếp nổi bọt", intro: "Nhập dãy số (cách nhau bởi dấu phẩy) hoặc chọn dãy mẫu; quan sát i, j và dãy a thay đổi sau mỗi bước.",
  vars: ["a", "N", "i", "j"],
  samples: [{ label: "3, 1, 2", values: { a: [[3, 1, 2]] } }, { label: "5, 2, 4, 1, 3", values: { a: [[5, 2, 4, 1, 3]] } }],
  lines: [
    { n: "1.", text: "Bắt đầu", op: "start" },
    { n: "2.", text: "Nhập dãy a gồm N số", op: "input", v: "a", list: true, len: "N", prompt: "Nhập dãy a" },
    { n: "3.", text: "i ← 1", op: "set", sets: [["i", "1"]] },
    { id: "L4", n: "4.", text: "Lặp khi i ≤ N − 1", op: "if", c: "i <= N - 1", no: "L8" },
    { n: "4.1.", indent: 1, text: "j ← N", op: "set", sets: [["j", "N"]] },
    { id: "L42", n: "4.2.", indent: 1, text: "Lặp khi j > i", op: "if", c: "j > i", no: "L43" },
    { n: "", indent: 2, text: "Nếu a[j] < a[j−1] thì đổi chỗ a[j] và a[j−1]", op: "if", c: "a[j] < a[j-1]", no: "LJ" },
    { n: "", indent: 3, text: "Đổi chỗ a[j] và a[j−1]", op: "swap", swap: ["a[j]", "a[j-1]"] },
    { id: "LJ", n: "", indent: 2, text: "j ← j − 1", op: "set", sets: [["j", "j - 1"]], next: "L42" },
    { id: "L43", n: "4.3.", indent: 1, text: "i ← i + 1", op: "set", sets: [["i", "i + 1"]], next: "L4" },
    { id: "L8", n: "5.", text: "Xuất dãy a", op: "output", out: "Dãy đã sắp xếp: {a}" },
    { n: "6.", text: "Kết thúc", op: "end" },
  ],
};

// ---- Sơ đồ khối sắp xếp nổi bọt (vẽ lại, đúng thuật toán) ----
const T = (x, y, t, fs) => `<text x="${x}" y="${y + 5}" text-anchor="middle" font-size="${fs || 14}" font-family="Segoe UI,Arial">${t}</text>`;
const term = (x, y, t) => `<ellipse cx="${x}" cy="${y}" rx="62" ry="18" fill="#fbcfe8" stroke="#be185d" stroke-width="2"/>${T(x, y, t)}`;
const proc = (x, y, w, t) => `<rect x="${x - w / 2}" y="${y - 18}" width="${w}" height="36" rx="4" fill="#fef9c3" stroke="#a16207" stroke-width="2"/>${T(x, y, t)}`;
const io = (x, y, w, t) => `<polygon points="${x - w / 2 + 14},${y - 18} ${x + w / 2 + 14},${y - 18} ${x + w / 2 - 14},${y + 18} ${x - w / 2 - 14},${y + 18}" fill="#99f6e4" stroke="#0f766e" stroke-width="2"/>${T(x, y, t)}`;
const cond = (x, y, w, h, t) => `<polygon points="${x},${y - h / 2} ${x + w / 2},${y} ${x},${y + h / 2} ${x - w / 2},${y}" fill="#d9f99d" stroke="#4d7c0f" stroke-width="2"/>${T(x, y, t)}`;
const ln = (pts, arrow) => `<polyline points="${pts}" fill="none" stroke="#334155" stroke-width="2"${arrow === false ? "" : ' marker-end="url(#ah-nb)"'}/>`;
const lb = (x, y, t) => `<text x="${x}" y="${y}" font-size="13" font-weight="700" fill="${t === "Đúng" ? "#15803d" : "#b91c1c"}" font-family="Segoe UI,Arial">${t}</text>`;
const SO_DO_NOI_BOT = `<div style="text-align:center"><svg viewBox="0 0 540 670" style="max-width:520px;width:100%;background:#fff;border-radius:12px" role="img" aria-label="Sơ đồ khối sắp xếp nổi bọt">
  <defs><marker id="ah-nb" viewBox="0 0 10 8" markerWidth="5" markerHeight="4" refX="9" refY="4" orient="auto"><path d="M0,0 L10,4 L0,8 z" fill="#334155"/></marker></defs>
  ${term(230, 30, "Bắt đầu")}${ln("230,48 230,70")}
  ${io(230, 90, 190, "Nhập dãy a gồm N số")}${ln("230,108 230,130")}
  ${proc(230, 150, 110, "i ← 1")}${ln("230,168 230,191")}
  ${cond(230, 225, 180, 66, "i ≤ N − 1 ?")}${ln("230,258 230,280")}${lb(238, 274, "Đúng")}
  ${ln("320,225 470,225 470,280")}${lb(330, 216, "Sai")}
  ${io(470, 300, 120, "Xuất dãy a")}${ln("470,318 470,352")}${term(470, 372, "Kết thúc")}
  ${proc(230, 300, 110, "j ← N")}${ln("230,318 230,344")}
  ${cond(230, 375, 150, 62, "j > i ?")}${ln("230,406 230,436")}${lb(238, 426, "Đúng")}
  ${ln("155,375 112,375")}${lb(118, 366, "Sai")}
  ${proc(62, 375, 96, "i ← i + 1")}${ln("62,357 62,225 138,225")}
  ${cond(230, 470, 200, 66, "a[j] < a[j−1] ?")}${ln("230,503 230,530")}${lb(238, 522, "Đúng")}
  ${ln("330,470 352,470 352,594 232,594", false)}${lb(334, 461, "Sai")}
  ${proc(230, 548, 190, "Đổi chỗ a[j] và a[j−1]")}${ln("230,566 230,610")}
  ${proc(230, 628, 130, "j ← j − 1")}${ln("295,628 392,628 392,375 307,375")}
</svg><div style="color:#475569;font-style:italic">Sơ đồ khối thuật toán sắp xếp nổi bọt (dãy tăng dần, so sánh từ cuối dãy)</div></div>`;

// ---- Quy trình giải bài toán tin học (vẽ lại) ----
const QT = [["1", "Xác định bài toán", "đầu vào, đầu ra", "#4338ca"], ["2", "Xây dựng thuật toán", "chia nhỏ, sắp thứ tự các bước", "#0891b2"], ["3", "Cài đặt thuật toán", "viết thành chương trình", "#16a34a"], ["4", "Gỡ lỗi và hiệu chỉnh", "chạy thử với nhiều dữ liệu, sửa lỗi", "#d97706"]];
const QUY_TRINH_HTML = `<div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:center;align-items:stretch">${QT.map(([n, t, d, c], i) =>
  `<div style="flex:1 1 170px;max-width:230px;border:3px solid ${c};border-radius:16px;padding:10px;background:#fff;text-align:center">
    <div style="width:38px;height:38px;border-radius:50%;background:${c};color:#fff;font-weight:800;font-size:1.3rem;line-height:38px;margin:0 auto 6px">${n}</div>
    <b style="color:${c}">${t}</b><div style="font-size:.9rem;color:#475569;margin-top:4px">${d}</div></div>${i < 3 ? '<div style="align-self:center;font-size:1.6rem;color:#94a3b8">➜</div>' : ""}`).join("")}</div>`;

// ---- Đầu vào → Tính lương → Đầu ra (Hình 15.2 vẽ lại) ----
const IO_HTML = `<div style="display:flex;flex-wrap:wrap;gap:14px;align-items:center;justify-content:center;font-size:1.15rem">
  <div style="border:3px solid #0f766e;background:#ccfbf1;border-radius:14px;padding:8px 16px;text-align:center"><b>📥 Đầu vào</b><br><code>muc_luong</code>, <code>tgian_laodong</code></div>
  <div style="font-size:1.8rem">➜</div>
  <div style="border:3px solid #4338ca;background:#e0e7ff;border-radius:14px;padding:14px 22px;font-weight:800">💻 Tính lương</div>
  <div style="font-size:1.8rem">➜</div>
  <div style="border:3px solid #d97706;background:#fef3c7;border-radius:14px;padding:8px 16px;text-align:center"><b>📤 Đầu ra</b><br><code>tien_luong</code></div>
</div>`;

const LESSON = {
  meta: {
    subject: "Tin học", grade: "9", book: "Kết nối tri thức với cuộc sống",
    title: "Bài 15: Bài toán tin học", unit: "Chủ đề 5 — Giải quyết vấn đề với sự trợ giúp của máy tính",
    pages: "79–82", durationMinutes: 90,
  },
  objectives: {
    knowledge: [
      "Giải thích được trong quy trình giải quyết vấn đề có những bước (những vấn đề nhỏ hơn) có thể chuyển giao cho máy tính thực hiện, nêu được ví dụ minh hoạ.",
      "Giải thích được khái niệm bài toán trong tin học là một nhiệm vụ có thể giao cho máy tính thực hiện, nêu được ví dụ minh hoạ.",
      "Nêu được quy trình con người giao bài toán cho máy tính giải quyết.",
    ],
    competencies: [
      "Tự chủ và tự học; giao tiếp và hợp tác; giải quyết vấn đề và sáng tạo (nêu thêm ví dụ về bài toán tin học).",
      "Năng lực số 3.4.TC2a: xác định trình tự hợp lí các bước giải bài toán tin học (đầu vào, xử lí, đầu ra); thể hiện bằng liệt kê các bước hoặc sơ đồ khối.",
      "Năng lực số 5.3.TC2a: máy tính chỉ thực hiện công việc theo chương trình/thuật toán do con người xây dựng; kết quả phụ thuộc vào thuật toán và chương trình.",
      "Năng lực số 5.2.TC2b: nhận biết tình huống có thể chuyển thành bài toán tin học và tình huống không phù hợp để máy tính giải quyết.",
      "Năng lực AI 9.D1.1: xác định được một vấn đề thực tế có thể giải quyết bằng AI và lập được kế hoạch sơ bộ.",
    ],
    qualities: ["Chăm chỉ, trung thực, trách nhiệm trong học tập và hoạt động nhóm."],
  },
  coreKnowledge: [
    "Trong quy trình giải quyết vấn đề có những bước (những vấn đề nhỏ hơn) có thể chuyển giao cho máy tính thực hiện — ví dụ bước tính toán tiền lương.",
    "Bài toán tin học là một nhiệm vụ có thể giao cho máy tính thực hiện. Bài toán đó được xác định bởi dữ liệu đã biết (đầu vào), dữ liệu cần tìm (đầu ra).",
    "Quy trình giải một bài toán tin học gồm các bước: 1) Xác định bài toán; 2) Xây dựng thuật toán; 3) Cài đặt thuật toán; 4) Gỡ lỗi và hiệu chỉnh chương trình.",
    "Thuật toán được mô tả bằng các cấu trúc điều khiển cơ bản: tuần tự, rẽ nhánh và lặp.",
  ],
  keywords: ["Bài toán tin học", "Đầu vào", "Đầu ra", "Thuật toán", "Gỡ lỗi"],
  settings: { basePoints: 100, useTimer: false, defaultTime: 60, sound: true, streakEnabled: true },

  activities: [
    /* =========================== TIẾT 1 =========================== */
    /* ===================== HĐ1: MỞ ĐẦU (5 phút) ===================== */
    {
      id: "mo-dau", name: "Mở đầu — Trò chơi “Ai nhanh hơn” ⚡", type: "knowledge",
      goal: "Nhận ra nhiều nhiệm vụ thực tế (như tính lương) có thể chuyển thành bài toán và giao cho máy tính thực hiện.",
      time: 300,
      task: "Chia lớp thành 2 nhóm: mỗi nhóm cử một bạn lên bảng kể tên các thông tin cần có trong bảng lương để tính được lương cho một nhân viên. Nhóm kể được nhiều thông tin hơn thắng!",
      sgkImage: "assets/sgk/sgk-trang79.jpg",
      content: {
        heading: "⚡ Tính lương cho một nhân viên cần những gì?",
        prompt: "Tính lương là một phần của những vấn đề mà doanh nghiệp cần phải giải quyết. Việc trả lương thoả đáng và kịp thời thể hiện tính chuyên nghiệp và có trách nhiệm của doanh nghiệp, đem lại sự hài lòng cho nhân viên, động viên họ làm việc chăm chỉ, đạt hiệu quả cao.",
      },
      questions: [
        { question: "Theo Hoạt động 2 (SGK tr.79), để tính lương tuần của một nhân viên cần những thông tin nào? (Chọn tất cả đáp án đúng)", type: "multiple-select",
          options: ["Mức lương theo giờ", "Màu áo đồng phục", "Số giờ làm việc trong tuần", "Định mức làm việc (40 giờ/tuần) và mức trả cho giờ vượt định mức"],
          answer: [0, 2, 3], explanation: "Tiền lương phụ thuộc mức lương theo giờ, số giờ làm việc; giờ vượt định mức 40 giờ được trả gấp 1,5 lần.", level: "thong-hieu", activity: "mo-dau" },
        { question: "Máy tính có thể tự tính lương đúng nếu con người KHÔNG mô tả cách tính cho nó không?", type: "multiple-choice",
          options: ["Có, máy tính tự suy nghĩ được", "Không, máy tính chỉ thực hiện đúng những gì đã được mô tả trong chương trình", "Có, nếu máy tính đủ mạnh", "Có, nếu có Internet"],
          answer: 1, explanation: "Con người phải xác định bài toán, xây dựng thuật toán; máy tính thực hiện các bước theo chương trình.", level: "thong-hieu", activity: "mo-dau" },
      ],
    },

    /* ===================== HĐ2.1: BÀI TOÁN TIN HỌC (30 phút) ===================== */
    {
      id: "hd1-quy-trinh", name: "Hoạt động 1: Nhiệm vụ của máy tính 🧾", type: "knowledge",
      goal: "Nhận ra bước nào trong quy trình thanh toán tiền lương có thể giao cho máy tính thực hiện.",
      time: 420,
      task: "Phiếu học tập số 1 (nhóm): đọc Hoạt động 1, quan sát Hình 15.1 (SGK tr.79). Theo em, bước nào trong quy trình đó có thể giao cho máy tính thực hiện?",
      sgkImage: "assets/sgk/hinh-15-1.jpg",
      content: {
        heading: "🧾 Quy trình thanh toán tiền lương",
        prompt: "Với những doanh nghiệp lớn có nhiều loại hình lao động, việc thanh toán tiền lương cần phải tuân theo một quy trình chặt chẽ giữa các bộ phận.",
        revealLabel: "🖼️ Hình 15.1 & nhận xét",
        blocks: [
          { kind: "image", value: "assets/sgk/hinh-15-1.jpg", caption: "Hình 15.1. Quy trình thanh toán tiền lương" },
          { kind: "list", value: ["Mỗi quy trình thanh toán tiền lương là một giải pháp để doanh nghiệp giải quyết vấn đề trả lương cho người lao động, đồng thời lưu trữ đủ dữ liệu để tính toán hiệu quả kinh doanh và đối chiếu khi cần thiết.", "Trong quy trình, bước tính toán tiền lương thường được giao cho máy tính thực hiện.", "Trong quy trình giải quyết vấn đề có những bước (những vấn đề nhỏ hơn) có thể chuyển giao cho máy tính thực hiện."] },
        ],
      },
      questions: [
        { question: "Phiếu 1: Theo SGK, bước nào trong quy trình Hình 15.1 thường được giao cho máy tính thực hiện?", type: "multiple-choice", sgkImage: "assets/sgk/hinh-15-1.jpg",
          options: ["Chấm công", "Tính toán tiền lương", "Thanh toán tiền lương", "Bắt đầu"],
          answer: 1, explanation: "Bước tính toán tiền lương thường được giao cho máy tính thực hiện. (Máy tính cũng có thể hỗ trợ lập phiếu chi, lưu hồ sơ.)", level: "nhan-biet", activity: "hd1-quy-trinh" },
        { question: "Từ Hoạt động 1, em rút ra nhận xét nào?", type: "multiple-choice",
          options: ["Máy tính làm được toàn bộ mọi việc của doanh nghiệp", "Máy tính không giúp được gì trong quy trình trả lương", "Trong quy trình giải quyết vấn đề có những bước (vấn đề nhỏ hơn) có thể chuyển giao cho máy tính thực hiện", "Chỉ cần máy tính là trả được lương"],
          answer: 2, explanation: "Có những bước (những vấn đề nhỏ hơn) trong quy trình có thể chuyển giao cho máy tính.", level: "thong-hieu", activity: "hd1-quy-trinh" },
      ],
    },
    {
      id: "sap-xep-quy-trinh", name: "Sắp xếp quy trình thanh toán tiền lương 🔢", type: "ordering",
      goal: "Nhớ thứ tự các bước của quy trình thanh toán tiền lương (Hình 15.1).",
      time: 120,
      task: "Ghép các hình khối thành sơ đồ quy trình thanh toán tiền lương như Hình 15.1 rồi bấm Nộp bài.",
      steps: ["Bắt đầu", "Chấm công", "Tính toán tiền lương", "Lập phiếu chi lương", "Thanh toán tiền lương", "Lưu hồ sơ", "Kết thúc"],
      flow: ["term", "proc", "proc", "proc", "proc", "proc", "term"],
      explanation: "Bắt đầu → Chấm công → Tính toán tiền lương → Lập phiếu chi lương → Thanh toán tiền lương → Lưu hồ sơ → Kết thúc.",
    },
    {
      id: "hd2-tinh-luong", name: "Hoạt động 2: Bài toán tính lương 💰", type: "knowledge",
      goal: "Xác định dữ liệu đã biết và dữ liệu cần tìm của bài toán tính lương; hiểu khái niệm bài toán tin học.",
      time: 600,
      task: "Phiếu học tập số 2 (nhóm): đọc Hoạt động 2, quan sát Hình 15.2 (SGK tr.79–80). Trình bày các bước giải quyết vấn đề tính lương của công ti; xác định đầu vào, đầu ra.",
      sgkImage: "assets/sgk/hoat-dong-2.jpg",
      content: {
        heading: "💰 Bài toán tính lương",
        prompt: "Hằng tuần, một công ti phải tính lương cho các nhân viên. Tiền lương theo tuần phụ thuộc vào mức lương theo giờ và số giờ làm việc mỗi tuần. Số giờ lao động tối thiểu là một giờ và tối đa là 60 giờ mỗi tuần. Định mức làm việc là 40 giờ/tuần. Mỗi giờ vượt định mức được trả gấp 1,5 lần mức lương.",
        revealLabel: "📥 Đầu vào – Đầu ra (Hình 15.2)",
        blocks: [
          { kind: "html", value: IO_HTML },
          { kind: "list", value: ["Sau khi lược bỏ những bước không cần sử dụng máy tính như chấm công hay xây dựng công thức tính toán,… chỉ còn lại bài toán tính toán. Bài toán đó có thể giao cho máy tính thực hiện nên còn được gọi là bài toán tin học.", "Đầu vào là những giá trị cho trước. Ví dụ: mức lương và số giờ làm việc trong tuần của một nhân viên.", "Đầu ra là giá trị phải tìm hoặc kết quả của hành động. Ví dụ: tiền lương theo tuần của nhân viên đó."] },
        ],
      },
      questions: [
        { question: "Phiếu 2: Các bước giải quyết vấn đề tính lương của công ti là:", type: "multiple-choice",
          options: ["Tính lương → Xác định đầu vào → Đầu ra", "Xác định đầu vào (mức lương, thời gian lao động) → Tính lương → Đầu ra (tiền lương)", "Chấm công → Thanh toán → Lưu hồ sơ", "Đầu ra → Tính lương → Đầu vào"],
          answer: 1, explanation: "Bước 1: đầu vào mức lương, thời gian lao động; Bước 2: tính lương; Bước 3: đầu ra tiền lương.", level: "thong-hieu", activity: "hd2-tinh-luong" },
        { question: "Trong bài toán tính lương, đầu vào là:", type: "multiple-choice",
          options: ["tien_luong", "muc_luong và tgian_laodong", "Định mức 40 giờ", "Phiếu chi lương"],
          answer: 1, explanation: "Đầu vào: mức lương (muc_luong) và số giờ làm việc trong tuần (tgian_laodong). Đầu ra: tien_luong.", level: "nhan-biet", activity: "hd2-tinh-luong" },
        { question: "Nhân viên có mức lương 30 nghìn đồng/giờ, làm 45 giờ trong tuần. Tiền lương tuần là bao nhiêu?", type: "multiple-choice",
          options: ["1,350 nghìn đồng", "1,425 nghìn đồng", "2,025 nghìn đồng", "1,200 nghìn đồng"],
          answer: 1, explanation: "40 × 30 = 1,200; 5 giờ vượt × 30 × 1,5 = 225 → 1,425 nghìn đồng.", level: "van-dung", activity: "hd2-tinh-luong" },
        { question: "Vì sao số giờ lao động 70 giờ/tuần không được chấp nhận?", type: "multiple-choice",
          options: ["Vì số giờ lao động tối đa là 60 giờ mỗi tuần", "Vì phải là số chẵn", "Vì định mức là 40 giờ", "Vì 70 lớn hơn mức lương"],
          answer: 0, explanation: "Đề bài: số giờ lao động tối thiểu 1 giờ, tối đa 60 giờ mỗi tuần.", level: "thong-hieu", activity: "hd2-tinh-luong" },
      ],
      remember: ["Bài toán tin học là một nhiệm vụ có thể giao cho máy tính thực hiện. Bài toán đó được xác định bởi dữ liệu đã biết (đầu vào), dữ liệu cần tìm (đầu ra)."],
    },
    {
      id: "vi-du-bai-toan", name: "Ví dụ bài toán tin học — Đầu vào, đầu ra 🔍", type: "knowledge",
      goal: "Mô tả đầu vào, đầu ra của một số bài toán tin học; biết đầu vào, đầu ra không chỉ là số.",
      time: 360,
      task: "Nhóm 1 (câu hỏi SGK tr.80): mô tả đầu vào và đầu ra của bài toán xác định một số nguyên dương có phải số nguyên tố hay không. Cả lớp tìm hiểu thêm các ví dụ SGK tr.80.",
      sgkImage: "assets/sgk/sgk-trang80.jpg",
      content: {
        heading: "🔍 Một số bài toán tin học (SGK tr.80)",
        revealLabel: "📖 Các ví dụ",
        blocks: [{ kind: "list", value: [
          "Giải phương trình ax² + bx + c = 0: đầu vào là các hệ số a, b, c; đầu ra là nghiệm của phương trình (nếu có) hoặc thông báo “phương trình vô nghiệm”.",
          "Tính ước số chung lớn nhất của hai số nguyên: đầu vào là hai số nguyên a và b; đầu ra là ước số chung lớn nhất của a và b (nếu chúng không đồng thời bằng 0) hoặc thông báo “không có ước chung lớn nhất” (nếu a = b = 0).",
          "Máy tính còn xử lí văn bản, hình ảnh, âm thanh,… Dịch từ tiếng Việt sang tiếng Anh: đầu vào là văn bản (câu) tiếng Việt; đầu ra là văn bản (câu) tiếng Anh tương ứng dưới dạng văn bản hoặc âm thanh.",
        ] }],
      },
      questions: [
        { question: "Câu hỏi SGK: Bài toán xác định một số nguyên dương có phải số nguyên tố hay không có đầu vào, đầu ra là:", type: "multiple-choice",
          options: ["Đầu vào: một số nguyên dương; Đầu ra: thông báo số đó là (hoặc không là) số nguyên tố", "Đầu vào: danh sách các số nguyên tố; Đầu ra: một số nguyên dương", "Đầu vào: số 2; Đầu ra: số 3", "Đầu vào: thông báo; Đầu ra: một số nguyên dương"],
          answer: 0, explanation: "Đầu vào: một số nguyên dương. Đầu ra: kết quả số đó có hoặc không là số nguyên tố.", level: "thong-hieu", activity: "vi-du-bai-toan" },
        { question: "Bài toán tìm ước chung lớn nhất của a và b. Nếu a = b = 0 thì đầu ra là:", type: "multiple-choice",
          options: ["0", "1", "Thông báo “không có ước chung lớn nhất”", "Máy báo lỗi và tắt"],
          answer: 2, explanation: "SGK: đầu ra là thông báo “không có ước chung lớn nhất” nếu a = b = 0.", level: "thong-hieu", activity: "vi-du-bai-toan" },
        { question: "Bài toán dịch từ tiếng Việt sang tiếng Anh cho thấy điều gì?", type: "multiple-choice",
          options: ["Máy tính chỉ xử lí được số", "Đầu vào và đầu ra của bài toán tin học không chỉ là các số (có thể là văn bản, âm thanh…)", "Bài toán này không phải bài toán tin học", "Đầu vào là âm thanh tiếng Anh"],
          answer: 1, explanation: "Máy tính xử lí cả văn bản, hình ảnh, âm thanh… nên đầu vào, đầu ra không chỉ là các số.", level: "thong-hieu", activity: "vi-du-bai-toan" },
      ],
    },
    {
      id: "phan-loai-bai-toan", name: "Trò chơi: Bài toán tin học hay không? 🎯", type: "dragdrop",
      goal: "Phân biệt nhiệm vụ có thể giao cho máy tính (bài toán tin học) với thông tin, sự kiện, hiện tượng không phải bài toán tin học.",
      time: 240,
      task: "Nhiệm vụ 3 (nhóm): xếp mỗi tình huống vào đúng nhóm. Bài toán tin học là nhiệm vụ giao được cho máy tính, xác định được đầu vào và đầu ra. Xếp hết rồi bấm Nộp bài.",
      groups: ["💻 Bài toán tin học", "🚫 Không phải bài toán tin học"],
      items: [
        { text: "Xác định một số nguyên dương có phải số nguyên tố không", group: 0 },
        { text: "Tính lương tuần từ mức lương theo giờ và số giờ làm việc", group: 0 },
        { text: "Tìm số lớn nhất trong các số nhập từ bàn phím", group: 0 },
        { text: "Sắp xếp một dãy số theo thứ tự tăng dần", group: 0 },
        { text: "Dịch một câu tiếng Việt sang tiếng Anh", group: 0 },
        { text: "“Ngày 30/04/1975 giải phóng miền Nam, thống nhất đất nước” — một sự kiện lịch sử", group: 1 },
        { text: "Hoạt động của hệ bài tiết trong cơ thể người — một quá trình sinh học", group: 1 },
        { text: "“Nhiệt độ ngoài trời hôm nay là 32°C” — một thông tin", group: 1 },
      ],
      explanation: "Bài toán tin học là một nhiệm vụ giao cho máy tính thực hiện, có đầu vào và đầu ra xác định. Một sự kiện, một quá trình tự nhiên hay một câu thông báo thông tin không phải là nhiệm vụ để máy tính giải.",
    },

    /* =========================== TIẾT 2 =========================== */
    /* ===================== HĐ2.2: GIẢI BÀI TOÁN TIN HỌC (30 phút) ===================== */
    {
      id: "hd3-giai-bai-toan", name: "Hoạt động 3: Tính lương bằng máy tính — quy trình 4 bước 🛠️", type: "knowledge",
      goal: "Nêu được quy trình giải bài toán tin học qua bài toán tính lương.",
      time: 600,
      task: "Phiếu học tập số 3 (nhóm): nêu các bước để chuyển bài toán tính lương (Hoạt động 2) cho máy tính thực hiện bằng cách lập chương trình. Đọc SGK tr.80–81, quan sát Hình 15.3.",
      sgkImage: "assets/sgk/hinh-15-3.jpg",
      content: {
        heading: "🛠️ Giải bài toán tin học",
        prompt: "Việc giải một bài toán tin học cũng trải qua những bước tương tự quá trình giải quyết vấn đề được nêu trong Bài 14.",
        revealLabel: "📖 4 bước & Hình 15.3",
        blocks: [
          { kind: "html", value: QUY_TRINH_HTML },
          { kind: "list", value: [
            "1) Xác định bài toán: đầu vào là muc_luong và tgian_laodong; đầu ra là tien_luong.",
            "2) Xây dựng thuật toán: chia bài toán thành những bài toán nhỏ — (1) cần qua những bước nào? (2) các bước thực hiện theo thứ tự nào? Bước 1. Nhập đầu vào; Bước 2. Xử lí để tính tien_luong; Bước 3. Xuất tien_luong. Chia nhỏ đến khi mỗi bước thành một câu lệnh máy tính thực hiện được; chỉ dùng cấu trúc tuần tự, rẽ nhánh và lặp.",
            "3) Cài đặt thuật toán: cài đặt thành chương trình máy tính là bước thực hiện giải pháp; có thể bổ sung biến (luong_dmuc, luong_vuot) lưu giá trị trung gian.",
            "4) Gỡ lỗi và hiệu chỉnh chương trình: chạy chương trình với những dữ liệu khác nhau, gỡ lỗi và hiệu chỉnh để chương trình chạy tốt.",
          ] },
          { kind: "image", value: "assets/sgk/hinh-15-3.jpg", caption: "Hình 15.3. Thuật toán tính lương" },
        ],
      },
      questions: [
        { question: "Thuật toán cần được mô tả chỉ bằng những cấu trúc điều khiển cơ bản nào?", type: "multiple-choice",
          options: ["Tuần tự, rẽ nhánh và lặp", "Chỉ tuần tự", "Chỉ lặp", "Sao chép và dán"],
          answer: 0, explanation: "Thuật toán cần được mô tả bằng cách chỉ sử dụng những cấu trúc điều khiển cơ bản: tuần tự, rẽ nhánh và lặp.", level: "nhan-biet", activity: "hd3-giai-bai-toan" },
        { question: "Trong Hình 15.3, nếu nhập tgian_laodong không thoả mãn 1 ≤ tgian_laodong ≤ 60 thì:", type: "multiple-choice",
          options: ["Máy tính tự sửa thành 40", "Thuật toán kết thúc ngay", "Quay lại nhập tgian_laodong", "Tính lương bằng 0"],
          answer: 2, explanation: "Nhánh “sai” quay lại bước Nhập tgian_laodong — đây là cấu trúc lặp.", level: "thong-hieu", activity: "hd3-giai-bai-toan" },
        { question: "Câu hỏi SGK tr.82: bước nào trong quy trình giải bài toán tin học tương ứng với bước thực hiện giải pháp trong giải quyết vấn đề?", type: "multiple-choice",
          options: ["Xác định bài toán", "Xây dựng thuật toán", "Cài đặt thuật toán", "Gỡ lỗi và hiệu chỉnh chương trình"],
          answer: 2, explanation: "SGK: “Việc cài đặt thuật toán thành chương trình máy tính là bước thực hiện giải pháp.”", level: "van-dung", activity: "hd3-giai-bai-toan" },
        { question: "Chạy chương trình với những dữ liệu khác nhau để phát hiện và sửa lỗi là bước:", type: "multiple-choice",
          options: ["Xác định bài toán", "Gỡ lỗi và hiệu chỉnh chương trình", "Xây dựng thuật toán", "Cài đặt thuật toán"],
          answer: 1, explanation: "Gỡ lỗi là một trong những bước cần thiết của việc lập trình.", level: "nhan-biet", activity: "hd3-giai-bai-toan" },
      ],
      remember: ["Quy trình giải một bài toán tin học gồm các bước: 1) Xác định bài toán; 2) Xây dựng thuật toán; 3) Cài đặt thuật toán; 4) Gỡ lỗi và hiệu chỉnh chương trình."],
    },
    {
      id: "thu-tu-4-buoc", name: "Sắp xếp quy trình giải bài toán tin học 🔢", type: "ordering",
      goal: "Nhớ thứ tự 4 bước giải bài toán tin học.",
      time: 90,
      task: "Sắp xếp đúng thứ tự các bước giải một bài toán tin học rồi bấm Nộp bài.",
      steps: ["Xác định bài toán", "Xây dựng thuật toán", "Cài đặt thuật toán", "Gỡ lỗi và hiệu chỉnh chương trình"],
      explanation: "1) Xác định bài toán → 2) Xây dựng thuật toán → 3) Cài đặt thuật toán → 4) Gỡ lỗi và hiệu chỉnh chương trình.",
    },
    {
      id: "may-tinh-luong", name: "Máy chạy thuật toán tính lương ⚙️", type: "knowledge",
      goal: "Quan sát máy tính thực hiện từng bước thuật toán tính lương (Hình 15.3) với các dữ liệu khác nhau — gỡ lỗi, kiểm tra kết quả.",
      time: 420,
      task: "Chạy máy với các bộ dữ liệu mẫu và dữ liệu nhóm tự chọn; theo dõi bảng biến rồi trả lời câu hỏi.",
      sgkImage: "assets/sgk/hinh-15-3.jpg",
      algo: ALGO_LUONG,
      questions: [
        { question: "Mức lương 20 nghìn đồng/giờ, làm 60 giờ. Máy cho tien_luong bằng bao nhiêu?", type: "multiple-choice",
          options: ["1,200", "1,800", "1,400", "1,000"],
          answer: 2, explanation: "luong_dmuc = 40 × 20 = 800; luong_vuot = 20 × 20 × 1,5 = 600; tien_luong = 1,400 nghìn đồng.", level: "van-dung", activity: "may-tinh-luong" },
        { question: "Với tgian_laodong = 38 giờ, biến tgian_vuot có giá trị:", type: "multiple-choice",
          options: ["0", "2", "38", "−2"],
          answer: 0, explanation: "38 ≤ 40 → nhánh sai: tgian_dmuc ← 38, tgian_vuot ← 0.", level: "thong-hieu", activity: "may-tinh-luong" },
        { question: "Các biến luong_dmuc, luong_vuot được dùng để làm gì?", type: "multiple-choice",
          options: ["Lưu đầu vào", "Lưu trữ các giá trị trung gian trong quá trình tính toán", "Lưu đầu ra", "Không có tác dụng"],
          answer: 1, explanation: "SGK: các biến luong_dmuc và luong_vuot được sử dụng để lưu trữ các giá trị trung gian.", level: "thong-hieu", activity: "may-tinh-luong" },
      ],
    },
    {
      id: "tim-max", name: "Bài toán tìm số lớn nhất 🏆", type: "knowledge",
      goal: "Xác định bài toán và xây dựng thuật toán tìm số lớn nhất của dãy số nguyên dương kết thúc bởi số 0.",
      time: 480,
      task: "Cá nhân: nêu các bước để giải bài toán tìm và hiển thị giá trị lớn nhất của những số nguyên dương nhập từ bàn phím (số lượng không biết trước, kết thúc khi nhập số 0; chỉ dùng một biến để nhập).",
      sgkImage: "assets/sgk/hinh-15-4.jpg",
      content: {
        heading: "🏆 Tìm số lớn nhất khi không biết trước có bao nhiêu số",
        revealLabel: "📖 Xác định bài toán & thuật toán (Hình 15.4)",
        blocks: [
          { kind: "list", value: [
            "Đầu vào: x là số nguyên dương được nhập nhiều lần từ bàn phím, kết thúc bởi số 0. Đầu ra: max là số lớn nhất trong các giá trị đã nhập.",
            "x được xử lí ngay sau khi nhập, sau đó được dành để nhập giá trị tiếp theo. Ba bước tuần tự: 1. Gán max bằng 0; 2. Lặp: nhập x và gán lại max theo x; 3. In kết quả.",
            "Điều kiện kết thúc vòng lặp: x = 0. Thân lặp: nhập x, nếu x > max thì thay max. Giá trị khởi đầu: max = 0.",
            "Không có số nguyên dương nào được nhập → max = 0 → hiển thị “Không có dữ liệu!”. Số âm dù đem so sánh cũng không làm sai kết quả.",
          ] },
          { kind: "image", value: "assets/sgk/hinh-15-4.jpg", caption: "Hình 15.4. Thuật toán tìm số lớn nhất" },
        ],
      },
      questions: [
        { question: "Điều kiện kết thúc vòng lặp trong thuật toán tìm số lớn nhất là:", type: "multiple-choice",
          options: ["x > max", "max = 0", "x = 0", "Đã nhập 10 số"],
          answer: 2, explanation: "Quá trình nhập kết thúc khi nhập vào số 0 → điều kiện kết thúc (x = 0).", level: "nhan-biet", activity: "tim-max" },
        { question: "Vì sao gán giá trị khởi đầu max = 0?", type: "multiple-choice",
          options: ["Để max có thể thay đổi khi số nguyên dương đầu tiên được nhập", "Vì 0 là số lớn nhất", "Để vòng lặp không chạy", "Vì bắt buộc gán 1"],
          answer: 0, explanation: "Mọi số nguyên dương đều lớn hơn 0 nên số đầu tiên nhập vào sẽ thay max.", level: "thong-hieu", activity: "tim-max" },
        { question: "Nếu người dùng nhập ngay số 0, chương trình hiển thị:", type: "multiple-choice",
          options: ["0", "Không có dữ liệu!", "Lỗi", "Số lớn nhất là 0"],
          answer: 1, explanation: "Sau vòng lặp max = 0 → xuất “Không có dữ liệu!”.", level: "van-dung", activity: "tim-max" },
      ],
    },
    {
      id: "may-tim-max", name: "Máy chạy thuật toán tìm số lớn nhất ⚙️", type: "knowledge",
      goal: "Kiểm chứng thuật toán Hình 15.4a bằng cách chạy từng bước với nhiều bộ dữ liệu.",
      time: 360,
      task: "Chạy máy với 3 bộ dữ liệu mẫu (có trường hợp chỉ nhập 0 và có số âm), theo dõi x và max rồi trả lời câu hỏi.",
      algo: ALGO_MAX,
      questions: [
        { question: "Nhập lần lượt 5, 12, 7, 0: giá trị max sau khi nhập số 7 là:", type: "multiple-choice",
          options: ["7", "5", "0", "12"],
          answer: 3, explanation: "5 > 0 → max = 5; 12 > 5 → max = 12; 7 > 12 sai → max giữ 12.", level: "van-dung", activity: "may-tim-max" },
        { question: "Nhập −3, 8, 2, 0: số âm −3 có làm sai kết quả không?", type: "multiple-choice",
          options: ["Có, max thành −3", "Không, −3 > 0 sai nên max không đổi; kết quả max = 8", "Có, chương trình dừng", "Có, kết quả là “Không có dữ liệu!”"],
          answer: 1, explanation: "Số âm được đem so sánh nhưng không thay max, kết quả vẫn đúng: 8.", level: "van-dung", activity: "may-tim-max" },
      ],
    },

    /* ===================== HĐ3: LUYỆN TẬP (15 phút) ===================== */
    {
      id: "luyen-tap", name: "Luyện tập: Bài toán số nguyên tố 🔢", type: "knowledge",
      goal: "Mô tả đầu vào, đầu ra và sơ đồ thuật toán kiểm tra số nguyên tố chỉ bằng các cấu trúc điều khiển cơ bản.",
      time: 540,
      task: "Bài 1: mô tả đầu vào, đầu ra. Bài 2 (Luyện tập SGK tr.82): vẽ sơ đồ thuật toán xác định một số có phải số nguyên tố hay không chỉ dùng các cấu trúc điều khiển cơ bản. Vẽ vào vở, rồi đối chiếu với máy và sơ đồ gợi ý; chưa xong thì hoàn thiện ở nhà, gửi qua mail/Zalo.",
      sgkImage: "assets/sgk/sgk-trang82.jpg",
      algo: ALGO_SNT,
      content: {
        heading: "🔢 Sơ đồ gợi ý (giáo án)",
        revealLabel: "🧭 Xem sơ đồ khối gợi ý",
        blocks: [{ kind: "image", value: "assets/sgk/so-do-so-nguyen-to.png", caption: "Sơ đồ khối kiểm tra số nguyên tố (các bước b.1–b.7)" }],
      },
      questions: [
        { question: "Bài 1: Đầu vào và đầu ra của bài toán xác định một số nguyên dương có phải số nguyên tố hay không là:", type: "multiple-choice",
          options: ["Đầu vào: 1 số nguyên dương; Đầu ra: kết quả có hoặc không là số nguyên tố", "Đầu vào: kết quả; Đầu ra: 1 số", "Đầu vào: 2 số nguyên; Đầu ra: ước chung lớn nhất", "Đầu vào: dãy số; Đầu ra: dãy đã sắp xếp"],
          answer: 0, explanation: "Đầu vào: một số nguyên dương. Đầu ra: số đó có hoặc không là số nguyên tố.", level: "nhan-biet", activity: "luyen-tap" },
        { question: "Chạy máy với N = 9: giá trị i khi máy dừng vòng lặp (gặp ước của N) là:", type: "multiple-choice",
          options: ["2", "3", "9", "4"],
          answer: 1, explanation: "9 mod 2 ≠ 0 → i = 3; 9 mod 3 = 0 → sang b.7: i = 3 ≠ 9 → 9 không là số nguyên tố.", level: "van-dung", activity: "luyen-tap" },
        { question: "Trong sơ đồ, vòng lặp b.5 – b.6 (tăng i đến khi gặp ước của N) là cấu trúc điều khiển nào?", type: "multiple-choice",
          options: ["Tuần tự", "Rẽ nhánh", "Lặp", "Không phải cấu trúc điều khiển"],
          answer: 2, explanation: "Lặp lại việc kiểm tra và tăng i cho đến khi i là ước của N.", level: "thong-hieu", activity: "luyen-tap" },
      ],
    },

    /* ===================== HĐ4: VẬN DỤNG (10 phút) ===================== */
    {
      id: "van-dung", name: "Vận dụng: Bài toán sắp xếp dãy số tăng dần 📊", type: "knowledge",
      goal: "Mô tả đầu vào, đầu ra của bài toán sắp xếp; vẽ sơ đồ khối sắp xếp nổi bọt.",
      time: 480,
      task: "Bài 3: mô tả đầu vào, đầu ra của bài toán sắp xếp một dãy số tăng dần. Bài 4: vẽ sơ đồ khối của giải thuật sắp xếp nổi bọt (tăng dần). Chưa xong thì hoàn thiện ở nhà, gửi sản phẩm qua mail/Zalo; tiết sau báo cáo.",
      algo: ALGO_NOI_BOT,
      content: {
        heading: "📊 Sơ đồ khối sắp xếp nổi bọt",
        revealLabel: "🧭 Xem sơ đồ khối gợi ý",
        blocks: [{ kind: "html", value: SO_DO_NOI_BOT }],
      },
      questions: [
        { question: "Bài 3: Đầu vào, đầu ra của bài toán sắp xếp một dãy số theo thứ tự tăng dần là:", type: "multiple-choice",
          options: ["Đầu vào: số lớn nhất; Đầu ra: dãy số", "Đầu vào: một dãy gồm n số; Đầu ra: dãy số đó theo thứ tự tăng dần", "Đầu vào: dãy tăng dần; Đầu ra: dãy giảm dần", "Đầu vào: n; Đầu ra: tổng các số"],
          answer: 1, explanation: "Đầu vào: một dãy gồm n số. Đầu ra: dãy số theo thứ tự tăng dần.", level: "nhan-biet", activity: "van-dung" },
        { question: "Chạy máy với dãy 3, 1, 2: sau vòng lặp thứ nhất (i = 1), dãy a là:", type: "multiple-choice",
          options: ["3, 1, 2", "1, 2, 3", "1, 3, 2", "2, 1, 3"],
          answer: 2, explanation: "j = 3: 2 < 1 sai; j = 2: 1 < 3 đúng → đổi chỗ → 1, 3, 2 (số nhỏ nhất đã nổi lên đầu).", level: "van-dung", activity: "van-dung" },
      ],
    },
    {
      id: "van-dung-nha", name: "Vận dụng — Bài toán tin học quanh em 📝", type: "vandung",
      goal: "Liên hệ khái niệm bài toán tin học với đời sống.",
      time: 180,
      task: "Nhóm thảo luận, gửi câu trả lời cho thầy/cô.",
      intro: "Gửi câu trả lời cho thầy/cô rồi bấm để xem gợi ý.",
      cases: [
        { question: "Nêu một nhiệm vụ trong học tập hoặc đời sống có thể chuyển thành bài toán tin học. Mô tả đầu vào, đầu ra và phần việc nào do con người làm, phần việc nào giao cho máy tính.",
          answer: "Ví dụ: tính điểm trung bình môn. Đầu vào: các điểm thành phần và hệ số; đầu ra: điểm trung bình. Con người xác định bài toán, xây dựng thuật toán (cách tính); máy tính thực hiện chương trình tính cho cả lớp nhanh, chính xác." },
      ],
    },

    /* ===================== TỔNG KẾT ===================== */
    {
      id: "tong-ket", name: "Tổng kết", type: "summary",
      task: "Cả lớp nhắc lại kiến thức trọng tâm và làm thử thách cuối. Dặn dò: hoàn thiện sơ đồ số nguyên tố, sơ đồ nổi bọt; chuẩn bị Bài 16.",
      content: {
        learned: [
          "Có những bước trong quy trình giải quyết vấn đề có thể giao cho máy tính (VD: tính toán tiền lương).",
          "Bài toán tin học: nhiệm vụ giao cho máy tính, xác định bởi đầu vào và đầu ra.",
          "4 bước: xác định bài toán → xây dựng thuật toán → cài đặt thuật toán → gỡ lỗi và hiệu chỉnh.",
          "Thuật toán chỉ dùng tuần tự, rẽ nhánh, lặp.",
          "Cài đặt thuật toán tương ứng với bước thực hiện giải pháp.",
        ],
        challenge: [
          { question: "Bài toán tính diện tích hình chữ nhật có đầu vào, đầu ra là:", type: "multiple-choice",
            options: ["Đầu vào: diện tích; Đầu ra: chiều dài, chiều rộng", "Đầu vào: chiều dài, chiều rộng; Đầu ra: diện tích", "Đầu vào: chu vi; Đầu ra: chiều dài", "Không xác định được"],
            answer: 1, explanation: "Dữ liệu đã biết (đầu vào): chiều dài, chiều rộng; dữ liệu cần tìm (đầu ra): diện tích.", level: "van-dung", activity: "tong-ket" },
          { question: "Nhân viên: mức lương 25 nghìn đồng/giờ, làm 42 giờ. Tiền lương tuần là:", type: "multiple-choice",
            options: ["1,050", "1,000", "1,075", "1,575"],
            answer: 2, explanation: "40 × 25 = 1,000; 2 × 25 × 1,5 = 75 → 1,075 nghìn đồng.", level: "van-dung-cao", activity: "tong-ket" },
        ],
      },
    },
  ],
};

if (typeof module !== "undefined" && module.exports) module.exports = LESSON;
if (typeof window !== "undefined") window.LESSON = LESSON;
