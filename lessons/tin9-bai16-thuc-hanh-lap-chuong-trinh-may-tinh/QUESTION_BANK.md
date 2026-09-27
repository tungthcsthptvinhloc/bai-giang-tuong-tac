# NGÂN HÀNG CÂU HỎI — TIN 9 BÀI 16: THỰC HÀNH — LẬP CHƯƠNG TRÌNH MÁY TÍNH

> Sinh từ `data/lesson.js` (nguồn chính). Sửa câu hỏi trong `data/lesson.js`.

## 1. Mở đầu — Khối lệnh này là cấu trúc gì? 🧩  `mo-dau`

**Câu 1** (Nhận biết) — Câu 1: Khối lệnh sau là dạng cấu trúc:
- A. Rẽ nhánh
- B. Lặp ✅
- C. Tuần tự
- D. Không có cấu trúc
- Giải thích: Khối “lặp lại cho đến khi…” là cấu trúc lặp.

**Câu 2** (Nhận biết) — Câu 2: Các khối lệnh sau là dạng cấu trúc:
- A. Rẽ nhánh
- B. Lặp
- C. Tuần tự ✅
- D. Không có cấu trúc
- Giải thích: Ba khối “đặt… thành…” thực hiện lần lượt từ trên xuống — cấu trúc tuần tự.

**Câu 3** (Nhận biết) — Câu 3: Khối lệnh sau là dạng cấu trúc:
- A. Rẽ nhánh ✅
- B. Lặp
- C. Tuần tự
- D. Không có cấu trúc
- Giải thích: Khối “nếu… thì… nếu không thì…” là cấu trúc rẽ nhánh.

**Câu 4** (Thông hiểu) — Câu 4: Chương trình máy tính là:
- A. Bản mô tả thuật toán bằng ngôn ngữ mà máy tính có thể “hiểu” và thực hiện ✅
- B. Bản vẽ sơ đồ khối trên giấy
- C. Danh sách các biến
- D. Kết quả chạy trên màn hình
- Giải thích: Chương trình là bản mô tả thuật toán theo quy tắc của ngôn ngữ lập trình để máy tính thực hiện.

## 2. Nhiệm vụ 1 — Bước 1: Tạo các biến nhớ 📦  `nv1-bien`

**Phân loại** — Nhiệm vụ 1 (SGK tr.83): lập chương trình Scratch tính và hiển thị tiền lương theo thuật toán Bài 15. Xếp mỗi biến vào đúng loại, rồi tạo các biến này trên Scratch (nhóm đôi).

- **📥 Biến đầu vào:** muc_luong · tgian_laodong
- **📤 Biến đầu ra:** tien_luong
- **🔧 Biến trung gian:** tgian_dmuc · tgian_vuot · luong_dmuc · luong_vuot

## 3. Bước 2: Lặp với điều kiện sau → lặp với điều kiện trước 🔁  `nv1-vong-lap`

**Câu 5** (Thông hiểu) — Vì sao bước nhập tgian_laodong cần chuyển từ lặp với điều kiện sau (Hình 16.1a) sang lặp với điều kiện trước (Hình 16.1b)?
- A. Để chương trình chạy nhanh hơn
- B. Vì Scratch không có biến
- C. Để phù hợp với cấu trúc lặp có sẵn trong Scratch (“lặp lại cho đến khi” kiểm tra điều kiện trước) ✅
- D. Vì sơ đồ a) sai
- Giải thích: SGK: cần chuyển thành vòng lặp với điều kiện trước để phù hợp với cấu trúc lặp có sẵn trong ngôn ngữ lập trình trực quan.

**Câu 6** (Vận dụng) — Trong Hình 16.1c, vòng lặp dừng khi nào?
- A. Khi trả lời < 1
- B. Khi trả lời > 60
- C. Khi trả lời hợp lệ: không phải (trả lời < 1 hoặc trả lời > 60), tức 1 ≤ trả lời ≤ 60 ✅
- D. Không bao giờ dừng
- Giải thích: “Lặp lại cho đến khi không phải (trả lời < 1 hoặc trả lời > 60)”: dừng khi số giờ nằm trong khoảng 1 đến 60.

