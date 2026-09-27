/* ============================================================================
 * BÀI 17 — TIN HỌC VÀ THẾ GIỚI NGHỀ NGHIỆP  (Tin học 9 — Kết nối tri thức)
 * Chủ đề 6: Hướng nghiệp với tin học.
 * Bám sát SGK trang 87–90 + Kế hoạch bài dạy (3 tiết) của giáo viên.
 * Chỉ sửa file này để đổi nội dung. Engine app.js không cần sửa.
 * Sơ đồ nghề nghiệp tương tác (activity.mindmap) theo Hình 17.1; trắc nghiệm sở thích là HTML tự viết (oninput nội tuyến).
 * ==========================================================================*/

// ---- Kịch ngắn (SGK tr.87) ----
const NV = { Khoa: ["#2563eb", "🧑‍💻"], Minh: ["#16a34a", "🌐"], An: ["#db2777", "🎨"] };
const LOI = [["Khoa", "Tớ sẽ phác thảo một kịch bản để các bạn góp ý và chuyển kịch bản đó thành một phần mềm trò chơi trên máy tính."],
  ["Minh", "Làm thế nào để tạo nhân vật, trang phục, phong cảnh cho trò chơi?"],
  ["An", "Bạn chỉ cần mô tả nhân vật, trang phục, phong cảnh, còn việc tạo ra các hình ảnh đó trên máy tính thì yên tâm, đã có tớ."],
  ["Minh", "Thật là tuyệt. Tớ sẽ đưa trò chơi lên Internet, duy trì sự hoạt động của nó và tập hợp các ý kiến phản hồi để cải tiến."]];
const KICH_HTML = `<div style="display:flex;flex-direction:column;gap:10px;max-width:760px;margin:0 auto">${LOI.map(([ai, t], i) => {
  const [c, ic] = NV[ai], phai = i % 2 === 1;
  return `<div style="display:flex;gap:10px;align-items:flex-start;${phai ? "flex-direction:row-reverse" : ""}">
    <div style="flex:0 0 auto;text-align:center;font-weight:800;color:${c}"><div style="font-size:2rem">${ic}</div>${ai}</div>
    <div style="background:#fff;border:3px solid ${c};border-radius:18px;padding:10px 14px;font-size:1.1rem;max-width:80%">${t}</div></div>`; }).join("")}</div>`;

// ---- Hình 17.1 dạng sơ đồ tư duy tương tác (mô tả công việc lấy từ SGK tr.88–89) ----
const la = (arr) => arr.map((t) => ({ text: t }));
const MM_17_1 = {
  text: "Nghề nghiệp\ntrong Tin học",
  children: [
    { text: "Khoa học máy tính", box: true,
      files: [{ kind: "doc", name: "Đặc điểm hướng Khoa học máy tính", note: "Những nhóm nghề thuộc hướng Khoa học máy tính có đặc điểm chung là nghiên cứu lí thuyết về thông tin và thuật toán, tạo ra những cách mới để biểu diễn, xử lí và trao đổi thông tin trong môi trường số.\nNhững công việc theo hướng này tập trung nhiều hơn ở các doanh nghiệp, công ti hoạt động trong lĩnh vực tin học: phân tích, thiết kế hệ thống thông tin; xây dựng giải pháp kĩ thuật và công nghệ xử lí thông tin; phát triển các ứng dụng trí tuệ nhân tạo; nghiên cứu an ninh mạng và bảo mật thông tin;…" }],
      children: [
        { text: "Nhà chuyên môn phân tích\nvà phát triển phần mềm",
          files: [{ kind: "doc", name: "Công việc đặc thù", note: "Nghiên cứu, phân tích các thành phần của hệ thống thông tin; thiết lập mục tiêu và các đặc điểm kĩ thuật của phần mềm; thiết kế, phát triển, thử nghiệm và bảo trì phần mềm; kiểm tra và tư vấn cải thiện hệ thống thông tin nhằm đáp ứng các yêu cầu cụ thể.\nVí dụ: Khoa tạo ra kịch bản và chuyển kịch bản đó thành phần mềm trò chơi." }],
          children: la(["Nhà lập trình các ứng dụng", "Nhà phát triển web\nvà truyền thông đa phương tiện", "Nhà phân tích và thiết kế hệ thống", "Nhà phát triển phần mềm"]) },
        { text: "Nhà chuyên môn về\ncơ sở dữ liệu và mạng máy tính",
          files: [{ kind: "doc", name: "Công việc đặc thù", note: "Thiết kế, xây dựng, tích hợp và triển khai các hệ thống cơ sở dữ liệu; thiết lập chính sách và triển khai các kế hoạch bảo mật dữ liệu; thiết kế, xây dựng, cấu hình và quản trị mạng máy tính;…\nVí dụ: Minh đưa trò chơi lên Internet, theo dõi và thống kê ý kiến người chơi — có thể trở thành nhà quản trị hệ thống." }],
          children: la(["Nhà thiết kế cơ sở dữ liệu", "Nhà quản trị cơ sở dữ liệu", "Nhà khoa học dữ liệu", "Nhà bảo mật (máy tính)", "Nhà quản trị hệ thống"]) },
      ] },
    { text: "Tin học ứng dụng", box: true,
      files: [{ kind: "doc", name: "Đặc điểm hướng Tin học ứng dụng", note: "Những nhóm nghề thuộc hướng Tin học ứng dụng không đòi hỏi nghiên cứu chuyên sâu về lí thuyết khoa học máy tính mà chủ yếu là sử dụng phương tiện và công cụ công nghệ thông tin để giải quyết các vấn đề thực tế trong các lĩnh vực khác như y tế, giáo dục, thương mại, truyền thông,…\nNhững công việc theo hướng này xuất hiện ở hầu hết các cơ quan, tổ chức, doanh nghiệp." }],
      children: [
        { text: "Nhà thiết kế đồ hoạ\nvà truyền thông đa phương tiện",
          files: [{ kind: "doc", name: "Công việc đặc thù", note: "Thiết kế nội dung để truyền đạt thông tin dưới hình thức hình ảnh, âm thanh, hoạt hình, video và các phương tiện nghe nhìn khác để sử dụng trong các trò chơi máy tính, phim ảnh, video âm nhạc, phương tiện in ấn và quảng cáo,…\nVí dụ: An tạo hình ảnh nhân vật và phong cảnh trò chơi bằng phần mềm đồ hoạ — có thể trở thành nhà thiết kế đồ hoạ." }],
          children: la(["Nhà thiết kế trò chơi máy tính", "Nghệ sĩ kĩ thuật số", "Nhà thiết kế đồ hoạ", "Nhà thiết kế đa phương tiện", "Nhà thiết kế trang web"]) },
      ] },
  ],
};

