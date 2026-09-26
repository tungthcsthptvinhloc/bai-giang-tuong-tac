# NGÂN HÀNG CÂU HỎI — TIN 9 BÀI 9a: SỬ DỤNG CÔNG CỤ XÁC THỰC DỮ LIỆU

> Sinh từ `data/lesson.js` (nguồn chính). Sửa câu hỏi trong `data/lesson.js`.

## 1. Mở đầu — Thám tử bắt lỗi dữ liệu 🕵️  `mo-dau`

**Câu 1** (Nhận biết) — Bấm vào ô có điểm không hợp lệ.
- Đáp án: **D6**
- Giải thích: Ô D6 = 11 vượt quá thang điểm 10.

**Câu 2** (Nhận biết) — Bấm vào ô có ngày tháng không hợp lệ.
- Đáp án: **C5**
- Giải thích: Ô C5 = 32/09/2025: tháng 9 không có ngày 32.

**Câu 3** (Thông hiểu) — Bấm vào ô nhập sai kiểu dữ liệu (cần là số nhưng lại là chữ).
- Đáp án: **E7**
- Giải thích: Ô E7 = “năm” là dữ liệu văn bản, hàm SUM bỏ qua nên tổng số vở bị thiếu.

**Câu 4** (Thông hiểu) — Nếu những lỗi này không được phát hiện, điều gì có thể xảy ra?
- A. Không ảnh hưởng gì vì bảng tính tự sửa
- B. Kết quả tính toán, thống kê, báo cáo bị sai ✅
- C. Chỉ làm bảng tính kém đẹp
- D. Máy tính bị nhiễm virus
- Giải thích: Dữ liệu sai → điểm trung bình, tổng số vở sai → thống kê, báo cáo nhầm. Cần kiểm soát dữ liệu ngay khi nhập.

## 2. Quản lí tài chính gia đình bằng bảng tính 💰  `thu-chi`

**Câu 5** (Nhận biết) — Các khoản mục tài chính của gia đình thường được phân thành hai loại nào?
- A. Ngày và Tháng
- B. Thu và Chi ✅
- C. Tiền mặt và Thẻ
- D. Lương và Thưởng
- Giải thích: Các khoản mục thường được phân thành hai loại là Thu và Chi; bảng tính quản lí tài chính gia đình gồm ít nhất hai loại đó.

**Câu 6** (Nhận biết) — Bảng tính ghi chi tiêu (Hình 9a.2) gồm những cột nào? (Chọn tất cả đáp án đúng)
- A. Ngày ✅
- B. Khoản chi ✅
- C. Nội dung ✅
- D. Số tiền (nghìn đồng) ✅
- E. Mật khẩu ngân hàng
- Giải thích: Ngày · Khoản chi · Nội dung · Số tiền (nghìn đồng). Không lưu thông tin bí mật như mật khẩu vào bảng tính.

## 3. Trò chơi: Khoản thu hay khoản chi? 🧺  `phan-loai-thu-chi`

**Phân loại** — Xếp mỗi mục vào đúng loại Khoản thu hoặc Khoản chi. Xếp hết rồi bấm Nộp bài.

- **💵 Khoản thu:** Lương tháng 8 của bố mẹ · Thưởng cuối năm · Tiền làm thêm cuối tuần · Được ông bà tặng
- **🧾 Khoản chi:** Tiền điện tháng 8 · Học phí tháng 8 · Mua thuốc · Tiền xăng xe · Ủng hộ quỹ từ thiện · Gửi tiết kiệm

## 4. Công cụ xác thực dữ liệu — nhập thử nhé! ✅  `xac-thuc-la-gi`

