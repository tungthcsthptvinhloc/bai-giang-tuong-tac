/* ============================================================================
 * BÀI 16 — THUẬT TOÁN SẮP XẾP  (Tin học 7 — Kết nối tri thức)
 * Chủ đề 5: Giải quyết vấn đề với sự trợ giúp của máy tính.
 * Bám sát SGK trang 78–82 + Kế hoạch bài dạy (2 tiết) của giáo viên.
 * Chỉ sửa file này để đổi nội dung. Engine app.js không cần sửa.
 * Máy mô phỏng sắp xếp (sorter): nổi bọt theo SGK (duyệt từ cuối dãy, số nhỏ nổi lên đầu) + chiều duyệt từ đầu dãy (mở rộng, theo giáo án);
 * sắp xếp chọn theo SGK; chế độ practice cho HS tự quyết định “hoán đổi / không hoán đổi”.
 * ==========================================================================*/

// Hộp chọn cho phiếu học tập (thứ tự các lựa chọn đã được xáo)
const P1 = [ // Phiếu 1 — nổi bọt 3 5 4 1 2
  ["3 5 4 2 1", "3 5 4 1 2", "5 3 4 1 2"], ["3 4 5 1 2", "3 5 4 1 2", "3 5 1 4 2"], ["3 1 5 4 2", "3 5 1 4 2", "1 3 5 4 2"], ["1 3 5 2 4", "3 1 5 4 2", "1 3 5 4 2"],
  ["1 3 5 4 2", "1 3 5 2 4", "1 3 2 5 4"], ["1 3 2 5 4", "1 3 5 2 4", "1 2 3 5 4"], ["1 3 2 5 4", "1 2 3 4 5", "1 2 3 5 4"],
  ["1 2 5 3 4", "1 2 3 5 4", "1 2 3 4 5"], ["1 3 2 4 5", "1 2 3 4 5", "1 2 4 3 5"],
  ["2 1 3 4 5", "1 2 3 5 4", "1 2 3 4 5"],
];
const P1_ANS = ["3 5 4 1 2", "3 5 1 4 2", "3 1 5 4 2", "1 3 5 4 2", "1 3 5 2 4", "1 3 2 5 4", "1 2 3 5 4", "1 2 3 4 5", "1 2 3 4 5", "1 2 3 4 5"];
const P2 = [ // Phiếu 2 — sắp xếp chọn 41 15 17 32 18
  ["41 15 17 32 18", "15 17 41 32 18", "15 41 17 32 18"], ["15 17 41 32 18", "15 41 17 32 18", "17 41 15 32 18"], ["15 41 32 17 18", "32 41 17 15 18", "15 41 17 32 18"],
  ["15 41 17 18 32", "15 41 17 32 18", "18 41 17 32 15"], ["15 41 17 32 18", "15 17 41 32 18", "15 32 17 41 18"], ["15 32 41 17 18", "15 17 32 41 18", "15 17 41 32 18"],
  ["15 18 41 32 17", "15 17 41 32 18", "15 17 18 32 41"], ["15 17 41 32 18", "15 17 18 41 32", "15 17 32 41 18"], ["15 17 18 41 32", "15 17 41 18 32", "15 17 32 41 18"],
  ["15 17 18 41 32", "15 17 32 18 41", "15 17 18 32 41"],
];
const P2_ANS = ["15 41 17 32 18", "15 41 17 32 18", "15 41 17 32 18", "15 41 17 32 18", "15 17 41 32 18", "15 17 41 32 18", "15 17 41 32 18", "15 17 32 41 18", "15 17 18 41 32", "15 17 18 32 41"];
const PHIEU_TEXT = (start, end) => `Đầu vào: ${start}\nVòng lặp thứ nhất — lần so sánh 1: {{}}\nVòng lặp thứ nhất — lần so sánh 2: {{}}\nVòng lặp thứ nhất — lần so sánh 3: {{}}\nVòng lặp thứ nhất — lần so sánh 4: {{}}\nVòng lặp thứ hai — lần so sánh 1: {{}}\nVòng lặp thứ hai — lần so sánh 2: {{}}\nVòng lặp thứ hai — lần so sánh 3: {{}}\nVòng lặp thứ ba — lần so sánh 1: {{}}\nVòng lặp thứ ba — lần so sánh 2: {{}}\nVòng lặp thứ tư — lần so sánh 1: {{}}\nĐầu ra: ${end}`;
const BOX = (nums) => `<div style="display:flex;justify-content:center;gap:0;margin:.3rem 0">${nums.map((n) => `<span style="border:2px solid #334155;min-width:52px;padding:6px 10px;text-align:center;font-size:1.3rem;font-weight:800;background:#fff">${n}</span>`).join("")}</div>`;

