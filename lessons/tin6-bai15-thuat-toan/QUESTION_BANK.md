# NGÂN HÀNG CÂU HỎI — TIN 6 BÀI 15: THUẬT TOÁN

> Sinh từ `data/lesson.js` (nguồn chính). Sửa câu hỏi trong `data/lesson.js`.

## 1. Khởi động — Gấp hình Đông-Tây-Nam-Bắc 🌸  `khoi-dong`

## 2. Trò chơi: Xếp lại các bước gấp hình 🔢  `sap-xep-gap`

**Sắp xếp** — Các bước gấp hình bị xáo trộn! Sắp xếp lại cho đúng thứ tự rồi bấm Nộp bài.

1. Gấp hai đường chéo của tờ giấy hình vuông để tạo nếp gấp, mở tờ giấy ra.
2. Gấp bốn góc của tờ giấy vào tâm.
3. Lật mặt bên kia.
4. Tiếp tục gấp bốn góc vào tâm.
5. Đặt tờ giấy đã gấp nằm ngang, luồn ngón cái và ngón trỏ của hai tay vào bốn góc ở mặt dưới.
6. Chỉnh sửa các nếp gấp.

## 3. Hoạt động 1: Khái niệm thuật toán 💡  `khai-niem`

**Câu 1** (Thông hiểu) — Câu 1. Nếu đảo thứ tự của bước ❸ và bước ❹, em có gấp được hình trò chơi Đông-Tây-Nam-Bắc không?
- A. Có, thứ tự các bước không quan trọng
- B. Không, vì thay đổi thứ tự các bước thì kết quả sẽ khác ✅
- C. Có, nếu gấp thật nhanh
- D. Không, vì thiếu tờ giấy
- Giải thích: Chỉ khi thực hiện đúng trình tự các bước mới nhận được hình gấp trò chơi. Bỏ qua một bước hoặc đổi thứ tự thì kết quả sẽ khác.

**Câu 2** (Nhận biết) — Câu 2. Trước khi gấp em cần có gì, và gấp xong 6 bước em nhận được gì?
- A. Cần kéo, hồ dán; nhận được tờ giấy vuông
- B. Cần hình trò chơi; nhận được tờ giấy hình vuông
- C. Cần tờ giấy hình vuông; nhận được hình trò chơi Đông-Tây-Nam-Bắc ✅
- D. Cần bút màu; nhận được bức tranh
- Giải thích: Tờ giấy hình vuông là đầu vào; hình trò chơi Đông-Tây-Nam-Bắc là đầu ra.

**Câu 3** (Nhận biết) — Thuật toán là gì? (Câu hỏi 1, SGK tr.64)
- A. Một dãy các cách giải quyết một nhiệm vụ.
- B. Một dãy các kết quả nhận được khi giải quyết một nhiệm vụ.
- C. Một dãy các chỉ dẫn rõ ràng, có trình tự sao cho khi thực hiện những chỉ dẫn này người ta giải quyết được vấn đề hoặc nhiệm vụ đã cho. ✅
- D. Một dãy các dữ liệu đầu vào để giải quyết một nhiệm vụ.
- Giải thích: Đáp án C — đúng khái niệm thuật toán trong SGK.

**Câu 4** (Thông hiểu) — Em hãy chọn các câu đúng. (Câu hỏi 2, SGK tr.64)
- A. Thuật toán có đầu ra là kết quả nhận được sau khi thực hiện các bước của thuật toán. ✅
- B. Thuật toán có đầu vào là các dữ liệu ban đầu. ✅
- C. Thuật toán có đầu vào là kết quả nhận được sau khi thực hiện các bước của thuật toán.
- D. Thuật toán có đầu ra là các dữ liệu ban đầu.
- Giải thích: A, B đúng: đầu vào là dữ liệu ban đầu; đầu ra là kết quả nhận được.

## 4. Trò chơi: Đầu vào hay đầu ra? 🎯  `dau-vao-dau-ra`

**Phân loại** — Xếp mỗi thẻ vào nhóm Đầu vào hoặc Đầu ra của thuật toán tương ứng. Xếp hết rồi bấm Nộp bài.

