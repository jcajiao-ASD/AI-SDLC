## Why

Las investigaciones extensas se presentan como una columna continua sin índice
persistente, progreso ni contexto de evidencia durante la lectura. El contenido
es completo, pero orientarse, retomar una sección y auditar una afirmación exige
demasiado desplazamiento.

## What Changes

- Generar una tabla de contenido desde los encabezados reales del Markdown y
  conservar enlaces profundos estables.
- Añadir sección activa y progreso de lectura como mejoras progresivas, sin
  convertirlos en la única forma de orientación.
- Componer en escritorio una cartografía de tres zonas: índice, contenido y
  evidencia; mantener la conclusión próxima al encabezado.
- Presentar índice y evidencia como paneles desplegables accesibles en móvil.
- Consumir el contrato compartido de breadcrumbs sin redefinir la arquitectura
  global de navegación.
- Mantener una lista estática de anclas, el contenido íntegro y la ficha de
  evidencia disponibles sin JavaScript.

## Capabilities

### New Capabilities

Ninguna.

### Modified Capabilities

- `research-observatory`: amplía la lectura completa de investigaciones con
  orientación por secciones, progreso, layout editorial y acceso persistente a
  evidencia.

## Impact

- Pipeline de encabezados y renderizado en `web/src/lib/research.ts`.
- `web/src/pages/investigaciones/[slug].astro`.
- Nuevos componentes de índice, progreso y composición del lector.
- Integración con `EvidencePanel.astro` y con breadcrumbs proporcionados por el
  layout.
- Pruebas de anclas, sección activa, móvil, movimiento reducido, teclado,
  subpath y fallback sin JavaScript.
- No cambia el contenido canónico de `research/` ni el comportamiento de tablas
  o visualizaciones.
