import { Users } from 'lucide-react';
import type { TrackData } from '@/types/component.types';

export interface ProgramChairInfoBoxProps {
  trackData: TrackData;
  countryColor: string;
}

export function ProgramChairInfoBox({ trackData, countryColor }: ProgramChairInfoBoxProps) {
  return (
    <div
      className="flex items-start gap-2 p-2.5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300"
      style={{ borderColor: `${countryColor}20` }}
    >
      <Users
        className="w-4 h-4 flex-shrink-0 mt-0.5"
        style={{ color: countryColor }}
      />
      <div className="flex-1 min-w-0">
        <span className="opacity-70 text-xs block mb-1">{trackData.programChair.label}</span>
        <div>
          <span
            className="text-sm block"
            style={{
              color: countryColor,
              textShadow: `0 0 10px ${countryColor}40`,
              fontWeight: 500,
            }}
          >
            {trackData.programChair.name}
          </span>
          {trackData.programChair.affiliations && trackData.programChair.affiliations.length > 0 && (
            <div className="text-xs opacity-60 mt-1">
              {trackData.programChair.affiliations.map((affiliation, index) => (
                <div key={index}>{affiliation}</div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
