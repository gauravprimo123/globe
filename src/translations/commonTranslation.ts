import type { LanguageCode } from '@/types/language.types';
import type { CommonTranslations } from '@/types/translation.types';

export type { CommonTranslations };

export const COMMON_TRANSLATIONS: Record<LanguageCode, CommonTranslations> = {
  EN: {
    selectACountry: 'Select a Country',
    comingSoon: 'Coming Soon',
    scrollToExplore: 'Scroll to explore',
    useCtrlScrollToZoom: 'Use Ctrl + scroll to zoom the globe',
    globeTopInstruction: 'Choose a country to explore your local educational programs.',
    globeBottomInstruction: 'Drag or Swipe the globe to rotate and explore different regions.',
    },
  ES: {
    selectACountry: 'Selecciona un País',
    comingSoon: 'Próximamente',
    scrollToExplore: 'Desplázate para explorar',
    useCtrlScrollToZoom: 'Usa ctrl + desplazamiento para hacer zoom en el globo',
    globeTopInstruction: 'Elige un país para explorar tus programas educativos locales.',
    globeBottomInstruction: 'Arrastra o desliza el globo para rotar y explorar diferentes regiones.',
  },
  FR: {
    selectACountry: 'Sélectionner un Pays',
    comingSoon: 'Bientôt disponible',
    scrollToExplore: 'Faites défiler pour explorer',
    useCtrlScrollToZoom: 'Utilisez ctrl + défilement pour zoomer sur le globe',
    globeTopInstruction: 'Choisissez un pays pour explorer vos programmes éducatifs locaux.',
    globeBottomInstruction: 'Faites glisser ou balayez le globe pour le faire tourner et explorer différentes régions.',
  },
  DE: {
    selectACountry: 'Wählen Sie ein Land',
    comingSoon: 'Demnächst',
    scrollToExplore: 'Scrollen Sie zum Erkunden',
    useCtrlScrollToZoom: 'Verwenden Sie Strg + Scrollen, um den Globus zu zoomen',
    globeTopInstruction: 'Wählen Sie ein Land, um Ihre lokalen Bildungsprogramme zu erkunden.',
    globeBottomInstruction: 'Ziehen oder wischen Sie den Globus, um ihn zu drehen und verschiedene Regionen zu erkunden.',
  },
  AR: {
    selectACountry: 'اختر دولة',
    comingSoon: 'قريباً',
    scrollToExplore: 'انتقل للاستكشاف',
    useCtrlScrollToZoom: 'استخدم Ctrl + التمرير لتكبير الكرة الأرضية',
    globeTopInstruction: 'اختر دولة لاستكشاف برامجك التعليمية المحلية.',
    globeBottomInstruction: 'اسحب أو مرر الكرة الأرضية للدوران واستكشاف مناطق مختلفة.',
  },
  ZH: {
    selectACountry: '选择一个国家',
    comingSoon: '即将推出',
    scrollToExplore: '滚动以探索',
    useCtrlScrollToZoom: '使用 Ctrl + 滚动来缩放地球',
    globeTopInstruction: '选择一个国家来探索您当地的教育项目。',
    globeBottomInstruction: '拖动或滑动地球以旋转并探索不同地区。',
  },
  JA: {
    selectACountry: '国を選択',
    comingSoon: '近日公開',
    scrollToExplore: 'スクロールして探索',
    useCtrlScrollToZoom: 'Ctrl + スクロールで地球をズーム',
    globeTopInstruction: '国を選択して、地元の教育プログラムを探索してください。',
    globeBottomInstruction: '地球をドラッグまたはスワイプして回転させ、さまざまな地域を探索します。',
  },
  PT: {
    selectACountry: 'Selecione um País',
    comingSoon: 'Em breve',
    scrollToExplore: 'Role para explorar',
    useCtrlScrollToZoom: 'Use Ctrl + rolagem para ampliar o globo',
    globeTopInstruction: 'Escolha um país para explorar seus programas educacionais locais.',
    globeBottomInstruction: 'Arraste ou deslize o globo para girar e explorar diferentes regiões.',
  },
};
