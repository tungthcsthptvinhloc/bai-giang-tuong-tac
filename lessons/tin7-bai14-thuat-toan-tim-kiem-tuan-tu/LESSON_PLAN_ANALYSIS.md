# PHÂN TÍCH BÀI HỌC — TIN 7, BÀI 14: THUẬT TOÁN TÌM KIẾM TUẦN TỰ

## 1. Thông tin chung
- **Sách:** Tin học 7 — Kết nối tri thức với cuộc sống, trang 71–73.
- **Chủ đề:** Chủ đề 5 — Giải quyết vấn đề với sự trợ giúp của máy tính.
- **Thời lượng:** 2 tiết (theo giáo án): Mở đầu 10' · Hình thành kiến thức 50' · Luyện tập 15' · Vận dụng 15'.

## 2. Mục tiêu (theo giáo án)
- Nêu khái niệm, giải thích thuật toán tìm kiếm tuần tự; xác định Input, Output.
- Hiểu hoạt động lặp, điều kiện dừng; mô tả thuật toán bằng ngôn ngữ tự nhiên, sơ đồ khối, bảng mô phỏng.
- Mô phỏng thuật toán trên danh sách nhỏ.
- Năng lực số 3.4.TC1a, 5.3.TC1b; năng lực AI 7.C5.1.

## 3. Kiến thức trọng tâm (Core Knowledge)
1. Tìm kiếm tuần tự: tìm lần lượt từ đầu đến cuối danh sách, chừng nào chưa tìm thấy và chưa tìm hết thì còn tìm tiếp.
2. Cấu trúc lặp; hai điều kiện dừng: đúng giá trị cần tìm? đã hết danh sách?
3. Tìm thấy → chỉ ra vị trí; hết danh sách → “Không tìm thấy”.
4. Mô tả bằng ngôn ngữ tự nhiên (5 bước), sơ đồ khối Hình 14.1, bảng lần lặp.

## 4. Bảng ánh xạ hoạt động

| # | Hoạt động (giáo án) | Nội dung SGK | Hình thức trong app | Tương tác | Kiến thức chốt |
|---|---|---|---|---|---|
| 1 | HĐ1 Mở đầu (10') — Phiếu 1 | Tình huống tr.71, Bảng 14.1 | Bảng 14.1 vẽ HTML | Trắc nghiệm, chọn nhiều đáp án | Nhu cầu tìm kiếm, tìm lần lượt |
| 2 | HĐ2.1 Thuật toán tìm kiếm tuần tự (25') — Phiếu 2 | tr.71, Hình 14.1 | Kiến thức SGK + 5 câu Phiếu 2 | Trắc nghiệm, chọn nhiều đáp án | Input, Output, cấu trúc lặp, 2 điều kiện dừng |
| 3 | (củng cố) | Hình 14.1 | Ghép sơ đồ khối (khối hình dạng sơ đồ) | Sắp xếp | Thứ tự các khối |
| 4 | HĐ2.2 — Nhiệm vụ 1 (Bảng 1 / Bảng 14.2) | Hoạt động 1 tr.72 | Điền bảng lần lặp bằng hộp chọn Đúng/Sai | Điền khuyết chấm điểm | Mô phỏng bằng bảng, 4 lần lặp |
| 5 | HĐ2.2 — đối chiếu | — | Máy tìm kiếm tuần tự (Bảng 14.1) | Chạy từng bước, trắc nghiệm | Tìm thấy / không tìm thấy |
| 6 | HĐ2.2 — chốt ngôn ngữ tự nhiên | tr.73 | Sắp xếp 5 bước | Sắp xếp | 5 bước |
| 7 | HĐ2.2 — Nhiệm vụ 2 | Câu hỏi tr.73 | 2 câu SGK | Trắc nghiệm | 1-D, 2-B |
| 8 | HĐ3 Luyện tập (15') — Tiếp sức | Luyện tập tr.73 (Bảng 14.3) | Điền bảng lần lặp tìm Iceland | Điền khuyết chấm điểm | 6 lần lặp, vị trí số 6 |
| 9 | HĐ3 — kiểm tra | — | Máy tìm kiếm (tên nước) | Chạy từng bước, trắc nghiệm | Giá trị cuối danh sách, không có trong danh sách |
| 10 | (củng cố) | — | Trò chơi “Thám tử tìm kiếm” | 8 câu | Toàn bài |
| 11 | HĐ4 Vận dụng (15') | Vận dụng tr.73 + tủ sách lớp (giáo án) | Máy tìm kiếm HS tự gõ danh sách; tự luận gửi GV | Chạy thử, trắc nghiệm, tự luận | Tìm sách |
| 12 | Tổng kết | — | Hôm nay em đã học + thử thách | Trắc nghiệm | — |

## 5. Quyết định (GV đã chọn)
- **Input** của bài toán khởi động: theo giáo án — “Danh sách khách hàng” (SGK ghi thêm “họ tên khách hàng cần tìm”).
- Thêm cả ba tương tác: máy tìm kiếm tuần tự (engine `search`), ghép sơ đồ khối Hình 14.1, điền bảng lần lặp có chấm điểm (fillblank dạng hộp chọn).
- Giáo án gợi ý video AI, Scratch/Blockly/Code.org nhưng không có đường link cụ thể → không thêm nút.
