import { cx } from '@/lib/utils';

/**
 * CSS-only marquee (duplicated track, translateX to -50%). No JS, no observers.
 */
export function Ticker({
  items,
  className,
  tone = 'dark',
}: {
  items: string[];
  className?: string;
  tone?: 'dark' | 'light';
}) {
  const track = [...items, ...items];
  return (
    <div
      className={cx(
        'relative flex overflow-hidden edge-x',
        tone === 'dark' ? 'bg-ink text-white/70' : 'bg-mist text-navy/60',
        className,
      )}
    >
      <div className="animate-marquee flex shrink-0 items-center whitespace-nowrap py-3.5">
        {track.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="label px-7">{item}</span>
            <Droplet />
          </span>
        ))}
      </div>
    </div>
  );
}

function Droplet() {
  return (
    <svg aria-hidden viewBox="0 0 10 14" className="h-2.5 w-2.5 shrink-0 text-water" fill="currentColor">
      <path d="M5 0c2.4 3.2 5 6 5 8.8A5 5 0 0 1 0 8.8C0 6 2.6 3.2 5 0Z" />
    </svg>
  );
}
