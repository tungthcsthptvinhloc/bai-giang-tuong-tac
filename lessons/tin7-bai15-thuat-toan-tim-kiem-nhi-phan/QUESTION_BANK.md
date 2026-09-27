# NGÂN HÀNG CÂU HỎI — TIN 7 BÀI 15: THUẬT TOÁN TÌM KIẾM NHỊ PHÂN

> Sinh từ `data/lesson.js` (nguồn chính). Sửa câu hỏi trong `data/lesson.js`.

## 1. Mở đầu — Hàng trăm khách hàng, tìm sao cho nhanh? 🤔  `khoi-dong`

**Câu 1** (Thông hiểu) — Danh sách có hàng trăm khách hàng. Nhược điểm của tìm kiếm tuần tự là gì?
- A. Không bao giờ tìm thấy
- B. Nếu tên cần tìm ở cuối danh sách thì phải xét gần hết danh sách, mất nhiều thời gian ✅
- C. Phải sắp xếp danh sách trước
- D. Chỉ tìm được số, không tìm được tên
- Giải thích: Tìm kiếm tuần tự xét lần lượt từng phần tử từ đầu danh sách nên với danh sách lớn có thể mất rất nhiều bước.

**Câu 2** (Vận dụng) — Gợi ý nào giúp An tìm khách hàng nhanh hơn?
- A. Viết danh sách bằng chữ to hơn
- B. Tìm từ cuối danh sách lên
- C. Sắp xếp danh sách theo thứ tự chữ cái của tên rồi mới tìm ✅
- D. Chia danh sách cho nhiều người giữ
- Giải thích: Khi danh sách đã được sắp xếp, có thể tìm nhanh hơn bằng cách so sánh với vị trí ở giữa — đó là tìm kiếm nhị phân.

## 2. Thuật toán tìm kiếm nhị phân ✂️  `nhi-phan`

**Câu 3** (Nhận biết) — Câu 1: Giải pháp của An là gì?
- A. Tìm lần lượt từ đầu đến cuối danh sách
- B. Sắp xếp danh sách theo thứ tự chữ cái, so sánh giá trị cần tìm với giá trị ở giữa rồi chỉ tìm tiếp ở một nửa ✅
- C. Tìm ngẫu nhiên một vị trí
- D. Nhờ mẹ đọc to danh sách
- Giải thích: An sắp xếp danh sách theo thứ tự chữ cái, so sánh với vị trí ở giữa: bằng thì dừng, lớn hơn tìm nửa sau, nhỏ hơn tìm nửa đầu.

**Câu 4** (Thông hiểu) — Câu 2: Hoạt động được lặp lại trong giải pháp của An là:
- A. So sánh giá trị cần tìm với giá trị ở vị trí giữa vùng tìm kiếm và thu hẹp vùng tìm kiếm còn một nửa ✅
- B. Sắp xếp lại danh sách
- C. Xem lần lượt từng khách hàng
- D. Ghi thêm khách hàng mới
- Giải thích: Tại mỗi bước lặp: so sánh với vị trí giữa, rồi thu hẹp danh sách tìm kiếm chỉ còn một nửa.

**Câu 5** (Thông hiểu) — Câu 3: Giải pháp của An nhanh hơn tìm kiếm tuần tự vì:
- A. Máy tính chạy nhanh hơn
- B. Tên khách hàng ngắn hơn
- C. Danh sách có ít người hơn
- D. Sau mỗi bước lặp, vùng tìm kiếm chỉ còn một nửa ✅
- Giải thích: Mỗi bước lặp loại bỏ một nửa danh sách nên số bước lặp ít hơn nhiều so với xét lần lượt từng phần tử.

## 3. Máy tìm kiếm nhị phân: tìm “Trúc” 🤖  `may-nhi-phan`

**Câu 6** (Thông hiểu) — Phiếu 1, câu 1: Tìm kiếm tuần tự phải thực hiện bao nhiêu bước lặp để tìm được khách hàng tên “Trúc” trong Hình 15.1?
- A. 3
- B. 9
- C. 8 ✅
- D. 5
- Giải thích: Trúc ở vị trí số 8 → tìm kiếm tuần tự cần 8 bước lặp, trong khi tìm kiếm nhị phân chỉ cần 3 bước lặp (vị trí 5 → 7 → 8).

