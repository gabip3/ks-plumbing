/**
 * NEXT_PUBLIC_BASE_PATH is set by the GitHub Pages workflow to "/ks-plumbing",
 * because a project site is served from a subfolder. Leave it unset for local
 * development or for a deploy at a domain root.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  reactStrictMode: true,
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
};

export default nextConfig;
