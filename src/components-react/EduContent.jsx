import React, { useMemo, useState } from "react";
import TopBar from "./TopBar.jsx";
import Footer from "./Footer.jsx";

/**
 * DentalCity – Quizzes (solo quiz, sin mini-juego)
 * - Misma UI y flujo.
 * - Nuevos temas solicitados.
 */


const QUIZZES = {
    // --- Temas que ya estaban ---
    "Ortodoncia básica": [
        {
            q: "¿Para qué sirven los brackets?",
            a: [
                "Para blanquear los dientes",
                "Para alinear los dientes y corregir la mordida",
                "Para reemplazar dientes perdidos",
                "Para proteger contra caries",
            ],
            i: 1,
            ex: "Aplican fuerzas controladas para mover dientes a posiciones funcionales y estéticas.",
        },
        {
            q: "¿Cuánto dura en promedio un tratamiento con brackets?",
            a: ["1–4 semanas", "6–24 meses (según caso)", "5–10 años", "Siempre igual: 12 meses"],
            i: 1,
            ex: "Depende de complejidad, cooperación y aparatología.",
        },
        {
            q: "¿Qué hacer si se despega un bracket?",
            a: ["Arrancarlos todos", "Esperar meses", "Agendar cita lo antes posible", "Pegarlo con pegamento escolar"],
            i: 2,
            ex: "Debe recolocarlo el odontólogo para no retrasar el tratamiento.",
        },
        {
            q: "¿Qué alimentos conviene evitar con brackets?",
            a: ["Chicles y dulces pegajosos", "Sopas", "Pescado", "Yogurt"],
            i: 0,
            ex: "Pegajosos o muy duros pueden despegar brackets o doblar arcos.",
        },
    ],

    "Higiene con brackets": [
        {
            q: "La mejor rutina diaria con brackets incluye:",
            a: [
                "Cepillar solo por la mañana",
                "Evitar hilo dental",
                "Cepillado tras cada comida + hilo/irrigador",
                "Enjuague únicamente",
            ],
            i: 2,
            ex: "La higiene meticulosa previene manchas, caries y gingivitis.",
        },
        {
            q: "¿Qué cepillo ayuda alrededor del bracket?",
            a: ["Cepillo interdental (proxabrush)", "Cepillo de ropa", "Brocha de maquillaje", "Objeto puntiagudo"],
            i: 0,
            ex: "Permite limpiar entre alambre y bracket sin dañarlos.",
        },
        {
            q: "¿Cuánto flúor debe tener una pasta de dientes para adultos normalmente?",
            a: ["0 ppm", "≈ 500 ppm", "≈ 1450 ppm", "≈ 3000 ppm siempre"],
            i: 2,
            ex: "≈1450 ppm F es el estándar; mayores dosis solo por indicación.",
        },
        {
            q: "Señal de higiene insuficiente con brackets:",
            a: ["Encías enrojecidas e inflamadas", "Dientes transparentes", "Lengua adormecida", "Cansancio general"],
            i: 0,
            ex: "La gingivitis por placa es frecuente si la higiene es deficiente.",
        },
    ],

    "Caries y prevención": [
        {
            q: "La caries dental se debe principalmente a:",
            a: ["Deficiencia de calcio", "Bacterias + azúcares + tiempo", "Falta de sol", "Agua fría"],
            i: 1,
            ex: "Los ácidos bacterianos desmineralizan el esmalte.",
        },
        {
            q: "Medida efectiva para reducir caries en población:",
            a: ["Beber solo jugos", "Agua fluorada/fluoruración", "Cepillarse semanal", "Evitar frutas"],
            i: 1,
            ex: "El flúor sistémico y tópico reduce incidencia y severidad.",
        },
        {
            q: "¿Qué snack es menos cariogénico si no puedes cepillarte?",
            a: ["Galletas pegajosas", "Caramelos suaves", "Queso o nueces", "Dulces masticables"],
            i: 2,
            ex: "Tienden a ser menos cariogénicos y favorecen el pH.",
        },
        {
            q: "Selladores de fosas y fisuras se recomiendan especialmente en:",
            a: ["Incisivos inferiores", "Molares permanentes con surcos profundos", "Caninos superiores", "Todos por igual"],
            i: 1,
            ex: "Los molares con fisuras profundas retienen placa.",
        },
    ],

    "Emergencias dentales": [
        {
            q: "Si se avulsiona (sale completo) un diente permanente:",
            a: [
                "No tocarlo",
                "Reimplantar o conservar en leche/solución y acudir urgente",
                "Guardar seco en una bolsa",
                "Lavar con jabón y frotar",
            ],
            i: 1,
            ex: "Tiempo y medio húmedo biocompatible son críticos.",
        },
        {
            q: "Dolor intenso al morder y sensibilidad al frío súbita puede indicar:",
            a: ["Fisura o pulpitis", "Cansancio", "Aftas", "Nada importante"],
            i: 0,
            ex: "La clínica orienta; el diagnóstico lo confirma el profesional.",
        },
        {
            q: "En caso de absceso con fiebre:",
            a: ["Antibióticos al azar", "Aplicar calor intenso", "Acudir a urgencias cuanto antes", "Explotarlo en casa"],
            i: 2,
            ex: "Requiere drenaje y manejo profesional.",
        },
    ],

    "Salud bucal general": [
        {
            q: "Frecuencia mínima recomendada de visitas al dentista en adultos sanos:",
            a: ["Cada 5 años", "Anual o según riesgo individual", "Mensual siempre", "Solo si hay dolor"],
            i: 1,
            ex: "El intervalo se personaliza según riesgo de caries/periodontal.",
        },
        {
            q: "Principal causa de halitosis persistente:",
            a: ["Problemas gástricos siempre", "Lengua saburral y placa bacteriana", "Alimentos picantes", "Labios secos"],
            i: 1,
            ex: "Limpieza lingual y control de placa suelen mejorarla.",
        },
        {
            q: "Uso correcto del hilo dental:",
            a: ["Antes o después del cepillado, pero diario", "Solo si hay comida", "Nunca es necesario", "Una vez al mes"],
            i: 0,
            ex: "Rompe la biopelícula en zonas inaccesibles al cepillo.",
        },
        {
            q: "¿Qué bebida es menos erosiva para el esmalte?",
            a: ["Refrescos ácidos", "Agua natural", "Bebidas energéticas", "Jugos cítricos"],
            i: 1,
            ex: "El agua es neutra; las ácidas favorecen erosión si son frecuentes.",
        },
    ],

    // --- (Opcional) los 3 que pediste antes ---
    "Implantes": [
        {
            q: "La oseointegración es:",
            a: [
                "Un relleno temporal",
                "Unión directa hueso–implante sin tejido fibroso",
                "Un tipo de prótesis removible",
                "Sinónimo de injerto óseo",
            ],
            i: 1,
            ex: "Base biológica del éxito de los implantes.",
        },
        {
            q: "Contraindicación relativa para implantes:",
            a: ["Paciente fumador pesado sin control", "Higiene adecuada", "Hueso suficiente", "Edad adulta"],
            i: 0,
            ex: "El tabaquismo pesado aumenta el riesgo de fracaso.",
        },
        {
            q: "Prueba de estabilidad primaria al colocar el implante:",
            a: ["Percusión sonora", "Torque de inserción/ISQ", "Color de encía", "Sensibilidad al frío"],
            i: 1,
            ex: "El torque/ISQ orienta sobre carga inmediata o diferida.",
        },
        {
            q: "Material de implantes más común:",
            a: ["Titanio y sus aleaciones", "Acero al carbono", "Oro puro", "Cromo-níquel sin titanio"],
            i: 0,
            ex: "Biocompatible y con alta resistencia a la corrosión.",
        },
    ],

    "Periodoncia": [
        {
            q: "La periodontitis se caracteriza por:",
            a: [
                "Inflamación sin pérdida de inserción",
                "Pérdida de inserción clínica y ósea",
                "Solo sangrado al sondaje sin bolsas",
                "Movilidad por caries",
            ],
            i: 1,
            ex: "Hay destrucción del soporte periodontal.",
        },
        {
            q: "Herramienta diagnóstica clave:",
            a: ["Sonda periodontal", "Termómetro", "Diastema", "Lupa"],
            i: 0,
            ex: "Permite medir profundidad de bolsa y sangrado.",
        },
        {
            q: "Tratamiento inicial estándar:",
            a: ["Curetaje/raspado y alisado radicular + control de placa", "Antibióticos solos", "Enjuague sin más", "Extracción inmediata"],
            i: 0,
            ex: "La terapia mecánica y hábitos son la base.",
        },
        {
            q: "Factor de riesgo mayor:",
            a: ["Consumo de agua", "Tabaquismo", "Dormir tarde", "Frío"],
            i: 1,
            ex: "El tabaco agrava severidad y empeora pronóstico.",
        },
    ],

    "Odontopediatría": [
        {
            q: "La caries de la primera infancia se asocia a:",
            a: ["Biberón nocturno con líquidos azucarados", "Agua simple", "Verduras", "Salados"],
            i: 0,
            ex: "La exposición nocturna y azúcares fermentables aumentan riesgo.",
        },
        {
            q: "Aplicación tópica frecuente en niños de riesgo:",
            a: ["Barniz de flúor", "Peróxido de carbamida", "Amalgama", "Cobalto"],
            i: 0,
            ex: "El barniz reduce caries en grupos de alto riesgo.",
        },
        {
            q: "¿Cuándo iniciar cepillado con pasta fluorada?",
            a: ["Desde el primer diente, cantidad ‘grano de arroz’", "A los 6 años", "Solo con agua", "En adolescencia"],
            i: 0,
            ex: "Usar cantidades adecuadas según edad.",
        },
        {
            q: "Hábitos orales dañinos frecuentes:",
            a: ["Chupar dedo/chupón prolongado", "Masticar verduras", "Beber agua", "Dormir"],
            i: 0,
            ex: "Pueden alterar crecimiento maxilofacial y oclusión.",
        },
    ],

    // --- NUEVOS TEMAS SOLICITADOS ---
    "Blanqueamiento dental": [
        {
            q: "Candidato típico para blanqueamiento ambulatorio:",
            a: [
                "Embarazo/lactancia",
                "Manchas extrínsecas leves y buena salud periodontal",
                "Niños < 12 años",
                "Caries activas sin tratar",
            ],
            i: 1,
            ex: "Primero se tratan caries y encías; luego se blanquea.",
        },
        {
            q: "Agentes activos más comunes:",
            a: [
                "Peróxido de hidrógeno/carbamida",
                "Cloruro de sodio",
                "Ácido cítrico puro",
                "Bicarbonato sin más",
            ],
            i: 0,
            ex: "Los peróxidos liberan radicales que aclaran pigmentos.",
        },
        {
            q: "Efecto adverso más frecuente:",
            a: [
                "Necrosis pulpar generalizada",
                "Sensibilidad transitoria e irritación gingival leve",
                "Fractura coronaria",
                "Recesión inmediata",
            ],
            i: 1,
            ex: "Suele resolverse suspendiendo o espaciando aplicaciones.",
        },
        {
            q: "Tras el blanqueamiento se recomienda evitar:",
            a: [
                "Bebidas pigmentantes/ácidas 24–48 h",
                "Agua natural",
                "Leche",
                "Dormir",
            ],
            i: 0,
            ex: "Café, vino tinto, té y salsas oscuras tiñen con facilidad.",
        },
    ],

    "Anatomía dental simple": [
        {
            q: "Función principal de los incisivos:",
            a: ["Triturar", "Cortar", "Perforar hueso", "Pulir"],
            i: 1,
            ex: "Borde incisal afilado para cortar alimentos.",
        },
        {
            q: "Estructura más mineralizada del cuerpo humano:",
            a: ["Dentina", "Cemento", "Esmalte", "Pulpa"],
            i: 2,
            ex: "El esmalte tiene ≈96% de minerales.",
        },
        {
            q: "Afirmación correcta sobre raíces:",
            a: [
                "Molares superiores suelen tener 3 raíces",
                "Incisivos inferiores tienen 2 raíces siempre",
                "Caninos superiores tienen 3 raíces",
                "Todos los premolares tienen 3 raíces",
            ],
            i: 0,
            ex: "Molares inferiores comúnmente 2; variaciones existen.",
        },
        {
            q: "Primer molar permanente erupciona aproximadamente a:",
            a: ["3 años", "6 años", "9 años", "12 años"],
            i: 1,
            ex: "Suele erupcionar alrededor de los 6 años.",
        },
    ],

    "Primer visita al odontopediatra": [
        {
            q: "Edad ideal para la primera visita:",
            a: [
                "A los 12 años",
                "Cuando erupciona el primer diente o antes de los 12 meses",
                "Solo si hay dolor",
                "En la adolescencia",
            ],
            i: 1,
            ex: "Se evalúa riesgo y se orienta a la familia desde el inicio.",
        },
        {
            q: "Consejería clave en la primera visita:",
            a: [
                "Uso de biberón nocturno con jugos",
                "Técnica de higiene y dieta sin azúcares libres",
                "Tatuajes dentales",
                "Piercings orales",
            ],
            i: 1,
            ex: "Hábitos saludables desde edades tempranas.",
        },
        {
            q: "Técnica de manejo conductual común:",
            a: ["Sedación profunda de rutina", "Decir-mostrar-hacer", "Sujeción forzada", "Ninguna"],
            i: 1,
            ex: "Explicación, demostración y realización para reducir ansiedad.",
        },
        {
            q: "Riesgo alto de caries en bebés:",
            a: [
                "Biberón nocturno con líquidos azucarados",
                "Agua simple",
                "Verduras",
                "Queso",
            ],
            i: 0,
            ex: "La exposición nocturna favorece la desmineralización.",
        },
    ],

    "Odontología digital y CAD/CAM": [
        {
            q: "¿Qué significan las siglas CAD/CAM?",
            a: [
                "Diseño y fabricación asistidos por computadora",
                "Cirugía avanzada digital",
                "Caries avanzada dentinaria",
                "Copia y duplicado manual",
            ],
            i: 0,
            ex: "Computer-Aided Design / Computer-Aided Manufacturing.",
        },
        {
            q: "Ventaja del escaneo intraoral respecto a impresiones convencionales:",
            a: [
                "Más confort y flujo digital directo",
                "Siempre menos preciso",
                "Impide restauraciones estéticas",
                "No genera archivos",
            ],
            i: 0,
            ex: "Permite diseño y fresado/impresión desde archivo STL/PLY.",
        },
        {
            q: "Materiales frecuentes en restauraciones CAD/CAM:",
            a: [
                "Disilicato de litio y zirconia",
                "Madera y yeso",
                "Plástico doméstico",
                "Hierro puro",
            ],
            i: 0,
            ex: "Alta estética y resistencia; indicaciones según caso.",
        },
        {
            q: "Beneficio clínico del flujo digital completo:",
            a: [
                "Coronas en una sola visita en casos seleccionados",
                "Prohibición de provisionales",
                "Elimina la necesidad de ajuste oclusal siempre",
                "No requiere entrenamiento",
            ],
            i: 0,
            ex: "Desde el escaneo al fresado/horneado chairside.",
        },
    ],

    "Radiología dental básica": [
        {
            q: "Las bitewings (aletas) son ideales para:",
            a: [
                "Caries interproximales y nivel óseo alveolar",
                "Evaluar senos maxilares",
                "Trauma mandibular severo",
                "Diagnóstico de ATM",
            ],
            i: 0,
            ex: "Excelente para caries proximales y cresta ósea.",
        },
        {
            q: "La panorámica (ortopantomografía) ofrece:",
            a: [
                "Visión general de maxilares y dientes",
                "Mejor detalle para caries incipiente",
                "Solo tejidos blandos",
                "Dosis igual a TC",
            ],
            i: 0,
            ex: "No sustituye periapical/bitewing para caries inicial.",
        },
        {
            q: "Principio ALARA significa:",
            a: [
                "Reducir dosis ‘tan baja como sea razonablemente alcanzable’",
                "Tomar la mayor cantidad de radiografías",
                "Usar cualquier equipo sin colimación",
                "No usar protección",
            ],
            i: 0,
            ex: "Optimización, justificación y limitación de dosis.",
        },
        {
            q: "Indicación típica de periapical:",
            a: [
                "Evaluar ápices y endodoncia",
                "Medición de estatura",
                "Fotografía intraoral",
                "Evaluar caries proximales exclusivas",
            ],
            i: 0,
            ex: "Detalle de ápice radicular, lesiones periapicales y conducto.",
        },
    ],

    "Instrumental odontológico básico": [
        {
            q: "Trío de exploración clínica básica:",
            a: [
                "Espejo, explorador y pinza algodonera",
                "Cincel, martillo y tenazas",
                "Tornillo, tuerca y llave",
                "Alicate de joyería",
            ],
            i: 0,
            ex: "Inspección, tacto y manipulación de materiales/algodón.",
        },
        {
            q: "La sonda periodontal sirve para:",
            a: [
                "Medir profundidad de bolsa y registrar sangrado",
                "Pulir resinas",
                "Cortar esmalte",
                "Aspirar saliva",
            ],
            i: 0,
            ex: "Básica en diagnóstico periodontal.",
        },
        {
            q: "La turbina de alta velocidad se usa principalmente para:",
            a: [
                "Corte de esmalte y preparación cavitaria",
                "Tomar radiografías",
                "Sellar fisuras",
                "Cementar coronas",
            ],
            i: 0,
            ex: "Usa fresas de diamante/carburo a alta RPM.",
        },
        {
            q: "Instrumental para destartraje supra/subgingival:",
            a: ["Curetas y raspadores", "Espátulas de resina", "Algodonera", "Sierra"],
            i: 0,
            ex: "Retiran cálculo y alisan superficies radiculares.",
        },
    ],

    "Materiales dentales": [
        {
            q: "Propiedad del ionómero de vidrio:",
            a: [
                "No se adhiere a la dentina",
                "Libera flúor y se adhiere químicamente",
                "Siempre es foto-curado",
                "Se usa solo en coronas metal-porcelana",
            ],
            i: 1,
            ex: "Útil en restauraciones cervicales y cementación selecta.",
        },
        {
            q: "La resina compuesta requiere normalmente:",
            a: [
                "Grabado ácido y adhesivo",
                "Solo agua",
                "Mezcla con mercurio",
                "Curado térmico en horno",
            ],
            i: 0,
            ex: "El grabado aumenta energía superficial para micromecánica.",
        },
        {
            q: "La amalgama dental es:",
            a: [
                "Aleación con mercurio de alta durabilidad",
                "Un plástico biodegradable",
                "Puro titanio",
                "Yeso reforzado",
            ],
            i: 0,
            ex: "Muy resistente; su uso varía por regulaciones y preferencias.",
        },
        {
            q: "Cemento frecuentemente usado para provisionales:",
            a: ["Óxido de zinc-eugenol", "Concreto", "Silicona industrial", "Epoxi estructural"],
            i: 0,
            ex: "Analgesia local y sellado temporal adecuados.",
        },
    ],
    "Estética dental y carillas": [
        {
            q: "¿Cuál es la función principal de las carillas dentales?",
            a: [
                "Blanquear químicamente los dientes",
                "Modificar forma, color y tamaño para mejorar la sonrisa",
                "Reemplazar dientes perdidos",
                "Reforzar dientes con caries profundas",
            ],
            i: 1,
            ex: "Las carillas son láminas delgadas que corrigen estética y armonía dental.",
        },
        {
            q: "¿De qué materiales suelen fabricarse las carillas?",
            a: [
                "Porcelana y resina compuesta",
                "Metal y amalgama",
                "Vidrio y acrílico industrial",
                "Silicona quirúrgica",
            ],
            i: 0,
            ex: "La porcelana ofrece alta estética y durabilidad; la resina es más económica y reparable.",
        },
        {
            q: "¿Qué tipo de carillas requieren mínima o nula reducción del esmalte?",
            a: [
                "Carillas ultrafinas o de tipo ‘no prep’",
                "Carillas metálicas",
                "Coronas totales",
                "Carillas de composite convencionales",
            ],
            i: 0,
            ex: "Las ‘no prep’ se adhieren directamente sin tallado agresivo, conservando estructura dental.",
        },
        {
            q: "¿Cuál de los siguientes hábitos puede dañar las carillas?",
            a: [
                "Morder objetos duros (lápices, hielo)",
                "Beber agua fría",
                "Usar hilo dental correctamente",
                "Limpieza profesional periódica",
            ],
            i: 0,
            ex: "Las fuerzas excesivas pueden fracturar o despegar las carillas, especialmente de resina.",
        },
    ],

};

