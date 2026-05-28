// src/pages/blog/14.jsx
import React from "react";
import TopBar from "../TopBar.jsx";
import Footer from "../Footer.jsx";
import odontologiaDigital from "/assets/escaneo.jpg";

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
        title: "Odontolog�a digital en Dental City: esc�neres, gu�as y precisi�n",
        excerpt:
            "La revoluci�n digital lleg� a la odontolog�a. En Dental City, los esc�neres intraorales, gu�as quir�rgicas y flujos digitales permiten tratamientos m�s precisos, c�modos y personalizados.",
        cover: odontologiaDigital,
        category: "Tecnolog�a",
        tags: ["Odontolog�a digital", "Esc�ner intraoral", "Gu�as quir�rgicas", "Precisi�n cl�nica"],
        date: "2025-10-21",
        readingMin: 6,
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
                            <a href="/blog?cat=Innovaci�n" className="hover:underline">
                                Innovaci�n
                            </a>{" "}
                            <span className="opacity-50">/</span>{" "}
                            <span className="text-white">{post.title}</span>
                        </nav>

                        <header className="mt-4 md:mt-6">
                            <Eyebrow>INNOVACI�N</Eyebrow>
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
                                <span className="text-white/30">�</span>
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
                            {post.excerpt} Gracias a la integraci�n de tecnolog�a digital en
                            cada etapa del tratamiento, nuestros pacientes experimentan una
                            odontolog�a m�s r�pida, precisa y predecible, desde el diagn�stico
                            hasta la restauraci�n final.
                        </p>

                        <div className="mt-8 grid gap-6">
                            {/* 1 */}
                            <article className="rounded-3xl bg-white/[.04] border border-white/10 p-6">
                                <h2 className="text-2xl font-semibold text-[#e4b892]">
                                    1. Esc�ner intraoral: precisi�n sin moldes
                                </h2>
                                <p className="mt-3 text-white/85 leading-relaxed">
                                    Los esc�neres intraorales reemplazan las impresiones
                                    tradicionales de silic�n. Con una c�mara �ptica de alta
                                    resoluci�n, obtenemos una imagen tridimensional exacta de tu
                                    boca en segundos. Esto mejora la comodidad del paciente y
                                    elimina errores de distorsi�n.
                                    En Dental City utilizamos flujos digitales para restauraciones
                                    cer�micas, alineadores, implantes y coronas con <b>ajuste
                                        milim�trico</b>.
                                </p>
                            </article>

                            {/* 2 */}
                            <article className="rounded-3xl bg-white/[.04] border border-white/10 p-6">
                                <h2 className="text-2xl font-semibold text-[#e4b892]">
                                    2. Gu�as quir�rgicas: seguridad en cada mil�metro
                                </h2>
                                <p className="mt-3 text-white/85 leading-relaxed">
                                    Gracias a los modelos digitales obtenidos por escaneo, podemos
                                    dise�ar y fabricar <b>gu�as quir�rgicas personalizadas</b> que
                                    permiten colocar implantes con precisi�n tridimensional.
                                    Estas gu�as reducen el tiempo quir�rgico, el sangrado y las
                                    molestias, garantizando resultados predecibles y estables a
                                    largo plazo.
                                </p>
                            </article>

                            {/* 3 */}
                            <article className="rounded-3xl bg-white/[.04] border border-white/10 p-6">
                                <h2 className="text-2xl font-semibold text-[#e4b892]">
                                    3. Dise�o asistido por computadora (CAD/CAM)
                                </h2>
                                <p className="mt-3 text-white/85 leading-relaxed">
                                    Una vez digitalizado el modelo, los softwares CAD/CAM permiten
                                    dise�ar restauraciones est�ticas y funcionales en minutos.
                                    En Dental City trabajamos con sistemas de <b>fresado
                                        cer�mico</b> y <b>resinas h�bridas</b> de �ltima generaci�n,
                                    logrando coronas y carillas personalizadas con precisi�n
                                    microm�trica.
                                </p>
                            </article>

                            {/* 4 */}
                            <article className="rounded-3xl bg-white/[.04] border border-white/10 p-6">
                                <h2 className="text-2xl font-semibold text-[#e4b892]">
                                    4. Flujo digital integral
                                </h2>
                                <p className="mt-3 text-white/85 leading-relaxed">
                                    Desde el primer diagn�stico hasta la entrega final, todo el
                                    proceso se realiza digitalmente: escaneo, planificaci�n,
                                    dise�o y fabricaci�n.
                                    Esto se traduce en <b>menos citas, mayor precisi�n y una
                                        experiencia m�s c�moda</b> para el paciente.
                                    Adem�s, permite almacenar registros digitales seguros y
                                    comparativos para el seguimiento a largo plazo.
                                </p>
                            </article>

                            {/* 5 */}
                            <article className="rounded-3xl bg-white/[.04] border border-white/10 p-6">
                                <h2 className="text-2xl font-semibold text-[#e4b892]">
                                    5. Beneficios de la odontolog�a digital
                                </h2>
                                <ul className="mt-3 list-disc pl-6 text-white/85 leading-relaxed">
                                    <li>Mayor precisi�n diagn�stica y restauradora.</li>
                                    <li>Procedimientos m�s r�pidos y c�modos.</li>
                                    <li>Comunicaci�n visual con el paciente (antes y despu�s en 3D).</li>
                                    <li>Menor margen de error humano.</li>
                                    <li>Resultados est�ticos m�s naturales y duraderos.</li>
                                </ul>
                            </article>
                        </div>

                        {/* Conclusi�n */}
                        <p className="mt-10 text-white/85 leading-relaxed text-lg">
                            La odontolog�a digital representa el presente y el futuro de la
                            atenci�n dental. En Dental City, la tecnolog�a se combina con la
                            experiencia cl�nica para ofrecerte <b>precisi�n, confort y
                                resultados predecibles</b> en cada tratamiento.
                            Nuestra meta es simple: que sonr�as con confianza, sabiendo que
                            est�s en manos expertas.
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
                                ? Volver al blog
                            </a>
                            <a
                                href="/#ubicacion"
                                className="rounded-xl bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b] px-4 py-2 text-[#0f2237] font-medium hover:brightness-110 transition"
                            >
                                Agenda tu diagn�stico digital
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