**Câu 7** (Vận dụng cao) — Vì sao khối “đặt tgian_laodong thành trả lời” đặt SAU vòng lặp?
- A. Để lấy câu trả lời hợp lệ cuối cùng sau khi đã nhập lại ✅
- B. Vì Scratch bắt buộc
- C. Để biến luôn bằng 0
- D. Không có lí do
- Giải thích: Sau vòng lặp, “trả lời” chắc chắn hợp lệ nên mới gán vào biến tgian_laodong.

## 4. Bước 3: Tạo chương trình tính lương 🐱  `nv1-chuong-trinh`

**Câu 8** (Thông hiểu) — Khối “nếu tgian_laodong > 40 thì … nếu không thì …” tương ứng với phần nào của sơ đồ khối Hình 15.3?
- A. Nhập muc_luong
- B. Xuất tien_luong
- C. Kết thúc
- D. Khối điều kiện tgian_laodong > 40 và hai nhánh tính tgian_dmuc, tgian_vuot ✅
- Giải thích: Cấu trúc rẽ nhánh: đúng → tgian_dmuc = 40, tgian_vuot = tgian_laodong − 40; sai → tgian_dmuc = tgian_laodong, tgian_vuot = 0.

**Câu 9** (Nhận biết) — Khối lệnh nào dùng để xuất kết quả tiền lương?
- A. đặt tien_luong thành luong_dmuc + luong_vuot
- B. hỏi … và đợi
- C. nói kết hợp “Tiền lương theo tuần =” tien_luong trong 5 giây ✅
- D. dừng lại tất cả
- Giải thích: Khối “nói” hiển thị tiền lương — tương ứng khối Xuất tien_luong.

**Câu 10** (Vận dụng) — Thứ tự đúng của các nhóm khối lệnh trong chương trình là:
- A. Nhập mức lương → Nhập số giờ (vòng lặp) → Rẽ nhánh tính tgian_dmuc, tgian_vuot → Tính luong_dmuc, luong_vuot, tien_luong → Nói kết quả ✅
- B. Tính lương → Nhập số giờ → Nhập mức lương → Rẽ nhánh → Nói
- C. Nói → Nhập → Tính
- D. Rẽ nhánh → Nhập → Nói → Tính
- Giải thích: Theo sơ đồ khối Hình 15.3: nhập → kiểm tra số giờ → rẽ nhánh → tính lương → xuất.

**Câu 11** (Nhận biết) — Trong chương trình, hệ số 1,5 phải viết là:
- A. 1,5
- B. 15
- C. 1.5 ✅
- D. 3/2,0
- Giải thích: Dùng dấu chấm thay cho dấu phẩy ngăn cách phần nguyên và phần thập phân: 1.5.

## 5. b) Gỡ lỗi — Bảng kiểm thử tính lương 🧪  `nv1-kiem-thu`

**Điền phiếu (hộp chọn)** — Nhóm đôi: chạy chương trình với từng bộ dữ liệu của Bảng 16.1 (đơn vị tiền: nghìn đồng, thời gian: giờ). Chọn đầu ra đúng mà chương trình cần trả về. Làm hết rồi bấm Nộp bài.

Tình huống 1: muc_luong = 100, tgian_laodong = 30 (dưới định mức) → {{}}  
Tình huống 2: muc_luong = 100, tgian_laodong = 40 (vừa đủ định mức) → {{}}  
Tình huống 3: muc_luong = 100, tgian_laodong = 50 (vượt định mức) → {{}}  
Tình huống 4: muc_luong = 100, tgian_laodong = 60 (vừa đạt mức tối đa) → {{}}  
Tình huống 5: muc_luong = 100, tgian_laodong = 70 → {{}}  
Tình huống 6: muc_luong = −100, tgian_laodong = 50 → {{}}

- Đáp án: 3000 · 4000 · 5500 · 7000 · Hỏi lại số giờ làm việc · Hỏi lại mức lương
- Giải thích: 30 × 100 = 3000 · 40 × 100 = 4000 · 4000 + 10 × 100 × 1.5 = 5500 · 4000 + 20 × 100 × 1.5 = 7000 · 70 giờ vượt tối đa → hỏi lại “Nhân viên đó làm việc bao nhiêu giờ?” · mức lương âm → cần hỏi lại “Mức lương của nhân viên (theo giờ)?”.

