# Purpose

TBD.

## Requirements

### Requirement: Tres historias insignia
El observatorio SHALL conservar historias para elegir un LLM por fase del SDLC,
elegir un agente según el perfil del equipo y elegir un framework agéntico
según adopción, control y calidad, y SHALL añadir una vista transversal que
componga esas tres decisiones como un stack compatible.

#### Scenario: Acceso a las historias y la vista transversal
- **WHEN** un usuario abre la portada o el catálogo
- **THEN** SHALL encontrar enlaces diferenciados hacia las tres historias y hacia el configurador integrado

### Requirement: Progresión narrativa de decisión
Cada historia SHALL presentar, en este orden conceptual, pregunta, conclusión
ejecutiva, comparación, tradeoffs, recomendación contextual y evidencia.

#### Scenario: Comprensión sin interacción
- **WHEN** un usuario abre una historia
- **THEN** SHALL ver la conclusión principal, su contexto y al menos un caveat antes de usar controles interactivos

### Requirement: Visualizaciones derivadas del contenido
Cada gráfica SHALL consumir exclusivamente datasets normalizados provenientes de
tablas Markdown anotadas y SHALL declarar unidad, fuente, fecha de corte y
confianza aplicable.

#### Scenario: Ranking ponderado
- **WHEN** una historia representa una scorecard de 0 a 100
- **THEN** SHALL identificarla como modelo de decisión y no como porcentaje medido de rendimiento

### Requirement: Fallback accesible para cada gráfica
Cada visualización SHALL conservar una tabla asociada con todos los valores
necesarios para comprenderla sin JavaScript, color o interacción de puntero.

#### Scenario: Gráfica no hidratada
- **WHEN** el script de una visualización no se ejecuta
- **THEN** el usuario SHALL poder consultar los mismos datos y etiquetas en su tabla asociada

### Requirement: Recomendaciones deterministas
Los selectores de perfil o contexto SHALL aplicar reglas explícitas derivadas de
las conclusiones de los estudios y MUST NOT generar recomendaciones mediante un
modelo de lenguaje.

#### Scenario: Selección de ecosistema GitHub
- **WHEN** el usuario indica que GitHub es el centro de su SDLC
- **THEN** la historia de agentes SHALL mostrar la recomendación condicionada y sus contrapartidas definidas por el estudio

### Requirement: Límites de comparabilidad
Las historias MUST NOT fusionar en una misma escala datos con diferente
benchmark, harness, metodología, fecha o unidad sin una transformación
documentada y válida.

#### Scenario: Benchmarks incompatibles
- **WHEN** dos resultados provienen de harnesses o versiones de benchmark diferentes
- **THEN** SHALL mostrarse separados y con una explicación de por qué no constituyen una comparación directa

### Requirement: Composiciones visuales del MVP
Las historias SHALL soportar rankings, matrices de tradeoffs, mapas por fase del
SDLC y curvas de sensibilidad cuando el estudio fuente contenga un dataset
compatible.

#### Scenario: Curva de sensibilidad
- **WHEN** una historia permite variar el peso de adopción frente a calidad
- **THEN** SHALL mostrar los cruces derivados del dataset y mantener visibles las ponderaciones activas

### Requirement: Enlace bidireccional con los estudios
Cada historia y la vista integrada SHALL enlazar sus conclusiones y datasets con
los estudios fuente, y cada estudio insignia SHALL poder enlazar su historia
principal y otras historias relacionadas que lo interpreten.

#### Scenario: Auditoría de una recomendación
- **WHEN** un usuario solicita revisar el origen de una recomendación
- **THEN** SHALL acceder al estudio, sección o dataset que la sustenta

#### Scenario: Auditoría de una recomendación integrada
- **WHEN** un usuario solicita revisar el origen de una capa o estado de compatibilidad
- **THEN** SHALL acceder al estudio, sección, dataset o referencia que la sustenta

### Requirement: Jerarquía semántica de visualizaciones
Cada visualización SHALL diferenciar conjunto, selección y líder mediante roles
visuales compartidos. La selección SHALL usar el rol teal y el líder el rol
índigo cuando existan, y cada estado SHALL incluir una etiqueta, forma, patrón o
tratamiento adicional que no dependa únicamente del color.

#### Scenario: Líder documentado
- **WHEN** un dataset comparable declara un líder o permite derivarlo mediante una regla documentada
- **THEN** la visualización SHALL identificarlo visual y textualmente sin convertirlo en un porcentaje de rendimiento

