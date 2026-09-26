# NGÂN HÀNG CÂU HỎI — TIN 9 BÀI 10a: SỬ DỤNG HÀM COUNTIF

> Sinh từ `data/lesson.js` (nguồn chính). Sửa câu hỏi trong `data/lesson.js`.

## 1. Mở đầu — Đếm nhanh, đếm đúng! ⚡  `mo-dau`

**Câu 1** (Nhận biết) — Đếm thủ công: có bao nhiêu bạn lớp 9A đạt điểm TB từ 8 trở lên?
- Đáp án: **6 / sáu / 6 bạn**
- Giải thích: Các bạn đạt ≥ 8: An 8.5, Hà 9.1, Linh 8, Ngọc 8.8, Tâm 9.4, Việt 8.2 → 6 bạn (điểm 8 cũng tính vì “từ 8 trở lên”).

**Câu 2** (Thông hiểu) — Nếu bảng có 500 học sinh, cách nào nhanh và chính xác nhất để biết số bạn đạt điểm TB từ 8 trở lên?
- A. Đếm lần lượt từng dòng rồi ghi ra giấy
- B. Dùng máy tính cầm tay cộng dần
- C. Dùng hàm đếm theo điều kiện của bảng tính ✅
- D. Hỏi từng bạn trong khối
- Giải thích: Hàm đếm theo điều kiện (COUNTIF) giúp máy tính tự đếm các ô thoả mãn điều kiện, nhanh, chính xác và tự cập nhật khi dữ liệu thay đổi.

## 2. Hoạt động 1: Các khoản chi được tổng hợp thế nào? 🧾  `hd1-khoan-chi`

**Câu 3** (Nhận biết) — Kéo chọn vùng dữ liệu cần kiểm tra để đếm số lần chi của mỗi khoản.
- Đáp án: **B3:B10**
- Giải thích: Tên khoản chi của mỗi lần chi nằm ở cột Khoản chi, vùng B3:B10.

**Câu 4** (Nhận biết) — Đếm thủ công: khoản Ở đã được chi bao nhiêu lần?
- Đáp án: **2 / hai / 2 lần**
- Giải thích: Khoản Ở xuất hiện ở B3 (Tiền điện tháng 8) và B8 (Tiền nước tháng 8) → 2 lần.

**Câu 5** (Thông hiểu) — Có thể dùng hàm COUNT (đã học ở lớp 7) để đếm số lần chi khoản Ở không?
- A. Có, COUNT đếm mọi ô trong vùng
- B. Không, COUNT chỉ đếm các ô chứa số và không có điều kiện ✅
- C. Có, chỉ cần viết =COUNT(Ở)
- D. Không, vì bảng tính không đếm được chữ
- Giải thích: COUNT chỉ đếm các ô chứa dữ liệu số, không kiểm tra được điều kiện “ô chứa chữ Ở”. Cần hàm đếm theo điều kiện COUNTIF.

**Câu 6** (Thông hiểu) — Ý tưởng nào đúng cho công thức ở ô G2?
- A. Cộng các số tiền trong vùng D3:D10
- B. Đếm số ô trong vùng B3:B10 có nội dung giống ô F2, rồi sao chép xuống G10 ✅
- C. Đếm số ô trong vùng F2:F10
- D. Gõ trực tiếp số 2 vào ô G2
- Giải thích: Đếm các ô trong vùng Khoản chi (B3:B10) giống tên khoản ở F2; sao chép xuống thì mỗi hàng đếm cho khoản của hàng đó. Gõ trực tiếp số sẽ không tự cập nhật khi dữ liệu thay đổi.

## 3. Hàm COUNTIF — cú pháp & ví dụ (Bảng 10a.1) 🔢  `ham-countif`

**Câu 7** (Nhận biết) — Công thức chung của hàm COUNTIF là:
- A. =COUNTIF(criteria, range)
- B. =COUNTIF(range, criteria) ✅
- C. =COUNT(range, criteria)
- D. =COUNTIF(range; sum)
- Giải thích: =COUNTIF(range, criteria): tham số thứ nhất là vùng cần kiểm tra, tham số thứ hai là điều kiện.

