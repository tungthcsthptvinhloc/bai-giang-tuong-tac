# NGÂN HÀNG CÂU HỎI — TIN 7 BÀI 9: TRÌNH BÀY BẢNG TÍNH

> Sinh từ `data/lesson.js` (nguồn chính). Sửa câu hỏi trong `data/lesson.js`.

## 1. Khởi động — Bảng tính này cần “trang điểm” không? 🤔  `mo-dau`

**Câu 1** (Nhận biết) — Bấm vào ô có con số khó đọc nhất trong bảng.
- Đáp án: **M5**
- Giải thích: Ô M5 = 11.66666667 có quá nhiều chữ số thập phân, khó đọc và khó so sánh với các ô khác trong cột Trung bình.

**Câu 2** (Thông hiểu) — Bảng tính ở Hình 9.1 cần chỉnh sửa những gì? (Chọn tất cả đáp án đúng)
- A. Làm tròn số thập phân ở cột Trung bình ✅
- B. Phân tách hàng nghìn, hàng triệu ở cột Chi phí ✅
- C. Xoá bớt các lớp cho bảng gọn
- D. Kẻ khung, làm nổi bật hàng tiêu đề ✅
- E. Sửa lại số liệu cho tròn đẹp
- Giải thích: Chỉ cần thay đổi cách hiển thị và trình bày (định dạng số, kẻ khung, tô nền…). Không được xoá hay sửa số liệu vì sẽ làm sai dữ liệu của dự án.

## 2. Định dạng dữ liệu số — cửa sổ Format Cells 🔢  `dinh-dang-so`

**Câu 3** (Thông hiểu) — Hoạt động 1, câu 1: Cột Trung bình (14; 11.66666667; 12.6; 15; 14.5) cần điều chỉnh gì để dễ đọc, dễ so sánh hơn?
- A. Xoá cột Trung bình
- B. Định dạng cùng một số chữ số thập phân (ví dụ 1 chữ số: 14.0; 11.7; 12.6…) ✅
- C. Đổi thành chữ in đậm
- D. Gõ lại bằng tay các số cho tròn
- Giải thích: Định dạng số chữ số thập phân thống nhất: số gọn, thẳng cột, dễ so sánh. Không gõ lại bằng tay vì giá trị tính toán phải giữ nguyên.

**Câu 4** (Thông hiểu) — Hoạt động 1, câu 2: Dữ liệu cột Chi phí (1400000.00; 976500.00…) nên trình bày lại thế nào cho phù hợp với số tiền?
- A. Phân tách hàng nghìn, hàng triệu bằng dấu “,”, không cần phần thập phân: 1,400,000 ✅
- B. Để nguyên 1400000.00
- C. Viết thành chữ: một triệu bốn trăm nghìn
- D. Thêm 4 chữ số thập phân cho chính xác
- Giải thích: Số tiền đồng không có phần lẻ; dùng dấu phân tách hàng nghìn giúp đọc nhanh: 1,400,000.

**Câu 5** (Nhận biết) — Trong cửa sổ Format Cells (Hình 9.2), mục nào dùng để chọn số chữ số thập phân?
- A. Use 1000 Separator (,)
- B. Negative numbers
- C. Decimal places ✅
- D. Category
- Giải thích: Decimal places: số chữ số thập phân. Use 1000 Separator (,): dấu ngăn cách hàng nghìn.

**Câu 6** (Vận dụng) — Ô M5 chứa 11.66666667, được định dạng hiển thị 1 chữ số thập phân thành 11.7. Giá trị thật lưu trong ô cũng bị đổi thành 11.7.
- Đáp án: **Sai**
- Giải thích: Sai. Định dạng chỉ thay đổi cách hiển thị; giá trị trong ô vẫn là 11.66666667 và vẫn dùng đầy đủ khi tính toán.

## 3. Định dạng dữ liệu kiểu phần trăm % 📈  `phan-tram`

**Câu 7** (Vận dụng) — Nhập công thức vào ô E4 tính tỉ lệ Số cây đã trồng / Số cây dự kiến của Hoa Mười giờ, rồi sao chép xuống E5:E8.
- Đáp án: nhập vào E4:E8: **=D4/C4**
- Giải thích: E4 = D4/C4 → 0.982142857…; sao chép xuống: E5 = D5/C5… (Hình 9.3).

