# HƯỚNG DẪN GIÁO VIÊN — TIN 9, BÀI 13a: HOÀN THIỆN BẢNG TÍNH QUẢN LÍ TÀI CHÍNH GIA ĐÌNH

## 1. Giới thiệu nhanh
- Bài gồm 2 tiết, 15 màn hoạt động, 45 bài chấm tự động và 1 câu tự luận (Vận dụng).
- **Thí nghiệm cập nhật tự động:**
  - Ba khung Thu nhập – Chi tiêu – Tổng hợp. Sửa số tiền ở hai trang nguồn thì H7, H11, B14, B15, Giá trị NET và biểu đồ cột đổi ngay.
  - NET âm thì hiện cảnh báo. Nút ↺ trả về số liệu SGK.
  - Chỉ minh hoạ, không chấm.
- **Trò chơi “Thám tử săn lỗi công thức”:** 6 hộp, mỗi hộp một công thức lỗi:
  - thiếu dấu nháy;
  - thiếu dấu !;
  - sai địa chỉ ô;
  - sai tên trang tính;
  - đảo thứ tự NET;
  - tham chiếu vòng.
- **Luyện tập “Chăm sóc cây xanh”:** 7 câu của giáo án; đúng thì cây non 🌱 lớn thành cây xanh 🌳.

## 2. Cách mở và chạy
- **Một máy chiếu:** mở `index.html`, bấm phím `F` để toàn màn hình.
- **Cả lớp:**
  1. Vào bảng GV, chọn lớp và “Bài 13a”.
  2. Bấm ▶ Bắt đầu.
  3. Chiếu mã vào lớp.
  4. Bấm 📺 để trình chiếu.
- **Trò chơi cây xanh theo đội:** chạy trên màn trình chiếu; GV bấm đáp án của đội giành quyền.
- **Thực hành (công thức tham chiếu, biểu đồ):** HS làm trên Excel thật, app hỏi kiểm tra bằng trắc nghiệm.
- **Video mở đầu:** thầy/cô tự mở ngoài app.

## 3. Kiến thức trọng tâm
1. Trang Tổng hợp lấy dữ liệu từ trang Thu nhập, Chi tiêu.
2. `='Thu nhập'!H7` = tên trang tính + dấu chấm than + địa chỉ ô.
3. B14 `='Thu nhập'!H7`, B15 `='Chi tiêu'!H11`, tự cập nhật.
4. Giá trị NET = thu − chi: B16 `=B14-B15` = 3,860.
5. Biểu đồ Clustered Column từ A13:B15, đặt ở A2:B12.

## 4. Lưu ý
- **Theo lựa chọn của thầy/cô:**
  - Không mô phỏng bảng tính nhiều trang.
  - Luyện tập, Vận dụng theo giáo án; không thêm Vận dụng SGK (Triển lãm tin học).
  - Trò chơi: câu 5 giữ đáp án giáo án, bỏ câu 6 (hàm OR).
  - Không thêm nút mở video.
- **Đáp án trò chơi cây xanh** (7 câu): B · A · C · D · A · B · D.
- **Vận dụng** (dữ liệu minh hoạ lấy lại từ Bài 11a):
  - Thu thêm Thưởng dự án 1,000 và Dạy kèm 800 → B14 = 19,300.
  - Chi thêm 300 + 150 + 80 → B15 = 14,170.
  - NET = 5,130.
  - Công thức SUMIF ở trang Thu nhập sửa thành `=SUMIF($B$3:$B$10,F2,$D$3:$D$10)`.
- Giáo án gợi ý ChatGPT/Gemini/Copilot nhưng không có đường link, nên app chỉ có một dòng gợi ý hỏi AI kèm nhắc kiểm chứng.
