# NGÂN HÀNG CÂU HỎI — TIN 9 BÀI 11a: SỬ DỤNG HÀM SUMIF

> Sinh từ `data/lesson.js` (nguồn chính). Sửa câu hỏi trong `data/lesson.js`.

## 1. Mở đầu — Hộp quà may mắn 🎁  `mo-dau`

**Câu 1** (Nhận biết) — Trong các phương án sau đây, phương án nào là KHÔNG đúng?
- A. Trong hộp thoại Data Validation, có thể thiết lập thông báo lỗi khi nhập dữ liệu không thoả mãn điều kiện.
- B. Nút lệnh Data Validation thuộc dải lệnh Formulas. ✅
- C. Các giá trị số nên được xác thực khi nhập vào bảng tính để tránh lỗi khi tính toán.
- D. Tính năng Data Validation cho phép thiết lập chế độ nhập dữ liệu từ danh sách thả xuống.
- Giải thích: Nút lệnh Data Validation thuộc nhóm Data Tools của dải lệnh Data, không phải Formulas.

**Câu 2** (Nhận biết) — Hàm COUNTIF đếm số ô tính trong vùng dữ liệu thoả mãn mấy điều kiện?
- A. 1 ✅
- B. 2
- C. 3
- D. 4
- Giải thích: COUNTIF có một tham số criteria — một điều kiện.

**Câu 3** (Nhận biết) — Trong bảng tính điện tử, công thức hàm COUNTIF nào đúng?
- A. COUNTIF(criteria,range)
- B. COUNTIF(criteria,range,[count_range])
- C. COUNTIF(range, criteria) ✅
- D. COUNTIF(range, criteria, [count_range])
- Giải thích: COUNTIF(range, criteria): vùng kiểm tra trước, điều kiện sau.

**Câu 4** (Thông hiểu) — Hàm COUNTIF được sử dụng để:
- A. Tính toán dữ liệu cho bảng
- B. Thống kê cho một bảng dữ liệu
- C. So sánh dữ liệu trong bảng
- D. Thống kê có điều kiện cho một bảng dữ liệu ✅
- Giải thích: COUNTIF đếm theo điều kiện — thống kê có điều kiện.

**Câu 5** (Thông hiểu) — Công thức =SUM(D3:D10) trong trang tính Chi tiêu cho biết:
- A. Số lần chi của khoản Ở
- B. Tổng số tiền của tất cả các lần chi ✅
- C. Tổng số tiền của khoản Ở
- D. Số khoản chi lớn nhất
- Giải thích: SUM cộng tất cả các số trong vùng D3:D10, không phân biệt khoản chi.

**Câu 6** (Vận dụng) — Muốn biết tổng số tiền đã chi cho khoản Ở, dùng COUNTIF có được không?
- A. Được, COUNTIF cộng các số tiền
- B. Không, COUNTIF chỉ đếm số ô; cần hàm tính tổng theo điều kiện ✅
- C. Được, chỉ cần thêm dấu $
- D. Không, bảng tính không làm được việc này
- Giải thích: COUNTIF cho biết số lần (2 lần), không cộng tiền. Bài này học hàm tính tổng theo điều kiện SUMIF.

## 2. Hoạt động 1: Tổng hợp chi tiêu theo từng khoản 💰  `hd1-tong-tien`

**Câu 7** (Thông hiểu) — Con số 920 ở ô H2 mang ý nghĩa gì?
- A. Số lần chi của khoản Ở
- B. Tổng số tiền của tất cả các khoản chi
- C. Tổng số tiền đã chi cho khoản Ở ✅
- D. Số tiền lớn nhất đã chi
- Giải thích: H2 nằm ở hàng khoản Ở, cột Tổng tiền → tổng số tiền của khoản chi Ở = 920 (nghìn đồng).

**Câu 8** (Nhận biết) — 920 = 800 + 120. Ô D3 chứa 800; bấm vào ô chứa 120 cũng thuộc khoản Ở.
- Đáp án: **D8**
- Giải thích: Hàng 8: 26/8/23 — Ở — Tiền nước tháng 8 — 120.

**Câu 9** (Thông hiểu) — Công thức ở ô H2 liên quan đến những dữ liệu nào trong vùng A3:D10?
- A. Chỉ cột Ngày (A3:A10)
- B. Cột Khoản chi (B3:B10) để kiểm tra điều kiện và cột Số tiền (D3:D10) để tính tổng ✅
- C. Chỉ cột Nội dung (C3:C10)
- D. Cột Ngày và cột Nội dung
- Giải thích: Kiểm tra ô nào ở B3:B10 là “Ở”, rồi cộng số tiền ở cùng hàng trong D3:D10.

