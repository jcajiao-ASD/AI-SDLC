# Open GSD vs. OpenSpec para un SDLC centrado en GitHub Copilot

> **Fecha de corte:** 20 de julio de 2026.  
> **Advertencia de evidencia:** no existen benchmarks independientes/controlados que comparen GSD Core y OpenSpec, ni que aíslen su efecto sobre Copilot. La recomendación combina hechos oficiales, límites observados y valoración de arquitectura; debe validarse con un piloto interno.

## Conclusión ejecutiva

- **OpenSpec** es principalmente una capa ligera de especificación y memoria de cambios: excelente para acordar intención, mantener deltas y crecer documentación en brownfield sin imponer Git ni una orquestación completa.
- **GSD Core** es un framework de ciclo completo: discusión, especificación opcional, planificación, subagentes, ejecución, verificación, commits y PR. Tiene más capacidad y mucha más ceremonia/riesgo.
- **Para “todo el ciclo”**, GSD Core es la opción más completa.
- **Para adopción amplia y de bajo impacto en una organización que ya eligió Copilot**, OpenSpec es el mejor punto de entrada.
- **Recomendación contextual:** usar OpenSpec como estándar ligero para cambios normales; reservar GSD Core para cambios medianos/grandes que requieran ejecución agentiva, persistencia y coordinación. Evaluar una integración híbrida solo con una única fuente de verdad bien definida.

Versiones verificadas al corte:

