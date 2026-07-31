/**
 * Turns the client's original photographs into the web assets the site expects.
 *
 *   node scripts/prepare-images.mjs
 *
 * Reads from SOURCE_DIR, writes WebP into public/assets/**. Re-run it any time
 * new photos land — it is idempotent and overwrites in place.
 *
 * Crops use `attention` gravity, which keeps the busiest part of the frame
 * (the work) rather than the geometric centre.
 */
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const SOURCE_DIR = path.resolve(here, '../..');
const OUT_ROOT = path.resolve(here, '../public/assets');

/**
 * Every source photograph is a 3:4 phone frame, so the hero keeps its native
 * portrait crop and is placed with object-cover rather than being stretched
 * into a letterbox it does not have the pixels for.
 *
 * Sizes match the aspect classes in src/lib/media.ts.
 */
const SHAPES = {
  heroFull: { w: 1200, h: 1600, q: 80 },
  heroTall: { w: 900, h: 1320, q: 78 },
  portrait: { w: 900, h: 1125, q: 78 },
  tall: { w: 900, h: 1320, q: 78 },
  square: { w: 1000, h: 1000, q: 78 },
  landscape: { w: 1400, h: 875, q: 78 },
  /**
   * Centre crop, not attention. The two halves of a wipe slider have to stay
   * registered with each other, and attention gravity picks a different region
   * per photograph, which would slide the subject sideways as you drag.
   */
  compare: { w: 1100, h: 1375, q: 80, position: 'centre' },
  /**
   * `portrait`, anchored to one end. The two stock photos each carry something
   * that has to be cropped out, and it sits at opposite ends of the frame: a
   * loose wire and a European socket above the water heater, a broom and a rag
   * on the floor below the treatment tanks.
   */
  portraitLow: { w: 900, h: 1125, q: 78, position: 'bottom' },
  portraitHigh: { w: 900, h: 1125, q: 78, position: 'top' },
};

const JOBS = [
  // ── hero ────────────────────────────────────────────────────────────────
  ['ks07.jpg', 'hero/hero-main.webp', 'heroFull'],

  // ── about ───────────────────────────────────────────────────────────────
  ['ks09.jpg', 'about/about-crew.webp', 'tall'],
  ['ks18.jpg', 'about/about-work.webp', 'landscape'],

  // ── services ────────────────────────────────────────────────────────────
  // The only two stock photos on the site. Everything else is the client's own
  // work, so these are cropped hard to the equipment and kept in the same
  // register as the rest.
  ['water-heater.jpg', 'services/service-heater.webp', 'portraitLow'],
  ['water-treatment.jpg', 'services/service-treatment.webp', 'portraitHigh'],

  ['ks12.jpg', 'services/service-emergency.webp', 'portrait'],
  ['ks20.jpg', 'services/service-drain.webp', 'portrait'],
  ['ks10.jpg', 'services/service-pipe.webp', 'portrait'],
  ['ks03.jpg', 'services/service-fixture.webp', 'portrait'],
  ['ks23.jpg', 'services/service-commercial.webp', 'portrait'],
  ['ks04.jpg', 'services/service-residential.webp', 'portrait'],

  // ── gallery ─────────────────────────────────────────────────────────────
  ['ks07.jpg', 'gallery/project-01.webp', 'portrait'],
  ['ks04.jpg', 'gallery/project-02.webp', 'landscape'],
  ['ks20.jpg', 'gallery/project-03.webp', 'square'],
  ['ks18.jpg', 'gallery/project-04.webp', 'tall'],
  ['ks23.jpg', 'gallery/project-05.webp', 'landscape'],
  ['ks05.jpg', 'gallery/project-06.webp', 'portrait'],
  ['ks15.jpg', 'gallery/project-07.webp', 'square'],
  ['ks21.jpg', 'gallery/project-08.webp', 'landscape'],
  ['AFTER5.jpg', 'gallery/project-09.webp', 'tall'],
  ['ks03.jpg', 'gallery/project-10.webp', 'portrait'],
  ['ks19.jpg', 'gallery/project-11.webp', 'square'],
  ['ks10.jpg', 'gallery/project-12.webp', 'landscape'],
  ['ks11.jpg', 'gallery/project-13.webp', 'portrait'],
  ['ks22.jpg', 'gallery/project-14.webp', 'square'],
  ['AFTER4.jpg', 'gallery/project-15.webp', 'portrait'],
  ['AFTER1.jpeg', 'gallery/project-16.webp', 'square'],

  /*
   * Before / after pairs. These four came from the client already matched,
   * named before_site* and after_site*, so no guesswork was needed.
   */
  ['before_site.jpeg', 'before-after/pair-01-before.webp', 'compare'],
  ['after_site.jpg', 'before-after/pair-01-after.webp', 'compare'],
  ['before_site_1.jpg', 'before-after/pair-02-before.webp', 'compare'],
  ['after_site_1.jpg', 'before-after/pair-02-after.webp', 'compare'],
  ['before_site2.jpg', 'before-after/pair-03-before.webp', 'compare'],
  ['after_site2.jpg', 'before-after/pair-03-after.webp', 'compare'],
  ['before_site_3.jpg', 'before-after/pair-04-before.webp', 'compare'],
  ['after_site3.jpg', 'before-after/pair-04-after.webp', 'compare'],
];

