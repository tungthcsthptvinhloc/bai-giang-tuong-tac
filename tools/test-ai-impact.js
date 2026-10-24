#!/usr/bin/env node
/* ============================================================================
 * test-ai-impact.js — kiểm thử các hàm thuần của B1 (🤖 Trợ lý AI), B2 (📈 Tác động), B3 (🎯 Đánh giá HS)
 *   node tools/test-ai-impact.js
 * Dựng dữ liệu giả trong bộ nhớ (không đụng dữ liệu thật). Thoát mã 1 nếu có kiểm tra sai.
 * ==========================================================================*/
"use strict";
const path = require("path");
const C = require(path.join(__dirname, "..", "lop-hoc", "public", "insight.js"));
let fail = 0, pass = 0;
const ok = (cond, msg) => { if (cond) { pass++; console.log("  ✅ " + msg); } else { fail++; console.log("  ❌ " + msg); } };

// ---------- bài giảng giả ----------
const L = {
  meta: { title: "Bài 6: Làm quen với phần mềm bảng tính" },
  coreKnowledge: ["Bảng tính gồm hàng, cột, ô", "Địa chỉ ô = tên cột + tên hàng"],
  activities: [
    { id: "a1", name: "Khởi động", type: "quiz", questions: [
      { question: "Ô nằm ở cột B hàng 3 có địa chỉ là?", type: "multiple-choice", options: ["3B", "B3", "B-3", "Ô3"], answer: 1, explanation: "Tên cột viết trước, tên hàng viết sau." },
      { question: "Trang tính gồm các hàng và cột.", type: "true-false", answer: true, explanation: "Đúng." },
    ] },
    { id: "a2", name: "Sắp xếp", type: "ordering", task: "Sắp xếp các bước", steps: ["Mở", "Nhập", "Lưu"] },
    { id: "a3", name: "Vận dụng", type: "vandung", cases: [{ question: "Em dùng bảng tính để làm gì?", answer: "" }] },
  ],
};
const roster = { s1: { name: "Nguyễn Văn An", order: 1 }, s2: { name: "Trần Thị Bình", order: 2 }, s3: { name: "Lê Minh Châu", order: 3 }, s4: { name: "Phạm Gia Huy", order: 4 } };
const sess1 = {
  meta: { lessonId: "tin7-bai06", lessonTitle: L.meta.title, classId: "c7a", className: "7A4", createdAt: Date.UTC(2026, 9, 20, 2), status: "ended", mode: "room" },
  roster, live: { follow: false },
  groups: { g1: { uid: "u1", machine: "m01", members: { s1: true }, createdAt: 1 }, g2: { uid: "u2", machine: "m02", members: { s2: true, s3: true }, createdAt: 2 }, g3: { uid: "u3", machine: "m03", members: { s4: true }, createdAt: 3 } },
  claims: { students: { s1: "g1", s2: "g2", s3: "g2", s4: "g3" } },
  answers: {
    g1: { a1: { q0: { choice: 0 }, q1: { choice: true } }, a2: { main: { choice: { o: [0, 1, 2] } } } },
    g2: { a1: { q0: { choice: 0 }, q1: { choice: true } }, a2: { main: { choice: { o: [1, 0, 2] } } } },
    g3: { a1: { q0: { choice: 1 }, q1: { choice: false } } },
  },
  texts: { g1: { a3: { t0: { text: "Bạn Văn An làm bảng điểm, gọi 0912345678", at: 1 } } }, g2: { a3: { t0: { text: "nguyen van an với Thị Bình lập bảng chi tiêu", at: 2 } } } },
};

