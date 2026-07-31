'use client';

import { AnimatePresence, m } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { reviews } from '@/lib/content';
import { cx } from '@/lib/utils';

const DURATION = 8000;

/**
 * One quote at a time, set large in the serif, with the other reviewers listed
 * as a rail rather than repeated in identical cards.
 */
export function Reviews() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const review = reviews[index];

  useEffect(() => {
    if (paused) return;
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % reviews.length), DURATION);
    return () => window.clearTimeout(id);
  }, [index, paused]);

  return (
    <section
      id="reviews"
      className="relative bg-paper py-24 sm:py-32 lg:py-40"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-14">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <h2 className="display-md max-w-[13ch] text-navy">
              What the <span className="serif-accent text-royal">neighbors say.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <span className="flex items-center gap-3 lg:pb-3">
              <Stars />
              <span className="text-[1.0625rem] font-semibold text-navy/55">
                Rated across the Treasure Valley
              </span>
            </span>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-16">
          <div className="min-h-[24rem] sm:min-h-[26rem] lg:col-span-8 lg:min-h-[28rem]">
            <AnimatePresence mode="wait">
              <m.blockquote
                key={index}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <span aria-hidden className="serif-accent block text-[4rem] leading-[0.4] text-royal/25">
                  &ldquo;
                </span>
                <p className="serif-accent mt-6 text-[1.625rem] leading-[1.28] text-navy sm:text-[2.125rem] lg:text-[2.625rem]">
                  {review.quote}
                </p>
                <footer className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-navy/15 pt-5">
                  <span className="text-[1.125rem] font-bold tracking-[-0.01em] text-navy">
                    {review.name}
                  </span>
                  <span className="text-[1.0625rem] font-medium text-navy/50">
                    {review.location}
                  </span>
                  <span className="text-[1.0625rem] font-semibold text-royal">{review.job}</span>
                </footer>
              </m.blockquote>
            </AnimatePresence>
          </div>

          {/* Reviewer rail */}
          <div className="lg:col-span-4">
            <ul className="border-t border-navy/12">
              {reviews.map((r, i) => (
                <li key={r.name} className="border-b border-navy/12">
                  <button
                    type="button"
                    onClick={() => setIndex(i)}
                    className="group relative flex min-h-12 w-full items-center gap-4 py-3.5 text-left"
                    aria-current={i === index}
                  >
                    <span
                      className={cx(
                        'font-mono text-[0.9375rem] font-semibold tracking-[0.08em] transition-colors duration-400',
                        i === index ? 'text-royal' : 'text-navy/35',
                      )}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={cx(
                        'flex-1 text-[1.125rem] font-semibold transition-colors duration-400',
                        i === index ? 'text-navy' : 'text-navy/50 group-hover:text-navy/80',
                      )}
                    >
                      {r.name}
                    </span>
                    <span className="text-[1rem] font-medium text-navy/40">{r.job}</span>

                    {i === index && !paused && (
                      <m.span
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: DURATION / 1000, ease: 'linear' }}
                        className="absolute bottom-[-1px] left-0 h-px w-full origin-left bg-royal"
                      />
                    )}
                    {i === index && paused && (
                      <span className="absolute bottom-[-1px] left-0 h-px w-full bg-royal/40" />
                    )}
                  </button>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-[1.0625rem] font-medium leading-relaxed text-navy/55">
              Ask and we will send the full list of references in your zip code.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stars() {
  return (
    <span className="flex gap-1" aria-label="Five out of five stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 12 12" className="h-3 w-3 text-royal" fill="currentColor" aria-hidden>
          <path d="M6 0l1.6 3.9L12 4.4 8.8 7.2l1 4.4L6 9.3 2.2 11.6l1-4.4L0 4.4l4.4-.5L6 0z" />
        </svg>
      ))}
    </span>
  );
}
