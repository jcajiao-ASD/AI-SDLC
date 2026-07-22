## 1. Contrato compartido

- [ ] 1.1 Inventariar las tablas Markdown y los usos de `DataTable.astro`, identificando captions, encabezados y columnas esenciales declarables.
- [ ] 1.2 Definir la estructura DOM y los tipos compartidos para región, caption, encabezados, claves de fila y columnas prioritarias.
- [ ] 1.3 Adaptar `DataTable.astro` al contrato sin duplicar ni transformar los valores del dataset.

## 2. Tablas de investigaciones

- [ ] 2.1 Incorporar al pipeline de Markdown una transformación que envuelva tablas GFM con el contrato compartido.
- [ ] 2.2 Preservar enlaces, formato inline, captions disponibles y asociaciones de encabezados durante la transformación.
- [ ] 2.3 Añadir pruebas para tablas regulares, irregulares, con enlaces y con contenido inline.

## 3. Contexto y columnas

- [ ] 3.1 Implementar encabezados sticky dentro de la región de tabla sin ocultar destinos enfocados.
- [ ] 3.2 Implementar primera columna sticky solo para tablas que declaren un identificador y dispongan de ancho suficiente.
- [ ] 3.3 Crear el selector accesible de columnas opcionales y proteger columnas esenciales.
- [ ] 3.4 Mantener todas las columnas visibles cuando JavaScript no está disponible.

## 4. Vista móvil por filas

- [ ] 4.1 Generar en servidor summaries y pares encabezado-valor exclusivamente desde celdas existentes para tablas aptas.
- [ ] 4.2 Conservar enlaces y formato significativo en la representación desplegable.
- [ ] 4.3 Exponer una sola representación a tecnologías de asistencia por breakpoint y degradar tablas irregulares a scroll.
- [ ] 4.4 Ajustar estilos para contener el desplazamiento dentro de la tabla y evitar scroll horizontal de página.

## 5. Validación

- [ ] 5.1 Añadir pruebas de equivalencia de valores entre tabla completa y resumen móvil.
- [ ] 5.2 Añadir pruebas end-to-end de sticky context, selector de columnas, teclado, no-JS, móvil y axe.
- [ ] 5.3 Ejecutar validación de contenido, Astro check, pruebas unitarias, build, enlaces y pruebas end-to-end.
