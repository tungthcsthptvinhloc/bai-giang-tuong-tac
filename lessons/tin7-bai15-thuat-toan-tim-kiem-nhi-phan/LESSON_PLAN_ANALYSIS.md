# PHÂN TÍCH BÀI HỌC — TIN 7, BÀI 15: THUẬT TOÁN TÌM KIẾM NHỊ PHÂN

## 1. Thông tin chung
- **Sách:** Tin học 7 — Kết nối tri thức với cuộc sống, trang 74–77.
- **Chủ đề:** Chủ đề 5 — Giải quyết vấn đề với sự trợ giúp của máy tính.
- **Thời lượng:** 2 tiết (theo giáo án): Mở đầu 5' · HĐ2.1 39' · HĐ2.2 30' · Luyện tập 8' · Vận dụng 7' · Tự học 1'.

## 2. Mục tiêu (theo giáo án)
- Giải thích thuật toán tìm kiếm nhị phân; mô phỏng trên bộ dữ liệu nhỏ.
- Giải thích mối liên quan giữa sắp xếp và tìm kiếm, nêu ví dụ.
- Năng lực số 3.4.TC1a, 5.3.TC1b.

## 3. Kiến thức trọng tâm (Core Knowledge)
1. Thực hiện trên danh sách đã sắp xếp; bắt đầu từ vị trí ở giữa.
2. Mỗi bước lặp: bằng → dừng; nhỏ hơn → nửa trước; lớn hơn → nửa sau.
3. Chừng nào chưa tìm thấy và vùng tìm kiếm còn phần tử thì còn tìm tiếp.
4. Vị trí giữa = phần nguyên của (đầu + cuối)/2; kí tự đứng trước “nhỏ hơn” kí tự đứng sau.
5. Sắp xếp giúp cho việc tìm kiếm được thực hiện nhanh hơn.

## 4. Bảng ánh xạ hoạt động

| # | Hoạt động (giáo án) | Nội dung SGK | Hình thức trong app | Tương tác | Kiến thức chốt |
|---|---|---|---|---|---|
| 1 | HĐ1 Mở đầu (5') — 2 nhóm phản biện | Tình huống tr.74 | Tình huống + câu hỏi | Trắc nghiệm | Nhược điểm tuần tự, gợi ý sắp xếp |
| 2 | HĐ2.1 NV1 | Mục 1, Hình 15.1 | Hình 15.1 vẽ HTML; 3 câu giáo án | Trắc nghiệm | Giải pháp của An |
| 3 | HĐ2.1 NV2 — Phiếu 1 | Các bước tìm “Trúc”, Hoạt động 1 | Máy tìm kiếm nhị phân | Chạy từng bước, trắc nghiệm, Đúng/Sai | 3 bước vs 8 bước; điều kiện đã sắp xếp |
| 4 | HĐ2.1 NV3 — Phiếu 2 | 5 bước, Hình 15.2 | Kiến thức SGK | Trắc nghiệm, chọn nhiều, Đúng/Sai | Vị trí giữa, điều kiện dừng |
| 5 | (củng cố) | 5 bước | Sắp xếp các bước | Sắp xếp | Thứ tự 5 bước |
| 6 | HĐ2.1 NV4 | Câu hỏi tìm “Hoà” tr.76 | Điền bảng bằng hộp chọn | Điền khuyết chấm điểm | 5 → 2 → 3 (3 bước) |
| 7 | HĐ2.2 NV1–2 — Phiếu 3 (thay theo SGK) | Mục 2 tr.76–77 | Máy tìm kiếm nhị phân tìm tên không có | Chạy, trắc nghiệm | Tuần tự 9 vs nhị phân 4; sắp xếp giúp tìm nhanh |
| 8 | HĐ2.2 NV3 | Hoạt động 2 — Trò chơi tìm số | Trò chơi thẻ úp (app đóng vai bạn A) | Chơi, trắc nghiệm | Chọn thẻ giữa, số lượt |
| 9 | HĐ2.2 NV4 | Câu hỏi tr.77 | Ví dụ thực tế | Chọn nhiều, trắc nghiệm | Thư viện, từ điển, siêu thị |
| 10 | HĐ3 Luyện tập (8') | Trò chơi Ô cửa bí mật (giáo án) | 6 ô cửa (giftbox) | Trắc nghiệm | Toàn bài |
| 11 | Luyện tập SGK 1a, 1b, 1c, 2 (bài tập về nhà theo giáo án) | tr.77 | Sắp xếp tên nước; điền bảng Iceland; máy có nút Sắp xếp | Sắp xếp, điền khuyết, trắc nghiệm | 3 bước vs 6 bước |
| 12 | (củng cố) | — | Trò chơi “Chia đôi thần tốc” | 8 câu | Toàn bài |
| 13 | HĐ4 Vận dụng (7') | Vận dụng tr.77 + Bài 2 giáo án | Tự luận + máy tự gõ danh sách sách | Tự luận | Từ điển, sách yêu thích |
| 14 | Tổng kết | — | Hôm nay em đã học + thử thách | Trắc nghiệm | — |

## 5. Quyết định (GV đã chọn)
- Tìm “Hoà”: theo công thức SGK — 3 bước (5 → 2 → 3); giáo án ghi 2 bước (5 → 3).
- Ô cửa bí mật câu 5: đáp án A (3 bước) theo cách đếm SGK (số lần so sánh); giáo án ghi B (4).
- Phiếu học tập số 3 (chép từ Bài 14) → thay bằng nội dung SGK: so sánh số bước lặp trên Hình 15.1.
- Thêm: máy tìm kiếm nhị phân, trò chơi tìm số thẻ úp, điền bảng bước lặp chấm điểm.
- Ô cửa bí mật câu 3: các phương án dùng “chưa tìm thấy **và** chưa tìm hết” như SGK (giáo án ghi “hoặc”); đáp án B giữ nguyên.
- Giáo án gợi ý video AI nhưng không có đường link → không thêm nút.
