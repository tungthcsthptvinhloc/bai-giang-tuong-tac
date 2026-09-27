# NGÂN HÀNG CÂU HỎI — TIN 7 BÀI 16: THUẬT TOÁN SẮP XẾP

> Sinh từ `data/lesson.js` (nguồn chính). Sửa câu hỏi trong `data/lesson.js`.

## 1. Khởi động — Đổi chỗ hai cốc chất lỏng 🧪  `khoi-dong`

**Câu 1** (Thông hiểu) — Vì sao cần dùng thêm cốc C không đựng gì?
- A. Để có thêm chất lỏng
- B. Nếu đổ trực tiếp cốc này sang cốc kia thì hai chất lỏng sẽ bị trộn lẫn ✅
- C. Để cốc A to hơn
- D. Không cần cốc C
- Giải thích: Cốc C là chỗ chứa tạm: đổ A sang C, rồi B sang A, cuối cùng C sang B — hai chất lỏng không bị trộn lẫn.

**Câu 2** (Vận dụng) — Khái quát thành các bước hoán đổi giá trị hai biến A, B (dùng biến trung gian C):
- A. A ← B; B ← A
- B. C ← A; A ← B; B ← C ✅
- C. C ← B; B ← C; A ← C
- D. A ← C; B ← A; C ← B
- Giải thích: C ← A (cất giá trị A vào C); A ← B; B ← C.

## 2. Sắp xếp các bước hoán đổi 🔢  `hoan-doi`

**Sắp xếp** — Sắp xếp các bước đổi chỗ chất lỏng ở hai cốc A, B theo đúng thứ tự rồi bấm Nộp bài.

1. Đổ chất lỏng xanh ở cốc A sang cốc C
2. Đổ chất lỏng đỏ ở cốc B sang cốc A
3. Đổ chất lỏng xanh ở cốc C sang cốc B

## 3. Thuật toán sắp xếp nổi bọt 🔵  `noi-bot`

**Câu 3** (Thông hiểu) — Trong hình viên bọt, viên bọt ở đáy cốc (số 1) nhẹ hơn viên ngay trên nó (số 3). Điều gì xảy ra?
- A. Không có gì thay đổi
- B. Hai viên đổi chỗ: viên nhẹ hơn (1) nổi lên trên ✅
- C. Viên số 3 chìm xuống đáy và vỡ
- D. Cả hai cùng nổi lên mặt nước
- Giải thích: Viên nhẹ hơn nằm dưới viên nặng hơn thì hai viên đổi chỗ — viên nhẹ nổi lên. Giống như phần tử đứng sau nhỏ hơn phần tử đứng trước thì hoán đổi.

**Câu 4** (Nhận biết) — Kết thúc vòng lặp thứ nhất (Hình 16.2), số nào “nổi” lên vị trí đầu tiên?
- A. 4
- B. 2
- C. 3
- D. 1 ✅
- Giải thích: Vòng lặp thứ nhất đưa phần tử nhỏ nhất (1) lên vị trí đầu: 4 2 3 1 → 1 4 2 3.

**Câu 5** (Thông hiểu) — Vòng lặp thứ hai, dãy 1 4 2 3: so sánh 2 và 3 (3 đứng sau). Kết quả là:
- A. 3 > 2 ⇒ KHÔNG hoán đổi ✅
- B. 3 > 2 ⇒ hoán đổi
- C. 2 < 3 ⇒ hoán đổi
- D. Dừng thuật toán
- Giải thích: Phần tử đứng sau (3) không nhỏ hơn phần tử đứng trước (2) nên KHÔNG hoán đổi (Hình 16.3).

**Câu 6** (Nhận biết) — Thuật toán sắp xếp nổi bọt sắp xếp danh sách bằng cách: (câu hỏi SGK tr.80)
- A. Chọn phần tử có giá trị bé nhất đặt vào đầu danh sách.
- B. Chọn phần tử có giá trị lớn nhất đặt vào đầu danh sách.
- C. Hoán đổi nhiều lần các phần tử liền kề nếu giá trị của chúng không đúng thứ tự. ✅
- D. Chèn phần tử vào vị trí thích hợp để đảm bảo danh sách sắp xếp theo đúng thứ tự.
- Giải thích: Nổi bọt là thuật toán sắp xếp được thực hiện bằng cách hoán đổi nhiều lần các phần tử liền kề nếu giá trị của chúng không đúng thứ tự.

