// ============================================================================
// External Dependencies
// ============================================================================
import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Loader2 } from 'lucide-react';

// ============================================================================
// Internal Components
// ============================================================================
import { Card } from './ui/card';
import { ImageWithFallback } from './common/ImageWithFallback';
import { CountryDetailPanel } from './common/CountryDetailPanel';
import { useGlobe } from './GlobeWrapper';

// ============================================================================
// Hooks & Utilities
// ============================================================================
import { useTranslatedTrackData } from '@/hooks/useTranslatedCountries';
import { useDeviceOrientation } from '@/hooks/useDeviceOrientation';
import {
  getTargetAudienceLabel,
  getCountryColorHelper,
  getCountryColorWithOpacityHelper,
  getCardStartPosition,
  isMobileDevice,
  scrollToElement,
} from './InteractiveGlobe/helpers';
import { debounce, throttle } from '@/utils/debounce';

// ============================================================================
// Context
// ============================================================================
import { useLanguage } from '@/context/LanguageContext';

// ============================================================================
// Data & Constants
// ============================================================================
import { getCountryPolygons } from '../data/countryBoundaries';
import { GLOBAL_PROGRAM_TRANSLATIONS } from '@/translations/globalProgram';
import { COMMON_TRANSLATIONS } from '@/translations/commonTranslation';
import { COUNTRIES } from '@/constants/countries';

// ============================================================================
// Assets
// ============================================================================
import globalProgramImage from '@/assets/globe-img.png';

// ============================================================================
// Types
// ============================================================================
import type { CountryData, PolygonFeature } from '@/types/country.types';
import type { InteractiveGlobeProps } from '@/types/globe.types';
import type { LanguageCode } from '@/types/language.types';

// ============================================================================
// Type Exports
// ============================================================================
export type { CountryData };

// ============================================================================
// Constants
// ============================================================================
const DESKTOP_BREAKPOINT = 1024;
const TABLET_BREAKPOINT = 768;
const MOBILE_SIDEBAR_HEIGHT = 220;
const ZOOM_MIN_DISTANCE = 150;
const ZOOM_MAX_DISTANCE = 800;
const ZOOM_FACTOR_IN = 0.95;
const ZOOM_FACTOR_OUT = 1.05;

