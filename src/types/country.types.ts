/**
 * Country-related type definitions
 */

export interface CountryData {
  id: string;
  name: string;
  lat: number;
  lng: number;
  size: number;
  color: string;
  description: string;
  image?: string;
  targetAudience?: string;
  language?: string;
  subtitle?: string;
  faculty?: string;
  creditHours?: string;
  nextStep?: string;
}

export interface PolygonFeature {
  type: string;
  properties: {
    id: string;
    name: string;
  };
  geometry: any;
  countryData?: CountryData;
}
