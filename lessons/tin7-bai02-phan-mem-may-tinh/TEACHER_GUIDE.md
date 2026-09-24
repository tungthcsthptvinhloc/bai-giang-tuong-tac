# HƯỚNG DẪN GIÁO VIÊN — Bài 2: Phần mềm máy tính (Tin học 7)

## 1. App này là gì
Ứng dụng tổ chức tiết học tương tác trên máy chiếu, bám sát giáo án 2 tiết. **Chạy
offline.** Có đầy đủ: nhiệm vụ rõ ràng, đồng hồ đếm giờ, bút vẽ, **âm thanh đúng/sai**,
hiệu ứng pháo giấy, và "hiện-khi-bấm" để dạy khám phá.

## 2. Mở & chạy
```bash
cd lessons/tin7-bai02-phan-mem-may-tinh
npx serve .
```
Mở đường dẫn hiện ra, bấm `F` để toàn màn hình. Sửa nội dung: mở `data/lesson.js`.

## 3. Công cụ trên thanh điều khiển
| Biểu tượng | Chức năng |
|---|---|
| 🎯 **Nhiệm vụ** | Hiện sẵn đầu mỗi hoạt động |
| 🔊 / 🔇 **Âm thanh** | Bật/tắt nhanh chuông đúng/sai. **Bài này BẬT SẴN** — bấm 🔇 nếu lớp bên cạnh ồn |
| ⏱️ **Đồng hồ** | Đặt/đếm ngược thời gian (−/+, ▶, ⏸, ↺). Hết giờ **báo hiệu**, GV tự bấm tiếp |
| ✏️ **Bút vẽ** (`P`) | Khoanh tròn/gạch chân; chọn màu, 🧽 tẩy, 🗑️ xóa |
| 🖼️ **Xem ảnh SGK** | Mở ảnh trang SGK gốc phóng to |

**Hiện-khi-bấm:** Nhiệm vụ hiện sẵn; nội dung kiến thức, gợi ý, đáp án, "Em cần nhớ" ẩn — GV bấm mới hiện.

## 4. Phím tắt
`→`/`Space` tiếp · `←` lùi · `1–4` chọn đáp án · `F` toàn màn hình · `T` chế độ GV · `P` bút vẽ.

## 5. Kiến thức trọng tâm (bám vào đây khi chốt)
1. **Hệ điều hành** = phần mềm hệ thống quản lí & điều khiển máy tính, cung cấp giao diện và môi trường chạy PMƯD; **cài đầu tiên**.
2. **Phần mềm ứng dụng** = chương trình làm việc cụ thể, xử lí dữ liệu cụ thể; **chạy trên nền HĐH**.
3. **Phần mở rộng** (đuôi sau dấu chấm cuối) cho biết loại tệp và phần mềm mở được.

## 6. Tiến trình & gợi ý tổ chức
- **HĐ1 Khởi động:** cặp đôi trả lời "HĐH là phần cứng hay phần mềm? cài khi nào?"; bấm hiện gợi ý; câu Đúng/Sai chốt.
- **HĐ2.1 Hệ điều hành:** HS nêu chức năng; GV bấm hiện **sơ đồ 4 lớp** + 3 chức năng; chốt "Em cần nhớ". Chơi **Ai nhanh hơn** (2 câu).
- **Phân loại HĐH/PMƯD:** kéo Windows/Android/Linux vào HĐH; Word/Chrome/Zalo vào PMƯD.
- **HĐ2.2 PMƯD:** GV bấm hiện nội dung; chốt phần mở rộng. Chơi **Ghép loại tệp ↔ đuôi** (6 cặp).
- **HĐ3 Luyện tập:** 5 câu kiểu Kahoot, chia đội thi (âm thanh + pháo giấy tạo khí thế). Bật đồng hồ nếu muốn.
- **HĐ4 Vận dụng:** thảo luận vì sao tải Scratch phải chọn bản đúng HĐH; dùng **Gợi ý / Xem hướng trả lời**.
- **Tổng kết:** bấm hiện "Hôm nay em đã học" + từ khóa + câu thử thách (.pptx).

## 7. Đáp án nhanh
| Hoạt động | Câu | Đáp án | Vì sao |
|---|---|---|---|
| Khởi động | Không HĐH, phần mềm khác chạy? | Sai | HĐH tạo môi trường cho phần mềm khác |
| Ai nhanh hơn | Không phải HĐH | C. Windows Explorer | Là phần mềm quản lí tệp |
| Ai nhanh hơn | Không phải chức năng HĐH | B. Tạo/sửa ảnh | Việc của PMƯD |
| Phân loại | 2 nhóm | Windows/Android/Linux = HĐH; Word/Chrome/Zalo = PMƯD | — |
| Ghép loại tệp | — | 1-f, 2-c, 3-a, 4-b, 5-e, 6-d | — |
| Luyện tập 1 | PMƯD | C. Gmail | 3 phương án kia là HĐH |
| Luyện tập 2 | Tệp cho Media Player | A, C (.mp3, .avi) | Nhạc & phim |
| Luyện tập 3 | HĐH là loại phần mềm | C. Hệ thống | Quản lí chung máy tính |
| Luyện tập 4 | Cài tối thiểu mấy HĐH | B. 1 | Ít nhất một |
| Luyện tập 5 | Phát biểu SAI | B. "Máy tính hoạt động phải có PMƯD" | Máy tính cần HĐH, không nhất thiết PMƯD |
| Vận dụng | Quan hệ PMƯD–HĐH | A | PMƯD chạy trên nền & phù hợp HĐH |
| Tổng kết | Tệp .pptx | B. PowerPoint | Đuôi .pptx = bài trình bày |

**Vận dụng (giáo án):** tải Scratch phải chọn bản phù hợp HĐH vì phần mềm phụ thuộc HĐH; chọn sai sẽ không cài/chạy được.

## 8. Mở rộng (tùy chọn — Năng lực số & AI theo giáo án)
Cho HS dùng ChatGPT/Gemini phân loại phần mềm theo chức năng, hoặc Google Lens nhận diện icon phần mềm; đối chiếu SGK. Nhắc HS kiểm chứng, dùng AI có trách nhiệm.

## 9. Phương án dự phòng
- Mạng chập chờn: app chạy offline.
- Lớp bên cạnh ồn: bấm 🔇 tắt âm thanh.
- Thiếu thời gian: `T` nhảy tới Luyện tập / Tổng kết.
