'use client';

import { AnimatePresence, m } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Logo } from '@/components/brand/Logo';
import { PhonePulse } from '@/components/ui/Action';
import { navigation, site } from '@/lib/site';
import { cx } from '@/lib/utils';

export function Header() {
  const [pinned, setPinned] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setPinned(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Light UI over the hero, and again over the black mobile sheet.
  const overHero = open || !pinned;

  return (
    <>
      <a
        href="#services"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:bg-navy focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      <m.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className={cx(
          'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-500',
          pinned && !open
            ? 'border-b border-navy/10 bg-paper/97 shadow-[0_1px_0_0_rgba(10,23,48,0.04)]'
            : 'border-b border-transparent bg-transparent',
        )}
      >
        <div className="mx-auto flex h-20 max-w-[1560px] items-center justify-between gap-5 px-5 sm:h-26 sm:px-8 lg:px-14">
          {/* The badge already owns the hero, so the header only claims it once
              you have scrolled past. No duplicate marks on screen at once. */}
          <a
            href="#top"
            aria-label={`${site.name}, home`}
            className={cx(
              'relative z-10 flex items-center transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
              pinned && !open
                ? 'translate-y-0 opacity-100'
                : 'pointer-events-none -translate-y-2 opacity-0',
            )}
          >
            <Logo tone="dark" size="md" />
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex xl:gap-10">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cx(
                  'group relative py-2 text-[1.0625rem] font-semibold tracking-[-0.005em] transition-colors duration-300',
                  overHero ? 'text-white/85 hover:text-water' : 'text-navy/80 hover:text-royal',
                )}
              >
                {item.label}
                <span
                  aria-hidden
                  className="absolute bottom-0 left-0 h-[3px] w-full origin-right scale-x-0 bg-gradient-to-r from-royal-deep via-royal to-water transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:origin-left group-hover:scale-x-100"
                />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <a
              href={site.phone.href}
              className={cx(
                'hidden items-center gap-3 border py-2.5 pl-4 pr-4 transition-colors duration-400 lg:inline-flex',
                overHero
                  ? 'border-white/30 text-white hover:border-white'
                  : 'border-navy/25 text-navy hover:border-navy',
              )}
            >
              <PhonePulse />
              <span className="flex flex-col items-center leading-none">
                <span className="font-mono text-[1.0625rem] font-semibold tracking-[0.01em]">
                  {site.phone.display}
                </span>
                <span className="mt-1.5 text-[0.8125rem] font-bold uppercase tracking-[0.14em] text-live">
                  Free estimate
                </span>
              </span>
            </a>

            {/* Mobile and tablet get a one-tap text button instead of the pill. */}
            <a
              href={site.phone.sms}
              className="inline-flex h-11 items-center gap-2 bg-royal px-4 text-[1rem] font-bold tracking-[0.01em] text-white transition-colors duration-400 hover:bg-royal-deep lg:hidden"
            >
              <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M2 3h12v9H6.5L3 14.5V12H2z" strokeLinejoin="round" />
              </svg>
              Text now
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? 'Close menu' : 'Open menu'}
              className={cx(
                'relative z-10 flex h-10 w-10 items-center justify-center lg:hidden',
                overHero ? 'text-white' : 'text-navy',
              )}
            >
              <span className="relative block h-3.5 w-7">
                <span
                  className={cx(
                    'absolute left-0 h-[2px] w-full bg-current transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]',
                    open ? 'top-1.5 rotate-45' : 'top-0',
                  )}
                />
                <span
                  className={cx(
                    'absolute left-0 h-[2px] bg-current transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]',
                    open ? 'top-1.5 w-full -rotate-45' : 'top-3 w-2/3',
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </m.header>

      <AnimatePresence>{open && <MobileMenu onClose={() => setOpen(false)} />}</AnimatePresence>
    </>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <m.div
      initial={{ clipPath: 'inset(0 0 100% 0)' }}
      animate={{ clipPath: 'inset(0 0 0% 0)' }}
      exit={{ clipPath: 'inset(0 0 100% 0)' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-45 flex flex-col bg-ink lg:hidden"
    >
      <div aria-hidden className="grid-rule-dark absolute inset-0 opacity-60" />

      <nav aria-label="Mobile" className="relative mt-24 flex-1 overflow-y-auto px-5 sm:mt-28 sm:px-8">
        <ul>
          {navigation.map((item, i) => (
            <m.li
              key={item.href}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 + i * 0.06, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="border-b border-white/10"
            >
              <a
                href={item.href}
                onClick={onClose}
                className="group relative block py-4 text-[1.625rem] font-bold tracking-[-0.03em] text-white transition-colors duration-300 active:text-water sm:py-5 sm:text-[2.125rem]"
              >
                {item.label}
                <span
                  aria-hidden
                  className="absolute bottom-0 left-0 h-[3px] w-full origin-right scale-x-0 bg-gradient-to-r from-royal-deep via-royal to-water transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:origin-left group-hover:scale-x-100"
                />
              </a>
            </m.li>
          ))}
        </ul>
      </nav>

      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="relative border-t border-white/10 px-5 pb-10 pt-7 sm:px-8"
      >
        <span className="flex items-center gap-3">
          <PhonePulse />
          <span className="text-[0.9375rem] font-bold uppercase tracking-[0.14em] text-live">
            Free estimate
          </span>
        </span>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <a
            href={site.phone.href}
            className="inline-flex h-13 items-center justify-center bg-royal text-[1.0625rem] font-bold text-white"
          >
            Call now
          </a>
          <a
            href={site.phone.sms}
            className="inline-flex h-13 items-center justify-center border border-white/30 text-[1.0625rem] font-bold text-white"
          >
            Text now
          </a>
        </div>

        <a
          href={site.phone.href}
          className="mt-5 block font-mono text-[1.625rem] font-medium tracking-[-0.02em] text-white"
        >
          {site.phone.display}
        </a>
        <a
          href={`mailto:${site.email}`}
          className="mt-1.5 block text-[1.0625rem] font-medium text-white/60 underline-offset-4 hover:text-white hover:underline"
        >
          {site.email}
        </a>
      </m.div>
    </m.div>
  );
}