**Câu 8** (Thông hiểu) — Ô E4 = 0.982142857. Sau khi định dạng Percentage với 2 chữ số thập phân, ô hiển thị là:
- A. 0.98%
- B. 98.21% ✅
- C. 9821%
- D. 0.982142857%
- Giải thích: 0.982142857 × 100 = 98.2142857… → hiển thị 98.21% (Hình 9.4).

**Câu 9** (Vận dụng) — Hoa Dạ yến thảo có tỉ lệ 120.00%. Điều đó cho biết gì?
- A. Số cây đã trồng ít hơn dự kiến
- B. Số cây đã trồng bằng dự kiến
- C. Số cây đã trồng vượt dự kiến (42 so với 35) ✅
- D. Bảng tính bị lỗi
- Giải thích: 42/35 = 1.2 = 120%: đã trồng vượt 20% so với dự kiến.

## 4. Định dạng dữ liệu ngày tháng 📅  `ngay-thang`

**Câu 10** (Thông hiểu) — Theo khuôn dạng mặc định mm/dd/yyyy, muốn nhập ngày 15 tháng 3 năm 2021, em gõ:
- A. 15/3/2021
- B. 3/15/2021 ✅
- C. 2021/15/3
- D. 15-2021-3
- Giải thích: Mặc định nhập tháng trước, ngày sau, rồi đến năm: 3/15/2021.

**Câu 11** (Vận dụng) — Hình 9.6 (hiển thị kiểu Việt Nam): ô A2 là 3/1/2020, ô B2 là 30. Công thức =A2+B2 cho kết quả:
- A. 33/1/2020
- B. 3/31/2020
- C. 2/2/2020 ✅
- D. 30
- Giải thích: Ngày 3/1/2020 + 30 ngày = ngày 2/2/2020 (mỗi số nguyên được tính là một ngày).

**Câu 12** (Vận dụng) — Kết quả của phép trừ ngày 31/3/2021 − 15/3/2021 là:
- Đáp án: **16 / 16 ngày**
- Giải thích: 31/3/2021 − 15/3/2021 = 16 ngày (Hình 9.6).

**Câu 13** (Thông hiểu) — Sau khi định dạng ngày tháng kiểu Việt Nam, em có thể nhập dữ liệu theo thứ tự ngày/tháng/năm.
- Đáp án: **Sai**
- Giải thích: Sai. Định dạng chỉ thay đổi cách hiển thị; việc nhập dữ liệu vẫn tuân theo thứ tự mặc định của phần mềm (tháng/ngày/năm).

## 5. Chọn kiểu định dạng phù hợp 🎯  `ghep-dinh-dang`

**Ghép đôi** — Ghép mỗi dữ liệu với kiểu định dạng phù hợp nhất. Làm hết rồi bấm Nộp bài.

- Trung bình số cây: 11.66666667 ⟶ Number — 1 chữ số thập phân
- Chi phí: 1400000.00 ⟶ Number — 0 chữ số thập phân, Use 1000 Separator (,)
- Tỉ lệ đã trồng: 0.982142857 ⟶ Percentage
- Ngày trồng cây: 3/15/2023 ⟶ Date — Locale Vietnamese (dd/mm/yyyy)

## 6. Trình bày bảng tính — chèn, xoá, ẩn, hiện hàng và cột 🧱  `trinh-bay`

**Câu 14** (Thông hiểu) — Hoạt động 2, câu 2: Các lệnh trình bày bảng tính hay định dạng dữ liệu có làm thay đổi dữ liệu trên bảng tính không?
- A. Có, dữ liệu bị làm tròn luôn
- B. Không, chỉ thay đổi cách hiển thị, trình bày ✅
- C. Có, dữ liệu bị xoá hết
- D. Chỉ thay đổi dữ liệu văn bản
- Giải thích: Định dạng dữ liệu và trình bày bảng tính giúp bảng tính gọn gàng, dễ hiểu, bắt mắt hơn nhưng không làm thay đổi dữ liệu.

**Câu 15** (Vận dụng) — Quan sát tên cột và hàng ở Hình 9.7. Những gì đang bị ẩn?
- A. Cột B và hàng 3
- B. Cột D và các hàng từ 4 đến 8 ✅
- C. Cột E, F, G
- D. Không có gì bị ẩn
- Giải thích: Tên cột nhảy từ C sang E → cột D bị ẩn; tên hàng nhảy từ 3 sang 9 → các hàng 4 đến 8 bị ẩn.

**Câu 16** (Vận dụng) — Muốn chèn một hàng trống vào giữa hàng 5 và hàng 6, em chọn hàng nào rồi nháy nút phải chuột, chọn Insert?
- A. Hàng 5
- B. Hàng 6 ✅
- C. Hàng 4
- D. Hàng 7
- Giải thích: Hàng mới được chèn vào bên trên hàng em chọn → chọn hàng 6.

