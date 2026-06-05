import React from "react";
import { InstagramReelIframe } from "./InstagramEmbed.jsx";
import {
    BLANQUEAMIENTO_CLINIC_REEL_URL,
    BLANQUEAMIENTO_HOME_KIT_REEL_URL,
} from "../config/treatment-instagram-urls.js";

function VideoCard({ title, postUrl }) {
    return (
        <article className="dc-treatment-video-card flex flex-col items-center rounded-2xl p-4 md:p-5">
            <h4 className="mb-3 text-center text-sm font-semibold text-[#e4b892] md:text-base">{title}</h4>
            <InstagramReelIframe postUrl={postUrl} title={title} className="dc-treatment-instagram-iframe" />
            <a
                href={postUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 text-center text-xs font-medium text-[#e4b892] transition hover:text-[#f4d3b3] md:text-sm"
            >
                Ver en Instagram
            </a>
        </article>
    );
}

export default function BlanqueamientoVideoCompare() {
    return (
        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            <VideoCard title="En el consultorio" postUrl={BLANQUEAMIENTO_CLINIC_REEL_URL} />
            <VideoCard title="Kit para casa" postUrl={BLANQUEAMIENTO_HOME_KIT_REEL_URL} />
        </div>
    );
}