#### Scenario: Serie sin líder
- **WHEN** el dataset no declara una recomendación ni una regla comparable
- **THEN** la visualización MUST NOT inferir que el valor máximo constituye un líder

#### Scenario: Selección de usuario
- **WHEN** un usuario selecciona un dato
- **THEN** la visualización SHALL distinguirlo del conjunto y SHALL comunicar que la selección es exploratoria, no una nueva recomendación

### Requirement: Contexto visible de cada gráfica
Cada gráfica SHALL presentar título, descripción, unidad, fecha de corte, fuente,
confianza y caveat aplicables a partir del dataset o estudio normalizado. MUST
NOT extraer ni inferir esos metadatos desde prosa no estructurada.

#### Scenario: Scorecard ordinal
- **WHEN** una gráfica representa una scorecard de decisión
- **THEN** SHALL mostrar su unidad, corte y caveat ordinal junto a la figura

#### Scenario: Metadato ausente
- **WHEN** falta un metadato obligatorio para interpretar la gráfica
- **THEN** la construcción o el renderizado SHALL producir un diagnóstico explícito y MUST NOT inventar el valor

### Requirement: Estados de visualización verificables
Las visualizaciones hidratadas SHALL definir estados de carga, vacío y error. En
todos ellos, la tabla asociada SHALL permanecer disponible y una gráfica parcial
MUST NOT presentarse como resultado válido.

#### Scenario: Carga de la gráfica
- **WHEN** el componente todavía no ha completado su renderizado
- **THEN** SHALL mostrar un estado textual de carga y conservar acceso a los datos tabulares

#### Scenario: Dataset vacío
- **WHEN** el dataset no contiene filas representables
- **THEN** SHALL mostrar un estado de datos no disponibles y MUST NOT renderizar ejes o marcas engañosas

#### Scenario: Error de renderizado
- **WHEN** la librería gráfica no puede construir la figura
- **THEN** SHALL mostrar un error localizado, conservar la tabla y MUST NOT silenciar el fallo

### Requirement: Coordinación accesible entre gráfica y tabla
Una gráfica y su tabla asociada SHALL compartir claves estables para cada dato.
La selección o foco de una representación SHALL reflejarse en la otra cuando
JavaScript esté disponible, y la interacción SHALL ser operable mediante
teclado.

#### Scenario: Selección desde una marca
- **WHEN** un usuario activa una marca mediante teclado o puntero
- **THEN** la fila correspondiente SHALL comunicar el mismo estado seleccionado y el detalle SHALL identificar el dato

#### Scenario: Selección desde una fila
- **WHEN** un usuario activa una fila asociada
- **THEN** la marca correspondiente SHALL adoptar el estado seleccionado sin alterar valores u ordenamientos

#### Scenario: Clave duplicada
- **WHEN** dos filas de un dataset declaran la misma clave de coordinación
- **THEN** la validación SHALL fallar antes de presentar una relación ambigua

### Requirement: Equivalencia canónica de gráfica y tabla
Cada visualización SHALL representar exclusivamente valores provenientes de su
dataset normalizado y SHALL mantener una tabla con los mismos datos necesarios
para comprenderla sin JavaScript, color o interacción. MUST NOT añadir rankings,
comparaciones o transformaciones no documentadas.

#### Scenario: JavaScript deshabilitado
- **WHEN** una historia se abre sin JavaScript
- **THEN** la tabla SHALL conservar valores, etiquetas, unidad, fuente y corte necesarios para comprender la visualización

#### Scenario: Comparabilidad incompatible
- **WHEN** los datos pertenecen a unidades, harnesses o fechas no comparables
- **THEN** la visualización SHALL mantenerlos separados y MUST NOT coordinarlos como una única escala

### Requirement: Visualizaciones responsive y con movimiento controlado
Las visualizaciones SHALL conservar etiquetas y valores completos en móvil sin
provocar desplazamiento horizontal de la página. Las transiciones SHALL respetar
`prefers-reduced-motion` y MUST NOT ser necesarias para comprender el estado.

#### Scenario: Etiqueta extensa en móvil
- **WHEN** una etiqueta excede el espacio asignado
- **THEN** SHALL adaptarse mediante wrapping o composición alternativa sin truncar el significado

#### Scenario: Movimiento reducido
- **WHEN** el dispositivo indica `prefers-reduced-motion`
- **THEN** carga y selección SHALL mostrar su estado final sin animaciones no esenciales
