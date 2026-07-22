## Why

Las tablas extensas dominan las pantallas estrechas y pierden el contexto al
desplazarse. Además, el observatorio usa dos rutas de renderizado distintas:
tablas Markdown dentro de investigaciones y `DataTable.astro` en historias, por
lo que una solución parcial dejaría experiencias incoherentes.

## What Changes

- Definir un contrato compartido para tablas editoriales y de datos que cubra
  tanto HTML generado desde Markdown como datasets renderizados por componentes.
- Mantener visibles el encabezado y la primera columna prioritaria cuando el
  tamaño y la semántica de la tabla lo permitan.
- Permitir seleccionar columnas visibles sin eliminar datos del HTML ni alterar
  la fuente canónica.
- Añadir una representación móvil resumida por filas desplegables, derivada
  exclusivamente de valores existentes en la tabla.
- Conservar desplazamiento horizontal accesible como fallback para tablas que no
  admitan una transformación segura.
- Preservar captions, encabezados, asociaciones semánticas, foco y todos los
  valores cuando JavaScript no está disponible.

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
- Metadatos de presentación necesarios para declarar columnas prioritarias sin
  duplicar datasets.
- Pruebas unitarias y end-to-end para ambas rutas de renderizado, teclado,
  lectores de pantalla, móvil y fallback sin JavaScript.
- No rediseña gráficas ni modifica valores, rankings o conclusiones.
