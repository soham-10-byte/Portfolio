import { useRef, useEffect } from 'react';

/**
 * Hook to apply a subtle magnetic pull to interactive buttons.
 * Radius: 80px, Strength: 0.25 (as specified in DESIGN.md)
 */
export function useMagnetic(enabled = true, strength = 0.25, radius = 80) {
  const ref = useRef(null);

  useEffect(() => {
    if (!enabled || !ref.current) return;
    const el = ref.current;

    // Check if pointer is fine (desktop mouse)
    const isPointerFine = window.matchMedia('(pointer: fine)').matches;
    if (!isPointerFine) return;

    let rafId = null;

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.hypot(distX, distY);

      if (distance < radius) {
        const moveX = distX * strength;
        const moveY = distY * strength;
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          el.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
        });
      } else {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          el.style.transform = 'translate3d(0px, 0px, 0)';
        });
      }
    };

    const handleMouseLeave = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        el.style.transition = 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)';
        el.style.transform = 'translate3d(0px, 0px, 0)';
      });
      setTimeout(() => {
        if (el) el.style.transition = '';
      }, 400);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (el) el.removeEventListener('mouseleave', handleMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [enabled, strength, radius]);

  return ref;
}

