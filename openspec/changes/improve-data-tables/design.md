## Context

Las investigaciones renderizan tablas GFM como HTML dentro de `.prose`, mientras
las historias usan `DataTable.astro` para datasets normalizados. Ambas rutas
comparten estilos básicos, pero no un contrato de estructura o comportamiento.
Hoy solo existe una región con scroll horizontal; encabezados y contexto
desaparecen, y móvil no dispone de una representación resumida.

El cambio pertenece a `editorial-design-system` porque define una primitiva
compartida, no una historia concreta. `improve-data-visualization` consumirá este
contrato posteriormente para coordinar gráfica y tabla.

## Goals / Non-Goals

**Goals:**

- Unificar el comportamiento de tablas Markdown y `DataTable`.
- Conservar contexto de encabezados y columna identificadora.
- Ofrecer control de columnas y una vista móvil derivada de los mismos datos.
- Mantener semántica tabular completa y fallback sin JavaScript.
- Evitar desbordamiento horizontal de la página.

**Non-Goals:**

- Cambiar valores, ordenamientos, rankings o datasets.
- Diseñar la jerarquía de colores de gráficas.
- Convertir toda tabla en una cuadrícula editable.
- Inferir resúmenes o conclusiones a partir de prosa.

## Decisions

### 1. Contrato DOM común para ambas rutas

El pipeline de Markdown envolverá tablas en la misma estructura de región,
caption accesible y atributos que emite `DataTable.astro`. El componente de
datasets seguirá renderizando en servidor y declarará metadatos opcionales como
clave de fila o columnas prioritarias.

Las mejoras de cliente operarán sobre ese contrato común y no sobre el origen de
los datos.

### 2. La tabla completa permanece como representación canónica

Todos los encabezados y celdas se renderizarán en HTML. La selección de columnas
solo alternará visibilidad; no eliminará valores del documento ni generará un
dataset paralelo.

Sin JavaScript se mostrarán todas las columnas dentro de una región desplazable.

### 3. Sticky context condicionado

El encabezado será sticky dentro del contenedor de tabla. La primera columna
solo será sticky cuando exista un encabezado identificador y el ancho restante
permita lectura útil. Sombras o reglas comunicarán la superposición sin depender
del color.

Se descarta fijar siempre la primera columna porque tablas narrativas o con
celdas muy largas podrían perder demasiado espacio.

### 4. Selector de columnas por encabezados existentes

Un control accesible listará los encabezados reales y permitirá ocultar columnas
no prioritarias. Las columnas esenciales declaradas por la tabla no podrán
ocultarse. El estado se asociará a la instancia de tabla, no se persistirá
globalmente en esta iteración.

### 5. Resumen móvil derivado, no inferido

Para tablas aptas, cada fila podrá presentarse como un `details` cuyo summary use
la celda identificadora y cuyo cuerpo liste pares encabezado-valor. Todo texto,
enlace y cifra procederá de las celdas existentes; no se calcularán ganadores ni
se reformularán conclusiones.

La tabla semántica y la vista por filas se generarán en servidor. Solo la
representación apropiada al breakpoint quedará expuesta a tecnologías de
asistencia para evitar duplicación.

### 6. Fallback seguro para tablas no adaptables

Si faltan encabezados, identificador o estructura regular, la tabla conservará
scroll horizontal accesible y no intentará generar una vista resumida. El
contenedor indicará que puede desplazarse y permitirá foco sin atraparlo.

### 7. Firma visual contenida

La identidad se apoyará en reglas, alineación numérica, encabezados Tinta Costera
y una banda de contexto sticky, no en tarjetas por fila. JetBrains Mono seguirá
reservada para datos y Atkinson para controles y captions.

## Risks / Trade-offs

- **[Dos representaciones duplicadas]** tabla y resumen pueden repetirse para
  lectores de pantalla → exponer solo una por modo y probar el árbol accesible.
- **[Sticky oculta contenido]** columnas anchas pueden cubrir celdas → activar la
  primera columna únicamente bajo condiciones medidas.
- **[Markdown irregular]** tablas válidas para GFM pueden no tener semántica
  suficiente → degradar a scroll sin inventar metadatos.
- **[Controles excesivos]** tablas pequeñas no necesitan selector → mostrarlo
  solo cuando exista una ganancia real.
- **[Clonado de markup]** enlaces o formato inline podrían perderse en resumen →
  transformar el AST/HTML conservando nodos, no texto plano reconstruido.

## Migration Plan

1. Definir el contrato compartido y adaptar `DataTable.astro`.
2. Envolver y anotar tablas Markdown durante renderizado.
3. Implementar sticky header y fallback desplazable.
4. Añadir selector de columnas y resumen móvil para tablas aptas.
5. Cubrir ambas rutas con pruebas de datos, semántica, teclado y no-JS.

El rollback desactiva los controles y la vista resumida; la tabla completa
permanece en el HTML.

## Open Questions

Durante `apply` deberá identificarse si los datasets actuales necesitan declarar
explícitamente una columna esencial adicional a la primera. Esa decisión no
permitirá inferir prioridades desde valores.
