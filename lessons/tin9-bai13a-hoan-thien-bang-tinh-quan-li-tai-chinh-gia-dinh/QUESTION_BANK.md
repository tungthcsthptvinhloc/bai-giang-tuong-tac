# NGÂN HÀNG CÂU HỎI — TIN 9 BÀI 13a: HOÀN THIỆN BẢNG TÍNH QUẢN LÍ TÀI CHÍNH GIA ĐÌNH

> Sinh từ `data/lesson.js` (nguồn chính). Sửa câu hỏi trong `data/lesson.js`.

## 1. Mở đầu — Chi tiêu hợp lí cho một gia đình 🏠  `mo-dau`

**Câu 1** (Nhận biết) — Việc cân đối thu, chi giúp kiểm soát chi tiêu gia đình là rất quan trọng.
- Đáp án: **Đúng**
- Giải thích: Cân đối thu, chi giúp gia đình không chi vượt thu, có tiền tiết kiệm và kịp thời điều chỉnh các khoản chi.

**Câu 2** (Thông hiểu) — Để cân đối thu, chi, kiểm soát chi tiêu gia đình hiệu quả, ta có thể làm gì? (Chọn tất cả đáp án đúng)
- A. Ghi chép đầy đủ các khoản thu, chi ✅
- B. Chi tiêu theo sở thích, không cần ghi chép
- C. So sánh tổng thu với tổng chi để kịp thời điều chỉnh ✅
- D. Chia tiền theo quy tắc, ví dụ 50-30-20 ✅
- Giải thích: Ghi chép, tổng hợp, so sánh thu – chi và chi tiêu theo quy tắc giúp kiểm soát tài chính.

**Câu 3** (Vận dụng) — Bảng tính đã có trang Thu nhập và Chi tiêu. Để cân đối thu, chi, bảng tính nên bổ sung:
- A. Thêm một trang tính ghi lại danh sách khoản chi
- B. Một trang tính tổng hợp tổng thu, tổng chi, chênh lệch thu – chi và biểu đồ so sánh ✅
- C. Xoá bớt các khoản chi nhỏ
- D. Đổi màu chữ các ô số tiền
- Giải thích: Bài học hôm nay: tạo trang tính Tổng hợp để cân đối thu, chi.

## 2. Hoạt động 1: Tổng hợp dữ liệu tài chính gia đình 📊  `hd1-tong-hop`

**Câu 4** (Thông hiểu) — Câu 1: Mối liên hệ về dữ liệu của trang tính Tổng hợp với hai trang tính Thu nhập và Chi tiêu là:
- A. Không liên quan, trang Tổng hợp nhập số liệu mới
- B. Trang Thu nhập lấy dữ liệu từ trang Tổng hợp
- C. Số tiền thu nhập (17,500) và chi tiêu (13,640) ở trang Tổng hợp được lấy từ ô H7 trang Thu nhập và ô H11 trang Chi tiêu ✅
- D. Trang Tổng hợp chỉ lấy dữ liệu từ trang Chi tiêu
- Giải thích: Dữ liệu trang tính Tổng hợp được lấy từ hai trang tính Thu nhập (H7 = 17,500) và Chi tiêu (H11 = 13,640).

**Câu 5** (Vận dụng) — Câu 2: Công thức để tính tổng thu nhập ở ô B14 của trang Tổng hợp là:
- A. =H7
- B. ='Thu nhập'!H7 ✅
- C. ='Chi tiêu'!H11
- D. =SUM(H2:H6)
- Giải thích: B14 ='Thu nhập'!H7 — lấy giá trị ô H7 của trang tính Thu nhập. Chỉ gõ =H7 thì lấy ô H7 của chính trang Tổng hợp.

**Câu 6** (Vận dụng) — Câu 2: Công thức để tính tổng số tiền chi tiêu ở ô B15 là:
- A. ='Chi tiêu'!H11 ✅
- B. ='Thu nhập'!H11
- C. =B14-H11
- D. ='Chi tiêu'!H7
- Giải thích: B15 ='Chi tiêu'!H11 — tổng chi tiêu ở ô H11 của trang tính Chi tiêu.

## 3. Công thức tham chiếu giữa các trang tính 🔗  `tham-chieu`

