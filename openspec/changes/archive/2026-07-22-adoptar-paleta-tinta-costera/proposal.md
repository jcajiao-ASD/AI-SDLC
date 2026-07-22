## Why

La identidad visual actual depende de verdes y neutros verdosos que no expresan
el carácter fresco, moderno y aireado buscado para la experiencia. Adoptar la
paleta Tinta Costera permite dar profundidad sin pesadez, mejorar la coherencia
de marca y mantener una lectura clara de contenido editorial y datos.

## What Changes

- Sustituir todos los verdes de marca, fondos, gráficos y estados positivos por
  la paleta `#12233F`, `#243B77`, `#2F7EA8`, `#CBEAF2` y `#F7FBFF`.
- Reservar `#12233F` para texto principal, encabezados, navegación y superficies
  oscuras; usar `#243B77` para interacciones y estados que requieren contraste
  textual; y emplear `#2F7EA8` como acento gráfico e iconográfico.
- Usar `#CBEAF2` para separar secciones y destacar superficies abiertas, y
  `#F7FBFF` como fondo general de la experiencia.
- Eliminar el verde también de la semántica de éxito, conservando etiquetas,
  iconos y otras señales no cromáticas para comunicar estados.
- Mantener los colores de advertencia cuando cumplen una función semántica, pero
  reemplazar el naranja meramente decorativo por un tono de la nueva paleta.
- Actualizar la documentación visual y validar que las combinaciones de texto,
  controles, foco y gráficos sigan cumpliendo WCAG 2.2 AA.

## Capabilities

### New Capabilities

Ninguna.

### Modified Capabilities

- `editorial-design-system`: cambia la identidad cromática compartida, su
  asignación semántica y los requisitos de contraste y documentación.

## Impact

El cambio afecta los tokens y estilos globales de `web/src/styles/`, componentes
editoriales con colores directos, gráficos, estados interactivos, encabezado,
pie de página y la página `/sistema-diseno/`. No modifica APIs, datos,
dependencias ni contratos de contenido.
