# HƯỚNG DẪN GIÁO VIÊN — BÀI 3: THÔNG TIN TRONG MÁY TÍNH

## 1. Giới thiệu nhanh
- **Bài:** Bài 3 — Thông tin trong máy tính · **Lớp:** 6 · **Thời lượng:** 45 phút
- **App này giúp gì:** tổ chức tiết học tương tác trên máy chiếu — giáo viên điều khiển, học sinh trả lời / chơi / thảo luận theo nhóm. Bám sát tiến trình giáo án (Mở đầu → Hình thành kiến thức → Luyện tập → Vận dụng → Tổng kết).

## 2. Cách mở & chạy
1. Mở file `index.html` bằng Chrome/Edge. **Không cần Internet.**
   - *Lưu ý:* nếu mở trực tiếp mà ảnh/kiểu chữ không lên, hãy mở qua một máy chủ tĩnh đơn giản (kéo cả thư mục vào trình duyệt hỗ trợ, hoặc dùng "Live Server"). Khi chiếu chính thức nên mở toàn màn hình.
2. Bấm nút **Toàn màn hình** (hoặc phím `F`) để chiếu.
3. Điều khiển bằng chuột hoặc bàn phím (mục 4).
> Muốn chỉnh nội dung: mở `data/lesson.js`, sửa chữ trong dấu nháy, lưu, tải lại trang. Không cần biết lập trình.

## 3. Kiến thức trọng tâm (Core Knowledge) — bám vào đây khi chốt
1. Máy tính chỉ dùng **0 và 1** để biểu diễn thông tin.
2. Số, văn bản, hình ảnh, âm thanh đều → **dãy bit**.
3. **Bit** = đơn vị nhỏ nhất; mỗi bit là 0/1 (**chữ số nhị phân**).
4. **1 byte = 8 bit**; KB, MB, GB, TB mỗi bậc gấp 1024 lần.
5. Ước lượng dung lượng: CD ≈ 700 MB · DVD 4,7–17 GB · ổ cứng vài trăm GB–vài TB · thẻ nhớ hàng trăm GB.

## 4. Bảng điều khiển
| Phím | Tác dụng |
|---|---|
| `→` / `Space` | Màn tiếp theo |
| `←` | Quay lại |
| `1 2 3 4` | Chọn đáp án A/B/C/D |
| `F` / `Esc` | Bật / thoát toàn màn hình |
| `T` | Bật/tắt **Chế độ giáo viên** |
| `P` | Bút vẽ (khoanh/gạch trên màn hình) |
| `H` | **Bút dạ quang** (tô làm nổi ý — đã chỉnh nhạt, không che chữ) |

**Trên thanh dưới:** 🔇/🔊 âm thanh · ⏱️ đồng hồ (bấm ▶ đếm ngược, hết giờ chỉ báo hiệu) · ✏️ bút · 🖍️ bút dạ quang · 🧽 tẩy · 🗑️ xoá hết nét · ⛶ toàn màn hình.

**Chế độ giáo viên (`T`):** nhảy tới hoạt động bất kỳ, hiện/ẩn đáp án, reset điểm/hoạt động.

> **Mẹo dạy khám phá:** nội dung kiến thức, gợi ý, đáp án và "Em cần nhớ" đều **ẩn**, chỉ hiện khi giáo viên bấm. Hãy cho HS suy nghĩ/thảo luận trước rồi mới bấm lộ.

## 5. Tiến trình tiết học & gợi ý tổ chức

### HĐ1 — Khởi động (Bí mật của máy tính)
- **Tổ chức:** nêu câu hỏi, cả lớp suy nghĩ ~30s, gọi vài em; bấm chọn để lộ đáp án + giải thích.
- **Chốt:** máy tính chỉ hiểu 0 và 1.

### HĐ1 — Trò chơi Mã hoá (Hình 1.3)
- **Tổ chức:** nhóm đôi. Bấm "Xem cách mã hoá số 4 → 100" giảng phương pháp chia đôi. Cho HS tự mã hoá số 3, số 6 vào bảng nhóm rồi sang màn "Điền mã hoá".
- **Chốt:** mỗi số → một dãy 0/1 khác nhau (3→011, 6→110).

### Biểu diễn số & văn bản
- **Tổ chức:** HS đọc SGK tr.12–13; bấm "Hiện bảng mã & ví dụ"; hỏi "bit là gì?", "CAFE cần bao nhiêu bit?".
- **Chốt (Em cần nhớ):** dãy bit; bit là đơn vị nhỏ nhất, là chữ số nhị phân.

