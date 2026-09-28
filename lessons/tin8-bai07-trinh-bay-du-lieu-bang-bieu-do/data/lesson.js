/* ============================================================================
 * BÀI 7 — TRÌNH BÀY DỮ LIỆU BẰNG BIỂU ĐỒ  (Tin học 8 — Kết nối tri thức với cuộc sống)
 * Chủ đề 4: Ứng dụng tin học.
 * Bám sát SGK trang 32–35 + Kế hoạch bài dạy (2 tiết) của giáo viên.
 * Chỉ sửa file này để đổi nội dung. Engine app.js không cần sửa.
 * GV chọn: dữ liệu thực hành theo SGK Hình 7.1; KHÔNG mô phỏng tạo biểu đồ (làm trên Excel thật).
 * Biểu đồ trong app được engine vẽ từ số liệu SGK (spec `chart`) để sắc nét trên máy chiếu; Hình 7.3 dùng ảnh SGK.
 * ==========================================================================*/

// ---- Hình 7.1: Bảng tổng hợp kết quả khảo sát lớp 8A (SGK tr.32) ----
const ND = ["Ngôn ngữ lập trình", "Mạng máy tính", "Đồ hoạ máy tính", "Bảng tính điện tử", "Soạn thảo văn bản", "Phần mềm trình chiếu"];
const SL = [8, 7, 15, 4, 2, 5];
// ---- Hình 7.8: Tổng số HS sử dụng thiết bị số trong mỗi khoảng thời gian (SGK tr.35) ----
const TGL = ["Không sử dụng", "Dưới 1 giờ", "1-2 giờ", "3-4 giờ", "Từ 5 giờ trở lên"];
const TGV = [68, 131, 146, 72, 12];
// ---- Hình 7.9: Doanh thu công nghiệp phần mềm 2016–2020, triệu USD (SGK tr.35) ----
const NAM = ["2016", "2017", "2018", "2019", "2020"];
const DT = [3038, 3779, 4447, 4932, 5439];

// Biểu đồ (engine vẽ) — theo đúng số liệu SGK
const C72 = { type: "column", title: "Số học sinh quan tâm", labels: ND, values: SL, dataLabels: true, caption: "Hình 7.2. Trình bày dữ liệu bằng biểu đồ" };
const C74 = { type: "pie", title: "Số học sinh quan tâm", labels: ND, values: SL, percent: true, caption: "Hình 7.4. Biểu đồ hình quạt tròn" };
const C79 = { type: "column", labels: NAM, values: DT, dataLabels: true, thousands: true, yTitle: "Triệu USD", xTitle: "Năm", caption: "Hình 7.9. Doanh thu công nghiệp phần mềm giai đoạn 2016 – 2020 (Theo: Sách trắng Công nghệ thông tin năm 2021 – Bộ Thông tin và Truyền thông)" };

// Bảng kiểu Excel (chỉ hiển thị)
const TH = "background:#eef1f5;color:#4b5563;border:1px solid #d5d9e0;padding:2px 6px;font-weight:600;font-size:.85rem", TD = "border:1px solid #d5d9e0;padding:3px 10px";
const H71_HTML = (() => {
  let h = `<div style="overflow-x:auto"><table style="border-collapse:collapse;margin:0 auto;background:#fff;font-family:Calibri,'Segoe UI',Arial,sans-serif;font-size:1.05rem">`;
  h += `<tr><th style="${TH}"></th>${["A", "B", "C"].map((c) => `<th style="${TH}">${c}</th>`).join("")}</tr>`;
  h += `<tr><th style="${TH}">1</th><td colspan="3" style="${TD};font-weight:800">Bảng tổng hợp kết quả khảo sát lớp 8A</td></tr>`;
  h += `<tr><th style="${TH}">2</th>${["TT", "Nội dung Tin học", "Số học sinh quan tâm"].map((x) => `<td style="${TD};font-weight:800;text-align:center">${x}</td>`).join("")}</tr>`;
  ND.forEach((n, i) => { h += `<tr><th style="${TH}">${3 + i}</th><td style="${TD};text-align:center">${i + 1}</td><td style="${TD}">${n}</td><td style="${TD};text-align:center">${SL[i]}</td></tr>`; });
  return h + `</table><div class="caption">Hình 7.1. Trình bày dữ liệu bằng bảng</div></div>`;
})();
const SIMPLE = (head, labels, vals, cap) => {
  let h = `<div style="overflow-x:auto"><table style="border-collapse:collapse;margin:0 auto;background:#fff;font-family:Calibri,'Segoe UI',Arial,sans-serif;font-size:1.08rem">`;
  h += `<tr>${head.map((x) => `<td style="${TD};font-weight:800;text-align:center;background:#ede9fe">${x}</td>`).join("")}</tr>`;
  labels.forEach((l, i) => { h += `<tr><td style="${TD}">${l}</td><td style="${TD};text-align:right">${vals[i]}</td></tr>`; });
  return h + `</table>${cap ? `<div class="caption">${cap}</div>` : ""}</div>`;
};
const H78_HTML = SIMPLE(["Thời gian", "Số học sinh"], TGL, TGV, "Hình 7.8. Tổng số học sinh sử dụng thiết bị số trong mỗi khoảng thời gian");

// Lưới bảng tính (câu chọn vùng dữ liệu)
const SHEET71 = {
  title: "Khảo sát lớp 8A.xlsx", cols: 4, rows: 9, widths: { B: 2.4, C: 1.9 },
  cells: Object.assign({ A1: "Bảng tổng hợp kết quả khảo sát lớp 8A", A2: "TT", B2: "Nội dung Tin học", C2: "Số học sinh quan tâm" },
    ...ND.map((n, i) => ({ ["A" + (3 + i)]: String(i + 1), ["B" + (3 + i)]: n, ["C" + (3 + i)]: String(SL[i]) }))),
  bold: ["A1", "A2:C2"], center: ["A2:C8"],
};
const SHEET79 = {
  title: "Doanh thu phần mềm.xlsx", cols: 4, rows: 8, widths: { B: 2.2 },
  cells: Object.assign({ A1: "Năm", B1: "Doanh thu (triệu USD)" }, ...NAM.map((n, i) => ({ ["A" + (2 + i)]: n, ["B" + (2 + i)]: String(DT[i]) }))),
  bold: ["A1:B1"],
};

