'use client';

import { Parallax } from '@/components/ui/Parallax';
import { Plate } from '@/components/ui/Plate';
import { asset } from '@/lib/paths';
import { MaskLines, Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { stats } from '@/lib/content';

/**
 * Deliberately off-grid: the heading, the copy and the two plates all sit on
 * different baselines and move at different speeds, so nothing lines up in the
 * way a template would line it up.
 */
export function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-mist py-24 sm:py-32 lg:py-40">
      {/* The badge, oversized and almost invisible, kept well clear of the copy. */}
      <Parallax
        distance={70}
        className="pointer-events-none absolute -right-24 bottom-24 w-[62vw] max-w-[520px] select-none opacity-[0.035] lg:-right-16"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset('/assets/brand/ks-logo.png')}
          alt=""
          aria-hidden
          loading="lazy"
          decoding="async"
          className="h-auto w-full"
        />
      </Parallax>

      <div className="relative mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-14">
        <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-5">
            <h2 className="display-lg text-navy">
              <MaskLines
                className="block"
                lines={[
                  'A small crew,',
                  <>
                    <span className="serif-accent text-royal">on purpose.</span>
                  </>,
                ]}
              />
            </h2>

            <Reveal delay={0.2}>
              <p className="serif-accent mt-8 text-[1.75rem] leading-tight text-navy sm:text-[2rem]">
                Fast. Reliable. Done right.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
            <p className="max-w-[54ch] text-[1.0625rem] font-medium leading-relaxed text-navy/75 sm:text-[1.125rem]">
              KS Plumbing is a local crew based in Boise, on the road across the Treasure Valley
              every day. The person who answers the phone is the person who shows up, and the
              work is done by plumbers who have been at it long enough to know when a repair
              will hold and when it is a band-aid.
            </p>
            <p className="mt-5 max-w-[54ch] text-[1.0625rem] font-medium leading-relaxed text-navy/75 sm:text-[1.125rem]">
              We keep the crew small on purpose, so the standard is the same on the tenth call of
              the day as it was on the first: clean work, honest pricing, and a phone that gets
              answered when the water is already on the floor.
            </p>
          </Reveal>

          <Parallax distance={34} className="lg:col-span-5 lg:col-start-1 lg:-mt-4">
            <Plate
              ratio="tall"
              tone="navy"
              index="02 / A"
              caption="Boise, Idaho. Same-day repairs across the Valley."
              alt="KS Plumbing service van in Boise"
              src="/assets/about/about-crew.webp"
              className="shadow-lift"
            />
          </Parallax>

          {/* The second plate is a desktop-only beat. On a phone one photograph
              in this section is plenty. */}
          <div className="hidden lg:col-span-6 lg:col-start-7 lg:mt-36 lg:block">
            <Parallax distance={-18}>
              <Plate
                ratio="landscape"
                tone="steel"
                index="02 / B"
                caption="Pressure testing a finished repipe before close-out"
                alt="Plumber pressure testing a finished repipe"
                src="/assets/about/about-work.webp"
                className="shadow-lift"
              />
            </Parallax>
            <Reveal delay={0.1}>
              <p className="mt-9 max-w-md text-[1.0625rem] font-medium leading-relaxed text-navy/60">
                Every repair is tested under pressure before we call it finished.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Stat rail — mono, hairline separated, no boxes */}
        <RevealGroup className="mt-16 grid grid-cols-2 border-t border-navy/15 sm:mt-24 lg:mt-32 lg:grid-cols-4">
          {stats.map((s) => (
            <RevealItem
              key={s.label}
              className="border-b border-navy/15 px-1 py-6 sm:py-9 lg:border-b-0 lg:border-r lg:px-6 lg:first:pl-0 lg:last:border-r-0"
            >
              <span className="block text-[2.125rem] font-medium leading-none tracking-[-0.05em] text-navy sm:text-[3.25rem]">
                {s.value}
              </span>
              <span className="mt-4 block text-[1.0625rem] font-semibold tracking-[0.01em] text-royal">
                {s.label}
              </span>
              <span className="mt-2 block max-w-[24ch] text-[1rem] font-medium leading-relaxed text-navy/55">
                {s.detail}
              </span>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
