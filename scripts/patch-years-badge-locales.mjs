import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "src", "locales");

const labels = {
    en: { label: "years", aria: "26 years of experience at Dental City" },
    pt: { label: "anos", aria: "26 anos de experiência na Dental City" },
    fr: { label: "ans", aria: "26 ans d'expérience chez Dental City" },
    de: { label: "Jahre", aria: "26 Jahre Erfahrung bei Dental City" },
    it: { label: "anni", aria: "26 anni di esperienza in Dental City" },
    zh: { label: "年", aria: "Dental City 26 年专业经验" },
    ja: { label: "年", aria: "Dental City 26年の実績" },
    ko: { label: "년", aria: "Dental City 26년의 경험" },
    hi: { label: "वर्ष", aria: "Dental City में 26 वर्षों का अनुभव" },
};

for (const [lang, { label, aria }] of Object.entries(labels)) {
    const filePath = path.join(root, lang, "home.json");
    const data = JSON.parse(fs.readFileSync(filePath, "utf8").replace(/^\uFEFF/, ""));
    if (data.topbar?.yearsBadgeNumber) continue;
    data.topbar.yearsBadgeNumber = "26";
    data.topbar.yearsBadgeLabel = label;
    data.topbar.yearsBadgeAria = aria;
    fs.writeFileSync(filePath, `${JSON.stringify(data, null, 4)}\n`, "utf8");
    console.log("patched", lang);
}