**Câu 7** (Thông hiểu) — Ở bước 1, vì sao bỏ đi nửa đầu danh sách (An → Mai)?
- A. Vì “T” đứng sau “M” trong bảng chữ cái nên “Trúc” lớn hơn “Mai” ✅
- B. Vì nửa đầu có ít tên hơn
- C. Vì “Trúc” ngắn hơn “Mai”
- D. Vì Mai ở vị trí số 5
- Giải thích: So sánh “Trúc” và “Mai”: “T” đứng sau “M” nên “Trúc” lớn hơn → chỉ tìm ở nửa sau.

**Câu 8** (Nhận biết) — Phiếu 1, câu 2: Trước khi thực hiện tìm kiếm nhị phân, danh sách khách hàng cần thoả mãn điều kiện gì?
- A. Có ít hơn 10 người
- B. Đã được sắp xếp theo thứ tự ✅
- C. Có số điện thoại
- D. Tên không trùng nhau
- Giải thích: Danh sách cần được sắp xếp. Nếu không, thuật toán không thể thu hẹp phạm vi tìm kiếm vì giá trị cần tìm có thể ở vị trí bất kì.

**Câu 9** (Vận dụng) — Nếu danh sách chưa được sắp xếp, thuật toán tìm kiếm nhị phân vẫn luôn cho kết quả đúng.
- Đáp án: **Sai**
- Giải thích: Sai. Không sắp xếp thì không biết giá trị cần tìm nằm ở nửa nào, việc bỏ đi một nửa có thể bỏ mất giá trị cần tìm.

## 4. Vùng tìm kiếm và vị trí giữa 📏  `vung-tim-kiem`

**Câu 10** (Nhận biết) — Phiếu 2, câu 1: Vị trí giữa của vùng tìm kiếm được xác định như thế nào?
- A. Luôn là vị trí số 5
- B. Vị trí cuối chia 2
- C. Phần nguyên của (vị trí đầu + vị trí cuối)/2 ✅
- D. Vị trí đầu cộng 1
- Giải thích: Vị trí giữa = phần nguyên của (vị trí đầu + vị trí cuối)/2.

**Câu 11** (Vận dụng) — Vùng tìm kiếm từ vị trí 6 đến vị trí 9. Vị trí giữa là:
- A. 7 ✅
- B. 8
- C. 7,5
- D. 6
- Giải thích: (6 + 9)/2 = 7,5 → phần nguyên là 7 (đúng như bước 2 tìm “Trúc”: vị trí 7 — Trang).

**Câu 12** (Thông hiểu) — Phiếu 2, câu 2: Thuật toán tìm kiếm nhị phân dừng lại khi nào? (Chọn tất cả đáp án đúng)
- A. Giá trị cần tìm bằng giá trị ở vị trí giữa ✅
- B. Đã xét 3 bước lặp
- C. Vùng tìm kiếm không còn phần tử nào ✅
- D. Giá trị ở giữa là chữ cái A
- Giải thích: Dừng khi tìm thấy (Bước 3) hoặc vùng tìm kiếm không còn phần tử nào — kết luận không tìm thấy (Bước 1).

**Câu 13** (Thông hiểu) — Phiếu 2, câu 3 (Bước 4): Giá trị cần tìm NHỎ HƠN giá trị ở vị trí giữa thì vùng tìm kiếm mới là:
- A. Nửa sau của dãy
- B. Toàn bộ dãy
- C. Chỉ phần tử giữa
- D. Nửa trước của dãy ✅
- Giải thích: Nhỏ hơn → chỉ còn nửa trước; lớn hơn → chỉ còn nửa sau (không gồm phần tử giữa).

**Câu 14** (Nhận biết) — “Nửa trước” và “nửa sau” của vùng tìm kiếm không gồm phần tử ở vị trí giữa.
- Đáp án: **Đúng**
- Giải thích: Đúng (Lưu ý SGK tr.76): phần tử giữa đã được so sánh nên không cần xét lại.

