/* ============================================================================
 * BÀI 11a — SỬ DỤNG BẢN MẪU TẠO BÀI TRÌNH CHIẾU  (Tin học 8 — Kết nối tri thức với cuộc sống)
 * Chủ đề 4a: Soạn thảo văn bản và trình chiếu nâng cao.
 * Bám sát SGK trang 51–55 + Kế hoạch bài dạy (2 tiết) của giáo viên.
 * Chỉ sửa file này để đổi nội dung. Engine app.js không cần sửa.
 * GV chọn: sửa đáp án trò chơi “Ai lên cao hơn” theo SGK (Câu 2: phương án D “Template”; Câu 5 → D; Câu 7 → D; Câu 8 → A;
 * Câu 6 sửa chữ “nháy chuột phải” thành “nháy chuột”); Vận dụng gồm cả nhiệm vụ giáo án và SGK; mô phỏng File › New (`tplsim`).
 * Các bản mẫu trong mô phỏng do app tự vẽ để minh hoạ (không phải hình chụp PowerPoint).
 * ==========================================================================*/

// ---------- Biểu tượng tự vẽ cho bản mẫu “An toàn phòng thực hành” (Lab Safety) ----------
const NV = "#2d4a6e", OR = "#e07a2e", YE = "#f3c623", GR = "#7bb341", LB = "#5b9bd5", BR = "#7a5a1e";
const ICONS = {
  flask: ["0 0 40 64", `<circle cx="20" cy="5" r="3" fill="${YE}"/><circle cx="27" cy="12" r="2.2" fill="${YE}"/><circle cx="15" cy="13" r="1.8" fill="${YE}"/><rect x="15" y="18" width="10" height="12" fill="${YE}"/><path d="M15 28 L3 56 Q1 62 8 62 L32 62 Q39 62 37 56 L25 28 Z" fill="${YE}"/>`],
  ruler: ["0 0 14 60", `<rect x="0" y="0" width="14" height="60" rx="2" fill="${GR}"/>` + [6, 12, 18, 24, 30, 36, 42, 48, 54].map((y, i) => `<rect x="${i % 2 ? 8 : 5}" y="${y}" width="${i % 2 ? 6 : 9}" height="1.6" fill="#fff"/>`).join("")],
  pencil: ["0 0 12 60", `<rect x="0" y="0" width="12" height="46" fill="${LB}"/><rect x="0" y="0" width="12" height="6" fill="#9cc3ea"/><polygon points="0,46 12,46 6,60" fill="#bfd8f2"/>`],
  micro: ["0 0 50 70", `<rect x="5" y="61" width="40" height="8" rx="2" fill="${LB}"/><path d="M31 60 Q46 40 30 22" stroke="${LB}" stroke-width="6" fill="none"/><rect x="14" y="2" width="10" height="32" rx="2" fill="${LB}" transform="rotate(-25 19 18)"/><rect x="10" y="44" width="28" height="4" fill="${LB}"/><circle cx="31" cy="54" r="3" fill="${LB}"/>`],
  beaker: ["0 0 44 62", `<circle cx="14" cy="6" r="4" fill="${OR}"/><circle cx="27" cy="9" r="3" fill="${OR}"/><circle cx="20" cy="15" r="2.5" fill="${OR}"/><rect x="0" y="20" width="44" height="4" fill="${OR}"/><path d="M4 22 H40 V57 Q40 61 36 61 H8 Q4 61 4 57 Z" fill="${OR}"/>` + [31, 37, 43, 49].map((y) => `<rect x="22" y="${y}" width="12" height="2.2" fill="#fff"/>`).join("")],
  tubes: ["0 0 60 52", [5, 18, 31, 44].map((x) => `<rect x="${x}" y="2" width="10" height="44" rx="5" fill="none" stroke="${GR}" stroke-width="3"/><rect x="${x + 1.5}" y="24" width="7" height="20" rx="3.5" fill="${GR}"/>`).join("") + `<rect x="0" y="16" width="60" height="4" fill="${GR}"/><rect x="0" y="46" width="60" height="5" fill="${GR}"/>`],
  clip: ["0 0 50 64", `<rect x="3" y="9" width="44" height="52" rx="4" fill="none" stroke="${YE}" stroke-width="5"/><rect x="15" y="2" width="20" height="13" rx="3" fill="${YE}"/><circle cx="25" cy="7.5" r="2.4" fill="${NV}"/>`],
  shirt: ["0 0 60 50", `<path d="M18 4 L6 10 L0 22 L10 26 L12 20 L12 48 L48 48 L48 20 L50 26 L60 22 L54 10 L42 4 Q30 12 18 4 Z" fill="#fff"/>`],
  glasses: ["0 0 60 24", `<circle cx="14" cy="13" r="9" fill="none" stroke="#fff" stroke-width="3"/><circle cx="46" cy="13" r="9" fill="none" stroke="#fff" stroke-width="3"/><path d="M23 12 Q30 7 37 12" stroke="#fff" stroke-width="3" fill="none"/>`],
};
const IC = (k, x, y, w, r) => `<svg viewBox="${ICONS[k][0]}" style="position:absolute;left:${x}%;top:${y}%;width:${w}%;${r ? `transform:rotate(${r}deg);` : ""}">${ICONS[k][1]}</svg>`;
const TXT = (x, y, w, css, html) => `<div style="position:absolute;left:${x}%;top:${y}%;width:${w}%;${css}">${html}</div>`;

// Trang tiêu đề / trang kết (nền xanh navy, nhiều biểu tượng)
const LS_T = (t, s) => `<div style="position:absolute;inset:0;background:${NV}"></div>`
  + IC("micro", 3, 28, 11) + IC("beaker", 5, 64, 11, -12) + IC("tubes", 19, 73, 14) + IC("clip", 34, 66, 10, 12)
  + IC("flask", 77, 3, 10, 22) + IC("ruler", 89, 3, 3) + IC("pencil", 93, 7, 2.6, 25)
  + TXT(16, 30, 68, "text-align:center;color:#fff;font-family:'Times New Roman',serif;font-size:5.2cqw;line-height:1.15", t)
  + (s ? TXT(28, 58, 44, "text-align:center;color:#dbe4f0;font-size:2.2cqw;border-top:1px solid rgba(255,255,255,.55);padding-top:1.2%", s) : "");
// Dải màu và cột xanh bên phải của các trang nội dung
const PANEL = (icon) => `<div style="position:absolute;top:0;bottom:0;left:77%;width:1.2%;background:${OR}"></div><div style="position:absolute;top:0;bottom:0;left:78.2%;width:1.2%;background:${YE}"></div><div style="position:absolute;top:0;bottom:0;left:79.4%;width:1.2%;background:${GR}"></div><div style="position:absolute;top:0;bottom:0;left:80.6%;right:0;background:${NV}"></div>` + icon;
const TITLE = (t) => TXT(5, 6, 70, "color:#3d5a80;font-size:3.3cqw;line-height:1.2", t);
const LS_C = (t, lines, icon) => PANEL(icon) + TITLE(t)
  + `<ul style="position:absolute;left:5%;top:31%;width:68%;margin:0;padding-left:3%;color:#555;font-size:2.1cqw;line-height:1.35">${lines.map((l) => `<li>${l}</li>`).join("")}</ul>`;
const LS_R = (t, sub, items) => PANEL(IC("beaker", 84, 52, 12)) + TITLE(t) + TXT(5, 17, 68, "color:#777;font-size:1.3cqw", sub)
  + items.map((it, i) => `<div style="position:absolute;left:5%;top:${36 + i * 20}%;width:56%;height:12%;border:1px solid ${["#9fb3cc", "#f3c6a3", "#f3e3a3"][i]}"></div>`
    + TXT(7, 29 + i * 20, 42, `height:12%;background:${[NV, OR, BR][i]};color:#fff;font-size:2.4cqw;display:flex;align-items:center;padding-left:2%;border-radius:.6cqw;box-sizing:border-box`, it)).join("");
const LS_W = (t, sub) => PANEL(IC("glasses", 85, 40, 11) + IC("shirt", 83, 58, 14)) + TITLE(t) + TXT(5, 15, 68, "color:#777;font-size:1.3cqw", sub)
  + ["#2d4a6e", "#f28c3a", "#7bb341", "#8ab6e6", "#f7b98a", "#a8d08d"].map((c, i) => `<div style="position:absolute;left:${5 + (i % 3) * 23}%;top:${i < 3 ? 30 : 63}%;width:17%;height:25%;background:${c};border-radius:1.5cqw"></div>`
    + TXT(5 + (i % 3) * 23, i < 3 ? 56 : 89, 17, "text-align:center;color:#555;font-size:1.1cqw", "Nhập nhãn văn bản ở đây")).join("");
