# NGÂN HÀNG CÂU HỎI — TIN 8 BÀI 14: CẤU TRÚC ĐIỀU KHIỂN

> Sinh từ `data/lesson.js` (nguồn chính). Sửa câu hỏi trong `data/lesson.js`.

## 1. Mở đầu — Trò chơi “Nhanh mắt, nhanh tay” 🔎  `mo-dau`

**Câu 1** (Nhận biết) — Câu 1. Những cấu trúc điều khiển nào em đã học ở Tin học lớp 6 và lớp 7? (Chọn tất cả ý đúng)
- A. Cấu trúc tuần tự ✅
- B. Cấu trúc bảng
- C. Cấu trúc rẽ nhánh ✅
- D. Cấu trúc lặp ✅
- Giải thích: Ba cấu trúc điều khiển cơ bản là tuần tự, rẽ nhánh và lặp.

**Câu 2** (Nhận biết) — Câu 2. Cấu trúc tuần tự là cấu trúc xác định … các bước được thực hiện.
- A. số lần
- B. thứ tự ✅
- C. điều kiện
- D. kết quả
- Giải thích: Cấu trúc tuần tự xác định thứ tự các bước được thực hiện.

**Câu 3** (Nhận biết) — Câu 3. Cấu trúc rẽ nhánh có hai dạng là:
- A. dạng ngắn và dạng dài
- B. dạng đơn và dạng kép
- C. dạng trong và dạng ngoài
- D. dạng khuyết và dạng đầy đủ ✅
- Giải thích: Cấu trúc rẽ nhánh có hai dạng: dạng khuyết và dạng đầy đủ (Tin học 6 gọi là dạng thiếu và dạng đủ).

**Bảng tìm chữ (không chấm điểm)** — Nhanh mắt, nhanh tay: TUANTU (tuần tự), RENHANH (rẽ nhánh), LAP (lặp), THUTU (thứ tự), KHUYET (khuyết), DAYDU (đầy đủ)

## 2. 1. Hoạt động 1: Trò chơi Đoán số 🎲  `hd1-doan-so`

**Câu 4** (Nhận biết) — Mỗi lần em đoán sai, máy tính làm gì?
- A. Kết thúc trò chơi
- B. Cho biết số em đoán nhỏ hơn hay lớn hơn số bí mật, rồi hỏi lại ✅
- C. Đổi sang số bí mật khác
- D. Cho biết luôn số bí mật
- Giải thích: Máy so sánh số em đoán với số bí mật, thông báo Quá thấp / Quá cao và hỏi lại.

**Câu 5** (Vận dụng) — Chiến lược nào giúp đoán đúng nhanh nhất?
- A. Đoán lần lượt 1, 2, 3, …
- B. Luôn đoán 100
- C. Đoán số ở giữa khoảng còn lại, rồi thu hẹp một nửa sau mỗi lần ✅
- D. Đoán ngẫu nhiên
- Giải thích: Đoán số ở giữa khoảng (VD 50, rồi 25 hoặc 75…) loại được một nửa số khả năng sau mỗi lần — không quá 7 lần là đoán đúng. (Mở rộng)

**Chạy thử chương trình Scratch (không chấm điểm)** — Chơi thử: Đoán số bí mật

## 3. Nhiệm vụ 1: Sắp xếp thuật toán Hình 14.1a 🧩  `sap-xep-thuat-toan`

**Sắp xếp** — Nhóm: Sắp xếp các bước của thuật toán đọc và hiển thị dữ liệu (Hình 14.1a) theo đúng thứ tự rồi bấm Kiểm tra.

1. Bắt đầu.
2. Gán cho số bí mật một giá trị ngẫu nhiên trong khoảng từ 1 đến 100.
3. Hỏi và nhận giá trị từ bàn phím, lưu vào biến trả lời.
4. Hiển thị số bí mật trong 2 giây.
5. Hiển thị trả lời trong 2 giây.
6. Kết thúc.

## 4. a) Cấu trúc tuần tự ⬇️  `tuan-tu`

