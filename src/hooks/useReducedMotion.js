import { useState, useEffect } from 'react';

/**
 * Hook to detect if the user has requested reduced motion.
 */
export function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const listener = (event) => setReducedMotion(event.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  return reducedMotion;
}

