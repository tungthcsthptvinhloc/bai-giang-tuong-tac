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
      if ((aid && st !== lastSt && lastSt !== null) || modelChanged || !!prev.follow !== !!cache.live.follow) app.rerender();
      lastSt = st; updateStrip();
    }
    // Đồng hồ: đếm ngược trên dải thông tin; hết giờ -> vẽ lại (khóa bài)
    setInterval(() => {
      if (stopped) return;
      const { i, a } = curAct(), aid = aidOf(a, i);
      const st = aid ? C.actState(cache.live, aid, now()) : null;
      if (aid && lastSt !== null && st !== lastSt && window.LessonApp) { lastSt = st; window.LessonApp.rerender(); }
      else lastSt = st;
      updateClock();
    }, 500);
    setInterval(beat, 20000);

    // ---- giao diện: dải thông tin, đồng hồ, tạm dừng, kết thúc ---------------------
    let strip, netDot, clockEl, pauseEl;
    function buildStrip() {
      strip = el("div", "lh-strip", `<span class="lh-net" title="Kết nối máy chủ"></span><span class="lh-group"></span><span class="lh-clock" hidden></span><span class="lh-score"></span><span class="lh-sp"></span><a class="lh-link" href="/?add=1">➕ Thêm bạn</a>`);
      const top = document.querySelector(".topbar");
      if (top) top.insertAdjacentElement("afterend", strip); else document.body.prepend(strip);
      netDot = strip.querySelector(".lh-net"); clockEl = strip.querySelector(".lh-clock");
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
      if (!clockEl) return;
      const { i, a } = curAct(), aid = aidOf(a, i);
      if (!aid || !cache.live.follow) { clockEl.hidden = true; return; }
      const k = C.actClock(cache.live, aid, now());
      clockEl.hidden = !(k.running || k.st === "locked" || k.st === "revealed");
      clockEl.className = "lh-clock " + k.st + (k.running && k.left <= 10 ? " hurry" : "");
      clockEl.textContent = k.st === "revealed" ? "🏁 Đã công bố kết quả" : k.st === "locked" ? "⏰ Hết giờ" : "⏱ " + C.fmtClock(k.left);
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
    };
    function draw() {
      if (!panel) return;
      const body = panel.querySelector(".lh-pp-body"), head = panel.querySelector(".lh-pp-head span");
      panel.classList.toggle("closed", !open);
      if (!sess) { head.textContent = "📡 Chưa kết nối tiết học"; body.innerHTML = `<p class="lh-pp-hint">Mở <b>/giao-vien</b>, đăng nhập và bắt đầu tiết học với bài này.</p>`; return; }
      if (!mine()) { head.textContent = "📡 Tiết đang mở là bài khác"; body.innerHTML = `<p class="lh-pp-hint">Tiết đang mở: ${esc(sess.meta.lessonTitle)}</p>`; return; }
      const L = window.LESSON, a = L.activities[nav.idx], aid = aidOf(a, nav.idx);
      const groups = Object.entries(sess.groups || {}).map(([id, g]) => ({ id, ...g, nm: C.groupName(sess, id), ord: ((sess.machines || {})[g.machine] || {}).order || 0 })).sort((x, y) => x.ord - y.ord);
      const its = aid ? items().items.filter((it) => it.aid === aid) : [];
      if (!its.length) { head.textContent = `📡 ${groups.length} nhóm đã vào lớp`; body.innerHTML = `<p class="lh-pp-hint">${a ? "Hoạt động này không có bài tập chấm điểm." : "Chọn một hoạt động để xem kết quả của lớp."}</p>`; return; }
      const it = its.find((x) => x.iid === "q" + nav.qi || x.iid === "c" + nav.qi) || its[0];
      const live = sess.live || {}, k = C.actClock(live, aid, DB.now()), st = k.st, follow = !!live.follow;
      lastSt = st;
      const qn = its.length > 1 ? ` · Câu ${its.indexOf(it) + 1}/${its.length}` : "";
      const badge = { free: "HS tự làm", open: "Đang làm bài", locked: "Hết giờ", revealed: "Đã công bố" }[st];
      head.innerHTML = `📊 Kết quả lớp${qn} <em class="lh-st ${st}">${badge}</em>`;
      const recs = groups.map((g) => ({ g, r: C.answerOf(sess, g.id, it) }));
      const done = recs.filter((x) => x.r), none = recs.filter((x) => !x.r);
      let html = "";
      if (follow) {
        html += `<div class="lh-pp-timer"><span class="lh-pp-clock ${st}${k.running && k.left <= 10 ? " hurry" : ""}">${st === "revealed" ? "🏁" : st === "locked" ? "⏰ 0:00" : k.running ? "⏱ " + C.fmtClock(k.left) : "⏱ " + C.fmtClock(k.left || a.time || 60)}</span>`;
        if (st === "revealed") html += `<button data-act="reopen" title="Cho làm lại hoạt động này">↺ Mở lại</button>`;
        else html += (k.running ? `<button data-act="pause">⏸</button>` : st === "open" ? `<button data-act="start" class="prim">▶ Bấm giờ</button>` : "") + (st === "open" ? `<button data-act="add" data-sec="-30">−30s</button><button data-act="add" data-sec="30">+30s</button>` : "") + `<button data-act="end" class="end">🏁 Kết thúc</button>`;
        html += `</div>`;
      } else html += `<p class="lh-pp-hint">Bật <b>👣 HS theo nhịp GV</b> ở bảng giáo viên để bấm giờ và công bố kết quả cùng lúc.</p>`;
      const show = st === "revealed";
      if (it.q) {
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
      panel = el("div", "lh-proj-panel", `<div class="lh-pp-head"><span>📡 Đang kết nối…</span><button class="lh-pp-qr" title="Hiện mã QR vào lớp">QR</button><button class="lh-pp-tg" title="Thu gọn / mở rộng">▾</button></div><div class="lh-pp-body"></div>`);
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
        if (!sess || !mine() || !open) return;
        const a = window.LESSON.activities[nav.idx], aid = aidOf(a, nav.idx); if (!aid) return;
        const k = C.actClock(sess.live || {}, aid, DB.now());
        if (k.st !== lastSt) return draw();
        const c = panel.querySelector(".lh-pp-clock");
        if (c && k.running) { c.textContent = "⏱ " + C.fmtClock(k.left); c.classList.toggle("hurry", k.left <= 10); }
      }, 500);
      const s = el("script"); s.src = "/static/qr.js"; document.head.appendChild(s);
    });
    function showQR() {
      if (!window.QR) return;
      const u = location.origin + "/";
      const go = (url) => { const ov = el("div", "lh-qr-overlay", `<div class="lh-qr-box">${QR.svg(url)}<div class="lh-qr-url">${esc(url.replace(/\/$/, ""))}</div><div>Quét mã hoặc gõ địa chỉ trên để vào lớp</div></div>`); ov.onclick = () => ov.remove(); document.body.appendChild(ov); };
      if (DB.mode === "lan") DB.teacher.status().then((s) => go(((s.info.urls || [])[0] || {}).url || u)); else go(u);
    }
  }
})();
