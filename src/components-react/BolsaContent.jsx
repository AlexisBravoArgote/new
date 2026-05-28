// src/components-react/BolsaContent.jsx
import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TopBar from "./TopBar.jsx";
import Footer from "./Footer.jsx";
const __MOTION_USED = Boolean(motion); // eslint-disable-line no-unused-vars
function Container({ children, className = "" }) {
    return (
        <div className={`mx-auto w-full max-w-6xl px-6 md:px-8 ${className}`}>
            {children}
        </div>
    );
}

const MAIL = "alexisbravo.mx@gmail.com";
const MAILTO = (puesto) =>
    `mailto:${MAIL}?subject=${encodeURIComponent(
        `Postulación — ${puesto}`
    )}&body=${encodeURIComponent(
        "Hola, adjunto mi CV para su consideración.\n\nNombre:\nTeléfono:\nPuesto al que postulo:\nDisponibilidad:\nPortafolio / Redes (si aplica):\n\n¡Gracias!"
    )}`;

export default function Bolsa() {
    const puestos = useMemo(
        () => [
            {
                key: "ortodoncia",
                title: "Ortodoncista",
                tipo: "Tiempo completo",
                modalidad: "Presencial",
                sueldo: "Sueldo competitivo",
                bullets: [
                    "Diagnóstico y planificación de tratamientos con alineadores y brackets.",
                    "Trabajo coordinado con equipo multidisciplinario.",
                    "Enfoque humano y comunicación clara con pacientes.",
                ],
            },
            {
                key: "endodoncia",
                title: "Endodoncista",
                tipo: "Tiempo completo",
                modalidad: "Presencial",
                sueldo: "Sueldo competitivo",
                bullets: [
                    "Manejo de casos simples y complejos con tecnología digital.",
                    "Orientación a la conservación y pronóstico a largo plazo.",
                    "Apego a protocolos de bioseguridad.",
                ],
            },
            {
                key: "asistente",
                title: "Asistente dental",
                tipo: "Tiempo completo",
                modalidad: "Presencial",
                sueldo: "Sueldo competitivo",
                note: "Puede ser pasante.",
                bullets: [
                    "Apoyo en preparación de gabinete y esterilización.",
                    "Acompañamiento en procedimientos y seguimiento a pacientes.",
                    "Excelente actitud de servicio y orden.",
                ],
            },
            {
                key: "odontope",
                title: "Odontopediatra",
                tipo: "Tiempo completo",
                modalidad: "Presencial",
                sueldo: "Sueldo competitivo",
                bullets: [
                    "Atención cálida y didáctica para niñas y niños.",
                    "Colaboración con ortodoncia y prevención.",
                    "Manejo conductual y comunicación con tutores.",
                ],
            },
            {
                key: "mkt",
                title: "Marketing",
                tipo: "Tiempo parcial",
                modalidad: "Híbrido",
                sueldo: "Sueldo competitivo",
                bullets: [
                    "Planeación y calendario de contenidos (IG, FB, Reels).",
                    "Copywriting con tono Dental City y reporting de métricas.",
                    "Coordinación de fotos/video y community management.",
                ],
            },
            {
                key: "director",
                title: "Director médico",
                tipo: "Tiempo completo",
                modalidad: "Presencial",
                sueldo: "Sueldo competitivo",
                bullets: [
                    "Supervisión de calidad en atención clínica.",
                    "Gestión de equipo multidisciplinario y protocolos de bioseguridad.",
                    "Planeación estratégica y mejora continua de procesos.",
                ],
            },
        ],
        []
    );

    return (
        <>
            <TopBar />
            <main className="min-h-dvh bg-[#0f2237]">
                {/* Hero */}
                <section className="relative overflow-hidden bg-[radial-gradient(70%_70%_at_50%_0%,rgba(255,255,255,0.08),transparent_60%)]">
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b]" />
                    <Container className="py-12 md:py-14">
                        <div className="text-center">
                            <div className="text-xs tracking-[0.35em] text-white/50">
                                TALENTO DENTAL CITY
                            </div>
                            <h1 className="mt-3 inline-block text-3xl md:text-5xl font-semibold relative">
                                <span className="golden-sweep">Bolsa de trabajo</span>
                                <span className="absolute left-0 right-0 -bottom-2 h-[2px] rounded bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b]" />
                            </h1>
                            <p className="mx-auto mt-5 max-w-2xl text-white/80">
                                Únete a nuestro equipo en expansión de excelencia clínica en Zapopan, Jalisco.
                            </p>
                        </div>
                    </Container>
                </section>

                {/* Puestos */}
                <section className="pt-6 md:pt-8 pb-12 md:pb-14 -mt-2 md:-mt-3">
                    <Container>
                        <div className="text-center">
                            <div className="text-xs tracking-[0.35em] text-white/50">
                                POSICIONES ABIERTAS
                            </div>
                            <h2 className="mt-2 inline-block text-2xl md:text-3xl font-semibold relative">
                                <span className="silver-sweep">Roles disponibles</span>
                                <span className="absolute left-0 right-0 -bottom-2 h-[2px] rounded bg-gradient-to-r from-[#cfd8e3] via-white to-[#cfd8e3]" />
                            </h2>
                        </div>

                        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
                            <AnimatePresence initial={false}>
                                {puestos.map((p, i) => (
                                    <motion.div
                                        key={p.key}
                                        initial={{ opacity: 0, y: 14 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.05 }}
                                        className="h-full"
                                    >
                                        <div className="h-full rounded-2xl bg-gradient-to-br from-[#c89b7b66] via-[#e4b89244] to-[#cfd8e344] p-[1px]">
                                            <div className="relative flex h-full min-h-[360px] flex-col rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(0,0,0,.35)] group">
                                                <span className="pointer-events-none absolute right-3 top-3 h-[10px] w-[10px] rounded-full bg-[#e4b89299] blur-[1px]" />
                                                <div className="flex items-start justify-between gap-3">
                                                    <h3 className="text-[18px] font-semibold text-white tracking-wide">
                                                        {p.title}
                                                    </h3>
                                                    <span className="rounded-full border border-[#e4b89255] bg-[#e6d6c7]/10 px-2 py-1 text-[11px] text-[#e4b892]">
                                                        {p.sueldo}
                                                    </span>
                                                </div>

                                                <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                                                    <Badge>{p.tipo}</Badge>
                                                    <Badge variant="silver">{p.modalidad}</Badge>
                                                    {p.note && (
                                                        <span className="ml-1 text-[12px] text-white/70">
                                                            {p.note}
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="mt-4 grow">
                                                    <ul className="space-y-2 text-sm text-white/80">
                                                        {p.bullets.map((b, idx) => (
                                                            <li key={idx} className="flex items-start gap-2">
                                                                <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-[#e4b892]" />
                                                                <span>{b}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                <div className="mt-5 flex items-center justify-between gap-3">
                                                    <a
                                                        href={MAILTO(p.title)}
                                                        className="relative inline-flex items-center gap-2 rounded-full bg-[#d8a07b] px-4 py-2 text-xs font-semibold text-[#0b1b2b] transition hover:brightness-110 overflow-hidden"
                                                    >
                                                        Mandar CV
                                                        <svg
                                                            viewBox="0 0 24 24"
                                                            className="h-4 w-4"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="1.8"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        >
                                                            <path d="M5 12h14M13 5l7 7-7 7" />
                                                        </svg>

                                                        {/* efecto brillante restaurado */}
                                                        <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
                                                            <span className="absolute -inset-y-2 -left-1/3 h-[200%] w-1/3 rotate-12 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-70 animate-[sweep_1.6s_ease-out_infinite]" />
                                                        </span>
                                                    </a>

                                                    <a
                                                        href={`mailto:${MAIL}`}
                                                        className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-2 text-[11px] text-white/85 hover:bg-white/10"
                                                        title={MAIL}
                                                    >
                                                        {MAIL}
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        <div className="mt-12 text-center">
                            <div className="inline-flex items-center gap-2 rounded-full border border-[#e4b89255] bg-white/5 px-4 py-2 text-xs text-white/85">
                                <span className="text-[#e4b892]">¿No ves un rol para ti?</span>
                                <a
                                    href={`mailto:${MAIL}?subject=${encodeURIComponent(
                                        "Postulación espontánea"
                                    )}`}
                                    className="underline hover:opacity-90"
                                >
                                    Escríbenos a {MAIL}
                                </a>
                            </div>
                        </div>
                    </Container>
                </section>
            </main>

            <Footer />

            <style>{`
        @keyframes sweep {
          0% { transform: translateX(-120%) rotate(12deg);}
          100% { transform: translateX(220%) rotate(12deg);}
        }
        .golden-sweep {
          color: transparent;
          background-image: linear-gradient(90deg,#c89b7b 0%,#e4b892 20%,#f4d3b3 35%,#e4b892 60%,#c89b7b 100%);
          background-size: 250% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          position: relative;
          display: inline-block;
          animation: goldSweep 3.2s linear infinite;
        }
        .silver-sweep {
          color: transparent;
          background-image: linear-gradient(90deg,#cfd8e3 0%,#ffffff 35%,#cfd8e3 70%);
          background-size: 250% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          position: relative;
          display: inline-block;
          animation: goldSweep 3.2s linear infinite;
        }
        @media (prefers-reduced-motion: reduce){
          .golden-sweep,.silver-sweep{ animation: none; background-size: 100% 100%; }
        }
        @keyframes goldSweep {
          0% { background-position: 0% 50%; filter: drop-shadow(0 0 0 rgba(228,184,146,0)); }
          45% { filter: drop-shadow(0 0 4px rgba(228,184,146,.35)); }
          100% { background-position: 200% 50%; filter: drop-shadow(0 0 0 rgba(228,184,146,0)); }
        }
      `}</style>
        </>
    );
}

/* UI bits */
function Badge({ children, variant = "gold" }) {
    const isSilver = variant === "silver";
    return (
        <span
            className={[
                "inline-flex items-center gap-1 rounded-full border px-2 py-1",
                "text-[11px]",
                isSilver
                    ? "border-white/20 bg-white/10 text-white/85"
                    : "border-[#e4b89255] bg-[#e6d6c7]/10 text-[#e4b892]",
            ].join(" ")}
        >
            {children}
        </span>
    );
}
