# NGÂN HÀNG CÂU HỎI — TIN 9 BÀI 12a: SỬ DỤNG HÀM IF

> Sinh từ `data/lesson.js` (nguồn chính). Sửa câu hỏi trong `data/lesson.js`.

## 1. Mở đầu — Hộp quà may mắn 🎁  `mo-dau`

**Câu 1** (Nhận biết) — Câu 1. Trong bảng tính điện tử, hàm SUMIF tính tổng giá trị của những ô thoả mãn mấy điều kiện?
- A. 1 ✅
- B. 2
- C. 3
- D. 4
- Giải thích: SUMIF tính tổng giá trị của những ô thoả mãn một điều kiện (tham số criteria).

**Câu 2** (Nhận biết) — Câu 2. Trong bảng tính điện tử, hàm nào sau đây cho phép tính tổng các giá trị kiểu số thoả mãn một điều kiện cho trước?
- A. COUNTIF
- B. SUM
- C. COUNT
- D. SUMIF ✅
- Giải thích: SUMIF tính tổng theo điều kiện; COUNTIF chỉ đếm; SUM, COUNT không có điều kiện.

**Câu 3** (Thông hiểu) — Câu 3. Muốn tính tổng của vùng E2:E8 với điều kiện “Tin học 9” trong vùng dữ liệu A2:A8, ta dùng công thức nào?
- A. =SUMIF(A2:A8,"Tin học 9")
- B. =SUMIF(A2:E8,"Tin học 9",E2:E8)
- C. =SUMIF(A2:A8,"Tin học 9",E2:E8) ✅
- D. =SUMIF(E2:E8,"Tin học 9",A2:A8)
- Giải thích: range là vùng kiểm tra A2:A8, criteria "Tin học 9", sum_range là vùng cần cộng E2:E8.

**Câu 4** (Thông hiểu) — Câu 4. Muốn tính tổng các giá trị trong phạm vi A1:A5 có giá trị lớn hơn 7, em dùng công thức nào?
- A. =SUMIF(A1:A5,"=7")
- B. =SUMIF(A1:A5,"<7")
- C. =SUMIF(A1:A5,">7") ✅
- D. =SUMIF(A1:A5,">=7")
- Giải thích: “Lớn hơn 7” là ">7" (không lấy 7). Không có sum_range → cộng chính các ô của A1:A5.

**Câu 5** (Thông hiểu) — Câu 5. COUNTIF và SUMIF giống nhau ở điểm nào?
- A. Đều có tham số điều kiện kiểm tra (criteria) ✅
- B. Đều đếm số ô
- C. Đều tính tổng
- D. Đều không cần vùng dữ liệu
- Giải thích: Cả hai đều kiểm tra điều kiện criteria; COUNTIF đếm, SUMIF tính tổng.

**Câu 6** (Vận dụng) — Câu 6. Gia đình chi 90.5% cho Nhu cầu thiết yếu, quy tắc tài chính khuyên 50%. Muốn bảng tính TỰ ĐỘNG ghi nhận xét “Nhiều hơn” hay “Ít hơn”, em cần:
- A. Hàm COUNTIF
- B. Một hàm kiểm tra điều kiện rồi trả về giá trị tương ứng ✅
- C. Hàm SUMIF
- D. Hàm SUM
- Giải thích: COUNTIF đếm, SUMIF cộng — không ghi được nhận xét. Bài này học hàm điều kiện IF: kiểm tra điều kiện rồi trả về giá trị tương ứng.

## 2. Quy tắc quản lí tài chính 50-30-20 🥧  `quy-tac-50-30-20`

**Câu 7** (Nhận biết) — Theo quy tắc 50-30-20, phần nào được khuyên dành 30% số tiền?
- A. Nhu cầu thiết yếu
- B. Mong muốn cá nhân (giải trí, thời trang,…) ✅
- C. Tiết kiệm
- D. Tiền ăn
- Giải thích: 50% nhu cầu thiết yếu · 30% mong muốn cá nhân · 20% tiết kiệm.

