# NGÂN HÀNG CÂU HỎI — TIN 8 BÀI 12: TỪ THUẬT TOÁN ĐẾN CHƯƠNG TRÌNH

> Sinh từ `data/lesson.js` (nguồn chính). Sửa câu hỏi trong `data/lesson.js`.

## 1. Mở đầu — Trò chơi “Hướng dẫn vẽ hình” ✏️  `mo-dau`

**Câu 1** (Thông hiểu) — Bằng ngôn ngữ lập trình trực quan, bạn Khoa muốn tạo chương trình điều khiển nhân vật di chuyển theo đường đi là các hình như tam giác đều, vuông,… Theo em, bạn Khoa cần thực hiện những công việc gì? (Chọn tất cả ý đúng)
- A. Mô tả các bước nhân vật cần làm (thuật toán) ✅
- B. Ghép các lệnh Scratch tương ứng với từng bước (chương trình) ✅
- C. Chạy thử chương trình, kiểm tra và sửa lỗi ✅
- D. Vẽ sẵn hình tam giác lên sân khấu bằng tay
- Giải thích: Cần xây dựng thuật toán → viết chương trình theo thuật toán → chạy thử, kiểm tra. Vẽ tay không phải là điều khiển nhân vật.

## 2. 1. Hoạt động 1: Mô tả kịch bản dưới dạng thuật toán 🧭  `hd1-thuat-toan`

**Câu 2** (Thông hiểu) — Câu 1. Khi đi hết một cạnh của tam giác đều, nhân vật cần quay trái bao nhiêu độ?
- A. 60 độ
- B. 90 độ
- C. 120 độ ✅
- D. 180 độ
- Giải thích: Góc của tam giác đều là 60 độ nên nhân vật phải quay 180 − 60 = 120 độ (Hình 12.2).

**Câu 3** (Thông hiểu) — Câu 2. Các bước của thuật toán điều khiển nhân vật đi theo tam giác đều (ngôn ngữ tự nhiên) là:
- A. Quay trái 120 độ một lần rồi di chuyển 180 bước
- B. Lặp lại 3 lần: di chuyển 60 bước, quay trái 120 độ ✅
- C. Lặp lại 3 lần: di chuyển 60 bước, quay trái 60 độ
- D. Di chuyển 60 bước, quay trái 120 độ (chỉ một lần)
- Giải thích: Nhân vật lặp lại 3 lần hai hành động: di chuyển 60 bước (độ dài cạnh) và quay trái 120 độ.

**Câu 4** (Nhận biết) — Câu 3. Thuật toán sử dụng những cấu trúc điều khiển nào?
- A. Chỉ cấu trúc tuần tự
- B. Cấu trúc rẽ nhánh và cấu trúc lặp
- C. Chỉ cấu trúc rẽ nhánh
- D. Cấu trúc tuần tự và cấu trúc lặp ✅
- Giải thích: Các lệnh trong mỗi lần lặp thực hiện tuần tự; hai hành động được lặp lại 3 lần.

**Câu 5** (Nhận biết) — Câu 4. Hoạt động lặp được thực hiện mấy lần?
- A. 3 lần — bằng số cạnh tam giác đều ✅
- B. 2 lần
- C. 4 lần
- D. 120 lần
- Giải thích: Số bước lặp bằng 3 (bằng số cạnh của tam giác đều). Khi thực hiện đủ ba lần thì vòng lặp kết thúc.

**Câu 6** (Nhận biết) — Chương trình là gì?
- A. Là hình vẽ trên sân khấu
- B. Là sơ đồ khối của bài toán
- C. Là nhân vật trong Scratch
- D. Là dãy các lệnh điều khiển máy tính thực hiện một thuật toán ✅
- Giải thích: Chương trình là dãy các lệnh điều khiển máy tính thực hiện một thuật toán.

## 3. Câu 5: Ghép bước thuật toán ↔ lệnh Scratch 🔗  `ghep-so-do-lenh`

**Ghép đôi** — Phiếu bài tập số 1 — Câu 5: Ghép mỗi bước trong sơ đồ khối (Hình 12.3a) với lệnh Scratch tương ứng (Hình 12.3b). Làm hết rồi bấm Nộp bài.

