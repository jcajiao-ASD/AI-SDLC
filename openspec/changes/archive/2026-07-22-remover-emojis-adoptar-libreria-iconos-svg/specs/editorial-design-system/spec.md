## ADDED Requirements

### Requirement: Iconografía SVG semántica
El sistema de diseño SHALL proporcionar un conjunto restringido de iconos SVG
inline procedentes de una librería versionada y SHALL aplicarlos de forma
consistente a estados, advertencias y enlaces de acción. Los iconos SHALL
heredar el color del contexto, usar tamaños y trazos documentados y MUST NOT
requerir solicitudes a proveedores externos durante la navegación.

#### Scenario: Renderizado estático de un icono
- **WHEN** una página Astro utiliza un icono aprobado por el sistema de diseño
- **THEN** la construcción SHALL incluir el SVG necesario en el HTML sin depender de JavaScript ni de una solicitud externa

#### Scenario: Estado acompañado por icono
- **WHEN** un badge, caveat o mensaje presenta un icono semántico
- **THEN** SHALL conservar una etiqueta textual que comunique el mismo significado sin depender del color o de la forma

#### Scenario: Icono junto a texto accesible
- **WHEN** un icono repite el significado de una etiqueta textual adyacente
- **THEN** SHALL ocultarse de las tecnologías de asistencia y MUST NOT recibir foco

#### Scenario: Control compuesto únicamente por un icono
- **WHEN** una interacción no contiene texto visible y usa un icono como único affordance
- **THEN** SHALL proporcionar un nombre accesible explícito que describa su acción

#### Scenario: Consulta de la gramática iconográfica
- **WHEN** un diseñador o desarrollador abre la página del sistema de diseño
- **THEN** SHALL encontrar el catálogo aprobado y sus reglas de tamaño, color, trazo, semántica y accesibilidad
