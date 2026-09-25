# NGÂN HÀNG CÂU HỎI — BÀI 6: LÀM QUEN VỚI PHẦN MỀM BẢNG TÍNH

> Sinh từ `data/lesson.js` (nguồn chính — sửa câu hỏi ở đó). Mức độ: NB = nhận biết, TH = thông hiểu, VD = vận dụng, VDC = vận dụng cao.
> Câu **Bảng tính** = thao tác trên bảng tính mô phỏng (bấm ô / kéo chọn vùng / chọn hàng, cột / gõ địa chỉ).

## 1. Mở đầu — Dự án Trường học xanh 🌳  `khoi-dong`

**Câu 1** (Thông hiểu) — Để thu thập và tính toán rất nhiều dữ liệu cho dự án Trường học xanh, nên dùng phần mềm nào?
- A. Phần mềm soạn thảo văn bản
- B. Phần mềm trình chiếu
- C. Phần mềm bảng tính ✅
- D. Phần mềm vẽ tranh
- Giải thích: Phần mềm bảng tính trình bày dữ liệu dạng bảng và tính toán nhanh, tự cập nhật khi dữ liệu thay đổi — phù hợp để thu thập, tính toán nhiều dữ liệu.

## 2. 2.1 Giao diện phần mềm bảng tính  `giao-dien`

**Câu 2** (Nhận biết) — Phần mềm bảng tính có những chức năng chính nào? (chọn TẤT CẢ ý đúng)
- A. Lưu và trình bày thông tin dưới dạng bảng ✅
- B. Thực hiện tính toán: tính tổng, trung bình cộng, giá trị lớn nhất, nhỏ nhất… ✅
- C. Chỉnh sửa ảnh và cắt ghép video
- D. Vẽ biểu đồ minh hoạ các số liệu ✅
- Giải thích: Phần mềm bảng tính: trình bày dữ liệu dạng bảng, tính toán, vẽ biểu đồ. Chỉnh sửa ảnh/video là việc của phần mềm khác.

## 3. Trò chơi: Ghép tên — chức năng 🧩  `ghep-giao-dien`

**Ghép đôi** — Ghép mỗi thành phần của giao diện bảng tính (bên trái) với chức năng đúng của nó (bên phải). Làm hết rồi bấm Nộp bài.

| Bên trái | Bên phải (đúng) |
|---|---|
| Thẻ và nhóm lệnh | Chứa các lệnh và biểu tượng lệnh |
| Hộp địa chỉ | Hiển thị địa chỉ của ô hiện thời |
| Vùng nhập dữ liệu | Nơi nhập, sửa trực tiếp dữ liệu của ô |
| Hàng ghi tên cột | Chứa tên các cột: A, B, C… |
| Cột ghi tên hàng | Chứa tên các hàng: 1, 2, 3… |
| Ô hiện thời | Ô đang được chọn, có khung viền đậm |
| Sheet1, Sheet2 | Tên các trang tính của bảng tính |

## 4. Câu hỏi nhanh — Giơ thẻ A, B, C, D 🅰️  `hoi-nhanh`

**Câu 3** (Nhận biết) — Vị trí giao của một hàng và một cột được gọi là gì?
- A. Ô ✅
- B. Trang tính
- C. Hộp địa chỉ
- D. Bảng tính
- Giải thích: Giao của một hàng và một cột trên trang tính tạo thành một ô tính (gọi tắt là ô).

**Câu 4** (Nhận biết) — Phát biểu nào dưới đây đúng?
- A. Các hàng của trang tính được đặt tên theo các chữ cái: A, B, C…
- B. Các hàng của trang tính được đặt tên theo các số: 1, 2, 3… ✅
- C. Các cột của trang tính được đặt tên theo các số: 1, 2, 3…
- D. Các hàng và cột trong trang tính không có tên
- Giải thích: Hàng được đặt tên bằng số 1, 2, 3… (từ trên xuống); cột được đặt tên bằng chữ cái A, B, C… (từ trái sang phải).

## 5. 2.2 Ô và địa chỉ ô  `dia-chi-o`

