# NGÂN HÀNG CÂU HỎI — TIN 8 BÀI 6: SẮP XẾP VÀ LỌC DỮ LIỆU

> Sinh từ `data/lesson.js` (nguồn chính). Sửa câu hỏi trong `data/lesson.js`.

## 1. Mở đầu — Dự án thành lập CLB Tin học 🏆  `mo-dau`

## 2. Khảo sát nhanh cả lớp 📊  `khao-sat-lop`

**Khảo sát nhanh (bình chọn, không chấm điểm)** — Bạn mong muốn tìm hiểu thêm nội dung nào của môn Tin học? (Chọn một nội dung)

1. Ngôn ngữ lập trình
2. Mạng máy tính
3. Đồ hoạ máy tính
4. Bảng tính điện tử
5. Soạn thảo văn bản
6. Phần mềm trình chiếu

## 3. Hoạt động 1: Phiếu khảo sát 📝  `hd1-phieu-khao-sat`

**Câu 1** (Thông hiểu) — Bảng tính lưu kết quả khảo sát gồm những cột nào? (Chọn tất cả ý đúng)
- A. TT ✅
- B. Họ đệm ✅
- C. Tên ✅
- D. Tổ ✅
- E. Nội dung ✅
- F. Điểm trung bình môn
- Giải thích: Tiêu đề các cột: TT (theo dõi số phiếu), Họ đệm, Tên (tách từ Họ và tên), Tổ, Nội dung. Phiếu khảo sát không hỏi điểm trung bình.

**Câu 2** (Nhận biết) — Mỗi hàng của bảng lưu trữ dữ liệu gì?
- A. Tất cả nội dung Tin học
- B. Kết quả trả lời của một phiếu khảo sát (một học sinh) ✅
- C. Danh sách một tổ
- D. Tên các cột
- Giải thích: Mỗi phiếu khảo sát được trả lời là một hàng dữ liệu được lưu trong bảng tính.

**Câu 3** (Thông hiểu) — Vì sao nên tách Họ và tên thành hai cột Họ đệm và Tên?
- A. Để bảng tính có nhiều cột hơn
- B. Để tiết kiệm bộ nhớ
- C. Để dễ quan sát tên học sinh và sắp xếp theo Tên ✅
- D. Vì phần mềm không cho gõ họ tên đầy đủ
- Giải thích: Tách Họ đệm và Tên giúp dễ quan sát tên và sắp xếp danh sách theo thứ tự bảng chữ cái của Tên.

## 4. 1. Bảng tính trợ giúp giải quyết bài toán thực tế 🔍  `hd21-bai-toan`

**Câu 4** (Nhận biết) — 1) Họ tên học sinh trong Hình 6.2 đang được sắp xếp như thế nào?
- A. Theo thứ tự bảng chữ cái của Tên
- B. Theo thứ tự bảng chữ cái của Họ đệm
- C. Theo Tổ
- D. Chưa sắp xếp (theo thứ tự thu phiếu) — nên sắp xếp theo bảng chữ cái để dễ tìm ✅
- Giải thích: Danh sách đang theo thứ tự phiếu thu được (TT 1–10), chưa theo bảng chữ cái → cần sắp xếp để dễ tìm kiếm.

**Câu 5** (Thông hiểu) — 3) Nội dung Tin học nào có nhiều học sinh lựa chọn nhất?
- A. Ngôn ngữ lập trình (An, Châu, Trang, Toàn) ✅
- B. Đồ hoạ máy tính (Trang, Linh)
- C. Mạng máy tính (An)
- D. Bảng tính điện tử (Giang)
- Giải thích: Ngôn ngữ lập trình có 4 HS: Vũ Thị Minh An, Trần Minh Châu, Đặng Mai Trang, Phùng Khánh Toàn.

**Câu 6** (Thông hiểu) — 4) Các bạn chọn nội dung Đồ hoạ máy tính thuộc những tổ nào?
- A. Tổ 1 và tổ 2
- B. Chỉ tổ 3
- C. Tổ 1 và tổ 3 ✅
- D. Cả ba tổ
- Giải thích: Ngô Hà Trang (tổ 1) và Phạm Ngọc Linh (tổ 3).

