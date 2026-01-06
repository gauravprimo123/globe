import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { LANGUAGES } from "@/constants/languages";

type LanguageCode = (typeof LANGUAGES)[number]["code"];

type LanguageContextValue = {
  language: LanguageCode;
  setLanguage: (code: LanguageCode) => void;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

type LanguageProviderProps = {
  children: ReactNode;
  initialLanguage?: LanguageCode;
};

export function LanguageProvider({ children, initialLanguage = "EN" }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<LanguageCode>(initialLanguage);

  const setLanguage = useCallback((code: LanguageCode) => {
    setLanguageState((prev) => {
      // Only update if language actually changed
      if (prev !== code) {
        return code;
      }
      return prev;
    });
  }, []);

  // Memoize context value - only recreate when language actually changes
  const value = useMemo(
    () => ({
      language,
      setLanguage,
    }),
    [language, setLanguage]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
