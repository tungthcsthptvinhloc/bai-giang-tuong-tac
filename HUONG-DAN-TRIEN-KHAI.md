# HƯỚNG DẪN TRIỂN KHAI — Lớp học tương tác (Offline & Online)

Hệ thống có **2 cách chạy**, dùng **chung một bộ bài giảng và một giao diện**:

| | **OFFLINE** (mạng LAN phòng máy) | **ONLINE** (Internet) |
|---|---|---|
| Máy chủ | Máy giáo viên chạy `lop-hoc/CHAY-LOP-HOC.bat` | Cloudflare Pages (web) + Firebase (dữ liệu) |
| Cần Internet? | **Không** | Có (HS dùng Wi-Fi/4G đều được) |
| Địa chỉ HS vào | `http://192.168.x.x:8080` (IP máy GV) | `https://ten-ban-chon.pages.dev` |
| Bảng giáo viên | `http://localhost:8080/giao-vien` | `https://ten-ban-chon.pages.dev/giao-vien` |
| GV đăng nhập | Tự động trên máy GV (máy khác: mã giáo viên) | Email + mật khẩu (Firebase) |
| Dữ liệu lưu ở | `lop-hoc/data/` trên máy GV | Firebase Realtime Database |
| Chi phí | 0 đ | 0 đ (gói miễn phí Spark + Cloudflare Free) |

Hai chế độ **độc lập** — danh sách lớp chuyển qua lại bằng **Excel**: bảng GV → tab
📋 Danh sách lớp → **📤 Xuất Excel** ở bên này → **📥 Nhập từ Excel** ở bên kia.

> Chỉ dùng offline? Làm **Phần 1** là đủ. Muốn thêm bản online: làm tiếp **Phần 2 → 5**.

---

## Phần 1 — Chạy OFFLINE trên máy giáo viên

1. Cài **Node.js LTS**: <https://nodejs.org> → tải bản *LTS* → cài mặc định (Next liên tục). Chỉ làm 1 lần.
2. Nhấp đúp **`lop-hoc/CHAY-LOP-HOC.bat`**. Cửa sổ đen hiện địa chỉ cho HS và **mã giáo viên**; trình duyệt tự mở bảng GV.
3. Lần đầu Windows hỏi *"Allow Node.js to access networks"* → tick **Private** và **Public** → **Allow access** (cần quyền quản trị). Bỏ qua bước này thì máy HS **không vào được**.
4. Giữ cửa sổ đen mở suốt tiết. Tắt nhầm → chạy lại, hệ thống tiếp tục đúng tiết đang dạy.

Tùy chọn (chạy bằng dòng lệnh trong thư mục `lop-hoc`):

```bash
node server.js --port 8081
```

- `--port 8081`: đổi cổng khi cổng 8080 bận.
- `--data D:\du-lieu-lop`: lưu dữ liệu ở thư mục khác (ví dụ mỗi phòng máy một thư mục).

**Sao lưu:** chép thư mục `lop-hoc/data/` (chứa danh sách lớp + kết quả các tiết). Dữ liệu của phiên bản cũ đã được tự chuyển sang; bản gốc giữ ở `lop-hoc/data/sessions-v1-backup/`.

---

## Phần 2 — Tạo và cấu hình FIREBASE (1 lần, ~15 phút)

### 2.1. Tạo dự án
1. Vào <https://console.firebase.google.com> bằng tài khoản Google → **Create a project** (Tạo dự án).
2. Đặt tên, ví dụ `lop-hoc-tin` → có thể **tắt Google Analytics** (không cần) → **Create project**.
3. Giữ gói **Spark (miễn phí)**. Không cần nhập thẻ.

### 2.2. Bật đăng nhập (Authentication)
1. Menu trái **Build → Authentication → Get started**.
2. Tab **Sign-in method**:
   - Bấm **Email/Password** → bật **Enable** (dòng đầu) → **Save**. *(đăng nhập của giáo viên)*
   - Bấm **Add new provider → Anonymous** → **Enable** → **Save**. *(máy học sinh — HS không cần tài khoản)*