**Câu 6** (Nhận biết) — Câu 1. Trò chơi Đoán số cần sử dụng những biến nào?
- A. số bí mật và trả lời ✅
- B. chỉ số bí mật
- C. số lần đoán và điểm
- D. a và b
- Giải thích: Hai biến: số bí mật (máy lấy ngẫu nhiên) và trả lời (người chơi nhập vào).

**Câu 7** (Nhận biết) — Câu 2. Giá trị khởi đầu của biến số bí mật là gì?
- A. Luôn bằng 0
- B. Luôn bằng 100
- C. Số người chơi nhập vào
- D. Một giá trị ngẫu nhiên trong khoảng từ 1 đến 100 ✅
- Giải thích: Lệnh đặt số bí mật thành (lấy ngẫu nhiên từ 1 đến 100).

**Câu 8** (Nhận biết) — Câu 3. Biến trả lời có sẵn trong nhóm lệnh nào của Scratch?
- A. Các biến số
- B. Cảm biến ✅
- C. Hiển thị
- D. Điều khiển
- Giải thích: Lệnh hỏi … và đợi và biến trả lời thuộc nhóm Cảm biến.

**Câu 9** (Thông hiểu) — Câu 4. Trong ngôn ngữ lập trình trực quan, cấu trúc tuần tự được thể hiện như thế nào?
- A. Đặt các khối lệnh vào trong khối lặp
- B. Dùng khối lệnh nếu … thì
- C. Lắp ghép các khối lệnh theo trình tự của các hoạt động, từ trên xuống dưới ✅
- D. Xếp các khối lệnh rời nhau trên vùng kịch bản
- Giải thích: Các khối lệnh được lắp ghép theo đúng trình tự, từ trên xuống dưới.

**Chạy thử chương trình Scratch (không chấm điểm)** — Chạy thử chương trình Hình 14.1b

## 5. b) Cấu trúc rẽ nhánh 🔀  `re-nhanh`

**Câu 10** (Nhận biết) — Câu 1. Câu trả lời của người chơi được chia làm bao nhiêu trường hợp?
- A. 2 trường hợp
- B. 4 trường hợp
- C. 3 trường hợp: bằng, nhỏ hơn, lớn hơn số bí mật ✅
- D. 1 trường hợp
- Giải thích: Bằng → “HOAN HÔ!”; nhỏ hơn → “Quá thấp”; lớn hơn → “Quá cao”.

**Câu 11** (Thông hiểu) — Vì sao chương trình chỉ cần kiểm tra hai lần mà vẫn phân biệt đủ ba trường hợp?
- A. Vì ba trường hợp loại trừ lẫn nhau: không bằng, không nhỏ hơn thì chắc chắn lớn hơn ✅
- B. Vì máy tính chỉ so sánh được hai lần
- C. Vì trường hợp bằng không bao giờ xảy ra
- D. Vì Scratch không có phép so sánh lớn hơn
- Giải thích: Đã loại “bằng” và “nhỏ hơn” thì chỉ còn “lớn hơn” — không cần kiểm tra lần thứ ba.

**Câu 12** (Thông hiểu) — Câu 2. Khối lệnh “nếu … thì … nếu không thì …” là cấu trúc rẽ nhánh dạng nào?
- A. Dạng khuyết
- B. Dạng đầy đủ ✅
- C. Cấu trúc lặp
- D. Cấu trúc tuần tự
- Giải thích: Có cả nhánh “thì” và nhánh “nếu không thì” → rẽ nhánh dạng đầy đủ (Hình 14.3b). Chỉ có “nếu … thì” là dạng khuyết (Hình 14.3a).

**Câu 13** (Vận dụng) — Người chơi nhập 30, số bí mật là 45. Đoạn chương trình Hình 14.3c thông báo gì?
- _Kèm hình trang mẫu (xem trong app)_
- A. HOAN HÔ!
- B. Quá cao!
- C. Không thông báo gì
- D. Quá thấp! ✅
- Giải thích: 30 = 45 sai → sang nhánh nếu không thì; 30 < 45 đúng → nói “Quá thấp!”.

**Chạy thử chương trình Scratch (không chấm điểm)** — Chạy thử đoạn chương trình so sánh (Hình 14.3c)

