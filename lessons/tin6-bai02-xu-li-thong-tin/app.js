/* ============================================================================
 * THCS Lesson App — ENGINE v2 (vanilla JS, offline, không phụ thuộc thư viện).
 * Đọc dữ liệu từ window.LESSON (data/lesson.js) và render từng hoạt động.
 *
 * TÍNH NĂNG (v2):
 *  - Nhiệm vụ rõ ràng: mỗi hoạt động có khung "🎯 Nhiệm vụ" hiện sẵn (activity.task).
 *  - Hiện-khi-bấm: gợi ý, đáp án/giải thích và "Em cần nhớ" ẩn, GV bấm mới hiện.
 *  - Đồng hồ đếm ngược từng hoạt động (⏱️): đặt thời gian, hết giờ báo hiệu (GV tự quyết).
 *  - Bút vẽ (✏️): vẽ tay khoanh tròn/gạch chân trên màn hình, nhiều màu + tẩy/xóa.
 *  - Hiệu ứng đúng/sai bắt mắt: pháo giấy + dấu ✓ khi đúng, rung + ✗ khi sai.
 *  - Nút "🖼️ Xem ảnh SGK" (activity.sgkImage / question.sgkImage) mở ảnh gốc.
 *  - Sơ đồ tùy biến: block kind "svg"/"html" trong content.blocks.
 *
 * TÍNH NĂNG (v3) — CHẾ ĐỘ LỚP HỌC (nhiều máy cùng làm, xem thư mục lop-hoc/):
 *  - Nếu trang có window.LESSON_HOOKS (do máy chủ lớp học chèn vào) thì engine
 *    báo mọi lần làm bài (onAttempt), câu trả lời tự luận (onText), chuyển
 *    hoạt động (onNavigate) và KHÓA các câu nhóm đã làm (getAttempt).
 *  - Mở file trực tiếp (không có hooks) thì chạy y như v2.
 *  - window.LessonApp = { go, rerender, resetActivity } cho máy chủ điều khiển.
 *
 * TÍNH NĂNG (v4) — THEO NHỊP GIÁO VIÊN (hook actState(aid)):
 *  - "free"     : HS tự làm, báo đúng/sai ngay, chỉ tính lần đầu (như v3).
 *  - "open"     : HS làm bài nhưng CHƯA biết đúng/sai; trắc nghiệm đổi được đáp án;
 *                 ghép đôi/kéo thả/sắp xếp/điền khuyết làm hết rồi bấm Nộp (nộp lại được).
 *  - "locked"   : hết giờ — khóa, chờ GV công bố.
 *  - "revealed" : GV bấm Kết thúc — hiện đúng/sai của nhóm + đáp án.
 *  - onNavigate gửi kèm qi (câu đang xem trong hoạt động) cho màn trình chiếu.
 *
 * Component: intro, knowledge/explore, quiz (multiple-choice/multiple-select/
 * true-false), matching, dragdrop, ordering, fillblank, flashcard, scenario,
 * remember, summary. Thêm loại mới -> thêm 1 renderer.
 * ==========================================================================*/
