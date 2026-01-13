import type { Language } from '@/types/language.types';

export type { Language };

export const LANGUAGES: Language[] = [
  { code: "EN", name: "English", flag: "🇬🇧" },
  { code: "ES", name: "Español", flag: "🇪🇸" },
  { code: "FR", name: "Français", flag: "🇫🇷" },
  { code: "DE", name: "Deutsch", flag: "🇩🇪" },
  { code: "AR", name: "العربية", flag: "🇸🇦" },
  { code: "ZH", name: "中文", flag: "🇨🇳" },
  { code: "JA", name: "日本語", flag: "🇯🇵" },
  { code: "PT", name: "Português", flag: "🇧🇷" },
];
