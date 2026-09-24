/* ============================================================================
 * BÀI 3 — THỰC HÀNH: ĐÁNH GIÁ CHẤT LƯỢNG THÔNG TIN  (Tin học 9 — KNTT)
 * Chủ đề 2: Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin.
 * Bám sát SGK trang 12–14 + Kế hoạch bài dạy (2 tiết) của giáo viên.
 * Chỉ sửa file này để đổi nội dung. Engine app.js không cần sửa.
 * ==========================================================================*/

/* Sơ đồ quy trình tìm kiếm & đánh giá thông tin (SVG) */
function processSVG() {
  const steps = ["🎯 Xác định\nmục đích & yêu cầu", "🔎 Tìm kiếm\n(từ khoá, nguồn)", "🧪 Đánh giá\nchất lượng", "✅ Quyết định\n(chọn & xếp ưu tiên)"];
  const C = ["#16a34a", "#0ea5e9", "#f59e0b", "#a855f7"];
  const w = 250, gap = 26, h = 92, totalW = steps.length * w + (steps.length - 1) * gap;
  let g = "";
  steps.forEach((s, i) => {
    const x = i * (w + gap);
    const lines = s.split("\n");
    g += `<g><rect x="${x}" y="18" width="${w}" height="${h}" rx="16" fill="${C[i]}"/>` +
      lines.map((ln, k) => `<text x="${x + w / 2}" y="${52 + k * 26}" text-anchor="middle" font-size="20" font-weight="700" fill="#fff">${ln}</text>`).join("") + `</g>`;
    if (i < steps.length - 1) { const ax = x + w; g += `<path d="M${ax} 64 h${gap}" stroke="#94a3b8" stroke-width="4"/><path d="M${ax + gap - 8} 58 l8 6 l-8 6" fill="#94a3b8"/>`; }
  });
  return `<svg viewBox="0 0 ${totalW} 128" width="100%" style="max-height:26vh" xmlns="http://www.w3.org/2000/svg" role="img">${g}</svg>`;
}

