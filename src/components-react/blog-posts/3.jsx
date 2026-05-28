// src/pages/blog/15.jsx
import React from "react";
import TopBar from "../TopBar.jsx";
import Footer from "../Footer.jsx";
const ortodoncia = "/assets/alineadores.avif";

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

export default function BlogPost3() {
    const post = {
        id: "3",
        title: "Ortodoncia moderna: Aligners vs Brackets",
        excerpt:
            "La ortodoncia ya no es solo cuestión de alambres. Con los nuevos alineadores transparentes, los tratamientos son más cómodos, estéticos y personalizados. Pero, ¿cuál opción es mejor para ti?",
        cover: ortodoncia,
        category: "Ortodoncia",
        tags: ["Ortodoncia", "Aligners", "Brackets", "Estética dental"],
        date: "2025-04-28",
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
                            <a href="/blog?cat=Tratamientos" className="hover:underline">
                                Tratamientos
                            </a>{" "}
                            <span className="opacity-50">/</span>{" "}
                            <span className="text-white">{post.title}</span>
                        </nav>

                        <header className="mt-4 md:mt-6">
                            <Eyebrow>TRATAMIENTOS</Eyebrow>
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
                            {post.excerpt} En Dental City trabajamos con ambos sistemas y te
                            ayudamos a elegir la mejor opción según tus necesidades clínicas,
                            tu estilo de vida y tus objetivos estéticos.
                        </p>

                        <div className="mt-8 grid gap-6">
                            {/* Aligners */}
                            <article className="rounded-3xl bg-white/[.04] border border-white/10 p-6">
                                <h2 className="text-2xl font-semibold text-[#e4b892]">
                                    1. Alineadores transparentes (Aligners)
                                </h2>
                                <p className="mt-3 text-white/85 leading-relaxed">
                                    Los aligners son férulas transparentes removibles que mueven
                                    los dientes de forma progresiva y controlada. Se fabrican con
                                    tecnología digital a partir de un escaneo intraoral 3D, lo que
                                    permite planificar cada movimiento con precisión.
                                </p>
                                <ul className="mt-3 list-disc pl-6 text-white/85 leading-relaxed">
                                    <li><b>Ventajas:</b> Estéticos, cómodos y removibles.</li>
                                    <li>No irritan encías ni mejillas.</li>
                                    <li>Permiten comer y cepillarse con libertad.</li>
                                    <li>Simulación digital del resultado final antes de iniciar.</li>
                                </ul>
                                <p className="mt-3 text-white/85 leading-relaxed">
                                    En Dental City usamos sistemas de aligners de alta precisión
                                    avalados internacionalmente, ideales para adultos y jóvenes
                                    que buscan discreción sin comprometer resultados.
                                </p>
                            </article>

                            {/* Brackets */}
                            <article className="rounded-3xl bg-white/[.04] border border-white/10 p-6">
                                <h2 className="text-2xl font-semibold text-[#e4b892]">
                                    2. Brackets: la opción clásica y efectiva
                                </h2>
                                <p className="mt-3 text-white/85 leading-relaxed">
                                    Los brackets siguen siendo una herramienta fundamental en
                                    ortodoncia, especialmente en casos complejos o con grandes
                                    movimientos dentales. Pueden ser metálicos o estéticos
                                    (cerámicos o de zafiro) y permiten un control total del
                                    movimiento dental.
                                </p>
                                <ul className="mt-3 list-disc pl-6 text-white/85 leading-relaxed">
                                    <li><b>Ventajas:</b> Eficaces para todo tipo de casos.</li>
                                    <li>Mayor precisión en correcciones complejas.</li>
                                    <li>Más económicos en comparación con los aligners.</li>
                                </ul>
                                <p className="mt-3 text-white/85 leading-relaxed">
                                    En Dental City utilizamos brackets de baja fricción y técnicas
                                    modernas que acortan los tiempos de tratamiento y mejoran la
                                    comodidad del paciente.
                                </p>
                            </article>

                            {/* Comparación */}
                            <article className="rounded-3xl bg-white/[.04] border border-white/10 p-6">
                                <h2 className="text-2xl font-semibold text-[#e4b892]">
                                    3. Comparativa directa
                                </h2>
                                <table className="mt-3 w-full text-white/85 text-sm border-collapse">
                                    <thead>
                                        <tr className="border-b border-white/10 text-[#e4b892]">
                                            <th className="py-2 text-left">Aspecto</th>
                                            <th className="py-2 text-left">Aligners</th>
                                            <th className="py-2 text-left">Brackets</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-white/10">
                                            <td className="py-2">Estética</td>
                                            <td className="py-2">Invisible</td>
                                            <td className="py-2">Visible (opción estética disponible)</td>
                                        </tr>
                                        <tr className="border-b border-white/10">
                                            <td className="py-2">Comodidad</td>
                                            <td className="py-2">Muy alta</td>
                                            <td className="py-2">Moderada</td>
                                        </tr>
                                        <tr className="border-b border-white/10">
                                            <td className="py-2">Mantenimiento</td>
                                            <td className="py-2">Removible, fácil de limpiar</td>
                                            <td className="py-2">Requiere mayor higiene</td>
                                        </tr>
                                        <tr className="border-b border-white/10">
                                            <td className="py-2">Casos complejos</td>
                                            <td className="py-2">Moderados</td>
                                            <td className="py-2">Complejos y severos</td>
                                        </tr>
                                        <tr>
                                            <td className="py-2">Costo</td>
                                            <td className="py-2">Más alto</td>
                                            <td className="py-2">Más accesible</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </article>

                            {/* Cierre */}
                            <article className="rounded-3xl bg-white/[.04] border border-white/10 p-6">
                                <h2 className="text-2xl font-semibold text-[#e4b892]">
                                    4. La clave: diagnóstico personalizado
                                </h2>
                                <p className="mt-3 text-white/85 leading-relaxed">
                                    No existe una «mejor» técnica universal. La elección depende
                                    del tipo de maloclusión, tus expectativas estéticas y tu
                                    compromiso con el uso.
                                    En Dental City realizamos una evaluación digital completa
                                    para determinar el tratamiento ideal, garantizando <b>
                                        eficiencia, comodidad y resultados estéticos naturales</b>.
                                </p>
                            </article>
                        </div>

                        {/* Conclusión */}
                        <p className="mt-10 text-white/85 leading-relaxed text-lg">
                            La ortodoncia moderna combina ciencia, tecnología y diseño para
                            transformar sonrisas con precisión. Ya sea con aligners o con
                            brackets, lo importante es que tu tratamiento esté guiado por
                            profesionales certificados y respaldado por una planeación digital
                            integral.
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
                                Solicita tu valoración de ortodoncia
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
