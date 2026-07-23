## Why

Las gráficas actuales usan barras monocromáticas y etiquetas genéricas que no
distinguen líder, selección ni contexto temporal. Su relación con las tablas
asociadas es visualmente débil y los estados previos o alternativos al
renderizado no están definidos.

## What Changes

- Aplicar una jerarquía gráfica donde el conjunto sea neutro, la selección use
  teal y el líder use índigo, siempre con etiquetas no dependientes del color.
- Mostrar unidad, fecha de corte, fuente, confianza y caveat junto a cada
  visualización cuando el dataset los declare.
- Definir estados de carga, vacío y error sin presentar una gráfica incompleta
  como resultado válido.
- Coordinar selección y foco entre una gráfica y su tabla asociada mediante
  claves estables del dataset.
- Mantener la tabla completa como fallback accesible y fuente equivalente de
  valores sin JavaScript.
- Reutilizar exclusivamente datasets canónicos y evitar crear rankings,
  transformaciones o comparaciones que no estén documentadas.

## Capabilities

### New Capabilities

Ninguna.

### Modified Capabilities

- `interactive-decision-stories`: amplía el contrato de visualizaciones,
  fallback tabular y composiciones del MVP con jerarquía, metadatos, estados y
  coordinación accesible.

## Impact

- `web/src/components/BarChart.tsx` y demás visualizaciones o contenedores de
  historia.
- Integración con el contrato de tablas definido por `improve-data-tables`, que
  debe implementarse antes de la coordinación gráfica-tabla.
- Tokens semánticos de datos ya definidos en el sistema visual.
- Pruebas unitarias y end-to-end de estados, selección, teclado, etiquetas,
  fallback sin JavaScript y equivalencia de datos.
- No cambia datasets Markdown, scorecards, ponderaciones ni reglas de
  recomendación.
