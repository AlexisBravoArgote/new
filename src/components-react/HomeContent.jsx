// src/App.jsx
import React, { useEffect, useMemo, useRef, useState, useCallback, useId } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import "./i18n"; // <<<<<< inicializa i18next

const __MOTION_USED = Boolean(motion); // eslint-disable-line no-unused-vars

// Assets
import alineadores from "/assets/alineadores.avif";
import transparentes from "/assets/transparentes2.jpg";
import seguimiento2 from "/assets/seguimiento2.jpg";
import ubicacion from "/assets/ubicacion.webp";
import unidades from "/assets/unidades.png";
import recepcion from "/assets/recepcion.webp";
import fotos from "/assets/fotos.webp";
import primera from "/assets/primera.webp";
import segunda from "/assets/segunda.webp";
import tercera from "/assets/tercera.webp";
import cuarta from "/assets/cuarta.webp";
import arquitectura from "/assets/arquitectura.png";

import TopBar from "./TopBar.jsx";
import Footer from "./Footer.jsx";
import LanguageBoutique from "./LanguageBoutique.jsx";
import "../i18n";


// =========================
// Config rápida
// =========================
const WHATSAPP_NUMBER = "523333087833";
const WA_URL = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(
    "Hola 👋 me gustaría agendar una cita en Dental City."
)}`;
const WA_KIDS = "https://wa.me/523319699222";

const getWaUrl = (key, title) => {
    const base = (key === "ortopedia" || key === "limpieza-ninos") ? WA_KIDS : WA_URL;
    const msg = `Hola 👋 me gustaría agendar una cita en Dental City para ${title}.`;
    const sep = base.includes("?") ? "&" : "?";
    return `${base}${sep}text=${encodeURIComponent(msg)}`;
};

if (typeof window !== "undefined") window.WA_URL = WA_URL;

function navigateToLocation(tabKey) {
    try {
        sessionStorage.setItem("initialTab", tabKey);
    } catch (err) { void err; }

    // 1) Activa el tab ANTES del scroll
    window.dispatchEvent(new CustomEvent("select-location-tab", { detail: tabKey }));

    // 2) Espera a que el DOM se relayout (2 frames para mayor seguridad)
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            const el = document.querySelector("#ubicacion");
            if (!el) return;

            const isMobile = window.innerWidth < 640; // sm
            if (isMobile) {
                const extra = 195; // ajusta 140–200 a tu gusto
                const y = el.getBoundingClientRect().top + window.scrollY + extra;
                window.scrollTo({ top: y, behavior: "smooth" });
            } else {
                el.scrollIntoView({ behavior: "smooth", block: "start" });
            }

            // 3) Actualiza el hash SIN provocar auto-scroll del navegador
            if (location.hash !== "#ubicacion") {
                history.replaceState(null, "", "#ubicacion");
            }
        });
    });
}


// =========================
// Helpers / Layout
// =========================
function Container({ children, className = "" }) {
    return (
        <div className={`mx-auto w-full max-w-6xl px-6 md:px-8 ${className}`}>
            {children}
        </div>
    );
}

// =========================
// Páginas (Rutas)
// =========================
function Home() {
    const { scrollYProgress } = useScroll();
    const bgOpacity = useTransform(scrollYProgress, [0, 1], [0.55, 0.85]);
    const { t } = useTranslation("home");

    // Structured Data para LocalBusiness
    const localBusinessData = {
        "@context": "https://schema.org",
        "@type": "DentalClinic",
        "name": "Dental City",
        "description": "Clínica dental integral en Zapopan, Jalisco. Especialidades: ortodoncia, implantes, odontopediatría, estética dental. Tecnología digital de vanguardia.",
        "url": "https://dentalcity.mx",
        "logo": "https://dentalcity.mx/logo.png",
        "image": "https://dentalcity.mx/logo.png",
        "telephone": "+52-33-1234-5678",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Zona Real, Zapopan",
            "addressLocality": "Zapopan",
            "addressRegion": "Jalisco",
            "postalCode": "45000",
            "addressCountry": "MX"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "20.7238",
            "longitude": "-103.3858"
        },
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "09:00",
                "closes": "19:00"
            }
        ],
        "priceRange": "$$",
        "medicalSpecialty": ["Orthodontics", "Dentistry", "Pediatric Dentistry", "Cosmetic Dentistry", "Dental Implants"],
        "areaServed": {
            "@type": "City",
            "name": "Zapopan, Guadalajara"
        }
    };

    return (
        <div className="min-h-screen w-full bg-[#0b1b2b] text-white">
            <TopBar bgOpacity={bgOpacity} />
            {/* 🌐 selector global, debajo del TopBar en todas las páginas */}
            <LanguageBoutique />

            {/* Secciones */}
            <Hero />
            <About />
            <Services />
            <GalleryCarousel />
            <InvisalignInteractive />
            <LocationsTabs />
            <FAQ />

            <Footer />
            <FloatingCta />
            <FloatingBackToTop />
            <DevTests />
        </div>
    );
}

export default Home;

// =========================
// Secciones y componentes
// =========================

function Hero() {
    const { t } = useTranslation("home"); // usa el namespace "home"
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });
    const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
    const [openHeroCta, setOpenHeroCta] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpenHeroCta(false);
            }
        };
        if (openHeroCta) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [openHeroCta]);

    return (
        <section ref={ref} className="relative isolate overflow-hidden">
            {/* Fondo */}
            <div
                className="absolute inset-0 -z-10 bg-cover bg-center transition-all duration-[2500ms] ease-out"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1588771930290-0ef1e631679f?q=80&w=1920&auto=format&fit=crop')",
                    filter: "brightness(0.45)",
                    transform: "scale(1.05)",
                }}
            />
            <motion.div
                style={{ y }}
                className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#0b1b2b]/70 via-[#0b1b2b]/30 to-transparent opacity-60"
            />
            <motion.div
                style={{ y }}
                className="pointer-events-none absolute inset-0 -z-10 opacity-25"
            >
                <Noise />
            </motion.div>

            {/* Backdrop menú */}
            <AnimatePresence>
                {openHeroCta && (
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        animate={{ opacity: 0.4, backdropFilter: "blur(8px)" }}
                        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="fixed inset-0 z-10 bg-black/60"
                    />
                )}
            </AnimatePresence>

            <Container className="flex min-h-[78vh] flex-col items-center justify-center py-20 text-center relative z-20">
                <motion.h1
                    initial={{ y: 18, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-[42px] md:text-6xl font-light tracking-wide leading-[1.15] md:leading-[1.1] pb-[2px]"
                >
                    <span className="golden-sweep">
                        {t("hero.title", { defaultValue: "Elegancia que se nota al sonreír" })}
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ y: 18, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.7 }}
                    className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-white/85"
                >
                    {t("hero.subtitle", {
                        defaultValue:
                            "Odontología digital de vanguardia, donde la precisión se une al confort y la atención personalizada.",
                    })}
                </motion.p>

                {/* Botones */}
                <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                    <div className="relative" ref={menuRef}>
                        <motion.button
                            onClick={() => setOpenHeroCta((v) => !v)}
                            className={`flex items-center gap-2 rounded-full px-7 py-3 font-medium shadow-lg transition active:scale-[0.97] ${openHeroCta
                                ? "bg-gradient-to-r from-[#e8c3a2] to-[#d8a07b] text-[#0b1b2b]"
                                : "bg-[#d8a07b] text-[#0b1b2b] hover:brightness-105"
                                }`}
                            aria-haspopup="menu"
                            aria-expanded={openHeroCta}
                            animate={{
                                filter: openHeroCta
                                    ? "drop-shadow(0 0 14px rgba(228,184,146,0.7))"
                                    : "drop-shadow(0 0 0 rgba(0,0,0,0))",
                            }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                        >
                            {t("hero.book", { defaultValue: "Agendar cita" })}
                            <motion.svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-5 w-5"
                                animate={{ rotate: openHeroCta ? 180 : 0, y: openHeroCta ? 2 : 0 }}
                                transition={{ duration: 0.25, ease: "easeOut" }}
                            >
                                <path d="M6 9l6 6 6-6" />
                            </motion.svg>
                        </motion.button>

                        <AnimatePresence>
                            {openHeroCta && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    transition={{ duration: 0.25, ease: "easeOut" }}
                                    /* Mobile: anclado al borde izquierdo del botón y ancho seguro
                                       Desktop (>=640px): vuelve a centrado y 280px */
                                    className="absolute top-[110%] left-0 translate-x-0 w-max max-w-[90vw]

                                               sm:left-1/2 sm:-translate-x-1/2 sm:w-[280px] sm:max-w-[280px]
                                               rounded-2xl border border-[#e4b89233] bg-[#11243a]/95 p-2 text-white/90 shadow-[0_8px_30px_rgba(0,0,0,0.5)] backdrop-blur-lg z-20"
                                    role="menu"
                                >
                                    <button
                                        onClick={() => {
                                            navigateToLocation("Dental City");
                                            setOpenHeroCta(false);
                                        }}
                                        className="flex w-full items-center justify-between gap-2 rounded-xl px-4 py-3 text-left transition hover:bg-white/10"
                                        role="menuitem"
                                    >
                                        <span>Dental City</span>
                                        <svg
                                            viewBox="0 0 24 24"
                                            className="h-5 w-5"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.6"
                                        >
                                            <path d="M9 18l6-6-6-6" />
                                        </svg>
                                    </button>

                                    <button
                                        onClick={() => {
                                            navigateToLocation("Dental City Kids & Family");
                                            setOpenHeroCta(false);
                                        }}
                                        className="mt-1 flex w-full items-center justify-between gap-2 rounded-xl px-4 py-3 text-left transition hover:bg-white/10"
                                        role="menuitem"
                                    >
                                        <span>Dental City Kids & Family</span>
                                        <svg
                                            viewBox="0 0 24 24"
                                            className="h-5 w-5"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.6"
                                        >
                                            <path d="M9 18l6-6-6-6" />
                                        </svg>
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <a
                        href="#servicios"
                        className="rounded-full border border-white/25 bg-white/5 px-7 py-3 text-white/90 backdrop-blur-md transition hover:bg-white/15"
                    >
                        {t("hero.viewTreatments", { defaultValue: "Ver tratamientos" })}
                    </a>
                </div>
            </Container>

            <style>{`
        .golden-sweep {
          color: transparent;
          background-image: linear-gradient(90deg,#c89b7b 0%,#e4b892 25%,#f4d3b3 50%,#e4b892 75%,#c89b7b 100%);
          background-size: 250% 100%;
          background-clip: text;
          -webkit-background-clip: text;
          animation: goldSweep 3.5s ease-in-out infinite;
        }
        @keyframes goldSweep {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
        </section>
    );
}






function Noise() {
    return (
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <filter id="noiseFilter">
                <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.65"
                    numOctaves="2"
                    stitchTiles="stitch"
                />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)" opacity=".15" />
        </svg>
    );
}

