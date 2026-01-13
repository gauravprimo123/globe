import type { LanguageCode } from '@/types/language.types';
import type { GlobalProgramTranslations } from '@/types/translation.types';

export type { GlobalProgramTranslations };

export const GLOBAL_PROGRAM_TRANSLATIONS: Record<LanguageCode, GlobalProgramTranslations> = {
  EN: {
    title: 'Global Program',
    targetAudience: {
      label: 'Target Audience',
      content: 'Endocrinologists, diabetologists, and other healthcare professionals involved in the management of patients with T2DM',
    },
    language: {
      label: 'Language',
      content: 'English',
    },
    subtitles: {
      label: 'Subtitles',
      content: 'English, Arabic, Chinese, German, Italian, Japanese, Portuguese, and Spanish',
    },
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
        'United States of America',
      ],
    },
    credits: {
      label: 'Credits',
      ama: '0.5 AMA PRA Category 1 Credit™',
      ancc: '0.5 ANCC contact hours',
    },
    buttonText: 'Access Activity Page',
  },
  ES: {
    title: 'Programa Global',
    targetAudience: {
      label: 'Audiencia Objetivo',
      content: 'Endocrinólogos, diabetólogos y otros profesionales de la salud involucrados en el manejo de pacientes con DM2',
    },
    language: {
      label: 'Idioma',
      content: 'Inglés',
    },
    subtitles: {
      label: 'Subtítulos',
      content: 'Inglés, Árabe, Chino, Alemán, Italiano, Japonés, Portugués y Español',
    },
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
        'Estados Unidos de América',
      ],
    },
    credits: {
      label: 'Créditos',
      ama: '0.5 Crédito AMA PRA Categoría 1™',
      ancc: '0.5 horas de contacto ANCC',
    },
    buttonText: 'Acceder a la Página de Actividad',
  },
  FR: {
    title: 'Programme Global',
    targetAudience: {
      label: 'Public Cible',
      content: 'Endocrinologues, diabétologues et autres professionnels de la santé impliqués dans la prise en charge des patients atteints de DT2',
    },
    language: {
      label: 'Langue',
      content: 'Anglais',
    },
    subtitles: {
      label: 'Sous-titres',
      content: 'Anglais, Arabe, Chinois, Allemand, Italien, Japonais, Portugais et Espagnol',
    },
    programChair: {
      label: 'Directeur du Programme',
      name: 'Kevin M. Pantalone, DO, ECNU, FACE',
      affiliations: [
        'Professeur de médecine, Faculté de médecine Lerner de la Clinique Cleveland',
        'Directeur des initiatives sur le diabète',
        'Endocrinologue du personnel',
        'Département d\'endocrinologie',
        'Clinique Cleveland',
        'Cleveland, Ohio',
        'États-Unis d\'Amérique',
      ],
    },
    credits: {
      label: 'Crédits',
      ama: '0.5 Crédit AMA PRA Catégorie 1™',
      ancc: '0.5 heures de contact ANCC',
    },
    buttonText: 'Accéder à la Page d\'Activité',
  },
  DE: {
    title: 'Globales Programm',
    targetAudience: {
      label: 'Zielgruppe',
      content: 'Endokrinologen, Diabetologen und andere Gesundheitsfachkräfte, die an der Behandlung von Patienten mit Typ-2-Diabetes beteiligt sind',
    },
    language: {
      label: 'Sprache',
      content: 'Englisch',
    },
    subtitles: {
      label: 'Untertitel',
      content: 'Englisch, Arabisch, Chinesisch, Deutsch, Italienisch, Japanisch, Portugiesisch und Spanisch',
    },
    programChair: {
      label: 'Programmleiter',
      name: 'Kevin M. Pantalone, DO, ECNU, FACE',
      affiliations: [
        'Professor für Medizin, Lerner College of Medicine der Cleveland Clinic',
        'Direktor für Diabetes-Initiativen',
        'Mitarbeiter-Endokrinologe',
        'Abteilung für Endokrinologie',
        'Cleveland Clinic',
        'Cleveland, Ohio',
        'Vereinigte Staaten von Amerika',
      ],
    },
    credits: {
      label: 'Credits',
      ama: '0.5 AMA PRA Kategorie 1 Credit™',
      ancc: '0.5 ANCC Kontaktstunden',
    },
    buttonText: 'Aktivitätsseite aufrufen',
  },
  AR: {
    title: 'البرنامج العالمي',
    targetAudience: {
      label: 'الجمهور المستهدف',
      content: 'أطباء الغدد الصماء وأطباء السكري وغيرهم من المهنيين الصحيين المشاركين في إدارة مرضى السكري من النوع الثاني',
    },
    language: {
      label: 'اللغة',
      content: 'الإنجليزية',
    },
    subtitles: {
      label: 'الترجمة',
      content: 'الإنجليزية، العربية، الصينية، الألمانية، الإيطالية، اليابانية، البرتغالية، والإسبانية',
    },
    programChair: {
      label: 'رئيس البرنامج',
      name: 'كيفن إم. بانتالون، دكتور في الطب، ECNU، FACE',
      affiliations: [
        'أستاذ الطب، كلية الطب ليرنر في كليفلاند كلينك',
        'مدير مبادرات السكري',
        'أخصائي الغدد الصماء',
        'قسم الغدد الصماء',
        'كليفلاند كلينك',
        'كليفلاند، أوهايو',
        'الولايات المتحدة الأمريكية',
      ],
    },
    credits: {
      label: 'الاعتمادات',
      ama: '0.5 رصيد AMA PRA الفئة 1™',
      ancc: '0.5 ساعة اتصال ANCC',
    },
    buttonText: 'الوصول إلى صفحة النشاط',
  },
  ZH: {
    title: '全球计划',
    targetAudience: {
      label: '目标受众',
      content: '内分泌学家、糖尿病学家和其他参与2型糖尿病患者管理的医疗保健专业人员',
    },
    language: {
      label: '语言',
      content: '英语',
    },
    subtitles: {
      label: '字幕',
      content: '英语、阿拉伯语、中文、德语、意大利语、日语、葡萄牙语和西班牙语',
    },
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
        '美利坚合众国',
      ],
    },
    credits: {
      label: '学分',
      ama: '0.5 AMA PRA 1类学分™',
      ancc: '0.5 ANCC 联系小时',
    },
    buttonText: '访问活动页面',
  },
  JA: {
    title: 'グローバルプログラム',
    targetAudience: {
      label: '対象者',
      content: '2型糖尿病患者の管理に関わる内分泌学者、糖尿病学者、その他の医療専門家',
    },
    language: {
      label: '言語',
      content: '英語',
    },
    subtitles: {
      label: '字幕',
      content: '英語、アラビア語、中国語、ドイツ語、イタリア語、日本語、ポルトガル語、スペイン語',
    },
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
        'アメリカ合衆国',
      ],
    },
    credits: {
      label: '単位',
      ama: '0.5 AMA PRA カテゴリー1単位™',
      ancc: '0.5 ANCC 連絡時間',
    },
    buttonText: 'アクティビティページにアクセス',
  },
  PT: {
    title: 'Programa Global',
    targetAudience: {
      label: 'Público-Alvo',
      content: 'Endocrinologistas, diabetologistas e outros profissionais de saúde envolvidos no manejo de pacientes com DM2',
    },
    language: {
      label: 'Idioma',
      content: 'Inglês',
    },
    subtitles: {
      label: 'Legendas',
      content: 'Inglês, Árabe, Chinês, Alemão, Italiano, Japonês, Português e Espanhol',
    },
    programChair: {
      label: 'Diretor do Programa',
      name: 'Kevin M. Pantalone, DO, ECNU, FACE',
      affiliations: [
        'Professor de Medicina, Faculdade de Medicina Lerner da Clínica Cleveland',
        'Diretor de Iniciativas de Diabetes',
        'Endocrinologista da Equipe',
        'Departamento de Endocrinologia',
        'Clínica Cleveland',
        'Cleveland, Ohio',
        'Estados Unidos da América',
      ],
    },
    credits: {
      label: 'Créditos',
      ama: '0.5 Crédito AMA PRA Categoria 1™',
      ancc: '0.5 horas de contato ANCC',
    },
    buttonText: 'Acessar Página da Atividade',
  },
};
