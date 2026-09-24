/* ============================================================================
 * BÀI 4 — MỘT SỐ VẤN ĐỀ PHÁP LÍ VỀ SỬ DỤNG DỊCH VỤ INTERNET (Tin học 9 — KNTT)
 * Chủ đề 3: Đạo đức, pháp luật và văn hoá trong môi trường số.
 * Bám sát SGK trang 15–19 + Kế hoạch bài dạy (2 tiết) của giáo viên.
 * Chỉ sửa file này để đổi nội dung. Engine app.js không cần sửa.
 * ==========================================================================*/

/* Sơ đồ mốc thời gian 3 văn bản pháp lí (SVG) */
function lawTimelineSVG() {
  const items = [
    ["2006", "Luật Công nghệ thông tin", "số 67/2006/QH11", "#e11d48"],
    ["2013", "Nghị định về Internet", "số 72/2013/NĐ-CP", "#6366f1"],
    ["2018", "Luật An ninh mạng", "bảo vệ an ninh KGM", "#0d9488"],
  ];
  const w = 300, gap = 40, total = items.length * w + (items.length - 1) * gap;
  let g = `<line x1="30" y1="60" x2="${total - 30}" y2="60" stroke="#cbd5e1" stroke-width="4"/>`;
  items.forEach((it, i) => {
    const x = i * (w + gap), cx = x + w / 2;
    g += `<circle cx="${cx}" cy="60" r="14" fill="${it[3]}"/>` +
      `<text x="${cx}" y="34" text-anchor="middle" font-size="30" font-weight="800" fill="${it[3]}">${it[0]}</text>` +
      `<rect x="${x}" y="86" width="${w}" height="86" rx="14" fill="#fff" stroke="${it[3]}" stroke-width="2.5"/>` +
      `<text x="${cx}" y="122" text-anchor="middle" font-size="21" font-weight="800" fill="#3f1220">${it[1]}</text>` +
      `<text x="${cx}" y="150" text-anchor="middle" font-size="17" fill="#86566a">${it[2]}</text>`;
  });
  return `<svg viewBox="0 0 ${total} 182" width="100%" style="max-height:32vh" xmlns="http://www.w3.org/2000/svg" role="img">${g}</svg>`;
}

/* Lưới 8 nhóm hành vi vi phạm (Hình 4.2) */
function violationsSVG() {
  const labels = ["Viết, đăng, chia sẻ nội dung sai sự thật", "Làm lộ thông tin cá nhân, tổ chức", "Gửi thư rác, tin nhắn rác", "Dùng dữ liệu người khác không xin phép", "Dùng phần mềm không bản quyền", "Bắt nạt qua mạng", "Lừa đảo qua mạng", "Ứng xử thiếu văn hoá"];
  return '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px">' +
    labels.map((t, i) => `<div style="background:#fff1f2;border:2px solid #e11d48;border-radius:12px;padding:10px 8px;text-align:center;font-weight:700;font-size:14px;color:#9f1239">${["✍️","🔓","📩","🗂️","💿","😡","🎣","🚫"][i]}<br>${t}</div>`).join("") +
    '</div>';
}

