# HƯỚNG DẪN GIÁO VIÊN — TIN 8, BÀI 15: GỠ LỖI

## 1. Giới thiệu nhanh
Bài gồm 1 tiết, 13 màn hoạt động, 36 bài chấm tự động.

### Chạy thử chương trình Scratch (không chấm điểm)
- **Các nút:** HS bấm 🏁, nhập số vào ô dưới sân khấu rồi nhấn Enter.
  - Tốc độ: 🐢 / Vừa / ⚡.
  - 👣 Từng bước: mỗi lần bấm ⏭ chạy một lệnh (giống chèn lệnh “đợi … giây”).
- **Ô biến** hiện giá trị như khi đánh dấu ☑ trong nhóm Các biến số. Số bí mật được che, bấm 👁 để hiện.
- **Ô “Số lần em đã đoán thật”** do app tự đếm để HS so sánh với số lần đoán chương trình thông báo.
- **Mỗi màn gỡ lỗi có các thẻ:**
  - chương trình có lỗi (❌) và chương trình đã sửa (✅): Hình 15.1, Hình 15.3, Hình 15.4
  - Luyện tập: cách 1 và cách 2
- **Mô phỏng chạy giống Scratch thật:**
  - Hình 15.4: lệnh (14) dùng dấu “+” nên chỉ hiện số, mất cụm “Số lần đoán:”.
  - Hình 15.3: biến n mới tạo có giá trị 0.

### Trò chơi và tương tác
- **Ô chữ** (Mở đầu):
  - Hàng ngang là câu trắc nghiệm của giáo án; trả lời đúng thì lật chữ.
  - HS gõ từ khoá GỠ LỖI (có dấu hay không dấu đều được).
- **Thêm:**
  - Phân loại lỗi
  - Sắp xếp các bước gỡ lỗi
  - Thám tử tìm lệnh gây lỗi
  - Đúng hay sai?

## 2. Cách mở và chạy
- **Một máy chiếu:** mở `index.html`, bấm phím `F` để toàn màn hình.
- **Cả lớp:**
  1. Vào bảng GV, chọn bài.
  2. Bấm ▶ Bắt đầu.
  3. Chiếu mã vào lớp.
  4. Bấm 📺 để trình chiếu.
- **Chuẩn bị:** Scratch 3.0 trên máy HS; tệp trò chơi Đoán số của Bài 14.

## 3. Kiến thức trọng tâm
1. Cần phải chạy thử chương trình để phát hiện và loại bỏ lỗi.
2. Lỗi cú pháp: viết sai quy tắc, chương trình không hoạt động.
3. Lỗi lôgic: viết đúng quy tắc nhưng thực hiện sai kịch bản.
4. Hai phương pháp phát hiện lỗi lôgic:
   - tập trung vào khối lệnh gây lỗi và các lệnh liên quan;
   - chạy từng bước, theo dõi biến, so sánh với tính tay.

## 4. Lưu ý
- **Ô chữ Câu 5:** giáo án hỏi “Việc xác định bài toán đầu tiên là đi xác định thành phần nào?” (đáp án Input). App sửa lời thành “Khi xác định bài toán, thông tin đã cho (dữ liệu đầu vào) được gọi là gì?” Đáp án vẫn là Input, từ khoá vẫn là GỠ LỖI.
- **Luyện tập:** làm theo SGK (cách khác sửa lỗi Hình 15.1).
  - Đáp án Luyện tập trong giáo án là lời giải Thực hành Hình 15.4.
  - Hình đáp án đó dùng điều kiện “trả lời > số bí mật” để báo thua, chưa đúng.
  - App dùng lời giải của SGK (Hình 15.5) ở phần Thực hành.
- **Câu hỏi tr.89 (Hình 15.3):** chạy thử cho thấy hai lỗi:
  - chưa có lệnh đặt n thành trả lời (n luôn là 0);
  - hai thông báo “là số LẺ!” / “là số CHẴN!” bị đổi chỗ.
- **Vận dụng:** chương trình máy đoán số là chương trình tham khảo (Mở rộng), không có trong SGK.
  - Máy đoán số ở giữa khoảng còn lại, không quá 7 lần là tìm ra.
  - Nếu HS trả lời nhầm, chương trình báo để HS kiểm tra lại.
- **Video và AI:** giáo án có nhắc đến video và công cụ AI nhưng không kèm đường link, nên app không thêm nút mở.
