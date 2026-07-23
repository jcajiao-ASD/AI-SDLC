## 1. Datos de la ceremonia

- [x] 1.1 Crear `web/src/lib/ceremony.ts` con la estructura tipada de nodos
      (`explore, propose, checkpoint, apply, sync, archive`), aristas y los
      dos ejemplos (`normal`, `solicitud-de-cambios`), incluyendo comando,
      descripción y badge de perfil (core/ampliado) para cada nodo aplicable.
- [x] 1.2 Anotar en el archivo, mediante comentario, la sección exacta de
      `research/OpenSpec.md` de la que proviene cada paso (perfil core,
      tutorial brownfield) para poder detectar drift en revisiones futuras.
- [x] 1.3 Cubrir `ceremony.ts` con una prueba unitaria que verifique que
      cada nodo referenciado por una arista existe y que ambos ejemplos
      comparten el mismo conjunto base de nodos.

## 2. Componente de diagrama SVG

- [x] 2.1 Crear `web/src/components/CeremonyDiagram.tsx` (Preact) que
      renderice el SVG de nodos y aristas a partir de `lib/ceremony.ts`,
      reutilizando tokens de `editorial-design-system` (color, tipografía,
      espaciado) sin declarar valores nuevos.
- [x] 2.2 Implementar el control de dos posiciones (ceremonia normal /
      solicitud de cambios) con estado Preact, mostrando por defecto la
      ceremonia normal.
- [x] 2.3 Implementar el resaltado de la arista de retorno a `propose` y el
      panel de detalle del checkpoint cuando el ejemplo activo es
      "solicitud de cambios".
- [x] 2.4 Implementar los pasos expandibles (click/tecla) que muestran el
      comando y la descripción real de `lib/ceremony.ts`.
      Nota de implementación: los pasos usan `<details>/<summary>` nativos
      en vez de botones controlados por estado — funcionan sin JavaScript y
      son operables por teclado de forma nativa (task 3.2/3.1 reforzadas).
- [x] 2.5 Aplicar transición CSS para el cambio de ejemplo (`stroke`/
      `opacity` en aristas y nodos) apoyada en la regla global existente de
      `prefers-reduced-motion: reduce` (`global.css`), sin duplicar esa
      lógica en el componente.

## 3. Accesibilidad y fallback

- [x] 3.1 Añadir el fallback textual (lista o tabla) con los mismos pasos,
      comandos y la bifurcación de cada ejemplo, presente en el DOM sin
      depender de JavaScript.
      Nota de implementación: ambas secciones de ejemplo (`normal` y
      `solicitud-de-cambios`) se renderizan siempre completas — no se
      ocultan según el ejemplo activo — para que el SSR de Astro produzca
      el fallback completo incluso sin hidratar. Solo el SVG decorativo
      cambia de resaltado según el estado.
- [x] 3.2 Asegurar que el control de alternancia y los pasos expandibles
      sean operables por teclado (foco visible, orden lógico, activación
      con Enter/Espacio).
- [x] 3.3 Marcar el SVG decorativo apropiadamente (`aria-hidden` donde
      corresponda) para que el contenido accesible provenga del fallback
      textual y de los controles, no de las formas SVG.

## 4. Integración en la página de investigación

- [x] 4.1 Añadir un helper `hasCeremonyView(slug)` en `web/src/lib` (o
      junto a la lógica existente de estudios) que devuelva `true` solo
      para el slug `openspec`.
      Nota de implementación: vive en `web/src/lib/ceremony.ts` junto al
      modelo que consume, en vez de en `lib/research.ts`, para mantener la
      capability autocontenida.
- [x] 4.2 Insertar `<CeremonyDiagram client:load />` en
      `web/src/pages/investigaciones/[slug].astro`, entre el
      `study-hero` y el `<article set:html={html} />`, condicionado por
      `hasCeremonyView(study.metadata.slug)`.
- [x] 4.3 Verificar visualmente que la sección no compite con el
      `EvidencePanel` del hero ni rompe el layout en mobile y desktop.
      Verificado con Playwright (`astro build` + `astro preview`) en
      1280px y 375px: el toggle envuelve en dos líneas en mobile sin
      desbordar, el SVG se escala manteniendo proporción y no se solapa
      con el `EvidencePanel`, que queda por encima en el flujo normal del
      documento.

## 5. Verificación

- [x] 5.1 Ejecutar la suite de pruebas existente (`vitest`) y añadir
      pruebas de comportamiento para `CeremonyDiagram` (alternancia entre
      ejemplos, expansión de paso, fallback presente sin hidratar) siguiendo
      el patrón de `StackConfigurator.test.tsx` / `SensitivityExplorer.test.ts`.
      70/70 pruebas en verde (`npx vitest run`), incluyendo
      `ceremony.test.ts` y `CeremonyDiagram.test.tsx`.
- [x] 5.2 Ejecutar `openspec validate add-openspec-ceremony-view --strict`
      y corregir cualquier hallazgo antes de aplicar. Sin hallazgos.
- [x] 5.3 Revisar manualmente la página de investigación de OpenSpec en el
      navegador (`npm run dev` en `web/`) confirmando ambos ejemplos, el
      fallback sin JS (deshabilitando JavaScript) y la navegación por
      teclado.
      Verificado: `astro check` sin errores; `astro build` genera
      `/investigaciones/openspec/` con el contenido completo de ambos
      ejemplos y los comandos reales en el HTML estático (confirmado con
      grep sobre `dist/`, sin depender de hidratación); el resto de
      páginas de investigación no incluyen el módulo (`hasCeremonyView`
      scoping confirmado). Alternancia de ejemplo y resaltado de la arista
      de retorno verificados con Playwright headless (click real,
      `aria-pressed` y clases de la arista comprobadas).
