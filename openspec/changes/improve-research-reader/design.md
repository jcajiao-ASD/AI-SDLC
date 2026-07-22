## Context

La ruta dinámica de investigaciones renderiza el Markdown como una única cadena
HTML dentro de `.prose`. Los encabezados ya reciben slugs, pero el pipeline no
expone una estructura de secciones a la página. `EvidencePanel` aparece solo en
el hero y desaparece del contexto al avanzar por documentos largos.

La dirección `Cartografía de evidencia` propone conectar pregunta,
recomendación, condición, evidencia y fuente sin reducir el contenido canónico.
Este cambio depende del contrato de breadcrumbs de `improve-site-navigation`,
pero no redefine la navegación global.

## Goals / Non-Goals

**Goals:**

- Derivar orientación desde los encabezados reales del Markdown.
- Mantener visibles índice, contenido y evidencia en escritorio.
- Adaptar esa estructura a móvil sin perder la conclusión ni las fuentes.
- Añadir sección activa y progreso como mejoras accesibles.
- Conservar anclas, contenido y evidencia sin JavaScript.

**Non-Goals:**

- Reescribir o resumir automáticamente investigaciones.
- Cambiar el comportamiento responsive de tablas.
- Rediseñar visualizaciones o historias de decisión.
- Crear una segunda arquitectura de breadcrumbs.

## Decisions

### 1. El pipeline devolverá HTML y outline

`renderStudy` o una API adyacente producirá el HTML y una lista ordenada de
encabezados con nivel, texto e identificador. El outline se derivará durante la
misma transformación que asigna slugs para evitar consultar o reescribir el DOM
después de hidratar.

Se incluirán las secciones que aporten navegación real; el título de página no
se duplicará en el índice.

### 2. Composición editorial de tres zonas

En escritorio el lector usará:

```text
┌──────────────┬────────────────────────────┬──────────────────┐
│ Índice vivo  │ Investigación              │ Evidencia        │
│ secciones    │ prosa, tablas, gráficas    │ corte, confianza │
│ y progreso   │ y referencias              │ caveats, fuente  │
└──────────────┴────────────────────────────┴──────────────────┘
```

Índice y evidencia podrán permanecer sticky dentro de sus límites; el contenido
mantendrá una medida de lectura estable. Esta estructura, y no una nueva familia
tipográfica o una colección de tarjetas, será la firma del lector.

### 3. TOC estático, scroll-spy progresivo

La tabla de contenido se renderizará en HTML con enlaces de ancla. Un script
pequeño observará encabezados para aplicar `aria-current` a la sección activa y
actualizar una variable de progreso.

Sin JavaScript, el índice seguirá siendo una lista funcional. El progreso
dinámico no se mostrará como dato exacto si no puede calcularse.

### 4. Progreso con significado textual

El indicador combinará una regla visual con una etiqueta accesible de avance.
No anunciará cada cambio de scroll; actualizará el nombre o valor accesible sin
crear ruido en lectores de pantalla. Las transiciones respetarán
`prefers-reduced-motion`.

### 5. Evidencia persistente sin duplicar verdad

El rail reutilizará `EvidencePanel` y metadatos canónicos. Podrá enlazar a
secciones de referencias o metodología, pero no mantendrá una copia manual de
conclusiones o fuentes.

### 6. Móvil mediante paneles nativos

Índice y evidencia pasarán a paneles desplegables cercanos al encabezado. La
conclusión y el inicio del contenido permanecerán antes que controles
secundarios. Los paneles usarán semántica operable sin JavaScript.

### 7. Anclas y cabecera sticky coordinadas

Los encabezados compartirán un offset de scroll con la navegación global. Los
hashes se mantendrán intactos bajo el base path y el foco programático solo se
usará cuando mejore una navegación explícita, no durante scroll pasivo.

## Risks / Trade-offs

- **[Outline demasiado largo]** documentos con muchos niveles pueden saturar el
  rail → limitar profundidad visual sin eliminar enlaces significativos.
- **[Scroll-spy inestable]** encabezados cortos o tablas altas pueden alternar la
  sección activa → usar una línea de activación estable y desempate por orden.
- **[Tres columnas estrechas]** el contenido puede perder medida útil → colapsar
  evidencia antes de reducir la columna editorial por debajo del mínimo.
- **[Información duplicada]** hero y rail pueden repetir metadatos → compartir el
  componente y variar densidad, no contenido.
- **[Dependencia de navegación]** breadcrumbs no existirán si se aplica fuera de
  orden → implementar `improve-site-navigation` antes o incluir un adaptador
  temporal que no duplique el contrato.

## Migration Plan

1. Exponer outline y slugs estables desde el pipeline.
2. Renderizar TOC estático y nueva composición del lector.
3. Integrar evidencia y breadcrumbs.
4. Añadir scroll-spy y progreso como scripts progresivos.
5. Incorporar paneles móviles y pruebas de anclas, no-JS y accesibilidad.

El rollback restaura el artículo de una columna; el HTML del estudio y sus slugs
permanecen sin cambios.

## Open Questions

Ninguna. La profundidad visual exacta del TOC se calibrará contra el documento
más largo sin excluir encabezados del HTML.
