import React from "react";
import { motion } from "framer-motion";
import { DOCTOR_INSTAGRAM_REELS } from "../config/doctor-instagram-reels.js";
import { InstagramReelIframe } from "./InstagramEmbed.jsx";
import { useSiteCopy } from "./SiteCopyContext.jsx";

const ITEM_DEFAULTS = {
    team: {
        title: "El equipo de Dental City",
        description:
            "29 especialistas, formación continua, tecnología digital y atención humana en cada especialidad.",
    },
    andrea: {
        title: "Diseño de sonrisa",
        description: "La Dra. Andrea nos explica cómo funciona el diseño de sonrisa en Dental City.",
    },
    alvaro: {
        title: "Colocación de implantes",
        description: "El Dr. Álvaro nos habla de la colocación de implantes.",
    },
    yolanda: {
        title: "Odontopediatría",
        description: "La Dra. Yolanda nos platica sobre la odontopediatría.",
    },
    ivan: {
        title: "Odontología biológica",
        description:
            "El Dr. Iván nos habla sobre la odontología biológica (también conocida como odontología holística).",
    },
    digital: {
        title: "Equipo digital en acción",
        description: "Nuestro equipo digital en acción: tecnología de vanguardia al servicio de tu sonrisa.",
    },
};

function Container({ children, className = "" }) {
    return <div className={`mx-auto w-full max-w-6xl px-6 md:px-8 ${className}`}>{children}</div>;
}

export default function DoctorVideosSection({ className = "", withTopBorder = false }) {
    const { t } = useSiteCopy();

    return (
        <section id="videos-doctores" className={`relative py-16 md:py-20 ${className}`}>
            {withTopBorder && (
                <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b]" />
            )}

            <Container>
                <div className="text-center">
                    <p className="section-eyebrow mb-4">
                        {t("doctorVideos.eyebrow", { defaultValue: "NUESTROS ESPECIALISTAS" })}
                    </p>
                    <h2 className="font-display text-2xl font-semibold text-[#e4b892] md:text-4xl">
                        {t("doctorVideos.title", { defaultValue: "Videos de nuestros doctores" })}
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-base text-white/70 md:text-[17px]">
                        {t("doctorVideos.subtitle", {
                            defaultValue:
                                "Conoce al equipo médico de Dental City y su enfoque en cada especialidad.",
                        })}
                    </p>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {DOCTOR_INSTAGRAM_REELS.map((video, idx) => {
                        const defaults = ITEM_DEFAULTS[video.id] ?? { title: "Video", description: "" };
                        const title = t(`doctorVideos.items.${video.id}.title`, { defaultValue: defaults.title });
                        const description = t(`doctorVideos.items.${video.id}.description`, {
                            defaultValue: defaults.description,
                        });

                        return (
                            <motion.article
                                key={video.id}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ duration: 0.45, delay: (idx % 3) * 0.06 }}
                                className="dc-treatment-video-card dc-treatment-instagram-pair-card flex flex-col p-4 md:p-5"
                            >
                                <h3 className="text-center text-base font-semibold text-[#e4b892] md:text-lg">{title}</h3>
                                <p className="mt-2 flex-1 text-center text-sm leading-relaxed text-white/75">{description}</p>
                                <div className="mt-4 flex flex-col items-center">
                                    <InstagramReelIframe
                                        postUrl={video.postUrl}
                                        title={title}
                                        className="dc-treatment-instagram-iframe"
                                    />
                                    <a
                                        href={video.postUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-4 text-center text-sm font-medium text-[#e4b892] transition hover:text-[#f4d3b3]"
                                    >
                                        {t("doctorVideos.link", { defaultValue: "Ver en Instagram" })}
                                    </a>
                                </div>
                            </motion.article>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
}
