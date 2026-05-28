import React, { useMemo } from "react";
import {
    getLanguageNavLinks,
    getMainNavLinks,
    getSiteNavLabels,
} from "../config/site-nav.js";
import { useOptionalSiteCopy } from "./SiteCopyContext.jsx";

/**
 * Crawlable internal links for sitelink discovery (home section + global footer).
 */
export default function MainSiteLinks({
    variant = "section",
    lang: langProp,
    showLanguages = false,
}) {
    const siteCopy = useOptionalSiteCopy();
    const lang = langProp ?? siteCopy?.lang ?? "es";
    const labels = getSiteNavLabels(lang);
    const mainLinks = useMemo(() => getMainNavLinks(lang), [lang]);
    const languageLinks = useMemo(
        () => (showLanguages ? getLanguageNavLinks(lang) : []),
        [lang, showLanguages]
    );

    if (variant === "footer") {
        return (
            <nav
                className="w-full"
                aria-label={labels.heading}
            >
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-[#e4b892]/90">
                    {labels.heading}
                </p>
                <ul className="flex flex-col gap-1.5 text-[13px]">
                    {mainLinks.map((link) => (
                        <li key={link.href}>
                            <a href={link.href} className="footer-link">
                                {link.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        );
    }

    return (
        <section
            className="border-t border-white/10 bg-[#0f2237] py-14 md:py-16"
            aria-labelledby="main-site-links-heading"
        >
            <div className="mx-auto w-full max-w-6xl px-6 md:px-8">
                <header className="mb-8 text-center md:mb-10">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e4b892]">
                        Dental City
                    </p>
                    <h2
                        id="main-site-links-heading"
                        className="mt-2 text-2xl font-semibold text-white md:text-3xl"
                    >
                        {labels.heading}
                    </h2>
                </header>

                <nav aria-label={labels.heading}>
                    <ul className="grid gap-4 sm:grid-cols-2">
                        {mainLinks.map((link) => (
                            <li key={link.href}>
                                <a
                                    href={link.href}
                                    className="group block h-full rounded-2xl border border-white/10 bg-white/[.04] p-5 transition hover:border-[#e4b892]/40 hover:bg-white/[.07]"
                                >
                                    <span className="text-lg font-semibold text-white group-hover:text-[#e4b892]">
                                        {link.title}
                                    </span>
                                    <span className="mt-2 block text-sm leading-relaxed text-white/70">
                                        {link.description}
                                    </span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                {languageLinks.length > 0 && (
                    <div className="mt-10 border-t border-white/10 pt-8">
                        <h3 className="mb-4 text-center text-sm font-semibold uppercase tracking-wider text-[#e4b892]">
                            {labels.languagesHeading}
                        </h3>
                        <nav aria-label={labels.languagesHeading}>
                            <ul className="flex flex-wrap justify-center gap-2">
                                {languageLinks.map((link) => (
                                    <li key={link.href}>
                                        <a
                                            href={link.href}
                                            hrefLang={link.hreflang}
                                            className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/85 transition hover:border-[#e4b892]/50 hover:text-[#e4b892]"
                                        >
                                            {link.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                )}
            </div>
        </section>
    );
}