**Câu 7** (Nhận biết) — Câu hỏi 2 (SGK tr.53): Địa chỉ ô ở một trang tính khác gồm những thành phần nào? (Chọn tất cả đáp án đúng)
- A. Tên trang tính ✅
- B. Tên tệp bảng tính
- C. Dấu chấm than (!) ✅
- D. Địa chỉ ô ✅
- Giải thích: Địa chỉ ô ở trang tính khác = Tên trang tính + Dấu chấm than + Địa chỉ ô, ví dụ 'Thu nhập'!H7.

**Câu 8** (Thông hiểu) — Khi sửa số tiền trong trang tính Thu nhập, ô B14 ('Thu nhập'!H7) của trang Tổng hợp sẽ:
- A. Giữ nguyên số cũ
- B. Báo lỗi
- C. Được cập nhật tự động ✅
- D. Phải gõ lại công thức
- Giải thích: Công thức tham chiếu giúp tổng số tiền thu nhập trong trang Tổng hợp được cập nhật tự động từ trang Thu nhập.

**Câu 9** (Vận dụng cao) — Nếu xoá trang tính Thu nhập khỏi bảng tính, ô B14 (='Thu nhập'!H7) của trang Tổng hợp sẽ hiện:
- A. 17,500
- B. 0
- C. Ô trống
- D. #REF! — lỗi tham chiếu vì trang tính được tham chiếu không còn ✅
- Giải thích: Trang tính nguồn bị xoá → công thức thành ='#REF!'!H7 và hiện lỗi #REF!. Không xoá trang tính đang được tham chiếu.

## 4. Câu hỏi 1 (SGK tr.53): Ghép thành phần công thức Hình 13a.4 🧩  `ghep-hinh-13a-4`

**Ghép đôi** — Hình 13a.4 là công thức ='Thu nhập'!H7. Ghép mỗi vị trí (1), (2), (3) với cụm từ Địa chỉ ô, Tên trang tính, Dấu chấm than sao cho phù hợp. Làm hết rồi bấm Nộp bài.

- (1) 'Thu nhập' ⟶ Tên trang tính
- (2) ! ⟶ Dấu chấm than
- (3) H7 ⟶ Địa chỉ ô

## 5. Giá trị NET và biểu đồ cân đối thu chi 💹  `gia-tri-net`

**Câu 10** (Vận dụng) — Giá trị NET trong trang tính Tổng hợp (Hình 13a.3) bằng bao nhiêu?
- A. 31,140
- B. 13,640
- C. 3,860 ✅
- D. 17,500
- Giải thích: NET = Thu nhập − Chi tiêu = 17,500 − 13,640 = 3,860 (nghìn đồng).

**Câu 11** (Thông hiểu) — Công thức tại ô B16 (Giá trị NET) là:
- A. =B15-B14
- B. =B14-B15 ✅
- C. =B14+B15
- D. =SUM(B14:B15)
- Giải thích: NET = thu − chi → =B14-B15. Viết =B15-B14 sẽ ra số âm −3,860.

**Câu 12** (Thông hiểu) — Giá trị NET nhỏ (gần 0) cho thấy điều gì?
- A. Gia đình đang chi tiêu nhiều, cần báo động để các thành viên thực hiện tiết kiệm ✅
- B. Gia đình có rất nhiều tiền tiết kiệm
- C. Bảng tính bị lỗi công thức
- D. Thu nhập tăng lên
- Giải thích: SGK: Giá trị NET nhỏ cho thấy gia đình đang chi tiêu nhiều, cần được báo động để tất cả các thành viên thực hiện tiết kiệm.

## 6. Thí nghiệm: Trang Tổng hợp tự cập nhật ⚡  `thi-nghiem`

**Câu 13** (Vận dụng) — Tăng Tiền ăn tháng 8 từ 8,000 lên 12,000 (các số khác giữ nguyên). Giá trị NET mới là:
- A. 3,860
- B. −140 ✅
- C. 7,860
- D. 17,640
- Giải thích: Chi tiêu = 13,640 + 4,000 = 17,640 → NET = 17,500 − 17,640 = −140: chi nhiều hơn thu, cần báo động tiết kiệm.

