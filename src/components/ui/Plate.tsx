'use client';

import { useCallback, useState } from 'react';
import { MEDIA_READY, ratioClass, type Ratio } from '@/lib/media';
import { asset } from '@/lib/paths';
import { cx } from '@/lib/utils';

type PlateProps = {
  src?: string;
  alt: string;
  ratio?: Ratio;
  /** Small mono marker printed in the corner of the placeholder. */
  index?: string;
  caption?: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  tone?: 'navy' | 'royal' | 'steel';
  /** Set when the parent already controls height (full-bleed hero, etc). */
  fill?: boolean;
  /** Override when this plate is rendered much larger than the default. */
  sizes?: string;
};

const tones = {
  navy: 'from-navy via-navy to-ink',
  royal: 'from-navy-soft via-royal-deep to-ink',
  steel: 'from-gunmetal via-navy to-ink',
} as const;

/**
 * The one media primitive on the site. Renders a designed placeholder that is
 * meant to be looked at, and swaps in the real photograph the moment it exists.
 */
export function Plate({
  src,
  alt,
  ratio = 'landscape',
  index,
  caption,
  className,
  imageClassName,
  priority,
  tone = 'navy',
  fill,
  sizes,
}: PlateProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const showImage = MEDIA_READY && Boolean(src) && !failed;

  /**
   * The browser starts fetching as soon as it parses the tag, but React only
   * attaches onLoad once it hydrates. On a phone that gap is wide enough that
   * a photo can finish first, the event is missed, and the image sits at
   * opacity-0 for good. This ref runs at attach time and catches that case.
   *
   * It only ever reveals, never hides: onError is the one thing allowed to
   * decide a photo failed, so a slow decode can never strand a good image on
   * the placeholder.
   */
  const settle = useCallback((el: HTMLImageElement | null) => {
    if (el?.complete && el.naturalWidth > 0) setLoaded(true);
  }, []);

  return (
    <div
      className={cx(
        'plate relative isolate overflow-hidden',
        !fill && ratioClass[ratio],
        fill && 'h-full w-full',
        className,
      )}
    >
      <div
        aria-hidden
        className={cx('absolute inset-0 bg-gradient-to-br opacity-90', tones[tone])}
      />

      {/* Registration marks — a quiet nod to shop drawings. */}
      <svg
        aria-hidden
        className="absolute inset-0 h-full w-full text-white/22"
        preserveAspectRatio="none"
      >
        <line x1="0" y1="0" x2="100%" y2="100%" stroke="currentColor" strokeWidth="0.5" opacity="0.35" />
        <line x1="100%" y1="0" x2="0" y2="100%" stroke="currentColor" strokeWidth="0.5" opacity="0.35" />
      </svg>

      <span aria-hidden className="pointer-events-none absolute inset-4 border border-white/12" />
      <Corner className="left-3 top-3" />
      <Corner className="right-3 top-3 rotate-90" />
      <Corner className="bottom-3 right-3 rotate-180" />
      <Corner className="bottom-3 left-3 -rotate-90" />

      {/* Pipe silhouette — the only literal plumbing reference in the system. */}
      <svg
        aria-hidden
        viewBox="0 0 200 120"
        className="absolute -right-6 bottom-0 h-2/3 w-2/3 text-white/[0.07]"
        fill="none"
      >
        <path
          d="M8 96h48a16 16 0 0 0 16-16V40a16 16 0 0 1 16-16h96"
          stroke="currentColor"
          strokeWidth="9"
          strokeLinecap="round"
        />
        <rect x="66" y="52" width="12" height="20" fill="currentColor" rx="1" />
        <rect x="140" y="18" width="12" height="12" fill="currentColor" rx="1" />
      </svg>

      {/* Markings belong to the placeholder state only, never over a photograph. */}
      {index && !showImage && (
        <span aria-hidden className="label absolute left-6 top-6 text-white/45">
          {index}
        </span>
      )}

      {caption && !showImage && (
        <span className="absolute bottom-6 left-6 right-6 font-mono text-[0.8125rem] uppercase leading-relaxed tracking-[0.16em] text-white/55">
          {caption}
        </span>
      )}

      {showImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={settle}
          src={asset(src!)}
          srcSet={`${asset(src!.replace(/\.webp$/, '-sm.webp'))} 520w, ${asset(src!)} 1200w`}
          sizes={sizes ?? '(max-width: 640px) 50vw, (max-width: 1024px) 45vw, 500px'}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={cx(
            'absolute inset-0 h-full w-full object-cover transition-opacity duration-700',
            loaded ? 'opacity-100' : 'opacity-0',
            imageClassName,
          )}
        />
      )}
    </div>
  );
}

function Corner({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cx(
        'absolute h-3 w-3 border-l border-t border-white/35',
        className,
      )}
    />
  );
}
