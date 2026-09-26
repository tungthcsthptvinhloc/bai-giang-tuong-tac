# HƯỚNG DẪN GIÁO VIÊN — TIN 9, BÀI 9a: SỬ DỤNG CÔNG CỤ XÁC THỰC DỮ LIỆU

## 1. Giới thiệu nhanh
- Bài gồm 2 tiết, 18 màn hoạt động, 38 bài chấm tự động và 3 phần gửi GV (phiếu tự kiểm tra, 2 câu vận dụng).
- **Bảng tính mô phỏng có quy tắc xác thực đặt sẵn như SGK** để HS nhập thử:
  - Cột Khoản chi / Khoản thu: nút ▾ danh sách thả xuống (List, Source F2:F10 hoặc F2:F6). Gõ giá trị ngoài danh sách sẽ bị báo lỗi.
  - Cột Số tiền: chỉ nhận số nguyên lớn hơn 0.
    - Chọn ô hiện lời nhắc vàng “Dữ liệu kiểu số — Giá trị lớn hơn 0” (Input Message).
    - Nhập sai hiện hộp thoại “Dữ liệu nhập sai” với Retry / Cancel / Help như Hình 9a.12.
  - Thanh trạng thái dưới bảng ghi quy tắc của ô, ví dụ “✅ Xác thực: số nguyên (Whole number) lớn hơn 0”.
- **Việc thiết lập Data Validation** (Settings, Input Message, Error Alert) HS làm trên Excel thật theo SGK. App có hướng dẫn từng bước và hình SGK.

## 2. Cách mở và chạy
- **Một máy chiếu:** mở `index.html`, bấm phím `F` để toàn màn hình.
- **Cả lớp:**
  1. Vào bảng GV, chọn lớp và “Bài 9a: Sử dụng công cụ xác thực dữ liệu”.
  2. Bấm ▶ Bắt đầu.
  3. Chiếu mã vào lớp.
  4. Bấm 📺 để trình chiếu.
- **Gợi ý thao tác khi trình chiếu:** chọn ô D6 cho cả lớp thấy lời nhắc, gõ -200 rồi Enter để hiện thông báo lỗi; bấm Retry để nhập lại, Cancel để huỷ.
- **Phiếu tự kiểm tra:** nhóm tick và gửi GV; tab ✍️ Tự luận hiện từng phiếu, màn chiếu thống kê cả lớp.

## 3. Kiến thức trọng tâm
1. **Data Validation** hạn chế kiểu hoặc giá trị dữ liệu nhập vào ô → dữ liệu chính xác.
2. **Lệnh:** Data → Data Tools → Data Validation.
   - Ô Allow: Any value, Whole number, Decimal, List, Date, Time, Text length, Custom.
3. **List + Source (=$F$2:$F$10):** danh sách thả xuống.
4. **Whole number > 0:** Minimum 0.
   - Input Message: lời nhắc khi chọn ô.
   - Error Alert: thông báo khi nhập sai (Stop chặn dữ liệu sai).

## 4. Lưu ý
- **Cột Số tiền:** app theo SGK (Whole number, greater than 0). Giáo án có chỗ ghi “0 – 5.000”; nếu muốn, thầy/cô cho HS làm thêm trên Excel với between 0 và 5000.
- **Đáp án Luyện tập (giáo án):** 1B, 2A, 3C, 4D.
- **Hành vi giống Excel thật:**
  - Gõ đúng một mục trong danh sách vẫn được nhận.
  - Dán dữ liệu (Ctrl+V) không bị kiểm tra.
  - Thêm mục mới vào cột F ngoài vùng Source thì mục đó không xuất hiện trong danh sách.