- **📥 Đầu vào (Input):** 🌸 Gấp hình: tờ giấy hình vuông · ➕ Tính trung bình cộng: hai số a, b · 🥭 Làm kem: xoài, sữa chua, mật ong
- **📤 Đầu ra (Output):** 🌸 Gấp hình: hình trò chơi Đông-Tây-Nam-Bắc · ➕ Tính trung bình cộng: giá trị trung bình cộng của a và b · 🥭 Làm kem: kem sữa chua xoài

## 5. Hoạt động 2: Mô tả thuật toán 🧭  `mo-ta`

**Câu 5** (Nhận biết) — Có những cách nào để mô tả thuật toán? (Chọn các phương án đúng)
- A. Liệt kê các bước bằng ngôn ngữ tự nhiên ✅
- B. Vẽ tranh tuỳ ý
- C. Sử dụng sơ đồ khối ✅
- D. Hát một bài hát
- Giải thích: Hai cách mô tả thuật toán trong bài: liệt kê các bước bằng ngôn ngữ tự nhiên và sơ đồ khối.

**Câu 6** (Thông hiểu) — Câu nào sau đây SAI khi nói về vai trò của mũi tên trong sơ đồ khối của thuật toán? (Câu hỏi 1, SGK tr.65)
- A. Hướng mũi tên cho thấy hướng đi trong sơ đồ khối.
- B. Mũi tên được sử dụng để chỉ hướng thực hiện tiếp theo.
- C. Mũi tên được sử dụng chỉ để kết nối các hình khối trong sơ đồ khối. ✅
- Giải thích: C sai: mũi tên không “chỉ để kết nối” mà còn chỉ hướng thực hiện tiếp theo.

**Câu 7** (Thông hiểu) — Trong Hình 6.2, “Tờ giấy hình vuông” và “Hình trò chơi Đông-Tây-Nam-Bắc” được vẽ bằng hình bình hành. Vì sao?
- A. Vì đó là bước xử lí
- B. Vì đó là đầu vào và đầu ra của thuật toán ✅
- C. Vì đó là bước bắt đầu và kết thúc
- D. Vì hình bình hành đẹp hơn
- Giải thích: Hình bình hành: Đầu vào hoặc Đầu ra. Tờ giấy là đầu vào, hình trò chơi là đầu ra.

## 6. Ghép hình khối với ý nghĩa 🧩  `ghep-hinh`

**Ghép đôi** — Ghép mỗi hình với ý nghĩa phù hợp khi nói về sơ đồ khối của thuật toán. Làm hết rồi bấm Nộp bài.

- 1) Hình oval (màu hồng) ⟶ a) Bắt đầu hoặc Kết thúc
- 2) Hình bình hành (màu xanh) ⟶ c) Đầu vào hoặc Đầu ra
- 3) Hình chữ nhật (màu vàng) ⟶ d) Bước xử lí
- 4) Mũi tên ↓ ⟶ b) Chỉ hướng thực hiện tiếp theo

## 7. Luyện tập 1: Tìm đầu vào, đầu ra 🔍  `luyen-tap-1`

**Câu 8** (Thông hiểu) — a) Thuật toán tính trung bình cộng của hai số a, b có:
- A. Đầu vào: trung bình cộng · Đầu ra: hai số a, b
- B. Đầu vào: hai số a, b · Đầu ra: trung bình cộng của a và b ✅
- C. Đầu vào: tổng a + b · Đầu ra: hai số a, b
- D. Đầu vào: số 2 · Đầu ra: tổng
- Giải thích: Đầu vào: hai số a, b. Đầu ra: giá trị trung bình cộng của a và b.

**Câu 9** (Thông hiểu) — b) Thuật toán tìm ước chung lớn nhất của hai số tự nhiên a và b có đầu ra là:
- A. Ước chung lớn nhất của a và b ✅
- B. Hai số tự nhiên a và b
- C. Tất cả các ước của a
- D. Tổng của a và b
- Giải thích: Đầu vào: hai số tự nhiên a, b. Đầu ra: ước chung lớn nhất của a và b.

## 8. Luyện tập 2: Sơ đồ khối Hình 6.3 ⚙️  `luyen-tap-2`

