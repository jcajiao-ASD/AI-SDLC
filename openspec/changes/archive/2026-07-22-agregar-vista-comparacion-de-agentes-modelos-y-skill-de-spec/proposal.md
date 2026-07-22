## Why

El observatorio permite decidir por separado qué agente, modelo o framework
adoptar, pero obliga al usuario a combinar manualmente esas conclusiones y no
verifica que el stack resultante sea compatible. Una vista transversal puede
reducir esa fricción sin inventar una puntuación común ni perder la trazabilidad
hacia los tres estudios fuente.

## What Changes

- Añadir un configurador estático e interactivo que recomiende una combinación de
  agente, modelo y capa de especificación/proceso según ecosistema, fase del SDLC
  y prioridad operativa.
- Mantener separadas las tres decisiones y componer sus resultados mediante reglas
  deterministas derivadas de datasets Markdown canónicos.
- Incorporar compatibilidad agente-modelo y agente-framework con estados
  verificables como nativa, condicionada, no confirmada o incompatible.
- Impedir que una combinación no confirmada se presente como recomendación final
  y mostrar la capa conflictiva, el requisito de integración y las alternativas
  compatibles documentadas.
- Añadir la vista a la portada y enlazarla bidireccionalmente con las historias y
  estudios que sustentan cada capa.
- Conservar una experiencia completa sin JavaScript mediante explicación del
  algoritmo, recomendación inicial, tablas canónicas y enlaces de evidencia.
- Revalidar contra fuentes oficiales las afirmaciones volátiles sobre catálogo de
  modelos, BYOK, plugins y compatibilidad de frameworks antes de publicar las
  matrices.

## Capabilities

### New Capabilities

- `integrated-stack-recommendation`: Configuración determinista y trazable de un
  stack agente-modelo-framework con validación explícita de compatibilidad.

### Modified Capabilities

- `interactive-decision-stories`: Incorporar una vista transversal que compone
  las tres historias existentes sin fusionar sus escalas ni metodologías.
- `research-content-model`: Añadir datasets canónicos de reglas y compatibilidad,
  claves estables para las opciones y soporte para relacionar un estudio con más
  de una historia.
- `research-observatory`: Destacar el configurador en la portada manteniendo
  accesibles las tres áreas de decisión y sus historias individuales.
- `evidence-transparency`: Mostrar procedencia, fecha y condición de compatibilidad
  para cada capa y para el estado global del stack recomendado.

## Impact

- Se añadirá una ruta de historia/configurador, una isla Preact para los controles
  y utilidades tipadas para resolver recomendaciones y compatibilidad.
- Cambiarán el contrato editorial, el parser y las validaciones de datasets; los
  tres estudios fuente incorporarán o ampliarán tablas anotadas.
- Se actualizarán la portada, la navegación desde estudios, la documentación del
  frontend y las pruebas unitarias, de construcción, accesibilidad, enlaces,
  degradación sin JavaScript y flujo end-to-end.
- No se añaden servicios, persistencia, generación mediante LLM ni una scorecard
  combinada entre agentes, modelos y frameworks.
