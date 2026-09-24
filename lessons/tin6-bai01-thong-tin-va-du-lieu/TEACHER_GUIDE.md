# HƯỚNG DẪN GIÁO VIÊN — Bài 1: Thông tin và dữ liệu (Tin học 6)

## 1. App này là gì
Ứng dụng tổ chức tiết học tương tác trên máy chiếu, bám sát giáo án. Giao diện
màu sắc tươi vui, thân thiện với học sinh lớp 6. **Chạy offline** — thay thế được
Quizizz/Kahoot khi mạng chập chờn.

## 2. Mở & chạy
1. App gồm nhiều file → chạy qua server tĩnh cho chắc:
   ```bash
   cd lessons/tin6-bai01-thong-tin-va-du-lieu
   npx serve .
   ```
   Mở đường dẫn hiện ra, bấm phím `F` để toàn màn hình.
2. Sửa nội dung/câu hỏi: mở `data/lesson.js`, chỉnh chữ trong dấu nháy, lưu, tải lại trang.

## 3. Kiến thức trọng tâm (bám vào đây khi chốt)
1. **Thông tin** = những gì đem lại hiểu biết cho con người.
2. **Dữ liệu** = con số, văn bản, hình ảnh, âm thanh (ghi trên vật mang tin).
3. **Vật mang tin** = phương tiện lưu trữ & truyền tải thông tin (giấy, đĩa CD, thẻ nhớ…).
4. Thông tin đem lại hiểu biết; **thông tin đúng** giúp lựa chọn tốt, hiệu quả.

## 4. Bảng điều khiển (phím tắt)
| Phím | Tác dụng |
|---|---|
| `→` / `Space` | Màn tiếp theo · `←` quay lại |
| `1 2 3 4` | Chọn đáp án A/B/C/D |
| `F` / `Esc` | Toàn màn hình / thoát |
| `T` | Chế độ giáo viên (nhảy hoạt động, hiện/ẩn đáp án, reset điểm/hoạt động) |

## 5. Tiến trình & gợi ý tổ chức (theo giáo án)

### HĐ1: Mở đầu
- Hỏi cả lớp: "Hằng ngày em nhìn/nghe thấy gì quanh mình?" → gọi vài em kể.
- Chốt bằng câu hỏi trong app: giác quan thu nhận, bộ não xử lí.

### HĐ2.1: Thông tin và dữ liệu (Thấy gì? Biết gì?)
- Đọc ví dụ **Minh qua đường** (chiếu `assets/sgk/sgk-trang5.jpg`).
- Dùng 2 câu hỏi (An xem dự báo; bảng Đảo Cò) để phân biệt DL/TT/vật mang tin.
- **Chốt "Em cần nhớ":** 3 định nghĩa.
- Chơi **Ghép đôi khái niệm** (1-b, 2-a, 3-c) và **Phân loại TT/DL** (16:00 & số ĐT là dữ liệu; cả câu là thông tin).
- Chơi **Trò chơi 3 nhóm** (Dữ liệu / Thông tin / Vật mang tin) — hoạt động củng cố quan trọng nhất.

### HĐ2.2: Tầm quan trọng của thông tin (Hỏi để có thông tin)
- Ví dụ Điện Biên Phủ (thông tin đem lại hiểu biết) và An nghe "trời sắp mưa" → cầm ô.
- Câu hỏi app → chốt: **thông tin có thể thay đổi hành động của con người**.
- **Em cần nhớ:** thông tin quan trọng; thông tin đúng → lựa chọn tốt.

### HĐ3: Luyện tập — Bảng 1.1 (lượng mưa)
- Chiếu Bảng 1.1 đầy đủ (`assets/sgk/sgk-trang7.jpg`).
- Chơi quiz 4 câu a,b,c,d kiểu Kahoot (có điểm, streak). Chia đội thi cho sôi động.

### HĐ4: Vận dụng
- Thảo luận nhóm: (a) thông tin giúp chọn trang phục; (b) an toàn giao thông; (c) vật mang tin cho học tập.
- Dùng nút **Gợi ý** / **Xem hướng trả lời** để chốt. Có thể giao câu 2 về nhà.

### Tổng kết
- Chốt 4 điều trọng tâm + 3 từ khóa (Thông tin · Dữ liệu · Vật mang tin) + câu thử thách (em bé 5 tuổi vs người lớn).

## 6. Đáp án nhanh
| Hoạt động | Câu | Đáp án | Vì sao (rút gọn) |
|---|---|---|---|
| Mở đầu | 1 | A | Giác quan thu nhận, não xử lí |
| HĐ2.1 | An dự báo | B (Dữ liệu) | Con số/âm thanh An thu nhận là dữ liệu |
| HĐ2.1 | Tấm bảng | C (Vật mang tin) | Bảng chứa & truyền dữ liệu |
| Ghép đôi | — | 1-b, 2-a, 3-c | TT↔hiểu biết · DL↔số/chữ · Vật mang tin↔vật chứa |
| Phân loại TT/DL | — | 16:00, số ĐT = Dữ liệu; cả câu = Thông tin | Câu có nghĩa mới là thông tin |
| Trò chơi 3 nhóm | — | (xem QUESTION_BANK) | DL–TT–Vật mang tin |
| HĐ2.2 | An–mưa | D | Thông tin thay đổi hành động |
| Luyện tập | a | A (Dữ liệu) | Con số trong bảng là dữ liệu |
| Luyện tập | b | B (Thông tin) | Kết luận rút ra sau so sánh |
| Luyện tập | c | Đúng (Thông tin) | Câu trả lời có ý nghĩa: Huế ít mưa nhất tháng 3 |
| Luyện tập | d | C (Có) | Thông tin giúp chọn thời điểm du lịch |
| Vận dụng | Vật mang tin | D (SGK) | Sách lưu & truyền kiến thức |
| Tổng kết | Thử thách | A | Hiểu biết phụ thuộc người tiếp nhận |

**Vận dụng — đáp án đầy đủ (giáo án):**
- a) Chọn trang phục theo thời tiết/công dụng/lứa tuổi/giới tính.
- b) Tuân theo đèn tín hiệu, biển báo; đội mũ bảo hiểm; đúng tốc độ; nhường đường…
- c) Vật mang tin cho học tập: SGK, SBT, sách tham khảo, từ điển, đĩa CD/DVD, USB…

## 7. Phương án dự phòng
- Mạng chập chờn: app chạy offline.
- Thiếu thời gian: dùng `T` nhảy thẳng tới Luyện tập / Tổng kết.
- Muốn chiếu đúng ảnh/bảng SGK: mở `assets/sgk/` (trang 5–7).

## 8. Mở rộng (tùy chọn — Năng lực số & AI theo giáo án)
Nếu còn thời gian, cho HS dùng ChatGPT/Gemini đặt câu lệnh: *"Cho em 5 ví dụ về
thông tin, dữ liệu và vật mang tin"* rồi đối chiếu với SGK — đúng định hướng
"Sử dụng công cụ AI" trong giáo án. Nhắc HS kiểm chứng, không cung cấp thông tin cá nhân.
