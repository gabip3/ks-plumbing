import { Coupling, PipeRun } from '@/components/ui/Pipe';
import { cx } from '@/lib/utils';

/**
 * A short run of pipe sitting on the seam between two sections.
 *
 * This is how the motif reads on a phone. A fixed rail down the left edge
 * crowds a narrow column and ends up cutting across the copy, so on small
 * screens the pipe becomes a divider instead: you meet it between sections
 * rather than having it follow you.
 */
export function PipeDivider({
  tone = 'light',
  className,
}: {
  tone?: 'light' | 'dark';
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={cx('relative flex h-6 w-full items-center lg:hidden', className)}
    >
      <span
        className={cx(
          'absolute inset-x-0 top-1/2 h-px -translate-y-1/2',
          tone === 'light' ? 'bg-navy/10' : 'bg-white/10',
        )}
      />
      <div className="relative mx-auto h-[9px] w-40">
        <PipeRun axis="h" className="inset-0" />
        <Coupling axis="h" size="sm" className="left-[22%]" />
        <Coupling axis="h" size="sm" className="right-[22%]" />
      </div>
    </div>
  );
}
