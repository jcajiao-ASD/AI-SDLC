## MODIFIED Requirements

### Requirement: Tres historias insignia
El observatorio SHALL conservar historias para elegir un LLM por fase del SDLC,
elegir un agente según el perfil del equipo y elegir un framework agéntico según
adopción, control y calidad, y SHALL añadir una vista transversal que componga
esas tres decisiones como un stack compatible.

#### Scenario: Acceso a las historias y la vista transversal
- **WHEN** un usuario abre la portada o una historia insignia
- **THEN** SHALL encontrar enlaces diferenciados hacia las tres historias y hacia el configurador integrado

### Requirement: Enlace bidireccional con los estudios
Cada historia y la vista integrada SHALL enlazar sus conclusiones y datasets con
los estudios fuente, y cada estudio insignia SHALL poder enlazar su historia
principal y otras historias relacionadas que lo interpreten.

#### Scenario: Auditoría de una recomendación integrada
- **WHEN** un usuario solicita revisar el origen de una capa o estado de compatibilidad
- **THEN** SHALL acceder al estudio, sección, dataset o referencia que la sustenta
