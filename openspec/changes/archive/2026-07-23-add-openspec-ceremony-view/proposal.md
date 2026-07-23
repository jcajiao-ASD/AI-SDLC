## Why

El estudio `research/OpenSpec.md` ya documenta la ceremonia de OpenSpec
(`explore → propose → apply → sync → archive`, perfil ampliado, y
bifurcaciones como cambio pequeño vs. ceremonia completa, perfil core vs.
ampliado, IDE vs. CLI de Copilot, y el checkpoint de revisión antes de
`apply`) pero solo en prosa secuencial. Un lector que evalúa adoptar OpenSpec
tarda en reconstruir mentalmente el flujo y sus ramas condicionales. Una
vista interactiva embebida en el mismo artículo, con el flujo y sus
bifurcaciones representados visualmente, reduce ese esfuerzo sin duplicar el
contenido en un segundo lugar.

## What Changes

- Se añade un módulo interactivo embebido en la página de investigación de
  OpenSpec (`research/OpenSpec.md` / su render en
  `web/src/pages/investigaciones/[slug].astro`) que visualiza la ceremonia
  como un diagrama SVG de pasos y bifurcaciones.
- El módulo organiza dos ejemplos en una sola vista, cada uno claramente
  delimitado:
  - **Ceremonia normal**: recorrido feliz `explore → propose → apply → sync
    → archive`, con el punto de bifurcación de perfil (core vs. ampliado)
    señalado sobre el mismo diagrama.
  - **Ceremonia con solicitud de cambios**: el mismo diagrama con la rama de
    revisión activa — el checkpoint manual antes de `apply` (`openspec show`
    + `validate --strict`, ya documentado en el tutorial brownfield) donde
    el revisor pide cambios y el flujo vuelve a `propose` en vez de avanzar
    a `apply`.
- Cada paso y cada bifurcación del diagrama es interactivo (expandible) y
  muestra el comando real y su descripción tomados del estudio fuente, sin
  reinterpretarlos.
- Los diagramas se renderizan en SVG (no canvas ni imagen rasterizada) por
  peso y fidelidad de render. La revelación de pasos/ramas usa el mismo
  patrón que `BarChart.tsx` (estado de Preact + transición CSS) en vez de
  incorporar una librería de animación nueva, para no romper la disciplina
  de peso y de fallback sin JavaScript que ya rige las visualizaciones del
  observatorio.
- Cada diagrama conserva un fallback textual (lista ordenada o tabla) con
  los mismos pasos, comandos y bifurcaciones, navegable sin JavaScript.
- Se introduce una capability nueva y separada de `interactive-decision-stories`,
  porque este contenido no es una decisión ponderada con evidencia,
  dataset o recomendación: es un recorrido de proceso con ramas
  condicionales documentadas por el propio proyecto OpenSpec.

## Capabilities

### New Capabilities
- `openspec-ceremony-view`: vista interactiva embebida que representa la
  ceremonia de OpenSpec y sus bifurcaciones documentadas (perfil, tamaño de
  cambio, checkpoint de revisión) como diagrama SVG con dos ejemplos
  organizados en una sola vista, cada uno con fallback textual accesible.

### Modified Capabilities
(ninguna — el módulo reutiliza tokens de `editorial-design-system` sin
cambiar sus requisitos, y no depende de datasets de `research-content-model`
ni de las reglas de `interactive-decision-stories`)

## Impact

- Código nuevo: un componente Preact (o varios) para el/los diagrama(s) SVG
  y su fallback, más el bloque de integración en la página de investigación
  de OpenSpec.
- Sin cambios de dependencias (no se añade librería de animación).
- Sin cambios en el modelo de contenido Markdown (`research/*.md`) ni en su
  validación: el diagrama consume directamente los pasos y comandos ya
  presentes en `research/OpenSpec.md`, no un dataset anotado nuevo.
- Afecta solo la página de investigación de OpenSpec; no introduce una ruta
  nueva bajo `/historias`.
