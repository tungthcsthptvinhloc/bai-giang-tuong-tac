# NGÂN HÀNG CÂU HỎI — TIN 7 BÀI 8: CÔNG CỤ HỖ TRỢ TÍNH TOÁN

> Sinh từ `data/lesson.js` (nguồn chính). Sửa câu hỏi trong `data/lesson.js`.

## 1. Mở đầu — Ai nhanh hơn: em hay máy tính? ⚡  `mo-dau`

**Câu 1** (Vận dụng) — Thử thách tính nhẩm: Tổng số cây hoa của tất cả các lớp trong Hình 8.3 là bao nhiêu? (Máy tính chỉ cần gõ =SUM(C4:I8))
- A. 267
- B. 277
- C. 287 ✅
- D. 297
- Giải thích: Tổng là 287 cây. Với hàm =SUM(C4:I8), phần mềm tính ngay lập tức và chính xác — kể cả khi dữ liệu thay đổi!

**Câu 2** (Nhận biết) — Trong phần mềm bảng tính, hàm là gì?
- A. Một ô tính có tô màu
- B. Công thức (hoặc kết hợp nhiều công thức) được định nghĩa từ trước ✅
- C. Tên của một trang tính
- D. Một kiểu dữ liệu văn bản
- Giải thích: Hàm là công thức (hoặc kết hợp nhiều công thức) được định nghĩa từ trước, dùng để tính toán với các giá trị dữ liệu cụ thể.

## 2. 1. Hàm trong bảng tính (Phiếu học tập 1) 🔎  `ham-trong-bang-tinh`

**Câu 3** (Nhận biết) — Hình 8.1: bấm chọn (kéo chuột) đúng VÙNG DỮ LIỆU là tham số của hàm ở ô E6.
- Chọn đúng vùng: **B5:D7**
- Giải thích: Ô E6 chứa =SUM(B5:D7): tham số là vùng B5:D7 — số cây hoa của Bình, Hòa, Hương. Tổng = 24.

**Câu 4** (Nhận biết) — Trong công thức =SUM(B5:D7), tên hàm và ý nghĩa của hàm là:
- A. B5:D7 — tính trung bình
- B. SUM — tính tổng ✅
- C. SUM — tìm giá trị lớn nhất
- D. E6 — tính tổng
- Giải thích: Tên hàm là SUM, ý nghĩa: tính tổng các giá trị số trong vùng B5:D7.

**Câu 5** (Nhận biết) — Hình 8.2: bấm chọn vùng dữ liệu là tham số của hàm =AVERAGE(B5:C7).
- Chọn đúng vùng: **B5:C7**
- Giải thích: AVERAGE(B5:C7) tính trung bình cộng 6 giá trị trong vùng B5:C7: (7+5+3+5+4+6) : 6 = 5.

**Câu 6** (Thông hiểu) — Hàm =AVERAGE(B5:C7) có bao nhiêu tham số và ý nghĩa là gì?
- A. 2 tham số B5 và C7 — tính tổng
- B. 6 tham số — đếm số ô
- C. 1 tham số là vùng B5:C7 — tính trung bình cộng ✅
- D. Không có tham số — tính trung bình
- Giải thích: Hàm có 1 tham số là vùng dữ liệu B5:C7; AVERAGE tính trung bình cộng các giá trị số trong vùng.

## 3. Ghép các thành phần của hàm 🧩  `thanh-phan-ham`

**Ghép đôi** — Ghép mỗi phần của công thức =SUM(D4:H4,15,K10) với vai trò của nó. Làm hết rồi bấm Nộp bài.

- = ⟶ Dấu bắt đầu mọi công thức, hàm
- SUM ⟶ Tên hàm (tính tổng)
- D4:H4 ⟶ Tham số là địa chỉ vùng dữ liệu
- K10 ⟶ Tham số là địa chỉ ô
- 15 ⟶ Tham số là một số
- , ⟶ Dấu ngăn cách các tham số

## 4. Nhập hàm (Phiếu học tập 2) ⌨️  `nhap-ham`

