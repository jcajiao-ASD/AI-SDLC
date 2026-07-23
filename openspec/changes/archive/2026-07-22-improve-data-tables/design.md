## Context

Las investigaciones renderizan tablas GFM como HTML dentro de `.prose`, mientras
las historias usan `DataTable.astro` para datasets normalizados. Ambas rutas
comparten estilos básicos, pero no un contrato de estructura o comportamiento.
Hoy solo existe una región con scroll horizontal; encabezados y contexto
desaparecen, móvil no dispone de una representación resumida y
`hiddenColumns` elimina valores antes de producir el HTML.

El inventario actual contiene 120 tablas Markdown: 96 tienen entre dos y cuatro
columnas y 24 tienen cinco o más. Las dos matrices más exigentes alcanzan nueve
columnas e incluyen identidad, estado, mecanismo, nota, fuente y fecha. La
solución debe concentrar la complejidad en esas tablas amplias sin convertir
cada tabla compacta en una interfaz de configuración.

El cambio pertenece a `editorial-design-system` porque define una primitiva
compartida, no una historia concreta. `improve-data-visualization` consumirá este
contrato posteriormente para coordinar gráfica y tabla.

La dirección visual trata cada tabla como un registro de evidencia para líderes
técnicos: su trabajo principal es mantener identidad, estado y procedencia
durante la comparación, no simular una hoja de cálculo editable.

## Goals / Non-Goals

**Goals:**

- Unificar el comportamiento de tablas Markdown y `DataTable`.
- Conservar contexto de encabezados y columna identificadora.
- Ofrecer control de columnas y una vista móvil derivada de los mismos datos.
- Mantener semántica tabular completa y fallback sin JavaScript.
- Evitar desbordamiento horizontal de la página.
- Diferenciar datos compactos de celdas narrativas sin abandonar el sistema
  tipográfico híbrido existente.
- Aplicar controles solo cuando aporten una mejora real.

**Non-Goals:**

- Cambiar valores, ordenamientos, rankings o datasets.
- Diseñar la jerarquía de colores de gráficas.
- Convertir toda tabla en una cuadrícula editable.
- Inferir resúmenes o conclusiones a partir de prosa.
- Introducir una taxonomía exhaustiva de tipos de columna que no cambie
  comportamiento ni presentación.

## Decisions

### 1. Contrato DOM común para ambas rutas

El pipeline de Markdown envolverá tablas en la misma estructura de región,
etiqueta accesible y atributos que emite `DataTable.astro`. El componente de
datasets seguirá renderizando en servidor y declarará metadatos opcionales.

Las mejoras de cliente operarán sobre ese contrato común y no sobre el origen de
los datos.

El contrato normalizado incluirá:

- `rowHeader`: columna que identifica cada fila y se renderiza mediante
  `<th scope="row">`.
- `essentialColumns`: columnas que el selector nunca puede ocultar.
- `initiallyHiddenColumns`: columnas disponibles que se ocultan solo después de
  activar la mejora de cliente.
- `summaryColumns`: columnas existentes autorizadas para el summary móvil.
- `contentKinds`: mapa mínimo `data | prose` que selecciona el rol tipográfico.

Todos los nombres de columna se validarán contra los encabezados reales. Una
columna no podrá ser simultáneamente esencial e inicialmente oculta.

### 2. Metadatos explícitos para Markdown y datasets

`DataTable.astro` recibirá el contrato tipado directamente. Las investigaciones
podrán declarar el mismo contrato mediante un comentario
`ai-sdlc-table` colocado inmediatamente antes de una tabla GFM. La directiva
solo contendrá referencias a encabezados existentes; no copiará celdas ni
valores.

Las tablas Markdown sin directiva seguirán recibiendo región, sticky header,
etiqueta accesible y fallback de scroll, pero no obtendrán columna sticky,
selector ni resumen móvil por inferencia.

Se descarta un registro lateral indexado por archivo y ordinal porque separaría
las decisiones editoriales de la tabla que describen. También se descarta
inferir identidad desde la primera columna: las tablas narrativas no garantizan
que esa posición represente una clave de fila.