function SectionHeading({ overline, title, subtitle }) {
    return (
        <div className="text-center">
            {overline && (
                <div className="text-xs tracking-[0.35em] text-white/50">{overline}</div>
            )}
            <h2 className="mt-3 text-3xl font-semibold text-[#d8a07b] md:text-4xl">
                {title}
            </h2>
            {subtitle && (
                <p className="mx-auto mt-3 max-w-2xl text-white/75">{subtitle}</p>
            )}
        </div>
    );
}



/* ======= Chip (sin cambios de UI, solo igual) ======= */
function Chip({ children }) {
    const id = useId();
    return (
        <span className="relative inline-flex h-11 w-full items-center justify-center">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 220 44" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                    <linearGradient id={`grad-${id}-bg`} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#c89b7b" />
                        <stop offset="50%" stopColor="#e4b892" />
                        <stop offset="100%" stopColor="#c89b7b" />
                    </linearGradient>
                </defs>
                <rect
                    x="1" y="1"
                    width="calc(100% - 2px)" height="calc(100% - 2px)"
                    rx="12" ry="12"
                    fill="none" stroke={`url(#grad-${id}-bg)`} strokeWidth="2"
                    vectorEffect="non-scaling-stroke" pathLength="520" strokeDasharray="85 435"
                    className="chipStroke"
                />
            </svg>

            <span className="relative z-10 inline-flex h-11 w-full items-center justify-center text-center
    sm:justify-start sm:text-left rounded-[12px] bg-white/8 px-5 text-[14px] text-white/85 ring-1 ring-white/10 backdrop-blur">

                {children}
            </span>

            <div
                className="pointer-events-none absolute inset-0 z-20"
                style={{ clipPath: "inset(calc(100% - 4px) 0 0 0)", WebkitClipPath: "inset(calc(100% - 4px) 0 0 0)" }}
            >
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 220 44" preserveAspectRatio="none" aria-hidden="true">
                    <defs>
                        <linearGradient id={`grad-${id}-fg`} x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#c89b7b" />
                            <stop offset="50%" stopColor="#e4b892" />
                            <stop offset="100%" stopColor="#c89b7b" />
                        </linearGradient>
                    </defs>
                    <rect
                        x="1" y="1"
                        width="calc(100% - 2px)" height="calc(100% - 2px)"
                        rx="12" ry="12"
                        fill="none" stroke={`url(#grad-${id}-fg)`} strokeWidth="2"
                        vectorEffect="non-scaling-stroke" pathLength="520" strokeDasharray="85 435"
                        className="chipStroke"
                    />
                </svg>
            </div>

            <style>{`
        .chipStroke { animation: chipDash 6s linear infinite; }
        @keyframes chipDash { 0% { stroke-dashoffset: 0; } 100% { stroke-dashoffset: -520; } }
      `}</style>
        </span>
    );
}

