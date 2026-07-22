## Context

`CatalogFilter.tsx` mantiene cuatro valores en estado local y filtra trece
elementos por igualdad exacta. No existe búsqueda, ordenamiento, chips, acción de
limpieza, estado vacío ni sincronización con URL. Las tarjetas hidratadas
repiten parte de `ResearchCard.astro`, por lo que la semántica visual también
puede divergir.

La ruta debe seguir publicándose estáticamente. Sin JavaScript se conservará el
corpus completo, mientras la hidratación añadirá búsqueda y manipulación del
historial.

## Goals / Non-Goals

**Goals:**

- Reducir el tiempo para localizar un estudio por texto o metadatos.
- Hacer visible, reversible y compartible el estado del catálogo.
- Mantener ordenamiento estable y resultados semánticamente accionables.
- Conservar el corpus completo y navegable sin JavaScript.

**Non-Goals:**

- Añadir búsqueda global sobre el cuerpo completo de las investigaciones.
- Cambiar el frontmatter o incorporar un servicio de indexación.
- Modificar la navegación global o el diseño del lector.
- Alterar el número de estudios o sus rutas.

## Decisions

### 1. Estado canónico serializable

El catálogo usará un objeto tipado con `q`, `category`, `status`, `year`,
`decision` y `sort`. Una única capa normalizará valores, descartará parámetros
desconocidos y serializará la URL en orden estable.

La hidratación inicial leerá `window.location.search`; `popstate` restaurará los
controles y resultados. La escritura durante texto podrá reemplazar la entrada
actual, mientras cambios confirmados de filtros, orden o limpieza crearán una
entrada navegable en el historial.

### 2. Búsqueda local normalizada

La consulta se comparará sin distinción de mayúsculas ni diacríticos contra
título, resumen, categoría, estado, año y tipo de decisión ya presentes en los
items. No se indexará el cuerpo del Markdown ni se incorporará fuzzy search.

Esta elección mantiene el cambio pequeño, determinista y suficiente para trece
estudios.

### 3. Ordenamiento estable y explícito

Los modos serán relevancia, fecha de corte descendente y título ascendente. La
relevancia solo estará disponible con consulta textual y se calculará mediante
coincidencias deterministas, priorizando título sobre resumen y metadatos. Los
empates usarán título e identificador para evitar saltos.

### 4. Controles y chips representan el mismo estado

Los selects seguirán siendo controles eficientes para conjuntos cerrados. Cada
criterio activo se reflejará como chip removible y una acción `Limpiar filtros`
restablecerá el estado completo. El conteo y el estado vacío se anunciarán de
forma no intrusiva.

Se descarta sustituir todos los selects por una nube permanente de chips porque
incrementaría densidad y haría menos escalable el catálogo.

### 5. Tarjeta completa accionable

Cada resultado tendrá un único destino principal que hará accionable toda la
superficie con semántica de enlace válida. Metadatos, título y resumen
permanecerán seleccionables y legibles, y no se añadirán controles anidados.

### 6. Progressive enhancement explícito

El HTML inicial contendrá los trece resultados. Sin JavaScript, los controles
interactivos avanzados no ocultarán contenido ni producirán un estado parcial.
Una URL con parámetros seguirá mostrando el corpus completo y navegable; la
aplicación de esos parámetros será una mejora del cliente.

## Risks / Trade-offs

- **[URL ruidosa]** muchos filtros pueden crear consultas largas → omitir valores
  por defecto y serializar solo criterios activos.
- **[Historial excesivo al escribir]** cada tecla podría crear una entrada →
  reemplazar durante búsqueda y reservar `pushState` para cambios confirmados.
- **[Relevancia opaca]** un ranking complejo sería difícil de explicar →
  usar reglas simples, estables y cubiertas por pruebas.
- **[Doble implementación de tarjetas]** Astro y Preact pueden divergir →
  compartir el modelo visual o consolidar el renderizado dentro de una única
  superficie hidratada.
- **[Estado vacío inaccesible]** una actualización rápida puede pasar
  desapercibida → anunciar conteo y mensaje mediante una región live moderada.

## Migration Plan

1. Extraer el modelo de estado, normalización, filtrado y ordenamiento a
   utilidades probables.
2. Migrar `CatalogFilter` para leer y escribir el estado canónico.
3. Incorporar chips, limpieza, ordenamiento y estado vacío.
4. Unificar la superficie accionable de resultados.
5. Cubrir URL, historial, teclado, no-JS y accesibilidad.

El rollback elimina los parámetros y controles nuevos; el listado estático
original permanece disponible durante toda la migración.

## Open Questions

Ninguna. El contrato de parámetros queda limitado a los seis campos definidos
en este diseño.
