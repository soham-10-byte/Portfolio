import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useMotionValue, animate } from 'framer-motion';
import { stats } from '@/data/content';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * Animated counter that counts up from 0 to `value` when in view.
 * @param {{ value: number, prefix: string, suffix: string, duration?: number }} props
 */
function AnimatedCounter({ value, prefix, suffix, duration = 1.8 }) {
  const prefersReduced = useReducedMotion();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const motionValue = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    if (prefersReduced) {
      setDisplay(value);
      return;
    }
    const controls = animate(motionValue, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return controls.stop;
  }, [isInView, prefersReduced, value, duration, motionValue]);

  return (
    <span ref={ref} aria-label={`${prefix}${value}${suffix}`}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

/**
 * StatsStrip — three animated stat counters (₹15L+, 15+, 12+) with detail copy.
 * Scroll-triggered number counter animation via Framer Motion.
 */
export default function StatsStrip() {
  const prefersReduced = useReducedMotion();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="stats"
      ref={ref}
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-y border-c600/30 bg-c900/60 relative overflow-hidden"
    >
      {/* Light beam accent */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 10% 50%, rgba(142,182,155,0.08) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <motion.div
        className="max-w-[1320px] mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-4 lg:gap-12"
        variants={prefersReduced ? {} : containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            variants={prefersReduced ? {} : itemVariants}
            className="relative flex flex-col sm:items-center text-left sm:text-center border-b sm:border-b-0 sm:border-r border-c600/25 pb-8 sm:pb-0 sm:px-6 last:border-0"
          >
            {/* Giant number */}
            <p
              className="text-5xl sm:text-6xl lg:text-7xl font-display font-black text-c100 leading-none mb-3"
              style={{ textShadow: '0 0 40px rgba(218,241,222,0.25)' }}
            >
              <AnimatedCounter
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                duration={2.0}
              />
            </p>

            {/* Label pill */}
            <p className="text-xs font-display font-bold uppercase tracking-tracked text-c400 mb-2">
              {stat.label}
            </p>

            {/* Detail copy */}
            <p className="text-sm text-c100/70 font-body leading-relaxed max-w-[220px] sm:max-w-none">
              {stat.detail}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
