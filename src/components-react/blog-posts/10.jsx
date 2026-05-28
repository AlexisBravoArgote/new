import React, { useEffect, useMemo, useRef, useState } from "react";
import TopBar from "../TopBar.jsx";
import Footer from "../Footer.jsx";

const cendi = "/assets/cendi.jpg";
const cendi2 = "/assets/cendi2.jpg";
const cendi3 = "/assets/cendi3.jpg";
const cendi4 = "/assets/cendi4.jpg";
const cendi5 = "/assets/cendi5.jpg";
const cendi6 = "/assets/cendi6.jpg";
const cendi7 = "/assets/cendi7.jpg";
const cendi8 = "/assets/cendi8.jpg";
const cendi9 = "/assets/cendi9.jpg";
const cendi10 = "/assets/cendi10.jpg";
const cendi11 = "/assets/cendi11.jpg";
const cendi12 = "/assets/cendi12.jpg";
const cendi13 = "/assets/cendi13.jpg";
const cendi14 = "/assets/cendi14.jpg";
const cendi15 = "/assets/cendi15.jpg";
const cendi16 = "/assets/cendi16.jpg";
const cendi17 = "/assets/cendi17.jpg";

function Container({ children, className = "" }) {
    return (
        <div className={`mx-auto w-full max-w-4xl px-6 md:px-8 ${className}`}>
            {children}
        </div>
    );
}

function Eyebrow({ children }) {
    return (
        <span className="inline-flex items-center gap-2 rounded-full border border-[#e4b89233] bg-white/5 px-3 py-1 text-[11px] tracking-[.35em] text-[#e4b892]">
            {children}
        </span>
    );
}