// ---- Trắc nghiệm sở thích (không chấm, chỉ tham khảo) ----
const ST = [
  ["p", "Em thích nghĩ ra cách giải một bài toán rồi viết thành chương trình"], ["g", "Em thích vẽ, chỉnh sửa ảnh, thiết kế áp phích"],
  ["d", "Em thích sắp xếp, quản lí dữ liệu cho gọn gàng, dễ tìm"], ["p", "Em thích tìm lỗi và sửa để chương trình chạy đúng"],
  ["g", "Em thích làm video, hoạt hình, âm thanh"], ["d", "Em tò mò cách các máy tính kết nối với nhau qua mạng"],
  ["p", "Em thích chia một công việc lớn thành các bước rõ ràng"], ["d", "Em quan tâm đến việc bảo vệ tài khoản, dữ liệu khỏi kẻ xấu"],
  ["g", "Em thích thiết kế giao diện trang web, trò chơi thật đẹp mắt"],
];
const NHOM = { p: ["Phân tích và phát triển phần mềm", "#2563eb"], d: ["Cơ sở dữ liệu và mạng máy tính", "#16a34a"], g: ["Thiết kế đồ hoạ và truyền thông đa phương tiện", "#db2777"] };
const TINH = "var b=this,c={p:0,d:0,g:0},n=0;b.querySelectorAll('input:checked').forEach(function(i){c[i.getAttribute('data-g')]++;n++});"
  + "var N={p:'Phân tích và phát triển phần mềm',d:'Cơ sở dữ liệu và mạng máy tính',g:'Thiết kế đồ hoạ và truyền thông đa phương tiện'};"
  + "['p','d','g'].forEach(function(k){b.querySelector('.st-'+k).style.width=(c[k]/3*100)+'%';b.querySelector('.st-n'+k).textContent=c[k]+'/3'});"
  + "var m=Math.max(c.p,c.d,c.g),top=['p','d','g'].filter(function(k){return m>0&&c[k]===m}).map(function(k){return N[k]});"
  + "b.querySelector('.st-kq').textContent=n?'🌟 Gợi ý: nhóm nghề '+top.join(' / ')+' có vẻ hợp với sở thích của em. Hãy tìm hiểu thêm và cân nhắc cả năng lực, nhu cầu của mình nhé!':'Hãy đánh dấu những việc em thích.';";
const SO_THICH_HTML = `<div class="st-box" onchange="${TINH}" style="max-width:900px;margin:0 auto">
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:8px">${ST.map(([g, t]) =>
    `<label style="display:flex;gap:8px;align-items:flex-start;background:#fff;border:2px solid #fbcfe8;border-radius:12px;padding:8px 10px;cursor:pointer;font-size:1.05rem"><input type="checkbox" data-g="${g}" style="width:22px;height:22px;flex:0 0 auto;margin-top:2px">${t}</label>`).join("")}</div>
  <div style="margin-top:12px;display:flex;flex-direction:column;gap:6px">${Object.entries(NHOM).map(([k, [t, c]]) =>
    `<div style="display:flex;align-items:center;gap:8px"><span style="flex:0 0 330px;max-width:55%;font-weight:700;color:${c}">${t}</span><div style="flex:1;height:18px;background:#f1f5f9;border-radius:9px;overflow:hidden"><div class="st-${k}" style="width:0;height:100%;background:${c};transition:width .3s"></div></div><b class="st-n${k}" style="width:36px">0/3</b></div>`).join("")}</div>
  <div class="st-kq" style="margin-top:10px;font-weight:700;font-size:1.1rem">Hãy đánh dấu những việc em thích.</div>
  <div style="margin-top:4px;color:#64748b;font-style:italic">Trò chơi chỉ để tham khảo, không phải bài kiểm tra định hướng nghề nghiệp.</div>
</div>`;

