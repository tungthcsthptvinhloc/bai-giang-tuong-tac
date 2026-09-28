/* ============================================================================
 * BÀI 9a — TẠO ĐẦU TRANG, CHÂN TRANG CHO VĂN BẢN  (Tin học 8 — Kết nối tri thức với cuộc sống)
 * Chủ đề 4a: Soạn thảo văn bản và trình chiếu nâng cao.
 * Bám sát SGK trang 42–45 + Kế hoạch bài dạy (2 tiết) của giáo viên.
 * Chỉ sửa file này để đổi nội dung. Engine app.js không cần sửa.
 * GV chọn: Luyện tập = trò chơi Tiếp sức (giáo án, 2 đội leo bậc) + thực hành a, b (SGK); Vận dụng theo SGK (Hình 9a.7);
 * KHÔNG mô phỏng Header/Footer (làm trên Word thật). Trang văn bản mẫu trong câu hỏi do app tự vẽ (hàm PG) thay cho ảnh trong giáo án.
 * ==========================================================================*/

// Trang văn bản mẫu (HTML): head/foot = [trái, giữa, phải]; num = "tl" | "tc" | "tr" | "bl" | "bc" | "br" (vị trí số trang)
const PG = (o) => {
  const n = o.n || 1, pos = o.num || "";
  const slot = (row, i) => {
    const arr = (o[row] || ["", "", ""]).slice(), k = "lcr"[i];
    let v = arr[i] ? `<i>${arr[i]}</i>` : "";
    if (pos === (row === "head" ? "t" : "b") + k) v = `<b style="color:#dc2626;font-style:normal;font-size:1.35em">${n}</b>` + (v ? " " + v : "");
    return `<span style="flex:1 1 0;min-width:0;white-space:nowrap;text-align:${["left", "center", "right"][i]}">${v}</span>`;
  };
  const row = (r) => `<div style="display:flex;gap:4px;min-height:1.3em;color:#e8590c;font-size:.8em${o.line ? ";border-" + (r === "head" ? "bottom" : "top") + ":2px solid #ef4444;padding:2px 0" : ""}">${[0, 1, 2].map((i) => slot(r, i)).join("")}</div>`;
  const bars = Array.from({ length: o.lines || 9 }, (_, i) => `<div style="height:.42em;margin:.42em 0;background:#cbd5e1;border-radius:3px;width:${[96, 88, 92, 70, 94, 84, 90, 62, 86, 78][i % 10]}%"></div>`).join("");
  return `<div style="display:inline-flex;flex-direction:column;justify-content:space-between;width:${o.w || 210}px;aspect-ratio:1/1.35;background:#fff;border:1px solid #94a3b8;box-shadow:0 3px 10px rgba(0,0,0,.15);padding:10px 14px;font-family:Calibri,Arial,sans-serif;font-size:15px;color:#1e293b;margin:6px;vertical-align:top">`
    + row("head")
    + `<div style="flex:1;padding:6px 0">${o.title ? `<div style="text-align:center;font-weight:800;font-size:.95em;margin:.2em 0 .4em">${o.title}</div>` : ""}${bars}</div>`
    + row("foot") + `</div>`;
};
const PAGES = (arr, labels) => `<div style="text-align:center">${arr.map((p, i) => (labels ? `<span style="display:inline-flex;flex-direction:column;align-items:center;vertical-align:top">${p}<b style="font-size:1.2rem">${labels[i]}</b></span>` : p)).join("")}</div>`;
const IMG2 = (src, cap, w) => `<figure style="margin:0 auto;max-width:${w || 620}px"><img src="${src}" alt="${cap}" style="width:100%;border-radius:8px"><figcaption class="caption">${cap}</figcaption></figure>`;

