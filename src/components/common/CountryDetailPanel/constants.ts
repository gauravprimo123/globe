import type { TrackData } from '@/types/component.types';

export const DEFAULT_CREDITS = {
  ama: '0.5 AMA PRA Category 1 Credit™',
  ancc: '0.5 ANCC contact hours',
};

export const DEFAULT_TRACK_DATA: TrackData = {
  language: {
    label: 'Language',
    value: 'English',
  },
  subtitles: {
    label: 'Subtitles',
    value: 'English',
  },
  programChair: {
    label: 'Program Chair',
    name: 'Coming soon',
  },
  credits: {
    label: 'Credits',
    ama: '0.5 AMA PRA Category 1 Credit™',
    ancc: '0.5 ANCC contact hours',
  },
};
