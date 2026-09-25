# PHÂN TÍCH BÀI HỌC — BÀI 6: LÀM QUEN VỚI PHẦN MỀM BẢNG TÍNH

## 1. Thông tin bài học
- **Môn / Lớp:** Tin học · Lớp 7
- **Bộ sách:** Kết nối tri thức với cuộc sống
- **Tên bài:** Bài 6 — Làm quen với phần mềm bảng tính
- **Chủ đề:** Chủ đề 4 — Ứng dụng tin học
- **Số tiết / thời lượng:** 2 tiết (~90 phút)
- **Trang SGK:** 28–33

## 2. Mục tiêu (trích từ giáo án)
- **Kiến thức:** khái niệm, chức năng cơ bản của phần mềm bảng tính; nhập liệu, chỉnh sửa, định dạng đơn giản (phông chữ, màu nền, căn chỉnh, độ rộng cột).
- **Năng lực chung:** tự chủ, tự học; giao tiếp và hợp tác nhóm.
- **Năng lực số:** 3.1.TC1a (nhận biết biểu tượng, khởi động, tạo bảng tính mới, nhận biết giao diện, lưu tệp THXanh.xlsx); 3.1.TC1b (nhập văn bản/số/ngày tháng, hai cách nhập, Enter kết thúc, sửa, xoá bằng Delete, nhận biết tự căn chỉnh).
- **Năng lực AI:** 7.C4.1 — dùng AI hỗ trợ tìm hiểu, luôn đối chiếu SGK, dùng an toàn, có trách nhiệm.
- **Phẩm chất:** chăm chỉ, trách nhiệm (nội quy phòng máy, an toàn điện).

## 3. Yêu cầu cần đạt
- Nêu được chức năng cơ bản của phần mềm bảng tính và các vùng chính của giao diện.
- Xác định đúng địa chỉ ô, địa chỉ vùng; chọn được ô, hàng, cột, vùng.
- Nhập, sửa, xoá, định dạng dữ liệu đơn giản; giải thích vì sao dữ liệu tự căn trái/phải.
- Hoàn thành bảng THXanh.xlsx theo mẫu Hình 6.7 – 6.8.

## 4. Thiết bị / dữ liệu / học liệu
- Phòng máy có Excel (hoặc Google Sheets / LibreOffice Calc), máy chiếu.
- Ứng dụng bài giảng này: chạy offline (mở `index.html`) hoặc qua hệ thống lớp học (mọi máy/điện thoại cùng làm).
- Ảnh SGK tr.28–33 và các hình 6.1–6.8 trong `assets/sgk/` (nút “🖼️ Xem ảnh SGK”, phóng to được).
- Phiếu học tập số 1, 2 (giáo án); Padlet/Azota cho phần vận dụng.

## 5. CORE KNOWLEDGE — 5 điều học sinh NHẤT ĐỊNH phải nhớ
1. Phần mềm bảng tính: lưu & trình bày dữ liệu **dạng bảng**, **tính toán**, **vẽ biểu đồ**; dữ liệu gốc đổi → kết quả **tự cập nhật**.
2. Giao diện: thẻ & nhóm lệnh, **hộp địa chỉ**, **vùng nhập dữ liệu**, trang tính (hàng 1, 2, 3… · cột A, B, C…); **ô hiện thời** có viền đậm.
3. **Địa chỉ ô = tên cột + tên hàng** (B6); **địa chỉ vùng = ô trên trái : ô dưới phải** (B4:E11); vùng luôn là **hình chữ nhật**.
4. Nhập: gõ vào ô hoặc vùng nhập dữ liệu, **Enter** để kết thúc; **văn bản căn trái, số và ngày tháng căn phải**.
5. Định dạng: **chọn vùng** → lệnh nhóm **Font** và **Alignment** của thẻ **Home**.

## 6. BẢNG ÁNH XẠ HOẠT ĐỘNG

