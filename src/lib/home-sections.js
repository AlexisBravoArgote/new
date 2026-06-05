import { isHomePathname, localePath } from "./site-copy.js";

/** Enlaces del topbar a secciones de la home (evita `/#hash` → `#hash` cuando homeHref es `/`). */
export function homeSectionHref(homeHref, hash) {
    const fragment = hash.startsWith("#") ? hash : `#${hash}`;
    if (!homeHref || homeHref === "/") return `/${fragment}`;
    const base = homeHref.endsWith("/") ? homeHref.slice(0, -1) : homeHref;
    return `${base}${fragment}`;
}

const SERVICES_SCROLL_OFFSET = 112;
const GALLERY_SCROLL_OFFSET = 112;
const REVIEWS_SCROLL_OFFSET = 112;
const LOCATION_SCROLL_OFFSET = 132;

export function scrollToServices() {
    const search = document.getElementById("servicios-busqueda");
    const fallback = document.querySelector("#servicios");
    const target = search || fallback;
    if (!target) return;
    const y = target.getBoundingClientRect().top + window.scrollY - SERVICES_SCROLL_OFFSET;
    window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
}

export function scrollToGallery() {
    const showcase = document.getElementById("galeria-showcase");
    const carousel = document.getElementById("galeria-carousel");
    const fallback = document.querySelector("#galeria");
    const target = showcase || carousel || fallback;
    if (!target) return;
    const y = target.getBoundingClientRect().top + window.scrollY - GALLERY_SCROLL_OFFSET;
    window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
}

export function scrollToReviews() {
    const target = document.getElementById("opiniones");
    if (!target) return;
    const y = target.getBoundingClientRect().top + window.scrollY - REVIEWS_SCROLL_OFFSET;
    window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
}

export function scrollToLocationPanel() {
    const isMobile =
        typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;
    const heading = document.getElementById("clinic-branch-heading");
    const panel = document.getElementById("ubicacion-panel");
    const fallback = document.querySelector("#ubicacion");
    const target = isMobile && heading ? heading : panel || fallback;
    if (!target) return;
    const offset = isMobile ? 120 : LOCATION_SCROLL_OFFSET;
    const y = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
}

export function scrollToId(hash) {
    const el = document.querySelector(hash);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** Scroll con offset del topbar al abrir la home con hash (p. ej. desde otra página). */
export function scrollToHomeHash(hash) {
    if (!hash) return;
    switch (hash) {
        case "#servicios":
        case "#servicios-busqueda":
            scrollToServices();
            break;
        case "#galeria":
        case "#galeria-showcase":
        case "#galeria-carousel":
            scrollToGallery();
            break;
        case "#ubicacion":
        case "#ubicacion-panel":
            scrollToLocationPanel();
            break;
        case "#opiniones":
            scrollToReviews();
            break;
        default:
            scrollToId(hash);
    }
}

export function scheduleScrollToHomeHash(hash, delayMs = 120) {
    if (!hash) return;
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            window.setTimeout(() => scrollToHomeHash(hash), delayMs);
        });
    });
}

/** Ir al panel de ubicación en home (desde topbar, CTA flotante, etc.). */
export function navigateToLocation(tabKey, lang = "es") {
    try {
        sessionStorage.setItem("initialTab", tabKey);
    } catch {
        /* ignore */
    }
    if (!isHomePathname(location.pathname, lang)) {
        window.location.assign(homeSectionHref(localePath("/", lang), "#ubicacion-panel"));
        return;
    }
    window.dispatchEvent(new CustomEvent("select-location-tab", { detail: tabKey }));
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            window.setTimeout(() => scrollToLocationPanel(), 80);
            if (location.hash !== "#ubicacion") {
                history.replaceState(null, "", "#ubicacion");
            }
        });
    });
}