**Câu 5** (Nhận biết) — Bấm vào ô ghi tên học sinh “Bùi Lê Đình Anh”.
- Bảng tính (thao tác chọn) — đáp án: **B6**
- Giải thích: Ô nằm ở cột B và hàng 6 nên có địa chỉ B6 — tên cột viết trước, tên hàng viết sau.

**Câu 6** (Thông hiểu) — Bấm vào ô chứa điểm Toán của bạn Trần Thế Hải.
- Bảng tính (thao tác chọn) — đáp án: **F9**
- Giải thích: Điểm Toán nằm ở cột F; bạn Trần Thế Hải ở hàng 9 → ô F9 (điểm 8).

**Câu 7** (Nhận biết) — Địa chỉ của một ô được viết theo quy tắc nào?
- A. Tên hàng rồi đến tên cột, VD: 6B
- B. Tên cột, dấu hai chấm, tên hàng, VD: B:6
- C. Tên cột rồi đến tên hàng, VD: B6 ✅
- D. Số thứ tự của ô tính từ đầu trang tính
- Giải thích: Địa chỉ ô = tên cột ghép với tên hàng, ví dụ B6.

## 6. 2.2 Vùng dữ liệu & thao tác chọn 🖱️  `vung-du-lieu`

**Câu 8** (Thông hiểu) — Vùng đang được tô màu (giống Hình 6.3) có địa chỉ là gì? Gõ địa chỉ vào ô trả lời.
- Bảng tính (gõ địa chỉ vùng tô B4:E11) — đáp án: **B4:E11**
- Giải thích: Ô góc trên bên trái là B4, ô góc dưới bên phải là E11 → địa chỉ vùng B4:E11.

**Câu 9** (Nhận biết) — Kéo thả chuột để chọn vùng D7:F9.
- Bảng tính (thao tác chọn) — đáp án: **D7:F9**
- Giải thích: Kéo từ ô D7 (góc trên trái) đến ô F9 (góc dưới phải). Vùng D7:F9 gồm 3 cột × 3 hàng = 9 ô.

**Câu 10** (Nhận biết) — Chọn cả hàng 6.
- Bảng tính (thao tác chọn) — đáp án: **6**
- Giải thích: Nháy chuột vào tên hàng 6 (ở cột ghi tên hàng bên trái) để chọn cả hàng.

**Câu 11** (Nhận biết) — Chọn cả cột D (cột điểm Bài 2).
- Bảng tính (thao tác chọn) — đáp án: **D**
- Giải thích: Nháy chuột vào tên cột D (ở hàng ghi tên cột phía trên) để chọn cả cột.

**Câu 12** (Vận dụng) — Chọn vùng chứa điểm cả 3 bài của các thí sinh từ A5 đến A8.
- Bảng tính (thao tác chọn) — đáp án: **C9:E12**
- Giải thích: Thí sinh A5 đến A8 nằm ở hàng 9 đến 12; điểm 3 bài ở cột C đến E → vùng C9:E12.

## 7. Thử thách: Ô và vùng 🧠  `thu-thach-vung`

**Câu 13** (Thông hiểu) — Một ô có thể coi là một vùng được không?
- Đáp án: **Đúng**
- Giải thích: Được. Vùng là các ô liền kề tạo thành hình chữ nhật — một ô cũng là hình chữ nhật (1 hàng × 1 cột).

**Câu 14** (Vận dụng) — Vùng A5:B10 có bao nhiêu ô?
- A. 6 ô
- B. 16 ô
- C. 10 ô
- D. 12 ô ✅
- Giải thích: A5:B10 gồm 2 cột (A, B) × 6 hàng (5 → 10) = 12 ô.

**Câu 15** (Thông hiểu) — Có thể chọn một vùng có hình tam giác trên trang tính.
- Đáp án: **Sai**
- Giải thích: Không thể. Vùng dữ liệu luôn là hình chữ nhật.