| Producto | Versión estable | Fecha | Runtime |
|---|---:|---:|---|
| GSD Core | [1.7.0](https://github.com/open-gsd/gsd-core/releases/tag/v1.7.0) | 15-07-2026 | Node >=22, npm >=10 |
| OpenSpec | [1.6.0](https://github.com/Fission-AI/OpenSpec/releases/tag/v1.6.0) | 10-07-2026 | Node >=20.19.0 |

## 1. Comparación ejecutiva

| Dimensión | GSD Core | OpenSpec |
|---|---|---|
| Propósito principal | Orquestar el ciclo agentivo completo | Acordar y persistir comportamiento/cambios |
| Modelo mental | Milestones → fases → planes → ejecución → verificación → ship | Specs vigentes + changes/deltas → apply → archive |
| Flujo | Discuss → Plan → Execute → Verify → Ship | Explore → Propose → Apply → Sync → Archive |
| Persistencia | `.planning/` con estado, requisitos, roadmap, contexto, planes y evidencia | `openspec/specs/` y `openspec/changes/` |
| Fuente de verdad declarada | `PROJECT.md`/`REQUIREMENTS.md` y artefactos de fase | `openspec/specs/` para lo vigente |
| Subagentes | Sí, roles especializados y ejecución por olas | No como orquestación propia |
| Paralelismo | Explícito y configurable | Changes separados; ejecución depende del agente |
| Verificación | Plan-checker, verifier, tests, UAT y comandos de calidad | Validate estructural; verify agentivo opcional/no bloqueante |
| Git | Puede crear commits, ramas/worktrees y PR | No toca Git |
| Copilot CLI | Skills, agentes, instrucciones, `AGENTS.md`, hook sessionStart | Skills sí; prompt files no |
| Ceremonia | Alta | Baja/media |
| Mejor ajuste | Features grandes, ciclo completo, recuperación entre sesiones | Brownfield incremental, cambios pequeños/medianos |
| Riesgo operativo | Alto | Moderado |
| Evidencia causal | No encontrada | No encontrada |

## 2. Qué cambia realmente en Copilot

### GSD Core

Una instalación local para Copilot agrega:

- `.github/skills/gsd-*/SKILL.md`;
- agentes `.agent.md`;
- `.github/copilot-instructions.md`;
- instrucciones en `AGENTS.md`;
- `.github/hooks/gsd-session.json`;
- artefactos `.planning/`.

El efecto combinado es amplio: Copilot recibe instrucciones de proceso, roles especializados y estado persistente. El hook de Copilot es `sessionStart` y advisory; no debe suponerse la misma cobertura de guards que GSD ofrece en otros runtimes. Véanse la [arquitectura](https://github.com/open-gsd/gsd-core/blob/v1.7.0/docs/ARCHITECTURE.md) y la [instalación por runtime](https://github.com/open-gsd/gsd-core/blob/v1.7.0/docs/how-to/install-on-your-runtime.md).

### OpenSpec

Para Copilot genera:

- `.github/skills/openspec-*/SKILL.md`;
- `.github/prompts/opsx-*.prompt.md`;
- `openspec/config.yaml`;
- specs y changes.

El [matiz oficial](https://github.com/Fission-AI/OpenSpec/blob/v1.6.0/docs/supported-tools.md) es decisivo: los prompt files funcionan en Copilot IDE, pero **Copilot CLI no los consume**. CLI sí consume skills; se invocan mencionando, por ejemplo, `/openspec-propose`.

### Interpretación

Ninguno modifica el modelo. Ambos influyen mediante contexto e instrucciones:

- GSD Core cambia **cómo se organiza y ejecuta el trabajo**;
- OpenSpec cambia **cómo se expresa y conserva la intención**.

## 3. Comparación por fase del SDLC

| Fase | GSD Core | OpenSpec | Ventaja |
|---|---|---|---|
| Descubrimiento | Entrevistas, exploración, research y captura persistente | Explore conversa e inspecciona sin artefactos | GSD si se requiere trazabilidad; OpenSpec si se busca rapidez |
| Requisitos | `REQUIREMENTS.md`, IDs, roadmap, `SPEC.md` opcional, bordes/prohibiciones | Requirements/scenarios por delta | Empate condicionado |
| Arquitectura | Research, mapas brownfield, decisiones por fase | `design.md` dentro del change | GSD para profundidad; OpenSpec para cambio acotado |
| Planificación | Planes atómicos, dependencias, olas y plan-checker | `tasks.md`, artefactos fluidos | GSD |
| Construcción | Ejecutores/subagentes, commits y resúmenes | Apply trabaja la lista de tareas | GSD en trabajo grande; OpenSpec en cambios simples |
| Pruebas | Test gates, verifier, generación de pruebas y UAT | Escenarios + verify opcional | GSD |
| Seguridad | Workflows/gates y algunos hooks según runtime | Reglas y tareas definidas por el equipo | GSD, pero requiere controles externos en ambos |
| Revisión | Code review, revisión cruzada opcional, evidencia por fase | Proposal/delta facilitan revisión del PR | GSD para automatización; OpenSpec para legibilidad |
| Release/PR | `/gsd-ship`, ramas/worktrees/tags configurables | No toca Git; archive/sync documental | GSD |
| Operación | Estado, debug, threads/learnings y handoffs | Specs vigentes como referencia | GSD para workflow; OpenSpec para contrato de comportamiento |

## 4. Costo y ceremonia

### GSD Core

Costos esperables:

- varias llamadas por research, plan, revisión, ejecución y verificación;
- más archivos para revisar;
- latencia de subagentes;
- permisos de shell/Git;
- mantenimiento de `.planning/`;
- riesgo de conflictos entre planes paralelos;
- actualización frecuente del framework.

La auditoría interna de [GSD Pi](https://github.com/open-gsd/gsd-pi/blob/main/docs/token-consumption-savings-evidence.md), otro producto de la suite, muestra que las superficies de prompt pueden ser grandes. No demuestra costo ni beneficio de GSD Core, pero confirma que el presupuesto de contexto debe observarse.

### OpenSpec

Costos esperables:

- proposal/delta/design/tasks antes de código;
- revisión y mantenimiento de specs;
- sync/archive;
- posible duplicación con PRD, ADR o documentación existente;
- disciplina manual para Git y gates.

Para un cambio trivial, incluso esta ceremonia puede no compensar. Para un cambio mediano, suele ser más ligera que GSD.

### Regla práctica

| Tamaño/riesgo | Recomendación inicial |
|---|---|
| Hotfix trivial y reversible | Copilot directo + pruebas/revisión; quizá ninguno |
| Cambio pequeño con comportamiento visible | OpenSpec |
| Feature mediana en brownfield | OpenSpec; GSD si hay alta incertidumbre o muchas sesiones |
| Cambio grande/multiarchivo/multifase | GSD Core |
| Cambio regulado o de alto riesgo | GSD + controles externos; OpenSpec puede ser contrato, nunca control único |

## 5. Greenfield y brownfield

### Greenfield

**GSD Core** aporta más:

- visión y restricciones;
- requirements/roadmap;
- investigación de stack;
- fases;
- ejecución y PR.

El riesgo es sobrediseñar antes de aprender. Mantenga fases pequeñas y use prototipos/spikes.

**OpenSpec** también funciona, pero su fortaleza delta-first aparece menos cuando aún no existe comportamiento vigente.

### Brownfield

**OpenSpec** tiene una ventaja de adopción:

- no exige documentar todo;
- cada change especifica solo el delta;
- no altera la estrategia Git;
- las specs crecen con el trabajo real.

**GSD Core** es mejor cuando primero se necesita comprender una base compleja:

- `/gsd-onboard`;
- `/gsd-map-codebase`;
- mapas de stack, arquitectura, convenciones, pruebas, integraciones y riesgos;
- contexto persistente para muchas sesiones.

Para el contexto del usuario —**construir sobre trabajo existente**— OpenSpec ofrece el menor costo inicial; GSD ofrece mayor potencia cuando el cambio supera la capacidad de un change sencillo.

## 6. Persistencia, contexto y paralelismo

| Tema | GSD Core | OpenSpec |
|---|---|---|
| Memoria vigente | `STATE.md`, `PROJECT.md`, `REQUIREMENTS.md`, mapas y artefactos de fase | Specs actuales y archive de changes |
| Handoff entre sesiones | Explícito (`STATE.md`, `continue-here.md`) | Implícito mediante change/tasks/specs |
| Contexto limpio | Diseñado alrededor de subagentes frescos | Recomienda higiene; no la orquesta |
| Paralelismo interno | Olas y límite de concurrencia | No |
| Cambios paralelos | Workstreams/worktrees y planes | Carpetas de change independientes |
| Conflictos | Código, commits, ramas y artefactos | Principalmente specs al sincronizar/archivar |
| Costo de contexto | Alto/controlable | Menor, aunque specs pueden crecer |

## 7. Verificación

### GSD Core

Capas:

1. plan-checker;
2. tests durante ejecución;
3. verifier contra requisitos;
4. `VERIFICATION.md`;
5. UAT humana;
6. code review/audits opcionales.

Ventaja: fuerza una secuencia visible. Límite: agentes que comparten modelo, instrucciones y artefactos pueden compartir errores; UAT/CI siguen siendo esenciales.

### OpenSpec

Capas:

1. escenarios en delta;
2. `openspec validate` para estructura;
3. `/opsx:verify` para completitud/corrección/coherencia;
4. revisión del PR y CI externos.

Ventaja: criterios legibles junto al cambio. Límite: verify es opcional y no bloquea archive.

### Lección de evidencia indirecta

[UTBoost](https://aclanthology.org/2025.acl-long.189/) encontró 345 parches erróneos que pruebas originales clasificaban como válidos. Por ello, en ambos frameworks:

- tests generados por el mismo agente no bastan;
- deben existir regresión, revisión humana y criterios externos;
- “PASS” en un Markdown no es evidencia suficiente.

## 8. Git, PR y operación

### GSD Core

- puede hacer commits por tarea;
- admite worktrees/estrategias de rama;
- prepara PR;
- actualiza/archiva estado.

Esto reduce coordinación manual, pero requiere controles sobre:

- firma y formato de commits;
- ramas protegidas;
- permisos remotos;
- acciones destructivas;
- ownership;
- merge.

### OpenSpec

El [workflow de equipo](https://github.com/Fission-AI/OpenSpec/blob/v1.6.0/docs/team-workflow.md) dice que OpenSpec no toca Git. El equipo decide:

- rama por change;
- cuándo incluir propuesta y código;
- archive dentro del PR o después del merge;
- resolución de conflictos.

Es más simple de introducir y más fácil de alinear con políticas existentes, pero no entrega automatización de operación.

## 9. Riesgos comparados

| Riesgo | GSD Core | OpenSpec |
|---|---:|---:|
| Prompt/instruction conflict | Alto | Medio |
| Ejecución de shell | Alto | Medio |
| Cambios Git no deseados | Alto | Bajo |
| Costo de tokens | Alto | Bajo/medio |
| Ceremonia | Alto | Bajo/medio |
| Drift de artefactos | Medio/alto | Medio |
| Dependencia del framework | Alta en proceso | Media |
| Falta de enforcement | Media | Alta |
| Complejidad de actualización | Alta | Media |
| Riesgo de falsa confianza | Alto por “verifier” | Alto por “spec/verify” |

Los niveles son valoración analítica, no medición.

## 10. Matriz de decisión para la organización

Escala: 1 = débil, 5 = fuerte. Pesos adaptados al contexto: Copilot elegido, necesidad de especificación/prompt y construcción brownfield.

| Criterio | Peso | GSD Core | OpenSpec |
|---|---:|---:|---:|
| Ajuste brownfield | 20% | 4 | 5 |
| Especificación y trazabilidad | 20% | 4 | 5 |
| Ejecución agentiva end-to-end | 20% | 5 | 2 |
| Integración con Copilot CLI | 15% | 4 | 3 |
| Baja ceremonia | 10% | 2 | 5 |
| Verificación/gobernanza integrada | 10% | 4 | 2 |
| Simplicidad operativa | 5% | 2 | 5 |
| **Puntuación ponderada** | **100%** | **3,9/5** | **3,8/5** |

La cercanía es deliberada: resuelven problemas distintos. La puntuación no es evidencia estadística.

### Árbol de decisión

```text
¿El objetivo principal es acordar y conservar el cambio?
├─ Sí → OpenSpec
└─ No, también se quiere orquestar construcción/verificación/PR
   ├─ Cambio pequeño y de una sesión → OpenSpec + Copilot
   └─ Cambio grande, multifase o de varias sesiones → GSD Core

¿Hay dos o más equipos/repositorios?
├─ OpenSpec stores → solo piloto; estaba en beta
└─ GSD workspace/workstreams → probar con controles Git
```

## 11. Estrategia híbrida

### ¿Es compatible?

**Técnicamente sí**, porque usan directorios y nombres de skills distintos. Sin embargo, ambos escriben instrucciones para Copilot y ambos pueden representar requisitos. Sin gobierno, el híbrido duplica contexto y crea fuentes de verdad contradictorias.

### Híbrido recomendado

Use:

- **OpenSpec para intención y comportamiento normativo**;
- **GSD Core para orquestación y ejecución**.

Flujo:

```text
OpenSpec explore/propose
        ↓ revisión humana
change + delta aprobados
        ↓
GSD discuss/plan/execute/verify/ship
        ↓
OpenSpec verify/sync/archive
```

No ejecute a la vez `/opsx:apply` y `/gsd-execute-phase` sobre el mismo change: serían dos orquestadores compitiendo.

### Una sola fuente de verdad

| Información | Fuente canónica |
|---|---|
| Comportamiento vigente | `openspec/specs/` |
| Comportamiento propuesto | `openspec/changes/<id>/specs/` |
| Motivación/diseño del change | `proposal.md` y `design.md` |
| Restricciones globales del proyecto | `.planning/PROJECT.md` o instrucciones de repositorio, sin duplicar specs |
| Estado de ejecución | `.planning/STATE.md` |
| Plan operativo | `.planning/phases/*/PLAN.md` |
| Evidencia de ejecución | `SUMMARY.md`, `VERIFICATION.md`, CI y PR |

En `.github/copilot-instructions.md` o en contenido no administrado de `AGENTS.md`, establezca:

```text
La fuente normativa del comportamiento es openspec/specs y el delta activo.
.planning contiene contexto y ejecución derivados. Si existe conflicto,
detente y solicita resolución humana; no reescribas la intención.
```

### Evitar duplicación

1. En `REQUIREMENTS.md`, referenciar IDs/rutas OpenSpec; no copiar párrafos.
2. En planes GSD, enlazar escenarios OpenSpec como acceptance criteria.
3. Un único `tasks.md` operativo: si GSD ejecuta, OpenSpec `tasks.md` debe ser resumen/checklist de alto nivel.
4. Archive OpenSpec solo cuando el comportamiento aprobado sea real.
5. No permitir que `gsd-ship` archive automáticamente la verdad OpenSpec.
6. Revisar `/instructions` y `/skills list` para detectar instrucciones contradictorias.
7. Mantener límites de tamaño; no cargar todos los artefactos en cada prompt.

### Cuándo no usar híbrido

- equipos nuevos en desarrollo agentivo;
- cambios pequeños;
- repositorios sin CI;
- políticas Git poco claras;
- falta de ownership de specs;
- presupuesto de contexto limitado.

## 12. Recomendación explícita

Para una organización que:

- ya eligió GitHub Copilot;
- quiere apalancar especificación y prompting;
- trabaja sobre código existente;
- desea avanzar hacia construcción agentiva;

se recomienda una **adopción por capas**:

1. **OpenSpec como baseline** para cambios pequeños/medianos y para formar hábitos de proposal, delta y escenarios.
2. **GSD Core selectivo** para features grandes, multifase o que requieren recuperación entre sesiones, paralelismo y PR.
3. **Híbrido solo en un piloto avanzado**, con OpenSpec como verdad funcional y GSD como ejecución.

Si la organización exige elegir **una sola herramienta para todo el ciclo**, elegir **GSD Core**, aceptando mayor costo y controles. Si exige una sola herramienta para maximizar adopción y minimizar disrupción, elegir **OpenSpec** y complementar construcción/revisión con capacidades nativas de Copilot y CI.

## 13. Piloto de 30 días

### Preparación — días 1 a 3

- fijar GSD Core 1.7.0 y OpenSpec 1.6.0;
- crear ramas piloto;
- inventariar archivos generados;
- aprobar skills/hooks;
- configurar Copilot sin `/allow-all`;
- definir datos sensibles y telemetría;
- establecer baseline de al menos cinco cambios Copilot-only recientes;
- definir convención de archive respecto a merge/deploy.

### Semana 1 — OpenSpec

Aplicar a:

- dos cambios pequeños;
- dos cambios medianos brownfield.

Obligatorio:

- explore/propose;
- revisión humana del delta;
- validate strict;
- verify;
- CI;
- archive según convención.

Objetivo: medir ceremonia, claridad y utilidad como context primer.

### Semana 2 — GSD Core

Aplicar a:

- dos cambios medianos/grandes;
- al menos uno que requiera más de una sesión.

Obligatorio:

- onboard/map-codebase;
- discuss;
- revisión de plan;
- ejecución con concurrencia baja;
- UAT;
- PR draft;
- registro de tokens/permisos/intervenciones.

Objetivo: medir recuperación de contexto y costo de orquestación.

### Semana 3 — híbrido

Un cambio grande brownfield:

1. OpenSpec produce proposal/delta aprobado.
2. GSD usa ese change como contrato.
3. GSD ejecuta/verifica/prepara PR.
4. OpenSpec verifica y archiva tras aprobación.

Realice una revisión específica de contradicciones entre `openspec/` y `.planning/`.

### Semana 4 — evaluación

Comparar por tamaño y tipo de cambio, no solo promedios globales.

#### Métricas

| Métrica | Cómo medir |
|---|---|
| Tiempo humano activo | Registro por fase |
| Lead time | Intención → PR listo/merge |
| Costo IA | Créditos/tokens por change |
| Ceremonia | Tiempo revisando artefactos |
| Replanificación | Número y causa |
| Intervenciones | Permisos, correcciones, abortos |
| Fallos CI | Primera ejecución y total |
| Retrabajo | Cambios posteriores por malentendido |
| Defectos | Antes y después de merge |
| Cobertura de requisitos | Requisito → prueba/evidencia |
| Recuperación | Tiempo para retomar tras 24 h |
| Drift | Specs/planes que contradicen código |
| Revisión PR | Tiempo y findings humanos |
| Seguridad | Comandos no autorizados, secretos, dependencias dudosas |

#### Umbrales de éxito propuestos

Son criterios internos, no promesas de producto:

- cero acciones remotas/destructivas no autorizadas;
- cero incremento en defectos escapados;
- 100% de cambios con CI y revisión humana;
- al menos 90% de requisitos con prueba o aceptación humana explícita;
- reducción >=15% del tiempo humano activo en cambios medianos/grandes, **o** reducción >=20% del retrabajo;
- costo IA dentro del límite acordado;
- menos de 10% de artefactos con drift al cierre;
- recuperación de una sesión en menos de 10 minutos;
- valoración media del equipo >=4/5 en claridad, sin caída severa en satisfacción.

Con una muestra de 30 días no habrá significancia estadística robusta. El resultado sirve para decidir si ampliar, ajustar o detener.

## 14. Evidencia disponible

### No hay prueba directa

No se encontró:

- benchmark GSD vs. OpenSpec;
- Copilot con/sin cada framework en tareas emparejadas;
- estudio independiente de defectos, calidad o productividad.

### Evidencia indirecta útil

- [FeatureBench](https://arxiv.org/abs/2602.10975): 200 tareas de features, 24 repositorios; 11% resuelto por Claude 4.5 Opus en la versión inicial. Muestra la dificultad del trabajo end-to-end.
- [FeatBench](https://arxiv.org/abs/2509.22237): 157 tareas, 27 repositorios; mejor resolved rate 29,94%, con scope creep y regresiones.
- [CodePlan](https://www.microsoft.com/en-us/research/publication/codeplan-repository-level-coding-using-llms-and-planning-2/): planificación incremental logró 5/7 repositorios válidos frente a 0/7 sin planificación comparable.
- [UTBoost](https://aclanthology.org/2025.acl-long.189/): pruebas ampliadas descubrieron 345 falsos positivos.
- [METR 2025](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/): 16 desarrolladores/246 tareas, 19% de ralentización con IA temprana.
- [METR 2026](https://metr.org/blog/2026-02-24-uplift-update/): la continuación con 57 desarrolladores y más de 800 tareas sufrió sesgos de selección; METR cree probable una mejora actual, pero no puede cuantificarla con fiabilidad.

Nada de lo anterior puede atribuirse a GSD Core u OpenSpec.

## Bibliografía

### GSD Core

- [Open GSD](https://opengsd.net/)
- [Introducción a GSD Core](https://docs.opengsd.net/core/introduction)
- [Workflow](https://docs.opengsd.net/core/concepts/workflow)
- [Artefactos](https://docs.opengsd.net/core/concepts/planning-artifacts)
- [Instalación](https://docs.opengsd.net/core/installation)
- [Arquitectura 1.7.0](https://github.com/open-gsd/gsd-core/blob/v1.7.0/docs/ARCHITECTURE.md)
- [Comandos 1.7.0](https://github.com/open-gsd/gsd-core/blob/v1.7.0/docs/COMMANDS.md)
- [Release 1.7.0](https://github.com/open-gsd/gsd-core/releases/tag/v1.7.0)

### OpenSpec

- [Documentación](https://openspec.dev/docs)
- [Core Concepts](https://github.com/Fission-AI/OpenSpec/blob/v1.6.0/docs/overview.md)
- [Workflows](https://github.com/Fission-AI/OpenSpec/blob/v1.6.0/docs/workflows.md)
- [Supported Tools](https://github.com/Fission-AI/OpenSpec/blob/v1.6.0/docs/supported-tools.md)
- [Existing Projects](https://github.com/Fission-AI/OpenSpec/blob/v1.6.0/docs/existing-projects.md)
- [Team Workflow](https://github.com/Fission-AI/OpenSpec/blob/v1.6.0/docs/team-workflow.md)
- [Release 1.6.0](https://github.com/Fission-AI/OpenSpec/releases/tag/v1.6.0)

### GitHub Copilot

- [Uso de Copilot CLI](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-copilot-cli)
- [Skills de Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-skills)
- [Instrucciones de Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-custom-instructions)
- [Matriz de personalización](https://docs.github.com/en/copilot/reference/customization-cheat-sheet)

### Evidencia

- [FeatureBench](https://arxiv.org/abs/2602.10975)
- [FeatBench](https://arxiv.org/abs/2509.22237)
- [CodePlan](https://www.microsoft.com/en-us/research/publication/codeplan-repository-level-coding-using-llms-and-planning-2/)
- [UTBoost](https://aclanthology.org/2025.acl-long.189/)
- [METR 2025](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/)
- [METR 2026](https://metr.org/blog/2026-02-24-uplift-update/)
