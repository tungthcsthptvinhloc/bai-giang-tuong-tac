/* ============================================================================
 * BÀI 7 — TÌM KIẾM THÔNG TIN TRÊN INTERNET  (Tin học 6 — Kết nối tri thức với cuộc sống)
 * Chủ đề 3: Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin. Bám sát SGK trang 28–31 + Kế hoạch bài dạy (2 tiết).
 * Chỉ sửa file này để đổi nội dung. Engine app.js không cần sửa.
 * ==========================================================================*/

// ---- Máy tìm kiếm MÔ PHỎNG (số liệu theo Hình 3.5 SGK) — thử có / không có dấu ngoặc kép ----
const SEARCH_SIM = (function () {
  const go = "var b=this.closest('.sim-search'),v=b.querySelector('.ss-in').value.trim(),o=b.querySelector('.ss-out'),"
    + "q=/^[&quot;“”].+[&quot;“”]$/.test(v),k=v.replace(/[&quot;“”]/g,'').toLowerCase();"
    + "b.querySelectorAll('.ss-tab').forEach(function(t,i){t.style.borderBottomColor=i?'transparent':'#0284c7'});"
    + "if(k.indexOf('ozon')<0&&k.indexOf('ôzôn')<0){o.innerHTML='💡 Hãy thử với từ khoá: <b>vai trò của tầng ozon</b> — gõ không có và có dấu ngoặc kép.';return;}"
    + "o.innerHTML=(q?'Khoảng <b style=&quot;font-size:1.4em;color:#16a34a&quot;>1.510</b> kết quả (0,37 giây) — <b>ÍT HƠN</b>: dấu ngoặc kép thu hẹp phạm vi tìm kiếm.'"
    + ":'Khoảng <b style=&quot;font-size:1.4em;color:#dc2626&quot;>52.900</b> kết quả (0,40 giây) — rất nhiều liên kết.')"
    + "+'<div style=&quot;margin-top:8px;padding:8px 10px;background:#fff;border-radius:10px;border:1px solid #e2e8f0&quot;>🔗 <u style=&quot;color:#1d4ed8&quot;>Vai trò của tầng ozon với đời sống</u><br><small>…tầng ozon hấp thụ các tia cực tím từ bức xạ Mặt Trời, bảo vệ sự sống trên Trái Đất…</small></div>';";
  const tab = (ico, name) => `<span class="ss-tab" style="padding:4px 10px;border-bottom:3px solid transparent;cursor:pointer" onclick="var b=this.closest('.sim-search');b.querySelectorAll('.ss-tab').forEach(function(t){t.style.borderBottomColor='transparent'});this.style.borderBottomColor='#0284c7';b.querySelector('.ss-out').innerHTML='Đang lọc kết quả dạng <b>${name}</b> — chỉ hiện các liên kết là ${name.toLowerCase()}.'">${ico} ${name}</span>`;
  return `<div class="sim-search" style="background:#f0f9ff;border:2px solid #7dd3fc;border-radius:18px;padding:14px 16px;font-size:1.15rem">
    <div style="font-weight:900;color:#0369a1;margin-bottom:8px">🔎 Máy tìm kiếm MÔ PHỎNG <small style="font-weight:600;color:#64748b">(số liệu theo Hình 3.5 SGK)</small></div>
    <div style="display:flex;gap:8px;flex-wrap:wrap"><input class="ss-in" value="vai trò của tầng ozon" style="flex:1;min-width:220px;font:inherit;padding:10px 16px;border:2px solid #cbd5e1;border-radius:999px" onkeydown="if(event.key==='Enter'){event.preventDefault();this.parentNode.querySelector('button').click()}event.stopPropagation()">
      <button type="button" class="btn" onclick="${go}">🔍 Tìm</button>
      <button type="button" class="btn ghost" onclick="var i=this.closest('.sim-search').querySelector('.ss-in'),v=i.value.replace(/[&quot;“”]/g,'').trim();i.value=(i.value.trim().charAt(0)==='&quot;')?v:'&quot;'+v+'&quot;'">“ ” Thêm/bỏ ngoặc kép</button></div>
    <div style="display:flex;gap:6px;margin:10px 0 6px;border-bottom:1px solid #e2e8f0;flex-wrap:wrap">${tab("🔍", "Tất cả")}${tab("🖼️", "Hình ảnh")}${tab("📰", "Tin tức")}${tab("▶️", "Video")}</div>
    <div class="ss-out" style="min-height:2.4em">Gõ từ khoá rồi bấm <b>🔍 Tìm</b> (hoặc Enter). Sau đó bấm “Thêm/bỏ ngoặc kép” và tìm lại để so sánh.</div></div>`;
})();

