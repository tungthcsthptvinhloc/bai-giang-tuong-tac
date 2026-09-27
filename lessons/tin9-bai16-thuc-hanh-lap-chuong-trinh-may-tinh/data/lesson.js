/* ============================================================================
 * BÀI 16 — THỰC HÀNH: LẬP CHƯƠNG TRÌNH MÁY TÍNH  (Tin học 9 — Kết nối tri thức)
 * Chủ đề 5: Giải quyết vấn đề với sự trợ giúp của máy tính.
 * Bám sát SGK trang 83–86 + Kế hoạch bài dạy (2 tiết) của giáo viên.
 * Chỉ sửa file này để đổi nội dung. Engine app.js không cần sửa.
 * HS lập trình trên Scratch thật; app hỗ trợ: nhận dạng cấu trúc, bảng kiểm thử chấm điểm, săn lỗi, gợi ý cách sửa (khối lệnh vẽ lại).
 * ==========================================================================*/

// ---- Vẽ khối lệnh kiểu Scratch (dùng lớp CSS sb-* của engine) ----
const blk = (cat, html, hat) => `<span class="sb sb-${cat}${hat ? " sb-hat" : ""}">${html}</span>`;
const txt = (t) => `<span class="sb-in">${t}</span>`;
const num = (t) => `<span class="sb-in sb-num">${t}</span>`;
const vr = (t) => `<span class="sb-rep sb-rv">${t}</span>`;
const ans = `<span class="sb-rep sb-rsen">trả lời</span>`;
const dd = (t) => `<span class="sb-in sb-dd">${t} ▾</span>`;
const op = (h) => `<span class="sb-rep sb-rop">${h}</span>`;
const bool = (h) => `<span class="sb-bool">${h}</span>`;
const cblk = (label, inner, elseInner) => `<div class="sb sb-c sb-control"><div class="sb-row">${label}</div><div class="sb-inner">${inner.join("")}</div>`
  + (elseInner ? `<div class="sb-row">nếu không thì</div><div class="sb-inner">${elseInner.join("")}</div>` : "") + `<div class="sb-foot">${elseInner ? "" : "↻"}</div></div>`;
const stack = (...b) => `<div class="sb-stack">${b.join("")}</div>`;
const ask = (t) => blk("sensing", `hỏi ${txt(t)} và đợi`);
const setv = (v, h) => blk("variables", `đặt ${dd(v)} thành ${h}`);
const flag = blk("event", `khi bấm vào <b class="sb-flag">🏁</b>`, true);

// Sửa lỗi tình huống 6 (Bảng 16.1): mức lương phải là số dương — cấu trúc như Hình 16.1c
const SUA_MUC_LUONG = stack(flag, ask("Mức lương của nhân viên (theo giờ)?"),
  cblk(`lặp lại cho đến khi ${bool(`${ans} &gt; ${num(0)}`)}`, [ask("Mức lương của nhân viên (theo giờ)?")]),
  setv("muc_luong", ans));
// Luyện tập: loại bỏ số âm khi nhập x (số 0 vẫn được nhập để kết thúc)
const SUA_SO_AM = stack(ask("Nhập một số nguyên dương!"),
  cblk(`lặp lại cho đến khi ${bool(`không phải ${bool(`${ans} &lt; ${num(0)}`)}`)}`, [ask("Không nhận số âm! Nhập lại số nguyên dương!")]),
  setv("x", ans));
// Vận dụng: bỏ qua dữ liệu chữ — chữ trừ 0 bằng 0 (khác chính nó), số trừ 0 bằng chính nó
const SUA_DU_LIEU_CHU = stack(ask("Nhập số nguyên dương tiếp theo!"),
  cblk(`lặp lại cho đến khi ${bool(`${op(`${ans} - ${num(0)}`)} = ${ans}`)}`, [ask("Dữ liệu không phải là số! Hãy nhập một số!")]),
  setv("x", ans));

const HINT = (h) => `<div style="text-align:left;margin:8px auto;max-width:720px;padding:8px 12px;border-left:6px solid #7c3aed;background:#f5f3ff;border-radius:10px">${h}</div>`;
const CH1 = ["3000", "4000", "5500", "7000", "Hỏi lại số giờ làm việc", "Hỏi lại mức lương"];
const CH2 = ["3", "5", "9", "10", "12", "data", "Không có dữ liệu!"];