**Câu 8** (Nhận biết) — Trong công thức =COUNTIF(A1:A4,">100"), phần ">100" là:
- A. range — phạm vi chứa các ô cần kiểm tra
- B. Kết quả của hàm
- C. criteria — điều kiện kiểm tra các ô trong range ✅
- D. Tên trang tính
- Giải thích: ">100" là criteria (điều kiện); A1:A4 là range (phạm vi kiểm tra).

**Câu 9** (Thông hiểu) — F2: Đếm số ô trong vùng A1:A4 chứa giá trị số lớn hơn 100.
- Đáp án: nhập vào F2: **=COUNTIF(A1:A4,">100")**
- Giải thích: =COUNTIF(A1:A4,">100") = 1 (chỉ ô A1 = 150). Điều kiện so sánh đặt trong dấu ngoặc kép.

**Câu 10** (Thông hiểu) — F3: Đếm số ô trong vùng A1:A4 chứa từ Yes.
- Đáp án: nhập vào F3: **=COUNTIF(A1:A4,"Yes")**
- Giải thích: =COUNTIF(A1:A4,"Yes") = 2 (ô A2 và A4).

**Câu 11** (Vận dụng) — Dự đoán: kết quả của =COUNTIF(A1:A4,"Y*") (ô F4) là bao nhiêu? Gõ thử vào ô trống của lưới để kiểm tra.
- A. 1
- B. 2
- C. 3 ✅
- D. 4
- Giải thích: "Y*" đếm các ô bắt đầu bằng chữ Y: Yes, Yellow, Yes → 3. Ô A1 = 150 không bắt đầu bằng Y.

**Câu 12** (Vận dụng) — F5: Đếm số ô trong vùng A1:A4 chứa giá trị giống như ô D2.
- Đáp án: nhập vào F5: **=COUNTIF(A1:A4,D2)**
- Giải thích: =COUNTIF(A1:A4,D2) = 1 (D2 = Yellow). Dùng địa chỉ ô D2 làm điều kiện: đổi nội dung D2 thì kết quả tự thay đổi (gõ thẳng "Yellow" thì không).

## 4. Ghép yêu cầu với công thức 🧩  `bang-10a1`

**Ghép đôi** — Ghép mỗi yêu cầu tính toán với công thức đúng. Làm hết rồi bấm Nộp bài.

- Đếm số ô trong vùng A1:A4 chứa giá trị số lớn hơn 100 ⟶ =COUNTIF(A1:A4,">100")
- Đếm số ô trong vùng A1:A4 chứa từ Yes ⟶ =COUNTIF(A1:A4,"Yes")
- Đếm số ô trong vùng A1:A4 chứa xâu kí tự bắt đầu bằng chữ cái Y ⟶ =COUNTIF(A1:A4,"Y*")
- Đếm số ô trong vùng A1:A4 chứa giá trị giống như ô D2 ⟶ =COUNTIF(A1:A4,D2)
- Đếm số ô trong vùng A1:A4 chứa giá trị số nhỏ hơn 50 ⟶ =COUNTIF(A1:A4,"<50")

## 5. Câu hỏi SGK: Sao chép công thức — có $ và không có $ 🔒  `cau-hoi-tr43`

**Câu 13** (Thông hiểu) — a) Sao chép =COUNTIF($B$3:$B$10,F2) từ G2 sang các ô G3, …, G10, công thức thay đổi thế nào?
- A. Không thay đổi gì
- B. Phần range giữ nguyên $B$3:$B$10, phần criteria đổi lần lượt thành F3, …, F10 ✅
- C. Phần range dời xuống, phần criteria giữ nguyên F2
- D. Cả range và criteria đều dời xuống
- Giải thích: Địa chỉ có $ (tuyệt đối) giữ nguyên; F2 là địa chỉ tương đối nên dời theo hàng: F3, F4, …, F10.