**Câu 14** (Thông hiểu) — Khi sửa số liệu ở trang Chi tiêu, em có phải sửa lại công thức ở ô B15 của trang Tổng hợp không?
- A. Có, phải gõ lại số mới
- B. Có, phải đổi thành ='Chi tiêu'!H12
- C. Không, B15 tự cập nhật vì lấy giá trị từ ô H11 của trang Chi tiêu ✅
- D. Không, vì B15 không liên quan đến trang Chi tiêu
- Giải thích: Công thức tham chiếu ='Chi tiêu'!H11 tự lấy giá trị mới nhất của ô H11.

**Câu 15** (Vận dụng) — Trên biểu đồ, cột Chi tiêu cao hơn cột Thu nhập cho biết:
- A. Gia đình đang tiết kiệm tốt
- B. Giá trị NET âm — chi tiêu vượt thu nhập ✅
- C. Biểu đồ vẽ sai
- D. Thu nhập tăng
- Giải thích: Biểu đồ giúp so sánh trực quan: chi > thu → NET âm → cần điều chỉnh chi tiêu.

## 7. Trò chơi: Thám tử săn lỗi công thức 🔍  `san-loi`

**Câu 16** (Thông hiểu) — Hộp 1 — ô B14 nhập: =Thu nhập!H7. Lỗi ở đâu?
- A. Sai địa chỉ ô
- B. Thiếu dấu chấm than
- C. Tên trang tính có dấu cách nhưng thiếu cặp dấu nháy đơn: ='Thu nhập'!H7 ✅
- D. Không có lỗi
- Giải thích: Tên trang tính có dấu cách (Thu nhập) phải đặt trong cặp dấu nháy đơn: ='Thu nhập'!H7.

**Câu 17** (Thông hiểu) — Hộp 2 — ô B14 nhập: ='Thu nhập'H7. Lỗi ở đâu?
- A. Thiếu dấu chấm than giữa tên trang tính và địa chỉ ô ✅
- B. Thừa dấu nháy đơn
- C. Sai tên trang tính
- D. Phải dùng hàm SUM
- Giải thích: Đúng là ='Thu nhập'!H7 — dấu ! ngăn cách tên trang tính và địa chỉ ô.

**Câu 18** (Vận dụng) — Hộp 3 — ô B14 nhập: ='Thu nhập'!H11 và hiện 0. Lỗi ở đâu?
- A. Thiếu dấu nháy đơn
- B. Sai địa chỉ ô: tổng thu nhập nằm ở ô H7 của trang Thu nhập ✅
- C. Sai tên trang tính
- D. Trang Thu nhập bị xoá
- Giải thích: Ô H11 của trang Thu nhập trống nên B14 = 0. Tổng thu ở H7 (còn H11 là tổng chi của trang Chi tiêu).

**Câu 19** (Thông hiểu) — Hộp 4 — ô B15 nhập: ='Chi tieu'!H11. Lỗi ở đâu?
- A. Thiếu dấu chấm than
- B. Sai địa chỉ ô
- C. Không có lỗi
- D. Tên trang tính viết không đúng (trang tên là Chi tiêu, có dấu) ✅
- Giải thích: Tên trang tính trong công thức phải viết đúng như tên trên thanh trang tính: 'Chi tiêu'.

**Câu 20** (Vận dụng) — Hộp 5 — ô B16 nhập: =B15-B14 và hiện −3,860. Lỗi ở đâu?
- A. Đảo thứ tự: Giá trị NET = thu − chi, phải là =B14-B15 ✅
- B. Phải dùng =SUM(B14:B15)
- C. Thiếu tên trang tính
- D. Không có lỗi
- Giải thích: NET = Thu nhập − Chi tiêu = B14 − B15 = 3,860.

**Câu 21** (Vận dụng cao) — Hộp 6 — ô H7 của trang Thu nhập nhập: =SUM(H2:H7). Lỗi ở đâu?
- A. Thiếu dấu $
- B. Phải dùng hàm COUNTIF
- C. Vùng cộng chứa chính ô H7 (tham chiếu vòng); đúng là =SUM(H2:H6) ✅
- D. Không có lỗi
- Giải thích: Công thức ở H7 không được cộng cả ô H7 — Excel cảnh báo tham chiếu vòng. SGK: =SUM(H2:H6).

## 8. Thực hành a) Tính tổng số tiền trang Thu nhập và Chi tiêu ➕  `thuc-hanh-a`

