# NGÂN HÀNG CÂU HỎI — TIN 8 BÀI 15: GỠ LỖI

> Sinh từ `data/lesson.js` (nguồn chính). Sửa câu hỏi trong `data/lesson.js`.

## 1. Mở đầu — Trò chơi Ô chữ 🔠  `mo-dau`

**Câu 1** (Nhận biết) — Câu 1. Các phép toán và (and), hoặc (or), không phải (not) thuộc kiểu dữ liệu nào?
- Hàng ngang ô chữ: **LOGIC** (chữ khoá thứ 3)
- A. Số
- B. Xâu kí tự
- C. Lôgic ✅
- D. Kí tự
- Giải thích: Và, hoặc, không phải là các phép toán của kiểu lôgic (Bài 13).

**Câu 2** (Nhận biết) — Câu 2. Thuật toán ở hình bên được biểu diễn bằng cách nào?
- _Kèm hình minh hoạ / chương trình (xem trong app)_
- Hàng ngang ô chữ: **SODOKHOI** (chữ khoá thứ 2)
- A. Liệt kê
- B. Sơ đồ khối ✅
- C. Hỗn hợp
- D. Sắp xếp
- Giải thích: Thuật toán được biểu diễn bằng các hình khối nối với nhau bằng mũi tên — sơ đồ khối.

**Câu 3** (Thông hiểu) — Câu 3. Thuật toán ở hình bên thuộc cấu trúc nào?
- _Kèm hình minh hoạ / chương trình (xem trong app)_
- Hàng ngang ô chữ: **LAP** (chữ khoá thứ 1)
- A. Cấu trúc rẽ nhánh dạng thiếu
- B. Cấu trúc rẽ nhánh dạng đủ
- C. Cấu trúc lặp ✅
- D. Cấu trúc tuần tự
- Giải thích: Việc ném bóng được lặp lại khi chưa trúng đích — cấu trúc lặp.

**Câu 4** (Nhận biết) — Câu 4. “Thuật toán tìm số lớn hơn trong hai số a, b”. Đầu ra là:
- Hàng ngang ô chữ: **SOLONHON** (chữ khoá thứ 2)
- A. Hai số a, b
- B. Số lớn hơn ✅
- C. Số bé hơn
- D. Số bằng nhau
- Giải thích: Đầu vào là hai số a, b; đầu ra là số lớn hơn.

**Câu 5** (Nhận biết) — Câu 5. Khi xác định bài toán, thông tin đã cho (dữ liệu đầu vào) được gọi là gì?
- Hàng ngang ô chữ: **INPUT** (chữ khoá thứ 1)
- A. Input ✅
- B. Output
- C. Chương trình
- D. Thuật toán
- Giải thích: Xác định bài toán là xác định đầu vào (Input — thông tin đã cho) và đầu ra (Output — thông tin cần tìm).

**Câu 6** (Vận dụng) — 🔑 Từ khoá hàng dọc gồm 5 chữ cái là gì?
- Đáp án: **GỠ LỖI / GO LOI / GOLOI**
- Giải thích: GỠ LỖI — nội dung của bài học hôm nay.

## 2. 1. Kiểm thử — Hoạt động 1, 2: Đếm số lần đoán 🧪  `kiem-thu`

**Câu 7** (Vận dụng) — Em đoán 3 lần mới đúng. Chương trình Hình 15.1 thông báo “Số lần đoán” là bao nhiêu?
- A. 3
- B. 4
- C. 0
- D. 2 ✅
- Giải thích: Số lần đoán máy hiển thị luôn kém số lần thực tế một đơn vị: đoán 3 lần → máy nói 2.

**Câu 8** (Thông hiểu) — Câu 1 (Hoạt động 2). Chương trình Hình 15.1 không hoạt động được hay có hoạt động nhưng thực hiện không đúng kịch bản?
- A. Không hoạt động được
- B. Có hoạt động nhưng thực hiện không đúng kịch bản ✅
- C. Hoạt động đúng hoàn toàn
- D. Chỉ chạy được khi đoán đúng ngay lần đầu
- Giải thích: Máy vẫn hỏi và trả lời theo các khối lệnh (chương trình hoạt động), nhưng số lần đoán hiển thị không đúng với số lần thực tế — sai kịch bản.

**Câu 9** (Nhận biết) — Câu 2. Mục đích của việc chạy thử chương trình (kiểm thử) là gì?
- A. Làm cho chương trình chạy nhanh hơn
- B. Để chương trình đẹp hơn
- C. Để máy tính tự sửa lỗi
- D. Phát hiện những tình huống bất thường (lỗi) để loại bỏ trước khi chia sẻ chương trình ✅
- Giải thích: Kiểm thử nhằm phát hiện lỗi; lỗi cần được loại bỏ trước khi chương trình được coi là sản phẩm hoàn chỉnh.