const LESSON = {
  meta: {
    subject: "Tin học", grade: "9", book: "Kết nối tri thức với cuộc sống",
    title: "Bài 16: Thực hành: Lập chương trình máy tính", unit: "Chủ đề 5 — Giải quyết vấn đề với sự trợ giúp của máy tính",
    pages: "83–86", durationMinutes: 90,
  },
  objectives: {
    knowledge: [
      "Sử dụng được cấu trúc tuần tự, rẽ nhánh, lặp trong mô tả thuật toán.",
      "Giải thích được chương trình là bản mô tả thuật toán bằng ngôn ngữ mà máy tính có thể “hiểu” và thực hiện.",
    ],
    competencies: [
      "Tự chủ và tự học; giao tiếp và hợp tác (thực hành nhóm đôi); giải quyết vấn đề và sáng tạo (lập trình Scratch).",
      "Năng lực số 3.4.TC2a: mô tả thuật toán bằng các cấu trúc tuần tự, rẽ nhánh, lặp; điều chỉnh, hoàn thiện thuật toán khi phát hiện sai sót.",
      "Năng lực số 5.1.TC2a: theo dõi, giải thích kết quả khi chạy chương trình với dữ liệu khác nhau; phát hiện nguyên nhân sai (sai thứ tự lệnh, sai điều kiện, thiếu bước) và khắc phục.",
      "Năng lực AI 9.C5.1: nêu được cách AI nhận diện cảm xúc (vận dụng tư duy logic để xây dựng kịch bản phản hồi).",
    ],
    qualities: ["Chăm chỉ, trung thực, trách nhiệm khi thực hành và báo cáo kết quả."],
  },
  coreKnowledge: [
    "Các ngôn ngữ lập trình đều có những cấu trúc điều khiển cơ bản: tuần tự, rẽ nhánh và lặp. Mô tả thuật toán chỉ bằng các cấu trúc này giúp dễ dàng tạo chương trình.",
    "Chương trình là bản mô tả thuật toán theo quy tắc của ngôn ngữ lập trình; đôi khi phải hiệu chỉnh cách mô tả thuật toán — VD lặp với điều kiện sau chuyển thành lặp với điều kiện trước (“lặp lại cho đến khi” trong Scratch).",
    "Cài đặt: tạo biến (đầu vào, đầu ra, trung gian), nhận dạng khối lệnh tương ứng với từng phần của sơ đồ khối, lắp ghép đúng thứ tự; số thập phân dùng dấu chấm (1.5).",
    "Gỡ lỗi: lập bộ dữ liệu kiểm thử, mỗi bộ đại diện cho một tình huống; chương trình chạy sai thì tìm nguyên nhân và sửa.",
    "Chương trình tốt nên phát hiện và loại bỏ dữ liệu không đúng yêu cầu (số âm, dữ liệu chữ…).",
  ],
  keywords: ["Tuần tự – rẽ nhánh – lặp", "Biến", "Cài đặt thuật toán", "Dữ liệu kiểm thử", "Gỡ lỗi"],
  settings: { basePoints: 100, useTimer: false, defaultTime: 60, sound: true, streakEnabled: true },

  activities: [
    /* =========================== TIẾT 1 =========================== */
    /* ===================== HĐ1: MỞ ĐẦU (10 phút) ===================== */
    {
      id: "mo-dau", name: "Mở đầu — Khối lệnh này là cấu trúc gì? 🧩", type: "quiz",
      goal: "Ôn lại cấu trúc tuần tự, rẽ nhánh, lặp qua các khối lệnh Scratch.",
      time: 480,
      task: "Ổn định vị trí, kiểm tra an toàn máy. Cá nhân quan sát khối lệnh và chọn nhanh dạng cấu trúc điều khiển.",
      sgkImage: "assets/sgk/sgk-trang83.jpg",
      questions: [
        { question: "Câu 1: Khối lệnh sau là dạng cấu trúc:", type: "multiple-choice", image: "assets/sgk/cau-truc-1.png",
          options: ["Rẽ nhánh", "Lặp", "Tuần tự", "Không có cấu trúc"],
          answer: 1, explanation: "Khối “lặp lại cho đến khi…” là cấu trúc lặp.", level: "nhan-biet", activity: "mo-dau" },
        { question: "Câu 2: Các khối lệnh sau là dạng cấu trúc:", type: "multiple-choice", image: "assets/sgk/cau-truc-2.png",
          options: ["Rẽ nhánh", "Lặp", "Tuần tự", "Không có cấu trúc"],
          answer: 2, explanation: "Ba khối “đặt… thành…” thực hiện lần lượt từ trên xuống — cấu trúc tuần tự.", level: "nhan-biet", activity: "mo-dau" },
        { question: "Câu 3: Khối lệnh sau là dạng cấu trúc:", type: "multiple-choice", image: "assets/sgk/cau-truc-3.png",
          options: ["Rẽ nhánh", "Lặp", "Tuần tự", "Không có cấu trúc"],
          answer: 0, explanation: "Khối “nếu… thì… nếu không thì…” là cấu trúc rẽ nhánh.", level: "nhan-biet", activity: "mo-dau" },
        { question: "Câu 4: Chương trình máy tính là:", type: "multiple-choice",
          options: ["Bản mô tả thuật toán bằng ngôn ngữ mà máy tính có thể “hiểu” và thực hiện", "Bản vẽ sơ đồ khối trên giấy", "Danh sách các biến", "Kết quả chạy trên màn hình"],
          answer: 0, explanation: "Chương trình là bản mô tả thuật toán theo quy tắc của ngôn ngữ lập trình để máy tính thực hiện.", level: "thong-hieu", activity: "mo-dau" },
      ],
    },

    /* ===================== NHIỆM VỤ 1: TÍNH LƯƠNG ===================== */
    {
      id: "nv1-bien", name: "Nhiệm vụ 1 — Bước 1: Tạo các biến nhớ 📦", type: "dragdrop",
      goal: "Xác định biến đầu vào, đầu ra, trung gian của chương trình tính lương.",
      time: 240,
      task: "Nhiệm vụ 1 (SGK tr.83): lập chương trình Scratch tính và hiển thị tiền lương theo thuật toán Bài 15. Xếp mỗi biến vào đúng loại, rồi tạo các biến này trên Scratch (nhóm đôi).",
      sgkImage: "assets/sgk/sgk-trang83.jpg",
      groups: ["📥 Biến đầu vào", "📤 Biến đầu ra", "🔧 Biến trung gian"],
      items: [
        { text: "muc_luong", group: 0 }, { text: "tgian_laodong", group: 0 }, { text: "tien_luong", group: 1 },
        { text: "tgian_dmuc", group: 2 }, { text: "tgian_vuot", group: 2 }, { text: "luong_dmuc", group: 2 }, { text: "luong_vuot", group: 2 },
      ],
      explanation: "Đầu vào: muc_luong, tgian_laodong. Đầu ra: tien_luong. Trung gian: tgian_dmuc, tgian_vuot, luong_dmuc, luong_vuot.",
    },
    {
      id: "nv1-vong-lap", name: "Bước 2: Lặp với điều kiện sau → lặp với điều kiện trước 🔁", type: "knowledge",
      goal: "Hiểu vì sao phải hiệu chỉnh mô tả thuật toán để cài đặt được bằng khối lệnh Scratch.",
      time: 480,
      task: "Quan sát Hình 16.1 (SGK tr.83): so sánh sơ đồ a) và b); giải thích khối lệnh c). Thực hành tạo khối lệnh nhập tgian_laodong trên Scratch.",
      sgkImage: "assets/sgk/hinh-16-1.jpg",
      content: {
        heading: "🔁 Nhập số giờ lao động bằng vòng lặp với điều kiện trước",
        prompt: "Vì chương trình là bản mô tả thuật toán theo quy tắc của ngôn ngữ lập trình nên đôi khi em phải hiệu chỉnh cách mô tả thuật toán để có thể cài đặt được bằng những công cụ của ngôn ngữ lập trình.",
        revealLabel: "🖼️ Hình 16.1 & giải thích",
        blocks: [
          { kind: "image", value: "assets/sgk/hinh-16-1.jpg", caption: "Hình 16.1. Nhập số giờ lao động bằng vòng lặp với điều kiện trước" },
          { kind: "list", value: [
            "a) Lặp với điều kiện sau: nhập tgian_laodong rồi mới kiểm tra 1 ≤ tgian_laodong ≤ 60.",
            "b) Lặp với điều kiện trước: nhập một lần trước vòng lặp; vòng lặp kiểm tra điều kiện trước, sai thì nhập lại.",
            "c) Khối “lặp lại cho đến khi” của Scratch kiểm tra điều kiện trước mỗi lần lặp nên bước nhập ở sơ đồ a) cần chuyển thành sơ đồ b).",
          ] },
        ],
      },
      questions: [
        { question: "Vì sao bước nhập tgian_laodong cần chuyển từ lặp với điều kiện sau (Hình 16.1a) sang lặp với điều kiện trước (Hình 16.1b)?", type: "multiple-choice",
          options: ["Để chương trình chạy nhanh hơn", "Vì Scratch không có biến", "Để phù hợp với cấu trúc lặp có sẵn trong Scratch (“lặp lại cho đến khi” kiểm tra điều kiện trước)", "Vì sơ đồ a) sai"],
          answer: 2, explanation: "SGK: cần chuyển thành vòng lặp với điều kiện trước để phù hợp với cấu trúc lặp có sẵn trong ngôn ngữ lập trình trực quan.", level: "thong-hieu", activity: "nv1-vong-lap" },
        { question: "Trong Hình 16.1c, vòng lặp dừng khi nào?", type: "multiple-choice", image: "assets/sgk/hinh-16-1c.jpg",
          options: ["Khi trả lời < 1", "Khi trả lời > 60", "Khi trả lời hợp lệ: không phải (trả lời < 1 hoặc trả lời > 60), tức 1 ≤ trả lời ≤ 60", "Không bao giờ dừng"],
          answer: 2, explanation: "“Lặp lại cho đến khi không phải (trả lời < 1 hoặc trả lời > 60)”: dừng khi số giờ nằm trong khoảng 1 đến 60.", level: "van-dung", activity: "nv1-vong-lap" },
        { question: "Vì sao khối “đặt tgian_laodong thành trả lời” đặt SAU vòng lặp?", type: "multiple-choice",
          options: ["Để lấy câu trả lời hợp lệ cuối cùng sau khi đã nhập lại", "Vì Scratch bắt buộc", "Để biến luôn bằng 0", "Không có lí do"],
          answer: 0, explanation: "Sau vòng lặp, “trả lời” chắc chắn hợp lệ nên mới gán vào biến tgian_laodong.", level: "van-dung-cao", activity: "nv1-vong-lap" },
      ],
    },
    {
      id: "nv1-chuong-trinh", name: "Bước 3: Tạo chương trình tính lương 🐱", type: "knowledge",
      goal: "Nhận dạng các khối lệnh tương ứng với từng phần của sơ đồ khối và lắp ghép đúng thứ tự.",
      time: 900,
      task: "Nhóm đôi: nhận dạng các khối lệnh trong Hình 16.2 tương ứng với từng phần của sơ đồ khối Bài 15 (Hình 15.3) và lắp ghép thành chương trình hoàn chỉnh trên Scratch. Lưu ý hệ số 1,5 viết là 1.5.",
      sgkImage: "assets/sgk/hinh-16-2.jpg",
      content: {
        heading: "🐱 Các khối lệnh thành phần của chương trình tính lương",
        revealLabel: "🖼️ Hình 16.2",
        blocks: [{ kind: "image", value: "assets/sgk/hinh-16-2.jpg", caption: "Hình 16.2. Các khối lệnh thành phần của chương trình tính lương" }],
      },
      questions: [
        { question: "Khối “nếu tgian_laodong > 40 thì … nếu không thì …” tương ứng với phần nào của sơ đồ khối Hình 15.3?", type: "multiple-choice",
          options: ["Nhập muc_luong", "Xuất tien_luong", "Kết thúc", "Khối điều kiện tgian_laodong > 40 và hai nhánh tính tgian_dmuc, tgian_vuot"],
          answer: 3, explanation: "Cấu trúc rẽ nhánh: đúng → tgian_dmuc = 40, tgian_vuot = tgian_laodong − 40; sai → tgian_dmuc = tgian_laodong, tgian_vuot = 0.", level: "thong-hieu", activity: "nv1-chuong-trinh" },
        { question: "Khối lệnh nào dùng để xuất kết quả tiền lương?", type: "multiple-choice",
          options: ["đặt tien_luong thành luong_dmuc + luong_vuot", "hỏi … và đợi", "nói kết hợp “Tiền lương theo tuần =” tien_luong trong 5 giây", "dừng lại tất cả"],
          answer: 2, explanation: "Khối “nói” hiển thị tiền lương — tương ứng khối Xuất tien_luong.", level: "nhan-biet", activity: "nv1-chuong-trinh" },
        { question: "Thứ tự đúng của các nhóm khối lệnh trong chương trình là:", type: "multiple-choice",
          options: ["Nhập mức lương → Nhập số giờ (vòng lặp) → Rẽ nhánh tính tgian_dmuc, tgian_vuot → Tính luong_dmuc, luong_vuot, tien_luong → Nói kết quả", "Tính lương → Nhập số giờ → Nhập mức lương → Rẽ nhánh → Nói", "Nói → Nhập → Tính", "Rẽ nhánh → Nhập → Nói → Tính"],
          answer: 0, explanation: "Theo sơ đồ khối Hình 15.3: nhập → kiểm tra số giờ → rẽ nhánh → tính lương → xuất.", level: "van-dung", activity: "nv1-chuong-trinh" },
        { question: "Trong chương trình, hệ số 1,5 phải viết là:", type: "multiple-choice",
          options: ["1,5", "15", "1.5", "3/2,0"],
          answer: 2, explanation: "Dùng dấu chấm thay cho dấu phẩy ngăn cách phần nguyên và phần thập phân: 1.5.", level: "nhan-biet", activity: "nv1-chuong-trinh" },
      ],
    },
    {
      id: "nv1-kiem-thu", name: "b) Gỡ lỗi — Bảng kiểm thử tính lương 🧪", type: "fillblank",
      goal: "Xác định đầu ra đúng cho từng bộ dữ liệu kiểm thử (Bảng 16.1).",
      time: 360,
      task: "Nhóm đôi: chạy chương trình với từng bộ dữ liệu của Bảng 16.1 (đơn vị tiền: nghìn đồng, thời gian: giờ). Chọn đầu ra đúng mà chương trình cần trả về. Làm hết rồi bấm Nộp bài.",
      sgkImage: "assets/sgk/bang-16-1.jpg",
      text: "Tình huống 1: muc_luong = 100, tgian_laodong = 30 (dưới định mức) → {{}}\nTình huống 2: muc_luong = 100, tgian_laodong = 40 (vừa đủ định mức) → {{}}\nTình huống 3: muc_luong = 100, tgian_laodong = 50 (vượt định mức) → {{}}\nTình huống 4: muc_luong = 100, tgian_laodong = 60 (vừa đạt mức tối đa) → {{}}\nTình huống 5: muc_luong = 100, tgian_laodong = 70 → {{}}\nTình huống 6: muc_luong = −100, tgian_laodong = 50 → {{}}",
      answers: [["3000"], ["4000"], ["5500"], ["7000"], ["Hỏi lại số giờ làm việc"], ["Hỏi lại mức lương"]],
      choices: CH1,
      explanation: "30 × 100 = 3000 · 40 × 100 = 4000 · 4000 + 10 × 100 × 1.5 = 5500 · 4000 + 20 × 100 × 1.5 = 7000 · 70 giờ vượt tối đa → hỏi lại “Nhân viên đó làm việc bao nhiêu giờ?” · mức lương âm → cần hỏi lại “Mức lương của nhân viên (theo giờ)?”.",
    },
    {
      id: "nv1-go-loi", name: "Gỡ lỗi tình huống 6: mức lương không hợp lí 🔧", type: "knowledge",
      goal: "Phát hiện lỗi khi mức lương âm và sửa chương trình để yêu cầu nhập lại.",
      time: 420,
      task: "Chạy chương trình với tình huống 6 (muc_luong = −100, tgian_laodong = 50). Nhận xét kết quả; chỉnh sửa chương trình để yêu cầu nhập lại mức lương khi giá trị chưa hợp lí. Đối chiếu với dự án mẫu.",
      sgkImage: "assets/sgk/bang-16-1.jpg",
      links: [{ label: "Mở dự án Scratch mẫu: Tính lương", url: "https://scratch.mit.edu/projects/955625070", note: "(dự án trong giáo án — cần Internet)" }],
      content: {
        heading: "🔧 Sửa chương trình: mức lương phải là số dương",
        revealLabel: "💡 Gợi ý cách sửa",
        blocks: [
          { kind: "html", value: SUA_MUC_LUONG },
          { kind: "html", value: HINT("Làm giống bước nhập số giờ (Hình 16.1c): hỏi → <b>lặp lại cho đến khi</b> câu trả lời hợp lệ thì hỏi lại → sau vòng lặp mới <b>đặt muc_luong thành trả lời</b>. Nếu đặt biến trước vòng lặp mà không gán lại, biến vẫn giữ giá trị sai.") },
        ],
      },
      questions: [
        { question: "Chương trình chưa sửa, nhập muc_luong = −100, tgian_laodong = 50 thì tiền lương là:", type: "multiple-choice",
          options: ["5500", "Máy báo lỗi", "0", "−5500"],
          answer: 3, explanation: "40 × (−100) + 10 × (−100) × 1.5 = −4000 − 1500 = −5500: kết quả vô lí vì đầu vào chưa hợp lí.", level: "van-dung", activity: "nv1-go-loi" },
        { question: "Bạn Hà sửa: đặt muc_luong thành trả lời, rồi mới “lặp lại cho đến khi trả lời > 0: hỏi lại”. Nhập −100 rồi 100, tiền lương tính với mức lương nào?", type: "multiple-choice",
          options: ["−100, vì biến muc_luong không được gán lại sau khi hỏi lại", "100", "0", "Máy báo lỗi"],
          answer: 0, explanation: "Phải đặt muc_luong thành trả lời SAU vòng lặp (hoặc gán lại trong vòng lặp).", level: "van-dung-cao", activity: "nv1-go-loi" },
      ],
    },

    /* =========================== TIẾT 2 =========================== */
    /* ===================== NHIỆM VỤ 2: TÌM GIÁ TRỊ LỚN NHẤT ===================== */
    {
      id: "nv2-chuong-trinh", name: "Nhiệm vụ 2: Chương trình tìm giá trị lớn nhất 🏆", type: "knowledge",
      goal: "Tạo biến x, max; nhận dạng và lắp ghép các khối lệnh theo sơ đồ khối Bài 15 (Hình 15.4b).",
      time: 900,
      task: "Nhiệm vụ 2 (SGK tr.85), nhóm đôi: tạo biến đầu vào x, biến đầu ra max; nhận dạng các khối lệnh trong Hình 16.3 tương ứng với từng phần của sơ đồ khối Bài 15 và lắp ghép thành chương trình trên Scratch.",
      sgkImage: "assets/sgk/hinh-16-3.jpg",
      content: {
        heading: "🏆 Tìm và hiển thị giá trị lớn nhất (kết thúc khi nhập 0)",
        revealLabel: "🖼️ Hình 16.3",
        blocks: [{ kind: "image", value: "assets/sgk/hinh-16-3.jpg", caption: "Hình 16.3. Các khối lệnh thành phần của chương trình tìm giá trị lớn nhất" }],
      },
      questions: [
        { question: "Biến đầu vào và biến đầu ra của chương trình là:", type: "multiple-choice",
          options: ["Đầu vào: max; đầu ra: x", "Đầu vào: trả lời; đầu ra: 0", "Đầu vào: x, max; không có đầu ra", "Đầu vào: x; đầu ra: max"],
          answer: 3, explanation: "SGK: biến đầu vào x, biến đầu ra max.", level: "nhan-biet", activity: "nv2-chuong-trinh" },
        { question: "Khối “lặp lại cho đến khi x = 0” chứa những khối nào bên trong?", type: "multiple-choice",
          options: ["đặt max thành 0", "nếu max = 0 thì nói “Không có dữ liệu!”", "nếu x > max thì đặt max thành x; hỏi “Nhập số nguyên dương tiếp theo!” và đặt x thành trả lời", "dừng lại tất cả"],
          answer: 2, explanation: "Thân lặp: so sánh x với max rồi nhập x tiếp theo (bước 4.1, 4.2 của Hình 15.4a).", level: "thong-hieu", activity: "nv2-chuong-trinh" },
        { question: "Khối “nếu max = 0 thì nói Không có dữ liệu! nếu không thì nói kết hợp Số lớn nhất là max” đặt ở đâu?", type: "multiple-choice",
          options: ["Trước khối đặt max thành 0", "Trong vòng lặp", "Sau vòng lặp", "Không cần dùng"],
          answer: 2, explanation: "Sau khi nhập xong (x = 0) mới xuất kết quả — bước 5 của thuật toán.", level: "thong-hieu", activity: "nv2-chuong-trinh" },
      ],
    },
    {
      id: "nv2-kiem-thu", name: "b) Gỡ lỗi — Bảng kiểm thử tìm số lớn nhất 🧪", type: "fillblank",
      goal: "Xác định đầu ra đúng cho từng bộ dữ liệu kiểm thử (Bảng 16.2).",
      time: 420,
      task: "Nhóm đôi: chạy chương trình, nhập lần lượt từng số (nhấn Enter sau mỗi số) theo Bảng 16.2 đến khi kết thúc bằng 0. Chọn đầu ra đúng mà chương trình cần trả về. Làm hết rồi bấm Nộp bài.",
      sgkImage: "assets/sgk/bang-16-2.jpg",
      text: "Tình huống 1: 1 2 3 0 (dãy tăng) → {{}}\nTình huống 2: 8 3 10 6 0 (ngẫu nhiên) → {{}}\nTình huống 3: 12 8 3 0 (dãy giảm) → {{}}\nTình huống 4: 5 0 (một giá trị) → {{}}\nTình huống 5: 0 (không có dữ liệu) → {{}}\nTình huống 6: 8 −5 3 9 6 0 (có số âm) → {{}}\nTình huống 7: −8 −6 0 (không có số nguyên dương) → {{}}\nTình huống 8: 7 data 12 0 (có dữ liệu chữ) → {{}}",
      answers: [["3"], ["10"], ["12"], ["5"], ["Không có dữ liệu!"], ["9"], ["Không có dữ liệu!"], ["12"]],
      choices: CH2,
      explanation: "Đầu ra cần có: 3 · 10 · 12 · 5 · Không có dữ liệu! · 9 · Không có dữ liệu! · 12. Tình huống 8: đầu ra đúng phải là 12, nhưng chương trình hiện tại cho kết quả sai (xem hoạt động tiếp theo).",
    },
    {
      id: "nv2-go-loi", name: "Gỡ lỗi Nhiệm vụ 2: số âm và dữ liệu chữ 🔍", type: "knowledge",
      goal: "Giải thích vì sao tình huống 6, 7 vẫn đúng còn tình huống 8 cho kết quả sai.",
      time: 360,
      task: "Chạy lại tình huống 6, 7, 8 trên Scratch; giải thích kết quả. Đối chiếu với dự án mẫu.",
      sgkImage: "assets/sgk/bang-16-2.jpg",
      links: [{ label: "Mở dự án Scratch mẫu: Tìm giá trị lớn nhất", url: "https://scratch.mit.edu/projects/992442586", note: "(dự án trong giáo án — cần Internet)" }],
      content: {
        heading: "🔍 Vì sao có tình huống đúng, có tình huống sai?",
        revealLabel: "💡 Giải thích",
        blocks: [{ kind: "list", value: [
          "Tình huống 6, 7 có những giá trị đầu vào không hợp lệ (số âm) nhưng chương trình vẫn xử lí đúng: số âm không lớn hơn max (ban đầu bằng 0) nên không làm thay đổi max.",
          "Tình huống 8 có giá trị không hợp lệ (chữ “data”) dẫn đến kết quả sai: Scratch không phân biệt dữ liệu số hay chữ — khi so sánh chữ với số, Scratch so sánh như văn bản nên “data” > 7 là đúng, max thành “data”.",
          "Chương trình sẽ tốt hơn nếu phát hiện được và loại bỏ những dữ liệu không đúng yêu cầu.",
        ] }],
      },
      questions: [
        { question: "Tình huống 7 (−8 −6 0): vì sao chương trình vẫn hiển thị “Không có dữ liệu!”?", type: "multiple-choice",
          options: ["Vì các số âm không lớn hơn max = 0 nên max vẫn bằng 0", "Vì −8 > 0 đúng", "Vì chương trình tự xoá số âm", "Vì vòng lặp không chạy"],
          answer: 0, explanation: "max giữ giá trị 0 → nhánh “Không có dữ liệu!”.", level: "thong-hieu", activity: "nv2-go-loi" },
        { question: "Tình huống 8 (7 data 12 0): chương trình chưa sửa hiển thị gì?", type: "multiple-choice",
          options: ["Số lớn nhất là 12", "Số lớn nhất là 7", "Số lớn nhất là data", "Không có dữ liệu!"],
          answer: 2, explanation: "“data” so với 7 theo kiểu văn bản → lớn hơn → max = “data”; 12 so với “data” cũng theo văn bản → không lớn hơn → max giữ “data”.", level: "van-dung-cao", activity: "nv2-go-loi" },
      ],
    },
    {
      id: "san-loi", name: "Trò chơi: Thám tử săn lỗi chương trình 🕵️", type: "giftbox", boxIcon: "🐞",
      goal: "Phát hiện nguyên nhân lỗi: sai thứ tự lệnh, sai điều kiện, thiếu bước, sai cách viết số.",
      time: 420,
      task: "Mỗi hộp là một chương trình bị lỗi. Chọn hộp, tìm ra nguyên nhân lỗi. Tìm đúng thì bắt được con bọ 🐞!",
      intro: "6 hộp — mỗi hộp một con bọ (lỗi) đang trốn trong chương trình. Bắt hết nhé! 🐞",
      prizes: ["🕵️ Thám tử bắt bọ", "⭐ Ngôi sao gỡ lỗi", "👏 Một tràng pháo tay", "🏅 Huy hiệu “Lập trình viên nhí”", "🌟 Lời khen trước lớp", "🎁 Quà bí mật từ thầy/cô"],
      questions: [
        { question: "Hộp 1 — Khối: đặt luong_vuot thành (muc_luong * tgian_vuot * 1,5). Chương trình tính sai. Lỗi ở đâu?", type: "multiple-choice",
          options: ["Thiếu biến tien_luong", "Phải dùng phép cộng", "Sai tên biến muc_luong", "Hệ số 1,5 phải viết là 1.5 (dấu chấm)"],
          answer: 3, explanation: "Trong chương trình, số thập phân dùng dấu chấm: 1.5.", level: "nhan-biet", activity: "san-loi" },
        { question: "Hộp 2 — Nhập số giờ: hỏi…; đặt tgian_laodong thành trả lời; lặp lại cho đến khi 1 ≤ trả lời ≤ 60: hỏi lại. Nhập 70 rồi 50, chương trình vẫn tính với 70 giờ. Lỗi ở đâu?", type: "multiple-choice",
          options: ["Điều kiện lặp sai", "Thiếu khối hỏi", "Khối “đặt tgian_laodong thành trả lời” đặt trước vòng lặp, không được gán lại sau khi hỏi lại", "Không có lỗi"],
          answer: 2, explanation: "Phải đặt biến SAU vòng lặp như Hình 16.1c.", level: "van-dung", activity: "san-loi" },
        { question: "Hộp 3 — Vòng lặp: lặp lại cho đến khi (trả lời < 1 hoặc trả lời > 60): hỏi lại số giờ. Nhập 50 thì máy hỏi lại mãi, nhập 70 thì được chấp nhận. Lỗi ở đâu?", type: "multiple-choice",
          options: ["Thiếu khối “không phải” — điều kiện dừng bị ngược", "Phải dùng “và” thay “hoặc”", "Sai số 60", "Thiếu khối nói"],
          answer: 0, explanation: "Đúng là: lặp lại cho đến khi KHÔNG PHẢI (trả lời < 1 hoặc trả lời > 60).", level: "van-dung", activity: "san-loi" },
        { question: "Hộp 4 — Nhánh đúng: đặt tgian_vuot thành (40 − tgian_laodong). Nhập 100 và 50 giờ, tiền lương chỉ 2500. Lỗi ở đâu?", type: "multiple-choice",
          options: ["Phép trừ bị đảo: tgian_vuot = tgian_laodong − 40", "Sai định mức 40", "Phải nhân 2", "Thiếu biến tgian_dmuc"],
          answer: 0, explanation: "40 − 50 = −10 → luong_vuot = −1500 → 4000 − 1500 = 2500. Đúng phải là 50 − 40 = 10 giờ vượt.", level: "van-dung-cao", activity: "san-loi" },
        { question: "Hộp 5 — Tìm max: khối “đặt max thành 0” bị đặt vào trong vòng lặp. Nhập 8 3 10 6 0, kết quả là 6. Lỗi ở đâu?", type: "multiple-choice",
          options: ["Khởi tạo max = 0 phải đặt trước vòng lặp; trong vòng lặp max bị đặt lại 0 mỗi lần", "Điều kiện x = 0 sai", "Phải so sánh x < max", "Không có lỗi"],
          answer: 0, explanation: "Giá trị khởi đầu của vòng lặp đặt một lần trước vòng lặp.", level: "van-dung", activity: "san-loi" },
        { question: "Hộp 6 — Tìm max: trong vòng lặp, khối hỏi số tiếp theo đặt TRƯỚC khối “nếu x > max thì…”. Nhập 12 8 3 0, kết quả là 8. Lỗi ở đâu?", type: "multiple-choice",
          options: ["Thiếu biến x", "Phải bắt đầu max = 12", "Sai thứ tự khối trong thân lặp: số đầu tiên (12) chưa được so sánh đã bị thay bằng số tiếp theo", "Điều kiện x > max sai"],
          answer: 2, explanation: "Thân lặp phải so sánh x với max TRƯỚC, rồi mới nhập x tiếp theo (bước 4.1 rồi 4.2).", level: "van-dung-cao", activity: "san-loi" },
      ],
    },

    /* ===================== LUYỆN TẬP ===================== */
    {
      id: "luyen-tap", name: "Luyện tập: Loại bỏ số âm (tình huống 6, Bảng 16.2) ✍️", type: "knowledge",
      goal: "Chỉnh sửa chương trình tìm max để phát hiện và loại bỏ giá trị đầu vào chưa hợp lí (số âm).",
      time: 480,
      task: "Luyện tập SGK tr.86: bộ giá trị ở tình huống 6 (Bảng 16.2) cho thấy có những giá trị đầu vào chưa hợp lí (−5). Hãy chỉnh sửa chương trình để có một chương trình hoạt động tốt; chạy lại toàn bộ Bảng 16.2 để kiểm tra.",
      sgkImage: "assets/sgk/bang-16-2.jpg",
      content: {
        heading: "✍️ Gợi ý: kiểm tra mỗi lần nhập x",
        revealLabel: "💡 Gợi ý cách sửa",
        blocks: [
          { kind: "html", value: SUA_SO_AM },
          { kind: "html", value: HINT("Sửa tương tự ở cả hai chỗ nhập x (số đầu tiên và số tiếp theo). Số 0 vẫn được nhập để kết thúc dãy. Đây là một cách gợi ý — em có thể có cách khác.") },
        ],
      },
      questions: [
        { question: "Vì sao điều kiện dừng vòng lặp nhập lại là “không phải (trả lời < 0)” mà không phải “trả lời > 0”?", type: "multiple-choice",
          options: ["Vì phải cho phép nhập số 0 để kết thúc dãy", "Vì Scratch không có dấu >", "Vì số 0 là số âm", "Không có lí do"],
          answer: 0, explanation: "Nếu bắt trả lời > 0 thì không nhập được 0 để kết thúc — chương trình không dừng được.", level: "van-dung-cao", activity: "luyen-tap" },
        { question: "Sau khi sửa, nhập 8 −5 3 9 6 0 thì chương trình:", type: "multiple-choice",
          options: ["Báo lỗi và dừng", "Kết quả là −5", "Kết quả là 8", "Hỏi lại khi gặp −5, kết quả vẫn là 9"],
          answer: 3, explanation: "Số âm bị loại (yêu cầu nhập lại), các số hợp lệ vẫn được so sánh: max = 9.", level: "van-dung", activity: "luyen-tap" },
      ],
    },

    /* ===================== VẬN DỤNG ===================== */
    {
      id: "van-dung", name: "Vận dụng: Bỏ qua dữ liệu chữ (tình huống 8) 🔠", type: "knowledge",
      goal: "Sửa chương trình để xác thực dữ liệu và bỏ qua dữ liệu dạng chữ.",
      time: 300,
      task: "Vận dụng SGK tr.86: ngôn ngữ lập trình trực quan không phân biệt dữ liệu số hay chữ nên chương trình Nhiệm vụ 2 cho kết quả sai với tình huống 8. Hãy sửa chương trình để xác thực dữ liệu và bỏ qua dữ liệu dạng chữ. Hoàn thiện ở nhà, gửi sản phẩm qua mail/Zalo.",
      sgkImage: "assets/sgk/sgk-trang86.jpg",
      content: {
        heading: "🔠 Gợi ý: nhận biết câu trả lời có phải là số",
        revealLabel: "💡 Gợi ý cách sửa",
        blocks: [
          { kind: "html", value: SUA_DU_LIEU_CHU },
          { kind: "html", value: HINT("Trong Scratch, chữ đem trừ 0 cho kết quả 0 (khác với chính nó), còn số trừ 0 bằng chính nó. Vì vậy điều kiện <b>(trả lời − 0) = trả lời</b> đúng khi câu trả lời là số. Có thể kết hợp với điều kiện loại số âm ở phần Luyện tập.") },
        ],
      },
      questions: [
        { question: "Với gợi ý trên, nhập “data” thì chương trình làm gì?", type: "multiple-choice",
          options: ["Hỏi lại vì (data − 0) = 0, khác “data” nên điều kiện sai", "Đặt x thành data", "Dừng chương trình", "Đặt x thành 0 và kết thúc"],
          answer: 0, explanation: "Dữ liệu chữ bị bỏ qua (yêu cầu nhập lại); sau khi sửa, tình huống 8 cho kết quả đúng 12.", level: "van-dung-cao", activity: "van-dung" },
      ],
    },
    {
      id: "van-dung-nha", name: "Nhìn lại: Em đã gỡ lỗi như thế nào? 📝", type: "vandung",
      goal: "Tự đánh giá quá trình lập trình và gỡ lỗi.",
      time: 180,
      task: "Nhóm đôi gửi câu trả lời cho thầy/cô; tiết sau báo cáo sản phẩm.",
      intro: "Gửi câu trả lời cho thầy/cô rồi bấm để xem gợi ý.",
      cases: [
        { question: "Trong khi thực hành, chương trình của nhóm em đã gặp lỗi nào? Nguyên nhân là gì (sai thứ tự lệnh, sai điều kiện, thiếu bước, sai cách viết số…) và em đã sửa thế nào?",
          answer: "Ví dụ: viết 1,5 thay cho 1.5 → sửa thành 1.5; đặt biến trước vòng lặp nên giá trị sai không được thay → chuyển khối đặt biến ra sau vòng lặp; thiếu khối “không phải” nên điều kiện dừng bị ngược → thêm khối “không phải”. Luôn chạy lại toàn bộ bảng dữ liệu kiểm thử sau khi sửa." },
      ],
    },

    /* ===================== TỔNG KẾT ===================== */
    {
      id: "tong-ket", name: "Tổng kết", type: "summary",
      task: "Cả lớp nhắc lại kiến thức trọng tâm và làm thử thách cuối. Dặn dò: hoàn thiện hai chương trình, gửi sản phẩm cho thầy/cô.",
      content: {
        learned: [
          "Ngôn ngữ lập trình có các cấu trúc tuần tự, rẽ nhánh, lặp.",
          "Chương trình là bản mô tả thuật toán mà máy tính “hiểu” và thực hiện được.",
          "Đôi khi phải hiệu chỉnh mô tả thuật toán (lặp với điều kiện sau → điều kiện trước).",
          "Gỡ lỗi bằng bộ dữ liệu kiểm thử, mỗi bộ một tình huống.",
          "Chương trình tốt phát hiện, loại bỏ dữ liệu không đúng yêu cầu.",
        ],
        challenge: [
          { question: "Mức lương 100 nghìn đồng/giờ, làm 45 giờ. Chương trình đúng hiển thị tiền lương là:", type: "multiple-choice",
            options: ["4500", "5000", "4750", "6750"],
            answer: 2, explanation: "4000 + 5 × 100 × 1.5 = 4750 (nghìn đồng).", level: "van-dung", activity: "tong-ket" },
          { question: "Khi lập bộ dữ liệu kiểm thử, vì sao cần có các giá trị như 40 giờ, 60 giờ, 70 giờ?", type: "multiple-choice",
            options: ["Để chương trình chạy lâu hơn", "Vì SGK bắt buộc số chẵn", "Không cần thiết", "Mỗi bộ đại diện cho một tình huống: đúng định mức, đúng mức tối đa, vượt mức cho phép — dễ lộ lỗi ở các mốc"],
            answer: 3, explanation: "Dữ liệu kiểm thử nên bao quát các tình huống, đặc biệt các giá trị ở mốc giới hạn.", level: "van-dung-cao", activity: "tong-ket" },
        ],
      },
    },
  ],
};

if (typeof module !== "undefined" && module.exports) module.exports = LESSON;
if (typeof window !== "undefined") window.LESSON = LESSON;
