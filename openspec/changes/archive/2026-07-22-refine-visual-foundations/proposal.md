## Why

El observatorio aplica JetBrains Mono, tarjetas, bordes y elevación casi por
igual a prosa, datos, controles y superficies estáticas. Esa uniformidad
dificulta distinguir qué se lee, qué se compara y qué se puede accionar,
especialmente en investigaciones largas y pantallas estrechas.

## What Changes

- **BREAKING**: sustituir la identidad tipográfica monoespaciada universal por un
  sistema híbrido: Atkinson Hyperlegible Next para interfaz y lectura, y
  JetBrains Mono para datos, metadatos, comandos y etiquetas técnicas.
- Conservar los cinco colores de Tinta Costera, pero separar sus valores
  primitivos de los roles semánticos de texto, acción, selección, estado,
  superficie y foco.
- Definir una jerarquía compartida de superficies estáticas, interactivas,
  elevadas, seleccionadas, informativas y de advertencia.
- Normalizar los estados `hover`, `focus`, `active`, `selected` y `disabled`,
  evitando affordances de interacción en elementos que no son accionables.
- Ajustar escala tipográfica, medidas de lectura, espaciado, radios, elevación y
  movimiento para mejorar legibilidad y densidad sin cambiar todavía la
  arquitectura de navegación ni los flujos de producto.
- Actualizar la página del sistema de diseño y las comprobaciones automatizadas
  para documentar y proteger los nuevos fundamentos.

## Capabilities

### New Capabilities

Ninguna.

### Modified Capabilities

- `editorial-design-system`: cambia el contrato tipográfico universal, amplía
  los roles semánticos de color y superficies, y precisa los estados de
  interacción y legibilidad compartidos.

## Impact

- Estilos y tokens compartidos en `web/src/styles/`.
- Layout base y componentes editoriales reutilizables en `web/src/components/`.
- Página `web/src/pages/sistema-diseno.astro`.
- Dependencias de fuentes locales y pruebas de tipografía, paleta,
  accesibilidad y comportamiento responsive.
- No cambia el contenido canónico de `research/`, los datasets Markdown, las
  rutas públicas ni la lógica de recomendaciones.
