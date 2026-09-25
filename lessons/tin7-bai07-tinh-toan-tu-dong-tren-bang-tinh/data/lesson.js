/* ============================================================================
 * BÀI 7 — TÍNH TOÁN TỰ ĐỘNG TRÊN BẢNG TÍNH  (Tin học 7 — Kết nối tri thức với cuộc sống)
 * Chủ đề 4: Ứng dụng tin học. Bám sát SGK trang 34–38 + Kế hoạch bài dạy (2 tiết).
 * Bảng tính mô phỏng TÍNH ĐƯỢC CÔNG THỨC: câu sheet mode "formula" = HS gõ công thức vào ô,
 * chấm bằng cách thử đổi dữ liệu (dùng địa chỉ ô mới được tính đúng). Ctrl+C / Ctrl+V sao chép công thức.
 * ==========================================================================*/

// ---- Lưới bảng tính chép theo hình SGK ----
const SHEET_71 = { // Hình 7.1 + Hình 7.2 (gộp để HS bấm từng ô, xem vùng nhập dữ liệu)
  title: "Kiểu dữ liệu.xlsx", cols: 5, rows: 7,
  widths: { A: 1.3, B: 1.9, C: 0.5, D: 2.6, E: 0.9 },
  cells: {
    A2: "Họ tên", B2: "Nguyễn Văn Hùng", A3: "Ngày sinh", B3: "3/5/2010", A4: "Quê quán", B4: "Hải Phòng",
    A5: "Điểm Toán", B5: "8.5", A6: "Điểm Ngữ văn", B6: "9",
    D3: "Tam giác có các cạnh 2, 1.5, 2.5", D4: "Chu vi tam giác", E4: "=2+1.5+2.5",
  },
  bold: ["A2:A6"],
};
const BANG2 = { // Hình 7.9 — Bảng 2. Dự kiến số lượng cây cần trồng
  title: "THXanh.xlsx", cols: 5, rows: 7, sheets: ["1. Khảo sát", "2. Dự kiến số lượng cây"],
  widths: { A: 0.7, B: 1.6, C: 1, D: 1.1, E: 1.1 },
  cells: {
    A2: "Bảng 2. Dự kiến số lượng cây cần trồng",
    A3: "STT", B3: "Loại cây", C3: "Vị trí", D3: "Số lượng", E3: "Tổng số",
    A4: "1", B4: "Cây hoa", C4: "25", D4: "10",
    A5: "2", B5: "Cây ăn quả", C5: "20", D5: "5",
    A6: "3", B6: "Cây bóng mát", C6: "50", D6: "3",
  },
  bold: ["A2", "A3:E3"], fill: { "A3:E3": "#fde047" }, center: ["A3:A6"],
};
const withCells = (base, extra) => Object.assign({}, base, { cells: Object.assign({}, base.cells, extra) });
const SHEET_75 = { // Hình 7.5
  title: "Tam giác ABC", cols: 3, rows: 6, widths: { A: 0.6, B: 1.8, C: 1.2 },
  cells: { B2: "Thông tin tam giác ABC", B3: "AB", C3: "15", B4: "BC", C4: "10", B5: "CA", C5: "12", B6: "Nửa chu vi:" },
  bold: ["B2:B6"],
};
const SHEET_76 = { // Hình 7.6
  title: "Hình tròn", cols: 3, rows: 6, widths: { A: 0.6, B: 1.8, C: 1.3 },
  cells: { B2: "Thông tin hình tròn", B3: "Bán kính R", C3: "10.45", B4: "Pi", C4: "3.141593", B5: "Chu vi:", B6: "Diện tích:" },
  bold: ["B2:B6"],
};
const SHEET_710 = { // Hình 7.10 — Trang tính 3. Tìm hiểu giống cây
  title: "THXanh.xlsx", cols: 6, rows: 19, sheets: ["1. Khảo sát", "2. Dự kiến số lượng cây", "3. Tìm hiểu giống cây"],
  widths: { A: 0.6, B: 1.3, C: 1.7, D: 1, E: 1, F: 1.2 },
  cells: {
    A2: "3. Giá thành các loại cây",
    A3: "STT", B3: "Loại cây", C3: "Tên cây", D3: "Đơn giá", E3: "Số lượng", F3: "Thành tiền",
    A4: "1", B4: "Cây hoa", C4: "Hoa Mười giờ", D4: "25000", E4: "20",
    A5: "2", C5: "Hoa Dạ yến thảo", D5: "45000", E5: "23",
    A6: "3", C6: "Hoa Dừa cạn", D6: "15500", E6: "43",
    A7: "4", C7: "Hoa Cúc vàng", D7: "30500", E7: "33",
    A8: "5", C8: "Hoa Hồng", D8: "54000", E8: "32",
    A9: "6", B9: "Cây ăn quả", C9: "Bưởi", D9: "75000", E9: "21",
    A10: "7", C10: "Xoài", D10: "85000", E10: "17",
    A11: "8", C11: "Vú sữa", D11: "45000", E11: "19",
    A12: "9", C12: "Khế", D12: "34500", E12: "22",
    A13: "10", C13: "Chanh", D13: "25900", E13: "20",
    A14: "11", C14: "Táo", D14: "38500", E14: "32",
    A15: "12", B15: "Cây bóng mát", C15: "Bằng lăng", D15: "54600", E15: "11",
    A16: "13", C16: "Phượng vĩ", D16: "72500", E16: "14",
    A17: "14", C17: "Bàng", D17: "80000", E17: "20",
    A18: "15", C18: "Sưa đỏ", D18: "120000", E18: "15",
    A19: "16", C19: "Muồng", D19: "65000", E19: "16",
  },
  bold: ["A2", "A3:F3"], fill: { "A3:F3": "#fde047" }, center: ["A3:A19"],
};
const SHEET_711 = { // Hình 7.11 — Diện tích phủ rừng
  title: "Dientichrung.xlsx", cols: 4, rows: 8, widths: { A: 1.6, B: 1.5, C: 1.4, D: 1.6 },
  cells: {
    A1: "DIỆN TÍCH PHỦ RỪNG CÁC TỈNH VÙNG ĐÔNG BẮC", A2: "Đơn vị tính: ha",
    A3: "Tỉnh", B3: "Rừng tự nhiên", C3: "Rừng trồng", D3: "Tổng diện tích",
    A4: "Tuyên Quang", B4: "233.193", C4: "191.496",
    A5: "Cao Bằng", B5: "353.259", C5: "20.026",
    A6: "Lạng Sơn", B6: "293.601", C6: "238.055",
    A7: "Quảng Ninh", B7: "122.657", C7: "247.68",
    A8: "Thái Nguyên", B8: "76.481", C8: "111.064",
  },
  bold: ["A1", "A3:D3", "A4:A8"], color: { A1: "#dc2626", "A4:A8": "#ffffff" },
  fill: { "A3:D3": "#fde047", "A4:A8": "#991b1b", "B4:C8": "#4ade80" }, center: ["A3:D3", "B4:C8"],
};

