/** Spanish is the default locale at / and /doctores (no prefix). */
export const DEFAULT_LOCALE = "es";

export const LOCALES = [
    { code: "es", hreflang: "es-MX", label: "Español" },
    { code: "en", hreflang: "en", label: "English" },
    { code: "fr", hreflang: "fr", label: "Français" },
    { code: "de", hreflang: "de", label: "Deutsch" },
    { code: "it", hreflang: "it", label: "Italiano" },
    { code: "zh", hreflang: "zh", label: "中文" },
    { code: "ja", hreflang: "ja", label: "日本語" },
    { code: "ko", hreflang: "ko", label: "한국어" },
    { code: "pt", hreflang: "pt", label: "Português" },
    { code: "hi", hreflang: "hi", label: "हिन्दी" },
];

export const SECONDARY_LOCALE_CODES = LOCALES.filter((l) => l.code !== DEFAULT_LOCALE).map(
    (l) => l.code
);

export const SITE_ORIGIN = "https://dentalcity.mx";

/** @type {Record<string, Record<string, { title: string; description: string; keywords: string }>>} */
export const PAGE_SEO = {
    home: {
        es: {
            title: "Clínica Dental en Zapopan, Guadalajara",
            description:
                "Clínica dental integral en Zapopan, Jalisco. Especialidades: ortodoncia, implantes, odontopediatría, estética dental. Tecnología digital de vanguardia. Más de 25 años de experiencia.",
            keywords:
                "clínica dental Zapopan, dentista Guadalajara, ortodoncia, implantes dentales, odontopediatría, estética dental, Invisalign, odontología digital",
        },
        en: {
            title: "Dental Clinic in Zapopan, Guadalajara",
            description:
                "Full-service dental clinic in Zapopan, Jalisco. Orthodontics, implants, pediatric dentistry, cosmetic dentistry, and digital technology. Over 25 years of experience.",
            keywords:
                "dental clinic Zapopan, dentist Guadalajara, orthodontics, dental implants, pediatric dentistry, cosmetic dentistry, Invisalign",
        },
        fr: {
            title: "Clinique dentaire à Zapopan, Guadalajara",
            description:
                "Clinique dentaire complète à Zapopan, Jalisco. Orthodontie, implants, dentisterie pédiatrique et esthétique. Plus de 25 ans d'expérience.",
            keywords:
                "clinique dentaire Zapopan, dentiste Guadalajara, orthodontie, implants dentaires",
        },
        de: {
            title: "Zahnklinik in Zapopan, Guadalajara",
            description:
                "Umfassende Zahnklinik in Zapopan, Jalisco. Kieferorthopädie, Implantate, Kinderzahnheilkunde und Ästhetik. Über 25 Jahre Erfahrung.",
            keywords: "Zahnklinik Zapopan, Zahnarzt Guadalajara, Kieferorthopädie, Zahnimplantate",
        },
        it: {
            title: "Clinica dentale a Zapopan, Guadalajara",
            description:
                "Clinica dentale completa a Zapopan, Jalisco. Ortodonzia, impianti, odontoiatria pediatrica ed estetica. Oltre 25 anni di esperienza.",
            keywords: "clinica dentale Zapopan, dentista Guadalajara, ortodonzia, impianti dentali",
        },
        zh: {
            title: "萨波潘瓜达拉哈拉牙科诊所",
            description: "墨西哥萨波潘综合牙科诊所：正畸、种植、儿童牙科与美学修复，数字化诊疗技术，逾25年经验。",
            keywords: "萨波潘牙科, 瓜达拉哈拉牙医, 正畸, 种植牙",
        },
        ja: {
            title: "サポパン・グアダラハラの歯科医院",
            description:
                "サポパンにある総合歯科医院。矯正、インプラント、小児歯科、審美歯科。25年以上の実績。",
            keywords: "サポパン 歯科, グアダラハラ 歯医者, 矯正, インプラント",
        },
        ko: {
            title: "사포판, 과달라하라 치과",
            description:
                "사포판 종합 치과 클리닉. 교정, 임플란트, 소아치과, 심미 치료 및 디지털 기술. 25년 이상의 경험.",
            keywords: "사포판 치과, 과달라하라 치과, 교정, 임플란트",
        },
        pt: {
            title: "Clínica odontológica em Zapopan, Guadalajara",
            description:
                "Clínica odontológica completa em Zapopan, Jalisco. Ortodontia, implantes, odontopediatria e estética. Tecnologia digital. Mais de 25 anos de experiência.",
            keywords:
                "clínica odontológica Zapopan, dentista Guadalajara, ortodontia, implantes dentários, odontopediatria, Invisalign",
        },
        hi: {
            title: "ज़ापोपान, ग्वाडलाहारा में दंत क्लिनिक",
            description:
                "ज़ापोपान, जालिस्को में संपूर्ण दंत क्लिनिक। ऑर्थोडॉन्टिक्स, इम्प्लांट, बाल दंत चिकित्सा और सौंदर्य। डिजिटल तकनीक। 25 से अधिक वर्षों का अनुभव।",
            keywords:
                "दंत क्लिनिक ज़ापोपान, दंत चिकित्सक ग्वाडलाहारा, ऑर्थोडॉन्टिक्स, दंत इम्प्लांट, बाल दंत",
        },
    },
    doctores: {
        es: {
            title: "Nuestros doctores",
            description:
                "Dental City cuenta con 29 dentistas especializados en todas las áreas de odontología. Más de 25 años de experiencia en Zapopan, Jalisco.",
            keywords:
                "dentistas Zapopan, odontólogos Guadalajara, especialistas dentales, equipo dental, clínica dental",
        },
        en: {
            title: "Our Doctors",
            description:
                "Dental City has 29 dentists specialized in every area of dentistry. Over 25 years of experience in Zapopan, Jalisco.",
            keywords:
                "dentists Zapopan, Guadalajara dentists, dental specialists, dental team",
        },
        fr: {
            title: "Nos docteurs",
            description:
                "Dental City compte 29 dentistes spécialisés dans tous les domaines. Plus de 25 ans d'expérience à Zapopan.",
            keywords: "dentistes Zapopan, clinique dentaire Guadalajara",
        },
        de: {
            title: "Unsere Ärzte",
            description:
                "Dental City hat 29 Zahnärzte in allen Fachrichtungen. Über 25 Jahre Erfahrung in Zapopan.",
            keywords: "Zahnärzte Zapopan, Zahnklinik Guadalajara",
        },
        it: {
            title: "I nostri medici",
            description:
                "Dental City ha 29 dentisti specializzati in ogni area. Oltre 25 anni di esperienza a Zapopan.",
            keywords: "dentisti Zapopan, clinica dentale Guadalajara",
        },
        zh: {
            title: "我们的医生团队",
            description: "Dental City 拥有29位各专科牙医，在萨波潘拥有超过25年经验。",
            keywords: "萨波潘牙医, 瓜达拉哈拉牙科专家",
        },
        ja: {
            title: "ドクター紹介",
            description: "Dental Cityには全分野の専門医29名が在籍。サポパンで25年以上の実績。",
            keywords: "サポパン 歯科医, 歯科専門医",
        },
        ko: {
            title: "의료진 소개",
            description: "Dental City는 29명의 치과 전문의가 모든 분야를 담당합니다. 사포판에서 25년 이상의 경험.",
            keywords: "사포판 치과의사, 치과 전문의",
        },
        pt: {
            title: "Nossos médicos",
            description:
                "A Dental City conta com 29 dentistas especializados em todas as áreas da odontologia. Mais de 25 anos de experiência em Zapopan, Jalisco.",
            keywords:
                "dentistas Zapopan, odontologistas Guadalajara, especialistas dentais, equipe dental",
        },
        hi: {
            title: "हमारे डॉक्टर",
            description:
                "Dental City में दंत चिकित्सा के सभी क्षेत्रों में 29 विशेषज्ञ हैं। ज़ापोपान, जालिस्को में 25 से अधिक वर्षों का अनुभव।",
            keywords:
                "दंत चिकित्सक ज़ापोपान, ग्वाडलाहारा दंत विशेषज्ञ, दंत टीम",
        },
    },
};
