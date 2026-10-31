import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PreloaderContext = createContext({
  showPreloader: false,
  startAnimations: true,
  isRevealed: true,
  progress: 1,
  setProgress: () => {},
  completePreloader: () => {},
});

// Module-level state: resets on browser reload/refresh so the preloader
// runs reliably every time the user refreshes, while avoiding re-triggering
// on internal client-side SPA navigation (/development -> /).
let sessionLoaded = false;

/**
 * PreloaderProvider
 * Manages preloader state for the Home route ("/").
 * Exposes startAnimations so Hero entrance animations fire only when revealed.
 */
export function PreloaderProvider({ children }) {
  const location = useLocation();
  const isHome = location.pathname === '/';

  const [hasCheckedSession, setHasCheckedSession] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);
  const [isRevealed, setIsRevealed] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isHome && !sessionLoaded) {
      setShouldShow(true);
      setIsRevealed(false);
      setProgress(0);
    } else {
      setShouldShow(false);
      setIsRevealed(true);
      setProgress(1);
    }

    setHasCheckedSession(true);
  }, [isHome]);

  const completePreloader = () => {
    sessionLoaded = true;
    setIsRevealed(true);
    setProgress(1);
  };

  // startAnimations is true if preloader is not shown, or once revealed
  const startAnimations = isRevealed || !shouldShow;

  return (
    <PreloaderContext.Provider
      value={{
        showPreloader: hasCheckedSession && shouldShow && !isRevealed,
        startAnimations,
        isRevealed,
        progress,
        setProgress,
        completePreloader,
      }}
    >
      {children}
    </PreloaderContext.Provider>
  );
}

export function usePreloader() {
  return useContext(PreloaderContext);
}
