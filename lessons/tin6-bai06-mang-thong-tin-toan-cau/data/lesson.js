/* ============================================================================
 * BÀI 6 — MẠNG THÔNG TIN TOÀN CẦU  (Tin học 6 — Kết nối tri thức)
 * Chủ đề 3: Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin.
 * Bám sát SGK trang 23–27 + Kế hoạch bài dạy (2 tiết) của giáo viên.
 * Nhiều hình thức tương tác: ghép đôi, lật thẻ, kéo–thả, sắp xếp, điền khuyết, quiz.
 * ==========================================================================*/

/* Sơ đồ website: trang chủ (giữa) nối các trang web bằng liên kết */
function websiteSVG() {
  const cx = 280, cy = 150;
  const pages = [[70, 55], [70, 245], [490, 55], [490, 245], [130, 150], [430, 150]];
  const pg = (x, y, home) => `<rect x="${x - 32}" y="${y - 22}" width="64" height="44" rx="6" fill="${home ? "#fef3c7" : "#fff"}" stroke="${home ? "#f59e0b" : "#1e40af"}" stroke-width="${home ? 3 : 2}"/>` +
    [0, 1, 2].map(i => `<line x1="${x - 22}" y1="${y - 10 + i * 9}" x2="${x + 22}" y2="${y - 10 + i * 9}" stroke="${home ? "#f59e0b" : "#93c5fd"}" stroke-width="2"/>`).join("") +
    (home ? `<text x="${x}" y="${y + 38}" text-anchor="middle" font-size="13" font-weight="800" fill="#b45309">Trang chủ</text>` : "");
  let links = pages.map(p => `<line x1="${cx}" y1="${cy}" x2="${p[0]}" y2="${p[1]}" stroke="#f87171" stroke-width="2.5" marker-end="url(#ar)"/>`).join("");
  return `<svg viewBox="0 0 560 300" width="100%" style="max-height:44vh" xmlns="http://www.w3.org/2000/svg" role="img">
    <defs><marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#f87171"/></marker></defs>
    <rect x="20" y="20" width="520" height="260" rx="16" fill="none" stroke="#93c5fd" stroke-width="2" stroke-dasharray="8 6"/>
    <text x="280" y="292" text-anchor="middle" font-size="13" fill="#4a5b86">🌐 Một website = nhiều trang web nối nhau bởi liên kết</text>
    ${links}
    ${pages.map(p => pg(p[0], p[1], false)).join("")}
    ${pg(cx, cy, true)}
  </svg>`;
}

