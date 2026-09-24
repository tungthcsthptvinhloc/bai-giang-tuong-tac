# 🏫 Lớp học tương tác — hướng dẫn sử dụng hằng ngày

Cả lớp làm bài **đồng thời** trên máy tính phòng máy hoặc điện thoại. Mỗi máy chọn **1 máy +
nhiều học sinh** → một **nhóm**; điểm cho **chung cả nhóm**; cuối giờ **xuất Excel**.

- **Offline** (không cần Internet): nhấp đúp `CHAY-LOP-HOC.bat` trên máy giáo viên.
- **Online** (Firebase + Cloudflare): vào `https://<ten-ban-chon>.pages.dev/giao-vien`.
- Cài đặt, cấu hình Firebase, triển khai Cloudflare: xem **[HUONG-DAN-TRIEN-KHAI.md](../HUONG-DAN-TRIEN-KHAI.md)**.

## 1. Chuẩn bị lớp (1 lần)

Bảng GV → tab **📋 Danh sách lớp**:
- **📥 Nhập từ Excel**: file có cột **Lớp | STT | Họ và tên** (nhiều lớp trong 1 sheet, tự nhóm theo
  cột Lớp), hoặc mỗi lớp 1 sheet (tên sheet = tên lớp). Nhận cả cột *Họ đệm* + *Tên* riêng.
  Xem trước danh sách rồi bấm Nhập; lớp trùng tên sẽ được cập nhật.
- **📤 Xuất Excel**: tải danh sách hiện có — **dùng làm file mẫu**, sửa rồi nhập lại. Dùng để chuyển
  danh sách giữa bản offline và online.
- Hoặc dán thẳng danh sách (copy từ Excel) vào ô bên dưới rồi **💾 Lưu**.

Ở thẻ **▶️ Bắt đầu tiết học**, mục **🖥️ Phòng máy**: nhập **số máy tính** (và số **điện thoại** nếu cho
HS dùng điện thoại). Học sinh sẽ chọn đúng 1 máy trong danh sách *Máy 01, Máy 02…*; mỗi máy chỉ 1 nhóm.

## 2. Mỗi tiết học

| Bước | Giáo viên | Học sinh |
|---|---|---|
| 1 | Chọn **Lớp** + **Bài giảng** → **▶ Bắt đầu** | |
| 2 | **🖥️ Chiếu mã QR lên máy chiếu** | Gõ địa chỉ / quét QR |
| 3 | | **① Chọn máy** mình đang ngồi → **② chọn tên tất cả bạn cùng máy** → 🚀 Vào học |
| 4 | **📺 Mở bài giảng để trình chiếu** → giảng bình thường | Làm bài trên máy |
| 5 | Theo dõi tab 💻 Nhóm · 📊 Theo câu hỏi · ✍️ Tự luận | |
| 6 | **⬇️ Xuất Excel** → **⏹ Kết thúc tiết** | Màn hình báo kết thúc + điểm nhóm |

## 3. Hai cách tổ chức làm bài

### HS tự làm (mặc định)
HS tự chuyển hoạt động theo tốc độ riêng; làm xong **biết đúng/sai ngay**; mỗi câu chỉ tính **lần làm đầu**.

### 👣 HS theo nhịp giáo viên (bật trên bảng GV)
- Máy HS **tự chuyển theo hoạt động GV đang chiếu**; HS không tự nhảy sang hoạt động khác.
- HS làm bài nhưng **chưa biết đúng/sai**:
  - Trắc nghiệm: **đổi đáp án được** đến khi GV kết thúc.
  - Ghép đôi, phân loại, sắp xếp, điền khuyết: làm hết rồi bấm **📤 Nộp bài** (sửa và nộp lại được).
- **Bấm giờ**: bảng 📊 trên màn chiếu (hoặc bảng GV) → **▶ Bấm giờ** (thời gian mặc định theo bài), **±30s**, **⏸**.
  Đồng hồ hiện **trên máy HS**. **Hết giờ → máy HS khóa**; ai chưa làm/chưa nộp tính là *chưa hoàn thành*.