**Câu 16** (Nhận biết) — Kiểm chứng: kéo chọn vùng A5:B10 trên bảng tính.
- Bảng tính (thao tác chọn) — đáp án: **A5:B10**
- Giải thích: Vùng A5:B10: từ ô A5 kéo đến ô B10 — đếm được 2 cột × 6 hàng = 12 ô.

## 8. 2.3 Nhập và chỉnh sửa dữ liệu ⌨️  `nhap-du-lieu`

**Câu 17** (Nhận biết) — Sau khi gõ xong dữ liệu vào ô, em nhấn phím nào để kết thúc việc nhập?
- A. Esc
- B. Delete
- C. Shift
- D. Enter ✅
- Giải thích: Nhập xong nhấn phím Enter để kết thúc (Esc sẽ huỷ nội dung đang gõ).

**Câu 18** (Vận dụng) — Em kéo chuột chọn vùng từ ô B2 đến ô D5 rồi gõ chữ “Lớp 7A”. Dữ liệu được nhập vào ô nào?
- A. Tất cả các ô trong vùng B2:D5
- B. Ô B2 — ô hiện thời ✅
- C. Ô D5 — ô cuối vùng
- D. Không nhập được vì đang chọn vùng
- Giải thích: Dữ liệu được nhập vào ô hiện thời — ô được chọn đầu tiên khi kéo chuột (ở đây là B2).

**Câu 19** (Thông hiểu) — Cách nào KHÔNG dùng để chỉnh sửa dữ liệu trong một ô?
- A. Nháy chuột vào hộp địa chỉ rồi sửa nội dung ✅
- B. Nháy đúp chuột vào ô rồi sửa
- C. Nháy chuột vào ô, sửa ở vùng nhập dữ liệu
- D. Nháy chuột vào ô rồi gõ nội dung mới để thay thế
- Giải thích: Hộp địa chỉ chỉ hiển thị địa chỉ ô hiện thời, không dùng để sửa nội dung ô. Hai cách sửa trong SGK: nháy đúp vào ô, hoặc sửa ở vùng nhập dữ liệu.

## 9. Trò chơi: Tự căn trái hay căn phải? ↔️  `phan-loai-can-le`

**Phân loại** — Xếp mỗi dữ liệu vào đúng nhóm: khi nhập vào ô tính, dữ liệu sẽ TỰ căn trái hay căn phải? Xếp hết rồi bấm Nộp bài.

- **⬅️ Tự căn TRÁI (văn bản):** Nguyễn Việt Hương · Hoàn Kiếm · Tổ 3 · Lớp 7A
- **➡️ Tự căn PHẢI (số, ngày tháng):** 8.5 · 9/23/2010 · 2021 · 3

## 10. 2.3 Định dạng dữ liệu 🎨  `dinh-dang`

**Câu 20** (Thông hiểu) — Để tô nền màu vàng cho hàng tiêu đề của bảng, em dùng lệnh nào?
- A. Màu chữ (chữ A gạch đỏ)
- B. Chữ đậm (B)
- C. Cỡ chữ
- D. Màu nền ô (thùng sơn) ✅
- Giải thích: Lệnh Màu nền ô (biểu tượng thùng sơn) trong nhóm Font dùng để tô màu nền cho ô.

**Câu 21** (Nhận biết) — Muốn định dạng một vùng dữ liệu, việc ĐẦU TIÊN em cần làm là:
- A. Chọn vùng dữ liệu cần định dạng ✅
- B. Lưu tệp bảng tính
- C. Nháy đúp vào tên trang tính
- D. Nhấn phím Enter
- Giải thích: Luôn chọn vùng dữ liệu trước (Bước 1), rồi mới dùng lệnh định dạng (Bước 2).

## 11. Trò chơi: Nút lệnh nào? 🔘  `nut-lenh`

**Ghép đôi** — Ghép mỗi nút lệnh (bên trái) với chức năng của nó (bên phải). Làm hết rồi bấm Nộp bài.

