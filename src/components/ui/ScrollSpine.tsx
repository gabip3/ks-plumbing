'use client';

import { m, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Coupling, PipeRun } from '@/components/ui/Pipe';

/**
 * A run of pipe down the left edge of the viewport. Water fills the bore as you
 * scroll and a union nut rides down the outside with it.
 *
 * On phones it thins down, hugs the very edge and drops the travelling nut, so
 * the motif is still there without eating into a narrow column.
 */
export function ScrollSpine() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const top = useTransform(progress, (v) => `${v * 100}%`);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-40 h-screen w-[7px] sm:w-[9px] lg:left-2 lg:w-[13px] xl:left-3"
    >
      <span className="absolute -left-1 top-0 hidden h-full w-[19px] bg-navy/10 blur-[6px] lg:block" />

      <PipeRun axis="v" className="inset-0" />

      {/* the bore, seen through a clear section, filling with water */}
      <span className="absolute inset-y-0 left-[calc(50%-1px)] w-[2px] bg-black/55 lg:left-[calc(50%-2px)] lg:w-1">
        <m.span
          className="absolute inset-x-0 top-0 block origin-top bg-gradient-to-b from-royal-deep via-royal to-water"
          style={{ scaleY: reduced ? 1 : progress, height: '100%' }}
        />
      </span>

      <Coupling axis="v" size="sm" className="top-[20vh]" />
      <Coupling axis="v" size="sm" className="top-[72vh]" />

      {!reduced && (
        <m.div className="absolute inset-x-0 hidden h-8 lg:block" style={{ top }}>
          <Coupling axis="v" size="lg" className="top-0" />
        </m.div>
      )}
    </div>
  );
}