- Trong lúc HS làm, màn chiếu hiện **bao nhiêu máy chọn A / B / C / D / Chưa làm** (chưa lộ đáp án).
- **🏁 Kết thúc**: máy HS hiện đúng/sai của nhóm mình + giải thích; màn chiếu tô đáp án đúng và liệt kê
  các máy **✅ Đúng · ❌ Sai · ⏳ Chưa làm**. **↺ Mở lại** nếu muốn cho làm tiếp.

### Các nút khác
- **⏸ Tạm dừng cả lớp**: che màn hình mọi máy HS — *"Cả lớp nhìn lên bảng"*.
- **💡 HS xem hướng trả lời**: cho HS xem gợi ý đáp án câu vận dụng/tình huống.
- **🏅 HS thấy điểm**: bật/tắt hiện điểm nhóm trên máy HS.
- **🏆 Xếp hạng**: chiếu top nhóm lên màn hình.

## 4. Xử lí tình huống trong giờ

- **HS chọn nhầm tên / vào muộn**: tab 🧑‍🎓 Học sinh → chọn lại nhóm ở cột "Máy / Nhóm"; hoặc trên máy
  của nhóm bấm **➕ Thêm bạn**.
- **Nhóm chọn nhầm máy / đổi máy**: thẻ nhóm → **⋯ → Xóa nhóm (giải phóng máy)** → các bạn chọn lại.
- **Cho nhóm làm lại**: thẻ nhóm → **⋯ → Làm lại: <hoạt động>**.
- **Mất mạng**: máy HS hiện chấm đỏ; bài làm vẫn giữ trong máy và **tự gửi lại** khi có mạng.
- **Hết giờ chưa dạy hết bài**: tab ⚙️ Tính điểm → *Chỉ tính tới hoạt động GV đang chiếu*.
- **Dạy tiếp ở tiết sau**: tab 🕘 Lịch sử → **▶ Mở lại**.

## 5. Cách tính điểm (thang 10, chung cả nhóm)

- Mỗi câu trắc nghiệm / bài ghép đôi / phân loại / sắp xếp / điền khuyết = **1 bài**. Trắc nghiệm được
  **chấm lại theo đáp án** (không tin kết quả máy HS gửi).
- **HS tự làm**: chỉ tính lần đầu; ghép đôi/phân loại = tỉ lệ mục đúng ngay lần đầu.
- **Theo nhịp GV**: tính đáp án cuối cùng lúc kết thúc/hết giờ; bài kéo thả = tỉ lệ mục đúng khi nộp.
- **Điểm = (tổng điểm các bài ÷ số bài được tính) × 10 + điểm thưởng**, tối đa 10. Bài chưa làm = 0.
- Tự luận: GV đọc ở tab ✍️, đánh dấu ⭐, cộng **＋0,5đ**.

## 6. File Excel bảng điểm

| Sheet | Nội dung |
|---|---|
| Bảng điểm | Từng HS theo danh sách lớp: máy/nhóm, bạn cùng nhóm, số bài làm, điểm thưởng, **ĐIỂM**; HS không vào: *Không tham gia* |
| Theo nhóm | Mỗi nhóm × mỗi hoạt động: tỉ lệ đạt |
| Chi tiết từng câu | Mỗi câu × mỗi nhóm + tỉ lệ đạt TB (biết câu nào HS hay sai) |
| Tự luận | Câu trả lời tự luận của các nhóm |

## 7. Lưu ý
- Bài giảng vẫn **mở trực tiếp bằng file** để trình chiếu như trước (không cần máy chủ).
- Offline: dữ liệu ở `lop-hoc/data/` — nên sao lưu định kì. Online: Firebase → Export JSON.
- Công cụ dành cho **đánh giá thường xuyên trên lớp**: HS rành máy tính có thể xem được đáp án trong
  mã nguồn trang web. Không thay cho bài kiểm tra định kì.
