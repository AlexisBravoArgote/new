/**
 * Optional client-side title updates. Primary SEO is rendered in Layout.astro (SSR).
 * Does not modify canonical or hreflang — those are set correctly per locale in Astro.
 */
import { useEffect } from "react";

export default function SEO({ title, description, noindex = false }) {
    useEffect(() => {
        if (title) {
            document.title = title.includes("Dental City") ? title : `${title} | Dental City`;
        }
        if (description) {
            const el = document.querySelector('meta[name="description"]');
            if (el) el.setAttribute("content", description);
        }
        if (noindex) {
            const robots = document.querySelector('meta[name="robots"]');
            if (robots) robots.setAttribute("content", "noindex, follow");
        }
    }, [title, description, noindex]);

    return null;
}
