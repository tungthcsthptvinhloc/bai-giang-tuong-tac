# HƯỚNG DẪN GIÁO VIÊN — TIN 9, BÀI 10a: SỬ DỤNG HÀM COUNTIF

## 1. Giới thiệu nhanh
- Bài gồm 2 tiết, 16 màn hoạt động, 48 bài chấm tự động và 3 phần gửi GV (phiếu tự kiểm tra, 2 câu vận dụng).
- **Bảng tính mô phỏng tính được hàm COUNTIF:**
  - HS gõ công thức vào ô tô vàng; có thể dùng dấu `,` hoặc `;` như Excel tiếng Việt.
  - **Nút kéo điền ■:** ô vuông nhỏ ở góc dưới phải vùng chọn. Kéo xuống để sao chép công thức như Excel; địa chỉ có $ giữ nguyên. Dùng được cả trên điện thoại.
  - Ngoài ra vẫn có 📋 Sao chép / 📥 Dán.
- **Chấm công thức bằng thử đổi dữ liệu.** App tự xáo dữ liệu cột Khoản chi / Khoản thu / Tên trường. Vì vậy các lỗi sau bị chấm sai dù kết quả hiện tại trông giống:
  - quên $ rồi sao chép;
  - chọn thiếu hàng;
  - chọn sai cột;
  - gõ chữ trực tiếp khi đề yêu cầu dùng ô F2, D2.

## 2. Cách mở và chạy
- **Một máy chiếu:** mở `index.html`, bấm phím `F` để toàn màn hình.
- **Cả lớp:**
  1. Vào bảng GV, chọn lớp và “Bài 10a: Sử dụng hàm COUNTIF”.
  2. Bấm ▶ Bắt đầu.
  3. Chiếu mã vào lớp.
  4. Bấm 📺 để trình chiếu.
- **Gợi ý khi trình chiếu (màn Câu hỏi SGK tr.43):**
  1. Gõ `=COUNTIF(B3:B10,F2)` vào G2, kéo ■ xuống G10.
  2. Bấm G5 cho cả lớp thấy công thức đã thành `B6:B13` và kết quả 0.
  3. Sửa G2 thành `$B$3:$B$10`, kéo lại để so sánh.
- **Phiếu tự kiểm tra:** nhóm tick và gửi GV; tab ✍️ Tự luận hiện từng phiếu, màn chiếu thống kê cả lớp.

## 3. Kiến thức trọng tâm
1. COUNTIF đếm số ô trong vùng (range) thoả mãn điều kiện (criteria): `=COUNTIF(range, criteria)`.
2. Điều kiện `">100"`, `"Yes"`, `"Y*"` đặt trong ngoặc kép; điều kiện là ô (D2, F2) thì không cần ngoặc kép.
3. `$B$3:$B$10` cố định vùng khi sao chép; F2 tự đổi thành F3, F4…
4. Thêm dữ liệu → mở rộng vùng range.

## 4. Đáp án chính
- **Chi tiêu:** G2:G10 = `=COUNTIF($B$3:$B$10,F2)` → 2, 1, 1, 1, 1, 0, 1, 1, 0.
- **Thu nhập:** G2:G6 = `=COUNTIF($B$3:$B$8,F2)` → 1, 1, 2, 1, 1.
- **Bảng điểm (giáo án):**
  - `=COUNTIF(B2:B16,">=8")` = 6.
  - `=COUNTIF(B2:B16,"<5")` = 3.
  - `=COUNTIF(C2:C16,"Nữ")` = 7.
  - Mở rộng — loại Khá: `=COUNTIF(B2:B16,">=6.5")-COUNTIF(B2:B16,">=8")` = 5, hoặc dùng COUNTIFS.
- **Luyện tập Bài 1 (giáo án):** 1D, 2D, 3C, 4B.
- **Luyện tập 1:** thêm 3 hàng → `=COUNTIF($B$3:$B$13,F2)`.
- **Luyện tập 2:** E5:E8 = `=COUNTIF($B$4:$B$13,D5)` → A 3, B 2, C 3, D 2.
- **Vận dụng (dữ liệu minh hoạ):** Quỹ 4, Tài trợ 5; Văn phòng phẩm 5, In tài liệu 6.

## 5. Lưu ý
- **Công thức Bài 2, Bài 3 trong giáo án.** Giáo án ghi thiếu hoặc lỗi dấu $ và gõ nhầm (“COUTIF”, “F3”, “B4:$$B:$13”). App theo SGK (có $). Nếu HS dùng công thức không có $ rồi sao chép thì kết quả sai, đúng như câu hỏi b tr.43.
- **Dấu ngăn cách.** Giáo án dùng dấu `;` ở Bài 1 câu 3, 4; app viết theo SGK (dấu `,`). Máy tính cài vùng miền Việt Nam, Excel thật dùng `;`.
- **Vận dụng.** App theo SGK: số lần thu của mỗi khoản thu và số lần chi của mỗi khoản chi.
- **Video mở đầu.** Giáo án gợi ý video AI nhưng không kèm đường link nên app không có nút video; nếu có video, thầy/cô mở riêng khi dạy.
