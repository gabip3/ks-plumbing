'use client';

import { Logo } from '@/components/brand/Logo';
import { PhonePulse } from '@/components/ui/Action';
import { Reveal } from '@/components/ui/Reveal';
import { areas, services } from '@/lib/content';
import { navigation, site } from '@/lib/site';

const year = new Date().getFullYear();

export function Footer() {
  return (
    // Extra bottom padding on phones so the fixed call bar never covers the
    // legal line.
    <footer className="relative overflow-hidden bg-ink pb-20 pt-20 text-white sm:pt-24 lg:pb-0">
      <div aria-hidden className="grid-rule-dark absolute inset-0 opacity-50" />

      <div className="relative mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-14">
        <div className="grid gap-12 border-b border-white/10 pb-16 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <Reveal className="text-center sm:col-span-2 lg:col-span-4 lg:text-left">
            <Logo tone="light" size="xl" className="mx-auto lg:mx-0" />

            <p className="serif-accent mx-auto mt-8 max-w-[14ch] text-[2rem] leading-[1.1] sm:text-[2.5rem] lg:mx-0">
              {site.motto}
            </p>

            <span className="mt-8 flex items-center justify-center gap-3 lg:justify-start">
              <PhonePulse />
              <span className="text-[0.9375rem] font-bold uppercase tracking-[0.14em] text-live">
                Free estimate
              </span>
            </span>

            <a
              href={site.phone.href}
              className="mt-2 inline-flex min-h-12 items-center font-mono text-[1.5rem] font-medium tracking-[-0.01em] underline-offset-[6px] transition-colors hover:text-water hover:underline"
            >
              {site.phone.display}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="flex min-h-11 items-center justify-center break-all text-[1.0625rem] font-medium text-white/55 underline-offset-4 hover:text-white hover:underline lg:min-h-0 lg:justify-start"
            >
              {site.email}
            </a>
          </Reveal>

          <Column title="Services" className="lg:col-span-3">
            {services.map((s) => (
              <li key={s.id}>
                <a href="#services" className="footer-link">
                  {s.title}
                </a>
              </li>
            ))}
          </Column>

          <Column title="Service areas" className="lg:col-span-3">
            {areas.map((a) => (
              <li key={a.name}>
                <a href="#areas" className="footer-link">
                  {a.name}
                  {a.name !== 'Treasure Valley' && ', ID'}
                </a>
              </li>
            ))}
          </Column>

          <Column title="Site" className="lg:col-span-2">
            {navigation.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="footer-link">
                  {n.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#before-after" className="footer-link">
                Before &amp; after
              </a>
            </li>
            <li>
              <a href="#faq" className="footer-link">
                FAQ
              </a>
            </li>
          </Column>
        </div>

        <div className="flex flex-col gap-6 py-9 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[1rem] font-medium text-white/40">
            © {year} {site.legalName}. Licensed and insured in Idaho.
          </p>
          <a
            href="#top"
            className="group flex min-h-11 items-center gap-3 text-[1rem] font-semibold text-white/55 hover:text-white sm:min-h-0"
          >
            Back to top
            <svg
              viewBox="0 0 12 20"
              className="h-4 w-2.5 transition-transform duration-500 group-hover:-translate-y-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M6 18V2M2 7l4-5 4 5" strokeLinecap="square" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}

function Column({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Reveal className={className} delay={0.05}>
      <h2 className="text-[0.875rem] font-bold uppercase tracking-[0.16em] text-white/45">{title}</h2>
      {/* Wrapped inline on a phone, where eighteen stacked rows is most of a
          screen on its own. Back to a proper column from sm up. */}
      <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-0 sm:mt-5 sm:block sm:space-y-2.5">
        {children}
      </ul>
    </Reveal>
  );
}
