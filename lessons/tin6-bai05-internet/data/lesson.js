/* ============================================================================
 * BÀI 5 — INTERNET  (Tin học 6 — Kết nối tri thức với cuộc sống)
 * Chủ đề 2: Mạng máy tính và Internet.
 * Bám sát SGK trang 20–22 + Kế hoạch bài dạy (2 tiết) của giáo viên.
 * Chỉ sửa file này để đổi nội dung. Engine app.js không cần sửa.
 * ==========================================================================*/

/* Sơ đồ "mạng của các mạng": quả cầu Internet ở giữa nối các mạng nhỏ */
function internetSVG() {
  const cx = 300, cy = 150, R = 46;
  const nets = [[70, 60], [530, 60], [60, 240], [540, 240], [300, 30], [300, 275]];
  let lines = nets.map(n => `<line x1="${cx}" y1="${cy}" x2="${n[0]}" y2="${n[1]}" stroke="#fdba74" stroke-width="3"/>`).join("");
  let small = nets.map((n, i) => `<circle cx="${n[0]}" cy="${n[1]}" r="26" fill="#dbeafe" stroke="#2563eb" stroke-width="2.5"/><text x="${n[0]}" y="${n[1] + 6}" text-anchor="middle" font-size="17">${["💻", "🖥️", "📱", "🖨️", "🏫", "🏢"][i]}</text><text x="${n[0]}" y="${n[1] + 44}" text-anchor="middle" font-size="12" fill="#7c5a3a">mạng ${i + 1}</text>`).join("");
  return `<svg viewBox="0 0 600 300" width="100%" style="max-height:42vh" xmlns="http://www.w3.org/2000/svg" role="img">
    ${lines}${small}
    <circle cx="${cx}" cy="${cy}" r="${R}" fill="#ea580c"/>
    <text x="${cx}" y="${cy - 4}" text-anchor="middle" font-size="30">🌐</text>
    <text x="${cx}" y="${cy + 24}" text-anchor="middle" font-size="15" font-weight="800" fill="#fff">INTERNET</text>
  </svg>`;
}

