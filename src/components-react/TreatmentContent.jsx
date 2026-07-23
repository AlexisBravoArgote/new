import React from "react";
import {
    BIO_AMALGAM_REMOVAL_REEL_URL,
    BIO_INSTAGRAM_BENEFITS_REEL_URL,
    BIO_INSTAGRAM_POST_URL,
    BIO_ONCOLOGY_REEL_URL,
    BLANQUEAMIENTO_CLINIC_REEL_URL,
    BLANQUEAMIENTO_HOME_KIT_REEL_URL,
    BRACKETS_LIGATURE_REEL_URL,
    BRACKETS_PLACEMENT_REEL_URL,
    DISENO_SONRISA_CONSULTA_REEL_URL,
    DISENO_SONRISA_MOCKUP_REEL_URL,
    INVISALIGN_ATTACHMENTS_REEL_URL,
    IMPLANT_PLACEMENT_REEL_URL,
    INVISALIGN_SCAN_REEL_URL,
    LIMPIEZA_INSTAGRAM_REEL_URL,
    ESCANEO_INTRAORAL_INSTAGRAM_URL,
} from "../config/treatment-instagram-urls.js";
import { InstagramReelIframe } from "./InstagramEmbed.jsx";
import { useTranslation } from "react-i18next";
import TopBar from "./TopBar.jsx";
import Footer from "./Footer.jsx";
import LanguageBoutique from "./LanguageBoutique.jsx";
import KidsDoctorsCarouselSection from "./KidsDoctorsCarouselSection.jsx";
import "./i18n";

const INVISALIGN_DEMO_VIDEO = "https://www.youtube.com/embed/p_q0G4GhMnI?rel=0";
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

function YearsSeal({ number, label, ariaLabel, className = "" }) {
    return (
        <div className={`dc-years-seal relative ${className}`} aria-label={ariaLabel} title={ariaLabel}>
            <span className="dc-years-seal__ring" aria-hidden />
            <span className="dc-years-seal__inner">
                <span className="dc-years-seal__number">{number}</span>
                <span className="dc-years-seal__label">{label}</span>
            </span>
        </div>
    );
}