const LESSON = {
  meta: {
    subject: "Tin học", grade: "8", book: "Kết nối tri thức với cuộc sống",
    title: "Bài 9a: Tạo đầu trang, chân trang cho văn bản", unit: "Chủ đề 4a — Soạn thảo văn bản và trình chiếu nâng cao",
    pages: "42–45", durationMinutes: 90,
  },
  objectives: {
    knowledge: [
      "Thực hiện được các thao tác: đánh số trang, thêm đầu trang và chân trang.",
      "Tạo được sản phẩm là văn bản có tính thẩm mĩ phục vụ nhu cầu thực tế.",
    ],
    competencies: [
      "Tự chủ và tự học; giao tiếp và hợp tác (thảo luận nhóm, thực hành 2 HS/máy, trò chơi tiếp sức); giải quyết vấn đề và sáng tạo.",
      "Năng lực số 3.1.TC2a: thêm đầu trang, chân trang, đánh số trang tự động; chọn vị trí số trang phù hợp.",
      "Năng lực số 5.2.TC2b: tạo văn bản hoàn chỉnh có đầu trang, chân trang, số trang — rõ ràng, thống nhất, chuyên nghiệp.",
      "Năng lực AI 8.C2.2: AI có thể hỗ trợ tự động hoá trình bày tài liệu nhưng người dùng cần kiểm tra kết quả.",
    ],
    qualities: ["Chăm chỉ, trách nhiệm, trung thực; có ý thức trình bày văn bản khoa học, thống nhất, đẹp mắt."],
  },
  coreKnowledge: [
    "Đầu trang (Header) và chân trang (Footer) lần lượt là phần trên cùng (lề trên) và dưới cùng (lề dưới) của văn bản; là phần riêng biệt với văn bản chính.",
    "Đầu trang, chân trang thường chứa thông tin ngắn gọn (chú thích, số trang, tên văn bản, tên tác giả,…), có thể chứa hình ảnh, hình đồ hoạ; tự động xuất hiện ở tất cả các trang.",
    "Số trang trong văn bản được đánh tự động và được đặt ở đầu trang hoặc chân trang (bên trái, giữa hoặc bên phải).",
    "Thực hiện: Insert › nhóm Header & Footer › Header / Footer (Blank, nhập vào ô [Type here]) · Page Number (Top of Page / Bottom of Page › Plain Number 1, 2, 3) · Close Header and Footer.",
  ],
  keywords: ["Đầu trang (Header)", "Chân trang (Footer)", "Đánh số trang (Page Number)", "Tự động", "Close Header and Footer"],
  settings: { basePoints: 100, useTimer: false, defaultTime: 60, sound: true, streakEnabled: true },

  activities: [
    /* =========================== TIẾT 1 =========================== */
    /* ===================== HĐ1: MỞ ĐẦU (5 phút) ===================== */
    {
      id: "mo-dau", name: "Mở đầu — Hai trang văn bản có gì khác? 🔎", type: "knowledge",
      goal: "Tạo hứng thú; nhận ra đầu trang, chân trang, số trang và tác dụng của chúng.",
      time: 300,
      task: "Quan sát Hình 9a.1, Hình 9a.2 và tìm ra những phần khác nhau trong hai trang văn bản. Trong các cuốn sách, truyện em đã đọc có các thành phần văn bản đó không? Tác dụng của chúng là gì?",
      sgkImage: "assets/sgk/mo-dau.jpg",
      html: IMG2("assets/sgk/hinh-9a-1-2.jpg", "Hình 9a.1 và Hình 9a.2. Trang văn bản", 640),
      content: {
        revealLabel: "📌 Giáo viên chốt",
        blocks: [
          { kind: "list", value: [
            "Hình 9a.2 có đầu trang (Header) và chân trang (Footer) lần lượt là phần trên cùng (phần lề trên) và dưới cùng (phần lề dưới) của văn bản.",
            "Chúng là các phần riêng biệt với văn bản chính và thường được sử dụng để chứa chú thích, số trang, tên văn bản, tên tác giả,…",
          ] },
        ],
      },
      questions: [
        { question: "Trang văn bản Hình 9a.2 có thêm những phần nào so với Hình 9a.1? (Chọn tất cả ý đúng)", type: "multiple-select",
          options: ["Dòng chữ “Tài liệu dự án” ở phía trên cùng", "Số trang “1” ở phía dưới", "Dòng chữ “CLB Tin học” ở phía dưới cùng", "Tiêu đề “DỰ ÁN THÀNH LẬP CLB TIN HỌC”", "Danh sách các công việc cần làm"],
          answer: [0, 1, 2], explanation: "Hai trang có cùng nội dung chính; Hình 9a.2 có thêm đầu trang “Tài liệu dự án”, số trang “1” và chân trang “CLB Tin học”.", level: "nhan-biet", activity: "mo-dau" },
        { question: "Trong sách, truyện em đọc, các thành phần như số trang, tên sách ở mép trên/dưới trang có tác dụng gì?", type: "multiple-choice",
          options: ["Giúp người đọc biết đang đọc tài liệu nào, trang nào — dễ theo dõi, tra cứu", "Chỉ để trang trí cho đẹp", "Để lấp chỗ trống trên trang", "Không có tác dụng gì"],
          answer: 0, explanation: "Thông tin ở đầu trang, chân trang giúp phân loại, kiểm soát các trang và giúp văn bản chuyên nghiệp hơn.", level: "thong-hieu", activity: "mo-dau" },
      ],
    },

    /* ===================== HĐ2.1: ĐẦU TRANG VÀ CHÂN TRANG (15 phút) ===================== */
    {
      id: "hd1-dau-chan-trang", name: "1. Hoạt động 1: Đầu trang và chân trang cho em biết gì? 📄", type: "knowledge",
      goal: "Nêu được khái niệm, vị trí, vai trò của đầu trang, chân trang.",
      time: 600,
      task: "Nhóm đôi (động não 3 phút): Trong trang văn bản Hình 9a.2, phần văn bản màu cam có nội dung “Tài liệu dự án” và “CLB Tin học” cho em biết điều gì? Ghi vào phiếu học tập: 1) Đầu trang là gì? 2) Chân trang là gì? 3) Thông tin thường có trong hai phần này là gì?",
      sgkImage: "assets/sgk/hoat-dong-1.jpg",
      content: {
        revealLabel: "📖 Đầu trang và chân trang (SGK tr.42–43)",
        blocks: [
          { kind: "image", value: "assets/sgk/hinh-9a-3.jpg", caption: "Hình 9a.3. Vị trí của đầu trang và chân trang" },
          { kind: "text", value: "Đầu trang (Header) và chân trang (Footer) lần lượt là phần trên cùng (phần lề trên) và dưới cùng (phần lề dưới) của văn bản. Chúng là các phần riêng biệt với văn bản chính và thường được sử dụng để chứa chú thích, số trang, tên văn bản, tên tác giả,… Đầu trang và chân trang cũng có thể chứa hình ảnh hay hình đồ hoạ." },
          { kind: "text", value: "Các thông tin đặt trong phần đầu trang và chân trang sẽ tự động xuất hiện ở tất cả các trang. Nhờ vậy, em có thể cố định một số thông tin cần xuyên suốt cả văn bản. Đầu trang và chân trang thường chứa thông tin ngắn gọn về văn bản giúp phân loại, kiểm soát các trang trong văn bản. Ngoài ra thông tin ở đầu trang và chân trang còn giúp trang văn bản chuyên nghiệp và đẹp hơn nhờ cách sắp xếp thông tin hay các hình ảnh trang trí." },
          { kind: "text", value: "Ví dụ: Trang văn bản trong Hình 9a.2 có thông tin trong phần đầu trang và chân trang cho người đọc biết tên của văn bản là “Tài liệu dự án”, trang hiện tại là trang số “1” và văn bản thuộc về “CLB Tin học”." },
        ],
      },
      remember: ["Đầu trang và chân trang là phần riêng biệt với văn bản chính; thường chứa thông tin ngắn gọn; thường được tự động thêm vào tất cả các trang trong văn bản sau khi tạo."],
      questions: [
        { question: "Trong Hình 9a.2, phần chữ màu cam “Tài liệu dự án” và “CLB Tin học” cho em biết điều gì?", type: "multiple-choice",
          options: ["Tên tác giả và ngày viết", "Nội dung chính của trang", "Chú thích cho từng công việc", "Tên của văn bản là “Tài liệu dự án” và văn bản thuộc về “CLB Tin học”"],
          answer: 3, explanation: "Đầu trang cho biết tên văn bản “Tài liệu dự án”; chân trang cho biết văn bản thuộc về “CLB Tin học”; trang hiện tại là trang số “1”.", level: "thong-hieu", activity: "hd1-dau-chan-trang" },
        { question: "Đầu trang (Header) và chân trang (Footer) nằm ở đâu trên trang văn bản?", type: "multiple-choice",
          options: ["Đầu trang ở lề trái, chân trang ở lề phải", "Cả hai đều nằm giữa trang", "Đầu trang ở phần trên cùng (lề trên), chân trang ở phần dưới cùng (lề dưới)", "Chỉ ở trang đầu tiên của văn bản"],
          answer: 2, explanation: "Đầu trang: phần trên cùng (lề trên); chân trang: phần dưới cùng (lề dưới) — Hình 9a.3.", level: "nhan-biet", activity: "hd1-dau-chan-trang" },
        { question: "Thông tin nào thường được đặt ở đầu trang, chân trang? (Chọn tất cả ý đúng)", type: "multiple-select",
          options: ["Số trang", "Tên văn bản", "Tên tác giả", "Chú thích", "Toàn bộ nội dung bài viết"],
          answer: [0, 1, 2, 3], explanation: "Đầu trang, chân trang chứa thông tin ngắn gọn: chú thích, số trang, tên văn bản, tên tác giả,… (có thể có hình ảnh, hình đồ hoạ). Nội dung chính nằm ở phần văn bản chính.", level: "nhan-biet", activity: "hd1-dau-chan-trang" },
        { question: "Câu hỏi SGK tr.43 — Em hãy chọn những phương án ĐÚNG:", type: "multiple-select",
          sgkImage: "assets/sgk/cau-hoi-tr43.jpg",
          options: ["Đầu trang và chân trang là đoạn văn bản đầu tiên và cuối cùng trong một trang.", "Thông tin ở phần đầu trang và chân trang thường ngắn gọn và được tự động thêm vào tất cả các trang trong văn bản sau khi tạo.", "Đầu trang và chân trang là văn bản hoặc hình ảnh được chèn vào lề trên và lề dưới.", "Không thể đưa hình ảnh vào đầu trang và chân trang."],
          answer: [1, 2], explanation: "B, C đúng. A sai: đầu trang, chân trang là phần riêng biệt với văn bản chính (không phải đoạn đầu/cuối của nội dung). D sai: đầu trang, chân trang có thể chứa hình ảnh, hình đồ hoạ.", level: "thong-hieu", activity: "hd1-dau-chan-trang" },
      ],
    },
    {
      id: "dau-chan-hay-noi-dung", name: "Trò chơi: Đầu trang, chân trang hay nội dung? 🧩", type: "dragdrop",
      goal: "Phân biệt thông tin nên đặt ở đầu trang, chân trang với nội dung văn bản chính.",
      time: 240,
      task: "Tài liệu dự án Thành lập CLB Tin học có các thông tin dưới đây. Xếp mỗi thông tin vào vùng phù hợp rồi bấm Nộp bài.",
      groups: ["📌 Đầu trang / chân trang (ngắn gọn, lặp lại ở mọi trang)", "📄 Nội dung văn bản chính"],
      items: [
        { text: "Tên văn bản “Tài liệu dự án”", group: 0 },
        { text: "Số trang", group: 0 },
        { text: "Tên đơn vị “CLB Tin học”", group: 0 },
        { text: "Tên nhóm thực hiện “Nhóm 1”", group: 0 },
        { text: "Danh sách các công việc cần làm", group: 1 },
        { text: "Phiếu khảo sát với 6 nội dung Tin học", group: 1 },
        { text: "Bảng phân công thực hiện", group: 1 },
        { text: "Đoạn giới thiệu mục đích thành lập CLB", group: 1 },
      ],
      explanation: "Đầu trang, chân trang chứa thông tin ngắn gọn, cần xuyên suốt cả văn bản (tên văn bản, tên đơn vị, tên nhóm, số trang). Nội dung chi tiết thuộc phần văn bản chính.",
    },

    /* ===================== HĐ2.2: ĐÁNH SỐ TRANG (5 phút) ===================== */
    {
      id: "hd2-so-trang", name: "2. Hoạt động 2: Số trang trong văn bản 🔢", type: "knowledge",
      goal: "Nêu ý nghĩa của đánh số trang; nhận biết vị trí đặt số trang.",
      time: 420,
      task: "Nhóm (khăn trải bàn 3 phút): Trong sách giáo khoa, sách văn học, truyện mà em đọc, em có nhìn thấy số trang của sách không? Số trang sách thường nằm ở đâu?",
      sgkImage: "assets/sgk/hoat-dong-2.jpg",
      content: {
        revealLabel: "📖 Đánh số trang (SGK tr.43)",
        blocks: [
          { kind: "text", value: "Các tài liệu dạng văn bản, nhất là các văn bản dài thường đánh số trang để người đọc dễ theo dõi. Phần mềm soạn thảo văn bản có chức năng đánh số trang tự động cho văn bản. Số trang thường được đặt ở đầu trang hoặc chân trang. Em có thể lựa chọn đặt số trang ở vị trí bên trái, bên phải hoặc giữa." },
          { kind: "image", value: "assets/sgk/hinh-9a-4.jpg", caption: "Hình 9a.4. Ví dụ cách đặt số trang" },
        ],
      },
      remember: ["Số trang trong văn bản được đánh tự động và được đặt ở đầu trang hoặc chân trang."],
      questions: [
        { question: "Số trang của sách thường nằm ở đâu?", type: "multiple-choice",
          options: ["Ở đầu trang hoặc chân trang (bên trái, giữa hoặc bên phải)", "Ở giữa nội dung trang", "Chỉ ở trang bìa", "Ở cuối mỗi đoạn văn"],
          answer: 0, explanation: "Số trang thường được đặt ở đầu trang hoặc chân trang, ở vị trí bên trái, giữa hoặc bên phải.", level: "nhan-biet", activity: "hd2-so-trang" },
        { question: "Câu hỏi SGK tr.44 — Em hãy chọn phương án SAI:", type: "multiple-choice",
          sgkImage: "assets/sgk/cau-hoi-tr44.jpg",
          options: ["Đánh số trang giúp người đọc biết độ dài của văn bản (nhìn số trang cuối).", "Đánh số trang, cùng với mục lục, giúp người đọc dễ dàng tìm thấy các phần cụ thể của văn bản.", "Đánh số trang cho phép trích dẫn một trang cụ thể của văn bản.", "Phần mềm soạn thảo văn bản không có chức năng đánh số trang tự động."],
          answer: 3, explanation: "D sai: phần mềm soạn thảo văn bản có chức năng đánh số trang tự động (Insert › Page Number).", level: "nhan-biet", activity: "hd2-so-trang" },
        { question: "Văn bản 12 trang, em chèn thêm 2 trang vào giữa. Số trang của các trang phía sau sẽ thế nào?", type: "multiple-choice",
          options: ["Giữ nguyên, phải sửa bằng tay", "Bị xoá hết", "Tự động đánh lại, trang cuối thành trang 14", "Các trang mới không có số"],
          answer: 2, explanation: "Số trang được đánh tự động nên tự cập nhật khi văn bản thay đổi.", level: "van-dung", activity: "hd2-so-trang" },
      ],
    },
    {
      id: "doan-vi-tri-so-trang", name: "Trò chơi: Đoán vị trí số trang 🎯", type: "quiz",
      goal: "Xác định vị trí số trang và chọn đúng mẫu Page Number.",
      time: 360,
      task: "Quan sát trang văn bản mẫu, cho biết số trang (màu đỏ) được đặt ở vị trí nào và cần chọn mẫu Page Number nào.",
      questions: [
        { question: "Số trang của trang văn bản này được đặt ở vị trí nào?", type: "multiple-choice",
          html: PAGES([PG({ n: 10, num: "tc", title: "BẢN TIN LỚP 8A" })]),
          options: ["Đầu trang, bên trái", "Đầu trang, giữa", "Chân trang, giữa", "Đầu trang, bên phải"],
          answer: 1, explanation: "Số 10 nằm ở phần trên cùng, chính giữa → đầu trang, giữa (như Hình 9a.4).", level: "nhan-biet", activity: "doan-vi-tri-so-trang" },
        { question: "Số trang của trang văn bản này được đặt ở vị trí nào?", type: "multiple-choice",
          html: PAGES([PG({ n: 7, num: "br", title: "ĐỀ CƯƠNG ÔN TẬP" })]),
          options: ["Chân trang, bên phải", "Chân trang, bên trái", "Đầu trang, bên phải", "Chân trang, giữa"],
          answer: 0, explanation: "Số 7 nằm ở phần dưới cùng, bên phải → chân trang, bên phải.", level: "nhan-biet", activity: "doan-vi-tri-so-trang" },
        { question: "SGK: chọn Page Number › Bottom of Page › Plain Number 2. Trang nào đúng kết quả?", type: "multiple-choice",
          html: PAGES([PG({ n: 1, num: "tc", w: 150, lines: 6 }), PG({ n: 1, num: "bl", w: 150, lines: 6 }), PG({ n: 1, num: "bc", w: 150, lines: 6 }), PG({ n: 1, num: "tr", w: 150, lines: 6 })], ["A", "B", "C", "D"]),
          options: ["Trang A", "Trang B", "Trang C", "Trang D"],
          answer: 2, explanation: "Bottom of Page = chân trang; Plain Number 2 = ở giữa → số trang ở vị trí giữa, bên dưới trang văn bản (trang C).", level: "thong-hieu", activity: "doan-vi-tri-so-trang" },
        { question: "Để số trang nằm ở ĐẦU TRANG, BÊN TRÁI như trang dưới đây, em chọn Page Number ›", type: "multiple-choice",
          html: PAGES([PG({ n: 10, num: "tl", title: "KẾ HOẠCH TRỒNG CÂY" })]),
          options: ["Bottom of Page › Plain Number 1", "Top of Page › Plain Number 3", "Top of Page › Plain Number 1", "Bottom of Page › Plain Number 3"],
          answer: 2, explanation: "Top of Page = đầu trang; Plain Number 1 = bên trái (2 = giữa, 3 = bên phải).", level: "van-dung", activity: "doan-vi-tri-so-trang" },
        { question: "Luyện tập SGK b) — Đặt lại số trang vào vị trí bên trái của chân trang. Em chọn Page Number ›", type: "multiple-choice",
          html: PAGES([PG({ n: 1, num: "bl", head: ["", "", "Tài liệu dự án"], foot: ["", "", "CLB Tin học"], title: "DỰ ÁN THÀNH LẬP CLB TIN HỌC" })]),
          options: ["Bottom of Page › Plain Number 3", "Bottom of Page › Plain Number 1", "Top of Page › Plain Number 1", "Page Margins"],
          answer: 1, explanation: "Bottom of Page (chân trang) › Plain Number 1 (bên trái).", level: "van-dung", activity: "doan-vi-tri-so-trang" },
      ],
    },

    /* ===================== HĐ2.3: THỰC HÀNH (50 phút) ===================== */
    {
      id: "thuc-hanh", name: "3. Thực hành: Đánh số trang, thêm đầu trang và chân trang 🖥️", type: "knowledge",
      goal: "Đánh số trang, thêm đầu trang, chân trang cho tệp CLBTinhoc.docx theo mẫu Hình 9a.5.",
      time: 1800,
      task: "Nhiệm vụ (2 HS/máy): Mở tệp CLBTinhoc.docx đã tạo ở Bài 8a (phần Luyện tập), bổ sung thêm nội dung (Phiếu khảo sát ở trang 2), đánh số trang, thêm đầu trang và chân trang cho văn bản theo mẫu trong Hình 9a.5.",
      sgkImage: "assets/sgk/nhiem-vu.jpg",
      html: IMG2("assets/sgk/hinh-9a-5.jpg", "Hình 9a.5. Văn bản sau khi bổ sung nội dung, đánh số trang, thêm đầu trang và chân trang", 560),
      content: {
        revealLabel: "🔢 Hướng dẫn (SGK tr.44–45)",
        blocks: [
          { kind: "list", value: [
            "Mở tệp CLBTinhoc.docx.",
            "Chọn Insert, trong nhóm lệnh Header & Footer, nháy chuột chọn lệnh tương ứng theo hướng dẫn trong Hình 9a.6: Header để thêm đầu trang, Footer để thêm chân trang, Page Number để đánh số trang.",
          ] },
          { kind: "image", value: "assets/sgk/hinh-9a-6.jpg", caption: "Hình 9a.6. Nhóm lệnh Header & Footer" },
          { kind: "list", value: [
            "Sau khi chọn Page Number, em chọn Bottom of Page/Plain Number 2 để đánh số trang vào vị trí giữa, bên dưới trang văn bản.",
            "Sau khi chọn Header, em chọn Blank rồi nhập nội dung “Tài liệu dự án” vào ô [Type here], căn phải và tạo chữ in nghiêng, màu cam.",
            "Sau khi chọn Footer, em chọn Blank rồi nhập nội dung “CLB Tin học” vào ô [Type here], căn phải và tạo chữ in nghiêng, màu cam.",
            "Nháy chuột chọn lệnh Close Header and Footer để hoàn thành việc đánh số trang, thêm đầu trang và chân trang.",
            "Lưu ý: Em có thể thay đổi vị trí, căn lề, thay đổi cỡ chữ, phông chữ, màu sắc,… cho phần văn bản mà em nhập vào đầu trang và chân trang. Cách làm giống như với văn bản trong phần nội dung.",
            "Lưu văn bản.",
          ] },
        ],
      },
      questions: [
        { question: "Nhóm lệnh Header & Footer nằm ở thẻ nào?", type: "multiple-choice",
          options: ["Home", "Insert", "Layout", "View"],
          answer: 1, explanation: "Chọn Insert, trong nhóm lệnh Header & Footer có ba lệnh Header, Footer, Page Number (Hình 9a.6).", level: "nhan-biet", activity: "thuc-hanh" },
        { question: "Sau khi chọn Header › Blank, em nhập “Tài liệu dự án” vào đâu?", type: "multiple-choice",
          options: ["Vào ô [Type here] ở đầu trang", "Vào dòng đầu tiên của nội dung", "Vào hộp thoại Page Number", "Vào chân trang"],
          answer: 0, explanation: "Mẫu Blank tạo sẵn ô [Type here]; nhập nội dung vào đó rồi định dạng (căn phải, in nghiêng, màu cam).", level: "nhan-biet", activity: "thuc-hanh" },
        { question: "Muốn chữ “CLB Tin học” ở chân trang căn phải, in nghiêng, màu cam, em làm thế nào?", type: "multiple-choice",
          options: ["Không thể định dạng chữ ở chân trang", "Phải xoá chân trang và tạo lại", "Chỉ đổi được màu, không đổi được căn lề", "Chọn chữ rồi định dạng giống như với văn bản trong phần nội dung"],
          answer: 3, explanation: "SGK lưu ý: định dạng văn bản ở đầu trang, chân trang giống như với văn bản trong phần nội dung.", level: "thong-hieu", activity: "thuc-hanh" },
        { question: "Để thoát khỏi vùng đầu trang, chân trang và trở về soạn nội dung, em chọn lệnh:", type: "multiple-choice",
          options: ["Page Number", "Header", "Close Header and Footer", "File › Close"],
          answer: 2, explanation: "Close Header and Footer: hoàn thành việc đánh số trang, thêm đầu trang và chân trang.", level: "nhan-biet", activity: "thuc-hanh" },
        { question: "Văn bản có 2 trang. Em chỉ nhập “Tài liệu dự án” vào đầu trang của trang 1. Ở trang 2 thì sao?", type: "multiple-choice",
          options: ["Trang 2 cũng tự động có “Tài liệu dự án” ở đầu trang", "Trang 2 không có đầu trang", "Phải nhập lại cho trang 2", "Trang 2 có đầu trang nhưng trống"],
          answer: 0, explanation: "Thông tin ở đầu trang, chân trang tự động xuất hiện ở tất cả các trang (Hình 9a.5).", level: "van-dung", activity: "thuc-hanh" },
      ],
    },
    {
      id: "cac-buoc", name: "Trò chơi: Sắp xếp các bước thực hành 🔢", type: "ordering",
      goal: "Ghi nhớ quy trình đánh số trang, thêm đầu trang, chân trang.",
      time: 180,
      task: "Sắp xếp các bước thực hành theo hướng dẫn SGK cho đúng thứ tự rồi bấm Nộp bài.",
      steps: [
        "Mở tệp CLBTinhoc.docx",
        "Insert › Page Number › Bottom of Page › Plain Number 2",
        "Insert › Header › Blank — nhập “Tài liệu dự án”, căn phải, in nghiêng, màu cam",
        "Insert › Footer › Blank — nhập “CLB Tin học”, căn phải, in nghiêng, màu cam",
        "Chọn Close Header and Footer",
        "Lưu văn bản",
      ],
      explanation: "Mở tệp → đánh số trang → đầu trang → chân trang → Close Header and Footer → lưu (theo thứ tự hướng dẫn SGK tr.44–45).",
    },

    /* =========================== TIẾT 2 =========================== */
    /* ===================== HĐ3: LUYỆN TẬP (10 phút) ===================== */
    {
      id: "tiep-suc", name: "Luyện tập: Trò chơi Tiếp sức 🏃", type: "ladder",
      goal: "Củng cố kiến thức về đầu trang, chân trang, số trang.",
      time: 480,
      task: "Chia lớp thành 2 đội thay phiên trả lời (như chạy tiếp sức): mỗi câu đúng, nhân vật của đội leo lên 1 bậc. Đội nào lên cao hơn sẽ chiến thắng!",
      teams: [{ name: "Đội Sóc", icon: "🐿️" }, { name: "Đội Cáo", icon: "🦊" }],
      goalIcon: "🏆",
      questions: [
        { question: "Câu 1. Văn bản bên dưới đang hiển thị ở trang số mấy?", type: "multiple-choice",
          html: PAGES([PG({ n: 2, num: "tl", lines: 10 })]),
          options: ["Trang 1", "Trang 2", "Trang 3", "Không biết được"], answer: 1, explanation: "Số trang ở góc trên bên trái là 2.", level: "nhan-biet", activity: "tiep-suc" },
        { question: "Câu 2. Số trang của văn bản trên được đặt ở vị trí nào?", type: "multiple-choice",
          html: PAGES([PG({ n: 2, num: "tl", lines: 10 })]),
          options: ["Chân trang, giữa", "Đầu trang, bên phải", "Chân trang, bên trái", "Đầu trang, bên trái"], answer: 3, explanation: "Số trang nằm ở phần trên cùng, bên trái → đầu trang, bên trái.", level: "nhan-biet", activity: "tiep-suc" },
        { question: "Câu 3. Đầu trang của văn bản sau có nội dung là gì?", type: "multiple-choice",
          html: PAGES([PG({ head: ["Truyện cổ tích", "", ""], title: "TẤM CÁM", lines: 10 })]),
          options: ["Truyện cổ tích", "Tấm Cám", "Trang 1", "Không có đầu trang"], answer: 0, explanation: "Dòng chữ nhỏ ở phần trên cùng (lề trên) là đầu trang: “Truyện cổ tích”. “TẤM CÁM” là tiêu đề trong nội dung chính.", level: "thong-hieu", activity: "tiep-suc" },
        { question: "Câu 4. Phát biểu nào sau đây là SAI?", type: "multiple-choice",
          options: ["Đầu trang, chân trang có thể chứa chữ, hình ảnh, hình vẽ đồ hoạ và số trang (được đánh tự động).", "Nếu nhập nội dung đầu trang, chân trang, sau đó chọn mẫu đầu trang, chân trang có sẵn thì nội dung đã nhập sẽ bị mất.", "Có thể tự thiết kế đầu trang, chân trang hoặc chọn mẫu có sẵn.", "Nội dung đầu trang, chân trang chỉ xuất hiện tại trang được thêm đầu trang, chân trang."],
          answer: 3, explanation: "D sai: nội dung đầu trang, chân trang tự động xuất hiện ở tất cả các trang của văn bản.", level: "thong-hieu", activity: "tiep-suc" },
        { question: "Câu 5. Lệnh nào để thêm chân trang?", type: "multiple-choice", image: "assets/sgk/hinh-9a-6.jpg", imageCaption: "Hình 9a.6. Nhóm lệnh Header & Footer",
          options: ["Header", "Page Number", "Footer", "Table"], answer: 2, explanation: "Footer: chân trang; Header: đầu trang; Page Number: đánh số trang.", level: "nhan-biet", activity: "tiep-suc" },
        { question: "Câu 6. Văn bản có số trang ở chân trang. Muốn biết văn bản dài bao nhiêu trang, em xem:", type: "multiple-choice",
          options: ["Số trang của trang đầu tiên", "Đầu trang", "Số trang của trang cuối cùng", "Tên văn bản"], answer: 2, explanation: "Đánh số trang giúp biết độ dài văn bản (nhìn số trang cuối).", level: "thong-hieu", activity: "tiep-suc" },
        { question: "Câu 7. Trang nào đã có đầu trang “Tài liệu dự án”, chân trang “CLB Tin học” và số trang giữa chân trang như SGK?", type: "multiple-choice",
          html: PAGES([PG({ n: 1, num: "bc", head: ["", "", "Tài liệu dự án"], foot: ["", "", "CLB Tin học"], w: 170, lines: 6 }), PG({ n: 1, num: "tc", head: ["", "", "CLB Tin học"], foot: ["", "", "Tài liệu dự án"], w: 170, lines: 6 }), PG({ n: 1, num: "bl", head: ["Tài liệu dự án", "", ""], w: 170, lines: 6 })], ["A", "B", "C"]),
          options: ["Trang A", "Trang B", "Trang C", "Không trang nào"], answer: 0, explanation: "Trang A: đầu trang “Tài liệu dự án” căn phải, số trang giữa chân trang, chân trang “CLB Tin học” căn phải — đúng mẫu Hình 9a.5.", level: "van-dung", activity: "tiep-suc" },
        { question: "Câu 8. Muốn sửa nội dung đã nhập ở đầu trang, cách nhanh nhất là:", type: "multiple-choice",
          options: ["Xoá cả văn bản rồi làm lại", "Nháy đúp chuột vào vùng đầu trang rồi sửa", "Chọn Page Number", "Chọn File › Save"], answer: 1, explanation: "Nháy đúp chuột vào vùng đầu trang (hoặc chân trang) để mở lại vùng này và chỉnh sửa như văn bản thường.", level: "van-dung", activity: "tiep-suc" },
      ],
    },
    {
      id: "luyen-tap-sgk", name: "Luyện tập SGK: Hoàn thiện CLBTinhoc.docx ✍️", type: "knowledge",
      goal: "Bổ sung tên người/nhóm vào đầu trang; đặt lại số trang bên trái chân trang.",
      time: 600,
      task: "Mở tệp CLBTinhoc.docx và thực hiện: a) Bổ sung thêm tên người hoặc tên nhóm thực hiện dự án vào đầu trang; b) Đặt lại số trang vào vị trí bên trái của chân trang.",
      sgkImage: "assets/sgk/luyen-tap.jpg",
      html: PAGES([PG({ n: 1, num: "bl", head: ["Nhóm 1", "", "Tài liệu dự án"], foot: ["", "", "CLB Tin học"], title: "DỰ ÁN THÀNH LẬP CLB TIN HỌC", w: 220 }), PG({ n: 2, num: "bl", head: ["Nhóm 1", "", "Tài liệu dự án"], foot: ["", "", "CLB Tin học"], title: "PHIẾU KHẢO SÁT", w: 220 })]) + `<div class="caption">Kết quả mong đợi (ví dụ tên nhóm “Nhóm 1”)</div>`,
      questions: [
        { question: "a) Để bổ sung “Nhóm 1” vào bên trái đầu trang đã có “Tài liệu dự án” (căn phải), em làm thế nào?", type: "multiple-choice",
          options: ["Chèn một trang mới", "Nháy đúp vào vùng đầu trang, đặt con trỏ ở đầu dòng, nhập “Nhóm 1” rồi dùng phím Tab (hoặc căn lề) để tách hai phần", "Gõ “Nhóm 1” vào dòng đầu của nội dung", "Chọn Page Number › Top of Page"],
          answer: 1, explanation: "Mở vùng đầu trang (nháy đúp), nhập tên nhóm; chỉnh vị trí, căn lề như văn bản thường. Tên nhóm sẽ tự xuất hiện ở mọi trang.", level: "van-dung", activity: "luyen-tap-sgk" },
        { question: "b) Sau khi đặt lại số trang bên trái chân trang, trang 2 của văn bản sẽ có số trang ở đâu?", type: "multiple-choice",
          options: ["Giữa chân trang như cũ", "Không có số trang", "Bên trái đầu trang", "Bên trái chân trang, số 2 — tự động như trang 1"],
          answer: 3, explanation: "Số trang được đánh tự động và áp dụng cho mọi trang: trang 2 hiện số 2 ở bên trái chân trang.", level: "thong-hieu", activity: "luyen-tap-sgk" },
      ],
    },

    /* ===================== HĐ4: VẬN DỤNG (5 phút) ===================== */
    {
      id: "van-dung", name: "Vận dụng: Đường thẳng ở đầu trang, chân trang 📏", type: "knowledge",
      goal: "Tìm hiểu cách thêm hình ảnh, hình đồ hoạ vào đầu trang, chân trang; thêm đường thẳng theo mẫu Hình 9a.7.",
      time: 300,
      task: "Tìm hiểu cách thêm hình ảnh, hình đồ hoạ vào chân trang và đầu trang rồi bổ sung vào đầu trang và chân trang trong tệp CLBTinhoc.docx một đường thẳng theo mẫu như Hình 9a.7. Hoàn thiện ở nhà, gửi sản phẩm qua thư điện tử hoặc Zalo của thầy/cô.",
      sgkImage: "assets/sgk/van-dung.jpg",
      html: IMG2("assets/sgk/hinh-9a-7.jpg", "Hình 9a.7. Mẫu bổ sung đường thẳng vào đầu trang, chân trang", 560),
      content: {
        revealLabel: "💡 Gợi ý",
        blocks: [
          { kind: "list", value: [
            "Nháy đúp chuột vào vùng đầu trang để mở vùng đầu trang.",
            "Chọn Insert › Shapes › Line (đường thẳng), giữ phím Shift trong khi kéo thả chuột để vẽ đường nằm ngang dưới dòng chữ.",
            "Chọn đường thẳng › Format › Shape Outline để chọn màu (đỏ/cam) và độ dày (Weight).",
            "Làm tương tự ở chân trang (đường thẳng phía trên dòng chữ), rồi chọn Close Header and Footer. Đường thẳng sẽ xuất hiện ở mọi trang.",
            "Tương tự, em có thể chèn hình ảnh (Insert › Pictures) như logo CLB vào đầu trang, chân trang.",
          ] },
        ],
      },
      questions: [
        { question: "Khi vẽ đường thẳng trong vùng đầu trang, đường thẳng đó sẽ xuất hiện ở đâu?", type: "multiple-choice",
          options: ["Chỉ ở trang 1", "Ở đầu trang của tất cả các trang", "Chỉ ở trang cuối", "Ở giữa nội dung"],
          answer: 1, explanation: "Mọi nội dung trong đầu trang (chữ, hình ảnh, hình đồ hoạ) tự động xuất hiện ở tất cả các trang.", level: "van-dung", activity: "van-dung" },
      ],
    },

    /* ===================== TỔNG KẾT ===================== */
    {
      id: "tong-ket", name: "Tổng kết", type: "summary",
      task: "Cả lớp nhắc lại kiến thức trọng tâm và làm thử thách cuối. Về nhà: hoàn thiện Vận dụng; đọc trước Bài 10a: Định dạng nâng cao cho trang chiếu.",
      content: {
        learned: [
          "Đầu trang (Header) — lề trên, chân trang (Footer) — lề dưới: phần riêng biệt với văn bản chính, chứa thông tin ngắn gọn, tự động có ở mọi trang.",
          "Số trang được đánh tự động, đặt ở đầu trang hoặc chân trang (trái, giữa, phải).",
          "Insert › Header & Footer: Header / Footer (Blank → [Type here]), Page Number (Top/Bottom of Page › Plain Number 1, 2, 3), Close Header and Footer.",
        ],
        challenge: [
          { question: "Bạn Minh muốn mọi trang của bài báo cáo đều có dòng “Lớp 8A – Nhóm 3” ở trên cùng. Cách nào nhanh và đúng nhất?", type: "multiple-choice",
            options: ["Gõ dòng đó vào đầu mỗi trang", "Chèn dòng đó bằng Page Number", "Đặt dòng đó vào chân trang", "Đặt dòng đó vào đầu trang (Insert › Header)"],
            answer: 3, explanation: "Nội dung đặt ở đầu trang tự động xuất hiện ở mọi trang, không cần gõ lại.", level: "van-dung-cao", activity: "tong-ket" },
          { question: "Để số trang nằm ở chân trang, bên phải, em chọn:", type: "multiple-choice",
            options: ["Top of Page › Plain Number 3", "Bottom of Page › Plain Number 1", "Bottom of Page › Plain Number 3", "Top of Page › Plain Number 2"],
            answer: 2, explanation: "Bottom of Page = chân trang; Plain Number 3 = bên phải.", level: "van-dung", activity: "tong-ket" },
        ],
      },
    },
  ],
};

if (typeof module !== "undefined" && module.exports) module.exports = LESSON;
if (typeof window !== "undefined") window.LESSON = LESSON;