**Chạy thử chương trình Scratch (không chấm điểm)** — Kiểm thử chương trình Hình 15.1

## 3. b) Phân loại lỗi: lỗi cú pháp và lỗi lôgic 🐞  `phan-loai-loi`

**Câu 10** (Thông hiểu) — Câu 3. Lỗi trong chương trình Hình 15.1 (số lần đoán hiển thị kém thực tế một đơn vị) thuộc loại lỗi nào?
- A. Lỗi lôgic ✅
- B. Lỗi cú pháp
- C. Lỗi của máy tính
- D. Không phải lỗi
- Giải thích: Các lệnh viết đúng quy tắc, chương trình vẫn chạy nhưng sai kịch bản — lỗi lôgic.

**Câu 11** (Nhận biết) — Lỗi cú pháp xảy ra khi nào?
- A. Khi chương trình chạy nhưng cho kết quả sai
- B. Khi người chơi nhập sai số
- C. Khi máy tính bị hỏng
- D. Khi lệnh viết sai so với quy tắc của ngôn ngữ lập trình, làm chương trình không hoạt động ✅
- Giải thích: Lỗi cú pháp: viết sai quy tắc của ngôn ngữ lập trình → chương trình không hoạt động.

**Câu 12** (Thông hiểu) — Câu hỏi SGK tr.87: Chọn phát biểu đúng nhất về hoạt động gỡ lỗi.
- A. Gỡ lỗi là phát hiện và loại bỏ lỗi. Trong lập trình, không nhất thiết phải gỡ lỗi.
- B. Gỡ lỗi là chạy thử chương trình để phát hiện lỗi. Trong lập trình, không nhất thiết phải gỡ lỗi.
- C. Gỡ lỗi là chạy thử chương trình để phát hiện lỗi. Gỡ lỗi là một phần quan trọng của lập trình.
- D. Gỡ lỗi là phát hiện và loại bỏ lỗi. Gỡ lỗi là một phần quan trọng của lập trình. ✅
- Giải thích: Gỡ lỗi gồm cả phát hiện và loại bỏ lỗi (không chỉ chạy thử để phát hiện), và là một phần quan trọng của lập trình.

## 4. Trò chơi: Lỗi cú pháp hay lỗi lôgic? 🗂️  `phan-loai-tinh-huong`

**Phân loại** — Kéo mỗi tình huống vào đúng cột loại lỗi rồi bấm Kiểm tra.

- **Lỗi cú pháp ⛔:** Viết câu lệnh sai quy tắc của ngôn ngữ lập trình · Chương trình báo lỗi và không chạy được · Gõ sai tên lệnh, VD prnit thay cho print (ngôn ngữ lập trình dạng văn bản) · Thiếu dấu đóng ngoặc trong câu lệnh (ngôn ngữ lập trình dạng văn bản)
- **Lỗi lôgic 🤔:** Số lần đoán hiển thị luôn kém thực tế 1 đơn vị · Nhập 6 mà chương trình nói “6 là số LẺ!” · Đã đoán sai 7 lần mà vẫn được đoán tiếp · Vẽ hình vuông nhưng hình không khép kín

## 5. 2. Hoạt động 3: Phát hiện lỗi và sửa lỗi lôgic 🔍  `phat-hien-loi`

**Câu 13** (Thông hiểu) — Câu 1. Theo kịch bản, biến số lần đoán thay đổi trong tình huống nào?
- A. Khi máy lấy số bí mật
- B. Chỉ khi người chơi đoán đúng
- C. Khi chương trình dừng lại
- D. Tăng 1 đơn vị mỗi khi người chơi nhập một giá trị số (đoán) ✅
- Giải thích: Mỗi lần người chơi nhập một số (đoán), số lần đoán phải tăng 1 đơn vị.

**Câu 14** (Thông hiểu) — Câu 2. Người chơi nhập giá trị (đoán) ở những lệnh nào của Hình 15.1?
- A. (4), (7) và (8) ✅
- B. (2), (9) và (11)
- C. (5) và (6)
- D. (10) và (11)
- Giải thích: Các lệnh hỏi … và đợi (4), (7), (8) nhận giá trị người chơi đoán. (2), (9), (11) là các lệnh khởi tạo, thay đổi, hiển thị số lần đoán.