**Câu 17** (Thông hiểu) — Cột D đang bị ẩn. Để hiện lại cột D, em làm thế nào?
- A. Chọn cột C và cột E, nháy nút phải chuột, chọn Unhide ✅
- B. Chọn cột C, chọn Delete
- C. Chọn cột E, chọn Insert
- D. Gõ lại toàn bộ dữ liệu cột D
- Giải thích: Chọn các cột xung quanh vị trí bị ẩn (C và E), nháy nút phải chuột và chọn Unhide.

## 7. Trò chơi: Dùng lệnh nào? 🧩  `chon-lenh`

**Ghép đôi** — Ghép mỗi việc cần làm với lệnh phù hợp. Làm hết rồi bấm Nộp bài.

- Bỏ hẳn cột 7H khỏi bảng ⟶ Delete
- Thêm cột Đơn giá vào bên trái cột 7A ⟶ Insert
- Tạm giấu các cột lớp cho bảng gọn, dễ quan sát ⟶ Hide
- Hiển thị lại các cột đã giấu ⟶ Unhide
- Gộp các ô A1:N1 làm tiêu đề ở giữa bảng ⟶ Merge & Center
- Hiển thị chi phí có dấu phân tách hàng nghìn ⟶ Format Cells

## 8. Gộp các ô của một vùng dữ liệu 🔗  `gop-o`

**Câu 18** (Thông hiểu) — Gộp vùng A2:B3 (Hình 9.10). Ô đã gộp có địa chỉ là gì? (gõ địa chỉ ô)
- Đáp án: **A2**
- Giải thích: Ô kết quả có địa chỉ là ô đầu tiên bên trái của vùng đã gộp: A2 (Hình 9.11).

**Câu 19** (Vận dụng) — Ô B4 chứa “Cây hoa”, ô B8 chứa “Hoa”. Em gộp vùng B4:B8. Điều gì xảy ra?
- A. Ô gộp hiển thị “Cây hoa Hoa”
- B. Ô gộp giữ “Cây hoa”; chữ “Hoa” ở B8 bị xoá ✅
- C. Ô gộp giữ “Hoa”; “Cây hoa” bị xoá
- D. Không gộp được
- Giải thích: Ô gộp giữ dữ liệu của ô đầu tiên bên trái (B4); dữ liệu trong các ô khác (B8) bị xoá khi gộp.

**Câu 20** (Nhận biết) — Lệnh gộp các ô của một vùng dữ liệu là:
- A. Home/Number/Format Cells
- B. Chuột phải/Insert
- C. Home/Alignment/Merge & Center ✅
- D. Chuột phải/Hide
- Giải thích: Đánh dấu vùng dữ liệu, chọn Home/Alignment/Merge & Center.

## 9. Tính chất của các hàm trên bảng tính 🧮  `tinh-chat-ham`

**Câu 21** (Vận dụng) — Nhập hàm vào ô J5 để tính tổng số cây Hoa Dạ yến thảo đã trồng của các lớp.
- Đáp án: nhập vào J5: **=SUM(C5:I5)**
- Giải thích: J5 = SUM(C5:I5) = 12 + 12 + 11 = 35. Các ô “Đang làm”, “???”, “Không” và ô trống được bỏ qua.

**Câu 22** (Vận dụng) — Nhập hàm vào ô H9 để đếm số loại cây lớp 7G đã trồng (đã có số liệu).
- Đáp án: nhập vào H9: **=COUNT(H4:H8)**
- Giải thích: H9 = COUNT(H4:H8) = 3 (các ô 14, 10, 12). COUNT chỉ đếm các ô chứa số.

**Câu 23** (Thông hiểu) — Hoạt động 3: Các kết quả của bảng dữ liệu Hình 9.12 có luôn đúng không? Vì sao?
- A. Không, vì trong bảng có chữ nên hàm báo lỗi
- B. Có, vì các hàm chỉ tính trên các ô chứa số, bỏ qua ô chứa văn bản hoặc ô trống ✅
- C. Không, vì phải xoá hết chữ thì hàm mới tính được
- D. Có, vì hàm tự đổi chữ thành số 0 rồi đếm luôn
- Giải thích: Hàm bỏ qua văn bản và ô trống nên khi lớp cập nhật số liệu, kết quả tự động đúng.

