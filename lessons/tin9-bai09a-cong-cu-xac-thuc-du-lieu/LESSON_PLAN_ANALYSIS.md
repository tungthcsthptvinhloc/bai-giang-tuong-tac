# PHÂN TÍCH BÀI HỌC — TIN 9, BÀI 9a: SỬ DỤNG CÔNG CỤ XÁC THỰC DỮ LIỆU

## 1. Thông tin bài học
- **Môn / Lớp:** Tin học · Lớp 9
- **Bộ sách:** Kết nối tri thức với cuộc sống
- **Chủ đề:** Chủ đề 4 (lựa chọn a) — Sử dụng bảng tính điện tử nâng cao; dự án Quản lí tài chính gia đình
- **Trang SGK:** 34–40
- **Thời lượng:** 02 tiết (theo giáo án)
  - Giáo án ghi số phút: Mở đầu 5' · HĐ2.1 10' · HĐ2.2 17' · Luyện tập 10' · Vận dụng 3'.
  - App dành thêm thời gian cho thực hành và luyện tập để đủ 2 tiết.

## 2. Mục tiêu (trích giáo án)
- Sử dụng được công cụ xác thực dữ liệu (Data Validation) để giải quyết bài toán quản lí tài chính.
- Dùng xác thực đầu vào để tránh nhập sai dữ liệu, đảm bảo tính chính xác; khai thác bảng tính để quản lí, thống kê.
- **Năng lực số:** 1.3.TC2a, 1.3.TC2b, 5.2.TC2b.
- **Năng lực AI:** 9.C3.1.

## 3. CORE KNOWLEDGE
1. **Tài chính gia đình:** Thu và Chi; bảng tính gồm Ngày, Khoản thu/chi, Nội dung, Số tiền.
2. **Data Validation** hạn chế kiểu hoặc giá trị dữ liệu nhập vào ô tính, giúp dữ liệu chính xác.
3. **Lệnh:** Data → Data Tools → Data Validation.
   - Ô Allow (thẻ Settings) có 8 lựa chọn: Any value, Whole number, Decimal, List, Date, Time, Text length, Custom.
4. **Danh sách thả xuống:** Allow = List, Source = =$F$2:$F$10.
5. **Cột Số tiền:**
   - Settings: Whole number, greater than, Minimum 0.
   - Input Message: lời nhắc khi chọn ô.
   - Error Alert: thông báo lỗi khi nhập sai; kiểu Stop có Retry / Cancel.

## 4. BẢNG ÁNH XẠ HOẠT ĐỘNG

