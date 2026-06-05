import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "src", "locales");

const ivan = {
    pt: {
        title: "Odontologia biológica",
        description:
            "O Dr. Iván fala sobre odontologia biológica (também conhecida como odontologia holística).",
    },
    fr: {
        title: "Odontologie biologique",
        description:
            "Le Dr Iván nous parle de l'odontologie biologique (également appelée odontologie holistique).",
    },
    de: {
        title: "Biologische Zahnheilkunde",
        description:
            "Dr. Iván spricht über biologische Zahnheilkunde (auch bekannt als holistische Zahnheilkunde).",
    },
    it: {
        title: "Odontoiatria biologica",
        description:
            "Il Dott. Iván ci parla di odontoiatria biologica (nota anche come odontoiatria olistica).",
    },
    zh: {
        title: "生物牙科",
        description: "Iván 医生介绍生物牙科（亦称整体牙科）。",
    },
    ja: {
        title: "生物歯科",
        description: "イヴァン医師が生物歯科（ホリスティック歯科とも呼ばれます）について語ります。",
    },
    ko: {
        title: "생물학적 치과",
        description: "이반 원장이 생물학적 치과(홀리스틱 치과)에 대해 이야기합니다.",
    },
    hi: {
        title: "जैविक दंत चिकित्सा",
        description:
            "डॉ. इवान जैविक दंत चिकित्सा (जिसे समग्र दंत चिकित्सा भी कहा जाता है) के बारे में बताते हैं।",
    },
};

for (const lang of Object.keys(ivan)) {
    for (const file of ["home.json", "translation.json"]) {
        const filePath = path.join(root, lang, file);
        const data = JSON.parse(fs.readFileSync(filePath, "utf8").replace(/^\uFEFF/, ""));
        if (data.doctorVideos?.items?.ivan) continue;
        data.doctorVideos.items.ivan = ivan[lang];
        const ordered = ["team", "andrea", "alvaro", "yolanda", "ivan", "digital"];
        const items = {};
        for (const key of ordered) {
            if (data.doctorVideos.items[key]) items[key] = data.doctorVideos.items[key];
        }
        data.doctorVideos.items = items;
        fs.writeFileSync(filePath, `${JSON.stringify(data, null, 4)}\n`, "utf8");
        console.log("patched", lang, file);
    }
}
