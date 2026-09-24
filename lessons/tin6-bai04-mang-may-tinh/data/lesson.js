/* ============================================================================
 * BÀI 4 — MẠNG MÁY TÍNH  (Tin học 6 — Kết nối tri thức với cuộc sống)
 * Chủ đề 2: Mạng máy tính và Internet.
 * Bám sát SGK trang 16–19 + Kế hoạch bài dạy của giáo viên.
 * Chỉ sửa file này để đổi nội dung. Engine app.js không cần sửa.
 * ==========================================================================*/

/* ---- Sơ đồ 2 máy tính kết nối ---- */
function twoPCsSVG() {
  const pc = (x, color) => `<g><rect x="${x}" y="40" width="86" height="60" rx="8" fill="#fff" stroke="${color}" stroke-width="3"/><rect x="${x+10}" y="50" width="66" height="40" rx="3" fill="${color}" opacity="0.18"/><rect x="${x+28}" y="102" width="30" height="8" rx="2" fill="${color}"/></g>`;
  return `<svg viewBox="0 0 460 150" width="100%" style="max-height:26vh" xmlns="http://www.w3.org/2000/svg" role="img">
    ${pc(30,"#0284c7")}${pc(344,"#f97316")}
    <line x1="116" y1="70" x2="344" y2="70" stroke="#22c55e" stroke-width="4" stroke-dasharray="10 6"/>
    <text x="230" y="58" text-anchor="middle" font-size="18" font-weight="800" fill="#16a34a">kết nối</text>
    <text x="230" y="92" text-anchor="middle" font-size="15" fill="#55708a">trao đổi dữ liệu</text>
    <text x="73" y="132" text-anchor="middle" font-size="15" font-weight="700" fill="#0284c7">Máy của Minh</text>
    <text x="387" y="132" text-anchor="middle" font-size="15" font-weight="700" fill="#f97316">Máy của An</text>
  </svg>`;
}

/* ---- Sơ đồ mạng có bộ chuyển mạch: đầu cuối (xanh) + kết nối (cam) ---- */
function netSVG() {
  return `<svg viewBox="0 0 560 300" width="100%" style="max-height:44vh" xmlns="http://www.w3.org/2000/svg" role="img">
    <rect x="230" y="130" width="100" height="34" rx="8" fill="#f97316"/><text x="280" y="152" text-anchor="middle" font-size="15" font-weight="800" fill="#fff">Switch</text>
    ${[[60,40,"💻 Máy để bàn"],[430,40,"🖨️ Máy in"],[60,240,"🖥️ Máy chủ"],[430,240,"📱 Điện thoại"]].map(n=>
      `<line x1="280" y1="147" x2="${n[0]+55}" y2="${n[1]+22}" stroke="#94a3b8" stroke-width="3"/>`+
      `<rect x="${n[0]}" y="${n[1]}" width="110" height="44" rx="10" fill="#e0f2fe" stroke="#0284c7" stroke-width="2.5"/>`+
      `<text x="${n[0]+55}" y="${n[1]+28}" text-anchor="middle" font-size="15" font-weight="700" fill="#0c2a40">${n[2]}</text>`).join("")}
    <text x="280" y="196" text-anchor="middle" font-size="14" fill="#f97316" font-weight="700">Thiết bị KẾT NỐI</text>
    <text x="280" y="118" text-anchor="middle" font-size="14" fill="#0284c7" font-weight="700">Thiết bị ĐẦU CUỐI (điểm đầu/cuối)</text>
  </svg>`;
}

