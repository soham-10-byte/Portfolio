import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePreloaderScroll } from '@/hooks/usePreloaderScroll';
import { usePreloader } from '@/context/PreloaderContext';

/**
 * Short, low-motion intro. The progress indicator is a single composited layer.
 */
export default function Preloader() {
  const { showPreloader, completePreloader } = usePreloader();
  const [isUnmounted, setIsUnmounted] = useState(false);

  const handleComplete = useCallback(() => {
    completePreloader();
    setIsUnmounted(true);
  }, [completePreloader]);

  const { progress, isFinished, triggerOpen } = usePreloaderScroll({
    active: showPreloader && !isUnmounted,
    onComplete: handleComplete,
  });

  if (!showPreloader || isUnmounted) {
    return null;
  }

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          onClick={triggerOpen}
          role="button"
          tabIndex={0}
          aria-label="Skip intro"
          className="fixed inset-0 z-[10001] w-screen h-[100dvh] flex flex-col items-center justify-center bg-c900 text-c100 select-none cursor-pointer"
        >
          {/* Subtle ambient mint glow in background */}
          <div
            className="absolute w-[min(70vw,360px)] aspect-square rounded-full bg-c400/5 blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col items-center justify-center p-6 max-w-sm w-full">
            {/* Brand Title */}
            <h1 className="font-display font-bold text-xl sm:text-2xl text-c100 tracking-tight">
              SOHAM SEN
            </h1>

            {/* Subtitle */}
            <p className="text-[10px] tracking-[0.2em] text-c300 font-body uppercase mt-2 mb-8">
              DEVELOPER + GROWTH MARKETER
            </p>

            {/* Clean Progress Bar */}
            <div className="w-48 sm:w-56 h-px rounded-pill bg-c700 overflow-hidden" role="progressbar" aria-label="Portfolio loading" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
              <div
                className="h-full w-full origin-left rounded-pill bg-c100 transition-transform duration-500 ease-out"
                style={{ transform: `scaleX(${progress / 100})` }}
              />
            </div>

            <span className="font-mono text-[10px] text-c300 tracking-[0.16em] mt-3" aria-live="polite">
              {progress < 100 ? 'PREPARING' : 'READY'}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
