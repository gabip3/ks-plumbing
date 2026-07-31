'use client';

import { AnimatePresence, m } from 'framer-motion';
import { useState } from 'react';
import { Action } from '@/components/ui/Action';
import { Reveal } from '@/components/ui/Reveal';
import { faqs } from '@/lib/content';
import { site } from '@/lib/site';
import { cx } from '@/lib/utils';

export function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="relative bg-white py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-14">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Sticky rail */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <Reveal>
                <h2 className="display-md text-navy">
                  The things people <span className="serif-accent text-royal">ask first.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="mt-9 border-l-2 border-royal pl-5">
                  <p className="text-[1.0625rem] font-medium leading-relaxed text-navy/75">
                    Not covered here? Call and ask. You will get a plumber on the line, not a
                    ticket number.
                  </p>
                  <a
                    href={site.phone.href}
                    className="mt-3 inline-flex min-h-11 items-center font-mono text-[1.125rem] font-semibold tracking-[-0.01em] text-navy underline-offset-[6px] transition-colors hover:text-royal hover:underline"
                  >
                    {site.phone.display}
                  </a>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Accordion */}
          <div className="lg:col-span-7 lg:col-start-6">
            <ul className="border-t border-navy/12">
              {faqs.map((faq, i) => {
                const isOpen = open === i;
                return (
                  <Reveal as="li" key={faq.question} delay={i * 0.02} className="border-b border-navy/12">
                    <h3>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => setOpen(isOpen ? -1 : i)}
                        className="group flex w-full items-start gap-5 py-6 text-left"
                      >
                        <span
                          className={cx(
                            'mt-2 font-mono text-[0.9375rem] font-semibold tracking-[0.08em] transition-colors duration-400',
                            isOpen ? 'text-royal' : 'text-navy/35',
                          )}
                        >
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span
                          className={cx(
                            'flex-1 text-[1.375rem] font-semibold leading-snug tracking-[-0.02em] transition-colors duration-400 sm:text-[1.4375rem]',
                            isOpen ? 'text-royal' : 'text-navy group-hover:text-royal',
                          )}
                        >
                          {faq.question}
                        </span>
                        <span className="relative mt-2 h-3 w-3 shrink-0">
                          <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-navy/50" />
                          <span
                            className={cx(
                              'absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-navy/50 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]',
                              isOpen && 'rotate-90 opacity-0',
                            )}
                          />
                        </span>
                      </button>
                    </h3>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <m.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-[62ch] pb-7 pl-11 pr-8 text-[1.125rem] font-medium leading-relaxed text-navy/75">
                            {faq.answer}
                          </p>
                        </m.div>
                      )}
                    </AnimatePresence>
                  </Reveal>
                );
              })}
            </ul>

            <Reveal delay={0.05} className="mt-10">
              <Action href="#contact" variant="outline">
                Book a visit
              </Action>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