3. Tab **Users → Add user**: nhập **email** và **mật khẩu** của thầy/cô → **Add user**.
   Đây là tài khoản duy nhất có quyền giáo viên.
4. Tab **Settings → Authorized domains → Add domain**: thêm `ten-ban-chon.pages.dev`
   (tên Cloudflare ở Phần 4; có thể quay lại thêm sau).

### 2.3. Tạo cơ sở dữ liệu (Realtime Database)
1. Menu trái **Build → Realtime Database → Create Database**.
2. Vị trí: **Singapore (asia-southeast1)** — gần Việt Nam, nhanh nhất.
3. Chọn **Start in locked mode** → **Enable**. (Luật bảo mật thật sẽ dán ở bước 2.5.)
4. Ghi lại địa chỉ database hiện ở đầu trang, dạng
   `https://lop-hoc-tin-default-rtdb.asia-southeast1.firebasedatabase.app`.

### 2.4. Lấy cấu hình web và điền vào `config/online.json`
1. Bấm ⚙️ (cạnh *Project Overview*) → **Project settings** → tab **General**.
2. Mục **Your apps** → bấm biểu tượng **`</>`** (Web) → đặt tên `web` → **Register app** (KHÔNG cần tick Hosting).
3. Firebase hiện đoạn `const firebaseConfig = { apiKey: ..., authDomain: ..., ... }`.
4. Trong thư mục dự án, **chép** `config/online.example.json` thành `config/online.json`, rồi điền:

```json
{
  "teacherEmail": "email-giao-vien@gmail.com",
  "firebase": {
    "apiKey": "AIza...",
    "authDomain": "lop-hoc-tin.firebaseapp.com",
    "databaseURL": "https://lop-hoc-tin-default-rtdb.asia-southeast1.firebasedatabase.app",
    "projectId": "lop-hoc-tin",
    "storageBucket": "lop-hoc-tin.appspot.com",
    "messagingSenderId": "1234567890",
    "appId": "1:1234567890:web:abcdef"
  }
}
```

- `teacherEmail` phải **đúng** email đã tạo ở bước 2.2.3.
- Nếu đoạn firebaseConfig **không có `databaseURL`**, lấy địa chỉ ở bước 2.3.4.
- Các giá trị này **không phải mật khẩu** (Firebase thiết kế để công khai); bảo mật nằm ở luật (bước 2.5).

> **Lưu ý định dạng:** Firebase hiển thị cấu hình dạng JavaScript (`apiKey: "..."`, tên mục không có
> ngoặc kép). Công cụ **chấp nhận cả hai kiểu** — có thể dán nguyên các dòng `apiKey: ...` vào trong
> khối `"firebase": { ... }` mà không cần thêm ngoặc kép. Chỉ cần giữ đủ dấu phẩy giữa các dòng và
> dấu `{ }` đóng mở. Nếu viết sai, bước 2.5 sẽ báo lỗi tiếng Việt kèm số dòng.

### 2.5. Dán luật bảo mật
1. Mở **PowerShell** hoặc **Command Prompt** **tại thư mục dự án** (thư mục chứa `tools`, `lessons`…).
   Cách nhanh: mở thư mục `App-bai-giang` trong File Explorer → bấm vào thanh địa chỉ → gõ `powershell` → Enter.
2. Chạy lệnh:

```bash
node tools/make-rules.js
```

   Kết quả đúng sẽ hiện:

   ```
   ✅ Đã tạo luật bảo mật cho giáo viên: email-cua-thay-co@gmail.com
   📋 Nội dung luật ĐÃ ĐƯỢC CHÉP VÀO CLIPBOARD.
   Bước tiếp theo:
     1. Mở: https://console.firebase.google.com/project/<dự-án>/database/<...>/rules
   ```

   Nếu hiện dòng `❌ ...` thì đọc thông báo, sửa `config/online.json` theo gợi ý rồi chạy lại.
