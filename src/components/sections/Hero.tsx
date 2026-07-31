'use client';

import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Logo } from '@/components/brand/Logo';
import { Action, PhonePulse } from '@/components/ui/Action';
import { Coupling, PipeRun } from '@/components/ui/Pipe';
import { site } from '@/lib/site';

const lineTransition = { duration: 1.15, ease: [0.16, 1, 0.3, 1] as const };

/**
 * Badge on the left, the promise on the right, on a deep blue field. No
 * photograph behind it. The two columns drift at slightly different speeds as
 * you scroll, which is what keeps it from reading as a flat banner.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const typeY = useTransform(scrollYProgress, [0, 1], ['0%', '-28%']);
  const logoY = useTransform(scrollYProgress, [0, 1], ['0%', '-46%']);
  const railY = useTransform(scrollYProgress, [0, 1], ['0%', '-14%']);

  const still = reduced ? {} : undefined;

  return (
    <section
      id="top"
      ref={ref}
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink text-white"
    >
      {/* ── Layer 1, the blue field ────────────────────────────────── */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-[linear-gradient(160deg,#0e2350_0%,#0a1730_46%,#050b16_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-[radial-gradient(90%_70%_at_28%_28%,rgba(27,79,216,0.3),transparent_66%)]"
      />
      <div aria-hidden className="grid-rule-dark absolute inset-0 -z-20 opacity-70" />

      {/* ── Layer 2, a run of pipe down the right edge ─────────────── */}
      <m.div
        aria-hidden
        style={still ?? { y: railY }}
        className="absolute right-5 top-0 -z-10 hidden h-[70%] w-[14px] xl:block"
      >
        <PipeRun axis="v" className="inset-0" />
        <span className="absolute inset-y-0 left-[calc(50%-1.5px)] w-[3px] bg-black/40" />
        <Coupling axis="v" size="md" className="top-[20%]" />
        <Coupling axis="v" size="md" className="top-[56%]" />
        <span className="pipe-lip pipe-v absolute -left-1 bottom-0 h-3 w-[calc(100%+8px)]" />
        <span className="animate-drip absolute -bottom-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-water/90" />
      </m.div>

      {/* ── Layer 3, badge and promise ─────────────────────────────── */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1560px] flex-1 items-center px-5 pb-8 pt-24 sm:px-8 sm:pb-10 sm:pt-32 lg:px-14">
        <div className="grid w-full items-center gap-6 text-center md:grid-cols-[minmax(0,0.78fr)_minmax(0,1fr)] md:gap-12 md:text-left lg:gap-16">
          {/* Scroll parallax lives on the outer element, the entrance
              animation on the inner one, so the two never fight over the
              same style during hydration. */}
          <m.div
            style={still ?? { y: logoY }}
            className="relative w-full max-w-[218px] justify-self-center will-change-transform sm:max-w-[300px] md:max-w-none md:justify-self-start"
          >
            <m.div
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <span
                aria-hidden
                className="absolute inset-[-14%] -z-10 rounded-full bg-[radial-gradient(circle,rgba(27,79,216,0.4),rgba(5,11,22,0)_68%)] blur-2xl"
              />
              <Logo
                tone="light"
                fluid
                decorative
                priority
                className="drop-shadow-[0_28px_56px_rgba(5,11,22,0.65)]"
              />
            </m.div>
          </m.div>

          <m.div style={still ?? { y: typeY }} className="will-change-transform">
            <h1 className="display-hero">
              <Line delay={0.45}>We show up.</Line>
              <Line delay={0.56}>We solve it.</Line>
              <Line delay={0.67}>
                <span className="serif-accent text-water">You relax.</span>
              </Line>
            </h1>

            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 border-t border-white/20 pt-6 sm:mt-8 sm:pt-7"
            >
              <p className="mx-auto max-w-lg text-[1.0625rem] font-medium leading-relaxed text-white/80 md:mx-0">
                Licensed plumbers in Boise. Repairs, drains, water heaters and repipes across the
                Treasure Valley, with free estimates and the price agreed before the wrench comes
                out.
              </p>

              <div className="mt-6 flex flex-col items-center gap-3 sm:mt-7 sm:flex-row sm:justify-center md:justify-start">
                <Action
                  href={site.phone.href}
                  variant="solid"
                  className="justify-between sm:justify-start"
                >
                  Call {site.phone.display}
                </Action>
                <Action href="#contact" variant="light" className="justify-between sm:justify-start">
                  Request a visit
                </Action>
              </div>
            </m.div>
          </m.div>
        </div>
      </div>

      {/* ── Instrument bar ─────────────────────────────────────────── */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.25, duration: 0.8 }}
        className="relative z-10 border-t border-white/15 bg-ink/70"
      >
        <div className="mx-auto flex max-w-[1560px] items-center justify-between gap-6 px-5 py-4 sm:px-8 lg:px-14">
          <div className="flex items-center gap-3">
            <PhonePulse />
            <span className="text-[0.9375rem] font-semibold tracking-[0.01em] text-white/90">
              Call or text, a plumber answers
            </span>
          </div>
          <div className="hidden items-center gap-9 md:flex">
            {site.credentials.map((c) => (
              <span key={c} className="text-[0.9375rem] font-medium text-white/60">
                {c}
              </span>
            ))}
          </div>
          <a href="#services" className="group flex h-11 items-center gap-2.5 text-white/75 hover:text-white">
            <span className="text-[0.9375rem] font-semibold">Scroll</span>
            <svg viewBox="0 0 12 20" className="h-4 w-2.5" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path
                d="M6 2v16M2 13l4 5 4-5"
                strokeLinecap="square"
                className="transition-transform duration-500 group-hover:translate-y-0.5"
              />
            </svg>
          </a>
        </div>
      </m.div>
    </section>
  );
}

function Line({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="-mb-[0.2em] block overflow-hidden pb-[0.2em]">
      <m.span
        initial={{ y: '108%' }}
        animate={{ y: '0%' }}
        transition={{ ...lineTransition, delay }}
        className="block"
      >
        {children}
      </m.span>
    </span>
  );
}