**Câu 24** (Vận dụng) — Câu hỏi SGK tr.49 — a) =COUNT(C6:I6) cho kết quả bao nhiêu?
- Đáp án: **3**
- Giải thích: Hàng 6 có các số 16, 12, 10 → COUNT = 3 (bỏ qua “Đang làm”, “???”, “Không”).

**Câu 25** (Vận dụng) — Câu hỏi SGK tr.49 — b) =AVERAGE(C7:I7) cho kết quả bao nhiêu?
- Đáp án: **15**
- Giải thích: Hàng 7 có các số 20, 12, 13 → AVERAGE = (20 + 12 + 13) : 3 = 15.

**Câu 26** (Vận dụng) — Câu hỏi SGK tr.49 — c) =MAX(C4:I8) cho kết quả bao nhiêu?
- Đáp án: **20**
- Giải thích: Số lớn nhất trong vùng C4:I8 là 20 (ô D7).

**Câu 27** (Vận dụng cao) — Câu hỏi SGK tr.49 — d) =SUM(C4:I8) cho kết quả bao nhiêu?
- Đáp án: **190**
- Giải thích: SUM(C4:I8) = 49 + 35 + 38 + 45 + 23 = 190 (tổng các số trong vùng).

## 10. Thực hành — Sắp xếp các bước hoàn thiện Trang tính 5 🔢  `cac-buoc-thuc-hanh`

**Sắp xếp** — Sắp xếp các bước hoàn thiện dữ liệu dự án Trường học xanh theo đúng thứ tự SGK rồi bấm Nộp bài.

1. Mở tệp THXanh.xlsx, tạo trang tính mới đặt tên 5. Tổng kết
2. Sao chép toàn bộ dữ liệu trang tính 4. Dự kiến kết quả sang trang 5. Tổng kết, sửa tên bảng tại ô A2
3. Chèn cột Đơn giá bên trái cột 7A, sao chép đơn giá từ trang tính 3. Tìm hiểu giống cây
4. Tạo cột Chi phí, nhập công thức Chi phí = Đơn giá × Tổng số cây
5. Định dạng dữ liệu cho trang tính như Hình 9.13 và lưu lại kết quả

## 11. Thực hành: Hoàn thiện dữ liệu dự án Trường học xanh 🌳  `thuc-hanh`

**Câu 28** (Vận dụng) — Nhập công thức vào ô N4 tính Chi phí = Đơn giá × Tổng số cây của Hoa Mười giờ, rồi sao chép xuống N5:N8.
- Đáp án: nhập vào N4:N8: **=D4*L4**
- Giải thích: N4 = D4*L4 = 25000 × 56 = 1400000; sao chép xuống: N5 = D5*L5…

**Câu 29** (Vận dụng) — Nhập công thức vào ô N9 tính tổng chi phí của nhóm Cây hoa.
- Đáp án: nhập vào N9: **=SUM(N4:N8)**
- Giải thích: N9 = SUM(N4:N8) = 9371000 (có thể sao chép công thức từ ô E9 sang N9).

**Câu 30** (Vận dụng cao) — Nhập công thức vào ô N25 tính chi phí của toàn bộ dự án.
- Đáp án: nhập vào N25: **=N9+N17+N24**
- Giải thích: N25 = N9 + N17 + N24 = 30692200 (sao chép công thức từ ô E25 sang N25 cũng được).

**Câu 31** (Thông hiểu) — Chi phí của toàn bộ dự án (ô N25) là 30692200. Sau khi định dạng Number, 0 chữ số thập phân, Use 1000 Separator, ô hiển thị:
- A. 30692200.00
- B. 30,692,200 ✅
- C. 30.692
- D. 3.0692200
- Giải thích: Dấu “,” phân tách hàng nghìn, hàng triệu: 30,692,200 — dễ đọc hơn nhiều.

## 12. Phiếu tự kiểm tra sản phẩm Trang tính 5 📋  `tu-kiem-tra`

**Phiếu tự đánh giá** (gửi GV, không chấm điểm)