const LESSON = {
  meta: {
    subject: "Tin học", grade: "7", book: "Kết nối tri thức với cuộc sống",
    title: "Bài 7: Tính toán tự động trên bảng tính", unit: "Chủ đề 4 — Ứng dụng tin học",
    pages: "34–38", durationMinutes: 90,
  },
  objectives: {
    knowledge: [
      "Nhận biết được một số kiểu dữ liệu trên bảng tính.",
      "Sử dụng được công thức và dùng được địa chỉ trong công thức; tạo được bảng tính đơn giản có số liệu tính toán bằng công thức.",
      "Giải thích được việc đưa công thức vào bảng tính là một cách điều khiển tính toán tự động trên dữ liệu.",
    ],
    competencies: [
      "Tự học; giao tiếp và hợp tác; giải quyết vấn đề và sáng tạo.",
      "Năng lực số 3.1.TC1a: nhập công thức bắt đầu bằng dấu =, dùng địa chỉ ô, phép toán + − * /; sao chép công thức; hiểu kết quả tự cập nhật.",
      "Năng lực AI: dùng AI giải thích, kiểm tra công thức — luôn kiểm chứng lại trên bảng tính.",
    ],
    qualities: ["Nhân ái, chăm chỉ, trung thực, trách nhiệm."],
  },
  coreKnowledge: [
    "Dữ liệu trong ô tính có thể thuộc kiểu văn bản, số, ngày tháng và công thức.",
    "Công thức luôn bắt đầu bằng dấu “=”, sau đó là biểu thức: + − * / ^ và dấu ngoặc tròn; thứ tự tính như trong toán học.",
    "Dùng ĐỊA CHỈ Ô trong công thức (VD =C4*D4) thì khi dữ liệu thay đổi, kết quả TỰ ĐỘNG cập nhật.",
    "Sao chép công thức (Ctrl+C → chọn ô đích → Ctrl+V): địa chỉ tự điều chỉnh, giữ nguyên vị trí tương đối (E4: =C4*D4 → E6: =C6*D6).",
  ],
  keywords: ["Kiểu dữ liệu", "Công thức “=”", "Địa chỉ ô", "Sao chép công thức"],
  settings: { basePoints: 100, useTimer: false, defaultTime: 60, sound: true, streakEnabled: true },

  activities: [
    /* ===================== HĐ1: MỞ ĐẦU (8 phút) ===================== */
    {
      id: "mo-dau", name: "Mở đầu — Dự án Trường học xanh cần tính toán gì? 🌳", type: "knowledge",
      goal: "HS thấy nhu cầu dùng phép tính, công thức trong bảng tính khi thực hiện dự án.",
      time: 300,
      task: "Thảo luận cặp đôi: Trong dự án Trường học xanh, em có cần tính toán không? Nếu cần thì dùng những phép toán nào?",
      sgkImage: "assets/sgk/sgk-trang34.jpg",
      content: {
        heading: "🌳 Dự án Trường học xanh cần tính toán gì?",
        prompt: "Tổng số cây cần trồng? Tổng tiền mua cây? … Có thể nhập dữ liệu là công thức tính toán vào bảng tính được không?",
        revealLabel: "🔍 Thầy/cô chốt",
        blocks: [
          { kind: "html", value: '<div style="display:flex;flex-wrap:wrap;gap:10px;font-size:1.6rem;font-weight:900;justify-content:center">'
            + [["+", "cộng"], ["−", "trừ"], ["*", "nhân"], ["/", "chia"], ["^", "luỹ thừa"]].map(([k, n]) => `<div style="background:#ecfdf5;border:3px solid #34d399;border-radius:16px;padding:8px 18px;text-align:center">${k}<div style="font-size:1rem;font-weight:700">${n}</div></div>`).join("")
            + '</div><p style="font-size:1.2rem;text-align:center">Dự án cần tính toán rất nhiều → dùng <b>công thức</b> của phần mềm bảng tính để tính nhanh và tự cập nhật!</p>' },
        ],
      },
      questions: [
        { question: "Tính “Tổng số cây hoa” = số vị trí × số cây ở mỗi vị trí. Trong phần mềm bảng tính, phép NHÂN được kí hiệu bằng dấu nào?", type: "multiple-choice",
          options: ["x", "^", ":", "*"],
          answer: 3, explanation: "Trong bảng tính: nhân là *, chia là /, luỹ thừa là ^ (Bảng 7.1).",
          level: "nhan-biet", activity: "mo-dau" },
      ],
    },

    /* ===================== HĐ2.1: KIỂU DỮ LIỆU (10 phút) ===================== */
    {
      id: "kieu-du-lieu", name: "1. Kiểu dữ liệu trên bảng tính 🔤", type: "knowledge",
      goal: "Nhận biết các kiểu dữ liệu: văn bản, số, ngày tháng, công thức.",
      time: 300,
      task: "Nhóm: bấm vào từng ô trong BẢNG TÍNH THỬ (giống Hình 7.1, 7.2), quan sát vùng nhập dữ liệu. Bảng tính nhận biết được kiểu dữ liệu nào? Mỗi kiểu thể hiện thế nào?",
      sgkImage: "assets/sgk/hinh-7-1-7-2.jpg",
      sandbox: Object.assign({}, SHEET_71, { intro: "🧪 Bấm ô B3, B5, E4… — nhìn vùng nhập dữ liệu (fx). Ô E4 hiện 6 nhưng bên trong là công thức =2+1.5+2.5. Thử sửa E4 thành =2*3 rồi Enter!" }),
      content: {
        heading: "🔤 Kiểu dữ liệu trên bảng tính",
        revealLabel: "🔍 Hiện kiến thức",
        blocks: [
          { kind: "image", value: "assets/sgk/hinh-7-1-7-2.jpg", caption: "Hình 7.1. Dữ liệu văn bản, số, ngày tháng · Hình 7.2. Dữ liệu là biểu thức toán học bắt đầu bằng dấu “=”" },
          { kind: "list", value: [
            "Khi nhập dữ liệu, phần mềm tự động nhận biết kiểu dữ liệu và hiển thị theo khuôn dạng mặc định: văn bản, số, ngày tháng,…",
            "Công thức có dạng biểu thức toán học nhập trực tiếp vào ô: gõ dấu “=” đầu tiên, sau đó gõ biểu thức.",
            "Phép toán: cộng (+), trừ (−), nhân (*), chia (/), luỹ thừa (^); có thể dùng dấu ngoặc tròn; thứ tự thực hiện như trong toán học.",
          ] },
          { kind: "image", value: "assets/sgk/bang-7-1.jpg", caption: "Bảng 7.1. Một số kí hiệu phép toán dùng trong phần mềm bảng tính" },
        ],
      },
      questions: [
        { question: "Công thức tính tổng điểm Toán và Ngữ văn của bạn Nguyễn Văn Hùng (8.5 và 9) được nhập vào ô là:", type: "multiple-choice",
          options: ["8.5+9", "8.5+9=", "= 8.5 9", "=8.5+9"],
          answer: 3, explanation: "Công thức luôn bắt đầu bằng dấu “=”, sau đó là biểu thức: =8.5+9.",
          level: "thong-hieu", activity: "kieu-du-lieu" },
      ],
      remember: ["Dữ liệu trong ô tính có thể thuộc kiểu văn bản, số, ngày tháng và công thức.", "Công thức luôn bắt đầu bằng dấu “=”, sau đó là biểu thức toán học."],
    },
    {
      id: "phan-loai-kieu", name: "Trò chơi: Dữ liệu này thuộc kiểu nào? 🗂️", type: "dragdrop",
      goal: "Phân biệt 4 kiểu dữ liệu trên bảng tính.",
      time: 180,
      task: "Xếp mỗi dữ liệu vào đúng kiểu dữ liệu. Xếp hết rồi bấm Nộp bài.",
      groups: ["🔤 Văn bản", "🔢 Số", "📅 Ngày tháng", "🧮 Công thức"],
      items: [
        { text: "Nguyễn Văn Hùng", group: 0 },
        { text: "8.5", group: 1 },
        { text: "3/5/2010", group: 2 },
        { text: "=2+1.5+2.5", group: 3 },
        { text: "Hải Phòng", group: 0 },
        { text: "250", group: 1 },
        { text: "=C4*D4", group: 3 },
        { text: "12/15/2020", group: 2 },
      ],
      explanation: "Văn bản: chữ; số: chữ số; ngày tháng: dạng tháng/ngày/năm; công thức: bắt đầu bằng dấu “=”.",
    },
    {
      id: "phep-toan", name: "Ghép phép toán — kí hiệu trong bảng tính ➕", type: "matching",
      goal: "Nắm kí hiệu phép toán trong phần mềm bảng tính (Bảng 7.1).",
      time: 150,
      task: "Ghép mỗi phép toán với kí hiệu và ví dụ trong phần mềm bảng tính. Làm hết rồi bấm Nộp bài.",
      sgkImage: "assets/sgk/bang-7-1.jpg",
      pairs: [
        { left: "Phép cộng (+)", right: "+   VD: 20 + 7" },
        { left: "Phép trừ (−)", right: "−   VD: 42 − 35" },
        { left: "Phép nhân (×)", right: "*   VD: 7*9" },
        { left: "Phép chia (:)", right: "/   VD: 35/7" },
        { left: "Phép luỹ thừa (aˣ)", right: "^   VD: 5^3" },
      ],
      explanation: "Nhân dùng *, chia dùng /, luỹ thừa dùng ^.",
    },
    {
      id: "cong-thuc-sai", name: "Thử thách: Công thức nào sai? 🕵️", type: "quiz",
      goal: "Nhận biết công thức viết đúng / sai cú pháp.",
      time: 180,
      task: "Theo nhóm: tìm các công thức SAI và giải thích vì sao. Có thể gõ thử vào bảng tính thử để kiểm chứng!",
      sgkImage: "assets/sgk/sgk-trang35.jpg",
      sandbox: { title: "Gõ thử công thức", cols: 3, rows: 5, widths: { A: 1.8, B: 1.4, C: 1 }, cells: { A1: "Gõ thử công thức:", A2: "Công thức A", A3: "Công thức B", A4: "Công thức C", A5: "Công thức D" }, bold: ["A1"], intro: "🧪 Gõ từng công thức vào cột B (VD: =5^2+6*101) rồi Enter — công thức sai sẽ báo #LỖI!" },
      questions: [
        { question: "Trong phần mềm bảng tính, những công thức nào dưới đây SAI? (chọn tất cả)", type: "multiple-select",
          options: ["= 5^2 + 6*101", "= 6*(3 + 2))", "= 2(3 + 4)", "= 1^2 + 2^2"],
          answer: [1, 2], explanation: "B sai: 1 ngoặc mở nhưng 2 ngoặc đóng. C sai: thiếu dấu phép tính giữa 2 và (3+4) (phải viết 2*(3+4)).",
          level: "thong-hieu", activity: "cong-thuc-sai" },
        { question: "Công thức =5^2+6*101 cho kết quả bằng bao nhiêu?", type: "multiple-choice",
          options: ["3131", "631", "656", "5252"],
          answer: 1, explanation: "Luỹ thừa trước, rồi nhân, rồi cộng: 5^2 = 25; 6*101 = 606; 25 + 606 = 631.",
          level: "van-dung", activity: "cong-thuc-sai" },
      ],
    },

    /* ===================== HĐ2.2: CÔNG THỨC TRONG BẢNG TÍNH (7 phút) ===================== */
    {
      id: "cong-thuc-dia-chi", name: "2. Công thức dùng địa chỉ ô ⚡", type: "knowledge",
      goal: "Nhập công thức dùng địa chỉ ô; hiểu tính toán tự động khi dữ liệu thay đổi.",
      time: 300,
      task: "Trên BẢNG TÍNH THỬ: ô E4 dùng cách 1 (=25*10), ô F4 dùng cách 2 (=C4*D4). Sửa C4 thành 30 rồi Enter — ô nào tự cập nhật? Sau đó tự nhập công thức vào ô E4 của câu hỏi.",
      sgkImage: "assets/sgk/hinh-7-3-7-4.jpg",
      sheet: BANG2,
      sandbox: { title: "So sánh 2 cách", cols: 6, rows: 4, widths: { A: 0.5, B: 1.3, C: 0.9, D: 1, E: 1.3, F: 1.3 },
        cells: { B3: "Loại cây", C3: "Vị trí", D3: "Số lượng", E3: "Cách 1: =25*10", F3: "Cách 2: =C4*D4", B4: "Cây hoa", C4: "25", D4: "10", E4: "=25*10", F4: "=C4*D4" },
        bold: ["B3:F3"], fill: { "B3:F3": "#fde047" }, intro: "🧪 Chọn ô C4, gõ 30 rồi Enter. Quan sát E4 (cách 1) và F4 (cách 2)." },
      content: {
        heading: "⚡ Công thức dùng địa chỉ ô — tính toán tự động",
        revealLabel: "🔍 Hiện kiến thức",
        blocks: [
          { kind: "image", value: "assets/sgk/hinh-7-3-7-4.jpg", caption: "Hình 7.3. Công thức (cách 1) · Hình 7.4. Công thức (cách 2)" },
          { kind: "list", value: [
            "Cách 1: nhập =25*10 (giá trị số lấy từ C4, D4). Khi dữ liệu C4 hoặc D4 thay đổi, kết quả E4 KHÔNG thay đổi.",
            "Cách 2: nhập =C4*D4 (địa chỉ ô). Sửa dữ liệu C4 hoặc D4 thì kết quả E4 luôn được cập nhật đúng — tính toán tự động.",
          ] },
          { kind: "html", value: '<div style="background:#fff7ed;border-left:6px solid #f59e0b;border-radius:10px;padding:10px 16px;font-size:1.2rem">Khi nhập công thức vào ô tính, nếu tính toán với giá trị từ các ô dữ liệu khác thì trong công thức cần ghi <b>địa chỉ của ô dữ liệu</b> tương ứng. Phần mềm bảng tính sẽ <b>tự động tính toán và cập nhật</b> kết quả nếu có thay đổi.</div>' },
        ],
      },
      questions: [
        { question: "Nhập công thức tính Tổng số cây hoa vào ô E4 (dùng địa chỉ ô để kết quả tự cập nhật).", type: "sheet", mode: "formula", target: "E4", answer: "=C4*D4",
          explanation: "Tổng số = Vị trí × Số lượng → =C4*D4. Dùng địa chỉ ô nên khi C4, D4 thay đổi, E4 tự cập nhật (=25*10 không tự cập nhật).",
          hint: "Vị trí ở ô C4, số lượng ở ô D4; công thức bắt đầu bằng dấu =.",
          level: "van-dung", activity: "cong-thuc-dia-chi" },
        { question: "Ô E4 chứa =25*10. Em sửa ô C4 từ 25 thành 30. Kết quả ở E4 là:", type: "multiple-choice",
          options: ["250 — không thay đổi", "300", "30", "Báo lỗi"],
          answer: 0, explanation: "Công thức =25*10 chỉ có số, không có địa chỉ ô nên không tự cập nhật — vẫn là 250.",
          level: "thong-hieu", activity: "cong-thuc-dia-chi" },
      ],
      remember: ["Dùng địa chỉ ô trong công thức (=C4*D4) → dữ liệu thay đổi, kết quả tự động cập nhật."],
    },
    {
      id: "tam-giac-hinh-tron", name: "Luyện nhập công thức: tam giác & hình tròn 📐", type: "quiz",
      goal: "Viết công thức dùng địa chỉ ô cho bài toán cho trước (Hình 7.5, 7.6).",
      time: 300,
      task: "Theo nhóm: nhập công thức tính nửa chu vi tam giác ABC (ô C6); chu vi (ô C5) và diện tích (ô C6) hình tròn — dùng địa chỉ ô.",
      sgkImage: "assets/sgk/hinh-7-5-7-6.jpg",
      questions: [
        { question: "Hình 7.5: nhập công thức tính NỬA CHU VI tam giác ABC vào ô C6.", type: "sheet", mode: "formula", target: "C6", answer: "=(C3+C4+C5)/2", sheet: SHEET_75,
          explanation: "Nửa chu vi = (AB + BC + CA) : 2 → =(C3+C4+C5)/2. Nhớ dùng ngoặc tròn!",
          hint: "Cộng 3 cạnh trong ngoặc tròn rồi chia 2.",
          level: "van-dung", activity: "tam-giac-hinh-tron" },
        { question: "Hình 7.6: nhập công thức tính CHU VI hình tròn vào ô C5 (C = 2 × Pi × R).", type: "sheet", mode: "formula", target: "C5", answer: "=2*C4*C3", sheet: SHEET_76,
          explanation: "Chu vi = 2 × Pi × R → =2*C4*C3 (Pi ở C4, bán kính ở C3).",
          level: "van-dung", activity: "tam-giac-hinh-tron" },
        { question: "Hình 7.6: nhập công thức tính DIỆN TÍCH hình tròn vào ô C6 (S = Pi × R²).", type: "sheet", mode: "formula", target: "C6", answer: "=C4*C3*C3", sheet: SHEET_76,
          explanation: "Diện tích = Pi × R × R → =C4*C3*C3 (hoặc =C4*C3^2).",
          level: "van-dung-cao", activity: "tam-giac-hinh-tron" },
      ],
    },

    /* ===================== HĐ2.3: SAO CHÉP Ô TÍNH CHỨA CÔNG THỨC (8 phút) ===================== */
    {
      id: "sao-chep", name: "3. Sao chép ô tính chứa công thức 📋", type: "knowledge",
      goal: "Sao chép công thức; hiểu địa chỉ tự điều chỉnh giữ vị trí tương đối.",
      time: 300,
      task: "Ô E4 đã có =C4*D4. Hãy SAO CHÉP ô E4 xuống E5:E6 (Ctrl+C → chọn E5:E6 → Ctrl+V, hoặc nút 📋 📥) rồi bấm vào E6 xem công thức đã đổi thế nào.",
      sgkImage: "assets/sgk/hinh-7-7-7-8.jpg",
      sheet: withCells(BANG2, { E4: "=C4*D4" }),
      content: {
        heading: "📋 Sao chép ô tính chứa công thức",
        revealLabel: "🔍 Hiện các bước & kiến thức",
        blocks: [
          { kind: "image", value: "assets/sgk/hinh-7-7-7-8.jpg", caption: "Hình 7.7. Nhập công thức tại ô E4 · Hình 7.8. Sao chép công thức xuống các ô E5, E6" },
          { kind: "list", value: [
            "Bước 1. Chọn ô tính chứa công thức cần sao chép (ô E4).",
            "Bước 2. Nhấn Ctrl+C để sao chép.",
            "Bước 3. Đánh dấu vùng muốn sao chép đến (E5:E6).",
            "Bước 4. Nhấn Ctrl+V để dán.",
          ] },
          { kind: "html", value: '<div style="background:#fff7ed;border-left:6px solid #f59e0b;border-radius:10px;padding:10px 16px;font-size:1.2rem">Khi sao chép một ô có công thức chứa địa chỉ, các địa chỉ được <b>điều chỉnh để giữ nguyên vị trí tương đối</b> giữa ô chứa công thức và ô có địa chỉ trong công thức. VD: E4 =C4*D4 → E6 =C6*D6 (C6 vẫn ở bên trái 2 ô, D6 bên trái 1 ô).</div>' },
        ],
      },
      questions: [
        { question: "Sao chép công thức của ô E4 xuống các ô E5, E6 để tính Tổng số cho các loại cây còn lại.", type: "sheet", mode: "formula", target: "E5:E6", answer: "=C5*D5",
          explanation: "Sau khi sao chép: E5 = C5*D5, E6 = C6*D6 — địa chỉ tự điều chỉnh, kết quả 100 và 150.",
          hint: "Chọn E4 → Ctrl+C (📋) → kéo chọn E5:E6 → Ctrl+V (📥).",
          level: "van-dung", activity: "sao-chep" },
        { question: "Sao chép công thức =C4*D4 từ ô E4 sang ô E10 thì công thức tại ô E10 là:", type: "multiple-choice",
          options: ["=C4*D4", "=C10*D10", "=E10*D10", "=C10*D4"],
          answer: 1, explanation: "Dời xuống 6 hàng → mọi địa chỉ tăng 6 hàng: =C10*D10.",
          level: "van-dung", activity: "sao-chep" },
        { question: "Ô G10 có công thức =H10 + 2*K10. Sao chép công thức này đến ô G12 thì công thức là:", type: "multiple-choice",
          options: ["=H10 + 2*K10", "=H12 + 2*K10", "=H12 + 2*K12", "=H12 + 4*K12"],
          answer: 2, explanation: "Dời xuống 2 hàng: H10 → H12, K10 → K12; số 2 giữ nguyên → =H12 + 2*K12.",
          level: "van-dung-cao", activity: "sao-chep" },
      ],
      remember: ["Sao chép công thức: địa chỉ tự điều chỉnh để giữ nguyên vị trí tương đối.", "Chức năng tính toán tự động còn được thể hiện khi sao chép công thức."],
    },
    {
      id: "cac-buoc-sao-chep", name: "Sắp xếp các bước sao chép công thức 🪜", type: "ordering",
      goal: "Nắm quy trình sao chép ô tính chứa công thức.",
      time: 120,
      task: "Sắp xếp các bước sao chép công thức từ ô E4 xuống E5:E6 theo đúng thứ tự rồi bấm Nộp bài.",
      steps: [
        "Chọn ô tính chứa công thức cần sao chép (ô E4)",
        "Nhấn tổ hợp phím Ctrl+C",
        "Đánh dấu vùng muốn sao chép đến (E5:E6)",
        "Nhấn tổ hợp phím Ctrl+V để dán",
      ],
      explanation: "Chọn ô → Ctrl+C → chọn vùng đích → Ctrl+V.",
    },

    /* ===================== HĐ2.4: THỰC HÀNH (12 phút) ===================== */
    {
      id: "thuc-hanh", name: "4. Thực hành: Dự kiến số lượng cây cần trồng 🌱", type: "knowledge",
      goal: "Tạo trang tính, nhập dữ liệu, thiết lập công thức và sao chép công thức cho Bảng 2.",
      time: 720,
      task: "Trên Excel: mở THXanh.xlsx, tạo trang tính “2. Dự kiến số lượng cây”, nhập dữ liệu như Hình 7.9, nhập =C4*D4 vào E4 rồi sao chép xuống E5, E6; ô E7 nhập =E4+E5+E6; định dạng và lưu. Máy không có Excel làm trên bảng tính mô phỏng.",
      sgkImage: "assets/sgk/sgk-trang37.jpg",
      sheet: withCells(BANG2, { E4: "=C4*D4", E5: "=C5*D5", E6: "=C6*D6" }),
      content: {
        heading: "🌱 Nhập thông tin dự kiến số lượng cây cần trồng",
        image: "assets/sgk/hinh-7-9.jpg", imageCaption: "Hình 7.9. Trang tính 2. Dự kiến số lượng cây",
        revealLabel: "🔍 Hướng dẫn các bước",
        blocks: [
          { kind: "list", value: [
            "Bước 1. Mở tệp THXanh.xlsx.",
            "Bước 2. Nháy nút ⊕ ở vùng tên trang tính để tạo trang tính mới, đặt tên “2. Dự kiến số lượng cây”, nhập dữ liệu như Hình 7.9.",
            "Bước 3. Nhập công thức =C4*D4 vào ô E4, sao chép xuống các ô E5 và E6.",
            "Bước 4. Tại ô E7 nhập công thức =E4+E5+E6 tính tổng của cả ba loại cây.",
            "Bước 5. Chữ đậm, nền vàng cho ô A2 và hàng tiêu đề (hàng 3); cột STT căn giữa; điều chỉnh độ rộng cột.",
            "Bước 6. Lưu lại kết quả.",
          ] },
        ],
      },
      questions: [
        { question: "Nhập công thức vào ô E7 để tính tổng số cây của cả ba loại cây dự kiến trồng.", type: "sheet", mode: "formula", target: "E7", answer: "=E4+E5+E6",
          explanation: "E7 = E4 + E5 + E6 = 250 + 100 + 150 = 500 cây.",
          level: "van-dung", activity: "thuc-hanh" },
      ],
    },

    /* ===================== HĐ3: LUYỆN TẬP (23 phút) ===================== */
    {
      id: "luyen-tap", name: "Luyện tập: Trang tính 3. Tìm hiểu giống cây 💰", type: "knowledge",
      goal: "Nhập công thức Thành tiền và sao chép cho cả bảng (SGK tr.38).",
      time: 900,
      task: "Câu 1 (trên Excel): tạo trang tính “3. Tìm hiểu giống cây”, nhập và định dạng như Hình 7.10. Câu 2: nhập =D4*E4 vào ô F4 rồi sao chép xuống F5:F19 để tính cột Thành tiền.",
      sgkImage: "assets/sgk/sgk-trang38.jpg",
      sheet: SHEET_710,
      content: {
        heading: "💰 Tính cột Thành tiền cho 16 loại cây",
        image: "assets/sgk/hinh-7-10.jpg", imageCaption: "Hình 7.10. Trang tính 3. Tìm hiểu giống cây",
      },
      questions: [
        { question: "Tính cột Thành tiền: nhập công thức vào ô F4, rồi sao chép xuống F5:F19 (Thành tiền = Đơn giá × Số lượng).", type: "sheet", mode: "formula", target: "F4:F19", answer: "=D4*E4",
          explanation: "F4 = D4*E4 = 500 000; sao chép xuống: F5 = D5*E5, …, F19 = D19*E19.",
          hint: "Nhập =D4*E4 vào F4, Enter. Chọn lại F4 → 📋 Sao chép → kéo chọn F5:F19 → 📥 Dán.",
          level: "van-dung", activity: "luyen-tap" },
      ],
    },
    {
      id: "thu-thach", name: "Thử thách nhanh — Gieo mầm Trường học xanh 🌱", type: "penguin",
      pet: "🌱", homeIcon: "🌳", saveWord: "mầm cây lớn thành cây xanh",
      winText: "Cả vườn cây của dự án Trường học xanh đã xanh tốt!",
      intro: "Mỗi câu trả lời đúng giúp một mầm cây của dự án lớn thành cây xanh!",
      goal: "Củng cố kiểu dữ liệu, công thức, địa chỉ ô, sao chép công thức.",
      time: 240,
      task: "Trả lời nhanh các câu hỏi — cùng làm cho vườn cây xanh tốt!",
      questions: [
        { question: "Công thức trong bảng tính luôn bắt đầu bằng:", type: "multiple-choice",
          options: ["Chữ cái", "Dấu “+”", "Dấu “*”", "Dấu “=”"], answer: 3,
          explanation: "Công thức luôn bắt đầu bằng dấu “=”.", level: "nhan-biet", activity: "thu-thach" },
        { question: "Kí hiệu phép chia trong phần mềm bảng tính là:", type: "multiple-choice",
          options: [":", "÷", "/", "\\"], answer: 2,
          explanation: "Phép chia dùng dấu “/”, VD 35/7.", level: "nhan-biet", activity: "thu-thach" },
        { question: "Vì sao nên dùng =C4*D4 thay cho =25*10?", type: "multiple-choice",
          options: ["Vì gõ ngắn hơn", "Vì khi dữ liệu ở C4, D4 thay đổi, kết quả tự động cập nhật", "Vì =25*10 cho kết quả sai", "Vì phần mềm không cho nhập số vào công thức"], answer: 1,
          explanation: "Dùng địa chỉ ô → tính toán tự động khi dữ liệu thay đổi.", level: "thong-hieu", activity: "thu-thach" },
        { question: "Ô B2 có công thức =A2*2. Sao chép ô B2 sang ô B5 thì công thức ở B5 là:", type: "multiple-choice",
          options: ["=A2*2", "=A5*5", "=A5*2", "=B5*2"], answer: 2,
          explanation: "Dời xuống 3 hàng: A2 → A5; số 2 giữ nguyên → =A5*2.", level: "van-dung", activity: "thu-thach" },
        { question: "Ô C1 có công thức =A1+B1. Sao chép sang ô D1 (sang phải 1 cột) thì công thức ở D1 là:", type: "multiple-choice",
          options: ["=B1+C1", "=A1+B1", "=A2+B2", "=B2+C2"], answer: 0,
          explanation: "Dời sang phải 1 cột: A → B, B → C; hàng giữ nguyên → =B1+C1.", level: "van-dung-cao", activity: "thu-thach" },
      ],
    },

    /* ===================== HĐ4: VẬN DỤNG (20 phút) ===================== */
    {
      id: "van-dung-1", name: "Vận dụng 1: Thay đổi cách căn lề ↔️", type: "vandung",
      goal: "Biết có thể thay đổi cách căn lề dữ liệu bằng lệnh nhóm Alignment.",
      time: 180,
      task: "Trả lời Bài 1 (SGK tr.38), gửi cho thầy/cô.",
      sgkImage: "assets/sgk/sgk-trang38.jpg",
      intro: "Gửi câu trả lời rồi bấm để xem hướng chốt.",
      cases: [
        { question: "Phần mềm bảng tính mặc định căn phải dữ liệu số và ngày tháng, căn trái dữ liệu văn bản. Em có thể thay đổi lại cách căn lề cho dữ liệu số, ngày tháng và văn bản được không? Nếu có thì bằng lệnh nào?",
          answer: "Có. Chọn ô/vùng dữ liệu rồi dùng các lệnh căn lề trong nhóm lệnh Alignment của thẻ Home: căn trái, căn giữa, căn phải (theo chiều ngang) và căn trên, giữa, dưới (theo chiều dọc)." },
      ],
    },
    {
      id: "van-dung-2", name: "Vận dụng 2: Diện tích phủ rừng vùng Đông Bắc 🌲", type: "knowledge",
      goal: "Nhập công thức tổng diện tích và sao chép cho các tỉnh; lưu tệp Dientichrung.xlsx.",
      time: 900,
      task: "Tạo bảng tính như Hình 7.11, nhập công thức tính tổng diện tích rừng cho tỉnh Tuyên Quang rồi sao chép cho các tỉnh còn lại. Lưu tệp Dientichrung.xlsx (làm trên Excel; hoặc trên bảng tính mô phỏng).",
      sgkImage: "assets/sgk/hinh-7-11.jpg",
      sheet: SHEET_711,
      content: {
        heading: "🌲 Diện tích phủ rừng các tỉnh vùng Đông Bắc",
        image: "assets/sgk/hinh-7-11.jpg", imageCaption: "Hình 7.11. Dữ liệu diện tích rừng",
      },
      questions: [
        { question: "Nhập công thức tính Tổng diện tích rừng của Tuyên Quang vào ô D4, rồi sao chép cho các tỉnh còn lại (D5:D8).", type: "sheet", mode: "formula", target: "D4:D8", answer: "=B4+C4",
          explanation: "Tổng diện tích = Rừng tự nhiên + Rừng trồng → D4 = B4+C4; sao chép xuống: D5 = B5+C5, …, D8 = B8+C8.",
          hint: "Nhập =B4+C4 vào D4 → 📋 Sao chép → chọn D5:D8 → 📥 Dán.",
          level: "van-dung", activity: "van-dung-2" },
      ],
    },

    /* ===================== TỔNG KẾT ===================== */
    {
      id: "tong-ket", name: "Tổng kết", type: "summary",
      task: "Cả lớp nhắc lại kiến thức cần nhớ và làm thử thách cuối.",
      content: {
        learned: [
          "Dữ liệu trong ô tính: văn bản, số, ngày tháng và công thức.",
          "Công thức bắt đầu bằng dấu “=”; phép toán + − * / ^ và ngoặc tròn.",
          "Dùng địa chỉ ô trong công thức → kết quả tự động cập nhật khi dữ liệu thay đổi.",
          "Sao chép công thức: địa chỉ tự điều chỉnh, giữ nguyên vị trí tương đối.",
        ],
        challenge: [
          { question: "Nhập vào ô C2 công thức tính tổng hai số ở A2 và B2, rồi sao chép xuống C3:C4.", type: "sheet", mode: "formula", target: "C2:C4", answer: "=A2+B2",
            sheet: { cols: 3, rows: 4, cells: { A1: "Số thứ nhất", B1: "Số thứ hai", C1: "Tổng", A2: "12", B2: "30", A3: "7", B3: "15", A4: "25", B4: "40" }, bold: ["A1:C1"] },
            explanation: "C2 = A2+B2; sao chép xuống: C3 = A3+B3, C4 = A4+B4.",
            level: "van-dung", activity: "tong-ket" },
          { question: "Bạn Nam nhập vào ô E4 công thức =C4*D4 nhưng gõ thiếu dấu “=” (C4*D4). Ô E4 sẽ hiển thị gì?", type: "multiple-choice",
            options: ["Kết quả 250", "Dòng chữ C4*D4 (phần mềm hiểu là văn bản)", "Báo lỗi #DIV/0!", "Số 0"],
            answer: 1, explanation: "Không có dấu “=” thì phần mềm coi đó là văn bản, không tính toán.",
            level: "van-dung-cao", activity: "tong-ket" },
        ],
      },
    },
  ],
};

if (typeof module !== "undefined" && module.exports) module.exports = LESSON;
if (typeof window !== "undefined") window.LESSON = LESSON;
