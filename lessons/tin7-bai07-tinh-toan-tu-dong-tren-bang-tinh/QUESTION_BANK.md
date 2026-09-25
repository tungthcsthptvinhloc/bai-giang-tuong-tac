# NGÂN HÀNG CÂU HỎI — TIN 7 BÀI 7: TÍNH TOÁN TỰ ĐỘNG TRÊN BẢNG TÍNH

> Sinh từ `data/lesson.js` (nguồn chính). Câu **Gõ công thức**: HS nhập công thức vào ô trên bảng tính mô phỏng; chấm tự động bằng cách thử đổi dữ liệu — công thức tương đương (VD =D4*C4) được tính đúng, công thức chỉ có số (=25*10) bị tính sai.

## 1. Mở đầu — Dự án Trường học xanh cần tính toán gì? 🌳  `mo-dau`

**Câu 1** (Nhận biết) — Tính “Tổng số cây hoa” = số vị trí × số cây ở mỗi vị trí. Trong phần mềm bảng tính, phép NHÂN được kí hiệu bằng dấu nào?
- A. x
- B. ^
- C. :
- D. * ✅
- Giải thích: Trong bảng tính: nhân là *, chia là /, luỹ thừa là ^ (Bảng 7.1).

## 2. 1. Kiểu dữ liệu trên bảng tính 🔤  `kieu-du-lieu`

**Câu 2** (Thông hiểu) — Công thức tính tổng điểm Toán và Ngữ văn của bạn Nguyễn Văn Hùng (8.5 và 9) được nhập vào ô là:
- A. 8.5+9
- B. 8.5+9=
- C. = 8.5 9
- D. =8.5+9 ✅
- Giải thích: Công thức luôn bắt đầu bằng dấu “=”, sau đó là biểu thức: =8.5+9.

## 3. Trò chơi: Dữ liệu này thuộc kiểu nào? 🗂️  `phan-loai-kieu`

**Phân loại** — Xếp mỗi dữ liệu vào đúng kiểu dữ liệu. Xếp hết rồi bấm Nộp bài.

- **🔤 Văn bản:** Nguyễn Văn Hùng · Hải Phòng
- **🔢 Số:** 8.5 · 250
- **📅 Ngày tháng:** 3/5/2010 · 12/15/2020
- **🧮 Công thức:** =2+1.5+2.5 · =C4*D4

## 4. Ghép phép toán — kí hiệu trong bảng tính ➕  `phep-toan`

**Ghép đôi** — Ghép mỗi phép toán với kí hiệu và ví dụ trong phần mềm bảng tính. Làm hết rồi bấm Nộp bài.

| Bên trái | Bên phải (đúng) |
|---|---|
| Phép cộng (+) | +   VD: 20 + 7 |
| Phép trừ (−) | −   VD: 42 − 35 |
| Phép nhân (×) | *   VD: 7*9 |
| Phép chia (:) | /   VD: 35/7 |
| Phép luỹ thừa (aˣ) | ^   VD: 5^3 |

## 5. Thử thách: Công thức nào sai? 🕵️  `cong-thuc-sai`

**Câu 3** (Thông hiểu) — Trong phần mềm bảng tính, những công thức nào dưới đây SAI? (chọn tất cả)
- A. = 5^2 + 6*101
- B. = 6*(3 + 2)) ✅
- C. = 2(3 + 4) ✅
- D. = 1^2 + 2^2
- Giải thích: B sai: 1 ngoặc mở nhưng 2 ngoặc đóng. C sai: thiếu dấu phép tính giữa 2 và (3+4) (phải viết 2*(3+4)).

**Câu 4** (Vận dụng) — Công thức =5^2+6*101 cho kết quả bằng bao nhiêu?
- A. 3131
- B. 631 ✅
- C. 656
- D. 5252
- Giải thích: Luỹ thừa trước, rồi nhân, rồi cộng: 5^2 = 25; 6*101 = 606; 25 + 606 = 631.

## 6. 2. Công thức dùng địa chỉ ô ⚡  `cong-thuc-dia-chi`

**Câu 5** (Vận dụng) — Nhập công thức tính Tổng số cây hoa vào ô E4 (dùng địa chỉ ô để kết quả tự cập nhật).
- Gõ công thức vào **E4** — đáp án ô đầu: **=C4*D4**
- Giải thích: Tổng số = Vị trí × Số lượng → =C4*D4. Dùng địa chỉ ô nên khi C4, D4 thay đổi, E4 tự cập nhật (=25*10 không tự cập nhật).