## 6. c) Cấu trúc lặp 🔁  `lap`

**Câu 14** (Thông hiểu) — Câu 1. Trong trò chơi Đoán số, hoạt động nào được lặp lại và khi nào vòng lặp kết thúc?
- A. Lặp lại việc lấy số bí mật; kết thúc sau 10 lần
- B. Lặp lại việc đoán số (so sánh, máy hỏi lại); kết thúc khi đoán đúng số bí mật ✅
- C. Lặp lại việc nói HOAN HÔ!; không bao giờ kết thúc
- D. Không có hoạt động lặp
- Giải thích: Hoạt động lặp: đoán số (so sánh, nhận xét, máy hỏi lại). Điều kiện kết thúc: trả lời = số bí mật.

**Câu 15** (Nhận biết) — Câu 2. Scratch có mấy khối lệnh lặp, đó là những khối nào?
- A. Một khối: lặp lại 10
- B. Hai khối: lặp lại, liên tục
- C. Bốn khối: lặp lại, liên tục, nếu … thì, đợi
- D. Ba khối: lặp với số lần định trước, lặp vô hạn (liên tục), lặp có điều kiện kết thúc (lặp lại cho đến khi) ✅
- Giải thích: Hình 14.4b, c, d: lặp lại 10 · liên tục · lặp lại cho đến khi.

**Câu 16** (Vận dụng cao) — Câu hỏi SGK tr.82: Cấu trúc lặp nào sau đây KHÔNG được cho trước trong các nhóm lệnh của Scratch?
- A. Lặp một khối lệnh với số lần định trước.
- B. Lặp một khối lệnh vô hạn lần.
- C. Lặp với điều kiện được kiểm tra trước khi thực hiện khối lệnh.
- D. Lặp với điều kiện được kiểm tra sau khi thực hiện khối lệnh. ✅
- Giải thích: Scratch có lặp lại n (A), liên tục (B), lặp lại cho đến khi — kiểm tra điều kiện trước khi thực hiện khối lệnh (C). Không có khối lặp kiểm tra điều kiện sau (D).

**Chạy thử chương trình Scratch (không chấm điểm)** — 🔢 Lặp 10 lần: Lặp với số lần định trước (Hình 14.4b) · ♾️ Liên tục: Lặp vô hạn (Hình 14.4c) · 🎯 Lặp cho đến khi: Lặp có điều kiện kết thúc (Hình 14.4d)

## 7. Trò chơi: Tình huống này dùng cấu trúc nào? 🗂️  `phan-loai`

**Phân loại** — Kéo mỗi tình huống vào cột cấu trúc điều khiển thể hiện rõ nhất trong tình huống đó rồi bấm Kiểm tra.

- **Tuần tự ⬇️:** Buổi sáng: thức dậy → đánh răng → rửa mặt → ăn sáng · Nhập hai số, tính tổng rồi hiển thị kết quả · Pha mì: bóc gói → cho mì vào bát → đổ nước sôi → đậy nắp
- **Rẽ nhánh 🔀:** Nếu trời mưa thì mang áo mưa · Nếu điểm từ 5 trở lên thì Đạt, nếu không thì Chưa đạt · Gặp đèn đỏ thì dừng lại
- **Lặp 🔁:** Chạy 5 vòng quanh sân trường · Đoán số cho đến khi đúng số bí mật · Đèn trang trí nhấp nháy liên tục

## 8. 2. Thực hành: Xây dựng trò chơi Đoán số 🎮  `thuc-hanh`

**Câu 17** (Nhận biết) — Bước 2: khung chương trình (Hình 14.5) được lắp theo cấu trúc nào?
- A. Cấu trúc tuần tự, từ trên xuống dưới ✅
- B. Cấu trúc rẽ nhánh
- C. Cấu trúc lặp vô hạn
- D. Không theo cấu trúc nào
- Giải thích: 6 khối lệnh lắp ghép với nhau theo cấu trúc tuần tự, từ trên xuống dưới.