**Câu 14** (Vận dụng) — Thử 1: sao chép =COUNTIF(B3:B10,F2) (không có $) từ G2 xuống. Ô G5 (khoản Học tập) cho kết quả bao nhiêu?
- A. 0 ✅
- B. 1
- C. 2
- D. Báo lỗi #REF!
- Giải thích: G5 trở thành =COUNTIF(B6:B13,F5): vùng B6:B13 không còn ô B5 “Học tập” nên kết quả là 0 — sai (đúng phải là 1).

**Câu 15** (Vận dụng) — b) Nếu bỏ các dấu $ (=COUNTIF(B3:B10,F2)) rồi sao chép sang G3 … G10, kết quả có đúng không? Tại sao?
- A. Đúng, vì chỉ cần đúng ở ô G2
- B. Không đúng, vì phần range cũng bị dời theo nên phạm vi kiểm tra bị sai ✅
- C. Không đúng, vì hàm COUNTIF không sao chép được
- D. Đúng, vì bảng tính tự sửa lại vùng
- Giải thích: Không có $, range dời theo hàng (B4:B11, B5:B12, …) → bỏ sót các ô đầu, kiểm tra cả ô trống → kết quả sai.

## 6. Nhiệm vụ — Sắp xếp các bước thực hành 🔢  `cac-buoc`

**Sắp xếp** — Sắp xếp các bước tính số lần chi của mỗi khoản chi trong trang tính Chi tiêu (SGK tr.43). Xếp xong bấm Nộp bài.

1. Mở tệp bảng tính TaiChinhGiaDinh.xlsx, chọn trang tính Chi tiêu
2. Nhập dữ liệu cho trang tính tương tự như Hình 10a.1
3. Tại ô G2, nhập công thức =COUNTIF($B$3:$B$10,F2)
4. Sao chép công thức trong ô G2 sang các ô từ G3 đến G10
5. Lưu bảng tính

## 7. Thực hành a) Số lần chi của mỗi khoản chi 🧾  `thuc-hanh-chi`

**Câu 16** (Vận dụng) — Tại ô G2 nhập công thức tính số lần chi của khoản Ở (dùng ô F2 làm điều kiện), rồi sao chép sang G3:G10.
- Đáp án: nhập vào G2:G10: **=COUNTIF($B$3:$B$10,F2)**
- Giải thích: G2 = COUNTIF($B$3:$B$10,F2) = 2; sao chép xuống: Ăn 1, Di chuyển 1, Học tập 1, Sức khoẻ 1, Giải trí 0, Quà tặng/Từ thiện 1, Tiết kiệm 1, Khác 0 (Hình 10a.2).

**Câu 17** (Thông hiểu) — Trong tháng 8, khoản chi nào được chi nhiều lần nhất?
- A. Ăn
- B. Học tập
- C. Ở ✅
- D. Tiết kiệm
- Giải thích: G2 (Ở) = 2 là lớn nhất: tiền điện và tiền nước tháng 8.

**Câu 18** (Thông hiểu) — Ô G7 (Giải trí) và G10 (Khác) bằng 0 có nghĩa là gì?
- A. Công thức bị sai
- B. Trong tháng 8, gia đình chưa chi lần nào cho hai khoản này ✅
- C. Hai khoản này chi nhiều nhất
- D. Bảng tính chưa tính xong
- Giải thích: COUNTIF trả về 0 khi không có ô nào trong vùng B3:B10 thoả mãn điều kiện.

## 8. Thực hành b) Số lần thu của mỗi khoản thu 💵  `thuc-hanh-thu`

**Câu 19** (Vận dụng) — Tại ô G2 nhập công thức tính số lần thu của khoản Lương, rồi sao chép sang G3:G6.
- Đáp án: nhập vào G2:G6: **=COUNTIF($B$3:$B$8,F2)**
- Giải thích: G2 = COUNTIF($B$3:$B$8,F2): Lương 1, Thưởng 1, Làm thêm 2, Được cho/tặng 1, Khác 1 (Hình 10a.5).

