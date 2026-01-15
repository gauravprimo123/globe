/**
 * Component-related type definitions
 */

import type { CountryData } from './country.types';

export interface TrackData {
  language: {
    label: string;
    value: string;
  };
  subtitles: {
    label: string;
    value: string;
  };
  programChair: {
    label: string;
    name: string;
    affiliations?: string[];
  };
  credits: {
    label: string;
    ama: string;
    ancc: string;
  };
  buttonText?: {
    label: string;
    href: string;
  };
}

export interface CardStartPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface CountryDetailPanelProps {
  /** The selected country to display */
  country: CountryData | null;
  /** The color to use for styling (typically derived from country) */
  countryColor: string;
  /** Optional starting position for animation (from sidebar card) */
  cardStartPosition?: CardStartPosition | null;
  /** Function to get track-specific data for a country */
  getTrackData?: (countryId: string) => TrackData;
  /** Callback when the panel should be closed */
  onClose: () => void;
  /** Callback for the next step button */
  onNextStep?: () => void;
  /** Custom credits data (optional, defaults to standard credits) */
  credits?: {
    ama?: string;
    ancc?: string;
  };
  /** Custom target audience text (optional, uses country.targetAudience if not provided) */
  targetAudience?: string;
  /** Custom target audience label (optional, defaults to "Target Audience") */
  targetAudienceLabel?: string;
  /** Whether the next step button is disabled */
  isNextStepDisabled?: boolean;
  /** Custom text for the next step button */
  nextStepButtonText?: string;
}