- Bắt đầu ⟶ khi bấm vào 🏁
- Lần lặp ← 1 · Lần lặp ≤ 3 · Tăng Lần lặp lên 1 đơn vị ⟶ lặp lại 3
- Di chuyển 60 bước ⟶ di chuyển 60 bước
- Quay trái 120 độ ⟶ xoay ↺ 120 độ

## 4. Mô phỏng: Sơ đồ khối chạy cùng chương trình 🐞  `mo-phong-so-do`

**Câu 7** (Thông hiểu) — Khi biến Lần lặp tăng lên 4 thì điều gì xảy ra?
- A. Nhân vật đi thêm cạnh thứ tư
- B. Điều kiện Lần lặp ≤ 3 sai → vòng lặp kết thúc ✅
- C. Chương trình báo lỗi
- D. Lần lặp quay về 1 và lặp lại mãi
- Giải thích: 4 ≤ 3 là sai nên thoát khỏi vòng lặp và đi đến Kết thúc — đúng 3 lần lặp.

**Mô phỏng Scratch (không chấm điểm)** — Chương trình Hình 12.3 — nhân vật đi theo tam giác đều; sơ đồ khối sáng theo từng lệnh.

## 5. Câu hỏi: Thêm lệnh đợi 1 giây ⏸️  `cau-hoi-doi-1-giay`

**Câu 8** (Vận dụng) — Đặt lệnh đợi 1 giây ở đâu để nhân vật dừng lại 1 giây sau khi đi hết MỖI cạnh?
- A. Ngay dưới khối khi bấm vào 🏁, trước khối lặp lại
- B. Sau khối lặp lại 3 (cuối chương trình)
- C. Bên trong khối lặp lại 3, sau lệnh di chuyển 60 bước ✅
- D. Không cần đặt, Scratch tự dừng
- Giải thích: Lệnh phải ở trong vòng lặp để được thực hiện sau mỗi cạnh. Đặt ngoài vòng lặp thì chỉ dừng một lần.

**Câu 9** (Nhận biết) — Lệnh đợi 1 giây nằm trong nhóm lệnh nào của Scratch?
- A. Điều khiển ✅
- B. Chuyển động
- C. Bút vẽ
- D. Sự kiện
- Giải thích: SGK: nháy chuột vào nhóm lệnh Điều khiển, kéo thả lệnh đợi 1 giây.

## 6. 2. Thực hành — Nhiệm vụ 1: Nhân vật đi theo tam giác đều 💻  `thuc-hanh-1`

**Câu 10** (Nhận biết) — Trong Scratch 3.0, để chọn chế độ hiển thị tiếng Việt em làm thế nào?
- A. Nháy chuột vào biểu tượng quả địa cầu 🌐 trên thanh menu, chọn Tiếng Việt ✅
- B. Chọn nhóm lệnh Chuyển động
- C. Nháy chuột vào nút 🏁
- D. Xoá nhân vật chú Mèo
- Giải thích: Biểu tượng quả địa cầu trên thanh menu dùng để chọn ngôn ngữ hiển thị.

**Câu 11** (Thông hiểu) — Để tạo chương trình Hình 12.3, các lệnh được lấy từ những nhóm lệnh nào?
- A. Âm thanh, Hiển thị
- B. Sự kiện (khi bấm vào 🏁), Điều khiển (lặp lại), Chuyển động (di chuyển, xoay) ✅
- C. Cảm biến, Các biến
- D. Bút vẽ, Âm thanh
- Giải thích: Khi bấm vào 🏁 thuộc nhóm Sự kiện; lặp lại thuộc Điều khiển; di chuyển, xoay thuộc Chuyển động.

**Câu 12** (Thông hiểu) — Chạy chương trình Hình 12.3, em thấy gì trên sân khấu?
- A. Bọ rùa vẽ ra một tam giác đều màu tím
- B. Bọ rùa đứng yên
- C. Bọ rùa vẽ một hình vuông
- D. Bọ rùa di chuyển theo đường đi tam giác đều nhưng không để lại nét vẽ ✅
- Giải thích: Chương trình Hình 12.3 chưa có lệnh của nhóm Bút vẽ nên nhân vật chỉ di chuyển, chưa vẽ — Nhiệm vụ 2 sẽ thêm các lệnh vẽ.

