'use client';

import { ContactForm } from '@/components/forms/ContactForm';
import { PhonePulse } from '@/components/ui/Action';
import { MaskLines, Reveal } from '@/components/ui/Reveal';
import { site } from '@/lib/site';

/**
 * Full-bleed split: the shop's details on a black panel, the form on paper.
 * No container, no centred heading — the two halves meet in the middle of the
 * viewport and that edge is the composition.
 */
export function Contact() {
  return (
    <section id="contact" className="relative grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      {/* ── Left: the shop ─────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-ink px-5 py-16 text-white sm:px-8 sm:py-20 lg:px-14 lg:py-32">
        <div aria-hidden className="grid-rule-dark absolute inset-0 opacity-60" />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(70%_50%_at_10%_0%,rgba(27,79,216,0.28),transparent_60%)]"
        />
        <span aria-hidden className="metal absolute right-0 top-0 hidden h-full w-[3px] lg:block" />

        <div className="relative text-center lg:sticky lg:top-36 lg:text-left">
          <h2 className="display-md">
            <MaskLines
              className="block"
              lines={[
                'Tell us what',
                <>
                  is <span className="serif-accent text-water">going on.</span>
                </>,
              ]}
            />
          </h2>

          <Reveal delay={0.1}>
            <div className="mt-10 border-y border-white/15 py-5">
              <a
                href={site.phone.href}
                className="group flex min-h-12 items-center justify-center gap-4 lg:justify-start"
              >
                <PhonePulse />
                <span className="font-mono text-[1.5rem] font-semibold tracking-[-0.02em] transition-colors duration-500 group-hover:text-water sm:text-[1.75rem]">
                  {site.phone.display}
                </span>
              </a>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <a
                  href={site.phone.href}
                  className="inline-flex h-12 items-center justify-center bg-royal text-[1.0625rem] font-bold text-white transition-colors hover:bg-royal-deep"
                >
                  Call now
                </a>
                <a
                  href={site.phone.sms}
                  className="inline-flex h-12 items-center justify-center border border-white/30 text-[1.0625rem] font-bold text-white transition-colors hover:bg-white hover:text-navy"
                >
                  Text now
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <dl className="mt-9 space-y-5">
              <Row term="Text us">
                <a href={site.phone.sms} className="flex min-h-11 items-center hover:text-water sm:min-h-0">
                  Send a photo of the problem
                </a>
              </Row>
              <Row term="Email">
                <a
                  href={`mailto:${site.email}`}
                  className="flex min-h-11 items-center break-all hover:text-water sm:min-h-0"
                >
                  {site.email}
                </a>
              </Row>
              <Row term="Based in">
                {site.address.city}, {site.address.regionName}. Serving the Treasure Valley.
              </Row>
            </dl>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-10 border-t border-white/15 pt-7 text-left">
              <h3 className="text-[0.875rem] font-bold uppercase tracking-[0.16em] text-white/45">
                Hours
              </h3>
              <ul className="mt-4 space-y-2.5">
                {site.hours.map((h) => (
                  <li
                    key={h.label}
                    className="flex justify-between gap-6 text-[1.0625rem] font-medium"
                  >
                    <span className="text-white/55">{h.label}</span>
                    <span className="text-right font-semibold text-white/90">{h.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── Right: the form ────────────────────────────────────────── */}
      <div className="bg-paper px-5 py-16 sm:px-8 sm:py-20 lg:px-14 lg:py-32">
        <div className="max-w-2xl">
          <Reveal>
            <h3 className="text-[1.75rem] font-medium leading-tight tracking-[-0.035em] text-navy sm:text-[2.25rem]">
              Request a visit
            </h3>
            <p className="mt-4 max-w-md text-[1.125rem] font-medium leading-relaxed text-navy/70">
              Fill this out and we will come back with an arrival window. Estimates are free, and
              you will know the price before anyone starts working.
            </p>
          </Reveal>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

function Row({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-1 lg:flex-row lg:items-baseline lg:gap-6">
      <dt className="shrink-0 text-[0.875rem] font-bold uppercase tracking-[0.16em] text-white/45 lg:w-24">
        {term}
      </dt>
      <dd className="flex min-h-11 items-center text-[1.0625rem] font-medium text-white/80 transition-colors sm:min-h-0">
        {children}
      </dd>
    </div>
  );
}
