import { useMemo } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { COUNTRY_TRANSLATIONS } from '@/translations/countries';
import { TRACK_DATA_TRANSLATIONS } from '@/translations/trackData';
import type { CountryData } from '@/types/country.types';
import type { TrackData } from '@/types/component.types';

/**
 * Hook to get translated country data based on current language
 */
export function useTranslatedCountries(countries: CountryData[]) {
  const { language } = useLanguage();

  const translatedCountries = useMemo(() => {
    return countries.map((country) => {
      const translations = COUNTRY_TRANSLATIONS[country.id.toLowerCase()];
      
      if (!translations) {
        // Fallback to original data if no translation found
        return country;
      }

      const translated = translations[language] || translations.EN;

      return {
        ...country,
        name: translated.name,
        description: translated.description,
        targetAudience: translated.targetAudience.content,
      };
    });
  }, [countries, language]);

  return translatedCountries;
}

/**
 * Hook to get translated track data for a country
 */
export function useTranslatedTrackData() {
  const { language } = useLanguage();

  const getTrackData = useMemo(() => {
    return (countryId: string): TrackData => {
      const translations = TRACK_DATA_TRANSLATIONS[countryId.toLowerCase()];
      
      if (!translations) {
        // Fallback to default
        return {
          language: { label: 'Language', value: 'English' },
          subtitles: { label: 'Subtitles', value: 'English' },
          programChair: { label: 'Program Chair', name: 'Coming soon' },
          credits: {
            label: 'Credits',
            ama: '0.5 AMA PRA Category 1 Credit™',
            ancc: '0.5 ANCC contact hours',
          },
        };
      }

      return translations[language] || translations.EN;
    };
  }, [language]);

  return getTrackData;
}