function TreatmentBrandClose({ common }) {
    return (
        <div className="dc-treatment-brand-close mx-auto mt-14 max-w-2xl text-center md:mt-16">
            <YearsSeal
                number={common.brandCloseYearsNumber ?? "26"}
                label={common.brandCloseYearsLabel ?? "años"}
                ariaLabel={common.brandCloseYearsAria ?? "26 años de experiencia en Dental City"}
                className="dc-treatment-brand-close__seal mx-auto"
            />
            <p className="mt-5 font-display text-2xl font-semibold leading-snug tracking-tight text-[#e4b892] md:text-3xl">
                {common.brandCloseHeadline ?? "Más de dos décadas cuidando sonrisas en Zapopan."}
            </p>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/65 md:text-[15px]">
                {common.brandCloseSupport ?? "De la valoración al seguimiento, con el mismo estándar clínico."}
            </p>
        </div>
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

function InvisalignInstagramVideos() {
    const { t } = useTranslation("treatments");

    return (
        <TreatmentInstagramVideoPair
            sectionTitle={t("common.invisalignInstagramTitle", { defaultValue: "Videos: Invisalign" })}
            sectionSubtitle={t("common.invisalignInstagramSubtitle", {
                defaultValue:
                    "Escaneo digital para fabricar tus alineadores personalizados y colocación de attachments en consultorio.",
            })}
            linkLabel={t("common.invisalignInstagramLink", { defaultValue: "Ver en Instagram" })}
            videos={[
                {
                    postUrl: INVISALIGN_SCAN_REEL_URL,
                    cardTitle: t("common.invisalignInstagramScanTitle", {
                        defaultValue: "Escaneo digital",
                    }),
                },
                {
                    postUrl: INVISALIGN_ATTACHMENTS_REEL_URL,
                    cardTitle: t("common.invisalignInstagramAttachmentsTitle", {
                        defaultValue: "Colocación de attachments",
                    }),
                },
            ]}
        />
    );
}

function TreatmentInstagramVideoPair({ sectionTitle, sectionSubtitle, linkLabel, videos }) {
    return (
        <section className="pb-16 md:pb-20">
            <div className="mx-auto w-full max-w-5xl px-6 md:px-8">
                <h2 className="font-display text-3xl font-semibold text-[#e4b892] md:text-4xl">{sectionTitle}</h2>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/70 md:text-[17px]">{sectionSubtitle}</p>

                <div className="dc-treatment-instagram-pair mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
                    {videos.map((video) => (
                        <article key={video.postUrl} className="flex h-full flex-col">
                            <h3 className="text-center text-lg font-semibold text-[#e4b892] md:text-xl">{video.cardTitle}</h3>
                            <div className="dc-treatment-video-card dc-treatment-instagram-pair-card mt-4 flex flex-1 flex-col items-center p-4 md:p-5">
                                <InstagramReelIframe
                                    postUrl={video.postUrl}
                                    title={video.cardTitle}
                                    className="dc-treatment-instagram-iframe"
                                />
                                <a
                                    href={video.postUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-4 text-center text-sm font-medium text-[#e4b892] transition hover:text-[#f4d3b3]"
                                >
                                    {linkLabel}
                                </a>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

function BiologicalDentistryInstagramVideos() {
    const { t } = useTranslation("treatments");

    return (
        <TreatmentInstagramVideoPair
            sectionTitle={t("common.bioInstagramTitle", { defaultValue: "Videos: Odontología Biológica" })}
            sectionSubtitle={t("common.bioInstagramSubtitle", {
                defaultValue:
                    "Conoce nuestro enfoque, beneficios, atención para pacientes oncológicos y protocolo de extracción segura de amalgamas en Dental City.",
            })}
            linkLabel={t("common.bioInstagramLink", { defaultValue: "Ver en Instagram" })}
            videos={[
                {
                    postUrl: BIO_INSTAGRAM_POST_URL,
                    cardTitle: t("common.bioInstagramApproachTitle", { defaultValue: "Nuestro enfoque" }),
                },
                {
                    postUrl: BIO_INSTAGRAM_BENEFITS_REEL_URL,
                    cardTitle: t("common.bioInstagramBenefitsTitle", { defaultValue: "Beneficios" }),
                },
                {
                    postUrl: BIO_ONCOLOGY_REEL_URL,
                    cardTitle: t("common.bioInstagramOncologyTitle", { defaultValue: "Pacientes oncológicos" }),
                },
                {
                    postUrl: BIO_AMALGAM_REMOVAL_REEL_URL,
                    cardTitle: t("common.bioInstagramAmalgamTitle", { defaultValue: "Extracción segura de amalgamas" }),
                },
            ]}
        />
    );
}

function BlanqueamientoInstagramVideos() {
    const { t } = useTranslation("treatments");

    return (
        <TreatmentInstagramVideoPair
            sectionTitle={t("common.blanqueamientoInstagramTitle", { defaultValue: "Videos: Blanqueamiento dental" })}
            sectionSubtitle={t("common.blanqueamientoInstagramSubtitle", {
                defaultValue: "Blanqueamiento en consultorio y kit para casa supervisado en Dental City.",
            })}
            linkLabel={t("common.blanqueamientoInstagramLink", { defaultValue: "Ver en Instagram" })}
            videos={[
                {
                    postUrl: BLANQUEAMIENTO_CLINIC_REEL_URL,
                    cardTitle: t("common.blanqueamientoInstagramClinicTitle", { defaultValue: "En el consultorio" }),
                },
                {
                    postUrl: BLANQUEAMIENTO_HOME_KIT_REEL_URL,
                    cardTitle: t("common.blanqueamientoInstagramHomeKitTitle", { defaultValue: "Kit para casa" }),
                },
            ]}
        />
    );
}

function BracketsInstagramVideos() {
    const { t } = useTranslation("treatments");

    return (
        <TreatmentInstagramVideoPair
            sectionTitle={t("common.bracketsInstagramTitle", { defaultValue: "Videos: Brackets" })}
            sectionSubtitle={t("common.bracketsInstagramSubtitle", {
                defaultValue: "Colocación de brackets y cambio de ligas durante tu tratamiento de ortodoncia fija.",
            })}
            linkLabel={t("common.bracketsInstagramLink", { defaultValue: "Ver en Instagram" })}
            videos={[
                {
                    postUrl: BRACKETS_PLACEMENT_REEL_URL,
                    cardTitle: t("common.bracketsInstagramPlacementTitle", {
                        defaultValue: "Colocación de brackets",
                    }),
                },
                {
                    postUrl: BRACKETS_LIGATURE_REEL_URL,
                    cardTitle: t("common.bracketsInstagramLigatureTitle", {
                        defaultValue: "Cambio de ligas",
                    }),
                },
            ]}
        />
    );
}

function DisenoSonrisaInstagramVideos() {
    const { t } = useTranslation("treatments");

    return (
        <TreatmentInstagramVideoPair
            sectionTitle={t("common.disenoSonrisaInstagramTitle", { defaultValue: "Videos: Diseño de sonrisa" })}
            sectionSubtitle={t("common.disenoSonrisaInstagramSubtitle", {
                defaultValue:
                    "Mock-up digital y explicación del proceso de diseño de sonrisa con nuestra especialista en Dental City.",
            })}
            linkLabel={t("common.disenoSonrisaInstagramLink", { defaultValue: "Ver en Instagram" })}
            videos={[
                {
                    postUrl: DISENO_SONRISA_MOCKUP_REEL_URL,
                    cardTitle: t("common.disenoSonrisaInstagramMockupTitle", {
                        defaultValue: "Mock-up digital",
                    }),
                },
                {
                    postUrl: DISENO_SONRISA_CONSULTA_REEL_URL,
                    cardTitle: t("common.disenoSonrisaInstagramConsultaTitle", {
                        defaultValue: "Diseño de sonrisa en consulta",
                    }),
                },
            ]}
        />
    );
}

function ImplantesInstagramVideo() {
    const { t } = useTranslation("treatments");
    const sectionTitle = t("common.implantesInstagramTitle", { defaultValue: "Video: Colocación de implantes" });

    return (
        <section className="pb-16 md:pb-20">
            <div className="mx-auto w-full max-w-5xl px-6 md:px-8">
                <h2 className="font-display text-3xl font-semibold text-[#e4b892] md:text-4xl">{sectionTitle}</h2>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/70 md:text-[17px]">
                    {t("common.implantesInstagramSubtitle", {
                        defaultValue: "Conoce cómo realizamos la colocación de implantes dentales en Dental City.",
                    })}
                </p>
                <article className="mx-auto mt-8 max-w-md">
                    <div className="dc-treatment-video-card dc-treatment-instagram-pair-card flex flex-col items-center p-4 md:p-5">
                        <InstagramReelIframe
                            postUrl={IMPLANT_PLACEMENT_REEL_URL}
                            title={sectionTitle}
                            className="dc-treatment-instagram-iframe"
                        />
                        <a
                            href={IMPLANT_PLACEMENT_REEL_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 text-center text-sm font-medium text-[#e4b892] transition hover:text-[#f4d3b3]"
                        >
                            {t("common.implantesInstagramLink", { defaultValue: "Ver en Instagram" })}
                        </a>
                    </div>
                </article>
            </div>
        </section>
    );
}

function LimpiezaInstagramVideo() {
    const { t } = useTranslation("treatments");
    const sectionTitle = t("common.limpiezaInstagramTitle", { defaultValue: "Video: Limpieza dental" });

    return (
        <section className="pb-16 md:pb-20">
            <div className="mx-auto w-full max-w-5xl px-6 md:px-8">
                <h2 className="font-display text-3xl font-semibold text-[#e4b892] md:text-4xl">{sectionTitle}</h2>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/70 md:text-[17px]">
                    {t("common.limpiezaInstagramSubtitle", {
                        defaultValue: "Mira cómo realizamos la profilaxis profesional en Dental City.",
                    })}
                </p>
                <article className="mx-auto mt-8 max-w-md">
                    <div className="dc-treatment-video-card dc-treatment-instagram-pair-card flex flex-col items-center p-4 md:p-5">
                        <InstagramReelIframe
                            postUrl={LIMPIEZA_INSTAGRAM_REEL_URL}
                            title={sectionTitle}
                            className="dc-treatment-instagram-iframe"
                        />
                        <a
                            href={LIMPIEZA_INSTAGRAM_REEL_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 text-center text-sm font-medium text-[#e4b892] transition hover:text-[#f4d3b3]"
                        >
                            {t("common.limpiezaInstagramLink", { defaultValue: "Ver en Instagram" })}
                        </a>
                    </div>
                </article>
            </div>
        </section>
    );
}

function EscaneoIntraoralInstagramVideo() {
    const { t } = useTranslation("treatments");
    const sectionTitle = t("common.escaneoIntraoralInstagramTitle", {
        defaultValue: "Video: Escaneo intraoral",
    });

    return (
        <section className="pb-16 md:pb-20">
            <div className="mx-auto w-full max-w-5xl px-6 md:px-8">
                <h2 className="font-display text-3xl font-semibold text-[#e4b892] md:text-4xl">{sectionTitle}</h2>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/70 md:text-[17px]">
                    {t("common.escaneoIntraoralInstagramSubtitle", {
                        defaultValue: "Mira cómo realizamos el escaneo digital 3D en Dental City.",
                    })}
                </p>
                <article className="mx-auto mt-8 max-w-md">
                    <div className="dc-treatment-video-card dc-treatment-instagram-pair-card flex flex-col items-center p-4 md:p-5">
                        <InstagramReelIframe
                            postUrl={ESCANEO_INTRAORAL_INSTAGRAM_URL}
                            title={sectionTitle}
                            className="dc-treatment-instagram-iframe"
                        />
                        <a
                            href={ESCANEO_INTRAORAL_INSTAGRAM_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 text-center text-sm font-medium text-[#e4b892] transition hover:text-[#f4d3b3]"
                        >
                            {t("common.escaneoIntraoralInstagramLink", { defaultValue: "Ver en Instagram" })}
                        </a>
                    </div>
                </article>
            </div>
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

                {data.afterWhat?.title && (
                    <section className="pb-16 md:pb-20">
                        <Container>
                            <h2 className="font-display text-3xl font-semibold text-[#e4b892] md:text-4xl">
                                {data.afterWhat.title}
                            </h2>
                            <div className="mt-8 space-y-6 text-base leading-relaxed text-white/75 md:text-[17px]">
                                {(data.afterWhat.paragraphs ?? []).map((para, i) => (
                                    <p key={i}>{para}</p>
                                ))}
                            </div>
                            {(data.afterWhat.subsections ?? []).map((sub, i) => (
                                <div key={i} className="mt-10">
                                    <h3 className="text-xl font-semibold text-white md:text-2xl">{sub.title}</h3>
                                    <div className="mt-5 space-y-5 text-base leading-relaxed text-white/75 md:text-[17px]">
                                        {(sub.paragraphs ?? []).map((para, j) => (
                                            <p key={j}>{para}</p>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </Container>
                    </section>
                )}

                {slug === "invisalign" && <InvisalignDemoVideo />}

                {slug === "invisalign" && <InvisalignInstagramVideos />}

                {slug === "blanqueamientos" && <BlanqueamientoInstagramVideos />}

                {slug === "brackets" && <BracketsInstagramVideos />}

                {slug === "implantes" && <ImplantesInstagramVideo />}

                {slug === "limpieza" && <LimpiezaInstagramVideo />}

                {slug === "escaneo-intraoral" && <EscaneoIntraoralInstagramVideo />}

                {slug === "diseno-sonrisa" && <DisenoSonrisaInstagramVideos />}

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

                {slug === "odontologia-biologica" && <BiologicalDentistryInstagramVideos />}

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

                        <TreatmentBrandClose common={common} />

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
