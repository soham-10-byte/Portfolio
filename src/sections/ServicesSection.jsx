import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { CheckCircle2, ArrowRight, ArrowUpRight } from 'lucide-react';
import PillTag from '@/components/ui/PillTag';
import Button from '@/components/ui/Button';
import { services, process, cta } from '@/data/content';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

/** Category color accent */
function categoryBadge(category) {
  return category === 'DEVELOPMENT'
    ? 'text-c100 bg-c800/90 border-c600/70'
    : 'text-c400 bg-c700/50 border-c400/40';
}

/** Route target for each service card */
function serviceRoute(number) {
  // Service 01 is Web & App Development -> /development
  // Services 02, 03, 04 are SEO, Ads, Content -> /marketing
  return number === '01' ? '/development' : '/marketing';
}

/**
 * ServicesSection (id="services")
 * 4 cards: Web and App Development, SEO, Performance Ads, Content and Video.
 * Each links to /development or /marketing.
 * Followed by 4-step process: Discover, Plan, Build/Launch, Grow.
 */
export default function ServicesSection() {
  const prefersReduced = useReducedMotion();
  const cardsRef = useRef(null);
  const processRef = useRef(null);
  const cardsInView = useInView(cardsRef, { once: true, margin: '-80px' });
  const processInView = useInView(processRef, { once: true, margin: '-80px' });

  return (
    <section
      id="services"
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-[1320px] mx-auto border-t border-c600/20"
    >
      {/* Header */}
      <div className="max-w-4xl mb-16 flex flex-col items-center md:items-start text-center md:text-left mx-auto md:mx-0">
        <div className="mb-4">
          <PillTag active>SERVICES &amp; EXECUTION</PillTag>
        </div>
        <h2
          className="font-display font-black text-c100 uppercase tracking-tightest leading-tight mb-6"
          style={{ fontSize: 'clamp(2rem, 5.5vw, 3.8rem)' }}
        >
          WHAT I BUILD &amp;{' '}
          <span className="text-c400 text-glow">SCALE</span>
        </h2>
        <p className="text-base sm:text-lg text-c100/90 font-body leading-relaxed max-w-2xl mx-auto md:mx-0">
          End-to-end technical execution combining production MERN stack software engineering with high-velocity organic search and performance marketing funnels.
        </p>
      </div>

      {/* 4 Service Cards Grid */}
      <motion.div
        ref={cardsRef}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24"
        variants={prefersReduced ? {} : containerVariants}
        initial="hidden"
        animate={cardsInView ? 'visible' : 'hidden'}
      >
        {services.map((svc) => {
          const route = serviceRoute(svc.number);

          return (
            <motion.div
              key={svc.number}
              variants={prefersReduced ? {} : itemVariants}
              className="group p-8 sm:p-10 rounded-[30px] glass-card border border-c600/40 hover:border-c400/60 hover:shadow-mint-glow transition-all duration-400 relative overflow-hidden flex flex-col justify-between"
            >
              {/* Subtle Corner Glow on Hover */}
              <div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    'radial-gradient(ellipse 70% 60% at 85% 15%, rgba(142,182,155,0.08) 0%, transparent 70%)',
                }}
                aria-hidden="true"
              />

              <div>
                {/* Header row: Category Badge, Number, and Link Arrow */}
                <div className="flex items-center justify-between mb-5">
                  <span
                    className={cn(
                      'px-3.5 py-1 rounded-pill border text-[11px] font-bold font-body uppercase tracking-wider',
                      categoryBadge(svc.category)
                    )}
                  >
                    {svc.category}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-display font-black text-c600/60 tracking-tight">
                      {svc.number}
                    </span>
                    <Link
                      to={route}
                      className="w-10 h-10 rounded-full border border-c400/40 bg-c800 flex items-center justify-center text-c100 group-hover:bg-c100 group-hover:text-c900 transition-colors"
                      aria-label={`Explore ${svc.title} portfolio`}
                    >
                      <ArrowUpRight size={18} />
                    </Link>
                  </div>
                </div>

                {/* Service Title */}
                <h3 className="text-xl sm:text-2xl font-display font-black text-c100 uppercase tracking-tight mb-3 leading-tight group-hover:text-glow transition-all">
                  {svc.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-c100/85 font-body leading-relaxed mb-6">
                  {svc.description}
                </p>

                {/* Deliverables Checklist */}
                <ul className="flex flex-col gap-2.5 pt-5 border-t border-c600/30">
                  {svc.deliverables.map((d, i) => (
                    <li key={i} className="flex items-center gap-2.5">
                      <CheckCircle2
                        size={14}
                        className="text-c400 flex-shrink-0"
                        aria-hidden="true"
                      />
                      <span className="text-xs sm:text-sm text-c100/80 font-body">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Card Action Link */}
              <div className="pt-6 mt-6 border-t border-c600/20 flex items-center justify-between">
                <Link
                  to={route}
                  className="inline-flex items-center gap-2 text-xs font-body font-bold uppercase tracking-tracked text-c400 group-hover:text-c100 transition-colors"
                >
                  <span>
                    {svc.number === '01' ? 'EXPLORE DEV WORK' : 'EXPLORE CASE STUDIES'}
                  </span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* 4-Step Process: Discover, Plan, Build/Launch, Grow */}
      <div ref={processRef} className="pt-8 border-t border-c600/30">
        <div className="max-w-2xl mb-10 flex flex-col items-center md:items-start text-center md:text-left mx-auto md:mx-0">
          <PillTag>METHODOLOGY</PillTag>
          <h3
            className="font-display font-black text-c100 uppercase tracking-tight mt-3 text-2xl sm:text-3xl"
          >
            THE 4-STEP{' '}
            <span className="text-c400 text-glow">DELIVERY PROCESS</span>
          </h3>
          <p className="text-sm text-c100/80 font-body mt-2">
            Structured execution from architectural blueprinting to live commercial deployment and iteration.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10"
          variants={prefersReduced ? {} : containerVariants}
          initial="hidden"
          animate={processInView ? 'visible' : 'hidden'}
        >
          {process.map((step, i) => (
            <motion.div
              key={step.step}
              variants={prefersReduced ? {} : itemVariants}
              className="relative p-6 sm:p-7 rounded-[24px] glass-card border border-c600/40 hover:border-c400/50 transition-colors"
            >
              {/* Step number badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-display font-black text-c400 tracking-tracked uppercase bg-c800/80 px-2.5 py-1 rounded-pill border border-c600/50">
                  STEP {step.step}
                </span>
                {i < process.length - 1 && (
                  <span className="text-c600 font-mono text-xs hidden lg:inline" aria-hidden="true">
                    →
                  </span>
                )}
              </div>

              {/* Step name */}
              <h4 className="text-lg font-display font-black text-c100 uppercase tracking-tight mb-2">
                {step.name}
              </h4>

              {/* Step description */}
              <p className="text-xs sm:text-sm text-c100/75 font-body leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Action Row beneath Process */}
        <div className="flex flex-wrap items-center gap-4">
          <Button href="/#contact" variant="primary" size="lg">
            {cta.primary}
          </Button>
          <Button href="/development" variant="outline" size="lg">
            VIEW DEV PROJECTS
          </Button>
          <Button href="/marketing" variant="ghost" size="lg">
            VIEW MARKETING CASES →
          </Button>
        </div>
      </div>
    </section>
  );
}
