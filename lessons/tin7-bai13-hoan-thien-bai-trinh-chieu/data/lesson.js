/* ============================================================================
 * BÀI 13 — THỰC HÀNH TỔNG HỢP: HOÀN THIỆN BÀI TRÌNH CHIẾU  (Tin học 7 — Kết nối tri thức)
 * Chủ đề 4: Ứng dụng tin học (dự án Trường học xanh).
 * Bám sát SGK trang 68–70 + Kế hoạch bài dạy (3 tiết) của giáo viên.
 * Chỉ sửa file này để đổi nội dung. Engine app.js không cần sửa.
 * Tạo hiệu ứng thật: HS làm trên PowerPoint. App chỉ có trang chiếu minh hoạ (CSS) để quan sát, không mô phỏng phần mềm.
 * ==========================================================================*/

// ---- Nút mở phần mềm trình chiếu trực tuyến (mở tab mới) ----
const SLIDE_TOOLS = [
  { label: "PowerPoint trên web", url: "https://www.office.com/launch/powerpoint" },
  { label: "Google Trang trình bày (Slides)", url: "https://docs.google.com/presentation/" },
  { label: "Canva — bài thuyết trình", url: "https://www.canva.com/", note: "(mở tab mới, cần Internet và tài khoản)" },
];

// ---- Hiệu ứng minh hoạ bằng CSS (bấm ▶ để chạy lại) ----
const FX_CSS = `<style>
.b13-slide{width:380px;max-width:100%;min-height:214px;background:#fff;border:1px solid #cbd5e1;box-shadow:0 4px 14px rgba(0,0,0,.14);border-radius:6px;padding:14px 20px;box-sizing:border-box;font-family:Calibri,'Segoe UI',Arial,sans-serif;color:#1f2937;overflow:hidden;position:relative}
.b13-slide h4{margin:0 0 8px;text-align:center;font-size:1.35rem;font-weight:600;color:#15803d}
.b13-slide .ln{font-size:1.02rem;line-height:1.55;text-align:left}
.b13-slide .ln b{color:#15803d}
.b13-play{margin-top:8px;font:inherit;font-weight:700;border:0;border-radius:999px;padding:6px 16px;background:#7e22ce;color:#fff;cursor:pointer}
.b13-slide.fx .ln{opacity:0}
.b13-slide.fx.play .ln{animation:b13-fly .7s ease-out both}
.b13-slide.fx.play .ln:nth-of-type(2){animation-name:b13-fade;animation-delay:.9s}
.b13-slide.fx.play .ln:nth-of-type(3){animation-name:b13-wipe;animation-delay:1.8s}
.b13-slide.fx.play .ln:nth-of-type(4){animation-name:b13-zoom;animation-delay:2.7s}
.b13-slide.fx.play .ln:nth-of-type(5){animation-delay:3.6s}
.b13-slide.fx.play .ln:nth-of-type(1){animation-delay:0s}
@keyframes b13-fly{from{opacity:0;transform:translateX(-120%)}to{opacity:1;transform:none}}
@keyframes b13-fade{from{opacity:0}to{opacity:1}}
@keyframes b13-wipe{from{opacity:1;clip-path:inset(0 100% 0 0)}to{opacity:1;clip-path:inset(0 0 0 0)}}
@keyframes b13-zoom{from{opacity:0;transform:scale(.3)}to{opacity:1;transform:none}}
.b13-box{width:190px;height:140px;background:#fff;border:1px solid #cbd5e1;border-radius:8px;position:relative;overflow:hidden;box-shadow:0 3px 10px rgba(0,0,0,.1)}
.b13-obj{position:absolute;left:62px;top:40px;font-size:3.2rem;line-height:1}
.b13-box.play .en{animation:b13-fly 1s ease-out both}
.b13-box.play .em{animation:b13-pulse 1.6s ease-in-out both}
.b13-box.play .ex{animation:b13-out 1.2s ease-in both}
.b13-box.play .mp{animation:b13-path 2.4s ease-in-out both}
@keyframes b13-pulse{0%,100%{transform:none}25%,75%{transform:scale(1.45) rotate(-8deg)}50%{transform:scale(1.2) rotate(8deg)}}
@keyframes b13-out{from{opacity:1;transform:none}to{opacity:0;transform:translateY(120px)}}
@keyframes b13-path{0%{left:6px;top:80px}33%{left:62px;top:10px}66%{left:120px;top:80px}100%{left:62px;top:40px}}
</style>`;
const PLAY = (sel) => `<button type="button" class="b13-play" onclick="var s=this.parentNode.querySelector('${sel}');s.classList.remove('play');void s.offsetWidth;s.classList.add('play')">▶ Chạy hiệu ứng</button>`;
const LINES = ["<b>1.</b> Ý tưởng: xây dựng ngôi trường xanh – sạch – đẹp", "<b>2.</b> Kế hoạch: khảo sát, phân công trồng cây", "<b>3.</b> Kết quả dự kiến: 623 cây xanh", "<b>4.</b> Chi phí dự kiến: 30,692,200 đồng", "<b>5.</b> Kết luận: cả khối 7 cùng chung tay"];
const SLIDE = (fx) => `<div class="b13-slide${fx ? " fx" : ""}"><h4>Dự án Trường học xanh</h4>${LINES.map((t) => `<div class="ln">${t}</div>`).join("")}</div>`;
const HAI_TRANG = `${FX_CSS}<div style="display:flex;flex-wrap:wrap;gap:24px;justify-content:center;align-items:flex-start;text-align:center">
  <div>${SLIDE(false)}<div style="margin-top:8px;font-weight:700;color:#64748b">Trang ①: không có hiệu ứng động</div></div>
  <div>${SLIDE(true)}<div style="margin-top:4px;font-weight:700;color:#7e22ce">Trang ②: có hiệu ứng động</div>${PLAY(".b13-slide.fx")}</div></div>`;