**Câu 20** (Thông hiểu) — Sau khi sao chép, công thức ở ô G6 là:
- A. =COUNTIF($B$3:$B$8,F2)
- B. =COUNTIF($B$7:$B$12,F6)
- C. =COUNTIF($B$3:$B$8,F6) ✅
- D. =COUNTIF(B7:B12,F6)
- Giải thích: Range có $ giữ nguyên $B$3:$B$8; criteria dời 4 hàng: F2 → F6.

**Câu 21** (Thông hiểu) — Khoản thu nào có số lần thu nhiều nhất?
- A. Lương
- B. Làm thêm ✅
- C. Thưởng
- D. Được cho/tặng
- Giải thích: Làm thêm có 2 lần: bán hàng trực tuyến (15/8) và làm thêm tháng 8 (30/8).

## 9. Thực hành: Thống kê bảng điểm lớp 9A 🎓  `thuc-hanh-bang-diem`

**Câu 22** (Vận dụng) — B18 — Số HS giỏi: đếm số HS có điểm TB từ 8 trở lên (vùng B2:B16).
- Đáp án: nhập vào B18: **=COUNTIF(B2:B16,">=8")**
- Giải thích: =COUNTIF(B2:B16,">=8") = 6. “Từ 8 trở lên” dùng >= (điểm 8 cũng được đếm).

**Câu 23** (Vận dụng) — B19 — Số HS yếu: đếm số HS có điểm TB dưới 5.
- Đáp án: nhập vào B19: **=COUNTIF(B2:B16,"<5")**
- Giải thích: =COUNTIF(B2:B16,"<5") = 3 (4.6; 3.9; 4.8).

**Câu 24** (Vận dụng) — B20 — Số HS nữ (vùng C2:C16).
- Đáp án: nhập vào B20: **=COUNTIF(C2:C16,"Nữ")**
- Giải thích: =COUNTIF(C2:C16,"Nữ") = 7. Điều kiện là chữ đặt trong ngoặc kép.

**Câu 25** (Vận dụng) — Một bạn hỏi AI và nhận được công thức =COUNTIF(B2:B16,>=8). Em nhận xét thế nào?
- A. Đúng, dùng được ngay
- B. Sai: điều kiện >=8 phải đặt trong dấu ngoặc kép: ">=8" ✅
- C. Sai: phải đổi thành =COUNT(B2:B16)
- D. Sai: vùng phải là C2:C16
- Giải thích: Điều kiện so sánh phải là ">=8". Kết quả AI cần được kiểm chứng bằng cách nhập thử trên bảng tính.

**Câu 26** (Vận dụng cao) — Mở rộng — B21: đếm số HS loại Khá (6.5 ≤ điểm < 8).
- Đáp án: nhập vào B21: **=COUNTIF(B2:B16,">=6.5")-COUNTIF(B2:B16,">=8")**
- Giải thích: Số HS có điểm ≥ 6.5 trừ số HS có điểm ≥ 8: 11 − 6 = 5. Cũng có thể dùng hàm nhiều điều kiện =COUNTIFS(B2:B16,">=6.5",B2:B16,"<8").

## 10. Luyện tập: Mở quà bí mật 🎁  `hop-qua`

**Câu 27** (Nhận biết) — Trong Excel, cấu trúc hàm COUNTIF nào đúng?
- A. =COUNTIF(criteria, range)
- B. COUNTIF(range, criteria)
- C. COUNTIF(criteria, range)
- D. =COUNTIF(range, criteria) ✅
- Giải thích: Công thức bắt đầu bằng dấu =, tham số thứ nhất là range, thứ hai là criteria: =COUNTIF(range, criteria).

**Câu 28** (Nhận biết) — Hàm COUNTIF được sử dụng để:
- A. Xác thực dữ liệu
- B. Hỗ trợ tính toán
- C. Sắp xếp dữ liệu
- D. Đếm số ô tính trong vùng dữ liệu thoả mãn điều kiện ✅
- Giải thích: COUNTIF là hàm đếm theo điều kiện.

