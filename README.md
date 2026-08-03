# KS Plumbing

Marketing site for **KS Plumbing**, licensed plumbers in Boise, Idaho, serving
the Treasure Valley.

Static Next.js site. No backend, no CMS. Built to drop on any host.

---

## Art direction

The visual system is pulled out of the logo, not decided next to it.

| From the mark | In the site |
| --- | --- |
| Navy of the "K" | `--color-navy` / `--color-ink`, every dark surface |
| Royal blue of the "S" | `--color-royal`, the single action colour |
| Droplet highlight | `--color-water`, accents and serif highlights |
| Gunmetal pipe | the `pipe-v` / `pipe-h` cylinder shading |
| White field around the mark | `--color-paper` / `--color-mist`, the light sections |

Two motifs carry the page so no section needs decoration of its own:

- **Hairline blueprint grid** at 4 to 7 percent opacity.
- **A run of pipe.** A real cylinder, shaded across its width with a dark edge,
  a specular band, a core shadow and reflected light. A union nut rides down
  the left edge of the viewport as you scroll while water fills the bore, with
  a single slow drip off the rail in the hero; the process timeline is a
  length of pipe that fills as you read it. The compare slider handle is a
  knurled coupling.

**Type.** `Archivo` for the display headings, set very tight. `Poppins` for
every running paragraph, label and button. `Instrument Serif` italic for one
phrase per section. `IBM Plex Mono` for index numbers and phone numbers.

**Rhythm.** No section repeats the one before it. Services is an editorial
index with a plate pinned beside it, About is an off-grid spread, Process is
a timeline, Gallery is masonry with a lightbox, Before and After is a drag
slider, Reviews is a single stage with a rail, FAQ is sticky plus accordion,
Areas is a map made of type, Contact is a hard split at the viewport centre.

---

## Getting started

```bash
npm install
```

```bash
npm run dev
```

Then open <http://localhost:3000>.

