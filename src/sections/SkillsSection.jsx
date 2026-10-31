import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FileText, Award, ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import PillTag from '@/components/ui/PillTag';
import Button from '@/components/ui/Button';
import { skills, expertiseMarquee, contact, cta } from '@/data/content';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

// ─── Smooth Lightweight Card Helper ──────────────────────────────────────────
function SkillCard({ children, className = '' }) {
  return (
    <div
      className={cn(
        'relative overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:shadow-mint-glow',
        className
      )}
    >
      {children}
    </div>
  );
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

/**
 * SkillsSection
 * 7 glass cards with pill chips + 3D tilt:
 * 1. Languages, 2. Backend, 3. Frontend, 4. Databases, 5. AI Engineering, 6. Tools, 7. Marketing
 * Plus official certification chip, and "DOWNLOAD RESUME" CTA.
 */
export default function SkillsSection() {
  const prefersReduced = useReducedMotion();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // 7 skills groups exactly as defined in content.js
  const skillGroupKeys = [
    'languages',
    'backend',
    'frontend',
    'databases',
    'aiEngineering',
    'tools',
    'marketing',
  ];

  const cert = skills.certification;

  return (
    <section
      id="skills"
      ref={ref}
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-[1320px] mx-auto border-t border-c600/20"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <div className="mb-4">
            <PillTag active>TECH STACK &amp; CAPABILITIES</PillTag>
          </div>
          <h2
            className="font-display font-black text-c100 uppercase tracking-tightest leading-tight"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            CORE SKILLS &amp;{' '}
            <span className="text-c400 text-glow">CAPABILITIES</span>
          </h2>
        </div>

        {/* Top CTA: Download Resume */}
        <a
          href={contact.resumeUrl}
          download
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-pill bg-c100 text-c900 font-body font-bold text-xs uppercase tracking-tracked hover:shadow-mint-glow hover:brightness-105 active:scale-[0.98] transition-all min-h-[44px] self-start md:self-end"
        >
          <FileText size={15} />
          <span>{cta.resume}</span>
          <ArrowRight size={14} />
        </a>
      </div>

      {/* 7 Glass Cards Grid with 3D Tilt */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-8"
        variants={prefersReduced ? {} : containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {skillGroupKeys.map((key) => {
          const group = skills[key];
          if (!group) return null;

          return (
            <motion.div key={key} variants={prefersReduced ? {} : cardVariants}>
              <SkillCard className="p-6 rounded-[24px] glass-card border border-c600/40 hover:border-c400/60 hover:shadow-mint-glow transition-all duration-300 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xs font-display font-bold uppercase tracking-tracked text-c400 group-hover:text-c100 transition-colors">
                      {group.title}
                    </h3>
                    <span className="w-1.5 h-1.5 rounded-full bg-c400/50 group-hover:bg-c100 group-hover:shadow-[0_0_8px_rgba(218,241,222,0.8)] transition-all" />
                  </div>

                  {/* Skill Pill Chips */}
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1 rounded-pill bg-c800/90 border border-c600/50 text-c100/90 text-xs font-body hover:border-c400/60 hover:text-c100 hover:bg-c700/60 transition-colors cursor-default"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </SkillCard>
            </motion.div>
          );
        })}

        {/* Certification Card — Spans visually as the 8th card */}
        <motion.div variants={prefersReduced ? {} : cardVariants}>
          <SkillCard className="p-6 rounded-[24px] border border-c400/50 bg-gradient-to-br from-c700/60 via-c800/80 to-c900 glass-card h-full flex flex-col justify-between shadow-mint-glow-sm">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Award size={16} className="text-c100" />
                <span className="px-2.5 py-0.5 rounded-pill bg-c100 text-c900 text-[10px] font-bold uppercase tracking-wider inline-block">
                  CERTIFIED
                </span>
              </div>
              <h3 className="text-sm font-display font-bold uppercase text-c100 mb-2 tracking-wider leading-snug">
                {cert.name}
              </h3>
              <p className="text-xs text-c400 font-body">
                Issued by {cert.issuer}
              </p>
            </div>

            <div className="pt-4 border-t border-c600/30 mt-4 flex items-center justify-between">
              <span className="text-[10px] font-mono text-c100/60 uppercase">AGENTIC AI</span>
              <a
                href={contact.resumeUrl}
                download
                className="text-xs text-c400 font-body font-semibold hover:text-c100 uppercase tracking-tracked inline-flex items-center gap-1 transition-colors"
              >
                <span>VERIFY</span>
                <span>→</span>
              </a>
            </div>
          </SkillCard>
        </motion.div>
      </motion.div>

      {/* Marquee Strip */}
      <div className="overflow-hidden py-4 border-y border-c600/20 mt-12" aria-hidden="true">
        <div className="flex gap-4 animate-marquee whitespace-nowrap">
          {[...expertiseMarquee, ...expertiseMarquee].map((pill, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-pill bg-c800/70 border border-c600/40 text-xs font-display font-bold uppercase tracking-wider text-c400 select-none hover:text-c100 transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-c400/70 flex-shrink-0" />
              {pill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