/* ======= ImageCard (igual de UI) ======= */
function ImageCard({ src, alt, label }) {
    return (
        <figure className="group relative aspect-square overflow-hidden rounded-2xl">
            <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
            {label && (
                <figcaption className="pointer-events-none absolute left-1 top-2 rounded-lg md:rounded-full md:left-2 bg-black/40 px-1.5 py-0.5 md:px-2 md:py-1 text-[11px] leading-tight md:text-xs md:leading-normal text-white/90 backdrop-blur-sm max-w-[calc(100%-0.5rem)] md:max-w-none">
                    <span className="block line-clamp-2 md:line-clamp-none">{label}</span>
                </figcaption>
            )}
            <div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-70"
                style={{ boxShadow: "inset 0 0 60px rgba(228,184,146,.12)" }}
            />
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute -inset-y-2 -left-1/3 h-[140%] w-1/3 rotate-12 bg-gradient-to-r from-transparent via-[#e4b89266] to-transparent animate-[sweep_1.6s_ease-out_infinite]" />
            </div>
            <style>{`
        @keyframes sweep { 0% { transform: translateX(-120%); opacity: .0; } 45% { opacity: .55; } 100% { transform: translateX(220%); opacity: 0; } }
      `}</style>
        </figure>
    );
}

/* ======= About (con i18n) ======= */
function About() {
    const { t } = useTranslation("home");

    const IMAGES = [
        { src: primera, alt: t("about.img_all") },
        { src: segunda, alt: t("about.img_ortho") },
        { src: tercera, alt: t("about.img_aesthetic") },
        { src: cuarta, alt: t("about.img_scan") },
    ];

    return (
        <section id="about" className="bg-[#0f2237] py-20">
            <Container>
                <div className="text-center">
                    <div className="text-xs tracking-[0.35em] text-white/50">
                        {t("about.eyebrow")}
                    </div>
                    <h2 className="mt-3 inline-block text-3xl font-semibold md:text-4xl relative">
                        <span className="golden-sweep">{t("about.title")}</span>
                        <span className="absolute left-0 right-0 -bottom-2 h-[2px] rounded bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b]" />
                    </h2>
                    <p className="mx-auto mt-3 max-w-2xl text-white/75">
                        {t("about.blurb")}
                    </p>
                </div>

                <div className="mt-12 grid gap-8 md:grid-cols-2">
                    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_18px_50px_rgba(0,0,0,.35)]">
                        <div className="pointer-events-none absolute -inset-px rounded-3xl bg-[radial-gradient(120%_120%_at_10%_0%,rgba(228,184,146,.18),transparent)]" />
                        <p className="text-[15px] leading-7 text-white/85 text-justify">
                            {t("about.paragraph")}
                        </p>

                        <div className="mt-6 grid grid-cols-2 gap-4">
                            <Chip>{t("about.chip_diag3d")}</Chip>
                            <Chip>{t("about.chip_lab")}</Chip>
                            <Chip>{t("about.chip_invisible")}</Chip>
                            <Chip>{t("about.chip_aesthetic")}</Chip>
                        </div>
                        <div className="my-6 h-[2px] w-full overflow-hidden rounded bg-white/10">
                            <div className="h-full w-full animate-[shine_3.6s_linear_infinite] bg-gradient-to-r from-transparent via-[#e4b892] to-transparent" />
                        </div>
                        <div className="relative mt-4">
                            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-[#d8a07b33] to-transparent blur-lg" />
                            <img
                                src={arquitectura}
                                alt={t("about.arch_alt")}
                                className="relative mx-auto block h-40 w-full max-w-[720px] object-contain md:h-48"
                                loading="lazy"
                            />
                            <div className="mt-3 h-[2px] w-full bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b] opacity-80" />
                        </div>
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 shadow-[0_18px_50px_rgba(0,0,0,.35)]">
                        <div className="grid grid-cols-2 gap-4 md:gap-5">
                            {IMAGES.map((img, i) => (
                                <ImageCard key={i} src={img.src} alt={img.alt} label={img.alt} />
                            ))}
                        </div>
                    </div>
                </div>
            </Container>

            <style>{`
        @keyframes shine { 0% { transform: translateX(-100%);} 100% { transform: translateX(100%);} }
        .golden-sweep {
          color: transparent;
          background-image: linear-gradient(90deg, #c89b7b 0%, #e4b892 20%, #f4d3b3 35%, #e4b892 60%, #c89b7b 100%);
          background-size: 250% 100%;
          background-clip: text; -webkit-background-clip: text;
          position: relative; display: inline-block;
          animation: goldSweep 3.2s linear infinite;
        }
        @media (prefers-reduced-motion: reduce){ .golden-sweep{ animation: none; background-size: 100% 100%; } }
        @keyframes goldSweep {
          0% { background-position: 0% 50%;   filter: drop-shadow(0 0 0 rgba(228,184,146,0)); }
          45% { filter: drop-shadow(0 0 4px rgba(228,184,146,.35)); }
          100% { background-position: 200% 50%; filter: drop-shadow(0 0 0 rgba(228,184,146,0)); }
        }
      `}</style>
        </section>
    );
}




function Services() {
    const { t } = useTranslation("home");
    const all = useMemo(
        () => [
            { key: "implantes", title: t("services.items.implantes.title"), desc: t("services.items.implantes.desc") },
            { key: "limpieza", title: t("services.items.limpieza.title"), desc: t("services.items.limpieza.desc") },
            { key: "coronas", title: t("services.items.coronas.title"), desc: t("services.items.coronas.desc") },
            { key: "resinas", title: t("services.items.resinas.title"), desc: t("services.items.resinas.desc") },
            { key: "maxilofacial", title: t("services.items.maxilofacial.title"), desc: t("services.items.maxilofacial.desc") },
            { key: "endodoncia", title: t("services.items.endodoncia.title"), desc: t("services.items.endodoncia.desc") },
            { key: "periodoncia", title: t("services.items.periodoncia.title"), desc: t("services.items.periodoncia.desc") },
            { key: "guarda-oclusal", title: t("services.items.guarda_oclusal.title"), desc: t("services.items.guarda_oclusal.desc") },
            { key: "puentes", title: t("services.items.puentes.title"), desc: t("services.items.puentes.desc") },
            { key: "alineadores", title: t("services.items.alineadores.title"), desc: t("services.items.alineadores.desc") },
            { key: "invisalign", title: t("services.items.invisalign.title"), desc: t("services.items.invisalign.desc") },
            { key: "brackets", title: t("services.items.brackets.title"), desc: t("services.items.brackets.desc") },
            { key: "blanqueamientos", title: t("services.items.blanqueamientos.title"), desc: t("services.items.blanqueamientos.desc") },
            { key: "carillas", title: t("services.items.carillas.title"), desc: t("services.items.carillas.desc") },
            { key: "limpieza-ninos", title: t("services.items.limpieza_ninos.title"), desc: t("services.items.limpieza_ninos.desc") },
            { key: "selladores", title: t("services.items.selladores.title"), desc: t("services.items.selladores.desc") },
            { key: "extracciones", title: t("services.items.extracciones.title"), desc: t("services.items.extracciones.desc") },
            { key: "ortopedia", title: t("services.items.ortopedia.title"), desc: t("services.items.ortopedia.desc") },
            { key: "armonizacion-facial", title: t("services.items.armonizacion_facial.title"), desc: t("services.items.armonizacion_facial.desc") },
            { key: "diseno-sonrisa", title: t("services.items.diseno_sonrisa.title"), desc: t("services.items.diseno_sonrisa.desc") },
        ],
        [t]
    );


    const [query, setQuery] = useState("");
    const filtered = all.filter((s) =>
        s.title.toLowerCase().includes(query.toLowerCase().trim())
    );

    useEffect(() => {
        console.assert(all.some((s) => s.key === "invisalign"), "Test: existe servicio Invisalign");
    }, [all]);

    const [open, setOpen] = useState(false);
    const [active, setActive] = useState(null);
    const openInfo = (service) => { setActive(service); setOpen(true); };
    const closeInfo = () => setOpen(false);

    // --- Solo móvil (SIN CAMBIOS): paginar de 3 en 3 ---
    const PAGE_SIZE_MOBILE = 3;
    const [mPage, setMPage] = useState(0);
    const totalPagesMobile = Math.ceil(filtered.length / PAGE_SIZE_MOBILE);
    const pageItemsMobile = filtered.slice(mPage * PAGE_SIZE_MOBILE, mPage * PAGE_SIZE_MOBILE + PAGE_SIZE_MOBILE);
    const nextPageMobile = () => setMPage((p) => Math.min(p + 1, totalPagesMobile - 1));
    const prevPageMobile = () => setMPage((p) => Math.max(p - 1, 0));

    // --- Desktop/Tablet NUEVO: máximo 8 por página ---
    const PAGE_SIZE_DESKTOP = 8;
    const [dPage, setDPage] = useState(0);
    const totalPagesDesktop = Math.ceil(filtered.length / PAGE_SIZE_DESKTOP);
    const pageItemsDesktop = filtered.slice(dPage * PAGE_SIZE_DESKTOP, dPage * PAGE_SIZE_DESKTOP + PAGE_SIZE_DESKTOP);
    const nextPageDesktop = () => setDPage((p) => Math.min(p + 1, totalPagesDesktop - 1));
    const prevPageDesktop = () => setDPage((p) => Math.max(p - 1, 0));

    return (
        <section id="servicios" className="bg-[#0f2237] py-20">
            <Container>
                <div className="text-center">
                    <div className="text-xs tracking-[0.35em] text-white/50">
                        {t("services.eyebrow")}
                    </div>
                    <h2 className="mt-3 inline-block text-3xl font-semibold md:text-4xl relative">
                        <span className="golden-sweep">{t("services.title")}</span>
                        <span className="absolute left-0 right-0 -bottom-2 h-[2px] rounded bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b]" />
                    </h2>
                    <p className="mx-auto mt-3 max-w-2xl text-white/75">
                        {t("services.blurb")}
                    </p>
                </div>

                <div className="mt-8 flex justify-center">
                    <div className="relative w-full max-w-md">
                        <input
                            value={query}
                            onChange={(e) => {
                                setQuery(e.target.value);
                                setMPage(0);
                                setDPage(0);
                            }}
                            placeholder={t("services.searchPlaceholder")}
                            className="w-full rounded-full border border-white/15 bg-white/5 px-4 py-2.5 pl-10 text-sm outline-none placeholder:text-white/50 focus:border-[#e4b89266] focus:ring-2 focus:ring-[#e4b89233]"
                        />
                        <svg
                            viewBox="0 0 24 24"
                            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60"
                            fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                        >
                            <circle cx="11" cy="11" r="7" />
                            <path d="M21 21l-3.6-3.6" />
                        </svg>
                        <div className="pointer-events-none absolute inset-0 -z-10 rounded-full opacity-40 [mask-image:radial-gradient(60%_60%_at_30%_40%,black,transparent)]">
                            <div className="h-full w-full animate-[shimmer_6s_linear_infinite] rounded-full bg-gradient-to-r from-transparent via-[#e4b89233] to-transparent" />
                        </div>
                    </div>
                </div>

                {/* Desktop/Tablet: grid con tarjetas del mismo alto y paginación (8 por página) */}
                <div className="mt-8 hidden gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-stretch">
                    {pageItemsDesktop.map((s, i) => (
                        <ServiceCard
                            key={s.key}
                            index={i}
                            title={s.title}
                            desc={s.desc}
                            waUrl={getWaUrl(s.key, s.title)}   // ← usa Kids o Principal
                            onInfo={() => openInfo(s)}
                        />
                    ))}
                </div>

                {/* Paginador Desktop/Tablet */}
                {totalPagesDesktop > 1 && (
                    <div className="mt-4 hidden sm:flex items-center justify-between">
                        <button
                            onClick={prevPageDesktop}
                            disabled={dPage === 0}
                            className="rounded-full border border-[#e4b89255] bg-white/5 px-4 py-2 text-sm text-white/85 disabled:opacity-40 disabled:cursor-not-allowed transition hover:bg-white/10"
                        >
                            {t("services.prev")}
                        </button>
                        <div className="inline-flex items-center gap-2 rounded-full border border-[#e4b89255] bg:white/5 bg-white/5 px-3 py-1">
                            <span className="text-xs text-[#e4b892]">{t("services.pageLabel")}</span>
                            <span className="text-sm text:white/90 text-white/90">{dPage + 1}</span>
                            <span className="text-white/60 text-sm">/</span>
                            <span className="text-sm text-white/80">{totalPagesDesktop}</span>
                        </div>
                        <button
                            onClick={nextPageDesktop}
                            disabled={dPage >= totalPagesDesktop - 1}
                            className="rounded-full border border-[#e4b89255] bg-[#d8a07b] px-4 py-2 text-sm font-semibold text-[#0b1b2b] disabled:opacity-40 disabled:cursor-not-allowed transition hover:brightness-110"
                        >
                            {t("services.next")}
                        </button>
                    </div>
                )}

                {/* Móvil: 3 por página (sin cambios) */}
                <div className="mt-8 grid gap-6 sm:hidden">
                    {pageItemsMobile.map((s, i) => (
                        <ServiceCard
                            key={s.key}
                            index={i}
                            title={s.title}
                            desc={s.desc}
                            waUrl={getWaUrl(s.key, s.title)}   // ← usa Kids o Principal
                            onInfo={() => openInfo(s)}
                        />
                    ))}

                    {totalPagesMobile > 1 && (
                        <div className="mt-2 flex items-center justify-between">
                            <button
                                onClick={prevPageMobile}
                                disabled={mPage === 0}
                                className="rounded-full border border-[#e4b89255] bg-white/5 px-4 py-2 text-sm text-white/85 disabled:opacity-40 disabled:cursor-not-allowed transition hover:bg-white/10"
                            >
                                {t("services.prev")}
                            </button>
                            <div className="inline-flex items-center gap-2 rounded-full border border-[#e4b7 89255] bg-white/5 px-3 py-1">
                                <span className="text-xs text-[#e4b892]">{t("services.pageLabel")}</span>
                                <span className="text-sm text-white/90">{mPage + 1}</span>
                                <span className="text-white/60 text-sm">/</span>
                                <span className="text-sm text-white/80">{totalPagesMobile}</span>
                            </div>
                            <button
                                onClick={nextPageMobile}
                                disabled={mPage >= totalPagesMobile - 1}
                                className="rounded-full border border-[#e4b89255] bg-[#d8a07b] px-4 py-2 text-sm font-semibold text-[#0b1b2b] disabled:opacity-40 disabled:cursor-not-allowed transition hover:brightness-110"
                            >
                                {t("services.next")}
                            </button>
                        </div>
                    )}
                </div>
            </Container>

            {/* Pasa el servicio activo al modal; dentro elegiremos el WhatsApp correcto */}
            <InfoModal open={open} onClose={closeInfo} service={active} />

            <style>{`
        @keyframes shimmer { 0% { transform: translateX(-40%);} 50% { transform: translateX(40%);} 100% { transform: translateX(120%);} }
        @keyframes sweep   { 0% { transform: translateX(-120%) rotate(12deg);} 100% { transform: translateX(220%) rotate(12deg);} }
        .golden-sweep{
          color: transparent;
          background-image: linear-gradient(90deg, #c89b7b 0%, #e4b892 20%, #f4d3b3 35%, #e4b892 60%, #c89b7b 100%);
          background-size: 250% 100%;
          background-clip: text; -webkit-background-clip: text;
          position: relative; display: inline-block;
          animation: goldSweep 3.2s linear infinite;
        }
        @media (prefers-reduced-motion: reduce){ .golden-sweep{ animation: none; background-size: 100% 100%; } }
        @keyframes goldSweep {
          0% { background-position: 0% 50%;   filter: drop-shadow(0 0 0 rgba(228,184,146,0)); }
          45% { filter: drop-shadow(0 0 4px rgba(228,184,146,.35)); }
          100% { background-position: 200% 50%; filter: drop-shadow(0 0 0 rgba(228,184,146,0)); }
        }
      `}</style>
        </section>
    );
}


function ServiceCard({ title, desc, index, onInfo, waUrl }) {
    const { t } = useTranslation("home");

    return (
        <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.04 }}
            className="group relative h-full"
        >
            <div className="h-full rounded-2xl bg-gradient-to-br from-[#c89b7b40] via-[#e4b89233] to-transparent p-[1px] transition duration-300 group-hover:from-[#c89b7b66] group-hover:via-[#e4b89255]">
                <div className="relative h-full rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-[0_12px_26px_rgba(0,0,0,.35)] flex flex-col">
                    <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ boxShadow: "inset 0 0 60px rgba(228,184,146,.06)" }} />
                    <span className="pointer-events-none absolute right-3 top-3 h-[10px] w-[10px] rounded-full bg-[#e4b89280] blur-[1px]" />
                    <h3 className="text-[17px] font-semibold text-white tracking-wide">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-white/75">{desc}</p>

                    {/* Empuja el footer al fondo para igualar alturas */}
                    <div className="mt-auto pt-4 flex items-center justify-between">
                        <a
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative inline-flex items-center gap-1 rounded-full bg-[#d8a07b] px-3.5 py-1.5 text-xs font-semibold text-[#0b1b2b] transition hover:brightness-110"
                        >
                            {t("services2.btn_schedule", { defaultValue: "Agendar" })}
                            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14M13 5l7 7-7 7" />
                            </svg>
                            <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
                                <span className="absolute -inset-y-2 -left-1/3 h-[200%] w-1/3 rotate-12 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-70 animate-[sweep_1.6s_ease-out_infinite]" />
                            </span>
                        </a>

                        <button
                            onClick={onInfo}
                            className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/75 transition hover:border-[#e4b89255] hover:bg:white/10 hover:bg-white/10"
                        >
                            {t("services2.btn_moreInfo", { defaultValue: "Más info" })}
                        </button>
                    </div>

                    <span className="pointer-events-none absolute bottom-0 left-4 right-4 h-[2px] translate-y-1 rounded bg-gradient-to-r from-transparent via-[#e4b89280] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
            </div>
        </motion.div>
    );
}


