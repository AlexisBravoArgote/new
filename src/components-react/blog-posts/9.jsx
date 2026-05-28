// src/pages/blog/12.jsx
import React, { useMemo } from "react";
import TopBar from "../TopBar.jsx";
import Footer from "../Footer.jsx";



// Im�genes
const sagradocorazon = "/assets/sagradocorazon.jpg";
const sagradocorazon2 = "/assets/sagradocorazon2.jpg";
const sagradocorazon3 = "/assets/sagradocorazon3.jpg";
const sagradocorazon4 = "/assets/sagradocorazon4.jpg";
const sagradocorazon5 = "/assets/sagradocorazon5.jpg";
const sagradocorazon6 = "/assets/sagradocorazon6.jpg";
const sagradocorazon7 = "/assets/sagradocorazon7.jpg";

/* ------------------------- Helpers UI ------------------------- */
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

/* ------------------------- Carrusel ------------------------- */
function Carousel({ images = [], caption = "" }) {
    const [i, setI] = React.useState(0);
    const [progress, setProgress] = React.useState(0);
    const rafRef = React.useRef(null);
    const startRef = React.useRef(0);
    const DURATION_MS = 5000;

    const go = (d) => setI((p) => (p + d + images.length) % images.length);
    const goTo = (idx) => setI(idx);

    React.useEffect(() => {
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
    }, [i, images.length]);

    if (!images.length) return null;

    return (
        <div className="rounded-[28px] bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b] p-[1.5px] shadow-[0_18px_50px_rgba(0,0,0,.35)]">
            <div className="rounded-[26px] overflow-hidden bg-[#0f2237]/90 backdrop-blur">
                {/* Foto completa (sin recortar) */}
                <div className="relative w-full" style={{ height: "min(70vh, 90vw)" }}>
                    <img
                        src={images[i]}
                        alt={caption || `Foto ${i + 1}`}
                        className="absolute inset-0 h-full w-full object-contain bg-[#0f2237]"
                    />
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b]" />

                    {images.length > 1 && (
                        <>
                            <button
                                onClick={() => go(-1)}
                                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/35 hover:bg-black/45 text-white w-9 h-9 grid place-items-center"
                                aria-label="Anterior"
                            >
                                �
                            </button>
                            <button
                                onClick={() => go(1)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/35 hover:bg-black/45 text-white w-9 h-9 grid place-items-center"
                                aria-label="Siguiente"
                            >
                                �
                            </button>

                            {/* Progreso dorado */}
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
                        <div className="flex gap-3 justify-center flex-wrap">
                            {images.map((src, idx) => (
                                <button
                                    key={src + idx}
                                    onClick={() => goTo(idx)}
                                    aria-label={`Ir a foto ${idx + 1}`}
                                    className={`rounded-xl p-[1.5px] ${i === idx
                                            ? "bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b]"
                                            : "bg-white/10 hover:bg-white/20"
                                        }`}
                                >
                                    <div className="rounded-[10px] overflow-hidden bg-[#0f2237]">
                                        <img
                                            src={src}
                                            alt={`Miniatura ${idx + 1}`}
                                            className="h-16 w-20 object-cover"
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

/* ------------------------- P�gina ------------------------- */
export default function BlogPost9() {
    const post = {
        id: "9",
        title:
            "Filantrop�a: apoyo al Centro de Ayuda Integral Sagrado Coraz�n, A.C.",
        excerpt:
            "Dental City don� atenci�n y material para apoyar a las hermanas del Centro de Ayuda Integral Sagrado Coraz�n, A.C., reforzando nuestra misi�n social.",
        category: "Filantrop�a",
        tags: ["Comunidad", "Donativos", "Alianzas", "Impacto social"],
        date: "2025-06-15",
        cover: sagradocorazon,
    };

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

    // ? Ahora s�: todas tus fotos en un solo arreglo
    const photos = useMemo(
        () => [
            sagradocorazon,
            sagradocorazon2,
            sagradocorazon3,
            sagradocorazon4,
            sagradocorazon5,
            sagradocorazon6,
            sagradocorazon7,
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
                            <a href="/blog" className="hover:underline">Blog & Research</a>{" "}
                            <span className="opacity-50">/</span>{" "}
                            <a href="/blog?cat=Filantrop�a" className="hover:underline">Filantrop�a</a>{" "}
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

                    {/* Carrusel con tus fotos */}
                    <div className="mt-6">
                        <Container className="max-w-6xl">
                            <Carousel images={photos} caption="Apoyo Sagrado Coraz�n � Dental City" />
                        </Container>
                    </div>
                </section>

                {/* Body */}
                <section className="py-10 md:py-12">
                    <Container>
                        <p className="text-white/85 text-lg leading-relaxed">
                            {post.excerpt} En colaboraci�n con aliados estrat�gicos,
                            enfocamos esfuerzos para acompa�ar procesos de protecci�n,
                            reintegraci�n y desarrollo de mujeres y sus hijas e hijos.
                        </p>

                        <div className="mt-8 grid gap-6">
                            <article className="rounded-3xl bg-white/[.04] border border-white/10 p-6">
                                <h2 className="text-2xl font-semibold text-[#e4b892]">Alianza con Rotary Club Valle Real</h2>
                                <p className="mt-3 text-white/85 leading-relaxed">
                                    Nos asociamos con <strong>Rotary International � Club Valle Real</strong> para apoyar
                                    econ�micamente a las hermanas del <strong>Centro de Ayuda Integral Sagrado Coraz�n, A.C.</strong>.
                                    En conjunto brindamos <strong>donativos en efectivo</strong>, <strong>ropa</strong>, <strong>v�veres</strong>,
                                    <strong> comida</strong> y otros insumos esenciales. Adem�s, el equipo de Dental City don�
                                    <strong> atenci�n dental</strong> y material, alineando el proyecto con nuestra misi�n
                                    de salud e inclusi�n.
                                </p>
                            </article>

                            <article className="rounded-3xl bg-white/[.04] border border-white/10 p-6">
                                <h2 className="text-2xl font-semibold text-[#e4b892]">�Qu� es el Centro Sagrado Coraz�n?</h2>
                                <p className="mt-3 text-white/85 leading-relaxed">
                                    El <strong>Sagrado Coraz�n</strong> es una <strong>casa de refugio</strong> que brinda acompa�amiento
                                    integral a <strong>mam�s solteras en situaciones de vulnerabilidad</strong>. Ofrece alojamiento,
                                    contenci�n, formaci�n y redes de apoyo para que las familias recuperen estabilidad y autonom�a.
                                </p>
                                <p className="mt-3 text-white/85 leading-relaxed">
                                    El centro fue fundado en <strong>1929</strong> por la <strong>Madre Rita Ruiz Velasco ��iguez</strong>,
                                    y desde entonces se sostiene gracias a la labor de las hermanas y al compromiso de la comunidad.
                                </p>
                            </article>

                            <article className="rounded-3xl bg-white/[.04] border border-white/10 p-6">
                                <h2 className="text-2xl font-semibold text-[#e4b892]">Renovaci�n de instalaciones</h2>
                                <p className="mt-3 text-white/85 leading-relaxed">
                                    Actualmente nos estamos organizando para <strong>renovar las instalaciones</strong> del centro:
                                    mantenimiento de �reas comunes, mejoras en dormitorios y actualizaci�n de espacios para
                                    la atenci�n de madres y ni�as/os. Estamos <strong>buscando donadores y convenios</strong> con empresas,
                                    profesionales y organizaciones que deseen sumar con materiales, mano de obra o recursos econ�micos.
                                </p>
                            </article>

                            <article className="rounded-3xl bg-white/[.04] border border-white/10 p-6">
                                <h2 className="text-2xl font-semibold text-[#e4b892]">�C�mo puedes sumarte?</h2>
                                <ul className="mt-3 list-disc pl-6 text-white/85 leading-relaxed">
                                    <li>Donativos en especie: ropa, v�veres, art�culos de higiene y limpieza.</li>
                                    <li>Apoyo econ�mico para mantenimiento y renovaci�n de espacios.</li>
                                    <li>Convenios con empresas para materiales, transporte y log�stica.</li>
                                    <li>Voluntariado profesional (salud, oficios, asesor�a legal/psicosocial).</li>
                                </ul>
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
                                className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-white/85 hover:bg-white/10 transition"
                            >
                                ? Volver al blog
                            </a>
                        </div>
                    </Container>
                </section>
            </main>

            <Footer />

            <style>{`
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

