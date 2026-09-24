/* ============================================================================
 * Bảng điều khiển GIÁO VIÊN — dùng chung cho offline (LAN) và online (Firebase).
 * Theo dõi các nhóm làm bài trực tiếp; điều khiển tiết học (theo nhịp, bấm giờ,
 * kết thúc/công bố, tạm dừng); chấm điểm; xuất Excel; quản lí danh sách lớp
 * (nhập/xuất Excel), số máy của phòng; lịch sử các tiết.
 * ==========================================================================*/
(function () {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const C = window.LHCore, esc = C.esc, fmt1 = C.fmt1, KEYS = ["A", "B", "C", "D", "E", "F"];
  const LS = { get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } }, set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} } };
  const pct = (x) => Math.round((x || 0) * 100) + "%";

  let T = {}, activeId = null, sess = null, L = null, info = { items: [], openQs: [] }, manifest = [], lanInfo = null;
  let tab = LS.get("lh_tab", "groups"), actSel = "current", sortBy = LS.get("lh_sort", "join"), clsEdit = null, overlayKind = null;
  let unsubSess = null, loadedLesson = null;

  const toast = (m) => { const t = $("#toast"); t.textContent = m; t.hidden = false; clearTimeout(toast.t); toast.t = setTimeout(() => { t.hidden = true; }, 2600); };
  async function act(p, msg) { try { await p; if (msg) toast(msg); } catch (e) { alert("⚠️ " + (e.message || e)); } }
  const S = (p) => `sessions/${activeId}/${p}`;
  let drawT = null; const schedule = () => { if (!drawT) drawT = setTimeout(() => { drawT = null; renderAll(); }, 120); };

  // ======================== ĐĂNG NHẬP & KẾT NỐI ========================
  $("#modeBadge").textContent = DB.mode === "firebase" ? "🌐 Online" : "🖧 Offline (LAN)";
  DB.onConn((on) => $("#conn").classList.toggle("off", !on));
  DB.ready.then(() => DB.teacher.status()).then((s) => (s.ok ? start(s.info) : showLogin(s))).catch((e) => { document.body.insertAdjacentHTML("beforeend", `<p class="card" style="margin:20px">⚠️ ${esc(e.message || e)}</p>`); });
  function showLogin(s) {
    $("#login").hidden = false; $("#layout").hidden = true;
    $("#loginFields").innerHTML = s.need === "email"
      ? `<label class="f">Email<input type="email" id="lgEmail" value="${esc((s.info && s.info.email) || DB.config.teacherEmail || "")}" required></label><label class="f">Mật khẩu<input type="password" id="lgPass" required></label>`
      : `<p class="hint">Bạn đang mở bảng điều khiển từ máy khác. Nhập <b>mã giáo viên</b> hiện trong cửa sổ máy chủ trên máy giáo viên.</p><label class="f">Mã giáo viên<input type="text" id="lgKey" inputmode="numeric" required></label>`;
    $("#loginForm").onsubmit = async (e) => {
      e.preventDefault(); $("#loginErr").hidden = true;
      try { await (s.need === "email" ? DB.teacher.login($("#lgEmail").value, $("#lgPass").value) : DB.teacher.login($("#lgKey").value)); location.reload(); }
      catch (err) { $("#loginErr").textContent = err.message; $("#loginErr").hidden = false; }
    };
  }
  function start(inf) {
    lanInfo = DB.mode === "lan" ? inf : null;
    $("#login").hidden = true; $("#layout").hidden = false;
    $("#btnLogout").hidden = DB.mode !== "firebase" && !(LS.get("lh_teacher_key", null));
    $("#btnLogout").onclick = () => DB.teacher.logout().then(() => location.reload());
    C.loadManifest().then((m) => { manifest = m; schedule(); }).catch(() => toast("Không tải được danh mục bài giảng (lessons/index.json)"));
    DB.on("teacher", (v, err) => { if (err) return toast("Không đọc được dữ liệu giáo viên: " + err.message); T = v || {}; schedule(); });
    DB.on("public/active", (id) => {
      if (id === activeId) return;
      activeId = id || null; sess = null; if (unsubSess) unsubSess(); unsubSess = null;
      if (activeId) unsubSess = DB.on("sessions/" + activeId, (v) => { sess = v; ensureLesson(); schedule(); });
      schedule();
    });
  }
  function ensureLesson() {
    const id = sess && sess.meta && sess.meta.lessonId;
    if (!id || id === loadedLesson) return;
    loadedLesson = id; L = null; info = { items: [], openQs: [] };
    C.loadLesson(id).then((x) => { if (loadedLesson !== id) return; L = x; info = C.lessonItems(L); schedule(); }).catch((e) => toast(e.message));
  }
  const cfg = () => Object.assign({ machines: 30, phones: 0 }, T.config || {});

  // ======================== CỘT TRÁI ========================
  function joinUrl() { return DB.mode === "lan" ? (((lanInfo && lanInfo.urls) || [])[0] || {}).url || location.origin + "/" : location.origin + "/"; }
  function renderSide() {
    const u = joinUrl();
    if ($("#joinUrl").dataset.u !== u) { $("#qr").innerHTML = QR.svg(u); $("#joinUrl").textContent = u.replace(/^https?:\/\//, "").replace(/\/$/, ""); $("#joinUrl").dataset.u = u; }
    const urls = (lanInfo && lanInfo.urls) || [];
    $("#otherUrls").innerHTML = DB.mode === "lan" ? (urls.length > 1 ? "Địa chỉ khác: " + urls.slice(1).map((x) => esc(x.url)).join(", ") : urls.length ? "" : "⚠️ Máy chưa kết nối mạng LAN/Wi-Fi") : "";
    $("#sideHint").innerHTML = DB.mode === "lan" ? `Máy HS / điện thoại phải cùng mạng với máy này.${lanInfo && lanInfo.key ? `<br>Mã giáo viên: <b>${esc(lanInfo.key)}</b> (mở bảng này từ máy khác)` : ""}` : "Học sinh chỉ cần Internet. Mở trang chiếu bài bằng nút 📺 bên cạnh.";
    const m = sess && sess.meta;
    $("#sessInfo").textContent = m ? `Lớp ${m.className} · ${m.lessonTitle}` : "Chưa bắt đầu tiết học";
    document.title = m ? `${m.className} · ${m.lessonTitle} — Bảng GV` : "Bảng điều khiển giáo viên";
  }
  $("#btnQrBig").onclick = () => showQR();

  // ======================== KHU CHÍNH ========================
  const TABS = [
    { id: "groups", label: "💻 Nhóm", need: true }, { id: "questions", label: "📊 Theo câu hỏi", need: true },
    { id: "texts", label: "✍️ Tự luận", need: true }, { id: "students", label: "🧑‍🎓 Học sinh", need: true },
    { id: "grading", label: "⚙️ Tính điểm", need: true }, { id: "classes", label: "📋 Danh sách lớp" }, { id: "history", label: "🕘 Lịch sử" },
  ];
  const hasSess = () => !!(sess && sess.meta && sess.meta.status === "open");
  function renderAll() {
    renderSide();
    const main = $("#main"), s = hasSess();
    if (!s && TABS.find((t) => t.id === tab && t.need)) tab = "classes";
    const groups = s ? Object.keys(sess.groups || {}).length : 0;
    const counts = s ? { groups, texts: Object.values(sess.texts || {}).reduce((t, g) => t + Object.values(g || {}).reduce((u, a) => u + Object.keys(a || {}).length, 0), 0), students: Object.keys(sess.roster || {}).filter((x) => !((sess.claims || {}).students || {})[x]).length || "" } : {};
    const head = s ? sessionCard() : startCard();
    const tabs = `<nav class="tabs">${TABS.filter((t) => !t.need || s).map((t) => `<button data-tab="${t.id}" class="${t.id === tab ? "on" : ""}">${t.label}${counts[t.id] ? `<span class="cnt">${counts[t.id]}</span>` : ""}</button>`).join("")}</nav>`;
    if (!$("#headBox")) main.innerHTML = `<div id="headBox"></div><div id="tabsBox"></div><div id="tabBody"></div>`;
    const ae = document.activeElement, typingHead = ae && $("#headBox").contains(ae) && /INPUT|SELECT|TEXTAREA/.test(ae.tagName);
    if (!typingHead) { $("#headBox").innerHTML = head; bindHead(); }
    $("#tabsBox").innerHTML = tabs;
    document.querySelectorAll("[data-tab]").forEach((b) => { b.onclick = () => { tab = b.dataset.tab; LS.set("lh_tab", tab); $("#tabBody").innerHTML = ""; renderAll(); }; });
    const body = $("#tabBody");
    if (ae && body.contains(ae) && /INPUT|TEXTAREA|SELECT/.test(ae.tagName) && ae.type !== "checkbox") return; // đang gõ -> không vẽ lại
    ({ groups: tabGroups, questions: tabQuestions, texts: tabTexts, students: tabStudents, grading: tabGrading, classes: tabClasses, history: tabHistory }[tab] || tabClasses)(body);
    if (overlayKind === "board") showBoard();
  }

  // ---- bắt đầu tiết ----
  function startCard() {
    const groups = {}, last = LS.get("lh_last", {}), c = cfg();
    manifest.forEach((l) => { const g = /^tin\d+/.test(l.id) ? "Tin học " + l.id.match(/^tin(\d+)/)[1] : l.grade ? "Lớp " + l.grade : "Khác"; (groups[g] = groups[g] || []).push(l); });
    const classes = Object.entries(T.classes || {}).sort((a, b) => String(a[1].name).localeCompare(String(b[1].name), "vi", { numeric: true }));
    return `<div class="card"><h2>▶️ Bắt đầu tiết học</h2>
      ${classes.length ? "" : `<p class="hint">⚠️ Chưa có danh sách lớp — mở tab <b>📋 Danh sách lớp</b> để nhập từ Excel.</p>`}
      <div class="form">
        <label class="f">Lớp<select id="selClass">${classes.map(([id, x]) => `<option value="${esc(id)}" ${id === last.classId ? "selected" : ""}>${esc(x.name)} (${Object.keys(x.students || {}).length} HS)</option>`).join("")}</select></label>
        <label class="f">Bài giảng<select id="selLesson">${Object.entries(groups).map(([g, ls]) => `<optgroup label="${esc(g)}">${ls.map((l) => `<option value="${esc(l.id)}" ${l.id === last.lessonId ? "selected" : ""}>${esc(l.title)} — ${l.items} bài chấm${l.open ? ", " + l.open + " tự luận" : ""}</option>`).join("")}</optgroup>`).join("")}</select></label>
        <button class="btn big" id="btnStart" ${classes.length && manifest.length ? "" : "disabled"}>▶ Bắt đầu</button>
      </div>
      <div class="room"><b>🖥️ Phòng máy:</b>
        <label>Số máy tính <input type="number" id="cfgM" min="0" max="99" value="${c.machines}"></label>
        <label>Số điện thoại <input type="number" id="cfgP" min="0" max="99" value="${c.phones}"></label>
        <span class="hint">HS chọn đúng 1 máy khi vào lớp (Máy 01…${C.pad2(c.machines)}${c.phones ? `, Điện thoại 01…${C.pad2(c.phones)}` : ""}); mỗi máy chỉ 1 nhóm.</span></div>
      <p class="hint">Mỗi câu chỉ tính <b>lần làm đầu tiên</b> khi HS tự làm; khi bật <b>👣 theo nhịp GV</b>, HS được đổi đáp án đến khi thầy/cô bấm <b>🏁 Kết thúc</b>.</p></div>`;
  }
  async function startSession(classId, lessonId) {
    const cls = (T.classes || {})[classId]; if (!cls) throw new Error("Chưa chọn lớp");
    const Ls = await C.loadLesson(lessonId), c = cfg(), now = DB.now(), d = new Date(now);
    const id = `${d.getFullYear()}${C.pad2(d.getMonth() + 1)}${C.pad2(d.getDate())}-${C.pad2(d.getHours())}${C.pad2(d.getMinutes())}-${C.rid(4)}`;
    const meta = { lessonId, lessonTitle: (Ls.meta && Ls.meta.title) || lessonId, classId, className: cls.name, createdAt: now, status: "open" };
    const roster = {}; C.sortedEntries(cls.students).forEach(([sid, x], i) => { roster[sid] = { name: x.name, order: i + 1 }; });
    const up = { [`sessions/${id}`]: { meta, roster, machines: C.machineList(c.machines, c.phones), live: { follow: false, paused: false, showModel: false, showScore: true, teacherIdx: -1 } }, [`teacher/sessions/${id}`]: meta, "public/active": id };
    if (activeId) { up[`sessions/${activeId}/meta/status`] = "ended"; up[`teacher/sessions/${activeId}/status`] = "ended"; }
    await DB.update("", up);
  }

  // ---- thanh điều khiển tiết đang diễn ra ----
  function sessionCard() {
    const live = sess.live || {}, groups = Object.keys(sess.groups || {}), cs = (sess.claims || {}).students || {};
    const joined = Object.keys(sess.roster || {}).filter((s) => cs[s]).length, online = groups.filter(isOnline).length;
    const scores = groups.map((g) => C.scoreGroup(sess, g, info).score), avg = scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
    const acts = L ? L.activities : [], ti = typeof live.teacherIdx === "number" ? live.teacherIdx : -1, cur = acts[ti], aid = cur ? cur.id || "a" + ti : null;
    const hasItems = aid && info.items.some((it) => it.aid === aid);
    let actRow = "";
    if (live.follow) {
      const k = aid ? C.actClock(live, aid, DB.now()) : null;
      actRow = `<div class="follow-row">👣 HS đang ở: <select id="selIdx"><option value="-1">🏠 Trang đầu</option>${acts.map((a, i) => `<option value="${i}" ${i === ti ? "selected" : ""}>${i + 1}. ${esc(a.name)}</option>`).join("")}</select>
        <button class="btn small ghost" id="idxPrev">◀</button><button class="btn small" id="idxNext">Tiếp ▶</button>
        ${hasItems ? `<span class="actctl"><span class="clock ${k.st}" id="actClock">${clockText(k, cur)}</span>
          ${k.st === "revealed" ? `<button class="btn small ghost" data-act="reopen">↺ Mở lại</button>` : `${k.running ? `<button class="btn small ghost" data-act="pause">⏸ Dừng giờ</button>` : k.st === "open" ? `<button class="btn small" data-act="start">▶ Bấm giờ</button>` : ""}
          ${k.st === "open" ? `<button class="btn small ghost" data-act="add" data-sec="-30">−30s</button><button class="btn small ghost" data-act="add" data-sec="30">+30s</button>` : ""}
          <button class="btn small ok" data-act="end">🏁 Kết thúc & công bố</button>`}</span>` : `<span class="hint">Hoạt động này không có bài chấm.</span>`}</div>`;
    }
    return `<div class="card">
      <div class="ctrl">
        <a class="btn" href="/lessons/${encodeURIComponent(sess.meta.lessonId)}/?gv=1" target="_blank">📺 Mở bài giảng để trình chiếu</a>
        <button class="tg ${live.follow ? "on" : ""}" data-set="follow" title="HS làm theo hoạt động GV đang chiếu; đúng/sai công bố khi GV bấm Kết thúc">👣 HS theo nhịp GV</button>
        <button class="tg warn ${live.paused ? "on" : ""}" data-set="paused" title="Che màn hình tất cả HS">⏸ Tạm dừng cả lớp</button>
        <button class="tg ${live.showModel ? "on" : ""}" data-set="showModel" title="HS bấm xem được hướng trả lời câu vận dụng/tình huống">💡 HS xem hướng trả lời</button>
        <button class="tg ${live.showScore !== false ? "on" : ""}" data-set="showScore">🏅 HS thấy điểm</button>
        <span class="sp"></span>
        <button class="btn ghost" id="btnBoard">🏆 Xếp hạng</button>
        <button class="btn ghost" id="btnExport">⬇️ Xuất Excel</button>
        <button class="btn danger" id="btnEnd">⏹ Kết thúc tiết</button>
      </div>${actRow}
      <div class="stats"><span>💻 <b>${groups.length}</b> nhóm</span><span>🧑‍🎓 <b>${joined}/${Object.keys(sess.roster || {}).length}</b> HS đã vào</span>
        <span>🟢 <b>${online}</b> nhóm đang kết nối</span><span>📝 <b>${info.items.filter((it) => !(live.excluded || {})[it.aid]).length}</b> bài tính điểm</span><span>📈 Điểm TB: <b>${fmt1(avg)}</b></span></div></div>`;
  }
  const clockText = (k, a) => (k.st === "revealed" ? "🏁 Đã công bố" : k.st === "locked" ? "⏰ Hết giờ" : k.running ? "⏱ " + C.fmtClock(k.left) : "⏱ " + C.fmtClock(k.left || (a && a.time) || 60) + " (chưa bấm)");
  function bindHead() {
    if (!hasSess()) {
      const b = $("#btnStart"); if (b) b.onclick = () => { const classId = $("#selClass").value, lessonId = $("#selLesson").value; LS.set("lh_last", { classId, lessonId }); act(startSession(classId, lessonId), "Đã bắt đầu tiết học — học sinh có thể vào lớp!").then(() => { tab = "groups"; LS.set("lh_tab", tab); }); };
      const saveCfg = () => act(DB.set("teacher/config", { machines: Math.max(0, Math.min(99, +$("#cfgM").value || 0)), phones: Math.max(0, Math.min(99, +$("#cfgP").value || 0)) }), "Đã lưu số máy của phòng.");
      ["#cfgM", "#cfgP"].forEach((s) => { const x = $(s); if (x) x.onchange = saveCfg; });
      return;
    }
    const live = sess.live || {};
    document.querySelectorAll("[data-set]").forEach((b) => { b.onclick = () => { const k = b.dataset.set, v = k === "showScore" ? live.showScore === false : !live[k]; act(DB.set(S("live/" + k), v)); }; });
    $("#btnEnd").onclick = () => { if (confirm("Kết thúc tiết học?\nMáy HS sẽ báo kết thúc. Kết quả vẫn lưu trong 🕘 Lịch sử để xuất Excel.")) act(DB.update("", { [S("meta/status")]: "ended", [`teacher/sessions/${activeId}/status`]: "ended", "public/active": null }), "Đã kết thúc tiết học."); };
    $("#btnBoard").onclick = showBoard;
    $("#btnExport").onclick = () => exportSession(sess);
    const sel = $("#selIdx");
    if (sel) {
      const n = L ? L.activities.length : 0, ti = typeof live.teacherIdx === "number" ? live.teacherIdx : -1;
      const go = (i) => act(DB.set(S("live/teacherIdx"), Math.max(-1, Math.min(n - 1, i))));
      sel.onchange = () => go(+sel.value); $("#idxPrev").onclick = () => go(ti - 1); $("#idxNext").onclick = () => go(ti + 1);
      document.querySelectorAll("[data-act]").forEach((b) => { b.onclick = () => { const a = L.activities[ti]; act(C.actControl(DB, activeId, live, a.id || "a" + ti, b.dataset.act, b.dataset.act === "add" ? +b.dataset.sec : a.time || 60)); }; });
    }
  }
  // đồng hồ hoạt động trên bảng GV
  setInterval(() => {
    const c = $("#actClock"); if (!c || !hasSess() || !L) return;
    const live = sess.live || {}, ti = live.teacherIdx, a = L.activities[ti]; if (!a) return;
    const k = C.actClock(live, a.id || "a" + ti, DB.now());
    if (!c.classList.contains(k.st)) return schedule();
    c.textContent = clockText(k, a);
  }, 500);
  const isOnline = (gid) => { const n = ((sess.groups || {})[gid] || {}).nav; return !!n && DB.now() - (n.at || 0) < 50000; };

  // ======================== TAB: NHÓM ========================
  function tabGroups(body) {
    const gs = Object.entries(sess.groups || {}).map(([id, g]) => ({ id, ...g, nm: C.groupName(sess, id), ord: ((sess.machines || {})[g.machine] || {}).order || 0, sc: C.scoreGroup(sess, id, info), online: isOnline(id) }));
    if (!gs.length) { body.innerHTML = `<div class="card empty"><div class="big">📱</div><p>Chưa có nhóm nào vào lớp.<br>Học sinh mở <b>${esc(joinUrl())}</b> hoặc quét mã QR bên trái.</p></div>`; return; }
    if (sortBy === "score") gs.sort((a, b) => b.sc.score - a.sc.score); else if (sortBy === "name") gs.sort((a, b) => a.ord - b.ord); else gs.sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
    const acts = L ? L.activities.map((a, i) => ({ id: a.id || "a" + i, name: a.name, i })).filter((a) => info.items.some((it) => it.aid === a.id)) : [];
    body.innerHTML = `<div class="toolbar"><span class="muted">Sắp xếp:</span><select id="sortSel"><option value="join">Thứ tự vào lớp</option><option value="name">Số máy</option><option value="score">Điểm cao → thấp</option></select>
      <span class="sp"></span><span class="hint">✕ để gỡ HS khỏi nhóm · ⋯ cho làm lại / xóa nhóm</span></div>
      <div class="groups">${gs.map((g) => { const p = g.sc.total ? g.sc.done / g.sc.total : 0, cur = L && L.activities[(g.nav || {}).idx];
        return `<div class="grp ${g.online ? "" : "off"}"><div class="grp-h"><span class="dot ${g.online ? "on" : ""}" title="${g.online ? "Đang kết nối" : "Mất kết nối / đã đóng trang"}"></span>
          <span class="nm">${esc(g.nm)}</span><span class="score">${fmt1(g.sc.score)}<small>/10</small></span></div>
          <div class="mem">${C.sortedEntries(sess.roster).filter(([s]) => (g.members || {})[s]).map(([s, st]) => `<span>${esc(st.name)}<button data-rm="${g.id}|${s}" title="Gỡ khỏi nhóm">✕</button></span>`).join("") || `<span class="muted">(chưa có thành viên)</span>`}</div>
          <div class="pbar" title="Đã làm ${g.sc.done}/${g.sc.total}"><i style="width:${p * 100}%"></i></div>
          <div class="grp-f"><span class="where">✔ ${g.sc.done}/${g.sc.total} bài · đúng hẳn ${g.sc.correct}<br>📍 ${cur ? esc(cur.name) : "Trang đầu"}</span>
            <span class="bonus" title="Điểm thưởng/trừ"><button class="btn small ghost" data-bonus="${g.id}|-0.5">−</button><b>${g.sc.bonus > 0 ? "+" : ""}${fmt1(g.sc.bonus)}</b><button class="btn small ghost" data-bonus="${g.id}|0.5">＋</button></span>
            <select data-more="${g.id}" title="Thao tác khác"><option value="">⋯</option><option value="reset:">Cho làm lại TẤT CẢ</option>${acts.map((a) => `<option value="reset:${esc(a.id)}">Làm lại: ${esc(a.name)}</option>`).join("")}<option value="remove">🗑 Xóa nhóm (giải phóng máy)</option></select></div></div>`; }).join("")}</div>`;
    $("#sortSel").value = sortBy; $("#sortSel").onchange = (e) => { sortBy = e.target.value; LS.set("lh_sort", sortBy); renderAll(); };
    body.querySelectorAll("[data-rm]").forEach((b) => { b.onclick = () => { const [g, s] = b.dataset.rm.split("|"); act(DB.update(S(""), { [`claims/students/${s}`]: null, [`groups/${g}/members/${s}`]: null })); }; });
    body.querySelectorAll("[data-bonus]").forEach((b) => { b.onclick = () => { const [g, d] = b.dataset.bonus.split("|"); addBonus(g, +d); }; });
    body.querySelectorAll("[data-more]").forEach((el) => { el.onchange = () => { const g = el.dataset.more, v = el.value, nm = C.groupName(sess, g); el.value = ""; if (v === "remove") { if (confirm(`Xóa "${nm}"? Kết quả của nhóm bị xóa; máy và các bạn được chọn lại.`)) act(removeGroup(g), "Đã xóa nhóm."); } else if (v.startsWith("reset:")) { const a = v.slice(6); if (confirm(`Cho "${nm}" làm lại ${a ? "hoạt động này" : "TẤT CẢ"}? Kết quả cũ sẽ bị xóa.`)) act(DB.set(S(`answers/${g}` + (a ? "/" + a : "")), null), "Đã cho nhóm làm lại."); } }; });
  }
  function addBonus(g, d) { const cur = +((((sess.grading || {})[g]) || {}).bonus) || 0; return act(DB.set(S(`grading/${g}/bonus`), C.round1(Math.max(-10, Math.min(10, cur + d))) || null)); }
  function removeGroup(g) {
    const up = { [`groups/${g}`]: null, [`answers/${g}`]: null, [`texts/${g}`]: null, [`grading/${g}`]: null }, cl = sess.claims || {};
    Object.entries(cl.machines || {}).forEach(([m, x]) => { if (x === g) up[`claims/machines/${m}`] = null; });
    Object.entries(cl.students || {}).forEach(([s, x]) => { if (x === g) up[`claims/students/${s}`] = null; });
    return DB.update(S(""), up);
  }

  // ======================== TAB: THEO CÂU HỎI ========================
  function tabQuestions(body) {
    const live = sess.live || {}, acts = L ? L.activities.map((a, i) => ({ id: a.id || "a" + i, name: a.name, i })).filter((a) => info.items.some((it) => it.aid === a.id)) : [];
    let sel = actSel; if (sel === "current") { const cur = acts.find((a) => a.i === live.teacherIdx); sel = cur ? cur.id : "all"; }
    const its = info.items.filter((it) => sel === "all" || it.aid === sel);
    const gs = Object.keys(sess.groups || {}).map((id) => ({ id, nm: C.groupName(sess, id) }));
    body.innerHTML = `<div class="toolbar"><span class="muted">Hoạt động:</span><select id="actSel"><option value="current">📍 Hoạt động GV đang chiếu</option><option value="all">Tất cả (${info.items.length} bài)</option>${acts.map((a) => `<option value="${esc(a.id)}">${a.i + 1}. ${esc(a.name)}</option>`).join("")}</select>
      <span class="hint">Cột xanh = đáp án đúng.</span></div>` + (its.length ? its.map((it, n) => {
      const recs = gs.map((g) => ({ g, r: C.answerOf(sess, g.id, it) })), done = recs.filter((x) => x.r);
      const avg = done.length ? done.reduce((t, x) => t + C.judge(it, x.r).fraction, 0) / done.length : 0, cls = !done.length ? "" : avg >= 0.8 ? "good" : avg >= 0.5 ? "mid" : "low";
      let det = "";
      if (it.q && it.q.type !== "true-false") { const q = it.q; det = (q.options || []).map((o, k) => optRow(KEYS[k], o, done.filter((x) => { const c = x.r.choice; return Array.isArray(c) ? c.map(Number).includes(k) : c === k; }).length, gs.length, q.type === "multiple-select" ? (q.answer || []).includes(k) : q.answer === k)).join(""); }
      else if (it.q) det = [["Đúng", true], ["Sai", false]].map(([lb, v], k) => optRow(KEYS[k], lb, done.filter((x) => x.r.choice === v).length, gs.length, it.q.answer === v)).join("");
      else { const full = done.filter((x) => C.judge(it, x.r).ok).length; det = optRow("✓", "Đúng hết", full, gs.length, true) + optRow("~", "Có mục sai (tính theo tỉ lệ)", done.length - full, gs.length, false); }
      det += optRow("–", "Chưa làm", gs.length - done.length, gs.length, false, "none");
      const wait = recs.filter((x) => !x.r).map((x) => esc(x.g.nm)), excl = (live.excluded || {})[it.aid], st = C.actState(live, it.aid, DB.now());
      return `<div class="q"><div class="qh"><span class="t">${n + 1}. ${esc(it.label)}${excl ? ` <span class="pill">không tính điểm</span>` : ""}${st !== "free" ? ` <span class="pill ${st}">${{ open: "đang làm", locked: "hết giờ", revealed: "đã công bố" }[st]}</span>` : ""}</span>
        <span class="pill">${done.length}/${gs.length} nhóm</span>${done.length ? `<span class="pill ${cls}">đạt ${pct(avg)}</span>` : ""}</div>${det}${wait.length ? `<div class="pending">⏳ Chưa làm: ${wait.join(", ")}</div>` : ""}</div>`;
    }).join("") : `<div class="card empty">Hoạt động này không có bài chấm điểm.</div>`);
    $("#actSel").value = actSel; $("#actSel").onchange = (e) => { actSel = e.target.value; renderAll(); };
  }
  const optRow = (k, text, n, total, right, cls) => `<div class="opt ${right ? "right" : ""} ${cls || ""}"><span class="k">${esc(k)}</span><span>${esc(text)}</span><span class="bar"><i style="width:${total ? (n / total) * 100 : 0}%"></i></span><span class="n">${n}</span></div>`;

  // ======================== TAB: TỰ LUẬN ========================
  function tabTexts(body) {
    if (!info.openQs.length) { body.innerHTML = `<div class="card empty">Bài này không có câu hỏi tự luận / vận dụng.</div>`; return; }
    const gs = Object.keys(sess.groups || {});
    body.innerHTML = info.openQs.map((o) => {
      const ans = gs.map((g) => ({ g, t: (((sess.texts || {})[g] || {})[o.aid] || {})[o.iid], star: (((((sess.grading || {})[g] || {}).stars) || {})[o.aid] || {})[o.iid] })).filter((x) => x.t);
      return `<div class="q"><div class="qh"><span class="t">${esc(o.activityName)} — ${esc(o.label)}</span><span class="pill">${ans.length}/${gs.length} nhóm đã gửi</span></div>
        ${ans.map((x) => `<div class="ans ${x.star ? "star" : ""}"><div class="who"><span>${esc(C.groupName(sess, x.g))} · <span class="muted">${esc(C.memberNames(sess, sess.groups[x.g]).join(", "))}</span></span>
          <button class="btn small ghost" data-star="${x.g}|${esc(o.aid)}|${o.iid}">${x.star ? "⭐ Bỏ đánh dấu" : "☆ Đánh dấu"}</button><button class="btn small ghost" data-bonus="${x.g}|0.5">＋0,5đ</button></div>
          <div class="txt">${esc(x.t.text)}</div></div>`).join("") || `<p class="muted">Chưa có nhóm nào gửi.</p>`}</div>`;
    }).join("");
    body.querySelectorAll("[data-star]").forEach((b) => { b.onclick = () => { const [g, a, i] = b.dataset.star.split("|"), cur = (((((sess.grading || {})[g] || {}).stars) || {})[a] || {})[i]; act(DB.set(S(`grading/${g}/stars/${a}/${i}`), cur ? null : true)); }; });
    body.querySelectorAll("[data-bonus]").forEach((b) => { b.onclick = () => { const [g, d] = b.dataset.bonus.split("|"); addBonus(g, +d); toast("Đã cộng 0,5 điểm."); }; });
  }

  // ======================== TAB: HỌC SINH ========================
  function tabStudents(body) {
    const cs = (sess.claims || {}).students || {}, gs = Object.keys(sess.groups || {}).map((id) => ({ id, nm: C.groupName(sess, id), ord: ((sess.machines || {})[sess.groups[id].machine] || {}).order || 0 })).sort((a, b) => a.ord - b.ord);
    const roster = C.sortedEntries(sess.roster), miss = roster.filter(([s]) => !cs[s]).length;
    body.innerHTML = `<div class="toolbar"><span>${miss ? `⚠️ <b>${miss}</b> HS chưa vào nhóm (Excel ghi "Không tham gia").` : "✅ Tất cả HS đã vào nhóm."}</span><span class="sp"></span><span class="hint">Chọn nhóm ở cột "Máy / Nhóm" để xếp/chuyển HS.</span></div>
      <table class="t"><thead><tr><th>STT</th><th>Họ và tên</th><th>Máy / Nhóm</th><th>Bài đã làm</th><th>Điểm</th></tr></thead><tbody>
      ${roster.map(([s, st], i) => { const g = cs[s], sc = g && sess.groups[g] ? C.scoreGroup(sess, g, info) : null; return `<tr class="${g ? "" : "none"}"><td>${i + 1}</td><td>${esc(st.name)}</td>
        <td><select data-move="${s}"><option value="">— chưa vào —</option>${gs.map((x) => `<option value="${x.id}" ${x.id === g ? "selected" : ""}>${esc(x.nm)}</option>`).join("")}</select></td>
        <td class="num">${sc ? `${sc.done}/${sc.total}` : ""}</td><td class="num">${sc ? fmt1(sc.score) : ""}</td></tr>`; }).join("")}</tbody></table>`;
    body.querySelectorAll("[data-move]").forEach((el) => { el.onchange = () => {
      const s = el.dataset.move, old = cs[s], g = el.value, up = { [`claims/students/${s}`]: g || null };
      if (old && sess.groups[old]) up[`groups/${old}/members/${s}`] = null;
      if (g) up[`groups/${g}/members/${s}`] = true;
      act(DB.update(S(""), up), "Đã cập nhật nhóm của " + sess.roster[s].name);
    }; });
  }

  // ======================== TAB: TÍNH ĐIỂM ========================
  function tabGrading(body) {
    const live = sess.live || {}, ex = live.excluded || {};
    const acts = L ? L.activities.map((a, i) => ({ id: a.id || "a" + i, name: a.name, i, n: info.items.filter((it) => it.aid === (a.id || "a" + i)).length })).filter((a) => a.n) : [];
    body.innerHTML = `<div class="card"><h3>Cách tính điểm (thang 10, chung cả nhóm)</h3>
      <ul><li>Mỗi câu trắc nghiệm / bài ghép đôi / phân loại / sắp xếp / điền khuyết = <b>1 bài</b>. Trắc nghiệm được chấm lại theo đáp án (không tin máy HS).</li>
      <li><b>HS tự làm:</b> chỉ tính lần đầu; ghép đôi/phân loại tính tỉ lệ mục đúng ngay lần đầu.</li>
      <li><b>Theo nhịp GV:</b> tính đáp án cuối cùng lúc GV bấm Kết thúc / hết giờ; bài kéo thả tính tỉ lệ đúng khi nộp; không nộp = chưa làm.</li></ul>
      <p><b>Điểm = (tổng điểm các bài ÷ số bài được tính) × 10 + điểm thưởng</b>, tối đa 10.</p></div>
      <div class="card"><h3>Hoạt động được tính điểm</h3><p class="hint">Bỏ chọn phần chưa dạy tới để không bị tính 0 điểm.</p>
      ${acts.map((a) => `<label class="chk"><input type="checkbox" data-inc="${esc(a.id)}" ${ex[a.id] ? "" : "checked"}> ${a.i + 1}. ${esc(a.name)} <span class="muted">(${a.n} bài)</span></label>`).join("")}
      <p><button class="btn small ghost" id="incAll">Chọn tất cả</button> <button class="btn small ghost" id="incUpTo">Chỉ tính tới hoạt động GV đang chiếu</button></p></div>`;
    const save = (list) => act(DB.set(S("live/excluded"), list.length ? Object.fromEntries(list.map((x) => [x, true])) : null), "Đã cập nhật cách tính điểm.");
    body.querySelectorAll("[data-inc]").forEach((cb) => { cb.onchange = () => save([...body.querySelectorAll("[data-inc]")].filter((x) => !x.checked).map((x) => x.dataset.inc)); });
    $("#incAll").onclick = () => save([]);
    $("#incUpTo").onclick = () => save(acts.filter((a) => a.i > (typeof live.teacherIdx === "number" ? live.teacherIdx : -1)).map((a) => a.id));
  }

  // ======================== TAB: DANH SÁCH LỚP ========================
  function parseNames(text, joinTwo) {
    const HEAD = ["stt", "ho va ten", "ho ten", "ten", "ho dem", "ho va ten dem", "hoc sinh", "ten hoc sinh", "danh sach", "ho va ten hoc sinh", "ngay sinh", "gioi tinh", "ma hoc sinh", "ma hs", "lop"];
    const out = [];
    String(text || "").split(/\r?\n/).forEach((line) => {
      const cells = (line.includes("\t") ? line.split("\t") : line.split(/[;,]/)).map((c) => c.trim()).filter((c) => c && /\p{L}/u.test(c));
      if (!cells.length || cells.some((c) => HEAD.includes(C.norm(c)))) return;
      const name = (joinTwo && cells[1] ? cells[0] + " " + cells[1] : cells[0]).replace(/^\d+\s*[.)\-–]\s*/, "").replace(/\s+/g, " ").trim();
      if (name) out.push(name);
    });
    return out;
  }
  const classList = () => Object.entries(T.classes || {}).sort((a, b) => String(a[1].name).localeCompare(String(b[1].name), "vi", { numeric: true }));
  const edFor = (id) => { const c = (T.classes || {})[id]; return c ? { id, name: c.name, text: C.sortedEntries(c.students).map(([, s]) => s.name).join("\n"), joinTwo: false } : { id: null, name: "", text: "", joinTwo: false }; };
  // giữ mã HS cũ khi trùng tên (để không lệch dữ liệu các tiết trước)
  function buildStudents(oldStudents, names) {
    const pool = C.sortedEntries(oldStudents).map(([id, s]) => ({ id, name: s.name })), out = {};
    names.forEach((n, i) => { const k = pool.findIndex((x) => C.norm(x.name) === C.norm(n)); const id = k >= 0 ? pool.splice(k, 1)[0].id : "hs" + C.rid(8); out[id] = { name: n, order: i + 1 }; });
    return out;
  }
  function tabClasses(body) {
    const cl = classList();
    if (!clsEdit || (clsEdit.id && !(T.classes || {})[clsEdit.id])) clsEdit = cl.length ? edFor(cl[0][0]) : edFor(null);
    body.innerHTML = `<div class="card"><div class="toolbar"><button class="btn" id="btnImport">📥 Nhập từ Excel</button><button class="btn ghost" id="btnExportCls">📤 Xuất Excel (dùng làm file mẫu)</button>
        <span class="hint">File Excel: 1 sheet có cột <b>Lớp · STT · Họ và tên</b> (tự nhóm theo lớp), hoặc mỗi lớp 1 sheet (tên sheet = tên lớp). Nhận cả cột "Họ đệm" + "Tên" riêng.</span></div></div>
      <div class="card cls"><div class="cls-list">${cl.map(([id, c]) => `<button data-cls="${esc(id)}" class="${id === clsEdit.id ? "on" : ""}">${esc(c.name)}<br><small>${Object.keys(c.students || {}).length} học sinh</small></button>`).join("")}<button data-cls="" class="${clsEdit.id ? "" : "on"}">＋ Lớp mới</button></div>
      <div class="cls-ed"><label class="f">Tên lớp<input type="text" id="clsName" value="${esc(clsEdit.name)}" placeholder="VD: 6A1"></label>
        <p class="hint" style="margin:12px 0 6px">Hoặc dán danh sách (mỗi dòng một bạn; copy từ Excel được).</p>
        <textarea id="clsText" placeholder="Nguyễn Văn An&#10;Trần Thị Bình&#10;...">${esc(clsEdit.text)}</textarea>
        <label class="chk"><input type="checkbox" id="clsJoin" ${clsEdit.joinTwo ? "checked" : ""}> Họ đệm và Tên ở 2 cột riêng → ghép lại</label>
        <p><b>Xem trước: <span id="clsCount"></span> học sinh</b></p><div class="preview" id="clsPrev"></div>
        <p class="row"><button class="btn" id="clsSave">💾 Lưu danh sách</button>${clsEdit.id ? `<span class="sp"></span><button class="btn danger" id="clsDel">🗑 Xóa lớp</button>` : ""}</p>
        <p class="hint">Sửa danh sách không ảnh hưởng tiết đang diễn ra; áp dụng từ tiết sau.</p></div></div>`;
    const prev = () => { clsEdit.name = $("#clsName").value; clsEdit.text = $("#clsText").value; clsEdit.joinTwo = $("#clsJoin").checked; const n = parseNames(clsEdit.text, clsEdit.joinTwo); $("#clsCount").textContent = n.length; $("#clsPrev").innerHTML = `<ol>${n.map((x) => `<li>${esc(x)}</li>`).join("")}</ol>`; };
    prev(); $("#clsName").oninput = prev; $("#clsText").oninput = prev; $("#clsJoin").onchange = prev;
    body.querySelectorAll("[data-cls]").forEach((b) => { b.onclick = () => { clsEdit = edFor(b.dataset.cls || null); renderAll(); }; });
    $("#clsSave").onclick = async () => {
      prev(); const names = parseNames(clsEdit.text, clsEdit.joinTwo), name = clsEdit.name.trim();
      if (!name) return alert("Nhập tên lớp."); if (!names.length) return alert("Danh sách trống.");
      const id = clsEdit.id || "l" + C.rid(8), old = ((T.classes || {})[id] || {}).students;
      await act(DB.set(`teacher/classes/${id}`, { name, students: buildStudents(old, names) }), `Đã lưu lớp ${name} (${names.length} HS).`);
      clsEdit = edFor(id); if (document.activeElement) document.activeElement.blur();
    };
    const del = $("#clsDel"); if (del) del.onclick = () => { if (confirm(`Xóa lớp "${clsEdit.name}"? (Kết quả các tiết cũ vẫn giữ.)`)) { const id = clsEdit.id; clsEdit = null; act(DB.set(`teacher/classes/${id}`, null), "Đã xóa lớp."); } };
    $("#btnExportCls").onclick = () => XLSX.download([C.classesSheet(T.classes || {})], (cl.length ? "DanhSachLop" : "MauDanhSachLop") + ".xlsx");
    $("#btnImport").onclick = () => { const f = $("#fileIn"); f.value = ""; f.onchange = () => f.files[0] && importFile(f.files[0]); f.click(); };
  }
  async function importFile(file) {
    let sheets;
    try { sheets = /\.xlsx$/i.test(file.name) ? await XLSX.read(await file.arrayBuffer()) : XLSX.readCSV(await file.text()); }
    catch (e) { return alert("⚠️ Không đọc được file: " + e.message); }
    const found = C.parseClassBook(sheets).filter((c) => c.names.length);
    if (!found.length) return alert("Không tìm thấy học sinh nào. File cần cột \"Họ và tên\" (hoặc \"Họ đệm\" + \"Tên\"), có thể kèm cột \"Lớp\".");
    const byName = Object.fromEntries(Object.entries(T.classes || {}).map(([id, c]) => [C.norm(c.name), id]));
    const plan = found.map((c) => ({ ...c, id: byName[C.norm(c.className)] || null }));
    openOverlay("import", `<div class="card dlg"><h2>📥 Nhập danh sách lớp</h2><p>File <b>${esc(file.name)}</b> có <b>${plan.length}</b> lớp:</p>
      <table class="t"><thead><tr><th></th><th>Lớp</th><th>Số HS</th><th>Thao tác</th><th>Vài tên đầu</th></tr></thead><tbody>${plan.map((p, i) => `<tr><td><input type="checkbox" data-pi="${i}" checked></td><td><b>${esc(p.className)}</b></td><td class="num">${p.names.length}</td>
        <td>${p.id ? `<span class="pill mid">Cập nhật (đang có ${Object.keys(T.classes[p.id].students || {}).length} HS)</span>` : `<span class="pill good">Tạo mới</span>`}</td><td class="muted">${esc(p.names.slice(0, 3).join(", "))}…</td></tr>`).join("")}</tbody></table>
      <p class="hint">Lớp đã có sẽ được thay bằng danh sách mới (giữ nguyên mã HS trùng tên để không lệch kết quả cũ).</p>
      <p class="row"><button class="btn" id="impOk">✅ Nhập</button><button class="btn ghost" id="impCancel">Hủy</button></p></div>`);
    $("#impCancel").onclick = closeOverlay;
    $("#impOk").onclick = async () => {
      const up = {}; let n = 0;
      document.querySelectorAll("[data-pi]").forEach((cb) => { if (!cb.checked) return; const p = plan[+cb.dataset.pi], id = p.id || "l" + C.rid(8); up[id] = { name: p.className, students: buildStudents(p.id ? T.classes[p.id].students : null, p.names) }; n++; });
      if (!n) return closeOverlay();
      await act(DB.update("teacher/classes", up), `Đã nhập ${n} lớp.`); closeOverlay(); clsEdit = null;
    };
  }

  // ======================== TAB: LỊCH SỬ ========================
  function tabHistory(body) {
    const h = Object.entries(T.sessions || {}).map(([id, m]) => ({ id, ...m })).sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    if (!h.length) { body.innerHTML = `<div class="card empty">Chưa có tiết học nào.</div>`; return; }
    body.innerHTML = `<table class="t"><thead><tr><th>Thời gian</th><th>Lớp</th><th>Bài</th><th></th></tr></thead><tbody>${h.map((x) => `<tr><td>${new Date(x.createdAt).toLocaleString("vi-VN", { dateStyle: "short", timeStyle: "short" })}</td><td><b>${esc(x.className)}</b></td><td>${esc(x.lessonTitle)}</td>
      <td class="nowrap"><button class="btn small ghost" data-xl="${esc(x.id)}">⬇️ Excel</button> ${x.id === activeId ? `<span class="pill good">đang diễn ra</span>` : `<button class="btn small ghost" data-resume="${esc(x.id)}">▶ Mở lại</button>`}</td></tr>`).join("")}</tbody></table>`;
    body.querySelectorAll("[data-xl]").forEach((b) => { b.onclick = () => act(DB.get("sessions/" + b.dataset.xl).then((s) => { if (!s) throw new Error("Không còn dữ liệu tiết này"); return exportSession(s); })); });
    body.querySelectorAll("[data-resume]").forEach((b) => { b.onclick = () => {
      if (!confirm("Mở lại tiết này? (Tiết đang diễn ra — nếu có — sẽ kết thúc; HS vào lại bằng máy/tên cũ.)")) return;
      const id = b.dataset.resume, up = { [`sessions/${id}/meta/status`]: "open", [`teacher/sessions/${id}/status`]: "open", "public/active": id };
      if (activeId) { up[`sessions/${activeId}/meta/status`] = "ended"; up[`teacher/sessions/${activeId}/status`] = "ended"; }
      act(DB.update("", up), "Đã mở lại tiết học.").then(() => { tab = "groups"; });
    }; });
  }
  async function exportSession(s) {
    const Lx = await C.loadLesson(s.meta.lessonId);
    const wb = C.sessionWorkbook(s, Lx);
    XLSX.download(wb.sheets, wb.filename); toast("Đã xuất " + wb.filename);
  }

  // ======================== OVERLAY ========================
  function openOverlay(kind, html) { overlayKind = kind; const ov = $("#overlay"); ov.innerHTML = `<button class="ov-close" title="Đóng (Esc)">✕</button>` + html; ov.hidden = false; ov.querySelector(".ov-close").onclick = closeOverlay; }
  function closeOverlay() { overlayKind = null; $("#overlay").hidden = true; }
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeOverlay(); });
  function showQR() {
    const u = joinUrl(), m = sess && sess.meta;
    openOverlay("qr", `<div class="bigqr">${QR.svg(u)}<div class="url">${esc(u.replace(/^https?:\/\//, "").replace(/\/$/, ""))}</div><div>${m ? `Lớp <b>${esc(m.className)}</b> · ${esc(m.lessonTitle)}<br>` : ""}Quét mã hoặc gõ địa chỉ trên, chọn máy và tên các bạn ngồi cùng máy</div></div>`);
  }
  function showBoard() {
    if (!hasSess()) return closeOverlay();
    const gs = Object.keys(sess.groups || {}).map((id) => ({ id, nm: C.groupName(sess, id), sc: C.scoreGroup(sess, id, info), mem: C.memberNames(sess, sess.groups[id]) })).sort((a, b) => b.sc.score - a.sc.score || b.sc.done - a.sc.done).slice(0, 10);
    const medal = ["🥇", "🥈", "🥉"];
    openOverlay("board", `<div class="board"><h1>🏆 Bảng xếp hạng</h1>${gs.map((g, i) => `<div class="rank"><div class="pos">${medal[i] || i + 1}</div><div>${esc(g.nm)} <div class="mb">${esc(g.mem.join(", "))}</div><div class="bar"><i style="width:${g.sc.score * 10}%"></i></div></div><div class="sc">${fmt1(g.sc.score)}</div></div>`).join("") || `<p style="text-align:center">Chưa có nhóm nào.</p>`}</div>`);
  }
  setInterval(() => { if (!document.hidden && hasSess() && tab === "groups") schedule(); }, 15000); // cập nhật chấm online
})();
