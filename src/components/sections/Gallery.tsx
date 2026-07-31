'use client';

import { AnimatePresence, m } from 'framer-motion';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Plate } from '@/components/ui/Plate';
import { Reveal } from '@/components/ui/Reveal';
import { galleryCategories, galleryItems, type GalleryItem } from '@/lib/content';
import { cloudUrl, listCloudPhotos } from '@/lib/cloudinary';
import { cx } from '@/lib/utils';

/**
 * Sixteen photographs stacked one per screen is a long scroll on a phone, so
 * the first batch is capped and the rest is one tap away.
 */
const FIRST_BATCH = 8;

export function Gallery() {
  const [filter, setFilter] = useState<string>(galleryCategories[0]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [uploaded, setUploaded] = useState<GalleryItem[]>([]);

  /**
   * Anything Jessica and Khaleb publish from the photo panel is pulled in here
   * and shown ahead of the photos committed to the repo, so the newest work
   * leads. If Cloudinary is unreachable the section simply shows what shipped.
   */
  useEffect(() => {
    let live = true;
    listCloudPhotos()
      .then((photos) => {
        if (!live) return;
        setUploaded(
          photos.map((p, i) => ({
            id: `cloud-${p.publicId}`,
            src: cloudUrl(p, 1000),
            srcSmall: cloudUrl(p, 520),
            alt: `${p.category} work by KS Plumbing in the Treasure Valley`,
            caption: p.category,
            location: 'Treasure Valley',
            category: p.category,
            ratio: (['portrait', 'square', 'landscape', 'tall'] as const)[i % 4],
          })),
        );
      })
      .catch(() => {});
    return () => {
      live = false;
    };
  }, []);

  const all = useMemo(() => [...uploaded, ...galleryItems], [uploaded]);

  const items = useMemo(
    () => (filter === galleryCategories[0] ? all : all.filter((i) => i.category === filter)),
    [filter, all],
  );

  const visible = showAll ? items : items.slice(0, FIRST_BATCH);
  const hidden = items.length - visible.length;

  const close = useCallback(() => setOpenIndex(null), []);
  const step = useCallback(
    (dir: 1 | -1) => setOpenIndex((i) => (i === null ? i : (i + dir + items.length) % items.length)),
    [items.length],
  );

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [openIndex, close, step]);

  const current = openIndex === null ? null : items[openIndex];

  return (
    <section id="gallery" className="relative overflow-hidden bg-ink py-24 text-white sm:py-32 lg:py-40">
      <div aria-hidden className="grid-rule-dark absolute inset-0 opacity-70" />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(27,79,216,0.22),transparent_60%)]"
      />

      <div className="relative mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-14">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal>
              <h2 className="display-md max-w-[16ch]">
                Jobs from around <span className="serif-accent text-water">the Valley.</span>
              </h2>
            </Reveal>
          </div>

          {/* Filters as a mono rail, not pills */}
          <Reveal delay={0.1} className="-mx-5 overflow-x-auto px-5 no-scrollbar sm:mx-0 sm:px-0">
            <div className="flex min-w-max items-center gap-6 border-b border-white/12 pb-3 lg:justify-end">
              {galleryCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setFilter(cat);
                    setOpenIndex(null);
                    setShowAll(false);
                  }}
                  className={cx(
                    'relative flex h-11 items-center whitespace-nowrap text-[1.0625rem] font-semibold tracking-[0.01em] transition-colors duration-400',
                    filter === cat ? 'text-white' : 'text-white/45 hover:text-white/80',
                  )}
                >
                  {cat}
                  <span
                    aria-hidden
                    className={cx(
                      'absolute -bottom-[13px] left-0 h-[2px] w-full origin-left bg-water transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
                      filter === cat ? 'scale-x-100' : 'scale-x-0',
                    )}
                  />
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="mt-12 columns-2 gap-3 sm:mt-14 sm:gap-5 lg:columns-3 lg:gap-7">
          <AnimatePresence initial={false}>
            {visible.map((item, i) => (
              <m.figure
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.6, delay: (i % 6) * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="mb-3 break-inside-avoid sm:mb-5 lg:mb-7"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(i)}
                  className="group relative block w-full text-left"
                  aria-label={`Open ${item.caption}`}
                >
                  <div className="relative overflow-hidden">
                    <div className="transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]">
                      <Plate
                        ratio={item.ratio}
                        tone={i % 3 === 1 ? 'royal' : i % 3 === 2 ? 'steel' : 'navy'}
                        index={item.id.replace('project-', 'No. ')}
                        alt={item.alt}
                        src={item.src}
                        srcSmall={item.srcSmall}
                      />
                    </div>
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                    />
                    <span
                      aria-hidden
                      className="pointer-events-none absolute right-4 top-4 flex h-9 w-9 translate-y-2 items-center justify-center border border-white/40 bg-white/10 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:opacity-100"
                    >
                      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.4">
                        <path d="M2 8h12M8 2v12" strokeLinecap="square" />
                      </svg>
                    </span>
                  </div>

                  <figcaption className="mt-2.5 border-t border-white/10 pt-2.5 sm:mt-3.5 sm:flex sm:items-baseline sm:justify-between sm:gap-4 sm:pt-3">
                    <span className="block text-[0.9375rem] leading-snug text-white/85 transition-colors duration-400 group-hover:text-water sm:text-[1.0625rem]">
                      {item.caption}
                    </span>
                    <span className="mt-1 block shrink-0 font-mono text-[0.8125rem] uppercase tracking-[0.1em] text-white/40 sm:mt-0">
                      {item.location}
                    </span>
                  </figcaption>
                </button>
              </m.figure>
            ))}
          </AnimatePresence>
        </div>

        {hidden > 0 && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="group inline-flex h-14 items-center gap-3 border border-white/30 px-8 text-[1.0625rem] font-semibold text-white transition-colors duration-500 hover:bg-white hover:text-navy"
            >
              Show {hidden} more
              <svg
                viewBox="0 0 12 20"
                className="h-4 w-2.5 transition-transform duration-500 group-hover:translate-y-0.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <path d="M6 2v16M2 13l4 5 4-5" strokeLinecap="square" />
              </svg>
            </button>
          </div>
        )}

        <Reveal delay={0.05}>
          <p className="mt-12 max-w-2xl text-[0.9375rem] font-medium leading-relaxed text-white/45">
            Ask for references in your neighborhood and we will send them.
          </p>
        </Reveal>
      </div>

      {/* ── Lightbox ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {current && (
          <m.div
            role="dialog"
            aria-modal="true"
            aria-label={current.caption}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-100 flex flex-col bg-ink/97"
            onClick={close}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-8">
              <span className="label text-white/45">
                {String((openIndex ?? 0) + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
              </span>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="label flex items-center gap-3 text-white/60 transition-colors hover:text-white"
              >
                Close
                <span className="relative block h-3 w-3">
                  <span className="absolute left-0 top-1/2 h-px w-full rotate-45 bg-current" />
                  <span className="absolute left-0 top-1/2 h-px w-full -rotate-45 bg-current" />
                </span>
              </button>
            </div>

            <div
              className="flex flex-1 items-center justify-center px-5 py-6 sm:px-8"
              onClick={(e) => e.stopPropagation()}
            >
              <m.div
                key={current.id}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-4xl"
              >
                <div className="h-[46vh] w-full sm:h-[56vh]">
                  <Plate
                    fill
                    tone="royal"
                    sizes="(max-width: 640px) 100vw, 900px"
                    index={current.id.replace('project-', 'No. ')}
                    alt={current.alt}
                    src={current.src}
                    srcSmall={current.srcSmall}
                  />
                </div>
                <div className="mt-5 flex flex-wrap items-baseline justify-between gap-3">
                  <p className="text-lg text-white sm:text-xl">{current.caption}</p>
                  <span className="label text-white/40">
                    {current.location} · {current.category}
                  </span>
                </div>
              </m.div>
            </div>

            <div
              className="flex items-center justify-between border-t border-white/10 px-5 py-4 sm:px-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => step(-1)}
                className="label group flex items-center gap-3 text-white/60 transition-colors hover:text-white"
              >
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 transition-transform duration-400 group-hover:-translate-x-1" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <path d="M14 8H3M7 4L3 8l4 4" strokeLinecap="square" />
                </svg>
                Previous
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                className="label group flex items-center gap-3 text-white/60 transition-colors hover:text-white"
              >
                Next
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 transition-transform duration-400 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <path d="M2 8h11M9 4l4 4-4 4" strokeLinecap="square" />
                </svg>
              </button>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </section>
  );
}