const LESSON = {
  meta: {
    subject: "Tin học", grade: "9", book: "Kết nối tri thức với cuộc sống",
    title: "Bài 3: Thực hành — Đánh giá chất lượng thông tin", unit: "Chủ đề 2 — Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin",
    pages: "12–14", durationMinutes: 90,
  },
  objectives: {
    knowledge: [
      "Tìm kiếm được thông tin để giải quyết vấn đề (xác định mục đích, yêu cầu, từ khoá, nguồn).",
      "Đánh giá được chất lượng thông tin trong giải quyết vấn đề.",
    ],
    competencies: [
      "Tự chủ – tự học; giao tiếp – hợp tác; giải quyết vấn đề.",
      "Năng lực số: xác định nhu cầu tin (1.1.TC2a); phân tích–đánh giá nguồn (1.2.TC2a); kiểm chứng độ tin cậy (1.2.TC2b).",
    ],
    qualities: ["Chăm chỉ, trung thực, trách nhiệm; dùng thông tin có trách nhiệm, không lan truyền tin chưa kiểm chứng"],
  },
  coreKnowledge: [
    "Tìm kiếm hiệu quả bắt đầu từ việc xác định rõ MỤC ĐÍCH và các YÊU CẦU cụ thể.",
    "Chọn TỪ KHOÁ phù hợp; có thể dùng công cụ hội thoại thông minh (AI) để khoanh vùng; lưu tóm tắt kèm địa chỉ web.",
    "Xét THẨM QUYỀN/độ tin cậy của nguồn (VD tuyển sinh → Sở GD&ĐT dạng edu.vn; ngoại khoá → web trường); đối chiếu, kiểm chứng.",
    "Đánh giá chất lượng thông tin: tính mới, tính chính xác, tính đầy đủ, tính sử dụng được.",
    "Ra quyết định: lựa chọn & sắp xếp theo thứ tự ưu tiên, phù hợp năng lực – sở thích và tính khả thi.",
  ],
  keywords: ["Mục đích – yêu cầu", "Từ khoá & nguồn tin cậy", "4 tiêu chí đánh giá", "Ưu tiên & quyết định"],
  settings: { basePoints: 100, useTimer: false, defaultTime: 60, sound: false, streakEnabled: true },

  activities: [
    /* ===================== HĐ1: MỞ ĐẦU ===================== */
    {
      id: "khoi-dong", name: "Khởi động — Chọn trường THPT", type: "intro",
      goal: "Đặt HS vào tình huống thực tiễn: tìm & đánh giá thông tin để chọn trường sau THCS.",
      time: 240,
      task: "Chia 2 nhóm: mỗi nhóm nêu 1 hướng giải quyết 'làm sao tìm & đánh giá thông tin để chọn trường THPT', nhóm kia phản biện điểm hạn chế.",
      sgkImage: "assets/sgk/sgk-trang12.jpg",
      content: {
        heading: "🎓 Sắp hết cấp THCS — chọn trường nào?",
        prompt: "Em cần tìm thông tin để chọn môi trường học tập và hướng nghề nghiệp phù hợp năng lực, nguyện vọng. Làm thế nào để TÌM đúng và ĐÁNH GIÁ được chất lượng thông tin tìm được?",
        blocks: [
          { kind: "svg", value: processSVG() },
          { kind: "text", value: "👉 Cả bài hôm nay đi theo 4 bước trên: xác định mục đích → tìm kiếm → đánh giá → quyết định." },
        ],
        revealLabel: "🔍 Gợi ý hướng đi",
      },
      questions: [
        {
          question: "Bước ĐẦU TIÊN nên làm khi cần tìm thông tin để giải quyết một vấn đề là gì?",
          type: "multiple-choice",
          options: ["Xác định rõ mục đích và yêu cầu tìm kiếm", "Mở mạng xã hội xem bạn bè nói gì", "Gõ đại một từ khoá rồi đọc kết quả đầu tiên", "Hỏi một người bất kì"],
          answer: 0, explanation: "Chính xác! Xác định rõ mục đích & yêu cầu giúp tìm đúng thứ cần và không lạc hướng.",
          level: "thong-hieu", activity: "khoi-dong",
        },
      ],
    },

    /* ===================== NHIỆM VỤ 1: TÌM KIẾM ===================== */
    {
      id: "muc-dich-yeu-cau", name: "NV1a — Mục đích & yêu cầu tìm kiếm", type: "knowledge",
      goal: "Xác định mục đích và các yêu cầu tìm kiếm cụ thể.",
      time: 300,
      task: "Đọc Nhiệm vụ 1 (SGK tr.12). Nhóm liệt kê: mục đích tìm kiếm là gì? Cần tìm những thông tin cụ thể nào về mỗi trường THPT?",
      sgkImage: "assets/sgk/sgk-trang12.jpg",
      content: {
        heading: "🎯 Xác định mục đích & yêu cầu",
        revealLabel: "🔍 Hiện mục đích & 5 yêu cầu",
        blocks: [
          { kind: "html", value: '<div style="background:#f0fdf4;border:2px solid #16a34a;border-radius:14px;padding:12px 16px;font-size:18px"><b>🎯 Mục đích:</b> Tìm thông tin về các trường THPT ở địa phương để quyết định lựa chọn nguyện vọng đăng kí.</div>' },
          { kind: "list", value: [
            "Điểm chuẩn và chỉ tiêu tuyển sinh của trường trong 3 năm gần nhất.",
            "Tỉ lệ học sinh tốt nghiệp THPT và trúng tuyển vào các trường đại học uy tín.",
            "Những nhóm môn học mà trường có thế mạnh.",
            "Các hoạt động ngoại khoá của trường.",
            "Khoảng cách từ nhà đến trường.",
          ] },
        ],
      },
      remember: ["Xác định MỤC ĐÍCH và YÊU CẦU càng cụ thể, việc tìm kiếm càng đúng và nhanh."],
    },

    {
      id: "tu-khoa", name: "NV1b — Từ khoá & công cụ tìm kiếm", type: "knowledge",
      goal: "Biết dùng từ khoá, công cụ hội thoại thông minh (AI) và lưu tóm tắt kết quả.",
      time: 300,
      task: "Đọc phần b (SGK tr.12–13). Trả lời: chọn từ khoá thế nào? Vì sao nên lưu lại địa chỉ trang web của thông tin?",
      sgkImage: "assets/sgk/sgk-trang13.jpg",
      content: {
        heading: "🔎 Tìm kiếm bằng từ khoá",
        revealLabel: "🔍 Hiện cách tìm kiếm",
        blocks: [
          { kind: "list", value: [
            "Dùng máy tìm kiếm với TỪ KHOÁ bám sát yêu cầu. VD: \"Olympic Tin học 2023 tỉnh Phú Thọ\" để tìm thế mạnh của trường (Hình 3.1).",
            "Có thể dùng công cụ hội thoại thông minh (AI) để khoanh vùng. VD: \"Hãy cho biết tên các trường THPT gần Vĩnh Tường, Phú Thọ\" (Hình 3.2).",
            "LƯU tóm tắt: nội dung tóm tắt + địa chỉ trang web, để dùng lại khi đánh giá ở bước sau.",
          ] },
          { kind: "ext", value: "Mẹo từ khoá: đặt cụm chính xác trong dấu ngoặc kép \" \", dùng dấu trừ (−) để loại bớt kết quả không liên quan." },
        ],
      },
      questions: [
        {
          question: "Vì sao khi tìm được thông tin, em nên LƯU lại cả địa chỉ trang web (URL)?",
          type: "multiple-choice",
          options: ["Để khoe với bạn", "Để đối chiếu, kiểm chứng và trích dẫn nguồn khi đánh giá", "Để trang web chạy nhanh hơn", "Không cần thiết, nhớ trong đầu là đủ"],
          answer: 1, explanation: "Đúng! Lưu URL giúp quay lại kiểm chứng nguồn, đối chiếu và trích dẫn khi ra quyết định.",
          level: "thong-hieu", activity: "tu-khoa",
        },
      ],
    },

    {
      id: "nguon-tin-cay", name: "Nguồn đáng tin cậy", type: "knowledge",
      goal: "Chọn nguồn theo thẩm quyền; nhận biết tên miền edu.vn của cơ quan giáo dục.",
      time: 240,
      task: "Đọc phần lưu ý về độ tin cậy (SGK tr.13). Sau đó ghép loại thông tin với nguồn phù hợp ở màn sau.",
      sgkImage: "assets/sgk/sgk-trang13.jpg",
      content: {
        heading: "🏛️ Nguồn nào đáng tin?",
        revealLabel: "🔍 Hiện lưu ý về nguồn",
        blocks: [
          { kind: "text", value: "Độ tin cậy của thông tin trên Internet rất khác nhau. Với mỗi yêu cầu, cần xét THẨM QUYỀN của nguồn." },
          { kind: "html", value:
            '<ul style="font-size:18px;line-height:1.7">' +
            '<li>Thông tin <b>tuyển sinh vào lớp 10</b> → website <b>Sở GD&ĐT</b> (thường có dạng <span style="font-family:Consolas,monospace;color:#16a34a;font-weight:700">edu.vn</span>, VD <span style="font-family:Consolas,monospace;color:#16a34a;font-weight:700">phutho.edu.vn</span>).</li>' +
            '<li>Thông tin <b>hoạt động giáo dục, ngoại khoá</b> → website của <b>nhà trường</b>.</li>' +
            '<li>Không phải mọi thông tin đều có trên các trang này → cần <b>đối chiếu, kiểm chứng</b> trước khi dùng.</li>' +
            '</ul>' },
        ],
      },
      remember: ["Chọn nguồn theo THẨM QUYỀN; cơ quan giáo dục thường có tên miền edu.vn; luôn đối chiếu nhiều nguồn."],
    },
    {
      id: "ghep-nguon", name: "Trò chơi: Thông tin ↔ Nguồn nên tra", type: "matching",
      goal: "Củng cố việc chọn nguồn theo thẩm quyền.",
      time: 180,
      task: "Nối mỗi loại thông tin cần tìm với nguồn phù hợp nhất để tra cứu.",
      pairs: [
        { left: "Điểm chuẩn, chỉ tiêu tuyển sinh lớp 10", right: "Website Sở GD&ĐT (edu.vn)" },
        { left: "Lịch hoạt động ngoại khoá của trường", right: "Website chính thức của trường" },
        { left: "Thành tích Olympic của học sinh tỉnh", right: "Báo/cổng thông tin giáo dục chính thống" },
        { left: "Cảm nhận thực tế về trường", right: "Nhiều nguồn khác nhau để đối chiếu" },
      ],
      explanation: "Mỗi loại thông tin có nguồn 'thẩm quyền' riêng; với đánh giá chủ quan thì phải đối chiếu nhiều nguồn.",
    },

    /* ===================== NHIỆM VỤ 2: ĐÁNH GIÁ ===================== */
    {
      id: "danh-gia-chat-luong", name: "NV2a — 4 tiêu chí đánh giá", type: "knowledge",
      goal: "Nắm 4 tiêu chí đánh giá chất lượng thông tin.",
      time: 300,
      task: "Đọc Nhiệm vụ 2 (SGK tr.14). Nhóm nêu: để đánh giá thông tin cần đảm bảo những 'tính' gì? Mỗi tính kiểm tra bằng cách nào?",
      sgkImage: "assets/sgk/sgk-trang14.jpg",
      content: {
        heading: "🧪 Bốn tiêu chí đánh giá chất lượng thông tin",
        revealLabel: "🔍 Hiện 4 tiêu chí",
        blocks: [
          { kind: "html", value:
            '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">' +
            [['🆕 Tính mới','Thông tin được cập nhật gần nhất — kiểm tra ngày đăng bài, tránh lỗi thời.','#0ea5e9'],
             ['🎯 Tính chính xác','Đối chiếu từ nhiều nguồn khác nhau; đánh giá tiêu cực cần được kiểm chứng.','#16a34a'],
             ['📚 Tính đầy đủ','Có bức tranh tổng thể; thiếu điểm chuẩn, học phí, khoảng cách… là chưa đủ để quyết định.','#f59e0b'],
             ['✅ Tính sử dụng được','Phù hợp yêu cầu chọn trường; không bị tiêu đề "giật gân" đánh lạc hướng.','#a855f7']]
              .map(c=>`<div style="background:#fff;border:2px solid ${c[2]};border-radius:14px;padding:12px"><div style="font-weight:800;color:${c[2]};font-size:18px">${c[0]}</div><div style="font-size:15px;color:#334155">${c[1]}</div></div>`).join("") +
            '</div>' },
          { kind: "ext", value: "Cộng thêm: xét ĐỘ TIN CẬY của nguồn (nguồn có thẩm quyền không?) — đã học ở Nhiệm vụ 1." },
        ],
      },
      remember: [
        "4 tiêu chí: tính MỚI · tính CHÍNH XÁC · tính ĐẦY ĐỦ · tính SỬ DỤNG ĐƯỢC.",
        "Kèm theo: luôn xét độ tin cậy của nguồn.",
      ],
    },
    {
      id: "ghep-tieu-chi", name: "Trò chơi: Ghép tiêu chí đánh giá", type: "matching",
      goal: "Củng cố 4 tiêu chí qua cách kiểm tra tương ứng.",
      time: 180,
      task: "Nối mỗi tiêu chí với cách kiểm tra đúng của nó.",
      pairs: [
        { left: "Tính mới", right: "Xem ngày đăng / cập nhật gần nhất" },
        { left: "Tính chính xác", right: "Đối chiếu nhiều nguồn khác nhau" },
        { left: "Tính đầy đủ", right: "Đủ mọi khía cạnh yêu cầu (điểm chuẩn, học phí…)" },
        { left: "Tính sử dụng được", right: "Phù hợp mục đích, không bị tiêu đề giật gân đánh lạc hướng" },
      ],
      explanation: "Mỗi tiêu chí có cách kiểm tra riêng; kết hợp đủ 4 mới đánh giá đúng chất lượng thông tin.",
    },
    {
      id: "tinh-huong", name: "Vận dụng nhanh — Bắt lỗi thông tin", type: "vandung",
      goal: "Áp dụng tiêu chí để nhận ra thông tin kém chất lượng.",
      time: 300,
      task: "Nhóm đọc từng tình huống, chỉ ra thông tin vi phạm tiêu chí nào, rồi bấm xem gợi ý.",
      intro: "Mỗi tình huống dưới đây có một 'điểm yếu' về chất lượng thông tin — em phát hiện được không?",
      cases: [
        {
          question: "Một bài blog năm 2018 ghi điểm chuẩn lớp 10 của trường A là 32 điểm. Em định dùng con số này cho kì tuyển sinh năm nay.",
          answer: "Vi phạm TÍNH MỚI: thông tin đã cũ (2018), điểm chuẩn thay đổi theo năm. Cần tra điểm chuẩn 3 năm gần nhất trên nguồn chính thức (Sở GD&ĐT).",
        },
        {
          question: "Một bình luận trên mạng xã hội chê trường B 'dạy kém' và em định loại trường B khỏi danh sách.",
          answer: "Vi phạm TÍNH CHÍNH XÁC/độ tin cậy: một bình luận cá nhân chưa kiểm chứng. Cần đối chiếu nhiều nguồn (tỉ lệ tốt nghiệp, đỗ ĐH, website trường) trước khi kết luận.",
        },
        {
          question: "Em chỉ tìm được điểm chuẩn của trường C, còn khoảng cách, nhóm môn thế mạnh thì chưa có, nhưng đã vội xếp C là nguyện vọng 1.",
          answer: "Vi phạm TÍNH ĐẦY ĐỦ: thiếu nhiều khía cạnh (khoảng cách, thế mạnh môn học). Cần thu thập đủ thông tin theo các yêu cầu đã đặt rồi mới quyết định.",
        },
      ],
    },

    {
      id: "quyet-dinh", name: "NV2b — Lựa chọn & xếp thứ tự ưu tiên", type: "knowledge",
      goal: "Biết lựa chọn và sắp xếp danh sách trường theo thứ tự ưu tiên.",
      time: 240,
      task: "Đọc phần b (SGK tr.14). Nhóm: dựa trên thông tin đã đánh giá, chọn 3 trường và xếp thứ tự ưu tiên phù hợp năng lực–sở thích.",
      sgkImage: "assets/sgk/sgk-trang14.jpg",
      content: {
        heading: "✅ Ra quyết định: chọn & xếp ưu tiên",
        revealLabel: "🔍 Hiện cách quyết định",
        blocks: [
          { kind: "list", value: [
            "Chọn các trường phù hợp NĂNG LỰC và SỞ THÍCH của bản thân.",
            "Lưu ý TÍNH KHẢ THI của phương án (điểm chuẩn so với năng lực, khoảng cách…).",
            "Sắp xếp theo DANH SÁCH ƯU TIÊN; xác định thứ tự ưu tiên giữa các tiêu chí để chọn dễ hơn.",
          ] },
          { kind: "html", value: '<div style="text-align:center;font-size:18px;margin-top:6px">Kết quả: <b style="color:#16a34a">Nguyện vọng 1 → 2 → 3</b> theo thứ tự ưu tiên.</div>' },
        ],
      },
      remember: ["Quyết định = chọn trường phù hợp năng lực–sở thích, khả thi, rồi xếp theo thứ tự ưu tiên."],
    },

    /* ===================== HĐ3: LUYỆN TẬP ===================== */
    {
      id: "luyen-tap", name: "Luyện tập — Kĩ năng tìm & đánh giá", type: "quiz",
      goal: "Củng cố kĩ năng tìm kiếm và đánh giá chất lượng thông tin.",
      time: 360,
      task: "Thảo luận nhóm, chọn đáp án đúng. (Liên hệ: HS còn thực hành tìm 'các môn học ở THPT' để dự kiến chọn môn.)",
      questions: [
        { question: "Công cụ dùng để tìm thông tin trên Internet (như Google) được gọi là gì?", type: "multiple-choice",
          options: ["Máy tìm kiếm", "Máy in", "Bảng tính", "Trình chiếu"],
          answer: 0, explanation: "Đó là máy tìm kiếm (search engine) — ta nhập từ khoá để tìm thông tin.", level: "nhan-biet", activity: "luyen-tap" },
        { question: "Để tìm nhóm môn thế mạnh của một trường, từ khoá nào SÁT nhất?", type: "multiple-choice",
          options: ["\"trường học\"", "\"tin tức hôm nay\"", "\"phim hay 2023\"", "\"Olympic Tin học 2023 tỉnh Phú Thọ\""],
          answer: 3, explanation: "Từ khoá cụ thể, bám yêu cầu (thành tích môn học của tỉnh) cho kết quả sát nhất.", level: "van-dung", activity: "luyen-tap" },
        { question: "Thông tin tuyển sinh vào lớp 10 nên tra ở đâu để đáng tin cậy nhất?", type: "multiple-choice",
          options: ["Một nhóm chat lớp", "Một blog cá nhân", "Website Sở GD&ĐT (tên miền edu.vn)", "Bình luận dưới video"],
          answer: 2, explanation: "Cơ quan có thẩm quyền là Sở GD&ĐT, thường có tên miền edu.vn (VD phutho.edu.vn).", level: "thong-hieu", activity: "luyen-tap" },
        { question: "Chọn TẤT CẢ tiêu chí dùng để đánh giá chất lượng thông tin.", type: "multiple-select",
          options: ["Tính mới", "Số lượt thích của bài viết", "Tính chính xác", "Tính đầy đủ", "Tính sử dụng được"],
          answer: [0, 2, 3, 4], explanation: "Bốn tiêu chí: mới, chính xác, đầy đủ, sử dụng được. Lượt thích KHÔNG phản ánh chất lượng.", level: "thong-hieu", activity: "luyen-tap" },
        { question: "Một bài viết không ghi ngày đăng và không nêu nguồn. Em nên?", type: "multiple-choice",
          options: ["Tin ngay vì đọc thấy hợp lí", "Thận trọng, đối chiếu nguồn khác trước khi dùng", "Chia sẻ ngay cho bạn bè", "Dùng luôn làm căn cứ quyết định"],
          answer: 1, explanation: "Thiếu ngày đăng và nguồn → độ tin cậy thấp; cần kiểm chứng qua nguồn khác.", level: "van-dung", activity: "luyen-tap" },
        { question: "Vì sao KHÔNG nên quyết định chọn trường chỉ dựa vào một nguồn thông tin duy nhất?", type: "multiple-choice",
          options: ["Vì đọc nhiều nguồn cho vui", "Vì mạng chậm", "Vì thầy cô bắt buộc", "Vì một nguồn có thể sai/thiếu/lỗi thời — đối chiếu nhiều nguồn mới đáng tin"],
          answer: 3, explanation: "Một nguồn có thể thiếu chính xác, đầy đủ hoặc lỗi thời; đối chiếu nhiều nguồn giúp quyết định đúng.", level: "van-dung-cao", activity: "luyen-tap" },
      ],
    },

    /* ===================== HĐ4: VẬN DỤNG ===================== */
    {
      id: "van-dung", name: "Vận dụng — Dự án của em", type: "vandung",
      goal: "Chuyển giao vào nhiệm vụ thực tế (dự án bài trình chiếu).",
      time: 300,
      task: "Nhóm bàn hướng làm 2 nhiệm vụ, ghi ra bảng nhóm rồi bấm xem gợi ý của giáo viên.",
      cases: [
        {
          question: "Luyện tập: Tìm hiểu các môn học được dạy ở cấp THPT và dự kiến chọn các môn em thích.",
          answer: "Gợi ý: dùng từ khoá như \"chương trình GDPT 2018 môn học THPT\", tra trên nguồn chính thống (Bộ GD&ĐT, moet.gov.vn). Liệt kê các môn bắt buộc và môn lựa chọn theo nhóm; đối chiếu với sở thích/định hướng nghề để dự kiến tổ hợp môn.",
        },
        {
          question: "Vận dụng (dự án): Tạo một bài trình chiếu chủ đề 'Chọn môi trường học tập' sau khi kết thúc THCS, dùng các nguồn đã thu thập & đánh giá.",
          answer: "Gợi ý bố cục: (1) Các lựa chọn sau THCS; (2) Tiêu chí chọn (năng lực, sở thích, điều kiện); (3) So sánh ưu–nhược từng lựa chọn; (4) Đề xuất phù hợp bản thân. Mỗi thông tin ghi rõ NGUỒN, ưu tiên nguồn đáng tin cậy; trình bày mạch lạc. (HS làm ở nhà ~2 tuần rồi báo cáo.)",
        },
      ],
    },

    /* ===================== TỔNG KẾT ===================== */
    {
      id: "tong-ket", name: "Tổng kết", type: "summary",
      goal: "Chốt quy trình & tiêu chí trọng tâm.",
      task: "Nhắc lại 4 bước và 4 tiêu chí; làm 2 thử thách cuối.",
      content: {
        learned: null,
        challenge: [
          { question: "Thứ tự đúng của quy trình tìm & dùng thông tin để giải quyết vấn đề là:", type: "multiple-choice",
            options: ["Tìm kiếm → Mục đích → Quyết định → Đánh giá", "Xác định mục đích & yêu cầu → Tìm kiếm → Đánh giá chất lượng → Quyết định", "Đánh giá → Quyết định → Tìm kiếm → Mục đích", "Quyết định → Tìm kiếm → Đánh giá → Mục đích"],
            answer: 1, explanation: "Đúng quy trình: Mục đích & yêu cầu → Tìm kiếm → Đánh giá → Quyết định.", level: "thong-hieu", activity: "tong-ket" },
          { question: "Đâu là dấu hiệu của một nguồn thông tin ĐÁNG TIN CẬY hơn khi tìm tuyển sinh lớp 10?", type: "multiple-choice",
            options: ["Trang có nhiều quảng cáo", "Bài đăng ẩn danh, không nguồn", "Tiêu đề giật gân, nhiều biểu tượng cảm xúc", "Tên miền edu.vn của Sở GD&ĐT, có ghi ngày cập nhật"],
            answer: 3, explanation: "Nguồn có thẩm quyền (edu.vn của Sở GD&ĐT) và có ngày cập nhật thì đáng tin hơn.", level: "van-dung", activity: "tong-ket" },
        ],
      },
    },
  ],
};
if (typeof module !== "undefined" && module.exports) module.exports = LESSON;
if (typeof window !== "undefined") window.LESSON = LESSON;
