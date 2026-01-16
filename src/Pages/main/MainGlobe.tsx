import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
// @ts-ignore - AnimatePresence is available but types may not be up to date
import { AnimatePresence } from 'motion/react';

// icons
import { Languages, List, ChevronDown, X, Globe, Users, Award } from 'lucide-react';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { InteractiveGlobe } from '@/components/InteractiveGlobe';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import type { CountryData } from '@/types/country.types';


// Images
import globalProgramImage from "@/assets/globe-img.png";
import LanguageSelector from '@/components/common/LanguageSelector';
import { COUNTRIES } from '@/constants/countries';
import { useTranslatedCountries } from '@/hooks/useTranslatedCountries';
import { useDeviceOrientation } from '@/hooks/useDeviceOrientation';
import { useLanguage } from '@/context/LanguageContext';
import { GLOBAL_PROGRAM_TRANSLATIONS } from '@/translations/globalProgram';
import { COMMON_TRANSLATIONS } from '@/translations/commonTranslation';

// Suppress Three.js multiple instances warning since we're using a singleton pattern
const originalWarn = console.warn;
console.warn = function (...args) {
    if (args[0]?.includes?.('Multiple instances of Three.js')) {
        return;
    }
    originalWarn.apply(console, args);
};

export default function MainGlobe() {
    const [showHero, setShowHero] = useState(true);
    const [showCountriesList, setShowCountriesList] = useState(true);
    const [showGlobalProgram, setShowGlobalProgram] = useState(false);
    const [headerHeight, setHeaderHeight] = useState(100);
    const [footerHeight, setFooterHeight] = useState(60);
    const [isRotationPaused, setIsRotationPaused] = useState(false);
    const [isHoveringGlobe, setIsHoveringGlobe] = useState(false);

    // Get translated countries based on current language
    const translatedCountries = useTranslatedCountries(COUNTRIES);
    const { language } = useLanguage();
    const { isLandscape, isMobile } = useDeviceOrientation();

    // Get translated global program content
    const globalProgramContent = GLOBAL_PROGRAM_TRANSLATIONS[language] || GLOBAL_PROGRAM_TRANSLATIONS.EN;


    useEffect(() => {
        let scrollAccumulator = 0;

        const handleWheel = (e: WheelEvent) => {
            if (showHero) {
                // Prevent page scrolling when hero is visible
                e.preventDefault();
                e.stopPropagation();

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
            if (showHero) {
                // Prevent page scrolling when hero is visible
                e.preventDefault();
                e.stopPropagation();

                const touch = e.touches[0];
                const delta = Math.abs(scrollAccumulator - touch.clientY);

                if (delta > 25) {
                    setShowHero(false);
                    scrollAccumulator = 0;
                }
            }
        };

        // Prevent body scroll when hero is visible
        if (showHero) {
            // Prevent scrolling on document body
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';

            // Add scroll event listeners
            window.addEventListener('wheel', handleWheel, { passive: false });
            window.addEventListener('touchstart', handleTouchStart, { passive: false });
            window.addEventListener('touchmove', handleTouchMove, { passive: false });
        } else {
            // Re-enable scrolling when hero is hidden
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        }

        return () => {
            // Cleanup: re-enable scrolling
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';

            // Remove event listeners
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
        };
    }, [showHero]);

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
        const timeouts = [
          setTimeout(measureElements, 500),
          setTimeout(measureElements, 1000)
        ];

        // Measure on window resize
        window.addEventListener('resize', measureElements);
        return () => {
          window.removeEventListener('resize', measureElements);
          timeouts.forEach(clearTimeout);
        };
    }, []);

    // Highlighted countries with vibrant neon colors and information
    const handleCountryClick = (country: CountryData) => {
        console.log('Country clicked:', country);
    };

    return (
        <div className="relative h-[calc(100vh-80px)] w-full bg-gradient-to-b from-[#0a0e27] via-[#1a1f3a] to-[#0d1b2a]">

            {/* Language Selector Dropdown - Bottom Left above Global Program */}
            <LanguageSelector />

            {/* Globe Section - Natural height */}
            <div className="relative w-full h-full">
                {/* Show Countries Button - appears when list is hidden, positioned exactly where the X button is */}
                <AnimatePresence>
                    {!showCountriesList && (
                        <div className="absolute cursor-pointer top-3 md:top-6 right-0 overflow-hidden z-50 h-fit w-fit p-3">
                            <motion.button
                                initial={{ opacity: 0, x: '100%' }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: '100%' }}
                                transition={{ duration: 0.3, ease: 'easeOut' }}
                                onClick={() => setShowCountriesList(true)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="p-3 rounded-full"
                                style={{
                                    background: 'linear-gradient(135deg, rgba(26, 31, 58, 0.85), rgba(10, 14, 39, 0.85))',
                                    border: '2px solid rgba(0, 217, 255, 0.5)',
                                    boxShadow: '0 0 20px rgba(0, 217, 255, 0.3), 0 4px 15px rgba(0,0,0,0.5)'
                                }}
                            >
                                <List className="w-6 h-6" style={{ color: '#00d9ff' }} />
                            </motion.button>
                        </div>
                    )}
                </AnimatePresence>

                <InteractiveGlobe
                    countries={translatedCountries}
                    onCountryClick={handleCountryClick}
                    showCountriesList={showCountriesList}
                    onGlobalProgramClick={() => setShowGlobalProgram(true)}
                    isRotationPaused={isRotationPaused}
                    setIsRotationPaused={setIsRotationPaused}
                    onToggleCountriesList={() => setShowCountriesList(!showCountriesList)}
                    onMouseEnter={() => setIsHoveringGlobe(true)}
                    onMouseLeave={() => setIsHoveringGlobe(false)}
                />

            </div>

            {/* Hero Section with Heading - Overlays the globe */}
            <AnimatePresence>
                {showHero && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{
                            opacity: 0,
                            y: -50
                        }}
                        transition={{
                            duration: 0.4,
                            ease: "easeOut"
                        }}
                        className="fixed inset-0 z-30 flex items-center justify-center"
                        onClick={(e) => {
                            // Prevent clicks from passing through to elements below
                            e.stopPropagation();
                        }}
                        onMouseDown={(e) => {
                            // Prevent mouse events from passing through
                            e.stopPropagation();
                        }}
                    >
                        {/* Night Lights Map Background Layer */}
                        <motion.div
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="absolute inset-0 overflow-hidden pointer-events-none"
                        >
                            <div className="absolute inset-0 backdrop-blur-2xl bg-gradient-to-b from-[#0a0e27]/95 via-[#1a1f3a]/90 to-[#0d1b2a]/85" />
                            <ImageWithFallback
                                src="https://images.unsplash.com/photo-1634176866089-b633f4aec882?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlYXJ0aCUyMG5pZ2h0JTIwbGlnaHRzJTIwc2F0ZWxsaXRlfGVufDF8fHx8MTc2MzU0OTEwMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                                alt="Earth Night Lights"
                                className="w-full h-full object-cover opacity-40 blur-sm"
                                style={{
                                    filter: 'blur(8px) brightness(0.8) contrast(1.2)',
                                    mixBlendMode: 'screen'
                                }}
                            />
                            {/* Animated glow effect overlay */}
                            <motion.div
                                animate={{
                                    opacity: [0.3, 0.5, 0.3],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="absolute inset-0 bg-gradient-radial from-cyan-500/20 via-blue-500/10 to-transparent"
                            />
                            {/* Additional blur overlay for more depth */}
                            <div className="absolute inset-0 backdrop-blur-xl bg-black/30" />
                        </motion.div>

                        {/* Content Layer */}
                        <div className="text-center px-6 relative z-10 pointer-events-none">
                            {/* Spacer to push content to center */}
                            <div style={{ height: 'calc(var(--header-height, 100px))' }} />

                            <motion.h1
                                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className="text-4xl md:text-6xl mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent pb-2"
                                style={{
                                    textShadow: '0 0 80px rgba(0, 217, 255, 0.5)',
                                    fontWeight: 700,
                                    letterSpacing: '-0.02em',
                                    lineHeight: '1.2'
                                }}
                            >
                                A Global Approach to<br />
                                Advancing Type 2 Diabetes Care
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 0.8 }}
                                className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto"
                            >
                                Connecting expertise, innovation, and real-world solutions to overcome challenges and improve diabetes management across diverse populations.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 1.1 }}
                                className="flex flex-col items-center gap-4"
                            >
                                <motion.div
                                    animate={{ y: [0, 10, 0] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <ChevronDown className="w-12 h-12 text-cyan-400" style={{ filter: 'drop-shadow(0 0 10px rgba(0, 217, 255, 0.8))' }} />
                                </motion.div>
                                <p className="text-white/60 text-sm">{COMMON_TRANSLATIONS[language].scrollToExplore}</p>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Global Program Popup Modal - Same design and animation as country detail panel */}
            <AnimatePresence>
                {showGlobalProgram && (
                    <>
                        {/* Backdrop Blur/Dim Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-md"
                            onClick={() => setShowGlobalProgram(false)}
                        />

                        {/* Animated Global Program Detail Panel - Matching CountryDetailPanel animations */}
                        <motion.div
                            key="global-program-panel"
                            initial={{
                                position: 'fixed' as const,
                                left: '50%',
                                top: '50%',
                                x: '-50%',
                                y: '-50%',
                                opacity: 0,
                                scale: 0.85,
                            }}
                            animate={{
                                position: 'fixed' as const,
                                left: '50%',
                                top: '50%',
                                x: '-50%',
                                y: '-50%',
                                width: Math.min(480, window.innerWidth * 0.9),
                                height: 'auto' as const,
                                opacity: 1,
                                scale: 1,
                            }}
                            exit={{
                                position: 'fixed' as const,
                                left: '50%',
                                top: '50%',
                                x: '-50%',
                                y: '-50%',
                                width: Math.min(480, window.innerWidth * 0.9),
                                height: 'auto' as const,
                                opacity: 0,
                                scale: 0.95,
                                transition: {
                                    duration: 0.6,
                                    ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
                                },
                            }}
                            transition={{
                                duration: 0.4,
                                ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
                            }}
                            className="z-50"
                            onClick={(e: any) => e.stopPropagation()}
                        >
                            <Card
                                className="bg-gradient-to-br from-[#0a0e27]/98 to-[#1a1f3a]/98 
                                border-2 text-white backdrop-blur-xl overflow-y-scroll  shadow-2xl
                                max-h-[90vh] flex flex-col"
                                style={{
                                    borderColor: '#00d9ff',
                                    boxShadow: `0 0 50px #00d9ff99, 0 0 100px #00d9ff55, 0 20px 60px rgba(0,0,0,0.8)`,
                                    scrollbarColor: 'rgba(0, 217, 255, 0.5) rgba(26, 31, 58, 0.5)'
                                }}
                            >
                                {/* Header Image */}
                                <div className="w-full h-32 overflow-hidden relative">
                                    <motion.div
                                        initial={{ scale: 1.2, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                                    >
                                        <ImageWithFallback
                                            src={globalProgramImage}
                                            alt="Global Program"
                                            className="w-full h-full object-cover"
                                        />
                                    </motion.div>
                                    <div
                                        className="absolute inset-0 bg-gradient-to-t from-[#0a0e27] via-[#0a0e27]/30 to-transparent"
                                    />
                                </div>

                                <div className="p-4 pt-0 -mt-2">
                                    {/* Header with Globe Icon and Title */}
                                    <motion.div
                                        className="flex items-start justify-between mb-3"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.15, duration: 0.4 }}
                                    >
                                        <div className="flex items-center gap-2">
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
                                                <Globe className="w-5 h-5" style={{ color: '#00d9ff', filter: `drop-shadow(0 0 6px #00d9ff)` }} />
                                            </motion.div>
                                            <h3
                                                className="text-lg"
                                                style={{
                                                    color: '#00d9ff',
                                                    textShadow: `0 0 20px #00d9ff, 0 0 40px #00d9ff80`,
                                                    fontWeight: 600
                                                }}
                                            >
                                                {globalProgramContent.title}
                                            </h3>
                                        </div>
                                        <motion.button
                                            whileHover={{ scale: 1.1, rotate: 90 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => setShowGlobalProgram(false)}
                                            className="p-1.5 rounded-full transition-all duration-300 hover:bg-white/10"
                                            style={{ color: '#00d9ff' }}
                                        >
                                            <X className="w-5 h-5" />
                                        </motion.button>
                                    </motion.div>

                                    {/* Target Audience */}
                                    <motion.div
                                        className="mb-3"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.22, duration: 0.4 }}
                                    >
                                        <div className="flex items-start gap-2 p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                                            <Users className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#00d9ff' }} />
                                            <div className="flex-1 min-w-0">
                                                <span className="opacity-90 text-xs block">{globalProgramContent.targetAudience.label}</span>
                                                <span
                                                    className="text-sm block"
                                                    style={{
                                                        color: '#00d9ff',
                                                        textShadow: `0 0 10px #00d9ff80`,
                                                        fontWeight: 500
                                                    }}
                                                >
                                                    {globalProgramContent.targetAudience.content}
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        className="space-y-2 mb-3"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.25, duration: 0.4 }}
                                    >
                                        {/* Languages Box */}
                                        <div className="flex items-start gap-2 p-2.5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                                            <Languages className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#00d9ff' }} />
                                            <div className="flex-1 min-w-0">
                                                <div className="mb-1">
                                                    <span className="opacity-70 text-xs">{globalProgramContent.language.label}: </span>
                                                    <span
                                                        className="text-sm"
                                                        style={{
                                                            color: '#00d9ff',
                                                            textShadow: `0 0 10px #00d9ff80`,
                                                            fontWeight: 500
                                                        }}
                                                    >
                                                        {globalProgramContent.language.content}
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="opacity-70 text-xs">{globalProgramContent.subtitles.label}: </span>
                                                    <span
                                                        className="text-sm"
                                                        style={{
                                                            color: '#00d9ff',
                                                            textShadow: `0 0 10px #00d9ff80`,
                                                            fontWeight: 500
                                                        }}
                                                    >
                                                        {globalProgramContent.subtitles.content}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Program Chair Box */}
                                        <div className="flex items-start gap-2 p-2.5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                                            <Users className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#00d9ff' }} />
                                            <div className="flex-1 min-w-0">
                                                <span className="opacity-70 text-xs block mb-1">{globalProgramContent.programChair.label}</span>
                                                <div>
                                                    <span
                                                        className="text-sm block"
                                                        style={{
                                                            color: '#00d9ff',
                                                            textShadow: `0 0 10px #00d9ff80`,
                                                            fontWeight: 500
                                                        }}
                                                    >
                                                        {globalProgramContent.programChair.name}
                                                    </span>
                                                    {globalProgramContent.programChair.affiliations.map((affiliation, index) => (
                                                        <span key={index} className="opacity-60 text-xs block mt-0.5">
                                                            {affiliation}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Credits Box */}
                                        <div className="flex items-start gap-2 p-2.5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                                            <Award className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#00d9ff' }} />
                                            <div className="flex-1 min-w-0">
                                                <span className="opacity-70 text-xs block mb-1">{globalProgramContent.credits.label}</span>
                                                <span
                                                    className="text-sm block"
                                                    style={{
                                                        color: '#00d9ff',
                                                        textShadow: `0 0 10px #00d9ff80`,
                                                        fontWeight: 500
                                                    }}
                                                >
                                                    {globalProgramContent.credits.ama}
                                                </span>
                                                <span
                                                    className="text-sm block"
                                                    style={{
                                                        color: '#00d9ff',
                                                        textShadow: `0 0 10px #00d9ff80`,
                                                        fontWeight: 500
                                                    }}
                                                >
                                                    {globalProgramContent.credits.ancc}
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Access Activity Button */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3, duration: 0.4 }}
                                    >
                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <Button
                                                onClick={() => {
                                                    window.open('https://www.medlearninggroup.com/cme-programming/beyond-borders-bridging-gaps-in-the-management-of-type-2-diabetes-across-the-globe/', '_blank', 'noopener,noreferrer');
                                                }}
                                                className="w-full text-[#0a0e27] transition-all duration-300 shadow-lg py-5"
                                                style={{
                                                    backgroundColor: '#00d9ff',
                                                    boxShadow: `0 0 30px #00d9ff99, 0 4px 20px #00d9ff80`,
                                                    fontWeight: 600
                                                }}
                                            >
                                                {globalProgramContent.buttonText}
                                            </Button>
                                        </motion.div>
                                    </motion.div>
                                </div>
                            </Card>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}