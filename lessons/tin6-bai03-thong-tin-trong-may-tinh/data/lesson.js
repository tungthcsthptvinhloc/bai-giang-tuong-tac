/* ============================================================================
 * BÀI 3 — THÔNG TIN TRONG MÁY TÍNH  (Tin học 6 — Kết nối tri thức với cuộc sống)
 * Nội dung bám sát SGK trang 12–15 + Kế hoạch bài dạy (giáo án) của giáo viên.
 * Chỉ sửa file này để thay đổi nội dung bài học. Engine ở app.js không cần sửa.
 * ==========================================================================*/

/* ---- Vài hàm dựng sơ đồ SVG/HTML (trực quan, sắc nét trên máy chiếu) ---- */
// Lưới bit 8×8: ô "1" tô đậm, ô "0" để trống; bên phải in dãy bit từng dòng.
function bitGridSVG(rows, fill) {
  fill = fill || "#7c3aed";
  const cell = 40, pad = 8, gw = cell * 8, x0 = pad, y0 = pad;
  let cells = "";
  rows.forEach((r, ri) => {
    for (let ci = 0; ci < 8; ci++) {
      const on = r[ci] === "1";
      cells += `<rect x="${x0 + ci * cell}" y="${y0 + ri * cell}" width="${cell - 2}" height="${cell - 2}" rx="6" fill="${on ? fill : "#ffffff"}" stroke="#c9bdf0" stroke-width="2"/>`;
    }
  });
  let labels = "";
  rows.forEach((r, ri) => {
    labels += `<text x="${x0 + gw + 22}" y="${y0 + ri * cell + cell / 2 + 6}" font-family="Consolas,monospace" font-size="24" font-weight="700" fill="#24124d" letter-spacing="2">${r}</text>`;
  });
  const W = x0 + gw + 22 + 8 * 16 + 20, H = y0 + 8 * cell + pad;
  return `<svg viewBox="0 0 ${W} ${H}" width="100%" style="max-height:56vh" xmlns="http://www.w3.org/2000/svg" role="img">${cells}${labels}</svg>`;
}

const HEART_ROWS = ["01100110", "10011001", "10000001", "01000010", "01000010", "00100100", "00111100", "00011000"];
const A_ROWS = ["00011000", "00111100", "01100110", "01111110", "01100110", "01100110", "01100110", "00000000"];

