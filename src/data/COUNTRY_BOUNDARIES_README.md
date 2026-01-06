# Country Boundaries System

This system automatically converts TopoJSON country data to GeoJSON features using `topojson-client`. It's designed to be scalable and easy to extend.

## How It Works

1. **TopoJSON Source**: The system uses `COUNTRIES_JSON` from `countries_json.ts` which contains world atlas data in TopoJSON format.

2. **Automatic Conversion**: TopoJSON geometries are converted to GeoJSON features using `topojson-client`.

3. **Name Mapping**: Country names from TopoJSON are mapped to country IDs used in the app via the `COUNTRY_NAME_TO_ID_MAP`.

4. **Caching**: Converted features are cached for performance - conversion only happens once.

## Adding a New Country

### Step 1: Add Country Data
Add your country to the `COUNTRIES` array in `src/constants/countries.ts`:

```typescript
{
  id: 'france',
  name: 'France',
  lat: 46.2276,
  lng: 2.2137,
  size: 0.8,
  color: '#0055A4',
  description: 'Your description here',
  // ... other properties
}
```

### Step 2: Add Name Mapping
Add the country name mapping in `src/data/countryBoundaries.ts`:

**Option A: Add to `nameVariations` object** (recommended for auto-generation):
```typescript
const nameVariations: Record<string, string[]> = {
  // ... existing mappings
  "france": ["France"], // Add here
};
```

**Option B: Add directly to `COUNTRY_NAME_TO_ID_MAP`** (for manual override):
```typescript
const COUNTRY_NAME_TO_ID_MAP: Record<string, string> = {
  ...generateCountryMappings(),
  "France": "france", // Add here
};
```

### Step 3: Verify TopoJSON Name
Check that the country name in `COUNTRIES_JSON` matches. You can search for it:
```bash
grep -i "france" src/data/countries_json.ts
```

Common name variations:
- "United States" or "United States of America" → `usa`
- "United Kingdom" → `uk`
- "Russia" → `russia`
- etc.

### Step 4: Test
The system will automatically:
- Convert TopoJSON to GeoJSON
- Map the country name to your country ID
- Make it available via `getCountryPolygons(['france'])`

## API Reference

### `getCountryPolygon(countryId: string)`
Get a single country polygon by ID.

```typescript
import { getCountryPolygon } from '@/data/countryBoundaries';

const francePolygon = getCountryPolygon('france');
```

### `getCountryPolygons(countryIds: string[])`
Get multiple country polygons by IDs.

```typescript
import { getCountryPolygons } from '@/data/countryBoundaries';

const polygons = getCountryPolygons(['germany', 'france', 'spain']);
```

### `getAllCountryPolygons()`
Get all available country polygons.

```typescript
import { getAllCountryPolygons } from '@/data/countryBoundaries';

const allPolygons = getAllCountryPolygons();
```

### `addCountryMapping(topoJsonName: string, countryId: string)`
Dynamically add a new country mapping at runtime.

```typescript
import { addCountryMapping } from '@/data/countryBoundaries';

addCountryMapping('United States', 'usa');
```

### `getCountryMappings()`
Get the current mapping configuration (useful for debugging).

```typescript
import { getCountryMappings } from '@/data/countryBoundaries';

const mappings = getCountryMappings();
console.log(mappings); // { "Germany": "germany", "France": "france", ... }
```

## Troubleshooting

### Country Not Found Warning
If you see: `Country "X" not found in TopoJSON data`

1. Check the exact name in `countries_json.ts`:
   ```bash
   grep -i "country-name" src/data/countries_json.ts
   ```

2. Verify the name matches exactly (case-sensitive, but system tries case-insensitive fallback)

3. Add the correct mapping to `nameVariations` or `COUNTRY_NAME_TO_ID_MAP`

### Performance
- Conversion happens once and is cached
- Subsequent calls use cached data
- Cache is cleared when `addCountryMapping()` is called

### Backward Compatibility
The `countryBoundaries` export maintains backward compatibility with existing code:
```typescript
import { countryBoundaries } from '@/data/countryBoundaries';
// Still works - returns FeatureCollection
```

## Example: Adding France

1. **Add to COUNTRIES** (`src/constants/countries.ts`):
```typescript
{
  id: 'france',
  name: 'France',
  lat: 46.2276,
  lng: 2.2137,
  size: 0.8,
  color: '#0055A4',
  description: 'Beautiful country in Western Europe',
  image: 'https://flagcdn.com/w640/fr.png',
  // ... other fields
}
```

2. **Add mapping** (`src/data/countryBoundaries.ts`):
```typescript
const nameVariations: Record<string, string[]> = {
  // ... existing
  "france": ["France"],
};
```

3. **Use it**:
```typescript
const polygons = getCountryPolygons(['france']);
// France polygon is now available!
```

That's it! The system handles the rest automatically.