let bytes = 0;

/**
 * Each photo is written twice: the full size, and a narrow one for phones.
 *
 * A gallery tile is about 180px wide in the two-column mobile grid, so serving
 * the 900px file there costs roughly twenty-five times the pixels for no
 * visible gain. Plate picks between them with srcset.
 */
const SMALL_WIDTH = 520;

for (const [src, dest, shape] of JOBS) {
  const { w, h, q, position } = SHAPES[shape];
  const outPath = path.join(OUT_ROOT, dest);
  await mkdir(path.dirname(outPath), { recursive: true });

  const pipeline = () =>
    sharp(path.join(SOURCE_DIR, src))
      .rotate()
      .resize(w, h, {
        fit: 'cover',
        position: position ?? sharp.strategy.attention,
        withoutEnlargement: true,
      });

  const info = await pipeline().webp({ quality: q, effort: 5 }).toFile(outPath);
  bytes += info.size;

  const small = await pipeline()
    .resize({ width: SMALL_WIDTH, withoutEnlargement: true })
    .webp({ quality: q - 4, effort: 5 })
    .toFile(outPath.replace(/\.webp$/, '-sm.webp'));
  bytes += small.size;

  console.log(
    `${dest.padEnd(38)} ${String(info.width).padStart(4)}×${String(info.height).padEnd(5)} ${(info.size / 1024).toFixed(0).padStart(4)} KB   +sm ${String(small.width).padStart(3)}px ${(small.size / 1024).toFixed(0).padStart(3)} KB`,
  );
}

// ── Open Graph card ───────────────────────────────────────────────────────
// 1200×630 JPG, because Facebook, LinkedIn and iMessage will not render SVG.
const OG_W = 1200;
const OG_H = 630;

const ogPhoto = await sharp(path.join(SOURCE_DIR, 'ks07.jpg'))
  .rotate()
  .resize(OG_W, OG_H, { fit: 'cover', position: sharp.strategy.attention })
  .toBuffer();

const ogOverlay = Buffer.from(`
<svg width="${OG_W}" height="${OG_H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="scrim" x1="0" y1="1" x2="0.35" y2="0">
      <stop offset="0" stop-color="#050b16" stop-opacity="0.97"/>
      <stop offset="0.55" stop-color="#050b16" stop-opacity="0.82"/>
      <stop offset="1" stop-color="#050b16" stop-opacity="0.42"/>
    </linearGradient>
    <linearGradient id="metal" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#12161c"/>
      <stop offset="0.38" stop-color="#8b939e"/>
      <stop offset="0.58" stop-color="#3b424b"/>
      <stop offset="1" stop-color="#171b21"/>
    </linearGradient>
  </defs>
  <rect width="${OG_W}" height="${OG_H}" fill="url(#scrim)"/>
  <rect x="0" y="497" width="${OG_W}" height="7" fill="url(#metal)"/>
  <rect x="232" y="487" width="15" height="27" fill="url(#metal)"/>
  <rect x="953" y="487" width="15" height="27" fill="url(#metal)"/>
  <g font-family="Archivo, Helvetica, Arial, sans-serif" fill="#ffffff" font-weight="700" letter-spacing="-4">
    <text x="72" y="250" font-size="104">We show up.</text>
    <text x="88" y="352" font-size="104">We solve it.</text>
  </g>
  <text x="106" y="454" font-family="Georgia, serif" font-style="italic" font-size="104" fill="#38a9f0" letter-spacing="-2">You relax.</text>
  <g font-family="Menlo, Consolas, monospace" font-size="20" letter-spacing="2.4" fill="#ffffff">
    <text x="72" y="558" font-weight="700">KS PLUMBING</text>
    <text x="72" y="592" fill-opacity="0.55">BOISE, IDAHO</text>
    <text x="1128" y="558" text-anchor="end" font-weight="700">(986) 280-9087</text>
    <text x="1128" y="592" text-anchor="end" fill-opacity="0.55">LICENSED &amp; INSURED</text>
  </g>
</svg>`);

const og = await sharp(ogPhoto)
  .composite([{ input: ogOverlay }])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile(path.join(OUT_ROOT, 'og/og-cover.jpg'));

bytes += og.size;
console.log(`${'og/og-cover.jpg'.padEnd(38)} ${OG_W}×${OG_H}   ${(og.size / 1024).toFixed(0)} KB`);

console.log(`\n${JOBS.length + 1} files · ${(bytes / 1024 / 1024).toFixed(2)} MB total`);