const LESSON = {
  meta: {
    subject: "Tin học", grade: "7", book: "Kết nối tri thức với cuộc sống",
    title: "Bài 16: Thuật toán sắp xếp", unit: "Chủ đề 5 — Giải quyết vấn đề với sự trợ giúp của máy tính",
    pages: "78–82", durationMinutes: 90,
  },
  objectives: {
    knowledge: [
      "Giải thích được một vài thuật toán sắp xếp cơ bản (sắp xếp nổi bọt, sắp xếp chọn).",
      "Biểu diễn và mô phỏng được hoạt động của thuật toán sắp xếp với bộ dữ liệu đầu vào có kích thước nhỏ.",
      "Nêu được ý nghĩa của việc chia một bài toán thành những bài toán nhỏ hơn.",
    ],
    competencies: [
      "Tự chủ, tự học; giao tiếp và hợp tác (nhóm, trò chơi tiếp sức); giải quyết vấn đề và sáng tạo.",
      "Năng lực số 3.4.TC1a: mô phỏng đúng từng bước so sánh, hoán đổi của thuật toán nổi bọt, sắp xếp chọn trên dãy nhỏ; trình bày trạng thái dãy sau mỗi bước.",
      "Năng lực số 5.3.TC1b: dùng công cụ trực quan, công cụ số để biểu diễn quy trình sắp xếp, theo dõi và đánh giá kết quả sau mỗi vòng lặp.",
    ],
    qualities: ["Chăm chỉ, trung thực, trách nhiệm, nhân ái."],
  },
  coreKnowledge: [
    "Hoán đổi giá trị hai phần tử cần một chỗ trống trung gian: C ← A; A ← B; B ← C (như đổi chất lỏng hai cốc nhờ cốc thứ ba).",
    "Sắp xếp nổi bọt: thực hiện bằng cách hoán đổi nhiều lần các phần tử liền kề nếu giá trị của chúng không đúng thứ tự (SGK: so sánh từ cuối dãy lên, phần tử nhỏ nhất “nổi” lên vị trí đầu).",
    "Sắp xếp chọn: xét từng vị trí từ đầu đến cuối dãy, so sánh trực tiếp phần tử ở vị trí được xét với những phần tử ở phía sau nó và hoán đổi nếu chúng chưa đúng thứ tự.",
    "Dãy n phần tử: thực hiện n − 1 vòng lặp (đến vị trí trước vị trí cuối cùng).",
    "Chia một bài toán thành những bài toán nhỏ hơn giúp thuật toán dễ hiểu và dễ thực hiện hơn.",
  ],
  keywords: ["Hoán đổi", "Nổi bọt", "Sắp xếp chọn", "Vòng lặp", "Chia nhỏ bài toán"],
  settings: { basePoints: 100, useTimer: false, defaultTime: 60, sound: true, streakEnabled: true },

  activities: [
    /* =========================== TIẾT 1 =========================== */
    /* ===================== HĐ1: KHỞI ĐỘNG (5 phút) ===================== */
    {
      id: "khoi-dong", name: "Khởi động — Đổi chỗ hai cốc chất lỏng 🧪", type: "knowledge",
      goal: "Nhận biết thao tác hoán đổi giá trị hai phần tử nhờ một chỗ trung gian.",
      time: 300,
      task: "Quan sát Hình 16.1 trong 2 phút. Đầu vào: cốc A đựng chất lỏng XANH, cốc B đựng chất lỏng ĐỎ. Đầu ra: cốc A đựng màu ĐỎ, cốc B đựng màu XANH. Hãy mô tả bằng lời các bước hoán đổi.",
      sgkImage: "assets/sgk/hinh-16-1.jpg",
      content: {
        heading: "🧪 Đổi chỗ hai cốc chất lỏng",
        prompt: "Có hai chất lỏng khác màu là xanh và đỏ, lần lượt được chứa trong hai chiếc cốc A và B. Chúng ta cần đổi chỗ hai chất lỏng này, sao cho cốc A đựng chất lỏng màu đỏ, còn cốc B đựng chất lỏng màu xanh. Để thực hiện, chúng ta sử dụng thêm một chiếc cốc thứ ba (cốc C) không đựng gì.",
        image: "assets/sgk/hinh-16-1.jpg", imageCaption: "Hình 16.1. Hoán đổi",
      },
      questions: [
        { question: "Vì sao cần dùng thêm cốc C không đựng gì?", type: "multiple-choice",
          options: ["Để có thêm chất lỏng", "Nếu đổ trực tiếp cốc này sang cốc kia thì hai chất lỏng sẽ bị trộn lẫn", "Để cốc A to hơn", "Không cần cốc C"],
          answer: 1, explanation: "Cốc C là chỗ chứa tạm: đổ A sang C, rồi B sang A, cuối cùng C sang B — hai chất lỏng không bị trộn lẫn.", level: "thong-hieu", activity: "khoi-dong" },
        { question: "Khái quát thành các bước hoán đổi giá trị hai biến A, B (dùng biến trung gian C):", type: "multiple-choice",
          options: ["A ← B; B ← A", "C ← A; A ← B; B ← C", "C ← B; B ← C; A ← C", "A ← C; B ← A; C ← B"],
          answer: 1, explanation: "C ← A (cất giá trị A vào C); A ← B; B ← C.", level: "van-dung", activity: "khoi-dong" },
      ],
    },
    {
      id: "hoan-doi", name: "Sắp xếp các bước hoán đổi 🔢", type: "ordering",
      goal: "Nắm đúng trình tự hoán đổi hai chất lỏng (Hình 16.1b, c, d).",
      time: 120,
      task: "Sắp xếp các bước đổi chỗ chất lỏng ở hai cốc A, B theo đúng thứ tự rồi bấm Nộp bài.",
      sgkImage: "assets/sgk/hinh-16-1.jpg",
      steps: [
        "Đổ chất lỏng xanh ở cốc A sang cốc C",
        "Đổ chất lỏng đỏ ở cốc B sang cốc A",
        "Đổ chất lỏng xanh ở cốc C sang cốc B",
      ],
      explanation: "Hình 16.1b: A → C · Hình 16.1c: B → A · Hình 16.1d: C → B. Tương ứng: C ← A; A ← B; B ← C.",
    },

    /* ===================== HĐ2.1: SẮP XẾP NỔI BỌT (40 phút) ===================== */
    {
      id: "noi-bot", name: "Thuật toán sắp xếp nổi bọt 🔵", type: "knowledge",
      goal: "Hiểu cách hoạt động của thuật toán sắp xếp nổi bọt qua mô phỏng trực quan.",
      time: 600,
      task: "Nhiệm vụ 1 — nhóm 10 phút: quan sát hình viên bọt (viên nào ở đáy, nặng hay nhẹ hơn viên phía trên, khi nào đổi chỗ?); quan sát Hình 16.2 – 16.4 và máy mô phỏng sắp xếp dãy 4, 2, 3, 1; trả lời câu hỏi.",
      sgkImage: "assets/sgk/hinh-16-2-4.jpg",
      sorter: { title: "Mô phỏng sắp xếp nổi bọt (Hình 16.2 – 16.4)", algo: "bubble", items: [4, 2, 3, 1], allowDir: true, editItems: true,
        intro: "Chiều “Từ cuối dãy” đúng như SGK. Chiều “Từ đầu dãy” (mở rộng): số lớn dần “chìm” về cuối dãy." },
      content: {
        heading: "🔵 Thuật toán sắp xếp nổi bọt",
        image: "assets/sgk/bot-nang-nhe.png", imageCaption: "Viên bọt nhẹ hơn (số nhỏ hơn) nổi lên trên",
        revealLabel: "🔍 Sắp xếp nổi bọt (SGK tr.78–80)",
        blocks: [
          { kind: "text", value: "Máy tính thường xuyên phải thực hiện thuật toán sắp xếp khi người sử dụng yêu cầu, ví dụ: sắp xếp điểm trung bình của học sinh trong lớp bằng phần mềm bảng tính; sắp xếp tên tệp trong thư mục;… Có nhiều thuật toán sắp xếp khác nhau. Một trong số đó là thuật toán sắp xếp nổi bọt." },
          { kind: "text", value: "Giả sử cần sắp xếp dãy 4, 2, 3, 1 theo thứ tự tăng dần. Thuật toán sắp xếp nổi bọt xét từng vị trí từ đầu đến cuối dãy. Tại mỗi vị trí được xét, thuật toán tìm phần tử nhỏ nhất trong những phần tử phía sau để đưa vào vị trí đó, bằng một vòng lặp so sánh từng cặp phần tử cạnh nhau và hoán đổi chúng nếu số ở phía sau nhỏ hơn. Việc hoán đổi được thực hiện giống như việc hoán đổi ở Hoạt động khởi động." },
          { kind: "image", value: "assets/sgk/hinh-16-2-4.jpg", caption: "Hình 16.2 – 16.4. Ba vòng lặp của thuật toán nổi bọt" },
          { kind: "text", value: "Sau vòng lặp thứ ba, không có bất kì sự hoán đổi nào được thực hiện nữa nên thuật toán dừng lại. Danh sách được sắp xếp theo đúng thứ tự yêu cầu." },
          { kind: "ext", value: "Theo giáo án: sắp xếp nổi bọt cũng có thể thực hiện bằng cách duyệt từ đầu dãy — so sánh từng cặp kề nhau từ trái sang phải, số lớn dần “chìm” về cuối dãy (sắp xếp chìm dần – sinking sort). SGK mô tả cách duyệt từ cuối dãy, số nhỏ “nổi” lên đầu (nổi bọt – bubble sort)." },
        ],
      },
      questions: [
        { question: "Trong hình viên bọt, viên bọt ở đáy cốc (số 1) nhẹ hơn viên ngay trên nó (số 3). Điều gì xảy ra?", type: "multiple-choice",
          options: ["Không có gì thay đổi", "Hai viên đổi chỗ: viên nhẹ hơn (1) nổi lên trên", "Viên số 3 chìm xuống đáy và vỡ", "Cả hai cùng nổi lên mặt nước"],
          answer: 1, explanation: "Viên nhẹ hơn nằm dưới viên nặng hơn thì hai viên đổi chỗ — viên nhẹ nổi lên. Giống như phần tử đứng sau nhỏ hơn phần tử đứng trước thì hoán đổi.", level: "thong-hieu", activity: "noi-bot" },
        { question: "Kết thúc vòng lặp thứ nhất (Hình 16.2), số nào “nổi” lên vị trí đầu tiên?", type: "multiple-choice",
          options: ["4", "2", "3", "1"],
          answer: 3, explanation: "Vòng lặp thứ nhất đưa phần tử nhỏ nhất (1) lên vị trí đầu: 4 2 3 1 → 1 4 2 3.", level: "nhan-biet", activity: "noi-bot" },
        { question: "Vòng lặp thứ hai, dãy 1 4 2 3: so sánh 2 và 3 (3 đứng sau). Kết quả là:", type: "multiple-choice",
          options: ["3 > 2 ⇒ KHÔNG hoán đổi", "3 > 2 ⇒ hoán đổi", "2 < 3 ⇒ hoán đổi", "Dừng thuật toán"],
          answer: 0, explanation: "Phần tử đứng sau (3) không nhỏ hơn phần tử đứng trước (2) nên KHÔNG hoán đổi (Hình 16.3).", level: "thong-hieu", activity: "noi-bot" },
        { question: "Thuật toán sắp xếp nổi bọt sắp xếp danh sách bằng cách: (câu hỏi SGK tr.80)", type: "multiple-choice",
          options: ["Chọn phần tử có giá trị bé nhất đặt vào đầu danh sách.", "Chọn phần tử có giá trị lớn nhất đặt vào đầu danh sách.", "Hoán đổi nhiều lần các phần tử liền kề nếu giá trị của chúng không đúng thứ tự.", "Chèn phần tử vào vị trí thích hợp để đảm bảo danh sách sắp xếp theo đúng thứ tự."],
          answer: 2, explanation: "Nổi bọt là thuật toán sắp xếp được thực hiện bằng cách hoán đổi nhiều lần các phần tử liền kề nếu giá trị của chúng không đúng thứ tự.", level: "nhan-biet", activity: "noi-bot" },
        { question: "Dãy có 4 phần tử cần thực hiện bao nhiêu vòng lặp theo SGK?", type: "multiple-choice",
          options: ["4", "2", "3", "1"],
          answer: 2, explanation: "Xét lần lượt vị trí thứ nhất, thứ hai, thứ ba (đến vị trí trước vị trí cuối cùng) → 3 vòng lặp.", level: "van-dung", activity: "noi-bot" },
      ],
      remember: ["Nổi bọt là thuật toán sắp xếp được thực hiện bằng cách hoán đổi nhiều lần các phần tử liền kề nếu giá trị của chúng không đúng thứ tự."],
    },
    {
      id: "phieu-1", name: "Hoạt động 1 — Phiếu học tập 1: Nổi bọt 3, 5, 4, 1, 2 📝", type: "fillblank",
      goal: "Mô phỏng thuật toán sắp xếp nổi bọt (SGK) bằng cách điền dãy sau mỗi lần so sánh.",
      time: 480,
      task: "Nhóm hoàn thành Phiếu học tập 1: chọn dãy số sau MỖI lần so sánh khi sắp xếp 3, 5, 4, 1, 2 tăng dần bằng thuật toán nổi bọt (so sánh từ cuối dãy lên, như Hình 16.2 – 16.4). 10 dãy — mỗi dãy 1 điểm. Làm hết rồi bấm Nộp bài.",
      sgkImage: "assets/sgk/sgk-trang80.jpg",
      html: BOX([3, 5, 4, 1, 2]),
      text: PHIEU_TEXT("3 5 4 1 2", "1 2 3 4 5"),
      answers: P1_ANS.map((x) => [x]),
      choices: P1,
      explanation: "Vòng 1: 3 5 4 1 2 (2 và 1 không đổi) → 3 5 1 4 2 → 3 1 5 4 2 → 1 3 5 4 2. Vòng 2: 1 3 5 2 4 → 1 3 2 5 4 → 1 2 3 5 4. Vòng 3: 1 2 3 4 5 → 1 2 3 4 5. Vòng 4: 1 2 3 4 5.",
    },
    {
      id: "tu-lam-noi-bot", name: "Em tự sắp xếp nổi bọt 🙋", type: "knowledge",
      goal: "Tự thực hiện sắp xếp nổi bọt trên dữ liệu nhỏ một cách chính xác.",
      time: 300,
      task: "Tự thực hiện thuật toán nổi bọt với dãy 12, 5, 8, 3, 9 (ví dụ trong giáo án): với mỗi cặp được tô đỏ, bấm “Hoán đổi” hoặc “Không hoán đổi”. Máy báo ngay nếu em chọn sai. Có thể đổi chiều duyệt hoặc gõ dãy khác.",
      sgkImage: "assets/sgk/mo-ta-noi-bot.jpg",
      sorter: { title: "Em tự làm: sắp xếp nổi bọt", algo: "bubble", items: [12, 5, 8, 3, 9], practice: true, allowDir: true, editItems: true },
      questions: [
        { question: "Sắp xếp nổi bọt (so sánh từ cuối dãy lên) dãy 12, 5, 8, 3, 9: sau vòng lặp thứ nhất, dãy là:", type: "multiple-choice",
          options: ["3 12 5 8 9", "5 8 3 9 12", "3 5 8 9 12", "12 5 3 8 9"],
          answer: 0, explanation: "So sánh 3 và 9 (không đổi) → 8 và 3 (đổi: 12 5 3 8 9) → 5 và 3 (đổi: 12 3 5 8 9) → 12 và 3 (đổi: 3 12 5 8 9).", level: "van-dung", activity: "tu-lam-noi-bot" },
      ],
    },
    {
      id: "mo-ta-noi-bot", name: "Nhiệm vụ 2 — Mô tả thuật toán nổi bọt 🔢", type: "ordering",
      goal: "Viết lại quy trình sắp xếp nổi bọt để người khác thực hiện được với dữ liệu khác.",
      time: 180,
      task: "Nhóm viết lại quy trình, rồi sắp xếp các bước mô tả thuật toán nổi bọt bằng ngôn ngữ tự nhiên (SGK tr.80) và bấm Nộp bài.",
      sgkImage: "assets/sgk/mo-ta-noi-bot.jpg",
      steps: [
        "Với vị trí đầu tiên: so sánh hai phần tử đứng cạnh nhau theo thứ tự từ cuối dãy lên vị trí đầu tiên",
        "Nếu phần tử đứng sau nhỏ hơn phần tử đứng trước thì đổi chỗ chúng cho nhau",
        "Cuối vòng lặp: phần tử nhỏ nhất nổi lên vị trí đầu tiên",
        "Thực hiện vòng lặp tương tự với vị trí thứ hai, thứ ba,… đến vị trí trước vị trí cuối cùng",
        "Kết thúc: dãy số đã được sắp xếp theo thứ tự từ nhỏ đến lớn",
      ],
      explanation: "Mô tả phải xác định, hữu hạn, đúng đắn và tổng quát (dùng được cho mọi dãy): so sánh từ cuối lên → hoán đổi nếu sai thứ tự → phần tử nhỏ nhất nổi lên → lặp với các vị trí tiếp theo → kết thúc.",
    },

    /* =========================== TIẾT 2 =========================== */
    /* ===================== HĐ2.2: SẮP XẾP CHỌN (30 phút) ===================== */
    {
      id: "sap-xep-chon", name: "Thuật toán sắp xếp chọn 👆", type: "knowledge",
      goal: "Hiểu cách hoạt động của thuật toán sắp xếp chọn.",
      time: 540,
      task: "Nhiệm vụ 1 — nhóm 10 phút: quan sát Hình 16.5 và máy mô phỏng sắp xếp dãy 3, 4, 1, 5, 2; viết cụ thể các bước của vòng lặp thứ 2, 3, 4 (câu hỏi SGK tr.82); trả lời câu hỏi.",
      sgkImage: "assets/sgk/hinh-16-5.jpg",
      sorter: { title: "Mô phỏng sắp xếp chọn (Hình 16.5)", algo: "selection", items: [3, 4, 1, 5, 2], editItems: true },
      content: {
        heading: "👆 Thuật toán sắp xếp chọn",
        revealLabel: "🔍 Sắp xếp chọn (SGK tr.80–81)",
        blocks: [
          { kind: "text", value: "Thuật toán sắp xếp chọn xét từng vị trí và đưa phần tử nhỏ nhất trong những phần tử phía sau vào vị trí đó. Việc tìm phần tử nhỏ nhất được thực hiện bằng cách so sánh trực tiếp phần tử ở vị trí được xét với những phần tử ở phía sau nó và hoán đổi nếu phần tử phía sau nhỏ hơn." },
          { kind: "image", value: "assets/sgk/hinh-16-5.jpg", caption: "Hình 16.5. Mô phỏng thuật toán sắp xếp chọn" },
          { kind: "image", value: "assets/sgk/mo-ta-chon.jpg", caption: "Mô tả thuật toán sắp xếp chọn bằng ngôn ngữ tự nhiên (SGK tr.81)" },
        ],
      },
      questions: [
        { question: "Vòng lặp thứ nhất của Hình 16.5 (dãy 3 4 1 5 2): phần tử 3 ở vị trí đầu lần lượt được so sánh với các phần tử nào?", type: "multiple-choice",
          options: ["Chỉ với 4", "Với 4, 1, 5, 2 (tất cả các phần tử phía sau)", "Với 5 và 2", "Chỉ các phần tử liền kề"],
          answer: 1, explanation: "So sánh từng phần tử (kể từ vị trí thứ hai đến vị trí cuối cùng) với phần tử tại vị trí đầu tiên.", level: "nhan-biet", activity: "sap-xep-chon" },
        { question: "Kết quả vòng lặp thứ hai (Hình 16.5) là:", type: "multiple-choice",
          options: ["1 4 3 5 2", "1 2 3 5 4", "1 2 4 5 3", "1 2 3 4 5"],
          answer: 2, explanation: "Vị trí thứ hai (4): so với 3 → đổi (1 3 4 5 2); so với 5 → không; so với 2 → đổi (1 2 4 5 3).", level: "van-dung", activity: "sap-xep-chon" },
        { question: "Kết quả vòng lặp thứ ba (Hình 16.5) là:", type: "multiple-choice",
          options: ["1 2 3 5 4", "1 2 4 5 3", "1 2 3 4 5", "1 2 5 4 3"],
          answer: 0, explanation: "Vị trí thứ ba (4): so với 5 → không; so với 3 → đổi → 1 2 3 5 4. Vòng lặp thứ tư: 5 so với 4 → đổi → 1 2 3 4 5.", level: "van-dung", activity: "sap-xep-chon" },
        { question: "Điểm khác nhau giữa sắp xếp chọn và sắp xếp nổi bọt (theo SGK) là:", type: "multiple-choice",
          options: ["Sắp xếp chọn không cần hoán đổi", "Sắp xếp chọn chỉ dùng cho chữ", "Nổi bọt so sánh phần tử ở vị trí đang xét với mọi phần tử phía sau", "Sắp xếp chọn so sánh trực tiếp phần tử ở vị trí đang xét với các phần tử phía sau; nổi bọt so sánh các cặp phần tử liền kề"],
          answer: 3, explanation: "Cả hai đều hoán đổi, nhưng nổi bọt so sánh các cặp liền kề, còn sắp xếp chọn so sánh trực tiếp với phần tử ở vị trí đang xét.", level: "van-dung-cao", activity: "sap-xep-chon" },
      ],
      remember: ["Thuật toán sắp xếp chọn xét từng vị trí từ đầu đến cuối dãy, so sánh trực tiếp phần tử ở vị trí được xét với những phần tử ở phía sau nó và hoán đổi nếu chúng chưa đúng thứ tự."],
    },
    {
      id: "phieu-2", name: "Hoạt động 2 — Phiếu học tập 2: Sắp xếp chọn 41, 15, 17, 32, 18 📝", type: "fillblank",
      goal: "Mô phỏng thuật toán sắp xếp chọn bằng cách điền dãy sau mỗi lần so sánh.",
      time: 480,
      task: "Hoạt động 2 (SGK tr.82): 5 bạn cầm các số 41, 15, 17, 32, 18; bạn thứ sáu thực hiện sắp xếp chọn. Nhóm hoàn thành Phiếu học tập 2: chọn dãy số sau MỖI lần so sánh (10 dãy — mỗi dãy 1 điểm), rồi bấm Nộp bài.",
      sgkImage: "assets/sgk/sgk-trang82.jpg",
      html: BOX([41, 15, 17, 32, 18]),
      text: PHIEU_TEXT("41 15 17 32 18", "15 17 18 32 41"),
      answers: P2_ANS.map((x) => [x]),
      choices: P2,
      explanation: "Vòng 1: 15 < 41 → đổi (15 41 17 32 18), sau đó không đổi thêm. Vòng 2: 17 < 41 → đổi (15 17 41 32 18). Vòng 3: 32 < 41 → đổi (15 17 32 41 18), 18 < 32 → đổi (15 17 18 41 32). Vòng 4: 32 < 41 → đổi (15 17 18 32 41).",
    },
    {
      id: "tu-lam-chon", name: "Em tự sắp xếp chọn 🙋", type: "knowledge",
      goal: "Tự thực hiện mô phỏng thuật toán sắp xếp chọn trên dãy số mẫu.",
      time: 300,
      task: "Tự thực hiện sắp xếp chọn với dãy 9, 4, 7, 1, 6 (ví dụ trong giáo án): với mỗi cặp được tô đỏ (phần tử ở vị trí đang xét và một phần tử phía sau), bấm “Hoán đổi” hoặc “Không hoán đổi”.",
      sgkImage: "assets/sgk/mo-ta-chon.jpg",
      sorter: { title: "Em tự làm: sắp xếp chọn", algo: "selection", items: [9, 4, 7, 1, 6], practice: true, editItems: true },
      questions: [
        { question: "Sắp xếp chọn dãy 9, 4, 7, 1, 6: sau vòng lặp thứ nhất, dãy là:", type: "multiple-choice",
          options: ["4 9 7 1 6", "1 4 6 7 9", "1 9 7 4 6", "1 4 7 9 6"],
          answer: 2, explanation: "4 < 9 → đổi (4 9 7 1 6); 7 không nhỏ hơn 4; 1 < 4 → đổi (1 9 7 4 6); 6 không nhỏ hơn 1.", level: "van-dung", activity: "tu-lam-chon" },
      ],
    },
    {
      id: "mo-ta-chon", name: "Nhiệm vụ 2 — Mô tả thuật toán sắp xếp chọn 🔢", type: "ordering",
      goal: "Mô tả thuật toán sắp xếp chọn bằng ngôn ngữ tự nhiên.",
      time: 180,
      task: "Sắp xếp các bước mô tả thuật toán sắp xếp chọn bằng ngôn ngữ tự nhiên (SGK tr.81) rồi bấm Nộp bài.",
      sgkImage: "assets/sgk/mo-ta-chon.jpg",
      steps: [
        "Với vị trí đầu tiên: so sánh từng phần tử (từ vị trí thứ hai đến vị trí cuối cùng) với phần tử tại vị trí đầu tiên",
        "Nếu phần tử được xét nhỏ hơn phần tử tại vị trí đầu tiên thì hoán đổi hai phần tử",
        "Cuối vòng lặp: phần tử nhỏ nhất được đưa về vị trí đầu tiên",
        "Thực hiện vòng lặp tương tự với vị trí thứ hai, thứ ba,… đến vị trí trước vị trí cuối cùng",
        "Kết thúc: dãy số đã được sắp xếp theo thứ tự từ nhỏ đến lớn",
      ],
      explanation: "So sánh với vị trí đang xét → hoán đổi nếu nhỏ hơn → phần tử nhỏ nhất về đúng vị trí → lặp với vị trí tiếp theo → kết thúc.",
    },

    /* ===================== HĐ2.3: CHIA BÀI TOÁN (5 phút) ===================== */
    {
      id: "chia-nho", name: "Chia bài toán thành những bài toán nhỏ hơn 🧩", type: "knowledge",
      goal: "Hiểu ý nghĩa của việc chia bài toán thành những bài toán nhỏ hơn.",
      time: 300,
      task: "Đọc SGK tr.82 và ví dụ sắp xếp lại tủ sách; tìm một ví dụ khác (không nhất thiết là bài toán trong máy tính) về một việc phức tạp được chia thành những việc nhỏ hơn và chia sẻ trước lớp.",
      sgkImage: "assets/sgk/sgk-trang82.jpg",
      content: {
        heading: "🧩 Chia bài toán thành những bài toán nhỏ hơn",
        revealLabel: "📖 Chia bài toán thành những bài toán nhỏ hơn (SGK tr.82)",
        blocks: [
          { kind: "text", value: "Trong quá trình thực hiện cả hai thuật toán sắp xếp nổi bọt và sắp xếp chọn, ta đều thấy xuất hiện nhiều lần thuật toán đơn giản hơn: hoán đổi giá trị hai phần tử. Như vậy, bài toán sắp xếp đã được giải quyết dựa trên lời giải của bài toán nhỏ hơn là bài toán hoán đổi giá trị." },
          { kind: "text", value: "Thuật toán tìm kiếm nhị phân ở bài học trước cũng chia bài toán thành những bài toán nhỏ hơn: ở mỗi lần lặp, thuật toán thu hẹp vùng tìm kiếm chỉ còn một nửa. Việc chia một bài toán thành những bài toán nhỏ hơn giúp việc giải bài toán đó dễ dàng hơn, đồng thời việc mô tả thuật toán dễ hiểu và dễ thực hiện hơn." },
          { kind: "list", value: ["Ví dụ: nấu một bữa ăn → rửa rau, sơ chế, nấu món 1, nấu món 2,…", "Chuẩn bị bài thuyết trình → tìm tài liệu, viết dàn ý, làm trang chiếu, luyện nói,…", "Dọn phòng → dọn bàn học, gấp quần áo, quét nhà,…"] },
        ],
      },
      questions: [
        { question: "Tại sao chúng ta chia bài toán thành những bài toán nhỏ hơn? (câu hỏi SGK tr.82)", type: "multiple-choice",
          options: ["Để thay đổi đầu vào của bài toán.", "Để thay đổi yêu cầu đầu ra của bài toán.", "Để bài toán dễ giải quyết hơn.", "Để bài toán khó giải quyết hơn."],
          answer: 2, explanation: "Chia một bài toán thành những bài toán nhỏ hơn giúp thuật toán dễ hiểu và dễ thực hiện hơn.", level: "nhan-biet", activity: "chia-nho" },
        { question: "Trong thuật toán sắp xếp nổi bọt và sắp xếp chọn, bài toán nhỏ hơn được dùng lặp lại nhiều lần là:", type: "multiple-choice",
          options: ["Hoán đổi giá trị hai phần tử", "Tìm kiếm tuần tự", "Tính tổng dãy số", "In dãy số ra màn hình"],
          answer: 0, explanation: "Cả hai thuật toán đều giải quyết dựa trên bài toán nhỏ hơn: hoán đổi giá trị hai phần tử.", level: "thong-hieu", activity: "chia-nho" },
      ],
      remember: ["Chia một bài toán thành những bài toán nhỏ hơn giúp thuật toán dễ hiểu và dễ thực hiện hơn."],
    },
    {
      id: "tu-sach", name: "Ví dụ: Sắp xếp lại tủ sách 📚", type: "ordering",
      goal: "Chia một nhiệm vụ phức tạp thành các việc nhỏ hơn theo thứ tự hợp lí.",
      time: 150,
      task: "Sắp xếp các việc nhỏ để hoàn thành nhiệm vụ “sắp xếp lại một tủ sách” theo thứ tự hợp lí rồi bấm Nộp bài.",
      steps: [
        "Lấy tất cả các quyển sách ra khỏi tủ sách",
        "Sắp xếp các quyển sách thành từng chồng theo chủ đề",
        "Chọn một chủ đề, sắp xếp các quyển sách theo thứ tự tên sách",
        "Đặt các quyển sách của chủ đề đã được sắp xếp vào tủ sách",
        "Lặp lại hai bước ngay phía trên với các chủ đề chưa được chọn",
      ],
      explanation: "Chia nhiệm vụ thành những việc nhỏ hơn giúp em dễ hình dung phải làm những gì và làm theo thứ tự nào.",
    },

    /* ===================== HĐ3: LUYỆN TẬP (7 phút) ===================== */
    {
      id: "luyen-tap", name: "Luyện tập — Trò chơi “Cùng nhau sắp xếp” 🏃", type: "knowledge",
      goal: "Vận dụng hai thuật toán để sắp xếp dãy 3, 2, 4, 1, 5 (Luyện tập 1, 2 SGK tr.82).",
      time: 420,
      task: "Chia lớp 2 đội (mỗi đội 4 bạn tiếp sức, 2 phút): một đội dùng sắp xếp nổi bọt, một đội dùng sắp xếp chọn, lần lượt ghi các bước lên bảng với dãy 3, 2, 4, 1, 5. Sau đó kiểm tra trên máy: chọn thuật toán và tự làm từng bước.",
      sgkImage: "assets/sgk/sgk-trang82.jpg",
      sorter: { title: "Kiểm tra: dãy 3, 2, 4, 1, 5", algo: "bubble", items: [3, 2, 4, 1, 5], practice: true, allowAlgo: true },
      questions: [
        { question: "Luyện tập 1 — nổi bọt dãy 3, 2, 4, 1, 5: các lần hoán đổi lần lượt cho các dãy nào?", type: "multiple-choice",
          options: ["3 2 1 4 5 → 3 1 2 4 5 → 1 3 2 4 5 → 1 2 3 4 5", "2 3 4 1 5 → 1 3 4 2 5 → 1 2 4 3 5 → 1 2 3 4 5", "2 3 1 4 5 → 2 1 3 4 5 → 1 2 3 4 5", "3 2 4 1 5 → 1 2 3 4 5"],
          answer: 0, explanation: "Vòng 1: 4 và 1 đổi (3 2 1 4 5), 2 và 1 đổi (3 1 2 4 5), 3 và 1 đổi (1 3 2 4 5). Vòng 2: 3 và 2 đổi (1 2 3 4 5). Các vòng sau không đổi.", level: "van-dung", activity: "luyen-tap" },
        { question: "Luyện tập 2 — sắp xếp chọn dãy 3, 2, 4, 1, 5: các lần hoán đổi lần lượt cho các dãy nào?", type: "multiple-choice",
          options: ["3 2 1 4 5 → 3 1 2 4 5 → 1 3 2 4 5 → 1 2 3 4 5", "1 2 4 3 5 → 1 2 3 4 5", "2 3 4 1 5 → 1 3 4 2 5 → 1 2 4 3 5 → 1 2 3 4 5", "2 3 4 1 5 → 1 2 3 4 5"],
          answer: 2, explanation: "Vòng 1: 2 < 3 đổi (2 3 4 1 5), 1 < 2 đổi (1 3 4 2 5). Vòng 2: 2 < 3 đổi (1 2 4 3 5). Vòng 3: 3 < 4 đổi (1 2 3 4 5).", level: "van-dung", activity: "luyen-tap" },
        { question: "Với dãy 5 phần tử, cả hai thuật toán đều thực hiện bao nhiêu vòng lặp?", type: "multiple-choice",
          options: ["5", "3", "10", "4"],
          answer: 3, explanation: "Xét các vị trí thứ nhất đến thứ tư (vị trí trước vị trí cuối cùng) → 4 vòng lặp; tổng cộng 4 + 3 + 2 + 1 = 10 lần so sánh.", level: "van-dung-cao", activity: "luyen-tap" },
      ],
    },
    {
      id: "tro-choi", name: "Trò chơi: Bong bóng lên mặt nước 🔵", type: "penguin",
      pet: "🔵", homeIcon: "🌊", enemy: "🐡", saveWord: "bong bóng nổi lên mặt nước",
      winText: "Tất cả bong bóng đã nổi lên — em sắp xếp thật giỏi!",
      goal: "Củng cố toàn bài.",
      time: 240,
      task: "Trả lời đúng mỗi câu để một bong bóng 🔵 nổi lên mặt nước trước khi cá nóc 🐡 chọc vỡ!",
      intro: "Mỗi câu đúng: một bong bóng 🔵 nổi lên 🌊. Sai thì cá nóc 🐡 bơi tới!",
      questions: [
        { question: "Hoán đổi giá trị hai biến A, B cần dùng thêm:", type: "multiple-choice",
          options: ["Một biến trung gian C", "Hai biến trung gian", "Không cần gì thêm", "Một máy tính khác"],
          answer: 0, explanation: "C ← A; A ← B; B ← C.", level: "nhan-biet", activity: "tro-choi" },
        { question: "Sắp xếp nổi bọt (SGK) so sánh:", type: "multiple-choice",
          options: ["Phần tử đầu với phần tử cuối", "Hai phần tử đứng cạnh nhau", "Phần tử đang xét với mọi phần tử phía sau", "Các phần tử ở vị trí chẵn"],
          answer: 1, explanation: "Nổi bọt so sánh từng cặp phần tử cạnh nhau (từ cuối dãy lên) và hoán đổi nếu sai thứ tự.", level: "nhan-biet", activity: "tro-choi" },
        { question: "Sắp xếp tăng dần: phần tử đứng sau nhỏ hơn phần tử đứng trước thì:", type: "multiple-choice",
          options: ["Giữ nguyên", "Xoá phần tử đứng sau", "Đổi chỗ chúng cho nhau", "Dừng thuật toán"],
          answer: 2, explanation: "Nếu phần tử đứng sau nhỏ hơn phần tử đứng trước thì đổi chỗ chúng cho nhau.", level: "thong-hieu", activity: "tro-choi" },
        { question: "Sắp xếp chọn: cuối vòng lặp thứ nhất, phần tử nào ở vị trí đầu tiên?", type: "multiple-choice",
          options: ["Phần tử lớn nhất", "Phần tử ban đầu ở vị trí thứ hai", "Phần tử cuối dãy", "Phần tử nhỏ nhất"],
          answer: 3, explanation: "Cuối vòng lặp thứ nhất, phần tử nhỏ nhất được đưa về vị trí đầu tiên.", level: "thong-hieu", activity: "tro-choi" },
        { question: "Sắp xếp chọn dãy 6, 2, 8, 1: sau vòng lặp thứ nhất, dãy là:", type: "multiple-choice",
          options: ["2 6 8 1", "1 6 8 2", "1 2 6 8", "1 2 8 6"],
          answer: 1, explanation: "2 < 6 đổi (2 6 8 1); 8 không nhỏ hơn 2; 1 < 2 đổi (1 6 8 2).", level: "van-dung", activity: "tro-choi" },
        { question: "Nổi bọt (so sánh từ cuối dãy lên) dãy 6, 2, 8, 1: sau vòng lặp thứ nhất, dãy là:", type: "multiple-choice",
          options: ["1 6 2 8", "2 6 1 8", "1 2 6 8", "6 2 1 8"],
          answer: 0, explanation: "8 và 1 đổi (6 2 1 8); 2 và 1 đổi (6 1 2 8); 6 và 1 đổi (1 6 2 8).", level: "van-dung", activity: "tro-choi" },
        { question: "Dãy 6 phần tử cần bao nhiêu vòng lặp theo SGK?", type: "multiple-choice",
          options: ["6", "3", "5", "12"],
          answer: 2, explanation: "Đến vị trí trước vị trí cuối cùng → 6 − 1 = 5 vòng lặp.", level: "van-dung", activity: "tro-choi" },
        { question: "Muốn sắp xếp điểm theo thứ tự GIẢM dần, khi so sánh em hoán đổi khi nào?", type: "multiple-choice",
          options: ["Khi phần tử đứng sau nhỏ hơn", "Khi hai phần tử bằng nhau", "Không bao giờ hoán đổi", "Khi phần tử đứng sau lớn hơn"],
          answer: 3, explanation: "Giảm dần: phần tử lớn phải đứng trước, nên hoán đổi khi phần tử đứng sau lớn hơn.", level: "van-dung-cao", activity: "tro-choi" },
      ],
    },

    /* ===================== HĐ4: VẬN DỤNG (3 phút) ===================== */
    {
      id: "van-dung", name: "Vận dụng — Sắp xếp điểm Tin học của tổ em 💡", type: "vandung",
      goal: "Sắp xếp điểm thực tế theo thứ tự giảm dần bằng nổi bọt hoặc sắp xếp chọn.",
      time: 180,
      task: "Vận dụng (SGK tr.82): ghi lại điểm môn Tin học của các bạn trong tổ (bước 1 tại lớp); ở nhà dùng sắp xếp chọn hoặc nổi bọt để sắp xếp điểm theo thứ tự giảm dần và cho biết danh sách tên các bạn theo kết quả sắp xếp. Nộp kết quả vào giờ sau.",
      intro: "Gửi câu trả lời cho thầy/cô. Dùng máy mô phỏng bên dưới để kiểm tra các bước.",
      sgkImage: "assets/sgk/sgk-trang82.jpg",
      sorter: { title: "Kiểm tra sắp xếp điểm của tổ em", algo: "selection", items: [8, 10, 7, 9, 6], editItems: true, allowAlgo: true, allowOrder: true,
        intro: "Gõ điểm của các bạn (cách nhau bởi dấu phẩy), chọn thuật toán và “Giảm dần”." },
      cases: [
        { question: "Viết danh sách tên và điểm Tin học của các bạn trong tổ (theo thứ tự ban đầu).",
          answer: "Ví dụ: Lan 8 · Minh 10 · Hà 7 · Tuấn 9 · Vy 6." },
        { question: "Em dùng thuật toán nào? Ghi các bước sắp xếp điểm giảm dần và danh sách tên các bạn theo kết quả sắp xếp.",
          answer: "Ví dụ (sắp xếp chọn, giảm dần): vòng 1: 10 8 7 9 6; vòng 2: 10 9 7 8 6; vòng 3: 10 9 8 7 6; vòng 4: không đổi. Danh sách: Minh (10), Tuấn (9), Lan (8), Hà (7), Vy (6)." },
      ],
    },

    /* ===================== TỔNG KẾT ===================== */
    {
      id: "tong-ket", name: "Tổng kết", type: "summary",
      task: "Cả lớp nhắc lại kiến thức trọng tâm và làm thử thách cuối. Dặn dò: hoàn thành bài Vận dụng, nộp vào giờ sau.",
      content: {
        learned: [
          "Hoán đổi giá trị hai phần tử: C ← A; A ← B; B ← C.",
          "Nổi bọt: hoán đổi nhiều lần các phần tử liền kề nếu chúng không đúng thứ tự (SGK: từ cuối dãy lên, số nhỏ nổi lên đầu).",
          "Sắp xếp chọn: so sánh trực tiếp phần tử ở vị trí đang xét với các phần tử phía sau, hoán đổi nếu chưa đúng thứ tự.",
          "Chia bài toán thành những bài toán nhỏ hơn giúp thuật toán dễ hiểu và dễ thực hiện hơn.",
        ],
        challenge: [
          { question: "Dãy 2, 5, 1, 4. Sau vòng lặp thứ nhất: nổi bọt (SGK) cho dãy X, sắp xếp chọn cho dãy Y. X và Y là:", type: "multiple-choice",
            options: ["X = 1 2 5 4; Y = 1 5 2 4", "X = 1 5 2 4; Y = 1 2 5 4", "X = 1 2 4 5; Y = 1 2 4 5", "X = 2 1 5 4; Y = 1 2 5 4"],
            answer: 0, explanation: "Nổi bọt: 1 và 4 không đổi → 5 và 1 đổi (2 1 5 4) → 2 và 1 đổi (1 2 5 4). Chọn: 5 không nhỏ hơn 2; 1 < 2 đổi (1 5 2 4); 4 không nhỏ hơn 1.",
            level: "van-dung-cao", activity: "tong-ket" },
          { question: "Điều gì giống nhau ở thuật toán nổi bọt và sắp xếp chọn?", type: "multiple-choice",
            options: ["Đều không cần so sánh", "Đều dùng lặp lại bài toán nhỏ hơn là hoán đổi giá trị hai phần tử", "Đều chỉ sắp xếp được chữ", "Đều cần danh sách đã sắp xếp trước"],
            answer: 1, explanation: "Bài toán sắp xếp được giải quyết dựa trên lời giải của bài toán nhỏ hơn: hoán đổi giá trị hai phần tử.",
            level: "thong-hieu", activity: "tong-ket" },
        ],
      },
    },
  ],
};

if (typeof module !== "undefined" && module.exports) module.exports = LESSON;
if (typeof window !== "undefined") window.LESSON = LESSON;
