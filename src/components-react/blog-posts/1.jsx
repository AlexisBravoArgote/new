// src/components-react/blog-posts/1.jsx
import React from "react";
import TopBar from "../TopBar.jsx";
import Footer from "../Footer.jsx";
import limpiezaDental from "/assets/limpieza.jpg";

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

export default function BlogPost1() {
    const post = {
        id: "13",
        title: "Gu�a definitiva de la limpieza dental profesional",
        excerpt:
            "�Qu� sucede realmente durante una limpieza dental profesional? M�s all� de lo est�tico, esta rutina es clave para prevenir enfermedades, mantener enc�as sanas y prolongar la vida de tus dientes.",
        cover: limpiezaDental,
        category: "Prevenci�n",
        tags: ["Limpieza dental", "Higiene oral", "Odontolog�a preventiva", "Enc�as sanas"],
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
                            <a href="/blog?cat=Prevenci�n" className="hover:underline">
                                Prevenci�n
                            </a>{" "}
                            <span className="opacity-50">/</span>{" "}
                            <span className="text-white">{post.title}</span>
                        </nav>

                        <header className="mt-4 md:mt-6">
                            <Eyebrow>PREVENCI�N</Eyebrow>
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
                            {post.excerpt} En Dental City creemos que entender el proceso te
                            ayuda a cuidar mejor tu salud oral y a perder el miedo a este
                            procedimiento tan com�n como importante.
                        </p>

                        <div className="mt-8 grid gap-6">
                            {/* 1 */}
                            <article className="rounded-3xl bg-white/[.04] border border-white/10 p-6">
                                <h2 className="text-2xl font-semibold text-[#e4b892]">
                                    1. Evaluaci�n inicial
                                </h2>
                                <p className="mt-3 text-white/85 leading-relaxed">
                                    Todo comienza con una inspecci�n cl�nica y, si es necesario,
                                    radiogr�fica. El odont�logo eval�a la presencia de placa,
                                    sarro, inflamaci�n o sangrado. Esta etapa permite personalizar
                                    la limpieza y detectar signos tempranos de gingivitis o
                                    periodontitis.
                                </p>
                            </article>

                            {/* 2 */}
                            <article className="rounded-3xl bg-white/[.04] border border-white/10 p-6">
                                <h2 className="text-2xl font-semibold text-[#e4b892]">
                                    2. Ultrasonido: eliminaci�n del sarro
                                </h2>
                                <p className="mt-3 text-white/85 leading-relaxed">
                                    Usamos un instrumento que vibra suavemente para desprender el
                                    sarro y la placa endurecida sin da�ar el esmalte. Este paso es
                                    indoloro y r�pido, especialmente con equipos modernos como los
                                    que utilizamos en Dental City. El sonido puede ser curioso,
                                    pero el resultado es inmediato: enc�as m�s limpias y
                                    saludables.
                                </p>
                            </article>

                            {/* 3 */}
                            <article className="rounded-3xl bg-white/[.04] border border-white/10 p-6">
                                <h2 className="text-2xl font-semibold text-[#e4b892]">
                                    3. Pulido con pasta profil�ctica
                                </h2>
                                <p className="mt-3 text-white/85 leading-relaxed">
                                    Tras retirar el sarro, se aplica una pasta especial con una
                                    copa de goma que pule la superficie dental. Esto elimina
                                    pigmentaciones leves de caf�, t� o vino, y deja la superficie
                                    lisa para evitar que las bacterias se adhieran con facilidad.
                                </p>
                            </article>

                            {/* 4 */}
                            <article className="rounded-3xl bg-white/[.04] border border-white/10 p-6">
                                <h2 className="text-2xl font-semibold text-[#e4b892]">
                                    4. Aplicaci�n de fl�or (opcional pero recomendada)
                                </h2>
                                <p className="mt-3 text-white/85 leading-relaxed">
                                    El fl�or fortalece el esmalte y reduce la sensibilidad dental.
                                    En adultos y ni�os, se puede aplicar en gel o barniz. Es un
                                    refuerzo que prolonga los beneficios de la limpieza y protege
                                    contra la aparici�n de nuevas caries.
                                </p>
                            </article>

                            {/* 5 */}
                            <article className="rounded-3xl bg-white/[.04] border border-white/10 p-6">
                                <h2 className="text-2xl font-semibold text-[#e4b892]">
                                    5. Beneficios m�s all� de la est�tica
                                </h2>
                                <ul className="mt-3 list-disc pl-6 text-white/85 leading-relaxed">
                                    <li>Previene gingivitis y periodontitis.</li>
                                    <li>Elimina bacterias que causan mal aliento.</li>
                                    <li>Mejora la absorci�n de fl�or y la salud general.</li>
                                    <li>
                                        Ayuda al diagn�stico temprano de otros problemas orales.
                                    </li>
                                </ul>
                            </article>

                            {/* 6 */}
                            <article className="rounded-3xl bg-white/[.04] border border-white/10 p-6">
                                <h2 className="text-2xl font-semibold text-[#e4b892]">
                                    6. Frecuencia recomendada
                                </h2>
                                <p className="mt-3 text-white/85 leading-relaxed">
                                    En la mayor�a de los casos, una limpieza profesional cada{" "}
                                    <b>6 meses</b> es suficiente. Sin embargo, quienes usan
                                    ortodoncia, tienen implantes o antecedentes de enfermedad
                                    periodontal pueden requerir controles m�s frecuentes.
                                </p>
                            </article>
                        </div>

                        {/* Conclusi�n */}
                        <p className="mt-10 text-white/85 leading-relaxed text-lg">
                            La limpieza dental profesional no solo deja tu sonrisa m�s
                            brillante, sino que tambi�n protege tu salud general. En Dental
                            City combinamos tecnolog�a avanzada, manos expertas y una
                            experiencia c�moda para que cada visita sea una inversi�n en tu
                            bienestar.
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
                                Agendar limpieza dental
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
