## ADDED Requirements

### Requirement: Evidencia y vigencia de compatibilidad
Cada estado de compatibilidad SHALL mostrar el mecanismo aplicable, la fuente y
la fecha de verificación, y SHALL distinguir soporte nativo, soporte condicionado,
incompatibilidad y ausencia de confirmación.

#### Scenario: Compatibilidad mediante BYOK
- **WHEN** una relación depende de BYOK
- **THEN** la interfaz SHALL identificarla como condicionada y SHALL mostrar la fuente y fecha que sustentan esa disponibilidad

#### Scenario: Evidencia insuficiente
- **WHEN** no existe una fuente oficial suficiente para confirmar una relación
- **THEN** la interfaz SHALL mostrarla como no confirmada y MUST NOT convertir la ausencia de evidencia en compatibilidad

#### Scenario: Fuente en fallback tabular
- **WHEN** un usuario consulta una tabla de compatibilidad con o sin JavaScript
- **THEN** los enlaces de fuente SHALL permanecer activables y no SHALL reducirse a texto sin destino

## MODIFIED Requirements

### Requirement: Proveniencia trazable
Cada conclusión, visualización o capa de una recomendación integrada SHALL enlazar
con su estudio fuente y, cuando exista, con la sección, dataset o identificador
de referencia que la sustenta. El estado global SHALL permitir inspeccionar por
separado la procedencia de agente, modelo, framework y compatibilidad.

#### Scenario: Inspección de una capa del stack
- **WHEN** un usuario activa el enlace de fuente del agente, modelo, framework o relación de compatibilidad
- **THEN** SHALL llegar al contexto documental que explica su origen, fecha y limitaciones
