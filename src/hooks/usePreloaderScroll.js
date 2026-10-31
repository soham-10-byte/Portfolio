import { useState, useEffect, useRef, useCallback } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const INTRO_DURATION = 720;
const EXIT_DURATION = 360;

/** A bounded, low-update intro that always releases the scroll lock on cleanup. */
export function usePreloaderScroll({ onComplete, active }) {
  const reducedMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const hasTriggered = useRef(false);
  const timers = useRef(new Set());

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current.clear();
  }, []);

  const complete = useCallback(() => {
    if (hasTriggered.current) return;
    hasTriggered.current = true;
    setProgress(100);
    setIsFinished(true);

    const timer = setTimeout(() => {
      timers.current.delete(timer);
      onComplete?.();
    }, reducedMotion ? 0 : EXIT_DURATION);
    timers.current.add(timer);
  }, [onComplete, reducedMotion]);

  useEffect(() => {
    if (!active) {
      hasTriggered.current = false;
      setProgress(0);
      setIsFinished(false);
      return undefined;
    }

    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    const lenis = window.__lenis;
    const lenisWasStopped = Boolean(lenis?.isStopped);

    root.style.overflow = 'hidden';
    if (lenis && !lenisWasStopped) lenis.stop();

    const progressTimer = setTimeout(() => setProgress(58), reducedMotion ? 0 : INTRO_DURATION * 0.58);
    const finishTimer = setTimeout(complete, reducedMotion ? 0 : INTRO_DURATION);
    timers.current.add(progressTimer);
    timers.current.add(finishTimer);

    return () => {
      clearTimers();
      root.style.overflow = previousOverflow;
      if (lenis && !lenisWasStopped) lenis.start();
    };
  }, [active, clearTimers, complete, reducedMotion]);

  useEffect(() => {
    if (!active || hasTriggered.current) return undefined;

    const handleKey = (event) => {
      if (event.key === 'Escape' || event.key === 'Enter' || event.key === ' ') {
        complete();
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [active, complete]);

  return { progress, isFinished, triggerOpen: complete };
}
