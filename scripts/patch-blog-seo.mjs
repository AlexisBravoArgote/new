import fs from "node:fs";
import path from "node:path";

const dir = path.join("src", "pages", "blog");
const schemaBlock = `const articleSchema = blogPostingSchema(post);
const structuredData = buildJsonLd(
    dentalClinicOrganization(),
    breadcrumbSchema([
        { name: "Inicio", path: "/" },
        { name: "Blog", path: "/blog" },
        { name: post.title, path: \`/blog/\${post.id}\` },
    ]),
    articleSchema
);
`;

const importLine =
    "import { buildJsonLd, blogPostingSchema, breadcrumbSchema, dentalClinicOrganization } from '../../lib/seo.js';";

for (let i = 1; i <= 11; i++) {
    const file = path.join(dir, `${i}.astro`);
    if (!fs.existsSync(file)) continue;

    let content = fs.readFileSync(file, "utf8");

    if (!content.includes(importLine)) {
        content = content.replace(
            /(import BlogPost\d+[^\n]+\n)/,
            `$1${importLine}\n`
        );
    }

    const start = content.indexOf("const articleData");
    if (start === -1) {
        if (!content.includes("const structuredData = buildJsonLd")) {
            console.log("skip (already patched)", file);
        }
        continue;
    }

    const end = content.indexOf("---", start);
    if (end === -1) {
        console.error("no frontmatter end", file);
        continue;
    }

    content = content.slice(0, start) + schemaBlock + "\n" + content.slice(end);
    fs.writeFileSync(file, content);
    console.log("ok", file);
}
