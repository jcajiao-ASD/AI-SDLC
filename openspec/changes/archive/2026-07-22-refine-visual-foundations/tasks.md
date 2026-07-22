## 1. Tipografía local y tokens base

- [x] 1.1 Verificar e incorporar la dependencia local de Atkinson Hyperlegible Next con únicamente las variantes y pesos usados por la interfaz.
- [x] 1.2 Actualizar el layout base para cargar Atkinson Hyperlegible Next y JetBrains Mono desde assets del sitio sin solicitudes externas.
- [x] 1.3 Sustituir los aliases tipográficos universales por tokens funcionales de interfaz, lectura y datos, con fallbacks y escalas responsive.

## 2. Color, superficies y estados

- [x] 2.1 Separar los valores primitivos Tinta Costera de los tokens semánticos de texto, acción, foco, selección, información, éxito, advertencia y superficie.
- [x] 2.2 Centralizar en tokens los colores auxiliares actualmente declarados dentro de componentes y eliminar valores cromáticos duplicados.
- [x] 2.3 Definir variantes compartidas para superficies base, estáticas, elevadas, interactivas, seleccionadas y de estado.
- [x] 2.4 Definir estados consistentes `hover`, `focus-visible`, `active` y `disabled`, incluyendo comportamiento con movimiento reducido.

## 3. Migración de estilos compartidos

- [x] 3.1 Aplicar Atkinson Hyperlegible Next a interfaz, titulares y prosa, y JetBrains Mono a tablas, cifras, comandos, badges y metadatos.
- [x] 3.2 Ajustar medida de lectura, interlineado, pesos y wrapping para conservar legibilidad y evitar desbordamiento en rutas representativas.
- [x] 3.3 Eliminar el hover genérico de tarjetas estáticas y aplicar affordances únicamente a enlaces, controles y superficies completas realmente accionables.
- [x] 3.4 Migrar badges, caveats, resúmenes ejecutivos, fichas de evidencia, tarjetas de investigación, filtros y resultados a los nuevos tokens y variantes.

## 4. Documentación del sistema visual

- [x] 4.1 Actualizar `/sistema-diseno/` con los roles tipográficos híbridos, tokens semánticos, jerarquía de superficies y estados de interacción.
- [x] 4.2 Revisar el contenido de la página para que cada muestra documente propósito, uso correcto y alternativa accesible.

## 5. Validación

- [x] 5.1 Actualizar las pruebas de tipografía y paleta para verificar ambas familias locales, sus roles y los tokens semánticos.
- [x] 5.2 Añadir cobertura para asegurar que superficies estáticas no anuncien interacción y que foco, estados y contraste permanezcan accesibles.
- [x] 5.3 Ejecutar la validación de contenido, comprobación Astro, pruebas unitarias, build, enlaces y pruebas end-to-end existentes.
- [x] 5.4 Revisar escritorio y móvil en portada, catálogo, investigación extensa, historias, configurador y sistema de diseño para confirmar jerarquía y ausencia de desbordamiento horizontal.