## 7. Nhiệm vụ 2: Vừa di chuyển, vừa vẽ tam giác đều 🎨  `thuc-hanh-2`

**Câu 13** (Nhận biết) — Lệnh ✏️ đặt bút có tác dụng gì?
- A. Xoá hết hình đã vẽ
- B. Dừng chương trình
- C. Đổi màu nhân vật
- D. Khi nhân vật di chuyển sẽ để lại nét vẽ ✅
- Giải thích: Sau lệnh đặt bút, nhân vật di chuyển đến đâu sẽ vẽ nét đến đó; lệnh nhấc bút để thôi vẽ.

**Câu 14** (Thông hiểu) — Vì sao chương trình Hình 12.4 đặt lệnh ✏️ xoá tất cả ở đầu chương trình?
- A. Để xoá nhân vật Bọ rùa
- B. Để xoá các lệnh trong chương trình
- C. Để xoá các nét vẽ cũ trên sân khấu trước khi vẽ lại ✅
- D. Để lưu tệp
- Giải thích: Mỗi lần chạy, xoá tất cả giúp sân khấu sạch nét vẽ cũ rồi mới vẽ hình mới.

**Câu 15** (Nhận biết) — Chương trình được lưu với tên tệp nào?
- A. VeHinh.sb3 ✅
- B. VeHinh.pptx
- C. TamGiac.docx
- D. VeHinh.xlsx
- Giải thích: SGK: lưu tệp với tên VeHinh.sb3 (tệp dự án Scratch 3 có phần mở rộng .sb3).

## 8. Mô phỏng: Bọ rùa vẽ hình 🐞✏️  `bo-rua-ve-hinh`

**Câu 16** (Vận dụng) — Muốn bọ rùa vẽ hình vuông, em sửa chương trình thế nào?
- A. lặp lại 4, xoay 90 độ ✅
- B. lặp lại 4, xoay 120 độ
- C. lặp lại 3, xoay 90 độ
- D. lặp lại 90, xoay 4 độ
- Giải thích: Hình vuông có 4 cạnh, mỗi góc 90 độ nên lặp lại 4 lần, mỗi lần quay 90 độ.

**Mô phỏng Scratch (không chấm điểm)** — Chương trình vẽ hình (Hình 12.4) — sửa số rồi chạy thử — thử thách: vẽ tam giác đều, hình vuông, lục giác đều; sơ đồ khối sáng theo từng lệnh.

## 9. Trò chơi: Sắp xếp các lệnh chương trình Hình 12.4 🧩  `sap-xep-lenh`

**Sắp xếp** — Sắp xếp các khối lệnh theo đúng thứ tự trong chương trình Hình 12.4 (các lệnh bên trong khối lặp lại xếp ngay sau lệnh lặp lại 3) rồi bấm Nộp bài.

1. khi bấm vào 🏁
2. ✏️ xoá tất cả
3. ✏️ đặt bút
4. ✏️ chọn bút màu tím
5. lặp lại 3
6. di chuyển 60 bước
7. xoay ↺ 120 độ
8. đợi 1 giây
9. ✏️ nhấc bút

## 10. Thám tử sửa lỗi chương trình 🕵️  `tham-tu-loi`

**Câu 17** (Vận dụng) — Chương trình vẽ ra hình như bên phải. Lỗi ở đâu?
- _Kèm hình trang mẫu (xem trong app)_
- A. Số lần lặp sai
- B. Thiếu lệnh đặt bút
- C. Góc xoay sai — tam giác đều phải xoay 120 độ ✅
- D. Số bước quá nhỏ
- Giải thích: Xoay 90 độ ba lần thì hình không khép kín. Tam giác đều phải quay 120 độ sau mỗi cạnh.

