import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { Card } from './ui/card';
import { X, TrendingUp, Loader2, GraduationCap, Clock, List } from 'lucide-react';
import { ImageWithFallback } from './common/ImageWithFallback';
import { CountryDetailPanel } from './common/CountryDetailPanel';
import { getCountryPolygons } from '../data/countryBoundaries';
import { motion, AnimatePresence } from 'motion/react';
import { useGlobe } from './GlobeWrapper';
import globalProgramImage from "@/assets/globe-img.png";
import { useTranslatedTrackData } from '@/hooks/useTranslatedCountries';
import { GLOBAL_PROGRAM_TRANSLATIONS } from '@/translations/globalProgram';
import { COMMON_TRANSLATIONS } from '@/translations/commonTranslation';
import { useLanguage } from '@/context/LanguageContext';
import {
  getTargetAudienceLabel,
  getCountryColorHelper,
  getCountryColorWithOpacityHelper,
  getCardStartPosition,
  isMobileDevice,
  scrollToElement
} from './InteractiveGlobe/helpers';
import type { CountryData, PolygonFeature } from '@/types/country.types';
import type { InteractiveGlobeProps } from '@/types/globe.types';
import type { LanguageCode } from '@/types/language.types';

// Re-export for backward compatibility
export type { CountryData };

