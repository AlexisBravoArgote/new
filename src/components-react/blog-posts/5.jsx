// src/pages/blog/12.jsx
import React from "react";
import TopBar from "../TopBar.jsx";
import Footer from "../Footer.jsx";
const cariesKids = "/assets/limpiezakids.jpg";

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

export default function BlogPost5() {
    const post = {
        id: "5",
        title: "Caries en niños: prevención práctica para papás ocupados",
        excerpt:
            "Las caries son la enfermedad crónica más común en la infancia, pero también una de las más prevenibles. Con algunos hábitos simples, incluso los padres más ocupados pueden proteger la sonrisa de sus hijos.",
        cover: cariesKids,
        category: "Odontopediatría",
        tags: ["Caries", "Infancia", "Higiene oral", "Salud familiar"],
        date: "2025-06-22",
        readingMin: 5,
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
                            <a href="/blog?cat=Prevención" className="hover:underline">
                                Prevención
                            </a>{" "}
                            <span className="opacity-50">/</span>{" "}
                            <span className="text-white">{post.title}</span>
                        </nav>

                        <header className="mt-4 md:mt-6">
                            <Eyebrow>PREVENCIÓN</Eyebrow>
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
                            {post.excerpt} En Dental City entendemos que entre trabajo,
                            escuela y actividades, puede parecer difícil mantener una rutina
                            dental constante. Pero la buena noticia es que <b>pequeños
                                hábitos diarios</b> pueden marcar una gran diferencia a largo
                            plazo.
                        </p>

                        <div className="mt-8 grid gap-6">
                            {/* 1 */}
                            <article className="rounded-3xl bg-white/[.04] border border-white/10 p-6">
                                <h2 className="text-2xl font-semibold text-[#e4b892]">
                                    1. Cepillado inteligente (y rápidoo)
                                </h2>
                                <p className="mt-3 text-white/85 leading-relaxed">
                                    No se trata solo de cepillar, sino de hacerlo bien. Usa una
                                    cantidad de pasta del tamaño de un grano de arroz para menores
                                    de 3 años y del tamaño de un chícharo para mayores. Elige
                                    cepillos suaves y hazlo dos veces al día, especialmente antes
                                    de dormir. Si tu hijo es pequeño, <b>ayúdalo tú</b>: el
                                    cepillado nocturno debe hacerlo un adulto.
                                </p>
                            </article>

                            {/* 2 */}
                            <article className="rounded-3xl bg-white/[.04] border border-white/10 p-6">
                                <h2 className="text-2xl font-semibold text-[#e4b892]">
                                    2. Cuidar los snacks (sin ser estrictos)
                                </h2>
                                <p className="mt-3 text-white/85 leading-relaxed">
                                    Las bacterias que causan caries se alimentan del azúcar
                                    frecuente, no solo de dulces: jugos, galletas o pan dulce
                                    también cuentan. No se trata de prohibir, sino de <b>darles
                                        espacio entre comidas</b> y ofrecer agua simple como bebida
                                    principal. Los dientes necesitan tiempo para «recuperarse»
                                    entre exposiciones al azúcar.
                                </p>
                            </article>

                            {/* 3 */}
                            <article className="rounded-3xl bg-white/[.04] border border-white/10 p-6">
                                <h2 className="text-2xl font-semibold text-[#e4b892]">
                                    3. Revisiones preventivas cada seis meses
                                </h2>
                                <p className="mt-3 text-white/85 leading-relaxed">
                                    Una consulta corta puede prevenir tratamientos largos. Las
                                    revisiones periódicas permiten detectar caries en su etapa
                                    inicial y aplicar flúor o selladores. En Dental City usamos
                                    <b> diagnóstico digital</b> y adaptamos cada revisión al nivel
                                    de cooperación del niño, para que la experiencia sea amable y
                                    educativa.
                                </p>
                            </article>

                            {/* 4 */}
                            <article className="rounded-3xl bg-white/[.04] border border-white/10 p-6">
                                <h2 className="text-2xl font-semibold text-[#e4b892]">
                                    4. Hábitos que sí funcionan en familias ocupadas
                                </h2>
                                <ul className="mt-3 list-disc pl-6 text-white/85 leading-relaxed">
                                    <li>Deja un cepillo en casa y otro en la mochila.</li>
                                    <li>
                                        Usa cepillos eléctricos con temporizador (hacen divertido el
                                        cepillado).
                                    </li>
                                    <li>
                                        Si una noche están agotados, enjuague con flúor es mejor que
                                        nada.
                                    </li>
                                    <li>
                                        Elige cuentos o canciones sobre «dientes fuertes» para
                                        reforzar el hábito sin presión.
                                    </li>
                                </ul>
                            </article>

                            {/* 5 */}
                            <article className="rounded-3xl bg-white/[.04] border border-white/10 p-6">
                                <h2 className="text-2xl font-semibold text-[#e4b892]">
                                    5. Enseñar sin miedo
                                </h2>
                                <p className="mt-3 text-white/85 leading-relaxed">
                                    Hablar de caries no debe dar miedo. Explica que los «microbios»
                                    se van si limpiamos los dientes, y celebra cada cepillado bien
                                    hecho. Un enfoque positivo crea niños que disfrutan cuidar su
                                    salud.
                                </p>
                            </article>
                        </div>

                        {/* Conclusión */}
                        <p className="mt-10 text-white/85 leading-relaxed text-lg">
                            En Dental City, creemos que la prevención empieza en casa y se
                            consolida en el consultorio. Nuestro equipo de odontopediatría
                            está listo para acompañarte con <b>educación, paciencia y cariño</b>,
                            para que tus hijos crezcan con sonrisas sanas y sin miedo al
                            dentista.
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
                                href="/#/ubicacion?tab=kids"
                                className="rounded-xl bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b] px-4 py-2 text-[#0f2237] font-medium hover:brightness-110 transition"
                            >
                                Agendar revisión infantil
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
