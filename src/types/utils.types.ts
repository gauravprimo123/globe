/**
 * Utility-related type definitions
 */

import type { CountryData } from './country.types';

export type CountryColorFunction = (country: CountryData) => string | null;