**Câu 6** (Thông hiểu) — Ô E4 chứa =25*10. Em sửa ô C4 từ 25 thành 30. Kết quả ở E4 là:
- A. 250 — không thay đổi ✅
- B. 300
- C. 30
- D. Báo lỗi
- Giải thích: Công thức =25*10 chỉ có số, không có địa chỉ ô nên không tự cập nhật — vẫn là 250.

## 7. Luyện nhập công thức: tam giác & hình tròn 📐  `tam-giac-hinh-tron`

**Câu 7** (Vận dụng) — Hình 7.5: nhập công thức tính NỬA CHU VI tam giác ABC vào ô C6.
- Gõ công thức vào **C6** — đáp án ô đầu: **=(C3+C4+C5)/2**
- Giải thích: Nửa chu vi = (AB + BC + CA) : 2 → =(C3+C4+C5)/2. Nhớ dùng ngoặc tròn!

**Câu 8** (Vận dụng) — Hình 7.6: nhập công thức tính CHU VI hình tròn vào ô C5 (C = 2 × Pi × R).
- Gõ công thức vào **C5** — đáp án ô đầu: **=2*C4*C3**
- Giải thích: Chu vi = 2 × Pi × R → =2*C4*C3 (Pi ở C4, bán kính ở C3).

**Câu 9** (Vận dụng cao) — Hình 7.6: nhập công thức tính DIỆN TÍCH hình tròn vào ô C6 (S = Pi × R²).
- Gõ công thức vào **C6** — đáp án ô đầu: **=C4*C3*C3**
- Giải thích: Diện tích = Pi × R × R → =C4*C3*C3 (hoặc =C4*C3^2).

## 8. 3. Sao chép ô tính chứa công thức 📋  `sao-chep`

**Câu 10** (Vận dụng) — Sao chép công thức của ô E4 xuống các ô E5, E6 để tính Tổng số cho các loại cây còn lại.
- Gõ công thức vào **E5:E6** — đáp án ô đầu: **=C5*D5**
- Giải thích: Sau khi sao chép: E5 = C5*D5, E6 = C6*D6 — địa chỉ tự điều chỉnh, kết quả 100 và 150.

**Câu 11** (Vận dụng) — Sao chép công thức =C4*D4 từ ô E4 sang ô E10 thì công thức tại ô E10 là:
- A. =C4*D4
- B. =C10*D10 ✅
- C. =E10*D10
- D. =C10*D4
- Giải thích: Dời xuống 6 hàng → mọi địa chỉ tăng 6 hàng: =C10*D10.

**Câu 12** (Vận dụng cao) — Ô G10 có công thức =H10 + 2*K10. Sao chép công thức này đến ô G12 thì công thức là:
- A. =H10 + 2*K10
- B. =H12 + 2*K10
- C. =H12 + 2*K12 ✅
- D. =H12 + 4*K12
- Giải thích: Dời xuống 2 hàng: H10 → H12, K10 → K12; số 2 giữ nguyên → =H12 + 2*K12.

## 9. Sắp xếp các bước sao chép công thức 🪜  `cac-buoc-sao-chep`

**Sắp xếp** — Sắp xếp các bước sao chép công thức từ ô E4 xuống E5:E6 theo đúng thứ tự rồi bấm Nộp bài.

1. Chọn ô tính chứa công thức cần sao chép (ô E4)
2. Nhấn tổ hợp phím Ctrl+C
3. Đánh dấu vùng muốn sao chép đến (E5:E6)
4. Nhấn tổ hợp phím Ctrl+V để dán

## 10. 4. Thực hành: Dự kiến số lượng cây cần trồng 🌱  `thuc-hanh`

**Câu 13** (Vận dụng) — Nhập công thức vào ô E7 để tính tổng số cây của cả ba loại cây dự kiến trồng.
- Gõ công thức vào **E7** — đáp án ô đầu: **=E4+E5+E6**
- Giải thích: E7 = E4 + E5 + E6 = 250 + 100 + 150 = 500 cây.

## 11. Luyện tập: Trang tính 3. Tìm hiểu giống cây 💰  `luyen-tap`

**Câu 14** (Vận dụng) — Tính cột Thành tiền: nhập công thức vào ô F4, rồi sao chép xuống F5:F19 (Thành tiền = Đơn giá × Số lượng).
- Gõ công thức vào **F4:F19** — đáp án ô đầu: **=D4*E4**
- Giải thích: F4 = D4*E4 = 500 000; sao chép xuống: F5 = D5*E5, …, F19 = D19*E19.

