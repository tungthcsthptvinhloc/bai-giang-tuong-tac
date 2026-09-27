# HƯỚNG DẪN GIÁO VIÊN — TIN 9, BÀI 12a: SỬ DỤNG HÀM IF

## 1. Giới thiệu nhanh
- Bài gồm 2 tiết, 19 màn hoạt động, 53 bài chấm tự động và 2 câu tự luận (Vận dụng).
- **Bảng tính mô phỏng TaiChinhGiaDinh.xlsx:**
  - Giống Hình 12a.2–12a.3; cột A:E được ẩn.
  - HS gõ công thức SUMIF, tỉ lệ, IF, IF lồng nhau; kéo nút điền ■ hoặc Ctrl+C / Ctrl+V để sao chép.
  - Cột Tỉ lệ hiện dạng % như Excel.
- **Máy IF trực quan:**
  - Kéo thanh (hoặc gõ số); sơ đồ nhánh Đúng/Sai sáng lên, hiện kết quả ở ô O3.
  - Có chế độ IF 2 mức / IF lồng nhau 3 mức. Ở Luyện tập, máy tính luôn số tiền thưởng.
- **Ghép sơ đồ IF lồng nhau:** kéo điều kiện, kết quả vào đúng ô của sơ đồ khối.
- **Trò chơi “Đoán kết quả hàm IF”:** 8 câu; đúng thì chú ong 🐝 về vườn hoa 🌻.

## 2. Cách mở và chạy
- **Một máy chiếu:** mở `index.html`, bấm phím `F` để toàn màn hình.
- **Cả lớp:**
  1. Vào bảng GV, chọn lớp và “Bài 12a: Sử dụng hàm IF”.
  2. Bấm ▶ Bắt đầu.
  3. Chiếu mã vào lớp.
  4. Bấm 📺 để trình chiếu.
- **Câu gõ công thức:** HS chọn ô tô vàng, gõ công thức bắt đầu bằng dấu =, nhấn Enter. Chấm bằng cách thử đổi dữ liệu và thử đúng các mốc:
  - Viết > thành >=, sai mốc hoặc đảo thứ tự IF lồng nhau → sai.
  - =M3/$H$11 (không nhân 100%) hoặc H$11 vẫn đúng.
- **Vận dụng:** câu trả lời gửi GV ở tab ✍️ Tự luận; HS nộp tệp Excel qua mail/Zalo.

## 3. Kiến thức trọng tâm
1. Hàm IF kiểm tra điều kiện và trả về một giá trị khi điều kiện đó đúng và một giá trị khác nếu điều kiện đó sai.
2. =IF(logical_test,[value_if_true],[value_if_false]).
3. =IF(N3>50%,"Nhiều hơn","Ít hơn").
4. Nhiều mức → IF lồng nhau: =IF(N3>80%,"Nhiều quá",IF(N3>50%,"Nhiều hơn","Ít hơn")).
5. Kết hợp với SUMIF, =M3/$H$11*100%, phép nhân.

## 4. Lưu ý
- **Luyện tập:** theo lựa chọn của thầy/cô, app sửa đáp án giáo án `=IF(B2>10000%,"5%","0%")` thành đúng theo SGK:
  - Công thức: `=IF(B2>10000,5%,0%)` và `=IF(B2>20000,6%,IF(B2>15000,4%,IF(B2>10000,2%,0%)))`.
  - Kết quả a): A 0%, B 0%, C 5%, D 5% → tiền thưởng 0 · 0 · 600 · 900.
  - Kết quả c): 0% · 0% · 2% · 4% → tiền thưởng 0 · 0 · 240 · 720.
  - Viết "5%" (trong ngoặc kép) bị chấm sai, có câu hỏi giải thích lí do.
- **Vận dụng 2:** mốc do app gợi ý (ghi “Mở rộng”), có chấm điểm. Thầy/cô muốn đổi mốc thì sửa `F_O3` trong `data/lesson.js`.
  - O4 `=IF(N4>40%,"Nhiều quá",IF(N4>30%,"Nhiều hơn","Ít hơn"))`.
  - O5 `=IF(N5>20%,"Nhiều hơn",IF(N5>10%,"Ít hơn","Ít quá"))`.
- **Mở đầu:** app sửa lỗi gõ “SUMTIF” → SUMIF; câu 4 thống nhất vùng A1:A5 cho cả 4 phương án.
- **Đáp án chính:**
  - M3:M5 = 12,340 · 300 · 1,000.
  - N3:N5 = 90.5% · 2.2% · 7.3%.
  - O3:O5 = Nhiều hơn · Ít hơn · Ít hơn.
  - Vận dụng: Nhiều quá · Ít hơn · Ít quá.
- Giáo án gợi ý video AI và ChatGPT/Gemini/Copilot nhưng không có đường link, nên app không thêm nút mở.