## 6. Gỡ lỗi tình huống 6: mức lương không hợp lí 🔧  `nv1-go-loi`

**Câu 12** (Vận dụng) — Chương trình chưa sửa, nhập muc_luong = −100, tgian_laodong = 50 thì tiền lương là:
- A. 5500
- B. Máy báo lỗi
- C. 0
- D. −5500 ✅
- Giải thích: 40 × (−100) + 10 × (−100) × 1.5 = −4000 − 1500 = −5500: kết quả vô lí vì đầu vào chưa hợp lí.

**Câu 13** (Vận dụng cao) — Bạn Hà sửa: đặt muc_luong thành trả lời, rồi mới “lặp lại cho đến khi trả lời > 0: hỏi lại”. Nhập −100 rồi 100, tiền lương tính với mức lương nào?
- A. −100, vì biến muc_luong không được gán lại sau khi hỏi lại ✅
- B. 100
- C. 0
- D. Máy báo lỗi
- Giải thích: Phải đặt muc_luong thành trả lời SAU vòng lặp (hoặc gán lại trong vòng lặp).

## 7. Nhiệm vụ 2: Chương trình tìm giá trị lớn nhất 🏆  `nv2-chuong-trinh`

**Câu 14** (Nhận biết) — Biến đầu vào và biến đầu ra của chương trình là:
- A. Đầu vào: max; đầu ra: x
- B. Đầu vào: trả lời; đầu ra: 0
- C. Đầu vào: x, max; không có đầu ra
- D. Đầu vào: x; đầu ra: max ✅
- Giải thích: SGK: biến đầu vào x, biến đầu ra max.

**Câu 15** (Thông hiểu) — Khối “lặp lại cho đến khi x = 0” chứa những khối nào bên trong?
- A. đặt max thành 0
- B. nếu max = 0 thì nói “Không có dữ liệu!”
- C. nếu x > max thì đặt max thành x; hỏi “Nhập số nguyên dương tiếp theo!” và đặt x thành trả lời ✅
- D. dừng lại tất cả
- Giải thích: Thân lặp: so sánh x với max rồi nhập x tiếp theo (bước 4.1, 4.2 của Hình 15.4a).

**Câu 16** (Thông hiểu) — Khối “nếu max = 0 thì nói Không có dữ liệu! nếu không thì nói kết hợp Số lớn nhất là max” đặt ở đâu?
- A. Trước khối đặt max thành 0
- B. Trong vòng lặp
- C. Sau vòng lặp ✅
- D. Không cần dùng
- Giải thích: Sau khi nhập xong (x = 0) mới xuất kết quả — bước 5 của thuật toán.

## 8. b) Gỡ lỗi — Bảng kiểm thử tìm số lớn nhất 🧪  `nv2-kiem-thu`

**Điền phiếu (hộp chọn)** — Nhóm đôi: chạy chương trình, nhập lần lượt từng số (nhấn Enter sau mỗi số) theo Bảng 16.2 đến khi kết thúc bằng 0. Chọn đầu ra đúng mà chương trình cần trả về. Làm hết rồi bấm Nộp bài.

Tình huống 1: 1 2 3 0 (dãy tăng) → {{}}  
Tình huống 2: 8 3 10 6 0 (ngẫu nhiên) → {{}}  
Tình huống 3: 12 8 3 0 (dãy giảm) → {{}}  
Tình huống 4: 5 0 (một giá trị) → {{}}  
Tình huống 5: 0 (không có dữ liệu) → {{}}  
Tình huống 6: 8 −5 3 9 6 0 (có số âm) → {{}}  
Tình huống 7: −8 −6 0 (không có số nguyên dương) → {{}}  
Tình huống 8: 7 data 12 0 (có dữ liệu chữ) → {{}}

- Đáp án: 3 · 10 · 12 · 5 · Không có dữ liệu! · 9 · Không có dữ liệu! · 12
- Giải thích: Đầu ra cần có: 3 · 10 · 12 · 5 · Không có dữ liệu! · 9 · Không có dữ liệu! · 12. Tình huống 8: đầu ra đúng phải là 12, nhưng chương trình hiện tại cho kết quả sai (xem hoạt động tiếp theo).