**Câu 7** (Vận dụng) — Nhập hàm vào ô C9 để tính tổng số cây hoa lớp 7A sẽ trồng.
- Gõ công thức vào C9: **=SUM(C4:C8)** (công thức tương đương cũng được chấm đúng)
- Giải thích: C9 = SUM(C4:C8) = 10 + 16 + 14 = 40 (ô trống được bỏ qua).

**Câu 8** (Vận dụng) — Sao chép hàm ở ô C9 sang các ô D9 đến I9 để tính tổng cho các lớp 7B … 7H (nhập C9 rồi 📋 Sao chép, chọn D9:I9, 📥 Dán).
- Gõ công thức vào C9:I9: **=SUM(C4:C8)** (công thức tương đương cũng được chấm đúng)
- Giải thích: Sau khi sao chép: D9 = SUM(D4:D8) = 47, E9 = SUM(E4:E8) = 40, …, I9 = SUM(I4:I8) = 48 — địa chỉ vùng tự dời theo cột.

**Câu 9** (Nhận biết) — Cách nhập hàm vào ô tính:
- A. Giống nhập văn bản, không cần dấu =
- B. Giống nhập công thức: bắt đầu bằng dấu =, rồi tên hàm và các tham số trong ngoặc ✅
- C. Chỉ nhập được bằng chuột, không gõ được
- D. Phải viết tên hàm bằng chữ in hoa
- Giải thích: Cách nhập hàm tương tự nhập công thức: =<tên hàm>(<các tham số>). Tên hàm viết hoa hay thường đều được.

**Câu 10** (Nhận biết) — Các tham số của hàm có thể là địa chỉ ô hoặc địa chỉ vùng dữ liệu.
- Đáp án: **Đúng**
- Giải thích: Đúng. Tham số có thể là số, địa chỉ ô, địa chỉ vùng; khi nhập có thể dùng chuột chọn ô hoặc vùng.

**Câu 11** (Thông hiểu) — Gõ =sum(c4:c8) (chữ thường) thì phần mềm bảng tính vẫn hiểu và tính đúng.
- Đáp án: **Đúng**
- Giải thích: Đúng. Tên hàm có thể dùng chữ in hoa hoặc in thường.

## 5. Sắp xếp các bước nhập hàm 🪜  `cac-buoc-nhap-ham`

**Sắp xếp** — Sắp xếp các bước nhập hàm =SUM(C4:C8) vào ô C9 rồi bấm Nộp bài.

1. Nháy chuột vào ô C9
2. Gõ =SUM(
3. Dùng chuột đánh dấu vùng C4:C8
4. Gõ dấu đóng ngoặc )
5. Nhấn Enter — kết quả hiện ở ô C9

## 6. Thám tử bắt lỗi hàm 🕵️  `bat-loi-ham`

**Ghép đôi** — Mỗi công thức sau muốn tính tổng số cây hoa lớp 7A (vùng C4:C8) nhưng bị lỗi. Ghép công thức với lỗi của nó. Có thể gõ thử vào bảng tính bên dưới!

