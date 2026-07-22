# Purpose

TBD.

## Requirements

### Requirement: Estado y vigencia visibles
El observatorio SHALL mostrar el estado, fecha de corte y condición de vigencia
de cada estudio y SHALL advertir cuando haya superado su fecha declarada de
revalidación.

#### Scenario: Investigación vencida
- **WHEN** la fecha actual supera la fecha de revalidación declarada
- **THEN** el estudio y sus historias relacionadas SHALL mostrar una advertencia visible de revalidación pendiente

### Requirement: Nivel de evidencia explícito
Las conclusiones y datasets SHALL distinguir evidencia primaria verificada,
afirmaciones oficiales de proveedor, reportes de terceros e inferencias del
autor cuando esa clasificación esté declarada por el estudio.

#### Scenario: Inferencia del autor
- **WHEN** una recomendación depende de una inferencia y no de una medición controlada
- **THEN** la interfaz SHALL identificarla como inferencia y mostrar su limitación asociada

### Requirement: Caveats próximos a la afirmación
Los caveats materiales SHALL mostrarse junto a la conclusión o visualización que
limitan y MUST NOT quedar disponibles únicamente al final del estudio.

#### Scenario: Scorecard ordinal
- **WHEN** se presenta una puntuación ordinal de decisión
- **THEN** SHALL mostrarse junto a ella que no representa un porcentaje de productividad o rendimiento

### Requirement: Proveniencia trazable
Cada conclusión, visualización o capa de una recomendación integrada SHALL
enlazar con su estudio fuente y, cuando exista, con la sección, dataset o
identificador de referencia que la sustenta. El estado global SHALL permitir
inspeccionar por separado la procedencia de agente, modelo, framework y
compatibilidad.

#### Scenario: Inspección de una cifra
- **WHEN** un usuario activa el enlace de fuente de un valor
- **THEN** SHALL llegar al contexto documental que explica su origen y metodología

#### Scenario: Inspección de una capa del stack
- **WHEN** un usuario activa el enlace de fuente del agente, modelo, framework o relación de compatibilidad
- **THEN** SHALL llegar al contexto documental que explica su origen, fecha y limitaciones

### Requirement: Evidencia y vigencia de compatibilidad
Cada estado de compatibilidad SHALL mostrar el mecanismo aplicable, la fuente y
la fecha de verificación, y SHALL distinguir soporte nativo, soporte
condicionado, incompatibilidad y ausencia de confirmación.

#### Scenario: Compatibilidad mediante BYOK
- **WHEN** una relación depende de BYOK
- **THEN** la interfaz SHALL identificarla como condicionada y SHALL mostrar la fuente y fecha que sustentan esa disponibilidad

#### Scenario: Evidencia insuficiente
- **WHEN** no existe una fuente oficial suficiente para confirmar una relación
- **THEN** la interfaz SHALL mostrarla como no confirmada y MUST NOT convertir la ausencia de evidencia en compatibilidad

#### Scenario: Fuente en fallback tabular
- **WHEN** un usuario consulta una tabla de compatibilidad con o sin JavaScript
- **THEN** los enlaces de fuente SHALL permanecer activables y no SHALL reducirse a texto sin destino

### Requirement: Metodología transversal
El observatorio SHALL incluir una superficie que explique niveles de evidencia,
scorecards, ponderaciones, confianza, fechas de corte y límites de comparación
usados en el corpus.

#### Scenario: Interpretación de un ranking
- **WHEN** un usuario necesita entender cómo se calculó una clasificación
- **THEN** SHALL acceder desde la historia a la metodología relevante sin abandonar el observatorio

### Requirement: Síntesis sin pérdida de incertidumbre
Los resúmenes ejecutivos MUST NOT eliminar condiciones, márgenes estrechos,
confianza o incertidumbre que cambien materialmente la interpretación de una
conclusión.

#### Scenario: Ganador condicionado
- **WHEN** un estudio recomienda una opción solo para un perfil o ecosistema
- **THEN** el resumen SHALL expresar esa condición y no presentar un ganador universal
