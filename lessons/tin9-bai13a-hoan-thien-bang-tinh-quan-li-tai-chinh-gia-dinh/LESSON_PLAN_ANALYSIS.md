# PHÂN TÍCH BÀI HỌC — TIN 9, BÀI 13a: HOÀN THIỆN BẢNG TÍNH QUẢN LÍ TÀI CHÍNH GIA ĐÌNH

## 1. Thông tin bài học
- **Môn / Lớp:** Tin học · Lớp 9
- **Bộ sách:** Kết nối tri thức với cuộc sống
- **Chủ đề:** Chủ đề 4 (lựa chọn a) — dự án Quản lí tài chính gia đình
- **Trang SGK:** 52–54
- **Thời lượng:** 02 tiết (giáo án): Mở đầu 10' · HĐ2.1 25' · HĐ2.2 thực hành · Luyện tập 10' · Vận dụng 10'.

## 2. Mục tiêu (trích giáo án)
- Biết tổ chức dữ liệu thu – chi hợp lí; cập nhật, chỉnh sửa bảng tính khi dữ liệu thay đổi.
- Biết dùng các hàm tính toán để phân tích, so sánh thu – chi; trình bày kết quả trực quan (bảng – biểu đồ).
- **Năng lực số:** 1.3.TC2a, 1.3.TC2b, 5.2.TC2b, 5.3.TC2a.
- **Năng lực AI:** 9.D2.2.

## 3. CORE KNOWLEDGE
1. Trang tính Tổng hợp lấy dữ liệu từ trang Thu nhập và Chi tiêu để cân đối thu, chi.
2. Tham chiếu ô ở trang tính khác: `='Thu nhập'!H7` = tên trang tính + dấu chấm than + địa chỉ ô.
3. B14 `='Thu nhập'!H7`, B15 `='Chi tiêu'!H11` — tự cập nhật khi dữ liệu nguồn thay đổi.
4. Giá trị NET = thu − chi (B16 `=B14-B15`); NET nhỏ → cần tiết kiệm.
5. Biểu đồ cột (Clustered Column) từ A13:B15, đặt ở A2:B12, giúp so sánh trực quan.

## 4. BẢNG ÁNH XẠ HOẠT ĐỘNG

| # | Hoạt động (giáo án) | id | SGK | Hình thức app | Tương tác |
|---|---|---|---|---|---|
| 1 | HĐ1 Mở đầu (video + câu hỏi tình huống) | `mo-dau` | tr.52 | GV tự chiếu video (không có nút) | Đúng/Sai, chọn nhiều, trắc nghiệm |
| 2 | HĐ2.1 NV1 — Hoạt động 1 | `hd1-tong-hop` | Hình 13a.1–13a.3 | Ảnh SGK | Trắc nghiệm |
| 3 | HĐ2.1 NV2 — câu hỏi 2 SGK tr.53 | `tham-chieu` | Bảng 13a.1 | Bảng vẽ lại, ba thành phần tô màu | Chọn nhiều, trắc nghiệm |
| 4 | HĐ2.1 NV2 — câu hỏi 1 SGK tr.53 | `ghep-hinh-13a-4` | Hình 13a.4 | (1), (2), (3) ↔ cụm từ | Ghép đôi |
| 5 | HĐ2.1 — Giá trị NET, Em cần nhớ | `gia-tri-net` | tr.53 | Kiến thức ẩn, bấm hiện | Trắc nghiệm |
| 6 | (GV chọn thêm) Thí nghiệm cập nhật tự động | `thi-nghiem` | — | Sửa số ở Thu nhập/Chi tiêu → Tổng hợp, NET, biểu đồ đổi | Thí nghiệm, trắc nghiệm |
| 7 | (GV chọn thêm) Săn lỗi công thức | `san-loi` | — | 6 hộp, mỗi hộp một công thức lỗi | Hộp quà |
| 8 | HĐ2.2 NV1 — a) Tính tổng | `thuc-hanh-a` | Hình 13a.1, 13a.2 | H7 =SUM(H2:H6), H11 =SUM(H2:H10) | Trắc nghiệm |
| 9 | HĐ2.2 NV2 — b) Tạo trang Tổng hợp | `thuc-hanh-b` | tr.54 | A1, A13:B16 | Trắc nghiệm |
| 10 | HĐ2.2 NV2 — b) Biểu đồ | `bieu-do` | Hình 13a.5 | Vùng, dạng, vị trí biểu đồ | Trắc nghiệm |
| 11 | (GV chọn thêm) Các bước tạo biểu đồ | `cac-buoc-bieu-do` | tr.54 | 6 bước | Sắp xếp |
| 12 | HĐ3 Luyện tập — “Chăm sóc cây xanh” | `luyen-tap` | — | 7 câu của giáo án (đã bỏ câu 6) | Trò chơi cây xanh |
| 13 | HĐ4 Vận dụng (= Luyện tập SGK) | `van-dung` | tr.54 | Bổ sung dữ liệu, sửa công thức, cập nhật Tổng hợp | Trắc nghiệm |
| 14 | HĐ4 — đánh giá NET | `van-dung-nha` | tr.54 | Đánh giá, đề xuất điều chỉnh | Tự luận |
| 15 | Tổng kết | `tong-ket` | — | Em đã học, từ khoá, thử thách | Trắc nghiệm |

## 5. Quyết định (GV đã chọn)
- **Không mô phỏng bảng tính nhiều trang.** App dùng trắc nghiệm và ảnh SGK; HS thao tác trên Excel thật.
  - Phần “Thí nghiệm” là minh hoạ HTML, không chấm điểm.
- **Luyện tập, Vận dụng theo giáo án:**
  - Luyện tập = trò chơi “Chăm sóc cây xanh”.
  - Vận dụng = nội dung Luyện tập SGK (bổ sung dữ liệu, đánh giá NET).
  - Không thêm Vận dụng SGK (Triển lãm tin học).
- **Trò chơi Chăm sóc cây xanh:**
  - Câu 5 giữ đáp án giáo án (A “Phạm vi dữ liệu cần tính tổng”).
  - Bỏ câu 6 (hàm OR, ngoài SGK).
- **Không thêm nút mở video** giáo án (youtu.be/Bn-UsLluVVs).
- **Tự thêm để minh hoạ:** dữ liệu bổ sung ở Vận dụng lấy lại từ Bài 11a (Thu +1,800 → 19,300; Chi +530 → 14,170; NET 5,130).