**Câu 22** (Nhận biết) — Tại ô H7 của trang Thu nhập, công thức tính tổng số tiền thu nhập là:
- A. =SUM(H2:H6) ✅
- B. =SUM(D3:D8)+H7
- C. =SUM(G2:G6)
- D. =COUNTIF(H2:H6)
- Giải thích: H7 =SUM(H2:H6) = 10,000 + 3,000 + 3,500 + 500 + 500 = 17,500.

**Câu 23** (Nhận biết) — Tại ô H11 của trang Chi tiêu, công thức tính tổng số tiền đã chi tiêu là:
- A. =SUM(G2:G10)
- B. =SUM(H2:H11)
- C. =SUM(H2:H10) ✅
- D. =H2+H10
- Giải thích: H11 =SUM(H2:H10) = 13,640 (9 khoản chi ở hàng 2 đến 10).

**Câu 24** (Thông hiểu) — Ô G7 của trang Thu nhập hiện 6. Con số này cho biết gì?
- A. Tổng thu nhập là 6 triệu
- B. Có 6 khoản mục thu
- C. Tổng số lần thu trong tháng là 6 ✅
- D. Tháng 6
- Giải thích: Cột G là Số lần thu (COUNTIF, Bài 10a); tổng G2:G6 = 6 lần thu — khớp 6 hàng dữ liệu ở A3:D8.

## 9. Thực hành b) Tạo trang tính Tổng hợp 📑  `thuc-hanh-b`

**Câu 25** (Nhận biết) — Ô A1 của trang tính Tổng hợp được nhập tiêu đề là:
- A. Tổng hợp
- B. Thu nhập
- C. Giá trị NET
- D. Cân đối thu chi ✅
- Giải thích: Tại ô A1, nhập tiêu đề bảng tính là Cân đối thu chi (tên trang tính là Tổng hợp).

**Câu 26** (Thông hiểu) — Sắp xếp đúng nội dung các ô trong bảng A13:B16:
- A. A13 Nội dung, B13 Số tiền (nghìn đồng); A14 Thu nhập; A15 Chi tiêu; A16 Giá trị NET ✅
- B. A13 Thu nhập; A14 Chi tiêu; A15 Giá trị NET; A16 Nội dung
- C. A13 Giá trị NET; A14 Thu nhập; A15 Chi tiêu; A16 Tổng
- D. A13 Chi tiêu; A14 Thu nhập; A15 Nội dung; A16 Giá trị NET
- Giải thích: Hàng 13 là tiêu đề (Nội dung, Số tiền); hàng 14 Thu nhập, 15 Chi tiêu, 16 Giá trị NET (Hình 13a.3).

**Câu 27** (Vận dụng) — Vì sao ở B14 nên dùng ='Thu nhập'!H7 mà KHÔNG gõ trực tiếp số 17500?
- A. Vì gõ số nhanh hơn
- B. Vì công thức tham chiếu tự cập nhật khi dữ liệu thu nhập thay đổi; gõ số thì phải sửa tay mỗi lần ✅
- C. Vì Excel không cho gõ số vào B14
- D. Vì 17500 là số sai
- Giải thích: Tham chiếu giữa các trang tính giúp trang Tổng hợp luôn chính xác khi dữ liệu nguồn thay đổi.

## 10. Thực hành b) Tạo biểu đồ cột Thu nhập – Chi tiêu 📶  `bieu-do`

**Câu 28** (Nhận biết) — Vùng dữ liệu chọn để tạo biểu đồ là:
- A. A13:B16
- B. A2:B12
- C. A13:B15 ✅
- D. B14:B16
- Giải thích: Chọn A13:B15 (tiêu đề, Thu nhập, Chi tiêu). Không chọn hàng 16 vì biểu đồ chỉ so sánh thu và chi.

**Câu 29** (Nhận biết) — Dạng biểu đồ được chọn trong nhóm lệnh Charts của dải lệnh Insert là:
- A. Pie (biểu đồ tròn)
- B. Clustered Column (cột nhóm) ✅
- C. Line (đường)
- D. 3-D Bar
- Giải thích: SGK chọn Clustered Column (2-D Column) để so sánh hai giá trị thu và chi.

