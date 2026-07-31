'use client';

import { m, useMotionValue, useMotionValueEvent, useSpring, useTransform } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { asset } from '@/lib/paths';
import { cx } from '@/lib/utils';

type CompareSliderProps = {
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
  className?: string;
};

/**
 * Drag, click or arrow-key the handle to wipe between the two photographs.
 * The wipe is a clip-path on the top layer, so both images stay perfectly
 * registered and nothing reflows while you drag.
 */
export function CompareSlider({
  before,
  after,
  beforeAlt,
  afterAlt,
  className,
}: CompareSliderProps) {
  const frame = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [pct, setPct] = useState(50);

  const raw = useMotionValue(50);
  const value = useSpring(raw, { stiffness: 420, damping: 42, mass: 0.35 });
  const clip = useTransform(value, (v) => `inset(0 ${100 - v}% 0 0)`);
  const left = useTransform(value, (v) => `${v}%`);

  useMotionValueEvent(value, 'change', (v) => setPct(Math.round(v)));

  const setFromClientX = useCallback(
    (clientX: number) => {
      const rect = frame.current?.getBoundingClientRect();
      if (!rect) return;
      const next = ((clientX - rect.left) / rect.width) * 100;
      raw.set(Math.min(100, Math.max(0, next)));
    },
    [raw],
  );

  useEffect(() => {
    if (!dragging) return;
    const move = (e: PointerEvent) => setFromClientX(e.clientX);
    const up = () => setDragging(false);
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
  }, [dragging, setFromClientX]);

  const nudge = (delta: number) => raw.set(Math.min(100, Math.max(0, raw.get() + delta)));

  return (
    <div
      ref={frame}
      onPointerDown={(e) => {
        setDragging(true);
        setFromClientX(e.clientX);
      }}
      className={cx(
        'relative select-none overflow-hidden bg-ink',
        dragging ? 'cursor-grabbing' : 'cursor-grab',
        className,
      )}
    >
      {/* AFTER sits underneath and is revealed as the wipe moves left */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset(after)}
        alt={afterAlt}
        loading="lazy"
        decoding="async"
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <m.div style={{ clipPath: clip }} className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset(before)}
          alt={beforeAlt}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </m.div>

      <span className="pointer-events-none absolute left-4 top-4 bg-ink/85 px-3 py-1.5 text-[0.875rem] font-bold uppercase tracking-[0.14em] text-white sm:left-6 sm:top-6">
        Before
      </span>
      <span className="pointer-events-none absolute right-4 top-4 bg-royal px-3 py-1.5 text-[0.875rem] font-bold uppercase tracking-[0.14em] text-white sm:right-6 sm:top-6">
        After
      </span>

      {/* The handle is a length of pipe with a union nut you grab. */}
      <m.div style={{ left }} className="absolute inset-y-0 z-10 w-[11px] -translate-x-1/2">
        <span className="pipe-v absolute inset-0" />
        <span className="absolute inset-y-0 left-[38%] w-px bg-white/50" />
        <span className="absolute inset-y-0 right-0 w-px bg-black/50" />

        <button
          type="button"
          role="slider"
          aria-label="Drag to compare before and after"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={pct}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') nudge(-6);
            if (e.key === 'ArrowRight') nudge(6);
          }}
          className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
        >
          <span className="pipe-lip relative flex h-14 w-14 items-center justify-center rounded-full">
            <span className="pipe-v absolute inset-0 rounded-full" />
            <span className="pipe-knurl-v absolute inset-[5px] rounded-full opacity-60" />
            <span className="absolute inset-[13px] rounded-full bg-ink/85" />
            <span className="relative flex items-center gap-1.5 text-white">
              <svg viewBox="0 0 8 12" className="h-3 w-2" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M6 1 1.5 6 6 11" strokeLinecap="square" />
              </svg>
              <svg viewBox="0 0 8 12" className="h-3 w-2" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M2 1 6.5 6 2 11" strokeLinecap="square" />
              </svg>
            </span>
          </span>
        </button>
      </m.div>
    </div>
  );
}
