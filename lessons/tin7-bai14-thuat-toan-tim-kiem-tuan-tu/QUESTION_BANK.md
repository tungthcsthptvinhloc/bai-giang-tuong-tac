# NGÂN HÀNG CÂU HỎI — TIN 7 BÀI 14: THUẬT TOÁN TÌM KIẾM TUẦN TỰ

> Sinh từ `data/lesson.js` (nguồn chính). Sửa câu hỏi trong `data/lesson.js`.

## 1. Mở đầu — Giúp mẹ An tìm địa chỉ 🌱  `khoi-dong`

**Câu 1** (Nhận biết) — Câu 1: Địa chỉ của khách hàng Thanh Trúc là gì?
- A. Số 48 đường Trưng Vương
- B. Xóm 3, Thư Trai
- C. Xóm 2, Lục Xuân ✅
- D. Số 69 đường Ngô Quyền
- Giải thích: Thanh Trúc ở dòng số 4 của Bảng 14.1: Xóm 2, Lục Xuân.

**Câu 2** (Thông hiểu) — Câu 2: Em đã tìm khách hàng Thanh Trúc trong danh sách bằng cách nào?
- A. Đoán bừa một dòng
- B. Tìm lần lượt từ đầu danh sách, xem từng họ tên cho đến khi thấy Thanh Trúc ✅
- C. Chỉ xem dòng cuối cùng
- D. Sắp xếp lại danh sách rồi mới tìm
- Giải thích: Tìm lần lượt từ đầu đến cuối danh sách, chừng nào chưa tìm thấy và chưa tìm hết thì còn tìm tiếp.

**Câu 3** (Thông hiểu) — Câu 3: Hoạt động nào sau đây là hoạt động tìm kiếm trong cuộc sống? (Chọn tất cả đáp án đúng)
- A. Tìm sách Tin học 7 trong danh mục sách giáo khoa ✅
- B. Tưới cây cho mẹ
- C. Tìm các bạn sinh vào tháng 6 trong danh sách lớp ✅
- D. Tìm số điện thoại của bạn trong danh bạ ✅
- Giải thích: Tìm sách, tìm học sinh, tìm số điện thoại đều là tìm dữ liệu trong một danh sách. Tưới cây không phải hoạt động tìm kiếm.

## 2. Thuật toán tìm kiếm tuần tự 🔎  `tim-kiem-tuan-tu`

**Câu 4** (Nhận biết) — Phiếu 2, câu 1: Input (dữ liệu vào) của bài toán tìm khách hàng trong tình huống khởi động là:
- A. Địa chỉ của khách hàng cần tìm
- B. Danh sách khách hàng ✅
- C. Số lần lặp
- D. Cây giống cần chở
- Giải thích: Input: danh sách khách hàng (mẹ An đưa cho An tìm).

**Câu 5** (Nhận biết) — Phiếu 2, câu 1: Output (dữ liệu ra) của bài toán là:
- A. Danh sách khách hàng
- B. Số điện thoại của mẹ An
- C. Tên các loại cây giống
- D. Địa chỉ của khách hàng cần tìm ✅
- Giải thích: Output: địa chỉ của khách hàng cần tìm.

**Câu 6** (Thông hiểu) — Phiếu 2, câu 2: Cấu trúc điều khiển nào được sử dụng trong bài toán?
- A. Cấu trúc lặp ✅
- B. Chỉ có cấu trúc tuần tự
- C. Không dùng cấu trúc nào
- D. Chỉ có cấu trúc rẽ nhánh
- Giải thích: Chừng nào chưa tìm thấy và chưa tìm hết thì còn tìm tiếp — đây chính là cấu trúc lặp.

**Câu 7** (Thông hiểu) — Phiếu 2, câu 3: Hoạt động được lặp lại trong bài toán là:
- A. Chở cây giống đến nhà khách
- B. Gọi điện cho khách hàng
- C. Xem họ tên khách hàng trong danh sách và so sánh với họ tên cần tìm ✅
- D. Ghi thêm khách hàng mới
- Giải thích: Hoạt động lặp: tìm (xem, so sánh) tên khách hàng trong danh sách, hết người này đến người tiếp theo.

