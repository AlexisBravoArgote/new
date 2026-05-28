// src/pages/blog/17.jsx
import React from "react";
import TopBar from "../TopBar.jsx";
import Footer from "../Footer.jsx";
const periodoncia = "/assets/periodoncia.jpg";

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

export default function BlogPost6() {
    const post = {
        id: "6",
        title: "Periodoncia: encías sanas, sonrisa saludable",
        excerpt:
            "Las encías son el soporte invisible de tu sonrisa. La periodoncia se encarga de prevenir, diagnosticar y tratar las enfermedades que afectan los tejidos que rodean y sostienen los dientes.",
        cover: periodoncia,
        category: "Periodoncia",
        tags: ["Periodoncia", "Encías", "Salud bucal", "Prevención"],
        date: "2025-02-18",
        readingMin: 6,
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
                            <a href="/blog?cat=Salud dental" className="hover:underline">
                                Salud dental
                            </a>{" "}
                            <span className="opacity-50">/</span>{" "}
                            <span className="text-white">{post.title}</span>
                        </nav>

                        <header className="mt-4 md:mt-6">
                            <Eyebrow>SALUD DENTAL</Eyebrow>
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
                            Una buena salud periodontal no solo mantiene tus dientes firmes,
                            sino que también influye en tu salud general, ya que la enfermedad
                            de encías se asocia con diabetes, enfermedades cardíacas y parto
                            prematuro.
                        </p>

                        <div className="mt-8 grid gap-6">
                            {/* 1 */}
                            <article className="rounded-3xl bg-white/[.04] border border-white/10 p-6">
                                <h2 className="text-2xl font-semibold text-[#e4b892]">
                                    1. Señales de alerta que no debes ignorar
                                </h2>
                                <ul className="mt-3 list-disc pl-6 text-white/85 leading-relaxed">
                                    <li>Sangrado al cepillarte o usar hilo dental.</li>
                                    <li>Encías inflamadas, rojas o retraídas.</li>
                                    <li>Mal aliento persistente.</li>
                                    <li>Movilidad dental o separación de dientes.</li>
                                    <li>Sensación de «dientes más largos».</li>
                                </ul>
                                <p className="mt-3 text-white/85 leading-relaxed">
                                    Estos síntomas pueden indicar gingivitis o periodontitis —las
                                    dos formas principales de enfermedad periodontal» y requieren
                                    atención profesional inmediata.
                                </p>
                            </article>

                            {/* 2 */}
                            <article className="rounded-3xl bg-white/[.04] border border-white/10 p-6">
                                <h2 className="text-2xl font-semibold text-[#e4b892]">
                                    2. Gingivitis vs Periodontitis
                                </h2>
                                <p className="mt-3 text-white/85 leading-relaxed">
                                    <b>Gingivitis:</b> es la fase inicial, reversible si se trata
                                    a tiempo. Se produce por acumulación de placa bacteriana y se
                                    manifiesta con sangrado e inflamación.
                                    <br />
                                    <b>Periodontitis:</b> ocurre cuando la infección progresa y
                                    destruye el hueso que sostiene los dientes. Puede causar
                                    movilidad e incluso pérdida dental si no se trata.
                                </p>
                            </article>

                            {/* 3 */}
                            <article className="rounded-3xl bg-white/[.04] border border-white/10 p-6">
                                <h2 className="text-2xl font-semibold text-[#e4b892]">
                                    3. Tratamientos periodontales en Dental City
                                </h2>
                                <ul className="mt-3 list-disc pl-6 text-white/85 leading-relaxed">
                                    <li>
                                        <b>Limpieza profunda (raspado y alisado radicular):</b> elimina
                                        placa y sarro debajo de la encía.
                                    </li>
                                    <li>
                                        <b>Terapia antibiótica:</b> para controlar infecciones bacterianas activas.
                                    </li>
                                    <li>
                                        <b>Cirugía periodontal regenerativa:</b> cuando existe pérdida ósea avanzada.
                                    </li>
                                    <li>
                                        <b>Mantenimiento periodontal:</b> revisiones periódicas cada 3-6 meses
                                        para prevenir recaídas.
                                    </li>
                                </ul>
                                <p className="mt-3 text-white/85 leading-relaxed">
                                    En Dental City empleamos ultrasonidos, técnicas mínimamente
                                    invasivas y control digital para lograr resultados precisos y
                                    cómodos.
                                </p>
                            </article>

                            {/* 4 */}
                            <article className="rounded-3xl bg-white/[.04] border border-white/10 p-6">
                                <h2 className="text-2xl font-semibold text-[#e4b892]">
                                    4. Cómo mantener encías saludables a largo plazo
                                </h2>
                                <ul className="mt-3 list-disc pl-6 text-white/85 leading-relaxed">
                                    <li>Cepíllate dos veces al día con técnica suave y correcta.</li>
                                    <li>Usa hilo dental o irrigador diariamente.</li>
                                    <li>Evita el tabaco: es el principal enemigo de las encías.</li>
                                    <li>Acude a limpiezas profesionales cada 6 meses.</li>
                                    <li>Mantén una dieta equilibrada y rica en vitamina C.</li>
                                </ul>
                                <p className="mt-3 text-white/85 leading-relaxed">
                                    La prevención es la mejor inversión en salud oral. Detectar
                                    y tratar a tiempo las enfermedades periodontales evita
                                    tratamientos más complejos en el futuro.
                                </p>
                            </article>

                            {/* 5 */}
                            <article className="rounded-3xl bg-white/[.04] border border-white/10 p-6">
                                <h2 className="text-2xl font-semibold text-[#e4b892]">
                                    5. La conexión entre encías y salud general
                                </h2>
                                <p className="mt-3 text-white/85 leading-relaxed">
                                    Estudios científicos han demostrado que las bacterias
                                    periodontales pueden entrar al torrente sanguíneo y afectar
                                    otros »ganos. Por ello, mantener las encías sanas contribuye
                                    a reducir riesgos cardiovas¿cuálares y mejorar el control de
                                    enfermedades sistémicas como la diabetes.
                                </p>
                            </article>
                        </div>

                        {/* Conclusión */}
                        <p className="mt-10 text-white/85 leading-relaxed text-lg">
                            En Dental City, nuestro equipo de periodoncia combina experiencia,
                            tecnología y atención personalizada para preservar la salud de tus
                            encías.
                            Recuerda: <b>unas encías sanas son la base de una sonrisa fuerte y
                                duradera</b>. Agenda tu evaluación periodontal y da el primer paso
                            hacia una sonrisa realmente saludable.
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
                                Agenda tu revisión periodontal
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
