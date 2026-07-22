## Why

La navegación actual oculta las cuatro decisiones principales del observatorio,
no comunica la ubicación activa y en móvil se convierte en dos líneas densas.
Esto obliga a conocer previamente las rutas y debilita el recorrido desde una
pregunta hasta su evidencia.

## What Changes

- Reorganizar la navegación primaria en las áreas `Decidir` y `Explorar`.
- Exponer accesos directos a Modelo, Agente, Framework y Stack dentro de
  `Decidir`, y a Investigaciones y Metodología dentro de `Explorar`.
- Añadir estado activo y breadcrumbs consistentes para portada, catálogo,
  investigaciones, historias y metodología.
- Sustituir la navegación móvil apilada por una cabecera compacta con menú,
  acceso al catálogo y acceso destacado a `Decidir`.
- Mover `Sistema de diseño` fuera de la navegación primaria y conservarlo como
  recurso secundario en el footer.
- Preservar navegación por teclado, foco visible, HTML estático y rutas
  compatibles con el subpath de GitHub Pages.

## Capabilities

### New Capabilities

Ninguna.

### Modified Capabilities

- `research-observatory`: redefine el contrato de navegación transversal para
  organizar tareas de decisión y exploración, indicar ubicación y adaptarse a
  móvil.

## Impact

- `web/src/components/SiteHeader.astro` y `SiteFooter.astro`.
- `web/src/layouts/BaseLayout.astro` y páginas que suministren breadcrumbs o
  estado de navegación.
- Estilos compartidos de cabecera, menú y navegación.
- Pruebas de rutas, teclado, accesibilidad, responsive y subpath.
- No cambia la lógica del catálogo, el contenido de investigaciones, las
  visualizaciones ni las recomendaciones.
