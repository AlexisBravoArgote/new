import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import esTreatments from "../locales/es/treatments.json";
import esHome from "../locales/es/home.json";
import esTranslation from "../locales/es/translation.json";

/** Client i18n for treatment pages only (Spanish content). */
i18n.use(initReactI18next).init({
    resources: {
        es: { home: esHome, treatments: esTreatments, translation: esTranslation },
    },
    lng: "es",
    fallbackLng: "es",
    ns: ["home", "treatments", "translation"],
    defaultNS: "treatments",
    returnEmptyString: false,
    interpolation: { escapeValue: false },
});

export default i18n;
