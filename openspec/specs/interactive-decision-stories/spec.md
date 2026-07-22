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