## 5. Sắp xếp 5 bước mô tả thuật toán 🔢  `nam-buoc`

**Sắp xếp** — Sắp xếp 5 bước mô tả thuật toán tìm kiếm nhị phân bằng ngôn ngữ tự nhiên (SGK tr.76) rồi bấm Nộp bài.

1. Nếu vùng tìm kiếm không có phần tử nào thì kết luận không tìm thấy, kết thúc
2. Xác định vị trí giữa của vùng tìm kiếm
3. Nếu giá trị cần tìm bằng giá trị của vị trí giữa thì kết luận tìm thấy tại vị trí giữa, kết thúc
4. Nếu nhỏ hơn thì vùng tìm kiếm mới là nửa trước, ngược lại là nửa sau
5. Lặp lại từ Bước 1 đến Bước 4

## 6. Nhiệm vụ 4 — Tìm khách hàng tên “Hoà” 📝  `tim-hoa`

**Điền bảng (chọn Đúng/Sai)** — Cặp đôi: chọn đáp án cho từng ô để hoàn thành các bước lặp tìm khách hàng tên “Hoà” trong Hình 15.1 (vị trí giữa = phần nguyên của (đầu + cuối)/2). Làm hết rồi bấm Nộp bài.

Bước 1 · Vùng tìm kiếm 1 → 9 · Vị trí giữa: {{}} (Mai) · “Hoà” so với “Mai”: {{}} → vùng tìm kiếm mới: {{}}  
Bước 2 · Vị trí giữa: {{}} ({{}}) · “Hoà” so với giá trị ở giữa: {{}} → vùng tìm kiếm mới: {{}}  
Bước 3 · Vị trí giữa: {{}} (Hoà) · So sánh: {{}} → Kết quả: {{}}

- Đáp án: 5 · Nhỏ hơn · 1 → 4 · 2 · Bình · Lớn hơn · 3 → 4 · 3 · Bằng nhau · Tìm thấy ở vị trí số 3
- Giải thích: Bước 1: vị trí 5 (Mai), “H” đứng trước “M” → nhỏ hơn → vùng 1 → 4. Bước 2: phần nguyên của (1 + 4)/2 = 2 (Bình), “H” đứng sau “B” → lớn hơn → vùng 3 → 4. Bước 3: phần nguyên của (3 + 4)/2 = 3 (Hoà) → bằng nhau → tìm thấy ở vị trí số 3 sau 3 bước lặp.

## 7. Sắp xếp và tìm kiếm ⚖️  `sap-xep-tim-kiem`

**Câu 15** (Vận dụng) — Tìm tên “Vân” (không có trong danh sách 9 khách hàng): tìm kiếm tuần tự và tìm kiếm nhị phân lần lượt cần bao nhiêu bước lặp?
- A. 9 và 9
- B. 9 và 4 ✅
- C. 4 và 9
- D. 8 và 3
- Giải thích: Tuần tự phải xét hết 9 tên; nhị phân: vị trí 5 → 7 → 8 → 9 rồi vùng tìm kiếm không còn phần tử → 4 bước lặp.

**Câu 16** (Thông hiểu) — Vì sao tìm kiếm nhị phân nhanh hơn tìm kiếm tuần tự?
- A. Vì danh sách đã được sắp xếp nên mỗi bước lặp thu hẹp phạm vi tìm kiếm còn một nửa ✅
- B. Vì so sánh chữ nhanh hơn so sánh số
- C. Vì luôn tìm thấy ở bước 1
- D. Vì không cần so sánh
- Giải thích: Nhờ danh sách đã sắp xếp, mỗi bước lặp loại được một nửa vùng tìm kiếm.

**Câu 17** (Nhận biết) — Sắp xếp giúp cho việc tìm kiếm được thực hiện nhanh hơn.
- Đáp án: **Đúng**
- Giải thích: Đúng — đây là mối liên quan giữa sắp xếp và tìm kiếm (SGK tr.77).

## 8. Hoạt động 2 — Trò chơi tìm số 🃏  `tro-choi-tim-so`

