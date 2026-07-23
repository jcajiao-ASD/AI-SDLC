## Context

`BarChart.tsx` recibe etiqueta, valor y detalle, ordena por valor, usa un único
color y fija el eje como `Puntuación`. El componente no recibe unidad, fecha,
confianza, clave estable, selección ni líder declarado. La tabla equivalente se
renderiza por separado y no comparte estado.

Este cambio se implementará después de `improve-data-tables`, cuyo contrato
proporcionará claves y estados de fila para coordinar ambas representaciones.

## Goals / Non-Goals

**Goals:**

- Expresar conjunto, selección y líder con semántica consistente.
- Mantener unidad, corte, confianza, caveat y fuente cerca de la gráfica.
- Definir carga, vacío y error sin ocultar el fallback tabular.
- Coordinar teclado y selección entre gráfica y tabla.
- Conservar equivalencia exacta con datasets canónicos.

**Non-Goals:**

- Crear nuevas scorecards, rankings o transformaciones.
- Fusionar benchmarks o unidades incompatibles.
- Reemplazar la tabla como fallback.
- Añadir una librería de visualización distinta en esta iteración.

## Decisions

### 1. Contrato explícito de visualización

Las visualizaciones recibirán un modelo con claves de dato, unidad, dominio,
fecha de corte, confianza, fuente, caveat y estados opcionales de selección o
liderazgo. El componente no extraerá estas propiedades desde texto visible.

El líder solo podrá declararse desde datos normalizados o derivarse de una
operación documentada para un ranking comparable. Una serie genérica no asumirá
que el máximo equivale a recomendación.

### 2. Jerarquía cromática Tinta Costera

El conjunto usará un tono neutro, la selección teal y el líder índigo. Etiquetas,
peso, patrón o marcador acompañarán el color. El ámbar quedará reservado para
límites o advertencias y nunca para destacar rendimiento.

Esta decisión aplica la firma `Cartografía de evidencia` sin introducir una
paleta decorativa nueva.

### 3. Encabezado de evidencia de la gráfica

Cada figura compondrá título, descripción, unidad, fecha de corte, confianza y
enlaces de fuente antes o junto a la visualización. Los caveats materiales
quedarán próximos al gráfico y no solo en el final de la historia.

### 4. Estados sin éxito falso

Durante carga, el fallback tabular y un estado textual permanecerán disponibles.
Un dataset vacío mostrará `Datos no disponibles`; un error de renderizado
mostrará un diagnóstico visible y conservará la tabla. Ninguno de esos estados
presentará ejes o barras parciales como resultado válido.

### 5. Coordinación mediante claves estables

Cada marca y cada fila asociada compartirán una clave del dataset. Activar una
marca o fila actualizará selección, foco contextual y detalle en ambas
representaciones. El teclado podrá recorrer las marcas o usar la tabla sin
requerir puntero.

La selección será estado de exploración, no una nueva recomendación.

### 6. Responsive guiado por contenido

Las etiquetas se mantendrán completas mediante wrapping, márgenes calculados o
composición alternativa. En móvil se preferirán barras horizontales o listas
gráficas que preserven etiqueta y valor, sin scroll global.

### 7. Movimiento concentrado

Solo se animará una transición de selección o carga cuando aporte continuidad.
`prefers-reduced-motion` mostrará el estado final sin interpolación.

## Risks / Trade-offs

- **[Líder inferido incorrectamente]** el valor máximo puede no ser una
  recomendación → exigir declaración o esquema comparable documentado.
- **[Coordinación frágil]** claves inconsistentes romperían gráfica y tabla →
  validar unicidad antes de renderizar y fallar con diagnóstico localizado.
- **[Demasiados metadatos]** la figura puede volverse densa → usar una franja
  editorial compacta y priorizar unidad, corte y caveat.
- **[Fallback oculto durante error]** el usuario perdería acceso a datos →
  mantener siempre disponible la tabla asociada.
- **[Color insuficiente]** líder y selección pueden confundirse → combinar color
  con etiqueta textual y forma.

## Migration Plan

1. Extender el modelo de props y adaptar las historias consumidoras.
2. Incorporar metadatos y estados de figura.
3. Aplicar jerarquía semántica y responsive.
4. Integrar claves y selección con el contrato de tablas.
5. Cubrir equivalencia, teclado, no-JS, error y movimiento reducido.

El rollback conserva los datasets y tablas; solo se restaura la representación
monocromática anterior.

## Open Questions

Ninguna. Cada historia deberá declarar durante `apply` si su dataset representa
un ranking comparable y cuál es la clave estable de cada fila.
