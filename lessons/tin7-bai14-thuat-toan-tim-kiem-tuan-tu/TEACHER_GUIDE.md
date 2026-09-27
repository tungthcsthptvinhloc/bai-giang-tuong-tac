# HƯỚNG DẪN GIÁO VIÊN — TIN 7, BÀI 14: THUẬT TOÁN TÌM KIẾM TUẦN TỰ

## 1. Giới thiệu nhanh
- Bài gồm 2 tiết, 13 màn hoạt động, 32 bài chấm tự động và 2 câu tự luận (Vận dụng).
- **Máy tìm kiếm tuần tự** (3 màn: khách hàng, tên nước, tủ sách):
  - Gõ giá trị cần tìm, bấm ▶ Bước tiếp: thẻ đang xét sáng lên; bảng lần lặp tự điền Sai/Đúng, “–”, “Tìm thấy ở vị trí số k” hoặc “Không tìm thấy”.
  - ⏩ Chạy hết: chạy đến khi dừng · 🔄 Làm lại: xét lại từ đầu.
  - Không phân biệt chữ hoa/thường.
  - Màn tủ sách cho HS tự gõ danh sách (cách nhau bởi dấu phẩy).
- **Điền bảng lần lặp có chấm điểm:** Bảng 14.2 (Thanh Trúc) và Bảng 14.3 (Iceland). Mỗi ô là hộp chọn Đúng/Sai; ô đầu ra chọn trong danh sách. Máy HS làm hết rồi nộp; bảng GV chấm và thống kê.
- **Ghép sơ đồ khối** Hình 14.1: các khối có hình dạng như sơ đồ (bắt đầu, nhập, xử lí, điều kiện).

## 2. Cách mở và chạy
- **Một máy chiếu:** mở `index.html`, bấm phím `F` để toàn màn hình.
- **Cả lớp:**
  1. Vào bảng GV, chọn lớp và “Bài 14: Thuật toán tìm kiếm tuần tự”.
  2. Bấm ▶ Bắt đầu.
  3. Chiếu mã vào lớp.
  4. Bấm 📺 để trình chiếu.
- **Trò chơi Tiếp sức:** hai đội chơi trên bảng lớp; các nhóm còn lại làm màn “Tiếp sức” trên máy. Sau đó GV chạy máy tìm kiếm tên nước để kiểm tra.

## 3. Kiến thức trọng tâm
1. Tìm kiếm tuần tự thực hiện tìm lần lượt từ đầu đến cuối danh sách, chừng nào chưa tìm thấy và chưa tìm hết thì còn tìm tiếp.
2. Cấu trúc lặp; hai điều kiện dừng: đúng giá trị cần tìm? đã hết danh sách?
3. Tìm thấy → “Tìm thấy” và vị trí; hết danh sách → “Không tìm thấy”.
4. Mô tả bằng ngôn ngữ tự nhiên 5 bước (SGK tr.73), sơ đồ khối, bảng lần lặp.

## 4. Lưu ý
- **Input:** theo lựa chọn của thầy/cô, app chốt Input theo giáo án là “Danh sách khách hàng” (SGK ghi thêm “họ tên khách hàng cần tìm”). Sơ đồ khối Hình 14.1 trong SGK vẫn có khối nhập “Danh sách khách hàng, Họ tên khách hàng yêu cầu”.
- **Đáp án:** Bảng 14.2 — lần lặp 2, 3: Sai – Sai; lần lặp 4: Đúng → Xóm 2, Lục Xuân (4 lần lặp). Bảng 14.3 — lần lặp 2–5: Sai – Sai; lần lặp 6: Iceland Đúng → Tìm thấy ở vị trí số 6. Câu hỏi SGK tr.73: 1-D, 2-B. Tủ sách lớp: Hóa học — 7 lần lặp.
- Giáo án gợi ý video AI, Scratch / Blockly Games / Code.org nhưng không có đường link cụ thể nên app không thêm nút.