function InfoModal({ open, onClose, service }) {
    const { t } = useTranslation("home");

    useEffect(() => {
        if (!open) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = prev; };
    }, [open]);

    useEffect(() => {
        const onKey = (e) => e.key === "Escape" && onClose?.();
        if (open) window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    if (!open || !service) return null;

    const waForThisService = getWaUrl(service.key, service.title);

    // --- Textos por servicio desde i18n ---
    const baseKey = `serviceModal.byService.${service.key}`;
    const subtitle =
        t(`${baseKey}.subtitle`, { defaultValue: "" }) ||
        t("serviceModal.byService.default.subtitle",
            { defaultValue: "Atención personalizada según tu diagnóstico." });

    const bullets =
        t(`${baseKey}.bullets`, { returnObjects: true, defaultValue: [] })?.length
            ? t(`${baseKey}.bullets`, { returnObjects: true })
            : t("serviceModal.byService.default.bullets", {
                returnObjects: true,
                defaultValue: [
                    "Evaluación clínica y plan a medida.",
                    "Tiempo estimado: variable.",
                    "Precio estimado: a cotizar tras valoración.",
                ],
            });

    return (
        <AnimatePresence>
            <motion.button
                type="button"
                aria-label={t("serviceModal.ariaClose", { defaultValue: "Cerrar modal" })}
                onClick={onClose}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[90] grid place-items-center bg-black/60 p-4"
            >
                <motion.div
                    onClick={(e) => e.stopPropagation()}
                    initial={{ y: 16, opacity: 0, scale: 0.98 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: 10, opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="relative w-full max-w-2xl overflow-hidden rounded-[22px] border border-[#e4b89233] bg-[#0f2237] text-white shadow-2xl"
                >
                    {/* líneas doradas */}
                    <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b]" />
                    <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b]" />

                    {/* botón cerrar */}
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/80 hover:bg-white/10"
                        aria-label={t("serviceModal.close", { defaultValue: "Cerrar" })}
                        title={t("serviceModal.close", { defaultValue: "Cerrar" })}
                    >
                        ✕
                    </button>

                    {/* cabecera */}
                    <div className="px-6 pt-8 text-center sm:px-10">
                        <div className="text-[11px] tracking-[.35em] text-[#e4b892cc]">
                            {t("serviceModal.eyebrow", { defaultValue: "SERVICIO" })}
                        </div>
                        <h3 className="mt-2 text-3xl font-extrabold leading-tight sm:text-4xl">
                            {service.title}
                        </h3>
                        <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
                            {subtitle}
                        </p>
                    </div>

                    {/* bullets */}
                    <div className="px-6 pt-5 sm:px-10">
                        <ul className="grid gap-3 text-[15px] sm:text-[16px] text-white/90">
                            {bullets.map((b, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <span className="mt-2 inline-block h-2.5 w-2.5 shrink-0 rounded-full bg-[#e4b892]" />
                                    <span className="leading-relaxed">{b}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* CTAs */}
                    <div className="px-6 pb-8 pt-7 sm:px-10">
                        <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
                            <a
                                href={waForThisService}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex h-12 min-w-[260px] items-center justify-center gap-2 rounded-full bg-[#d8a07b] px-7 text-[15px] font-semibold text-[#0b1b2b] shadow-[0_8px_24px_rgba(216,160,123,.25)] transition hover:brightness-110"
                            >
                                {t("serviceModal.cta_whatsapp", { defaultValue: "Agendar por WhatsApp" })}
                                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14M13 5l7 7-7 7" />
                                </svg>
                            </a>

                            <a
                                href="#ubicacion"
                                onClick={onClose}
                                className="inline-flex h-12 min-w-[200px] items-center justify-center gap-2 rounded-full border border-white/20 px-7 text-[15px] text-white/90 transition hover:bg-white/10"
                            >
                                {t("serviceModal.cta_viewClinics", { defaultValue: "Ver clínicas" })}
                            </a>
                        </div>
                    </div>
                </motion.div>
            </motion.button>
        </AnimatePresence>
    );
}




function GalleryCarousel() {
    const { t } = useTranslation("home");

    const IMAGES = [
        { src: ubicacion, title: t("gallery.items.ubicacion.title"), subtitle: t("gallery.items.ubicacion.subtitle") },
        { src: unidades, title: t("gallery.items.unidades.title"), subtitle: t("gallery.items.unidades.subtitle") },
        { src: recepcion, title: t("gallery.items.recepcion.title"), subtitle: t("gallery.items.recepcion.subtitle") },
        { src: fotos, title: t("gallery.items.detalles.title"), subtitle: t("gallery.items.detalles.subtitle") },
    ];

    const [i, setI] = useState(0);
    const [hover, setHover] = useState(false);
    const timerRef = useRef(null);
    const touchRef = useRef({ x: 0, y: 0, t: 0 });

    const next = useCallback(() => setI((p) => (p + 1) % IMAGES.length), [IMAGES.length]);
    const prev = useCallback(() => setI((p) => (p - 1 + IMAGES.length) % IMAGES.length), [IMAGES.length]);

    useEffect(() => {
        if (hover) return;
        timerRef.current = setInterval(() => next(), 5200);
        return () => clearInterval(timerRef.current);
    }, [hover, next]);

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "ArrowRight") next();
            if (e.key === "ArrowLeft") prev();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [next, prev]);

    const onTouchStart = (e) => {
        const t0 = e.touches[0];
        touchRef.current = { x: t0.clientX, y: t0.clientY, t: Date.now() };
    };
    const onTouchEnd = (e) => {
        const dx = (e.changedTouches[0].clientX - touchRef.current.x) || 0;
        const dt = Date.now() - touchRef.current.t;
        if (dt < 600 && Math.abs(dx) > 40) (dx < 0 ? next() : prev());
    };

    const active = IMAGES[i];

    return (
        <section id="galeria" className="bg-[#0b1b2b] py-16">
            <Container>
                <div className="text-center">
                    <div className="text-xs tracking-[0.35em] text-white/50">{t("gallery.eyebrow")}</div>
                    <h2 className="mt-5 md:-mt-1 inline-block text-3xl font-semibold md:text-4xl relative">
                        <span className="golden-sweep">{t("gallery.title")}</span>
                        <span className="absolute left-0 right-0 -bottom-2 h-[2px] rounded bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b]" />
                    </h2>
                </div>

                <div
                    className="relative mt-8 overflow-hidden rounded-3xl border border-[#e4b89233] bg_white/5 ring-1 ring-white/10 shadow-[0_20px_60px_rgba(0,0,0,.35)]"
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                >
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b] opacity-80" />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b] opacity-80" />

                    <div className="relative aspect-[16/9] w-full select-none" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
                        <AnimatePresence initial={false} mode="wait">
                            <motion.img
                                key={i}
                                src={active.src}
                                alt={active.title}
                                className="absolute inset-0 h-full w-full object-cover"
                                initial={{ opacity: 0, scale: 1.03, x: 8 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 1.01, x: -8 }}
                                transition={{ duration: 0.9, ease: "easeOut" }}
                            />
                        </AnimatePresence>

                        {/* Overlays para legibilidad: móvil usa gradiente desde arriba; desktop mantiene desde abajo */}
                        <div className="pointer-events-none absolute inset-0 hidden sm:block bg-gradient-to-t from-[#0b1b2b]/55 via-transparent to-transparent" />
                        <div className="pointer-events-none absolute inset-0 sm:hidden bg-gradient-to-b from-[#0b1b2b]/55 via-transparent to-transparent" />
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(11,27,43,.18),transparent_60%)]" />

                        {/* CAPTION */}
                        {/* Móvil: brand + título arriba; subtítulo abajo. Desktop: todo abajo como antes */}
                        {/* Top caption (mobile only) */}
                        <div className="absolute left-0 right-0 top-0 p-4 sm:hidden">
                            <div className="text-xs tracking-[.35em] text_white/60">{t("gallery.brand")}</div>
                            <h3 className="mt-1 text-2xl font-semibold text-white/95">{active.title}</h3>
                        </div>

                        {/* Desktop caption (unchanged) */}
                        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7 hidden sm:block">
                            <div className="flex items-end justify-between">
                                <div>
                                    <div className="text-xs tracking-[.35em] text_white/60">{t("gallery.brand")}</div>
                                    <h3 className="mt-1 text-2xl md:text-3xl font-semibold text-white/95">{active.title}</h3>
                                    <p className="text-white/75 text-sm md:text-[15px]">{active.subtitle}</p>
                                </div>
                                <div className="ml-4 hidden sm:flex items-center gap-2 rounded-full border border-white/20 bg-black/20 px-3 py-1.5 text-white/80 backdrop-blur">
                                    <span className="text-[#e4b892]">{String(i + 1).padStart(2, "0")}</span>
                                    <span className="opacity-50">/</span>
                                    <span className="opacity-80">{String(IMAGES.length).padStart(2, "0")}</span>
                                </div>
                            </div>

                            <div className="mt-3 h-[3px] w-full rounded bg-white/15 overflow-hidden">
                                <motion.div
                                    key={i + (hover ? "-paused" : "")}
                                    className="h-full bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b]"
                                    initial={{ width: "0%" }}
                                    animate={{ width: hover ? "0%" : "100%" }}
                                    transition={{ duration: 5.2, ease: "linear" }}
                                />
                            </div>
                        </div>

                        {/* Bottom subtitle (mobile only) */}
                        <div className="absolute left-0 right-0 bottom-0 p-4 sm:hidden">
                            <p className="text-white/80 text-sm">{active.subtitle}</p>

                            {/* Línea dorada de progreso (móvil, debajo del subtítulo) */}
                            <div className="mt-2 h-[3px] w-full rounded bg-white/15 overflow-hidden">
                                <motion.div
                                    key={i + (hover ? '-paused' : '')}
                                    className="h-full bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b]"
                                    initial={{ width: '0%' }}
                                    animate={{ width: hover ? '0%' : '100%' }}
                                    transition={{ duration: 5.2, ease: 'linear' }}
                                />
                            </div>
                        </div>


                        {/* Arrows (iguales) */}
                        <button
                            aria-label={t("gallery.prev")}
                            onClick={prev}
                            className="group absolute left-3 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-black/30 text-white/90 backdrop-blur border border-white/15 hover:bg-black/40 transition"
                        >
                            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M15 19l-7-7 7-7" />
                            </svg>
                            <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-[#e4b89266] opacity-0 group-hover:opacity-100 transition" />
                        </button>
                        <button
                            aria-label={t("gallery.next")}
                            onClick={next}
                            className="group absolute right-3 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-black/30 text-white/90 backdrop-blur border border-white/15 hover:bg-black/40 transition"
                        >
                            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                            <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-[#e4b89266] opacity-0 group-hover:opacity-100 transition" />
                        </button>
                    </div>
                </div>

                {/* THUMBS: una sola fila en móvil (más pequeñas) */}
                <div className="mt-5 flex items-center justify-center gap-2 flex-nowrap sm:flex-wrap">
                    {IMAGES.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => setI(idx)}
                            className={`thumb chic relative overflow-hidden rounded-xl border ${idx === i ? "border-[#e4b89299]" : "border-white/15"} bg-white/5 hover:bg-white/10 transition`}
                            title={img.title}
                        >
                            <img
                                src={img.src}
                                alt={img.title}
                                className="h-12 w-16 sm:h-14 sm:w-20 md:h-[68px] md:w[96px] object-cover"
                                loading="lazy"
                            />
                            {idx === i && <span className="pointer-events-none absolute inset-0 rounded-xl ring-2 ring-[#e4b892]/70" />}
                            <span className="tooltip absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/70 px-2.5 py-1 text-xs text-white/90 opacity-0 transition pointer-events-none">
                                {img.title}
                            </span>
                        </button>
                    ))}
                </div>

                <div className="mt-4 flex justify-center gap-2">
                    {IMAGES.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setI(idx)}
                            className={`h-1.5 w-6 rounded-full transition ${idx === i ? "bg-[#e4b892]" : "bg-white/30 hover:bg-white/50"}`}
                            aria-label={t("gallery.goToPhoto", { n: idx + 1 })}
                        />
                    ))}
                </div>
            </Container>

            <style>{`
        .thumb:hover .tooltip { opacity: 1; transform: translate(-50%, -2px); }
        .thumb::after {
          content: ""; position: absolute; left: 10%; right: 10%; bottom: -2px; height: 2px;
          background: linear-gradient(90deg, #c89b7b, #e4b892, #c89b7b);
          transform: scaleX(0); transform-origin: left; transition: transform .35s ease;
        }
        .thumb:hover::after { transform: scaleX(1); animation: shine 1.4s linear infinite; }
        @keyframes shine { 0% { background-position: 0% 50%; } 100% { background-position: 200% 50%; } }
        .golden-sweep{
          color: transparent;
          background-image: linear-gradient(90deg, #c89b7b 0%, #e4b892 20%, #f4d3b3 35%, #e4b892 60%, #c89b7b 100%);
          background-size: 250% 100%;
          background-clip: text; -webkit-background-clip: text;
          position: relative; display: inline-block;
          animation: goldSweep 3.2s linear infinite;
        }
        @media (prefers-reduced-motion: reduce){ .golden-sweep{ animation: none; background-size: 100% 100%; } }
        @keyframes goldSweep {
          0% { background-position: 0% 50%;   filter: drop-shadow(0 0 0 rgba(228,184,146,0)); }
          45% { filter: drop-shadow(0 0 4px rgba(228,184,146,.35)); }
          100% { background-position: 200% 50%; filter: drop-shadow(0 0 0 rgba(228,184,146,0)); }
        }
      `}</style>
        </section>
    );
}




