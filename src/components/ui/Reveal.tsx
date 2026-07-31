'use client';

import { m } from 'framer-motion';
import type { ReactNode } from 'react';
import { riseIn, smooth, stagger, viewportOnce } from '@/lib/motion';

type Tag = 'div' | 'span' | 'p' | 'li' | 'ul' | 'section' | 'header' | 'figure';

const tags = {
  div: m.div,
  span: m.span,
  p: m.p,
  li: m.li,
  ul: m.ul,
  section: m.section,
  header: m.header,
  figure: m.figure,
} as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: Tag;
};

/** Single element rising into place the first time it enters the viewport. */
export function Reveal({ children, className, delay = 0, as = 'div' }: RevealProps) {
  const El = tags[as];
  return (
    <El
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={{
        hidden: { opacity: 0, y: 28 },
        show: { opacity: 1, y: 0, transition: { ...smooth, delay } },
      }}
    >
      {children}
    </El>
  );
}

/** Parent that staggers any <RevealItem> children. */
export function RevealGroup({
  children,
  className,
  amount = 0.07,
  delay = 0,
  as = 'div',
}: RevealProps & { amount?: number }) {
  const El = tags[as];
  return (
    <El
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={stagger(amount, delay)}
    >
      {children}
    </El>
  );
}

export function RevealItem({ children, className, as = 'div' }: RevealProps) {
  const El = tags[as];
  return (
    <El className={className} variants={riseIn}>
      {children}
    </El>
  );
}

/**
 * Line-by-line mask reveal. Each line gets its own clipping row, so the caller
 * passes an array of lines rather than one block of text.
 */
export function MaskLines({
  lines,
  className,
  lineClassName,
  delay = 0,
}: {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
}) {
  return (
    <m.span
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={stagger(0.09, delay)}
    >
      {lines.map((line, i) => (
        // The padding gives descenders room inside the clip; the matching
        // negative margin keeps the visual line spacing unchanged.
        <span key={i} className="-mb-[0.22em] block overflow-hidden pb-[0.22em]">
          <m.span
            className={lineClassName ?? 'block'}
            variants={{
              hidden: { y: '105%' },
              show: { y: '0%', transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
            }}
          >
            {line}
          </m.span>
        </span>
      ))}
    </m.span>
  );
}