**Câu 8** (Vận dụng) — Một gia đình có thu nhập 20 triệu đồng/tháng. Theo quy tắc 50-30-20, nên dành bao nhiêu cho tiết kiệm?
- A. 2 triệu đồng
- B. 6 triệu đồng
- C. 4 triệu đồng ✅
- D. 10 triệu đồng
- Giải thích: 20% × 20 triệu = 4 triệu đồng.

**Câu 9** (Thông hiểu) — Tỉ lệ 50-30-20 có thể linh hoạt điều chỉnh cho phù hợp tình hình thực tiễn.
- Đáp án: **Đúng**
- Giải thích: SGK: “Dĩ nhiên tỉ lệ 50-30-20 có thể linh hoạt điều chỉnh sao cho phù hợp tình hình thực tiễn.”

## 3. Hoạt động 1: Xếp khoản chi vào mục chi A, B, C 🗂️  `phan-loai-muc-chi`

**Phân loại** — Nhóm 3–4 bạn đọc Hoạt động 1 (SGK tr.48): mục A là Nhu cầu thiết yếu, B là Mong muốn cá nhân, C là Tiết kiệm. Xếp mỗi khoản chi vào đúng mục như cột I trong Hình 12a.2, rồi bấm Nộp bài.

- **A — Nhu cầu thiết yếu:** Ở · Ăn · Di chuyển · Học tập · Sức khoẻ
- **B — Mong muốn cá nhân:** Giải trí · Quà tặng/Từ thiện · Khác
- **C — Tiết kiệm:** Tiết kiệm

## 4. Hoạt động 1 — Câu 1: Công thức cột M (Tổng tiền) ➕  `hd1-cot-m`

**Câu 10** (Thông hiểu) — Công thức tại ô M3 tính tổng tiền của mục chi A (Nhu cầu thiết yếu) là:
- A. =SUM(H2:H10)
- B. =COUNTIF($I$2:$I$10,K3)
- C. =SUMIF($I$2:$I$10,K3,$H$2:$H$10) ✅
- D. =SUMIF($H$2:$H$10,K3,$I$2:$I$10)
- Giải thích: range là cột Mục chi $I$2:$I$10, điều kiện là ô K3 (A), sum_range là cột Tổng tiền $H$2:$H$10.

**Câu 11** (Vận dụng) — Tại ô M3 nhập công thức tính tổng tiền của mục chi A (dùng ô K3 làm điều kiện), rồi sao chép sang M4, M5.
- Đáp án: nhập vào M3:M5: **=SUMIF($I$2:$I$10,K3,$H$2:$H$10)**
- Giải thích: =SUMIF($I$2:$I$10,K3,$H$2:$H$10) → A: 12,340 · B: 300 · C: 1,000 (như Hình 12a.3).

## 5. Hoạt động 1 — Câu 1, 2: Tỉ lệ (cột N) và quy tắc nhận xét 📊  `hd1-cot-n`

**Câu 12** (Vận dụng) — Tại ô N3 nhập công thức tính tỉ lệ chi của mục A so với tổng tiền ở ô H11, rồi sao chép sang N4, N5.
- Đáp án: nhập vào N3:N5: **=M3/$H$11*100%**
- Giải thích: =M3/$H$11*100% → 90.5% · 2.2% · 7.3%. $H$11 là địa chỉ tuyệt đối để khi sao chép vẫn chia cho tổng tiền.

**Câu 13** (Thông hiểu) — Vì sao công thức ở N3 dùng $H$11 mà không dùng H11?
- A. Để công thức ngắn hơn
- B. Để khi sao chép sang N4, N5 vẫn chia cho tổng tiền ở ô H11 ✅
- C. Vì H11 chứa chữ
- D. Vì hàm IF bắt buộc có dấu $
- Giải thích: Nếu dùng H11, sao chép xuống N4 thành =M4/H12*100% — ô H12 trống nên báo lỗi #DIV/0!.

