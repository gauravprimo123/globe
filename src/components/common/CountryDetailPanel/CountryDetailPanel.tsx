import { motion, AnimatePresence } from 'motion/react';
import { Users } from 'lucide-react';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import type { CardStartPosition, CountryDetailPanelProps, TrackData } from '@/types/component.types';
import { CountryDetailHeader } from './CountryDetailHeader';
import { InfoBox } from './InfoBox';
import { LanguageInfoBox } from './LanguageInfoBox';
import { ProgramChairInfoBox } from './ProgramChairInfoBox';
import { CreditsInfoBox } from './CreditsInfoBox';
import { DEFAULT_CREDITS, DEFAULT_TRACK_DATA } from './constants';

export type { TrackData, CardStartPosition, CountryDetailPanelProps };

/**
 * Reusable Country Detail Panel Component
 * 
 * Displays detailed information about a selected country in an animated modal panel.
 * Supports smooth animations from sidebar cards or center appearance.
 */
export function CountryDetailPanel({
  country,
  countryColor,
  cardStartPosition = null,
  getTrackData,
  onClose,
  onNextStep,
  credits = DEFAULT_CREDITS,
  targetAudience,
  targetAudienceLabel,
  isNextStepDisabled = true,
  nextStepButtonText = 'Coming Soon',
}: CountryDetailPanelProps) {
  const trackData = country && getTrackData
    ? getTrackData(country.id)
    : DEFAULT_TRACK_DATA;

  const displayTargetAudience = targetAudience || country?.targetAudience;

  // Animation configuration
  const initialAnimation = cardStartPosition
    ? {
        position: 'fixed' as const,
        left: cardStartPosition.x,
        top: cardStartPosition.y,
        width: cardStartPosition.width,
        height: cardStartPosition.height,
        opacity: 0.8,
        scale: 0.95,
      }
    : {
        position: 'fixed' as const,
        left: '50%',
        top: '50%',
        x: '-50%',
        y: '-50%',
        opacity: 0,
        scale: 0.85,
      };

  const animateAnimation = {
    position: 'fixed' as const,
    left: '50%',
    top: '50%',
    x: '-50%',
    y: '-50%',
    width: Math.min(480, window.innerWidth * 0.9),
    height: 'auto' as const,
    opacity: 1,
    scale: 1,
  };

  const transitionConfig = cardStartPosition
    ? {
        type: 'spring' as const,
        stiffness: 180,
        damping: 22,
        mass: 0.9,
      }
    : {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
      };

  // Slower exit transition for smoother close animation
  const exitTransitionConfig = cardStartPosition
    ? {
        type: 'spring' as const,
        stiffness: 100, // Lower stiffness = slower animation
        damping: 20,   // Lower damping = more bouncy/slower
        mass: 1.2,      // Higher mass = slower
      }
    : {
        duration: 0.6, // Increased from 0.4 to 0.6 for slower fade
        ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
      };

  // Animation delay helpers
  const getDelay = (baseDelay: number) => (cardStartPosition ? baseDelay : baseDelay / 2);

  const exitAnimation = cardStartPosition
    ? {
        position: 'fixed' as const,
        left: cardStartPosition.x,
        top: cardStartPosition.y,
        x: 0,
        y: 0,
        width: cardStartPosition.width,
        height: cardStartPosition.height,
        opacity: 0,
        scale: 0.8,
        transition: exitTransitionConfig,
      }
    : {
        position: 'fixed' as const,
        left: '50%',
        top: '50%',
        x: '-50%',
        y: '-50%',
        width: Math.min(480, window.innerWidth * 0.9),
        height: 'auto' as const,
        opacity: 0,
        scale: 0.95,
        transition: exitTransitionConfig,
      };

  // Convert hex color to rgba for scrollbar
  const hexToRgba = (hex: string, alpha: number) => {
    // Handle hex colors with or without #
    const cleanHex = hex.startsWith('#') ? hex.slice(1) : hex;
    
    // Handle 3-digit hex colors
    const fullHex = cleanHex.length === 3
      ? cleanHex.split('').map(char => char + char).join('')
      : cleanHex;
    
    const r = parseInt(fullHex.slice(0, 2), 16);
    const g = parseInt(fullHex.slice(2, 4), 16);
    const b = parseInt(fullHex.slice(4, 6), 16);
    
    // Return fallback if parsing fails
    if (isNaN(r) || isNaN(g) || isNaN(b)) {
      return `rgba(0, 217, 255, ${alpha})`; // Default cyan fallback
    }
    
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  // Generate unique ID for this panel's scrollbar styles
  const scrollbarId = `country-panel-scrollbar-${country?.id || 'default'}`;

  return (
    <AnimatePresence>
      {country && (
        <motion.div
          key={country.id}
          initial={initialAnimation}
          animate={animateAnimation}
          exit={exitAnimation}
          transition={transitionConfig}
          className="z-50"
          onClick={(e) => e.stopPropagation()}
        >
        {/* Dynamic scrollbar styles */}
        <style>
          {`
            .${scrollbarId}::-webkit-scrollbar {
              width: 8px;
            }
            .${scrollbarId}::-webkit-scrollbar-track {
              background: rgba(26, 31, 58, 0.3);
              border-radius: 10px;
            }
            .${scrollbarId}::-webkit-scrollbar-thumb {
              background: ${hexToRgba(countryColor, 0.6)};
              border-radius: 10px;
              box-shadow: 0 0 10px ${hexToRgba(countryColor, 0.8)}, inset 0 0 5px ${hexToRgba(countryColor, 0.3)};
              transition: all 0.3s ease;
            }
            .${scrollbarId}::-webkit-scrollbar-thumb:hover {
              background: ${hexToRgba(countryColor, 0.8)};
              box-shadow: 0 0 15px ${hexToRgba(countryColor, 1)}, inset 0 0 8px ${hexToRgba(countryColor, 0.5)};
            }
            .${scrollbarId} {
              scrollbar-width: thin;
              scrollbar-color: ${hexToRgba(countryColor, 0.6)} rgba(26, 31, 58, 0.3);
            }
          `}
        </style>
        <Card
          className={`bg-gradient-to-br from-[#0a0e27]/98 to-[#1a1f3a]/98 border-2 text-white backdrop-blur-xl overflow-y-auto shadow-2xl ${scrollbarId}`}
          style={{
            borderColor: countryColor,
            boxShadow: `0 0 50px ${countryColor}99, 0 0 100px ${countryColor}55, 0 20px 60px rgba(0,0,0,0.8)`,
            maxHeight: '95vh',
          }}
        >
          <div className="p-4">
            {/* Header: Flag, Country Name, and Close Button */}
            <CountryDetailHeader
              country={country}
              countryColor={countryColor}
              onClose={onClose}
              delay={getDelay(0.2)}
            />

            {/* Target Audience */}
            {displayTargetAudience && (
              <InfoBox
                icon={Users}
                label={targetAudienceLabel || "Target Audience"}
                value={displayTargetAudience}
                countryColor={countryColor}
                delay={getDelay(0.3)}
              />
            )}

            {/* Content Section */}
            <motion.div
              className="space-y-2.5 mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: getDelay(0.4), duration: 0.4 }}
            >
              {/* Languages Box */}
              <LanguageInfoBox
                trackData={trackData}
                countryColor={countryColor}
              />

              {/* Program Chair Box */}
              <ProgramChairInfoBox
                trackData={trackData}
                countryColor={countryColor}
              />

              {/* Credits Box */}
              <CreditsInfoBox
                credits={trackData.credits || credits}
                creditsLabel={trackData.credits?.label}
                countryColor={countryColor}
              />
            </motion.div>

            {/* Next Step Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: getDelay(0.5), duration: 0.4 }}
            >
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  disabled={trackData.buttonText?.href === "#"}
                  onClick={() => {
                    if (trackData.buttonText?.href) {
                      window.open(trackData.buttonText?.href, '_blank', 'noopener,noreferrer');
                    }
                  }}
                  className="w-full text-[#0a0e27] cursor-pointer transition-all duration-300 shadow-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
                  style={{
                    backgroundColor: countryColor,
                    boxShadow: `0 4px 20px ${countryColor}40`,
                    fontWeight: 600,
                  }}
                >
                  {trackData.buttonText?.label}
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
