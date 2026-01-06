# Dynamic Country Colors System

The country color system has been updated to support dynamic color assignment while maintaining full backward compatibility.

## Overview

Colors can now be:
1. **Explicitly set** in the country data (backward compatible)
2. **Dynamically computed** using a custom color function
3. **Auto-generated** from country ID or name if not provided

## How It Works

### Priority Order
1. **Country's `color` property** (if exists) - highest priority
2. **Custom color function** (if provided)
3. **Auto-generated from country ID**
4. **Auto-generated from country name**
5. **Default fallback color**

## Usage

### Basic Usage (Backward Compatible)
Existing code continues to work without changes:

```typescript
// In constants/countries.ts
{
  id: 'germany',
  name: 'Germany',
  color: '#39FF14', // This will be used
  // ... other properties
}
```

### Dynamic Colors with Custom Function

```typescript
import { InteractiveGlobe } from '@/components/InteractiveGlobe';
import type { CountryColorFunction } from '@/utils/countryColors';

// Example: Color by language
const colorByLanguage: CountryColorFunction = (country) => {
  const langColors: Record<string, string> = {
    'German': '#39FF14',
    'Italian': '#FF10F0',
    'Spanish': '#FF6600',
    'Mandarin': '#FF073A',
    'Japanese': '#FFFF00',
    'Portuguese': '#BC13FE',
    'Arabic': '#CCFF00',
  };
  return langColors[country.language || ''] || null;
};

// Use in component
<InteractiveGlobe
  countries={COUNTRIES}
  customColorFn={colorByLanguage}
  // ... other props
/>
```

### Color by Region/Continent

```typescript
const colorByRegion: CountryColorFunction = (country) => {
  const regionMap: Record<string, string> = {
    'germany': '#39FF14', // Europe - Green
    'italy': '#FF10F0',   // Europe - Pink
    'spain': '#FF6600',   // Europe - Orange
    'china': '#FF073A',   // Asia - Red
    'japan': '#FFFF00',   // Asia - Yellow
    'brazil': '#BC13FE',  // South America - Purple
    'saudi': '#CCFF00',   // Middle East - Lime
    'uae': '#00FFF0',     // Middle East - Cyan
  };
  return regionMap[country.id] || null;
};
```

### Color by Size

```typescript
const colorBySize: CountryColorFunction = (country) => {
  if (country.size > 0.9) return '#FF0000'; // Large - Red
  if (country.size > 0.7) return '#00FF00'; // Medium - Green
  return '#0000FF'; // Small - Blue
};
```

### Remove Explicit Colors (Use Auto-Generation)

To use auto-generated colors, simply remove the `color` property:

```typescript
{
  id: 'france',
  name: 'France',
  // color: '#0055A4', // Remove this line
  lat: 46.2276,
  lng: 2.2137,
  // ... other properties
}
```

The system will automatically generate a consistent color based on the country ID.

## API Reference

### `getCountryColor(country, customColorFn?)`
Get the color for a country.

```typescript
import { getCountryColor } from '@/utils/countryColors';

const color = getCountryColor(country, customColorFn);
```

### `getCountryColorWithOpacity(country, opacity, customColorFn?)`
Get color with opacity (returns RGBA string).

```typescript
import { getCountryColorWithOpacity } from '@/utils/countryColors';

const rgbaColor = getCountryColorWithOpacity(country, 0.5);
// Returns: "rgba(57, 255, 20, 0.5)"
```

### `getCountryColorWithAlpha(country, alpha, customColorFn?)`
Get color with alpha channel (returns hex with alpha).

```typescript
import { getCountryColorWithAlpha } from '@/utils/countryColors';

const hexWithAlpha = getCountryColorWithAlpha(country, '80');
// Returns: "#39FF1480"
```

## Examples

### Example 1: Time-based Colors
```typescript
const timeBasedColors: CountryColorFunction = (country) => {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 12) return '#FFD700'; // Morning - Gold
  if (hour >= 12 && hour < 18) return '#FF6347'; // Afternoon - Tomato
  if (hour >= 18 && hour < 22) return '#9370DB'; // Evening - Purple
  return '#191970'; // Night - Midnight Blue
};
```

### Example 2: Random Colors (Not Recommended)
```typescript
const randomColors: CountryColorFunction = (country) => {
  const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF'];
  return colors[Math.floor(Math.random() * colors.length)];
};
```

**Note:** Random colors are not recommended as they change on every render.

### Example 3: Gradient Based on Index
```typescript
const gradientColors: CountryColorFunction = (country) => {
  const index = COUNTRIES.findIndex(c => c.id === country.id);
  const hue = (index * 360) / COUNTRIES.length;
  return `hsl(${hue}, 100%, 50%)`;
};
```

## Integration Points

The dynamic color system is used in:

1. **Globe Polygons**
   - `polygonCapColor` - Fill color
   - `polygonSideColor` - Side color
   - `polygonStrokeColor` - Border color

2. **Hover Tooltips**
   - Border, text, and shadow colors

3. **Selected Country Card**
   - All UI elements use the dynamic color

4. **Country Cards Sidebar**
   - Border, text, and highlight colors

## Backward Compatibility

✅ **Fully backward compatible** - All existing code works without changes:
- Countries with explicit `color` property continue to use that color
- No breaking changes to existing functionality
- Optional `customColorFn` prop - only use if needed

## Performance

- Colors are memoized for selected countries
- Custom color functions are called only when needed
- No performance impact for countries with explicit colors

## Best Practices

1. **Use explicit colors** for important/critical countries
2. **Use custom functions** for thematic coloring (by region, language, etc.)
3. **Use auto-generation** for less important countries or when adding many countries
4. **Keep color functions pure** - no side effects, deterministic results
5. **Return `null`** from custom functions to fall back to default behavior
