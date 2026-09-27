# PHÂN TÍCH BÀI HỌC — TIN 7, BÀI 16: THUẬT TOÁN SẮP XẾP

## 1. Thông tin chung
- **Sách:** Tin học 7 — Kết nối tri thức với cuộc sống, trang 78–82.
- **Chủ đề:** Chủ đề 5 — Giải quyết vấn đề với sự trợ giúp của máy tính.
- **Thời lượng:** 2 tiết (theo giáo án): Khởi động 5' · Nổi bọt 40' · Sắp xếp chọn 30' · Chia bài toán 5' · Luyện tập 7' · Vận dụng 3'.

## 2. Mục tiêu (theo giáo án)
- Giải thích một vài thuật toán sắp xếp cơ bản; mô phỏng với bộ dữ liệu nhỏ.
- Nêu ý nghĩa của việc chia bài toán thành những bài toán nhỏ hơn.
- Năng lực số 3.4.TC1a, 5.3.TC1b.

## 3. Kiến thức trọng tâm (Core Knowledge)
1. Hoán đổi giá trị hai phần tử: C ← A; A ← B; B ← C.
2. Nổi bọt: hoán đổi nhiều lần các phần tử liền kề nếu không đúng thứ tự (SGK: so sánh từ cuối dãy lên, số nhỏ nổi lên đầu).
3. Sắp xếp chọn: so sánh trực tiếp phần tử ở vị trí đang xét với các phần tử phía sau, hoán đổi nếu chưa đúng thứ tự.
4. Dãy n phần tử: n − 1 vòng lặp.
5. Chia bài toán thành bài toán nhỏ hơn giúp thuật toán dễ hiểu, dễ thực hiện hơn.

## 4. Bảng ánh xạ hoạt động

| # | Hoạt động (giáo án) | Nội dung SGK | Hình thức trong app | Tương tác | Kiến thức chốt |
|---|---|---|---|---|---|
| 1 | HĐ1 Khởi động (5') | Hình 16.1 | Hình SGK + câu hỏi; sắp xếp 3 bước hoán đổi | Trắc nghiệm, sắp xếp | C ← A; A ← B; B ← C |
| 2 | HĐ2.1 NV1 (nổi bọt) | Mục 1, Hình 16.2–16.4 | Hình viên bọt (giáo án); máy mô phỏng nổi bọt (chọn chiều duyệt) | Chạy từng bước, trắc nghiệm | Hoán đổi các cặp liền kề |
| 3 | HĐ2.1 — Phiếu học tập 1 | Hoạt động 1 (3 5 4 1 2) | Điền 10 dãy bằng hộp chọn | Điền khuyết chấm điểm | Mô phỏng nổi bọt |
| 4 | HĐ2.1 — HS tự thực hiện (giáo án: 12, 5, 8, 3, 9) | — | Máy chế độ “em tự làm” | Hoán đổi / Không hoán đổi, báo sai | Tự thực hiện chính xác |
| 5 | HĐ2.1 NV2 — viết quy trình | Mô tả tr.80 | Sắp xếp các bước | Sắp xếp | Mô tả bằng ngôn ngữ tự nhiên |
| 6 | HĐ2.2 NV1 (sắp xếp chọn) | Mục 2, Hình 16.5 | Máy mô phỏng sắp xếp chọn | Chạy, trắc nghiệm (vòng lặp 2, 3, 4) | So sánh với vị trí đang xét |
| 7 | HĐ2.2 — Phiếu học tập 2 | Hoạt động 2 (41 15 17 32 18) | Điền 10 dãy bằng hộp chọn | Điền khuyết chấm điểm | Mô phỏng sắp xếp chọn |
| 8 | HĐ2.2 — HS tự thực hiện (giáo án: 9, 4, 7, 1, 6) | — | Máy chế độ “em tự làm” | Hoán đổi / Không hoán đổi | Tự thực hiện |
| 9 | HĐ2.2 NV2 | Mô tả tr.81 | Sắp xếp các bước | Sắp xếp | Mô tả sắp xếp chọn |
| 10 | HĐ2.3 (5') | Mục 3 tr.82 + ví dụ tủ sách (giáo án) | Kiến thức, câu hỏi SGK, sắp xếp các việc | Trắc nghiệm, sắp xếp | Chia nhỏ bài toán |
| 11 | HĐ3 Luyện tập (7') — “Cùng nhau sắp xếp” | Luyện tập 1, 2 (3 2 4 1 5) | Máy “em tự làm” có nút chọn thuật toán | Tự làm, trắc nghiệm | Hai thuật toán |
| 12 | (củng cố) | — | Trò chơi “Bong bóng lên mặt nước” | 8 câu | Toàn bài |
| 13 | HĐ4 Vận dụng (3') | Vận dụng tr.82 | Máy (giảm dần, tự gõ điểm) + tự luận | Tự luận | Sắp xếp điểm giảm dần |
| 14 | Tổng kết | — | Hôm nay em đã học + thử thách | Trắc nghiệm | — |

## 5. Quyết định (GV đã chọn)
- Nổi bọt: **cả hai chiều, có nút chọn** — máy mặc định từ cuối dãy (SGK), chiều từ đầu dãy (giáo án, “chìm dần”) ghi “mở rộng”; câu hỏi chấm điểm theo SGK.
- Thêm: máy mô phỏng sắp xếp, chế độ HS tự sắp xếp từng bước, phiếu học tập 1 và 2 chấm điểm.
- Không thêm nút mở 2 dự án Scratch trong giáo án (GV không chọn).
- Giáo án có nhắc sắp xếp chèn trong mục tiêu nhưng SGK không có → không đưa vào.
