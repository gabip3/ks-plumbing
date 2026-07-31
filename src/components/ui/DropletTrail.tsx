'use client';

import { m, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

/**
 * A bead of water that follows the cursor, with a second, slower one trailing
 * behind it. Pointer devices only, and off entirely under reduced motion.
 *
 * Deliberately tiny and low contrast: it should register as a texture you
 * notice on the second visit, not as a cursor effect demanding attention.
 */
export function DropletTrail() {
  const [enabled, setEnabled] = useState(false);
  const seen = useRef(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const lead = { stiffness: 700, damping: 40, mass: 0.35 };
  const tail = { stiffness: 160, damping: 22, mass: 0.9 };
  const lx = useSpring(x, lead);
  const ly = useSpring(y, lead);
  const tx = useSpring(x, tail);
  const ty = useSpring(y, tail);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || calm) return;

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!seen.current) {
        seen.current = true;
        setEnabled(true);
      }
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-30 hidden lg:block">
      <m.span
        style={{ x: tx, y: ty }}
        className="absolute -ml-[7px] -mt-[7px] block h-3.5 w-3.5 rounded-full bg-water/12 blur-[3px]"
      />
      <m.span
        style={{ x: lx, y: ly }}
        className="absolute -ml-1 -mt-1 block h-2 w-2 rounded-full bg-water/35"
      />
    </div>
  );
}