**Câu 10** (Thông hiểu) — Sơ đồ khối Hình 6.3 mô tả thuật toán gì?
- A. Tính trung bình cộng hai số
- B. Tính tổng hai số a và b ✅
- C. Tìm số lớn hơn
- D. Tính hiệu hai số
- Giải thích: Bước xử lí Tổng ← a + b, đầu ra là giá trị tổng → thuật toán tính tổng hai số a và b.

**Câu 11** (Nhận biết) — Đầu vào và đầu ra của thuật toán Hình 6.3 là:
- A. Đầu vào: giá trị tổng · Đầu ra: a, b
- B. Đầu vào: Bắt đầu · Đầu ra: Kết thúc
- C. Đầu vào: giá trị a, giá trị b · Đầu ra: giá trị tổng ✅
- D. Đầu vào: a + b · Đầu ra: a
- Giải thích: Hai hình bình hành: “Giá trị a, giá trị b” (đầu vào) và “Giá trị tổng” (đầu ra).

**Câu 12** (Vận dụng) — Mô tả lại thuật toán Hình 6.3 dưới dạng liệt kê, cách nào đúng?
- A. 1. Tính Tổng ← a + b. 2. Nhập a, b. 3. Thông báo giá trị tổng.
- B. 1. Thông báo giá trị tổng. 2. Nhập a, b. 3. Tính tổng.
- C. 1. Nhập a. 2. Thông báo a.
- D. 1. Nhập giá trị a, giá trị b. 2. Tổng ← a + b. 3. Thông báo giá trị tổng. ✅
- Giải thích: Nhập đầu vào → xử lí → đưa ra đầu ra, đúng trình tự mũi tên trong sơ đồ.

## 9. Luyện tập 3: Ghép sơ đồ khối trung bình cộng 🧱  `luyen-tap-3`

**Ghép sơ đồ khối** — Luyện tập 3 (SGK tr.66): ghép các hình được đánh số trong Hình 6.4 thành sơ đồ khối của thuật toán tính trung bình cộng của hai số a và b. Ghép xong bấm Nộp bài.

1. ❶ Bắt đầu
2. ❸ Giá trị a, giá trị b
3. ❷ Tổng ← a + b
4. ❹ Trung bình cộng ← Tổng : 2
5. ❻ Giá trị trung bình cộng của a và b
6. ❺ Kết thúc

## 10. Chạy thử thuật toán trung bình cộng ▶️  `chay-thu-tbc`

**Câu 13** (Vận dụng) — Với đầu vào a = 8, b = 6, đầu ra của thuật toán là bao nhiêu?
- A. 14
- B. 8
- C. 7 ✅
- D. 6
- Giải thích: Tổng ← 8 + 6 = 14; Trung bình cộng ← 14 : 2 = 7.

**Câu 14** (Vận dụng cao) — Nếu đặt khối ❻ “Giá trị trung bình cộng của a và b” lên TRƯỚC khối ❹ “Trung bình cộng ← Tổng : 2” thì sao?
- A. Kết quả vẫn đúng như cũ
- B. Máy đưa ra kết quả khi chưa tính trung bình cộng → không nhận được kết quả đúng ✅
- C. Máy tự sửa lại thứ tự
- D. Thuật toán chạy nhanh gấp đôi
- Giải thích: Trình tự các bước rất quan trọng: phải tính xong mới đưa ra được kết quả.

## 11. Vận dụng 1: Thuật toán làm kem sữa chua xoài 🥭  `van-dung`

**Câu 15** (Thông hiểu) — Đầu vào của thuật toán làm kem sữa chua xoài là:
- A. Kem sữa chua xoài
- B. Xoài, sữa chua, mật ong (250 g xoài, 100 g sữa chua, 1 thìa cà phê mật ong) ✅
- C. Ngăn đá tủ lạnh
- D. 7 bước hướng dẫn
- Giải thích: Đầu vào: xoài, sữa chua, mật ong. Đầu ra: kem sữa chua xoài.

**Câu 16** (Nhận biết) — Đầu ra của thuật toán làm kem sữa chua xoài là:
- A. Kem sữa chua xoài ✅
- B. Xoài
- C. Hỗn hợp trong tô
- D. Khuôn làm kem
- Giải thích: Kết quả nhận được sau khi thực hiện 7 bước là món kem sữa chua xoài.