const LESSON = {
  meta: {
    subject: "Tin học", grade: "6", book: "Kết nối tri thức với cuộc sống",
    title: "Bài 5: Internet", unit: "Chủ đề 2 — Mạng máy tính và Internet",
    pages: "20–22", durationMinutes: 90,
  },
  objectives: {
    knowledge: [
      "Biết Internet là gì.",
      "Nêu được một số đặc điểm chính của Internet.",
      "Nêu được một số lợi ích chính của Internet.",
    ],
    competencies: [
      "Tự học; giao tiếp – hợp tác; giải quyết vấn đề.",
      "Năng lực số: xác định nhu cầu tin, truy cập & tìm kiếm, chọn nguồn tin cậy (1.1.TC1a/b/c).",
    ],
    qualities: ["Nhân ái, chăm chỉ, trung thực, trách nhiệm; dùng Internet an toàn"],
  },
  coreKnowledge: [
    "Internet là mạng liên kết các mạng máy tính trên khắp thế giới (mạng của các mạng).",
    "Máy tính kết nối Internet thông qua một nhà cung cấp dịch vụ Internet (ISP).",
    "Người dùng truy cập Internet để tìm kiếm, chia sẻ, lưu trữ và trao đổi thông tin; có nhiều dịch vụ (WWW, tìm kiếm, thư điện tử…).",
    "Bốn đặc điểm chính: tính toàn cầu, tính tương tác, tính dễ tiếp cận, tính không chủ sở hữu.",
    "Lợi ích: trao đổi thông tin nhanh, học/làm trực tuyến, tài liệu phong phú, tiện ích đời sống, giải trí.",
  ],
  keywords: ["Internet", "Nhà cung cấp dịch vụ (ISP)", "4 đặc điểm chính", "Lợi ích Internet"],
  settings: { basePoints: 100, useTimer: false, defaultTime: 60, sound: false, streakEnabled: true },

  activities: [
    /* ===================== HĐ1: MỞ ĐẦU ===================== */
    {
      id: "khoi-dong", name: "Khởi động — Đặt vé không cần ra phòng vé", type: "intro",
      goal: "Tạo hứng thú; nhận ra Internet giúp làm nhiều việc từ xa.",
      time: 180,
      task: "Đọc hội thoại An – Minh (SGK tr.20). Nhóm: kể vài việc trong đời sống có thể làm nhờ Internet.",
      sgkImage: "assets/sgk/sgk-trang20.jpg",
      content: {
        heading: "✈️ Đặt vé máy bay ngay tại nhà",
        prompt: "Mẹ An bận không ra được phòng vé. Minh mách: chỉ cần có Internet là tìm chuyến bay, đặt vé và thanh toán ngay tại nhà. Internet còn giúp em làm được những gì nữa?",
        blocks: [
          { kind: "text", value: "👉 Có Internet, ta đọc báo, xem phim, đặt vé, học online… mà không cần đến tận nơi." },
        ],
        revealLabel: "🔍 Gợi ý",
      },
      questions: [
        {
          question: "Chọn TẤT CẢ công việc có thể làm NHỜ Internet.",
          type: "multiple-select",
          options: ["Đọc báo trực tuyến", "Quét nhà", "Xem phim, đặt vé máy bay", "Nấu cơm"],
          answer: [0, 2], explanation: "Đọc báo, xem phim, đặt vé cần Internet. Quét nhà và nấu cơm là việc tay chân, không cần Internet.",
          level: "nhan-biet", activity: "khoi-dong",
        },
      ],
    },

    /* ===================== HĐ2.1: INTERNET LÀ GÌ ===================== */
    {
      id: "internet-la-gi", name: "Internet là gì?", type: "knowledge",
      goal: "Nêu khái niệm Internet, cách kết nối và các dịch vụ.",
      time: 300,
      task: "Đọc mục 1 (SGK tr.20). Nhóm: Internet là gì? Kết nối Internet bằng cách nào? Có những dịch vụ gì?",
      sgkImage: "assets/sgk/sgk-trang20.jpg",
      content: {
        heading: "🌐 Internet — mạng của các mạng",
        revealLabel: "🔍 Hiện khái niệm & sơ đồ",
        blocks: [
          { kind: "svg", value: internetSVG() },
          { kind: "list", value: [
            "Internet là MẠNG LIÊN KẾT các mạng máy tính trên khắp thế giới.",
            "Muốn truy cập Internet, máy tính cần kết nối qua một NHÀ CUNG CẤP DỊCH VỤ INTERNET (ISP) như Viettel, VNPT, FPT… để được cài đặt và cấp quyền truy cập.",
            "Người dùng truy cập Internet để tìm kiếm, chia sẻ, lưu trữ và trao đổi thông tin.",
          ] },
          { kind: "html", value:
            '<div style="text-align:center;margin-top:4px">Nhiều dịch vụ trên Internet: ' +
            ['🌐 WWW','🔎 Tìm kiếm','✉️ Thư điện tử','💬 Mạng xã hội','📺 Truyền hình','🛒 Kinh doanh']
              .map(s=>`<span style="display:inline-block;background:#fff7ed;border:1px solid #fdba74;color:#c2410c;padding:4px 12px;border-radius:999px;margin:3px;font-weight:700;font-size:14px">${s}</span>`).join("") +
            '</div>' },
        ],
      },
      questions: [
        {
          question: "Internet là gì?",
          type: "multiple-choice",
          options: ["Mạng liên kết các mạng máy tính trên khắp thế giới", "Một chiếc máy tính rất mạnh", "Một trang web bán hàng", "Một loại điện thoại"],
          answer: 0, explanation: "Chính xác! Internet là mạng liên kết các mạng máy tính trên khắp thế giới — 'mạng của các mạng'.",
          level: "nhan-biet", activity: "internet-la-gi",
        },
      ],
      remember: [
        "Internet = mạng liên kết các mạng máy tính trên khắp thế giới.",
        "Kết nối Internet qua nhà cung cấp dịch vụ Internet (ISP).",
      ],
    },
    {
      id: "dien-khuyet", name: "Điền khuyết — Nói về Internet", type: "fillblank",
      goal: "Củng cố khái niệm bằng cách điền từ.",
      time: 180,
      task: "Điền từ thích hợp (liên kết · mạng · chia sẻ · thông tin · dịch vụ) vào chỗ trống, rồi bấm Kiểm tra.",
      text: "a) Internet là mạng {{}} các {{}} máy tính trên khắp thế giới. b) Người dùng truy cập Internet để tìm kiếm, {{}}, lưu trữ và trao đổi {{}}. c) Có nhiều {{}} thông tin khác nhau trên Internet.",
      answers: [["liên kết"], ["mạng"], ["chia sẻ"], ["thông tin"], ["dịch vụ"]],
      explanation: "a) liên kết · mạng; b) chia sẻ · thông tin; c) dịch vụ.",
    },

    /* ===================== HĐ2.2: ĐẶC ĐIỂM ===================== */
    {
      id: "dac-diem", name: "Đặc điểm của Internet", type: "knowledge",
      goal: "Nắm 4 đặc điểm chính và một số đặc điểm khác.",
      time: 300,
      task: "Đọc mục 2 (SGK tr.21). Nhóm: Internet có những đặc điểm gì? Đâu là các đặc điểm CHÍNH?",
      sgkImage: "assets/sgk/sgk-trang21.jpg",
      content: {
        heading: "✨ Internet có gì đặc biệt?",
        revealLabel: "🔍 Hiện các đặc điểm",
        blocks: [
          { kind: "html", value:
            '<div style="font-weight:800;color:#c2410c;margin-bottom:4px">4 đặc điểm CHÍNH:</div>' +
            '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">' +
            [['🌍 Tính toàn cầu','Hầu hết các quốc gia đều đang dùng Internet.'],
             ['🔄 Tính tương tác','Tức thời nhận & gửi thông tin (khác truyền thông một chiều).'],
             ['🚪 Tính dễ tiếp cận','Tìm, lưu, trao đổi, chia sẻ thông tin mọi lúc, mọi nơi.'],
             ['🏳️ Tính không chủ sở hữu','Mạng công cộng toàn cầu, không thuộc riêng ai điều hành.']]
              .map(c=>`<div style="background:#fff7ed;border:2px solid #ea580c;border-radius:12px;padding:10px"><b style="color:#c2410c">${c[0]}</b><div style="font-size:14px">${c[1]}</div></div>`).join("") +
            '</div>' +
            '<div style="margin-top:8px;font-size:15px"><b>Một số đặc điểm khác:</b> tính cập nhật · tính lưu trữ · tính đa dạng (văn bản/âm thanh/hình ảnh/video) · tính ẩn danh (dùng bí danh).</div>' },
        ],
      },
      remember: ["4 đặc điểm CHÍNH: tính toàn cầu · tính tương tác · tính dễ tiếp cận · tính không chủ sở hữu."],
    },
    {
      id: "ghep-dac-diem", name: "Trò chơi: Ghép đặc điểm ↔ ý nghĩa", type: "matching",
      goal: "Củng cố 4 đặc điểm chính.",
      time: 180,
      task: "Nối mỗi đặc điểm chính với ý nghĩa đúng.",
      pairs: [
        { left: "Tính toàn cầu", right: "Hầu hết các nước đều dùng Internet" },
        { left: "Tính tương tác", right: "Tức thời nhận & gửi thông tin" },
        { left: "Tính dễ tiếp cận", right: "Dùng mọi lúc, mọi nơi, thuận lợi" },
        { left: "Tính không chủ sở hữu", right: "Không thuộc riêng tổ chức/cá nhân nào" },
      ],
      explanation: "Bốn đặc điểm chính giúp Internet phổ biến và hữu ích trên toàn thế giới.",
    },
    {
      id: "quiz-dac-diem", name: "Đâu là đặc điểm CHÍNH?", type: "quiz",
      goal: "Phân biệt đặc điểm chính và đặc điểm khác.",
      time: 150,
      task: "Chọn đúng các đặc điểm CHÍNH của Internet.",
      questions: [
        {
          question: "Internet có những ĐẶC ĐIỂM CHÍNH nào? (chọn tất cả)",
          type: "multiple-select",
          options: ["Tính toàn cầu", "Tính tương tác", "Tính lưu trữ", "Tính dễ tiếp cận", "Tính đa dạng", "Tính không chủ sở hữu"],
          answer: [0, 1, 3, 5], explanation: "4 đặc điểm CHÍNH: toàn cầu, tương tác, dễ tiếp cận, không chủ sở hữu. Tính lưu trữ và tính đa dạng là đặc điểm KHÁC.",
          level: "thong-hieu", activity: "quiz-dac-diem",
        },
        {
          question: "Nhờ đặc điểm nào mà em có thể tức thời NHẬN và GỬI thông tin (khác với đọc báo giấy)?",
          type: "multiple-choice",
          options: ["Tính lưu trữ", "Tính tương tác", "Tính ẩn danh", "Tính toàn cầu"],
          answer: 1, explanation: "Đó là tính tương tác — người dùng nhận và gửi thông tin ngay lập tức, hai chiều.",
          level: "thong-hieu", activity: "quiz-dac-diem",
        },
      ],
    },

    /* ===================== HĐ2.3: LỢI ÍCH ===================== */
    {
      id: "loi-ich", name: "Lợi ích của Internet", type: "knowledge",
      goal: "Nêu các lợi ích chính và vai trò của Internet.",
      time: 240,
      task: "Đọc mục 3 (SGK tr.22). Nhóm: em thường dùng Internet làm gì? Internet có những lợi ích gì?",
      sgkImage: "assets/sgk/sgk-trang22.jpg",
      content: {
        heading: "💡 Internet giúp ích gì?",
        revealLabel: "🔍 Hiện các lợi ích",
        blocks: [
          { kind: "html", value:
            '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">' +
            [['📨','Trao đổi thông tin nhanh, hiệu quả'],['💻','Học tập & làm việc trực tuyến'],['📚','Nguồn tài liệu phong phú'],['🛠️','Tiện ích phục vụ đời sống'],['🎮','Phương tiện vui chơi, giải trí']]
              .map(c=>`<div style="background:#eff6ff;border:2px solid #2563eb;border-radius:12px;padding:10px;text-align:center"><div style="font-size:26px">${c[0]}</div><div style="font-weight:700;font-size:14px;color:#1e3a8a">${c[1]}</div></div>`).join("") +
            '</div>' },
          { kind: "text", value: "Internet có vai trò quan trọng trong mọi lĩnh vực (sản xuất, y tế, giáo dục, giải trí…) và tạo môi trường làm việc từ xa (học, dạy, hội họp), góp phần thúc đẩy xã hội phát triển." },
          { kind: "ext", value: "⚠️ Lưu ý: không nên truy cập Internet liên tục trong nhiều giờ." },
        ],
      },
      remember: [
        "5 lợi ích: trao đổi thông tin nhanh · học/làm trực tuyến · tài liệu phong phú · tiện ích đời sống · giải trí.",
      ],
    },
    {
      id: "game-lam-gi", name: "Trò chơi: Việc nào làm được với Internet?", type: "dragdrop",
      goal: "Phân biệt việc làm được nhờ Internet và việc cần làm ngoài đời.",
      time: 180,
      task: "Chọn từng việc rồi bấm vào nhóm đúng: làm được 'Nhờ Internet' hay 'Không qua Internet'.",
      sgkImage: "assets/sgk/sgk-trang22.jpg",
      groups: ["Làm được NHỜ Internet 🌐", "KHÔNG qua Internet 🏃"],
      items: [
        { text: "Học ngoại ngữ trực tuyến với người nước ngoài", group: 0 },
        { text: "Nghe nhạc, xem phim trực tuyến", group: 0 },
        { text: "Tìm kiếm tư liệu học tập", group: 0 },
        { text: "Gửi thư điện tử", group: 0 },
        { text: "Chơi đá bóng để nâng cao sức khoẻ", group: 1 },
      ],
      explanation: "Học online, nghe nhạc/xem phim, tìm tài liệu, gửi email đều nhờ Internet. Đá bóng là vận động ngoài đời — không cần Internet.",
    },

    /* ===================== HĐ3: LUYỆN TẬP ===================== */
    {
      id: "luyen-tap", name: "Luyện tập", type: "quiz",
      goal: "Củng cố khái niệm, kết nối và đặc điểm.",
      time: 300,
      task: "Thảo luận, chọn đáp án đúng cho mỗi câu.",
      questions: [
        { question: "Internet là mạng:", type: "multiple-choice",
          options: ["Kết nối hai máy tính với nhau", "Kết nối các máy tính trong một nước", "Kết nối các máy tính trong một thành phố", "Kết nối nhiều mạng máy tính trên phạm vi toàn cầu"],
          answer: 3, explanation: "Internet kết nối nhiều mạng máy tính trên phạm vi toàn cầu.", level: "nhan-biet", activity: "luyen-tap" },
        { question: "Làm thế nào để máy tính kết nối được Internet?", type: "multiple-choice",
          options: ["Chỉ cần cắm điện cho máy", "Tự máy tính kết nối được", "Đăng kí với nhà cung cấp dịch vụ Internet (ISP) để được hỗ trợ cài đặt và cấp quyền truy cập", "Chỉ cần có màn hình lớn"],
          answer: 2, explanation: "Cần đăng kí với nhà cung cấp dịch vụ Internet (ISP) để được cài đặt và cấp quyền truy cập.", level: "thong-hieu", activity: "luyen-tap" },
        { question: "Người dùng có thể tiếp cận & chia sẻ thông tin nhanh, không phụ thuộc vị trí địa lí khi kết nối vào đâu?", type: "multiple-choice",
          options: ["Một chiếc laptop", "Một máy tính để bàn", "Một mạng LAN nội bộ", "Internet"],
          answer: 3, explanation: "Nhờ kết nối vào Internet (mạng toàn cầu), việc tiếp cận & chia sẻ không phụ thuộc vị trí địa lí.", level: "thong-hieu", activity: "luyen-tap" },
        { question: "Internet ra đời vào năm nào?", type: "multiple-choice",
          options: ["Năm 1965", "Năm 1969", "Năm 1978", "Năm 1984"],
          answer: 1, explanation: "Internet ra đời năm 1969 (mở rộng thêm — không bắt buộc trong SGK).", hint: "Cuối thập niên 1960.", level: "van-dung", activity: "luyen-tap" },
      ],
    },
    {
      id: "ghep-cot", name: "Trò chơi: Ghép cột A ↔ B", type: "matching",
      goal: "Ghép để tạo phát biểu đúng về Internet.",
      time: 150,
      task: "Nối mỗi vế ở cột A với vế đúng ở cột B.",
      pairs: [
        { left: "Internet là mạng liên kết…", right: "…các mạng máy tính trên toàn cầu" },
        { left: "Có nhiều dịch vụ trên Internet như…", right: "…WWW, tìm kiếm, thư điện tử…" },
        { left: "Thông tin trên Internet…", right: "…được cập nhật thường xuyên" },
        { left: "Người dùng có thể…", right: "…tìm kiếm, lưu trữ, trao đổi, chia sẻ thông tin" },
      ],
      explanation: "Ghép đúng: 1–toàn cầu, 2–các dịch vụ, 3–cập nhật thường xuyên, 4–tìm/lưu/trao đổi/chia sẻ.",
    },

    /* ===================== HĐ4: VẬN DỤNG ===================== */
    {
      id: "van-dung", name: "Vận dụng", type: "vandung",
      goal: "Liên hệ thực tế lợi ích của Internet và cách dùng an toàn.",
      time: 240,
      task: "Nhóm thảo luận 2 nhiệm vụ, ghi ra bảng nhóm rồi bấm xem gợi ý.",
      cases: [
        {
          question: "Lấy ví dụ cho thấy Internet mang lại lợi ích cho HỌC TẬP và GIẢI TRÍ.",
          answer: "Học tập: học trực tuyến, xem bài giảng, tra cứu kiến thức, học ngoại ngữ, tìm tài liệu. Giải trí: nghe nhạc, xem phim, chơi trò chơi, đọc tin tức.",
        },
        {
          question: "Vì sao Internet được sử dụng rộng rãi và ngày càng phát triển?",
          answer: "Vì Internet là kho tài liệu vô tận, dễ tiếp cận mọi lúc mọi nơi, kết nối toàn cầu, chi phí thấp, cung cấp nhiều dịch vụ tiện ích. Lưu ý dùng an toàn: không truy cập liên tục nhiều giờ; không chia sẻ thông tin cá nhân; kiểm chứng độ tin cậy của thông tin; ứng xử văn minh.",
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
          { question: "Muốn máy tính ở nhà truy cập Internet, việc CẦN làm là:", type: "multiple-choice",
            options: ["Mua màn hình thật to", "Cài thật nhiều trò chơi", "Đăng kí dịch vụ với một nhà cung cấp Internet (ISP)", "Không cần làm gì"],
            answer: 2, explanation: "Cần đăng kí với nhà cung cấp dịch vụ Internet (ISP) để được cấp quyền truy cập.", level: "thong-hieu", activity: "tong-ket" },
          { question: "Bạn em định thức khuya lướt Internet liên tục nhiều giờ mỗi ngày. Em nên khuyên gì?", type: "multiple-choice",
            options: ["Nên hạn chế: không truy cập liên tục nhiều giờ, cân bằng học – nghỉ – vận động", "Cứ lướt thoải mái, không sao", "Lướt càng nhiều càng giỏi", "Chia sẻ hết thông tin cá nhân cho vui"],
            answer: 0, explanation: "Dùng Internet có chừng mực: không truy cập liên tục nhiều giờ, giữ sức khoẻ và cân bằng cuộc sống.", level: "van-dung-cao", activity: "tong-ket" },
        ],
      },
    },
  ],
};
if (typeof module !== "undefined" && module.exports) module.exports = LESSON;
if (typeof window !== "undefined") window.LESSON = LESSON;