### Biểu diễn hình ảnh & âm thanh — Trò chơi "Ai nhanh hơn?"
- **Tổ chức:** chiếu lưới chữ A. Chia dãy cho các nhóm, nhóm nào đọc đúng dãy bit của một dòng được điểm. Bấm để đối chiếu.
- **Chốt:** ảnh đen trắng — mỗi pixel 1 bit; âm thanh ghi thành số rồi thành dãy bit.

### Viết dãy bit — Hình trái tim (Hoạt động 2)
- **Tổ chức:** nhóm 4 đọc lưới trái tim, viết dãy bit từng dòng rồi nối lại. Sang màn "Điền dãy bit — Trái tim" để 2 HS nhanh nhất điền.
- **Chốt:** cả một hình ảnh cũng chỉ là một dãy bit dài.

### Kiểm tra nhanh (2 câu TN SGK)
- **Tổ chức:** thảo luận cặp đôi. Đáp án: Câu 1 = **A**, Câu 2 = **D**.

### Đơn vị đo thông tin (Bảng 1.3)
- **Tổ chức:** HS đọc tr.14; bấm "Hiện bảng đơn vị đo". Nhấn mạnh 1 byte = 8 bit và bậc 1024.
- **Chốt (Em cần nhớ):** thứ tự bit < byte < KB < MB < GB < TB.

### Trò chơi ghép thiết bị nhớ ↔ dung lượng
- **Tổ chức:** gọi HS lên bảng/máy nối; đối chiếu với thực tế USB, thẻ nhớ mang theo.

### HĐ3 — Luyện tập (tính dung lượng)
- **Tổ chức:** nhóm dùng nháp. Nhấn mạnh **quy trình**: đổi về cùng đơn vị (×1024) rồi chia.

### HĐ4 — Vận dụng
- **Tổ chức:** giao 2 nhiệm vụ, HS làm ra bảng nhóm rồi bấm để đối chiếu hướng chốt của GV. Có thể mở "This PC" trên máy thật để kiểm tra ổ đĩa.

### Tổng kết
- Bấm "Hôm nay em đã học", đọc từ khoá, cho HS làm 2 thử thách cuối.

## 6. Đáp án & giải thích (tra nhanh)
| Hoạt động | Câu | Đáp án | Vì sao |
|---|---|---|---|
| Khởi động | 1 · 2 | B · Hai kí hiệu 0 và 1 | Con người dùng chữ số/chữ cái/kí hiệu; máy tính chỉ 0 và 1 |
| Mã hoá | true/false | **Sai** | 3→011, 6→110 — khác nhau |
| Điền mã hoá | — | 011 · 110 | Chia đôi dãy 0–7 |
| Biểu diễn số & VB | 1 · 2 | Bit=0/1 · 4×8=32 | Mỗi kí tự 8 bit |
| Hình ảnh & âm thanh | 1 · 2 | **1 bit** · **00011000** | Pixel đen trắng 1 bit; dòng đầu chữ A |
| Điền trái tim | — | 01100110 · 00011000 | Dòng 1 và dòng 8 |
| Kiểm tra nhanh | 1 · 2 · 3 | **A** · **D** · A,B,D | SGK tr.14 |
| Đơn vị đo | 1 · 2 | **Bit** · 1 tỉ byte | Bit nhỏ nhất; GB ≈ tỉ byte |
| Luyện tập | 1 · 2 · 3 · 4 | C · ~1365 ảnh · ~1365 bài · ~341 phim | Đổi ×1024 rồi chia |
| Tổng kết | 1 · 2 | **1 byte = 10 bit (SAI)** · bit<byte<KB<MB<GB<TB | 1 byte = 8 bit |

## 7. Mở rộng — Tích hợp AI (tuỳ chọn, KHÔNG bắt buộc với HS)
Giáo án gợi ý dùng ChatGPT/Copilot/Gemini để HS **luyện tập & tự kiểm tra** (đây là **phương pháp của giáo viên**, không phải kiến thức lõi). Ví dụ prompt:
- "So sánh bit, byte, KB, MB, GB, TB bằng bảng kèm ví dụ."
- "Một tệp ảnh 5 MB — lưu được bao nhiêu tệp trong 1 GB? Trình bày cách tính."
- "Tạo hình 8×8 và yêu cầu em chuyển từng dòng thành dãy bit."
> Lưu ý an toàn: luôn **đối chiếu với SGK**, không phụ thuộc hoàn toàn vào AI, không cung cấp thông tin cá nhân.
