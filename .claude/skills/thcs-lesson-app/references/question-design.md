# Thiết kế câu hỏi chất lượng

Đọc trước khi xây Question Bank. Câu hỏi là "trái tim" của app tương tác — câu
hỏi dở làm hỏng cả tiết học dù giao diện đẹp.

## 1. Bốn mức độ (bám thang nhận thức, phù hợp GDPT 2018)

| Mức | `level` | HS phải làm gì | Ví dụ khung câu hỏi |
|---|---|---|---|
| Nhận biết | `nhan-biet` | Nhận diện, gọi tên, nhớ lại | "Đâu là ... ?", "... là gì?" |
| Thông hiểu | `thong-hieu` | Giải thích, phân biệt, chọn đúng lý do | "Vì sao ...?", "Điểm khác nhau giữa A và B?" |
| Vận dụng | `van-dung` | Áp dụng vào tình huống quen | "Bạn An cần làm X, nên dùng công cụ nào?" |
| Vận dụng cao | `van-dung-cao` | Suy luận, giải quyết vấn đề mới | "Nếu ... thay đổi thì kết quả sẽ ...? Vì sao?" |

Một bộ luyện tập tốt phủ đủ 4 mức, nghiêng về **thông hiểu + vận dụng** (đó là
nơi năng lực hình thành). Đừng dồn hết vào nhận biết.

## 2. Ưu tiên câu hỏi TÌNH HUỐNG hơn định nghĩa suông

Kém: "Phần mềm soạn thảo văn bản dùng để làm gì?"

Tốt hơn: "Bạn Lan cần viết một lá đơn có tiêu đề in đậm, canh giữa và in ra
giấy. Phần mềm nào phù hợp nhất? Vì sao?"

Câu tình huống buộc HS **áp dụng** kiến thức, gần với thực tế, và dễ tạo cảm giác
"có ích" — điều học sinh THCS cần để thấy động lực.

## 3. Viết phương án nhiễu (distractor) tốt

- Các phương án sai phải **hợp lý** — phản ánh lỗi hiểu lầm thường gặp, không phải
  đáp án ngớ ngẩn dễ loại.
- Độ dài các phương án tương đương (đáp án đúng đừng dài hơn hẳn — HS đoán được).
- **Không dồn đáp án đúng vào một vị trí.** Trộn vị trí (A/B/C/D) ngẫu nhiên qua
  cả bộ. `validate-lesson.js` sẽ cảnh báo nếu lệch.

## 4. Feedback — quy tắc "Feedback = học tập"

Sau **mỗi** câu, luôn có giải thích ngắn, kể cả khi HS đúng:

- Đúng: `"Chính xác! Vì <lý do cốt lõi>."`
- Sai: `"Chưa chính xác. Hãy nhớ rằng <kiến thức đúng, ngắn gọn>."`

Feedback nên nhắc lại **đúng cái Core Knowledge** cần đọng lại, không lan man.
Giọng khích lệ, không chê. Với câu vận dụng cao, có thể thêm 1 câu gợi hướng suy
nghĩ thay vì chỉ báo đúng/sai.

## 5. Các dạng câu/tương tác và khi nào dùng

| Dạng (`type`) | Dùng khi | Ghi chú |
|---|---|---|
| `multiple-choice` | Kiểm tra hiểu, 1 đáp án đúng | Xương sống của quiz Kahoot/Quizizz |
| `multiple-select` | Có nhiều đáp án đúng | Nêu rõ "Chọn TẤT CẢ đáp án đúng"; ô đã chọn hiện viền đậm + nhãn "✓ đã chọn", bấm **Kiểm tra** để chấm |
| `true-false` | Bác bỏ quan niệm sai, kiểm tra nhanh | Kèm giải thích vì sao đúng/sai |
| `matching` | Ghép khái niệm–định nghĩa, thuật ngữ–ví dụ | Ghép đôi |
| `drag-drop` | Phân loại vào nhóm, sắp vào chỗ trống | Kéo thả |
| `ordering` | Sắp xếp quy trình/các bước theo thứ tự | Rất hợp môn có quy trình |
| `fill-blank` | Điền từ khóa còn thiếu | Chấp nhận vài cách viết (hoa/thường, dấu) |
| `word-puzzle` | Ô chữ củng cố thuật ngữ | Vui, hợp luyện tập/tổng kết |
| `flashcard` | Ghi nhớ khái niệm, ôn tập | Lật thẻ, tự kiểm tra |
| `memory` | Ghép cặp trí nhớ (thuật ngữ ↔ nghĩa) | Trò chơi củng cố |
| `image-quiz` | Nhận diện qua hình từ SGK | Dùng hình thật trong PDF |
| `scenario` | Vận dụng, thảo luận tình huống | Có thể không chấm điểm, để GV dẫn dắt |

## 6. Cấu trúc dữ liệu chuẩn cho một câu

```javascript
{
  question: "Bạn An cần gửi cùng một thông báo cho 40 phụ huynh. Cách nào phù hợp nhất?",
  type: "multiple-choice",
  options: ["Gọi điện từng người", "Gửi email nhóm", "Nhắn tay từng tờ giấy", "Không gửi"],
  answer: 1,                 // chỉ số đáp án đúng (0-based); multiple-select: mảng [..]
  explanation: "Chính xác! Email nhóm gửi một lần tới nhiều người, nhanh và tiết kiệm.",
  level: "van-dung",         // nhan-biet | thong-hieu | van-dung | van-dung-cao
  activity: "luyen-tap",     // khớp id hoạt động trong lesson.js
  time: 20                   // (tùy chọn) giây đếm ngược cho câu này
}
```

Xem `templates/question-bank.js` để có khuôn đầy đủ cho mọi `type`.

## 7. Sai lầm cần tránh

- Biến cả tiết thành 30–40 câu trắc nghiệm liên tục → HS mệt, chán. Phối hợp
  nhiều dạng, xen khám phá/thảo luận/chốt kiến thức.
- Câu hỏi mà đọc đề đã đoán được đáp án (đáp án đúng dài nhất, hoặc "tất cả đều
  đúng" quá lộ).
- Feedback chỉ "Đúng"/"Sai" — bỏ mất cơ hội dạy.
- Hỏi kiến thức không có trong SGK/giáo án mà không gắn nhãn "Mở rộng".
