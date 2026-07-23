# Purpose

Definir una recomendación integrada de stack que combine agente, modelo y
framework/proceso mediante reglas canónicas verificables y evidencia trazable.

## Requirements

### Requirement: Configuración por tres dimensiones independientes
La vista integrada SHALL permitir seleccionar el contexto canónico del agente,
la fase o carga del SDLC y el escenario operativo de la capa de
especificación/proceso como entradas independientes.

#### Scenario: Cambio de una dimensión
- **WHEN** el usuario cambia una de las tres selecciones
- **THEN** el sistema SHALL recalcular únicamente desde las reglas canónicas y SHALL mantener visibles las otras dos selecciones

### Requirement: Composición determinista del stack
El sistema SHALL resolver agente, modelo y framework mediante claves estables y
reglas provenientes de datasets Markdown anotados, y MUST NOT mantener
recomendaciones equivalentes escritas manualmente en el componente interactivo.

#### Scenario: Perfil con recomendación única
- **WHEN** las tres reglas seleccionadas producen un candidato único por capa
- **THEN** el sistema SHALL mostrar esas tres capas con su motivo, caveat y procedencia

#### Scenario: Fuente con varias recomendaciones
- **WHEN** una regla canónica conserva dos o más candidatos equivalentes
- **THEN** el sistema SHALL evaluar y mostrar las combinaciones verificadas sin inventar un desempate

### Requirement: Semántica explícita de candidatos
Cada candidato SHALL declarar uno de los roles `primary`, `co-primary`,
`alternative`, `pilot` o `none`, y el resolver MUST NOT inferir esos roles
desde el orden o texto visible de una tabla.

#### Scenario: Co-ganadores
- **WHEN** una regla contiene dos candidatos `co-primary`
- **THEN** ambos SHALL participar en las combinaciones principales sin que la interfaz elija uno arbitrariamente

#### Scenario: Alternativa económica
- **WHEN** una regla contiene un candidato `alternative`
- **THEN** la interfaz SHALL mostrarlo como alternativa y MUST NOT sustituir con él la recomendación principal automáticamente

#### Scenario: Decisión pendiente de piloto
- **WHEN** una regla contiene únicamente candidatos `pilot`
- **THEN** la interfaz SHALL indicar que la selección requiere piloto y MUST NOT presentarla como recomendación final aunque sea técnicamente compatible

#### Scenario: Framework innecesario
- **WHEN** la regla de proceso contiene un candidato `none`
- **THEN** la interfaz SHALL representar explícitamente un stack sin framework y SHALL conservar el caveat definido por el estudio

### Requirement: Validación de compatibilidad ejecutable
Cada combinación SHALL validar agente-modelo y agente-framework mediante
matrices canónicas antes de presentarse como recomendación final.

#### Scenario: Compatibilidad nativa
- **WHEN** ambas relaciones están verificadas como nativas
- **THEN** el sistema SHALL presentar el stack con estado `verificado`

#### Scenario: Compatibilidad condicionada
- **WHEN** al menos una relación requiere BYOK, plugin o configuración adicional y ninguna relación está bloqueada
- **THEN** el sistema SHALL presentar el stack como `verificado-condicionado` y SHALL mostrar el mecanismo requerido

#### Scenario: Relación incompatible
- **WHEN** una matriz declara incompatible alguna relación del stack
- **THEN** el sistema MUST NOT presentar la combinación como recomendación final y SHALL identificar la relación conflictiva

#### Scenario: Relación no confirmada
- **WHEN** falta una fila aplicable o una matriz declara una relación como no confirmada
- **THEN** el sistema MUST NOT asumir compatibilidad y SHALL mostrar el estado `no-confirmado`

### Requirement: Alternativas compatibles sin ranking inventado
Cuando una combinación quede bloqueada, el sistema SHALL enumerar candidatos
con soporte nativo o condicionado documentado para el componente conflictivo y
MUST NOT calificarlos como mejores si ninguna fuente establece ese orden.

#### Scenario: Agente sin soporte del modelo
- **WHEN** el modelo recomendado no es compatible o no está confirmado para el agente seleccionado
- **THEN** la vista SHALL mostrar los agentes documentados que sí soportan ese modelo y su mecanismo de integración

### Requirement: Separación de metodologías y unidades
La vista integrada SHALL presentar las tres decisiones como capas separadas y
MUST NOT calcular una puntuación, promedio o ranking global que combine las
scorecards de agentes, modelos y frameworks.

#### Scenario: Presentación del resultado
- **WHEN** el usuario consulta un stack verificado
- **THEN** SHALL ver la justificación y caveat de cada capa por separado antes del estado global de compatibilidad

### Requirement: Experiencia utilizable sin JavaScript
La ruta integrada SHALL incluir en HTML estático una configuración inicial, la
explicación de las reglas, las tablas canónicas y los enlaces de evidencia
necesarios para comprender el resultado sin hidratación.

#### Scenario: JavaScript deshabilitado
- **WHEN** el navegador no ejecuta JavaScript
- **THEN** el usuario SHALL poder consultar la configuración inicial, sus caveats, compatibilidad y fuentes

#### Scenario: Primera hidratación
- **WHEN** JavaScript hidrata el configurador sin que el usuario cambie una selección
- **THEN** el primer resultado hidratado SHALL coincidir con la configuración renderizada por el servidor

#### Scenario: Ningún stack verificable
- **WHEN** todas las combinaciones candidatas están bloqueadas o no confirmadas
- **THEN** la vista SHALL conservar las recomendaciones de cada capa y sus fuentes, y MUST NOT usar lenguaje de recomendación final

