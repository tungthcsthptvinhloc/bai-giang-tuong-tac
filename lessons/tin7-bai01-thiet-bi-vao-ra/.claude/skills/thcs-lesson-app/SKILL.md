---
name: thcs-lesson-app
description: >-
  Biến PDF sách giáo khoa (SGK) và Kế hoạch bài dạy (giáo án) của giáo viên THCS
  thành một ỨNG DỤNG WEB BÀI GIẢNG TƯƠNG TÁC hoàn chỉnh, chạy được ngay trên máy
  chiếu/màn hình lớp học. Ứng dụng bám sát tiến trình sư phạm của giáo án, chuyển
  từng hoạt động thành module tương tác (quiz kiểu Kahoot/Quizizz, kéo thả, ghép
  đôi, lật thẻ, ô chữ, tình huống...), có điểm số, phản hồi sau mỗi câu, chốt
  kiến thức "Em cần nhớ", và chế độ giáo viên. Dùng skill này BẤT CỨ KHI NÀO giáo
  viên/người dùng nhắc đến: tạo bài giảng điện tử, bài giảng tương tác, "lesson
  app", ứng dụng dạy học, số hóa giáo án, biến giáo án/SGK thành app, trò chơi
  học tập, quiz cho lớp học, dạy học Tin học/môn học THCS trên máy chiếu, chương
  trình GDPT 2018, sách "Kết nối tri thức" — kể cả khi họ chỉ đưa file SGK.pdf +
  giáo án và nói "làm cho tôi một tiết học sinh động / tương tác".
---

# THCS Lesson App — Trình tạo ứng dụng bài giảng tương tác

## Bạn đang tạo cái gì

Không phải slide. Không phải website giới thiệu bài học. Bạn tạo một **ứng dụng
tổ chức tiết học** để giáo viên đứng lớp điều khiển và học sinh tham gia:

```
GIÁO VIÊN = người điều khiển   HỌC SINH = người tham gia   APP = trợ giảng số
SGK = nguồn kiến thức gốc      GIÁO ÁN = khung sư phạm      GAME = công cụ tạo hứng thú
KIẾN THỨC TRỌNG TÂM = đích đến
```

Tiêu chí duy nhất để đánh giá thành công (KHÔNG phải số animation/màu sắc):

> Học sinh có **hiểu bài** không? Có **tham gia** không? Có **nhớ kiến thức trọng
> tâm** không? Giáo viên có **dùng được ngay khi đứng lớp** không?

## Hai nguyên tắc không được vi phạm

1. **CHÍNH XÁC.** Mọi kiến thức phải bám SGK + giáo án. Không bịa. Nếu tài liệu
   thiếu thông tin, ghi rõ `[CẦN GIÁO VIÊN KIỂM TRA]` ngay tại chỗ thay vì đoán.
   Kiến thức mở rộng ngoài SGK phải được gắn nhãn "Mở rộng" để học sinh không
   nhầm là kiến thức bắt buộc.
2. **BÁM GIÁO ÁN.** Giữ nguyên tên hoạt động và thứ tự của giáo án. Không tự đổi
   tiến trình sư phạm nếu không thật sự cần. Mỗi hoạt động trong giáo án = một
   module trong app.

## Quy trình làm việc (làm đúng thứ tự)

### Bước 0 — Kiểm tra project hiện tại (bắt buộc, trước khi code)
Xem thư mục, `package.json`, framework, build system, component sẵn có. **KHÔNG**
đổi framework, xóa code cũ, cài package thừa, hay thay đổi cấu trúc lớn. Nếu
project trống → mặc định HTML + CSS + JS thuần (chạy offline, mở file là chạy).

### Bước 1 — Đọc toàn bộ tài liệu
Đọc **hết** PDF SGK (dùng skill `pdf` hoặc công cụ đọc PDF; không bỏ trang) và
giáo án (dùng skill `docx` nếu là .docx). Trích: tên bài, chương/chủ đề, mục lớn/
nhỏ, khái niệm, thuật ngữ, ví dụ, hình ảnh, sơ đồ, bảng, quy trình, câu hỏi &
hoạt động có sẵn trong SGK.

