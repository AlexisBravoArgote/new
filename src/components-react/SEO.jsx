// src/components-react/SEO.jsx
import { useEffect } from "react";

/**
 * Actualiza meta tags en el cliente (Astro: el Layout ya define SEO base en SSR).
 */
export default function SEO({
    title,
    description,
    keywords,
    image,
    type = "website",
    noindex = false,
}) {
    const baseUrl = "https://dentalcity.mx";
    const defaultTitle = "Dental City | Clínica Dental en Zapopan, Guadalajara";
    const defaultDescription =
        "Clínica dental integral en Zapopan, Jalisco. Especialidades: ortodoncia, implantes, odontopediatría, estética dental. Tecnología digital de vanguardia.";
    const defaultImage = `${baseUrl}/logo.png`;

    const finalTitle = title ? `${title} | Dental City` : defaultTitle;
    const finalDescription = description || defaultDescription;
    const finalImage = image || defaultImage;
    const finalKeywords =
        keywords ||
        "clínica dental, dentista Zapopan, ortodoncia Guadalajara, implantes dentales, odontopediatría, estética dental";

    useEffect(() => {
        const pathname = window.location.pathname;
        const currentUrl = `${baseUrl}${pathname}`;

        document.title = finalTitle;

        const updateMetaTag = (name, content, attribute = "name") => {
            let element = document.querySelector(`meta[${attribute}="${name}"]`);
            if (!element) {
                element = document.createElement("meta");
                element.setAttribute(attribute, name);
                document.head.appendChild(element);
            }
            element.setAttribute("content", content);
        };

        updateMetaTag("description", finalDescription);
        updateMetaTag("keywords", finalKeywords);
        updateMetaTag("author", "Dental City");
        updateMetaTag("robots", noindex ? "noindex, nofollow" : "index, follow");

        updateMetaTag("og:title", finalTitle, "property");
        updateMetaTag("og:description", finalDescription, "property");
        updateMetaTag("og:image", finalImage, "property");
        updateMetaTag("og:url", currentUrl, "property");
        updateMetaTag("og:type", type, "property");
        updateMetaTag("og:site_name", "Dental City", "property");
        updateMetaTag("og:locale", "es_MX", "property");

        updateMetaTag("twitter:card", "summary_large_image");
        updateMetaTag("twitter:title", finalTitle);
        updateMetaTag("twitter:description", finalDescription);
        updateMetaTag("twitter:image", finalImage);

        let canonical = document.querySelector("link[rel='canonical']");
        if (!canonical) {
            canonical = document.createElement("link");
            canonical.setAttribute("rel", "canonical");
            document.head.appendChild(canonical);
        }
        canonical.setAttribute("href", currentUrl);

        const languages = ["es", "en", "fr", "it", "de", "zh", "ja", "ko"];
        languages.forEach((lang) => {
            let langLink = document.querySelector(`link[rel='alternate'][hreflang='${lang}']`);
            if (!langLink) {
                langLink = document.createElement("link");
                langLink.setAttribute("rel", "alternate");
                langLink.setAttribute("hreflang", lang);
                document.head.appendChild(langLink);
            }
            langLink.setAttribute("href", `${baseUrl}${pathname}?lang=${lang}`);
        });
    }, [finalTitle, finalDescription, finalImage, finalKeywords, type, noindex]);

    return null;
}
