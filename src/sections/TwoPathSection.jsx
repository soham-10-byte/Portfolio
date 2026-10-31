import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import PillTag from '@/components/ui/PillTag';
import { devProjects, marketingCases, cta } from '@/data/content';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * TwoPathSection Component (id="works")
 * Two tall interactive panels presenting Development and Marketing paths.
 */
export default function TwoPathSection() {
  const reducedMotion = useReducedMotion();

  const handleContactScroll = (e) => {
    e.preventDefault();
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      if (window.__lenis) {
        window.__lenis.scrollTo(contactEl, { offset: -70 });
      } else {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const devCount = `${devProjects.length} PROJECTS`;
  const mktCount = `${marketingCases.length} BRANDS`;

  return (
    <section id="works" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-[1320px] mx-auto z-10">
      {/* Section Header */}
      <div className="flex flex-col items-center md:items-start text-center md:text-left mb-12 sm:mb-16 mx-auto md:mx-0">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-4"
        >
          <PillTag active>CHOOSE YOUR PATH</PillTag>
        </motion.div>

        <div className="overflow-hidden w-full flex justify-center md:justify-start">
          <motion.h2
            initial={reducedMotion ? { opacity: 0 } : { y: '100%' }}
            whileInView={reducedMotion ? { opacity: 1 } : { y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-h2 font-display font-black text-c100 uppercase tracking-tightest leading-tighter text-center md:text-left"
          >
            TWO SIDES.{' '}
            <span className="text-c400 text-glow block sm:inline">ONE BUILDER.</span>
          </motion.h2>
        </div>
      </div>

      {/* Two Tall Interactive Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        
        {/* PANEL 1: THE BUILD SIDE */}
        <Link
          to="/development"
          className="group relative flex flex-col justify-between min-h-[420px] sm:min-h-[480px] p-8 sm:p-12 rounded-[32px] glass-card border border-c600/40 hover:border-c400/60 hover:-translate-y-1.5 hover:shadow-mint-glow transition-all duration-500 overflow-hidden select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-c100"
        >
          {/* Decorative Background Capsule (slides on hover) */}
          <div
            className="absolute -right-16 -top-16 w-64 h-96 rounded-full border border-c600/30 bg-gradient-to-b from-c700/20 to-transparent pointer-events-none transform rotate-12 transition-transform duration-700 ease-out group-hover:translate-x-4 group-hover:-translate-y-4"
            aria-hidden="true"
          />

          {/* Top Row: Giant Outlined Number "01" & Arrow Circle */}
          <div className="relative z-10 flex items-start justify-between">
            <div className="flex flex-col">
              <span className="px-3.5 py-1 rounded-pill bg-c700/60 border border-c600 text-c100 text-xs font-body font-bold tracking-tracked uppercase w-fit mb-3">
                {devCount}
              </span>
              <span className="text-xs uppercase tracking-tracked text-c400 font-body font-semibold">
                FULL-STACK ENGINEERING
              </span>
            </div>

            <div className="flex items-center gap-4">
              {/* Giant outlined number */}
              <span
                className="font-display font-black text-6xl sm:text-7xl select-none leading-none opacity-40 group-hover:opacity-80 transition-opacity"
                style={{
                  WebkitTextStroke: '1.5px #8EB69B',
                  color: 'transparent',
                }}
              >
                01
              </span>

              {/* Arrow Circle (rotates 45deg on hover) */}
              <div className="w-12 h-12 rounded-full border border-c400/40 bg-c800 flex items-center justify-center text-c100 group-hover:rotate-45 group-hover:bg-c100 group-hover:text-c900 group-hover:border-c100 transition-all duration-300 shadow-mint-glow-sm">
                <ArrowUpRight size={22} />
              </div>
            </div>
          </div>

          {/* Middle Content */}
          <div className="relative z-10 my-8 sm:my-10">
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-c100 uppercase tracking-tight mb-3 group-hover:text-glow transition-all">
              THE BUILD SIDE
            </h3>
            <p className="text-sm sm:text-base text-c100/90 font-body leading-relaxed max-w-md mb-6">
              MERN stack products, built end to end. Production architectures, role-based security, and high-performance APIs.
            </p>

            {/* Three Tech Pills */}
            <div className="flex flex-wrap gap-2">
              <span className="px-3.5 py-1 rounded-pill bg-c800/80 border border-c600/60 text-c400 text-xs font-body font-semibold tracking-wider uppercase group-hover:border-c400/50 transition-colors">
                REACT
              </span>
              <span className="px-3.5 py-1 rounded-pill bg-c800/80 border border-c600/60 text-c400 text-xs font-body font-semibold tracking-wider uppercase group-hover:border-c400/50 transition-colors">
                NODE
              </span>
              <span className="px-3.5 py-1 rounded-pill bg-c800/80 border border-c600/60 text-c400 text-xs font-body font-semibold tracking-wider uppercase group-hover:border-c400/50 transition-colors">
                MONGODB
              </span>
            </div>
          </div>

          {/* Bottom Action Pill Button */}
          <div className="relative z-10 pt-4 border-t border-c600/30">
            <div className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-7 py-3.5 rounded-pill bg-c100 text-c900 font-body font-bold text-xs sm:text-sm tracking-tracked uppercase group-hover:shadow-mint-glow group-hover:brightness-105 transition-all">
              <span>EXPLORE DEVELOPMENT</span>
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>
        </Link>

        {/* PANEL 2: THE GROWTH SIDE */}
        <Link
          to="/marketing"
          className="group relative flex flex-col justify-between min-h-[420px] sm:min-h-[480px] p-8 sm:p-12 rounded-[32px] glass-card border border-c600/40 hover:border-c400/60 hover:-translate-y-1.5 hover:shadow-mint-glow transition-all duration-500 overflow-hidden select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-c100"
        >
          {/* Decorative Background Capsule (slides on hover) */}
          <div
            className="absolute -right-16 -top-16 w-64 h-96 rounded-full border border-c600/30 bg-gradient-to-b from-c700/20 to-transparent pointer-events-none transform rotate-12 transition-transform duration-700 ease-out group-hover:translate-x-4 group-hover:-translate-y-4"
            aria-hidden="true"
          />

          {/* Top Row: Giant Outlined Number "02" & Arrow Circle */}
          <div className="relative z-10 flex items-start justify-between">
            <div className="flex flex-col">
              <span className="px-3.5 py-1 rounded-pill bg-c700/60 border border-c600 text-c100 text-xs font-body font-bold tracking-tracked uppercase w-fit mb-3">
                {mktCount}
              </span>
              <span className="text-xs uppercase tracking-tracked text-c400 font-body font-semibold">
                PERFORMANCE & ADS
              </span>
            </div>

            <div className="flex items-center gap-4">
              {/* Giant outlined number */}
              <span
                className="font-display font-black text-6xl sm:text-7xl select-none leading-none opacity-40 group-hover:opacity-80 transition-opacity"
                style={{
                  WebkitTextStroke: '1.5px #8EB69B',
                  color: 'transparent',
                }}
              >
                02
              </span>

              {/* Arrow Circle (rotates 45deg on hover) */}
              <div className="w-12 h-12 rounded-full border border-c400/40 bg-c800 flex items-center justify-center text-c100 group-hover:rotate-45 group-hover:bg-c100 group-hover:text-c900 group-hover:border-c100 transition-all duration-300 shadow-mint-glow-sm">
                <ArrowUpRight size={22} />
              </div>
            </div>
          </div>

          {/* Middle Content */}
          <div className="relative z-10 my-8 sm:my-10">
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-c100 uppercase tracking-tight mb-3 group-hover:text-glow transition-all">
              THE GROWTH SIDE
            </h3>
            <p className="text-sm sm:text-base text-c100/90 font-body leading-relaxed max-w-md mb-6">
              SEO, ads and content that bring in sales. Proven campaigns generating ₹15L+ in monthly sales and scaling multiple brands.
            </p>

            {/* Three Marketing Pills */}
            <div className="flex flex-wrap gap-2">
              <span className="px-3.5 py-1 rounded-pill bg-c800/80 border border-c600/60 text-c400 text-xs font-body font-semibold tracking-wider uppercase group-hover:border-c400/50 transition-colors">
                SEO
              </span>
              <span className="px-3.5 py-1 rounded-pill bg-c800/80 border border-c600/60 text-c400 text-xs font-body font-semibold tracking-wider uppercase group-hover:border-c400/50 transition-colors">
                PERFORMANCE ADS
              </span>
              <span className="px-3.5 py-1 rounded-pill bg-c800/80 border border-c600/60 text-c400 text-xs font-body font-semibold tracking-wider uppercase group-hover:border-c400/50 transition-colors">
                CONTENT
              </span>
            </div>
          </div>

          {/* Bottom Action Pill Button */}
          <div className="relative z-10 pt-4 border-t border-c600/30">
            <div className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-7 py-3.5 rounded-pill bg-c100 text-c900 font-body font-bold text-xs sm:text-sm tracking-tracked uppercase group-hover:shadow-mint-glow group-hover:brightness-105 transition-all">
              <span>EXPLORE MARKETING</span>
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>
        </Link>
      </div>

      {/* Slim Decision Row Beneath Panels */}
      <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 sm:px-8 rounded-pill glass-card border border-c600/30">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <span className="w-2.5 h-2.5 rounded-full bg-c100 animate-pulse hidden sm:inline-block" />
          <span className="font-display font-black text-xs sm:text-sm uppercase tracking-tight text-c100">
            NOT SURE WHERE TO START?
          </span>
          <span className="hidden md:inline text-xs text-c400 font-body">
            Let's discuss whether you need a technical foundation, growth engine, or both.
          </span>
        </div>

        <a
          href="/#contact"
          onClick={handleContactScroll}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-pill border border-c400 text-c100 text-xs font-body font-bold tracking-tracked uppercase hover:bg-c600/40 hover:border-c100 transition-all select-none w-full sm:w-auto justify-center"
        >
          <span>{cta.primary}</span>
          <span>→</span>
        </a>
      </div>
    </section>
  );
}