**Câu 7** (Thông hiểu) — Em gõ “Mua sắm” vào ô B7 (cột Khoản chi) rồi nhấn Enter. Điều gì xảy ra?
- A. Ô nhận “Mua sắm” bình thường
- B. Danh sách ở cột F tự thêm “Mua sắm”
- C. Xuất hiện thông báo lỗi vì “Mua sắm” không có trong danh sách khoản chi ✅
- D. Bảng tính tự đổi thành “Khác”
- Giải thích: Cột B chỉ nhận dữ liệu thuộc danh sách F2:F10. “Mua sắm” không có trong danh sách nên bị từ chối (có thể chọn “Khác”).

**Câu 8** (Vận dụng) — Cột D chỉ nhận số nguyên lớn hơn 0. Giá trị nào dưới đây được chấp nhận?
- A. -200
- B. 0
- C. 1500 ✅
- D. abc
- Giải thích: 1500 là số nguyên lớn hơn 0. -200 và 0 không lớn hơn 0; “abc” không phải dữ liệu kiểu số.

**Câu 9** (Thông hiểu) — Khi chọn ô D6, một khung nhỏ màu vàng hiện “Dữ liệu kiểu số — Giá trị lớn hơn 0”. Khung này có tác dụng gì?
- A. Nhắc người nhập biết yêu cầu dữ liệu của ô trước khi nhập ✅
- B. Báo máy tính bị lỗi
- C. Tự động nhập số tiền
- D. Xoá dữ liệu trong ô
- Giải thích: Đây là lời nhắc (Input Message) hiện ra khi chọn ô, giúp người nhập biết yêu cầu để nhập đúng ngay từ đầu.

## 5. Lệnh Data Validation và các kiểu dữ liệu cho phép 🧰  `lenh-data-validation`

**Câu 10** (Nhận biết) — Để sử dụng công cụ xác thực dữ liệu, em chọn:
- A. Home/Number/Format Cells
- B. Data/Data Tools/Data Validation ✅
- C. Insert/Tables/Table
- D. Formulas/Function Library/Insert Function
- Giải thích: Trong nhóm lệnh Data Tools của dải lệnh Data, chọn Data Validation.

**Câu 11** (Nhận biết) — Trong hộp thoại Data Validation, kiểu dữ liệu cho phép được chọn ở ô nào?
- A. Ô Allow trong thẻ Settings ✅
- B. Ô Title trong thẻ Input Message
- C. Nút Clear All
- D. Ô Style trong thẻ Error Alert
- Giải thích: Tại ô Allow trong thẻ Settings, em chọn kiểu dữ liệu hoặc giá trị dữ liệu (Hình 9a.5).

## 6. Ghép kiểu dữ liệu với ý nghĩa (Bảng 9a.1) 🧩  `bang-9a1`

**Ghép đôi** — Ghép mỗi lựa chọn trong ô Allow với ý nghĩa của nó. Làm hết rồi bấm Nộp bài.

- Any value ⟶ Bất kì giá trị nào
- Whole number ⟶ Ô tính chỉ chấp nhận các số nguyên
- Decimal ⟶ Ô tính chỉ chấp nhận các số thập phân
- List ⟶ Chọn dữ liệu từ danh sách thả xuống
- Date ⟶ Ô tính chỉ chấp nhận dữ liệu ngày tháng
- Time ⟶ Ô tính chỉ chấp nhận dữ liệu thời gian
- Text length ⟶ Hạn chế độ dài của văn bản nhập vào ô tính
- Custom ⟶ Cho công thức tuỳ chỉnh

## 7. Trò chơi: Cột này chọn Allow gì? 🎯  `chon-kieu`

**Phân loại** — Xếp mỗi yêu cầu dữ liệu vào lựa chọn Allow phù hợp. Xếp hết rồi bấm Nộp bài.

- **📋 List:** Khoản thu chọn từ danh sách Lương, Thưởng, Làm thêm… · Giới tính chỉ chọn Nam hoặc Nữ
- **🔢 Whole number:** Số tiền (nghìn đồng) là số nguyên lớn hơn 0 · Số học sinh của lớp từ 1 đến 50
- **➗ Decimal:** Chiều cao (mét), ví dụ 1.62 · Điểm trung bình môn từ 0 đến 10, có phần thập phân
- **📅 Date:** Ngày chi tiêu trong tháng 8/2023 · Ngày sinh của học sinh
- **🔤 Text length:** Mã học sinh không quá 8 kí tự · Số điện thoại phụ huynh đúng 10 kí tự