| Bên trái | Bên phải (đúng) |
|---|---|
| 𝐁 | Chữ đậm |
| 𝐼 | Chữ nghiêng |
| U̲ | Gạch chân |
| 🪣 Thùng sơn | Màu nền ô |
| A (gạch đỏ) | Màu chữ |
| Arial ▾ | Phông chữ |
| 11 ▾ | Cỡ chữ |

## 12. Thực hành — Khởi động nhanh ⚡  `khoi-dong-thuc-hanh`

**Câu 22** (Thông hiểu) — Muốn xoá nhanh dữ liệu trong một vùng, em làm thế nào?
- A. Nháy đúp vào từng ô rồi xoá từng kí tự
- B. Chọn vùng đó rồi nhấn phím Delete ✅
- C. Chọn vùng đó rồi nhấn phím Enter
- D. Đóng phần mềm và không lưu
- Giải thích: Chọn vùng dữ liệu rồi nhấn phím Delete để xoá toàn bộ dữ liệu trong vùng.

**Câu 23** (Nhận biết) — Có bao nhiêu cách nhập dữ liệu vào ô tính (theo SGK)?
- A. 1 cách
- B. 3 cách
- C. 2 cách ✅
- D. 4 cách
- Giải thích: 2 cách: gõ trực tiếp vào ô hiện thời; hoặc nháy vào vùng nhập dữ liệu rồi gõ. Nhập xong nhấn Enter.

## 13. Sắp xếp các bước thực hành 🪜  `cac-buoc-thuc-hanh`

**Sắp xếp** — Sắp xếp các bước thực hành “Nhập thông tin khảo sát dự án Trường học xanh” theo đúng thứ tự rồi bấm Nộp bài.

1. Mở Excel (nháy đúp biểu tượng trên màn hình), chọn Blank workbook
2. Nhập dữ liệu khảo sát: tiêu đề ở A1, A2; các cột STT, Địa điểm, Loại cây
3. Chỉnh độ rộng cột, định dạng tiêu đề, căn giữa cột STT, tô nền hàng tiêu đề
4. Nháy đúp tên trang tính Sheet1, đổi tên thành “1. Khảo sát”
5. Lưu bảng tính với tên THXanh.xlsx (File/Save hoặc Ctrl+S)

## 14. Thực hành: Khảo sát dự án Trường học xanh 🌱  `thuc-hanh`

**Câu 24** (Thông hiểu) — Hàng tiêu đề của bảng (STT, Địa điểm, Loại cây) là hàng nào? Bấm chọn CẢ HÀNG đó để tô nền vàng.
- Bảng tính (thao tác chọn) — đáp án: **3**
- Giải thích: Hàng tiêu đề là hàng 3 — nháy vào tên hàng 3 để chọn cả hàng, rồi dùng lệnh Màu nền ô.

**Câu 25** (Vận dụng) — Chọn vùng dữ liệu của cột STT (từ ô tiêu đề đến số 5) để căn giữa.
- Bảng tính (thao tác chọn) — đáp án: **A3:A8**
- Giải thích: Cột STT nằm ở cột A, từ ô tiêu đề A3 đến ô A8 → vùng A3:A8.

## 15. Luyện tập — Cừu vui vẻ và Sói xám  `luyen-tap`

**Câu 26** (Nhận biết) — Phần mềm bảng tính có chức năng chính là gì? Chọn phương án đúng nhất.
- A. Quản trị dữ liệu
- B. Soạn thảo văn bản và quản trị dữ liệu
- C. Nhập và xử lí dữ liệu dưới dạng bảng ✅
- D. Nhập và tính toán giống như máy tính cầm tay Casio
- Giải thích: Phần mềm bảng tính dùng để nhập và xử lí (tính toán, trình bày, vẽ biểu đồ) dữ liệu dưới dạng bảng.

**Câu 27** (Nhận biết) — Vùng dữ liệu trên bảng tính có hình gì?
- A. Hình tam giác
- B. Hình chữ nhật ✅
- C. Hình tròn
- D. Có thể là hình bất kì
- Giải thích: Nhiều ô liền kề tạo thành hình chữ nhật mới là một vùng.