- SUM(C4:C8) ⟶ Thiếu dấu = → máy coi là văn bản
- =SUMM(C4:C8) ⟶ Sai tên hàm → báo lỗi #NAME?
- =SUM(C4:C8 ⟶ Thiếu dấu ngoặc đóng
- =SUM(D4:D8) ⟶ Chọn sai vùng dữ liệu (cột của lớp 7B)

## 7. 2. Một số hàm tính toán đơn giản 🧮  `ham-don-gian`

**Câu 12** (Vận dụng) — K4: Trung bình mỗi lớp sẽ trồng bao nhiêu cây? Nhập hàm vào ô K4.
- Gõ công thức vào K4: **=AVERAGE(C4:I8)** (công thức tương đương cũng được chấm đúng)
- Giải thích: =AVERAGE(C4:I8) = 287 : 21 ≈ 13.6667 (hàm bỏ qua các ô trống).

**Câu 13** (Vận dụng) — K5: Số cây hoa Dừa cạn lớn nhất một lớp sẽ trồng là bao nhiêu? Nhập hàm vào ô K5.
- Gõ công thức vào K5: **=MAX(C6:I6)** (công thức tương đương cũng được chấm đúng)
- Giải thích: Hoa Dừa cạn ở hàng 6 → =MAX(C6:I6) = 16.

**Câu 14** (Vận dụng) — K6: Số cây hoa Mười giờ ít nhất một lớp sẽ trồng là bao nhiêu? Nhập hàm vào ô K6.
- Gõ công thức vào K6: **=MIN(C4:I4)** (công thức tương đương cũng được chấm đúng)
- Giải thích: Hoa Mười giờ ở hàng 4 → =MIN(C4:I4) = 10 (ô trống không được tính là 0).

**Câu 15** (Vận dụng) — K7: Bao nhiêu lớp sẽ trồng hoa Hồng? Nhập hàm vào ô K7.
- Gõ công thức vào K7: **=COUNT(C8:I8)** (công thức tương đương cũng được chấm đúng)
- Giải thích: Đếm số ô có số ở hàng Hoa Hồng → =COUNT(C8:I8) = 4 lớp.

**Câu 16** (Vận dụng cao) — K8: Lớp 7B sẽ trồng bao nhiêu loại hoa? Nhập hàm vào ô K8.
- Gõ công thức vào K8: **=COUNT(D4:D8)** (công thức tương đương cũng được chấm đúng)
- Giải thích: Lớp 7B là cột D → =COUNT(D4:D8) = 3 loại hoa.

## 8. Trò chơi: Chọn đúng hàm 🎯  `chon-ham`

**Ghép đôi** — Ghép mỗi yêu cầu của dự án Trường học xanh với hàm phù hợp. Làm hết rồi bấm Nộp bài.

- Tổng số cây cả khối 7 sẽ trồng ⟶ SUM
- Số cây trung bình mỗi lớp trồng ⟶ AVERAGE
- Lớp trồng nhiều cây nhất được bao nhiêu cây ⟶ MAX
- Loại cây được trồng ít nhất là bao nhiêu cây ⟶ MIN
- Có bao nhiêu lớp trồng cây Bưởi ⟶ COUNT

## 9. Hàm cho kết quả như thế nào? 🤔  `ket-qua-ham`

**Câu 17** (Thông hiểu) — a) SUM(1,3,“Hà Nội”,“Zero”,5) cho kết quả (theo SGK):
- A. 9 ✅
- B. 5
- C. Hà Nội
- D. 0
- Giải thích: Hàm bỏ qua dữ liệu văn bản “Hà Nội”, “Zero”: 1 + 3 + 5 = 9. (Mở rộng: Excel thật báo #VALUE! khi gõ chữ trực tiếp làm tham số.)

**Câu 18** (Thông hiểu) — b) MIN(3,5,“One”,1) cho kết quả (theo SGK):
- A. 3
- B. One
- C. 1 ✅
- D. 5
- Giải thích: Bỏ qua “One”, giá trị nhỏ nhất trong 3, 5, 1 là 1. (Mở rộng: Excel thật báo #VALUE! khi gõ chữ trực tiếp làm tham số.)

**Câu 19** (Thông hiểu) — c) COUNT(1,3,5,7) cho kết quả:
- A. 16
- B. 7
- C. 1
- D. 4 ✅
- Giải thích: COUNT đếm số các giá trị là số: 1, 3, 5, 7 → 4.

**Câu 20** (Vận dụng cao) — Vùng A1:A5 có các ô: 8, (ô trống), “bảy”, 6, 10. Hàm =AVERAGE(A1:A5) cho kết quả:
- A. 4.8
- B. 6
- C. 8 ✅
- D. Báo lỗi
- Giải thích: AVERAGE bỏ qua ô trống và ô chữ “bảy”: (8 + 6 + 10) : 3 = 8.

## 10. 3. Thực hành: Tính toán trên dữ liệu trồng cây thực tế 🌳  `thuc-hanh`

**Câu 21** (Vận dụng) — c) Nhập =SUM(D4:D8) vào ô D9 để tính số cây hoa của lớp 7A, rồi sao chép sang E9:J9.
- Gõ công thức vào D9:J9: **=SUM(D4:D8)** (công thức tương đương cũng được chấm đúng)
- Giải thích: D9 = 40, E9 = 47, F9 = 40, G9 = 31, H9 = 45, I9 = 36, J9 = 48.

