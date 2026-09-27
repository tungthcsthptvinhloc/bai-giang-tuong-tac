# HƯỚNG DẪN GIÁO VIÊN — TIN 9, BÀI 15: BÀI TOÁN TIN HỌC

## 1. Giới thiệu nhanh
- Bài gồm 2 tiết, 15 màn hoạt động, 33 bài chấm tự động và 1 câu tự luận.
- **Máy chạy thuật toán** (4 máy: tính lương, tìm số lớn nhất, kiểm tra số nguyên tố, sắp xếp nổi bọt):
  - Hiện các bước dạng liệt kê; bước đang chạy sáng lên.
  - Khi gặp bước “Nhập”, máy hỏi và HS gõ giá trị (Enter).
  - Có bảng biến, đầu ra và nhật kí từng bước (điều kiện Đúng/Sai, giá trị gán, đổi chỗ).
  - Nút 📋 dữ liệu mẫu; ⏩ Chạy hết / ⏸ Tạm dừng; 🔄 Làm lại.
  - Không chấm điểm.
- **Trò chơi “Bài toán tin học hay không?”:** 8 tình huống, có 3 tình huống của Nhóm 2–4 trong giáo án.
- **Sơ đồ khối sắp xếp nổi bọt:** app vẽ lại (ẩn, bấm “Xem sơ đồ khối gợi ý”).

## 2. Cách mở và chạy
- **Một máy chiếu:** mở `index.html`, bấm phím `F` để toàn màn hình.
- **Cả lớp:**
  1. Vào bảng GV, chọn lớp và “Bài 15: Bài toán tin học”.
  2. Bấm ▶ Bắt đầu.
  3. Chiếu mã vào lớp.
  4. Bấm 📺 để trình chiếu.
- **Máy chạy thuật toán:** chạy được trên cả máy HS; mỗi nhóm có thể thử dữ liệu riêng.
- **Sơ đồ số nguyên tố, sơ đồ nổi bọt:** HS vẽ vào vở/giấy, gửi qua mail/Zalo khi chưa xong.

## 3. Kiến thức trọng tâm
1. Có những bước giao được cho máy tính (tính toán tiền lương).
2. Bài toán tin học = nhiệm vụ giao cho máy tính; xác định bởi đầu vào, đầu ra.
3. 4 bước: Xác định bài toán → Xây dựng thuật toán → Cài đặt thuật toán → Gỡ lỗi và hiệu chỉnh.
4. Thuật toán chỉ dùng tuần tự, rẽ nhánh, lặp.

## 4. Lưu ý
- **Theo lựa chọn của thầy/cô, app dùng đáp án SGK ở các chỗ giáo án khác SGK:**
  - Phiếu 1: “Tính toán tiền lương”.
  - Câu hỏi SGK tr.82: C. Cài đặt thuật toán (SGK: “cài đặt thuật toán thành chương trình máy tính là bước thực hiện giải pháp”).
  - Thuật toán tìm max: theo Hình 15.4a. Các bước trong giáo án gán max := 0 ngay ở bước 1 rồi quay lại bước 1, nên max bị đặt lại về 0 mỗi lần.
- **Nhiệm vụ 3:** tình huống của Nhóm 2–4 (ngày 30/4/1975, hệ bài tiết, nhiệt độ 32°C) không phải bài toán tin học, nên được đưa vào trò phân loại.
- **Vận dụng 2:** sơ đồ nổi bọt trong giáo án bị sai.
  - Vòng trong dừng ngay khi gặp cặp không cần đổi chỗ, và không kiểm tra j > i.
  - Ví dụ dãy 3, 1, 2 vẫn giữ nguyên 3, 1, 2.
  - App dùng sơ đồ đúng: i từ 1 đến N − 1, j giảm từ N đến i + 1, nếu a[j] < a[j − 1] thì đổi chỗ.
- **Máy kiểm tra số nguyên tố:** dùng sơ đồ trong giáo án (b.1–b.7). Máy chỉ nhận N là số nguyên dương.
- **Máy tính lương:** các bước liệt kê do app viết lại từ sơ đồ khối Hình 15.3.
- Giáo án gợi ý video và ChatGPT/Gemini/Copilot nhưng không có đường link, nên app không thêm nút mở.
