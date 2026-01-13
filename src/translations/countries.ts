import type { LanguageCode } from '@/types/language.types';
import type { TranslatedCountryData, CountryTranslations } from '@/types/translation.types';

export type { TranslatedCountryData, CountryTranslations };

/**
 * Country translations for all supported languages
 * Maps country ID to translations in each language
 */
export const COUNTRY_TRANSLATIONS: CountryTranslations = {
  germany: {
    EN: {
      name: 'Germany',
      description: 'Europe\'s largest economy and a global leader in engineering, automotive, and renewable energy sectors.',
      targetAudience: {
        label: 'Target Audience',
        content: 'Endocrinologists, diabetologists, and other healthcare professionals involved in the management of patients with T2DM',
      },
    },
    ES: {
      name: 'Alemania',
      description: 'La economía más grande de Europa y líder mundial en ingeniería, automoción y sectores de energía renovable.',
      targetAudience: {
        label: 'Audiencia Objetivo',
        content: 'Endocrinólogos, diabetólogos y otros profesionales de la salud involucrados en el manejo de pacientes con DM2',
      },
    },
    FR: {
      name: 'Allemagne',
      description: 'La plus grande économie d\'Europe et leader mondial dans les secteurs de l\'ingénierie, de l\'automobile et des énergies renouvelables.',
      targetAudience: {
        label: 'Public Cible',
        content: 'Endocrinologues, diabétologues et autres professionnels de la santé impliqués dans la prise en charge des patients atteints de DT2',
      },
    },
    DE: {
      name: 'Deutschland',
      description: 'Die größte Volkswirtschaft Europas und ein globaler Marktführer in den Bereichen Ingenieurwesen, Automobilindustrie und erneuerbare Energien.',
      targetAudience: {
        label: 'Zielgruppe',
        content: 'Endokrinologen, Diabetologen und andere Gesundheitsfachkräfte, die an der Behandlung von Patienten mit Typ-2-Diabetes beteiligt sind',
      },
    },
    AR: {
      name: 'ألمانيا',
      description: 'أكبر اقتصاد في أوروبا ورائد عالمي في قطاعات الهندسة والسيارات والطاقة المتجددة.',
      targetAudience: {
        label: 'الجمهور المستهدف',
        content: 'أطباء الغدد الصماء وأطباء السكري وغيرهم من المهنيين الصحيين المشاركين في إدارة مرضى السكري من النوع الثاني',
      },
    },
    ZH: {
      name: '德国',
      description: '欧洲最大的经济体，在工程、汽车和可再生能源领域处于全球领先地位。',
      targetAudience: {
        label: '目标受众',
        content: '内分泌学家、糖尿病学家和其他参与2型糖尿病患者管理的医疗保健专业人员',
      },
    },
    JA: {
      name: 'ドイツ',
      description: 'ヨーロッパ最大の経済大国であり、エンジニアリング、自動車、再生可能エネルギー分野の世界的リーダー。',
      targetAudience: {
        label: '対象者',
        content: '2型糖尿病患者の管理に関わる内分泌学者、糖尿病学者、その他の医療専門家',
      },
    },
    PT: {
      name: 'Alemanha',
      description: 'A maior economia da Europa e líder global nos setores de engenharia, automotivo e energias renováveis.',
      targetAudience: {
        label: 'Público-Alvo',
        content: 'Endocrinologistas, diabetologistas e outros profissionais de saúde envolvidos no manejo de pacientes com DM2',
      },
    },
  },
  italy: {
    EN: {
      name: 'Italy',
      description: 'Rich cultural heritage combined with strong fashion, design, and manufacturing industries.',
      targetAudience: {
        label: 'Target Audience',
        content: 'Endocrinologists, diabetologists, and other healthcare professionals involved in the management of patients with T2DM',
      },
    },
    ES: {
      name: 'Italia',
      description: 'Rico patrimonio cultural combinado con fuertes industrias de moda, diseño y manufactura.',
      targetAudience: {
        label: 'Audiencia Objetivo',
        content: 'Endocrinólogos, diabetólogos y otros profesionales de la salud involucrados en el manejo de pacientes con DM2',
      },
    },
    FR: {
      name: 'Italie',
      description: 'Riche patrimoine culturel combiné à de solides industries de la mode, du design et de la fabrication.',
      targetAudience: {
        label: 'Public Cible',
        content: 'Endocrinologues, diabétologues et autres professionnels de la santé impliqués dans la prise en charge des patients atteints de DT2',
      },
    },
    DE: {
      name: 'Italien',
      description: 'Reiches kulturelles Erbe kombiniert mit starken Industrien für Mode, Design und Fertigung.',
      targetAudience: {
        label: 'Zielgruppe',
        content: 'Endokrinologen, Diabetologen und andere Gesundheitsfachkräfte, die an der Behandlung von Patienten mit Typ-2-Diabetes beteiligt sind',
      },
    },
    AR: {
      name: 'إيطاليا',
      description: 'تراث ثقافي غني مجتمع مع صناعات قوية في الموضة والتصميم والتصنيع.',
      targetAudience: {
        label: 'الجمهور المستهدف',
        content: 'أطباء الغدد الصماء وأطباء السكري وغيرهم من المهنيين الصحيين المشاركين في إدارة مرضى السكري من النوع الثاني',
      },
    },
    ZH: {
      name: '意大利',
      description: '丰富的文化遗产与强大的时尚、设计和制造业相结合。',
      targetAudience: {
        label: '目标受众',
        content: '内分泌学家、糖尿病学家和其他参与2型糖尿病患者管理的医疗保健专业人员',
      },
    },
    JA: {
      name: 'イタリア',
      description: '豊かな文化的遺産と、強力なファッション、デザイン、製造業の組み合わせ。',
      targetAudience: {
        label: '対象者',
        content: '2型糖尿病患者の管理に関わる内分泌学者、糖尿病学者、その他の医療専門家',
      },
    },
    PT: {
      name: 'Itália',
      description: 'Rico patrimônio cultural combinado com fortes indústrias de moda, design e manufatura.',
      targetAudience: {
        label: 'Público-Alvo',
        content: 'Endocrinologistas, diabetologistas e outros profissionais de saúde envolvidos no manejo de pacientes com DM2',
      },
    },
  },
  spain: {
    EN: {
      name: 'Spain',
      description: 'Dynamic market with thriving tourism, renewable energy, and tech startup ecosystems.',
      targetAudience: {
        label: 'Target Audience',
        content: 'Endocrinologists, diabetologists, and other healthcare professionals involved in the management of patients with T2DM',
      },
    },
    ES: {
      name: 'España',
      description: 'Mercado dinámico con ecosistemas prósperos de turismo, energía renovable y startups tecnológicas.',
      targetAudience: {
        label: 'Audiencia Objetivo',
        content: 'Endocrinólogos, diabetólogos y otros profesionales de la salud involucrados en el manejo de pacientes con DM2',
      },
    },
    FR: {
      name: 'Espagne',
      description: 'Marché dynamique avec des écosystèmes florissants de tourisme, d\'énergies renouvelables et de startups technologiques.',
      targetAudience: {
        label: 'Public Cible',
        content: 'Endocrinologues, diabétologues et autres professionnels de la santé impliqués dans la prise en charge des patients atteints de DT2',
      },
    },
    DE: {
      name: 'Spanien',
      description: 'Dynamischer Markt mit florierenden Ökosystemen für Tourismus, erneuerbare Energien und Tech-Startups.',
      targetAudience: {
        label: 'Zielgruppe',
        content: 'Endokrinologen, Diabetologen und andere Gesundheitsfachkräfte, die an der Behandlung von Patienten mit Typ-2-Diabetes beteiligt sind',
      },
    },
    AR: {
      name: 'إسبانيا',
      description: 'سوق ديناميكي مع أنظمة بيئية مزدهرة للسياحة والطاقة المتجددة وشركات التكنولوجيا الناشئة.',
      targetAudience: {
        label: 'الجمهور المستهدف',
        content: 'أطباء الغدد الصماء وأطباء السكري وغيرهم من المهنيين الصحيين المشاركين في إدارة مرضى السكري من النوع الثاني',
      },
    },
    ZH: {
      name: '西班牙',
      description: '充满活力的市场，拥有蓬勃发展的旅游、可再生能源和科技初创企业生态系统。',
      targetAudience: {
        label: '目标受众',
        content: '内分泌学家、糖尿病学家和其他参与2型糖尿病患者管理的医疗保健专业人员',
      },
    },
    JA: {
      name: 'スペイン',
      description: '観光、再生可能エネルギー、テクノロジースタートアップの生態系が繁栄しているダイナミックな市場。',
      targetAudience: {
        label: '対象者',
        content: '2型糖尿病患者の管理に関わる内分泌学者、糖尿病学者、その他の医療専門家',
      },
    },
    PT: {
      name: 'Espanha',
      description: 'Mercado dinâmico com ecossistemas prósperos de turismo, energia renovável e startups de tecnologia.',
      targetAudience: {
        label: 'Público-Alvo',
        content: 'Endocrinologistas, diabetologistas e outros profissionais de saúde envolvidos no manejo de pacientes com DM2',
      },
    },
  },
  china: {
    EN: {
      name: 'China',
      description: 'World\'s second-largest economy with massive market potential in technology, manufacturing, and consumer goods.',
      targetAudience: {
        label: 'Target Audience',
        content: 'Endocrinologists, diabetologists, and other healthcare professionals involved in the management of patients with T2DM',
      },
    },
    ES: {
      name: 'China',
      description: 'Segunda economía más grande del mundo con un enorme potencial de mercado en tecnología, manufactura y bienes de consumo.',
      targetAudience: {
        label: 'Audiencia Objetivo',
        content: 'Endocrinólogos, diabetólogos y otros profesionales de la salud involucrados en el manejo de pacientes con DM2',
      },
    },
    FR: {
      name: 'Chine',
      description: 'Deuxième plus grande économie mondiale avec un énorme potentiel de marché dans la technologie, la fabrication et les biens de consommation.',
      targetAudience: {
        label: 'Public Cible',
        content: 'Endocrinologues, diabétologues et autres professionnels de la santé impliqués dans la prise en charge des patients atteints de DT2',
      },
    },
    DE: {
      name: 'China',
      description: 'Zweitgrößte Volkswirtschaft der Welt mit enormem Marktpotenzial in Technologie, Fertigung und Konsumgütern.',
      targetAudience: {
        label: 'Zielgruppe',
        content: 'Endokrinologen, Diabetologen und andere Gesundheitsfachkräfte, die an der Behandlung von Patienten mit Typ-2-Diabetes beteiligt sind',
      },
    },
    AR: {
      name: 'الصين',
      description: 'ثاني أكبر اقتصاد في العالم بإمكانات سوقية هائلة في التكنولوجيا والتصنيع والسلع الاستهلاكية.',
      targetAudience: {
        label: 'الجمهور المستهدف',
        content: 'أطباء الغدد الصماء وأطباء السكري وغيرهم من المهنيين الصحيين المشاركين في إدارة مرضى السكري من النوع الثاني',
      },
    },
    ZH: {
      name: '中国',
      description: '世界第二大经济体，在技术、制造业和消费品方面拥有巨大的市场潜力。',
      targetAudience: {
        label: '目标受众',
        content: '内分泌学家、糖尿病学家和其他参与2型糖尿病患者管理的医疗保健专业人员',
      },
    },
    JA: {
      name: '中国',
      description: '世界第2位の経済大国で、技術、製造、消費財において巨大な市場ポテンシャルを有する。',
      targetAudience: {
        label: '対象者',
        content: '2型糖尿病患者の管理に関わる内分泌学者、糖尿病学者、その他の医療専門家',
      },
    },
    PT: {
      name: 'China',
      description: 'Segunda maior economia do mundo com enorme potencial de mercado em tecnologia, manufatura e bens de consumo.',
      targetAudience: {
        label: 'Público-Alvo',
        content: 'Endocrinologistas, diabetologistas e outros profissionais de saúde envolvidos no manejo de pacientes com DM2',
      },
    },
  },
  japan: {
    EN: {
      name: 'Japan',
      description: 'Advanced technology hub with highly sophisticated consumers and innovative business environment.',
      targetAudience: {
        label: 'Target Audience',
        content: 'Endocrinologists, diabetologists, and other healthcare professionals involved in the management of patients with T2DM',
      },
    },
    ES: {
      name: 'Japón',
      description: 'Centro tecnológico avanzado con consumidores altamente sofisticados y un entorno empresarial innovador.',
      targetAudience: {
        label: 'Audiencia Objetivo',
        content: 'Endocrinólogos, diabetólogos y otros profesionales de la salud involucrados en el manejo de pacientes con DM2',
      },
    },
    FR: {
      name: 'Japon',
      description: 'Pôle technologique avancé avec des consommateurs hautement sophistiqués et un environnement commercial innovant.',
      targetAudience: {
        label: 'Public Cible',
        content: 'Endocrinologues, diabétologues et autres professionnels de la santé impliqués dans la prise en charge des patients atteints de DT2',
      },
    },
    DE: {
      name: 'Japan',
      description: 'Fortschrittliches Technologiezentrum mit hoch entwickelten Verbrauchern und innovativem Geschäftsumfeld.',
      targetAudience: {
        label: 'Zielgruppe',
        content: 'Endokrinologen, Diabetologen und andere Gesundheitsfachkräfte, die an der Behandlung von Patienten mit Typ-2-Diabetes beteiligt sind',
      },
    },
    AR: {
      name: 'اليابان',
      description: 'مركز تكنولوجي متقدم مع مستهلكين متطورين للغاية وبيئة أعمال مبتكرة.',
      targetAudience: {
        label: 'الجمهور المستهدف',
        content: 'أطباء الغدد الصماء وأطباء السكري وغيرهم من المهنيين الصحيين المشاركين في إدارة مرضى السكري من النوع الثاني',
      },
    },
    ZH: {
      name: '日本',
      description: '先进的技术中心，拥有高度成熟的消费者和创新的商业环境。',
      targetAudience: {
        label: '目标受众',
        content: '内分泌学家、糖尿病学家和其他参与2型糖尿病患者管理的医疗保健专业人员',
      },
    },
    JA: {
      name: '日本',
      description: '高度に洗練された消費者と革新的なビジネス環境を備えた先進的な技術ハブ。',
      targetAudience: {
        label: '対象者',
        content: '2型糖尿病患者の管理に関わる内分泌学者、糖尿病学者、その他の医療専門家',
      },
    },
    PT: {
      name: 'Japão',
      description: 'Centro tecnológico avançado com consumidores altamente sofisticados e ambiente de negócios inovador.',
      targetAudience: {
        label: 'Público-Alvo',
        content: 'Endocrinologistas, diabetologistas e outros profissionais de saúde envolvidos no manejo de pacientes com DM2',
      },
    },
  },
  brazil: {
    EN: {
      name: 'Brazil',
      description: 'Latin America\'s largest economy with a rapidly expanding middle class and digital transformation.',
      targetAudience: {
        label: 'Target Audience',
        content: 'Endocrinologists, diabetologists, and other healthcare professionals involved in the management of patients with T2DM',
      },
    },
    ES: {
      name: 'Brasil',
      description: 'La economía más grande de América Latina con una clase media en rápida expansión y transformación digital.',
      targetAudience: {
        label: 'Audiencia Objetivo',
        content: 'Endocrinólogos, diabetólogos y otros profesionales de la salud involucrados en el manejo de pacientes con DM2',
      },
    },
    FR: {
      name: 'Brésil',
      description: 'La plus grande économie d\'Amérique latine avec une classe moyenne en expansion rapide et une transformation numérique.',
      targetAudience: {
        label: 'Public Cible',
        content: 'Endocrinologues, diabétologues et autres professionnels de la santé impliqués dans la prise en charge des patients atteints de DT2',
      },
    },
    DE: {
      name: 'Brasilien',
      description: 'Größte Volkswirtschaft Lateinamerikas mit einer schnell wachsenden Mittelschicht und digitaler Transformation.',
      targetAudience: {
        label: 'Zielgruppe',
        content: 'Endokrinologen, Diabetologen und andere Gesundheitsfachkräfte, die an der Behandlung von Patienten mit Typ-2-Diabetes beteiligt sind',
      },
    },
    AR: {
      name: 'البرازيل',
      description: 'أكبر اقتصاد في أمريكا اللاتينية مع توسع سريع للطبقة الوسطى والتحول الرقمي.',
      targetAudience: {
        label: 'الجمهور المستهدف',
        content: 'أطباء الغدد الصماء وأطباء السكري وغيرهم من المهنيين الصحيين المشاركين في إدارة مرضى السكري من النوع الثاني',
      },
    },
    ZH: {
      name: '巴西',
      description: '拉丁美洲最大的经济体，中产阶级快速扩张，正在进行数字化转型。',
      targetAudience: {
        label: '目标受众',
        content: '内分泌学家、糖尿病学家和其他参与2型糖尿病患者管理的医疗保健专业人员',
      },
    },
    JA: {
      name: 'ブラジル',
      description: '急速に拡大する中産階級とデジタル変革を伴うラテンアメリカ最大の経済大国。',
      targetAudience: {
        label: '対象者',
        content: '2型糖尿病患者の管理に関わる内分泌学者、糖尿病学者、その他の医療専門家',
      },
    },
    PT: {
      name: 'Brasil',
      description: 'Maior economia da América Latina com uma classe média em rápida expansão e transformação digital.',
      targetAudience: {
        label: 'Público-Alvo',
        content: 'Endocrinologistas, diabetologistas e outros profissionais de saúde envolvidos no manejo de pacientes com DM2',
      },
    },
  },
  saudi: {
    EN: {
      name: 'Saudi Arabia',
      description: 'Rapidly diversifying economy with Vision 2030 driving massive investments in technology and innovation.',
      targetAudience: {
        label: 'Target Audience',
        content: 'Endocrinologists, diabetologists, and other healthcare professionals involved in the management of patients with T2DM',
      },
    },
    ES: {
      name: 'Arabia Saudita',
      description: 'Economía en rápida diversificación con la Visión 2030 impulsando inversiones masivas en tecnología e innovación.',
      targetAudience: {
        label: 'Audiencia Objetivo',
        content: 'Endocrinólogos, diabetólogos y otros profesionales de la salud involucrados en el manejo de pacientes con DM2',
      },
    },
    FR: {
      name: 'Arabie Saoudite',
      description: 'Économie en diversification rapide avec la Vision 2030 stimulant des investissements massifs dans la technologie et l\'innovation.',
      targetAudience: {
        label: 'Public Cible',
        content: 'Endocrinologues, diabétologues et autres professionnels de la santé impliqués dans la prise en charge des patients atteints de DT2',
      },
    },
    DE: {
      name: 'Saudi-Arabien',
      description: 'Sich schnell diversifizierende Wirtschaft mit Vision 2030, die massive Investitionen in Technologie und Innovation vorantreibt.',
      targetAudience: {
        label: 'Zielgruppe',
        content: 'Endokrinologen, Diabetologen und andere Gesundheitsfachkräfte, die an der Behandlung von Patienten mit Typ-2-Diabetes beteiligt sind',
      },
    },
    AR: {
      name: 'المملكة العربية السعودية',
      description: 'اقتصاد يتنوع بسرعة مع رؤية 2030 التي تدفع استثمارات ضخمة في التكنولوجيا والابتكار.',
      targetAudience: {
        label: 'الجمهور المستهدف',
        content: 'أطباء الغدد الصماء وأطباء السكري وغيرهم من المهنيين الصحيين المشاركين في إدارة مرضى السكري من النوع الثاني',
      },
    },
    ZH: {
      name: '沙特阿拉伯',
      description: '快速多元化的经济体，2030愿景推动了对技术和创新的大规模投资。',
      targetAudience: {
        label: '目标受众',
        content: '内分泌学家、糖尿病学家和其他参与2型糖尿病患者管理的医疗保健专业人员',
      },
    },
    JA: {
      name: 'サウジアラビア',
      description: 'ビジョン2030が技術とイノベーションへの大規模な投資を推進する急速に多様化する経済。',
      targetAudience: {
        label: '対象者',
        content: '2型糖尿病患者の管理に関わる内分泌学者、糖尿病学者、その他の医療専門家',
      },
    },
    PT: {
      name: 'Arábia Saudita',
      description: 'Economia em rápida diversificação com a Visão 2030 impulsionando investimentos massivos em tecnologia e inovação.',
      targetAudience: {
        label: 'Público-Alvo',
        content: 'Endocrinologistas, diabetologistas e outros profissionais de saúde envolvidos no manejo de pacientes com DM2',
      },
    },
  },
  uae: {
    EN: {
      name: 'United Arab Emirates',
      description: 'World-class infrastructure and economic hub driving innovation across technology, finance, and healthcare sectors.',
      targetAudience: {
        label: 'Target Audience',
        content: 'Endocrinologists, diabetologists, and other healthcare professionals involved in the management of patients with T2DM',
      },
    },
    ES: {
      name: 'Emiratos Árabes Unidos',
      description: 'Infraestructura de clase mundial y centro económico que impulsa la innovación en los sectores de tecnología, finanzas y salud.',
      targetAudience: {
        label: 'Audiencia Objetivo',
        content: 'Endocrinólogos, diabetólogos y otros profesionales de la salud involucrados en el manejo de pacientes con DM2',
      },
    },
    FR: {
      name: 'Émirats Arabes Unis',
      description: 'Infrastructure de classe mondiale et pôle économique stimulant l\'innovation dans les secteurs de la technologie, de la finance et de la santé.',
      targetAudience: {
        label: 'Public Cible',
        content: 'Endocrinologues, diabétologues et autres professionnels de la santé impliqués dans la prise en charge des patients atteints de DT2',
      },
    },
    DE: {
      name: 'Vereinigte Arabische Emirate',
      description: 'Weltklasse-Infrastruktur und Wirtschaftszentrum, das Innovation in den Bereichen Technologie, Finanzen und Gesundheit vorantreibt.',
      targetAudience: {
        label: 'Zielgruppe',
        content: 'Endokrinologen, Diabetologen und andere Gesundheitsfachkräfte, die an der Behandlung von Patienten mit Typ-2-Diabetes beteiligt sind',
      },
    },
    AR: {
      name: 'الإمارات العربية المتحدة',
      description: 'بنية تحتية عالمية المستوى ومركز اقتصادي يدفع الابتكار عبر قطاعات التكنولوجيا والتمويل والرعاية الصحية.',
      targetAudience: {
        label: 'الجمهور المستهدف',
        content: 'أطباء الغدد الصماء وأطباء السكري وغيرهم من المهنيين الصحيين المشاركين في إدارة مرضى السكري من النوع الثاني',
      },
    },
    ZH: {
      name: '阿拉伯联合酋长国',
      description: '世界一流的基础设施和经济中心，推动技术、金融和医疗保健领域的创新。',
      targetAudience: {
        label: '目标受众',
        content: '内分泌学家、糖尿病学家和其他参与2型糖尿病患者管理的医疗保健专业人员',
      },
    },
    JA: {
      name: 'アラブ首長国連邦',
      description: '技術、金融、医療セクター全体でイノベーションを推進する世界クラスのインフラと経済ハブ。',
      targetAudience: {
        label: '対象者',
        content: '2型糖尿病患者の管理に関わる内分泌学者、糖尿病学者、その他の医療専門家',
      },
    },
    PT: {
      name: 'Emirados Árabes Unidos',
      description: 'Infraestrutura de classe mundial e centro econômico que impulsiona a inovação nos setores de tecnologia, finanças e saúde.',
      targetAudience: {
        label: 'Público-Alvo',
        content: 'Endocrinologistas, diabetologistas e outros profissionais de saúde envolvidos no manejo de pacientes com DM2',
      },
    },
  },
};