const LESSON = {
  meta: {
    subject: "Tin học", grade: "8", book: "Kết nối tri thức với cuộc sống",
    title: "Bài 7: Trình bày dữ liệu bằng biểu đồ", unit: "Chủ đề 4 — Ứng dụng tin học",
    pages: "32–35", durationMinutes: 90,
  },
  objectives: {
    knowledge: [
      "Nêu được một số tình huống thực tế cần sử dụng các chức năng tạo biểu đồ.",
      "Nhận biết được một số loại biểu đồ thông dụng: biểu đồ cột, biểu đồ hình quạt tròn, biểu đồ đoạn thẳng; lựa chọn được loại biểu đồ phù hợp với mục đích trình bày dữ liệu.",
      "Thực hiện được các thao tác tạo biểu đồ của phần mềm bảng tính; bổ sung thông tin cho biểu đồ (tiêu đề, nhãn dữ liệu, chú giải).",
    ],
    competencies: [
      "Tự học; giao tiếp và hợp tác (thảo luận nhóm, thực hành 2 HS/máy); giải quyết vấn đề (phân tích dữ liệu để chọn cách biểu diễn).",
      "Năng lực số 3.1.TC2a: tạo được biểu đồ từ bảng dữ liệu đã có; chuyển dữ liệu từ dạng bảng sang dạng biểu đồ.",
      "Năng lực số 3.2.TC2a: lựa chọn loại biểu đồ phù hợp (cột, hình quạt tròn, đoạn thẳng) với mục đích trình bày.",
      "Năng lực số 5.2.TC2a: tạo và chỉnh sửa biểu đồ đơn giản (tiêu đề, nhãn dữ liệu, chú giải…) giúp dữ liệu dễ nhìn, dễ hiểu.",
      "Năng lực AI 8.C1.2: hiểu rằng chất lượng dữ liệu ảnh hưởng trực tiếp đến kết quả phân tích; kiểm chứng gợi ý của AI với dữ liệu thực tế.",
    ],
    qualities: ["Chăm chỉ, cẩn thận khi nhập liệu; trung thực: sử dụng dữ liệu đúng thực tế, không làm sai lệch số liệu khi tạo biểu đồ."],
  },
  coreKnowledge: [
    "Biểu đồ là cách minh hoạ dữ liệu trực quan. Nhờ biểu đồ, em dễ dàng so sánh, nhận định xu hướng thay đổi của dữ liệu.",
    "Biểu đồ cột thường được sử dụng để so sánh dữ liệu.",
    "Biểu đồ hình quạt tròn hữu ích khi cần so sánh các phần với tổng thể (tỉ lệ phần trăm).",
    "Biểu đồ đoạn thẳng thường được sử dụng để quan sát xu hướng tăng giảm của dữ liệu theo thời gian hay quá trình nào đó.",
    "Tạo biểu đồ: chọn vùng dữ liệu (VD B2:C8) → thẻ Insert, nhóm Charts → chọn loại biểu đồ (Insert Column or Bar Chart / Insert Pie or Doughnut Chart) → chọn kiểu → bổ sung thông tin bằng Chart Elements (Chart Title, Data Labels, Legend…).",
    "Cần sử dụng loại biểu đồ phù hợp với mục đích của việc biểu diễn và thể hiện dữ liệu.",
  ],
  keywords: ["Biểu đồ cột", "Biểu đồ hình quạt tròn", "Biểu đồ đoạn thẳng", "Chart Elements", "Data Labels"],
  settings: { basePoints: 100, useTimer: false, defaultTime: 60, sound: true, streakEnabled: true },

  activities: [
    /* =========================== TIẾT 1 =========================== */
    /* ===================== HĐ1: MỞ ĐẦU (5 phút) ===================== */
    {
      id: "mo-dau", name: "Mở đầu — Bảng hay biểu đồ? 🤔", type: "knowledge",
      goal: "Tạo hứng thú; nhận ra cùng một dữ liệu có thể trình bày bằng bảng hoặc biểu đồ, biểu đồ dễ so sánh hơn.",
      time: 300,
      task: "Nhóm quan sát Hình 7.1 trả lời Câu 1, 2; quan sát Hình 7.2 trả lời Câu 3, 4; rồi nhận xét: hình nào dễ so sánh dữ liệu hơn? (Câu 5)",
      sgkImage: "assets/sgk/mo-dau.jpg",
      html: H71_HTML,
      content: {
        heading: "🤔 Bảng hay biểu đồ?",
        prompt: "Hình 7.1 và Hình 7.2 mô tả hai cách trình bày kết quả khảo sát những nội dung Tin học mà các bạn học sinh lớp 8A muốn tìm hiểu thêm. Em hãy nhận xét về hai cách trình bày này.",
        revealLabel: "📌 Giáo viên chốt",
        blocks: [
          { kind: "list", value: [
            "Biểu đồ giúp thể hiện dữ liệu trực quan, sinh động, dễ hiểu.",
            "Có thể tạo và chỉnh sửa biểu đồ trong phần mềm bảng tính — nội dung của Bài 7.",
          ] },
        ],
      },
      questions: [
        { question: "Câu 1 — Quan sát Hình 7.1: nội dung Tin học nào được học sinh quan tâm NHIỀU NHẤT?", type: "multiple-choice",
          options: ["Ngôn ngữ lập trình", "Đồ hoạ máy tính", "Mạng máy tính", "Phần mềm trình chiếu"],
          answer: 1, explanation: "Đồ hoạ máy tính có 15 học sinh quan tâm — nhiều nhất.", level: "nhan-biet", activity: "mo-dau" },
        { question: "Câu 2 — Quan sát Hình 7.1: nội dung nào được quan tâm ÍT NHẤT?", type: "multiple-choice",
          options: ["Bảng tính điện tử", "Phần mềm trình chiếu", "Mạng máy tính", "Soạn thảo văn bản"],
          answer: 3, explanation: "Soạn thảo văn bản chỉ có 2 học sinh quan tâm.", level: "nhan-biet", activity: "mo-dau" },
        { question: "Câu 3 — Quan sát Hình 7.2: nội dung nào được quan tâm nhiều THỨ HAI?", type: "multiple-choice",
          chart: C72,
          options: ["Mạng máy tính", "Phần mềm trình chiếu", "Ngôn ngữ lập trình", "Đồ hoạ máy tính"],
          answer: 2, explanation: "Cột Ngôn ngữ lập trình (8) cao thứ hai, chỉ sau Đồ hoạ máy tính (15).", level: "thong-hieu", activity: "mo-dau" },
        { question: "Câu 4 — Quan sát Hình 7.2: nội dung nào được quan tâm ít THỨ HAI?", type: "multiple-choice",
          chart: C72,
          options: ["Bảng tính điện tử", "Soạn thảo văn bản", "Phần mềm trình chiếu", "Mạng máy tính"],
          answer: 0, explanation: "Cột thấp nhất là Soạn thảo văn bản (2), thấp thứ hai là Bảng tính điện tử (4).", level: "thong-hieu", activity: "mo-dau" },
        { question: "Câu 5 — Từ Hình 7.1 và Hình 7.2, theo em hình nào giúp so sánh dữ liệu dễ hơn?", type: "multiple-choice",
          chart: C72,
          options: ["Hình 7.1 — bảng dữ liệu", "Hai hình như nhau", "Hình 7.2 — biểu đồ", "Không hình nào so sánh được"],
          answer: 2, explanation: "Nhìn độ cao các cột trong biểu đồ, em so sánh ngay được mà không cần đọc từng con số.", level: "thong-hieu", activity: "mo-dau" },
      ],
    },
    {
      id: "khao-sat-bieu-do", name: "Lớp mình thì sao? Khảo sát → biểu đồ 📊", type: "poll",
      goal: "Thấy dữ liệu thật của lớp được trình bày bằng biểu đồ cột và biểu đồ hình quạt tròn ngay lập tức.",
      time: 180,
      task: "Mỗi nhóm (hoặc mỗi bạn) chọn MỘT nội dung Tin học muốn tìm hiểu thêm. Thầy/cô đổi qua lại 📶 Biểu đồ cột ⇄ 🥧 Biểu đồ hình quạt tròn: mỗi biểu đồ giúp em thấy điều gì? Không có đáp án đúng/sai.",
      question: "Bạn mong muốn tìm hiểu thêm nội dung nào của môn Tin học? (Chọn một nội dung)",
      options: ND,
      chartView: true, chartTitle: "Số bạn lớp mình quan tâm",
    },

    /* ===================== HĐ2.1: TRÌNH BÀY DỮ LIỆU BẰNG BIỂU ĐỒ (30 phút) ===================== */
    {
      id: "hd1-trinh-bay", name: "1. Hoạt động 1: Trình bày dữ liệu bằng biểu đồ 📶", type: "knowledge",
      goal: "So sánh hai cách trình bày; chọn cách thể hiện tỉ lệ phần trăm.",
      time: 300,
      task: "Nhóm thảo luận Hoạt động 1 (SGK tr.32): 1) Cách nào hiệu quả hơn để so sánh trực quan số học sinh quan tâm các nội dung Tin học? 2) Nếu cần so sánh tỉ lệ phần trăm số học sinh của mỗi nội dung trên tổng số học sinh khảo sát, em dùng cách nào?",
      sgkImage: "assets/sgk/hoat-dong-1.jpg",
      html: H71_HTML,
      chart: C72,
      questions: [
        { question: "1) Trong hai cách trình bày ở Hình 7.1 và Hình 7.2, cách nào hiệu quả hơn để so sánh trực quan số học sinh quan tâm các nội dung Tin học?", type: "multiple-choice",
          options: ["Bảng dữ liệu (Hình 7.1)", "Biểu đồ cột (Hình 7.2)", "Cả hai hiệu quả như nhau", "Chỉ cần đọc to các con số"],
          answer: 1, explanation: "Biểu đồ cột (Hình 7.2) cho thấy ngay nội dung nào cao, nội dung nào thấp — so sánh trực quan hiệu quả hơn.", level: "thong-hieu", activity: "hd1-trinh-bay" },
        { question: "2) Nếu cần so sánh TỈ LỆ PHẦN TRĂM số học sinh của mỗi nội dung trên tổng số học sinh được khảo sát, em dùng cách nào?", type: "multiple-choice",
          options: ["Biểu đồ cột", "Biểu đồ đoạn thẳng", "Bảng dữ liệu", "Biểu đồ hình quạt tròn"],
          answer: 3, explanation: "Biểu đồ hình quạt tròn so sánh các phần với tổng thể: mỗi phần là tỉ lệ % của một nội dung (Hình 7.4).", level: "van-dung", activity: "hd1-trinh-bay" },
      ],
    },
    {
      id: "cac-loai-bieu-do", name: "Các loại biểu đồ thường dùng 🧭", type: "knowledge",
      goal: "Nêu ưu điểm của biểu đồ; nhận biết biểu đồ cột, hình quạt tròn, đoạn thẳng và tác dụng của mỗi loại.",
      time: 600,
      task: "Nhóm thảo luận: 1) Ưu điểm của biểu diễn dữ liệu bằng biểu đồ là gì? 2) Ở môn Địa lí em đã gặp những dạng biểu đồ nào? 3) Phần mềm bảng tính có tạo được các biểu đồ đó không? 4) Nêu tác dụng của từng loại biểu đồ.",
      sgkImage: "assets/sgk/sgk-trang33.jpg",
      content: {
        heading: "🧭 Các loại biểu đồ thường dùng",
        revealLabel: "📖 Kiến thức (SGK tr.32–33)",
        blocks: [
          { kind: "text", value: "Biểu đồ được sử dụng để minh hoạ dữ liệu một cách trực quan, giúp em dễ so sánh hoặc dự đoán xu hướng tăng hay giảm của dữ liệu. Có nhiều loại biểu đồ, mỗi loại có một ý nghĩa riêng:" },
          { kind: "text", value: "📶 Biểu đồ cột thường được sử dụng để so sánh dữ liệu. Ví dụ, từ Hình 7.2 dễ dàng thấy nội dung Đồ hoạ máy tính thu hút sự quan tâm nhiều nhất, sau đó là Ngôn ngữ lập trình; Soạn thảo văn bản ít học sinh quan tâm nhất." },
          { kind: "chart", value: C72 },
          { kind: "text", value: "📈 Biểu đồ đoạn thẳng thường được sử dụng để quan sát xu hướng tăng giảm của dữ liệu theo thời gian hay quá trình nào đó. Ví dụ, Hình 7.3 cho thấy số lượng ứng dụng được tải về từ các chợ ứng dụng từ năm 2017 đến 2020 có xu hướng tăng dần." },
          { kind: "image", value: "assets/sgk/hinh-7-3.jpg", caption: "Hình 7.3. Biểu đồ đoạn thẳng" },
          { kind: "text", value: "🥧 Biểu đồ hình quạt tròn rất hữu ích trong trường hợp cần so sánh các phần với tổng thể. Ví dụ, Hình 7.4 so sánh tỉ lệ phần trăm số học sinh muốn tìm hiểu thêm mỗi nội dung Tin học trên tổng số học sinh khảo sát." },
          { kind: "chart", value: C74 },
        ],
      },
      remember: [
        "Biểu đồ là cách minh hoạ dữ liệu trực quan. Nhờ biểu đồ, em dễ dàng so sánh, nhận định xu hướng thay đổi của dữ liệu.",
        "Cần sử dụng loại biểu đồ phù hợp với mục đích của việc biểu diễn và thể hiện dữ liệu.",
      ],
      questions: [
        { question: "Ưu điểm của việc trình bày dữ liệu bằng biểu đồ là gì?", type: "multiple-choice",
          options: ["Biểu đồ luôn chứa nhiều số liệu hơn bảng", "Minh hoạ dữ liệu trực quan, dễ so sánh, dễ nhận định xu hướng tăng hay giảm", "Biểu đồ không cần dữ liệu", "Biểu đồ làm tệp bảng tính nhỏ hơn"],
          answer: 1, explanation: "Biểu đồ minh hoạ dữ liệu một cách trực quan, giúp dễ so sánh hoặc dự đoán xu hướng tăng hay giảm của dữ liệu.", level: "nhan-biet", activity: "cac-loai-bieu-do" },
        { question: "Phần mềm bảng tính có tạo được biểu đồ cột, biểu đồ hình quạt tròn, biểu đồ đoạn thẳng như em đã gặp ở môn Địa lí không?", type: "multiple-choice",
          options: ["Không, chỉ vẽ được bằng tay", "Chỉ tạo được biểu đồ cột", "Có, tạo được nhanh từ bảng dữ liệu (thẻ Insert, nhóm Charts)", "Chỉ tạo được khi có Internet"],
          answer: 2, explanation: "Phần mềm bảng tính có nhóm lệnh Charts (thẻ Insert) để tạo nhiều loại biểu đồ từ dữ liệu trong bảng.", level: "nhan-biet", activity: "cac-loai-bieu-do" },
        { question: "Biểu đồ Hình 7.3 (đoạn thẳng) giúp em nhận ra điều gì?", type: "multiple-choice",
          image: "assets/sgk/hinh-7-3.jpg", imageCaption: "Hình 7.3. Biểu đồ đoạn thẳng",
          options: ["Số ứng dụng được tải về có xu hướng tăng dần từ 2017 đến 2020", "Số ứng dụng giảm dần", "Năm 2017 có nhiều ứng dụng nhất", "Tỉ lệ % ứng dụng của mỗi chợ"],
          answer: 0, explanation: "Đường đi lên liên tục từ 2017 đến 2020 → xu hướng tăng dần. Đây là thế mạnh của biểu đồ đoạn thẳng.", level: "thong-hieu", activity: "cac-loai-bieu-do" },
      ],
    },
    {
      id: "cau-hoi-bieu-do", name: "Ai nhanh hơn? Chọn loại biểu đồ ⚡", type: "quiz",
      goal: "Củng cố mục đích sử dụng biểu đồ và tác dụng của từng loại.",
      time: 240,
      task: "Trả lời nhanh các câu hỏi (giáo án — Nhiệm vụ 3).",
      questions: [
        { question: "Mục đích của việc sử dụng biểu đồ là gì?", type: "multiple-choice",
          options: ["Minh hoạ dữ liệu trực quan", "Dễ so sánh số liệu", "Dễ dự đoán xu thế tăng hay giảm của các số liệu", "Tất cả các ý trên"],
          answer: 3, explanation: "Biểu đồ minh hoạ dữ liệu trực quan, giúp dễ so sánh và dự đoán xu hướng tăng hay giảm.", level: "nhan-biet", activity: "cau-hoi-bieu-do" },
        { question: "Để mô tả tỉ lệ của giá trị dữ liệu so với tổng thể, người ta thường dùng dạng biểu đồ nào?", type: "multiple-choice",
          options: ["Biểu đồ cột", "Biểu đồ đoạn thẳng (đường gấp khúc)", "Biểu đồ hình quạt tròn", "Biểu đồ miền"],
          answer: 2, explanation: "Biểu đồ hình quạt tròn so sánh các phần với tổng thể.", level: "nhan-biet", activity: "cau-hoi-bieu-do" },
        { question: "Để quan sát xu hướng tăng giảm của dữ liệu theo thời gian hay quá trình nào đó, người ta thường dùng dạng biểu đồ nào?", type: "multiple-choice",
          options: ["Biểu đồ cột", "Biểu đồ đoạn thẳng (đường gấp khúc)", "Biểu đồ hình quạt tròn", "Biểu đồ miền"],
          answer: 1, explanation: "Biểu đồ đoạn thẳng thể hiện rõ xu hướng tăng giảm theo thời gian.", level: "nhan-biet", activity: "cau-hoi-bieu-do" },
        { question: "Để so sánh dữ liệu (VD số học sinh quan tâm mỗi nội dung), người ta thường dùng dạng biểu đồ nào?", type: "multiple-choice",
          options: ["Biểu đồ cột", "Biểu đồ đoạn thẳng (đường gấp khúc)", "Biểu đồ hình quạt tròn", "Biểu đồ miền"],
          answer: 0, explanation: "Biểu đồ cột thường được sử dụng để so sánh dữ liệu.", level: "nhan-biet", activity: "cau-hoi-bieu-do" },
      ],
    },
    {
      id: "chon-loai-bieu-do", name: "Trò chơi: Chọn đúng loại biểu đồ 🎯", type: "dragdrop",
      goal: "Nêu được tình huống thực tế cần tạo biểu đồ và chọn loại biểu đồ phù hợp (câu hỏi SGK tr.33).",
      time: 300,
      task: "Câu hỏi SGK tr.33: Em hãy nêu một số tình huống thực tế cần tạo biểu đồ. Xếp mỗi tình huống vào loại biểu đồ phù hợp nhất rồi bấm Nộp bài.",
      sgkImage: "assets/sgk/cau-hoi-tr33.jpg",
      layout: "cols",
      groups: ["📶 Biểu đồ cột (so sánh)", "🥧 Biểu đồ hình quạt tròn (tỉ lệ so với tổng thể)", "📈 Biểu đồ đoạn thẳng (xu hướng theo thời gian)"],
      items: [
        { text: "So sánh số học sinh giỏi của các lớp khối 8", group: 0 },
        { text: "So sánh số cây trồng mới ở 4 khu vực của trường", group: 0 },
        { text: "So sánh số bạn tham gia mỗi câu lạc bộ của trường", group: 0 },
        { text: "Tỉ lệ % mỗi loại rác thải được phân loại trong tuần", group: 1 },
        { text: "Mỗi khoản chi chiếm bao nhiêu % tổng chi tiêu của gia đình trong tháng", group: 1 },
        { text: "Tỉ lệ % học sinh chọn mỗi môn thể thao trên tổng số học sinh khảo sát", group: 1 },
        { text: "Nhiệt độ trung bình của thành phố qua 12 tháng", group: 2 },
        { text: "Điểm kiểm tra môn Toán của em qua các lần kiểm tra trong năm học", group: 2 },
        { text: "Số lượt truy cập trang web của trường qua các tháng", group: 2 },
      ],
      explanation: "So sánh các đối tượng → biểu đồ cột. Các phần so với tổng thể (tỉ lệ %) → biểu đồ hình quạt tròn. Thay đổi theo thời gian → biểu đồ đoạn thẳng.",
    },

    /* ===================== HĐ2.2: THỰC HÀNH TẠO BIỂU ĐỒ (30 phút) ===================== */
    {
      id: "th-bieu-do-cot", name: "2. Thực hành: Tạo biểu đồ cột 📶", type: "knowledge",
      goal: "Tạo biểu đồ cột so sánh số học sinh quan tâm các nội dung Tin học như Hình 7.2; bổ sung thông tin bằng Chart Elements.",
      time: 900,
      task: "Nhiệm vụ (SGK tr.33): Thực hành trên Excel (2 HS/máy) — nhập bảng Hình 7.1, tạo biểu đồ cột như Hình 7.2 và bổ sung thông tin như Hình 7.6. Rồi trả lời các câu hỏi kiểm tra.",
      sgkImage: "assets/sgk/tao-bieu-do-cot.jpg",
      sheet: SHEET71,
      content: {
        heading: "📶 a) Tạo biểu đồ cột",
        revealLabel: "🔢 Hướng dẫn (SGK tr.33–34)",
        blocks: [
          { kind: "list", value: [
            "Bước 1. Khởi động phần mềm bảng tính và nhập dữ liệu như bảng trong Hình 7.1.",
            "Bước 2. Chọn vùng dữ liệu B2:C8.",
            "Bước 3. Trong thẻ Insert, tại nhóm Charts, chọn lệnh Insert Column or Bar Chart (Hình 7.5), danh sách các loại biểu đồ sẽ xuất hiện.",
            "Bước 4. Trong nhóm biểu đồ 2-D Column, chọn kiểu biểu đồ Clustered Column. Khi đó biểu đồ kết quả sẽ xuất hiện trong bảng tính.",
          ] },
          { kind: "image", value: "assets/sgk/hinh-7-5.jpg", caption: "Hình 7.5. Nhóm lệnh Charts" },
          { kind: "text", value: "Bước 5. Bổ sung thông tin cho biểu đồ: nháy chuột chọn biểu đồ, sau đó chọn nút lệnh Chart Elements (dấu +) ở góc trên bên phải của biểu đồ. Nháy chuột chọn các loại thông tin cho biểu đồ như minh hoạ trong Hình 7.6 (Axes, Chart Title, Data Labels › Outside End, Gridlines)." },
          { kind: "image", value: "assets/sgk/hinh-7-6.jpg", caption: "Hình 7.6. Bổ sung thông tin cho biểu đồ" },
          { kind: "text", value: "Lưu ý: Trong danh sách thông tin ở nút lệnh Chart Elements, em hãy chọn thêm các lệnh khác và quan sát sự thay đổi của biểu đồ." },
        ],
      },
      questions: [
        { type: "sheet", question: "Bước 2 — Kéo chọn vùng dữ liệu cần chọn để tạo biểu đồ cột như Hình 7.2.", answer: "B2:C8",
          hint: "Cần tên các nội dung (làm nhãn) và số học sinh (làm độ cao cột), kèm hàng tiêu đề.",
          explanation: "Vùng B2:C8 gồm cột Nội dung Tin học (nhãn trục ngang) và cột Số học sinh quan tâm (giá trị), kể cả hàng tiêu đề 2. Không chọn cột TT và dòng tên bảng.", level: "van-dung", activity: "th-bieu-do-cot" },
        { question: "Lệnh tạo biểu đồ cột nằm ở đâu?", type: "multiple-choice",
          options: ["Thẻ Home, nhóm Font", "Thẻ Data, nhóm Sort & Filter", "Thẻ Insert, nhóm Charts, lệnh Insert Column or Bar Chart", "Thẻ View, nhóm Window"],
          answer: 2, explanation: "Thẻ Insert › nhóm Charts › Insert Column or Bar Chart (Hình 7.5).", level: "nhan-biet", activity: "th-bieu-do-cot" },
        { question: "Trong nhóm 2-D Column, em chọn kiểu biểu đồ nào để được biểu đồ như Hình 7.2?", type: "multiple-choice",
          options: ["Clustered Column", "Stacked Column", "3-D Column", "Line"],
          answer: 0, explanation: "SGK Bước 4: nhóm 2-D Column › Clustered Column.", level: "nhan-biet", activity: "th-bieu-do-cot" },
        { question: "Để hiện số liệu phía trên mỗi cột như Hình 7.6, trong Chart Elements em chọn:", type: "multiple-choice",
          options: ["Legend", "Axis Titles", "Trendline", "Data Labels › Outside End"],
          answer: 3, explanation: "Data Labels (nhãn dữ liệu) › Outside End: số liệu hiện ngay phía trên đầu cột.", level: "thong-hieu", activity: "th-bieu-do-cot" },
      ],
    },
    {
      id: "cac-buoc-cot", name: "Trò chơi: Sắp xếp các bước tạo biểu đồ cột 🔢", type: "ordering",
      goal: "Ghi nhớ quy trình tạo biểu đồ cột.",
      time: 180,
      task: "Sắp xếp các bước tạo biểu đồ cột như Hình 7.2 cho đúng thứ tự rồi bấm Nộp bài.",
      steps: [
        "Nhập dữ liệu như bảng trong Hình 7.1",
        "Chọn vùng dữ liệu B2:C8",
        "Thẻ Insert › nhóm Charts › Insert Column or Bar Chart",
        "Trong nhóm 2-D Column, chọn Clustered Column",
        "Chọn biểu đồ › Chart Elements › đánh dấu Chart Title, Data Labels",
      ],
      explanation: "Nhập dữ liệu → chọn vùng → Insert › Charts → chọn kiểu biểu đồ → bổ sung thông tin bằng Chart Elements.",
    },

    /* =========================== TIẾT 2 =========================== */
    {
      id: "th-bieu-do-quat", name: "Thực hành: Tạo biểu đồ hình quạt tròn 🥧", type: "knowledge",
      goal: "Tạo biểu đồ hình quạt tròn như Hình 7.4; hiển thị nhãn dữ liệu là tỉ lệ phần trăm.",
      time: 900,
      task: "Nhiệm vụ (SGK tr.34): Trên Excel, tạo biểu đồ hình quạt tròn như Hình 7.4 để so sánh trực quan tỉ lệ phần trăm số học sinh của mỗi nội dung Tin học trên tổng số học sinh khảo sát.",
      sgkImage: "assets/sgk/hinh-7-7.jpg",
      content: {
        heading: "🥧 b) Tạo biểu đồ hình quạt tròn",
        revealLabel: "🔢 Hướng dẫn (SGK tr.34–35)",
        blocks: [
          { kind: "list", value: [
            "Bước 1. Chọn vùng dữ liệu B2:C8.",
            "Bước 2. Trong thẻ Insert, tại nhóm Charts, chọn lệnh Insert Pie or Doughnut Chart. Danh sách các loại biểu đồ hình quạt tròn sẽ xuất hiện.",
            "Bước 3. Trong nhóm biểu đồ 2-D Pie, chọn kiểu biểu đồ Pie. Biểu đồ kết quả sẽ xuất hiện trong bảng tính.",
            "Bước 4. Bổ sung thông tin cho biểu đồ. Trong Excel, biểu đồ hình quạt tròn thường có thông tin mặc định gồm tiêu đề và chú giải (Legend). Để hiển thị nhãn dữ liệu là tỉ lệ phần trăm, chọn Data Labels › More Options… (Hình 7.7); khung làm việc Format Data Labels xuất hiện ở bên phải, trong Label Options em đánh dấu chọn Percentage.",
          ] },
          { kind: "image", value: "assets/sgk/hinh-7-7.jpg", caption: "Hình 7.7. Bổ sung thông tin cho biểu đồ hình quạt tròn" },
          { kind: "chart", value: C74 },
          { kind: "text", value: "Lưu ý: Trong khung làm việc Format Data Labels còn có nhiều tuỳ chọn khác về nhãn dữ liệu, em hãy chọn thêm các lệnh khác và quan sát sự thay đổi của biểu đồ." },
        ],
      },
      questions: [
        { question: "Lệnh tạo biểu đồ hình quạt tròn là:", type: "multiple-choice",
          options: ["Insert Column or Bar Chart", "Insert Pie or Doughnut Chart", "Insert Line or Area Chart", "PivotChart"],
          answer: 1, explanation: "Thẻ Insert › nhóm Charts › Insert Pie or Doughnut Chart › 2-D Pie › Pie.", level: "nhan-biet", activity: "th-bieu-do-quat" },
        { question: "Biểu đồ hình quạt tròn trong Excel thường có sẵn những thông tin mặc định nào?", type: "multiple-choice",
          options: ["Nhãn dữ liệu tỉ lệ %", "Trục đứng và đường lưới", "Tiêu đề và chú giải (Legend)", "Không có thông tin nào"],
          answer: 2, explanation: "SGK: biểu đồ hình quạt tròn thường có thông tin mặc định gồm tiêu đề và chú giải (Legend).", level: "nhan-biet", activity: "th-bieu-do-quat" },
        { question: "Để nhãn dữ liệu hiển thị tỉ lệ phần trăm, em làm thế nào?", type: "multiple-choice",
          options: ["Chart Elements › Data Labels › More Options… › đánh dấu Percentage", "Chart Elements › Legend", "Nhập dấu % vào các ô cột C", "Chọn Chart Title"],
          answer: 0, explanation: "Data Labels › More Options… → khung Format Data Labels → Label Options → Percentage.", level: "thong-hieu", activity: "th-bieu-do-quat" },
        { question: "Trong Hình 7.4, phần Đồ hoạ máy tính chiếm 37%. Con số này được tính như thế nào?", type: "multiple-choice",
          chart: C74,
          options: ["37 học sinh chọn Đồ hoạ máy tính", "15 trên 100 học sinh", "15 học sinh trên tổng số 41 học sinh khảo sát ≈ 37%", "Phần mềm tự đoán"],
          answer: 2, explanation: "Tổng số học sinh khảo sát: 8 + 7 + 15 + 4 + 2 + 5 = 41. Tỉ lệ Đồ hoạ máy tính: 15 : 41 ≈ 0,37 = 37%. Phần mềm tự tính tỉ lệ khi chọn Percentage.", level: "van-dung-cao", activity: "th-bieu-do-quat" },
      ],
    },
    {
      id: "tham-tu-bieu-do", name: "Thám tử biểu đồ 🕵️", type: "quiz",
      goal: "Phát hiện lỗi thường gặp khi tạo biểu đồ: chọn sai loại, sai vùng dữ liệu, thiếu tiêu đề/chú giải, trục không bắt đầu từ 0.",
      time: 480,
      task: "Mỗi biểu đồ dưới đây có một lỗi. Hãy làm thám tử: tìm ra lỗi và cách sửa. (Khi nhờ AI kiểm tra biểu đồ, em cũng phải tự đối chiếu với dữ liệu thật như thế này!)",
      questions: [
        { question: "Bạn Hùng muốn cho thấy doanh thu công nghiệp phần mềm TĂNG hay GIẢM qua các năm. Biểu đồ của bạn có lỗi gì?", type: "multiple-choice",
          chart: { type: "pie", title: "Doanh thu công nghiệp phần mềm", labels: NAM, values: DT, percent: true },
          options: ["Chọn sai loại biểu đồ — xu hướng theo thời gian nên dùng biểu đồ đoạn thẳng (hoặc cột)", "Thiếu tiêu đề", "Sai số liệu", "Không có lỗi"],
          answer: 0, explanation: "Biểu đồ hình quạt tròn chỉ cho thấy tỉ lệ so với tổng thể, không thấy được xu hướng tăng dần qua các năm.", level: "van-dung", activity: "tham-tu-bieu-do" },
        { question: "Biểu đồ số học sinh quan tâm xuất hiện thêm các cột màu cam cao lần lượt 1, 2, 3, …, 6. Nguyên nhân là gì?", type: "multiple-choice",
          chart: { type: "column", title: "Số học sinh quan tâm", labels: ND, series: [{ name: "TT", values: [1, 2, 3, 4, 5, 6] }, { name: "Số học sinh quan tâm", values: SL }], colors: ["#ed7d31", "#4472c4"] },
          options: ["Chọn sai loại biểu đồ", "Chọn thừa cột TT (A2:C8) — vùng dữ liệu đúng là B2:C8", "Thiếu nhãn dữ liệu", "Phần mềm bị lỗi"],
          answer: 1, explanation: "Cột TT chứa số nên bị vẽ thành một chuỗi dữ liệu. Chỉ chọn vùng B2:C8 (Nội dung + Số học sinh).", level: "van-dung", activity: "tham-tu-bieu-do" },
        { question: "Người xem không biết biểu đồ này nói về điều gì. Cần bổ sung gì?", type: "multiple-choice",
          chart: { type: "column", labels: ND, values: SL },
          options: ["Đổi sang biểu đồ hình quạt tròn", "Xoá bớt cột", "Đổi màu các cột", "Tiêu đề biểu đồ (Chart Title) và nhãn dữ liệu (Data Labels)"],
          answer: 3, explanation: "Chart Elements › Chart Title (VD “Số học sinh quan tâm”) và Data Labels giúp người xem hiểu ngay biểu đồ.", level: "thong-hieu", activity: "tham-tu-bieu-do" },
        { question: "Nhìn biểu đồ hình quạt tròn này, em không biết mỗi phần là nội dung nào, chiếm bao nhiêu. Thiếu gì?", type: "multiple-choice",
          chart: { type: "pie", title: "Số học sinh quan tâm", labels: ND, values: SL, legend: false },
          options: ["Thiếu chú giải (Legend) và nhãn dữ liệu tỉ lệ % (Percentage)", "Thiếu trục đứng", "Thiếu đường lưới (Gridlines)", "Không thiếu gì"],
          answer: 0, explanation: "Biểu đồ hình quạt tròn cần chú giải để biết mỗi màu là nội dung nào và nhãn % để biết tỉ lệ.", level: "thong-hieu", activity: "tham-tu-bieu-do" },
        { question: "Biểu đồ đoạn thẳng này dùng cho các nội dung Tin học. Có hợp lí không?", type: "multiple-choice",
          chart: { type: "line", title: "Số học sinh quan tâm", labels: ND, values: SL, markers: true },
          options: ["Hợp lí, đoạn thẳng dùng cho mọi dữ liệu", "Hợp lí vì có tiêu đề", "Chưa hợp lí — các nội dung không theo thời gian; để so sánh nên dùng biểu đồ cột", "Chưa hợp lí vì thiếu màu"],
          answer: 2, explanation: "Biểu đồ đoạn thẳng thể hiện xu hướng theo thời gian/quá trình. Các nội dung Tin học là các mục riêng rẽ → dùng biểu đồ cột để so sánh.", level: "van-dung", activity: "tham-tu-bieu-do" },
        { question: "(Mở rộng) Nhìn biểu đồ, cột năm 2020 cao gấp khoảng 5 lần cột năm 2016. Doanh thu có thật sự tăng gấp 5 lần không?", type: "multiple-choice",
          chart: { type: "column", title: "Doanh thu công nghiệp phần mềm (triệu USD)", labels: NAM, values: DT, dataLabels: true, thousands: true, yMin: 2500, yStep: 500 },
          options: ["Đúng, tăng gấp 5 lần", "Không — trục đứng bắt đầu từ 2.500 chứ không phải 0 nên chênh lệch bị phóng đại (thực tế 5.439 : 3.038 ≈ 1,8 lần)", "Không — doanh thu giảm", "Không thể biết"],
          answer: 1, explanation: "Trục đứng không bắt đầu từ 0 làm các cột chênh lệch nhiều hơn thực tế. Biểu đồ trung thực nên để trục bắt đầu từ 0 — không làm sai lệch cách hiểu số liệu.", level: "van-dung-cao", activity: "tham-tu-bieu-do" },
      ],
    },

    /* ===================== HĐ3: LUYỆN TẬP (20 phút) ===================== */
    {
      id: "luyen-tap-1", name: "Luyện tập 1: Thời gian sử dụng thiết bị số 📱", type: "knowledge",
      goal: "Dùng hàm SUM tính tổng; vẽ biểu đồ cột và biểu đồ hình quạt tròn; nhận xét tình hình sử dụng thiết bị số.",
      time: 600,
      task: "Mở tệp TGSDThietbiso.xlsx (Bài 6). Dùng hàm SUM tính tổng số HS trong mỗi khoảng thời gian (như Hình 7.8), rồi: a) vẽ biểu đồ cột, nhận xét tình hình sử dụng thiết bị số của HS khối 8; b) vẽ biểu đồ hình quạt tròn thể hiện tỉ lệ phần trăm.",
      sgkImage: "assets/sgk/luyen-tap.jpg",
      html: H78_HTML,
      content: {
        revealLabel: "✅ Kết quả mẫu để đối chiếu",
        blocks: [
          { kind: "chart", value: [
            { type: "column", title: "Số học sinh sử dụng thiết bị số", labels: TGL, values: TGV, dataLabels: true, caption: "a) Biểu đồ cột" },
            { type: "pie", title: "Số học sinh sử dụng thiết bị số", labels: TGL, values: TGV, percent: true, caption: "b) Biểu đồ hình quạt tròn" },
          ] },
          { kind: "text", value: "Nhận xét: Ngoài giờ học ở trường, nhiều học sinh nhất sử dụng thiết bị số từ 1–2 giờ mỗi ngày, đứng thứ hai là dưới 1 giờ. Có một số ít học sinh sử dụng thiết bị số từ 5 giờ trở lên mỗi ngày." },
        ],
      },
      questions: [
        { question: "Trong tệp TGSDThietbiso.xlsx, cột C (Không sử dụng) có dữ liệu từ hàng 4 đến hàng 13. Công thức tính tổng cột này là:", type: "multiple-choice",
          options: ["=SUM(C3:C13)", "=SUM(C4:C13)", "=C4+C13", "=SUM(A4:A13)"],
          answer: 1, explanation: "=SUM(C4:C13) cộng số HS “Không sử dụng” của 10 lớp: 8+7+6+8+8+7+5+9+6+4 = 68 (như Hình 7.8). Không lấy hàng tiêu đề 3.", level: "van-dung", activity: "luyen-tap-1" },
        { question: "a) Từ biểu đồ cột, nhận xét nào ĐÚNG về tình hình sử dụng thiết bị số của học sinh khối 8? (Chọn tất cả ý đúng)", type: "multiple-select",
          chart: { type: "column", title: "Số học sinh sử dụng thiết bị số", labels: TGL, values: TGV },
          options: ["Nhiều học sinh nhất sử dụng 1-2 giờ mỗi ngày", "Phần lớn học sinh sử dụng từ 5 giờ trở lên", "Đứng thứ hai là dưới 1 giờ", "Có một số ít học sinh sử dụng từ 5 giờ trở lên", "Không có học sinh nào không sử dụng"],
          answer: [0, 2, 3], explanation: "Cột 1-2 giờ (146) cao nhất, tiếp theo Dưới 1 giờ (131); Từ 5 giờ trở lên chỉ có 12 học sinh; có 68 học sinh không sử dụng.", level: "thong-hieu", activity: "luyen-tap-1" },
        { question: "b) Tổng số học sinh khảo sát là 429. Trên biểu đồ hình quạt tròn, phần 1-2 giờ (146 học sinh) chiếm khoảng bao nhiêu phần trăm?", type: "multiple-choice",
          chart: { type: "pie", title: "Số học sinh sử dụng thiết bị số", labels: TGL, values: TGV },
          options: ["17%", "3%", "146%", "34%"],
          answer: 3, explanation: "146 : 429 ≈ 0,34 = 34%. Chọn Percentage để phần mềm tự hiển thị tỉ lệ này.", level: "van-dung", activity: "luyen-tap-1" },
      ],
    },
    {
      id: "luyen-tap-2", name: "Luyện tập 2: Doanh thu công nghiệp phần mềm 💹", type: "knowledge",
      goal: "Đọc, nhận xét biểu đồ; tạo bảng dữ liệu từ biểu đồ; tạo biểu đồ cột từ bảng.",
      time: 600,
      task: "Quan sát Hình 7.9: a) Nhận xét về doanh thu công nghiệp phần mềm giai đoạn 2016 – 2020; b) tạo bảng dữ liệu trong phần mềm bảng tính từ biểu đồ; c) tạo biểu đồ cột từ bảng dữ liệu ở câu b.",
      sgkImage: "assets/sgk/hinh-7-9.jpg",
      chart: C79,
      sheet: SHEET79,
      questions: [
        { question: "a) Từ biểu đồ, em có nhận xét gì về doanh thu công nghiệp phần mềm giai đoạn 2016 – 2020?", type: "multiple-choice",
          options: ["Giảm dần qua các năm", "Tăng liên tục qua các năm, từ 3.038 lên 5.439 triệu USD", "Không thay đổi", "Tăng rồi giảm"],
          answer: 1, explanation: "Các cột cao dần đều từ 2016 đến 2020 → doanh thu tăng liên tục.", level: "thong-hieu", activity: "luyen-tap-2" },
        { type: "sheet", question: "b), c) Em đã nhập bảng dữ liệu như lưới dưới đây. Kéo chọn vùng dữ liệu để tạo biểu đồ cột.", answer: "A1:B6",
          hint: "Chọn cả hàng tiêu đề và 5 năm.",
          explanation: "Vùng A1:B6 gồm cột Năm (nhãn) và cột Doanh thu (giá trị). Mẹo: nếu Excel vẽ thêm một chuỗi cột “Năm”, hãy xoá chữ “Năm” ở ô A1 (để trống) rồi tạo lại biểu đồ — cột Năm sẽ thành nhãn trục ngang.", level: "van-dung", activity: "luyen-tap-2" },
      ],
    },
    {
      id: "doc-nhanh-bieu-do", name: "Trò chơi: Đọc nhanh biểu đồ 🏁", type: "ladder",
      goal: "Đọc giá trị, so sánh, nhận xét xu hướng trên các biểu đồ của bài.",
      time: 420,
      task: "Hai đội thay phiên trả lời: mỗi câu đúng, nhân vật của đội leo lên 1 bậc. Đội nào lên cao hơn sẽ chiến thắng!",
      teams: [{ name: "Đội Hổ", icon: "🐯" }, { name: "Đội Gấu trúc", icon: "🐼" }],
      goalIcon: "🏆",
      questions: [
        { question: "Nội dung Mạng máy tính có bao nhiêu học sinh quan tâm?", type: "multiple-choice", chart: C72,
          options: ["5", "8", "7", "15"], answer: 2, explanation: "Cột Mạng máy tính có nhãn 7.", level: "nhan-biet", activity: "doc-nhanh-bieu-do" },
        { question: "Đồ hoạ máy tính nhiều hơn Ngôn ngữ lập trình bao nhiêu học sinh?", type: "multiple-choice", chart: C72,
          options: ["7", "8", "5", "23"], answer: 0, explanation: "15 − 8 = 7 học sinh.", level: "thong-hieu", activity: "doc-nhanh-bieu-do" },
        { question: "Nội dung nào chiếm 12%?", type: "multiple-choice", chart: C74,
          options: ["Mạng máy tính", "Bảng tính điện tử", "Soạn thảo văn bản", "Phần mềm trình chiếu"], answer: 3, explanation: "Phần màu xanh lá (Phần mềm trình chiếu) chiếm 12%.", level: "nhan-biet", activity: "doc-nhanh-bieu-do" },
        { question: "Ngôn ngữ lập trình và Mạng máy tính chiếm tổng cộng bao nhiêu phần trăm?", type: "multiple-choice", chart: C74,
          options: ["19%", "36%", "17%", "54%"], answer: 1, explanation: "19% + 17% = 36%.", level: "van-dung", activity: "doc-nhanh-bieu-do" },
        { question: "Năm đầu tiên doanh thu vượt 4.500 triệu USD là năm nào?", type: "multiple-choice", chart: C79,
          options: ["2018", "2020", "2019", "2017"], answer: 2, explanation: "2018: 4.447 (chưa vượt); 2019: 4.932 — vượt 4.500.", level: "thong-hieu", activity: "doc-nhanh-bieu-do" },
        { question: "So với năm trước, năm nào doanh thu tăng NHIỀU NHẤT?", type: "multiple-choice", chart: C79,
          options: ["2017", "2018", "2019", "2020"], answer: 0, explanation: "2017 tăng 741; 2018 tăng 668; 2019 tăng 485; 2020 tăng 507 → 2017 tăng nhiều nhất.", level: "van-dung-cao", activity: "doc-nhanh-bieu-do" },
        { question: "Số học sinh dùng thiết bị số 3-4 giờ gần bằng số học sinh ở nhóm nào?", type: "multiple-choice",
          chart: { type: "column", title: "Số học sinh sử dụng thiết bị số", labels: TGL, values: TGV, dataLabels: true },
          options: ["Dưới 1 giờ", "Không sử dụng", "1-2 giờ", "Từ 5 giờ trở lên"], answer: 1, explanation: "3-4 giờ: 72; Không sử dụng: 68 — gần bằng nhau.", level: "thong-hieu", activity: "doc-nhanh-bieu-do" },
        { question: "Biểu đồ Hình 7.3 cho thấy số ứng dụng được tải về từ 2017 đến 2020:", type: "multiple-choice",
          image: "assets/sgk/hinh-7-3.jpg", imageCaption: "Hình 7.3. Biểu đồ đoạn thẳng",
          options: ["Giảm dần", "Không đổi", "Có xu hướng tăng dần", "Tăng rồi giảm mạnh"], answer: 2, explanation: "Đường đi lên từ 2017 đến 2020 → xu hướng tăng dần.", level: "thong-hieu", activity: "doc-nhanh-bieu-do" },
      ],
    },

    /* ===================== HĐ4: VẬN DỤNG (5 phút) ===================== */
    {
      id: "van-dung", name: "Vận dụng: Biểu đồ đoạn thẳng 📈", type: "knowledge",
      goal: "Tạo biểu đồ đoạn thẳng từ bảng doanh thu; nhận xét xu hướng thay đổi của dữ liệu.",
      time: 300,
      task: "Từ bảng doanh thu công nghiệp phần mềm 2016 – 2020 đã tạo ở Câu 2 Luyện tập, em hãy tạo biểu đồ đoạn thẳng, từ đó nhận xét xu hướng thay đổi của dữ liệu. Hoàn thiện ở nhà, gửi sản phẩm qua thư điện tử hoặc Zalo của thầy/cô.",
      sgkImage: "assets/sgk/van-dung.jpg",
      content: {
        revealLabel: "💡 Gợi ý và kết quả mẫu",
        blocks: [
          { kind: "list", value: ["Chọn vùng dữ liệu → thẻ Insert › nhóm Charts › Insert Line or Area Chart › 2-D Line › Line → Chart Elements: Chart Title, Data Labels."] },
          { kind: "chart", value: { type: "line", title: "Doanh thu công nghiệp phần mềm (triệu USD)", labels: NAM, values: DT, dataLabels: true, markers: true, thousands: true } },
          { kind: "text", value: "Nhận xét: doanh thu công nghiệp phần mềm tăng liên tục từ năm 2016 đến năm 2020." },
        ],
      },
      questions: [
        { question: "Lệnh để tạo biểu đồ đoạn thẳng trong nhóm Charts là:", type: "multiple-choice",
          options: ["Insert Pie or Doughnut Chart", "Insert Column or Bar Chart", "Maps", "Insert Line or Area Chart"],
          answer: 3, explanation: "Insert Line or Area Chart › 2-D Line › Line tạo biểu đồ đoạn thẳng.", level: "van-dung", activity: "van-dung" },
      ],
    },

    /* ===================== TỔNG KẾT ===================== */
    {
      id: "tong-ket", name: "Tổng kết", type: "summary",
      task: "Cả lớp nhắc lại kiến thức trọng tâm và làm thử thách cuối. Về nhà: hoàn thiện Vận dụng; đọc trước Bài 8a: Làm việc với danh sách dạng liệt kê và hình ảnh trong văn bản.",
      content: {
        learned: [
          "Biểu đồ minh hoạ dữ liệu trực quan, giúp dễ so sánh, nhận định xu hướng thay đổi của dữ liệu.",
          "Biểu đồ cột: so sánh dữ liệu · Biểu đồ hình quạt tròn: so sánh các phần với tổng thể · Biểu đồ đoạn thẳng: xu hướng tăng giảm theo thời gian.",
          "Tạo biểu đồ: chọn vùng dữ liệu → Insert › Charts → chọn loại, kiểu biểu đồ → Chart Elements bổ sung tiêu đề, nhãn dữ liệu, chú giải.",
          "Chọn loại biểu đồ phù hợp với mục đích; chọn đúng vùng dữ liệu; biểu đồ phải trung thực với số liệu.",
        ],
        challenge: [
          { question: "Lớp trưởng muốn báo cáo mỗi khoản chi (quỹ lớp) chiếm bao nhiêu phần trăm tổng chi của học kì. Nên dùng loại biểu đồ nào?", type: "multiple-choice",
            options: ["Biểu đồ đoạn thẳng", "Biểu đồ hình quạt tròn", "Biểu đồ cột", "Không cần biểu đồ"],
            answer: 1, explanation: "Các phần so với tổng thể (tỉ lệ %) → biểu đồ hình quạt tròn.", level: "van-dung-cao", activity: "tong-ket" },
          { question: "Để theo dõi cân nặng của em qua 12 tháng, loại biểu đồ nào phù hợp nhất?", type: "multiple-choice",
            options: ["Biểu đồ hình quạt tròn", "Biểu đồ cột chồng", "Biểu đồ đoạn thẳng", "Bảng không có tiêu đề"],
            answer: 2, explanation: "Thay đổi theo thời gian → biểu đồ đoạn thẳng thấy rõ xu hướng tăng giảm.", level: "van-dung", activity: "tong-ket" },
        ],
      },
    },
  ],
};

if (typeof module !== "undefined" && module.exports) module.exports = LESSON;
if (typeof window !== "undefined") window.LESSON = LESSON;
