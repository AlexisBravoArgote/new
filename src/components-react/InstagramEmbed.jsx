import React, { useEffect, useRef } from "react";

const EMBED_SCRIPT_FLAG = 'script[data-dc-instagram-embed="true"]';

function loadInstagramEmbeds(root) {
    window.instgrm?.Embeds?.process(root ?? undefined);
}

export { GALLERY_INSTAGRAM_REEL_URL } from "../config/treatment-instagram-urls.js";

export function instagramEmbedSrc(postUrl) {
    const reel = postUrl.match(/\/reel\/([^/?#]+)/i);
    if (reel?.[1]) return `https://www.instagram.com/reel/${reel[1]}/embed`;
    const post = postUrl.match(/\/p\/([^/?#]+)/i);
    if (post?.[1]) return `https://www.instagram.com/p/${post[1]}/embed`;
    return `${postUrl.replace(/\/$/, "")}/embed`;
}

/** Iframe directo: funciona en carrusel y en grillas de tratamientos (sin embed.js). */
export function InstagramReelIframe({ postUrl, className = "", title = "Video en Instagram" }) {
    return (
        <iframe
            src={instagramEmbedSrc(postUrl)}
            title={title}
            className={className}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
        />
    );
}

/**
 * @param {object} props
 * @param {string} props.postUrl
 * @param {string} [props.className]
 * @param {"default" | "compact"} [props.size]
 * @param {boolean} [props.captioned]
 */
export default function InstagramEmbed({ postUrl, className = "", size = "default", captioned = false }) {
    const embedRef = useRef(null);
    const maxWidth = size === "compact" ? 280 : 320;
    const minWidth = size === "compact" ? 260 : 280;

    useEffect(() => {
        const processEmbeds = () => loadInstagramEmbeds(embedRef.current);

        if (window.instgrm?.Embeds) {
            const t = window.setTimeout(processEmbeds, 80);
            return () => window.clearTimeout(t);
        }

        const existing = document.querySelector(EMBED_SCRIPT_FLAG);
        if (existing) {
            const onLoad = () => window.setTimeout(processEmbeds, 80);
            existing.addEventListener("load", onLoad);
            return () => existing.removeEventListener("load", onLoad);
        }

        const script = document.createElement("script");
        script.src = "https://www.instagram.com/embed.js";
        script.async = true;
        script.dataset.dcInstagramEmbed = "true";
        script.onload = () => window.setTimeout(processEmbeds, 80);
        document.body.appendChild(script);

        return undefined;
    }, [postUrl]);

    const permalink = `${postUrl}?utm_source=ig_embed&utm_campaign=loading`;

    return (
        <div ref={embedRef} className={className}>
            <blockquote
                className="instagram-media"
                {...(captioned ? { "data-instgrm-captioned": true } : {})}
                data-instgrm-permalink={permalink}
                data-instgrm-version="14"
                style={{
                    background: "#FFF",
                    border: 0,
                    borderRadius: 12,
                    boxShadow: "0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)",
                    margin: "0 auto",
                    maxWidth,
                    minWidth,
                    padding: 0,
                    width: "100%",
                }}
            >
                <a href={postUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-[#0b1b2b]/80 underline">
                    Instagram
                </a>
            </blockquote>
        </div>
    );
}
