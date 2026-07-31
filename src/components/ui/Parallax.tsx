'use client';

import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  /** Vertical travel in pixels across the element's full scroll pass. */
  distance?: number;
  /** Optional scale drift, useful for full-bleed image plates. */
  zoom?: number;
  offset?: [string, string];
};

/**
 * Transform-only parallax: no layout is read during scroll, so it stays on the
 * compositor. Disabled entirely when the visitor prefers reduced motion.
 */
export function Parallax({
  children,
  className,
  distance = 80,
  zoom = 0,
  offset = ['start end', 'end start'],
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as never,
  });

  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  const scale = useTransform(scrollYProgress, [0, 1], [1 + zoom, 1]);

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={className}>
      <m.div style={zoom ? { y, scale } : { y }} className="h-full w-full will-change-transform">
        {children}
      </m.div>
    </div>
  );
}
