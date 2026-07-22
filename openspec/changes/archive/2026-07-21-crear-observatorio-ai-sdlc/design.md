## Context

El repositorio contiene trece investigaciones extensas en `research/`, escritas
en Markdown y organizadas por `research/_index.md`. No existe todavía una
aplicación, configuración frontend, contrato de metadatos ni pipeline de
publicación. Los documentos expresan fecha de corte, estado, caveats, referencias
y datos cuantitativos mediante estructuras editoriales heterogéneas: blockquotes,
tablas GFM y prosa.

El producto se dirige principalmente a líderes técnicos y arquitectos. Debe
permitir pasar de una pregunta estratégica a una recomendación contextual y,
después, a la evidencia que la sustenta. El MVP incluye una portada ejecutiva, el
catálogo de los trece estudios y tres historias interactivas basadas en:

- `comparativa_llms_sdlc.md`;
- `seleccion_agente_codificacion_sdlc.md`;
- `comparacion-skills-sdlc.md`.

Los estudios Markdown deben continuar siendo la fuente de verdad. El sistema no
puede duplicar manualmente puntuaciones o conclusiones en una capa de datos
independiente ni extraer información crítica mediante heurísticas tolerantes.

## Goals / Non-Goals

**Goals:**

- Crear un sitio estático rápido, accesible y publicable en GitHub Pages.
- Definir y validar un contrato editorial explícito para los trece estudios.
- Mantener legibles en GitHub tanto la prosa como las tablas canónicas.
- Construir un sistema de diseño antes de componer las superficies finales,
  validándolo temprano con un corte vertical de contenido real.
- Generar visualizaciones y fallbacks tabulares desde el mismo dataset Markdown.
- Separar claramente datos, presentación de evidencia y narrativa de decisión.
- Hacer que cada historia comunique conclusión, contexto, tradeoffs y caveats sin
  exigir interacción previa.

**Non-Goals:**

- Incorporar CMS, base de datos, autenticación o edición desde el navegador.
- Añadir personalización persistente o recomendaciones generadas por IA.
- Convertir los trece estudios en historias interactivas durante el MVP.
- Implementar búsqueda de texto completo; el catálogo usará navegación y filtros.
- Reescribir el corpus para modificar sus conclusiones o metodología.
- Crear una aplicación dependiente de JavaScript para acceder al contenido.

## Decisions

### 1. Astro estático con interactividad aislada

Se usará Astro para generar HTML estático y componentes Astro para navegación,
contenido y patrones editoriales. Las visualizaciones o controles que requieran
estado se hidratarán como islas aisladas, usando Preact solo cuando la
interacción lo justifique. Las gráficas editoriales se construirán con
Observable Plot sobre SVG.

Esta opción prioriza contenido, rendimiento y degradación progresiva frente a una
SPA React. Next.js aportaría capacidades de servidor que el MVP no necesita, y
una SPA haría depender de JavaScript la lectura del corpus.

### 2. GitHub Pages como destino y GitHub Actions como pipeline

La construcción producirá un artefacto estático compatible con el subpath del
repositorio. GitHub Actions ejecutará validaciones, construcción y despliegue a
GitHub Pages. Los pull requests deberán validar el contrato editorial y el
frontend sin publicar.

Esta decisión mantiene infraestructura y contenido en el mismo flujo de revisión.
Vercel o Netlify facilitarían previews administradas, pero añadirían una
plataforma externa innecesaria para el alcance inicial.

### 3. Contrato editorial dentro de cada Markdown

Cada estudio tendrá frontmatter YAML obligatorio con identidad, resumen,
categoría, estado, fechas, vigencia, nivel de evidencia y rol dentro del
observatorio. El pipeline rechazará documentos con metadatos ausentes, fechas
inválidas, slugs duplicados o valores fuera de catálogo.

Los datasets se conservarán como tablas GFM legibles delimitadas por comentarios
HTML explícitos, por ejemplo:

```markdown
<!-- ai-sdlc-dataset: id=llm-global-ranking schema=weighted-ranking unit=score-100 -->
| Modelo | Puntaje | Confianza |
| --- | ---: | --- |
| ... | ... | ... |
<!-- /ai-sdlc-dataset -->
```

El parser solo reconocerá bloques anotados y validará sus columnas contra
esquemas conocidos. La tabla será simultáneamente el dato canónico, el fallback
accesible y la entrada de la gráfica. No habrá JSON/YAML sidecar con valores
duplicados ni extracción heurística desde prosa o tablas no anotadas.

Se consideraron frontmatter con datasets embebidos y archivos sidecar. El primero
degrada la legibilidad de estudios grandes; el segundo crea una segunda fuente de
verdad. Las tablas anotadas conservan el flujo editorial actual y permiten
validación estricta.

### 4. Modelo normalizado generado durante la construcción

Una integración de contenido leerá directamente `research/*.md`, validará el
frontmatter, transformará los datasets anotados y emitirá un modelo interno
normalizado. Las páginas y gráficas consumirán exclusivamente ese modelo durante
la construcción. Los cambios en un estudio se reflejarán al reconstruir el sitio;
los datasets inválidos, duplicados o no usados por una historia producirán un
error explícito.

`research-content-model` será propietario del contrato y transformación de los
campos. `evidence-transparency` solo definirá cómo se muestran y enlazan, evitando
que dos capacidades redefinan la vigencia o confianza.

### 5. Sistema de diseño por capas

El sistema se implementará con CSS custom properties y componentes compuestos:

