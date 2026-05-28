/** Slugs used in /tratamientos/[slug] — must match service keys in HomeContent */
export const TREATMENT_SLUGS = [
    "implantes",
    "limpieza",
    "coronas",
    "resinas",
    "maxilofacial",
    "endodoncia",
    "periodoncia",
    "guarda-oclusal",
    "puentes",
    "alineadores",
    "invisalign",
    "brackets",
    "blanqueamientos",
    "carillas",
    "limpieza-ninos",
    "selladores",
    "extracciones",
    "ortopedia",
    "armonizacion-facial",
    "diseno-sonrisa",
    "odontologia-biologica",
];

export const SLUG_TO_ITEM_KEY = {
    "guarda-oclusal": "guarda_oclusal",
    "limpieza-ninos": "limpieza_ninos",
    "armonizacion-facial": "armonizacion_facial",
    "diseno-sonrisa": "diseno_sonrisa",
    "odontologia-biologica": "odontologia_biologica",
};

export function slugToItemKey(slug) {
    return SLUG_TO_ITEM_KEY[slug] ?? slug;
}
