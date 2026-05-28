/**
 * Generates pt/hi home.json and translation.json from English templates.
 * Run: node scripts/generate-pt-hi-locales.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { HI_SERVICE_MODAL, PT_SERVICE_MODAL } from "./locale-maps/service-modal-extended.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

function readJson(rel) {
    const raw = fs.readFileSync(path.join(root, rel), "utf8").replace(/^\uFEFF/, "");
    return JSON.parse(raw);
}

function writeJson(rel, data) {
    const dir = path.dirname(path.join(root, rel));
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(root, rel), `${JSON.stringify(data, null, 4)}\n`, "utf8");
}

function mapStrings(obj, map) {
    if (typeof obj === "string") return map[obj] ?? obj;
    if (Array.isArray(obj)) return obj.map((item) => mapStrings(item, map));
    if (obj && typeof obj === "object") {
        const out = {};
        for (const [k, v] of Object.entries(obj)) out[k] = mapStrings(v, map);
        return out;
    }
    return obj;
}

const PT = {
    "Our Doctors | Dental City": "Nossos médicos | Dental City",
    TEAM: "EQUIPE",
    "Our Doctors": "Nossos médicos",
    "Dental City is the largest dental clinic in the Guadalajara metropolitan area. With more than {{years}} of experience, we serve the Zona Real community of Zapopan, patients from other states, and international visitors. We offer {{allSpecs}} and {{twoBranches}}, including {{kids}} focused on pediatric dentistry and orthodontics.":
        "A Dental City é a maior clínica odontológica da região metropolitana de Guadalajara. Com mais de {{years}} de experiência, atendemos a comunidade da Zona Real em Zapopan, pacientes de outros estados e visitantes internacionais. Oferecemos {{allSpecs}} e {{twoBranches}}, incluindo {{kids}}, focada em odontopediatria e ortodontia.",
    "26 years": "26 anos",
    "all dental specialties": "todas as especialidades odontológicas",
    "two locations": "duas unidades",
    "Dental City Kids": "Dental City Kids",
    "We constantly innovate in digital dentistry to deliver more precise and efficient treatments, always with our signature quality.":
        "Inovamos constantemente em odontologia digital para tratamentos mais precisos e eficientes, sempre com nosso padrão de qualidade.",
    "Our multidisciplinary team includes <strong>29 dental professionals</strong>, including <strong>5 orthodontists, 9 general dentists, 5 prosthodontists, 2 periodontists, 2 endodontists, 2 maxillofacial surgeons, 2 oral surgeons, 1 pediatric dentist, and 1 implantologist.</strong> Each specialist brings years of experience and ongoing training to provide outstanding dental care in Zapopan, Jalisco.":
        "Nossa equipe multidisciplinar inclui <strong>29 profissionais de odontologia</strong>, entre eles <strong>5 ortodontistas, 9 dentistas gerais, 5 protéticos, 2 periodontistas, 2 endodontistas, 2 cirurgiões bucomaxilofaciais, 2 cirurgiões orais, 1 odontopediatra e 1 implantodontista.</strong> Cada especialista traz anos de experiência e formação contínua para oferecer excelente atendimento em Zapopan, Jalisco.",
    "We work with state-of-the-art digital technology and follow the highest standards of quality and safety. Our doctors are committed to continuing education and innovative dental treatments to deliver exceptional results for our patients.":
        "Trabalhamos com tecnologia digital de ponta e seguimos os mais altos padrões de qualidade e segurança. Nossos médicos estão comprometidos com educação continuada e tratamentos inovadores para resultados excepcionais.",
    "Our Team Specialties": "Especialidades da nossa equipe",
    Dentists: "Dentistas",
    "Our team of specialists at the main Dental City clinic in Zona Real, Zapopan. Highly trained professionals across all areas of modern dentistry.":
        "Nossa equipe de especialistas na clínica principal da Dental City na Zona Real, Zapopan. Profissionais altamente capacitados em todas as áreas da odontologia moderna.",
    "Specialists in pediatric dentistry and children's orthodontics at Dental City Kids & Family. Our team is specially trained to provide friendly, effective dental care for children and teens in Zapopan, Jalisco.":
        "Especialistas em odontopediatria e ortodontia infantil na Dental City Kids & Family. Equipe treinada para atendimento amigável e eficaz a crianças e adolescentes em Zapopan, Jalisco.",
    "• MAIN CLINIC •": "• CLÍNICA PRINCIPAL •",
    "Dental City Doctors": "Médicos Dental City",
    "• PEDIATRIC DENTISTRY & ORTHODONTICS •": "• ODONTOPEDIATRIA E ORTODONTIA •",
    "Dental City Kids Doctors": "Médicos Dental City Kids",
    Previous: "Anterior",
    Next: "Próximo",
    Orthodontists: "Ortodontistas",
    "General Dentists": "Dentistas gerais",
    Prosthodontists: "Protéticos",
    Periodontists: "Periodontistas",
    Endodontists: "Endodontistas",
    "Oral and Maxillofacial Surgeons": "Cirurgiões bucomaxilofaciais",
    "Oral Surgeons": "Cirurgiões orais",
    "Pediatric Dentists": "Odontopediatras",
    Implantologists: "Implantodontistas",
    "Digital Technology": "Tecnologia digital",
    "Child Care": "Atendimento infantil",
    Language: "Idioma",
};

const HI = {
    "Our Doctors | Dental City": "हमारे डॉक्टर | Dental City",
    TEAM: "टीम",
    "Our Doctors": "हमारे डॉक्टर",
    "Dental City is the largest dental clinic in the Guadalajara metropolitan area. With more than {{years}} of experience, we serve the Zona Real community of Zapopan, patients from other states, and international visitors. We offer {{allSpecs}} and {{twoBranches}}, including {{kids}} focused on pediatric dentistry and orthodontics.":
        "Dental City ग्वाडलाहारा महानगरीय क्षेत्र की सबसे बड़ी दंत चिकित्सा क्लिनिक है। {{years}} से अधिक अनुभव के साथ हम ज़ापोपान के Zona Real समुदाय, अन्य राज्यों के रोगियों और अंतरराष्ट्रीय आगंतुकों की सेवा करते हैं। हमारे पास {{allSpecs}} और {{twoBranches}} हैं, जिनमें {{kids}} शामिल है, जो बाल दंत चिकित्सा और ऑर्थोडॉन्टिक्स पर केंद्रित है।",
    "26 years": "26 वर्ष",
    "all dental specialties": "सभी दंत विशेषताएँ",
    "two locations": "दो शाखाएँ",
    "Dental City Kids": "Dental City Kids",
    "We constantly innovate in digital dentistry to deliver more precise and efficient treatments, always with our signature quality.":
        "हम डिजिटल दंत चिकित्सा में निरंतर नवाचार करते हैं ताकि अधिक सटीक और प्रभावी उपचार मिल सकें, हमेशा हमारी गुणवत्ता के साथ।",
    "Our multidisciplinary team includes <strong>29 dental professionals</strong>, including <strong>5 orthodontists, 9 general dentists, 5 prosthodontists, 2 periodontists, 2 endodontists, 2 maxillofacial surgeons, 2 oral surgeons, 1 pediatric dentist, and 1 implantologist.</strong> Each specialist brings years of experience and ongoing training to provide outstanding dental care in Zapopan, Jalisco.":
        "हमारी बहु-विषयक टीम में <strong>29 दंत विशेषज्ञ</strong> शामिल हैं, जिनमें <strong>5 ऑर्थोडॉन्टिस्ट, 9 सामान्य दंत चिकित्सक, 5 प्रोस्थोडॉन्टिस्ट, 2 पेरियोडॉन्टिस्ट, 2 मैक्सिलोफेशियल सर्जन, 2 ओरल सर्जन, 1 बाल दंत चिकित्सक और 1 इम्प्लांटोलॉजिस्ट</strong> हैं। प्रत्येक विशेषज्ञ ज़ापोपान, जालिस्को में उत्कृष्ट दंत देखभाल प्रदान करने के लिए अनुभव और निरंतर प्रशिक्षण लाता है।",
    "We work with state-of-the-art digital technology and follow the highest standards of quality and safety. Our doctors are committed to continuing education and innovative dental treatments to deliver exceptional results for our patients.":
        "हम अत्याधुनिक डिजिटल तकनीक के साथ काम करते हैं और गुणवत्ता व सुरक्षा के उच्चतम मानकों का पालन करते हैं। हमारे डॉक्टर निरंतर शिक्षा और नवीन उपचारों के लिए प्रतिबद्ध हैं।",
    "Our Team Specialties": "हमारी टीम की विशेषताएँ",
    Dentists: "दंत चिकित्सक",
    "Our team of specialists at the main Dental City clinic in Zona Real, Zapopan. Highly trained professionals across all areas of modern dentistry.":
        "ज़ापोपान, Zona Real में मुख्य Dental City क्लिनिक में हमारी विशेषज्ञ टीम। आधुनिक दंत चिकित्सा के सभी क्षेत्रों में प्रशिक्षित पेशेवर।",
    "Specialists in pediatric dentistry and children's orthodontics at Dental City Kids & Family. Our team is specially trained to provide friendly, effective dental care for children and teens in Zapopan, Jalisco.":
        "Dental City Kids & Family में बाल दंत चिकित्सा और बाल ऑर्थोडॉन्टिक्स के विशेषज्ञ। हमारी टीम बच्चों और किशोरों के लिए मैत्रीपूर्ण, प्रभावी दंत देखभाल प्रदान करने के लिए प्रशिक्षित है।",
    "• MAIN CLINIC •": "• मुख्य क्लिनिक •",
    "Dental City Doctors": "Dental City डॉक्टर",
    "• PEDIATRIC DENTISTRY & ORTHODONTICS •": "• बाल दंत चिकित्सा और ऑर्थोडॉन्टिक्स •",
    "Dental City Kids Doctors": "Dental City Kids डॉक्टर",
    Previous: "पिछला",
    Next: "अगला",
    Orthodontists: "ऑर्थोडॉन्टिस्ट",
    "General Dentists": "सामान्य दंत चिकित्सक",
    Prosthodontists: "प्रोस्थोडॉन्टिस्ट",
    Periodontists: "पेरियोडॉन्टिस्ट",
    Endodontists: "एंडोडॉन्टिस्ट",
    "Oral and Maxillofacial Surgeons": "मैक्सिलोफेशियल सर्जन",
    "Oral Surgeons": "ओरल सर्जन",
    "Pediatric Dentists": "बाल दंत चिकित्सक",
    Implantologists: "इम्प्लांटोलॉजिस्ट",
    "Digital Technology": "डिजिटल तकनीक",
    "Child Care": "बाल देखभाल",
    Language: "भाषा",
};

// Home page: Portuguese (pt-BR style)
const PT_HOME = {
    "Elegance you can see when you smile": "Elegância que se vê no seu sorriso",
    "Cutting-edge digital dentistry, where precision meets comfort and personalized care.":
        "Odontologia digital de ponta, onde a precisão encontra conforto e atendimento personalizado.",
    "Book appointment": "Agendar consulta",
    "View treatments": "Ver tratamentos",
    "ABOUT US": "SOBRE NÓS",
    "Dental care with design": "Cuidado dental com design",
    "Founded by Dr. Linda Argote in 1999, we combine technology and quality so your smile looks and feels better.":
        "Fundada pela Dra. Linda Argote em 1999, unimos tecnologia e qualidade para que seu sorriso fique melhor por dentro e por fora.",
    "Comprehensive dental clinic with all specialties, located in Zapopan, Jalisco. We are a Diamond Invisalign clinic with an in-house lab to create precise, natural, and personalized digital smile designs.":
        "Clínica odontológica integral com todas as especialidades em Zapopan, Jalisco. Somos clínica Invisalign Diamond com laboratório próprio para designs digitais de sorriso precisos e personalizados.",
    "all dental specialties": "todas as especialidades odontológicas",
    "digital smile designs": "designs digitais de sorriso",
    "3D Diagnosis": "Diagnóstico 3D",
    "In-house lab": "Laboratório próprio",
    "Invisible orthodontics": "Ortodontia invisível",
    "Aesthetic dentistry": "Odontologia estética",
    "Dental City architecture": "Arquitetura Dental City",
    "All specialties": "Todas as especialidades",
    Orthodontics: "Ortodontia",
    "Digital scan": "Escaneamento digital",
    SERVICES: "SERVICOS",
    Treatments: "Tratamentos",
    "Orthodontics, rehabilitation, endodontics, pediatric dentistry, prosthodontics, periodontics.":
        "Ortodontia, reabilitação, endodontia, odontopediatria, prótese e periodontia.",
    "Search service…": "Buscar serviço…",
    "← Previous": "← Anterior",
    "Next →": "Próximo →",
    Page: "Página",
    Schedule: "Agendar",
    "More info": "Mais informações",
    Implants: "Implantes",
    "Fixed and aesthetic replacement of missing teeth.": "Substituição fixa e estética de dentes ausentes.",
    "Dental cleaning": "Limpeza dental",
    "Professional prophylaxis to keep gums and teeth healthy.":
        "Profilaxia profissional para manter gengivas e dentes saudáveis.",
    "Dental crowns": "Coroas dentárias",
    "Strong and natural restoration of damaged teeth.": "Restauração resistente e natural de dentes danificados.",
    "Dental composites": "Resinas dentárias",
    "Aesthetic, conservative tooth-colored restorations.": "Restaurações estéticas e conservadoras na cor do dente.",
    "Maxillofacial surgery": "Cirurgia bucomaxilofacial",
    "Specialized surgical procedures with high precision.": "Procedimentos cirúrgicos especializados com alta precisão.",
    Endodontics: "Endodontia",
    "Root canal treatment to preserve natural teeth.": "Tratamento de canal para preservar dentes naturais.",
    Periodontics: "Periodontia",
    "Comprehensive care of gums and bone support.": "Cuidado integral de gengivas e suporte ósseo.",
    "Occlusal guard": "Placa oclusal",
    "Protection against bruxism and overload relief.": "Proteção contra bruxismo e alívio de sobrecarga.",
    "Oral rehabilitation": "Reabilitação oral",
    "Fixed solutions to replace one or more teeth.": "Soluções fixas para substituir um ou mais dentes.",
    Aligners: "Alinhadores",
    "Removable and discreet orthodontics to align your smile.":
        "Ortodontia removível e discreta para alinhar seu sorriso.",
    "Invisible aligners with digital planning.": "Alinhadores invisíveis com planejamento digital.",
    Braces: "Aparelho fixo",
    "Fixed orthodontics for bite correction and alignment.":
        "Ortodontia fixa para correção da mordida e alinhamento.",
    Whitening: "Clareamento",
    "Safe and effective teeth shade lightening.": "Clareamento dental seguro e eficaz.",
    Veneers: "Facetas",
    "Aesthetic laminates for perfect shape and color.": "Lâminas estéticas para forma e cor perfeitas.",
    "Dental cleaning for children": "Limpeza dental infantil",
    "Friendly and educational pediatric prophylaxis.": "Profilaxia pediátrica amigável e educativa.",
    Sealants: "Selantes",
    "Protection of pits and fissures against cavities.": "Proteção de fóssulas e fissuras contra cáries.",
    Extractions: "Extrações",
    "Simple and wisdom-tooth extractions with a minimally invasive approach.":
        "Extrações simples e de sisos com abordagem minimamente invasiva.",
    Orthopedics: "Ortopedia",
    "Guiding jaw growth in young patients.": "Orientação do crescimento maxilar em pacientes jovens.",
    "Facial harmonization": "Harmonização facial",
    "Aesthetic botox treatment to enhance and balance facial features.":
        "Botox estético para realçar e equilibrar traços faciais.",
    "Smile design": "Design de sorriso",
    "Comprehensive aesthetic plan to achieve a harmonious, personalized smile.":
        "Plano estético completo para um sorriso harmonioso e personalizado.",
    "Biological dentistry": "Odontologia biológica",
    "Holistic approach connecting oral health and overall wellness with biocompatible materials.":
        "Abordagem holística que conecta saúde bucal e bem-estar com materiais biocompatíveis.",
    SERVICE: "SERVIÇO",
    Close: "Fechar",
    "Close modal": "Fechar modal",
    "Schedule via WhatsApp": "Agendar pelo WhatsApp",
    "Full info": "Informações completas",
    GALLERY: "GALERIA",
    "Our facilities": "Nossas instalações",
    "DENTAL CITY": "DENTAL CITY",
    Location: "Localização",
    "Jardín Real · Zapopan": "Jardín Real · Zapopan",
    Units: "Unidades",
    "Technology and comfort": "Tecnologia e conforto",
    Reception: "Recepção",
    "Warmth and hospitality": "Acolhimento e hospitalidade",
    Details: "Detalhes",
    "Design that inspires": "Design que inspira",
    "View demo": "Ver demonstração",
    "Go to slide {{n}}": "Ir ao slide {{n}}",
    "Invisalign demo": "Demonstração Invisalign",
    "Treatment simulation": "Simulação do tratamento",
    "View progress stage by stage.": "Veja o progresso etapa por etapa.",
    "Orthodontics without braces": "Ortodontia sem aparelho",
    "The new orthodontics without brackets.": "A nova ortodontia sem braquetes.",
    "The #1 aligner": "O alinhador nº 1",
    "in the world for bracket-free orthodontic treatments starting at age 8.":
        "do mundo em tratamentos ortodônticos sem braquetes a partir dos 8 anos.",
    "DIGITAL PLAN": "PLANO DIGITAL",
    "3D-guided treatment": "Tratamento guiado em 3D",
    "See the result before starting.": "Veja o resultado antes de começar.",
    "Precise stage-by-stage control": "Controle preciso etapa por etapa",
    "with digital monitoring and personalized adjustments for your smile.":
        "com monitoramento digital e ajustes personalizados para seu sorriso.",
    "COMFORT & AESTHETICS": "CONFORTO E ESTÉTICA",
    "Transparent aligners": "Alinhadores transparentes",
    "Comfortable, removable, and hygienic.": "Confortáveis, removíveis e higiênicos.",
    "Live your day-to-day": "Viva seu dia a dia",
    "without drastic changes in hygiene or eating habits.":
        "sem mudanças drásticas na higiene ou na alimentação.",
    CLINICS: "CLÍNICAS",
    "Our Clinics": "Nossas clínicas",
    WhatsApp: "WhatsApp",
    Phones: "Telefones",
    Hours: "Horários",
    Closed: "Fechado",
    Holidays: "Feriados",
    "Special hours": "Horário especial",
    Address: "Endereço",
    "Follow us": "Siga-nos",
    "Schedule by phone": "Agendar por telefone",
    "View on Maps": "Ver no Maps",
    Copy: "Copiar",
    "Copied ✓": "Copiado ✓",
    "Copy address": "Copiar endereço",
    "Contact Dental City on social media.": "Contate a Dental City nas redes sociais.",
    "Contact Dental City Kids & Family on social media.":
        "Contate a Dental City Kids & Family nas redes sociais.",
    "Map {{name}}": "Mapa {{name}}",
    "Hello, I would like to book an appointment at Dental City.":
        "Olá, gostaria de agendar uma consulta na Dental City.",
    "Hello, I would like to book an appointment at Dental City Kids.":
        "Olá, gostaria de agendar uma consulta na Dental City Kids.",
    FAQ: "FAQ",
    "Frequently Asked Questions": "Perguntas frequentes",
    "Do you treat children?": "Vocês atendem crianças?",
    "Yes, we have pediatric dentistry and a friendly approach for children at Dental City Kids & Family.":
        "Sim, temos odontopediatria e atendimento amigável para crianças na Dental City Kids & Family.",
    "Do you accept credit cards?": "Vocês aceitam cartão de crédito?",
    "Yes, along with payment plans for selected treatments.":
        "Sim, além de planos de pagamento para tratamentos selecionados.",
    "What does the first visit include?": "O que inclui a primeira consulta?",
    "Clinical evaluation, necessary studies, and a personalized plan.":
        "Avaliação clínica, exames necessários e plano personalizado.",
    "Our treatments": "Nossos tratamentos",
    "Our facilities": "Nossas instalações",
    "Our clinics": "Nossas clínicas",
    "Our doctors": "Nossos médicos",
    Resources: "Recursos",
    "Blog & Research": "Blog e pesquisa",
    "Dental City Edu": "Dental City Edu",
    "Job board": "Vagas de emprego",
    Menu: "Menu",
    MENU: "MENU",
    "Open menu": "Abrir menu",
    "Close menu": "Fechar menu",
    "Go to photo {{n}}": "Ir à foto {{n}}",
};

const HI_HOME = {
    "Elegance you can see when you smile": "मुस्कान में झलकती सुंदरता",
    "Cutting-edge digital dentistry, where precision meets comfort and personalized care.":
        "अत्याधुनिक डिजिटल दंत चिकित्सा, जहाँ सटीकता, आराम और व्यक्तिगत देखभाल मिलती है।",
    "Book appointment": "अपॉइंटमेंट बुक करें",
    "View treatments": "उपचार देखें",
    "ABOUT US": "हमारे बारे में",
    "Dental care with design": "डिज़ाइन के साथ दंत देखभाल",
    "Founded by Dr. Linda Argote in 1999, we combine technology and quality so your smile looks and feels better.":
        "1999 में डॉ. लिंडा अर्गोटे द्वारा स्थापित, हम तकनीक और गुणवत्ता को जोड़ते हैं ताकि आपकी मुस्कान बेहतर दिखे और महसूस हो।",
    "Comprehensive dental clinic with all specialties, located in Zapopan, Jalisco. We are a Diamond Invisalign clinic with an in-house lab to create precise, natural, and personalized digital smile designs.":
        "ज़ापोपान, जालिस्को में सभी विशेषताओं वाली संपूर्ण दंत क्लिनिक। हम Invisalign डायमंड क्लिनिक हैं, अपने लैब में सटीक, प्राकृतिक और व्यक्तिगत डिजिटल स्माइल डिज़ाइन बनाते हैं।",
    "all dental specialties": "सभी दंत विशेषताएँ",
    "digital smile designs": "डिजिटल स्माइल डिज़ाइन",
    "3D Diagnosis": "3D निदान",
    "In-house lab": "इन-हाउस लैब",
    "Invisible orthodontics": "अदृश्य ऑर्थोडॉन्टिक्स",
    "Aesthetic dentistry": "सौंदर्य दंत चिकित्सा",
    "Dental City architecture": "Dental City वास्तुकला",
    "All specialties": "सभी विशेषताएँ",
    Orthodontics: "ऑर्थोडॉन्टिक्स",
    "Digital scan": "डिजिटल स्कैन",
    SERVICES: "सेवाएँ",
    Treatments: "उपचार",
    "Orthodontics, rehabilitation, endodontics, pediatric dentistry, prosthodontics, periodontics.":
        "ऑर्थोडॉन्टिक्स, पुनर्वास, एंडोडॉन्टिक्स, बाल दंत, प्रोस्थोडॉन्टिक्स, पेरियोडॉन्टिक्स।",
    "Search service…": "सेवा खोजें…",
    "← Previous": "← पिछला",
    "Next →": "अगला →",
    Page: "पृष्ठ",
    Schedule: "बुक करें",
    "More info": "और जानकारी",
    Implants: "इम्प्लांट",
    "Fixed and aesthetic replacement of missing teeth.": "गायब दाँतों का स्थायी और सौंदर्यपूर्ण प्रतिस्थापन।",
    "Dental cleaning": "दंत सफाई",
    "Professional prophylaxis to keep gums and teeth healthy.":
        "मसूड़ों और दाँतों को स्वस्थ रखने के लिए पेशेवर प्रोफिलैक्सिस।",
    "Dental crowns": "दंत क्राउन",
    "Strong and natural restoration of damaged teeth.": "क्षतिग्रस्त दाँतों की मजबूत और प्राकृतिक बहाली।",
    "Dental composites": "दंत कम्पोजिट",
    "Aesthetic, conservative tooth-colored restorations.": "सौंदर्यपूर्ण, संरक्षणात्मक दाँत के रंग की फिलिंग।",
    "Maxillofacial surgery": "मैक्सिलोफेशियल सर्जरी",
    "Specialized surgical procedures with high precision.": "उच्च सटीकता वाली विशेष सर्जिकल प्रक्रियाएँ।",
    Endodontics: "एंडोडॉन्टिक्स",
    "Root canal treatment to preserve natural teeth.": "प्राकृतिक दाँत बचाने के लिए रूट कैनाल उपचार।",
    Periodontics: "पेरियोडॉन्टिक्स",
    "Comprehensive care of gums and bone support.": "मसूड़ों और हड्डी समर्थन की संपूर्ण देखभाल।",
    "Occlusal guard": "ऑक्लूज़ल गार्ड",
    "Protection against bruxism and overload relief.": "ब्रक्सिज़्म से सुरक्षा और अतिरिक्त दबाव से राहत।",
    "Oral rehabilitation": "मौखिक पुनर्वास",
    "Fixed solutions to replace one or more teeth.": "एक या अधिक दाँत बदलने के स्थायी समाधान।",
    Aligners: "अलाइनर्स",
    "Removable and discreet orthodontics to align your smile.":
        "मुस्कान संरेखित करने के लिए हटाने योग्य और सूक्ष्म ऑर्थोडॉन्टिक्स।",
    "Invisible aligners with digital planning.": "डिजिटल योजना के साथ अदृश्य अलाइनर्स।",
    Braces: "ब्रेसेस",
    "Fixed orthodontics for bite correction and alignment.":
        "काटने और संरेखण के लिए फिक्स्ड ऑर्थोडॉन्टिक्स।",
    Whitening: "व्हाइटनिंग",
    "Safe and effective teeth shade lightening.": "सुरक्षित और प्रभावी दाँतों का रंग हल्का करना।",
    Veneers: "वीनियर्स",
    "Aesthetic laminates for perfect shape and color.": "सही आकार और रंग के लिए सौंदर्य लैमिनेट।",
    "Dental cleaning for children": "बच्चों की दंत सफाई",
    "Friendly and educational pediatric prophylaxis.": "मैत्रीपूर्ण और शैक्षिक बाल प्रोफिलैक्सिस।",
    Sealants: "सीलेंट",
    "Protection of pits and fissures against cavities.": "गड्ढों और दरारों को कैविटी से बचाना।",
    Extractions: "निष्कर्षण",
    "Simple and wisdom-tooth extractions with a minimally invasive approach.":
        "न्यूनतम इनवेसिव दृष्टिकोण से साधारण और अक्ल दाँत निकालना।",
    Orthopedics: "ऑर्थोपेडिक्स",
    "Guiding jaw growth in young patients.": "युवा रोगियों में जबड़े की वृद्धि का मार्गदर्शन।",
    "Facial harmonization": "चेहरे का सामंजस्य",
    "Aesthetic botox treatment to enhance and balance facial features.":
        "चेहरे को संतुलित करने के लिए सौंदर्य बोटॉक्स उपचार।",
    "Smile design": "स्माइल डिज़ाइन",
    "Comprehensive aesthetic plan to achieve a harmonious, personalized smile.":
        "सामंजस्यपूर्ण, व्यक्तिगत मुस्कान के लिए व्यापक सौंदर्य योजना।",
    "Biological dentistry": "जैविक दंत चिकित्सा",
    "Holistic approach connecting oral health and overall wellness with biocompatible materials.":
        "मौखिक स्वास्थ्य और समग्र कल्याण को जोड़ने वाला समग्र दृष्टिकोण, जैव-अनुकूल सामग्री के साथ।",
    SERVICE: "सेवा",
    Close: "बंद करें",
    "Close modal": "मोडल बंद करें",
    "Schedule via WhatsApp": "WhatsApp से बुक करें",
    "Full info": "पूरी जानकारी",
    GALLERY: "गैलरी",
    "Our facilities": "हमारी सुविधाएँ",
    "DENTAL CITY": "DENTAL CITY",
    Location: "स्थान",
    "Jardín Real · Zapopan": "Jardín Real · Zapopan",
    Units: "यूनिट",
    "Technology and comfort": "तकनीक और आराम",
    Reception: "रिसेप्शन",
    "Warmth and hospitality": "गर्मजोशी और आतिथ्य",
    Details: "विवरण",
    "Design that inspires": "प्रेरणादायक डिज़ाइन",
    "View demo": "डेमो देखें",
    "Go to slide {{n}}": "स्लाइड {{n}} पर जाएँ",
    "Invisalign demo": "Invisalign डेमो",
    "Treatment simulation": "उपचार सिमुलेशन",
    "View progress stage by stage.": "चरण दर चरण प्रगति देखें।",
    "Orthodontics without braces": "ब्रेस के बिना ऑर्थोडॉन्टिक्स",
    "The new orthodontics without brackets.": "ब्रैकेट के बिना नई ऑर्थोडॉन्टिक्स।",
    "The #1 aligner": "दुनिया का #1 अलाइनर",
    "in the world for bracket-free orthodontic treatments starting at age 8.":
        "8 वर्ष से ब्रैकेट-मुक्त ऑर्थोडॉन्टिक उपचार के लिए।",
    "DIGITAL PLAN": "डिजिटल योजना",
    "3D-guided treatment": "3D-निर्देशित उपचार",
    "See the result before starting.": "शुरू करने से पहले परिणाम देखें।",
    "Precise stage-by-stage control": "चरणबद्ध सटीक नियंत्रण",
    "with digital monitoring and personalized adjustments for your smile.":
        "डिजिटल निगरानी और व्यक्तिगत समायोजन के साथ।",
    "COMFORT & AESTHETICS": "आराम और सौंदर्य",
    "Transparent aligners": "पारदर्शी अलाइनर्स",
    "Comfortable, removable, and hygienic.": "आरामदायक, हटाने योग्य और स्वच्छ।",
    "Live your day-to-day": "अपना दैनिक जीवन जिएँ",
    "without drastic changes in hygiene or eating habits.":
        "स्वच्छता या खाने की आदतों में बड़े बदलाव के बिना।",
    CLINICS: "क्लिनिक",
    "Our Clinics": "हमारी क्लिनिक",
    WhatsApp: "WhatsApp",
    Phones: "फ़ोन",
    Hours: "समय",
    Closed: "बंद",
    Holidays: "छुट्टियाँ",
    "Special hours": "विशेष समय",
    Address: "पता",
    "Follow us": "हमें फॉलो करें",
    "Schedule by phone": "फ़ोन से बुक करें",
    "View on Maps": "Maps पर देखें",
    Copy: "कॉपी करें",
    "Copied ✓": "कॉपी हो गया ✓",
    "Copy address": "पता कॉपी करें",
    "Contact Dental City on social media.": "सोशल मीडिया पर Dental City से संपर्क करें।",
    "Contact Dental City Kids & Family on social media.":
        "सोशल मीडिया पर Dental City Kids & Family से संपर्क करें।",
    "Map {{name}}": "मानचित्र {{name}}",
    "Hello, I would like to book an appointment at Dental City.":
        "नमस्ते, मैं Dental City में अपॉइंटमेंट बुक करना चाहता/चाहती हूँ।",
    "Hello, I would like to book an appointment at Dental City Kids.":
        "नमस्ते, मैं Dental City Kids में अपॉइंटमेंट बुक करना चाहता/चाहती हूँ।",
    FAQ: "FAQ",
    "Frequently Asked Questions": "अक्सर पूछे जाने वाले प्रश्न",
    "Do you treat children?": "क्या आप बच्चों का इलाज करते हैं?",
    "Yes, we have pediatric dentistry and a friendly approach for children at Dental City Kids & Family.":
        "हाँ, Dental City Kids & Family में बाल दंत चिकित्सा और बच्चों के लिए मैत्रीपूर्ण दृष्टिकोण है।",
    "Do you accept credit cards?": "क्या आप क्रेडिट कार्ड स्वीकार करते हैं?",
    "Yes, along with payment plans for selected treatments.":
        "हाँ, चुने हुए उपचारों के लिए भुगतान योजनाएँ भी उपलब्ध हैं।",
    "What does the first visit include?": "पहली विज़िट में क्या शामिल है?",
    "Clinical evaluation, necessary studies, and a personalized plan.":
        "क्लिनिकल मूल्यांकन, आवश्यक जाँच और व्यक्तिगत योजना।",
    "Our treatments": "हमारे उपचार",
    "Our facilities": "हमारी सुविधाएँ",
    "Our clinics": "हमारी क्लिनिक",
    "Our doctors": "हमारे डॉक्टर",
    Resources: "संसाधन",
    "Blog & Research": "ब्लॉग और अनुसंधान",
    "Dental City Edu": "Dental City Edu",
    "Job board": "नौकरी बोर्ड",
    Menu: "मेनू",
    MENU: "मेनू",
    "Open menu": "मेनू खोलें",
    "Close menu": "मेनू बंद करें",
    "Go to photo {{n}}": "फ़ोटो {{n}} पर जाएँ",
};

const enHome = readJson("src/locales/en/home.json");
const enDoctors = readJson("src/locales/en/translation.json");

const ptMap = { ...PT, ...PT_HOME, ...PT_SERVICE_MODAL };
const hiMap = { ...HI, ...HI_HOME, ...HI_SERVICE_MODAL };

function collectStrings(obj, bag = []) {
    if (typeof obj === "string") bag.push(obj);
    else if (Array.isArray(obj)) obj.forEach((v) => collectStrings(v, bag));
    else if (obj && typeof obj === "object") Object.values(obj).forEach((v) => collectStrings(v, bag));
    return bag;
}

function countStillEnglish(enObj, outObj) {
    const enUnique = [...new Set(collectStrings(enObj))];
    const outSet = new Set(collectStrings(outObj));
    return enUnique.filter((s) => outSet.has(s)).length;
}

const ptHome = mapStrings(enHome, ptMap);
const hiHome = mapStrings(enHome, hiMap);

writeJson("src/locales/pt/translation.json", mapStrings(enDoctors, ptMap));
writeJson("src/locales/hi/translation.json", mapStrings(enDoctors, hiMap));
writeJson("src/locales/pt/home.json", ptHome);
writeJson("src/locales/hi/home.json", hiHome);

const ptLeft = countStillEnglish(enHome, ptHome);
const hiLeft = countStillEnglish(enHome, hiHome);
console.log(`Generated pt/hi locale files. Remaining English strings — pt: ${ptLeft}, hi: ${hiLeft}`);
if (ptLeft > 0 || hiLeft > 0) {
    const enUnique = [...new Set(collectStrings(enHome))];
    const outPt = new Set(collectStrings(ptHome));
    enUnique.filter((s) => outPt.has(s)).forEach((s) => console.log("  pt:", s.slice(0, 80)));
}
