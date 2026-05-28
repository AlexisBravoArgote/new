// src/pages/blog/18.jsx
import React from "react";
import TopBar from "../TopBar.jsx";
import Footer from "../Footer.jsx";
const blanqueamiento = "/assets/blanqueamiento.jpg";

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

export default function BlogPost7() {
    const post = {
        id: "7",
        title: "Blanqueamiento dental seguro: protocolos y resultados",
        excerpt:
            "El blanqueamiento dental profesional es uno de los tratamientos estéticos más solicitados. Sin embargo, hacerlo de forma segura requiere diagnóstico, protocolo clínicao y seguimiento para evitar sensibilidad o daño al esmalte.",
        cover: blanqueamiento,
        category: "Estética",
        tags: ["Blanqueamiento dental", "Estética", "Cuidado dental", "Sensibilidad"],
        date: "2024-12-05",
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
                            <a href="/blog?cat=Estética dental" className="hover:underline">
                                Estética dental
                            </a>{" "}
                            <span className="opacity-50">/</span>{" "}
                            <span className="text-white">{post.title}</span>
                        </nav>

                        <header className="mt-4 md:mt-6">
                            <Eyebrow>ESTÉTICA DENTAL</Eyebrow>
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
                            En Dental City realizamos blanqueamientos clínicos bajo estrictos
                            protocolos de seguridad y diagnóstico personalizado, asegurando
                            resultados naturales sin sensibilidad posterior.
                        </p>

                        <div className="mt-8 grid gap-6">
                            {/* 1 */}
                            <article className="rounded-3xl bg-white/[.04] border border-white/10 p-6">
                                <h2 className="text-2xl font-semibold text-[#e4b892]">
                                    1. Tipos de blanqueamiento dental
                                </h2>
                                <ul className="mt-3 list-disc pl-6 text-white/85 leading-relaxed">
                                    <li>
                                        <b>Blanqueamiento en consultorio:</b> realizado por el odontólogo
                                        con agentes de alta concentración y luz LED. Resultados visibles
                                        desde la primera sesión.
                                    </li>
                                    <li>
                                        <b>Blanqueamiento domiciliario supervisado:</b> se aplican férulas
                                        personalizadas con gel de baja concentración bajo control clínicao.
                                    </li>
                                    <li>
                                        <b>Blanqueamiento combinado:</b> integra ambas técnicas para lograr
                                        un tono más uniforme y estable.
                                    </li>
                                </ul>
                            </article>

                            {/* 2 */}
                            <article className="rounded-3xl bg-white/[.04] border border-white/10 p-6">
                                <h2 className="text-2xl font-semibold text-[#e4b892]">
                                    2. Protocolo seguro en Dental City
                                </h2>
                                <ol className="mt-3 list-decimal pl-6 text-white/85 leading-relaxed">
                                    <li>
                                        Evaluación clínica y diagnóstico del tono dental y tipo de esmalte.
                                    </li>
                                    <li>
                                        Profilaxis o limpieza profesional previa para eliminar manchas superficiales.
                                    </li>
                                    <li>
                                        Protección de encías y tejidos blandos con barreras gingivales.
                                    </li>
                                    <li>
                                        Aplicación controlada del agente blanqueador con monitoreo del tiempo.
                                    </li>
                                    <li>
                                        Rehidratación del esmalte y aplicación de gel desensibilizante posterior.
                                    </li>
                                </ol>
                                <p className="mt-3 text-white/85 leading-relaxed">
                                    Este protocolo reduce al mínimo el riesgo de sensibilidad y asegura
                                    una tonalidad homogénea, con resultados que pueden durar más de 12 meses
                                    con los cuidados adecuados.
                                </p>
                            </article>

                            {/* 3 */}
                            <article className="rounded-3xl bg-white/[.04] border border-white/10 p-6">
                                <h2 className="text-2xl font-semibold text-[#e4b892]">
                                    3. Indicaciones y contraindicaciones
                                </h2>
                                <p className="mt-3 text-white/85 leading-relaxed">
                                    El blanqueamiento está indicado para pacientes con dientes vitales y
                                    tinciones por pigmentos, café, vino, té o envejecimiento natural.
                                    No se recomienda en embarazadas, menores de edad o pacientes con caries
                                    o sensibilidad activa.
                                    En Dental City siempre realizamos una evaluación previa para determinar
                                    la seguridad del procedimiento.
                                </p>
                            </article>

                            {/* 4 */}
                            <article className="rounded-3xl bg-white/[.04] border border-white/10 p-6">
                                <h2 className="text-2xl font-semibold text-[#e4b892]">
                                    4. Cómo prevenir la sensibilidad dental
                                </h2>
                                <ul className="mt-3 list-disc pl-6 text-white/85 leading-relaxed">
                                    <li>Usa pastas dentales desensibilizantes antes y después del tratamiento.</li>
                                    <li>Evita bebidas frías o ácidas las primeras 48 horas.</li>
                                    <li>No fumes ni consumas café, vino tinto o té negro durante una semana.</li>
                                    <li>Mantén una buena hidratación y evita el exceso de cepillado abrasivo.</li>
                                </ul>
                                <p className="mt-3 text-white/85 leading-relaxed">
                                    La sensibilidad es temporal y controlable cuando el procedimiento se
                                    realiza de forma profesional y con materiales certificados.
                                </p>
                            </article>

                            {/* 5 */}
                            <article className="rounded-3xl bg-white/[.04] border border-white/10 p-6">
                                <h2 className="text-2xl font-semibold text-[#e4b892]">
                                    5. Resultados y mantenimiento
                                </h2>
                                <p className="mt-3 text-white/85 leading-relaxed">
                                    Los resultados dependen del tono inicial y hábitos del paciente.
                                    Generalmente se logra una aclaración de entre 4 a 8 tonos.
                                    Para mantener el color, se recomienda un retoque anual y limpiezas
                                    profesionales cada seis meses.
                                </p>
                            </article>
                        </div>

                        {/* Conclusión */}
                        <p className="mt-10 text-white/85 leading-relaxed text-lg">
                            En Dental City realizamos blanqueamientos dentales clínicamente seguros,
                            personalizados y con resultados naturales.
                            Recuerda: un blanqueamiento profesional no solo mejora tu sonrisa,
                            también protege tu esmalte y tu salud oral.
                            <b>Confía en manos expertas para una sonrisa brillante y saludable.</b>
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
                                Agenda tu blanqueamiento seguro
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
