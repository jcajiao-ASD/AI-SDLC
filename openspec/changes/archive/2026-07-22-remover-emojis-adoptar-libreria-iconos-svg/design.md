## Context

El observatorio publica directamente trece estudios Markdown y renderiza su
cuerpo mediante Unified, Remark y Rehype. En cuatro estudios aparecen 43 emojis
para representar soporte, ausencia, advertencias y posiciones de ranking. La
interfaz Astro, en cambio, casi no tiene iconografía y utiliza una flecha Unicode
en los enlaces de las historias.

El cambio cruza el modelo de contenido, la validación editorial, componentes
Astro, estilos, documentación del sistema de diseño y pruebas. Debe conservar la
fuente Markdown legible en GitHub, la salida completamente estática, WCAG 2.2 AA
y la compatibilidad con despliegues bajo `BASE_PATH`.

## Goals / Non-Goals

**Goals:**

- Eliminar emojis pictográficos del corpus publicable sin perder significado.
- Expresar estados, advertencias y posiciones mediante texto explícito en el
  Markdown canónico.
- Adoptar iconos Lucide SVG inline en superficies de interfaz donde refuercen
  una etiqueta textual existente.
- Definir reglas reutilizables de tamaño, trazo, color y accesibilidad.
- Impedir mediante validación que los emojis pictográficos reaparezcan en nuevos
  estudios.
- Mantener el sitio sin solicitudes externas de iconos y funcional sin
  JavaScript.

**Non-Goals:**

- Sustituir símbolos técnicos, matemáticos o diagramáticos como `→`, `≤`, `×`,
  `≈` y `Σ`.
- Insertar SVG o sintaxis específica del frontend dentro de `research/*.md`.
- Añadir iconos a cada enlace, etiqueta, campo de metadatos o elemento
  decorativo.
- Incorporar iconos a los componentes Preact, que no los requieren para este
  alcance.
- Rediseñar la marca, la paleta o la estructura de navegación.

## Decisions

### 1. El Markdown conservará significado textual

Los emojis se sustituirán en origen según su contexto:

- `✅` por `Sí`, `Nativo` u otra afirmación explícita.
- `❌` por `No`.
- `⚠️` por `Advertencia:` o `Limitación:`.
- `🥇`, `🥈` y `🥉` por `1.º`, `2.º` y `3.º`.

Esto mantiene cada investigación legible en GitHub y evita que el significado
dependa de la apariencia o pronunciación de un emoji.

**Alternativa descartada:** conservar los emojis y convertirlos a SVG durante
el renderizado. Exigiría una transformación contextual de nodos de texto y
tablas, mezclaría decisiones editoriales con presentación y dejaría la fuente
Markdown con la misma ambigüedad.

### 2. La validación actuará sobre el corpus publicable

`validate-content.ts` verificará los cuerpos de los estudios cargados y fallará
con el archivo y el carácter problemático mediante
`\p{Emoji_Presentation}|\p{Emoji}\uFE0F|\uFE0F`. La última alternativa también
detecta selectores de variación huérfanos. La regla se limitará a
`research/*.md`; los documentos operativos de OpenSpec no forman parte del
producto publicado.

La detección distinguirá emojis pictográficos de símbolos técnicos permitidos.
Las pruebas incluirán dígitos, `*` y `#` para impedir que una implementación
basada en la propiedad demasiado amplia `Emoji` produzca falsos positivos. La
lista inicial de sustituciones también quedará cubierta por pruebas para evitar
regresiones.

**Alternativa descartada:** una lista cerrada con solo los seis glifos actuales.
Sería sencilla, pero permitiría introducir otros emojis sin activar la
validación.

### 3. La interfaz usará el paquete oficial `@lucide/astro`

Se añadirá `@lucide/astro` como dependencia de producción. El paquete oficial es
compatible con Astro 7, permite importar únicamente los componentes usados y
genera SVG inline durante la construcción.

El conjunto inicial será deliberadamente reducido:

- `CircleCheck` para estados positivos.
- `TriangleAlert` para advertencias y caveats.
- `Info` para estados informativos.
- `ArrowRight` para enlaces de acción que actualmente usan una flecha Unicode.

Los iconos heredarán `currentColor` y usarán tamaños y grosor de trazo
consistentes con los tokens del sistema.

**Alternativas descartadas:**

- SVG copiados manualmente: duplican mantenimiento y pierden la trazabilidad de
  una librería versionada.
- `astro-icon` más un paquete Iconify: ofrece un catálogo mayor del necesario y
  añade una capa de integración adicional para cuatro iconos conocidos.
- Fuente de iconos o CDN: introduce dependencia externa, posibles cambios de
  glifo y peor semántica que SVG inline.

### 4. Los iconos reforzarán texto, no lo reemplazarán

Los iconos junto a una etiqueta textual serán decorativos para tecnologías de
asistencia mediante `aria-hidden="true"` y no recibirán foco. Los estados
seguirán comunicándose por texto y no solo por color o forma. Si en el futuro se
añade un control compuesto únicamente por un icono, deberá recibir un nombre
accesible explícito.

`Badge` asociará iconos solo a tonos semánticos (`success`, `warning`, `info`);
los badges neutrales no recibirán icono. `Caveat` mostrará
`TriangleAlert` junto a su título. Los enlaces de historias usarán
`ArrowRight` en lugar de `→`.

### 5. El sistema de diseño documentará la gramática iconográfica

La página `sistema-diseno` mostrará el conjunto aprobado y explicará:

- tamaños disponibles y alineación con texto;
- herencia de color y grosor de trazo;
- tratamiento accesible;
- usos semánticos permitidos;
- prohibición de usar iconos como sustituto único de una etiqueta.

## Risks / Trade-offs

- **[Sustitución textual demasiado genérica]** → Revisar cada celda en contexto y
  conservar calificadores como `nativo`, `contractual` o el nombre del producto.
- **[La detección bloquea un símbolo técnico legítimo]** → Probar explícitamente
  los símbolos permitidos y ajustar la regla a presentación emoji o secuencias
  con selector de variación.
- **[Exceso de iconos reduce la sobriedad editorial]** → Limitar el catálogo
  inicial a cuatro iconos y a componentes con semántica clara.
- **[Iconos redundantes generan ruido para lectores de pantalla]** → Ocultarlos
  cuando exista texto adyacente y validar la salida con Axe.
- **[La dependencia aumenta el tamaño instalado]** → Usar importaciones
  nominales y comprobar que la salida HTML solo contiene los SVG requeridos.

## Migration Plan

1. Añadir `@lucide/astro` y fijar la versión en el lockfile.
2. Sustituir los 43 emojis del corpus y simplificar cualquier normalización que
   dependiera de medallas.
3. Añadir la validación editorial y sus pruebas.
4. Integrar el conjunto mínimo de iconos en componentes Astro y enlaces.
5. Documentar la gramática en el sistema de diseño.
6. Ejecutar la verificación existente, accesibilidad, construcción estática y
   construcción con `BASE_PATH=/AI-SDLC`.

El rollback consiste en revertir la dependencia y los componentes SVG. Las
sustituciones textuales del Markdown son válidas por sí mismas y no necesitan
revertirse para mantener el contenido legible.

## Open Questions

Ninguna. El alcance y las reglas semánticas quedaron definidos durante la
exploración.