| # | Hoạt động (giáo án) | id trong app | Nội dung SGK | Hình thức app | Kiểu tương tác | Kiến thức chốt |
|---|---|---|---|---|---|---|
| 1 | HĐ1 Mở đầu (5') | `khoi-dong` | tr.28 Dự án Trường học xanh | Thẻ 4 câu hỏi dự án + bảng sản phẩm dự kiến (ẩn) | Trắc nghiệm chọn phần mềm | Cần phần mềm bảng tính |
| 2 | HĐ2.1 Giao diện (15') — nhiệm vụ 1 | `giao-dien` | tr.28–29, Hình 6.1 | Bảng tính THỬ giống Hình 6.1 (bấm ô → hộp địa chỉ đổi) + kiến thức ẩn | Chọn nhiều đáp án (phiếu 1, câu 1) | Khái niệm, các vùng giao diện |
| 3 | HĐ2.1 — phiếu 1 câu 2 | `ghep-giao-dien` | Hình 6.1 | Trò chơi ghép tên – chức năng (7 cặp) | Ghép đôi (làm hết rồi nộp) | Chức năng từng vùng |
| 4 | HĐ2.1 — nhiệm vụ 2 (thẻ A/B/C/D) | `hoi-nhanh` | Câu hỏi SGK tr.29 | Quiz 2 câu | Trắc nghiệm | Ô = giao hàng–cột; tên hàng là số |
| 5 | HĐ2.2 Ô và vùng — nhiệm vụ 1 | `dia-chi-o` | tr.30, Hình 6.2 | **Bảng tính mô phỏng** Hình 6.2 | Bấm ô (B6, F9) + trắc nghiệm quy tắc | Địa chỉ ô |
| 6 | HĐ2.2 — nhiệm vụ 2 | `vung-du-lieu` | tr.30, Hình 6.3 | **Bảng tính mô phỏng** Hình 6.3 | Gõ địa chỉ vùng tô màu; kéo chọn D7:F9; chọn hàng 6, cột D; chọn vùng C9:E12 | Địa chỉ vùng, thao tác chọn |
| 7 | HĐ2.2 — nhiệm vụ 3 | `thu-thach-vung` | Câu hỏi SGK tr.31 | Quiz 3 câu + kiểm chứng trên lưới | Đúng/sai, trắc nghiệm, chọn vùng A5:B10 | Một ô là một vùng; A5:B10 = 12 ô; không có vùng tam giác |
| 8 | HĐ2.3 Nhập, sửa (12') — nhiệm vụ 1 | `nhap-du-lieu` | tr.31, Hình 6.4–6.5 | Bảng tính THỬ nhập dữ liệu Hình 6.5 + kiến thức ẩn | Trắc nghiệm (Enter, ô hiện thời khi chọn vùng, cách sửa) | 2 cách nhập, 2 cách sửa, tự căn chỉnh |
| 9 | HĐ2.3 — củng cố căn chỉnh | `phan-loai-can-le` | Hình 6.5 | Trò chơi phân loại 8 dữ liệu | Phân loại (làm hết rồi nộp) | Văn bản trái / số, ngày phải |
| 10 | HĐ2.3 — nhiệm vụ 2 (định dạng) | `dinh-dang` | tr.32, Hình 6.6, 6.8 | Ảnh lệnh định dạng + các bước (ẩn) | Trắc nghiệm | Chọn vùng → Font/Alignment |
| 11 | HĐ2.3 — nút lệnh | `nut-lenh` | Hình 6.6 | Ghép nút lệnh – chức năng (7 cặp) | Ghép đôi | Chức năng nút B, I, U, màu nền, màu chữ… |
| 12 | HĐ2.4 Thực hành (30') — nhiệm vụ 1 | `khoi-dong-thuc-hanh` | Luyện tập tr.33 | Bảng tính THỬ xoá vùng + quiz 2 câu | Trắc nghiệm | Delete xoá vùng; 2 cách nhập |
| 13 | HĐ2.4 — quy trình | `cac-buoc-thuc-hanh` | tr.32–33 | Sắp xếp 5 bước | Sắp xếp (làm hết rồi nộp) | Quy trình thực hành |
| 14 | HĐ2.4 — nhiệm vụ 2 | `thuc-hanh` | Hình 6.7, 6.8 | Làm trên Excel; bảng tính THỬ cho máy không có Excel; 2 câu kiểm tra | Chọn hàng 3, vùng A3:A8 | Sản phẩm THXanh.xlsx |
| 15 | HĐ3 Luyện tập (4') | `luyen-tap` | 6 câu của giáo án | Trò chơi **Cừu vui vẻ và Sói xám** (🐑 về nhà, 🐺 đuổi) | Trắc nghiệm | Ôn toàn bài |
| 16 | HĐ4 Vận dụng (10' + ở nhà) | `van-dung` | Vận dụng tr.33 | Bảng tính THỬ gõ 12/15/2020 và 15/12/2020; 2 câu tự luận gửi GV | Tự luận nhóm | Kiểu ngày tháng/ngày/năm |
| 17 | Tổng kết | `tong-ket` | — | Hôm nay em đã học + từ khoá + 2 câu thử thách | Trắc nghiệm, chọn vùng B2:C4 | 5 core knowledge |

## 7. Ghi chú đối chiếu tài liệu
- Giáo án (HĐ2.3, phần Kết luận nhiệm vụ 1) ghi “Dữ liệu số, ngày tháng… sẽ tự động **căn trái**” — **SGK tr.31 ghi căn phải**. App dùng theo SGK (căn phải).
- Mục tiêu giáo án ghi “chức năng cơ bản của phần mềm **máy tính**” — hiểu là phần mềm **bảng tính**.
- Phần “Năng lực AI” trong giáo án nhắc tới Sắp xếp (Sort) / Lọc (Filter) và “học sinh lớp 8” — nội dung này không thuộc Bài 6 nên app không đưa vào. [CẦN GIÁO VIÊN KIỂM TRA] nếu muốn bổ sung.
- Hình 6.1 và Hình 6.2 có điểm số khác nhau (SGK in như vậy); app chép đúng từng hình.