console.log("B1 — aiPrompt / anonymize");
const r = C.aiPrompt(sess1, L, {});
ok(!/Nguyễn Văn An|nguyen van an/i.test(r.text), "không còn họ tên đầy đủ “Nguyễn Văn An”");
ok(!/Văn An|Thị Bình/i.test(r.text), "không còn cụm 2 chữ cuối “Văn An”, “Thị Bình”");
ok(!/0912345678/.test(r.text), "đã xoá số điện thoại");
ok(r.text.includes("(ĐÚNG)"), "có đánh dấu (ĐÚNG)");
const iQ0 = r.text.indexOf("Ô nằm ở cột B"), iQ1 = r.text.indexOf("Trang tính gồm");
ok(iQ0 > 0 && iQ1 > 0 && iQ0 < iQ1, "câu đạt thấp (B3: 33%) đứng trước câu đạt cao (67%)");
ok(r.text.includes("Nhóm 1") && r.text.includes("[HS]"), "tự luận dùng nhãn Nhóm N và [HS]");
ok(r.stats.groups === 3 && r.stats.items === 3 && r.stats.texts === 2, `thống kê: ${JSON.stringify(r.stats)}`);
ok(C.anonymize("NGUYỄN VĂN AN và Minh", roster) === "[HS] và Minh", "không phân biệt hoa thường; tên 1 chữ giữ nguyên");
ok(C.leakCheck("Bạn Minh, Châu trò chuyện", roster).length === 0 && C.leakCheck("Bạn Minh Châu trò chuyện", roster).length === 1, "“Minh, Châu” (cách bằng dấu phẩy) không bị coi là họ tên “Minh Châu”");

// ---------------- B2 ----------------
console.log("\nB2 — impactStats");
const clone = (o) => JSON.parse(JSON.stringify(o));
const sess2 = clone(sess1); sess2.meta.createdAt = Date.UTC(2026, 9, 22, 2);
const sess3 = clone(sess1); sess3.meta.createdAt = Date.UTC(2026, 9, 23, 2); sess3.groups = { g1: sess1.groups.g1 }; sess3.answers = { g1: sess1.answers.g1 }; sess3.claims = { students: { s1: "g1" } };
const lessons = { "tin7-bai06": L };
const all3 = [Object.assign({ id: "S1" }, sess1), Object.assign({ id: "S2" }, sess2), Object.assign({ id: "S3" }, sess3)];
const st = C.impactStats(all3, lessons, {}, { hideTest: true, ai: { S1: { copiedAt: 1 } } });
const info = C.lessonItems(L), sc = ["g1", "g2", "g3"].map((g) => C.scoreGroup(sess1, g, info));
ok(st.kpi.sessions === 2 && st.hidden.length === 1 && st.hidden[0].id === "S3", "tiết chỉ 1 nhóm bị ẩn khi hideTest");
ok(st.kpi.students === 8, `lượt HS = 4 + 4 = 8 (được ${st.kpi.students})`);
ok(Math.abs(st.kpi.presentRate - 1) < 1e-9, "tỉ lệ HS có mặt tham gia = 100%");
ok(st.kpi.autoGraded === 2 * sc.reduce((a, x) => a + x.done, 0), `lượt trả lời được chấm = ${st.kpi.autoGraded}`);
ok(st.kpi.avgScore === C.round1(sc.reduce((a, x) => a + x.score, 0) / 3), `điểm TB = ${st.kpi.avgScore}`);
ok(st.kpi.aiSessions === 1 && st.kpi.classes === 1 && st.kpi.lessons === 1, "đếm tiết có AI, số lớp, số bài");
const st2 = C.impactStats(all3, lessons, {}, { hideTest: false });
ok(st2.kpi.sessions === 3 && !st2.hidden.length, "bỏ ẩn tiết chạy thử -> tính đủ 3 tiết");
ok(/3 tiết/.test(C.impactParagraph(st2)) && !/0 tiết/.test(C.impactParagraph(st2)), "đoạn văn cho hồ sơ");
const wb = C.impactWorkbook(st, "test"); ok(wb.sheets.length === 4 && !JSON.stringify(wb).includes("Nguyễn"), "Excel minh chứng 4 sheet, không có họ tên");

