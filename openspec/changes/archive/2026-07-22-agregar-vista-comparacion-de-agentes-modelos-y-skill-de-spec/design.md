## Context

El observatorio Astro publica tres historias independientes alimentadas por siete
datasets anotados en Markdown. La historia de agentes ya usa reglas contextuales,
la de modelos ofrece un mapa por fase y la de frameworks ofrece recomendaciones
por escenario en prosa y tabla no anotada. No existe una capa que componga estas
decisiones ni datos normalizados que demuestren que un agente soporta el modelo y
el framework resultantes.

El frontend debe seguir siendo estático, accesible sin JavaScript y compatible con
GitHub Pages. Los estudios continúan como fuente de verdad; por tanto, las reglas
y matrices nuevas deben vivir en tablas GFM anotadas y no en objetos TypeScript
escritos manualmente. Las afirmaciones de compatibilidad son volátiles y deben
distinguir soporte nativo, integración condicionada, incompatibilidad y ausencia
de verificación.

## Goals / Non-Goals

**Goals:**

- Recomendar una configuración agente-modelo-framework a partir de tres entradas
  independientes y comprensibles.
- Preservar recomendaciones múltiples o condicionadas cuando el estudio no
  identifica un único ganador.
- Verificar las dos relaciones ejecutables relevantes: agente-modelo y
  agente-framework.
- Bloquear la presentación de un stack como final cuando una relación sea
  incompatible o no esté confirmada.
- Derivar reglas, estados, explicaciones y alternativas exclusivamente de
  datasets Markdown validados.
- Mantener la recomendación inicial, las tablas y la evidencia disponibles sin
  hidratación.

**Non-Goals:**

- Crear una puntuación global o ranking de stacks.
- Inferir compatibilidad desde nombres, prosa libre o coincidencias parciales.
- Garantizar compatibilidad entre el modelo y el framework de proceso, ya que el
  framework se instala sobre el agente y no selecciona directamente el LLM.
- Añadir personalización persistente, cuentas, telemetría o recomendaciones
  generadas por IA.
- Reinvestigar las conclusiones de selección fuera de las comprobaciones de
  compatibilidad necesarias para esta vista.

## Decisions

### 1. Vista transversal sobre las tres historias existentes

Se añadirá `/historias/configurador-stack/` como una composición transversal. La
portada la presentará como acceso principal para construir un stack y mantendrá
las tres historias actuales como explicaciones independientes de cada decisión.

No se reemplazarán las historias ni se tratará la nueva vista como un cuarto
ranking. Esta alternativa conserva sus metodologías y satisface el límite actual
que prohíbe fusionar escalas incompatibles.

### 2. Tres entradas independientes y una salida compuesta

La isla recibirá tres selecciones:

1. contexto del agente, que incluye ecosistema, sistema central o necesidad
   especial declarada por el estudio;
2. fase o carga principal del SDLC;
3. escenario operativo de la capa de especificación/proceso.

Cada selección resolverá una o varias claves de candidato desde su dataset. El
resultado mostrará las tres capas por separado, con motivo, caveat y enlace de
procedencia, y después calculará el estado global. Cuando una fuente conserve un
empate o varias alternativas equivalentes, la interfaz mostrará todas las
combinaciones verificadas y no inventará un desempate.

Los valores de los selectores serán escenarios canónicos completos, no ejes
normalizados inventados por la interfaz. Esto permite representar, por ejemplo,
un piloto cuando no existe ecosistema central o la ausencia de framework para un
hotfix, sin añadir heurísticas ocultas.

Se consideró un asistente secuencial tipo wizard. Se descarta porque las entradas
son independientes, caben en una sola superficie y deben poder revisarse juntas
antes de aceptar la recomendación.

### 3. Claves estables dentro de los datasets existentes

Los datasets de perfiles de agente, mapa SDLC y escenarios de framework
incorporarán columnas técnicas explícitas para la clave del contexto y las claves
de recomendación. Cada candidato usará la sintaxis validada `rol:clave`, con el
catálogo:

- `primary`: recomendación principal única;
- `co-primary`: recomendación principal equivalente;
- `alternative`: alternativa o variante económica, no stack predeterminado;
- `pilot`: candidato que requiere evaluación antes de decidir;
- `none`: ausencia deliberada de framework.

Solo `primary` y `co-primary` pueden formar una recomendación final automática.
`alternative` se mostrará como opción secundaria; `pilot` bloqueará el lenguaje
de recomendación final aunque la compatibilidad técnica sea conocida; `none`
representará válidamente un stack sin capa de framework. Las listas usarán un
delimitador declarado y validado, no extracción desde el texto visible.

La tabla de escenarios de framework se anotará como dataset canónico. Las páginas
existentes continuarán mostrando las columnas editoriales y podrán omitir las
columnas técnicas en su tabla HTML sin eliminar la tabla Markdown fuente. Cuando
una tabla técnica extensa afecte la lectura del estudio, se conservará dentro de
un bloque `details` explícito en el Markdown en lugar de crear un sidecar.

Se descartó mantener objetos de reglas dentro de componentes Preact porque
duplicaría conclusiones y permitiría que la interfaz divergiera de los estudios.

### 4. Matrices de compatibilidad en formato largo

Se incorporarán dos datasets:

- `agent-model-compatibility`;
- `agent-framework-compatibility`.

