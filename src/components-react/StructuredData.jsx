// src/components/StructuredData.jsx
import { useEffect } from "react";

/**
 * Componente para agregar Structured Data (JSON-LD) para SEO
 */
export default function StructuredData({ data }) {
    useEffect(() => {
        // Remover structured data anterior si existe
        const existingScript = document.getElementById("structured-data");
        if (existingScript) {
            existingScript.remove();
        }

        // Crear nuevo script con JSON-LD
        const script = document.createElement("script");
        script.id = "structured-data";
        script.type = "application/ld+json";
        script.text = JSON.stringify(data);
        document.head.appendChild(script);

        return () => {
            const scriptToRemove = document.getElementById("structured-data");
            if (scriptToRemove) {
                scriptToRemove.remove();
            }
        };
    }, [data]);

    return null;
}
