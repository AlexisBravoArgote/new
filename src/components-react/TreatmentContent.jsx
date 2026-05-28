import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import TopBar from "./TopBar.jsx";
import Footer from "./Footer.jsx";
import LanguageBoutique from "./LanguageBoutique.jsx";
import KidsDoctorsCarouselSection from "./KidsDoctorsCarouselSection.jsx";
import "./i18n";

const INVISALIGN_DEMO_VIDEO = "https://www.youtube.com/embed/p_q0G4GhMnI?rel=0";
const BIO_INSTAGRAM_POST_URL = "https://www.instagram.com/p/DJAeVnfy79T/";

const WHATSAPP_NUMBER = "523333087833";
const WA_URL = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(
    "Hola 👋 me gustaría agendar una cita en Dental City."
)}`;
const WA_KIDS = "https://wa.me/523319699222";

function getWaUrl(key, title) {
    const base = key === "ortopedia" || key === "limpieza-ninos" ? WA_KIDS : WA_URL;
    const msg = `Hola 👋 me gustaría agendar una cita en Dental City para ${title}.`;
    const sep = base.includes("?") ? "&" : "?";
    return `${base}${sep}text=${encodeURIComponent(msg)}`;
}

function Container({ children, className = "" }) {
    return (
        <div className={`mx-auto w-full max-w-4xl px-6 md:px-8 ${className}`}>
            {children}
        </div>
    );
}

function CheckIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-[#e4b892]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M20 6L9 17l-5-5" />
        </svg>
    );
}

function renderParagraphWithHighlight(text, phrase) {
    if (!phrase || !text.includes(phrase)) return text;
    const parts = text.split(phrase);
    return parts.flatMap((part, i) => {
        const nodes = [part];
        if (i < parts.length - 1) {
            nodes.push(
                <strong key={`hl-${i}`} className="font-semibold text-[#e4b892]">
                    {phrase}
                </strong>
            );
        }
        return nodes;
    });
}

function InvisalignDemoVideo() {
    const { t } = useTranslation("home");

    return (
        <section className="pb-16 md:pb-20">
            <Container>
                <h2 className="font-display text-3xl font-semibold text-[#e4b892] md:text-4xl">
                    {t("invis.modal.title", { defaultValue: "Simulación de tratamiento" })}
                </h2>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/70 md:text-[17px]">
                    {t("invis.modal.subtitle", { defaultValue: "Visualiza los avances por etapa." })}
                </p>
                <div className="dc-treatment-video-card mt-8 overflow-hidden rounded-2xl">
                    <div className="aspect-video bg-black/40">
                        <iframe
                            className="h-full w-full"
                            src={INVISALIGN_DEMO_VIDEO}
                            title={t("invis.iframeTitle", { defaultValue: "Demostración Invisalign" })}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        />
                    </div>
                </div>
            </Container>
        </section>
    );
}

function BiologicalDentistryInstagramVideo() {
    const { t } = useTranslation("treatments");
    const embedRef = useRef(null);

    useEffect(() => {
        const processEmbeds = () => {
            window.instgrm?.Embeds?.process(embedRef.current ?? undefined);
        };

        if (window.instgrm?.Embeds) {
            processEmbeds();
            return undefined;
        }

        const existing = document.querySelector('script[data-dc-instagram-embed="true"]');
        if (existing) {
            existing.addEventListener("load", processEmbeds);
            return () => existing.removeEventListener("load", processEmbeds);
        }

        const script = document.createElement("script");
        script.src = "https://www.instagram.com/embed.js";
        script.async = true;
        script.dataset.dcInstagramEmbed = "true";
        script.onload = processEmbeds;
        document.body.appendChild(script);

        return undefined;
    }, []);

    const permalink = `${BIO_INSTAGRAM_POST_URL}?utm_source=ig_embed&utm_campaign=loading`;

    return (
        <section className="pb-16 md:pb-20">
            <Container>
                <h2 className="font-display text-3xl font-semibold text-[#e4b892] md:text-4xl">
                    {t("common.bioInstagramTitle", { defaultValue: "Video: Odontología Biológica" })}
                </h2>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/70 md:text-[17px]">
                    {t("common.bioInstagramSubtitle", {
                        defaultValue: "Conoce nuestro enfoque en este video de Dental City en Instagram.",
                    })}
                </p>
                <div
                    ref={embedRef}
                    className="dc-treatment-video-card dc-treatment-instagram-embed mt-8 overflow-hidden rounded-2xl p-4 md:p-6"
                >
                    <blockquote
                        className="instagram-media"
                        data-instgrm-captioned
                        data-instgrm-permalink={permalink}
                        data-instgrm-version="14"
                        style={{
                            background: "#FFF",
                            border: 0,
                            borderRadius: 12,
                            boxShadow: "0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)",
                            margin: "0 auto",
                            maxWidth: 540,
                            minWidth: 280,
                            padding: 0,
                            width: "100%",
                        }}
                    >
                        <a
                            href={BIO_INSTAGRAM_POST_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-[#0b1b2b]/80 underline"
                        >
                            {t("common.bioInstagramLink", { defaultValue: "Ver publicación en Instagram" })}
                        </a>
                    </blockquote>
                </div>
            </Container>
        </section>
    );
}

export default function TreatmentContent({ slug }) {
    const { t } = useTranslation("treatments");
    const data = t(`byService.${slug}`, { returnObjects: true, defaultValue: null });
    const common = t("common", { returnObjects: true, defaultValue: {} });

    const pageTitle = data?.pageTitle;
    const isValid = Boolean(pageTitle);

    if (!isValid) {
        return (
            <div className="min-h-screen bg-[#0b1b2b] text-white">
                <TopBar bgOpacity={1} />
                <LanguageBoutique />
                <main className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
                    <h1 className="font-display text-3xl text-[#e4b892]">{common.notFound ?? "Tratamiento no encontrado"}</h1>
                    <a href="/" className="mt-6 rounded-full border border-[#e4b892]/50 px-6 py-3 text-sm text-white/90 hover:bg-white/5">
                        {common.backHome ?? "Volver al inicio"}
                    </a>
                </main>
                <Footer />
            </div>
        );
    }

    const waUrl = getWaUrl(slug, pageTitle);

    return (
        <div className="min-h-screen bg-[#0b1b2b] text-white">
            <TopBar bgOpacity={1} />
            <LanguageBoutique />

            <main>
                <section className="dc-treatment-hero relative overflow-hidden pb-16 pt-28 md:pb-20 md:pt-32">
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_0%,rgba(228,184,146,0.12),transparent_65%)]" />
                    <Container className="relative z-10 text-center">
                        <p className="section-eyebrow text-[#e4b892]/90">{common.eyebrow}</p>
                        <div className="relative mx-auto mt-5 inline-block max-w-3xl">
                            <h1 className="font-display text-4xl font-semibold tracking-tight text-[#e4b892] sm:text-5xl md:text-[3.25rem]">
                                {pageTitle}
                            </h1>
                            <span className="title-underline" aria-hidden />
                        </div>
                        <p className="mx-auto mt-10 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
                            {data.heroSubtitle}
                        </p>
                    </Container>
                </section>

                <section className="pb-16 md:pb-20">
                    <Container>
                        <h2 className="font-display text-3xl font-semibold text-[#e4b892] md:text-4xl">
                            {data.whatTitle}
                        </h2>
                        <div className="mt-8 space-y-6 text-base leading-relaxed text-white/75 md:text-[17px]">
                            {(data.whatParagraphs ?? []).map((para, i) => (
                                <p key={i}>
                                    {data.highlightPhrase && para.includes(data.highlightPhrase)
                                        ? renderParagraphWithHighlight(para, data.highlightPhrase)
                                        : para}
                                </p>
                            ))}
                        </div>
                    </Container>
                </section>

                {slug === "invisalign" && <InvisalignDemoVideo />}

                {slug === "odontologia-biologica" && <BiologicalDentistryInstagramVideo />}

                <section className="pb-16 md:pb-20">
                    <Container>
                        <h2 className="font-display text-3xl font-semibold text-[#e4b892] md:text-4xl">
                            {data.processTitle || common.processTitle}
                        </h2>
                        <ol className="dc-treatment-timeline mt-10 space-y-0">
                            {(data.steps ?? []).map((step, i) => (
                                <li key={i} className="dc-treatment-step relative flex gap-6 pb-10 last:pb-0">
                                    <div className="flex flex-col items-center">
                                        <span className="dc-treatment-step-number">{i + 1}</span>
                                        {i < (data.steps?.length ?? 0) - 1 && (
                                            <span className="dc-treatment-step-line" aria-hidden />
                                        )}
                                    </div>
                                    <div className="flex-1 pt-1">
                                        <h3 className="text-lg font-semibold text-white md:text-xl">{step.title}</h3>
                                        <p className="mt-2 text-sm leading-relaxed text-white/65 md:text-base">{step.description}</p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </Container>
                </section>

                <section className="pb-16 md:pb-20">
                    <Container>
                        <h2 className="font-display text-3xl font-semibold text-[#e4b892] md:text-4xl">
                            {data.benefitsTitle}
                        </h2>
                        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
                            {(data.benefits ?? []).map((benefit, i) => (
                                <li key={i} className="dc-treatment-benefit-card flex items-start gap-3 rounded-xl px-5 py-4">
                                    <CheckIcon />
                                    <span className="text-sm leading-relaxed text-white/85 md:text-[15px]">{benefit}</span>
                                </li>
                            ))}
                        </ul>
                    </Container>
                </section>

                {data.extraSection?.title && (
                    <section className="pb-16 md:pb-20">
                        <Container>
                            <h2 className="font-display text-3xl font-semibold text-[#e4b892] md:text-4xl">
                                {data.extraSection.title}
                            </h2>
                            <div className="mt-8 space-y-6 text-base leading-relaxed text-white/75 md:text-[17px]">
                                {(data.extraSection.paragraphs ?? []).map((para, i) => (
                                    <p key={i}>{para}</p>
                                ))}
                            </div>
                        </Container>
                    </section>
                )}

                {(slug === "limpieza-ninos" || slug === "ortopedia") && <KidsDoctorsCarouselSection />}

                <section className="pb-24 md:pb-28">
                    <Container>
                        <div className="dc-treatment-info-card rounded-2xl p-8 md:p-10">
                            <h2 className="text-center font-display text-2xl font-semibold text-[#e4b892] md:text-3xl">
                                {common.infoTitle}
                            </h2>
                            <div className="mt-8 grid gap-8 sm:grid-cols-2">
                                <div>
                                    <h3 className="text-base font-semibold text-[#e4b892] md:text-lg">{common.timeLabel}</h3>
                                    <ul className="mt-3 space-y-1.5 text-sm text-white/80 md:text-base">
                                        {(data.timeLines ?? []).map((line, i) => (
                                            <li key={i}>{line}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-base font-semibold text-[#e4b892] md:text-lg">{common.priceLabel}</h3>
                                    <ul className="mt-3 space-y-1.5 text-sm text-white/80 md:text-base">
                                        {(data.priceLines ?? []).map((line, i) => (
                                            <li key={i}>{line}</li>
                                        ))}
                                    </ul>
                                    <p className="mt-3 text-xs text-white/55 md:text-sm">{common.priceNote}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
                            <a
                                href={waUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#d8a07b] via-[#e4b892] to-[#d8a07b] px-7 text-[15px] font-semibold text-[#0b1b2b] shadow-[0_8px_24px_rgba(216,160,123,.3)] transition hover:brightness-110 sm:max-w-xs"
                            >
                                {common.ctaWhatsapp}
                                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14M13 5l7 7-7 7" />
                                </svg>
                            </a>
                            <a
                                href="/#servicios"
                                className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-white/30 bg-transparent px-7 text-[15px] font-medium text-white/90 transition hover:border-[#e4b892]/60 hover:bg-white/5 sm:max-w-xs"
                            >
                                {common.ctaOther}
                            </a>
                        </div>
                    </Container>
                </section>
            </main>

            <Footer />
        </div>
    );
}
