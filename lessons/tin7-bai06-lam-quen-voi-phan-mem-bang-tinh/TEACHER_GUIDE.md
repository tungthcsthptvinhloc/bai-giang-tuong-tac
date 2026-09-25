# HƯỚNG DẪN GIÁO VIÊN — BÀI 6: LÀM QUEN VỚI PHẦN MỀM BẢNG TÍNH

## 1. Giới thiệu nhanh
- **Bài:** Bài 6 — Làm quen với phần mềm bảng tính · **Lớp:** 7 (KNTT) · **Thời lượng:** 2 tiết (90 phút) · 17 màn hoạt động.
- **Điểm mới của bài:** **bảng tính mô phỏng** giống Excel ngay trong app — HS bấm ô, kéo chọn vùng, bấm tên hàng/cột,
  gõ địa chỉ vùng; có **bảng tính THỬ** để gõ dữ liệu và thấy phần mềm tự căn trái/phải. Chạy cả trên điện thoại.
- Trò chơi luyện tập **“Cừu vui vẻ và Sói xám”** (mỗi câu đúng một chú cừu 🐑 về nhà, sai thì Sói 🐺 rung lên).

## 2. Cách mở & chạy
- **Một máy chiếu:** mở `index.html` bằng Chrome/Edge (không cần Internet) → phím `F` toàn màn hình.
- **Cả lớp cùng làm (phòng máy / điện thoại):** bảng GV → chọn lớp + “Bài 6: Làm quen với phần mềm bảng tính” → **▶ Bắt đầu**.
  Hệ thống tự sinh **mã vào lớp 4 chữ số** và chiếu mã + QR. HS mở trang web → nhập mã (quét QR thì tự điền) → chọn máy → chọn tên.
  Bấm **📺 Mở bài giảng để trình chiếu** để giảng; bảng 📊 góc phải hiện kết quả lớp và mã 🔑.
- Sửa nội dung: mở `data/lesson.js`, sửa chữ trong dấu nháy, lưu, tải lại trang. Sau khi sửa chạy `node tools/update-lessons.js`.

## 3. Kiến thức trọng tâm (Core Knowledge)
1. Phần mềm bảng tính: lưu & trình bày dữ liệu dạng bảng, tính toán, vẽ biểu đồ; dữ liệu đổi → kết quả tự cập nhật.
2. Giao diện: thẻ & nhóm lệnh, hộp địa chỉ, vùng nhập dữ liệu, trang tính (hàng số – cột chữ); ô hiện thời viền đậm.
3. Địa chỉ ô = tên cột + tên hàng (B6); địa chỉ vùng = ô trên trái : ô dưới phải (B4:E11); vùng là hình chữ nhật.
4. Nhập: gõ vào ô / vùng nhập dữ liệu, Enter kết thúc; văn bản căn trái, số & ngày tháng căn phải.
5. Định dạng: chọn vùng → nhóm Font, Alignment của thẻ Home.

## 4. Điều khiển
| Phím / nút | Tác dụng |
|---|---|
| `→` / `Space` · `←` | Màn tiếp · quay lại |
| `1 2 3 4` · `Enter` | Chọn đáp án A–D · bấm nút chính |
| `F` · `T` | Toàn màn hình · chế độ giáo viên (nhảy hoạt động, hiện/ẩn đáp án, làm lại) |
| ⏱️ ✏️ 🖍️ 🔦 🔲 | Đồng hồ · bút vẽ · bút dạ quang · đèn pin · khung phóng to |
| **Trên bảng tính mô phỏng** | Bấm ô · kéo chuột chọn vùng · bấm tên cột/hàng · Shift+bấm để mở rộng vùng |
| **Trên bảng tính THỬ** | Chọn ô rồi gõ (con trỏ ở vùng nhập dữ liệu) · Enter xuống ô dưới · nháy đúp để sửa trong ô · chọn vùng + Delete (hoặc 🧽) để xoá · nháy đúp tên trang tính để đổi tên |