**Câu 14** (Vận dụng) — HĐ1 câu 2: Quy tắc nào dùng để đưa ra nhận xét ở cột O (Hình 12a.3) theo quy tắc 50-30-20?
- A. Nếu tổng tiền của mục lớn hơn 1,000 thì “Nhiều hơn”, còn không thì “Ít hơn”
- B. Mục nào có tỉ lệ lớn nhất thì “Nhiều hơn”, các mục khác “Ít hơn”
- C. Nếu số lần chi lớn hơn 1 thì “Nhiều hơn”, còn không thì “Ít hơn”
- D. Nếu tỉ lệ chi của mục lớn hơn tỉ lệ theo quy tắc (A: 50%, B: 30%, C: 20%) thì “Nhiều hơn”, còn không thì “Ít hơn” ✅
- Giải thích: Ví dụ mục Nhu cầu thiết yếu: Nếu tỉ lệ chi lớn hơn 50% thì nhận xét là “Nhiều hơn”, còn không thì nhận xét là “Ít hơn”.

## 6. So sánh tỉ lệ thực tế với quy tắc 50-30-20 ⚖️  `so-sanh-ti-le`

**Điền phiếu (hộp chọn)** — Nhóm so sánh tỉ lệ ở cột N (Hình 12a.3) với tỉ lệ trong Hình 12a.1: chọn tỉ lệ theo quy tắc và nhận xét cho từng mục chi. Làm hết rồi bấm Nộp bài.

Nhu cầu thiết yếu: thực tế 90.5% — quy tắc {{}} → {{}}  
Mong muốn cá nhân: thực tế 2.2% — quy tắc {{}} → {{}}  
Tiết kiệm: thực tế 7.3% — quy tắc {{}} → {{}}

- Đáp án: 50% · Nhiều hơn · 30% · Ít hơn · 20% · Ít hơn
- Giải thích: 90.5% > 50% → Nhiều hơn · 2.2% < 30% → Ít hơn · 7.3% < 20% → Ít hơn. Để bảng tính TỰ ĐIỀN nhận xét vào cột O, ta dùng hàm điều kiện IF.

## 7. Hàm IF — công thức chung ✨  `ham-if`

**Câu 15** (Nhận biết) — Trong công thức =IF(N3>50%,"Nhiều hơn","Ít hơn"), N3>50% là:
- A. logical_test — điều kiện kiểm tra ✅
- B. value_if_true — giá trị trả về nếu điều kiện đúng
- C. value_if_false — giá trị trả về nếu điều kiện sai
- D. Địa chỉ ô chứa kết quả
- Giải thích: N3>50%: điều kiện kiểm tra · "Nhiều hơn": giá trị trả về nếu đúng · "Ít hơn": giá trị trả về nếu sai.

**Câu 16** (Vận dụng) — Tại ô O3 nhập công thức nhận xét mục Nhu cầu thiết yếu: nếu tỉ lệ chi (N3) lớn hơn 50% thì “Nhiều hơn”, còn không thì “Ít hơn”.
- Đáp án: nhập vào O3: **=IF(N3>50%,"Nhiều hơn","Ít hơn")**
- Giải thích: =IF(N3>50%,"Nhiều hơn","Ít hơn") → 90.5% > 50% nên O3 hiện “Nhiều hơn”. Chữ trả về phải đặt trong dấu ngoặc kép.

**Câu 17** (Vận dụng) — Nếu tỉ lệ ở N3 đúng bằng 50% thì công thức =IF(N3>50%,"Nhiều hơn","Ít hơn") cho kết quả gì?
- A. Nhiều hơn
- B. Báo lỗi
- C. Ô trống
- D. Ít hơn ✅
- Giải thích: 50% > 50% là SAI (không lớn hơn) → trả về value_if_false: “Ít hơn”.

## 8. Ghép tham số hàm IF với ý nghĩa 🧩  `tham-so-if`

