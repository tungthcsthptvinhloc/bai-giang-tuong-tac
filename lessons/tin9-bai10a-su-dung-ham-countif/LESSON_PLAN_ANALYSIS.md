# PHÂN TÍCH BÀI HỌC — TIN 9, BÀI 10a: SỬ DỤNG HÀM COUNTIF

## 1. Thông tin bài học
- **Môn / Lớp:** Tin học · Lớp 9
- **Bộ sách:** Kết nối tri thức với cuộc sống
- **Chủ đề:** Chủ đề 4 (lựa chọn a) — Sử dụng bảng tính điện tử nâng cao; dự án Quản lí tài chính gia đình
- **Trang SGK:** 41–44
- **Thời lượng:** 02 tiết (theo giáo án)
  - Mở đầu 5' · HĐ2.1 20' · HĐ2.2 50' · Luyện tập 10' · Vận dụng 5'.

## 2. Mục tiêu (trích giáo án)
- Hiểu cấu trúc, ý nghĩa của hàm COUNTIF; dùng COUNTIF đếm số ô thoả mãn điều kiện.
- Vận dụng COUNTIF giải bài toán thực tế: quản lí tài chính, thống kê kết quả học tập, khảo sát.
- **Năng lực số:** 5.2.TC2b, 5.3.TC2a.
- **Năng lực AI:** 9.C3.2 (cách thu thập dữ liệu: bảng hỏi, cảm biến…); dùng AI tra cứu cú pháp, tìm lỗi công thức và luôn kiểm chứng trên bảng tính.

## 3. CORE KNOWLEDGE
1. Hàm COUNTIF đếm số ô tính trong vùng dữ liệu (range) thoả mãn điều kiện (criteria).
2. **Công thức:** =COUNTIF(range, criteria).
   - range: phạm vi chứa các ô tính cần kiểm tra để đếm.
   - criteria: điều kiện kiểm tra các ô tính trong phạm vi range.
3. **Điều kiện:** ">100", "Yes", "Y*" (trong ngoặc kép) hoặc địa chỉ ô (D2, F2).
4. **Sao chép công thức:** range dùng địa chỉ tuyệt đối ($B$3:$B$10); criteria (F2) tương đối, tự đổi thành F3, F4…
5. **Bổ sung dữ liệu:** phải điều chỉnh vùng range cho bao gồm các hàng mới.

## 4. BẢNG ÁNH XẠ HOẠT ĐỘNG