**Câu 18** (Vận dụng) — Với 10 thẻ (vị trí 1 → 10), thẻ ở vị trí giữa đầu tiên B cần chọn là thẻ ở vị trí số:
- A. 5 ✅
- B. 6
- C. 1
- D. 10
- Giải thích: Phần nguyên của (1 + 10)/2 = 5 → thẻ thứ 5 (số 8).

**Câu 19** (Vận dụng) — B cần tìm số 15. Theo tìm kiếm nhị phân, B tìm thấy sau bao nhiêu lượt?
- A. 1 lượt
- B. 8 lượt
- C. 2 lượt ✅
- D. 4 lượt
- Giải thích: Lượt 1: thẻ 5 là 8, A nói “lớn hơn” → vùng 6 → 10. Lượt 2: thẻ 8 là 15 → “bằng nhau”.

**Câu 20** (Vận dụng cao) — B cần tìm số 7 (không có trong các thẻ). Sau bao nhiêu lượt B biết chắc là không có số này?
- A. 1 lượt
- B. 2 lượt
- C. 10 lượt
- D. 4 lượt ✅
- Giải thích: Thẻ 5 (8): bé hơn → vùng 1 → 4; thẻ 2 (3): lớn hơn → vùng 3 → 4; thẻ 3 (5): lớn hơn → vùng 4 → 4; thẻ 4 (6): lớn hơn → vùng không còn thẻ nào → 4 lượt.

## 9. Ví dụ thực tế: sắp xếp và tìm kiếm 📚  `vi-du-thuc-te`

**Câu 21** (Vận dụng) — Ví dụ nào cho thấy sắp xếp giúp tìm kiếm nhanh hơn? (Chọn tất cả đáp án đúng)
- A. Thư viện xếp sách theo chủ đề và tên sách ✅
- B. Từ điển xếp các từ theo thứ tự bảng chữ cái ✅
- C. Để đồ dùng lung tung trong cặp sách
- D. Siêu thị xếp hàng hoá theo từng loại, từng khu ✅
- Giải thích: Sách, từ, hàng hoá được sắp xếp giúp tìm nhanh. Đồ dùng để lung tung thì phải lục tìm lần lượt.

**Câu 22** (Vận dụng) — Danh bạ điện thoại xếp theo tên từ A đến Z. Tìm tên “Minh” nhanh nhất bằng cách nào?
- A. Đọc từ tên đầu tiên
- B. Mở khoảng giữa danh bạ, so sánh rồi chỉ tìm tiếp ở nửa phù hợp ✅
- C. Đọc từ tên cuối cùng
- D. Chọn ngẫu nhiên
- Giải thích: Danh bạ đã sắp xếp nên có thể áp dụng cách chia đôi như tìm kiếm nhị phân.

## 10. Luyện tập — Trò chơi Ô cửa bí mật 🚪  `o-cua-bi-mat`

**Câu 23** (Nhận biết) — Câu 1: Thuật toán tìm kiếm nhị phân được sử dụng trong trường hợp nào?
- A. Tìm một phần tử trong danh sách bất kỳ
- B. Tìm một phần tử trong danh sách đã sắp xếp ✅
- Giải thích: Tìm kiếm nhị phân thực hiện trên danh sách đã được sắp xếp.

**Câu 24** (Nhận biết) — Câu 2: Điều gì xảy ra khi thuật toán tìm kiếm nhị phân không tìm thấy giá trị cần tìm trong danh sách?
- A. Tiếp tục tìm kiếm và không bao giờ kết thúc
- B. Thông báo “Tìm thấy” và tìm tiếp xem còn phần tử nào khác nữa không
- C. Thông báo “Tìm thấy” và kết thúc
- D. Thông báo “Không tìm thấy” và kết thúc ✅
- Giải thích: Vùng tìm kiếm không còn phần tử nào → kết luận không tìm thấy và kết thúc.