function InvisalignInteractive() {
    const { t } = useTranslation("home");

    const slides = useMemo(
        () => [
            {
                overline: t("invis.slides.slide1.overline"),
                title: t("invis.slides.slide1.title"),
                subLeft: t("invis.slides.slide1.subLeft"),
                strongRight: t("invis.slides.slide1.strongRight"),
                textRight: t("invis.slides.slide1.textRight"),
                img: alineadores,
            },
            {
                overline: t("invis.slides.slide2.overline"),
                title: t("invis.slides.slide2.title"),
                subLeft: t("invis.slides.slide2.subLeft"),
                strongRight: t("invis.slides.slide2.strongRight"),
                textRight: t("invis.slides.slide2.textRight"),
                img: seguimiento2,
            },
            {
                overline: t("invis.slides.slide3.overline"),
                title: t("invis.slides.slide3.title"),
                subLeft: t("invis.slides.slide3.subLeft"),
                strongRight: t("invis.slides.slide3.strongRight"),
                textRight: t("invis.slides.slide3.textRight"),
                img: transparentes,
            },
        ],
        [t]
    );

    const [idx, setIdx] = useState(0);
    const [open, setOpen] = useState(false);

    const s = slides[idx];
    const next = () => setIdx((i) => (i + 1) % slides.length);
    const prev = () => setIdx((i) => (i - 1 + slides.length) % slides.length);

    const waHref =
        typeof window !== "undefined" && window.WA_URL ? window.WA_URL : "#";

    useEffect(() => {
        const onKey = (e) => {
            if (open && e.key === "Escape") return setOpen(false);
            if (!open && (e.key === "ArrowRight" || e.key === "Right")) next();
            if (!open && (e.key === "ArrowLeft" || e.key === "Left")) prev();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open]);

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    return (
        <section className="relative bg-[#dfeaf5] py-4 text-[#0b1b2b] sm:py-6">
            <div className="mx-auto max-w-6xl px-3 sm:px-4">
                {/* Slide container */}
                <div className="relative isolate overflow-hidden rounded-2xl min-h-[440px] sm:min-h-[500px]">
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={idx}
                            src={s.img}
                            alt={s.title}
                            initial={{ scale: 1.03, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 1.02, opacity: 0 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="absolute inset-0 h-full w-full object-cover object-[30%_center]"
                        />
                    </AnimatePresence>

                    {/* overlays */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0b1b2b]/75 via-[#0b1b2b]/20 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-l from-[#0b1b2b]/50 to-transparent" />

                    {/* main content */}
                    <div className="relative z-10 grid h-full grid-rows-[1fr]">
                        <div className="grid h-full items-center gap-4 p-4 sm:p-6 lg:grid-cols-[1fr_1fr]">
                            {/* left column */}
                            <div className="max-w-xl text-white">
                                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] tracking-[.35em] text-[#f1caa6] backdrop-blur-md">
                                    <span className="h-1.5 w-1.5 rounded-full bg-[#f1caa6]" />
                                    {s.overline}
                                </div>

                                {/* ↓ móvil: fuente un poco más chica y SIN nowrap; desktop igual */}
                                <h2 className="mt-3 inline-block text-[26px] sm:text-[34px] md:text-5xl font-semibold leading-tight relative whitespace-normal sm:whitespace-nowrap">
                                    <span className="golden-sweep">{s.title}</span>
                                    <span className="absolute left-0 right-0 -bottom-2 h-[2px] rounded bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b]" />
                                </h2>

                                <p className="mt-2 text-[15px] leading-7 text-white/90">
                                    {s.subLeft}
                                </p>

                                {/* buttons */}
                                {/* ↓ móvil: ancho total y botones 50/50; desktop como estaba */}
                                <div className="mt-4 w-full sm:w-[430px] max-w-[calc(100vw-2rem)] mx-auto sm:mx-0">
                                    <div className="flex items-center justify-between gap-2 sm:gap-3">
                                        <a
                                            href={waHref}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 sm:w-[210px] rounded-full bg-white px-4 py-2.5 text-center text-sm font-semibold text-[#0b1b2b] shadow-sm transition hover:brightness-95"
                                        >
                                            {t("invis.cta_whatsapp")}
                                        </a>
                                        <button
                                            onClick={() => setOpen(true)}
                                            className="flex-1 sm:w-[210px] rounded-full border border-white/40 bg-white/10 px-4 py-2.5 text-center text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
                                        >
                                            {t("invis.cta_demo")}
                                        </button>
                                    </div>

                                </div>
                            </div>

                            <div className="max-w-sm justify-self-end text-white" />
                        </div>
                    </div>

                    {/* bottom card */}
                    {/* ↓ móvil: usar left & right para que no se corte; desktop igual */}
                    <div className="pointer-events-auto absolute z-20 left-3 right-3 bottom-4 sm:left-6 sm:right-auto">
                        <div className="w-full sm:w-[430px] max-w-[calc(100vw-2rem)] rounded-xl border border-white/40 bg-white/30 px-4 py-3 text-center text-[14px] font-medium text-[#0b1b2b] backdrop-blur-md shadow-[0_6px_20px_rgba(0,0,0,.08)]">
                            <span className="font-semibold italic underline decoration-[#0b1b2b]/25 underline-offset-[6px]">
                                {s.strongRight}
                            </span>{" "}
                            {s.textRight}
                        </div>
                    </div>
                </div>

                {/* controls */}
                <div className="mt-1.5 flex items-center justify-center gap-4">
                    <button
                        aria-label={t("invis.controls.prev")}
                        onClick={prev}
                        className="rounded-full p-1.5 outline-none transition hover:scale-105 focus-visible:ring-2 focus-visible:ring-[#edb791]"
                    >
                        <Arrow />
                    </button>

                    <div className="flex items-center justify-center gap-3">
                        {slides.map((_, i) => {
                            const active = i === idx;
                            return (
                                <button
                                    key={i}
                                    aria-label={t("invis.controls.goTo", { n: i + 1 })}
                                    onClick={() => setIdx(i)}
                                    className={[
                                        "relative inline-flex items-center justify-center rounded-full transition",
                                        active
                                            ? "h-2.5 w-8 bg-[#edb791]"
                                            : "h-2.5 w-5 bg-[#cfd9e6] hover:bg-[#e0e7f0]",
                                    ].join(" ")}
                                >
                                    {active && (
                                        <span className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-[#edb791]/40" />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    <button
                        aria-label={t("invis.controls.next")}
                        onClick={next}
                        className="rotate-180 rounded-full p-1.5 outline-none transition hover:scale-105 focus-visible:ring-2 focus-visible:ring-[#edb791]"
                    >
                        <Arrow />
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {open && (
                    <motion.button
                        type="button"
                        aria-label={t("invis.controls.close")}
                        onClick={() => setOpen(false)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4"
                    >
                        <motion.div
                            onClick={(e) => e.stopPropagation()}
                            initial={{ y: 14, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 10, opacity: 0 }}
                            className="w-full max-w-3xl overflow-hidden rounded-xl bg-white text-[#0b1b2b] shadow-2xl"
                        >
                            <div className="aspect-video bg-[#0b1b2b]/5">
                                <iframe
                                    className="h-full w-full"
                                    src="https://www.youtube.com/embed/p_q0G4GhMnI?rel=0"
                                    title={t("invis.iframeTitle")}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                />
                            </div>
                            <div className="flex items-center justify-between p-3">
                                <div>
                                    <h4 className="text-base font-semibold">
                                        {t("invis.modal.title")}
                                    </h4>
                                    <p className="text-sm text-[#0b1b2b]/70">
                                        {t("invis.modal.subtitle")}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setOpen(false)}
                                    className="rounded-full border border-[#0b1b2b]/20 px-3 py-1 text-sm hover:bg-[#0b1b2b]/5"
                                >
                                    {t("invis.controls.close")}
                                </button>
                            </div>
                        </motion.div>
                    </motion.button>
                )}
            </AnimatePresence>

            <style>{`
        .golden-sweep{
          color: transparent;
          background-image: linear-gradient(90deg,#c89b7b 0%,#e4b892 20%,#f4d3b3 35%,#e4b892 60%,#c89b7b 100%);
          background-size: 250% 100%;
          background-clip: text; -webkit-background-clip: text;
          position: relative; display: inline-block;
          animation: goldSweep 3.2s linear infinite;
        }
        @media (prefers-reduced-motion: reduce){ .golden-sweep{ animation: none; background-size: 100% 100%; } }
        @keyframes goldSweep {
          0% { background-position: 0% 50%; filter: drop-shadow(0 0 0 rgba(228,184,146,0)); }
          45% { filter: drop-shadow(0 0 4px rgba(228,184,146,.35)); }
          100% { background-position: 200% 50%; filter: drop-shadow(0 0 0 rgba(228,184,146,0)); }
        }
      `}</style>
        </section>
    );
}




function Arrow() {
    return (
        <svg viewBox="0 0 24 24" className="h-6 w-6 text-[#edb791] drop-shadow" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M15 19l-7-7 7-7" />
        </svg>
    );
}

// ==== Locations / Tabs ====


function LocationsTabs() {
    const { t } = useTranslation("home");

    const MAP_HEIGHT = 330;

    const tabs = useMemo(
        () => ({
            "Dental City": {
                query: "Dental City By Dra. Linda Argote, Zapopan, Jalisco",
                address:
                    "Avenida Santa Margarita 4410, Jardín Real, 45136 Zapopan, Jal.",
                phones: ["33 3832 3296", "33 3832 3175"],
                whatsapp: "33 3308 7833",
                socials: [
                    { key: "facebook", label: "Facebook", href: "https://www.facebook.com/DentalCityOficial/", icon: FacebookIcon },
                    { key: "instagram", label: "Instagram", href: "https://www.instagram.com/dentalcity_oficial/", icon: InstagramIcon },
                    { key: "whatsapp", label: "WhatsApp", href: WA_URL, icon: WhatsAppIcon },
                ],
                schedule: [
                    { day: "Lunes - Viernes", time: "9:00 - 20:00" },
                    { day: "Sábado", time: "9:00 - 15:00" },
                    { day: "Domingo", time: "Cerrado", closed: true },
                ],
                holidays: [
                    { day: "24 de diciembre", closed: true },
                    { day: "25 de diciembre", closed: true },
                    { day: "1 de enero", closed: true },
                ],
            },
            "Dental City Kids & Family": {
                query: "Dental City Kids & Family, Zapopan, Jalisco",
                address:
                    "Av. General Ramón Corona 2401, San Juan de Ocotán, 45019 Zapopan, Jal.",
                phones: ["33 3805 3232", "33 3624 3236"],
                whatsapp: "33 1969 9222",
                socials: [
                    { key: "doctoralia", label: "Doctoralia", href: "https://www.doctoralia.com.mx/clinicas/dental-city-kids-family-square-center", icon: DoctoraliaIcon },
                    { key: "instagram", label: "Instagram", href: "https://www.instagram.com/dentalcity_kids/", icon: InstagramIcon },
                    { key: "whatsapp", label: "WhatsApp", href: WA_URL, icon: WhatsAppIcon },
                ],
                schedule: [
                    { day: "Lunes - Viernes", time: "9:00 - 20:00" },
                    { day: "Sábado", time: "9:00 - 15:00" },
                    { day: "Domingo", time: "Cerrado", closed: true },
                ],
                holidays: [
                    { day: "24 de diciembre", closed: true },
                    { day: "25 de diciembre", closed: true },
                    { day: "1 de enero", closed: true },
                ],
            },
        }),
        []
    );

    const [tab, setTab] = useState("Dental City");
    const [copied, setCopied] = useState(false);

    const mapEmbedSrc = (q) => `https://www.google.com/maps?q=${encodeURIComponent(q)}&output=embed`;
    const mapOpenLink = (q) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

    const telHref = useMemo(() => {
        const first = (tabs[tab]?.phones?.[0] || "").replace(/\D/g, "");
        const withCountry = first.startsWith("52") ? first : `52${first}`;
        return `tel:+${withCountry}`;
    }, [tab, tabs]);

    const normalizeMx = useCallback((rawNumber) => {
        const digits = String(rawNumber || "").replace(/\D/g, "");
        if (digits.startsWith("521")) return digits;
        if (digits.startsWith("52")) return "521" + digits.slice(2);
        if (digits.length === 10) return "521" + digits;
        return "521" + digits;
    }, []);

    const buildWaLink = useCallback((rawNumber, msg) => {
        const intl = normalizeMx(rawNumber);
        const text = encodeURIComponent(msg || "");
        return `https://api.whatsapp.com/send?phone=${intl}&text=${text}`;
    }, [normalizeMx]);

    const buildWaLinkNoText = useCallback((rawNumber) => {
        const intl = normalizeMx(rawNumber);
        return `https://api.whatsapp.com/send?phone=${intl}`;
    }, [normalizeMx]);

    const waHref = useMemo(() => {
        const msg = tab === "Dental City"
            ? t("locations.msg.dc")
            : t("locations.msg.kids");
        return buildWaLink(tabs[tab]?.whatsapp, msg);
    }, [tab, tabs, buildWaLink, t]);

    const waHrefNoText = useMemo(() => {
        return buildWaLinkNoText(tabs[tab]?.whatsapp);
    }, [tab, tabs, buildWaLinkNoText]);

    const copy = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
        } catch {
            const ta = document.createElement("textarea");
            ta.value = text;
            ta.style.position = "fixed";
            ta.style.opacity = "0";
            document.body.appendChild(ta);
            ta.focus();
            ta.select();
            try {
                document.execCommand && document.execCommand("copy");
            } finally {
                document.body.removeChild(ta);
            }
            setCopied(true);
        } finally {
            setTimeout(() => setCopied(false), 1200);
        }
    };

    const active = tabs[tab];

    const rightCardRef = useRef(null);
    const [rightHeight, setRightHeight] = useState(0);
    const [isMdUp, setIsMdUp] = useState(() =>
        typeof window !== "undefined"
            ? window.matchMedia("(min-width: 768px)").matches
            : true
    );

    useEffect(() => {
        try {
            const saved = sessionStorage.getItem("initialTab");
            if (saved && tabs[saved]) {
                setTab(saved);
                sessionStorage.removeItem("initialTab");
            }
        } catch { }
        const onSelect = (e) => {
            const k = e.detail;
            if (k && tabs[k]) setTab(k);
        };
        window.addEventListener("select-location-tab", onSelect);
        return () => window.removeEventListener("select-location-tab", onSelect);
    }, [tabs]);

    useEffect(() => {
        const mq = window.matchMedia("(min-width: 768px)");
        const onMQ = (e) => setIsMdUp(e.matches);
        mq.addEventListener?.("change", onMQ);
        setIsMdUp(mq.matches);
        return () => mq.removeEventListener?.("change", onMQ);
    }, []);

    useEffect(() => {
        if (!rightCardRef.current) return;
        const measure = () => {
            const rect = rightCardRef.current.getBoundingClientRect();
            setRightHeight(Math.max(0, Math.round(rect.height)));
        };
        const ro = new ResizeObserver(() => requestAnimationFrame(measure));
        ro.observe(rightCardRef.current);
        window.addEventListener("resize", measure);
        measure();
        return () => {
            ro.disconnect();
            window.removeEventListener("resize", measure);
        };
    }, [tab]);

    const leftTopRef = useRef(null);
    const [mapHeight, setMapHeight] = useState(MAP_HEIGHT);
    useEffect(() => {
        const el = leftTopRef.current;
        if (!el) return;
        const measure = () => {
            const rect = el.getBoundingClientRect();
            setMapHeight(Math.max(MAP_HEIGHT, Math.round(rect.height)));
        };
        const ro = new ResizeObserver(() => requestAnimationFrame(measure));
        ro.observe(el);
        window.addEventListener("resize", measure);
        measure();
        return () => {
            ro.disconnect();
            window.removeEventListener("resize", measure);
        };
    }, [tab]);

    return (
        <section id="ubicacion" className="bg-[#0f2237] py-20">
            <Container>
                <div className="text-center">
                    <div className="text-xs tracking-[0.35em] text-white/50">
                        {t("locations.eyebrow")}
                    </div>
                    <h2 className="mt-3 inline-block text-3xl font-semibold md:text-4xl relative">
                        <span className="golden-sweep">{t("locations.title")}</span>
                        <span className="absolute left-0 right-0 -bottom-2 h-[2px] rounded bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b]" />
                    </h2>
                </div>

                <div className="mx-auto mt-8 max-w-5xl rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_10px_30px_rgba(0,0,0,.25)] backdrop-blur">
                    <div className="flex flex-wrap gap-2">
                        {Object.keys(tabs).map((k) => {
                            const isActive = k === tab;
                            return (
                                <button
                                    key={k}
                                    onClick={() => setTab(k)}
                                    className={[
                                        "relative rounded-full px-5 py-2 text-sm transition border",
                                        isActive
                                            ? "border-white/30 bg-white text-[#0b1b2b] shadow-sm"
                                            : "border-white/10 bg-white/5 text-white hover:bg-white/10",
                                    ].join(" ")}
                                >
                                    {k}
                                    {isActive && (
                                        <span className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-[#d8a07b]/40" />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    <div className="mt-6">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <h4 className="text-2xl font-semibold tracking-wide">{tab}</h4>
                            <div className="inline-flex items-center gap-2 rounded-full border border-[#e4b89233] bg-white/5 px-3 py-1.5 text-xs text-white/90">
                                <span className="text-[#e4b892]">{t("locations.labels.whatsapp")}:</span>
                                <span className="opacity-90">{active.whatsapp}</span>
                            </div>
                        </div>

                        <p className="mt-2 text-[15px]">
                            <span className="text-[#e4b892] font-semibold">{t("locations.labels.phones")}:</span>{" "}
                            <span className="text-white/85">{active.phones.join(" · ")}</span>
                        </p>

                        <div className="mt-3 h-[2px] w-full overflow-hidden rounded bg-white/10">
                            <div className="h-full w-full animate-[shine_3.6s_linear_infinite] bg-gradient-to-r from-transparent via-[#e4b892] to-transparent" />
                        </div>
                    </div>

                    <div className="mt-7 grid items-stretch gap-8 md:grid-cols-2">
                        <div
                            ref={leftTopRef}
                            className="relative flex flex-col rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.03] p-5"
                            style={{ minHeight: MAP_HEIGHT }}
                        >
                            <span className="pointer-events-none absolute left-3 top-3 h-[10px] w-[2px] rounded bg-[#e4b89266]" />
                            <span className="pointer-events-none absolute left-3 top-3 h-[2px] w-[10px] rounded bg-[#e4b89266]" />
                            <span className="pointer-events-none absolute right-3 bottom-3 h-[10px] w-[2px] rounded bg-[#e4b89266]" />
                            <span className="pointer-events-none absolute right-3 bottom-3 h-[2px] w-[10px] rounded bg-[#e4b89266]" />

                            <div className="mb-3 flex items-center gap-2">
                                <ClockIcon />
                                <h5 className="text-base font-semibold">{t("locations.labels.schedule")}</h5>
                            </div>

                            <ul className="relative ml-2 mt-2 pr-1 flex-1">
                                <span className="absolute left-2 top-0 h-full w-[2px] rounded bg-white/10" />
                                {active.schedule.map((s, i) => (
                                    <li key={i} className="relative mb-3 pl-8">
                                        <span className="absolute left-0 top-2 block h-3 w-3 rounded-full bg-[#d8a07b] shadow-[0_0_0_2px_rgba(216,160,123,.25)]" />
                                        <div className="flex items-center justify-between gap-3 rounded-xl bg-white/5 px-4 py-3 ring-1 ring-white/10">
                                            <span className="text-[15px] text-white/90">{s.day}</span>
                                            {s.closed ? (
                                                <span className="rounded-full bg-red-500/15 px-3 py-1.5 text-xs font-semibold text-red-300">
                                                    {t("locations.labels.closed")}
                                                </span>
                                            ) : (
                                                    <span className="relative grid place-items-center whitespace-nowrap px-3 py-1.5 text-xs font-semibold text-green-300 rounded-full bg-green-500/15 leading-[1] md:leading-normal">

                                                    <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-green-300/25" />
                                                    {s.time}
                                                </span>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <a
                                    href={waHref}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="order-1 sm:order-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-sm font-semibold text-[#0b1b2b] transition hover:brightness-110"
                                >
                                    <WhatsAppIcon />
                                    {t("locations.cta.whatsapp")}
                                </a>

                                <a
                                    href={telHref}
                                    className="order-2 sm:order-1 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm text-white/90 transition hover:border-[#e4b89266] hover:bg-white/10"
                                >
                                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.77.63 2.61a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.47-1.15a2 2 0 0 1 2.11-.45c.84.3 1.71.51 2.61.63A2 2 0 0 1 22 16.92Z" />
                                    </svg>
                                    {t("locations.cta.call")}
                                </a>
                            </div>
                        </div>

                        <div
                            className="overflow-hidden rounded-2xl border border-white/10 bg-black/10 shadow-[0_10px_25px_rgba(0,0,0,.25)]"
                            style={{ height: mapHeight }}
                        >
                            <iframe
                                title={t("locations.mapTitle", { name: tab })}
                                src={mapEmbedSrc(active.query)}
                                className="h-full w-full"
                                loading="lazy"
                                allowFullScreen
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>

                        <div
                            className="relative flex flex-col rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.03] p-5"
                            style={isMdUp && rightHeight ? { height: `${rightHeight}px` } : undefined}
                        >
                            <div className="mb-3 flex items-center gap-2">
                                <HolidayIcon />
                                <h5 className="text-base font-semibold">{t("locations.labels.holidays")}</h5>
                            </div>

                            <ul className="relative ml-2 mt-2 flex-1 overflow-visible pr-1">
                                <span className="absolute left-2 top-0 h-full w-[2px] rounded bg-white/10" />
                                {active.holidays.map((h, i) => (
                                    <li key={i} className="relative mb-3 pl-8">
                                        <span className="absolute left-0 top-2 block h-3 w-3 rounded-full bg-[#edb791] shadow-[0_0_0_2px_rgba(237,183,145,.25)]" />
                                        <div className="flex items-center justify-between gap-3 rounded-xl bg-white/5 px-4 py-3 ring-1 ring-white/10">
                                            <span className="text-[15px] text-white/90">{h.day}</span>
                                            {h.closed ? (
                                                <span className="rounded-full bg-red-500/15 px-3 py-1.5 text-xs font-semibold text-red-300">{t("locations.labels.closed")}</span>
                                            ) : (
                                                <span className="rounded-full bg-[#d8a07b]/15 px-3 py-1.5 text-xs font-semibold text-[#edb791] shadow-[inset_0_0_0_1px_rgba(216,160,123,.25)]">
                                                    {h.note || t("locations.labels.specialHours")}
                                                </span>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div
                            ref={rightCardRef}
                            className="relative rounded-2xl border border-white/10 bg-white/5 p-4"
                        >
                            <span className="pointer-events-none absolute left-0 top-0 h-[2px] w-6 rounded-r bg-[#e4b89266]" />
                            <span className="pointer-events-none absolute left-0 top-0 h-6 w-[2px] rounded-b bg-[#e4b89266]" />
                            <span className="pointer-events-none absolute right-0 bottom-0 h-[2px] w-6 rounded-l bg-[#e4b89266]" />
                            <span className="pointer-events-none absolute right-0 bottom-0 h-6 w-[2px] rounded-t bg-[#e4b89266]" />

                            <div className="text-xs uppercase tracking-[.2em] text-white/50">{t("locations.labels.address")}</div>
                            <p className="mt-2 text-[15px] leading-relaxed text-white/90">{active.address}</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                <button
                                    onClick={() => copy(active.address)}
                                    className="rounded-full border border-white/20 px-3 py-1.5 text-xs text-white/90 transition hover:border-[#e4b89266] hover:bg-white/10"
                                    title={t("locations.copy.copyAddressTitle")}
                                >
                                    {copied ? t("locations.copy.copied") : t("locations.copy.copy")}
                                </button>
                                <a
                                    href={mapOpenLink(active.query)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1.5 text-xs text-white/90 transition hover:border-[#e4b89266] hover:bg-white/10"
                                >
                                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
                                        <path d="M21 10c0 6-9 12-9 12S3 16 3 10a9 9 0 1 1 18 0Z" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                    {t("locations.cta.viewMaps")}
                                </a>
                            </div>

                            <div className="mt-6 text-xs uppercase tracking-[.2em] text-white/50">{t("locations.labels.followUs")}</div>
                            <p className="mt-2 text-[15px] leading-relaxed text-white/90">
                                {tab === "Dental City"
                                    ? t("locations.follow.dc")
                                    : t("locations.follow.kids")}
                            </p>
                            <div className="mt-3 flex flex-wrap gap-3">
                                {active.socials.map(({ key, label, href, icon: Icon }) => {
                                    const finalHref = key === "whatsapp" ? waHrefNoText : href;
                                    return (
                                        <a
                                            key={key}
                                            href={finalHref}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={label}
                                            className="group flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-2 text-sm text-white/90 transition hover:border-[#e4b89266] hover:bg-white/10"
                                        >
                                            <span className="text-[#e4b892cc] group-hover:drop-shadow-[0_0_6px_rgba(228,184,146,.4)]">
                                                {React.createElement(Icon)}
                                            </span>
                                            <span className="hidden sm:inline">{label}</span>
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>

            <style>{`
        @keyframes shine { 0% { transform: translateX(-100%);} 100% { transform: translateX(100%);} }
        .golden-sweep{
          color: transparent;
          background-image: linear-gradient(90deg, #c89b7b 0%, #e4b892 20%, #f4d3b3 35%, #e4b892 60%, #c89b7b 100%);
          background-size: 250% 100%;
          background-clip: text; -webkit-background-clip: text;
          position: relative; display: inline-block;
          animation: goldSweep 3.2s linear infinite;
        }
        @media (prefers-reduced-motion: reduce){ .golden-sweep{ animation: none; background-size: 100% 100%; } }
        @keyframes goldSweep {
          0% { background-position: 0% 50%; filter: drop-shadow(0 0 0 rgba(228,184,146,0)); }
          45% { filter: drop-shadow(0 0 4px rgba(228,184,146,.35)); }
          100% { background-position: 200% 50%; filter: drop-shadow(0 0 0 rgba(228,184,146,0)); }
        }
      `}</style>
        </section>
    );
}



/* Iconos */
function ClockIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#d8a07b]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
        </svg>
    );
}
function HolidayIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#d8a07b]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
            <path d="M12 14l1.2 2.5 2.8.4-2 2 0.5 2.8-2.5-1.3-2.5 1.3 0.5-2.8-2-2 2.8-.4L12 14z" fill="#d8a07b" stroke="none" transform="translate(0, -1.2)" />
        </svg>
    );
}

function FacebookIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
            <path d="M22 12.06C22 6.48 17.52 2 11.94 2S2 6.48 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H8.4v-2.9h2.04V9.41c0-2.02 1.2-3.14 3.04-3.14.88 0 1.8.16 1.8.16v1.98h-1.01c-.99 0-1.29.62-1.29 1.25v1.5h2.2l-.35 2.9h-1.86V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
        </svg>
    );
}
function InstagramIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
            <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm5 5a5 5 0 1 0 .001 10.001A5 5 0 0 0 12 7Zm6.5-.9a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2ZM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z" />
        </svg>
    );
}
function WhatsAppIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
            <path d="M.5 12C.5 5.9 5.4 1 11.5 1S22.5 5.9 22.5 12 17.6 23 11.5 23c-1.9 0-3.8-.5-5.4-1.5L2 22l.5-4.1A10.4 10.4 0 0 1 .5 12Zm5.8 6.6c1.5.9 3.2 1.4 5.2 1.4 5.7 0 8.9-3.8 8.9-8.9 0-5-3.9-8.9-8.9-8.9-5.1 0-8.9 3.9-8.9 8.9 0 2 .5 3.7 1.4 5.1l-.9 3.3 3.2-.9Zm10-5.1c-.1-.1-.4-.2-.9-.5s-.8-.4-.9.1c-.3.5-.5.6-1 .5-1-.2-1.9-.9-2.6-1.7-.3-.4-.6-.8-.7-1.2-.1-.3 0-.5.2-.7l.3-.4c.2-.2.3-.3.2-.6l-.5-1.2c-.1-.3-.3-.6-.6-.5h-.5c-.2 0-.5.1-.7.4-.7.8-1 1.8-.9 2.9.1 1 .6 2 1.4 2.9 1 .9 2.1 1.6 3.4 1.9 1 .3 2 .2 2.8-.4.2-.2.5-.5.5-.8 0-.3 0-.4-.2-.5Z" />
        </svg>
    );
}
function DoctoraliaIcon() {
    // Marca neutra estilo “estrella/cruz”
    return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
            <path d="M10.5 2h3v6.5H20v3h-6.5V20h-3v-8.5H4v-3h6.5V2Z" />
        </svg>
    );
}





function FAQ() {
    const { t } = useTranslation("home"); // usa el namespace donde guardes estas claves, p. ej. 'home'

    // Cargamos el arreglo de Q&A desde i18n
    const data = t("faq.items", { returnObjects: true });

    const [open, setOpen] = useState(0);

    return (
        <section className="relative bg-[#0b1b2b] py-20">
            {/* filete superior sutil */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] animate-[faqShimmer_6s_linear_infinite] bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b]" />

            <Container>
                <div className="text-center">
                    <div className="text-xs tracking-[0.35em] text-white/50">{t("faq.eyebrow")}</div>

                    {/* Título con luz dorada que barre las letras */}
                    <h2 className="relative mt-3 inline-block text-3xl md:text-4xl font-semibold">
                        <span className="golden-sweep">
                            {t("faq.title")}
                        </span>
                        {/* línea dorada debajo */}
                        <span className="absolute left-0 right-0 -bottom-2 h-[2px] rounded bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b]" />
                    </h2>
                </div>

                {/* Caja del FAQ */}
                <div className="mx-auto mt-10 max-w-3xl overflow-visible rounded-2xl border border-white/10 bg-white/5 p-1 shadow-[0_18px_50px_rgba(0,0,0,.35)] ring-1 ring-white/10">
                    <div className="rounded-2xl bg-gradient-to-br from-[#c89b7b33] via-transparent to-[#e4b89222] p-[1px]">
                        <div className="rounded-2xl bg-[#0f2136]/50 backdrop-blur">
                            {data.map((item, idx) => {
                                const isOpen = open === idx;
                                return (
                                    <motion.div key={idx} initial={false} className="relative overflow-visible">
                                        {idx !== 0 && (
                                            <div className="mx-5 my-2 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                                        )}

                                        <button
                                            onClick={() => setOpen(isOpen ? -1 : idx)}
                                            aria-expanded={isOpen}
                                            className="group relative grid w-full grid-cols-[auto_1fr_auto] items-center gap-3 px-5 py-4 text-left outline-none transition"
                                        >
                                            <span className="relative grid h-5 w-5 place-items-center">
                                                <span className="absolute inset-0 rounded-full bg-[#e4b892]/30 blur-[6px] opacity-60 group-hover:opacity-90 transition-opacity" />
                                                <span className="relative h-2.5 w-2.5 rounded-full bg-[#e4b892] shadow-[0_0_0_2px_rgba(228,184,146,.35)]" />
                                            </span>

                                            <span className="text-[17px] font-medium text-white/90 transition group-hover:text-white">
                                                {item.q}
                                            </span>

                                            <motion.span
                                                aria-hidden
                                                className="ml-2 grid h-6 w-6 place-items-center rounded-full border border-white/15 bg-white/5 text-white/80"
                                                initial={false}
                                                animate={{ rotate: isOpen ? 180 : 0 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M6 9l6 6 6-6" />
                                                </svg>
                                            </motion.span>

                                            <span
                                                aria-hidden
                                                className={[
                                                    "pointer-events-none absolute left-5 right-5 bottom-1 h-[2px] origin-left rounded",
                                                    "bg-gradient-to-r from-transparent via-[#e4b892] to-transparent",
                                                    isOpen ? "scale-x-100 opacity-90" : "scale-x-0 opacity-0",
                                                    "transition-all duration-300",
                                                ].join(" ")}
                                            />
                                        </button>

                                        <AnimatePresence initial={false}>
                                            {isOpen && (
                                                <motion.div
                                                    key="content"
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.28, ease: "easeOut" }}
                                                    className="overflow-hidden px-5"
                                                >
                                                    <motion.div
                                                        initial={{ y: -4 }}
                                                        animate={{ y: 0 }}
                                                        exit={{ y: -4 }}
                                                        className="relative mb-4 mr-1 rounded-xl border border-white/10 bg-white/5 p-4 text-[15px] leading-relaxed text-white/80"
                                                    >
                                                        <span className="pointer-events-none absolute left-3 right-3 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#e4b89288] to-transparent" />
                                                        {item.a}
                                                    </motion.div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </Container>

            {/* keyframes locales */}
            <style>{`
        @keyframes faqShimmer {
          0% { filter: brightness(1); }
          50% { filter: brightness(1.25); }
          100% { filter: brightness(1); }
        }

        .golden-sweep{
          color: transparent;
          background-image:
            linear-gradient(90deg, #c89b7b 0%, #e4b892 20%, #f4d3b3 35%, #e4b892 60%, #c89b7b 100%);
          background-size: 250% 100%;
          background-clip: text;
          -webkit-background-clip: text;
          position: relative;
          display: inline-block;
          animation: goldSweep 3.2s linear infinite;
        }

        @media (prefers-reduced-motion: reduce){
          .golden-sweep{ animation: none; background-size: 100% 100%; }
        }

        @keyframes goldSweep {
          0%   { background-position: 0% 50%;   filter: drop-shadow(0 0 0 rgba(228,184,146,0)); }
          45%  { filter: drop-shadow(0 0 4px rgba(228,184,146,.35)); }
          100% { background-position: 200% 50%; filter: drop-shadow(0 0 0 rgba(228,184,146,0)); }
        }
      `}</style>
        </section>
    );
}




function FloatingCta() {
    const { t } = useTranslation("home");
    const [open, setOpen] = useState(false);
    const wrapRef = useRef(null);

    // ▼ NUEVO: visibilidad condicional (solo móvil después del hero)
    const [isMobile, setIsMobile] = useState(false);
    const [showAfterHero, setShowAfterHero] = useState(true); // en desktop será true siempre

    useEffect(() => {
        const updateIsMobile = () => setIsMobile(window.innerWidth < 640); // sm breakpoint
        updateIsMobile();
        window.addEventListener("resize", updateIsMobile);
        return () => window.removeEventListener("resize", updateIsMobile);
    }, []);

    useEffect(() => {
        if (!isMobile) {
            setShowAfterHero(true); // desktop: siempre visible
            return;
        }
        const onScroll = () => {
            // umbral ~ altura del hero (78vh). Usamos 80% de la ventana como aproximación.
            const threshold = window.innerHeight * 0.8;
            const visible = window.scrollY > threshold;
            setShowAfterHero(visible);
            if (!visible) setOpen(false); // si se oculta, cierra el popover
        };
        onScroll(); // estado inicial
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [isMobile]);

    // Cerrar al hacer clic fuera o con ESC
    useEffect(() => {
        if (!open) return;
        const onDown = (e) => {
            if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
        };
        const onKey = (e) => {
            if (e.key === "Escape") setOpen(false);
        };
        document.addEventListener("mousedown", onDown);
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("mousedown", onDown);
            document.removeEventListener("keydown", onKey);
        };
    }, [open]);

    const go = (tabKey) => {
        try { sessionStorage.setItem("initialTab", tabKey); } catch (err) { void err; }

        // Activa el tab ANTES del scroll
        window.dispatchEvent(new CustomEvent("select-location-tab", { detail: tabKey }));
        setOpen(false);

        // Espera 1–2 frames para que el layout del tab se actualice y luego hace scroll con offset (solo móvil)
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                const el = document.querySelector("#ubicacion");
                if (!el) return;

                const isMobile = window.innerWidth < 640; // sm
                if (isMobile) {
                    const extra = 195; // súbele/bájale (140–200) para ajustar qué tan "abajo" cae
                    const y = el.getBoundingClientRect().top + window.scrollY + extra;
                    window.scrollTo({ top: y, behavior: "smooth" });
                } else {
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                }

                // Evita el salto automático del navegador al cambiar el hash
                if (location.hash !== "#ubicacion") history.replaceState(null, "", "#ubicacion");
            });
        });
    };

    const visible = !isMobile || showAfterHero;

    return (
        <div
            ref={wrapRef}
            className={[
                "fixed bottom-5 right-5 z-50 transition-all duration-300",
                visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-3 pointer-events-none"
            ].join(" ")}
        >
            {/* Botón principal */}
            <motion.button
                onClick={() => setOpen((v) => !v)}
                className="relative rounded-full bg-[#d8a07b] px-6 py-3 text-sm font-semibold text-[#0b1b2b] shadow-xl ring-4 ring-[#d8a07b]/25 transition hover:brightness-105 active:scale-[0.97]"
                aria-haspopup="menu"
                aria-expanded={open}
                animate={{
                    filter: open
                        ? "drop-shadow(0 0 14px rgba(216,160,123,0.7))"
                        : "drop-shadow(0 0 0 rgba(0,0,0,0))",
                }}
                transition={{ duration: 0.35 }}
            >
                {t("hero.book", { defaultValue: "Agendar cita" })}
                <motion.span
                    className="inline-block ml-1"
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                >
                    ▾
                </motion.span>
            </motion.button>

            {/* Backdrop clickeable para cerrar */}
            <AnimatePresence>
                {open && (
                    <motion.button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="fixed inset-0 z-[-1] cursor-default"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        aria-hidden="true"
                    />
                )}
            </AnimatePresence>

            {/* Popover */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.22 }}
                        className="absolute bottom-[110%] right-0 w-[260px] rounded-2xl border border-[#d8a07b]/25 bg-[#11243a]/95 p-2 text-white/90 shadow-2xl backdrop-blur"
                        role="menu"
                    >
                        {/* Caret dorado */}
                        <span className="pointer-events-none absolute -bottom-2 right-6 h-4 w-4 rotate-45 rounded-[4px] bg-[#11243a]/95 border-l border-b border-[#d8a07b]/25" />

                        <button
                            onClick={() => go("Dental City")}
                            className="flex w-full items-center justify-between gap-2 rounded-xl px-4 py-3 text-left transition hover:bg-[#d8a07b]/15"
                            role="menuitem"
                        >
                            <span>Dental City</span>
                            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                        </button>

                        <button
                            onClick={() => go("Dental City Kids & Family")}
                            className="mt-1 flex w-full items-center justify-between gap-2 rounded-xl px-4 py-3 text-left transition hover:bg-[#d8a07b]/15"
                            role="menuitem"
                        >
                            <span>Dental City Kids & Family</span>
                            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}


function FloatingBackToTop() {
    const [visible, setVisible] = React.useState(false);
    const tickingRef = React.useRef(false);

    React.useEffect(() => {
        const onScroll = () => {
            if (!tickingRef.current) {
                tickingRef.current = true;
                requestAnimationFrame(() => {
                    const y = window.scrollY || document.documentElement.scrollTop || 0;
                    setVisible(y > 360); // muestra tras bajar ~360px
                    tickingRef.current = false;
                });
            }
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll(); // estado inicial
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollTop = () => {
        try {
            window.scrollTo({ top: 0, behavior: "smooth" });
        } catch {
            // fallback muy básico
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        }
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.button
                    key="backtotop"
                    onClick={scrollTop}
                    aria-label="Volver arriba"
                    title="Volver arriba"
                    initial={{ opacity: 0, y: 16, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 16, scale: 0.95 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="fixed bottom-5 left-5 z-50 grid h-12 w-12 place-items-center rounded-full 
                     bg-[#d8a07b] text-[#0b1b2b] shadow-xl ring-4 ring-[#d8a07b]/25 
                     hover:brightness-110 active:scale-95"
                >
                    {/* Flecha elegante hacia arriba */}
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 19V5" />
                        <path d="M5 12l7-7 7 7" />
                    </svg>

                    {/* Halo dorado suave (igual lenguaje visual que el resto) */}
                    <span className="pointer-events-none absolute inset-0 rounded-full 
                           bg-[radial-gradient(ellipse_at_center,rgba(228,184,146,0.20),transparent_60%)]" />
                </motion.button>
            )}
        </AnimatePresence>
    );
}


/* =========================
   Dev tests (ligeros)
   ========================= */
function DevTests() {
    useEffect(() => {
        console.assert(typeof document !== "undefined", "Test: document disponible");
    }, []);
    return null;
}