| # | Hoạt động (giáo án) | id | SGK | Hình thức app | Tương tác |
|---|---|---|---|---|---|
| 1 | HĐ1 Mở đầu (bảng điểm 9A, đếm HS điểm ≥ 8) | `mo-dau` | tr.41 (đoạn dẫn) | Bảng điểm mô phỏng 15 HS (tên hư cấu); 5 câu hỏi tài chính SGK | Trả lời ngắn, trắc nghiệm |
| 2 | HĐ2.1 NV1 (Hoạt động 1 SGK, khăn trải bàn) | `hd1-khoan-chi` | Hình 10a.1 | Bảng Chi tiêu còn dấu ?; minh hoạ COUNTIF “lướt” vùng B3:B10 | Chọn vùng, trả lời ngắn, trắc nghiệm |
| 3 | HĐ2.1 NV2 (mục 1, Bảng 10a.1) | `ham-countif` | tr.42, Bảng 10a.1 | Sơ đồ cú pháp; lưới ví dụ A1:A4 + ô D2 để gõ thử 4 ví dụ | Gõ công thức, dự đoán |
| 4 | HĐ2.1 NV2 (củng cố) | `bang-10a1` | Bảng 10a.1 | Yêu cầu ↔ công thức | Ghép đôi |
| 5 | HĐ2.1 NV3 (câu hỏi tr.43) | `cau-hoi-tr43` | Hình 10a.2 | Thí nghiệm có $ / không có $ bằng nút kéo điền | Bảng thử, trắc nghiệm |
| 6 | HĐ2.2 (các bước SGK) | `cac-buoc` | tr.43 | 5 bước tính số lần chi | Sắp xếp |
| 7 | HĐ2.2 Thực hành a) | `thuc-hanh-chi` | Hình 10a.1, 10a.2 | G2:G10 = COUNTIF($B$3:$B$10,F2) | Gõ công thức + kéo điền, trắc nghiệm |
| 8 | HĐ2.2 Thực hành b) | `thuc-hanh-thu` | Hình 10a.3–10a.5 | G2:G6 = COUNTIF($B$3:$B$8,F2) | Gõ công thức + kéo điền, trắc nghiệm |
| 9 | HĐ2.2 (bài thực hành của giáo án: BangDiem_HS) | `thuc-hanh-bang-diem` | — | Điểm ≥ 8, < 5, số HS nữ; loại Khá (Mở rộng); lỗi AI | Gõ công thức, trắc nghiệm |
| 10 | HĐ3 Bài 1 (trò chơi mở quà bí mật) | `hop-qua` | — | 4 câu giáo án + 4 câu củng cố | Hộp quà |
| 11 | HĐ3 Bài 2 (SGK Luyện tập 1) | `luyen-tap-1` | tr.44 | Chi tiêu thêm 3 hàng (tô vàng), sửa range $B$3:$B$13 | Gõ công thức, trắc nghiệm |
| 12 | HĐ3 Bài 3 (SGK Luyện tập 2) | `luyen-tap-2` | Hình 10a.6 | Khảo sát chọn trường THPT; cách thu thập dữ liệu (9.C3.2) | Gõ công thức, trắc nghiệm |
| 13 | HĐ3 (sản phẩm) | `tu-kiem-tra` | — | Phiếu tự kiểm tra các tệp thực hành, gửi GV | Bảng tick |
| 14 | HĐ4 Vận dụng | `van-dung` | tr.44 | KinhPhiTrienLam.xlsx: số lần thu (Quỹ 4, Tài trợ 5), số lần chi (VPP 5, In tài liệu 6) | Gõ công thức, trắc nghiệm |
| 15 | HĐ4 (ở nhà) | `van-dung-nha` | — | COUNTIF trong cuộc sống; dùng AI có kiểm chứng | Tự luận |
| 16 | Tổng kết | `tong-ket` | — | Em đã học, từ khoá, 2 thử thách (">500", "Nam") | Gõ công thức, trắc nghiệm |

## 5. Ghi chú đối chiếu
- **Bảng tính mô phỏng.** Engine nâng cấp theo lựa chọn của GV:
  - Tính được COUNTIF (và COUNTIFS cho phần Mở rộng); nhận cả dấu `;` như Excel tiếng Việt, và vùng cả cột `B:B`.
  - Thêm **nút kéo điền ■** (fill handle) để sao chép công thức như Excel; cũng điền dãy số (5, 10 → 15, 20) và chữ kèm số (HS01 → HS02…).
- **Thực hành.** GV chọn làm cả hai: nhiệm vụ SGK (Chi tiêu, Thu nhập) và bài Bảng điểm của giáo án (tên HS hư cấu).
- **Đáp án Bài 2, Bài 3 trong giáo án.** Giáo án ghi `G2=COUNTIF(B3:B10,F2)`, `G2=COUTIF(B3:B8,F3)`, `E5=COUNTIF(B4:$$B:$13,D5)` (thiếu hoặc lỗi dấu $, gõ nhầm). App theo SGK: `=COUNTIF($B$3:$B$8,F2)`, `=COUNTIF($B$4:$B$13,D5)`; Luyện tập 1 mở rộng vùng thành `$B$3:$B$13`.
- **Dấu ngăn cách.** Câu 3, 4 Bài 1 của giáo án dùng `;`. App viết theo SGK (dấu `,`), bảng mô phỏng nhận cả hai.
- **Vận dụng.** Giáo án ghi “số lần thu của mỗi khoản chi” — app theo SGK: số lần thu của mỗi khoản thu và số lần chi của mỗi khoản chi. Dữ liệu minh hoạ theo ảnh trong giáo án; nội dung, số tiền là ví dụ; tên khoản mục giữ như Bài 9a (Quỹ, Tài trợ; Văn phòng phẩm, In tài liệu).
- **Chấm công thức.** Chấm bằng thử đổi dữ liệu. Với COUNTIF, bài còn xáo dữ liệu chữ ở vùng `sheet.vary`, nên công thức thiếu $, thiếu hàng hoặc sai cột bị phát hiện. Câu yêu cầu dùng ô điều kiện (F2, D2) mà HS gõ chữ trực tiếp thì chấm sai.
