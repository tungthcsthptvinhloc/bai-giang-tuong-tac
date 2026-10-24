/* ============================================================================
 * Bảng điều khiển GIÁO VIÊN — dùng chung cho offline (LAN) và online (Firebase).
 * Theo dõi các nhóm làm bài trực tiếp; điều khiển tiết học (theo nhịp, bấm giờ,
 * kết thúc/công bố, tạm dừng); chấm điểm; xuất Excel; quản lí danh sách lớp
 * (nhập/xuất Excel), số máy của phòng; lịch sử các tiết (xóa, phân trang); xuất báo cáo điểm nhiều tiết.
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
  // Hỗ trợ & Góp ý (icon trên thanh tiêu đề) — hộp thoại thông tin liên hệ
  const helpDlg = $("#helpDlg"), closeHelp = () => { helpDlg.hidden = true; };
  $("#btnHelp").onclick = () => { helpDlg.hidden = false; $("#helpClose").focus(); };
  $("#helpClose").onclick = closeHelp;
  helpDlg.onclick = (e) => { if (e.target === helpDlg) closeHelp(); };
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !helpDlg.hidden) { closeHelp(); e.stopImmediatePropagation(); } }, true);
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
    DB.on("teacher", (v, err) => { if (err) return toast("Không đọc được dữ liệu giáo viên: " + err.message); T = v || {}; syncOpen(); schedule(); });
  }
  // ---- NHIỀU TIẾT MỞ CÙNG LÚC: mỗi tiết một mã vào lớp; bảng GV chọn tiết đang xem (nhớ trên máy này) ----
  const openList = () => Object.entries(T.sessions || {}).filter(([, m]) => m && m.status === "open").map(([id, m]) => ({ id, ...m })).sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  let addingNew = false; // đang ở màn "＋ Mở thêm bài"
  function selectSession(id) {
    if (id === activeId) return;
    activeId = id || null; sess = null; if (unsubSess) unsubSess(); unsubSess = null;
    LS.set("lh_cur_sess", activeId);
    if (activeId) { addingNew = false; unsubSess = DB.on("sessions/" + activeId, (v) => { sess = v; ensureLesson(); ensureCode(); schedule(); }); }
    $("#tabBody") && ($("#tabBody").innerHTML = ""); schedule();
  }
  function syncOpen() { // tiết đang xem đã kết thúc / chưa chọn -> chuyển sang tiết mở gần nhất
    const open = openList();
    if (activeId && open.some((x) => x.id === activeId)) return;
    const saved = LS.get("lh_cur_sess", null), pick = open.find((x) => x.id === saved) || open[0];
    selectSession(pick && !addingNew ? pick.id : null);
  }
  // ---- MÃ VÀO LỚP (4 chữ số): tự sinh khi bắt đầu tiết; HS mở web và nhập mã để vào ----
  async function newCode(except) {
    for (let i = 0; i < 40; i++) {
      const c = String(1000 + Math.floor(Math.random() * 9000)); if ([].concat(except || []).includes(c)) continue;
      const v = await DB.get("codes/" + c).catch(() => null);
      if (!v || !v.s) return c;
      const st = await DB.get(`sessions/${v.s}/meta/status`).catch(() => null);
      if (st !== "open") return c; // mã của tiết đã kết thúc -> dùng lại được
    }
    throw new Error("Không tạo được mã vào lớp — hãy thử lại.");
  }
  let assigning = false;
  function ensureCode() { // tiết đang mở mà chưa có mã (tiết tạo từ bản cũ) -> cấp mã
    if (assigning || !sess || !sess.meta || sess.meta.status !== "open" || sess.meta.code) return;
    assigning = true; const id = activeId;
    newCode().then((c) => DB.update("", { [`sessions/${id}/meta/code`]: c, [`teacher/sessions/${id}/code`]: c, [`codes/${c}`]: { s: id, at: DB.now() } })).catch((e) => toast(e.message)).finally(() => { assigning = false; });
  }
  const curCode = () => (hasSess() ? sess.meta.code || null : null);
  // Các thay đổi để đóng MỘT tiết (kèm xóa mã vào lớp của tiết đó) — các tiết khác vẫn mở
  function closeSession(up, id) {
    if (!id) return up;
    up[`sessions/${id}/meta/status`] = "ended"; up[`teacher/sessions/${id}/status`] = "ended";
    const oc = id === activeId && sess && sess.meta ? sess.meta.code : ((T.sessions || {})[id] || {}).code; if (oc) up[`codes/${oc}`] = null;
    return up;
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
  const qrUrl = () => joinUrl() + (curCode() ? "?c=" + curCode() : ""); // quét QR là tự điền mã
  function renderSide() {
    const u = joinUrl(), q = qrUrl(), code = curCode();
    if ($("#joinUrl").dataset.u !== q) { $("#qr").innerHTML = QR.svg(q); $("#joinUrl").textContent = u.replace(/^https?:\/\//, "").replace(/\/$/, ""); $("#joinUrl").dataset.u = q; }
    $("#joinCode").innerHTML = code ? `<small>Mã vào lớp</small><b>${esc(code)}</b>` : hasSess() ? `<small>Đang tạo mã…</small>` : `<small>Bắt đầu tiết học để có <b>mã vào lớp</b></small>`;
    $("#joinCode").classList.toggle("on", !!code);
    const urls = (lanInfo && lanInfo.urls) || [];
    $("#otherUrls").innerHTML = DB.mode === "lan" ? (urls.length > 1 ? "Địa chỉ khác: " + urls.slice(1).map((x) => esc(x.url)).join(", ") : urls.length ? "" : "⚠️ Máy chưa kết nối mạng LAN/Wi-Fi") : "";
    $("#sideHint").innerHTML = (code ? `HS mở địa chỉ trên → nhập mã <b>${esc(code)}</b> (hoặc quét QR là tự điền). ` : "") + (DB.mode === "lan" ? `Máy HS / điện thoại phải cùng mạng với máy này.${lanInfo && lanInfo.key ? `<br>Mã giáo viên: <b>${esc(lanInfo.key)}</b> (mở bảng này từ máy khác)` : ""}` : "Học sinh chỉ cần Internet. Mở trang chiếu bài bằng nút 📺 bên cạnh.");
    const m = sess && sess.meta;
    $("#sessInfo").textContent = m ? `Lớp ${m.className} · ${m.lessonTitle}` : "Chưa bắt đầu tiết học";
    document.title = m ? `${m.className} · ${m.lessonTitle} — Bảng GV` : "Bảng điều khiển giáo viên";
  }
  $("#btnQrBig").onclick = () => showQR();

  // ======================== KHU CHÍNH ========================
  const TABS = [
    { id: "groups", label: "💻 Nhóm", need: true }, { id: "questions", label: "📊 Theo câu hỏi", need: true },
    { id: "texts", label: "✍️ Tự luận", need: true }, { id: "students", label: "🧑‍🎓 Học sinh", need: true },
    { id: "grading", label: "⚙️ Tính điểm", need: true }, { id: "classes", label: "📋 Danh sách lớp" }, { id: "history", label: "🕘 Lịch sử" }, { id: "report", label: "📑 Xuất báo cáo" }, { id: "impact", label: "📈 Tác động" }, { id: "eval", label: "🎯 Đánh giá HS" },
  ];
  const hasSess = () => !!(sess && sess.meta && sess.meta.status === "open");
  function renderAll() {
    renderSide();
    const main = $("#main"), s = hasSess();
    if (!s && TABS.find((t) => t.id === tab && t.need)) tab = "classes";
    const groups = s ? Object.keys(sess.groups || {}).length : 0;
    const counts = s ? { groups, texts: Object.values(sess.texts || {}).reduce((t, g) => t + Object.values(g || {}).reduce((u, a) => u + Object.keys(a || {}).length, 0), 0), students: Object.keys(sess.roster || {}).filter((x) => !((sess.claims || {}).students || {})[x]).length || "" } : {};
    const head = sessBar() + (s ? sessionCard() : startCard());
    const tabs = `<nav class="tabs">${TABS.filter((t) => !t.need || s).map((t) => `<button data-tab="${t.id}" class="${t.id === tab ? "on" : ""}">${t.label}${counts[t.id] ? `<span class="cnt">${counts[t.id]}</span>` : ""}</button>`).join("")}</nav>`;
    if (!$("#headBox")) main.innerHTML = `<div id="headBox"></div><div id="tabsBox"></div><div id="tabBody"></div>`;
    const ae = document.activeElement, typingHead = ae && $("#headBox").contains(ae) && /INPUT|SELECT|TEXTAREA/.test(ae.tagName);
    if (!typingHead) { $("#headBox").innerHTML = head; bindHead(); }
    $("#tabsBox").innerHTML = tabs;
    document.querySelectorAll("[data-tab]").forEach((b) => { b.onclick = () => { tab = b.dataset.tab; LS.set("lh_tab", tab); $("#tabBody").innerHTML = ""; renderAll(); }; });
    const body = $("#tabBody");
    if (ae && body.contains(ae) && /INPUT|TEXTAREA|SELECT/.test(ae.tagName) && ae.type !== "checkbox") return; // đang gõ -> không vẽ lại
    ({ groups: tabGroups, questions: tabQuestions, texts: tabTexts, students: tabStudents, grading: tabGrading, classes: tabClasses, history: tabHistory, report: tabReport, impact: tabImpact, eval: tabEval }[tab] || tabClasses)(body);
    if (overlayKind === "board") showBoard();
  }

  // ---- thanh các tiết đang mở (bấm để chuyển; ＋ để mở thêm bài khác cho lớp khác / tự học) ----
  const modeIcon = (m) => (m && m.mode === "self" ? "🏠" : "🖥️");
  function sessBar() {
    const open = openList(); if (!open.length) return "";
    return `<div class="sess-bar"><b>📚 Đang mở ${open.length} tiết:</b>${open.map((x) => `<button class="sess-chip ${x.id === activeId ? "on" : ""}" data-sess="${esc(x.id)}" title="${x.mode === "self" ? "Tự học cá nhân" : "Phòng máy"} · mở lúc ${new Date(x.createdAt).toLocaleString("vi-VN", { dateStyle: "short", timeStyle: "short" })}">${modeIcon(x)} <b>${esc(x.className)}</b> · ${esc(String(x.lessonTitle || "").split(":")[0])}${x.code ? ` <span class="sc-code">🔑 ${esc(x.code)}</span>` : ""}</button>`).join("")}
      <button class="sess-chip add ${!activeId ? "on" : ""}" id="btnAddSess" title="Mở thêm một bài cho lớp khác (các tiết đang mở vẫn chạy)">＋ Mở thêm bài</button></div>`;
  }
  // ---- bắt đầu tiết ----
  function startCard() {
    const groups = {}, last = LS.get("lh_last", {}), c = cfg();
    manifest.forEach((l) => { const g = /^tin\d+/.test(l.id) ? "Tin học " + l.id.match(/^tin(\d+)/)[1] : l.grade ? "Lớp " + l.grade : "Khác"; (groups[g] = groups[g] || []).push(l); });
    const classes = Object.entries(T.classes || {}).sort((a, b) => String(a[1].name).localeCompare(String(b[1].name), "vi", { numeric: true }));
    const nOpen = openList().length;
    return `<div class="card"><h2>▶️ ${nOpen ? "Mở thêm bài học" : "Bắt đầu tiết học"}</h2>
      ${nOpen ? `<p class="hint">Đang mở ${nOpen} tiết — các tiết đó <b>vẫn chạy</b> (mỗi tiết một mã vào lớp riêng). Bấm tên tiết ở thanh trên để quay lại theo dõi.</p>` : ""}
      ${classes.length ? "" : `<p class="hint">⚠️ Chưa có danh sách lớp — mở tab <b>📋 Danh sách lớp</b> để nhập từ Excel.</p>`}
      <div class="modes"><b>Kiểu tiết:</b>
        <label class="mode-opt"><input type="radio" name="sessMode" value="room" ${last.mode !== "self" ? "checked" : ""}> 🖥️ <b>Phòng máy</b> <span class="hint">— HS chọn máy và tên các bạn ngồi cùng máy (làm theo nhóm)</span></label>
        <label class="mode-opt"><input type="radio" name="sessMode" value="self" ${last.mode === "self" ? "checked" : ""}> 🏠 <b>Tự học cá nhân</b> <span class="hint">— ở nhà hoặc ở lớp: HS chỉ chọn tên mình, mỗi HS tính điểm riêng; học xong xem được kết quả và thứ hạng</span></label></div>
      <div class="form">
        <label class="f">Lớp<select id="selClass">${classes.map(([id, x]) => `<option value="${esc(id)}" ${id === last.classId ? "selected" : ""}>${esc(x.name)} (${Object.keys(x.students || {}).length} HS)</option>`).join("")}</select></label>
        <label class="f">Bài giảng<select id="selLesson">${Object.entries(groups).map(([g, ls]) => `<optgroup label="${esc(g)}">${ls.map((l) => `<option value="${esc(l.id)}" ${l.id === last.lessonId ? "selected" : ""}>${esc(l.title)} — ${l.items} bài chấm${l.open ? ", " + l.open + " tự luận" : ""}</option>`).join("")}</optgroup>`).join("")}</select></label>
        <button class="btn big" id="btnStart" ${classes.length && manifest.length ? "" : "disabled"}>▶ Bắt đầu</button>
      </div>
      <div class="room"><b>🖥️ Phòng máy:</b>
        <label>Số máy tính <input type="number" id="cfgM" min="0" max="99" value="${c.machines}"></label>
        <label>Số điện thoại <input type="number" id="cfgP" min="0" max="99" value="${c.phones}"></label>
        <span class="hint">HS chọn đúng 1 máy khi vào lớp (Máy 01…${C.pad2(c.machines)}${c.phones ? `, Điện thoại 01…${C.pad2(c.phones)}` : ""}); mỗi máy chỉ 1 nhóm.</span></div>
      <p class="hint">Bấm ▶ Bắt đầu → hệ thống tự sinh <b>mã vào lớp 4 chữ số</b>; HS mở trang web và nhập mã. Khi HS tự làm, mỗi câu chỉ tính <b>lần nộp đầu tiên</b>; khi bật <b>👣 theo nhịp GV</b>, HS được sửa bài đến khi thầy/cô bấm <b>🏁 Kết thúc</b>.</p></div>`;
  }
  // Bắt đầu tiết MỚI — KHÔNG đóng các tiết đang mở (nhiều lớp tự học nhiều bài cùng lúc). mode: "room" | "self"
  async function startSession(classId, lessonId, mode) {
    const cls = (T.classes || {})[classId]; if (!cls) throw new Error("Chưa chọn lớp");
    const Ls = await C.loadLesson(lessonId), c = cfg(), now = DB.now(), d = new Date(now);
    const id = `${d.getFullYear()}${C.pad2(d.getMonth() + 1)}${C.pad2(d.getDate())}-${C.pad2(d.getHours())}${C.pad2(d.getMinutes())}-${C.rid(4)}`;
    const code = await newCode(openList().map((x) => x.code));
    const meta = { lessonId, lessonTitle: (Ls.meta && Ls.meta.title) || lessonId, classId, className: cls.name, createdAt: now, status: "open", code, mode: mode === "self" ? "self" : "room" };
    const roster = {}; C.sortedEntries(cls.students).forEach(([sid, x], i) => { roster[sid] = { name: x.name, order: i + 1 }; });
    const up = { [`sessions/${id}`]: { meta, roster, machines: meta.mode === "self" ? null : C.machineList(c.machines, c.phones), live: { follow: false, paused: false, showModel: false, showScore: true, teacherIdx: -1 } }, [`teacher/sessions/${id}`]: meta, [`codes/${code}`]: { s: id, at: now } };
    await DB.update("", up);
    addingNew = false; selectSession(id);
    return code;
  }

  // ---- thanh điều khiển tiết đang diễn ra ----
  function sessionCard() {
    const live = sess.live || {}, groups = Object.keys(sess.groups || {}), cs = (sess.claims || {}).students || {};
    const joined = Object.keys(sess.roster || {}).filter((s) => cs[s]).length, online = groups.filter(isOnline).length;
    const scores = groups.map((g) => C.scoreGroup(sess, g, info).score), avg = scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
    const acts = L ? L.activities : [], ti = typeof live.teacherIdx === "number" ? live.teacherIdx : -1, cur = acts[ti], aid = cur ? cur.id || "a" + ti : null;
    const hasItems = aid && info.items.some((it) => it.aid === aid);
    // MỘT đồng hồ chung (cùng ⏱️ trên bài giảng và bảng 📊): HS tự làm -> chỉ báo giờ; theo nhịp -> hết giờ khóa, 🏁 công bố
    const k = aid ? C.actClock(live, aid, DB.now()) : null, kst = k ? (k.over ? "locked" : k.st) : "";
    const navHtml = live.follow
      ? `👣 HS đang ở: <select id="selIdx"><option value="-1">🏠 Trang đầu</option>${acts.map((a, i) => `<option value="${i}" ${i === ti ? "selected" : ""}>${i + 1}. ${esc(a.name)}</option>`).join("")}</select>
        <button class="btn small ghost" id="idxPrev">◀</button><button class="btn small" id="idxNext">Tiếp ▶</button>`
      : `📍 Đang chiếu: <b>${cur ? esc(cur.name) : "Trang đầu"}</b>`;
    const tctl = !k ? "" : `<span class="actctl"><span class="clock ${kst}" id="actClock">${clockText(k, cur)}</span>
      ${k.st === "revealed" ? `<button class="btn small ghost" data-act="reopen">↺ Mở lại</button>` : `${k.running ? `<button class="btn small ghost" data-act="pause">⏸ Dừng giờ</button>` : kst !== "locked" ? `<button class="btn small" data-act="start">▶ Bấm giờ</button>` : ""}
      ${kst !== "locked" ? `<button class="btn small ghost" data-act="add" data-sec="-60" title="Bớt 1 phút">−1p</button><button class="btn small ghost" data-act="add" data-sec="-30">−30s</button><button class="btn small ghost" data-act="add" data-sec="30">+30s</button><button class="btn small ghost" data-act="add" data-sec="60" title="Thêm 1 phút">+1p</button>` : ""}
      <button class="btn small ghost" data-act="reset" title="Đặt lại đồng hồ về thời gian mặc định">↺</button>
      ${live.follow && hasItems ? `<button class="btn small ok" data-act="end">🏁 Kết thúc & công bố</button>` : ""}`}
      ${hasItems ? `<button class="btn small ghost" id="btnRedoAll" title="Xóa kết quả hoạt động này của tất cả nhóm để cả lớp làm lại">🔄 Cả lớp làm lại</button>` : ""}</span>`;
    const actRow = `<div class="follow-row">${navHtml}${tctl}${!live.follow && k ? `<span class="hint">HS tự làm: đồng hồ hiện trên máy HS, hết giờ chỉ báo (không khóa).</span>` : ""}</div>`;
    return `<div class="card">
      <div class="ctrl">
        <a class="btn" href="/lessons/${encodeURIComponent(sess.meta.lessonId)}/?gv=1&s=${encodeURIComponent(activeId)}" target="_blank">📺 Mở bài giảng để trình chiếu</a>
        <span class="pill ${sess.meta.mode === "self" ? "good" : ""}" title="Kiểu tiết">${sess.meta.mode === "self" ? "🏠 Tự học cá nhân" : "🖥️ Phòng máy"}</span>
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
  const clockText = (k, a) => (k.st === "revealed" ? "🏁 Đã công bố" : k.st === "locked" || k.over ? "⏰ Hết giờ" : k.running ? "⏱ " + C.fmtClock(k.left) : "⏱ " + C.fmtClock(k.left || (a && a.time) || 60) + " (chưa bấm)");
  function bindHead() {
    document.querySelectorAll("#headBox [data-sess]").forEach((b) => { b.onclick = () => { addingNew = false; selectSession(b.dataset.sess); }; });
    const addB = $("#btnAddSess"); if (addB) addB.onclick = () => { addingNew = true; selectSession(null); };
    if (!hasSess()) {
      const b = $("#btnStart"); if (b) b.onclick = () => { const classId = $("#selClass").value, lessonId = $("#selLesson").value, mode = (document.querySelector("input[name=sessMode]:checked") || {}).value || "room"; LS.set("lh_last", { classId, lessonId, mode }); b.disabled = true; startSession(classId, lessonId, mode).then((code) => { toast("Đã bắt đầu tiết học — mã vào lớp: " + code); tab = "groups"; LS.set("lh_tab", tab); showQR(code); }).catch((e) => { b.disabled = false; alert("⚠️ " + (e.message || e)); }); };
      const saveCfg = () => act(DB.set("teacher/config", { machines: Math.max(0, Math.min(99, +$("#cfgM").value || 0)), phones: Math.max(0, Math.min(99, +$("#cfgP").value || 0)) }), "Đã lưu số máy của phòng.");
      ["#cfgM", "#cfgP"].forEach((s) => { const x = $(s); if (x) x.onchange = saveCfg; });
      return;
    }
    const live = sess.live || {};
    document.querySelectorAll("[data-set]").forEach((b) => { b.onclick = () => {
      const k = b.dataset.set, v = k === "showScore" ? live.showScore === false : !live[k];
      if (k === "follow" && v) return act(DB.update(S("live"), Object.assign({ follow: true }, C.followFixups(live, DB.now())))); // đồng hồ đang chạy lúc tự làm -> thành đồng hồ theo nhịp
      act(DB.set(S("live/" + k), v));
    }; });
    $("#btnEnd").onclick = () => { const m = sess.meta; if (confirm(`Kết thúc tiết ${m.className} · ${m.lessonTitle}?\nMáy HS của tiết này sẽ báo kết thúc (các tiết khác vẫn mở). Kết quả vẫn lưu trong 🕘 Lịch sử để xuất Excel.`)) act(DB.update("", closeSession({}, activeId)), "Đã kết thúc tiết học."); };
    $("#btnBoard").onclick = showBoard;
    $("#btnExport").onclick = () => exportSession(sess, activeId);
    const sel = $("#selIdx");
    if (sel) {
      const n = L ? L.activities.length : 0, ti = typeof live.teacherIdx === "number" ? live.teacherIdx : -1;
      const go = (i) => act(DB.set(S("live/teacherIdx"), Math.max(-1, Math.min(n - 1, i))));
      sel.onchange = () => go(+sel.value); $("#idxPrev").onclick = () => go(ti - 1); $("#idxNext").onclick = () => go(ti + 1);
    }
    const ti = typeof live.teacherIdx === "number" ? live.teacherIdx : -1, curA = L && L.activities[ti], curAid = curA && (curA.id || "a" + ti);
    document.querySelectorAll("#headBox [data-act]").forEach((b) => { b.onclick = () => { if (curA) act(C.actControl(DB, activeId, live, curAid, b.dataset.act, b.dataset.act === "add" ? +b.dataset.sec : curA.time || 60, curA.time || 60)); }; });
    const redo = $("#btnRedoAll");
    if (redo) redo.onclick = () => {
      if (!curA || !confirm(`Cho CẢ LỚP làm lại “${curA.name}”?
Kết quả hoạt động này của tất cả các nhóm sẽ bị xóa; máy HS tự mở lại để làm.`)) return;
      const up = { [`live/acts/${curAid}`]: null }; Object.keys(sess.groups || {}).forEach((g) => { up[`answers/${g}/${curAid}`] = null; });
      act(DB.update(S(""), up), "Đã cho cả lớp làm lại hoạt động này.");
    };
  }
  // đồng hồ hoạt động trên bảng GV
  setInterval(() => {
    const c = $("#actClock"); if (!c || !hasSess() || !L) return;
    const live = sess.live || {}, ti = live.teacherIdx, a = L.activities[ti]; if (!a) return;
    const k = C.actClock(live, a.id || "a" + ti, DB.now());
    if (!c.classList.contains(k.over ? "locked" : k.st)) return schedule();
    c.textContent = clockText(k, a);
  }, 500);
  const isOnline = (gid) => { const n = ((sess.groups || {})[gid] || {}).nav; return !!n && DB.now() - (n.at || 0) < 50000; };

  // ======================== TAB: NHÓM ========================
  function tabGroups(body) {
    const gs = Object.entries(sess.groups || {}).map(([id, g]) => ({ id, ...g, nm: C.groupName(sess, id), ord: ((sess.machines || {})[g.machine] || {}).order || 0, sc: C.scoreGroup(sess, id, info), online: isOnline(id) }));
    if (!gs.length) { body.innerHTML = `<div class="card empty"><div class="big">📱</div><p>Chưa có nhóm nào vào lớp.<br>Học sinh mở <b>${esc(joinUrl())}</b> rồi nhập mã <b class="bigcode">${esc(curCode() || "…")}</b><br>hoặc quét mã QR bên trái.</p></div>`; return; }
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
      <span class="hint">Cột xanh = đáp án đúng.</span><span class="sp"></span>${Object.keys(sess.answers || {}).length ? `<button class="btn small" id="btnAI" title="Soạn câu lệnh ẩn danh để AI phân tích tiết học và gợi ý dạy lại">🤖 Trợ lý AI phân tích${((T.ai || {})[activeId] || {}).note ? " ✓" : ""}</button>` : `<button class="btn small" disabled title="Chưa có dữ liệu để phân tích">🤖 Chưa có dữ liệu để phân tích</button>`}</div>` + (its.length ? its.map((it, n) => {
      const recs = gs.map((g) => ({ g, r: C.answerOf(sess, g.id, it) })), done = recs.filter((x) => x.r);
      const avg = done.length ? done.reduce((t, x) => t + C.judge(it, x.r).fraction, 0) / done.length : 0, cls = !done.length ? "" : avg >= 0.8 ? "good" : avg >= 0.5 ? "mid" : "low";
      let det = "";
      if (it.q && (it.q.type === "sheet" || it.q.type === "short" || it.q.type === "abacus")) det = C.choiceDist(done.map((x) => x.r.choice), it.q.answer, 5, it.q.mode === "formula" || it.q.type === "short" || it.q.type === "abacus" ? (k) => C.judgeQuestion(it.q, k) : null, it.q.type === "short" ? (it.q.exact ? C.normExact : C.normShort) : it.q.type === "abacus" ? C.abDigits : null).map((d) => optRow(it.q.type === "short" ? "✍️" : it.q.type === "abacus" ? "🧮" : "📍", d.label, d.n, gs.length, d.right)).join("");
      else if (it.q && it.q.type !== "true-false") { const q = it.q; det = (q.options || []).map((o, k) => optRow(KEYS[k], o, done.filter((x) => { const c = x.r.choice; return Array.isArray(c) ? c.map(Number).includes(k) : c === k; }).length, gs.length, q.type === "multiple-select" ? (q.answer || []).includes(k) : q.answer === k)).join(""); }
      else if (it.q) det = [["Đúng", true], ["Sai", false]].map(([lb, v], k) => optRow(KEYS[k], lb, done.filter((x) => x.r.choice === v).length, gs.length, it.q.answer === v)).join("");
      else { const full = done.filter((x) => C.judge(it, x.r).ok).length; det = optRow("✓", "Đúng hết", full, gs.length, true) + optRow("~", "Có mục sai (tính theo tỉ lệ)", done.length - full, gs.length, false); }
      det += optRow("–", "Chưa làm", gs.length - done.length, gs.length, false, "none");
      const wait = recs.filter((x) => !x.r).map((x) => esc(x.g.nm)), excl = (live.excluded || {})[it.aid], st = C.actState(live, it.aid, DB.now());
      return `<div class="q"><div class="qh"><span class="t">${n + 1}. ${esc(it.label)}${excl ? ` <span class="pill">không tính điểm</span>` : ""}${st !== "free" ? ` <span class="pill ${st}">${{ open: "đang làm", locked: "hết giờ", revealed: "đã công bố" }[st]}</span>` : ""}</span>
        <span class="pill">${done.length}/${gs.length} nhóm</span>${done.length ? `<span class="pill ${cls}">đạt ${pct(avg)}</span>` : ""}</div>${det}${wait.length ? `<div class="pending">⏳ Chưa làm: ${wait.join(", ")}</div>` : ""}</div>`;
    }).join("") : `<div class="card empty">Hoạt động này không có bài chấm điểm.</div>`);
    $("#actSel").value = actSel; $("#actSel").onchange = (e) => { actSel = e.target.value; renderAll(); };
    const ba = $("#btnAI"); if (ba) ba.onclick = () => { if (L) openAI(activeId, sess, L); else toast("Đang tải bài giảng…"); };
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
      ${roster.map(([s, st], i) => { const g = cs[s], sc = g && sess.groups[g] ? C.scoreGroup(sess, g, info) : null; return `<tr class="${g ? "" : "none"}"><td>${i + 1}</td><td>${esc(st.name)}${sess.meta.classId ? ` <button class="btn small ghost" data-evst="${s}" title="Xem hồ sơ đánh giá của em">🎯</button>` : ""}</td>
        <td><select data-move="${s}"><option value="">— chưa vào —</option>${gs.map((x) => `<option value="${x.id}" ${x.id === g ? "selected" : ""}>${esc(x.nm)}</option>`).join("")}</select></td>
        <td class="num">${sc ? `${sc.done}/${sc.total}` : ""}</td><td class="num">${sc ? fmt1(sc.score) : ""}</td></tr>`; }).join("")}</tbody></table>`;
    body.querySelectorAll("[data-evst]").forEach((b) => { b.onclick = () => { Object.assign(evS, { classId: sess.meta.classId, scope: "student", sid: b.dataset.evst }); LS.set("lh_eval", evS); evDetail = b.dataset.evst; tab = "eval"; LS.set("lh_tab", tab); $("#tabBody").innerHTML = ""; renderAll(); }; });
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
      <li>Ghép đôi / phân loại / sắp xếp / điền khuyết: HS làm hết rồi nộp; điểm = <b>tỉ lệ mục đúng của bài nộp</b> (chấm lại trên máy GV theo bài làm).</li>
      <li><b>HS tự làm:</b> chỉ tính lần nộp / lần trả lời đầu tiên; nộp xong HS xem ngay bài của mình đúng/sai từng mục.</li>
      <li><b>Theo nhịp GV:</b> tính bài làm cuối cùng lúc GV bấm Kết thúc / hết giờ (bài kéo thả làm đủ được tự lưu mỗi lần sửa); không làm = chưa làm.</li></ul>
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
  // Phân trang (tải nhanh khi lịch sử dài) + chọn nhiều để xóa. Tiết đang diễn ra không xóa được.
  let histPage = 0, histSize = LS.get("lh_hsize", 20); const histSel = new Set();
  const isOpenS = (id) => (((T.sessions || {})[id] || {}).status === "open");
  const histList = () => Object.entries(T.sessions || {}).map(([id, m]) => ({ id, ...m })).sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  async function deleteSessions(ids) {
    ids = ids.filter((id) => id && !isOpenS(id) && (T.sessions || {})[id]); if (!ids.length) return 0;
    for (let i = 0; i < ids.length; i += 40) { // ghi theo từng đợt cho nhẹ
      const up = {};
      await Promise.all(ids.slice(i, i + 40).map(async (id) => {
        up[`sessions/${id}`] = null; up[`teacher/sessions/${id}`] = null; up[`teacher/ai/${id}`] = null;
        const code = ((T.sessions || {})[id] || {}).code;
        if (code) { const c = await DB.get("codes/" + code).catch(() => null); if (c && c.s === id) up[`codes/${code}`] = null; }
      }));
      await DB.update("", up);
    }
    ids.forEach((id) => histSel.delete(id));
    return ids.length;
  }
  function tabHistory(body) {
    const h = histList();
    [...histSel].forEach((id) => { if (!(T.sessions || {})[id] || isOpenS(id)) histSel.delete(id); });
    if (!h.length) { body.innerHTML = `<div class="card empty">Chưa có tiết học nào.</div>`; return; }
    const pages = Math.max(1, Math.ceil(h.length / histSize)); histPage = Math.max(0, Math.min(pages - 1, histPage));
    const view = h.slice(histPage * histSize, (histPage + 1) * histSize), deletable = view.filter((x) => !isOpenS(x.id));
    const allOn = deletable.length > 0 && deletable.every((x) => histSel.has(x.id));
    const pager = pages > 1 ? `<div class="pager"><button class="btn small ghost" data-pg="0" ${histPage ? "" : "disabled"}>⏮</button><button class="btn small ghost" data-pg="${histPage - 1}" ${histPage ? "" : "disabled"}>◀</button>
      <span>Trang <b>${histPage + 1}</b>/${pages}</span><button class="btn small ghost" data-pg="${histPage + 1}" ${histPage < pages - 1 ? "" : "disabled"}>▶</button><button class="btn small ghost" data-pg="${pages - 1}" ${histPage < pages - 1 ? "" : "disabled"}>⏭</button></div>` : "";
    body.innerHTML = `<div class="toolbar"><button class="btn small danger" id="hDelSel" ${histSel.size ? "" : "disabled"}>🗑 Xóa các bài đã chọn${histSel.size ? ` (${histSel.size})` : ""}</button>
        <button class="btn small ghost" id="hDelAll">🗑 Xóa tất cả</button>${histSel.size ? `<button class="btn small ghost" id="hClear">Bỏ chọn</button>` : ""}
        <span class="sp"></span><span class="muted">${h.length} tiết học</span>
        <select id="hSize" title="Số tiết mỗi trang">${[10, 20, 50, 100].map((n) => `<option value="${n}" ${n === histSize ? "selected" : ""}>${n} / trang</option>`).join("")}</select></div>
      <table class="t"><thead><tr><th class="ck"><input type="checkbox" id="hAll" title="Chọn cả trang này" ${allOn ? "checked" : ""} ${deletable.length ? "" : "disabled"}></th><th>Thời gian</th><th>Lớp</th><th>Bài</th><th></th></tr></thead><tbody>${view.map((x) => `<tr class="${histSel.has(x.id) ? "sel" : ""}"><td class="ck">${isOpenS(x.id) ? "" : `<input type="checkbox" data-hs="${esc(x.id)}" ${histSel.has(x.id) ? "checked" : ""}>`}</td><td>${new Date(x.createdAt).toLocaleString("vi-VN", { dateStyle: "short", timeStyle: "short" })}</td><td><b>${esc(x.className)}</b></td><td>${esc(x.lessonTitle)}</td>
      <td class="nowrap"><button class="btn small ghost" data-xl="${esc(x.id)}">⬇️ Excel</button> <button class="btn small ghost" data-ai="${esc(x.id)}" title="Trợ lý AI phân tích tiết học">🤖 AI${((T.ai || {})[x.id] || {}).note ? " ✓" : ""}</button> ${isOpenS(x.id) ? `<span class="pill good">đang mở</span> <button class="btn small ghost" data-goto="${esc(x.id)}">👁 Xem</button>` : `<button class="btn small ghost" data-resume="${esc(x.id)}">▶ Mở lại</button> <button class="btn small ghost" data-hdel="${esc(x.id)}" title="Xóa tiết học này">🗑</button>`}</td></tr>`).join("")}</tbody></table>${pager}
      <p class="hint">Xóa là xóa hẳn kết quả của tiết học (không khôi phục được) — nên ⬇️ xuất Excel hoặc 📑 Xuất báo cáo trước khi xóa. Tiết đang mở không xóa được.</p>`;
    const redraw = () => { $("#tabBody").innerHTML = ""; renderAll(); };
    body.querySelectorAll("[data-pg]").forEach((b) => { b.onclick = () => { histPage = +b.dataset.pg; redraw(); }; });
    $("#hSize").onchange = (e) => { histSize = +e.target.value || 20; LS.set("lh_hsize", histSize); histPage = 0; redraw(); };
    body.querySelectorAll("[data-hs]").forEach((cb) => { cb.onchange = () => { if (cb.checked) histSel.add(cb.dataset.hs); else histSel.delete(cb.dataset.hs); redraw(); }; });
    $("#hAll").onchange = (e) => { deletable.forEach((x) => (e.target.checked ? histSel.add(x.id) : histSel.delete(x.id))); redraw(); };
    const clr = $("#hClear"); if (clr) clr.onclick = () => { histSel.clear(); redraw(); };
    const label = (id) => { const m = (T.sessions || {})[id] || {}; return `${m.className || "?"} · ${m.lessonTitle || ""} (${m.createdAt ? C.fmtDate(m.createdAt) : ""})`; };
    body.querySelectorAll("[data-hdel]").forEach((b) => { b.onclick = () => { const id = b.dataset.hdel; if (confirm(`Xóa tiết học này?\n${label(id)}\n\nKết quả của tiết sẽ bị xóa hẳn, không khôi phục được.`)) act(deleteSessions([id]), "Đã xóa tiết học."); }; });
    $("#hDelSel").onclick = () => { const ids = [...histSel]; if (ids.length && confirm(`Xóa ${ids.length} tiết học đã chọn?\n\nKết quả các tiết này sẽ bị xóa hẳn, không khôi phục được.`)) act(deleteSessions(ids).then((n) => toast(`Đã xóa ${n} tiết học.`))); };
    $("#hDelAll").onclick = () => {
      const ids = h.map((x) => x.id).filter((id) => !isOpenS(id)); if (!ids.length) return toast("Không có tiết nào xóa được (tiết đang mở không xóa).");
      if (!confirm(`XÓA TẤT CẢ ${ids.length} tiết học trong lịch sử?${openList().length ? "\n(Các tiết đang mở được giữ lại.)" : ""}\n\nToàn bộ kết quả sẽ bị xóa hẳn, không khôi phục được. Nên xuất báo cáo Excel trước.`)) return;
      if (prompt(`Gõ chữ XOA để xác nhận xóa ${ids.length} tiết học:`) !== "XOA") return toast("Đã hủy — chưa xóa gì.");
      act(deleteSessions(ids).then((n) => { histPage = 0; toast(`Đã xóa ${n} tiết học.`); }));
    };
    body.querySelectorAll("[data-xl]").forEach((b) => { b.onclick = () => act(DB.get("sessions/" + b.dataset.xl).then((s) => { if (!s) throw new Error("Không còn dữ liệu tiết này"); return exportSession(s, b.dataset.xl); })); });
    body.querySelectorAll("[data-ai]").forEach((b) => { b.onclick = () => act(DB.get("sessions/" + b.dataset.ai).then(async (s) => {
      if (!s) throw new Error("Không còn dữ liệu tiết này");
      if (!Object.keys(s.answers || {}).length && !Object.keys(s.texts || {}).length) return toast("Tiết này chưa có dữ liệu để phân tích.");
      openAI(b.dataset.ai, s, await C.loadLesson(s.meta.lessonId));
    })); });
    body.querySelectorAll("[data-goto]").forEach((b) => { b.onclick = () => { addingNew = false; selectSession(b.dataset.goto); tab = "groups"; LS.set("lh_tab", tab); }; });
    body.querySelectorAll("[data-resume]").forEach((b) => { b.onclick = () => {
      if (!confirm("Mở lại tiết này? (Các tiết đang mở vẫn chạy; HS nhập MÃ MỚI rồi vào lại bằng máy/tên cũ.)")) return;
      const id = b.dataset.resume;
      act(newCode(openList().map((x) => x.code)).then((code) => DB.update("", { [`sessions/${id}/meta/status`]: "open", [`sessions/${id}/meta/code`]: code, [`teacher/sessions/${id}/status`]: "open", [`teacher/sessions/${id}/code`]: code, [`codes/${code}`]: { s: id, at: DB.now() } })), "Đã mở lại tiết học — có mã vào lớp mới.").then(() => { addingNew = false; selectSession(id); tab = "groups"; LS.set("lh_tab", tab); });
    }; });
  }
  // ======================== TAB: XUẤT BÁO CÁO ========================
  // Lọc Khối – Lớp – Tháng – Năm (chọn nhiều; không chọn = Tất cả) → Excel: sheet Tổng hợp + mỗi lớp 1 sheet
  const REP_F = ["grades", "classes", "months", "years"];
  const rep = Object.assign({ grades: [], classes: [], months: [], years: [] }, LS.get("lh_rep", {}));
  let repBusy = false;
  const clsKey = (m) => m.classId || "n:" + C.norm(m.className);
  function repSessions() {
    return Object.entries(T.sessions || {}).map(([id, m]) => { const d = new Date(m.createdAt || 0); return { id, m, grade: C.gradeOf(m.className, m.lessonId), cls: clsKey(m), month: d.getMonth() + 1, year: d.getFullYear() }; });
  }
  function tabReport(body) {
    const all = repSessions();
    if (!all.length) { body.innerHTML = `<div class="card empty">Chưa có tiết học nào để lập báo cáo.</div>`; return; }
    const has = (f, v) => !rep[f].length || rep[f].map(String).includes(String(v));
    const gradesAll = [...new Set(all.map((x) => x.grade))].sort((a, b) => String(a).localeCompare(String(b), "vi", { numeric: true }));
    const clsMap = new Map(); all.filter((x) => has("grades", x.grade)).forEach((x) => { if (!clsMap.has(x.cls) || (clsMap.get(x.cls).at < (x.m.createdAt || 0))) clsMap.set(x.cls, { name: x.m.className, at: x.m.createdAt || 0, grade: x.grade }); });
    rep.classes = rep.classes.filter((k) => clsMap.has(k)); // bỏ lớp không thuộc khối đã chọn
    const clsAll = [...clsMap.entries()].sort((a, b) => String(a[1].name).localeCompare(String(b[1].name), "vi", { numeric: true }));
    const yearsAll = [...new Set(all.map((x) => x.year))].sort((a, b) => a - b);
    const pass = all.filter((x) => REP_F.every((f) => has(f, { grades: x.grade, classes: x.cls, months: x.month, years: x.year }[f])));
    const byCls = new Map(); pass.forEach((x) => { const c = byCls.get(x.cls) || { name: x.m.className, grade: x.grade, n: 0, lessons: new Set() }; c.n++; c.lessons.add(String(x.m.lessonTitle || "").split(":")[0]); byCls.set(x.cls, c); });
    const chips = (f, label, opts) => `<div class="fl"><b>${label}</b><button class="chip2 ${rep[f].length ? "" : "on"}" data-f="${f}" data-v="">Tất cả</button>${opts.map(([v, t]) => `<button class="chip2 ${rep[f].map(String).includes(String(v)) ? "on" : ""}" data-f="${f}" data-v="${esc(v)}">${esc(t)}</button>`).join("")}</div>`;
    body.innerHTML = `<div class="card"><h3>📑 Xuất báo cáo điểm học sinh</h3>
        <p class="hint">Chọn một hoặc nhiều mục ở mỗi tiêu chí; không chọn (Tất cả) là lấy hết. File Excel gồm sheet <b>Tổng hợp</b> (điểm TB của lớp theo từng bài) và <b>mỗi lớp 1 sheet</b> (mỗi tiết học 1 cột có ghi ngày, cột Số tiết tham gia, Tổng điểm, Trung bình; HS vắng để “Vắng”, không tính vào Trung bình).</p>
        ${chips("grades", "Khối", gradesAll.map((g) => [g, g === "Khác" ? "Khác" : "Khối " + g]))}
        ${chips("classes", "Lớp", clsAll.map(([k, c]) => [k, c.name]))}
        ${chips("months", "Tháng", Array.from({ length: 12 }, (_, i) => [i + 1, "T" + (i + 1)]))}
        ${chips("years", "Năm", yearsAll.map((y) => [y, String(y)]))}
        <div class="row rep-go"><button class="btn big" id="repGo" ${pass.length && !repBusy ? "" : "disabled"}>${repBusy ? "⏳ Đang lập báo cáo…" : "⬇️ Xuất báo cáo Excel"}</button><span class="muted" id="repMsg">${pass.length ? `${pass.length} tiết học · ${byCls.size} lớp khớp bộ lọc` : "Không có tiết học nào khớp bộ lọc."}</span></div></div>
      ${byCls.size ? `<table class="t"><thead><tr><th>Khối</th><th>Lớp</th><th>Số tiết</th><th>Các bài</th></tr></thead><tbody>${[...byCls.values()].sort((a, b) => String(a.name).localeCompare(String(b.name), "vi", { numeric: true })).map((c) => `<tr><td>${esc(c.grade)}</td><td><b>${esc(c.name)}</b></td><td class="num">${c.n}</td><td>${esc([...c.lessons].join(", "))}</td></tr>`).join("")}</tbody></table>` : ""}`;
    body.querySelectorAll("[data-f]").forEach((b) => { b.onclick = () => {
      const f = b.dataset.f, v = b.dataset.v;
      if (!v) rep[f] = []; else { const cur = rep[f].map(String), i = cur.indexOf(v); if (i >= 0) rep[f].splice(i, 1); else rep[f].push(f === "months" || f === "years" ? +v : v); }
      LS.set("lh_rep", rep); $("#tabBody").innerHTML = ""; renderAll();
    }; });
    $("#repGo").onclick = () => exportReport(pass, clsMap);
  }
  async function exportReport(pass, clsMap) {
    if (repBusy) return; repBusy = true; const msg = () => $("#repMsg"), btn = () => $("#repGo");
    if (btn()) { btn().disabled = true; btn().textContent = "⏳ Đang lập báo cáo…"; }
    try {
      const sessions = []; let k = 0;
      for (let i = 0; i < pass.length; i += 6) { // tải dữ liệu từng đợt 6 tiết
        const got = await Promise.all(pass.slice(i, i + 6).map((x) => DB.get("sessions/" + x.id).then((s) => (s ? Object.assign(s, { id: x.id, meta: Object.assign({}, x.m, s.meta || {}) }) : null)).catch(() => null)));
        got.forEach((s) => { if (s) sessions.push(s); }); k += got.length; if (msg()) msg().textContent = `Đang tải dữ liệu ${k}/${pass.length} tiết…`;
      }
      if (!sessions.length) throw new Error("Không tải được dữ liệu các tiết học.");
      const lessons = {};
      await Promise.all([...new Set(sessions.map((s) => s.meta.lessonId))].map((id) => C.loadLesson(id).then((L) => { lessons[id] = L; }).catch(() => {})));
      const names = (f, fmt) => (rep[f].length ? rep[f].map(fmt).join(", ") : "Tất cả");
      const text = `Khối: ${names("grades", (g) => g)}   ·   Lớp: ${names("classes", (c) => (clsMap.get(c) || {}).name || c)}   ·   Tháng: ${names("months", (m) => m)}   ·   Năm: ${names("years", (y) => y)}   ·   Xuất ngày ${C.fmtDate(DB.now())}`;
      const wb = C.reportWorkbook(sessions, lessons, T.classes || {}, text);
      XLSX.download(wb.sheets, wb.filename); toast("Đã xuất " + wb.filename);
      const miss = sessions.filter((s) => !lessons[s.meta.lessonId]).length;
      if (miss) alert(`⚠️ ${miss} tiết học thuộc bài giảng không còn trong danh mục nên không tính được điểm (để trống).`);
    } catch (e) { alert("⚠️ " + (e.message || e)); }
    finally { repBusy = false; if (tab === "report") { $("#tabBody").innerHTML = ""; renderAll(); } }
  }

  async function exportSession(s, id) {
    const Lx = await C.loadLesson(s.meta.lessonId);
    const wb = C.sessionWorkbook(s, Lx, ((T.ai || {})[id] || {}).note);
    XLSX.download(wb.sheets, wb.filename); toast("Đã xuất " + wb.filename);
  }

  // ======================== 🤖 TRỢ LÝ AI PHÂN TÍCH TIẾT HỌC (B1) ========================
  // Soạn câu lệnh ẩn danh (C.aiPrompt) -> GV sao chép, dán vào Claude/ChatGPT/Gemini; dán lại câu trả lời để lưu cùng tiết.
  // Lưu ở teacher/ai/{id} (nhánh của GV -> không phải sửa luật Firebase). Không gọi API, không cần khoá.
  async function copyText(text, ta) {
    try { if (navigator.clipboard && window.isSecureContext) { await navigator.clipboard.writeText(text); return true; } } catch (e) {}
    try { // bản LAN mở bằng http://192.168… không phải “secure context” -> chép kiểu cũ
      const t = ta || Object.assign(document.createElement("textarea"), { value: text }); if (!ta) { t.style.position = "fixed"; t.style.opacity = "0"; document.body.appendChild(t); }
      t.focus(); t.select(); const ok = document.execCommand("copy"); if (!ta) t.remove(); return ok;
    } catch (e) { return false; }
  }
  function downloadText(text, name, type) { const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([text], { type: (type || "text/plain") + ";charset=utf-8" })); a.download = name.replace(/[\\/:*?"<>|]/g, "-"); document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500); }
  const AI_LINKS = `<a class="btn ghost" href="https://claude.ai/new" target="_blank" rel="noopener">Mở Claude</a><a class="btn ghost" href="https://chatgpt.com/" target="_blank" rel="noopener">Mở ChatGPT</a><a class="btn ghost" href="https://gemini.google.com/app" target="_blank" rel="noopener">Mở Gemini</a>`;
  function openAI(id, s, Lx) {
    const m = s.meta || {}, saved = (T.ai || {})[id] || {};
    openOverlay("ai", `<div class="card dlg ai-dlg"><h2>🤖 Trợ lý AI phân tích tiết học — ${esc(m.className)} · ${esc(m.lessonTitle)} (${C.fmtDate(m.createdAt || DB.now())})</h2>
      <p class="ai-safe">🔒 Nội dung dưới đây KHÔNG chứa họ tên học sinh (đã thay bằng [HS]). Thầy/cô đọc lại trước khi dán.</p>
      <div class="row"><label class="chk"><input type="checkbox" id="aiTexts" checked> Kèm câu trả lời tự luận</label><label class="chk"><input type="checkbox" id="aiInc" checked> Chỉ các hoạt động được tính điểm</label></div>
      <div id="aiWarn"></div>
      <textarea id="aiPrompt" class="ai-ta" spellcheck="false"></textarea>
      <p class="muted" id="aiStats"></p>
      <div class="row ai-btns"><button class="btn" id="aiCopy">📋 Sao chép</button>${AI_LINKS}</div>
      <h3>Lưu nhận xét của AI <span class="muted">(không bắt buộc)</span></h3>
      <textarea id="aiNote" class="ai-ta small" placeholder="Dán câu trả lời của AI vào đây…">${esc(saved.note || "")}</textarea>
      <div class="row"><button class="btn" id="aiSave">💾 Lưu cùng tiết học</button><button class="btn ghost" id="aiTxt">⬇️ Tải về .txt</button><span class="muted" id="aiSavedAt">${saved.at ? "Đã lưu lúc " + C.fmtTime(saved.at) + " " + C.fmtDate(saved.at) : ""}</span></div>
      <p class="hint">AI chỉ gợi ý cách dạy lại. Điểm số vẫn do hệ thống chấm theo đáp án; giáo viên quyết định nội dung dạy.</p></div>`);
    const build = () => {
      const r = C.aiPrompt(s, Lx, { withTexts: $("#aiTexts").checked, onlyIncluded: $("#aiInc").checked });
      $("#aiPrompt").value = r.text;
      $("#aiStats").textContent = `${r.stats.groups} nhóm · ${r.stats.items} câu · ${r.stats.texts} câu tự luận · ${r.stats.chars.toLocaleString("vi-VN")} ký tự`;
      $("#aiWarn").innerHTML = r.warnings.map((w) => `<p class="ai-warn">⚠️ ${esc(w)}</p>`).join("");
    };
    build(); $("#aiTexts").onchange = build; $("#aiInc").onchange = build;
    $("#aiCopy").onclick = async () => {
      const ok = await copyText($("#aiPrompt").value, $("#aiPrompt"));
      toast(ok ? "Đã sao chép câu lệnh — dán vào Claude / ChatGPT / Gemini." : "Không tự sao chép được — bấm vào ô, Ctrl+A rồi Ctrl+C.");
      if (ok) DB.set(`teacher/ai/${id}/copiedAt`, DB.now()).catch(() => {});
    };
    $("#aiSave").onclick = () => {
      const note = $("#aiNote").value.trim().slice(0, 20000), at = DB.now();
      act(DB.update(`teacher/ai/${id}`, { at: note ? at : null, note: note || null, chars: note ? note.length : null }), note ? "Đã lưu nhận xét của AI cùng tiết học." : "Đã xoá nhận xét đã lưu.")
        .then(() => { $("#aiSavedAt").textContent = note ? "Đã lưu lúc " + C.fmtTime(at) + " " + C.fmtDate(at) : ""; });
    };
    $("#aiTxt").onclick = () => downloadText(($("#aiNote").value.trim() ? "=== NHẬN XÉT CỦA AI ===\n" + $("#aiNote").value.trim() + "\n\n" : "") + "=== CÂU LỆNH ĐÃ GỬI ===\n" + $("#aiPrompt").value, `AI_${m.className}_${String(m.lessonTitle || "").split(":")[0]}_${C.fmtDate(m.createdAt || DB.now()).replace(/\//g, "-")}.txt`);
  }

  // ======================== TẢI CHI TIẾT NHIỀU TIẾT (dùng chung B2, B3) ========================
  // Theo đợt 6 tiết; tiết đã kết thúc giữ trong bộ nhớ (không lưu localStorage vì có họ tên HS); tiết đang mở luôn tải lại.
  const detailCache = new Map();
  async function loadSessionsDetail(ids, onProgress) {
    const fresh = {}, failed = [], need = ids.filter((id) => !detailCache.has(id)); let k = ids.length - need.length;
    if (onProgress) onProgress(k, ids.length);
    for (let i = 0; i < need.length; i += 6) {
      await Promise.all(need.slice(i, i + 6).map((id) => DB.get("sessions/" + id).then((s) => {
        if (!s) return failed.push(id);
        s.id = id; s.meta = Object.assign({}, (T.sessions || {})[id] || {}, s.meta || {});
        if (s.meta.status === "open") fresh[id] = s; else detailCache.set(id, s);
      }).catch(() => failed.push(id))));
      k += need.slice(i, i + 6).length; if (onProgress) onProgress(k, ids.length);
    }
    const sessions = ids.map((id) => detailCache.get(id) || fresh[id]).filter(Boolean), lessons = {}, missing = [];
    await Promise.all([...new Set(sessions.map((s) => s.meta.lessonId))].map((id) => C.loadLesson(id).then((Lx) => { lessons[id] = Lx; }).catch(() => missing.push(id))));
    return { sessions, lessons, failed, missing };
  }
  const chipsRow = (label, key, opts, sel) => `<div class="fl"><b>${label}</b><button class="chip2 ${sel.length ? "" : "on"}" data-ck="${key}" data-cv="">Tất cả</button>${opts.map(([v, t]) => `<button class="chip2 ${sel.map(String).includes(String(v)) ? "on" : ""}" data-ck="${key}" data-cv="${esc(v)}">${esc(t)}</button>`).join("")}</div>`;
  const PERIODS = [["all", "Tất cả"], ["month", "Tháng này"], ["d30", "30 ngày qua"], ["hk1", "Học kì I"], ["hk2", "Học kì II"], ["year", "Cả năm học"], ["custom", "Tùy chọn"]];
  const pc0 = (x) => (x == null ? "—" : Math.round(x * 100) + "%"), n1 = (x) => (x == null ? "—" : fmt1(x));

  // ======================== TAB: 📈 TỔNG QUAN TÁC ĐỘNG (B2) ========================
  const impF = Object.assign({ period: "all", from: "", to: "", mode: "all", classes: [], grades: [], hideTest: true }, LS.get("lh_impact", {}));
  let impData = null, impBusy = false, impShowHidden = false;
  function impLoad() {
    impBusy = true; const ids = Object.keys(T.sessions || {});
    loadSessionsDetail(ids, (k, n) => { const e = $("#impProg"); if (e) e.textContent = `Đang tải ${k}/${n} tiết…`; })
      .then((d) => { impData = d; }).catch((e) => toast("Không tải được dữ liệu: " + (e.message || e))).finally(() => { impBusy = false; if (tab === "impact") { $("#tabBody").innerHTML = ""; renderAll(); } });
  }
  function weekChart(byWeek) {
    if (!byWeek.length) return "";
    const W = 760, H = 240, pl = 30, pr = 30, pt = 34, pb = 30, n = byWeek.length, bw = Math.min(46, (W - pl - pr) / n * 0.6), maxS = Math.max(1, ...byWeek.map((w) => w.sessions));
    const x = (i) => pl + (W - pl - pr) * (i + 0.5) / n, yS = (v) => H - pb - (H - pt - pb) * v / maxS, yA = (v) => H - pb - (H - pt - pb) * v / 10;
    const bars = byWeek.map((w, i) => `<rect x="${x(i) - bw / 2}" y="${yS(w.sessions)}" width="${bw}" height="${H - pb - yS(w.sessions)}" rx="4" class="imp-bar"><title>${w.sessions} tiết</title></rect><text x="${x(i)}" y="${H - pb - 6}" class="imp-bv">${w.sessions}</text><text x="${x(i)}" y="${H - pb + 16}" class="imp-ax">${C.fmtDate(w.week).slice(0, 5)}</text>`).join("");
    const pts = byWeek.map((w, i) => (w.avg == null ? null : [x(i), yA(w.avg), w.avg])).filter(Boolean);
    const line = pts.length ? `<polyline points="${pts.map((p) => p[0] + "," + p[1]).join(" ")}" class="imp-line"/>${pts.map((p) => `<circle cx="${p[0]}" cy="${p[1]}" r="4.5" class="imp-dot"/><text x="${p[0]}" y="${p[1] - 9}" class="imp-lv">${fmt1(p[2])}</text>`).join("")}` : "";
    const grid = [0, 5, 10].map((v) => `<line x1="${pl}" x2="${W - pr}" y1="${yA(v)}" y2="${yA(v)}" class="imp-grid"/><text x="${W - pr + 6}" y="${yA(v) + 4}" class="imp-ax" text-anchor="start">${v}</text>`).join("");
    return `<svg viewBox="0 0 ${W} ${H}" class="imp-chart" text-anchor="middle" role="img" aria-label="Số tiết và điểm trung bình theo tuần">${grid}${bars}${line}<text x="${pl}" y="14" class="imp-ax" text-anchor="start">▮ Số tiết (số trong cột)   ● Điểm TB các nhóm (thang 10, trục bên phải)</text></svg>`;
  }
  function impFilterText(pr) {
    const cls = impF.classes.map((k) => { const m = Object.values(T.sessions || {}).find((x) => (x.classId || "n:" + C.norm(x.className)) === k); return m ? m.className : k; });
    return `Thời gian: ${pr.label} · Hình thức: ${{ all: "tất cả", room: "phòng máy", self: "tự học" }[impF.mode]} · Lớp: ${cls.length ? cls.join(", ") : "tất cả"} · Khối: ${impF.grades.length ? impF.grades.join(", ") : "tất cả"}${impF.hideTest ? " · đã ẩn tiết chạy thử" : ""}`;
  }
  function tabImpact(body) {
    const metas = Object.entries(T.sessions || {});
    if (!metas.length) { body.innerHTML = `<div class="card empty">📈 Chưa có tiết học nào. Dạy ít nhất 1 tiết rồi quay lại.</div>`; return; }
    if (!impData && !impBusy) impLoad();
    const clsOpts = [...new Map(metas.map(([, m]) => [m.classId || "n:" + C.norm(m.className), m.className])).entries()].sort((a, b) => String(a[1]).localeCompare(String(b[1]), "vi", { numeric: true }));
    const grOpts = [...new Set(metas.map(([, m]) => C.gradeOf(m.className, m.lessonId)))].sort((a, b) => String(a).localeCompare(String(b), "vi", { numeric: true })).map((g) => [g, g === "Khác" ? "Khác" : "Khối " + g]);
    const filters = `<div class="card imp-filters"><div class="fl"><b>Thời gian</b>${PERIODS.map(([k, t]) => `<button class="chip2 ${impF.period === k ? "on" : ""}" data-ip="${k}">${t}</button>`).join("")}
        ${impF.period === "custom" ? `<label class="imp-date">từ <input type="date" id="impFrom" value="${esc(impF.from)}"></label><label class="imp-date">đến <input type="date" id="impTo" value="${esc(impF.to)}"></label>` : ""}</div>
      <div class="fl"><b>Hình thức</b>${[["all", "Tất cả"], ["room", "🖥️ Phòng máy"], ["self", "🏠 Tự học"]].map(([k, t]) => `<button class="chip2 ${impF.mode === k ? "on" : ""}" data-im="${k}">${t}</button>`).join("")}</div>
      ${chipsRow("Khối", "grades", grOpts, impF.grades)}${chipsRow("Lớp", "classes", clsOpts, impF.classes)}
      <label class="chk"><input type="checkbox" id="impHide" ${impF.hideTest ? "checked" : ""}> Ẩn tiết chạy thử <span class="muted">(ít hơn 3 nhóm làm bài, hoặc tên lớp có “mẫu / thử / test”)</span></label></div>`;
    if (impBusy || !impData) { body.innerHTML = filters + `<div class="card empty"><p id="impProg">Đang tải dữ liệu các tiết…</p></div>`; bindImpact(body); return; }
    const pr = C.periodRange(impF.period, DB.now(), impF);
    const st = C.impactStats(impData.sessions, impData.lessons, T.classes, { from: pr.from, to: pr.to, mode: impF.mode, classes: impF.classes, grades: impF.grades, hideTest: impF.hideTest, ai: T.ai || {}, aiAvailable: true });
    const k = st.kpi, hiddenNote = st.hidden.length ? `<p class="hint">Đã ẩn ${st.hidden.length} tiết chạy thử — <button class="linkbtn" id="impShowH">${impShowHidden ? "ẩn danh sách" : "xem"}</button></p>${impShowHidden ? `<ul class="imp-hidden">${st.hidden.map((h) => `<li>${C.fmtDate(h.meta.createdAt || 0)} · ${esc(h.meta.className)} · ${esc(h.meta.lessonTitle)}</li>`).join("")}</ul>` : ""}` : "";
    const actions = `<div class="row imp-actions"><button class="btn" id="impXls" ${k.sessions ? "" : "disabled"}>⬇️ Xuất Excel minh chứng</button><button class="btn ghost" id="impCopy" ${k.sessions ? "" : "disabled"}>📋 Sao chép đoạn văn cho hồ sơ</button><button class="btn ghost" id="impPrint" ${k.sessions ? "" : "disabled"}>🖨️ Chế độ chụp màn hình</button><span class="sp"></span><button class="btn small ghost" id="impReload">🔄 Tải lại</button></div>`;
    if (!k.sessions) { body.innerHTML = filters + actions + `<div class="card empty">${st.hidden.length ? `Mọi tiết trong bộ lọc đều bị ẩn vì là tiết chạy thử. Bỏ tick <b>“Ẩn tiết chạy thử”</b> để xem.` : "Không có tiết học nào khớp bộ lọc."}</div>` + hiddenNote; bindImpact(body, st); return; }
    const card = (big, label, note) => `<div class="imp-kpi"><div class="imp-big">${big}</div><div class="imp-lab">${label}</div><div class="imp-note">${note}</div></div>`;
    const kpis = [card(k.sessions, "Số tiết đã dạy", "Số tiết sau bộ lọc"), card(`${k.classes} · ${k.lessons}`, "Số lớp · Số bài giảng", "Số lớp, số bài giảng khác nhau"), card(k.students.toLocaleString("vi-VN"), "Lượt HS tham gia", "Tổng HS đã vào nhóm của các tiết"),
      card(pc0(k.presentRate), "HS có mặt tham gia", "Σ HS vào nhóm ÷ Σ sĩ số (tiết phòng máy)"), card(pc0(k.answerRate), "Nhóm trả lời ≥ 80% câu", "TB mỗi tiết: nhóm làm ≥ 80% số bài ÷ số nhóm"),
      card(pc0(k.completion), "Tỉ lệ hoàn thành bài", "TB đã làm ÷ số bài được tính của các nhóm"), card(n1(k.avgScore), "Điểm trung bình", "TB điểm các nhóm, thang 10"), card(k.autoGraded.toLocaleString("vi-VN"), "Lượt trả lời chấm tự động", "Σ bài đã làm của mọi nhóm"),
      card(k.aiSessions, "Tiết có dùng AI phân tích", "Có sao chép câu lệnh hoặc lưu nhận xét 🤖")].join("");
    const arrow = (a, b) => (a == null || b == null ? "" : b > a ? ` <span class="up">▲</span>` : b < a ? ` <span class="down">▼</span>` : " ▬");
    body.innerHTML = filters + actions + `<div class="imp-wrap">
      <div class="card"><h3>📈 Tổng quan tác động <span class="muted">— ${esc(pr.label)}${impF.hideTest ? " · đã ẩn tiết chạy thử" : ""}</span></h3><div class="imp-kpis">${kpis}</div></div>
      <div class="card"><h3>Số tiết và điểm trung bình theo tuần</h3>${weekChart(st.byWeek)}</div>
      <div class="card"><h3>Theo lớp</h3><table class="t"><thead><tr><th>Lớp</th><th>Số tiết</th><th>Lượt HS</th><th>Tỉ lệ tham gia</th><th>Điểm TB</th><th>Tiết đầu → Tiết gần nhất</th></tr></thead><tbody>${st.byClass.map((c) => `<tr><td><b>${esc(c.name)}</b></td><td class="num">${c.sessions}</td><td class="num">${c.students}</td><td class="num">${pc0(c.presentRate)}</td><td class="num">${n1(c.avg)}</td><td class="num">${n1(c.first)} → ${n1(c.last)}${arrow(c.first, c.last)}</td></tr>`).join("")}</tbody></table><p class="hint">Các tiết khác bài nên chỉ để tham khảo xu hướng.</p></div>
      <div class="card"><h3>10 câu khó nhất <span class="muted">(ít nhất 5 nhóm làm)</span></h3>${st.hardest.length ? `<table class="t"><thead><tr><th>Bài</th><th>Câu hỏi / bài tập</th><th>Số nhóm làm</th><th>Tỉ lệ đạt</th></tr></thead><tbody>${st.hardest.map((h) => `<tr><td>${esc(String(h.lessonTitle).split(":")[0])}</td><td>${esc(h.label.length > 120 ? h.label.slice(0, 119) + "…" : h.label)}</td><td class="num">${h.done}</td><td class="num"><b>${pc0(h.rate)}</b></td></tr>`).join("")}</tbody></table>` : `<p class="muted">Chưa có câu nào đủ 5 nhóm làm.</p>`}</div>
      <div class="card"><h3>Theo bài giảng</h3><table class="t"><thead><tr><th>Bài</th><th>Số tiết</th><th>Điểm TB</th></tr></thead><tbody>${st.byLesson.map((l) => `<tr><td>${esc(l.title)}</td><td class="num">${l.sessions}</td><td class="num">${n1(l.avg)}</td></tr>`).join("")}</tbody></table></div></div>`
      + hiddenNote + (impData.failed.length || st.skipped.length ? `<p class="hint">Đã bỏ qua ${impData.failed.length + st.skipped.length} tiết (lỗi tải hoặc bài giảng không còn trong danh mục).</p>` : "");
    bindImpact(body, st, pr);
  }
  function bindImpact(body, st, pr) {
    const save = () => { LS.set("lh_impact", impF); $("#tabBody").innerHTML = ""; renderAll(); };
    body.querySelectorAll("[data-ip]").forEach((b) => { b.onclick = () => { impF.period = b.dataset.ip; save(); }; });
    body.querySelectorAll("[data-im]").forEach((b) => { b.onclick = () => { impF.mode = b.dataset.im; save(); }; });
    body.querySelectorAll("[data-ck]").forEach((b) => { b.onclick = () => { const f = b.dataset.ck, v = b.dataset.cv; if (!v) impF[f] = []; else { const i = impF[f].map(String).indexOf(v); if (i >= 0) impF[f].splice(i, 1); else impF[f].push(v); } save(); }; });
    ["#impFrom", "#impTo"].forEach((s) => { const e = $(s); if (e) e.onchange = () => { impF[s === "#impFrom" ? "from" : "to"] = e.value; save(); }; });
    const h = $("#impHide"); if (h) h.onchange = () => { impF.hideTest = h.checked; save(); };
    const sh = $("#impShowH"); if (sh) sh.onclick = () => { impShowHidden = !impShowHidden; $("#tabBody").innerHTML = ""; renderAll(); };
    const rl = $("#impReload"); if (rl) rl.onclick = () => { detailCache.clear(); impData = null; $("#tabBody").innerHTML = ""; renderAll(); };
    if (!st) return;
    const xl = $("#impXls"); if (xl) xl.onclick = () => { const wb = C.impactWorkbook(st, impFilterText(pr)); XLSX.download(wb.sheets, wb.filename); toast("Đã xuất " + wb.filename); };
    const cp = $("#impCopy"); if (cp) cp.onclick = async () => { const t = C.impactParagraph(st); const ok = await copyText(t); toast(ok ? "Đã sao chép đoạn văn — dán vào hồ sơ." : "Không sao chép được."); if (!ok) alert(t); };
    const pp = $("#impPrint"); if (pp) pp.onclick = () => { document.body.classList.add("imp-print"); toast("Chế độ chụp màn hình — bấm Esc để thoát."); };
  }
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && document.body.classList.contains("imp-print")) document.body.classList.remove("imp-print"); });

  // ======================== TAB: 🎯 ĐÁNH GIÁ HỌC SINH (B3) ========================
  const evS = Object.assign({ classId: "", period: "hk1", from: "", to: "", scope: "class", sid: "", crit: { minAvg: 5, drop: 1.5, absentRate: 0.3 }, hideTest: true, withTexts: true, withPrev: true, format: "md" }, LS.get("lh_eval", {}));
  let evData = null, evBusy = false, evCur = null, evImport = null, evDetail = null, evEditing = null, evEditDraft = {}, evReplyDraft = "";
  const evSave = () => { LS.set("lh_eval", evS); };
  const evRedraw = () => { $("#tabBody").innerHTML = ""; renderAll(); };
  const clsStudents = (cid) => C.sortedEntries(((T.classes || {})[cid] || {}).students);
  const nameOfSid = (cid, sid) => (((T.classes || {})[cid] || {}).students || {})[sid] ? T.classes[cid].students[sid].name : (evData && evData.names && evData.names[sid]) || "(HS đã chuyển lớp)";
  const evOf = (cid) => (T.studentEvals || {})[cid] || {};
  const lvlCls = (l) => ({ "Tốt": "good", "Khá": "mid", "Đạt": "", "Chưa đạt": "low" })[l] || "";
  const trendIc = (t) => ({ "tiến bộ": "▲", "ổn định": "▬", "giảm": "▼" })[t] || "?";
  function evLoad(cid) {
    evBusy = true; evData = null; const ids = Object.entries(T.sessions || {}).filter(([, m]) => m.classId === cid).map(([id]) => id);
    loadSessionsDetail(ids, (k, n) => { const e = $("#evProg"); if (e) e.textContent = `Đang tải ${k}/${n} tiết…`; })
      .then((d) => { const names = {}; d.sessions.forEach((s) => Object.entries(s.roster || {}).forEach(([sid, x]) => { names[sid] = x.name; })); evData = Object.assign(d, { classId: cid, names }); })
      .catch((e) => toast("Không tải được dữ liệu: " + (e.message || e))).finally(() => { evBusy = false; if (tab === "eval") evRedraw(); });
  }
  function evTimeline() {
    const pr = C.periodRange(evS.period, DB.now(), evS), names = {};
    clsStudents(evS.classId).forEach(([sid, x]) => { names[sid] = x.name; });
    const tl = C.studentTimeline(evData.sessions, evData.lessons, evS.classId, { from: pr.from, to: pr.to, hideTest: evS.hideTest, withTexts: evS.withTexts, names });
    const used = evData.sessions.filter((s) => s.meta.classId === evS.classId && (!pr.from || s.meta.createdAt >= pr.from) && (!pr.to || s.meta.createdAt <= pr.to) && !(evS.hideTest && C.isTestSession(s, 3)) && evData.lessons[s.meta.lessonId]);
    return { pr, tl, used };
  }
  function tabEval(body) {
    const cls = classList();
    if (!cls.length) { body.innerHTML = `<div class="card empty">Chưa có danh sách lớp — mở tab <b>📋 Danh sách lớp</b> trước.</div>`; return; }
    if (!evS.classId || !(T.classes || {})[evS.classId]) { evS.classId = cls[0][0]; evSave(); }
    if ((!evData || evData.classId !== evS.classId) && !evBusy) evLoad(evS.classId);
    const note = `<div class="card ev-note">⚖️ Nhận xét do AI gợi ý từ dữ liệu ẩn danh, chỉ để giáo viên tham khảo. Giáo viên đọc, sửa và bấm ‘Đã duyệt’ trước khi gửi phụ huynh. Ở phòng máy, các em ngồi chung máy dùng chung kết quả nên nhận xét cá nhân có độ tin cậy hạn chế.</div>`;
    const head = `<div class="card"><h3>① Chọn dữ liệu</h3><div class="row"><label class="f">Lớp <select id="evClass">${cls.map(([id, c]) => `<option value="${esc(id)}" ${id === evS.classId ? "selected" : ""}>${esc(c.name)}</option>`).join("")}</select></label></div>
      <div class="fl"><b>Thời gian</b>${PERIODS.filter(([k]) => k !== "all").map(([k, t]) => `<button class="chip2 ${evS.period === k ? "on" : ""}" data-ep="${k}">${t}</button>`).join("")}
        ${evS.period === "custom" ? `<label class="imp-date">từ <input type="date" id="evFrom" value="${esc(evS.from)}"></label><label class="imp-date">đến <input type="date" id="evTo" value="${esc(evS.to)}"></label>` : ""}</div>`;
    if (evBusy || !evData) { body.innerHTML = note + head + `<p id="evProg" class="hint">Đang tải dữ liệu các tiết của lớp…</p></div>`; bindEval(body); return; }
    const { pr, tl, used } = evTimeline(), sids = clsStudents(evS.classId).map(([sid]) => sid).filter((sid) => tl[sid]).concat(Object.keys(tl).filter((sid) => !clsStudents(evS.classId).some(([x]) => x === sid)));
    const sup = C.needSupport(tl, evS.crit), supMap = Object.fromEntries(sup.map((x) => [x.sid, x.reasons]));
    const target = evS.scope === "student" ? (tl[evS.sid] ? [evS.sid] : []) : evS.scope === "support" ? sids.filter((s) => supMap[s]) : sids;
    const nRoom = used.filter((s) => s.meta.mode !== "self").length;
    const opts = `<div class="fl"><b>Phạm vi</b>${[["class", "Cả lớp"], ["student", "Từng học sinh"], ["support", "Nhóm cần hỗ trợ"]].map(([k, t]) => `<button class="chip2 ${evS.scope === k ? "on" : ""}" data-es="${k}">${t}</button>`).join("")}</div>
      ${evS.scope === "student" ? `<label class="f">Học sinh <select id="evSid"><option value="">— chọn —</option>${sids.map((sid) => `<option value="${esc(sid)}" ${sid === evS.sid ? "selected" : ""}>${esc(nameOfSid(evS.classId, sid))}</option>`).join("")}</select></label>` : ""}
      ${evS.scope === "support" ? `<div class="row ev-crit">Tiêu chí: điểm TB &lt; <input type="number" step="0.5" id="evMin" value="${evS.crit.minAvg}"> · hoặc giảm ≥ <input type="number" step="0.5" id="evDrop" value="${evS.crit.drop}"> điểm (nửa đầu → nửa sau) · hoặc vắng ≥ <input type="number" step="5" id="evAbs" value="${Math.round(evS.crit.absentRate * 100)}">% số tiết</div>
        <div class="ev-sup">${sup.length ? sup.map((x) => `<span class="pill low">${esc(nameOfSid(evS.classId, x.sid))}: ${esc(x.reasons.join("; "))}</span>`).join("") : `<span class="muted">Không có học sinh nào khớp tiêu chí.</span>`}</div>` : ""}
      <div class="row"><label class="chk"><input type="checkbox" id="evHide" ${evS.hideTest ? "checked" : ""}> Ẩn tiết chạy thử</label><label class="chk"><input type="checkbox" id="evTexts" ${evS.withTexts ? "checked" : ""}> Kèm câu trả lời tự luận</label><label class="chk"><input type="checkbox" id="evPrev" ${evS.withPrev ? "checked" : ""}> Kèm nhận xét lần đánh giá trước</label></div>
      <p class="ev-sum"><b>${target.length}</b> học sinh · <b>${used.length}</b> tiết (${nRoom} phòng máy, ${used.length - nRoom} tự học) · ${esc(pr.label)}</p></div>`;
    // ② câu lệnh
    const cur = evCur && evCur.classId === evS.classId ? evCur : null;
    const block2 = `<div class="card"><h3>② Tạo câu lệnh cho AI</h3><div class="row"><b>Định dạng:</b><label class="chk"><input type="radio" name="evFmt" value="md" ${evS.format === "md" ? "checked" : ""}> Markdown <span class="muted">(dán thẳng vào khung chat)</span></label><label class="chk"><input type="radio" name="evFmt" value="json" ${evS.format === "json" ? "checked" : ""}> JSON <span class="muted">(dữ liệu có cấu trúc, đính kèm tệp)</span></label>
        <button class="btn" id="evMake" ${target.length && used.length ? "" : "disabled"}>✨ Tạo câu lệnh</button></div>
      ${cur ? `<p class="ai-safe">🔒 Câu lệnh không chứa họ tên học sinh. Bảng đối chiếu mã chỉ nằm trên máy/tài khoản giáo viên. <span class="muted">Mã lượt: ${esc(cur.id)}</span></p>
        ${cur.leaks.length ? `<p class="ai-warn">⛔ Đã chặn sao chép: câu lệnh còn ${cur.leaks.length} chỗ có thể lộ danh tính (${esc(cur.leaks.slice(0, 3).map((l) => l.what + " “" + l.text.slice(0, 20) + "…”").join("; "))}). Hãy bỏ tick “Kèm câu trả lời tự luận” rồi tạo lại.</p>` : ""}
        ${cur.parts.length > 1 ? `<div class="row">${cur.parts.map((_, i) => `<button class="chip2 ${i === cur.idx ? "on" : ""}" data-epart="${i}">Phần ${i + 1}/${cur.parts.length}</button>`).join("")}<span class="muted">Mỗi phần đầy đủ hướng dẫn — dán lần lượt từng phần, dán kết quả từng phần ở mục ③.</span></div>` : ""}
        <textarea id="evPrompt" class="ai-ta" spellcheck="false">${esc(cur.parts[cur.idx])}</textarea>
        <p class="muted">${cur.parts[cur.idx].length.toLocaleString("vi-VN")} ký tự · ${cur.parts.length} phần · ${cur.n} học sinh</p>
        <div class="row ai-btns"><button class="btn" id="evCopy" ${cur.leaks.length ? "disabled" : ""}>📋 Sao chép</button><button class="btn ghost" id="evDl" ${cur.leaks.length ? "disabled" : ""}>⬇️ Tải tệp .${cur.format}</button>${AI_LINKS}</div>` : `<p class="hint">Mỗi lần tạo là một lượt đánh giá mới; app gán mã HS01, HS02… ngẫu nhiên và lưu bảng đối chiếu trên tài khoản giáo viên.</p>`}</div>`;
    // ③ nhập kết quả
    const block3 = `<div class="card"><h3>③ Nhập kết quả từ AI</h3><textarea id="evReply" class="ai-ta small" placeholder="Dán nguyên văn câu trả lời JSON của AI vào đây (mỗi lần một phần)…">${esc(evReplyDraft)}</textarea>
      <div class="row"><button class="btn" id="evRead">📥 Đọc kết quả</button>${evImport && evImport.res && evImport.res.ok ? `<button class="btn ok" id="evStore">💾 Lưu kết quả</button>` : ""}</div>${evImportView()}</div>`;
    body.innerHTML = note + head + opts + block2 + block3 + evProfiles(sids, tl);
    bindEval(body, { tl, sids, target, supMap, pr, used });
  }
  function evImportView() {
    if (!evImport) return "";
    const r = evImport.res; if (!r.ok) return `<p class="ai-warn">⚠️ ${esc(r.error)}</p>`;
    const ev = (T.evals || {})[r.evaluationId] || {}, cid = ev.classId;
    const warn = (r.unknownCodes.length ? `<p class="ai-warn">Bỏ qua mã không có trong lượt đánh giá: ${esc(r.unknownCodes.join(", "))}</p>` : "") + (r.missingCodes.length ? `<p class="ai-warn">AI chưa đánh giá: ${esc(r.missingCodes.map((c) => c + " (" + nameOfSid(cid, ev.map[c]) + ")").join(", "))}</p>` : "");
    const ta = (i, f, v) => `<textarea data-er="${i}" data-ef="${f}" rows="3">${esc(v)}</textarea>`;
    return warn + `<p class="hint">Phần ${r.part} · ${r.students.length} học sinh. Mọi ô sửa được trước khi lưu (mỗi ý một dòng).</p><div class="ev-prev"><table class="t"><thead><tr><th>STT</th><th>Họ tên</th><th>Mức</th><th>Ưu điểm</th><th>Hạn chế</th><th>Tiến bộ</th><th>Cần cải thiện</th><th>Xem lại</th><th>Lời nhắn PH</th><th>Tin cậy</th></tr></thead><tbody>${evImport.rows.map((x, i) => `<tr><td>${i + 1}</td><td><b>${esc(nameOfSid(cid, x.sid))}</b>${x.warn.length ? `<br><span class="pill low" title="Thiếu: ${esc(x.warn.join(", "))}">⚠️ thiếu ${esc(x.warn.join(", "))}</span>` : ""}</td>
      <td><select data-er="${i}" data-ef="level">${["", "Tốt", "Khá", "Đạt", "Chưa đạt"].map((l) => `<option ${l === x.level ? "selected" : ""}>${l}</option>`).join("")}</select></td>
      <td>${ta(i, "strengths", x.strengths)}</td><td>${ta(i, "weaknesses", x.weaknesses)}</td><td>${ta(i, "progress", x.progress)}</td><td>${ta(i, "improve", x.improve)}</td><td>${ta(i, "review", x.review)}</td><td>${ta(i, "parentMessage", x.parentMessage)}</td><td>${esc(x.confidence)}</td></tr>`).join("")}</tbody></table></div>`;
  }
  function evProfiles(sids, tl) {
    const evs = evOf(evS.classId), latest = (sid) => Object.entries(evs[sid] || {}).sort((a, b) => (b[1].at || 0) - (a[1].at || 0));
    const rows = sids.map((sid, i) => { const L0 = latest(sid)[0], e = L0 && L0[1]; return `<tr class="${evDetail === sid ? "sel" : ""}"><td>${i + 1}</td><td><b>${esc(nameOfSid(evS.classId, sid))}</b></td><td>${e ? `<span class="pill ${lvlCls(e.level)}">${esc(e.level || "?")}</span>` : `<span class="muted">—</span>`}</td><td class="num">${e ? trendIc(e.progress && e.progress.trend) : ""}</td><td>${e ? (e.approved ? `<span class="pill good">✅ Đã duyệt</span>` : `<span class="pill mid">Nháp AI</span>`) : ""}</td><td>${latest(sid).length} lượt</td><td><button class="btn small ghost" data-epf="${esc(sid)}">Xem</button></td></tr>`; }).join("");
    // nhận xét chung của lớp / kế hoạch hỗ trợ (lượt gần nhất có) — mã HSxx đổi thành “em <Tên>”
    const le = Object.entries(T.evals || {}).filter(([, e]) => e.classId === evS.classId && (e.classSummary || e.supportPlan)).sort((a, b) => (b[1].createdAt || 0) - (a[1].createdAt || 0))[0];
    let common = "";
    if (le) {
      const ev = le[1], dec = (t) => C.decode(t, ev.map || {}, (sid) => nameOfSid(evS.classId, sid)), li = (a) => (a || []).map((t) => `<li>${esc(dec(t))}</li>`).join(""), cs = ev.classSummary || {};
      common = `<div class="ev-item"><b>📋 Nhận xét chung của lớp</b> <span class="muted">(lượt ${C.fmtDate(ev.createdAt || 0)}, AI gợi ý)</span>
        ${[["Điểm mạnh chung", cs.common_strengths], ["Lỗ hổng chung", cs.common_gaps], ["Gợi ý cho giáo viên", cs.suggestions]].filter(([, a]) => a && a.length).map(([k, a]) => `<p><b>${k}:</b></p><ul>${li(a)}</ul>`).join("")}
        ${(ev.supportPlan || []).length ? `<p><b>Kế hoạch hỗ trợ:</b></p><ul>${ev.supportPlan.map((p) => `<li><b>${esc((p.codes || []).map((c) => nameOfSid(evS.classId, (ev.map || {})[c])).join(", "))}</b> — ${esc(dec(p.goal))}${(p.weeks || []).length ? `<br><span class="muted">${esc(p.weeks.map(dec).join(" · "))}</span>` : ""}</li>`).join("")}</ul>` : ""}</div>`;
    }
    return `<div class="card"><h3>④ Hồ sơ từng học sinh</h3><div class="row"><button class="btn ghost" id="evXls">⬇️ Xuất Excel nhận xét</button></div>${common}
      <table class="t"><thead><tr><th>STT</th><th>Họ tên</th><th>Mức gần nhất</th><th>Xu hướng</th><th>Trạng thái</th><th>Số lượt</th><th></th></tr></thead><tbody>${rows || `<tr><td colspan="7" class="muted">Chưa có học sinh nào có dữ liệu trong khoảng thời gian này.</td></tr>`}</tbody></table>
      ${evDetail && tl[evDetail] ? evDetailView(evDetail, tl[evDetail]) : ""}</div>`;
  }
  function scoreChart(rec) {
    const e = rec.entries; if (!e.length) return "";
    const W = 640, H = 180, pl = 50, pr = 30, pt = 22, pb = 30, n = e.length, x = (i) => pl + (W - pl - pr) * (n === 1 ? 0.5 : i / (n - 1)), y = (v) => H - pb - (H - pt - pb) * v / 10;
    let path = "", started = false; e.forEach((p, i) => { if (!p.present) { started = false; return; } path += (started ? " L" : " M") + x(i) + "," + y(p.score); started = true; });
    return `<svg viewBox="0 0 ${W} ${H}" class="ev-chart" text-anchor="middle">${[0, 5, 10].map((v) => `<line x1="${pl}" x2="${W - pr}" y1="${y(v)}" y2="${y(v)}" class="imp-grid"/><text x="${pl - 6}" y="${y(v) + 4}" class="imp-ax" text-anchor="end">${v}</text>`).join("")}
      <path d="${path}" class="imp-line"/>${e.map((p, i) => (p.present ? `<circle cx="${x(i)}" cy="${y(p.score)}" r="5.5" class="${p.mode === "self" ? "ev-self" : "ev-room"}"><title>${C.fmtDate(p.date)} · ${esc(p.lessonTitle)} · ${p.mode === "self" ? "tự học" : "phòng máy, " + p.groupSize + " bạn"}: ${fmt1(p.score)}</title></circle><text x="${x(i)}" y="${y(p.score) - 10}" class="imp-lv">${fmt1(p.score)}</text>` : `<text x="${x(i)}" y="${y(1.5)}" class="imp-ax ev-abs">vắng</text>`) + `<text x="${x(i)}" y="${H - pb + 16}" class="imp-ax">${C.fmtDate(p.date).slice(0, 5)}</text>`).join("")}</svg>
      <p class="hint"><span class="ev-dot ev-room"></span> phòng máy (kết quả chung của nhóm) · <span class="ev-dot ev-self"></span> tự học (của riêng em) · “vắng” = không tham gia</p>`;
  }
  const lines = (a) => (Array.isArray(a) ? a.join("\n") : a || "");
  function evDetailView(sid, rec) {
    const evs = Object.entries(evOf(evS.classId)[sid] || {}).sort((a, b) => (b[1].at || 0) - (a[1].at || 0));
    const block = ([eid, e]) => evEditing === sid + "|" + eid
      ? `<div class="ev-item"><b>${C.fmtDate(e.at || 0)}</b> — sửa nhận xét<div class="ev-edit">${["level", "strengths", "weaknesses", "improve", "teacherNote", "parentMessage"].map((f) => `<label>${({ level: "Mức", strengths: "Ưu điểm", weaknesses: "Hạn chế", improve: "Cần cải thiện", teacherNote: "Ghi chú GV", parentMessage: "Lời nhắn phụ huynh" })[f]}<textarea data-ed="${f}" rows="${f === "level" ? 1 : 3}">${esc(f in evEditDraft ? evEditDraft[f] : lines(e[f]))}</textarea></label>`).join("")}</div><div class="row"><button class="btn small" id="evEdSave" data-eid="${esc(eid)}">💾 Lưu</button><button class="btn small ghost" id="evEdCancel">Huỷ</button></div></div>`
      : `<div class="ev-item"><div class="row"><b>${C.fmtDate(e.at || 0)}</b><span class="pill ${lvlCls(e.level)}">${esc(e.level || "?")}</span><span>${trendIc(e.progress && e.progress.trend)} ${esc((e.progress && e.progress.trend) || "")}</span>${e.confidence ? `<span class="muted">tin cậy: ${esc(e.confidence)}</span>` : ""}${e.approved ? `<span class="pill good">✅ Đã duyệt</span>` : `<span class="pill mid">Nháp AI</span>`}${e.editedByTeacher ? `<span class="muted">(GV đã sửa)</span>` : ""}</div>
        ${[["Ưu điểm", e.strengths], ["Hạn chế", e.weaknesses], ["Sự tiến bộ", e.progress && e.progress.evidence], ["Cần cải thiện", e.improve], ["Bài cần xem lại", (e.review || []).map((r) => `${r.lesson}: ${r.topic}${r.why ? " (" + r.why + ")" : ""}`)], ["Ghi chú GV", e.teacherNote], ["Lời nhắn phụ huynh", e.parentMessage], ["Ghi chú dữ liệu", e.dataNote]].filter(([, v]) => v && (!Array.isArray(v) || v.length)).map(([k, v]) => `<p><b>${k}:</b> ${Array.isArray(v) ? v.map(esc).join(" · ") : esc(v)}</p>`).join("")}
        <div class="row">${e.approved ? "" : `<button class="btn small ok" data-eap="${esc(eid)}">✅ Giáo viên đã duyệt</button>`}<button class="btn small ghost" data-eed="${esc(eid)}">✏️ Sửa</button><button class="btn small ghost" data-epm="${esc(eid)}" ${e.approved && e.parentMessage ? "" : "disabled title=\"Cần duyệt trước khi chép lời nhắn\""}>📋 Chép lời nhắn phụ huynh</button><span class="sp"></span><button class="btn small ghost" data-edel="${esc(eid)}">🗑 Xóa lượt đánh giá</button></div></div>`;
    return `<div class="ev-detail"><h3>👤 ${esc(nameOfSid(evS.classId, sid))}</h3>${scoreChart(rec)}${evs.length ? evs.map(block).join("") : `<p class="muted">Chưa có lượt đánh giá nào.</p>`}</div>`;
  }
  // Lượt đánh giá mới: gán mã ngẫu nhiên, chia phần (> 20.000 ký tự -> 15 em/phần), lưu bảng đối chiếu (chỉ sid) ở teacher/evals
  async function evMake(ctx) {
    const { tl, target, supMap, pr, used } = ctx, codes = target.slice();
    for (let i = codes.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [codes[i], codes[j]] = [codes[j], codes[i]]; }
    const all = codes.map((sid, i) => ["HS" + C.pad2(i + 1), sid]), d = new Date(DB.now());
    const id = `e${d.getFullYear()}${C.pad2(d.getMonth() + 1)}${C.pad2(d.getDate())}-${C.rid(5)}`;
    const lessonsInfo = [...new Map(used.map((s) => [s.meta.lessonId, evData.lessons[s.meta.lessonId]])).values()].map((Lx) => ({ title: (Lx.meta && Lx.meta.title) || "", core: Lx.coreKnowledge || [] }));
    const previous = {}; if (evS.withPrev) target.forEach((sid) => { const L0 = Object.values(evOf(evS.classId)[sid] || {}).sort((a, b) => (b.at || 0) - (a.at || 0))[0]; if (L0) previous[sid] = { date: L0.at, level: L0.level, weaknesses: L0.weaknesses, improve: L0.improve }; });
    const reasons = evS.scope === "support" ? supMap : {}, grade = C.gradeOf((T.classes[evS.classId] || {}).name, used[0] && used[0].meta.lessonId);
    const gen = (chunks) => chunks.map((ch, i) => C.evalPrompt(tl, Object.fromEntries(ch), { format: evS.format, evaluationId: id, part: i + 1, parts: chunks.length, lessonsInfo, previous, period: pr.label, grade, scope: evS.scope, reasons, classSessions: used.length, withTexts: evS.withTexts }));
    let chunks = [all], parts = gen(chunks);
    if (parts[0].length > 20000) { // chia phần: mỗi phần ≤ 20.000 ký tự và ≤ 15 em
      // xếp các em hay ngồi chung máy cạnh nhau để cùng phần (dữ liệu chung chỉ ghi 1 lần)
      const seat = (sid) => { const e = (tl[sid] ? tl[sid].entries : []).filter((x) => x.present && x.groupSize > 1).pop(); return e ? e.sessionId + "|" + e.groupId : "~"; };
      const order = all.slice().sort((a, b) => seat(a[1]).localeCompare(seat(b[1])));
      let cur = []; chunks = [];
      order.forEach((p) => { const next = cur.concat([p]); if (cur.length && (cur.length >= 15 || gen([next])[0].length > 20000)) { chunks.push(cur); cur = [p]; } else cur = next; });
      if (cur.length) chunks.push(cur);
      chunks.forEach((ch) => ch.sort((a, b) => a[0].localeCompare(b[0]))); parts = gen(chunks);
    }
    const roster = {}; clsStudents(evS.classId).forEach(([sid, x]) => { roster[sid] = x; }); Object.entries(evData.names || {}).forEach(([sid, n]) => { if (!roster[sid]) roster[sid] = { name: n }; });
    const leaks = [].concat(...parts.map((p) => C.leakCheck(p, roster, target)));
    const rec = { classId: evS.classId, createdAt: DB.now(), from: pr.from || null, to: pr.to || null, scope: evS.scope, format: evS.format, parts: parts.length, map: Object.fromEntries(all), partCodes: Object.fromEntries(chunks.map((ch, i) => [String(i + 1), ch.map(([c]) => c)])) };
    await DB.set("teacher/evals/" + id, rec);
    evCur = { id, classId: evS.classId, parts, idx: 0, format: evS.format, leaks, n: all.length };
    toast(`Đã tạo câu lệnh cho ${all.length} học sinh (${parts.length} phần).`);
  }
  function evRows(res) {
    const ev = (T.evals || {})[res.evaluationId] || {}, cid = ev.classId, nm = (sid) => nameOfSid(cid, sid), dec = (t) => C.decode(t, ev.map || {}, nm);
    return res.students.map((s) => ({ sid: s.sid, code: s.code, warn: s.warn, level: s.level, strengths: dec(s.strengths.join("\n")), weaknesses: dec(s.weaknesses.join("\n")),
      progress: (s.progress.trend ? s.progress.trend + ": " : "") + dec(s.progress.evidence), improve: dec(s.improve.join("\n")), review: s.review.map((r) => `${r.lesson} — ${dec(r.topic)}${r.why ? " (" + dec(r.why) + ")" : ""}`).join("\n"),
      teacherNote: dec(s.teacherNote), parentMessage: dec(s.parentMessage), confidence: s.confidence, dataNote: dec(s.dataNote), trend: s.progress.trend, edited: false }));
  }
  function bindEval(body, ctx) {
    const upd = (f) => { f(); evSave(); evRedraw(); };
    const cs = $("#evClass"); if (cs) cs.onchange = () => upd(() => { evS.classId = cs.value; evS.sid = ""; evCur = null; evDetail = null; });
    body.querySelectorAll("[data-ep]").forEach((b) => { b.onclick = () => upd(() => { evS.period = b.dataset.ep; }); });
    ["#evFrom", "#evTo"].forEach((s) => { const e = $(s); if (e) e.onchange = () => upd(() => { evS[s === "#evFrom" ? "from" : "to"] = e.value; }); });
    if (!ctx) return;
    body.querySelectorAll("[data-es]").forEach((b) => { b.onclick = () => upd(() => { evS.scope = b.dataset.es; }); });
    const sd = $("#evSid"); if (sd) sd.onchange = () => upd(() => { evS.sid = sd.value; });
    [["#evMin", "minAvg", 1], ["#evDrop", "drop", 1], ["#evAbs", "absentRate", 0.01]].forEach(([s, k, f]) => { const e = $(s); if (e) e.onchange = () => upd(() => { evS.crit[k] = (+e.value || 0) * f; }); });
    [["#evHide", "hideTest"], ["#evTexts", "withTexts"], ["#evPrev", "withPrev"]].forEach(([s, k]) => { const e = $(s); if (e) e.onchange = () => upd(() => { evS[k] = e.checked; }); });
    body.querySelectorAll("input[name=evFmt]").forEach((r) => { r.onchange = () => upd(() => { evS.format = r.value; }); });
    const mk = $("#evMake"); if (mk) mk.onclick = () => { mk.disabled = true; act(evMake(ctx)).then(evRedraw); };
    body.querySelectorAll("[data-epart]").forEach((b) => { b.onclick = () => { evCur.idx = +b.dataset.epart; evRedraw(); }; });
    const cp = $("#evCopy"); if (cp) cp.onclick = async () => { const ok = await copyText($("#evPrompt").value, $("#evPrompt")); toast(ok ? `Đã sao chép phần ${evCur.idx + 1}/${evCur.parts.length} — dán vào Claude / ChatGPT / Gemini.` : "Không tự sao chép được — bấm vào ô, Ctrl+A rồi Ctrl+C."); };
    const dl = $("#evDl"); if (dl) dl.onclick = () => { const c = (T.classes[evS.classId] || {}).name || "Lop", d = new Date(DB.now()); downloadText($("#evPrompt").value, `DanhGia_${c}_${d.getFullYear()}-${C.pad2(d.getMonth() + 1)}-${C.pad2(d.getDate())}_phan${evCur.idx + 1}.${evCur.format}`, evCur.format === "json" ? "application/json" : "text/markdown"); };
    // giữ chữ đang gõ khi bảng tự vẽ lại (dữ liệu giáo viên đổi)
    const rp = $("#evReply"); if (rp) rp.oninput = () => { evReplyDraft = rp.value; };
    body.querySelectorAll("[data-ed]").forEach((t) => { t.oninput = () => { evEditDraft[t.dataset.ed] = t.value; }; });
    const rd = $("#evRead"); if (rd) rd.onclick = () => { const raw = $("#evReply").value; const res = C.parseEvalReply(raw, T.evals || {}); evImport = { raw, res, rows: res.ok ? evRows(res) : [] }; evRedraw(); };
    body.querySelectorAll("[data-er]").forEach((e) => { e.onchange = () => { const r = evImport.rows[+e.dataset.er]; r[e.dataset.ef] = e.value; r.edited = true; }; });
    const sv = $("#evStore"); if (sv) sv.onclick = () => {
      const r = evImport.res, ev = (T.evals || {})[r.evaluationId]; if (!ev) return toast("Không tìm thấy lượt đánh giá.");
      const at = DB.now(), up = {}, ln = (s) => String(s || "").split(/\n+/).map((x) => x.trim()).filter(Boolean);
      evImport.rows.forEach((x) => { const tr = /^(tiến bộ|ổn định|giảm|chưa đủ dữ liệu)\s*:\s*/i.exec(x.progress);
        up[`studentEvals/${ev.classId}/${x.sid}/${r.evaluationId}`] = { at, level: x.level || null, strengths: ln(x.strengths), weaknesses: ln(x.weaknesses), progress: { trend: tr ? tr[1].toLowerCase() : x.trend || "", evidence: tr ? x.progress.slice(tr[0].length) : x.progress },
          improve: ln(x.improve), review: ln(x.review).map((t) => { const p = t.split(" — "); return { lesson: p[0] || "", topic: p.slice(1).join(" — ") || t, why: "" }; }), teacherNote: x.teacherNote || null, parentMessage: x.parentMessage || null,
          confidence: x.confidence || null, dataNote: x.dataNote || null, approved: false, approvedAt: null, editedByTeacher: !!x.edited }; });
      up[`evals/${r.evaluationId}/importedParts/${r.part}`] = at;
      if (r.classSummary) up[`evals/${r.evaluationId}/classSummary`] = r.classSummary; if (r.supportPlan) up[`evals/${r.evaluationId}/supportPlan`] = r.supportPlan;
      act(DB.update("teacher", up), `Đã lưu nhận xét của ${evImport.rows.length} học sinh (trạng thái “Nháp AI”).`).then(() => { evImport = null; evReplyDraft = ""; evRedraw(); });
    };
    body.querySelectorAll("[data-epf]").forEach((b) => { b.onclick = () => { evDetail = evDetail === b.dataset.epf ? null : b.dataset.epf; evEditing = null; evRedraw(); }; });
    const base = (eid) => `teacher/studentEvals/${evS.classId}/${evDetail}/${eid}`;
    body.querySelectorAll("[data-eap]").forEach((b) => { b.onclick = () => act(DB.update(base(b.dataset.eap), { approved: true, approvedAt: DB.now() }), "Đã duyệt nhận xét."); });
    body.querySelectorAll("[data-eed]").forEach((b) => { b.onclick = () => { evEditing = evDetail + "|" + b.dataset.eed; evEditDraft = {}; evRedraw(); }; });
    const es = $("#evEdSave"); if (es) es.onclick = () => { const v = {}; body.querySelectorAll("[data-ed]").forEach((t) => { const f = t.dataset.ed; v[f] = ["strengths", "weaknesses", "improve"].includes(f) ? t.value.split(/\n+/).map((x) => x.trim()).filter(Boolean) : t.value.trim(); }); v.editedByTeacher = true; act(DB.update(base(es.dataset.eid), v), "Đã lưu nhận xét đã sửa.").then(() => { evEditing = null; evEditDraft = {}; evRedraw(); }); };
    const ec = $("#evEdCancel"); if (ec) ec.onclick = () => { evEditing = null; evEditDraft = {}; evRedraw(); };
    body.querySelectorAll("[data-epm]").forEach((b) => { b.onclick = async () => { const e = evOf(evS.classId)[evDetail][b.dataset.epm]; const ok = await copyText(e.parentMessage || ""); toast(ok ? "Đã chép lời nhắn phụ huynh — dán vào Zalo." : "Không chép được."); }; });
    body.querySelectorAll("[data-edel]").forEach((b) => { b.onclick = () => { if (confirm("Xóa lượt đánh giá này của học sinh? Không khôi phục được.")) act(DB.set(base(b.dataset.edel), null), "Đã xóa lượt đánh giá."); }; });
    const xl = $("#evXls"); if (xl) xl.onclick = () => evExcel(ctx.sids);
  }
  function evExcel(sids) {
    const cid = evS.classId, c = (T.classes[cid] || {}).name || "", evs = evOf(cid), H = (v) => ({ v, s: "head" }), Cc = (v) => ({ v, s: "cell" }), Wr = (v) => ({ v, s: "wrap" }), CT = (v) => ({ v, s: "center" });
    const j = (a) => (Array.isArray(a) ? a.join("\n") : a || "");
    const r1 = [[{ v: "NHẬN XÉT QUÁ TRÌNH HỌC TẬP — LỚP " + c.toUpperCase(), s: "title" }], [{ v: "Nhận xét do AI gợi ý từ dữ liệu ẩn danh, giáo viên đã đọc và duyệt. Xuất ngày " + C.fmtDate(DB.now()), s: "sub" }], [],
      ["STT", "Họ và tên", "Mức", "Ưu điểm", "Hạn chế", "Sự tiến bộ", "Cần cải thiện", "Bài cần xem lại", "Lời nhắn phụ huynh", "Đã duyệt"].map(H)];
    const allIds = new Set(); sids.forEach((sid) => Object.keys(evs[sid] || {}).forEach((e) => allIds.add(e)));
    const order = [...allIds].sort((a, b) => (((T.evals || {})[a] || {}).createdAt || 0) - (((T.evals || {})[b] || {}).createdAt || 0));
    const r2 = [[{ v: "TIẾN BỘ QUA CÁC LƯỢT ĐÁNH GIÁ — LỚP " + c.toUpperCase(), s: "title" }], [], [], [H("STT"), H("Họ và tên"), ...order.map((e) => H("Mức (" + C.fmtDate(((T.evals || {})[e] || {}).createdAt || 0) + ")"))]];
    sids.forEach((sid, i) => {
      const list = Object.entries(evs[sid] || {}).sort((a, b) => (b[1].at || 0) - (a[1].at || 0)), e = list[0] && list[0][1];
      r1.push([CT(i + 1), Cc(nameOfSid(cid, sid)), CT(e ? e.level || "" : ""), Wr(e ? j(e.strengths) : ""), Wr(e ? j(e.weaknesses) : ""), Wr(e ? [(e.progress || {}).trend, (e.progress || {}).evidence].filter(Boolean).join(": ") : ""), Wr(e ? j(e.improve) : ""),
        Wr(e ? (e.review || []).map((r) => r.lesson + ": " + r.topic).join("\n") : ""), Wr(e && e.approved ? e.parentMessage || "" : ""), CT(e ? (e.approved ? "Có" : "Chưa") : "")]);
      r2.push([CT(i + 1), Cc(nameOfSid(cid, sid)), ...order.map((eid) => CT(((evs[sid] || {})[eid] || {}).level || ""))]);
    });
    const d = new Date(DB.now());
    XLSX.download([{ name: "Nhận xét", cols: [6, 26, 10, 40, 40, 34, 40, 34, 44, 9], rows: r1, merges: ["A1:J1", "A2:J2"], freezeRow: 4 }, { name: "Tiến bộ", cols: [6, 26, ...order.map(() => 16)], rows: r2, merges: [], freezeRow: 4 }],
      `NhanXet_${c}_${d.getFullYear()}-${C.pad2(d.getMonth() + 1)}-${C.pad2(d.getDate())}.xlsx`.replace(/[\\/:*?"<>|]/g, "-"));
    toast("Đã xuất Excel nhận xét.");
  }

  // ======================== OVERLAY ========================
  function openOverlay(kind, html) { overlayKind = kind; const ov = $("#overlay"); ov.innerHTML = `<button class="ov-close" title="Đóng (Esc)">✕</button>` + html; ov.hidden = false; ov.querySelector(".ov-close").onclick = closeOverlay; }
  function closeOverlay() { overlayKind = null; $("#overlay").hidden = true; }
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeOverlay(); });
  function showQR(fresh) {
    const u = joinUrl(), m = hasSess() && sess.meta, code = fresh || curCode();
    if (code) return openOverlay("qr", `<div class="bigqr"><div class="bigcode-box"><small>Mã vào lớp</small><b>${esc(code)}</b></div>${QR.svg(joinUrl() + "?c=" + code)}<div class="url">${esc(u.replace(/^https?:\/\//, "").replace(/\/$/, ""))}</div><div>${m ? `Lớp <b>${esc(m.className)}</b> · ${esc(m.lessonTitle)}<br>` : ""}Mở địa chỉ trên → nhập <b>mã vào lớp</b> (quét QR là tự điền mã) → chọn máy và tên các bạn ngồi cùng máy</div></div>`);
    openOverlay("qr", `<div class="bigqr">${QR.svg(u)}<div class="url">${esc(u.replace(/^https?:\/\//, "").replace(/\/$/, ""))}</div><div>${m ? `Lớp <b>${esc(m.className)}</b> · ${esc(m.lessonTitle)}<br>` : ""}Quét mã hoặc gõ địa chỉ trên, chọn máy và tên các bạn ngồi cùng máy</div></div>`);
  }
  // Co giãn khung xếp hạng cho vừa màn hình (danh sách dài vẫn thấy hết)
  function fitBoard() {
    const b = document.querySelector("#overlay .board"); if (!b) return;
    const go = () => { if (!b.isConnected) return; b.style.zoom = ""; const s = Math.min(1, (window.innerHeight * 0.92) / b.offsetHeight, (window.innerWidth * 0.96) / b.offsetWidth); b.style.zoom = s < 1 ? String(Math.max(0.3, s)) : ""; };
    go(); requestAnimationFrame(go);
  }
  window.addEventListener("resize", () => { if (overlayKind === "board") fitBoard(); });
  function showBoard() {
    if (!hasSess()) return closeOverlay();
    const gs = Object.keys(sess.groups || {}).map((id) => ({ id, nm: C.groupName(sess, id), sc: C.scoreGroup(sess, id, info), mem: sess.groups[id].self ? [] : C.memberNames(sess, sess.groups[id]) })).sort((a, b) => b.sc.score - a.sc.score || b.sc.correct - a.sc.correct || b.sc.done - a.sc.done);
    const medal = ["🥇", "🥈", "🥉"], many = gs.length > 8;
    let pos = 0; const rows = gs.map((g, i) => { if (!i || g.sc.score !== gs[i - 1].sc.score || g.sc.correct !== gs[i - 1].sc.correct) pos = i + 1; return { g, pos }; });
    openOverlay("board", `<div class="board ${many ? "many" : ""}"><h1>🏆 Bảng xếp hạng</h1><div class="rank-list">${rows.map(({ g, pos: p }) => `<div class="rank"><div class="pos">${medal[p - 1] || p}</div><div>${esc(g.nm)} <div class="mb">${esc(g.mem.join(", "))}</div><div class="bar"><i style="width:${g.sc.score * 10}%"></i></div></div><div class="sc">${fmt1(g.sc.score)}</div></div>`).join("") || `<p style="text-align:center">Chưa có nhóm nào.</p>`}</div></div>`);
    fitBoard();
  }
  setInterval(() => { if (!document.hidden && hasSess() && tab === "groups") schedule(); }, 15000); // cập nhật chấm online
})();