**Câu 15** (Vận dụng) — Câu 3. Điều gì khác nhau giữa kịch bản và các khối lệnh?
- A. Lệnh (9) tăng số lần đoán 2 đơn vị
- B. Lệnh (9) tăng số lần đoán sau (7) hoặc (8), nhưng không có lệnh tăng số lần đoán sau lệnh (4) ✅
- C. Lệnh (2) đặt số lần đoán thành 100
- D. Lệnh (11) không hiển thị số lần đoán
- Giải thích: Lần đoán đầu tiên ở lệnh (4) không được đếm → số lần đoán luôn kém thực tế 1 đơn vị.

**Chạy thử chương trình Scratch (không chấm điểm)** — ❌ Hình 15.1 (có lỗi): Chạy từng bước, theo dõi biến số lần đoán · ✅ Đã sửa (thêm lệnh 4a): Sửa lỗi: thêm lệnh (4a) “thay đổi số lần đoán một lượng 1” sau lệnh (4)

## 6. Trò chơi: Sắp xếp các bước gỡ lỗi 🧩  `sap-xep-buoc`

**Sắp xếp** — Sắp xếp các bước gỡ lỗi cho một chương trình theo đúng thứ tự rồi bấm Kiểm tra.

1. Chạy thử chương trình với dữ liệu mẫu (kiểm thử)
2. Phát hiện tình huống chương trình chạy không đúng kịch bản
3. Tìm các khối lệnh liên quan, xác định lệnh gây ra lỗi
4. Sửa lỗi (thêm, bớt hoặc chỉnh sửa khối lệnh)
5. Chạy thử lại để kiểm tra lỗi đã được loại bỏ

## 7. Câu hỏi SGK tr.89: Gỡ lỗi chương trình chẵn – lẻ (Hình 15.3) 🔢  `chan-le`

**Câu 16** (Vận dụng) — Chạy chương trình Hình 15.3, nhập n = 7. Mèo nói gì?
- A. 7 là số LẺ!
- B. 7 là số CHẴN!
- C. 0 là số LẺ! ✅
- D. Không nói gì
- Giải thích: Chương trình không gán trả lời cho n nên n vẫn là 0; 0 chia lấy dư 2 bằng 0 → nhánh “thì” → “0 là số LẺ!”. Đã có lỗi!

**Câu 17** (Vận dụng cao) — Chương trình Hình 15.3 có những lỗi nào?
- A. Chỉ sai lệnh dừng lại tất cả
- B. Chưa gán giá trị trả lời cho n; hai thông báo “là số LẺ!” và “là số CHẴN!” bị đổi chỗ ✅
- C. Phải dùng lệnh lặp thay cho nếu … thì
- D. Chỉ cần đổi 2 thành 3
- Giải thích: Thêm lệnh “đặt n thành trả lời” sau lệnh hỏi; n chia lấy dư 2 = 0 thì n là số CHẴN, nếu không thì là số LẺ.

**Chạy thử chương trình Scratch (không chấm điểm)** — ❌ Hình 15.3: Chương trình xác định một số là chẵn hay lẻ · ✅ Đã sửa: Sau khi gỡ lỗi

## 8. 3. Thực hành: Gỡ lỗi trò chơi Đoán số tối đa 7 lần 🛠️  `thuc-hanh`

**Câu 18** (Thông hiểu) — Tình huống 1: đoán đúng sau không quá 7 lần. Lệnh (14) hiển thị gì, vì sao?
- A. Chỉ hiện số lần đoán, không có cụm từ “Số lần đoán:” vì dấu “+” là phép cộng số, không ghép nối chữ ✅
- B. Hiện đầy đủ “Số lần đoán: 3”
- C. Không hiện gì vì lệnh (14) bị bỏ qua
- D. Hiện “Bạn đã thua!”
- Giải thích: Phép toán ghép nối các chữ là “kết hợp”, không phải dấu “+”. Sửa lệnh (14) thành kết hợp (Số lần đoán:) (số lần đoán).

**Câu 19** (Vận dụng) — Tình huống 2: đoán sai lần thứ 7, chương trình vẫn cho đoán thêm một lần nữa. Điều kiện (6) cần đổi thành gì?
- A. trả lời = số bí mật hoặc số lần đoán > 8
- B. trả lời = số bí mật và số lần đoán > 7
- C. số lần đoán > 7
- D. trả lời = số bí mật hoặc số lần đoán > 6 (hoặc số lần đoán = 7) ✅
- Giải thích: Sau lần đoán thứ 7, số lần đoán = 7 — vòng lặp phải kết thúc, nên điều kiện là số lần đoán > 6 hoặc số lần đoán = 7.

