import fs from "fs";

const p = "src/components-react/DoctoresContent.jsx";
let s = fs.readFileSync(p, "utf8");
s = s.replace(
    /description="Dental City cuenta con 29 dentistas especializados en todas las[^"]+"/,
    'description="Dental City cuenta con 29 dentistas especializados en todas las áreas de odontología. Más de 25 años de experiencia en Zapopan, Jalisco."'
);
s = s.replace(
    /keywords="dentistas Zapopan[^"]+"/,
    'keywords="dentistas Zapopan, odontólogos Guadalajara, especialistas dentales, equipo dental, clínica dental"'
);
fs.writeFileSync(p, s);
