/* ============================================================================
 * student.js — được CHÈN vào mọi trang bài giảng (/lessons/<bài>/), chạy TRƯỚC app.js.
 * Khai báo window.LESSON_HOOKS để engine làm việc với cơ sở dữ liệu lớp học (db.js).
 *
 *  • Máy HỌC SINH (mặc định): gửi bài làm (có hàng đợi, mất mạng tự gửi lại), khóa câu
 *    đã làm, theo nhịp GV (chuyển hoạt động, đồng hồ, khóa khi hết giờ, công bố kết quả).
 *  • MÀN TRÌNH CHIẾU của GV (?gv=1): báo hoạt động đang chiếu; bảng 📊 hiện số máy
 *    chọn A/B/C/D/chưa làm; bấm giờ, Kết thúc, danh sách nhóm đúng/sai/chưa làm.
 * ==========================================================================*/
(function () {
  "use strict";
  const C = window.LHCore, params = new URLSearchParams(location.search);
  const lessonId = decodeURIComponent((location.pathname.match(/\/lessons\/([^/]+)/) || [])[1] || "");
  const LS = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} },
    del(k) { try { localStorage.removeItem(k); } catch (e) {} },
  };
  const esc = C.esc, fmt1 = C.fmt1;
  const onReady = (fn) => (document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", fn) : fn());
  const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
  const aidOf = (a, i) => (a && (a.id || "a" + i)) || null;
  const curAct = () => { const i = window.LessonApp ? window.LessonApp.current() : -1; return { i, a: window.LESSON && window.LESSON.activities[i] }; };
  // Đồng hồ theo nhịp GV đặt trên THANH TIÊU ĐỀ của bài (thanh cố định, luôn nhìn thấy khi cuộn)
  function topClock() {
    const top = document.querySelector(".topbar"); if (!top) return null;
    let c = top.querySelector(".lh-clock");
    if (!c) { c = el("div", "lh-clock"); c.hidden = true; const sp = top.querySelector(".spacer"); if (sp) sp.insertAdjacentElement("afterend", c); else top.appendChild(c); }
    return c;
  }
  function paintClock(c, k) {
    if (!c) return;
    c.hidden = !k || !(k.running || k.over || k.st === "locked" || k.st === "revealed");
    if (c.hidden) return;
    c.className = "lh-clock " + (k.over ? "locked" : k.st) + (k.running && k.left <= 10 ? " hurry" : "");
    const t = k.st === "revealed" ? "🏁 Đã công bố" : k.st === "locked" || k.over ? "⏰ Hết giờ" : "⏱ " + C.fmtClock(k.left);
    if (c.textContent !== t) c.textContent = t;
  }

  if (params.has("gv")) return projector();
  student();

  // ================================== HỌC SINH ==================================
  function student() {
    const auth = LS.get("lh_auth", null);
    if (!auth || !auth.gid || !auth.sid || auth.lessonId !== lessonId) {
      window.LESSON_HOOKS = { role: "student", canNavigate: () => false };
      document.documentElement.style.visibility = "hidden";
      location.replace("/"); return;
    }
    const { sid, gid } = auth, base = "sessions/" + sid;
    const CK = `lh_cache_${sid}_${gid}`, OK = `lh_outbox_${sid}_${gid}`;
    const cache = Object.assign({ answers: {}, texts: {}, live: {}, group: null, grading: {}, roster: {}, machines: {} }, LS.get(CK, {}));
    let outbox = LS.get(OK, []), stopped = false, nav = { idx: -1, qi: 0 }, info = null;
    const unsubs = [];
    const persist = () => LS.set(CK, cache);
    const saveOutbox = () => LS.set(OK, outbox);
    const rec2 = (tree, key) => { const [a, i] = C.splitKey(key); return ((tree || {})[a] || {})[i] || null; };
    const put = (tree, key, v) => { const [a, i] = C.splitKey(key); (tree[a] = tree[a] || {})[i] = v; };
    const items = () => info || (window.LESSON ? (info = C.lessonItems(window.LESSON)) : { items: [], openQs: [] });
    const now = () => (window.DB ? DB.now() : Date.now());
    const myScore = () => C.scoreGroup({ live: cache.live, answers: { [gid]: cache.answers }, grading: { [gid]: cache.grading } }, gid, items(), { hideOpen: true, now: now() });

    window.LESSON_HOOKS = {
      role: "student",
      getAttempt: (key) => rec2(cache.answers, key),
      getText: (key) => rec2(cache.texts, key),
      actState: (aid) => C.actState(cache.live, aid, now()),
      showModel: () => !!cache.live.showModel,
      canNavigate: () => !cache.live.follow,
      scoreText: () => { if (cache.live.showScore === false) return null; const s = myScore(); return `🏅 Điểm nhóm em: ${fmt1(s.score)}/10 · Đã làm ${s.done}/${s.total} bài`; },
      onAttempt(rec) {
        const [a] = C.splitKey(rec.key), st = C.actState(cache.live, a, now());
        if (st === "locked" || st === "revealed") return;
        if (st === "free" && rec2(cache.answers, rec.key)) return; // tự làm: chỉ tính lần đầu
        const v = { choice: rec.choice === undefined ? null : rec.choice, ok: !!rec.ok, fraction: C.clamp01(rec.fraction), total: rec.total || null, at: now() };
        put(cache.answers, rec.key, v); persist();
        const [aa, ii] = C.splitKey(rec.key); queue(`${base}/answers/${gid}/${aa}/${ii}`, v); updateStrip();
      },
      onText(rec) { const v = { text: String(rec.text || "").slice(0, 3000), at: now() }; put(cache.texts, rec.key, v); persist(); const [a, i] = C.splitKey(rec.key); queue(`${base}/texts/${gid}/${a}/${i}`, v); },
      onNavigate(d) { const changedAct = d.idx !== nav.idx; nav = d; if (changedAct) beat(); updateStrip(); },
    };

    // ---- hàng đợi ghi (mất mạng vẫn giữ trong máy, có mạng gửi tiếp) --------------
    let flushing = false, retryT = null;
    function queue(path, value) { outbox = outbox.filter((j) => j.path !== path); outbox.push({ path, value }); saveOutbox(); flush(); }
    async function flush() {
      if (flushing || stopped || !window.DB) return; flushing = true;
      try {
        while (outbox.length) {
          const job = outbox[0];
          try { await DB.set(job.path, job.value); }
          catch (e) {
            if (!/PERMISSION_DENIED/i.test(e.code || e.message)) { setNet(false); clearTimeout(retryT); retryT = setTimeout(flush, 3000); return; }
            // bị từ chối (hết giờ / đã công bố / đã làm): bỏ việc này
          }
          outbox.shift(); saveOutbox(); updateStrip();
        }
      } finally { flushing = false; }
    }
    function beat() { if (window.DB && !stopped) DB.set(`${base}/groups/${gid}/nav`, { idx: nav.idx, qi: nav.qi || 0, at: now() }).catch(() => {}); }

    // ---- nhận dữ liệu từ máy chủ -------------------------------------------------------
    function mergeAnswers(v) {
      v = v || {};
      const pend = {}; outbox.forEach((j) => { const m = j.path.match(/\/answers\/[^/]+\/([^/]+)\/([^/]+)$/); if (m) put(pend, m[1] + ":" + m[2], j.value); });
      const merged = JSON.parse(JSON.stringify(v)); Object.entries(pend).forEach(([a, o]) => Object.entries(o).forEach(([i, r]) => put(merged, a + ":" + i, r)));
      const keys = (t) => new Set(Object.entries(t).flatMap(([a, o]) => Object.keys(o || {}).map((i) => a + ":" + i)));
      const before = keys(cache.answers), after = keys(merged);
      const removedActs = new Set([...before].filter((k) => !after.has(k)).map((k) => C.splitKey(k)[0]));
      const added = [...after].some((k) => !before.has(k));
      cache.answers = merged; persist(); updateStrip();
      const app = window.LessonApp; if (!app) return;
      if (removedActs.size) removedActs.forEach((aid) => app.resetActivity(aid)); // GV cho làm lại
      else if (added) { const { i, a } = curAct(); if (a && [...after].some((k) => k.startsWith(aidOf(a, i) + ":") && !before.has(k))) app.rerender(); }
    }
    let lastSt = null;
    function applyLive(l) {
      const prev = cache.live || {}; cache.live = l || {}; persist();
      document.body.classList.toggle("lh-follow", !!cache.live.follow);
      showPause(!!cache.live.paused);
      const app = window.LessonApp; if (!app) return;
      if (cache.live.follow && typeof cache.live.teacherIdx === "number" && app.current() !== cache.live.teacherIdx) { lastSt = null; return app.go(cache.live.teacherIdx); }
      const { i, a } = curAct(), aid = aidOf(a, i);
      const st = aid ? C.actState(cache.live, aid, now()) : null;
      const modelChanged = !!prev.showModel !== !!cache.live.showModel && a && (a.type === "scenario" || a.type === "vandung");
      if (aid && st === "revealed" && lastSt && lastSt !== "revealed") setTimeout(() => cheer(aid), 350); // GV vừa bấm Kết thúc
      if ((aid && st !== lastSt && lastSt !== null) || modelChanged || !!prev.follow !== !!cache.live.follow) app.rerender();
      lastSt = st; updateStrip();
    }
    // Đồng hồ: đếm ngược trên THANH TIÊU ĐỀ cố định (luôn nhìn thấy); hết giờ -> vẽ lại (khóa bài)
    setInterval(() => {
      if (stopped) return;
      const { i, a } = curAct(), aid = aidOf(a, i);
      const st = aid ? C.actState(cache.live, aid, now()) : null;
      if (aid && lastSt !== null && st !== lastSt && window.LessonApp) { if (st === "revealed") setTimeout(() => cheer(aid), 350); lastSt = st; window.LessonApp.rerender(); }
      else lastSt = st;
      updateClock();
    }, 500);
    setInterval(beat, 20000);

    // ---- giao diện: dải thông tin, đồng hồ, tạm dừng, kết thúc ---------------------
    let strip, netDot, clockEl, pauseEl;
    function buildStrip() {
      strip = el("div", "lh-strip", `<span class="lh-net" title="Kết nối máy chủ"></span><span class="lh-group"></span><span class="lh-score"></span><span class="lh-sp"></span><a class="lh-link" href="/?add=1">➕ Thêm bạn</a>`);
      const top = document.querySelector(".topbar");
      if (top) top.insertAdjacentElement("afterend", strip); else document.body.prepend(strip);
      netDot = strip.querySelector(".lh-net"); clockEl = topClock();
    }
    function setNet(on) { if (netDot) { netDot.classList.toggle("off", !on); netDot.title = on ? "Đã kết nối" : "Mất kết nối — bài làm vẫn được lưu trong máy và tự gửi lại"; } }
    function updateStrip() {
      if (!strip) return;
      const g = cache.group, mname = g ? g.name || ((cache.machines[g.machine] || {}).name) || "Nhóm" : "…";
      const names = g ? C.sortedEntries(cache.roster).filter(([s]) => g.members && g.members[s]).map(([, s]) => s.name) : [];
      strip.querySelector(".lh-group").innerHTML = `💻 <b>${esc(mname)}</b>${names.length ? ": " + esc(names.join(", ")) : ""}`;
      const sc = myScore(), pend = outbox.length;
      strip.querySelector(".lh-score").innerHTML = `✔ ${sc.done}/${sc.total} bài` + (cache.live.showScore !== false ? ` · 🏅 <b>${fmt1(sc.score)}</b>/10` : "") + (pend ? ` · ⏳ đang gửi ${pend}` : "");
    }
    function updateClock() {
      if (!clockEl || !clockEl.isConnected) clockEl = topClock();
      if (!clockEl) return;
      const { i, a } = curAct(), aid = aidOf(a, i);
      paintClock(clockEl, aid ? C.actClock(cache.live, aid, now()) : null); // cả khi HS tự làm (đồng hồ chung chỉ báo giờ)
    }
    function showPause(on) {
      if (on && !pauseEl) { pauseEl = el("div", "lh-pause", `<div><div class="lh-big">📢</div><h2>Cả lớp tạm dừng</h2><p>Hãy nhìn lên bảng và lắng nghe thầy/cô nhé!</p></div>`); document.body.appendChild(pauseEl); }
      else if (!on && pauseEl) { pauseEl.remove(); pauseEl = null; }
    }
    function overlay(html) { const o = el("div", "lh-pause lh-end", `<div>${html}</div>`); document.body.appendChild(o); return o; }
    function stop() { stopped = true; unsubs.forEach((u) => u()); }
    function ended() {
      if (stopped) return; stop();
      const sc = myScore();
      overlay(`<div class="lh-big">🎉</div><h2>Tiết học đã kết thúc</h2><p>Nhóm em đã làm <b>${sc.done}/${sc.total}</b> bài` + (cache.live.showScore !== false ? ` · Điểm: <b>${fmt1(C.scoreGroup({ live: {}, answers: { [gid]: cache.answers }, grading: { [gid]: cache.grading } }, gid, items()).score)}/10</b>` : "") + `</p><p>Cảm ơn các em! 👏</p>`);
      LS.del("lh_auth");
    }
    // CỔ VŨ khi GV công bố kết quả: nhóm đúng hết -> chúc mừng toàn màn hình + pháo hoa;
    // đúng một phần / chưa đúng -> lời động viên. Chỉ hình ảnh (âm thanh phát trên màn chiếu).
    function cheer(aid) {
      const its = items().items.filter((it) => it.aid === aid); if (!its.length) return;
      let good = 0, done = 0;
      its.forEach((it) => { const r = rec2(cache.answers, it.key); if (r) { done++; good += C.judge(it, r).fraction; } });
      const pct = good / its.length, g = cache.group, nm = esc((g && (g.name || (cache.machines[g.machine] || {}).name)) || "Nhóm em");
      const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
      let kind, emoji, title, sub;
      if (!done) { kind = "miss"; emoji = "⏳"; title = "Lần sau nhớ làm kịp giờ nhé!"; sub = "Cùng xem đáp án và giải thích với cả lớp."; }
      else if (pct >= 0.999) { kind = "win"; emoji = pick(["🏆", "🌟", "🥇", "🎉"]); title = pick(["Xuất sắc!", "Tuyệt vời!", "Chính xác 100%!", "Quá đỉnh!", "Hoàn hảo!"]); sub = `<b>${nm}</b> làm đúng hoàn toàn — cả lớp vỗ tay nào! 👏`; }
      else if (pct >= 0.5) { kind = "good"; emoji = pick(["👏", "💫", "👍"]); title = pick(["Giỏi lắm!", "Làm tốt lắm!", "Sắp hoàn hảo rồi!"]); sub = `${nm} đúng <b>${Math.round(pct * 100)}%</b> — xem lại phần sai để lần sau đúng hết nhé!`; }
      else { kind = "try"; emoji = "💪"; title = pick(["Cố lên nào!", "Không sao, mình học tiếp nhé!"]); sub = "Xem kĩ giải thích — lần sau nhóm em sẽ làm đúng!"; }
      const old = document.querySelector(".lh-cheer"); if (old) old.remove();
      const ov = el("div", "lh-cheer " + kind, `<div class="lh-cheer-card"><div class="lh-cheer-emoji">${emoji}</div><h2>${title}</h2><p>${sub}</p>${kind === "win" ? '<div class="lh-cheer-stars">⭐ ⭐ ⭐</div>' : ""}</div>`);
      const n = kind === "win" ? 90 : kind === "good" ? 28 : 0, colors = ["#ef4444", "#f59e0b", "#10b981", "#3b82f6", "#ec4899", "#a855f7", "#facc15"];
      for (let i = 0; i < n; i++) { const p = el("i", "lh-cf"); p.style.left = Math.random() * 100 + "%"; p.style.background = colors[i % colors.length]; p.style.animationDelay = (Math.random() * 0.9).toFixed(2) + "s"; p.style.animationDuration = (2.2 + Math.random() * 1.8).toFixed(2) + "s"; p.style.setProperty("--rx", (Math.random() * 720 - 360).toFixed(0) + "deg"); ov.appendChild(p); }
      ov.onclick = () => ov.remove(); document.body.appendChild(ov);
      setTimeout(() => ov.remove(), kind === "win" ? 4500 : 3200);
    }
    function goneAway(msg) { if (stopped) return; stop(); LS.del("lh_auth"); overlay(`<div class="lh-big">🔁</div><h2>${esc(msg)}</h2><p><a class="lh-btn" href="/">Chọn lại để vào lớp →</a></p>`); }

    onReady(() => {
      document.body.classList.add("lh-student");
      buildStrip(); updateStrip();
      applyLive(cache.live);
      if (!window.DB) return setNet(false);
      DB.onConn((on) => { setNet(on); if (on) { flush(); beat(); } });
      DB.ready.then(() => DB.student()).then(() => {
        unsubs.push(DB.on(base + "/meta", (m) => { if (m && m.status !== "open") ended(); }));
        unsubs.push(DB.on(base + "/live", (l, err) => { if (!err) applyLive(l || {}); }));
        unsubs.push(DB.on(`${base}/groups/${gid}`, (g, err) => { if (err || !g) return goneAway("Nhóm của em không còn trong tiết học (thầy/cô đã xóa nhóm hoặc máy đã đổi phiên đăng nhập)."); cache.group = g; persist(); updateStrip(); }));
        unsubs.push(DB.on(`${base}/answers/${gid}`, (v, err) => { if (!err) mergeAnswers(v); }));
        unsubs.push(DB.on(`${base}/texts/${gid}`, (v, err) => { if (!err) { cache.texts = Object.assign({}, cache.texts, v || {}); persist(); } }));
        unsubs.push(DB.on(`${base}/grading/${gid}`, (v, err) => { if (!err) { cache.grading = v || {}; persist(); updateStrip(); } }));
        DB.get(base + "/roster").then((r) => { cache.roster = r || {}; persist(); updateStrip(); }).catch(() => {});
        DB.get(base + "/machines").then((r) => { cache.machines = r || {}; persist(); updateStrip(); }).catch(() => {});
        flush(); beat();
      }).catch((e) => { setNet(false); console.warn(e); });
    });
  }

  // ============================== MÀN TRÌNH CHIẾU (GV) ==============================
  function projector() {
    let nav = { idx: -1, qi: 0 }, sid = null, sess = null, info = null, unsub = null, panel = null, open = LS.get("lh_panel_open", true), lastSt = null;
    const items = () => info || (window.LESSON ? (info = C.lessonItems(window.LESSON)) : { items: [] });
    const mine = () => sess && sess.meta && sess.meta.lessonId === lessonId && sess.meta.status === "open";
    window.LESSON_HOOKS = {
      role: "projector",
      onNavigate(d) {
        const moved = d.idx !== nav.idx; nav = d;
        if (moved && mine() && (sess.live || {}).teacherIdx !== d.idx && window.DB) DB.set(`sessions/${sid}/live/teacherIdx`, d.idx).catch(() => {});
        draw();
      },
      // ⏱️ trên bài giảng = ĐỒNG HỒ CHUNG của lớp (cùng bảng 📊 và bảng GV) khi đang nối tiết học của bài này
      timer: {
        state() { const c = ctx(); if (!c) return null; return Object.assign(C.actClock(c.live, c.aid, DB.now()), { follow: !!c.live.follow, hasItems: c.hasItems }); },
        act(action, sec) { const c = ctx(); if (!c) return Promise.resolve(); return C.actControl(DB, sid, c.live, c.aid, action, sec != null ? sec : c.a.time || 60); },
      },
      classMode: () => !!(sess && mine()),
      // Bài dạng chữ các nhóm đã gửi (sơ đồ tư duy, phiếu tự đánh giá) -> [{ name, text, at }]; null nếu chưa nối tiết học
      groupTexts(key) {
        if (!sess || !mine()) return null;
        const [a, i] = C.splitKey(key);
        return Object.entries(sess.groups || {}).map(([id, g]) => ({ name: C.groupName(sess, id), ord: ((sess.machines || {})[g.machine] || {}).order || 0, t: (((sess.texts || {})[id] || {})[a] || {})[i] }))
          .filter((x) => x.t && x.t.text).sort((x, y) => x.ord - y.ord).map((x) => ({ name: x.name, text: x.t.text, at: x.t.at }));
      },
      // "Làm lại hoạt động" (chế độ GV): xóa kết quả hoạt động này của MỌI nhóm + đặt lại đồng hồ
      resetActivity(aid) {
        if (!sess || !mine()) return Promise.resolve();
        const up = { [`live/acts/${aid}`]: null }; Object.keys(sess.groups || {}).forEach((g) => { up[`answers/${g}/${aid}`] = null; });
        return DB.update("sessions/" + sid, up);
      },
    };
    function ctx() {
      if (!sess || !mine() || !window.DB || !window.LESSON) return null;
      const a = window.LESSON.activities[nav.idx]; if (!a) return null;
      const aid = aidOf(a, nav.idx);
      return { a, aid, live: sess.live || {}, hasItems: items().items.some((it) => it.aid === aid) };
    }
    const clockTxt = (k, a) => (k.st === "revealed" ? "🏁" : k.st === "locked" || k.over ? "⏰ 0:00" : "⏱ " + C.fmtClock(k.running ? k.left : k.left || (a && a.time) || 60));
    let lastAid = null;
    function draw() {
      if (!panel) return;
      const body = panel.querySelector(".lh-pp-body"), head = panel.querySelector(".lh-pp-head span");
      panel.classList.toggle("closed", !open);
      panel.querySelector(".lh-pp-code").textContent = mine() && sess.meta.code ? "🔑 " + sess.meta.code : "";
      if (!sess) { head.textContent = "📡 Chưa kết nối tiết học"; body.innerHTML = `<p class="lh-pp-hint">Mở <b>/giao-vien</b>, đăng nhập và bắt đầu tiết học với bài này.</p>`; return; }
      if (!mine()) { head.textContent = "📡 Tiết đang mở là bài khác"; body.innerHTML = `<p class="lh-pp-hint">Tiết đang mở: ${esc(sess.meta.lessonTitle)}</p>`; return; }
      const L = window.LESSON, a = L.activities[nav.idx], aid = aidOf(a, nav.idx);
      const groups = Object.entries(sess.groups || {}).map(([id, g]) => ({ id, ...g, nm: C.groupName(sess, id), ord: ((sess.machines || {})[g.machine] || {}).order || 0 })).sort((x, y) => x.ord - y.ord);
      const its = aid ? items().items.filter((it) => it.aid === aid) : [];
      if (!its.length) { lastSt = aid ? C.actState(sess.live || {}, aid, DB.now()) : null; lastAid = aid; head.textContent = `📡 ${groups.length} nhóm đã vào lớp`; body.innerHTML = `<p class="lh-pp-hint">${a ? "Hoạt động này không có bài tập chấm điểm." : "Chọn một hoạt động để xem kết quả của lớp."}</p>`; return; }
      const it = its.find((x) => x.iid === "q" + nav.qi || x.iid === "c" + nav.qi) || its[0];
      const live = sess.live || {}, k = C.actClock(live, aid, DB.now()), st = k.st, follow = !!live.follow;
      if (st === "revealed" && lastSt && lastSt !== "revealed" && lastAid === aid) honor(a, aid, groups); // vừa bấm Kết thúc
      lastSt = st; lastAid = aid;
      const qn = its.length > 1 ? ` · Câu ${its.indexOf(it) + 1}/${its.length}` : "";
      const badge = { free: "HS tự làm", open: "Đang làm bài", locked: "Hết giờ", revealed: "Đã công bố" }[st];
      head.innerHTML = `📊 Kết quả lớp${qn} <em class="lh-st ${st}">${badge}</em>`;
      const recs = groups.map((g) => ({ g, r: C.answerOf(sess, g.id, it) }));
      const done = recs.filter((x) => x.r), none = recs.filter((x) => !x.r);
      let html = "";
      // cùng một đồng hồ với ⏱️ trên bài giảng và bảng GV
      html += `<div class="lh-pp-timer"><span class="lh-pp-clock ${k.over ? "locked" : st}${k.running && k.left <= 10 ? " hurry" : ""}">${clockTxt(k, a)}</span>`;
      if (st === "revealed") html += `<button data-act="reopen" title="Cho làm lại hoạt động này">↺ Mở lại</button>`;
      else html += (k.running ? `<button data-act="pause">⏸</button>` : st !== "locked" && !k.over ? `<button data-act="start" class="prim">▶ Bấm giờ</button>` : "") + (st !== "locked" && !k.over ? `<button data-act="add" data-sec="-30">−30s</button><button data-act="add" data-sec="30">+30s</button>` : `<button data-act="reset" title="Đặt lại đồng hồ">↺</button>`) + (follow ? `<button data-act="end" class="end">🏁 Kết thúc</button>` : "");
      html += `</div>`;
      if (!follow) html += `<p class="lh-pp-hint">HS tự làm: đồng hồ hiện trên máy HS, hết giờ chỉ báo. Bật <b>👣 theo nhịp GV</b> để khóa khi hết giờ và công bố kết quả cùng lúc.</p>`;
      const show = st === "revealed";
      if (it.q && (it.q.type === "sheet" || it.q.type === "short")) { // bảng tính / trả lời ngắn: các câu trả lời nhiều nhất
        const max = Math.max(1, groups.length), dist = C.choiceDist(done.map((x) => x.r.choice), it.q.answer, 4, it.q.mode === "formula" || it.q.type === "short" ? (k) => C.judgeQuestion(it.q, k) : null, it.q.type === "short" ? C.normShort : null);
        html += `<div class="lh-pp-bars">` + dist.map((d) => `<div class="lh-bar ${show && d.right ? "right" : ""}"><b>📍</b><span class="t">${esc(d.label)}</span><span class="b"><i style="width:${d.n / max * 100}%"></i></span><span class="n">${d.n}</span></div>`).join("")
          + `<div class="lh-bar none"><b>–</b><span class="t">Chưa làm</span><span class="b"><i style="width:${none.length / max * 100}%"></i></span><span class="n">${none.length}</span></div></div>`;
      } else if (it.q) {
        const q = it.q, opts = q.type === "true-false" ? ["Đúng", "Sai"] : q.options || [];
        const has = (r, k2) => { const c = r.choice; if (q.type === "true-false") return c === (k2 === 0); if (q.type === "multiple-select") return Array.isArray(c) && c.map(Number).includes(k2); return c === k2; };
        const right = (k2) => q.type === "true-false" ? (k2 === 0) === q.answer : q.type === "multiple-select" ? (q.answer || []).includes(k2) : k2 === q.answer;
        const max = Math.max(1, groups.length);
        html += `<div class="lh-pp-bars">` + opts.map((o, k2) => { const n = done.filter((x) => has(x.r, k2)).length; return `<div class="lh-bar ${show && right(k2) ? "right" : ""}"><b>${"ABCDEF"[k2]}</b><span class="t" title="${esc(o)}">${esc(o)}</span><span class="b"><i style="width:${n / max * 100}%"></i></span><span class="n">${n}</span></div>`; }).join("")
          + `<div class="lh-bar none"><b>–</b><span class="t">Chưa làm</span><span class="b"><i style="width:${none.length / max * 100}%"></i></span><span class="n">${none.length}</span></div></div>`;
      } else html += `<div class="lh-pp-bars"><div class="lh-bar"><b>📤</b><span class="t">Đã nộp</span><span class="b"><i style="width:${done.length / Math.max(1, groups.length) * 100}%"></i></span><span class="n">${done.length}</span></div><div class="lh-bar none"><b>–</b><span class="t">Chưa làm</span><span class="b"><i style="width:${none.length / Math.max(1, groups.length) * 100}%"></i></span><span class="n">${none.length}</span></div></div>`;
      if (show) {
        const good = done.filter((x) => C.judge(it, x.r).ok), bad = done.filter((x) => !C.judge(it, x.r).ok);
        const list = (arr, fn) => arr.map((x) => `<span>${esc(x.g.nm)}${fn ? fn(x) : ""}</span>`).join("") || "<em>—</em>";
        html += `<div class="lh-pp-lists"><div class="ok"><h4>✅ Đúng (${good.length})</h4>${list(good)}</div><div class="no"><h4>❌ ${it.q ? "Sai" : "Có mục sai"} (${bad.length})</h4>${list(bad, it.q ? null : (x) => ` ${Math.round(C.judge(it, x.r).fraction * 100)}%`)}</div><div class="none"><h4>⏳ Chưa làm (${none.length})</h4>${list(none)}</div></div>`;
      }
      body.innerHTML = html;
      body.querySelectorAll("[data-act]").forEach((b) => { b.onclick = () => C.actControl(DB, sid, live, aid, b.dataset.act, b.dataset.act === "add" ? +b.dataset.sec : (a.time || 60)).catch((e) => alert(e.message)); });
    }
    onReady(() => {
      document.body.classList.add("lh-projector");
      panel = el("div", "lh-proj-panel", `<div class="lh-pp-head"><span>📡 Đang kết nối…</span><b class="lh-pp-code" title="Mã vào lớp — HS mở web và nhập mã này"></b><button class="lh-pp-qr" title="Hiện mã vào lớp + QR">QR</button><button class="lh-pp-tg" title="Thu gọn / mở rộng">▾</button></div><div class="lh-pp-body"></div>`);
      document.body.appendChild(panel);
      panel.querySelector(".lh-pp-tg").onclick = () => { open = !open; LS.set("lh_panel_open", open); draw(); };
      panel.querySelector(".lh-pp-qr").onclick = showQR;
      if (!window.DB) return;
      DB.ready.then(() => DB.teacher.status()).then((s) => {
        if (!s.ok) { panel.querySelector(".lh-pp-head span").textContent = "🔒 Chưa đăng nhập giáo viên"; panel.querySelector(".lh-pp-body").innerHTML = `<p class="lh-pp-hint">Mở trang <a href="/giao-vien" target="_blank">/giao-vien</a> trên máy này để đăng nhập, rồi tải lại trang.</p>`; return; }
        DB.on("public/active", (id) => {
          if (id === sid) return; sid = id; sess = null; if (unsub) unsub(); unsub = null;
          if (!sid) return draw();
          let lastTI;
          unsub = DB.on("sessions/" + sid, (v) => {
            sess = v; draw();
            if (!mine()) return;
            const ti = (sess.live || {}).teacherIdx;
            if (lastTI === undefined && typeof ti !== "number") DB.set(`sessions/${sid}/live/teacherIdx`, nav.idx).catch(() => {});
            else if (ti !== lastTI && ti !== nav.idx && window.LessonApp) window.LessonApp.go(ti); // GV đổi hoạt động trên bảng điều khiển
            lastTI = ti;
          });
        });
      });
      // mỗi 0,5s: chỉ cập nhật chữ đồng hồ; đổi trạng thái (hết giờ) mới vẽ lại cả bảng
      setInterval(() => {
        const a = window.LESSON && window.LESSON.activities[nav.idx], aid = aidOf(a, nav.idx), ok = !!(sess && mine() && aid);
        const k = ok ? C.actClock(sess.live || {}, aid, DB.now()) : null;
        paintClock(topClock(), k); // cả lớp nhìn đồng hồ trên thanh tiêu đề
        if (!ok) return;
        if (k.st !== lastSt || (k.over && panel.querySelector(".lh-pp-clock") && !panel.querySelector(".lh-pp-clock.locked"))) return draw();
        if (!open) return;
        const c = panel.querySelector(".lh-pp-clock");
        if (c && k.running) { c.textContent = clockTxt(k, a); c.classList.toggle("hurry", k.left <= 10); }
      }, 500);
      const s = el("script"); s.src = "/static/qr.js"; document.head.appendChild(s);
    });
    // BẢNG VINH DANH khi GV bấm Kết thúc: các nhóm đúng hoàn toàn (pháo giấy + kèn chiến thắng theo nút 🔊)
    function honor(a, aid, groups) {
      const its = items().items.filter((x) => x.aid === aid);
      const res = groups.map((g) => { let good = 0, done = 0; its.forEach((it) => { const r = C.answerOf(sess, g.id, it); if (r) { done++; good += C.judge(it, r).fraction; } }); return { g, done, pct: its.length ? good / its.length : 0 }; });
      const win = res.filter((x) => x.done && x.pct >= 0.999), near = res.filter((x) => x.done && x.pct >= 0.5 && x.pct < 0.999).sort((x, y) => y.pct - x.pct).slice(0, 8);
      const old = document.querySelector(".lh-honor"); if (old) old.remove();
      const badges = win.map((x, i) => `<span class="lh-hb" style="animation-delay:${(0.25 + i * 0.12).toFixed(2)}s">🏅 ${esc(x.g.nm)}</span>`).join("");
      const ov = el("div", "lh-honor", `<div class="lh-honor-card"><div class="lh-honor-trophy">${win.length ? "🏆" : "💪"}</div><h2>${win.length ? "BẢNG VINH DANH" : "Cùng cố gắng nhé!"}</h2><p class="lh-honor-act">${esc(a.name)}</p>`
        + (win.length ? `<p class="lh-honor-sub">${win.length} nhóm làm đúng hoàn toàn — xin chúc mừng! 👏</p><div class="lh-hbs">${badges}</div>` : `<p class="lh-honor-sub">Chưa nhóm nào đúng hoàn toàn — cùng xem đáp án và giải thích nhé!</p>`)
        + (near.length ? `<p class="lh-honor-near">👍 Đáng khen: ${near.map((x) => `${esc(x.g.nm)} (${Math.round(x.pct * 100)}%)`).join(" · ")}</p>` : "") + `<p class="lh-honor-hint">Bấm để đóng</p></div>`);
      ov.onclick = () => ov.remove(); document.body.appendChild(ov);
      setTimeout(() => ov.remove(), 8000);
      const app = window.LessonApp;
      if (win.length && app) { if (app.fanfare) app.fanfare(); if (app.celebrate) [0, 500, 1100].forEach((t) => setTimeout(app.celebrate, t)); }
    }
    function showQR() {
      if (!window.QR) return;
      const code = sess && mine() ? sess.meta.code : null, u = location.origin + "/";
      const go = (base) => {
        const url = base + (code ? "?c=" + code : "");
        const ov = el("div", "lh-qr-overlay", `<div class="lh-qr-box">${code ? `<div class="lh-qr-code"><small>Mã vào lớp</small>${esc(code)}</div>` : ""}${QR.svg(url)}<div class="lh-qr-url">${esc(base.replace(/^https?:\/\//, "").replace(/\/$/, ""))}</div><div>${code ? "Quét mã QR, hoặc mở địa chỉ trên rồi nhập <b>mã vào lớp</b>" : "Quét mã hoặc gõ địa chỉ trên để vào lớp"}</div></div>`);
        ov.onclick = () => ov.remove(); document.body.appendChild(ov);
      };
      if (DB.mode === "lan") DB.teacher.status().then((s) => go(((s.info.urls || [])[0] || {}).url || u)); else go(u);
    }
  }
})();
