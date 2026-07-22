## 1. Revalidación de evidencia de compatibilidad

- [x] 1.1 Revalidar en fuentes oficiales qué modelos primarios del mapa SDLC están disponibles de forma nativa o mediante BYOK en Copilot CLI, Cursor, Junie CLI y OpenCode.
- [x] 1.2 Revalidar en documentación y releases oficiales la integración de OpenSpec, GitHub Spec Kit, Superpowers y Open GSD con cada agente candidato.
- [x] 1.3 Clasificar cada pareja como `nativa`, `condicionada`, `incompatible` o `no-confirmada`, registrando mecanismo, nota, fuente y fecha sin convertir ausencia de evidencia en soporte.
- [x] 1.4 Actualizar las citas, caveats y fechas de los estudios afectados cuando la revalidación corrija o acote alguna afirmación vigente.

## 2. Contrato editorial y validación

- [x] 2.1 Extender los tipos y el esquema de frontmatter con `relatedStories`, conservando `featuredStory` como relación primaria y validando slugs únicos.
- [x] 2.2 Añadir el esquema `compatibility-matrix` y validar claves de componentes, estados cerrados, mecanismo, fuente, fecha y unicidad de cada pareja.
- [x] 2.3 Extender los schemas de recomendación y mapa SDLC con claves estables y candidatos `rol:clave`, validando los roles `primary`, `co-primary`, `alternative`, `pilot` y `none`.
- [x] 2.4 Registrar los nuevos datasets consumidores y validar que toda clave recomendada y toda historia relacionada exista.
- [x] 2.5 Añadir comprobaciones de consistencia entre la matriz exacta agente-modelo y las columnas de disponibilidad ya publicadas para los modelos solapados.
- [x] 2.6 Ampliar las pruebas unitarias del parser y contrato para roles o claves inválidas, reglas sin principal, estados desconocidos, parejas duplicadas, procedencia ausente y relaciones de historia rotas.

## 3. Datasets canónicos en los estudios

- [x] 3.1 Ampliar `agent-profile-recommendations` con claves de contexto, candidatos con rol, motivo y caveat sin cambiar la conclusión condicionada del estudio.
- [x] 3.2 Añadir `agent-model-compatibility` a la síntesis de selección de agente con todas las relaciones necesarias para los modelos primarios del mapa SDLC.
- [x] 3.3 Ampliar `llm-sdlc-map` con claves estables y roles que distingan modelos principales, co-principales y alternativas.
- [x] 3.4 Anotar la tabla de escenarios de frameworks como `framework-profile-recommendations` con claves, roles —incluidos piloto o ausencia de framework—, motivo y caveat.
- [x] 3.5 Añadir `agent-framework-compatibility` al estudio comparativo de frameworks con los estados y fuentes revalidados.
- [x] 3.6 Declarar `configurador-stack` en `relatedStories` para los tres estudios fuente y documentar los datasets y columnas técnicas en `web/README.md`.

## 4. Resolución tipada del stack

- [x] 4.1 Implementar transformadores que conviertan los datasets normalizados y sus candidatos `rol:clave` en opciones tipadas sin analizar prosa visible.
- [x] 4.2 Implementar el resolver puro del producto de candidatos con estados `verificado`, `verificado-condicionado`, `incompatible` y `no-confirmado`.
- [x] 4.3 Implementar la búsqueda de agentes con soporte nativo o condicionado para componentes bloqueados sin ordenarlos como mejores alternativas.
- [x] 4.4 Conservar co-principales, separar alternativas y pilotos, representar `none` y limitar la salida final a combinaciones principales verificadas.
- [x] 4.5 Añadir pruebas unitarias para resultados únicos, empates, BYOK/plugin, incompatibilidad, filas ausentes y precedencia conservadora.

## 5. Configurador interactivo y fallback estático

- [x] 5.1 Crear el componente Preact del configurador con selectores etiquetados para ecosistema, fase SDLC y prioridad operativa.
- [x] 5.2 Renderizar las capas de agente, modelo y framework por separado con motivo, caveat, procedencia y estado global textual.
- [x] 5.3 Mostrar mecanismos condicionados y conflictos por relación, y bloquear el lenguaje de recomendación final para estados incompatibles o no confirmados.
- [x] 5.4 Añadir anuncio `aria-live`, navegación completa por teclado, foco visible y estados que no dependan exclusivamente de color.
- [x] 5.5 Crear `/historias/configurador-stack/` con resumen ejecutivo, caveat previo a la interacción, configuración inicial y enlaces hacia las tres historias fuente.
- [x] 5.6 Renderizar sin JavaScript la configuración inicial, explicación del algoritmo, tablas de reglas y compatibilidad y enlaces de evidencia.
- [x] 5.7 Adaptar la tabla reutilizable para omitir columnas técnicas cuando corresponda y renderizar enlaces Markdown seguros en fuentes y mecanismos.
- [x] 5.8 Aplicar estilos responsive coherentes con el sistema editorial para controles, tarjetas de capa, estados y tablas anchas.

## 6. Portada y navegación bidireccional

- [x] 6.1 Destacar el configurador en la portada y conservar accesos diferenciados a las tres historias especializadas.
- [x] 6.2 Actualizar la página de investigación para deduplicar y mostrar la historia principal y las historias relacionadas.
- [x] 6.3 Añadir navegación visible entre el configurador, las historias especializadas, los tres estudios y la metodología.
- [x] 6.4 Explicar en la metodología los estados de compatibilidad y por qué la vista no crea una puntuación global de stacks.

## 7. Pruebas y validación final

- [x] 7.1 Añadir pruebas de componente para cada selector, co-principales, alternativas, piloto, `none`, estados condicionados, combinaciones bloqueadas y paridad SSR/hidratación.
- [x] 7.2 Ampliar Playwright para portada, acceso directo, interacción por teclado, alternativas compatibles y navegación de procedencia.
- [x] 7.3 Verificar con JavaScript deshabilitado que la configuración inicial, caveats, tablas y enlaces de fuente permanecen disponibles, incluido el caso sin stack verificable.
- [x] 7.4 Ejecutar comprobaciones automáticas de accesibilidad y ausencia de desplazamiento horizontal en móvil y escritorio para la nueva ruta.
- [x] 7.5 Actualizar las expectativas de conteo de datasets e historias y comprobar construcción bajo el subpath de GitHub Pages.
- [x] 7.6 Ejecutar `npm run verify` en `web/` y corregir validación de contenido, tipos, pruebas, build y enlaces.
- [x] 7.7 Ejecutar `openspec validate --all --strict` y corregir cualquier incumplimiento del cambio antes de iniciar la aplicación.
