## Context

El sistema actual concentra todos los roles tipográficos en JetBrains Mono y
reutiliza una gramática de tarjetas, bordes redondeados y elevación para
contenido estático, controles y resultados. La paleta Tinta Costera ya está
validada para la identidad y debe conservarse, pero algunos roles semánticos y
colores auxiliares todavía se resuelven directamente en componentes.

El cambio es transversal: afecta tokens globales, estilos base, componentes
editoriales, carga de fuentes, documentación visual y pruebas. Debe preservar
la generación estática, los fallbacks sin JavaScript, la accesibilidad WCAG 2.2
AA y la ausencia de solicitudes a proveedores externos.

## Goals / Non-Goals

**Goals:**

- Separar tipografía de lectura e interfaz de la tipografía destinada a datos y
  metadatos.
- Convertir la paleta existente en una capa de valores primitivos y otra de
  roles semánticos consumibles por componentes.
- Hacer inequívoca la diferencia entre una superficie estática, una interactiva,
  una seleccionada y una que comunica estado.
- Reducir ruido visual mediante reglas compartidas para radios, bordes, sombras
  y movimiento.
- Mantener los fundamentos documentados y verificables en la página del sistema
  de diseño y en pruebas automatizadas.

**Non-Goals:**

- Cambiar la arquitectura de navegación, breadcrumbs o cabecera móvil.
- Añadir búsqueda, ordenamiento o nuevos filtros al catálogo.
- Rediseñar tablas, gráficas o el flujo del configurador.
- Alterar rutas, datasets, reglas de recomendación o contenido de
  `research/`.
- Introducir temas oscuro/claro o permitir personalización de marca.

## Decisions

### 1. Sistema tipográfico de dos familias

Atkinson Hyperlegible Next será la familia de interfaz y lectura; JetBrains Mono
se reservará para datos, cifras, comandos, metadatos y etiquetas técnicas.
Ambas se servirán localmente mediante assets empaquetados durante la
construcción.

Los tokens serán funcionales (`--font-ui`, `--font-body`, `--font-data`) y no
dependerán del nombre de la familia. `--font-ui` y `--font-body` apuntarán
inicialmente a Atkinson Hyperlegible Next; `--font-data` apuntará a JetBrains
Mono. No se añadirá una tercera familia de display para evitar coste, latencia y
una identidad innecesariamente fragmentada.

**Alternativas consideradas:**

- Mantener JetBrains Mono en toda la interfaz: conserva identidad, pero mantiene
  el problema de densidad y lectura continua.
- Usar una serif para prosa: aporta carácter editorial, pero introduce una
  tercera voz antes de resolver la jerarquía fundamental.

### 2. Tokens primitivos separados de roles semánticos

Los cinco valores Tinta Costera permanecerán como primitivos
`--color-coast-*`. Los componentes consumirán tokens semánticos para texto,
acción, foco, superficie, selección, información, éxito y advertencia. Los
colores auxiliares necesarios para advertencias se declararán en tokens y no
directamente dentro de componentes.

Esta separación permite cambiar contraste o función sin reescribir cada
componente y protege la identidad aprobada.

### 3. Jerarquía explícita de superficies

El sistema distinguirá al menos:

- superficie base de página;
- panel estático;
- superficie elevada;
- superficie interactiva;
- superficie seleccionada;
- superficies informativa, positiva y de advertencia.

Los bordes y sombras no se aplicarán automáticamente a todo contenedor. Una
superficie estática no tendrá respuesta `hover`; una superficie interactiva
deberá disponer de destino o control semántico, foco visible y estado activo.

### 4. Estados de interacción definidos por contrato

Enlaces, botones, selects y superficies accionables compartirán estados
`default`, `hover`, `focus-visible`, `active` y `disabled` cuando apliquen. El
foco tendrá prioridad sobre el hover y los estados no dependerán únicamente del
color. Las transiciones se limitarán a propiedades de énfasis y respetarán
`prefers-reduced-motion`.

### 5. Migración desde los fundamentos hacia los componentes

La implementación avanzará desde tokens y estilos globales hacia componentes
compartidos y, por último, hacia la página del sistema de diseño. No se
rediseñarán páginas individualmente; solo se corregirán excepciones necesarias
para que consuman el contrato compartido.

Las pruebas existentes de paleta, fuentes, accesibilidad y desbordamiento se
adaptarán al nuevo contrato en lugar de eliminarse.

## Risks / Trade-offs

- **[Cambio de métricas tipográficas]** títulos, tarjetas y controles pueden
  cambiar de altura o wrapping → revisar las rutas representativas en escritorio
  y móvil y mantener una escala fluida.
- **[Pérdida de identidad técnica]** reducir el uso de JetBrains Mono puede hacer
  el sitio más genérico → conservarla en todos los datos, metadatos, badges y
  etiquetas que expresan la naturaleza investigativa del producto.
- **[Migración incompleta]** colores o fuentes hardcoded pueden dejar
  componentes fuera del sistema → buscar declaraciones directas y cubrir los
  componentes compartidos con pruebas.
- **[Estados visualmente ambiguos]** reducir sombras y bordes puede ocultar
  interactividad → exigir semántica, foco, texto de acción y estados
  documentados para toda superficie accionable.
- **[Nueva dependencia de fuente]** el paquete puede aumentar el tamaño del
  build → importar únicamente variantes y pesos utilizados y comprobar que
  todos los assets se sirven desde el mismo origen.

## Migration Plan

1. Incorporar la fuente local y crear los nuevos tokens tipográficos,
   cromáticos y de superficie conservando temporalmente aliases compatibles.
2. Migrar estilos globales y componentes compartidos a tokens funcionales.
3. Eliminar hover y elevación de superficies no accionables y aplicar variantes
   explícitas donde corresponda.
4. Actualizar la página del sistema de diseño y las pruebas automatizadas.
5. Retirar aliases obsoletos cuando ninguna superficie los consuma.

El rollback consiste en revertir la dependencia de fuente, los tokens y los
consumidores en el mismo cambio; no existe migración de datos ni modificación
de contenido.

## Open Questions

Ninguna decisión funcional bloquea la implementación. Durante `apply` deberá
confirmarse el nombre y versión vigente del paquete local de Atkinson
Hyperlegible Next antes de modificar dependencias.
