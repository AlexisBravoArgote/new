import React, { useEffect, useRef, useState } from "react";

export default function Carousel({
    images = [],
    ariaLabel = "gallery",
    autoPlay = true,
    duration = 7000,
    prevLabel = "Previous",
    nextLabel = "Next",
}) {
    const [i, setI] = useState(0);
    const n = images.length || 1;
    const [progress, setProgress] = useState(0);
    const [hovering, setHovering] = useState(false);

    const tickIdRef = useRef(null);
    const startRef = useRef(Date.now());
    const pausedUntilRef = useRef(0);

    const railRef = useRef(null);

    const clearTick = () => {
        if (tickIdRef.current) {
            clearInterval(tickIdRef.current);
            tickIdRef.current = null;
        }
    };

    const resetCycle = () => {
        startRef.current = Date.now();
        setProgress(0);
    };

    const pauseAutoplay = (ms = Math.max(1200, Math.floor(duration * 0.75))) => {
        pausedUntilRef.current = Date.now() + ms;
    };

    const go = (dir) => {
        setI((prev) => (prev + dir + n) % n);
        pauseAutoplay();
        resetCycle();
    };

    const set = (idx) => {
        setI(idx);
        pauseAutoplay();
        resetCycle();
    };

    useEffect(() => {
        clearTick();
        if (!autoPlay || n <= 1) return;

        startRef.current = Date.now();
        setProgress(0);

        tickIdRef.current = setInterval(() => {
            const now = Date.now();
            if (hovering || now < pausedUntilRef.current) return;

            const elapsed = now - startRef.current;
            if (elapsed >= duration) {
                setI((prev) => (prev + 1) % n);
                startRef.current = now;
                setProgress(0);
            } else {
                setProgress((elapsed / duration) * 100);
            }
        }, 100);

        return clearTick;
    }, [autoPlay, duration, n, hovering]);

    useEffect(() => {
        const rail = railRef.current;
        if (!rail) return;
        const item = rail.querySelector(`#thumb-${i}`);
        if (!item) return;

        const railRect = rail.getBoundingClientRect();
        const itemRect = item.getBoundingClientRect();

        const fullyVisible =
            itemRect.left >= railRect.left && itemRect.right <= railRect.right;
        if (fullyVisible) return;

        const itemCenter = item.offsetLeft + item.offsetWidth / 2;
        const target = itemCenter - rail.clientWidth / 2;
        rail.scrollTo({ left: target, behavior: "smooth" });
    }, [i]);

    return (
        <>
            <div
                className="group"
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => {
                    setHovering(false);
                    resetCycle();
                }}
                aria-label={ariaLabel}
            >
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[.04] shadow-[0_18px_50px_rgba(0,0,0,.35)]">
                    <div
                        className="flex transition-transform duration-500 ease-out"
                        style={{ transform: `translateX(-${i * 100}%)` }}
                    >
                        {images.map((img, idx) => (
                            <div key={idx} className="relative min-w-full">
                                <div className="relative flex h-[60vh] w-full items-center justify-center bg-[#0f2237] md:h-auto md:max-h-[80vh]">
                                    {img.src ? (
                                        <img
                                            src={img.src}
                                            alt={img.alt || "Imagen"}
                                            className="h-full w-full object-cover md:h-auto md:max-h-[80vh] md:w-auto md:object-contain"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_35%,rgba(255,255,255,0.08),transparent_60%)]" />
                                    )}
                                </div>

                                <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b]" />
                            </div>
                        ))}
                    </div>

                    {n > 1 && (
                        <>
                            <button
                                type="button"
                                onClick={() => go(-1)}
                                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-[#0d2034]/70 p-2 backdrop-blur hover:bg-[#0d2034]/90"
                                aria-label={prevLabel}
                                title={prevLabel}
                            >
                                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M15 18l-6-6 6-6" />
                                </svg>
                            </button>
                            <button
                                type="button"
                                onClick={() => go(1)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-[#0d2034]/70 p-2 backdrop-blur hover:bg-[#0d2034]/90"
                                aria-label={nextLabel}
                                title={nextLabel}
                            >
                                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M9 18l6-6-6-6" />
                                </svg>
                            </button>
                        </>
                    )}
                </div>

                {n > 1 && (
                    <div className="dc-carousel-progress-row mt-5 flex items-center gap-4 md:mt-6">
                        <div className="dc-carousel-progress-track min-w-0 flex-1 overflow-hidden rounded-full">
                            <div
                                className="dc-carousel-progress-fill h-full rounded-full transition-[width] duration-100 ease-linear"
                                style={{ width: autoPlay ? `${progress}%` : `${((i + 1) / n) * 100}%` }}
                            />
                        </div>
                        <div className="dc-carousel-counter shrink-0 rounded-lg border border-[#e4b89233] bg-[#0f2237]/90 px-3 py-1.5 text-[11px] font-medium tracking-[0.12em] text-[#e4b892] md:text-xs">
                            {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
                        </div>
                    </div>
                )}

                {n > 1 && (
                    <div className="mt-5 flex justify-center md:mt-6">
                        <div ref={railRef} className="thumb-rail flex max-w-full gap-3 overflow-x-auto px-2 py-2 md:gap-3.5">
                            {images.map((img, idx) => {
                                const selected = i === idx;
                                return (
                                    <button
                                        key={idx}
                                        id={`thumb-${idx}`}
                                        type="button"
                                        onMouseDown={(e) => e.preventDefault()}
                                        tabIndex={-1}
                                        onClick={() => set(idx)}
                                        className={`dc-carousel-thumb relative shrink-0 transition-all duration-300 ${
                                            selected ? "opacity-100" : "opacity-75 hover:opacity-95"
                                        }`}
                                        aria-label={(img.alt || "Imagen") + ` ${idx + 1}`}
                                        aria-current={selected ? "true" : undefined}
                                        title={(img.alt || "Imagen") + ` ${idx + 1}`}
                                    >
                                        <div
                                            className={`rounded-xl p-[1.5px] ${
                                                selected
                                                    ? "bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b] shadow-[0_0_18px_rgba(228,184,146,0.35)]"
                                                    : "bg-white/15"
                                            }`}
                                        >
                                            <div className="overflow-hidden rounded-[10px] bg-[#0f2237]">
                                                <img
                                                    src={img.src}
                                                    alt={img.alt || `Miniatura ${idx + 1}`}
                                                    className="h-[4.75rem] w-[7.25rem] object-cover sm:h-[5.25rem] sm:w-[8.25rem] md:h-[5.75rem] md:w-[9.25rem]"
                                                />
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            <style>{`
        .thumb-rail { -ms-overflow-style: none; scrollbar-width: none; overscroll-behavior-x: contain; }
        .thumb-rail::-webkit-scrollbar { display: none; }
      `}</style>
        </>
    );
}
