# HƯỚNG DẪN GIÁO VIÊN — TIN 7, BÀI 15: THUẬT TOÁN TÌM KIẾM NHỊ PHÂN

## 1. Giới thiệu nhanh
- Bài gồm 2 tiết, 16 màn hoạt động, 44 bài chấm tự động và 2 câu tự luận (Vận dụng).
- **Máy tìm kiếm nhị phân** (4 màn):
  - Giống hình minh hoạ SGK tr.75: mũi tên “vị trí giữa”, nửa bị loại mờ đi.
  - Bảng các bước lặp tự điền: vùng tìm kiếm, vị trí giữa, so sánh, kết quả.
  - Khi kết thúc, máy so sánh số bước lặp với tìm kiếm tuần tự.
  - Máy tính vị trí giữa theo công thức SGK: phần nguyên của (đầu + cuối)/2; mỗi bước lặp là một lần so sánh.
  - Màn Luyện tập và Vận dụng cho HS tự gõ danh sách, có nút 🔤 Sắp xếp; danh sách chưa sắp xếp thì máy cảnh báo.
- **Trò chơi tìm số (thẻ úp):**
  - Bạn B nhập số cần tìm rồi chọn thẻ; app đóng vai bạn A trả lời “bằng nhau / lớn hơn / bé hơn”.
  - App nhắc khi thẻ chọn chưa phải thẻ ở giữa vùng còn lại; có nút 🎲 số ngẫu nhiên (đôi khi là số không có trong thẻ).
- **Điền bảng bước lặp có chấm điểm:** tìm “Hoà” (câu hỏi SGK tr.76) và tìm “Iceland” (Luyện tập 1b). Mỗi ô là hộp chọn.

## 2. Cách mở và chạy
- **Một máy chiếu:** mở `index.html`, bấm phím `F` để toàn màn hình.
- **Cả lớp:**
  1. Vào bảng GV, chọn lớp và “Bài 15: Thuật toán tìm kiếm nhị phân”.
  2. Bấm ▶ Bắt đầu.
  3. Chiếu mã vào lớp.
  4. Bấm 📺 để trình chiếu.
- **Ô cửa bí mật:** các đội chọn ô cửa (1–6), trả lời; đúng thì mở phần thưởng.

## 3. Kiến thức trọng tâm
1. Tìm kiếm nhị phân thực hiện trên danh sách đã sắp xếp, bắt đầu từ vị trí ở giữa.
2. Bằng → dừng; nhỏ hơn → nửa trước; lớn hơn → nửa sau (nửa trước, nửa sau không gồm phần tử giữa).
3. Chừng nào chưa tìm thấy và vùng tìm kiếm còn phần tử thì còn tìm tiếp.
4. Vị trí giữa = phần nguyên của (đầu + cuối)/2.
5. Sắp xếp giúp cho việc tìm kiếm được thực hiện nhanh hơn.

## 4. Lưu ý
- **Tìm “Hoà”:** theo lựa chọn của thầy/cô, app chốt theo công thức SGK — 3 bước lặp: vị trí 5 (Mai) → vị trí 2 (Bình, vì phần nguyên của (1 + 4)/2 = 2) → vị trí 3 (Hoà). Giáo án ghi 2 bước (5 → 3).
- **Ô cửa bí mật câu 5:** đáp án A (3 bước) theo cách đếm của SGK (số lần so sánh: 7, 12, 25); giáo án ghi B (4).
- **Ô cửa bí mật câu 3:** các phương án được sửa thành “chưa tìm thấy và chưa tìm hết” cho đúng SGK (giáo án ghi “hoặc”); đáp án đúng vẫn là B.
- **Phiếu học tập số 3:** giáo án chép từ Bài 14; theo lựa chọn của thầy/cô, app thay bằng nội dung SGK (tuần tự 8 bước vs nhị phân 3 bước khi tìm “Trúc”; tên không có trong danh sách: 9 bước vs 4 bước).
- **Đáp án khác:** Trúc — vị trí 5 → 7 → 8. Iceland (danh sách đã sắp xếp) — 5 → 7 → 6 (3 bước; tuần tự Bài 14 cần 6 bước). Trò chơi tìm số: thẻ giữa đầu tiên là thẻ thứ 5; tìm 15 — 2 lượt; tìm 7 (không có) — 4 lượt.
- Giáo án gợi ý video AI nhưng không có đường link nên app không thêm nút.