## 9. Gỡ lỗi Nhiệm vụ 2: số âm và dữ liệu chữ 🔍  `nv2-go-loi`

**Câu 17** (Thông hiểu) — Tình huống 7 (−8 −6 0): vì sao chương trình vẫn hiển thị “Không có dữ liệu!”?
- A. Vì các số âm không lớn hơn max = 0 nên max vẫn bằng 0 ✅
- B. Vì −8 > 0 đúng
- C. Vì chương trình tự xoá số âm
- D. Vì vòng lặp không chạy
- Giải thích: max giữ giá trị 0 → nhánh “Không có dữ liệu!”.

**Câu 18** (Vận dụng cao) — Tình huống 8 (7 data 12 0): chương trình chưa sửa hiển thị gì?
- A. Số lớn nhất là 12
- B. Số lớn nhất là 7
- C. Số lớn nhất là data ✅
- D. Không có dữ liệu!
- Giải thích: “data” so với 7 theo kiểu văn bản → lớn hơn → max = “data”; 12 so với “data” cũng theo văn bản → không lớn hơn → max giữ “data”.

## 10. Trò chơi: Thám tử săn lỗi chương trình 🕵️  `san-loi`

**Câu 19** (Nhận biết) — Hộp 1 — Khối: đặt luong_vuot thành (muc_luong * tgian_vuot * 1,5). Chương trình tính sai. Lỗi ở đâu?
- A. Thiếu biến tien_luong
- B. Phải dùng phép cộng
- C. Sai tên biến muc_luong
- D. Hệ số 1,5 phải viết là 1.5 (dấu chấm) ✅
- Giải thích: Trong chương trình, số thập phân dùng dấu chấm: 1.5.

**Câu 20** (Vận dụng) — Hộp 2 — Nhập số giờ: hỏi…; đặt tgian_laodong thành trả lời; lặp lại cho đến khi 1 ≤ trả lời ≤ 60: hỏi lại. Nhập 70 rồi 50, chương trình vẫn tính với 70 giờ. Lỗi ở đâu?
- A. Điều kiện lặp sai
- B. Thiếu khối hỏi
- C. Khối “đặt tgian_laodong thành trả lời” đặt trước vòng lặp, không được gán lại sau khi hỏi lại ✅
- D. Không có lỗi
- Giải thích: Phải đặt biến SAU vòng lặp như Hình 16.1c.

**Câu 21** (Vận dụng) — Hộp 3 — Vòng lặp: lặp lại cho đến khi (trả lời < 1 hoặc trả lời > 60): hỏi lại số giờ. Nhập 50 thì máy hỏi lại mãi, nhập 70 thì được chấp nhận. Lỗi ở đâu?
- A. Thiếu khối “không phải” — điều kiện dừng bị ngược ✅
- B. Phải dùng “và” thay “hoặc”
- C. Sai số 60
- D. Thiếu khối nói
- Giải thích: Đúng là: lặp lại cho đến khi KHÔNG PHẢI (trả lời < 1 hoặc trả lời > 60).

**Câu 22** (Vận dụng cao) — Hộp 4 — Nhánh đúng: đặt tgian_vuot thành (40 − tgian_laodong). Nhập 100 và 50 giờ, tiền lương chỉ 2500. Lỗi ở đâu?
- A. Phép trừ bị đảo: tgian_vuot = tgian_laodong − 40 ✅
- B. Sai định mức 40
- C. Phải nhân 2
- D. Thiếu biến tgian_dmuc
- Giải thích: 40 − 50 = −10 → luong_vuot = −1500 → 4000 − 1500 = 2500. Đúng phải là 50 − 40 = 10 giờ vượt.

**Câu 23** (Vận dụng) — Hộp 5 — Tìm max: khối “đặt max thành 0” bị đặt vào trong vòng lặp. Nhập 8 3 10 6 0, kết quả là 6. Lỗi ở đâu?
- A. Khởi tạo max = 0 phải đặt trước vòng lặp; trong vòng lặp max bị đặt lại 0 mỗi lần ✅
- B. Điều kiện x = 0 sai
- C. Phải so sánh x < max
- D. Không có lỗi
- Giải thích: Giá trị khởi đầu của vòng lặp đặt một lần trước vòng lặp.

