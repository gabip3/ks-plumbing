'use client';

import { AnimatePresence, m } from 'framer-motion';
import { useState } from 'react';
import { CompareSlider } from '@/components/ui/CompareSlider';
import { Reveal } from '@/components/ui/Reveal';
import { comparisons } from '@/lib/content';
import { cx } from '@/lib/utils';

/**
 * The client's own before / after job photos, wiped against each other. One
 * pair at a time so each gets the whole stage, with the notes changing beside
 * it as you switch.
 */
export function BeforeAfter() {
  const [index, setIndex] = useState(0);
  const pair = comparisons[index];

  return (
    <section id="before-after" className="relative bg-mist py-24 sm:py-32 lg:py-40">
      <div aria-hidden className="grid-rule absolute inset-0 opacity-40" />

      <div className="relative mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-14">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <h2 className="display-md max-w-[14ch] text-navy">
              What it looked like <span className="serif-accent text-royal">when we got there.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="max-w-sm text-[1.0625rem] font-medium leading-relaxed text-navy/70 lg:pb-2 lg:text-right">
              Drag the handle across a photo. What we walked into on one side, what we left on
              the other.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <CompareSlider
              key={pair.id}
              before={pair.before}
              after={pair.after}
              beforeAlt={pair.beforeAlt}
              afterAlt={pair.afterAlt}
              className="aspect-[4/5] shadow-plate"
            />
          </Reveal>

          <div className="lg:col-span-6 lg:col-start-7 lg:pt-4">
            <AnimatePresence mode="wait">
              <m.div
                key={pair.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <h3 className="text-[1.75rem] font-semibold leading-tight tracking-[-0.035em] text-navy sm:text-[2.25rem]">
                  {pair.title}
                </h3>
                <p className="mt-3 text-[1.0625rem] font-semibold text-navy/50">{pair.location}</p>

                <dl className="mt-9 space-y-7">
                  <div className="border-l-2 border-navy/25 pl-5">
                    <dt className="text-[0.875rem] font-bold uppercase tracking-[0.16em] text-navy/45">
                      Before
                    </dt>
                    <dd className="mt-2 text-[1.125rem] font-medium leading-relaxed text-navy/80">
                      {pair.beforeNote}
                    </dd>
                  </div>
                  <div className="border-l-2 border-royal pl-5">
                    <dt className="text-[0.875rem] font-bold uppercase tracking-[0.16em] text-royal">
                      After
                    </dt>
                    <dd className="mt-2 text-[1.125rem] font-medium leading-relaxed text-navy/80">
                      {pair.afterNote}
                    </dd>
                  </div>
                </dl>
              </m.div>
            </AnimatePresence>

            {/* Pair switcher */}
            <ul className="mt-12 border-t border-navy/15">
              {comparisons.map((c, i) => (
                <li key={c.id} className="border-b border-navy/15">
                  <button
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-current={i === index}
                    className="group flex w-full items-center gap-4 py-4 text-left"
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
                      {c.title}
                    </span>
                    <span
                      className={cx(
                        'h-2 w-2 rounded-full transition-colors duration-400',
                        i === index ? 'bg-royal' : 'bg-navy/20',
                      )}
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
