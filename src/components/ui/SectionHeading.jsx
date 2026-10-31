import React from 'react';
import { motion } from 'framer-motion';
import PillTag from './PillTag';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * SectionHeading component: PillTag + H2 with line-mask reveal animation.
 */
export default function SectionHeading({
  tag,
  title,
  highlight,
  description,
  align = 'left', // 'left' | 'center'
  className = '',
}) {
  const reducedMotion = useReducedMotion();

  const alignmentClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
  };

  return (
    <div className={`flex flex-col mb-12 md:mb-16 ${alignmentClasses[align]} ${className}`}>
      {tag && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-4"
        >
          <PillTag active>{tag}</PillTag>
        </motion.div>
      )}

      {/* Overflow-hidden container for line-mask reveal */}
      <div className="overflow-hidden">
        <motion.h2
          initial={reducedMotion ? { opacity: 0 } : { y: '100%' }}
          whileInView={reducedMotion ? { opacity: 1 } : { y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-h2 font-display font-black text-c100 uppercase tracking-tightest leading-tighter"
        >
          {title}{' '}
          {highlight && (
            <span className="text-c400 text-glow block sm:inline">{highlight}</span>
          )}
        </motion.h2>
      </div>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className={`mt-4 text-base md:text-lg text-c400/80 max-w-2xl font-body leading-relaxed ${
            align === 'center' ? 'mx-auto' : ''
          }`}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}