**Câu 7** (Vận dụng) — Dãy có 4 phần tử cần thực hiện bao nhiêu vòng lặp theo SGK?
- A. 4
- B. 2
- C. 3 ✅
- D. 1
- Giải thích: Xét lần lượt vị trí thứ nhất, thứ hai, thứ ba (đến vị trí trước vị trí cuối cùng) → 3 vòng lặp.

## 4. Hoạt động 1 — Phiếu học tập 1: Nổi bọt 3, 5, 4, 1, 2 📝  `phieu-1`

**Điền phiếu (hộp chọn)** — Nhóm hoàn thành Phiếu học tập 1: chọn dãy số sau MỖI lần so sánh khi sắp xếp 3, 5, 4, 1, 2 tăng dần bằng thuật toán nổi bọt (so sánh từ cuối dãy lên, như Hình 16.2 – 16.4). 10 dãy — mỗi dãy 1 điểm. Làm hết rồi bấm Nộp bài.

Đầu vào: 3 5 4 1 2  
Vòng lặp thứ nhất — lần so sánh 1: {{}}  
Vòng lặp thứ nhất — lần so sánh 2: {{}}  
Vòng lặp thứ nhất — lần so sánh 3: {{}}  
Vòng lặp thứ nhất — lần so sánh 4: {{}}  
Vòng lặp thứ hai — lần so sánh 1: {{}}  
Vòng lặp thứ hai — lần so sánh 2: {{}}  
Vòng lặp thứ hai — lần so sánh 3: {{}}  
Vòng lặp thứ ba — lần so sánh 1: {{}}  
Vòng lặp thứ ba — lần so sánh 2: {{}}  
Vòng lặp thứ tư — lần so sánh 1: {{}}  
Đầu ra: 1 2 3 4 5

- Đáp án: 3 5 4 1 2 · 3 5 1 4 2 · 3 1 5 4 2 · 1 3 5 4 2 · 1 3 5 2 4 · 1 3 2 5 4 · 1 2 3 5 4 · 1 2 3 4 5 · 1 2 3 4 5 · 1 2 3 4 5
- Giải thích: Vòng 1: 3 5 4 1 2 (2 và 1 không đổi) → 3 5 1 4 2 → 3 1 5 4 2 → 1 3 5 4 2. Vòng 2: 1 3 5 2 4 → 1 3 2 5 4 → 1 2 3 5 4. Vòng 3: 1 2 3 4 5 → 1 2 3 4 5. Vòng 4: 1 2 3 4 5.

## 5. Em tự sắp xếp nổi bọt 🙋  `tu-lam-noi-bot`

**Câu 8** (Vận dụng) — Sắp xếp nổi bọt (so sánh từ cuối dãy lên) dãy 12, 5, 8, 3, 9: sau vòng lặp thứ nhất, dãy là:
- A. 3 12 5 8 9 ✅
- B. 5 8 3 9 12
- C. 3 5 8 9 12
- D. 12 5 3 8 9
- Giải thích: So sánh 3 và 9 (không đổi) → 8 và 3 (đổi: 12 5 3 8 9) → 5 và 3 (đổi: 12 3 5 8 9) → 12 và 3 (đổi: 3 12 5 8 9).

## 6. Nhiệm vụ 2 — Mô tả thuật toán nổi bọt 🔢  `mo-ta-noi-bot`

**Sắp xếp** — Nhóm viết lại quy trình, rồi sắp xếp các bước mô tả thuật toán nổi bọt bằng ngôn ngữ tự nhiên (SGK tr.80) và bấm Nộp bài.

