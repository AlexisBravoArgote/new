import React from "react";
import Home from "./HomeContent.jsx";
import { SiteCopyProvider } from "./SiteCopyContext.jsx";
import { getHomeCopy, normalizeLang } from "../lib/site-copy.js";

export default function HomeClient({ lang = "es" }) {
    const normalized = normalizeLang(lang);
    return (
        <SiteCopyProvider copy={getHomeCopy(normalized)} lang={normalized}>
            <Home />
        </SiteCopyProvider>
    );
}
