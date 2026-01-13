import { Award } from 'lucide-react';

export interface CreditsInfoBoxProps {
  credits: { ama?: string; ancc?: string };
  creditsLabel?: string;
  countryColor: string;
}

export function CreditsInfoBox({ credits, creditsLabel, countryColor }: CreditsInfoBoxProps) {
  return (
    <div
      className="flex items-start gap-2 p-2.5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300"
      style={{ borderColor: `${countryColor}20` }}
    >
      <Award
        className="w-4 h-4 flex-shrink-0 mt-0.5"
        style={{ color: countryColor }}
      />
      <div className="flex-1 min-w-0">
        <span className="opacity-70 text-xs block mb-1">{creditsLabel || 'Credits'}</span>
        {credits.ama && (
          <span
            className="text-sm block"
            style={{
              color: countryColor,
              textShadow: `0 0 10px ${countryColor}40`,
              fontWeight: 500,
            }}
          >
            {credits.ama}
          </span>
        )}
        {credits.ancc && (
          <span
            className="text-sm block"
            style={{
              color: countryColor,
              textShadow: `0 0 10px ${countryColor}40`,
              fontWeight: 500,
            }}
          >
            {credits.ancc}
          </span>
        )}
      </div>
    </div>
  );
}
