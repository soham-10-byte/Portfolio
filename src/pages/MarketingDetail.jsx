import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion, useInView, useMotionValue, animate } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  X,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';
import PillTag from '@/components/ui/PillTag';
import CaseHighlightsSlider from '@/components/ui/CaseHighlightsSlider';
import { marketingCases, contact } from '@/data/content';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

// ─── Lightbox Modal ────────────────────────────────────────────────────────────
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
      aria-label="Creative visual lightbox"
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-5 p-2.5 rounded-full border border-c600 bg-c800 text-c100 hover:border-c400 transition-colors z-10 min-w-[44px] min-h-[44px] flex items-center justify-center"
        aria-label="Close lightbox"
      >
        <X size={20} />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full border border-c600 bg-c800 text-c100 hover:border-c400 transition-colors z-10 min-w-[44px] min-h-[44px] flex items-center justify-center"
        aria-label="Previous visual"
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
          className="w-full h-auto max-h-[75vh] object-contain bg-c800 select-none"
        />
        <div className="px-5 py-3.5 bg-c900/90 text-xs text-c400 font-body border-t border-c600/30 text-center flex items-center justify-center gap-2">
          <span>{img.alt}</span>
          <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-c800 border border-c600/40 text-c100/70">
            {activeIndex + 1} / {images.length}
          </span>
        </div>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full border border-c600 bg-c800 text-c100 hover:border-c400 transition-colors z-10 min-w-[44px] min-h-[44px] flex items-center justify-center"
        aria-label="Next visual"
      >
        <ArrowRight size={18} />
      </button>
    </div>
  );
}

// ─── Head Title & Description Helper ───────────────────────────────────────────
function TitleMeta({ title, description }) {
  useEffect(() => {
    document.title = title;
    let meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', description);
  }, [title, description]);
  return null;
}

// ─── Animated Result Counter ───────────────────────────────────────────────────
function AnimatedHeadlineResult({ value, duration = 2.0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const reducedMotion = useReducedMotion();
  const motionVal = useMotionValue(0);
  const [displayVal, setDisplayVal] = useState(0);

  const match = typeof value === 'string' ? value.match(/^([^\d]*)(\d+)(.*)$/) : null;
  const prefix = match ? match[1] : '';
  const num = match ? parseInt(match[2], 10) : (typeof value === 'number' ? value : null);
  const suffix = match ? match[3] : '';

  useEffect(() => {
    if (!isInView || num === null) return;
    if (reducedMotion) {
      setDisplayVal(num);
      return;
    }
    const controls = animate(motionVal, num, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplayVal(Math.round(latest)),
    });
    return controls.stop;
  }, [isInView, num, duration, motionVal, reducedMotion]);

  if (num === null) {
    return <span ref={ref}>{value}</span>;
  }

  return (
    <span ref={ref} aria-label={value}>
      {prefix}
      {isInView || reducedMotion ? displayVal : 0}
      {suffix}
    </span>
  );
}

// ─── Optional Results Chart Placeholder Component ──────────────────────────────
// Hidden until real numeric series / attribution data exists
function ResultsChartPlaceholder({ data }) {
  if (!data || data.length === 0) return null;
  return (
    <div className="p-8 sm:p-10 rounded-[28px] glass-card border border-c600/40 my-12">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display font-black text-c100 uppercase text-lg sm:text-xl tracking-tight">
          REVENUE &amp; ATTRIBUTION TIMELINE
        </h3>
        <span className="text-xs font-mono text-c400 uppercase tracking-widest bg-c800 px-3 py-1 rounded-pill border border-c600/40">
          PERFORMANCE OVERVIEW
        </span>
      </div>
      <div className="h-64 flex items-center justify-center border border-dashed border-c600/50 rounded-[18px]">
        <p className="text-xs text-c400 font-mono">Performance trend</p>
      </div>
    </div>
  );
}

