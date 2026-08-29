import React from "react";
import { motion } from "framer-motion";
import { ITERO_5D_PLUS_REEL_URL } from "../config/treatment-instagram-urls.js";
import { InstagramReelIframe } from "./InstagramEmbed.jsx";
import { useSiteCopy } from "./SiteCopyContext.jsx";

const WHATSAPP_NUMBER = "523333087833";

function Container({ children, className = "" }) {
    return <div className={`mx-auto w-full max-w-6xl px-6 md:px-8 ${className}`}>{children}</div>;
}

function NiriIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="10.5" cy="10.5" r="6.5" />
            <path d="M20.5 20.5 15.5 15.5" />
            <circle cx="10.5" cy="10.5" r="1.7" fill="currentColor" stroke="none" />
        </svg>
    );
}

function ScanIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2.8 20.5 7v10L12 21.2 3.5 17V7L12 2.8Z" />
            <path d="M3.5 7 12 11.4 20.5 7" />
            <path d="M12 11.4v9.8" />
        </svg>
    );
}

function TimeLapseIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 3v5h5" />
            <path d="M3.05 13A9 9 0 1 0 6 5.3L3 8" />
            <path d="M12 7.5v5l3.5 2" />
        </svg>
    );
}

function SimulatorIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4.5 9.5C6.8 8.3 9.3 7.7 12 7.7s5.2.6 7.5 1.8c-.7 4.8-3.8 8-7.5 8s-6.8-3.2-7.5-8Z" />
            <path d="M8 8.4v7.3M12 7.9v8.9M16 8.4v7.3" />
        </svg>
    );
}

const FEATURE_ICONS = [NiriIcon, ScanIcon, TimeLapseIcon, SimulatorIcon];

export default function IteroScannerSection({ className = "" }) {
    const { t } = useSiteCopy();

    const paragraphs = t("itero.paragraphs", { returnObjects: true, defaultValue: [] }) || [];
    const features = t("itero.features", { returnObjects: true, defaultValue: [] }) || [];
    const chips = t("itero.chips", { returnObjects: true, defaultValue: [] }) || [];
    const videoTitle = t("itero.videoTitle", { defaultValue: "Así funciona en consulta" });
    const waHref = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(
        t("itero.waMessage", {
            defaultValue: "Hola 👋 me gustaría agendar un escaneo digital con el iTero Element 5D Plus en Dental City.",
        })
    )}`;

    return (
        <section id="itero-element-5d-plus" className={`relative overflow-hidden py-16 md:py-20 ${className}`}>
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_50%_0%,rgba(228,184,146,0.09),transparent_65%)]" />

            <Container className="relative">
                <div className="text-center">
                    <p className="section-eyebrow mb-4">
                        {t("itero.eyebrow", { defaultValue: "TECNOLOGÍA DIGITAL" })}
                    </p>
                    <div className="relative inline-block">
                        <h2 className="font-display text-2xl font-semibold md:text-4xl">
                            <span className="golden-sweep">
                                {t("itero.title", { defaultValue: "iTero Element 5D Plus" })}
                            </span>
                        </h2>
                        <span className="title-underline" aria-hidden />
                    </div>
                    <p className="mx-auto mt-8 max-w-3xl text-base leading-relaxed text-white/70 md:text-[17px]">
                        {t("itero.subtitle", {
                            defaultValue:
                                "El escáner intraoral con el que digitalizamos tu boca en minutos: impresiones 3D sin moldes, apoyo en la detección de caries sin radiación y simulación de tu sonrisa antes de empezar.",
                        })}
                    </p>
                </div>

                <div className="mx-auto mt-8 max-w-3xl space-y-5 text-center text-base leading-relaxed text-white/75 md:text-[17px]">
                    {paragraphs.map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                    ))}
                </div>

                {chips.length > 0 && (
                    <div className="mt-7 flex flex-wrap justify-center gap-2">
                        {chips.map((chip) => (
                            <span
                                key={chip}
                                className="rounded-full border border-[#e4b892]/30 bg-[#e4b892]/10 px-3.5 py-1.5 text-xs font-medium text-[#e4b892]"
                            >
                                {chip}
                            </span>
                        ))}
                    </div>
                )}

                <h3 className="mt-12 text-center text-lg font-semibold text-[#e4b892] md:text-xl">
                    {t("itero.featuresTitle", { defaultValue: "Qué lo hace diferente" })}
                </h3>

                {/* Las tarjetas se estiran a la altura del reel para que ambas columnas cierren igual. */}
                <div className="mt-6 grid items-stretch gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-8">
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-rows-2">
                        {features.map((feature, i) => {
                            const Icon = FEATURE_ICONS[i] ?? ScanIcon;
                            return (
                                <motion.article
                                    key={i}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-40px" }}
                                    transition={{ duration: 0.45, delay: (i % 2) * 0.06 }}
                                    className="dc-service-card flex h-full flex-col items-center justify-center rounded-2xl p-6 text-center"
                                >
                                    <span className="grid h-11 w-11 place-items-center rounded-full bg-[#e4b892]/15 text-[#e4b892] ring-1 ring-[#e4b892]/25">
                                        <Icon />
                                    </span>
                                    <h4 className="font-display mt-4 text-base font-semibold tracking-tight text-white md:text-[17px]">
                                        {feature.title}
                                    </h4>
                                    <p className="mt-2.5 text-sm leading-relaxed text-white/70">{feature.description}</p>
                                </motion.article>
                            );
                        })}
                    </div>

                    <motion.aside
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.5 }}
                        className="mx-auto w-full max-w-sm lg:mx-0 lg:max-w-none"
                    >
                        <div className="dc-treatment-video-card flex h-full flex-col items-center rounded-2xl p-4 md:p-5">
                            <h3 className="text-center text-base font-semibold text-[#e4b892] md:text-lg">{videoTitle}</h3>
                            <div className="mt-4 flex w-full flex-col items-center">
                                <InstagramReelIframe
                                    postUrl={ITERO_5D_PLUS_REEL_URL}
                                    title={videoTitle}
                                    className="dc-treatment-instagram-iframe"
                                />
                                <a
                                    href={ITERO_5D_PLUS_REEL_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-4 text-center text-sm font-medium text-[#e4b892] transition hover:text-[#f4d3b3]"
                                >
                                    {t("itero.instagramLink", { defaultValue: "Ver en Instagram" })}
                                </a>
                            </div>
                        </div>
                    </motion.aside>
                </div>

                <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
                    <a
                        href={waHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#d8a07b] via-[#e4b892] to-[#d8a07b] px-7 text-[15px] font-semibold text-[#0b1b2b] shadow-[0_8px_24px_rgba(216,160,123,.3)] transition hover:brightness-110"
                    >
                        {t("itero.ctaWhatsapp", { defaultValue: "Agendar mi escaneo digital" })}
                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M13 5l7 7-7 7" />
                        </svg>
                    </a>
                    <a
                        href="/tratamientos/escaneo-intraoral"
                        className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[#e4b892]/40 px-7 text-[15px] font-medium text-white/90 transition hover:border-[#e4b892]/70 hover:bg-[#e4b892]/10"
                    >
                        {t("itero.ctaTreatment", { defaultValue: "Ver escaneo intraoral" })}
                    </a>
                </div>
            </Container>
        </section>
    );
}
