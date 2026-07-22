## 1. Distribución tipográfica

- [x] 1.1 Añadir la distribución variable de JetBrains Mono como dependencia local y fijarla en el lockfile.
- [x] 1.2 Importar las variantes normal e itálica desde la aplicación para que Astro emita assets WOFF2 compatibles con `BASE_PATH`.

## 2. Fundamentos y jerarquía

- [x] 2.1 Unificar `--font-sans`, `--font-serif` y `--font-mono` sobre JetBrains Mono con una pila monoespaciada de respaldo, y ajustar la medida de lectura compartida.
- [x] 2.2 Normalizar a `800` los pesos `850` y `900`, impedir síntesis tipográfica y revisar tracking e interlineado para las variantes reales.
- [x] 2.3 Revisar navegación, títulos, controles, tablas, visualizaciones y prosa para corregir desbordamientos o pérdidas de jerarquía en escritorio y móvil.

## 3. Documentación del sistema

- [x] 3.1 Ampliar la superficie del sistema de diseño con la familia JetBrains Mono, sus estilos normal e itálico y la escala de pesos admitida.
- [x] 3.2 Documentar en `web/README.md` que la fuente se empaqueta localmente y no depende de un proveedor externo.

## 4. Verificación

- [x] 4.1 Añadir o actualizar pruebas para comprobar la familia aplicada, los pesos soportados y la ausencia de desplazamiento horizontal en rutas representativas.
- [x] 4.2 Ejecutar la validación de contenido, tipos, tests, construcción y enlaces del observatorio.
- [x] 4.3 Ejecutar las pruebas end-to-end en escritorio y móvil, incluyendo accesibilidad y funcionamiento con JavaScript deshabilitado.
- [x] 4.4 Construir con el subpath `/AI-SDLC`, confirmar que los assets de fuente son locales y que sus URL publicadas se resuelven correctamente.