### 3. La tabla completa permanece como representación canónica

Todos los encabezados y celdas se renderizarán en HTML. La selección de columnas
solo alternará visibilidad; no eliminará valores del documento ni generará un
dataset paralelo.

`hiddenColumns` se reemplazará por `initiallyHiddenColumns`. Cada uso actual se
clasificará antes de migrarlo porque `Candidatos` y `Configurable` son columnas
editoriales, no claves técnicas descartables. Sin JavaScript no se aplicará la
ocultación inicial y todos los valores seguirán disponibles.

### 4. Mejoras por niveles

El número de columnas determinará únicamente la densidad estructural que el
servidor puede conocer:

- tablas compactas de dos a cuatro columnas conservarán una presentación simple
  salvo que declaren comportamiento adicional;
- tablas de cinco o más columnas usarán región amplia, sticky header e
  indicación de desplazamiento;
- columna sticky, selector y resumen requerirán metadatos explícitos.

La existencia del resumen móvil se decidirá durante renderizado a partir de
estructura regular y metadatos. La medición del ancho en cliente solo decidirá si
es seguro activar la columna sticky; no cambiará el árbol renderizado.

### 5. Sticky context condicionado

El encabezado será sticky dentro del contenedor de tabla. La primera columna
solo será sticky cuando `rowHeader` exista y el ancho restante permita lectura
útil. La intersección entre encabezado y columna de fila formará un marco en L
persistente que hará visibles los dos ejes de consulta. Una regla teal y una
sombra breve comunicarán la superposición sin depender solo del color.

Se descarta fijar siempre la primera columna porque tablas narrativas o con
celdas muy largas podrían perder demasiado espacio.

### 6. Selector de columnas por encabezados existentes

Un control accesible listará los encabezados reales y permitirá ocultar columnas
opcionales. Las columnas esenciales declaradas por la tabla no podrán ocultarse
y se identificarán como siempre visibles. El control comunicará cuántas
columnas están activas y mantendrá disponibles las inicialmente ocultas. El
estado se asociará a la instancia de tabla, no se persistirá globalmente en esta
iteración.

La ocultación inicial se aplicará únicamente cuando el control haya sido
inicializado. La región acotada absorberá el cambio de anchura para evitar que
el resto de la página se desplace.

### 7. Resumen móvil derivado, no inferido

Para tablas aptas, cada fila podrá presentarse como un `details` cuyo summary use
`rowHeader` y las `summaryColumns` declaradas. El cuerpo listará todos los pares
encabezado-valor de la fila, incluidas las columnas esenciales. Todo texto,
enlace y cifra procederá de las celdas existentes; no se calcularán ganadores ni
se reformularán conclusiones.

La tabla semántica y la vista por filas se generarán en servidor. Solo la
representación apropiada al breakpoint quedará expuesta a tecnologías de
asistencia para evitar duplicación.

El selector controla columnas de la representación tabular; no elimina valores
del cuerpo expandido móvil. Así, una columna esencial puede estar fuera del
summary compacto pero siempre permanecerá disponible al abrir la fila.

### 8. Etiquetas accesibles estables

`DataTable.astro` conservará su caption explícito. Para Markdown se preservará
un `<caption>` autorado cuando exista. En su ausencia, la región se etiquetará
con el encabezado de sección más cercano y un ordinal real dentro de esa sección,
sin fabricar una descripción temática.

La directiva podrá proporcionar un caption visible cuando el autor necesite
distinguir tablas próximas bajo el mismo encabezado.

### 9. Fallback seguro para tablas no adaptables

Si faltan encabezados, identificador o estructura regular, la tabla conservará
scroll horizontal accesible y no intentará generar una vista resumida. El
contenedor indicará que puede desplazarse y permitirá foco sin atraparlo.

### 10. Sistema visual: marco de evidencia

La paleta no añadirá nuevos acentos:

