import { cx } from '@/lib/utils';

/**
 * The pipe primitives. One cylinder shading model, one coupling, used
 * everywhere a run of pipe appears so they all read as the same material.
 */

export function PipeRun({
  axis = 'v',
  className,
}: {
  axis?: 'v' | 'h';
  className?: string;
}) {
  return (
    <span aria-hidden className={cx('absolute', className)}>
      <span className={cx('absolute inset-0', axis === 'v' ? 'pipe-v' : 'pipe-h')} />
      {/* tight specular line just off the highlight band */}
      <span
        className={cx(
          'absolute bg-white/45',
          axis === 'v' ? 'inset-y-0 left-[38%] w-px' : 'inset-x-0 top-[38%] h-px',
        )}
      />
      <span
        className={cx(
          'absolute bg-black/45',
          axis === 'v' ? 'inset-y-0 right-0 w-px' : 'inset-x-0 bottom-0 h-px',
        )}
      />
    </span>
  );
}

/**
 * A union nut: knurled body, rolled lips top and bottom, sitting proud of the
 * run it clamps.
 */
export function Coupling({
  axis = 'v',
  className,
  size = 'md',
}: {
  axis?: 'v' | 'h';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}) {
  const dims =
    axis === 'v'
      ? { sm: 'h-4 w-[calc(100%+6px)] -left-[3px]', md: 'h-6 w-[calc(100%+8px)] -left-1', lg: 'h-8 w-[calc(100%+11px)] -left-[5.5px]' }[size]
      : { sm: 'w-4 h-[calc(100%+6px)] -top-[3px]', md: 'w-6 h-[calc(100%+8px)] -top-1', lg: 'w-8 h-[calc(100%+11px)] -top-[5.5px]' }[size];

  return (
    <span aria-hidden className={cx('pipe-lip absolute', dims, className)}>
      <span className={cx('absolute inset-0', axis === 'v' ? 'pipe-v' : 'pipe-h')} />
      <span
        className={cx(
          'absolute opacity-70',
          axis === 'v' ? 'inset-x-0 inset-y-[3px] pipe-knurl-v' : 'inset-y-0 inset-x-[3px] pipe-knurl-h',
        )}
      />
      <span
        className={cx(
          'absolute bg-white/55',
          axis === 'v' ? 'inset-y-0 left-[38%] w-px' : 'inset-x-0 top-[38%] h-px',
        )}
      />
    </span>
  );
}
