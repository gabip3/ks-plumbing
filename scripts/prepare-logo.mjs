/**
 * Prepares the brand mark for the web.
 *
 *   node scripts/prepare-logo.mjs
 *
 * Source: brand-source/logoKS.png (the file the client drops in). It lives
 * outside /public on purpose, so the 1.5 MB original is never deployed.
 * Output: public/assets/brand/ks-logo.png + @2x, trimmed and optimised.
 */
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.resolve(here, '../brand-source/logoKS.png');
const OUT_DIR = path.resolve(here, '../public/assets/brand');
const META = path.resolve(here, '../src/lib/logo-meta.json');

await mkdir(OUT_DIR, { recursive: true });

const meta = await sharp(SRC).metadata();
console.log(`source  ${meta.width}×${meta.height}  alpha:${meta.hasAlpha}  ${meta.channels}ch`);

// Corner sample tells us whether the padding is really transparent.
const { data } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const px = (x, y) => {
  const i = (y * meta.width + x) * 4;
  return [data[i], data[i + 1], data[i + 2], data[i + 3]];
};
console.log('corner  ', px(2, 2), ' centre ', px(meta.width >> 1, meta.height >> 1));

const base = sharp(SRC).ensureAlpha().trim({ threshold: 6 });
const trimmed = await base.toBuffer({ resolveWithObject: true });
console.log(`trimmed ${trimmed.info.width}×${trimmed.info.height}`);

const written = {};
for (const [name, width] of [
  ['ks-logo.png', 720],
  ['ks-logo@2x.png', 1200],
]) {
  const out = await sharp(trimmed.data)
    .resize({ width, withoutEnlargement: true })
    .png({ compressionLevel: 9, palette: true, quality: 92 })
    .toFile(path.join(OUT_DIR, name));
  written[name] = { width: out.width, height: out.height };
  console.log(`${name.padEnd(18)} ${out.width}×${out.height}  ${(out.size / 1024).toFixed(0)} KB`);
}

/**
 * The component reads its intrinsic size from here rather than hard-coding it,
 * so swapping the source artwork for one with different proportions can never
 * leave a stale aspect ratio behind.
 */
await writeFile(
  META,
  `${JSON.stringify(
    {
      width: written['ks-logo.png'].width,
      height: written['ks-logo.png'].height,
      width2x: written['ks-logo@2x.png'].width,
    },
    null,
    2,
  )}\n`,
);
console.log(`src/lib/logo-meta.json  ${written['ks-logo.png'].width}×${written['ks-logo.png'].height}`);

// Contrast proofs so the logo can be checked against both page surfaces.
const PROOF = path.resolve(here, '../../.logo-proof.png');
const chip = await sharp(trimmed.data).resize({ width: 420 }).toBuffer({ resolveWithObject: true });
await sharp({
  create: { width: 900, height: chip.info.height + 60, channels: 4, background: '#050b16' },
})
  .composite([
    { input: { create: { width: 450, height: chip.info.height + 60, channels: 4, background: '#f6f8fa' } }, left: 450, top: 0 },
    { input: chip.data, left: 15, top: 30 },
    { input: chip.data, left: 465, top: 30 },
  ])
  .png()
  .toFile(PROOF);
console.log('proof   ', PROOF);