## 3. Hàm SUMIF — cú pháp & hai dạng sử dụng (Bảng 11a.1) ➕  `ham-sumif`

**Câu 10** (Nhận biết) — Công thức chung của hàm SUMIF là:
- A. =SUMIF(criteria, range, [sum_range])
- B. =SUMIF(range, [sum_range], criteria)
- C. =SUMIF(range, criteria, [sum_range]) ✅
- D. =SUM(range, criteria)
- Giải thích: =SUMIF(range, criteria, [sum_range]); dấu [ ] cho biết sum_range là tham số tuỳ chọn.

**Câu 11** (Thông hiểu) — Trong công thức =SUMIF(B3:B10,"Ở",D3:D10), vùng D3:D10 là:
- A. range — phạm vi chứa các giá trị cần kiểm tra
- B. criteria — điều kiện kiểm tra
- C. sum_range — phạm vi chứa các giá trị cần tính tổng ✅
- D. Vùng chứa kết quả
- Giải thích: B3:B10 là range (kiểm tra), "Ở" là criteria, D3:D10 là sum_range (cộng các số tiền).

**Câu 12** (Vận dụng) — Dạng 2 — D1: tính tổng các giá trị lớn hơn 5 trong vùng A1:A5.
- Đáp án: nhập vào D1: **=SUMIF(A1:A5,">5")**
- Giải thích: =SUMIF(A1:A5,">5") = 7 + 8 = 15 (số 5 không lớn hơn 5). Không có sum_range → cộng chính các ô của range.

**Câu 13** (Vận dụng) — Dạng 1 — D1: tính tổng tiền mà Khoa đã chi.
- Đáp án: nhập vào D1: **=SUMIF(A2:A5,"Khoa",B2:B5)**
- Giải thích: =SUMIF(A2:A5,"Khoa",B2:B5) = 500,000 + 250,000 = 750,000.

**Câu 14** (Vận dụng) — Dự đoán: =SUMIF(A2:A5,"Minh",B2:B5) (tổng tiền Minh đã chi) bằng bao nhiêu? Gõ thử vào ô D2 của bảng tính thử phía trên để kiểm tra.
- A. 450,000
- B. 530,200 ✅
- C. 80,200
- D. 1,280,200
- Giải thích: Minh ở A3 và A5 → 450,000 + 80,200 = 530,200.

## 4. Ghép tham số, ví dụ với ý nghĩa 🧩  `tham-so`

**Ghép đôi** — Ghép mỗi tham số / công thức với ý nghĩa đúng. Làm hết rồi bấm Nộp bài.

- range ⟶ Phạm vi chứa các giá trị cần kiểm tra (hoặc tính tổng nếu không có sum_range)
- criteria ⟶ Điều kiện kiểm tra
- sum_range (tuỳ chọn) ⟶ Phạm vi chứa các giá trị cần tính tổng
- =SUMIF(A1:A5,">5") ⟶ Tổng các giá trị lớn hơn 5 trong chính vùng A1:A5
- =SUMIF(A2:A5,"Khoa",B2:B5) ⟶ Tổng các giá trị trong B2:B5 ứng với các ô trong A2:A5 có giá trị là Khoa

## 5. Trò chơi: COUNTIF hay SUMIF? 🎯  `countif-hay-sumif`

**Phân loại** — Xếp mỗi câu hỏi vào hàm phù hợp để trả lời. Xếp hết rồi bấm Nộp bài.

- **🔢 COUNTIF — đếm:** Khoản Ở đã được chi bao nhiêu lần? · Có bao nhiêu bạn đạt điểm từ 8 trở lên? · Có bao nhiêu khoản chi trên 500 nghìn đồng? · Có bao nhiêu bạn chọn trường A?
- **➕ SUMIF — tính tổng:** Tổng số tiền đã chi cho khoản Ăn là bao nhiêu? · Tổng thu nhập từ Làm thêm trong tháng 8? · Tổng tiền các khoản chi trên 500 nghìn đồng? · Tổng số tiền nhóm đã chi cho In tài liệu?

## 6. Từ "Ở" đến F2 và địa chỉ tuyệt đối 🔒  `dia-chi-tuyet-doi`

**Câu 15** (Thông hiểu) — Vì sao nên thay điều kiện "Ở" bằng ô F2?
- A. Vì công thức sẽ ngắn hơn
- B. Vì tên khoản chi Ở đã lưu ở ô F2; sao chép xuống điều kiện tự đổi thành F3, F4… cho từng khoản ✅
- C. Vì hàm SUMIF không nhận chữ trong ngoặc kép
- D. Vì ô F2 chứa số tiền
- Giải thích: Dùng địa chỉ ô làm điều kiện để một công thức sao chép được cho mọi khoản chi.