**Ghép đôi** — Ghép mỗi tham số / công thức ở cột trái với ý nghĩa hoặc kết quả đúng ở cột phải. Làm hết rồi bấm Nộp bài.

- logical_test ⟶ Điều kiện kiểm tra
- value_if_true ⟶ Giá trị trả về nếu điều kiện là đúng
- value_if_false ⟶ Giá trị trả về nếu điều kiện là sai
- =IF(N3>50%,"Nhiều hơn","Ít hơn") với N3 = 90.5% ⟶ Nhiều hơn
- =IF(N4>30%,"Nhiều hơn","Ít hơn") với N4 = 2.2% ⟶ Ít hơn

## 9. Máy IF trực quan 🔀  `may-if`

**Câu 18** (Vận dụng) — Chế độ IF lồng nhau — 3 mức: tỉ lệ N3 = 80% thì O3 hiện gì?
- A. Nhiều hơn ✅
- B. Nhiều quá
- C. Ít hơn
- D. Báo lỗi
- Giải thích: 80% > 80% sai → xét tiếp 80% > 50% đúng → “Nhiều hơn”.

**Câu 19** (Thông hiểu) — Chế độ IF lồng nhau — 3 mức: tỉ lệ N3 = 35% thì cả hai điều kiện đều sai, O3 hiện “Ít hơn”.
- Đáp án: **Đúng**
- Giải thích: 35% > 80% sai, 35% > 50% sai → trả về giá trị cuối cùng “Ít hơn”.

## 10. IF lồng nhau — nhận xét nhiều mức 🔁  `if-long-nhau`

**Câu 20** (Thông hiểu) — Trong =IF(N3>80%,"Nhiều quá",IF(N3>50%,"Nhiều hơn","Ít hơn")), hàm IF thứ hai là tham số nào của hàm IF thứ nhất?
- A. logical_test
- B. value_if_true
- C. value_if_false ✅
- D. Không thuộc tham số nào
- Giải thích: Khi N3>80% sai, hàm IF thứ nhất trả về value_if_false — chính là hàm IF thứ hai, kiểm tra tiếp N3>50%.

**Câu 21** (Vận dụng cao) — Bạn Lan viết =IF(N3>50%,"Nhiều hơn",IF(N3>80%,"Nhiều quá","Ít hơn")). Với N3 = 90.5%, kết quả là gì?
- A. Nhiều quá
- B. Ít hơn
- C. Nhiều hơn — sai ý muốn, vì điều kiện >50% đúng trước nên không bao giờ xét đến >80% ✅
- D. Báo lỗi
- Giải thích: Điều kiện được kiểm tra từ ngoài vào trong. 90.5% > 50% đúng ngay → “Nhiều hơn”. Phải kiểm tra mốc lớn (80%) trước.

**Câu 22** (Vận dụng) — Tỉ lệ N3 = 65%. Công thức =IF(N3>80%,"Nhiều quá",IF(N3>50%,"Nhiều hơn","Ít hơn")) cho kết quả:
- A. Nhiều quá
- B. Nhiều hơn ✅
- C. Ít hơn
- D. 65%
- Giải thích: 65% > 80% sai → IF thứ hai: 65% > 50% đúng → “Nhiều hơn”.

## 11. Ghép sơ đồ IF lồng nhau 🧩  `so-do-if`

**Phân loại** — Xếp các điều kiện và kết quả vào đúng ô của sơ đồ khối biểu diễn =IF(N3>80%,"Nhiều quá",IF(N3>50%,"Nhiều hơn","Ít hơn")). Xếp hết rồi bấm Nộp bài.

- **◇ Điều kiện kiểm tra thứ nhất:** N3>80%
- **Trả về (điều kiện 1 đúng):** “Nhiều quá”
- **◇ Điều kiện kiểm tra thứ hai:** N3>50%
- **Trả về (điều kiện 2 đúng):** “Nhiều hơn”
- **Trả về (cả hai điều kiện sai):** “Ít hơn”