### Bước 2 — Phân tích & xác định CORE KNOWLEDGE
Từ giáo án, tách: Mục tiêu · Yêu cầu cần đạt · Thiết bị/dữ liệu · các Hoạt động
(mở đầu → hình thành KT → luyện tập → vận dụng → mở rộng) · Đánh giá.
Xác định **Core Knowledge** = 3–7 điều học sinh NHẤT ĐỊNH phải nhớ sau tiết. Đây
là đích đến; đừng biến cả SGK thành chữ trên màn hình.

### Bước 3 — Viết `LESSON_PLAN_ANALYSIS.md`
Theo `templates/lesson-analysis.md`. Phần quan trọng nhất là **Bảng ánh xạ hoạt
động** — với mỗi hoạt động ghi: Mục tiêu · Nội dung SGK · Hình thức app · Kiểu
tương tác · Kiến thức chốt. **Chưa được code trước khi bảng này hoàn chỉnh.**

### Bước 4 — Thiết kế UI trong `LESSON_APP_DESIGN.md`
Xác định điều hướng (trang chủ → các hoạt động → tổng kết), thanh tiến trình,
menu hoạt động, chế độ giáo viên, bảng màu, phím tắt. Xem `references/lesson-structure.md`.

### Bước 5 — Lập trình
Dựng app từ scaffold trong `assets/app-starter/` (đã có sẵn engine trò chơi tái
sử dụng: Quiz/Kahoot, TrueFalse, Matching, DragDrop, Ordering, FlashCard,
MemoryGame, Wheel, WordPuzzle, ImageQuiz, Scenario). **Tách dữ liệu khỏi code**:
toàn bộ nội dung bài học nằm trong `data/lesson.js` để giáo viên chỉnh dễ dàng;
không viết lại engine nếu component đã có. Xem `references/gamification.md` cho
điểm/streak/hiệu ứng và `references/question-design.md` cho chất lượng câu hỏi.

### Bước 6 — Kiểm tra
Chạy `node scripts/validate-lesson.js <đường-dẫn>/data/lesson.js` để bắt lỗi cấu
trúc (thiếu đáp án, đáp án đúng luôn ở một vị trí, thiếu giải thích, thiếu core
knowledge...). Kiểm tra bằng mắt: nội dung, điều hướng, điểm, game, responsive,
lỗi console JS, chế độ toàn màn hình, phím tắt.

### Bước 7 — Tự đánh giá & bàn giao
Tự hỏi checklist ở cuối file. Sửa đến khi tất cả đạt. Rồi tạo đủ **output**.

## Output bắt buộc

1. **Ứng dụng chạy được** (mở `index.html` là chạy, không cần mạng).
2. `LESSON_PLAN_ANALYSIS.md` — phân tích bài học + bảng ánh xạ + core knowledge.
3. `LESSON_SCRIPT.md` — kịch bản bài giảng (giáo viên nói/làm gì ở mỗi màn hình).
4. `QUESTION_BANK.md` (hoặc `data/lesson.js`) — ngân hàng câu hỏi có phân loại.
5. `TEACHER_GUIDE.md` — theo `templates/teacher-guide.md`.

## Nguyên tắc thiết kế cốt lõi (đọc kỹ, dễ quên)

- **Cho máy chiếu:** chữ lớn, nút lớn, tương phản cao, ít chữ/màn hình, có toàn
  màn hình, điều khiển được bằng bàn phím (`←` lùi · `→`/`Space` tiếp · `Enter`
  xác nhận · `Esc` thoát fullscreen). Không cần rê chuột chính xác.
