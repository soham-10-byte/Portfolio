import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink, Github, CheckCircle2, X } from 'lucide-react';
import PillTag from '@/components/ui/PillTag';
import { devProjects, cta, contact } from '@/data/content';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

// ─── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({ images, activeIndex, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose, onPrev, onNext]);

  const img = images[activeIndex];

  return (
    <div
      className="fixed inset-0 z-[200] bg-c900/95 backdrop-blur-xl flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-5 p-2.5 rounded-full border border-c600 bg-c800 text-c100 hover:border-c400 transition-colors z-10 min-w-[44px] min-h-[44px] flex items-center justify-center"
        aria-label="Close lightbox"
      >
        <X size={20} />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full border border-c600 bg-c800 text-c100 hover:border-c400 transition-colors z-10 min-w-[44px] min-h-[44px] flex items-center justify-center"
        aria-label="Previous image"
      >
        <ArrowLeft size={18} />
      </button>

      <div
        className="relative max-w-4xl w-full rounded-[24px] overflow-hidden border border-c600/40 shadow-mint-glow"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={img.src}
          alt={img.alt}
          className="w-full h-auto max-h-[80vh] object-contain bg-c800"
        />
        <p className="px-5 py-3 bg-c900/90 text-xs text-c400 font-body border-t border-c600/30 text-center">
          {img.alt}
        </p>
      </div>

      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full border border-c600 bg-c800 text-c100 hover:border-c400 transition-colors z-10 min-w-[44px] min-h-[44px] flex items-center justify-center"
        aria-label="Next image"
      >
        <ArrowRight size={18} />
      </button>
    </div>
  );
}

// ─── Title meta helper ─────────────────────────────────────────────────────────
function TitleMeta({ title, description }) {
  useEffect(() => {
    document.title = title;
    let meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', description);
  }, [title, description]);
  return null;
}

// ─── Section header used in the two-col content blocks ────────────────────────
function ContentSection({ number, heading, children, className = '' }) {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-[5rem_1fr] gap-6 md:gap-10', className)}>
      <div className="hidden md:flex items-start pt-1">
        <span
          className="font-display font-black text-5xl leading-none select-none"
          style={{ WebkitTextStroke: '1px #235347', color: 'transparent' }}
          aria-hidden="true"
        >
          {number}
        </span>
      </div>
      <div>
        <h2
          className="font-display font-black text-c100 uppercase tracking-tight mb-5"
          style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.75rem)' }}
        >
          {heading}
        </h2>
        {children}
      </div>
    </div>
  );
}

// ─── Grouped stack pills ───────────────────────────────────────────────────────
function StackGroup({ label, items }) {
  const valid = items.filter((i) => i !== '[PLACEHOLDER]');
  const hasPlaceholder = items.some((i) => i === '[PLACEHOLDER]');

  return (
    <div>
      <span className="text-[10px] font-display font-bold uppercase tracking-wider text-c400 block mb-2">
        {label}
      </span>
      <div className="flex flex-wrap gap-2">
        {valid.map((item) => (
          <span
            key={item}
            className="px-3 py-1.5 rounded-pill bg-c800/90 border border-c600 text-xs font-body text-c100 font-semibold"
          >
            {item}
          </span>
        ))}
        {hasPlaceholder && (
          <span className="px-3 py-1.5 rounded-pill bg-c700/40 border border-c600/40 text-[10px] font-body text-c400/60 italic">
            [PLACEHOLDER]
          </span>
        )}
      </div>
    </div>
  );
}

