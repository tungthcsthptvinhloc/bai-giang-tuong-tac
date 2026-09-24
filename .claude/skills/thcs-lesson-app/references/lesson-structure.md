# Cấu trúc app, giao diện máy chiếu & điều hướng

Đọc trước Bước 4 (thiết kế UI). Mục tiêu: app điều khiển được như một "trợ giảng"
trên máy chiếu.

## 1. Điều hướng tổng thể

```
TRANG CHỦ (tên bài, mục tiêu ngắn, nút Bắt đầu, menu hoạt động)
   ├── Mở đầu / Khởi động
   ├── Hoạt động 1  (giữ đúng tên trong giáo án)
   ├── Hoạt động 2
   ├── ...
   ├── Luyện tập
   ├── Vận dụng
   ├── (Mở rộng — nếu giáo án có)
   └── Tổng kết
```

**Thứ tự và tên = theo giáo án.** Cấu trúc "01 Khởi động → 02 Khám phá → ...
→ 08 Tổng kết" chỉ là gợi ý khi giáo án không nói rõ; giáo án luôn thắng.

Mỗi màn có: **thanh tiến trình** (đang ở hoạt động mấy / mấy), chỉ báo hoạt động
hiện tại, nút **Quay lại** và **Tiếp tục**, và một cách mở **menu hoạt động** để
nhảy nhanh.

## 2. Thiết kế cho máy chiếu (ưu tiên số 1)

Màn hình mục tiêu: laptop giáo viên → máy chiếu/TV lớp. Người xem cuối lớp phải
đọc được.

- **Chữ lớn:** tiêu đề ≥ 2.5rem, nội dung ≥ 1.5rem, đáp án ≥ 1.5rem. Dùng đơn vị
  tương đối (rem/vw) để scale.
- **Nút lớn:** vùng bấm ≥ 64px chiều cao; khoảng cách rộng — GV bấm nhanh, không
  cần rê chuột chính xác.
- **Tương phản cao:** nền sáng, chữ đậm; hoặc theme tối rõ ràng. Tránh chữ xám
  nhạt trên nền trắng.
- **Ít chữ mỗi màn:** một ý chính/màn. Không dán đoạn văn SGK. Dùng gạch đầu dòng,
  từ khóa, sơ đồ.
- **Toàn màn hình:** có nút Fullscreen (Fullscreen API); `Esc` thoát.
- **Responsive:** chạy tốt ở 1920×1080 và 1366×768 (phổ biến ở trường); vẫn dùng
  được trên tablet/điện thoại. Không để tràn ngang.

## 3. Điều khiển bằng bàn phím (bắt buộc)

GV thường dùng bút trình chiếu / bàn phím, không dùng chuột liên tục:

| Phím | Tác dụng |
|---|---|
| `→` hoặc `Space` | Tiếp tục / màn sau |
| `←` | Quay lại |
| `Enter` | Xác nhận lựa chọn / lộ đáp án |
| `1 2 3 4` | Chọn đáp án A/B/C/D (khi có câu hỏi) |
| `F` | Bật/tắt toàn màn hình |
| `Esc` | Thoát toàn màn hình |
| `T` | Bật/tắt chế độ giáo viên |
| `P` | Bật/tắt **bút vẽ** (khoanh tròn/gạch chân trên màn hình) |

Nhớ: không "nuốt" phím khi con trỏ đang trong ô nhập liệu (fill-blank); khi bút
vẽ đang bật thì phím số 1–4 tạm ngưng (tránh chọn nhầm đáp án khi đang vẽ).

## Công cụ cho giáo viên khi đứng lớp (engine v2)

Thanh điều khiển có 3 biểu tượng bên phải, luôn sẵn sàng:

- **⏱️ Đồng hồ:** mở bảng đặt thời gian cho hoạt động hiện tại (−/+ giây), ▶ Bắt
  đầu / ⏸ Tạm dừng / ↺ Đặt lại. Đang chạy thì hiện chip đếm ngược ở thanh trên;
  hết giờ **báo hiệu** (âm thanh + nhấp nháy đỏ) nhưng KHÔNG tự chuyển màn — giáo
  viên chủ động. Đặt mặc định qua `activity.time` (giây).
