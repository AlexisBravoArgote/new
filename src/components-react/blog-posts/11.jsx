import React, { useEffect, useMemo, useRef, useState } from "react";
import TopBar from "../TopBar.jsx";
import Footer from "../Footer.jsx";

const atlas1 = "/assets/atlas1.jpg";
const atlas2 = "/assets/atlas2.jpg";
const atlas3 = "/assets/atlas3.jpg";
const atlas4 = "/assets/atlas4.jpg";
const atlas5 = "/assets/atlas5.jpg";

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
    const DURATION_MS = 5000;
    const rafRef = useRef(null);
    const startRef = useRef(0);
    const [progress, setProgress] = useState(0);

    const go = (delta) =>
        setI((idx) => (idx + delta + images.length) % images.length);
    const goTo = (idx) => setI(idx);

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
                <div className="relative w-full" style={{ height: "min(72vh, 92vw)" }}>
                    <img
                        src={images[i]}
                        alt={caption || `Foto ${i + 1}`}
                        className="absolute inset-0 h-full w-full object-contain bg-[#0b1b2b]"
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
                        <div className="flex flex-wrap items-center justify-center gap-3">
                            {images.map((src, idx) => (
                                <button
                                    key={`${src}-${idx}`}
                                    type="button"
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
                                            className="h-16 w-24 object-contain bg-[#0b1b2b]"
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

export default function BlogPost11() {
    const post = {
        id: "11",
        title: "Alianza: Dental City, clínica dental oficial del Club Atlas FC de Guadalajara",
        excerpt:
            "La plantilla y administración del Atlas confían su salud bucal a nuestro equipo. Conoce cómo coordinamos diagnósticos, prevención y emergencias deportivas.",
        category: "Alianza",
        tags: ["Deporte", "Atlas FC", "Prevención", "Rendimiento"],
        date: "2025-09-05",
        cover: atlas2,
    };

    const photos = useMemo(() => [atlas1, atlas2, atlas3, atlas4, atlas5], []);

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
                            <a href="/blog?cat=Alianza" className="hover:underline hover:text-white">
                                Alianza
                            </a>{" "}
                            <span className="opacity-50">/</span>{" "}
                            <span className="text-white">{post.title}</span>
                        </nav>

                        <header className="mt-4 text-center md:mt-6">
                            <Eyebrow>ALIANZA</Eyebrow>
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
                            <Carousel images={photos} caption="Alianza Atlas FC — Dental City" />
                        </Container>
                    </div>
                </section>

                <section className="py-10 md:py-12">
                    <Container>
                        <p className="text-lg leading-relaxed text-white/85">
                            {post.excerpt} Nuestra alianza garantiza protocolos clínicos de alto
                            nivel, disponibilidad para casos urgentes y planes de prevención
                            personalizados que protegen el rendimiento deportivo. En Dental City
                            unimos experiencia clínica, tecnología y trato humano para que cada
                            consulta sea eficiente y confiable.
                        </p>

                        <div className="mt-8 grid gap-6">
                            <article className="rounded-3xl border border-white/10 bg-white/[.04] p-6">
                                <h2 className="text-2xl font-semibold text-[#e4b892]">
                                    ¿Qué incluye la alianza?
                                </h2>
                                <ul className="mt-3 list-disc space-y-1 pl-6 text-white/85 leading-relaxed">
                                    <li>
                                        Atención integral a jugadores profesionales del Atlas FC
                                        (varonil y femenil) en todas las categorías.
                                    </li>
                                    <li>Recepción de cuerpo técnico y personal administrativo del club.</li>
                                    <li>
                                        Diagnóstico digital, emergencias odontológicas y tratamientos
                                        conservadores y de rehabilitación.
                                    </li>
                                    <li>
                                        Programas de prevención, guardas oclusales y seguimiento
                                        periodontal para optimizar el desempeño.
                                    </li>
                                </ul>
                            </article>

                            <article className="rounded-3xl border border-white/10 bg-white/[.04] p-6">
                                <h2 className="text-2xl font-semibold text-[#e4b892]">Atlas FC en breve</h2>
                                <p className="mt-3 leading-relaxed text-white/85">
                                    Atlas Fútbol Club es una de las instituciones históricas del
                                    balompié mexicano, con sede en Guadalajara, Jalisco. Reconocido
                                    por su cantera y por su arraigo en la afición rojinegra, el club
                                    compite en la Liga MX y cuenta con plantillas varoniles y
                                    femeniles, además de fuerzas básicas. Su cultura de disciplina y
                                    preparación constante se alinea con nuestra visión clínica y de
                                    prevención.
                                </p>
                            </article>

                            <article className="rounded-3xl border border-white/10 bg-white/[.04] p-6">
                                <h2 className="text-2xl font-semibold text-[#e4b892]">Próximos pasos</h2>
                                <p className="mt-3 leading-relaxed text-white/85">
                                    Los jugadores del Atlas visitan Dental City para sesiones de{" "}
                                    <strong>limpieza profesional y revisión</strong>, reforzando la
                                    salud oral antes y durante la temporada. Estas visitas periódicas
                                    previenen lesiones orales, controlan la inflamación gingival y
                                    mejoran la respiración y la recuperación, impactando
                                    positivamente en el rendimiento deportivo.
                                </p>
                            </article>

                            <article className="rounded-3xl border border-white/10 bg-white/[.04] p-6">
                                <h2 className="text-2xl font-semibold text-[#e4b892]">
                                    Calidad que inspira confianza
                                </h2>
                                <p className="mt-3 leading-relaxed text-white/85">
                                    La elección de Dental City por parte del Atlas FC reafirma
                                    nuestro estándar de calidad: flujos digitales, materiales de
                                    alto desempeño y un equipo clínico entrenado para trabajar con
                                    atletas de élite y pacientes de todas las edades. ¡Gracias,
                                    Rojinegros, por su confianza!
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
