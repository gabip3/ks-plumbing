import type { Transition, Variants } from 'framer-motion';

export const easeOutExpo = [0.16, 1, 0.3, 1] as const;
export const easeInOutQuart = [0.76, 0, 0.24, 1] as const;

export const smooth: Transition = { duration: 0.9, ease: easeOutExpo };
export const snappy: Transition = { duration: 0.45, ease: easeOutExpo };

/** Default viewport config — fires once, slightly before the element is centred. */
export const viewportOnce = { once: true, margin: '-12% 0px -12% 0px' } as const;

export const riseIn: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: smooth },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1.1, ease: easeOutExpo } },
};

export const maskUp: Variants = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: 1, ease: easeOutExpo } },
};

export const stagger = (amount = 0.07, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: amount, delayChildren: delay } },
});

/** Splits a string into words wrapped for a mask-reveal. */
export const toWords = (text: string) => text.split(' ');
