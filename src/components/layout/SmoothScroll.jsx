import { useEffect } from 'react';
import Lenis from 'lenis';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * SmoothScroll component powered by Lenis.
 * Automatically disabled when user prefers reduced motion.
 */
export default function SmoothScroll({ children }) {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const lenis = new Lenis({
      duration: 0.75,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
      infinite: false,
    });

    let animationFrameId;

    function raf(time) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    // Provide lenis instance to window for anchor links or manual scrolls if needed
    window.__lenis = lenis;

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
      delete window.__lenis;
    };
  }, [reducedMotion]);

  return <>{children}</>;
}

