import esTreatments from "../locales/es/treatments.json";
import { TREATMENT_SLUGS } from "../data/treatmentSlugs.js";
import { getMainNavLinks } from "../config/site-nav.js";
import { buildPageKeywords } from "../config/page-seo-keywords.js";
import { getHomeCopy, normalizeLang } from "./site-copy.js";
import {
    SITE,
    absoluteUrl,
    buildJsonLd,
    dentalClinicOrganization,
    siteNavigationSchema,
    webSiteSchema,
} from "./seo.js";

/** @param {{ q: string; a: string }[]} items */
export function faqPageSchema(items) {
    return {
        "@type": "FAQPage",
        "@id": `${SITE.origin}/#faq`,
        mainEntity: items.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: {
                "@type": "Answer",
                text: item.a,
            },
        })),
    };
}

export function homeTreatmentsItemListSchema() {
    return {
        "@type": "ItemList",
        "@id": `${SITE.origin}/#servicios`,
        name: "Tratamientos dentales en Dental City",
        numberOfItems: TREATMENT_SLUGS.length,
        itemListElement: TREATMENT_SLUGS.map((slug, index) => {
            const treatment = esTreatments.byService[slug];
            return {
                "@type": "ListItem",
                position: index + 1,
                name: treatment?.pageTitle ?? slug,
                url: absoluteUrl(`/tratamientos/${slug}`),
                ...(treatment?.heroSubtitle ? { description: treatment.heroSubtitle } : {}),
            };
        }),
    };
}

const HOME_MEDICAL_SPECIALTIES = [
    "Orthodontics",
    "General Dentistry",
    "Pediatric Dentistry",
    "Periodontics",
    "Endodontics",
    "Oral Surgery",
    "Cosmetic Dentistry",
    "Dental Implants",
    "Prosthodontics",
    "Maxillofacial Surgery",
    "Biological Dentistry",
    "Digital Dentistry",
];

const GOOGLE_MAPS_URL =
    "https://www.google.com/maps/search/?api=1&query=Dental+City+By+Dra.+Linda+Argote,+Zapopan,+Jalisco";

export function homeWebPageSchema({ lang, description, url, keywords }) {
    return {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: "Dental City — Clínica dental en Zapopan",
        description,
        ...(keywords ? { keywords } : {}),
        inLanguage: lang === "es" ? "es-MX" : lang,
        isPartOf: { "@id": `${SITE.origin}/#website` },
        about: { "@id": `${SITE.origin}/#organization` },
        primaryImageOfPage: {
            "@type": "ImageObject",
            url: SITE.defaultImage,
        },
    };
}

/** @param {string} lang @param {string} description */
export function buildHomeStructuredData(lang, description) {
    const code = normalizeLang(lang);
    const homeCopy = getHomeCopy(code);
    const faqItems = homeCopy.faq?.items ?? [];
    const mainNavLinks = getMainNavLinks(code);
    const homeUrl = code === "es" ? `${SITE.origin}/` : `${SITE.origin}/${code}/`;
    const keywords = buildPageKeywords("home", code);

    return buildJsonLd(
        dentalClinicOrganization({
            description,
            foundingDate: "1999",
            numberOfEmployees: { "@type": "QuantitativeValue", value: 29 },
            hasMap: GOOGLE_MAPS_URL,
            medicalSpecialty: HOME_MEDICAL_SPECIALTIES,
        }),
        webSiteSchema(),
        homeWebPageSchema({ lang: code, description, url: homeUrl, keywords }),
        siteNavigationSchema(mainNavLinks),
        faqItems.length ? faqPageSchema(faqItems) : null,
        homeTreatmentsItemListSchema()
    );
}