**Câu 8** (Vận dụng) — Phiếu 2, câu 4: Điều kiện cần kiểm tra để dừng vòng lặp là gì? (Chọn tất cả đáp án đúng)
- A. Họ tên khách hàng có đúng là họ tên cần tìm không ✅
- B. Khách hàng ở gần hay xa
- C. Đã hết danh sách chưa ✅
- D. Danh sách có bao nhiêu trang
- Giải thích: Hai điều kiện: kiểm tra đúng họ tên cần tìm chưa; kiểm tra đã hết danh sách chưa.

## 3. Ghép sơ đồ khối Hình 14.1 🧩  `so-do-khoi`

**Sắp xếp** — Sắp xếp các khối trên nhánh chính của sơ đồ khối (từ Bắt đầu đến bước quay lại vòng lặp) rồi bấm Nộp bài.

1. Bắt đầu
2. Danh sách khách hàng, Họ tên khách hàng yêu cầu
3. Xem họ tên khách hàng đầu tiên
4. Có đúng họ tên khách hàng cần tìm không?
5. Có đúng là đã hết danh sách không?
6. Xem họ tên khách hàng tiếp theo

## 4. Hoạt động 1 — Điền bảng tìm “Thanh Trúc” 📝  `bang-14-2`

**Điền bảng (chọn Đúng/Sai)** — Nhóm 4: quan sát sơ đồ khối Hình 14.1 và Bảng 14.1, chọn Đúng/Sai cho từng lần lặp để tìm địa chỉ khách hàng “Thanh Trúc” (lần lặp 1 là ví dụ). Làm hết rồi bấm Nộp bài.

Lần lặp 1 · Nguyễn An → Có đúng khách hàng cần tìm? Sai · Đã hết danh sách? Sai  
Lần lặp 2 · Trần Bình → Có đúng khách hàng cần tìm? {{}} · Đã hết danh sách? {{}}  
Lần lặp 3 · Hoàng Mai → Có đúng khách hàng cần tìm? {{}} · Đã hết danh sách? {{}}  
Lần lặp 4 · Thanh Trúc → Có đúng khách hàng cần tìm? {{}} → Đầu ra: {{}}

- Đáp án: Sai · Sai · Sai · Sai · Đúng · Xóm 2, Lục Xuân
- Giải thích: Lần lặp 2, 3: Sai – Sai (chưa đúng tên, chưa hết danh sách). Lần lặp 4: Thanh Trúc — Đúng → ghi ra địa chỉ Xóm 2, Lục Xuân và kết thúc. Thuật toán lặp 4 lần.

## 5. Máy tìm kiếm tuần tự 🤖  `may-tim-kiem`

**Câu 9** (Thông hiểu) — Tìm địa chỉ khách hàng “Thanh Trúc”, thuật toán thực hiện bao nhiêu lần lặp?
- A. 1 lần
- B. 5 lần
- C. 3 lần
- D. 4 lần ✅
- Giải thích: Lần lặp 1, 2, 3 đều Sai; lần lặp 4 gặp Thanh Trúc → dừng. Số lần lặp: 4.

**Câu 10** (Vận dụng) — Tìm “Lê Minh” (không có trong danh sách): thuật toán dừng ở lần lặp thứ mấy và đầu ra là gì?
- A. Lần lặp 1 — Không tìm thấy
- B. Lần lặp 5 — Không tìm thấy ✅
- C. Lần lặp 4 — Xóm 2, Lục Xuân
- D. Không bao giờ dừng
- Giải thích: Xét hết 5 khách hàng đều Sai; ở lần lặp 5 đã hết danh sách (Đúng) → trả lời “Không tìm thấy” và kết thúc.

**Câu 11** (Vận dụng) — Tìm “Nguyễn An” thì thuật toán dừng ngay ở lần lặp 1.
- Đáp án: **Đúng**
- Giải thích: Đúng. Nguyễn An là khách hàng đầu tiên nên câu hỏi thứ nhất trả lời Đúng ngay lần lặp 1.