## 8. Câu hỏi SGK: Trang tính Thu nhập cần xác thực gì? ❓  `cau-hoi-9a6`

**Câu 12** (Vận dụng) — Dữ liệu ở cột B (Khoản thu) cần được thiết lập điều kiện xác thực nào?
- A. Allow: Whole number, lớn hơn 0
- B. Allow: List, Source là danh sách các khoản thu ở cột F ✅
- C. Allow: Date
- D. Allow: Any value
- Giải thích: Dữ liệu cột B phải là một mục trong danh sách các Khoản thu (Lương, Thưởng, Làm thêm, Được cho/tặng, Khác) ở cột F → Allow: List, Source: $F$2:$F$6.

**Câu 13** (Vận dụng) — Kéo chọn vùng dữ liệu em sẽ đưa vào ô Source cho cột Khoản thu.
- Đáp án: **F2:F6**
- Giải thích: Vùng chứa danh sách các khoản thu là F2:F6 (Source: =$F$2:$F$6).

## 9. Nhiệm vụ 1 — Sắp xếp các bước tạo danh sách thả xuống 🔢  `nv1-cac-buoc`

**Sắp xếp** — Sắp xếp các bước để dữ liệu mỗi ô ở cột B là một mục trong danh sách ở cột F. Xếp xong bấm Nộp bài.

1. Tạo trang tính Chi tiêu, nhập danh sách khoản chi ở cột F (F2:F10)
2. Chọn các ô của cột B cần nhập dữ liệu, ví dụ B3:B10
3. Chọn Data → Data Tools → Data Validation
4. Trong thẻ Settings, ở ô Allow chọn List
5. Ở ô Source chọn vùng F2:F10 rồi chọn OK
6. Nhập dữ liệu, cột B chọn từ danh sách thả xuống; lưu tệp TaiChinhGiaDinh.xlsx

## 10. Thực hành Nhiệm vụ 1: Danh sách khoản chi thả xuống 📋  `nv1-thuc-hanh`

**Câu 14** (Nhận biết) — Nhiệm vụ 1: Trong ô Source (Hình 9a.8) em nhập vùng nào? (gõ địa chỉ vùng)
- Đáp án: **F2:F10 / $F$2:$F$10 / =$F$2:$F$10**
- Giải thích: Source là vùng dữ liệu chứa danh sách các khoản chi: F2:F10 (hiển thị =$F$2:$F$10).

**Câu 15** (Vận dụng) — Ô B5 có xác thực List. Em gõ đúng chữ “Học tập” (có trong danh sách) thay vì chọn bằng nút ▾. Ô có nhận không?
- Đáp án: **Đúng**
- Giải thích: Đúng. Dữ liệu hợp lệ vì thuộc danh sách; danh sách thả xuống chỉ giúp nhập nhanh và không sai chính tả.

**Câu 16** (Vận dụng cao) — Nếu em chỉ chọn B3:B5 khi thiết lập Data Validation, ô B8 sẽ thế nào?
- A. Cũng có danh sách thả xuống
- B. Không có xác thực, nhập gì cũng được ✅
- C. Không nhập được gì
- D. Tự sao chép dữ liệu từ B5
- Giải thích: Xác thực chỉ áp dụng cho vùng đã chọn khi thiết lập. Vì vậy cần chọn đủ các ô sẽ nhập dữ liệu (ví dụ B3:B10).

## 11. Thực hành Nhiệm vụ 2: Số tiền phải là số lớn hơn 0 💵  `nv2-thuc-hanh`