export function InteractiveGlobe({ countries, onCountryClick, showCountriesList = true, onGlobalProgramClick, isRotationPaused = false, setIsRotationPaused, onToggleCountriesList, onMouseEnter, onMouseLeave, customColorFn }: InteractiveGlobeProps) {
  const globeGlRef = useRef<any>(null); // Ref for react-globe.gl component
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);
  const [cardStartPosition, setCardStartPosition] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [hoveredCountry, setHoveredCountry] = useState<CountryData | null>(null);
  const [polygonData, setPolygonData] = useState<PolygonFeature[]>([]);
  const [isHoveringGlobe, setIsHoveringGlobe] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { GlobeComponent, loadError } = useGlobe();
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [sidebarWidth, setSidebarWidth] = useState<string>('0%');

  const { language: languageCode } = useLanguage();

  // Get translated track data based on current language
  const getTrackData = useTranslatedTrackData();

  // Helper functions using extracted utilities
  const getTargetAudienceLabelForCountry = useCallback((countryId: string): string => {
    return getTargetAudienceLabel(countryId, languageCode);
  }, [languageCode]);

  const getColor = useCallback((country: CountryData | null | undefined): string => {
    return getCountryColorHelper(country, customColorFn);
  }, [customColorFn]);

  const getColorWithOpacity = useCallback((country: CountryData | null | undefined, opacity: number): string => {
    return getCountryColorWithOpacityHelper(country, opacity, customColorFn);
  }, [customColorFn]);

  // Memoize selected country color to avoid recalculating
  const selectedCountryColor = useMemo(() => {
    return getColor(selectedCountry);
  }, [selectedCountry, getColor]);


  useEffect(() => {
    // Set initial dimensions - responsive based on screen size and countries list visibility
    const updateDimensions = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // On mobile: subtract 220px for the bottom cards section if countries list is shown
      const mobileGlobeHeight = (mobile && showCountriesList) ? window.innerHeight - 220 : window.innerHeight;

      // On desktop: use full width if countries list is hidden, otherwise 70%
      const desktopGlobeWidth = showCountriesList ? window.innerWidth * 0.7 : window.innerWidth;

      const newDimensions = {
        width: mobile ? window.innerWidth : desktopGlobeWidth,
        height: mobile ? mobileGlobeHeight : window.innerHeight
      };

      // Update sidebar width for animation
      if (showCountriesList) {
        setSidebarWidth(mobile ? '100%' : '30%');
      } else {
        setSidebarWidth('0%');
      }

      console.log('[InteractiveGlobe] Dimensions updated:', newDimensions);
      setDimensions(newDimensions);
    };

    updateDimensions();

    // Handle window resize
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [showCountriesList]);

  useEffect(() => {
    // Load polygon data for countries
    console.log('[InteractiveGlobe] Loading polygon data for countries:', countries.length);
    const countryIds = countries.map(c => c.id);
    const polygons = getCountryPolygons(countryIds);
    console.log('[InteractiveGlobe] Loaded polygons:', polygons.length);

    // Attach country data to each polygon
    const enrichedPolygons: PolygonFeature[] = polygons
      .filter(polygon => polygon.properties && polygon.properties.id)
      .map(polygon => ({
        ...polygon,
        countryData: countries.find(c => c.id === polygon.properties?.id)
      })) as PolygonFeature[];

    console.log('[InteractiveGlobe] Enriched polygons:', enrichedPolygons.length);
    setPolygonData(enrichedPolygons);
    console.log('[InteractiveGlobe] Polygon data loaded. Dimensions:', dimensions);
  }, [countries]);

  // Auto-rotate functionality for react-globe.gl
  useEffect(() => {
    if (!GlobeComponent || !globeGlRef.current) return;

    // Stop rotation when a country is selected or when user pauses
    const shouldAutoRotate = !selectedCountry && !isRotationPaused;

    // Use a small delay to ensure globe is mounted
    const timer = setTimeout(() => {
      try {
        // react-globe.gl exposes controls through the ref
        if (globeGlRef.current && globeGlRef.current.controls) {
          const controls = globeGlRef.current.controls();
          if (controls) {
            controls.autoRotate = shouldAutoRotate;
            controls.autoRotateSpeed = 0.8;
            controls.enableDamping = true;
            controls.dampingFactor = 0.05;
            controls.rotateSpeed = 0.5;
            // Disable default zoom - we'll handle it manually with Ctrl+scroll
            controls.enableZoom = false;
          }
        }
      } catch (error) {
        console.warn('Error setting auto-rotate:', error);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [GlobeComponent, selectedCountry, isRotationPaused, polygonData]);

  // Ctrl+scroll zoom functionality for react-globe.gl (desktop only)
  useEffect(() => {
    if (!GlobeComponent || !isHoveringGlobe) return;

    // Only enable Ctrl+scroll zoom on desktop (>= 1024px)
    // On tablet and mobile, users can use pinch-to-zoom
    const isDesktop = window.innerWidth >= 1024;
    if (!isDesktop) return;

    const handleWheel = (e: WheelEvent) => {
      // Only zoom if Ctrl key (or Cmd on Mac) is pressed
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        e.stopPropagation();

        if (globeGlRef.current) {
          try {
            // react-globe.gl exposes camera through ref
            if (globeGlRef.current.camera) {
              const camera = globeGlRef.current.camera();
              if (camera && camera.position) {
                // Calculate zoom factor based on scroll direction
                const zoomFactor = e.deltaY > 0 ? 1.05 : 0.95;

                // Apply zoom to camera position
                camera.position.x *= zoomFactor;
                camera.position.y *= zoomFactor;
                camera.position.z *= zoomFactor;

                // Clamp zoom to reasonable limits
                const distance = Math.sqrt(
                  camera.position.x ** 2 +
                  camera.position.y ** 2 +
                  camera.position.z ** 2
                );

                const minDistance = 150;
                const maxDistance = 800;

                if (distance < minDistance || distance > maxDistance) {
                  const clampedDistance = Math.max(minDistance, Math.min(maxDistance, distance));
                  const scale = clampedDistance / distance;
                  camera.position.x *= scale;
                  camera.position.y *= scale;
                  camera.position.z *= scale;
                }
              }
            }
          } catch (error) {
            console.warn('Error zooming globe:', error);
          }
        }
      }
    };

    // Attach to window to capture all wheel events
    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [GlobeComponent, isHoveringGlobe]);

  const handlePolygonClick = (polygon: any, fromSidebar: boolean = false) => {
    const country = polygon.countryData;
    if (!country) return;

    // Get card position if clicked from sidebar
    const cardElement = cardRefs.current[country.id];
    if (fromSidebar && cardElement) {
      const position = getCardStartPosition(cardElement);
      setCardStartPosition(position);
    } else {
      // Reset position for globe clicks
      setCardStartPosition(null);
    }

    setSelectedCountry(country);
    if (onCountryClick) {
      onCountryClick(country);
    }

    // Animate camera to country using react-globe.gl API
    if (globeGlRef.current && globeGlRef.current.pointOfView) {
      globeGlRef.current.pointOfView(
        {
          lat: country.lat,
          lng: country.lng,
          altitude: 2
        },
        1000
      );
    }

    // Scroll to card on mobile
    if (isMobileDevice() && cardRefs.current[country.id]) {
      scrollToElement(cardRefs.current[country.id]);
    }
  };

  // Wrapper for react-globe.gl onPolygonClick signature
  const handleGlobePolygonClick = (polygon: object, event: MouseEvent, coords: { lat: number; lng: number; altitude: number }) => {
    // Extract countryData from polygon object
    const polygonWithData = polygon as any;
    if (polygonWithData && polygonWithData.countryData) {
      handlePolygonClick(polygonWithData, false);
    }
  };

  // Wrapper for react-globe.gl onPolygonHover signature
  const handleGlobePolygonHover = (polygon: object | null, prevPolygon: object | null) => {
    const polygonWithData = polygon as any;
    if (polygonWithData && polygonWithData.countryData) {
      handlePolygonHover(polygonWithData);
    } else {
      handlePolygonHover(null);
    }
  };

  const handleMouseMove = (e: any) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const handlePolygonHover = (polygon: any) => {
    if (polygon && polygon.countryData) {
      setHoveredCountry(polygon.countryData);
    } else {
      setHoveredCountry(null);
    }
  };

  //polygonsData={polygonData}
  console.log('[InteractiveGlobe] polygonData:', polygonData);

  const handleNextStep = () => {
    if (selectedCountry) {
      alert(`Proceeding to next step for ${selectedCountry.name}`);
      // You can replace this with actual navigation or modal
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden flex flex-col md:flex-row" style={{ maxWidth: '100vw', overflowX: 'hidden' }}>
      {/* Globe Container - dynamic width based on countries list visibility */}
      <motion.div
        className="relative flex-1 md:h-full min-w-0"
        animate={{
          width: showCountriesList ? (window.innerWidth >= 768 ? '70%' : '100%') : '100%',
          
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{
          maxWidth: '100%',
          overflow: 'hidden'
        }}
      >

        {dimensions.width === 0 ? (
          <div className="flex items-center justify-center w-full h-full bg-gradient-to-b from-[#0a0e27] via-[#1a1f3a] to-[#0d1b2a]">
            <Loader2 className="w-12 h-12 text-cyan-400 animate-spin" />
          </div>
        ) : (
          <div
            id="globe-container"
            onMouseMove={handleMouseMove}
            onClick={(e) => {
              // Toggle rotation when clicking on globe background (not on countries or UI elements)
              const target = e.target as HTMLElement;
              // Check if the click is on the canvas element (the globe itself)
              if (target.tagName === 'CANVAS' && setIsRotationPaused) {
                setIsRotationPaused(!isRotationPaused);
              }
            }}
            onMouseEnter={() => {
              if (onMouseEnter) {
                onMouseEnter();
              }
              setIsHoveringGlobe(true);
            }}
            onMouseLeave={() => {
              if (onMouseLeave) {
                onMouseLeave();
              }
              setIsHoveringGlobe(false);
            }}
            className="w-full h-full flex items-center justify-center relative"
            style={{
              minWidth: 0,
              minHeight: 0,
            }}
          >
            {/* Top instruction message */}
            <div className="absolute top-2 sm:top-4 md:top-8 left-1/2 transform -translate-x-1/2 z-10 pointer-events-none px-2 sm:px-4 md:px-0 w-full max-w-[90%] sm:max-w-[80%] md:max-w-none">
              <p className="text-white text-xs sm:text-sm md:text-base text-center whitespace-normal break-words" style={{ opacity: 0.9 }}>
                {COMMON_TRANSLATIONS[languageCode].globeTopInstruction}
              </p>
            </div>

            {/* Bottom instruction message */}
            <div className="absolute bottom-2 sm:bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 z-10 pointer-events-none px-2 sm:px-4 md:px-0 w-full max-w-[90%] sm:max-w-[80%] md:max-w-none">
              <p className="text-white text-xs sm:text-sm md:text-base text-center whitespace-normal break-words" style={{ opacity: 0.7 }}>
                {COMMON_TRANSLATIONS[languageCode].globeBottomInstruction}
              </p>
            </div>

            {/* GlobeComponent from GlobeWrapper */}
            {loadError ? (
              <div className="flex items-center justify-center w-full h-full bg-gradient-to-b from-[#0a0e27] via-[#1a1f3a] to-[#0d1b2a]">
                <div className="text-center">
                  <p className="text-red-400 mb-2">Error loading globe: {loadError}</p>
                  <Loader2 className="w-12 h-12 text-cyan-400 animate-spin mx-auto" />
                </div>
              </div>
            ) : GlobeComponent ? (
              <GlobeComponent
                ref={globeGlRef}
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
                showAtmosphere={true}
                atmosphereColor="lightskyblue"
                polygonsData={polygonData}
                polygonCapColor={(d: any) => {
                  const countryData = d.countryData;
                  if (!countryData) return 'rgba(0, 0, 0, 0)';
                  const isHovered = hoveredCountry && hoveredCountry.id === countryData.id;
                  const isSelected = selectedCountry && selectedCountry.id === countryData.id;
                  if (isSelected) {
                    return getColorWithOpacity(countryData, 0.25);
                  }
                  if (isHovered) {
                    return getColorWithOpacity(countryData, 0.15);
                  }
                  return getColorWithOpacity(countryData, 0.08);
                }}
                polygonSideColor={(d: any) => {
                  const countryData = d.countryData;
                  if (!countryData) return 'rgba(0, 0, 0, 0)';
                  const isHovered = hoveredCountry && d.countryData && hoveredCountry.id === d.countryData.id;
                  return isHovered
                    ? getColorWithOpacity(countryData, 0.2)
                    : getColorWithOpacity(countryData, 0.1);
                }}
                polygonStrokeColor={(d: any) => {
                  const countryData = d.countryData;
                  if (!countryData) return 'rgba(100, 200, 255, 0.3)';
                  return getColor(countryData);
                }}
                polygonAltitude={(d: any) => {
                  const isHovered = hoveredCountry && d.countryData && hoveredCountry.id === d.countryData.id;
                  const isSelected = selectedCountry && d.countryData && selectedCountry.id === d.countryData.id;
                  if (isSelected) return 0.015;
                  if (isHovered) return 0.012;
                  return 0.008;
                }}
                polygonsTransitionDuration={300}
                onPolygonClick={handleGlobePolygonClick}
                onPolygonHover={handleGlobePolygonHover}
                atmosphereAltitude={0.25}
                enablePointerInteraction={true}
                // width={dimensions.width}
                // height={dimensions.height}
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-gradient-to-b from-[#0a0e27] via-[#1a1f3a] to-[#0d1b2a]">
                <Loader2 className="w-12 h-12 text-cyan-400 animate-spin" />
              </div>
            )}

            {hoveredCountry && !selectedCountry && (() => {
              const hoverColor = getColor(hoveredCountry);
              return (
                <div
                  style={{
                    position: "fixed",
                    top: mousePos.y + 24,
                    left: mousePos.x - 36,
                    pointerEvents: "none",
                    background: `linear-gradient(135deg, rgba(10, 14, 39, 0.98), rgba(26, 31, 58, 0.98))`,
                    backdropFilter: "blur(6px)",
                    color: hoverColor,
                    padding: "10px 16px",
                    fontSize: "13px",
                    fontWeight: 500,
                    letterSpacing: "0.3px",
                    borderRadius: "10px",
                    border: `2px solid ${hoverColor}`,
                    boxShadow: `0 0 30px ${hoverColor}CC, 0 0 60px ${hoverColor}66, 0 8px 30px rgba(0,0,0,0.8)`,
                    whiteSpace: "nowrap",
                    transform: "translateY(-2px)",
                    transition: "opacity 0.15s ease, transform 0.15s ease",
                    zIndex: 1000,
                  }}
                >
                  <div
                    style={{
                      fontWeight: 600,
                      textShadow: `0 0 20px ${hoverColor}, 0 0 40px ${hoverColor}`,
                      fontSize: '15px',
                      letterSpacing: '0.5px'
                    }}
                  >
                    {hoveredCountry.name}
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* Backdrop Blur/Dim Overlay */}
        <AnimatePresence>
          {selectedCountry && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-md"
              onClick={() => {
                setSelectedCountry(null);
                setCardStartPosition(null);
              }}
            />
          )}
        </AnimatePresence>

        {/* Animated Country Detail Panel - Slides from sidebar to center */}
        <CountryDetailPanel
          country={selectedCountry}
          countryColor={selectedCountryColor}
          cardStartPosition={cardStartPosition}
          getTrackData={getTrackData}
          onClose={() => {
            setSelectedCountry(null);
            setCardStartPosition(null);
          }}
          onNextStep={handleNextStep}
          targetAudienceLabel={selectedCountry ? getTargetAudienceLabelForCountry(selectedCountry.id) : undefined}
          isNextStepDisabled={true}
          nextStepButtonText={COMMON_TRANSLATIONS[languageCode].comingSoon}
        />

      </motion.div>
      <div className='absolute top-0 left-0 w-fit p-3 h-10` bg-red-500' onClick={() => {
        if (onToggleCountriesList) {
          onToggleCountriesList();
        }
      }}>
        hi there button
      </div>

      {/* Country Cards Sidebar - 30% on desktop, fixed 220px height on mobile */}
      <AnimatePresence>
        {showCountriesList && (
          <motion.div
            key="sidebar"
            initial={{ width: 0, opacity: 0 }}
            animate={{
              width: sidebarWidth,
              opacity: 1
            }}
            exit={{
              width: 0,
              opacity: 0,
              overflow: 'hidden',
              transition: { delay: 0.3, duration: 0.5, ease: "easeInOut" } // Wait for content to slide out
            }}
            transition={{
              duration: 0.5,
              ease: "easeInOut"
            }}
            className="relative h-[220px] md:h-full bg-gradient-to-b from-[#0a0e27]/95 to-[#1a1f3a]/95 border-t-2 md:border-t-0 md:border-l-2 border-cyan-400/30 backdrop-blur-lg overflow-hidden flex-shrink-0"
            style={{ minWidth: 0, maxWidth: '100%' }}
          >
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeIn",
                delay: 0.1 // Slight delay when opening
              }}
              className="p-3 md:p-6 h-full flex flex-col w-full"
            >
              <motion.div
                className="flex items-center justify-between mb-3 md:mb-6 flex-shrink-0"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2
                  className="text-white text-cyan-400 text-sm md:text-base"
                  style={{
                    textShadow: '0 0 20px rgba(0, 217, 255, 0.6)'
                  }}
                >
                  {COMMON_TRANSLATIONS[languageCode].selectACountry}
                </h2>
                <motion.button
                  onClick={() => {
                    if (onToggleCountriesList) {
                      onToggleCountriesList();
                    }
                  }}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-1.5 rounded-full transition-all duration-300 hover:bg-white/10"
                  style={{ color: '#00d9ff' }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </motion.div>

              {/* Horizontal scroll on mobile, 2x4 grid on desktop */}
              <div className="flex md:grid md:grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 overflow-x-auto md:overflow-x-visible md:overflow-y-auto pb-3 md:pb-0 flex-1 px-3 md:px-2 md:py-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] md:[scrollbar-width:thin]"
                style={{
                  scrollbarColor: 'rgba(0, 217, 255, 0.5) rgba(26, 31, 58, 0.5)',
                  overflow: window.innerWidth < 768 ? "hidden" : undefined,
                }}
              >
                {/* Global Program Card - First in the list */}
                <motion.div
                  key="global-program"
                  ref={(el: any) => { cardRefs.current['global-program'] = el; }}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-shrink-0 md:flex-shrink h-auto my-1"
                >
                  <Card
                    className="cursor-pointer overflow-hidden border-2 transition-all duration-300 bg-gradient-to-br from-[#1a1f3a]/90 to-[#0a0e27]/90 backdrop-blur-sm h-full"
                    style={{
                      borderColor: '#00d9ff40',
                      boxShadow: '0 0 15px #00d9ff40'
                    }}
                    onClick={() => {
                      if (onGlobalProgramClick) {
                        onGlobalProgramClick();
                      }
                    }}
                  >
                    {/* Vertical layout matching country cards */}
                    <div className="flex flex-col gap-2 md:gap-3 p-2 md:p-3 w-28 md:w-auto md:h-full">
                      <div className="relative w-full h-20 md:h-32 flex-shrink-0 overflow-hidden rounded-lg">
                        <ImageWithFallback
                          src={globalProgramImage}
                          alt="Global Program"
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e27] via-transparent to-transparent opacity-60" />
                      </div>
                      <div className="flex-1 min-w-0 text-center px-1 md:px-2">
                        <h3
                          className="text-xs md:text-sm transition-all duration-300 truncate text-white"
                        >
                          {GLOBAL_PROGRAM_TRANSLATIONS[languageCode as LanguageCode]?.title || 'Global Program'}
                        </h3>
                      </div>
                    </div>
                  </Card>
                </motion.div>

                {countries
                  .slice()
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((country, index) => (
                    <motion.div
                      key={country.id}
                      ref={(el: any) => { cardRefs.current[country.id] = el; }}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-shrink-0 md:flex-shrink h-auto my-1"
                    >
                      <Card
                        className="cursor-pointer overflow-hidden border-2 transition-all duration-300 bg-gradient-to-br from-[#1a1f3a]/90 to-[#0a0e27]/90 backdrop-blur-sm h-full"
                        style={{
                          borderColor: selectedCountry?.id === country.id ? getColor(country) : `${getColor(country)}40`,
                          boxShadow: selectedCountry?.id === country.id
                            ? `0 0 30px ${getColor(country)}99, 0 0 60px ${getColor(country)}55`
                            : `0 0 15px ${getColor(country)}40`
                        }}
                        onClick={() => handlePolygonClick({ countryData: country }, true)}
                      >
                        {/* Vertical layout on both mobile and desktop (image top, text bottom) */}
                        <div className="flex flex-col gap-2 md:gap-3 p-2 md:p-3 w-28 md:w-auto md:h-full">
                          <div className="relative w-full h-20 md:h-32 flex-shrink-0 overflow-hidden rounded-lg">
                            {country.image && (
                              <>
                                <ImageWithFallback
                                  src={country.image}
                                  alt={country.name}
                                  className={`w-full h-full object-cover transition-transform duration-300 hover:scale-110 ${country.id === 'china' ? 'object-left' : country.id === 'uae' ? '' : 'object-center'}`}
                                  style={{
                                    objectPosition: country.id === 'china'
                                      ? 'left center'
                                      : country.id === 'uae'
                                        ? '20% center'
                                        : 'center center'
                                  }}
                                />
                                <div
                                  className="absolute inset-0 bg-gradient-to-t from-[#0a0e27] via-transparent to-transparent opacity-60"
                                />
                              </>
                            )}
                            {selectedCountry?.id === country.id && (
                              <motion.div
                                className="absolute inset-0 border-2"
                                style={{ borderColor: getColor(country) }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                              />
                            )}
                          </div>
                          <div className="flex-1 min-w-0 text-center px-1 md:px-2">
                            <h3
                              className="text-xs md:text-sm transition-all duration-300 truncate"
                              style={{
                                color: selectedCountry?.id === country.id ? getColor(country) : 'white',
                                textShadow: selectedCountry?.id === country.id ? `0 0 10px ${getColor(country)}` : 'none'
                              }}
                            >
                              {country.name}
                            </h3>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}