**Câu 7** (Vận dụng) — Câu hỏi SGK tr.28 — Tiêu chí sắp xếp danh sách học sinh theo thứ tự của bảng chữ cái trong Hình 6.2 là gì?
- A. Sắp xếp theo cột TT
- B. Sắp xếp theo cột Tên; nếu trùng Tên thì sắp xếp theo cột Họ đệm ✅
- C. Sắp xếp theo cột Nội dung
- D. Sắp xếp theo cột Tổ
- Giải thích: Người Việt thường được gọi theo Tên nên sắp xếp theo Tên trước; các bạn trùng Tên (An, Trang) được sắp tiếp theo Họ đệm.

## 5. Trò chơi: Sắp xếp hay Lọc? 🧩  `sap-xep-hay-loc`

**Phân loại** — Xếp mỗi tình huống vào chức năng phù hợp nhất. Xếp hết rồi bấm Nộp bài.

- **🔤 Cần SẮP XẾP dữ liệu:** Xếp danh sách lớp theo thứ tự bảng chữ cái của Tên để dễ điểm danh · Xếp bảng điểm từ cao xuống thấp để tìm bạn đứng đầu lớp · Xếp các lớp theo số HS “Không sử dụng” thiết bị số giảm dần · Xếp danh sách theo Tổ, cùng tổ thì theo Tên
- **🔍 Cần LỌC dữ liệu:** Chỉ hiện các bạn muốn tìm hiểu Ngôn ngữ lập trình · Chỉ hiện các bạn Tổ 1 muốn tìm hiểu Đồ hoạ máy tính · Chỉ hiện các lớp không có HS dùng thiết bị số từ 5 giờ trở lên · Chỉ hiện các mặt hàng có giá từ 100 000 đồng trở lên

## 6. 2. Thực hành: Sắp xếp dữ liệu theo một tiêu chí 🔤  `th-sap-xep-mot`

**Câu 8** (Nhận biết) — Trong hộp thoại Sort, chọn ô My data has headers để làm gì?
- A. Để thêm tiêu chí sắp xếp
- B. Để không sắp xếp dòng tiêu đề của bảng ✅
- C. Để sắp xếp từ Z đến A
- D. Để xoá dòng tiêu đề
- Giải thích: My data has headers: hàng đầu vùng chọn là hàng tiêu đề, không tham gia sắp xếp.

**Câu 9** (Nhận biết) — Để sắp xếp theo thứ tự bảng chữ cái (tăng dần), ở mục Order em chọn:
- A. Z to A
- B. Cell Values
- C. Largest to Smallest
- D. A to Z ✅
- Giải thích: A to Z: thứ tự bảng chữ cái tăng dần; Z to A: giảm dần.

**Câu 10** (Thông hiểu) — Sau khi sắp xếp chỉ theo Tên (Hình 6.4), hai bạn tên Trang được xếp thế nào?
- A. Ngô Hà Trang đứng trước Đặng Mai Trang — chưa đúng thứ tự Họ đệm (Đ đứng trước N) ✅
- B. Đặng Mai Trang đứng trước Ngô Hà Trang
- C. Hai bạn bị xoá khỏi bảng
- D. Hai bạn được gộp thành một hàng
- Giải thích: Chỉ có một tiêu chí (Tên) nên hai bạn trùng tên giữ thứ tự cũ; cần thêm tiêu chí thứ hai là Họ đệm.

## 7. Thực hành: Sắp xếp theo nhiều tiêu chí ➕  `th-sap-xep-nhieu`

**Câu 11** (Nhận biết) — Để thêm tiêu chí sắp xếp thứ hai (Then by) trong hộp thoại Sort, em chọn nút lệnh nào?
- A. Delete Level
- B. Copy Level
- C. Add Level ✅
- D. Options…
- Giải thích: Add Level thêm một tiêu chí sắp xếp; Delete Level xoá tiêu chí.

**Câu 12** (Vận dụng) — Câu hỏi SGK tr.30 — Có thể sắp xếp bảng Hình 6.2 theo Tổ, nếu cùng tổ sắp xếp theo Tên, nếu cùng tên sắp xếp theo Họ đệm được không?
- A. Không, chỉ sắp xếp được theo một tiêu chí
- B. Chỉ được tối đa hai tiêu chí
- C. Được, nhưng phải sắp xếp bằng tay
- D. Được: Sort by Tổ, Then by Tên, Then by Họ đệm (dùng Add Level hai lần) ✅
- Giải thích: Hộp thoại Sort cho phép thêm nhiều tiêu chí bằng Add Level: Tổ → Tên → Họ đệm.