const LESSON = {
  meta: {
    subject: "Tin học", grade: "6", book: "Kết nối tri thức với cuộc sống",
    title: "Bài 3: Thông tin trong máy tính", unit: "Chủ đề 1 — Máy tính và cộng đồng",
    pages: "12–15", durationMinutes: 45,
  },
  objectives: {
    knowledge: [
      "Giải thích được việc có thể biểu diễn thông tin chỉ với hai kí hiệu 0 và 1.",
      "Biết bit là đơn vị nhỏ nhất trong lưu trữ thông tin; các bội số: byte, KB, MB, GB, TB.",
      "Nêu được tên, độ lớn các đơn vị đo và ước lượng khả năng lưu trữ của thiết bị nhớ.",
    ],
    competencies: [
      "Tự chủ, tự học; giải quyết vấn đề; giao tiếp, hợp tác nhóm.",
      "Năng lực số: lựa chọn, tổ chức, lưu trữ và truy xuất thông tin trong môi trường số.",
    ],
    qualities: ["Ham học hỏi, khám phá thế giới số", "Chăm chỉ, trung thực, trách nhiệm khi hoạt động nhóm"],
  },
  coreKnowledge: [
    "Máy tính chỉ dùng hai kí hiệu 0 và 1 để biểu diễn thông tin.",
    "Thông tin (số, văn bản, hình ảnh, âm thanh) đều được chuyển thành dãy bit.",
    "Bit là đơn vị nhỏ nhất trong lưu trữ thông tin; mỗi bit là 0 hoặc 1 (chữ số nhị phân).",
    "1 byte = 8 bit. Các đơn vị lớn hơn theo bậc 1024: KB, MB, GB, TB.",
    "Biết ước lượng khả năng lưu trữ của đĩa CD, DVD, ổ cứng, thẻ nhớ.",
  ],
  keywords: ["Bit", "Dãy bit (nhị phân)", "Byte", "KB · MB · GB · TB"],
  settings: { basePoints: 100, useTimer: false, defaultTime: 60, sound: false, streakEnabled: true },

  activities: [
    /* ===================== HOẠT ĐỘNG 1: MỞ ĐẦU ===================== */
    {
      id: "khoi-dong", name: "Khởi động — Bí mật của máy tính", type: "intro",
      goal: "Tạo hứng thú; nhận ra máy tính chỉ 'hiểu' hai kí hiệu 0 và 1.",
      time: 120,
      task: "Cả lớp cùng suy nghĩ: con người và máy tính 'nói chuyện' bằng cách nào? Trả lời nhanh 2 câu hỏi khởi động.",
      sgkImage: "assets/sgk/sgk-trang12.jpg",
      content: {
        heading: "🤖 Máy tính 'đọc' thông tin bằng gì?",
        prompt: "Con người dùng chữ số, chữ cái, kí hiệu để hiểu nhau. Vậy làm thế nào để máy tính hiểu được dữ liệu ta đưa vào cho nó xử lí?",
        blocks: [
          { kind: "text", value: "👉 Gợi ý: Máy tính thông dụng hiện nay chỉ làm việc được với HAI kí hiệu duy nhất. Em đoán xem là gì?" },
        ],
        revealLabel: "🔍 Bật mí đáp án",
      },
      questions: [
        {
          question: "Trong cuộc sống, con người thường dùng gì để diễn đạt suy nghĩ cho người khác hiểu?",
          type: "multiple-choice",
          options: ["Chỉ dùng hình vẽ", "Chữ số, chữ cái và các kí hiệu", "Chỉ dùng hai số 0 và 1", "Chỉ dùng âm thanh"],
          answer: 1, explanation: "Chính xác! Con người dùng mười chữ số, nhiều chữ cái và kí hiệu để giao tiếp.",
          level: "nhan-biet", activity: "khoi-dong",
        },
        {
          question: "Máy tính thông dụng hiện nay làm việc với mấy kí hiệu, đó là những kí hiệu nào?",
          type: "multiple-choice",
          options: ["10 kí hiệu: từ 0 đến 9", "26 kí hiệu chữ cái", "Hai kí hiệu: 0 và 1", "Vô số kí hiệu"],
          answer: 2, explanation: "Đúng rồi! Máy tính chỉ làm việc với hai kí hiệu 0 và 1. Cả bài học hôm nay xoay quanh điều kì diệu này.",
          hint: "Đèn tín hiệu chỉ có 'bật' và 'tắt' — máy tính cũng vậy.",
          level: "nhan-biet", activity: "khoi-dong",
        },
      ],
    },

    /* ---- Hoạt động 1: MÃ HÓA (SGK Hình 1.3) ---- */
    {
      id: "ma-hoa", name: "Trò chơi Mã hoá — Thu gọn dãy số", type: "knowledge",
      goal: "Hiểu cách mã hoá một số thành dãy 0 và 1 bằng phương pháp chia đôi (SGK Hình 1.3).",
      time: 300,
      task: "Nhóm đôi: đọc hướng dẫn mã hoá số 4 → 100. Sau đó tự mã hoá số 3 và số 6, rồi điền kết quả.",
      sgkImage: "assets/sgk/sgk-trang12.jpg",
      content: {
        heading: "🔢 Mã hoá số thành dãy 0 và 1",
        revealLabel: "🔍 Xem cách mã hoá số 4 → 100",
        blocks: [
          { kind: "text", value: "Cách làm: Chia dãy số 0–7 thành hai nửa (trái, phải). Xem số cần mã hoá thuộc nửa nào → ghi lại (trái hoặc phải) → giữ lại nửa đó. Lặp 3 lần đến khi còn 1 số. Cuối cùng đổi: trái → 0, phải → 1." },
          { kind: "html", value:
            '<div style="font-family:Consolas,monospace;font-size:20px;line-height:1.9">' +
            '<div>Lần ①: 0 1 2 3 | <b style="color:#7c3aed">4</b> 5 6 7 → số 4 ở nửa <b>PHẢI</b> = <b>1</b></div>' +
            '<div>Lần ②: <b style="color:#7c3aed">4</b> 5 | 6 7 → số 4 ở nửa <b>TRÁI</b> = <b>0</b></div>' +
            '<div>Lần ③: <b style="color:#7c3aed">4</b> | 5 → số 4 ở nửa <b>TRÁI</b> = <b>0</b></div>' +
            '<div style="margin-top:8px;font-size:24px">➡️ Số 4 được mã hoá thành <b style="color:#7c3aed">100</b></div>' +
            '</div>' },
          { kind: "ext", value: "Mẹo nhanh (lớp trên sẽ học kĩ): đây chính là cách viết số ở hệ nhị phân — 4 = 100₂." },
        ],
      },
      questions: [
        {
          question: "Mã hoá số 3 và số 6 theo cách trên. Hai dãy kí hiệu nhận được có GIỐNG nhau không?",
          type: "true-false",
          answer: false,
          explanation: "Không giống nhau! Số 3 → 011, còn số 6 → 110. Mỗi số cho một dãy bit riêng.",
          hint: "Số 3 ở nửa trái nhiều hơn, số 6 ở nửa phải nhiều hơn.",
          level: "thong-hieu", activity: "ma-hoa",
        },
      ],
      remember: [
        "Mỗi số có thể chuyển thành một dãy chỉ gồm 0 và 1.",
        "Trái → 0, Phải → 1. Số càng lớn (0–7) cần đúng 3 kí hiệu.",
      ],
    },

    /* Điền đáp án mã hoá 3 và 6 (fill-blank) */
    {
      id: "ma-hoa-luyen", name: "Ai nhanh hơn — Điền mã hoá", type: "fillblank",
      goal: "Tự mã hoá số 3 và số 6.",
      time: 120,
      task: "Điền dãy 3 kí hiệu (0/1) vào ô trống. Gõ đúng thứ tự rồi bấm Kiểm tra.",
      text: "Mã hoá số 3 thành {{}} ; mã hoá số 6 thành {{}}.",
      answers: [["011"], ["110"]],
      explanation: "Số 3 → 011, số 6 → 110. Hai dãy khác nhau hoàn toàn.",
    },

    /* ============= HOẠT ĐỘNG 2.1: BIỂU DIỄN THÔNG TIN ============= */
    {
      id: "bieu-dien-so-vb", name: "Biểu diễn số & văn bản", type: "knowledge",
      goal: "Biết mọi số, văn bản đều chuyển thành dãy bit; nắm khái niệm bit, dãy bit, số nhị phân.",
      time: 300,
      task: "Đọc mục 'Biểu diễn thông tin trong máy tính' (SGK tr.12–13). Trả lời: bit là gì? Chữ 'CAFE' được chuyển thành gì?",
      sgkImage: "assets/sgk/sgk-trang13.jpg",
      content: {
        heading: "🔤 Số và văn bản → dãy bit",
        revealLabel: "🔍 Hiện bảng mã & ví dụ",
        blocks: [
          { kind: "html", value:
            '<div style="font-size:19px"><b>• Biểu diễn số:</b> mỗi số 0–7 đổi thành một dãy 3 kí hiệu 0/1:</div>' +
            '<table style="border-collapse:collapse;margin:10px auto;font-family:Consolas,monospace;font-size:20px;text-align:center">' +
            '<tr>' + [0,1,2,3,4,5,6,7].map(n=>`<td style="border:2px solid #c9bdf0;padding:8px 12px;background:#f5f3ff;font-weight:700">${n}</td>`).join("") + '</tr>' +
            '<tr>' + ["000","001","010","011","100","101","110","111"].map(b=>`<td style="border:2px solid #c9bdf0;padding:8px 12px;color:#7c3aed;font-weight:700">${b}</td>`).join("") + '</tr>' +
            '</table>' },
          { kind: "text", value: "• Biểu diễn văn bản: chuyển từng kí tự theo bảng mã. Mỗi kí tự thành 8 bit." },
          { kind: "html", value:
            '<div style="text-align:center;font-family:Consolas,monospace;font-size:19px;margin:6px 0">' +
            '<span style="background:#7c3aed;color:#fff;padding:6px 14px;border-radius:10px;font-weight:700">CAFE</span> ➡️ ' +
            '<div style="margin-top:8px;color:#24124d">01000011 01000001 01000110 01000101</div>' +
            '<div style="color:#6b5b95;font-size:15px">C = 01000011 · A = 01000001 · F = 01000110 · E = 01000101</div></div>' },
          { kind: "text", value: "Mỗi dãy các kí hiệu 0 và 1 gọi là DÃY BIT. Mỗi kí hiệu 0 hoặc 1 là một BIT (viết tắt của Binary digIT)." },
        ],
      },
      questions: [
        {
          question: "Bit là gì?",
          type: "multiple-choice",
          options: ["Một dãy các chữ cái", "Một kí hiệu 0 hoặc 1 — chữ số nhị phân", "Một tấm ảnh nhỏ", "Một loại âm thanh"],
          answer: 1, explanation: "Chính xác! Bit là một kí hiệu 0 hoặc 1, còn gọi là chữ số nhị phân.",
          level: "nhan-biet", activity: "bieu-dien-so-vb",
        },
        {
          question: "Vì sao chữ 'CAFE' cần 32 bit để biểu diễn?",
          type: "multiple-choice",
          options: ["Vì có 32 chữ cái", "Vì mỗi chữ cái cần 8 bit, 4 chữ × 8 = 32", "Vì máy tính thích số 32", "Vì mỗi chữ cần 4 bit"],
          answer: 1, explanation: "Đúng! Mỗi kí tự cần 8 bit theo bảng mã, 4 kí tự → 4 × 8 = 32 bit.",
          hint: "Đếm số bit của một chữ cái trong bảng mã (Bảng 1.2).",
          level: "van-dung", activity: "bieu-dien-so-vb",
        },
      ],
      remember: [
        "Thông tin trong máy tính được biểu diễn bằng dãy các bit.",
        "Mỗi bit là 0 hoặc 1 — còn gọi là chữ số nhị phân.",
        "Bit là đơn vị đo nhỏ nhất trong lưu trữ thông tin.",
      ],
    },

    /* Biểu diễn hình ảnh & âm thanh + trò chơi chuyển chữ A */
    {
      id: "hinh-anh-am-thanh", name: "Biểu diễn hình ảnh & âm thanh", type: "knowledge",
      goal: "Hiểu ảnh đen trắng → mỗi pixel 1 bit; âm thanh → số → dãy bit.",
      time: 240,
      task: "Quan sát cách chữ 'A' trong lưới 8×8 thành dãy bit (đen = 1, trắng = 0). Nhóm nào đọc đúng dãy bit của một dòng sẽ được điểm!",
      sgkImage: "assets/sgk/sgk-trang13.jpg",
      content: {
        heading: "🖼️ Hình ảnh & 🎵 âm thanh → dãy bit",
        revealLabel: "🔍 Xem chữ A thành dãy bit (8×8)",
        blocks: [
          { kind: "text", value: "Ảnh được chia thành lưới ô vuông (pixel). Ảnh đen trắng: mỗi pixel 1 bit — tô đen = 1, để trắng = 0. Mỗi dòng cho một dãy 8 bit." },
          { kind: "svg", value: bitGridSVG(A_ROWS, "#7c3aed") },
          { kind: "text", value: "Âm thanh: dây đàn rung càng nhanh, tiếng càng cao. Ví dụ dây rung 440 lần/giây → nốt La chuẩn. Tốc độ rung ghi thành số rồi chuyển thành dãy bit." },
          { kind: "html", value:
            '<div style="text-align:center;font-family:Consolas,monospace;font-size:20px;margin:6px 0">' +
            '🎵 Nốt La → <span style="background:#06b6d4;color:#fff;padding:4px 12px;border-radius:8px;font-weight:700">440</span> ➡️ ' +
            '<span style="color:#7c3aed;font-weight:700">110111000</span></div>' },
          { kind: "ext", value: "Với ảnh màu, mỗi pixel cần NHIỀU bit hơn (không chỉ 1 bit) để ghi màu." },
        ],
      },
      questions: [
        {
          question: "Trong ảnh đen trắng, mỗi điểm ảnh (pixel) được biểu diễn bằng bao nhiêu bit?",
          type: "multiple-choice",
          options: ["8 bit", "1 bit", "3 bit", "Không cần bit nào"],
          answer: 1, explanation: "Chính xác! Ảnh đen trắng: mỗi pixel chỉ cần 1 bit (0 = trắng, 1 = đen).",
          level: "thong-hieu", activity: "hinh-anh-am-thanh",
        },
        {
          question: "Nhìn dòng đầu tiên (trên cùng) của chữ A, dãy bit tương ứng là:",
          type: "multiple-choice",
          options: ["11111111", "00011000", "01100110", "00000000"],
          answer: 1, explanation: "Đúng! Dòng đầu của chữ A chỉ có 2 ô đen ở giữa → 00011000.",
          hint: "Đếm từ trái sang phải: ô trắng = 0, ô đen = 1.",
          level: "van-dung", activity: "hinh-anh-am-thanh",
        },
      ],
    },

    /* ============= HOẠT ĐỘNG 2.2.1: VIẾT DÃY BIT (trái tim) ============= */
    {
      id: "trai-tim", name: "Thử thách: Viết dãy bit hình trái tim", type: "knowledge",
      goal: "Vận dụng: chuyển hình trái tim 8×8 thành dãy bit theo từng dòng.",
      time: 300,
      task: "Nhóm 4: quan sát hình trái tim (lưới 8×8, ô đen = 1, trắng = 0). Viết dãy bit cho từng dòng, rồi nối 8 dòng lại (từ trên xuống).",
      sgkImage: "assets/sgk/sgk-trang14.jpg",
      content: {
        heading: "💜 Chuyển hình trái tim thành dãy bit",
        revealLabel: "🔍 Xem đáp án 8 dòng",
        blocks: [
          { kind: "text", value: "Ô tô đen = 1, ô trắng = 0. Đọc từng dòng từ trái sang phải, từ trên xuống dưới." },
          { kind: "svg", value: bitGridSVG(HEART_ROWS, "#ec4899") },
          { kind: "html", value:
            '<div style="font-family:Consolas,monospace;font-size:18px;text-align:center;color:#24124d;word-spacing:6px;margin-top:6px">' +
            'Nối cả hình:<br><b style="color:#7c3aed">' + HEART_ROWS.join(" ") + '</b></div>' },
        ],
      },
      questions: [],
      remember: ["Cả một hình ảnh cũng chỉ là một dãy dài các bit 0 và 1."],
    },

    /* Điền dãy bit 2 dòng của trái tim */
    {
      id: "trai-tim-luyen", name: "Điền dãy bit — Trái tim", type: "fillblank",
      goal: "Tự đọc 2 dòng của hình trái tim.",
      time: 120,
      task: "Nhìn hình trái tim ở màn trước. Điền dãy 8 bit cho dòng 1 (trên cùng) và dòng 8 (dưới cùng).",
      sgkImage: "assets/sgk/sgk-trang14.jpg",
      text: "Dòng 1 (trên cùng) là {{}} ; dòng 8 (dưới cùng) là {{}}.",
      answers: [["01100110"], ["00011000"]],
      explanation: "Dòng 1 → 01100110 (hai 'bướu' của trái tim); dòng 8 → 00011000 (đáy nhọn).",
    },

    /* Quiz củng cố khái niệm dãy bit (2 câu SGK) */
    {
      id: "quiz-bit", name: "Kiểm tra nhanh — Dãy bit", type: "quiz",
      goal: "Củng cố khái niệm dãy bit và công dụng.",
      time: 150,
      task: "Thảo luận cặp đôi, chọn đáp án đúng cho mỗi câu.",
      questions: [
        {
          question: "Dãy bit là gì?",
          type: "multiple-choice",
          options: ["Là dãy những kí hiệu 0 và 1", "Là âm thanh phát ra từ máy tính", "Là một dãy chỉ gồm chữ số 2", "Là dãy những chữ số từ 0 đến 9"],
          answer: 0, explanation: "Chính xác! Dãy bit là dãy chỉ gồm các kí hiệu 0 và 1.",
          level: "nhan-biet", activity: "quiz-bit",
        },
        {
          question: "Máy tính sử dụng dãy bit để làm gì?",
          type: "multiple-choice",
          options: ["Chỉ để biểu diễn các số", "Chỉ để biểu diễn văn bản", "Chỉ để biểu diễn hình ảnh, âm thanh", "Để biểu diễn số, văn bản, hình ảnh và âm thanh"],
          answer: 3, explanation: "Đúng! Mọi loại thông tin — số, văn bản, hình ảnh, âm thanh — đều được biểu diễn bằng dãy bit.",
          level: "thong-hieu", activity: "quiz-bit",
        },
        {
          question: "Chọn TẤT CẢ phát biểu ĐÚNG về bit.",
          type: "multiple-select",
          options: ["Bit là đơn vị đo nhỏ nhất trong lưu trữ thông tin", "Mỗi bit là 0 hoặc 1", "Một bit có thể mang giá trị 5", "Bit còn gọi là chữ số nhị phân"],
          answer: [0, 1, 3], explanation: "Bit là đơn vị nhỏ nhất, mang giá trị 0 hoặc 1, còn gọi là chữ số nhị phân. Bit không bao giờ là 5.",
          level: "thong-hieu", activity: "quiz-bit",
        },
      ],
    },

    /* ============= HOẠT ĐỘNG 2.2.2: ĐƠN VỊ ĐO THÔNG TIN ============= */
    {
      id: "don-vi-do", name: "Đơn vị đo thông tin", type: "knowledge",
      goal: "Biết tệp là dạng tổ chức thông tin; nắm byte và các bội số KB, MB, GB, TB.",
      time: 300,
      task: "Đọc mục 'Đơn vị đo thông tin' (SGK tr.14). Trả lời: đơn vị đo nhỏ nhất là gì? 1 byte bằng mấy bit? Sắp xếp các đơn vị từ nhỏ đến lớn.",
      sgkImage: "assets/sgk/sgk-trang14.jpg",
      content: {
        heading: "📦 Byte và các đơn vị lớn hơn",
        revealLabel: "🔍 Hiện bảng đơn vị đo",
        blocks: [
          { kind: "text", value: "Thông tin trong máy tính được tổ chức thành các TỆP (tệp văn bản, ảnh, video…). Thực tế người ta đo dung lượng bằng BYTE (một dãy 8 bit liên tục) và các đơn vị lớn hơn." },
          { kind: "html", value:
            '<div style="text-align:center;font-family:Consolas,monospace;font-size:22px;margin:6px 0">' +
            '<span style="color:#6b5b95;font-size:15px">1 bit ↓</span><br>' +
            '0 1 1 0 0 0 0 1 <span style="color:#7c3aed;font-weight:700">= 1 byte (8 bit)</span></div>' },
          { kind: "html", value:
            '<table style="border-collapse:collapse;margin:8px auto;font-size:18px;min-width:520px">' +
            '<tr style="background:#7c3aed;color:#fff"><th style="padding:8px 12px;border:1px solid #c9bdf0">Đơn vị</th><th style="padding:8px 12px;border:1px solid #c9bdf0">Kí hiệu</th><th style="padding:8px 12px;border:1px solid #c9bdf0">Giá trị</th><th style="padding:8px 12px;border:1px solid #c9bdf0">Xấp xỉ</th></tr>' +
            [["byte","B","1 B","1 byte"],["kilobyte","KB","1024 B","1 nghìn byte"],["megabyte","MB","1024 KB","1 triệu byte"],["gigabyte","GB","1024 MB","1 tỉ byte"],["terabyte","TB","1024 GB","1 nghìn tỉ byte"]]
              .map((r,i)=>`<tr style="background:${i%2?"#f5f3ff":"#fff"}"><td style="padding:7px 12px;border:1px solid #c9bdf0;font-weight:700">${r[0]}</td><td style="padding:7px 12px;border:1px solid #c9bdf0;text-align:center;color:#7c3aed;font-weight:700">${r[1]}</td><td style="padding:7px 12px;border:1px solid #c9bdf0;text-align:center">${r[2]}</td><td style="padding:7px 12px;border:1px solid #c9bdf0">${r[3]}</td></tr>`).join("") +
            '</table>' },
        ],
      },
      questions: [
        {
          question: "Đơn vị đo dung lượng thông tin NHỎ NHẤT là gì?",
          type: "multiple-choice",
          options: ["Byte", "Bit", "KB", "MB"],
          answer: 1, explanation: "Chính xác! Bit là đơn vị nhỏ nhất. 1 byte = 8 bit.",
          level: "nhan-biet", activity: "don-vi-do",
        },
        {
          question: "1 GB xấp xỉ bao nhiêu byte?",
          type: "multiple-choice",
          options: ["Một nghìn byte", "Một triệu byte", "Một tỉ byte", "Một nghìn tỉ byte"],
          answer: 2, explanation: "Đúng! 1 GB ≈ một tỉ byte (KB ≈ nghìn, MB ≈ triệu, GB ≈ tỉ, TB ≈ nghìn tỉ).",
          hint: "Mỗi bậc lên nhân khoảng 1000: nghìn → triệu → tỉ.",
          level: "thong-hieu", activity: "don-vi-do",
        },
      ],
      remember: [
        "1 byte = 8 bit. Thứ tự tăng dần: bit < byte < KB < MB < GB < TB.",
        "Mỗi bậc lớn hơn gấp 1024 lần bậc liền trước.",
      ],
    },

    /* Trò chơi ghép thiết bị nhớ với dung lượng */
    {
      id: "ghep-thiet-bi", name: "Trò chơi: Thiết bị nhớ ↔ Dung lượng", type: "matching",
      goal: "Ước lượng khả năng lưu trữ của các thiết bị nhớ thông dụng.",
      time: 180,
      task: "Nối mỗi thiết bị nhớ ở cột trái với dung lượng thường gặp ở cột phải.",
      sgkImage: "assets/sgk/sgk-trang15.jpg",
      intro: "Chọn một thiết bị bên trái rồi chọn dung lượng phù hợp bên phải.",
      pairs: [
        { left: "Đĩa CD", right: "Khoảng 700 MB" },
        { left: "Đĩa DVD", right: "4,7 GB đến 17 GB" },
        { left: "Bộ nhớ trong (RAM) máy cá nhân", right: "2 GB đến 16 GB" },
        { left: "Ổ đĩa cứng", right: "Vài trăm GB đến vài TB" },
        { left: "Thẻ nhớ", right: "Hàng trăm GB hoặc hơn" },
      ],
      explanation: "Thiết bị càng hiện đại/nhỏ gọn thường lưu được càng nhiều: CD < DVD < thẻ nhớ/ổ cứng.",
    },

    /* ===================== HOẠT ĐỘNG 3: LUYỆN TẬP ===================== */
    {
      id: "luyen-tap", name: "Luyện tập — Tính dung lượng", type: "quiz",
      goal: "Vận dụng đơn vị đo để tính số tệp lưu được.",
      time: 300,
      task: "Thảo luận nhóm, tính toán và chọn đáp án đúng. Được dùng nháp!",
      sgkImage: "assets/sgk/sgk-trang15.jpg",
      questions: [
        {
          question: "Một GB xấp xỉ bao nhiêu byte?",
          type: "multiple-choice",
          options: ["Một nghìn byte", "Một triệu byte", "Một tỉ byte", "Một nghìn tỉ byte"],
          answer: 2, explanation: "1 GB ≈ một tỉ byte (1024 MB).",
          level: "nhan-biet", activity: "luyen-tap",
        },
        {
          question: "Mỗi ảnh chụp bằng máy ảnh chuyên nghiệp ≈ 12 MB. Thẻ nhớ 16 GB chứa được khoảng bao nhiêu ảnh?",
          type: "multiple-choice",
          options: ["Khoảng 130 ảnh", "Khoảng 1365 ảnh", "Khoảng 16 ảnh", "Khoảng 12 000 ảnh"],
          answer: 1, explanation: "16 GB = 16 × 1024 MB = 16384 MB. Chia cho 12 MB ≈ 1365 ảnh.",
          hint: "Đổi 16 GB ra MB (×1024) rồi chia cho 12.",
          level: "van-dung", activity: "luyen-tap",
        },
        {
          question: "Mỗi bài hát ≈ 6 MB. Một USB 8 GB chứa được khoảng bao nhiêu bài hát?",
          type: "multiple-choice",
          options: ["Khoảng 48 bài", "Khoảng 8 bài", "Khoảng 1365 bài", "Khoảng 500 bài"],
          answer: 2, explanation: "8 GB = 8 × 1024 = 8192 MB. Chia cho 6 MB ≈ 1365 bài hát.",
          hint: "8 × 1024 ÷ 6.",
          level: "van-dung", activity: "luyen-tap",
        },
        {
          question: "Mỗi bộ phim ≈ 6 GB. Một ổ cứng 2 TB chứa được khoảng bao nhiêu bộ phim?",
          type: "multiple-choice",
          options: ["Khoảng 2 bộ", "Khoảng 341 bộ", "Khoảng 2000 bộ", "Khoảng 12 bộ"],
          answer: 1, explanation: "2 TB = 2 × 1024 = 2048 GB. Chia cho 6 GB ≈ 341 bộ phim.",
          hint: "Đổi 2 TB ra GB (×1024) rồi chia cho 6.",
          level: "van-dung-cao", activity: "luyen-tap",
        },
      ],
    },

    /* ===================== HOẠT ĐỘNG 4: VẬN DỤNG ===================== */
    {
      id: "van-dung", name: "Vận dụng — Thực tế của em", type: "vandung",
      goal: "Áp dụng vào máy tính thật và mở rộng cách mã hoá.",
      time: 300,
      task: "Nhóm thảo luận 2 nhiệm vụ, ghi kết quả ra bảng nhóm, rồi bấm để đối chiếu với hướng chốt của giáo viên.",
      sgkImage: "assets/sgk/sgk-trang15.jpg",
      intro: "Hai nhiệm vụ vận dụng vào thực tế — thử làm trước khi xem gợi ý nhé!",
      cases: [
        {
          question: "Em hãy kiểm tra và ghi lại dung lượng các ổ đĩa của máy tính mà em đang sử dụng.",
          answer: "Cách 1: Mở File Explorer → chọn 'This PC' để xem dung lượng từng ổ đĩa (C:, D:, E:…). Cách 2: Nháy phải chuột vào ổ đĩa → chọn Properties để xem dung lượng đã dùng và còn trống. Ví dụ trong SGK: ổ C ≈ 109 GB, ổ E ≈ 111 GB, ổ F ≈ 169 GB, ổ G ≈ 186 GB.",
        },
        {
          question: "Làm tương tự Hoạt động 1 với dãy số 0 đến 15, hãy mã hoá các số từ 8 đến 15 và đưa ra nhận xét.",
          answer: "Vì dãy dài gấp đôi (0–15) nên phải thu gọn 4 lần → mỗi số cần 4 kí hiệu. Kết quả: 8→1000, 9→1001, 10→1010, 11→1011, 12→1100, 13→1101, 14→1110, 15→1111. Nhận xét: dãy số càng dài thì số bit cần dùng càng nhiều (0–7 cần 3 bit, 0–15 cần 4 bit).",
        },
      ],
    },

    /* ===================== TỔNG KẾT ===================== */
    {
      id: "tong-ket", name: "Tổng kết", type: "summary",
      goal: "Chốt kiến thức trọng tâm của bài.",
      task: "Cùng nhắc lại những điều quan trọng nhất và thử thách 2 câu cuối bài.",
      content: {
        learned: null,
        challenge: [
          {
            question: "Phát biểu nào SAI?",
            type: "multiple-choice",
            options: ["Máy tính biểu diễn thông tin bằng 0 và 1", "Bit là đơn vị nhỏ nhất trong lưu trữ thông tin", "1 byte = 10 bit", "Hình ảnh, âm thanh đều chuyển thành dãy bit"],
            answer: 2, explanation: "Sai ở '1 byte = 10 bit'. Đúng phải là 1 byte = 8 bit.",
            level: "thong-hieu", activity: "tong-ket",
          },
          {
            question: "Sắp xếp đúng thứ tự TĂNG DẦN các đơn vị đo?",
            type: "multiple-choice",
            options: ["byte < KB < GB < MB < TB", "bit < byte < KB < MB < GB < TB", "TB < GB < MB < KB < byte", "bit < KB < byte < MB < GB"],
            answer: 1, explanation: "Chính xác! bit < byte < KB < MB < GB < TB, mỗi bậc gấp 1024 lần.",
            level: "van-dung", activity: "tong-ket",
          },
        ],
      },
    },
  ],
};
if (typeof module !== "undefined" && module.exports) module.exports = LESSON;
if (typeof window !== "undefined") window.LESSON = LESSON;
