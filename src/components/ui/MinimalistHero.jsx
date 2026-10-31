import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, ArrowRight, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useMagnetic } from '@/hooks/useMagnetic';

/**
 * Helper: NavLink
 * @param {{ href: string, label: string, onClick?: () => void, className?: string }} props
 */
function NavLink({ href, label, onClick, className = '' }) {
  const handleClick = (e) => {
    if (onClick) onClick();
    if (href.startsWith('#') || href.startsWith('/#')) {
      e.preventDefault();
      const targetId = href.replace('/#', '').replace('#', '');
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        if (window.__lenis) {
          window.__lenis.scrollTo(targetEl, { offset: -70 });
        } else {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={cn(
        'group flex items-center gap-2 text-xs md:text-sm font-body font-semibold uppercase tracking-tracked text-c400 hover:text-c100 transition-colors py-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-c100 rounded-sm select-none',
        className
      )}
    >
      <span className="w-2 h-2 rounded-[2px] border border-c400/40 group-hover:border-c100 group-hover:bg-c100 group-hover:shadow-[0_0_8px_rgba(218,241,222,0.8)] transition-all" />
      <span>{label}</span>
    </a>
  );
}

/**
 * Helper: SocialIcon
 * @param {{ icon: React.ComponentType<{ size: number, className: string }>, href: string, label?: string }} props
 */
function SocialIcon({ icon: Icon, href, label }) {
  if (!Icon) return null;
  const isPlaceholder = href === '[PLACEHOLDER URL]' || !href;

  return (
    <a
      href={isPlaceholder ? '#contact' : href}
      target={isPlaceholder || href.startsWith('#') || href.startsWith('mailto:') ? undefined : '_blank'}
      rel="noopener noreferrer"
      className="p-2.5 rounded-full border border-c600/60 bg-c800/80 text-c400 hover:text-c100 hover:border-c400 hover:shadow-mint-glow-sm hover:scale-105 active:scale-95 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-c100"
      aria-label={label || 'Social channel link'}
    >
      <Icon size={16} className="transition-transform group-hover:scale-110" />
    </a>
  );
}

/**
 * MinimalistHero Component
 * 3-Column Editorial Hero with mint circle, male portrait cutout, floating stat badges,
 * and high-impact overlay headline.
 *
 * @param {Object} props
 * @param {string} props.logoText - Main brand wordmark
 * @param {Array<{ label: string, href: string }>} props.navLinks - Nav items
 * @param {string} props.mainText - Supporting narrative paragraph
 * @param {string} props.readMoreLink - Link to about section
 * @param {string} props.imageSrc - Cutout portrait image URL
 * @param {string} props.imageAlt - Alt text for portrait
 * @param {{ part1: string, part2: string }} props.overlayText - Two-line giant headline
 * @param {Array<{ icon: any, href: string, label?: string }>} props.socialLinks - Bottom social items
 * @param {string} props.locationText - Bottom right location / status text
 * @param {string} [props.className] - Optional container class
 * @param {{ label: string, href: string }} [props.primaryCta] - Primary action CTA
 * @param {{ label: string, href: string }} [props.secondaryCta] - Secondary action CTA
 * @param {Array<{ label: string, value: string }>} [props.floatingBadges] - Floating metric pill badges
 * @param {boolean} [props.startAnimations=true] - Trigger entry animations when preloader reveals
 */
export default function MinimalistHero({
  logoText = 'SOHAM SEN',
  navLinks = [
    { label: 'HOME', href: '#home' },
    { label: 'WORKS', href: '#works' },
    { label: 'ABOUT', href: '#about' },
    { label: 'SKILLS', href: '#skills' },
    { label: 'SERVICES', href: '#services' },
    { label: 'CONTACT', href: '#contact' },
  ],
  mainText = 'MERN stack developer and growth marketer. I build full-stack products and run the SEO, ads and content that bring customers to them.',
  readMoreLink = '#about',
  imageSrc = '/images/soham-cartoon-portrait.png',
  imageAlt = 'Portrait of Soham Sen',
  overlayText = { part1: 'PRODUCT', part2: '+ BUZZ.' },
  socialLinks = [],
  locationText = 'Based in India',
  className = '',
  primaryCta = { label: "LET'S WORK TOGETHER", href: '#contact' },
  secondaryCta = { label: 'VIEW MY WORK', href: '#works' },
  floatingBadges = [
    { value: '₹15L+', label: 'monthly sales' },
    { value: '15+', label: 'brands grown' },
    { value: '12+', label: 'engineering projects' },
  ],
  startAnimations = true,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [imgSource, setImgSource] = useState(imageSrc);
  const reducedMotion = useReducedMotion();
  const primaryMagneticRef = useMagnetic(!reducedMotion);

  // Fall back to local silhouette SVG if user has not yet uploaded their personal photo
  const handleImageError = () => {
    // [PLACEHOLDER: add photo - fallback to local stylized silhouette SVG]
    setImgSource('/images/hero-placeholder.svg');
  };

  const smoothScrollTo = (e, href) => {
    if (href.startsWith('#') || href.startsWith('/#')) {
      e.preventDefault();
      const targetId = href.replace('/#', '').replace('#', '');
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        if (window.__lenis) {
          window.__lenis.scrollTo(targetEl, { offset: -70 });
        } else {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  // Easing specification: [0.22, 1, 0.36, 1]
  const easeCurve = [0.22, 1, 0.36, 1];
  const copyRevealClass = !reducedMotion && startAnimations ? 'hero-copy-reveal' : '';
  const copyRevealDelay = (milliseconds) => ({ '--hero-copy-delay': `${milliseconds}ms` });

  return (
    <section
      id="home"
      className={cn(
        'relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-c900 text-c100 pt-6 pb-8 px-4 sm:px-6 lg:px-12 selection:bg-c100 selection:text-c900',
        className
      )}
    >
      {/* Background Effect: Ambient mint spotlight beam from top-left */}
      <div
        className="absolute top-0 left-0 w-full h-[650px] light-beam pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Background Effect: Subtle floating particles (CSS-only & aria-hidden) */}
      {!reducedMotion && (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
          <div className="absolute top-1/4 left-1/6 w-1.5 h-1.5 rounded-full bg-c100/30 animate-float-1" />
          <div className="absolute top-1/3 right-1/4 w-2 h-2 rounded-full bg-c400/25 animate-float-2" />
          <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 rounded-full bg-c100/20 animate-float-3" />
          <div className="absolute top-2/3 right-1/6 w-2 h-2 rounded-full bg-c400/30 animate-float-1" />
        </div>
      )}

      {/* =========================================================================
          1. TOP BAR
         ========================================================================= */}
      <header className="relative z-20 w-full flex items-center justify-between py-2 border-b border-c600/30">
        {/* Wordmark in the display face and primary text color */}
        <motion.div
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, x: -30 }}
          animate={startAnimations ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: reducedMotion ? 0 : 0.5, ease: easeCurve }}
          className="flex items-center gap-3"
        >
          <a
            href="#home"
            onClick={(e) => smoothScrollTo(e, '#home')}
            className="group flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-c100 rounded-pill p-1"
          >
            <div className="w-7 h-10 rounded-full border border-c400/50 bg-c800 p-0.5 flex flex-col items-center justify-center group-hover:border-c100 group-hover:shadow-mint-glow-sm transition-all">
              <div className="w-3.5 h-5 rounded-full bg-c100 flex items-center justify-center">
                <div className="w-1.5 h-2.5 rounded-full bg-c900" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-c100 tracking-tight text-lg md:text-xl group-hover:text-glow transition-all">
                <span className="hidden sm:inline">{logoText}</span>
                <span className="sm:hidden">SS.</span>
              </span>
              <span className="text-[9px] tracking-tracked text-c400 font-body uppercase -mt-0.5">
                MERN + GROWTH
              </span>
            </div>
          </a>
        </motion.div>

        {/* Desktop Nav Links */}
        <motion.nav
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, x: 30 }}
          animate={startAnimations ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
          transition={{ duration: reducedMotion ? 0 : 0.5, ease: easeCurve }}
          className="hidden md:flex items-center gap-6 lg:gap-8 px-6 py-2 rounded-pill bg-c800/70 border border-c600/40 backdrop-blur-md"
        >
          {navLinks.map((item) => (
            <NavLink key={item.label} href={item.href} label={item.label} />
          ))}
        </motion.nav>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-pill border border-c600/60 bg-c800/90 text-c100 hover:border-c400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-c100"
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Fullscreen Animated Overlay Menu */}
        <div
          className={cn(
            'fixed inset-0 z-50 bg-c900/98 backdrop-blur-2xl flex flex-col justify-between p-8 md:hidden transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]',
            mobileMenuOpen
              ? 'opacity-100 pointer-events-auto translate-y-0'
              : 'opacity-0 pointer-events-none -translate-y-8'
          )}
        >
          <div className="flex items-center justify-between border-b border-c600/30 pb-4">
            <span className="font-display font-black text-c100 text-lg">SOHAM SEN</span>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-full border border-c600 bg-c800 text-c100"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex flex-col gap-5 py-8">
            {navLinks.map((item) => (
              <NavLink
                key={item.label}
                href={item.href}
                label={item.label}
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-display font-black tracking-tight"
              />
            ))}
          </nav>

          <div className="flex flex-col gap-4 border-t border-c600/30 pt-6">
            <a
              href="#contact"
              onClick={(e) => {
                setMobileMenuOpen(false);
                smoothScrollTo(e, '#contact');
              }}
              className="w-full py-4 text-center rounded-pill bg-c100 text-c900 font-body font-bold text-sm tracking-tracked uppercase hover:shadow-mint-glow transition-all"
            >
              {primaryCta.label} →
            </a>
            <p className="text-center text-xs text-c400 uppercase tracking-tracked">
              {locationText} • MERN & GROWTH MARKETER
            </p>
          </div>
        </div>
      </header>

      {/* =========================================================================
          2. MAIN 3-COLUMN HERO SECTION
         ========================================================================= */}
      <div className="relative z-10 w-full flex-1 flex flex-col lg:grid lg:grid-cols-12 items-center gap-8 lg:gap-4 my-auto py-8">
        
        {/* =====================================================================
            LEFT COLUMN (Desktop col-span-4 / Mobile order-3):
            Pill tag, Tagline <p>, mainText, readMore link, CTAs & resume
           ===================================================================== */}
        <motion.div
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
          animate={startAnimations ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: reducedMotion ? 0 : 0.58, delay: reducedMotion ? 0 : 0.08, ease: easeCurve }}
          className="w-full lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left justify-center order-3 lg:order-1 max-w-xl lg:max-w-none mx-auto lg:mx-0"
        >
          {/* Small pill tag */}
          <div style={copyRevealDelay(0)} className={cn('inline-flex items-center gap-2 px-3.5 py-1.5 rounded-pill border border-c600 bg-c800/80 text-c100 text-[11px] tracking-tracked uppercase font-body mb-4 select-none', copyRevealClass)}>
            <span className="w-1.5 h-3 rounded-full bg-c100" />
            <span>DEVELOPER + GROWTH MARKETER</span>
          </div>

          {/* Tagline (<p> element as specified in accessibility rules) */}
          <p style={copyRevealDelay(75)} className={cn('text-xl md:text-2xl font-display font-black text-c100 uppercase tracking-tightest mb-3 leading-tight', copyRevealClass)}>
            I build the product.
            <br />
            <span className="text-c400 text-glow">I build the buzz.</span>
          </p>

          {/* Main narrative text - high readability pale mint */}
          <p style={copyRevealDelay(140)} className={cn('text-sm md:text-base text-c100/90 font-body leading-relaxed mb-4', copyRevealClass)}>
            {mainText}
          </p>

          {/* "About me" Read more link */}
          <a
            href={readMoreLink}
            onClick={(e) => smoothScrollTo(e, readMoreLink)}
            style={copyRevealDelay(205)}
            className={cn('group inline-flex items-center gap-1.5 text-xs uppercase tracking-tracked font-body font-bold text-c100 hover:text-c400 hover:text-glow mb-8 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-c100 rounded-sm', copyRevealClass)}
          >
            <span>About me</span>
            <ArrowRight size={14} className="text-c100 group-hover:text-c400 transition-transform group-hover:translate-x-1" />
          </a>

          {/* CTAs under the left paragraph */}
          <div style={copyRevealDelay(270)} className={cn('w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3.5 mb-3', copyRevealClass)}>
            {/* Primary Pill Button */}
            <a
              ref={primaryMagneticRef}
              href={primaryCta.href}
              onClick={(e) => smoothScrollTo(e, primaryCta.href)}
              className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-pill bg-c100 text-c900 font-body font-bold text-xs md:text-sm tracking-tracked uppercase hover:shadow-mint-glow hover:brightness-105 active:scale-[0.98] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-c100"
            >
              <span>{primaryCta.label}</span>
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>

            {/* Secondary Outlined Pill */}
            <a
              href={secondaryCta.href}
              onClick={(e) => smoothScrollTo(e, secondaryCta.href)}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-pill border border-c400 text-c100 font-body font-semibold text-xs md:text-sm tracking-tracked uppercase hover:bg-c600/40 hover:border-c100 active:scale-[0.98] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-c100"
            >
              <span>{secondaryCta.label}</span>
            </a>
          </div>

          {/* Small DOWNLOAD RESUME text link beneath CTAs */}
          <a
            href="/Soham-Sen-Resume.pdf"
            download
            style={copyRevealDelay(330)}
            className={cn('inline-flex items-center justify-center lg:justify-start gap-1.5 text-xs text-c400 hover:text-c100 transition-colors uppercase tracking-tracked font-body mt-1 ml-1 group', copyRevealClass)}
          >
            <FileText size={13} className="text-c400 group-hover:text-c100 transition-colors" />
            <span className="underline underline-offset-4 decoration-c400/40 group-hover:decoration-c100">
              DOWNLOAD RESUME
            </span>
          </a>
        </motion.div>

        {/* =====================================================================
            CENTER COLUMN (Desktop col-span-4 / Mobile order-1):
            Centered portrait artwork with a rotating outline ring
           ===================================================================== */}
        <div className="relative w-full lg:col-span-4 flex items-end justify-center order-1 lg:order-2 h-[340px] sm:h-[420px] lg:h-[500px]">
          
          {/* Cutout Portrait Wrapper (Tall enough that shoulders touch the bottom edge) */}
          <motion.div
            initial={reducedMotion ? { y: 0, scale: 1, opacity: 1 } : { y: 24, scale: 0.985, opacity: 0 }}
            animate={startAnimations ? { y: 0, scale: 1, opacity: 1 } : { y: 24, scale: 0.985, opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.68, delay: reducedMotion ? 0 : 0.02, ease: easeCurve }}
            className="relative z-10 w-[260px] sm:w-[340px] lg:w-[410px] h-full flex items-end justify-center pointer-events-none"
          >
            <img
              src={imgSource}
              alt={imageAlt}
              onError={handleImageError}
              className="w-full h-full object-contain object-bottom portrait-duotone select-none"
              style={{
                maxHeight: '100%',
              }}
            />
          </motion.div>

        </div>

        {/* =====================================================================
            RIGHT COLUMN (Desktop col-span-4 / Mobile order-2):
            Giant overlay headline in two lines, overlapping the circle's edge.
            Single H1 for accessibility!
           ===================================================================== */}
        <motion.div
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          animate={startAnimations ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: reducedMotion ? 0 : 0.58, delay: reducedMotion ? 0 : 0.18, ease: easeCurve }}
            className="w-full lg:col-span-4 flex flex-col justify-center items-center lg:items-start text-center lg:text-left order-2 lg:order-3 z-20 pointer-events-none select-none"
        >
          <h1 className="w-full max-w-full font-display font-black uppercase text-c100 text-[clamp(2.75rem,4.6vw,5.25rem)] tracking-[-0.055em] leading-[0.98]">
            <span className="block text-c100">{overlayText.part1}</span>
            <span className="block whitespace-nowrap text-c100">
              {overlayText.part2.startsWith('+ ') && (
                <span className="mr-1 inline-block align-[0.18em] text-[0.55em] font-medium text-c400">+</span>
              )}
              {overlayText.part2.replace(/^\+\s*/, '')}
            </span>
          </h1>
        </motion.div>
      </div>

      {/* A single, responsive metric row keeps the proof points clear of the artwork. */}
      <motion.div
        initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
        animate={startAnimations ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: reducedMotion ? 0 : 0.5, delay: reducedMotion ? 0 : 0.28, ease: easeCurve }}
        className="relative z-20 mx-auto mb-6 flex w-full max-w-3xl flex-wrap justify-center gap-2.5 sm:mb-8"
      >
        {floatingBadges.map((badge, index) => (
          <div
            key={`${badge.label}-${index}`}
            className="inline-flex min-h-11 items-center gap-2.5 rounded-pill border border-c600/50 bg-c800/80 px-4 py-2"
          >
            <span className="font-display text-sm font-bold text-c100">{badge.value}</span>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-c400">{badge.label}</span>
          </div>
        ))}
      </motion.div>

      {/* =========================================================================
          3. BOTTOM BAR
         ========================================================================= */}
      <motion.footer
        initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
        animate={startAnimations ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.45, delay: reducedMotion ? 0 : 0.34, ease: easeCurve }}
        className="relative z-20 w-full flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-c600/30"
      >
        {/* Left: Social Icons */}
        <div className="flex items-center gap-2.5">
          {socialLinks.map((item, index) => (
            <SocialIcon
              key={item.label || index}
              icon={item.icon}
              href={item.href}
              label={item.label}
            />
          ))}
        </div>

        {/* Right: Location & Hiring Status */}
        <div className="flex items-center gap-3 text-xs tracking-tracked text-c400 font-body uppercase font-medium">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-c100 animate-pulse" />
            <span className="text-c100 font-semibold">AVAILABLE FOR SELECT ROLES</span>
          </span>
          <span className="text-c600">•</span>
          <span className="text-c400">{locationText}</span>
        </div>
      </motion.footer>
    </section>
  );
}
