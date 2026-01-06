import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { X, MapPin, Users, TrendingUp, Loader2, Languages, GraduationCap, Clock, Award, List } from 'lucide-react';
import { ImageWithFallback } from './common/ImageWithFallback';
import { getCountryPolygons } from '../data/countryBoundaries';
import { motion, AnimatePresence } from 'motion/react';
import { useGlobe } from './GlobeWrapper';
import globalProgramImage from "@/assets/globe-img.png";
import { getCountryColor, getCountryColorWithOpacity, type CountryColorFunction } from '@/utils/countryColors';


export interface CountryData {
  id: string;
  name: string;
  lat: number;
  lng: number;
  size: number;
  color: string;
  description: string;
  image?: string;
  targetAudience?: string;
  language?: string;
  subtitle?: string;
  faculty?: string;
  creditHours?: string;
  nextStep?: string;
}

interface PolygonFeature {
  type: string;
  properties: {
    id: string;
    name: string;
  };
  geometry: any;
  countryData?: CountryData;
}

interface InteractiveGlobeProps {
  countries: CountryData[];
  onCountryClick?: (country: CountryData) => void;
  showCountriesList?: boolean;
  onGlobalProgramClick?: () => void;
  isRotationPaused?: boolean;
  setIsRotationPaused?: (paused: boolean) => void;
  onToggleCountriesList?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  /**
   * Optional custom color function to compute country colors dynamically
   * If provided, this will override the country's color property
   */
  customColorFn?: CountryColorFunction;
}

