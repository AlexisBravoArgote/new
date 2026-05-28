// src/components-react/DoctoresContent.jsx
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import TopBar from "./TopBar.jsx";
import Footer from "./Footer.jsx";
import LanguageSwitcher from "./LanguageSwitcher.jsx";
import Carousel from "./Carousel.jsx";
import { SiteCopyProvider, useSiteCopy } from "./SiteCopyContext.jsx";
import { getDoctorsCopy, normalizeLang } from "../lib/site-copy.js";
import { getKidsCarouselImages } from "../data/kidsCarouselImages.js";
const __MOTION_USED = Boolean(motion); // eslint-disable-line no-unused-vars

const dc3 = "/assets/DCdoctor3.jpg";
const dc4 = "/assets/DCdoctor4.jpg";
const dc5 = "/assets/DCdoctor5.jpg";
const dc6 = "/assets/DCdoctor6.jpg";
const dc7 = "/assets/DCdoctor7.jpg";
const dc8 = "/assets/DCdoctor8.jpg";
const dc9 = "/assets/DCdoctor9.jpg";
const dc10 = "/assets/DCdoctor10.jpg";
const dc11 = "/assets/DCdoctor11.jpg";
const dc12 = "/assets/DCdoctor12.jpg";
const dc13 = "/assets/DCdoctor13.jpg";
const dc14 = "/assets/DCdoctor14.jpg";
const dc15 = "/assets/DCdoctor15.jpg";
const dc16 = "/assets/DCdoctor16.jpg";
const dc17 = "/assets/DCdoctor17.jpg";
const dc18 = "/assets/DCdoctor18.jpg";
const dc19 = "/assets/DCdoctor19.jpg";
const dc20 = "/assets/DCdoctor20.jpg";
const dc21 = "/assets/DCdoctor21.jpg";
const dc22 = "/assets/DCdoctor22.jpg";
const dc23 = "/assets/DCdoctor23.jpg";

const dc25 = "/assets/DCdoctor25.jpg";
const dc26 = "/assets/DCdoctor26.jpg";
const dc27 = "/assets/DCdoctor27.jpg";
const dc28 = "/assets/DCdoctor28.jpg";
const dc29 = "/assets/DCdoctor29.jpg";

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
function StatCircle({ value, label }) {
    return (
        <div className="dc-stat-orbit-wrap">
            <span className="dc-stat-orbit-dot dc-stat-orbit-dot--a" aria-hidden />
            <span className="dc-stat-orbit-dot dc-stat-orbit-dot--b" aria-hidden />
            <div className="dc-stat-orbit">
                <div className="dc-stat-orbit__number">{value}</div>
                <div className="dc-stat-orbit__label">{label}</div>
            </div>
        </div>
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

/* ============================ Pagina ============================ */
function DoctoresPage() {
    const { t, lang } = useSiteCopy();

    // ---------- Imagenes con alts localizados ----------
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
    const imagesKids = useMemo(() => getKidsCarouselImages(t("altKids")), [t]);

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
            <TopBar lang={lang} />
            <LanguageSwitcher currentLang={lang} page="doctores" />

            <main className="min-h-dvh bg-[#0f2237]">
                {/* Hero */}
                <section className="relative overflow-hidden bg-[radial-gradient(70%_70%_at_50%_0%,rgba(255,255,255,0.08),transparent_60%)]">
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b]" />
                    <Container className="py-12 md:py-16">
                        <div className="text-center">
                            <div className="section-eyebrow mb-4">{t("eyebrowTeam")}</div>
                            <h1 className="font-display relative mt-2 inline-block pb-1 text-3xl font-semibold md:text-5xl">
                                <span className="golden-sweep">{t("pageTitle")}</span>
                                <span className="title-underline" />
                            </h1>
                            <p className="mx-auto mt-8 max-w-3xl text-base leading-relaxed text-white/85 md:text-lg">
                                {t("heroP1", {
                                    years: t("heroP1_years"),
                                    allSpecs: t("heroP1_allSpecs"),
                                    twoBranches: t("heroP1_twoBranches"),
                                    kids: t("heroP1_kids"),
                                })}
                            </p>
                            <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-white/85 md:text-lg">
                                {t("heroP2")}
                            </p>
                            <p
                                className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-white/85 md:text-lg [&_strong]:font-semibold [&_strong]:text-white"
                                dangerouslySetInnerHTML={{ __html: t("heroP3") }}
                            />
                            <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-white/85 md:text-lg">
                                {t("heroP4")}
                            </p>
                        </div>
                    </Container>
                </section>

                {/* Carrusel Dental City */}
                <section className="pb-10 pt-4 md:pt-6">
                    <Container>
                        <SectionTitle
                            eyebrow={t("eyebrowMainClinic")}
                            title={<span className="golden-sweep">{t("titleMainClinic")}</span>}
                        />
                        <p className="mx-auto mt-5 max-w-3xl text-center text-base leading-relaxed text-white/85 md:text-lg">
                            {t("mainClinicDesc")}
                        </p>
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
                <section className="pb-10 md:pb-12">
                    <Container>
                        <SectionTitle
                            eyebrow={t("eyebrowKids")}
                            title={<span className="golden-sweep">{t("titleKids")}</span>}
                        />
                        <p className="mx-auto mt-5 max-w-3xl text-center text-base leading-relaxed text-white/85 md:text-lg">
                            {t("kidsClinicDesc")}
                        </p>
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

                {/* 29 dentistas + especialidades */}
                <section className="pb-16 pt-6 md:pt-10">
                    <Container>
                        <div className="dc-dentists-pill-wrap mx-auto w-full max-w-xl">
                            <span
                                className="dc-dentists-pill-spark h-1 w-1"
                                style={{ top: "18%", left: "8%" }}
                                aria-hidden
                            />
                            <span
                                className="dc-dentists-pill-spark h-1.5 w-1.5"
                                style={{ top: "28%", right: "6%" }}
                                aria-hidden
                            />
                            <span
                                className="dc-dentists-pill-spark h-1 w-1"
                                style={{ bottom: "22%", left: "14%" }}
                                aria-hidden
                            />
                            <span
                                className="dc-dentists-pill-spark h-1 w-1"
                                style={{ bottom: "30%", right: "12%" }}
                                aria-hidden
                            />
                            <div className="dc-dentists-pill">
                                <span className="dc-dentists-pill__number">29</span>
                                <span className="dc-dentists-pill__label">{t("dentistsCount")}</span>
                            </div>
                        </div>

                        <h2 className="font-display mx-auto mt-10 max-w-2xl text-center text-2xl font-semibold text-[#e4b892] md:mt-12 md:text-[1.75rem]">
                            {t("specialtiesTitle")}
                        </h2>

                        <div className="mx-auto mt-10 grid max-w-4xl grid-cols-3 gap-x-4 gap-y-10 overflow-visible sm:gap-x-6 sm:gap-y-12 md:max-w-5xl md:gap-x-10">
                            {stats.map(([label, value], idx) => (
                                <motion.div
                                    key={label}
                                    className="overflow-visible py-1"
                                    initial={{ opacity: 0, y: 14 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.04 }}
                                >
                                    <StatCircle value={value} label={label} />
                                </motion.div>
                            ))}
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

export default function DoctoresContent({ lang = "es" }) {
    const normalized = normalizeLang(lang);
    return (
        <SiteCopyProvider copy={getDoctorsCopy(normalized)} lang={normalized}>
            <DoctoresPage />
        </SiteCopyProvider>
    );
}



   