### Requirement: Interacción accesible
Los controles y resultados dinámicos SHALL ser operables por teclado, conservar
foco visible y anunciar cambios sustantivos sin depender exclusivamente de
color.

#### Scenario: Recomendación actualizada con teclado
- **WHEN** el usuario cambia una selección mediante teclado
- **THEN** el resultado actualizado SHALL anunciar su estado y SHALL conservar etiquetas textuales para cada compatibilidad

### Requirement: Flujo progresivo de configuración
La vista integrada SHALL presentar contexto del agente, fase o carga del SDLC y
escenario de proceso como tres pasos de una composición progresiva. Los pasos
SHALL conservar dimensiones independientes, SHALL mantener visibles las
selecciones actuales y MUST NOT impedir editar cualquier dimensión directamente.

#### Scenario: Avance por los tres pasos
- **WHEN** un usuario selecciona una opción en un paso
- **THEN** el siguiente paso SHALL quedar disponible o enfatizado y las selecciones anteriores SHALL permanecer visibles

#### Scenario: Edición de un paso anterior
- **WHEN** un usuario regresa a una dimensión ya configurada
- **THEN** SHALL poder cambiarla sin reiniciar las otras dos y el resultado SHALL recalcularse desde las reglas canónicas

#### Scenario: Orden no obligatorio
- **WHEN** un usuario accede directamente a una dimensión posterior
- **THEN** la interfaz SHALL permitir su edición y MUST NOT inventar una dependencia funcional entre las entradas

### Requirement: Resumen persistente del resultado
El configurador SHALL mantener próximo a las entradas un resumen de agente,
modelo, framework o ausencia de framework y estado global de compatibilidad. El
resumen SHALL derivarse del mismo resultado determinista que el detalle y MUST
NOT ocultar condiciones que cambien materialmente la recomendación.

#### Scenario: Stack verificado condicionado
- **WHEN** una relación requiere BYOK, plugin o configuración adicional
- **THEN** el resumen SHALL identificar el estado condicionado y el detalle SHALL mostrar el mecanismo y la fuente

#### Scenario: Cambio de una selección
- **WHEN** el usuario modifica cualquier dimensión
- **THEN** el resumen y el detalle SHALL actualizarse de forma consistente sin mover el foco fuera del control utilizado

### Requirement: Conflictos próximos a la capa afectada
Cuando una combinación sea incompatible o no confirmada, el configurador SHALL
mostrar el conflicto junto al paso o capa que lo origina y SHALL conservar el
detalle global de compatibilidad. Los mensajes SHALL reutilizar los estados y
mecanismos canónicos y MUST NOT introducir severidades paralelas.

#### Scenario: Modelo incompatible con el agente
- **WHEN** la matriz declara incompatible la relación agente-modelo
- **THEN** el paso de modelo SHALL identificar la relación conflictiva y el resultado global MUST NOT presentar el stack como final

#### Scenario: Framework no confirmado
- **WHEN** la matriz no confirma la relación agente-framework
- **THEN** el paso de proceso SHALL mostrar `no-confirmada`, su nota y fuente disponible sin asumir compatibilidad

### Requirement: Alternativas trazables en contexto
Las alternativas SHALL presentarse junto al conflicto que ayudan a resolver,
SHALL conservar su mecanismo de compatibilidad y SHALL respetar los roles
`primary`, `co-primary`, `alternative`, `pilot` y `none`. MUST NOT establecer un
ranking entre alternativas si las fuentes no lo definen.

#### Scenario: Alternativas compatibles
- **WHEN** un componente conflictivo dispone de candidatos documentados con soporte nativo o condicionado
- **THEN** el configurador SHALL enumerarlos con su estado y mecanismo sin calificarlos como mejores

#### Scenario: Selección que requiere piloto
- **WHEN** la regla contiene únicamente candidatos `pilot`
- **THEN** el flujo y el resumen SHALL indicar que se requiere piloto y MUST NOT convertir una alternativa en recomendación final

### Requirement: Configurador responsive y accesible
El flujo, resumen, conflictos y fuentes SHALL permanecer legibles y operables en
móvil sin desplazamiento horizontal de la página. Los pasos SHALL disponer de
nombres accesibles, foco visible y anuncios concentrados de cambios sustantivos.

#### Scenario: Configuración en móvil
- **WHEN** un usuario completa o edita los pasos en una pantalla estrecha
- **THEN** SHALL mantener acceso al resumen y al detalle sin que una superficie sticky oculte controles enfocados

#### Scenario: Actualización con teclado
- **WHEN** un usuario cambia una selección mediante teclado
- **THEN** el estado global y el conflicto principal SHALL anunciarse sin repetir todo el detalle y el foco SHALL permanecer en el control

### Requirement: Paridad estática del flujo mejorado
La ruta integrada SHALL renderizar en HTML estático las tres selecciones
iniciales, las recomendaciones por capa, el resumen y el resultado completo. La
primera hidratación SHALL conservar exactamente esos valores y estados.

#### Scenario: JavaScript deshabilitado
- **WHEN** el navegador no ejecuta JavaScript
- **THEN** el usuario SHALL consultar las tres entradas, recomendaciones, compatibilidad, conflictos, alternativas y fuentes sin depender de pasos colapsados

#### Scenario: Primera hidratación
- **WHEN** JavaScript hidrata el configurador sin interacción previa
- **THEN** selecciones, resumen, estado global, combinaciones y alternativas SHALL coincidir con el HTML renderizado por el servidor
