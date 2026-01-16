import { useState, useEffect } from 'react';

/**
 * Hook to detect mobile device orientation
 * Returns whether the device is in landscape mode (only for mobile devices)
 */
export function useDeviceOrientation() {
  // Helper function to detect if device is mobile/tablet
  const detectMobileDevice = (): boolean => {
    if (typeof window === 'undefined') return false;
    
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // Check for touch capability (more reliable than width alone)
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // Mobile/tablet detection:
    // 1. Has touch capability AND
    // 2. Either width < 1024 (tablet breakpoint) OR height < 600 (typical phone height)
    // This catches large phones in landscape (like Galaxy S20 Ultra with 915px width)
    const isMobileDevice = hasTouch && (width < 1024 || height < 600);
    
    return isMobileDevice;
  };

  const [isMobile, setIsMobile] = useState<boolean>(detectMobileDevice);

  const [isLandscape, setIsLandscape] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const isMobileDevice = detectMobileDevice();
    // Only consider landscape if it's a mobile device AND width > height
    return isMobileDevice && window.innerWidth > window.innerHeight;
  });

  useEffect(() => {
    const checkOrientation = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isMobileDevice = detectMobileDevice();
      
      setIsMobile(isMobileDevice);
      // Only set landscape to true if it's a mobile device in landscape orientation
      // Desktop screens are typically wider than tall, but we don't want to treat them as "landscape"
      setIsLandscape(isMobileDevice && width > height);
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