const LESSON = {
  meta: {
    subject: "Tin học", grade: "9", book: "Kết nối tri thức với cuộc sống",
    title: "Bài 17: Tin học và thế giới nghề nghiệp", unit: "Chủ đề 6 — Hướng nghiệp với tin học",
    pages: "87–90", durationMinutes: 135,
  },
  objectives: {
    knowledge: [
      "Trình bày được công việc đặc thù và sản phẩm chính của người làm tin học trong ít nhất ba nhóm nghề.",
      "Nêu và giải thích được ý kiến cá nhân (thích hay không thích,…) về một nhóm nghề nào đó.",
      "Nhận biết được đặc trưng cơ bản của nhóm nghề thuộc hướng Tin học ứng dụng và nhóm nghề thuộc hướng Khoa học máy tính.",
      "Tìm hiểu được (thông qua Internet và những kênh thông tin khác) công việc ở một số doanh nghiệp, công ti có sử dụng nhân lực thuộc các nhóm ngành đã được giới thiệu.",
      "Giải thích được cả nam và nữ đều có thể thích hợp với các ngành nghề trong lĩnh vực tin học.",
    ],
    competencies: [
      "Tự chủ và tự học; giao tiếp và hợp tác (thảo luận nhóm); giải quyết vấn đề và sáng tạo (tìm hiểu công việc ở doanh nghiệp).",
      "Năng lực số 5.4.TC2a: nhận biết CNTT được ứng dụng trong nhiều nghề; phân biệt nghề thuộc hướng Khoa học máy tính và Tin học ứng dụng.",
      "Năng lực số 2.3.TC2b: sử dụng công cụ số tìm thông tin nghề nghiệp tin học; lựa chọn nguồn đáng tin cậy, tóm tắt và trình bày lại.",
      "Năng lực số 2.6.TC2b: nhận thức ngành tin học phù hợp cho cả nam và nữ; phân tích và bác bỏ định kiến giới.",
      "Năng lực AI 9.A3.3: phân tích được những thay đổi mà AI có thể mang lại cho các ngành nghề trong tương lai.",
    ],
    qualities: ["Chăm chỉ, trung thực, trách nhiệm; tôn trọng bình đẳng giới trong học tập và định hướng nghề nghiệp."],
  },
  coreKnowledge: [
    "Ba nhóm nghề tiêu biểu: nhà chuyên môn phân tích và phát triển phần mềm; nhà chuyên môn về cơ sở dữ liệu và mạng máy tính; nhà thiết kế đồ hoạ và truyền thông đa phương tiện.",
    "Những nhóm nghề thuộc hướng Khoa học máy tính có đặc điểm chung là nghiên cứu lí thuyết về thông tin và thuật toán, tạo ra những cách mới để biểu diễn, xử lí và trao đổi thông tin trong môi trường số.",
    "Những nhóm nghề thuộc hướng Tin học ứng dụng không đòi hỏi nghiên cứu chuyên sâu về lí thuyết khoa học máy tính mà chủ yếu là sử dụng phương tiện và công cụ công nghệ thông tin để giải quyết các vấn đề thực tế trong các lĩnh vực khác.",
    "Không chỉ những doanh nghiệp tin học mà nhiều doanh nghiệp khác cũng cần lao động tin học, theo cả hai hướng Khoa học máy tính và Tin học ứng dụng.",
    "Mọi người, không phân biệt giới tính đều có cơ hội tiếp cận các nghề nghiệp trong lĩnh vực tin học theo sở thích, năng lực và nhu cầu của mình.",
  ],
  keywords: ["Khoa học máy tính", "Tin học ứng dụng", "Nhóm nghề", "Doanh nghiệp", "Bình đẳng giới"],
  settings: { basePoints: 100, useTimer: false, defaultTime: 60, sound: true, streakEnabled: true },

  activities: [
    /* =========================== TIẾT 1 =========================== */
    /* ===================== HĐ1: MỞ ĐẦU (5 phút) ===================== */
    {
      id: "mo-dau", name: "Mở đầu — Kịch ngắn: Dự án trò chơi của An, Minh, Khoa 🎭", type: "knowledge",
      goal: "Tạo hứng thú; nhận ra mỗi vai trò trong dự án gắn với một nghề trong lĩnh vực tin học.",
      time: 300,
      task: "3 bạn đóng vai An, Minh, Khoa đọc đoạn hội thoại (SGK tr.87). Cả lớp nhận xét: mỗi bạn đảm nhận việc gì trong dự án?",
      sgkImage: "assets/sgk/sgk-trang87.jpg",
      html: KICH_HTML,
      questions: [
        { question: "Trong dự án, bạn nào sẽ tạo hình ảnh nhân vật, trang phục, phong cảnh trên máy tính?", type: "multiple-choice",
          options: ["Khoa", "Minh", "An", "Cả ba bạn"],
          answer: 2, explanation: "An: “việc tạo ra các hình ảnh đó trên máy tính thì yên tâm, đã có tớ”.", level: "nhan-biet", activity: "mo-dau" },
        { question: "Bạn nào sẽ đưa trò chơi lên Internet, duy trì hoạt động và tập hợp ý kiến phản hồi?", type: "multiple-choice",
          options: ["Minh", "An", "Khoa", "Không ai"],
          answer: 0, explanation: "Minh đưa trò chơi lên Internet, duy trì sự hoạt động và tập hợp ý kiến phản hồi để cải tiến.", level: "nhan-biet", activity: "mo-dau" },
      ],
    },

    /* ===================== HĐ2.1: NGHỀ NGHIỆP TRONG TIN HỌC (55 phút) ===================== */
    {
      id: "hd1-cong-viec", name: "Hoạt động 1: Công việc đặc thù của người làm tin học 💼", type: "knowledge",
      goal: "Nêu được nghề nghiệp, công việc đặc thù, sản phẩm chính gắn với sở thích của An, Minh, Khoa.",
      time: 900,
      task: "Nhóm thảo luận Hoạt động 1 (SGK tr.87): 1) Ba bạn sau này có thể làm những nghề nghiệp gì trong lĩnh vực tin học? 2) Đặc thù công việc và sản phẩm chính của những nghề nghiệp đó là gì? Ghi vào bảng nhóm.",
      sgkImage: "assets/sgk/hoat-dong-1.jpg",
      content: {
        heading: "💼 Sở thích của mỗi bạn có thể trở thành nghề",
        revealLabel: "📖 Ba nhóm nghề (SGK tr.88)",
        blocks: [{ kind: "list", value: [
          "Khoa có thể làm một nghề thuộc nhóm các nhà chuyên môn về phân tích và phát triển phần mềm: nghiên cứu, phân tích các thành phần của hệ thống thông tin; thiết lập mục tiêu và các đặc điểm kĩ thuật của phần mềm; thiết kế, phát triển, thử nghiệm và bảo trì phần mềm; kiểm tra và tư vấn cải thiện hệ thống thông tin.",
          "An có thể trở thành nhà thiết kế đồ hoạ, một nghề thuộc nhóm các nhà thiết kế đồ hoạ và truyền thông đa phương tiện: thiết kế nội dung để truyền đạt thông tin dưới hình thức hình ảnh, âm thanh, hoạt hình, video… dùng trong trò chơi máy tính, phim ảnh, video âm nhạc, phương tiện in ấn và quảng cáo.",
          "Minh có thể trở thành một nhà quản trị hệ thống, một nghề thuộc nhóm các nhà chuyên môn về cơ sở dữ liệu và mạng máy tính: thiết kế, xây dựng, tích hợp và triển khai các hệ thống cơ sở dữ liệu; thiết lập chính sách và triển khai kế hoạch bảo mật dữ liệu; thiết kế, xây dựng, cấu hình và quản trị mạng máy tính.",
        ] }],
      },
      questions: [
        { question: "Khoa (tạo kịch bản và chuyển thành phần mềm trò chơi) có thể làm nghề thuộc nhóm nào?", type: "multiple-choice",
          options: ["Nhà thiết kế đồ hoạ và truyền thông đa phương tiện", "Nhà chuyên môn về cơ sở dữ liệu và mạng máy tính", "Nhà chuyên môn về phân tích và phát triển phần mềm", "Không thuộc nghề tin học"],
          answer: 2, explanation: "Thiết kế, phát triển phần mềm là công việc của nhóm nhà chuyên môn về phân tích và phát triển phần mềm.", level: "thong-hieu", activity: "hd1-cong-viec" },
        { question: "Sản phẩm chính của nhà thiết kế đồ hoạ và truyền thông đa phương tiện là:", type: "multiple-choice",
          options: ["Nội dung dạng hình ảnh, âm thanh, hoạt hình, video… dùng cho trò chơi, phim ảnh, in ấn, quảng cáo", "Hệ thống cơ sở dữ liệu", "Mạng máy tính", "Hệ điều hành"],
          answer: 0, explanation: "Nhóm nghề này thiết kế nội dung truyền đạt thông tin qua hình ảnh, âm thanh, hoạt hình, video…", level: "nhan-biet", activity: "hd1-cong-viec" },
        { question: "Thiết lập chính sách và triển khai kế hoạch bảo mật dữ liệu là công việc của nhóm nghề nào?", type: "multiple-choice",
          options: ["Nhà thiết kế đồ hoạ", "Nhà thiết kế trò chơi máy tính", "Nghệ sĩ kĩ thuật số", "Nhà chuyên môn về cơ sở dữ liệu và mạng máy tính"],
          answer: 3, explanation: "Nhóm nghề CSDL và mạng: thiết kế, xây dựng, triển khai hệ thống CSDL; bảo mật dữ liệu; quản trị mạng máy tính.", level: "thong-hieu", activity: "hd1-cong-viec" },
      ],
    },
    {
      id: "so-do-nghe", name: "Sơ đồ nghề nghiệp trong tin học (Hình 17.1) 🗺️", type: "knowledge",
      goal: "Biết một số nhóm nghề, nghề nghiệp và định hướng Khoa học máy tính – Tin học ứng dụng.",
      time: 600,
      task: "Nhóm bàn: nêu một số nhóm nghề và nghề nghiệp trong lĩnh vực tin học. Bấm các nút 📎 trên sơ đồ để xem đặc điểm từng hướng và công việc đặc thù của từng nhóm nghề.",
      sgkImage: "assets/sgk/hinh-17-1.jpg",
      mindmap: { title: "Hình 17.1 — Một số nhóm nghề và nghề nghiệp trong lĩnh vực tin học", layout: "both", intro: "Bấm các nút 📎 để xem đặc điểm và công việc đặc thù (theo SGK).", root: MM_17_1 },
      questions: [
        { question: "Nhà thiết kế trò chơi máy tính thuộc nhóm nghề nào và hướng nào (Hình 17.1)?", type: "multiple-choice",
          options: ["Nhóm phân tích và phát triển phần mềm — Khoa học máy tính", "Nhóm thiết kế đồ hoạ và truyền thông đa phương tiện — Tin học ứng dụng", "Nhóm CSDL và mạng máy tính — Khoa học máy tính", "Không thuộc lĩnh vực tin học"],
          answer: 1, explanation: "Theo Hình 17.1, nhà thiết kế trò chơi máy tính thuộc nhóm thiết kế đồ hoạ và truyền thông đa phương tiện, hướng Tin học ứng dụng.", level: "thong-hieu", activity: "so-do-nghe" },
        { question: "Nhóm nghề nào đòi hỏi nghiên cứu khoa học về hệ thống máy tính, thuật toán và cách biểu diễn thuật toán trong máy tính?", type: "multiple-choice",
          options: ["Nhóm nghề thuộc hướng Tin học ứng dụng", "Mọi nghề đều như nhau", "Nhóm nghề thuộc hướng Khoa học máy tính", "Không nhóm nào"],
          answer: 2, explanation: "SGK: công việc đòi hỏi nghiên cứu khoa học về hệ thống máy tính, thuật toán… là những nhóm nghề thuộc hướng Khoa học máy tính.", level: "thong-hieu", activity: "so-do-nghe" },
      ],
      remember: [
        "Những nhóm nghề thuộc hướng Khoa học máy tính có đặc điểm chung là nghiên cứu lí thuyết về thông tin và thuật toán, tạo ra những cách mới để biểu diễn, xử lí và trao đổi thông tin trong môi trường số.",
        "Những nhóm nghề thuộc hướng Tin học ứng dụng không đòi hỏi nghiên cứu chuyên sâu về lí thuyết khoa học máy tính mà chủ yếu là sử dụng phương tiện và công cụ công nghệ thông tin để giải quyết các vấn đề thực tế trong các lĩnh vực khác.",
      ],
    },
    {
      id: "phan-loai-nghe", name: "Trò chơi: Xếp nghề vào đúng nhóm nghề 🧩", type: "dragdrop",
      goal: "Ghi nhớ các nghề trong ba nhóm nghề tiêu biểu (Hình 17.1).",
      time: 300,
      task: "Xếp mỗi nghề vào đúng nhóm nghề theo Hình 17.1. Xếp hết rồi bấm Nộp bài.",
      sgkImage: "assets/sgk/hinh-17-1.jpg",
      groups: ["💻 Phân tích và phát triển phần mềm", "🗄️ Cơ sở dữ liệu và mạng máy tính", "🎨 Thiết kế đồ hoạ và truyền thông đa phương tiện"],
      items: [
        { text: "Nhà lập trình các ứng dụng", group: 0 }, { text: "Nhà phân tích và thiết kế hệ thống", group: 0 }, { text: "Nhà phát triển phần mềm", group: 0 }, { text: "Nhà phát triển web và truyền thông đa phương tiện", group: 0 },
        { text: "Nhà thiết kế cơ sở dữ liệu", group: 1 }, { text: "Nhà quản trị cơ sở dữ liệu", group: 1 }, { text: "Nhà khoa học dữ liệu", group: 1 }, { text: "Nhà bảo mật (máy tính)", group: 1 }, { text: "Nhà quản trị hệ thống", group: 1 },
        { text: "Nhà thiết kế trò chơi máy tính", group: 2 }, { text: "Nghệ sĩ kĩ thuật số", group: 2 }, { text: "Nhà thiết kế đa phương tiện", group: 2 }, { text: "Nhà thiết kế trang web", group: 2 },
      ],
      explanation: "Theo Hình 17.1: hai nhóm đầu thuộc hướng Khoa học máy tính, nhóm thiết kế đồ hoạ và truyền thông đa phương tiện thuộc hướng Tin học ứng dụng.",
    },
    {
      id: "so-thich", name: "Em hợp với nhóm nghề nào? 🌟", type: "knowledge",
      goal: "Nêu và giải thích ý kiến cá nhân về nhóm nghề phù hợp với ý thích, khả năng của mình.",
      time: 600,
      task: "Cá nhân: đánh dấu những việc em thích để tham khảo gợi ý. Sau đó trả lời câu hỏi SGK tr.89: ý thích và khả năng của em phù hợp với nhóm nghề nào? Tại sao?",
      html: SO_THICH_HTML,
    },
    {
      id: "cau-hoi-so-thich", name: "Câu hỏi SGK: Nhóm nghề phù hợp với em ✍️", type: "vandung",
      goal: "Nêu và giải thích được ý kiến cá nhân về một nhóm nghề.",
      time: 240,
      task: "Viết câu trả lời ngắn và gửi cho thầy/cô.",
      intro: "Gửi câu trả lời cho thầy/cô rồi bấm để xem gợi ý.",
      cases: [
        { question: "Sau khi tìm hiểu về nghề nghiệp trong lĩnh vực Tin học, em nhận thấy ý thích và khả năng của mình phù hợp với nhóm nghề nào? Tại sao?",
          answer: "Gợi ý: nêu tên nhóm nghề (VD: thiết kế đồ hoạ và truyền thông đa phương tiện), ý thích (thích vẽ, làm video…), khả năng hiện có (dùng tốt phần mềm đồ hoạ, có óc thẩm mĩ…) và lí do; có thể nêu cả nhóm nghề em không thích và vì sao." },
      ],
    },

    /* =========================== TIẾT 2 =========================== */
    /* ===================== HĐ2.2: TIN HỌC VÀ THẾ GIỚI NGHỀ NGHIỆP (50 phút) ===================== */
    {
      id: "hd2-tim-viec", name: "Hoạt động 2: Tìm việc 🔎", type: "knowledge",
      goal: "Tìm hiểu công việc tin học ở doanh nghiệp tin học và doanh nghiệp thuộc lĩnh vực khác.",
      time: 1200,
      task: "Nhóm dùng máy tìm kiếm, hội thoại thông minh, website của tổ chức, doanh nghiệp… (SGK tr.89): 1) Nêu tên một doanh nghiệp hoạt động trong lĩnh vực tin học và những công việc tin học phù hợp nhất. 2) Nêu tên một doanh nghiệp sử dụng lao động tin học nhưng hoạt động trong lĩnh vực khác và những công việc tin học ở đó. Chọn nguồn tin đáng tin cậy, ghi vào bảng nhóm.",
      sgkImage: "assets/sgk/hoat-dong-2.jpg",
      content: {
        heading: "🔎 Tin học xuất hiện ở nhiều cơ quan, tổ chức, doanh nghiệp",
        revealLabel: "📖 Kết luận (SGK tr.89)",
        blocks: [{ kind: "list", value: [
          "Tin học xuất hiện trong nhiều cơ quan, tổ chức, doanh nghiệp,… bao gồm cả những doanh nghiệp hoạt động trong lĩnh vực tin học và những doanh nghiệp hoạt động trong lĩnh vực khác.",
          "Những công việc theo hướng Khoa học máy tính tập trung nhiều hơn ở các doanh nghiệp, công ti hoạt động trong lĩnh vực tin học: phân tích, thiết kế hệ thống thông tin; xây dựng giải pháp kĩ thuật và công nghệ xử lí thông tin; phát triển các ứng dụng trí tuệ nhân tạo; nghiên cứu an ninh mạng và bảo mật thông tin;…",
          "Những công việc theo hướng Tin học ứng dụng xuất hiện ở hầu hết các cơ quan, tổ chức, doanh nghiệp với mức độ khác nhau, nhưng tập trung cao hơn ở những doanh nghiệp khai thác công nghệ thông tin, tạo ra giá trị mới trong kinh doanh: quản lí thông tin và giao dịch khách hàng; thương mại điện tử; phát thanh, truyền hình, báo điện tử; dịch vụ đa phương tiện phục vụ quảng cáo, giải trí, truyền thông;…",
          "Ví dụ (giáo án): doanh nghiệp tin học như FPT, CMC, Viettel, VNPT,… — hầu hết các nghề tin học đều phù hợp. Ngân hàng, tổ chức giáo dục,… sử dụng lao động tin học: chuyên môn về cơ sở dữ liệu, mạng máy tính, bảo mật dữ liệu,…",
        ] }],
      },
      questions: [
        { question: "Những công việc theo hướng Khoa học máy tính tập trung nhiều hơn ở đâu?", type: "multiple-choice",
          options: ["Các doanh nghiệp, công ti hoạt động trong lĩnh vực tin học", "Chỉ ở trường học", "Chỉ ở bệnh viện", "Không có ở Việt Nam"],
          answer: 0, explanation: "SGK tr.89: tập trung nhiều hơn ở các doanh nghiệp, công ti hoạt động trong lĩnh vực tin học.", level: "nhan-biet", activity: "hd2-tim-viec" },
        { question: "Một ngân hàng tuyển người quản trị cơ sở dữ liệu khách hàng và bảo mật giao dịch. Nhận định nào đúng?", type: "multiple-choice",
          options: ["Ngân hàng không cần lao động tin học", "Chỉ doanh nghiệp tin học mới tuyển nghề tin học", "Doanh nghiệp hoạt động trong lĩnh vực khác cũng cần lao động tin học", "Đây là nghề thiết kế đồ hoạ"],
          answer: 2, explanation: "Không chỉ những doanh nghiệp tin học mà nhiều doanh nghiệp khác cũng cần lao động tin học.", level: "van-dung", activity: "hd2-tim-viec" },
        { question: "Khi tìm hiểu doanh nghiệp trên Internet, nguồn thông tin nào đáng tin cậy nhất?", type: "multiple-choice",
          options: ["Bình luận không rõ tên trên mạng xã hội", "Tin nhắn lan truyền", "Câu trả lời của hội thoại thông minh, không cần kiểm tra lại", "Website chính thức của doanh nghiệp, trang tuyển dụng, báo điện tử chính thống"],
          answer: 3, explanation: "Ưu tiên nguồn chính thức; thông tin từ hội thoại thông minh cần đối chiếu lại với nguồn đáng tin cậy.", level: "thong-hieu", activity: "hd2-tim-viec" },
      ],
    },
    {
      id: "phieu-tim-viec", name: "Phiếu kết quả tìm việc của nhóm 📋", type: "vandung",
      goal: "Tổng hợp và trình bày thông tin nghề nghiệp đã tìm được.",
      time: 300,
      task: "Nhóm gửi kết quả tìm hiểu cho thầy/cô, đại diện nhóm báo cáo trước lớp.",
      intro: "Gửi kết quả của nhóm rồi bấm để xem gợi ý.",
      cases: [
        { question: "1. Tên một doanh nghiệp hoạt động trong lĩnh vực tin học. Những công việc tin học nào phù hợp nhất với doanh nghiệp đó?",
          answer: "Ví dụ: các doanh nghiệp như FPT, CMC, Viettel, VNPT,… kinh doanh đa dạng trong lĩnh vực tin học nên hầu hết các nghề tin học đều phù hợp: phát triển phần mềm, phân tích và thiết kế hệ thống, quản trị mạng, bảo mật, khoa học dữ liệu, phát triển ứng dụng trí tuệ nhân tạo,…" },
        { question: "2. Tên một doanh nghiệp sử dụng lao động tin học nhưng hoạt động trong lĩnh vực khác. Những công việc tin học được sử dụng ở đó là gì?",
          answer: "Ví dụ: ngân hàng, tổ chức giáo dục, bệnh viện,… Công việc tin học trong ngân hàng rất đa dạng: chuyên môn về cơ sở dữ liệu, mạng máy tính, bảo mật dữ liệu; quản lí thông tin và giao dịch khách hàng;…" },
      ],
    },
    {
      id: "hai-huong", name: "Trò chơi: Khoa học máy tính hay Tin học ứng dụng? ⚖️", type: "dragdrop",
      goal: "Phân biệt đặc trưng của hai hướng nghề nghiệp.",
      time: 300,
      task: "Xếp mỗi mô tả công việc vào đúng hướng (theo SGK tr.88–89). Xếp hết rồi bấm Nộp bài.",
      groups: ["🔬 Hướng Khoa học máy tính", "🛠️ Hướng Tin học ứng dụng"],
      items: [
        { text: "Nghiên cứu lí thuyết về thông tin và thuật toán", group: 0 },
        { text: "Tạo ra những cách mới để biểu diễn, xử lí và trao đổi thông tin trong môi trường số", group: 0 },
        { text: "Phát triển các ứng dụng trí tuệ nhân tạo", group: 0 },
        { text: "Nghiên cứu an ninh mạng và bảo mật thông tin", group: 0 },
        { text: "Dùng công cụ công nghệ thông tin giải quyết vấn đề thực tế trong y tế, giáo dục, thương mại", group: 1 },
        { text: "Cung ứng dịch vụ đa phương tiện phục vụ quảng cáo, giải trí, truyền thông", group: 1 },
        { text: "Quản lí thông tin và giao dịch khách hàng; thương mại điện tử", group: 1 },
        { text: "Thiết kế nội dung hình ảnh, âm thanh, video cho trò chơi, phim ảnh, quảng cáo", group: 1 },
      ],
      explanation: "Khoa học máy tính: nghiên cứu lí thuyết, tạo cách mới xử lí thông tin (AI, an ninh mạng…). Tin học ứng dụng: sử dụng công cụ CNTT giải quyết vấn đề thực tế ở các lĩnh vực khác.",
    },

    /* =========================== TIẾT 3 =========================== */
    {
      id: "hd3-nu-gioi", name: "Hoạt động 3: Nữ giới và tin học 👩‍💻", type: "knowledge",
      goal: "Giải thích được cả nam và nữ đều có thể thích hợp với các ngành nghề trong lĩnh vực tin học.",
      time: 600,
      task: "Nhóm đôi: bạn An hỏi “Những nghề liên quan đến tin học có phù hợp với nữ giới không?”. Em hãy giúp An trả lời (SGK tr.89–90), rồi trả lời câu hỏi chọn phát biểu đúng.",
      sgkImage: "assets/sgk/hoat-dong-3.jpg",
      content: {
        heading: "👩‍💻 Những nghề liên quan đến tin học có phù hợp với nữ giới không?",
        revealLabel: "📖 SGK tr.90",
        blocks: [{ kind: "list", value: [
          "Có những định kiến cho rằng nữ giới gặp nhiều khó khăn khi làm việc trong lĩnh vực tin học do bị kì thị giới tính, không nhận được những lợi ích tương xứng với công sức, phải đối mặt với áp lực gia đình và xã hội.",
          "Tuy nhiên, trên thực tế, nữ giới đóng vai trò quan trọng trong phát triển công nghệ nhờ những ưu thế như khả năng ghi nhớ tốt, cẩn thận, chu đáo, giao tiếp tốt và chịu được áp lực lớn. Nữ giới cũng giúp gia tăng tính đa dạng và sáng kiến cho công việc.",
          "Ở Việt Nam, nữ giới làm việc trong lĩnh vực tin học có cơ hội phát triển bản thân nhanh chóng và có mức lương cao, được tôn trọng và khuyến khích phát huy năng lực như nam giới. Công việc tin học phù hợp với nữ giới có thể kể đến: thiết kế đồ hoạ, truyền thông đa phương tiện, quản trị web, kiểm thử phần mềm, phân tích dữ liệu,…",
        ] }],
      },
      questions: [
        { question: "Câu hỏi SGK tr.90 — Em hãy chọn phát biểu đúng:", type: "multiple-choice",
          options: ["Nam giới làm những nghề như lập trình ứng dụng hay phân tích thiết kế hệ thống tốt hơn nữ giới do họ có tư duy lôgic tốt hơn.", "Nữ giới làm những nghề như quản trị hệ thống hay quản trị cơ sở dữ liệu tốt hơn nam giới do họ cẩn thận hơn.", "Lựa chọn nghề nghiệp trong lĩnh vực tin học phù hợp với giới tính sẽ đem lại hiệu quả lao động cao hơn.", "Cả nam và nữ đều có thể chọn nghề trong lĩnh vực tin học phù hợp với năng lực và nhu cầu của mình."],
          answer: 3, explanation: "Đáp án D. Các phương án A, B, C đều là định kiến giới: khả năng làm nghề phụ thuộc năng lực, sở thích, nhu cầu và sự cố gắng của mỗi người.", level: "thong-hieu", activity: "hd3-nu-gioi" },
        { question: "Theo SGK, nữ giới góp phần gì cho công việc trong lĩnh vực tin học?", type: "multiple-choice",
          options: ["Không đóng góp gì", "Gia tăng tính đa dạng và sáng kiến cho công việc", "Chỉ làm việc hành chính", "Làm giảm năng suất"],
          answer: 1, explanation: "SGK: nữ giới cũng giúp gia tăng tính đa dạng và sáng kiến cho công việc.", level: "nhan-biet", activity: "hd3-nu-gioi" },
      ],
      remember: [
        "Không chỉ những doanh nghiệp tin học mà nhiều doanh nghiệp khác cũng cần lao động tin học, theo cả hai hướng Khoa học máy tính và Tin học ứng dụng.",
        "Mọi người, không phân biệt giới tính đều có cơ hội tiếp cận các nghề nghiệp trong lĩnh vực tin học theo sở thích, năng lực và nhu cầu của mình.",
      ],
    },
    {
      id: "dinh-kien", name: "Đúng hay sai? Phá bỏ định kiến giới 🚫", type: "quiz",
      goal: "Nhận ra và bác bỏ định kiến giới trong lựa chọn nghề nghiệp tin học.",
      time: 300,
      task: "Cá nhân: mỗi nhận định là Đúng hay Sai? Suy nghĩ rồi chọn, đọc giải thích sau mỗi câu.",
      questions: [
        { question: "Chỉ nam giới mới có thể trở thành lập trình viên giỏi.", type: "true-false", answer: false,
          explanation: "Sai. Mọi người, không phân biệt giới tính, đều có cơ hội tiếp cận nghề tin học theo sở thích, năng lực và nhu cầu.", level: "thong-hieu", activity: "dinh-kien" },
        { question: "Nữ giới giúp gia tăng tính đa dạng và sáng kiến cho công việc tin học.", type: "true-false", answer: true,
          explanation: "Đúng — theo SGK tr.90.", level: "nhan-biet", activity: "dinh-kien" },
        { question: "Chọn nghề tin học theo giới tính sẽ đem lại hiệu quả lao động cao hơn.", type: "true-false", answer: false,
          explanation: "Sai — hiệu quả phụ thuộc năng lực, sở thích và sự cố gắng, không phụ thuộc giới tính (phương án C của câu hỏi SGK là sai).", level: "thong-hieu", activity: "dinh-kien" },
        { question: "Ở Việt Nam, nữ giới làm tin học được tôn trọng và khuyến khích phát huy năng lực như nam giới.", type: "true-false", answer: true,
          explanation: "Đúng — SGK tr.90.", level: "nhan-biet", activity: "dinh-kien" },
        { question: "Nữ giới không nên làm phân tích dữ liệu vì đó là việc của nam giới.", type: "true-false", answer: false,
          explanation: "Sai — SGK kể phân tích dữ liệu là một trong những công việc tin học phù hợp với nữ giới; và nam giới cũng hoàn toàn có thể làm.", level: "van-dung", activity: "dinh-kien" },
        { question: "Một bạn nam thích thiết kế đồ hoạ vẫn có thể chọn nghề nhà thiết kế đồ hoạ.", type: "true-false", answer: true,
          explanation: "Đúng — lựa chọn nghề dựa trên sở thích, năng lực và nhu cầu của mỗi người.", level: "van-dung", activity: "dinh-kien" },
      ],
    },

    /* ===================== HĐ3: LUYỆN TẬP (15 phút) ===================== */
    {
      id: "ngoi-sao", name: "Luyện tập — Trò chơi “Ngôi sao may mắn” ⭐", type: "giftbox", boxIcon: "⭐",
      goal: "Củng cố kiến thức về nghề nghiệp trong lĩnh vực tin học.",
      time: 600,
      task: "Mỗi đội 6 thành viên; bầu trọng tài và thư kí ghi điểm. Các đội lần lượt chọn ngôi sao và trả lời. Đội trả lời đúng nhiều nhất thắng và được mở hộp quà bí mật!",
      intro: "8 ngôi sao may mắn — chọn sao, trả lời đúng để ghi điểm cho đội ⭐",
      prizes: ["⭐ Ngôi sao may mắn", "👏 Một tràng pháo tay", "🎁 Quà bí mật từ thầy/cô", "🏅 Danh hiệu “Chuyên gia hướng nghiệp”", "🌟 Lời khen trước lớp", "🍀 Ngôi sao may mắn", "🎉 Cộng điểm cho đội", "💡 Danh hiệu “Nhà tư vấn nghề”"],
      questions: [
        { question: "Câu 1. Nghề nghiệp nào đòi hỏi kiến thức vững về phân tích dữ liệu và thống kê?", type: "multiple-choice",
          options: ["Kĩ sư phần mềm", "Nhà quản lí dự án", "Nhân viên kinh doanh", "Nhà khoa học dữ liệu"],
          answer: 3, explanation: "Nhà khoa học dữ liệu phân tích dữ liệu bằng thống kê, học máy…", level: "nhan-biet", activity: "ngoi-sao" },
        { question: "Câu 2. Nghề nghiệp nào liên quan đến thiết kế giao diện và trải nghiệm người dùng?", type: "multiple-choice",
          options: ["Kiến trúc sư", "Nhà thiết kế đồ hoạ", "Chuyên gia SEO", "Lập trình viên"],
          answer: 1, explanation: "Nhà thiết kế đồ hoạ thiết kế nội dung hình ảnh, giao diện trực quan cho người dùng.", level: "nhan-biet", activity: "ngoi-sao" },
        { question: "Câu 3. Trong một dự án phần mềm, vị trí nào cần nhiều nhất kĩ năng làm việc nhóm và giao tiếp để điều phối các thành viên?", type: "multiple-choice",
          options: ["Nhà thiết kế cơ sở dữ liệu", "Nhà bảo mật (máy tính)", "Quản lí dự án", "Nghệ sĩ kĩ thuật số"],
          answer: 2, explanation: "Quản lí dự án điều phối các thành viên, trao đổi với khách hàng — cần kĩ năng làm việc nhóm và giao tiếp tốt.", level: "thong-hieu", activity: "ngoi-sao" },
        { question: "Câu 4. Công việc nào có thể đòi hỏi sử dụng cả kiến thức về AI và kĩ năng giao tiếp tốt?", type: "multiple-choice",
          options: ["Quản lí dự án AI", "Lập trình viên web", "Chuyên viên marketing", "Kĩ sư cơ khí"],
          answer: 0, explanation: "Quản lí dự án AI cần hiểu biết về AI để điều phối và giao tiếp tốt với nhóm, khách hàng.", level: "thong-hieu", activity: "ngoi-sao" },
        { question: "Câu 5. Nghề nghiệp nào đòi hỏi hiểu biết sâu sắc về hệ thống máy tính và có khả năng tư duy logic?", type: "multiple-choice",
          options: ["Kĩ sư phần mềm", "Chuyên gia tài chính", "Quản lí nhân sự", "Nhà quảng cáo"],
          answer: 0, explanation: "Kĩ sư phần mềm thiết kế, phát triển phần mềm — cần hiểu hệ thống máy tính và tư duy logic.", level: "nhan-biet", activity: "ngoi-sao" },
        { question: "Câu 6. Người làm nghề nào cần hiểu biết về xu hướng thị trường và có khả năng sáng tạo trong việc tạo ra nội dung thu hút?", type: "multiple-choice",
          options: ["Lập trình viên", "Nhà quản trị cơ sở dữ liệu", "Nhà bảo mật (máy tính)", "Nhà quảng cáo"],
          answer: 3, explanation: "Nhà quảng cáo cần nắm xu hướng thị trường và sáng tạo nội dung thu hút.", level: "thong-hieu", activity: "ngoi-sao" },
        { question: "Câu 7. Cả nam và nữ giới đều thích hợp với ngành nghề trong lĩnh vực tin học:", type: "multiple-choice",
          options: ["Phụ thuộc vào giới tính nam nhiều hơn nữ", "Không phụ thuộc vào giới tính, phụ thuộc vào năng lực cá nhân của mỗi người", "Tin học phù hợp với nam giới hơn", "Nữ giới làm chủ lập trình tốt hơn nam giới"],
          answer: 1, explanation: "Không phụ thuộc giới tính mà phụ thuộc năng lực, sở thích và nhu cầu của mỗi người.", level: "nhan-biet", activity: "ngoi-sao" },
        { question: "Câu 8. Nhóm nghề các nhà chuyên môn về cơ sở dữ liệu và mạng máy tính có nhiệm vụ gì?", type: "multiple-choice",
          options: ["Thiết kế nội dung hình ảnh, âm thanh, video cho trò chơi, phim ảnh", "Tạo nhân vật, phong cảnh cho trò chơi máy tính", "Soạn kịch bản trò chơi và quảng cáo", "Thiết kế, xây dựng, tích hợp, triển khai hệ thống cơ sở dữ liệu; bảo mật dữ liệu; quản trị mạng máy tính"],
          answer: 3, explanation: "Theo SGK tr.88: thiết kế, xây dựng, tích hợp và triển khai các hệ thống CSDL; thiết lập chính sách, kế hoạch bảo mật dữ liệu; thiết kế, xây dựng, cấu hình và quản trị mạng máy tính.", level: "thong-hieu", activity: "ngoi-sao" },
      ],
    },
    {
      id: "luyen-tap", name: "Luyện tập SGK tr.90 ✍️", type: "vandung",
      goal: "Kể tên công việc tin học trong các lĩnh vực khác; nêu ví dụ nghề tin học lao động nữ có ưu thế.",
      time: 480,
      task: "Nhóm bàn thảo luận, gửi câu trả lời cho thầy/cô; đại diện nhóm trình bày.",
      intro: "Gửi câu trả lời cho thầy/cô rồi bấm để xem gợi ý.",
      cases: [
        { question: "1. Hãy kể tên hai công việc liên quan đến nghề nghiệp tin học trong lĩnh vực khác như y tế, giáo dục, nông nghiệp, xây dựng, giao thông,…",
          answer: "Ví dụ — Y tế: chuyên gia tin sinh học (phân tích dữ liệu sinh học phục vụ chẩn đoán, nghiên cứu), kĩ sư phần mềm y tế (hệ thống quản lí thông tin bệnh nhân, hồ sơ sức khoẻ điện tử). Giáo dục: giáo viên công nghệ thông tin, chuyên gia giáo dục trực tuyến. Nông nghiệp: chuyên gia nông nghiệp thông minh, kĩ sư phần mềm cho hệ thống tưới tiêu tự động. Giao thông: kĩ sư phần mềm giao thông thông minh, chuyên gia phân tích dữ liệu giao thông." },
        { question: "2. Em hãy nêu ví dụ về một nghề tin học mà theo em, lao động nữ có ưu thế. Giải thích cho câu trả lời của mình.",
          answer: "Ví dụ: kiểm thử phần mềm. Công việc đòi hỏi tỉ mỉ, kiên nhẫn tìm lỗi, ghi nhớ nhiều tình huống kiểm thử và trao đổi rõ ràng với nhóm phát triển — nơi lao động nữ có thể phát huy những ưu thế SGK nêu như khả năng ghi nhớ tốt, cẩn thận, chu đáo, giao tiếp tốt, chịu được áp lực. Lưu ý: có ưu thế không có nghĩa là giới này làm tốt hơn giới kia; ai có những phẩm chất đó, dù nam hay nữ, đều có thể làm tốt." },
      ],
    },

    /* ===================== HĐ4: VẬN DỤNG (10 phút) ===================== */
    {
      id: "van-dung", name: "Vận dụng: Nghề tin học em quan tâm 🚀", type: "vandung",
      goal: "Xác định một nghề tin học quan tâm, định hướng của nghề và kiến thức, kĩ năng cần bổ sung.",
      time: 600,
      task: "Nhóm bàn thảo luận (SGK tr.90), gửi câu trả lời cho thầy/cô; đại diện nhóm trình bày.",
      intro: "Gửi câu trả lời cho thầy/cô rồi bấm để xem gợi ý.",
      cases: [
        { question: "1. Hãy kể về một nghề tin học mà em quan tâm. Nghề nghiệp đó theo định hướng Khoa học máy tính hay Tin học ứng dụng?",
          answer: "Ví dụ (giáo án): nghề kĩ sư trí tuệ nhân tạo (AI) — thuộc định hướng Khoa học máy tính. Lí do: đam mê khám phá cách trí tuệ nhân tạo hoạt động và ứng dụng vào đời sống; AI phát triển mạnh, nhiều tiềm năng; muốn góp phần tạo ra những ứng dụng AI hữu ích cho con người." },
        { question: "2. Em cần bổ sung những kiến thức hay kĩ năng nào để có thể trở thành người lao động trong nghề nghiệp mà em quan tâm ở Câu 1?",
          answer: "Ví dụ với kĩ sư AI — Kiến thức: toán học (giải tích, đại số tuyến tính, thống kê, xác suất); tin học (lập trình, cấu trúc dữ liệu và giải thuật, hệ điều hành, mạng máy tính); trí tuệ nhân tạo (học máy, mạng nơ-ron, xử lí ngôn ngữ tự nhiên, thị giác máy tính). Kĩ năng: lập trình thành thạo (Python, Java, C++…), giải quyết vấn đề, tư duy logic, làm việc nhóm, giao tiếp; kĩ năng mềm: tự học, sáng tạo, kiên nhẫn." },
      ],
    },

    /* ===================== TỔNG KẾT ===================== */
    {
      id: "tong-ket", name: "Tổng kết", type: "summary",
      task: "Cả lớp nhắc lại kiến thức trọng tâm và làm thử thách cuối.",
      content: {
        learned: [
          "Ba nhóm nghề: phân tích và phát triển phần mềm; cơ sở dữ liệu và mạng máy tính; thiết kế đồ hoạ và truyền thông đa phương tiện.",
          "Khoa học máy tính: nghiên cứu lí thuyết thông tin, thuật toán, tạo cách mới xử lí thông tin.",
          "Tin học ứng dụng: dùng công cụ CNTT giải quyết vấn đề thực tế ở các lĩnh vực khác.",
          "Nhiều doanh nghiệp ngoài lĩnh vực tin học cũng cần lao động tin học.",
          "Nghề tin học phù hợp với cả nam và nữ, theo sở thích, năng lực và nhu cầu.",
        ],
        challenge: [
          { question: "Bạn Lan thích dùng phần mềm để làm video, hoạt hình quảng cáo cho sản phẩm của trường. Nghề phù hợp và định hướng của nghề là:", type: "multiple-choice",
            options: ["Nhà quản trị hệ thống — Khoa học máy tính", "Nhà thiết kế đa phương tiện — Tin học ứng dụng", "Nhà khoa học dữ liệu — Khoa học máy tính", "Nhà phát triển phần mềm — Tin học ứng dụng"],
            answer: 1, explanation: "Làm video, hoạt hình quảng cáo thuộc nhóm thiết kế đồ hoạ và truyền thông đa phương tiện — hướng Tin học ứng dụng (Hình 17.1).", level: "van-dung", activity: "tong-ket" },
          { question: "Bệnh viện cần người xây dựng và quản trị hệ thống cơ sở dữ liệu hồ sơ bệnh nhân, bảo mật dữ liệu. Nhận định nào đúng?", type: "multiple-choice",
            options: ["Đây là công việc của nhà thiết kế đồ hoạ", "Bệnh viện không cần lao động tin học", "Công việc thuộc nhóm nhà chuyên môn về cơ sở dữ liệu và mạng máy tính; doanh nghiệp ngoài lĩnh vực tin học cũng cần lao động tin học", "Chỉ nam giới làm được công việc này"],
            answer: 2, explanation: "Thiết kế, xây dựng, triển khai hệ thống CSDL và bảo mật dữ liệu là việc của nhóm nghề CSDL và mạng máy tính; ai có năng lực, dù nam hay nữ, đều làm được.", level: "van-dung-cao", activity: "tong-ket" },
        ],
      },
    },
  ],
};

if (typeof module !== "undefined" && module.exports) module.exports = LESSON;
if (typeof window !== "undefined") window.LESSON = LESSON;
