# HƯỚNG DẪN GIÁO VIÊN — TIN 7, BÀI 16: THUẬT TOÁN SẮP XẾP

## 1. Giới thiệu nhanh
- Bài gồm 2 tiết, 16 màn hoạt động, 34 bài chấm tự động và 2 câu tự luận (Vận dụng).
- **Máy mô phỏng sắp xếp** (nổi bọt, sắp xếp chọn):
  - Tô đỏ cặp đang so sánh; thẻ nhảy lên khi hoán đổi; vị trí đã đúng tô xám như SGK.
  - Bảng ghi dãy sau mỗi lần so sánh theo từng vòng lặp. Nút ▶ Bước tiếp / ⏩ Chạy hết / 🔄 Làm lại; HS gõ dãy khác được.
  - Nổi bọt có nút chọn chiều duyệt: **Từ cuối dãy (SGK)** — số nhỏ nổi lên đầu; **Từ đầu dãy (mở rộng)** — số lớn chìm về cuối, như phần nhận xét trong giáo án.
- **Chế độ “Em tự làm”:**
  - HS bấm “Hoán đổi” hoặc “Không hoán đổi” cho từng cặp được tô đỏ.
  - Máy báo sai ngay, giải thích và đếm số lần sai (luyện tập, không tính điểm).
  - Có ở nổi bọt (12, 5, 8, 3, 9), sắp xếp chọn (9, 4, 7, 1, 6) và Luyện tập (3, 2, 4, 1, 5 — chọn được thuật toán).
- **Phiếu học tập 1, 2:** 10 dãy mỗi phiếu, mỗi dãy chọn trong hộp chọn; máy HS làm hết rồi nộp, bảng GV chấm (mỗi dãy 1 điểm như giáo án).

## 2. Cách mở và chạy
- **Một máy chiếu:** mở `index.html`, bấm phím `F` để toàn màn hình.
- **Cả lớp:**
  1. Vào bảng GV, chọn lớp và “Bài 16: Thuật toán sắp xếp”.
  2. Bấm ▶ Bắt đầu.
  3. Chiếu mã vào lớp.
  4. Bấm 📺 để trình chiếu.
- **Vận dụng:** máy mô phỏng có nút “Giảm dần”, HS gõ điểm của tổ để kiểm tra; câu trả lời gửi GV ở tab ✍️ Tự luận.

## 3. Kiến thức trọng tâm
1. Hoán đổi: C ← A; A ← B; B ← C.
2. Nổi bọt: hoán đổi nhiều lần các phần tử liền kề nếu giá trị của chúng không đúng thứ tự.
3. Sắp xếp chọn: xét từng vị trí, so sánh trực tiếp với các phần tử phía sau, hoán đổi nếu chưa đúng thứ tự.
4. Dãy n phần tử: n − 1 vòng lặp.
5. Chia bài toán thành những bài toán nhỏ hơn giúp thuật toán dễ hiểu, dễ thực hiện hơn.

## 4. Lưu ý
- **Chiều duyệt nổi bọt:** theo lựa chọn của thầy/cô, app có cả hai; câu hỏi chấm điểm và Phiếu 1 theo SGK (từ cuối dãy).
- **Đáp án Phiếu 1** (nổi bọt 3 5 4 1 2): 3 5 4 1 2 · 3 5 1 4 2 · 3 1 5 4 2 · 1 3 5 4 2 · 1 3 5 2 4 · 1 3 2 5 4 · 1 2 3 5 4 · 1 2 3 4 5 · 1 2 3 4 5 · 1 2 3 4 5.
- **Đáp án Phiếu 2** (chọn 41 15 17 32 18): 15 41 17 32 18 (×4) · 15 17 41 32 18 (×3) · 15 17 32 41 18 · 15 17 18 41 32 · 15 17 18 32 41.
- **Luyện tập** (3 2 4 1 5): nổi bọt 3 2 1 4 5 → 3 1 2 4 5 → 1 3 2 4 5 → 1 2 3 4 5; chọn 2 3 4 1 5 → 1 3 4 2 5 → 1 2 4 3 5 → 1 2 3 4 5 (khớp đáp án giáo án).
- Giáo án có 2 đường link dự án Scratch minh hoạ; theo lựa chọn của thầy/cô, app không thêm nút mở.
- Giáo án nhắc sắp xếp chèn ở mục tiêu nhưng SGK không có nên app không đưa vào.