export function InteractiveGlobe({ countries, onCountryClick, showCountriesList = true, onGlobalProgramClick, isRotationPaused = false, setIsRotationPaused, onToggleCountriesList, onMouseEnter, onMouseLeave, customColorFn }: InteractiveGlobeProps) {
  const globeEl = useRef<any>(null);
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);
  const [cardStartPosition, setCardStartPosition] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [hoveredCountry, setHoveredCountry] = useState<CountryData | null>(null);
  const [polygonData, setPolygonData] = useState<PolygonFeature[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isHoveringGlobe, setIsHoveringGlobe] = useState(false);
  const GlobeComponent = useGlobe();
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Helper function to get country color dynamically
  const getColor = useCallback((country: CountryData | null | undefined): string => {
    if (!country) return '#00d9ff'; // Default fallback
    return getCountryColor(country, customColorFn);
  }, [customColorFn]);

  // Helper function to get country color with opacity
  const getColorWithOpacity = useCallback((country: CountryData | null | undefined, opacity: number): string => {
    if (!country) return `rgba(0, 217, 255, ${opacity})`; // Default fallback
    return getCountryColorWithOpacity(country, opacity, customColorFn);
  }, [customColorFn]);

  // Memoize selected country color to avoid recalculating
  const selectedCountryColor = useMemo(() => {
    return getColor(selectedCountry);
  }, [selectedCountry, getColor]);


  useEffect(() => {
    // Set initial dimensions - responsive based on screen size and countries list visibility
    const updateDimensions = () => {
      const isMobile = window.innerWidth < 768;
      // On mobile: subtract 220px for the bottom cards section if countries list is shown
      const mobileGlobeHeight = (isMobile && showCountriesList) ? window.innerHeight - 220 : window.innerHeight;

      // On desktop: use full width if countries list is hidden, otherwise 70%
      const desktopGlobeWidth = showCountriesList ? window.innerWidth * 0.7 : window.innerWidth;

      setDimensions({
        width: isMobile ? window.innerWidth : desktopGlobeWidth,
        height: isMobile ? mobileGlobeHeight : window.innerHeight
      });
    };

    updateDimensions();

    // Handle window resize
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [showCountriesList]);

  useEffect(() => {
    // Load polygon data for countries
    const countryIds = countries.map(c => c.id);
    const polygons = getCountryPolygons(countryIds);

    // Attach country data to each polygon
    const enrichedPolygons: PolygonFeature[] = polygons
      .filter(polygon => polygon.properties && polygon.properties.id)
      .map(polygon => ({
        ...polygon,
        countryData: countries.find(c => c.id === polygon.properties?.id)
      })) as PolygonFeature[];

    setPolygonData(enrichedPolygons);
    setIsLoading(false);
  }, [countries]);

  useEffect(() => {
    // Auto-rotate with smooth settings - with delay to ensure globe is ready
    // Stop rotation when a country is selected or when user pauses
    const timer = setTimeout(() => {
      if (globeEl.current && globeEl.current.controls) {
        try {
          const controls = globeEl.current.controls();
          if (controls) {
            controls.autoRotate = !selectedCountry && !isRotationPaused; // Stop rotation when country is selected or paused
            controls.autoRotateSpeed = 0.8;
            controls.enableDamping = true;
            controls.dampingFactor = 0.05;
            controls.rotateSpeed = 0.5;
            controls.zoomSpeed = 0.8;
            // Disable default zoom - we'll handle it manually with Ctrl+scroll
            controls.enableZoom = false;
          }
        } catch (error) {
          console.warn('Error setting globe controls:', error);
        }
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [polygonData, selectedCountry, isRotationPaused]);

  // Handle Ctrl+scroll for manual zoom control
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Only handle if hovering over globe and Ctrl key is pressed
      if (!isHoveringGlobe) return;

      // Only zoom if Ctrl key (or Cmd on Mac) is pressed
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        e.stopPropagation();

        if (globeEl.current && globeEl.current.camera) {
          try {
            const camera = globeEl.current.camera();
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

  const handlePolygonClick = (polygon: any, fromSidebar: boolean = false) => {
    const country = polygon.countryData;
    if (!country) return;

    // Get card position if clicked from sidebar
    const cardElement = cardRefs.current[country.id];
    if (fromSidebar && cardElement) {
      const rect = cardElement.getBoundingClientRect();
      setCardStartPosition({
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height
      });
    } else {
      // Reset position for globe clicks
      setCardStartPosition(null);
    }

    setSelectedCountry(country);
    if (onCountryClick) {
      onCountryClick(country);
    }

    // Animate camera to country
    if (globeEl.current) {
      globeEl.current.pointOfView(
        {
          lat: country.lat,
          lng: country.lng,
          altitude: 2
        },
        1000
      );
    }

    // Scroll to card on mobile
    const isMobile = window.innerWidth < 768;
    if (isMobile && cardRefs.current[country.id]) {
      setTimeout(() => {
        cardRefs.current[country.id]?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }, 100);
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

  const handleNextStep = () => {
    if (selectedCountry) {
      alert(`Proceeding to next step for ${selectedCountry.name}`);
      // You can replace this with actual navigation or modal
    }
  };

  // Helper function to get track-specific data
  const getTrackData = (countryId: string) => {
    const trackData: { [key: string]: { language: string; subtitles: string; programChair: string; affiliations?: string[] } } = {
      'germany': {
        language: 'German',
        subtitles: 'English',
        programChair: 'Coming soon',
      },
      'italy': {
        language: 'Italian',
        subtitles: 'English',
        programChair: 'Stefano Del Prato, MD',
        affiliations: [
          'Affiliate Professor of Medicine',
          'Interdisciplinary Research Center "Health Science"',
          'Sant\'Anna School of Advanced Studies',
          'Pisa, Italy'
        ]
      },
      'spain': {
        language: 'Spanish',
        subtitles: 'English',
        programChair: 'Coming soon',
      },
      'china': {
        language: 'Coming soon',
        subtitles: 'Coming soon',
        programChair: 'Coming soon',
      },
      'japan': {
        language: 'English',
        subtitles: 'Japanese',
        programChair: 'Takashi Kadowaki, MD, PhD',
        affiliations: [
          'President, Toranomon Hospital',
          'Professor Emeritus, The University of Tokyo',
          'Tokyo, Japan'
        ]
      },
      'brazil': {
        language: 'Coming soon',
        subtitles: 'Coming soon',
        programChair: 'Coming soon',
      },
      'saudi': {
        language: 'English',
        subtitles: 'Arabic',
        programChair: 'Nasreen Alfaris, MD, MPH',
        affiliations: [
          'Endocrinology, Diabetes, Metabolism, and Obesity Medicine',
          'Founder of the Saudi Obesity Medicine Fellowship',
          'Obesity, Endocrine, and Metabolism Center (OEMC)',
          'King Fahad Medical City (KFMC)',
          'Riyadh, Kingdom of Saudi Arabia'
        ]
      },
      'uae': {
        language: 'English',
        subtitles: 'Arabic',
        programChair: 'Nasreen Alfaris, MD, MPH',
        affiliations: [
          'Endocrinology, Diabetes, Metabolism, and Obesity Medicine',
          'Founder of the Saudi Obesity Medicine Fellowship',
          'Obesity, Endocrine, and Metabolism Center (OEMC)',
          'King Fahad Medical City (KFMC)',
          'Riyadh, Kingdom of Saudi Arabia'
        ]
      }
    };

    return trackData[countryId] || {
      language: 'English',
      subtitles: 'English',
      programChair: 'Coming soon',
    };
  };

  return (
    <div className="relative w-full h-full overflow-hidden flex flex-col md:flex-row">
      {/* Globe Container - dynamic width based on countries list visibility */}
      <motion.div
        className="relative w-full flex-1 md:h-full"
        animate={{
          width: showCountriesList ? (window.innerWidth >= 768 ? '70%' : '100%') : '100%'
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >

        {isLoading || dimensions.width === 0 || !GlobeComponent ? (
          <div className="flex items-center justify-center w-full h-full bg-gradient-to-b from-[#0a0e27] via-[#1a1f3a] to-[#0d1b2a]">
            <motion.div
              className="flex flex-col items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Loader2 className="w-12 h-12 text-cyan-400 animate-spin" />
              <p className="text-white">Loading Interactive Globe...</p>
            </motion.div>
          </div>
        ) : (
          <div
            id="globe-container"
            onMouseMove={handleMouseMove}
            onClick={(e) => {
              // Only toggle rotation if clicking on globe background (not on countries or UI elements)
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
            className="w-full h-full"
          >
            {/* Zoom instruction message */}
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10 pointer-events-none">
              <p className="text-white text-sm md:text-base" style={{ opacity: 0.6 }}>
                Use ctrl + scroll to zoom the globe
              </p>
            </div>

            {/* Wrap in error boundary-like try/catch */}
            {(() => {
              try {
                return (
                  <GlobeComponent
                    ref={globeEl}
                    globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                    bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                    backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
                    showAtmosphere={true}
                    atmosphereColor="lightskyblue"

                    // Country polygons with actual boundaries
                    polygonsData={polygonData}
                    // polygonGeoJsonGeometry="geometry"  
                    polygonCapColor={(d: any) => {
                      const countryData = d.countryData;
                      if (!countryData) return 'rgba(0, 0, 0, 0)';

                      const isHovered = hoveredCountry && hoveredCountry.id === countryData.id;
                      const isSelected = selectedCountry && selectedCountry.id === countryData.id;

                      // Use dynamic color function
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

                      // Use dynamic color function
                      return isHovered 
                        ? getColorWithOpacity(countryData, 0.2) 
                        : getColorWithOpacity(countryData, 0.1);
                    }}
                    polygonStrokeColor={(d: any) => {
                      const countryData = d.countryData;
                      if (!countryData) return 'rgba(100, 200, 255, 0.3)';

                      // Use dynamic color function - always return full color for borders
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
                    // polygonLabel={(d: any) => {
                    //   const countryData = d.countryData;
                    //   if (!countryData) return '';

                    //   return `
                    //   <div style=\"
                    //     background: linear-gradient(135deg, rgba(10, 14, 39, 0.98), rgba(26, 31, 58, 0.98));
                    //     color: ${countryData.color};
                    //     padding: 10px 16px;
                    //     border-radius: 10px;
                    //     border: 2px solid ${countryData.color};
                    //     box-shadow: 0 0 30px ${countryData.color}CC, 0 0 60px ${countryData.color}66, 0 8px 30px rgba(0,0,0,0.8);
                    //     backdrop-filter: blur(12px);
                    //     animation: tooltipFadeIn 0.2s ease-out;
                    //   \">
                    //     <div style=\"
                    //       font-weight: 600;
                    //       text-shadow: 0 0 20px ${countryData.color}, 0 0 40px ${countryData.color}80;
                    //       font-size: 15px;
                    //       letter-spacing: 0.5px;
                    //     \">${countryData.name}</div>
                    //   </div>
                    //   <style>
                    //     @keyframes tooltipFadeIn {
                    //       from {
                    //         opacity: 0;
                    //         transform: translateY(-8px) scale(0.96);
                    //       }
                    //       to {
                    //         opacity: 1;
                    //         transform: translateY(0) scale(1);
                    //       }
                    //     }
                    //   </style>
                    // `;
                    // }}
                    onPolygonClick={handlePolygonClick}
                    onPolygonHover={handlePolygonHover}

                    atmosphereAltitude={0.25}

                    width={dimensions.width}
                    height={dimensions.height}
                  />
                );
              } catch (error) {
                console.error('Error rendering globe:', error);
                return (
                  <div className="flex items-center justify-center w-full h-full bg-gradient-to-b from-[#0a0e27] via-[#1a1f3a] to-[#0d1b2a]">
                    <div className="text-center text-white">
                      <p className="text-xl mb-2">Unable to load globe</p>
                      <p className="text-sm opacity-60">Please refresh the page</p>
                    </div>
                  </div>
                );
              }
            })()}

            {hoveredCountry && (() => {
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
        <AnimatePresence>
          {selectedCountry && (() => {
            return (
              <motion.div
                initial={
                  cardStartPosition
                    ? {
                      position: 'fixed',
                      left: cardStartPosition.x,
                      top: cardStartPosition.y,
                      width: cardStartPosition.width,
                      height: cardStartPosition.height,
                      opacity: 0.8,
                      scale: 0.95,
                    }
                    : {
                      position: 'fixed',
                      left: '50%',
                      top: '50%',
                      x: '-50%',
                      y: '-50%',
                      opacity: 0,
                      scale: 0.85,
                    }
                }
                animate={{
                  position: 'fixed',
                  left: '50%',
                  top: '50%',
                  x: '-50%',
                  y: '-50%',
                  width: Math.min(480, window.innerWidth * 0.9),
                  height: 'auto',
                  opacity: 1,
                  scale: 1,
                }}
                exit={
                  cardStartPosition
                    ? {
                      left: cardStartPosition.x,
                      top: cardStartPosition.y,
                      x: 0,
                      y: 0,
                      width: cardStartPosition.width,
                      height: cardStartPosition.height,
                      opacity: 0,
                      scale: 0.8,
                    }
                    : {
                      opacity: 0,
                      scale: 0.85,
                    }
                }
                transition={
                  cardStartPosition
                    ? {
                      type: "spring",
                      stiffness: 180,
                      damping: 22,
                      mass: 0.9,
                    }
                    : {
                      duration: 0.4,
                      ease: [0.4, 0, 0.2, 1],
                    }
                }
                className="z-50"
                onClick={(e) => e.stopPropagation()}
              >
                <Card
                  className="bg-gradient-to-br from-[#0a0e27]/98 to-[#1a1f3a]/98 border-2 text-white backdrop-blur-xl overflow-hidden shadow-2xl"
                  style={{
                    borderColor: selectedCountryColor,
                    boxShadow: `0 0 50px ${selectedCountryColor}99, 0 0 100px ${selectedCountryColor}55, 0 20px 60px rgba(0,0,0,0.8)`
                  }}
                >
                  <div className="p-4">
                    {/* Header: Flag, Country Name, and Close Button in one row */}
                    <motion.div
                      className="flex items-center gap-3 mb-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: cardStartPosition ? 0.2 : 0.1, duration: 0.4 }}
                    >
                      {/* Flag Rectangle */}
                      {selectedCountry.image && (
                        <div className="relative w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 border-2" style={{ borderColor: selectedCountryColor }}>
                          <ImageWithFallback
                            src={selectedCountry.image}
                            alt={selectedCountry.name}
                            className="w-full h-full object-cover"
                          />
                          <div
                            className="absolute inset-0 ring-1 ring-inset"
                            style={{
                              boxShadow: `inset 0 0 10px ${selectedCountryColor}20`
                            }}
                          />
                        </div>
                      )}

                      {/* Country Name with Icon */}
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <motion.div
                          animate={{
                            rotate: [0, 10, -10, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 3
                          }}
                        >
                          <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: selectedCountryColor, filter: `drop-shadow(0 0 6px ${selectedCountryColor})` }} />
                        </motion.div>
                        <h3
                          className="text-lg truncate"
                          style={{
                            color: selectedCountryColor,
                            textShadow: `0 0 20px ${selectedCountryColor}, 0 0 40px ${selectedCountryColor}80`,
                            fontWeight: 600
                          }}
                        >
                          {selectedCountry.name}
                        </h3>
                      </div>

                      {/* Close Button */}
                      <motion.button
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                          setSelectedCountry(null);
                          setCardStartPosition(null);
                        }}
                        className="p-1.5 rounded-full transition-all duration-300 hover:bg-white/10 flex-shrink-0"
                        style={{ color: selectedCountryColor }}
                      >
                        <X className="w-5 h-5" />
                      </motion.button>
                    </motion.div>

                    {/* Target Audience */}
                    {selectedCountry.targetAudience && (
                      <motion.div
                        className="mb-3"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: cardStartPosition ? 0.3 : 0.15, duration: 0.4 }}
                      >
                        <div className="flex items-start gap-2 p-2.5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300"
                          style={{ borderColor: `${selectedCountryColor}20` }}
                        >
                          <Users className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: selectedCountryColor }} />
                          <div className="flex-1 min-w-0">
                            <span className="opacity-70 text-xs block mb-1">Target Audience</span>
                            <span
                              className="text-sm block leading-snug"
                              style={{
                                color: selectedCountryColor,
                                textShadow: `0 0 10px ${selectedCountryColor}40`,
                                fontWeight: 500
                              }}
                            >
                              Endocrinologists, diabetologists, and other healthcare professionals involved in the management of patients with T2DM
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    <motion.div
                      className="space-y-2.5 mb-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: cardStartPosition ? 0.4 : 0.2, duration: 0.4 }}
                    >
                      {/* Languages Box */}
                      {(() => {
                        const trackData = getTrackData(selectedCountry.id);
                        return (
                          <div className="flex items-start gap-2 p-2.5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300"
                            style={{ borderColor: `${selectedCountryColor}20` }}
                          >
                            <Languages className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: selectedCountryColor }} />
                            <div className="flex-1 min-w-0">
                              <div className="mb-1">
                                <span className="opacity-70 text-xs">Language: </span>
                                <span
                                  className="text-sm"
                                  style={{
                                    color: selectedCountryColor,
                                    textShadow: `0 0 10px ${selectedCountryColor}40`,
                                    fontWeight: 500
                                  }}
                                >
                                  {trackData.language}
                                </span>
                              </div>
                              <div>
                                <span className="opacity-70 text-xs">Subtitles: </span>
                                <span
                                  className="text-sm"
                                  style={{
                                    color: selectedCountryColor,
                                    textShadow: `0 0 10px ${selectedCountryColor}40`,
                                    fontWeight: 500
                                  }}
                                >
                                  {trackData.subtitles}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })()}

                      {/* Program Chair Box */}
                      {(() => {
                        const trackData = getTrackData(selectedCountry.id);
                        return (
                          <div className="flex items-start gap-2 p-2.5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300"
                            style={{ borderColor: `${selectedCountryColor}20` }}
                          >
                            <Users className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: selectedCountryColor }} />
                            <div className="flex-1 min-w-0">
                              <span className="opacity-70 text-xs block mb-1">Program Chair</span>
                              <div>
                                <span
                                  className="text-sm block"
                                  style={{
                                    color: selectedCountryColor,
                                    textShadow: `0 0 10px ${selectedCountryColor}40`,
                                    fontWeight: 500
                                  }}
                                >
                                  {trackData.programChair}
                                </span>
                                {trackData.affiliations && (
                                  <div className="text-xs opacity-60 mt-1">
                                    {trackData.affiliations.map((affiliation, index) => (
                                      <div key={index}>{affiliation}</div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })()}

                      {/* Credits Box */}
                      <div className="flex items-start gap-2 p-2.5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300"
                        style={{ borderColor: `${selectedCountryColor}20` }}
                      >
                        <Award className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: selectedCountryColor }} />
                        <div className="flex-1 min-w-0">
                          <span className="opacity-70 text-xs block mb-1">Credits</span>
                          <span
                            className="text-sm block"
                            style={{
                              color: selectedCountryColor,
                              textShadow: `0 0 10px ${selectedCountryColor}40`,
                              fontWeight: 500
                            }}
                          >
                            0.5 AMA PRA Category 1 Credit™
                          </span>
                          <span
                            className="text-sm block"
                            style={{
                              color: selectedCountryColor,
                              textShadow: `0 0 10px ${selectedCountryColor}40`,
                              fontWeight: 500
                            }}
                          >
                            0.5 ANCC contact hours
                          </span>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: cardStartPosition ? 0.5 : 0.25, duration: 0.4 }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          onClick={handleNextStep}
                          disabled={true}
                          className="w-full text-[#0a0e27] transition-all duration-300 shadow-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
                          style={{
                            backgroundColor: selectedCountryColor,
                            boxShadow: `0 4px 20px ${selectedCountryColor}40`,
                            fontWeight: 600
                          }}
                        >
                          Coming Soon
                        </Button>
                      </motion.div>
                    </motion.div>
                  </div>
                </Card>
              </motion.div>
            );
          })()}
        </AnimatePresence>

      </motion.div>

      {/* Country Cards Sidebar - 30% on desktop, fixed 220px height on mobile */}
      <AnimatePresence>
        {showCountriesList && (
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="relative w-full md:w-[30%] h-[220px] md:h-full bg-gradient-to-b from-[#0a0e27]/95 to-[#1a1f3a]/95 border-t-2 md:border-t-0 md:border-l-2 border-cyan-400/30 backdrop-blur-lg overflow-hidden flex-shrink-0"
          >
            <div className="p-3 md:p-6 h-full flex flex-col">
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
                  Select a Country
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
              <div className="flex md:grid md:grid-cols-2 gap-4 md:gap-6 overflow-x-auto md:overflow-x-visible md:overflow-y-auto pb-3 md:pb-0 flex-1 px-3 md:px-2 md:py-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] md:[scrollbar-width:thin]"
                style={{
                  scrollbarColor: 'rgba(0, 217, 255, 0.5) rgba(26, 31, 58, 0.5)'
                }}
              >
                {/* Global Program Card - First in the list */}
                <motion.div
                  key="global-program"
                  ref={(el) => { cardRefs.current['global-program'] = el; }}
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
                          Global Program
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
                      ref={(el) => { cardRefs.current[country.id] = el; }}
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}