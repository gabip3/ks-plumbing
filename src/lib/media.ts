/**
 * Photography switch.
 *
 * On, because the real KS Plumbing photographs are in /public/assets. Any file
 * that is missing or fails to load still falls back to the designed plate, so
 * a gap in the set never breaks a layout.
 *
 * Run `npm run images` after adding new source photos.
 */
export const MEDIA_READY = true;

export const ratioClass = {
  portrait: 'aspect-[4/5]',
  square: 'aspect-square',
  landscape: 'aspect-[16/10]',
  tall: 'aspect-[3/4.4]',
} as const;

export type Ratio = keyof typeof ratioClass;
