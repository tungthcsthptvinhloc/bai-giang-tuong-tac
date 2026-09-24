# Gamification — dùng trò chơi để học, không phải để vui

Đọc trước khi thiết kế phần trò chơi. Nguyên tắc gốc: **mỗi trò chơi phải phục vụ
một mục tiêu học tập cụ thể**. Nếu bỏ trò chơi đi mà mục tiêu vẫn đạt như cũ thì
trò chơi đó là trang trí — hãy bỏ hoặc thay.

## 1. Chọn dạng game theo mục tiêu

| Mục tiêu học tập | Dạng game phù hợp |
|---|---|
| Kiểm tra hiểu nhanh, tạo không khí sôi nổi | Quiz kiểu Kahoot/Quizizz (đếm giờ + điểm + streak) |
| Ghi nhớ thuật ngữ/khái niệm | FlashCard, Memory (ghép cặp), Ô chữ |
| Phân loại, nhóm khái niệm | Kéo thả vào nhóm |
| Nắm quy trình/thứ tự các bước | Sắp xếp thứ tự (ordering) |
| Nối khái niệm với định nghĩa/ví dụ | Ghép đôi (matching) |
| Nhận diện qua hình ảnh SGK | Đoán hình / image-quiz |
| Vận dụng, ra quyết định | Tình huống (scenario), phân loại đúng/sai |
| Ôn tập cuối bài, chọn ngẫu nhiên HS | Vòng quay |

## 2. Trải nghiệm kiểu Kahoot/Quizizz (chạy offline trong app)

Luồng chuẩn cho một câu quiz:

```
"Câu 3/10"  →  Câu hỏi (chữ lớn)  →  4 đáp án ô lớn, nhiều màu
     →  HS/GV chọn  →  ✓ "Chính xác! Vì..."  /  ✗ "Chưa chính xác. Hãy nhớ..."
     →  cộng điểm (+ streak nếu đúng liên tiếp)  →  Câu tiếp theo
Kết thúc  →  Màn tổng kết: điểm, số câu đúng, streak cao nhất, huy hiệu
```

Đặc điểm bắt buộc: **thanh tiến trình**, **điểm**, phản hồi có **giải thích**,
và **tổng kết cuối**. Đếm giờ và combo/streak là tùy chọn — chỉ bật khi phù hợp.

## 3. Luật điểm / streak / thời gian (gợi ý, có thể chỉnh trong data)

- Điểm cơ bản mỗi câu đúng: 100.
- Thưởng thời gian (nếu có đếm giờ): cộng thêm theo giây còn lại, ví dụ
  `bonus = round(50 * timeLeft / timeTotal)`. Trả lời nhanh được nhiều hơn.
- Streak: đúng liên tiếp tăng hệ số nhẹ (x1 → x1.2 → x1.5, chặn ở x2) để tạo
  hứng thú mà không làm chênh lệch quá lớn. Sai → streak về 0.
- Huy hiệu tổng kết theo % đúng: ví dụ ≥90% "Xuất sắc", ≥70% "Giỏi", ≥50% "Khá",
  còn lại "Cần cố gắng thêm". Giọng động viên.

Cho phép giáo viên **tắt** đếm giờ (chế độ giáo viên) để có thời gian thảo luận
cả lớp — trên lớp không phải lúc nào cũng muốn áp lực thời gian.

## 4. Liều lượng hiệu ứng & âm thanh

- Animation phục vụ trải nghiệm: chuyển màn mượt, đáp án đúng nảy nhẹ + xanh, sai
  rung nhẹ + đỏ. **Không** hiệu ứng kéo dài > ~400ms làm giáo viên phải chờ.
- Không lạm dụng: một màn hình không nên có nhiều thứ động cùng lúc gây phân tán.
- Âm thanh: nếu dùng, phải có nút **tắt tiếng** và mặc định ở mức vừa — lớp học
  cạnh nhau, tiếng lớn gây phiền. An toàn nhất là để mặc định tắt, GV tự bật.
- Confetti/pháo giấy chỉ dùng ở mốc lớn (hoàn thành game, tổng kết), không mỗi câu.

## 5. Cân bằng: không "gamify" quá đà

Ganh đua nhẹ tạo hứng thú; ganh đua nặng khiến HS yếu nản và HS mạnh chỉ lo điểm.
Vì vậy:

- Xen kẽ hoạt động có điểm và hoạt động khám phá/thảo luận **không** tính điểm.
- Feedback luôn kèm kiến thức, để cả khi thua HS vẫn học được điều đúng.
- Màn "Em cần nhớ" sau game để kéo sự chú ý trở lại kiến thức, tránh HS chỉ nhớ
  trò chơi mà quên bài.

## 6. Chế độ giáo viên hỗ trợ tổ chức trò chơi

Trong Teacher Mode nên có: bật/tắt đếm giờ, hiện/ẩn đáp án, reset trò chơi, reset
điểm, bỏ qua câu, nhảy tới hoạt động bất kỳ. Các nút này ẩn khỏi giao diện học
sinh (đặt sau một nút/nhấn phím tắt) để không gây rối. Xem `lesson-structure.md`.
