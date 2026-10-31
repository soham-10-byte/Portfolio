import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Briefcase, MapPin, GraduationCap, CheckCircle2, ArrowRight } from 'lucide-react';
import PillTag from '@/components/ui/PillTag';
import Button from '@/components/ui/Button';
import { profile, experience, contact, cta, heroData } from '@/data/content';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

/**
 * AboutSection (id="about")
 * 1. PillTag "ABOUT ME"
 * 2. H2 "DEVELOPER BY SKILL. MARKETER BY INSTINCT."
 * 3. Short bio from agent.md summary
 * 4. Skydreamix intern experience card (Aug 2025 – Feb 2026)
 * 5. Portrait as a smaller circle cutout
 */
export default function AboutSection() {
  const prefersReduced = useReducedMotion();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [imgSource, setImgSource] = useState(heroData.imageSrc || '/images/soham-hero.png');

  const exp = experience[0];

  const handleImageError = () => {
    setImgSource('/images/hero-placeholder.svg');
  };

  return (
    <section
      id="about"
      ref={ref}
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-[1320px] mx-auto border-t border-c600/20 relative"
    >
      {/* Section Header */}
      <div className="max-w-4xl mb-16 flex flex-col items-center md:items-start text-center md:text-left mx-auto md:mx-0">
        <div className="mb-4">
          <PillTag active>ABOUT ME</PillTag>
        </div>
        <h2
          className="font-display font-black text-c100 uppercase tracking-tightest leading-[0.95] mb-6"
          style={{ fontSize: 'clamp(2rem, 5.5vw, 3.8rem)' }}
        >
          DEVELOPER BY SKILL.
          <br />
          <span className="text-c400 text-glow">MARKETER BY INSTINCT.</span>
        </h2>
        <p className="text-base sm:text-lg text-c100/90 font-body leading-relaxed max-w-2xl mx-auto md:mx-0">
          Building full-stack web applications and scaling them with high-intent organic search and performance ads — engineered end to end by one builder.
        </p>
      </div>

      <motion.div
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
        variants={prefersReduced ? {} : containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {/* Left Column: Portrait Cutout Circle + Key Highlights (4 cols) */}
        <motion.div
          variants={prefersReduced ? {} : itemVariants}
          className="lg:col-span-4 flex flex-col items-center sm:items-start gap-6"
        >
          {/* Smaller Portrait Circle Cutout */}
          <div className="relative w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] mx-auto lg:mx-0 flex items-end justify-center">
            {/* Mint Circle Background with Radial Gradient & Soft Glow */}
            <div
              className="absolute inset-0 rounded-full bg-mint-circle circle-mint-glow z-0"
              style={{
                boxShadow: '0 0 60px rgba(142, 182, 155, 0.25)',
              }}
              aria-hidden="true"
            >
              {/* Thin Outer Dashed Ring */}
              <div
                className={cn(
                  'absolute -inset-3 rounded-full border border-c400/30 pointer-events-none',
                  !prefersReduced && 'animate-slow-spin'
                )}
                style={{
                  borderStyle: 'dashed',
                  borderWidth: '1px',
                }}
              />
            </div>

            {/* Cutout Portrait (head breaks out slightly, shoulders touch bottom edge) */}
            <div className="relative z-10 w-[220px] sm:w-[260px] h-full flex items-end justify-center pointer-events-none">
              <img
                src={imgSource}
                alt={profile.name}
                onError={handleImageError}
                className="w-full h-full object-contain object-bottom portrait-duotone select-none"
              />
            </div>

            {/* Floating Role Pill Badge */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-20 px-3.5 py-1 rounded-pill glass-card border border-c400/40 text-c100 shadow-mint-glow-sm whitespace-nowrap">
              <span className="text-[10px] font-display font-bold uppercase tracking-wider text-c100">
                MERN + GROWTH
              </span>
            </div>
          </div>

          {/* Quick Stats Pills */}
          <div className="w-full flex flex-wrap gap-2.5 pt-4 justify-center sm:justify-start">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-pill bg-c800/80 border border-c600 text-c400 text-xs font-body uppercase tracking-wider">
              <MapPin size={12} />
              {profile.location}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-pill bg-c800/80 border border-c600 text-c100 text-xs font-body uppercase tracking-wider">
              <GraduationCap size={12} />
              B.Tech — Computer Science
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-pill bg-c100/10 border border-c400/50 text-c100 text-xs font-body uppercase tracking-wider font-semibold">
              Oracle Certified – Agentic AI
            </span>
          </div>
        </motion.div>

        {/* Right Column: Narrative Summary & Experience Card (8 cols) */}
        <motion.div
          variants={prefersReduced ? {} : itemVariants}
          className="lg:col-span-8 flex flex-col gap-6"
        >
          {/* Bio Narrative Card */}
          <div className="p-8 sm:p-10 rounded-[28px] glass-card border border-c600/40">
            <p className="text-base sm:text-lg text-c100/90 leading-relaxed font-body mb-6">
              {profile.summary}
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-c600/30">
              <Button
                href={contact.resumeUrl}
                download
                variant="primary"
                size="md"
              >
                {cta.resume}
              </Button>
              <Button
                href="/#contact"
                variant="outline"
                size="md"
              >
                LET&apos;S TALK
              </Button>
            </div>
          </div>

          {/* Skydreamix Tech Solutions Intern Experience Card */}
          <div className="p-8 sm:p-10 rounded-[28px] glass-card border border-c400/40 relative overflow-hidden bg-gradient-to-br from-c800/90 to-c900">
            {/* Ambient Corner Glow */}
            <div
              className="absolute top-0 right-0 w-44 h-44 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(142,182,155,0.14) 0%, transparent 70%)',
              }}
              aria-hidden="true"
            />

            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-c700 border border-c400/40 flex items-center justify-center flex-shrink-0">
                  <Briefcase size={16} className="text-c400" />
                </div>
                <div>
                  <span className="text-[10px] font-display font-bold uppercase tracking-tracked text-c400 block">
                    PROFESSIONAL EXPERIENCE
                  </span>
                  <h3 className="text-xl font-display font-black text-c100 uppercase tracking-tight">
                    {exp.role}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-pill bg-c800 border border-c600/60 text-xs font-body text-c100 font-medium">
                  {exp.period}
                </span>
                <span className="px-2.5 py-1 rounded-pill bg-c700/60 border border-c600/40 text-[11px] font-body text-c400 uppercase">
                  {exp.type}
                </span>
              </div>
            </div>

            <p className="text-sm font-body text-c400 font-semibold mb-6">
              {exp.company}
            </p>

            {/* Highlights List */}
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4 border-t border-c600/30">
              {exp.highlights.map((hl, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2
                    size={15}
                    className="text-c100 flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span className="text-xs sm:text-sm text-c100/85 font-body leading-relaxed">
                    {hl}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
