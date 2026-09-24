/* ============================================================================
 * DỮ LIỆU BÀI HỌC — Tin học 7, Bài 1: THIẾT BỊ VÀO – RA
 * Bộ sách: Kết nối tri thức với cuộc sống · Chủ đề 1: Máy tính và cộng đồng
 * Nguồn: SGK Tin học 7 (tr.5–9) + Kế hoạch bài dạy (giáo án) kèm theo.
 *
 * GIÁO VIÊN CHỈNH NỘI DUNG TẠI ĐÂY: sửa văn bản trong dấu nháy rồi lưu lại,
 * tải lại trang (F5). Không cần biết lập trình. Không sửa file app.js.
 * ==========================================================================*/
const LESSON = {
  meta: {
    subject: "Tin học", grade: "7", book: "Kết nối tri thức với cuộc sống",
    title: "Bài 1: Thiết bị vào – ra", unit: "Chủ đề 1: Máy tính và cộng đồng",
    pages: "5–9", durationMinutes: 45,
  },
  objectives: {
    knowledge: [
      "Biết và nhận ra được các thiết bị vào – ra có nhiều loại, hình dạng khác nhau.",
      "Biết chức năng của thiết bị vào – ra trong thu nhận, lưu trữ, xử lí và truyền thông tin.",
      "Thực hiện đúng thao tác với các thiết bị thông dụng của máy tính.",
      "Nêu được ví dụ về thao tác không đúng cách gây lỗi cho thiết bị.",
    ],
    competencies: [
      "Năng lực số: nhận biết nguy cơ mất an toàn, thao tác đúng trình tự, xử lí lỗi đơn giản.",
      "Tự học, giao tiếp – hợp tác (thảo luận nhóm), giải quyết vấn đề.",
    ],
    qualities: ["Chăm chỉ", "Trung thực", "Trách nhiệm", "Nhân ái"],
  },
  coreKnowledge: [
    "Thiết bị vào dùng để NHẬP thông tin vào máy tính (bàn phím, chuột, micro, máy ảnh…).",
    "Thiết bị ra dùng để XUẤT thông tin từ máy tính ra ngoài (màn hình, máy in, loa…).",
    "Sơ đồ xử lí thông tin: Thiết bị vào → Bộ xử lí ↔ Bộ nhớ → Thiết bị ra.",
    "Thiết bị vào – ra rất đa dạng; một số thiết bị vừa vào vừa ra (màn hình cảm ứng, máy tính bảng).",
    "Kết nối thiết bị đúng cổng; cấp nguồn điện SAU khi đã kết nối để an toàn.",
    "Dùng máy tính an toàn: đọc kĩ hướng dẫn, tay khô ráo, tắt bằng Shut down, giữ nơi làm việc gọn gàng.",
  ],
  keywords: ["Thiết bị vào", "Thiết bị ra", "An toàn thiết bị"],
  settings: { basePoints: 100, useTimer: false, defaultTime: 20, sound: true, streakEnabled: true },

  activities: [
    /* ------------------------------------------------------------------ *
     * HOẠT ĐỘNG 1: MỞ ĐẦU
     * ------------------------------------------------------------------ */
    {
      id: "mo-dau", time: 240, task: "Nhớ lại 4 thành phần của máy tính và sơ đồ xử lí thông tin; nêu ví dụ.", name: "HĐ1: Mở đầu", type: "intro",
      goal: "Nhớ lại 4 thành phần của máy tính và sơ đồ xử lí thông tin.",
      content: {
        heading: "Máy tính xử lí thông tin như thế nào?",
        prompt: "Ở lớp 6, em đã biết máy tính cần bốn thành phần để hỗ trợ con người xử lí thông tin. Em hãy nhớ lại và cho ví dụ.",
        image: "assets/img/so-do-xu-li.png",
        imageCaption: "Sơ đồ: Thiết bị vào → Bộ xử lí ↔ Bộ nhớ → Thiết bị ra",
        blocks: [
          { kind: "list", value: [
            "Thiết bị vào — thu nhận thông tin đưa vào máy tính.",
            "Bộ xử lí (CPU) — xử lí thông tin.",
            "Bộ nhớ — lưu trữ thông tin.",
            "Thiết bị ra — đưa thông tin từ máy tính ra ngoài.",
          ] },
        ],
      },
      questions: [
        { question: "Ở lớp 6, em đã biết máy tính cần bao nhiêu thành phần để xử lí thông tin?",
          type: "multiple-choice", options: ["2 thành phần", "3 thành phần", "4 thành phần", "5 thành phần"],
          answer: 2, explanation: "Chính xác! Bốn thành phần: thiết bị vào, thiết bị ra, bộ xử lí và bộ nhớ.",
          level: "nhan-biet", activity: "mo-dau" },
        { question: "Trong sơ đồ trên, nhóm thành phần nào giúp máy tính TRAO ĐỔI dữ liệu với thế giới bên ngoài?",
          type: "multiple-choice", options: ["Bộ xử lí và bộ nhớ", "Thiết bị vào và thiết bị ra", "Chỉ bộ nhớ", "Chỉ bộ xử lí"],
          answer: 1, explanation: "Chính xác! Thiết bị vào – ra là cầu nối giúp máy tính trao đổi dữ liệu với bên ngoài.",
          level: "thong-hieu", activity: "mo-dau" },
      ],
      remember: [
        "Máy tính có 4 thành phần: thiết bị vào, bộ xử lí, bộ nhớ, thiết bị ra.",
        "Thiết bị vào – ra giúp máy tính trao đổi dữ liệu với thế giới bên ngoài.",
      ],
    },

    /* ------------------------------------------------------------------ *
     * HOẠT ĐỘNG 2.1.1: THIẾT BỊ VÀO – RA
     * ------------------------------------------------------------------ */
    {
      id: "tbvr-11", time: 300, task: "Quan sát Hình 1.1 (micro và loa) và phân biệt thiết bị VÀO với thiết bị RA.", name: "HĐ2.1.1: Thiết bị vào – ra", type: "knowledge",
      goal: "Nhận biết và phân biệt thiết bị vào với thiết bị ra.",
      content: {
        heading: "Thiết bị vào – ra là gì?",
        prompt: "Em hãy quan sát Hình 1.1 (Micro và loa) rồi trả lời các câu hỏi.",
        image: "assets/img/hinh1-1-micro-loa.png",
        imageCaption: "Hình 1.1. Micro và loa (SGK tr.5)",
        blocks: [
          { kind: "text", value: "Micro và loa đều làm việc với thông tin dạng âm thanh, nhưng theo hai chiều ngược nhau." },
          { kind: "list", value: [
            "Micro là thiết bị VÀO: thu nhận âm thanh, chuyển vào máy tính để mã hoá thành dữ liệu số.",
            "Loa là thiết bị RA: nhận dữ liệu từ máy tính, thể hiện ra ngoài dưới dạng âm thanh nghe được.",
          ] },
        ],
      },
      questions: [
        { question: "Micro và loa trong Hình 1.1 làm việc với dạng thông tin nào?",
          type: "multiple-choice", options: ["Văn bản", "Con số", "Âm thanh", "Hình ảnh"],
          answer: 2, explanation: "Chính xác! Micro thu âm thanh vào, loa phát âm thanh ra — cả hai đều là thông tin dạng âm thanh.",
          level: "nhan-biet", activity: "tbvr-11" },
        { question: "Thiết bị nào TIẾP NHẬN thông tin và chuyển VÀO máy tính?",
          type: "multiple-choice", options: ["Loa", "Micro", "Màn hình", "Máy in"],
          answer: 1, explanation: "Chính xác! Micro thu nhận âm thanh và chuyển vào máy tính, nên nó là thiết bị vào.",
          level: "thong-hieu", activity: "tbvr-11" },
        { question: "Thiết bị nào nhận thông tin từ máy tính rồi đưa RA bên ngoài?",
          type: "multiple-choice", options: ["Loa", "Micro", "Bàn phím", "Chuột"],
          answer: 0, explanation: "Chính xác! Loa nhận dữ liệu từ máy tính và phát ra âm thanh, nên nó là thiết bị ra.",
          level: "thong-hieu", activity: "tbvr-11" },
        { question: "Máy ảnh nhập thông tin dạng nào vào máy tính?",
          type: "multiple-choice", options: ["Con số", "Văn bản", "Hình ảnh", "Âm thanh"],
          answer: 2, explanation: "Chính xác! Máy ảnh đưa thông tin dạng hình ảnh vào máy tính (SGK tr.7).",
          level: "nhan-biet", activity: "tbvr-11" },
        { question: "Thiết bị nào XUẤT dữ liệu âm thanh từ máy tính ra ngoài?",
          type: "multiple-choice", options: ["Máy ảnh", "Micro", "Màn hình", "Loa"],
          answer: 3, explanation: "Chính xác! Loa xuất âm thanh từ máy tính ra ngoài (SGK tr.7).",
          level: "thong-hieu", activity: "tbvr-11" },
      ],
      remember: [
        "Thiết bị vào được dùng để NHẬP thông tin vào máy tính. Ví dụ: bàn phím, chuột, micro, máy ảnh.",
        "Thiết bị ra XUẤT thông tin từ máy tính ra để con người nhận biết. Ví dụ: màn hình, máy in, loa.",
      ],
    },

    /* ------------------------------------------------------------------ *
     * HOẠT ĐỘNG 2.1.2: SỰ ĐA DẠNG CỦA THIẾT BỊ VÀO – RA
     * ------------------------------------------------------------------ */
    {
      id: "tbvr-12", time: 300, task: "Quan sát Hình 1.2–1.3: mỗi thiết bị làm việc với dạng thông tin nào? Thiết bị nào vừa vào vừa ra?", name: "HĐ2.1.2: Sự đa dạng của thiết bị vào – ra", type: "knowledge",
      goal: "Thấy sự đa dạng của thiết bị vào – ra; nhận ra thiết bị vừa vào vừa ra.",
      content: {
        heading: "Thiết bị vào – ra rất đa dạng",
        prompt: "Quan sát Hình 1.2 và trả lời: mỗi thiết bị làm việc với dạng thông tin nào? Thiết bị nào có cả hai chức năng?",
        image: "assets/img/hinh1-2-thiet-bi-vao-ra.png",
        imageCaption: "Hình 1.2. Thiết bị vào – ra (SGK tr.6)",
        blocks: [
          { kind: "text", value: "Trên thực tế, thiết bị vào – ra được thiết kế rất đa dạng để đáp ứng nhiều nhu cầu khác nhau của người sử dụng." },
          { kind: "ext", value: "Một số thiết bị vừa vào vừa ra còn lưu trữ, xử lí dữ liệu: loa thông minh nhận và trả lời bằng giọng nói; máy ảnh số lưu và xử lí ảnh/video (SGK Hình 1.4)." },
        ],
      },
      questions: [
        { question: "Máy chiếu là thiết bị vào hay thiết bị ra, và làm việc với dạng thông tin nào?",
          type: "multiple-choice", options: ["Thiết bị vào — âm thanh", "Thiết bị ra — hình ảnh", "Thiết bị vào — văn bản", "Thiết bị ra — âm thanh"],
          answer: 1, explanation: "Chính xác! Máy chiếu là thiết bị ra, hiển thị nội dung màn hình máy tính dưới dạng hình ảnh.",
          level: "thong-hieu", activity: "tbvr-12" },
        { question: "Bộ điều khiển game (tay cầm chơi game, Hình 1.3a) là thiết bị gì?",
          type: "multiple-choice", options: ["Thiết bị vào", "Thiết bị ra", "Vừa vào vừa ra", "Không phải thiết bị vào – ra"],
          answer: 0, explanation: "Chính xác! Tay cầm game đưa mệnh lệnh vào máy tính để điều khiển đối tượng, nên là thiết bị vào.",
          level: "thong-hieu", activity: "tbvr-12",
          image: "assets/img/hinh1-3a-tay-cam-game.png", imageCaption: "Hình 1.3a. Bộ điều khiển game" },
        { question: "Màn hình cảm ứng (Hình 1.3b) có chức năng gì?",
          type: "multiple-choice", options: ["Chỉ là thiết bị ra", "Chỉ là thiết bị vào", "Vừa là thiết bị vào vừa là thiết bị ra", "Không phải thiết bị vào – ra"],
          answer: 2, explanation: "Chính xác! Màn hình cảm ứng vừa hiển thị (ra) vừa nhận thao tác chạm của ngón tay (vào).",
          level: "thong-hieu", activity: "tbvr-12",
          image: "assets/img/hinh1-3b-man-hinh-cam-ung.png", imageCaption: "Hình 1.3b. Màn hình cảm ứng" },
        { question: "Trong Hình 1.2, thiết bị nào vừa có chức năng vào vừa có chức năng ra?",
          type: "multiple-choice", options: ["Bàn phím", "Máy in", "Máy tính bảng", "Chuột"],
          answer: 2, explanation: "Chính xác! Máy tính bảng vừa nhận thao tác chạm (vào) vừa hiển thị hình ảnh, âm thanh (ra).",
          level: "van-dung", activity: "tbvr-12" },
        { question: "Nhận định nào ĐÚNG về thiết bị vào – ra?",
          type: "multiple-choice", options: ["Chỉ có một vài loại cố định", "Chỉ dùng trong trường học", "Tất cả đều vừa vào vừa ra", "Có rất nhiều loại, công dụng và hình dạng khác nhau"],
          answer: 3, explanation: "Chính xác! Thiết bị vào – ra rất đa dạng về loại, công dụng và hình dạng.",
          level: "nhan-biet", activity: "tbvr-12" },
      ],
      remember: [
        "Thiết bị vào – ra có rất nhiều loại, công dụng và hình dạng khác nhau.",
        "Một số thiết bị vừa vào vừa ra: màn hình cảm ứng, tấm cảm ứng, máy tính bảng, loa thông minh, máy ảnh số.",
      ],
    },

    /* ------------------------------------------------------------------ *
     * TRÒ CHƠI: PHÂN LOẠI THIẾT BỊ (kéo thả 3 nhóm)
     * ------------------------------------------------------------------ */
    {
      id: "phanloai", time: 240, task: "Kéo mỗi thiết bị vào đúng nhóm: Vào / Ra / Vừa vào vừa ra.", name: "Trò chơi: Phân loại thiết bị", type: "dragdrop",
      goal: "Phân loại thiết bị vào / ra / vừa vào vừa ra.",
      groups: ["Thiết bị VÀO", "Thiết bị RA", "Vừa VÀO vừa RA"],
      items: [
        { text: "Bàn phím", group: 0 },
        { text: "Chuột", group: 0 },
        { text: "Micro", group: 0 },
        { text: "Máy quét (scanner)", group: 0 },
        { text: "Màn hình", group: 1 },
        { text: "Máy in", group: 1 },
        { text: "Loa", group: 1 },
        { text: "Máy chiếu", group: 1 },
        { text: "Màn hình cảm ứng", group: 2 },
        { text: "Máy tính bảng", group: 2 },
      ],
      explanation: "Thiết bị vào nhập dữ liệu vào máy; thiết bị ra xuất thông tin ra ngoài; màn hình cảm ứng và máy tính bảng vừa nhận vừa xuất nên thuộc nhóm vừa vào vừa ra.",
    },

    /* ------------------------------------------------------------------ *
     * HOẠT ĐỘNG 2.2: AN TOÀN THIẾT BỊ — KẾT NỐI (ghép đôi)
     * ------------------------------------------------------------------ */
    {
      id: "noicong", time: 240, task: "Quan sát Hình 1.5, nối mỗi đầu nối thiết bị với đúng cổng của nó.", name: "HĐ2.2: Nối thiết bị vào đúng cổng", type: "matching",
      goal: "Kết nối đúng mỗi đầu nối với cổng tương ứng trên máy tính.",
      intro: "Quan sát Hình 1.5. Hãy nối mỗi đầu nối thiết bị với đúng cổng của nó.",
      image: "assets/img/hinh1-5-cong-ket-noi.png",
      imageCaption: "Hình 1.5. Cổng kết nối của máy tính và các đầu nối thiết bị (SGK tr.8)",
      pairs: [
        { left: "Bàn phím / Chuột", right: "Cổng USB (7)" },
        { left: "Dây mạng", right: "Cổng mạng – RJ45 (6)" },
        { left: "Dây màn hình", right: "Cổng VGA (3)" },
        { left: "Tai nghe", right: "Cổng tai nghe (4)" },
        { left: "Dây nguồn", right: "Cổng nguồn điện (8)" },
      ],
      explanation: "Mỗi đầu nối có hình dạng riêng, chỉ cắm vừa đúng cổng của nó. Cắm nhầm cổng có thể không dùng được, thậm chí làm hỏng đầu nối hoặc gây chập điện.",
      doneImage: "assets/img/hinh1-5-dap-an-noi.png",
      doneCaption: "Đáp án nối cổng (SGK Hình 1.5)",
    },

    /* ------------------------------------------------------------------ *
     * HOẠT ĐỘNG 2.2: CẤP NGUỒN ĐÚNG THỨ TỰ
     * ------------------------------------------------------------------ */
    {
      id: "capnguon", time: 180, task: "Thảo luận: nên cấp nguồn điện TRƯỚC hay SAU khi kết nối thiết bị? Vì sao?", name: "HĐ2.2: Cấp nguồn đúng thứ tự", type: "knowledge",
      goal: "Hiểu vì sao cần cấp nguồn điện sau khi đã kết nối thiết bị.",
      content: {
        heading: "Cấp nguồn điện: trước hay sau khi kết nối?",
        prompt: "Máy tính là hệ thống phức tạp, dùng điện và kết nối nhiều thiết bị. Thao tác không cẩn thận có thể gây chập điện, hỏng thiết bị.",
        blocks: [
          { kind: "list", value: [
            "Cổng USB (7) dùng cho nhiều thiết bị; nếu cắm nhầm đầu nối khác vào có thể gây chập điện.",
            "Dây nguồn (f) lắp vào cổng nguồn (8).",
          ] },
        ],
      },
      questions: [
        { question: "Việc cấp nguồn điện cho máy tính nên được thực hiện khi nào?",
          type: "multiple-choice", options: ["Trước khi kết nối các thiết bị", "Sau khi đã kết nối xong các thiết bị", "Lúc nào cũng được", "Chỉ khi máy đang chạy"],
          answer: 1, explanation: "Chính xác! Cấp nguồn SAU khi đã kết nối các thiết bị để đảm bảo an toàn điện, tránh chập cháy.",
          level: "van-dung", activity: "capnguon" },
      ],
    },

    /* ------------------------------------------------------------------ *
     * HOẠT ĐỘNG 2.2: NÊN / KHÔNG NÊN (kéo thả 2 nhóm — Bảng 1.1)
     * ------------------------------------------------------------------ */
    {
      id: "nenkhongnen", time: 240, task: "Kéo mỗi việc vào nhóm NÊN làm hoặc KHÔNG nên làm khi dùng máy tính.", name: "Trò chơi: Nên / Không nên làm", type: "dragdrop",
      goal: "Phân biệt hành vi an toàn và không an toàn khi dùng máy tính (Bảng 1.1).",
      groups: ["NÊN làm", "KHÔNG nên làm"],
      items: [
        { text: "Đọc kĩ hướng dẫn trước khi sử dụng thiết bị", group: 0 },
        { text: "Giữ bàn tay khô, sạch khi sử dụng máy tính", group: 0 },
        { text: "Gõ phím dứt khoát nhưng nhẹ nhàng", group: 0 },
        { text: "Dùng nút lệnh Shut down để tắt máy tính", group: 0 },
        { text: "Rút điện trước khi lau, dọn máy tính", group: 0 },
        { text: "Để đồ uống gần chuột, bàn phím, thẻ nhớ", group: 1 },
        { text: "Tác động lên màn hình bằng vật sắc, nhọn", group: 1 },
        { text: "Tắt máy tính bằng cách ngắt điện đột ngột", group: 1 },
        { text: "Thao tác tuỳ tiện, không theo hướng dẫn", group: 1 },
        { text: "Chạm vào phần kim loại của máy tính", group: 1 },
      ],
      explanation: "Nên: đọc kĩ hướng dẫn, tay khô ráo, thao tác nhẹ nhàng, tắt bằng Shut down, rút điện khi lau dọn. Không nên: để đồ ăn uống gần máy, dùng vật sắc nhọn, ngắt điện đột ngột, thao tác tuỳ tiện.",
    },
    {
      id: "an-toan-chot", time: 120, task: "Cùng chốt 3 quy tắc an toàn khi dùng thiết bị máy tính.", name: "Em cần nhớ: An toàn thiết bị", type: "remember",
      items: [
        "Đọc kĩ hướng dẫn của nhà sản xuất trước khi sử dụng thiết bị.",
        "Kết nối các thiết bị đúng cách; cấp nguồn điện sau khi đã kết nối.",
        "Giữ gìn nơi làm việc với máy tính gọn gàng, ngăn nắp, vệ sinh, khô ráo.",
      ],
    },

    /* ------------------------------------------------------------------ *
     * HOẠT ĐỘNG 3: LUYỆN TẬP — TRÒ CHƠI "CÁNH CỤT VỀ NHÀ"
     * ------------------------------------------------------------------ */
    {
      id: "canhcut", time: 360, task: "Trả lời đúng để giúp cả đàn cánh cụt về nhà! Chia đội thi cho sôi động.", name: "HĐ3: Luyện tập – Cánh cụt về nhà", type: "penguin",
      goal: "Củng cố toàn bài qua trò chơi trắc nghiệm, tạo không khí thi đua.",
      intro: "Có 8 chú chim cánh cụt muốn về nhà. Mỗi câu trả lời đúng giúp một chú về nhà an toàn!",
      questions: [
        { question: "Máy ảnh nhập dữ liệu dạng nào vào máy tính?",
          type: "multiple-choice", options: ["Con số", "Văn bản", "Hình ảnh", "Âm thanh"],
          answer: 2, explanation: "Chính xác! Máy ảnh đưa thông tin dạng hình ảnh vào máy tính.",
          level: "nhan-biet", activity: "canhcut" },
        { question: "Thiết bị nào chuyển dữ liệu âm thanh từ máy tính RA bên ngoài?",
          type: "multiple-choice", options: ["Loa", "Micro", "Màn hình", "Máy ảnh"],
          answer: 0, explanation: "Chính xác! Loa xuất âm thanh từ máy tính ra ngoài, là thiết bị ra.",
          level: "thong-hieu", activity: "canhcut" },
        { question: "Thao tác nào sau đây tắt máy tính một cách AN TOÀN?",
          type: "multiple-choice", options: ["Dùng nút lệnh Restart của Windows", "Dùng nút lệnh Shut down của Windows", "Nhấn giữ công tắc nguồn vài giây", "Rút dây nguồn khỏi ổ cắm"],
          answer: 1, explanation: "Chính xác! Tắt máy bằng lệnh Shut down giúp máy lưu và đóng an toàn, không mất dữ liệu.",
          level: "van-dung", activity: "canhcut" },
        { question: "Vì sao KHÔNG nên vừa ăn vừa sử dụng máy tính?",
          type: "multiple-choice", options: ["Gây đầy hơi, khó tiêu", "Ăn quá nhanh, ít no", "Say mê đồ ăn vặt", "Vụn thức ăn, đồ uống có thể rơi vào và làm hỏng thiết bị"],
          answer: 3, explanation: "Chính xác! Vụn thức ăn và đồ uống rơi vào bàn phím, thiết bị dễ gây hỏng hóc, chập điện.",
          level: "van-dung", activity: "canhcut" },
        { question: "Một bộ tai nghe có gắn micro dùng cho máy tính là loại thiết bị gì?",
          type: "multiple-choice", options: ["Thiết bị vào", "Thiết bị ra", "Thiết bị vừa vào vừa ra", "Không phải thiết bị vào – ra"],
          answer: 2, explanation: "Chính xác! Tai nghe (ra – âm thanh) gắn micro (vào – âm thanh) nên vừa vào vừa ra.",
          level: "thong-hieu", activity: "canhcut" },
        { question: "Máy tính đang làm việc với tệp trên thẻ nhớ. Thứ tự thao tác nào giúp tắt máy an toàn, không mất dữ liệu? (1: Shut down; 2: Đóng tệp; 3: Safe To Remove Hardware; 4: Lưu nội dung tệp)",
          type: "multiple-choice", options: ["1 – 2 – 3 – 4", "4 – 2 – 3 – 1", "4 – 3 – 2 – 1", "2 – 4 – 3 – 1"],
          answer: 1, explanation: "Chính xác! Lưu tệp (4) → đóng tệp (2) → Safe To Remove Hardware (3) → Shut down (1).",
          level: "van-dung", activity: "canhcut" },
        { question: "Nhóm thiết bị nào sau đây đều là thiết bị VỪA VÀO VỪA RA?",
          type: "multiple-choice", options: ["Màn hình, loa, chuột, micro", "Bàn phím, chuột, máy in, loa", "Micro, camera, máy quét, bàn phím", "Màn hình cảm ứng, tấm cảm ứng, máy tính bảng"],
          answer: 3, explanation: "Chính xác! Màn hình cảm ứng, tấm cảm ứng và máy tính bảng đều vừa nhận vừa xuất thông tin.",
          level: "van-dung", activity: "canhcut" },
        { question: "Nhóm thiết bị nào sau đây đều là thiết bị VÀO?",
          type: "multiple-choice", options: ["Chuột, bàn phím, máy quét, micro, camera", "Chuột, bàn phím, loa, micro, camera", "Máy in, màn hình, loa, micro, camera", "Máy in, màn hình, loa, tai nghe, máy quét"],
          answer: 0, explanation: "Chính xác! Chuột, bàn phím, máy quét, micro, camera đều đưa thông tin vào máy tính.",
          level: "thong-hieu", activity: "canhcut" },
      ],
    },

    /* ------------------------------------------------------------------ *
     * HOẠT ĐỘNG 3: LUYỆN TẬP (SGK) — SẮP XẾP TẮT MÁY AN TOÀN
     * ------------------------------------------------------------------ */
    {
      id: "tatmay", time: 180, task: "Sắp xếp đúng thứ tự các bước tắt máy an toàn khi đang dùng thẻ nhớ.", name: "Luyện tập: Tắt máy an toàn", type: "ordering",
      goal: "Nắm đúng quy trình tắt máy khi đang dùng thẻ nhớ (SGK Luyện tập 2).",
      steps: [
        "Lưu lại nội dung của tệp",
        "Đóng tệp đang mở trên thẻ nhớ",
        "Chọn “Safe To Remove Hardware” để ngắt kết nối với thẻ nhớ",
        "Chọn nút lệnh Shut down để tắt máy tính",
      ],
      explanation: "Phải lưu và đóng tệp, ngắt an toàn thẻ nhớ rồi mới Shut down — như vậy dữ liệu trên thẻ nhớ không bị mất hay hỏng.",
    },

    /* ------------------------------------------------------------------ *
     * HOẠT ĐỘNG 4: VẬN DỤNG
     * ------------------------------------------------------------------ */
    {
      id: "van-dung", time: 300, task: "Thảo luận nhóm 3 tình huống thực tế, trả lời rồi bấm xem hướng chốt.", name: "HĐ4: Vận dụng", type: "vandung",
      goal: "Vận dụng kiến thức vào các tình huống thực tiễn.",
      intro: "Thảo luận nhóm, trả lời rồi bấm để xem hướng chốt của giáo viên.",
      cases: [
        { question: "Trên màn hình theo dõi, em thấy một người đứng trước camera an ninh. Người đó có biết em đang theo dõi không? Tại sao?",
          answer: "Người đó KHÔNG biết em đang theo dõi, vì camera là thiết bị VÀO — nó chỉ đưa hình ảnh vào máy tính, không đưa hình ảnh ra bên ngoài cho người bị quay nhìn thấy." },
        { question: "Máy in in ra những kí hiệu không mong muốn và em biết lỗi này do virus. Em cần diệt virus ở máy in hay máy tính? Tại sao?",
          answer: "Cần diệt virus trên MÁY TÍNH, vì máy in chỉ là thiết bị RA — nó không lưu trữ và xử lí dữ liệu. Virus nằm ở máy tính (nơi lưu trữ, xử lí dữ liệu) mới là nguồn gây lỗi." },
        { question: "Em hãy đề xuất một số quy tắc giúp các bạn sử dụng phòng máy tính an toàn và hiệu quả.",
          answer: "Gợi ý: đến phòng đúng giờ, ra vào trật tự, ngồi đúng vị trí; không mang đồ ăn uống, không xả rác; không tự ý tháo lắp thiết bị; không tự cài/gỡ phần mềm; dùng xong tắt máy đúng cách, để bàn phím ngay ngắn, vệ sinh sạch sẽ." },
      ],
    },

    /* ------------------------------------------------------------------ *
     * TỔNG KẾT
     * ------------------------------------------------------------------ */
    {
      id: "tong-ket", time: 180, task: "Cùng nhắc lại kiến thức trọng tâm và làm thử thách cuối.", name: "Tổng kết", type: "summary",
      goal: "Chốt kiến thức trọng tâm và thử thách tổng hợp.",
      content: {
        learned: null,
        challenge: [
          { question: "Bạn Lan muốn thu âm bài hát vào máy tính rồi nghe lại. Bạn cần dùng lần lượt những thiết bị nào?",
            type: "multiple-choice", options: ["Micro để thu (vào) và loa để nghe (ra)", "Loa để thu và micro để nghe", "Máy in để thu và màn hình để nghe", "Bàn phím để thu và chuột để nghe"],
            answer: 0, explanation: "Chính xác! Micro là thiết bị vào (thu âm), loa là thiết bị ra (phát lại) — đúng chiều vào rồi ra.",
            level: "van-dung", activity: "tong-ket" },
          { question: "Khi lắp máy tính mới, bạn Nam cắm dây nguồn và bật điện TRƯỚC rồi mới cắm chuột, bàn phím. Cách làm này có gì chưa ổn?",
            type: "multiple-choice", options: ["Không sao, thứ tự nào cũng được", "Nên cắm chuột trước bàn phím", "Nên kết nối xong các thiết bị rồi mới cấp nguồn để an toàn điện", "Nên tắt màn hình trước"],
            answer: 2, explanation: "Chính xác! Phải kết nối xong thiết bị rồi mới cấp nguồn, tránh chập điện và hỏng thiết bị.",
            level: "van-dung-cao", activity: "tong-ket" },
        ],
      },
    },
  ],
};
if (typeof module !== "undefined" && module.exports) module.exports = LESSON;
if (typeof window !== "undefined") window.LESSON = LESSON;
