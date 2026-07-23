## 1. Estado y operaciones del catálogo

- [x] 1.1 Definir el tipo canónico de estado con búsqueda, categoría, estado, año, decisión y ordenamiento.
- [x] 1.2 Implementar normalización de texto, filtrado, relevancia, ordenamiento estable y valores predeterminados en utilidades puras.
- [x] 1.3 Implementar parseo y serialización estable de parámetros de URL, ignorando valores desconocidos.
- [x] 1.4 Añadir pruebas unitarias para diacríticos, empates, relevancia, parámetros inválidos y round-trip de URL.

## 2. Controles y resultados

- [x] 2.1 Añadir búsqueda textual y selector de ordenamiento a `CatalogFilter.tsx`.
- [x] 2.2 Representar cada criterio activo mediante chips removibles y añadir la acción `Limpiar filtros`.
- [x] 2.3 Añadir conteo accesible y estado vacío con una acción directa para restablecer criterios.
- [x] 2.4 Convertir cada resultado en una única superficie completa de enlace sin controles o enlaces anidados.

## 3. URL e historial

- [x] 3.1 Inicializar el catálogo hidratado desde `window.location.search` sin alterar el HTML estático completo.
- [x] 3.2 Sincronizar escritura, filtros y ordenamiento con `history.replaceState` o `pushState` según el tipo de cambio.
- [x] 3.3 Restaurar controles, chips y resultados al recibir `popstate`.
- [x] 3.4 Confirmar que consultas y rutas conservan el subpath configurado de GitHub Pages.

## 4. Progressive enhancement y responsive

- [x] 4.1 Mantener los trece estudios y sus destinos en el HTML cuando JavaScript está deshabilitado.
- [x] 4.2 Ajustar controles, chips y tarjetas para móvil sin desbordamiento horizontal ni affordances falsas.
- [x] 4.3 Añadir estados de foco, activación y anuncios live coherentes con el sistema visual.

## 5. Validación

- [x] 5.1 Añadir pruebas end-to-end de búsqueda, orden, chips, limpieza, estado vacío, historial y enlace compartido.
- [x] 5.2 Añadir cobertura sin JavaScript, teclado, axe y tarjeta completamente accionable.
- [x] 5.3 Ejecutar validación de contenido, Astro check, pruebas unitarias, build, enlaces y pruebas end-to-end.
