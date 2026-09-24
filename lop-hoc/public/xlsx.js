/* ============================================================================
 * xlsx.js — ĐỌC & GHI file Excel .xlsx không cần thư viện (trình duyệt + Node).
 *
 *   XLSX.build(sheets)      -> Uint8Array (file .xlsx)
 *     sheets: [{ name, cols:[độ rộng], rows:[[ô]], merges:["A1:F1"], freezeRow }]
 *     ô: chuỗi | số | null | { v, s: title|sub|head|cell|num1|num1b|pct|wrap|center }
 *   XLSX.download(sheets, "ten.xlsx")          (trình duyệt)
 *   XLSX.read(arrayBuffer) -> Promise<[{ name, rows:[[chuỗi]] }]>   (.xlsx; trình duyệt)
 *   XLSX.readCSV(text)     -> [{ name: "CSV", rows }]
 * ==========================================================================*/
(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.XLSX = api;
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";
  const enc = (s) => new TextEncoder().encode(s);
  const CRC = (() => { const t = new Uint32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return t; })();
  function crc32(b) { let c = 0xffffffff; for (let i = 0; i < b.length; i++) c = CRC[(c ^ b[i]) & 0xff] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; }
  // Node có zlib -> nén; trình duyệt -> lưu không nén (Excel đọc bình thường)
  let deflate = null;
  try { if (typeof require === "function" && typeof window === "undefined") { const z = require("zlib"); deflate = (u) => new Uint8Array(z.deflateRawSync(u)); } } catch (e) {}

  function zip(files) {
    const now = new Date();
    const dosTime = (now.getHours() << 11) | (now.getMinutes() << 5) | (now.getSeconds() >> 1);
    const dosDate = ((now.getFullYear() - 1980) << 9) | ((now.getMonth() + 1) << 5) | now.getDate();
    const parts = [], central = []; let off = 0;
    for (const f of files) {
      const name = enc(f.name), raw = enc(f.data), crc = crc32(raw);
      const data = deflate ? deflate(raw) : raw, method = deflate ? 8 : 0;
      const lh = new DataView(new ArrayBuffer(30));
      lh.setUint32(0, 0x04034b50, true); lh.setUint16(4, 20, true); lh.setUint16(6, 0x0800, true); lh.setUint16(8, method, true);
      lh.setUint16(10, dosTime, true); lh.setUint16(12, dosDate, true); lh.setUint32(14, crc, true);
      lh.setUint32(18, data.length, true); lh.setUint32(22, raw.length, true); lh.setUint16(26, name.length, true);
      const ch = new DataView(new ArrayBuffer(46));
      ch.setUint32(0, 0x02014b50, true); ch.setUint16(4, 20, true); ch.setUint16(6, 20, true); ch.setUint16(8, 0x0800, true); ch.setUint16(10, method, true);
      ch.setUint16(12, dosTime, true); ch.setUint16(14, dosDate, true); ch.setUint32(16, crc, true);
      ch.setUint32(20, data.length, true); ch.setUint32(24, raw.length, true); ch.setUint16(28, name.length, true); ch.setUint32(42, off, true);
      parts.push(new Uint8Array(lh.buffer), name, data); central.push(new Uint8Array(ch.buffer), name);
      off += 30 + name.length + data.length;
    }
    const cdLen = central.reduce((t, b) => t + b.length, 0);
    const end = new DataView(new ArrayBuffer(22));
    end.setUint32(0, 0x06054b50, true); end.setUint16(8, files.length, true); end.setUint16(10, files.length, true);
    end.setUint32(12, cdLen, true); end.setUint32(16, off, true);
    const all = [...parts, ...central, new Uint8Array(end.buffer)], out = new Uint8Array(all.reduce((t, b) => t + b.length, 0));
    let p = 0; for (const b of all) { out.set(b, p); p += b.length; }
    return out;
  }

  const STYLE = { title: 1, head: 2, cell: 3, num1: 4, pct: 5, wrap: 6, sub: 7, num1b: 8, center: 9 };
  const STYLES_XML = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><numFmts count="1"><numFmt numFmtId="164" formatCode="0.0"/></numFmts>
<fonts count="4"><font><sz val="12"/><name val="Times New Roman"/></font><font><b/><sz val="12"/><name val="Times New Roman"/></font><font><b/><sz val="15"/><color rgb="FF1F3864"/><name val="Times New Roman"/></font><font><i/><sz val="11"/><color rgb="FF595959"/><name val="Times New Roman"/></font></fonts>
<fills count="3"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FFDDEBF7"/><bgColor indexed="64"/></patternFill></fill></fills>
<borders count="2"><border><left/><right/><top/><bottom/><diagonal/></border><border><left style="thin"><color rgb="FF9E9E9E"/></left><right style="thin"><color rgb="FF9E9E9E"/></right><top style="thin"><color rgb="FF9E9E9E"/></top><bottom style="thin"><color rgb="FF9E9E9E"/></bottom><diagonal/></border></borders>
<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>
<cellXfs count="10"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>
<xf numFmtId="0" fontId="2" fillId="0" borderId="0" xfId="0" applyFont="1"/>
<xf numFmtId="0" fontId="1" fillId="2" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf>
<xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyBorder="1" applyAlignment="1"><alignment vertical="top"/></xf>
<xf numFmtId="164" fontId="0" fillId="0" borderId="1" xfId="0" applyNumberFormat="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="top"/></xf>
<xf numFmtId="9" fontId="0" fillId="0" borderId="1" xfId="0" applyNumberFormat="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="top"/></xf>
<xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyBorder="1" applyAlignment="1"><alignment vertical="top" wrapText="1"/></xf>
<xf numFmtId="0" fontId="3" fillId="0" borderId="0" xfId="0" applyFont="1"/>
<xf numFmtId="164" fontId="1" fillId="0" borderId="1" xfId="0" applyNumberFormat="1" applyFont="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="top"/></xf>
<xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="top"/></xf></cellXfs>
<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles></styleSheet>`;
  const xmlEsc = (s) => String(s).replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  function colName(i) { let s = ""; i++; while (i > 0) { const m = (i - 1) % 26; s = String.fromCharCode(65 + m) + s; i = Math.floor((i - 1) / 26); } return s; }
  function sheetXml(sh) {
    const o = [`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">`];
    if (sh.freezeRow) o.push(`<sheetViews><sheetView workbookViewId="0"><pane ySplit="${sh.freezeRow}" topLeftCell="A${sh.freezeRow + 1}" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews>`);
    if (sh.cols && sh.cols.length) o.push("<cols>" + sh.cols.map((w, i) => `<col min="${i + 1}" max="${i + 1}" width="${w}" customWidth="1"/>`).join("") + "</cols>");
    o.push("<sheetData>");
    (sh.rows || []).forEach((row, r) => {
      const cells = [];
      (row || []).forEach((cell, c) => {
        if (cell == null || cell === "") return;
        const x = typeof cell === "object" ? cell : { v: cell }, ref = colName(c) + (r + 1), s = x.s ? ` s="${STYLE[x.s] || 0}"` : "";
        if (x.v == null || x.v === "") { if (x.s) cells.push(`<c r="${ref}"${s}/>`); return; }
        if (typeof x.v === "number" && isFinite(x.v)) cells.push(`<c r="${ref}"${s}><v>${x.v}</v></c>`);
        else cells.push(`<c r="${ref}"${s} t="inlineStr"><is><t xml:space="preserve">${xmlEsc(x.v)}</t></is></c>`);
      });
      o.push(`<row r="${r + 1}">${cells.join("")}</row>`);
    });
    o.push("</sheetData>");
    if (sh.merges && sh.merges.length) o.push(`<mergeCells count="${sh.merges.length}">${sh.merges.map((m) => `<mergeCell ref="${m}"/>`).join("")}</mergeCells>`);
    o.push(`<pageMargins left="0.5" right="0.4" top="0.6" bottom="0.6" header="0.3" footer="0.3"/></worksheet>`);
    return o.join("");
  }
  function build(sheets) {
    const used = new Set();
    const names = sheets.map((sh, i) => { let n = String(sh.name || "Sheet" + (i + 1)).replace(/[\[\]:*?/\\]/g, " ").slice(0, 31); while (used.has(n)) n = n.slice(0, 28) + " " + i; used.add(n); return n; });
    const N = "http://schemas.openxmlformats.org", H = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n`;
    return zip([
      { name: "[Content_Types].xml", data: `${H}<Types xmlns="${N}/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>${sheets.map((_, i) => `<Override PartName="/xl/worksheets/sheet${i + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`).join("")}</Types>` },
      { name: "_rels/.rels", data: `${H}<Relationships xmlns="${N}/package/2006/relationships"><Relationship Id="rId1" Type="${N}/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>` },
      { name: "xl/workbook.xml", data: `${H}<workbook xmlns="${N}/spreadsheetml/2006/main" xmlns:r="${N}/officeDocument/2006/relationships"><sheets>${names.map((n, i) => `<sheet name="${xmlEsc(n)}" sheetId="${i + 1}" r:id="rId${i + 1}"/>`).join("")}</sheets></workbook>` },
      { name: "xl/_rels/workbook.xml.rels", data: `${H}<Relationships xmlns="${N}/package/2006/relationships">${sheets.map((_, i) => `<Relationship Id="rId${i + 1}" Type="${N}/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${i + 1}.xml"/>`).join("")}<Relationship Id="rId${sheets.length + 1}" Type="${N}/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>` },
      { name: "xl/styles.xml", data: STYLES_XML },
      ...sheets.map((sh, i) => ({ name: `xl/worksheets/sheet${i + 1}.xml`, data: sheetXml(sh) })),
    ]);
  }
  function download(sheets, filename) {
    const blob = new Blob([build(sheets)], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = filename; document.body.appendChild(a); a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  }

  // ---- ĐỌC .xlsx (trình duyệt: giải nén bằng DecompressionStream) ---------------------
  async function unzipEntries(buf) {
    const u8 = new Uint8Array(buf), dv = new DataView(buf);
    let e = u8.length - 22; while (e >= 0 && dv.getUint32(e, true) !== 0x06054b50) e--;
    if (e < 0) throw new Error("Không phải file .xlsx hợp lệ (nếu là .xls cũ, hãy mở bằng Excel rồi Lưu thành .xlsx).");
    const count = dv.getUint16(e + 10, true); let p = dv.getUint32(e + 16, true);
    const out = {}, dec = new TextDecoder();
    for (let i = 0; i < count; i++) {
      const method = dv.getUint16(p + 10, true), csize = dv.getUint32(p + 20, true), nlen = dv.getUint16(p + 28, true), xlen = dv.getUint16(p + 30, true), clen = dv.getUint16(p + 32, true), loff = dv.getUint32(p + 42, true);
      const name = dec.decode(u8.subarray(p + 46, p + 46 + nlen));
      const start = loff + 30 + dv.getUint16(loff + 26, true) + dv.getUint16(loff + 28, true);
      out[name] = { method, data: u8.subarray(start, start + csize) };
      p += 46 + nlen + xlen + clen;
    }
    return out;
  }
  async function inflate(ent) {
    if (ent.method === 0) return new TextDecoder().decode(ent.data);
    if (typeof DecompressionStream === "undefined") throw new Error("Trình duyệt quá cũ, không đọc được .xlsx. Hãy dùng Chrome/Edge mới hoặc lưu file dạng .csv.");
    const ds = new DecompressionStream("deflate-raw");
    const stream = new Blob([ent.data]).stream().pipeThrough(ds);
    return await new Response(stream).text();
  }
  const colIndex = (ref) => { const m = /^([A-Z]+)/.exec(ref || ""); if (!m) return 0; let n = 0; for (const ch of m[1]) n = n * 26 + ch.charCodeAt(0) - 64; return n - 1; };
  async function read(buf) {
    const z = await unzipEntries(buf), P = new DOMParser();
    const xml = async (n) => z[n] ? P.parseFromString(await inflate(z[n]), "application/xml") : null;
    const byTag = (doc, t) => [...doc.getElementsByTagName(t)];
    const shared = [], ss = await xml("xl/sharedStrings.xml");
    if (ss) byTag(ss, "si").forEach((si) => shared.push(byTag(si, "t").map((t) => t.textContent).join("")));
    const wb = await xml("xl/workbook.xml"), rels = await xml("xl/_rels/workbook.xml.rels");
    const relMap = {}; if (rels) byTag(rels, "Relationship").forEach((r) => { relMap[r.getAttribute("Id")] = r.getAttribute("Target"); });
    const sheets = [];
    for (const s of wb ? byTag(wb, "sheet") : []) {
      const rid = s.getAttribute("r:id") || s.getAttributeNS("http://schemas.openxmlformats.org/officeDocument/2006/relationships", "id");
      let target = relMap[rid] || ""; target = target.replace(/^\/?(xl\/)?/, "xl/");
      const doc = await xml(target); if (!doc) continue;
      const rows = [];
      byTag(doc, "row").forEach((row) => {
        const r = (+row.getAttribute("r") || rows.length + 1) - 1, arr = [];
        byTag(row, "c").forEach((c) => {
          const t = c.getAttribute("t"), v = c.getElementsByTagName("v")[0];
          let val = "";
          if (t === "s") val = shared[+(v && v.textContent)] || "";
          else if (t === "inlineStr") val = byTag(c, "t").map((x) => x.textContent).join("");
          else val = v ? v.textContent : "";
          arr[colIndex(c.getAttribute("r"))] = String(val).trim();
        });
        rows[r] = arr;
      });
      sheets.push({ name: s.getAttribute("name"), rows: Array.from(rows, (x) => x || []) });
    }
    return sheets;
  }
  function readCSV(text) {
    text = String(text || "").replace(/^﻿/, "");
    const first = text.split(/\r?\n/)[0] || "", delim = ["\t", ";", ","].sort((a, b) => first.split(b).length - first.split(a).length)[0];
    const rows = []; let row = [], cell = "", q = false;
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (q) { if (ch === '"' && text[i + 1] === '"') { cell += '"'; i++; } else if (ch === '"') q = false; else cell += ch; }
      else if (ch === '"') q = true;
      else if (ch === delim) { row.push(cell.trim()); cell = ""; }
      else if (ch === "\n" || ch === "\r") { if (ch === "\r" && text[i + 1] === "\n") i++; row.push(cell.trim()); rows.push(row); row = []; cell = ""; }
      else cell += ch;
    }
    if (cell || row.length) { row.push(cell.trim()); rows.push(row); }
    return [{ name: "CSV", rows }];
  }
  return { build, download, read, readCSV, colName };
});
