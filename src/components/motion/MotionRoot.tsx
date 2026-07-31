'use client';

import { LazyMotion, domAnimation } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * Loads only the DOM animation + gesture feature set, which keeps the
 * animation runtime well under half the size of the full bundle.
 * Every animated component in the app uses the `m` primitives.
 */
export default function MotionRoot({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