export default function MarketingDetail() {
  const { slug } = useParams();
  const caseItem = marketingCases.find((c) => c.slug === slug);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  // If unknown slug, redirect to 404
  if (!caseItem) {
    return <Navigate to="/404" replace />;
  }

  // Next case for seamless cycle navigation
  const currentIndex = marketingCases.findIndex((c) => c.slug === slug);
  const nextCase = marketingCases[(currentIndex + 1) % marketingCases.length];

  const galleryImages = caseItem.images || [
    { src: caseItem.image, alt: `${caseItem.brand} case study overview` },
  ];

  return (
    <>
      <TitleMeta
        title={`${caseItem.brand} – ${caseItem.headlineResult} Growth Case Study | Soham Sen`}
        description={caseItem.summary}
      />

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <Lightbox
          images={galleryImages}
          activeIndex={activeImageIdx}
          onClose={() => setLightboxOpen(false)}
          onPrev={() =>
            setActiveImageIdx((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
          }
          onNext={() => setActiveImageIdx((prev) => (prev + 1) % galleryImages.length)}
        />
      )}

      <div className="relative w-full overflow-hidden pt-28 pb-24 text-c100">
        {/* Ambient Top Light Beam */}
        <div
          className="pointer-events-none absolute top-0 left-0 h-[600px] w-full light-beam z-0"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* ── 1. Header ──────────────────────────────────────────────────── */}
          <header className="mb-14">
            {/* Back link */}
            <div className="mb-8">
              <Link
                to="/marketing"
                className="inline-flex items-center gap-2 text-xs font-body font-bold uppercase tracking-tracked text-c400 hover:text-c100 transition-colors min-h-[36px]"
              >
                <ArrowLeft size={16} />
                <span>← ALL CASE STUDIES</span>
              </Link>
            </div>

            {/* Top row: Industry PillTag + Brand Title */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <PillTag active>{caseItem.industry}</PillTag>
              {caseItem.featured && (
                <span className="px-3 py-1 rounded-pill bg-c100 text-c900 text-xs font-body font-black uppercase tracking-wider">
                  FEATURED CLIENT
                </span>
              )}
            </div>

            <h1
              className="font-display font-black text-c100 uppercase tracking-tightest leading-[0.92] mb-6"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 5.5rem)' }}
            >
              {caseItem.brand}
            </h1>

            {/* Service Pills */}
            <div className="flex flex-wrap gap-2.5">
              {caseItem.services.map((svc) => (
                <span
                  key={svc}
                  className="px-4 py-1.5 rounded-pill bg-c800/80 border border-c600/70 text-xs font-body text-c400 uppercase font-semibold"
                >
                  {svc}
                </span>
              ))}
              {caseItem.websiteUrl && (
                <a
                  href={caseItem.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill border border-c400/60 text-xs font-body font-semibold text-c100 uppercase hover:bg-c600/30 hover:border-c100 transition-colors"
                >
                  VISIT WEBSITE
                  <ArrowUpRight size={14} />
                </a>
              )}
            </div>
          </header>

          {/* ── 2. Giant Result Block ──────────────────────────────────────── */}
          <div className="p-8 sm:p-14 rounded-[36px] glass-card border border-c400/50 bg-gradient-to-b from-c800/90 to-c900 relative overflow-hidden mb-16 shadow-mint-glow">
            {/* Top right subtle badge */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-display font-bold uppercase tracking-tracked text-c400">
                PROVEN COMMERCIAL RESULT
              </span>
              <span className="text-[11px] font-mono text-c100/60 uppercase">
                {caseItem.timeline}
              </span>
            </div>

            {/* Oversized result in the display face */}
            <div
              className="font-display font-black text-c100 tracking-tight leading-none text-glow my-3"
              style={{ fontSize: 'clamp(4rem, 14vw, 12rem)' }}
            >
              <AnimatedHeadlineResult value={caseItem.headlineResult} />
            </div>

            {/* Result Label beneath */}
            <p className="font-display font-bold text-base sm:text-2xl text-c400 uppercase tracking-tracked">
              {caseItem.resultLabel}
            </p>

            {/* Summary narrative */}
            <p className="mt-6 text-sm sm:text-base text-c100/85 font-body leading-relaxed max-w-3xl pt-6 border-t border-c600/30">
              {caseItem.summary}
            </p>
          </div>

          {/* ── 3. The Challenge, The Approach, The Results, What We Delivered ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
            {/* Left Column: Challenge, Approach & Results (8 cols) */}
            <div className="lg:col-span-8 space-y-14">
              {/* The Challenge */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-xs text-c400 bg-c800 px-2.5 py-1 rounded-pill border border-c600/50">
                    01
                  </span>
                  <h2 className="text-xl sm:text-2xl font-display font-black text-c100 uppercase tracking-tight">
                    THE CHALLENGE
                  </h2>
                </div>
                <div className="p-6 sm:p-8 rounded-[24px] glass-card border border-c600/40">
                  <p className="text-sm sm:text-base text-c100/90 font-body leading-relaxed">
                    {caseItem.challenge}
                  </p>
                </div>
              </section>

              {/* The Approach */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-mono text-xs text-c400 bg-c800 px-2.5 py-1 rounded-pill border border-c600/50">
                    02
                  </span>
                  <h2 className="text-xl sm:text-2xl font-display font-black text-c100 uppercase tracking-tight">
                    THE APPROACH
                  </h2>
                </div>

                <div className="space-y-4">
                  {caseItem.approach.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-6 rounded-[22px] bg-c800/70 border border-c600/40 flex items-start gap-4 hover:border-c400/50 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-c700 border border-c400/30 flex items-center justify-center font-display font-bold text-xs text-c100 flex-shrink-0 mt-0.5">
                        {String(idx + 1).padStart(2, '0')}
                      </div>
                      <p className="text-sm text-c100/90 font-body leading-relaxed pt-1">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* The Results */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-mono text-xs text-c400 bg-c800 px-2.5 py-1 rounded-pill border border-c600/50">
                    03
                  </span>
                  <h2 className="text-xl sm:text-2xl font-display font-black text-c100 uppercase tracking-tight">
                    THE RESULTS
                  </h2>
                </div>

                <div className="p-6 sm:p-8 rounded-[24px] glass-card border border-c400/40 bg-c700/20 space-y-4">
                  {(caseItem.results || [caseItem.headlineResult]).map((resItem, i) => (
                    <div key={i} className="flex items-start gap-3.5">
                      <CheckCircle2 size={18} className="text-c100 flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-c100 font-body font-medium leading-relaxed">
                        {resItem}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Column: What We Delivered & Quick Action (4 cols) */}
            <div className="lg:col-span-4 space-y-8">
              {/* What We Delivered */}
              <div className="p-6 sm:p-8 rounded-[28px] glass-card border border-c600/40">
                <span className="text-xs font-display font-bold uppercase tracking-tracked text-c400 block mb-4">
                  WHAT WE DELIVERED
                </span>
                <div className="flex flex-col gap-2.5">
                  {caseItem.deliverables.map((item, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-[16px] bg-c800/80 border border-c600/50 text-xs font-body text-c100/90 leading-snug flex items-center gap-2.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-c100 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Contact Card */}
              <div className="p-6 sm:p-8 rounded-[28px] bg-gradient-to-br from-c800 to-c900 border border-c400/40 shadow-mint-glow-sm flex flex-col gap-4">
                <span className="text-[11px] font-display font-bold uppercase tracking-tracked text-c400">
                  REVENUE ACCELERATION
                </span>
                <h3 className="font-display font-black text-lg sm:text-xl text-c100 uppercase leading-snug">
                  NEED MEASURABLE GROWTH FOR YOUR BRAND?
                </h3>
                <p className="text-xs text-c100/80 font-body leading-relaxed">
                  Tailored search visibility, conversion-rate optimization, and targeted paid ads architecture.
                </p>
                <div className="pt-2 flex flex-col gap-2.5">
                  <Link
                    to="/#contact"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-pill bg-c100 text-c900 font-body font-bold text-xs uppercase tracking-tracked hover:brightness-105 hover:shadow-mint-glow transition-all"
                  >
                    <span>GROW MY BRAND</span>
                    <ArrowRight size={14} />
                  </Link>
                  <a
                    href={contact.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-pill border border-c400 text-c100 font-body font-semibold text-xs uppercase tracking-tracked hover:bg-c600/30 transition-all"
                  >
                    <MessageCircle size={14} className="text-c400" />
                    <span>WHATSAPP DIRECT</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {caseItem.slug === 'steelam-furniture' && <CaseHighlightsSlider />}

          {/* ── 4. Creative Gallery Placeholders ───────────────────────────── */}
          <section className="mb-20">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-display font-bold uppercase tracking-tracked text-c400 block mb-1">
                  CAMPAIGN ASSETS
                </span>
                <h3 className="text-xl sm:text-2xl font-display font-black text-c100 uppercase tracking-tight">
                  CREATIVE &amp; EXECUTION GALLERY
                </h3>
              </div>
              <span className="text-xs font-mono text-c400 bg-c800/80 px-3 py-1 rounded-pill border border-c600/40">
                CLICK TO EXPAND
              </span>
            </div>

            <div className={`grid gap-6 ${galleryImages.length === 1 ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-3'}`}>
              {galleryImages.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setActiveImageIdx(idx);
                    setLightboxOpen(true);
                  }}
                  className={`group relative rounded-[22px] overflow-hidden border border-c600/40 hover:border-c400 hover:shadow-mint-glow cursor-pointer transition-all duration-300 aspect-[16/10] bg-[#0c1f1d]`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 p-2"
                  />
                  {/* Subtle Duotone Mint Glare */}
                  <div className="absolute inset-0 bg-gradient-to-t from-c900/90 via-transparent to-transparent pointer-events-none" />

                  {/* Overlay Info */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10">
                    <span className="text-[11px] font-body text-c100 font-medium truncate max-w-[80%]">
                      {img.alt}
                    </span>
                    <span className="text-[10px] font-mono text-c400 bg-c900/80 px-2 py-0.5 rounded border border-c600/40 flex-shrink-0">
                      VIEW IMAGE
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── 5. Optional Results Chart Component (hidden until data exists) ── */}
          <ResultsChartPlaceholder data={caseItem.chartData} />

          {/* ── 6. "NEXT CASE STUDY" Card + CTA ────────────────────────────── */}
          {nextCase && (
            <div className="p-8 sm:p-12 rounded-[32px] glass-card border border-c600/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mt-16">
              <div className="max-w-xl">
                <span className="text-xs font-display font-bold uppercase tracking-tracked text-c400 block mb-2">
                  UP NEXT
                </span>
                <Link
                  to={`/marketing/${nextCase.slug}`}
                  className="group block"
                >
                  <h3 className="font-display font-black text-2xl sm:text-4xl text-c100 uppercase tracking-tight group-hover:text-glow transition-all mb-2">
                    {nextCase.brand}
                  </h3>
                  <p className="text-xs sm:text-sm font-body text-c400 uppercase tracking-wider font-semibold">
                    {nextCase.headlineResult} — {nextCase.resultLabel}
                  </p>
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-3.5 w-full md:w-auto">
                <Link
                  to={`/marketing/${nextCase.slug}`}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-pill border border-c400 text-c100 font-body font-semibold text-xs uppercase tracking-tracked hover:bg-c600/30 hover:border-c100 active:scale-[0.98] transition-all min-h-[44px]"
                >
                  <span>NEXT CASE STUDY</span>
                  <ArrowRight size={15} />
                </Link>

                <Link
                  to="/#contact"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-pill bg-c100 text-c900 font-body font-bold text-xs uppercase tracking-tracked hover:brightness-105 hover:shadow-mint-glow active:scale-[0.98] transition-all min-h-[44px]"
                >
                  <span>GROW MY BRAND</span>
                  <ArrowUpRight size={15} />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
