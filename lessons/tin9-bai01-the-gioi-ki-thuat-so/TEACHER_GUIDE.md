# HƯỚNG DẪN GIÁO VIÊN — Bài 1: Thế giới kĩ thuật số (Tin học 9)

## 1. App này là gì
Ứng dụng tổ chức tiết học tương tác chạy trên máy chiếu, bám sát giáo án 2 tiết.
Giáo viên điều khiển, học sinh tham gia trả lời/chơi/thảo luận. **Chạy offline** —
thay thế cho Quizizz/Kahoot khi mạng trường không ổn định.

## 2. Mở & chạy
1. Mở `index.html` bằng Chrome/Edge. Vì app gồm nhiều file, nên chạy qua một server
   tĩnh cho chắc (mở trực tiếp `file://` đôi khi bị trình duyệt chặn tải file phụ):
   ```bash
   cd lessons/tin9-bai01-the-gioi-ki-thuat-so
   npx serve .
   ```
   Rồi mở đường dẫn hiện ra (vd http://localhost:3000).
2. Bấm **⛶ Toàn màn hình** (hoặc phím `F`) để chiếu.
3. Sửa nội dung/câu hỏi: mở `data/lesson.js`, chỉnh chữ trong dấu nháy, lưu, tải lại trang.

## 3. Kiến thức trọng tâm (Core Knowledge) — bám vào đây khi chốt
1. Bộ xử lí thông tin có ở nhiều thiết bị quanh ta (không chỉ máy tính).
2. Máy tính: tính toán nhanh–chính xác, lưu trữ lớn, kết nối toàn cầu tốc độ cao.
3. Máy tính ứng dụng trong hầu hết lĩnh vực KHKT & đời sống.
4. CNTT tác động tích cực lên giáo dục & xã hội; cần dùng đúng cách.

## 4. Bảng điều khiển (phím tắt)
| Phím | Tác dụng |
|---|---|
| `→` / `Space` | Màn tiếp theo |
| `←` | Quay lại |
| `1 2 3 4` | Chọn đáp án A/B/C/D |
| `F` / `Esc` | Toàn màn hình / thoát |
| `T` | Bật/tắt **Chế độ giáo viên** (nhảy hoạt động, hiện/ẩn đáp án, reset điểm/hoạt động, bật tắt đếm giờ) |

## 5. Tiến trình & gợi ý tổ chức (theo giáo án)

### HĐ1: Mở đầu (5’)
- Cho 2 HS đóng vai **An – Khoa** đọc hội thoại trên màn hình.
- Cả lớp thảo luận cặp đôi: *kể thiết bị có gắn bộ xử lí trong gia đình em*.
- Bấm câu hỏi "Chọn tất cả thiết bị có bộ xử lí" để chốt (đáp án: Ti vi KTS, Đồng hồ thông minh).

### HĐ2.1: Thế giới kĩ thuật số (20’)
- HS đọc Hoạt động 1 SGK "Tìm hiểu ti vi kĩ thuật số" (Hình 1.1 — chiếu `assets/sgk/sgk-trang5.jpg`).
- Dùng 2 câu hỏi trong app (đầu vào / có xử lí không) để dẫn dắt.
- **Chốt (Em cần nhớ):** thiết bị có bộ xử lí ở khắp nơi, tự động hoá việc xử lí thông tin.
- Chơi **Ghép đôi Hình 1.2**: thiết bị ↔ lĩnh vực.

### HĐ2.2: Ứng dụng của máy tính (20’)
- HS đọc Hoạt động 2 SGK "Máy tính thật là cần thiết".
- Chốt **3 khả năng**; câu hỏi "Đâu KHÔNG phải khả năng của máy tính" (đáp án: *Tự biết suy nghĩ*).
- Chơi **Phân loại ứng dụng** theo 4 lĩnh vực (Y tế / Giao thông / Nghiên cứu / Giải trí).

### HĐ2.3: Tác động của CNTT (20’)
- HS đọc Hoạt động 3 SGK; thảo luận ví dụ tác động lên giáo dục & xã hội.
- Chơi **Phân loại tác động** (tích cực vs cần lưu ý).
- **Chốt:** CNTT tác động tích cực; cần dùng đúng cách.

### HĐ3: Luyện tập (10’) — Trò chơi "Thu hoạch trứng gà"
- Chia lớp thành đội; mỗi câu hiển thị 4 đáp án lớn kiểu Kahoot, có điểm & streak.
- Đội trả lời đúng nhiều nhất thắng.

### HĐ4: Vận dụng (5’)
- NV1 (tại lớp): *Máy đo huyết áp điện tử tự động có phải thiết bị có bộ xử lí không?* → thảo luận nhóm, dùng nút "Xem hướng trả lời".
- NV2 (về nhà): đồng hồ thông minh (câu hỏi trong app + SGK Vận dụng b).

### Tổng kết
- Màn hình chốt 4 điều trọng tâm + 3 từ khóa + 1 câu thử thách tổng hợp.

## 6. Đáp án nhanh
| Hoạt động | Câu | Đáp án | Vì sao (rút gọn) |
|---|---|---|---|
| Mở đầu | 1 | A, C | Ti vi KTS & đồng hồ thông minh có bộ xử lí |
| HĐ2.1 | 1 | B | Đầu vào là tín hiệu lệnh từ bộ điều khiển |
| HĐ2.1 | 2 | Đúng | Ti vi phải xử lí để chuyển đúng kênh |
| HĐ2.2 | 1 | D | Máy tính không tự "suy nghĩ" |
| Luyện tập | 1 | B | Đèn giao thông |
| Luyện tập | 2 | C | Đồng hồ thông minh |
| Luyện tập | 3 | A | Trong gia đình |
| Luyện tập | 4 | D | "Biết suy nghĩ" không phải khả năng MT |
| Luyện tập | 5 | A | Chuyển giao/tiếp cận thông tin dễ dàng |
| Vận dụng | 1 | A | Đồng hồ TM nhiều chức năng → cần bộ xử lí |
| Tổng kết | Thử thách | B | Nhiều thiết bị quanh ta sẽ ngừng hoạt động |

> Đáp án 5 câu Luyện tập trùng khớp giáo án gốc: **1B – 2C – 3A – 4D – 5A**.

**Vận dụng — đáp án đầy đủ (giáo án):**
- Máy đo huyết áp điện tử tự động **là** thiết bị có bộ xử lí: quá trình đo hoàn toàn tự động; tín hiệu cảm biến áp suất được xử lí và biến đổi để đưa ra kết quả.
- Đồng hồ thông minh khác đồng hồ thường: kết nối Bluetooth/4G/wifi, theo dõi sức khoẻ, hỗ trợ thể thao, định vị GPS… → cần bộ xử lí như một máy tính nhỏ.

## 7. Phương án dự phòng
- Mạng chập chờn: app chạy offline, không cần Internet.
- Không loa/lớp ồn: âm thanh mặc định đã tắt.
- Thiếu thời gian: dùng Chế độ giáo viên (`T`) nhảy thẳng tới Luyện tập / Tổng kết.
- Muốn chiếu đúng ảnh SGK: mở các file trong `assets/sgk/` (trang 5–8).

## 8. Mở rộng (tùy chọn — theo định hướng Năng lực số & AI của giáo án)
Nếu còn thời gian, giáo viên có thể cho HS dùng ChatGPT/Gemini/Google Lens để tìm thêm
ví dụ thiết bị số, hoặc dùng Canva AI vẽ sơ đồ tư duy — đúng phần "Sử dụng công cụ AI" trong giáo án.