## 6. Sắp xếp 5 bước mô tả thuật toán 🔢  `nam-buoc`

**Sắp xếp** — Sắp xếp 5 bước mô tả thuật toán tìm kiếm tuần tự bằng ngôn ngữ tự nhiên (SGK tr.73) rồi bấm Nộp bài.

1. Xét vị trí đầu tiên của danh sách
2. Nếu giá trị của phần tử ở vị trí đang xét bằng giá trị cần tìm thì chuyển sang Bước 4, nếu không thì chuyển đến vị trí tiếp theo
3. Kiểm tra đã hết danh sách chưa. Nếu đã hết thì chuyển sang Bước 5, nếu chưa thì lặp lại từ Bước 2
4. Trả lời “Tìm thấy” và chỉ ra vị trí phần tử tìm được; Kết thúc
5. Trả lời “Không tìm thấy”; Kết thúc

## 7. Câu hỏi củng cố (SGK tr.73) ❓  `cau-hoi-sgk`

**Câu 12** (Nhận biết) — 1. Thuật toán tìm kiếm tuần tự thực hiện công việc gì?
- A. Lưu trữ dữ liệu.
- B. Sắp xếp dữ liệu theo chiều tăng dần.
- C. Xử lí dữ liệu.
- D. Tìm kiếm dữ liệu cho trước trong một danh sách đã cho. ✅
- Giải thích: Thuật toán tìm kiếm tuần tự tìm một dữ liệu cho trước trong một danh sách đã cho.

**Câu 13** (Thông hiểu) — 2. Thuật toán tìm kiếm tuần tự thực hiện công việc như thế nào?
- A. Sắp xếp lại dữ liệu theo thứ tự của bảng chữ cái.
- B. Xem xét mục dữ liệu đầu tiên, sau đó xem xét lần lượt từng mục dữ liệu tiếp theo cho đến khi tìm thấy mục dữ liệu được yêu cầu hoặc đến khi hết danh sách. ✅
- C. Chia nhỏ dữ liệu thành từng phần để tìm kiếm.
- D. Bắt đầu tìm từ vị trí bất kì của danh sách.
- Giải thích: Tìm kiếm tuần tự xét lần lượt từ mục đầu tiên đến khi tìm thấy hoặc hết danh sách.

## 8. Luyện tập — Trò chơi Tiếp sức: tìm “Iceland” 🏃  `tiep-suc`

**Điền bảng (chọn Đúng/Sai)** — Trò chơi Tiếp sức (2 đội, mỗi đội 7 bạn): mỗi bạn hoàn thành một lần lặp trên bảng rồi chuyền phấn cho bạn tiếp theo. Trên máy: chọn Đúng/Sai cho từng lần lặp tìm tên nước “Iceland” (lần lặp 1 là ví dụ), rồi bấm Nộp bài.

Lần lặp 1 · Bolivia → Đúng tên nước cần tìm? Sai · Đã hết danh sách? Sai  
Lần lặp 2 · Albania → Đúng tên nước cần tìm? {{}} · Đã hết danh sách? {{}}  
Lần lặp 3 · Scotland → Đúng tên nước cần tìm? {{}} · Đã hết danh sách? {{}}  
Lần lặp 4 · Canada → Đúng tên nước cần tìm? {{}} · Đã hết danh sách? {{}}  
Lần lặp 5 · Vietnam → Đúng tên nước cần tìm? {{}} · Đã hết danh sách? {{}}  
Lần lặp 6 · Iceland → Đúng tên nước cần tìm? {{}} → Đầu ra: {{}}

- Đáp án: Sai · Sai · Sai · Sai · Sai · Sai · Sai · Sai · Đúng · Tìm thấy ở vị trí số 6
- Giải thích: Lần lặp 2 → 5: Sai – Sai. Lần lặp 6: Iceland — Đúng → Tìm thấy ở vị trí số 6; kết thúc (không xét Portugal, Greenland, Germany).

