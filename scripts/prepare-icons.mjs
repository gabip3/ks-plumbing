/**
 * Builds every icon the site serves, from the brand mark.
 *
 *   node scripts/prepare-icons.mjs
 *
 * Small sizes use a tight crop of the KS lettermark, because the full badge
 * turns to mush below about 64px. Everything sits on white: the mark's "K" is
 * navy, which disappears against a dark tab, and the logo was drawn for a
 * light field in the first place.
 */
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const LOGO = path.resolve(here, '../public/assets/brand/ks-logo@2x.png');
const APP_DIR = path.resolve(here, '../src/app');
const PUB_DIR = path.resolve(here, '../public');

const PAPER = { r: 255, g: 255, b: 255, alpha: 1 };

await mkdir(APP_DIR, { recursive: true });

const meta = await sharp(LOGO).metadata();
const W = meta.width;
const H = meta.height;

/** Just the KS letters: no arc, no pipe, no "PLUMBING". */
const letterMark = await sharp(LOGO)
  .extract({
    left: Math.round(W * 0.12),
    top: Math.round(H * 0.15),
    width: Math.round(W * 0.76),
    height: Math.round(H * 0.3),
  })
  .toBuffer();

async function square(source, size, padding, background) {
  const inner = Math.round(size * (1 - padding * 2));
  const art = await sharp(source)
    .resize(inner, inner, { fit: 'inside', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer({ resolveWithObject: true });

  return sharp({ create: { width: size, height: size, channels: 4, background } })
    .composite([
      {
        input: art.data,
        left: Math.round((size - art.info.width) / 2),
        top: Math.round((size - art.info.height) / 2),
      },
    ])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

/* ── favicon.ico, hand-assembled from 16 / 32 / 48 PNG frames ─────────── */
const icoSizes = [16, 32, 48];
const frames = await Promise.all(icoSizes.map((s) => square(letterMark, s, 0.02, PAPER)));

const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(frames.length, 4);

let offset = 6 + frames.length * 16;
const entries = frames.map((buf, i) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(icoSizes[i] === 256 ? 0 : icoSizes[i], 0);
  e.writeUInt8(icoSizes[i] === 256 ? 0 : icoSizes[i], 1);
  e.writeUInt8(0, 2);
  e.writeUInt8(0, 3);
  e.writeUInt16LE(1, 4);
  e.writeUInt16LE(32, 6);
  e.writeUInt32LE(buf.length, 8);
  e.writeUInt32LE(offset, 12);
  offset += buf.length;
  return e;
});

await writeFile(path.join(APP_DIR, 'favicon.ico'), Buffer.concat([header, ...entries, ...frames]));
console.log('src/app/favicon.ico        16 / 32 / 48');

/* ── PWA and Apple icons, full badge ──────────────────────────────────── */
const targets = [
  [path.join(APP_DIR, 'apple-icon.png'), 180, 0.07],
  [path.join(PUB_DIR, 'icon-192.png'), 192, 0.07],
  [path.join(PUB_DIR, 'icon-512.png'), 512, 0.07],
];

for (const [file, size, pad] of targets) {
  const buf = await square(LOGO, size, pad, PAPER);
  await writeFile(file, buf);
  console.log(`${path.relative(path.resolve(here, '..'), file).padEnd(26)} ${size}×${size}  ${(buf.length / 1024).toFixed(0)} KB`);
}
