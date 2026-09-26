# KỊCH BẢN BÀI GIẢNG — TIN 9, BÀI 11a: SỬ DỤNG HÀM SUMIF (2 tiết)

## TIẾT 1
1. **Mở đầu — Hộp quà may mắn (5')**
   - HS chọn hộp, trả lời 4 câu ôn tập (1B, 2A, 3C, 4D) và 2 câu dẫn vào bài.
   - Câu cuối: COUNTIF chỉ đếm, không cộng tiền → cần hàm tính tổng theo điều kiện.
2. **Hoạt động 1 SGK (6')**
   - Nhóm 3–4 bạn quan sát Hình 11a.1: 920 ở H2 là gì? H2 liên quan dữ liệu nào?
   - GV mở “Giải mã con số 920” (800 + 120) và giới thiệu =SUMIF(B3:B10,"Ở",D3:D10).
3. **Hàm SUMIF (9')**
   - GV mở sơ đồ cú pháp và Bảng 11a.1.
   - HS gõ thử hai dạng: =SUMIF(A1:A5,">5") → 15; =SUMIF(A2:A5,"Khoa",B2:B5) → 750,000; dự đoán tổng tiền của Minh.
   - Ghép tham số với ý nghĩa (3'); trò chơi “COUNTIF hay SUMIF?” (3').
4. **Từ "Ở" đến F2, địa chỉ tuyệt đối (7')**
   - Thử 1: không có $, kéo ■ xuống → H5 = 0 (sai).
   - Thử 2: có $ → đúng. GV chốt công thức Hình 11a.2.

## TIẾT 2
5. **Thực hành (25')**
   - Sắp xếp các bước.
   - a) Chi tiêu: H2:H10 = SUMIF($B$3:$B$10,F2,$D$3:$D$10); kiểm tra tổng cột H = 13,640; bàn về nhập tên khoản mục thống nhất.
   - b) Câu hỏi SGK tr.47 và trang Thu nhập: H2:H6 = SUMIF($B$3:$B$8,F2,$D$3:$D$8); dòng Tổng = 17,500.
   - Lưu tệp.
6. **Luyện tập (10')**
   - Thêm dòng vào cả hai trang tính, sửa range và sum_range.
   - Thảo luận câu hỏi AI kết luận thiên lệch do dữ liệu không cân bằng.
   - Nhóm tick phiếu tự kiểm tra, gửi GV.
7. **Vận dụng (5' + ở nhà)**
   - KinhPhiTrienLam.xlsx: tổng thu, tổng chi, kinh phí còn lại.
   - Nhóm gửi 2 câu vận dụng; hoàn thiện ở nhà, nộp qua mail hoặc Zalo.
8. **Tổng kết (3')**
   - Thử thách.
   - Dặn xem trước Bài 12a “Sử dụng hàm IF”.