## 12. Trò chơi: Đoán kết quả hàm IF 🐝  `doan-ket-qua`

**Câu 23** (Nhận biết) — =IF(N3>50%,"Nhiều hơn","Ít hơn") với N3 = 90.5%
- A. Ít hơn
- B. Nhiều hơn ✅
- C. 90.5%
- D. Nhiều quá
- Giải thích: 90.5% > 50% đúng → “Nhiều hơn”.

**Câu 24** (Thông hiểu) — =IF(N5>20%,"Nhiều hơn","Ít hơn") với N5 = 20%
- A. Nhiều hơn
- B. Báo lỗi
- C. Ít hơn ✅
- D. 20%
- Giải thích: 20% > 20% sai → “Ít hơn”.

**Câu 25** (Thông hiểu) — =IF(B2>=5,"Đạt","Chưa đạt") với B2 = 5
- A. Đạt ✅
- B. Chưa đạt
- C. 5
- D. Báo lỗi
- Giải thích: >= là lớn hơn hoặc bằng: 5 >= 5 đúng → “Đạt”.

**Câu 26** (Vận dụng) — =IF(N3>80%,"Nhiều quá",IF(N3>50%,"Nhiều hơn","Ít hơn")) với N3 = 85%
- A. Nhiều hơn
- B. Ít hơn
- C. 85%
- D. Nhiều quá ✅
- Giải thích: 85% > 80% đúng ngay → “Nhiều quá”.

**Câu 27** (Vận dụng) — =IF(N3>80%,"Nhiều quá",IF(N3>50%,"Nhiều hơn","Ít hơn")) với N3 = 50%
- A. Nhiều hơn
- B. Ít hơn ✅
- C. Nhiều quá
- D. Báo lỗi
- Giải thích: 50% > 80% sai; 50% > 50% sai → “Ít hơn”.

**Câu 28** (Vận dụng) — =IF(B2>10000,5%,0%) với B2 = 10,000
- A. 5%
- B. 10000
- C. 0% ✅
- D. Báo lỗi
- Giải thích: 10,000 > 10000 sai (không lớn hơn) → 0%.

**Câu 29** (Vận dụng cao) — =IF(B2>20000,6%,IF(B2>15000,4%,IF(B2>10000,2%,0%))) với B2 = 18,000
- A. 6%
- B. 4% ✅
- C. 2%
- D. 0%
- Giải thích: 18,000 > 20000 sai → 18,000 > 15000 đúng → 4%.

**Câu 30** (Nhận biết) — =IF(N4>30%,"Nhiều hơn","Ít hơn") với N4 = 2.2%
- A. Ít hơn ✅
- B. Nhiều hơn
- C. Nhiều quá
- D. 2.2%
- Giải thích: 2.2% > 30% sai → “Ít hơn”.

## 13. Nhiệm vụ thực hành — Sắp xếp các bước 🔢  `cac-buoc`

**Sắp xếp** — Nhiệm vụ (SGK tr.50): bổ sung cột Mục chi cho bảng tổng hợp khoản chi và tạo bảng tổng hợp các mục chi. Sắp xếp các bước theo hướng dẫn a), b), c) rồi bấm Nộp bài.

1. Mở bảng tính TaiChinhGiaDinh.xlsx, chọn trang tính Chi tiêu
2. Tại cột I, bổ sung tiêu đề Mục chi và nhập dữ liệu (Hình 12a.2)
3. Trong vùng K1:O5, tạo bảng dữ liệu tổng hợp mục chi (Hình 12a.5)
4. Tại ô M3 nhập =SUMIF($I$2:$I$10,K3,$H$2:$H$10), sao chép sang M4, M5
5. Tại ô N3 nhập =M3/$H$11*100%, sao chép sang N4, N5
6. Tại các ô O3, O4, O5 nhập công thức IF để điền nhận xét
7. Lưu bảng tính

## 14. Thực hành a), b) Tạo bảng, tính Tổng chi và Tỉ lệ 🧾  `thuc-hanh-ab`

