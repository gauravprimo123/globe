import { Languages } from 'lucide-react';
import type { TrackData } from '@/types/component.types';

export interface LanguageInfoBoxProps {
  trackData: TrackData;
  countryColor: string;
}

export function LanguageInfoBox({ trackData, countryColor }: LanguageInfoBoxProps) {
  return (
    <div
      className="flex items-start gap-2 p-2.5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300"
      style={{ borderColor: `${countryColor}20` }}
    >
      <Languages
        className="w-4 h-4 flex-shrink-0 mt-0.5"
        style={{ color: countryColor }}
      />
      <div className="flex-1 min-w-0">
        <div className="mb-1">
          <span className="opacity-70 text-xs">{trackData.language.label}: </span>
          <span
            className="text-sm"
            style={{
              color: countryColor,
              textShadow: `0 0 10px ${countryColor}40`,
              fontWeight: 500,
            }}
          >
            {trackData.language.value}
          </span>
        </div>
        <div>
          <span className="opacity-70 text-xs">{trackData.subtitles.label}: </span>
          <span
            className="text-sm"
            style={{
              color: countryColor,
              textShadow: `0 0 10px ${countryColor}40`,
              fontWeight: 500,
            }}
          >
            {trackData.subtitles.value}
          </span>
        </div>
      </div>
    </div>
  );
}
