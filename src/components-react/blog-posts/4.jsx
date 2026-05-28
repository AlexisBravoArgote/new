// src/pages/blog/16.jsx
import React from "react";
import TopBar from "../TopBar.jsx";
import Footer from "../Footer.jsx";
const implantes = "/assets/implante.jpg";

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

export default function BlogPost4() {
    const post = {
        id: "4",
        title: "Implantes dentales: lo que debes saber antes de decidir",
        excerpt:
            "Los implantes dentales son una solución moderna, segura y duradera para reemplazar dientes perdidos. Antes de decidirte, es importante conocer sus ventajas, cuidados y lo que implica el tratamiento.",
        cover: implantes,
        category: "Implantes",
        tags: ["Implantes dentales", "Cirugía oral", "Rehabilitación", "Odontología moderna"],
        date: "2025-04-10",
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
                            <a href="/blog?cat=Rehabilitación" className="hover:underline">
                                Rehabilitación
                            </a>{" "}
                            <span className="opacity-50">/</span>{" "}
                            <span className="text-white">{post.title}</span>
                        </nav>

                        <header className="mt-4 md:mt-6">
                            <Eyebrow>REHABILITACIÓN</Eyebrow>
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
                            {post.excerpt} En Dental City realizamos este procedimiento con
                            tecnología digital, materiales de vanguardia y una planeación
                            precisa para garantizar resultados funcionales, estéticos y
                            duraderos.
                        </p>

                        <div className="mt-8 grid gap-6">
                            {/* 1 */}
                            <article className="rounded-3xl bg-white/[.04] border border-white/10 p-6">
                                <h2 className="text-2xl font-semibold text-[#e4b892]">
                                    1. ¿Qué es un implante dental?
                                </h2>
                                <p className="mt-3 text-white/85 leading-relaxed">
                                    Un implante dental es un tornillo de titanio o zirconia que
                                    reemplaza la raíz de un diente perdido. Una vez integrado al
                                    hueso, sirve como base para colocar una corona, puente o
                                    prótesis fija. Es la opción más cercana a un diente natural,
                                    tanto en función como en apariencia.
                                </p>
                            </article>

                            {/* 2 */}
                            <article className="rounded-3xl bg-white/[.04] border border-white/10 p-6">
                                <h2 className="text-2xl font-semibold text-[#e4b892]">
                                    2. Beneficios de los implantes
                                </h2>
                                <ul className="mt-3 list-disc pl-6 text-white/85 leading-relaxed">
                                    <li>Previenen la pérdida ósea y el colapso facial.</li>
                                    <li>Recuperan la función masticatoria de manera completa.</li>
                                    <li>No afectan los dientes vecinos como los puentes tradicionales.</li>
                                    <li>Ofrecen estabilidad y estética natural a largo plazo.</li>
                                    <li>Mejoran la autoestima y la seguridad al sonre».</li>
                                </ul>
                            </article>

                            {/* 3 */}
                            <article className="rounded-3xl bg-white/[.04] border border-white/10 p-6">
                                <h2 className="text-2xl font-semibold text-[#e4b892]">
                                    3. El proceso paso a paso
                                </h2>
                                <ol className="mt-3 list-decimal pl-6 text-white/85 leading-relaxed">
                                    <li>
                                        <b>Diagnóstico digital:</b> Escaneo intraoral y tomografía 3D
                                        para evaluar el hueso y planificar la cirugía con precisión.
                                    </li>
                                    <li>
                                        <b>Colocación del implante:</b> Procedimiento ambulatorio
                                        bajo anestesia local y mínima invasión.
                                    </li>
                                    <li>
                                        <b>Integración ósea:</b> Periodo de cicatrización en el que
                                        el implante se une al hueso (de 2 a 4 meses).
                                    </li>
                                    <li>
                                        <b>Colocación de la corona:</b> Una restauración diseñada
                                        digitalmente que imita a la perfección un diente natural.
                                    </li>
                                </ol>
                            </article>

                            {/* 4 */}
                            <article className="rounded-3xl bg-white/[.04] border border-white/10 p-6">
                                <h2 className="text-2xl font-semibold text-[#e4b892]">
                                    4. ¿Soy candidato a un implante?
                                </h2>
                                <p className="mt-3 text-white/85 leading-relaxed">
                                    La mayoría de los adultos sanos pueden recibir implantes
                                    dentales. Es esencial contar con suficiente volumen óseo y una
                                    buena salud periodontal.
                                    En Dental City realizamos estudios digitales de densidad ósea
                                    para determinar si se requiere injerto o regeneración previa.
                                </p>
                            </article>

                            {/* 5 */}
                            <article className="rounded-3xl bg-white/[.04] border border-white/10 p-6">
                                <h2 className="text-2xl font-semibold text-[#e4b892]">
                                    5. Cuidados después del tratamiento
                                </h2>
                                <ul className="mt-3 list-disc pl-6 text-white/85 leading-relaxed">
                                    <li>Evitar fumar y consumir alcohol durante la cicatrización.</li>
                                    <li>Mantener una excelente higiene oral.</li>
                                    <li>Asistir a revisiones periódicas para control radiográfico.</li>
                                    <li>Usar cepillos interdentales y enjuagues antisépticos.</li>
                                </ul>
                            </article>

                            {/* 6 */}
                            <article className="rounded-3xl bg-white/[.04] border border-white/10 p-6">
                                <h2 className="text-2xl font-semibold text-[#e4b892]">
                                    6. Riesgos y consideraciones
                                </h2>
                                <p className="mt-3 text-white/85 leading-relaxed">
                                    Como cualquier procedimiento quirúrgico, los implantes
                                    requieren planificación adecuada y ejecución profesional.
                                    Factores como el tabaquismo, la diabetes no controlada o la
                                    mala higiene pueden afectar su éxito. En Dental City, cada
                                    caso se evalúa mediante un protocolo personalizado y seguro.
                                </p>
                            </article>
                        </div>

                        {/* Conclusión */}
                        <p className="mt-10 text-white/85 text-lg leading-relaxed">
                            Los implantes dentales son una inversión en salud, función y
                            estética. En Dental City combinamos <b>odontología digital,
                                materiales premium y experiencia quirúrgica</b> para lograr
                            resultados predecibles y duraderos.
                            Si estás considerando reemplazar un diente, agenda una valoración
                            y descubre cómo la implantología moderna puede transformar tu sonrisa.
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
                                Agenda tu valoración de implantes
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
