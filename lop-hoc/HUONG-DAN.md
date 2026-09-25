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
| 1 | Chọn **Lớp** + **Bài giảng** → **▶ Bắt đầu** → hệ thống **tự sinh mã vào lớp 4 chữ số** và chiếu mã + QR | |
| 2 | (Chiếu lại bất cứ lúc nào: **🖥️ Chiếu mã QR lên máy chiếu**, hoặc nút **QR** trên màn trình chiếu) | Mở địa chỉ web → **nhập mã 4 số** (quét QR thì mã tự điền) |
| 3 | | **① Chọn máy** mình đang ngồi → **② chọn tên tất cả bạn cùng máy** → 🚀 Vào học |
| 4 | **📺 Mở bài giảng để trình chiếu** → giảng bình thường | Làm bài trên máy |
| 5 | Theo dõi tab 💻 Nhóm · 📊 Theo câu hỏi · ✍️ Tự luận | |
| 6 | **⬇️ Xuất Excel** → **⏹ Kết thúc tiết** | Màn hình báo kết thúc + điểm nhóm |

**Mã vào lớp:** mỗi tiết một mã mới (kể cả khi **▶ Mở lại** tiết cũ). Mã hiện ở cột trái bảng GV và trên
bảng 📊 của màn trình chiếu (🔑). Không có mã thì không vào được lớp; kết thúc tiết là mã hết hiệu lực.
Máy HS đã nhập mã sẽ nhớ mã đến hết tiết (tải lại trang không phải nhập lại).

## 3. Hai cách tổ chức làm bài

### HS tự làm (mặc định)
HS tự chuyển hoạt động theo tốc độ riêng; làm xong **biết đúng/sai ngay**; mỗi câu chỉ tính **lần làm đầu**.
Ghép đôi, phân loại, sắp xếp, điền khuyết: HS **làm hết rồi bấm ✅ Nộp bài & xem kết quả** (chỉ tính lần nộp
đầu) → thấy ngay bài của nhóm mình **✓/✗ từng mục** và đáp án đúng.

### 👣 HS theo nhịp giáo viên (bật trên bảng GV)
- Máy HS **tự chuyển theo hoạt động GV đang chiếu**; HS không tự nhảy sang hoạt động khác.
- HS làm bài nhưng **chưa biết đúng/sai**:
  - Trắc nghiệm: **đổi đáp án được** đến khi GV kết thúc.
  - Ghép đôi, phân loại, sắp xếp, điền khuyết: làm hết rồi bấm **📤 Nộp bài**; sau đó **mỗi lần sửa đều được
    tự lưu** (không lo quên bấm "Nộp lại").
  - Câu bảng tính mô phỏng: mỗi lần chọn ô/vùng là được ghi nhận, chọn lại được.
- **Bấm giờ**: bảng 📊 trên màn chiếu (hoặc bảng GV) → **▶ Bấm giờ** (thời gian mặc định theo bài), **±30s**, **⏸**.
  Đồng hồ hiện **trên thanh tiêu đề cố định** của máy HS và màn trình chiếu (cuộn trang vẫn thấy).
  **Hết giờ → máy HS khóa**; ai chưa làm/chưa nộp tính là *chưa hoàn thành*.
- Trong lúc HS làm, màn chiếu hiện **bao nhiêu máy chọn A / B / C / D / Chưa làm** (chưa lộ đáp án).
- **🏁 Kết thúc**: máy HS hiện đúng/sai của nhóm mình (bài kéo thả: ✓/✗ từng mục) + giải thích; màn chiếu tô đáp án đúng và liệt kê
  các máy **✅ Đúng · ❌ Sai · ⏳ Chưa làm**. **↺ Mở lại** nếu muốn cho làm tiếp.

### ⏱️ Một đồng hồ duy nhất
- Nút **⏱️** trên bài giảng (trang trình chiếu), bảng **📊** và dòng đồng hồ trên **bảng GV** là **cùng một đồng hồ**
  của hoạt động đang chiếu: bấm ở đâu cũng được, mọi nơi cập nhật theo.
- **HS tự làm**: đồng hồ vẫn hiện trên máy HS để các em biết thời gian; hết giờ **chỉ báo**, không khóa.
- **Theo nhịp GV**: hết giờ **khóa máy HS**; bảng ⏱️ có thêm nút **🏁 Kết thúc & công bố** / **↺ Mở lại**.
- Bật theo nhịp khi đồng hồ đang chạy → đồng hồ đó thành đồng hồ theo nhịp (hết giờ sẽ khóa).
- Bảng ⏱️ có nút **✕** để ẩn (đồng hồ vẫn chạy, vẫn hiện trên thanh tiêu đề); phím **Esc** cũng ẩn được.

### 🎉 Cổ vũ khi công bố kết quả
Khi GV bấm **🏁 Kết thúc**:
- **Máy nhóm làm đúng hoàn toàn**: màn chúc mừng toàn màn hình + pháo giấy (*Xuất sắc! Hoàn hảo!…*).
  Nhóm đúng một phần / chưa đúng: lời động viên. Máy HS **không phát âm thanh**.
- **Màn trình chiếu**: **🏆 Bảng vinh danh** các nhóm đúng hoàn toàn (kèm “Đáng khen” cho nhóm đúng ≥ 50%), pháo giấy và
  **kèn chiến thắng + vỗ tay** — âm thanh theo nút **🔊** của bài giảng (bật 🔊 để có tiếng). Bấm để đóng.

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
- **Cho cả lớp làm lại** hoạt động đang chiếu: bảng GV → **🔄 Cả lớp làm lại**, hoặc trên màn trình chiếu bấm phím **T**
  (bảng *Chế độ giáo viên* ở góc trái) → **Làm lại hoạt động**. Kết quả hoạt động đó của mọi nhóm bị xóa, máy HS tự mở lại.
- **Mất mạng**: máy HS hiện chấm đỏ; bài làm vẫn giữ trong máy và **tự gửi lại** khi có mạng.
- **Hết giờ chưa dạy hết bài**: tab ⚙️ Tính điểm → *Chỉ tính tới hoạt động GV đang chiếu*.
- **Dạy tiếp ở tiết sau**: tab 🕘 Lịch sử → **▶ Mở lại**.

## 5. Cách tính điểm (thang 10, chung cả nhóm)

- Mỗi câu trắc nghiệm / bài ghép đôi / phân loại / sắp xếp / điền khuyết = **1 bài**. Trắc nghiệm được
  **chấm lại theo đáp án** (không tin kết quả máy HS gửi).
- Ghép đôi / phân loại / sắp xếp / điền khuyết = **tỉ lệ mục đúng của bài nộp** (kết quả cuối — máy GV chấm
  lại theo bài làm). Câu bảng tính mô phỏng: đúng địa chỉ ô/vùng/hàng/cột = 1 điểm.
- **HS tự làm**: chỉ tính lần trả lời / lần nộp đầu tiên.
- **Theo nhịp GV**: tính bài làm cuối cùng lúc kết thúc/hết giờ.
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
