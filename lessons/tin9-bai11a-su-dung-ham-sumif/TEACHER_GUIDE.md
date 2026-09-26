# HƯỚNG DẪN GIÁO VIÊN — TIN 9, BÀI 11a: SỬ DỤNG HÀM SUMIF

## 1. Giới thiệu nhanh
- Bài gồm 2 tiết, 14 màn hoạt động, 37 bài chấm tự động và 3 phần gửi GV (phiếu tự kiểm tra, 2 câu vận dụng).
- **Bảng tính mô phỏng tính được hàm SUMIF** (có hoặc không có sum_range):
  - HS gõ công thức vào ô tô vàng, kéo **nút điền ■** để sao chép như Excel.
  - Cột G “Số lần chi/thu” có sẵn công thức COUNTIF của Bài 10a.
- **Chấm công thức bằng thử đổi dữ liệu.** App tự xáo cột khoản mục, nên các lỗi sau bị chấm sai:
  - quên $ rồi sao chép;
  - đảo range với sum_range;
  - sum_range lệch hàng hoặc sai cột;
  - gõ chữ “Ở” thay cho ô F2.

## 2. Cách mở và chạy
- **Một máy chiếu:** mở `index.html`, bấm phím `F` để toàn màn hình.
- **Cả lớp:**
  1. Vào bảng GV, chọn lớp và “Bài 11a: Sử dụng hàm SUMIF”.
  2. Bấm ▶ Bắt đầu.
  3. Chiếu mã vào lớp.
  4. Bấm 📺 để trình chiếu.
- **Gợi ý khi trình chiếu (màn “Từ "Ở" đến F2”):**
  1. Gõ `=SUMIF(B3:B10,F2,D3:D10)` vào H2, kéo ■ xuống H10.
  2. Bấm H5 cho cả lớp thấy vùng đã dời thành B6:B13 và kết quả 0.
  3. Sửa lại có $ và kéo lại để so sánh.
- **Phiếu tự kiểm tra:** nhóm tick và gửi GV; tab ✍️ Tự luận hiện từng phiếu, màn chiếu thống kê cả lớp.

## 3. Kiến thức trọng tâm
1. SUMIF tính tổng giá trị của những ô thoả mãn một điều kiện: `=SUMIF(range, criteria, [sum_range])`.
2. Không có sum_range → cộng chính các ô của range thoả mãn điều kiện.
3. Tổng tiền mỗi khoản: `=SUMIF($B$3:$B$10,F2,$D$3:$D$10)`, sao chép xuống.
4. Thêm dữ liệu → sửa cả range và sum_range; dữ liệu nhập thống nhất.

## 4. Đáp án chính
- **Mở đầu (giáo án):** 1B, 2A, 3C, 4D.
- **Chi tiêu:** H2:H10 → 920 · 8,000 · 600 · 2,200 · 620 · 0 · 300 · 1,000 · 0 (tổng 13,640).
- **Thu nhập:** `=SUMIF($B$3:$B$8,F2,$D$3:$D$8)` → 10,000 · 3,000 · 3,500 · 500 · 500 (tổng 17,500).
- **Luyện tập** (dữ liệu thêm trong app):
  - Chi tiêu: `$B$3:$B$13` / `$D$3:$D$13` → Di chuyển 680, Sức khoẻ 920, Giải trí 150.
  - Thu nhập: `$B$3:$B$10` / `$D$3:$D$10` → Thưởng 4,000, Làm thêm 4,300.
- **Vận dụng (dữ liệu minh hoạ):** Quỹ 2,360, Tài trợ 2,840; Văn phòng phẩm 330, In tài liệu 386; còn lại 4,484 (nghìn đồng).

## 5. Lưu ý
- **Thu nhập.** Giáo án ghi “sao chép sang H3 đến H8”; SGK ghi H3 đến H6 (chỉ có 5 khoản thu ở F2:F6). App theo SGK.
- **Dòng Tổng.** App thêm dòng Tổng ở trang Thu nhập theo ảnh minh hoạ trong giáo án.
- **Excel thật:** nếu sum_range chỉ ghi một ô (`$D$3`), Excel tự mở rộng cho bằng kích thước range. Bảng mô phỏng làm giống vậy, nhưng nên dạy HS ghi đủ vùng.
- **Video mở đầu.** Giáo án gợi ý video AI nhưng không kèm đường link nên app không có nút video.
