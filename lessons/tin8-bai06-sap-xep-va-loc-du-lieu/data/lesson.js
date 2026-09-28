/* ============================================================================
 * BÀI 6 — SẮP XẾP VÀ LỌC DỮ LIỆU  (Tin học 8 — Kết nối tri thức với cuộc sống)
 * Chủ đề 4: Ứng dụng tin học.
 * Bám sát SGK trang 27–31 + Kế hoạch bài dạy (2 tiết) của giáo viên.
 * Chỉ sửa file này để đổi nội dung. Engine app.js không cần sửa.
 * GV chọn KHÔNG mô phỏng Sort/Filter: thao tác làm trên Excel thật; app có bảng dữ liệu H6.2, H6.9 (HTML), câu hỏi dự đoán kết quả,
 * khảo sát nhanh cả lớp (type "poll"), phân loại tình huống, sắp xếp các bước.
 * ==========================================================================*/

// ---- Hình 6.2: Bảng kết quả khảo sát lớp 8A (SGK tr.28) ----
const KS = [
  [1, "Phạm Hoàng Bảo", "An", 1, "Mạng máy tính"], [2, "Trương Thanh", "Hà", 2, "Soạn thảo văn bản"],
  [3, "Vũ Thị Minh", "An", 3, "Ngôn ngữ lập trình"], [4, "Đỗ Minh", "Giang", 2, "Bảng tính điện tử"],
  [5, "Trần Minh", "Châu", 2, "Ngôn ngữ lập trình"], [6, "Ngô Hà", "Trang", 1, "Đồ hoạ máy tính"],
  [7, "Dương Gia", "Khánh", 3, "Phần mềm trình chiếu"], [8, "Đặng Mai", "Trang", 1, "Ngôn ngữ lập trình"],
  [9, "Phùng Khánh", "Toàn", 1, "Ngôn ngữ lập trình"], [10, "Phạm Ngọc", "Linh", 3, "Đồ hoạ máy tính"],
];
// ---- Hình 6.9: Thời gian sử dụng thiết bị số (SGK tr.31) ----
const TG = [
  [1, "8A1", 8, 12, 15, 7, 1], [2, "8A2", 7, 10, 17, 6, ""], [3, "8A3", 6, 13, 15, 8, 2], [4, "8A4", 8, 11, 10, 9, 3],
  [5, "8A5", 8, 10, 12, 11, ""], [6, "8A6", 7, 12, 14, 8, ""], [7, "8A7", 5, 20, 15, 9, ""], [8, "8A8", 9, 16, 17, 7, ""],
  [9, "8A9", 6, 12, 15, 4, 2], [10, "8A10", 4, 15, 16, 3, 4],
];
// Bảng kiểu Excel (chỉ hiển thị): cột tên A, B, C…, số hàng bên trái
const XL = (title, head, rows, startRow, note) => {
  const cols = head.length, L = "ABCDEFGHIJ", th = "background:#eef1f5;color:#4b5563;border:1px solid #d5d9e0;padding:2px 6px;font-weight:600;font-size:.85rem";
  const td = "border:1px solid #d5d9e0;padding:3px 8px";
  let h = `<div style="overflow-x:auto"><table style="border-collapse:collapse;margin:0 auto;background:#fff;font-family:Calibri,'Segoe UI',Arial,sans-serif;font-size:1.05rem;text-align:left">`;
  h += `<tr><th style="${th}"></th>${head.map((_, i) => `<th style="${th}">${L[i]}</th>`).join("")}</tr>`;
  h += `<tr><th style="${th}">${startRow - 2}</th><td colspan="${cols}" style="${td};font-weight:800">${title}</td></tr>`;
  if (note) h += `<tr><th style="${th}">${startRow - 1 - 1}</th><td colspan="${cols}" style="${td};font-style:italic">${note}</td></tr>`;
  h += `<tr><th style="${th}">${startRow - 1}</th>${head.map((x) => `<td style="${td};background:#bfd3f2;font-weight:800;text-align:center">${x}</td>`).join("")}</tr>`;
  rows.forEach((r, k) => { h += `<tr><th style="${th}">${startRow + k}</th>${r.map((v, i) => `<td style="${td}${typeof v === "number" || i === 0 ? ";text-align:right" : ""}">${v}</td>`).join("")}</tr>`; });
  return h + "</table></div>";
};
const H62_HTML = XL("Bảng kết quả khảo sát lớp 8A", ["TT", "Họ đệm", "Tên", "Tổ", "Nội dung"], KS, 3);
const H69_HTML = (() => {
  // Hình 6.9 có 3 dòng đầu (tiêu đề, ghi chú, hàng tiêu đề cột) → dữ liệu từ hàng 4
  const cols = 7, L = "ABCDEFG", th = "background:#eef1f5;color:#4b5563;border:1px solid #d5d9e0;padding:2px 6px;font-weight:600;font-size:.85rem", td = "border:1px solid #d5d9e0;padding:3px 8px";
  let h = `<div style="overflow-x:auto"><table style="border-collapse:collapse;margin:0 auto;background:#fff;font-family:Calibri,'Segoe UI',Arial,sans-serif;font-size:1.02rem">`;
  h += `<tr><th style="${th}"></th>${L.split("").map((c) => `<th style="${th}">${c}</th>`).join("")}</tr>`;
  h += `<tr><th style="${th}">1</th><td colspan="${cols}" style="${td};font-weight:800">KẾT QUẢ KHẢO SÁT THỜI GIAN SỬ DỤNG THIẾT BỊ SỐ MỖI NGÀY CỦA HỌC SINH KHỐI 8</td></tr>`;
  h += `<tr><th style="${th}">2</th><td colspan="${cols}" style="${td};font-style:italic">Ghi chú: không tính giờ học ở trường</td></tr>`;
  h += `<tr><th style="${th}">3</th>${["TT", "Lớp", "Không sử dụng", "Dưới 1 giờ", "1-2 giờ", "3-4 giờ", "Từ 5 giờ trở lên"].map((x) => `<td style="${td};background:#bfd3f2;font-weight:800;text-align:center">${x}</td>`).join("")}</tr>`;
  TG.forEach((r, k) => { h += `<tr><th style="${th}">${4 + k}</th>${r.map((v) => `<td style="${td};text-align:center">${v}</td>`).join("")}</tr>`; });
  return h + "</table></div>";
})();