// ============================================================================
// Component
// ============================================================================
export function InteractiveGlobe({
  countries,
  onCountryClick,
  showCountriesList = true,
  onGlobalProgramClick,
  isRotationPaused = false,
  setIsRotationPaused,
  onToggleCountriesList,
  onMouseEnter,
  onMouseLeave,
  customColorFn,
}: InteractiveGlobeProps) {
  // ============================================================================
  // Refs
  // ============================================================================
  const globeGlRef = useRef<any>(null);
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // ============================================================================
  // State - Globe & Country Selection
  // ============================================================================
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);
  const [hoveredCountry, setHoveredCountry] = useState<CountryData | null>(null);
  const [polygonData, setPolygonData] = useState<PolygonFeature[]>([]);
  const [cardStartPosition, setCardStartPosition] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  // ============================================================================
  // State - UI & Layout
  // ============================================================================
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [isHoveringGlobe, setIsHoveringGlobe] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [sidebarWidth, setSidebarWidth] = useState<string>('0%');

  // ============================================================================
  // Hooks & Context
  // ============================================================================
  const { GlobeComponent, loadError } = useGlobe();
  const { language: languageCode } = useLanguage();
  const getTrackData = useTranslatedTrackData();
  const { isLandscape, isMobile: isMobileOrientation, orientation } = useDeviceOrientation();

  // ============================================================================
  // Helper Functions
  // ============================================================================
  const getTargetAudienceLabelForCountry = useCallback(
    (countryId: string): string => {
      return getTargetAudienceLabel(countryId, languageCode);
    },
    [languageCode]
  );

  const getColor = useCallback(
    (country: CountryData | null | undefined): string => {
      return getCountryColorHelper(country, customColorFn);
    },
    [customColorFn]
  );

  const getColorWithOpacity = useCallback(
    (country: CountryData | null | undefined, opacity: number): string => {
      return getCountryColorWithOpacityHelper(country, opacity, customColorFn);
    },
    [customColorFn]
  );

  const selectedCountryColor = useMemo(() => {
    return getColor(selectedCountry);
  }, [selectedCountry, getColor]);

  // Memoize sorted countries to avoid re-sorting on every render
  const sortedCountries = useMemo(() => {
    const englishNameMap = new Map(
      COUNTRIES.map(country => [country.id, country.name])
    );
    return countries.slice().sort((a, b) => {
      const nameA = englishNameMap.get(a.id) || a.name;
      const nameB = englishNameMap.get(b.id) || b.name;
      return nameA.localeCompare(nameB, 'en');
    });
  }, [countries]);

  // Check if device is mobile in portrait mode (sidebar at bottom)
  const isMobilePortrait = useMemo(() => {
    return isMobileDevice() && !isLandscape;
  }, [isLandscape]);

  // ============================================================================
  // Effects - Layout & Dimensions
  // ============================================================================
  useEffect(() => {
    const updateDimensions = () => {
      const isMobileDevice = window.innerWidth < TABLET_BREAKPOINT;
      const isMobilePortraitMode = isMobileDevice && !isLandscape;
      setIsMobile(isMobilePortraitMode);

      const mobileGlobeHeight =
        isMobilePortraitMode && showCountriesList
          ? window.innerHeight - MOBILE_SIDEBAR_HEIGHT
          : window.innerHeight;

      const desktopGlobeWidth = showCountriesList
        ? window.innerWidth * 0.7
        : window.innerWidth;

      const newDimensions = {
        width: isMobilePortraitMode ? window.innerWidth : desktopGlobeWidth,
        height: isMobilePortraitMode ? mobileGlobeHeight : window.innerHeight,
      };

      setSidebarWidth(
        showCountriesList ? (isMobilePortraitMode ? '100%' : '30%') : '0%'
      );

      setDimensions(newDimensions);
    };

    // Debounce resize handler to improve performance
    const debouncedUpdateDimensions = debounce(updateDimensions, 150);

    updateDimensions();
    window.addEventListener('resize', debouncedUpdateDimensions);

    return () => {
      window.removeEventListener('resize', debouncedUpdateDimensions);
      debouncedUpdateDimensions.cancel();
    };
  }, [showCountriesList, isLandscape]);

  useEffect(() => {
    const countryIds = countries.map((country) => country.id);
    const polygons = getCountryPolygons(countryIds);

    const enrichedPolygons: PolygonFeature[] = polygons
      .filter(
        (polygon) => polygon.properties && polygon.properties.id
      )
      .map((polygon) => ({
        ...polygon,
        countryData: countries.find(
          (country) => country.id === polygon.properties?.id
        ),
      })) as PolygonFeature[];

    setPolygonData(enrichedPolygons);
  }, [countries]);

  // ============================================================================
  // Effects - Globe Controls
  // ============================================================================




  // ============================================================================
  // Event Handlers
  // ============================================================================

  // useEffect(() => {
  //   if (!globeGlRef.current) return;

  //   const controls = globeGlRef.current.controls?.();
  //   const canvas = globeGlRef.current.renderer?.domElement;
  //   if (!controls || !canvas) return;

  //   // Detect touch devices
  //   const isTouchDevice =
  //     window.matchMedia('(pointer: coarse)').matches ||
  //     window.matchMedia('(hover: none)').matches;

  //   // On desktop, disable OrbitControls default zoom
  //   controls.enableZoom = isTouchDevice; 
  //   controls.enablePan = false;

  //   // Only handle Ctrl + scroll when hovering (desktop)
  //   const handleWheel = (e: WheelEvent) => {
  //     if (!isHoveringGlobe) return;        // only when hovering
  //     if (isTouchDevice) return;           // skip touch devices
  //     if (!(e.ctrlKey || e.metaKey)) return; // only Ctrl/Cmd + scroll

  //     e.preventDefault(); // prevent browser zoom

  //     const zoomFactor = e.deltaY < 0 ? 0.95 : 1.05;
  //     if (e.deltaY < 0) {
  //       controls.dollyOut(zoomFactor);
  //     } else {
  //       controls.dollyIn(zoomFactor);
  //     }
  //     controls.update();
  //   };

  //   canvas.addEventListener('wheel', handleWheel, { passive: false });

  //   return () => {
  //     canvas.removeEventListener('wheel', handleWheel);
  //   };
  // }, [isHoveringGlobe]);


  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Only handle if hovering over globe and Ctrl key is pressed
      if (!isHoveringGlobe) return;
      
      // Only zoom if Ctrl key (or Cmd on Mac) is pressed
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        e.stopPropagation();
        
        if (globeGlRef.current && globeGlRef.current.camera) {
          try {
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
          } catch (error) {
            console.warn('Error zooming globe:', error);
          }
        }
      }
      // If Ctrl is not pressed, allow normal page scrolling (do nothing)
    };

    // Attach to window to capture all wheel events
    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [isHoveringGlobe]);

  useEffect(() => {
    console.log('<------GlobeComponent------>', GlobeComponent);
    if (!GlobeComponent || !globeGlRef.current) return;

    const timer = setTimeout(() => {
      try {
        const controls = globeGlRef.current?.controls?.();
        if (!controls) return;

        // const isTouchDevice =
        //   'ontouchstart' in window || navigator.maxTouchPoints > 0;

        const isTouchDevice =
          window.matchMedia('(pointer: coarse)').matches ||
          window.matchMedia('(hover: none)').matches;

        const shouldAutoRotate = !selectedCountry && !isRotationPaused;

        controls.autoRotate = shouldAutoRotate;
        controls.autoRotateSpeed = 0.8;
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.rotateSpeed = 0.5;
        controls.enableZoom = isTouchDevice;
        // controls.enableZoom = false;
        // controls.enableZoom = false;

        controls.enablePan = false;
      } catch (error) {
        console.warn('Error setting globe controls:', error);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [GlobeComponent, selectedCountry, isRotationPaused]);

  // console.log('<------isHoveringGlobe------>', isHoveringGlobe);

  const handlePolygonClick = useCallback(
    (polygon: any, fromSidebar: boolean = false) => {
      const country = polygon.countryData;
      if (!country) return;

      const cardElement = cardRefs.current[country.id];
      if (fromSidebar && cardElement) {
        const position = getCardStartPosition(cardElement);
        setCardStartPosition(position);
      } else {
        setCardStartPosition(null);
      }

      setSelectedCountry(country);
      onCountryClick?.(country);

      if (globeGlRef.current?.pointOfView) {
        globeGlRef.current.pointOfView(
          {
            lat: country.lat,
            lng: country.lng,
            altitude: isMobile ? 2.5 : 1.5,
          },
          1000
        );
      }

      if (isMobileDevice() && cardRefs.current[country.id]) {
        scrollToElement(cardRefs.current[country.id]);
      }
    },
    [isMobile, onCountryClick]
  );

  const handleGlobePolygonClick = useCallback(
    (
      polygon: object,
      event: MouseEvent,
      coords: { lat: number; lng: number; altitude: number }
    ) => {
      const polygonWithData = polygon as any;
      if (polygonWithData?.countryData) {
        handlePolygonClick(polygonWithData, false);
      }
    },
    [handlePolygonClick]
  );

  const handleGlobePolygonHover = useCallback(
    (polygon: object | null, prevPolygon: object | null) => {
      const polygonWithData = polygon as any;
      if (polygonWithData?.countryData) {
        setHoveredCountry(polygonWithData.countryData);
      } else {
        setHoveredCountry(null);
      }
    },
    []
  );

  // Throttle mouse move to ~60fps for better performance
  const handleMouseMoveRef = useRef(
    throttle((e: React.MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    }, 16)
  );

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    handleMouseMoveRef.current(e);
  }, []);

  // Cleanup throttle on unmount
  useEffect(() => {
    return () => {
      handleMouseMoveRef.current.cancel();
    };
  }, []);

  const handleGlobeClick = useCallback(
    (e: React.MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'CANVAS' && setIsRotationPaused) {
        setIsRotationPaused(!isRotationPaused);
      }
    },
    [isRotationPaused, setIsRotationPaused]
  );

  const handleGlobeMouseEnter = useCallback(() => {
    onMouseEnter?.();
    setIsHoveringGlobe(true);
  }, [onMouseEnter]);

  const handleGlobeMouseLeave = useCallback(() => {
    onMouseLeave?.();
    setIsHoveringGlobe(false);
  }, [onMouseLeave]);

  const handleNextStep = useCallback(() => {
    if (selectedCountry) {
      alert(`Proceeding to next step for ${selectedCountry.name}`);
    }
  }, [selectedCountry]);

  const handleCloseCountryDetail = useCallback(() => {
    setSelectedCountry(null);
    setCardStartPosition(null);
  }, []);

  const handleToggleCountriesList = useCallback(() => {
    onToggleCountriesList?.();
  }, [onToggleCountriesList]);

  const handleGlobalProgramClick = useCallback(() => {
    onGlobalProgramClick?.();
  }, [onGlobalProgramClick]);

  // ============================================================================
  // Memoized Polygon Color Functions - Prevents recreation on every render
  // ============================================================================
  const polygonCapColorFn = useCallback((d: any) => {
    const countryData = d.countryData;
    if (!countryData) return 'rgba(0, 0, 0, 0)';
    const isHovered = hoveredCountry?.id === countryData.id;
    const isSelected = selectedCountry?.id === countryData.id;
    if (isSelected) {
      return getColorWithOpacity(countryData, 0.25);
    }
    if (isHovered) {
      return getColorWithOpacity(countryData, 0.15);
    }
    return getColorWithOpacity(countryData, 0.08);
  }, [hoveredCountry, selectedCountry, getColorWithOpacity]);

  const polygonSideColorFn = useCallback((d: any) => {
    const countryData = d.countryData;
    if (!countryData) return 'rgba(0, 0, 0, 0)';
    const isHovered = hoveredCountry?.id === countryData.id;
    return isHovered
      ? getColorWithOpacity(countryData, 0.2)
      : getColorWithOpacity(countryData, 0.1);
  }, [hoveredCountry, getColorWithOpacity]);

  const polygonStrokeColorFn = useCallback((d: any) => {
    const countryData = d.countryData;
    if (!countryData) return 'rgba(100, 200, 255, 0.3)';
    return getColor(countryData);
  }, [getColor]);

  const polygonAltitudeFn = useCallback((d: any) => {
    const isHovered = hoveredCountry?.id === d.countryData?.id;
    const isSelected = selectedCountry?.id === d.countryData?.id;
    if (isSelected) return 0.015;
    if (isHovered) return 0.012;
    return 0.008;
  }, [hoveredCountry, selectedCountry]);

  return (
    <div
      className={`relative w-full h-full overflow-hidden flex  md:flex-row ${isLandscape ? 'flex-row' : 'flex-col'}`}
      style={{ maxWidth: '100vw', overflowX: 'clip' }}
    >
      {/* Globe Container */}
      <motion.div
        className="relative flex-1 md:h-full min-w-0"
        initial={
          isMobilePortrait
            ? {
              y: '100%',
              opacity: 0,
            }
            : {
              width: '100%',
            }
        }
        animate={isMobilePortrait ? {
          y: 0,
          opacity: 1,
          height: showCountriesList
            ? window.innerHeight - MOBILE_SIDEBAR_HEIGHT
            : window.innerHeight,
        }
          : {
            width: showCountriesList
              ? window.innerWidth >= TABLET_BREAKPOINT
                ? '70%'
                : '100%'
              : '100%',
          }}

        transition={{ duration: 0.5, ease: 'easeInOut' }}
        style={{
          maxWidth: '100%',
          overflow: 'hidden',
          scrollbarColor: 'rgba(0, 217, 255, 0.5) rgba(26, 31, 58, 0.5)',
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
            onClick={handleGlobeClick}
            onMouseEnter={handleGlobeMouseEnter}
            onMouseLeave={handleGlobeMouseLeave}
            className="w-full h-full flex items-center justify-center relative"
            style={{
              minWidth: 0,
              minHeight: 0,
            }}
          >
            {/* Top instruction message */}
            <div className="absolute top-2 sm:top-4 md:top-8 left-1/2 transform -translate-x-1/2 z-10 pointer-events-none px-2 sm:px-4 md:px-0 w-full max-w-[90%] sm:max-w-[80%] md:max-w-none">
              <p className="text-white text-xs sm:text-sm md:text-lg lg:text-xl text-center whitespace-normal break-words" style={{ opacity: 0.9 }}>
                {COMMON_TRANSLATIONS[languageCode].globeTopInstruction}
              </p>
            </div>

            {/* Bottom instruction message */}
            <div className="absolute bottom-2 sm:bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 z-10 pointer-events-none px-2 sm:px-4 md:px-0 w-full max-w-[90%] sm:max-w-[80%] md:max-w-none">
              <p className="text-white text-xs sm:text-sm md:text-lg lg:text-xl text-center whitespace-normal break-words" style={{ opacity: 0.7 }}>
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
                polygonCapColor={polygonCapColorFn}
                polygonSideColor={polygonSideColorFn}
                polygonStrokeColor={polygonStrokeColorFn}
                polygonAltitude={polygonAltitudeFn}
                polygonsTransitionDuration={300}
                onPolygonClick={handleGlobePolygonClick}
                onPolygonHover={handleGlobePolygonHover}
                atmosphereAltitude={0.25}
                enablePointerInteraction={true}
                width={dimensions.width}
                height={dimensions.height}
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

        {/* Country Detail Panel */}
        <CountryDetailPanel
          country={selectedCountry}
          countryColor={selectedCountryColor}
          cardStartPosition={cardStartPosition}
          getTrackData={getTrackData}
          onClose={handleCloseCountryDetail}
          onNextStep={handleNextStep}
          targetAudienceLabel={
            selectedCountry
              ? getTargetAudienceLabelForCountry(selectedCountry.id)
              : undefined
          }
          isNextStepDisabled={true}
          nextStepButtonText={COMMON_TRANSLATIONS[languageCode].comingSoon}
        />

      </motion.div>

      {/* Country Cards Sidebar - 30% on desktop, fixed 220px height on mobile */}
      <AnimatePresence>
        {showCountriesList && (
          <motion.div
            key="sidebar"
            initial={isMobilePortrait ? { y: "100%", opacity: 0 } : { width: 0, opacity: 0 }}
            animate={
              isMobilePortrait ? { y: 0, opacity: 1 } : { width: sidebarWidth, opacity: 1 }
            }
            exit={isMobilePortrait ? { y: "100%", opacity: 0 } : { width: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={`relative ${isMobilePortrait ? 'h-[220px] border-t-2' : 'md:h-full md:border-l-2'} bg-gradient-to-b from-[#0a0e27]/95 to-[#1a1f3a]/95 border-cyan-400/30 backdrop-blur-lg overflow-hidden flex-shrink-0`}
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
              className={`${isLandscape ? 'p-2 md:p-4' : 'p-3 md:p-6'} h-full flex flex-col w-full`}
            >
              <motion.div
                className={`flex items-center justify-between${isLandscape ? 'mb-2' : 'mb-3 md:mb-6 '} flex-shrink-0`}
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
                  onClick={handleToggleCountriesList}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-1.5 rounded-full cursor-pointer transition-all duration-300 hover:bg-white/10"
                  style={{ color: '#00d9ff' }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </motion.div>

              {/* Horizontal scroll on mobile, 2x4 grid on desktop */}
              <div className={`${isMobilePortrait ? 'flex-row overflow-x-auto overflow-y-auto' : 'flex-col overflow-y-auto'} flex md:grid md:grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 pb-3 md:pb-0 flex-1 px-3 md:px-2 md:py-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] md:[scrollbar-width:thin]`}
                style={{
                  scrollbarColor: 'rgba(0, 217, 255, 0.5) rgba(26, 31, 58, 0.5)',
                  touchAction: 'pan-x pan-y',
                  WebkitOverflowScrolling: 'touch',
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
                    onClick={handleGlobalProgramClick}
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

                {sortedCountries.map((country, index) => (
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