**Câu 25** (Thông hiểu) — Câu 3: Chọn câu diễn đạt đúng hoạt động của thuật toán tìm kiếm nhị phân.
- A. Tìm trên danh sách đã sắp xếp, bắt đầu từ đầu danh sách, chừng nào chưa tìm thấy và chưa tìm hết thì còn tìm tiếp
- B. Tìm trên danh sách đã sắp xếp, bắt đầu từ giữa danh sách, chừng nào chưa tìm thấy và chưa tìm hết thì còn tìm tiếp ✅
- C. Tìm trên danh sách bất kì, bắt đầu từ giữa danh sách, chừng nào chưa tìm thấy và chưa tìm hết thì còn tìm tiếp
- D. Tìm trên danh sách bất kì, bắt đầu từ đầu danh sách, chừng nào chưa tìm thấy và chưa tìm hết thì còn tìm tiếp
- Giải thích: Danh sách đã sắp xếp, bắt đầu từ vị trí giữa, chừng nào chưa tìm thấy và vùng tìm kiếm còn phần tử thì còn tìm tiếp.

**Câu 26** (Vận dụng) — Câu 4: Thuật toán tìm kiếm nhị phân cần bao nhiêu bước để tìm thấy “Mai” trong danh sách [“Hoa”, “Lan”, “Ly”, “Mai”, “Phong”, “Vi”]?
- A. 1
- B. 2
- C. 3 ✅
- D. 4
- Giải thích: Vị trí 3 (Ly): Mai lớn hơn → vùng 4 → 6; vị trí 5 (Phong): Mai nhỏ hơn → vùng 4 → 4; vị trí 4 (Mai) → tìm thấy sau 3 bước.

**Câu 27** (Vận dụng cao) — Câu 5: Thuật toán tìm kiếm nhị phân cần thực hiện bao nhiêu bước lặp để thông báo không tìm thấy số 15 trong danh sách [3, 5, 7, 11, 12, 25]?
- A. 3 ✅
- B. 4
- C. 5
- D. 6
- Giải thích: Vị trí 3 (7): lớn hơn → vùng 4 → 6; vị trí 5 (12): lớn hơn → vùng 6 → 6; vị trí 6 (25): nhỏ hơn → vùng không còn phần tử → Không tìm thấy sau 3 bước lặp (3 lần so sánh, cách đếm như SGK).

**Câu 28** (Vận dụng) — Câu 6: Thực hiện thuật toán tìm kiếm nhị phân để tìm số 10 trong danh sách [2, 4, 6, 8, 10, 12]. Đầu ra của thuật toán là:
- A. Thông báo “không tìm thấy”
- B. Thông báo “tìm thấy”
- C. Thông báo “tìm thấy”, giá trị cần tìm tại vị trí thứ 5 của danh sách ✅
- D. Thông báo “tìm thấy”, giá trị cần tìm tại vị trí thứ 6 của danh sách
- Giải thích: Vị trí 3 (6): lớn hơn → vùng 4 → 6; vị trí 5 (10): bằng nhau → tìm thấy tại vị trí thứ 5.

## 11. Luyện tập SGK 1a — Sắp xếp tên các nước 🔤  `lt-sap-xep`

**Sắp xếp** — Luyện tập 1a (SGK tr.77, làm thêm hoặc ở nhà): sắp xếp danh sách tên các nước theo thứ tự trong bảng chữ cái rồi bấm Nộp bài.

1. Albania
2. Bolivia
3. Canada
4. Germany
5. Greenland
6. Iceland
7. Portugal
8. Scotland
9. Vietnam

## 12. Luyện tập SGK 1b — Tìm “Iceland” bằng tìm kiếm nhị phân 📝  `lt-iceland`

**Điền bảng (chọn Đúng/Sai)** — Luyện tập 1b: chọn đáp án cho từng ô để liệt kê các bước lặp tìm “Iceland” trong danh sách đã sắp xếp. Làm hết rồi bấm Nộp bài.

Bước 1 · Vùng tìm kiếm 1 → 9 · Vị trí giữa: 5 ({{}}) · “Iceland” so với giá trị ở giữa: {{}} → vùng tìm kiếm mới: {{}}  
Bước 2 · Vị trí giữa: {{}} ({{}}) · “Iceland” so với giá trị ở giữa: {{}} → vùng tìm kiếm mới: {{}}  
Bước 3 · Vị trí giữa: 6 (Iceland) · So sánh: {{}} → Kết quả: {{}}