**Câu 30** (Thông hiểu) — Biểu đồ được đặt vào vị trí nào của trang Tổng hợp?
- A. A13:B16
- B. D1:H10
- C. A1
- D. A2:B12 ✅
- Giải thích: Đặt biểu đồ vào vùng A2:B12 — phía trên bảng dữ liệu (Hình 13a.3).

## 11. Sắp xếp các bước tạo biểu đồ 🔢  `cac-buoc-bieu-do`

**Sắp xếp** — Sắp xếp các bước tạo biểu đồ cột hiển thị trực quan giá trị thu và chi (SGK tr.54) rồi bấm Nộp bài.

1. Chọn vùng dữ liệu tạo biểu đồ A13:B15
2. Trong dải lệnh Insert, chọn nhóm lệnh Charts
3. Chọn dạng biểu đồ Clustered Column
4. Đặt biểu đồ vào vị trí A2:B12
5. Chỉnh sửa thông tin hiển thị trên biểu đồ như Hình 13a.3
6. Lưu tệp

## 12. Luyện tập — Trò chơi “Chăm sóc cây xanh” 🌳  `luyen-tap`

**Câu 31** (Nhận biết) — Câu 1. Để hạn chế loại dữ liệu hoặc giá trị của dữ liệu khi nhập vào ô tính, em sử dụng công cụ xác thực dữ liệu nào sau đây?
- A. Data > Advanced
- B. Data > Data Validation ✅
- C. Data > Validation
- D. Data > Flash Fill
- Giải thích: Công cụ xác thực dữ liệu: Data > Data Validation (Bài 9a).

**Câu 32** (Thông hiểu) — Câu 2. Nếu muốn đếm số lượng ô trong phạm vi A1:A10 có giá trị lớn hơn 50, em sẽ sử dụng cú pháp nào?
- A. COUNTIF(A1:A10, ">50") ✅
- B. COUNTIF(A1:A10, "<50")
- C. COUNTIF(A1:A10, "=50")
- D. COUNTIF(A1:A10, ">=50")
- Giải thích: “Lớn hơn 50” là ">50".

**Câu 33** (Nhận biết) — Câu 3. Hàm COUNTIF được sử dụng để làm gì?
- A. Tính tổng các giá trị trong một dãy số
- B. Đếm tổng số dòng trong một phạm vi
- C. Đếm số lượng các ô thoả mãn một điều kiện cụ thể ✅
- D. Hiển thị số trung bình của một dãy số
- Giải thích: COUNTIF đếm số ô thoả mãn một điều kiện (Bài 10a).

**Câu 34** (Vận dụng) — Câu 4. Nếu tính tổng các ô trong phạm vi B1:B10 thoả mãn điều kiện “bắt đầu bằng A”, em sẽ sử dụng cú pháp nào?
- A. =SUMIF(B1:B10, "*A")
- B. =SUMIF(B1:B10, "*A*")
- C. =SUMIF(B1:B10, "=A")
- D. =SUMIF(B1:B10, "A*") ✅
- Giải thích: Kí tự đại diện * thay cho dãy kí tự bất kì: "A*" là bắt đầu bằng A.

**Câu 35** (Thông hiểu) — Câu 5. Trong hàm SUMIF, tham số range đại diện cho điều gì?
- A. Phạm vi dữ liệu cần tính tổng ✅
- B. Điều kiện cần kiểm tra
- C. Kết quả tổng cộng
- D. Dãy số cần sắp xếp
- Giải thích: range là phạm vi dữ liệu mà hàm SUMIF xét; khi không có sum_range, các ô thoả mãn điều kiện trong range được cộng lại.

**Câu 36** (Thông hiểu) — Câu 6. Trong hàm IF, nếu em muốn kiểm tra điều kiện “A không bằng B”, em sẽ sử dụng dấu gì?
- A. =
- B. <> ✅
- C. <
- D. >
- Giải thích: <> là “khác” (không bằng), ví dụ =IF(A1<>B1,"Khác","Bằng").

**Câu 37** (Thông hiểu) — Câu 7. Hàm IF không thể sử dụng với kiểu dữ liệu nào sau đây?
- A. Số
- B. Văn bản
- C. Ngày tháng
- D. Hình ảnh ✅
- Giải thích: Hàm IF so sánh, trả về dữ liệu số, văn bản, ngày tháng; không xử lí hình ảnh.

