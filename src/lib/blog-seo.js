import { BLOG_SEO_KEYWORDS } from "../config/blog-seo-keywords.js";

const BLOG_KEYWORD_BASE = [
    "Dental City",
    "clínica dental Zapopan",
    "dentista Guadalajara",
    "blog dental",
];

/** @param {{ id: string; category?: string; tags?: string[] }} post */
export function buildBlogKeywords(post) {
    const topic = post.category ? [post.category] : [];
    const extra = BLOG_SEO_KEYWORDS[post.id] ?? post.tags ?? [];
    return [...BLOG_KEYWORD_BASE, ...topic, ...extra].join(", ");
}