3. Mở đường link lệnh vừa in ra (hoặc Firebase Console → **Build → Realtime Database → tab Rules**).
4. Bấm vào ô soạn luật → **Ctrl + A** (chọn hết nội dung cũ) → **Ctrl + V** (dán luật mới) → **Publish**.
   Nội dung đúng bắt đầu bằng `{ "rules": { "teacher": ...` và có email của thầy/cô bên trong.
5. Nếu Firebase báo lỗi đỏ khi Publish: chụp màn hình dòng lỗi gửi lại để xử lí; đừng sửa tay trong ô luật.

   (Clipboard không dán được? Mở file `firebase/database.rules.json` bằng Notepad → Ctrl+A → Ctrl+C.)

Luật này đảm bảo:
- Chỉ tài khoản giáo viên đọc/sửa danh sách lớp, kết quả, điểm thưởng.
- Máy HS chỉ đọc/ghi **bài của nhóm mình**; mỗi máy/mỗi HS chỉ vào **1 nhóm**.
- Khi HS tự làm thì chỉ lần làm đầu được ghi. Khi theo nhịp GV thì HS sửa được đến khi GV kết thúc; **hết giờ bị chặn ngay trên máy chủ**, không thể nộp muộn.

> Mỗi lần đổi `teacherEmail` phải chạy lại `make-rules.js` và dán lại luật.

---

## Phần 3 — Đưa mã nguồn lên GITHUB (1 lần)

1. Cài **Git for Windows**: <https://git-scm.com/download/win> (cài mặc định).
2. Tạo tài khoản <https://github.com> → **New repository** → tên `bai-giang-tuong-tac`
   → chọn **Private** → **Create repository** (không tick README).
3. Mở Command Prompt **tại thư mục dự án** và chạy lần lượt các lệnh sau (mỗi lệnh một dòng; thay `TEN-TAI-KHOAN` bằng tên GitHub của thầy/cô):

```bash
git init
```

```bash
git add -A
```

```bash
git commit -m "Bài giảng tương tác - bản đầu"
```

```bash
git branch -M main
```

```bash
git remote add origin https://github.com/TEN-TAI-KHOAN/bai-giang-tuong-tac.git
```

```bash
git push -u origin main
```

   Lần push đầu, cửa sổ đăng nhập GitHub hiện ra → đăng nhập trình duyệt → xong.

> `.gitignore` đã chặn thư mục `lop-hoc/data/` (họ tên HS, kết quả offline) — **không** bị đưa lên GitHub.
> Repo để **Private** vì chứa email giáo viên trong `config/online.json`.

---

## Phần 4 — Triển khai web lên CLOUDFLARE PAGES (1 lần, ~5 phút)

1. Vào <https://dash.cloudflare.com> (đăng kí miễn phí) → **Workers & Pages** → **Create** → tab **Pages** → **Connect to Git** (hoặc *Import an existing Git repository*).
2. Cho phép Cloudflare truy cập GitHub → chọn repo `bai-giang-tuong-tac` → **Begin setup**.
3. Cấu hình build:

   | Mục | Giá trị |
   |---|---|
   | Project name | `ten-ban-chon` → địa chỉ web sẽ là `ten-ban-chon.pages.dev` |
   | Production branch | `main` |
   | Framework preset | **None** |
   | Build command | `node tools/build-site.js` |
   | Build output directory | `dist` |
   | Root directory | *(để trống)* |

   Mục **Environment variables** (tùy chọn): thêm `NODE_VERSION` = `20`.
4. **Save and Deploy** → chờ 1–2 phút → Cloudflare báo địa chỉ `https://ten-ban-chon.pages.dev`.
5. Quay lại Firebase → Authentication → Settings → **Authorized domains** → thêm `ten-ban-chon.pages.dev` (nếu chưa thêm).
6. Mở `https://ten-ban-chon.pages.dev/giao-vien` → đăng nhập email/mật khẩu giáo viên → tab
   📋 **Danh sách lớp → 📥 Nhập từ Excel** → bắt đầu tiết học như bản offline.

