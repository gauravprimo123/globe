import type { CountryData } from '@/types/country.types';
import type { LanguageCode } from '@/types/language.types';
import { COUNTRY_TRANSLATIONS } from '@/translations/countries';
import { getCountryColor, getCountryColorWithOpacity } from '@/utils/countryColors';
import type { CountryColorFunction } from '@/types/utils.types';

/**
 * Get the target audience label for a country based on the current language
 */
export function getTargetAudienceLabel(
  countryId: string,
  languageCode: LanguageCode
): string {
  const translations = COUNTRY_TRANSLATIONS[countryId.toLowerCase()];
  if (!translations) return 'Target Audience';
  return translations[languageCode]?.targetAudience?.label || translations.EN.targetAudience.label;
}

/**
 * Get country color dynamically with fallback
 */
export function getCountryColorHelper(
  country: CountryData | null | undefined,
  customColorFn?: CountryColorFunction
): string {
  if (!country) return '#00d9ff'; // Default fallback
  return getCountryColor(country, customColorFn);
}

/**
 * Get country color with opacity dynamically with fallback
 */
export function getCountryColorWithOpacityHelper(
  country: CountryData | null | undefined,
  opacity: number,
  customColorFn?: CountryColorFunction
): string {
  if (!country) return `rgba(0, 217, 255, ${opacity})`; // Default fallback
  return getCountryColorWithOpacity(country, opacity, customColorFn);
}

/**
 * Calculate card start position from element bounding rect
 */
export function getCardStartPosition(element: HTMLElement | null): {
  x: number;
  y: number;
  width: number;
  height: number;
} | null {
  if (!element) return null;
  
  const rect = element.getBoundingClientRect();
  return {
    x: rect.left,
    y: rect.top,
    width: rect.width,
    height: rect.height
  };
}

/**
 * Check if device is mobile based on window width
 */
export function isMobileDevice(): boolean {
  return typeof window !== 'undefined' && window.innerWidth < 768;
}

/**
 * Scroll element into view with smooth behavior (mobile helper)
 */
export function scrollToElement(
  element: HTMLElement | null,
  options?: ScrollIntoViewOptions
): void {
  if (!element) return;
  
  setTimeout(() => {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
      ...options
    });
  }, 100);
}