- **Bộ công cụ vẽ (4 icon riêng trên thanh, luôn bấm được kể cả khi đang vẽ):**
  **✏️ Bút** (nét đỏ), **🖍️ Bút dạ quang** (tô vàng trong suốt), **🧽 Tẩy** (xóa nét
  đã vẽ), **🗑️ Xóa hết**. Bấm lại đúng công cụ đang chọn để **thoát chế độ vẽ**.
  Thanh điều khiển được ghim (sticky) và nằm TRÊN lớp canvas nên các nút luôn bấm
  được. Phím `P` = bút, `H` = bút dạ quang. Nét vẽ tự xóa khi chuyển màn.
- **🔊 Âm thanh:** bật/tắt chuông đúng/sai nhanh (icon đổi 🔊/🔇). Mặc định theo
  `settings.sound`.
- **⛶ Toàn màn hình.**

## Hiện-khi-bấm (dạy khám phá)

Mặc định: **Nhiệm vụ** (🎯) hiện sẵn để cả lớp biết phải làm gì; còn **gợi ý**,
**đáp án/giải thích**, **nội dung kiến thức** và **"Em cần nhớ"** đều ẩn sau nút,
giáo viên bấm mới hiện — để học sinh suy nghĩ/thảo luận trước, rồi mới chốt.

## Trực quan: sơ đồ SVG + ảnh SGK

Ưu tiên **vẽ lại sơ đồ bằng SVG** (`content.blocks` với `kind:"svg"`) cho sắc nét
trên máy chiếu; kèm nút **"🖼️ Xem ảnh SGK"** (`sgkImage`) để mở ảnh gốc khi cần.
Tránh dán nguyên ảnh scan làm nội dung chính (nặng, mờ, lệ thuộc bản quyền).

## 4. Chế độ giáo viên (Teacher Mode)

Bật bằng phím `T` hoặc một nút nhỏ ở góc (không nổi bật với HS). Cho phép:

- Nhảy nhanh tới hoạt động bất kỳ (menu).
- Hiện/ẩn đáp án đúng.
- Reset hoạt động hiện tại / reset điểm.
- Bỏ qua câu hỏi.
- Bật/tắt đếm giờ, bật/tắt âm thanh.

Các điều khiển này **ẩn** khỏi giao diện HS bình thường để màn hình gọn, không gây
rối; chỉ hiện khi GV chủ động bật.

## 5. Layout một màn hoạt động (khuôn chung)

```
┌────────────────────────────────────────────────────────┐
│  [Tên hoạt động]                 Tiến trình ▓▓▓▓░░  3/8  │
├────────────────────────────────────────────────────────┤
│                                                          │
│              NỘI DUNG CHÍNH (câu hỏi / game / khám phá)  │
│                                                          │
├────────────────────────────────────────────────────────┤
│  ← Quay lại        [Điểm: 300 · 🔥x2]        Tiếp tục →  │
└────────────────────────────────────────────────────────┘
```

Màn chốt kiến thức ("EM CẦN NHỚ") dùng layout tối giản: 1–3 ý lớn, biểu tượng,
nền nổi bật để HS biết "đây là phần phải nhớ".

## 6. Phong cách hình ảnh (Modern Educational UI)

- Sinh động, hiện đại, sạch, thân thiện HS THCS — **không** trẻ con quá, **không**
  giống phần mềm doanh nghiệp, **không** lòe loẹt.
- Thành phần: card bo góc, icon, minh họa nhẹ, progress bar, badge, điểm số,
  micro-interaction.
- Bảng màu: 1 màu chủ đạo + 1–2 màu nhấn + màu đúng (xanh lá) / sai (đỏ/cam) rõ
  ràng. Nền dịu để chữ nổi.
- Font: hệ chữ dễ đọc, hỗ trợ tiếng Việt đầy đủ (dấu). Ưu tiên font hệ thống để
  chạy offline; nếu nhúng web font phải kèm fallback.

## 7. Hình ảnh từ SGK

- Ưu tiên dùng **hình thật trong PDF** khi cần trực quan (trích/crop hợp lý, không
  làm biến dạng, không đổi ý nghĩa). Lưu trong `assets/` của app.
- Hình minh họa bổ sung chỉ dùng khi cần; không để hình làm loãng kiến thức.
- Ghi nguồn nếu hình có yêu cầu bản quyền; nếu không chắc → `[CẦN GIÁO VIÊN KIỂM TRA]`.

## 8. Offline-first

App phải chạy khi mạng trường chập chờn: mở `index.html` là chạy. Không phụ thuộc
API ngoài cho chức năng cốt lõi. Nhúng/để cạnh mọi asset (ảnh, font, JS) trong
thư mục dự án. Nếu buộc dùng CDN cho một thư viện, cân nhắc tải về đặt trong
`assets/` để không cần mạng.
