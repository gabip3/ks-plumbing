'use client';

import { m } from 'framer-motion';
import { Coupling, PipeRun } from '@/components/ui/Pipe';
import { Parallax } from '@/components/ui/Parallax';
import { Reveal } from '@/components/ui/Reveal';
import { viewportOnce } from '@/lib/motion';
import { site } from '@/lib/site';

const triggers = [
  'Burst or frozen line',
  'Sewage backing up',
  'No water in the house',
  'Water heater leaking',
];

/**
 * A hard stop in the page rhythm: no grid, no cards, no photograph. One number,
 * set as large as it can go, on a black band split by a run of pipe.
 */
export function Emergency() {
  return (
    <section
      id="emergency"
      className="relative overflow-hidden bg-ink py-20 text-white sm:py-24 lg:py-28"
    >
      <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-signal/70" />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(90%_120%_at_15%_0%,rgba(224,85,43,0.16),transparent_55%)]"
      />

      <Parallax distance={24} className="pointer-events-none absolute inset-x-0 top-1/2">
        <div className="relative h-[8px] w-full sm:h-[11px]">
          <PipeRun axis="h" className="inset-0" />
          <Coupling axis="h" size="sm" className="left-[18%] sm:hidden" />
          <Coupling axis="h" size="md" className="left-[18%] max-sm:hidden" />
          <Coupling axis="h" size="sm" className="right-[26%] sm:hidden" />
          <Coupling axis="h" size="md" className="right-[26%] max-sm:hidden" />
          <span className="animate-drip absolute left-[62%] top-full h-2.5 w-2.5 rounded-full bg-water" />
        </div>
      </Parallax>

      <div className="relative mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-14">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-baseline sm:justify-between">
          <Reveal>
            <h2 className="flex items-center gap-4 text-[1.5rem] font-bold tracking-[-0.03em] sm:text-[2rem]">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-signal" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
              </span>
              Water on the floor? Call now.
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <span className="text-[1.0625rem] font-semibold text-white/60">
              Answered 24 hours, 7 days
            </span>
          </Reveal>
        </div>

        <a
          href={site.phone.href}
          className="group mt-7 block sm:mt-9"
          aria-label={`Call KS Plumbing at ${site.phone.display}`}
        >
          <span className="-mb-[0.16em] block overflow-hidden pb-[0.16em]">
            <m.span
              initial={{ y: '106%' }}
              whileInView={{ y: '0%' }}
              viewport={viewportOnce}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="block font-mono text-[clamp(2.1rem,10.4vw,9rem)] font-medium leading-[0.92] tracking-[-0.045em] tabular-nums transition-colors duration-500 group-hover:text-water"
            >
              {site.phone.display}
            </m.span>
          </span>
          <span
            aria-hidden
            className="mt-4 block h-px w-full bg-white/20 transition-colors duration-500 group-hover:bg-water/60"
          />
        </a>

        <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <Reveal delay={0.1}>
            <p className="max-w-xl text-[1.0625rem] font-medium leading-relaxed text-white/70 sm:text-[1.125rem]">
              Shut off the main if you can reach it, then call. We stay on the line while the
              truck is moving and tell you exactly what to do until it gets there.
            </p>
          </Reveal>

          <ul className="flex flex-wrap gap-x-7 gap-y-3 lg:justify-end">
            {triggers.map((t) => (
              <li
                key={t}
                className="flex items-center gap-2.5 text-[1.0625rem] font-semibold text-white/65"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-signal" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