1. Với vị trí đầu tiên: so sánh hai phần tử đứng cạnh nhau theo thứ tự từ cuối dãy lên vị trí đầu tiên
2. Nếu phần tử đứng sau nhỏ hơn phần tử đứng trước thì đổi chỗ chúng cho nhau
3. Cuối vòng lặp: phần tử nhỏ nhất nổi lên vị trí đầu tiên
4. Thực hiện vòng lặp tương tự với vị trí thứ hai, thứ ba,… đến vị trí trước vị trí cuối cùng
5. Kết thúc: dãy số đã được sắp xếp theo thứ tự từ nhỏ đến lớn

## 7. Thuật toán sắp xếp chọn 👆  `sap-xep-chon`

**Câu 9** (Nhận biết) — Vòng lặp thứ nhất của Hình 16.5 (dãy 3 4 1 5 2): phần tử 3 ở vị trí đầu lần lượt được so sánh với các phần tử nào?
- A. Chỉ với 4
- B. Với 4, 1, 5, 2 (tất cả các phần tử phía sau) ✅
- C. Với 5 và 2
- D. Chỉ các phần tử liền kề
- Giải thích: So sánh từng phần tử (kể từ vị trí thứ hai đến vị trí cuối cùng) với phần tử tại vị trí đầu tiên.

**Câu 10** (Vận dụng) — Kết quả vòng lặp thứ hai (Hình 16.5) là:
- A. 1 4 3 5 2
- B. 1 2 3 5 4
- C. 1 2 4 5 3 ✅
- D. 1 2 3 4 5
- Giải thích: Vị trí thứ hai (4): so với 3 → đổi (1 3 4 5 2); so với 5 → không; so với 2 → đổi (1 2 4 5 3).

**Câu 11** (Vận dụng) — Kết quả vòng lặp thứ ba (Hình 16.5) là:
- A. 1 2 3 5 4 ✅
- B. 1 2 4 5 3
- C. 1 2 3 4 5
- D. 1 2 5 4 3
- Giải thích: Vị trí thứ ba (4): so với 5 → không; so với 3 → đổi → 1 2 3 5 4. Vòng lặp thứ tư: 5 so với 4 → đổi → 1 2 3 4 5.

**Câu 12** (Vận dụng cao) — Điểm khác nhau giữa sắp xếp chọn và sắp xếp nổi bọt (theo SGK) là:
- A. Sắp xếp chọn không cần hoán đổi
- B. Sắp xếp chọn chỉ dùng cho chữ
- C. Nổi bọt so sánh phần tử ở vị trí đang xét với mọi phần tử phía sau
- D. Sắp xếp chọn so sánh trực tiếp phần tử ở vị trí đang xét với các phần tử phía sau; nổi bọt so sánh các cặp phần tử liền kề ✅
- Giải thích: Cả hai đều hoán đổi, nhưng nổi bọt so sánh các cặp liền kề, còn sắp xếp chọn so sánh trực tiếp với phần tử ở vị trí đang xét.

## 8. Hoạt động 2 — Phiếu học tập 2: Sắp xếp chọn 41, 15, 17, 32, 18 📝  `phieu-2`

**Điền phiếu (hộp chọn)** — Hoạt động 2 (SGK tr.82): 5 bạn cầm các số 41, 15, 17, 32, 18; bạn thứ sáu thực hiện sắp xếp chọn. Nhóm hoàn thành Phiếu học tập 2: chọn dãy số sau MỖI lần so sánh (10 dãy — mỗi dãy 1 điểm), rồi bấm Nộp bài.

Đầu vào: 41 15 17 32 18  
Vòng lặp thứ nhất — lần so sánh 1: {{}}  
Vòng lặp thứ nhất — lần so sánh 2: {{}}  
Vòng lặp thứ nhất — lần so sánh 3: {{}}  
Vòng lặp thứ nhất — lần so sánh 4: {{}}  
Vòng lặp thứ hai — lần so sánh 1: {{}}  
Vòng lặp thứ hai — lần so sánh 2: {{}}  
Vòng lặp thứ hai — lần so sánh 3: {{}}  
Vòng lặp thứ ba — lần so sánh 1: {{}}  
Vòng lặp thứ ba — lần so sánh 2: {{}}  
Vòng lặp thứ tư — lần so sánh 1: {{}}  
Đầu ra: 15 17 18 32 41

