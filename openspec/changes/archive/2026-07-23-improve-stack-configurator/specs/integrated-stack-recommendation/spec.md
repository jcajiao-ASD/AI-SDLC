## ADDED Requirements

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
