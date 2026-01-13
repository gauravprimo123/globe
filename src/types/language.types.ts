/**
 * Language-related type definitions
 */

import { LANGUAGES } from '@/constants/languages';
import type { ReactNode } from 'react';

export type LanguageCode = (typeof LANGUAGES)[number]["code"];

export interface Language {
  code: string;
  name: string;
  flag: string;
}

export interface LanguageContextValue {
  language: LanguageCode;
  setLanguage: (code: LanguageCode) => void;
}

export interface LanguageProviderProps {
  children: ReactNode;
  initialLanguage?: LanguageCode;
}
