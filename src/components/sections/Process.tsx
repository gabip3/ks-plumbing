'use client';

import { m, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Coupling, PipeRun } from '@/components/ui/Pipe';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { processSteps } from '@/lib/content';

/**
 * The run of pipe fills as you scroll through the section, horizontally on
 * desktop and vertically on mobile, with the four steps hanging off it on a
 * shared baseline.
 */
export function Process() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 78%', 'end 55%'],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });
  const glowX = useTransform(fill, (v) => `${v * 100}%`);

  return (
    <section id="process" ref={ref} className="relative bg-paper py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-14">
        <div className="max-w-3xl">
          <Reveal>
            <h2 className="display-md text-navy">
              Four steps, and you know the price{' '}
              <span className="serif-accent text-royal">before step three ends.</span>
            </h2>
          </Reveal>
        </div>

        {/* ── Desktop: horizontal run ──────────────────────────────── */}
        <div className="relative mt-24 hidden lg:block">
          <div className="relative h-[13px] w-full">
            <PipeRun axis="h" className="inset-0" />
            <span className="absolute inset-x-0 top-[calc(50%-2px)] h-1 bg-black/50">
              <m.span
                className="absolute inset-y-0 left-0 block origin-left bg-gradient-to-r from-royal-deep via-royal to-water"
                style={{ scaleX: fill, width: '100%' }}
              />
            </span>
            <m.span
              className="absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-water/25"
              style={{ left: glowX }}
            />
            {processSteps.map((step, i) => (
              <span
                key={step.index}
                className="absolute top-1/2 w-[18px] -translate-y-1/2"
                style={{ left: `calc(${(i / (processSteps.length - 1)) * 100}% - 9px)`, height: '11px' }}
              >
                <Coupling axis="h" size="md" className="left-0" />
              </span>
            ))}
          </div>

          <RevealGroup className="grid grid-cols-4 gap-8" amount={0.1}>
            {processSteps.map((step, i) => (
              <RevealItem key={step.index} className="pt-12">
                <span className="font-mono text-[0.9375rem] font-semibold tracking-[0.1em] text-royal">
                  {step.index}
                </span>
                <h3 className="mt-4 text-[1.75rem] font-semibold leading-none tracking-[-0.04em] text-navy">
                  {step.title}
                </h3>
                <p className="mt-4 max-w-[34ch] text-[1.0625rem] font-medium leading-relaxed text-navy/70">
                  {step.body}
                </p>
                <span className="mt-6 inline-block border-t border-navy/15 pt-3 text-[1rem] font-semibold text-navy/50">
                  {step.meta}
                </span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        {/* ── Mobile: vertical run ─────────────────────────────────── */}
        <div className="relative mt-14 lg:hidden">
          <div className="absolute bottom-0 left-[6px] top-2 w-[11px]">
            <PipeRun axis="v" className="inset-0" />
            <span className="absolute inset-y-0 left-[calc(50%-1.5px)] w-[3px] bg-black/50">
              <m.span
                className="absolute inset-x-0 top-0 block origin-top bg-gradient-to-b from-royal-deep via-royal to-water"
                style={{ scaleY: fill, height: '100%' }}
              />
            </span>
          </div>

          <ol className="space-y-10">
            {processSteps.map((step) => (
              <Reveal as="li" key={step.index} className="relative pl-12">
                <span className="absolute left-[6px] top-1 h-5 w-[11px]">
                  <Coupling axis="v" size="sm" className="top-0" />
                </span>
                <span className="font-mono text-[0.875rem] font-semibold tracking-[0.1em] text-royal">
                  {step.index}
                </span>
                <h3 className="mt-2.5 text-[1.5rem] font-semibold leading-none tracking-[-0.04em] text-navy">
                  {step.title}
                </h3>
                <p className="mt-3 text-[1.0625rem] font-medium leading-relaxed text-navy/70">
                  {step.body}
                </p>
                <span className="mt-4 inline-block text-[1rem] font-semibold text-navy/50">
                  {step.meta}
                </span>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
