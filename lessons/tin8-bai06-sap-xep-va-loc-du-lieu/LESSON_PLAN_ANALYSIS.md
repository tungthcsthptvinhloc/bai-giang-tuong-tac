# PHÂN TÍCH BÀI HỌC — TIN 8, BÀI 6: SẮP XẾP VÀ LỌC DỮ LIỆU

## 1. Thông tin bài học
- **Môn / Lớp:** Tin học · Lớp 8 · Kết nối tri thức với cuộc sống
- **Chủ đề:** Chủ đề 4 — Ứng dụng tin học
- **Trang SGK:** 27–31
- **Thời lượng:** 02 tiết (giáo án):
  - Mở đầu 5'
  - HĐ2.1: 15'
  - HĐ2.2 Sắp xếp: 25'
  - HĐ2.3 Lọc: 25'
  - Luyện tập 15'
  - Vận dụng 5'

## 2. Mục tiêu (trích SGK, giáo án)
- Sử dụng phần mềm bảng tính trợ giúp giải quyết bài toán thực tế.
- Nêu tình huống thực tế cần sắp xếp, lọc dữ liệu.
- Thực hiện thao tác lọc, sắp xếp.
- **Năng lực số:** 1.3.TC2a, 1.3.TC2b, 5.2.TC2b.
- **Năng lực AI:** 8.B3.1.

## 3. CORE KNOWLEDGE
1. Mỗi phiếu khảo sát là một hàng dữ liệu; tiêu đề cột là các thông tin chính.
2. Sắp xếp: Data › Sort, My data has headers, Sort by / Then by (Add Level), A to Z / Z to A.
3. Lọc: Data › Filter, nút lọc ở tiêu đề cột; dữ liệu không thoả mãn bị ẩn; Select All để bỏ lọc.
4. Lọc được theo nhiều tiêu chí và lọc theo điều kiện (Number/Text Filters).
5. Khi sắp xếp bằng bảng mã Unicode, thứ tự không hoàn toàn đúng thứ tự tiếng Việt.

## 4. BẢNG ÁNH XẠ HOẠT ĐỘNG

| # | Hoạt động (giáo án) | id | SGK | Hình thức app | Tương tác |
|---|---|---|---|---|---|
| 1 | HĐ1 Mở đầu — dự án CLB Tin học | `mo-dau` | tr.27 | Tình huống + Hình 6.1 | — |
| 2 | HĐ1 — HS điền phiếu khảo sát (GV chọn thêm) | `khao-sat-lop` | Hình 6.1 | Khảo sát nhanh cả lớp | Bình chọn (poll), biểu đồ cả lớp |
| 3 | HĐ1 — Hoạt động 1 Phiếu khảo sát | `hd1-phieu-khao-sat` | tr.27–28 | Bảng Hình 6.2 | Chọn nhiều, trắc nghiệm |
| 4 | HĐ2.1 — 4 câu hỏi; câu hỏi tr.28 | `hd21-bai-toan` | tr.28 | Bảng Hình 6.2 | Trắc nghiệm |
| 5 | (GV chọn thêm) | `sap-xep-hay-loc` | tr.28, 30 | 8 tình huống | Phân loại |
| 6 | HĐ2.2 a) Sắp xếp một tiêu chí | `th-sap-xep-mot` | tr.28–29 | Hình 6.3, 6.4 (thực hành Excel) | Trắc nghiệm |
| 7 | HĐ2.2 b) Nhiều tiêu chí; câu hỏi tr.30 | `th-sap-xep-nhieu` | tr.29–30 | Hình 6.5, 6.6 | Trắc nghiệm |
| 8 | (GV chọn thêm) | `cac-buoc-sap-xep` | tr.28–29 | 6 bước Sort | Sắp xếp |
| 9 | HĐ2.3 Lọc (Nhiệm vụ 1, 2) | `th-loc` | tr.30–31 | Hình 6.7, 6.8 | Trắc nghiệm |
| 10 | (GV chọn thêm) | `du-doan-loc` | tr.30–31 | Bảng Hình 6.2 | Chọn nhiều |
| 11 | (GV chọn thêm) | `cac-buoc-loc` | tr.30 | 6 bước Filter | Sắp xếp |
| 12 | HĐ3 Luyện tập | `luyen-tap` | tr.31 | Bảng Hình 6.9 + kiểm tra kết quả b, c, d | Trắc nghiệm, chọn nhiều |
| 13 | HĐ4 Vận dụng — Number Filters | `van-dung` | tr.31 | Gợi ý, kết quả 8A5 | Trắc nghiệm |
| 14 | Tổng kết | `tong-ket` | — | Em đã học, thử thách | Trắc nghiệm |

## 5. Quyết định (GV đã chọn)
- **Không mô phỏng Sort/Filter:** thao tác làm trên Excel thật; app hiển thị bảng H6.2, H6.9 (HTML) và kiểm tra kết quả bằng câu hỏi dự đoán.
- **Bước 1 sắp xếp và lọc:** theo SGK — chọn vùng A2:E12, không chọn dòng tên bảng ở hàng 1 (giáo án ghi "chọn một ô").
- **Tương tác thêm:**
  - Khảo sát nhanh cả lớp (engine `poll`; dữ liệu gửi qua texts, không đổi luật Firebase).
  - Sắp xếp hay Lọc?
  - Dự đoán kết quả lọc.
  - Sắp xếp các bước Sort/Filter.
- **Câu hỏi SGK tr.28:** tiêu chí sắp xếp là Tên, trùng Tên thì Họ đệm (giáo án không có đáp án riêng).
