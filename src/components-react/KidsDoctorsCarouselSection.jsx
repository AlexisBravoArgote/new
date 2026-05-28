import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import Carousel from "./Carousel.jsx";
import { getKidsCarouselImages } from "../data/kidsCarouselImages.js";
import "./i18n";

function WideContainer({ children, className = "" }) {
    return (
        <div className={`mx-auto w-full max-w-6xl px-6 md:px-8 ${className}`}>
            {children}
        </div>
    );
}

export default function KidsDoctorsCarouselSection() {
    const { t } = useTranslation("translation");

    const images = useMemo(
        () => getKidsCarouselImages(t("altKids", { defaultValue: "Dental City Kids" })),
        [t]
    );

    return (
        <section className="pb-16 md:pb-20">
            <WideContainer>
                <div className="text-center">
                    <p className="section-eyebrow text-[#e4b892]/90">
                        {t("eyebrowKids", { defaultValue: "• Odontopediatría y ortodoncia infantil •" })}
                    </p>
                    <h2 className="font-display relative mt-4 inline-block pb-1 text-3xl font-semibold text-[#e4b892] md:text-4xl">
                        {t("titleKids", { defaultValue: "Dental City Kids & Family" })}
                        <span className="title-underline" aria-hidden />
                    </h2>
                </div>
                <p className="mx-auto mt-6 max-w-3xl text-center text-base leading-relaxed text-white/75 md:text-[17px]">
                    {t("kidsClinicDesc", {
                        defaultValue:
                            "Especialistas en odontopediatría y ortodoncia infantil en Dental City Kids & Family. Nuestro equipo está especialmente entrenado para brindar atención dental amigable y efectiva a niños y adolescentes en Zapopan, Jalisco.",
                    })}
                </p>
                <div className="mt-8">
                    <Carousel
                        images={images}
                        ariaLabel={t("ariaKidsCarousel", { defaultValue: "Equipo Dental City Kids" })}
                        prevLabel={t("ariaPrev", { defaultValue: "Anterior" })}
                        nextLabel={t("ariaNext", { defaultValue: "Siguiente" })}
                    />
                </div>
            </WideContainer>
        </section>
    );
}
