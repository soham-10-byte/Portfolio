import { useState, useEffect } from 'react';

/**
 * Hook to detect low power devices or environments where 3D should fall back.
 * Checks for hardwareConcurrency <= 4, small screen width (< 480px), or lack of WebGL.
 */
export function useIsLowPower() {
  const [isLowPower, setIsLowPower] = useState(false);

  useEffect(() => {
    try {
      const isMobileSmall = window.innerWidth < 480;
      const isLowCore = typeof navigator !== 'undefined' && navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;

      // Check WebGL availability
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      const noWebGL = !gl;

      if (isMobileSmall || isLowCore || noWebGL) {
        setIsLowPower(true);
      }
    } catch {
      setIsLowPower(true);
    }
  }, []);

  return isLowPower;
}

