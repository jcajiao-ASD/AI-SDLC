## 1. Base del frontend y publicación

- [x] 1.1 Crear el proyecto Astro con TypeScript dentro del repositorio e integrar Preact solo para islas con estado.
- [x] 1.2 Añadir Observable Plot y las dependencias mínimas para validar frontmatter, Markdown GFM y datasets anotados.
- [x] 1.3 Configurar scripts de desarrollo, validación, pruebas y construcción estática.
- [x] 1.4 Configurar Astro para el dominio y subpath de GitHub Pages sin activar todavía el despliegue.
- [x] 1.5 Crear la estructura base de layouts, componentes, estilos, contenido, historias, utilidades y pruebas.

## 2. Contrato editorial y validación

- [x] 2.1 Definir el esquema tipado de frontmatter con catálogos válidos para categoría, estado, evidencia y rol editorial.
- [x] 2.2 Implementar el parser estricto de bloques `ai-sdlc-dataset` y tablas GFM anotadas.
- [x] 2.3 Definir esquemas de dataset para rankings ponderados, matrices de tradeoffs, mapas SDLC y sensibilidad.
- [x] 2.4 Implementar validaciones para campos ausentes, slugs y datasets duplicados, tipos inválidos y referencias rotas.
- [x] 2.5 Añadir pruebas unitarias del contrato editorial, parser y diagnósticos de error.
- [x] 2.6 Documentar el frontmatter, las anotaciones y el proceso de actualización de un estudio.

## 3. Primer contenido y modelo normalizado

- [x] 3.1 Migrar `comparativa_llms_sdlc.md` al frontmatter canónico sin cambiar sus conclusiones.
- [x] 3.2 Anotar en `comparativa_llms_sdlc.md` los datasets necesarios para ranking global y modelo por fase.
- [x] 3.3 Implementar la carga directa de `research/*.md` y generar el modelo normalizado de estudios y datasets.
- [x] 3.4 Implementar la validación de consumidores para detectar datasets inexistentes, duplicados o huérfanos.
- [x] 3.5 Añadir pruebas que demuestren que texto, tabla accesible y gráfica consumen el mismo dato Markdown.

## 4. Sistema de diseño editorial

- [x] 4.1 Definir tokens CSS para color, tipografía, espaciado, grid, radios, elevación y movimiento.
- [x] 4.2 Implementar layout, jerarquía tipográfica, enlaces, foco visible y comportamiento responsive base.
- [x] 4.3 Crear componentes para resumen ejecutivo, callout, caveat, badge, tabla, referencia y ficha de evidencia.
- [x] 4.4 Crear primitivas de datos para escalas, ejes, leyendas, tooltips, selección y estados sin datos.
- [x] 4.5 Implementar fallbacks tabulares, títulos y descripciones accesibles para todas las primitivas gráficas.
- [x] 4.6 Crear una superficie interna de muestra que documente componentes, estados y codificaciones visuales.
- [x] 4.7 Verificar contraste WCAG 2.2 AA, teclado, foco, zoom, mobile y `prefers-reduced-motion` en el sistema base.

## 5. Corte vertical: historia de LLM por fase

- [x] 5.1 Crear el layout narrativo de historia con pregunta, conclusión, comparación, tradeoffs, recomendación y evidencia.
- [x] 5.2 Implementar el ranking global de LLMs desde su dataset anotado y mostrar unidad, confianza y caveat.
- [x] 5.3 Implementar el mapa de modelos recomendados por fase del SDLC desde su dataset anotado.
- [x] 5.4 Añadir tablas accesibles, enlaces de procedencia y navegación hacia el estudio y metodología.
- [x] 5.5 Añadir pruebas de reglas de datos, renderizado estático, interacción por teclado y ejecución sin JavaScript.
- [x] 5.6 Validar el corte vertical en móvil y escritorio antes de generalizar sus componentes.

