import { LOCALES, SITE_ORIGIN } from "../config/languages.js";

export const SITE = {
    origin: SITE_ORIGIN,
    name: "Dental City",
    legalName: "Dental City",
    defaultImage: `${SITE_ORIGIN}/logo.png`,
    locale: "es_MX",
    telephone: "+523333087833",
    email: "dentalcity1@hotmail.com",
    address: {
        street: "Av. Santa Margarita 4410, Jardín Real",
        locality: "Zapopan",
        region: "Jalisco",
        postalCode: "45136",
        country: "MX",
    },
    geo: {
        latitude: 20.7238,
        longitude: -103.3858,
    },
    sameAs: [
        "https://www.facebook.com/DentalCityOficial/",
        "https://www.instagram.com/dentalcity_oficial/",
        "https://www.instagram.com/dentalcity_kids/",
    ],
};

/** Normalize pathname to a canonical URL (no trailing slash except home). */
export function canonicalUrl(pathname) {
    let path = (pathname || "/").split("?")[0].split("#")[0];
    if (path.endsWith("/index.html")) path = path.slice(0, -"/index.html".length);
    if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
    return path === "/" || path === "" ? `${SITE.origin}/` : `${SITE.origin}${path}`;
}

export function absoluteUrl(path) {
    if (path.startsWith("http")) return path;
    const clean = path.startsWith("/") ? path : `/${path}`;
    return clean === "/" ? `${SITE.origin}/` : `${SITE.origin}${clean}`;
}

export function buildJsonLd(...nodes) {
    const graph = nodes.filter(Boolean).map((node) => {
        const { "@context": _ctx, ...rest } = node;
        return rest;
    });
    if (graph.length === 0) return null;
    if (graph.length === 1) {
        return { "@context": "https://schema.org", ...graph[0] };
    }
    return { "@context": "https://schema.org", "@graph": graph };
}

export function dentalClinicOrganization(overrides = {}) {
    return {
        "@type": "DentalClinic",
        "@id": `${SITE.origin}/#organization`,
        name: SITE.name,
        url: SITE.origin,
        logo: {
            "@type": "ImageObject",
            url: SITE.defaultImage,
        },
        image: SITE.defaultImage,
        telephone: SITE.telephone,
        email: SITE.email,
        address: {
            "@type": "PostalAddress",
            streetAddress: SITE.address.street,
            addressLocality: SITE.address.locality,
            addressRegion: SITE.address.region,
            postalCode: SITE.address.postalCode,
            addressCountry: SITE.address.country,
        },
        geo: {
            "@type": "GeoCoordinates",
            latitude: SITE.geo.latitude,
            longitude: SITE.geo.longitude,
        },
        openingHoursSpecification: [
            {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                opens: "09:00",
                closes: "20:00",
            },
            {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: "Saturday",
                opens: "09:00",
                closes: "15:00",
            },
        ],
        priceRange: "$$",
        medicalSpecialty: [
            "Orthodontics",
            "General Dentistry",
            "Pediatric Dentistry",
            "Periodontics",
            "Endodontics",
            "Oral Surgery",
            "Cosmetic Dentistry",
            "Dental Implants",
        ],
        areaServed: [
            { "@type": "City", name: "Zapopan" },
            { "@type": "City", name: "Guadalajara" },
        ],
        sameAs: SITE.sameAs,
        ...overrides,
    };
}

export function webSiteSchema() {
    return {
        "@type": "WebSite",
        "@id": `${SITE.origin}/#website`,
        url: SITE.origin,
        name: SITE.name,
        inLanguage: LOCALES.map((l) => (l.code === "es" ? "es-MX" : l.code)),
        publisher: { "@id": `${SITE.origin}/#organization` },
    };
}

/** @param {{ name: string; path: string }[]} items */
export function breadcrumbSchema(items) {
    return {
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: absoluteUrl(item.path),
        })),
    };
}

export function medicalProcedureSchema({ name, description, slug, image }) {
    return {
        "@type": "MedicalProcedure",
        name,
        description,
        url: absoluteUrl(`/tratamientos/${slug}`),
        ...(image ? { image: absoluteUrl(image) } : {}),
        provider: { "@id": `${SITE.origin}/#organization` },
    };
}

/** @param {{ href: string; title: string; description?: string }[]} links */
export function siteNavigationSchema(links) {
    return {
        "@type": "ItemList",
        name: "Main site navigation",
        itemListElement: links.map((link, index) => ({
            "@type": "SiteNavigationElement",
            position: index + 1,
            name: link.title,
            ...(link.description ? { description: link.description } : {}),
            url: absoluteUrl(link.href),
        })),
    };
}

export function blogPostingSchema(post) {
    return {
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        image: post.cover?.startsWith("http") ? post.cover : absoluteUrl(post.cover),
        datePublished: post.date,
        dateModified: post.modified ?? post.date,
        author: { "@type": "Organization", name: SITE.name },
        publisher: {
            "@type": "Organization",
            name: SITE.name,
            logo: { "@type": "ImageObject", url: SITE.defaultImage },
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": absoluteUrl(`/blog/${post.id}`),
        },
        keywords: Array.isArray(post.tags) ? post.tags.join(", ") : post.tags,
        articleSection: post.category,
    };
}