**Câu 31** (Vận dụng) — Sau khi nhập công thức ở M3 và sao chép, các ô M3, M4, M5 lần lượt bằng:
- A. 920 · 8,000 · 600
- B. 12,340 · 300 · 1,000 ✅
- C. 13,640 · 0 · 0
- D. 5 · 3 · 1
- Giải thích: A = 920 + 8,000 + 600 + 2,200 + 620 = 12,340; B = 0 + 300 + 0 = 300; C = 1,000.

**Câu 32** (Vận dụng cao) — Bạn Nam nhập ô N3 là =M3/H11*100% rồi sao chép xuống N4. Ô N4 hiển thị gì?
- A. 2.2%
- B. 90.5%
- C. #DIV/0! vì N4 thành =M4/H12*100%, ô H12 trống ✅
- D. 0%
- Giải thích: Không có $, H11 bị dời thành H12 (ô trống = 0) → chia cho 0 → #DIV/0!. Cần viết $H$11.

**Câu 33** (Vận dụng) — Tổng ba tỉ lệ N3 + N4 + N5 bằng bao nhiêu?
- A. 100%, vì mỗi khoản chi thuộc đúng một mục chi ✅
- B. 50%
- C. 90.5%
- D. Không tính được
- Giải thích: 12,340 + 300 + 1,000 = 13,640 = H11 → 90.5% + 2.2% + 7.3% = 100%. Đây là cách kiểm tra kết quả.

**Câu 34** (Thông hiểu) — Ô N3 hiển thị 90.5% (định dạng phần trăm). Khi so sánh trong hàm IF, điều kiện N3>50% là:
- A. Sai, vì 90.5 < 50%
- B. Báo lỗi vì N3 có kí hiệu %
- C. Không so sánh được
- D. Đúng, vì giá trị trong ô (khoảng 0.905) lớn hơn 50% (= 0.5) ✅
- Giải thích: 50% = 0.5; giá trị thật trong ô N3 = 12,340 / 13,640 ≈ 0.905 → N3>50% đúng.

## 15. Câu hỏi SGK & Thực hành c) Điền nhận xét cột Trạng thái 💬  `thuc-hanh-c`

**Câu 35** (Vận dụng) — Tại ô O4 nhập công thức nhận xét mục Mong muốn cá nhân (quy tắc 30%).
- Đáp án: nhập vào O4: **=IF(N4>30%,"Nhiều hơn","Ít hơn")**
- Giải thích: =IF(N4>30%,"Nhiều hơn","Ít hơn") → 2.2% > 30% sai → “Ít hơn”.

**Câu 36** (Vận dụng) — Tại ô O5 nhập công thức nhận xét mục Tiết kiệm (quy tắc 20%).
- Đáp án: nhập vào O5: **=IF(N5>20%,"Nhiều hơn","Ít hơn")**
- Giải thích: =IF(N5>20%,"Nhiều hơn","Ít hơn") → 7.3% > 20% sai → “Ít hơn”.

**Câu 37** (Vận dụng cao) — Vì sao KHÔNG thể sao chép công thức ở O3 xuống O4, O5 như cột M, N?
- A. Vì hàm IF không sao chép được
- B. Vì mỗi mục chi có mốc so sánh khác nhau (50%, 30%, 20%) ✅
- C. Vì cột O chứa chữ
- D. Vì O4, O5 đã có dữ liệu
- Giải thích: Sao chép O3 xuống O4 được =IF(N4>50%,…) — sai mốc. Mục B so với 30%, mục C so với 20%.

**Câu 38** (Vận dụng) — Theo bảng tổng hợp (Hình 12a.3), nhận xét nào đúng về chi tiêu của gia đình?
- A. Chi tiêu đã cân đối theo quy tắc 50-30-20
- B. Chi quá nhiều cho mong muốn cá nhân
- C. Tiết kiệm nhiều hơn quy tắc
- D. Chi cho nhu cầu thiết yếu nhiều hơn quy tắc, tiết kiệm ít hơn quy tắc ✅
- Giải thích: Nhu cầu thiết yếu 90.5% (Nhiều hơn 50%), Tiết kiệm 7.3% (Ít hơn 20%) → chưa cân đối.