**Câu 20** (Vận dụng cao) — Vì sao điều kiện rẽ nhánh ở lệnh (11) phải sửa thành “trả lời = số bí mật”?
- A. Vì Scratch không có phép so sánh >
- B. Vì sau 7 lần đoán vẫn có thể đoán đúng hoặc sai, số lần đoán không cho biết kết quả đúng hay sai ✅
- C. Vì số lần đoán luôn bằng 0
- D. Vì lệnh (11) nằm trong vòng lặp
- Giải thích: Người chơi có thể đoán đúng đúng ở lần thứ 7; chỉ so sánh trả lời với số bí mật mới biết thắng hay thua.

**Chạy thử chương trình Scratch (không chấm điểm)** — ❌ Hình 15.4 (cần gỡ lỗi): Chương trình cần được gỡ lỗi · ✅ Sau khi sửa (Hình 15.5): Chương trình sau khi gỡ lỗi

## 9. Thám tử tìm lệnh gây lỗi 🕵️  `tham-tu`

**Câu 21** (Vận dụng) — Kịch bản: vẽ hình vuông cạnh 100 bước. Chạy thử thấy hình không khép kín. Sửa thế nào?
- _Kèm hình minh hoạ / chương trình (xem trong app)_
- A. Đổi lặp lại 4 thành lặp lại 6
- B. Đổi di chuyển 100 thành 90 bước
- C. Đổi xoay 60 độ thành xoay 90 độ ✅
- D. Bỏ lệnh đặt bút
- Giải thích: Hình vuông: 4 lần × 90° = 360°. Xoay 60° thì hình không khép kín.

**Câu 22** (Thông hiểu) — Kịch bản: nhập a, b rồi nói tổng a + b. Nhập 3 và 5 thì mèo nói “35”. Lỗi ở đâu?
- _Kèm hình minh hoạ / chương trình (xem trong app)_
- A. Dùng phép “kết hợp” (ghép chữ) thay cho phép cộng “+” ✅
- B. Thiếu lệnh hỏi a
- C. Phải nói trong 5 giây
- D. Biến a, b bị đặt nhầm tên
- Giải thích: Kết hợp ghép 3 và 5 thành xâu “35”. Cần dùng phép cộng (a + b) để được 8.

**Câu 23** (Vận dụng cao) — Kịch bản: đếm ngược 10, 9, …, 1 rồi nói “Hết giờ!”. Chạy thử thấy mèo đếm 10, 11, 12, … mãi không dừng. Sửa thế nào?
- _Kèm hình minh hoạ / chương trình (xem trong app)_
- A. Đổi 10 thành 0
- B. Đổi lượng thay đổi 1 thành -1 ✅
- C. Đổi điều kiện thành đếm > 1
- D. Bỏ lệnh nói đếm
- Giải thích: Mỗi vòng đếm phải giảm 1 (thay đổi một lượng -1) thì mới có lúc đếm < 1 để kết thúc vòng lặp.

**Câu 24** (Vận dụng) — Kịch bản: điểm từ 5 trở lên là Đạt. Nhập 5 thì mèo nói “Chưa đạt”. Sửa điều kiện thế nào?
- _Kèm hình minh hoạ / chương trình (xem trong app)_
- A. điểm < 5
- B. điểm = 10
- C. điểm > 6
- D. điểm > 4 (hoặc: điểm > 5 hoặc điểm = 5) ✅
- Giải thích: 5 > 5 sai nên 5 điểm rơi vào nhánh “Chưa đạt”. Với điểm số nguyên, dùng điểm > 4 hoặc (điểm > 5) hoặc (điểm = 5).

## 10. Đúng hay sai? ✅❌  `dung-sai`

**Câu 25** (Thông hiểu) — Chương trình Scratch chạy được, không báo lỗi thì chắc chắn không còn lỗi nào.
- Đáp án: **Sai**
- Giải thích: Chương trình vẫn có thể có lỗi lôgic: chạy được nhưng làm sai kịch bản (như Hình 15.1).

**Câu 26** (Nhận biết) — Với lỗi lôgic, việc xác định lệnh nào gây ra lỗi không phải lúc nào cũng đơn giản.
- Đáp án: **Đúng**
- Giải thích: SGK: lỗi cú pháp dễ phát hiện và sửa; lỗi lôgic khó xác định hơn.

**Câu 27** (Nhận biết) — Có thể chèn lệnh “đợi … giây” vào những vị trí cần quan sát dữ liệu để chạy chương trình theo từng bước.
- Đáp án: **Đúng**
- Giải thích: Hình 15.2b: lệnh đợi giúp dừng tạm thời để theo dõi giá trị biến.