**Tên miền riêng** (không bắt buộc): Pages project → **Custom domains** → nhập tên miền → làm theo
hướng dẫn DNS; sau đó thêm tên miền đó vào *Authorized domains* của Firebase.

Nếu build báo lỗi:
- `Thiếu config/online.json`: chưa commit file cấu hình. Chạy `git add config/online.json`, commit rồi push lại.
- `config/online.json còn thiếu: ...`: còn ô chưa điền (vẫn là `DIEN_...`).

---

## Phần 5 — Cập nhật khi có BÀI GIẢNG MỚI (tự động qua skill)

Khi tạo bài mới bằng skill **thcs-lesson-app**, ở bước cuối skill sẽ tự:
1. Đặt bài vào `lessons/<ten-bai>/`.
2. Chạy `node tools/update-lessons.js`:
   - đồng bộ engine mới nhất vào mọi bài;
   - kiểm tra lỗi (thiếu `id` hoạt động…);
   - cập nhật danh mục `lessons/index.json`.
3. **Bản offline** thấy bài mới ngay (tải lại bảng GV).
4. **Hỏi thầy/cô** có đẩy lên GitHub không. Đồng ý thì skill chạy `git add` / `commit` / `push`; Cloudflare tự build lại, vài phút sau bài có trên web.

Tự làm bằng tay (khi sửa bài không qua skill):

```bash
node tools/update-lessons.js
```

```bash
git add -A && git commit -m "Cập nhật bài giảng" && git push
```

---

## Phần 6 — Dạy một tiết (giống nhau ở cả hai chế độ)

1. Bảng GV → chọn **Lớp** + **Bài giảng**; kiểm tra ô **🖥️ Phòng máy** (số máy tính, số điện thoại) → **▶ Bắt đầu**.
2. **🖥️ Chiếu mã QR** → HS vào địa chỉ / quét QR → **① chọn đúng máy mình ngồi** (máy đã có nhóm bị mờ) → **② chọn tên các bạn cùng máy** → Vào học.
3. **📺 Mở bài giảng để trình chiếu** → giảng như bình thường. Góc phải có bảng **📊 Kết quả lớp**.
4. Hai cách tổ chức:
   - **HS tự làm** (mặc định): HS tự chuyển hoạt động, đúng/sai hiện ngay, mỗi câu chỉ tính lần đầu.
   - **👣 HS theo nhịp GV** (bật trên bảng GV):
     - Máy HS tự chuyển theo slide GV đang chiếu.
     - HS làm bài nhưng **chưa biết đúng/sai**. Trắc nghiệm được đổi đáp án; ghép đôi/kéo thả/sắp xếp/điền khuyết làm hết rồi **Nộp** (nộp lại được).
     - GV bấm **▶ Bấm giờ** (mặc định bằng `time` của hoạt động; chỉnh ±30s): đồng hồ hiện trên **máy HS** và màn chiếu. **Hết giờ thì máy HS bị khóa**; nhóm chưa làm/chưa nộp tính là *chưa hoàn thành*.
     - Trong lúc làm, bảng 📊 trên màn chiếu hiện **số máy chọn A/B/C/D/Chưa làm** (chưa lộ đáp án).
     - GV bấm **🏁 Kết thúc** (trên màn chiếu hoặc bảng GV): máy HS hiện đúng/sai của nhóm mình. Màn chiếu tô đáp án đúng và liệt kê các máy **✅ Đúng · ❌ Sai · ⏳ Chưa làm**. **↺ Mở lại** nếu muốn cho làm tiếp.
5. Cuối giờ: **⬇️ Xuất Excel** → **⏹ Kết thúc tiết**. Tiết cũ xem/xuất lại ở tab 🕘 Lịch sử.