**Câu 17** (Thông hiểu) — Thẻ Settings cho cột Số tiền (Hình 9a.9) được thiết lập thế nào?
- A. Allow: List · Source: D3:D10
- B. Allow: Whole number · Data: greater than · Minimum: 0 ✅
- C. Allow: Decimal · Data: less than · Maximum: 0
- D. Allow: Text length · Data: equal to · Length: 0
- Giải thích: Số tiền là số nguyên lớn hơn 0: Whole number, greater than, Minimum 0.

**Câu 18** (Thông hiểu) — Trong thông báo lỗi kiểu Stop (Hình 9a.12), bấm nút Retry để làm gì?
- A. Nhập lại dữ liệu vào ô đó ✅
- B. Chấp nhận dữ liệu sai
- C. Xoá toàn bộ trang tính
- D. Tắt công cụ xác thực
- Giải thích: Retry: quay lại ô để nhập lại dữ liệu đúng. Cancel: huỷ, trả lại giá trị cũ của ô.

**Câu 19** (Vận dụng cao) — Cột Số tiền đặt Whole number > 0. Em gõ 150.5 vào ô D7. Kết quả là:
- A. Ô nhận 150.5
- B. Ô tự làm tròn thành 151
- C. Xuất hiện thông báo “Dữ liệu nhập sai” vì không phải số nguyên ✅
- D. Ô đổi thành 0
- Giải thích: Whole number chỉ chấp nhận số nguyên. Muốn nhận cả số thập phân thì chọn Decimal.

## 12. Ghép thẻ của hộp thoại Data Validation 🗂️  `ba-the`

**Ghép đôi** — Ghép mỗi thiết lập với chức năng của nó. Làm hết rồi bấm Nộp bài.

- Thẻ Settings ⟶ Chọn kiểu dữ liệu, giá trị cho phép (Allow, Data, Minimum, Source…)
- Thẻ Input Message ⟶ Nội dung nhắc nhở hiện ra khi chọn ô
- Thẻ Error Alert ⟶ Nội dung thông báo lỗi khi nhập dữ liệu sai
- Source ⟶ Vùng dữ liệu chứa danh sách thả xuống
- Style: Stop ⟶ Không cho nhập dữ liệu sai (chỉ Retry hoặc Cancel)
- Clear All ⟶ Xoá các thiết lập xác thực của ô đã chọn

## 13. Luyện tập: Mở quà bí mật 🎁  `hop-qua`

**Câu 20** (Nhận biết) — Để quản lí tài chính gia đình một cách thuận tiện và hiệu quả, sử dụng phần mềm nào thích hợp nhất?
- A. Microsoft Word
- B. Microsoft Excel ✅
- C. Microsoft PowerPoint
- D. Microsoft Access
- Giải thích: Phần mềm bảng tính (Microsoft Excel) xử lí dữ liệu tự động, thích hợp quản lí thu, chi.

**Câu 21** (Nhận biết) — Để hạn chế loại dữ liệu hoặc giá trị dữ liệu khi nhập vào ô tính, cần sử dụng công cụ nào?
- A. Công cụ xác thực dữ liệu ✅
- B. Công cụ hỗ trợ tính toán
- C. Công cụ sắp xếp dữ liệu
- D. Công cụ lọc dữ liệu
- Giải thích: Công cụ xác thực dữ liệu (Data Validation).

**Câu 22** (Nhận biết) — Để sử dụng công cụ xác thực dữ liệu, chọn:
- A. Data/Data Tools/Consolidate
- B. Data/Data Tools/Flash Fill
- C. Data/Data Tools/Data Validation ✅
- D. Data/Data Tools/Remove Duplicates
- Giải thích: Data/Data Tools/Data Validation.

**Câu 23** (Thông hiểu) — Đâu KHÔNG phải là một lựa chọn trong ô Allow?
- A. Decimal
- B. List
- C. Text length
- D. Data ✅
- Giải thích: Các lựa chọn: Any value, Whole number, Decimal, List, Date, Time, Text length, Custom. “Data” không có (dễ nhầm với Date).