**Câu 22** (Vận dụng) — c) Tính tổng số cây ăn quả của mỗi lớp tại hàng 17 (D17:J17).
- Gõ công thức vào D17:J17: **=SUM(D11:D16)** (công thức tương đương cũng được chấm đúng)
- Giải thích: D17 = SUM(D11:D16) = 21; sao chép sang E17…J17: 32, 35, 29, 29, 26, 17.

**Câu 23** (Vận dụng) — c) Tính tổng số cây bóng mát của mỗi lớp tại hàng 24 (D24:J24).
- Gõ công thức vào D24:J24: **=SUM(D19:D23)** (công thức tương đương cũng được chấm đúng)
- Giải thích: D24 = SUM(D19:D23) = 22; …; J24 = 18.

**Câu 24** (Vận dụng) — d) Tại D25 nhập =D9+D17+D24 (tổng số cây của lớp 7A), rồi sao chép sang E25:J25.
- Gõ công thức vào D25:J25: **=D9+D17+D24** (công thức tương đương cũng được chấm đúng)
- Giải thích: D25 = 40 + 21 + 22 = 83; các lớp khác: 100, 104, 84, 92, 77, 83. (Cũng có thể dùng =SUM(D9,D17,D24).)

**Câu 25** (Vận dụng) — d) Tại K4 nhập =SUM(D4:J4) (tổng số cây Hoa Mười giờ), rồi sao chép xuống K5:K9.
- Gõ công thức vào K4:K9: **=SUM(D4:J4)** (công thức tương đương cũng được chấm đúng)
- Giải thích: K4 = 56, K5 = 35, K6 = 63, K7 = 75, K8 = 58, K9 = 287.

**Câu 26** (Vận dụng cao) — d) Tại L4 nhập =AVERAGE(D4:J4) (số cây Hoa Mười giờ trung bình mỗi lớp), rồi sao chép xuống L5:L9.
- Gõ công thức vào L4:L9: **=AVERAGE(D4:J4)** (công thức tương đương cũng được chấm đúng)
- Giải thích: L4 = 14; L5 ≈ 11.67; L6 = 12.6; L7 = 15; L8 = 14.5; L9 = 41. AVERAGE bỏ qua ô trống nên chia cho số lớp có trồng.

## 11. Luyện tập 🏋️  `luyen-tap`

**Câu 27** (Vận dụng) — Luyện tập 1: Tại ô K9 (đang là =SUM(D9:J9)) có thể dùng công thức nào khác cho cùng kết quả? (Chọn tất cả đáp án đúng)
- A. =SUM(K4:K8) ✅
- B. =K4+K5+K6+K7+K8 ✅
- C. =SUM(K4:K9)
- D. =SUM(D4:J8) ✅
- Giải thích: K9 là tổng tất cả cây hoa: =SUM(K4:K8), =K4+…+K8 hay =SUM(D4:J8) đều cho 287. =SUM(K4:K9) chứa chính ô K9 → lỗi tham chiếu vòng. Có nhiều công thức cho cùng một kết quả!

**Câu 28** (Thông hiểu) — Luyện tập 2: Các công thức =SUM(C3:K3); =C3+SUM(D3:J3)+K3; =SUM(C3:G3)+SUM(H3:K3) có cho kết quả giống nhau không?
- A. Khác nhau cả ba
- B. Chỉ công thức a) và b) giống nhau
- C. Giống nhau — đều là tổng các ô từ C3 đến K3 ✅
- D. Chỉ công thức c) đúng
- Giải thích: Cả ba đều cộng đủ các ô C3, D3, …, K3 (chỉ cách chia nhóm khác nhau) → kết quả giống nhau.

