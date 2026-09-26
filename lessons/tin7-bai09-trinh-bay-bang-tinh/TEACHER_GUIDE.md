# HƯỚNG DẪN GIÁO VIÊN — TIN 7, BÀI 9: TRÌNH BÀY BẢNG TÍNH

## 1. Giới thiệu nhanh
- Bài gồm 2 tiết, 16 màn hoạt động, 53 bài chấm tự động và 1 phiếu tự kiểm tra gửi GV.
- **Thao tác định dạng, trình bày** (Format Cells, Insert/Delete/Hide/Unhide, Merge & Center) HS làm trên Excel với tệp THXanh.xlsx.
  - App có hình SGK, bảng so sánh trước/sau định dạng, câu hỏi và trò chơi củng cố.
- **Bảng tính mô phỏng** dùng cho phần công thức, hàm; kết quả khớp đúng từng số trong Hình 9.12 và 9.13.
  - Khởi động (Hình 9.1).
  - Tỉ lệ =D4/C4 (Hình 9.3).
  - Tính chất hàm (Hình 9.12) có ô chữ “Không / Đang làm / ???”.
  - Thực hành Chi phí (Trang tính 5).
  - Vận dụng (Bảng 5, tỉ lệ so với chỉ tiêu).
- **Câu gõ công thức được chấm bằng cách thử đổi dữ liệu:**
  - =SUM(C5:I5) đúng.
  - Gõ thẳng kết quả (=35, =3) bị tính sai.
  - Công thức bỏ sót ô (=D5+E5+F5) bị tính sai, vì khi “Đang làm” được cập nhật thành số, kết quả sẽ sai.

## 2. Cách mở và chạy
- **Một máy chiếu:** mở `index.html`, bấm phím `F` để toàn màn hình.
- **Cả lớp:**
  1. Vào bảng GV, chọn lớp và “Bài 9: Trình bày bảng tính”.
  2. Bấm ▶ Bắt đầu.
  3. Chiếu mã vào lớp.
  4. Bấm 📺 để trình chiếu.
- **Phiếu tự kiểm tra Trang tính 5:** các nhóm tick và gửi GV. Tab ✍️ Tự luận hiện từng phiếu; màn chiếu thống kê số nhóm Đã làm / Chưa làm theo từng việc.

## 3. Kiến thức trọng tâm
1. **Format Cells:**
   - Decimal places, Use 1000 Separator (,).
   - Percentage.
   - Date với Locale Vietnamese.
2. **Định dạng chỉ đổi cách hiển thị:** nhập ngày vẫn theo mm/dd/yyyy; ngày cộng được với số ngày, trừ được cho nhau.
3. **Chuột phải vào tên hàng/cột:** Insert (hàng mới ở trên, cột mới ở bên trái), Delete, Hide, Unhide.
4. **Merge & Center:** chỉ gộp vùng hình chữ nhật; ô gộp giữ địa chỉ và dữ liệu của ô đầu tiên bên trái.
5. **Tính chất hàm:** SUM, AVERAGE, COUNT, MIN, MAX bỏ qua ô văn bản và ô trống.

## 4. Lưu ý
- **Vận dụng 2:** theo lựa chọn của thầy/cô, app tính theo đề SGK: tỉ lệ = Tổng số cây / 50 → 112%, 70%, 126%, 150%, 116%. Đáp án trong giáo án (=L4/L25) là tỉ lệ so với tổng 623 cây.
- **Câu hỏi HĐ2.3:** app dùng =COUNT(C6:I6) như SGK, vì câu a trong giáo án bị ghi khác.
- **Đáp án cần nhớ:**
  - COUNT(C6:I6) = 3.
  - AVERAGE(C7:I7) = 15.
  - MAX(C4:I8) = 20.
  - SUM(C4:I8) = 190.
  - Chi phí toàn dự án N25 = 30,692,200.
- **Huỷ gộp ô** (câu hỏi trong giáo án) được ghi ở mục “Mở rộng”: chọn ô đã gộp, nháy lại Merge & Center.
