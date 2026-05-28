import esHome from "../locales/es/home.json";
import enHome from "../locales/en/home.json";
import frHome from "../locales/fr/home.json";
import deHome from "../locales/de/home.json";
import itHome from "../locales/it/home.json";
import zhHome from "../locales/zh/home.json";
import jaHome from "../locales/ja/home.json";
import koHome from "../locales/ko/home.json";
import ptHome from "../locales/pt/home.json";
import hiHome from "../locales/hi/home.json";

import esDoctors from "../locales/es/translation.json";
import enDoctors from "../locales/en/translation.json";
import frDoctors from "../locales/fr/translation.json";
import deDoctors from "../locales/de/translation.json";
import itDoctors from "../locales/it/translation.json";
import zhDoctors from "../locales/zh/translation.json";
import jaDoctors from "../locales/ja/translation.json";
import koDoctors from "../locales/ko/translation.json";
import ptDoctors from "../locales/pt/translation.json";
import hiDoctors from "../locales/hi/translation.json";

import { DEFAULT_LOCALE, LOCALES, PAGE_SEO, SITE_ORIGIN } from "../config/languages.js";

const HOME_COPY = {
    es: esHome,
    en: enHome,
    fr: frHome,
    de: deHome,
    it: itHome,
    zh: zhHome,
    ja: jaHome,
    ko: koHome,
    pt: ptHome,
    hi: hiHome,
};

const DOCTORS_COPY = {
    es: esDoctors,
    en: enDoctors,
    fr: frDoctors,
    de: deDoctors,
    it: itDoctors,
    zh: zhDoctors,
    ja: jaDoctors,
    ko: koDoctors,
    pt: ptDoctors,
    hi: hiDoctors,
};

export function normalizeLang(lang) {
    const code = (lang || DEFAULT_LOCALE).split("-")[0];
    return HOME_COPY[code] ? code : DEFAULT_LOCALE;
}

export function getHomeCopy(lang) {
    return HOME_COPY[normalizeLang(lang)];
}

export function getDoctorsCopy(lang) {
    return DOCTORS_COPY[normalizeLang(lang)];
}

/**
 * @param {Record<string, unknown>} copy
 * @param {string} key dot path
 * @param {Record<string, unknown>} [vars] interpolation vars; `returnObjects` returns arrays/objects
 */
export function translate(copy, key, vars = {}) {
    const parts = key.split(".");
    let cur = copy;
    for (const part of parts) {
        cur = cur?.[part];
    }
    if (vars.returnObjects) {
        if (cur !== undefined && cur !== null) return cur;
        return vars.defaultValue ?? key;
    }
    if (typeof cur === "string") {
        return cur.replace(/\{\{(\w+)\}\}/g, (_, name) =>
            vars[name] != null ? String(vars[name]) : ""
        );
    }
    if (vars.defaultValue != null) return vars.defaultValue;
    return key;
}

export function localePath(path, lang) {
    const normalized = normalizeLang(lang);
    const clean = path.startsWith("/") ? path : `/${path}`;
    if (normalized === DEFAULT_LOCALE) return clean;
    if (clean === "/") return `/${normalized}/`;
    return `/${normalized}${clean}`;
}

/** True when pathname is the localized home URL (/, /en/, etc.). */
export function isHomePathname(pathname, lang = DEFAULT_LOCALE) {
    const target = localePath("/", lang).replace(/\/$/, "") || "/";
    const path = (pathname || "/").replace(/\/$/, "") || "/";
    return path === target;
}

/** @param {'home' | 'doctores'} page */
export function getPagePath(page, lang) {
    if (page === "home") return localePath("/", lang);
    if (page === "doctores") return localePath("/doctores", lang);
    return localePath("/", lang);
}

/** @param {'home' | 'doctores'} page */
export function getAlternateLinks(page) {
    return LOCALES.map((locale) => ({
        hreflang: locale.hreflang,
        href: `${SITE_ORIGIN}${getPagePath(page, locale.code)}`,
    }));
}

export function getPageSeo(page, lang) {
    const code = normalizeLang(lang);
    return PAGE_SEO[page]?.[code] ?? PAGE_SEO[page]?.[DEFAULT_LOCALE];
}
