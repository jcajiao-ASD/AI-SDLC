## Why

Las tablas extensas dominan las pantallas estrechas y pierden el contexto al
desplazarse. Además, el observatorio usa dos rutas de renderizado distintas:
tablas Markdown dentro de investigaciones y `DataTable.astro` en historias, por
lo que una solución parcial dejaría experiencias incoherentes y podría ocultar
evidencia necesaria para auditar una comparación.

## What Changes

- Definir un contrato compartido para tablas editoriales y de datos que cubra
  tanto HTML generado desde Markdown como datasets renderizados por componentes.
- Añadir metadatos explícitos para declarar encabezado de fila, columnas
  esenciales, columnas inicialmente ocultas, contenido resumible y rol
  tipográfico sin inferir significado desde los valores.
- Mantener visibles el encabezado y la primera columna prioritaria cuando el
  tamaño y la semántica de la tabla lo permitan.
- Permitir seleccionar columnas visibles sin eliminar datos del HTML ni alterar
  la fuente canónica.
- Añadir una representación móvil resumida por filas desplegables, derivada
  exclusivamente de valores existentes en la tabla.
- Aplicar mejoras por niveles para evitar controles innecesarios en tablas
  compactas y reservar la adaptación avanzada para tablas declaradas o amplias.
- Conservar desplazamiento horizontal accesible como fallback para tablas que no
  admitan una transformación segura.
- Preservar captions o etiquetas accesibles, encabezados de columna y fila,
  enlaces, foco y todos los valores cuando JavaScript no está disponible.

## Capabilities

### New Capabilities

Ninguna.

### Modified Capabilities

- `editorial-design-system`: amplía los componentes editoriales y el
  comportamiento responsive con un contrato único de consulta de tablas.

## Impact

- `web/src/components/DataTable.astro` y posibles componentes interactivos de
  visibilidad o resumen.
- Transformación y estilos de tablas dentro de `.prose`.
- Estilos compartidos de tablas, sticky context, regiones desplazables y vista
  móvil.
- Directiva editorial para tablas Markdown y metadatos tipados para datasets,
  normalizados en un contrato común sin duplicar valores.
- Migración de `hiddenColumns` para que las columnas inicialmente ocultas
  permanezcan en el HTML canónico y puedan recuperarse mediante el selector.
- Roles tipográficos que conservan JetBrains Mono para etiquetas técnicas y
  datos compactos, y Atkinson para controles, captions y celdas narrativas.
- Pruebas unitarias y end-to-end para ambas rutas de renderizado, teclado,
  lectores de pantalla, móvil y fallback sin JavaScript.
- No rediseña gráficas ni modifica valores, rankings o conclusiones.
