import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cta } from '@/data/content';
import Button from '@/components/ui/Button';

/**
 * Multi-Page Global Sticky Navigation
 * - Supports in-page section scrolling on Home ('/')
 * - Cross-page anchor navigation from other routes ('/#section')
 * - Direct route links: DEVELOPMENT (/development) & MARKETING (/marketing)
 * - 12px square markers (filled = active, outlined = inactive)
 * - Responsive mobile drawer
 */
export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === '/';
  const isDevActive = location.pathname.startsWith('/development');
  const isMktActive = location.pathname.startsWith('/marketing');

  useEffect(() => {
    const handleScroll = () => {
      // On Home, glide down after hero
      // On subpages, always keep visible with dark background
      if (isHome) {
        setScrolled(window.scrollY > 120);
      } else {
        setScrolled(true);
      }

      if (isHome) {
        const sections = ['home', 'works', 'about', 'skills', 'services', 'contact'];
        const scrollPosition = window.scrollY + 220;

        for (let i = sections.length - 1; i >= 0; i--) {
          const el = document.getElementById(sections[i]);
          if (el && el.offsetTop <= scrollPosition) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  // Handle hash scrolling when arriving from another page
  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          if (window.__lenis) {
            window.__lenis.scrollTo(el, { offset: -70 });
          } else {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 100);
    }
  }, [location]);

  // Lock body scroll on mobile menu open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  const handleAnchorClick = (e, targetHash) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (isHome) {
      const targetEl = document.getElementById(targetHash);
      if (targetEl) {
        if (window.__lenis) {
          window.__lenis.scrollTo(targetEl, { offset: -70 });
        } else {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      navigate(`/#${targetHash}`);
    }
  };

  const navLinks = [
    { label: 'HOME', hash: 'home' },
    { label: 'WORKS', hash: 'works' },
    { label: 'ABOUT', hash: 'about' },
    { label: 'SKILLS', hash: 'skills' },
    { label: 'SERVICES', hash: 'services' },
    { label: 'CONTACT', hash: 'contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled || !isHome
          ? 'bg-c900/90 backdrop-blur-md border-b border-c600/30 py-3 shadow-[0_10px_30px_rgba(5,31,32,0.7)] translate-y-0 opacity-100'
          : '-translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Brand Logo & Wordmark */}
        <Link
          to="/"
          onClick={(e) => handleAnchorClick(e, 'home')}
          className="group flex items-center gap-3 select-none"
          aria-label="Soham Sen Home"
        >
          <div className="relative w-7 h-10 rounded-full border border-c400/40 bg-c800/80 p-0.5 flex flex-col items-center justify-center group-hover:border-c100 group-hover:shadow-mint-glow-sm transition-all duration-300">
            <div className="w-3.5 h-5 rounded-full bg-c100 flex items-center justify-center">
              <div className="w-1.5 h-2.5 rounded-full bg-c900" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-black text-c100 tracking-tight text-base group-hover:text-glow transition-all">
              SOHAM SEN
            </span>
            <span className="text-[9px] tracking-tracked text-c400 font-body uppercase -mt-0.5">
              DEV + GROWTH
            </span>
          </div>
        </Link>

        {/* Center: Desktop Nav Links with 12px Square Markers */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 px-3 xl:px-4 py-1.5 rounded-pill bg-c800/70 border border-c600/30 backdrop-blur-sm">
          {/* Main section anchors */}
          {navLinks.map((item) => {
            const isActive = isHome && activeSection === item.hash;

            return (
              <a
                key={item.label}
                href={`/#${item.hash}`}
                onClick={(e) => handleAnchorClick(e, item.hash)}
                className={`flex items-center gap-1.5 xl:gap-2 px-2.5 xl:px-3 py-1.5 rounded-pill text-[11px] xl:text-xs font-body font-semibold tracking-tracked transition-all duration-200 select-none ${
                  isActive
                    ? 'text-c100 bg-c700/60'
                    : 'text-c400 hover:text-c100 hover:bg-c700/30'
                }`}
              >
                <span
                  className={`w-2.5 h-2.5 rounded-[2px] transition-all duration-300 ${
                    isActive
                      ? 'bg-c100 shadow-[0_0_8px_rgba(218,241,222,0.8)] border border-c100'
                      : 'border border-c400/40 bg-transparent'
                  }`}
                  aria-hidden="true"
                />
                <span>{item.label}</span>
              </a>
            );
          })}

          <div className="w-px h-4 bg-c600/40 mx-0.5 xl:mx-1" aria-hidden="true" />

          {/* Dedicated multi-page path pills: DEVELOPMENT & MARKETING */}
          <Link
            to="/development"
            className={`flex items-center gap-1.5 xl:gap-2 px-3 xl:px-3.5 py-1.5 rounded-pill text-[11px] xl:text-xs font-body font-bold tracking-tracked transition-all duration-200 select-none ${
              isDevActive
                ? 'text-c100 bg-c700/80 border border-c400/50 shadow-mint-glow-sm'
                : 'text-c400 hover:text-c100 hover:bg-c700/30'
            }`}
          >
            <span
              className={`w-2.5 h-2.5 rounded-[2px] transition-all duration-300 ${
                isDevActive
                  ? 'bg-c100 shadow-[0_0_8px_rgba(218,241,222,0.8)] border border-c100'
                  : 'border border-c400/40 bg-transparent'
              }`}
              aria-hidden="true"
            />
            <span>DEVELOPMENT</span>
          </Link>

          <Link
            to="/marketing"
            className={`flex items-center gap-1.5 xl:gap-2 px-3 xl:px-3.5 py-1.5 rounded-pill text-[11px] xl:text-xs font-body font-bold tracking-tracked transition-all duration-200 select-none ${
              isMktActive
                ? 'text-c100 bg-c700/80 border border-c400/50 shadow-mint-glow-sm'
                : 'text-c400 hover:text-c100 hover:bg-c700/30'
            }`}
          >
            <span
              className={`w-2.5 h-2.5 rounded-[2px] transition-all duration-300 ${
                isMktActive
                  ? 'bg-c100 shadow-[0_0_8px_rgba(218,241,222,0.8)] border border-c100'
                  : 'border border-c400/40 bg-transparent'
              }`}
              aria-hidden="true"
            />
            <span>MARKETING</span>
          </Link>
        </nav>

        {/* Right: Desktop CTA & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Button
            href="/#contact"
            onClick={(e) => handleAnchorClick(e, 'contact')}
            variant="primary"
            size="sm"
            icon="right"
            className="hidden sm:inline-flex"
          >
            {cta.navPill}
          </Button>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-pill border border-c600/40 bg-c800/80 text-c100 hover:border-c400 transition-colors focus-visible:outline-none"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Fullscreen Overlay Menu */}
      <div
        className={`fixed inset-0 z-40 bg-c900/98 backdrop-blur-2xl flex flex-col justify-between p-8 lg:hidden transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-8'
        }`}
        style={{ top: '60px', height: 'calc(100vh - 60px)' }}
      >
        <div className="flex flex-col gap-6 pt-4 overflow-y-auto">
          <span className="text-xs tracking-tracked text-c400 font-body uppercase">
            PORTFOLIO PATHS
          </span>

          {/* Primary Mobile Path Links */}
          <div className="grid grid-cols-2 gap-3">
            <Link
              to="/development"
              onClick={() => setMobileMenuOpen(false)}
              className={`p-4 rounded-card border text-left flex flex-col justify-between ${
                isDevActive
                  ? 'border-c100 bg-c700/60 text-c100'
                  : 'border-c600/50 bg-c800/60 text-c400'
              }`}
            >
              <span className="font-display font-black text-sm text-c100">DEVELOPMENT</span>
              <span className="text-[10px] text-c400 font-body uppercase mt-1">12+ Engineering Projects →</span>
            </Link>

            <Link
              to="/marketing"
              onClick={() => setMobileMenuOpen(false)}
              className={`p-4 rounded-card border text-left flex flex-col justify-between ${
                isMktActive
                  ? 'border-c100 bg-c700/60 text-c100'
                  : 'border-c600/50 bg-c800/60 text-c400'
              }`}
            >
              <span className="font-display font-black text-sm text-c100">MARKETING</span>
              <span className="text-[10px] text-c400 font-body uppercase mt-1">15+ Brands Grown →</span>
            </Link>
          </div>

          <span className="text-xs tracking-tracked text-c400 font-body uppercase mt-2">
            PAGE SECTIONS
          </span>

          {/* Section Anchors */}
          <nav className="flex flex-col gap-2.5">
            {navLinks.map((item) => {
              const isActive = isHome && activeSection === item.hash;

              return (
                <a
                  key={item.label}
                  href={`/#${item.hash}`}
                  onClick={(e) => handleAnchorClick(e, item.hash)}
                  className={`flex items-center gap-4 py-2.5 text-xl font-display font-black tracking-tight uppercase transition-all ${
                    isActive ? 'text-c100 text-glow pl-2' : 'text-c400 hover:text-c100'
                  }`}
                >
                  <span
                    className={`w-3 h-3 rounded-[2px] ${
                      isActive
                        ? 'bg-c100 shadow-[0_0_12px_rgba(218,241,222,0.9)]'
                        : 'border border-c400/50'
                    }`}
                  />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>
        </div>

        <div className="pt-4 border-t border-c600/30 flex flex-col gap-3">
          <Button
            href="/#contact"
            onClick={(e) => handleAnchorClick(e, 'contact')}
            variant="primary"
            size="lg"
            className="w-full text-center"
          >
            {cta.primary}
          </Button>

          <p className="text-center text-[11px] text-c400 uppercase tracking-tracked">
            SOHAM SEN • MERN DEVELOPER & GROWTH MARKETER
          </p>
        </div>
      </div>
    </header>
  );
}