- **🧮 DỮ LIỆU VÀ CÔNG THỨC:** Tạo trang tính 5. Tổng kết và sao chép dữ liệu từ trang tính 4 · Sửa tên bảng tại ô A2 thành Bảng 5 · Chèn cột Đơn giá và sao chép đúng đơn giá từng loại cây · Tạo cột Chi phí với công thức Đơn giá × Tổng số cây · Tính tổng chi phí tại N9, N17, N24, N25
- **🎨 ĐỊNH DẠNG VÀ TRÌNH BÀY:** Định dạng số chữ số thập phân cho cột Trung bình · Định dạng cột Chi phí có dấu phân tách hàng nghìn · Gộp ô tiêu đề và gộp ô tên loại cây · Kẻ khung, tô nền hàng tiêu đề, in đậm các hàng tổng · Lưu lại tệp THXanh.xlsx
- Câu hỏi mở: Nhóm em gặp khó khăn ở bước nào? Em đã khắc phục như thế nào?
- Dự kiến sản phẩm:
  - Kết quả đúng: N9 = 9,371,000 · N17 = 10,359,000 · N24 = 10,962,200 · N25 = 30,692,200; L25 = 623; M25 = 89.
  - Khó khăn thường gặp: sao chép đơn giá lệch hàng (trang 5 có các hàng trống giữa các loại cây); quên dấu = khi nhập công thức; gộp ô làm mất dữ liệu ô khác.

## 13. Luyện tập 📝  `luyen-tap`

**Câu 32** (Nhận biết) — Luyện tập 1: Có thể sao chép công thức từ trang tính này sang trang tính khác được không?
- Đáp án: **Đúng**
- Giải thích: Đúng. Có thể sao chép công thức từ trang tính này sang trang tính khác (như thực hành: sao chép dữ liệu, công thức trang 4 sang trang 5).

**Câu 33** (Thông hiểu) — Luyện tập 2: Phần mềm bảng tính điện tử có thể gộp các ô trong một vùng không là hình chữ nhật không?
- A. Có, gộp được mọi hình dạng
- B. Không, chỉ gộp được các ô của một vùng hình chữ nhật ✅
- C. Chỉ gộp được các ô trên cùng một cột
- D. Chỉ gộp được 2 ô
- Giải thích: Vùng dữ liệu luôn là hình chữ nhật (ví dụ A2:B3, B4:B8), nên chỉ gộp được các ô của một vùng hình chữ nhật.

**Câu 34** (Nhận biết) — Muốn cột Tỉ lệ hiển thị 98.21% thay vì 0.982142857, em chọn trong Format Cells:
- A. Date
- B. Percentage ✅
- C. Text
- D. Currency
- Giải thích: Kiểu Percentage hiển thị tỉ lệ dưới dạng số phần trăm.

## 14. Trò chơi: Gieo mầm Trường học xanh 🌱  `tro-choi`

**Câu 35** (Nhận biết) — Để mở cửa sổ Format Cells, em chọn Home rồi nháy chuột vào mũi tên bên cạnh nhóm lệnh nào?
- A. Font
- B. Number ✅
- C. Styles
- D. Editing
- Giải thích: Nháy vào mũi tên bên cạnh nhóm lệnh Number để mở cửa sổ Format Cells.

**Câu 36** (Thông hiểu) — Em chọn hàng 9 rồi nháy nút phải chuột, chọn Insert. Hàng mới được chèn vào đâu?
- A. Bên dưới hàng 9
- B. Bên trên hàng 9 ✅
- C. Cuối trang tính
- D. Đầu trang tính
- Giải thích: Hàng mới được chèn vào bên trên hàng em chọn.

**Câu 37** (Thông hiểu) — Em chọn cột D rồi chọn Insert. Cột mới được chèn vào đâu?
- A. Bên phải cột D
- B. Cuối bảng
- C. Bên trái cột D ✅
- D. Thay thế cột D
- Giải thích: Cột mới được chèn vào bên trái cột em chọn.

**Câu 38** (Vận dụng) — Vùng A1:B1 có A1 = “Tiêu đề”, B1 = “Bảng 5”. Gộp vùng A1:B1, ô gộp hiển thị:
- A. Tiêu đề ✅
- B. Bảng 5
- C. Tiêu đề Bảng 5
- D. Trống
- Giải thích: Ô gộp giữ dữ liệu ô đầu tiên bên trái (A1); dữ liệu B1 bị xoá.

**Câu 39** (Vận dụng) — Vùng C1:C4 chứa 10, “Không”, 20 và một ô trống. =AVERAGE(C1:C4) bằng:
- A. 7.5
- B. 10
- C. 30
- D. 15 ✅
- Giải thích: AVERAGE chỉ tính các ô chứa số: (10 + 20) : 2 = 15.

**Câu 40** (Vận dụng cao) — Vùng D1:D5 chứa 5, “???”, 8, “Đang làm”, 0. =COUNT(D1:D5) bằng:
- A. 5
- B. 2
- C. 3 ✅
- D. 13
- Giải thích: COUNT đếm các ô chứa số: 5, 8, 0 → 3 (số 0 vẫn là số).

