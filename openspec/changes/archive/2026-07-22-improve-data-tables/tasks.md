## 1. Contrato compartido

- [x] 1.1 Inventariar las tablas Markdown y los ocho usos de `hiddenColumns`, identificando captions, encabezados de fila, columnas esenciales, columnas opcionales y contenido narrativo.
- [x] 1.2 Definir el contrato tipado para región, caption, `rowHeader`, `essentialColumns`, `initiallyHiddenColumns`, `summaryColumns` y `contentKinds`.
- [x] 1.3 Validar que toda referencia de metadata exista en los encabezados y que una columna no sea esencial e inicialmente oculta a la vez.
- [x] 1.4 Definir invariantes de columnas esenciales para datasets de compatibilidad, ranking y recomendación.

## 2. Tablas de investigaciones

- [x] 2.1 Definir y parsear la directiva `ai-sdlc-table` inmediatamente anterior a una tabla GFM.
- [x] 2.2 Incorporar al pipeline de Markdown una transformación que envuelva tablas GFM con el contrato compartido.
- [x] 2.3 Etiquetar tablas sin caption mediante el encabezado de sección y un ordinal estable dentro de esa sección.
- [x] 2.4 Preservar enlaces, formato inline, captions disponibles y asociaciones de encabezados durante la transformación.
- [x] 2.5 Anotar las tablas Markdown amplias que necesiten identidad sticky, selector o resumen sin inferir prioridades desde valores.
- [x] 2.6 Añadir pruebas para directivas válidas e inválidas, tablas regulares, irregulares, con enlaces y con contenido inline.

## 3. Componente de datasets y migración

- [x] 3.1 Adaptar `DataTable.astro` al contrato compartido y renderizar `rowHeader` como `<th scope="row">`.
- [x] 3.2 Reemplazar `hiddenColumns` por metadata que mantenga todos los encabezados y celdas en el HTML canónico.
- [x] 3.3 Clasificar y migrar cada llamada existente, incluidas `Candidatos` y `Configurable`, sin asumir que toda columna oculta es una clave técnica.
- [x] 3.4 Añadir pruebas de equivalencia de valores antes y después de la migración y de fallo ante referencias de columna inválidas.

## 4. Contexto y columnas

- [x] 4.1 Implementar encabezados sticky dentro de la región de tabla sin ocultar destinos enfocados.
- [x] 4.2 Implementar el marco en L y la columna sticky solo para tablas con `rowHeader` y ancho restante suficiente.
- [x] 4.3 Crear el selector accesible, proteger columnas esenciales y comunicar columnas activas e inicialmente ocultas.
- [x] 4.4 Aplicar ocultación inicial solo después de inicializar el selector y mantener todos los valores alcanzables sin JavaScript.
- [x] 4.5 Evitar selector y controles adaptativos en tablas compactas que no declaren columnas opcionales.

## 5. Vista móvil y sistema visual

- [x] 5.1 Generar en servidor summaries declarados y todos los pares encabezado-valor exclusivamente desde celdas existentes.
- [x] 5.2 Conservar enlaces y formato significativo en la representación desplegable.
- [x] 5.3 Exponer una sola representación visual y accesible por breakpoint y degradar tablas irregulares a scroll.
- [x] 5.4 Aplicar Atkinson a controles, captions y prosa, y JetBrains Mono a encabezados técnicos y columnas de datos.
- [x] 5.5 Estilizar el resumen móvil como filas planas y el sticky context como marco en L usando tokens Tinta Costera.
- [x] 5.6 Contener el desplazamiento y los cambios de anchura dentro de la región para evitar scroll horizontal o desplazamiento de la página.
- [x] 5.7 Respetar `prefers-reduced-motion` en transiciones del selector y desplegables.

## 6. Validación

- [x] 6.1 Añadir pruebas de equivalencia de valores entre tabla completa, columnas inicialmente ocultas y resumen móvil.
- [x] 6.2 Añadir pruebas end-to-end de encabezados de fila, sticky context, selector, teclado, no-JS, móvil y axe.
- [x] 6.3 Añadir casos end-to-end para tabla compacta sin controles, tabla amplia declarada y tabla irregular con fallback.
- [x] 6.4 Ejecutar validación de contenido, Astro check, pruebas unitarias, build, enlaces y pruebas end-to-end.