**Câu 28** (Nhận biết) — Thế nào là ô dữ liệu trên bảng tính?
- A. Là giao của một hàng và một cột ✅
- B. Là một vùng trên bảng tính
- C. Là giao của nhiều hàng và nhiều cột
- Giải thích: Ô tính là giao của một hàng và một cột.

**Câu 29** (Vận dụng cao) — Một vùng dữ liệu gồm m hàng và n cột sẽ có bao nhiêu ô dữ liệu?
- A. m + n
- B. 2(m + n)
- C. m × n ✅
- D. 2(m × n)
- Giải thích: Mỗi hàng có n ô, có m hàng → m × n ô. VD: vùng A5:B10 có 6 hàng × 2 cột = 12 ô.

**Câu 30** (Nhận biết) — Khi nhập số vào ô tính thì dữ liệu được tự động:
- A. Căn trái
- B. Căn giữa
- C. Căn đều hai bên
- D. Căn phải ✅
- Giải thích: Dữ liệu số (và ngày tháng) tự động căn phải.

**Câu 31** (Nhận biết) — Khi nhập văn bản vào ô tính thì dữ liệu được tự động:
- A. Căn trái ✅
- B. Căn phải
- C. Căn giữa
- D. Căn đều hai bên
- Giải thích: Dữ liệu văn bản tự động căn trái.

## 16. Vận dụng 🏡  `van-dung`

**Tự luận 1** — Vì sao khi nhập 12/15/2020 thì phần mềm tự động căn phải, nhưng nếu nhập 15/12/2020 thì phần mềm tự động căn trái?
- Hướng trả lời: Phần mềm (định dạng Anh – Mỹ) hiểu ngày tháng theo kiểu tháng/ngày/năm. 12/15/2020 là ngày 15 tháng 12 năm 2020 → là dữ liệu ngày tháng nên căn phải. 15/12/2020 sẽ là “tháng 15” — không có tháng 15 nên phần mềm coi là văn bản → căn trái.

**Tự luận 2** — Tìm một số loại cây có thể mua và trồng cho dự án Trường học xanh. Tạo bảng tính tên “Danh sách các loại cây” gồm 3 cột: STT, Loại cây (Cây hoa, Cây ăn quả, Cây bóng mát), Tên cây. Nhập dữ liệu rồi chỉnh sửa, định dạng. (Ghi tóm tắt vài loại cây nhóm em chọn.)
- Hướng trả lời: Bảng có đủ 3 cột STT – Loại cây – Tên cây, từ 5 loại cây trở lên (VD: Cây hoa: hoa hồng, hoa mười giờ; Cây ăn quả: xoài, ổi; Cây bóng mát: bằng lăng, phượng…). Định dạng tốt: ít nhất 4 định dạng — phông chữ, kiểu chữ, màu chữ, căn lề, độ rộng hàng/cột phù hợp nội dung.

## 17. Tổng kết  `tong-ket`

**Câu 32** (Vận dụng cao) — Ô hiện thời là B2. Em kéo chọn đến ô D6. Vùng được chọn có địa chỉ và số ô là:
- A. B2:D6 — 12 ô
- B. B2:D6 — 15 ô ✅
- C. B6:D2 — 15 ô
- D. B2:D6 — 8 ô
- Giải thích: Ô trên trái B2, ô dưới phải D6 → B2:D6; gồm 3 cột (B, C, D) × 5 hàng (2 → 6) = 15 ô.

**Câu 33** (Vận dụng cao) — Chọn vùng gồm 3 hàng và 2 cột, có ô góc trên bên trái là B2.
- Bảng tính (thao tác chọn) — đáp án: **B2:C4**
- Giải thích: Từ B2: 2 cột là B, C; 3 hàng là 2, 3, 4 → vùng B2:C4 (6 ô).

---
**Thống kê:** 33 câu hỏi chấm điểm từng câu + 4 bài ghép đôi / phân loại / sắp xếp + 2 câu tự luận. Phân bố mức độ: Thông hiểu 9 · Nhận biết 17 · Vận dụng 4 · Vận dụng cao 3.
