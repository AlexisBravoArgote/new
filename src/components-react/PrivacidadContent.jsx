// src/components-react/PrivacidadContent.jsx
import React from "react";
import TopBar from "./TopBar.jsx";
import Footer from "./Footer.jsx";

export default function Privacidad() {

    return (
        <div className="min-h-screen w-full bg-[#0b1b2b] text-white overflow-x-hidden">
            <TopBar />

            <main className="mx-auto w-full max-w-6xl px-6 md:px-8 py-10 md:py-14">
                {/* Encabezado centrado igual que en Términos */}
                <div className="text-center space-y-3">
                    <span className="inline-flex items-center gap-2 rounded-full border border-[#e4b89233] bg-white/5 px-3 py-1 text-[11px] tracking-[.35em] text-[#e4b892]">
                        • AVISO DE PRIVACIDAD •
                    </span>

                    <div className="mx-auto h-[2px] w-72 md:w-96 rounded bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b] opacity-80" />

                    <p className="text-sm md:text-[15px] text-white/80">
                        Última actualización:{" "}
                        <time dateTime="2025-10-17">17 de Octubre de 2025</time>
                    </p>
                </div>

                {/* Tarjeta del contenido con líneas doradas arriba y abajo */}
                <section
                    aria-label="Aviso de Privacidad"
                    className="mx-auto mt-8 md:mt-10 max-w-4xl rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.03] shadow-[0_18px_50px_rgba(0,0,0,.35)]"
                >
                    <div className="relative rounded-3xl">
                        {/* Halo sutil */}
                        <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(120%_120%_at_10%_0%,rgba(228,184,146,.14),transparent)]" />

                        {/* Contenido */}
                        <div
                            className="
                                relative z-10 px-6 sm:px-8 md:px-10 py-8 md:py-10 text-white/90 leading-relaxed
                                [&>p]:mb-5 [&>p]:text-[15.5px]
                                [&>h2]:mt-10 [&>h2]:mb-3 [&>h2]:text-xl [&>h2]:font-semibold [&>h2]:text-[#e4b892]
                                [&>ul]:my-5 [&>ol]:my-5
                                [&>ul>li]:my-1.5 [&>ol>li]:my-1.5
                                [&_a]:text-[#f2d4b7] hover:[&_a]:text-[#ffe8cf] hover:[&_a]:underline
                            "
                        >
                            <Content />
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

/* -------------------------------------------------------
   Contenido del Aviso de Privacidad
------------------------------------------------------- */
function Content() {
    const Sec = ({ title, children, id }) => (
        <section id={id} className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold tracking-wide text-[#e4b892]">
                {title}
            </h2>
            <div className="h-[2px] w-full rounded bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="space-y-4 text-[15px] leading-7 text-white/85">{children}</div>
        </section>
    );

    const List = ({ children }) => (
        <ul className="ml-5 space-y-2 marker:text-[#e4b892] list-disc">{children}</ul>
    );

    const NumList = ({ children }) => (
        <ol className="ml-5 space-y-2 list-decimal marker:text-[#e4b892]">
            {children}
        </ol>
    );

    return (
        <div className="space-y-10">
            <p>
                De conformidad con lo previsto en la Ley Federal de Protección de Datos
                Personales en Posesión de los Particulares (la “Ley”) y su reglamento
                (el “Reglamento”), y con la finalidad de proteger y establecer su política
                de recolección de datos personales en posesión de la sociedad{" "}
                <strong>CORPORACIÓN DENTAL CITY S.C.</strong> (el “Responsable” y/o la
                “Sociedad”), con domicilio en <strong>Av. Sta. Margarita 4410, Jardín Real,
                    45136 Zapopan, Jal.</strong> y portal de internet{" "}
                <a
                    href="https://www.dentalcity.mx"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    www.dentalcity.mx
                </a>, se establece el presente Aviso de Privacidad (el “Aviso de Privacidad”)
                de acuerdo con los siguientes términos y condiciones.
            </p>

            <p>
                El presente Aviso de Privacidad tiene por objeto la protección de cualquier
                información concerniente a la o las personas físicas identificadas o
                identificables, de clientes, proveedores, y demás terceros que guarden una
                relación con la Sociedad (el “Titular”), regulando el uso y la protección
                de los Datos Personales del Titular, mediante su tratamiento legítimo,
                controlado e informado, a efecto de garantizar su privacidad, así como el
                derecho del Titular a la autodeterminación informativa.
            </p>

            <Sec title="¿Para qué fines utilizaremos sus datos personales?" id="fines">
                <p>
                    Los datos personales que recabamos de usted, los utilizaremos para las
                    siguientes finalidades necesarias para el servicio que solicita:
                </p>
                <List>
                    <li>Atender solicitudes de atención al Titular.</li>
                    <li>Identificar, ubicar, contactar y enviar información al Titular.</li>
                    <li>Integrar su expediente como cliente o solicitante de servicios.</li>
                    <li>
                        Prestar los servicios y transmitir los productos que pudieran llegar a ser
                        o hayan sido contratados.
                    </li>
                    <li>Llevar a cabo la adquisición de derechos o productos relacionados.</li>
                    <li>Conocimiento del mercado y desempeño de la empresa dentro de éste.</li>
                    <li>Seguimiento a ventas.</li>
                    <li>Estudios para determinar la satisfacción del Titular.</li>
                    <li>Creación de directorios.</li>
                    <li>Creación de bases de datos sobre perfil y necesidades del Titular.</li>
                    <li>Notificaciones y avisos sobre bienes y servicios.</li>
                    <li>Envío de comunicaciones de todo tipo.</li>
                    <li>Publicidad o promociones de los bienes del Responsable.</li>
                    <li>
                        Integración de bases y expedientes para fines internos de administración,
                        comercialización y estadísticos.
                    </li>
                    <li>Prospección comercial.</li>
                </List>

                <p className="pt-2">
                    De manera adicional, utilizaremos su información personal para la siguiente
                    finalidad secundaria (opcional) que mejora nuestra atención:
                </p>
                <List>
                    <li>Mercadotecnia o publicitaria.</li>
                </List>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-[14px] text-white/85">
                    Si no desea que sus datos personales se usen para esta finalidad secundaria,
                    comuníquelo por correo a{" "}
                    <a href="mailto:dentalcity1@hotmail.com">dentalcity1@hotmail.com</a>. La negativa no afectará los servicios que solicita o contrata.
                </div>
            </Sec>

            <Sec title="¿Qué datos personales utilizaremos?" id="datos">
                <p>
                    Para las finalidades descritas, podremos utilizar los siguientes datos
                    personales de identificación:
                </p>
                <List>
                    <li>Nombre completo</li>
                    <li>Domicilio</li>
                    <li>Correo electrónico</li>
                    <li>Sexo</li>
                    <li>Fecha y lugar de nacimiento</li>
                    <li>CURP</li>
                    <li>RFC</li>
                    <li>Estado civil</li>
                    <li>Teléfono celular</li>
                    <li>Ocupación</li>
                    <li>Identificación oficial</li>
                    <li>Firma autógrafa</li>
                </List>
            </Sec>

            <Sec title="Medidas de seguridad" id="seguridad">
                <p>
                    La Sociedad cumple con los principios de licitud, consentimiento,
                    información, calidad, finalidad, lealtad, proporcionalidad y
                    responsabilidad previstos por la Ley y su Reglamento. Con fundamento en
                    los artículos 13, 14 y 15 de la Ley, nos comprometemos a guardar estricta
                    confidencialidad y a mantener medidas administrativas, técnicas y físicas
                    para proteger sus datos contra daño, pérdida, alteración, acceso, uso,
                    divulgación o tratamiento no autorizado.
                </p>
                <p>
                    Con fundamento en el artículo 36 de la Ley, sus datos podrán transferirse
                    a Dental City y proveedores de servicios para cumplir obligaciones
                    contractuales, de comercialización y jurídicas de la Sociedad.
                </p>
            </Sec>

            <Sec title="Derechos ARCO y procedimiento" id="arco">
                <p>
                    El manejo de sus Datos Personales es indefinido desde su provisión, sin
                    perjuicio de su derecho a ejercer Acceso, Rectificación, Cancelación u
                    Oposición (“ARCO”), según los artículos 22, 28, 29 y 34 de la Ley.
                    Para ejercerlos, envíe su solicitud a{" "}
                    <a href="mailto:dentalcity1@hotmail.com">dentalcity1@hotmail.com</a>{" "}
                    (atención: Carlos Argote) o por escrito en el domicilio de la Sociedad.
                    También puede comunicarse a <strong>33 3805 3232</strong> y{" "}
                    <strong>33 3832 3296</strong>.
                </p>

                <p className="mt-2">Su solicitud deberá incluir:</p>
                <NumList>
                    <li>Nombre y domicilio u otro medio para recibir respuesta.</li>
                    <li>Documentos que acrediten identidad o representación legal.</li>
                    <li>Descripción clara y precisa de los datos a los que aplica el derecho.</li>
                    <li>Cualquier elemento que facilite la localización de los datos.</li>
                </NumList>

                <p>
                    Si solicita rectificación, indique las modificaciones y adjunte soporte.
                    El Responsable responderá en un máximo de 15 días hábiles desde la
                    recepción; de resultar procedente, se hará efectiva dentro de los 15 días
                    siguientes. Este plazo podrá ampliarse una sola vez por otro igual si lo
                    justifican las circunstancias.
                </p>
            </Sec>

            <Sec title="Revocación del consentimiento" id="revocacion">
                <p>
                    Puede revocar su consentimiento para el tratamiento de datos personales.
                    En algunos casos no podremos atender la solicitud o concluir el uso de
                    forma inmediata por obligaciones legales. Considere que la revocación
                    podría impedir la prestación de ciertos servicios.
                </p>
            </Sec>

            <Sec title="Tecnologías de rastreo (cookies y web beacons)" id="cookies">
                <p>
                    Utilizamos cookies, web beacons u otras tecnologías para mejorar su
                    experiencia y monitorear el uso del sitio.
                </p>
                <p>
                    El portal <strong>www.dentalcity.mx</strong> requiere cookies para su correcta
                    funcionalidad. Las cookies permiten recordar preferencias (p. ej., usuario
                    y contraseña). Los web beacons (imágenes en sitio o correo) pueden
                    registrar dirección IP, tiempo de interacción y navegador.
                </p>

                <p>Datos obtenidos mediante estas tecnologías:</p>
                <List>
                    <li>Región del usuario</li>
                    <li>Tipo de navegador</li>
                    <li>Sistema operativo</li>
                    <li>Páginas visitadas</li>
                    <li>Búsquedas realizadas</li>
                    <li>Dirección IP</li>
                </List>

                <p>
                    Puede deshabilitar las cookies en su navegador. Al hacerlo, algunas
                    funciones de <strong>www.dentalcity.mx</strong> podrían verse limitadas.
                    También puede eliminar las cookies al finalizar cada sesión. Consulte la
                    documentación de su navegador para instrucciones.
                </p>
            </Sec>

            <Sec title="Cambios al aviso" id="cambios">
                <p>
                    Este aviso puede modificarse por nuevos requerimientos legales, cambios
                    internos o en nuestro modelo de negocio. Las actualizaciones podrán
                    consultarse en{" "}
                    <a
                        href="https://www.dentalcity.mx"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        www.dentalcity.mx
                    </a>.
                </p>
            </Sec>

            <Sec title="Consentimiento" id="consentimiento">
                <p>
                    Consiento que mis datos personales sean tratados conforme a los términos y
                    condiciones de este Aviso de Privacidad.
                </p>
            </Sec>
        </div>
    );
}