## 16. Luyện tập: Tỉ lệ và tiền thưởng của các đại lí 💰  `luyen-tap`

**Câu 39** (Vận dụng) — a) Tại ô C2 nhập công thức tính tỉ lệ thưởng: doanh thu trên 10 triệu (10000 nghìn đồng) thì 5%, còn không thì 0%. Sao chép sang C3:C5.
- Đáp án: nhập vào C2:C5: **=IF(B2>10000,5%,0%)**
- Giải thích: =IF(B2>10000,5%,0%) → A 0% · B 0% (10,000 không lớn hơn 10000) · C 5% · D 5%. Viết 5%, 0% là SỐ, không đặt trong ngoặc kép để còn nhân ở cột D.

**Câu 40** (Vận dụng) — b) Tại ô D2 nhập công thức tính số tiền thưởng (Số tiền = Doanh thu × Tỉ lệ). Sao chép sang D3:D5.
- Đáp án: nhập vào D2:D5: **=B2*C2**
- Giải thích: =B2*C2 → A 0 · B 0 · C 600 · D 900 (nghìn đồng).

**Câu 41** (Vận dụng cao) — c) Sửa công thức ở ô C2 theo quy tắc mới: trên 20 triệu 6%, trên 15 triệu 4%, trên 10 triệu 2%, còn không 0%. Sao chép sang C3:C5.
- Đáp án: nhập vào C2:C5: **=IF(B2>20000,6%,IF(B2>15000,4%,IF(B2>10000,2%,0%)))**
- Giải thích: =IF(B2>20000,6%,IF(B2>15000,4%,IF(B2>10000,2%,0%))) → A 0% · B 0% · C 2% · D 4%; số tiền: 0 · 0 · 240 · 720.

**Câu 42** (Vận dụng) — Theo quy tắc mới (câu c), đại lí D (doanh thu 18,000) nhận được bao nhiêu tiền thưởng?
- A. 900 nghìn đồng
- B. 1,080 nghìn đồng
- C. 360 nghìn đồng
- D. 720 nghìn đồng ✅
- Giải thích: 18,000 > 15000 → 4%; 18,000 × 4% = 720 nghìn đồng (theo quy tắc cũ là 900).

**Câu 43** (Thông hiểu) — Một bạn viết =IF(B2>10000,"5%","0%"). Vì sao cách viết này không nên dùng?
- A. Vì hàm IF không trả về được phần trăm
- B. Vì "5%" trong ngoặc kép là dữ liệu chữ, không phải số — dễ sai khi tính toán tiếp ở cột D ✅
- C. Vì thiếu dấu $
- D. Vì phải viết 5 thay cho 5%
- Giải thích: Giá trị trả về là số thì viết trực tiếp 5%, 0%; chỉ đặt trong ngoặc kép khi trả về chữ như "Nhiều hơn".

## 17. Vận dụng: Nhận xét chi tiết hơn bằng IF lồng nhau 🎯  `van-dung`

**Câu 44** (Vận dụng) — Vận dụng 1: tại ô O3 nhập công thức: tỉ lệ lớn hơn 80% thì “Nhiều quá”, lớn hơn 50% thì “Nhiều hơn”, còn không thì “Ít hơn”.
- Đáp án: nhập vào O3: **=IF(N3>80%,"Nhiều quá",IF(N3>50%,"Nhiều hơn","Ít hơn"))**
- Giải thích: =IF(N3>80%,"Nhiều quá",IF(N3>50%,"Nhiều hơn","Ít hơn")) → 90.5% → “Nhiều quá” (như Hình 12a.4).

