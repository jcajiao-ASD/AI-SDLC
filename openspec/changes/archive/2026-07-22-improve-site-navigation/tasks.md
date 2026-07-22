## 1. Modelo de navegación

- [x] 1.1 Definir un manifiesto tipado con los grupos `Decidir` y `Explorar`, sus etiquetas, rutas y reglas de coincidencia activa.
- [x] 1.2 Añadir pruebas unitarias para rutas exactas, historias, investigaciones dinámicas y base path.
- [x] 1.3 Definir el tipo de breadcrumb y la API con la que cada página suministrará sus segmentos al layout.

## 2. Cabecera y footer

- [x] 2.1 Refactorizar `SiteHeader.astro` para consumir el manifiesto y presentar la ruta de decisión en escritorio.
- [x] 2.2 Implementar estado activo con `aria-current`, indicador no cromático y estados compartidos de foco, hover y activación.
- [x] 2.3 Implementar la cabecera móvil compacta con menú nativo, acceso a `Decidir` y enlace etiquetado al catálogo.
- [x] 2.4 Retirar `Sistema de diseño` de navegación primaria y conservar su destino en `SiteFooter.astro`.

## 3. Navegación contextual

- [x] 3.1 Crear el componente compartido de breadcrumbs y renderizarlo desde `BaseLayout.astro`.
- [x] 3.2 Suministrar breadcrumbs coherentes desde portada, catálogo, investigaciones, historias, metodología y sistema de diseño.
- [x] 3.3 Compartir el offset de cabecera sticky con encabezados y destinos por hash para evitar contenido oculto.

## 4. Responsive y accesibilidad

- [x] 4.1 Ajustar estilos de escritorio y móvil para evitar dos líneas densas, desbordamiento y áreas táctiles insuficientes.
- [x] 4.2 Verificar orden de foco, apertura y cierre del menú, navegación sin JavaScript y retorno de foco.
- [x] 4.3 Añadir pruebas end-to-end de estado activo, breadcrumbs, subpath, teclado, móvil y axe.

## 5. Validación

- [x] 5.1 Ejecutar validación de contenido, Astro check, pruebas unitarias, build y comprobación de enlaces.
- [x] 5.2 Ejecutar las pruebas end-to-end y revisar portada, catálogo, investigación e historias en escritorio y móvil.