const LAB = [
  LS_T("AN TOÀN<br>PHÒNG THỰC HÀNH", "Nhập tên của bạn ở đây"),
  LS_C("An toàn phòng thực hành<br>Bắt đầu trước khi bạn đi đến phòng thực hành!", ["(Sử dụng khoảng trống này để liệt kê hai điều bạn nên làm trước khi đến phòng thực hành.)"], IC("clip", 84, 55, 12)),
  LS_W("Trang phục khi đến phòng thực hành", "(Chèn vào mỗi hộp một hình ảnh trang phục phòng thực hành thích hợp, gắn nhãn bằng hộp văn bản bên dưới.)"),
  LS_R("Thực hành an toàn", "Liệt kê ba nguyên tắc thực hành an toàn trong các hộp được cung cấp.", ["Nguyên tắc thứ nhất", "Nguyên tắc thứ hai", "Nguyên tắc thứ ba"]),
  LS_R("Thực hành an toàn", "Liệt kê ba nguyên tắc thực hành an toàn trong các hộp được cung cấp.", ["Nguyên tắc thứ tư", "Nguyên tắc thứ năm", "Nguyên tắc thứ sáu"]),
  LS_C("Trong trường hợp xảy ra tai nạn trong phòng thực hành…", ["(Sử dụng không gian này để thảo luận về các quy tắc cần tuân theo trong trường hợp xảy ra tai nạn trong phòng thực hành.)"], IC("tubes", 83, 64, 15)),
  LS_C("Những việc cần làm trước khi rời phòng thực hành…", ["(Sử dụng không gian này để thảo luận về những gì nên làm trước khi rời phòng thực hành.)"], IC("micro", 84, 50, 12)),
  LS_T("Hãy nhớ… An toàn là<br>trên hết!", "(Nhập dòng khẩu hiệu của riêng bạn ở trên)"),
];

// Bản mẫu du lịch (theo Hình 11a.2) — khung xanh lá
const FR = `<div style="position:absolute;inset:0;border:1.3cqw solid #8bb73b;box-sizing:border-box;z-index:2;pointer-events:none"></div>`;
const MTN = (x, y, w, h) => `<svg viewBox="0 0 100 60" preserveAspectRatio="none" style="position:absolute;left:${x}%;top:${y}%;width:${w}%;height:${h}%"><rect width="100" height="60" fill="#bfdcef"/><circle cx="78" cy="16" r="7" fill="#fbd46d"/><polygon points="0,60 0,34 18,18 34,36 52,14 72,38 86,26 100,40 100,60" fill="#5d7f3a"/><polygon points="0,60 0,46 22,34 44,50 64,38 100,52 100,60" fill="#3f6128"/><polygon points="40,60 44,36 46,30 48,36 52,60" fill="#8a5a2b"/></svg>`;
const TRAVEL = [
  FR + MTN(0, 0, 100, 62) + `<div style="position:absolute;left:0;right:0;top:62%;bottom:0;background:#8bb73b"></div>` + TXT(0, 67, 100, "text-align:center;color:#fff;font-size:4.6cqw", "Thiết kế một chuyến đi") + TXT(10, 84, 80, "text-align:center;color:#f0f7e4;font-size:1.5cqw", "Hướng dẫn du lịch: Cách tốt hơn để tận hưởng cuộc phiêu lưu khám phá thế giới của bạn"),
  FR + MTN(70, 0, 30, 100) + TXT(6, 12, 60, "color:#8bb73b;font-size:3.6cqw;text-align:center", "Chọn một trải nghiệm")
    + [["#e7d93b", "Du lịch<br>mạo hiểm"], ["#3aa77f", "Du lịch<br>nghỉ dưỡng"], ["#8d8d8d", "Du lịch<br>khám phá"]].map(([c, t], i) => `<div style="position:absolute;left:${12 + i * 18}%;top:40%;width:7%;aspect-ratio:1;border-radius:50%;background:${c}"></div>` + TXT(6 + i * 18, 58, 19, "text-align:center;font-size:1.6cqw;color:#333", t)).join(""),
  FR + TXT(6, 10, 60, "color:#8bb73b;font-size:3.6cqw", "Kinh phí")
    + `<div style="position:absolute;left:36%;top:32%;width:28%;aspect-ratio:1;border-radius:50%;background:conic-gradient(#8bb73b 0 58%,${OR} 58% 81%,#f2a93b 81% 91%,${LB} 91% 100%)"><div style="position:absolute;inset:28%;border-radius:50%;background:#fff"></div></div>`
    + TXT(8, 24, 86, "font-size:1.5cqw;color:#444", `<span style="color:#8bb73b">■</span> Giải trí 58% &nbsp; <span style="color:${OR}">■</span> Du lịch 23% &nbsp; <span style="color:#f2a93b">■</span> Sinh hoạt phí 10% &nbsp; <span style="color:${LB}">■</span> Ăn uống 9%`),
  FR + TXT(6, 12, 90, "color:#8bb73b;font-size:3.6cqw;text-align:center", "Phương tiện di chuyển")
    + [["#f4c7b8", "Ô tô"], ["#d8e6a8", "Máy bay"], ["#cfe3f3", "Tàu hoả"]].map(([c, t], i) => `<div style="position:absolute;left:${12 + i * 28}%;top:38%;width:16%;aspect-ratio:1;border-radius:50%;background:${c}"></div>` + TXT(8 + i * 28, 72, 24, "text-align:center;font-size:2.2cqw;color:#333", t)).join(""),
];
// Bản mẫu album sinh nhật
const BALLOONS = `<svg viewBox="0 0 60 80" style="position:absolute;left:4%;top:8%;width:16%"><path d="M16 40 Q20 60 14 80 M32 36 Q30 58 34 80 M47 42 Q44 62 48 80" stroke="#94a3b8" fill="none"/><ellipse cx="16" cy="24" rx="12" ry="15" fill="#f472b6"/><ellipse cx="32" cy="20" rx="12" ry="15" fill="#facc15"/><ellipse cx="47" cy="27" rx="11" ry="14" fill="#60a5fa"/></svg>`;
const BIRTHDAY = [
  `<div style="position:absolute;inset:0;background:#fde2ec"></div>` + BALLOONS + TXT(22, 32, 72, "text-align:center;color:#db2777;font-family:'Times New Roman',serif;font-style:italic;font-size:7cqw", "Happy Birthday!") + TXT(22, 62, 72, "text-align:center;color:#9d174d;font-size:2.2cqw", "Tặng bà yêu quý"),
  `<div style="position:absolute;inset:0;background:#fde2ec"></div>` + TXT(0, 6, 100, "text-align:center;color:#db2777;font-family:'Times New Roman',serif;font-size:3.6cqw", "Những kỉ niệm đáng nhớ")
    + [0, 1, 2].map((i) => `<div style="position:absolute;left:${8 + i * 29}%;top:26%;width:25%;height:56%;background:#fff;border:.8cqw solid #fff;box-shadow:0 .4cqw 1.2cqw rgba(0,0,0,.2);transform:rotate(${[-4, 2, -2][i]}deg)"><div style="width:100%;height:78%;background:#f3d1dd;display:flex;align-items:center;justify-content:center;font-size:2cqw;color:#9d174d">Ảnh ${i + 1}</div></div>`).join(""),
];
// Bản mẫu Problem/solution cycle
const PSBG = `<div style="position:absolute;inset:0;background:linear-gradient(135deg,#12434c,#0b1f2a)"></div>`;
const PROBLEM = [
  PSBG + TXT(0, 40, 100, "text-align:center;color:#e2e8f0;font-family:'Times New Roman',serif;letter-spacing:.3cqw;font-size:4cqw", "PROBLEM/SOLUTION"),
  PSBG + TXT(6, 8, 88, "color:#e2e8f0;font-family:'Times New Roman',serif;font-size:3.4cqw", "Chu trình giải quyết vấn đề")
    + ["Xác định vấn đề", "Tìm nguyên nhân", "Đề xuất giải pháp", "Đánh giá kết quả"].map((t, i) => TXT(5 + i * 24, 42, 19, "height:26%;display:flex;align-items:center;justify-content:center;text-align:center;border-radius:1cqw;background:rgba(94,234,212,.18);border:1px solid #5eead4;color:#ecfeff;font-size:1.9cqw", t)
      + (i < 3 ? TXT(24.3 + i * 24, 49, 4, "color:#5eead4;font-size:3cqw;text-align:center", "➜") : "")).join(""),
];
// Mẫu định dạng (Theme): chỉ có màu sắc, phông chữ, hiệu ứng — các ô trống “Click to add…”
const PH = (x, y, w, h, t, fs, c) => TXT(x, y, w, `height:${h}%;border:1px dashed ${c};display:flex;align-items:center;padding-left:2%;box-sizing:border-box;font-size:${fs}cqw;color:${c}`, t);
const THEME = (bg, deco, c1, c2) => [
  bg + deco + PH(12, 26, 76, 24, "Click to add title", 4.2, c1) + PH(12, 56, 76, 12, "Click to add subtitle", 2.4, c2),
  bg + deco + PH(10, 8, 80, 16, "Click to add title", 3.4, c1) + PH(10, 30, 80, 58, "• Click to add text", 2.2, c2),
];
const FACET = THEME(`<div style="position:absolute;inset:0;background:#fff"></div>`, `<svg viewBox="0 0 20 100" preserveAspectRatio="none" style="position:absolute;left:0;top:0;width:8%;height:100%"><polygon points="0,0 20,0 6,40 16,100 0,100" fill="#6aa84f"/><polygon points="0,0 12,0 2,50 8,100 0,100" fill="#3d7a32"/></svg>`, "#2e6b30", "#4b5563");
const ION = THEME(`<div style="position:absolute;inset:0;background:#1b6c73"></div>`, `<div style="position:absolute;right:4%;top:0;width:3%;height:30%;background:#f59e0b"></div>`, "#ffffff", "#d1fae5");
const RETRO = THEME(`<div style="position:absolute;inset:0;background:#fdfcf9"></div>`, `<div style="position:absolute;left:0;right:0;bottom:0;height:9%;background:#d9772b"></div><div style="position:absolute;left:0;right:0;bottom:11%;height:.4%;background:#9ca3af"></div>`, "#7c4a1e", "#6b7280");

