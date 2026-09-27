# PHÂN TÍCH BÀI HỌC — TIN 9, BÀI 14: GIẢI QUYẾT VẤN ĐỀ

## 1. Thông tin bài học
- **Môn / Lớp:** Tin học · Lớp 9 · Kết nối tri thức với cuộc sống
- **Chủ đề:** Chủ đề 5 — Giải quyết vấn đề với sự trợ giúp của máy tính
- **Trang SGK:** 76–78
- **Thời lượng:** 01 tiết (giáo án): Mở đầu 3' · HĐ2.1 10' · HĐ2.2 20' · Luyện tập 10' · Vận dụng 2'.

## 2. Mục tiêu (trích giáo án)
- Trình bày được quá trình giải quyết vấn đề và mô tả được giải pháp dưới dạng thuật toán (liệt kê các bước hoặc sơ đồ khối).
- **Năng lực số:** 5.1.TC2a, 5.1.TC2b.
- **Năng lực AI:** 9.D1.1.

## 3. CORE KNOWLEDGE
1. Giải quyết vấn đề qua 5 bước:
   1) Tìm hiểu vấn đề;
   2) Phân tích vấn đề;
   3) Lựa chọn giải pháp;
   4) Thực hiện giải pháp;
   5) Đánh giá kết quả.
2. Thuật toán bám tường (bên phải): bức tường luôn ở bên phải; ưu tiên phải → thẳng → trái.
3. Liệt kê các bước:
   - Lặp lại cho đến khi tìm thấy lối ra.
   - Nếu bên phải không có tường thì quay phải 90°, tiến một bước.
   - Nếu không thì: phía trước không có tường thì tiến một bước, còn không thì quay trái 90°.
4. Giải pháp được mô tả dưới dạng thuật toán bằng liệt kê các bước hoặc sơ đồ khối.

## 4. BẢNG ÁNH XẠ HOẠT ĐỘNG

| # | Hoạt động (giáo án) | id | SGK | Hình thức app | Tương tác |
|---|---|---|---|---|---|
| 1 | HĐ1 Mở đầu — 2 nhóm thi thoát mê cung | `mo-dau` | tr.76 | Mê cung thi đấu 2 nhóm (`maze.mode:"race"`) | Nút ← ↑ → ↓, đếm bước, thời gian |
| 2 | HĐ2.1 — Phiếu 1 câu 2, 3 | `hd1-me-cung` | Hình 14.1 | Ảnh SGK | Trắc nghiệm |
| 3 | HĐ2.1 — Phiếu 1 câu 1 | `quy-trinh` | tr.76–77, Hình 14.2 | 5 bước vẽ lại, Em cần nhớ | Trắc nghiệm |
| 4 | HĐ2.1 (củng cố) | `ghep-buoc-me-cung` | tr.76–77 | Bước ↔ việc làm trong mê cung | Ghép đôi |
| 5 | HĐ2.1 NV2 — câu hỏi chọn trường | `chon-truong` | tr.77 | Việc làm → 5 bước | Phân loại |
| 6 | HĐ2.2 — Phiếu 2 | `bam-tuong` | Hoạt động 2, Hình 14.3 | 3 động tác, liệt kê các bước, sơ đồ khối | Trắc nghiệm |
| 7 | HĐ2.2 — sơ đồ khối | `ghep-so-do` | Hình 14.3b | Sơ đồ khối (`dragdrop.layout:"ifchain"`) | Kéo thả |
| 8 | HĐ2.2 (GV chọn thêm) | `may-bam-tuong` | — | Máy mô phỏng bám tường, 3 mê cung (`maze.mode:"sim"`) | Chạy từng lần lặp, trắc nghiệm |
| 9 | HĐ2.2 NV2 — câu hỏi chọn trường dạng thuật toán | `chon-truong-thuat-toan` | tr.78 | Liệt kê các bước | Tự luận |
| 10 | HĐ3 Luyện tập | `luyen-tap` | tr.78 | Hoàn thành thuật toán bám tường trái | Điền khuyết (hộp chọn) |
| 11 | HĐ3 (kiểm chứng) | `luyen-tap-kiem-tra` | — | Máy mô phỏng chế độ trái + sơ đồ khối (giáo án) | Trắc nghiệm, Đúng/Sai |
| 12 | HĐ4 Vận dụng | `van-dung` | tr.78 | Ảnh chương trình Scratch mẫu (giáo án, ẩn) | Trắc nghiệm |
| 13 | Tổng kết | `tong-ket` | — | Em đã học, thử thách | Trắc nghiệm |

## 5. Quyết định (GV đã chọn)
- **Máy mô phỏng robot bám tường:** có chọn phải/trái và 3 mê cung.
  - Mê cung 3 có lối ra ở giữa để minh hoạ bước “đánh giá kết quả”: robot quay lại trạng thái cũ và lặp mãi.
- **Mở đầu:** app tạo mê cung thi đấu cho 2 nhóm.
- **Vận dụng:** chỉ có ảnh chương trình Scratch mẫu, không thêm nút mở Scratch.
- **Đáp án phiếu bài tập** (giáo án không khớp câu hỏi hoặc bỏ trống): viết theo SGK.
- **Mê cung do app tự vẽ**, không phải hình SGK. Số liệu mô phỏng đã kiểm tra:
  - Mê cung 1: bám phải 44 lần lặp / 38 bước tiến; bám trái 54 / 46.
  - Mê cung 2: bám phải 46 / 40; bám trái 41 / 36.