**Câu 16** (Vận dụng) — Thử 1: sao chép =SUMIF(B3:B10,F2,D3:D10) (không có $) từ H2 xuống. Ô H5 (Học tập) cho kết quả bao nhiêu?
- A. 2,200
- B. 0 ✅
- C. 920
- D. Báo lỗi
- Giải thích: H5 trở thành =SUMIF(B6:B13,F5,D6:D13): vùng không còn hàng 5 (Học tập, 2,200) → 0 — sai.

**Câu 17** (Vận dụng) — Công thức đúng ở ô H5 sau khi sao chép từ H2 là:
- A. =SUMIF($B$3:$B$10,F2,$D$3:$D$10)
- B. =SUMIF($B$6:$B$13,F5,$D$6:$D$13)
- C. =SUMIF($B$3:$B$10,F5,$D$3:$D$10) ✅
- D. =SUMIF(B3:B10,F5,D3:D10)
- Giải thích: Địa chỉ tuyệt đối giữ nguyên; F2 (tương đối) dời 3 hàng thành F5.

## 7. Nhiệm vụ — Sắp xếp các bước thực hành 🔢  `cac-buoc`

**Sắp xếp** — Sắp xếp các bước tính tổng số tiền của mỗi khoản chi trong trang tính Chi tiêu (SGK tr.47). Xếp xong bấm Nộp bài.

1. Mở tệp bảng tính TaiChinhGiaDinh.xlsx, chọn trang tính Chi tiêu
2. Tại ô H2, nhập công thức =SUMIF($B$3:$B$10,F2,$D$3:$D$10)
3. Sao chép công thức trong ô H2 sang các ô từ H3 đến H10
4. Kiểm tra kết quả
5. Lưu tệp

## 8. Thực hành a) Tổng tiền của mỗi khoản chi 🧾  `thuc-hanh-chi`

**Câu 18** (Vận dụng) — Tại ô H2 nhập công thức tính tổng số tiền của khoản Ở (dùng ô F2 làm điều kiện), rồi sao chép sang H3:H10.
- Đáp án: nhập vào H2:H10: **=SUMIF($B$3:$B$10,F2,$D$3:$D$10)**
- Giải thích: H2:H10 = 920 · 8,000 · 600 · 2,200 · 620 · 0 · 300 · 1,000 · 0 (như Hình 11a.1).

**Câu 19** (Thông hiểu) — Khoản chi nào tốn nhiều tiền nhất trong tháng 8?
- A. Học tập
- B. Ở
- C. Ăn ✅
- D. Tiết kiệm
- Giải thích: Ăn: 8,000 nghìn đồng — lớn nhất (Học tập 2,200; Tiết kiệm 1,000; Ở 920).

**Câu 20** (Vận dụng cao) — Để kiểm tra, tổng các ô H2:H10 phải bằng:
- A. Tổng số lần chi G2:G10
- B. Tổng số tiền D3:D10 (13,640) ✅
- C. Số tiền lớn nhất trong cột D
- D. 920
- Giải thích: Mỗi lần chi thuộc đúng một khoản → tổng theo khoản = tổng tất cả: 13,640 nghìn đồng.

**Câu 21** (Vận dụng) — Một hàng ghi khoản chi là “Ăn uống” thay vì “Ăn” (tên trong cột F). Tổng tiền khoản Ăn ở cột H sẽ:
- A. Vẫn đúng vì SUMIF tự hiểu
- B. Bị thiếu số tiền của hàng đó vì không khớp điều kiện “Ăn” ✅
- C. Báo lỗi #VALUE!
- D. Bị nhân đôi
- Giải thích: Điều kiện phải khớp đúng tên. Dữ liệu cần nhập thống nhất (dùng danh sách thả xuống — Bài 9a) để tổng hợp chính xác.

## 9. Câu hỏi SGK & Thực hành b) Tổng tiền của mỗi khoản thu 💵  `thuc-hanh-thu`

**Câu 22** (Vận dụng) — Câu hỏi SGK: công thức cần nhập vào ô H2 của trang Thu nhập là:
- A. =SUMIF($B$3:$B$10,F2,$D$3:$D$10)
- B. =SUMIF($B$3:$B$8,F2,$D$3:$D$8) ✅
- C. =COUNTIF($B$3:$B$8,F2)
- D. =SUMIF($D$3:$D$8,F2,$B$3:$B$8)
- Giải thích: Dữ liệu thu ở hàng 3 đến 8: range $B$3:$B$8, criteria F2 (Lương), sum_range $D$3:$D$8.

