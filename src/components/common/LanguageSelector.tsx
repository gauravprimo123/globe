import { useRef, useState, useCallback, memo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LANGUAGES } from "@/constants/languages";
import { Languages } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";


const LanguageSelector = memo(() => {
    const languageDropdownRef = useRef<HTMLDivElement>(null);
    const { language: currentLanguage, setLanguage } = useLanguage();
    const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

    const selectLanguage = useCallback((code: (typeof LANGUAGES)[number]["code"]) => {
        setLanguage(code);
        setShowLanguageDropdown(false);
    }, [setLanguage]);

    const toggleDropdown = useCallback(() => {
        setShowLanguageDropdown(prev => !prev);
    }, []);


    return (
        <div><motion.div
            ref={languageDropdownRef}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.4, type: "spring" }}
            className={`fixed bottom-6 left-6 z-10`}
        >
            <div className="relative mx-[7px] my-0">
                <motion.button
                    onClick={toggleDropdown}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    // Removed overflow-hidden from here if you want the badge to sit perfectly on the edge
                    className="relative w-12 h-12 z-10 rounded-full flex items-center justify-center cursor-pointer"
                    style={{
                        background: 'linear-gradient(135deg, rgba(26, 31, 58, 0.85), rgba(10, 14, 39, 0.85))',
                        border: '1.5px solid rgba(100, 150, 200, 0.4)',
                        boxShadow: '0 0 15px rgba(100, 150, 200, 0.2), 0 2px 10px rgba(0,0,0,0.3)'
                    }}
                >
                    <Languages className="w-5 h-5 text-slate-300" />
                </motion.button>

                {/* Moved Badge OUTSIDE the button to be on top of everything */}
                <div
                    className="absolute top-0 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs"
                    style={{
                        background: 'linear-gradient(135deg, rgba(26, 31, 58, 0.95), rgba(10, 14, 39, 0.95))',
                        zIndex: 100, // Higher than button (10) and Dropdown
                        border: '1px solid rgba(100, 150, 200, 0.5)',
                        fontSize: '9px',
                        color: '#94a3b8',
                        pointerEvents: 'none' // Allows clicks to pass through to the button
                    }}
                >
                    {currentLanguage}
                </div>

                {/* Dropdown Menu remains here */}
                <AnimatePresence>
                    {
                        showLanguageDropdown && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className="absolute bottom-full left-0 mb-2 w-52 rounded-lg overflow-hidden border backdrop-blur-xl"
                                style={{
                                    background: 'linear-gradient(135deg, rgba(26, 31, 58, 0.98), rgba(10, 14, 39, 0.98))',
                                    borderColor: 'rgba(100, 150, 200, 0.5)',
                                    boxShadow: '0 0 20px rgba(100, 150, 200, 0.3), 0 8px 20px rgba(0,0,0,0.5)'
                                }}
                            >
                                <div
                                    className="py-2 max-h-80 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-slate-400/40 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent"
                                    onWheel={(e) => {
                                        // Prevent scroll from propagating to parent elements
                                        e.stopPropagation();
                                    }}
                                >
                                    {LANGUAGES.map((lang) => (
                                        <motion.button
                                            key={lang.code}
                                            onClick={() => selectLanguage(lang.code)}
                                            // whileHover={{ x: 3 }}
                                            className={`w-full cursor-pointer px-3 py-2.5 flex items-center gap-2.5 transition-all duration-200 ${currentLanguage === lang.code
                                                ? 'bg-slate-500/20 border-l-2 border-slate-400'
                                                : 'hover:bg-slate-500/10 border-l-2 border-transparent '
                                                }`}
                                        >
                                            <span className="text-xl text-[rgb(255,255,255)]">{lang.flag}</span>
                                            <div className="flex flex-col items-start flex-1">
                                                <span
                                                    className="text-white text-xs"
                                                    style={{
                                                        fontWeight: currentLanguage === lang.code ? 600 : 500
                                                    }}
                                                >
                                                    {lang.name}
                                                </span>
                                                <span className="text-slate-400 text-xs opacity-70">{lang.code}</span>
                                            </div>
                                            {currentLanguage === lang.code && (
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    className="w-1.5 h-1.5 rounded-full bg-slate-400"
                                                />
                                            )}
                                        </motion.button>
                                    ))}
                                </div>
                            </motion.div>
                        )
                    }
                </AnimatePresence >
            </div>
        </motion.div></div>
    )
});

LanguageSelector.displayName = 'LanguageSelector';

export default LanguageSelector


