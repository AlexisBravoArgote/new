import React, { useEffect, useRef, useState } from "react";
import { LOCALES } from "../config/languages.js";
import { getPagePath } from "../lib/site-copy.js";

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

/**
 * @param {{ currentLang: string; page: 'home' | 'doctores' }} props
 */
export default function LanguageSwitcher({ currentLang, page }) {
    const [open, setOpen] = useState(false);
    const wrapRef = useRef(null);

    useEffect(() => {
        const onDocClick = (e) => {
            if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
        };
        const onKey = (e) => e.key === "Escape" && setOpen(false);
        document.addEventListener("mousedown", onDocClick);
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("mousedown", onDocClick);
            document.removeEventListener("keydown", onKey);
        };
    }, []);

    return (
        <div ref={wrapRef} className="fixed top-2 right-1 z-[90] md:top-4 md:right-4">
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="border-0 bg-transparent p-0 text-[#e4b892] shadow-none md:inline-flex md:items-center md:justify-center md:rounded-full md:border md:border-[#e4b89240] md:bg-[#0b1b2b99] md:p-3 md:text-white md:backdrop-blur-md md:shadow-[0_8px_30px_rgba(0,0,0,0.45)] md:hover:brightness-110 md:active:scale-[0.98] md:transition-all"
                aria-haspopup="menu"
                aria-expanded={open}
                aria-label="Language"
                title="Language"
            >
                <GlobeIcon className="h-[22px] w-[22px] md:h-5 md:w-5" />
            </button>

            {open && (
                <div
                    role="menu"
                    className="mt-2 w-[220px] rounded-2xl border border-[#e4b89233] bg-[#11243a]/95 p-2 text-white/90 shadow-[0_18px_50px_rgba(0,0,0,.55)] backdrop-blur-xl md:w-[300px]"
                >
                    <div className="grid grid-cols-2 gap-2">
                        {LOCALES.map((locale) => {
                            const active = currentLang === locale.code;
                            const href = getPagePath(page, locale.code);
                            return (
                                <a
                                    key={locale.code}
                                    href={href}
                                    role="menuitem"
                                    hrefLang={locale.hreflang}
                                    onClick={() => setOpen(false)}
                                    className={`flex items-center gap-2 rounded-xl px-3 py-2 text-left transition hover:bg-white/10 ${
                                        active ? "bg-white/10 ring-1 ring-[#e4b89266]" : ""
                                    }`}
                                    aria-current={active ? "page" : undefined}
                                >
                                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-white/10 text-[10px] font-bold uppercase text-[#e4b892]">
                                        {locale.code}
                                    </span>
                                    <span className="text-[12px] opacity-90 md:text-sm">{locale.label}</span>
                                </a>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
