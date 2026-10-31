import React, { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

/**
 * Ultra-smooth, zero-lag Custom Cursor.
 * Driven directly by requestAnimationFrame and hardware-accelerated translate3d.
 * Automatically disabled on touch / mobile devices.
 */
export default function Cursor() {
  const [isPointerFine, setIsPointerFine] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorRef = useRef(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });
  const rafId = useRef(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsPointerFine(mediaQuery.matches);

    if (!mediaQuery.matches) return;

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const interactive = target && target.closest && target.closest('a, button, input, textarea, select, [role="button"], .clickable');
      setIsHovered(!!interactive);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Fast lerp loop using RAF
    const loop = () => {
      currentPos.current.x += (mousePos.current.x - currentPos.current.x) * 0.35;
      currentPos.current.y += (mousePos.current.y - currentPos.current.y) * 0.35;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      rafId.current = requestAnimationFrame(loop);
    };

    rafId.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isVisible]);

  if (!isPointerFine || !isVisible) return null;

  return (
    <div
      ref={cursorRef}
      className={cn(
        'fixed top-0 left-0 pointer-events-none z-[10000] rounded-full border border-c400/80 mix-blend-screen transition-[width,height,background-color,box-shadow] duration-200 will-change-transform',
        isHovered
          ? 'w-14 h-14 bg-c100/15 shadow-[0_0_20px_rgba(218,241,222,0.35)]'
          : 'w-6 h-6 bg-c400/5 shadow-[0_0_8px_rgba(142,182,155,0.2)]'
      )}
      style={{
        transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)',
      }}
      aria-hidden="true"
    />
  );
}