const LESSON = {
  meta: {
    subject: "Tin học", grade: "8", book: "Kết nối tri thức với cuộc sống",
    title: "Bài 6: Sắp xếp và lọc dữ liệu", unit: "Chủ đề 4 — Ứng dụng tin học",
    pages: "27–31", durationMinutes: 90,
  },
  objectives: {
    knowledge: [
      "Sử dụng được phần mềm bảng tính trợ giúp giải quyết bài toán thực tế.",
      "Nêu được một số tình huống thực tế cần sử dụng các chức năng sắp xếp và lọc dữ liệu.",
      "Thực hiện được các thao tác lọc, sắp xếp dữ liệu của phần mềm bảng tính.",
    ],
    competencies: [
      "Tự học; giao tiếp và hợp tác (thảo luận nhóm, thực hành theo cặp); giải quyết vấn đề (xử lí dữ liệu khảo sát).",
      "Năng lực số 1.3.TC2a: nhận biết tình huống cần sắp xếp hoặc lọc dữ liệu.",
      "Năng lực số 1.3.TC2b: thực hiện thao tác sắp xếp, lọc dữ liệu theo một hoặc nhiều tiêu chí.",
      "Năng lực số 5.2.TC2b: hiểu lợi ích của phần mềm bảng tính trong xử lí dữ liệu: nhanh, chính xác, dễ cập nhật.",
      "Năng lực AI 8.B3.1: nêu các vấn đề đạo đức khi phát triển AI như không cung cấp thông tin sai lệch, xúc phạm.",
    ],
    qualities: ["Chăm chỉ, trách nhiệm, trung thực trong thu thập và xử lí dữ liệu."],
  },
  coreKnowledge: [
    "Mỗi phiếu khảo sát được trả lời là một hàng dữ liệu trong bảng tính; tiêu đề cột là các thông tin chính (Họ đệm, Tên, Tổ, Nội dung).",
    "Sắp xếp dữ liệu: chọn vùng dữ liệu (VD A2:E12), thẻ Data › Sort & Filter › Sort; chọn My data has headers, chọn cột và thứ tự (A to Z / Z to A). Có thể sắp xếp theo nhiều tiêu chí bằng Add Level.",
    "Lọc dữ liệu dùng để chọn và chỉ hiển thị các dòng thoả mãn điều kiện: chọn vùng dữ liệu, thẻ Data › Sort & Filter › Filter, nháy nút lọc ở tiêu đề cột, chọn giá trị cần lọc. Dữ liệu không đúng điều kiện lọc bị ẩn đi.",
    "Lọc theo nhiều tiêu chí: lần lượt chọn điều kiện lọc ở nhiều cột. Bỏ lọc: chọn Select All.",
    "Việc sắp xếp theo thứ tự bảng chữ cái khi sử dụng bảng mã Unicode không hoàn toàn đúng với thứ tự trong tiếng Việt.",
  ],
  keywords: ["Sắp xếp (Sort)", "Lọc (Filter)", "Tiêu chí", "Add Level", "Select All"],
  settings: { basePoints: 100, useTimer: false, defaultTime: 60, sound: true, streakEnabled: true },

  activities: [
    /* =========================== TIẾT 1 =========================== */
    /* ===================== HĐ1: MỞ ĐẦU (5 phút) ===================== */
    {
      id: "mo-dau", name: "Mở đầu — Dự án thành lập CLB Tin học 🏆", type: "knowledge",
      goal: "Tạo hứng thú; nhận ra dữ liệu khảo sát cần được lưu trữ, sắp xếp, lọc để ra quyết định.",
      time: 180,
      task: "Đọc tình huống (SGK tr.27) và quan sát Phiếu khảo sát Hình 6.1. Sau đó cả lớp cùng làm khảo sát nhanh ở màn tiếp theo.",
      sgkImage: "assets/sgk/mo-dau.jpg",
      content: {
        heading: "🏆 Thành lập CLB Tin học",
        prompt: "Chung niềm yêu thích môn Tin học, nhóm các bạn học sinh lớp 8A thực hiện dự án Thành lập CLB Tin học. Trước tiên, các bạn khảo sát những nội dung Tin học mà học sinh trong lớp muốn tìm hiểu thêm. Từ dữ liệu thu được, các bạn sẽ xử lí dữ liệu (sắp xếp danh sách, lọc ra các bạn cùng muốn tìm hiểu mỗi nội dung,…) để có căn cứ tổ chức các hoạt động của CLB.",
        image: "assets/sgk/hinh-6-1.jpg", imageCaption: "Hình 6.1. Phiếu khảo sát",
      },
    },
    {
      id: "khao-sat-lop", name: "Khảo sát nhanh cả lớp 📊", type: "poll",
      goal: "HS trực tiếp tham gia khảo sát như Hình 6.1; thấy dữ liệu khảo sát được thu thập và tổng hợp.",
      time: 180,
      task: "Mỗi nhóm (hoặc mỗi bạn) chọn MỘT nội dung Tin học muốn tìm hiểu thêm. Cả lớp quan sát kết quả tổng hợp trên màn chiếu. Không có đáp án đúng/sai.",
      question: "Bạn mong muốn tìm hiểu thêm nội dung nào của môn Tin học? (Chọn một nội dung)",
      options: ["Ngôn ngữ lập trình", "Mạng máy tính", "Đồ hoạ máy tính", "Bảng tính điện tử", "Soạn thảo văn bản", "Phần mềm trình chiếu"],
    },
    {
      id: "hd1-phieu-khao-sat", name: "Hoạt động 1: Phiếu khảo sát 📝", type: "knowledge",
      goal: "Xác định các cột, các hàng của bảng tính lưu kết quả khảo sát.",
      time: 300,
      task: "Nhóm thảo luận (SGK tr.27): Phiếu khảo sát được phát cho các bạn trong lớp, câu trả lời cần được lưu trữ trong bảng tính. Bảng tính gồm các cột nào? Mỗi hàng của bảng lưu trữ dữ liệu gì?",
      sgkImage: "assets/sgk/hoat-dong-1.jpg",
      content: {
        heading: "📝 Hoạt động 1. Phiếu khảo sát",
        revealLabel: "📖 Bảng lưu kết quả khảo sát (SGK tr.27–28)",
        blocks: [
          { kind: "text", value: "Phiếu khảo sát ở Hình 6.1 gồm ba thông tin chính: Họ và tên học sinh, Tổ và Nội dung. Ba thông tin này là tiêu đề của các cột dữ liệu. Để dễ dàng quan sát tên học sinh, chúng ta tách họ tên thành hai phần là Họ đệm và Tên. Mỗi phiếu khảo sát được trả lời là một hàng dữ liệu được lưu trong bảng tính. Cột thứ tự (TT) được bổ sung để theo dõi số lượng phiếu khảo sát." },
          { kind: "html", value: H62_HTML },
          { kind: "text", value: "Hình 6.2. Bảng kết quả khảo sát (10 phiếu)" },
        ],
      },
      questions: [
        { question: "Bảng tính lưu kết quả khảo sát gồm những cột nào? (Chọn tất cả ý đúng)", type: "multiple-select",
          options: ["TT", "Họ đệm", "Tên", "Tổ", "Nội dung", "Điểm trung bình môn"],
          answer: [0, 1, 2, 3, 4], explanation: "Tiêu đề các cột: TT (theo dõi số phiếu), Họ đệm, Tên (tách từ Họ và tên), Tổ, Nội dung. Phiếu khảo sát không hỏi điểm trung bình.", level: "thong-hieu", activity: "hd1-phieu-khao-sat" },
        { question: "Mỗi hàng của bảng lưu trữ dữ liệu gì?", type: "multiple-choice",
          options: ["Tất cả nội dung Tin học", "Kết quả trả lời của một phiếu khảo sát (một học sinh)", "Danh sách một tổ", "Tên các cột"],
          answer: 1, explanation: "Mỗi phiếu khảo sát được trả lời là một hàng dữ liệu được lưu trong bảng tính.", level: "nhan-biet", activity: "hd1-phieu-khao-sat" },
        { question: "Vì sao nên tách Họ và tên thành hai cột Họ đệm và Tên?", type: "multiple-choice",
          options: ["Để bảng tính có nhiều cột hơn", "Để tiết kiệm bộ nhớ", "Để dễ quan sát tên học sinh và sắp xếp theo Tên", "Vì phần mềm không cho gõ họ tên đầy đủ"],
          answer: 2, explanation: "Tách Họ đệm và Tên giúp dễ quan sát tên và sắp xếp danh sách theo thứ tự bảng chữ cái của Tên.", level: "thong-hieu", activity: "hd1-phieu-khao-sat" },
      ],
    },

    /* ===================== HĐ2.1: BẢNG TÍNH TRỢ GIÚP GIẢI QUYẾT BÀI TOÁN THỰC TẾ (15 phút) ===================== */
    {
      id: "hd21-bai-toan", name: "1. Bảng tính trợ giúp giải quyết bài toán thực tế 🔍", type: "knowledge",
      goal: "Nhận ra nhu cầu sắp xếp, lọc dữ liệu qua 4 câu hỏi về bảng khảo sát Hình 6.2.",
      time: 600,
      task: "Nhóm 4 bạn dựa vào Hình 6.2 trả lời: 1) Họ tên HS được sắp xếp như thế nào? 2) Ở mỗi nội dung, những HS nào muốn tìm hiểu? 3) Nội dung nào nhiều HS chọn nhất, đó là những HS nào? 4) Với mỗi nội dung, HS thuộc những tổ nào?",
      sgkImage: "assets/sgk/hinh-6-2.jpg",
      html: H62_HTML,
      content: {
        revealLabel: "📖 Sắp xếp và lọc giúp giải quyết bài toán (SGK tr.28)",
        blocks: [
          { kind: "text", value: "Mục đích của khảo sát là thu thập thông tin để quyết định CLB Tin học được tổ chức như thế nào. Chúng ta có thể sử dụng chức năng sắp xếp và lọc dữ liệu để giải quyết những yêu cầu: sắp xếp họ tên theo thứ tự bảng chữ cái để dễ tìm kiếm; lọc danh sách HS theo từng nội dung; tìm nội dung nhiều HS lựa chọn nhất; biết HS thuộc những tổ nào để chia nhóm học tập." },
          { kind: "text", value: "Lưu ý: Việc sắp xếp theo thứ tự bảng chữ cái khi sử dụng bảng mã Unicode sẽ không hoàn toàn đúng với thứ tự trong tiếng Việt." },
        ],
      },
      questions: [
        { question: "1) Họ tên học sinh trong Hình 6.2 đang được sắp xếp như thế nào?", type: "multiple-choice",
          options: ["Theo thứ tự bảng chữ cái của Tên", "Theo thứ tự bảng chữ cái của Họ đệm", "Theo Tổ", "Chưa sắp xếp (theo thứ tự thu phiếu) — nên sắp xếp theo bảng chữ cái để dễ tìm"],
          answer: 3, explanation: "Danh sách đang theo thứ tự phiếu thu được (TT 1–10), chưa theo bảng chữ cái → cần sắp xếp để dễ tìm kiếm.", level: "nhan-biet", activity: "hd21-bai-toan" },
        { question: "3) Nội dung Tin học nào có nhiều học sinh lựa chọn nhất?", type: "multiple-choice",
          options: ["Ngôn ngữ lập trình (An, Châu, Trang, Toàn)", "Đồ hoạ máy tính (Trang, Linh)", "Mạng máy tính (An)", "Bảng tính điện tử (Giang)"],
          answer: 0, explanation: "Ngôn ngữ lập trình có 4 HS: Vũ Thị Minh An, Trần Minh Châu, Đặng Mai Trang, Phùng Khánh Toàn.", level: "thong-hieu", activity: "hd21-bai-toan" },
        { question: "4) Các bạn chọn nội dung Đồ hoạ máy tính thuộc những tổ nào?", type: "multiple-choice",
          options: ["Tổ 1 và tổ 2", "Chỉ tổ 3", "Tổ 1 và tổ 3", "Cả ba tổ"],
          answer: 2, explanation: "Ngô Hà Trang (tổ 1) và Phạm Ngọc Linh (tổ 3).", level: "thong-hieu", activity: "hd21-bai-toan" },
        { question: "Câu hỏi SGK tr.28 — Tiêu chí sắp xếp danh sách học sinh theo thứ tự của bảng chữ cái trong Hình 6.2 là gì?", type: "multiple-choice",
          options: ["Sắp xếp theo cột TT", "Sắp xếp theo cột Tên; nếu trùng Tên thì sắp xếp theo cột Họ đệm", "Sắp xếp theo cột Nội dung", "Sắp xếp theo cột Tổ"],
          answer: 1, explanation: "Người Việt thường được gọi theo Tên nên sắp xếp theo Tên trước; các bạn trùng Tên (An, Trang) được sắp tiếp theo Họ đệm.", level: "van-dung", activity: "hd21-bai-toan", sgkImage: "assets/sgk/cau-hoi-tr28.jpg" },
      ],
    },
    {
      id: "sap-xep-hay-loc", name: "Trò chơi: Sắp xếp hay Lọc? 🧩", type: "dragdrop",
      goal: "Nêu được tình huống thực tế cần dùng chức năng sắp xếp, chức năng lọc dữ liệu.",
      time: 300,
      task: "Xếp mỗi tình huống vào chức năng phù hợp nhất. Xếp hết rồi bấm Nộp bài.",
      groups: ["🔤 Cần SẮP XẾP dữ liệu", "🔍 Cần LỌC dữ liệu"],
      items: [
        { text: "Xếp danh sách lớp theo thứ tự bảng chữ cái của Tên để dễ điểm danh", group: 0 },
        { text: "Xếp bảng điểm từ cao xuống thấp để tìm bạn đứng đầu lớp", group: 0 },
        { text: "Xếp các lớp theo số HS “Không sử dụng” thiết bị số giảm dần", group: 0 },
        { text: "Xếp danh sách theo Tổ, cùng tổ thì theo Tên", group: 0 },
        { text: "Chỉ hiện các bạn muốn tìm hiểu Ngôn ngữ lập trình", group: 1 },
        { text: "Chỉ hiện các bạn Tổ 1 muốn tìm hiểu Đồ hoạ máy tính", group: 1 },
        { text: "Chỉ hiện các lớp không có HS dùng thiết bị số từ 5 giờ trở lên", group: 1 },
        { text: "Chỉ hiện các mặt hàng có giá từ 100 000 đồng trở lên", group: 1 },
      ],
      explanation: "Sắp xếp: thay đổi THỨ TỰ các hàng theo tiêu chí (A→Z, tăng/giảm). Lọc: chỉ HIỂN THỊ các hàng thoả mãn điều kiện, các hàng khác bị ẩn đi.",
    },

    /* ===================== HĐ2.2: THỰC HÀNH SẮP XẾP DỮ LIỆU (25 phút) ===================== */
    {
      id: "th-sap-xep-mot", name: "2. Thực hành: Sắp xếp dữ liệu theo một tiêu chí 🔤", type: "knowledge",
      goal: "Sắp xếp cột Tên theo thứ tự bảng chữ cái (Hình 6.3, 6.4).",
      time: 600,
      task: "Thực hành trên Excel (2 HS/máy) với tệp Kết quả khảo sát lớp 8A: sắp xếp cột Tên của bảng Hình 6.2 theo thứ tự bảng chữ cái. So sánh kết quả với Hình 6.4.",
      sgkImage: "assets/sgk/sap-xep-a.jpg",
      content: {
        heading: "🔤 a) Sắp xếp dữ liệu theo một tiêu chí",
        revealLabel: "🔢 Hướng dẫn (SGK tr.28–29)",
        blocks: [
          { kind: "list", value: [
            "Bước 1. Chọn vùng dữ liệu cần sắp xếp là A2:E12. Trong vùng dữ liệu này, hàng 2 là hàng tiêu đề của bảng, các hàng còn lại là dữ liệu cần sắp xếp. (Không chọn hàng 1 — dòng tên bảng “Bảng kết quả khảo sát lớp 8A”.)",
            "Bước 2. Trong thẻ Data, tại nhóm Sort & Filter, chọn lệnh Sort để mở hộp thoại Sort: ① chọn ô My data has headers để không sắp xếp dòng tiêu đề; ② chọn cột Tên là tiêu chí sắp xếp; ③ chọn thứ tự sắp xếp A to Z. Chọn OK.",
          ] },
          { kind: "image", value: "assets/sgk/hinh-6-3.jpg", caption: "Hình 6.3. Sắp xếp bảng dữ liệu theo một tiêu chí" },
          { kind: "image", value: "assets/sgk/hinh-6-4.jpg", caption: "Hình 6.4. Kết quả sắp xếp tên học sinh theo thứ tự bảng chữ cái" },
        ],
      },
      questions: [
        { question: "Trong hộp thoại Sort, chọn ô My data has headers để làm gì?", type: "multiple-choice",
          options: ["Để thêm tiêu chí sắp xếp", "Để không sắp xếp dòng tiêu đề của bảng", "Để sắp xếp từ Z đến A", "Để xoá dòng tiêu đề"],
          answer: 1, explanation: "My data has headers: hàng đầu vùng chọn là hàng tiêu đề, không tham gia sắp xếp.", level: "nhan-biet", activity: "th-sap-xep-mot" },
        { question: "Để sắp xếp theo thứ tự bảng chữ cái (tăng dần), ở mục Order em chọn:", type: "multiple-choice",
          options: ["Z to A", "Cell Values", "Largest to Smallest", "A to Z"],
          answer: 3, explanation: "A to Z: thứ tự bảng chữ cái tăng dần; Z to A: giảm dần.", level: "nhan-biet", activity: "th-sap-xep-mot" },
        { question: "Sau khi sắp xếp chỉ theo Tên (Hình 6.4), hai bạn tên Trang được xếp thế nào?", type: "multiple-choice",
          options: ["Ngô Hà Trang đứng trước Đặng Mai Trang — chưa đúng thứ tự Họ đệm (Đ đứng trước N)", "Đặng Mai Trang đứng trước Ngô Hà Trang", "Hai bạn bị xoá khỏi bảng", "Hai bạn được gộp thành một hàng"],
          answer: 0, explanation: "Chỉ có một tiêu chí (Tên) nên hai bạn trùng tên giữ thứ tự cũ; cần thêm tiêu chí thứ hai là Họ đệm.", level: "thong-hieu", activity: "th-sap-xep-mot" },
      ],
    },
    {
      id: "th-sap-xep-nhieu", name: "Thực hành: Sắp xếp theo nhiều tiêu chí ➕", type: "knowledge",
      goal: "Sắp xếp theo Tên, cùng Tên thì theo Họ đệm (Hình 6.5, 6.6); theo Tổ → Tên → Họ đệm.",
      time: 600,
      task: "Trên Excel: thêm tiêu chí thứ hai là Họ đệm (Add Level). Sau đó trả lời câu hỏi SGK tr.30: sắp xếp theo Tổ, cùng tổ theo Tên, cùng tên theo Họ đệm — và thực hiện trên bảng tính.",
      sgkImage: "assets/sgk/hinh-6-5.jpg",
      content: {
        heading: "➕ b) Sắp xếp dữ liệu theo nhiều tiêu chí",
        revealLabel: "🔢 Hướng dẫn (SGK tr.29–30)",
        blocks: [
          { kind: "text", value: "Có hai học sinh cùng tên là Trang, nhưng bạn Ngô Hà Trang được sắp xếp trước bạn Đặng Mai Trang, trong khi chữ N đứng sau chữ Đ trong bảng chữ cái. Để danh sách hiển thị đúng yêu cầu, cần bổ sung tiêu chí thứ hai là sắp xếp Họ đệm." },
          { kind: "list", value: [
            "Mở hộp thoại Sort như mục a): ① chọn My data has headers; ② chọn Add Level để thêm tiêu chí; ③ Sort by: Tên (tiêu chí thứ nhất); ④ Then by: Họ đệm (tiêu chí thứ hai). Chọn OK.",
            "Lưu ý: tiếp tục chọn Add Level nếu muốn thêm tiêu chí; chọn Delete Level để xoá bỏ tiêu chí sắp xếp. Sau khi sắp xếp, có thể nhập lại giá trị cột TT cho đúng thứ tự.",
          ] },
          { kind: "image", value: "assets/sgk/hinh-6-5.jpg", caption: "Hình 6.5. Sắp xếp theo nhiều tiêu chí" },
          { kind: "image", value: "assets/sgk/hinh-6-6.jpg", caption: "Hình 6.6. Kết quả sắp xếp theo hai tiêu chí" },
        ],
      },
      questions: [
        { question: "Để thêm tiêu chí sắp xếp thứ hai (Then by) trong hộp thoại Sort, em chọn nút lệnh nào?", type: "multiple-choice",
          options: ["Delete Level", "Copy Level", "Add Level", "Options…"],
          answer: 2, explanation: "Add Level thêm một tiêu chí sắp xếp; Delete Level xoá tiêu chí.", level: "nhan-biet", activity: "th-sap-xep-nhieu" },
        { question: "Câu hỏi SGK tr.30 — Có thể sắp xếp bảng Hình 6.2 theo Tổ, nếu cùng tổ sắp xếp theo Tên, nếu cùng tên sắp xếp theo Họ đệm được không?", type: "multiple-choice",
          options: ["Không, chỉ sắp xếp được theo một tiêu chí", "Chỉ được tối đa hai tiêu chí", "Được, nhưng phải sắp xếp bằng tay", "Được: Sort by Tổ, Then by Tên, Then by Họ đệm (dùng Add Level hai lần)"],
          answer: 3, explanation: "Hộp thoại Sort cho phép thêm nhiều tiêu chí bằng Add Level: Tổ → Tên → Họ đệm.", level: "van-dung", activity: "th-sap-xep-nhieu", sgkImage: "assets/sgk/cau-hoi-tr30.jpg" },
        { question: "Sau khi sắp xếp theo Tổ → Tên → Họ đệm (tất cả A to Z), bạn nào đứng ĐẦU danh sách?", type: "multiple-choice",
          options: ["Phạm Hoàng Bảo An (tổ 1)", "Vũ Thị Minh An (tổ 3)", "Đỗ Minh Giang (tổ 2)", "Đặng Mai Trang (tổ 1)"],
          answer: 0, explanation: "Tổ 1 đứng đầu; trong tổ 1 (An, Trang, Trang, Toàn) tên An đứng đầu → Phạm Hoàng Bảo An.", level: "van-dung-cao", activity: "th-sap-xep-nhieu" },
      ],
    },
    {
      id: "cac-buoc-sap-xep", name: "Trò chơi: Sắp xếp các bước Sort 🔢", type: "ordering",
      goal: "Ghi nhớ quy trình sắp xếp dữ liệu theo nhiều tiêu chí.",
      time: 180,
      task: "Sắp xếp các bước sắp xếp bảng khảo sát theo Tên, cùng tên theo Họ đệm cho đúng thứ tự rồi bấm Nộp bài.",
      steps: [
        "Chọn vùng dữ liệu cần sắp xếp A2:E12",
        "Thẻ Data › nhóm Sort & Filter › chọn lệnh Sort",
        "Chọn ô My data has headers",
        "Sort by: chọn cột Tên, Order: A to Z",
        "Chọn Add Level, Then by: chọn cột Họ đệm, A to Z",
        "Chọn OK để hoàn thành việc sắp xếp",
      ],
      explanation: "Chọn vùng → Data › Sort → My data has headers → tiêu chí thứ nhất (Tên) → Add Level, tiêu chí thứ hai (Họ đệm) → OK.",
    },

    /* =========================== TIẾT 2 =========================== */
    /* ===================== HĐ2.3: THỰC HÀNH LỌC DỮ LIỆU (25 phút) ===================== */
    {
      id: "th-loc", name: "3. Thực hành: Lọc dữ liệu 🔍", type: "knowledge",
      goal: "Lọc danh sách HS theo một tiêu chí (Nội dung) và nhiều tiêu chí (Tổ 1 + Đồ hoạ máy tính).",
      time: 900,
      task: "Thực hành trên Excel (2 HS/máy): Nhiệm vụ 1 — lọc danh sách HS theo từng nội dung Tin học (Hình 6.7, 6.8); Nhiệm vụ 2 — lọc danh sách HS Tổ 1 muốn tìm hiểu Đồ hoạ máy tính. Bỏ lọc sau mỗi nhiệm vụ.",
      sgkImage: "assets/sgk/hinh-6-7.jpg",
      content: {
        heading: "🔍 3. Thực hành: Lọc dữ liệu",
        prompt: "Chức năng lọc dữ liệu được sử dụng để chọn và chỉ hiển thị các dòng thoả mãn các điều kiện nào đó. Ví dụ: danh sách học sinh muốn tìm hiểu nội dung Ngôn ngữ lập trình, danh sách học sinh Tổ 1 muốn tìm hiểu nội dung Đồ hoạ máy tính,…",
        revealLabel: "🔢 Hướng dẫn (SGK tr.30–31)",
        blocks: [
          { kind: "text", value: "Nhiệm vụ 1 (lọc theo một tiêu chí):" },
          { kind: "list", value: [
            "Bước 1. Chọn vùng dữ liệu cần lọc là A2:E12.",
            "Bước 2. Trong thẻ Data, tại nhóm Sort & Filter, chọn lệnh Filter. Nút lệnh lọc xuất hiện ở tất cả các ô thuộc dòng tiêu đề.",
            "Bước 3. Nháy nút lọc ở cột Nội dung → nháy (Select All) để bỏ chọn tất cả → chọn nội dung cần lọc (Hình 6.7). Chọn OK.",
            "Bước 4. Để bỏ lọc dữ liệu, chọn Select All.",
            "Lưu ý: Dữ liệu không đúng với điều kiện lọc sẽ bị ẩn đi.",
          ] },
          { kind: "image", value: "assets/sgk/hinh-6-7.jpg", caption: "Hình 6.7. Các bước lọc danh sách học sinh theo từng nội dung" },
          { kind: "image", value: "assets/sgk/hinh-6-8.jpg", caption: "Hình 6.8. Kết quả lọc dữ liệu" },
          { kind: "text", value: "Nhiệm vụ 2 (lọc theo nhiều tiêu chí): Bước 1 và 2 như Nhiệm vụ 1; Bước 2: trong cột Nội dung chọn tiêu chí lọc là Đồ hoạ máy tính; Bước 3: trong cột Tổ chọn tiêu chí lọc là 1; Bước 4: bỏ lọc tương tự Nhiệm vụ 1 đối với cột Nội dung và cột Tổ." },
        ],
      },
      questions: [
        { question: "Sau khi lọc, những hàng không thoả mãn điều kiện lọc sẽ:", type: "multiple-choice",
          options: ["Bị xoá vĩnh viễn", "Được tô màu đỏ", "Bị ẩn đi", "Được chuyển xuống cuối bảng"],
          answer: 2, explanation: "Dữ liệu không đúng với điều kiện lọc sẽ bị ẩn đi (không bị xoá); bỏ lọc thì hiện lại.", level: "nhan-biet", activity: "th-loc" },
        { question: "Lệnh Filter nằm ở đâu?", type: "multiple-choice",
          options: ["Thẻ Home, nhóm Font", "Thẻ Data, nhóm Sort & Filter", "Thẻ Insert, nhóm Tables", "Thẻ View, nhóm Window"],
          answer: 1, explanation: "Thẻ Data › nhóm Sort & Filter › lệnh Filter (cùng nhóm với lệnh Sort).", level: "nhan-biet", activity: "th-loc" },
        { question: "Để bỏ lọc và hiện lại toàn bộ danh sách, em làm thế nào?", type: "multiple-choice",
          options: ["Chọn (Select All) trong danh sách lọc của cột đang lọc", "Xoá cột Nội dung", "Tắt máy tính", "Chọn Sort A to Z"],
          answer: 0, explanation: "Bước 4: để bỏ lọc dữ liệu, chọn Select All (ở từng cột đã lọc).", level: "nhan-biet", activity: "th-loc" },
      ],
    },
    {
      id: "du-doan-loc", name: "Trò chơi: Dự đoán kết quả lọc 🔮", type: "quiz",
      goal: "Xác định các hàng còn lại sau khi lọc theo một hoặc nhiều tiêu chí.",
      time: 360,
      task: "Nhìn bảng Hình 6.2, chọn TẤT CẢ các bạn còn hiện sau khi lọc theo điều kiện.",
      html: H62_HTML,
      questions: [
        { question: "Lọc cột Nội dung = “Ngôn ngữ lập trình”. Những bạn nào còn hiện?", type: "multiple-select",
          options: ["Vũ Thị Minh An", "Trần Minh Châu", "Ngô Hà Trang", "Đặng Mai Trang", "Phùng Khánh Toàn", "Phạm Ngọc Linh"],
          answer: [0, 1, 3, 4], explanation: "4 bạn chọn Ngôn ngữ lập trình: Vũ Thị Minh An, Trần Minh Châu, Đặng Mai Trang, Phùng Khánh Toàn (Hình 6.8).", level: "thong-hieu", activity: "du-doan-loc" },
        { question: "Lọc cột Tổ = 2. Những bạn nào còn hiện?", type: "multiple-select",
          options: ["Trương Thanh Hà", "Phạm Hoàng Bảo An", "Đỗ Minh Giang", "Dương Gia Khánh", "Trần Minh Châu", "Phùng Khánh Toàn"],
          answer: [0, 2, 4], explanation: "Tổ 2: Trương Thanh Hà, Đỗ Minh Giang, Trần Minh Châu.", level: "thong-hieu", activity: "du-doan-loc" },
        { question: "Nhiệm vụ 2 — Lọc Nội dung = “Đồ hoạ máy tính” VÀ Tổ = 1. Những bạn nào còn hiện?", type: "multiple-select",
          options: ["Phạm Ngọc Linh", "Ngô Hà Trang", "Đặng Mai Trang", "Phạm Hoàng Bảo An", "Phùng Khánh Toàn", "Dương Gia Khánh"],
          answer: [1], explanation: "Đồ hoạ máy tính có Ngô Hà Trang (tổ 1) và Phạm Ngọc Linh (tổ 3); thêm điều kiện Tổ 1 chỉ còn Ngô Hà Trang.", level: "van-dung", activity: "du-doan-loc" },
      ],
    },
    {
      id: "cac-buoc-loc", name: "Trò chơi: Sắp xếp các bước lọc dữ liệu 🔢", type: "ordering",
      goal: "Ghi nhớ quy trình lọc dữ liệu theo một tiêu chí.",
      time: 180,
      task: "Sắp xếp các bước lọc danh sách HS muốn tìm hiểu Ngôn ngữ lập trình cho đúng thứ tự rồi bấm Nộp bài.",
      steps: [
        "Chọn vùng dữ liệu cần lọc A2:E12",
        "Thẻ Data › nhóm Sort & Filter › chọn lệnh Filter",
        "Nháy nút lọc ▼ ở ô tiêu đề cột Nội dung",
        "Nháy (Select All) để bỏ chọn tất cả",
        "Chọn Ngôn ngữ lập trình rồi chọn OK",
        "Xem kết quả xong, chọn Select All để bỏ lọc",
      ],
      explanation: "Chọn vùng → Data › Filter → nút lọc cột Nội dung → bỏ Select All → chọn giá trị cần lọc, OK → Select All để bỏ lọc.",
    },

    /* ===================== HĐ3: LUYỆN TẬP (15 phút) ===================== */
    {
      id: "luyen-tap", name: "Luyện tập: Thời gian sử dụng thiết bị số 📱", type: "knowledge",
      goal: "Tạo bảng Hình 6.9, sắp xếp theo một, hai tiêu chí giảm dần và lọc dữ liệu.",
      time: 900,
      task: "Trên Excel: a) tạo bảng như Hình 6.9, lưu tệp TGSDThietbiso.xlsx; b) sắp xếp giảm dần theo cột Không sử dụng; c) sắp xếp giảm dần theo Không sử dụng, bằng nhau thì giảm dần theo Dưới 1 giờ; d) lọc các lớp không có HS dùng thiết bị số từ 5 giờ trở lên. Rồi trả lời các câu hỏi kiểm tra kết quả.",
      sgkImage: "assets/sgk/luyen-tap.jpg",
      html: H69_HTML,
      questions: [
        { question: "b) Sau khi sắp xếp giảm dần theo cột Không sử dụng, lớp nào đứng đầu bảng?", type: "multiple-choice",
          options: ["8A1", "8A10", "8A7", "8A8"],
          answer: 3, explanation: "8A8 có 9 HS không sử dụng — nhiều nhất. Để sắp giảm dần chọn Order: Largest to Smallest.", level: "thong-hieu", activity: "luyen-tap" },
        { question: "c) Sau khi sắp xếp giảm dần theo Không sử dụng, bằng nhau thì giảm dần theo Dưới 1 giờ, ba lớp đứng ngay sau 8A8 lần lượt là:", type: "multiple-choice",
          options: ["8A5, 8A4, 8A1", "8A1, 8A4, 8A5", "8A4, 8A1, 8A5", "8A2, 8A6, 8A1"],
          answer: 1, explanation: "Ba lớp cùng 8 HS không sử dụng: 8A1 (12), 8A4 (11), 8A5 (10) — xếp giảm dần theo Dưới 1 giờ.", level: "van-dung", activity: "luyen-tap" },
        { question: "d) Lọc các lớp KHÔNG có HS sử dụng thiết bị số từ 5 giờ trở lên (ô cột G để trống). Những lớp nào còn hiện?", type: "multiple-select",
          options: ["8A1", "8A2", "8A5", "8A6", "8A7", "8A9"],
          answer: [1, 2, 3, 4], explanation: "Cột Từ 5 giờ trở lên để trống ở 8A2, 8A5, 8A6, 8A7, 8A8. Trong bộ lọc cột G chỉ chọn (Blanks).", level: "van-dung", activity: "luyen-tap" },
      ],
    },

    /* ===================== HĐ4: VẬN DỤNG (5 phút) ===================== */
    {
      id: "van-dung", name: "Vận dụng: Number Filters 🔢", type: "knowledge",
      goal: "Tìm hiểu chức năng lọc theo điều kiện Number Filters.",
      time: 300,
      task: "Mở tệp TGSDThietbiso.xlsx, tìm hiểu chức năng Number Filters để lọc danh sách các lớp có số HS sử dụng thiết bị số từ 3 đến 4 giờ lớn hơn hoặc bằng 10 học sinh. Có thể hoàn thiện ở nhà, gửi sản phẩm qua thư điện tử hoặc Zalo của thầy/cô.",
      sgkImage: "assets/sgk/van-dung.jpg",
      content: {
        revealLabel: "💡 Gợi ý (SGK tr.31)",
        blocks: [
          { kind: "text", value: "Ngoài các chức năng lọc đã tìm hiểu, phần mềm bảng tính còn có chức năng lọc theo điều kiện. Khi nháy chuột vào nút lệnh lọc dữ liệu, em còn thấy tuỳ chọn Number Filters (hoặc Text Filters) nếu phần lớn các ô trong cột đó chứa dữ liệu số (hoặc kí tự)." },
          { kind: "list", value: ["Nháy nút lọc ở cột 3-4 giờ → Number Filters → Greater Than Or Equal To… (lớn hơn hoặc bằng) → nhập 10 → OK."] },
        ],
      },
      questions: [
        { question: "Kết quả lọc cột 3-4 giờ lớn hơn hoặc bằng 10 (Hình 6.9) còn lại lớp nào?", type: "multiple-choice",
          options: ["8A4", "8A7", "8A5", "8A1"],
          answer: 2, explanation: "Chỉ lớp 8A5 có 11 HS dùng thiết bị số 3-4 giờ (≥ 10); các lớp khác đều dưới 10.", level: "van-dung", activity: "van-dung" },
        { question: "Trong Number Filters, điều kiện “lớn hơn hoặc bằng” là tuỳ chọn nào?", type: "multiple-choice",
          options: ["Greater Than", "Less Than Or Equal To", "Greater Than Or Equal To", "Equals"],
          answer: 2, explanation: "Greater Than Or Equal To = lớn hơn hoặc bằng (≥). Greater Than = lớn hơn (>).", level: "van-dung-cao", activity: "van-dung" },
      ],
    },

    /* ===================== TỔNG KẾT ===================== */
    {
      id: "tong-ket", name: "Tổng kết", type: "summary",
      task: "Cả lớp nhắc lại kiến thức trọng tâm và làm thử thách cuối. Về nhà: hoàn thiện Vận dụng; đọc trước Bài 7: Trình bày dữ liệu bằng biểu đồ.",
      content: {
        learned: [
          "Mỗi phiếu khảo sát là một hàng dữ liệu; tiêu đề cột là các thông tin chính.",
          "Sắp xếp: chọn vùng → Data › Sort → My data has headers → Sort by (Then by bằng Add Level) → A to Z / Z to A → OK.",
          "Lọc: chọn vùng → Data › Filter → nút lọc ở tiêu đề cột → chọn giá trị; dữ liệu không thoả mãn bị ẩn; Select All để bỏ lọc.",
          "Có thể lọc theo nhiều tiêu chí và lọc theo điều kiện (Number Filters, Text Filters).",
        ],
        challenge: [
          { question: "Thầy chủ nhiệm muốn in danh sách chỉ gồm các bạn tổ 3, xếp theo thứ tự bảng chữ cái của Tên. Em cần dùng:", type: "multiple-choice",
            options: ["Chỉ sắp xếp theo Tổ", "Lọc Tổ = 3 và sắp xếp theo Tên (A to Z)", "Chỉ lọc theo Nội dung", "Xoá các bạn tổ 1, tổ 2"],
            answer: 1, explanation: "Lọc để chỉ hiện tổ 3 (không xoá dữ liệu), sắp xếp theo Tên để đúng thứ tự bảng chữ cái.", level: "van-dung-cao", activity: "tong-ket" },
          { question: "Phát biểu nào đúng về chức năng lọc dữ liệu?", type: "multiple-choice",
            options: ["Lọc làm thay đổi thứ tự các hàng", "Lọc xoá vĩnh viễn các hàng không thoả mãn", "Lọc chỉ dùng được cho cột chứa số", "Lọc chỉ hiển thị các hàng thoả mãn điều kiện, các hàng khác bị ẩn đi"],
            answer: 3, explanation: "Lọc chọn và chỉ hiển thị các dòng thoả mãn điều kiện; dữ liệu khác bị ẩn, bỏ lọc sẽ hiện lại.", level: "thong-hieu", activity: "tong-ket" },
        ],
      },
    },
  ],
};

if (typeof module !== "undefined" && module.exports) module.exports = LESSON;
if (typeof window !== "undefined") window.LESSON = LESSON;