**Câu 24** (Nhận biết) — Muốn khi chọn ô sẽ hiện dòng nhắc “Giá trị lớn hơn 0”, em nhập nội dung ở thẻ nào?
- A. Settings
- B. Error Alert
- C. Input Message ✅
- D. Clear All
- Giải thích: Thẻ Input Message: nội dung thông báo hiển thị khi chọn ô để nhập dữ liệu.

**Câu 25** (Thông hiểu) — Cột Khoản thu lấy dữ liệu từ danh sách F2:F6. Ở ô Allow em chọn:
- A. Any value
- B. List ✅
- C. Whole number
- D. Custom
- Giải thích: Dữ liệu thuộc danh sách cho trước → List, Source = $F$2:$F$6.

**Câu 26** (Vận dụng) — Ô có xác thực Whole number, lớn hơn 0. Giá trị nào bị từ chối?
- A. 7000
- B. 1
- C. 250
- D. -50 ✅
- Giải thích: -50 không lớn hơn 0 nên bị từ chối.

**Câu 27** (Vận dụng cao) — Vì sao nên dùng danh sách thả xuống cho cột Khoản chi?
- A. Để bảng tính có nhiều màu
- B. Nhập nhanh, thống nhất tên khoản mục, tránh sai chính tả → thống kê chính xác ✅
- C. Để không cần nhập Số tiền
- D. Để tự động tính tổng chi
- Giải thích: Tên khoản mục thống nhất giúp tổng hợp, thống kê theo khoản mục chính xác (ví dụ không có cả “Học tập” lẫn “hoc tap”).

## 14. Luyện tập SGK: Trang tính Thu nhập 🧾  `luyen-tap-thuc-hanh`

**Câu 28** (Vận dụng) — Luyện tập 1b: Để khoản thu ở cột B được lấy từ danh sách ở cột F, em thiết lập:
- A. Allow: List · Source: =$F$2:$F$6 ✅
- B. Allow: List · Source: =$B$3:$B$6
- C. Allow: Whole number · Minimum: 0
- D. Allow: Text length · Maximum: 6
- Giải thích: Nguồn danh sách là các khoản thu ở F2:F6.

**Câu 29** (Thông hiểu) — Luyện tập 2: Hạn chế cột Số tiền của trang Thu nhập “tương tự như yêu cầu của trang tính Chi tiêu” nghĩa là:
- A. Chỉ nhận chữ
- B. Chỉ nhận số nguyên lớn hơn 0, có lời nhắc và thông báo lỗi như trang Chi tiêu ✅
- C. Chỉ nhận số âm
- D. Chỉ nhận ngày tháng
- Giải thích: Whole number · greater than · Minimum 0; Input Message và Error Alert giống trang tính Chi tiêu.

## 15. Phiếu tự kiểm tra tệp TaiChinhGiaDinh.xlsx 📋  `tu-kiem-tra`

**Phiếu tự đánh giá** (gửi GV, không chấm điểm)

- **📋 TRANG TÍNH CHI TIÊU:** Đặt tên trang tính Chi tiêu và nhập danh sách khoản chi ở cột F · Cột B có danh sách thả xuống (List, Source F2:F10) · Cột D chỉ nhận số nguyên lớn hơn 0 · Có lời nhắc Input Message khi chọn ô cột D · Có thông báo lỗi Error Alert kiểu Stop khi nhập sai
- **🧾 TRANG TÍNH THU NHẬP:** Tạo trang tính Thu nhập và nhập danh sách khoản thu ở cột F · Cột B lấy dữ liệu từ danh sách F2:F6 · Cột D xác thực giống trang tính Chi tiêu · Nhập thêm ít nhất ba hàng dữ liệu · Lưu tệp TaiChinhGiaDinh.xlsx
- Câu hỏi mở: Nhóm em hay mắc lỗi gì khi thiết lập xác thực dữ liệu? Em đã khắc phục thế nào?
- Dự kiến sản phẩm:
  - Lỗi thường gặp: chọn thiếu ô cần xác thực (chỉ B3 thay vì B3:B10); Source chọn cả tiêu đề F1; quên thẻ Input Message / Error Alert; chọn Decimal thay vì Whole number.
  - Khắc phục: chọn lại vùng, mở Data Validation sửa thiết lập (Clear All để làm lại từ đầu), nhập thử dữ liệu sai để kiểm tra.

