## Context

`web/src/pages/investigaciones/[slug].astro` renderiza cada estudio de forma
genérica: `renderStudy()` convierte `research/<slug>.md` en un string HTML
que se inyecta con `set:html` dentro de `<article class="shell prose">`. No
hay hoy ningún mecanismo para intercalar un componente interactivo dentro de
ese HTML — el artículo es un bloque server-rendered único, y ningún estudio
tiene hoy una sección especial fuera de ese flujo.

Los componentes interactivos existentes (`BarChart.tsx`, `StackConfigurator`,
`SensitivityExplorer`) son islas Preact (`client:load`) importadas
directamente en páginas `.astro`, consumiendo datasets normalizados vía
`lib/research` y `lib/stack`. Ese pipeline de datasets exige tablas Markdown
anotadas (`research-content-model`) — pensado para series numéricas
comparables, no para una secuencia de pasos con ramas condicionales como la
ceremonia de OpenSpec.

## Goals / Non-Goals

**Goals:**
- Insertar un módulo interactivo dentro de la página de investigación de
  OpenSpec (mismo documento/ruta, sin nueva URL bajo `/historias`).
- Representar la ceremonia normal y un segundo ejemplo de iteración
  (solicitud de cambios antes de `apply`) en una sola vista, con cada
  ejemplo claramente separado y legible por sí solo.
- Renderizar los diagramas en SVG real (no canvas, no imagen rasterizada).
- Mantener el fallback accesible: cada diagrama conserva su equivalente
  textual (lista/tabla) navegable sin JavaScript, coherente con la
  disciplina de fallback que ya aplican `BarChart.tsx` y
  `SensitivityExplorer`.
- Reutilizar tokens visuales existentes de `editorial-design-system`
  (paleta Tinta Costera, tipografía, espaciado, movimiento) sin declarar
  valores nuevos.
- No añadir dependencias nuevas (sin librería de animación).

**Non-Goals:**
- No modela las demás bifurcaciones detectadas en la exploración previa
  (superficie IDE vs. CLI de Copilot, cambio pequeño vs. ceremonia completa,
  conflictos entre changes en `bulk-archive`). Quedan fuera de esta
  iteración; el diagrama puede extenderse después si se decide cubrirlas.
- No es una historia de decisión: no produce recomendación, no usa
  `interactive-decision-stories` ni sus reglas de evidencia/confianza.
- No introduce un nuevo campo de frontmatter genérico para "módulos
  embebidos" en todos los estudios; el mecanismo de esta iteración es
  específico al estudio de OpenSpec.

## Decisions

### 1. Punto de inserción: sección propia entre el hero y el artículo, no HTML intercalado
En vez de inventar una sintaxis de marcador dentro de `research/OpenSpec.md`
para intercalar el componente a mitad de la prosa (lo que implicaría una
nueva convención de anotación y su propia validación, contradiciendo el
alcance declarado en la propuesta de "sin cambios en el modelo de contenido
Markdown ni en su validación"), el módulo se renderiza como una sección
independiente en `[slug].astro`, entre `<header class="study-hero">` y
`<article set:html={html}>`. Funciona como un resumen visual que antecede a
la lectura detallada, siguiendo el mismo criterio narrativo del observatorio
(síntesis antes de detalle) sin adoptar sus reglas de evidencia.

La condición de render es específica al estudio, por slug:
```astro
{study.metadata.slug === 'openspec' && (
  <CeremonyDiagram client:load />
)}
```
Alternativa descartada: un campo de frontmatter genérico (`ceremonyView:
true`) — se descarta por ahora porque solo existe un consumidor; se puede
generalizar cuando exista un segundo caso real.

### 2. Un solo diagrama base, alternado por pestaña/toggle entre los dos ejemplos
Ambos ejemplos ("ceremonia normal" y "ceremonia con solicitud de cambios")
comparten los mismos nodos (`explore, propose, [checkpoint], apply, sync,
archive`). Un control de dos posiciones (Preact state) alterna cuál
recorrido/arista está resaltado y qué panel de detalle se muestra debajo,
en vez de dibujar dos diagramas completos en paralelo. Esto cumple "todo en
una sola vista, dividido y organizado" sin duplicar el SVG ni obligar al
lector a comparar dos figuras separadas.

La bifurcación de perfil (core vs. ampliado) se representa como una
etiqueta/badge sobre los nodos `propose`/`apply`, no como una tercera rama
compitiendo visualmente con los dos ejemplos principales — mantiene el
foco en lo que se pidió sin descartar la información.

### 3. SVG estático + revelado por estado, sin librería de animación
El SVG se define inline en el componente Preact (paths con coordenadas
fijas, como ya hace `BarChart.tsx` con los anchos de barra). El cambio de
ejemplo activo se anima con transición CSS (`stroke-dashoffset`, `opacity`)
disparada por una clase que depende del estado, respetando
`prefers-reduced-motion: reduce` (sin transición, cambio instantáneo).
Se descarta una librería de animación (Motion, GSAP, anime.js) para esta
iteración: el caso de uso (resaltar/atenuar aristas y nodos existentes) no
requiere orquestación compleja, y añadir una dependencia nueva rompe la
consistencia del observatorio, que hoy renderiza todas sus visualizaciones
sin dependencias de animación.

### 4. Copia de pasos/comandos como archivo de datos tipado, no dataset anotado
Los pasos, comandos y descripciones de cada ejemplo viven en un archivo TS
co-ubicado con el componente (p. ej. `lib/ceremony.ts`), con un comentario
que referencia la sección exacta de `research/OpenSpec.md` de la que
provienen (perfil core: líneas ~146-176; tutorial brownfield: líneas
~402-480). No se fuerza este contenido al pipeline de datasets anotados de
`research-content-model`, porque ese pipeline está diseñado para series
comparables con esquema/unidad/confianza, no para una secuencia de pasos de
proceso.

## Risks / Trade-offs

- [Riesgo] La copia de pasos en `lib/ceremony.ts` puede desincronizarse si
  `research/OpenSpec.md` se actualiza (nueva versión de OpenSpec, cambios en
  el perfil core) → Mitigación: comentario con referencia a la sección
  fuente en el propio archivo; revisar ese archivo como parte de cualquier
  actualización futura del estudio.
- [Riesgo] Condicionar el render por `slug === 'openspec'` en una plantilla
  genérica sienta un precedente ad-hoc si aparecen más módulos similares →
  Mitigación: encapsular la condición en un helper con nombre explícito
  (p. ej. `hasCeremonyView(slug)`) para que un segundo caso motive
  generalizar a un campo de frontmatter en vez de acumular condicionales.
- [Riesgo] Un solo diagrama alternado por toggle puede perder claridad si
  ambos ejemplos difieren en más de una arista → Mitigación: acotar el
  segundo ejemplo al checkpoint de revisión ya documentado en el tutorial
  (vuelve de `propose`/revisión a `propose` en vez de avanzar a `apply`),
  que es una diferencia de una sola arista sobre el mismo diagrama.
- [Riesgo] Sin librería de animación, la orquestación de transiciones queda
  limitada a CSS → Mitigación aceptada como trade-off consciente; revisar
  solo si este patrón se repite en más estudios y el enfoque CSS resulta
  insuficiente.

## Open Questions

- ¿La bifurcación de perfil (core/ampliado) debe quedar solo como badge, o
  el usuario prefiere verla como una rama visual explícita en una futura
  iteración?
- ¿Vale la pena generalizar el punto de inserción a un campo de frontmatter
  en cuanto exista un segundo estudio candidato a este tipo de módulo?
