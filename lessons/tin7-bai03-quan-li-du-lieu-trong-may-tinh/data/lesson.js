/* ============================================================================
 * BÀI 3 — QUẢN LÍ DỮ LIỆU TRONG MÁY TÍNH  (Tin học 7 — Kết nối tri thức)
 * Nội dung bám sát SGK trang 13–17 + Kế hoạch bài dạy (2 tiết) của giáo viên.
 * Chỉ sửa file này để đổi nội dung. Engine app.js không cần sửa.
 * ==========================================================================*/

/* ---- Sơ đồ cây thư mục DuLich (SVG, sắc nét trên máy chiếu) ---- */
function treeSVG() {
  const F = "#f59e0b", T = "#0d9488", ink = "#0f2e2a";
  function folder(x, y, label, w) {
    w = w || 120;
    return `<g>
      <rect x="${x}" y="${y}" width="${w}" height="34" rx="8" fill="#fff7ed" stroke="${F}" stroke-width="2"/>
      <path d="M${x + 10} ${y + 10} h14 l4 5 h14 v3 h-32 z" fill="${F}"/>
      <text x="${x + 34}" y="${y + 22}" font-size="15" font-weight="700" fill="${ink}">${label}</text>
    </g>`;
  }
  function file(x, y, label) {
    return `<g>
      <rect x="${x}" y="${y}" width="140" height="30" rx="7" fill="#fef2f2" stroke="#ec4899" stroke-width="2"/>
      <rect x="${x + 9}" y="${y + 7}" width="13" height="16" rx="2" fill="#ec4899"/>
      <text x="${x + 30}" y="${y + 20}" font-size="13" font-weight="600" fill="${ink}">${label}</text>
    </g>`;
  }
  const line = (x1, y1, x2, y2) => `<path d="M${x1} ${y1} C ${x1 + 26} ${y1}, ${x2 - 26} ${y2}, ${x2} ${y2}" stroke="${T}" stroke-width="2.5" fill="none"/>`;
  return `<svg viewBox="0 0 640 340" width="100%" style="max-height:52vh" xmlns="http://www.w3.org/2000/svg" role="img">
    ${line(70, 170, 150, 60)}${line(70, 170, 150, 170)}${line(70, 170, 150, 280)}
    ${line(270, 170, 400, 40)}${line(270, 170, 400, 90)}${line(270, 170, 400, 140)}${line(270, 170, 400, 190)}${line(270, 170, 400, 240)}${line(270, 170, 400, 290)}
    <rect x="16" y="152" width="56" height="36" rx="9" fill="#fde68a" stroke="${F}" stroke-width="2"/><text x="30" y="175" font-size="16" font-weight="800" fill="${ink}">C:\\</text>
    ${folder(150, 42, "GiaDinh")}
    ${folder(150, 152, "DuLich")}
    ${folder(150, 262, "HocTap")}
    ${folder(400, 22, "BinhMinh")}
    ${folder(400, 72, "BanNgay")}
    ${folder(400, 122, "HoangHon")}
    ${folder(272, 152, "DiemDen")}
    ${file(400, 175, "PhaoHoa01.jpg")}
    ${file(400, 225, "PhaoHoa02.jpg")}
  </svg>`;
}