**Câu 24** (Vận dụng cao) — Hộp 6 — Tìm max: trong vòng lặp, khối hỏi số tiếp theo đặt TRƯỚC khối “nếu x > max thì…”. Nhập 12 8 3 0, kết quả là 8. Lỗi ở đâu?
- A. Thiếu biến x
- B. Phải bắt đầu max = 12
- C. Sai thứ tự khối trong thân lặp: số đầu tiên (12) chưa được so sánh đã bị thay bằng số tiếp theo ✅
- D. Điều kiện x > max sai
- Giải thích: Thân lặp phải so sánh x với max TRƯỚC, rồi mới nhập x tiếp theo (bước 4.1 rồi 4.2).

## 11. Luyện tập: Loại bỏ số âm (tình huống 6, Bảng 16.2) ✍️  `luyen-tap`

**Câu 25** (Vận dụng cao) — Vì sao điều kiện dừng vòng lặp nhập lại là “không phải (trả lời < 0)” mà không phải “trả lời > 0”?
- A. Vì phải cho phép nhập số 0 để kết thúc dãy ✅
- B. Vì Scratch không có dấu >
- C. Vì số 0 là số âm
- D. Không có lí do
- Giải thích: Nếu bắt trả lời > 0 thì không nhập được 0 để kết thúc — chương trình không dừng được.

**Câu 26** (Vận dụng) — Sau khi sửa, nhập 8 −5 3 9 6 0 thì chương trình:
- A. Báo lỗi và dừng
- B. Kết quả là −5
- C. Kết quả là 8
- D. Hỏi lại khi gặp −5, kết quả vẫn là 9 ✅
- Giải thích: Số âm bị loại (yêu cầu nhập lại), các số hợp lệ vẫn được so sánh: max = 9.

## 12. Vận dụng: Bỏ qua dữ liệu chữ (tình huống 8) 🔠  `van-dung`

**Câu 27** (Vận dụng cao) — Với gợi ý trên, nhập “data” thì chương trình làm gì?
- A. Hỏi lại vì (data − 0) = 0, khác “data” nên điều kiện sai ✅
- B. Đặt x thành data
- C. Dừng chương trình
- D. Đặt x thành 0 và kết thúc
- Giải thích: Dữ liệu chữ bị bỏ qua (yêu cầu nhập lại); sau khi sửa, tình huống 8 cho kết quả đúng 12.

## 13. Nhìn lại: Em đã gỡ lỗi như thế nào? 📝  `van-dung-nha`

**Tự luận 1** — Trong khi thực hành, chương trình của nhóm em đã gặp lỗi nào? Nguyên nhân là gì (sai thứ tự lệnh, sai điều kiện, thiếu bước, sai cách viết số…) và em đã sửa thế nào?
- Hướng trả lời: Ví dụ: viết 1,5 thay cho 1.5 → sửa thành 1.5; đặt biến trước vòng lặp nên giá trị sai không được thay → chuyển khối đặt biến ra sau vòng lặp; thiếu khối “không phải” nên điều kiện dừng bị ngược → thêm khối “không phải”. Luôn chạy lại toàn bộ bảng dữ liệu kiểm thử sau khi sửa.

## 14. Tổng kết  `tong-ket`

**Câu 28** (Vận dụng) — Mức lương 100 nghìn đồng/giờ, làm 45 giờ. Chương trình đúng hiển thị tiền lương là:
- A. 4500
- B. 5000
- C. 4750 ✅
- D. 6750
- Giải thích: 4000 + 5 × 100 × 1.5 = 4750 (nghìn đồng).

**Câu 29** (Vận dụng cao) — Khi lập bộ dữ liệu kiểm thử, vì sao cần có các giá trị như 40 giờ, 60 giờ, 70 giờ?
- A. Để chương trình chạy lâu hơn
- B. Vì SGK bắt buộc số chẵn
- C. Không cần thiết
- D. Mỗi bộ đại diện cho một tình huống: đúng định mức, đúng mức tối đa, vượt mức cho phép — dễ lộ lỗi ở các mốc ✅
- Giải thích: Dữ liệu kiểm thử nên bao quát các tình huống, đặc biệt các giá trị ở mốc giới hạn.