| # | Hoạt động (giáo án) | id | SGK | Hình thức app | Tương tác |
|---|---|---|---|---|---|
| 1 | HĐ1 Mở đầu (bảng có lỗi: điểm 11, ngày 32/09/2025, chữ trong cột số) | `mo-dau` | — | Bảng tính mô phỏng có dữ liệu sai; hàm AVERAGE, SUM cho kết quả sai | Bấm ô, trắc nghiệm |
| 2 | HĐ2.1 NV1 (Hoạt động 1 SGK) | `thu-chi` | tr.34, Hình 9a.1 | Khoản thu, chi; cấu trúc bảng tính | Trắc nghiệm, chọn nhiều |
| 3 | HĐ2.1 NV1 (củng cố) | `phan-loai-thu-chi` | Hình 9a.1 | Khoản thu hay khoản chi? | Phân loại |
| 4 | HĐ2.1 NV2 | `xac-thuc-la-gi` | Hình 9a.2, 9a.3 | Trang Chi tiêu mô phỏng có quy tắc đặt sẵn (List, số > 0, lời nhắc, báo lỗi): HS nhập thử | Nhập thử, trắc nghiệm |
| 5 | HĐ2.1 NV2 | `lenh-data-validation` | Hình 9a.4, 9a.5, Bảng 9a.1 | Mở Data Validation, ô Allow | Trắc nghiệm |
| 6 | HĐ2.1 NV2 (củng cố) | `bang-9a1` | Bảng 9a.1 | 8 kiểu dữ liệu ↔ ý nghĩa | Ghép đôi |
| 7 | HĐ2.1 NV2 (vận dụng) | `chon-kieu` | — | Yêu cầu dữ liệu ↔ Allow (List, Whole number, Decimal, Date, Text length) | Phân loại |
| 8 | HĐ2.1 NV3 (câu hỏi tr.37) | `cau-hoi-9a6` | Hình 9a.6 | Cột Khoản thu cần xác thực gì; chọn vùng Source F2:F6 | Trắc nghiệm, chọn vùng |
| 9 | HĐ2.2 NV1 (các bước) | `nv1-cac-buoc` | tr.37–38 | 6 bước tạo danh sách thả xuống | Sắp xếp |
| 10 | HĐ2.2 NV1 | `nv1-thuc-hanh` | Hình 9a.7, 9a.8 | Thực hành trên Excel; mô phỏng kết quả List | Trả lời ngắn, đúng/sai, trắc nghiệm |
| 11 | HĐ2.2 NV2 | `nv2-thuc-hanh` | Hình 9a.9–9a.12 | Thực hành trên Excel; mô phỏng Whole number > 0, lời nhắc, báo lỗi Stop | Nhập thử, trắc nghiệm |
| 12 | HĐ2.2 (củng cố) | `ba-the` | — | Settings / Input Message / Error Alert / Source / Stop / Clear All | Ghép đôi |
| 13 | HĐ3 Luyện tập Bài 1 (trò chơi mở quà bí mật) | `hop-qua` | — | 4 câu giáo án + 4 câu củng cố | Hộp quà |
| 14 | HĐ3 Luyện tập Bài 2, 3 (SGK Luyện tập 1, 2) | `luyen-tap-thuc-hanh` | Hình 9a.13 | Trang Thu nhập mô phỏng có quy tắc; nhập thêm 3 hàng | Nhập thử, trắc nghiệm |
| 15 | HĐ3 (sản phẩm) | `tu-kiem-tra` | — | Phiếu tự kiểm tra tệp TaiChinhGiaDinh.xlsx, gửi GV | Bảng tick |
| 16 | HĐ4 Vận dụng | `van-dung` | Hình 9a.14, 9a.15 | Trang Các khoản chi mô phỏng; mở rộng Source | Nhập thử, trắc nghiệm |
| 17 | HĐ4 (ở nhà) | `van-dung-nha` | tr.40 | Quy tắc xác thực cho từng cột; lợi ích khi nhiều bạn cùng nhập | Tự luận |
| 18 | Tổng kết | `tong-ket` | — | Em đã học, từ khoá, 2 thử thách | Trắc nghiệm |

## 5. Ghi chú đối chiếu
- **Mô phỏng.** Theo lựa chọn của GV:
  - Bảng tính mô phỏng chỉ có quy tắc xác thực đặt sẵn để HS nhập thử: danh sách thả xuống, lời nhắc, thông báo lỗi Stop Retry/Cancel.
  - HS thiết lập Data Validation trên Excel thật.
- **Cột Số tiền.** Mục “Nội dung” HĐ2.2 của giáo án ghi “chỉ cho phép nhập số trong khoảng 0 – 5.000” và “Cột Ngày chỉ cho phép ngày tháng”. Cột hướng dẫn và SGK dùng Whole number, greater than 0. App theo SGK. Kiểu Date được giới thiệu ở Bảng 9a.1 và câu vận dụng.
- **Bài 1, câu 4.** Đáp án D “Data” (không có trong ô Allow; dễ nhầm với Date) theo giáo án.
- **Mở đầu.** Bảng dữ liệu có lỗi là ví dụ minh hoạ, tên học sinh hư cấu.
- **Năng lực AI 9.C3.1.** Được lồng vào mục “Mở rộng”: dữ liệu đúng, sạch giúp AI cho kết quả tốt.