## 9. Máy tìm kiếm: kiểm tra kết quả Tiếp sức 🤖  `kiem-tra-tiep-suc`

**Câu 14** (Vận dụng) — Tìm “Germany” trong danh sách trên cần bao nhiêu lần lặp?
- A. 9 lần ✅
- B. 1 lần
- C. 6 lần
- D. 8 lần
- Giải thích: Germany ở vị trí cuối cùng (số 9) → phải xét cả 9 tên nước.

**Câu 15** (Vận dụng) — Tìm “Japan” (không có trong danh sách), đầu ra của thuật toán là:
- A. Tìm thấy ở vị trí số 1
- B. Tìm thấy ở vị trí số 9
- C. Không tìm thấy (sau 9 lần lặp) ✅
- D. Thuật toán lặp mãi không dừng
- Giải thích: Xét hết 9 tên nước đều Sai, lần lặp 9 đã hết danh sách → “Không tìm thấy”; kết thúc.

**Câu 16** (Vận dụng cao) — Với tìm kiếm tuần tự, phần tử cần tìm càng ở gần cuối danh sách thì càng cần nhiều lần lặp.
- Đáp án: **Đúng**
- Giải thích: Đúng. Thuật toán xét lần lượt từ đầu nên phần tử ở vị trí thứ k cần k lần lặp.

## 10. Trò chơi: Thám tử tìm kiếm 🕵️  `tro-choi`

**Câu 17** (Nhận biết) — Tìm kiếm tuần tự bắt đầu xét từ đâu?
- A. Vị trí đầu tiên của danh sách ✅
- B. Vị trí cuối cùng
- C. Vị trí giữa
- D. Vị trí bất kì
- Giải thích: Bước 1: xét vị trí đầu tiên của danh sách.

**Câu 18** (Nhận biết) — Thuật toán tìm kiếm tuần tự dừng lại khi:
- A. Đã xét được 3 phần tử
- B. Tìm thấy giá trị cần tìm hoặc đã hết danh sách ✅
- C. Gặp phần tử có chữ cái A
- D. Người dùng đoán được kết quả
- Giải thích: Chừng nào chưa tìm thấy và chưa tìm hết thì còn tìm tiếp.

**Câu 19** (Vận dụng) — Danh sách: 7, 3, 9, 5, 2. Tìm số 5 bằng tìm kiếm tuần tự, cần bao nhiêu lần lặp?
- A. 1
- B. 5
- C. 4 ✅
- D. 2
- Giải thích: 7 (Sai), 3 (Sai), 9 (Sai), 5 (Đúng) → 4 lần lặp.

**Câu 20** (Vận dụng) — Danh sách: 7, 3, 9, 5, 2. Tìm số 8, đầu ra là:
- A. Tìm thấy ở vị trí số 3
- B. Tìm thấy ở vị trí số 5
- C. Không tìm thấy ✅
- D. 8
- Giải thích: Không có số 8; xét hết 5 số → “Không tìm thấy”.

**Câu 21** (Thông hiểu) — Trong sơ đồ khối Hình 14.1, nếu “Có đúng họ tên khách hàng cần tìm không?” trả lời Đúng thì:
- A. Xem khách hàng tiếp theo
- B. Ghi ra địa chỉ của khách hàng rồi kết thúc ✅
- C. Hỏi đã hết danh sách chưa
- D. Quay lại Bắt đầu
- Giải thích: Nhánh Đúng: ghi ra địa chỉ của khách hàng → Kết thúc.

**Câu 22** (Thông hiểu) — Nếu chưa tìm thấy và chưa hết danh sách thì thuật toán:
- A. Kết thúc ngay
- B. Trả lời Không tìm thấy
- C. Xét phần tử ở vị trí tiếp theo ✅
- D. Bắt đầu lại từ đầu
- Giải thích: Chưa tìm thấy và chưa tìm hết thì còn tìm tiếp: chuyển đến vị trí tiếp theo.

