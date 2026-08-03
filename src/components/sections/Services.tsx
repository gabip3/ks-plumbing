'use client';

import { AnimatePresence, m } from 'framer-motion';
import { useState } from 'react';
import { Plate } from '@/components/ui/Plate';
import { MaskLines, Reveal } from '@/components/ui/Reveal';
import { services } from '@/lib/content';
import { cx } from '@/lib/utils';

/**
 * Services as an editorial index rather than a grid of identical cards.
 * On pointer devices the list sits on the left and a single plate holds the
 * right-hand column, cross-fading as you move down the rows. It never covers
 * the type. Touch devices get the same content as an inline accordion.
 */
export function Services() {
  const [active, setActive] = useState(0);
  const [openRow, setOpenRow] = useState<string | null>(services[0].id);
  const current = services[active];

  return (
    <section id="services" className="relative bg-paper py-24 sm:py-32 lg:py-40">
      <div aria-hidden className="grid-rule absolute inset-0 opacity-40" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-navy/10" />

      <div className="relative mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-14">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="display-lg text-navy">
              <MaskLines
                className="block"
                lines={[
                  'Seven things',
                  <>
                    we do <span className="serif-accent text-royal">properly.</span>
                  </>,
                ]}
              />
            </h2>
          </div>

          <Reveal delay={0.15} className="max-w-sm lg:pb-3 lg:text-right">
            <p className="text-[1.0625rem] font-medium leading-relaxed text-navy/70">
              No trip charges hidden in the invoice, no upsell script. If a repair will hold,
              we repair it. If it will not, we tell you why on the spot.
            </p>
          </Reveal>
        </div>

        {/* ── Desktop: index on the left, one plate holding the right ─── */}
        <div className="mt-16 hidden lg:grid lg:grid-cols-12 lg:gap-14">
          <ul
            className="border-t border-navy/15 lg:col-span-7"
            onMouseLeave={() => setActive(0)}
          >
            {services.map((service, i) => (
              <Reveal as="li" key={service.id} delay={i * 0.03}>
                <a
                  href="#contact"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className={cx(
                    'group relative flex items-center gap-8 border-b border-navy/15 py-7 transition-colors duration-500',
                    active === i ? 'text-navy' : 'text-navy/40',
                  )}
                >
                  <span
                    className={cx(
                      'font-mono text-[0.9375rem] font-semibold tracking-[0.08em] transition-colors duration-500',
                      active === i ? 'text-royal' : 'text-navy/35',
                    )}
                  >
                    {service.index}
                  </span>
                  <h3 className="min-w-0 flex-1 text-[2.125rem] font-semibold leading-none tracking-[-0.04em] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3 xl:text-[2.625rem]">
                    {service.title}
                  </h3>
                  <span
                    className={cx(
                      'flex h-10 w-10 shrink-0 items-center justify-center border transition-colors duration-500',
                      active === i ? 'border-royal bg-royal text-white' : 'border-navy/20',
                    )}
                  >
                    <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path
                        d="M4 12L12 4M6 4h6v6"
                        strokeLinecap="square"
                        className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </svg>
                  </span>
                </a>
              </Reveal>
            ))}
          </ul>

          <div className="lg:col-span-5">
            <div className="sticky top-36">
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <AnimatePresence initial={false}>
                  <m.div
                    key={current.id}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0"
                  >
                    <Plate
                      fill
                      tone="royal"
                      index={current.index}
                      caption={current.lead}
                      alt={current.title}
                      src={current.image}
                      className="shadow-lift"
                    />
                  </m.div>
                </AnimatePresence>
              </div>

              <AnimatePresence mode="wait">
                <m.div
                  key={current.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-7"
                >
                  <p className="serif-accent text-[1.5rem] leading-tight text-royal">
                    {current.lead}
                  </p>
                  <p className="mt-4 text-[1.125rem] font-medium leading-relaxed text-navy/75">
                    {current.body}
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-navy/15 pt-5">
                    {current.details.map((d) => (
                      <li key={d} className="text-[1rem] font-semibold text-navy/55">
                        {d}
                      </li>
                    ))}
                  </ul>
                </m.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ── Mobile and tablet: accordion ─────────────────────────── */}
        <ul className="mt-12 border-t border-navy/15 lg:hidden">
          {services.map((service) => {
            const open = openRow === service.id;
            return (
              <li key={service.id} className="border-b border-navy/15">
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => setOpenRow(open ? null : service.id)}
                  className="flex w-full items-center gap-4 py-5 text-left"
                >
                  <span
                    className={cx(
                      'font-mono text-[0.875rem] font-semibold tracking-[0.08em] transition-colors duration-400',
                      open ? 'text-royal' : 'text-navy/35',
                    )}
                  >
                    {service.index}
                  </span>
                  <h3 className="flex-1 text-[1.5rem] font-semibold leading-tight tracking-[-0.035em] text-navy sm:text-[1.875rem]">
                    {service.title}
                  </h3>
                  <span className="relative h-3.5 w-3.5 shrink-0">
                    <span className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 bg-navy/60" />
                    <span
                      className={cx(
                        'absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-navy/60 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]',
                        open && 'rotate-90 opacity-0',
                      )}
                    />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {open && (
                    <m.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-7 pl-10 pr-2">
                        <p className="text-[1.0625rem] font-medium leading-relaxed text-navy/75">
                          {service.body}
                        </p>
                        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                          {service.details.map((d) => (
                            <li key={d} className="text-[1rem] font-semibold text-navy/55">
                              {d}
                            </li>
                          ))}
                        </ul>
                        <Plate
                          ratio="landscape"
                          tone="royal"
                          index={service.index}
                          caption={service.lead}
                          alt={service.title}
                          src={service.image}
                          className="mt-6"
                        />
                      </div>
                    </m.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