**Câu 18** (Thông hiểu) — Khối “lặp lại cho đến khi (trả lời = số bí mật)” dừng lặp khi nào?
- A. Sau 10 lần đoán
- B. Khi người chơi đoán sai
- C. Khi người chơi đoán đúng số bí mật ✅
- D. Không bao giờ dừng
- Giải thích: Điều kiện trả lời = số bí mật đúng thì ra khỏi vòng lặp, chương trình nói “HOAN HÔ!”.

**Câu 19** (Thông hiểu) — Trong chương trình hoàn chỉnh, khối rẽ nhánh (nếu trả lời < số bí mật thì … nếu không thì …) được đặt ở đâu?
- A. Trước lệnh đặt số bí mật
- B. Sau lệnh dừng lại tất cả
- C. Ngay dưới lệnh khi bấm vào 🏁
- D. Bên trong khối lặp lại cho đến khi ✅
- Giải thích: Mỗi lần đoán sai, máy so sánh và hỏi lại nên khối rẽ nhánh nằm bên trong vòng lặp.

**Câu 20** (Vận dụng) — Số bí mật là 64. Người chơi lần lượt nhập 50, 75, 64. Máy lần lượt phản hồi gì?
- A. Quá cao!, Quá thấp!, HOAN HÔ!
- B. Quá thấp!, Quá cao!, HOAN HÔ! ✅
- C. Quá thấp!, Quá thấp!, HOAN HÔ!
- D. HOAN HÔ!, Quá cao!, Quá thấp!
- Giải thích: 50 < 64 → Quá thấp!; 75 > 64 → Quá cao!; 64 = 64 → thoát vòng lặp, HOAN HÔ!

**Chạy thử chương trình Scratch (không chấm điểm)** — Chương trình hoàn chỉnh (Hình 14.7)

## 9. Trò chơi: Lắp chương trình Đoán số 🧱  `lap-chuong-trinh`

**Sắp xếp** — Sắp xếp các khối lệnh thành chương trình Đoán số hoàn chỉnh (Hình 14.7). Khối thụt vào nằm bên trong khối phía trên nó. Bấm Kiểm tra.

1. khi bấm vào 🏁
2. đặt số bí mật thành (lấy ngẫu nhiên từ 1 đến 100)
3. hỏi (Hãy cho biết bạn đoán số nào.) và đợi
4. lặp lại cho đến khi ‹trả lời = số bí mật›
5.   nếu ‹trả lời < số bí mật› thì
6.     hỏi (Quá thấp!) và đợi
7.   nếu không thì
8.     hỏi (Quá cao!) và đợi
9. nói (HOAN HÔ!) trong 2 giây
10. dừng lại tất cả

## 10. Thám tử sửa lỗi chương trình 🕵️  `tham-tu`

**Câu 21** (Vận dụng) — Lỗi 1: Người chơi đoán số nhỏ hơn số bí mật thì chương trình đã nói HOAN HÔ! Cần sửa gì?
- _Kèm hình trang mẫu (xem trong app)_
- A. Đổi “Quá thấp!” thành “Quá cao!”
- B. Bỏ lệnh dừng lại tất cả
- C. Sửa điều kiện lặp thành trả lời = số bí mật ✅
- D. Đổi 100 thành 10
- Giải thích: Điều kiện kết thúc vòng lặp phải là đoán đúng: trả lời = số bí mật, không phải trả lời < số bí mật.

**Câu 22** (Vận dụng) — Lỗi 2: Số bí mật là 40, đoán 20 thì máy lại báo “Quá cao!”. Lỗi ở đâu?
- _Kèm hình trang mẫu (xem trong app)_
- A. Hai thông báo trong khối rẽ nhánh bị đảo ngược ✅
- B. Điều kiện lặp sai
- C. Thiếu lệnh hỏi lần đầu
- D. Số bí mật không ngẫu nhiên
- Giải thích: trả lời < số bí mật đúng thì phải hỏi “Quá thấp!”, nhánh nếu không thì mới là “Quá cao!”.