**Câu 29** (Thông hiểu) — Các ô A1 = 30, A2 = 30, A3 = "AQ", A4 = 2. Kết quả của =COUNTIF(A1:A4,"30") là:
- A. 3
- B. 1
- C. 2 ✅
- D. 4
- Giải thích: Có 2 ô bằng 30 (A1, A2) → 2.

**Câu 30** (Vận dụng) — Các ô A1 = 30, A2 = 30, A3 = "AQ", A4 = 2. Kết quả của =COUNTIF(A1:A4,"<30") là:
- A. 3
- B. 1 ✅
- C. 2
- D. 4
- Giải thích: Chỉ ô A4 = 2 nhỏ hơn 30. Ô A3 chứa chữ nên không được so sánh số → 1.

**Câu 31** (Thông hiểu) — Công thức =COUNTIF(B3:B10,"Ở") cho biết điều gì?
- A. Số ô trong vùng B3:B10 chứa chữ Ở ✅
- B. Tổng số tiền chi cho khoản Ở
- C. Vị trí ô chứa chữ Ở
- D. Số ô trống trong vùng B3:B10
- Giải thích: COUNTIF đếm số ô thoả mãn điều kiện, không tính tổng tiền (tính tổng theo điều kiện là hàm SUMIF — Bài 11a).

**Câu 32** (Thông hiểu) — Vì sao ở ô G2 nên viết =COUNTIF($B$3:$B$10,F2) thay vì =COUNTIF(B3:B10,F2)?
- A. Để công thức ngắn hơn
- B. Để vùng kiểm tra giữ nguyên khi sao chép sang G3:G10 ✅
- C. Để đếm được số tiền
- D. Vì Excel bắt buộc có dấu $
- Giải thích: Dấu $ cố định vùng range khi sao chép; criteria F2 vẫn dời thành F3, F4…

**Câu 33** (Vận dụng cao) — Các ô A1:A4 = Yes, No, Yellow, yes. Kết quả của =COUNTIF(A1:A4,"Y*") là:
- A. 3 ✅
- B. 2
- C. 1
- D. 4
- Giải thích: "Y*" = bắt đầu bằng chữ Y; COUNTIF không phân biệt chữ hoa, thường → Yes, Yellow, yes: 3 ô.

**Câu 34** (Vận dụng) — Để đếm số khoản chi có số tiền lớn hơn 500 (nghìn đồng) trong vùng D3:D10, công thức đúng là:
- A. =COUNTIF(D3:D10,>500)
- B. =COUNTIF(D3:D10,">500") ✅
- C. =COUNTIF(">500",D3:D10)
- D. =COUNT(D3:D10,">500")
- Giải thích: Range là D3:D10, điều kiện ">500" đặt trong ngoặc kép.

## 11. Luyện tập 1: Bổ sung dữ liệu, điều chỉnh công thức ➕  `luyen-tap-1`

**Câu 35** (Thông hiểu) — Nếu vẫn giữ công thức cũ =COUNTIF($B$3:$B$10,F2), ô G7 (Giải trí) cho kết quả bao nhiêu?
- A. 0 — sai, vì vùng cũ không có hàng mới ✅
- B. 1 — đúng
- C. 2
- D. Báo lỗi
- Giải thích: Khoản Giải trí mới ở hàng 12, nằm ngoài vùng $B$3:$B$10 → vẫn 0 (đúng phải là 1).

**Câu 36** (Vận dụng) — Điều chỉnh công thức ở G2 cho đủ các hàng mới, rồi sao chép sang G3:G10.
- Đáp án: nhập vào G2:G10: **=COUNTIF($B$3:$B$13,F2)**
- Giải thích: =COUNTIF($B$3:$B$13,F2): Ở 2, Ăn 1, Di chuyển 2, Học tập 1, Sức khoẻ 2, Giải trí 1, Quà tặng/Từ thiện 1, Tiết kiệm 1, Khác 0.

