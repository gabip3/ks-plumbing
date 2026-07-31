import type { Metadata } from 'next';
import { Logo } from '@/components/brand/Logo';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-ink px-5 py-10 text-white sm:px-8 lg:px-14">
      <div aria-hidden className="grid-rule-dark absolute inset-0 opacity-60" />

      <div className="relative">
        <Logo tone="light" size="md" />
      </div>

      <div className="relative">
        <h1 className="display-lg max-w-[16ch]">
          That line does not <span className="serif-accent text-water">go anywhere.</span>
        </h1>
        <p className="mt-6 max-w-md text-[1.0625rem] font-medium leading-relaxed text-white/70">
          The page you were after has moved or never existed. Everything we do is on the main
          page, or call and we will just tell you.
        </p>
        <div className="mt-9 flex flex-col gap-4 sm:flex-row">
          <a
            href="/"
            className="inline-flex h-13 items-center justify-center bg-royal px-7 text-[1.0625rem] font-bold text-white transition-colors hover:bg-royal-deep"
          >
            Back to the site
          </a>
          <a
            href={site.phone.href}
            className="inline-flex h-13 items-center justify-center border border-white/30 px-7 font-mono text-[1.0625rem] font-semibold transition-colors hover:bg-white hover:text-navy"
          >
            {site.phone.display}
          </a>
        </div>
      </div>

      <p className="relative text-[1rem] font-semibold text-white/40">
        {site.name}. {site.address.city}, {site.address.regionName}.
      </p>
    </main>
  );
}
