import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navigateToLocation } from "../lib/home-sections.js";
import { getHomeCopy, normalizeLang, translate } from "../lib/site-copy.js";
import { useOptionalSiteCopy } from "./SiteCopyContext.jsx";

function useFloatingCopy(langProp) {
    const siteCopy = useOptionalSiteCopy();
    const lang = normalizeLang(langProp ?? siteCopy?.lang ?? "es");
    const copy = siteCopy?.copy ?? getHomeCopy(lang);
    const t = (key, vars) => translate(copy, key, vars);
    return { t, lang };
}

export function FloatingCta({ lang: langProp }) {
    const { t, lang } = useFloatingCopy(langProp);
    const [open, setOpen] = useState(false);
    const wrapRef = useRef(null);
    const [showCta, setShowCta] = useState(false);
    const [overlapsLocationCta, setOverlapsLocationCta] = useState(false);

    useEffect(() => {
        const about = document.getElementById("about");
        const isHome = Boolean(about);

        const checkOverlap = () => {
            if (!window.matchMedia("(max-width: 767px)").matches) {
                setOverlapsLocationCta(false);
                return;
            }
            const floating = wrapRef.current;
            const cta = document.getElementById("location-cta-buttons");
            if (!floating || !cta) {
                setOverlapsLocationCta(false);
                return;
            }
            const a = floating.getBoundingClientRect();
            const b = cta.getBoundingClientRect();
            const overlaps =
                a.top < b.bottom - 4 &&
                a.bottom > b.top + 4 &&
                a.left < b.right &&
                a.right > b.left;
            setOverlapsLocationCta(overlaps);
        };

        const update = () => {
            if (!isHome) {
                setShowCta(true);
                checkOverlap();
                return;
            }
            const top = about.getBoundingClientRect().top;
            const reachedAbout = top <= window.innerHeight * 0.9;
            setShowCta(reachedAbout);
            if (!reachedAbout) setOpen(false);
            checkOverlap();
        };

        if (!isHome) {
            setShowCta(true);
        } else {
            update();
        }

        window.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", update);
        return () => {
            window.removeEventListener("scroll", update);
            window.removeEventListener("resize", update);
        };
    }, []);

    useEffect(() => {
        if (!open) return undefined;
        const onDown = (e) => {
            if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
        };
        const onKey = (e) => {
            if (e.key === "Escape") setOpen(false);
        };
        document.addEventListener("mousedown", onDown);
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("mousedown", onDown);
            document.removeEventListener("keydown", onKey);
        };
    }, [open]);

    const go = (tabKey) => {
        setOpen(false);
        navigateToLocation(tabKey, lang);
    };

    return (
        <div
            ref={wrapRef}
            className={[
                "fixed bottom-5 right-5 z-50 transition-all duration-300",
                showCta ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-3 pointer-events-none",
            ].join(" ")}
        >
            <motion.button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className={[
                    "relative rounded-full px-6 py-3 text-sm font-semibold shadow-xl transition hover:brightness-105 active:scale-[0.97]",
                    overlapsLocationCta
                        ? "max-md:bg-[#d8a07b]/45 max-md:text-[#0b1b2b]/90 max-md:ring-2 max-md:ring-[#d8a07b]/25 max-md:backdrop-blur-sm"
                        : "bg-[#d8a07b] text-[#0b1b2b] ring-4 ring-[#d8a07b]/25",
                ].join(" ")}
                aria-haspopup="menu"
                aria-expanded={open}
                animate={{
                    filter: open
                        ? "drop-shadow(0 0 14px rgba(216,160,123,0.7))"
                        : "drop-shadow(0 0 0 rgba(0,0,0,0))",
                }}
                transition={{ duration: 0.35 }}
            >
                {t("hero.book", { defaultValue: "Agendar cita" })}
                <motion.span
                    className="inline-block ml-1"
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                >
                    ▾
                </motion.span>
            </motion.button>

            <AnimatePresence>
                {open && (
                    <motion.button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="fixed inset-0 z-[-1] cursor-default"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        aria-hidden="true"
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.22 }}
                        className="absolute bottom-[110%] right-0 w-[260px] rounded-2xl border border-[#d8a07b]/25 bg-[#11243a]/95 p-2 text-white/90 shadow-2xl backdrop-blur"
                        role="menu"
                    >
                        <span className="pointer-events-none absolute -bottom-2 right-6 h-4 w-4 rotate-45 rounded-[4px] bg-[#11243a]/95 border-l border-b border-[#d8a07b]/25" />

                        <button
                            type="button"
                            onClick={() => go("Dental City")}
                            className="flex w-full items-center justify-between gap-2 rounded-xl px-4 py-3 text-left transition hover:bg-[#d8a07b]/15"
                            role="menuitem"
                        >
                            <span>Dental City</span>
                            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                        </button>

                        <button
                            type="button"
                            onClick={() => go("Dental City Kids & Family")}
                            className="mt-1 flex w-full items-center justify-between gap-2 rounded-xl px-4 py-3 text-left transition hover:bg-[#d8a07b]/15"
                            role="menuitem"
                        >
                            <span>Dental City Kids & Family</span>
                            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export function FloatingBackToTop() {
    const [visible, setVisible] = useState(false);
    const tickingRef = useRef(false);

    useEffect(() => {
        const onScroll = () => {
            if (!tickingRef.current) {
                tickingRef.current = true;
                requestAnimationFrame(() => {
                    const y = window.scrollY || document.documentElement.scrollTop || 0;
                    setVisible(y > 360);
                    tickingRef.current = false;
                });
            }
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollTop = () => {
        try {
            window.scrollTo({ top: 0, behavior: "smooth" });
        } catch {
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        }
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.button
                    key="backtotop"
                    type="button"
                    onClick={scrollTop}
                    aria-label="Volver arriba"
                    title="Volver arriba"
                    initial={{ opacity: 0, y: 16, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 16, scale: 0.95 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="fixed bottom-5 left-5 z-50 grid h-12 w-12 place-items-center rounded-full bg-[#d8a07b] text-[#0b1b2b] shadow-xl ring-4 ring-[#d8a07b]/25 hover:brightness-110 active:scale-95"
                >
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 19V5" />
                        <path d="M5 12l7-7 7 7" />
                    </svg>
                    <span className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(228,184,146,0.20),transparent_60%)]" />
                </motion.button>
            )}
        </AnimatePresence>
    );
}

/** Botón flotante de cita + volver arriba (mismo comportamiento que la home). */
export default function FloatingPageUi({ lang }) {
    return (
        <>
            <FloatingCta lang={lang} />
            <FloatingBackToTop />
        </>
    );
}
