import { PhonePulse } from '@/components/ui/Action';
import { site } from '@/lib/site';

/**
 * Fixed call and text bar, phones only.
 *
 * Always on. It sits under the mobile menu sheet (z-40 against the sheet's
 * z-45), which already carries its own pair of buttons, and the footer leaves
 * room for it so nothing is ever covered.
 *
 * No scroll listener and no animation on purpose: this is the single most
 * important control on a plumbing site, and it should never depend on a
 * script having run.
 */
export function CallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/12 bg-ink/97 pb-[env(safe-area-inset-bottom)] lg:hidden">
      <div className="flex items-center justify-center gap-2 px-3 py-2.5">
        <span className="flex shrink-0 items-center gap-2 pr-1">
          <PhonePulse />
          <span className="text-[0.75rem] font-bold uppercase leading-[1.2] tracking-[0.1em] text-live">
            Free
            <br />
            estimate
          </span>
        </span>

        <a
          href={site.phone.href}
          className="inline-flex h-12 flex-1 items-center justify-center gap-2 bg-royal text-[1rem] font-bold text-white transition-colors active:bg-royal-deep"
        >
          <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7">
            <path
              d="M5.2 2.5 6.8 5.6 5.4 7.1a8 8 0 0 0 3.5 3.5l1.5-1.4 3.1 1.6-.4 2.4c-.1.6-.6 1-1.2 1A11.5 11.5 0 0 1 1.8 3c0-.6.4-1.1 1-1.2z"
              strokeLinejoin="round"
            />
          </svg>
          Call now
        </a>

        <a
          href={site.phone.sms}
          className="inline-flex h-12 flex-1 items-center justify-center gap-2 border border-white/30 text-[1rem] font-bold text-white transition-colors active:bg-white active:text-navy"
        >
          <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7">
            <path d="M2 3h12v9H6.5L3 14.5V12H2z" strokeLinejoin="round" />
          </svg>
          Text now
        </a>
      </div>
    </div>
  );
}
