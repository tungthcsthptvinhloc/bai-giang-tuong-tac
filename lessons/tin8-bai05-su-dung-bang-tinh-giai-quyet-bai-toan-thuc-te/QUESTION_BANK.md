# NGÂN HÀNG CÂU HỎI — TIN 8 BÀI 5: SỬ DỤNG BẢNG TÍNH GIẢI QUYẾT BÀI TOÁN THỰC TẾ

> Sinh từ `data/lesson.js` (nguồn chính). Sửa câu hỏi trong `data/lesson.js`.

## 1. Mở đầu — Bảng tính của Khoa 💼  `mo-dau`

**Câu 1** (Nhận biết) — Bảng tính bạn Khoa tạo ra ở Hình 5.1 cần bổ sung thông tin gì?
- A. Các giá trị cho cột Doanh thu của các phần mềm ✅
- B. Tên của bố Khoa
- C. Màu nền cho tiêu đề
- D. Không cần bổ sung gì
- Giải thích: Cột Doanh thu (cột E) còn trống — cần tính Doanh thu = Đơn giá × Số lượt mua cho từng phần mềm.

**Câu 2** (Thông hiểu) — Phần mềm “Từ điển” có đơn giá 0 đồng. Điều đó có nghĩa là gì?
- A. Phần mềm bị lỗi
- B. Chưa nhập đơn giá
- C. Phần mềm miễn phí nên doanh thu bằng 0 ✅
- D. Phần mềm bán rất đắt
- Giải thích: Đơn giá bằng 0 là phần mềm miễn phí (SGK tr.22) → Doanh thu = 0 × số lượt mua = 0.

## 2. Hoạt động 1: Tính doanh thu phần mềm — Địa chỉ tương đối 🔄  `hd1-tuong-doi`

**Câu 3** (Nhận biết) — Câu 1 (HĐ1). Gõ công thức tính Doanh thu của phần mềm Quản lí thời gian vào ô E4 (Doanh thu = Đơn giá × Số lượt mua).
- Đáp án: nhập vào E4: **=C4*D4**
- Giải thích: E4: =C4*D4 → 39,999 × 50,000 = 1,999,950,000.

**Câu 4** (Thông hiểu) — Câu 2 (HĐ1). Tính Doanh thu cho các phần mềm còn lại (E5:E9) mà KHÔNG gõ lại công thức: nhập =C4*D4 vào E4 rồi kéo nút điền ■ xuống E9.
- Đáp án: nhập vào E4:E9: **=C4*D4**
- Giải thích: Sao chép công thức: E5 =C5*D5, E6 =C6*D6, … E9 =C9*D9 — địa chỉ tương đối tự thay đổi theo từng dòng.

**Câu 5** (Thông hiểu) — Khi sao chép công thức =C4*D4 từ ô E4 xuống ô E5, địa chỉ ô trong công thức thay đổi thế nào?
- A. Thay đổi theo dòng: =C5*D5 (giữ nguyên vị trí tương đối) ✅
- B. Không thay đổi: vẫn là =C4*D4
- C. Đổi cột: =D4*E4
- D. Báo lỗi
- Giải thích: Địa chỉ tương đối tự động thay đổi khi sao chép công thức nhưng vẫn giữ nguyên vị trí tương đối giữa ô chứa công thức và ô có địa chỉ trong công thức.

**Câu 6** (Thông hiểu) — Câu hỏi SGK tr.22 — Sao chép công thức từ ô E4 đến các ô E6, E7, E8, E9 (Hình 5.2). Công thức trong ô E8 là:
- A. =C4*D4
- B. =C8*D4
- C. =E8*D8
- D. =C8*D8 ✅
- Giải thích: E6 =C6*D6, E7 =C7*D7, E8 =C8*D8, E9 =C9*D9 — mỗi công thức lấy Đơn giá và Số lượt mua ở cùng dòng.

## 3. Hoạt động 2: Thử nghiệm — sao chép =E4*F2 có đúng không? 🧪  `hd2-thu-sai`

