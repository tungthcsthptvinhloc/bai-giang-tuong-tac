# PHÂN TÍCH BÀI HỌC — TIN 9, BÀI 11a: SỬ DỤNG HÀM SUMIF

## 1. Thông tin bài học
- **Môn / Lớp:** Tin học · Lớp 9
- **Bộ sách:** Kết nối tri thức với cuộc sống
- **Chủ đề:** Chủ đề 4 (lựa chọn a) — Sử dụng bảng tính điện tử nâng cao; dự án Quản lí tài chính gia đình
- **Trang SGK:** 45–47
- **Thời lượng:** 02 tiết (theo giáo án)
  - Mở đầu 5' · HĐ2.1 15' · HĐ2.2 55' · Luyện tập 10' · Vận dụng 5'.

## 2. Mục tiêu (trích giáo án)
- Biết dùng hàm tính tổng theo điều kiện SUMIF giải bài toán quản lí tài chính gia đình; cộng dữ liệu phù hợp yêu cầu.
- Biết sắp xếp, lưu trữ dữ liệu trong bảng tính để dễ tổng hợp, kiểm tra.
- **Năng lực số:** 5.2.TC2b, 1.3.TC2a.
- **Năng lực AI:** 9.A2.2 — thiên vị, thành kiến của AI do dữ liệu đầu vào không cân bằng.

## 3. CORE KNOWLEDGE
1. Hàm SUMIF tính tổng giá trị của những ô thoả mãn một điều kiện.
2. **Công thức:** =SUMIF(range, criteria, [sum_range]).
   - range: phạm vi chứa các giá trị cần kiểm tra, hoặc cần tính tổng nếu không có sum_range.
   - criteria: điều kiện kiểm tra.
   - sum_range (tuỳ chọn): phạm vi chứa các giá trị cần tính tổng.
3. **Hai dạng:**
   - `=SUMIF(A1:A5,">5")` — cộng chính các ô của range.
   - `=SUMIF(A2:A5,"Khoa",B2:B5)` — cộng các ô tương ứng trong sum_range.
4. **Tổng tiền mỗi khoản:** `=SUMIF($B$3:$B$10,F2,$D$3:$D$10)` — điều kiện là ô F2, các vùng dùng địa chỉ tuyệt đối.
5. **Bổ sung dữ liệu:** sửa cả range và sum_range. Dữ liệu phải nhập thống nhất (đúng cột, đúng tên khoản mục).

## 4. BẢNG ÁNH XẠ HOẠT ĐỘNG

| # | Hoạt động (giáo án) | id | SGK | Hình thức app | Tương tác |
|---|---|---|---|---|---|
| 1 | HĐ1 Mở đầu — trò chơi “Hộp quà may mắn” | `mo-dau` | — | 4 câu giáo án + 2 câu dẫn vào bài (SUM, COUNTIF không cộng tiền) | Hộp quà |
| 2 | HĐ2.1 NV1 (Hoạt động 1 SGK) | `hd1-tong-tien` | Hình 11a.1 | Trang Chi tiêu có cột Tổng tiền; minh hoạ 800 + 120 = 920 | Trắc nghiệm, bấm ô |
| 3 | HĐ2.1 NV2 (công thức chung, Bảng 11a.1) | `ham-sumif` | tr.45–46, Bảng 11a.1 | Sơ đồ cú pháp 3 tham số; gõ thử 2 ví dụ của Bảng 11a.1 | Gõ công thức, trắc nghiệm |
| 4 | HĐ2.1 NV2 (củng cố) | `tham-so` | Bảng 11a.1 | Tham số / ví dụ ↔ ý nghĩa | Ghép đôi |
| 5 | HĐ2.1 NV2 (củng cố) | `countif-hay-sumif` | — | Câu hỏi thống kê → COUNTIF hay SUMIF | Phân loại |
| 6 | HĐ2.1 NV2 (từ "Ở" đến F2, địa chỉ tuyệt đối) | `dia-chi-tuyet-doi` | Hình 11a.2 | Thí nghiệm có $ / không có $ bằng nút kéo điền | Bảng thử, trắc nghiệm |
| 7 | HĐ2.2 (các bước SGK) | `cac-buoc` | tr.47 | 5 bước | Sắp xếp |
| 8 | HĐ2.2 NV1 — Chi tiêu | `thuc-hanh-chi` | Hình 11a.2 | H2:H10 = SUMIF($B$3:$B$10,F2,$D$3:$D$10) | Gõ công thức + kéo điền, trắc nghiệm |
| 9 | HĐ2.2 NV2 — Thu nhập (+ câu hỏi SGK tr.47) | `thuc-hanh-thu` | Hình 11a.3 | H2:H6 = SUMIF($B$3:$B$8,F2,$D$3:$D$8); dòng Tổng (ảnh trong giáo án) | Trắc nghiệm, gõ công thức |
| 10 | HĐ3 Luyện tập (SGK) | `luyen-tap` | tr.47 | Chi tiêu thêm 3 hàng, Thu nhập thêm 2 hàng; câu hỏi AI thiên lệch (9.A2.2) | Gõ công thức, trắc nghiệm |
| 11 | HĐ3 (sản phẩm) | `tu-kiem-tra` | — | Phiếu tự kiểm tra TaiChinhGiaDinh.xlsx, gửi GV | Bảng tick |
| 12 | HĐ4 Vận dụng | `van-dung` | tr.47 | KinhPhiTrienLam.xlsx: tổng thu 5,200, tổng chi 716, còn lại 4,484 | Gõ công thức, trắc nghiệm |
| 13 | HĐ4 (ở nhà) | `van-dung-nha` | — | SUMIF trong cuộc sống; tổ chức dữ liệu thống nhất | Tự luận |
| 14 | Tổng kết | `tong-ket` | — | Em đã học, từ khoá, thử thách SUMIF không có sum_range | Gõ công thức, trắc nghiệm |

## 5. Ghi chú đối chiếu
- **Bảng tính mô phỏng.** Engine thêm hàm SUMIF (có hoặc không có sum_range). Cột G “Số lần chi/thu” đặt sẵn công thức COUNTIF của Bài 10a.
- **Thu nhập.** Giáo án ghi “sao chép công thức ô H2 sang các ô H3 đến H8”; SGK ghi H3 đến H6 (5 khoản thu). App theo SGK.
- **Dòng Tổng.** Ảnh trong giáo án có dòng Tổng (G7 = 6, H7 = 17,500) → app thêm câu kiểm tra `=SUM(H2:H6)`.
- **Vận dụng.** Dữ liệu minh hoạ giống Bài 10a để HS dùng tiếp tệp KinhPhiTrienLam.xlsx.
- **Chấm công thức.** Chấm bằng thử đổi dữ liệu và xáo cột khoản mục (`sheet.vary`). Công thức thiếu $, đảo range với sum_range, sum_range lệch hàng hoặc sai cột đều bị chấm sai.
