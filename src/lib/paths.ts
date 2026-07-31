/**
 * Base path handling.
 *
 * On GitHub Pages a project site is served from a subfolder
 * (gabip3.github.io/ks-plumbing), not from the domain root. Next's `basePath`
 * rewrites its own routes and chunks, but it does NOT touch plain string paths
 * in `src` attributes, so every hand-written asset URL has to go through
 * `asset()` or it will 404 in production.
 *
 * Set NEXT_PUBLIC_BASE_PATH at build time. Leave it empty for a root domain
 * (a custom domain, Vercel, Cloudflare Pages) and everything keeps working.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export function asset(path: string) {
  if (!path.startsWith('/')) return path;
  return `${BASE_PATH}${path}`;
}
