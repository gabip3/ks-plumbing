'use client';

import { m } from 'framer-motion';
import type { ReactNode } from 'react';
import { cx } from '@/lib/utils';

type ActionProps = {
  href: string;
  children: ReactNode;
  variant?: 'solid' | 'outline' | 'ghost' | 'light';
  className?: string;
  icon?: ReactNode;
  onClick?: () => void;
};

const variants = {
  solid: 'bg-royal text-white hover:bg-royal-deep',
  outline: 'border border-navy/25 text-navy hover:border-navy hover:bg-navy hover:text-white',
  light: 'border border-white/25 text-white hover:bg-white hover:text-navy',
  ghost: 'text-navy hover:text-royal',
} as const;

/**
 * The site's only button. The label runs on a two-row track so it rolls over
 * on hover rather than fading. The track is 1.5em tall so descenders never
 * touch the clip.
 */
export function Action({ href, children, variant = 'solid', className, icon, onClick }: ActionProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cx(
        'group relative inline-flex h-14 items-center gap-3 overflow-hidden px-7 text-[1rem] font-semibold tracking-[0.01em] transition-colors duration-500 sm:h-15 sm:px-8',
        variants[variant],
        className,
      )}
    >
      <span className="relative block h-[1.5em] overflow-hidden">
        <span className="block leading-[1.5] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
          {children}
        </span>
        <span
          aria-hidden
          className="absolute left-0 top-full block leading-[1.5] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full"
        >
          {children}
        </span>
      </span>
      {icon ?? <Arrow />}
      {variant === 'solid' && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-20deg] bg-white/18 opacity-0 transition-opacity duration-300 group-hover:animate-[ks-sheen_0.9s_ease-out] group-hover:opacity-100"
        />
      )}
    </a>
  );
}

export function Arrow({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      className={cx('h-3.5 w-3.5 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1', className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M2 8h11M9 4l4 4-4 4" strokeLinecap="square" />
    </svg>
  );
}

/**
 * The "someone is actually there" light. Green, slow, always on, next to every
 * phone number on the site.
 */
export function PhonePulse({ className }: { className?: string }) {
  return (
    <span className={cx('relative flex h-2.5 w-2.5 shrink-0', className)}>
      <m.span
        className="absolute inline-flex h-full w-full rounded-full bg-live"
        animate={{ scale: [1, 2.6, 1], opacity: [0.7, 0, 0.7] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
      />
      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-live shadow-[0_0_10px_rgba(33,184,102,0.7)]" />
    </span>
  );
}
