import { useState, useEffect } from 'react';


// Images
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import MainGlobe from './Pages/main/MainGlobe';

// Suppress Three.js multiple instances warning since we're using a singleton pattern
const originalWarn = console.warn;
console.warn = function (...args) {
  if (args[0]?.includes?.('Multiple instances of Three.js')) {
    return;
  }
  originalWarn.apply(console, args);
};

export default function App() {

  const [showHero, setShowHero] = useState(true);
  const [headerHeight, setHeaderHeight] = useState(100);
  const [footerHeight, setFooterHeight] = useState(60);
  const [isHoveringGlobe, setIsHoveringGlobe] = useState(false);



  useEffect(() => {
    let scrollAccumulator = 0;

    const handleWheel = (e: WheelEvent) => {
      if (showHero && isHoveringGlobe) {
        e.preventDefault();
        scrollAccumulator += Math.abs(e.deltaY);

        // Hide hero when accumulated scroll reaches 25px
        if (scrollAccumulator > 25) {
          setShowHero(false);
          scrollAccumulator = 0;
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (showHero) {
        const touch = e.touches[0];
        scrollAccumulator = touch.clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (showHero && isHoveringGlobe) {
        e.preventDefault();
        const touch = e.touches[0];
        const delta = Math.abs(scrollAccumulator - touch.clientY);

        if (delta > 25) {
          setShowHero(false);
        }
      }
    };

    if (showHero) {
      window.addEventListener('wheel', handleWheel, { passive: false });
      window.addEventListener('touchstart', handleTouchStart, { passive: false });
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
    }

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [showHero, isHoveringGlobe]);

  // Measure header and footer heights after images load
  useEffect(() => {
    const measureElements = () => {
      const header = document.getElementById('main-header');
      const footer = document.getElementById('main-footer');

      if (header) {
        const height = header.offsetHeight;
        setHeaderHeight(height);
        document.documentElement.style.setProperty('--header-height', `${height}px`);
      }

      if (footer) {
        const height = footer.offsetHeight;
        setFooterHeight(height);
        document.documentElement.style.setProperty('--footer-height', `${height}px`);
      }
    };

    // Measure immediately
    measureElements();

    // Measure after a delay to ensure images are loaded
    setTimeout(measureElements, 500);
    setTimeout(measureElements, 1000);

    // Measure on window resize
    window.addEventListener('resize', measureElements);
    return () => window.removeEventListener('resize', measureElements);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-[#0a0e27] via-[#1a1f3a] to-[#0d1b2a]">
      {/* Header Banner - Top - Full Width, No Spacing */}
      <Header />

      <MainGlobe/>

      {/* Footer Banner - At the End of Page - Full Width, No Spacing */}
      <Footer />
    </div>
  );
}