- Đáp án: 15 41 17 32 18 · 15 41 17 32 18 · 15 41 17 32 18 · 15 41 17 32 18 · 15 17 41 32 18 · 15 17 41 32 18 · 15 17 41 32 18 · 15 17 32 41 18 · 15 17 18 41 32 · 15 17 18 32 41
- Giải thích: Vòng 1: 15 < 41 → đổi (15 41 17 32 18), sau đó không đổi thêm. Vòng 2: 17 < 41 → đổi (15 17 41 32 18). Vòng 3: 32 < 41 → đổi (15 17 32 41 18), 18 < 32 → đổi (15 17 18 41 32). Vòng 4: 32 < 41 → đổi (15 17 18 32 41).

## 9. Em tự sắp xếp chọn 🙋  `tu-lam-chon`

**Câu 13** (Vận dụng) — Sắp xếp chọn dãy 9, 4, 7, 1, 6: sau vòng lặp thứ nhất, dãy là:
- A. 4 9 7 1 6
- B. 1 4 6 7 9
- C. 1 9 7 4 6 ✅
- D. 1 4 7 9 6
- Giải thích: 4 < 9 → đổi (4 9 7 1 6); 7 không nhỏ hơn 4; 1 < 4 → đổi (1 9 7 4 6); 6 không nhỏ hơn 1.

## 10. Nhiệm vụ 2 — Mô tả thuật toán sắp xếp chọn 🔢  `mo-ta-chon`

**Sắp xếp** — Sắp xếp các bước mô tả thuật toán sắp xếp chọn bằng ngôn ngữ tự nhiên (SGK tr.81) rồi bấm Nộp bài.

1. Với vị trí đầu tiên: so sánh từng phần tử (từ vị trí thứ hai đến vị trí cuối cùng) với phần tử tại vị trí đầu tiên
2. Nếu phần tử được xét nhỏ hơn phần tử tại vị trí đầu tiên thì hoán đổi hai phần tử
3. Cuối vòng lặp: phần tử nhỏ nhất được đưa về vị trí đầu tiên
4. Thực hiện vòng lặp tương tự với vị trí thứ hai, thứ ba,… đến vị trí trước vị trí cuối cùng
5. Kết thúc: dãy số đã được sắp xếp theo thứ tự từ nhỏ đến lớn

## 11. Chia bài toán thành những bài toán nhỏ hơn 🧩  `chia-nho`

**Câu 14** (Nhận biết) — Tại sao chúng ta chia bài toán thành những bài toán nhỏ hơn? (câu hỏi SGK tr.82)
- A. Để thay đổi đầu vào của bài toán.
- B. Để thay đổi yêu cầu đầu ra của bài toán.
- C. Để bài toán dễ giải quyết hơn. ✅
- D. Để bài toán khó giải quyết hơn.
- Giải thích: Chia một bài toán thành những bài toán nhỏ hơn giúp thuật toán dễ hiểu và dễ thực hiện hơn.

**Câu 15** (Thông hiểu) — Trong thuật toán sắp xếp nổi bọt và sắp xếp chọn, bài toán nhỏ hơn được dùng lặp lại nhiều lần là:
- A. Hoán đổi giá trị hai phần tử ✅
- B. Tìm kiếm tuần tự
- C. Tính tổng dãy số
- D. In dãy số ra màn hình
- Giải thích: Cả hai thuật toán đều giải quyết dựa trên bài toán nhỏ hơn: hoán đổi giá trị hai phần tử.

## 12. Ví dụ: Sắp xếp lại tủ sách 📚  `tu-sach`

**Sắp xếp** — Sắp xếp các việc nhỏ để hoàn thành nhiệm vụ “sắp xếp lại một tủ sách” theo thứ tự hợp lí rồi bấm Nộp bài.

1. Lấy tất cả các quyển sách ra khỏi tủ sách
2. Sắp xếp các quyển sách thành từng chồng theo chủ đề
3. Chọn một chủ đề, sắp xếp các quyển sách theo thứ tự tên sách
4. Đặt các quyển sách của chủ đề đã được sắp xếp vào tủ sách
5. Lặp lại hai bước ngay phía trên với các chủ đề chưa được chọn