const LESSON = {
  meta: {
    subject: "Tin học", grade: "7", book: "Kết nối tri thức với cuộc sống",
    title: "Bài 3: Quản lí dữ liệu trong máy tính", unit: "Chủ đề 1 — Máy tính và cộng đồng",
    pages: "13–17", durationMinutes: 90,
  },
  objectives: {
    knowledge: [
      "Biết tệp chương trình cũng là dữ liệu, được lưu trữ trong máy tính (.exe, .com, .bat, .msi).",
      "Nêu được ví dụ về biện pháp bảo vệ dữ liệu: sao lưu, mật khẩu, phòng chống virus.",
      "Thao tác thành thạo với tệp và thư mục: tạo, sao chép, di chuyển, đổi tên, xoá.",
    ],
    competencies: [
      "Tự chủ – tự học; giao tiếp – hợp tác; giải quyết vấn đề.",
      "Năng lực số: thao tác tệp/thư mục (1.3.TC1a), phân loại–tổ chức dữ liệu (1.3.TC1b), bảo vệ dữ liệu (4.1.TC1a).",
    ],
    qualities: ["Chăm chỉ, trung thực, trách nhiệm khi dùng thiết bị và dữ liệu"],
  },
  coreKnowledge: [
    "Đặt tên tệp/thư mục ngắn gọn, dễ nhớ, gợi nội dung; phân loại và tổ chức theo cây thư mục.",
    "Chương trình máy tính cũng là tệp — trong Windows thường có đuôi .exe, .com, .bat, .msi.",
    "Sao lưu dữ liệu thường xuyên ra thiết bị ngoài (cục bộ) hoặc lên đám mây (từ xa).",
    "Đặt mật khẩu mạnh cho tài khoản để tránh truy cập trái phép.",
    "Dùng phần mềm diệt virus, không cài phần mềm không rõ nguồn gốc.",
  ],
  keywords: ["Cây thư mục", "Phần mở rộng tệp", "Sao lưu", "Mật khẩu mạnh · Diệt virus"],
  settings: { basePoints: 100, useTimer: false, defaultTime: 60, sound: false, streakEnabled: true },

  activities: [
    /* ===================== HOẠT ĐỘNG 1: MỞ ĐẦU ===================== */
    {
      id: "khoi-dong", name: "Khởi động — Vẽ cây thư mục", type: "intro",
      goal: "Củng cố khái niệm cây thư mục; thấy sự cần thiết của việc phân loại và đặt tên hợp lí.",
      time: 300,
      task: "Nhóm 4: chuyến du lịch có nhiều ảnh & ghi chép. Hãy vẽ (ra giấy A4) sơ đồ cây thư mục để lưu, đặt tên sao cho dễ tìm. Sau đó trả lời câu hỏi.",
      sgkImage: "assets/sgk/sgk-trang13.jpg",
      content: {
        heading: "🗂️ Sắp xếp kho ảnh du lịch của em",
        prompt: "Sau chuyến đi, em có hàng trăm tấm ảnh và ghi chép. Nếu vứt hết vào một chỗ, khi cần một tấm ảnh 'pháo hoa' em sẽ tìm thế nào?",
        blocks: [
          { kind: "text", value: "👉 Nếu dữ liệu không được tổ chức tốt, em sẽ mất rất nhiều thời gian để tìm thứ mình cần. Cây thư mục giúp mọi thứ gọn gàng, dễ tìm." },
        ],
        revealLabel: "🔍 Xem một cây thư mục hợp lí (SGK Hình 3.1)",
      },
      questions: [
        {
          question: "Vì sao trước khi lưu trữ, ta nên phân loại dữ liệu?",
          type: "multiple-choice",
          options: ["Để máy tính chạy nhanh hơn", "Để việc lưu trữ có trật tự, tìm kiếm nhanh hơn", "Để tốn ít điện hơn", "Không cần thiết, lưu đâu cũng được"],
          answer: 1, explanation: "Chính xác! Phân loại giúp lưu trữ có trật tự và tìm kiếm dữ liệu nhanh hơn.",
          level: "thong-hieu", activity: "khoi-dong",
        },
      ],
    },

    /* ============= HĐ2.1: TÊN TỆP VÀ THƯ MỤC ============= */
    {
      id: "ten-tep", name: "Tên tệp và thư mục", type: "knowledge",
      goal: "Biết cách đặt tên hợp lí; biết chương trình cũng là tệp và có phần mở rộng riêng.",
      time: 360,
      task: "Đọc mục 1 (SGK tr.13). Cặp đôi trả lời: nên đặt tên tệp/thư mục thế nào? Chương trình máy tính được lưu dưới dạng gì, đuôi gì?",
      sgkImage: "assets/sgk/sgk-trang13.jpg",
      content: {
        heading: "📛 Đặt tên & phần mở rộng của tệp",
        revealLabel: "🔍 Hiện nội dung kiến thức",
        blocks: [
          { kind: "svg", value: treeSVG() },
          { kind: "list", value: [
            "Nên đặt tên tệp và thư mục ĐƠN GIẢN, DỄ HIỂU, cho biết bên trong chứa gì.",
            "Tổ chức theo cây thư mục (thư mục → thư mục con → tệp) để dễ tìm và làm việc nhóm.",
            "Chương trình máy tính cũng được lưu dưới dạng TỆP, giống như tệp dữ liệu.",
          ] },
          { kind: "html", value:
            '<div style="text-align:center;margin:6px 0">Tệp chương trình trong Windows thường có đuôi: ' +
            ['.exe','.com','.bat','.msi'].map(e=>`<span style="display:inline-block;background:#0d9488;color:#fff;padding:4px 12px;border-radius:8px;margin:3px;font-family:Consolas,monospace;font-weight:700">${e}</span>`).join("") +
            '</div>' },
          { kind: "ext", value: "⚠️ Không nên xoá hay di chuyển các tệp chương trình này nếu không có lí do — máy tính có thể cần chúng để hoạt động." },
        ],
      },
      questions: [
        {
          question: "Để tìm kiếm dữ liệu dễ dàng, khi đặt tên thư mục và tệp em nên:",
          type: "multiple-choice",
          options: ["Đặt theo tên người thân hay thú cưng", "Đặt sao cho dễ nhớ và biết trong đó chứa gì", "Đặt giống hệt ví dụ trong SGK", "Đặt tuỳ ý, không cần quy tắc"],
          answer: 1, explanation: "Đúng! Tên tốt là tên dễ nhớ và cho biết bên trong chứa gì.",
          level: "thong-hieu", activity: "ten-tep",
        },
        {
          question: "Tệp có phần mở rộng .exe thuộc loại tệp gì?",
          type: "multiple-choice",
          options: ["Không có loại tệp này", "Tệp chương trình máy tính", "Tệp dữ liệu của Microsoft Word", "Tệp dữ liệu video"],
          answer: 1, explanation: "Chính xác! .exe là tệp chương trình máy tính.",
          hint: "Nhớ 4 đuôi tệp chương trình: .exe, .com, .bat, .msi.",
          level: "nhan-biet", activity: "ten-tep",
        },
      ],
      remember: [
        "Tên tệp/thư mục cần dễ nhớ, cho biết bên trong chứa gì.",
        "Chương trình máy tính cũng là tệp (đuôi .exe, .com, .bat, .msi).",
      ],
    },

    /* Phân loại tệp chương trình vs tệp dữ liệu */
    {
      id: "phan-loai-tep", name: "Trò chơi: Tệp chương trình hay tệp dữ liệu?", type: "dragdrop",
      goal: "Phân biệt tệp chương trình và tệp dữ liệu qua phần mở rộng.",
      time: 180,
      task: "Chọn từng thẻ tệp rồi bấm vào đúng nhóm: 'Tệp chương trình' hay 'Tệp dữ liệu'.",
      groups: ["Tệp chương trình", "Tệp dữ liệu"],
      items: [
        { text: "setup.exe", group: 0 },
        { text: "caidat.msi", group: 0 },
        { text: "chuongtrinh.bat", group: 0 },
        { text: "PhaoHoa01.jpg", group: 1 },
        { text: "BaiVan.docx", group: 1 },
        { text: "NhacNen.mp3", group: 1 },
      ],
      explanation: "Đuôi .exe/.msi/.bat/.com → tệp chương trình. Đuôi .jpg/.docx/.mp3… → tệp dữ liệu (ảnh, văn bản, âm thanh).",
    },

    /* ============= HĐ2.2: BẢO VỆ DỮ LIỆU — MỞ ĐẦU ============= */
    {
      id: "bao-ve-mo-dau", name: "Vì sao phải bảo vệ dữ liệu?", type: "knowledge",
      goal: "Nhận thấy dữ liệu có thể mất/hỏng/bị truy cập trái phép; nêu 3 nhóm biện pháp chính.",
      time: 180,
      task: "Máy tính của em có nhiều dữ liệu quan trọng. Thảo luận: em sẽ chọn cách bảo vệ nào? Vì sao?",
      content: {
        heading: "🛡️ Ba 'lá chắn' cho dữ liệu",
        revealLabel: "🔍 Hiện 3 biện pháp chính",
        blocks: [
          { kind: "text", value: "Lưu trữ trong máy tính và trên Internet đều có rủi ro: dữ liệu có thể bị MẤT, HỎNG hoặc bị người khác TRUY CẬP TRÁI PHÉP." },
          { kind: "html", value:
            '<div style="display:flex;gap:12px;flex-wrap:wrap;justify-content:center;margin-top:8px">' +
            [['💾','Sao lưu dữ liệu','tránh mất/hỏng'],['🔑','Mật khẩu tài khoản','tránh truy cập trái phép'],['🦠','Phần mềm diệt virus','tránh phần mềm độc hại']]
              .map(c=>`<div style="background:#f0fdfa;border:2px solid #0d9488;border-radius:14px;padding:14px 18px;text-align:center;min-width:150px"><div style="font-size:34px">${c[0]}</div><div style="font-weight:800;color:#0f766e">${c[1]}</div><div style="font-size:14px;color:#5b7a74">${c[2]}</div></div>`).join("") +
            '</div>' },
        ],
      },
      remember: ["Bảo vệ dữ liệu = kết hợp 3 việc: sao lưu + đặt mật khẩu + diệt virus."],
    },

    /* Sao lưu dữ liệu */
    {
      id: "sao-luu", name: "Sao lưu dữ liệu", type: "knowledge",
      goal: "Hiểu sao lưu là gì; phân biệt sao lưu cục bộ và sao lưu từ xa.",
      time: 240,
      task: "Đọc mục a (SGK tr.14). Trả lời: Sao lưu dữ liệu là gì? Sao lưu cục bộ và từ xa khác nhau chỗ nào?",
      sgkImage: "assets/sgk/sgk-trang14.jpg",
      content: {
        heading: "💾 Sao lưu: tạo 'bản dự phòng' cho dữ liệu",
        revealLabel: "🔍 Hiện nội dung sao lưu",
        blocks: [
          { kind: "text", value: "Sao lưu dữ liệu là tạo ra bản sao các tệp và thư mục rồi lưu lên một thiết bị lưu trữ, để khôi phục khi bản gốc gặp sự cố. Cần sao lưu THƯỜNG XUYÊN." },
          { kind: "html", value:
            '<div style="display:flex;gap:14px;flex-wrap:wrap;justify-content:center;margin-top:6px">' +
            '<div style="flex:1;min-width:250px;background:#fff7ed;border:2px solid #f59e0b;border-radius:14px;padding:14px"><div style="font-weight:800;color:#b45309">📦 Sao lưu cục bộ</div><div style="font-size:14px">Bản sao đặt trên cùng máy hoặc thiết bị gần: ổ cứng ngoài, USB… Phục hồi nhanh, nhưng nếu thiết bị/máy thất lạc thì mất theo.</div></div>' +
            '<div style="flex:1;min-width:250px;background:#f0fdfa;border:2px solid #0d9488;border-radius:14px;padding:14px"><div style="font-weight:800;color:#0f766e">☁️ Sao lưu từ xa</div><div style="font-size:14px">Bản sao đặt ngoài máy gốc: máy khác hoặc trên Internet nhờ đám mây. Máy hỏng thì bản sao vẫn an toàn.</div></div>' +
            '</div>' },
        ],
      },
      questions: [
        {
          question: "Sao lưu dữ liệu là gì?",
          type: "multiple-choice",
          options: ["Xoá bớt tệp cho nhẹ máy", "Tạo bản sao các tệp/thư mục rồi lưu lên thiết bị lưu trữ", "Đổi tên tệp cho dễ nhớ", "Nén tệp lại thành file zip"],
          answer: 1, explanation: "Đúng! Sao lưu là tạo bản sao và lưu lên thiết bị lưu trữ để phòng khi bản gốc gặp sự cố.",
          level: "nhan-biet", activity: "sao-luu",
        },
        {
          question: "Cách sao lưu nào vẫn AN TOÀN khi máy tính chứa bản gốc bị hỏng?",
          type: "multiple-choice",
          options: ["Sao lưu cục bộ trên cùng máy đó", "Sao lưu từ xa (máy khác / đám mây)", "Không sao lưu gì cả", "Để nguyên trong ổ C"],
          answer: 1, explanation: "Chính xác! Sao lưu từ xa đặt bản sao ngoài máy gốc nên máy hỏng bản sao vẫn còn.",
          hint: "Bản sao nằm ở đâu thì an toàn khi máy gốc hỏng?",
          level: "van-dung", activity: "sao-luu",
        },
      ],
      remember: ["Sao lưu thường xuyên ra thiết bị NGOÀI máy chứa bản gốc.", "Sao lưu từ xa (đám mây) an toàn hơn khi máy gốc gặp sự cố."],
    },

    /* Ghép thiết bị lưu trữ ↔ đặc điểm (Bảng 3.1) */
    {
      id: "thiet-bi-luu-tru", name: "Thiết bị lưu trữ — Ưu & nhược điểm", type: "knowledge",
      goal: "Ước lượng ưu/nhược của USB, đĩa quang, ổ cứng ngoài, đám mây (Bảng 3.1).",
      time: 240,
      task: "Đọc Bảng 3.1 (SGK tr.15). Sau đó sang màn sau ghép mỗi thiết bị với đặc điểm nổi bật của nó.",
      sgkImage: "assets/sgk/sgk-trang15.jpg",
      content: {
        heading: "🔌 So sánh các thiết bị lưu trữ",
        revealLabel: "🔍 Hiện bảng so sánh",
        blocks: [
          { kind: "html", value:
            '<table style="border-collapse:collapse;margin:6px auto;font-size:16px;min-width:560px">' +
            '<tr style="background:#0d9488;color:#fff"><th style="padding:8px 10px;border:1px solid #99f6e4">Thiết bị</th><th style="padding:8px 10px;border:1px solid #99f6e4">Ưu điểm</th><th style="padding:8px 10px;border:1px solid #99f6e4">Nhược điểm</th></tr>' +
            [["💿 Thẻ nhớ, USB","Nhỏ gọn, tiện, khá bền","Dễ thất lạc, dễ lây virus"],
             ["📀 Đĩa quang (CD, DVD)","Chi phí thấp, khó nhiễm virus","Dễ hỏng, dung lượng nhỏ, cần đầu ghi"],
             ["🗄️ Ổ cứng ngoài","Dung lượng lớn, tiện dùng","To nặng, hỏng nếu bị rơi"],
             ["☁️ Lưu trữ đám mây","Truy cập mọi nơi có Internet, sao lưu từ xa","Cần Internet, có thể bị tấn công"]]
              .map((r,i)=>`<tr style="background:${i%2?"#f0fdfa":"#fff"}"><td style="padding:7px 10px;border:1px solid #99f6e4;font-weight:700">${r[0]}</td><td style="padding:7px 10px;border:1px solid #99f6e4">${r[1]}</td><td style="padding:7px 10px;border:1px solid #99f6e4">${r[2]}</td></tr>`).join("") +
            '</table>' },
        ],
      },
    },
    {
      id: "ghep-thiet-bi", name: "Trò chơi: Ghép thiết bị ↔ đặc điểm", type: "matching",
      goal: "Củng cố đặc điểm nổi bật của từng thiết bị lưu trữ.",
      time: 180,
      task: "Nối mỗi thiết bị lưu trữ bên trái với đặc điểm nổi bật nhất bên phải.",
      sgkImage: "assets/sgk/sgk-trang15.jpg",
      pairs: [
        { left: "Thẻ nhớ, USB", right: "Nhỏ gọn nhưng dễ thất lạc" },
        { left: "Đĩa quang (CD, DVD)", right: "Chi phí thấp, dung lượng nhỏ" },
        { left: "Ổ cứng ngoài", right: "Dung lượng lớn, to nặng" },
        { left: "Lưu trữ đám mây", right: "Truy cập mọi nơi có Internet" },
      ],
      explanation: "Mỗi thiết bị có điểm mạnh riêng — chọn thiết bị phù hợp với nhu cầu sao lưu.",
    },

    /* Mật khẩu */
    {
      id: "mat-khau", name: "Tài khoản & mật khẩu mạnh", type: "knowledge",
      goal: "Biết đặt mật khẩu mạnh, tránh mật khẩu yếu.",
      time: 240,
      task: "Đọc mục b (SGK tr.15). Thảo luận: mật khẩu mạnh cần những gì? Sau đó phân loại mật khẩu ở màn sau.",
      sgkImage: "assets/sgk/sgk-trang15.jpg",
      content: {
        heading: "🔑 Mật khẩu — chìa khoá bảo vệ tài khoản",
        revealLabel: "🔍 Hiện quy tắc mật khẩu",
        blocks: [
          { kind: "html", value:
            '<div style="display:flex;gap:14px;flex-wrap:wrap;justify-content:center">' +
            '<div style="flex:1;min-width:240px;background:#ecfdf5;border:2px solid #16a34a;border-radius:14px;padding:12px"><div style="font-weight:800;color:#15803d">✅ Mật khẩu MẠNH</div><ul style="margin:6px 0 0;padding-left:20px;font-size:15px"><li>Dài ít nhất 8 kí tự</li><li>Có chữ số, chữ IN HOA, chữ thường, kí hiệu đặc biệt (@, #…)</li><li>Không phải một từ thông thường</li></ul></div>' +
            '<div style="flex:1;min-width:240px;background:#fef2f2;border:2px solid #dc2626;border-radius:14px;padding:12px"><div style="font-weight:800;color:#b91c1c">❌ Mật khẩu YẾU</div><ul style="margin:6px 0 0;padding-left:20px;font-size:15px"><li>Tên mình / tên người thân</li><li>Từ, cụm từ dễ đoán ("Hà Nội", "12345678")</li><li>Số điện thoại, ngày sinh</li></ul></div>' +
            '</div>' },
        ],
      },
      questions: [
        {
          question: "Mật khẩu nào sau đây là MẠNH nhất?",
          type: "multiple-choice",
          options: ["12345678", "AnMinhKhoa", "matkhau", "2n#M1nhKh0a"],
          answer: 3, explanation: "Chính xác! '2n#M1nhKh0a' đủ dài, có chữ hoa, chữ thường, chữ số và kí hiệu đặc biệt, lại không phải từ thông thường.",
          hint: "Mật khẩu mạnh trộn cả chữ hoa, chữ thường, số và kí hiệu đặc biệt.",
          level: "van-dung", activity: "mat-khau",
        },
      ],
    },
    {
      id: "phan-loai-mk", name: "Trò chơi: Mật khẩu Mạnh hay Yếu?", type: "dragdrop",
      goal: "Phân biệt mật khẩu mạnh và yếu.",
      time: 150,
      task: "Chọn từng mật khẩu rồi bấm vào nhóm 'Mạnh' hoặc 'Yếu'.",
      groups: ["Mạnh 💪", "Yếu ⚠️"],
      items: [
        { text: "2n#M1nhKh0a", group: 0 },
        { text: "Tr@ng2010!", group: 0 },
        { text: "12345678", group: 1 },
        { text: "hanoi", group: 1 },
        { text: "0987654321", group: 1 },
      ],
      explanation: "Mạnh = dài + trộn chữ hoa/thường/số/kí hiệu, khó đoán. Yếu = số điện thoại, ngày sinh, từ thường, tên riêng.",
    },

    /* Phần mềm diệt virus */
    {
      id: "diet-virus", name: "Phần mềm diệt virus", type: "knowledge",
      goal: "Biết vai trò của phần mềm diệt virus và cách dùng an toàn.",
      time: 180,
      task: "Đọc mục c (SGK tr.15). Trả lời: kể tên vài phần mềm độc hại; để dữ liệu an toàn cần làm gì?",
      sgkImage: "assets/sgk/sgk-trang15.jpg",
      content: {
        heading: "🦠 Chặn phần mềm độc hại",
        revealLabel: "🔍 Hiện nội dung",
        blocks: [
          { kind: "text", value: "Phần mềm độc hại (virus, sâu, phần mềm gián điệp…) có thể làm hỏng dữ liệu và chương trình. Phần mềm diệt virus giúp phát hiện và ngăn chặn chúng." },
          { kind: "list", value: [
            "Cài phần mềm diệt virus và để nó thường xuyên hoạt động, được cập nhật.",
            "Windows có sẵn Windows Defender; ngoài ra có Kaspersky, AVG, Bkav, Avast, Avira…",
            "KHÔNG cài đặt/dùng phần mềm không rõ nguồn gốc.",
          ] },
        ],
      },
      remember: [
        "Luôn bật phần mềm diệt virus và cập nhật thường xuyên.",
        "Không cài phần mềm không rõ nguồn gốc.",
      ],
    },

    /* ============= HĐ2.3: THỰC HÀNH — thao tác tệp/thư mục ============= */
    {
      id: "thuc-hanh-lenh", name: "Thực hành: Các lệnh quản lí thư mục", type: "knowledge",
      goal: "Nắm chức năng các lệnh trong File Explorer (New/Folder, Rename, Cut, Copy, Paste, Delete).",
      time: 240,
      task: "Quan sát menu chuột phải (Hình 3.6). Ghi nhớ chức năng từng lệnh rồi làm bài ghép ở màn sau.",
      sgkImage: "assets/sgk/sgk-trang17.jpg",
      content: {
        heading: "🖱️ Menu chuột phải trong File Explorer",
        revealLabel: "🔍 Hiện bảng lệnh",
        blocks: [
          { kind: "html", value:
            '<table style="border-collapse:collapse;margin:6px auto;font-size:17px;min-width:420px">' +
            '<tr style="background:#0d9488;color:#fff"><th style="padding:8px 14px;border:1px solid #99f6e4">Lệnh</th><th style="padding:8px 14px;border:1px solid #99f6e4">Chức năng</th></tr>' +
            [["New / Folder","Tạo thư mục mới"],["Rename","Đổi tên (phím tắt F2)"],["Cut","Di chuyển (đưa vào bộ nhớ) — Ctrl+X"],["Copy","Sao chép (vào bộ nhớ) — Ctrl+C"],["Paste","Dán từ bộ nhớ ra — Ctrl+V"],["Delete","Xoá thư mục / tệp"]]
              .map((r,i)=>`<tr style="background:${i%2?"#f0fdfa":"#fff"}"><td style="padding:7px 14px;border:1px solid #99f6e4;font-family:Consolas,monospace;font-weight:700;color:#0f766e">${r[0]}</td><td style="padding:7px 14px;border:1px solid #99f6e4">${r[1]}</td></tr>`).join("") +
            '</table>' },
          { kind: "text", value: "Nhiệm vụ thực hành (làm trên máy): tạo cây thư mục như Hình 3.3 → đổi tên 'HoangHon' thành 'ChieuToi' → di chuyển tệp/thư mục con của 'BinhMinh' sang 'BanNgay' → xoá thư mục 'BinhMinh'." },
        ],
      },
    },
    {
      id: "ghep-lenh", name: "Trò chơi: Ghép lệnh ↔ chức năng", type: "matching",
      goal: "Củng cố chức năng các lệnh quản lí tệp/thư mục.",
      time: 150,
      task: "Nối mỗi lệnh với chức năng đúng của nó.",
      pairs: [
        { left: "Rename", right: "Đổi tên thư mục" },
        { left: "Cut", right: "Di chuyển thư mục" },
        { left: "Copy", right: "Sao chép thư mục" },
        { left: "Paste", right: "Dán từ bộ nhớ ra" },
        { left: "Delete", right: "Xoá thư mục" },
      ],
      explanation: "Di chuyển = Cut → Paste; Sao chép = Copy → Paste; Đổi tên = Rename (F2); Xoá = Delete.",
    },
    {
      id: "sap-xep-tao-tm", name: "Sắp xếp: Các bước tạo thư mục", type: "ordering",
      goal: "Nắm đúng trình tự tạo và đặt tên thư mục mới.",
      time: 120,
      task: "Dùng ▲▼ sắp đúng thứ tự các bước tạo thư mục 'DuLich' trên màn hình nền, rồi bấm Kiểm tra.",
      steps: [
        "Nháy nút phải chuột lên màn hình nền",
        "Chọn New → Folder",
        "Một thư mục 'New Folder' được tạo ra",
        "Gõ tên mới 'DuLich' rồi nhấn Enter",
      ],
      explanation: "Chuột phải → New/Folder → xuất hiện 'New Folder' → gõ tên 'DuLich'.",
    },

    /* ===================== HĐ3: LUYỆN TẬP (Thu hoạch trứng gà) ===================== */
    {
      id: "luyen-tap", name: "Luyện tập — Thu hoạch trứng gà 🥚", type: "quiz",
      goal: "Củng cố toàn bài qua 8 câu trắc nghiệm.",
      time: 420,
      task: "Chia lớp 2 đội. Trả lời đúng mỗi câu = một quả trứng vào giỏ. Đội nhiều trứng hơn thắng!",
      questions: [
        { question: "Khi đặt tên thư mục và tệp để dễ tìm kiếm, em nên:", type: "multiple-choice",
          options: ["Đặt theo tên người thân/thú cưng", "Đặt sao cho dễ nhớ và biết trong đó chứa gì", "Đặt giống ví dụ SGK", "Đặt tuỳ ý, không quy tắc"],
          answer: 1, explanation: "Tên tốt là tên dễ nhớ và cho biết nội dung bên trong.", level: "nhan-biet", activity: "luyen-tap" },
        { question: "Tệp có phần mở rộng .exe thuộc loại tệp gì?", type: "multiple-choice",
          options: ["Không có loại tệp này", "Tệp chương trình máy tính", "Tệp dữ liệu Microsoft Word", "Tệp dữ liệu video"],
          answer: 1, explanation: ".exe là tệp chương trình máy tính.", level: "nhan-biet", activity: "luyen-tap" },
        { question: "Mật khẩu nào sau đây là mạnh nhất?", type: "multiple-choice",
          options: ["12345678", "AnMinhKhoa", "matkhau", "2n#M1nhKh0a"],
          answer: 3, explanation: "'2n#M1nhKh0a' trộn chữ hoa/thường/số/kí hiệu, khó đoán.", level: "thong-hieu", activity: "luyen-tap" },
        { question: "Hãy chọn phát biểu SAI.", type: "multiple-choice",
          options: ["Đám mây giúp tránh rơi, mất, hỏng dữ liệu", "Đĩa CD cần đầu ghi nhưng dung lượng rất lớn", "Ổ cứng ngoài vừa nhỏ gọn vừa dung lượng lớn", "Thẻ nhớ, USB dễ rơi mất nhưng thuận tiện"],
          answer: 2, explanation: "SAI: ổ cứng ngoài dung lượng lớn nhưng KHÔNG nhỏ gọn (to và nặng).", hint: "Nghĩ về kích thước ổ cứng ngoài.", level: "van-dung", activity: "luyen-tap" },
        { question: "Đâu là chương trình máy tính giúp em quản lí tệp và thư mục?", type: "multiple-choice",
          options: ["Internet Explorer", "Help", "Microsoft Word", "File Explorer"],
          answer: 3, explanation: "File Explorer là ứng dụng quản lí tệp/thư mục trong Windows.", level: "nhan-biet", activity: "luyen-tap" },
        { question: "Đâu là phần mềm bảo vệ máy tính tránh được virus?", type: "multiple-choice",
          options: ["Windows Defender", "Mozilla Firefox", "Microsoft Windows", "Microsoft Word"],
          answer: 0, explanation: "Windows Defender là phần mềm diệt virus có sẵn trong Windows.", level: "nhan-biet", activity: "luyen-tap" },
        { question: "Để TẠO một thư mục, thao tác đúng là:", type: "multiple-choice",
          options: ["Chuột phải → Sort by/Folder", "Chuột phải → View/Folder", "Chuột phải → New/Folder", "Chuột phải → Group by/Folder"],
          answer: 2, explanation: "Tạo thư mục: nháy chuột phải → chọn New/Folder.", level: "thong-hieu", activity: "luyen-tap" },
        { question: "Để ĐỔI TÊN một thư mục, thao tác đúng là:", type: "multiple-choice",
          options: ["Chuột phải → Rename", "Chuột phải → Cut", "Chuột phải → Delete", "Chuột phải → Copy"],
          answer: 0, explanation: "Đổi tên: chuột phải → Rename (hoặc phím F2).", level: "thong-hieu", activity: "luyen-tap" },
      ],
    },

    /* ===================== HĐ4: VẬN DỤNG ===================== */
    {
      id: "van-dung", name: "Vận dụng — Bảo vệ dữ liệu của em", type: "vandung",
      goal: "Áp dụng vào tình huống thực tế của bản thân.",
      time: 360,
      task: "Nhóm thảo luận 2 bài, ghi ra bảng nhóm rồi bấm để đối chiếu với hướng chốt của giáo viên.",
      sgkImage: "assets/sgk/sgk-trang17.jpg",
      intro: "Hai bài vận dụng — hãy tự đưa ra ý kiến và lí do trước khi xem gợi ý.",
      cases: [
        {
          question: "Em hãy chọn một thiết bị lưu trữ để sao lưu thư mục 'DuLich'. Giải thích vì sao em chọn cách đó.",
          answer: "Gợi ý: chọn sao lưu bằng công nghệ đám mây (Google Drive, OneDrive) vì có thể sao lưu từ xa, truy cập bằng bất kì máy có Internet, dung lượng khá lớn, không sợ thất lạc/hỏng như thiết bị vật lí. (Cũng có thể chọn ổ cứng ngoài/USB nếu không có Internet — miễn là giải thích hợp lí.)",
        },
        {
          question: "Sau khi học bài này, em có thay đổi cách bảo vệ dữ liệu đã chọn ở Hoạt động 2 không? Vì sao?",
          answer: "Gợi ý: Giữ cách dùng phần mềm diệt virus (hiệu quả, an toàn), đồng thời BỔ SUNG thêm sao lưu định kì (đám mây/ổ ngoài) và đặt mật khẩu mạnh. Kết hợp nhiều biện pháp thì dữ liệu được bảo vệ tốt hơn.",
        },
      ],
    },

    /* ===================== TỔNG KẾT ===================== */
    {
      id: "tong-ket", name: "Tổng kết", type: "summary",
      goal: "Chốt kiến thức trọng tâm của bài.",
      task: "Cùng nhắc lại 5 điều quan trọng và làm 2 thử thách cuối.",
      content: {
        learned: null,
        challenge: [
          { question: "Muốn DI CHUYỂN một thư mục sang nơi khác, em dùng cặp lệnh nào?", type: "multiple-choice",
            options: ["Copy → Paste", "Cut → Paste", "Rename → Delete", "New → Folder"],
            answer: 1, explanation: "Di chuyển = Cut (cắt) rồi Paste (dán) ở nơi mới. Copy→Paste là SAO CHÉP.", level: "thong-hieu", activity: "tong-ket" },
          { question: "Cách bảo vệ dữ liệu TỐT nhất là:", type: "multiple-choice",
            options: ["Chỉ cần đặt mật khẩu", "Chỉ cần diệt virus", "Chỉ cần sao lưu", "Kết hợp: sao lưu + mật khẩu + diệt virus"],
            answer: 3, explanation: "Chính xác! Kết hợp cả ba biện pháp mới bảo vệ dữ liệu an toàn nhất.", level: "van-dung", activity: "tong-ket" },
          { question: "Bạn Lan có bài dự án quan trọng, chỉ lưu duy nhất trong ổ C của máy ở nhà. Rủi ro lớn nhất và cách khắc phục hợp lí nhất là gì?", type: "multiple-choice",
            options: ["Không có rủi ro gì, ổ C rất an toàn", "Nếu máy hỏng/nhiễm virus sẽ mất trắng — nên sao lưu thêm lên đám mây hoặc USB", "Chỉ cần đổi tên tệp cho khó tìm", "Nên xoá bớt bài cho nhẹ máy"],
            answer: 1, explanation: "Chỉ có một bản duy nhất là rất rủi ro: máy hỏng/nhiễm virus là mất hết. Cần sao lưu ra nơi khác (đám mây/USB/ổ ngoài).", level: "van-dung-cao", activity: "tong-ket" },
        ],
      },
    },
  ],
};
if (typeof module !== "undefined" && module.exports) module.exports = LESSON;
if (typeof window !== "undefined") window.LESSON = LESSON;
