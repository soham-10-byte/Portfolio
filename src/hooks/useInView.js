import { useState, useEffect, useRef } from 'react';

/**
 * Hook to detect when an element enters the viewport.
 * @param {Object} options IntersectionObserver options
 * @param {boolean} triggerOnce If true, stays in view after first trigger
 */
export function useInView(options = { threshold: 0.2 }, triggerOnce = true) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        if (triggerOnce) {
          observer.unobserve(el);
        }
      } else if (!triggerOnce) {
        setIsInView(false);
      }
    }, options);

    observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [options.threshold, options.rootMargin, triggerOnce]);

  return [ref, isInView];
}

