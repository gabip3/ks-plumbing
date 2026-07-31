'use client';

import { m, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Coupling, PipeRun } from '@/components/ui/Pipe';

/**
 * A run of pipe down the left edge of the viewport. Water fills the bore as you
 * scroll and a union nut rides down the outside with it.
 *
 * Desktop only. On a phone a fixed rail crowds a narrow column and reads as a
 * scrollbar; PipeDivider carries the motif there instead.
 */
export function ScrollSpine() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const top = useTransform(progress, (v) => `${v * 100}%`);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed left-2 top-0 z-40 hidden h-screen w-[13px] lg:block xl:left-3"
    >
      <span className="absolute -left-1 top-0 h-full w-[19px] bg-navy/10 blur-[6px]" />

      <PipeRun axis="v" className="inset-0" />

      {/* the bore, seen through a clear section, filling with water */}
      <span className="absolute inset-y-0 left-[calc(50%-2px)] w-1 bg-black/55">
        <m.span
          className="absolute inset-x-0 top-0 block origin-top bg-gradient-to-b from-royal-deep via-royal to-water"
          style={{ scaleY: reduced ? 1 : progress, height: '100%' }}
        />
      </span>

      <Coupling axis="v" size="sm" className="top-[20vh]" />
      <Coupling axis="v" size="sm" className="top-[72vh]" />

      {!reduced && (
        <m.div className="absolute inset-x-0 h-8" style={{ top }}>
          <Coupling axis="v" size="lg" className="top-0" />
        </m.div>
      )}
    </div>
  );
}