**Câu 23** (Thông hiểu) — Lỗi 3: Chơi nhiều lần, lần nào số bí mật cũng giống nhau và không nằm trong khoảng 1 đến 100. Vì sao?
- _Kèm hình trang mẫu (xem trong app)_
- A. Vì thiếu khối rẽ nhánh
- B. Vì lệnh đặt số bí mật thành 0 chưa lắp biểu thức lấy ngẫu nhiên từ 1 đến 100 ✅
- C. Vì điều kiện lặp sai
- D. Vì dùng lệnh hỏi thay cho lệnh nói
- Giải thích: Khung chương trình (Hình 14.5) đặt số bí mật thành 0; Bước 3 phải lắp biểu thức lấy ngẫu nhiên từ 1 đến 100 vào.

**Câu 24** (Vận dụng cao) — Lỗi 4: Đoán sai một lần thì mèo cứ nói “Quá thấp!” (hoặc “Quá cao!”) mãi, không cho đoán lại. Cần sửa gì?
- _Kèm hình trang mẫu (xem trong app)_
- A. Thay lặp lại cho đến khi bằng lặp lại 10
- B. Bỏ khối rẽ nhánh
- C. Đổi thứ tự hai lệnh đầu
- D. Thay lệnh nói … trong 2 giây bằng lệnh hỏi … và đợi để người chơi nhập lại ✅
- Giải thích: Lệnh nói không nhận câu trả lời mới nên trả lời không đổi, điều kiện lặp không bao giờ đúng → lặp mãi. Phải dùng hỏi … và đợi.

## 11. Luyện tập: Ai nhanh hơn? ⚡ (Bảng 14.1)  `luyen-tap`

**Ghép đôi** — Cặp đôi, thi ai nhanh hơn: ghép mỗi kết quả với đoạn lệnh vẽ ra kết quả đó trong Bảng 14.1. Làm hết rồi bấm Nộp bài.

- 1) Hình ba cạnh ⟶ Đoạn lệnh d
- 2) Hình bốn cạnh ⟶ Đoạn lệnh a
- 3) Hình năm cạnh ⟶ Đoạn lệnh b
- 4) Hình sáu cạnh ⟶ Đoạn lệnh c

## 12. Kiểm chứng: Bọ rùa vẽ hình Bảng 14.1 🐞  `kiem-chung`

**Câu 25** (Vận dụng cao) — Muốn vẽ hình tám cạnh đều với cách làm như Bảng 14.1, số lần lặp và góc xoay là bao nhiêu?
- A. 8 lần, 360 độ
- B. 8 lần, 90 độ
- C. 8 lần, 45 độ ✅
- D. 4 lần, 45 độ
- Giải thích: Lặp 8 lần, mỗi lần xoay 360° : 8 = 45°.

**Mô phỏng Scratch (không chấm điểm)** — Kiểm chứng Bảng 14.1 — thử thách: vẽ tam giác đều, hình vuông, ngũ giác đều, lục giác đều; sơ đồ khối sáng theo từng lệnh.

## 13. Vận dụng 1 (Trạm 1, 3): Giải phương trình ax + b = 0 📐  `van-dung-1`

**Ghép đôi** — Trạm 1, 3: Ghép các khối lệnh a, b, c, d vào các vị trí 1, 2, 3, 4 ở Hình 14.8 để được chương trình giải phương trình ax + b = 0 với a, b nhập từ bàn phím. Được dùng máy tính để kiểm tra kết quả.

- Vị trí 1 ⟶ Khối b — hỏi, đặt a và b thành trả lời
- Vị trí 2 ⟶ Khối d — nếu a = 0 thì … nếu không thì …
- Vị trí 3 ⟶ Khối c — nếu b = 0 thì vô số nghiệm, nếu không thì vô nghiệm
- Vị trí 4 ⟶ Khối a — nói nghiệm -b/a

## 14. Chạy thử: Chương trình giải phương trình ax + b = 0 ▶️  `van-dung-1-chay`

**Câu 26** (Vận dụng) — Nhập a = 0, b = 0. Chương trình nói gì?
- A. Phương trình vô nghiệm!
- B. Nghiệm của phương trình là: -0/0
- C. Phương trình có vô số nghiệm! ✅
- D. Không nói gì
- Giải thích: a = 0 đúng → vào nhánh thì; b = 0 đúng → “Phương trình có vô số nghiệm!”.

