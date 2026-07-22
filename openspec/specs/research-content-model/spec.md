# Purpose

TBD.

## Requirements

### Requirement: Markdown como fuente canónica
El sistema SHALL leer el contenido del observatorio directamente desde
`research/*.md` y MUST NOT requerir una copia manual de conclusiones,
puntuaciones o datasets en otro formato para construir el sitio.

#### Scenario: Actualización de un estudio
- **WHEN** se modifica un estudio válido y se reconstruye el sitio
- **THEN** el contenido publicado SHALL reflejar el cambio sin editar una segunda fuente

### Requirement: Metadatos editoriales explícitos
Cada estudio SHALL declarar frontmatter válido con identificador, título, slug,
resumen, categoría, estado, fecha de corte, información de vigencia, nivel de
evidencia y rol en el observatorio.

#### Scenario: Estudio con metadatos incompletos
- **WHEN** un estudio omite un campo obligatorio o usa un valor fuera del catálogo
- **THEN** la validación SHALL fallar e identificar el archivo y campo incorrectos

#### Scenario: Slug duplicado
- **WHEN** dos estudios declaran el mismo slug
- **THEN** la construcción SHALL fallar antes de generar rutas ambiguas

### Requirement: Relaciones editoriales con múltiples historias
El frontmatter SHALL permitir conservar una historia principal y declarar una
lista opcional de historias relacionadas mediante slugs válidos y únicos.

#### Scenario: Estudio con historia transversal
- **WHEN** un estudio alimenta su historia especializada y el configurador integrado
- **THEN** el modelo normalizado SHALL exponer ambas relaciones sin duplicarlas

#### Scenario: Historia relacionada inexistente
- **WHEN** el frontmatter declara una historia relacionada que no corresponde a una ruta registrada
- **THEN** la validación SHALL fallar e identificar el estudio y slug inválido

### Requirement: Datasets canónicos como tablas anotadas
Los datos usados por visualizaciones SHALL residir en tablas GFM delimitadas por
anotaciones explícitas que declaren al menos identificador, esquema y unidad. La
tabla anotada SHALL ser simultáneamente la fuente de la gráfica y su fallback
tabular.

#### Scenario: Dataset válido
- **WHEN** una tabla anotada cumple las columnas y tipos de su esquema
- **THEN** el pipeline SHALL producir un dataset normalizado para las páginas y visualizaciones

#### Scenario: Dataset incompatible con su esquema
- **WHEN** una tabla anotada contiene columnas ausentes, valores inválidos o unidad incompatible
- **THEN** la construcción SHALL fallar con un diagnóstico localizado

### Requirement: Reglas de recomendación con claves estables
Los datasets usados por selectores deterministas SHALL declarar una clave
estable para cada contexto y candidatos explícitos mediante la sintaxis
`rol:clave`. Las listas SHALL usar un delimitador declarado y validado, y cada
rol SHALL pertenecer al catálogo `primary`, `co-primary`, `alternative`,
`pilot` o `none`.

#### Scenario: Regla con candidato inexistente
- **WHEN** una regla referencia una clave de agente, modelo o framework no declarada por los datasets aplicables
- **THEN** la validación SHALL fallar e identificar el dataset, fila y clave incorrecta

#### Scenario: Rol de candidato inválido
- **WHEN** una regla usa un rol desconocido o una entrada sin la forma `rol:clave`
- **THEN** la validación SHALL fallar antes de construir la historia

#### Scenario: Regla sin candidato principal
- **WHEN** una regla no contiene `primary`, `co-primary`, `pilot` ni `none`
- **THEN** la validación SHALL fallar en lugar de promover una alternativa implícitamente

### Requirement: Matrices canónicas de compatibilidad
La compatibilidad agente-modelo y agente-framework SHALL residir en tablas GFM
anotadas con identificadores únicos, claves de ambos componentes, estado,
mecanismo, nota, fuente y fecha de verificación.

#### Scenario: Estado fuera del catálogo
- **WHEN** una fila de compatibilidad usa un estado distinto de `nativa`, `condicionada`, `incompatible` o `no-confirmada`
- **THEN** la validación SHALL fallar con un diagnóstico localizado

#### Scenario: Relación duplicada
- **WHEN** una matriz declara más de una fila para la misma pareja de claves
- **THEN** la construcción SHALL fallar antes de resolver recomendaciones ambiguas

#### Scenario: Relación sin procedencia
- **WHEN** una fila omite su fuente o fecha de verificación
- **THEN** el dataset SHALL considerarse inválido

### Requirement: Extracción estricta sin heurísticas
El sistema MUST NOT inferir estado, fechas, confianza o datasets desde prosa,
blockquotes o tablas no anotadas. La ausencia de información requerida SHALL
producir un error explícito.

#### Scenario: Fecha solo presente en prosa
- **WHEN** un estudio menciona su fecha de corte en el cuerpo pero no en el frontmatter
- **THEN** el estudio SHALL considerarse inválido para la construcción

### Requirement: Legibilidad del Markdown fuente
Las anotaciones y metadatos SHALL preservar la lectura y revisión útil de cada
estudio en renderizadores Markdown convencionales.

#### Scenario: Revisión desde GitHub
- **WHEN** un revisor abre un estudio directamente en GitHub
- **THEN** SHALL poder leer su prosa y tablas sin depender del frontend

### Requirement: Integridad de datasets y consumidores
Cada dataset SHALL tener un identificador único y el pipeline SHALL detectar
referencias inexistentes, duplicadas o declaradas para una historia sin
consumidor válido.

#### Scenario: Historia con dataset inexistente
- **WHEN** una historia referencia un identificador que no existe en sus estudios fuente
- **THEN** la construcción SHALL fallar e identificar la referencia rota

### Requirement: Catálogo completo del corpus
Todos los estudios existentes SHALL cumplir el contrato editorial y formar parte
del modelo normalizado.

#### Scenario: Estudio no migrado
- **WHEN** un archivo Markdown de investigación no cumple el contrato editorial
- **THEN** la construcción del catálogo SHALL fallar en lugar de omitirlo silenciosamente

### Requirement: Semántica textual sin emojis pictográficos
El corpus publicable SHALL expresar estados, disponibilidad, advertencias y
posiciones de ranking mediante texto explícito y MUST NOT depender de emojis
pictográficos para comunicar significado. La validación editorial SHALL
rechazar cualquier estudio que introduzca caracteres con presentación emoji o
secuencias que fuercen esa presentación, sin prohibir símbolos técnicos o
matemáticos necesarios para el contenido.

#### Scenario: Revisión de una tabla desde GitHub
- **WHEN** un revisor abre directamente una investigación con estados o posiciones de ranking
- **THEN** las celdas SHALL mostrar términos u ordinales comprensibles sin depender del frontend ni de la representación de emojis

#### Scenario: Emoji pictográfico en una investigación
- **WHEN** un archivo de `research/*.md` contiene un carácter con presentación emoji o una secuencia emoji forzada
- **THEN** la validación SHALL fallar e identificar el archivo y el contenido problemático

#### Scenario: Símbolo técnico legítimo
- **WHEN** una investigación usa símbolos como `→`, `≤`, `×`, `≈` o `Σ` como parte de una explicación técnica
- **THEN** la validación SHALL aceptar el contenido