**Câu 18** (Vận dụng) — Chương trình vẽ ra hình như bên phải. Lỗi ở đâu?
- _Kèm hình trang mẫu (xem trong app)_
- A. Số lần lặp sai — phải lặp lại 3 lần ✅
- B. Góc xoay sai
- C. Thiếu lệnh xoá tất cả
- D. Không có lỗi
- Giải thích: Lặp 2 lần chỉ vẽ được 2 cạnh. Số lần lặp phải bằng số cạnh của tam giác đều là 3.

**Câu 19** (Vận dụng) — Bọ rùa đi hết đường tam giác nhưng sân khấu không có nét vẽ nào. Lỗi ở đâu?
- _Kèm hình trang mẫu (xem trong app)_
- A. Góc xoay sai
- B. Thiếu lệnh ✏️ đặt bút trước khi di chuyển ✅
- C. Số lần lặp sai
- D. Thiếu lệnh đợi 1 giây
- Giải thích: Phải đặt bút thì nhân vật di chuyển mới để lại nét vẽ.

**Câu 20** (Vận dụng cao) — Chương trình vẽ ra một đường thẳng như bên phải. Lỗi ở đâu?
- _Kèm hình trang mẫu (xem trong app)_
- A. Số bước sai
- B. Thiếu lệnh nhấc bút
- C. Số lần lặp sai
- D. Lệnh xoay đặt ngoài khối lặp lại — phải đặt bên trong, sau lệnh di chuyển ✅
- Giải thích: Lệnh xoay nằm ngoài vòng lặp nên nhân vật đi thẳng 3 × 60 bước rồi mới xoay một lần.

## 11. Quy luật số cạnh – số lần lặp – góc xoay 📐  `quy-luat-goc`

**Điền phiếu (hộp chọn)** — Chọn số thích hợp để hoàn thành bảng (có thể thử lại bằng mô phỏng Bọ rùa vẽ hình). Làm hết rồi bấm Nộp bài.

Tam giác đều: lặp lại {{}} lần, mỗi lần xoay {{}} độ  
Hình vuông: lặp lại {{}} lần, mỗi lần xoay {{}} độ  
Lục giác đều: lặp lại {{}} lần, mỗi lần xoay {{}} độ

- Đáp án: 3 · 120 · 4 · 90 · 6 · 60
- Giải thích: Số lần lặp = số cạnh. Mở rộng: sau khi đi hết các cạnh, nhân vật quay đủ một vòng 360 độ nên góc xoay = 360 : số cạnh (360 : 3 = 120; 360 : 4 = 90; 360 : 6 = 60).

## 12. Luyện tập 1: Sơ đồ khối đường đi hình vuông 🟪  `luyen-tap-1`

**Điền phiếu (hộp chọn)** — Luyện tập 1: Chọn nội dung thích hợp để hoàn thành sơ đồ khối mô tả thuật toán khi đường đi của nhân vật là hình vuông. Làm hết rồi bấm Nộp bài.

Bắt đầu → Lần lặp ← 1  
Kiểm tra điều kiện: Lần lặp ≤ {{}}   (Sai → {{}})  
Đúng → Di chuyển 60 bước → Quay trái {{}} độ → Tăng Lần lặp lên {{}} đơn vị → quay lại kiểm tra điều kiện

- Đáp án: 4 · Kết thúc · 90 · 1
- Giải thích: Hình vuông: lặp 4 lần (Lần lặp ≤ 4), mỗi lần di chuyển rồi quay trái 90 độ, tăng Lần lặp lên 1; khi Lần lặp = 5 thì điều kiện sai → Kết thúc.

## 13. Luyện tập 2: Nâng cấp VeHinh.sb3 — nhân vật mới vẽ hình vuông 🦋  `luyen-tap-2`

**Câu 21** (Vận dụng) — Muốn chương trình chạy khi nháy chuột vào nhân vật mới, em dùng lệnh sự kiện nào?
- A. khi bấm vào 🏁
- B. khi bấm vào nhân vật này ✅
- C. đợi 1 giây
- D. lặp lại 4
- Giải thích: Lệnh “khi bấm vào nhân vật này” (nhóm Sự kiện) chạy các lệnh bên dưới khi em nháy chuột vào nhân vật đó.