## 13. Luyện tập — Trò chơi “Cùng nhau sắp xếp” 🏃  `luyen-tap`

**Câu 16** (Vận dụng) — Luyện tập 1 — nổi bọt dãy 3, 2, 4, 1, 5: các lần hoán đổi lần lượt cho các dãy nào?
- A. 3 2 1 4 5 → 3 1 2 4 5 → 1 3 2 4 5 → 1 2 3 4 5 ✅
- B. 2 3 4 1 5 → 1 3 4 2 5 → 1 2 4 3 5 → 1 2 3 4 5
- C. 2 3 1 4 5 → 2 1 3 4 5 → 1 2 3 4 5
- D. 3 2 4 1 5 → 1 2 3 4 5
- Giải thích: Vòng 1: 4 và 1 đổi (3 2 1 4 5), 2 và 1 đổi (3 1 2 4 5), 3 và 1 đổi (1 3 2 4 5). Vòng 2: 3 và 2 đổi (1 2 3 4 5). Các vòng sau không đổi.

**Câu 17** (Vận dụng) — Luyện tập 2 — sắp xếp chọn dãy 3, 2, 4, 1, 5: các lần hoán đổi lần lượt cho các dãy nào?
- A. 3 2 1 4 5 → 3 1 2 4 5 → 1 3 2 4 5 → 1 2 3 4 5
- B. 1 2 4 3 5 → 1 2 3 4 5
- C. 2 3 4 1 5 → 1 3 4 2 5 → 1 2 4 3 5 → 1 2 3 4 5 ✅
- D. 2 3 4 1 5 → 1 2 3 4 5
- Giải thích: Vòng 1: 2 < 3 đổi (2 3 4 1 5), 1 < 2 đổi (1 3 4 2 5). Vòng 2: 2 < 3 đổi (1 2 4 3 5). Vòng 3: 3 < 4 đổi (1 2 3 4 5).

**Câu 18** (Vận dụng cao) — Với dãy 5 phần tử, cả hai thuật toán đều thực hiện bao nhiêu vòng lặp?
- A. 5
- B. 3
- C. 10
- D. 4 ✅
- Giải thích: Xét các vị trí thứ nhất đến thứ tư (vị trí trước vị trí cuối cùng) → 4 vòng lặp; tổng cộng 4 + 3 + 2 + 1 = 10 lần so sánh.

## 14. Trò chơi: Bong bóng lên mặt nước 🔵  `tro-choi`

**Câu 19** (Nhận biết) — Hoán đổi giá trị hai biến A, B cần dùng thêm:
- A. Một biến trung gian C ✅
- B. Hai biến trung gian
- C. Không cần gì thêm
- D. Một máy tính khác
- Giải thích: C ← A; A ← B; B ← C.

**Câu 20** (Nhận biết) — Sắp xếp nổi bọt (SGK) so sánh:
- A. Phần tử đầu với phần tử cuối
- B. Hai phần tử đứng cạnh nhau ✅
- C. Phần tử đang xét với mọi phần tử phía sau
- D. Các phần tử ở vị trí chẵn
- Giải thích: Nổi bọt so sánh từng cặp phần tử cạnh nhau (từ cuối dãy lên) và hoán đổi nếu sai thứ tự.

**Câu 21** (Thông hiểu) — Sắp xếp tăng dần: phần tử đứng sau nhỏ hơn phần tử đứng trước thì:
- A. Giữ nguyên
- B. Xoá phần tử đứng sau
- C. Đổi chỗ chúng cho nhau ✅
- D. Dừng thuật toán
- Giải thích: Nếu phần tử đứng sau nhỏ hơn phần tử đứng trước thì đổi chỗ chúng cho nhau.

**Câu 22** (Thông hiểu) — Sắp xếp chọn: cuối vòng lặp thứ nhất, phần tử nào ở vị trí đầu tiên?
- A. Phần tử lớn nhất
- B. Phần tử ban đầu ở vị trí thứ hai
- C. Phần tử cuối dãy
- D. Phần tử nhỏ nhất ✅
- Giải thích: Cuối vòng lặp thứ nhất, phần tử nhỏ nhất được đưa về vị trí đầu tiên.

