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

/** @type {Record<string, Record<string, { title: string; description: string }>>} */
export const PAGE_SEO = {
    home: {
        es: {
            title: "Clínica Dental en Zapopan | Invisalign, Implantes y Odontopediatría",
            description:
                "Dental City: clínica dental integral en Zapopan, Jalisco. 29 especialistas, Invisalign Diamond, implantes Straumann, odontopediatría, blanqueamiento, diseño de sonrisa, tomografía CBCT y escaneo intraoral. 4.9★ en Google. Más de 26 años de experiencia.",
        },
        en: {
            title: "Dental Clinic in Zapopan | Invisalign, Implants and Pediatric Dentistry",
            description:
                "Dental City: full-service dental clinic in Zapopan, Jalisco. 29 specialists, Invisalign Diamond, Straumann implants, pediatric dentistry, whitening, smile design, CBCT and intraoral scanning. 4.9★ on Google. Over 26 years of experience.",
        },
        fr: {
            title: "Clinique dentaire à Zapopan, Guadalajara",
            description:
                "Dental City : clinique dentaire complète à Zapopan, Jalisco. Invisalign Diamond, implants Straumann, dentisterie pédiatrique, blanchiment, design du sourire, CBCT et scan intraoral. Plus de 26 ans d'expérience.",
        },
        de: {
            title: "Zahnklinik in Zapopan, Guadalajara",
            description:
                "Dental City: umfassende Zahnklinik in Zapopan, Jalisco. Invisalign Diamond, Straumann-Implantate, Kinderzahnheilkunde, Bleaching, Smile Design, CBCT und intraoraler Scan. Über 26 Jahre Erfahrung.",
        },
        it: {
            title: "Clinica dentale a Zapopan, Guadalajara",
            description:
                "Dental City: clinica dentale completa a Zapopan, Jalisco. Invisalign Diamond, impianti Straumann, odontoiatria pediatrica, sbiancamento, smile design, CBCT e scansione intraorale. Oltre 26 anni di esperienza.",
        },
        zh: {
            title: "萨波潘瓜达拉哈拉牙科诊所",
            description:
                "Dental City：萨波潘综合牙科诊所。隐适美 Diamond、Straumann 种植、儿童牙科、美白、微笑设计、牙科 CT 与口内扫描。逾 26 年专业经验。",
        },
        ja: {
            title: "サポパン・グアダラハラの歯科医院",
            description:
                "Dental City：サポパンの総合歯科医院。インビザライン ダイヤモンド、ストローマン インプラント、小児歯科、ホワイトニング、スマイルデザイン、CBCT、口腔内スキャン。26年以上の実績。",
        },
        ko: {
            title: "사포판, 과달라하라 치과",
            description:
                "Dental City: 사포판 종합 치과. 인비절라인 다이아몬드, 스트라우만 임플란트, 소아치과, 미백, 스마일 디자인, CBCT, 구강 스캔. 26년 이상의 경험.",
        },
        pt: {
            title: "Clínica odontológica em Zapopan, Guadalajara",
            description:
                "Dental City: clínica odontológica completa em Zapopan, Jalisco. Invisalign Diamond, implantes Straumann, odontopediatria, clareamento, design do sorriso, CBCT e escaneamento intraoral. Mais de 26 anos de experiência.",
        },
        hi: {
            title: "ज़ापोपान, ग्वाडलाहारा में दंत क्लिनिक",
            description:
                "Dental City: ज़ापोपान में संपूर्ण दंत क्लिनिक। इनविज़लाइन डायमंड, स्ट्रॉमैन इम्प्लांट, बाल दंत, व्हाइटनिंग, स्माइल डिज़ाइन, CBCT और इंट्राओरल स्कैन। 26+ वर्षों का अनुभव।",
        },
    },
    doctores: {
        es: {
            title: "Nuestros doctores",
            description:
                "Conoce al equipo de 29 especialistas de Dental City en Zapopan: ortodoncistas, implantólogos, odontopediatras, endodoncistas, periodoncistas y más. Más de 26 años cuidando sonrisas en Guadalajara.",
        },
        en: {
            title: "Our Doctors",
            description:
                "Meet Dental City's team of 29 specialists in Zapopan: orthodontists, implantologists, pediatric dentists, endodontists, periodontists, and more. Over 26 years caring for smiles in Guadalajara.",
        },
        fr: {
            title: "Nos docteurs",
            description:
                "Découvrez l'équipe de 29 spécialistes de Dental City à Zapopan : orthodontistes, implantologues, pédodontistes, endodontistes, parodontistes et plus. Plus de 26 ans d'expérience à Guadalajara.",
        },
        de: {
            title: "Unsere Ärzte",
            description:
                "Lernen Sie das Team von 29 Spezialisten bei Dental City in Zapopan kennen: Kieferorthopäden, Implantologen, Kinderzahnärzte, Endodontologen, Parodontologen und mehr. Über 26 Jahre Erfahrung in Guadalajara.",
        },
        it: {
            title: "I nostri medici",
            description:
                "Scopri il team di 29 specialisti di Dental City a Zapopan: ortodontisti, implantologi, odontoiatri pediatrici, endodontisti, parodontologi e altro. Oltre 26 anni di esperienza a Guadalajara.",
        },
        zh: {
            title: "我们的医生团队",
            description:
                "认识 Dental City 在萨波潘的 29 位专科牙医团队：正畸、种植、儿童牙科、根管、牙周等专家。在瓜达拉哈拉地区拥有超过 26 年经验。",
        },
        ja: {
            title: "ドクター紹介",
            description:
                "サポパンの Dental City に在籍する29名の専門医をご紹介。矯正、インプラント、小児歯科、根管治療、歯周病など。グアダラハラで26年以上の実績。",
        },
        ko: {
            title: "의료진 소개",
            description:
                "사포판 Dental City의 29명 전문의 팀을 만나보세요. 교정, 임플란트, 소아치과, 근관치료, 치주 등. 과달라하라에서 26년 이상의 경험.",
        },
        pt: {
            title: "Nossos médicos",
            description:
                "Conheça a equipe de 29 especialistas da Dental City em Zapopan: ortodontistas, implantodontistas, odontopediatras, endodontistas, periodontistas e mais. Mais de 26 anos de experiência em Guadalajara.",
        },
        hi: {
            title: "हमारे डॉक्टर",
            description:
                "ज़ापोपान में Dental City की 29 विशेषज्ञों की टीम से मिलें: ऑर्थोडॉन्टिस्ट, इम्प्लांटोलॉजिस्ट, बाल दंत चिकित्सक, एंडोडॉन्टिस्ट, पेरियोडॉन्टिस्ट और अन्य। ग्वाडलाहारा में 26+ वर्षों का अनुभव।",
        },
    },
};