| Script | Does |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Static export into `out/` |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run assets` | Rebuilds logo, icons and all photography |
| `npm run images` | Photography and the Open Graph card only |
| `npm run logo` | Trims and optimises `public/assets/logoKS.png` |
| `npm run icons` | favicon.ico, apple icon, PWA icons |

`next.config.mjs` sets `output: 'export'`, so `npm run build` produces a plain
folder of HTML, CSS and JS in `out/`. Upload it anywhere: Netlify, Vercel,
Cloudflare Pages, S3, or plain shared hosting.

---

## Photography

All photographs are the client's own, processed by `scripts/prepare-images.mjs`
from the originals in the parent folder. The script resizes, crops with
attention gravity and writes WebP into `public/assets/**`. Re-run
`npm run images` after adding new source photos.

`src/lib/media.ts` holds `MEDIA_READY`. It is on. Any file that is missing or
fails to load still falls back to the designed placeholder plate, so a gap in
the set never breaks a layout.

### Before and after pairings

The originals arrived unsorted, so the pairs were matched by reading the rooms
rather than the file names:

| Pair | Files | Why |
| --- | --- | --- |
| 01 | `BEFORE (2)` → `AFTER3` | Same crawlspace. Confirmed by the concrete stem wall and its efflorescence streak, the yellow flex duct, the vapour barrier and the joist layout. |
| 02 | `BEFORE (3)` → `AFTER2` | Same house, adjacent joist bay. Matching pink insulation, foil-wrapped duct and framing. Corroded copper out, PEX in. |

`BEFORE (1)` is a second angle of the same run as pair 01 and is held in
reserve. `AFTER1`, `AFTER4` and `AFTER5` are a different job, a new bathroom
rough-in with no before photos, so they sit in the gallery instead.

**Please confirm these two pairings with the client before launch.** To change
one, swap the file names in `scripts/prepare-images.mjs` and run
`npm run images`.

---

## The brand mark

`brand-source/logoKS.png` is the client's original, kept outside `/public` so
the 1.5 MB file is never deployed. `npm run logo` trims the transparent padding
and writes `public/assets/brand/ks-logo.png` plus a `@2x`, along with
`src/lib/logo-meta.json` so the component always knows the current proportions.

To swap the artwork, overwrite that one file and run `npm run logo && npm run icons`.

The mark carries a white keyline around every shape, so one file reads
correctly on the dark hero and on the light sections. No reversed version is
needed. If the file ever goes missing, `src/components/brand/Wordmark.tsx`
draws a type-set lockup instead so the header never breaks.

Icons are generated from the same mark. Small sizes use a tight crop of the KS
letters, because the full badge turns to mush below about 64px, and everything
sits on white, because the navy "K" disappears against a dark browser tab.

---

## Things to change before launch

1. **Domain.** `site.url` in `src/lib/site.ts`. It drives the canonical tag,
   Open Graph URLs, `robots.txt` and `sitemap.xml`.
2. **Testimonials.** `reviews` in `src/lib/content.ts` are **placeholders**.
   Replace them with real, verbatim Google reviews before going live. Once they
   are real you can add `Review` and `AggregateRating` to
   `src/components/seo/JsonLd.tsx`. It is deliberately left out while the quotes
   are stand-ins, because publishing review markup for reviews that do not exist
   will get the site penalised.
3. **The form.** Wired to Web3Forms already. See below if the access key
   ever needs rotating.
4. **Business details.** Street address, hours and the `postalCode` in
   `src/lib/site.ts`. The postal code there is a placeholder for Boise.
5. **The logo's curved tagline.** In the supplied artwork the bottom arc reads
   "WE SHOW UP. WE SOLVE IT. YOU RO AA." rather than "YOU RELAX." Worth asking
   the client for a corrected file.

---

## The contact form

No backend of our own — `src/components/forms/ContactForm.tsx` posts straight
to Web3Forms, which delivers to the shop's inbox. The two constants near the
top of that file:

```ts
const WEB3FORMS_ACCESS_KEY = '4f929fe5-0377-42ea-ae98-42392930cda1';
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
```

The access key is not a secret — Web3Forms is designed to be called directly
from the browser, the same way a Formspree or Basin endpoint is public. To
point it at a different inbox, generate a new key at web3forms.com (enter the
receiving email, the key arrives by email in seconds) and swap the value.

Name, phone and email are required, so every submission carries an email —
that is what lets the shop hit "Reply" in Gmail and land straight in the
customer's inbox via the `replyto` field, rather than a dead-end address.

A hidden honeypot field (`botcheck`) catches basic bots before the request
ever reaches the network: a real visitor never sees or fills it, so a filled
value is treated as spam and silently dropped.

---

## Where things live

```
scripts/
├─ prepare-images.mjs   Source photos to WebP, plus the Open Graph card
├─ prepare-logo.mjs     Trims and optimises the brand mark
└─ prepare-icons.mjs    favicon.ico, apple icon, PWA icons
src/
├─ app/
│  ├─ layout.tsx        Fonts, metadata, Open Graph, JSON-LD
│  ├─ page.tsx          Section order, this is the whole page
│  ├─ globals.css       Design tokens and the utilities the system is built on
│  ├─ robots.ts         robots.txt
│  ├─ sitemap.ts        sitemap.xml
│  └─ not-found.tsx     404
├─ components/
│  ├─ brand/            Logo with a type-set fallback
│  ├─ forms/            The only form on the site
│  ├─ layout/           Header with mobile sheet, Footer
│  ├─ motion/           LazyMotion boundary
│  ├─ sections/         One file per section, in page order
│  ├─ seo/              Plumber, WebSite and FAQPage schema
│  └─ ui/               Action, Plate, Pipe, Parallax, Reveal, ScrollSpine,
│                       CompareSlider, Ticker
└─ lib/
   ├─ site.ts           Business data: phone, email, hours, nav
   ├─ content.ts        All copy: services, process, gallery, pairs, FAQ, areas
   ├─ media.ts          Photography switch and aspect ratios
   ├─ motion.ts         Easings and shared variants
   └─ utils.ts          cx()
```

Copy and business data are split out on purpose: **nothing the client will want
to reword lives inside a component.**

---

## Motion

`framer-motion`, loaded through `LazyMotion` with the `domAnimation` feature set
and `strict` mode, which is roughly half the runtime of the full bundle. Every
animated element uses the `m.*` primitives; `motion.*` throws, which is what
keeps it that way.

- Parallax is transform only, so scrolling never reads layout.
- Scroll reveals fire once, via `IntersectionObserver`.
- Everything respects `prefers-reduced-motion`.

---

## SEO

- `Plumber` (LocalBusiness) schema with `areaServed` for all ten cities,
  opening hours, geo, and an `OfferCatalog` of the eight services.
- `WebSite` and `FAQPage` schema.
- Open Graph and Twitter `summary_large_image`, generated from a real job photo.
- Canonical URL, `robots.txt`, `sitemap.xml`, web manifest, full icon set.
- Semantic heading order, one `h1`, labelled landmarks, a skip link, and
  `aria-expanded` / `aria-current` on everything that toggles.

---

## Performance

Measured on the production build, gzipped:

| | Size |
| --- | --- |
| JS | ~240 KB (React and the Next runtime are ~130 KB of it) |
| CSS | ~13 KB |
| HTML | ~22 KB |
| **Total first load** | **~275 KB** plus the hero has no image to download |

Photography totals ~2.7 MB across the whole page, all lazy loaded below the
fold. Fonts are self-hosted at build time by `next/font`, so there is no request
to Google and no layout shift.

Checked for horizontal overflow and hero fit at 390, 1024, 1280, 1366 and 1440.

---

## Browser support

Evergreen Chrome, Safari, Firefox and Edge. Uses `clamp()`, `min()`, CSS
`columns` for the masonry, `color-mix()`, `clip-path` and `100svh`.

---

© KS Plumbing LLC. Licensed and insured in Idaho.
