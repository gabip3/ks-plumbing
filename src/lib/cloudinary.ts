/**
 * Photo uploads, same setup as the Art Floor site.
 *
 * Uploads go straight from the browser to Cloudinary with an unsigned preset,
 * tagged by category. The gallery then reads those tags back and merges the
 * new photos in with the ones committed to the repo, so Jessica and Kaleb can
 * add work without anyone touching the code or running a deploy.
 */

export const CLOUD_NAME = 'fvdx3cet';
export const UPLOAD_PRESET = 'fintsymg';
export const TAG_PREFIX = 'ksplumbing_';
export const FOLDER = 'ks-plumbing';

/**
 * SHA-256 of the panel password. Current password: ksplumbing2026
 *
 * To change it:
 *   node -e "console.log(require('crypto').createHash('sha256').update('NEW').digest('hex'))"
 *
 * This keeps the panel out of the way of anyone who stumbles onto the URL. It
 * is not a security boundary: the page is public and so is the upload preset.
 */
export const PANEL_PW_HASH =
  '76d1c7704c271ca3963a06393bbe13ae25bd16c47569157c19df51d0bdec8a19';

/** Categories offered in the panel, matching the gallery filters. */
export const uploadCategories = [
  'Repipes',
  'Rough-in',
  'Drains',
  'Remodels',
  'Crawlspace',
] as const;

export type UploadCategory = (typeof uploadCategories)[number];

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export type CloudPhoto = {
  publicId: string;
  format: string;
  width: number;
  height: number;
  createdAt: string;
  category: string;
};

/** Delivery URL, resized and format-negotiated by Cloudinary. */
export function cloudUrl(photo: CloudPhoto, width: number) {
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/w_${width},c_limit,q_auto,f_auto/${photo.publicId}.${photo.format}`;
}

type ListResource = {
  public_id: string;
  format: string;
  width?: number;
  height?: number;
  created_at?: string;
};

/**
 * Reads every category tag and returns the photos newest first. A category
 * with nothing in it 404s, which is expected, so failures resolve to empty
 * rather than rejecting the whole set.
 */
export async function listCloudPhotos(): Promise<CloudPhoto[]> {
  const perCategory = await Promise.all(
    uploadCategories.map(async (category) => {
      try {
        const res = await fetch(
          `https://res.cloudinary.com/${CLOUD_NAME}/image/list/${TAG_PREFIX}${slugify(category)}.json`,
        );
        if (!res.ok) return [];
        const data: { resources?: ListResource[] } = await res.json();
        return (data.resources ?? []).map((r) => ({
          publicId: r.public_id,
          format: r.format,
          width: r.width ?? 1000,
          height: r.height ?? 750,
          createdAt: r.created_at ?? '',
          category,
        }));
      } catch {
        return [];
      }
    }),
  );

  return perCategory.flat().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}
