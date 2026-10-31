import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useMotionValue, animate } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ExternalLink, MessageCircle, Play } from 'lucide-react';
import PillTag from '@/components/ui/PillTag';
import { marketingCases, marketingSkills, expertiseMarquee, cta, contact } from '@/data/content';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

// ─── Smooth Hover Card Helper ──────────────────────────────────────────────────
function TiltCard({ children, className = '' }) {
  return (
    <div
      className={cn(
        'relative overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-mint-glow',
        className
      )}
    >
      {children}
    </div>
  );
}

// ─── Animated Number Result Helper ─────────────────────────────────────────────
function AnimatedResult({ value, duration = 1.8 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const reducedMotion = useReducedMotion();
  const motionVal = useMotionValue(0);
  const [displayVal, setDisplayVal] = useState(0);

  // Parse prefix, digits, suffix
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

// ─── SEO / Head Title Helper ───────────────────────────────────────────────────
function TitleMeta({ title, description }) {
  useEffect(() => {
    document.title = title;
    let meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', description);
  }, [title, description]);
  return null;
}

// ─── Video / Reel Placeholder Strip Items ──────────────────────────────────────
const REEL_ITEMS = [
  {
    title: 'Short-Form Hook Engineering',
    category: 'NICHE VIRALITY',
    duration: '0:34',
    note: 'Member milestone storytelling & technique breakdown',
  },
  {
    title: 'Product Note & Scent Visualizer',
    category: 'CREATIVE DIRECTION',
    duration: '0:28',
    note: 'Visual aesthetic targeting luxury gifting shoppers',
  },
  {
    title: 'High-Intent Search Acquisition',
    category: 'SEO BREAKDOWN',
    duration: '0:45',
    note: 'Collection page architecture and ranking strategy',
  },
  {
    title: 'E-Commerce Unit Economics',
    category: 'PERFORMANCE ADS',
    duration: '0:30',
    note: 'Meta & Google Ads iterative creative testing structure',
  },
];

export default function Marketing() {
  const reducedMotion = useReducedMotion();
  const featuredCase = marketingCases.find((c) => c.featured);
  const otherCases = marketingCases.filter((c) => !c.featured);

  return (
    <>
      <TitleMeta
        title="Performance Marketing & SEO Portfolio | Soham Sen"
        description="High-velocity search architecture, paid ads, and viral content strategies that generated ₹15L+ in monthly sales and grew 15+ brands. Explore growth case studies."
      />

      <div className="relative w-full overflow-hidden pt-28 pb-24 text-c100">
        {/* Ambient Top Light Beam */}
        <div
          className="pointer-events-none absolute top-0 left-0 h-[650px] w-full light-beam z-0"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* ── 1. Hero Strip ──────────────────────────────────────────────── */}
          <div className="max-w-4xl mb-16 sm:mb-20">
            {/* Top row: Pill tag + Back Link */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <PillTag active>THE GROWTH SIDE</PillTag>
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-pill border border-c600/70 bg-c800/80 text-c400 hover:text-c100 hover:border-c400 text-xs font-body font-semibold uppercase tracking-tracked transition-all min-h-[36px]"
              >
                <span>← BACK TO HOME</span>
              </Link>
            </div>

            {/* Giant H1 */}
            <h1
              className="font-display font-black text-c100 uppercase tracking-tightest leading-[0.92] mb-6"
              style={{ fontSize: 'clamp(2.4rem, 8vw, 5.5rem)' }}
            >
              MARKETING THAT SELLS.
              <br />
              <span className="text-c400 text-glow">NOT JUST LOOKS.</span>
            </h1>

            {/* Intro paragraph */}
            <p className="text-base sm:text-lg text-c100/90 font-body leading-relaxed max-w-2xl mb-10">
              Commercial growth delivered through data-driven search architecture, high-ROI paid advertising, and viral content velocity. Scaling e-commerce brands and client pipelines with measurable revenue outcomes.
            </p>

            {/* 3 Counters Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-8 border-t border-c600/30">
              <div className="p-5 rounded-[20px] bg-c800/70 border border-c600/40">
                <p className="font-display font-black text-3xl sm:text-4xl text-c100 text-glow leading-tight mb-1">
                  <AnimatedResult value="₹15L+" duration={2.0} />
                </p>
                <p className="text-[11px] font-display font-bold uppercase tracking-tracked text-c400">
                  BEST MONTHLY SALES
                </p>
                <p className="text-xs text-c100/60 font-body mt-1">
                  Generated for Steelam Furniture
                </p>
              </div>

              <div className="p-5 rounded-[20px] bg-c800/70 border border-c600/40">
                <p className="font-display font-black text-3xl sm:text-4xl text-c100 text-glow leading-tight mb-1">
                  <AnimatedResult value="15+" duration={1.6} />
                </p>
                <p className="text-[11px] font-display font-bold uppercase tracking-tracked text-c400">
                  BRANDS GROWN
                </p>
                <p className="text-xs text-c100/60 font-body mt-1">
                  Across SEO, ads and content
                </p>
              </div>

              <div className="p-5 rounded-[20px] bg-c800/70 border border-c600/40">
                <p className="font-display font-black text-3xl sm:text-4xl text-c100 text-glow leading-tight mb-1">
                  <AnimatedResult value="8" duration={1.6} />
                </p>
                <p className="text-[11px] font-display font-bold uppercase tracking-tracked text-c400">
                  GROWTH DISCIPLINES
                </p>
                <p className="text-xs text-c100/60 font-body mt-1">
                  From technical audits to video shoots
                </p>
              </div>
            </div>
          </div>

          {/* ── 2. Featured Case: Steelam Furniture ───────────────────────── */}
          {featuredCase && (
            <div className="mb-20">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-c100 animate-pulse" />
                <span className="text-xs font-display font-bold uppercase tracking-tracked text-c400">
                  FEATURED CASE STUDY
                </span>
              </div>

              <TiltCard className="rounded-[32px] glass-card border border-c400/50 hover:border-c100 hover:shadow-mint-glow transition-all duration-500">
                <a
                  href={featuredCase.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit the Steelam Furniture website"
                  className="group/preview relative block aspect-[16/10] sm:aspect-[2/1] max-h-[520px] overflow-hidden border-b border-c600/40 bg-[#0c1f1d] p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-c100"
                >
                  <img
                    src={featuredCase.image}
                    alt="Steelam Furniture website homepage"
                    loading="lazy"
                    className="h-full w-full object-contain transition-transform duration-700 group-hover/preview:scale-[1.02]"
                  />
                  <span className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-pill border border-white/30 bg-c900/80 px-4 py-2 text-xs font-body font-bold uppercase tracking-tracked text-c100 backdrop-blur-sm">
                    OPEN STEELAM SITE <ExternalLink size={14} />
                  </span>
                </a>
                <div className="p-8 sm:p-12 lg:p-14 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
                  {/* Left Column: Brand & Details */}
                  <div className="max-w-2xl">
                    <div className="flex flex-wrap items-center gap-3 mb-5">
                      <span className="px-3.5 py-1 rounded-pill bg-c100 text-c900 text-xs font-body font-black uppercase tracking-wider">
                        {featuredCase.industry}
                      </span>
                      <span className="text-xs font-body text-c400 uppercase tracking-wider">
                        {featuredCase.timeline}
                      </span>
                    </div>

                    <h2
                      className="font-display font-black text-c100 uppercase tracking-tight leading-tight mb-4 group-hover:text-glow transition-all"
                      style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
                    >
                      {featuredCase.brand}
                    </h2>

                    <p className="text-sm sm:text-base text-c100/90 font-body leading-relaxed mb-6 max-w-xl">
                      {featuredCase.summary}
                    </p>

                    {/* Service Pills */}
                    <div className="flex flex-wrap gap-2">
                      {featuredCase.services.map((svc) => (
                        <span
                          key={svc}
                          className="px-3 py-1 rounded-pill bg-c800/90 border border-c600 text-xs font-body text-c400 uppercase font-semibold"
                        >
                          {svc}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Giant Animated Result & Button */}
                  <div className="flex flex-col lg:items-end justify-center w-full lg:w-auto pt-6 lg:pt-0 border-t lg:border-t-0 border-c600/30">
                    <span className="text-xs font-body uppercase tracking-tracked text-c400 block mb-1">
                      {featuredCase.resultLabel}
                    </span>
                    <span
                      className="font-display font-black text-c100 tracking-tight text-glow mb-6 leading-none"
                      style={{ fontSize: 'clamp(3.5rem, 8vw, 6rem)' }}
                    >
                      <AnimatedResult value={featuredCase.headlineResult} />
                    </span>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link
                        to={`/marketing/${featuredCase.slug}`}
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-pill bg-c100 text-c900 font-body font-bold text-xs uppercase tracking-tracked hover:brightness-105 hover:shadow-mint-glow active:scale-[0.98] transition-all min-h-[44px]"
                      >
                        <span>READ CASE STUDY</span>
                        <ArrowRight size={16} />
                      </Link>
                      {featuredCase.websiteUrl && (
                        <a
                          href={featuredCase.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-pill border border-c400 text-c100 font-body font-bold text-xs uppercase tracking-tracked hover:bg-c600/30 hover:border-c100 transition-all min-h-[44px]"
                        >
                          <span>VISIT WEBSITE</span>
                          <ExternalLink size={15} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </div>
          )}

          {/* ── 3. Grid of Other Four Case Cards ──────────────────────────── */}
          <div className="mb-24">
            <div className="mb-8">
              <PillTag>PORTFOLIO TRACK RECORD</PillTag>
              <h2
                className="font-display font-black text-c100 uppercase tracking-tight mt-3"
                style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)' }}
              >
                CLIENT RESULTS &amp; <span className="text-c400 text-glow">SCALE</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {otherCases.map((cs) => (
                <TiltCard
                  key={cs.slug}
                  className="rounded-[28px] glass-card border border-c600/40 hover:border-c400/60 hover:shadow-mint-glow transition-all duration-400 flex flex-col justify-between"
                >
                  {cs.slug === 'maxli-perfumes' && (
                    <a
                      href={cs.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="View Maxli Perfumes on its official website"
                      className="group/maxli relative block aspect-[2.2/1] overflow-hidden border-b border-c600/40 bg-[#f3f0e8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-c100"
                    >
                      <img
                        src={cs.image}
                        alt="Maxli Signature Collection perfume bottle"
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover object-center transition-transform duration-700 group-hover/maxli:scale-[1.03]"
                      />
                      <span className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-pill border border-white/40 bg-c900/80 px-3 py-2 text-[10px] font-body font-bold uppercase tracking-tracked text-c100 backdrop-blur-sm">
                        OPEN MAXLI SITE <ExternalLink size={13} />
                      </span>
                    </a>
                  )}
                  {cs.slug === 'infinity-gym' && (
                    <Link
                      to={`/marketing/${cs.slug}`}
                      className="group/gym relative block aspect-[2.2/1] overflow-hidden border-b border-c600/40 bg-black flex items-center justify-center p-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-c100"
                    >
                      <img
                        src={cs.image}
                        alt="Infinity Fitness World official branding"
                        loading="lazy"
                        className="h-full max-h-[140px] w-auto object-contain transition-transform duration-500 group-hover/gym:scale-105"
                      />
                      <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-pill border border-white/20 bg-c900/80 px-3 py-1.5 text-[10px] font-body font-bold uppercase tracking-tracked text-c100 backdrop-blur-sm">
                        VIEW CASE <ArrowUpRight size={12} />
                      </span>
                    </Link>
                  )}
                  {cs.slug === 'baidick' && (
                    <Link
                      to={`/marketing/${cs.slug}`}
                      className="group/baidick relative block aspect-[2.2/1] overflow-hidden border-b border-c600/40 bg-[#FAF7F2] flex items-center justify-center p-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-c100"
                    >
                      <img
                        src={cs.image}
                        alt="Baidick official brand emblem"
                        loading="lazy"
                        className="h-full max-h-[140px] w-auto object-contain transition-transform duration-500 group-hover/baidick:scale-105"
                      />
                      <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-pill border border-c900/10 bg-c900/80 px-3 py-1.5 text-[10px] font-body font-bold uppercase tracking-tracked text-c100 backdrop-blur-sm">
                        VIEW CASE <ArrowUpRight size={12} />
                      </span>
                    </Link>
                  )}
                  <div className="p-8 sm:p-10 flex flex-col justify-between h-full">
                    <div>
                      {/* Card Header: Industry badge & Arrow */}
                      <div className="flex items-center justify-between gap-4 mb-5">
                        <span
                          className={cn(
                            'px-3 py-1 rounded-pill text-[11px] font-body uppercase tracking-wider font-semibold border',
                            'bg-c800/90 border-c400/40 text-c100'
                          )}
                        >
                          {cs.industry}
                        </span>
                        <Link
                          to={`/marketing/${cs.slug}`}
                          className="w-10 h-10 rounded-full border border-c400/40 bg-c800 flex items-center justify-center text-c100 hover:bg-c100 hover:text-c900 transition-colors"
                          aria-label={`View ${cs.brand} case study`}
                        >
                          <ArrowUpRight size={18} />
                        </Link>
                      </div>

                      {/* Brand Title */}
                      <h3 className="text-2xl sm:text-3xl font-display font-black text-c100 uppercase tracking-tight mb-3">
                        {cs.brand}
                      </h3>

                      {/* Summary */}
                      <p className="text-xs sm:text-sm text-c100/80 font-body leading-relaxed mb-6">
                        {cs.summary}
                      </p>
                    </div>

                    {/* Result Block & Service Pills */}
                    <div className="pt-6 border-t border-c600/30 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                      <div>
                        <span className="text-[10px] font-body uppercase tracking-wider text-c400 block mb-1">
                          {cs.resultLabel}
                        </span>
                        <span className="text-3xl sm:text-4xl font-display font-black text-c100 tracking-tight text-glow">
                          <AnimatedResult value={cs.headlineResult} />
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1.5 justify-start sm:justify-end">
                        {cs.services.map((svc) => (
                          <span
                            key={svc}
                            className="px-2.5 py-1 rounded-pill bg-c800/80 border border-c600/60 text-[10px] font-body text-c400 uppercase font-semibold"
                          >
                            {svc}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>

          {/* ── 4. "WHAT I DO" Expertise Marquee Strip ─────────────────────── */}
          <div className="mb-20">
            <div className="text-center max-w-xl mx-auto mb-8">
              <PillTag>WHAT I DO</PillTag>
              <h3 className="font-display font-black text-c100 uppercase tracking-tight mt-3 text-2xl sm:text-3xl">
                GROWTH SKILL POOL
              </h3>
            </div>

            {/* Marquee 1: 8 Core Growth Skills */}
            <div className="overflow-hidden py-4 border-y border-c600/30 mb-4" aria-hidden="true">
              <div className="flex gap-4 animate-marquee whitespace-nowrap">
                {[...marketingSkills, ...marketingSkills].map((skill, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-pill bg-c800/80 border border-c600/50 text-xs font-display font-bold uppercase tracking-wider text-c100 select-none hover:border-c400 transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-c100 flex-shrink-0" />
                    <span>{skill}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Marquee 2: Broader Marketing Expertise Marquee */}
            <div className="overflow-hidden py-3 mb-16" aria-hidden="true">
              <div
                className="flex gap-4 animate-marquee whitespace-nowrap"
                style={{ animationDirection: 'reverse', animationDuration: '32s' }}
              >
                {[...expertiseMarquee, ...expertiseMarquee].map((pill, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill bg-c700/40 border border-c600/40 text-[11px] font-body font-semibold uppercase tracking-wider text-c400 select-none"
                  >
                    <span className="w-1 h-1 rounded-full bg-c400/60" />
                    <span>{pill}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* ── Reel / Video Placeholder Strip ───────────────────────────── */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-xs font-display font-bold uppercase tracking-tracked text-c400 block mb-1">
                    CREATIVE VELOCITY
                  </span>
                  <h4 className="font-display font-black text-c100 uppercase tracking-tight text-xl sm:text-2xl">
                    VIDEO &amp; REEL FORMATS
                  </h4>
                </div>
                <span className="text-xs font-body text-c400/80 uppercase tracking-wider hidden sm:inline">
                  HORIZONTAL SCROLL →
                </span>
              </div>

              {/* Responsive Strip: Horizontal Scroll on Mobile, 4-Col Grid on Desktop */}
              <div className="flex overflow-x-auto pb-4 gap-5 no-scrollbar sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible">
                {REEL_ITEMS.map((reel, idx) => (
                  <div
                    key={idx}
                    className="min-w-[240px] sm:min-w-0 flex-shrink-0 rounded-[24px] bg-gradient-to-b from-c800/90 to-c900 border border-c600/50 p-6 flex flex-col justify-between h-[360px] relative overflow-hidden group hover:border-c400/60 hover:shadow-mint-glow transition-all duration-300"
                  >
                    {/* Top Tag & Duration */}
                    <div className="flex items-center justify-between z-10">
                      <span className="px-2.5 py-1 rounded-pill bg-c700/80 text-c400 text-[10px] font-body font-semibold uppercase tracking-wider border border-c600">
                        {reel.category}
                      </span>
                      <span className="text-[11px] font-mono text-c100/70 bg-c900/60 px-2 py-0.5 rounded-pill border border-c600/30">
                        {reel.duration}
                      </span>
                    </div>

                    {/* Center: Play Icon Mockup */}
                    <div className="flex flex-col items-center justify-center my-auto z-10">
                      <div className="w-14 h-14 rounded-full border border-c400/50 bg-c800/80 flex items-center justify-center text-c100 shadow-mint-glow-sm group-hover:scale-110 group-hover:bg-c100 group-hover:text-c900 transition-all duration-300">
                        <Play size={20} className="ml-1" />
                      </div>
                      <span className="mt-3 text-[10px] font-mono uppercase tracking-widest text-c400/80 bg-c900/80 px-2 py-1 rounded border border-c600/40">
                        CONTENT FORMAT
                      </span>
                    </div>

                    {/* Bottom: Title & Note */}
                    <div className="z-10 pt-4 border-t border-c600/30">
                      <h5 className="font-display font-bold text-sm text-c100 uppercase tracking-tight mb-1">
                        {reel.title}
                      </h5>
                      <p className="text-xs text-c100/70 font-body leading-snug line-clamp-2">
                        {reel.note}
                      </p>
                    </div>

                    {/* Background Subtle Mint Glow */}
                    <div
                      className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background:
                          'radial-gradient(circle at 50% 50%, rgba(142,182,155,0.08) 0%, transparent 70%)',
                      }}
                      aria-hidden="true"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── 5. Closing CTA Band ────────────────────────────────────────── */}
          <div className="p-8 sm:p-12 rounded-[32px] glass-card border border-c600/40 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs font-body uppercase tracking-tracked text-c400 block mb-1">
                WANT RESULTS LIKE THESE?
              </span>
              <h3
                className="font-display font-black text-c100 uppercase tracking-tight"
                style={{ fontSize: 'clamp(1.35rem, 3.5vw, 2.2rem)' }}
              >
                GROW YOUR BRAND WITH PRECISION.
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-3.5 w-full md:w-auto">
              <Link
                to="/#contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-pill bg-c100 text-c900 font-body font-bold text-xs uppercase tracking-tracked hover:brightness-105 hover:shadow-mint-glow active:scale-[0.98] transition-all min-h-[44px]"
              >
                <span>GROW MY BRAND</span>
                <ArrowRight size={16} />
              </Link>

              <a
                href={contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-pill border border-c400 text-c100 font-body font-semibold text-xs uppercase tracking-tracked hover:bg-c600/40 hover:border-c100 active:scale-[0.98] transition-all min-h-[44px]"
              >
                <MessageCircle size={16} className="text-c400" />
                <span>WHATSAPP ME</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