**Câu 29** (Vận dụng cao) — Luyện tập 3a: Tại D26 nhập hàm tìm số cây lớn nhất sẽ được trồng của lớp 7A (chỉ xét các hàng cây, không lấy hàng tổng 9, 17, 24), rồi sao chép sang E26:J26.
- Gõ công thức vào D26:J26: **=MAX(D4:D8,D11:D16,D19:D23)** (công thức tương đương cũng được chấm đúng)
- Giải thích: D26 = MAX(D4:D8;D11:D16;D19:D23) = 16. Nếu viết =MAX(D4:D23) sẽ lấy nhầm hàng tổng (40) → sai!

**Câu 30** (Vận dụng cao) — Luyện tập 3b: Tại D27 nhập hàm tính số cây trung bình sẽ được trồng của lớp 7A (các hàng cây), rồi sao chép sang E27:J27.
- Gõ công thức vào D27:J27: **=AVERAGE(D4:D8,D11:D16,D19:D23)** (công thức tương đương cũng được chấm đúng)
- Giải thích: D27 = AVERAGE(D4:D8;D11:D16;D19:D23) ≈ 9.22. Tránh =AVERAGE(D4:D23) vì sẽ tính cả các hàng tổng.

## 12. Trò chơi: Ong chăm chỉ về vườn hoa 🐝  `tro-choi`

**Câu 31** (Nhận biết) — Hàm nào dùng để tính trung bình cộng?
- A. SUM
- B. AVERAGE ✅
- C. COUNT
- D. MAX
- Giải thích: AVERAGE tính trung bình cộng các giá trị số.

**Câu 32** (Nhận biết) — Công thức nào viết ĐÚNG cú pháp hàm?
- A. SUM=(A1:A5)
- B. =SUM A1:A5
- C. =SUM(A1:A5) ✅
- D. =(A1:A5)SUM
- Giải thích: Cú pháp: =<tên hàm>(<các tham số>) → =SUM(A1:A5).

**Câu 33** (Thông hiểu) — Các ô B1:B4 chứa 5, 8, (trống), 2. Hàm =COUNT(B1:B4) cho kết quả:
- A. 3 ✅
- B. 4
- C. 15
- D. 2
- Giải thích: COUNT chỉ đếm các ô có số: 5, 8, 2 → 3.

**Câu 34** (Vận dụng) — Muốn tìm lớp trồng NHIỀU cây nhất trong hàng 25 (D25:J25), em nhập:
- A. =MIN(D25:J25)
- B. =COUNT(D25:J25)
- C. =SUM(D25:J25)
- D. =MAX(D25:J25) ✅
- Giải thích: Lớn nhất → MAX: =MAX(D25:J25) = 104 (lớp 7C).

**Câu 35** (Thông hiểu) — Gõ =SUMM(C4:C8) thì bảng tính báo lỗi vì:
- A. Thiếu dấu =
- B. Sai tên hàm ✅
- C. Thiếu tham số
- D. Chữ in hoa
- Giải thích: Không có hàm tên SUMM — phần mềm báo lỗi #NAME? (sai tên hàm).

**Câu 36** (Vận dụng) — =AVERAGE(10,12,1) cho kết quả là:
- A. 23
- B. 7.6667 ✅
- C. 12
- D. 3
- Giải thích: (10 + 12 + 1) : 3 = 23 : 3 ≈ 7.6667.

**Câu 37** (Nhận biết) — Các tham số của hàm được viết cách nhau bởi dấu “,” hoặc dấu “;”.
- Đáp án: **Đúng**
- Giải thích: Đúng — ví dụ SUM(D4:H4,15,K10) hoặc SUM(D4:H4;15;K10).

**Câu 38** (Vận dụng cao) — Ô D9 chứa =SUM(D4:D8) = 40. Em sửa ô D4 từ 10 thành 20. Ô D9 sẽ:
- A. Vẫn là 40
- B. Báo lỗi
- C. Tự động thành 50 ✅
- D. Thành 20
- Giải thích: Hàm dùng địa chỉ ô nên tự động tính lại: 40 − 10 + 20 = 50.

## 13. Vận dụng: Chi tiêu gia đình 💰  `van-dung`

**Câu 39** (Vận dụng) — a) Tổng số tiền chi tiêu một tháng là bao nhiêu? Nhập hàm vào ô C12.
- Gõ công thức vào C12: **=SUM(C4:C11)** (công thức tương đương cũng được chấm đúng)
- Giải thích: =SUM(C4:C11) = 7 140 000 đồng.

