import React from "react";
import { motion } from "framer-motion";
import { PATIENT_INSTAGRAM_REELS } from "../config/patient-instagram-reels.js";
import { InstagramReelIframe } from "./InstagramEmbed.jsx";
import { useSiteCopy } from "./SiteCopyContext.jsx";

function Container({ children, className = "" }) {
    return <div className={`mx-auto w-full max-w-6xl px-6 md:px-8 ${className}`}>{children}</div>;
}

function SectionHeading({ overline, title, subtitle }) {
    return (
        <div className="text-center">
            {overline && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="section-eyebrow mb-4"
                >
                    {overline}
                </motion.div>
            )}
            <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="font-display mt-2 inline-block text-3xl font-semibold relative pb-1 md:text-5xl"
            >
                <span className="golden-sweep">{title}</span>
                <span className="title-underline" />
            </motion.h2>
            {subtitle && (
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mx-auto mt-4 max-w-2xl text-base text-white/70 md:text-lg"
                >
                    {subtitle}
                </motion.p>
            )}
        </div>
    );
}

function StarRating({ rating = 5, size = "sm" }) {
    const sizeClass = size === "lg" ? "h-5 w-5" : "h-4 w-4";
    return (
        <div className="flex items-center gap-0.5" aria-label={`${rating} de 5 estrellas`}>
            {Array.from({ length: 5 }, (_, i) => (
                <svg
                    key={i}
                    viewBox="0 0 20 20"
                    className={`${sizeClass} ${i < rating ? "text-[#FBBC04]" : "text-white/20"}`}
                    fill="currentColor"
                    aria-hidden
                >
                    <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.77l-4.94 2.94.94-5.5-4-3.9 5.53-.8L10 1.5z" />
                </svg>
            ))}
        </div>
    );
}

function GoogleBadge({ label }) {
    return (
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/90">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-bold text-[#4285F4]">
                G
            </span>
            {label}
        </span>
    );
}

function DoctoraliaBadge({ label }) {
    return (
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/90">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#00B39B] text-[10px] font-bold text-white">
                D
            </span>
            {label}
        </span>
    );
}

function PlatformRating({ badge, rating, ratingLabel }) {
    return (
        <div className="dc-review-platform flex h-full flex-col items-center text-center">
            {badge}
            <div className="mt-4 flex items-end justify-center gap-2">
                <span className="font-display text-5xl font-semibold text-white md:text-6xl">{rating}</span>
                <div className="pb-2">
                    <StarRating rating={5} size="lg" />
                    <p className="mt-1 text-sm text-white/60">{ratingLabel}</p>
                </div>
            </div>
        </div>
    );
}