**Câu 23** (Thông hiểu) — Giá trị của ô H2 có ý nghĩa gì?
- A. Số lần nhận Lương
- B. Tổng số tiền thu được từ khoản Lương (10,000 nghìn đồng) ✅
- C. Tổng thu nhập của gia đình
- D. Số tiền lớn nhất
- Giải thích: H2 = tổng tiền thu từ Lương = 10,000 nghìn đồng.

**Câu 24** (Vận dụng) — Tại H2 nhập công thức tính tổng tiền khoản thu Lương, rồi sao chép sang H3:H6.
- Đáp án: nhập vào H2:H6: **=SUMIF($B$3:$B$8,F2,$D$3:$D$8)**
- Giải thích: Lương 10,000 · Thưởng 3,000 · Làm thêm 3,500 · Được cho/tặng 500 · Khác 500.

**Câu 25** (Vận dụng) — Kiểm tra (giáo án): tại H7 (dòng Tổng) nhập công thức tính tổng thu nhập từ các ô H2:H6.
- Đáp án: nhập vào H7: **=SUM(H2:H6)**
- Giải thích: =SUM(H2:H6) = 17,500 — bằng tổng cột Số tiền =SUM(D3:D8), chứng tỏ các công thức SUMIF đúng.

## 10. Luyện tập: Bổ sung dữ liệu, điều chỉnh công thức ➕  `luyen-tap`

**Câu 26** (Vận dụng) — Chi tiêu: điều chỉnh công thức ở H2 cho đủ các hàng mới, rồi sao chép sang H3:H10.
- Đáp án: nhập vào H2:H10: **=SUMIF($B$3:$B$13,F2,$D$3:$D$13)**
- Giải thích: =SUMIF($B$3:$B$13,F2,$D$3:$D$13): Ở 920 · Ăn 8,000 · Di chuyển 680 · Học tập 2,200 · Sức khoẻ 920 · Giải trí 150 · Quà tặng/Từ thiện 300 · Tiết kiệm 1,000 · Khác 0.

**Câu 27** (Thông hiểu) — Chi tiêu: trước khi sửa, công thức cũ =SUMIF($B$3:$B$10,F2,$D$3:$D$10), cho ô H7 (Giải trí) kết quả bao nhiêu?
- A. 0 — sai, vì vùng cũ không có hàng mới ✅
- B. 150 — đúng
- C. 300
- D. Báo lỗi
- Giải thích: Khoản Giải trí mới ở hàng 12, ngoài vùng cũ → 0 (đúng phải là 150).

**Câu 28** (Vận dụng) — Thu nhập (thêm 2 hàng): điều chỉnh công thức ở H2, rồi sao chép sang H3:H6.
- Đáp án: nhập vào H2:H6: **=SUMIF($B$3:$B$10,F2,$D$3:$D$10)**
- Giải thích: =SUMIF($B$3:$B$10,F2,$D$3:$D$10): Lương 10,000 · Thưởng 4,000 · Làm thêm 4,300 · Được cho/tặng 500 · Khác 500.

**Câu 29** (Vận dụng cao) — Một bạn nhờ AI nhận xét chi tiêu nhưng chỉ nhập dữ liệu của tuần có sinh nhật bà (nhiều khoản Quà tặng). AI kết luận “gia đình chi quá nhiều cho quà tặng”. Vì sao kết luận này đáng nghi?
- A. Vì AI luôn trả lời sai
- B. Vì dữ liệu đầu vào không cân bằng, không đại diện cho cả tháng nên kết quả bị thiên lệch ✅
- C. Vì bảng tính không có hàm SUMIF
- D. Vì quà tặng không phải khoản chi
- Giải thích: AI chỉ dựa trên dữ liệu được cung cấp. Dữ liệu lệch (chỉ một tuần đặc biệt) dẫn đến kết luận thiên vị. Cần dữ liệu đầy đủ, cân bằng và tự kiểm chứng.

## 11. Phiếu tự kiểm tra tệp TaiChinhGiaDinh.xlsx 📋  `tu-kiem-tra`

**Phiếu tự đánh giá** (gửi GV, không chấm điểm)

