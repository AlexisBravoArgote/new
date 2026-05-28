// src/components/Footer.jsx
import React from "react";
import MainSiteLinks from "./MainSiteLinks.jsx";
import { useOptionalSiteCopy } from "./SiteCopyContext.jsx";
// Using regular anchor tags for Astro
const arquitectura = "/assets/arquitectura.png";
const logoPng = "/assets/download.avif";

// Helpers locales
function Container({ children, className = "" }) {
    return <div className={`mx-auto w-full max-w-7xl px-6 md:px-8 ${className}`}>{children}</div>;
}
function LogoImage({ className = "h-18 w-auto" }) {
    return (
        <div className="flex items-center">
            <img src={logoPng} alt="Dental City" className={className} loading="eager" decoding="async" />
        </div>
    );
}

export default function Footer() {
    const siteCopy = useOptionalSiteCopy();
    const lang = siteCopy?.lang ?? "es";

    return (
        <footer className="relative border-t border-white/10 bg-[#152b53] pt-8 pb-6 overflow-hidden">
            <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b] animate-[shimmer_6s_linear_infinite]" />
            <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b] animate-[shimmer_6s_linear_infinite]" />

            <Container className="mx-auto w-full max-w-7xl relative z-10">
                <div className="mb-8 flex flex-col gap-8 border-b border-white/10 pb-8 md:flex-row md:items-start md:justify-between">
                    <MainSiteLinks variant="footer" lang={lang} />
                </div>

                <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-3">
                    {/* Izquierda: logo */}
                    <div className="flex justify-center md:justify-start">
                        <div className="relative inline-flex items-center justify-center rounded-full p-3 transition-transform duration-500 hover:scale-[1.03] hover:brightness-110">
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#d8a07b33] to-transparent blur-lg transition-all duration-500 hover:from-[#e4b89266]" />
                            <LogoImage className="relative z-10 h-14 w-auto md:h-16 object-contain opacity-95 transition-transform duration-500 hover:scale-[1.03]" />
                        </div>
                    </div>

                    {/* Centro */}
                    <div className="flex flex-col items-center text-center">
                        <div className="relative inline-flex items-center justify-center rounded-full p-3 transition-transform duration-500 hover:scale-[1.03] hover:brightness-110">
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#d8a07b33] to-transparent blur-lg transition-all duration-500 hover:from-[#e4b89266]" />
                            <img src={arquitectura} alt="Arquitectura Dental City" className="relative z-10 h-14 w-auto md:h-18 object-contain opacity-95" loading="lazy" />
                        </div>
                        <div className="mt-3 text-[13px] italic tracking-wide" style={{ fontFamily: "'Playfair Display', serif" }}>
                            <span className="text-white/70">© {new Date().getFullYear()} Dental City — </span>
                            <span className="text-[#e4b892]">by Dra Linda Argote</span>
                        </div>
                    </div>

                    {/* Derecha */}
                    <div className="flex justify-center md:justify-end">
                        {/* Mobile-only */}
                        <div className="md:hidden w-full text-[12px] text-white/75">
                            {/* Fila 1 */}
                            <div className="flex items-center justify-center gap-2 text-center">
                                <a href="/terminos" className="footer-link">TÉRMINOS Y CONDICIONES</a>
                                <span className="leading-none text-[#d8a07b]/90 text-[13px]">•</span>
                                <a href="https://argotelabs.com" target="_blank" rel="noopener noreferrer" className="footer-link">ArgoteLabs</a>
                            </div>
                            {/* Fila 2 */}
                            <div className="mt-2 flex items-center justify-center gap-2 text-center">
                                <a href="/privacidad" className="footer-link">AVISO DE PRIVACIDAD</a>
                                <span className="leading-none text-[#d8a07b]/90 text-[13px]">•</span>
                                <a href="mailto:dentalcity1@hotmail.com" className="footer-link">dentalcity1@hotmail.com</a>
                            </div>
                        </div>

                        {/* Desktop-only */}
                        <div className="hidden md:grid grid-cols-[auto_16px_auto] items-center gap-x-4 gap-y-2 text-[12px] text-white/75">
                            <a href="/terminos" className="footer-link justify-self-end">TÉRMINOS Y CONDICIONES</a>
                            <span className="justify-self-center leading-none text-[#d8a07b]/90 text-[13px]">•</span>
                            <a href="https://argotelabs.com" target="_blank" rel="noopener noreferrer" className="footer-link">ArgoteLabs</a>

                            <a href="/privacidad" className="footer-link justify-self-end">AVISO DE PRIVACIDAD</a>
                            <span className="justify-self-center leading-none text-[#d8a07b]/90 text-[13px]">•</span>
                            <a href="mailto:dentalcity1@hotmail.com" className="footer-link">dentalcity1@hotmail.com</a>
                        </div>
                    </div>
                </div>
            </Container>

            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,400&display=swap');
        @keyframes shimmer { 0%{filter:brightness(1)} 50%{filter:brightness(1.3)} 100%{filter:brightness(1)} }
        .footer-link { position:relative; color:rgba(255,255,255,0.8); text-decoration:none; transition:color .3s ease; }
        .footer-link::after { content:""; position:absolute; bottom:-2px; left:0; width:100%; height:1px;
          background:linear-gradient(90deg,#c89b7b,#e4b892,#c89b7b); transform:scaleX(0); transform-origin:left; transition:transform .4s ease; }
        .footer-link:hover { color:#e4b892; }
        .footer-link:hover::after { transform:scaleX(1); animation:shine 1.6s linear infinite; }
        @keyframes shine { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
      `}</style>
        </footer>
    );
}