const LESSON = {
  meta: {
    subject: "Tin học", grade: "6", book: "Kết nối tri thức với cuộc sống",
    title: "Bài 6: Mạng thông tin toàn cầu", unit: "Chủ đề 3 — Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin",
    pages: "23–27", durationMinutes: 90,
  },
  objectives: {
    knowledge: [
      "Trình bày sơ lược khái niệm World Wide Web, website, địa chỉ website, trình duyệt.",
      "Xem và nêu được các thông tin chính trên trang web cho trước.",
      "Khai thác được thông tin trên một số trang web thông dụng (tra từ điển, thời tiết, thời sự…).",
    ],
    competencies: [
      "Tự học; giao tiếp – hợp tác; giải quyết vấn đề.",
      "Năng lực số: nêu nhu cầu tìm tin (1.1.TC1a); truy cập & điều hướng web (1.1.TC1c); thao tác số rõ ràng (2.1.TC1a).",
    ],
    qualities: ["Chăm chỉ, trung thực, nhân ái, trách nhiệm; dùng Internet an toàn, tôn trọng bản quyền"],
  },
  coreKnowledge: [
    "Siêu văn bản (hypertext) là văn bản đặc biệt tích hợp nhiều dạng dữ liệu (văn bản, hình ảnh, âm thanh, video) và chứa các siêu liên kết.",
    "Trang web = một siêu văn bản có địa chỉ truy cập; Website = tập hợp các trang web liên quan, truy cập qua một địa chỉ chung.",
    "Trang chủ (homepage) là trang mở đầu tiên; địa chỉ trang chủ là địa chỉ của website.",
    "World Wide Web (WWW) là mạng thông tin toàn cầu, liên kết các website trên Internet.",
    "Trình duyệt là phần mềm để truy cập các trang web (Chrome, Firefox, Cốc Cốc, Edge, Safari…).",
  ],
  keywords: ["Siêu văn bản & liên kết", "Trang web · Website", "World Wide Web", "Trình duyệt"],
  settings: { basePoints: 100, useTimer: false, defaultTime: 60, sound: false, streakEnabled: true },

  activities: [
    /* ===================== HĐ1: MỞ ĐẦU ===================== */
    {
      id: "khoi-dong", name: "Khởi động — Mạng nhện thông tin", type: "intro",
      goal: "Nhận biết chủ đề WWW; thấy Internet tổ chức thông tin khác sách.",
      time: 180,
      task: "Nhóm đôi (2 phút): kể 2–3 trang web em từng xem và nội dung chính của chúng.",
      sgkImage: "assets/sgk/sgk-trang23.jpg",
      content: {
        heading: "🕸️ Một 'mạng nhện' bao trùm thế giới",
        prompt: "Các trang thông tin trên Internet nối với nhau thành một mạng khổng lồ bao trùm cả thế giới — gọi là World Wide Web (mạng thông tin toàn cầu). Vì sao các trang web lại nối được với nhau?",
        blocks: [
          { kind: "text", value: "👉 Nhờ các LIÊN KẾT (hyperlink), chỉ một cú nhấp chuột là em nhảy từ trang này sang trang khác." },
        ],
        revealLabel: "🔍 Gợi ý",
      },
      questions: [
        {
          question: "World Wide Web (WWW) còn được gọi là gì?",
          type: "multiple-choice",
          options: ["Mạng thông tin toàn cầu", "Một chiếc máy tính lớn", "Một trình duyệt", "Một loại virus"],
          answer: 0, explanation: "WWW = mạng thông tin toàn cầu, liên kết các website trên Internet.",
          level: "nhan-biet", activity: "khoi-dong",
        },
      ],
    },

    /* ===================== HĐ2.1: TỔ CHỨC THÔNG TIN ===================== */
    {
      id: "to-chuc", name: "Tổ chức thông tin trên Internet", type: "knowledge",
      goal: "Hiểu siêu văn bản, trang web, website, trang chủ, WWW.",
      time: 300,
      task: "Đọc mục 1 (SGK tr.23–24). Nhóm: siêu văn bản, trang web, website, trang chủ, WWW là gì? Cho ví dụ.",
      sgkImage: "assets/sgk/sgk-trang23.jpg",
      content: {
        heading: "🧩 Từ siêu văn bản đến World Wide Web",
        revealLabel: "🔍 Hiện khái niệm & sơ đồ",
        blocks: [
          { kind: "svg", value: websiteSVG() },
          { kind: "html", value:
            '<ul style="font-size:16px;line-height:1.7">' +
            '<li><b style="color:#1e40af">Siêu văn bản</b> (Hypertext): văn bản đặc biệt tích hợp nhiều dạng dữ liệu (văn bản, ảnh, âm thanh, video) và chứa các <b>siêu liên kết</b>.</li>' +
            '<li><b style="color:#1e40af">Trang web</b>: một siêu văn bản được gán một <b>địa chỉ</b> truy cập trên Internet.</li>' +
            '<li><b style="color:#1e40af">Website</b>: tập hợp các trang web liên quan, truy cập qua <b>một địa chỉ</b>. Trang mở đầu tiên là <b>Trang chủ</b> (địa chỉ trang chủ = địa chỉ website).</li>' +
            '<li><b style="color:#1e40af">World Wide Web (WWW)</b>: mạng thông tin toàn cầu, liên kết các website trên Internet.</li>' +
            '</ul>' },
          { kind: "text", value: "Ví dụ: thieunien.vn (báo Thiếu niên Tiền phong); vi.wikipedia.org (Bách khoa toàn thư mở tiếng Việt)." },
        ],
      },
      questions: [
        {
          question: "Trang siêu văn bản là gì?",
          type: "multiple-choice",
          options: ["Trang văn bản thường, không chứa liên kết", "Trang đặc biệt tích hợp nhiều dạng dữ liệu và CHỨA các liên kết", "Trang đặc biệt nhưng KHÔNG chứa liên kết", "Một bức ảnh"],
          answer: 1, explanation: "Trang siêu văn bản tích hợp nhiều dạng dữ liệu và chứa các siêu liên kết.",
          level: "thong-hieu", activity: "to-chuc",
        },
      ],
      remember: [
        "Trang web = 1 siêu văn bản có địa chỉ. Website = tập hợp trang web liên quan (1 địa chỉ chung).",
        "WWW = mạng thông tin toàn cầu, liên kết các website.",
      ],
    },
    {
      id: "ghep-khai-niem", name: "Ghép đôi: Khái niệm ↔ Ý nghĩa", type: "matching",
      goal: "Củng cố các khái niệm cốt lõi.",
      time: 180,
      task: "Nối mỗi khái niệm với ý nghĩa đúng của nó.",
      pairs: [
        { left: "Siêu văn bản", right: "Văn bản tích hợp nhiều dạng dữ liệu + liên kết" },
        { left: "Trang web", right: "Một siêu văn bản có địa chỉ truy cập" },
        { left: "Website", right: "Tập hợp trang web liên quan, 1 địa chỉ chung" },
        { left: "Trang chủ", right: "Trang mở ra đầu tiên khi truy cập website" },
        { left: "World Wide Web", right: "Mạng thông tin toàn cầu, liên kết các website" },
      ],
      explanation: "Các khái niệm lồng nhau: siêu liên kết → trang web → website → WWW.",
    },
    {
      id: "the-thuat-ngu", name: "Lật thẻ ghi nhớ thuật ngữ", type: "flashcard",
      goal: "Ôn nhanh các thuật ngữ của bài bằng thẻ hai mặt.",
      time: 180,
      task: "Bấm vào thẻ để lật xem đáp án, rồi bấm 'Thẻ tiếp theo'.",
      cards: [
        { front: "WWW là gì?", back: "Mạng thông tin toàn cầu, liên kết các website trên Internet." },
        { front: "Website là gì?", back: "Tập hợp các trang web liên quan, truy cập qua một địa chỉ chung." },
        { front: "Trang chủ (homepage)?", back: "Trang mở ra đầu tiên khi truy cập website; địa chỉ của nó là địa chỉ website." },
        { front: "Siêu liên kết (hyperlink)?", back: "Liên kết trỏ đến vị trí khác trong trang hoặc sang trang web khác." },
        { front: "Trình duyệt (web browser)?", back: "Phần mềm giúp người dùng truy cập các trang web trên Internet." },
      ],
    },

    /* ===================== HĐ2.2: TRÌNH DUYỆT ===================== */
    {
      id: "trinh-duyet", name: "Trình duyệt web", type: "knowledge",
      goal: "Biết trình duyệt là gì và các bước truy cập trang web.",
      time: 240,
      task: "Đọc mục 2 (SGK tr.24). Nhóm: trình duyệt là gì? Kể tên vài trình duyệt. Muốn truy cập trang web ta làm gì?",
      sgkImage: "assets/sgk/sgk-trang24.jpg",
      content: {
        heading: "🌐 Trình duyệt — cửa sổ vào thế giới web",
        revealLabel: "🔍 Hiện nội dung",
        blocks: [
          { kind: "text", value: "Trình duyệt (web browser) là phần mềm ứng dụng giúp người dùng truy cập các trang web trên Internet. Nháy vào một liên kết để chuyển sang trang khác — gọi là DUYỆT WEB." },
          { kind: "html", value:
            '<div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin-top:4px">' +
            ['🦊 Firefox','🔵 Chrome','🧭 Safari','🐧 Cốc Cốc','🌊 Edge']
              .map(s=>`<span style="background:#eff6ff;border:1px solid #93c5fd;color:#1e40af;padding:6px 14px;border-radius:999px;font-weight:700">${s}</span>`).join("") +
            '</div>' },
          { kind: "ext", value: "Khi di chuyển con trỏ vào một liên kết, con trỏ chuột thường chuyển thành hình 👆 bàn tay." },
        ],
      },
      remember: ["Trình duyệt = phần mềm truy cập trang web. Nháy liên kết để duyệt web."],
    },
    {
      id: "phan-loai-trinh-duyet", name: "Kéo–thả: Đâu là trình duyệt?", type: "dragdrop",
      goal: "Phân biệt trình duyệt với phần mềm/website khác.",
      time: 180,
      task: "Chọn từng mục rồi bấm vào nhóm đúng: 'Là TRÌNH DUYỆT' hay 'KHÔNG phải trình duyệt'.",
      groups: ["Là TRÌNH DUYỆT 🌐", "KHÔNG phải trình duyệt ❌"],
      items: [
        { text: "Google Chrome", group: 0 },
        { text: "Mozilla Firefox", group: 0 },
        { text: "Cốc Cốc", group: 0 },
        { text: "Microsoft Edge", group: 0 },
        { text: "Microsoft Word (soạn thảo)", group: 1 },
        { text: "Wikipedia (một website)", group: 1 },
      ],
      explanation: "Chrome, Firefox, Cốc Cốc, Edge là trình duyệt. Word là phần mềm soạn thảo; Wikipedia là một website (xem bằng trình duyệt).",
    },
    {
      id: "sap-xep-truy-cap", name: "Sắp xếp: Các bước truy cập trang web", type: "ordering",
      goal: "Nắm đúng trình tự truy cập một trang web.",
      time: 150,
      task: "Dùng ▲▼ sắp đúng thứ tự các bước, rồi bấm Kiểm tra.",
      steps: [
        "Nháy đúp chuột vào biểu tượng trình duyệt",
        "Nhập địa chỉ trang web vào ô địa chỉ",
        "Nhấn phím Enter",
        "Trang web hiển thị — nháy các liên kết để xem thêm",
      ],
      explanation: "Mở trình duyệt → nhập địa chỉ → Enter → trang web hiện ra, rồi theo các liên kết.",
    },
    {
      id: "dien-khuyet", name: "Điền khuyết — Nhớ khái niệm", type: "fillblank",
      goal: "Củng cố khái niệm bằng cách điền từ.",
      time: 150,
      task: "Điền từ thích hợp (trang chủ · trình duyệt · website · liên kết) vào chỗ trống, rồi bấm Kiểm tra.",
      text: "Trang mở ra đầu tiên khi truy cập một website gọi là {{}}. Phần mềm giúp truy cập các trang web gọi là {{}}. Tập hợp các trang web liên quan dưới một địa chỉ chung gọi là {{}}. Muốn chuyển sang trang khác, ta nháy vào một {{}}.",
      answers: [["trang chủ"], ["trình duyệt"], ["website"], ["liên kết"]],
      explanation: "trang chủ · trình duyệt · website · liên kết.",
    },

    /* ===================== HĐ3: LUYỆN TẬP ===================== */
    {
      id: "luyen-tap", name: "Luyện tập — Duyệt web thông minh", type: "quiz",
      goal: "Củng cố toàn bài.",
      time: 300,
      task: "Chia đội, chọn đáp án đúng cho mỗi câu.",
      questions: [
        { question: "Thông tin trên Internet được tổ chức như thế nào?", type: "multiple-choice",
          options: ["Tương tự thông tin trong cuốn sách", "Thành từng văn bản rời rạc", "Các siêu văn bản kết nối với nhau bởi các liên kết", "Một cách tuỳ ý"],
          answer: 2, explanation: "Thông tin trên Internet gồm các siêu văn bản (trang web) nối nhau bởi các liên kết.", level: "thong-hieu", activity: "luyen-tap" },
        { question: "Địa chỉ nào là địa chỉ của một WEBSITE (trang chủ)?", type: "multiple-choice",
          options: ["vi.wikipedia.org", "một tệp Word trong máy", "C:\\HocTap", "số điện thoại 1080"],
          answer: 0, explanation: "vi.wikipedia.org là địa chỉ trang chủ (địa chỉ website) của Bách khoa toàn thư mở tiếng Việt.", level: "thong-hieu", activity: "luyen-tap" },
        { question: "Internet và WWW khác nhau thế nào?", type: "multiple-choice",
          options: ["Chúng là một, không khác gì", "Internet là mạng lưới các máy tính kết nối; WWW là tập hợp các trang web trên mạng đó", "WWW to hơn Internet", "Internet là một trang web"],
          answer: 1, explanation: "Internet là hạ tầng mạng nối các máy tính; WWW là dịch vụ gồm các trang web chạy trên Internet.", level: "van-dung", activity: "luyen-tap" },
        { question: "Chọn TẤT CẢ phát biểu ĐÚNG.", type: "multiple-select",
          options: ["Mỗi trang web có một địa chỉ truy cập riêng", "Trình duyệt dùng để truy cập trang web", "Website chỉ có đúng một trang web", "Trang chủ là trang mở ra đầu tiên"],
          answer: [0, 1, 3], explanation: "Đúng: mỗi trang web có địa chỉ riêng, trình duyệt để truy cập, trang chủ mở đầu tiên. Sai: một website có thể gồm NHIỀU trang web.", level: "thong-hieu", activity: "luyen-tap" },
      ],
    },
    {
      id: "ghep-cot", name: "Ghép cột A ↔ B", type: "matching",
      goal: "Ghép để tạo phát biểu đúng (bài tập SGK).",
      time: 150,
      task: "Nối mỗi vế ở cột A với vế đúng ở cột B.",
      sgkImage: "assets/sgk/sgk-trang27.jpg",
      pairs: [
        { left: "Website là tập hợp…", right: "…các trang web liên quan, truy cập qua một địa chỉ" },
        { left: "Khi duyệt web, muốn chuyển sang trang khác, ta nháy vào…", right: "…liên kết trỏ đến đó" },
        { left: "Để truy cập các trang web, ta cần…", right: "…sử dụng trình duyệt web" },
        { left: "WWW là hệ thống các…", right: "…website trên Internet" },
      ],
      explanation: "Ghép đúng: 1–c, 2–d, 3–a, 4–b (theo SGK).",
    },

    /* ===================== HĐ4: VẬN DỤNG ===================== */
    {
      id: "van-dung", name: "Vận dụng", type: "vandung",
      goal: "So sánh tổ chức thông tin & khai thác trang web thực tế.",
      time: 300,
      task: "Nhóm thảo luận 2 nhiệm vụ, ghi ra bảng nhóm rồi bấm xem gợi ý.",
      cases: [
        {
          question: "Cách tổ chức thông tin trong cuốn SÁCH khác cách tổ chức trên INTERNET như thế nào?",
          answer: "Trong sách: thông tin tổ chức TUYẾN TÍNH (theo chủ đề → bài → phần → nội dung); tìm phải theo thứ tự trang. Trên Internet: tổ chức PHI TUYẾN TÍNH bằng siêu văn bản; nhờ các liên kết, người dùng nhảy ngay đến trang liên quan mà không cần theo thứ tự.",
        },
        {
          question: "Dùng trình duyệt truy cập hoahoctro.tienphong.vn và vtv7.vtv.vn: nêu tên, biểu tượng, các mục chính của trang; lưu địa chỉ em thích vào thanh đánh dấu.",
          answer: "Với mỗi trang: đọc tên & biểu tượng (logo) ở góc trên; xem thanh menu/các mục chính (Tin tức, Video, Học tập…); nháy các liên kết để sang trang khác; bấm nút ⭐ (Bookmark) để lưu địa chỉ vào thanh đánh dấu, lần sau nháy tên trên thanh đánh dấu để mở lại.",
        },
      ],
    },

    /* ===================== TỔNG KẾT ===================== */
    {
      id: "tong-ket", name: "Tổng kết", type: "summary",
      goal: "Chốt kiến thức trọng tâm.",
      task: "Nhắc lại 5 điều cốt lõi; làm 2 thử thách cuối.",
      content: {
        learned: null,
        challenge: [
          { question: "Một website có thể gồm bao nhiêu trang web?", type: "multiple-choice",
            options: ["Chỉ đúng 1 trang", "Một hoặc nhiều trang web liên quan", "Đúng 10 trang", "Không có trang nào"],
            answer: 1, explanation: "Website là tập hợp gồm MỘT hoặc NHIỀU trang web liên quan.", level: "thong-hieu", activity: "tong-ket" },
          { question: "Em muốn xem dự báo thời tiết hôm nay. Cách làm hợp lí là:", type: "multiple-choice",
            options: ["Tra trong sách giáo khoa Tin học", "Mở trình duyệt, nhập địa chỉ trang thời tiết (VD nchmf.gov.vn) rồi Enter", "Tắt máy tính đi", "Gọi cho bạn hỏi"],
            answer: 1, explanation: "Dùng trình duyệt truy cập trang web thời tiết là cách nhanh, chính xác và cập nhật nhất.", level: "van-dung-cao", activity: "tong-ket" },
        ],
      },
    },
  ],
};
if (typeof module !== "undefined" && module.exports) module.exports = LESSON;
if (typeof window !== "undefined") window.LESSON = LESSON;
