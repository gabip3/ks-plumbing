'use client';

import { useState } from 'react';
import { Wordmark } from '@/components/brand/Wordmark';
import logoMeta from '@/lib/logo-meta.json';
import { site } from '@/lib/site';
import { cx } from '@/lib/utils';

/**
 * The KS badge. The mark carries a white keyline around every shape, so the
 * same file reads correctly on the dark hero and on the light sections and no
 * separate reversed version is needed.
 *
 * Source of truth: public/assets/brand/ks-logo.png, produced from the client's
 * original by `npm run logo`. That script also writes logo-meta.json, so the
 * intrinsic size below always matches whatever artwork is currently in place.
 * If the file ever goes missing the type lockup in Wordmark.tsx is drawn
 * instead, so the header never breaks.
 */
const SRC = '/assets/brand/ks-logo.png';
const SRC_2X = '/assets/brand/ks-logo@2x.png';

const heights = {
  sm: 'h-13 sm:h-16',
  md: 'h-16 sm:h-20',
  lg: 'h-24 sm:h-32',
  xl: 'h-32 sm:h-44',
} as const;

export function Logo({
  tone = 'dark',
  className,
  size = 'md',
  priority,
  /** Fill the parent's width instead of using a fixed height. */
  fluid,
  /** Decorative use, where the name is already announced elsewhere. */
  decorative,
}: {
  tone?: 'dark' | 'light';
  className?: string;
  size?: keyof typeof heights;
  priority?: boolean;
  fluid?: boolean;
  decorative?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <Wordmark tone={tone} size={size === 'sm' ? 'sm' : 'lg'} className={className} />;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={SRC}
      srcSet={`${SRC} ${logoMeta.width}w, ${SRC_2X} ${logoMeta.width2x}w`}
      sizes={fluid ? '(max-width: 768px) 60vw, 480px' : '(max-width: 640px) 130px, 220px'}
      alt={decorative ? '' : site.name}
      aria-hidden={decorative || undefined}
      width={logoMeta.width}
      height={logoMeta.height}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      onError={() => setFailed(true)}
      className={cx('object-contain', fluid ? 'h-auto w-full' : `w-auto ${heights[size]}`, className)}
    />
  );
}