- Đáp án: Greenland · Lớn hơn · 6 → 9 · 7 · Portugal · Nhỏ hơn · 6 → 6 · Bằng nhau · Tìm thấy ở vị trí số 6
- Giải thích: Bước 1: vị trí 5 (Greenland), “I” đứng sau “G” → lớn hơn → vùng 6 → 9. Bước 2: phần nguyên của (6 + 9)/2 = 7 (Portugal), “I” đứng trước “P” → nhỏ hơn → vùng 6 → 6. Bước 3: vị trí 6 (Iceland) → bằng nhau → tìm thấy sau 3 bước lặp.

## 13. Luyện tập SGK 1c, 2 — Máy kiểm tra và so sánh 🤖  `lt-may`

**Câu 29** (Vận dụng) — Luyện tập 1c: Tìm “Iceland” — tìm kiếm nhị phân (danh sách đã sắp xếp) cần 3 bước lặp; tìm kiếm tuần tự ở Luyện tập Bài 14 (danh sách chưa sắp xếp) cần bao nhiêu bước lặp?
- A. 3
- B. 9
- C. 5
- D. 6 ✅
- Giải thích: Ở Bài 14, Iceland ở vị trí số 6 của danh sách chưa sắp xếp → 6 bước lặp; nhị phân chỉ 3 bước lặp.

**Câu 30** (Vận dụng cao) — Với danh sách tên nước CHƯA sắp xếp, máy hiện cảnh báo. Vì sao phải sắp xếp trước khi tìm kiếm nhị phân?
- A. Để danh sách đẹp hơn
- B. Để biết nên bỏ nửa nào — nếu chưa sắp xếp, giá trị cần tìm có thể nằm ở nửa bị bỏ đi ✅
- C. Để có nhiều bước lặp hơn
- D. Vì máy tính không đọc được danh sách chưa sắp xếp
- Giải thích: Tìm kiếm nhị phân chỉ đúng khi danh sách đã sắp xếp: so sánh với vị trí giữa mới biết giá trị cần tìm nằm ở nửa nào.

## 14. Trò chơi: Chia đôi thần tốc ⚡  `tro-choi`

**Câu 31** (Nhận biết) — Tìm kiếm nhị phân bắt đầu so sánh ở vị trí nào?
- A. Vị trí đầu tiên
- B. Vị trí ở giữa danh sách ✅
- C. Vị trí cuối cùng
- D. Vị trí bất kì
- Giải thích: Bắt đầu từ vị trí ở giữa danh sách.

**Câu 32** (Nhận biết) — Sau mỗi bước lặp (chưa tìm thấy), vùng tìm kiếm còn lại khoảng:
- A. Một nửa ✅
- B. Bớt đi 1 phần tử
- C. Không đổi
- D. Gấp đôi
- Giải thích: Mỗi bước lặp thu hẹp vùng tìm kiếm chỉ còn một nửa.

**Câu 33** (Vận dụng) — Vùng tìm kiếm từ vị trí 1 đến vị trí 8. Vị trí giữa là:
- A. 5
- B. 4,5
- C. 4 ✅
- D. 8
- Giải thích: Phần nguyên của (1 + 8)/2 = 4,5 → 4.

**Câu 34** (Vận dụng) — Dãy [4, 9, 13, 20, 27, 31, 40]. Tìm số 31: vị trí giữa ở bước 1 và bước 2 lần lượt là:
- A. 4 và 2
- B. 4 và 5
- C. 3 và 6
- D. 4 và 6 ✅
- Giải thích: Bước 1: phần nguyên của (1 + 7)/2 = 4 (số 20), 31 lớn hơn → vùng 5 → 7; bước 2: phần nguyên của (5 + 7)/2 = 6 (số 31) → tìm thấy.

**Câu 35** (Thông hiểu) — So sánh “Lan” và “Minh” theo bảng chữ cái:
- A. “Lan” nhỏ hơn “Minh” vì “L” đứng trước “M” ✅
- B. “Lan” lớn hơn “Minh”
- C. Bằng nhau
- D. Không so sánh được
- Giải thích: Kí tự đứng trước là “nhỏ hơn” kí tự đứng sau trong bảng chữ cái.

