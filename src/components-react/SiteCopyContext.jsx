import React, { createContext, useContext, useMemo } from "react";
import { localePath, normalizeLang, translate } from "../lib/site-copy.js";

const SiteCopyContext = createContext(null);

export function SiteCopyProvider({ copy, lang, children }) {
    const normalizedLang = normalizeLang(lang);
    const value = useMemo(
        () => ({
            lang: normalizedLang,
            copy,
            t: (key, vars) => translate(copy, key, vars),
            path: (route) => localePath(route, normalizedLang),
        }),
        [copy, normalizedLang]
    );

    return <SiteCopyContext.Provider value={value}>{children}</SiteCopyContext.Provider>;
}

export function useSiteCopy() {
    const ctx = useContext(SiteCopyContext);
    if (!ctx) {
        throw new Error("useSiteCopy must be used within SiteCopyProvider");
    }
    return ctx;
}

export function useOptionalSiteCopy() {
    return useContext(SiteCopyContext);
}
