import React from "react";
import { InstagramReelIframe } from "./InstagramEmbed.jsx";
import {
    BRACKETS_LIGATURE_REEL_URL,
    BRACKETS_PLACEMENT_REEL_URL,
    INVISALIGN_ATTACHMENTS_REEL_URL,
    INVISALIGN_SCAN_REEL_URL,
} from "../config/treatment-instagram-urls.js";

function VideoCard({ title, postUrl }) {
    return (
        <div className="dc-treatment-video-card flex flex-col items-center rounded-2xl p-4 md:p-5">
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
        </div>
    );
}

function CompareColumn({ heading, videos }) {
    return (
        <div className="flex flex-col">
            <h3 className="text-center text-lg font-semibold text-white/95 md:text-xl">{heading}</h3>
            <div className="mt-4 grid gap-4">
                {videos.map((video) => (
                    <VideoCard key={video.postUrl} title={video.title} postUrl={video.postUrl} />
                ))}
            </div>
        </div>
    );
}

export default function OrthodonticsVideoCompare() {
    return (
        <div className="grid gap-8 md:grid-cols-2 md:gap-10">
            <CompareColumn
                heading="Invisalign (aligners)"
                videos={[
                    { title: "Escaneo digital", postUrl: INVISALIGN_SCAN_REEL_URL },
                    { title: "Colocación de attachments", postUrl: INVISALIGN_ATTACHMENTS_REEL_URL },
                ]}
            />
            <CompareColumn
                heading="Brackets"
                videos={[
                    { title: "Colocación de brackets", postUrl: BRACKETS_PLACEMENT_REEL_URL },
                    { title: "Cambio de ligas", postUrl: BRACKETS_LIGATURE_REEL_URL },
                ]}
            />
        </div>
    );
}
