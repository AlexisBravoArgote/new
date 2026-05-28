// src/components-react/DoctoresContent.jsx
import React, { useMemo, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import TopBar from "./TopBar.jsx";
import Footer from "./Footer.jsx";
import "../i18n";
const __MOTION_USED = Boolean(motion); // eslint-disable-line no-unused-vars

import dc3 from "/assets/DCdoctor3.jpg";
import dc4 from "/assets/DCdoctor4.jpg";
import dc5 from "/assets/DCdoctor5.jpg";
import dc6 from "/assets/DCdoctor6.jpg";
import dc7 from "/assets/DCdoctor7.jpg";
import dc8 from "/assets/DCdoctor8.jpg";
import dc9 from "/assets/DCdoctor9.jpg";
import dc10 from "/assets/DCdoctor10.jpg";
import dc11 from "/assets/DCdoctor11.jpg";
import dc12 from "/assets/DCdoctor12.jpg";
import dc13 from "/assets/DCdoctor13.jpg";
import dc14 from "/assets/DCdoctor14.jpg";
import dc15 from "/assets/DCdoctor15.jpg";
import dc16 from "/assets/DCdoctor16.jpg";
import dc17 from "/assets/DCdoctor17.jpg";
import dc18 from "/assets/DCdoctor18.jpg";
import dc19 from "/assets/DCdoctor19.jpg";
import dc20 from "/assets/DCdoctor20.jpg";
import dc21 from "/assets/DCdoctor21.jpg";
import dc22 from "/assets/DCdoctor22.jpg";
import dc23 from "/assets/DCdoctor23.jpg";

import dc25 from "/assets/DCdoctor25.jpg";
import dc26 from "/assets/DCdoctor26.jpg";
import dc27 from "/assets/DCdoctor27.jpg";
import dc28 from "/assets/DCdoctor28.jpg";
import dc29 from "/assets/DCdoctor29.jpg";
import kids0 from "/assets/kids0.jpg";
import kids2 from "/assets/kids2.jpg";
import kids3 from "/assets/kids3.jpg";
import kids4 from "/assets/kids4.jpg";
import kids5 from "/assets/kids5.jpg";
import kids6 from "/assets/kids6.jpg";
import kids7 from "/assets/kids7.jpg";
import kids8 from "/assets/kids8.jpg";
import kids9 from "/assets/kids9.jpg";
import kids10 from "/assets/kids10.jpg";
import kids11 from "/assets/kids11.jpg";
import kids12 from "/assets/kids12.jpg";
import kids13 from "/assets/kids13.jpg";
import kids14 from "/assets/kids14.jpg";
import kids15 from "/assets/kids15.jpg";
import kids16 from "/assets/kids16.jpg";
import kids17 from "/assets/kids17.jpg";
import kids18 from "/assets/kids18.jpg";
import kids19 from "/assets/kids19.jpg";
import kids20 from "/assets/kids20.jpg";
import kids21 from "/assets/kids21.jpg";
import kids22 from "/assets/kids22.jpg";

/* ----------------------------- Helpers UI ----------------------------- */
function Container({ children, className = "" }) {
    return (
        <div className={`mx-auto w-full max-w-6xl px-6 md:px-8 ${className}`}>
            {children}
        </div>
    );
}
function Eyebrow({ children }) {
    return (
        <span className="inline-flex items-center gap-2 rounded-full border border-[#e4b89233] bg-white/5 px-2 py-1 md:px-3 text-[10px] md:text-[11px] tracking-[.15em] md:tracking-[.35em] text-[#e4b892] whitespace-nowrap">
            {children}
        </span>
    );
}
function SectionTitle({ eyebrow, title, center = true, className = "" }) {
    return (
        <div className={`${center ? "text-center" : ""} ${className}`}>
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            <h2 className="mt-4 text-3xl md:text-4xl font-semibold">
                <span className="relative inline-block">
                    {title}
                    <span className="absolute left-0 right-0 -bottom-2 h-[2px] rounded bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b]" />
                </span>
            </h2>
        </div>
    );
}

/* ----------------------------- Carousel ----------------------------- */
function Carousel({
    images = [],
    ariaLabel = "gallery",
    autoPlay = true,
    duration = 7000,
    prevLabel = "Previous",
    nextLabel = "Next",
}) {
    const [i, setI] = useState(0);
    const n = images.length || 1;
    const [progress, setProgress] = useState(0);
    const [hovering, setHovering] = useState(false);

    const tickIdRef = useRef(null);
    const startRef = useRef(Date.now());
    const pausedUntilRef = useRef(0);

    const railRef = useRef(null);

    const clearTick = () => {
        if (tickIdRef.current) {
            clearInterval(tickIdRef.current);
            tickIdRef.current = null;
        }
    };

    const resetCycle = () => {
        startRef.current = Date.now();
        setProgress(0);
    };

    const pauseAutoplay = (ms = Math.max(1200, Math.floor(duration * 0.75))) => {
        pausedUntilRef.current = Date.now() + ms;
    };

    const go = (dir) => {
        setI((prev) => (prev + dir + n) % n);
        pauseAutoplay();
        resetCycle();
    };

    const set = (idx) => {
        setI(idx);
        pauseAutoplay();
        resetCycle();
    };

    useEffect(() => {
        clearTick();
        if (!autoPlay || n <= 1) return;

        startRef.current = Date.now();
        setProgress(0);

        tickIdRef.current = setInterval(() => {
            const now = Date.now();
            if (hovering || now < pausedUntilRef.current) return;

            const elapsed = now - startRef.current;
            if (elapsed >= duration) {
                setI((prev) => (prev + 1) % n);
                startRef.current = now;
                setProgress(0);
            } else {
                setProgress((elapsed / duration) * 100);
            }
        }, 100);

        return clearTick;
    }, [autoPlay, duration, n, hovering]);

    useEffect(() => {
        const rail = railRef.current;
        if (!rail) return;
        const item = rail.querySelector(`#thumb-${i}`);
        if (!item) return;

        const railRect = rail.getBoundingClientRect();
        const itemRect = item.getBoundingClientRect();

        const fullyVisible =
            itemRect.left >= railRect.left && itemRect.right <= railRect.right;
        if (fullyVisible) return;

        const itemCenter = item.offsetLeft + item.offsetWidth / 2;
        const target = itemCenter - rail.clientWidth / 2;
        rail.scrollTo({ left: target, behavior: "smooth" });
    }, [i]);

    return (
        <>
            <div
                className="group"
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => {
                    setHovering(false);
                    resetCycle();
                }}
                aria-label={ariaLabel}
            >
                {/* Principal */}
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[.04] shadow-[0_18px_50px_rgba(0,0,0,.35)]">
                    <div
                        className="flex transition-transform duration-500 ease-out"
                        style={{ transform: `translateX(-${i * 100}%)` }}
                    >
                        {images.map((img, idx) => (
                            <div key={idx} className="relative min-w-full">
                                <div className="relative w-full h-[60vh] md:h-auto md:max-h-[80vh] bg-[#0f2237] flex items-center justify-center">
                                    {img.src ? (
                                        <img
                                            src={img.src}
                                            alt={img.alt || "Imagen"}
                                            className="w-full h-full object-cover md:w-auto md:h-auto md:max-h-[80vh] md:object-contain"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_35%,rgba(255,255,255,0.08),transparent_60%)]" />
                                    )}
                                </div>


                                <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b]" />

                                {n > 1 && (
                                    <div className="absolute bottom-3 right-3 rounded-full bg-[#0d2034]/70 border border-white/20 px-3 py-1 text-[12px] text-white/90 backdrop-blur">
                                        {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Flechas */}
                    {n > 1 && (
                        <>
                            <button
                                type="button"
                                onClick={() => go(-1)}
                                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-[#0d2034]/70 p-2 backdrop-blur hover:bg-[#0d2034]/90"
                                aria-label={prevLabel}
                                title={prevLabel}
                            >
                                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M15 18l-6-6 6-6" />
                                </svg>
                            </button>
                            <button
                                type="button"
                                onClick={() => go(1)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-[#0d2034]/70 p-2 backdrop-blur hover:bg-[#0d2034]/90"
                                aria-label={nextLabel}
                                title={nextLabel}
                            >
                                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M9 18l6-6-6-6" />
                                </svg>
                            </button>
                        </>
                    )}

                    {/* Progreso */}
                    {autoPlay && n > 1 && (
                        <div className="absolute bottom-0 left-0 right-0 h-[6px]">
                            <div className="mx-6 mb-3 h-[6px] rounded-full bg-white/15 backdrop-blur-sm">
                                <div
                                    className="h-[6px] rounded-full bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b] transition-[width] duration-100 ease-linear"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Miniaturas */}
                {n > 1 && (
                    <div className="mt-4 flex items-center justify-center">
                        <div ref={railRef} className="thumb-rail flex gap-2 overflow-x-auto px-4 py-1">
                            {images.map((img, idx) => {
                                const selected = i === idx;
                                return (
                                    <button
                                        key={idx}
                                        id={`thumb-${idx}`}
                                        type="button"
                                        onMouseDown={(e) => e.preventDefault()}
                                        tabIndex={-1}
                                        onClick={() => set(idx)}
                                        className={`relative shrink-0 transition-all duration-300 ${selected ? "scale-105" : "opacity-80 hover:opacity-100 hover:scale-105"
                                            }`}
                                        aria-label={(img.alt || "Imagen") + ` ${idx + 1}`}
                                        title={(img.alt || "Imagen") + ` ${idx + 1}`}
                                    >
                                        <div
                                            className={`rounded-2xl p-[2px] ${selected
                                                ? "bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b]"
                                                : "bg-white/20"
                                                }`}
                                        >
                                            <div className="rounded-[14px] overflow-hidden bg-[#0f2237]/90">
                                                <img
                                                    src={img.src}
                                                    alt={img.alt || `Miniatura ${idx + 1}`}
                                                    className="h-16 w-24 md:h-20 md:w-28 object-cover"
                                                />
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            {/* Ocultar scrollbar */}
            <style>{`
        .thumb-rail { -ms-overflow-style: none; scrollbar-width: none; overscroll-behavior-x: contain; }
        .thumb-rail::-webkit-scrollbar { display: none; }
      `}</style>
        </>
    );
}

/* ============================ P�gina ============================ */
export default function Doctores() {
    const { t, i18n } = useTranslation();

    // Title
    useEffect(() => {
        const title = t("metaTitle", { defaultValue: "Nuestros doctores | Dental City" });
        document.title = title;
    }, [t]);

    // Structured Data para Medical Organization
    const medicalOrgData = {
        "@context": "https://schema.org",
        "@type": "MedicalOrganization",
        "name": "Dental City",
        "description": "Cl�nica dental con m�s de 25 a�os de experiencia. Contamos con 29 dentistas especializados en todas las �reas de odontolog�a.",
        "url": "https://dentalcity.mx/doctores",
        "medicalSpecialty": [
            "Orthodontics",
            "General Dentistry",
            "Pediatric Dentistry",
            "Periodontics",
            "Endodontics",
            "Oral Surgery",
            "Cosmetic Dentistry",
            "Dental Implants"
        ],
        "numberOfEmployees": {
            "@type": "QuantitativeValue",
            "value": "29"
        }
    };

    // ---------- Selector de idioma (??) ----------
    const [openLang, setOpenLang] = useState(false);
    const langWrapRef = useRef(null);
    useEffect(() => {
        const onDocClick = (e) => {
            if (langWrapRef.current && !langWrapRef.current.contains(e.target)) setOpenLang(false);
        };
        const onKey = (e) => e.key === "Escape" && setOpenLang(false);
        document.addEventListener("mousedown", onDocClick);
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("mousedown", onDocClick);
            document.removeEventListener("keydown", onKey);
        };
    }, []);

    const languages = [
        { code: "es", flag: "????", label: "Espa�ol" },
        { code: "en", flag: "????", label: "English" },
        { code: "fr", flag: "????", label: "Fran�ais" },
        { code: "zh", flag: "????", label: "??" },
        { code: "ja", flag: "????", label: "???" },
        { code: "ko", flag: "????", label: "???" },
        { code: "it", flag: "????", label: "Italiano" },
        { code: "de", flag: "????", label: "Deutsch" },
    ];

    const changeLang = async (code) => {
        await i18n.changeLanguage(code);
        localStorage.setItem("lang", code);
        setOpenLang(false);
    };

    // Bot�n + men� de idioma (TOP-RIGHT; m�vil mitad de tama�o)
    // dentro del componente Doctores()
    const LanguageBoutique = () => (
        <div
            ref={langWrapRef}
            // M�vil un poquito m�s a la derecha; desktop como antes
            className="fixed top-2 right-1 md:top-4 md:right-4 z-[90]"
        >
            <button
                type="button"
                onClick={() => setOpenLang((v) => !v)}
                className="
        // --- Estilos M�VIL (solo el emoji, sin c�rculo) ---
        p-0 border-0 bg-transparent shadow-none
        // --- Estilos DESKTOP (lo mismo que ten�as) ---
        md:p-3 md:inline-flex md:items-center md:justify-center md:rounded-full md:border
        md:border-[#e4b89240] md:bg-[#0b1b2b99] md:backdrop-blur-md md:text-white
        md:shadow-[0_8px_30px_rgba(0,0,0,0.45)]
        md:hover:brightness-110 md:active:scale-[0.98] md:transition-all
      "
                aria-haspopup="menu"
                aria-expanded={openLang}
                aria-label={t('languageLabel', { defaultValue: 'Language' })}
                title={t('languageLabel', { defaultValue: 'Language' })}
            >
                {/* Emoji globo: m�vil m�s peque�o; desktop como antes */}
                <span
                    aria-hidden="true"
                    className="select-none leading-none translate-y-[1px] text-[18px] md:text-[20px]"
                >
                    ??
                </span>
            </button>

            {openLang && (
                <div
                    role="menu"
                    className="
          mt-2 w-[220px] md:w-[300px]
          rounded-2xl border border-[#e4b89233] bg-[#11243a]/95 text-white/90
          backdrop-blur-xl shadow-[0_18px_50px_rgba(0,0,0,.55)] p-2
        "
                >
                    <div className="grid grid-cols-2 gap-2">
                        {languages.map((it) => {
                            const active = i18n.language?.startsWith(it.code);
                            return (
                                <button
                                    key={it.code}
                                    type="button"
                                    onClick={() => changeLang(it.code)}
                                    className={`flex items-center gap-2 rounded-xl px-3 py-2 text-left
                  hover:bg-white/10 transition
                  ${active ? "bg-white/10 ring-1 ring-[#e4b89266]" : ""}`}
                                    role="menuitem"
                                    aria-label={it.label}
                                    title={it.label}
                                >
                                    <span className="text-sm md:text-lg">{it.flag}</span>
                                    <span className="text-[12px] md:text-sm opacity-90">{it.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );


    // ---------- Im�genes con alts localizados ----------
    const imagesDC = useMemo(
        () => [
            { src: dc3, alt: t("altTech") },
            { src: dc4, alt: t("altTech") },
            { src: dc5, alt: t("altTech") },
            { src: dc6, alt: t("altTech") },
            { src: dc7, alt: t("altTech") },
            { src: dc23, alt: t("altTech") },
            { src: dc8, alt: t("altTech") },
            { src: dc9, alt: t("altTech") },
            { src: dc22, alt: t("altTech") },
            { src: dc10, alt: t("altTech") },
            { src: dc11, alt: t("altTech") },
            { src: dc12, alt: t("altTech") },
            { src: dc13, alt: t("altTech") },
            { src: dc14, alt: t("altTech") },
            { src: dc15, alt: t("altTech") },
            { src: dc16, alt: t("altTech") },
            { src: dc17, alt: t("altTech") },
            { src: dc18, alt: t("altTech") },
            { src: dc19, alt: t("altTech") },
            { src: dc20, alt: t("altTech") },
            { src: dc21, alt: t("altTech") },
            { src: dc22, alt: t("altTech") },
            
            { src: dc25, alt: t("altTech") },
            { src: dc26, alt: t("altTech") },
            { src: dc27, alt: t("altTech") },
            { src: dc28, alt: t("altTech") },
            { src: dc29, alt: t("altTech") },
        ],
        [t]
    );
    const imagesKids = useMemo(
        () => [
            { src: kids0, alt: t("altKids") },
            { src: kids2, alt: t("altKids") },
            { src: kids3, alt: t("altKids") },
            { src: kids4, alt: t("altKids") },
            { src: kids5, alt: t("altKids") },
            { src: kids6, alt: t("altKids") },
            { src: kids22, alt: t("altKids") },
            { src: kids21, alt: t("altKids") },
            { src: kids20, alt: t("altKids") },
            { src: kids19, alt: t("altKids") },
            { src: kids18, alt: t("altKids") },
            { src: kids17, alt: t("altKids") },
            { src: kids16, alt: t("altKids") },
            { src: kids15, alt: t("altKids") },
            { src: kids14, alt: t("altKids") },
            { src: kids13, alt: t("altKids") },
            { src: kids12, alt: t("altKids") },
            { src: kids11, alt: t("altKids") },
            { src: kids10, alt: t("altKids") },
            { src: kids9, alt: t("altKids") },
            { src: kids8, alt: t("altKids") },
            { src: kids7, alt: t("altKids") },
        ],
        [t]
    );

    const stats = [
        [t("stat_ortho"), "5"],
        [t("stat_gd"), "9"],
        [t("stat_pros"), "5"],
        [t("stat_perio"), "2"],
        [t("stat_endo"), "2"],
        [t("stat_mfs"), "2"],
        [t("stat_oral"), "2"],
        [t("stat_pedo"), "1"],
        [t("stat_implant"), "1"],
    ];

    return (
        <>
            <SEO 
                title={t("pageTitle", { defaultValue: "Nuestros doctores" })}
                description="Dental City cuenta con 29 dentistas especializados en todas las �reas de odontolog�a. M�s de 25 a�os de experiencia en Zapopan, Jalisco."
                keywords="dentistas Zapopan, odont�logos Guadalajara, especialistas dentales, equipo dental, cl�nica dental"
            />
            <StructuredData data={medicalOrgData} />
            <TopBar />
            <LanguageBoutique />

            <main className="min-h-dvh bg-[#0f2237]">
                {/* Hero */}
                <section className="relative overflow-hidden bg-[radial-gradient(70%_70%_at_50%_0%,rgba(255,255,255,0.08),transparent_60%)]">
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b]" />
                    <Container className="py-12 md:py-14">
                        <div className="text-center">
                            <div className="text-xs tracking-[0.35em] text-white/50">
                                {t("eyebrowTeam")}
                            </div>
                            <h1 className="mt-3 inline-block text-3xl md:text-5xl font-semibold relative">
                                <span className="golden-sweep">{t("pageTitle")}</span>
                                <span className="absolute left-0 right-0 -bottom-2 h-[2px] rounded bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b]" />
                            </h1>
                            <p className="mx-auto mt-8 max-w-3xl text-white/85 leading-relaxed">
                                {t("heroP1", {
                                    years: t("heroP1_years"),
                                    allSpecs: t("heroP1_allSpecs"),
                                    twoBranches: t("heroP1_twoBranches"),
                                    kids: t("heroP1_kids"),
                                })}
                            </p>
                            <p className="mx-auto mt-4 max-w-3xl text-white/80 leading-relaxed">
                                {t("heroP2")}
                            </p>
                        </div>
                    </Container>
                </section>

                {/* Estad�sticas */}
                <section className="pt-6 md:pt-8">
                    <Container>
                        <div className="relative mx-auto mt-2 w-full max-w-sm">
                            <div className="rounded-[28px] bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b] p-[1.5px] shadow-[0_18px_50px_rgba(0,0,0,.35)] golden-hover always-golden">
                                <div className="relative rounded-[26px] bg-[#0f2237]/80 px-6 py-8 text-center">
                                    <div className="text-6xl font-semibold leading-none tracking-tight text-[#e4b892]">
                                        29
                                    </div>
                                    <div className="mt-3 text-sm uppercase tracking-[.2em] text-white/85">
                                        {t("dentistsCount")}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Container>
                </section>

                {/* Grid de especialidades */}
                <section className="pt-10 md:pt-12 pb-12 md:pb-14 mt-10 md:mt-14">
                    <Container>
                        <div className="grid grid-cols-3 gap-2 sm:gap-3 md:grid-cols-3">
                            {stats.map(([label, value], idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 12 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.03 }}
                                    className="rounded-2xl bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b] p-[1.5px] shadow-[0_10px_30px_rgba(0,0,0,.25)] golden-hover"
                                >
                                    <div className="rounded-2xl bg-[#0f2237]/90 px-3 py-4 md:px-4 md:py-5 backdrop-blur-sm text-center flex flex-col justify-center h-[85px] md:h-auto">
                                        <div className="text-2xl md:text-3xl font-semibold text-[#e4b892] leading-none">
                                            {value}
                                        </div>
                                        <div className="mt-1 text-[10px] md:text-sm text-white/80 leading-tight md:leading-snug line-clamp-2">
                                            {label}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </Container>
                </section>

                {/* Carrusel Dental City */}
                <section className="pb-10">
                    <Container>
                        <SectionTitle
                            eyebrow={t("eyebrowMainClinic")}
                            title={<span className="golden-sweep">{t("titleMainClinic")}</span>}
                        />
                        <div className="mt-6">
                            <Carousel
                                images={imagesDC}
                                ariaLabel={t("ariaMainCarousel")}
                                prevLabel={t("ariaPrev")}
                                nextLabel={t("ariaNext")}
                            />
                        </div>
                    </Container>
                </section>

                {/* Carrusel Dental City Kids */}
                <section className="pb-16">
                    <Container>
                        <SectionTitle
                            eyebrow={t("eyebrowKids")}
                            title={<span className="golden-sweep">{t("titleKids")}</span>}
                        />
                        <div className="mt-6">
                            <Carousel
                                images={imagesKids}
                                ariaLabel={t("ariaKidsCarousel")}
                                prevLabel={t("ariaPrev")}
                                nextLabel={t("ariaNext")}
                            />
                        </div>
                    </Container>
                </section>
            </main>

            <Footer />

            {/* Estilos extra */}
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
        .golden-hover {
          transition: box-shadow .3s ease, transform .3s ease, filter .3s ease;
        }
        .golden-hover:hover {
          box-shadow: 0 14px 40px rgba(232,200,146,.35), 0 0 0 1px rgba(232,200,146,.35) inset;
          transform: translateY(-2px);
          filter: saturate(1.05);
        }
        .always-golden {
          box-shadow: 0 14px 40px rgba(232,200,146,.35), 0 0 0 1px rgba(232,200,146,.25) inset;
        }
      `}</style>
        </>
    );
}



   