- **🧾 TRANG TÍNH CHI TIÊU:** Thêm cột Tổng tiền (nghìn đồng) ở cột H · H2 = SUMIF($B$3:$B$10,F2,$D$3:$D$10), sao chép đến H10 · Tổng cột H bằng tổng cột Số tiền
- **💵 TRANG TÍNH THU NHẬP:** H2 = SUMIF($B$3:$B$8,F2,$D$3:$D$8), sao chép đến H6 · Có dòng Tổng để kiểm tra kết quả
- **➕ LUYỆN TẬP:** Bổ sung dòng dữ liệu vào cuối cả hai trang tính · Điều chỉnh cả range và sum_range trong công thức · Lưu tệp đúng tên, đúng vị trí
- Câu hỏi mở: Em hay mắc lỗi gì khi dùng hàm SUMIF? Em đã khắc phục thế nào?
- Dự kiến sản phẩm:
  - Lỗi thường gặp: quên dấu $ nên sao chép bị sai; đảo vị trí range và sum_range; chọn sum_range lệch hàng với range; thêm dữ liệu nhưng chỉ sửa range, quên sum_range; tên khoản mục gõ không thống nhất.
  - Khắc phục: bấm vào ô kiểm tra công thức, sửa vùng; so sánh tổng cột H với tổng cột Số tiền; dùng danh sách thả xuống để nhập tên khoản mục.

## 12. Vận dụng: Kinh phí Triển lãm tin học 🏛️  `van-dung`

**Câu 30** (Vận dụng) — Trang Các khoản thu: tại H2 nhập công thức tính tổng tiền khoản Quỹ, rồi sao chép sang H3.
- Đáp án: nhập vào H2:H3: **=SUMIF($B$3:$B$11,F2,$D$3:$D$11)**
- Giải thích: Quỹ 2,360 · Tài trợ 2,840 (nghìn đồng) → tổng thu 5,200.

**Câu 31** (Vận dụng) — Trang Các khoản chi: tại H2 nhập công thức tính tổng tiền khoản Văn phòng phẩm, rồi sao chép sang H3.
- Đáp án: nhập vào H2:H3: **=SUMIF($B$3:$B$13,F2,$D$3:$D$13)**
- Giải thích: Văn phòng phẩm 330 · In tài liệu 386 (nghìn đồng) → tổng chi 716.

**Câu 32** (Vận dụng cao) — Theo kết quả trên, kinh phí dự án còn lại (tổng thu − tổng chi) là bao nhiêu nghìn đồng?
- A. 716
- B. 5,200
- C. 4,484 ✅
- D. 5,916
- Giải thích: (2,360 + 2,840) − (330 + 386) = 5,200 − 716 = 4,484 nghìn đồng.

## 13. Vận dụng — SUMIF trong cuộc sống 📝  `van-dung-nha`

**Tự luận 1** — Nêu 2 tình huống thực tế khác có thể dùng hàm SUMIF. Viết công thức minh hoạ cho một tình huống.
- Hướng trả lời: Ví dụ: tổng tiền quỹ lớp đã chi cho Văn nghệ =SUMIF(B2:B30,"Văn nghệ",C2:C30); tổng số sách mỗi lớp quyên góp =SUMIF(A2:A50,"9A",C2:C50); tổng số điện gia đình dùng trong các tháng trên 200 kWh =SUMIF(B2:B13,">200").

**Tự luận 2** — Vì sao cần sắp xếp, nhập dữ liệu thống nhất (đúng cột, đúng tên khoản mục) trước khi dùng SUMIF?
- Hướng trả lời: SUMIF so khớp điều kiện với từng ô và cộng ô tương ứng ở cùng hàng. Dữ liệu sai cột, lệch hàng hoặc tên khoản mục không thống nhất (Ăn / Ăn uống / an) sẽ bị bỏ sót → tổng sai. Nên dùng danh sách thả xuống (Data Validation), tiêu đề cột rõ ràng và kiểm tra tổng.

## 14. Tổng kết  `tong-ket`

**Câu 33** (Vận dụng cao) — G12: tính tổng tiền của các lần chi có số tiền lớn hơn 1000 (nghìn đồng).
- Đáp án: nhập vào G12: **=SUMIF(D3:D10,">1000")**
- Giải thích: =SUMIF(D3:D10,">1000") = 2,200 + 8,000 = 10,200 (1,000 không lớn hơn 1000). Dạng không có sum_range.

**Câu 34** (Vận dụng) — Công thức nào tính tổng tiền đã chi cho khoản Ăn?
- A. =COUNTIF(B3:B10,"Ăn")
- B. =SUMIF(D3:D10,"Ăn",B3:B10)
- C. =SUMIF(B3:B10,"Ăn",D3:D10) ✅
- D. =SUM(B3:B10,"Ăn")
- Giải thích: range là cột Khoản chi B3:B10, điều kiện "Ăn", sum_range là cột Số tiền D3:D10.

