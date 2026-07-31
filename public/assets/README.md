# Assets

Nothing in the generated folders below is edited by hand. They are produced by
the scripts in `/scripts` from two source files:

| Source | Script | Produces |
| --- | --- | --- |
| `brand-source/logoKS.png` | `npm run logo` | `brand/ks-logo.png`, `brand/ks-logo@2x.png`, `src/lib/logo-meta.json` |
| `brand/ks-logo@2x.png` | `npm run icons` | `src/app/favicon.ico`, `src/app/apple-icon.png`, `/icon-192.png`, `/icon-512.png` |
| The job photos in the parent folder | `npm run images` | `hero/`, `about/`, `services/`, `gallery/`, `before-after/`, `og/og-cover.jpg` |

`npm run assets` runs all three.

## Replacing the logo

Drop the new artwork over `brand-source/logoKS.png` (transparent PNG, square,
as large as you have it) and run:

```bash
npm run logo && npm run icons
```

That is everything. The header, hero, footer, 404, About watermark, favicon,
Apple touch icon and PWA icons all read from the generated files, and the
component picks its intrinsic size up from `logo-meta.json`, so a change in the
artwork's proportions can never leave a stale aspect ratio behind.

## Replacing or adding photos

Put the new files in the parent folder next to the existing `ks*.jpg`, add a
line to the `JOBS` table in `scripts/prepare-images.mjs` saying where it should
go and what shape it should be cropped to, then run `npm run images`.

Captions, locations and gallery filter categories live in `src/lib/content.ts`,
keyed by the same file names.

Shapes available: `heroFull` (3:4), `portrait` (4:5), `tall` (3:4.4),
`square` (1:1), `landscape` (16:10), `compare` (4:5, for before and after).

## Before and after

The pairings and the reasoning behind them are documented in the comment above
the pair entries in `scripts/prepare-images.mjs`, and again in the root README.
To change a pairing, swap the file names there and re-run `npm run images`.

## Missing files

Every photo slot falls back to a designed placeholder plate if the file is
absent or fails to load, so a gap never breaks a layout. `src/lib/media.ts`
holds the master switch.
