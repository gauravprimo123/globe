import type { LanguageCode } from '@/types/language.types';
import type { TrackData } from '@/types/component.types';
import type { TrackDataTranslations } from '@/types/translation.types';

export type { TrackDataTranslations };

/**
 * Track data translations for all supported languages
 * Includes language, subtitles, program chair, and affiliations with labels
 */
export const TRACK_DATA_TRANSLATIONS: TrackDataTranslations = {
  global: {
    EN: {
      language: { label: 'Language', value: 'English' },
      subtitles: { label: 'Subtitles', value: 'English, Arabic, Chinese, German, Italian, Japanese, Portuguese, and Spanish' },
      programChair: {
        label: 'Program Chair',
        name: 'Kevin M. Pantalone, DO, ECNU, FACE',
        affiliations: [
          'Professor of Medicine, Cleveland Clinic Lerner College of Medicine',
          'Director of Diabetes Initiatives',
          'Staff Endocrinologist',
          'Department of Endocrinology',
          'Cleveland Clinic',
          'Cleveland, Ohio',
          'United States of America'
        ],
      },
      credits: {
        label: 'Credits',
        ama: '0.5 AMA PRA Category 1 Credit™',
        ancc: '0.5 ANCC contact hours',
      },
      buttonText: {
        label: 'Coming soon',
        href: '#'
      },
    },
    ES: {
      language: { label: 'Idioma', value: 'Inglés' },
      subtitles: { label: 'Subtítulos', value: 'Inglés, Árabe, Chino, Alemán, Italiano, Japonés, Portugués y Español' },
      programChair: {
        label: 'Director del Programa',
        name: 'Kevin M. Pantalone, DO, ECNU, FACE',
        affiliations: [
          'Profesor de Medicina, Facultad de Medicina Lerner de la Clínica Cleveland',
          'Director de Iniciativas de Diabetes',
          'Endocrinólogo del Personal',
          'Departamento de Endocrinología',
          'Clínica Cleveland',
          'Cleveland, Ohio',
          'Estados Unidos de América'
        ],
      },
      credits: {
        label: 'Créditos',
        ama: '0.5 Crédito AMA PRA Categoría 1™',
        ancc: '0.5 horas de contacto ANCC',
      },
      buttonText: {
        label: 'Próximamente',
        href: '#'
      },
    },
    FR: {
      language: { label: 'Langue', value: 'Anglais' },
      subtitles: { label: 'Sous-titres', value: 'Anglais, Arabe, Chinois, Allemand, Italien, Japonais, Portugais et Espagnol' },
      programChair: {
        label: 'Directeur du Programme',
        name: 'Kevin M. Pantalone, DO, ECNU, FACE',
        affiliations: [
          'Professeur de médecine, Faculté de médecine Lerner de la clinique Cleveland',
          'Directeur des initiatives sur le diabète',
          'Endocrinologue du personnel',
          'Département d\'endocrinologie',
          'Clinique Cleveland',
          'Cleveland, Ohio',
          'États-Unis d\'Amérique'
        ],
      },
      credits: {
        label: 'Crédits',
        ama: '0.5 Crédit AMA PRA Catégorie 1™',
        ancc: '0.5 heures de contact ANCC',
      },
      buttonText: {
        label: 'Bientôt disponible',
        href: '#'
      },
    },
    DE: {
      language: { label: 'Sprache', value: 'Englisch' },
      subtitles: { label: 'Untertitel', value: 'Englisch, Arabisch, Chinesisch, Deutsch, Italienisch, Japanisch, Portugiesisch und Spanisch' },
      programChair: {
        label: 'Programmleiter',
        name: 'Kevin M. Pantalone, DO, ECNU, FACE',
        affiliations: [
          'Professor für Medizin, Lerner College of Medicine der Cleveland Clinic',
          'Direktor für Diabetes-Initiativen',
          'Stabs-Endokrinologe',
          'Abteilung für Endokrinologie',
          'Cleveland Clinic',
          'Cleveland, Ohio',
          'Vereinigte Staaten von Amerika'
        ],
      },
      credits: {
        label: 'Credits',
        ama: '0.5 AMA PRA Kategorie 1 Credit™',
        ancc: '0.5 ANCC Kontaktstunden',
      },
      buttonText: {
        label: 'Demnächst',
        href: '#'
      },
    },
    AR: {
      language: { label: 'اللغة', value: 'الإنجليزية' },
      subtitles: { label: 'الترجمة', value: 'الإنجليزية، العربية، الصينية، الألمانية، الإيطالية، اليابانية، البرتغالية، والإسبانية' },
      programChair: {
        label: 'رئيس البرنامج',
        name: 'كيفن إم. بانثالون، دكتور في الطب، ECNU، FACE',
        affiliations: [
          'أستاذ الطب، كلية الطب ليرنر في كليفلاند كلينك',
          'مدير مبادرات السكري',
          'أخصائي الغدد الصماء',
          'قسم الغدد الصماء',
          'كليفلاند كلينك',
          'كليفلاند، أوهايو',
          'الولايات المتحدة الأمريكية'
        ],
      },
      credits: {
        label: 'الاعتمادات',
        ama: '0.5 رصيد AMA PRA الفئة 1™',
        ancc: '0.5 ساعة اتصال ANCC',
      },
      buttonText: {
        label: 'قريباً',
        href: '#'
      },
    },
    ZH: {
      language: { label: '语言', value: '英语' },
      subtitles: { label: '字幕', value: '英语、阿拉伯语、中文、德语、意大利语、日语、葡萄牙语和西班牙语' },
      programChair: {
        label: '项目主席',
        name: 'Kevin M. Pantalone, DO, ECNU, FACE',
        affiliations: [
          '医学教授，克利夫兰诊所勒纳医学院',
          '糖尿病倡议主任',
          '内分泌科医生',
          '内分泌科',
          '克利夫兰诊所',
          '俄亥俄州克利夫兰',
          '美利坚合众国'
        ],
      },
      credits: {
        label: '学分',
        ama: '0.5 AMA PRA 1类学分™',
        ancc: '0.5 ANCC 联系小时',
      },
      buttonText: {
        label: '即将推出',
        href: '#'
      },
    },
    JA: {
      language: { label: '言語', value: '英語' },
      subtitles: { label: '字幕', value: '英語、アラビア語、中国語、ドイツ語、イタリア語、日本語、ポルトガル語、スペイン語' },
      programChair: {
        label: 'プログラムチェア',
        name: 'Kevin M. Pantalone, DO, ECNU, FACE',
        affiliations: [
          '医学教授、クリーブランド・クリニック・ラーナー医科大学',
          '糖尿病イニシアチブディレクター',
          'スタッフ内分泌学者',
          '内分泌学科',
          'クリーブランド・クリニック',
          'オハイオ州クリーブランド',
          'アメリカ合衆国'
        ],
      },
      credits: {
        label: '単位',
        ama: '0.5 AMA PRA カテゴリー1単位™',
        ancc: '0.5 ANCC 連絡時間',
      },
      buttonText: {
        label: '近日公開',
        href: '#'
      },
    },
    PT: {
      language: { label: 'Idioma', value: 'Inglês' },
      subtitles: { label: 'Legendas', value: 'Inglês, Árabe, Chinês, Alemão, Italiano, Japonês, Português e Espanhol' },
      programChair: {
        label: 'Diretor do Programa',
        name: 'Kevin M. Pantalone, DO, ECNU, FACE',
        affiliations: [
          'Professor de Medicina, Faculdade de Medicina Lerner da Clínica Cleveland',
          'Diretor de Iniciativas de Diabetes',
          'Endocrinologista do Corpo Clínico',
          'Departamento de Endocrinologia',
          'Clínica Cleveland',
          'Cleveland, Ohio',
          'Estados Unidos da América'
        ],
      },
      credits: {
        label: 'Créditos',
        ama: '0.5 Crédito AMA PRA Categoria 1™',
        ancc: '0.5 horas de contato ANCC',
      },
      buttonText: {
        label: 'Em breve',
        href: '#'
      },
    },
  },
  germany: {
    EN: {
      language: { label: 'Language', value: 'German' },
      subtitles: { label: 'Subtitles', value: 'English' },
      programChair: { label: 'Program Chair', name: 'Coming soon!' },
      credits: {
        label: 'Credits',
        ama: '0.5 AMA PRA Category 1 Credit™',
        ancc: '0.5 ANCC contact hours',
      },
      buttonText: {
        label: 'Coming soon',
        href: '#'
      },
    },
    ES: {
      language: { label: 'Idioma', value: 'Alemán' },
      subtitles: { label: 'Subtítulos', value: 'Inglés' },
      programChair: { label: 'Director del Programa', name: '¡Próximamente!' },
      credits: {
        label: 'Créditos',
        ama: '0.5 Crédito AMA PRA Categoría 1™',
        ancc: '0.5 horas de contacto ANCC',
      },
      buttonText: {
        label: 'Próximamente',
        href: '#'
      },
    },
    FR: {
      language: { label: 'Langue', value: 'Allemand' },
      subtitles: { label: 'Sous-titres', value: 'Anglais' },
      programChair: { label: 'Directeur du Programme', name: 'Bientôt disponible !' },
      credits: {
        label: 'Crédits',
        ama: '0.5 Crédit AMA PRA Catégorie 1™',
        ancc: '0.5 heures de contact ANCC',
      },
      buttonText: {
        label: 'Bientôt disponible',
        href: '#'
      },
    },
    DE: {
      language: { label: 'Sprache', value: 'Deutsch' },
      subtitles: { label: 'Untertitel', value: 'Englisch' },
      programChair: { label: 'Programmleiter', name: 'Demnächst!' },
      credits: {
        label: 'Credits',
        ama: '0.5 AMA PRA Kategorie 1 Credit™',
        ancc: '0.5 ANCC Kontaktstunden',
      },
      buttonText: {
        label: 'Demnächst',
        href: '#'
      },
    },
    AR: {
      language: { label: 'اللغة', value: 'الألمانية' },
      subtitles: { label: 'الترجمة', value: 'الإنجليزية' },
      programChair: { label: 'رئيس البرنامج', name: 'قريباً!' },
      credits: {
        label: 'الاعتمادات',
        ama: '0.5 رصيد AMA PRA الفئة 1™',
        ancc: '0.5 ساعة اتصال ANCC',
      },
      buttonText: {
        label: 'قريباً',
        href: '#'
      },
    },
    ZH: {
      language: { label: '语言', value: '德语' },
      subtitles: { label: '字幕', value: '英语' },
      programChair: { label: '项目主席', name: '即将推出！' },
      credits: {
        label: '学分',
        ama: '0.5 AMA PRA 1类学分™',
        ancc: '0.5 ANCC 联系小时',
      },
      buttonText: {
        label: '即将推出',
        href: '#'
      },
    },
    JA: {
      language: { label: '言語', value: 'ドイツ語' },
      subtitles: { label: '字幕', value: '英語' },
      programChair: { label: 'プログラムチェア', name: '近日公開！' },
      credits: {
        label: '単位',
        ama: '0.5 AMA PRA カテゴリー1単位™',
        ancc: '0.5 ANCC 連絡時間',
      },
      buttonText: {
        label: '近日公開',
        href: '#'
      },
    },
    PT: {
      language: { label: 'Idioma', value: 'Alemão' },
      subtitles: { label: 'Legendas', value: 'Inglês' },
      programChair: { label: 'Diretor do Programa', name: 'Em breve!' },
      credits: {
        label: 'Créditos',
        ama: '0.5 Crédito AMA PRA Categoria 1™',
        ancc: '0.5 horas de contato ANCC',
      },
      buttonText: {
        label: 'Em breve',
        href: '#'
      },
    },
  },
  italy: {
    EN: {
      language: { label: 'Language', value: 'Italian' },
      subtitles: { label: 'Subtitles', value: 'English' },
      programChair: {
        label: 'Program Chair',
        name: 'Stefano Del Prato, MD',
        affiliations: [
          'Affiliate Professor of Medicine',
          'Interdisciplinary Research Center "Health Science"',
          'Sant\'Anna School of Advanced Studies',
          'Pisa, Italy'
        ],
      },
      credits: {
        label: 'Credits',
        ama: '0.5 AMA PRA Category 1 Credit™',
        ancc: '0.5 ANCC contact hours',
      },
      buttonText: {
        label: 'Coming soon',
        href: '#'
      },
    },
    ES: {
      language: { label: 'Idioma', value: 'Italiano' },
      subtitles: { label: 'Subtítulos', value: 'Inglés' },
      programChair: {
        label: 'Director del Programa',
        name: 'Stefano Del Prato, MD',
        affiliations: [
          'Profesor Afiliado de Medicina',
          'Centro de Investigación Interdisciplinario "Ciencia de la Salud"',
          'Escuela de Estudios Avanzados Sant\'Anna',
          'Pisa, Italia'
        ],
      },
      credits: {
        label: 'Créditos',
        ama: '0.5 Crédito AMA PRA Categoría 1™',
        ancc: '0.5 horas de contacto ANCC',
      },
      buttonText: {
        label: 'Próximamente',
        href: '#'
      },
    },
    FR: {
      language: { label: 'Langue', value: 'Italien' },
      subtitles: { label: 'Sous-titres', value: 'Anglais' },
      programChair: {
        label: 'Directeur du Programme',
        name: 'Stefano Del Prato, MD',
        affiliations: [
          'Professeur affilié de médecine',
          'Centre de recherche interdisciplinaire "Sciences de la santé"',
          'École supérieure Sant\'Anna',
          'Pise, Italie'
        ],
      },
      credits: {
        label: 'Crédits',
        ama: '0.5 Crédit AMA PRA Catégorie 1™',
        ancc: '0.5 heures de contact ANCC',
      },
      buttonText: {
        label: 'Bientôt disponible',
        href: '#'
      },
    },
    DE: {
      language: { label: 'Sprache', value: 'Italienisch' },
      subtitles: { label: 'Untertitel', value: 'Englisch' },
      programChair: {
        label: 'Programmleiter',
        name: 'Stefano Del Prato, MD',
        affiliations: [
          'Außerordentlicher Professor für Medizin',
          'Interdisziplinäres Forschungszentrum "Gesundheitswissenschaften"',
          'Sant\'Anna Hochschule für fortgeschrittene Studien',
          'Pisa, Italien'
        ],
      },
      credits: {
        label: 'Credits',
        ama: '0.5 AMA PRA Kategorie 1 Credit™',
        ancc: '0.5 ANCC Kontaktstunden',
      },
      buttonText: {
        label: 'Demnächst',
        href: '#'
      },
    },
    AR: {
      language: { label: 'اللغة', value: 'الإيطالية' },
      subtitles: { label: 'الترجمة', value: 'الإنجليزية' },
      programChair: {
        label: 'رئيس البرنامج',
        name: 'ستيفانو ديل براتو، دكتور في الطب',
        affiliations: [
          'أستاذ مساعد في الطب',
          'مركز البحوث متعدد التخصصات "علوم الصحة"',
          'مدرسة سانت آنا للدراسات المتقدمة',
          'بيزا، إيطاليا'
        ],
      },
      credits: {
        label: 'الاعتمادات',
        ama: '0.5 رصيد AMA PRA الفئة 1™',
        ancc: '0.5 ساعة اتصال ANCC',
      },
      buttonText: {
        label: 'قريباً',
        href: '#'
      },
    },
    ZH: {
      language: { label: '语言', value: '意大利语' },
      subtitles: { label: '字幕', value: '英语' },
      programChair: {
        label: '项目主席',
        name: 'Stefano Del Prato, MD',
        affiliations: [
          '医学附属教授',
          '跨学科研究中心"健康科学"',
          '圣安娜高等研究学院',
          '意大利比萨'
        ],
      },
      credits: {
        label: '学分',
        ama: '0.5 AMA PRA 1类学分™',
        ancc: '0.5 ANCC 联系小时',
      },
      buttonText: {
        label: '即将推出',
        href: '#'
      },
    },
    JA: {
      language: { label: '言語', value: 'イタリア語' },
      subtitles: { label: '字幕', value: '英語' },
      programChair: {
        label: 'プログラムチェア',
        name: 'Stefano Del Prato, MD',
        affiliations: [
          '医学准教授',
          '学際研究センター「健康科学」',
          'サンタンナ高等研究大学院',
          'イタリア、ピサ'
        ],
      },
      credits: {
        label: '単位',
        ama: '0.5 AMA PRA カテゴリー1単位™',
        ancc: '0.5 ANCC 連絡時間',
      },
      buttonText: {
        label: '近日公開',
        href: '#'
      },
    },
    PT: {
      language: { label: 'Idioma', value: 'Italiano' },
      subtitles: { label: 'Legendas', value: 'Inglês' },
      programChair: {
        label: 'Diretor do Programa',
        name: 'Stefano Del Prato, MD',
        affiliations: [
          'Professor Afiliado de Medicina',
          'Centro de Pesquisa Interdisciplinar "Ciências da Saúde"',
          'Escola de Estudos Avançados Sant\'Anna',
          'Pisa, Itália'
        ],
      },
      credits: {
        label: 'Créditos',
        ama: '0.5 Crédito AMA PRA Categoria 1™',
        ancc: '0.5 horas de contato ANCC',
      },
      buttonText: {
        label: 'Em breve',
        href: '#'
      },
    },
  },
  spain: {
    EN: {
      language: { label: 'Language', value: 'Spanish' },
      subtitles: { label: 'Subtitles', value: 'English' },
      programChair: {
        label: 'Program Chair',
        name: 'Santiago Tofé Povedano, MD, PhD',
        affiliations: [
          'Endocrinology and Nutrition',
          'Son Espases University Hospital',
          'Palma de Mallorca, Spain'
        ],
      },
      credits: {
        label: 'Credits',
        ama: '0.5 AMA PRA Category 1 Credit™',
        ancc: '0.5 ANCC contact hours',
      },
      buttonText: {
        label: 'Coming soon',
        href: '#'
      }
    },
    ES: {
      language: { label: 'Idioma', value: 'Español' },
      subtitles: { label: 'Subtítulos', value: 'Inglés' },
      programChair: {
        label: 'Director del Programa',
        name: 'Santiago Tofé Povedano, MD, PhD',
        affiliations: [
          'Endocrinología y Nutrición',
          'Hospital Universitario Son Espases',
          'Palma de Mallorca, España'
        ],
      },
      credits: {
        label: 'Créditos',
        ama: '0.5 Crédito AMA PRA Categoría 1™',
        ancc: '0.5 horas de contacto ANCC',
      },
      buttonText: {
        label: 'Próximamente',
        href: '#'
      },
    },
    FR: {
      language: { label: 'Langue', value: 'Espagnol' },
      subtitles: { label: 'Sous-titres', value: 'Anglais' },
      programChair: {
        label: 'Directeur du Programme',
        name: 'Santiago Tofé Povedano, MD, PhD',
        affiliations: [
          'Endocrinologie et Nutrition',
          'Hôpital universitaire Son Espases',
          'Palma de Majorque, Espagne'
        ],
      },
      credits: {
        label: 'Crédits',
        ama: '0.5 Crédit AMA PRA Catégorie 1™',
        ancc: '0.5 heures de contact ANCC',
      },
      buttonText: {
        label: 'Bientôt disponible',
        href: '#'
      },
    },
    DE: {
      language: { label: 'Sprache', value: 'Spanisch' },
      subtitles: { label: 'Untertitel', value: 'Englisch' },
      programChair: {
        label: 'Programmleiter',
        name: 'Santiago Tofé Povedano, MD, PhD',
        affiliations: [
          'Endokrinologie und Ernährung',
          'Universitätsklinikum Son Espases',
          'Palma de Mallorca, Spanien'
        ],
      },
      credits: {
        label: 'Credits',
        ama: '0.5 AMA PRA Kategorie 1 Credit™',
        ancc: '0.5 ANCC Kontaktstunden',
      },
      buttonText: {
        label: 'Demnächst',
        href: '#'
      },
    },
    AR: {
      language: { label: 'اللغة', value: 'الإسبانية' },
      subtitles: { label: 'الترجمة', value: 'الإنجليزية' },
      programChair: {
        label: 'رئيس البرنامج',
        name: 'سانتياغو توفي بوفيدانو، دكتور في الطب، دكتوراه',
        affiliations: [
          'الغدد الصماء والتغذية',
          'مستشفى سون إسباسيس الجامعي',
          'بالما دي مايوركا، إسبانيا'
        ],
      },
      credits: {
        label: 'الاعتمادات',
        ama: '0.5 رصيد AMA PRA الفئة 1™',
        ancc: '0.5 ساعة اتصال ANCC',
      },
      buttonText: {
        label: 'قريباً',
        href: '#'
      },
    },
    ZH: {
      language: { label: '语言', value: '西班牙语' },
      subtitles: { label: '字幕', value: '英语' },
      programChair: {
        label: '项目主席',
        name: 'Santiago Tofé Povedano, MD, PhD',
        affiliations: [
          '内分泌学和营养学',
          '松埃斯帕塞斯大学医院',
          '西班牙马略卡岛帕尔马'
        ],
      },
      credits: {
        label: '学分',
        ama: '0.5 AMA PRA 1类学分™',
        ancc: '0.5 ANCC 联系小时',
      },
      buttonText: {
        label: '即将推出',
        href: '#'
      },
    },
    JA: {
      language: { label: '言語', value: 'スペイン語' },
      subtitles: { label: '字幕', value: '英語' },
      programChair: {
        label: 'プログラムチェア',
        name: 'Santiago Tofé Povedano, MD, PhD',
        affiliations: [
          '内分泌学と栄養学',
          'ソン・エスパセス大学病院',
          'スペイン、マヨルカ島パルマ'
        ],
      },
      credits: {
        label: '単位',
        ama: '0.5 AMA PRA カテゴリー1単位™',
        ancc: '0.5 ANCC 連絡時間',
      },
      buttonText: {
        label: '近日公開',
        href: '#'
      },
    },
    PT: {
      language: { label: 'Idioma', value: 'Espanhol' },
      subtitles: { label: 'Legendas', value: 'Inglês' },
      programChair: {
        label: 'Diretor do Programa',
        name: 'Santiago Tofé Povedano, MD, PhD',
        affiliations: [
          'Endocrinologia e Nutrição',
          'Hospital Universitário Son Espases',
          'Palma de Maiorca, Espanha'
        ],
      },
      credits: {
        label: 'Créditos',
        ama: '0.5 Crédito AMA PRA Categoria 1™',
        ancc: '0.5 horas de contato ANCC',
      },
      buttonText: {
        label: 'Em breve',
        href: '#'
      },
    },
  },
  china: {
    EN: {
      language: { label: 'Language', value: 'Coming soon' },
      subtitles: { label: 'Subtitles', value: 'Coming soon' },
      programChair: { label: 'Program Chair', name: 'Coming soon' },
      credits: {
        label: 'Credits',
        ama: '0.5 AMA PRA Category 1 Credit™',
        ancc: '0.5 ANCC contact hours',
      },
      buttonText: {
        label: 'Coming soon',
        href: '#'
      },
    },
    ES: {
      language: { label: 'Idioma', value: 'Próximamente' },
      subtitles: { label: 'Subtítulos', value: 'Próximamente' },
      programChair: { label: 'Director del Programa', name: 'Próximamente' },
      credits: {
        label: 'Créditos',
        ama: '0.5 Crédito AMA PRA Categoría 1™',
        ancc: '0.5 horas de contacto ANCC',
      },
      buttonText: {
        label: 'Próximamente',
        href: '#'
      },
    },
    FR: {
      language: { label: 'Langue', value: 'Bientôt disponible' },
      subtitles: { label: 'Sous-titres', value: 'Bientôt disponible' },
      programChair: { label: 'Directeur du Programme', name: 'Bientôt disponible' },
      credits: {
        label: 'Crédits',
        ama: '0.5 Crédit AMA PRA Catégorie 1™',
        ancc: '0.5 heures de contact ANCC',
      },
      buttonText: {
        label: 'Bientôt disponible',
        href: '#'
      },
    },
    DE: {
      language: { label: 'Sprache', value: 'Demnächst' },
      subtitles: { label: 'Untertitel', value: 'Demnächst' },
      programChair: { label: 'Programmleiter', name: 'Demnächst' },
      credits: {
        label: 'Credits',
        ama: '0.5 AMA PRA Kategorie 1 Credit™',
        ancc: '0.5 ANCC Kontaktstunden',
      },
      buttonText: {
        label: 'Demnächst',
        href: '#'
      },
    },
    AR: {
      language: { label: 'اللغة', value: 'قريباً' },
      subtitles: { label: 'الترجمة', value: 'قريباً' },
      programChair: { label: 'رئيس البرنامج', name: 'قريباً' },
      credits: {
        label: 'الاعتمادات',
        ama: '0.5 رصيد AMA PRA الفئة 1™',
        ancc: '0.5 ساعة اتصال ANCC',
      },
      buttonText: {
        label: 'قريباً',
        href: '#'
      },
    },
    ZH: {
      language: { label: '语言', value: '即将推出' },
      subtitles: { label: '字幕', value: '即将推出' },
      programChair: { label: '项目主席', name: '即将推出' },
      credits: {
        label: '学分',
        ama: '0.5 AMA PRA 1类学分™',
        ancc: '0.5 ANCC 联系小时',
      },
      buttonText: {
        label: '即将推出',
        href: '#'
      },
    },
    JA: {
      language: { label: '言語', value: '近日公開' },
      subtitles: { label: '字幕', value: '近日公開' },
      programChair: { label: 'プログラムチェア', name: '近日公開' },
      credits: {
        label: '単位',
        ama: '0.5 AMA PRA カテゴリー1単位™',
        ancc: '0.5 ANCC 連絡時間',
      },
      buttonText: {
        label: '近日公開',
        href: '#'
      },
    },
    PT: {
      language: { label: 'Idioma', value: 'Em breve' },
      subtitles: { label: 'Legendas', value: 'Em breve' },
      programChair: { label: 'Diretor do Programa', name: 'Em breve' },
      credits: {
        label: 'Créditos',
        ama: '0.5 Crédito AMA PRA Categoria 1™',
        ancc: '0.5 horas de contato ANCC',
      },
      buttonText: {
        label: 'Em breve',
        href: '#'
      },
    },
  },
  japan: {
    EN: {
      language: { label: 'Language', value: 'English' },
      subtitles: { label: 'Subtitles', value: 'Japanese' },
      programChair: {
        label: 'Program Chair',
        name: 'Takashi Kadowaki, MD, PhD',
        affiliations: [
          'President, Toranomon Hospital',
          'Professor Emeritus, The University of Tokyo',
          'Tokyo, Japan'
        ],
      },
      credits: {
        label: 'Credits',
        ama: '0.5 AMA PRA Category 1 Credit™',
        ancc: '0.5 ANCC contact hours',
      },
      buttonText: {
        label: 'Coming soon',
        href: '#'
      },
    },
    ES: {
      language: { label: 'Idioma', value: 'Inglés' },
      subtitles: { label: 'Subtítulos', value: 'Japonés' },
      programChair: {
        label: 'Director del Programa',
        name: 'Takashi Kadowaki, MD, PhD',
        affiliations: [
          'Presidente, Hospital Toranomon',
          'Profesor Emérito, Universidad de Tokio',
          'Tokio, Japón'
        ],
      },
      credits: {
        label: 'Créditos',
        ama: '0.5 Crédito AMA PRA Categoría 1™',
        ancc: '0.5 horas de contacto ANCC',
      },
      buttonText: {
        label: 'Próximamente',
        href: '#'
      },
    },
    FR: {
      language: { label: 'Langue', value: 'Anglais' },
      subtitles: { label: 'Sous-titres', value: 'Japonais' },
      programChair: {
        label: 'Directeur du Programme',
        name: 'Takashi Kadowaki, MD, PhD',
        affiliations: [
          'Président, Hôpital Toranomon',
          'Professeur émérite, Université de Tokyo',
          'Tokyo, Japon'
        ],
      },
      credits: {
        label: 'Crédits',
        ama: '0.5 Crédit AMA PRA Catégorie 1™',
        ancc: '0.5 heures de contact ANCC',
      },
      buttonText: {
        label: 'Bientôt disponible',
        href: '#'
      },
    },
    DE: {
      language: { label: 'Sprache', value: 'Englisch' },
      subtitles: { label: 'Untertitel', value: 'Japanisch' },
      programChair: {
        label: 'Programmleiter',
        name: 'Takashi Kadowaki, MD, PhD',
        affiliations: [
          'Präsident, Toranomon-Krankenhaus',
          'Professor Emeritus, Universität Tokio',
          'Tokio, Japan'
        ],
      },
      credits: {
        label: 'Credits',
        ama: '0.5 AMA PRA Kategorie 1 Credit™',
        ancc: '0.5 ANCC Kontaktstunden',
      },
      buttonText: {
        label: 'Demnächst',
        href: '#'
      },
    },
    AR: {
      language: { label: 'اللغة', value: 'الإنجليزية' },
      subtitles: { label: 'الترجمة', value: 'اليابانية' },
      programChair: {
        label: 'رئيس البرنامج',
        name: 'تاكاشي كادواكي، دكتور في الطب، دكتوراه',
        affiliations: [
          'رئيس مستشفى تورانومون',
          'أستاذ فخري، جامعة طوكيو',
          'طوكيو، اليابان'
        ],
      },
      credits: {
        label: 'الاعتمادات',
        ama: '0.5 رصيد AMA PRA الفئة 1™',
        ancc: '0.5 ساعة اتصال ANCC',
      },
      buttonText: {
        label: 'قريباً',
        href: '#'
      },
    },
    ZH: {
      language: { label: '语言', value: '英语' },
      subtitles: { label: '字幕', value: '日语' },
      programChair: {
        label: '项目主席',
        name: 'Takashi Kadowaki, MD, PhD',
        affiliations: [
          '虎之门医院院长',
          '东京大学名誉教授',
          '日本东京'
        ],
      },
      credits: {
        label: '学分',
        ama: '0.5 AMA PRA 1类学分™',
        ancc: '0.5 ANCC 联系小时',
      },
      buttonText: {
        label: '即将推出',
        href: '#'
      },
    },
    JA: {
      language: { label: '言語', value: '英語' },
      subtitles: { label: '字幕', value: '日本語' },
      programChair: {
        label: 'プログラムチェア',
        name: '門脇 孝, MD, PhD',
        affiliations: [
          '虎の門病院 院長',
          '東京大学 名誉教授',
          '日本、東京'
        ],
      },
      credits: {
        label: '単位',
        ama: '0.5 AMA PRA カテゴリー1単位™',
        ancc: '0.5 ANCC 連絡時間',
      },
      buttonText: {
        label: '近日公開',
        href: '#'
      },
    },
    PT: {
      language: { label: 'Idioma', value: 'Inglês' },
      subtitles: { label: 'Legendas', value: 'Japonês' },
      programChair: {
        label: 'Diretor do Programa',
        name: 'Takashi Kadowaki, MD, PhD',
        affiliations: [
          'Presidente, Hospital Toranomon',
          'Professor Emérito, Universidade de Tóquio',
          'Tóquio, Japão'
        ],
      },
      credits: {
        label: 'Créditos',
        ama: '0.5 Crédito AMA PRA Categoria 1™',
        ancc: '0.5 horas de contato ANCC',
      },
      buttonText: {
        label: 'Em breve',
        href: '#'
      },
    },
  },
  brazil: {
    EN: {
      language: { label: 'Language', value: 'Portuguese' },
      subtitles: { label: 'Subtitles', value: 'English' },
      programChair: { label: 'Program Chair', name: 'Coming soon!' },
      credits: {
        label: 'Credits',
        ama: '0.5 AMA PRA Category 1 Credit™',
        ancc: '0.5 ANCC contact hours',
      },
      buttonText: {
        label: 'Coming soon',
        href: '#'
      },
    },
    ES: {
      language: { label: 'Idioma', value: 'Portugués' },
      subtitles: { label: 'Subtítulos', value: 'Inglés' },
      programChair: { label: 'Director del Programa', name: '¡Próximamente!' },
      credits: {
        label: 'Créditos',
        ama: '0.5 Crédito AMA PRA Categoría 1™',
        ancc: '0.5 horas de contacto ANCC',
      },
      buttonText: {
        label: 'Próximamente',
        href: '#'
      },
    },
    FR: {
      language: { label: 'Langue', value: 'Bientôt disponible' },
      subtitles: { label: 'Sous-titres', value: 'Bientôt disponible' },
      programChair: { label: 'Directeur du Programme', name: 'Bientôt disponible' },
      credits: {
        label: 'Crédits',
        ama: '0.5 Crédit AMA PRA Catégorie 1™',
        ancc: '0.5 heures de contact ANCC',
      },
      buttonText: {
        label: 'Bientôt disponible',
        href: '#'
      },
    },
    DE: {
      language: { label: 'Sprache', value: 'Demnächst' },
      subtitles: { label: 'Untertitel', value: 'Demnächst' },
      programChair: { label: 'Programmleiter', name: 'Demnächst' },
      credits: {
        label: 'Credits',
        ama: '0.5 AMA PRA Kategorie 1 Credit™',
        ancc: '0.5 ANCC Kontaktstunden',
      },
      buttonText: {
        label: 'Demnächst',
        href: '#'
      },
    },
    AR: {
      language: { label: 'اللغة', value: 'قريباً' },
      subtitles: { label: 'الترجمة', value: 'قريباً' },
      programChair: { label: 'رئيس البرنامج', name: 'قريباً' },
      credits: {
        label: 'الاعتمادات',
        ama: '0.5 رصيد AMA PRA الفئة 1™',
        ancc: '0.5 ساعة اتصال ANCC',
      },
      buttonText: {
        label: 'قريباً',
        href: '#'
      },
    },
    ZH: {
      language: { label: '语言', value: '即将推出' },
      subtitles: { label: '字幕', value: '即将推出' },
      programChair: { label: '项目主席', name: '即将推出' },
      credits: {
        label: '学分',
        ama: '0.5 AMA PRA 1类学分™',
        ancc: '0.5 ANCC 联系小时',
      },
      buttonText: {
        label: '即将推出',
        href: '#'
      },
    },
    JA: {
      language: { label: '言語', value: '近日公開' },
      subtitles: { label: '字幕', value: '近日公開' },
      programChair: { label: 'プログラムチェア', name: '近日公開' },
      credits: {
        label: '単位',
        ama: '0.5 AMA PRA カテゴリー1単位™',
        ancc: '0.5 ANCC 連絡時間',
      },
      buttonText: {
        label: '近日公開',
        href: '#'
      },
    },
    PT: {
      language: { label: 'Idioma', value: 'Em breve' },
      subtitles: { label: 'Legendas', value: 'Em breve' },
      programChair: { label: 'Diretor do Programa', name: 'Em breve' },
      credits: {
        label: 'Créditos',
        ama: '0.5 Crédito AMA PRA Categoria 1™',
        ancc: '0.5 horas de contato ANCC',
      },
      buttonText: {
        label: 'Em breve',
        href: '#'
      },
    },
  },
  saudi: {
    EN: {
      language: { label: 'Language', value: 'English' },
      subtitles: { label: 'Subtitles', value: 'English, Arabic' },
      programChair: {
        label: 'Program Chair',
        name: 'Nasreen Alfaris, MD, MPH',
        affiliations: [
          'Endocrinology, Diabetes, Metabolism, and Obesity Medicine',
          'Founder of the Saudi Obesity Medicine Fellowship',
          'Obesity, Endocrine, and Metabolism Center (OEMC)',
          'King Fahad Medical City (KFMC)',
          'Riyadh, Kingdom of Saudi Arabia'
        ],
      },
      credits: {
        label: 'Credits',
        ama: '0.5 AMA PRA Category 1 Credit™',
        ancc: '0.5 ANCC contact hours',
      },
      buttonText: {
        label: 'Access Activity Page',
        href: 'https://www.medlearninggroup.com/cme-programming/beyond-borders-bridging-gaps-in-the-management-of-type-2-diabetes-across-the-globe-saudi-arabia-uae/'
      },
    },
    ES: {
      language: { label: 'Idioma', value: 'Inglés' },
      subtitles: { label: 'Subtítulos', value: 'Inglés, Árabe' },
      programChair: {
        label: 'Director del Programa',
        name: 'Nasreen Alfaris, MD, MPH',
        affiliations: [
          'Endocrinología, Diabetes, Metabolismo y Medicina de la Obesidad',
          'Fundadora de la Beca de Medicina de la Obesidad de Arabia Saudita',
          'Centro de Obesidad, Endocrinología y Metabolismo (OEMC)',
          'Ciudad Médica del Rey Fahad (KFMC)',
          'Riad, Reino de Arabia Saudita'
        ],
      },
      credits: {
        label: 'Créditos',
        ama: '0.5 Crédito AMA PRA Categoría 1™',
        ancc: '0.5 horas de contacto ANCC',
      },
      buttonText: {
        label: 'Acceder a la Página de Actividad',
        href: 'https://www.medlearninggroup.com/cme-programming/beyond-borders-bridging-gaps-in-the-management-of-type-2-diabetes-across-the-globe-saudi-arabia-uae/'
      },
    },
    FR: {
      language: { label: 'Langue', value: 'Anglais' },
      subtitles: { label: 'Sous-titres', value: 'Anglais, Arabe' },
      programChair: {
        label: 'Directeur du Programme',
        name: 'Nasreen Alfaris, MD, MPH',
        affiliations: [
          'Endocrinologie, diabète, métabolisme et médecine de l\'obésité',
          'Fondatrice de la bourse de médecine de l\'obésité saoudienne',
          'Centre d\'obésité, d\'endocrinologie et de métabolisme (OEMC)',
          'Cité médicale du roi Fahd (KFMC)',
          'Riyad, Royaume d\'Arabie Saoudite'
        ],
      },
      credits: {
        label: 'Crédits',
        ama: '0.5 Crédit AMA PRA Catégorie 1™',
        ancc: '0.5 heures de contact ANCC',
      },
      buttonText: {
        label: 'Accéder à la Page d\'Activité',
        href: 'https://www.medlearninggroup.com/cme-programming/beyond-borders-bridging-gaps-in-the-management-of-type-2-diabetes-across-the-globe-saudi-arabia-uae/'
      },
    },
    DE: {
      language: { label: 'Sprache', value: 'Englisch' },
      subtitles: { label: 'Untertitel', value: 'Englisch, Arabisch' },
      programChair: {
        label: 'Programmleiter',
        name: 'Nasreen Alfaris, MD, MPH',
        affiliations: [
          'Endokrinologie, Diabetes, Stoffwechsel und Adipositasmedizin',
          'Gründerin des Saudi Obesity Medicine Fellowship',
          'Zentrum für Adipositas, Endokrinologie und Stoffwechsel (OEMC)',
          'König-Fahad-Medizinzentrum (KFMC)',
          'Riad, Königreich Saudi-Arabien'
        ],
      },
      credits: {
        label: 'Credits',
        ama: '0.5 AMA PRA Kategorie 1 Credit™',
        ancc: '0.5 ANCC Kontaktstunden',
      },
      buttonText: {
        label: 'Auf Aktivitätsseite zugreifen',
        href: 'https://www.medlearninggroup.com/cme-programming/beyond-borders-bridging-gaps-in-the-management-of-type-2-diabetes-across-the-globe-saudi-arabia-uae/'
      },
    },
    AR: {
      language: { label: 'اللغة', value: 'الإنجليزية' },
      subtitles: { label: 'الترجمة', value: 'الإنجليزية، العربية' },
      programChair: {
        label: 'رئيس البرنامج',
        name: 'نسرين الفارس، دكتور في الطب، ماجستير في الصحة العامة',
        affiliations: [
          'الغدد الصماء، السكري، الأيض، وطب السمنة',
          'مؤسسة زمالة طب السمنة السعودية',
          'مركز السمنة والغدد الصماء والأيض (OEMC)',
          'مدينة الملك فهد الطبية (KFMC)',
          'الرياض، المملكة العربية السعودية'
        ],
      },
      credits: {
        label: 'الاعتمادات',
        ama: '0.5 رصيد AMA PRA الفئة 1™',
        ancc: '0.5 ساعة اتصال ANCC',
      },
      buttonText: {
        label: 'الوصول إلى صفحة النشاط',
        href: 'https://www.medlearninggroup.com/cme-programming/beyond-borders-bridging-gaps-in-the-management-of-type-2-diabetes-across-the-globe-saudi-arabia-uae/'
      },
    },
    ZH: {
      language: { label: '语言', value: '英语' },
      subtitles: { label: '字幕', value: '英语、阿拉伯语' },
      programChair: {
        label: '项目主席',
        name: 'Nasreen Alfaris, MD, MPH',
        affiliations: [
          '内分泌学、糖尿病、代谢和肥胖医学',
          '沙特肥胖医学奖学金创始人',
          '肥胖、内分泌和代谢中心 (OEMC)',
          '法赫德国王医疗城 (KFMC)',
          '沙特阿拉伯王国利雅得'
        ],
      },
      credits: {
        label: '学分',
        ama: '0.5 AMA PRA 1类学分™',
        ancc: '0.5 ANCC 联系小时',
      },
      buttonText: {
        label: '访问活动页面',
        href: 'https://www.medlearninggroup.com/cme-programming/beyond-borders-bridging-gaps-in-the-management-of-type-2-diabetes-across-the-globe-saudi-arabia-uae/'
      },
    },
    JA: {
      language: { label: '言語', value: '英語' },
      subtitles: { label: '字幕', value: '英語、アラビア語' },
      programChair: {
        label: 'プログラムチェア',
        name: 'Nasreen Alfaris, MD, MPH',
        affiliations: [
          '内分泌学、糖尿病、代謝、肥満医学',
          'サウジ肥満医学フェローシップ創設者',
          '肥満・内分泌・代謝センター（OEMC）',
          'キング・ファハド医療都市（KFMC）',
          'サウジアラビア王国、リヤド'
        ],
      },
      credits: {
        label: '単位',
        ama: '0.5 AMA PRA カテゴリー1単位™',
        ancc: '0.5 ANCC 連絡時間',
      },
      buttonText: {
        label: 'アクティビティページにアクセス',
        href: 'https://www.medlearninggroup.com/cme-programming/beyond-borders-bridging-gaps-in-the-management-of-type-2-diabetes-across-the-globe-saudi-arabia-uae/'
      },
    },
    PT: {
      language: { label: 'Idioma', value: 'Inglês' },
      subtitles: { label: 'Legendas', value: 'Inglês, Árabe' },
      programChair: {
        label: 'Diretor do Programa',
        name: 'Nasreen Alfaris, MD, MPH',
        affiliations: [
          'Endocrinologia, Diabetes, Metabolismo e Medicina da Obesidade',
          'Fundadora da Bolsa de Medicina da Obesidade da Arábia Saudita',
          'Centro de Obesidade, Endocrinologia e Metabolismo (OEMC)',
          'Cidade Médica do Rei Fahad (KFMC)',
          'Riade, Reino da Arábia Saudita'
        ],
      },
      credits: {
        label: 'Créditos',
        ama: '0.5 Crédito AMA PRA Categoria 1™',
        ancc: '0.5 horas de contato ANCC',
      },
      buttonText: {
        label: 'Acessar Página de Atividade',
        href: 'https://www.medlearninggroup.com/cme-programming/beyond-borders-bridging-gaps-in-the-management-of-type-2-diabetes-across-the-globe-saudi-arabia-uae/'
      },
    },
  },
  uae: {
    EN: {
      language: { label: 'Language', value: 'English' },
      subtitles: { label: 'Subtitles', value: 'English, Arabic' },
      programChair: {
        label: 'Program Chair',
        name: 'Nasreen Alfaris, MD, MPH',
        affiliations: [
          'Endocrinology, Diabetes, Metabolism, and Obesity Medicine',
          'Founder of the Saudi Obesity Medicine Fellowship',
          'Obesity, Endocrine, and Metabolism Center (OEMC)',
          'King Fahad Medical City (KFMC)',
          'Riyadh, Kingdom of Saudi Arabia'
        ],
      },
      credits: {
        label: 'Credits',
        ama: '0.5 AMA PRA Category 1 Credit™',
        ancc: '0.5 ANCC contact hours',
      },
      buttonText: {
        label: 'Access Activity Page',
        href: 'https://www.medlearninggroup.com/cme-programming/beyond-borders-bridging-gaps-in-the-management-of-type-2-diabetes-across-the-globe-saudi-arabia-uae/'
      },
    },
    ES: {
      language: { label: 'Idioma', value: 'Inglés' },
      subtitles: { label: 'Subtítulos', value: 'Inglés, Árabe' },
      programChair: {
        label: 'Director del Programa',
        name: 'Nasreen Alfaris, MD, MPH',
        affiliations: [
          'Endocrinología, Diabetes, Metabolismo y Medicina de la Obesidad',
          'Fundadora de la Beca de Medicina de la Obesidad de Arabia Saudita',
          'Centro de Obesidad, Endocrinología y Metabolismo (OEMC)',
          'Ciudad Médica del Rey Fahad (KFMC)',
          'Riad, Reino de Arabia Saudita'
        ],
      },
      credits: {
        label: 'Créditos',
        ama: '0.5 Crédito AMA PRA Categoría 1™',
        ancc: '0.5 horas de contacto ANCC',
      },
      buttonText: {
        label: 'Acceder a la Página de Actividad',
        href: 'https://www.medlearninggroup.com/cme-programming/beyond-borders-bridging-gaps-in-the-management-of-type-2-diabetes-across-the-globe-saudi-arabia-uae/'
      },
    },
    FR: {
      language: { label: 'Langue', value: 'Anglais' },
      subtitles: { label: 'Sous-titres', value: 'Anglais, Arabe' },
      programChair: {
        label: 'Directeur du Programme',
        name: 'Nasreen Alfaris, MD, MPH',
        affiliations: [
          'Endocrinologie, diabète, métabolisme et médecine de l\'obésité',
          'Fondatrice de la bourse de médecine de l\'obésité saoudienne',
          'Centre d\'obésité, d\'endocrinologie et de métabolisme (OEMC)',
          'Cité médicale du roi Fahd (KFMC)',
          'Riyad, Royaume d\'Arabie Saoudite'
        ],
      },
      credits: {
        label: 'Crédits',
        ama: '0.5 Crédit AMA PRA Catégorie 1™',
        ancc: '0.5 heures de contact ANCC',
      },
      buttonText: {
        label: 'Accéder à la Page d\'Activité',
        href: 'https://www.medlearninggroup.com/cme-programming/beyond-borders-bridging-gaps-in-the-management-of-type-2-diabetes-across-the-globe-saudi-arabia-uae/'
      },
    },
    DE: {
      language: { label: 'Sprache', value: 'Englisch' },
      subtitles: { label: 'Untertitel', value: 'Englisch, Arabisch' },
      programChair: {
        label: 'Programmleiter',
        name: 'Nasreen Alfaris, MD, MPH',
        affiliations: [
          'Endokrinologie, Diabetes, Stoffwechsel und Adipositasmedizin',
          'Gründerin des Saudi Obesity Medicine Fellowship',
          'Zentrum für Adipositas, Endokrinologie und Stoffwechsel (OEMC)',
          'König-Fahad-Medizinzentrum (KFMC)',
          'Riad, Königreich Saudi-Arabien'
        ],
      },
      credits: {
        label: 'Credits',
        ama: '0.5 AMA PRA Kategorie 1 Credit™',
        ancc: '0.5 ANCC Kontaktstunden',
      },
      buttonText: {
        label: 'Auf Aktivitätsseite zugreifen',
        href: 'https://www.medlearninggroup.com/cme-programming/beyond-borders-bridging-gaps-in-the-management-of-type-2-diabetes-across-the-globe-saudi-arabia-uae/'
      },
    },
    AR: {
      language: { label: 'اللغة', value: 'الإنجليزية' },
      subtitles: { label: 'الترجمة', value: 'الإنجليزية، العربية' },
      programChair: {
        label: 'رئيس البرنامج',
        name: 'نسرين الفارس، دكتور في الطب، ماجستير في الصحة العامة',
        affiliations: [
          'الغدد الصماء، السكري، الأيض، وطب السمنة',
          'مؤسسة زمالة طب السمنة السعودية',
          'مركز السمنة والغدد الصماء والأيض (OEMC)',
          'مدينة الملك فهد الطبية (KFMC)',
          'الرياض، المملكة العربية السعودية'
        ],
      },
      credits: {
        label: 'الاعتمادات',
        ama: '0.5 رصيد AMA PRA الفئة 1™',
        ancc: '0.5 ساعة اتصال ANCC',
      },
      buttonText: {
        label: 'الوصول إلى صفحة النشاط',
        href: 'https://www.medlearninggroup.com/cme-programming/beyond-borders-bridging-gaps-in-the-management-of-type-2-diabetes-across-the-globe-saudi-arabia-uae/'
      },
    },
    ZH: {
      language: { label: '语言', value: '英语' },
      subtitles: { label: '字幕', value: '英语、阿拉伯语' },
      programChair: {
        label: '项目主席',
        name: 'Nasreen Alfaris, MD, MPH',
        affiliations: [
          '内分泌学、糖尿病、代谢和肥胖医学',
          '沙特肥胖医学奖学金创始人',
          '肥胖、内分泌和代谢中心 (OEMC)',
          '法赫德国王医疗城 (KFMC)',
          '沙特阿拉伯王国利雅得'
        ],
      },
      credits: {
        label: '学分',
        ama: '0.5 AMA PRA 1类学分™',
        ancc: '0.5 ANCC 联系小时',
      },
      buttonText: {
        label: '访问活动页面',
        href: 'https://www.medlearninggroup.com/cme-programming/beyond-borders-bridging-gaps-in-the-management-of-type-2-diabetes-across-the-globe-saudi-arabia-uae/'
      },
    },
    JA: {
      language: { label: '言語', value: '英語' },
      subtitles: { label: '字幕', value: '英語、アラビア語' },
      programChair: {
        label: 'プログラムチェア',
        name: 'Nasreen Alfaris, MD, MPH',
        affiliations: [
          '内分泌学、糖尿病、代謝、肥満医学',
          'サウジ肥満医学フェローシップ創設者',
          '肥満・内分泌・代謝センター（OEMC）',
          'キング・ファハド医療都市（KFMC）',
          'サウジアラビア王国、リヤド'
        ],
      },
      credits: {
        label: '単位',
        ama: '0.5 AMA PRA カテゴリー1単位™',
        ancc: '0.5 ANCC 連絡時間',
      },
      buttonText: {
        label: 'アクティビティページにアクセス',
        href: 'https://www.medlearninggroup.com/cme-programming/beyond-borders-bridging-gaps-in-the-management-of-type-2-diabetes-across-the-globe-saudi-arabia-uae/'
      },
    },
    PT: {
      language: { label: 'Idioma', value: 'Inglês' },
      subtitles: { label: 'Legendas', value: 'Inglês, Árabe' },
      programChair: {
        label: 'Diretor do Programa',
        name: 'Nasreen Alfaris, MD, MPH',
        affiliations: [
          'Endocrinologia, Diabetes, Metabolismo e Medicina da Obesidade',
          'Fundadora da Bolsa de Medicina da Obesidade da Arábia Saudita',
          'Centro de Obesidade, Endocrinologia e Metabolismo (OEMC)',
          'Cidade Médica do Rei Fahad (KFMC)',
          'Riade, Reino da Arábia Saudita'
        ],
      },
      credits: {
        label: 'Créditos',
        ama: '0.5 Crédito AMA PRA Categoria 1™',
        ancc: '0.5 horas de contato ANCC',
      },
      buttonText: {
        label: 'Acessar Página de Atividade',
        href: 'https://www.medlearninggroup.com/cme-programming/beyond-borders-bridging-gaps-in-the-management-of-type-2-diabetes-across-the-globe-saudi-arabia-uae/'
      },
    },
  },
};
