import { LOCALES, PAGE_SEO } from "./languages.js";
import { STATIC_PAGE_SEO } from "./seo-static-pages.js";
import { localePath, normalizeLang } from "../lib/site-copy.js";

/** Short UI copy for the main-links block (home + footer). */
export const SITE_NAV_LABELS = {
    es: {
        heading: "Páginas principales",
        languagesHeading: "Dental City en tu idioma",
        homeLabel: "Inicio",
    },
    en: {
        heading: "Main pages",
        languagesHeading: "Dental City in your language",
        homeLabel: "Home",
    },
    fr: {
        heading: "Pages principales",
        languagesHeading: "Dental City dans votre langue",
        homeLabel: "Accueil",
    },
    de: {
        heading: "Hauptseiten",
        languagesHeading: "Dental City in Ihrer Sprache",
        homeLabel: "Startseite",
    },
    it: {
        heading: "Pagine principali",
        languagesHeading: "Dental City nella tua lingua",
        homeLabel: "Home",
    },
    zh: {
        heading: "主要页面",
        languagesHeading: "多语言网站",
        homeLabel: "首页",
    },
    ja: {
        heading: "主要ページ",
        languagesHeading: "言語別サイト",
        homeLabel: "ホーム",
    },
    ko: {
        heading: "주요 페이지",
        languagesHeading: "언어별 사이트",
        homeLabel: "홈",
    },
    pt: {
        heading: "Páginas principais",
        languagesHeading: "Dental City no seu idioma",
        homeLabel: "Início",
    },
    hi: {
        heading: "मुख्य पृष्ठ",
        languagesHeading: "आपकी भाषा में Dental City",
        homeLabel: "होम",
    },
};

/** Core internal links Google often uses as sitelinks. */
export function getMainNavLinks(lang = "es") {
    const code = normalizeLang(lang);
    const doctors = PAGE_SEO.doctores[code] ?? PAGE_SEO.doctores.es;

    return [
        {
            href: localePath("/doctores", code),
            title: doctors.title,
            description: doctors.description,
        },
        {
            href: "/blog",
            title: STATIC_PAGE_SEO.blog.title,
            description: STATIC_PAGE_SEO.blog.description,
        },
        {
            href: "/edu",
            title: STATIC_PAGE_SEO.edu.title,
            description: STATIC_PAGE_SEO.edu.description,
        },
        {
            href: "/bolsa",
            title: STATIC_PAGE_SEO.bolsa.title,
            description: STATIC_PAGE_SEO.bolsa.description,
        },
    ];
}

/** Home URLs for other locales (shown on localized home only). */
export function getLanguageNavLinks(currentLang = "es") {
    const code = normalizeLang(currentLang);
    return LOCALES.filter((l) => l.code !== code).map((locale) => ({
        href: localePath("/", locale.code),
        title: locale.label,
        description: SITE_NAV_LABELS[locale.code]?.homeLabel ?? locale.label,
        hreflang: locale.hreflang,
    }));
}

export function getSiteNavLabels(lang = "es") {
    const code = normalizeLang(lang);
    return SITE_NAV_LABELS[code] ?? SITE_NAV_LABELS.es;
}