**Câu 23** (Vận dụng cao) — Vì sao tìm kiếm tuần tự cần kiểm tra “đã hết danh sách chưa”?
- A. Để thuật toán chạy nhanh hơn
- B. Để sắp xếp danh sách
- C. Để đếm số phần tử
- D. Để thuật toán dừng khi giá trị cần tìm không có trong danh sách ✅
- Giải thích: Nếu không có điều kiện này, khi không có giá trị cần tìm, thuật toán sẽ không biết lúc nào dừng.

**Câu 24** (Thông hiểu) — Tìm kiếm tuần tự sử dụng cấu trúc điều khiển nào?
- A. Cấu trúc lặp (có kết hợp kiểm tra điều kiện) ✅
- B. Chỉ cấu trúc tuần tự
- C. Không có cấu trúc
- D. Chỉ vẽ hình
- Giải thích: Chừng nào chưa tìm thấy và chưa tìm hết thì còn tìm tiếp — cấu trúc lặp.

## 11. Vận dụng — Tìm sách trong tủ sách lớp 📚  `tu-sach`

**Câu 25** (Vận dụng) — Tủ sách: Toán học, Văn học, Âm nhạc, Mỹ thuật, Tin học, Vật lý, Hóa học. Tìm “Hóa học” cần bao nhiêu lần lặp?
- A. 1 lần
- B. 7 lần ✅
- C. 5 lần
- D. 6 lần
- Giải thích: Hóa học ở vị trí số 7 (cuối danh sách) → 7 lần lặp; lần lặp 7 trả lời Đúng.

**Câu 26** (Vận dụng cao) — Muốn tìm “Hóa học” nhanh hơn bằng tìm kiếm tuần tự, em có thể sắp xếp tủ sách thế nào?
- A. Để “Hóa học” cuối cùng
- B. Bỏ bớt sách
- C. Đặt những cuốn hay cần tìm ở đầu danh sách ✅
- D. Không thể nhanh hơn
- Giải thích: Tìm kiếm tuần tự xét từ đầu, nên cuốn ở vị trí đầu được tìm thấy sau ít lần lặp hơn.

## 12. Vận dụng — Danh sách sách của em 💡  `van-dung`

**Tự luận 1** — Viết danh sách những cuốn sách em có (theo thứ tự trên giá sách) và tên cuốn sách em cần tìm.
- Hướng trả lời: Ví dụ: Dế Mèn phiêu lưu kí, Tin học 7, Truyện cổ tích Việt Nam, Toán 7, Từ điển Anh – Việt. Cần tìm: Toán 7.

**Tự luận 2** — Mô phỏng các lần lặp tìm cuốn sách đó (mỗi lần lặp: tên sách — đúng sách cần tìm? — đã hết danh sách?) và ghi đầu ra.
- Hướng trả lời: Ví dụ: Lần 1: Dế Mèn phiêu lưu kí — Sai — Sai · Lần 2: Tin học 7 — Sai — Sai · Lần 3: Truyện cổ tích Việt Nam — Sai — Sai · Lần 4: Toán 7 — Đúng → Tìm thấy ở vị trí số 4; kết thúc.

## 13. Tổng kết  `tong-ket`

**Câu 27** (Vận dụng cao) — Danh sách điểm: 8, 6, 9, 6, 10. Dùng tìm kiếm tuần tự tìm điểm 6, thuật toán trả lời:
- A. Tìm thấy ở vị trí số 2 ✅
- B. Tìm thấy ở vị trí số 4
- C. Tìm thấy ở vị trí số 2 và số 4
- D. Không tìm thấy
- Giải thích: Thuật toán dừng ngay khi tìm thấy lần đầu: lần lặp 2 gặp số 6 → Tìm thấy ở vị trí số 2; kết thúc.

**Câu 28** (Vận dụng) — Danh sách có 20 phần tử và không chứa giá trị cần tìm. Thuật toán tìm kiếm tuần tự thực hiện bao nhiêu lần lặp?
- A. 1
- B. 10
- C. 21
- D. 20 ✅
- Giải thích: Phải xét hết 20 phần tử; ở lần lặp 20 đã hết danh sách → “Không tìm thấy”.

