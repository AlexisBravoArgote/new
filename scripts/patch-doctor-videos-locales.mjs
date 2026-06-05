import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "src", "locales");

const block = {
    pt: {
        eyebrow: "NOSSOS ESPECIALISTAS",
        title: "Vídeos dos nossos médicos",
        subtitle: "Conheça a equipe médica da Dental City e sua abordagem em cada especialidade.",
        link: "Ver no Instagram",
        items: {
            team: {
                title: "A equipe Dental City",
                description:
                    "29 especialistas, formação contínua, tecnologia digital e atendimento humano em cada especialidade.",
            },
            andrea: {
                title: "Design de sorriso",
                description: "A Dra. Andrea explica como funciona o design de sorriso na Dental City.",
            },
            alvaro: {
                title: "Colocação de implantes",
                description: "O Dr. Álvaro fala sobre a colocação de implantes.",
            },
            yolanda: {
                title: "Odontopediatria",
                description: "A Dra. Yolanda nos conta sobre odontopediatria.",
            },
            digital: {
                title: "Equipe digital em ação",
                description: "Nossa equipe digital em ação: tecnologia de ponta a serviço do seu sorriso.",
            },
        },
    },
    fr: {
        eyebrow: "NOS SPÉCIALISTES",
        title: "Vidéos de nos docteurs",
        subtitle: "Découvrez l'équipe médicale de Dental City et son approche dans chaque spécialité.",
        link: "Voir sur Instagram",
        items: {
            team: {
                title: "L'équipe Dental City",
                description:
                    "29 spécialistes, formation continue, technologie numérique et attention humaine dans chaque spécialité.",
            },
            andrea: {
                title: "Design du sourire",
                description: "La Dre Andrea nous explique le design du sourire chez Dental City.",
            },
            alvaro: {
                title: "Pose d'implants",
                description: "Le Dr Álvaro nous parle de la pose d'implants.",
            },
            yolanda: {
                title: "Odontopédiatrie",
                description: "La Dre Yolanda nous parle de l'odontopédiatrie.",
            },
            digital: {
                title: "Équipe numérique en action",
                description:
                    "Notre équipe numérique en action : technologie de pointe au service de votre sourire.",
            },
        },
    },
    de: {
        eyebrow: "UNSERE SPEZIALISTEN",
        title: "Videos unserer Ärzte",
        subtitle: "Lernen Sie das medizinische Team von Dental City und seinen Ansatz in jeder Fachrichtung kennen.",
        link: "Auf Instagram ansehen",
        items: {
            team: {
                title: "Das Dental-City-Team",
                description:
                    "29 Spezialisten, Fortbildung, digitale Technologie und menschliche Betreuung in jeder Fachrichtung.",
            },
            andrea: {
                title: "Smile Design",
                description: "Dr. Andrea erklärt, wie Smile Design bei Dental City funktioniert.",
            },
            alvaro: {
                title: "Implantatinsertion",
                description: "Dr. Álvaro spricht über die Implantatinsertion.",
            },
            yolanda: {
                title: "Kinderzahnheilkunde",
                description: "Dr. Yolanda erzählt über Kinderzahnheilkunde.",
            },
            digital: {
                title: "Digitales Team in Aktion",
                description: "Unser digitales Team in Aktion: Spitzentechnologie für Ihr Lächeln.",
            },
        },
    },
    it: {
        eyebrow: "I NOSTRI SPECIALISTI",
        title: "Video dei nostri medici",
        subtitle: "Conosci il team medico di Dental City e il suo approccio in ogni specialità.",
        link: "Guarda su Instagram",
        items: {
            team: {
                title: "Il team Dental City",
                description:
                    "29 specialisti, formazione continua, tecnologia digitale e attenzione umana in ogni specialità.",
            },
            andrea: {
                title: "Design del sorriso",
                description: "La Dott.ssa Andrea spiega come funziona il design del sorriso in Dental City.",
            },
            alvaro: {
                title: "Inserimento di impianti",
                description: "Il Dott. Álvaro parla dell'inserimento di impianti.",
            },
            yolanda: {
                title: "Odontoiatria pediatrica",
                description: "La Dott.ssa Yolanda ci parla di odontoiatria pediatrica.",
            },
            digital: {
                title: "Team digitale in azione",
                description:
                    "Il nostro team digitale in azione: tecnologia all'avanguardia al servizio del tuo sorriso.",
            },
        },
    },
    zh: {
        eyebrow: "我们的专家",
        title: "医生视频",
        subtitle: "了解 Dental City 医疗团队及各专科的诊疗理念。",
        link: "在 Instagram 观看",
        items: {
            team: {
                title: "Dental City 团队",
                description: "29 位专家、持续进修、数字化技术与每个专科的人文关怀。",
            },
            andrea: {
                title: "微笑设计",
                description: "Andrea 医生讲解 Dental City 的微笑设计流程。",
            },
            alvaro: { title: "种植牙", description: "Álvaro 医生介绍种植牙植入。" },
            yolanda: { title: "儿童牙科", description: "Yolanda 医生分享儿童牙科相关内容。" },
            digital: { title: "数字化团队", description: "数字化团队实战：尖端技术为您的笑容服务。" },
        },
    },
    ja: {
        eyebrow: "スペシャリスト",
        title: "ドクターの動画",
        subtitle: "Dental City の医療チームと各専門分野のアプローチをご紹介します。",
        link: "Instagram で見る",
        items: {
            team: {
                title: "Dental City チーム",
                description: "29名の専門医、継続教育、デジタル技術、そして各分野での人間的なケア。",
            },
            andrea: {
                title: "スマイルデザイン",
                description: "アンドレア医師が Dental City のスマイルデザインを解説します。",
            },
            alvaro: { title: "インプラント", description: "アルバロ医師がインプラント埋入について語ります。" },
            yolanda: { title: "小児歯科", description: "ヨランダ医師が小児歯科についてお話しします。" },
            digital: {
                title: "デジタルチーム",
                description: "デジタルチームの現場：最先端技術であなたの笑顔を支えます。",
            },
        },
    },
    ko: {
        eyebrow: "전문의 팀",
        title: "의료진 영상",
        subtitle: "Dental City 의료진과 각 전문 분야의 진료 철학을 만나보세요.",
        link: "Instagram에서 보기",
        items: {
            team: {
                title: "Dental City 팀",
                description: "29명의 전문의, 지속 교육, 디지털 기술, 그리고 각 분야의 인간적인 진료.",
            },
            andrea: {
                title: "스마일 디자인",
                description: "안드레아 원장이 Dental City의 스마일 디자인을 설명합니다.",
            },
            alvaro: { title: "임플란트 식립", description: "알바로 원장이 임플란트 식립에 대해 이야기합니다." },
            yolanda: { title: "소아치과", description: "욜란다 원장이 소아치과에 대해 이야기합니다." },
            digital: { title: "디지털 팀", description: "디지털 팀 현장: 최첨단 기술로 당신의 미소를 지킵니다." },
        },
    },
    hi: {
        eyebrow: "हमारे विशेषज्ञ",
        title: "डॉक्टरों के वीडियो",
        subtitle: "Dental City की चिकित्सा टीम और प्रत्येक विशेषता में उनका दृष्टिकोण जानें।",
        link: "Instagram पर देखें",
        items: {
            team: {
                title: "Dental City टीम",
                description:
                    "29 विशेषज्ञ, निरंतर प्रशिक्षण, डिजिटल तकनीक और हर विशेषता में मानवीय देखभाल।",
            },
            andrea: {
                title: "स्माइल डिज़ाइन",
                description: "डॉ. आंद्रिया Dental City में स्माइल डिज़ाइन कैसे काम करता है, समझाती हैं।",
            },
            alvaro: { title: "इम्प्लांट", description: "डॉ. अल्वारो इम्प्लांट लगाने के बारे में बताते हैं।" },
            yolanda: { title: "बाल दंत चिकित्सा", description: "डॉ. योलांडा बाल दंत चिकित्सा के बारे में बताती हैं।" },
            digital: {
                title: "डिजिटल टीम",
                description: "हमारी डिजिटल टीम कार्य में: आपकी मुस्कान के लिए अत्याधुनिक तकनीक।",
            },
        },
    },
};

for (const lang of Object.keys(block)) {
    for (const file of ["home.json", "translation.json"]) {
        const filePath = path.join(root, lang, file);
        const data = JSON.parse(fs.readFileSync(filePath, "utf8").replace(/^\uFEFF/, ""));
        if (data.doctorVideos) continue;
        data.doctorVideos = block[lang];
        fs.writeFileSync(filePath, `${JSON.stringify(data, null, 4)}\n`, "utf8");
        console.log("patched", lang, file);
    }
}