**Câu 27** (Vận dụng) — Nhập a = 2, b = 4. Chương trình đi vào nhánh nào và nói gì?
- A. Nhánh nếu không thì của khối a = 0; nói “Nghiệm của phương trình là: -4/2” (tức x = -2) ✅
- B. Nhánh thì của khối a = 0; nói “Phương trình vô nghiệm!”
- C. Không vào nhánh nào
- D. Nhánh thì của khối b = 0
- Giải thích: a = 0 sai → nhánh nếu không thì → nói nghiệm -b/a = -4/2 = -2.

**Chạy thử chương trình Scratch (không chấm điểm)** — Giải phương trình ax + b = 0

## 15. Vận dụng 2 (Trạm 2, 4): Chương trình tìm ước chung lớn nhất 🔢  `van-dung-2`

**Sắp xếp** — Trạm 2, 4: Dựa vào sơ đồ khối Hình 14.9, sắp xếp các khối lệnh của Hình 14.10 thành chương trình tính ước chung lớn nhất của hai số nguyên không âm. Khối thụt vào nằm bên trong khối phía trên nó. Bấm Kiểm tra.

1. 7) khi bấm vào 🏁
2. 5) hỏi (a =) và đợi · đặt a thành (trả lời)
3. 6) hỏi (b =) và đợi · đặt b thành (trả lời)
4. 3) lặp lại cho đến khi ‹(a * b) = 0›
5.   9) nếu ‹a > b› thì
6.     1) đặt a thành (a chia lấy dư b)
7.   9) … nếu không thì
8.     2) đặt b thành (b chia lấy dư a)
9. 4) nói (a + b) trong 5 giây
10. 8) dừng lại tất cả

## 16. Chạy từng bước: Tìm UCLN 👣  `van-dung-2-chay`

**Câu 28** (Vận dụng) — Với a = 12, b = 18, chương trình nói kết quả bao nhiêu?
- A. 6 ✅
- B. 12
- C. 30
- D. 0
- Giải thích: 12 > 18 sai → b = 18 chia lấy dư 12 = 6; 12 > 6 → a = 12 chia lấy dư 6 = 0; a * b = 0 → nói 0 + 6 = 6.

**Câu 29** (Vận dụng cao) — Vì sao khi dừng lặp, chương trình nói a + b mà không nói a hay b?
- A. Vì UCLN luôn là tổng hai số
- B. Vì Scratch không nói được một biến
- C. Vì a + b luôn lớn hơn a và b
- D. Vì khi a * b = 0 thì một số bằng 0, số còn lại là UCLN; không biết trước số nào bằng 0 nên cộng lại ✅
- Giải thích: Vòng lặp dừng khi một trong hai số bằng 0; số còn lại chính là UCLN, a + b cho đúng số đó.

**Chạy thử chương trình Scratch (không chấm điểm)** — Tìm ước chung lớn nhất của hai số

## 17. Tổng kết  `tong-ket`

**Câu 30** (Vận dụng cao) — Chương trình cần hỏi mật khẩu cho đến khi người dùng nhập đúng. Nên dùng khối lệnh nào?
- A. lặp lại 10
- B. liên tục
- C. lặp lại cho đến khi ‹trả lời = mật khẩu› ✅
- D. nếu … thì
- Giải thích: Số lần hỏi không biết trước, dừng khi nhập đúng → lặp có điều kiện kết thúc.

**Câu 31** (Thông hiểu) — Trong trò chơi Đoán số, cấu trúc nào quyết định máy nói “Quá thấp!” hay “Quá cao!”?
- A. Cấu trúc rẽ nhánh dạng đầy đủ ✅
- B. Cấu trúc tuần tự
- C. Cấu trúc lặp vô hạn
- D. Cấu trúc rẽ nhánh dạng khuyết
- Giải thích: Khối nếu ‹trả lời < số bí mật› thì … nếu không thì … — rẽ nhánh dạng đầy đủ.