- **Học sinh chủ động:** SUY NGHĨ → TRẢ LỜI → THẢO LUẬN → KHÁM PHÁ → RÚT RA KIẾN
  THỨC → LUYỆN TẬP → VẬN DỤNG. Mỗi hoạt động phải trả lời được: HS làm gì? nghĩ
  gì? tương tác thế nào? hình thành kiến thức gì? GV chốt gì?
- **Feedback = học tập:** sau mỗi câu, không chỉ "Đúng/Sai" mà giải thích ngắn
  ("Chính xác! Vì..." / "Chưa chính xác. Hãy nhớ rằng...").
- **Chốt kiến thức:** cuối mỗi hoạt động quan trọng có màn "EM CẦN NHỚ" / "GIÁO
  VIÊN CHỐT" với 1–3 ý cốt lõi, ít chữ, có thể kèm sơ đồ/hình.
- **Không lạm dụng trắc nghiệm:** phối hợp khám phá + tương tác + thảo luận + trò
  chơi + câu hỏi tư duy + trực quan + luyện tập + vận dụng. Trò chơi phải phục vụ
  mục tiêu học tập, không phải "cho vui".
- **Ưu tiên câu hỏi tình huống** thay vì hỏi định nghĩa suông; phủ đủ 4 mức: nhận
  biết · thông hiểu · vận dụng · vận dụng cao. Đáp án đúng KHÔNG luôn ở một vị trí.
- **Kết thúc tiết:** màn TỔNG KẾT gồm "Hôm nay em đã học" + "3 từ khóa cần nhớ" +
  1–3 câu thử thách tổng hợp.

## Tài nguyên trong skill

- `references/pedagogy.md` — nguyên tắc sư phạm GDPT 2018, dạy học tích cực, cấu
  trúc hoạt động, cách chốt kiến thức. Đọc trước khi phân tích giáo án.
- `references/question-design.md` — cách viết câu hỏi chất lượng theo 4 mức độ,
  viết feedback, phân loại; đọc trước khi làm question bank.
- `references/gamification.md` — chọn dạng game theo mục tiêu, luật điểm/streak/
  thời gian, liều lượng hiệu ứng; đọc trước khi thiết kế trò chơi.
- `references/lesson-structure.md` — điều hướng app, layout máy chiếu, phím tắt,
  chế độ giáo viên, responsive.
- `templates/lesson-analysis.md`, `templates/teacher-guide.md`,
  `templates/question-bank.js` — khuôn mẫu cho các output.
- `assets/app-starter/` — scaffold app đầy đủ + engine trò chơi tái sử dụng.
  Sao chép vào project rồi chỉ sửa `data/lesson.js`.
- `scripts/validate-lesson.js` — kiểm tra dữ liệu bài học trước khi bàn giao.

## Checklist tự đánh giá trước khi hoàn thành

- [ ] Đã đọc **toàn bộ** PDF SGK và giáo án?
- [ ] App bám sát tên & thứ tự hoạt động của giáo án?
- [ ] Đã xác định & làm nổi bật Core Knowledge?
- [ ] Mỗi hoạt động đã thành tương tác thật (không chỉ chữ)?
- [ ] Câu hỏi chất lượng, đủ mức độ, có tình huống, đáp án không dồn một vị trí?
- [ ] Có game phù hợp mục tiêu (không "cho vui")?
- [ ] Có feedback giải thích sau mỗi câu?
- [ ] Có màn chốt "Em cần nhớ" ở các mốc quan trọng + tổng kết cuối?
- [ ] Chữ/nút đủ lớn cho máy chiếu, có fullscreen, điều khiển bằng phím?
- [ ] Chạy offline, không lỗi console JS, `validate-lesson.js` PASS?
- [ ] Không có nội dung bịa; chỗ thiếu đã gắn `[CẦN GIÁO VIÊN KIỂM TRA]`?
- [ ] Đã tạo đủ 5 output? Một GV THCS mở lên là dạy được ngay?

Còn mục nào chưa đạt → sửa trước khi kết thúc.