function SatisfactionRing({ value, label }) {
    const radius = 54;
    const circumference = 2 * Math.PI * radius;
    const progress = Math.min(100, Math.max(0, Number.parseFloat(value))) / 100;
    const offset = circumference * (1 - progress);

    return (
        <div className="dc-review-satisfaction flex flex-col items-center">
            <div className="relative h-32 w-32">
                <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120" aria-hidden>
                    <circle cx="60" cy="60" r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
                    <circle
                        cx="60"
                        cy="60"
                        r={radius}
                        fill="none"
                        stroke="url(#dcReviewGold)"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                    />
                    <defs>
                        <linearGradient id="dcReviewGold" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#c89b7b" />
                            <stop offset="50%" stopColor="#e4b892" />
                            <stop offset="100%" stopColor="#f4d3b3" />
                        </linearGradient>
                    </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-display text-3xl font-semibold text-[#e4b892]">{value}</span>
                </div>
            </div>
            <p className="mt-2 max-w-[9rem] text-center text-xs leading-snug text-white/65 md:text-sm">{label}</p>
        </div>
    );
}

function HighlightChip({ children }) {
    return (
        <div className="dc-review-highlight group flex items-start gap-2.5 rounded-2xl px-3.5 py-3">
            <span
                className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#c89b7b] to-[#e4b892] text-[#0b1b2b] shadow-[0_0_12px_rgba(228,184,146,0.25)]"
                aria-hidden
            >
                <svg viewBox="0 0 20 20" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4.5 10.5l3.2 3.2 7.8-7.8" />
                </svg>
            </span>
            <span className="text-[13px] leading-snug text-white/85 transition group-hover:text-white md:text-sm">
                {children}
            </span>
        </div>
    );
}

function ReviewCard({ review }) {
    const initial = (review.author || "?").charAt(0).toUpperCase();

    return (
        <article className="dc-review-card flex h-full flex-col rounded-2xl p-5 md:p-6">
            <div className="flex items-start gap-3">
                <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#c89b7b] to-[#e4b892] text-sm font-semibold text-[#0b1b2b]"
                    aria-hidden
                >
                    {initial}
                </div>
                <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <h3 className="text-sm font-semibold text-white md:text-base">{review.author}</h3>
                        {review.tag && (
                            <span className="rounded-full border border-[#e4b89233] bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-wide text-[#e4b892]">
                                {review.tag}
                            </span>
                        )}
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                        <StarRating rating={review.rating ?? 5} />
                        <span className="text-xs text-white/45">{review.date}</span>
                    </div>
                </div>
            </div>
            <p className="mt-4 flex-1 text-sm leading-relaxed text-white/80 md:text-[15px]">"{review.text}"</p>
        </article>
    );
}

export default function PatientReviewsSection() {
    const { t } = useSiteCopy();
    const stats = t("reviews.stats", { returnObjects: true, defaultValue: {} });
    const items = t("reviews.items", { returnObjects: true, defaultValue: [] });
    const googleUrl = t("reviews.googleUrl", {
        defaultValue:
            "https://www.google.com/maps/search/?api=1&query=Dental+City+By+Dra.+Linda+Argote,+Zapopan,+Jalisco",
    });
    const doctoraliaUrl = t("reviews.doctoraliaUrl", {
        defaultValue:
            "https://www.doctoralia.com.mx/clinicas/dental-city-kids-family-square-center#facility-opinion-stats",
    });

    return (
        <section id="opiniones" className="section-dark relative py-20 md:py-24">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b]" />

            <Container>
                <SectionHeading
                    overline={t("reviews.eyebrow", { defaultValue: "OPINIONES" })}
                    title={t("reviews.title", { defaultValue: "Opiniones" })}
                    subtitle={t("reviews.subtitle", { defaultValue: "Nuestros Pacientes" })}
                />

                <p className="mx-auto mt-8 max-w-3xl text-center text-base leading-relaxed text-white/75 md:text-[17px]">
                    {t("reviews.intro", {
                        defaultValue:
                            "En Dental City, clínica dental en Zapopan, la confianza de nuestros pacientes es nuestra mejor carta de presentación. Estas reseñas en Google y Doctoralia reflejan la calidad de nuestra atención, tecnología digital y el compromiso de todo el equipo en cada consulta.",
                    })}
                </p>

                <div className="dc-review-summary mx-auto mt-10 max-w-5xl rounded-3xl p-6 md:p-8">
                    <div className="grid gap-8 sm:grid-cols-2 sm:gap-6 lg:gap-10">
                        <PlatformRating
                            badge={
                                <GoogleBadge label={t("reviews.googleBadge", { defaultValue: "Reseñas de Google" })} />
                            }
                            rating={stats.rating ?? "4.9"}
                            ratingLabel={stats.ratingLabel ?? "de 5 en Google"}
                        />
                        <PlatformRating
                            badge={
                                <DoctoraliaBadge
                                    label={t("reviews.doctoraliaBadge", { defaultValue: "Reseñas de Doctoralia" })}
                                />
                            }
                            rating={stats.doctoraliaRating ?? "5.0"}
                            ratingLabel={stats.doctoraliaRatingLabel ?? "de 5 en Doctoralia"}
                        />
                    </div>

                    <p className="mt-8 text-center text-sm text-white/55 md:text-base">
                        <span className="font-semibold text-[#e4b892]">{stats.count ?? "500+"}</span>{" "}
                        {stats.countLabel ?? "reseñas verificadas"}
                    </p>

                    <div className="mt-8 grid items-center gap-6 border-t border-white/10 pt-8 sm:grid-cols-2 lg:grid-cols-[1fr_auto_1fr] lg:gap-8">
                        <div className="order-2 mx-auto flex w-full max-w-[15.5rem] flex-col gap-2.5 sm:order-1 lg:mx-0 lg:justify-self-end">
                            {(t("reviews.highlights", { returnObjects: true, defaultValue: [] }) || []).map((item) => (
                                <HighlightChip key={item}>{item}</HighlightChip>
                            ))}
                        </div>

                        <div className="order-1 flex justify-center sm:col-span-2 lg:order-2 lg:col-span-1">
                            <SatisfactionRing
                                value={stats.satisfaction ?? "99%"}
                                label={stats.satisfactionLabel ?? "de nuestros pacientes satisfechos"}
                            />
                        </div>

                        <div className="order-3 mx-auto flex w-full max-w-[15.5rem] flex-col gap-2.5 lg:mx-0 lg:justify-self-start">
                            {(
                                t("reviews.highlightsRight", {
                                    returnObjects: true,
                                    defaultValue: [
                                        "Más de 26 años de experiencia",
                                        "Invisalign Diamond Provider",
                                        "Implantes Straumann premium",
                                    ],
                                }) || []
                            ).map((item) => (
                                <HighlightChip key={item}>{item}</HighlightChip>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {Array.isArray(items) &&
                        items.map((review, idx) => (
                            <motion.div
                                key={`${review.author}-${idx}`}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ duration: 0.45, delay: idx * 0.06 }}
                            >
                                <ReviewCard review={review} />
                            </motion.div>
                        ))}
                </div>

                <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
                    <a
                        href={googleUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#e4b89244] bg-gradient-to-r from-[#c89b7b22] via-[#e4b89218] to-[#c89b7b22] px-5 py-3 text-sm font-medium text-[#e4b892] transition hover:border-[#e4b89266] hover:brightness-110"
                    >
                        <StarRating rating={5} />
                        {t("reviews.cta", { defaultValue: "Ver todas las reseñas en Google" })}
                    </a>
                    <a
                        href={doctoraliaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#00B39B55] bg-gradient-to-r from-[#00B39B22] via-[#00B39B14] to-[#00B39B22] px-5 py-3 text-sm font-medium text-[#7ee0d2] transition hover:border-[#00B39B88] hover:brightness-110"
                    >
                        <StarRating rating={5} />
                        {t("reviews.doctoraliaCta", { defaultValue: "Ver todas las reseñas en Doctoralia" })}
                    </a>
                </div>

                <div id="videos-pacientes" className="mt-16 border-t border-white/10 pt-14 md:mt-20 md:pt-16">
                    <div className="text-center">
                        <p className="section-eyebrow mb-4">
                            {t("reviews.patientVideosEyebrow", { defaultValue: "TESTIMONIOS EN VIDEO" })}
                        </p>
                        <h3 className="font-display text-2xl font-semibold text-[#e4b892] md:text-4xl">
                            {t("reviews.patientVideosTitle", { defaultValue: "Videos de nuestros pacientes" })}
                        </h3>
                        <p className="mx-auto mt-4 max-w-2xl text-base text-white/70 md:text-[17px]">
                            {t("reviews.patientVideosSubtitle", {
                                defaultValue:
                                    "Experiencias reales de pacientes que comparten su tratamiento y resultados en Dental City.",
                            })}
                        </p>
                    </div>

                    <div className="dc-patient-reels-grid mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {PATIENT_INSTAGRAM_REELS.map((postUrl, idx) => {
                            const videoLabel = t("reviews.patientVideosItem", {
                                index: idx + 1,
                                defaultValue: `Video ${idx + 1}`,
                            });
                            return (
                                <motion.article
                                    key={postUrl}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-40px" }}
                                    transition={{ duration: 0.45, delay: (idx % 4) * 0.05 }}
                                    className="dc-treatment-video-card dc-treatment-instagram-pair-card flex flex-col items-center p-4 md:p-5"
                                >
                                    <InstagramReelIframe
                                        postUrl={postUrl}
                                        title={videoLabel}
                                        className="dc-treatment-instagram-iframe"
                                    />
                                    <a
                                        href={postUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-4 text-center text-sm font-medium text-[#e4b892] transition hover:text-[#f4d3b3]"
                                    >
                                        {t("reviews.patientVideosLink", { defaultValue: "Ver en Instagram" })}
                                    </a>
                                </motion.article>
                            );
                        })}
                    </div>
                </div>
            </Container>
        </section>
    );
}
