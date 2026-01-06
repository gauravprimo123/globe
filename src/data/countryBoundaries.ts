// Country boundaries from TopoJSON converted to GeoJSON features
// Uses topojson-client to convert TopoJSON geometries to GeoJSON format
// Scalable: Just add countries to COUNTRIES array in constants/countries.ts

// @ts-ignore - topojson-client doesn't have type definitions
import { feature } from "topojson-client";
import { COUNTRIES_JSON } from "./countries_json";
import { COUNTRIES } from "@/constants/countries";
import type { Feature, FeatureCollection } from "geojson";

/**
 * Auto-generates mapping from TopoJSON country names to country IDs
 * Uses the COUNTRIES constant to automatically create mappings
 * Handles common name variations and aliases
 */
function generateCountryMappings(): Record<string, string> {
  const mappings: Record<string, string> = {};
  
  // Common name variations and aliases
  const nameVariations: Record<string, string[]> = {
    "germany": ["Germany"],
    "italy": ["Italy"],
    "spain": ["Spain"],
    "china": ["China"],
    "japan": ["Japan"],
    "brazil": ["Brazil"],
    "saudi": ["Saudi Arabia"],
    "uae": ["United Arab Emirates"],
    // Add more variations as needed:
    "usa": ["United States", "United States of America", "USA"],
    // "uk": ["United Kingdom", "UK"],
    "france": ["France"],
  };

  // Generate mappings from COUNTRIES constant
  COUNTRIES.forEach((country) => {
    const variations = nameVariations[country.id] || [country.name];
    variations.forEach((name) => {
      mappings[name] = country.id;
    });
  });

  return mappings;
}

// Mapping from country names in TopoJSON to country IDs used in the app
// Auto-generated from COUNTRIES constant, but can be extended manually
const COUNTRY_NAME_TO_ID_MAP: Record<string, string> = {
  ...generateCountryMappings(),
  // You can add manual overrides or additional mappings here:
  // "United States": "usa",
  // "United Kingdom": "uk",
};

// Cache for converted GeoJSON features to avoid re-processing
let cachedFeatures: Feature[] | null = null;
let cachedFeatureMap: Map<string, Feature> | null = null;

/**
 * Converts TopoJSON to GeoJSON features and caches the result
 * @returns Map of country ID to GeoJSON Feature
 */
function getCachedFeatures(): Map<string, Feature> {
  if (cachedFeatureMap) {
    return cachedFeatureMap;
  }

  // Convert TopoJSON to GeoJSON
  const geoJsonFeatures = feature(
    COUNTRIES_JSON as any,
    COUNTRIES_JSON.objects.countries as any
  ) as FeatureCollection;

  // Create a map for quick lookup: country name (normalized) -> feature
  const nameToFeatureMap = new Map<string, Feature>();
  
  if (geoJsonFeatures.features) {
    geoJsonFeatures.features.forEach((feature) => {
      const countryName = feature.properties?.name;
      if (countryName) {
        // Store with original name
        nameToFeatureMap.set(countryName, feature);
        // Also store with normalized name (lowercase, trimmed) for flexible matching
        const normalizedName = countryName.toLowerCase().trim();
        if (!nameToFeatureMap.has(normalizedName)) {
          nameToFeatureMap.set(normalizedName, feature);
        }
      }
    });
  }

  // Create a map: country ID -> feature (with updated properties)
  cachedFeatureMap = new Map<string, Feature>();
  
  Object.entries(COUNTRY_NAME_TO_ID_MAP).forEach(([topoJsonName, countryId]) => {
    // Try exact match first
    let originalFeature = nameToFeatureMap.get(topoJsonName);
    
    // If not found, try case-insensitive match
    if (!originalFeature) {
      originalFeature = nameToFeatureMap.get(topoJsonName.toLowerCase().trim());
    }
    
    if (originalFeature) {
      // Create a new feature with the correct ID in properties
      const enrichedFeature: Feature = {
        ...originalFeature,
        properties: {
          ...originalFeature.properties,
          id: countryId,
          name: topoJsonName,
        },
      };
      cachedFeatureMap!.set(countryId, enrichedFeature);
    } else {
      console.warn(
        `Country "${topoJsonName}" (ID: ${countryId}) not found in TopoJSON data. ` +
        `Available countries: ${Array.from(nameToFeatureMap.keys()).slice(0, 10).join(", ")}...`
      );
    }
  });

  cachedFeatures = Array.from(cachedFeatureMap.values());
  return cachedFeatureMap;
}

/**
 * Get a single country polygon by country ID
 * @param countryId - The country ID (e.g., "germany", "italy")
 * @returns GeoJSON Feature or undefined if not found
 */
export function getCountryPolygon(countryId: string): Feature | undefined {
  const featureMap = getCachedFeatures();
  return featureMap.get(countryId);
}

/**
 * Get all polygons for specified country IDs
 * @param countryIds - Array of country IDs (e.g., ["germany", "italy"])
 * @returns Array of GeoJSON Features
 */
export function getCountryPolygons(countryIds: string[]): Feature[] {
  const featureMap = getCachedFeatures();
  const features: Feature[] = [];
  
  countryIds.forEach((countryId) => {
    const feature = featureMap.get(countryId);
    if (feature) {
      features.push(feature);
    } else {
      console.warn(`Country polygon not found for ID: ${countryId}`);
    }
  });
  
  return features;
}

/**
 * Get all available country polygons
 * @returns Array of all GeoJSON Features
 */
export function getAllCountryPolygons(): Feature[] {
  const featureMap = getCachedFeatures();
  return Array.from(featureMap.values());
}

/**
 * Add a new country mapping to the system
 * Call this function to register a new country before using it
 * @param topoJsonName - The country name as it appears in TopoJSON
 * @param countryId - The country ID to use in the app
 */
export function addCountryMapping(topoJsonName: string, countryId: string): void {
  COUNTRY_NAME_TO_ID_MAP[topoJsonName] = countryId;
  // Clear cache to force re-processing with new mapping
  cachedFeatures = null;
  cachedFeatureMap = null;
}

/**
 * Get the current country name to ID mapping
 * Useful for debugging or extending the system
 */
export function getCountryMappings(): Record<string, string> {
  return { ...COUNTRY_NAME_TO_ID_MAP };
}

/**
 * Legacy export for backward compatibility
 * Returns a FeatureCollection with all current country boundaries
 */
export const countryBoundaries: FeatureCollection = {
  type: "FeatureCollection",
  get features(): Feature[] {
    return getAllCountryPolygons();
  },
};
