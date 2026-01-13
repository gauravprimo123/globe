import { createContext, ReactNode, useContext, useState } from "react";
import { LANGUAGES } from "@/constants/languages";

type LanguageCode = (typeof LANGUAGES)[number]["code"];

type LanguageContextValue = {
  currentLanguage: LanguageCode;
  setLanguage: (code: LanguageCode) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("EN");

  const value: LanguageContextValue = {
    currentLanguage,
    setLanguage: setCurrentLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
