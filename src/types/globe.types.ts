/**
 * Globe/Interactive Globe-related type definitions
 */

import type { CountryData } from './country.types';
import type { CountryColorFunction } from './utils.types';

export interface InteractiveGlobeProps {
  countries: CountryData[];
  onCountryClick?: (country: CountryData) => void;
  showCountriesList?: boolean;
  onGlobalProgramClick?: () => void;
  isRotationPaused?: boolean;
  setIsRotationPaused?: (paused: boolean) => void;
  onToggleCountriesList?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  /**
   * Optional custom color function to compute country colors dynamically
   * If provided, this will override the country's color property
   */
  customColorFn?: CountryColorFunction;
}
