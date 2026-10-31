import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import PillTag from '@/components/ui/PillTag';
import { devProjects, skills, cta, contact } from '@/data/content';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

// Dev skill marquee items derived from content store
const DEV_SKILLS = [
  ...skills.languages.items,
  ...skills.backend.items,
  ...skills.frontend.items,
  ...skills.databases.items,
  ...skills.aiEngineering.items.slice(0, 3),
  ...skills.tools.items.slice(0, 5),
];

// ─── Smooth Card Helper ───────────────────────────────────────────────────────
function TiltCard({ children, className = '' }) {
  return (
    <div
      className={cn(
        'transition-all duration-300 hover:-translate-y-1.5 hover:shadow-mint-glow',
        className
      )}
    >
      {children}
    </div>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────
function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const reducedMotion = useReducedMotion();
  const isEven = index % 2 === 0;
  const num = String(index + 1).padStart(2, '0');
  const hasLiveUrl = project.liveUrl && !project.liveUrl.includes('[PLACEHOLDER');
  const cleanDomain = hasLiveUrl
    ? project.liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')
    : `${project.slug}.app`;

  const cardVariants = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] } },
  };

  // Stack pills — only first 5 from flat list
  const stackDisplay = (project.stackFlat || []).slice(0, 5);

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={cn(
        'group grid grid-cols-1 lg:grid-cols-2 gap-8 items-center py-16 border-b border-c600/30',
        index === 0 && 'pt-0',
      )}
    >
      {/* Image column — swaps side on even/odd */}
      <div className={cn('order-1', !isEven && 'lg:order-2')}>
        <TiltCard className="relative rounded-[22px] overflow-hidden border border-c600/40 bg-c900/90 group-hover:border-c400/60 group-hover:shadow-mint-glow transition-all duration-500 shadow-2xl">
          {/* Browser Chrome Header */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-c800/90 border-b border-c600/30 select-none">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/80" />
            </div>
            {hasLiveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] text-c400 hover:text-c100 font-mono tracking-wider truncate max-w-[240px] px-3 py-0.5 rounded-full bg-c900/70 border border-c600/30 hover:border-c400/60 transition-all flex items-center gap-1.5"
                title={`Visit ${project.title} live`}
              >
                <span>{cleanDomain}</span>
                <ExternalLink size={10} />
              </a>
            ) : (
              <div className="text-[10px] text-c400 font-mono tracking-wider truncate max-w-[200px] px-3 py-0.5 rounded-full bg-c900/70 border border-c600/30">
                {cleanDomain}
              </div>
            )}
            <div className="w-6" />
          </div>

          {/* Full Screenshot Container — Full uncropped screenshot */}
          <div className="relative w-full aspect-[16/10] bg-[#0c1f1d] flex items-center justify-center overflow-hidden p-1.5 sm:p-2.5">
            {hasLiveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-full flex items-center justify-center"
                title={`Open live site for ${project.title}`}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-contain rounded-sm transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </a>
            ) : (
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                className="w-full h-full object-contain rounded-sm transition-transform duration-500 group-hover:scale-[1.02]"
              />
            )}
          </div>

          {/* Placeholder badge only if image is an SVG placeholder */}
          {project.image.endsWith('.svg') && (
            <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-pill bg-c900/90 border border-c600/50 text-[9px] text-c400 font-body uppercase tracking-wider select-none">
              [PLACEHOLDER: add screenshot]
            </div>
          )}
        </TiltCard>
      </div>

      {/* Text column */}
      <div className={cn('order-2 flex flex-col gap-5', !isEven && 'lg:order-1')}>
        {/* Number + year row */}
        <div className="flex items-center gap-4">
          <span
            className="font-display font-black text-5xl leading-none select-none"
            style={{ WebkitTextStroke: '1px #235347', color: 'transparent' }}
          >
            {num}
          </span>
          <div className="h-px flex-1 bg-c600/40" />
          <span className="text-xs font-body text-c400 uppercase tracking-tracked">{project.year}</span>
        </div>

        {/* Category pill */}
        <PillTag>{project.category}</PillTag>

        {/* Title */}
        <h2 className="font-display font-black text-c100 uppercase tracking-tightest group-hover:text-glow transition-all"
          style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', lineHeight: '1.05' }}
        >
          {project.title}
        </h2>

        {/* 2-line summary */}
        <p className="text-sm sm:text-base text-c100/85 font-body leading-relaxed line-clamp-3">
          {project.summary}
        </p>

        {/* Stack pills */}
        <div className="flex flex-wrap gap-2">
          {stackDisplay.map((tech) => (
            <span key={tech} className="px-3 py-1 rounded-pill bg-c800/80 border border-c600/50 text-[11px] font-body text-c400 uppercase font-semibold tracking-wider">
              {tech}
            </span>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <Link
            to={`/development/${project.slug}`}
            className="group/btn inline-flex items-center gap-2 px-6 py-3 rounded-pill bg-c100 text-c900 font-body font-bold text-xs uppercase tracking-tracked hover:shadow-mint-glow hover:brightness-105 active:scale-[0.98] transition-all min-h-[44px]"
          >
            <span>VIEW CASE STUDY</span>
            <ArrowRight size={15} className="transition-transform group-hover/btn:translate-x-1" />
          </Link>

          {hasLiveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-pill border border-c400/50 hover:border-c100 bg-c800/80 hover:bg-c700 text-c100 font-body font-bold text-xs uppercase tracking-tracked hover:shadow-mint-glow-sm transition-all min-h-[44px]"
            >
              <span>LIVE SITE</span>
              <ExternalLink size={13} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Marquee Strip ────────────────────────────────────────────────────────────
function SkillsMarquee() {
  const reducedMotion = useReducedMotion();
  const pills = [...DEV_SKILLS, ...DEV_SKILLS]; // doubled for seamless loop

  return (
    <div className="overflow-hidden py-6 border-y border-c600/30 my-16">
      <div className={cn('flex gap-3 w-max', !reducedMotion && 'animate-marquee')}>
        {pills.map((skill, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-pill bg-c800/70 border border-c600/40 text-xs font-display font-bold uppercase tracking-wider text-c400 select-none whitespace-nowrap"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-c100" aria-hidden="true" />
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Development() {
  return (
    <>
      {/* Document title set in index.html; update via effect */}
      <TitleMeta
        title="Development | Soham Sen – MERN Stack Developer"
        description="Explore Soham Sen's MERN stack projects: Rasoi, The Calcutta Heritage, and the Online Trial Booking System. JWT auth, REST APIs, MongoDB, React."
      />

      <div className="relative w-full pt-28 pb-24 overflow-x-hidden">
        {/* Top-left spotlight beam */}
        <div className="absolute top-0 left-0 w-full h-[600px] light-beam pointer-events-none z-0" aria-hidden="true" />

        <div className="relative z-10 max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* ── Hero Strip ─────────────────────────────────────── */}
          <div className="mb-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-pill border border-c600/50 bg-c800/80 text-c400 text-xs font-body font-semibold uppercase tracking-tracked hover:text-c100 hover:border-c400 transition-all min-h-[44px]"
            >
              ← BACK HOME
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-4">
              <PillTag active>THE BUILD SIDE</PillTag>
            </div>

            {/* Giant two-line display headline */}
            <h1
              className="font-display font-black text-c100 uppercase tracking-tightest leading-[0.92] mb-6"
              style={{ fontSize: 'clamp(2.25rem, 9vw, 6rem)' }}
            >
              CODE THAT SHIPS.
              <br />
              <span className="text-c400 text-glow">BUILT ON MERN.</span>
            </h1>

            <p className="text-base sm:text-lg text-c100/85 font-body leading-relaxed max-w-2xl mb-8">
              Production full-stack applications engineered with React, Node.js, Express, and MongoDB.
              JWT authentication, role-based access control, optimized database queries, and clean REST API design.
            </p>

            {/* Core stack pills */}
            <div className="flex flex-wrap gap-3">
              {['MongoDB', 'Express.js', 'React.js', 'Node.js'].map((tech) => (
                <span
                  key={tech}
                  className="px-5 py-2.5 rounded-pill border border-c400/50 bg-c800/80 text-c100 text-xs font-display font-bold uppercase tracking-wider"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* ── Skills Marquee ──────────────────────────────────── */}
          <SkillsMarquee />

          {/* ── Project List ────────────────────────────────────── */}
          <div>
            {devProjects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>

          {/* ── Closing CTA Band ─────────────────────────────────── */}
          <div className="mt-20 p-8 sm:p-12 rounded-[32px] glass-card border border-c600/40 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs font-body uppercase tracking-tracked text-c400 block mb-1">
                READY TO BUILD YOUR PRODUCT?
              </span>
              <h3
                className="font-display font-black text-c100 uppercase tracking-tight"
                style={{ fontSize: 'clamp(1.25rem, 3vw, 2rem)' }}
              >
                HAVE A PRODUCT IN MIND?
              </h3>
            </div>
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <Link
                to="/#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-pill bg-c100 text-c900 font-body font-bold text-xs uppercase tracking-tracked hover:shadow-mint-glow hover:brightness-105 active:scale-[0.98] transition-all min-h-[44px]"
              >
                <span>HIRE ME AS A DEVELOPER</span>
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href={contact.github === '[PLACEHOLDER URL]' ? '#contact' : contact.github}
                target={contact.github === '[PLACEHOLDER URL]' ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-pill border border-c400 text-c100 font-body font-semibold text-xs uppercase tracking-tracked hover:bg-c600/30 hover:border-c100 active:scale-[0.98] transition-all min-h-[44px]"
              >
                <Github size={15} />
                <span>GITHUB</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Tiny head-title helper ────────────────────────────────────────────────────
function TitleMeta({ title, description }) {
  React.useEffect(() => {
    document.title = title;
    let meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', description);
  }, [title, description]);
  return null;
}
