// src/pages/blog/14.jsx
import React from "react";
import TopBar from "../TopBar.jsx";
import Footer from "../Footer.jsx";
const odontologiaDigital = "/assets/escaneo.jpg";

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

export default function BlogPost2() {
    const post = {
        id: "2",
        title: "Odontología digital en Dental City: escáneres, guías y precisión",
        excerpt:
            "La revolución digital llegó a la odontología. En Dental City, los escáneres intraorales, guías quirúrgicas y flujos digitales permiten tratamientos más precisos, cómodos y personalizados.",
        cover: odontologiaDigital,
        category: "Tecnología",
        tags: ["Odontología digital", "Escáner intraoral", "Guías quirúrgicas", "Precisión clínica"],
        date: "2025-10-21",
        readingMin: 6,
    };

    // Structured Data para artículo de blog
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
                            <a href="/blog?cat=Innovación" className="hover:underline">
                                Innovación
                            </a>{" "}
                            <span className="opacity-50">/</span>{" "}
                            <span className="text-white">{post.title}</span>
                        </nav>

                        <header className="mt-4 md:mt-6">
                            <Eyebrow>INNOVACIÓN</Eyebrow>
                            <h1 className="mt-3 text-3xl md:text-5xl font-semibold leading-tight">
                                <span className="golden-sweep">{post.title}</span>
                            </h1>

                            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-[12px] tracking-[.18em] uppercase text-white/60">
                                <time dateTime={post.date}>
                                    {new Date(post.date).toLocaleDateString("es-MX", {
                                        year: "numeric",
                                        month: "long",
                                        day: "2-digit",
                                    })}
                                </time>
                                <span className="text-white/30">•</span>
                                <span>{post.readingMin} min</span>
                            </div>
                        </header>
                    </Container>

                    {/* Hero image */}
                    <div className="mt-6">
                        <Container className="max-w-6xl">
                            <div className="rounded-[28px] bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b] p-[1.5px] shadow-[0_18px_50px_rgba(0,0,0,.35)]">
                                <div className="rounded-[26px] overflow-hidden bg-[#0f2237]/90 backdrop-blur">
                                    <div className="relative w-full aspect-[16/9]">
                                        <img
                                            src={post.cover}
                                            alt={post.title}
                                            className="absolute inset-0 h-full w-full object-cover"
                                        />
                                        <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b]" />
                                    </div>
                                </div>
                            </div>
                        </Container>
                    </div>
                </section>

                {/* Body */}
                <section className="py-10 md:py-12">
                    <Container>
                        {/* Intro */}
                        <p className="text-white/85 text-lg leading-relaxed">
                            {post.excerpt} Gracias a la integración de tecnología digital en
                            cada etapa del tratamiento, nuestros pacientes experimentan una
                            odontología más rápida, precisa y predecible, desde el diagnóstico
                            hasta la restauración final.
                        </p>

                        <div className="mt-8 grid gap-6">
                            {/* 1 */}
                            <article className="rounded-3xl bg-white/[.04] border border-white/10 p-6">
                                <h2 className="text-2xl font-semibold text-[#e4b892]">
                                    1. Escáner intraoral: precisión sin moldes
                                </h2>
                                <p className="mt-3 text-white/85 leading-relaxed">
                                    Los escáneres intraorales reemplazan las impresiones
                                    tradicionales de silicón. Con una cámara óptica de alta
                                    resolución, obtenemos una imagen tridimensional exacta de tu
                                    boca en segundos. Esto mejora la comodidad del paciente y
                                    elimina errores de distorsión.
                                    En Dental City utilizamos flujos digitales para restauraciones
                                    cerámicas, alineadores, implantes y coronas con <b>ajuste
                                        milimétrico</b>.
                                </p>
                            </article>

                            {/* 2 */}
                            <article className="rounded-3xl bg-white/[.04] border border-white/10 p-6">
                                <h2 className="text-2xl font-semibold text-[#e4b892]">
                                    2. Guías quirúrgicas: seguridad en cada milímetro
                                </h2>
                                <p className="mt-3 text-white/85 leading-relaxed">
                                    Gracias a los modelos digitales obtenidos por escaneo, podemos
                                    diseñar y fabricar <b>guías quirúrgicas personalizadas</b> que
                                    permiten colocar implantes con precisión tridimensional.
                                    Estas guías reducen el tiempo quirúrgico, el sangrado y las
                                    molestias, garantizando resultados predecibles y estables a
                                    largo plazo.
                                </p>
                            </article>

                            {/* 3 */}
                            <article className="rounded-3xl bg-white/[.04] border border-white/10 p-6">
                                <h2 className="text-2xl font-semibold text-[#e4b892]">
                                    3. Diseño asistido por computadora (CAD/CAM)
                                </h2>
                                <p className="mt-3 text-white/85 leading-relaxed">
                                    Una vez digitalizado el modelo, los softwares CAD/CAM permiten
                                    diseñar restauraciones estéticas y funcionales en minutos.
                                    En Dental City trabajamos con sistemas de <b>fresado
                                        cerámico</b> y <b>resinas híbridas</b> de última generación,
                                    logrando coronas y carillas personalizadas con precisión
                                    micrométrica.
                                </p>
                            </article>

                            {/* 4 */}
                            <article className="rounded-3xl bg-white/[.04] border border-white/10 p-6">
                                <h2 className="text-2xl font-semibold text-[#e4b892]">
                                    4. Flujo digital integral
                                </h2>
                                <p className="mt-3 text-white/85 leading-relaxed">
                                    Desde el primer diagnóstico hasta la entrega final, todo el
                                    proceso se realiza digitalmente: escaneo, planificación,
                                    diseño y fabricación.
                                    Esto se traduce en <b>menos citas, mayor precisión y una
                                        experiencia más cómoda</b> para el paciente.
                                    Además, permite almacenar registros digitales seguros y
                                    comparativos para el seguimiento a largo plazo.
                                </p>
                            </article>

                            {/* 5 */}
                            <article className="rounded-3xl bg-white/[.04] border border-white/10 p-6">
                                <h2 className="text-2xl font-semibold text-[#e4b892]">
                                    5. Beneficios de la odontología digital
                                </h2>
                                <ul className="mt-3 list-disc pl-6 text-white/85 leading-relaxed">
                                    <li>Mayor precisión diagnóstica y restauradora.</li>
                                    <li>Procedimientos más rápidos y cómodos.</li>
                                    <li>Comunicación visual con el paciente (antes y después en 3D).</li>
                                    <li>Menor margen de error humano.</li>
                                    <li>Resultados estéticos más naturales y duraderos.</li>
                                </ul>
                            </article>
                        </div>

                        {/* Conclusión */}
                        <p className="mt-10 text-white/85 leading-relaxed text-lg">
                            La odontología digital representa el presente y el futuro de la
                            atención dental. En Dental City, la tecnología se combina con la
                            experiencia clínica para ofrecerte <b>precisión, confort y
                                resultados predecibles</b> en cada tratamiento.
                            Nuestra meta es simple: que sonrías con confianza, sabiendo que
                            estás en manos expertas.
                        </p>

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

                        {/* CTA */}
                        <div className="mt-10 flex flex-wrap gap-3">
                            <a
                                href="/blog"
                                className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-white/85 hover:bg-white/10 transition"
                            >
                                ← Volver al blog
                            </a>
                            <a
                                href="/#ubicacion"
                                className="rounded-xl bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b] px-4 py-2 text-[#0f2237] font-medium hover:brightness-110 transition"
                            >
                                Agenda tu diagnóstico digital
                            </a>
                        </div>
                    </Container>
                </section>
            </main>

            <Footer />

            {/* Golden shimmer */}
            <style>{`
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .golden-sweep {
          color: transparent;
          background-image: linear-gradient(90deg,#c89b7b 0%,#e4b892 20%,#f4d3b3 35%,#e4b892 60%,#c89b7b 100%);
          background-size: 250% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 4s linear infinite;
          display: inline-block;
        }
      `}</style>
        </>
    );
}
