// src/pages/blog/19.jsx
import React from "react";
import TopBar from "../TopBar.jsx";
import Footer from "../Footer.jsx";
const endodoncia = "/assets/endodoncia2.jpg";

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

export default function BlogPost8() {
    const post = {
        id: "8",
        title: "Endodoncia guiada por imagen: cuándo recurrimos a CBCT y cómo mejora la tasa de éxito en casos complejos",
        excerpt:
            "La endodoncia guiada por imagen utiliza tomografía volumétrica (CBCT) para planificar y ejecutar tratamientos de conductos con precisión milimétrica. Ideal para casos complejos, retratamientos y anatomías difíciles.",
        cover: endodoncia,
        category: "Endodoncia",
        tags: ["Endodoncia", "CBCT", "Odontología digital", "Tratamiento de conductos"],
        date: "2024-11-16",
        readingMin: 7,
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
                            <a href="/blog?cat=Endodoncia" className="hover:underline">
                                Endodoncia
                            </a>{" "}
                            <span className="opacity-50">/</span>{" "}
                            <span className="text-white">{post.title}</span>
                        </nav>

                        <header className="mt-4 md:mt-6">
                            <Eyebrow>ENDODONCIA</Eyebrow>
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
                        <p className="text-white/85 text-lg leading-relaxed">
                            {post.excerpt}
                            En Dental City integramos la imagen 3D a nuestra práctica endodóntica
                            para diagnosticar, planificar y ejecutar tratamientos con la máxima
                            precisión y seguridad.
                        </p>

                        <div className="mt-8 grid gap-6">
                            {/* 1 */}
                            <article className="rounded-3xl bg-white/[.04] border border-white/10 p-6">
                                <h2 className="text-2xl font-semibold text-[#e4b892]">
                                    1. ¿Qué es la endodoncia guiada por imagen?
                                </h2>
                                <p className="mt-3 text-white/85 leading-relaxed">
                                    Es una técnica que utiliza la tomografía computarizada de haz
                                    cónico (CBCT) junto con el escaneo digital del diente para crear
                                    un modelo tridimensional exacto.
                                    Esta guía permite localizar conductos calcificados, medir longitudes
                                    con exactitud y evitar errores durante la instrumentación.
                                </p>
                            </article>

                            {/* 2 */}
                            <article className="rounded-3xl bg-white/[.04] border border-white/10 p-6">
                                <h2 className="text-2xl font-semibold text-[#e4b892]">
                                    2. Cuándo recurrimos a CBCT
                                </h2>
                                <ul className="mt-3 list-disc pl-6 text-white/85 leading-relaxed">
                                    <li>Casos de anatomía radicular compleja o atípica.</li>
                                    <li>Retratamientos endodónticos con conductos obstruidos o curvaturas.</li>
                                    <li>Fracturas radiculares o perforaciones.</li>
                                    <li>Lesiones periapicales no visibles en radiografía convencional.</li>
                                    <li>Evaluación prequirúrgica antes de una apicectomía.</li>
                                </ul>
                                <p className="mt-3 text-white/85 leading-relaxed">
                                    Gracias al CBCT, podemos analizar el caso antes de intervenir,
                                    diseñando una guía precisa que optimiza el acceso y la
                                    instrumentación sin comprometer tejido sano.
                                </p>
                            </article>

                            {/* 3 */}
                            <article className="rounded-3xl bg-white/[.04] border border-white/10 p-6">
                                <h2 className="text-2xl font-semibold text-[#e4b892]">
                                    3. Beneficios clínicos de la endodoncia guiada
                                </h2>
                                <ul className="mt-3 list-disc pl-6 text-white/85 leading-relaxed">
                                    <li>Diagnóstico más preciso y menos invasivo.</li>
                                    <li>Localización exacta de conductos o¿cuáltos o calcificados.</li>
                                    <li>Reducción significativa de errores de perforación.</li>
                                    <li>Mayor conservación de estructura dentaria.</li>
                                    <li>Disminución del tiempo clínicao y mayor comodidad para el paciente.</li>
                                </ul>
                            </article>

                            {/* 4 */}
                            <article className="rounded-3xl bg-white/[.04] border border-white/10 p-6">
                                <h2 className="text-2xl font-semibold text-[#e4b892]">
                                    4. Tecnología utilizada en Dental City
                                </h2>
                                <p className="mt-3 text-white/85 leading-relaxed">
                                    En Dental City utilizamos CBCT de alta resolución junto con
                                    software de planificación digital y guías impresas en 3D.
                                    Esto nos permite realizar tratamientos endodónticos asistidos
                                    por computadora con precisión submilimétricaca.
                                    Además, combinamos estos recursos con microscopía dental
                                    para una visualización completa del campo operatorio.
                                </p>
                            </article>

                            {/* 5 */}
                            <article className="rounded-3xl bg-white/[.04] border border-white/10 p-6">
                                <h2 className="text-2xl font-semibold text-[#e4b892]">
                                    5. Resultados y tasa de éxito
                                </h2>
                                <p className="mt-3 text-white/85 leading-relaxed">
                                    La La literatura científica muestra que la endodoncia guiada por
                                    imagen aumenta la tasa de éxito por encima del 95 % en casos
                                    complejos o retratamientos.
                                    Al evitar errores de instrumentación y mejorar la limpieza del
                                    sistema de conductos, se logra una cicatrización periapical
                                    más rápida y predecible.
                                </p>
                            </article>

                            {/* 6 */}
                            <article className="rounded-3xl bg-white/[.04] border border-white/10 p-6">
                                <h2 className="text-2xl font-semibold text-[#e4b892]">
                                    6. Ventajas para el paciente
                                </h2>
                                <ul className="mt-3 list-disc pl-6 text-white/85 leading-relaxed">
                                    <li>Procedimientos más seguros y cómodos.</li>
                                    <li>Menor número de sesiones.</li>
                                    <li>Recuperación más rápida y mínima molestia postoperatoria.</li>
                                    <li>Mayor preservación de la estructura dental natural.</li>
                                </ul>
                            </article>
                        </div>

                        {/* Conclusión */}
                        <p className="mt-10 text-white/85 leading-relaxed text-lg">
                            En Dental City, la combinación de experiencia clínica y tecnología
                            3D nos permite ofrecer tratamientos endodónticos de alta precisión,
                            incluso en los casos más complejos.
                            <b>La endodoncia guiada por imagen no solo mejora los resultados,
                                sino que redefine el estándar de seguridad y confort para el paciente.</b>
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
                                Agenda tu valoración endodóntica
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
