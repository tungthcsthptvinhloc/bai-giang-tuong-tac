# PHÂN TÍCH BÀI HỌC — TIN 9, BÀI 16: THỰC HÀNH — LẬP CHƯƠNG TRÌNH MÁY TÍNH

## 1. Thông tin bài học
- **Môn / Lớp:** Tin học · Lớp 9 · Kết nối tri thức với cuộc sống
- **Chủ đề:** Chủ đề 5 — Giải quyết vấn đề với sự trợ giúp của máy tính
- **Trang SGK:** 83–86
- **Thời lượng:** 02 tiết (giáo án): Mở đầu 10' · Luyện tập 75' (3.1 cài đặt 25', 3.2 gỡ lỗi 10', 3.3 cài đặt 30', 3.4 gỡ lỗi 10') · Vận dụng 5'.

## 2. Mục tiêu (trích giáo án)
- Sử dụng được cấu trúc tuần tự, rẽ nhánh, lặp trong mô tả thuật toán; giải thích được chương trình là bản mô tả thuật toán bằng ngôn ngữ máy tính “hiểu” được.
- **Năng lực số:** 3.4.TC2a, 5.1.TC2a.
- **Năng lực AI:** 9.C5.1.

## 3. CORE KNOWLEDGE
1. Ngôn ngữ lập trình có cấu trúc tuần tự, rẽ nhánh, lặp.
2. Chương trình là bản mô tả thuật toán theo quy tắc ngôn ngữ lập trình. Đôi khi cần hiệu chỉnh mô tả, ví dụ lặp với điều kiện sau → lặp với điều kiện trước.
3. Các bước cài đặt:
   - tạo biến (đầu vào, đầu ra, trung gian);
   - nhận dạng khối lệnh tương ứng sơ đồ khối và lắp ghép đúng thứ tự;
   - số thập phân viết bằng dấu chấm (1.5).
4. Gỡ lỗi bằng bộ dữ liệu kiểm thử, mỗi bộ một tình huống.
5. Chương trình tốt phát hiện, loại bỏ dữ liệu không đúng yêu cầu.

## 4. BẢNG ÁNH XẠ HOẠT ĐỘNG

| # | Hoạt động (giáo án) | id | SGK | Hình thức app | Tương tác |
|---|---|---|---|---|---|
| 1 | HĐ1 Mở đầu (Quizizz 3 câu) | `mo-dau` | — | 3 câu kèm hình khối lệnh của giáo án + 1 câu về chương trình | Trắc nghiệm |
| 2 | HĐ3.1 — Bước 1 tạo biến | `nv1-bien` | tr.83 | Xếp biến vào đầu vào/đầu ra/trung gian | Phân loại |
| 3 | HĐ3.1 — Bước 2 (Hình 16.1) | `nv1-vong-lap` | Hình 16.1 | Điều kiện sau → điều kiện trước | Trắc nghiệm |
| 4 | HĐ3.1 — Bước 3 tạo chương trình | `nv1-chuong-trinh` | Hình 16.2 | Nhận dạng khối lệnh ↔ sơ đồ Hình 15.3 | Trắc nghiệm |
| 5 | HĐ3.2 Gỡ lỗi — Bảng 16.1 | `nv1-kiem-thu` | Bảng 16.1 | Chọn đầu ra đúng 6 tình huống | Điền khuyết (hộp chọn) |
| 6 | HĐ3.2 — tình huống 6 | `nv1-go-loi` | tr.84 | Gợi ý sửa (khối lệnh vẽ lại) + nút dự án mẫu | Trắc nghiệm |
| 7 | HĐ3.3 Cài đặt tìm max | `nv2-chuong-trinh` | Hình 16.3 | Biến, nhận dạng khối lệnh | Trắc nghiệm |
| 8 | HĐ3.4 Gỡ lỗi — Bảng 16.2 | `nv2-kiem-thu` | Bảng 16.2 | Chọn đầu ra đúng 8 tình huống | Điền khuyết (hộp chọn) |
| 9 | HĐ3.4 — tình huống 6, 7, 8 | `nv2-go-loi` | tr.86 | Giải thích theo SGK + nút dự án mẫu | Trắc nghiệm |
| 10 | (GV chọn thêm) Săn lỗi | `san-loi` | — | 6 chương trình lỗi | Hộp quà |
| 11 | Luyện tập SGK | `luyen-tap` | tr.86 | Loại bỏ số âm — gợi ý khối lệnh | Trắc nghiệm |
| 12 | HĐ4 Vận dụng (theo SGK) | `van-dung` | tr.86 | Bỏ qua dữ liệu chữ — gợi ý khối lệnh | Trắc nghiệm |
| 13 | Nhìn lại | `van-dung-nha` | — | Lỗi đã gặp và cách sửa | Tự luận |
| 14 | Tổng kết | `tong-ket` | — | Em đã học, thử thách | Trắc nghiệm |

## 5. Quyết định (GV đã chọn)
- **Nút mở:** chỉ 2 dự án Scratch mẫu của giáo án (955625070, 992442586), đặt ở hai màn gỡ lỗi. Không thêm nút Quizizz vì app đã có các câu hỏi Mở đầu.
- **Gỡ lỗi theo SGK:** tình huống 6, 7 (Bảng 16.2) vẫn xử lí đúng.
  - App đưa cách sửa đúng theo mẫu Hình 16.1c: hỏi → lặp lại cho đến khi hợp lệ thì hỏi lại → đặt biến sau vòng lặp.
  - Các chương trình sửa trong giáo án có lỗi: không gán lại biến Mức lương; điều kiện X > 0 không cho nhập 0 để kết thúc.
- **Luyện tập, Vận dụng theo SGK:**
  - Luyện tập: loại bỏ số âm ở tình huống 6 Bảng 16.2.
  - Vận dụng: bỏ qua dữ liệu chữ (tình huống 8).
  - Không dùng BT1, BT2 của giáo án.
- **Tương tác thêm:** điền bảng kiểm thử có chấm điểm, trò săn lỗi. HS lập trình trên Scratch thật.
- **Không mô phỏng Scratch trong app.** Các khối lệnh gợi ý do app vẽ lại bằng HTML theo dạng khối Scratch.