| Rol | Token Tinta Costera | Valor |
| --- | --- | --- |
| Texto y eje principal | Índigo profundo | `#12233F` |
| Acciones | Índigo interactivo | `#243B77` |
| Regla, foco y superposición | Teal | `#2F7EA8` |
| Banda sticky | Aqua pálido | `#CBEAF2` |
| Fondo | Blanco costero | `#F7FBFF` |

```text
┌─────────────────────────────────────────────────────────┐
│ Compatibilidad agente-modelo          Columnas: 5 de 9 │
├──────────────┬────────────┬──────────┬───────────────────┤
│ AGENTE       │ COMPONENTE │ ESTADO   │ MECANISMO         │
├══════════════╪════════════╪══════════╪═══════════════════┤
│ Copilot CLI  │ GPT-5.6    │ nativa   │ Catálogo...       │
└──────────────┴────────────┴──────────┴───────────────────┘
```

El marco en L será la única firma expresiva. La vista móvil conservará filas
planas separadas por reglas; se descartan tarjetas redondeadas, pills
decorativas y animaciones ambientales porque diluyen el carácter de registro de
evidencia.

Atkinson se usará en controles, captions y celdas `prose`. JetBrains Mono se
reservará para encabezados de columna entendidos como etiquetas técnicas,
identificadores, métricas, estados y fechas marcados como `data`. Esta
clasificación aplica el requisito tipográfico existente en lugar de tratar toda
la tabla como contenido monoespaciado.

El movimiento se limitará a la apertura nativa de `details` y a transiciones
breves del selector. `prefers-reduced-motion` eliminará esas transiciones.

## Risks / Trade-offs

- **[Dos representaciones duplicadas]** tabla y resumen pueden repetirse para
  lectores de pantalla → exponer solo una por modo y probar el árbol accesible.
- **[Sticky oculta contenido]** columnas anchas pueden cubrir celdas → activar la
  primera columna únicamente bajo condiciones medidas.
- **[Markdown irregular]** tablas válidas para GFM pueden no tener semántica
  suficiente → degradar a scroll sin inventar metadatos.
- **[Directivas desactualizadas]** un encabezado puede cambiar sin actualizar su
  metadata → validar referencias durante la carga de contenido.
- **[Controles excesivos]** tablas pequeñas no necesitan selector → mostrarlo
  solo cuando existan columnas opcionales declaradas.
- **[Clonado de markup]** enlaces o formato inline podrían perderse en resumen →
  transformar el AST/HTML conservando nodos, no texto plano reconstruido.
- **[Cambio de densidad sin JavaScript]** las columnas antes eliminadas volverán
  a mostrarse → clasificar los ocho usos de `hiddenColumns` y asegurar scroll
  contenido antes de retirar la propiedad.
- **[Cambio de anchura al mejorar]** ocultar columnas después de inicializar el
  selector puede contraer la tabla → mantener dimensiones de región acotadas y
  probar estabilidad visual en las historias afectadas.

## Migration Plan

1. Definir y validar el contrato compartido y la directiva `ai-sdlc-table`.
2. Clasificar los ocho usos de `hiddenColumns` y migrarlos a metadata explícita.
3. Adaptar `DataTable.astro` y el pipeline Markdown sin retirar valores.
4. Implementar sticky header, marco en L y fallback desplazable.
5. Añadir selector de columnas y resumen móvil para tablas declaradas.
6. Cubrir ambas rutas con pruebas de datos, semántica, teclado y no-JS.

El rollback desactiva los controles y la vista resumida; la tabla completa
permanece en el HTML.

## Open Questions

La clasificación inicial se resolverá durante el inventario de `apply`, pero
cada esquema deberá partir de estas invariantes:

- compatibilidad: agente, componente y estado son esenciales;
- ranking: sujeto, puesto y puntuación son esenciales;
- recomendación: contexto, recomendación y motivo son esenciales;
- claves técnicas permanecen canónicas, pero pueden comenzar ocultas con
  JavaScript;
- cualquier excepción se declarará por tabla y no se inferirá desde valores.
