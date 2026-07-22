## Context

`SiteHeader.astro` contiene hoy una marca y tres enlaces planos. Las historias de
decisión y el configurador no aparecen en la navegación primaria, no existe
estado activo ni breadcrumb compartido y el breakpoint móvil apila marca y
enlaces en dos líneas. El observatorio se publica como HTML estático bajo un
subpath de GitHub Pages y debe conservar navegación útil sin JavaScript.

Este cambio consume los fundamentos visuales ya archivados: Atkinson
Hyperlegible Next para interfaz, JetBrains Mono para etiquetas técnicas, Tinta
Costera y estados de interacción compartidos.

## Goals / Non-Goals

**Goals:**

- Organizar las rutas por el trabajo que el lector intenta realizar.
- Hacer visible la ubicación actual en navegación primaria y breadcrumbs.
- Crear una cabecera móvil compacta y operable por teclado.
- Mantener una única definición canónica de destinos y etiquetas.
- Preservar rutas con base path, HTML estático y WCAG 2.2 AA.

**Non-Goals:**

- Implementar búsqueda o filtros dentro de la cabecera.
- Rediseñar el catálogo, el lector o las historias.
- Cambiar slugs, contenido de investigación o reglas de recomendación.
- Mantener `Sistema de diseño` como tarea primaria del lector.

## Decisions

### 1. Manifiesto único de navegación

La navegación se definirá como datos tipados con dos grupos:

```text
Decidir                     Explorar
Modelo  Agente  Framework   Investigaciones
Stack                       Metodología
```

El header, el menú móvil, el estado activo y los accesos secundarios consumirán
el mismo manifiesto. Las rutas dinámicas de investigaciones heredarán la
actividad de `Investigaciones`; las historias heredarán su destino específico.

Se descarta mantener enlaces escritos por separado en cada variante porque
facilita divergencias de etiqueta, orden y base path.

### 2. Breadcrumbs propiedad del layout

`BaseLayout` renderizará un componente compartido y cada página suministrará una
lista de segmentos semánticos. El último segmento representará la página actual
y no será un enlace.

El lector y otras vistas consumirán este contrato; no construirán una segunda
gramática de breadcrumbs. Todos los destinos pasarán por `withBase`.

### 3. Menú móvil con semántica nativa

La cabecera móvil conservará marca, acción etiquetada para abrir el menú, acceso
a `Decidir` y enlace a buscar investigaciones. El panel podrá apoyarse en
semántica nativa que siga siendo operable sin hidratación; si se añade script,
solo gestionará mejoras como cierre tras navegación o restauración de foco.

El panel no será un mega-menú reducido. Presentará primero las cuatro decisiones
y después las rutas de exploración.

### 4. Firma visual: ruta de decisión

En escritorio, `Decidir` se presentará como una ruta breve y ordenada que
conecta Modelo, Agente, Framework y Stack mediante alineación y una regla
direccional discreta. Es el único gesto visual distintivo; el resto de la
cabecera será sobrio para no competir con el contenido.

La revisión contra el brief descartó tarjetas o botones redondeados para cada
destino porque repetirían una solución genérica y contradirían la intención de
reducir superficies equivalentes.

### 5. Estado activo no dependiente del color

El destino activo combinará `aria-current`, peso o regla visible y color
semántico. Breadcrumbs y menú mantendrán foco visible, orden de tabulación
predecible y áreas táctiles adecuadas.

### 6. Sistema de diseño como recurso secundario

El enlace se retirará de navegación primaria y se mantendrá en el footer junto a
recursos internos. No cambia su ruta ni su disponibilidad.

## Risks / Trade-offs

- **[Demasiados destinos en escritorio]** la nueva IA puede aumentar densidad →
  usar agrupación jerárquica y evitar que todos los enlaces tengan el mismo peso.
- **[Coincidencia activa incorrecta]** rutas dinámicas o subpaths pueden activar
  destinos erróneos → centralizar normalización y cubrir coincidencias exactas y
  por prefijo con pruebas.
- **[Menú móvil sin JavaScript limitado]** algunas transiciones o cierres
  automáticos no estarán disponibles → priorizar operabilidad nativa sobre
  animación.
- **[Breadcrumbs duplicados]** páginas futuras podrían renderizarlos localmente →
  documentar al layout como único propietario y migrar todas las rutas actuales
  en este cambio.
- **[Cabecera sticky oculta anclas]** el nuevo alto puede tapar destinos internos
  → compartir un offset de scroll y probar navegación por hash.

## Migration Plan

1. Crear el manifiesto y las utilidades de coincidencia de ruta.
2. Migrar header y footer a la nueva arquitectura.
3. Incorporar breadcrumbs al layout y suministrar trails desde cada página.
4. Implementar la variante móvil y sus estados de foco.
5. Actualizar pruebas y retirar los enlaces primarios obsoletos.

El rollback consiste en restaurar el header plano y retirar el slot de
breadcrumbs; no existe migración de datos ni cambio de URL.

## Open Questions

Ninguna decisión funcional bloquea la implementación. La forma nativa concreta
del menú deberá elegirse durante `apply` según el soporte de foco y lectura en
los navegadores cubiertos por Playwright.
