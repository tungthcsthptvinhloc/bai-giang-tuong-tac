# HƯỚNG DẪN GIÁO VIÊN — Bài 2: Thông tin trong giải quyết vấn đề (Tin học 9)

## 1. App này là gì
Ứng dụng tổ chức tiết học tương tác trên máy chiếu, bám sát giáo án. **Chạy offline.**
Giao diện tông teal–slate chững chạc cho lớp 9. Có đủ công cụ đứng lớp: nhiệm vụ,
đồng hồ, **bộ bút vẽ mới**, âm thanh đúng/sai, hiện-khi-bấm.

## 2. Mở & chạy
```bash
cd lessons/tin9-bai02-thong-tin-trong-giai-quyet-van-de
npx serve .
```
Mở đường dẫn hiện ra, bấm `F` để toàn màn hình. Sửa nội dung: mở `data/lesson.js`.

## 3. Công cụ trên thanh điều khiển (đã cải tiến)
| Icon | Chức năng |
|---|---|
| 🎯 **Nhiệm vụ** | Hiện sẵn đầu mỗi hoạt động |
| 🔊 / 🔇 | Bật/tắt âm thanh đúng/sai (bài này bật sẵn) |
| ⏱️ | Đồng hồ đếm giờ — hết giờ báo hiệu, GV tự bấm tiếp |
| ✏️ **Bút** | Vẽ nét đỏ. Bấm lại để **thoát** vẽ (phím `P`) |
| 🖍️ **Bút dạ quang** | Tô sáng (vàng trong suốt). Bấm lại để thoát (phím `H`) |
| 🧽 **Tẩy** | Xóa những nét đã vẽ |
| 🗑️ **Xóa hết** | Xóa toàn bộ nét vẽ trên màn |
| 🖼️ **Xem ảnh SGK** | Mở ảnh trang SGK gốc |

> Các nút vẽ **luôn bấm được ngay cả khi đang vẽ** (thanh điều khiển nằm trên lớp vẽ).
> **Câu chọn nhiều đáp án:** ô đã chọn hiện viền đậm + nhãn "✓ đã chọn"; bấm **Kiểm tra** để chấm.

**Hiện-khi-bấm:** Nhiệm vụ hiện sẵn; nội dung kiến thức / gợi ý / đáp án / "Em cần nhớ" ẩn — GV bấm mới hiện.

## 4. Kiến thức trọng tâm
1. Thông tin là cơ sở ra quyết định; cần quan tâm **chất lượng** thông tin.
2. Chất lượng thông tin quyết định **hiệu quả giải quyết vấn đề**.
3. Bốn tiêu chí: **tính mới · tính chính xác · tính đầy đủ · tính sử dụng được**.

## 5. Tiến trình & gợi ý tổ chức
- **HĐ1 Mở đầu:** cho 3 HS đóng vai Minh–An đọc hội thoại; thảo luận rủi ro khi An tin vội. Chốt bằng câu hỏi.
- **HĐ2.1 Vai trò chất lượng TT:** HS nêu nguồn tin cậy; GV bấm hiện nội dung; chốt "Em cần nhớ". Câu hỏi KOL → C.
- **HĐ2.2 Chất lượng thông tin:** GV bấm hiện **sơ đồ 4 tiêu chí** + định nghĩa; chốt "Em cần nhớ".
- **Ghép tiêu chí ↔ câu hỏi** và **Phân loại vi phạm** (kéo thả 4 nhóm).
- **HĐ3 Luyện tập:** 5 câu kiểu Kahoot (có 1 câu chọn nhiều đáp án — chọn nguồn tin cậy). Chia đội thi.
- **HĐ4 Vận dụng:** thảo luận tình huống số điện thoại nông trại; dùng **Gợi ý / Xem hướng trả lời**.
- **Tổng kết:** bấm hiện "Hôm nay em đã học" + từ khóa + câu thử thách (đủ 4 tiêu chí).

## 6. Đáp án nhanh
| Hoạt động | Câu | Đáp án | Vì sao |
|---|---|---|---|
| Mở đầu | Rủi ro của An | A | Tin chưa kiểm chứng + 1 nguyện vọng → dễ sai, giảm cơ hội |
| HĐ2.1 | KOL | C | Cân nhắc, đánh giá chất lượng trước khi dùng |
| Ghép đôi | — | mới↔lỗi thời? · chính xác↔đúng/xác minh? · đầy đủ↔tổng thể? · sử dụng được↔liên quan? | — |
| Phân loại | — | số đt cũ=tính mới; sai điểm chuẩn=chính xác; thiếu học phí=đầy đủ; du học=sử dụng được | — |
| Luyện tập 1 | Nguồn tin cậy (chọn nhiều) | A, C, D | Sở GD&ĐT, GVCN, người thân |
| Luyện tập 2 | Không để ý thời gian đăng kí | B. Tính mới | Không cập nhật kịp thời hạn |
| Luyện tập 3 | Nhiều nhưng không liên quan | A. Tính sử dụng được | Không liên quan → vô ích |
| Luyện tập 4 | Điều đúng | C | Chất lượng quyết định hiệu quả |
| Luyện tập 5 | Nên làm nhất | B | Kiểm chứng, đối chiếu nguồn tin cậy |
| Vận dụng | Số đt cũ thiếu tiêu chí | C. Tính mới | Đầu số đã đổi, web chưa cập nhật |
| Tổng kết | Bài viết đạt mấy tiêu chí | D. Cả 4 | Mới + chính xác + đầy đủ + sử dụng được |

**Luyện tập SGK (nông trại):** thông tin An dùng lỗi thời → thiếu tính mới; Minh tìm nguồn cập nhật (nhà mạng) → có tính mới, chính xác, sử dụng được → thành công.

## 7. Mở rộng (tùy chọn — Năng lực số & AI theo giáo án)
Cho HS dùng ChatGPT/Gemini phân tích một bài viết theo 4 tiêu chí, hoặc lập bảng kiểm (checklist) đánh giá nguồn tin. Nhắc HS kiểm chứng, trích nguồn, dùng AI có trách nhiệm.

## 8. Phương án dự phòng
- Mạng chập chờn: app chạy offline.
- Lớp bên cạnh ồn: bấm 🔇.
- Thiếu thời gian: `T` nhảy tới Luyện tập / Tổng kết.