/* ---- Sơ đồ hình sao & hình vòng (vận dụng) ---- */
function topologySVG() {
  const node = (x, y) => `<rect x="${x-16}" y="${y-12}" width="32" height="24" rx="5" fill="#22c55e"/>`;
  // star
  let star = `<text x="150" y="24" text-anchor="middle" font-size="16" font-weight="800" fill="#0284c7">Hình sao</text>`;
  const sc = [150, 95]; const spts = [[70,55],[230,55],[70,150],[230,150]];
  spts.forEach(p => star += `<line x1="${sc[0]}" y1="${sc[1]}" x2="${p[0]}" y2="${p[1]}" stroke="#94a3b8" stroke-width="3"/>`);
  star += node(sc[0], sc[1]) + spts.map(p => node(p[0], p[1])).join("");
  // ring
  let ring = `<text x="440" y="24" text-anchor="middle" font-size="16" font-weight="800" fill="#f97316">Hình vòng</text>`;
  const rp = [[440,50],[520,100],[490,165],[390,165],[360,100]];
  for (let i = 0; i < rp.length; i++) { const a = rp[i], b = rp[(i+1)%rp.length]; ring += `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="#94a3b8" stroke-width="3"/>`; }
  ring += rp.map(p => node(p[0], p[1])).join("");
  return `<svg viewBox="0 0 580 190" width="100%" style="max-height:32vh" xmlns="http://www.w3.org/2000/svg" role="img">${star}${ring}</svg>`;
}

