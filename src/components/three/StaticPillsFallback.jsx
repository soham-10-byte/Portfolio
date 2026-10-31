import React from 'react';

/**
 * StaticPillsFallback — pure CSS / SVG fallback shown instead of the Three.js
 * HeroScene when:
 *  - User prefers-reduced-motion
 *  - Device is mobile < 480px
 *  - WebGL is unavailable
 *
 * Renders stacked pill/capsule shapes in the 6 brand palette colours with
 * simple CSS animations (if motion is not reduced) or static (if reduced).
 *
 * @param {{ reducedMotion?: boolean }} props
 */
export default function StaticPillsFallback({ reducedMotion = false }) {
  const PILLS = [
    { color: '#111715', border: '#1B2420', w: 56, h: 120, rotate: '-8deg', zIndex: 1 },
    { color: '#1B2420', border: '#29342E', w: 60, h: 130, rotate: '4deg',  zIndex: 2 },
    { color: '#29342E', border: '#3D4B42', w: 58, h: 140, rotate: '-4deg', zIndex: 3 },
    { color: '#3D4B42', border: '#3D4B42', w: 62, h: 128, rotate: '6deg',  zIndex: 4 },
    { color: '#B5C4B4', border: '#B5C4B4', w: 56, h: 120, rotate: '-6deg', zIndex: 5 },
    { color: '#F2F1E9', border: '#B5C4B4', w: 50, h: 108, rotate: '2deg',  zIndex: 6 },
  ];

  return (
    <div
      className="w-full h-full flex items-center justify-center"
      aria-hidden="true"
    >
      <div className="relative flex flex-col items-center justify-center gap-3">
        {PILLS.map((pill, i) => (
          <div
            key={i}
            style={{
              width: pill.w,
              height: pill.h,
              borderRadius: '9999px',
              backgroundColor: pill.color,
              border: `1px solid ${pill.border}`,
              transform: `rotate(${pill.rotate})`,
              zIndex: pill.zIndex,
              animation: reducedMotion
                ? 'none'
                : `float-${(i % 3) + 1} ${3.5 + i * 0.4}s ease-in-out infinite alternate`,
              boxShadow:
                pill.color === '#F2F1E9'
                  ? '0 0 40px rgba(218,241,222,0.3)'
                  : pill.color === '#B5C4B4'
                  ? '0 0 20px rgba(142,182,155,0.2)'
                  : 'none',
            }}
          />
        ))}
      </div>
    </div>
  );
}