function Chevron({ dir = "left" }) {
    return (
        <svg
            viewBox="0 0 24 24"
            className={`h-5 w-5 ${dir === "right" ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
        >
            <path d="M15 19l-7-7 7-7" />
        </svg>
    );
}

function Carousel({ images = [], caption = "" }) {
    const [i, setI] = useState(0);
    const trackRef = useRef(null);
    const DURATION_MS = 5000;
    const rafRef = useRef(null);
    const startRef = useRef(0);
    const [progress, setProgress] = useState(0);

    const go = (delta) =>
        setI((idx) => (idx + delta + images.length) % images.length);
    const goTo = (idx) => setI(idx);

    useEffect(() => {
        const parent = trackRef.current;
        if (!parent) return;
        const el = parent.querySelector(`[data-thumb="${i}"]`);
        if (!el) return;
        const center = el.offsetLeft - (parent.clientWidth - el.clientWidth) / 2;
        parent.scrollTo({ left: Math.max(0, center), behavior: "smooth" });
    }, [i]);

    useEffect(() => {
        if (images.length < 2) return;
        startRef.current = performance.now();
        cancelAnimationFrame(rafRef.current);

        const step = (now) => {
            const elapsed = now - startRef.current;
            const pct = Math.min(100, (elapsed / DURATION_MS) * 100);
            setProgress(pct);
            if (elapsed >= DURATION_MS) {
                setProgress(100);
                go(1);
            } else {
                rafRef.current = requestAnimationFrame(step);
            }
        };

        rafRef.current = requestAnimationFrame(step);
        return () => cancelAnimationFrame(rafRef.current);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [i, images.length]);

    if (!images.length) return null;

    return (
        <div className="rounded-[28px] bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b] p-[1.5px] shadow-[0_18px_50px_rgba(0,0,0,.35)]">
            <div className="rounded-[26px] overflow-hidden bg-[#0f2237]/90 backdrop-blur">
                <div className="relative w-full aspect-[16/9]">
                    <img
                        src={images[i]}
                        alt={caption || `Foto ${i + 1}`}
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b]" />

                    {images.length > 1 && (
                        <>
                            <button
                                type="button"
                                onClick={() => go(-1)}
                                aria-label="Anterior"
                                className="absolute left-3 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/55"
                            >
                                <Chevron dir="left" />
                            </button>
                            <button
                                type="button"
                                onClick={() => go(1)}
                                aria-label="Siguiente"
                                className="absolute right-3 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/55"
                            >
                                <Chevron dir="right" />
                            </button>

                            <div className="absolute right-4 bottom-3 rounded-lg bg-black/40 px-2 py-1 text-sm text-white/90 backdrop-blur-sm">
                                {String(i + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
                            </div>

                            <div className="absolute left-0 right-0 bottom-0 h-[3px] bg-white/10">
                                <div
                                    className="h-full bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b] transition-[width] duration-75"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </>
                    )}
                </div>

                {images.length > 1 && (
                    <div className="p-3">
                        <div
                            ref={trackRef}
                            className="flex gap-3 overflow-x-auto no-scrollbar"
                        >
                            {images.map((src, idx) => (
                                <button
                                    key={`${src}-${idx}`}
                                    type="button"
                                    data-thumb={idx}
                                    onClick={() => goTo(idx)}
                                    aria-label={`Ir a foto ${idx + 1}`}
                                    aria-current={i === idx ? "true" : undefined}
                                    className={`shrink-0 rounded-xl p-[1.5px] transition ${
                                        i === idx
                                            ? "bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b]"
                                            : "bg-white/10 hover:bg-white/20"
                                    }`}
                                >
                                    <div className="overflow-hidden rounded-[10px] bg-[#0f2237]">
                                        <img
                                            src={src}
                                            alt={`Miniatura ${idx + 1}`}
                                            className="h-16 w-24 object-cover"
                                        />
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function BlogPost10() {
    const post = {
        id: "10",
        title: "Filantropía: jornada gratuita para niñas y niños de CENDI Tlajomulco",
        excerpt:
            "En alianza con el Centro de estimulación para personas con discapacidad intelectual (CENDI) y Rotary International Club Valle Real, brindamos limpiezas, extracciones y revisiones sin costo, promoviendo salud oral inclusiva.",
        category: "Filantropía",
        tags: ["Inclusión", "Infancia", "Comunidad", "Voluntariado"],
        date: "2025-10-17",
        cover: cendi,
    };

    const photos = useMemo(
        () => [
            cendi,
            cendi2,
            cendi3,
            cendi4,
            cendi5,
            cendi6,
            cendi7,
            cendi8,
            cendi9,
            cendi10,
            cendi11,
            cendi12,
            cendi13,
            cendi14,
            cendi15,
            cendi16,
            cendi17,
        ],
        []
    );

    return (
        <>
            <TopBar />

            <main className="min-h-dvh bg-[#0f2237]">
                <section className="relative overflow-hidden bg-[radial-gradient(70%_70%_at_50%_0%,rgba(255,255,255,0.08),transparent_60%)]">
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b]" />

                    <Container className="py-8 md:py-10">
                        <nav className="text-sm text-white/70">
                            <a href="/blog" className="hover:underline hover:text-white">
                                Blog & Research
                            </a>{" "}
                            <span className="opacity-50">/</span>{" "}
                            <a href="/blog?cat=Filantropía" className="hover:underline hover:text-white">
                                Filantropía
                            </a>{" "}
                            <span className="opacity-50">/</span>{" "}
                            <span className="text-white">{post.title}</span>
                        </nav>

                        <header className="mt-4 text-center md:mt-6">
                            <Eyebrow>FILANTROPÍA</Eyebrow>
                            <h1 className="font-display mt-3 text-3xl font-semibold leading-tight md:text-5xl">
                                <span className="relative inline-block pb-2">
                                    <span className="golden-sweep">{post.title}</span>
                                    <span className="title-underline" />
                                </span>
                            </h1>
                            <div className="mt-4 text-[12px] uppercase tracking-[.18em] text-white/60">
                                <time dateTime={post.date}>
                                    {new Date(post.date).toLocaleDateString("es-MX", {
                                        year: "numeric",
                                        month: "long",
                                        day: "2-digit",
                                    })}
                                </time>
                            </div>
                        </header>
                    </Container>

                    <div className="mt-6">
                        <Container className="max-w-6xl">
                            <Carousel images={photos} caption="Jornada gratuita — Dental City" />
                        </Container>
                    </div>
                </section>

                <section className="py-10 md:py-12">
                    <Container>
                        <p className="text-lg leading-relaxed text-white/85">
                            {post.excerpt} En Dental City creemos que la salud oral es un
                            derecho desde la infancia. Por eso organizamos una jornada
                            integral con enfoque inclusivo, segura y afectuosa, para que
                            niñas, niños y familias vivan una experiencia odontológica
                            positiva.
                        </p>

                        <div className="mt-8 grid gap-6">
                            <article className="rounded-3xl border border-white/10 bg-white/[.04] p-6">
                                <h2 className="text-2xl font-semibold text-[#e4b892]">¿Qué hicimos?</h2>
                                <ul className="mt-3 list-disc space-y-1 pl-6 text-white/85 leading-relaxed">
                                    <li>Valoraciones clínicas personalizadas.</li>
                                    <li>Limpiezas y profilaxis según edad y tolerancia.</li>
                                    <li>Aplicación de flúor y selladores cuando estuvo indicado.</li>
                                    <li>
                                        Extracciones simples en casos seleccionados, con manejo del
                                        dolor y contención emocional.
                                    </li>
                                    <li>
                                        Educación a familias: higiene, dieta cariogénica y señales
                                        de alerta.
                                    </li>
                                </ul>
                            </article>

                            <article className="rounded-3xl border border-white/10 bg-white/[.04] p-6">
                                <h2 className="text-2xl font-semibold text-[#e4b892]">Enfoque inclusivo</h2>
                                <p className="mt-3 leading-relaxed text-white/85">
                                    Adaptamos los tiempos, el lenguaje y el entorno sensorial.
                                    Usamos apoyos visuales, desensibilización gradual y
                                    acompañamiento familiar para reducir la ansiedad. Nuestro
                                    objetivo fue construir confianza y respeto por el ritmo de
                                    cada paciente.
                                </p>
                            </article>

                            <article className="rounded-3xl border border-white/10 bg-white/[.04] p-6">
                                <h2 className="text-2xl font-semibold text-[#e4b892]">Impacto</h2>
                                <p className="mt-3 leading-relaxed text-white/85">
                                    Además de la atención clínica, logramos agendar seguimientos
                                    para quienes lo requirieron y conectamos a familias con
                                    programas de prevención continua. Gracias al apoyo de
                                    voluntariado y aliados locales, la jornada se realizó sin
                                    costo para las familias.
                                </p>
                            </article>

                            <article className="rounded-3xl border border-white/10 bg-white/[.04] p-6">
                                <h2 className="text-2xl font-semibold text-[#e4b892]">
                                    Agradecimientos y próximos pasos
                                </h2>
                                <p className="mt-3 leading-relaxed text-white/85">
                                    Agradecemos a la asociación aliada, a nuestro equipo clínico y
                                    a todas las familias por su confianza. Repetiremos estas
                                    jornadas periódicamente; si quieres participar o sumar donativos
                                    de insumos, ¡contáctanos!
                                </p>
                            </article>
                        </div>

                        <div className="mt-8 flex flex-wrap gap-2">
                            {post.tags.map((t) => (
                                <span
                                    key={t}
                                    className="rounded-full border border-[#e4b89233] bg-white/5 px-3 py-1 text-sm text-[#e4b892]"
                                >
                                    #{t}
                                </span>
                            ))}
                        </div>

                        <div className="mt-10">
                            <a
                                href="/blog"
                                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-white/85 transition hover:border-[#e4b892]/40 hover:bg-white/10"
                            >
                                ← Volver al blog
                            </a>
                        </div>
                    </Container>
                </section>
            </main>

            <Footer />

            <style>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </>
    );
}