**Câu 28** (Thông hiểu) — Sau khi sửa lỗi thì không cần chạy thử lại chương trình.
- Đáp án: **Sai**
- Giải thích: Phải chạy thử lại để chắc lỗi đã được loại bỏ và không phát sinh lỗi mới.

## 11. Luyện tập: Một cách khác sửa lỗi Hình 15.1 🔁  `luyen-tap`

**Câu 29** (Vận dụng) — Chạy thử: đoán 3 lần mới đúng. Cách nào thông báo đúng “Số lần đoán: 3”?
- A. Cả hai cách
- B. Chỉ cách 2
- C. Chỉ cách 1 ✅
- D. Không cách nào
- Giải thích: Cách 1: bắt đầu từ 1 (đã tính lần đoán ở lệnh (4)), mỗi lần hỏi lại tăng 1 → 3. Cách 2 vẫn chỉ tăng 2 lần (mỗi vòng lặp một lần) → 2.

**Câu 30** (Vận dụng cao) — Vì sao cách 2 vẫn còn lỗi?
- A. Vì số lần tăng vẫn bằng số vòng lặp, mà lần đoán đầu tiên ở lệnh (4) nằm ngoài vòng lặp nên vẫn không được đếm ✅
- B. Vì lệnh thay đổi phải đặt ngoài chương trình
- C. Vì Scratch không cho đặt lệnh trong vòng lặp
- D. Vì số bí mật thay đổi
- Giải thích: Đổi vị trí lệnh (9) trong vòng lặp không làm thay đổi số lần tăng. Kiểm thử giúp phát hiện cách sửa chưa đúng.

**Chạy thử chương trình Scratch (không chấm điểm)** — 🅰️ Cách 1: Cách 1: sửa lệnh (2) — đặt số lần đoán thành 1 · 🅱️ Cách 2: Cách 2: chuyển lệnh (9) lên đầu vòng lặp

## 12. Vận dụng: Đổi vai — máy tính đoán số của em 🤖  `van-dung`

**Câu 31** (Vận dụng) — Em chọn số 90. Máy đoán 61, em trả lời gì?
- A. d
- B. c
- C. t ✅
- D. 90
- Giải thích: 61 thấp hơn 90 → trả lời t (thấp hơn). Máy sẽ đoán trong khoảng 62 đến 120.

**Câu 32** (Vận dụng cao) — Vì sao máy nên đoán số ở giữa khoảng còn lại?
- A. Để mỗi lần đoán loại được khoảng một nửa số khả năng, nên chỉ cần ít lần đoán (không quá 7 lần với 120 số) ✅
- B. Vì Scratch chỉ lấy được số ở giữa
- C. Để máy đoán ngẫu nhiên
- D. Vì người chơi luôn chọn số ở giữa
- Giải thích: Mỗi lần đoán số ở giữa, khoảng tìm kiếm giảm một nửa: 120 → 60 → 30 → 15 → 8 → 4 → 2 → 1. (Mở rộng)

**Chạy thử chương trình Scratch (không chấm điểm)** — Chương trình tham khảo (Mở rộng): máy đoán số em nghĩ

## 13. Tổng kết  `tong-ket`

**Câu 33** (Vận dụng cao) — Chương trình tính diện tích hình chữ nhật: nhập dài 4, rộng 3 thì nói 14. Đây là loại lỗi gì và nên kiểm tra lệnh nào?
- A. Lỗi cú pháp; kiểm tra lệnh khi bấm vào 🏁
- B. Lỗi lôgic; kiểm tra biểu thức tính diện tích (có thể đã tính (dài + rộng) × 2 thay cho dài × rộng) ✅
- C. Không có lỗi
- D. Lỗi lôgic; kiểm tra lệnh hỏi
- Giải thích: Chương trình vẫn chạy nhưng kết quả sai (14 là chu vi) → lỗi lôgic ở biểu thức tính. Đúng là 4 × 3 = 12.

**Câu 34** (Thông hiểu) — Cách nào giúp phát hiện lỗi lôgic hiệu quả?
- A. Xoá hết chương trình rồi viết lại
- B. Chỉ chạy thử một lần với một số bất kì
- C. Đổi màu các khối lệnh
- D. Chạy từng bước, hiện giá trị các biến và so sánh với giá trị tính tay ✅
- Giải thích: Theo dõi sự thay đổi của biến khi chạy từng bước, so sánh với giá trị tính theo cách thủ công để tìm lệnh gây lỗi.