**Câu 45** (Vận dụng) — Vận dụng 2 (Mở rộng — mốc do app gợi ý): tại ô O4, Mong muốn cá nhân lớn hơn 40% thì “Nhiều quá”, lớn hơn 30% thì “Nhiều hơn”, còn không thì “Ít hơn”.
- Đáp án: nhập vào O4: **=IF(N4>40%,"Nhiều quá",IF(N4>30%,"Nhiều hơn","Ít hơn"))**
- Giải thích: =IF(N4>40%,"Nhiều quá",IF(N4>30%,"Nhiều hơn","Ít hơn")) → 2.2% → “Ít hơn”.

**Câu 46** (Vận dụng cao) — Vận dụng 2 (Mở rộng — mốc do app gợi ý): tại ô O5, Tiết kiệm lớn hơn 20% thì “Nhiều hơn”, lớn hơn 10% thì “Ít hơn”, còn không thì “Ít quá”.
- Đáp án: nhập vào O5: **=IF(N5>20%,"Nhiều hơn",IF(N5>10%,"Ít hơn","Ít quá"))**
- Giải thích: =IF(N5>20%,"Nhiều hơn",IF(N5>10%,"Ít hơn","Ít quá")) → 7.3% → “Ít quá”: gia đình cần tăng tiết kiệm.

## 18. Vận dụng — Cân đối chi tiêu & IF trong cuộc sống 📝  `van-dung-nha`

**Tự luận 1** — Dựa trên quy tắc 50-30-20 và bảng Tổng hợp mục chi (A 90.5%, B 2.2%, C 7.3%), em hãy đề xuất cách điều chỉnh để các mục chi được cân đối và tài chính gia đình được kiểm soát hiệu quả.
- Hướng trả lời: Mục Nhu cầu thiết yếu đang chiếm quá nhiều (90.5%) → rà soát khoản Ăn (8,000), tiền điện nước… để tiết giảm hợp lí; tăng Tiết kiệm lên gần 20%; dành một phần hợp lí cho mong muốn cá nhân. Sau khi điều chỉnh, cột Trạng thái (hàm IF) tự cập nhật để theo dõi.

**Tự luận 2** — Nêu một tình huống thực tế khác có thể dùng hàm IF (hoặc IF lồng nhau). Viết công thức minh hoạ.
- Hướng trả lời: Ví dụ: xếp kết quả học tập =IF(B2>=5,"Đạt","Chưa đạt"); xếp mức =IF(B2>=8,"Tốt",IF(B2>=6.5,"Khá",IF(B2>=5,"Đạt","Chưa đạt"))); kiểm tra khoản chi vượt hạn mức =IF(D2>E2,"Vượt mức","Trong mức").

## 19. Tổng kết  `tong-ket`

**Câu 47** (Vận dụng) — C2: xếp kết quả — điểm TB từ 5 trở lên thì “Đạt”, còn không thì “Chưa đạt”. Sao chép sang C3:C5.
- Đáp án: nhập vào C2:C5: **=IF(B2>=5,"Đạt","Chưa đạt")**
- Giải thích: =IF(B2>=5,"Đạt","Chưa đạt") → Đạt · Chưa đạt · Đạt (5 >= 5) · Đạt. “Từ 5 trở lên” là >=5.

**Câu 48** (Vận dụng cao) — Công thức nào nhận xét “Nhiều quá” khi tỉ lệ lớn hơn 80%, “Nhiều hơn” khi lớn hơn 50%, còn lại “Ít hơn”?
- A. =IF(N3>50%,"Nhiều hơn",IF(N3>80%,"Nhiều quá","Ít hơn"))
- B. =IF(N3>80%,"Nhiều quá",IF(N3>50%,"Nhiều hơn","Ít hơn")) ✅
- C. =IF(N3>80%,"Nhiều quá","Nhiều hơn","Ít hơn")
- D. =IF(N3>80%,IF(N3>50%,"Nhiều hơn"),"Ít hơn")
- Giải thích: Kiểm tra mốc 80% trước, IF thứ hai là value_if_false của IF thứ nhất (Hình 12a.4).