1. fundamentos: color, tipografía, espaciado, grid, radios, elevación y movimiento;
2. primitivas editoriales: texto, enlaces, badges, callouts, tablas y citas;
3. primitivas de datos: escalas, leyendas, ejes, tooltips y estados de selección;
4. patrones: resumen ejecutivo, ficha de evidencia, comparador y bloque de caveat;
5. composiciones de producto: portada, catálogo, estudio e historia.

El sistema de diseño será responsable de primitivas reutilizables. Cada historia
será responsable de seleccionar y componer esas primitivas según su pregunta de
decisión. No se crearán gráficas de propósito único dentro del núcleo del sistema
si no existe una primitiva reutilizable.

La experiencia primaria será clara y editorial; el modo oscuro no forma parte del
MVP. Los colores de datos tendrán significado documentado y nunca serán el único
medio para transmitir estado o diferencia.

### 6. Arquitectura de información orientada a decisiones

Las rutas principales serán:

- `/`: observatorio ejecutivo;
- `/investigaciones/`: catálogo filtrable;
- `/investigaciones/[slug]/`: lectura completa de cada estudio;
- `/historias/[slug]/`: historias de decisión interactivas;
- `/metodologia/`: explicación transversal de evidencia, puntuaciones y vigencia.

La portada mostrará preguntas y hallazgos antes que una lista de archivos. Las
historias seguirán el orden pregunta, conclusión, comparación, tradeoffs,
recomendación y evidencia. Cada estudio conservará una ruta de lectura extensa.

### 7. Tres historias con límites de comparabilidad

Las historias iniciales serán:

- modelo recomendado por fase del SDLC;
- agente recomendado según perfil y ecosistema;
- framework recomendado según adopción y piso de calidad.

Cada visualización declarará unidad, fecha de corte, fuente y confianza. El
sistema no combinará en una misma escala benchmarks, scorecards o metodologías
incompatibles. Cuando una historia sintetice varios estudios, presentará cada
marco por separado y explicará el vínculo inferencial entre ellos.

Las recomendaciones contextuales se resolverán mediante reglas deterministas
derivadas de las investigaciones, no mediante generación libre ni métricas
inventadas.

### 8. Accesibilidad y mejora progresiva

El HTML estático contendrá la conclusión, caveats y tablas completas. Las islas
añadirán filtros, resaltado y cambios de vista, pero no ocultarán información
necesaria. Cada SVG tendrá título y descripción, y conservará una tabla asociada.
La navegación será operable por teclado, el foco será visible, el movimiento
respetará `prefers-reduced-motion` y los contrastes cumplirán WCAG 2.2 AA.

### 9. Secuencia mediante un corte vertical

El contrato de contenido y los fundamentos del sistema de diseño avanzarán antes
de las páginas completas. La historia de LLM por fase del SDLC será el primer
corte vertical porque prueba metadatos, rankings, mapa por fase, evidencia,
responsive y accesibilidad. Solo después se generalizarán los componentes y se
construirán las otras dos historias.

Esto corrige el riesgo de diseñar componentes abstractos antes de comprobarlos
con los datos reales y evita migrar todo el corpus sobre un contrato no probado.

## Risks / Trade-offs

- **El contrato requiere modificar los trece estudios** → migrar primero un
  estudio insignia, validar su construcción y después aplicar el mismo contrato
  al resto mediante cambios editoriales acotados.
- **Las tablas actuales no siempre tienen una forma apta para gráficas** →
  anotar solo datasets con esquema explícito y mantener como prosa/tablas normales
  aquello que no deba visualizarse.
- **Una actualización puede cambiar texto sin actualizar su dataset** → usar una
  única tabla canónica anotada para texto accesible y gráfica, y fallar la
  construcción ante referencias rotas o datasets sin consumidor declarado.
- **Observable Plot puede no cubrir una composición especializada** → permitir
  SVG/D3 puntual detrás de la misma interfaz de datos y accesibilidad, sin
  cambiar el contrato del contenido.
- **GitHub Pages no ofrece lógica de servidor ni previews avanzadas** → mantener
  el MVP totalmente estático y publicar artefactos de Actions para revisión.
- **Las scorecards podrían interpretarse como rendimiento medido** → mostrar
  unidad, metodología y advertencia semántica junto a cada puntuación.
- **El alcance de tres historias puede crecer** → completar y aceptar el corte
  vertical antes de iniciar las otras dos.

## Migration Plan

1. Crear el workspace Astro, validaciones y construcción estática sin alterar la
   publicación actual del repositorio.
2. Definir el contrato de frontmatter y datasets; migrar
   `comparativa_llms_sdlc.md` como prueba vertical.
3. Crear fundamentos y primitivas del sistema de diseño, y validarlos con la
   primera historia.
4. Migrar metadatos de los doce estudios restantes y habilitar el catálogo.
5. Anotar los datasets necesarios en los otros dos estudios insignia y construir
   sus historias.
6. Incorporar validaciones de accesibilidad, contenido, enlaces y construcción a
   GitHub Actions.
7. Activar GitHub Pages cuando el artefacto estático esté aprobado.

El rollback consistirá en desactivar el workflow de Pages o redeplegar el artefacto
anterior. Los Markdown seguirán siendo legibles independientemente del frontend;
las anotaciones HTML son invisibles en su renderizado normal.

## Open Questions

- Definir el nombre público definitivo; “Observatorio AI-SDLC” funcionará como
  nombre de trabajo.
- Decidir si se habilitará analítica respetuosa de privacidad después del MVP
  para medir tiempo hasta hallazgo y rutas de navegación.
- Asignar la responsabilidad editorial de actualizar metadatos y datasets cuando
  cambie una investigación.