const LESSON = {
  meta: {
    subject: "Tin học", grade: "9", book: "Kết nối tri thức với cuộc sống",
    title: "Bài 4: Một số vấn đề pháp lí về sử dụng dịch vụ Internet",
    unit: "Chủ đề 3 — Đạo đức, pháp luật và văn hoá trong môi trường số",
    pages: "15–19", durationMinutes: 90,
  },
  objectives: {
    knowledge: [
      "Trình bày được một số tác động tiêu cực của công nghệ kĩ thuật số, nêu ví dụ.",
      "Nêu được nội dung liên quan Luật CNTT, nghị định về Internet; khía cạnh pháp lí của sở hữu, sử dụng, trao đổi thông tin.",
      "Nêu được một số hành vi vi phạm pháp luật, trái đạo đức, thiếu văn hoá trong môi trường số.",
    ],
    competencies: [
      "Tự chủ – tự học; giao tiếp – hợp tác; giải quyết vấn đề.",
      "Năng lực số: phân biệt hành vi đúng/sai (2.5.TC2a); tuân thủ pháp luật & bản quyền (2.5.TC2b); giao tiếp văn minh (3.3.TC2a).",
    ],
    qualities: ["Chăm chỉ, trung thực, trách nhiệm; ứng xử văn minh, có văn hoá trên mạng"],
  },
  coreKnowledge: [
    "Công nghệ kĩ thuật số có tác động tiêu cực đến CON NGƯỜI (sức khoẻ, quyền riêng tư) và XÃ HỘI (tệ nạn, thất nghiệp, rác thải điện tử).",
    "Có nhiều hành vi vi phạm pháp luật/trái đạo đức/thiếu văn hoá trong môi trường số (8 nhóm — Hình 4.2).",
    "Việt Nam có khung pháp lí: Luật CNTT 2006, Nghị định 72/2013/NĐ-CP, Luật An ninh mạng 2018.",
    "Tôn trọng bản quyền số; không dùng trái phép dữ liệu/phần mềm; trích dẫn nguồn.",
    "Người dùng Internet phải có trách nhiệm, ứng xử lành mạnh, có văn hoá và không vi phạm pháp luật.",
  ],
  keywords: ["Tác động tiêu cực", "Quyền riêng tư & bản quyền", "Luật CNTT · An ninh mạng", "Ứng xử văn minh"],
  settings: { basePoints: 100, useTimer: false, defaultTime: 60, sound: false, streakEnabled: true },

  activities: [
    /* ===================== HĐ1: MỞ ĐẦU ===================== */
    {
      id: "khoi-dong", name: "Khởi động — Mặt trái của công nghệ số", type: "intro",
      goal: "Khơi gợi: bên cạnh tiện lợi, công nghệ số còn có tác động tiêu cực.",
      time: 180,
      task: "Thảo luận cặp đôi (2 phút): kể ra vài tác động TIÊU CỰC của công nghệ kĩ thuật số đối với con người và xã hội.",
      sgkImage: "assets/sgk/sgk-trang15.jpg",
      content: {
        heading: "📱 Công nghệ số — con dao hai lưỡi",
        prompt: "Công nghệ số giúp học tập, giải trí, làm việc dễ dàng hơn. Nhưng nó có 'mặt trái' nào không?",
        blocks: [
          { kind: "text", value: "👉 Gợi ý một vài mặt trái: nghiện game/Internet, suy nhược cơ thể, mất/lộ thông tin cá nhân, lừa đảo trực tuyến…" },
        ],
        revealLabel: "🔍 Gợi ý vài tác động tiêu cực",
      },
      questions: [
        {
          question: "Chọn TẤT CẢ phương án nói về TÁC ĐỘNG TIÊU CỰC của công nghệ số.",
          type: "multiple-select",
          options: ["Quyền riêng tư dễ bị ảnh hưởng", "Dữ liệu tài khoản ngân hàng bị đánh cắp", "Giao dịch thương mại tăng nhanh nhờ ngân hàng số", "Ô nhiễm do rác thải từ thiết bị số lỗi thời"],
          answer: [0, 1, 3], explanation: "A, B, D là tác động tiêu cực. C (giao dịch tăng nhờ ngân hàng số) là tác động TÍCH CỰC.",
          level: "thong-hieu", activity: "khoi-dong",
        },
      ],
    },

    /* ===================== HĐ2.1: TÁC ĐỘNG TIÊU CỰC ===================== */
    {
      id: "tac-dong-con-nguoi", name: "Tác động tiêu cực — đối với CON NGƯỜI", type: "knowledge",
      goal: "Nêu tác động tiêu cực đến sức khoẻ, tinh thần và quyền riêng tư của con người.",
      time: 300,
      task: "Đọc mục 1 (SGK tr.15–16). Nhóm 'khăn trải bàn': liệt kê tác động tiêu cực của công nghệ số đối với CON NGƯỜI.",
      sgkImage: "assets/sgk/sgk-trang16.jpg",
      content: {
        heading: "🧑 Ảnh hưởng đến con người",
        revealLabel: "🔍 Hiện các tác động đến con người",
        blocks: [
          { kind: "html", value:
            '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">' +
            [['🎮 Sức khoẻ thể chất & tinh thần','Nghiện game/Internet, ít giao tiếp, mất ngủ, bứt rứt khó chịu khi không được chơi.','#e11d48'],
             ['🔓 Quyền riêng tư','Thông tin cá nhân bị rò rỉ, đánh cắp và dùng trái phép (dữ liệu số dễ bị lấy, quy mô lớn).','#6366f1'],
             ['🤖 Quá lệ thuộc công nghệ','Nhờ AI làm hết bài tập, làm văn… giảm khả năng tự học, tư duy.','#f59e0b'],
             ['🎣 Bị lừa đảo/mất tiền','Trò chuyện với người ẩn danh/mạo danh → lộ thông tin; lộ tài khoản ngân hàng → mất tiền (Hình 4.1).','#0d9488']]
              .map(c=>`<div style="background:#fff;border:2px solid ${c[2]};border-radius:14px;padding:12px"><div style="font-weight:800;color:${c[2]};font-size:17px">${c[0]}</div><div style="font-size:14px;color:#4b5563">${c[1]}</div></div>`).join("") +
            '</div>' },
        ],
      },
      remember: [
        "Với con người: hại sức khoẻ thể chất & tinh thần; đe doạ quyền riêng tư; nguy cơ bị lừa đảo, mất tiền.",
      ],
    },
    {
      id: "tac-dong-xa-hoi", name: "Tác động tiêu cực — đối với XÃ HỘI", type: "knowledge",
      goal: "Nêu tác động tiêu cực đến xã hội: tệ nạn, thất nghiệp, nhóm yếu thế, rác thải điện tử.",
      time: 240,
      task: "Vẫn nhóm 'khăn trải bàn': liệt kê tác động tiêu cực đối với XÃ HỘI.",
      sgkImage: "assets/sgk/sgk-trang16.jpg",
      content: {
        heading: "🌍 Ảnh hưởng đến xã hội",
        revealLabel: "🔍 Hiện các tác động đến xã hội",
        blocks: [
          { kind: "list", value: [
            "Phổ biến tệ nạn trên mạng: lừa đảo, tổ chức đánh bạc trực tuyến…",
            "Tự động hoá nhiều → nguy cơ thất nghiệp tăng.",
            "Nhóm yếu thế (người già, người khuyết tật, vùng khó khăn) ngày càng tụt hậu.",
            "Thiết bị số nhanh lỗi thời → rác thải điện tử nguy hại cho môi trường.",
          ] },
        ],
      },
      questions: [
        {
          question: "Phương án nào KHÔNG phải là tác động tiêu cực của công nghệ số đến con người?",
          type: "multiple-choice",
          options: ["Nhờ trí tuệ nhân tạo làm bài tập về nhà", "Truy cập mạng xã hội trong nhiều giờ", "Thường xuyên dùng phần mềm soạn thảo để làm báo cáo", "Vừa ăn vừa xem video trên YouTube"],
          answer: 2, explanation: "Dùng phần mềm soạn thảo để làm báo cáo là sử dụng công nghệ ĐÚNG mục đích — không phải tác động tiêu cực.",
          level: "thong-hieu", activity: "tac-dong-xa-hoi",
        },
        {
          question: "Chọn TẤT CẢ tác động tiêu cực của công nghệ số đến XÃ HỘI.",
          type: "multiple-select",
          options: ["Thông tin cá nhân của con người được số hoá", "Dùng thiết bị số liên tục lâu dài ảnh hưởng sức khoẻ lớp trẻ", "Gia tăng ô nhiễm môi trường", "Làm gia tăng tỉ lệ thất nghiệp"],
          answer: [1, 2, 3], explanation: "B, C, D là tác động tiêu cực đến xã hội. A (số hoá thông tin) tự nó chỉ là đặc điểm, không phải tác hại.",
          level: "van-dung", activity: "tac-dong-xa-hoi",
        },
      ],
    },
    {
      id: "phan-loai-tac-dong", name: "Trò chơi: Con người hay Xã hội?", type: "dragdrop",
      goal: "Phân biệt tác động tiêu cực lên con người và lên xã hội.",
      time: 180,
      task: "Chọn từng thẻ tác động rồi bấm vào đúng nhóm bị ảnh hưởng.",
      groups: ["Đối với CON NGƯỜI", "Đối với XÃ HỘI"],
      items: [
        { text: "Nghiện game, mất ngủ", group: 0 },
        { text: "Lộ thông tin cá nhân, mất tiền", group: 0 },
        { text: "Quá lệ thuộc AI, lười tư duy", group: 0 },
        { text: "Gia tăng thất nghiệp", group: 1 },
        { text: "Rác thải điện tử hại môi trường", group: 1 },
        { text: "Phổ biến lừa đảo, đánh bạc trực tuyến", group: 1 },
      ],
      explanation: "Có tác động chủ yếu lên cá nhân (sức khoẻ, tiền bạc, tư duy), có tác động ở quy mô xã hội (việc làm, môi trường, tệ nạn).",
    },

    /* ===================== HĐ2.2a: HÀNH VI VI PHẠM ===================== */
    {
      id: "hanh-vi-vi-pham", name: "8 nhóm hành vi vi phạm", type: "knowledge",
      goal: "Nhận biết các hành vi vi phạm pháp luật/trái đạo đức/thiếu văn hoá trong môi trường số.",
      time: 300,
      task: "Đọc mục 2a (SGK tr.17–18). Nhóm liệt kê các hành vi vi phạm pháp luật, trái đạo đức, thiếu văn hoá khi lên mạng.",
      sgkImage: "assets/sgk/sgk-trang18.jpg",
      content: {
        heading: "🚫 Những hành vi cần tránh (Hình 4.2)",
        revealLabel: "🔍 Hiện 8 nhóm hành vi vi phạm",
        blocks: [
          { kind: "html", value: violationsSVG() },
          { kind: "ext", value: "Gợi ý phân biệt: gửi 1 tin quảng cáo KHÔNG xấu; nhưng gửi nhiều khi người nhận đã từ chối → thành 'quấy nhiễu' (thư/tin nhắn rác)." },
        ],
      },
      remember: [
        "8 nhóm hành vi vi phạm: sai sự thật · lộ thông tin · thư/tin rác · dùng dữ liệu người khác không xin phép · phần mềm lậu · bắt nạt mạng · lừa đảo · thiếu văn hoá.",
      ],
    },
    {
      id: "game-vi-pham", name: "Trò chơi: Nên hay Không nên?", type: "dragdrop",
      goal: "Phân biệt hành vi vi phạm và hành vi ứng xử đẹp trên mạng.",
      time: 180,
      task: "Chọn từng hành vi rồi bấm vào nhóm đúng: 'Vi phạm / Nên tránh' hay 'Hợp pháp / Nên làm'.",
      sgkImage: "assets/sgk/sgk-trang17.jpg",
      groups: ["Vi phạm / Nên tránh ❌", "Hợp pháp / Nên làm ✅"],
      items: [
        { text: "Tải ảnh của người khác rồi dùng như của mình", group: 0 },
        { text: "Dùng ngôn ngữ phản cảm khi giao tiếp", group: 0 },
        { text: "Đăng video bôi nhọ, xúc phạm người khác", group: 0 },
        { text: "Chúc mừng sinh nhật bạn trên mạng xã hội", group: 1 },
        { text: "Xin phép, ghi nguồn khi dùng ảnh của người khác", group: 1 },
        { text: "Chia sẻ thông tin về lớp học lập trình trực tuyến", group: 1 },
      ],
      explanation: "Vi phạm: lấy dữ liệu người khác không xin phép, ngôn ngữ phản cảm, bôi nhọ/xúc phạm. Nên làm: giao tiếp văn minh, xin phép & ghi nguồn, chia sẻ thông tin hữu ích.",
    },

    /* ===================== HĐ2.2b: KHUNG PHÁP LÍ ===================== */
    {
      id: "van-ban-phap-ly", name: "Khung pháp lí về Internet", type: "knowledge",
      goal: "Biết 3 văn bản pháp lí chính và mốc thời gian ban hành.",
      time: 300,
      task: "Đọc mục 2b (SGK tr.18). Nhóm: kể tên các văn bản pháp luật về sử dụng Internet và năm ban hành.",
      sgkImage: "assets/sgk/sgk-trang18.jpg",
      content: {
        heading: "⚖️ Ba văn bản pháp lí quan trọng",
        revealLabel: "🔍 Hiện mốc thời gian pháp lí",
        blocks: [
          { kind: "svg", value: lawTimelineSVG() },
          { kind: "list", value: [
            "Luật Công nghệ thông tin 67/2006/QH11 (2006): quyền & trách nhiệm của tổ chức, cá nhân; các hành vi bị nghiêm cấm.",
            "Nghị định 72/2013/NĐ-CP (2013): quản lí, cung cấp, sử dụng dịch vụ Internet & thông tin trên mạng; ghi rõ hành vi bị cấm.",
            "Luật An ninh mạng (2018): bảo vệ an ninh quốc gia, trật tự an toàn xã hội trên không gian mạng.",
          ] },
        ],
      },
      remember: ["Ghi nhớ mốc: Luật CNTT (2006) → Nghị định 72 (2013) → Luật An ninh mạng (2018)."],
    },
    {
      id: "ghep-van-ban", name: "Trò chơi: Văn bản ↔ Năm/Nội dung", type: "matching",
      goal: "Củng cố 3 văn bản pháp lí.",
      time: 150,
      task: "Nối mỗi văn bản pháp lí với năm ban hành & nội dung chính.",
      pairs: [
        { left: "Luật Công nghệ thông tin (67/2006/QH11)", right: "2006 — quyền & trách nhiệm, hành vi bị cấm" },
        { left: "Nghị định 72/2013/NĐ-CP", right: "2013 — quản lí, cung cấp, sử dụng dịch vụ Internet" },
        { left: "Luật An ninh mạng", right: "2018 — bảo vệ an ninh trên không gian mạng" },
      ],
      explanation: "Ba văn bản bổ sung cho nhau, tạo hành lang pháp lí cho hoạt động trên Internet.",
    },
    {
      id: "su-dung-dung-luat", name: "Sử dụng Internet đúng luật", type: "knowledge",
      goal: "Nêu các nhóm hành vi cần tránh để dùng Internet đúng pháp luật.",
      time: 240,
      task: "Đọc phần 'Sử dụng dịch vụ Internet đúng luật' (SGK tr.18–19). Nhóm liệt kê các hành vi cần tránh.",
      sgkImage: "assets/sgk/sgk-trang19.jpg",
      content: {
        heading: "✅ Dùng Internet có trách nhiệm",
        revealLabel: "🔍 Hiện các hành vi cần tránh",
        blocks: [
          { kind: "list", value: [
            "Vi phạm an ninh quốc gia, trật tự an toàn xã hội (chia sẻ tin chưa kiểm chứng, bình luận sai trái…).",
            "Vi phạm quyền nhân thân, uy tín cá nhân/tổ chức (đăng ảnh, địa chỉ, biển số… khi chưa được đồng ý).",
            "Vi phạm sở hữu trí tuệ, sở hữu tài sản, đánh bạc (chia sẻ sản phẩm số trái phép, đánh bạc trực tuyến).",
            "Vi phạm an toàn thông tin trên không gian mạng (phát tán virus qua liên kết lừa đảo).",
            "Tuyên truyền/quảng cáo trái quy định, trái thuần phong mĩ tục (quảng cáo vũ khí, buôn bán động vật quý hiếm…).",
            "Xuyên tạc lịch sử, phá hoại khối đại đoàn kết, phân biệt đối xử về tôn giáo/giới/chủng tộc/vùng miền.",
          ] },
        ],
      },
      remember: [
        "Người dùng Internet phải có TRÁCH NHIỆM, ứng xử lành mạnh, có văn hoá và KHÔNG vi phạm pháp luật.",
        "Cẩn trọng bản quyền; cảnh giác với giao tiếp trên mạng; tôn trọng mọi người.",
      ],
    },

    /* ===================== TÌNH HUỐNG ===================== */
    {
      id: "tinh-huong", name: "Xử lí tình huống", type: "vandung",
      goal: "Vận dụng nhận diện hành vi & ứng xử an toàn.",
      time: 300,
      task: "Nhóm đọc từng tình huống, quyết định nên làm gì và vì sao, rồi bấm xem gợi ý.",
      intro: "Gặp các tình huống sau trên mạng, em sẽ xử lí thế nào?",
      cases: [
        {
          question: "Minh nhận một liên kết lạ từ một bạn mới quen trên mạng, yêu cầu chia sẻ liên kết cho 5 bạn và truy cập để nhận 'quà là chiếc ba lô rất đẹp'. Minh có nên làm theo không?",
          answer: "KHÔNG nên. Minh không biết liên kết đó chứa nội dung gì — có thể là lừa đảo, phát tán virus, hoặc bẫy lấy cắp thông tin. Không truy cập, không chia sẻ; nên cảnh giác và hỏi người lớn khi cần.",
        },
        {
          question: "Em thấy một bài viết 'giật gân' chưa rõ nguồn, nhiều bạn đang chia sẻ. Em có nên chia sẻ tiếp cho nhanh 'kịp trend' không?",
          answer: "KHÔNG. Chia sẻ, phát tán thông tin chưa kiểm chứng có thể vô tình tiếp tay phát tán tin sai — vi phạm pháp luật về an ninh, trật tự xã hội. Cần kiểm chứng nguồn trước khi chia sẻ.",
        },
        {
          question: "Em cần một bức ảnh đẹp của người khác để làm bài thuyết trình. Em nên làm gì cho đúng?",
          answer: "Xin phép chủ sở hữu và/hoặc ghi rõ nguồn; ưu tiên ảnh có giấy phép sử dụng. Tự ý tải và dùng như của mình là vi phạm bản quyền (sở hữu trí tuệ).",
        },
      ],
    },

    /* ===================== HĐ3: LUYỆN TẬP ===================== */
    {
      id: "luyen-tap", name: "Luyện tập", type: "quiz",
      goal: "Củng cố nhận diện hành vi đúng/sai và khung pháp lí.",
      time: 360,
      task: "Thảo luận, chọn đáp án đúng cho mỗi câu.",
      questions: [
        {
          question: "Chọn TẤT CẢ hành vi VI PHẠM pháp luật, trái đạo đức hoặc thiếu văn hoá.",
          type: "multiple-select",
          options: ["Tải ảnh trên Internet chưa được phép và dùng như của mình", "Dùng ngôn ngữ phản cảm khi giao tiếp trên mạng xã hội", "Chúc mừng sinh nhật bạn trên mạng xã hội", "Đăng hình ảnh, video bôi nhọ, xúc phạm tập thể/cá nhân"],
          answer: [0, 1, 3], explanation: "A, B, D là hành vi vi phạm. C (chúc mừng sinh nhật) là ứng xử bình thường, văn minh.",
          level: "thong-hieu", activity: "luyen-tap",
        },
        {
          question: "Hành vi nào sau đây KHÔNG vi phạm pháp luật, trái đạo đức, thiếu văn hoá?",
          type: "multiple-choice",
          options: ["Đăng bài hoặc bình luận gây mâu thuẫn vùng miền", "Quảng cáo bán hàng hoá, dịch vụ bị cấm", "Sử dụng trái phép tài khoản mạng của tổ chức, cá nhân khác", "Chia sẻ thông tin về lớp học ngôn ngữ lập trình trực tuyến"],
          answer: 3, explanation: "D là hành vi bình thường, hữu ích. A, B, C đều là hành vi vi phạm.",
          level: "van-dung", activity: "luyen-tap",
        },
        {
          question: "Luật An ninh mạng của Việt Nam được ban hành năm nào?",
          type: "multiple-choice",
          options: ["Năm 2006", "Năm 2013", "Năm 2018", "Năm 2020"],
          answer: 2, explanation: "Luật An ninh mạng ban hành năm 2018 (Luật CNTT 2006, Nghị định 72 năm 2013).",
          level: "nhan-biet", activity: "luyen-tap",
        },
        {
          question: "Chọn TẤT CẢ cách giúp em TRÁNH tác động tiêu cực khi dùng công nghệ số.",
          type: "multiple-select",
          options: ["Không sử dụng thiết bị số trong thời gian dài và liên tục", "Không xem các video phản cảm", "Giảm thời gian dùng điện thoại để nói chuyện với gia đình", "Tham gia luyện tập thể dục thể thao"],
          answer: [0, 1, 3], explanation: "A, B, D là cách tốt. C thì ngược lại — giảm trò chuyện với gia đình không giúp gì, còn làm giảm gắn kết. (Lưu ý: đáp án SGV ghi A, B; ở đây tính cả D vì thể thao là biện pháp lành mạnh giảm thời gian màn hình — GV linh hoạt.)",
          level: "van-dung", activity: "luyen-tap",
        },
        {
          question: "Sử dụng phần mềm KHÔNG có bản quyền là hành vi gì?",
          type: "multiple-choice",
          options: ["Vi phạm pháp luật (sở hữu trí tuệ)", "Hành vi bình thường, ai cũng làm", "Ứng xử thiếu văn hoá nhưng hợp pháp", "Chỉ vi phạm nếu bị phát hiện"],
          answer: 0, explanation: "Dùng phần mềm không bản quyền là vi phạm pháp luật về sở hữu trí tuệ, dù có bị phát hiện hay không.",
          level: "thong-hieu", activity: "luyen-tap",
        },
      ],
    },

    /* ===================== HĐ4: VẬN DỤNG ===================== */
    {
      id: "van-dung", name: "Vận dụng — So sánh Luật & Nghị định", type: "vandung",
      goal: "Tìm hiểu, so sánh hành vi bị cấm trong Luật CNTT 2006 và Nghị định 72/2013.",
      time: 300,
      task: "Nhóm tra cứu & thảo luận: hành vi bị cấm trong Luật CNTT 67/2006 và Nghị định 72/2013 giống & khác nhau thế nào? Bấm xem gợi ý.",
      intro: "Bài tập tìm hiểu văn bản pháp luật + trò chơi 'Tìm từ khoá' cuối tiết.",
      cases: [
        {
          question: "So sánh các hành vi bị cấm trong Luật CNTT 67/2006/QH11 và Nghị định 72/2013/NĐ-CP: GIỐNG nhau ở điểm nào?",
          answer: "Giống: cả hai đều nhằm quản lí, điều chỉnh việc sử dụng CNTT; đều quy định các hành vi bị cấm như vi phạm bí mật thông tin, xâm phạm quyền riêng tư, tấn công hệ thống thông tin, phát tán thông tin sai sự thật, vi phạm bản quyền phần mềm…",
        },
        {
          question: "…và KHÁC nhau ở điểm nào?",
          answer: "Khác: Luật CNTT (2006) ban hành trước, phạm vi rộng — áp dụng cho mọi tổ chức, cá nhân liên quan CNTT. Nghị định 72 (2013) ban hành sau, cụ thể hoá & hướng dẫn thực hiện, tập trung vào Internet và dịch vụ trực tuyến, có tính cập nhật hơn.",
        },
        {
          question: "Trò chơi 'Tìm từ khoá' (cuối tiết): xâu chuỗi các từ khoá của bài thành nội dung tổng kết.",
          answer: "Từ khoá gợi ý: TÍCH CỰC · TIÊU CỰC · NGHIỆN GAME · LỆ THUỘC · CÔ ĐỘC · QUYỀN RIÊNG TƯ · THÔNG TIN CÁ NHÂN · TRÁCH NHIỆM · LÀNH MẠNH · PHÁP LUẬT. Xâu chuỗi: Công nghệ số có mặt tích cực và tiêu cực (nghiện game, lệ thuộc, cô độc, mất quyền riêng tư/thông tin cá nhân) → cần dùng Internet có trách nhiệm, lành mạnh, đúng pháp luật.",
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
          {
            question: "Hành vi nào dưới đây là ứng xử ĐÚNG khi hoạt động trên môi trường số?",
            type: "multiple-choice",
            options: ["Xin phép và ghi nguồn khi dùng ảnh của người khác", "Chia sẻ ngay tin giật gân chưa kiểm chứng", "Dùng phần mềm bẻ khoá cho tiện", "Bình luận xúc phạm người khác quan điểm"],
            answer: 0, explanation: "Xin phép & ghi nguồn là tôn trọng bản quyền — ứng xử đúng. Ba phương án còn lại đều vi phạm.",
            level: "thong-hieu", activity: "tong-ket",
          },
          {
            question: "Bạn em định lập nhóm chuyên 'bóc phốt', đăng ảnh và địa chỉ nhà của một người để cả nhóm chỉ trích. Em nên khuyên bạn thế nào?",
            type: "multiple-choice",
            options: ["Ủng hộ, cùng tham gia cho vui", "Khuyên dừng lại: đăng thông tin cá nhân khi chưa được phép và xúc phạm người khác là vi phạm pháp luật (quyền nhân thân)", "Kệ bạn, không liên quan đến mình", "Chỉ tham gia xem, không đăng gì"],
            answer: 1, explanation: "Đăng ảnh/địa chỉ người khác khi chưa được đồng ý và xúc phạm họ vi phạm quyền nhân thân, uy tín — cần khuyên bạn dừng lại.",
            level: "van-dung-cao", activity: "tong-ket",
          },
        ],
      },
    },
  ],
};
if (typeof module !== "undefined" && module.exports) module.exports = LESSON;
if (typeof window !== "undefined") window.LESSON = LESSON;
