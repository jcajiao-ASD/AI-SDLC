## Why

El observatorio usa actualmente familias distintas para interfaz, lectura
editorial y datos, lo que diluye su identidad tecnológica. Unificar la
tipografía con JetBrains Mono refuerza el carácter del producto y mantiene una
jerarquía consistente mediante sus variantes de peso y cursiva.

## What Changes

- Adoptar JetBrains Mono como familia tipográfica en todas las superficies del
  observatorio: navegación, títulos, prosa, controles, tablas, visualizaciones y
  fragmentos técnicos.
- Incorporar localmente las variantes variables normal e itálica, sin depender
  de servicios externos durante la carga del sitio.
- Ajustar los pesos tipográficos al rango soportado por la familia y preservar
  la jerarquía visual existente.
- Recalibrar medidas de lectura, escalas y composiciones responsive cuando el
  ancho monoespaciado afecte la legibilidad o provoque desbordamientos.
- Documentar la nueva identidad tipográfica en la superficie interna del sistema
  de diseño.

## Capabilities

### New Capabilities

Ninguna.

### Modified Capabilities

- `editorial-design-system`: El fundamento tipográfico compartido pasa a
  JetBrains Mono autoalojada y debe conservar legibilidad, jerarquía y
  comportamiento responsive en todo el observatorio.

## Impact

- Tokens y estilos globales bajo `web/src/styles/`.
- Componentes y páginas con pesos, métricas o composiciones sensibles al ancho
  tipográfico.
- Superficie interna `web/src/pages/sistema-diseno.astro`.
- Dependencias o assets necesarios para empaquetar JetBrains Mono en la
  construcción estática.
- Pruebas visuales, responsive, accesibilidad y construcción para GitHub Pages.
