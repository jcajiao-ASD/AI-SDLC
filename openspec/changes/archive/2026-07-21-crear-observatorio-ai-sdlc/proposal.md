## Why

Las investigaciones de `research/` contienen conclusiones, comparaciones y
modelos de decisión valiosos, pero su extensión y formato documental dificultan
que líderes técnicos y arquitectos identifiquen rápidamente qué decisión tomar,
bajo qué condiciones y con qué nivel de confianza. Se propone crear un
observatorio editorial interactivo que haga esos resultados intuitivos, sobrios
y entretenidos sin perder trazabilidad hacia la metodología y las fuentes.

## Product Charter

- **Visión:** convertir el corpus AI-SDLC en un observatorio de decisiones donde
  una conclusión ejecutiva siempre pueda auditarse hasta su evidencia.
- **Audiencia primaria:** líderes técnicos y arquitectos que seleccionan modelos,
  agentes, integraciones y metodologías para sus equipos.
- **Resultado esperado:** reducir la fricción para identificar una recomendación
  aplicable y comprender sus condiciones, tradeoffs, vigencia y confianza.
- **Alcance MVP:** portada ejecutiva, catálogo de los trece estudios, lectura
  completa, metodología transversal y tres historias insignia interactivas.
- **Principios:** Markdown como fuente de verdad, claridad antes que espectáculo,
  visualizaciones funcionales, accesibilidad por defecto y transparencia de
  incertidumbre.
- **Señal de éxito:** cada historia permite comprender su conclusión, contexto y
  caveat principal antes de interactuar, y ofrece una ruta directa hacia los
  datos y referencias que la sustentan.

## What Changes

- Crear un frontend editorial en español orientado a líderes técnicos y
  arquitectos, con una portada ejecutiva, catálogo navegable y rutas claras desde
  el hallazgo hasta su evidencia.
- Mantener los archivos Markdown de `research/` como fuente de verdad y definir
  un contrato editorial para extraer metadatos, resúmenes, vigencia, referencias
  y datasets de visualización.
- Crear primero un sistema de diseño editorial tecnológico, accesible y centrado
  en visualización de datos, antes de construir las pantallas del producto.
- Publicar un catálogo para los trece estudios actuales y preparar su crecimiento
  sin exigir una historia interactiva específica para cada documento.
- Crear tres historias insignia interactivas para decidir:
  - qué LLM usar en cada fase del SDLC;
  - qué agente elegir según el perfil y ecosistema del equipo;
  - qué framework de desarrollo agéntico adoptar según adopción, control y
    calidad.
- Incorporar visualizaciones funcionales —rankings, matrices de tradeoffs, mapas
  por fase del SDLC y curvas de sensibilidad— que preserven las unidades,
  ponderaciones, niveles de confianza y límites de comparabilidad de los estudios.
- Hacer visibles la fecha de corte, estado, nivel de evidencia, caveats,
  metodología y referencias asociadas a cada conclusión.
- Establecer como charter del producto que la experiencia debe reducir el tiempo
  hasta una decisión informada sin simplificar la evidencia de forma engañosa.

## Capabilities

### New Capabilities

- `editorial-design-system`: Fundamentos, tokens, componentes, patrones
  editoriales y gramática de visualización de datos para una interfaz sobria,
  consistente, responsive y accesible.
- `research-content-model`: Contrato y procesamiento del contenido Markdown para
  convertir los estudios en metadatos, navegación, texto editorial y datos
  estructurados sin crear una segunda fuente de verdad.
- `research-observatory`: Portada ejecutiva y catálogo completo para descubrir,
  filtrar y abrir investigaciones por tema, fecha, estado y tipo de decisión.
- `interactive-decision-stories`: Experiencias narrativas y comparativas para las
  tres historias insignia, con progresión desde conclusión ejecutiva hasta
  tradeoffs y recomendación contextual.
- `evidence-transparency`: Presentación trazable de vigencia, confianza,
  metodología, limitaciones y referencias en hallazgos y visualizaciones.

### Modified Capabilities

Ninguna. `openspec/specs/` no contiene capacidades existentes.

## Impact

- Se añadirá una nueva superficie frontend y su configuración de desarrollo,
  construcción y publicación.
- Los documentos de `research/` conservarán su función de fuente primaria, pero
  deberán cumplir un contrato editorial explícito para alimentar la experiencia.
- El índice y los trece estudios actuales serán entradas del catálogo; tres de
  ellos aportarán además datasets y narrativa para historias interactivas.
- Se incorporarán decisiones de tecnología frontend, renderizado de Markdown,
  generación de gráficas, accesibilidad, pruebas y despliegue en el diseño
  técnico.
- No se introduce un CMS, edición desde el navegador, cuentas de usuario ni
  personalización persistente en el alcance inicial.
