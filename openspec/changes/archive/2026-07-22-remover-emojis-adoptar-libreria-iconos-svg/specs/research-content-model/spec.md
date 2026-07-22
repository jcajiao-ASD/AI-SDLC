## ADDED Requirements

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
