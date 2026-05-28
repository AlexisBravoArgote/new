// src/pages/blog/10.jsx
import React, { useMemo, useRef, useState } from "react";
import TopBar from "../TopBar.jsx";
import Footer from "../Footer.jsx";



// Assets (puedes importar m�s y agregarlas al array 'photos')
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

/* ------------------------- UI Helpers ------------------------- */
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

/* ------------------------- Carrusel con miniaturas ------------------------- */
// Auto-cambio + barra de progreso dorada
function Carousel({ images = [], caption = "" }) {
    const [i, setI] = useState(0);
    const trackRef = useRef(null);

    // --- AUTOPLAY CONFIG ---
    const DURATION_MS = 5000; // tiempo que dura cada foto antes de avanzar
    const rafRef = useRef(null);
    const startRef = useRef(0);
    const [progress, setProgress] = useState(0); // 0..100

    const go = (delta) =>
        setI((idx) => (idx + delta + images.length) % images.length);
    const goTo = (idx) => setI(idx);

    // centra la miniatura activa (solo desplazamiento horizontal del carril, sin mover la p�gina)
    useEffect(() => {
        const parent = trackRef.current;
        if (!parent) return;
        const el = parent.querySelector(`[data-thumb="${i}"]`);
        if (!el) return;

        const center =
            el.offsetLeft - (parent.clientWidth - el.clientWidth) / 2;

        parent.scrollTo({
            left: Math.max(0, center),
            behavior: "smooth",
        });
    }, [i]);

    // ciclo de autoplay + progreso
    useEffect(() => {
        if (images.length < 2) return;

        // reinicia el contador y la animaci�n cada que cambia la imagen
        startRef.current = performance.now();
        cancelAnimationFrame(rafRef.current);

        const step = (now) => {
            const elapsed = now - startRef.current;
            const pct = Math.min(100, (elapsed / DURATION_MS) * 100);
            setProgress(pct);

            if (elapsed >= DURATION_MS) {
                setProgress(100);
                // pasa a la siguiente y el efecto reinicia solo
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
                {/* Imagen principal (AHORA M�S ALTA) */}
                <div className="relative w-full aspect-[16/9] md:aspect-[16/9]">
                    <img
                        src={images[i]}
                        alt={caption || `Foto ${i + 1}`}
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b]" />

                    {images.length > 1 && (
                        <>
                            {/* Controles */}
                            <button
                                onClick={() => go(-1)}
                                aria-label="Anterior"
                                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/35 hover:bg-black/45 text-white w-9 h-9 grid place-items-center"
                            >
                                �
                            </button>
                            <button
                                onClick={() => go(1)}
                                aria-label="Siguiente"
                                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/35 hover:bg-black/45 text-white w-9 h-9 grid place-items-center"
                            >
                                �
                            </button>

                            <div className="absolute right-4 bottom-3 text-white/85 text-sm bg-black/35 px-2 py-1 rounded-lg">
                                {String(i + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
                            </div>

                            {/* Barra de progreso dorada */}
                            <div className="absolute left-0 right-0 bottom-0 h-[3px] bg-white/10">
                                <div
                                    className="h-full bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b]"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </>
                    )}
                </div>

                {/* Miniaturas */}
                {images.length > 1 && (
                    <div className="p-3">
                        <div
                            ref={trackRef}
                            className="flex gap-3 overflow-x-auto no-scrollbar"
                            style={{ scrollBehavior: "smooth" }}
                        >
                            {images.map((src, idx) => (
                                <button
                                    key={src + idx}
                                    data-thumb={idx}
                                    onClick={() => goTo(idx)}
                                    aria-label={`Ir a foto ${idx + 1}`}
                                    className={`shrink-0 rounded-xl p-[1.5px] ${i === idx
                                        ? "bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b]"
                                        : "bg-white/10"
                                        }`}
                                >
                                    <div className="rounded-xl overflow-hidden bg-[#0f2237]">
                                        <img src={src} alt={`Miniatura ${idx + 1}`} className="h-16 w-24 object-cover" />
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

/* ------------------------- P�gina ------------------------- */
export default function BlogPost10() {
    const post = {
        id: "10",
        title:
            "Filantrop�a: jornada gratuita para ni�as y ni�os de CENDI Tlajomulco",
        excerpt:
            "En alianza con el Centro de estimulaci�n para personas con discapacidad intelectual (CENDI) y Rotary International Club Valle Real, brindamos limpiezas, extracciones y revisiones sin costo, promoviendo salud oral inclusiva.",
        category: "Filantrop�a",
        tags: ["Inclusi�n", "Infancia", "Comunidad", "Voluntariado"],
        date: "2025-10-18",
        cover: cendi,
    };

    // Structured Data para art�culo de blog
    const articleData = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.excerpt,
        "image": `https://dentalcity.mx${post.cover}`,
        "datePublished": post.date,
        "dateModified": post.date,
        "author": {
            "@type": "Organization",
            "name": "Dental City"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Dental City",
            "logo": {
                "@type": "ImageObject",
                "url": "https://dentalcity.mx/logo.png"
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://dentalcity.mx/blog/${post.id}`
        },
        "keywords": post.tags.join(", "),
        "articleSection": post.category
    };

    // Fotos del carrusel
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
                {/* Hero */}
                <section className="relative overflow-hidden bg-[radial-gradient(70%_70%_at_50%_0%,rgba(255,255,255,0.08),transparent_60%)]">
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b]" />

                    <Container className="py-8 md:py-10">
                        <nav className="text-sm text-white/70">
                            <a href="/blog" className="hover:underline">
                                Blog & Research
                            </a>{" "}
                            <span className="opacity-50">/</span>{" "}
                            <a href="/blog?cat=Filantrop�a" className="hover:underline">
                                Filantrop�a
                            </a>{" "}
                            <span className="opacity-50">/</span>{" "}
                            <span className="text-white">{post.title}</span>
                        </nav>

                        <header className="mt-4 md:mt-6 text-center">
                            <Eyebrow>FILANTROP�A</Eyebrow>
                            <h1 className="mt-3 text-3xl md:text-5xl font-semibold leading-tight">
                                <span className="relative inline-block">
                                    <span className="golden-sweep">{post.title}</span>
                                    <span className="absolute left-0 right-0 -bottom-2 h-[2px] rounded bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b]" />
                                </span>
                            </h1>

                            {/* Solo fecha (sin 'min') */}
                            <div className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[12px] tracking-[.18em] uppercase text-white/60">
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

                    {/* Carrusel en el hero */}
                    <div className="mt-6">
                        <Container className="max-w-6xl">
                            <Carousel images={photos} caption="Jornada gratuita � Dental City" />
                        </Container>
                    </div>
                </section>

                {/* Body */}
                <section className="py-10 md:py-12">
                    <Container>
                        {/* Intro */}
                        <p className="text-white/85 text-lg leading-relaxed">
                            {post.excerpt} En Dental City creemos que la salud oral es un
                            derecho desde la infancia. Por eso organizamos una jornada
                            integral con enfoque inclusivo, segura y afectuosa, para que
                            ni�as, ni�os y familias vivan una experiencia odontol�gica
                            positiva.
                        </p>

                        {/* Bloques */}
                        <div className="mt-8 grid gap-6">
                            <article className="rounded-3xl bg-white/[.04] border border-white/10 p-6">
                                <h2 className="text-2xl font-semibold text-[#e4b892]">
                                    �Qu� hicimos?
                                </h2>
                                <ul className="mt-3 list-disc pl-6 text-white/85 leading-relaxed">
                                    <li>Valoraciones cl�nicas personalizadas.</li>
                                    <li>Limpiezas y profilaxis seg�n edad y tolerancia.</li>
                                    <li>Aplicaci�n de fl�or y selladores cuando estuvo indicado.</li>
                                    <li>
                                        Extracciones simples en casos seleccionados, con manejo del
                                        dolor y contenci�n emocional.
                                    </li>
                                    <li>
                                        Educaci�n a familias: higiene, dieta cariog�nica y se�ales
                                        de alerta.
                                    </li>
                                </ul>
                            </article>

                            <article className="rounded-3xl bg-white/[.04] border border-white/10 p-6">
                                <h2 className="text-2xl font-semibold text-[#e4b892]">
                                    Enfoque inclusivo
                                </h2>
                                <p className="mt-3 text-white/85 leading-relaxed">
                                    Adaptamos los tiempos, el lenguaje y el entorno sensorial.
                                    Usamos apoyos visuales, desensibilizaci�n gradual y
                                    acompa�amiento familiar para reducir la ansiedad. Nuestro
                                    objetivo fue construir confianza y respeto por el ritmo de
                                    cada paciente.
                                </p>
                            </article>

                            <article className="rounded-3xl bg-white/[.04] border border-white/10 p-6">
                                <h2 className="text-2xl font-semibold text-[#e4b892]">
                                    Impacto
                                </h2>
                                <p className="mt-3 text-white/85 leading-relaxed">
                                    Adem�s de la atenci�n cl�nica, logramos agendar seguimientos
                                    para quienes lo requirieron y conectamos a familias con
                                    programas de prevenci�n continua. Gracias al apoyo de
                                    voluntariado y aliados locales, la jornada se realiz� sin
                                    costo para las familias.
                                </p>
                            </article>

                            <article className="rounded-3xl bg-white/[.04] border border-white/10 p-6">
                                <h2 className="text-2xl font-semibold text-[#e4b892]">
                                    Agradecimientos y pr�ximos pasos
                                </h2>
                                <p className="mt-3 text-white/85 leading-relaxed">
                                    Agradecemos a la asociaci�n aliada, a nuestro equipo cl�nico y
                                    a todas las familias por su confianza. Repetiremos estas
                                    jornadas peri�dicamente; si quieres participar o sumar donativos
                                    de insumos, �cont�ctanos!
                                </p>
                            </article>
                        </div>

                        {/* Tags */}
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

                        {/* CTA de regreso */}
                        <div className="mt-10">
                            <a
                                href="/blog"
                                className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-white/85 hover:bg-white/10 transition"
                            >
                                ? Volver al blog
                            </a>
                        </div>
                    </Container>
                </section>
            </main>

            <Footer />

            {/* Estilos utilitarios */}
            <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .golden-sweep{
          color: transparent;
          background-image: linear-gradient(90deg,#c89b7b 0%,#e4b892 20%,#f4d3b3 35%,#e4b892 60%,#c89b7b 100%);
          background-size: 250% 100%;
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 4s linear infinite;
          display: inline-block;
        }
      `}</style>
        </>
    );
}