**Câu 7** (Thông hiểu) — Câu 2 (HĐ2). Nếu ô F4 có công thức =E4*F2, sao chép từ F4 vào ô F5 thì công thức nhận được tại F5 là gì, có đúng yêu cầu không?
- A. =E5*F2 — đúng yêu cầu
- B. =E4*F2 — đúng yêu cầu
- C. =E5*F3 — không đúng, vì F3 không chứa tỉ lệ 70% ✅
- D. =E5*F5 — đúng yêu cầu
- Giải thích: Địa chỉ tương đối F2 bị dời thành F3 (ô tiêu đề), nên F5 tính sai. Cần giữ cố định ô F2.

## 4. Địa chỉ tuyệt đối — kí hiệu $ 📌  `hd2-tuyet-doi`

**Câu 8** (Vận dụng) — Câu 1 (HĐ2). Gõ công thức tính Doanh thu của công ti cho phần mềm Quản lí thời gian vào ô F4 (Doanh thu × Tỉ lệ ở ô F2 — dùng địa chỉ tuyệt đối) rồi kéo nút điền ■ xuống F9.
- Đáp án: nhập vào F4:F9: **=E4*$F$2**
- Giải thích: F4: =E4*$F$2; sao chép xuống: F5 =E5*$F$2, … F9 =E9*$F$2 — E thay đổi theo dòng, $F$2 giữ nguyên.

**Câu 9** (Thông hiểu) — Câu hỏi SGK tr.24 — 1. Trong Hình 5.3, công thức tại ô F5 là =E5*$F$2. Sao chép công thức này đến ô F6, kết quả sao chép là:
- A. =E6*F3
- B. =E6*$F$2 ✅
- C. =$E$6*F3
- D. =$E$6*$F$2
- Giải thích: E5 (tương đối) thành E6; $F$2 (tuyệt đối) giữ nguyên → =E6*$F$2.

**Câu 10** (Nhận biết) — Câu hỏi SGK tr.24 — 2. Cách nhập kí hiệu $ cho địa chỉ tuyệt đối là:
- A. Gõ kí hiệu $ từ bàn phím khi nhập địa chỉ ô.
- B. Sau khi nhập địa chỉ tương đối, nhấn phím F4 để chuyển thành địa chỉ tuyệt đối.
- C. Sau khi nhập địa chỉ tương đối, nhấn phím F2 để chuyển thành địa chỉ tuyệt đối.
- D. Thực hiện được theo cả hai cách A và B. ✅
- Giải thích: Có thể gõ $ từ bàn phím hoặc nhấn phím F4 sau khi nhập địa chỉ tương đối. Phím F2 dùng để sửa nội dung ô, không chuyển thành địa chỉ tuyệt đối.

## 5. Trò chơi: Tương đối hay tuyệt đối? 🧩  `phan-loai-dia-chi`

**Phân loại** — Xếp mỗi địa chỉ ô vào đúng loại. Xếp hết rồi bấm Nộp bài.

- **🔄 Địa chỉ tương đối:** E4 · C5 · B6 · D10 · AA3
- **📌 Địa chỉ tuyệt đối:** $F$2 · $A$1 · $E$6 · $C$10 · $AB$7

## 6. Trò chơi: Đoán công thức sau khi sao chép 🔮  `doan-cong-thuc`

**Câu 11** (Thông hiểu) — Ô E4 chứa =C4*D4. Sao chép sang ô E7, công thức tại E7 là?
- Đáp án: **=C7*D7**
- Giải thích: Dời xuống 3 dòng: C4 → C7, D4 → D7.

**Câu 12** (Thông hiểu) — Ô F4 chứa =E4*$F$2. Sao chép sang ô F8, công thức tại F8 là?
- Đáp án: **=E8*$F$2**
- Giải thích: E4 (tương đối) → E8; $F$2 (tuyệt đối) giữ nguyên.

**Câu 13** (Vận dụng) — Ô C1 chứa =A1*B1. Sao chép sang ô D1 (sang phải 1 cột), công thức tại D1 là?
- Đáp án: **=B1*C1**
- Giải thích: Dời sang phải 1 cột: A → B, B → C; hàng giữ nguyên.