**Câu 13** (Vận dụng cao) — Sau khi sắp xếp theo Tổ → Tên → Họ đệm (tất cả A to Z), bạn nào đứng ĐẦU danh sách?
- A. Phạm Hoàng Bảo An (tổ 1) ✅
- B. Vũ Thị Minh An (tổ 3)
- C. Đỗ Minh Giang (tổ 2)
- D. Đặng Mai Trang (tổ 1)
- Giải thích: Tổ 1 đứng đầu; trong tổ 1 (An, Trang, Trang, Toàn) tên An đứng đầu → Phạm Hoàng Bảo An.

## 8. Trò chơi: Sắp xếp các bước Sort 🔢  `cac-buoc-sap-xep`

**Sắp xếp** — Sắp xếp các bước sắp xếp bảng khảo sát theo Tên, cùng tên theo Họ đệm cho đúng thứ tự rồi bấm Nộp bài.

1. Chọn vùng dữ liệu cần sắp xếp A2:E12
2. Thẻ Data › nhóm Sort & Filter › chọn lệnh Sort
3. Chọn ô My data has headers
4. Sort by: chọn cột Tên, Order: A to Z
5. Chọn Add Level, Then by: chọn cột Họ đệm, A to Z
6. Chọn OK để hoàn thành việc sắp xếp

## 9. 3. Thực hành: Lọc dữ liệu 🔍  `th-loc`

**Câu 14** (Nhận biết) — Sau khi lọc, những hàng không thoả mãn điều kiện lọc sẽ:
- A. Bị xoá vĩnh viễn
- B. Được tô màu đỏ
- C. Bị ẩn đi ✅
- D. Được chuyển xuống cuối bảng
- Giải thích: Dữ liệu không đúng với điều kiện lọc sẽ bị ẩn đi (không bị xoá); bỏ lọc thì hiện lại.

**Câu 15** (Nhận biết) — Lệnh Filter nằm ở đâu?
- A. Thẻ Home, nhóm Font
- B. Thẻ Data, nhóm Sort & Filter ✅
- C. Thẻ Insert, nhóm Tables
- D. Thẻ View, nhóm Window
- Giải thích: Thẻ Data › nhóm Sort & Filter › lệnh Filter (cùng nhóm với lệnh Sort).

**Câu 16** (Nhận biết) — Để bỏ lọc và hiện lại toàn bộ danh sách, em làm thế nào?
- A. Chọn (Select All) trong danh sách lọc của cột đang lọc ✅
- B. Xoá cột Nội dung
- C. Tắt máy tính
- D. Chọn Sort A to Z
- Giải thích: Bước 4: để bỏ lọc dữ liệu, chọn Select All (ở từng cột đã lọc).

## 10. Trò chơi: Dự đoán kết quả lọc 🔮  `du-doan-loc`

**Câu 17** (Thông hiểu) — Lọc cột Nội dung = “Ngôn ngữ lập trình”. Những bạn nào còn hiện?
- A. Vũ Thị Minh An ✅
- B. Trần Minh Châu ✅
- C. Ngô Hà Trang
- D. Đặng Mai Trang ✅
- E. Phùng Khánh Toàn ✅
- F. Phạm Ngọc Linh
- Giải thích: 4 bạn chọn Ngôn ngữ lập trình: Vũ Thị Minh An, Trần Minh Châu, Đặng Mai Trang, Phùng Khánh Toàn (Hình 6.8).

**Câu 18** (Thông hiểu) — Lọc cột Tổ = 2. Những bạn nào còn hiện?
- A. Trương Thanh Hà ✅
- B. Phạm Hoàng Bảo An
- C. Đỗ Minh Giang ✅
- D. Dương Gia Khánh
- E. Trần Minh Châu ✅
- F. Phùng Khánh Toàn
- Giải thích: Tổ 2: Trương Thanh Hà, Đỗ Minh Giang, Trần Minh Châu.

**Câu 19** (Vận dụng) — Nhiệm vụ 2 — Lọc Nội dung = “Đồ hoạ máy tính” VÀ Tổ = 1. Những bạn nào còn hiện?
- A. Phạm Ngọc Linh
- B. Ngô Hà Trang ✅
- C. Đặng Mai Trang
- D. Phạm Hoàng Bảo An
- E. Phùng Khánh Toàn
- F. Dương Gia Khánh
- Giải thích: Đồ hoạ máy tính có Ngô Hà Trang (tổ 1) và Phạm Ngọc Linh (tổ 3); thêm điều kiện Tổ 1 chỉ còn Ngô Hà Trang.

## 11. Trò chơi: Sắp xếp các bước lọc dữ liệu 🔢  `cac-buoc-loc`

