/* ============================================================================
 * insight.js — HÀM THUẦN cho “AI có trách nhiệm” trên bảng giáo viên (không đụng DOM):
 *   B1 🤖 aiPrompt / anonymize        — câu lệnh phân tích 1 tiết học (ẩn danh: Nhóm N, [HS])
 *   B2 📈 impactStats / impactWorkbook — tổng quan tác động nhiều tiết + Excel minh chứng
 *   B3 🎯 studentTimeline / needSupport / evalPrompt / parseEvalReply — đánh giá từng HS bằng mã HS01…
 * Không gọi API AI, không cần khóa: GV sao chép câu lệnh dán vào Claude / ChatGPT / Gemini.
 * Chạy được trong trình duyệt (bổ sung vào window.LHCore) và Node (require -> LHCore đã bổ sung) để kiểm thử.
 * ==========================================================================*/
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory(require("./core.js"));
  else factory(root.LHCore);
})(typeof self !== "undefined" ? self : this, function (C) {
  "use strict";
  const { norm, round1, fmtDate, fmtTime, pad2, lessonItems, answerOf, judge, scoreGroup, choiceDist, normShort, normExact, abDigits, judgeQuestion, gradeOf, sortedEntries } = C;
  const avgOf = (a) => (a.length ? a.reduce((t, x) => t + x, 0) / a.length : null);
  const pctS = (x) => Math.round((x || 0) * 100) + "%";
  const cut = (s, n) => { s = String(s == null ? "" : s).replace(/\s+/g, " ").trim(); return s.length > n ? s.slice(0, n - 1) + "…" : s; };
  const stripHtml = (s) => String(s == null ? "" : s).replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();

  // ======================== ẨN DANH ========================
  // Thay họ tên đầy đủ và cụm 2 chữ cuối của họ tên (có/không dấu, không phân biệt hoa thường) bằng [HS];
  // xoá số điện thoại, email. Tên 1 chữ đứng riêng KHÔNG thay (trùng từ thường) -> trả về để nhắc GV đọc lại.
  const WORD = /[\p{L}\p{N}]+/gu;
  function namePatterns(roster) {
    const pats = [], seen = new Set(), given = new Set();
    Object.values(roster || {}).forEach((s) => {
      const w = String((s && s.name) || "").match(WORD); if (!w || !w.length) return;
      const nw = w.map(norm);
      const add = (arr) => { const k = arr.join(" "); if (arr.length >= 2 && !seen.has(k)) { seen.add(k); pats.push(arr); } };
      add(nw); if (nw.length >= 2) add(nw.slice(-2));
      if (nw[nw.length - 1].length >= 2) given.add(nw[nw.length - 1]);
    });
    return { pats: pats.sort((a, b) => b.length - a.length), given };
  }
  // p khớp tại vị trí k của toks (các chữ chỉ cách nhau bằng khoảng trắng)
  function matchAt(s, toks, k, p) {
    if (k + p.length > toks.length) return false;
    for (let t = 0; t < p.length; t++) { if (toks[k + t].n !== p[t]) return false; if (t && !/^\s+$/.test(s.slice(toks[k + t - 1].j, toks[k + t].i))) return false; }
    return true;
  }
  function anonymize(text, roster, pre) {
    let s = String(text == null ? "" : text);
    s = s.replace(/[\w.+-]+@[\w-]+(\.[\w-]+)+/g, "[email]").replace(/(\+?84|0)(\s?\d){8,10}/g, "[SĐT]");
    const P = pre || namePatterns(roster);
    if (!P.pats.length) return s;
    const toks = []; let m; WORD.lastIndex = 0;
    while ((m = WORD.exec(s))) toks.push({ i: m.index, j: m.index + m[0].length, n: norm(m[0]) });
    const spans = [];
    for (let k = 0; k < toks.length; k++) {
      for (const p of P.pats) {
        if (matchAt(s, toks, k, p)) { spans.push([toks[k].i, toks[k + p.length - 1].j]); k += p.length - 1; break; }
      }
    }
    for (let x = spans.length - 1; x >= 0; x--) s = s.slice(0, spans[x][0]) + "[HS]" + s.slice(spans[x][1]);
    return s;
  }
  // Tên gọi 1 chữ của HS còn sót trong văn bản (để nhắc GV) -> số lần gặp
  function givenNameHits(text, roster, pre) {
    const P = pre || namePatterns(roster); let n = 0; const found = new Set();
    (String(text || "").match(WORD) || []).forEach((w) => { const k = norm(w); if (P.given.has(k)) { n++; found.add(w); } });
    return { n, words: [...found] };
  }
  // Che tên gọi viết hoa trùng tên gọi HS trong lớp (bài tự luận hay nhắc tên bạn: “Minh, Khoa…”)
  function maskGiven(text, P) { return String(text || "").replace(WORD, (w) => (P.given.has(norm(w)) && /^\p{Lu}/u.test(w) ? "[HS]" : w)); }
  // Kiểm tra câu lệnh còn họ tên / cụm 2 chữ cuối / mã nội bộ (sid) -> danh sách vị trí (chặn sao chép ở B3)
  function leakCheck(text, roster, extraIds) {
    const P = namePatterns(roster), out = [];
    const toks = []; let m; WORD.lastIndex = 0; const s = String(text || "");
    while ((m = WORD.exec(s))) toks.push({ i: m.index, j: m.index + m[0].length, n: norm(m[0]) });
    for (let k = 0; k < toks.length; k++) for (const p of P.pats) {
      if (matchAt(s, toks, k, p)) { out.push({ at: toks[k].i, what: "họ tên", text: s.slice(toks[k].i, toks[k].i + 40) }); break; }
    }
    (extraIds || []).forEach((id) => { const i = s.indexOf(id); if (id && i >= 0) out.push({ at: i, what: "mã nội bộ", text: id }); });
    return out;
  }

  // ======================== B1: PROMPT PHÂN TÍCH 1 TIẾT ========================
  const B1_ROLE = `Bạn là chuyên gia sư phạm môn Tin học THCS (Chương trình GDPT 2018, sách Kết nối tri thức với cuộc sống).
Dưới đây là kết quả ẩn danh một tiết học trên lớp. Hãy phân tích để giúp giáo viên dạy lại.
Quy tắc: chỉ dựa vào dữ liệu được cung cấp và kiến thức trong SGK; không bịa số liệu; chỗ nào dữ liệu
không đủ để kết luận thì ghi rõ "chưa đủ dữ liệu"; không nhận xét về cá nhân học sinh.`;
  const B1_OUT = `Hãy trả lời theo đúng 5 mục:
1. Tóm tắt (3 dòng): lớp nắm tốt gì, chưa nắm gì.
2. Bảng "Câu sai nhiều": câu | tỉ lệ đạt | phương án sai hay chọn | cách hiểu sai có thể có của học sinh.
3. Kế hoạch dạy lại 5–7 phút đầu tiết sau: các bước cụ thể, ví dụ minh họa, câu hỏi kiểm tra nhanh.
4. 3 câu hỏi trắc nghiệm bổ trợ (4 phương án, có đáp án và giải thích từng phương án), viết dạng JSON:
   [{"question":"...","options":["...","...","...","..."],"answer":0,"explanation":"..."}]
5. Nhận xét chung các câu trả lời tự luận và gợi ý 1–2 nhóm đáng khen (ghi theo nhãn Nhóm N).`;
  const safeClass = (n) => (/^\s*\d{1,2}\s*[A-Za-zĐđ]{0,2}\s*\d{0,2}\s*$/.test(String(n || "")) ? String(n).trim() : "");
  const groupsOf = (sess) => Object.entries(sess.groups || {}).sort((a, b) => (a[1].createdAt || 0) - (b[1].createdAt || 0)).map(([id]) => id);
  // Kết quả từng mục chấm của 1 tiết (dùng chung B1, B2)
  function itemResults(sess, info, gids, onlyIncluded) {
    const ex = (sess.live || {}).excluded || {};
    return info.items.filter((it) => !onlyIncluded || !ex[it.aid]).map((it) => {
      const recs = gids.map((g) => answerOf(sess, g, it)).filter(Boolean), js = recs.map((r) => judge(it, r));
      return { it, recs, done: recs.length, rate: recs.length ? js.reduce((t, j) => t + j.fraction, 0) / recs.length : null, full: js.filter((j) => j.ok).length };
    });
  }
  function aiPrompt(sess, L, opts) {
    opts = Object.assign({ withTexts: true, onlyIncluded: true, maxTextsPerQ: 15, maxTextLen: 300 }, opts || {});
    const meta = sess.meta || {}, live = sess.live || {}, info = lessonItems(L || { activities: [] }), P = namePatterns(sess.roster);
    const gids = groupsOf(sess).filter((g) => (sess.answers || {})[g] || (sess.texts || {})[g]), warnings = [];
    const res = itemResults(sess, info, gids, opts.onlyIncluded);
    const done = res.filter((r) => r.done), notDone = res.filter((r) => !r.done);
    done.sort((a, b) => a.rate - b.rate);
    const lines = [B1_ROLE, "", "## Thông tin tiết học"];
    lines.push(`- Bài: ${meta.lessonTitle || ""}`, `- Khối: ${gradeOf(meta.className, meta.lessonId)}${safeClass(meta.className) ? ` (lớp ${safeClass(meta.className)})` : ""}`, `- Ngày: ${fmtDate(meta.createdAt || Date.now())}`);
    lines.push(`- Hình thức: ${meta.mode === "self" ? "tự học cá nhân (mỗi học sinh làm riêng)" : "phòng máy, học sinh làm theo nhóm trên mỗi máy" + (live.follow ? ", theo nhịp giáo viên" : ", học sinh tự làm")}`);
    lines.push(`- Số nhóm tham gia: ${gids.length}`, `- Số câu/bài được chấm: ${res.length}`, "");
    lines.push("## Kết quả từng câu (câu đạt thấp nhất lên đầu; ⚠️ = đạt dưới 50%)");
    const good = done.filter((r) => r.rate >= 0.8), weak = done.filter((r) => r.rate < 0.8);
    weak.forEach((r, k) => {
      const it = r.it, q = it.q, ex = stripHtml((q && (q.explanation || q.explain)) || (it.act && (it.act.explanation || it.act.explain)) || "");
      lines.push("", `### ${r.rate < 0.5 ? "⚠️ " : ""}Câu ${k + 1}. [${it.activityName}] ${cut(stripHtml(it.label), 300)}`, `- Số nhóm làm: ${r.done}/${gids.length} · tỉ lệ đạt: ${pctS(r.rate)}`);
      if (q && (q.type === "multiple-choice" || q.type === "true-false" || q.type === "multiple-select" || !q.type)) {
        const opt = q.type === "true-false" ? ["Đúng", "Sai"] : (q.options || []);
        opt.forEach((o, i) => {
          const n = r.recs.filter((x) => { const c = x.choice; if (q.type === "true-false") return c === (i === 0); if (q.type === "multiple-select") return Array.isArray(c) ? c.map(Number).includes(i) : c && Object.values(c).map(Number).includes(i); return Number(c) === i && c !== "" && typeof c !== "boolean"; }).length;
          const right = q.type === "true-false" ? (i === 0) === q.answer : q.type === "multiple-select" ? (q.answer || []).includes(i) : i === q.answer;
          lines.push(`  ${"ABCDEF"[i] || i + 1}. ${cut(stripHtml(o), 160)} — ${n} nhóm${right ? " (ĐÚNG)" : ""}`);
        });
      } else if (q && (q.type === "sheet" || q.type === "short" || q.type === "abacus")) {
        const dist = choiceDist(r.recs.map((x) => x.choice), q.answer, 4, q.mode === "formula" || q.type === "short" || q.type === "abacus" ? (k2) => judgeQuestion(q, k2) : null, q.type === "short" ? (q.exact ? normExact : normShort) : q.type === "abacus" ? abDigits : null);
        lines.push(`  Đáp án đúng: ${Array.isArray(q.answer) ? q.answer[0] : q.answer}`);
        dist.forEach((d) => lines.push(`  - "${cut(d.label, 80)}" — ${d.n} nhóm${d.right ? " (ĐÚNG)" : ""}`));
      } else if (it.act) lines.push(`  Dạng bài: ${({ matching: "ghép đôi", dragdrop: "phân loại", ordering: "sắp xếp", fillblank: "điền khuyết" })[it.act.type] || it.act.type} · số nhóm đúng hết: ${r.full}/${r.done} · tỉ lệ mục đúng trung bình: ${pctS(r.rate)}`);
      if (ex) lines.push(`  Giải thích trong bài giảng: ${cut(ex, 300)}`);
    });
    // câu lớp làm tốt (≥ 80%): ghi gọn một dòng để câu lệnh không quá dài
    if (good.length) { lines.push("", "### Các câu lớp làm tốt (đạt từ 80%)"); good.forEach((r, k) => lines.push(`- Câu ${weak.length + k + 1}. [${r.it.activityName}] ${cut(stripHtml(r.it.label), 140)} — ${r.done} nhóm làm, đạt ${pctS(r.rate)}`)); }
    if (notDone.length) lines.push("", `(Có ${notDone.length} câu chưa nhóm nào làm — chưa đủ dữ liệu.)`);
    let nTexts = 0;
    if (opts.withTexts && info.openQs.length) {
      const lab = new Map(gids.map((g, i) => [g, "Nhóm " + (i + 1)]));
      const blocks = [];
      info.openQs.forEach((o) => {
        const ans = gids.map((g) => ({ g, t: (((sess.texts || {})[g] || {})[o.aid] || {})[o.iid] })).filter((x) => x.t && x.t.text).slice(0, opts.maxTextsPerQ);
        if (!ans.length) return;
        blocks.push("", `### ${cut(stripHtml(o.label), 200)}`);
        ans.forEach((x) => { nTexts++; blocks.push(`- ${lab.get(x.g)}: ${cut(anonymize(x.t.text, sess.roster, P), opts.maxTextLen)}`); });
      });
      if (blocks.length) lines.push("", "## Câu trả lời tự luận (ẩn danh)", ...blocks);
    }
    lines.push("", "## Yêu cầu", B1_OUT);
    const text = lines.join("\n");
    const gh = givenNameHits(text.split("## Câu trả lời tự luận")[1] || "", sess.roster, P);
    if (gh.n) warnings.push(`Câu trả lời tự luận còn ${gh.n} chữ trùng tên gọi của học sinh (${gh.words.slice(0, 6).join(", ")}) — thầy/cô đọc lại, xoá nếu là tên người.`);
    if (text.length > 15000) warnings.push("Câu lệnh dài hơn 15.000 ký tự — " + (nTexts ? "nên bỏ tick “Kèm câu trả lời tự luận” để AI đọc tốt hơn." : "AI vẫn đọc được; nếu AI báo quá dài, hãy gửi làm hai lần."));
    return { text, stats: { groups: gids.length, items: res.length, texts: nTexts, chars: text.length }, warnings };
  }

  // ======================== DÙNG CHUNG B2, B3 ========================
  // Khoảng thời gian: all | month | d30 | hk1 (01/09→15/01) | hk2 (16/01→31/05) | year (01/09→31/08) | custom {from, to: "yyyy-mm-dd"}
  function periodRange(key, now, custom) {
    const d = new Date(now || Date.now()), Y = d.getMonth() >= 8 ? d.getFullYear() : d.getFullYear() - 1; // năm học bắt đầu tháng 9
    const day = (y, m, dd, end) => new Date(y, m, dd, end ? 23 : 0, end ? 59 : 0, end ? 59 : 0).getTime();
    const ymd = (s, end) => { const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(s || "")); return m ? day(+m[1], +m[2] - 1, +m[3], end) : null; };
    let from = null, to = null;
    if (key === "month") { from = day(d.getFullYear(), d.getMonth(), 1); to = day(d.getFullYear(), d.getMonth() + 1, 0, true); }
    else if (key === "d30") { from = d.getTime() - 30 * 864e5; to = d.getTime(); }
    else if (key === "hk1") { from = day(Y, 8, 1); to = day(Y + 1, 0, 15, true); }
    else if (key === "hk2") { from = day(Y + 1, 0, 16); to = day(Y + 1, 4, 31, true); }
    else if (key === "year") { from = day(Y, 8, 1); to = day(Y + 1, 7, 31, true); }
    else if (key === "custom") { from = ymd(custom && custom.from); to = ymd(custom && custom.to, true); }
    const label = from || to ? `từ ${from ? fmtDate(from) : "…"} đến ${to ? fmtDate(Math.min(to, Date.now())) : "…"}` : "toàn bộ thời gian";
    return { from, to, label };
  }
  const groupsWithWork = (s) => Object.keys(s.groups || {}).filter((g) => Object.keys(((s.answers || {})[g]) || {}).length);
  // Tiết chạy thử: ít hơn minGroups nhóm làm bài, hoặc tên lớp có “mẫu”, “thử”, “test”
  const isTestSession = (s, minGroups) => groupsWithWork(s).length < (minGroups || 3) || /(^|[^a-z])(mau|thu|test)([^a-z]|$)/.test(norm((s.meta || {}).className));
  const joinedOf = (s) => { const cs = (s.claims || {}).students || {}, ids = Object.keys(cs).filter((sid) => (s.groups || {})[cs[sid]]); if (ids.length) return ids; const set = new Set(); Object.values(s.groups || {}).forEach((g) => Object.keys(g.members || {}).forEach((x) => set.add(x))); return [...set]; };
  const weekKey = (t) => { const d = new Date(t); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() - ((d.getDay() + 6) % 7)); return d.getTime(); }; // thứ Hai đầu tuần

  // ======================== B2: TỔNG QUAN TÁC ĐỘNG ========================
  // sessions: [{ id, meta, ...dữ liệu tiết }], lessons: { lessonId: L }, classes: T.classes
  // opts: { from, to, mode: "all"|"room"|"self", minGroups: 3, hideTest: true, classes: [classKey], grades: [], ai: { [id]: {at, copiedAt} } }
  function impactStats(sessions, lessons, classes, opts) {
    opts = Object.assign({ mode: "all", minGroups: 3, hideTest: true, classes: [], grades: [], ai: {} }, opts || {});
    const per = [], hidden = [], skipped = [];
    (sessions || []).forEach((s) => {
      const m = s.meta || {}, t = m.createdAt || 0;
      if (opts.from && t < opts.from) return; if (opts.to && t > opts.to) return;
      if (opts.mode !== "all" && (m.mode === "self" ? "self" : "room") !== opts.mode) return;
      const ck = m.classId || "n:" + norm(m.className), gr = gradeOf(m.className, m.lessonId);
      if (opts.classes.length && !opts.classes.includes(ck)) return;
      if (opts.grades.length && !opts.grades.map(String).includes(String(gr))) return;
      if (opts.hideTest && isTestSession(s, opts.minGroups)) { hidden.push({ id: s.id, meta: m }); return; }
      const L = lessons[m.lessonId]; if (!L) { skipped.push({ id: s.id, meta: m, why: "bài không còn trong danh mục" }); return; }
      const info = lessonItems(L), gids = groupsWithWork(s), scores = gids.map((g) => scoreGroup(s, g, info));
      const joined = joinedOf(s).length, roster = Object.keys(s.roster || {}).length, ai = (opts.ai || {})[s.id];
      per.push({ id: s.id, s, meta: m, at: t, classKey: ck, className: m.className, grade: gr, lessonId: m.lessonId, lessonTitle: m.lessonTitle, mode: m.mode === "self" ? "self" : "room",
        groups: gids.length, joined, roster, answered80: scores.filter((x) => x.total && x.done / x.total >= 0.8).length,
        comps: scores.map((x) => (x.total ? x.done / x.total : 0)), avg: avgOf(scores.map((x) => x.score)), scores: scores.map((x) => x.score),
        done: scores.reduce((a, x) => a + x.done, 0), ai: !!(ai && (ai.at || ai.copiedAt)), info });
    });
    per.sort((a, b) => a.at - b.at);
    const allScores = [].concat(...per.map((p) => p.scores)), room = per.filter((p) => p.mode === "room");
    const kpi = {
      sessions: per.length, classes: new Set(per.map((p) => p.classKey)).size, lessons: new Set(per.map((p) => p.lessonId)).size,
      students: per.reduce((a, p) => a + p.joined, 0),
      presentRate: room.reduce((a, p) => a + p.roster, 0) ? room.reduce((a, p) => a + p.joined, 0) / room.reduce((a, p) => a + p.roster, 0) : null,
      answerRate: avgOf(per.filter((p) => p.groups).map((p) => p.answered80 / p.groups)),
      completion: avgOf([].concat(...per.map((p) => p.comps))),
      avgScore: allScores.length ? round1(avgOf(allScores)) : null, autoGraded: per.reduce((a, p) => a + p.done, 0),
      aiSessions: per.filter((p) => p.ai).length, aiAvailable: !!opts.aiAvailable,
      from: per.length ? per[0].at : null, to: per.length ? per[per.length - 1].at : null,
      grades: [...new Set(per.map((p) => p.grade))].sort((a, b) => String(a).localeCompare(String(b), "vi", { numeric: true })),
    };
    const byWeekM = new Map(); per.forEach((p) => { const k = weekKey(p.at); const w = byWeekM.get(k) || { week: k, sessions: 0, scores: [] }; w.sessions++; w.scores.push(...p.scores); byWeekM.set(k, w); });
    const byWeek = [...byWeekM.values()].sort((a, b) => a.week - b.week).map((w) => ({ week: w.week, sessions: w.sessions, avg: w.scores.length ? round1(avgOf(w.scores)) : null }));
    const byClassM = new Map(); per.forEach((p) => { const c = byClassM.get(p.classKey) || { key: p.classKey, name: p.className, grade: p.grade, list: [] }; c.name = p.className; c.list.push(p); byClassM.set(p.classKey, c); });
    const byClass = [...byClassM.values()].map((c) => { const rm = c.list.filter((p) => p.mode === "room"), ro = rm.reduce((a, p) => a + p.roster, 0);
      return { key: c.key, name: c.name, grade: c.grade, sessions: c.list.length, students: c.list.reduce((a, p) => a + p.joined, 0), presentRate: ro ? rm.reduce((a, p) => a + p.joined, 0) / ro : null,
        avg: round1(avgOf([].concat(...c.list.map((p) => p.scores))) || 0), first: c.list[0].avg == null ? null : round1(c.list[0].avg), last: c.list[c.list.length - 1].avg == null ? null : round1(c.list[c.list.length - 1].avg) }; })
      .sort((a, b) => String(a.name).localeCompare(String(b.name), "vi", { numeric: true }));
    const byLessonM = new Map(); per.forEach((p) => { const l = byLessonM.get(p.lessonId) || { id: p.lessonId, title: p.lessonTitle, sessions: 0, scores: [] }; l.sessions++; l.scores.push(...p.scores); byLessonM.set(p.lessonId, l); });
    const byLesson = [...byLessonM.values()].map((l) => ({ id: l.id, title: l.title, sessions: l.sessions, avg: l.scores.length ? round1(avgOf(l.scores)) : null })).sort((a, b) => String(a.id).localeCompare(String(b.id), "vi", { numeric: true }));
    const hardM = new Map();
    per.forEach((p) => itemResults(p.s, p.info, groupsWithWork(p.s), true).forEach((r) => { if (!r.done) return; const k = p.lessonId + "|" + r.it.key; const h = hardM.get(k) || { lessonTitle: p.lessonTitle, label: stripHtml(r.it.label), activity: r.it.activityName, done: 0, sum: 0 }; h.done += r.done; h.sum += r.rate * r.done; hardM.set(k, h); }));
    const hardest = [...hardM.values()].filter((h) => h.done >= 5).map((h) => ({ ...h, rate: h.sum / h.done })).sort((a, b) => a.rate - b.rate).slice(0, 10);
    const perSession = per.map((p) => ({ id: p.id, at: p.at, className: p.className, lessonTitle: p.lessonTitle, mode: p.mode, groups: p.groups, joined: p.joined, roster: p.roster, answerRate: p.groups ? p.answered80 / p.groups : null, avg: p.avg == null ? null : round1(p.avg), ai: p.ai }));
    return { kpi, byWeek, byClass, byLesson, hardest, hidden, skipped, perSession };
  }
  // Đoạn văn cho hồ sơ (bỏ câu nào số liệu bằng 0 / chưa có)
  function impactParagraph(st) {
    const k = st.kpi; if (!k.sessions) return "";
    const pc = (x) => Math.round(x * 100) + "%", out = [];
    out.push(`Từ ${fmtDate(k.from)} đến ${fmtDate(k.to)}, hệ thống được dùng trong ${k.sessions} tiết ở ${k.classes} lớp${k.grades.length ? ` (khối ${k.grades.join(", ")})` : ""}${k.students ? ` với ${k.students} lượt học sinh` : ""}.`);
    const s2 = []; if (k.presentRate) s2.push(`${pc(k.presentRate)} học sinh có mặt đã tham gia làm bài`); if (k.answerRate) s2.push(`${pc(k.answerRate)} nhóm trả lời từ 80% số câu trở lên`); if (k.autoGraded) s2.push(`hệ thống tự chấm ${k.autoGraded.toLocaleString("vi-VN")} lượt trả lời`);
    if (s2.length) out.push(s2.join("; ").replace(/^./, (c) => c.toUpperCase()) + ".");
    if (k.avgScore != null) out.push(`Điểm đánh giá thường xuyên trung bình ${String(k.avgScore).replace(".", ",")}/10.`);
    if (k.aiSessions) out.push(`Giáo viên dùng trợ lý AI phân tích sau ${k.aiSessions} tiết.`);
    return out.join(" ");
  }
  function impactWorkbook(st, filterText) {
    const H = (v) => ({ v, s: "head" }), Cc = (v) => ({ v, s: "cell" }), CT = (v) => ({ v, s: "center" }), N = (v) => (v == null ? CT("") : { v, s: "num1" }), P = (v) => (v == null ? CT("") : { v, s: "pct" }), W = (v) => ({ v, s: "wrap" });
    const k = st.kpi, now = Date.now();
    const r1 = [[{ v: "MINH CHỨNG TÁC ĐỘNG — LỚP HỌC TƯƠNG TÁC", s: "title" }], [{ v: (filterText || "") + "   ·   Xuất ngày " + fmtDate(now), s: "sub" }], [], [H("Chỉ số"), H("Giá trị"), H("Cách tính")],
      [Cc("Số tiết đã dạy"), CT(k.sessions), W("Số tiết sau bộ lọc (đã ẩn tiết chạy thử nếu bật)")], [Cc("Số lớp"), CT(k.classes), W("Số lớp khác nhau")], [Cc("Số bài giảng đã dùng"), CT(k.lessons), W("Số bài giảng khác nhau")],
      [Cc("Lượt học sinh tham gia"), CT(k.students), W("Tổng số học sinh đã vào nhóm của các tiết")], [Cc("Tỉ lệ HS có mặt tham gia"), P(k.presentRate), W("Σ HS đã vào nhóm ÷ Σ sĩ số (chỉ tiết phòng máy)")],
      [Cc("Tỉ lệ nhóm trả lời ≥ 80% số câu"), P(k.answerRate), W("Trung bình mỗi tiết: số nhóm làm ≥ 80% số bài ÷ số nhóm")], [Cc("Tỉ lệ hoàn thành bài"), P(k.completion), W("Trung bình đã làm ÷ số bài được tính của các nhóm")],
      [Cc("Điểm trung bình (thang 10)"), N(k.avgScore), W("Trung bình điểm các nhóm")], [Cc("Lượt trả lời được chấm tự động"), CT(k.autoGraded), W("Tổng số bài đã làm của mọi nhóm")],
      [Cc("Tiết có dùng trợ lý AI phân tích"), CT(k.aiSessions), W("Số tiết có sao chép câu lệnh hoặc lưu nhận xét AI")], [], [{ v: impactParagraph(st), s: "wrap" }]];
    const r2 = [[{ v: "THEO LỚP", s: "title" }], [{ v: filterText || "", s: "sub" }], [], ["Khối", "Lớp", "Số tiết", "Lượt HS", "Tỉ lệ tham gia", "Điểm TB", "TB tiết đầu", "TB tiết gần nhất"].map(H)];
    st.byClass.forEach((c) => r2.push([CT(c.grade), Cc(c.name), CT(c.sessions), CT(c.students), P(c.presentRate), N(c.avg), N(c.first), N(c.last)]));
    const r3 = [[{ v: "THEO TIẾT", s: "title" }], [{ v: filterText || "", s: "sub" }], [], ["Ngày", "Lớp", "Bài", "Hình thức", "Số nhóm", "Lượt HS", "Tỉ lệ nhóm trả lời ≥80%", "Điểm TB", "Có dùng AI"].map(H)];
    st.perSession.forEach((p) => r3.push([CT(fmtDate(p.at)), Cc(p.className), W(p.lessonTitle), CT(p.mode === "self" ? "Tự học" : "Phòng máy"), CT(p.groups), CT(p.joined), P(p.answerRate), N(p.avg), CT(p.ai ? "Có" : "")]));
    const r4 = [[{ v: "10 CÂU KHÓ NHẤT (ít nhất 5 nhóm làm)", s: "title" }], [{ v: filterText || "", s: "sub" }], [], ["STT", "Bài", "Hoạt động", "Câu hỏi / bài tập", "Số nhóm làm", "Tỉ lệ đạt"].map(H)];
    st.hardest.forEach((h, i) => r4.push([CT(i + 1), W(h.lessonTitle), W(h.activity), W(h.label), CT(h.done), P(h.rate)]));
    const d = new Date(now);
    return { filename: `MinhChung_TacDong_${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}.xlsx`, sheets: [
      { name: "Tổng quan", cols: [34, 14, 60], rows: r1, merges: ["A1:C1", "A2:C2", `A${r1.length}:C${r1.length}`], freezeRow: 4 },
      { name: "Theo lớp", cols: [7, 12, 9, 9, 12, 10, 12, 14], rows: r2, merges: ["A1:H1", "A2:H2"], freezeRow: 4 },
      { name: "Theo tiết", cols: [11, 10, 40, 11, 9, 9, 14, 9, 10], rows: r3, merges: ["A1:I1", "A2:I2"], freezeRow: 4 },
      { name: "Câu khó nhất", cols: [6, 30, 26, 60, 11, 10], rows: r4, merges: ["A1:F1", "A2:F2"], freezeRow: 4 },
    ] };
  }

  // ======================== B3: ĐÁNH GIÁ TỪNG HỌC SINH ========================
  // Dòng thời gian từng HS của 1 lớp: { [sid]: { name, entries: [ … ] } } (entries theo ngày tăng dần)
  function studentTimeline(sessions, lessons, classId, opts) {
    opts = Object.assign({ hideTest: true, withTexts: true, minGroups: 3 }, opts || {});
    const list = (sessions || []).filter((s) => { const m = s.meta || {}; return m.classId === classId && (!opts.from || (m.createdAt || 0) >= opts.from) && (!opts.to || (m.createdAt || 0) <= opts.to) && !(opts.hideTest && isTestSession(s, opts.minGroups)) && lessons[m.lessonId]; })
      .sort((a, b) => (a.meta.createdAt || 0) - (b.meta.createdAt || 0));
    const out = {}, names = Object.assign({}, opts.names || {});
    list.forEach((s) => {
      const m = s.meta, L = lessons[m.lessonId], info = lessonItems(L), cs = (s.claims || {}).students || {}, P = namePatterns(s.roster);
      const ex = (s.live || {}).excluded || {}, inc = info.items.filter((it) => !ex[it.aid]);
      const memberOf = {}; Object.entries(s.groups || {}).forEach(([g, x]) => Object.keys(x.members || {}).forEach((sid) => { memberOf[sid] = g; }));
      const sids = new Set(Object.keys(s.roster || {}).concat(Object.keys(names)));
      sids.forEach((sid) => {
        if (!(s.roster || {})[sid]) return; // HS chưa có trong lớp lúc đó
        const rec = out[sid] || (out[sid] = { name: names[sid] || s.roster[sid].name, entries: [] });
        const gid = cs[sid] && (s.groups || {})[cs[sid]] ? cs[sid] : memberOf[sid];
        const base = { sessionId: s.id, date: m.createdAt || 0, lessonId: m.lessonId, lessonTitle: m.lessonTitle, mode: m.mode === "self" ? "self" : "room" };
        if (!gid || !Object.keys(((s.answers || {})[gid]) || {}).length && !((s.texts || {})[gid])) { rec.entries.push(Object.assign(base, { present: false })); return; }
        const g = s.groups[gid], sc = scoreGroup(s, gid, info);
        const acts = []; L.activities.forEach((a, i) => { const aid = a.id || "a" + i, its = inc.filter((it) => it.aid === aid); if (!its.length) return; const js = its.map((it) => judge(it, answerOf(s, gid, it))).filter(Boolean); if (js.length) acts.push({ name: a.name, fraction: round1(js.reduce((t, j) => t + j.fraction, 0) / its.length * 10) / 10 }); });
        const wrong = [];
        inc.forEach((it) => { if (wrong.length >= 4) return; const r = answerOf(s, gid, it); if (!r) return; const j = judge(it, r); if (j.ok) return;
          const q = it.q, optText = (i) => (q.type === "true-false" ? (i ? "Đúng" : "Sai") : stripHtml((q.options || [])[i]));
          let chosen = "", correct = "";
          if (q && (q.type === "multiple-choice" || !q.type)) { chosen = optText(Number(r.choice)); correct = optText(q.answer); }
          else if (q && q.type === "true-false") { chosen = r.choice ? "Đúng" : "Sai"; correct = q.answer ? "Đúng" : "Sai"; }
          else if (q && q.type === "multiple-select") { chosen = [].concat(Array.isArray(r.choice) ? r.choice : Object.values(r.choice || {})).map((i) => optText(+i)).join(" + "); correct = (q.answer || []).map(optText).join(" + "); }
          else if (q) { chosen = String(r.choice == null ? "" : r.choice); correct = String(Array.isArray(q.answer) ? q.answer[0] : q.answer); }
          else { chosen = `đúng ${Math.round(j.fraction * 100)}% số mục`; correct = "đúng hết các mục"; }
          wrong.push({ label: cut(stripHtml(it.label), 90), chosen: cut(maskGiven(anonymize(chosen, s.roster, P), P), 80), correct: cut(correct, 80) }); });
        const texts = opts.withTexts ? info.openQs.map((o) => { const t = (((s.texts || {})[gid] || {})[o.aid] || {})[o.iid]; return t && t.text ? { question: cut(stripHtml(o.label), 120), text: cut(maskGiven(anonymize(t.text, s.roster, P), P), 300) } : null; }).filter(Boolean) : [];
        const gr = (s.grading || {})[gid] || {}, star = Object.values(gr.stars || {}).some((x) => x && Object.values(x).some(Boolean));
        rec.entries.push(Object.assign(base, { present: true, groupId: gid, groupSize: Math.max(1, Object.keys(g.members || {}).length), score: sc.score, done: sc.done, total: sc.total, acts, wrong, texts, star, bonus: +gr.bonus || 0 }));
      });
    });
    return out;
  }
  // Thống kê tổng của 1 HS (dùng cho câu lệnh và lọc nhóm cần hỗ trợ)
  function studentSummary(rec) {
    const e = rec.entries, pres = e.filter((x) => x.present), half = Math.ceil(e.length / 2);
    const h1 = e.slice(0, half).filter((x) => x.present), h2 = e.slice(half).filter((x) => x.present), self = pres.filter((x) => x.mode === "self");
    const av = (a) => (a.length ? round1(avgOf(a.map((x) => x.score))) : null);
    return { sessions: e.length, present: pres.length, avg: av(pres), firstHalf: av(h1), secondHalf: av(h2), selfAvg: av(self), selfCount: self.length,
      done: pres.reduce((t, x) => t + x.done, 0), total: pres.reduce((t, x) => t + x.total, 0), groupWork: pres.filter((x) => x.groupSize > 1).length };
  }
  function needSupport(timeline, crit) {
    crit = Object.assign({ minAvg: 5, drop: 1.5, absentRate: 0.3 }, crit || {});
    const out = [];
    Object.entries(timeline || {}).forEach(([sid, rec]) => {
      const s = studentSummary(rec), reasons = [];
      if (s.avg != null && s.avg < crit.minAvg) reasons.push(`Điểm TB ${String(s.avg).replace(".", ",")}`);
      if (s.firstHalf != null && s.secondHalf != null && s.firstHalf - s.secondHalf >= crit.drop) reasons.push(`Điểm giảm ${String(round1(s.firstHalf - s.secondHalf)).replace(".", ",")} (nửa đầu ${String(s.firstHalf).replace(".", ",")} → nửa sau ${String(s.secondHalf).replace(".", ",")})`);
      if (s.sessions && (s.sessions - s.present) / s.sessions >= crit.absentRate) reasons.push(`Không tham gia ${s.sessions - s.present}/${s.sessions} tiết`);
      if (reasons.length) out.push({ sid, reasons });
    });
    return out;
  }
  const EVAL_ROLE = `Bạn là giáo viên chủ nhiệm kiêm chuyên gia đánh giá môn Tin học THCS (Chương trình GDPT 2018, đánh giá theo
Thông tư 22/2021/TT-BGDĐT, sách Kết nối tri thức với cuộc sống). Dưới đây là dữ liệu học tập ẩn danh của học sinh,
mỗi em có một mã HSxx. Hãy đánh giá quá trình học tập và sự tiến bộ của từng em.
Quy tắc bắt buộc:
- Chỉ dựa vào dữ liệu được cung cấp. Mỗi nhận xét phải có căn cứ (tiết nào, bài nào, câu nào). Không bịa.
- Ở phòng máy nhiều em ngồi chung một máy nên kết quả là của cả nhóm (xem "lamCung"). Kết quả "tự học" là của riêng
  từng em, coi trọng hơn. Nếu phần lớn dữ liệu là làm theo nhóm hoặc có ít hơn 3 tiết, ghi độ tin cậy "thấp".
- Không suy đoán về sức khỏe, tâm lí, gia cảnh, tính cách. Không so sánh em này với em khác. Không dùng từ ngữ
  tiêu cực, dán nhãn ("lười", "kém"…); nói hạn chế bằng hành vi học tập cụ thể và cách khắc phục.
- Chỉ gọi học sinh bằng mã HSxx. Không tự đặt tên.
- Lời nhắn phụ huynh: tích cực, dễ hiểu, không thuật ngữ, tối đa 80 chữ, mở đầu bằng điểm tốt, có 1 việc cụ thể
  gia đình có thể cùng em làm.
- Trả lời DUY NHẤT một khối JSON đúng mẫu ở cuối, không thêm chữ nào ngoài khối JSON.`;
  function evalSchema(id, part, scope) {
    const o = { evaluationId: id, part, students: [{ code: "HS01", level: "Tốt | Khá | Đạt | Chưa đạt", strengths: ["ưu điểm có căn cứ"], weaknesses: ["hạn chế cụ thể, có căn cứ"],
      progress: { trend: "tiến bộ | ổn định | giảm | chưa đủ dữ liệu", evidence: "so sánh số liệu" }, improve: ["việc cần làm để cải thiện"],
      review: [{ lesson: "Bài …", topic: "kiến thức cần xem lại", why: "câu đã sai" }], teacherNote: "ghi chú chuyên môn cho giáo viên, tối đa 60 chữ",
      parentMessage: "lời nhắn phụ huynh, tối đa 80 chữ", confidence: "cao | trung bình | thấp", dataNote: "ghi chú về độ đầy đủ của dữ liệu" }] };
    if (scope !== "student") o.classSummary = { common_strengths: [], common_gaps: [], suggestions: [] };
    if (scope === "support") o.supportPlan = [{ codes: ["HS03"], goal: "", weeks: ["Tuần 1: …"] }];
    return o;
  }
  const v1 = (x) => (x == null ? "—" : String(x).replace(".", ","));
  // map: { HS01: sid } (chỉ các em của PHẦN này). opts: { format, evaluationId, part, parts, lessonsInfo:[{title, core:[]}], previous:{sid:{date,level,weaknesses,improve}},
  //   period, grade, scope, reasons:{sid:[…]}, classSessions, withTexts }
  const stripIcons = (t) => String(t || "").replace(/[\p{Extended_Pictographic}\uFE0F\u200D]/gu, "").replace(/\s+/g, " ").trim();
  const DETAIL_SESSIONS = 5;
  function evalPrompt(timeline, map, opts) {
    opts = Object.assign({ format: "md", part: 1, parts: 1, lessonsInfo: [], previous: {}, reasons: {}, scope: "class" }, opts || {});
    // dữ liệu trung gian dùng chung cho 2 định dạng
    const firstOf = {}; // "tiết|nhóm" -> mã HS đầu tiên đã ghi chi tiết (các bạn cùng máy dùng chung kết quả)
    const students = Object.entries(map).map(([code, sid]) => {
      const rec = timeline[sid] || { entries: [] }, s = studentSummary(rec), prev = opts.previous[sid];
      // chỉ ghi chi tiết (hoạt động, câu sai, tự luận) cho DETAIL_SESSIONS tiết có mặt gần nhất; tiết cũ hơn chỉ ghi điểm
      const pres = rec.entries.map((x, i) => (x.present ? i : -1)).filter((i) => i >= 0), detailFrom = pres.length > DETAIL_SESSIONS ? pres[pres.length - DETAIL_SESSIONS] : 0;
      return { code, summary: { soTietCoMat: `${s.present}/${s.sessions}`, diemTB: s.avg, nuaDau: s.firstHalf, nuaSau: s.secondHalf, diemTBTuHoc: s.selfAvg, soTietTuHoc: s.selfCount, soTietLamTheoNhom: s.groupWork, soCauDaLam: `${s.done}/${s.total}` },
        reasons: opts.reasons[sid] || null, previous: prev ? { ngay: fmtDate(prev.date || prev.at || 0), muc: prev.level || "", hanChe: prev.weaknesses || [], canCaiThien: prev.improve || [] } : null,
        sessions: rec.entries.map((x, i) => {
          if (x.present && i < detailFrom) return { ngay: fmtDate(x.date), bai: x.lessonTitle, hinhThuc: x.mode === "self" ? "tự học" : "phòng máy", lamCung: x.groupSize, diem: x.score, daLam: `${x.done}/${x.total}`, rutGon: true };
          const gk = x.present && x.groupSize > 1 && x.groupId ? x.sessionId + "|" + x.groupId : null, same = gk && firstOf[gk];
          if (gk && !same) firstOf[gk] = code;
          if (same) return { ngay: fmtDate(x.date), bai: x.lessonTitle, hinhThuc: "phòng máy", lamCung: x.groupSize, diem: x.score, daLam: `${x.done}/${x.total}`, cungMayVoi: same };
          return x.present ? { ngay: fmtDate(x.date), bai: x.lessonTitle, hinhThuc: x.mode === "self" ? "tự học" : "phòng máy", lamCung: x.groupSize, diem: x.score, daLam: `${x.done}/${x.total}`,
          hoatDongChuaDat: x.acts.filter((a) => a.fraction < 1).map((a) => `${cut(stripIcons(a.name), 50)}: ${Math.round(a.fraction * 100)}%`), cauSai: x.wrong.map((w) => `${w.label} — chọn: ${w.chosen || "?"}; đúng: ${w.correct}`), tuLuan: opts.withTexts === false ? [] : x.texts.map((t) => `${t.question}: ${t.text}`), gvDanhDau: x.star || undefined, diemThuong: x.bonus || undefined }
          : { ngay: fmtDate(x.date), bai: x.lessonTitle, hinhThuc: x.mode === "self" ? "tự học" : "phòng máy", khongThamGia: true }; }) };
    });
    const context = { evaluationId: opts.evaluationId, phan: `${opts.part}/${opts.parts}`, khoi: opts.grade || "", khoangThoiGian: opts.period || "", soTietCuaLop: opts.classSessions || 0,
      thangDiem: 10, mucDanhGia: ["Tốt", "Khá", "Đạt", "Chưa đạt"], baiDaHoc: opts.lessonsInfo.map((l) => ({ bai: l.title, kienThucTrongTam: (l.core || []).slice(0, 7) })),
      phamVi: opts.scope === "support" ? "nhóm học sinh cần hỗ trợ" : opts.scope === "student" ? "từng học sinh" : "cả lớp" };
    const schema = evalSchema(opts.evaluationId, opts.part, opts.scope);
    const extra = (opts.scope === "support" ? "\n- Phạm vi “nhóm cần hỗ trợ”: mỗi em có ghi lí do được lọc. Thêm mục supportPlan: kế hoạch kèm cặp 2–4 tuần." : "")
      + (students.some((x) => x.sessions.some((y) => y.rutGon)) ? `\n- Để câu lệnh gọn, chỉ ${DETAIL_SESSIONS} tiết có mặt gần nhất của mỗi em có chi tiết (hoạt động chưa đạt, câu sai, tự luận); tiết cũ hơn chỉ ghi điểm — vẫn dùng để nhận xét xu hướng.` : "")
      + (students.some((x) => x.sessions.some((y) => y.cungMayVoi)) ? "\n- “lamCung” / “Số HS cùng máy” = số em làm chung một máy. Tiết ghi “cùng máy với HSxx” có kết quả giống hệt HSxx (chi tiết ghi ở HSxx); nhận xét các em này dựa trên cùng dữ liệu đó." : "")
      + (students.some((x) => x.previous) ? "\n- Có “nhận xét lần trước”: hãy nói rõ em đã khắc phục được hạn chế cũ chưa (vẫn chỉ dùng mã HSxx của lần này)." : "");
    if (opts.format === "json") return JSON.stringify({ instructions: EVAL_ROLE + extra, outputSchema: schema, context, students }, null, 1);
    const L = [EVAL_ROLE + extra, "", `# Đánh giá học sinh — mã lượt ${opts.evaluationId} — phần ${opts.part}/${opts.parts}`, "",
      `- Khối: ${context.khoi} · Khoảng thời gian: ${context.khoangThoiGian} · Số tiết của lớp: ${context.soTietCuaLop} · Phạm vi: ${context.phamVi}`,
      "- Thang điểm 10. Mức đánh giá: Tốt · Khá · Đạt · Chưa đạt.", "", "## Các bài đã học"];
    context.baiDaHoc.forEach((b) => L.push(`- ${b.bai}${b.kienThucTrongTam.length ? ": " + b.kienThucTrongTam.join("; ") : ""}`));
    students.forEach((st) => {
      const s = st.summary; L.push("", `## ${st.code}`, `- Có mặt ${s.soTietCoMat} tiết · điểm TB ${v1(s.diemTB)} · nửa đầu ${v1(s.nuaDau)} → nửa sau ${v1(s.nuaSau)} · TB tiết tự học ${v1(s.diemTBTuHoc)} (${s.soTietTuHoc} tiết) · số tiết làm theo nhóm ${s.soTietLamTheoNhom} · đã làm ${s.soCauDaLam} câu`);
      if (st.reasons) L.push(`- Lí do cần hỗ trợ: ${st.reasons.join("; ")}`);
      if (st.previous) L.push(`- Nhận xét lần trước (${st.previous.ngay}): mức ${st.previous.muc}; hạn chế: ${st.previous.hanChe.join("; ") || "—"}; cần cải thiện: ${st.previous.canCaiThien.join("; ") || "—"}`);
      L.push("", "| Ngày | Bài | Hình thức | Số HS cùng máy | Điểm | Đã làm | Hoạt động chưa đạt 100% | Câu sai | Tự luận |", "|---|---|---|---|---|---|---|---|---|");
      st.sessions.forEach((x) => L.push(x.rutGon ? `| ${x.ngay} | ${x.bai} | ${x.hinhThuc} | ${x.lamCung} | ${v1(x.diem)} | ${x.daLam} | (tiết cũ — chỉ ghi điểm) | | |` : x.cungMayVoi ? `| ${x.ngay} | ${x.bai} | ${x.hinhThuc} | ${x.lamCung} | ${v1(x.diem)} | ${x.daLam} | cùng máy với ${x.cungMayVoi} — xem chi tiết ở ${x.cungMayVoi} | | |` : x.khongThamGia ? `| ${x.ngay} | ${x.bai} | ${x.hinhThuc} | — | — | — | không tham gia | — | — |`
        : `| ${x.ngay} | ${x.bai} | ${x.hinhThuc} | ${x.lamCung} | ${v1(x.diem)}${x.gvDanhDau ? " ⭐" : ""} | ${x.daLam} | ${x.hoatDongChuaDat.join("; ").replace(/\|/g, "/")} | ${x.cauSai.join(" • ").replace(/\|/g, "/") || "—"} | ${x.tuLuan.join(" • ").replace(/\|/g, "/") || "—"} |`));
    });
    L.push("", "## Mẫu JSON đầu ra (trả lời DUY NHẤT khối JSON này, đủ các mã ở trên)", "```json", JSON.stringify(schema, null, 2), "```");
    return L.join("\n");
  }
  const LEVELS = ["Tốt", "Khá", "Đạt", "Chưa đạt"], TRENDS = ["tiến bộ", "ổn định", "giảm", "chưa đủ dữ liệu"], CONF = ["cao", "trung bình", "thấp"];
  // Đọc JSON AI trả về. evaluation: { id, map:{HS01:sid}, partCodes:{ "1": ["HS01",…] } }
  function parseEvalReply(text, evaluations) {
    const res = { ok: false, error: "", evaluationId: null, part: null, students: [], unknownCodes: [], missingCodes: [], warnings: [], classSummary: null, supportPlan: null };
    let t = String(text || ""); const fence = /```(?:json)?\s*([\s\S]*?)```/i.exec(t); if (fence) t = fence[1];
    const a = t.indexOf("{"), b = t.lastIndexOf("}");
    if (a < 0 || b <= a) { res.error = "Không tìm thấy khối JSON trong nội dung đã dán."; return res; }
    let j; try { j = JSON.parse(t.slice(a, b + 1)); } catch (e) { res.error = "JSON không hợp lệ (" + e.message + ") — hãy dán lại nguyên văn câu trả lời của AI."; return res; }
    const ev = (evaluations || {})[j.evaluationId];
    if (!j.evaluationId || !ev) { res.error = "Kết quả này không thuộc lượt đánh giá nào — hãy dán đúng câu trả lời của câu lệnh vừa tạo."; return res; }
    res.evaluationId = j.evaluationId; res.part = +j.part || 1;
    const str = (x, n) => (typeof x === "string" ? x.trim().slice(0, n) : x == null ? "" : String(x).slice(0, n));
    const arr = (x, n) => (Array.isArray(x) ? x : x ? [x] : []).map((y) => str(typeof y === "object" ? JSON.stringify(y) : y, n)).filter(Boolean).slice(0, 10);
    const pick = (x, list) => { const v = str(x, 40); const k = list.find((l) => norm(l) === norm(v)); return k || ""; };
    const seen = new Set();
    (Array.isArray(j.students) ? j.students : []).forEach((s) => {
      const code = str(s && s.code, 10).toUpperCase(); if (!code) return;
      if (!ev.map[code]) { res.unknownCodes.push(code); return; }
      if (seen.has(code)) return; seen.add(code);
      const warn = [];
      const st = { code, sid: ev.map[code], level: pick(s.level, LEVELS), strengths: arr(s.strengths, 1000), weaknesses: arr(s.weaknesses, 1000),
        progress: { trend: pick(s.progress && s.progress.trend, TRENDS), evidence: str(s.progress && s.progress.evidence, 1000) }, improve: arr(s.improve, 1000),
        review: (Array.isArray(s.review) ? s.review : []).slice(0, 8).map((r) => ({ lesson: str(r && r.lesson, 200), topic: str(r && r.topic, 400), why: str(r && r.why, 400) })),
        teacherNote: str(s.teacherNote, 1000), parentMessage: str(s.parentMessage, 600), confidence: pick(s.confidence, CONF), dataNote: str(s.dataNote, 1000) };
      if (!st.level) warn.push("mức"); if (!st.parentMessage) warn.push("lời nhắn phụ huynh"); if (!st.progress.trend) warn.push("xu hướng"); if (!st.confidence) warn.push("độ tin cậy");
      st.warn = warn; res.students.push(st);
    });
    const expected = ((ev.partCodes || {})[String(res.part)]) || Object.keys(ev.map);
    res.missingCodes = expected.filter((c) => !seen.has(c));
    if (j.classSummary && typeof j.classSummary === "object") res.classSummary = { common_strengths: arr(j.classSummary.common_strengths, 600), common_gaps: arr(j.classSummary.common_gaps, 600), suggestions: arr(j.classSummary.suggestions, 600) };
    if (Array.isArray(j.supportPlan)) res.supportPlan = j.supportPlan.slice(0, 20).map((p) => ({ codes: arr(p && p.codes, 10).filter((c) => ev.map[c.toUpperCase()]).map((c) => c.toUpperCase()), goal: str(p && p.goal, 600), weeks: arr(p && p.weeks, 400) }));
    if (!res.students.length) { res.error = "Không đọc được học sinh nào trong kết quả (mục \"students\")."; return res; }
    res.ok = true; return res;
  }
  // Thay mã HSxx trong chữ bằng “em <tên gọi>” (chỉ trên máy GV)
  function decode(text, map, nameOf) { return String(text || "").replace(/\bHS\d{2,3}\b/g, (c) => (map[c] ? "em " + String(nameOf(map[c]) || c).trim().split(/\s+/).pop() : c)); }

  Object.assign(C, { anonymize, namePatterns, givenNameHits, leakCheck, aiPrompt, itemResults, stripHtml,
    periodRange, isTestSession, groupsWithWork, impactStats, impactParagraph, impactWorkbook,
    studentTimeline, studentSummary, needSupport, evalPrompt, parseEvalReply, decode });
  return C;
});