**Câu 37** (Vận dụng cao) — Mở rộng: để lần sau nhập thêm dữ liệu mà không phải sửa công thức, em có thể:
- A. Chọn vùng range rộng hơn phần dữ liệu, ví dụ $B$3:$B$100 (ô trống không được đếm) ✅
- B. Xoá dấu $ trong công thức
- C. Gõ trực tiếp kết quả vào cột G
- D. Chuyển sang dùng hàm SUM
- Giải thích: Vùng rộng sẵn bao gồm cả các hàng sẽ nhập sau; ô trống không thoả điều kiện nên không ảnh hưởng kết quả. Excel cũng cho dùng cả cột, ví dụ =COUNTIF($B:$B,F2) — ô tiêu đề “Khoản chi” không trùng tên khoản nào nên không bị đếm.

## 12. Luyện tập 2: Khảo sát chọn trường THPT 🏫  `luyen-tap-2`

**Câu 38** (Vận dụng) — Tại E5 nhập công thức đếm số bạn chọn trường A, rồi sao chép sang E6:E8.
- Đáp án: nhập vào E5:E8: **=COUNTIF($B$4:$B$13,D5)**
- Giải thích: E5 = COUNTIF($B$4:$B$13,D5): A 3, B 2, C 3, D 2 (tổng 10 = số bạn được khảo sát).

**Câu 39** (Thông hiểu) — Theo kết quả khảo sát, trường nào được chọn nhiều nhất?
- A. Trường A và trường C ✅
- B. Trường B
- C. Trường D
- D. Trường B và trường D
- Giải thích: A và C cùng có 3 bạn chọn.

**Câu 40** (Vận dụng) — Cách thu thập dữ liệu khảo sát nào nhanh, chính xác và đưa được ngay vào bảng tính?
- A. Hỏi miệng từng bạn rồi nhớ lại
- B. Dùng bảng hỏi trực tuyến (ví dụ Google Forms) gửi cả lớp, kết quả xuất ra bảng tính ✅
- C. Dùng cảm biến nhiệt độ
- D. Đoán theo sở thích của lớp năm trước
- Giải thích: Bảng hỏi (phiếu khảo sát, biểu mẫu trực tuyến) là cách thu thập dữ liệu phù hợp với khảo sát ý kiến; cảm biến dùng thu dữ liệu đo đạc (nhiệt độ, ánh sáng…).

**Câu 41** (Vận dụng cao) — Tổng các ô E5:E8 bằng 10. Vì sao nên kiểm tra con số này?
- A. Để biết điểm trung bình của lớp
- B. Vì tổng phải bằng số bạn được khảo sát — nếu khác là công thức hoặc dữ liệu có sai sót ✅
- C. Vì COUNTIF luôn cho tổng bằng 10
- D. Không cần kiểm tra
- Giải thích: Mỗi bạn chọn đúng một trường nên tổng số lượng = số bạn được khảo sát. Đây là cách kiểm chứng kết quả thống kê.

## 13. Phiếu tự kiểm tra sản phẩm thực hành 📋  `tu-kiem-tra`

**Phiếu tự đánh giá** (gửi GV, không chấm điểm)

- **🧾 TaiChinhGiaDinh.xlsx:** Trang Chi tiêu: G2 = COUNTIF($B$3:$B$10,F2), sao chép đến G10 · Trang Thu nhập: G2 = COUNTIF($B$3:$B$8,F2), sao chép đến G6 · Bổ sung dòng dữ liệu thu, chi và điều chỉnh vùng range cho đúng · Lưu tệp
- **🎓 ThucHanh_COUNTIF_Hoten.xlsx:** Có số HS điểm ≥ 8, điểm < 5, số HS nữ ở cuối bảng · Có nhãn rõ ràng, kẻ viền, chữ đậm cho dòng kết quả · Đã kiểm chứng kết quả bằng đếm thủ công
- **🏫 Khảo sát chọn trường THPT:** Nhập dữ liệu khảo sát của lớp vào bảng tính · Bảng Thống kê dùng COUNTIF, tổng bằng số bạn được khảo sát
- Câu hỏi mở: Nhóm em hay mắc lỗi gì khi dùng hàm COUNTIF? Em đã khắc phục thế nào?
- Dự kiến sản phẩm:
  - Lỗi thường gặp: quên dấu $ ở vùng range nên sao chép bị sai; điều kiện so sánh không đặt trong ngoặc kép (>=8); chọn sai cột; đảo thứ tự range và criteria; thêm dữ liệu nhưng không mở rộng vùng range.
  - Khắc phục: bấm vào ô kiểm tra công thức trên thanh công thức, sửa lại vùng/điều kiện; đối chiếu với đếm thủ công; kiểm tra tổng số lần bằng số dòng dữ liệu.

