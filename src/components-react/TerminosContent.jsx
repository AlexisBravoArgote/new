// src/components-react/TerminosContent.jsx
import React from "react";
import TopBar from "./TopBar.jsx";
import Footer from "./Footer.jsx";

export default function Terminos() {

    return (
        <div className="min-h-screen w-full bg-[#0b1b2b] text-white overflow-x-hidden">
            <TopBar />

            <main className="mx-auto w-full max-w-6xl px-6 md:px-8 py-10 md:py-14">
                {/* Encabezado centrado */}
                <div className="text-center space-y-3">
                    <span className="inline-flex items-center gap-2 rounded-full border border-[#e4b89233] bg-white/5 px-3 py-1 text-[11px] tracking-[.35em] text-[#e4b892]">
                        • TÉRMINOS Y CONDICIONES •
                    </span>

                    <div className="mx-auto h-[2px] w-72 md:w-96 rounded bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b] opacity-80" />

                    <p className="text-sm md:text-[15px] text-white/80">
                        Última actualización:{" "}
                        <time dateTime="2025-10-17">17 de Octubre de 2025</time>
                    </p>
                </div>

                {/* Tarjeta de contenido */}
                <section
                    aria-label="Términos y Condiciones"
                    className="mx-auto mt-8 md:mt-10 max-w-4xl rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.03] shadow-[0_18px_50px_rgba(0,0,0,.35)]"
                >
                    <div className="relative rounded-3xl">
                        {/* Halo/luces */}
                        <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(120%_120%_at_10%_0%,rgba(228,184,146,.14),transparent)]" />

                        {/* Contenido con ESPACIOS sin plugin typography */}
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
                            <p>
                                Los presentes términos y condiciones (los “<strong>Términos y Condiciones</strong>”)
                                tienen como objeto regular la relación contractual entre{" "}
                                <strong>CORPORACIÓN DENTAL CITY S.C.</strong> (el “Responsable” y/o la “Sociedad”) y el
                                usuario (el “Usuario” o “Usted”), aplicables a todo el uso del contenido (el “Contenido”)
                                del sitio web localizado en <strong>www.dentalcity.mx</strong> (el “Sitio Web”).
                            </p>

                            <p>
                                <strong>DENTAL CITY</strong> está ubicado en Av. Sta. Margarita 4410, Jardín Real, 45136
                                Zapopan, Jal.
                            </p>

                            <p>
                                Le solicitamos leer cuidadosamente estos Términos y Condiciones antes de usar o navegar en el
                                Sitio Web; al ingresar y utilizarlo, Usted acepta expresamente su contenido mediante este
                                medio electrónico, conforme al Código Civil Federal y demás legislación aplicable.
                            </p>

                            <h2>Alcance del Sitio Web</h2>
                            <p>
                                El Usuario está autorizado únicamente a navegar con un propósito informativo personal, para
                                conocer los servicios brindados por DENTAL CITY y sus ubicaciones. Queda estrictamente
                                prohibido utilizar cualquier información del Sitio Web sin autorización previa y por escrito
                                de DENTAL CITY.
                            </p>
                            <p>
                                En ningún caso el Usuario podrá copiar, reproducir, descargar, traducir, almacenar, distribuir
                                o transmitir el Contenido sin autorización previa por escrito de DENTAL CITY.
                            </p>
                            <p>
                                El acceso y uso del Sitio Web no requieren suscripción o registro. Sin embargo, para
                                contactarnos podría requerirse proporcionar ciertos datos, los cuales se tratarán conforme al{" "}
                                <a href="/privacidad">Aviso de Privacidad</a>.
                            </p>
                            <p>
                                El uso del Sitio Web por menores de edad no está autorizado; los actos que estos realicen serán
                                responsabilidad de sus tutores.
                            </p>

                            <h2>Información y contenido del Sitio Web</h2>
                            <p>
                                DENTAL CITY no garantiza que el Sitio Web esté libre de errores, virus o interrupciones, ni
                                garantiza resultados específicos derivados de su uso. DENTAL CITY podrá modificar en cualquier
                                momento y sin previo aviso el Contenido, imagen, información y configuración del Sitio Web.
                            </p>
                            <p>
                                Todo el Contenido es informativo e ilustrativo; los proyectos finales ejecutados por DENTAL CITY
                                pueden variar por exigencias técnicas y/o regulatorias. DENTAL CITY no será responsable del uso
                                que el Usuario dé al Contenido, ni de su efectividad o exactitud.
                            </p>
                            <p>
                                El Sitio Web puede contener enlaces a sitios de terceros sobre los que DENTAL CITY no tiene
                                control y cuya información no respalda ni garantiza.
                            </p>

                            <h2>Uso autorizado del Sitio Web y del Contenido</h2>
                            <p>
                                Toda la información y el Contenido (texto, imágenes, marcas, software, bases de datos, diseños,
                                arquitectura funcional, entre otros) son propiedad de DENTAL CITY, sus filiales o terceros, y
                                están protegidos por la legislación de propiedad intelectual e industrial.
                            </p>
                            <p>
                                El Usuario se obliga a no utilizar el Sitio Web con fines ilícitos o contrarios a estos Términos
                                y Condiciones. Queda prohibida la reproducción, copia, distribución o modificación –total o
                                parcial– del Contenido sin autorización previa y por escrito.
                            </p>
                            <p>
                                El Usuario no podrá usar el Sitio Web para transmitir, almacenar o destruir material que
                                (i) viole normativa vigente, (ii) infrinja derechos de terceros o (iii) vulnere la
                                confidencialidad, honor o privacidad de las personas.
                            </p>

                            <h2>Exclusión de garantías y responsabilidad</h2>
                            <p>
                                El Sitio Web y su Contenido se suministran “tal cual”, sin garantías de ninguna clase.
                                DENTAL CITY no garantiza la exactitud, veracidad o actualización del Contenido. En ningún caso
                                será responsable por daños directos o indirectos que resulten del uso o imposibilidad de uso del
                                Sitio Web.
                            </p>

                            <h2>Generales</h2>
                            <p>
                                DENTAL CITY podrá modificar total o parcialmente estos Términos y Condiciones en cualquier
                                momento. Las versiones actualizadas se publicarán en el Sitio Web y su publicación constituirá
                                notificación suficiente. El uso continuado del Sitio Web implicará aceptación de las
                                modificaciones.
                            </p>
                            <p>
                                La nulidad de alguna cláusula no afectará la validez del resto. Este documento, junto con el{" "}
                                <a href="/privacidad">Aviso de Privacidad</a>, constituye el acuerdo íntegro entre Usted y
                                DENTAL CITY respecto del uso del Sitio Web.
                            </p>
                            <p>
                                Este documento se rige por las leyes de México. El Usuario se somete a los tribunales competentes
                                del Estado de Jalisco, renunciando a cualquier otro fuero.
                            </p>

                            <h2>Contacto</h2>
                            <p>
                                Para dudas, sugerencias o comentarios, puede escribir a{" "}
                                <a href="mailto:dentalcity1@hotmail.com">dentalcity1@hotmail.com</a>.
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}



