import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SmoothScroll from '@/components/layout/SmoothScroll';
import Cursor from '@/components/layout/Cursor';
import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import Preloader from '@/components/layout/Preloader';
import { PreloaderProvider, usePreloader } from '@/context/PreloaderContext';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * Inner layout that consumes PreloaderContext to apply scale and brightness
 * to the underlying website as the shutter rolls open.
 */
function LayoutInner() {
  const location = useLocation();
  const reducedMotion = useReducedMotion();

  // One pair of native observers reveals each semantic section once as it enters view.
  useEffect(() => {
    const root = document.documentElement;
    const appRoot = document.getElementById('root');

    if (reducedMotion || !('IntersectionObserver' in window) || !appRoot) {
      root.classList.remove('scroll-reveal-ready');
      return undefined;
    }

    root.classList.add('scroll-reveal-ready');

    const observed = new WeakSet();
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.setAttribute('data-scroll-visible', 'true');
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    const observeSection = (element) => {
      if (observed.has(element)) return;
      observed.add(element);
      revealObserver.observe(element);
    };

    const scanForSections = (node) => {
      if (!(node instanceof Element)) return;
      if (node.matches('section:not(#home)')) observeSection(node);
      node.querySelectorAll('section:not(#home)').forEach(observeSection);
    };

    scanForSections(appRoot);

    const pageObserver = new MutationObserver((records) => {
      records.forEach((record) => record.addedNodes.forEach(scanForSections));
    });
    pageObserver.observe(appRoot, { childList: true, subtree: true });

    return () => {
      pageObserver.disconnect();
      revealObserver.disconnect();
      root.classList.remove('scroll-reveal-ready');
    };
  }, [reducedMotion]);

  // Scroll to top on route change (unless navigating to a hash anchor)
  useEffect(() => {
    if (!location.hash) {
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    }
  }, [location.pathname]);

  const pageVariants = {
    initial: reducedMotion ? { opacity: 1 } : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    exit: reducedMotion ? { opacity: 1 } : { opacity: 0, y: -16 },
  };

  return (
    <div className="relative min-h-screen bg-c900 text-c100 overflow-x-hidden selection:bg-c100 selection:text-c900 flex flex-col justify-between">
      {/* 1. Scroll-Driven Shutter Preloader (Mounts above everything, Home route only) */}
      <Preloader />

      {/* 2. Custom Mint Ring Cursor (Desktop pointer only) */}
      <Cursor />

      {/* 3. Global Multi-Page Navigation Bar */}
      <Nav />

      {/* 4. Page Content with Route Transition */}
      <div className="flex-1 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 5. Global Footer */}
      <Footer />
    </div>
  );
}

/**
 * Shared Application Layout
 * Wrapped with Lenis SmoothScroll and PreloaderProvider.
 */
export default function Layout() {
  return (
    <SmoothScroll>
      <PreloaderProvider>
        <LayoutInner />
      </PreloaderProvider>
    </SmoothScroll>
  );
}
