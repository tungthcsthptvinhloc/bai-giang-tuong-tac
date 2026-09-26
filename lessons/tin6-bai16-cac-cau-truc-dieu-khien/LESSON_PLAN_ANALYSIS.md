# PHÂN TÍCH BÀI HỌC — TIN 6, BÀI 16: CÁC CẤU TRÚC ĐIỀU KHIỂN

## 1. Thông tin bài học
- **Môn / Lớp:** Tin học · Lớp 6
- **Bộ sách:** Kết nối tri thức với cuộc sống
- **Chủ đề:** Chủ đề 6 — Giải quyết vấn đề với sự trợ giúp của máy tính
- **Trang SGK:** 67–70
- **Thời lượng:** 2 tiết (giáo án không ghi; thầy/cô đã chọn 2 tiết).

## 2. Mục tiêu (trích giáo án)
- Biết 3 cấu trúc điều khiển (tuần tự, rẽ nhánh, lặp).
- Mô tả thuật toán có các cấu trúc điều khiển bằng liệt kê hoặc sơ đồ khối.
- **Năng lực số:** 3.4.TC1a, 5.1.TC1a, 5.1.TC1b.
- **Năng lực AI:** 6.A2.1 — AI hoạt động theo lập trình của con người; con người quyết định cuối cùng.

## 3. CORE KNOWLEDGE
1. **Tuần tự:** thực hiện lần lượt các lệnh.
2. **Rẽ nhánh:** hình thoi là điều kiện; có dạng thiếu và dạng đủ.
3. **Lặp:** lặp lại các bước nhiều lần, luôn có bước kiểm tra điều kiện kết thúc.
4. **Ba cấu trúc** tuần tự, rẽ nhánh và lặp đủ để mô tả mọi thuật toán.

## 4. BẢNG ÁNH XẠ HOẠT ĐỘNG

| # | Hoạt động (giáo án) | id | SGK | Hình thức app | Tương tác |
|---|---|---|---|---|---|
| 1 | HĐ1 Mở đầu: trò chơi Đúng hay Sai | `khoi-dong`, `phieu-sinh-hoc`, `phieu-toan` | tr.67 | Luật chơi; hai bộ phiếu Sinh học, Toán chơi trong app | Đúng/Sai |
| 2 | HĐ2.1 NV1 (Hoạt động 1 SGK) | `danh-gia-ket-qua` | tr.67, Hình 6.6, 6.7 | Điều kiện cộng điểm, các bước đánh giá | Trắc nghiệm |
| 3 | HĐ2.1 NV2 | `re-nhanh-thieu-du` | Hình 6.8, tóm tắt tr.68 | Kết luận giáo án + tóm tắt SGK | Trắc nghiệm |
| 4 | HĐ2.1 NV3 (câu hỏi tr.68) | `cau-hoi-tr68` | tr.68 | Sơ đồ “Nếu trời mưa…” tự vẽ | Trắc nghiệm |
| 5 | HĐ2.2 NV1 (Hoạt động 2 SGK) | `cau-truc-lap` | Hình 6.9, tóm tắt tr.69 | Sơ đồ lặp tự vẽ | Trắc nghiệm |
| 6 | HĐ2.2 NV2 (câu hỏi 2 tr.69) | `meo-cham-bien` | Hình 6.10 | Sơ đồ hoàn chỉnh tự vẽ | Trắc nghiệm |
| 7 | HĐ3 Luyện tập 1 | `luyen-tap-1` | tr.70 | 3 sơ đồ rẽ nhánh (an toàn trên mạng) | Trắc nghiệm |
| 8 | HĐ3 Luyện tập 2, 3 | `luyen-tap-2-3` | Hình 6.11 | Sơ đồ lặp câu b | Trắc nghiệm |
| 9 | HĐ3 (củng cố) | `phan-loai-cau-truc` | — | Tuần tự, rẽ nhánh hay lặp | Phân loại |
| 10 | HĐ4 Vận dụng 1 (+ AI 6.A2.1) | `van-dung-1` | Hình 6.12 | Ý kiến của An; AI theo lập trình của con người | Trắc nghiệm |
| 11 | HĐ4 Vận dụng 2, 3 | `van-dung-nhom` | tr.70 | Hướng trả lời kèm sơ đồ | Tự luận |
| 12 | Tổng kết | `tong-ket` | — | Em đã học, từ khoá, 2 thử thách | Trắc nghiệm |

## 5. Ghi chú đối chiếu
- **Theo lựa chọn của thầy/cô, giữ nguyên theo giáo án:**
  - Kết luận NV2 về rẽ nhánh: “Nếu đúng sẽ thực hiện tiếp, nếu sai sẽ dừng thuật toán”. SGK viết: dạng thiếu — nếu Điều kiện đúng thì thực hiện Lệnh; dạng đủ — đúng thì Lệnh 1, sai thì Lệnh 2.
  - Sơ đồ khối điểm danh (Vận dụng 3): dùng nguyên hình trong giáo án.
  - App không có câu hỏi chấm điểm nào về nhánh Sai của rẽ nhánh dạng thiếu, để không mâu thuẫn giữa hai nguồn.
- **Phiếu trò chơi:** SGK chỉ cho ví dụ “Voi thuộc loài ăn thịt”. Các phiếu còn lại do app soạn, dùng kiến thức Khoa học tự nhiên và Toán lớp 6; thầy/cô sửa được trong `data/lesson.js`.
- **Sơ đồ khối tự vẽ (SVG):**
  - vẽ lại theo SGK: Hình 6.9 và Hình 6.10 hoàn chỉnh;
  - câu “Nếu trời mưa…”;
  - Luyện tập 1a, b, c và Luyện tập 2b (theo đáp án giáo án);
  - Vận dụng 2 (theo hình giáo án).
- **Engine:** câu vận dụng có thêm `answerHtml` (sơ đồ hiện cùng hướng trả lời).
- **Video AI:** giáo án gợi ý nhưng không kèm đường link, nên app không có nút video.