**Câu 23** (Vận dụng) — Sắp xếp chọn dãy 6, 2, 8, 1: sau vòng lặp thứ nhất, dãy là:
- A. 2 6 8 1
- B. 1 6 8 2 ✅
- C. 1 2 6 8
- D. 1 2 8 6
- Giải thích: 2 < 6 đổi (2 6 8 1); 8 không nhỏ hơn 2; 1 < 2 đổi (1 6 8 2).

**Câu 24** (Vận dụng) — Nổi bọt (so sánh từ cuối dãy lên) dãy 6, 2, 8, 1: sau vòng lặp thứ nhất, dãy là:
- A. 1 6 2 8 ✅
- B. 2 6 1 8
- C. 1 2 6 8
- D. 6 2 1 8
- Giải thích: 8 và 1 đổi (6 2 1 8); 2 và 1 đổi (6 1 2 8); 6 và 1 đổi (1 6 2 8).

**Câu 25** (Vận dụng) — Dãy 6 phần tử cần bao nhiêu vòng lặp theo SGK?
- A. 6
- B. 3
- C. 5 ✅
- D. 12
- Giải thích: Đến vị trí trước vị trí cuối cùng → 6 − 1 = 5 vòng lặp.

**Câu 26** (Vận dụng cao) — Muốn sắp xếp điểm theo thứ tự GIẢM dần, khi so sánh em hoán đổi khi nào?
- A. Khi phần tử đứng sau nhỏ hơn
- B. Khi hai phần tử bằng nhau
- C. Không bao giờ hoán đổi
- D. Khi phần tử đứng sau lớn hơn ✅
- Giải thích: Giảm dần: phần tử lớn phải đứng trước, nên hoán đổi khi phần tử đứng sau lớn hơn.

## 15. Vận dụng — Sắp xếp điểm Tin học của tổ em 💡  `van-dung`

**Tự luận 1** — Viết danh sách tên và điểm Tin học của các bạn trong tổ (theo thứ tự ban đầu).
- Hướng trả lời: Ví dụ: Lan 8 · Minh 10 · Hà 7 · Tuấn 9 · Vy 6.

**Tự luận 2** — Em dùng thuật toán nào? Ghi các bước sắp xếp điểm giảm dần và danh sách tên các bạn theo kết quả sắp xếp.
- Hướng trả lời: Ví dụ (sắp xếp chọn, giảm dần): vòng 1: 10 8 7 9 6; vòng 2: 10 9 7 8 6; vòng 3: 10 9 8 7 6; vòng 4: không đổi. Danh sách: Minh (10), Tuấn (9), Lan (8), Hà (7), Vy (6).

## 16. Tổng kết  `tong-ket`

**Câu 27** (Vận dụng cao) — Dãy 2, 5, 1, 4. Sau vòng lặp thứ nhất: nổi bọt (SGK) cho dãy X, sắp xếp chọn cho dãy Y. X và Y là:
- A. X = 1 2 5 4; Y = 1 5 2 4 ✅
- B. X = 1 5 2 4; Y = 1 2 5 4
- C. X = 1 2 4 5; Y = 1 2 4 5
- D. X = 2 1 5 4; Y = 1 2 5 4
- Giải thích: Nổi bọt: 1 và 4 không đổi → 5 và 1 đổi (2 1 5 4) → 2 và 1 đổi (1 2 5 4). Chọn: 5 không nhỏ hơn 2; 1 < 2 đổi (1 5 2 4); 4 không nhỏ hơn 1.

**Câu 28** (Thông hiểu) — Điều gì giống nhau ở thuật toán nổi bọt và sắp xếp chọn?
- A. Đều không cần so sánh
- B. Đều dùng lặp lại bài toán nhỏ hơn là hoán đổi giá trị hai phần tử ✅
- C. Đều chỉ sắp xếp được chữ
- D. Đều cần danh sách đã sắp xếp trước
- Giải thích: Bài toán sắp xếp được giải quyết dựa trên lời giải của bài toán nhỏ hơn: hoán đổi giá trị hai phần tử.

