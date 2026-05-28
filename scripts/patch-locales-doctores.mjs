import fs from "fs";
import path from "path";

const additions = {
    fr: {
        heroP3: "Notre équipe multidisciplinaire compte <strong>29 professionnels dentaires</strong>, dont <strong>5 orthodontistes, 9 dentistes généralistes, 5 prothésistes, 2 parodontistes, 2 endodontistes, 2 chirurgiens maxillo-faciaux, 2 chirurgiens oraux, 1 dentiste pédiatrique et 1 implantologiste.</strong> Chaque spécialiste apporte des années d'expérience et une formation continue pour offrir les meilleurs soins à Zapopan, Jalisco.",
        heroP4: "Nous utilisons une technologie numérique de pointe et respectons les normes les plus élevées de qualité et de sécurité. Nos médecins s'engagent dans la formation continue et l'innovation pour offrir des résultats exceptionnels.",
        specialtiesTitle: "Spécialités de notre équipe",
        mainClinicDesc: "Notre équipe de spécialistes à la clinique principale Dental City, située dans la Zona Real de Zapopan. Des professionnels hautement qualifiés dans tous les domaines de la dentisterie moderne.",
    },
    de: {
        heroP3: "Unser multidisziplinäres Team umfasst <strong>29 Zahnmediziner</strong>, darunter <strong>5 Kieferorthopäden, 9 Allgemeinzahnärzte, 5 Prothetiker, 2 Parodontologen, 2 Endodontologen, 2 Mund-Kiefer-Gesichtschirurgen, 2 Oralchirurgen, 1 Kinderzahnarzt und 1 Implantologe.</strong> Jeder Spezialist bringt Erfahrung und kontinuierliche Fortbildung mit.",
        heroP4: "Wir arbeiten mit modernster digitaler Technologie und höchsten Qualitäts- und Sicherheitsstandards. Unsere Ärzte sind der Weiterbildung und innovativen Behandlungen verpflichtet.",
        specialtiesTitle: "Spezialgebiete unseres Teams",
        mainClinicDesc: "Unser Spezialistenteam in der Hauptklinik Dental City in Zona Real, Zapopan. Hochqualifizierte Fachkräfte in allen Bereichen der modernen Zahnmedizin.",
    },
    it: {
        heroP3: "Il nostro team multidisciplinare comprende <strong>29 professionisti odontoiatrici</strong>, tra cui <strong>5 ortodontisti, 9 dentisti generici, 5 protesisti, 2 parodontologi, 2 endodontisti, 2 chirurghi maxillo-facciali, 2 chirurghi orali, 1 odontoiatra pediatrico e 1 implantologo.</strong>",
        heroP4: "Utilizziamo tecnologia digitale all'avanguardia e seguiamo i più alti standard di qualità e sicurezza. I nostri medici sono impegnati nella formazione continua e nell'innovazione.",
        specialtiesTitle: "Specialità del nostro team",
        mainClinicDesc: "Il nostro team di specialisti nella clinica principale Dental City, nella Zona Real di Zapopan. Professionisti altamente qualificati in tutte le aree dell'odontoiatria moderna.",
    },
    ja: {
        heroP3: "当院のチームは<strong>歯科専門家29名</strong>で構成され、<strong>矯正歯科医5名、一般歯科医9名、補綴専門医5名、歯周専門医2名、根管専門医2名、顎顔面外科医2名、口腔外科医2名、小児歯科医1名、インプラント専門医1名</strong>が在籍しています。",
        heroP4: "最新のデジタル技術と高い品質・安全基準で診療しています。継続的な教育と治療の革新に取り組んでいます。",
        specialtiesTitle: "チームの専門分野",
        mainClinicDesc: "サポパン・ソナ・レアルにある本院の専門医チーム。現代歯科の全分野に対応できるプロフェッショナルです。",
    },
    ko: {
        heroP3: "다학제 팀은 <strong>치과 전문가 29명</strong>으로 구성되며, <strong>교정 전문의 5명, 일반 치과의사 9명, 보철 전문의 5명, 치주 전문의 2명, 근관 전문의 2명, 악안면외과 의사 2명, 구강외과 의사 2명, 소아치과의사 1명, 임플란트 전문의 1명</strong>이 있습니다.",
        heroP4: "최신 디지털 기술과 높은 품질·안전 기준을 따릅니다. 지속적인 교육과 혁신적인 치료에 헌신합니다.",
        specialtiesTitle: "팀 전문 분야",
        mainClinicDesc: "사포판 소나 레알에 위치한 본원 전문의 팀. 현대 치과의 모든 분야에서 높은 역량을 갖추고 있습니다.",
    },
    zh: {
        heroP3: "我们的多学科团队由<strong>29名牙科专业人员</strong>组成，包括<strong>5名正畸医生、9名全科牙医、5名修复医生、2名牙周医生、2名根管医生、2名颌面外科医生、2名口腔外科医生、1名儿童牙医和1名种植医生。</strong>",
        heroP4: "我们采用最先进的数字技术，遵循最高的质量与安全标准。医生致力于持续教育和创新治疗。",
        specialtiesTitle: "团队专业领域",
        mainClinicDesc: "位于萨波潘 Zona Real 的 Dental City 主诊所专家团队，涵盖现代牙科各领域。",
    },
};

for (const [lang, keys] of Object.entries(additions)) {
    const file = path.join("src/locales", lang, "translation.json");
    const data = JSON.parse(fs.readFileSync(file, "utf8"));
    Object.assign(data, keys);
    if (data.heroP1_years && lang !== "es") {
        data.heroP1_years = data.heroP1_years.replace("25", "26");
    }
    fs.writeFileSync(file, JSON.stringify(data, null, 4) + "\n");
}

const doctores = "src/components-react/DoctoresContent.jsx";
let s = fs.readFileSync(doctores, "utf8");
s = s.replace(
    /"description": "Cl[^"]+"/,
    '"description": "Clínica dental con más de 26 años de experiencia. Contamos con 29 dentistas especializados en todas las áreas de odontología."'
);
fs.writeFileSync(doctores, s);

const astro = "src/pages/doctores.astro";
let a = fs.readFileSync(astro, "utf8");
a = a.replace("más de 25 años", "más de 26 años");
fs.writeFileSync(astro, a);

console.log("done");
