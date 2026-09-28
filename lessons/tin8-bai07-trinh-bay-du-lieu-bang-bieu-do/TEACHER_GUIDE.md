# HƯỚNG DẪN GIÁO VIÊN — TIN 8, BÀI 7: TRÌNH BÀY DỮ LIỆU BẰNG BIỂU ĐỒ

## 1. Giới thiệu nhanh
- Bài gồm 2 tiết, 15 màn hoạt động, 46 bài chấm tự động và 1 khảo sát.
- **Biểu đồ trong app:** app tự vẽ theo đúng số liệu SGK (Hình 7.2, 7.4, 7.9, 7.8), nên nét và dễ đọc trên máy chiếu. Hình 7.3 và các hình giao diện Excel dùng ảnh SGK.
- **Lớp mình thì sao?**
  - Mỗi nhóm bình chọn trên máy.
  - Màn chiếu có 3 nút đổi cách hiển thị: 📊 Thanh ngang · 📶 Biểu đồ cột · 🥧 Biểu đồ hình quạt tròn (tỉ lệ % tự tính).
  - Khi mở file trực tiếp, thầy/cô bấm +1 theo số học sinh giơ tay.
- **Thực hành:**
  - Học sinh làm trên Excel thật; app không mô phỏng việc tạo biểu đồ.
  - App kiểm tra bằng câu chọn vùng dữ liệu trên lưới (B2:C8, A1:B6) và các câu trắc nghiệm.
  - Phần Luyện tập 1 có biểu đồ kết quả mẫu để học sinh đối chiếu.
- **Trò chơi thêm:**
  - Chọn đúng loại biểu đồ (9 tình huống)
  - Thám tử biểu đồ (6 biểu đồ có lỗi)
  - Đọc nhanh biểu đồ (2 đội leo bậc)

## 2. Cách mở và chạy
- **Chỉ dùng máy chiếu:** mở `index.html`, bấm phím `F` để toàn màn hình.
- **Nối tiết học cả lớp:**
  1. Vào bảng GV, chọn lớp và chọn bài.
  2. Bấm ▶ Bắt đầu.
  3. Chiếu mã vào lớp để học sinh nhập.
  4. Bấm 📺 để trình chiếu.
- **Chuẩn bị trước giờ học:**
  - Excel trên máy học sinh.
  - Tệp TGSDThietbiso.xlsx đã lưu ở Bài 6, dùng cho Luyện tập 1.

## 3. Kiến thức trọng tâm
1. Biểu đồ minh hoạ dữ liệu trực quan, giúp dễ so sánh và dễ nhận ra xu hướng.
2. Chọn loại biểu đồ theo mục đích:
   - Biểu đồ cột: so sánh.
   - Biểu đồ hình quạt tròn: so sánh các phần với tổng thể.
   - Biểu đồ đoạn thẳng: xu hướng theo thời gian.
3. Các bước tạo biểu đồ:
   1. Chọn vùng dữ liệu.
   2. Insert › Charts › chọn loại biểu đồ, rồi chọn kiểu.
   3. Chart Elements: thêm Chart Title, Data Labels, Legend. Với biểu đồ hình quạt tròn, chọn Percentage để hiện tỉ lệ %.

## 4. Lưu ý
- **Dữ liệu thực hành:** theo lựa chọn của thầy/cô, app dùng bảng Hình 7.1 của SGK. Phần "cây trồng" (THXanh.xlsx) trong giáo án không có số liệu nên không đưa vào.
- **Chọn vùng dữ liệu:** nếu học sinh chọn A2:C8 (thừa cột TT), Excel sẽ vẽ thêm một chuỗi cột TT. Câu 2 của Thám tử biểu đồ minh hoạ đúng lỗi này.
- **Luyện tập 2:** cột Năm chứa số nên Excel có thể vẽ thêm một chuỗi cột "Năm". Cách xử lí: xoá chữ "Năm" ở ô A1 (để trống) rồi tạo lại biểu đồ, khi đó cột Năm sẽ thành nhãn của trục ngang.
- **Đáp án chính:**
  - Hoạt động 1: câu 1 là biểu đồ cột; câu 2 là biểu đồ hình quạt tròn.
  - Luyện tập 1: hàm =SUM(C4:C13) cho kết quả 68; khoảng 1–2 giờ chiếm khoảng 34%.
  - Luyện tập 2: doanh thu tăng liên tục.
  - Đọc nhanh biểu đồ: năm 2017 là năm doanh thu tăng nhiều nhất (+741 triệu USD).
- **Video và công cụ AI:** giáo án có nhắc đến nhưng không kèm đường link, nên app không thêm nút mở.