## 13. Vận dụng: Bổ sung dữ liệu, cập nhật trang Tổng hợp 🔄  `van-dung`

**Câu 38** (Vận dụng) — Trang Thu nhập thêm 2 dòng dữ liệu ở hàng 9, 10. Công thức SUMIF ở H2:H6 (Bài 11a) cần sửa thế nào?
- A. Không cần sửa
- B. Chỉ sửa ô H7
- C. Sửa cả range và sum_range đến hàng 10: =SUMIF($B$3:$B$10,F2,$D$3:$D$10) ✅
- D. Xoá cột H và nhập lại số
- Giải thích: Vùng dữ liệu mới đến hàng 10 → sửa $B$3:$B$8, $D$3:$D$8 thành $B$3:$B$10, $D$3:$D$10 rồi sao chép xuống H6. H7 =SUM(H2:H6) giữ nguyên.

**Câu 39** (Vận dụng) — Sau khi bổ sung dữ liệu và sửa công thức, ô B14 (Thu nhập) ở trang Tổng hợp hiện:
- A. 17,500
- B. 19,300 ✅
- C. 18,500
- D. 1,800
- Giải thích: 17,500 + 1,000 + 800 = 19,300 — B14 ='Thu nhập'!H7 tự cập nhật, không cần sửa.

**Câu 40** (Vận dụng cao) — Chi tiêu thêm 300 + 150 + 80 = 530. Giá trị NET mới ở ô B16 là:
- A. 3,860
- B. 4,330
- C. 5,130 ✅
- D. 3,330
- Giải thích: Thu 19,300 − Chi (13,640 + 530 = 14,170) = 5,130 (nghìn đồng).

**Câu 41** (Thông hiểu) — Khi bổ sung dữ liệu, các công thức ở trang Tổng hợp (B14, B15, B16):
- A. Phải gõ lại toàn bộ
- B. Chỉ B16 phải sửa
- C. Không cần sửa — tự cập nhật từ H7, H11 của hai trang nguồn ✅
- D. Phải đổi sang địa chỉ tuyệt đối
- Giải thích: Chỉ cần sửa công thức ở hai trang nguồn cho đúng vùng dữ liệu mới; trang Tổng hợp tự cập nhật.

## 14. Vận dụng — Đánh giá tình hình tài chính gia đình 📝  `van-dung-nha`

**Tự luận 1** — Từ Giá trị NET trên trang tính Tổng hợp, em hãy đánh giá tình hình tài chính hiện tại của gia đình và đề xuất những điều chỉnh chi tiêu sao cho phù hợp.
- Hướng trả lời: Ví dụ: NET = 3,860 > 0 → thu lớn hơn chi, gia đình có dư. Tuy nhiên chi cho Nhu cầu thiết yếu rất cao (Ăn 8,000; Bài 12a: 90.5%), tiết kiệm mới 1,000 (7.3%). Đề xuất: giảm hợp lí tiền ăn, điện nước; chuyển một phần NET vào tiết kiệm; theo dõi trang Tổng hợp hằng tháng, khi NET nhỏ thì báo động cả nhà tiết kiệm.

## 15. Tổng kết  `tong-ket`

**Câu 42** (Vận dụng) — Trang tính tên Kinh phí có tổng thu ở ô C20. Công thức lấy giá trị này sang trang khác là:
- A. =Kinh phí!C20
- B. ='Kinh phí'!C20 ✅
- C. ='Kinh phí'C20
- D. =C20!'Kinh phí'
- Giải thích: Tên trang tính có dấu cách đặt trong dấu nháy đơn, tiếp theo là dấu ! và địa chỉ ô.

**Câu 43** (Vận dụng cao) — Tổng thu 20,000; tổng chi 21,500. Giá trị NET và nhận xét đúng là:
- A. 1,500 — gia đình dư tiền
- B. 41,500 — chi tiêu hợp lí
- C. −1,500 — chi vượt thu, cần điều chỉnh chi tiêu ✅
- D. 0 — cân bằng
- Giải thích: NET = 20,000 − 21,500 = −1,500 < 0: chi nhiều hơn thu, cả nhà cần tiết kiệm.

