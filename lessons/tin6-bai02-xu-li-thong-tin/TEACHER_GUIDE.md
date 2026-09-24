# HƯỚNG DẪN GIÁO VIÊN — Bài 2: Xử lí thông tin (Tin học 6)

## 1. App này là gì
Ứng dụng tổ chức tiết học tương tác trên máy chiếu, bám sát giáo án, giao diện tươi
vui cho lớp 6. **Chạy offline.** Có đầy đủ công cụ đứng lớp: nhiệm vụ rõ ràng, đồng
hồ đếm giờ, bút vẽ, hiệu ứng đúng/sai, và "hiện-khi-bấm" để dạy khám phá.

## 2. Mở & chạy
```bash
cd lessons/tin6-bai02-xu-li-thong-tin
npx serve .
```
Mở đường dẫn hiện ra, bấm `F` để toàn màn hình. Sửa nội dung: mở `data/lesson.js`.

## 3. Công cụ mới trên thanh điều khiển
| Biểu tượng | Chức năng |
|---|---|
| 🎯 **Nhiệm vụ** | Hiện sẵn đầu mỗi hoạt động — cả lớp biết cần làm gì |
| ⏱️ **Đồng hồ** | Đặt/đếm ngược thời gian cho hoạt động (−/+ , ▶ , ⏸ , ↺). Hết giờ **báo hiệu** (chuông + nhấp nháy), GV tự bấm tiếp |
| ✏️ **Bút vẽ** (phím `P`) | Khoanh tròn/gạch chân trực tiếp trên màn hình; chọn màu, 🧽 tẩy, 🗑️ xóa hết |
| 🖼️ **Xem ảnh SGK** | Mở ảnh trang SGK gốc (phóng to) khi cần đối chiếu |

**Hiện-khi-bấm:** Nhiệm vụ hiện sẵn; còn **nội dung kiến thức, gợi ý, đáp án, "Em
cần nhớ"** đều ẩn — cho HS suy nghĩ/thảo luận rồi GV bấm nút để hiện.

## 4. Phím tắt
`→`/`Space` tiếp · `←` lùi · `1–4` chọn đáp án · `F` toàn màn hình · `T` chế độ giáo viên · `P` bút vẽ.

## 5. Kiến thức trọng tâm (bám vào đây khi chốt)
1. Xử lí thông tin gồm **4 bước: Thu nhận → Lưu trữ → Xử lí → Truyền**.
2. Máy tính có **4 thành phần**: Thiết bị vào (thu nhận), Bộ nhớ (lưu trữ), Bộ xử lí/CPU (xử lí), Thiết bị ra (truyền).
3. Máy tính xử lí hiệu quả: nhanh, chính xác, nhiều dạng thông tin, lưu trữ lớn, bền bỉ.

## 6. Tiến trình & gợi ý tổ chức
- **HĐ1 Mở đầu:** cho HS xem/tưởng tượng cú sút phạt đền, thảo luận "não đã làm gì?", rồi bấm hiện tình huống + trả lời câu hỏi (giác quan: mắt).
- **HĐ2.1 Xử lí thông tin:** HS nêu các bước; GV bấm hiện **sơ đồ 4 bước** + định nghĩa; chốt "Em cần nhớ". Chơi **Sắp xếp 4 bước**.
- **Phân loại hoạt động:** kéo 4 ví dụ vào 4 nhóm (nghe nhạc→thu nhận; chép bài→lưu trữ; tính nhẩm→xử lí; thuyết trình→truyền).
- **HĐ2.2 Trong máy tính:** GV bấm hiện **sơ đồ máy tính** (Thiết bị vào→CPU→Thiết bị ra, Bộ nhớ); chốt 4 thành phần. Chơi **Ghép thành phần↔chức năng**.
- **HĐ3 Luyện tập:** 5 câu kiểu Kahoot, chia đội thi. Bật đồng hồ nếu muốn.
- **HĐ4 Vận dụng:** thảo luận nhóm phân tích 4 bước khi lên kế hoạch chuyến đi; dùng **Gợi ý / Xem hướng trả lời**.
- **Tổng kết:** bấm hiện "Hôm nay em đã học" + từ khóa + câu thử thách.

## 7. Đáp án nhanh
| Hoạt động | Câu | Đáp án | Vì sao |
|---|---|---|---|
| Mở đầu | Giác quan | B (Thị giác) | Cầu thủ quan sát bằng mắt |
| Sắp xếp | 4 bước | Thu nhận → Lưu trữ → Xử lí → Truyền | Trình tự SGK |
| Phân loại | 4 nhóm | nghe nhạc=thu nhận; chép bài=lưu trữ; tính nhẩm=xử lí; thuyết trình=truyền | — |
| Ghép đôi | — | vào↔thu nhận; CPU↔xử lí; bộ nhớ↔lưu trữ; ra↔truyền | — |
| Luyện tập 1 | Mấy thành phần? | **B. 4** | vào–bộ nhớ–CPU–ra |
| Luyện tập 2 | Chức năng bộ nhớ | **C. Lưu trữ** | USB, thẻ nhớ, đĩa cứng |
| Luyện tập 3 | Bộ nhớ là vật mang tin? | Đúng | Lưu trữ dữ liệu |
| Luyện tập 4 | Quan sát tàu biển | A. Thu nhận | Quan sát bằng mắt |
| Luyện tập 5 | Chuyển thể văn | D. Xử lí | Suy nghĩ, biến đổi |
| Vận dụng | Máy tính hiệu quả | A,B,D (KHÔNG chọn "tự quyết định thay con người") | Máy tính hỗ trợ, không thay người quyết định |
| Tổng kết | Gõ văn bản rồi in | B | Bàn phím→CPU/bộ nhớ→máy in |

## 8. Mở rộng (tùy chọn — Năng lực số & AI theo giáo án)
Cho HS đặt câu lệnh AI: *"So sánh quá trình xử lí thông tin của con người và máy tính bằng bảng"* rồi đối chiếu SGK. Nhắc HS kiểm chứng, dùng AI có trách nhiệm.

## 9. Phương án dự phòng
- Mạng chập chờn: app chạy offline.
- Thiếu thời gian: dùng `T` nhảy tới Luyện tập / Tổng kết.
- Muốn xem ảnh SGK gốc: bấm nút **🖼️ Xem ảnh SGK** hoặc mở `assets/sgk/`.
