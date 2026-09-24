/* ============================================================================
 * Tạo mã QR (chế độ byte, mức sửa lỗi M, phiên bản 1–6 — tối đa ~100 ký tự),
 * đủ cho địa chỉ "http://192.168.x.x:8080/". Không cần Internet/thư viện.
 *   QR.svg("http://...") -> chuỗi <svg>
 * ==========================================================================*/
(function (global) {
  "use strict";
  // mức M: [số từ mã sửa lỗi / khối, số khối, số từ mã dữ liệu / khối]
  const EC_M = [null, [10, 1, 16], [16, 1, 28], [26, 1, 44], [18, 2, 32], [24, 2, 43], [16, 4, 27]];
  const ALIGN = [null, [], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34]];

  const EXP = new Array(512), LOG = new Array(256);
  (function () { let x = 1; for (let i = 0; i < 255; i++) { EXP[i] = x; LOG[x] = i; x <<= 1; if (x & 0x100) x ^= 0x11d; } for (let i = 255; i < 512; i++) EXP[i] = EXP[i - 255]; })();
  const mul = (a, b) => (a && b ? EXP[LOG[a] + LOG[b]] : 0);
  function rsDivisor(deg) {
    const r = new Array(deg).fill(0); r[deg - 1] = 1; let root = 1;
    for (let i = 0; i < deg; i++) {
      for (let j = 0; j < r.length; j++) { r[j] = mul(r[j], root); if (j + 1 < r.length) r[j] ^= r[j + 1]; }
      root = mul(root, 2);
    }
    return r;
  }
  function rsRemainder(data, div) {
    const r = div.map(() => 0);
    for (const b of data) { const f = b ^ r.shift(); r.push(0); div.forEach((c, i) => { r[i] ^= mul(c, f); }); }
    return r;
  }

  const MASKS = [
    (x, y) => (x + y) % 2 === 0, (x, y) => y % 2 === 0, (x, y) => x % 3 === 0, (x, y) => (x + y) % 3 === 0,
    (x, y) => (Math.floor(x / 3) + Math.floor(y / 2)) % 2 === 0, (x, y) => (x * y) % 2 + (x * y) % 3 === 0,
    (x, y) => ((x * y) % 2 + (x * y) % 3) % 2 === 0, (x, y) => ((x + y) % 2 + (x * y) % 3) % 2 === 0,
  ];

  function matrix(text) {
    const bytes = Array.from(new TextEncoder().encode(text));
    let ver = 1;
    while (ver <= 6 && 12 + bytes.length * 8 > EC_M[ver][1] * EC_M[ver][2] * 8) ver++;
    if (ver > 6) throw new Error("Chuỗi quá dài cho mã QR");
    const [ecLen, nBlocks, dLen] = EC_M[ver], cap = nBlocks * dLen * 8;

    // 1) chuỗi bit dữ liệu
    const bits = [];
    const put = (v, n) => { for (let i = n - 1; i >= 0; i--) bits.push((v >>> i) & 1); };
    put(4, 4); put(bytes.length, 8); bytes.forEach((b) => put(b, 8));
    put(0, Math.min(4, cap - bits.length)); put(0, (8 - (bits.length % 8)) % 8);
    for (let pad = 0xec; bits.length < cap; pad ^= 0xec ^ 0x11) put(pad, 8);
    const data = []; for (let i = 0; i < bits.length; i += 8) { let v = 0; for (let j = 0; j < 8; j++) v = (v << 1) | bits[i + j]; data.push(v); }

    // 2) chia khối + mã sửa lỗi Reed–Solomon, xen kẽ
    const div = rsDivisor(ecLen), blocks = [], ecs = [];
    for (let b = 0; b < nBlocks; b++) { const d = data.slice(b * dLen, (b + 1) * dLen); blocks.push(d); ecs.push(rsRemainder(d, div)); }
    const cw = [];
    for (let i = 0; i < dLen; i++) blocks.forEach((d) => cw.push(d[i]));
    for (let i = 0; i < ecLen; i++) ecs.forEach((e) => cw.push(e[i]));

    // 3) ma trận + các mẫu chức năng
    const size = ver * 4 + 17;
    const mod = Array.from({ length: size }, () => new Array(size).fill(false));
    const fn = Array.from({ length: size }, () => new Array(size).fill(false));
    const set = (x, y, dark) => { mod[y][x] = dark; fn[y][x] = true; };
    for (let i = 0; i < size; i++) { set(6, i, i % 2 === 0); set(i, 6, i % 2 === 0); }
    const finder = (cx, cy) => { for (let dy = -4; dy <= 4; dy++) for (let dx = -4; dx <= 4; dx++) { const x = cx + dx, y = cy + dy; if (x >= 0 && x < size && y >= 0 && y < size) { const d = Math.max(Math.abs(dx), Math.abs(dy)); set(x, y, d !== 2 && d !== 4); } } };
    finder(3, 3); finder(size - 4, 3); finder(3, size - 4);
    const al = ALIGN[ver], last = al.length - 1;
    al.forEach((ax, i) => al.forEach((ay, j) => {
      if ((i === 0 && j === 0) || (i === 0 && j === last) || (i === last && j === 0)) return;
      for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) set(ax + dx, ay + dy, Math.max(Math.abs(dx), Math.abs(dy)) !== 1);
    }));
    const drawFormat = (mask) => {
      const d = (0 << 3) | mask; // mức M = 00
      let rem = d; for (let i = 0; i < 10; i++) rem = (rem << 1) ^ ((rem >>> 9) * 0x537);
      const f = ((d << 10) | rem) ^ 0x5412, bit = (i) => ((f >>> i) & 1) === 1;
      for (let i = 0; i <= 5; i++) set(8, i, bit(i));
      set(8, 7, bit(6)); set(8, 8, bit(7)); set(7, 8, bit(8));
      for (let i = 9; i < 15; i++) set(14 - i, 8, bit(i));
      for (let i = 0; i < 8; i++) set(size - 1 - i, 8, bit(i));
      for (let i = 8; i < 15; i++) set(8, size - 15 + i, bit(i));
      set(8, size - 8, true);
    };
    drawFormat(0);

    // 4) đặt dữ liệu theo đường zig-zag
    let k = 0;
    for (let right = size - 1; right >= 1; right -= 2) {
      if (right === 6) right = 5;
      for (let v = 0; v < size; v++) for (let j = 0; j < 2; j++) {
        const x = right - j, up = ((right + 1) & 2) === 0, y = up ? size - 1 - v : v;
        if (!fn[y][x] && k < cw.length * 8) { mod[y][x] = ((cw[k >>> 3] >>> (7 - (k & 7))) & 1) === 1; k++; }
      }
    }

    // 5) chọn mặt nạ có điểm phạt thấp nhất
    const applyMask = (m) => { for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) if (!fn[y][x] && MASKS[m](x, y)) mod[y][x] = !mod[y][x]; };
    const penalty = () => {
      let p = 0, dark = 0;
      for (let a = 0; a < size; a++) {
        let rc = 1, cc = 1;
        for (let b = 0; b < size; b++) {
          if (mod[a][b]) dark++;
          if (b > 0) {
            if (mod[a][b] === mod[a][b - 1]) rc++; else { if (rc >= 5) p += rc - 2; rc = 1; }
            if (mod[b][a] === mod[b - 1][a]) cc++; else { if (cc >= 5) p += cc - 2; cc = 1; }
          }
          if (a > 0 && b > 0 && mod[a][b] === mod[a - 1][b] && mod[a][b] === mod[a][b - 1] && mod[a][b] === mod[a - 1][b - 1]) p += 3;
        }
        if (rc >= 5) p += rc - 2; if (cc >= 5) p += cc - 2;
      }
      return p + 10 * Math.floor(Math.abs(dark * 20 / (size * size) - 10));
    };
    let best = 0, bestP = Infinity;
    for (let m = 0; m < 8; m++) { applyMask(m); drawFormat(m); const pn = penalty(); if (pn < bestP) { bestP = pn; best = m; } applyMask(m); }
    applyMask(best); drawFormat(best);
    return mod;
  }

  function svg(text, border) {
    const m = matrix(text), b = border == null ? 4 : border, n = m.length + b * 2;
    let d = "";
    m.forEach((row, y) => row.forEach((dark, x) => { if (dark) d += `M${x + b},${y + b}h1v1h-1z`; }));
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${n} ${n}" shape-rendering="crispEdges"><rect width="${n}" height="${n}" fill="#fff"/><path d="${d}" fill="#000"/></svg>`;
  }

  global.QR = { matrix, svg };
})(typeof window !== "undefined" ? window : globalThis);