const LESSON = {
  meta: {
    subject: "Tin học", grade: "6", book: "Kết nối tri thức với cuộc sống",
    title: "Bài 4: Mạng máy tính", unit: "Chủ đề 2 — Mạng máy tính và Internet",
    pages: "16–19", durationMinutes: 45,
  },
  objectives: {
    knowledge: [
      "Nêu được mạng máy tính là gì và lợi ích của nó trong cuộc sống.",
      "Kể được tên những thành phần chính của một mạng máy tính.",
      "Nêu được ví dụ mạng không dây tiện dụng hơn mạng có dây.",
    ],
    competencies: [
      "Tự chủ – tự học; giao tiếp – hợp tác; giải quyết vấn đề.",
      "Năng lực số: chia sẻ thông tin qua mạng, chọn giải pháp mạng phù hợp (2.2/2.4/5.1/5.2.TC1).",
    ],
    qualities: ["Chăm chỉ, trung thực, trách nhiệm; kỉ luật khi tham gia mạng lưới"],
  },
  coreKnowledge: [
    "Mạng máy tính = hai hay nhiều máy tính và thiết bị được kết nối để truyền thông tin cho nhau.",
    "Lợi ích: trao đổi thông tin, chia sẻ dữ liệu và dùng chung thiết bị trên mạng.",
    "Mạng máy tính gồm 3 thành phần: thiết bị đầu cuối, thiết bị kết nối, phần mềm mạng.",
    "Thiết bị đầu cuối = điểm đầu/cuối (máy tính, điện thoại, máy in…); thiết bị kết nối = nối các đầu cuối (switch, router…).",
    "Mạng không dây (Wi-Fi, Bluetooth) linh hoạt, dễ lắp đặt → nhiều trường hợp tiện hơn mạng có dây.",
  ],
  keywords: ["Mạng máy tính", "Kết nối & chia sẻ", "Đầu cuối · kết nối · phần mềm", "Có dây / không dây"],
  settings: { basePoints: 100, useTimer: false, defaultTime: 60, sound: false, streakEnabled: true },

  activities: [
    /* ===================== HĐ1: MỞ ĐẦU ===================== */
    {
      id: "khoi-dong", name: "Khởi động — Mạng lưới quanh ta", type: "intro",
      goal: "Từ mạng giao thông đường bộ, rút ra đặc điểm chung: kết nối và chia sẻ.",
      time: 240,
      task: "Nhóm: kể vài 'mạng lưới' giống mạng giao thông đường bộ và cho biết trên đó vận chuyển gì.",
      sgkImage: "assets/sgk/sgk-trang16.jpg",
      content: {
        heading: "🛣️ Đường sá cũng là một mạng lưới",
        prompt: "Các con đường nối nhà, làng, thành phố… thành mạng lưới, đưa mọi người đến với nhau. Còn những 'mạng lưới' nào khác quanh em?",
        blocks: [
          { kind: "list", value: ["Mạng đường sắt, đường thuỷ, đường hàng không.", "Mạng ống nước, mạng lưới điện.", "Mạng điện thoại…"] },
          { kind: "text", value: "👉 Điểm chung: chúng đều KẾT NỐI các thành viên/nơi chốn lại với nhau." },
        ],
        revealLabel: "🔍 Gợi ý một số mạng lưới",
      },
      questions: [
        {
          question: "Điểm chung của các 'mạng lưới' (giao thông, sông ngòi, ống nước, điện thoại…) là gì?",
          type: "multiple-choice",
          options: ["Kết nối các thành viên với nhau", "Có nhiều đường cắt nhau", "Chỉ dùng cho một người", "Không cần bảo trì"],
          answer: 0, explanation: "Chính xác! Đặc điểm chung là KẾT NỐI các thành viên/nơi chốn để trao đổi, chia sẻ.",
          level: "thong-hieu", activity: "khoi-dong",
        },
      ],
    },

    /* ===================== HĐ2.1: MẠNG MÁY TÍNH LÀ GÌ ===================== */
    {
      id: "mang-la-gi", name: "Mạng máy tính là gì?", type: "knowledge",
      goal: "Nêu được khái niệm mạng máy tính và hai việc mạng chia sẻ.",
      time: 300,
      task: "Đọc mục 1 (SGK tr.17). Nhóm trả lời: mạng máy tính là gì? Mạng máy tính chia sẻ những gì?",
      sgkImage: "assets/sgk/sgk-trang17.jpg",
      content: {
        heading: "💻🔗💻 Hai máy nối nhau là đã có mạng",
        revealLabel: "🔍 Hiện khái niệm & ví dụ",
        blocks: [
          { kind: "svg", value: twoPCsSVG() },
          { kind: "text", value: "Giống mạng giao thông, các máy tính được kết nối với nhau tạo thành MẠNG MÁY TÍNH. Chỉ cần hai máy tính kết nối là đã có một mạng máy tính." },
          { kind: "html", value:
            '<div style="display:flex;gap:12px;flex-wrap:wrap;justify-content:center;margin-top:6px">' +
            '<div style="flex:1;min-width:230px;background:#e0f2fe;border:2px solid #0284c7;border-radius:14px;padding:12px"><b style="color:#0369a1">🔄 Trao đổi dữ liệu</b><div style="font-size:14px">Minh gửi tệp ảnh từ máy mình sang máy An khi hai máy được kết nối.</div></div>' +
            '<div style="flex:1;min-width:230px;background:#fff7ed;border:2px solid #f97316;border-radius:14px;padding:12px"><b style="color:#c2410c">🖨️ Chia sẻ thiết bị</b><div style="font-size:14px">Chỉ một máy in nhưng có mạng thì cả lớp in chung từ máy bất kì.</div></div>' +
            '</div>' },
        ],
      },
      questions: [
        {
          question: "Mạng máy tính là gì?",
          type: "multiple-choice",
          options: ["Một máy tính có nhiều màn hình", "Hai hay nhiều máy tính & thiết bị được kết nối để truyền thông tin cho nhau", "Một chiếc máy in nối với máy tính", "Một trang web trên Internet"],
          answer: 1, explanation: "Chính xác! Hai hay nhiều máy tính & thiết bị kết nối để truyền thông tin cho nhau tạo thành mạng máy tính.",
          level: "nhan-biet", activity: "mang-la-gi",
        },
      ],
      remember: [
        "Mạng máy tính = hai hay nhiều máy tính & thiết bị kết nối để truyền thông tin cho nhau.",
        "Trên mạng, ta trao đổi dữ liệu và chia sẻ (dùng chung) thiết bị.",
      ],
    },
    {
      id: "loi-ich", name: "Lợi ích của mạng máy tính", type: "matching",
      goal: "Củng cố 3 lợi ích của mạng máy tính qua ví dụ.",
      time: 180,
      task: "Nối mỗi lợi ích của mạng máy tính với một ví dụ thực tế.",
      sgkImage: "assets/sgk/sgk-trang17.jpg",
      intro: "Người dùng mạng có thể liên lạc, chia sẻ dữ liệu và dùng chung thiết bị.",
      pairs: [
        { left: "Trao đổi thông tin", right: "Gửi email, nhắn tin cho bạn học nhóm" },
        { left: "Chia sẻ dữ liệu", right: "Cùng xem, sửa một tệp tài liệu chung" },
        { left: "Dùng chung thiết bị", right: "Cả phòng in chung một máy in" },
      ],
      explanation: "Ba lợi ích lớn của mạng: liên lạc – chia sẻ dữ liệu – dùng chung thiết bị.",
    },

    /* ===================== HĐ2.2: THÀNH PHẦN MẠNG ===================== */
    {
      id: "thanh-phan", name: "3 thành phần của mạng máy tính", type: "knowledge",
      goal: "Kể được 3 thành phần và phân biệt thiết bị đầu cuối / kết nối.",
      time: 300,
      task: "Quan sát Hình 2.1 (SGK tr.18). Nhóm: kể các thiết bị nối vào mạng; chúng nối qua thiết bị trung gian nào?",
      sgkImage: "assets/sgk/sgk-trang18.jpg",
      content: {
        heading: "🧩 Mạng máy tính gồm những gì?",
        revealLabel: "🔍 Hiện 3 thành phần",
        blocks: [
          { kind: "svg", value: netSVG() },
          { kind: "html", value:
            '<ol style="font-size:17px;line-height:1.7">' +
            '<li><b style="color:#0284c7">Thiết bị đầu cuối</b> — điểm đầu/cuối: máy tính để bàn, xách tay, điện thoại thông minh, máy in, máy quét, máy chủ, máy ảnh…</li>' +
            '<li><b style="color:#f97316">Thiết bị kết nối</b> — nối các đầu cuối: đường truyền (có/không dây), bộ chia (Hub), bộ chuyển mạch (Switch), bộ định tuyến (Router/Wireless Router), điểm truy cập (Access Point).</li>' +
            '<li><b style="color:#a855f7">Phần mềm mạng</b> — ứng dụng truyền thông & phần mềm điều khiển quá trình truyền dữ liệu (như "luật lệ giao thông" của mạng).</li>' +
            '</ol>' },
        ],
      },
      remember: [
        "Mạng máy tính gồm 3 thành phần: thiết bị ĐẦU CUỐI · thiết bị KẾT NỐI · PHẦN MỀM mạng.",
      ],
    },
    {
      id: "phan-loai-thiet-bi", name: "Trò chơi: Đầu cuối hay Kết nối?", type: "dragdrop",
      goal: "Phân biệt thiết bị đầu cuối và thiết bị kết nối.",
      time: 180,
      task: "Chọn từng thiết bị rồi bấm vào đúng nhóm: 'Thiết bị đầu cuối' hay 'Thiết bị kết nối'.",
      sgkImage: "assets/sgk/sgk-trang18.jpg",
      groups: ["Thiết bị ĐẦU CUỐI", "Thiết bị KẾT NỐI"],
      items: [
        { text: "Máy tính để bàn", group: 0 },
        { text: "Điện thoại thông minh", group: 0 },
        { text: "Máy in", group: 0 },
        { text: "Bộ chuyển mạch (Switch)", group: 1 },
        { text: "Bộ định tuyến (Router)", group: 1 },
        { text: "Điểm truy cập không dây (Access Point)", group: 1 },
      ],
      explanation: "Đầu cuối là nơi bắt đầu/kết thúc dữ liệu (máy tính, điện thoại, máy in). Thiết bị kết nối làm 'con đường/nhà ga' nối chúng lại (switch, router, access point).",
    },

    /* ===================== CÓ DÂY / KHÔNG DÂY ===================== */
    {
      id: "co-day-khong-day", name: "Có dây và không dây", type: "knowledge",
      goal: "So sánh kết nối có dây và không dây; nêu ví dụ không dây tiện hơn.",
      time: 240,
      task: "Đọc SGK tr.19. Nhóm: kể vài cách kết nối không dây; nêu ví dụ không dây tiện hơn có dây.",
      sgkImage: "assets/sgk/sgk-trang19.jpg",
      content: {
        heading: "📶 Có dây vs Không dây",
        revealLabel: "🔍 Hiện so sánh",
        blocks: [
          { kind: "html", value:
            '<div style="display:flex;gap:14px;flex-wrap:wrap">' +
            '<div style="flex:1;min-width:240px;background:#eff6ff;border:2px solid #0284c7;border-radius:14px;padding:12px"><b style="color:#0369a1">🔌 Có dây</b><div style="font-size:14px">Dùng dây dẫn mạng. Ổn định nhưng khó di chuyển, phải đi dây/khoan tường, dễ đứt do mưa bão hay chuột cắn.</div></div>' +
            '<div style="flex:1;min-width:240px;background:#fff7ed;border:2px solid #f97316;border-radius:14px;padding:12px"><b style="color:#c2410c">📡 Không dây</b><div style="font-size:14px">Dùng sóng vô tuyến: Wi-Fi, Bluetooth, wireless USB. Linh hoạt di chuyển, dễ lắp đặt, phổ biến ở sân bay, nhà ga, trường học…</div></div>' +
            '</div>' },
          { kind: "text", value: "Ví dụ không dây tiện hơn: khi đi xe khách/du lịch, em vẫn dùng điện thoại truy cập Internet qua sóng di động/Wi-Fi mà không cần dây nối." },
        ],
      },
      questions: [
        {
          question: "Đâu là các cách kết nối KHÔNG DÂY?",
          type: "multiple-select",
          options: ["Wi-Fi", "Cáp mạng (dây LAN)", "Bluetooth", "Wireless USB"],
          answer: [0, 2, 3], explanation: "Wi-Fi, Bluetooth, Wireless USB là kết nối không dây. Cáp mạng LAN là kết nối có dây.",
          level: "thong-hieu", activity: "co-day-khong-day",
        },
      ],
      remember: ["Không dây (Wi-Fi, Bluetooth) linh hoạt, dễ lắp đặt — nhiều trường hợp tiện hơn có dây."],
    },

    /* ===================== HĐ3: LUYỆN TẬP ===================== */
    {
      id: "luyen-tap", name: "Luyện tập", type: "quiz",
      goal: "Củng cố khái niệm, thành phần và kết nối không dây.",
      time: 300,
      task: "Thảo luận, chọn (các) đáp án đúng cho mỗi câu.",
      sgkImage: "assets/sgk/sgk-trang19.jpg",
      questions: [
        {
          question: "Máy tính kết nối với nhau ĐỂ làm gì? (chọn tất cả đáp án đúng)",
          type: "multiple-select",
          options: ["Chia sẻ các thiết bị", "Tiết kiệm điện", "Trao đổi dữ liệu", "Thuận lợi cho việc sửa chữa"],
          answer: [0, 2], explanation: "Máy tính nối mạng để chia sẻ thiết bị và trao đổi dữ liệu (A, C). B và D không phải mục đích của việc nối mạng.",
          level: "thong-hieu", activity: "luyen-tap",
        },
        {
          question: "Trong Hình 2.2, thiết bị nào có kết nối KHÔNG DÂY? (chọn tất cả)",
          type: "multiple-select",
          options: ["Máy tính để bàn", "Máy tính xách tay", "Điện thoại di động", "Bộ định tuyến (có dây)"],
          answer: [1, 2], explanation: "Máy tính xách tay và điện thoại di động kết nối không dây (B, C). Máy để bàn và bộ định tuyến trong hình nối bằng dây.",
          level: "van-dung", activity: "luyen-tap",
        },
        {
          question: "Mạng máy tính gồm mấy thành phần chính?",
          type: "multiple-choice",
          options: ["1 thành phần", "2 thành phần", "3 thành phần", "4 thành phần"],
          answer: 2, explanation: "3 thành phần: thiết bị đầu cuối, thiết bị kết nối, phần mềm mạng.",
          level: "nhan-biet", activity: "luyen-tap",
        },
        {
          question: "Nhà bạn Lan chỉ có 1 máy in nhưng cả 3 máy tính đều in được. Điều đó thể hiện lợi ích nào của mạng?",
          type: "multiple-choice",
          options: ["Tiết kiệm điện", "Máy in chạy nhanh hơn", "Không cần Internet", "Dùng chung (chia sẻ) thiết bị"],
          answer: 3, explanation: "Máy in được chia sẻ để cả 3 máy dùng chung — đó là lợi ích 'dùng chung thiết bị' của mạng.",
          level: "van-dung", activity: "luyen-tap",
        },
      ],
    },

    /* ===================== HĐ4: VẬN DỤNG ===================== */
    {
      id: "noi-5-may", name: "Vận dụng — Nối 5 máy thành một mạng", type: "knowledge",
      goal: "Hình dung nhiều cách kết nối các máy thành một mạng.",
      time: 240,
      task: "Phòng thư viện có 5 máy tính cần nối thành một mạng. Nhóm hãy VẼ 2 cách khác nhau để nối chúng, rồi so với gợi ý.",
      sgkImage: "assets/sgk/sgk-trang19.jpg",
      content: {
        heading: "🖥️ Có nhiều cách nối 5 máy",
        revealLabel: "🔍 Xem 2 cách mẫu (hình sao & hình vòng)",
        blocks: [
          { kind: "svg", value: topologySVG() },
          { kind: "text", value: "Hình SAO: mọi máy nối về một thiết bị trung tâm. Hình VÒNG: các máy nối tiếp nhau thành vòng khép kín. Ngoài ra còn cách nối qua bộ chuyển mạch, nối thẳng đôi một…" },
        ],
      },
    },
    {
      id: "van-dung", name: "Vận dụng — Nhận diện mạng thực tế", type: "vandung",
      goal: "Nhận diện một mạng máy tính trong đời sống và chỉ ra thành phần.",
      time: 240,
      task: "Nhóm thảo luận, trả lời rồi bấm xem gợi ý của giáo viên.",
      cases: [
        {
          question: "Nhà bạn An có điện thoại của bố, của mẹ và một máy tính xách tay đang cùng truy cập Internet. Đó có phải một mạng máy tính không? Chỉ ra thiết bị đầu cuối và kết nối.",
          answer: "CÓ — chúng được kết nối để truyền thông tin nên tạo thành một mạng. Thiết bị ĐẦU CUỐI: 2 điện thoại + máy tính xách tay. Thiết bị KẾT NỐI: bộ định tuyến không dây (Wi-Fi) của nhà, cùng sóng Wi-Fi.",
        },
        {
          question: "Hãy nêu thêm một ví dụ trong đời sống cho thấy mạng KHÔNG DÂY tiện hơn mạng có dây.",
          answer: "Ví dụ: ở trường/quán cà phê/sân bay, nhiều người dùng điện thoại, laptop truy cập Wi-Fi ở bất kì chỗ ngồi nào mà không phải kéo dây tới từng người; hoặc tai nghe Bluetooth không vướng dây khi di chuyển.",
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
            question: "Thiết bị nào sau đây là thiết bị KẾT NỐI (không phải đầu cuối)?",
            type: "multiple-choice",
            options: ["Máy in", "Điện thoại thông minh", "Bộ định tuyến (Router)", "Máy tính xách tay"],
            answer: 2, explanation: "Bộ định tuyến (Router) là thiết bị kết nối. Máy in, điện thoại, laptop là thiết bị đầu cuối.",
            level: "thong-hieu", activity: "tong-ket",
          },
          {
            question: "Bạn cần lắp mạng cho một quán cà phê để khách dùng laptop, điện thoại ở mọi bàn. Nên chọn kết nối nào và vì sao?",
            type: "multiple-choice",
            options: ["Không dây (Wi-Fi), vì khách di chuyển linh hoạt, không cần đi dây tới từng bàn", "Có dây, vì ổn định tuyệt đối", "Không cần mạng", "Chỉ dùng Bluetooth giữa 2 máy"],
            answer: 0, explanation: "Wi-Fi phù hợp: khách ngồi bàn nào cũng truy cập được, không phải đi dây tới từng bàn — không dây tiện hơn.",
            level: "van-dung-cao", activity: "tong-ket",
          },
        ],
      },
    },
  ],
};
if (typeof module !== "undefined" && module.exports) module.exports = LESSON;
if (typeof window !== "undefined") window.LESSON = LESSON;
