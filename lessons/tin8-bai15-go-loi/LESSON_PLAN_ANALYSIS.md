# PHÂN TÍCH BÀI HỌC — TIN 8, BÀI 15: GỠ LỖI

## 1. Thông tin bài học
- **Môn / Lớp:** Tin học · Lớp 8 · Kết nối tri thức với cuộc sống
- **Chủ đề:** Chủ đề 5 — Giải quyết vấn đề với sự trợ giúp của máy tính
- **Trang SGK:** 86–90
- **Thời lượng:** 01 tiết (giáo án):
  - Mở đầu: 5'
  - HĐ2.1 Kiểm thử và phân loại lỗi: 7'
  - HĐ2.2 Phát hiện lỗi và sửa lỗi lôgic: 8'
  - HĐ2.3 Thực hành gỡ lỗi: 14'
  - Luyện tập: 8'
  - Vận dụng: 3'

## 2. Mục tiêu (trích SGK, giáo án)
- Chạy thử, tìm lỗi và sửa được lỗi cho chương trình.
- **Năng lực số:** 5.1.TC2a, 5.1.TC2b, 5.3.TC2a.

## 3. CORE KNOWLEDGE
1. Cần phải chạy thử chương trình (kiểm thử) để phát hiện và loại bỏ lỗi.
2. **Lỗi cú pháp:** viết câu lệnh sai quy tắc, làm chương trình không hoạt động.
3. **Lỗi lôgic:** câu lệnh viết đúng quy tắc nhưng thực hiện sai so với kịch bản.
4. **Phát hiện lỗi lôgic, cách 1:** tập trung vào các khối lệnh trực tiếp gây lỗi và các khối lệnh liên quan lôgic theo cấu trúc điều khiển.
5. **Phát hiện lỗi lôgic, cách 2:** chạy từng bước, theo dõi biến, đầu ra và so sánh với giá trị tính tay.

## 4. BẢNG ÁNH XẠ HOẠT ĐỘNG

| # | Hoạt động (giáo án) | id | SGK | Hình thức app | Tương tác |
|---|---|---|---|---|---|
| 1 | HĐ1 Mở đầu — Ô chữ (từ khoá GỠ LỖI) | `mo-dau` | — | Ô chữ 5 hàng, hàng ngang là câu trắc nghiệm | Trắc nghiệm, gõ từ khoá |
| 2 | HĐ2.1 — Phiếu 1, câu 1–2 (Hoạt động 1, 2) | `kiem-thu` | tr.86 | Chạy thử Hình 15.1, đếm số lần đoán thật | Mô phỏng, trắc nghiệm |
| 3 | HĐ2.1 — Phiếu 1, câu 3 | `phan-loai-loi` | tr.87 | Kiến thức; Em cần nhớ; câu hỏi tr.87 | Trắc nghiệm |
| 4 | (GV chọn thêm) | `phan-loai-tinh-huong` | — | 8 tình huống, 2 cột | Phân loại |
| 5 | HĐ2.2 — Phiếu 2 (Hoạt động 3) | `phat-hien-loi` | tr.87–88 | 2 thẻ: Hình 15.1 có lỗi (từng bước) / đã sửa (4a) | Mô phỏng, trắc nghiệm |
| 6 | (GV chọn thêm) | `sap-xep-buoc` | — | 5 bước gỡ lỗi | Sắp xếp |
| 7 | Câu hỏi SGK tr.89 | `chan-le` | Hình 15.3 | 2 thẻ: có lỗi / đã sửa | Mô phỏng, trắc nghiệm |
| 8 | HĐ2.3 Thực hành | `thuc-hanh` | tr.89–90 | 2 thẻ: Hình 15.4 / sau khi sửa (Hình 15.5) | Mô phỏng, trắc nghiệm |
| 9 | (GV chọn thêm) | `tham-tu` | — | 4 chương trình có lỗi | Trắc nghiệm |
| 10 | (GV chọn thêm) | `dung-sai` | — | 4 nhận định | Đúng / Sai |
| 11 | HĐ3 Luyện tập | `luyen-tap` | tr.90 | 2 thẻ: cách 1 (đúng), cách 2 (vẫn lỗi) | Mô phỏng, trắc nghiệm |
| 12 | HĐ4 Vận dụng | `van-dung` | tr.90 | Chương trình tham khảo: máy đoán số (Mở rộng) | Mô phỏng, trắc nghiệm |
| 13 | Tổng kết | `tong-ket` | — | Em đã học, thử thách | Trắc nghiệm |

## 5. Quyết định (GV đã chọn)
- **Ô chữ Câu 5:** giáo án hỏi “Việc xác định bài toán đầu tiên là đi xác định thành phần nào?” (đáp án Input). App sửa lời thành “Khi xác định bài toán, thông tin đã cho (dữ liệu đầu vào) được gọi là gì?” → Input; giữ từ khoá GỠ LỖI.
- **Luyện tập:** theo SGK (cách khác sửa lỗi Hình 15.1). Đáp án Luyện tập của giáo án là lời giải Thực hành Hình 15.4 nên app đặt lời giải đó ở phần Thực hành, theo SGK (Hình 15.5).
- **Mô phỏng:**
  - Gỡ lỗi Hình 15.1
  - Thực hành Hình 15.4
  - Chẵn lẻ Hình 15.3
  - Máy đoán số (Vận dụng)
- **Tương tác thêm:**
  - Phân loại lỗi
  - Sắp xếp các bước gỡ lỗi
  - Thám tử tìm lệnh gây lỗi
  - Đúng hay sai?