## 14. Vận dụng: Kinh phí Triển lãm tin học 🏛️  `van-dung`

**Câu 42** (Vận dụng) — Trang Các khoản thu: tại G2 nhập công thức đếm số lần thu khoản Quỹ, rồi sao chép sang G3.
- Đáp án: nhập vào G2:G3: **=COUNTIF($B$3:$B$11,F2)**
- Giải thích: =COUNTIF($B$3:$B$11,F2): Quỹ 4 lần, Tài trợ 5 lần.

**Câu 43** (Vận dụng) — Trang Các khoản chi: tại G2 nhập công thức đếm số lần chi khoản Văn phòng phẩm, rồi sao chép sang G3.
- Đáp án: nhập vào G2:G3: **=COUNTIF($B$3:$B$13,F2)**
- Giải thích: =COUNTIF($B$3:$B$13,F2): Văn phòng phẩm 5 lần, In tài liệu 6 lần.

**Câu 44** (Vận dụng cao) — Tổng số lần chi (G2 + G3) phải bằng bao nhiêu để chắc chắn công thức đúng?
- A. 2
- B. 11 — bằng số hàng dữ liệu chi ✅
- C. 13
- D. Không xác định được
- Giải thích: Có 11 hàng chi (B3:B13), mỗi hàng thuộc đúng một khoản → 5 + 6 = 11.

## 15. Vận dụng — COUNTIF trong cuộc sống 📝  `van-dung-nha`

**Tự luận 1** — Nêu 2 tình huống thực tế khác có thể dùng hàm COUNTIF (học tập, thư viện, điểm danh…). Viết công thức minh hoạ cho một tình huống.
- Hướng trả lời: Ví dụ: đếm số bạn vắng học trong sổ điểm danh =COUNTIF(C2:C40,"Vắng"); đếm số sách thể loại Khoa học trong thư viện =COUNTIF(B2:B200,"Khoa học"); đếm số bài kiểm tra đạt từ 5 trở lên =COUNTIF(D2:D40,">=5").

**Tự luận 2** — Khi nhờ AI viết công thức COUNTIF, em cần làm gì để chắc chắn công thức đúng?
- Hướng trả lời: Nêu rõ vùng dữ liệu và điều kiện trong câu lệnh; kiểm tra cú pháp (range trước, criteria sau, điều kiện so sánh trong ngoặc kép, dấu $ khi cần sao chép); nhập thử trên bảng tính và đối chiếu với đếm thủ công. Không dùng ngay kết quả AI khi chưa kiểm chứng.

## 16. Tổng kết  `tong-ket`

**Câu 45** (Vận dụng cao) — G12: đếm số khoản chi có số tiền lớn hơn 500 (nghìn đồng).
- Đáp án: nhập vào G12: **=COUNTIF(D3:D10,">500")**
- Giải thích: =COUNTIF(D3:D10,">500") = 6 (800, 620, 2 200, 600, 1 000, 8 000).

**Câu 46** (Vận dụng) — Công thức nào đếm số học sinh nam trong vùng Giới tính C2:C16?
- A. =COUNTIF(C2:C16,Nam)
- B. =COUNT(C2:C16,"Nam")
- C. =COUNTIF("Nam",C2:C16)
- D. =COUNTIF(C2:C16,"Nam") ✅
- Giải thích: Range C2:C16 đứng trước, điều kiện chữ "Nam" đặt trong ngoặc kép.

