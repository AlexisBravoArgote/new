// src/components-react/BlogContent.jsx
import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import TopBar from "./TopBar.jsx";
import Footer from "./Footer.jsx";
import atlas1 from '/assets/atlas2.jpg';
import sagradocorazon from "/assets/sagradocorazon.jpg";
import cendi from "/assets/cendi.jpg"
import limpiezakids from "/assets/limpiezakids.jpg"
import limpieza from "/assets/limpieza.jpg"
import escaneo from "/assets/escaneo.jpg"
import alineadores from "/assets/alineadores.avif"
import implantes from "/assets/implante.jpg"
import periodoncia from "/assets/periodoncia.jpg"
import blanqueamiento from "/assets/blanqueamiento.jpg"
import endodoncia from "/assets/endodoncia2.jpg"
const __MOTION_USED = Boolean(motion); // eslint-disable-line no-unused-vars

/* ------------------------- Helpers/Layout ------------------------- */
function Container({ children, className = "" }) {
    return (
        <div className={`mx-auto w-full max-w-6xl px-6 md:px-8 ${className}`}>
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

function SectionTitle({ eyebrow, title, center = true, className = "" }) {
    return (
        <div className={`${center ? "text-center" : ""} ${className}`}>
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            <h2 className="mt-3 text-3xl md:text-4xl font-semibold">
                <span className="relative inline-block">
                    {title}
                    <span className="absolute left-0 right-0 -bottom-2 h-[2px] rounded bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b]" />
                </span>
            </h2>
        </div>
    );
}

/* ------------------------- Mock content ------------------------- */
const ALL_POSTS = [
    { id: "1", title: "Guía definitiva de limpieza dental profesional", excerpt: "¿Cada cuánto debo hacerme una profilaxis? Beneficios, mitos y qué esperar de tu cita.", cover: limpieza, category: "Prevención", tags: ["Higiene", "Prophylaxis"], date: "2025-06-01" },
    { id: "2", title: "Odontología digital en Dental City: escáneres, guías y precisión", excerpt: "Cómo integramos flujos digitales para diagnósticos más rápidos y tratamientos predecibles.", cover: escaneo, category: "Tecnología", tags: ["Escáner", "CAD/CAM"], date: "2025-05-20" },
    { id: "3", title: "Ortodoncia moderna: aligners vs brackets", excerpt: "Ventajas y desventajas de cada sistema, tiempos de tratamiento y cuidados.", cover: alineadores, category: "Ortodoncia", tags: ["Aligners", "Brackets"], date: "2025-04-28" },
    { id: "4", title: "Implantes dentales: lo que debes saber antes de decidir", excerpt: "Evaluación, tiempos de cicatrización y expectativas realistas del resultado.", cover: implantes, category: "Implantes", tags: ["Cirugía", "Rehabilitación"], date: "2025-04-10" },
    { id: "5", title: "Caries en niños: prevención práctica para papás ocupados", excerpt: "Hábitos simples, selladores y visitas que marcan la diferencia desde pequeños.", cover: limpiezakids, category: "Odontopediatría", tags: ["Selladores", "Hábitos"], date: "2025-06-22" },
    { id: "6", title: "Periodoncia: encías sanas, sonrisa saludable", excerpt: "Señales de alerta, tratamientos y cómo mantener la salud periodontal a largo plazo.", cover: periodoncia, category: "Periodoncia", tags: ["Encías", "Mantenimiento"], date: "2025-02-18" },
    { id: "7", title: "Blanqueamiento dental seguro: protocolos y resultados", excerpt: "Tipos de blanqueamiento, indicaciones y cuidados para evitar sensibilidad.", cover: blanqueamiento, category: "Estética", tags: ["Cosmética", "Sensibilidad"], date: "2024-12-05" },
    { id: "8", title: "Endodoncia guiada por imagen", excerpt: "Cuándo recurrimos a CBCT y cómo mejora la tasa de éxito en casos complejos.", cover: endodoncia, category: "Endodoncia", tags: ["CBCT", "Microscopio"], date: "2024-11-16" },
    { id: "9", title: "Filantropía: apoyo al Centro de Ayuda Integral Sagrado Corazón, A.C.", excerpt: "Dental City donó atención y material para apoyar a las hermanas del Centro de Ayuda Integral, Sagrado Corazón, A.C., reforzando nuestra misión social.", cover: sagradocorazon, category: "Filantropía", tags: ["Comunidad", "Voluntariado"], date: "2025-06-15" },
    { id: "10", title: "Filantropía: jornada gratuita para niñas y niños del CENDI ", excerpt: "En alianza con una asociación local, brindamos limpiezas, extracciones y revisiones sin costo, promoviendo salud oral inclusiva.", cover: cendi, category: "Filantropía", tags: ["Inclusión", "Infancia"], date: "2025-10-18" },
    { id: "11", title: "Alianza: Dental City, clínica dental oficial del Club Atlas FC de Guadalajara", excerpt: "La plantilla y administración del Atlas confían su salud bucal a nuestro equipo. Conoce cómo coordinamos diagnósticos, prevención y emergencias deportivas.", cover: atlas1, category: "Alianza", tags: ["Deporte", "Atlas FC"], date: "2025-09-05" },
];

/* ------------------------- Tarjeta de Post ------------------------- */
function PostCard({ post, onClickTag }) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group rounded-3xl bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b] p-[1.5px] shadow-[0_14px_40px_rgba(0,0,0,.25)] golden-hover h-full"
        >
            <div className="rounded-3xl overflow-hidden bg-[#0f2237]/90 backdrop-blur h-full flex flex-col">
                <div className="relative w-full aspect-[16/9]">
                    {post.cover ? (
                        <img src={post.cover} alt={post.title} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                    ) : (
                        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_35%,rgba(255,255,255,0.08),transparent_60%)]" />
                    )}
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b]" />
                </div>

                <div className="p-5 md:p-6 flex flex-col h-full">
                    <div className="flex items-center gap-2 text-[11px] uppercase tracking-[.2em] text-white/60">
                        <span className="text-[#e4b892]">{post.category}</span>
                        <span className="text-white/30">•</span>
                        <time dateTime={post.date} className="text-white/60">
                            {new Date(post.date).toLocaleDateString("es-MX", { year: "numeric", month: "short", day: "2-digit" })}
                        </time>
                    </div>

                    <h3 className="mt-2 text-xl md:text-2xl font-semibold leading-snug">
                        <a href={`/blog/${post.id}`} className="text-[#e4b892] golden-link focus:outline-none focus:ring-2 focus:ring-[#e4b892]/50 rounded">
                            {post.title}
                        </a>
                    </h3>

                    <p className="mt-2 text-white/80 leading-relaxed">{post.excerpt}</p>

                    <div className="mt-auto pt-4 flex flex-wrap gap-2">
                        {post.tags?.map((t) => (
                            <button
                                key={t}
                                onClick={() => onClickTag?.(t)}
                                className="rounded-full border border-[#e4b89233] bg-white/5 px-2.5 py-1 text-xs text-[#e4b892] hover:bg-white/10 transition"
                            >
                                #{t}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </motion.article>
    );
}

/* ------------------------- Página ------------------------- */
export default function Blog() {

    const categories = useMemo(
        () => ["Todos", "Prevención", "Tecnología", "Ortodoncia", "Implantes", "Alianza", "Odontopediatría", "Periodoncia", "Estética", "Endodoncia", "Filantropía"],
        []
    );

    const [query, setQuery] = useState("");
    const [category, setCategory] = useState("Todos");
    const [activeTag, setActiveTag] = useState("");
    const [sort, setSort] = useState("new");
    const [page, setPage] = useState(1);
    const perPage = 9;

    const filtered = useMemo(() => {
        let list = [...ALL_POSTS];
        if (query.trim()) {
            const q = query.toLowerCase();
            list = list.filter(
                (p) =>
                    p.title.toLowerCase().includes(q) ||
                    p.excerpt.toLowerCase().includes(q) ||
                    p.tags?.some((t) => t.toLowerCase().includes(q))
            );
        }
        if (category !== "Todos") list = list.filter((p) => p.category === category);
        if (activeTag) list = list.filter((p) => (p.tags || []).map((t) => t.toLowerCase()).includes(activeTag.toLowerCase()));
        if (sort === "new") list.sort((a, b) => +new Date(b.date) - +new Date(a.date));
        if (sort === "old") list.sort((a, b) => +new Date(a.date) - +new Date(b.date));
        if (sort === "alpha") list.sort((a, b) => a.title.localeCompare(b.title, "es"));
        return list;
    }, [query, category, activeTag, sort]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
    const pageItems = filtered.slice((page - 1) * perPage, page * perPage);

    useEffect(() => {
        setPage(1);
    }, [query, category, activeTag, sort]);

    const featured = [...ALL_POSTS].sort((a, b) => +new Date(b.date) - +new Date(a.date))[0];

    const scrollToExplora = () => {
        const el = document.getElementById("explora");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <>
            <TopBar />

            <main className="min-h-dvh bg-[#0f2237]">
                {/* Hero */}
                <section className="relative overflow-hidden bg-[radial-gradient(70%_70%_at_50%_0%,rgba(255,255,255,0.08),transparent_60%)]">
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b]" />
                    <Container className="py-12 md:py-14">
                        <div className="text-center">
                            <div className="text-xs tracking-[0.35em] text-white/50">BLOG & RESEARCH</div>
                            <h1 className="mt-3 inline-block text-2xl md:text-4xl font-semibold relative">
                                <span className="relative inline-block">
                                    <span className="golden-sweep">Dental City Blog</span>
                                    <span className="absolute left-0 right-0 -bottom-2 h-[2px] rounded bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b]" />
                                </span>
                            </h1>
                            <p className="mx-auto mt-6 max-w-2xl text-white/85 leading-relaxed">
                                Artículos clínicos, tecnología, prevención y{" "}
                                research de <em> Dental City.</em>
                            </p>
                        </div>
                    </Container>
                </section>

                {/* Destacado */}
                <section className="pt-6 md:pt-8">
                    <Container>
                        <div className="grid gap-5 lg:grid-cols-2">
                            <motion.a
                                href={`/blog/${featured.id}`}
                                initial={{ opacity: 0, y: 18 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="rounded-3xl bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b] p-[1.5px] shadow-[0_18px_50px_rgba(0,0,0,.35)] golden-hover block h-full
             w-full max-w-full lg:max-w-none mx-auto"
                            >
                                <div className="rounded-3xl overflow-hidden bg-[#0f2237]/90 backdrop-blur h-full flex flex-col">
                                    <div className="relative w-full aspect-[16/7]">
                                        <img src={featured.cover} alt={featured.title} className="absolute inset-0 h-full w-full object-cover" />
                                        <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b]" />
                                    </div>
                                    <div className="p-6 md:p-8 flex flex-col h-full">
                                        <div className="w-fit">
                                            <Eyebrow>DESTACADO</Eyebrow>
                                        </div>

                                        <h3 className="mt-3 text-2xl md:text-3xl font-semibold">
                                            <span className="text-[#e4b892] golden-link">{featured.title}</span>
                                        </h3>
                                        <p className="mt-2 text-white/80 max-w-2xl">{featured.excerpt}</p>

                                        <div className="mt-4 flex items-center gap-3 text-xs uppercase tracking-[.2em] text-white/60">
                                            <span className="text-[#e4b892]">{featured.category}</span>
                                            <span className="text-white/30">•</span>
                                            <time dateTime={featured.date}>
                                                {new Date(featured.date).toLocaleDateString("es-MX", { year: "numeric", month: "short", day: "2-digit" })}
                                            </time>
                                        </div>

                                        {/* Hashtags del destacado en el mismo lugar que las demás tarjetas */}
                                        <div className="mt-auto pt-4 flex flex-wrap gap-2">
                                            {featured.tags?.map((t) => (
                                                <span
                                                    key={t}
                                                    className="rounded-full border border-[#e4b89233] bg-white/5 px-2.5 py-1 text-xs text-[#e4b892]"
                                                >
                                                    #{t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.a>

                            {/* Panel de filtros */}
                            <div className="rounded-3xl bg-white/[.04] border border-white/10 p-5 md:p-6 shadow-[0_12px_36px_rgba(0,0,0,.25)]
             w-full max-w-full lg:max-w-none mx-auto overflow-hidden">
                                <SectionTitle
                                    eyebrow="• EXPLORAR •"
                                    title={<span className="golden-sweep">Encuentra artículos</span>}
                                    center={false}
                                    className="!mt-0"
                                />

                                <div className="mt-5 grid gap-4">
                                    {/* Search */}
                                    <div>
                                        <label className="block text-sm text-white/70 mb-1">Búsqueda</label>
                                        <div className="rounded-2xl bg-[#0f2237]/80 border border-white/10 focus-within:border-[#e4b89266] transition">
                                            <input
                                                type="search"
                                                value={query}
                                                onChange={(e) => setQuery(e.target.value)}
                                                placeholder="Palabra clave, tema o etiqueta…"
                                                className="w-full rounded-2xl bg-transparent px-3 py-2.5 md:px-4 md:py-3 text-white placeholder-white/40 focus:outline-none text-sm md:text-base"
                                            />
                                        </div>
                                    </div>

                                    {/* Categories */}
                                    <div>
                                        <label className="block text-sm text-white/70 mb-2">Categorías</label>
                                        <div className="flex flex-wrap gap-2 -mx-1 px-1">
                                            {categories.map((c) => (
                                                <button
                                                    key={c}
                                                    onClick={() => setCategory(c)}
                                                    className={`rounded-full px-2.5 py-1.5 md:px-3 text-xs md:text-sm border transition flex-shrink-0 ${category === c ? "border-[#e4b89280] bg-white/10 text-[#e4b892]" : "border-white/10 bg-white/5 text-white/80 hover:bg-white/10"
                                                        }`}
                                                >
                                                    {c}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Tags quick-pick */}
                                    <div>
                                        <label className="block text-sm text-white/70 mb-2">Etiquetas populares</label>
                                        <div className="flex flex-wrap gap-2 -mx-1 px-1">
                                            {["Aligners", "CBCT", "Prophylaxis", "Selladores", "Brackets", "Comunidad", "Deporte"].map((t) => (
                                                <button
                                                    key={t}
                                                    onClick={() => setActiveTag((prev) => (prev === t ? "" : t))}
                                                    className={`rounded-full px-2.5 py-1.5 md:px-3 text-xs md:text-sm border transition flex-shrink-0 ${activeTag === t ? "border-[#e4b89280] bg-white/10 text-[#e4b892]" : "border-white/10 bg-white/5 text-white/80 hover:bg-white/10"
                                                        }`}
                                                >
                                                    #{t}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Sort */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-sm text-white/70 mb-1">Ordenar por</label>
                                            <select className="w-full rounded-xl bg-[#0f2237]/80 border border-white/10 px-3 py-2.5 text-white" value={sort} onChange={(e) => setSort(e.target.value)}>
                                                <option value="new">Más recientes</option>
                                                <option value="old">Más antiguos</option>
                                                <option value="alpha">A–Z</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm text-white/70 mb-1">Etiqueta activa</label>
                                            <div className="flex items-center gap-2">
                                                <span className="text-white/70 text-sm truncate">{activeTag || "—"}</span>
                                                {activeTag && (
                                                    <button onClick={() => setActiveTag("")} className="ml-auto rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-xs text-white/80 hover:bg-white/10">
                                                        Limpiar
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Newsletter / CTA */}
                                    <div className="mt-2 rounded-2xl bg-gradient-to-r from-[#c89b7b]/20 via-[#e4b892]/10 to-transparent p-[1.5px] w-full md:mx-auto md:max-w-none">
                                        <div className="rounded-2xl bg-[#0f2237]/80 p-3.5 md:p-4">
                                            <p className="text-sm text-white/85 text-left">¿Te gustaría recibir nuevos artículos?</p>
                                            <form onSubmit={(e) => e.preventDefault()} className="mt-2 flex gap-2">
                                                <input type="email" placeholder="tu@email.com" className="flex-1 rounded-xl bg-transparent border border-white/15 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:border-[#e4b89266] text-sm" />
                                                <button className="rounded-xl bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b] px-3 py-2 md:px-4 md:py-2 text-[#0f2237] font-medium hover:brightness-110 transition text-sm md:text-base whitespace-nowrap">
                                                    Suscribirme
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Container>
                </section>

                {/* Listado */}
                <section className="pt-10 md:pt-12 pb-16">
                    <Container>
                        <div id="explora" />
                        <SectionTitle eyebrow="• ARTÍCULOS •" title={<span className="golden-sweep">Explora por tema</span>} />

                        {pageItems.length === 0 ? (
                            <div className="mt-10 rounded-3xl border border-white/10 bg-white/[.04] p-8 text-center text-white/70">
                                No encontramos resultados para tu búsqueda. Intenta cambiar los filtros o palabras clave.
                            </div>
                        ) : (
                            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {pageItems.map((p) => (
                                    <PostCard key={p.id} post={p} onClickTag={setActiveTag} />
                                ))}
                            </div>
                        )}

                        {filtered.length > perPage && (
                            <div className="mt-10 flex items-center justify-center gap-2">
                                <button onClick={() => setPage((pp) => Math.max(1, pp - 1))} disabled={page === 1} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white/80 hover:bg-white/10 disabled:opacity-40">
                                    Anterior
                                </button>
                                <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white/70">
                                    Página <span className="text-white">{page}</span> de <span className="text-white">{totalPages}</span>
                                </div>
                                <button onClick={() => setPage((pp) => Math.min(totalPages, pp + 1))} disabled={page === totalPages} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white/80 hover:bg-white/10 disabled:opacity-40">
                                    Siguiente
                                </button>
                            </div>
                        )}
                    </Container>
                </section>

                {/* Secciones temáticas (atajos) */}
                <section className="pb-20">
                    <Container>
                        <SectionTitle eyebrow="• SECCIONES •" title={<span className="golden-sweep">Blog & Research</span>} />
                        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                            {categories
                                .filter((c) => c !== "Todos")
                                .map((c) => (
                                    <motion.button
                                        key={c}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => {
                                            setCategory(c);
                                            scrollToExplora();
                                        }}
                                        className="rounded-2xl bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b] p-[1.5px] golden-hover"
                                    >
                                        <div className="rounded-2xl bg-[#0f2237]/90 px-3 py-3 text-center">
                                            <span className="text-sm font-medium text-[#e4b892]">{c}</span>
                                        </div>
                                    </motion.button>
                                ))}
                        </div>
                    </Container>
                </section>
            </main>

            <Footer />

            <style>{`
        @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        .golden-sweep{
          color: transparent;
          background-image: linear-gradient(90deg,#c89b7b 0%,#e4b892 20%,#f4d3b3 35%,#e4b892 60%,#c89b7b 100%);
          background-size: 250% 100%;
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 4s linear infinite;
          display: inline-block;
        }
        .golden-hover{ transition: box-shadow .3s ease, transform .3s ease, filter .3s ease; }
        .golden-hover:hover{
          box-shadow: 0 16px 44px rgba(232,200,146,.35), 0 0 0 1px rgba(232,200,146,.25) inset;
          transform: translateY(-2px);
          filter: saturate(1.05);
        }
        .golden-link{
          background-image: linear-gradient(90deg,#c89b7b,#e4b892,#c89b7b);
          background-size: 0% 2px;
          background-repeat: no-repeat;
          background-position: 0 100%;
          transition: background-size .35s ease, color .35s ease;
        }
        .golden-link:hover{ background-size: 100% 2px; }
      `}</style>
        </>
    );
}
