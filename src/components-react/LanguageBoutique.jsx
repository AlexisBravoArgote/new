import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "./i18n";

function GlobeIcon({ className = "h-5 w-5" }) {
    return (
        <svg
            viewBox="0 0 24 24"
            className={className}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
        >
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
    );
}

const LANGUAGES = [
    { code: "es", badge: "ES", label: "Espa\u00f1ol" },
    { code: "en", badge: "EN", label: "English" },
    { code: "fr", badge: "FR", label: "Fran\u00e7ais" },
    { code: "zh", badge: "\u4e2d", label: "\u4e2d\u6587" },
    { code: "ja", badge: "\u65e5", label: "\u65e5\u672c\u8a9e" },
    { code: "ko", badge: "\ud55c", label: "\ud55c\uad6d\uc5b4" },
    { code: "it", badge: "IT", label: "Italiano" },
    { code: "de", badge: "DE", label: "Deutsch" },
];

export default function LanguageBoutique() {
    const { t } = useTranslation();

    const [openLang, setOpenLang] = useState(false);
    const langWrapRef = useRef(null);

    useEffect(() => {
        const onDocClick = (e) => {
            if (langWrapRef.current && !langWrapRef.current.contains(e.target)) {
                setOpenLang(false);
            }
        };
        const onKey = (e) => e.key === "Escape" && setOpenLang(false);
        document.addEventListener("mousedown", onDocClick);
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("mousedown", onDocClick);
            document.removeEventListener("keydown", onKey);
        };
    }, []);

    const changeLang = async (code) => {
        await i18n.changeLanguage(code);
        localStorage.setItem("lang", code);
        setOpenLang(false);
    };

    return (
        <div ref={langWrapRef} className="fixed top-2 right-1 z-[90] md:top-4 md:right-4">
            <button
                type="button"
                onClick={() => setOpenLang((v) => !v)}
                className="p-0 border-0 bg-transparent text-[#e4b892] shadow-none md:inline-flex md:items-center md:justify-center md:rounded-full md:border md:border-[#e4b89240] md:bg-[#0b1b2b99] md:p-3 md:text-white md:backdrop-blur-md md:shadow-[0_8px_30px_rgba(0,0,0,0.45)] md:hover:brightness-110 md:active:scale-[0.98] md:transition-all"
                aria-haspopup="menu"
                aria-expanded={openLang}
                aria-label={t("languageLabel", { defaultValue: "Language" })}
                title={t("languageLabel", { defaultValue: "Language" })}
            >
                <GlobeIcon className="h-[22px] w-[22px] md:h-5 md:w-5" />
            </button>

            {openLang && (
                <div
                    role="menu"
                    className="mt-2 w-[220px] rounded-2xl border border-[#e4b89233] bg-[#11243a]/95 p-2 text-white/90 shadow-[0_18px_50px_rgba(0,0,0,.55)] backdrop-blur-xl md:w-[300px]"
                >
                    <div className="grid grid-cols-2 gap-2">
                        {LANGUAGES.map((it) => {
                            const active = i18n.language?.startsWith(it.code);
                            return (
                                <button
                                    key={it.code}
                                    type="button"
                                    onClick={() => changeLang(it.code)}
                                    className={`flex items-center gap-2 rounded-xl px-3 py-2 text-left transition hover:bg-white/10 ${
                                        active ? "bg-white/10 ring-1 ring-[#e4b89266]" : ""
                                    }`}
                                    role="menuitem"
                                    aria-label={it.label}
                                    title={it.label}
                                >
                                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-white/10 text-[10px] font-bold text-[#e4b892]">
                                        {it.badge}
                                    </span>
                                    <span className="text-[12px] opacity-90 md:text-sm">{it.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