**Câu 17** (Thông hiểu) — Để “dạy” cho AI, cần hai thành phần chính nào?
- A. Màn hình và bàn phím
- B. Dữ liệu và thuật toán ✅
- C. Internet và loa
- D. Mật khẩu và tài khoản
- Giải thích: AI học từ dữ liệu theo các bước chỉ dẫn của thuật toán — dữ liệu và thuật toán là hai thành phần chính.

## 12. Vận dụng 1b: Ghép sơ đồ khối làm kem 🍨  `van-dung-kem`

**Ghép sơ đồ khối** — Vận dụng 1b (SGK tr.66): ghép các hình khối thành sơ đồ khối của thuật toán làm kem sữa chua xoài. Ghép xong bấm Nộp bài.

1. Bắt đầu
2. Lấy 250 g xoài, 100 g sữa chua, 1 thìa cà phê mật ong
3. Cho xoài vào tô
4. Nghiền nát xoài
5. Cho sữa chua và mật ong vào tô
6. Trộn đều hỗn hợp
7. Cho hỗn hợp vào khuôn làm kem
8. Đặt khuôn làm kem vào ngăn đá tủ lạnh trong thời gian ít nhất 4 tiếng
9. Kem sữa chua xoài
10. Kết thúc

## 13. Vận dụng 2: Sơ đồ khối điểm trung bình ba môn 📊  `van-dung-dtb`

**Ghép sơ đồ khối** — Vận dụng 2 (SGK tr.66): ghép sơ đồ khối của thuật toán tính điểm trung bình ba môn Toán (a), Ngữ văn (b), Ngoại ngữ (c). Ghép xong bấm Nộp bài.

1. Bắt đầu
2. Nhập giá trị a, giá trị b, giá trị c
3. Tổng ← a + b + c
4. Trung bình cộng ← Tổng : 3
5. Thông báo giá trị Trung bình cộng
6. Kết thúc

## 14. Vận dụng 2, 3: Liệt kê & thuật toán trong đời sống ✍️  `van-dung-nhom`

**Tự luận 1** — Vận dụng 2: Mô tả thuật toán tính điểm trung bình ba môn Toán, Ngữ văn, Ngoại ngữ theo cách liệt kê các bước.
- Hướng trả lời: 1. Nhập giá trị a, giá trị b, giá trị c. 2. Tổng ← a + b + c. 3. Trung bình cộng ← Tổng : 3. 4. Thông báo giá trị Trung bình cộng.

**Tự luận 2** — Vận dụng 3: Nêu một ví dụ về thuật toán giải quyết một nhiệm vụ trong thực tế. Xác định đầu vào, đầu ra và các bước thực hiện.
- Hướng trả lời: Ví dụ luộc rau muống — Đầu vào: rau muống, nước. Đầu ra: món rau muống luộc. Các bước: 1. Lấy 2 lít nước vào xoong. 2. Đun sôi nước. 3. Cho rau đã rửa sạch vào nước sôi. 4. Chờ rau sôi khoảng 3 phút thì tắt bếp. 5. Bày rau ra đĩa.

## 15. Tổng kết  `tong-ket`

**Câu 18** (Vận dụng cao) — Bạn Minh viết hướng dẫn pha nước chanh: “1. Rót nước vào cốc. 2. Cho vài thứ vào. 3. Khuấy.” Hướng dẫn này chưa phải thuật toán tốt vì:
- A. Có quá ít bước
- B. Bước 2 không rõ ràng — không biết cho gì, bao nhiêu ✅
- C. Không vẽ bằng sơ đồ khối
- D. Không có mũi tên
- Giải thích: Chỉ dẫn ở mỗi bước cần cụ thể, rõ ràng (ví dụ: vắt nửa quả chanh, cho 2 thìa đường).

**Câu 19** (Nhận biết) — Trong sơ đồ khối, bước “Tổng ← a + b” được vẽ bằng hình nào?
- A. Hình oval
- B. Hình bình hành
- C. Hình chữ nhật ✅
- D. Mũi tên
- Giải thích: Tổng ← a + b là bước xử lí → hình chữ nhật.

