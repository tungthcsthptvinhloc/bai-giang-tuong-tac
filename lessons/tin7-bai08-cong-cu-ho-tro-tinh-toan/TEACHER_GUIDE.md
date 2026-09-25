# HƯỚNG DẪN GIÁO VIÊN — TIN 7, BÀI 8: CÔNG CỤ HỖ TRỢ TÍNH TOÁN

## 1. Giới thiệu nhanh
- Bài gồm 2 tiết, 15 màn hoạt động, 49 bài chấm tự động và 2 câu tự luận.
- **Bảng tính mô phỏng tính được hàm** SUM, AVERAGE, MAX, MIN, COUNT:
  - tham số có thể là số, ô, vùng, hoặc nhiều vùng cách nhau bởi “,” hay “;”;
  - tên hàm viết thường vẫn được;
  - sai tên hàm báo #NAME?, thiếu ngoặc báo #LỖI!;
  - Ctrl+C / Ctrl+V (trên điện thoại là nút 📋 / 📥) sao chép hàm và tự dời địa chỉ.
- **Câu gõ hàm được chấm bằng cách thử đổi dữ liệu:**
  - =SUM(C4:C8) hay =C4+C5+C6+C7+C8 đều đúng;
  - gõ thẳng kết quả (=40) bị tính sai;
  - chọn nhầm vùng, ví dụ =MAX(D4:D23) lấy cả hàng tổng, bị tính sai.
- Thực hành dùng Trang tính 4 giống Hình 8.7, các hàng trống đã chèn sẵn. Kết quả mô phỏng khớp đúng từng số trong Hình 8.7.

## 2. Cách mở và chạy
- **Một máy chiếu:** mở `index.html`, bấm phím `F` để toàn màn hình.
- **Cả lớp:**
  1. Vào bảng GV, chọn lớp và “Bài 8: Công cụ hỗ trợ tính toán”.
  2. Bấm ▶ Bắt đầu.
  3. Chiếu mã vào lớp.
  4. Bấm 📺 để trình chiếu.
- Phòng máy có Excel: làm Thực hành trên tệp THXanh.xlsx. Máy hoặc điện thoại không có Excel: làm trên bảng tính mô phỏng.

## 3. Kiến thức trọng tâm
1. Hàm là công thức định nghĩa sẵn, xác định bởi tên hàm, ý nghĩa và các tham số.
2. Cú pháp: `=<tên hàm>(<các tham số>)`. Nhập hàm giống nhập công thức; có thể chọn vùng bằng chuột.
3. SUM tính tổng, AVERAGE tính trung bình, MAX tìm lớn nhất, MIN tìm nhỏ nhất, COUNT đếm các giá trị số.
4. Hàm bỏ qua ô chữ và ô trống; kết quả tự cập nhật khi dữ liệu thay đổi.

## 4. Thao tác trên bảng tính mô phỏng
| Việc | Cách làm |
|---|---|
| Nhập hàm | Chọn ô (ô tô vàng ở câu hỏi) → gõ =SUM(C4:C8) → Enter |
| Xem hàm | Chọn ô: ô hiện kết quả, vùng fx hiện hàm |
| Sao chép hàm | Chọn ô → 📋 (Ctrl+C) → chọn vùng đích (kéo chuột hoặc Shift + bấm) → 📥 (Ctrl+V) |
| Nhiều vùng tham số | =MAX(D4:D8;D11:D16;D19:D23) |
| Lỗi | #NAME? (sai tên hàm) · #LỖI! (sai cú pháp, thiếu ngoặc) · #DIV/0! (AVERAGE vùng không có số) · #VÒNG! (hàm chứa chính ô đó) |

## 5. Lưu ý
- **Câu SGK tr.42:** app chấm theo SGK (9, 1, 4). Phần “Mở rộng” cho HS biết Excel thật báo #VALUE! khi gõ chữ trực tiếp làm tham số.
- **Chỉnh so với giáo án:**
  - Phần Mở đầu dùng S = a × b cho diện tích hình chữ nhật, vì (a + b) × 2 là chu vi.
  - Sửa lỗi gõ ở đáp án Luyện tập 1 trong giáo án: K24 = SUM(K19:K23).
- **Vận dụng:** số liệu chi tiêu trong app là ví dụ. HS không gửi số tiền thật của gia đình, chỉ gửi các hàm đã dùng.