**File Excel danh sách lớp** (nhập/xuất): 1 sheet có cột **Lớp | STT | Họ và tên** (tự nhóm theo cột Lớp), hoặc mỗi lớp 1 sheet (tên sheet = tên lớp). Nhận cả cột *Họ đệm* + *Tên* riêng; cột ngày sinh, giới tính… được bỏ qua. Bấm **📤 Xuất Excel** khi chưa có lớp nào để lấy **file mẫu**.

---

## Phần 7 — Xử lí sự cố

| Hiện tượng | Cách xử lí |
|---|---|
| Offline: HS không vào được | Cùng mạng với máy GV chưa? Đã *Allow* Node.js ở Windows Firewall chưa (Control Panel → Windows Defender Firewall → Allow an app → tick Node.js cả Private/Public)? Thử "Địa chỉ khác" trên bảng GV. Wi-Fi bật *AP/client isolation* sẽ chặn điện thoại. |
| `make-rules.js` báo `SyntaxError` / "viết sai cú pháp" | `config/online.json` sai định dạng: thiếu dấu phẩy giữa các dòng, thiếu `}` hoặc thừa ký tự. Đối chiếu với mẫu ở mục 2.4 (có thể giữ kiểu `apiKey: "..."`). |
| Online: "Sai email hoặc mật khẩu" | Kiểm tra tài khoản ở Firebase → Authentication → Users. |
| Online: "Cấu hình Firebase chưa đúng" | Xem lại `config/online.json` (apiKey, databaseURL) → commit + push lại. Kiểm tra đã bật Email/Password. |
| Online: HS báo không vào được / nút Vào học không phản hồi | Chưa bật **Anonymous** (2.2), hoặc chưa **Publish** luật (2.5). |
| Online: bảng GV báo "Không đọc được dữ liệu giáo viên" | `teacherEmail` trong luật khác email đăng nhập → sửa `config/online.json`, chạy lại `make-rules.js`, dán lại luật. |
| Bài mới không hiện trong danh sách | Chạy `node tools/update-lessons.js` và đọc lỗi (thường là thiếu/trùng `id` hoạt động). Online: nhớ push. |
| Đồng hồ HS lệch | Hệ thống dùng giờ máy chủ nên không lệch theo đồng hồ từng máy; nếu HS mất mạng lâu, tải lại trang. |

**Giới hạn gói miễn phí Firebase (Spark):** 100 kết nối đồng thời, 1 GB dữ liệu, 10 GB tải/tháng — đủ cho 1 giáo viên dạy 1 lớp ~45 HS cùng lúc. Sao lưu online: Realtime Database → ⋮ → **Export JSON**.

---

### Cấu trúc thư mục

```
App-bai-giang/
├─ lessons/                   bài giảng (mỗi bài 1 thư mục) + index.json (danh mục)
├─ lop-hoc/
│  ├─ CHAY-LOP-HOC.bat        chạy bản OFFLINE
│  ├─ server.js               máy chủ LAN (cơ sở dữ liệu thời gian thực nhỏ, luật giống Firebase)
│  ├─ public/                 giao diện DÙNG CHUNG offline/online
│  │    db.js (lớp dữ liệu LAN/Firebase) · core.js (chấm điểm, Excel) · xlsx.js (đọc/ghi Excel)
│  │    join.html (HS vào lớp) · student.js/css (máy HS + màn chiếu) · teacher.* (bảng GV) · qr.js
│  └─ data/                   dữ liệu offline (không đưa lên GitHub)
├─ tools/
│  ├─ update-lessons.js       đưa bài mới vào hệ thống (skill tự chạy)
│  ├─ build-site.js           dựng bản online vào dist/ (Cloudflare chạy)
│  └─ make-rules.js           sinh luật bảo mật Firebase
├─ config/online.json         cấu hình Firebase (tự tạo từ online.example.json)
├─ firebase/rules.template.json
└─ .claude/skills/thcs-lesson-app/   skill tạo bài (engine gốc: assets/app-starter/app.js)
```