(function () {
  "use strict";
  const L = window.LESSON;
  if (!L) { document.body.innerHTML = "<p style='padding:40px'>Không tìm thấy dữ liệu bài học (data/lesson.js).</p>"; return; }

  const S = Object.assign({ basePoints: 100, useTimer: false, defaultTime: 60, sound: false, streakEnabled: true }, L.settings || {});
  const state = { view: "home", idx: 0, score: 0, streak: 0, maxStreak: 0, teacher: false, showAnswers: false };
  const timer = { total: 0, remaining: 0, running: false, tick: null };
  const pen = { mode: null, drawing: false, last: null, ctx: null };
  const $ = (sel, root = document) => root.querySelector(sel);
  const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
  const esc = (s) => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const KEYS = ["A", "B", "C", "D", "E", "F"];

  // ---- hooks chế độ lớp học (không có -> mọi hàm là no-op) ---------------
  const HOOK = window.LESSON_HOOKS || {};
  const STUDENT = HOOK.role === "student";
  function emit(name, data) { try { if (typeof HOOK[name] === "function") HOOK[name](data); } catch (e) { console.warn(e); } }
  function ask(name, arg) { try { return typeof HOOK[name] === "function" ? HOOK[name](arg) : null; } catch (e) { return null; } }
  const canNav = () => ask("canNavigate") !== false;
  const aid = (a) => a.id || ("a" + L.activities.indexOf(a));
  const qKey = (a, qi) => (a._keyBase || aid(a) + ":q") + qi;
  const drafts = {}; // nháp câu tự luận, giữ lại khi render lại
  // Trạng thái hoạt động do GV điều khiển (chỉ máy HS; trình chiếu/mở file luôn "free")
  const actStateOf = (a) => (STUDENT ? ask("actState", aid(a._parent || a)) || "free" : "free");
  function judgeLocal(q, choice) {
    if (choice == null) return false;
    if (q.type === "true-false") return choice === q.answer;
    if (q.type === "multiple-select") return JSON.stringify([...(choice || [])].map(Number).sort()) === JSON.stringify([...(q.answer || [])].sort());
    return choice === q.answer;
  }
  // Dòng nhắc trạng thái khi làm bài theo nhịp GV
  function deferNote(st, done, kind) {
    const t = st === "locked" ? (done ? "⏰ Hết giờ! Nhóm em đã " + (kind === "quiz" ? "trả lời" : "nộp bài") + " — chờ thầy/cô công bố kết quả." : "⏰ Hết giờ! Nhóm em chưa " + (kind === "quiz" ? "trả lời câu này" : "nộp bài") + " — tính là chưa hoàn thành.")
      : kind === "quiz" ? (done ? "✔ Đã ghi nhận. Có thể đổi đáp án đến khi thầy/cô kết thúc." : "👆 Chọn đáp án. Đúng/sai sẽ được công bố khi thầy/cô kết thúc.")
      : (done ? "✔ Đã nộp. Có thể sửa và nộp lại đến khi thầy/cô kết thúc." : "📝 Làm xong toàn bộ rồi bấm Nộp bài. Kết quả công bố khi thầy/cô kết thúc.");
    return el("div", "defer-note " + st, t);
  }

  // ---- shell -------------------------------------------------------------
  const root = document.getElementById("app");
  root.innerHTML = `
    <div class="topbar">
      <div class="act-name" id="actName">${esc(L.meta && L.meta.title || "Bài học")}</div>
      <div class="spacer"></div>
      <div class="timer-chip" id="timerChip" hidden><span id="timerText">0:00</span></div>
      <div class="progress"><i id="progFill"></i></div>
      <div class="progress-label" id="progLabel"></div>
    </div>
    <div class="stage"><div id="view"></div></div>
    <div class="controls">
      <button class="btn ghost" id="btnPrev" title="Quay lại (←)">← Quay lại</button>
      <div class="score">⭐ <span id="score">0</span> <span class="streak" id="streak"></span></div>
      <div class="spacer"></div>
      <button class="icon-btn" id="btnSound" title="Bật/tắt âm thanh">🔊</button>
      <button class="icon-btn" id="btnTimer" title="Đồng hồ đếm giờ">⏱️</button>
      <button class="icon-btn" id="btnPen" title="Bút vẽ (P) — bấm lại để thoát">✏️</button>
      <button class="icon-btn" id="btnHighlight" title="Bút dạ quang (H) — bấm lại để thoát">🖍️</button>
      <button class="icon-btn" id="btnEraser" title="Cục tẩy — xóa nét đã vẽ">🧽</button>
      <button class="icon-btn" id="btnPenClear" title="Xóa hết nét vẽ">🗑️</button>
      <button class="icon-btn" id="btnSpotlight" title="Đèn pin — rọi sáng 1 vùng (lăn chuột để đổi cỡ)">🔦</button>
      <button class="icon-btn" id="btnZoomRect" title="Khung phóng to — kéo chọn vùng để phóng to lên">🔲</button>
      <button class="icon-btn" id="btnFull" title="Toàn màn hình (F)">⛶</button>
      <button class="btn" id="btnNext" title="Tiếp tục (→ / Space)">Tiếp tục →</button>
    </div>

    <!-- Bảng đồng hồ -->
    <div class="timer-panel" id="timerPanel" hidden>
      <strong>⏱️ Đồng hồ hoạt động</strong>
      <div class="timer-big" id="timerBig">1:00</div>
      <div class="timer-row">
        <button data-d="-30">−30s</button><button data-d="-15">−15s</button>
        <button data-d="15">+15s</button><button data-d="30">+30s</button><button data-d="60">+1p</button>
      </div>
      <div class="timer-row">
        <button class="prim" id="timerStart">▶ Bắt đầu</button>
        <button id="timerPause">⏸ Tạm dừng</button>
        <button id="timerReset">↺ Đặt lại</button>
      </div>
      <span class="hint">Hết giờ sẽ báo hiệu; giáo viên chủ động bấm tiếp.</span>
    </div>

    <!-- Lớp vẽ (bút / bút dạ quang / tẩy) — điều khiển bằng các icon trên thanh dưới -->
    <canvas class="pen-canvas" id="penCanvas" hidden></canvas>

    <!-- Đèn pin (spotlight): phủ tối, chừa 1 vòng sáng theo con trỏ -->
    <div class="spotlight" id="spotlight" hidden></div>

    <!-- Lớp kéo chọn vùng để phóng to -->
    <div class="zoom-layer" id="zoomLayer" hidden></div>

    <!-- Chế độ giáo viên -->
    <div class="teacher-bar" id="teacherBar">
      <strong>👩‍🏫 Chế độ giáo viên</strong>
      <button id="tShowAns">Hiện/ẩn đáp án</button>
      <button id="tReset">Làm lại hoạt động</button>
      <button id="tResetScore">Đặt lại điểm</button>
      <select id="tJump"></select>
      <span class="hint">Phím T bật/tắt bảng này</span>
    </div>

    <!-- Hộp xem ảnh SGK (có thể phóng to: lăn chuột / nút +− / kéo để di chuyển) -->
    <div class="lightbox" id="lightbox" hidden>
      <div class="lb-inner">
        <button class="lb-close" id="lbClose">✖</button>
        <div class="lb-imgwrap" id="lbWrap"><img id="lbImg" alt="Ảnh SGK"></div>
        <div class="lb-tools">
          <button id="lbZoomOut" title="Thu nhỏ">➖</button>
          <button id="lbZoomReset" title="Về cỡ ban đầu">⟳</button>
          <button id="lbZoomIn" title="Phóng to">➕</button>
        </div>
      </div>
    </div>
    <div class="confetti" id="confetti"></div>`;

  const view = $("#view");
  function setScore() { $("#score").textContent = state.score; $("#streak").textContent = (S.streakEnabled && state.streak > 1) ? "🔥 x" + state.streak : ""; }
  function setProgress() {
    const total = L.activities.length;
    const cur = state.view === "home" ? 0 : state.idx + 1;
    $("#progFill").style.width = (cur / total * 100) + "%";
    $("#progLabel").textContent = state.view === "home" ? "" : `${cur}/${total}`;
    $("#actName").textContent = state.view === "home" ? (L.meta && L.meta.title || "Bài học") : L.activities[state.idx].name;
  }

  // ---- navigation --------------------------------------------------------
  // Các hàm điều hướng do NGƯỜI DÙNG bấm: bị chặn khi GV bật "HS theo nhịp GV".
  function goHome() { state.view = "home"; render(); }
  function start() { if (!canNav()) return; state.view = "activity"; state.idx = 0; render(); }
  function next() {
    if (!canNav()) return;
    if (state.view === "home") return start();
    if (state.idx < L.activities.length - 1) { state.idx++; render(); }
  }
  function prev() {
    if (!canNav() || state.view === "home") return;
    if (state.idx > 0) { state.idx--; render(); } else goHome();
  }
  function jump(i) { if (!canNav()) return; state.view = "activity"; state.idx = i; render(); }

  function render() {
    clearPenCanvas();
    const mag = document.querySelector(".magnify-overlay"); if (mag) mag.remove();
    view.innerHTML = "";
    setProgress(); setScore();
    resetTimerForActivity();
    if (state.view === "home") { renderHome(); emit("onNavigate", { idx: -1, qi: 0 }); return; }
    const a = L.activities[state.idx];
    // Nhiệm vụ + nút ảnh SGK (chung cho mọi loại)
    (RENDERERS[a.type] || renderKnowledge)(a);
    emit("onNavigate", { idx: state.idx, qi: (a._chal ? a._chal._qi : a._qi) || 0 });
  }

  // ---- home --------------------------------------------------------------
  function renderHome() {
    const c = el("div", "card home");
    const m = L.meta || {};
    c.innerHTML = `
      <div class="home-badge">📘</div>
      <h1 class="title">${esc(m.title || "Bài học")}</h1>
      <p class="meta">${esc(m.subject || "")} · Lớp ${esc(m.grade || "")} · ${esc(m.book || "")}</p>
      ${L.coreKnowledge && L.coreKnowledge.length ? `<p class="lead">Hôm nay chúng ta cùng khám phá và ghi nhớ ${L.coreKnowledge.length} điều quan trọng nhé! 🚀</p>` : ""}
      <p><button class="btn big" id="btnStart">Bắt đầu tiết học →</button></p>`;
    const menu = el("div", "menu");
    L.activities.forEach((a, i) => { const b = el("button", null, `<span class="mn">${i + 1}</span> ${esc(a.name)}`); b.onclick = () => jump(i); menu.appendChild(b); });
    c.appendChild(menu);
    view.appendChild(c);
    $("#btnStart").onclick = start;
  }

  // ---- các khối dùng chung ----------------------------------------------
  function taskBanner(a) {
    if (!a.task) return null;
    return el("div", "task-banner", `<span class="tb-ico">🎯</span><div><strong>Nhiệm vụ</strong><div>${esc(a.task)}</div></div>`);
  }
  function sgkButton(src) {
    if (!src) return null;
    const b = el("button", "btn ghost sgk-btn", "🖼️ Xem ảnh SGK");
    b.onclick = () => openLightbox(src);
    return b;
  }
  // Nút hiện-khi-bấm: trả về 1 phần tử; bấm sẽ thay bằng nội dung.
  function revealBox(label, buildContent, cls) {
    const wrap = el("div", "reveal " + (cls || ""));
    const btn = el("button", "reveal-btn", label);
    btn.onclick = () => {
      const content = buildContent();
      wrap.innerHTML = "";
      wrap.appendChild(content);
      wrap.classList.add("open");
    };
    wrap.appendChild(btn);
    return wrap;
  }
  function imageHTML(src, caption) { return src ? `<img class="lesson-img" src="${esc(src)}" alt="${esc(caption || "")}"><div class="caption">${esc(caption || "")}</div>` : ""; }
  function blocksHTML(blocks) {
    return (blocks || []).map((b) => {
      if (b.kind === "text") return `<p class="lead">${esc(b.value)}</p>`;
      if (b.kind === "image") return imageHTML(b.value, b.caption);
      if (b.kind === "list") return "<ul class='lead'>" + b.value.map((x) => `<li>${esc(x)}</li>`).join("") + "</ul>";
      if (b.kind === "ext") return `<p><span class="ext-tag">Mở rộng</span> ${esc(b.value)}</p>`;
      if (b.kind === "svg" || b.kind === "html") return `<div class="diagram">${b.value}</div>`; // nội dung tin cậy (tự soạn)
      return "";
    }).join("");
  }
  function activityHead(a, cardEl) {
    if (a.content && a.content.heading) cardEl.appendChild(el("h1", "title", esc(a.content.heading)));
    else cardEl.appendChild(el("h1", "title", esc(a.name)));
    const tb = taskBanner(a); if (tb) cardEl.appendChild(tb);
    const sb = sgkButton(a.sgkImage); if (sb) cardEl.appendChild(sb);
  }
  function appendRemember(items, cardOrView) {
    // "Em cần nhớ" — ẩn, bấm mới hiện
    const box = revealBox("📌 Em cần nhớ (bấm để hiện)", () => {
      const b = el("div", "remember");
      b.innerHTML = `<h2>💡 Em cần nhớ</h2><ol>${items.map((t) => `<li>${esc(t)}</li>`).join("")}</ol>`;
      return b;
    }, "remember-reveal");
    (cardOrView || view).appendChild(box);
  }

  // ---- intro / explore / knowledge --------------------------------------
  function renderKnowledge(a) {
    const c = el("div", "card");
    activityHead(a, c);
    const ct = a.content || {};
    if (ct.prompt) c.appendChild(el("p", "prompt", esc(ct.prompt)));
    if (ct.image) { const im = el("div"); im.innerHTML = imageHTML(ct.image, ct.imageCaption); c.appendChild(im); } // ảnh minh hoạ hiển thị trực tiếp
    // Nội dung kiến thức: ẩn, bấm mới hiện (nếu có blocks)
    if (ct.blocks && ct.blocks.length) {
      c.appendChild(revealBox(ct.revealLabel || "🔍 Hiện nội dung kiến thức", () => {
        const d = el("div", "kn-blocks"); d.innerHTML = blocksHTML(ct.blocks); return d;
      }));
    }
    view.appendChild(c);
    if (a.questions && a.questions.length) renderQuizInto(c, a);
    if (a.remember && a.remember.length) appendRemember(a.remember);
  }

  // ---- QUIZ --------------------------------------------------------------
  function renderQuiz(a) { const c = el("div", "card"); activityHead(a, c); view.appendChild(c); renderQuizInto(c, a); }
  function renderQuizInto(card, a) {
    const qs = a.questions || [];
    if (a._qi == null) { // chế độ lớp học: mở lại -> nhảy tới câu đầu tiên nhóm chưa làm
      a._qi = 0;
      while (a._qi < qs.length - 1 && ask("getAttempt", qKey(a, a._qi))) a._qi++;
    }
    if (!qs.length) { card.innerHTML += "<p class='lead'>[CẦN GIÁO VIÊN KIỂM TRA] Chưa có câu hỏi.</p>"; return; }
    const st = actStateOf(a);
    if (st !== "free") return renderQuizDeferred(card, a, qs, st);
    const q = qs[a._qi];
    const wrap = el("div");
    wrap.innerHTML = `<p class="subtitle">Câu ${a._qi + 1}/${qs.length} · ${levelLabel(q.level)}</p>
      <p class="prompt">${esc(q.question)}</p>`;
    card.appendChild(wrap);
    const sb = sgkButton(q.sgkImage); if (sb) card.appendChild(sb);
    if (q.image) { const im = el("div"); im.innerHTML = imageHTML(q.image, q.imageCaption); card.appendChild(im); }
    const answered = { done: false };

    card._key = qKey(a, a._qi); card._a = a;
    if (q.type === "true-false") {
      const opts = el("div", "options");
      [["Đúng", true], ["Sai", false]].forEach(([label, val], i) => {
        const b = el("button", "opt", `<span class="key">${KEYS[i]}</span> ${label}`);
        b.onclick = () => judgeTF(b, opts, val, q, a, card, answered);
        b.dataset.k = i; b.dataset.v = val ? "1" : "0"; opts.appendChild(b);
      });
      card.appendChild(opts); card._opts = opts;
    } else {
      const isMulti = q.type === "multiple-select";
      const opts = el("div", "options");
      (q.options || []).forEach((o, i) => {
        const b = el("button", "opt", `<span class="key">${KEYS[i]}</span> ${esc(o)}`);
        b.dataset.k = i;
        b.onclick = () => isMulti ? toggleMulti(b) : judgeMC(i, opts, q, a, card, answered);
        opts.appendChild(b);
      });
      card.appendChild(opts); card._opts = opts;
      if (isMulti) {
        const submit = el("button", "btn ms-submit", "Kiểm tra");
        submit.onclick = () => judgeMS(opts, q, a, card, answered, submit);
        card.appendChild(wrapEl(submit));
      }
    }
    // Gợi ý: ẩn, bấm mới hiện
    if (q.hint) card.appendChild(revealBox("💡 Gợi ý", () => el("div", "hint-box", "💡 " + esc(q.hint))));
    card._answered = answered; card._q = q;
    // Chế độ lớp học: câu nhóm đã làm -> hiện lại kết quả cũ, không cho làm lại
    const done = ask("getAttempt", card._key);
    if (done) { answered.done = true; paintChoice(card._opts, q, done.choice); answerFeedback(done.ok, q, card, true); }
    else if (state.showAnswers) revealAnswer(card._opts, q);
  }
  function wrapEl(child) { const p = el("p"); p.appendChild(child); return p; }
  function toggleMulti(b) { if (!b.classList.contains("locked")) b.classList.toggle("selected"); }

  // Tô màu đúng/sai theo lựa chọn (dùng chung cho lúc chấm và lúc hiện lại bài đã làm)
  function paintChoice(opts, q, choice) {
    const kids = [...opts.children];
    if (q.type === "true-false") {
      kids.forEach((b) => { const v = b.dataset.v === "1"; if (v === q.answer) b.classList.add("correct"); else b.classList.add(v === choice ? "wrong" : "dim"); b.onclick = null; });
    } else if (q.type === "multiple-select") {
      const correct = q.answer || [], chosen = choice || [];
      kids.forEach((b, k) => { if (chosen.includes(k)) b.classList.add("selected"); if (correct.includes(k)) b.classList.add("correct"); else if (chosen.includes(k)) b.classList.add("wrong"); b.classList.add("locked"); });
      const sub = opts.parentNode && opts.parentNode.querySelector(".ms-submit"); if (sub) sub.disabled = true;
    } else {
      kids.forEach((b, k) => { if (k === q.answer) b.classList.add("correct"); else if (k === choice) b.classList.add("wrong"); else b.classList.add("dim"); b.onclick = null; });
    }
  }
  function judgeMC(i, opts, q, a, card, answered) {
    if (answered.done) return; answered.done = true;
    paintChoice(opts, q, i);
    afterAnswer(i === q.answer, q, card, i);
  }
  function judgeTF(btn, opts, val, q, a, card, answered) {
    if (answered.done) return; answered.done = true;
    paintChoice(opts, q, val);
    afterAnswer(val === q.answer, q, card, val);
  }
  function judgeMS(opts, q, a, card, answered, submit) {
    if (answered.done) return; answered.done = true;
    const chosen = [...opts.children].filter((b) => b.classList.contains("selected")).map((b) => +b.dataset.k).sort();
    const correct = [...(q.answer || [])].sort();
    const ok = JSON.stringify(chosen) === JSON.stringify(correct);
    paintChoice(opts, q, chosen);
    submit.disabled = true;
    afterAnswer(ok, q, card, chosen);
  }

  function afterAnswer(ok, q, card, choice) {
    if (ok) { let pts = S.basePoints; if (S.streakEnabled) { state.streak++; pts = Math.round(pts * Math.min(2, 1 + (state.streak - 1) * 0.2)); } state.maxStreak = Math.max(state.maxStreak, state.streak); state.score += pts; celebrate(); }
    else { state.streak = 0; card.classList.add("shake"); setTimeout(() => card.classList.remove("shake"), 500); }
    setScore();
    const badge = el("div", "answer-badge " + (ok ? "ok" : "no"), ok ? "✓" : "✗");
    card.appendChild(badge); setTimeout(() => badge.remove(), 900);
    emit("onAttempt", { key: card._key, activityId: card._a ? aid(card._a._parent || card._a) : "", ok, fraction: ok ? 1 : 0, choice });
    answerFeedback(ok, q, card, false);
    sound(ok ? "ok" : "no");
    if (card._penguin) card._penguin(ok); // cập nhật đàn cánh cụt (trò chơi penguin)
  }
  function answerFeedback(ok, q, card, replay) {
    const fb = el("div", "feedback " + (ok ? "ok" : "no"));
    const head = replay ? (ok ? "✅ Nhóm em đã trả lời ĐÚNG câu này." : "❌ Nhóm em đã trả lời CHƯA ĐÚNG câu này.") : (ok ? "🎉 Chính xác!" : "❌ Chưa chính xác!");
    fb.innerHTML = `${head}<div class="explain">${esc(q.explanation || "")}</div>`;
    card.appendChild(fb);
    const a2 = card._a;
    if (a2 && a2.questions && a2._qi < a2.questions.length - 1) {
      const nb = el("button", "btn", "Câu tiếp theo →");
      nb.onclick = () => { a2._qi++; render(); };
      card.appendChild(wrapEl(nb));
    }
  }
  // ---- QUIZ theo nhịp GV: chọn/đổi đáp án, chưa báo đúng sai; GV kết thúc mới hiện --
  function renderQuizDeferred(card, a, qs, st) {
    const q = qs[a._qi], key = qKey(a, a._qi), rec = ask("getAttempt", key);
    card._key = key; card._a = a;
    const head = el("div");
    head.innerHTML = `<p class="subtitle">Câu ${a._qi + 1}/${qs.length} · ${levelLabel(q.level)}</p>`;
    if (qs.length > 1) { // chấm tròn chuyển câu (xanh = đã trả lời)
      const pills = el("div", "q-pills");
      qs.forEach((_, k) => { const b = el("button", "q-pill" + (k === a._qi ? " cur" : "") + (ask("getAttempt", qKey(a, k)) ? " done" : ""), String(k + 1)); b.onclick = () => { a._qi = k; render(); }; pills.appendChild(b); });
      head.appendChild(pills);
    }
    head.appendChild(el("p", "prompt", esc(q.question)));
    card.appendChild(head);
    const sb = sgkButton(q.sgkImage); if (sb) card.appendChild(sb);
    if (q.image) { const im = el("div"); im.innerHTML = imageHTML(q.image, q.imageCaption); card.appendChild(im); }
    const opts = el("div", "options");
    const list = q.type === "true-false" ? [["Đúng", true], ["Sai", false]] : (q.options || []).map((o, i) => [esc(o), i]);
    list.forEach(([label, val], i) => { const b = el("button", "opt", `<span class="key">${KEYS[i]}</span> ${label}`); b.dataset.k = i; if (q.type === "true-false") b.dataset.v = val ? "1" : "0"; opts.appendChild(b); });
    card.appendChild(opts); card._opts = opts;
    if (st === "revealed") {
      if (rec && rec.choice != null) { paintChoice(opts, q, rec.choice); answerFeedback(judgeLocal(q, rec.choice), q, card, true); }
      else { markCorrect(opts, q); [...opts.children].forEach((b) => { b.onclick = null; if (!b.classList.contains("correct")) b.classList.add("dim"); }); const fb = el("div", "feedback no"); fb.innerHTML = `⏳ Nhóm em chưa trả lời câu này.<div class="explain">${esc(q.explanation || "")}</div>`; card.appendChild(fb); quizNav(card, a, qs); }
      return;
    }
    const kids = [...opts.children];
    const showSel = (choice) => kids.forEach((b, k) => { const v = q.type === "true-false" ? b.dataset.v === "1" : k; b.classList.toggle("selected", Array.isArray(choice) ? choice.includes(v) : choice === v); });
    if (rec) showSel(rec.choice);
    let note = deferNote(st, !!rec, "quiz");
    if (st === "open") kids.forEach((b, k) => {
      b.onclick = () => {
        let choice;
        if (q.type === "multiple-select") { b.classList.toggle("selected"); choice = kids.filter((x) => x.classList.contains("selected")).map((x) => +x.dataset.k); }
        else choice = q.type === "true-false" ? b.dataset.v === "1" : k;
        showSel(choice);
        const ok = judgeLocal(q, choice);
        emit("onAttempt", { key, activityId: aid(a._parent || a), ok, fraction: ok ? 1 : 0, choice });
        const n2 = deferNote(st, true, "quiz"); note.replaceWith(n2); note = n2;
        const pill = card.querySelector(".q-pill.cur"); if (pill) pill.classList.add("done");
      };
    });
    else kids.forEach((b) => b.classList.add("locked"));
    card.appendChild(note);
    if (q.hint && st === "open") card.appendChild(revealBox("💡 Gợi ý", () => el("div", "hint-box", "💡 " + esc(q.hint))));
    quizNav(card, a, qs);
  }
  function markCorrect(opts, q) {
    [...opts.children].forEach((b, k) => { const right = q.type === "true-false" ? (b.dataset.v === "1") === q.answer : q.type === "multiple-select" ? (q.answer || []).includes(k) : k === q.answer; if (right) b.classList.add("correct"); });
  }
  function quizNav(card, a, qs) {
    if (qs.length < 2) return;
    const row = el("p", "q-nav");
    const pv = el("button", "btn ghost", "← Câu trước"), nx = el("button", "btn", "Câu tiếp theo →");
    pv.disabled = a._qi <= 0; nx.disabled = a._qi >= qs.length - 1;
    pv.onclick = () => { a._qi--; render(); }; nx.onclick = () => { a._qi++; render(); };
    row.append(pv, nx); card.appendChild(row);
  }
  function revealAnswer(opts, q) {
    if (!opts) return;
    if (q.type === "multiple-choice") opts.children[q.answer] && opts.children[q.answer].classList.add("correct");
    if (q.type === "multiple-select") (q.answer || []).forEach((k) => opts.children[k] && opts.children[k].classList.add("correct"));
  }
  function levelLabel(l) { return ({ "nhan-biet": "Nhận biết", "thong-hieu": "Thông hiểu", "van-dung": "Vận dụng", "van-dung-cao": "Vận dụng cao" }[l]) || ""; }

  // ---- MATCHING ----------------------------------------------------------
  function renderMatching(a) {
    const c = el("div", "card"); activityHead(a, c);
    const key = aid(a) + ":main";
    const pairs = (a.pairs || []).map((p, i) => ({ ...p, i }));
    const answerHTML = `<div class="two-col"><div>${pairs.map(p => `<div class="chip done">${esc(p.left)}</div>`).join("")}</div><div>${pairs.map(p => `<div class="chip done">${esc(p.right)}</div>`).join("")}</div></div>`;
    const st = actStateOf(a);
    if (st !== "free") return renderWholeDeferred(c, a, key, st, answerHTML, matchingUI(a, pairs));
    const done = ask("getAttempt", key);
    if (done) return showLocked(c, a, done, answerHTML);
    c.appendChild(el("p", "subtitle", a.intro || "Chọn một ô bên trái rồi chọn ô tương ứng bên phải."));
    if (a.image) { const im = el("div"); im.innerHTML = imageHTML(a.image, a.imageCaption); c.appendChild(im); }
    const rights = shuffle(pairs.slice());
    const grid = el("div", "two-col"); const left = el("div"); const right = el("div");
    const wrong = a._wrong || (a._wrong = new Set()); // các cặp đã ghép sai ít nhất 1 lần
    let sel = null, matched = 0;
    pairs.forEach((p) => { const ch = el("div", "chip", esc(p.left)); ch.dataset.i = p.i; ch.onclick = () => { if (ch.classList.contains("done")) return; [...left.children].forEach(x => x.classList.remove("selected")); ch.classList.add("selected"); sel = ch; }; left.appendChild(ch); });
    rights.forEach((p) => { const ch = el("div", "chip", esc(p.right)); ch.dataset.i = p.i; ch.onclick = () => { if (!sel || ch.classList.contains("done")) return; if (sel.dataset.i === ch.dataset.i) { ch.classList.add("done"); sel.classList.add("done"); sel.classList.remove("selected"); sel = null; matched++; celebrate(); if (matched === pairs.length) { state.score += S.basePoints; setScore(); finishMulti(c, a, key, wrong, pairs.length, "✓ Hoàn thành!"); } } else { wrong.add(sel.dataset.i); ch.classList.add("shake"); sound("no"); setTimeout(() => ch.classList.remove("shake"), 400); } }; right.appendChild(ch); });
    grid.append(left, right); c.appendChild(grid); view.appendChild(c);
  }
  function showDone(c, a, msg) { const fb = el("div", "feedback ok"); fb.innerHTML = `${msg}<div class="explain">${esc(a.explanation || "")}</div>${a.doneImage ? imageHTML(a.doneImage, a.doneCaption) : ""}`; c.appendChild(fb); sound("ok"); }
  // Ghép đôi / phân loại xong: điểm = tỉ lệ mục làm đúng ngay lần đầu
  function finishMulti(c, a, key, wrong, total, msg) {
    const good = total - wrong.size;
    emit("onAttempt", { key, activityId: aid(a), ok: wrong.size === 0, fraction: total ? good / total : 0, total, choice: [...wrong] });
    showDone(c, a, msg + (wrong.size ? ` (đúng ngay lần đầu ${good}/${total})` : ""));
  }
  // Bài nhóm đã làm (chế độ lớp học) / GV đã công bố: hiện kết quả + đáp án, không cho làm lại
  function showLocked(c, a, rec, answerHTML, deferred) {
    c.appendChild(el("div", "locked-answer", answerHTML));
    const fb = el("div", "feedback " + (rec && rec.ok ? "ok" : "no")), ex = `<div class="explain">${esc(a.explanation || "")}</div>`;
    if (!rec) fb.innerHTML = `⏳ Nhóm em chưa nộp bài này — tính là chưa hoàn thành.${ex}`;
    else { const n = rec.total || 0, good = Math.round((rec.fraction || 0) * n); fb.innerHTML = `${rec.ok ? "✅" : "📝"} Nhóm em ${deferred ? "đã nộp" : "đã làm"} bài này${n ? ` — ${deferred ? "đúng" : "đúng ngay lần đầu"} ${good}/${n}` : ""}.${ex}`; }
    c.appendChild(fb); view.appendChild(c);
  }

  // ---- LÀM HẾT RỒI NỘP (theo nhịp GV): không báo đúng/sai từng mục -----------
  // ui = { init(rec) -> nháp, draw(box, nháp, bậtTắt, vẽLại, đổi), complete(nháp), score(nháp) -> {good,total,choice} }
  function renderWholeDeferred(c, a, key, st, answerHTML, ui) {
    const rec = ask("getAttempt", key);
    if (st === "revealed") return showLocked(c, a, rec, answerHTML, true);
    if (!a._draft) a._draft = ui.init(rec && rec.choice);
    const draft = a._draft, box = el("div"), enabled = st === "open";
    let note = deferNote(st, !!rec, "whole");
    const btn = el("button", "btn", rec ? "📤 Nộp lại" : "📤 Nộp bài");
    const changed = () => { btn.disabled = !enabled || !ui.complete(draft); };
    const redraw = () => { box.innerHTML = ""; ui.draw(box, draft, enabled, redraw, changed); changed(); };
    btn.onclick = () => {
      const r = ui.score(draft);
      emit("onAttempt", { key, activityId: aid(a), ok: r.good === r.total, fraction: r.total ? r.good / r.total : 0, total: r.total, choice: r.choice });
      const n2 = deferNote(st, true, "whole"); note.replaceWith(n2); note = n2; btn.textContent = "📤 Nộp lại"; sound("ok");
    };
    c.appendChild(box); redraw(); c.appendChild(note);
    if (enabled) c.appendChild(wrapEl(btn));
    view.appendChild(c);
  }
  const PAIR_COLORS = ["#7c3aed", "#0ea5e9", "#f97316", "#16a34a", "#e11d48", "#ca8a04", "#0891b2", "#9333ea"];
  const badge = (i) => `<span class="pair-badge" style="background:${PAIR_COLORS[i % PAIR_COLORS.length]}">${i + 1}</span>`;
  function matchingUI(a, pairs) {
    const rorder = a._rorder || (a._rorder = shuffle(pairs.slice()));
    const ui = {
      sel: null,
      init: (ch) => { const d = {}; ((ch && ch.m) || []).forEach((r, l) => { if (r != null && r >= 0) d[l] = +r; }); return d; },
      complete: (d) => pairs.every((p) => d[p.i] != null),
      score: (d) => ({ good: pairs.filter((p) => d[p.i] === p.i).length, total: pairs.length, choice: { m: pairs.map((p) => (d[p.i] == null ? -1 : d[p.i])) } }),
      draw(box, d, en, redraw) {
        box.appendChild(el("p", "subtitle", "Bấm 1 ô bên trái rồi bấm ô tương ứng bên phải (cùng số = một cặp). Bấm lại ô bên phải để bỏ ghép."));
        const grid = el("div", "two-col"), Lc = el("div"), Rc = el("div");
        pairs.forEach((p) => { const has = d[p.i] != null; const ch = el("div", "chip" + (ui.sel === p.i ? " selected" : "") + (has ? " paired" : ""), (has ? badge(p.i) : "") + esc(p.left)); if (en) ch.onclick = () => { ui.sel = p.i; redraw(); }; Lc.appendChild(ch); });
        rorder.forEach((p) => {
          const owner = Object.keys(d).find((k) => d[k] === p.i);
          const ch = el("div", "chip" + (owner != null ? " paired" : ""), (owner != null ? badge(+owner) : "") + esc(p.right));
          if (en) ch.onclick = () => {
            if (ui.sel == null) { if (owner != null) { delete d[owner]; redraw(); } return; }
            Object.keys(d).forEach((k) => { if (d[k] === p.i) delete d[k]; });
            d[ui.sel] = p.i; ui.sel = null; redraw();
          };
          Rc.appendChild(ch);
        });
        grid.append(Lc, Rc); box.appendChild(grid);
      },
    };
    return ui;
  }
  function dragdropUI(a, all) {
    const porder = a._porder || (a._porder = shuffle(all.slice()));
    const ui = {
      sel: null,
      init: (ch) => all.map((it) => { const g = ch && ch.g ? ch.g[it.i] : null; return g == null ? -1 : +g; }),
      complete: (d) => d.every((g) => g >= 0),
      score: (d) => ({ good: all.filter((it) => d[it.i] === it.group).length, total: all.length, choice: { g: d.slice() } }),
      draw(box, d, en, redraw) {
        box.appendChild(el("p", "subtitle", "Bấm chọn một thẻ rồi bấm vào nhóm. Bấm \"Thẻ chưa xếp\" để đưa thẻ về lại."));
        const chip = (it) => { const ch = el("div", "chip" + (ui.sel === it.i ? " selected" : ""), esc(it.text)); if (en) ch.onclick = (e) => { e.stopPropagation(); ui.sel = it.i; redraw(); }; return ch; };
        const pool = el("div", "dropzone pool", "<h3>🗂️ Thẻ chưa xếp</h3>");
        porder.filter((it) => d[it.i] < 0).forEach((it) => pool.appendChild(chip(it)));
        if (en) pool.onclick = () => { if (ui.sel != null) { d[ui.sel] = -1; ui.sel = null; redraw(); } };
        const zones = el("div", "two-col");
        (a.groups || []).forEach((g, gi) => {
          const z = el("div", "dropzone", `<h3>${esc(g)}</h3>`);
          porder.filter((it) => d[it.i] === gi).forEach((it) => z.appendChild(chip(it)));
          if (en) z.onclick = () => { if (ui.sel != null) { d[ui.sel] = gi; ui.sel = null; redraw(); } };
          zones.appendChild(z);
        });
        box.append(pool, zones);
      },
    };
    return ui;
  }
  function orderingUI(a) {
    const steps = a.steps || [];
    return {
      init: (ch) => (ch && ch.o && ch.o.length === steps.length ? ch.o.map(Number) : shuffle(steps.map((_, i) => i))),
      complete: () => true,
      score: (d) => ({ good: d.filter((s, pos) => s === pos).length, total: steps.length, choice: { o: d.slice() } }),
      draw(box, d, en, redraw) {
        box.appendChild(el("p", "subtitle", "Dùng ▲▼ để sắp đúng thứ tự rồi bấm Nộp bài."));
        const list = el("ul", "order-list");
        d.forEach((s, pos) => {
          const li = el("li", null, `<span>${esc(steps[s])}</span>`), up = el("button", null, "▲"), dn = el("button", null, "▼");
          up.disabled = !en || pos === 0; dn.disabled = !en || pos === d.length - 1;
          up.onclick = () => { [d[pos - 1], d[pos]] = [d[pos], d[pos - 1]]; redraw(); };
          dn.onclick = () => { [d[pos + 1], d[pos]] = [d[pos], d[pos + 1]]; redraw(); };
          const ctrl = el("span"); ctrl.append(up, dn); li.appendChild(ctrl); list.appendChild(li);
        });
        box.appendChild(list);
      },
    };
  }
  function fillblankUI(a, parts) {
    const n = parts.length - 1;
    return {
      init: (ch) => Array.from({ length: n }, (_, i) => (ch && ch.v && ch.v[i]) || ""),
      complete: (d) => d.every((v) => String(v).trim()),
      score: (d) => ({ good: d.filter((v, i) => (a.answers[i] || []).map(norm).includes(norm(v))).length, total: n, choice: { v: d.slice() } }),
      draw(box, d, en, redraw, changed) {
        const p = el("p", "prompt");
        parts.forEach((seg, i) => { p.appendChild(document.createTextNode(seg.replace(/\s+/g, " "))); if (i < n) { const inp = el("input"); inp.value = d[i]; inp.disabled = !en; inp.oninput = () => { d[i] = inp.value; changed(); }; p.appendChild(inp); } });
        box.appendChild(p);
      },
    };
  }

  // ---- DRAG & DROP (phân loại) ------------------------------------------
  function renderDragDrop(a) {
    const c = el("div", "card"); activityHead(a, c);
    const key = aid(a) + ":main";
    const all = (a.items || []).map((it, i) => ({ ...it, i }));
    const answerHTML = `<div class="two-col">${(a.groups || []).map((g, gi) => `<div class="dropzone"><h3>${esc(g)}</h3>${all.filter(it => it.group === gi).map(it => `<div class="chip done">${esc(it.text)}</div>`).join("")}</div>`).join("")}</div>`;
    const st = actStateOf(a);
    if (st !== "free") return renderWholeDeferred(c, a, key, st, answerHTML, dragdropUI(a, all));
    const done = ask("getAttempt", key);
    if (done) return showLocked(c, a, done, answerHTML);
    c.appendChild(el("p", "subtitle", "Chọn một thẻ rồi bấm vào nhóm đúng."));
    const pool = el("div"); const zonesWrap = el("div", "two-col");
    const wrong = a._wrong || (a._wrong = new Set());
    let sel = null, placed = 0; const items = shuffle(all.slice());
    (a.groups || []).forEach((g, gi) => { const z = el("div", "dropzone"); z.innerHTML = `<h3>${esc(g)}</h3>`; z.onclick = () => { if (!sel) return; const correct = +sel.dataset.g === gi; if (correct) { sel.classList.add("done"); z.appendChild(sel); sel.classList.remove("selected"); sel = null; placed++; celebrate(); if (placed === items.length) finishDD(c, a, key, wrong, items.length); } else { wrong.add(sel.dataset.i); z.classList.add("shake"); sound("no"); setTimeout(() => z.classList.remove("shake"), 400); } }; zonesWrap.appendChild(z); });
    items.forEach((it) => { const ch = el("div", "chip", esc(it.text)); ch.dataset.g = it.group; ch.dataset.i = it.i; ch.onclick = () => { if (ch.classList.contains("done")) return; [...pool.children].forEach(x => x.classList.remove("selected")); ch.classList.add("selected"); sel = ch; }; pool.appendChild(ch); });
    c.append(pool, zonesWrap); view.appendChild(c);
  }
  function finishDD(c, a, key, wrong, total) { state.score += S.basePoints; setScore(); finishMulti(c, a, key, wrong, total, "✓ Phân loại xong!"); }

  // ---- ORDERING ----------------------------------------------------------
  function renderOrdering(a) {
    const c = el("div", "card"); activityHead(a, c);
    const key = aid(a) + ":main";
    const answerHTML = `<ol class="lead">${(a.steps || []).map(s => `<li>${esc(s)}</li>`).join("")}</ol>`;
    const st = actStateOf(a);
    if (st !== "free") return renderWholeDeferred(c, a, key, st, answerHTML, orderingUI(a));
    const done = ask("getAttempt", key);
    if (done) return showLocked(c, a, done, answerHTML);
    c.appendChild(el("p", "subtitle", "Dùng ▲▼ để sắp đúng thứ tự rồi bấm Kiểm tra."));
    let order = (a.steps || []).map((s, i) => ({ s, i })); order = shuffle(order.slice());
    const list = el("ul", "order-list");
    function draw() { list.innerHTML = ""; order.forEach((o, pos) => { const li = el("li"); li.innerHTML = `<span>${esc(o.s)}</span>`; const up = el("button", null, "▲"), dn = el("button", null, "▼"); up.onclick = () => { if (pos > 0) { [order[pos - 1], order[pos]] = [order[pos], order[pos - 1]]; draw(); } }; dn.onclick = () => { if (pos < order.length - 1) { [order[pos + 1], order[pos]] = [order[pos], order[pos + 1]]; draw(); } }; const ctrl = el("span"); ctrl.append(up, dn); li.appendChild(ctrl); list.appendChild(li); }); }
    draw(); c.appendChild(list);
    const btn = el("button", "btn", "Kiểm tra");
    btn.onclick = () => {
      const good = order.filter((o, i) => o.i === i).length, ok = good === order.length;
      // chỉ lần Kiểm tra ĐẦU TIÊN được tính điểm (tỉ lệ bước đúng vị trí); các lần sau để luyện tập
      if (!a._checked) { a._checked = true; emit("onAttempt", { key, activityId: aid(a), ok, fraction: order.length ? good / order.length : 0, total: order.length, choice: order.map(o => o.i) }); }
      if (ok) { state.score += S.basePoints; setScore(); btn.disabled = true; celebrate(); } else c.classList.add("shake"), setTimeout(() => c.classList.remove("shake"), 500); const fb = el("div", "feedback " + (ok ? "ok" : "no")); fb.innerHTML = `${ok ? "🎉 Đúng thứ tự!" : "❌ Chưa đúng, thử lại nhé."}<div class="explain">${esc(a.explanation || "")}</div>`; c.appendChild(fb); sound(ok ? "ok" : "no");
    };
    c.appendChild(wrapEl(btn)); view.appendChild(c);
  }

  // ---- FILL BLANK --------------------------------------------------------
  function renderFillBlank(a) {
    const c = el("div", "card fill"); activityHead(a, c);
    const key = aid(a) + ":main";
    const parts = (a.text || "").split("{{}}");
    const answerHTML = `<p class="prompt">${parts.map((seg, i) => esc(seg.replace(/\s+/g, " ")) + (i < parts.length - 1 ? `<b class="fill-ans"> ${esc((a.answers[i] || [""])[0])} </b>` : "")).join("")}</p>`;
    const st = actStateOf(a);
    if (st !== "free") return renderWholeDeferred(c, a, key, st, answerHTML, fillblankUI(a, parts));
    const done = ask("getAttempt", key);
    if (done) return showLocked(c, a, done, answerHTML);
    const p = el("p", "prompt");
    const inputs = [];
    parts.forEach((seg, i) => { p.appendChild(document.createTextNode(seg.replace(/\s+/g, " "))); if (i < parts.length - 1) { const inp = el("input"); inputs.push(inp); p.appendChild(inp); } });
    c.appendChild(p);
    const btn = el("button", "btn", "Kiểm tra");
    btn.onclick = () => {
      let good = 0; inputs.forEach((inp, i) => { const accepts = (a.answers[i] || []).map(norm); const g = accepts.includes(norm(inp.value)); inp.style.borderColor = g ? "var(--correct)" : "var(--wrong)"; if (g) good++; });
      const ok = good === inputs.length;
      if (!a._checked) { a._checked = true; emit("onAttempt", { key, activityId: aid(a), ok, fraction: inputs.length ? good / inputs.length : 0, total: inputs.length, choice: inputs.map(i => i.value) }); }
      if (ok) { state.score += S.basePoints; setScore(); btn.disabled = true; celebrate(); } const fb = el("div", "feedback " + (ok ? "ok" : "no")); fb.innerHTML = `${ok ? "🎉 Chính xác!" : "❌ Chưa đúng."}<div class="explain">${esc(a.explanation || "")}</div>`; c.appendChild(fb); sound(ok ? "ok" : "no");
    };
    c.appendChild(wrapEl(btn)); view.appendChild(c);
  }
  const norm = (s) => String(s || "").trim().toLowerCase();

  // ---- FLASHCARD ---------------------------------------------------------
  function renderFlashcard(a) {
    a._ci = a._ci || 0; const cards = a.cards || [];
    const c = el("div", "card"); activityHead(a, c);
    c.appendChild(el("p", "subtitle", `Thẻ ${a._ci + 1}/${cards.length} — bấm để lật.`));
    const card = cards[a._ci] || { front: "", back: "" };
    const fc = el("div", "flashcard"); fc.innerHTML = `<div class="inner"><div class="face front">${esc(card.front)}</div><div class="face back">${esc(card.back)}</div></div>`;
    fc.onclick = () => fc.classList.toggle("flipped"); c.appendChild(fc);
    const nb = el("button", "btn", "Thẻ tiếp theo →"); nb.disabled = a._ci >= cards.length - 1; nb.onclick = () => { a._ci++; render(); };
    c.appendChild(wrapEl(nb)); view.appendChild(c);
  }

  // ---- SCENARIO (tình huống / vận dụng) ---------------------------------
  function renderScenario(a) {
    const c = el("div", "card"); activityHead(a, c); const ct = a.content || {};
    if (ct.situation) c.appendChild(el("p", "lead", esc(ct.situation)));
    if (ct.question) c.appendChild(el("p", "prompt", esc(ct.question)));
    if (ct.hints && ct.hints.length) c.appendChild(revealBox("💡 Gợi ý", () => { const b = el("div", "hint-box"); b.innerHTML = "<ul class='lead'>" + ct.hints.map(x => `<li>${esc(x)}</li>`).join("") + "</ul>"; return b; }));
    if (ct.question && STUDENT) c.appendChild(textAnswerBox(aid(a) + ":t0", a));
    if (ct.modelAnswer && showModel()) c.appendChild(revealBox("✅ Xem hướng trả lời (GV chốt)", () => el("div", "feedback ok", `<div class="explain">${esc(ct.modelAnswer)}</div>`)));
    view.appendChild(c);
    if (a.questions && a.questions.length) renderQuizInto(c, a);
  }
  // Học sinh chỉ thấy "hướng trả lời" khi giáo viên cho phép trên bảng điều khiển
  function showModel() { return !STUDENT || ask("showModel") === true; }
  // Ô trả lời tự luận của nhóm (chế độ lớp học) — gửi lại được, bản sau thay bản trước
  function textAnswerBox(key, a) {
    const box = el("div", "text-answer");
    const sent = ask("getText", key);
    const ta = el("textarea"); ta.rows = 3; ta.placeholder = "Nhập câu trả lời của nhóm em…";
    ta.value = drafts[key] != null ? drafts[key] : (sent && sent.text) || "";
    ta.oninput = () => { drafts[key] = ta.value; };
    const btn = el("button", "btn", "📨 Gửi câu trả lời");
    const st = el("span", "ta-status", sent ? "✓ Đã gửi" : "");
    btn.onclick = () => {
      const text = ta.value.trim(); if (!text) { ta.focus(); return; }
      emit("onText", { key, activityId: aid(a), text });
      st.textContent = "✓ Đã gửi lúc " + new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
      sound("ok");
    };
    const row = el("div", "ta-row"); row.append(btn, st);
    box.append(ta, row);
    return box;
  }

  // ---- REMEMBER (độc lập) -----------------------------------------------
  function renderRemember(a) { const c = el("div", "card"); activityHead(a, c); appendRemember(a.items || (a.content && a.content.items) || a.remember || [], c); view.appendChild(c); }

  // ---- PENGUIN GAME ("Cánh cụt về nhà") — quiz + đàn cánh cụt về nhà -----
  function renderPenguin(a) {
    const qs = a.questions || []; a._home = a._home || 0;
    const pst = actStateOf(a);
    if (STUDENT) a._home = pst === "open" || pst === "locked" ? 0 : qs.filter((q, i) => { const r = ask("getAttempt", qKey(a, i)); return r && judgeLocal(q, r.choice); }).length;
    const c = el("div", "card penguin-card");
    c.innerHTML = `<h1 class="title">🐧 ${esc(a.name)}</h1><p class="subtitle">${esc(a.intro || "Mỗi câu trả lời đúng giúp một chú cánh cụt về nhà!")}</p>`;
    const tb = taskBanner(a); if (tb) c.appendChild(tb);
    const row = el("div", "penguin-row");
    for (let i = 0; i < qs.length; i++) row.appendChild(el("span", "penguin" + (i < a._home ? " home" : ""), i < a._home ? "🏠" : "🐧"));
    c.appendChild(row); view.appendChild(c);
    c._penguin = (ok) => {
      if (ok) a._home = Math.min(qs.length, a._home + 1);
      [...row.children].forEach((k, i) => { const done = i < a._home; k.textContent = done ? "🏠" : "🐧"; k.classList.toggle("home", done); });
      if (a._qi >= qs.length - 1) {
        const done = el("div", "feedback ok");
        done.innerHTML = `🎉 Đã giúp <b>${a._home}/${qs.length}</b> chú cánh cụt về nhà! ` + (a._home === qs.length ? "Cả đàn về nhà an toàn — xuất sắc!" : "Cùng ôn lại các câu chưa đúng nhé.");
        c.appendChild(done); if (a._home === qs.length) celebrate();
      }
    };
    renderQuizInto(c, a);
  }

  // ---- VẬN DỤNG (nhiều tình huống, bấm lộ đáp án GV chốt) ----------------
  function renderVanDung(a) {
    const c = el("div", "card"); activityHead(a, c);
    c.appendChild(el("p", "subtitle", a.intro || "Thảo luận nhóm, trả lời rồi bấm để xem hướng chốt của giáo viên."));
    (a.cases || []).forEach((cs, i) => {
      const box = el("div", "vd-case");
      box.innerHTML = `<p class="vd-q"><b>Bài ${i + 1}.</b> ${esc(cs.question)}</p>`;
      if (STUDENT) box.appendChild(textAnswerBox(aid(a) + ":t" + i, a));
      if (showModel()) box.appendChild(revealBox("💡 Xem hướng trả lời (GV chốt)", () => el("div", "feedback ok", `<div class="explain">${esc(cs.answer)}</div>`)));
      c.appendChild(box);
    });
    view.appendChild(c);
  }

  // ---- SUMMARY -----------------------------------------------------------
  function renderSummary(a) {
    const c = el("div", "card summary"); const ct = a.content || {};
    const learned = (ct.learned && ct.learned.length) ? ct.learned : (L.coreKnowledge || []);
    const kws = L.keywords || [];
    c.innerHTML = `<h1 class="title">🎉 Tổng kết</h1>`;
    const tb = taskBanner(a); if (tb) c.appendChild(tb);
    c.appendChild(revealBox("📚 Hôm nay em đã học (bấm để hiện)", () => { const d = el("div"); d.innerHTML = `<ul class="lead">${learned.map(x => `<li>${esc(x)}</li>`).join("")}</ul>`; return d; }));
    if (kws.length) c.insertAdjacentHTML("beforeend", `<h2>🔑 Từ khóa cần nhớ</h2><div class="keywords">${kws.map(k => `<span>${esc(k)}</span>`).join("")}</div>`);
    c.appendChild(el("p", "badge", ask("scoreText") || `⭐ Điểm của lớp: ${state.score} · 🔥 Streak cao nhất: ${state.maxStreak}`));
    view.appendChild(c);
    if (ct.challenge && ct.challenge.length) { a._chal = a._chal || { questions: ct.challenge, _keyBase: aid(a) + ":c", _parent: a }; const cc = el("div", "card"); cc.innerHTML = "<h2>🏆 Thử thách cuối</h2>"; view.appendChild(cc); renderQuizInto(cc, a._chal); }
  }

  // ---- confetti / effects ------------------------------------------------
  function celebrate() {
    const box = $("#confetti"); const colors = ["#ef4444", "#f59e0b", "#10b981", "#3b82f6", "#ec4899", "#a855f7"];
    for (let i = 0; i < 32; i++) {
      const p = el("i"); p.style.left = (40 + Math.random() * 20) + "%"; p.style.background = colors[i % colors.length];
      p.style.setProperty("--dx", (Math.random() * 240 - 120) + "px");
      p.style.setProperty("--dy", (-120 - Math.random() * 220) + "px");
      p.style.animationDelay = (Math.random() * 0.1) + "s";
      box.appendChild(p); setTimeout(() => p.remove(), 1200);
    }
  }

  // ---- lightbox (ảnh SGK) — có phóng to + kéo di chuyển ------------------
  const lbImg = $("#lbImg"), lbWrap = $("#lbWrap");
  const lbz = { scale: 1, x: 0, y: 0, drag: false, sx: 0, sy: 0, px: 0, py: 0 };
  function lbApply() { lbImg.style.transform = `translate(${lbz.x}px, ${lbz.y}px) scale(${lbz.scale})`; lbImg.style.cursor = lbz.scale > 1 ? "grab" : "zoom-in"; }
  function lbReset() { lbz.scale = 1; lbz.x = 0; lbz.y = 0; lbApply(); }
  function lbZoom(factor, cx, cy) {
    const ns = Math.min(6, Math.max(1, lbz.scale * factor));
    if (cx != null) { const r = lbWrap.getBoundingClientRect(); const ox = cx - r.left - lbz.x, oy = cy - r.top - lbz.y; const k = ns / lbz.scale; lbz.x -= ox * (k - 1); lbz.y -= oy * (k - 1); }
    lbz.scale = ns; if (ns === 1) { lbz.x = 0; lbz.y = 0; } lbApply();
  }
  function openLightbox(src) { lbImg.src = src; $("#lightbox").hidden = false; lbReset(); }
  $("#lbClose").onclick = () => { $("#lightbox").hidden = true; };
  $("#lightbox").onclick = (e) => { if (e.target.id === "lightbox") $("#lightbox").hidden = true; };
  $("#lbZoomIn").onclick = () => lbZoom(1.3);
  $("#lbZoomOut").onclick = () => lbZoom(1 / 1.3);
  $("#lbZoomReset").onclick = lbReset;
  lbWrap.addEventListener("wheel", (e) => { e.preventDefault(); lbZoom(e.deltaY < 0 ? 1.15 : 1 / 1.15, e.clientX, e.clientY); }, { passive: false });
  lbImg.addEventListener("dblclick", (e) => lbZoom(lbz.scale > 1 ? 0.001 : 2, e.clientX, e.clientY));
  lbWrap.addEventListener("mousedown", (e) => { if (lbz.scale <= 1) return; lbz.drag = true; lbz.sx = e.clientX; lbz.sy = e.clientY; lbz.px = lbz.x; lbz.py = lbz.y; lbImg.style.cursor = "grabbing"; e.preventDefault(); });
  window.addEventListener("mousemove", (e) => { if (!lbz.drag) return; lbz.x = lbz.px + (e.clientX - lbz.sx); lbz.y = lbz.py + (e.clientY - lbz.sy); lbApply(); });
  window.addEventListener("mouseup", () => { if (lbz.drag) { lbz.drag = false; lbApply(); } });

  // ---- ĐÈN PIN (spotlight) & KHUNG PHÓNG TO -----------------------------
  // Hai công cụ "tập trung": loại trừ lẫn nhau và loại trừ với bút vẽ.
  const focus = { tool: null, spotR: 150, spotX: window.innerWidth / 2, spotY: window.innerHeight / 2 };
  const spotEl = $("#spotlight"), zoomLayer = $("#zoomLayer");
  function paintSpot() { spotEl.style.background = `radial-gradient(circle ${focus.spotR}px at ${focus.spotX}px ${focus.spotY}px, rgba(0,0,0,0) 0, rgba(0,0,0,0) ${focus.spotR}px, rgba(0,0,0,.82) ${focus.spotR + 34}px)`; }
  function setFocusTool(tool) {
    focus.tool = (focus.tool === tool) ? null : tool;
    if (focus.tool) setPenMode(null, true); // tắt bút khi bật công cụ tập trung
    spotEl.hidden = focus.tool !== "spotlight";
    zoomLayer.hidden = focus.tool !== "zoomRect";
    $("#btnSpotlight").classList.toggle("on", focus.tool === "spotlight");
    $("#btnZoomRect").classList.toggle("on", focus.tool === "zoomRect");
    if (focus.tool === "spotlight") paintSpot();
  }
  window.addEventListener("mousemove", (e) => { if (focus.tool === "spotlight") { focus.spotX = e.clientX; focus.spotY = e.clientY; paintSpot(); } });
  window.addEventListener("wheel", (e) => { if (focus.tool === "spotlight") { e.preventDefault(); focus.spotR = Math.min(500, Math.max(60, focus.spotR + (e.deltaY < 0 ? 22 : -22))); paintSpot(); } }, { passive: false });
  $("#btnSpotlight").onclick = () => setFocusTool("spotlight");
  $("#btnZoomRect").onclick = () => setFocusTool("zoomRect");

  // Kéo chọn 1 vùng -> phóng to vùng đó lấp đầy màn hình (theo chiều dài nhất)
  let selRect = null, selStart = null;
  function zlPos(e) { const t = e.touches ? e.touches[0] : e; return { x: t.clientX, y: t.clientY }; }
  function zlDown(e) { selStart = zlPos(e); selRect = el("div", "sel-rect"); document.body.appendChild(selRect); e.preventDefault(); }
  function zlMove(e) {
    if (!selStart || !selRect) return; e.preventDefault(); const p = zlPos(e);
    const x = Math.min(p.x, selStart.x), y = Math.min(p.y, selStart.y), w = Math.abs(p.x - selStart.x), h = Math.abs(p.y - selStart.y);
    Object.assign(selRect.style, { left: x + "px", top: y + "px", width: w + "px", height: h + "px" });
  }
  function zlUp(e) {
    if (!selStart || !selRect) return; const p = zlPos(e);
    const x = Math.min(p.x, selStart.x), y = Math.min(p.y, selStart.y), w = Math.abs(p.x - selStart.x), h = Math.abs(p.y - selStart.y);
    selRect.remove(); selRect = null; selStart = null;
    if (w > 30 && h > 30) openMagnify({ x, y, w, h });
  }
  zoomLayer.addEventListener("mousedown", zlDown); zoomLayer.addEventListener("mousemove", zlMove); window.addEventListener("mouseup", (e) => { if (selStart) zlUp(e); });
  zoomLayer.addEventListener("touchstart", zlDown, { passive: false }); zoomLayer.addEventListener("touchmove", zlMove, { passive: false }); zoomLayer.addEventListener("touchend", zlUp);

  function openMagnify(rect) {
    const vw = window.innerWidth, vh = window.innerHeight;
    const scale = rect.w >= rect.h ? vw / rect.w : vh / rect.h; // chiều dài nhất lấp đầy màn hình
    const overlay = el("div", "magnify-overlay");
    const wrap = el("div", "magnify-wrap");
    const clone = document.getElementById("app").cloneNode(true);
    ["#penCanvas", "#confetti", ".controls", ".topbar", "#teacherBar", "#timerPanel", "#lightbox", "#spotlight", "#zoomLayer"].forEach((sel) => { const n = clone.querySelector(sel); if (n) n.style.visibility = "hidden"; });
    Object.assign(clone.style, { position: "absolute", top: "0", left: "0", width: vw + "px", minHeight: vh + "px", margin: "0" });
    wrap.appendChild(clone); overlay.appendChild(wrap);
    const sw = rect.w * scale, sh = rect.h * scale;
    const tx = (vw - sw) / 2 - rect.x * scale, ty = (vh - sh) / 2 - rect.y * scale;
    wrap.style.transformOrigin = "0 0"; wrap.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;
    overlay.appendChild(el("div", "magnify-hint", "Bấm để đóng · Esc"));
    overlay.onclick = () => overlay.remove();
    document.body.appendChild(overlay); focus.magEl = overlay;
  }

  // ---- utils -------------------------------------------------------------
  function shuffle(arr) { for (let i = arr.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [arr[i], arr[j]] = [arr[j], arr[i]]; } return arr; }
  function beep(freq, ms, vol) { try { const ctx = new (window.AudioContext || window.webkitAudioContext)(); const o = ctx.createOscillator(); const g = ctx.createGain(); o.connect(g); g.connect(ctx.destination); o.frequency.value = freq; g.gain.value = vol || 0.06; o.start(); setTimeout(() => { o.stop(); ctx.close(); }, ms); } catch (e) {} }
  // Chuông vui khi ĐÚNG (chuỗi nốt đi lên) / tiếng trầm nhẹ khi SAI.
  function tone(ctx, freq, start, dur, type, vol) {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type || "sine"; o.frequency.value = freq; o.connect(g); g.connect(ctx.destination);
    const t0 = ctx.currentTime + start;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(vol || 0.15, t0 + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.start(t0); o.stop(t0 + dur + 0.03);
  }
  function chime() { try { const ctx = new (window.AudioContext || window.webkitAudioContext)(); [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => tone(ctx, f, i * 0.09, 0.20, "sine", 0.16)); setTimeout(() => ctx.close(), 900); } catch (e) {} }
  function buzz() { try { const ctx = new (window.AudioContext || window.webkitAudioContext)(); tone(ctx, 196, 0, 0.18, "triangle", 0.14); tone(ctx, 146.83, 0.14, 0.26, "triangle", 0.14); setTimeout(() => ctx.close(), 800); } catch (e) {} }
  function sound(kind) { if (!S.sound) return; kind === "ok" ? chime() : buzz(); }

  // ---- TIMER -------------------------------------------------------------
  function fmt(s) { const m = Math.floor(s / 60); return m + ":" + String(s % 60).padStart(2, "0"); }
  function resetTimerForActivity() {
    stopTimer();
    const a = state.view === "activity" ? L.activities[state.idx] : null;
    timer.total = timer.remaining = (a && a.time) || S.defaultTime || 60;
    updateTimerUI(); $("#timerChip").hidden = true; $("#app").classList.remove("time-up");
  }
  function updateTimerUI() { $("#timerBig").textContent = fmt(timer.remaining); $("#timerText").textContent = fmt(timer.remaining); }
  function startTimer() {
    if (timer.running || timer.remaining <= 0) return;
    timer.running = true; $("#timerChip").hidden = false; $("#app").classList.remove("time-up");
    timer.tick = setInterval(() => {
      timer.remaining--; updateTimerUI();
      if (timer.remaining <= 0) { stopTimer(); timeUp(); }
    }, 1000);
  }
  function stopTimer() { if (timer.tick) clearInterval(timer.tick); timer.tick = null; timer.running = false; }
  function timeUp() { $("#app").classList.add("time-up"); beep(660, 200); setTimeout(() => beep(520, 260), 240); const chip = $("#timerChip"); chip.classList.add("blink"); setTimeout(() => chip.classList.remove("blink"), 4000); }
  function addTime(d) { timer.remaining = Math.max(0, timer.remaining + d); timer.total = Math.max(timer.total, timer.remaining); updateTimerUI(); $("#app").classList.remove("time-up"); }
  $("#btnTimer").onclick = () => { const p = $("#timerPanel"); p.hidden = !p.hidden; };
  $("#timerStart").onclick = startTimer;
  $("#timerPause").onclick = stopTimer;
  $("#timerReset").onclick = () => { stopTimer(); timer.remaining = timer.total; updateTimerUI(); $("#timerChip").hidden = true; $("#app").classList.remove("time-up"); };
  [...document.querySelectorAll("#timerPanel [data-d]")].forEach(b => b.onclick = () => addTime(+b.dataset.d));

  // ---- BÚT VẼ / BÚT DẠ QUANG / TẨY --------------------------------------
  // pen.mode: null | "pen" | "highlight" | "eraser". Điều khiển bằng icon trên
  // thanh dưới (luôn bấm được vì thanh nằm TRÊN lớp canvas). Chọn lại cùng công
  // cụ = thoát chế độ vẽ. Canvas chỉ phủ vùng nội dung nên vẫn bấm được nút.
  const canvas = $("#penCanvas");
  const TOOL = {
    pen: { color: "#ef4444", width: 4, comp: "source-over", btn: "btnPen" },
    highlight: { color: "rgba(250,204,21,0.22)", width: 24, comp: "source-over", btn: "btnHighlight" },
    eraser: { color: "#000", width: 34, comp: "destination-out", btn: "btnEraser" },
  };
  function sizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; pen.ctx = canvas.getContext("2d"); }
  function clearPenCanvas() { if (pen.ctx) pen.ctx.clearRect(0, 0, canvas.width, canvas.height); }
  function setPenMode(mode, fromFocus) {
    pen.mode = (pen.mode === mode) ? null : mode; // bấm lại công cụ đang chọn -> thoát
    canvas.hidden = !pen.mode;
    ["btnPen", "btnHighlight", "btnEraser"].forEach(id => $("#" + id).classList.toggle("on", pen.mode && TOOL[pen.mode].btn === id));
    if (pen.mode && !fromFocus && typeof focus !== "undefined" && focus.tool) setFocusTool(focus.tool); // bật bút -> tắt công cụ tập trung
    if (pen.mode && (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight)) sizeCanvas();
  }
  function penPos(e) { const t = e.touches ? e.touches[0] : e; return { x: t.clientX, y: t.clientY }; }
  function penDown(e) { if (!pen.mode) return; pen.drawing = true; pen.last = penPos(e); e.preventDefault(); }
  function penMove(e) {
    if (!pen.mode || !pen.drawing) return; e.preventDefault();
    const p = penPos(e), ctx = pen.ctx, t = TOOL[pen.mode];
    ctx.lineJoin = ctx.lineCap = "round";
    ctx.globalCompositeOperation = t.comp; ctx.strokeStyle = t.color; ctx.lineWidth = t.width;
    ctx.beginPath(); ctx.moveTo(pen.last.x, pen.last.y); ctx.lineTo(p.x, p.y); ctx.stroke(); pen.last = p;
  }
  function penUp() { pen.drawing = false; }
  canvas.addEventListener("mousedown", penDown); canvas.addEventListener("mousemove", penMove); window.addEventListener("mouseup", penUp);
  canvas.addEventListener("touchstart", penDown, { passive: false }); canvas.addEventListener("touchmove", penMove, { passive: false }); canvas.addEventListener("touchend", penUp);
  window.addEventListener("resize", () => { if (pen.mode) sizeCanvas(); });
  $("#btnPen").onclick = () => setPenMode("pen");
  $("#btnHighlight").onclick = () => setPenMode("highlight");
  $("#btnEraser").onclick = () => setPenMode("eraser");
  $("#btnPenClear").onclick = clearPenCanvas; // xóa hết nét, giữ nguyên công cụ đang chọn

  // ---- teacher mode ------------------------------------------------------
  const tbar = $("#teacherBar");
  const jump$ = $("#tJump");
  jump$.innerHTML = "<option>— Nhảy tới hoạt động —</option>" + L.activities.map((a, i) => `<option value="${i}">${i + 1}. ${esc(a.name)}</option>`).join("");
  jump$.onchange = () => { if (jump$.value !== "") jump(+jump$.value); };
  $("#tShowAns").onclick = () => { state.showAnswers = !state.showAnswers; render(); };
  function clearActivity(a) { ["_qi", "_ci", "_chal", "_wrong", "_checked", "_home", "_draft", "_rorder", "_porder"].forEach((k) => delete a[k]); }
  $("#tReset").onclick = () => { clearActivity(L.activities[state.idx]); render(); };
  $("#tResetScore").onclick = () => { state.score = 0; state.streak = 0; state.maxStreak = 0; setScore(); };
  function toggleTeacher() { if (STUDENT) return; state.teacher = !state.teacher; tbar.classList.toggle("show", state.teacher); }

  // API cho máy chủ lớp học (student.js) điều khiển — không bị chặn bởi canNav
  window.LessonApp = {
    go(i) { if (i < 0 || i >= L.activities.length) state.view = "home"; else { state.view = "activity"; state.idx = i; } render(); },
    rerender: () => render(),
    resetActivity(id) { L.activities.forEach((a) => { if (!id || aid(a) === id) clearActivity(a); }); render(); },
    current: () => (state.view === "home" ? -1 : state.idx),
  };

  // ---- controls & keyboard ----------------------------------------------
  $("#btnNext").onclick = next; $("#btnPrev").onclick = prev;
  $("#btnFull").onclick = toggleFull;
  function updateSoundBtn() { const b = $("#btnSound"); b.textContent = S.sound ? "🔊" : "🔇"; b.classList.toggle("on", S.sound); }
  $("#btnSound").onclick = () => { S.sound = !S.sound; updateSoundBtn(); if (S.sound) chime(); };
  updateSoundBtn();
  function toggleFull() { if (!document.fullscreenElement) document.documentElement.requestFullscreen && document.documentElement.requestFullscreen(); else document.exitFullscreen && document.exitFullscreen(); }

  document.addEventListener("keydown", (e) => {
    const typing = /input|textarea|select/i.test(e.target.tagName);
    if (typing && e.key !== "Escape") return;
    switch (e.key) {
      case "ArrowRight": case " ": e.preventDefault(); next(); break;
      case "ArrowLeft": prev(); break;
      case "f": case "F": toggleFull(); break;
      case "t": case "T": toggleTeacher(); break;
      case "p": case "P": setPenMode("pen"); break;
      case "h": case "H": setPenMode("highlight"); break;
      case "1": case "2": case "3": case "4": {
        if (pen.mode) break;
        const opts = view.querySelector(".options"); if (opts) { const b = opts.children[+e.key - 1]; b && b.click(); }
        break;
      }
      case "Enter": { const b = view.querySelector(".card .btn:not(:disabled)"); if (b) b.click(); break; }
      case "Escape": { const m = $(".magnify-overlay"); if (m) { m.remove(); e.stopPropagation(); } else if (!$("#lightbox").hidden) { $("#lightbox").hidden = true; } break; }
    }
  });

  // ---- renderer registry -------------------------------------------------
  const RENDERERS = {
    intro: renderKnowledge, explore: renderKnowledge, knowledge: renderKnowledge,
    quiz: renderQuiz, matching: renderMatching, dragdrop: renderDragDrop,
    ordering: renderOrdering, fillblank: renderFillBlank, flashcard: renderFlashcard,
    scenario: renderScenario, remember: renderRemember, summary: renderSummary,
    penguin: renderPenguin, vandung: renderVanDung,
  };

  render();
})();