**Sắp xếp** — Sắp xếp các bước lọc danh sách HS muốn tìm hiểu Ngôn ngữ lập trình cho đúng thứ tự rồi bấm Nộp bài.

1. Chọn vùng dữ liệu cần lọc A2:E12
2. Thẻ Data › nhóm Sort & Filter › chọn lệnh Filter
3. Nháy nút lọc ▼ ở ô tiêu đề cột Nội dung
4. Nháy (Select All) để bỏ chọn tất cả
5. Chọn Ngôn ngữ lập trình rồi chọn OK
6. Xem kết quả xong, chọn Select All để bỏ lọc

## 12. Luyện tập: Thời gian sử dụng thiết bị số 📱  `luyen-tap`

**Câu 20** (Thông hiểu) — b) Sau khi sắp xếp giảm dần theo cột Không sử dụng, lớp nào đứng đầu bảng?
- A. 8A1
- B. 8A10
- C. 8A7
- D. 8A8 ✅
- Giải thích: 8A8 có 9 HS không sử dụng — nhiều nhất. Để sắp giảm dần chọn Order: Largest to Smallest.

**Câu 21** (Vận dụng) — c) Sau khi sắp xếp giảm dần theo Không sử dụng, bằng nhau thì giảm dần theo Dưới 1 giờ, ba lớp đứng ngay sau 8A8 lần lượt là:
- A. 8A5, 8A4, 8A1
- B. 8A1, 8A4, 8A5 ✅
- C. 8A4, 8A1, 8A5
- D. 8A2, 8A6, 8A1
- Giải thích: Ba lớp cùng 8 HS không sử dụng: 8A1 (12), 8A4 (11), 8A5 (10) — xếp giảm dần theo Dưới 1 giờ.

**Câu 22** (Vận dụng) — d) Lọc các lớp KHÔNG có HS sử dụng thiết bị số từ 5 giờ trở lên (ô cột G để trống). Những lớp nào còn hiện?
- A. 8A1
- B. 8A2 ✅
- C. 8A5 ✅
- D. 8A6 ✅
- E. 8A7 ✅
- F. 8A9
- Giải thích: Cột Từ 5 giờ trở lên để trống ở 8A2, 8A5, 8A6, 8A7, 8A8. Trong bộ lọc cột G chỉ chọn (Blanks).

## 13. Vận dụng: Number Filters 🔢  `van-dung`

**Câu 23** (Vận dụng) — Kết quả lọc cột 3-4 giờ lớn hơn hoặc bằng 10 (Hình 6.9) còn lại lớp nào?
- A. 8A4
- B. 8A7
- C. 8A5 ✅
- D. 8A1
- Giải thích: Chỉ lớp 8A5 có 11 HS dùng thiết bị số 3-4 giờ (≥ 10); các lớp khác đều dưới 10.

**Câu 24** (Vận dụng cao) — Trong Number Filters, điều kiện “lớn hơn hoặc bằng” là tuỳ chọn nào?
- A. Greater Than
- B. Less Than Or Equal To
- C. Greater Than Or Equal To ✅
- D. Equals
- Giải thích: Greater Than Or Equal To = lớn hơn hoặc bằng (≥). Greater Than = lớn hơn (>).

## 14. Tổng kết  `tong-ket`

**Câu 25** (Vận dụng cao) — Thầy chủ nhiệm muốn in danh sách chỉ gồm các bạn tổ 3, xếp theo thứ tự bảng chữ cái của Tên. Em cần dùng:
- A. Chỉ sắp xếp theo Tổ
- B. Lọc Tổ = 3 và sắp xếp theo Tên (A to Z) ✅
- C. Chỉ lọc theo Nội dung
- D. Xoá các bạn tổ 1, tổ 2
- Giải thích: Lọc để chỉ hiện tổ 3 (không xoá dữ liệu), sắp xếp theo Tên để đúng thứ tự bảng chữ cái.

**Câu 26** (Thông hiểu) — Phát biểu nào đúng về chức năng lọc dữ liệu?
- A. Lọc làm thay đổi thứ tự các hàng
- B. Lọc xoá vĩnh viễn các hàng không thoả mãn
- C. Lọc chỉ dùng được cho cột chứa số
- D. Lọc chỉ hiển thị các hàng thoả mãn điều kiện, các hàng khác bị ẩn đi ✅
- Giải thích: Lọc chọn và chỉ hiển thị các dòng thoả mãn điều kiện; dữ liệu khác bị ẩn, bỏ lọc sẽ hiện lại.

