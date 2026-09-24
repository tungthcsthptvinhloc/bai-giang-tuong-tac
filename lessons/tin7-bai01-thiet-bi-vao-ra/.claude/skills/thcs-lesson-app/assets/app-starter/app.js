/* ============================================================================
 * THCS Lesson App — ENGINE (vanilla JS, offline, không phụ thuộc thư viện).
 * Đọc dữ liệu từ window.LESSON (data/lesson.js) và render từng hoạt động.
 * Component tái sử dụng: intro, knowledge/explore, quiz (multiple-choice/
 * multiple-select/true-false), matching, dragdrop, ordering, fillblank,
 * flashcard, scenario, remember, summary.  Thêm loại mới -> thêm 1 renderer.
 * ==========================================================================*/
(function () {
  "use strict";
  const L = window.LESSON;
  if (!L) { document.body.innerHTML = "<p style='padding:40px'>Không tìm thấy dữ liệu bài học (data/lesson.js).</p>"; return; }

  const S = Object.assign({ basePoints: 100, useTimer: false, defaultTime: 20, sound: false, streakEnabled: true }, L.settings || {});
  const state = { view: "home", idx: 0, score: 0, streak: 0, maxStreak: 0, teacher: false, showAnswers: false, timer: null };
  const $ = (sel, root = document) => root.querySelector(sel);
  const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
  const esc = (s) => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const KEYS = ["A", "B", "C", "D", "E", "F"];

  // ---- shell -------------------------------------------------------------
  const root = document.getElementById("app");
  root.innerHTML = `
    <div class="topbar">
      <div class="act-name" id="actName">${esc(L.meta && L.meta.title || "Bài học")}</div>
      <div class="spacer"></div>
      <div class="progress"><i id="progFill"></i></div>
      <div class="progress-label" id="progLabel"></div>
    </div>
    <div class="stage"><div id="view"></div></div>
    <div class="controls">
      <button class="btn ghost" id="btnPrev">← Quay lại</button>
      <div class="score">Điểm: <span id="score">0</span> <span class="streak" id="streak"></span></div>
      <div id="timerBox"></div>
      <div class="spacer"></div>
      <button class="btn ghost" id="btnFull">⛶ Toàn màn hình</button>
      <button class="btn" id="btnNext">Tiếp tục →</button>
    </div>
    <div class="teacher-bar" id="teacherBar">
      <strong>Chế độ giáo viên</strong>
      <button id="tShowAns">Hiện/ẩn đáp án</button>
      <button id="tReset">Reset hoạt động</button>
      <button id="tResetScore">Reset điểm</button>
      <button id="tTimer">Bật/tắt đếm giờ</button>
      <select id="tJump"></select>
      <span class="hint">Phím T bật/tắt bảng này</span>
    </div>`;

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
  function goHome() { state.view = "home"; render(); }
  function start() { state.view = "activity"; state.idx = 0; render(); }
  function next() {
    if (state.view === "home") return start();
    if (state.idx < L.activities.length - 1) { state.idx++; render(); }
  }
  function prev() {
    if (state.view === "home") return;
    if (state.idx > 0) { state.idx--; render(); } else goHome();
  }
  function jump(i) { state.view = "activity"; state.idx = i; render(); }

  function render() {
    clearTimer();
    view.innerHTML = "";
    setProgress(); setScore();
    if (state.view === "home") return renderHome();
    const a = L.activities[state.idx];
    (RENDERERS[a.type] || renderKnowledge)(a);
  }

  // ---- home --------------------------------------------------------------
  function renderHome() {
    const c = el("div", "card home");
    const m = L.meta || {};
    c.innerHTML = `
      <h1 class="title">${esc(m.title || "Bài học")}</h1>
      <p class="meta">${esc(m.subject || "")} · Lớp ${esc(m.grade || "")} · ${esc(m.book || "")}</p>
      ${L.coreKnowledge && L.coreKnowledge.length ? `<p class="lead">Hôm nay chúng ta sẽ tìm hiểu và ghi nhớ ${L.coreKnowledge.length} điều quan trọng.</p>` : ""}
      <p><button class="btn big" id="btnStart">Bắt đầu tiết học →</button></p>`;
    const menu = el("div", "menu");
    L.activities.forEach((a, i) => { const b = el("button", null, `${i + 1}. ${esc(a.name)}`); b.onclick = () => jump(i); menu.appendChild(b); });
    c.appendChild(menu);
    view.appendChild(c);
    $("#btnStart").onclick = start;
  }

  // ---- helpers for content blocks ---------------------------------------
  function imageHTML(src, caption) { return src ? `<img class="lesson-img" src="${esc(src)}" alt="${esc(caption || "")}"><div class="caption">${esc(caption || "")}</div>` : ""; }
  function blocksHTML(blocks) {
    return (blocks || []).map((b) => {
      if (b.kind === "text") return `<p class="lead">${esc(b.value)}</p>`;
      if (b.kind === "image") return imageHTML(b.value, b.caption);
      if (b.kind === "list") return "<ul class='lead'>" + b.value.map((x) => `<li>${esc(x)}</li>`).join("") + "</ul>";
      if (b.kind === "ext") return `<p><span class="ext-tag">Mở rộng</span> ${esc(b.value)}</p>`;
      return "";
    }).join("");
  }

  // ---- intro / explore / knowledge --------------------------------------
  function renderKnowledge(a) {
    const c = el("div", "card");
    const ct = a.content || {};
    c.innerHTML = `${ct.heading ? `<h1 class="title">${esc(ct.heading)}</h1>` : ""}
      ${ct.prompt ? `<p class="prompt">${esc(ct.prompt)}</p>` : ""}
      ${imageHTML(ct.image, ct.imageCaption)}
      ${blocksHTML(ct.blocks)}`;
    view.appendChild(c);
    // Nếu intro có kèm câu hỏi, render câu hỏi ngay dưới.
    if (a.questions && a.questions.length) renderQuizInto(c, a);
    if (a.remember && a.remember.length) appendRemember(a.remember);
  }
  function appendRemember(items) {
    const box = el("div", "card remember");
    box.innerHTML = `<h2>💡 Em cần nhớ</h2><ol>${items.map((t) => `<li>${esc(t)}</li>`).join("")}</ol>`;
    view.appendChild(box);
  }

  // ---- QUIZ (multiple-choice / multiple-select / true-false) ------------
  function renderQuiz(a) { const c = el("div", "card"); view.appendChild(c); renderQuizInto(c, a); }
  function renderQuizInto(card, a) {
    a._qi = a._qi || 0;
    const qs = a.questions || [];
    if (!qs.length) { card.innerHTML += "<p class='lead'>[CẦN GIÁO VIÊN KIỂM TRA] Chưa có câu hỏi.</p>"; return; }
    const q = qs[a._qi];
    const wrap = el("div");
    wrap.innerHTML = `<p class="subtitle">Câu ${a._qi + 1}/${qs.length} · ${levelLabel(q.level)}</p>
      <p class="prompt">${esc(q.question)}</p>`;
    card.appendChild(wrap);
    const answered = { done: false };

    if (q.type === "true-false") {
      const opts = el("div", "options");
      [["Đúng", true], ["Sai", false]].forEach(([label, val], i) => {
        const b = el("button", "opt", `<span class="key">${KEYS[i]}</span> ${label}`);
        b.onclick = () => judgeTF(b, opts, val, q, a, card, answered);
        b.dataset.k = i; opts.appendChild(b);
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
        const submit = el("button", "btn", "Kiểm tra");
        submit.onclick = () => judgeMS(opts, q, a, card, answered, submit);
        card.appendChild(el("p").appendChild(submit).parentNode);
      }
    }
    if (state.showAnswers) revealAnswer(card._opts, q);
    card._answered = answered; card._q = q; card._a = a;
  }
  function toggleMulti(b) { if (!b.classList.contains("locked")) b.classList.toggle("selected"); }

  function judgeMC(i, opts, q, a, card, answered) {
    if (answered.done) return; answered.done = true;
    const ok = i === q.answer;
    [...opts.children].forEach((b, k) => { if (k === q.answer) b.classList.add("correct"); else if (k === i) b.classList.add("wrong"); else b.classList.add("dim"); b.onclick = null; });
    afterAnswer(ok, q, card);
  }
  function judgeTF(btn, opts, val, q, a, card, answered) {
    if (answered.done) return; answered.done = true;
    const ok = val === q.answer;
    [...opts.children].forEach((b) => { const isCorrect = (b.textContent.includes("Đúng")) === q.answer; if (isCorrect) b.classList.add("correct"); else b.classList.add("dim"); b.onclick = null; });
    if (!ok) btn.classList.add("wrong");
    afterAnswer(ok, q, card);
  }
  function judgeMS(opts, q, a, card, answered, submit) {
    if (answered.done) return; answered.done = true;
    const chosen = [...opts.children].filter((b) => b.classList.contains("selected")).map((b) => +b.dataset.k).sort();
    const correct = [...(q.answer || [])].sort();
    const ok = JSON.stringify(chosen) === JSON.stringify(correct);
    [...opts.children].forEach((b, k) => { if (correct.includes(k)) b.classList.add("correct"); else if (b.classList.contains("selected")) b.classList.add("wrong"); b.classList.add("locked"); });
    submit.disabled = true;
    afterAnswer(ok, q, card);
  }

  function afterAnswer(ok, q, card) {
    clearTimer();
    if (ok) { let pts = S.basePoints; if (S.streakEnabled) { state.streak++; pts = Math.round(pts * Math.min(2, 1 + (state.streak - 1) * 0.2)); } state.maxStreak = Math.max(state.maxStreak, state.streak); state.score += pts; }
    else { state.streak = 0; card.classList.add("shake"); }
    setScore();
    const fb = el("div", "feedback " + (ok ? "ok" : "no"));
    fb.innerHTML = `${ok ? "✓ Chính xác!" : "✗ Chưa chính xác!"}<div class="explain">${esc(q.explanation || "")}</div>`;
    card.appendChild(fb);
    // câu tiếp theo trong cùng hoạt động
    const a2 = card._a;
    if (a2 && a2.questions && a2._qi < a2.questions.length - 1) {
      const nb = el("button", "btn", "Câu tiếp theo →");
      nb.onclick = () => { a2._qi++; render(); };
      card.appendChild(el("p").appendChild(nb).parentNode);
    }
    sound(ok ? "ok" : "no");
  }
  function revealAnswer(opts, q) {
    if (!opts) return;
    if (q.type === "multiple-choice") opts.children[q.answer] && opts.children[q.answer].classList.add("correct");
    if (q.type === "multiple-select") (q.answer || []).forEach((k) => opts.children[k] && opts.children[k].classList.add("correct"));
  }
  function levelLabel(l) { return ({ "nhan-biet": "Nhận biết", "thong-hieu": "Thông hiểu", "van-dung": "Vận dụng", "van-dung-cao": "Vận dụng cao" }[l]) || ""; }

  // ---- MATCHING ----------------------------------------------------------
  function renderMatching(a) {
    const c = el("div", "card");
    c.innerHTML = `<h1 class="title">${esc(a.name)}</h1><p class="subtitle">Chọn một ô bên trái rồi chọn ô tương ứng bên phải.</p>`;
    const pairs = (a.pairs || []).map((p, i) => ({ ...p, i }));
    const rights = shuffle(pairs.slice());
    const grid = el("div", "two-col"); const left = el("div"); const right = el("div");
    let sel = null, matched = 0;
    pairs.forEach((p) => { const ch = el("div", "chip", esc(p.left)); ch.dataset.i = p.i; ch.onclick = () => { if (ch.classList.contains("done")) return; [...left.children].forEach(x => x.classList.remove("selected")); ch.classList.add("selected"); sel = ch; }; left.appendChild(ch); });
    rights.forEach((p) => { const ch = el("div", "chip", esc(p.right)); ch.dataset.i = p.i; ch.onclick = () => { if (!sel || ch.classList.contains("done")) return; if (sel.dataset.i === ch.dataset.i) { ch.classList.add("done"); sel.classList.add("done"); sel.classList.remove("selected"); sel = null; matched++; if (matched === pairs.length) { state.score += S.basePoints; setScore(); showMatchDone(c, a); } } else { ch.classList.add("shake"); setTimeout(() => ch.classList.remove("shake"), 400); } }; right.appendChild(ch); });
    grid.append(left, right); c.appendChild(grid); view.appendChild(c);
  }
  function showMatchDone(c, a) { const fb = el("div", "feedback ok"); fb.innerHTML = `✓ Hoàn thành!<div class="explain">${esc(a.explanation || "")}</div>`; c.appendChild(fb); sound("ok"); }

  // ---- DRAG & DROP (phân loại) ------------------------------------------
  function renderDragDrop(a) {
    const c = el("div", "card");
    c.innerHTML = `<h1 class="title">${esc(a.name)}</h1><p class="subtitle">Chọn một thẻ rồi bấm vào nhóm đúng.</p>`;
    const pool = el("div"); const zonesWrap = el("div", "two-col");
    let sel = null, placed = 0; const items = shuffle((a.items || []).slice());
    const zones = (a.groups || []).map((g, gi) => { const z = el("div", "dropzone"); z.innerHTML = `<h3>${esc(g)}</h3>`; z.onclick = () => { if (!sel) return; const correct = +sel.dataset.g === gi; if (correct) { sel.classList.add("done"); z.appendChild(sel); sel.classList.remove("selected"); sel = null; placed++; if (placed === items.length) finishDD(c, a); } else { z.classList.add("shake"); setTimeout(() => z.classList.remove("shake"), 400); } }; zonesWrap.appendChild(z); return z; });
    items.forEach((it) => { const ch = el("div", "chip", esc(it.text)); ch.dataset.g = it.group; ch.onclick = () => { if (ch.classList.contains("done")) return; [...pool.children].forEach(x => x.classList.remove("selected")); ch.classList.add("selected"); sel = ch; }; pool.appendChild(ch); });
    c.append(pool, zonesWrap); view.appendChild(c);
    c._a = a;
  }
  function finishDD(c, a) { state.score += S.basePoints; setScore(); const fb = el("div", "feedback ok"); fb.innerHTML = `✓ Phân loại xong!<div class="explain">${esc(a.explanation || "")}</div>`; c.appendChild(fb); sound("ok"); }

  // ---- ORDERING ----------------------------------------------------------
  function renderOrdering(a) {
    const c = el("div", "card");
    c.innerHTML = `<h1 class="title">${esc(a.name)}</h1><p class="subtitle">Dùng ▲▼ để sắp đúng thứ tự rồi bấm Kiểm tra.</p>`;
    let order = (a.steps || []).map((s, i) => ({ s, i })); order = shuffle(order.slice());
    const list = el("ul", "order-list");
    function draw() { list.innerHTML = ""; order.forEach((o, pos) => { const li = el("li"); li.innerHTML = `<span>${esc(o.s)}</span>`; const up = el("button", null, "▲"), dn = el("button", null, "▼"); up.onclick = () => { if (pos > 0) { [order[pos - 1], order[pos]] = [order[pos], order[pos - 1]]; draw(); } }; dn.onclick = () => { if (pos < order.length - 1) { [order[pos + 1], order[pos]] = [order[pos], order[pos + 1]]; draw(); } }; const ctrl = el("span"); ctrl.append(up, dn); li.appendChild(ctrl); list.appendChild(li); }); }
    draw(); c.appendChild(list);
    const btn = el("button", "btn", "Kiểm tra");
    btn.onclick = () => { const ok = order.every((o, i) => o.i === i); const fb = el("div", "feedback " + (ok ? "ok" : "no")); fb.innerHTML = `${ok ? "✓ Đúng thứ tự!" : "✗ Chưa đúng, thử lại nhé."}<div class="explain">${esc(a.explanation || "")}</div>`; if (ok) { state.score += S.basePoints; setScore(); btn.disabled = true; } c.appendChild(fb); sound(ok ? "ok" : "no"); };
    c.append(el("p").appendChild(btn).parentNode); view.appendChild(c);
  }

  // ---- FILL BLANK --------------------------------------------------------
  function renderFillBlank(a) {
    const c = el("div", "card fill");
    c.innerHTML = `<h1 class="title">${esc(a.name)}</h1>`;
    const p = el("p", "prompt"); const parts = (a.text || "").split("{{}}");
    const inputs = [];
    parts.forEach((seg, i) => { p.appendChild(document.createTextNode(seg.replace(/\s+/g, " "))); if (i < parts.length - 1) { const inp = el("input"); inputs.push(inp); p.appendChild(inp); } });
    c.appendChild(p);
    const btn = el("button", "btn", "Kiểm tra");
    btn.onclick = () => { let ok = true; inputs.forEach((inp, i) => { const accepts = (a.answers[i] || []).map(norm); const good = accepts.includes(norm(inp.value)); inp.style.borderColor = good ? "var(--correct)" : "var(--wrong)"; if (!good) ok = false; }); const fb = el("div", "feedback " + (ok ? "ok" : "no")); fb.innerHTML = `${ok ? "✓ Chính xác!" : "✗ Chưa đúng."}<div class="explain">${esc(a.explanation || "")}</div>`; if (ok) { state.score += S.basePoints; setScore(); btn.disabled = true; } c.appendChild(fb); sound(ok ? "ok" : "no"); };
    c.append(el("p").appendChild(btn).parentNode); view.appendChild(c);
  }
  const norm = (s) => String(s || "").trim().toLowerCase();

  // ---- FLASHCARD ---------------------------------------------------------
  function renderFlashcard(a) {
    a._ci = a._ci || 0; const cards = a.cards || [];
    const c = el("div", "card"); c.innerHTML = `<h1 class="title">${esc(a.name)}</h1><p class="subtitle">Thẻ ${a._ci + 1}/${cards.length} — bấm để lật.</p>`;
    const card = cards[a._ci] || { front: "", back: "" };
    const fc = el("div", "flashcard"); fc.innerHTML = `<div class="inner"><div class="face front">${esc(card.front)}</div><div class="face back">${esc(card.back)}</div></div>`;
    fc.onclick = () => fc.classList.toggle("flipped"); c.appendChild(fc);
    const nav = el("p"); const nb = el("button", "btn", "Thẻ tiếp theo →"); nb.disabled = a._ci >= cards.length - 1; nb.onclick = () => { a._ci++; render(); }; nav.appendChild(nb); c.appendChild(nav);
    view.appendChild(c);
  }

  // ---- SCENARIO (tình huống / vận dụng) ---------------------------------
  function renderScenario(a) {
    const c = el("div", "card"); const ct = a.content || {};
    c.innerHTML = `<h1 class="title">${esc(a.name)}</h1>
      <p class="lead">${esc(ct.situation || "")}</p>
      <p class="prompt">${esc(ct.question || "")}</p>`;
    if (ct.hints && ct.hints.length) { const h = el("button", "btn ghost", "Gợi ý"); const box = el("div"); box.hidden = true; box.innerHTML = "<ul class='lead'>" + ct.hints.map(x => `<li>${esc(x)}</li>`).join("") + "</ul>"; h.onclick = () => box.hidden = !box.hidden; c.append(h, box); }
    if (ct.modelAnswer) { const b = el("button", "btn", "Xem hướng trả lời (GV chốt)"); const box = el("div", "feedback ok"); box.hidden = true; box.innerHTML = `<div class="explain">${esc(ct.modelAnswer)}</div>`; b.onclick = () => box.hidden = !box.hidden; c.append(el("p").appendChild(b).parentNode, box); }
    view.appendChild(c);
    if (a.questions && a.questions.length) renderQuizInto(c, a);
  }

  // ---- REMEMBER (Em cần nhớ độc lập) ------------------------------------
  function renderRemember(a) { const box = el("div", "card remember"); const items = a.items || (a.content && a.content.items) || a.remember || []; box.innerHTML = `<h2>💡 ${esc(a.name || "Em cần nhớ")}</h2><ol>${items.map((t) => `<li>${esc(t)}</li>`).join("")}</ol>`; view.appendChild(box); }

  // ---- SUMMARY -----------------------------------------------------------
  function renderSummary(a) {
    const c = el("div", "card summary"); const ct = a.content || {};
    const learned = (ct.learned && ct.learned.length) ? ct.learned : (L.coreKnowledge || []);
    const kws = L.keywords || [];
    c.innerHTML = `<h1 class="title">🎉 Tổng kết</h1>
      <h2>Hôm nay em đã học</h2><ul class="lead">${learned.map(x => `<li>${esc(x)}</li>`).join("")}</ul>
      ${kws.length ? `<h2>3 từ khóa cần nhớ</h2><div class="keywords">${kws.map(k => `<span>${esc(k)}</span>`).join("")}</div>` : ""}
      <p class="badge">Điểm của lớp: ${state.score} · Streak cao nhất: ${state.maxStreak}</p>`;
    view.appendChild(c);
    if (ct.challenge && ct.challenge.length) { a._chal = a._chal || { questions: ct.challenge, _qi: 0 }; const cc = el("div", "card"); cc.innerHTML = "<h2>Thử thách cuối</h2>"; view.appendChild(cc); renderQuizInto(cc, a._chal); }
  }

  // ---- renderer registry -------------------------------------------------
  let RENDERERS;
  function RENDERERS_LATER() {
    RENDERERS = {
      intro: renderKnowledge, explore: renderKnowledge, knowledge: renderKnowledge,
      quiz: renderQuiz, matching: renderMatching, dragdrop: renderDragDrop,
      ordering: renderOrdering, fillblank: renderFillBlank, flashcard: renderFlashcard,
      scenario: renderScenario, remember: renderRemember, summary: renderSummary,
    };
  }

  // ---- utils -------------------------------------------------------------
  function shuffle(arr) { for (let i = arr.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [arr[i], arr[j]] = [arr[j], arr[i]]; } return arr; }
  function clearTimer() { if (state.timer) { clearInterval(state.timer); state.timer = null; } $("#timerBox").innerHTML = ""; }
  function sound(kind) { if (!S.sound) return; try { const ctx = new (window.AudioContext || window.webkitAudioContext)(); const o = ctx.createOscillator(); const g = ctx.createGain(); o.connect(g); g.connect(ctx.destination); o.frequency.value = kind === "ok" ? 880 : 220; g.gain.value = 0.05; o.start(); setTimeout(() => { o.stop(); ctx.close(); }, 160); } catch (e) {} }

  // ---- teacher mode ------------------------------------------------------
  const tbar = $("#teacherBar");
  const jump$ = $("#tJump");
  jump$.innerHTML = "<option>— Nhảy tới hoạt động —</option>" + L.activities.map((a, i) => `<option value="${i}">${i + 1}. ${esc(a.name)}</option>`).join("");
  jump$.onchange = () => { if (jump$.value !== "") jump(+jump$.value); };
  $("#tShowAns").onclick = () => { state.showAnswers = !state.showAnswers; render(); };
  $("#tReset").onclick = () => { const a = L.activities[state.idx]; delete a._qi; delete a._ci; render(); };
  $("#tResetScore").onclick = () => { state.score = 0; state.streak = 0; state.maxStreak = 0; setScore(); };
  $("#tTimer").onclick = () => { S.useTimer = !S.useTimer; alert("Đếm giờ: " + (S.useTimer ? "BẬT" : "TẮT")); };
  function toggleTeacher() { state.teacher = !state.teacher; tbar.classList.toggle("show", state.teacher); }

  // ---- controls & keyboard ----------------------------------------------
  $("#btnNext").onclick = next; $("#btnPrev").onclick = prev;
  $("#btnFull").onclick = toggleFull;
  function toggleFull() { if (!document.fullscreenElement) document.documentElement.requestFullscreen && document.documentElement.requestFullscreen(); else document.exitFullscreen && document.exitFullscreen(); }

  document.addEventListener("keydown", (e) => {
    const typing = /input|textarea|select/i.test(e.target.tagName);
    if (typing && e.key !== "Escape") return;
    switch (e.key) {
      case "ArrowRight": case " ": e.preventDefault(); next(); break;
      case "ArrowLeft": prev(); break;
      case "f": case "F": toggleFull(); break;
      case "t": case "T": toggleTeacher(); break;
      case "1": case "2": case "3": case "4": {
        const opts = view.querySelector(".options"); if (opts) { const b = opts.children[+e.key - 1]; b && b.click(); }
        break;
      }
      case "Enter": { const b = view.querySelector(".card .btn:not(:disabled)"); if (b) b.click(); break; }
    }
  });

  RENDERERS_LATER();
  render();
})();
