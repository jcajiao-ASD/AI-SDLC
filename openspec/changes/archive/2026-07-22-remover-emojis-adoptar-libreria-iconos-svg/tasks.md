## 1. Migración del contenido canónico

- [x] 1.1 Sustituir en los cuatro estudios afectados los estados `✅`, `❌` y `⚠️` por términos explícitos que conserven calificadores y significado contextual.
- [x] 1.2 Sustituir las medallas de los rankings por ordinales `1.º`, `2.º` y `3.º`, y adaptar la normalización de datos que todavía contemple esos emojis.
- [x] 1.3 Confirmar que `research/*.md` no contiene emojis pictográficos y que conserva los símbolos técnicos permitidos.

## 2. Dependencia y fundamentos iconográficos

- [x] 2.1 Añadir el paquete oficial `@lucide/astro` compatible con Astro 7 y fijarlo en `package-lock.json`.
- [x] 2.2 Definir estilos reutilizables para tamaño, alineación, trazo y herencia de color de los SVG inline.

## 3. Integración en componentes Astro

- [x] 3.1 Incorporar `CircleCheck`, `TriangleAlert` e `Info` a los tonos semánticos de `Badge`, manteniendo texto visible y ocultando los SVG redundantes a tecnologías de asistencia.
- [x] 3.2 Incorporar `TriangleAlert` al componente `Caveat` junto a su título, sin convertir el icono en contenido anunciado o enfocable.
- [x] 3.3 Reemplazar la flecha Unicode de los enlaces de historias por `ArrowRight` SVG inline y conservar el nombre accesible del enlace.
- [x] 3.4 Documentar en `sistema-diseno` el catálogo aprobado y las reglas de tamaño, color, trazo, semántica y accesibilidad.

## 4. Validación editorial y pruebas

- [x] 4.1 Extender la validación de contenido para rechazar presentación emoji y secuencias emoji forzadas, informando el archivo y el carácter problemático.
- [x] 4.2 Añadir pruebas que rechacen emojis pictográficos y acepten `→`, `≤`, `×`, `≈` y `Σ`.
- [x] 4.3 Añadir cobertura end-to-end para confirmar SVG inline, ausencia de solicitudes externas de iconos, texto semántico visible y accesibilidad automática sin regresiones.
- [x] 4.4 Ejecutar `npm run verify`, la suite end-to-end y una construcción con `BASE_PATH=/AI-SDLC`.
