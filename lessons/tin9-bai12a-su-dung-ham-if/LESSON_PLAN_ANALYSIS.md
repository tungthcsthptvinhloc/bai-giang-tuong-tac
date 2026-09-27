# PHÂN TÍCH BÀI HỌC — TIN 9, BÀI 12a: SỬ DỤNG HÀM IF

## 1. Thông tin bài học
- **Môn / Lớp:** Tin học · Lớp 9
- **Bộ sách:** Kết nối tri thức với cuộc sống
- **Chủ đề:** Chủ đề 4 (lựa chọn a) — Sử dụng bảng tính điện tử nâng cao; dự án Quản lí tài chính gia đình
- **Trang SGK:** 48–51
- **Thời lượng:** 02 tiết (theo giáo án)
  - Mở đầu 5' · HĐ2.1 20' · HĐ2.2 50' · Luyện tập 10' · Vận dụng 5'.

## 2. Mục tiêu (trích giáo án)
- Biết dùng công thức điều kiện để tự động phân loại hoặc tính kết quả trên bảng tính.
- Biết ứng dụng hàm IF để giải quyết các bài toán quen thuộc như thu – chi, điểm số, phân loại dữ liệu.
- **Năng lực số:** 5.2.TC2b, 5.3.TC2a.
- **Năng lực AI:** 9.D2.1 — ví dụ về kịch bản hội thoại cho một tình huống ứng dụng AI.

## 3. CORE KNOWLEDGE
1. Hàm IF kiểm tra điều kiện và trả về một giá trị khi điều kiện đó đúng và một giá trị khác nếu điều kiện đó sai.
2. **Công thức:** =IF(logical_test,[value_if_true],[value_if_false]).
   - logical_test: điều kiện kiểm tra.
   - value_if_true: giá trị trả về nếu điều kiện là đúng.
   - value_if_false: giá trị trả về nếu điều kiện là sai.
3. **Ví dụ:** `=IF(N3>50%,"Nhiều hơn","Ít hơn")` nhận xét mục Nhu cầu thiết yếu theo quy tắc 50-30-20.
4. **Nhiều mức → IF lồng nhau:** `=IF(N3>80%,"Nhiều quá",IF(N3>50%,"Nhiều hơn","Ít hơn"))`.
5. **Kết hợp** IF với SUMIF, tỉ lệ `=M3/$H$11*100%` và phép nhân để hoàn thiện bảng tính.

## 4. BẢNG ÁNH XẠ HOẠT ĐỘNG