// ---------------- B3 ----------------
console.log("\nB3 — studentTimeline / needSupport / evalPrompt / parseEvalReply");
const mkS = (id, day, mode, groups, answers) => ({ id, meta: { lessonId: "tin7-bai06", lessonTitle: L.meta.title, classId: "c7a", className: "7A4", createdAt: Date.UTC(2026, 8, day, 2), status: "ended", mode },
  roster, live: {}, groups, answers, claims: { students: Object.fromEntries([].concat(...Object.entries(groups).map(([g, x]) => Object.keys(x.members).map((s) => [s, g])))) }, texts: {} });
const right = { a1: { q0: { choice: 1 }, q1: { choice: true } }, a2: { main: { choice: { o: [0, 1, 2] } } } };
const wrongA = { a1: { q0: { choice: 0 }, q1: { choice: false } }, a2: { main: { choice: { o: [2, 1, 0] } } } };
const half = { a1: { q0: { choice: 1 }, q1: { choice: false } }, a2: { main: { choice: { o: [0, 1, 2] } } } };
// s1: giỏi; s2+s3 chung máy, giảm dần; s4 vắng 2 tiết, điểm thấp
const B = [
  mkS("T1", 5, "room", { g1: { members: { s1: true } }, g2: { members: { s2: true, s3: true } }, g4: { members: { s4: true } } }, { g1: right, g2: right, g4: wrongA }),
  mkS("T2", 12, "room", { g1: { members: { s1: true } }, g2: { members: { s2: true, s3: true } } }, { g1: right, g2: right }),
  mkS("T3", 19, "room", { g1: { members: { s1: true } }, g2: { members: { s2: true, s3: true } } }, { g1: right, g2: wrongA }),
  mkS("T4", 26, "self", { h1: { members: { s1: true } }, h2: { members: { s2: true } }, h3: { members: { s3: true } }, h4: { members: { s4: true } } }, { h1: right, h2: wrongA, h3: half, h4: wrongA }),
];
const tl = C.studentTimeline(B, lessons, "c7a", { hideTest: false });
ok(tl.s4.entries.filter((e) => !e.present).length === 2, "em vắng 2 tiết có 2 dòng present: false");
ok(tl.s2.entries[0].groupSize === 2 && tl.s1.entries[0].groupSize === 1 && tl.s2.entries[3].groupSize === 1, "groupSize: chung máy = 2, tự học = 1");
ok(tl.s1.entries.every((e) => e.score === 10) && tl.s2.entries[2].score === 1.1, "điểm từng tiết đúng như tính tay ((0 + 0 + 1/3) ÷ 3 × 10 = 1,1)");
const ns = C.needSupport(tl, { minAvg: 5, drop: 1.5, absentRate: 0.3 }), byS = Object.fromEntries(ns.map((x) => [x.sid, x.reasons.join(" | ")]));
ok(/Điểm TB/.test(byS.s4 || "") && /Không tham gia 2\/4/.test(byS.s4 || ""), `s4: ${byS.s4}`);
ok(/giảm/.test(byS.s2 || ""), `s2 giảm điểm: ${byS.s2}`);
ok(!byS.s1, "em học tốt không bị lọc");
const map = { HS01: "s3", HS02: "s1", HS03: "s4", HS04: "s2" };
for (const fmt of ["md", "json"]) {
  const p = C.evalPrompt(tl, map, { format: fmt, evaluationId: "e123", part: 1, parts: 1, lessonsInfo: [{ title: L.meta.title, core: L.coreKnowledge }], period: "01/09–30/09", grade: "7", classSessions: 4 });
  const leak = /Nguyễn|Văn An|Thị Bình|Minh Châu|Gia Huy/i.test(p) || /"s[1-4]"|\bs[1-4]\b/.test(p);
  ok(!leak, `${fmt}: không còn họ tên / mã nội bộ`);
  ok(["HS01", "HS02", "HS03", "HS04"].every((c) => p.includes(c)), `${fmt}: đủ mã HS01–HS04`);
  if (fmt === "json") { let okp = true; try { JSON.parse(p); } catch (e) { okp = false; } ok(okp, "json: JSON.parse được"); }
}
const evs = { e123: { map, partCodes: { 1: ["HS01", "HS02", "HS03", "HS04"] } } };
const reply = "Đây là kết quả:\n```json\n" + JSON.stringify({ evaluationId: "e123", part: 1, students: [{ code: "HS01", level: "Khá", strengths: ["a"], weaknesses: ["b"], progress: { trend: "giảm", evidence: "x" }, improve: ["c"], review: [], teacherNote: "t", parentMessage: "p", confidence: "thấp", dataNote: "" }, { code: "HS09", level: "Tốt" }, { code: "HS02", level: "Tốt" }] }) + "\n```\nChúc thầy cô…";
const pr = C.parseEvalReply(reply, evs);
ok(pr.ok && pr.students.length === 2, "đọc JSON trong khối ```json```");
ok(pr.unknownCodes.join() === "HS09" && pr.missingCodes.join() === "HS03,HS04", `mã lạ ${pr.unknownCodes}, AI bỏ sót ${pr.missingCodes}`);
ok(pr.students[1].warn.includes("lời nhắn phụ huynh"), "trường thiếu được đánh dấu ⚠️");
ok(C.parseEvalReply("abc {\"evaluationId\":\"e123\",\"part\":1,\"students\":[{\"code\":\"HS02\",\"level\":\"Tốt\"}]} xyz", evs).ok, "JSON lẫn chữ xung quanh");
ok(!C.parseEvalReply('{"evaluationId":"sai","students":[]}', evs).ok && /không thuộc lượt/.test(C.parseEvalReply('{"evaluationId":"sai","students":[]}', evs).error), "sai evaluationId -> báo lỗi");
ok(!C.parseEvalReply("không có json", evs).ok, "không có JSON -> báo lỗi, không treo");
ok(C.decode("HS02 làm tốt, HS01 cần cố gắng", map, (sid) => roster[sid].name) === "em An làm tốt, em Châu cần cố gắng", "thay mã bằng “em <tên>”");
// câu lệnh gọn: tiết cũ chỉ ghi điểm; bạn cùng máy không lặp chi tiết
const ent = (k, gid) => ({ sessionId: "s" + k, date: 1e12 + k * 864e5, lessonTitle: "Bài " + k, mode: "room", present: true, groupId: gid, groupSize: 2, score: 5, done: 3, total: 4, acts: [{ name: "HĐ 🎲", fraction: 0.5 }], wrong: [{ label: "Câu X" + k, chosen: "a", correct: "b" }], texts: [], star: false, bonus: 0 });
const tl2 = { x: { name: "A", entries: [1, 2, 3, 4, 5, 6, 7].map((k) => ent(k, "g1")) }, y: { name: "B", entries: [1, 2, 3, 4, 5, 6, 7].map((k) => ent(k, "g1")) } };
const p2 = C.evalPrompt(tl2, { HS01: "x", HS02: "y" }, { format: "md", evaluationId: "e9" });
ok(p2.split("chỉ ghi điểm)").length - 1 === 4 && !p2.includes("Câu X1 ") && p2.includes("Câu X7"), "chỉ 5 tiết gần nhất có chi tiết (2 em × 2 tiết cũ chỉ ghi điểm)");
ok(p2.split("| cùng máy với HS01").length - 1 === 5 && !/HĐ 🎲/.test(p2), "bạn cùng máy ghi “cùng máy với HS01”; tên hoạt động bỏ biểu tượng");

console.log(`\n${fail ? "❌" : "✅"} ${pass} đạt, ${fail} sai`);
process.exit(fail ? 1 : 0);