## 12. Thử thách nhanh — Gieo mầm Trường học xanh 🌱  `thu-thach`

**Câu 15** (Nhận biết) — Công thức trong bảng tính luôn bắt đầu bằng:
- A. Chữ cái
- B. Dấu “+”
- C. Dấu “*”
- D. Dấu “=” ✅
- Giải thích: Công thức luôn bắt đầu bằng dấu “=”.

**Câu 16** (Nhận biết) — Kí hiệu phép chia trong phần mềm bảng tính là:
- A. :
- B. ÷
- C. / ✅
- D. \
- Giải thích: Phép chia dùng dấu “/”, VD 35/7.

**Câu 17** (Thông hiểu) — Vì sao nên dùng =C4*D4 thay cho =25*10?
- A. Vì gõ ngắn hơn
- B. Vì khi dữ liệu ở C4, D4 thay đổi, kết quả tự động cập nhật ✅
- C. Vì =25*10 cho kết quả sai
- D. Vì phần mềm không cho nhập số vào công thức
- Giải thích: Dùng địa chỉ ô → tính toán tự động khi dữ liệu thay đổi.

**Câu 18** (Vận dụng) — Ô B2 có công thức =A2*2. Sao chép ô B2 sang ô B5 thì công thức ở B5 là:
- A. =A2*2
- B. =A5*5
- C. =A5*2 ✅
- D. =B5*2
- Giải thích: Dời xuống 3 hàng: A2 → A5; số 2 giữ nguyên → =A5*2.

**Câu 19** (Vận dụng cao) — Ô C1 có công thức =A1+B1. Sao chép sang ô D1 (sang phải 1 cột) thì công thức ở D1 là:
- A. =B1+C1 ✅
- B. =A1+B1
- C. =A2+B2
- D. =B2+C2
- Giải thích: Dời sang phải 1 cột: A → B, B → C; hàng giữ nguyên → =B1+C1.

## 13. Vận dụng 1: Thay đổi cách căn lề ↔️  `van-dung-1`

**Tự luận 1** — Phần mềm bảng tính mặc định căn phải dữ liệu số và ngày tháng, căn trái dữ liệu văn bản. Em có thể thay đổi lại cách căn lề cho dữ liệu số, ngày tháng và văn bản được không? Nếu có thì bằng lệnh nào?
- Hướng trả lời: Có. Chọn ô/vùng dữ liệu rồi dùng các lệnh căn lề trong nhóm lệnh Alignment của thẻ Home: căn trái, căn giữa, căn phải (theo chiều ngang) và căn trên, giữa, dưới (theo chiều dọc).

## 14. Vận dụng 2: Diện tích phủ rừng vùng Đông Bắc 🌲  `van-dung-2`

**Câu 20** (Vận dụng) — Nhập công thức tính Tổng diện tích rừng của Tuyên Quang vào ô D4, rồi sao chép cho các tỉnh còn lại (D5:D8).
- Gõ công thức vào **D4:D8** — đáp án ô đầu: **=B4+C4**
- Giải thích: Tổng diện tích = Rừng tự nhiên + Rừng trồng → D4 = B4+C4; sao chép xuống: D5 = B5+C5, …, D8 = B8+C8.

## 15. Tổng kết  `tong-ket`

**Câu 21** (Vận dụng) — Nhập vào ô C2 công thức tính tổng hai số ở A2 và B2, rồi sao chép xuống C3:C4.
- Gõ công thức vào **C2:C4** — đáp án ô đầu: **=A2+B2**
- Giải thích: C2 = A2+B2; sao chép xuống: C3 = A3+B3, C4 = A4+B4.

**Câu 22** (Vận dụng cao) — Bạn Nam nhập vào ô E4 công thức =C4*D4 nhưng gõ thiếu dấu “=” (C4*D4). Ô E4 sẽ hiển thị gì?
- A. Kết quả 250
- B. Dòng chữ C4*D4 (phần mềm hiểu là văn bản) ✅
- C. Báo lỗi #DIV/0!
- D. Số 0
- Giải thích: Không có dấu “=” thì phần mềm coi đó là văn bản, không tính toán.

---
**Thống kê:** 22 câu chấm điểm + 3 bài phân loại / ghép đôi / sắp xếp + 1 câu tự luận. Mức độ: Nhận biết 3 · Thông hiểu 4 · Vận dụng 11 · Vận dụng cao 4.
