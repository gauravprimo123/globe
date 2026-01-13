import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { LanguageCode, LanguageContextValue, LanguageProviderProps } from "@/types/language.types";

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export type { LanguageCode, LanguageContextValue, LanguageProviderProps };

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

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
