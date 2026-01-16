import { useState, useEffect } from 'react';

/**
 * Hook to detect mobile device orientation
 * Returns whether the device is in landscape mode
 */
export function useDeviceOrientation() {
  const [isLandscape, setIsLandscape] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth > window.innerHeight;
  });

  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768; // TABLET_BREAKPOINT
  });

  useEffect(() => {
    const checkOrientation = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setIsMobile(width < 768);
      setIsLandscape(width > height);
    };

    // Check on mount
    checkOrientation();

    // Listen for orientation changes
    const handleOrientationChange = () => {
      // Small delay to ensure dimensions are updated
      setTimeout(checkOrientation, 100);
    };

    // Listen for resize (handles both orientation and window resize)
    const handleResize = () => {
      checkOrientation();
    };

    // Modern API for orientation change
    if (window.screen?.orientation) {
      window.screen.orientation.addEventListener('change', handleOrientationChange);
    }

    // Fallback: listen to orientationchange event
    window.addEventListener('orientationchange', handleOrientationChange);
    
    // Also listen to resize as fallback
    window.addEventListener('resize', handleResize);

    return () => {
      if (window.screen?.orientation) {
        window.screen.orientation.removeEventListener('change', handleOrientationChange);
      }
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    isLandscape,
    isPortrait: !isLandscape,
    isMobile,
    orientation: isLandscape ? 'landscape' : 'portrait' as 'landscape' | 'portrait',
  };
}
