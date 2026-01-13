// Dynamic country color system
// Allows colors to be computed dynamically while maintaining backward compatibility

import type { CountryData } from "@/types/country.types";

/**
 * Default color palette for countries
 * Used as fallback or for generating colors dynamically
 */
const DEFAULT_COLORS = [
  '#39FF14', // Neon Green
  '#FF10F0', // Neon Pink
  '#FF6600', // Neon Orange
  '#FF073A', // Neon Red
  '#FFFF00', // Neon Yellow
  '#BC13FE', // Neon Purple
  '#CCFF00', // Neon Lime
  '#00FFF0', // Neon Cyan
  '#FF1493', // Deep Pink
  '#00FF00', // Lime
  '#FF00FF', // Magenta
  '#00FFFF', // Aqua
  '#FFA500', // Orange
  '#FF69B4', // Hot Pink
  '#9370DB', // Medium Purple
  '#20B2AA', // Light Sea Green
];

/**
 * Generate a color based on country ID using hash function
 * Ensures consistent colors for the same country ID
 */
function generateColorFromId(countryId: string): string {
  let hash = 0;
  for (let i = 0; i < countryId.length; i++) {
    hash = countryId.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % DEFAULT_COLORS.length;
  return DEFAULT_COLORS[index];
}

/**
 * Generate a color based on country name
 */
function generateColorFromName(countryName: string): string {
  return generateColorFromId(countryName.toLowerCase().replace(/\s+/g, '-'));
}

/**
 * Get country color dynamically
 * Priority:
 * 1. Country's explicit color property (if exists)
 * 2. Custom color function (if provided)
 * 3. Generated color from country ID
 * 4. Generated color from country name
 * 5. Default fallback color
 * 
 * @param country - Country data object
 * @param customColorFn - Optional function to compute custom color
 * @returns Hex color string
 */
export function getCountryColor(
  country: CountryData,
  customColorFn?: (country: CountryData) => string | null
): string {
  // 1. Use explicit color if provided
  if (country.color) {
    return country.color;
  }

  // 2. Use custom color function if provided
  if (customColorFn) {
    const customColor = customColorFn(country);
    if (customColor) {
      return customColor;
    }
  }

  // 3. Generate from country ID
  if (country.id) {
    return generateColorFromId(country.id);
  }

  // 4. Generate from country name
  if (country.name) {
    return generateColorFromName(country.name);
  }

  // 5. Fallback to first default color
  return DEFAULT_COLORS[0];
}

/**
 * Get country color with opacity
 * @param country - Country data object
 * @param opacity - Opacity value (0-1)
 * @param customColorFn - Optional function to compute custom color
 * @returns RGBA color string
 */
export function getCountryColorWithOpacity(
  country: CountryData,
  opacity: number,
  customColorFn?: (country: CountryData) => string | null
): string {
  const hex = getCountryColor(country, customColorFn);
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

/**
 * Get country color with alpha channel (for hex with alpha)
 * @param country - Country data object
 * @param alpha - Alpha value (00-FF)
 * @param customColorFn - Optional function to compute custom color
 * @returns Hex color string with alpha
 */
export function getCountryColorWithAlpha(
  country: CountryData,
  alpha: string,
  customColorFn?: (country: CountryData) => string | null
): string {
  const hex = getCountryColor(country, customColorFn);
  return `${hex}${alpha}`;
}

/**
 * Type for custom color function
 */
import type { CountryColorFunction } from '@/types/utils.types';

export type { CountryColorFunction };

/**
 * Example custom color functions
 */

/**
 * Color based on region/continent
 */
export function getColorByRegion(country: CountryData): string | null {
  // Example: You can implement region-based coloring
  // const region = getCountryRegion(country.id);
  // return REGION_COLORS[region];
  return null; // Return null to fall back to default
}

/**
 * Color based on country size/population
 */
export function getColorBySize(country: CountryData): string | null {
  // Example: Larger countries get brighter colors
  // if (country.size > 0.9) return '#FF0000';
  // if (country.size > 0.7) return '#00FF00';
  return null;
}

/**
 * Color based on language
 */
export function getColorByLanguage(country: CountryData): string | null {
  // Example: Group countries by language
  // const langColors: Record<string, string> = {
  //   'German': '#39FF14',
  //   'Italian': '#FF10F0',
  //   // ...
  // };
  // return langColors[country.language || ''];
  return null;
}