## 6. Migración del corpus y catálogo

- [x] 6.1 Migrar al contrato editorial los estudios restantes sobre agentes y modelos.
- [x] 6.2 Migrar al contrato editorial los estudios de selección, subagentes, agentes personalizados y MCP.
- [x] 6.3 Migrar al contrato editorial los estudios restantes sobre OpenSpec, Spec Kit, Superpowers y Open GSD.
- [x] 6.4 Implementar la portada del observatorio con preguntas estratégicas, hallazgos y acceso a las tres historias.
- [x] 6.5 Implementar el catálogo de trece estudios con metadatos y filtros por categoría, estado, fecha y tipo de decisión.
- [x] 6.6 Implementar las rutas estáticas de lectura completa preservando índices, tablas, enlaces y referencias.
- [x] 6.7 Añadir navegación transversal y enlaces relacionados entre portada, catálogo, estudios e historias.
- [x] 6.8 Añadir pruebas que fallen si un estudio del corpus se omite o no cumple el contrato.

## 7. Historia de selección de agente

- [x] 7.1 Anotar en `seleccion_agente_codificacion_sdlc.md` los datasets requeridos sin alterar su metodología.
- [x] 7.2 Implementar la comparación de candidatos multi-LLM con unidades, fecha, confianza y fuentes visibles.
- [x] 7.3 Implementar reglas deterministas de recomendación por ecosistema y prioridades del equipo.
- [x] 7.4 Mostrar contrapartidas y evitar presentar como universal una recomendación condicionada.
- [x] 7.5 Añadir fallback sin JavaScript, enlaces bidireccionales y pruebas de cada perfil de decisión.

## 8. Historia de selección de framework

- [x] 8.1 Anotar en `comparacion-skills-sdlc.md` los rankings de adopción, piso de calidad y datos de sensibilidad.
- [x] 8.2 Implementar la comparación separada de las lentes adopción-first y quality-first.
- [x] 8.3 Implementar la curva de sensibilidad con pesos activos y puntos de cruce derivados del dataset.
- [x] 8.4 Presentar la naturaleza ordinal de las scorecards y sus límites de evidencia junto a las visualizaciones.
- [x] 8.5 Añadir fallback sin JavaScript, enlaces bidireccionales y pruebas de ponderaciones y cruces.

## 9. Evidencia, metodología y vigencia

- [x] 9.1 Implementar componentes y reglas de presentación para fecha de corte, revalidación, estado y nivel de evidencia.
- [x] 9.2 Implementar advertencias automáticas cuando un estudio supere su fecha declarada de revalidación.
- [x] 9.3 Crear la ruta de metodología para explicar evidencia, scorecards, ponderaciones, confianza y comparabilidad.
- [x] 9.4 Enlazar conclusiones y valores visualizados con su estudio, sección, dataset o referencia disponible.
- [x] 9.5 Añadir pruebas que verifiquen caveats próximos, ganadores condicionados y límites de comparabilidad.

## 10. Calidad, CI y despliegue

- [x] 10.1 Crear pruebas end-to-end para portada, catálogo, estudios, historias, filtros y navegación directa por URL.
- [x] 10.2 Ejecutar comprobaciones automatizadas de accesibilidad sobre las rutas representativas del MVP.
- [x] 10.3 Verificar construcción sin errores, enlaces internos, assets bajo subpath y funcionamiento con JavaScript deshabilitado.
- [x] 10.4 Crear el workflow de pull request para validar contenido, pruebas y construcción sin publicar.
- [x] 10.5 Crear el workflow de despliegue del artefacto estático a GitHub Pages desde la rama protegida.
- [x] 10.6 Documentar desarrollo local, actualización editorial, publicación, rollback y responsabilidad de mantenimiento.
- [x] 10.7 Ejecutar `openspec validate --all --strict` y corregir cualquier incumplimiento del cambio antes de aplicar el despliegue.