// ─── How-it-works flow ─────────────────────────────────────────────────────────
function HowItWorks({ steps }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {steps.map((step, i) => (
        <div key={step.step} className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full border border-c400/60 bg-c800 flex items-center justify-center text-[11px] font-display font-bold text-c100 shrink-0">
              {step.step}
            </span>
            {i < steps.length - 1 && (
              <div className="hidden lg:block h-px flex-1 border-t border-dashed border-c600/50" />
            )}
          </div>
          <div>
            <span className="text-[11px] font-display font-bold uppercase tracking-wider text-c100 block mb-1">
              {step.label}
            </span>
            <p className="text-xs text-c400 font-body leading-relaxed">
              {step.detail}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Main case study page ──────────────────────────────────────────────────────
export default function DevelopmentDetail() {
  const { slug } = useParams();
  const reducedMotion = useReducedMotion();
  const [lightboxIdx, setLightboxIdx] = useState(null);

  const project = devProjects.find((p) => p.slug === slug);
  if (!project) return <Navigate to="/404" replace />;

  const currentIndex = devProjects.findIndex((p) => p.slug === slug);
  const nextProject = devProjects[(currentIndex + 1) % devProjects.length];

  const isPlaceholderUrl = (url) => !url || url === '[PLACEHOLDER URL]';

  const openLightbox = (i) => setLightboxIdx(i);
  const closeLightbox = () => setLightboxIdx(null);
  const prevImage = () => setLightboxIdx((i) => (i - 1 + project.images.length) % project.images.length);
  const nextImage = () => setLightboxIdx((i) => (i + 1) % project.images.length);

  const easing = [0.22, 1, 0.36, 1];

  return (
    <>
      <TitleMeta
        title={`${project.title} | Soham Sen – MERN Developer`}
        description={project.summary}
      />

      {lightboxIdx !== null && (
        <Lightbox
          images={project.images}
          activeIndex={lightboxIdx}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}

      <article className="relative w-full pt-28 pb-24 overflow-x-hidden">
        {/* Spotlight beam */}
        <div className="absolute top-0 left-0 w-full h-[600px] light-beam pointer-events-none z-0" aria-hidden="true" />

        <div className="relative z-10 max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── 1. HEADER ──────────────────────────────────────────── */}
          <motion.header
            initial={{ opacity: 0, y: reducedMotion ? 0 : 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easing }}
            className="mb-12"
          >
            {/* Back link */}
            <div className="mb-8">
              <Link
                to="/development"
                className="inline-flex items-center gap-2 text-xs font-body font-bold uppercase tracking-tracked text-c400 hover:text-c100 transition-colors min-h-[44px]"
              >
                <ArrowLeft size={16} />
                <span>← ALL PROJECTS</span>
              </Link>
            </div>

            {/* Year pill + meta */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <PillTag active>{project.year}</PillTag>
              <span className="text-xs font-body text-c400 uppercase tracking-wider">{project.category}</span>
            </div>

            {/* H1 */}
            <h1
              className="font-display font-black text-c100 uppercase tracking-tightest leading-[0.92] mb-4"
              style={{ fontSize: 'clamp(2.25rem, 9vw, 6rem)' }}
            >
              {project.title}
            </h1>

            <p className="text-lg sm:text-xl text-c400 font-body leading-relaxed max-w-2xl mb-8">
              {project.tagline}
            </p>

            {/* Meta row: ROLE / YEAR / LIVE / GITHUB */}
            <div className="flex flex-wrap items-center gap-4 p-5 sm:p-6 rounded-[20px] glass-card border border-c600/40">
              <div className="flex flex-col">
                <span className="text-[10px] font-body uppercase tracking-wider text-c400 mb-0.5">ROLE</span>
                <span className="text-sm font-body font-semibold text-c100">{project.role}</span>
              </div>

              <div className="hidden sm:block w-px h-8 bg-c600/40" />

              <div className="flex flex-col">
                <span className="text-[10px] font-body uppercase tracking-wider text-c400 mb-0.5">YEAR</span>
                <span className="text-sm font-body font-semibold text-c100">{project.year}</span>
              </div>

              <div className="hidden sm:block w-px h-8 bg-c600/40" />

              <div className="flex flex-col">
                <span className="text-[10px] font-body uppercase tracking-wider text-c400 mb-0.5">STACK</span>
                <span className="text-sm font-body font-semibold text-c100">{project.category}</span>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-3 ml-auto">
                <a
                  href={isPlaceholderUrl(project.liveUrl) ? undefined : project.liveUrl}
                  onClick={isPlaceholderUrl(project.liveUrl) ? (e) => e.preventDefault() : undefined}
                  target={isPlaceholderUrl(project.liveUrl) ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className={cn(
                    'inline-flex items-center gap-2 px-5 py-2.5 rounded-pill text-xs font-body font-bold uppercase tracking-tracked min-h-[44px] transition-all',
                    isPlaceholderUrl(project.liveUrl)
                      ? 'bg-c800/80 border border-c600/40 text-c400/60 cursor-not-allowed'
                      : 'bg-c100 text-c900 hover:shadow-mint-glow hover:brightness-105',
                  )}
                >
                  <ExternalLink size={14} />
                  <span>LIVE DEMO {isPlaceholderUrl(project.liveUrl) ? '[PLACEHOLDER]' : ''}</span>
                </a>

                <a
                  href={isPlaceholderUrl(project.githubUrl) ? undefined : project.githubUrl}
                  onClick={isPlaceholderUrl(project.githubUrl) ? (e) => e.preventDefault() : undefined}
                  target={isPlaceholderUrl(project.githubUrl) ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className={cn(
                    'inline-flex items-center gap-2 px-5 py-2.5 rounded-pill text-xs font-body font-semibold uppercase tracking-tracked min-h-[44px] border transition-all',
                    isPlaceholderUrl(project.githubUrl)
                      ? 'border-c600/40 text-c400/60 cursor-not-allowed'
                      : 'border-c400 text-c100 hover:bg-c600/30 hover:border-c100',
                  )}
                >
                  <Github size={14} />
                  <span>GITHUB {isPlaceholderUrl(project.githubUrl) ? '[PLACEHOLDER]' : ''}</span>
                </a>
              </div>
            </div>
          </motion.header>

          {/* ── 2. HERO IMAGE ──────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: reducedMotion ? 0 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: easing }}
            className="relative w-full rounded-[24px] sm:rounded-[28px] overflow-hidden border border-c600/40 bg-c900 shadow-mint-glow-sm mb-20 shadow-2xl"
          >
            {/* Browser Header Bar */}
            <div className="flex items-center justify-between px-5 py-3 bg-c800/90 border-b border-c600/30 select-none">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#FF5F56]/80" />
                <span className="w-3 h-3 rounded-full bg-[#FFBD2E]/80" />
                <span className="w-3 h-3 rounded-full bg-[#27C93F]/80" />
              </div>
              {!isPlaceholderUrl(project.liveUrl) ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-c400 hover:text-c100 font-mono tracking-wider truncate max-w-sm px-4 py-1 rounded-full bg-c900/80 border border-c600/30 hover:border-c400/60 transition-all flex items-center gap-2"
                >
                  <span>{project.liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')}</span>
                  <ExternalLink size={11} />
                </a>
              ) : (
                <div className="text-xs text-c400 font-mono tracking-wider truncate max-w-sm px-4 py-1 rounded-full bg-c900/80 border border-c600/30">
                  {project.slug}.app
                </div>
              )}
              <div className="w-10" />
            </div>

            {/* Full Screenshot Container — Uncropped */}
            <div className="relative w-full aspect-[16/10] bg-[#0c1f1d] flex items-center justify-center overflow-hidden p-2 sm:p-4">
              {!isPlaceholderUrl(project.liveUrl) ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-full flex items-center justify-center"
                  title={`Open live site: ${project.title}`}
                >
                  <img
                    src={project.images[0].src}
                    alt={project.images[0].alt}
                    loading="lazy"
                    className="w-full h-full object-contain rounded-md transition-transform duration-500 hover:scale-[1.01]"
                  />
                </a>
              ) : (
                <img
                  src={project.images[0].src}
                  alt={project.images[0].alt}
                  loading="lazy"
                  className="w-full h-full object-contain rounded-md"
                />
              )}
              {project.images[0].src.endsWith('.svg') && (
                <div className="absolute bottom-4 right-4 px-3 py-1 rounded-pill bg-c900/90 border border-c600/50 text-[10px] text-c400 font-body uppercase tracking-wider">
                  [PLACEHOLDER: add screenshot]
                </div>
              )}
            </div>
          </motion.div>

          {/* ── 3. CONTENT BODY ────────────────────────────────────── */}
          <div className="space-y-20">

            {/* OVERVIEW */}
            <ContentSection number="01" heading="PROJECT OVERVIEW">
              <p className="text-sm sm:text-base text-c100/90 font-body leading-relaxed">
                {project.summary}
              </p>
            </ContentSection>

            {/* THE PROBLEM */}
            <ContentSection number="02" heading="THE PROBLEM">
              <div className="p-6 sm:p-8 rounded-[24px] glass-card border-l-2 border-l-c400 border-y border-r border-c600/30">
                <p className="text-sm sm:text-base text-c100/90 font-body leading-relaxed">
                  {project.problem}
                </p>
              </div>
            </ContentSection>

            {/* THE SOLUTION */}
            <ContentSection number="03" heading="THE SOLUTION">
              <div className="p-6 sm:p-8 rounded-[24px] glass-card border border-c600/40">
                <p className="text-sm sm:text-base text-c100/90 font-body leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </ContentSection>

            {/* ── 4. KEY FEATURES ────────────────────────────────────── */}
            <ContentSection number="04" heading="KEY FEATURES">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.features.map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-5 rounded-[20px] glass-card border border-c600/40 hover:border-c400/50 transition-colors"
                  >
                    <CheckCircle2 size={18} className="text-c100 shrink-0 mt-0.5" />
                    <span className="text-sm text-c100/90 font-body leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>
            </ContentSection>

            {/* ── 5. TECH STACK ──────────────────────────────────────── */}
            <ContentSection number="05" heading="TECH STACK">
              <div className="p-6 sm:p-8 rounded-[24px] glass-card border border-c600/40 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {Object.entries(project.stack).map(([group, items]) => (
                  <StackGroup
                    key={group}
                    label={group.charAt(0).toUpperCase() + group.slice(1)}
                    items={items}
                  />
                ))}
              </div>
            </ContentSection>

            {/* ── 6. HOW IT WORKS ────────────────────────────────────── */}
            <ContentSection number="06" heading="HOW IT WORKS">
              <div className="p-6 sm:p-8 rounded-[24px] glass-card border border-c600/40">
                <HowItWorks steps={project.howItWorks} />
              </div>
            </ContentSection>

            {/* ── 7. SCREENSHOT GALLERY ──────────────────────────────── */}
            <ContentSection number="07" heading="SCREENSHOT GALLERY">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {project.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => openLightbox(i)}
                    className="group relative rounded-[20px] overflow-hidden border border-c600/40 hover:border-c400/60 hover:shadow-mint-glow-sm transition-all text-left min-h-[44px] cursor-pointer bg-c900 flex flex-col shadow-lg"
                    aria-label={`Open image: ${img.alt}`}
                  >
                    <div className="aspect-[16/10] bg-[#0c1f1d] relative overflow-hidden flex items-center justify-center p-2">
                      <img
                        src={img.src}
                        alt={img.alt}
                        loading="lazy"
                        className="w-full h-full object-contain transition-all duration-500 group-hover:scale-[1.03]"
                      />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-c900/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <ExternalLink size={22} className="text-c100" />
                      </div>
                    </div>
                    <p className="px-4 py-2.5 text-[11px] text-c400 font-body truncate bg-c800/90 border-t border-c600/30">
                      {img.alt}
                    </p>
                  </button>
                ))}
              </div>
            </ContentSection>

          </div>

          {/* ── 8. NEXT PROJECT + CTA ──────────────────────────────────── */}
          <div className="mt-24 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Next project card */}
            {nextProject && (
              <Link
                to={`/development/${nextProject.slug}`}
                className="group relative p-8 rounded-[32px] glass-card border border-c600/40 hover:border-c400/60 hover:-translate-y-1 hover:shadow-mint-glow transition-all duration-400 overflow-hidden flex flex-col justify-between min-h-[200px]"
              >
                <div className="flex items-center justify-between gap-4 mb-6">
                  <span className="text-xs font-body uppercase tracking-tracked text-c400 font-semibold">NEXT PROJECT</span>
                  <div className="w-10 h-10 rounded-full border border-c400/40 bg-c800 flex items-center justify-center text-c100 group-hover:bg-c100 group-hover:text-c900 group-hover:rotate-45 transition-all duration-300 min-w-[40px]">
                    <ArrowRight size={17} />
                  </div>
                </div>
                <h3
                  className="font-display font-black text-c100 uppercase tracking-tight group-hover:text-glow transition-all"
                  style={{ fontSize: 'clamp(1.1rem, 2.2vw, 1.75rem)' }}
                >
                  {nextProject.title}
                </h3>
                <p className="text-xs text-c400 font-body mt-2 line-clamp-2">{nextProject.tagline}</p>
              </Link>
            )}

            {/* Dev CTA card */}
            <div className="p-8 rounded-[32px] bg-c100 flex flex-col justify-between min-h-[200px]">
              <div>
                <span className="text-xs font-body uppercase tracking-tracked text-c900/60 block mb-2">
                  LOOKING FOR A DEVELOPER?
                </span>
                <h3
                  className="font-display font-black text-c900 uppercase tracking-tight mb-2"
                  style={{ fontSize: 'clamp(1.1rem, 2vw, 1.6rem)' }}
                >
                  HIRE ME AS A DEVELOPER.
                </h3>
                <p className="text-xs text-c900/70 font-body leading-relaxed">
                  Let's build something production-grade together.
                </p>
              </div>
              <Link
                to="/#contact"
                className="self-start mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-pill bg-c900 text-c100 font-body font-bold text-xs uppercase tracking-tracked hover:bg-c800 transition-colors min-h-[44px]"
              >
                <span>GET IN TOUCH</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

        </div>
      </article>
    </>
  );
}