## 16. Vận dụng: Kinh phí Triển lãm tin học 🏛️  `van-dung`

**Câu 30** (Vận dụng) — Cột Khoản thu của trang tính Các khoản thu (Hình 9a.14) nên xác thực thế nào?
- A. Allow: List · Source: =$F$2:$F$3 (Quỹ, Tài trợ) ✅
- B. Allow: Whole number · Minimum: 0
- C. Allow: Date
- D. Không cần xác thực
- Giải thích: Khoản thu chọn từ danh sách Quỹ, Tài trợ ở F2:F3.

**Câu 31** (Vận dụng cao) — Nhóm thêm khoản chi “Trang trí” vào ô F4, nhưng Source vẫn là $F$2:$F$3. Danh sách thả xuống ở cột B sẽ:
- A. Tự có thêm “Trang trí”
- B. Không có “Trang trí”; cần sửa Source thành $F$2:$F$4 ✅
- C. Bị xoá hết
- D. Báo lỗi ngay lập tức
- Giải thích: Danh sách chỉ lấy các ô trong vùng Source. Thêm mục mới thì mở lại Data Validation, sửa Source cho đủ vùng.

## 17. Vận dụng — Thiết kế quy tắc xác thực cho dự án 📝  `van-dung-nha`

**Tự luận 1** — Liệt kê các cột của hai trang tính Các khoản thu, Các khoản chi và quy tắc xác thực em đặt cho từng cột (Allow, Source/Minimum, lời nhắc, thông báo lỗi).
- Hướng trả lời: Ví dụ: Ngày — Date (trong thời gian thực hiện dự án); Khoản thu — List, Source $F$2:$F$3 (Quỹ, Tài trợ); Khoản chi — List, Source $F$2:$F$3 (Văn phòng phẩm, In tài liệu); Nội dung — Text length tối đa 50 kí tự (hoặc Any value); Số tiền — Whole number greater than 0, Input Message “Dữ liệu kiểu số — Giá trị lớn hơn 0”, Error Alert Stop “Dữ liệu nhập sai”.

**Tự luận 2** — Vì sao dùng xác thực dữ liệu giúp nhóm quản lí kinh phí dự án chính xác hơn khi nhiều bạn cùng nhập dữ liệu?
- Hướng trả lời: Mọi bạn phải nhập theo cùng quy tắc: tên khoản mục thống nhất (chọn từ danh sách), số tiền luôn là số dương, ngày hợp lệ → hạn chế nhập nhầm, sai chính tả, sai kiểu; tổng hợp, thống kê thu chi luôn đúng.

## 18. Tổng kết  `tong-ket`

**Câu 32** (Vận dụng cao) — Cột Điểm của một bảng điểm chỉ nhận điểm từ 0 đến 10, có thể có phần thập phân (ví dụ 8.5). Thiết lập phù hợp là:
- A. Whole number · between · 0 và 10
- B. Decimal · between · 0 và 10 ✅
- C. List · Source: 0:10
- D. Text length · less than · 10
- Giải thích: Điểm có phần thập phân → Decimal; giới hạn từ 0 đến 10 → between, Minimum 0, Maximum 10.

**Câu 33** (Vận dụng) — Muốn khi nhập sai, bảng tính KHÔNG cho giữ lại dữ liệu sai, ở thẻ Error Alert em chọn Style:
- A. Information
- B. Warning
- C. Stop ✅
- D. Custom
- Giải thích: Style Stop chặn dữ liệu sai (chỉ có Retry hoặc Cancel). Warning và Information vẫn cho phép giữ dữ liệu nếu người nhập đồng ý.