**Câu 41** (Nhận biết) — Mục Use 1000 Separator (,) trong Format Cells dùng để:
- A. Dùng dấu “,” ngăn cách hàng nghìn, hàng triệu ✅
- B. Làm tròn số đến hàng nghìn
- C. Nhân số với 1000
- D. Chia số cho 1000
- Giải thích: Use 1000 Separator (,): dùng dấu “,” ngăn cách hàng nghìn, hàng triệu…

**Câu 42** (Thông hiểu) — Muốn tạm giấu các cột lớp 7A đến 7H cho bảng gọn khi trình chiếu, em dùng lệnh:
- A. Delete
- B. Merge & Center
- C. Hide ✅
- D. Insert
- Giải thích: Hide làm ẩn hàng, cột; khi cần có thể Unhide để hiện lại — dữ liệu không mất.

## 15. Vận dụng — Đọc và tính trên Bảng 5 📊  `van-dung`

**Câu 43** (Nhận biết) — Vận dụng 1a: Bấm vào ô cho biết tổng số cây của toàn bộ khối 7 sẽ trồng.
- Đáp án: **L25**
- Giải thích: Ô L25: tổng số cây dự kiến của cả khối 7 là 623 cây.

**Câu 44** (Nhận biết) — Vận dụng 1a: Tổng số cây của toàn bộ khối 7 sẽ trồng là bao nhiêu?
- Đáp án: **623 / 623 cây**
- Giải thích: L25 = 623 cây.

**Câu 45** (Thông hiểu) — Vận dụng 1b: Trung bình mỗi lớp sẽ trồng bao nhiêu cây?
- A. 41 cây
- B. 89 cây ✅
- C. 623 cây
- D. 104 cây
- Giải thích: M25 = AVERAGE(E25:K25) = 623 : 7 = 89 cây.

**Câu 46** (Vận dụng) — Vận dụng 2: Chỉ tiêu mỗi loại cây hoa là 50 cây. Nhập công thức vào ô O4 tính tỉ lệ số cây Hoa Mười giờ được phân bổ so với chỉ tiêu, rồi sao chép xuống O5:O8.
- Đáp án: nhập vào O4:O8: **=L4/50**
- Giải thích: O4 = L4/50 = 56/50 = 1.12; sao chép xuống O5 = L5/50… Sau đó định dạng Percentage: 112%, 70%, 126%, 150%, 116%.

**Câu 47** (Vận dụng) — Sau khi định dạng Percentage (0 chữ số thập phân), tỉ lệ của Hoa Cúc vàng (75 cây) so với chỉ tiêu 50 là:
- A. 75%
- B. 1.5%
- C. 150% ✅
- D. 12%
- Giải thích: 75/50 = 1.5 → 150%.

**Câu 48** (Vận dụng cao) — Loại cây hoa nào được phân bổ CHƯA đạt chỉ tiêu 50 cây?
- A. Hoa Mười giờ (112%)
- B. Hoa Dạ yến thảo (70%) ✅
- C. Hoa Dừa cạn (126%)
- D. Hoa Hồng (116%)
- Giải thích: Hoa Dạ yến thảo: 35/50 = 70% < 100% → chưa đạt chỉ tiêu. Các loại hoa khác đều vượt chỉ tiêu.

## 16. Tổng kết  `tong-ket`

**Câu 49** (Vận dụng cao) — Lớp 7E cập nhật ô “Đang làm” ở Hình 9.12 thành số 9. Kết quả tổng số cây ở cột J của hàng đó sẽ:
- A. Không đổi vì hàm đã tính xong
- B. Báo lỗi vì trước đó là chữ
- C. Tự động tăng thêm 9 ✅
- D. Phải xoá công thức nhập lại
- Giải thích: Hàm bỏ qua văn bản; khi ô có số, hàm tự tính lại — kết quả luôn đúng theo dữ liệu mới.

**Câu 50** (Thông hiểu) — Việc nào KHÔNG phải là định dạng hay trình bày bảng tính?
- A. Gộp ô tiêu đề
- B. Đổi 0.98 thành hiển thị 98%
- C. Ẩn các cột lớp
- D. Sửa số cây của lớp 7A từ 10 thành 12 ✅
- Giải thích: Sửa số liệu là thay đổi dữ liệu. Định dạng, trình bày chỉ thay đổi cách hiển thị.