const NHOM = (cls, ico, name, vi, color) => `<div style="text-align:center"><div class="b13-box"><span class="b13-obj ${cls}">${ico}</span></div>
  <div style="margin-top:6px;font-weight:800;color:${color}">${name}</div><div style="color:#4a5f66">${vi}</div>${PLAY(".b13-box")}</div>`;
const BON_NHOM = `${FX_CSS}<div style="display:flex;flex-wrap:wrap;gap:18px;justify-content:center">
  ${NHOM("en", "🌳", "Entrance", "xuất hiện", "#16a34a")}${NHOM("em", "⭐", "Emphasis", "nhấn mạnh", "#ca8a04")}
  ${NHOM("ex", "🍂", "Exit", "biến mất", "#dc2626")}${NHOM("mp", "🐝", "Motion Paths", "đường di chuyển", "#2563eb")}</div>`;

const LESSON = {
  meta: {
    subject: "Tin học", grade: "7", book: "Kết nối tri thức với cuộc sống",
    title: "Bài 13: Thực hành tổng hợp: Hoàn thiện bài trình chiếu", unit: "Chủ đề 4 — Ứng dụng tin học",
    pages: "68–70", durationMinutes: 135,
  },
  objectives: {
    knowledge: [
      "Biết đưa hiệu ứng động vào bài trình chiếu và sử dụng hiệu ứng một cách hợp lí.",
      "Biết cách tổng hợp, sắp xếp các nội dung đã có thành một bài trình chiếu hoàn chỉnh.",
      "Hoàn thiện được bài trình chiếu báo cáo dự án “Trường học xanh”.",
    ],
    competencies: [
      "Tự chủ, tự học; giao tiếp và hợp tác (nhóm đôi, nhóm); giải quyết vấn đề và sáng tạo.",
      "Năng lực số 3.1.TC1a, 3.2.TC1a: áp dụng hiệu ứng cho đối tượng, hiệu ứng chuyển trang; điều chỉnh thứ tự, thời lượng; kiểm tra, chạy thử; lưu và chia sẻ sản phẩm.",
      "Năng lực số 5.3.TC1a: khai thác hiệu ứng sáng tạo có kiểm soát, cá nhân hoá sản phẩm.",
      "Năng lực AI 7.B3.1: thể hiện thái độ, cam kết sử dụng AI có trách nhiệm trong sản phẩm học tập.",
    ],
    qualities: ["Chăm chỉ, trách nhiệm, nhân ái, trung thực (tôn trọng bản quyền)."],
  },
  coreKnowledge: [
    "Hiệu ứng động là cách thức và thời điểm xuất hiện của các trang chiếu và các đối tượng trên trang khi trình chiếu.",
    "Có hai loại hiệu ứng động: hiệu ứng cho đối tượng (thẻ Animations) và hiệu ứng chuyển trang chiếu (thẻ Transitions).",
    "Hiệu ứng động giúp bài trình chiếu sinh động, hấp dẫn, thu hút người xem, truyền đạt thông tin hiệu quả; quá nhiều hoặc không phù hợp sẽ gây hiệu ứng ngược → dùng có chọn lọc.",
    "Tạo hiệu ứng cho đối tượng: chọn đối tượng → Animations → chọn hiệu ứng → cách xuất hiện, thời lượng → thứ tự → Preview. Chuyển trang: chọn trang → Transitions → hiệu ứng → âm thanh, thời lượng → Preview.",
    "Dùng hợp lí: đơn giản, rõ ràng; chuyển trang thống nhất; chọn lọc hiệu ứng đối tượng; chỉ dùng âm thanh khi thật cần thiết.",
  ],
  keywords: ["Hiệu ứng động", "Animations", "Transitions", "Chọn lọc", "Preview"],
  settings: { basePoints: 100, useTimer: false, defaultTime: 60, sound: true, streakEnabled: true },

  activities: [
    /* =========================== TIẾT 1 =========================== */
    /* ===================== HĐ1: MỞ ĐẦU (10 phút) ===================== */
    {
      id: "khoi-dong", name: "Mở đầu — Trang nào hấp dẫn hơn? 🎬", type: "knowledge",
      goal: "Nhận biết sự khác nhau giữa trang có và không có hiệu ứng động; vai trò của hiệu ứng.",
      time: 600,
      task: "Hoạt động 1 (SGK tr.68): quan sát hai trang chiếu có cùng nội dung (bấm ▶ để chạy trang ②). Hai trang khác nhau thế nào? Em thích xem trang nào hơn, vì sao? Em có muốn dùng hiệu ứng động trong bài của mình không?",
      sgkImage: "assets/sgk/sgk-trang68.jpg",
      html: HAI_TRANG,
      content: {
        heading: "🎬 Trang nào hấp dẫn hơn?",
        prompt: "Bài trình chiếu báo cáo dự án Trường học xanh đã có đầy đủ thông tin, các đối tượng đã được định dạng. Việc tiếp theo là bổ sung các hiệu ứng động khi trình bày để có một bài thuyết trình hoàn chỉnh.",
      },
      questions: [
        { question: "Hai trang chiếu khác nhau như thế nào?", type: "multiple-choice",
          options: ["Trang ② có nhiều chữ hơn", "Trang ① xuất hiện toàn bộ nội dung cùng lúc; trang ② xuất hiện nội dung theo từng bước, có hiệu ứng động", "Trang ① có hình ảnh, trang ② không có", "Hai trang giống hệt nhau"],
          answer: 1, explanation: "Cùng nội dung, nhưng trang ② có hiệu ứng động: các dòng lần lượt xuất hiện theo từng bước.", level: "nhan-biet", activity: "khoi-dong" },
        { question: "Khi thuyết trình, trang ② giúp người trình bày điều gì?", type: "multiple-choice",
          options: ["Nói nhanh hơn", "Không cần chuẩn bị nội dung", "Kiểm soát thông tin theo trình tự, người nghe dễ theo dõi từng ý", "Giấu bớt nội dung không cần nói"],
          answer: 2, explanation: "Nội dung xuất hiện theo từng bước giúp người nghe tập trung vào ý đang nói, người trình bày kiểm soát được nhịp độ.", level: "thong-hieu", activity: "khoi-dong" },
      ],
    },

    /* ===================== HĐ2.1: HIỆU ỨNG ĐỘNG (30 phút) ===================== */
    {
      id: "hieu-ung-dong", name: "Hiệu ứng động là gì? ✨", type: "knowledge",
      goal: "Nêu được khái niệm, hai loại, tác dụng của hiệu ứng động và lưu ý khi sử dụng.",
      time: 600,
      task: "Nhóm đôi: đọc SGK tr.68, trả lời 4 câu: Hiệu ứng động là gì? Có những loại nào? Sử dụng nhằm mục đích gì? Câu “Sử dụng càng nhiều hiệu ứng động càng tốt” có đúng không, vì sao?",
      sgkImage: "assets/sgk/sgk-trang68.jpg",
      content: {
        heading: "✨ Hiệu ứng động",
        revealLabel: "🔍 Hiệu ứng động (SGK tr.68)",
        blocks: [
          { kind: "text", value: "Hiệu ứng động trong bài trình chiếu là cách thức và thời điểm xuất hiện của các trang chiếu và các đối tượng trên trang chiếu (văn bản, hình ảnh, biểu đồ, âm thanh,…) khi trình chiếu." },
          { kind: "list", value: [
            "Có hai loại hiệu ứng động: hiệu ứng cho các đối tượng trên trang chiếu, gọi là hiệu ứng cho đối tượng · hiệu ứng cho các trang chiếu, gọi là hiệu ứng chuyển trang chiếu.",
            "Các phần mềm trình chiếu thường cung cấp nhiều hiệu ứng động cho đối tượng cùng những lựa chọn để điều khiển việc hiển thị đối tượng trên trang chiếu ở các mức độ khác nhau.",
            "Việc sử dụng hiệu ứng động giúp bài trình chiếu trở nên sinh động và hấp dẫn hơn, thu hút sự chú ý của người xem và tạo hiệu quả tốt trong việc truyền đạt thông tin.",
            "Tuy nhiên việc sử dụng quá nhiều hoặc không phù hợp có thể gây hiệu ứng ngược, làm cho người nghe mất tập trung vào nội dung chính. Bởi vậy, cần cân nhắc sử dụng hiệu ứng cho hợp lí.",
          ] },
        ],
      },
      questions: [
        { question: "Câu 1: Hiệu ứng động trong bài trình chiếu là gì?", type: "multiple-choice",
          options: ["Các hình ảnh động chèn vào trang", "Cách thức và thời điểm xuất hiện của các trang chiếu và các đối tượng trên trang khi trình chiếu", "Màu nền thay đổi liên tục", "Âm thanh phát khi mở tệp"],
          answer: 1, explanation: "Hiệu ứng động là cách thức và thời điểm xuất hiện của các trang chiếu và các đối tượng trên trang chiếu khi trình chiếu.", level: "nhan-biet", activity: "hieu-ung-dong" },
        { question: "Câu 2: Có hai loại hiệu ứng động, đó là:", type: "multiple-choice",
          options: ["Hiệu ứng chữ và hiệu ứng hình", "Hiệu ứng âm thanh và hiệu ứng video", "Hiệu ứng nhanh và hiệu ứng chậm", "Hiệu ứng cho đối tượng và hiệu ứng chuyển trang chiếu"],
          answer: 3, explanation: "Hiệu ứng cho các đối tượng trên trang chiếu (hiệu ứng cho đối tượng) và hiệu ứng cho các trang chiếu (hiệu ứng chuyển trang chiếu).", level: "nhan-biet", activity: "hieu-ung-dong" },
        { question: "Câu 3: Sử dụng hiệu ứng động nhằm mục đích gì?", type: "multiple-choice",
          options: ["Làm bài trình chiếu sinh động, hấp dẫn, thu hút người xem, truyền đạt thông tin hiệu quả", "Làm tệp trình chiếu nhỏ hơn", "Thay thế cho nội dung", "Để không cần thuyết trình"],
          answer: 0, explanation: "Hiệu ứng động giúp bài trình chiếu sinh động, hấp dẫn, thu hút sự chú ý và tạo hiệu quả tốt trong truyền đạt thông tin.", level: "thong-hieu", activity: "hieu-ung-dong" },
        { question: "Câu 4: “Sử dụng càng nhiều hiệu ứng động càng tốt.”", type: "true-false", answer: false,
          explanation: "Sai. Quá nhiều hoặc không phù hợp gây hiệu ứng ngược, người nghe mất tập trung. Hiệu ứng động nên được sử dụng có chọn lọc.", level: "thong-hieu", activity: "hieu-ung-dong" },
        { question: "Khi chuyển từ trang 2 sang trang 3, cả trang mới “trượt” vào màn hình. Đó là loại hiệu ứng nào?", type: "multiple-choice",
          options: ["Hiệu ứng cho đối tượng", "Định dạng văn bản", "Hiệu ứng chuyển trang chiếu", "Mẫu định dạng (theme)"],
          answer: 2, explanation: "Hiệu ứng áp dụng cho cả trang chiếu khi chuyển trang là hiệu ứng chuyển trang chiếu.", level: "van-dung", activity: "hieu-ung-dong" },
      ],
      remember: [
        "Hiệu ứng động là cách thức và thời điểm xuất hiện của các trang chiếu và các đối tượng trên trang khi trình chiếu.",
        "Sử dụng hiệu ứng động giúp cho bài trình chiếu trở nên sinh động và hấp dẫn hơn, thu hút sự chú ý của người xem và tạo hiệu quả tốt trong việc truyền đạt thông tin.",
        "Hiệu ứng động nên được sử dụng một cách có chọn lọc để giúp tăng tính hiệu quả cho nội dung và tạo ấn tượng với người xem.",
      ],
    },
    {
      id: "hai-loai", name: "Trò chơi: Đối tượng hay Chuyển trang? 🎯", type: "dragdrop",
      goal: "Phân biệt hiệu ứng cho đối tượng và hiệu ứng chuyển trang chiếu.",
      time: 150,
      task: "Xếp mỗi hiệu ứng vào đúng loại. Xếp hết rồi bấm Nộp bài.",
      groups: ["🌟 Hiệu ứng cho đối tượng", "🔁 Hiệu ứng chuyển trang chiếu"],
      items: [
        { text: "Tiêu đề “TRƯỜNG HỌC XANH” bay từ trái vào", group: 0 },
        { text: "Hình ảnh cây xanh hiện dần lên trên trang", group: 0 },
        { text: "Con số 623 cây phóng to để nhấn mạnh", group: 0 },
        { text: "Các ý của trang lần lượt xuất hiện khi bấm chuột", group: 0 },
        { text: "Trang tiếp theo mở ra kiểu Wipe khi chuyển trang", group: 1 },
        { text: "Cả trang 3 đẩy trang 2 sang bên (Push)", group: 1 },
        { text: "Âm thanh phát lên khi chuyển sang trang Kết luận", group: 1 },
      ],
      explanation: "Hiệu ứng cho đối tượng: văn bản, hình ảnh… trên trang (thẻ Animations) · Hiệu ứng chuyển trang chiếu: áp dụng cho cả trang khi chuyển trang (thẻ Transitions).",
    },
    {
      id: "ghep-a-b", name: "Ghép cột A với cột B 🧩", type: "matching",
      goal: "Củng cố khái niệm, tác dụng hiệu ứng động (câu hỏi SGK tr.69).",
      time: 150,
      task: "Ghép mỗi nội dung ở cột A với một nội dung phù hợp ở cột B. Làm hết rồi bấm Nộp bài.",
      sgkImage: "assets/sgk/sgk-trang69.jpg",
      pairs: [
        { left: "1) Sử dụng hiệu ứng động trong bài trình chiếu", right: "b) giúp cho việc trình chiếu trở nên sinh động và hấp dẫn hơn." },
        { left: "2) Hiệu ứng động trong bài trình chiếu", right: "d) là cách thức và thời điểm xuất hiện của các trang chiếu và các đối tượng trên trang chiếu." },
        { left: "3) Hiệu ứng cho các trang chiếu", right: "a) gọi là hiệu ứng chuyển trang chiếu." },
        { left: "4) Nội dung trên trang chiếu sẽ thu hút sự chú ý của người xem và tạo hiệu quả tốt hơn trong việc truyền đạt thông tin", right: "c) khi được thêm các hiệu ứng động." },
      ],
      explanation: "1 – b; 2 – d; 3 – a; 4 – c.",
    },
    {
      id: "bon-nhom", name: "Mở rộng: 4 nhóm hiệu ứng cho đối tượng 🌈", type: "matching",
      goal: "Mở rộng (ngoài SGK, theo giáo án): phân biệt Entrance, Emphasis, Exit, Motion Paths.",
      time: 180,
      task: "Mở rộng: bấm ▶ để xem từng nhóm hiệu ứng, rồi ghép mỗi nhóm với tác dụng của nó. Làm hết rồi bấm Nộp bài.",
      html: BON_NHOM + `<p style="text-align:center;color:#4a5f66;margin:.6rem 0 0">📚 <b>Mở rộng</b> (không có trong SGK): trong PowerPoint, thẻ Animations → nút More chia hiệu ứng cho đối tượng thành 4 nhóm — biểu tượng màu xanh lá (xuất hiện), vàng (nhấn mạnh), đỏ (biến mất) và đường di chuyển.</p>`,
      pairs: [
        { left: "🌳 Entrance", right: "Làm đối tượng xuất hiện trên trang" },
        { left: "⭐ Emphasis", right: "Nhấn mạnh đối tượng đang có trên trang" },
        { left: "🍂 Exit", right: "Làm đối tượng biến mất khỏi trang" },
        { left: "🐝 Motion Paths", right: "Cho đối tượng di chuyển theo một đường" },
      ],
      explanation: "Mở rộng: Entrance — xuất hiện · Emphasis — nhấn mạnh (ví dụ làm nổi bật số liệu) · Exit — biến mất · Motion Paths — đường di chuyển (ví dụ biểu diễn một quá trình).",
    },

    /* =========================== TIẾT 2 =========================== */
    /* ===================== HĐ2.2: THỰC HÀNH TỔNG HỢP (45 phút) ===================== */
    {
      id: "buoc-doi-tuong", name: "a) Các bước tạo hiệu ứng cho đối tượng 🔢", type: "ordering",
      goal: "Nắm trình tự tạo hiệu ứng cho đối tượng (Hình 13.1).",
      time: 150,
      task: "Quan sát Hình 13.1, sắp xếp các bước tạo hiệu ứng cho tiêu đề “TRƯỜNG HỌC XANH” rồi bấm Nộp bài.",
      sgkImage: "assets/sgk/hinh-13-1.jpg",
      steps: [
        "Chọn đối tượng (tiêu đề TRƯỜNG HỌC XANH)",
        "Chọn thẻ Animations",
        "Chọn hiệu ứng (ví dụ Float In)",
        "Chọn cách đối tượng xuất hiện, thời lượng (Start, Duration, Delay)",
        "Thay đổi thứ tự đối tượng xuất hiện (Move Earlier / Move Later)",
        "Xem trước (Preview)",
      ],
      explanation: "1. Chọn đối tượng → 2. Animations → 3. Chọn hiệu ứng (nút More để xem thêm) → 4. Cách xuất hiện, thời lượng → 5. Thứ tự → 6. Preview.",
    },
    {
      id: "buoc-chuyen-trang", name: "b) Các bước tạo hiệu ứng chuyển trang chiếu 🔢", type: "ordering",
      goal: "Nắm trình tự tạo hiệu ứng chuyển trang chiếu (Hình 13.2).",
      time: 120,
      task: "Quan sát Hình 13.2, sắp xếp các bước tạo hiệu ứng chuyển trang chiếu rồi bấm Nộp bài.",
      sgkImage: "assets/sgk/hinh-13-2.jpg",
      steps: [
        "Chọn trang chiếu",
        "Chọn thẻ Transitions",
        "Chọn hiệu ứng (ví dụ Wipe)",
        "Chọn âm thanh, thời lượng thực hiện hiệu ứng",
        "Xem trước (Preview)",
      ],
      explanation: "1. Chọn trang chiếu → 2. Transitions → 3. Chọn hiệu ứng → 4. Âm thanh, thời lượng → 5. Preview.",
    },
    {
      id: "thuc-hanh", name: "Thực hành: Tạo hiệu ứng cho bài trình chiếu Trường học xanh 🌳", type: "knowledge",
      goal: "Tạo hiệu ứng cho đối tượng, hiệu ứng chuyển trang; sử dụng hợp lí; hoàn thiện bài trình chiếu.",
      time: 1500,
      task: "Nhóm thực hành trên máy (SGK tr.69–70): mở Truonghocxanh.pptx, tạo hiệu ứng cho các đối tượng, hiệu ứng chuyển trang cho các trang; tổng hợp, sắp xếp, bổ sung nội dung; trình bày lại cách làm thật cô đọng.",
      sgkImage: "assets/sgk/hinh-13-1.jpg",
      links: SLIDE_TOOLS,
      content: {
        heading: "🌳 Hoàn thiện bài trình chiếu Truonghocxanh.pptx",
        revealLabel: "📖 Hướng dẫn (SGK tr.69–70)",
        blocks: [
          { kind: "text", value: "a) Tạo hiệu ứng cho đối tượng: 1. Chọn đối tượng · 2. Chọn thẻ Animations · 3. Chọn hiệu ứng (nháy nút More để có thêm hiệu ứng) · 4. Chọn cách đối tượng xuất hiện, thời lượng,… · 5. Thay đổi thứ tự đối tượng xuất hiện · 6. Xem trước (Preview)." },
          { kind: "image", value: "assets/sgk/hinh-13-1.jpg", caption: "Hình 13.1. Tạo hiệu ứng cho đối tượng" },
          { kind: "text", value: "b) Tạo hiệu ứng chuyển trang chiếu: 1. Chọn trang chiếu · 2. Chọn thẻ Transitions · 3. Chọn hiệu ứng · 4. Chọn âm thanh, thời lượng thực hiện hiệu ứng · 5. Xem trước (Preview)." },
          { kind: "image", value: "assets/sgk/hinh-13-2.jpg", caption: "Hình 13.2. Tạo hiệu ứng chuyển trang chiếu" },
          { kind: "list", value: [
            "c) Sử dụng hiệu ứng hợp lí: trình bày càng đơn giản, rõ ràng thì càng thuyết phục · dùng hiệu ứng chuyển trang thống nhất cho tất cả các trang · chọn lọc hiệu ứng cho các đối tượng, tự hỏi “Hiệu ứng này có thể khiến bài thuyết trình hiệu quả hơn không?” · chỉ dùng âm thanh khi thật cần thiết.",
            "d) Hoàn thiện bài trình chiếu: xem lại bố cục, nội dung của bài báo cáo · bố trí lại các đối tượng trên trang (khung văn bản, hình ảnh, bảng biểu,…), định dạng lại một số hình ảnh, căn lề văn bản (nếu cần) · sáng tạo thêm, phát huy khả năng hội hoạ trong cách trình bày · lưu lại kết quả làm việc.",
          ] },
        ],
      },
      questions: [
        { question: "Để tạo hiệu ứng cho hình ảnh trên trang chiếu, sau khi chọn hình ảnh em chọn thẻ nào?", type: "multiple-choice",
          options: ["Transitions", "Design", "Animations", "Insert"],
          answer: 2, explanation: "Hiệu ứng cho đối tượng: thẻ Animations. Hiệu ứng chuyển trang chiếu: thẻ Transitions.", level: "nhan-biet", activity: "thuc-hanh" },
        { question: "Trong nhóm Timing của thẻ Animations, ô Duration dùng để chọn:", type: "multiple-choice", sgkImage: "assets/sgk/hinh-13-1.jpg",
          options: ["Thời lượng thực hiện hiệu ứng", "Màu của đối tượng", "Kiểu chữ", "Số trang chiếu"],
          answer: 0, explanation: "Bước 4: chọn cách đối tượng xuất hiện (Start), thời lượng (Duration),…", level: "thong-hieu", activity: "thuc-hanh" },
        { question: "Hình ảnh đang xuất hiện trước tiêu đề. Muốn tiêu đề xuất hiện trước, em dùng:", type: "multiple-choice", sgkImage: "assets/sgk/hinh-13-1.jpg",
          options: ["Nút More", "Preview", "Chọn hiệu ứng None", "Reorder Animation: Move Earlier / Move Later"],
          answer: 3, explanation: "Bước 5: thay đổi thứ tự đối tượng xuất hiện bằng Move Earlier (sớm hơn) / Move Later (muộn hơn).", level: "van-dung", activity: "thuc-hanh" },
        { question: "Muốn các trang dùng hiệu ứng chuyển trang thống nhất, sau khi chọn hiệu ứng cho một trang em nháy nút nào trong thẻ Transitions?", type: "multiple-choice", sgkImage: "assets/sgk/hinh-13-2.jpg",
          options: ["Preview", "Apply To All", "Effect Options", "None"],
          answer: 1, explanation: "Apply To All áp dụng cùng hiệu ứng chuyển trang cho tất cả các trang — đúng lưu ý “dùng hiệu ứng chuyển trang thống nhất”.", level: "van-dung", activity: "thuc-hanh" },
        { question: "Ô Sound trong thẻ Transitions đang là [No Sound]. Theo lưu ý SGK, em nên:", type: "multiple-choice",
          options: ["Chọn âm thanh cho mọi trang", "Chọn âm thanh to nhất", "Chỉ dùng âm thanh khi thật cần thiết", "Luôn tắt máy chiếu"],
          answer: 2, explanation: "Chỉ dùng âm thanh khi thật cần thiết để người xem không khó chịu, không mất tập trung.", level: "thong-hieu", activity: "thuc-hanh" },
      ],
    },
    {
      id: "hop-li", name: "Trò chơi: Hợp lí hay Chưa hợp lí? ⚖️", type: "dragdrop",
      goal: "Vận dụng lưu ý sử dụng hiệu ứng hợp lí.",
      time: 150,
      task: "Xếp mỗi cách dùng hiệu ứng vào nhóm Hợp lí hoặc Chưa hợp lí. Xếp hết rồi bấm Nộp bài.",
      groups: ["✅ Hợp lí", "❌ Chưa hợp lí"],
      items: [
        { text: "Dùng một kiểu chuyển trang thống nhất cho tất cả các trang", group: 0 },
        { text: "Các ý chính lần lượt xuất hiện theo lời thuyết trình", group: 0 },
        { text: "Chỉ dùng âm thanh khi thật cần thiết", group: 0 },
        { text: "Tự hỏi “Hiệu ứng này có giúp bài hiệu quả hơn không?”", group: 0 },
        { text: "Mỗi trang một kiểu chuyển trang khác nhau", group: 1 },
        { text: "Mỗi dòng chữ một hiệu ứng khác nhau, xoay tròn liên tục", group: 1 },
        { text: "Chèn tiếng còi xe cho mọi hiệu ứng", group: 1 },
      ],
      explanation: "Trình bày càng đơn giản, rõ ràng thì càng thuyết phục; chuyển trang thống nhất; chọn lọc hiệu ứng; chỉ dùng âm thanh khi thật cần thiết.",
    },
    {
      id: "tu-kiem-tra", name: "Phiếu tự kiểm tra bài trình chiếu 📋", type: "checklist",
      goal: "Tự đánh giá mức độ hoàn thành bài thực hành trên PowerPoint.",
      time: 180,
      task: "Nhóm chạy thử (Preview / trình chiếu) Truonghocxanh.pptx, tick từng việc vào cột Đã làm hoặc Chưa làm, ghi khó khăn (nếu có) rồi gửi cho thầy/cô.",
      sgkImage: "assets/sgk/hinh-13-2.jpg",
      columns: ["✅ Đã làm", "⏳ Chưa làm"],
      sections: [
        { title: "🌟 HIỆU ỨNG CHO ĐỐI TƯỢNG", items: [
          "Tạo hiệu ứng cho tiêu đề, hình ảnh, các ý chính",
          "Chọn cách xuất hiện, thời lượng phù hợp",
          "Thứ tự xuất hiện hợp lí theo lời thuyết trình",
        ] },
        { title: "🔁 HIỆU ỨNG CHUYỂN TRANG", items: [
          "Dùng hiệu ứng chuyển trang thống nhất cho các trang",
          "Chỉ dùng âm thanh khi thật cần thiết",
        ] },
        { title: "🧩 HOÀN THIỆN", items: [
          "Xem lại bố cục, nội dung, bố trí lại các đối tượng",
          "Chạy thử (Preview), không có hiệu ứng rối mắt",
          "Lưu lại tệp Truonghocxanh.pptx",
        ] },
      ],
      note: "Nhóm em gặp khó khăn ở bước nào? Em đã khắc phục như thế nào?",
      modelAnswer: [
        "Bài đạt: đối tượng quan trọng có hiệu ứng hợp lí, không rối mắt; chuyển trang thống nhất; nội dung mạch lạc, rõ ràng.",
        "Khó khăn thường gặp: quên chọn đối tượng trước khi chọn hiệu ứng; thứ tự xuất hiện lộn xộn (dùng Move Earlier / Move Later); mỗi trang một kiểu chuyển trang; thêm âm thanh ở mọi trang.",
      ],
    },

    /* =========================== TIẾT 3 =========================== */
    /* ===================== HĐ3: LUYỆN TẬP (35 phút) ===================== */
    {
      id: "cham-cheo", name: "Luyện tập — Trình chiếu và chấm chéo sản phẩm 🤝", type: "checklist",
      goal: "Hoàn thiện, trình chiếu bài báo cáo dự án của nhóm; đánh giá chéo theo bảng kiểm.",
      time: 900,
      target: "Nhóm em chấm bài của",
      task: "Luyện tập (SGK tr.70): tạo hiệu ứng cho các trang và đối tượng để hoàn thiện bài trình chiếu báo cáo dự án của nhóm. Các nhóm trình chiếu sản phẩm; đại diện nhóm chấm sản phẩm của nhóm được phân công theo bảng kiểm rồi gửi cho thầy/cô.",
      sgkImage: "assets/sgk/sgk-trang70.jpg",
      links: SLIDE_TOOLS,
      columns: ["✅ Đạt", "🔧 Cần cải thiện"],
      sections: [
        { title: "📑 NỘI DUNG VÀ BỐ CỤC", items: [
          "Có trang tiêu đề, các trang nội dung có tiêu đề trang",
          "Nội dung sắp xếp mạch lạc: mở đầu – nội dung – kết luận",
          "Có kết quả tính toán, hình ảnh minh hoạ phù hợp",
        ] },
        { title: "✨ HIỆU ỨNG", items: [
          "Hiệu ứng cho đối tượng có chọn lọc, không rối mắt",
          "Thứ tự xuất hiện hợp lí",
          "Chuyển trang thống nhất, âm thanh chỉ khi cần",
        ] },
        { title: "🎤 TRÌNH BÀY", items: [
          "Chữ dễ đọc, màu sắc hài hoà",
          "Người thuyết trình nói rõ ràng, khớp với hiệu ứng",
        ] },
      ],
      note: "Góp ý cho nhóm bạn: một điều em thích nhất và một điều nên sửa",
      modelAnswer: [
        "Góp ý cụ thể, lịch sự: nêu điểm tốt trước, rồi đến điểm nên sửa kèm cách sửa.",
        "Ví dụ: “Trang Kết quả dự kiến có số liệu nổi bật, hiệu ứng xuất hiện từng ý rất dễ theo dõi. Nên bỏ âm thanh ở mỗi lần chuyển trang và dùng một kiểu chuyển trang cho cả bài.”",
      ],
    },
    {
      id: "tro-choi", name: "Trò chơi: Pháo hoa cuối năm học 🎆", type: "penguin",
      pet: "🎆", homeIcon: "🏫", enemy: "🌧️", saveWord: "chùm pháo hoa bừng sáng",
      winText: "Bầu trời rực rỡ pháo hoa — bài trình chiếu của em đã hoàn thiện thật ấn tượng!",
      goal: "Củng cố toàn bài: hiệu ứng động, hai loại hiệu ứng, các bước tạo, sử dụng hợp lí.",
      time: 240,
      task: "Trả lời đúng mỗi câu để một chùm pháo hoa 🎆 bừng sáng trước khi cơn mưa 🌧️ kéo đến!",
      intro: "Mỗi câu đúng: một chùm pháo hoa 🎆 bừng sáng. Sai thì mây mưa 🌧️ kéo tới!",
      questions: [
        { question: "Thẻ nào dùng để tạo hiệu ứng chuyển trang chiếu?", type: "multiple-choice",
          options: ["Animations", "Transitions", "Design", "Home"],
          answer: 1, explanation: "Transitions: hiệu ứng chuyển trang chiếu · Animations: hiệu ứng cho đối tượng.", level: "nhan-biet", activity: "tro-choi" },
        { question: "Nút Preview dùng để:", type: "multiple-choice",
          options: ["Xem trước hiệu ứng đã áp dụng", "Xoá hiệu ứng", "Lưu tệp", "Chèn hình ảnh"],
          answer: 0, explanation: "Preview: xem trước hiệu ứng (bước cuối cùng ở Hình 13.1 và 13.2).", level: "nhan-biet", activity: "tro-choi" },
        { question: "Muốn xem thêm nhiều hiệu ứng hơn trong thẻ Animations, em nháy:", type: "multiple-choice",
          options: ["Nút Preview", "Nút Apply To All", "Nút More", "Nút Move Later"],
          answer: 2, explanation: "Nháy nút More để có thêm hiệu ứng.", level: "nhan-biet", activity: "tro-choi" },
        { question: "Bước đầu tiên khi tạo hiệu ứng cho một hình ảnh là:", type: "multiple-choice",
          options: ["Chọn thẻ Transitions", "Nháy Preview", "Chọn hiệu ứng Fly In", "Chọn hình ảnh (đối tượng)"],
          answer: 3, explanation: "Bước 1: chọn đối tượng; sau đó mới chọn thẻ Animations và hiệu ứng.", level: "thong-hieu", activity: "tro-choi" },
        { question: "Vì sao không nên dùng quá nhiều hiệu ứng trên một trang?", type: "multiple-choice",
          options: ["Vì phần mềm không cho phép", "Vì gây hiệu ứng ngược, người nghe mất tập trung vào nội dung chính", "Vì tệp sẽ bị xoá", "Vì máy chiếu không hiển thị được"],
          answer: 1, explanation: "Quá nhiều hoặc không phù hợp có thể gây hiệu ứng ngược, làm người nghe mất tập trung vào nội dung chính.", level: "thong-hieu", activity: "tro-choi" },
        { question: "Trang Kết quả dự kiến có con số 623 cây. Cách dùng hiệu ứng nào hợp lí nhất?", type: "multiple-choice",
          options: ["Cho con số xuất hiện đúng lúc nói tới và nhấn mạnh nhẹ", "Cho con số xoay tròn suốt buổi", "Cho mỗi chữ số bay từ một hướng khác nhau kèm tiếng nổ", "Không cho con số xuất hiện"],
          answer: 0, explanation: "Chọn lọc hiệu ứng để làm nổi bật thông tin quan trọng, giúp bài thuyết trình hiệu quả hơn.", level: "van-dung", activity: "tro-choi" },
        { question: "Bạn Nam dùng 5 kiểu chuyển trang khác nhau cho 5 trang. Em góp ý:", type: "multiple-choice",
          options: ["Rất hay, càng nhiều càng tốt", "Nên thêm âm thanh cho mỗi trang", "Nên dùng một hiệu ứng chuyển trang thống nhất cho tất cả các trang", "Nên bỏ hết nội dung"],
          answer: 2, explanation: "Dùng hiệu ứng chuyển trang thống nhất cho tất cả các trang (SGK tr.70).", level: "van-dung", activity: "tro-choi" },
        { question: "Mở rộng: Để làm nổi bật một con số đang có trên trang, em chọn nhóm hiệu ứng nào?", type: "multiple-choice",
          options: ["Entrance", "Exit", "Motion Paths", "Emphasis"],
          answer: 3, explanation: "Mở rộng: Emphasis — nhấn mạnh đối tượng đang có trên trang.", level: "van-dung-cao", activity: "tro-choi" },
      ],
    },

    /* ===================== HĐ4: VẬN DỤNG (10 phút) ===================== */
    {
      id: "van-dung", name: "Vận dụng — Hoàn thiện Baitaptinhoc7.pptx 💡", type: "vandung",
      goal: "Bổ sung hiệu ứng động, xem lại nội dung, định dạng, hiệu ứng từng trang để hoàn thiện bài trình chiếu cá nhân.",
      time: 600,
      task: "Vận dụng (SGK tr.70): bổ sung hiệu ứng động cho bài trình chiếu Baitaptinhoc7.pptx; xem lại nội dung, định dạng, hiệu ứng của từng trang để hoàn thiện. Chưa xong thì hoàn thiện ở nhà. Gửi thầy/cô câu trả lời.",
      intro: "Gửi câu trả lời cho thầy/cô.",
      sgkImage: "assets/sgk/sgk-trang70.jpg",
      cases: [
        { question: "Em đã thêm hiệu ứng cho những đối tượng nào trong Baitaptinhoc7.pptx? Vì sao em chọn các hiệu ứng đó?",
          answer: "Ví dụ: tiêu đề trang tiêu đề hiện dần (Fade) để mở đầu nhẹ nhàng; các ý chính xuất hiện lần lượt theo lời nói; ảnh minh hoạ hiện sau phần chữ; số liệu quan trọng được nhấn mạnh — hiệu ứng đơn giản, không rối mắt." },
        { question: "Em dùng hiệu ứng chuyển trang nào, có thống nhất cho các trang không? Khi chạy thử (Preview), em đã phát hiện và sửa điều gì?",
          answer: "Ví dụ: dùng một hiệu ứng Wipe cho tất cả các trang (Apply To All), không dùng âm thanh; khi chạy thử thấy ảnh xuất hiện trước tiêu đề nên dùng Move Later để đổi thứ tự, rồi lưu tệp." },
      ],
    },

    /* ===================== TỔNG KẾT ===================== */
    {
      id: "tong-ket", name: "Tổng kết", type: "summary",
      task: "Cả lớp nhắc lại kiến thức trọng tâm và làm thử thách cuối. Dặn dò: hoàn thiện, lưu và gửi sản phẩm; đọc trước Bài 14 “Thuật toán tìm kiếm tuần tự”.",
      content: {
        learned: [
          "Hiệu ứng động: cách thức và thời điểm xuất hiện của các trang chiếu và đối tượng khi trình chiếu.",
          "Hai loại: hiệu ứng cho đối tượng (Animations) và hiệu ứng chuyển trang chiếu (Transitions).",
          "Các bước: chọn đối tượng/trang → chọn thẻ → chọn hiệu ứng → cách xuất hiện, thời lượng, âm thanh → thứ tự → Preview.",
          "Dùng hợp lí: đơn giản, rõ ràng; chuyển trang thống nhất; chọn lọc hiệu ứng; âm thanh chỉ khi thật cần thiết.",
        ],
        challenge: [
          { question: "Nhóm Lan muốn trang “Kế hoạch” có 3 ý xuất hiện lần lượt khi bấm chuột và cả bài dùng một kiểu chuyển trang. Cách làm đúng là:", type: "multiple-choice",
            options: ["Chọn từng ý, thẻ Animations chọn hiệu ứng (Start: On Click); thẻ Transitions chọn một hiệu ứng rồi Apply To All", "Chọn cả trang, thẻ Animations chọn 3 hiệu ứng khác nhau", "Thẻ Design chọn mẫu định dạng", "Thẻ Transitions chọn hiệu ứng khác nhau cho từng trang"],
            answer: 0, explanation: "Hiệu ứng cho đối tượng ở thẻ Animations (xuất hiện khi bấm chuột); hiệu ứng chuyển trang thống nhất ở thẻ Transitions (Apply To All).",
            level: "van-dung-cao", activity: "tong-ket" },
          { question: "Câu nào đúng về hiệu ứng động?", type: "multiple-choice",
            options: ["Càng nhiều hiệu ứng, bài càng thuyết phục", "Hiệu ứng thay thế được nội dung", "Nên dùng có chọn lọc để tăng hiệu quả và tạo ấn tượng với người xem", "Âm thanh nên có ở mọi hiệu ứng"],
            answer: 2, explanation: "Hiệu ứng động nên được sử dụng một cách có chọn lọc để giúp tăng tính hiệu quả cho nội dung và tạo ấn tượng với người xem.",
            level: "thong-hieu", activity: "tong-ket" },
        ],
      },
    },
  ],
};

if (typeof module !== "undefined" && module.exports) module.exports = LESSON;
if (typeof window !== "undefined") window.LESSON = LESSON;
