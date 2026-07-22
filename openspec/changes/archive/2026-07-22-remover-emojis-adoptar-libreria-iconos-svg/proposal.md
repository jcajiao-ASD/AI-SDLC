## Why

El contenido publicado usa emojis para expresar soporte, advertencias y
posiciones de ranking, lo que introduce una representación visual dependiente
de la plataforma y menos precisa para accesibilidad y revisión editorial. El
observatorio necesita sustituirlos por texto semántico en la fuente Markdown y
adoptar una iconografía SVG coherente para los elementos propios de la interfaz.

## What Changes

- Reemplazar los emojis pictográficos del corpus publicable por términos
  explícitos como `Sí`, `No`, `Advertencia`, `1.º`, `2.º` y `3.º`, según su
  contexto.
- Incorporar una validación que impida reintroducir emojis pictográficos en
  `research/*.md`.
- Adoptar la librería oficial `@lucide/astro` para renderizar iconos SVG inline
  en componentes Astro sin solicitudes externas durante la navegación.
- Introducir iconos semánticos y sobrios en estados, caveats y enlaces de acción,
  manteniendo siempre una etiqueta textual y sin usar color o forma como único
  medio de comunicación.
- Documentar tamaños, color, accesibilidad y usos permitidos de la iconografía
  en la página del sistema de diseño.
- Mantener fuera de alcance los símbolos técnicos y matemáticos que forman parte
  del significado del texto, como `→`, `≤`, `×`, `≈` y `Σ`.

## Capabilities

### New Capabilities

Ninguna.

### Modified Capabilities

- `research-content-model`: el Markdown canónico deberá expresar estados,
  advertencias y rankings con texto legible, y la validación deberá rechazar
  emojis pictográficos en el corpus publicable.
- `editorial-design-system`: el sistema visual deberá proporcionar iconografía
  SVG inline, accesible, consistente y servida sin dependencias externas en
  tiempo de navegación.

## Impact

- Estudios afectados inicialmente:
  `research/seleccion_agente_codificacion_sdlc.md`,
  `research/comparativa_agentes_ia_mono_llm.md`,
  `research/comparativa_agentes_ia_multi_llm.md` y
  `research/comparativa_llms_sdlc.md`.
- Pipeline editorial y validación en `web/src/lib/` y `web/scripts/`.
- Componentes Astro de badges, caveats y enlaces de acción, además de
  `web/src/pages/sistema-diseno.astro`.
- Pruebas unitarias y end-to-end relacionadas con contenido, accesibilidad y
  salida estática.
- Nueva dependencia de producción `@lucide/astro`, compatible con Astro 7.