**Câu 14** (Thông hiểu) — Ô D2 chứa =B2-C2. Sao chép sang ô D10, công thức tại D10 là?
- Đáp án: **=B10-C10**
- Giải thích: Dời xuống 8 dòng: B2 → B10, C2 → C10.

**Câu 15** (Vận dụng cao) — Ô B5 chứa =A5+$A$1. Sao chép sang ô C6, công thức tại C6 là?
- Đáp án: **=B6+$A$1**
- Giải thích: Dời sang phải 1 cột và xuống 1 dòng: A5 → B6; $A$1 giữ nguyên.

**Câu 16** (Vận dụng) — Ô E3 chứa =$B$1*C3. Sao chép sang ô F3, công thức tại F3 là?
- Đáp án: **=$B$1*D3**
- Giải thích: $B$1 giữ nguyên; C3 dời sang phải 1 cột thành D3.

## 7. Thực hành 3: Giải quyết bài toán doanh thu trên Excel 💻  `thuc-hanh-3`

**Sắp xếp** — Thực hành trên Microsoft Excel (2 HS/máy): tạo bảng tính như Hình 5.1, tính Doanh thu và Doanh thu của công ti (Hình 5.5), lưu tệp. Trước khi làm, sắp xếp các bước dưới đây theo đúng thứ tự.

1. Khởi động phần mềm bảng tính, nhập dữ liệu và định dạng như Hình 5.1, lưu tệp
2. Tại ô E4, nhập công thức =C4*D4
3. Sao chép công thức tại ô E4 cho các ô từ E5 đến E9, lưu tệp
4. Tại ô D2 nhập “Tỉ lệ doanh thu của công ti”, tại ô F2 nhập 70%; tại ô F3 nhập tiêu đề “Doanh thu của công ti”
5. Tại ô F4, nhập công thức =E4*$F$2 (gõ $ hoặc nhấn phím F4)
6. Sao chép công thức tại ô F4 đến các ô từ F5 đến F9, lưu tệp

## 8. Thực hành 4: Sao chép dữ liệu từ văn bản, trình chiếu sang trang tính 📋  `thuc-hanh-4`

**Câu 17** (Nhận biết) — Sau khi sao chép bảng trong Word, em chọn ô nào trong trang tính để dán?
- A. Ô bất kì ở giữa bảng
- B. Ô ở góc dưới cùng bên phải của vùng muốn dán
- C. Ô ở góc trên cùng bên trái của vùng muốn dán dữ liệu ✅
- D. Không cần chọn ô
- Giải thích: Chọn ô ở góc trên cùng bên trái của vùng muốn dán dữ liệu rồi chọn Paste (SGK tr.25).

**Câu 18** (Nhận biết) — Tổ hợp phím nào dùng để sao chép (Copy) bảng đã chọn?
- A. Ctrl + C ✅
- B. Ctrl + V
- C. Ctrl + S
- D. Ctrl + X
- Giải thích: Ctrl + C: sao chép; Ctrl + V: dán; Ctrl + S: lưu tệp.

**Câu 19** (Thông hiểu) — Vì sao nên sao chép Bảng 5.1 sang phần mềm bảng tính?
- A. Để bảng đẹp hơn
- B. Để xoá bảng trong Word
- C. Vì Word không lưu được bảng
- D. Để tính toán trên bảng dữ liệu (VD tổng số HS) nhanh chóng, hiệu quả ✅
- Giải thích: Phần mềm bảng tính giúp tính toán tự động trên bảng dữ liệu, nhanh chóng và hiệu quả.

## 9. Luyện tập — Trò chơi “Ai lên cao hơn” 🐰🐢  `ai-len-cao-hon`

**Câu 20** (Nhận biết) — Câu 1. Phần mềm nào được sử dụng để minh hoạ các nội dung về phần mềm bảng tính (SGK)?
- A. Word
- B. PowerPoint
- C. Excel ✅
- D. Paint
- Giải thích: SGK dùng Microsoft Excel phiên bản 2016 để minh hoạ.