const LESSON = {
  meta: {
    subject: "Tin học", grade: "6", book: "Kết nối tri thức với cuộc sống",
    title: "Bài 7: Tìm kiếm thông tin trên Internet", unit: "Chủ đề 3 — Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin",
    pages: "28–31", durationMinutes: 90,
  },
  objectives: {
    knowledge: [
      "Nêu được công dụng của máy tìm kiếm.",
      "Xác định được từ khoá ứng với mục đích tìm kiếm cho trước.",
      "Thực hiện được việc tìm kiếm và khai thác thông tin trên Internet (sao chép văn bản, lưu hình ảnh).",
    ],
    competencies: [
      "Tự chủ, tự học; giao tiếp và hợp tác; giải quyết vấn đề và sáng tạo.",
      "Năng lực số 1.1.TC1a–d: nêu nhu cầu tìm kiếm; dùng máy tìm kiếm; điều hướng, chọn kết quả; xác định và điều chỉnh từ khoá.",
      "Năng lực AI 6.C2.2: biết AI hỗ trợ tìm kiếm, tổng hợp thông tin; luôn kiểm chứng, không cung cấp thông tin cá nhân.",
    ],
    qualities: ["Chăm chỉ, trung thực, trách nhiệm (dùng Internet an toàn, tôn trọng bản quyền), nhân ái."],
  },
  coreKnowledge: [
    "Máy tìm kiếm là một website đặc biệt giúp tìm thông tin trên Internet nhanh chóng, hiệu quả thông qua các từ khoá (VD: google.com, bing.com, coccoc.com, yahoo.com).",
    "Kết quả tìm kiếm là danh sách các liên kết; liên kết có thể là văn bản, hình ảnh hoặc video.",
    "Từ khoá là từ hoặc cụm từ liên quan đến nội dung cần tìm; chọn từ khoá phù hợp giúp tìm nhanh, chính xác. Đặt trong dấu ngoặc kép “ ” để thu hẹp phạm vi tìm kiếm.",
    "Sao chép văn bản: chọn nội dung → Ctrl + C → mở tệp văn bản → Ctrl + V. Lưu hình ảnh: nháy nút phải chuột → Lưu hình ảnh thành…",
    "Dùng Internet an toàn: tuân thủ pháp luật, hỏi ý kiến bố mẹ, thận trọng khi chia sẻ thông tin cá nhân.",
  ],
  keywords: ["Máy tìm kiếm", "Từ khoá", "Dấu ngoặc kép “ ”", "Liên kết"],
  settings: { basePoints: 100, useTimer: false, defaultTime: 60, sound: true, streakEnabled: true },

  activities: [
    /* ===================== HĐ1: MỞ ĐẦU (3 phút) ===================== */
    {
      id: "mo-dau", name: "Mở đầu — Khi cần biết điều gì đó, em tìm ở đâu? 🤔", type: "knowledge",
      goal: "Tạo hứng thú; HS nêu nhu cầu tìm kiếm thông tin trong học tập và đời sống.",
      time: 180,
      task: "Thảo luận nhóm đôi: Nếu em muốn biết cách chăm sóc cây trồng, hoặc tìm bài hát yêu thích mà chỉ nhớ vài câu, em sẽ làm thế nào?",
      sgkImage: "assets/sgk/sgk-trang28.jpg",
      content: {
        heading: "🤔 Khi cần biết điều gì đó, em tìm ở đâu?",
        prompt: "1. Khi cần biết điều gì đó, em thường tìm ở đâu?  2. Em đã tra cứu trên Internet chưa?  3. Internet giúp ta những gì trong học tập và cuộc sống?",
        revealLabel: "🔍 Thầy/cô tổng hợp",
        blocks: [
          { kind: "text", value: "Mặc dù WWW là kho thông tin khổng lồ, việc tìm kiếm trên đó có thể thực hiện rất nhanh chóng và thuận tiện. Chỉ cần nhớ vài câu trong một bài hát, em sẽ tìm thấy cả bài hát đó trên Internet với nhiều video trình diễn của các ca sĩ khác nhau." },
          { kind: "html", value: '<div style="background:#fff7ed;border-left:6px solid #f97316;border-radius:10px;padding:10px 16px;font-size:1.25rem">💡 Internet là nguồn thông tin phong phú. Biết cách tìm kiếm giúp chúng ta học nhanh, hiểu sâu hơn!</div>' },
        ],
      },
      questions: [
        { question: "Em chỉ nhớ vài câu trong một bài hát và muốn tìm cả bài hát. Cách nào nhanh nhất?", type: "multiple-choice",
          options: ["Đi hỏi lần lượt từng bạn trong lớp", "Gõ vài câu đó vào máy tìm kiếm trên Internet", "Chờ đến khi nghe lại trên ti vi", "Đến thư viện tìm từng cuốn sách"],
          answer: 1, explanation: "Máy tìm kiếm giúp tìm thông tin nhanh chóng: chỉ cần gõ vài câu nhớ được là tìm ra cả bài hát.",
          level: "thong-hieu", activity: "mo-dau" },
      ],
    },

    /* ===================== HĐ2.1: TÌM KIẾM THÔNG TIN TRÊN INTERNET (20 phút) ===================== */
    {
      id: "hd1-thao-luan", name: "Hoạt động 1: Em đã từng tìm kiếm trên Internet? 💬", type: "vandung",
      goal: "HS chia sẻ kinh nghiệm tìm kiếm; nhận ra thuận lợi, khó khăn khi dùng máy tìm kiếm.",
      time: 240,
      task: "Thảo luận nhóm, trả lời 2 câu hỏi của Hoạt động 1 (SGK tr.28) và gửi cho thầy/cô.",
      sgkImage: "assets/sgk/sgk-trang28.jpg",
      intro: "Nhóm gửi câu trả lời rồi bấm để xem hướng chốt.",
      cases: [
        { question: "Em đã bao giờ tìm kiếm thông tin trên Internet chưa? Em đã tìm gì? Kết quả có như em mong muốn không?",
          answer: "HS trả lời theo thực tế: đa phần đã từng tìm (trò chơi, bài hát, bộ phim yêu thích, tài liệu học tập…); phần lớn có kết quả như mong muốn." },
        { question: "Em biết gì về máy tìm kiếm? Sử dụng máy tìm kiếm để tìm thông tin em thấy có thuận lợi và khó khăn gì?",
          answer: "Máy tìm kiếm là công cụ hỗ trợ tìm thông tin trên Internet theo yêu cầu người dùng. Thuận lợi: tìm nhanh, được nhiều thông tin. Khó khăn: phải chọn từ khoá phù hợp; phải sàng lọc, tổng hợp, kiểm tra độ tin cậy và đầy đủ của thông tin." },
      ],
    },
    {
      id: "may-tim-kiem", name: "Máy tìm kiếm 🔎", type: "knowledge",
      goal: "Nêu được công dụng của máy tìm kiếm, kể tên một số máy tìm kiếm, biết kết quả tìm kiếm là danh sách liên kết.",
      time: 300,
      task: "Đọc SGK tr.28: kể tên một số máy tìm kiếm; nêu lưu ý khi tìm kiếm (giấy ghim vàng); cho biết kết quả khi dùng máy tìm kiếm là gì.",
      sgkImage: "assets/sgk/sgk-trang28.jpg",
      content: {
        heading: "🔎 Máy tìm kiếm",
        revealLabel: "🔍 Hiện kiến thức: máy tìm kiếm",
        blocks: [
          { kind: "html", value: '<div style="background:#f0f9ff;border-left:6px solid #0284c7;border-radius:10px;padding:10px 16px;font-size:1.25rem">Tìm kiếm thông tin là một trong các dịch vụ phổ biến của Internet. <b>Máy tìm kiếm</b> (search engine) là một <b>website đặc biệt</b> giúp người sử dụng tìm kiếm thông tin trên Internet nhanh chóng, hiệu quả thông qua các <b>từ khoá</b>.</div>' },
          { kind: "html", value: '<div style="display:flex;flex-wrap:wrap;gap:10px;margin:12px 0;font-size:1.2rem;font-weight:800">'
            + ["www.google.com", "www.bing.com", "www.coccoc.com", "www.yahoo.com"].map((u) => `<span style="background:#fff;border:2px solid #bae6fd;border-radius:999px;padding:6px 16px">🌐 ${u}</span>`).join("")
            + '</div><p style="font-size:1.15rem;margin:0">Nhìn chung, cách dùng các máy tìm kiếm tương tự như nhau. <b>Kết quả tìm kiếm là danh sách liên kết</b> trỏ đến các trang web có chứa từ khoá; liên kết có thể là văn bản, hình ảnh hoặc video.</p>' },
          { kind: "image", value: "assets/sgk/giay-ghim-luu-y.jpg", caption: "Lưu ý khi sử dụng Internet (SGK tr.28)" },
        ],
      },
      questions: [
        { question: "Những trang nào dưới đây là MÁY TÌM KIẾM? (chọn tất cả)", type: "multiple-select",
          options: ["www.google.com", "Microsoft Word", "www.bing.com", "www.coccoc.com"],
          answer: [0, 2, 3], explanation: "Google, Bing, Cốc Cốc (và Yahoo) là máy tìm kiếm. Microsoft Word là phần mềm soạn thảo văn bản.",
          level: "nhan-biet", activity: "may-tim-kiem" },
        { question: "Trên Internet chỉ có thông tin bổ ích, không có thông tin độc hại.", type: "true-false", answer: false,
          explanation: "Sai. Trên Internet có thông tin bổ ích và có cả thông tin độc hại — em cần hỏi ý kiến bố mẹ trước khi truy cập Internet.",
          level: "nhan-biet", activity: "may-tim-kiem" },
      ],
      remember: ["Máy tìm kiếm là website đặc biệt giúp tìm thông tin nhanh chóng, hiệu quả qua từ khoá.", "Kết quả tìm kiếm là danh sách các liên kết (văn bản, hình ảnh, video)."],
    },
    {
      id: "an-toan", name: "Trò chơi: Nên hay Không nên? 🚦", type: "dragdrop",
      goal: "Nhận biết cách dùng Internet an toàn khi tìm kiếm thông tin (giấy ghim SGK).",
      time: 180,
      task: "Xếp mỗi việc làm vào nhóm NÊN hoặc KHÔNG NÊN khi tìm kiếm thông tin trên Internet. Xếp hết rồi bấm Nộp bài.",
      sgkImage: "assets/sgk/giay-ghim-luu-y.jpg",
      groups: ["✅ NÊN", "⛔ KHÔNG NÊN"],
      items: [
        { text: "Hỏi ý kiến bố mẹ trước khi truy cập Internet", group: 0 },
        { text: "Đăng số điện thoại, địa chỉ nhà lên mạng cho người lạ", group: 1 },
        { text: "Tuân thủ các quy định của pháp luật khi dùng Internet", group: 0 },
        { text: "Tin ngay mọi thông tin đầu tiên tìm được", group: 1 },
        { text: "Chọn lọc thông tin chính xác, phù hợp để sử dụng", group: 0 },
        { text: "Nháy vào mọi liên kết lạ, quảng cáo hấp dẫn", group: 1 },
      ],
      explanation: "Internet như đường cao tốc: cần tuân thủ pháp luật, hỏi ý kiến bố mẹ, thận trọng chia sẻ thông tin cá nhân và chọn lọc thông tin.",
    },
    {
      id: "tu-khoa", name: "Từ khoá — chìa khoá tìm kiếm 🔑", type: "knowledge",
      goal: "Hiểu từ khoá là gì; thấy tác dụng của dấu ngoặc kép trong việc thu hẹp phạm vi tìm kiếm.",
      time: 300,
      task: "Dùng MÁY TÌM KIẾM MÔ PHỎNG: tìm “vai trò của tầng ozon” khi KHÔNG có và CÓ dấu ngoặc kép. So sánh số kết quả rồi trả lời câu hỏi.",
      sgkImage: "assets/sgk/sgk-trang29.jpg",
      content: {
        heading: "🔑 Từ khoá",
        prompt: "Tìm thông tin về vai trò của tầng ozon: nhập từ khoá có dấu ngoặc kép và không có dấu ngoặc kép — kết quả khác nhau thế nào?",
        revealLabel: "▶ Mở máy tìm kiếm mô phỏng + kiến thức",
        blocks: [
          { kind: "html", value: SEARCH_SIM },
          { kind: "image", value: "assets/sgk/hinh-3-5.jpg", caption: "Hình 3.5. Kết quả tìm kiếm khi không dùng và có dùng dấu ngoặc kép" },
          { kind: "list", value: [
            "Từ khoá là một từ hoặc cụm từ liên quan đến nội dung cần tìm kiếm do người sử dụng cung cấp.",
            "Chọn từ khoá phù hợp sẽ giúp việc tìm kiếm đạt hiệu quả.",
            "Đặt từ khoá trong dấu ngoặc kép (“ ”) để thu hẹp phạm vi tìm kiếm.",
            "Có thể dùng dấu cộng (+) hoặc trừ (–) để thêm hoặc bớt từ khoá (gia tăng hoặc thu hẹp phạm vi tìm kiếm).",
          ] },
        ],
      },
      questions: [
        { question: "Từ khoá là gì?", type: "multiple-choice",
          options: ["Mật khẩu để đăng nhập máy tìm kiếm", "Địa chỉ của một trang web", "Một từ hoặc cụm từ liên quan đến nội dung cần tìm, do người sử dụng cung cấp", "Tên của máy tìm kiếm"],
          answer: 2, explanation: "Từ khoá là từ hoặc cụm từ liên quan đến nội dung cần tìm kiếm do người sử dụng cung cấp.",
          level: "nhan-biet", activity: "tu-khoa" },
        { question: "Tìm với từ khoá vai trò của tầng ozon được khoảng 52.900 kết quả; với “vai trò của tầng ozon” (có ngoặc kép) được khoảng 1.510 kết quả. Em rút ra nhận xét gì?", type: "multiple-choice",
          options: ["Dấu ngoặc kép giúp thu hẹp phạm vi tìm kiếm, kết quả ít và sát hơn", "Dấu ngoặc kép làm tăng số kết quả", "Hai cách cho kết quả như nhau", "Không được dùng dấu ngoặc kép khi tìm kiếm"],
          answer: 0, explanation: "Đặt từ khoá trong dấu ngoặc kép giúp thu hẹp phạm vi tìm kiếm — số liên kết ít hơn, sát nội dung hơn.",
          sgkImage: "assets/sgk/hinh-3-5.jpg",
          level: "thong-hieu", activity: "tu-khoa" },
      ],
      remember: ["Từ khoá tìm kiếm rất quan trọng. Lựa chọn từ khoá phù hợp giúp tìm thông tin nhanh và chính xác.", "Dấu ngoặc kép “ ” thu hẹp phạm vi tìm kiếm."],
    },
    {
      id: "cong-cu-loc", name: "Ghép đôi: Kí hiệu, nút lọc — tác dụng 🧩", type: "matching",
      goal: "Nắm tác dụng của dấu ngoặc kép, dấu +/– và các nút lọc kết quả.",
      time: 180,
      task: "Ghép mỗi kí hiệu / nút lọc (bên trái) với tác dụng của nó (bên phải). Làm hết rồi bấm Nộp bài.",
      sgkImage: "assets/sgk/hinh-3-7.jpg",
      pairs: [
        { left: "Dấu ngoặc kép “ ”", right: "Thu hẹp phạm vi tìm kiếm" },
        { left: "Dấu cộng (+)", right: "Thêm từ khoá" },
        { left: "Dấu trừ (–)", right: "Bớt từ khoá" },
        { left: "🖼️ Hình ảnh", right: "Lọc kết quả dạng hình ảnh" },
        { left: "📰 Tin tức", right: "Lọc kết quả là tin tức" },
        { left: "▶️ Video", right: "Lọc kết quả dạng video" },
      ],
      explanation: "Dấu ngoặc kép, dấu +/– giúp điều chỉnh phạm vi tìm kiếm; các nút Hình ảnh, Tin tức, Video lọc kết quả theo từng loại (Hình 3.7).",
    },

    /* ===================== HĐ2.2: THỰC HÀNH (22 phút) ===================== */
    {
      id: "cac-buoc-tim-kiem", name: "Các bước tìm kiếm thông tin 🪜", type: "ordering",
      goal: "Nắm các bước tìm kiếm thông tin bằng máy tìm kiếm.",
      time: 150,
      task: "Nhóm thảo luận: để tìm kiếm thông tin bằng máy tìm kiếm em làm những bước nào? Sắp xếp đúng thứ tự rồi bấm Nộp bài.",
      steps: [
        "Khởi động trình duyệt web",
        "Truy cập máy tìm kiếm (VD: nhập www.google.com rồi nhấn Enter)",
        "Gõ từ khoá vào ô dành để nhập từ khoá",
        "Nhấn Enter hoặc nháy nút tìm kiếm",
        "Nháy vào Hình ảnh, Tin tức, Video để lọc kết quả theo từng loại",
      ],
      explanation: "Trình duyệt → máy tìm kiếm → gõ từ khoá → Enter → lọc kết quả.",
    },
    {
      id: "thuc-hanh", name: "Thực hành: Tìm thông tin về vai trò của tầng ozon 🌍", type: "knowledge",
      goal: "Thực hành tìm kiếm, so sánh kết quả, lọc kết quả, chọn thông tin chính xác.",
      time: 600,
      task: "Trên máy tính: tìm thông tin và hình minh hoạ về vai trò của tầng ozon, lần lượt với từ khoá vai trò của tầng ozon và “vai trò của tầng ozon”. So sánh hai kết quả; thử lọc Hình ảnh, Tin tức, Video.",
      sgkImage: "assets/sgk/sgk-trang30.jpg",
      links: [{ label: "Mở máy tìm kiếm www.google.com", url: "https://www.google.com", note: "(tab mới — cần Internet)" }],
      content: {
        heading: "🌍 Tìm thông tin về vai trò của tầng ozon",
        image: "assets/sgk/hinh-3-6.jpg", imageCaption: "Hình 3.6. Tìm kiếm với từ khoá vai trò của tầng ozon",
        revealLabel: "🔍 Lọc kết quả & lưu ý khi chọn thông tin",
        blocks: [
          { kind: "image", value: "assets/sgk/hinh-3-7.jpg", caption: "Hình 3.7. Lọc kết quả tìm kiếm" },
          { kind: "list", value: [
            "Các trang web có nội dung liên quan nhất đến từ khoá thường xuất hiện ở đầu danh sách kết quả.",
            "Em cần chọn lọc những thông tin chính xác, phù hợp để sử dụng.",
            "Đọc kĩ tiêu đề, mô tả và địa chỉ trang web để chọn nguồn tin đáng tin cậy.",
          ] },
        ],
      },
      questions: [
        { question: "Các trang web có nội dung liên quan NHẤT đến từ khoá thường xuất hiện ở đâu?", type: "multiple-choice",
          options: ["Ở cuối danh sách kết quả", "Ở đầu danh sách kết quả", "Ở trang kết quả thứ 10", "Ngẫu nhiên, không theo thứ tự"],
          answer: 1, explanation: "Máy tìm kiếm thường xếp các trang liên quan nhất ở đầu danh sách.",
          level: "nhan-biet", activity: "thuc-hanh" },
        { question: "Muốn chỉ xem các HÌNH ẢNH về tầng ozon trong kết quả tìm kiếm, em nháy vào đâu?", type: "multiple-choice",
          options: ["Tin tức", "Video", "Cài đặt", "Hình ảnh"],
          answer: 3, explanation: "Nháy vào Hình ảnh để lọc kết quả dạng hình ảnh (Hình 3.7).",
          level: "thong-hieu", activity: "thuc-hanh" },
      ],
    },
    {
      id: "luu-thong-tin", name: "Sao chép văn bản & lưu hình ảnh 💾", type: "knowledge",
      goal: "Biết sao chép thông tin dạng văn bản và lưu hình ảnh từ trang web về máy tính.",
      time: 300,
      task: "Mở một liên kết tin tức về tầng ozon: sao chép một đoạn văn vào tệp văn bản; mở một hình ảnh và lưu về máy tính.",
      sgkImage: "assets/sgk/sgk-trang31.jpg",
      content: {
        heading: "💾 Khai thác thông tin: sao chép & lưu",
        image: "assets/sgk/hinh-3-8.jpg", imageCaption: "Hình 3.8. Bảng chọn tắt khi nháy nút phải chuột vào hình ảnh",
        revealLabel: "🔍 Hiện các bước",
        blocks: [
          { kind: "html", value: '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:12px;font-size:1.15rem">'
            + '<div style="background:#eff6ff;border:2px solid #93c5fd;border-radius:14px;padding:12px"><b>📝 Sao chép văn bản</b><ol style="margin:6px 0 0;padding-left:20px"><li>Chọn nội dung cần sao chép, nhấn <b>Ctrl + C</b>.</li><li>Mở tệp văn bản, nhấn <b>Ctrl + V</b>.</li></ol></div>'
            + '<div style="background:#fff7ed;border:2px solid #fdba74;border-radius:14px;padding:12px"><b>🖼️ Lưu hình ảnh</b><ol style="margin:6px 0 0;padding-left:20px"><li>Nháy nút phải chuột vào hình ảnh.</li><li>Chọn lệnh <b>Lưu hình ảnh thành…</b></li><li>Chọn ổ đĩa, thư mục; gõ tên tệp ở ô File name.</li><li>Nhấn Enter hoặc chọn Save.</li></ol></div></div>' },
        ],
      },
      questions: [
        { question: "Sau khi chọn đoạn văn trên trang web, em nhấn tổ hợp phím nào để SAO CHÉP?", type: "multiple-choice",
          options: ["Ctrl + V", "Ctrl + C", "Ctrl + S", "Ctrl + Z"],
          answer: 1, explanation: "Ctrl + C để sao chép; mở tệp văn bản rồi Ctrl + V để dán.",
          level: "nhan-biet", activity: "luu-thong-tin" },
        { question: "Nháy nút phải chuột vào hình ảnh trên trang web, em chọn lệnh nào để lưu hình ảnh thành tệp trên máy tính?", type: "multiple-choice",
          options: ["Mở hình ảnh trong thẻ mới", "Sao chép địa chỉ hình ảnh", "Lưu hình ảnh thành…", "Kiểm tra"],
          answer: 2, explanation: "Lệnh “Lưu hình ảnh thành…” lưu hình ảnh thành tệp trên máy tính (Hình 3.8).",
          sgkImage: "assets/sgk/hinh-3-8.jpg",
          level: "thong-hieu", activity: "luu-thong-tin" },
      ],
      remember: ["Văn bản: chọn → Ctrl + C → mở tệp văn bản → Ctrl + V.", "Hình ảnh: nháy nút phải chuột → Lưu hình ảnh thành…"],
    },

    /* ===================== HĐ3: LUYỆN TẬP (10 phút) ===================== */
    {
      id: "dien-khuyet", name: "Luyện tập 1: Điền cụm từ thích hợp ✍️", type: "fillblank",
      goal: "Củng cố công dụng máy tìm kiếm, kết quả tìm kiếm, vai trò từ khoá (câu hỏi SGK tr.29).",
      time: 150,
      task: "Thay các số bằng một trong các cụm từ: từ khoá · liên kết · tìm kiếm thông tin. Điền xong bấm Nộp bài.",
      sgkImage: "assets/sgk/sgk-trang29.jpg",
      text: "a) Máy tìm kiếm là công cụ hỗ trợ {{}} trên Internet theo yêu cầu của người sử dụng. b) Kết quả tìm kiếm là danh sách các {{}}. c) Cần chọn {{}} phù hợp.",
      answers: [["tìm kiếm thông tin"], ["liên kết"], ["từ khoá", "từ khóa"]],
      explanation: "(1) tìm kiếm thông tin · (2) liên kết · (3) từ khoá.",
    },
    {
      id: "luyen-tap", name: "Luyện tập 2 — Che chắn cho mầm xanh 🌱", type: "penguin",
      pet: "🌱", homeIcon: "🌳", enemy: "☀️", saveWord: "mầm cây được tầng ozon che chở",
      winText: "Cả vườn cây lớn khoẻ dưới lớp “áo giáp” ozon — xuất sắc!",
      intro: "Tầng ozon ngăn tia cực tím từ Mặt Trời. Mỗi câu trả lời đúng giúp một mầm cây lớn lên an toàn!",
      goal: "Củng cố kiến thức về máy tìm kiếm, kết quả tìm kiếm, từ khoá.",
      time: 240,
      task: "Trả lời lần lượt các câu hỏi. Mỗi câu đúng, một mầm cây lớn thành cây xanh!",
      questions: [
        { question: "Sử dụng máy tìm kiếm em sẽ nhận được kết quả là gì?", type: "multiple-choice",
          options: ["Danh sách liên kết trỏ đến các trang web có chứa từ khoá", "Nội dung thông tin cần tìm trên một trang web", "Danh sách địa chỉ các trang web có chứa thông tin cần tìm", "Danh sách liên kết dạng văn bản"],
          answer: 0, explanation: "Kết quả là danh sách liên kết trỏ đến các trang web có chứa từ khoá.", level: "thong-hieu", activity: "luyen-tap" },
        { question: "Khi tìm kiếm thông tin bằng máy tìm kiếm, kết quả là danh sách liên kết dưới dạng nào?", type: "multiple-choice",
          options: ["Văn bản", "Hình ảnh", "Video", "Văn bản, hình ảnh, video"],
          answer: 3, explanation: "Liên kết có thể là văn bản, hình ảnh hoặc video.", level: "nhan-biet", activity: "luyen-tap" },
        { question: "Để tìm kiếm thông tin về lớp vỏ Trái Đất, em sử dụng từ khoá nào để THU HẸP phạm vi tìm kiếm?", type: "multiple-choice",
          options: ["Trái Đất", "Lớp vỏ Trái Đất", "“lớp vỏ Trái Đất”", "“lớp vỏ” + “Trái Đất”"],
          answer: 2, explanation: "Đặt cả cụm từ trong dấu ngoặc kép giúp tìm đúng cụm “lớp vỏ Trái Đất” — thu hẹp phạm vi nhất.", level: "van-dung", activity: "luyen-tap" },
        { question: "Máy tìm kiếm là:", type: "multiple-choice",
          options: ["Một phần mềm soạn thảo văn bản", "Một thiết bị phần cứng của máy tính", "Một trình duyệt web", "Một website đặc biệt giúp tìm kiếm thông tin qua từ khoá"],
          answer: 3, explanation: "Máy tìm kiếm là một website đặc biệt, giúp tìm thông tin trên Internet nhanh chóng, hiệu quả qua từ khoá.", level: "nhan-biet", activity: "luyen-tap" },
        { question: "Em muốn tìm cách làm bánh chưng nhưng KHÔNG muốn kết quả có từ “bánh tét”. Cách nào phù hợp?", type: "multiple-choice",
          options: ["Dùng dấu trừ (–) để bớt từ khoá “bánh tét”", "Dùng dấu cộng (+) thêm “bánh tét”", "Chỉ gõ “bánh”", "Tắt máy tính rồi mở lại"],
          answer: 0, explanation: "Dấu trừ (–) dùng để bớt từ khoá, thu hẹp phạm vi tìm kiếm (giấy ghim SGK tr.29).", level: "van-dung-cao", activity: "luyen-tap" },
      ],
    },

    /* ===================== HĐ4: VẬN DỤNG (4 phút + ở nhà) ===================== */
    {
      id: "van-dung", name: "Vận dụng 🏯🌊", type: "vandung",
      goal: "Vận dụng kĩ năng tìm kiếm để khai thác thông tin phục vụ thực tế.",
      time: 300,
      task: "Câu 1 thực hành trên lớp theo nhóm máy; Câu 2 làm ở nhà, giới thiệu với gia đình hoặc báo cáo đầu tiết sau.",
      sgkImage: "assets/sgk/sgk-trang31.jpg",
      links: [{ label: "Mở máy tìm kiếm www.google.com", url: "https://www.google.com" }],
      intro: "Ghi lại từ khoá nhóm em dùng và thông tin tìm được, gửi cho thầy/cô.",
      cases: [
        { question: "Câu 1: Em hãy tìm thông tin về Văn Miếu – Quốc Tử Giám trên mạng Internet. (Ghi từ khoá đã dùng và 2–3 thông tin chính.)",
          answer: "Từ khoá gợi ý: “Văn Miếu – Quốc Tử Giám”. Thông tin chính: vị trí (Hà Nội), giá trị lịch sử – văn hoá, đặc điểm nổi bật. Ưu tiên nguồn tin đáng tin cậy, ghi lại đường dẫn trang web đã tham khảo. [CẦN GIÁO VIÊN KIỂM TRA nội dung HS tìm được]" },
        { question: "Câu 2a: Tìm thông tin về thời tiết ở Hạ Long trong tuần này. Em dùng từ khoá nào?",
          answer: "Từ khoá gợi ý: thời tiết Hạ Long tuần này (hoặc “thời tiết Hạ Long”). Chọn trang dự báo thời tiết đáng tin cậy." },
        { question: "Câu 2b: Tìm những điểm tham quan đẹp ở Hạ Long. Kể tên vài điểm em tìm được.",
          answer: "Từ khoá gợi ý: điểm tham quan đẹp ở Hạ Long. HS liệt kê các địa danh tìm được (VD: vịnh Hạ Long…) và ghi nguồn. [CẦN GIÁO VIÊN KIỂM TRA]" },
        { question: "Câu 2c: Sao chép và lưu các thông tin, hình ảnh vào một tệp văn bản để giới thiệu với các thành viên trong gia đình. Em làm những bước nào?",
          answer: "Văn bản: chọn nội dung → Ctrl + C → mở tệp văn bản → Ctrl + V. Hình ảnh: nháy nút phải chuột → Lưu hình ảnh thành… (hoặc Sao chép hình ảnh rồi dán vào tệp). Lưu tệp và ghi nguồn thông tin." },
      ],
    },

    /* ===================== TỔNG KẾT ===================== */
    {
      id: "tong-ket", name: "Tổng kết", type: "summary",
      task: "Cả lớp nhắc lại kiến thức cần nhớ và làm thử thách cuối.",
      content: {
        learned: [
          "Máy tìm kiếm là website đặc biệt giúp tìm thông tin nhanh chóng, hiệu quả qua từ khoá.",
          "Kết quả tìm kiếm là danh sách các liên kết (văn bản, hình ảnh, video).",
          "Từ khoá rất quan trọng; dấu ngoặc kép “ ” thu hẹp phạm vi tìm kiếm; dấu +/– thêm, bớt từ khoá.",
          "Sao chép văn bản bằng Ctrl + C, Ctrl + V; lưu hình ảnh bằng nút phải chuột → Lưu hình ảnh thành…",
          "Dùng Internet an toàn, chọn lọc thông tin chính xác.",
        ],
        challenge: [
          { question: "Bạn Lan tìm “cách trồng hoa hồng” nhưng nhận quá nhiều kết quả không liên quan. Lan nên làm gì?", type: "multiple-choice",
            options: ["Bỏ cuộc vì Internet không có thông tin", "Chỉ gõ từ “hoa”", "Chọn lại từ khoá cụ thể hơn, đặt trong dấu ngoặc kép", "Nháy vào quảng cáo đầu tiên"],
            answer: 2, explanation: "Điều chỉnh từ khoá cụ thể hơn và dùng dấu ngoặc kép để thu hẹp phạm vi tìm kiếm.",
            level: "van-dung", activity: "tong-ket" },
          { question: "Một trang web lạ yêu cầu em nhập họ tên, địa chỉ nhà để “nhận quà”. Em nên làm gì?", type: "multiple-choice",
            options: ["Nhập ngay để nhận quà", "Không nhập, đóng trang và hỏi ý kiến bố mẹ", "Nhập thông tin của bạn cùng lớp", "Chia sẻ trang đó cho cả lớp"],
            answer: 1, explanation: "Thận trọng khi chia sẻ thông tin cá nhân trên Internet; hỏi ý kiến bố mẹ.",
            level: "van-dung", activity: "tong-ket" },
        ],
      },
    },
  ],
};

if (typeof module !== "undefined" && module.exports) module.exports = LESSON;
if (typeof window !== "undefined") window.LESSON = LESSON;