## 14. Luyện tập 3a: Xe dừng lại trước hòn đá 🚌  `luyen-tap-3`

**Điền phiếu (hộp chọn)** — Bạn Khoa viết kịch bản: Khi xe cách hòn đá nhỏ hơn 120 bước, xe sẽ dừng lại (Hình 12.5). Ghép mỗi lệnh “Di chuyển 5 bước”, “Cách hòn đá < 120 bước?” với ô số 1 và 2 trong sơ đồ khối Hình 12.6. Làm hết rồi bấm Nộp bài.

Ô số 1 (khối hình thoi): {{}}  
Ô số 2 (khối hình chữ nhật): {{}}

- Đáp án: Cách hòn đá < 120 bước? · Di chuyển 5 bước
- Giải thích: Ô 1 là điều kiện (hình thoi): Cách hòn đá < 120 bước? — Sai thì thực hiện ô 2 (Di chuyển 5 bước) rồi quay lại kiểm tra; Đúng thì Kết thúc (xe dừng lại).

## 15. Luyện tập 3b: Chương trình xe buýt 🚌  `xe-buyt-mo-phong`

**Câu 22** (Vận dụng) — Lệnh Scratch nào thực hiện được “lặp lại việc di chuyển 5 bước cho đến khi cách hòn đá nhỏ hơn 120 bước”?
- A. lặp lại 120
- B. lặp lại mãi mãi
- C. lặp lại cho đến khi ⟨khoảng cách đến Rocks < 120⟩ ✅
- D. đợi 120 giây
- Giải thích: Không biết trước số lần lặp nên dùng lặp lại cho đến khi với điều kiện khoảng cách đến Rocks < 120 (nhóm Cảm biến, Các phép toán).

**Câu 23** (Thông hiểu) — Vì sao chương trình có lệnh “đi tới điểm x: -169 y: -122” ở đầu?
- A. Để xe về vị trí xuất phát mỗi lần chạy lại ✅
- B. Để xe dừng lại
- C. Để đo khoảng cách
- D. Để vẽ đường đi
- Giải thích: Mỗi lần bấm 🏁, xe được đưa về điểm xuất phát rồi mới chạy — kết quả chạy lại giống nhau.

**Mô phỏng Scratch (không chấm điểm)** — Xe dừng lại khi cách hòn đá nhỏ hơn 120 bước; sơ đồ khối sáng theo từng lệnh.

## 16. Vận dụng: Đổi tam giác thành hình khác 🔷  `van-dung`

**Câu 24** (Vận dụng) — Đổi đường đi từ tam giác đều sang lục giác đều, những con số nào trong chương trình Hình 12.3 bắt buộc phải thay đổi? (Chọn tất cả ý đúng)
- A. Số lần lặp (3) ✅
- B. Góc xoay (120) ✅
- C. Số bước di chuyển (60)
- D. Không cần thay đổi gì
- Giải thích: Lục giác đều: lặp lại 6 lần, xoay 60 độ. Số bước chỉ quyết định độ dài cạnh.

## 17. Tổng kết  `tong-ket`

**Câu 25** (Vận dụng cao) — Chương trình “lặp lại 5: di chuyển 60 bước, xoay ↺ 72 độ” sẽ vẽ hình gì?
- A. Tam giác đều
- B. Ngũ giác đều ✅
- C. Hình vuông
- D. Hình tròn
- Giải thích: Lặp 5 lần, mỗi lần xoay 72 độ (5 × 72 = 360) → ngũ giác đều.

**Câu 26** (Vận dụng cao) — Sắp xếp đúng quy trình giải quyết bài toán vẽ hình bằng máy tính:
- A. Viết chương trình → chạy thử → xác định thuật toán
- B. Chạy thử → viết chương trình → xác định thuật toán
- C. Xác định thuật toán (các bước) → viết chương trình theo thuật toán → chạy thử, kiểm tra, sửa lỗi ✅
- D. Chỉ cần chạy thử nhiều lần
- Giải thích: Từ thuật toán đến chương trình: mô tả các bước, chuyển thành lệnh, rồi chạy thử để kiểm tra và sửa lỗi.