**Câu 21** (Thông hiểu) — Câu 2. “Khi thực hiện sao chép công thức, địa chỉ ô tính sẽ ..(1).. để đảm bảo vị trí tương đối giữa ô tính chứa công thức và các ô tính trong công thức là ..(2)..”. Cụm từ thích hợp cho (1) và (2) lần lượt là:
- A. không thay đổi – thay đổi
- B. thay đổi – không thay đổi ✅
- C. không thay đổi – không thay đổi
- D. thay đổi – thay đổi
- Giải thích: Địa chỉ tương đối THAY ĐỔI khi sao chép nhưng vị trí tương đối KHÔNG THAY ĐỔI.

**Câu 22** (Thông hiểu) — Câu 3. Công thức tại ô E4 là =C4+D4, khi sao chép đến ô E5 sẽ thành:
- A. =C4+D4
- B. =C4+D5
- C. =C5+D5 ✅
- D. =C5+D4
- Giải thích: Dời xuống 1 dòng: C4 → C5, D4 → D5.

**Câu 23** (Thông hiểu) — Câu 4. Công thức tại ô E4 là =C4+D4, khi sao chép đến ô E5, địa chỉ cột của các ô tính trong công thức là cột:
- A. C, D ✅
- B. E
- C. C
- D. D
- Giải thích: Sao chép theo cột (xuống dưới) thì cột giữ nguyên: vẫn là cột C và D (=C5+D5).

**Câu 24** (Nhận biết) — Câu 5. Công thức tại E4 là =C4+D4, sao chép đến E5 thì công thức tại E5 là =C5+D5. Các địa chỉ C4, D4, C5, D5 trong các công thức trên đều là:
- A. địa chỉ tuyệt đối
- B. địa chỉ tương đối ✅
- C. địa chỉ hỗn hợp
- D. địa chỉ công thức
- Giải thích: Các địa chỉ tự thay đổi khi sao chép → địa chỉ tương đối.

**Câu 25** (Nhận biết) — Câu 6. Trong Excel, để địa chỉ cột (hoặc hàng) của ô tính không thay đổi khi sao chép công thức, ta thêm dấu nào vào trước tên cột (hoặc tên hàng)?
- A. *
- B. ‘
- C. “
- D. $ ✅
- Giải thích: Kí hiệu $ trước tên cột/tên hàng giữ cố định cột/hàng đó khi sao chép.

**Câu 26** (Vận dụng) — Câu 7 (Mở rộng). Phát biểu nào dưới đây là đúng?
- A. Địa chỉ tương đối: dạng địa chỉ chỉ có tên hàng hoặc tên cột thay đổi khi sao chép công thức sang nơi khác
- B. Địa chỉ hỗn hợp: dạng địa chỉ chỉ có tên hàng hoặc tên cột thay đổi khi sao chép công thức sang nơi khác ✅
- C. Địa chỉ tuyệt đối: dạng địa chỉ có cả tên hàng và tên cột bị thay đổi khi sao chép công thức sang nơi khác
- D. Địa chỉ tuyệt đối: dạng địa chỉ chỉ có thể thay đổi cả tên hàng và tên cột khi sao chép công thức sang nơi khác
- Giải thích: Mở rộng: địa chỉ hỗn hợp (VD C$4, $C4) chỉ có tên hàng hoặc tên cột thay đổi. Địa chỉ tương đối thay đổi cả hai; địa chỉ tuyệt đối không thay đổi.

**Câu 27** (Vận dụng cao) — Câu 8 (Mở rộng). Địa chỉ ô tính C$4 có đặc điểm:
- A. có thể thay đổi (cả tên cột và tên hàng đều có thể thay đổi)
- B. chỉ cột luôn được giữ nguyên, địa chỉ hàng có thể thay đổi
- C. không thay đổi (cả tên cột và tên hàng luôn được giữ nguyên)
- D. địa chỉ cột có thể thay đổi, địa chỉ hàng luôn được giữ nguyên ✅
- Giải thích: Mở rộng: $ đứng trước số hàng 4 → hàng 4 giữ nguyên; cột C không có $ nên có thể thay đổi.

## 10. Luyện tập 1 (SGK tr.26) ✔️  `luyen-tap-1`