**Câu 36** (Thông hiểu) — Danh sách nào KHÔNG áp dụng trực tiếp được tìm kiếm nhị phân?
- A. Từ điển Anh – Việt
- B. Danh sách học sinh xếp theo tên từ A đến Z
- C. Danh sách số điểm ghi theo thứ tự các bạn nộp bài (lộn xộn) ✅
- D. Dãy số 1, 3, 5, 7, 9
- Giải thích: Danh sách chưa được sắp xếp thì không áp dụng được tìm kiếm nhị phân.

**Câu 37** (Vận dụng cao) — Danh sách 9 phần tử đã sắp xếp, giá trị cần tìm ở vị trí cuối cùng. Tìm kiếm nhị phân cần bao nhiêu bước lặp?
- A. 9
- B. 1
- C. 4 ✅
- D. 2
- Giải thích: Vị trí 5 → 7 → 8 → 9: 4 bước lặp (tuần tự cần 9 bước lặp).

**Câu 38** (Nhận biết) — Mối liên quan giữa sắp xếp và tìm kiếm là:
- A. Sắp xếp làm tìm kiếm chậm hơn
- B. Hai việc không liên quan
- C. Tìm kiếm giúp sắp xếp nhanh hơn
- D. Sắp xếp giúp cho việc tìm kiếm được thực hiện nhanh hơn ✅
- Giải thích: Sắp xếp giúp cho việc tìm kiếm được thực hiện nhanh hơn.

## 15. Vận dụng — Tra từ điển và tìm sách yêu thích 💡  `van-dung`

**Tự luận 1** — Bài 1: Em tìm một từ tiếng Anh trong quyển từ điển theo cách nào? Tại sao em lại dùng cách đó?
- Hướng trả lời: Mở khoảng giữa quyển từ điển, so sánh từ ở trang đó với từ cần tìm: nếu từ cần tìm đứng trước thì tìm tiếp ở nửa trước, đứng sau thì tìm ở nửa sau; lặp lại đến khi tìm thấy. Dùng cách này vì các từ trong từ điển đã được sắp xếp theo thứ tự bảng chữ cái nên chia đôi sẽ nhanh hơn nhiều so với đọc lần lượt từng từ.

**Tự luận 2** — Bài 2: Viết danh sách sách đã sắp xếp theo tên, các bước lặp tìm kiếm nhị phân cuốn sách em thích nhất và đơn giá của cuốn sách đó.
- Hướng trả lời: Các bước: lập danh sách khoảng 10 cuốn sách và đơn giá → sắp xếp tên sách theo thứ tự bảng chữ cái → chọn cuốn thích nhất → liệt kê các bước lặp (vùng tìm kiếm, vị trí giữa, so sánh) đến khi tìm thấy → ghi ra đơn giá của cuốn sách tìm được.

## 16. Tổng kết  `tong-ket`

**Câu 39** (Vận dụng cao) — Dãy [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]. Tìm số 23 bằng tìm kiếm nhị phân: các vị trí giữa lần lượt được xét là:
- A. 5 → 8 → 6 ✅
- B. 5 → 7 → 6
- C. 1 → 2 → … → 6
- D. 6
- Giải thích: Vùng 1 → 10: vị trí 5 (16), 23 lớn hơn → vùng 6 → 10; vị trí 8 (56), 23 nhỏ hơn → vùng 6 → 7; vị trí 6 (23) → tìm thấy.

**Câu 40** (Thông hiểu) — Vì sao không thể dùng tìm kiếm nhị phân để tìm tên trong danh sách khách hàng ghi theo thứ tự ngày mua hàng?
- A. Vì danh sách quá dài
- B. Vì tên có dấu tiếng Việt
- C. Vì danh sách chưa được sắp xếp theo tên ✅
- D. Vì có số điện thoại
- Giải thích: Tìm kiếm nhị phân chỉ thực hiện được trên danh sách đã được sắp xếp theo giá trị cần tìm (ở đây là tên).