const TOPICS = Object.keys(QUIZZES);

const Progress = ({ value }) => (
    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b] transition-all" style={{ width: `${value}%` }} />
    </div>
);


export default function DentalCityQuizzes() {
    const [topic, setTopic] = useState(TOPICS[0]);
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState([]);
    const quizData = QUIZZES[topic];

    const quizScore = useMemo(() => {
        let ok = 0;
        quizData.forEach((q, i) => {
            if (answers[i] === q.i) ok++;
        });
        return Math.round((ok / quizData.length) * 100);
    }, [answers, quizData]);

    const onAnswer = (i) => {
        if (step >= quizData.length) return;
        setAnswers((arr) => {
            const next = [...arr];
            next[step] = i;
            return next;
        });
    };

    const nextStep = () => setStep((s) => Math.min(s + 1, quizData.length));
    const prevStep = () => setStep((s) => Math.max(s - 1, 0));

    const changeTopic = (t) => {
        setTopic(t);
        setStep(0);
        setAnswers([]);
        setTimeout(() => {
            document.getElementById("quizTop")?.scrollIntoView({ behavior: "smooth" });
        }, 50);
    };

    return (
        <>
            <TopBar />

            <div className="w-full min-h-screen bg-[#0f2237] text-white py-10 px-4 sm:px-6 lg:px-8">

                <div className="mx-auto max-w-5xl">
                    <header className="mb-8">
                        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-center">
                            <span className="golden-sweep">Quizzes de Salud Dental</span>
                        </h1>
                        <p className="text-center text-white/80 mt-2">
                            Elige un tema y responde. Al final verás tu puntaje y recomendaciones.
                        </p>
                    </header>

                    {/* Selector de temas */}
                    <section className="rounded-3xl bg-white/[.04] border border-white/10 p-5 sm:p-8 shadow-[0_18px_50px_rgba(0,0,0,.35)]">
                        <h2 className="text-xl font-semibold mb-4 text-[#e4b892]">Temas</h2>
                        <div
                            className="
                grid 
                grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 
                gap-3 sm:gap-4 
                place-items-stretch
              "
                        >
                            {TOPICS.map((t) => {
                                const active = t === topic;
                                return (
                                    <button
                                        key={t}
                                        onClick={() => changeTopic(t)}
                                        className={[
                                            "flex items-center justify-center text-center",
                                            "h-20 sm:h-24 px-3 sm:px-4 py-2 rounded-2xl border font-medium transition-all",
                                            active
                                                ? "bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b] text-[#0f2237] font-semibold border-[#e4b892] shadow-[0_8px_30px_rgba(228,184,146,.35)] scale-105"
                                                : "bg-[#0f2237]/90 border-white/10 hover:bg-white/5 hover:border-[#e4b89233] hover:scale-105",
                                        ].join(" ")}
                                    >
                                        <span className="text-sm sm:text-base">{t}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </section>

                    {/* Quiz */}
                    <section
                        id="quizSection"
                        className="mt-10 rounded-3xl bg-white/[.04] border border-white/10 p-5 sm:p-8 shadow-[0_18px_50px_rgba(0,0,0,.35)]"
                    >
                        <div id="quizTop" className="flex items-center gap-3 mb-6">
                            <h2 className="text-xl font-semibold text-[#e4b892]">{topic}</h2>
                            <div className="ml-auto w-40">
                                <Progress value={(step / quizData.length) * 100} />
                            </div>
                        </div>

                        {step < quizData.length ? (
                            <div className="space-y-6">
                                <div>
                                    <div className="text-sm text-white/70">
                                        Pregunta {step + 1} de {quizData.length}
                                    </div>
                                    <p className="text-lg font-semibold mt-1 text-white/90">{quizData[step].q}</p>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-3">
                                    {quizData[step].a.map((opt, i) => {
                                        const selected = answers[step] === i;
                                        return (
                                            <button
                                                key={i}
                                                onClick={() => onAnswer(i)}
                                                className={[
                                                    "text-left p-4 rounded-2xl border transition-all",
                                                    selected
                                                        ? "bg-[#0f2237]/80 border-[#e4b89266] shadow-[0_4px_20px_rgba(228,184,146,.15)]"
                                                        : "bg-[#0f2237]/60 border-white/10 hover:bg-[#0f2237]/80 hover:border-[#e4b89233]",
                                                ].join(" ")}
                                            >
                                                <span className="font-medium text-white/90">{opt}</span>
                                            </button>
                                        );
                                    })}
                                </div>

                                <div className="flex items-center gap-3 pt-1">
                                    <button
                                        onClick={prevStep}
                                        disabled={step === 0}
                                        className="px-4 py-2 rounded-2xl bg-[#0f2237]/80 border border-white/10 disabled:opacity-40 hover:bg-white/5 transition"
                                    >
                                        Atrás
                                    </button>
                                    <button
                                        onClick={nextStep}
                                        className="px-5 py-2 rounded-2xl bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b] text-[#0f2237] font-semibold hover:brightness-110 transition shadow-[0_4px_20px_rgba(228,184,146,.25)]"
                                    >
                                        Siguiente
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div className="text-center">
                                    <div className="text-3xl font-semibold mb-2">
                                        <span className="golden-sweep">¡Resultados!</span>
                                    </div>
                                    <div className="flex flex-wrap items-center justify-center gap-3">
                                        <div className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b] p-[1.5px] shadow-[0_8px_30px_rgba(228,184,146,.35)]">
                                            <div className="rounded-2xl bg-[#0f2237]/90 px-5 py-3">
                                                Quiz ({topic}): <span className="font-semibold text-[#e4b892]">{quizScore}%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Mostrar respuestas correctas e incorrectas */}
                                <div className="space-y-4 mt-8">
                                    <h3 className="text-xl font-semibold text-[#e4b892] mb-4">Revisión de respuestas:</h3>
                                    {quizData.map((q, qIdx) => {
                                        const userAnswer = answers[qIdx];
                                        const isCorrect = userAnswer === q.i;
                                        return (
                                            <div key={qIdx} className="rounded-2xl border p-4 bg-[#0f2237]/60">
                                                <div className="flex items-start gap-3 mb-3">
                                                    <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold ${
                                                        isCorrect 
                                                            ? "bg-green-500/20 text-green-400 border border-green-500/40" 
                                                            : "bg-red-500/20 text-red-400 border border-red-500/40"
                                                    }`}>
                                                        {isCorrect ? "✓" : "✗"}
                                                    </span>
                                                    <p className="font-medium text-white/90 flex-1">{q.q}</p>
                                                </div>
                                                <div className="ml-9 space-y-2">
                                                    {q.a.map((opt, optIdx) => {
                                                        const isUserChoice = userAnswer === optIdx;
                                                        const isCorrectAnswer = q.i === optIdx;
                                                        return (
                                                            <div
                                                                key={optIdx}
                                                                className={`p-3 rounded-xl border text-sm ${
                                                                    isCorrectAnswer
                                                                        ? "bg-green-500/10 border-green-500/40 text-green-300"
                                                                        : isUserChoice && !isCorrectAnswer
                                                                        ? "bg-red-500/10 border-red-500/40 text-red-300"
                                                                        : "bg-white/5 border-white/10 text-white/60"
                                                                }`}
                                                            >
                                                                {opt}
                                                                {isCorrectAnswer && <span className="ml-2 text-xs">✓ Correcta</span>}
                                                                {isUserChoice && !isCorrectAnswer && <span className="ml-2 text-xs">Tu respuesta</span>}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                                <div className="mt-3 ml-9 p-3 rounded-xl bg-white/5 border border-white/10">
                                                    <p className="text-xs text-white/70 italic">{q.ex}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <p className="text-white/80 max-w-2xl mx-auto text-center mt-8">
                                    ¿Te gustaría una evaluación profesional? Nuestro equipo de odontología puede
                                    revisar tu caso y ofrecerte opciones personalizadas.
                                </p>

                                <div className="flex items-center justify-center gap-3 pt-4">
                                    <a
                                        href="/#ubicacion"
                                        className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b] text-[#0f2237] font-semibold shadow-[0_4px_20px_rgba(228,184,146,.25)] hover:brightness-110 transition"
                                    >
                                        Agendar cita
                                    </a>
                                    <button
                                        onClick={() => {
                                            setStep(0);
                                            setAnswers([]);
                                        }}
                                        className="px-6 py-3 rounded-2xl bg-[#0f2237]/80 border border-white/10 hover:bg-white/5 transition"
                                    >
                                        Rehacer quiz
                                    </button>
                                </div>
                            </div>
                        )}
                    </section>
                </div>
            </div>

            <Footer />

            <style>{`
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .golden-sweep {
          color: transparent;
          background-image: linear-gradient(90deg,#c89b7b 0%,#e4b892 20%,#f4d3b3 35%,#e4b892 60%,#c89b7b 100%);
          background-size: 250% 100%;
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 4s linear infinite;
          display: inline-block;
        }
      `}</style>
        </>
    );
    
}
