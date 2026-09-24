# Skill: `thcs-lesson-app`

Biến **PDF sách giáo khoa** + **Kế hoạch bài dạy (giáo án)** của giáo viên THCS
thành một **ứng dụng web bài giảng tương tác** dùng ngay trên máy chiếu.

Không phải slide. Không phải website giới thiệu. Đây là một *trợ giảng số*: giáo
viên điều khiển, học sinh tham gia trả lời/chơi/thảo luận, có điểm, phản hồi sau
mỗi câu, chốt kiến thức "Em cần nhớ", và tổng kết cuối tiết.

---

## Dùng như thế nào

Trong Claude Code, tại thư mục dự án của bạn, chỉ cần đưa tài liệu và nói yêu cầu.
Ví dụ các câu kích hoạt skill:

```
Tạo cho tôi một bài giảng tương tác từ SGK.pdf và giáo án này.
```
```
Biến giáo án + sách này thành app dạy học trên máy chiếu.
```
```
Số hóa tiết Tin học 6 bài "..." thành ứng dụng có quiz kiểu Kahoot.
```

Cung cấp cho Claude:
1. **PDF các trang SGK** của bài học.
2. **Giáo án** (`.docx` / `.pdf` / dán trực tiếp).

Claude sẽ tự động:
- Đọc hết SGK + giáo án, xác định **kiến thức trọng tâm** và **yêu cầu cần đạt**.
- Giữ nguyên **tên & thứ tự hoạt động** của giáo án.
- Chuyển mỗi hoạt động thành một **module tương tác** (quiz, kéo thả, ghép đôi,
  sắp xếp, lật thẻ, tình huống...).
- Xây app từ scaffold có sẵn, **tách nội dung** vào `data/lesson.js`.
- Kiểm tra bằng `scripts/validate-lesson.js`.

## Bạn nhận được gì (output)

| File | Nội dung |
|---|---|
| Ứng dụng web | Mở `index.html` là chạy, **không cần Internet** |
| `LESSON_PLAN_ANALYSIS.md` | Phân tích bài học + bảng ánh xạ hoạt động + core knowledge |
| `LESSON_SCRIPT.md` | Kịch bản: mỗi màn hình giáo viên nói/làm gì |
| `QUESTION_BANK.md` / `data/lesson.js` | Ngân hàng câu hỏi phân loại 4 mức độ |
| `TEACHER_GUIDE.md` | Hướng dẫn sử dụng + đáp án + cách tổ chức học sinh |

## Điều khiển trong lớp (phím tắt)

`→` / `Space` tiếp · `←` quay lại · `Enter` xác nhận · `1 2 3 4` chọn đáp án ·
`F` toàn màn hình · `T` chế độ giáo viên (nhảy hoạt động, hiện/ẩn đáp án, reset).

---

## Cấu trúc skill

```
thcs-lesson-app/
├── SKILL.md                     # Quy trình & nguyên tắc (Claude đọc file này)
├── README.md                    # File bạn đang đọc
├── references/                  # Kiến thức nền tải khi cần
│   ├── pedagogy.md              #   sư phạm GDPT 2018, dạy học tích cực
│   ├── question-design.md       #   viết câu hỏi 4 mức độ + feedback
│   ├── gamification.md          #   chọn game theo mục tiêu, luật điểm
│   └── lesson-structure.md      #   layout máy chiếu, điều hướng, teacher mode
├── templates/                   # Khuôn cho các output
│   ├── lesson-analysis.md
│   ├── teacher-guide.md
│   └── question-bank.js         #   schema dữ liệu bài học (mọi loại câu)
├── scripts/
│   └── validate-lesson.js       # Kiểm tra dữ liệu trước khi bàn giao
└── assets/
    └── app-starter/             # SCAFFOLD app tái sử dụng (đã chạy được)
        ├── index.html
        ├── app.js               #   engine trò chơi (intro, quiz, matching,
        │                        #   dragdrop, ordering, fillblank, flashcard,
        │                        #   scenario, remember, summary)
        ├── styles/app.css       #   giao diện tối ưu máy chiếu
        └── data/lesson.js       #   DỮ LIỆU MẪU (DEMO) — thay bằng bài thật
```

## Thử nhanh ứng dụng mẫu (DEMO)

`assets/app-starter/` đã kèm một bài DEMO ("An toàn khi dùng Internet") để bạn
thấy engine hoạt động. Vì app dùng nhiều file, hãy chạy qua một server tĩnh (mở
trực tiếp bằng `file://` một số trình duyệt sẽ chặn tải file phụ):

```bash
cd .claude/skills/thcs-lesson-app/assets/app-starter
npx serve .        # hoặc bất kỳ server tĩnh nào, rồi mở http://localhost:3000
```

Kiểm tra dữ liệu bài học bất kỳ:

```bash
node .claude/skills/thcs-lesson-app/scripts/validate-lesson.js <path>/data/lesson.js
```

> ⚠️ Dữ liệu trong `app-starter/data/lesson.js` là **DEMO minh họa kỹ thuật**,
> không phải nội dung SGK thật. Khi tạo bài thật, Claude sẽ thay toàn bộ bằng nội
> dung trích từ SGK + giáo án của bạn.

## Nguyên tắc bất di bất dịch

- **Chính xác:** bám SGK + giáo án, không bịa; chỗ thiếu ghi `[CẦN GIÁO VIÊN KIỂM TRA]`.
- **Bám giáo án:** giữ tên & tiến trình sư phạm của giáo viên.
- **Vì học sinh:** mỗi hoạt động phải cho học sinh *làm – nghĩ – tương tác – rút
  ra kiến thức*; feedback luôn kèm giải thích; chốt kiến thức trọng tâm.
