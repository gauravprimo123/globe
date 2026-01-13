/**
 * Translation-related type definitions
 */

import type { LanguageCode } from './language.types';
import type { TrackData } from './component.types';

export interface CommonTranslations {
  selectACountry: string;
  comingSoon: string;
  scrollToExplore: string;
  useCtrlScrollToZoom: string;
  globeTopInstruction: string;
  globeBottomInstruction: string;
}

export interface TranslatedCountryData {
  name: string;
  description: string;
  targetAudience: {
    label: string;
    content: string;
  };
}

export interface CountryTranslations {
  [key: string]: {
    [lang in LanguageCode]: TranslatedCountryData;
  };
}

export interface TrackDataTranslations {
  [countryId: string]: {
    [lang in LanguageCode]: TrackData;
  };
}

export interface GlobalProgramTranslations {
  title: string;
  targetAudience: {
    label: string;
    content: string;
  };
  language: {
    label: string;
    content: string;
  };
  subtitles: {
    label: string;
    content: string;
  };
  programChair: {
    label: string;
    name: string;
    affiliations: string[];
  };
  credits: {
    label: string;
    ama: string;
    ancc: string;
  };
  buttonText: string;
}
