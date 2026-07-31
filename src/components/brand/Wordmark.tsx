import { cx } from '@/lib/utils';

/**
 * Type-set lockup of the KS mark: navy "K", royal "S", the droplet from the
 * logo, and the pipe rule that runs under it. Renders crisp at any size and
 * costs nothing to load.
 */
export function Wordmark({
  className,
  tone = 'dark',
  size = 'sm',
}: {
  className?: string;
  tone?: 'dark' | 'light';
  size?: 'sm' | 'lg';
}) {
  const light = tone === 'light';
  return (
    <span className={cx('inline-flex select-none flex-col leading-none', className)}>
      <span className="flex items-baseline gap-[0.06em]">
        <span
          className={cx(
            'font-semibold tracking-[-0.06em]',
            light ? 'text-white' : 'text-navy',
            size === 'lg' ? 'text-[3.5rem] sm:text-[5rem]' : 'text-[1.375rem]',
          )}
        >
          K
        </span>
        <span
          className={cx(
            'font-semibold tracking-[-0.06em] text-royal',
            size === 'lg' ? 'text-[3.5rem] sm:text-[5rem]' : 'text-[1.375rem]',
          )}
        >
          S
        </span>
        <svg
          aria-hidden
          viewBox="0 0 10 14"
          className={cx(
            'ml-[0.15em] shrink-0 self-start text-water',
            size === 'lg' ? 'h-4 w-4 sm:h-5 sm:w-5' : 'h-1.5 w-1.5',
          )}
          fill="currentColor"
        >
          <path d="M5 0c2.4 3.2 5 6 5 8.8A5 5 0 0 1 0 8.8C0 6 2.6 3.2 5 0Z" />
        </svg>
      </span>
      <span
        className={cx(
          'font-mono uppercase',
          light ? 'text-white/55' : 'text-navy/55',
          size === 'lg'
            ? 'mt-3 text-[0.875rem] tracking-[0.62em]'
            : 'mt-1 text-[0.5rem] tracking-[0.42em]',
        )}
      >
        Plumbing
      </span>
    </span>
  );
}