Cada fila declarará clave del agente, clave del componente, estado, mecanismo,
nota, fuente y fecha de verificación. El esquema `compatibility-matrix` validará
identificadores y el catálogo cerrado:

- `nativa`;
- `condicionada`;
- `incompatible`;
- `no-confirmada`.

El formato largo permite buscar alternativas compatibles sin añadir una columna
por cada modelo o framework. Las matrices se revalidarán contra documentación
oficial al implementar; toda relación sin evidencia suficiente se registrará
como `no-confirmada`, nunca como compatible por defecto.

### 5. Resolución tipada y conservadora

Una utilidad TypeScript pura transformará datasets normalizados en opciones y
evaluará el producto de candidatos:

- dos relaciones `nativa` producen un stack `verificado`;
- al menos una relación `condicionada`, sin conflictos, produce
  `verificado-condicionado` y muestra el requisito de BYOK, plugin o setup;
- una relación `incompatible` produce `incompatible`;
- una relación ausente o `no-confirmada` produce `no-confirmado`.

Solo los candidatos con rol principal y estados verificados se mostrarán como
recomendación final. Para estados bloqueados, la interfaz identificará la relación
conflictiva y enumerará agentes con soporte nativo o condicionado para el
componente, sin calificarlos como "mejor alternativa" si el estudio no lo
demuestra. Un resultado con rol `pilot` se presentará como decisión pendiente de
piloto, no como incompatibilidad.

### 6. Renderizado estático y mejora progresiva

Astro renderizará una configuración inicial basada en el perfil de referencia
documentado y todas las tablas de reglas y compatibilidad. Preact añadirá el
cambio interactivo de selecciones y un anuncio `aria-live` del resultado.

Sin JavaScript permanecerán visibles la configuración inicial, la explicación del
algoritmo, los estados de compatibilidad, las tablas y los enlaces a las tres
historias. No se materializarán todas las combinaciones posibles en HTML porque
son un producto cartesiano derivable y dificultarían la lectura.

Las tablas de fallback conservarán enlaces Markdown seguros en columnas de fuente
y mecanismo. El componente tabular preparará HTML inline desde Markdown confiable
del repositorio en vez de reducir todas las celdas a texto plano.

### 7. Relaciones editoriales múltiples sin romper el campo actual

El frontmatter conservará `featuredStory` como historia primaria y añadirá
`relatedStories` como lista opcional de rutas relacionadas. Los tres estudios
fuente enlazarán tanto su historia especializada como el configurador. La página
de estudio deduplicará ambos campos y mostrará enlaces diferenciados.

Se evita reemplazar inmediatamente `featuredStory` por un array para no introducir
una migración obligatoria en fuentes no afectadas.

### 8. Pruebas centradas en reglas y degradación

Las pruebas unitarias cubrirán parsing, roles, claves inexistentes, estados
cerrados, combinaciones múltiples y precedencia conservadora. Las pruebas de
componente cubrirán cada entrada, estados condicionados, bloqueados y de piloto,
además de la paridad entre el resultado SSR inicial y la primera hidratación.
Playwright verificará portada, navegación, teclado, accesibilidad, subpath,
contenido sin JavaScript y el caso donde ninguna combinación sea verificable.

## Risks / Trade-offs

- **La compatibilidad cambia con rapidez** → conservar fuente y fecha por fila,
  revalidar antes de publicar y degradar relaciones dudosas a `no-confirmada`.
- **Las matrices pueden contradecir tablas de catálogo existentes** → añadir
  comprobaciones de consistencia para modelos que aparezcan en ambos datasets.
- **Una fase puede recomendar varios modelos** → evaluar todas las claves y
  distinguir co-principales de alternativas y mostrar opciones verificadas sin
  desempate artificial.
- **Los estudios mezclan ecosistema, madurez y tipo de cambio** → usar cada fila
  fuente como escenario completo del selector, sin fingir una taxonomía más pura.
- **El producto de candidatos puede crecer** → limitar la salida a combinaciones
  verificadas y agrupar conflictos por relación, sin generar un ranking nuevo.
- **Las columnas técnicas degradan la tabla editorial** → usar identificadores
  legibles, documentarlos y ocultarlos solo en componentes HTML que conserven el
  fallback Markdown y los datos sustantivos.
- **Un resultado condicionado puede interpretarse como listo para usar** →
  mostrar el mecanismo requerido junto al estado y evitar el lenguaje de
  compatibilidad nativa.

## Migration Plan

1. Revalidar compatibilidad agente-modelo y agente-framework con fuentes
   oficiales y fechar cada afirmación.
2. Ampliar el contrato tipado, schemas y validaciones antes de anotar tablas.
3. Añadir claves estables y datasets nuevos a los tres estudios fuente.
4. Implementar y probar el resolver puro y después la isla Preact.
5. Crear la ruta integrada, navegación, enlaces editoriales múltiples y fallback
   estático.
6. Actualizar documentación, pruebas y specs; validar el cambio completo.

El rollback consiste en retirar la ruta y el acceso desde portada y revertir los
consumidores nuevos. Las tablas añadidas seguirían siendo legibles en Markdown y
no afectarían las historias existentes.

## Open Questions

- La evidencia exacta de algunas parejas agente-framework debe resolverse durante
  la revalidación. Si una fuente oficial no permite confirmarla, la fila quedará
  como `no-confirmada` y la combinación permanecerá bloqueada.
