export interface CountryData {
    id: string;
    name: string;
    lat: number;
    lng: number;
    size: number;
    color: string;
    description: string;
    image?: string;
    targetAudience?: string;
    language?: string;
    subtitle?: string;
    faculty?: string;
    creditHours?: string;
    nextStep?: string;
}

export const COUNTRIES: CountryData[] = [
    {
        id: 'germany',
        name: 'Germany',
        lat: 51.1657,
        lng: 10.4515,
        size: 0.8,
        color: '#39FF14', // Neon Green
        description: 'Europe\'s largest economy and a global leader in engineering, automotive, and renewable energy sectors.',
        image: 'https://flagcdn.com/w640/de.png',
        targetAudience: 'Endocrinologists, diabetologists, and other healthcare professionals involved in the management of patients with T2DM',
        language: 'German',
        subtitle: 'English',
        faculty: 'Engineering & Business',
        creditHours: '15-30 hours',
        nextStep: 'Access Activity Page'
    },
    {
        id: 'italy',
        name: 'Italy',
        lat: 41.8719,
        lng: 12.5674,
        size: 0.7,
        color: '#FF10F0', // Neon Pink
        description: 'Rich cultural heritage combined with strong fashion, design, and manufacturing industries.',
        image: 'https://flagcdn.com/w640/it.png',
        targetAudience: 'Endocrinologists, diabetologists, and other healthcare professionals involved in the management of patients with T2DM',
        language: 'Italian',
        subtitle: 'English',
        faculty: 'Arts & Design',
        creditHours: '12-24 hours',
        nextStep: 'Access Activity Page'
    },
    {
        id: 'spain',
        name: 'Spain',
        lat: 40.4637,
        lng: -3.7492,
        size: 0.7,
        color: '#FF6600', // Neon Orange
        description: 'Dynamic market with thriving tourism, renewable energy, and tech startup ecosystems.',
        image: 'https://flagcdn.com/w640/es.png',
        targetAudience: 'Endocrinologists, diabetologists, and other healthcare professionals involved in the management of patients with T2DM',
        language: 'Spanish',
        subtitle: 'English',
        faculty: 'Business & Tourism',
        creditHours: '15-30 hours',
        nextStep: 'Access Activity Page'
    },
    {
        id: 'china',
        name: 'China',
        lat: 35.8617,
        lng: 104.1954,
        size: 1.0,
        color: '#FF073A', // Neon Red
        description: 'World\'s second-largest economy with massive market potential in technology, manufacturing, and consumer goods.',
        image: 'https://flagcdn.com/w640/cn.png',
        targetAudience: 'Endocrinologists, diabetologists, and other healthcare professionals involved in the management of patients with T2DM',
        language: 'Mandarin',
        subtitle: 'English',
        faculty: 'Business & Technology',
        creditHours: '12-30 hours',
        nextStep: 'Access Activity Page'
    },
    {
        id: 'japan',
        name: 'Japan',
        lat: 36.2048,
        lng: 138.2529,
        size: 0.8,
        color: '#FFFF00', // Neon Yellow
        description: 'Advanced technology hub with highly sophisticated consumers and innovative business environment.',
        image: 'https://flagcdn.com/w640/jp.png',
        targetAudience: 'Endocrinologists, diabetologists, and other healthcare professionals involved in the management of patients with T2DM',
        language: 'Japanese',
        subtitle: 'English',
        faculty: 'Technology & Engineering',
        creditHours: '15-30 hours',
        nextStep: 'Access Activity Page'
    },
    {
        id: 'brazil',
        name: 'Brazil',
        lat: -14.2350,
        lng: -51.9253,
        size: 0.8,
        color: '#BC13FE', // Neon Purple
        description: 'Latin America\'s largest economy with a rapidly expanding middle class and digital transformation.',
        image: 'https://flagcdn.com/w640/br.png',
        targetAudience: 'Endocrinologists, diabetologists, and other healthcare professionals involved in the management of patients with T2DM',
        language: 'Portuguese',
        subtitle: 'English',
        faculty: 'Business & Social Sciences',
        creditHours: '12-24 hours',
        nextStep: 'Access Activity Page'
    },
    {
        id: 'saudi',
        name: 'Saudi Arabia',
        lat: 23.8859,
        lng: 45.0792,
        size: 0.7,
        color: '#CCFF00', // Neon Lime
        description: 'Rapidly diversifying economy with Vision 2030 driving massive investments in technology and innovation.',
        image: 'https://flagcdn.com/w640/sa.png',
        targetAudience: 'Endocrinologists, diabetologists, and other healthcare professionals involved in the management of patients with T2DM',
        language: 'Arabic',
        subtitle: 'English',
        faculty: 'Business & Innovation',
        creditHours: '15-30 hours',
        nextStep: 'Access Activity Page'
    },
    {
        id: 'uae',
        name: 'United Arab Emirates',
        lat: 23.4241,
        lng: 53.8478,
        size: 0.7,
        color: '#00FFF0', // Neon Cyan
        description: 'World-class infrastructure and economic hub driving innovation across technology, finance, and healthcare sectors.',
        image: 'https://flagcdn.com/w640/ae.png',
        targetAudience: 'Endocrinologists, diabetologists, and other healthcare professionals involved in the management of patients with T2DM',
        language: 'Arabic',
        subtitle: 'English',
        faculty: 'Business & Innovation',
        creditHours: '15-30 hours',
        nextStep: 'Access Activity Page'
    }
];