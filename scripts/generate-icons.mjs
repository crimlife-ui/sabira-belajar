// Generator ikon PWA murni Node (tanpa dependensi): balon putih di latar gradien pink-indigo.
// Output: public/icons/icon-192.png, icon-512.png, icon-512-maskable.png, apple-touch-icon.png
import zlib from "node:zlib";
import fs from "node:fs";
import path from "node:path";

// ---------- PNG encoder ----------
let CRC_TABLE;
function crc32(buf) {
  if (!CRC_TABLE) {
    CRC_TABLE = new Int32Array(256);
    for (let n = 0; n < 256; n++) {
      let c = n;
      for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      CRC_TABLE[n] = c;
    }
  }
  let crc = -1;
  for (let i = 0; i < buf.length; i++) crc = (crc >>> 8) ^ CRC_TABLE[(crc ^ buf[i]) & 0xff];
  return (crc ^ -1) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const td = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(td));
  return Buffer.concat([len, td, crc]);
}

function encodePng(width, height, rgba) {
  const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type RGBA
  const stride = width * 4 + 1;
  const raw = Buffer.alloc(stride * height);
  for (let y = 0; y < height; y++) {
    raw[y * stride] = 0; // filter: none
    rgba.copy(raw, y * stride + 1, y * width * 4, (y + 1) * width * 4);
  }
  const idat = zlib.deflateSync(raw, { level: 9 });
  return Buffer.concat([sig, chunk("IHDR", ihdr), chunk("IDAT", idat), chunk("IEND", Buffer.alloc(0))]);
}

// ---------- Drawing helpers ----------
const lerp = (a, b, t) => a + (b - a) * t;
const dist = (x1, y1, x2, y2) => Math.hypot(x1 - x2, y1 - y2);

function roundedRectSDF(px, py, size, radius) {
  const half = size / 2;
  const qx = Math.abs(px - half) - (half - radius);
  const qy = Math.abs(py - half) - (half - radius);
  const ox = Math.max(qx, 0);
  const oy = Math.max(qy, 0);
  return Math.hypot(ox, oy) + Math.min(Math.max(qx, qy), 0) - radius;
}

function renderIcon(size, { maskable = false } = {}) {
  const SS = 3; // supersampling per axis
  const rgba = Buffer.alloc(size * size * 4);
  const cornerR = size * 0.18;
  // Zona aman maskable: konten di 80% tengah
  const cx = size / 2;
  const cy = size * (maskable ? 0.52 : 0.5);
  const br = size * (maskable ? 0.2 : 0.26); // radius balon
  const lineW = size * 0.014;

  // Titik sampel tali (kurva bezier dari simpul balon ke bawah berkelok)
  const knotY = cy + br + size * 0.02;
  const strLen = maskable ? size * 0.1 : size * 0.16;
  const p0 = [cx, knotY];
  const p1 = [cx - size * 0.07, knotY + strLen * 0.55];
  const p2 = [cx + size * 0.04, knotY + strLen];
  const stringPts = [];
  for (let i = 0; i <= 48; i++) {
    const t = i / 48;
    const mt = 1 - t;
    stringPts.push([
      mt * mt * p0[0] + 2 * mt * t * p1[0] + t * t * p2[0],
      mt * mt * p0[1] + 2 * mt * t * p1[1] + t * t * p2[1],
    ]);
  }

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let r = 0, g = 0, b = 0, a = 0;
      for (let sy = 0; sy < SS; sy++) {
        for (let sx = 0; sx < SS; sx++) {
          const px = x + (sx + 0.5) / SS;
          const py = y + (sy + 0.5) / SS;

          // Latar: rounded rect (full bleed untuk maskable)
          const insideBg = maskable || roundedRectSDF(px, py, size, cornerR) < 0;
          if (!insideBg) continue;

          // Gradien diagonal pink-400 -> indigo-500
          const t = Math.min(1, Math.max(0, (px + py) / (2 * size)));
          let cr = lerp(244, 129, t);
          let cg = lerp(114, 140, t);
          let cb = lerp(182, 248, t);
          let alpha = 1;

          // Balon utama (putih)
          if (dist(px, py, cx, cy) < br) {
            cr = cg = cb = 255;
          }
          // Simpul balon (segitiga kecil)
          const kx = Math.abs(px - cx);
          const ky = py - knotY;
          if (ky > 0 && ky < size * 0.05 && kx < ky * 0.7) {
            cr = cg = cb = 255;
          }
          // Tali
          for (const [sx2, sy2] of stringPts) {
            if (dist(px, py, sx2, sy2) < lineW) {
              cr = cg = cb = 255;
              break;
            }
          }
          // Gelembung kecil dekoratif (putih transparan)
          const bubbles = [
            [size * 0.18, size * 0.2, size * 0.045],
            [size * 0.82, size * 0.72, size * 0.032],
          ];
          for (const [bx, by, brad] of bubbles) {
            const d = dist(px, py, bx, by);
            if (d < brad) {
              const bAlpha = 0.55 * (1 - d / brad);
              cr = lerp(cr, 255, bAlpha);
              cg = lerp(cg, 255, bAlpha);
              cb = lerp(cb, 255, bAlpha);
            }
          }

          r += cr; g += cg; b += cb; a += alpha;
        }
      }
      const n = SS * SS;
      const idx = (y * size + x) * 4;
      rgba[idx] = Math.round(r / n);
      rgba[idx + 1] = Math.round(g / n);
      rgba[idx + 2] = Math.round(b / n);
      rgba[idx + 3] = Math.round((a / n) * 255);
    }
  }
  return encodePng(size, size, rgba);
}

const outDir = path.resolve("public/icons");
fs.mkdirSync(outDir, { recursive: true });

const targets = [
  ["icon-192.png", 192, { maskable: false }],
  ["icon-512.png", 512, { maskable: false }],
  ["icon-512-maskable.png", 512, { maskable: true }],
  ["apple-touch-icon.png", 180, { maskable: true }], // full-bleed, iOS yang membulatkan
];

for (const [name, size, opts] of targets) {
  const png = renderIcon(size, opts);
  fs.writeFileSync(path.join(outDir, name), png);
  console.log(`OK ${name} (${size}x${size}, ${(png.length / 1024).toFixed(1)} KB)`);
}