## 5. Tiến trình & gợi ý tổ chức (thời gian theo giáo án)
| # | Màn | Thời gian | Tổ chức | Gợi ý |
|---|---|---|---|---|
| 1 | Mở đầu — Dự án Trường học xanh | 5' | Nhóm trình bày bài chuẩn bị ở nhà | Bấm “Gợi ý sản phẩm dự kiến” sau khi nhóm trình bày |
| 2 | 2.1 Giao diện | 8' | Nhóm 6, phiếu học tập 1 | Cho HS bấm vào bảng tính THỬ để “khám phá” hộp địa chỉ |
| 3 | Ghép tên — chức năng | 4' | Nhóm | Bật theo nhịp GV + bấm giờ; Kết thúc để công bố |
| 4 | Câu hỏi nhanh A/B/C/D | 2' | Cá nhân/nhóm | Đáp án 1.A, 2.B |
| 5 | 2.2 Ô và địa chỉ ô | 4' | Cá nhân/cặp | Hỏi “cột nào, hàng nào?” trước khi cho bấm |
| 6 | 2.2 Vùng & thao tác chọn | 6' | Cặp | Câu 1 gõ địa chỉ; câu 2–5 thao tác trên lưới |
| 7 | Thử thách ô và vùng | 3' | Cặp | Câu cuối kiểm chứng A5:B10 = 12 ô |
| 8 | 2.3 Nhập & sửa dữ liệu | 5' | Nhóm, phiếu học tập 2 (câu 1, 2) | Nhập dữ liệu Hình 6.5 vào bảng THỬ hoặc Excel |
| 9 | Tự căn trái hay căn phải? | 3' | Nhóm | Hỏi vì sao “Tổ 3” căn trái |
| 10 | 2.3 Định dạng | 3' | Cả lớp, phiếu 2 (câu 3, 4) | So sánh Hình 6.5 – 6.8 |
| 11 | Nút lệnh nào? | 2' | Nhóm | |
| 12 | Thực hành — khởi động | 3' | Cặp | Luyện tập SGK tr.33 |
| 13 | Sắp xếp các bước | 2' | Nhóm | Làm “bản đồ” trước khi thực hành |
| 14 | Thực hành THXanh.xlsx | 15' | Cặp / cá nhân trên Excel | Thu bài bằng NetSupport/ClassPoint; 2 câu kiểm tra cuối |
| 15 | Luyện tập — Cừu vui vẻ và Sói xám | 4' | Nhóm | Đáp án 1C 2B 3A 4C 5D 6A |
| 16 | Vận dụng | 5' + ở nhà | Nhóm; Bài 2 nộp Padlet/Azota | Cho gõ 12/15/2020 và 15/12/2020 vào bảng THỬ |
| 17 | Tổng kết | 3' | Cả lớp | Chiếu 🏆 Xếp hạng, xuất Excel |

## 6. Đánh giá (chế độ lớp học)
- 37 bài chấm tự động (33 câu + 4 bài ghép đôi/phân loại/sắp xếp), 2 câu tự luận GV đọc ở tab ✍️.
- Ghép đôi / phân loại / sắp xếp: chấm theo **kết quả cuối của bài nộp** (tỉ lệ mục đúng); HS thấy ✓/✗ từng mục sau khi có kết quả.
- Câu bảng tính: đúng địa chỉ ô/vùng/hàng/cột là đúng (viết ngược E11:B4 vẫn được tính là B4:E11).
- Chưa dạy hết trong tiết 1: tab ⚙️ Tính điểm → “Chỉ tính tới hoạt động GV đang chiếu”; tiết 2 dùng 🕘 Lịch sử → ▶ Mở lại (mã vào lớp mới).
- Tiêu chí chấm sản phẩm vận dụng (Câu 2): theo bảng tiêu chí trong giáo án (≥ 5 loại cây; ≥ 4 định dạng: phông, kiểu chữ, màu chữ, căn lề, độ rộng hàng/cột).

## 7. Lưu ý nội dung
- **[CẦN GIÁO VIÊN KIỂM TRA]** Giáo án (HĐ2.3, kết luận nhiệm vụ 1) ghi “số, ngày tháng… tự động **căn trái**”; SGK tr.31 ghi **căn phải** — app theo SGK.
- Bảng tính mô phỏng hiểu ngày tháng theo kiểu **tháng/ngày/năm** (như Excel cài đặt Anh – Mỹ trong SGK). Nếu máy phòng
  máy cài định dạng Việt Nam thì Excel thật sẽ cho kết quả ngược lại — nên nói rõ với HS khi làm Vận dụng Bài 1.
- Phần “Năng lực AI” của giáo án nói về Sắp xếp/Lọc dữ liệu — không thuộc Bài 6 nên chưa đưa vào app.