// Khung 16:9 để hiện trang chiếu tự vẽ trong phần kiến thức / câu hỏi
const BOX = (html, w, cap) => `<figure style="margin:6px auto;max-width:${w || 520}px;flex:1 1 ${Math.min(w || 520, 300)}px"><div style="container-type:inline-size;position:relative;aspect-ratio:16/9;overflow:hidden;border:1px solid #94a3b8;box-shadow:0 3px 12px rgba(0,0,0,.18);font-family:Arial,sans-serif;line-height:1.2;text-align:left;background:#fff"><div style="position:absolute;inset:0">${html}</div></div>${cap ? `<figcaption class="caption">${cap}</figcaption>` : ""}</figure>`;
const ROW = (items) => `<div style="display:flex;flex-wrap:wrap;gap:14px;justify-content:center;align-items:flex-start">${items.join("")}</div>`;
const IMG = (src, cap, w) => `<figure style="margin:0 auto;max-width:${w || 640}px"><img src="${src}" alt="${cap}" style="width:100%;border-radius:8px"><figcaption class="caption">${cap}</figcaption></figure>`;

const LESSON = {
  meta: {
    subject: "Tin học", grade: "8", book: "Kết nối tri thức với cuộc sống",
    title: "Bài 11a: Sử dụng bản mẫu tạo bài trình chiếu", unit: "Chủ đề 4a — Soạn thảo văn bản và trình chiếu nâng cao",
    pages: "51–55", durationMinutes: 90,
  },
  objectives: {
    knowledge: [
      "Sử dụng được các bản mẫu (template).",
      "Đưa được vào trong trang chiếu đường dẫn đến video hay tài liệu khác.",
      "Tạo được các sản phẩm số phục vụ học tập, giao lưu và trao đổi thông tin.",
    ],
    competencies: [
      "Tự chủ và tự học; giao tiếp và hợp tác (thảo luận nhóm, thực hành 2 HS/máy, chấm chéo); giải quyết vấn đề và sáng tạo (chọn, chỉnh sửa bản mẫu phù hợp nội dung).",
      "Năng lực số 3.1.TC2a: tìm, lựa chọn, áp dụng và chỉnh sửa bản mẫu phù hợp với chủ đề.",
      "Năng lực số 3.2.TC2a: chèn liên kết đến video hoặc tài liệu học tập khác, kiểm tra liên kết hoạt động đúng.",
      "Năng lực số 2.4.TC2a: tạo bài trình chiếu hoàn chỉnh (tối thiểu 3 trang), bố cục hợp lí, đáp ứng mục đích thuyết trình.",
      "Năng lực AI 8.C3.2: hiểu AI có thể gợi ý mẫu trình bày phù hợp với mục đích giao tiếp; tự kiểm tra, chọn lọc gợi ý của AI.",
    ],
    qualities: ["Chăm chỉ, trách nhiệm, trung thực; tôn trọng bản quyền hình ảnh, video; có ý thức thẩm mỹ khi trình bày."],
  },
  coreKnowledge: [
    "Mẫu định dạng (Theme) là tập hợp màu sắc, phông chữ và hiệu ứng hình ảnh được xác định trước, giúp bài trình chiếu có giao diện thống nhất, chuyên nghiệp.",
    "Bản mẫu (Template) là bản thiết kế của một hoặc một nhóm trang chiếu, lưu thành tệp có phần mở rộng .potx; chứa bố cục, màu sắc, phông chữ, hiệu ứng, kiểu nền… và cả nội dung.",
    "Bản mẫu giúp bài trình chiếu có giao diện thống nhất, chuyên nghiệp mà không tốn thời gian; gợi ý các nội dung cần có; có thể chỉnh sửa, chia sẻ, tái sử dụng.",
    "Sử dụng bản mẫu: File › New → chọn chủ đề (VD Education) hoặc tìm kiếm → chọn bản mẫu (VD Lab Safety) → nhập, chỉnh sửa nội dung, phông chữ, cỡ chữ, màu nền, thêm/bớt trang.",
    "Đưa đường dẫn đến video/tài liệu vào trang chiếu: chọn hình ảnh minh hoạ → Insert › Links › Link → chọn tệp trong cửa sổ Insert Hyperlink → OK.",
  ],
  keywords: ["Bản mẫu (Template)", "Mẫu định dạng (Theme)", ".potx", "File › New", "Insert › Links › Link"],
  settings: { basePoints: 100, useTimer: false, defaultTime: 60, sound: true, streakEnabled: true },

  activities: [
    /* =========================== TIẾT 1 =========================== */
    /* ===================== HĐ1: KHỞI ĐỘNG (5 phút) ===================== */
    {
      id: "mo-dau", name: "Khởi động — Trang chiếu nào đẹp hơn? ✨", type: "knowledge",
      goal: "So sánh trang chiếu tự làm với trang chiếu mẫu, nhận thấy nhu cầu sử dụng bản mẫu.",
      time: 300,
      task: "Nhóm quan sát hai trang chiếu trong Hình 11a.1, so sánh với trang chiếu số 1 em đã tạo ở phần thực hành Bài 10a và đưa ra nhận xét: Nếu chỉ dùng phần mềm trình chiếu bình thường, em có tạo được ngay trang chiếu đẹp như vậy không?",
      sgkImage: "assets/sgk/mo-dau.jpg",
      html: ROW([IMG("assets/sgk/hinh-11a-1.jpg", "Hình 11a.1. Các mẫu trang chiếu", 640), IMG("assets/sgk/hinh-10a-6.jpg", "Bài 10a — Hình 10a.6. Các trang chiếu kết quả (trang 1 ở góc trên bên trái)", 420)]),
      content: {
        revealLabel: "📌 Giáo viên chốt",
        blocks: [
          { kind: "list", value: [
            "Trang chiếu ở Hình 11a.1 có hình nền, hình trang trí, bố cục, màu sắc, phông chữ phối hợp hài hoà — trông chuyên nghiệp hơn.",
            "Phần mềm trình chiếu có thể tạo được các trang chiếu như vậy, nhưng nếu tự thiết kế từ đầu sẽ mất nhiều thời gian.",
            "👉 Muốn có bài trình chiếu đẹp, chuyên nghiệp mà không tốn thời gian: sử dụng BẢN MẪU!",
          ] },
        ],
      },
      questions: [
        { question: "Hai trang chiếu ở Hình 11a.1 khác trang chiếu số 1 em tự tạo ở Bài 10a ở điểm nào? (Chọn tất cả ý đúng)", type: "multiple-select",
          options: ["Có hình nền, hình ảnh trang trí đẹp mắt", "Bố cục, màu sắc, phông chữ phối hợp hài hoà, chuyên nghiệp", "Nội dung chữ khác hoàn toàn", "Không có tiêu đề"],
          answer: [0, 1], explanation: "Nội dung chữ vẫn là “Chào mừng các bạn đến với CLB Tin học”, nhưng Hình 11a.1 có hình nền, hình trang trí, bố cục và màu sắc hài hoà hơn.", level: "thong-hieu", activity: "mo-dau" },
        { question: "Nếu chỉ dùng phần mềm trình chiếu bình thường, em có tạo được trang chiếu đẹp như Hình 11a.1 không?", type: "multiple-choice",
          options: ["Không thể tạo được bằng phần mềm trình chiếu", "Tạo được ngay trong một phút", "Có thể tạo được, nhưng tự thiết kế từ đầu thường mất nhiều thời gian", "Chỉ tạo được bằng phần mềm vẽ"],
          answer: 2, explanation: "Phần mềm trình chiếu tạo được các trang chiếu như vậy. Tự thiết kế từ đầu thì tốn thời gian — vì thế ta dùng bản mẫu.", level: "thong-hieu", activity: "mo-dau" },
      ],
    },

    /* ===================== HĐ2.1: BẢN MẪU TRONG PHẦN MỀM TRÌNH CHIẾU (10 phút) ===================== */
    {
      id: "hd1-ban-mau", name: "1. Hoạt động 1: Làm thế nào để tạo được bài trình chiếu đẹp, chuyên nghiệp? 🎨", type: "knowledge",
      goal: "Hiểu bản mẫu là gì và lợi ích của bản mẫu.",
      time: 360,
      task: "Nhiệm vụ 1 — Nhóm nghiên cứu SGK, thảo luận và ghi vào phiếu học tập câu trả lời: 1) Sử dụng phần mềm trình chiếu có tạo được các trang chiếu như Hình 11a.1 không? 2) Để tạo được các trang chiếu đó có cần nhiều thời gian không? 3) Làm thế nào để tạo được các trang chiếu đó?",
      sgkImage: "assets/sgk/hoat-dong-1.jpg",
      content: {
        revealLabel: "📖 Bản mẫu trong phần mềm trình chiếu (SGK tr.51–52)",
        blocks: [
          { kind: "text", value: "Ở chương trình Tin học lớp 7, em đã biết cách áp dụng các mẫu định dạng (Themes) cho bài trình chiếu của mình. Mẫu định dạng là một tập hợp màu sắc, phông chữ và hiệu ứng hình ảnh được xác định trước giúp bài trình chiếu có một giao diện thống nhất, chuyên nghiệp." },
          { kind: "text", value: "Nâng cao hơn, phần mềm trình chiếu còn cung cấp các bản mẫu (Template) có sẵn. Bản mẫu là một bản thiết kế của một hoặc một nhóm các trang chiếu được lưu dưới dạng một tệp có phần mở rộng là .potx. Bản mẫu chứa bố cục, màu sắc, phông chữ, hiệu ứng, kiểu nền và cả nội dung. Em có thể sử dụng các bản mẫu có sẵn, có thể tạo các bản mẫu tuỳ chỉnh của riêng mình rồi lưu trữ, tái sử dụng và chia sẻ chúng với những người khác." },
          { kind: "text", value: "Bản mẫu thường được thiết kế để dùng cho một mục đích, một chủ đề cụ thể (ví dụ như bài trình bày về một chuyến du lịch, một dự án kinh doanh, một bài học trên lớp,…). Vì vậy, ngoài các yếu tố thiết kế về giao diện (màu sắc, phông chữ, hình nền, hiệu ứng) thì các nội dung gợi ý đi kèm trong bản mẫu cũng khá có ích cho em khi tạo bài trình chiếu của mình. Hình 11a.2 là ví dụ một bản mẫu về chủ đề du lịch: bản mẫu đã thiết kế sẵn giao diện các trang chiếu và gợi ý các chủ đề nên có trong bài." },
          { kind: "image", value: "assets/sgk/hinh-11a-2.jpg", caption: "Hình 11a.2. Một bản mẫu về chủ đề du lịch" },
        ],
      },
      remember: [
        "Bản mẫu chứa bố cục, màu sắc, phông chữ, hiệu ứng, kiểu nền,… và cả nội dung.",
        "Bản mẫu giúp bài trình chiếu có giao diện thống nhất, chuyên nghiệp mà không tốn thời gian.",
        "Bản mẫu giúp gợi ý các nội dung cần có cho bài trình chiếu.",
        "Có thể chỉnh sửa, chia sẻ, tái sử dụng bản mẫu.",
      ],
      questions: [
        { question: "1) Sử dụng phần mềm trình chiếu có tạo được các trang chiếu như Hình 11a.1 không?", type: "multiple-choice",
          options: ["Có", "Không", "Chỉ tạo được trang chiếu nền trắng", "Chỉ tạo được khi có máy in màu"],
          answer: 0, explanation: "Có. Phần mềm trình chiếu cung cấp sẵn các bản mẫu và mẫu định dạng để tạo các trang chiếu như vậy.", level: "nhan-biet", activity: "hd1-ban-mau" },
        { question: "2) Để tạo được các trang chiếu đó có cần nhiều thời gian không?", type: "multiple-choice",
          options: ["Rất nhiều — phải tự vẽ từng hình", "Không nhiều — dùng bản mẫu có sẵn, em chỉ cần nhập và chỉnh sửa nội dung", "Phải mất vài ngày", "Không làm được nên không tính thời gian"],
          answer: 1, explanation: "Bản mẫu giúp bài trình chiếu có giao diện thống nhất, chuyên nghiệp mà không tốn thời gian.", level: "thong-hieu", activity: "hd1-ban-mau" },
        { question: "3) Làm thế nào để tạo được các trang chiếu đó?", type: "multiple-choice",
          options: ["Chụp ảnh màn hình trang chiếu của người khác", "Chỉ đổi màu chữ", "Tăng cỡ chữ thật to", "Sử dụng bản mẫu (Template) có sẵn trong phần mềm trình chiếu"],
          answer: 3, explanation: "Sử dụng các bản mẫu có sẵn trong phần mềm trình chiếu (hoặc bản mẫu được chia sẻ), rồi chỉnh sửa cho phù hợp.", level: "nhan-biet", activity: "hd1-ban-mau" },
        { question: "Tệp bản mẫu (Template) có phần mở rộng là gì?", type: "multiple-choice",
          options: [".docx", ".potx", ".mp4", ".xlsx"],
          answer: 1, explanation: "Bản mẫu được lưu dưới dạng một tệp có phần mở rộng là .potx.", level: "nhan-biet", activity: "hd1-ban-mau" },
        { question: "Bản mẫu chứa những gì? (Chọn tất cả ý đúng)", type: "multiple-select",
          options: ["Bố cục, kiểu nền", "Màu sắc, phông chữ, hiệu ứng", "Nội dung gợi ý cho bài trình chiếu", "Tên tác giả được điền sẵn, không sửa được"],
          answer: [0, 1, 2], explanation: "Bản mẫu chứa bố cục, màu sắc, phông chữ, hiệu ứng, kiểu nền… và cả nội dung. Mọi thứ trong bản mẫu đều chỉnh sửa được.", level: "thong-hieu", activity: "hd1-ban-mau" },
      ],
    },
    {
      id: "ban-mau-va-mau-dinh-dang", name: "Nhiệm vụ 2: Bản mẫu khác mẫu định dạng thế nào? 🤔", type: "knowledge",
      goal: "Phân biệt bản mẫu (Template) và mẫu định dạng (Theme).",
      time: 240,
      task: "Nhóm trả lời câu hỏi SGK tr.52: Em hãy cho biết bản mẫu khác với mẫu định dạng thế nào? So sánh hai trang chiếu bên dưới: trang nào dùng mẫu định dạng, trang nào dùng bản mẫu?",
      sgkImage: "assets/sgk/cau-hoi-tr52.jpg",
      html: ROW([BOX(FACET[1], 420, "Trang chiếu A"), BOX(LAB[3], 420, "Trang chiếu B")]),
      content: {
        revealLabel: "⚖️ So sánh bản mẫu và mẫu định dạng",
        blocks: [
          { kind: "html", value: `<table style="width:100%;border-collapse:collapse;font-size:1rem;background:#fff"><thead><tr style="background:${NV};color:#fff"><th style="padding:8px;border:1px solid #cbd5e1"></th><th style="padding:8px;border:1px solid #cbd5e1">🎨 Mẫu định dạng (Theme)</th><th style="padding:8px;border:1px solid #cbd5e1">📦 Bản mẫu (Template)</th></tr></thead><tbody>
<tr><td style="padding:8px;border:1px solid #cbd5e1;font-weight:700">Gồm</td><td style="padding:8px;border:1px solid #cbd5e1">Tập hợp màu sắc, phông chữ, hiệu ứng hình ảnh</td><td style="padding:8px;border:1px solid #cbd5e1">Bố cục, màu sắc, phông chữ, hiệu ứng, kiểu nền,… <b>và cả nội dung</b></td></tr>
<tr><td style="padding:8px;border:1px solid #cbd5e1;font-weight:700">Nội dung gợi ý</td><td style="padding:8px;border:1px solid #cbd5e1">Không có — các ô trống “Click to add…”</td><td style="padding:8px;border:1px solid #cbd5e1">Có — gợi ý các nội dung cần có cho bài</td></tr>
<tr><td style="padding:8px;border:1px solid #cbd5e1;font-weight:700">Mục đích</td><td style="padding:8px;border:1px solid #cbd5e1">Giao diện thống nhất, chuyên nghiệp</td><td style="padding:8px;border:1px solid #cbd5e1">Thiết kế cho một mục đích, chủ đề cụ thể (du lịch, bài học,…)</td></tr>
<tr><td style="padding:8px;border:1px solid #cbd5e1;font-weight:700">Tệp, cách dùng</td><td style="padding:8px;border:1px solid #cbd5e1">Áp dụng cho bài đang làm: Design › Themes (Tin học 7)</td><td style="padding:8px;border:1px solid #cbd5e1">Tệp .potx; tạo bài mới: File › New; chỉnh sửa, chia sẻ, tái sử dụng</td></tr></tbody></table>` },
        ],
      },
      remember: ["Mẫu định dạng chỉ gồm màu sắc, phông chữ, hiệu ứng hình ảnh.", "Bản mẫu có thêm bố cục, kiểu nền và cả nội dung gợi ý; lưu thành tệp .potx."],
      questions: [
        { question: "Bản mẫu khác với mẫu định dạng thế nào?", type: "multiple-choice",
          options: ["Mẫu định dạng chỉ gồm màu sắc, phông chữ, hiệu ứng; bản mẫu có thêm bố cục, kiểu nền và cả nội dung gợi ý", "Không khác nhau, chỉ khác tên gọi", "Mẫu định dạng có nội dung gợi ý, bản mẫu thì không", "Bản mẫu chỉ có màu nền, mẫu định dạng có cả nội dung"],
          answer: 0, explanation: "Mẫu định dạng là tập hợp màu sắc, phông chữ, hiệu ứng hình ảnh; bản mẫu là bản thiết kế các trang chiếu (tệp .potx) chứa cả bố cục, kiểu nền và nội dung.", level: "thong-hieu", activity: "ban-mau-va-mau-dinh-dang" },
        { question: "Trong hai trang chiếu A và B ở trên, trang nào được tạo từ bản mẫu?", type: "multiple-choice",
          options: ["Trang A — vì có ô “Click to add title”", "Trang B — vì đã có sẵn bố cục và nội dung gợi ý “Nguyên tắc thứ nhất…”", "Cả hai trang", "Không trang nào"],
          answer: 1, explanation: "Trang B có sẵn nội dung gợi ý (các nguyên tắc) — đó là đặc điểm của bản mẫu. Trang A chỉ có màu sắc, các ô vẫn trống.", level: "van-dung", activity: "ban-mau-va-mau-dinh-dang" },
      ],
    },
    {
      id: "phan-loai-ban-mau", name: "Trò chơi: Bản mẫu hay mẫu định dạng? 🧺", type: "dragdrop",
      goal: "Củng cố sự khác nhau giữa bản mẫu và mẫu định dạng.",
      time: 180,
      task: "Xếp mỗi đặc điểm vào đúng cột: Bản mẫu (Template) hay Mẫu định dạng (Theme)? Bấm Nộp bài khi xong.",
      layout: "cols",
      groups: ["📦 Bản mẫu (Template)", "🎨 Mẫu định dạng (Theme)"],
      items: [
        { text: "Lưu thành tệp có phần mở rộng .potx", group: 0 },
        { text: "Có sẵn nội dung gợi ý cho bài trình chiếu", group: 0 },
        { text: "Thiết kế cho một chủ đề cụ thể (du lịch, an toàn phòng thực hành…)", group: 0 },
        { text: "Gồm bố cục, kiểu nền và nhiều trang chiếu mẫu", group: 0 },
        { text: "Chỉ là tập hợp màu sắc, phông chữ, hiệu ứng hình ảnh", group: 1 },
        { text: "Các ô vẫn trống “Click to add title”", group: 1 },
        { text: "Đã học cách áp dụng ở Tin học lớp 7", group: 1 },
        { text: "Áp dụng cho bài đang làm bằng Design › Themes", group: 1 },
      ],
      explanation: "Bản mẫu (.potx) có cả bố cục, kiểu nền và nội dung gợi ý cho một chủ đề; mẫu định dạng chỉ gồm màu sắc, phông chữ, hiệu ứng hình ảnh.",
    },
    {
      id: "chon-ban-mau-hop-chu-de", name: "Chọn bản mẫu hợp chủ đề 🎯", type: "quiz",
      goal: "Chọn được bản mẫu phù hợp với mục đích, chủ đề bài trình chiếu.",
      time: 240,
      task: "Quan sát 4 bản mẫu bên dưới. Với mỗi tình huống, chọn bản mẫu phù hợp nhất.",
      html: ROW([BOX(LAB[0], 250, "Lab Safety"), BOX(TRAVEL[0], 250, "Thiết kế một chuyến đi"), BOX(BIRTHDAY[0], 250, "Happy Birthday"), BOX(PROBLEM[0], 250, "Problem/solution cycle")]),
      questions: [
        { question: "Lớp 8A cần trình chiếu nội quy an toàn trước buổi thực hành Khoa học tự nhiên.", type: "multiple-choice",
          options: ["Happy Birthday", "Thiết kế một chuyến đi", "Lab Safety", "Problem/solution cycle"],
          answer: 2, explanation: "Lab Safety (An toàn phòng thực hành) đã gợi ý sẵn: trang phục, nguyên tắc an toàn, xử lí tai nạn, việc cần làm trước khi rời phòng.", level: "van-dung", activity: "chon-ban-mau-hop-chu-de" },
        { question: "Tổ 2 giới thiệu kế hoạch chuyến dã ngoại cuối năm: điểm đến, phương tiện di chuyển, kinh phí.", type: "multiple-choice",
          options: ["Thiết kế một chuyến đi", "Lab Safety", "Happy Birthday", "Problem/solution cycle"],
          answer: 0, explanation: "Bản mẫu du lịch có sẵn các trang: chọn trải nghiệm, kinh phí, phương tiện di chuyển (Hình 11a.2).", level: "van-dung", activity: "chon-ban-mau-hop-chu-de" },
        { question: "Bạn Minh làm album ảnh tặng bà nhân ngày sinh nhật.", type: "multiple-choice",
          options: ["Problem/solution cycle", "Happy Birthday", "Lab Safety", "Thiết kế một chuyến đi"],
          answer: 1, explanation: "Bản mẫu Happy Birthday có sẵn khung ảnh, màu sắc vui tươi phù hợp.", level: "van-dung", activity: "chon-ban-mau-hop-chu-de" },
        { question: "Nhóm em trình bày một vấn đề của lớp (xả rác sau giờ ra chơi) và đề xuất cách giải quyết.", type: "multiple-choice",
          options: ["Happy Birthday", "Thiết kế một chuyến đi", "Lab Safety", "Problem/solution cycle"],
          answer: 3, explanation: "Problem/solution cycle gợi ý trình tự: xác định vấn đề → nguyên nhân → giải pháp → đánh giá.", level: "van-dung", activity: "chon-ban-mau-hop-chu-de" },
        { question: "Em không tìm thấy bản mẫu nào đúng chủ đề “Giới thiệu CLB Tin học”. Em nên làm gì?", type: "multiple-choice",
          options: ["Chọn bản mẫu gần với mục đích nhất rồi chỉnh sửa nội dung, màu sắc, phông chữ, thêm/bớt trang cho phù hợp", "Bỏ không làm bài trình chiếu", "Dùng nguyên bản mẫu, không sửa gì", "Chỉ dùng trang trắng, không cần thiết kế"],
          answer: 0, explanation: "Bản mẫu chỉnh sửa được. Em có thể sửa cho phù hợp rồi lưu thành bản mẫu của riêng mình (.potx) để tái sử dụng, chia sẻ.", level: "van-dung-cao", activity: "chon-ban-mau-hop-chu-de" },
      ],
    },

    /* ===================== HĐ2.2: THỰC HÀNH (65 phút) ===================== */
    {
      id: "thuc-hanh", name: "2. Thực hành: An toàn trong phòng thực hành — a, b 🧪", type: "knowledge",
      goal: "Sử dụng một bản mẫu có sẵn và chỉnh sửa bản mẫu cho phù hợp với nội dung.",
      time: 1500,
      task: "Nhiệm vụ (2 HS/máy): Tạo một bài trình chiếu về chủ đề An toàn trong phòng thực hành (phòng thực hành Tin học, thực hành Khoa học tự nhiên,…): a) Sử dụng một bản mẫu có sẵn cho bài trình chiếu. b) Chỉnh sửa một vài thông số của bản mẫu để phù hợp hơn với nội dung. c) Đưa vào trang tiêu đề đường dẫn đến một video (hay tài liệu khác).",
      sgkImage: "assets/sgk/nhiem-vu.jpg",
      html: IMG("assets/sgk/hinh-11a-3.jpg", "Hình 11a.3. Các bước sử dụng một bản mẫu", 700),
      content: {
        revealLabel: "🔢 Hướng dẫn a, b (SGK tr.53–54)",
        blocks: [
          { kind: "list", value: [
            "a) Sử dụng một bản mẫu có sẵn: chọn File/New để tạo một bài trình chiếu mới. Phần mềm sẽ đưa ra các bản mẫu có sẵn sắp xếp theo các chủ đề để em lựa chọn. Em chọn Education và chọn bản mẫu có tên Lab Safety (Hình 11a.3).",
            "Nội dung trong bản mẫu viết bằng tiếng Anh. Em có thể sử dụng các công cụ dịch từ tiếng Anh sang tiếng Việt để hỗ trợ trong việc hiểu nội dung.",
            "Bản mẫu Lab Safety có nội dung tương tự như Hình 11a.4. Bản mẫu đưa ra các gợi ý rõ ràng về các nội dung cần có, hướng dẫn chi tiết cách nhập nội dung, cách trình bày và sắp xếp. Em nhập nội dung theo hướng dẫn để hoàn thành bài trình chiếu.",
          ] },
          { kind: "image", value: "assets/sgk/hinh-11a-4.jpg", caption: "Hình 11a.4. Bản mẫu An toàn phòng thực hành" },
          { kind: "list", value: [
            "b) Chỉnh sửa bản mẫu để phù hợp với nội dung: em có thể thay đổi phông chữ, cỡ chữ, màu nền, thêm hoặc bớt trang chiếu để phù hợp với nội dung trình chiếu. Kết quả có thể tương tự như Hình 11a.5.",
          ] },
          { kind: "image", value: "assets/sgk/hinh-11a-5.jpg", caption: "Hình 11a.5. Bài trình chiếu kết quả" },
        ],
      },
      questions: [
        { question: "Để tạo bài trình chiếu mới từ một bản mẫu có sẵn, em chọn:", type: "multiple-choice",
          options: ["Design › Themes", "Insert › Text", "File › New", "Home › New Slide"],
          answer: 2, explanation: "Chọn File/New, phần mềm đưa ra các bản mẫu có sẵn sắp xếp theo chủ đề.", level: "nhan-biet", activity: "thuc-hanh" },
        { question: "Bản mẫu Lab Safety nằm trong chủ đề nào của Suggested searches?", type: "multiple-choice",
          options: ["Charts", "Themes", "Diagrams", "Education"],
          answer: 3, explanation: "Hình 11a.3: Chọn New → chọn Education → chọn Lab Safety.", level: "nhan-biet", activity: "thuc-hanh" },
        { question: "Nội dung bản mẫu Lab Safety viết bằng tiếng Anh. Em nên làm gì?", type: "multiple-choice",
          options: ["Dùng công cụ dịch để hiểu nội dung gợi ý, rồi nhập nội dung tiếng Việt của em", "Bỏ bản mẫu này vì không đọc được", "Giữ nguyên tiếng Anh khi trình chiếu", "Xoá hết các trang chiếu gợi ý"],
          answer: 0, explanation: "SGK: có thể dùng các công cụ dịch từ tiếng Anh sang tiếng Việt để hiểu nội dung, rồi nhập nội dung theo hướng dẫn.", level: "thong-hieu", activity: "thuc-hanh" },
        { question: "Chỉnh sửa bản mẫu cho phù hợp với nội dung, em KHÔNG cần làm việc nào?", type: "multiple-choice",
          options: ["Thay đổi phông chữ, cỡ chữ", "Thay đổi màu nền", "Thêm hoặc bớt trang chiếu", "Giữ nguyên mọi chữ tiếng Anh gợi ý trong bản mẫu"],
          answer: 3, explanation: "Nội dung gợi ý chỉ để hướng dẫn; em thay bằng nội dung của mình. Có thể đổi phông chữ, cỡ chữ, màu nền, thêm/bớt trang.", level: "thong-hieu", activity: "thuc-hanh" },
      ],
    },
    {
      id: "mo-phong-file-new", name: "Mô phỏng: Chọn bản mẫu với File › New 🖱️", type: "knowledge",
      goal: "Thao tác chọn bản mẫu Lab Safety như Hình 11a.3; phân biệt bản mẫu với mẫu định dạng, bài trống.",
      time: 420,
      task: "Làm như Hình 11a.3 trên mô phỏng: bấm New → chọn Education → bấm bản mẫu Lab Safety → Create. Thử thêm: tạo từ một mẫu định dạng (Themes) hoặc gõ “birthday” vào ô tìm kiếm để thấy sự khác nhau.",
      sgkImage: "assets/sgk/hinh-11a-3.jpg",
      tplsim: {
        title: "File › New: tạo bài trình chiếu “An toàn phòng thực hành” từ bản mẫu",
        want: "lab",
        success: "Tuyệt vời! Em đã tạo bài trình chiếu từ bản mẫu Lab Safety: 8 trang chiếu đã có sẵn bố cục, màu sắc và nội dung gợi ý như Hình 11a.4. Bấm từng trang ở cột bên trái để xem.",
        templates: [
          { id: "blank", name: "Blank Presentation", cat: "", kind: "blank", home: true, keys: "trong blank" },
          { id: "facet", name: "Facet", cat: "Themes", kind: "theme", home: true, slides: FACET, keys: "theme mau dinh dang" },
          { id: "ion", name: "Ion", cat: "Themes", kind: "theme", home: true, slides: ION, keys: "theme mau dinh dang" },
          { id: "retro", name: "Retrospect", cat: "Themes", kind: "theme", slides: RETRO, keys: "theme mau dinh dang" },
          { id: "ps", name: "Problem/solution cycle", cat: "Education", slides: PROBLEM, keys: "problem solution van de giai phap", desc: "Bản mẫu trình bày một vấn đề và các bước giải quyết." },
          { id: "lab", name: "Lab safety", cat: "Education", slides: LAB, keys: "lab safety an toan phong thuc hanh thi nghiem khoa hoc", desc: "Bản mẫu gợi ý nội dung bài trình chiếu về an toàn phòng thực hành: trang phục, nguyên tắc thực hành an toàn, xử lí khi xảy ra tai nạn, việc cần làm trước khi rời phòng." },
          { id: "travel", name: "Thiết kế một chuyến đi", cat: "Presentations", slides: TRAVEL, keys: "travel du lich chuyen di tham quan", desc: "Bản mẫu về chủ đề du lịch (Hình 11a.2)." },
          { id: "birthday", name: "Happy Birthday photo album", cat: "Presentations", slides: BIRTHDAY, keys: "happy birthday sinh nhat album anh photo", desc: "Bản mẫu album ảnh sinh nhật." },
        ],
      },
      questions: [
        { question: "Tạo bài từ mẫu định dạng Facet thì các trang chiếu có gì?", type: "multiple-choice",
          options: ["Chỉ có màu sắc, phông chữ, hiệu ứng — các ô “Click to add…” vẫn trống", "Đủ 8 trang có nội dung gợi ý về an toàn", "Có sẵn video", "Không có gì, kể cả màu sắc"],
          answer: 0, explanation: "Mẫu định dạng chỉ là tập hợp màu sắc, phông chữ, hiệu ứng hình ảnh; không kèm nội dung gợi ý như bản mẫu.", level: "thong-hieu", activity: "mo-phong-file-new" },
        { question: "Muốn tìm bản mẫu album ảnh sinh nhật, trong màn hình New em làm thế nào?", type: "multiple-choice",
          options: ["Chọn Design › Variants", "Chọn Insert › Text", "Gõ từ khoá “Happy Birthday” vào ô Search for online templates and themes", "Chọn Home › Font"],
          answer: 2, explanation: "Ô tìm kiếm trong File › New giúp tìm bản mẫu theo từ khoá.", level: "van-dung", activity: "mo-phong-file-new" },
      ],
    },

    /* =========================== TIẾT 2 =========================== */
    {
      id: "lien-ket-video", name: "Thực hành c, d: Đường dẫn đến video & lưu tệp 🔗", type: "knowledge",
      goal: "Đưa vào trang tiêu đề đường dẫn đến tệp video (hoặc tài liệu khác); lưu tệp.",
      time: 900,
      task: "Tiếp tục bài An toàn phòng thực hành: c) Chọn hình chiếc bình màu vàng ở trang tiêu đề, chèn liên kết đến tệp video NhungSuCoPhongThucHanh.mp4 (Hình 11a.6); trình chiếu thử để kiểm tra. d) Lưu tệp AnToanPhongThucHanh.pptx. Làm thêm (Luyện tập 2 SGK): thêm đường dẫn đến tệp văn bản lưu các kí hiệu cảnh báo trong phòng thực hành.",
      sgkImage: "assets/sgk/huong-dan-c.jpg",
      html: IMG("assets/sgk/hinh-11a-6.jpg", "Hình 11a.6. Chèn đường dẫn đến tệp video", 620),
      content: {
        revealLabel: "🔢 Hướng dẫn c, d (SGK tr.55)",
        blocks: [
          { kind: "list", value: [
            "c) Giả sử em muốn giới thiệu một video (có tên NhungSuCoPhongThucHanh.mp4) có nội dung cảnh báo về các tai nạn có thể xảy ra trong phòng thực hành. Em có thể đưa đường dẫn đến tệp video đó vào trang tiêu đề để mở trong khi trình chiếu:",
            "Chèn vào trang chiếu một hình ảnh minh hoạ để đặt liên kết (hoặc chọn luôn hình ảnh chiếc bình màu vàng có sẵn trên trang chiếu).",
            "Nháy chuột chọn hình ảnh minh hoạ, chọn Insert/Links/Link. Trong cửa sổ Insert Hyperlink, chọn đường dẫn đến tệp NhungSuCoPhongThucHanh.mp4 (Hình 11a.6).",
            "d) Lưu tệp: chọn File/Save để lưu tệp với tên AnToanPhongThucHanh.pptx.",
          ] },
          { kind: "image", value: "assets/sgk/luyen-tap.jpg", caption: "Luyện tập (SGK tr.55) — câu 2: thêm đường dẫn đến tệp văn bản" },
        ],
      },
      questions: [
        { question: "Sau khi chọn hình ảnh minh hoạ, để chèn đường dẫn đến tệp video em chọn lệnh:", type: "multiple-choice",
          options: ["Insert › Links › Link", "Design › Themes", "File › New", "Home › Paste"],
          answer: 0, explanation: "Nháy chuột chọn hình ảnh minh hoạ, chọn Insert/Links/Link để mở cửa sổ Insert Hyperlink.", level: "nhan-biet", activity: "lien-ket-video" },
        { question: "Trong cửa sổ Insert Hyperlink (Hình 11a.6), để liên kết đến tệp video trên máy tính, ở mục Link to em chọn:", type: "multiple-choice",
          options: ["Place in This Document", "Create New Document", "E-mail Address", "Existing File or Web Page"],
          answer: 3, explanation: "Hình 11a.6: Link to › Existing File or Web Page, tìm thư mục AnToan, chọn tệp NhungSuCoPhongThucHanh rồi bấm OK.", level: "thong-hieu", activity: "lien-ket-video" },
        { question: "Luyện tập 2: Thêm vào trang tiêu đề đường dẫn đến tệp văn bản lưu các kí hiệu cảnh báo. Cách làm nào đúng?", type: "multiple-choice",
          options: ["Chép toàn bộ nội dung tệp văn bản vào trang tiêu đề", "Chọn hình ảnh (hoặc chữ) trên trang tiêu đề → Insert › Links › Link → Existing File or Web Page → chọn tệp văn bản → OK", "Chọn Design › Themes rồi chọn tệp văn bản", "Đổi tên tệp văn bản thành .pptx"],
          answer: 1, explanation: "Làm tương tự như với tệp video: chọn đối tượng đặt liên kết, Insert/Links/Link, chọn đường dẫn đến tệp văn bản.", level: "van-dung", activity: "lien-ket-video" },
        { question: "Bài trình chiếu được lưu với tên nào?", type: "multiple-choice",
          options: ["NhungSuCoPhongThucHanh.mp4", "LeRaMatCLBTinhoc.pptx", "AnToanPhongThucHanh.pptx", "NoidungTinhoc1.pptx"],
          answer: 2, explanation: "SGK: chọn File/Save để lưu tệp với tên AnToanPhongThucHanh.pptx.", level: "nhan-biet", activity: "lien-ket-video" },
      ],
    },
    {
      id: "cac-buoc", name: "Trò chơi: Sắp xếp các bước thực hành 🔢", type: "ordering",
      goal: "Ghi nhớ quy trình tạo bài trình chiếu từ bản mẫu và chèn đường dẫn đến video.",
      time: 180,
      task: "Sắp xếp các bước thực hành theo hướng dẫn SGK cho đúng thứ tự rồi bấm Nộp bài.",
      steps: [
        "Chọn File › New",
        "Chọn chủ đề Education, chọn bản mẫu Lab Safety",
        "Nhập nội dung theo gợi ý của bản mẫu (dịch sang tiếng Việt)",
        "Chỉnh sửa phông chữ, cỡ chữ, màu nền; thêm hoặc bớt trang chiếu",
        "Chọn hình chiếc bình màu vàng ở trang tiêu đề, chọn Insert › Links › Link",
        "Chọn tệp NhungSuCoPhongThucHanh.mp4, bấm OK",
        "File › Save, lưu tệp AnToanPhongThucHanh.pptx",
      ],
      explanation: "a) File › New → Education → Lab Safety → nhập nội dung; b) chỉnh sửa bản mẫu; c) chèn đường dẫn đến video; d) lưu tệp.",
    },
    {
      id: "cham-cheo", name: "Phiếu chấm chéo sản phẩm 🤝", type: "checklist",
      goal: "Nhận xét, đánh giá và góp ý bài trình chiếu An toàn phòng thực hành của nhóm bạn.",
      time: 600,
      target: "Nhóm em chấm bài trình chiếu của",
      task: "Xem bài trình chiếu AnToanPhongThucHanh.pptx của nhóm được thầy/cô phân công (trình chiếu thử, bấm vào hình có liên kết), ghi số nhóm được chấm, tick từng tiêu chí rồi gửi cho thầy/cô.",
      columns: ["✅ Đạt", "🔧 Chưa đạt"],
      sections: [
        { title: "📋 BẢNG KIỂM", items: [
          "Sử dụng một bản mẫu có sẵn, các trang chiếu có giao diện thống nhất",
          "Đủ nội dung: trước khi vào phòng, trang phục, thực hành an toàn, khi xảy ra sự cố, trước khi rời phòng",
          "Nội dung bằng tiếng Việt, ngắn gọn, đúng chính tả, đã thay hết chữ gợi ý của bản mẫu",
          "Đã chỉnh sửa bản mẫu (phông chữ, cỡ chữ, màu nền, thêm/bớt trang) cho phù hợp, dễ đọc",
          "Trang tiêu đề có liên kết đến video (hoặc tài liệu), trình chiếu bấm vào mở được",
          "Lưu đúng tên tệp AnToanPhongThucHanh.pptx",
        ] },
      ],
      note: "Góp ý cho nhóm bạn: một điều em thích nhất và một điều nên sửa",
      modelAnswer: [
        "Góp ý cụ thể, lịch sự: nêu điểm tốt trước, rồi đến điểm nên sửa kèm cách sửa.",
        "Lỗi thường gặp: còn sót chữ tiếng Anh hoặc chữ gợi ý “(Sử dụng khoảng trống này…)”; chữ quá nhỏ; liên kết đặt nhầm trang; tệp video bị di chuyển nên không mở được; lưu sai tên tệp.",
      ],
    },

    /* ===================== HĐ3: LUYỆN TẬP (5 phút) ===================== */
    {
      id: "ai-len-cao-hon", name: "Luyện tập: Trò chơi “Ai lên cao hơn” 🐰🐢", type: "ladder",
      goal: "Củng cố kiến thức về bản mẫu, mẫu định dạng, tạo và lưu bài trình chiếu.",
      time: 300,
      task: "Chia lớp thành 2 đội. Mỗi câu trả lời đúng giúp nhân vật (Thỏ hoặc Rùa) của đội lên 1 bậc thang. Đội đưa nhân vật lên đỉnh thang trước là đội thắng!",
      teams: [{ name: "Đội Thỏ", icon: "🐰" }, { name: "Đội Rùa", icon: "🐢" }],
      goalIcon: "🏆",
      questions: [
        { question: "Câu 1. Bản mẫu có công dụng như nào?", type: "multiple-choice",
          options: ["Chứa bố cục, màu sắc, phông chữ, hiệu ứng, kiểu nền,… và cả nội dung.", "Giúp bài trình chiếu có giao diện thống nhất, chuyên nghiệp mà không tốn thời gian.", "Gợi ý các nội dung cần có cho bài trình chiếu; có thể chỉnh sửa, chia sẻ, tái sử dụng bản mẫu.", "Cả 3 đáp án trên."],
          answer: 3, explanation: "Cả ba ý đều là công dụng của bản mẫu (SGK tr.52).", level: "nhan-biet", activity: "ai-len-cao-hon" },
        { question: "Câu 2. Trong PowerPoint, bản mẫu có tên là gì?", type: "multiple-choice",
          options: ["Page layout.", "Themes.", "Apply to selected slides.", "Template."],
          answer: 3, explanation: "Bản mẫu là Template. Themes là mẫu định dạng.", level: "nhan-biet", activity: "ai-len-cao-hon" },
        { question: "Câu 3. Phân biệt giữa bản mẫu và mẫu định dạng.", type: "multiple-choice",
          options: ["Mẫu định dạng được thiết kế phù hợp với bản mẫu.", "Mẫu định dạng được thiết kế sẵn theo chủ đề. Bản mẫu được thiết kế phù hợp với chủ đề trình chiếu.", "Bản mẫu được thiết kế sẵn theo chủ đề. Mẫu định dạng được thiết kế phù hợp với chủ đề trình chiếu.", "Mẫu định dạng được thiết kế sẵn theo bản mẫu."],
          answer: 2, explanation: "Bản mẫu được thiết kế cho một mục đích, chủ đề cụ thể (du lịch, bài học,…) kèm cả nội dung gợi ý; mẫu định dạng (màu sắc, phông chữ, hiệu ứng) được chọn cho phù hợp với chủ đề bài trình chiếu.", level: "thong-hieu", activity: "ai-len-cao-hon" },
        { question: "Câu 4. Phương án nào sau đây mô tả tạo bài trình chiếu mới?", type: "multiple-choice",
          options: ["Nháy chuột chọn Design/Themes, Blank Presentation.", "Nháy chuột chọn Design/Variants, Blank Presentation.", "Nháy chuột chọn File/New, chọn Blank Presentation.", "Nháy chuột chọn File/New, chọn New Slide."],
          answer: 2, explanation: "File/New → Blank Presentation tạo bài trình chiếu mới (trống). New Slide chỉ thêm trang chiếu.", level: "nhan-biet", activity: "ai-len-cao-hon" },
        { question: "Câu 5 (Luyện tập SGK tr.55). Phương án nào sau đây mô tả các bước sử dụng bản mẫu?", type: "multiple-choice", sgkImage: "assets/sgk/luyen-tap.jpg",
          options: ["Nháy chuột chọn Design/Themes, chọn bản mẫu.", "Nháy chuột chọn Design/Variants, chọn bản mẫu.", "Nháy chuột chọn Insert/Text, chọn bản mẫu.", "Nháy chuột chọn File/New, chọn bản mẫu."],
          answer: 3, explanation: "Sử dụng bản mẫu: chọn File/New, rồi chọn bản mẫu (Hình 11a.3). Design/Themes là mẫu định dạng; Design/Variants là các biến thể của mẫu định dạng.", level: "thong-hieu", activity: "ai-len-cao-hon" },
        { question: "Câu 6. Làm thế nào để lưu bài trình chiếu dưới dạng tệp video?", type: "multiple-choice",
          options: ["Mở tệp bài trình chiếu, chọn File/Save As (chọn thư mục lưu tệp). Chọn Save.", "Mở tệp bài trình chiếu, chọn File/Save As (chọn thư mục lưu tệp), nháy chuột vào mũi tên bên phải ô Save as type (chọn *.mp4 hoặc *.wmv). Chọn Save.", "Mở tệp bài trình chiếu, chọn File/Save As, nháy chuột vào mũi tên bên phải ô Save as type (chọn *.mp4 hoặc *.wmv). Chọn Save.", "Mở tệp bài trình chiếu, chọn File/Save As (chọn thư mục lưu tệp), nháy chuột vào mũi tên bên phải ô Save as type (chọn *.mp4 hoặc *.wmv)."],
          answer: 1, explanation: "Đủ các bước: File/Save As → chọn thư mục lưu tệp → ở ô Save as type chọn *.mp4 hoặc *.wmv → Save. A thiếu chọn kiểu tệp video; C thiếu chọn thư mục; D thiếu bấm Save.", level: "thong-hieu", activity: "ai-len-cao-hon" },
        { question: "Câu 7. PowerPoint có sẵn những bản mẫu để tạo album ảnh cho những sự kiện, nhu cầu khác nhau. Em muốn sử dụng bản mẫu để tạo album ảnh tặng người thân nhân ngày sinh nhật. Em làm thế nào để tìm được bản mẫu phù hợp?", type: "multiple-choice",
          options: ["Nháy chuột chọn Design/Themes, nhập từ khoá “Happy Birthday”, chọn bản mẫu.", "Nháy chuột chọn Design/Variants, nhập từ khoá “Happy Birthday”, chọn bản mẫu.", "Nháy chuột chọn Insert/Text, nhập từ khoá “Happy Birthday”, chọn bản mẫu.", "Nháy chuột chọn File/New, nhập từ khoá “Happy Birthday”, chọn bản mẫu."],
          answer: 3, explanation: "Bản mẫu được tìm trong File/New: gõ từ khoá vào ô Search for online templates and themes rồi chọn bản mẫu.", level: "van-dung", activity: "ai-len-cao-hon" },
        { question: "Câu 8. Bản mẫu là gì?", type: "multiple-choice",
          options: ["Là bản thiết kế của một hoặc một nhóm các trang chiếu được lưu dưới dạng một tệp có phần mở rộng là .potx.", "Là một trang chiếu có màu sắc, hình ảnh nền, phông chữ, kiểu chữ, cỡ chữ,… được thiết kế sẵn theo chủ đề.", "Là người xem có thể xem lại nhiều lần nội dung bài trình chiếu mà không nhất thiết phải có tác giả trực tiếp trình bày.", "Cả 3 đáp án trên."],
          answer: 0, explanation: "SGK tr.51: Bản mẫu là một bản thiết kế của một hoặc một nhóm các trang chiếu được lưu dưới dạng một tệp có phần mở rộng là .potx.", level: "nhan-biet", activity: "ai-len-cao-hon" },
      ],
    },

    /* ===================== HĐ4: VẬN DỤNG (5 phút) ===================== */
    {
      id: "van-dung", name: "Vận dụng: Bài trình chiếu Tin học & bản mẫu của riêng em 🎯", type: "knowledge",
      goal: "Chọn và sử dụng bản mẫu phù hợp để tạo bài trình chiếu hoàn chỉnh; lưu bản mẫu riêng để tái sử dụng.",
      time: 300,
      task: "1) (Giáo án) Tạo bài trình chiếu giới thiệu một nội dung Tin học em chọn (một ngôn ngữ lập trình như Python, Scratch…; bảng tính điện tử; Internet an toàn; một thiết bị số,…): dùng một bản mẫu phù hợp, tối thiểu 3 trang chiếu, bố cục rõ ràng, có thể chèn hình ảnh hoặc liên kết minh hoạ; lưu tệp NoidungTinhoc1.pptx. 2) (SGK) Tìm một bản mẫu (có sẵn trong phần mềm hoặc được chia sẻ trên mạng) để tạo lại bài trình chiếu trong tệp LeRaMatCLBTinhoc.pptx; thay đổi các định dạng cần thiết rồi ghi lại dưới dạng bản mẫu (.potx) để tái sử dụng, chia sẻ. Hoàn thiện ở nhà, gửi sản phẩm qua thư điện tử hoặc Zalo của thầy/cô.",
      sgkImage: "assets/sgk/van-dung.jpg",
      content: {
        revealLabel: "💡 Tự kiểm tra trước khi nộp",
        blocks: [
          { kind: "list", value: [
            "Bản mẫu hợp với chủ đề; đã thay hết chữ gợi ý bằng nội dung của em.",
            "Tối thiểu 3 trang chiếu: có trang tiêu đề và các trang nội dung; văn bản ngắn gọn, dễ đọc.",
            "Liên kết (nếu có) mở đúng video, tài liệu khi trình chiếu.",
            "Lưu bản mẫu: File › Save As, ở ô Save as type chọn PowerPoint Template (*.potx).",
            "Hình ảnh, video lấy từ Internet cần ghi nguồn. Nếu nhờ AI gợi ý bản mẫu, bố cục, em vẫn tự kiểm tra, chọn lọc và chỉnh sửa.",
          ] },
        ],
      },
      questions: [
        { question: "Muốn lưu bài trình chiếu thành bản mẫu để tái sử dụng và chia sẻ, tên tệp có phần mở rộng là:", type: "multiple-choice",
          options: [".pptx", ".potx", ".docx", ".mp4"],
          answer: 1, explanation: "SGK: ghi lại tệp trình chiếu dưới dạng bản mẫu, tên tệp có dạng .potx.", level: "nhan-biet", activity: "van-dung" },
        { question: "Bài giới thiệu ngôn ngữ lập trình Scratch cho buổi sinh hoạt CLB nên chọn bản mẫu thế nào?", type: "multiple-choice",
          options: ["Bản mẫu album sinh nhật", "Bản mẫu an toàn phòng thực hành, giữ nguyên nội dung", "Bản mẫu thuộc chủ đề học tập (Education) rồi chỉnh sửa nội dung, màu sắc cho phù hợp", "Không dùng bản mẫu nào"],
          answer: 2, explanation: "Chọn bản mẫu gần với mục đích (học tập) rồi chỉnh sửa cho phù hợp với nội dung.", level: "van-dung", activity: "van-dung" },
      ],
    },

    /* ===================== TỔNG KẾT ===================== */
    {
      id: "tong-ket", name: "Tổng kết", type: "summary",
      task: "Cả lớp nhắc lại kiến thức trọng tâm và làm thử thách cuối. Về nhà: hoàn thiện Vận dụng; thực hành lại các nội dung đã học; chuẩn bị bài tiếp theo (theo giáo án: đọc trước Bài 8b — Phần mềm chỉnh sửa ảnh).",
      content: {
        learned: [
          "Mẫu định dạng (Theme): màu sắc, phông chữ, hiệu ứng hình ảnh.",
          "Bản mẫu (Template, tệp .potx): bố cục, màu sắc, phông chữ, hiệu ứng, kiểu nền… và cả nội dung gợi ý; chỉnh sửa, chia sẻ, tái sử dụng được.",
          "Sử dụng bản mẫu: File › New → chọn chủ đề hoặc tìm kiếm → chọn bản mẫu → nhập, chỉnh sửa nội dung.",
          "Chèn đường dẫn đến video/tài liệu: chọn hình → Insert › Links › Link → chọn tệp → OK.",
        ],
        challenge: [
          { question: "Bạn Hà áp dụng Design › Themes cho bài trình chiếu mới nhưng các trang vẫn trống, không có gợi ý nội dung. Vì sao?", type: "multiple-choice",
            options: ["Themes là mẫu định dạng — chỉ có màu sắc, phông chữ, hiệu ứng; muốn có nội dung gợi ý phải dùng bản mẫu (File › New)", "Máy tính bị lỗi", "Chưa lưu tệp", "Phải bật Internet thì nội dung mới hiện"],
            answer: 0, explanation: "Mẫu định dạng không kèm nội dung; bản mẫu mới có bố cục và nội dung gợi ý.", level: "van-dung-cao", activity: "tong-ket" },
          { question: "(Mở rộng) Nam chép bài AnToanPhongThucHanh.pptx sang máy khác để trình chiếu nhưng bấm vào hình chiếc bình thì video không mở. Nguyên nhân có thể là gì?", type: "multiple-choice",
            options: ["Bài trình chiếu chưa dùng bản mẫu", "Thiếu số trang", "Chỉ chép tệp .pptx mà không chép kèm tệp video, nên đường dẫn đến tệp video không còn đúng", "Hình chiếc bình quá nhỏ"],
            answer: 2, explanation: "Liên kết chỉ là đường dẫn đến tệp video. Khi mang bài sang máy khác cần chép kèm tệp video (giữ đúng thư mục) và trình chiếu thử để kiểm tra liên kết.", level: "van-dung-cao", activity: "tong-ket" },
        ],
      },
    },
  ],
};

if (typeof module !== "undefined" && module.exports) module.exports = LESSON;
if (typeof window !== "undefined") window.LESSON = LESSON;