**Câu 40** (Vận dụng) — b) Khoản chi nhiều nhất là bao nhiêu? Nhập hàm vào ô C13.
- Gõ công thức vào C13: **=MAX(C4:C11)** (công thức tương đương cũng được chấm đúng)
- Giải thích: =MAX(C4:C11) = 4 500 000 đồng (tiền ăn).

**Câu 41** (Vận dụng) — b) Khoản chi ít nhất là bao nhiêu? Nhập hàm vào ô C14.
- Gõ công thức vào C14: **=MIN(C4:C11)** (công thức tương đương cũng được chấm đúng)
- Giải thích: =MIN(C4:C11) = 120 000 đồng (tiền nước).

**Câu 42** (Vận dụng) — c) Có bao nhiêu khoản đã chi? Nhập hàm vào ô C15.
- Gõ công thức vào C15: **=COUNT(C4:C11)** (công thức tương đương cũng được chấm đúng)
- Giải thích: =COUNT(C4:C11) = 8 khoản.

**Câu 43** (Vận dụng cao) — d) Trung bình mỗi ngày chi bao nhiêu tiền (tháng có 30 ngày)? Nhập công thức vào ô C16.
- Gõ công thức vào C16: **=SUM(C4:C11)/30** (công thức tương đương cũng được chấm đúng)
- Giải thích: Tổng chi : 30 ngày = 7 140 000 : 30 = 238 000 đồng/ngày (có thể viết =C12/30). Lưu ý: AVERAGE(C4:C11) là trung bình mỗi KHOẢN chi, không phải mỗi ngày!

## 14. Vận dụng ở nhà 🏡  `van-dung-nha`

**Tự luận 1** — Em đã dùng những hàm nào (viết đúng cú pháp) để trả lời 4 câu hỏi: tổng chi tiêu, khoản nhiều nhất / ít nhất, số khoản đã chi, trung bình mỗi ngày?
- Hướng trả lời: Ví dụ, dữ liệu số tiền ở C4:C11: a) =SUM(C4:C11); b) =MAX(C4:C11) và =MIN(C4:C11); c) =COUNT(C4:C11); d) =SUM(C4:C11)/30 (hoặc chia cho số ngày của tháng).

**Tự luận 2** — Sau khi tính, em và bố mẹ rút ra điều gì để cân đối chi tiêu gia đình hợp lí hơn?
- Hướng trả lời: Gợi ý: nhận ra khoản chi lớn nhất để cân nhắc tiết kiệm; tiết kiệm điện, nước; theo dõi chi tiêu hằng tháng bằng bảng tính để so sánh và điều chỉnh. (Thông tin chi tiêu là riêng tư của gia đình — chỉ chia sẻ với người thân.)

## 15. Tổng kết  `tong-ket`

**Câu 44** (Vận dụng) — Hàng 25 (D25:J25) là tổng số cây của 7 lớp. Công thức nào tính số cây TRUNG BÌNH mỗi lớp trồng?
- A. =SUM(D25:J25)/25
- B. =AVERAGE(D25:J25) ✅
- C. =MAX(D25:J25)
- D. =COUNT(D25:J25)
- Giải thích: =AVERAGE(D25:J25) = 623 : 7 = 89 cây (đúng như ô L25 ở Hình 8.7).

**Câu 45** (Vận dụng cao) — Bạn Lan gõ =MAX(D4:D23) để tìm số cây lớn nhất lớp 7A trồng một loại cây, nhưng được 40 thay vì 16. Vì sao?
- A. Vì hàm MAX bị hỏng
- B. Vì vùng D4:D23 chứa cả các hàng tổng (D9 = 40), cần chọn đúng các vùng dữ liệu cây ✅
- C. Vì phải viết chữ thường
- D. Vì thiếu dấu ngoặc
- Giải thích: Chọn sai vùng dữ liệu: D4:D23 gồm cả ô tổng D9, D17. Dùng =MAX(D4:D8;D11:D16;D19:D23).