**Câu 28** (Vận dụng) — Công thức tại ô C1 (Hình 5.6) là =A1*B1. Sao chép công thức trong ô C1 vào ô E2 thì công thức tại ô E2 sau khi sao chép là:
- A. =C1*D2
- B. =C2*D1
- C. =C2*D2 ✅
- D. =B2*C2
- Giải thích: Từ C1 đến E2: sang phải 2 cột, xuống 1 hàng → A1 thành C2, B1 thành D2 → =C2*D2.

## 11. Luyện tập 2 (SGK tr.26): Mua đồ dùng học tập giảm giá 🛍️  `luyen-tap-2`

**Câu 29** (Vận dụng) — c) Nhập công thức cho các ô D5:D10 tính đơn giá mỗi mặt hàng sau khi được giảm (tỉ lệ giảm lưu ở ô D2). Nhập ở D5 rồi kéo nút điền ■ xuống D10.
- Đáp án: nhập vào D5:D10: **=C5*(1-$D$2)**
- Giải thích: Đơn giá đã giảm = Đơn giá × (1 − Tỉ lệ giảm) → D5 =C5*(1-$D$2) (hoặc =C5-C5*$D$2). $D$2 giữ cố định khi sao chép.

**Câu 30** (Vận dụng) — e) Tính Tổng tiền cho các ô F5:F10 (Tổng tiền = Số lượng × Đơn giá đã giảm). Nhập ở F5 rồi kéo xuống F10.
- Đáp án: nhập vào F5:F10: **=E5*D5**
- Giải thích: F5 =E5*D5, sao chép xuống F6:F10 — cả hai địa chỉ đều thay đổi theo dòng nên dùng địa chỉ tương đối.

**Câu 31** (Vận dụng) — f) Tại ô F11, nhập công thức tính Tổng tiền phải trả cho tất cả các mặt hàng.
- Đáp án: nhập vào F11: **=SUM(F5:F10)**
- Giải thích: =SUM(F5:F10) cộng tổng tiền 6 mặt hàng.

## 12. Vận dụng: Doanh thu 5 phần mềm em quan tâm 🚀  `van-dung`

**Tự luận 1** — Truy cập một số chợ ứng dụng để tìm thông tin về năm phần mềm ứng dụng em quan tâm (đơn giá, số lượt mua,…), tạo bảng tính theo mẫu Hình 5.5, lập công thức tính Doanh thu và Doanh thu của công ti sản xuất phần mềm (giả sử công ti nhận được 75% Doanh thu). Nêu tên 5 phần mềm và các công thức em đã dùng.
- Hướng trả lời: Gợi ý (giáo án): Chợ ứng dụng như Google Play, App Store, Microsoft Store… Bảng gồm TT, Sản phẩm, Đơn giá, Số lượt mua, Doanh thu, Doanh thu của công ti; ô F2 ghi 75%. Công thức: E4 =C4*D4 (sao chép xuống); F4 =E4*$F$2 (sao chép xuống). Lưu ý: chỉ ghi thông tin công khai của phần mềm, không đưa thông tin cá nhân của mình vào bảng tính chia sẻ (8.B2.1).

## 13. Tổng kết  `tong-ket`

**Câu 32** (Vận dụng cao) — Cửa hàng lưu tỉ giá quy đổi ở ô B1. Ô C4 tính tiền quy đổi của mặt hàng ở dòng 4 (số tiền ở ô B4). Công thức nào ở C4 khi sao chép xuống C5:C20 vẫn cho kết quả đúng?
- A. =B4*B1
- B. =$B$4*B1
- C. =B4*$B$1 ✅
- D. =$B$4*$B$1
- Giải thích: Số tiền thay đổi theo dòng → B4 tương đối; tỉ giá cố định → $B$1 tuyệt đối.

**Câu 33** (Thông hiểu) — Ô F4 chứa =E4*$F$2. Sao chép sang ô F9, công thức tại F9 là:
- A. =E9*$F$2 ✅
- B. =E9*$F$7
- C. =E4*$F$2
- D. =E9*F7
- Giải thích: E4 → E9 (tương đối); $F$2 giữ nguyên (tuyệt đối).

