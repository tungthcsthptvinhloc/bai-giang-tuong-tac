# NGÂN HÀNG CÂU HỎI — BÀI 3: THÔNG TIN TRONG MÁY TÍNH

> Nguồn dữ liệu gốc: `data/lesson.js`. Bảng dưới để GV tra nhanh. Mức độ: NB (nhận biết), TH (thông hiểu), VD (vận dụng), VDC (vận dụng cao).

## Thống kê
- Tổng: **18 câu** · NB **5** · TH **6** · VD **5** · VDC **2**.
- Dạng: trắc nghiệm 1 đáp án, chọn nhiều đáp án, đúng/sai, điền khuyết, ghép đôi, tình huống.

## Danh sách câu hỏi

| # | Hoạt động | Mức | Câu hỏi | Đáp án |
|---|---|---|---|---|
| 1 | Khởi động | NB | Con người diễn đạt suy nghĩ bằng gì? | Chữ số, chữ cái và các kí hiệu |
| 2 | Khởi động | NB | Máy tính làm việc với mấy kí hiệu? | Hai kí hiệu: 0 và 1 |
| 3 | Mã hoá | TH | Mã hoá số 3 và số 6 có giống nhau? | Sai (3→011, 6→110) |
| 4 | Điền mã hoá | VD | Điền mã hoá số 3 và số 6 | 011 · 110 |
| 5 | Biểu diễn số & VB | NB | Bit là gì? | Kí hiệu 0 hoặc 1 — chữ số nhị phân |
| 6 | Biểu diễn số & VB | VD | Vì sao "CAFE" cần 32 bit? | 4 chữ × 8 bit = 32 |
| 7 | Hình ảnh & âm thanh | TH | Mỗi pixel ảnh đen trắng cần mấy bit? | 1 bit |
| 8 | Hình ảnh & âm thanh | VD | Dãy bit của dòng đầu chữ A? | 00011000 |
| 9 | Điền trái tim | VD | Dãy bit dòng 1 và dòng 8 hình trái tim | 01100110 · 00011000 |
| 10 | Kiểm tra nhanh | NB | Dãy bit là gì? | A — dãy kí hiệu 0 và 1 |
| 11 | Kiểm tra nhanh | TH | Máy tính dùng dãy bit để làm gì? | D — số, văn bản, hình ảnh, âm thanh |
| 12 | Kiểm tra nhanh | TH | Chọn phát biểu ĐÚNG về bit (nhiều đáp án) | Nhỏ nhất · 0/1 · nhị phân |
| 13 | Đơn vị đo | NB | Đơn vị đo nhỏ nhất? | Bit |
| 14 | Đơn vị đo | TH | 1 GB xấp xỉ bao nhiêu byte? | Một tỉ byte |
| 15 | Luyện tập | NB | 1 GB xấp xỉ bao nhiêu byte? | Một tỉ byte (C) |
| 16 | Luyện tập | VD | Thẻ 16 GB, ảnh 12 MB → bao nhiêu ảnh? | ~1365 ảnh |
| 17 | Luyện tập | VD | USB 8 GB, bài hát 6 MB → bao nhiêu bài? | ~1365 bài |
| 18 | Luyện tập | VDC | Ổ 2 TB, phim 6 GB → bao nhiêu phim? | ~341 phim |
| — | Tổng kết (thử thách) | TH | Phát biểu nào SAI? | 1 byte = 10 bit |
| — | Tổng kết (thử thách) | VD | Thứ tự tăng dần đơn vị đo? | bit<byte<KB<MB<GB<TB |

## Vận dụng (tình huống — HĐ4)
1. **Kiểm tra & ghi dung lượng các ổ đĩa của máy em.** → Mở File Explorer → This PC; hoặc nháy phải ổ đĩa → Properties. (SGK ví dụ: C≈109 GB, E≈111 GB, F≈169 GB, G≈186 GB.)
2. **Mã hoá các số từ 8 đến 15 (dãy 0–15).** → cần 4 lần chia đôi ⇒ 4 bit: 8→1000, 9→1001, 10→1010, 11→1011, 12→1100, 13→1101, 14→1110, 15→1111. **Nhận xét:** dãy càng dài, số bit càng nhiều (0–7 cần 3 bit; 0–15 cần 4 bit).

## Cách tính (LUYỆN TẬP)
- 16 GB = 16 × 1024 = 16384 MB; ÷ 12 MB ≈ **1365 ảnh**.
- 8 GB = 8192 MB; ÷ 6 MB ≈ **1365 bài hát**.
- 2 TB = 2 × 1024 = 2048 GB; ÷ 6 GB ≈ **341 phim**.
