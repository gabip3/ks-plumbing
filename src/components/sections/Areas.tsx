'use client';

import { m } from 'framer-motion';
import { Parallax } from '@/components/ui/Parallax';
import { Reveal } from '@/components/ui/Reveal';
import { viewportOnce } from '@/lib/motion';
import { areas } from '@/lib/content';
import { cx } from '@/lib/utils';

const sizeByWeight = {
  3: 'text-[2.5rem] sm:text-[4.5rem] lg:text-[6.5rem]',
  2: 'text-[1.875rem] sm:text-[3.25rem] lg:text-[4.5rem]',
  1: 'text-[1.375rem] sm:text-[2.25rem] lg:text-[3rem]',
} as const;

/**
 * A service map made of type. City names are sized by how much work we do
 * there. Hovering only lifts the name you are on, nothing appears or moves
 * anywhere else on the page.
 */
export function Areas() {
  return (
    <section id="areas" className="relative overflow-hidden bg-navy py-24 text-white sm:py-32 lg:py-40">
      <div aria-hidden className="grid-rule-dark absolute inset-0 opacity-60" />
      <Parallax distance={60} className="pointer-events-none absolute inset-x-0 top-0 h-full">
        <div
          aria-hidden
          className="h-full w-full bg-[radial-gradient(60%_50%_at_20%_20%,rgba(27,79,216,0.22),transparent_60%)]"
        />
      </Parallax>

      <div className="relative mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-14">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <h2 className="display-md max-w-[14ch]">
              Ten cities, <span className="serif-accent text-water">one crew.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="max-w-xl text-[1.0625rem] font-medium leading-relaxed text-white/70 lg:pb-2">
              If you are within about an hour of Boise, call anyway. We route across the Valley
              every day.
            </p>
          </Reveal>
        </div>

        <ul className="mt-14 flex flex-wrap items-baseline gap-x-6 gap-y-2 sm:mt-20 sm:gap-x-9">
          {areas.map((area, i) => (
            <m.li
              key={area.name}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.8, delay: i * 0.045, ease: [0.16, 1, 0.3, 1] }}
            >
              <a
                href="#contact"
                className={cx(
                  'group relative flex min-h-11 items-center font-medium leading-[1.05] tracking-[-0.045em] text-white/70 transition-colors duration-500 hover:text-white',
                  sizeByWeight[area.weight],
                )}
              >
                {area.name}
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-[3px] w-full origin-right scale-x-0 bg-water transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:origin-left group-hover:scale-x-100"
                />
              </a>
            </m.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