| # | Hoạt động (giáo án) | id | SGK | Hình thức app | Tương tác |
|---|---|---|---|---|---|
| 1 | HĐ1 Mở đầu — “Hộp quà may mắn” | `mo-dau` | — | 4 câu giáo án + 2 câu dẫn vào bài | Hộp quà |
| 2 | HĐ2.1 (phần mở đầu SGK) | `quy-tac-50-30-20` | tr.48, Hình 12a.1 | Biểu đồ 50-30-20 vẽ lại | Trắc nghiệm, Đúng/Sai |
| 3 | HĐ2.1 NV1 — thêm dữ liệu Mục chi | `phan-loai-muc-chi` | Hình 12a.2 | Xếp 9 khoản chi vào A, B, C | Phân loại |
| 4 | HĐ2.1 NV1 — công thức cột M | `hd1-cot-m` | HĐ1 câu 1 | Bảng tính giống Hình 12a.2–12a.3 (ẩn cột A:E) | Trắc nghiệm, gõ công thức |
| 5 | HĐ2.1 NV2 — cột N, quy tắc nhận xét | `hd1-cot-n` | HĐ1 câu 1, 2 | N3:N5 hiện dạng % | Gõ công thức, trắc nghiệm |
| 6 | HĐ2.1 NV2 — so sánh với Hình 12a.1 | `so-sanh-ti-le` | Hình 12a.1, 12a.3 | Chọn mốc và nhận xét | Điền khuyết (hộp chọn) |
| 7 | HĐ2.1 NV3 — công thức chung | `ham-if` | tr.49, Em cần nhớ | Sơ đồ cú pháp; GV/HS nhập O3 | Trắc nghiệm, gõ công thức |
| 8 | HĐ2.1 NV3 (củng cố) | `tham-so-if` | Em cần nhớ | Tham số ↔ ý nghĩa, công thức ↔ kết quả | Ghép đôi |
| 9 | HĐ2.1 NV3 (GV chọn thêm) | `may-if` | — | Máy IF trực quan (2 mức / 3 mức) | Kéo thanh, trắc nghiệm |
| 10 | HĐ2.1 NV3 — IF lồng nhau | `if-long-nhau` | tr.49, Hình 12a.4 | Công thức lồng nhau tô màu | Trắc nghiệm |
| 11 | HĐ2.1 NV3 (GV chọn thêm) | `so-do-if` | Hình 12a.4 | Sơ đồ khối IF lồng nhau | Kéo thả vào sơ đồ |
| 12 | Củng cố tiết 1 (GV chọn thêm) | `doan-ket-qua` | — | “Đoán kết quả hàm IF” — 8 câu | Trò chơi đàn ong |
| 13 | HĐ2.2 Nhiệm vụ | `cac-buoc` | tr.50–51 | 7 bước a), b), c) | Sắp xếp |
| 14 | HĐ2.2 NV1, NV2 — a), b) | `thuc-hanh-ab` | Hình 12a.5, 12a.6 | Bảng thử Hình 12a.5; kiểm tra kết quả, lỗi thiếu $ | Bảng thử, trắc nghiệm |
| 15 | HĐ2.2 NV3 — c) + câu hỏi SGK tr.49 | `thuc-hanh-c` | tr.49, 51 | O4, O5 (mốc 30%, 20%) | Gõ công thức, trắc nghiệm |
| 16 | HĐ3 Luyện tập | `luyen-tap` | Hình 12a.7 | a) C, b) D, c) C lồng nhau + máy IF tỉ lệ thưởng | Gõ công thức, máy IF |
| 17 | HĐ4 Vận dụng 1, 2 | `van-dung` | tr.51 | O3 (80/50), O4, O5 (mốc do app gợi ý — Mở rộng) | Gõ công thức |
| 18 | HĐ4 (ở nhà) | `van-dung-nha` | tr.51 | Cân đối chi tiêu; IF trong cuộc sống | Tự luận |
| 19 | Tổng kết | `tong-ket` | — | Em đã học, từ khoá, thử thách Đạt/Chưa đạt | Gõ công thức, trắc nghiệm |

## 5. Ghi chú đối chiếu
- **Luyện tập** (GV chọn sửa theo SGK):
  - Giáo án ghi `=IF(B2>10000%,"5%","0%")`. Vì 10000% = 100 nên mọi đại lí đều được 5%, và "5%" trong ngoặc kép là chữ.
  - App dùng `=IF(B2>10000,5%,0%)` và `=IF(B2>20000,6%,IF(B2>15000,4%,IF(B2>10000,2%,0%)))` (doanh thu tính bằng nghìn đồng).
- **Vận dụng 2** (GV chọn app đặt mức, có chấm): mốc do app gợi ý, ghi rõ “Mở rộng”.
  - Mong muốn cá nhân: >40% “Nhiều quá”, >30% “Nhiều hơn”, còn lại “Ít hơn”.
  - Tiết kiệm: >20% “Nhiều hơn”, >10% “Ít hơn”, còn lại “Ít quá”.
- **Mở đầu:**
  - Câu 1: sửa lỗi gõ “SUMTIF” thành SUMIF.
  - Câu 4: giáo án ghi đề A1:A5 nhưng phương án B–D ghi A1:A10. App thống nhất A1:A5 và thêm dấu “=” (đáp án C giữ nguyên).
- **Bảng tính mô phỏng:**
  - Engine có thêm hàm IF, IF lồng nhau, phép so sánh, số phần trăm (50%) và định dạng % (`pct`).
  - Cột A:E được ẩn để bảng giống Hình 12a.2, 12a.3.
- **Chấm công thức:**
  - Chấm bằng cách thử đổi dữ liệu. Có thêm bộ dữ liệu thử đặt đúng các mốc (`sheet.tests`: 50%, 50.01%, 80%, 10000, 10001…).
  - Viết sai > thành >=, sai mốc, đảo thứ tự IF lồng nhau hoặc trả về "5%" dạng chữ đều bị chấm sai.
  - Chữ trả về được so khớp không phân biệt hoa/thường.
- **Không thêm nút:**
  - Giáo án gợi ý video AI, ChatGPT/Gemini/Copilot nhưng không có đường link, nên app không thêm nút mở.
  - Chỉ có một dòng gợi ý hỏi AI kèm nhắc kiểm chứng.
