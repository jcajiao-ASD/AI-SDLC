## Why

El catálogo solo permite combinar cuatro selectores y pierde su estado al
navegar o compartir la URL. Localizar un estudio por título, tema o vigencia
requiere recorrer manualmente un conjunto cada vez más denso.

## What Changes

- Añadir búsqueda textual sobre título, resumen y metadatos visibles.
- Añadir ordenamiento explícito por relevancia, fecha de corte y título.
- Representar los filtros activos como chips removibles y ofrecer una acción
  única para limpiar el estado.
- Persistir búsqueda, filtros y ordenamiento en parámetros de URL compatibles
  con navegación atrás/adelante y enlaces compartidos.
- Convertir cada resultado en una superficie completa y semánticamente
  accionable, sin enlaces anidados ni affordances falsas.
- Mostrar un estado vacío que explique qué criterios no produjeron resultados y
  cómo restablecerlos.
- Mantener los trece estudios visibles y navegables cuando JavaScript no está
  disponible.

## Capabilities

### New Capabilities

Ninguna.

### Modified Capabilities

- `research-observatory`: amplía el contrato del catálogo y sus filtros con
  búsqueda, ordenamiento, estado visible, URL persistente y resultados
  accionables.

## Impact

- `web/src/components/CatalogFilter.tsx` y la presentación de tarjetas del
  catálogo.
- `web/src/pages/investigaciones/index.astro`.
- Utilidades de serialización y normalización de parámetros de URL.
- Pruebas unitarias y end-to-end de filtros, historial, enlaces compartidos,
  teclado, estado vacío y fallback sin JavaScript.
- No cambia el modelo editorial, las rutas individuales ni la navegación global.
